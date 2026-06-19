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
use chrono::Utc;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Row};
use uuid::Uuid;

const DEV_USER_HEADER: &str = "x-dev-user";
pub const SESSION_COOKIE: &str = "rocket_sense_session";
const TOKEN_ISSUER: &str = "rocket-sense";

#[derive(Debug, Clone)]
pub struct AuthUser {
    pub id: Uuid,
    pub email: Option<String>,
    pub display_name: String,
    pub provider_name: String,
    pub provider_subject: String,
}

pub struct OptionalAuthUser(pub Option<AuthUser>);

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
            provider_name: "dev".to_owned(),
            provider_subject: normalized_email.clone(),
            email: Some(normalized_email.clone()),
            display_name: normalized_email,
        })
    }

    pub fn from_provider_identity(
        provider: &str,
        subject: &str,
        email: Option<String>,
        display_name: Option<String>,
    ) -> Result<Self, AuthError> {
        let normalized_email = email
            .map(|email| email.trim().to_lowercase())
            .filter(|email| !email.is_empty());
        let display_name = display_name
            .map(|display_name| display_name.trim().to_owned())
            .filter(|display_name| !display_name.is_empty())
            .or_else(|| normalized_email.clone())
            .unwrap_or_else(|| format!("{provider}:{subject}"));

        Ok(Self {
            id: stable_user_id(provider, subject),
            provider_name: provider.to_owned(),
            provider_subject: subject.to_owned(),
            email: normalized_email,
            display_name,
        })
    }

    fn from_access_token(token: &str, secret: &str) -> Result<Self, AuthError> {
        let mut validation = Validation::new(Algorithm::HS256);
        validation.set_required_spec_claims(&["iss"]);
        validation.set_issuer(&[TOKEN_ISSUER]);

        let token = decode::<AccessTokenClaims>(
            token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &validation,
        )
        .map_err(|_| AuthError::unauthorized("invalid or expired bearer token"))?;
        let user_id = Uuid::parse_str(&token.claims.sub)
            .map_err(|_| AuthError::unauthorized("bearer token subject is not a user id"))?;

        let email = token.claims.email;
        let display_name = token
            .claims
            .display_name
            .or_else(|| email.clone())
            .unwrap_or_else(|| user_id.to_string());

        Ok(Self {
            id: user_id,
            email,
            display_name,
            provider_name: token
                .claims
                .provider_name
                .unwrap_or_else(|| "rocket-sense".to_owned()),
            provider_subject: token
                .claims
                .provider_subject
                .unwrap_or_else(|| user_id.to_string()),
        })
    }
}

#[derive(Debug, Clone)]
pub struct LinkedAuthIdentity {
    pub provider_name: String,
    pub provider_subject: String,
    pub email: Option<String>,
    pub created_at: chrono::DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct AccessTokenClaims {
    iss: String,
    sub: String,
    #[serde(default)]
    email: Option<String>,
    #[serde(default)]
    display_name: Option<String>,
    #[serde(default)]
    provider_name: Option<String>,
    #[serde(default)]
    provider_subject: Option<String>,
    iat: usize,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    exp: Option<usize>,
}

#[derive(Debug, Clone, Serialize, utoipa::ToSchema)]
pub struct AccessToken {
    pub access_token: String,
    pub token_type: &'static str,
    pub expires_in_seconds: Option<i64>,
}

pub fn issue_dev_token(email: String, secret: &str) -> Result<AccessToken, AuthError> {
    let user = AuthUser::from_dev_email(email)?;
    issue_access_token(&user, secret)
}

pub fn issue_access_token(user: &AuthUser, secret: &str) -> Result<AccessToken, AuthError> {
    let issued_at = Utc::now();
    let claims = AccessTokenClaims {
        iss: TOKEN_ISSUER.to_owned(),
        sub: user.id.to_string(),
        email: user.email.clone(),
        display_name: Some(user.display_name.clone()),
        provider_name: Some(user.provider_name.clone()),
        provider_subject: Some(user.provider_subject.clone()),
        iat: issued_at.timestamp() as usize,
        exp: None,
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
        expires_in_seconds: None,
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
            AuthMode::OAuth => Err(AuthError::unauthorized("missing bearer token")),
        }
    }
}

impl FromRequestParts<AppState> for OptionalAuthUser {
    type Rejection = AuthError;

