use crate::{
    app::AppState,
    auth::{issue_access_token, issue_dev_token, AccessToken, AuthError, AuthUser, SESSION_COOKIE},
    settings::{AuthMode, OAuthProviderKind, OAuthProviderSettings},
};
use axum::{
    extract::{Path, Query, State},
    http::{header::SET_COOKIE, HeaderMap, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
    routing::{get, post},
    Json, Router,
};
use jsonwebtoken::{decode, decode_header, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

const SESSION_COOKIE_MAX_AGE_SECONDS: i64 = 400 * 24 * 60 * 60;

#[cfg(test)]
#[path = "auth_tests.rs"]
mod tests;

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/auth/{provider}/start", get(start_oauth_login))
        .route("/auth/{provider}/callback", get(finish_oauth_login))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/auth/options", get(auth_options))
        .route("/auth/dev-token", post(create_dev_token))
        .route("/auth/profile-token", post(create_profile_token))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AuthOptionsResponse {
    pub mode: &'static str,
    pub providers: Vec<AuthProviderResponse>,
    pub login_url: &'static str,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AuthProviderResponse {
    pub id: &'static str,
    pub label: &'static str,
    pub configured: bool,
    pub start_url: String,
}

#[utoipa::path(
    get,
    path = "/api/v1/auth/options",
    tag = "auth",
    responses(
        (status = 200, description = "Authentication options for the current server", body = AuthOptionsResponse)
    )
)]
pub async fn auth_options(State(state): State<AppState>) -> Json<AuthOptionsResponse> {
    Json(auth_options_response(
        state.auth_mode,
        &state.oauth_providers,
    ))
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreateDevTokenRequest {
    pub email: String,
}

#[utoipa::path(
    post,
    path = "/api/v1/auth/dev-token",
    tag = "auth",
    request_body = CreateDevTokenRequest,
    responses(
        (status = 200, description = "Development bearer token", body = AccessToken),
        (status = 401, description = "Development token could not be issued"),
        (status = 500, description = "Development token signing failed")
    )
)]
pub async fn create_dev_token(
    State(state): State<AppState>,
    Json(request): Json<CreateDevTokenRequest>,
) -> Result<Json<AccessToken>, AuthError> {
    if state.auth_mode != AuthMode::Dev {
        return Err(AuthError::unauthorized(
            "development token endpoint is disabled",
        ));
    }

    issue_dev_token(request.email, &state.app_jwt_secret).map(Json)
}

