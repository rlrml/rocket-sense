use crate::{app::AppState, settings::AuthMode};
use axum::{
    extract::FromRequestParts,
    http::{
        header::{AUTHORIZATION, COOKIE},
        request::Parts,
        StatusCode,
    },
    response::{IntoResponse, Response},
    Json,
};
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

const DEV_USER_HEADER: &str = "x-dev-user";
pub const SESSION_COOKIE: &str = "rocket_sense_session";
const TOKEN_ISSUER: &str = "rocket-sense";
const TOKEN_TTL_HOURS: i64 = 24;

#[derive(Debug, Clone)]
pub struct AuthUser {
    pub id: Uuid,
    pub email: String,
}

impl AuthUser {
    pub fn from_dev_email(email: String) -> Result<Self, AuthError> {
        let normalized_email = email.trim().to_lowercase();
        if normalized_email.is_empty() {
            return Err(AuthError::unauthorized(format!(
                "{DEV_USER_HEADER} must not be empty"
            )));
        }

        Ok(Self {
            id: stable_user_id("dev", &normalized_email),
            email: normalized_email,
        })
    }

    pub fn from_google_identity(subject: &str, email: String) -> Result<Self, AuthError> {
        let normalized_email = email.trim().to_lowercase();
        if normalized_email.is_empty() {
            return Err(AuthError::unauthorized("Google account has no email"));
        }

        Ok(Self {
            id: stable_user_id("google", subject),
            email: normalized_email,
        })
    }

    fn from_access_token(token: &str, secret: &str) -> Result<Self, AuthError> {
        let mut validation = Validation::new(Algorithm::HS256);
        validation.set_issuer(&[TOKEN_ISSUER]);

        let token = decode::<AccessTokenClaims>(
            token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &validation,
        )
        .map_err(|_| AuthError::unauthorized("invalid or expired bearer token"))?;
        let user_id = Uuid::parse_str(&token.claims.sub)
            .map_err(|_| AuthError::unauthorized("bearer token subject is not a user id"))?;

        Ok(Self {
            id: user_id,
            email: token.claims.email,
        })
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct AccessTokenClaims {
    iss: String,
    sub: String,
    email: String,
    iat: usize,
    exp: usize,
}

#[derive(Debug, Clone, Serialize, utoipa::ToSchema)]
pub struct AccessToken {
    pub access_token: String,
    pub token_type: &'static str,
    pub expires_in_seconds: i64,
}

pub fn issue_dev_token(email: String, secret: &str) -> Result<AccessToken, AuthError> {
    let user = AuthUser::from_dev_email(email)?;
    issue_access_token(&user, secret)
}

pub fn issue_access_token(user: &AuthUser, secret: &str) -> Result<AccessToken, AuthError> {
    let issued_at = Utc::now();
    let expires_at = issued_at + Duration::hours(TOKEN_TTL_HOURS);
    let claims = AccessTokenClaims {
        iss: TOKEN_ISSUER.to_owned(),
        sub: user.id.to_string(),
        email: user.email.clone(),
        iat: issued_at.timestamp() as usize,
        exp: expires_at.timestamp() as usize,
    };
    let access_token = encode(
        &Header::new(Algorithm::HS256),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|_| AuthError::internal("failed to issue access token"))?;

    Ok(AccessToken {
        access_token,
        token_type: "Bearer",
        expires_in_seconds: Duration::hours(TOKEN_TTL_HOURS).num_seconds(),
    })
}

impl FromRequestParts<AppState> for AuthUser {
    type Rejection = AuthError;

    async fn from_request_parts(
        parts: &mut Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        if let Some(token) = bearer_token(parts)?.or_else(|| session_cookie(parts)) {
            return Self::from_access_token(token, &state.app_jwt_secret);
        }

        match state.auth_mode {
            AuthMode::Dev => {
                if let Some(email) = dev_user_header(parts)? {
                    return Self::from_dev_email(email);
                }

                Err(AuthError::unauthorized(format!(
                    "missing bearer token or {DEV_USER_HEADER} header in dev auth mode"
                )))
            }
            AuthMode::Google => Err(AuthError::unauthorized("missing bearer token")),
        }
    }
}

fn bearer_token(parts: &Parts) -> Result<Option<&str>, AuthError> {
    let Some(value) = parts.headers.get(AUTHORIZATION) else {
        return Ok(None);
    };
    let value = value
        .to_str()
        .map_err(|_| AuthError::unauthorized("Authorization header must be valid ASCII"))?;
    let Some(token) = value.strip_prefix("Bearer ") else {
        return Err(AuthError::unauthorized(
            "Authorization header must use Bearer token",
        ));
    };

    Ok(Some(token.trim()))
}

fn session_cookie(parts: &Parts) -> Option<&str> {
    let value = parts.headers.get(COOKIE)?.to_str().ok()?;
    value.split(';').find_map(|cookie| {
        let (name, value) = cookie.trim().split_once('=')?;
        (name == SESSION_COOKIE).then_some(value)
    })
}

fn dev_user_header(parts: &Parts) -> Result<Option<String>, AuthError> {
    let Some(value) = parts.headers.get(DEV_USER_HEADER) else {
        return Ok(None);
    };
    let email = value
        .to_str()
        .map_err(|_| {
            AuthError::unauthorized(format!("{DEV_USER_HEADER} must be a valid header value"))
        })?
        .to_owned();

    Ok(Some(email))
}

#[derive(Debug)]
pub struct AuthError {
    status: StatusCode,
    message: String,
}

impl AuthError {
    pub fn unauthorized(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::UNAUTHORIZED,
            message: message.into(),
        }
    }

    pub fn internal(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            message: message.into(),
        }
    }
}

fn stable_user_id(provider: &str, subject: &str) -> Uuid {
    Uuid::new_v5(
        &Uuid::NAMESPACE_URL,
        format!("rocket-sense:{provider}:{subject}").as_bytes(),
    )
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        (
            self.status,
            Json(ErrorResponse {
                error: self.message,
            }),
        )
            .into_response()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dev_token_round_trips_to_normalized_user() {
        let token = issue_dev_token("Smoke@Test.Example".to_owned(), "test-secret")
            .expect("dev token should be issued");
        let user = AuthUser::from_access_token(&token.access_token, "test-secret")
            .expect("dev token should validate");

        assert_eq!(user.email, "smoke@test.example");
        assert_eq!(user.id, stable_user_id("dev", "smoke@test.example"));
    }
}