    async fn from_request_parts(
        parts: &mut Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        match AuthUser::from_request_parts(parts, state).await {
            Ok(user) => Ok(Self(Some(user))),
            Err(error) if error.status == StatusCode::UNAUTHORIZED => Ok(Self(None)),
            Err(error) => Err(error),
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

/// Ensure the authenticated user exists, apply any bootstrap admin promotion
/// (when their email is configured in `admin_emails`), and return whether they
/// are currently an admin.
///
/// Admin status is resolved from the database on demand rather than baked into
/// the (non-expiring) access token, so promotions and demotions take effect
/// immediately. The seed promotion is persisted so a configured admin keeps
/// their status even if the email is later removed from the allowlist.
pub async fn resolve_is_admin(
    pool: &PgPool,
    user: &AuthUser,
    admin_emails: &[String],
) -> Result<bool, sqlx::Error> {
    let seed_admin = admin_emails.iter().any(|email| {
        user.email
            .as_deref()
            .is_some_and(|user_email| email.eq_ignore_ascii_case(user_email))
    });

    let is_admin: bool = sqlx::query_scalar(
        r#"
        INSERT INTO users (id, primary_email, display_name, is_admin)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE
        SET is_admin = users.is_admin OR EXCLUDED.is_admin,
            primary_email = EXCLUDED.primary_email,
            display_name = COALESCE(users.display_name, EXCLUDED.display_name),
            updated_at = now()
        RETURNING is_admin
        "#,
    )
    .bind(user.id)
    .bind(&user.email)
    .bind(&user.display_name)
    .bind(seed_admin)
    .fetch_one(pool)
    .await?;

    upsert_auth_identity(pool, user).await?;

    Ok(is_admin)
}

pub async fn persist_provider_login(
    pool: &PgPool,
    user: AuthUser,
    admin_emails: &[String],
) -> Result<AuthUser, sqlx::Error> {
    let existing_identity_user_id: Option<Uuid> = sqlx::query_scalar(
        r#"
        SELECT user_id
        FROM auth_identities
        WHERE issuer = $1 AND subject = $2
        "#,
    )
    .bind(&user.provider_name)
    .bind(&user.provider_subject)
    .fetch_optional(pool)
    .await?;
    let existing_email_user_id = match &user.email {
        Some(email) => {
            sqlx::query_scalar(
                r#"
                SELECT id
                FROM users
                WHERE lower(primary_email) = lower($1)
                ORDER BY created_at
                LIMIT 1
                "#,
            )
            .bind(email)
            .fetch_optional(pool)
            .await?
        }
        None => None,
    };
    let resolved_user_id = existing_identity_user_id
        .or(existing_email_user_id)
        .unwrap_or(user.id);
    let resolved_user = AuthUser {
        id: resolved_user_id,
        ..user
    };

    resolve_is_admin(pool, &resolved_user, admin_emails).await?;

    Ok(resolved_user)
}

fn stable_user_id(provider: &str, subject: &str) -> Uuid {
    Uuid::new_v5(
        &Uuid::NAMESPACE_URL,
        format!("rocket-sense:{provider}:{subject}").as_bytes(),
    )
}

fn stable_auth_identity_id(provider: &str, subject: &str) -> Uuid {
    Uuid::new_v5(
        &Uuid::NAMESPACE_URL,
        format!("rocket-sense-auth-identity:{provider}:{subject}").as_bytes(),
    )
}

pub async fn upsert_auth_identity(pool: &PgPool, user: &AuthUser) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        INSERT INTO auth_identities (id, user_id, issuer, subject, provider_name, email)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (issuer, subject) DO UPDATE
        SET provider_name = EXCLUDED.provider_name,
            email = EXCLUDED.email
        "#,
    )
    .bind(stable_auth_identity_id(
        &user.provider_name,
        &user.provider_subject,
    ))
    .bind(user.id)
    .bind(&user.provider_name)
    .bind(&user.provider_subject)
    .bind(&user.provider_name)
    .bind(&user.email)
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn list_linked_auth_identities(
    pool: &PgPool,
    user: &AuthUser,
) -> Result<Vec<LinkedAuthIdentity>, sqlx::Error> {
    upsert_auth_identity(pool, user).await?;

    let rows = sqlx::query(
        r#"
        SELECT provider_name, subject, email, created_at
        FROM auth_identities
        WHERE user_id = $1
        ORDER BY created_at, provider_name, subject
        "#,
    )
    .bind(user.id)
    .fetch_all(pool)
    .await?;

    rows.into_iter()
        .map(|row| {
            Ok(LinkedAuthIdentity {
                provider_name: row.try_get("provider_name")?,
                provider_subject: row.try_get("subject")?,
                email: row.try_get("email")?,
                created_at: row.try_get("created_at")?,
            })
        })
        .collect()
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

        assert_eq!(user.email.as_deref(), Some("smoke@test.example"));
        assert_eq!(user.display_name, "smoke@test.example");
        assert_eq!(user.provider_name, "dev");
        assert_eq!(user.provider_subject, "smoke@test.example");
        assert_eq!(user.id, stable_user_id("dev", "smoke@test.example"));
        assert_eq!(token.expires_in_seconds, None);
    }

    #[test]
    fn issued_tokens_do_not_include_expiration() {
        let token = issue_dev_token("smoke@test.example".to_owned(), "test-secret")
            .expect("dev token should be issued");
        let mut validation = Validation::new(Algorithm::HS256);
        validation.set_required_spec_claims(&["iss"]);
        validation.set_issuer(&[TOKEN_ISSUER]);

        let decoded = decode::<AccessTokenClaims>(
            &token.access_token,
            &DecodingKey::from_secret("test-secret".as_bytes()),
            &validation,
        )
        .expect("token should decode");

        assert_eq!(decoded.claims.exp, None);
    }

    #[test]
    fn expired_legacy_tokens_are_rejected() {
        let user = AuthUser::from_dev_email("smoke@test.example".to_owned())
            .expect("dev user should be valid");
        let issued_at = Utc::now() - chrono::Duration::hours(2);
        let claims = AccessTokenClaims {
            iss: TOKEN_ISSUER.to_owned(),
            sub: user.id.to_string(),
            email: user.email,
            display_name: Some(user.display_name),
            provider_name: Some(user.provider_name),
            provider_subject: Some(user.provider_subject),
            iat: issued_at.timestamp() as usize,
            exp: Some((issued_at + chrono::Duration::hours(1)).timestamp() as usize),
        };
        let token = encode(
            &Header::new(Algorithm::HS256),
            &claims,
            &EncodingKey::from_secret("test-secret".as_bytes()),
        )
        .expect("legacy token should encode");

        assert!(AuthUser::from_access_token(&token, "test-secret").is_err());
    }
}