#[utoipa::path(
    post,
    path = "/api/v1/auth/profile-token",
    tag = "auth",
    responses(
        (status = 200, description = "Bearer token for the current browser session", body = AccessToken),
        (status = 401, description = "Authentication required"),
        (status = 500, description = "Token signing failed")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_profile_token(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<AccessToken>, AuthError> {
    issue_access_token(&auth_user, &state.app_jwt_secret).map(Json)
}

fn auth_options_response(
    auth_mode: AuthMode,
    oauth_providers: &[OAuthProviderSettings],
) -> AuthOptionsResponse {
    AuthOptionsResponse {
        mode: auth_mode_id(auth_mode),
        providers: OAuthProviderKind::all()
            .iter()
            .map(|provider| {
                let configured = oauth_providers
                    .iter()
                    .any(|settings| settings.kind == *provider);
                AuthProviderResponse {
                    id: provider.id(),
                    label: provider.label(),
                    configured,
                    start_url: format!("/auth/{}/start", provider.id()),
                }
            })
            .collect(),
        login_url: "/login",
    }
}

fn auth_mode_id(auth_mode: AuthMode) -> &'static str {
    match auth_mode {
        AuthMode::Dev => "dev",
        AuthMode::OAuth => "oauth",
    }
}

async fn start_oauth_login(
    State(state): State<AppState>,
    Path(provider): Path<String>,
) -> Result<Response, AuthError> {
    let provider = oauth_provider(&state, &provider)?;
    let csrf_state = Uuid::new_v4().to_string();
    let nonce = Uuid::new_v4().to_string();
    let redirect_uri = provider.redirect_uri();
    let mut authorize_url = url::Url::parse(authorize_url(provider.kind))
        .map_err(|_| AuthError::internal("failed to build OAuth authorize URL"))?;
    authorize_url
        .query_pairs_mut()
        .append_pair("client_id", &provider.client_id)
        .append_pair("redirect_uri", &redirect_uri)
        .append_pair("response_type", "code")
        .append_pair("state", &csrf_state)
        .append_pair("scope", oauth_scope(provider.kind));
    if provider.kind == OAuthProviderKind::Google {
        authorize_url
            .query_pairs_mut()
            .append_pair("nonce", &nonce)
            .append_pair("prompt", "select_account");
    }
    let cookie = oauth_state_cookie(&provider, &csrf_state, &nonce);

    Ok((
        [(SET_COOKIE, cookie)],
        Redirect::temporary(authorize_url.as_str()),
    )
        .into_response())
}

#[derive(Debug, Deserialize)]
struct OAuthCallbackQuery {
    code: Option<String>,
    state: Option<String>,
    error: Option<String>,
}

async fn finish_oauth_login(
    State(state): State<AppState>,
    Path(provider): Path<String>,
    headers: HeaderMap,
    Query(query): Query<OAuthCallbackQuery>,
) -> Result<Response, AuthError> {
    let provider = oauth_provider(&state, &provider)?;
    if let Some(error) = query.error {
        return Ok((
            StatusCode::BAD_REQUEST,
            Html(format!(
                "<h1>{} login failed</h1><p>{}</p>",
                provider.kind.label(),
                escape_html(&error)
            )),
        )
            .into_response());
    }

    let code = query
        .code
        .ok_or_else(|| AuthError::unauthorized("OAuth callback is missing code"))?;
    let state_param = query
        .state
        .ok_or_else(|| AuthError::unauthorized("OAuth callback is missing state"))?;
    let (expected_state, expected_nonce) = read_oauth_state_cookie(&headers)
        .ok_or_else(|| AuthError::unauthorized("OAuth login state cookie is missing"))?;
    if state_param != expected_state {
        return Err(AuthError::unauthorized("OAuth login state mismatch"));
    }

    let profile = exchange_oauth_code_for_profile(&provider, &code, &expected_nonce).await?;
    let user =
        AuthUser::from_provider_identity(provider.kind.id(), &profile.subject, profile.email)?;
    let token = issue_access_token(&user, &state.app_jwt_secret)?;
    let secure = provider.public_base_url.starts_with("https://");
    let session_cookie = session_cookie(&token.access_token, secure);
    let clear_state_cookie = clear_oauth_state_cookie(secure);

    Ok((
        [
            (SET_COOKIE, clear_state_cookie),
            (SET_COOKIE, session_cookie),
        ],
        Redirect::temporary("/replays"),
    )
        .into_response())
}

fn oauth_provider(state: &AppState, provider: &str) -> Result<OAuthProviderSettings, AuthError> {
    state
        .oauth_providers
        .iter()
        .find(|settings| settings.kind.id() == provider)
        .cloned()
        .ok_or_else(|| AuthError::unauthorized(format!("{provider} login is not configured")))
}

#[derive(Debug, Deserialize)]
struct GoogleTokenResponse {
    id_token: String,
}

#[derive(Debug, Deserialize)]
struct OAuthTokenResponse {
    access_token: String,
}

#[derive(Debug)]
struct OAuthProfile {
    subject: String,
    email: String,
}

fn authorize_url(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => "https://accounts.google.com/o/oauth2/v2/auth",
        OAuthProviderKind::GitHub => "https://github.com/login/oauth/authorize",
        OAuthProviderKind::Discord => "https://discord.com/oauth2/authorize",
    }
}

fn token_url(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => "https://oauth2.googleapis.com/token",
        OAuthProviderKind::GitHub => "https://github.com/login/oauth/access_token",
        OAuthProviderKind::Discord => "https://discord.com/api/oauth2/token",
    }
}

fn oauth_scope(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => "openid email profile",
        OAuthProviderKind::GitHub => "read:user user:email",
        OAuthProviderKind::Discord => "identify email",
    }
}

async fn exchange_oauth_code_for_profile(
    provider: &OAuthProviderSettings,
    code: &str,
    expected_nonce: &str,
) -> Result<OAuthProfile, AuthError> {
    match provider.kind {
        OAuthProviderKind::Google => {
            let id_token = exchange_google_code(provider, code).await?;
            let google_user = verify_google_id_token(provider, &id_token, expected_nonce).await?;
            Ok(OAuthProfile {
                subject: google_user.sub,
                email: google_user.email,
            })
        }
        OAuthProviderKind::GitHub => {
            let access_token = exchange_oauth_code(provider, code).await?;
            fetch_github_profile(&access_token).await
        }
        OAuthProviderKind::Discord => {
            let access_token = exchange_oauth_code(provider, code).await?;
            fetch_discord_profile(&access_token).await
        }
    }
}

async fn exchange_google_code(
    google: &OAuthProviderSettings,
    code: &str,
) -> Result<String, AuthError> {
    let client = reqwest::Client::new();
    let response = client
        .post(token_url(OAuthProviderKind::Google))
        .form(&[
            ("code", code),
            ("client_id", google.client_id.as_str()),
            ("client_secret", google.client_secret.as_str()),
            ("redirect_uri", google.redirect_uri().as_str()),
            ("grant_type", "authorization_code"),
        ])
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to exchange Google authorization code"))?;

    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "Google authorization code exchange was rejected",
        ));
    }

    response
        .json::<GoogleTokenResponse>()
        .await
        .map(|response| response.id_token)
        .map_err(|_| AuthError::unauthorized("Google token response did not include id_token"))
}

async fn exchange_oauth_code(
    provider: &OAuthProviderSettings,
    code: &str,
) -> Result<String, AuthError> {
    let client = reqwest::Client::new();
    let response = client
        .post(token_url(provider.kind))
        .header(reqwest::header::ACCEPT, "application/json")
        .form(&[
            ("code", code),
            ("client_id", provider.client_id.as_str()),
            ("client_secret", provider.client_secret.as_str()),
            ("redirect_uri", provider.redirect_uri().as_str()),
            ("grant_type", "authorization_code"),
        ])
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to exchange OAuth authorization code"))?;

    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "OAuth authorization code exchange was rejected",
        ));
    }

    response
        .json::<OAuthTokenResponse>()
        .await
        .map(|response| response.access_token)
        .map_err(|_| AuthError::unauthorized("OAuth token response did not include access_token"))
}

#[derive(Debug, Deserialize)]
struct GoogleJwks {
    keys: Vec<GoogleJwk>,
}

#[derive(Debug, Deserialize)]
struct GoogleJwk {
    kid: String,
    n: String,
    e: String,
}

#[derive(Debug, Deserialize)]
struct GoogleIdTokenClaims {
    sub: String,
    email: String,
    email_verified: bool,
    nonce: String,
}

#[derive(Debug)]
struct GoogleUser {
    sub: String,
    email: String,
}

async fn verify_google_id_token(
    google: &OAuthProviderSettings,
    id_token: &str,
    expected_nonce: &str,
) -> Result<GoogleUser, AuthError> {
    let header = decode_header(id_token)
        .map_err(|_| AuthError::unauthorized("Google id_token header is invalid"))?;
    let kid = header
        .kid
        .ok_or_else(|| AuthError::unauthorized("Google id_token has no key id"))?;
    let jwks = reqwest::get("https://www.googleapis.com/oauth2/v3/certs")
        .await
        .map_err(|_| AuthError::unauthorized("failed to fetch Google signing keys"))?
        .json::<GoogleJwks>()
        .await
        .map_err(|_| AuthError::unauthorized("failed to parse Google signing keys"))?;
    let key = jwks
        .keys
        .iter()
        .find(|key| key.kid == kid)
        .ok_or_else(|| AuthError::unauthorized("Google signing key was not found"))?;
    let decoding_key = DecodingKey::from_rsa_components(&key.n, &key.e)
        .map_err(|_| AuthError::unauthorized("Google signing key is invalid"))?;
    let mut validation = Validation::new(Algorithm::RS256);
    validation.set_audience(&[google.client_id.as_str()]);
    validation.set_issuer(&["https://accounts.google.com", "accounts.google.com"]);
    let token = decode::<GoogleIdTokenClaims>(id_token, &decoding_key, &validation)
        .map_err(|_| AuthError::unauthorized("Google id_token validation failed"))?;

    if token.claims.nonce != expected_nonce {
        return Err(AuthError::unauthorized("Google id_token nonce mismatch"));
    }
    if !token.claims.email_verified {
        return Err(AuthError::unauthorized("Google email is not verified"));
    }

    Ok(GoogleUser {
        sub: token.claims.sub,
        email: token.claims.email,
    })
}

#[derive(Debug, Deserialize)]
struct GitHubUserResponse {
    id: u64,
    email: Option<String>,
}

#[derive(Debug, Deserialize)]
struct GitHubEmailResponse {
    email: String,
    primary: bool,
    verified: bool,
}

async fn fetch_github_profile(access_token: &str) -> Result<OAuthProfile, AuthError> {
    let client = reqwest::Client::new();
    let user = client
        .get("https://api.github.com/user")
        .bearer_auth(access_token)
        .header(reqwest::header::USER_AGENT, "rocket-sense")
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to fetch GitHub profile"))?;
    if !user.status().is_success() {
        return Err(AuthError::unauthorized(
            "GitHub profile request was rejected",
        ));
    }
    let user = user
        .json::<GitHubUserResponse>()
        .await
        .map_err(|_| AuthError::unauthorized("GitHub profile response was invalid"))?;
    let email = match user.email {
        Some(email) => email,
        None => fetch_github_primary_email(&client, access_token).await?,
    };

    Ok(OAuthProfile {
        subject: user.id.to_string(),
        email,
    })
}

async fn fetch_github_primary_email(
    client: &reqwest::Client,
    access_token: &str,
) -> Result<String, AuthError> {
    let response = client
        .get("https://api.github.com/user/emails")
        .bearer_auth(access_token)
        .header(reqwest::header::USER_AGENT, "rocket-sense")
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to fetch GitHub email addresses"))?;
    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "GitHub email address request was rejected",
        ));
    }
    response
        .json::<Vec<GitHubEmailResponse>>()
        .await
        .map_err(|_| AuthError::unauthorized("GitHub email response was invalid"))?
        .into_iter()
        .find(|email| email.primary && email.verified)
        .map(|email| email.email)
        .ok_or_else(|| AuthError::unauthorized("GitHub account has no verified primary email"))
}

#[derive(Debug, Deserialize)]
struct DiscordUserResponse {
    id: String,
    email: Option<String>,
    verified: Option<bool>,
}

async fn fetch_discord_profile(access_token: &str) -> Result<OAuthProfile, AuthError> {
    let response = reqwest::Client::new()
        .get("https://discord.com/api/users/@me")
        .bearer_auth(access_token)
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to fetch Discord profile"))?;
    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "Discord profile request was rejected",
        ));
    }
    let user = response
        .json::<DiscordUserResponse>()
        .await
        .map_err(|_| AuthError::unauthorized("Discord profile response was invalid"))?;
    if user.verified != Some(true) {
        return Err(AuthError::unauthorized("Discord email is not verified"));
    }
    let email = user
        .email
        .ok_or_else(|| AuthError::unauthorized("Discord account has no email"))?;

    Ok(OAuthProfile {
        subject: user.id,
        email,
    })
}

fn oauth_state_cookie(provider: &OAuthProviderSettings, state: &str, nonce: &str) -> String {
    cookie(
        "rocket_sense_oauth_state",
        &format!("{state}.{nonce}"),
        600,
        provider.public_base_url.starts_with("https://"),
        "/auth",
        true,
    )
}

fn clear_oauth_state_cookie(secure: bool) -> String {
    cookie("rocket_sense_oauth_state", "", 0, secure, "/auth", true)
}

fn session_cookie(token: &str, secure: bool) -> String {
    cookie(
        SESSION_COOKIE,
        token,
        SESSION_COOKIE_MAX_AGE_SECONDS,
        secure,
        "/",
        true,
    )
}

fn cookie(
    name: &str,
    value: &str,
    max_age_seconds: i64,
    secure: bool,
    path: &str,
    http_only: bool,
) -> String {
    let mut cookie = format!(
        "{name}={}; Path={path}; Max-Age={max_age_seconds}; SameSite=Lax",
        escape_cookie(value)
    );
    if secure {
        cookie.push_str("; Secure");
    }
    if http_only {
        cookie.push_str("; HttpOnly");
    }
    cookie
}

fn read_oauth_state_cookie(headers: &HeaderMap) -> Option<(String, String)> {
    let cookie_header = headers.get(axum::http::header::COOKIE)?.to_str().ok()?;
    let value = cookie_header.split(';').find_map(|cookie| {
        let (name, value) = cookie.trim().split_once('=')?;
        (name == "rocket_sense_oauth_state").then_some(value)
    })?;

    let (state, nonce) = value.split_once('.')?;
    Some((state.to_owned(), nonce.to_owned()))
}

fn escape_cookie(value: &str) -> String {
    value.replace(';', "%3B").replace(',', "%2C")
}

fn escape_html(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
}
