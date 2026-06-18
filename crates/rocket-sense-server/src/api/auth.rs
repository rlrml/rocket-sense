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
use std::collections::HashMap;
use utoipa::ToSchema;
use uuid::Uuid;

const SESSION_COOKIE_MAX_AGE_SECONDS: i64 = 400 * 24 * 60 * 60;
const STEAM_OPENID_ENDPOINT: &str = "https://steamcommunity.com/openid/login";
const STEAM_OPENID_NS: &str = "http://specs.openid.net/auth/2.0";
const STEAM_OPENID_IDENTIFIER_SELECT: &str = "http://specs.openid.net/auth/2.0/identifier_select";
const STEAM_OPENID_ID_PREFIX: &str = "https://steamcommunity.com/openid/id/";

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
        .route("/me", get(get_current_user))
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

#[derive(Debug, Serialize, ToSchema)]
pub struct CurrentUserResponse {
    pub id: Uuid,
    pub email: Option<String>,
    pub display_name: String,
    pub provider_name: String,
    pub is_admin: bool,
}

#[utoipa::path(
    get,
    path = "/api/v1/me",
    tag = "auth",
    responses(
        (status = 200, description = "The currently authenticated user", body = CurrentUserResponse),
        (status = 401, description = "Authentication required")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_current_user(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<CurrentUserResponse>, AuthError> {
    let is_admin = match &state.db {
        Some(pool) => crate::auth::resolve_is_admin(pool, &auth_user, &state.admin_emails)
            .await
            .map_err(|_| AuthError::internal("failed to resolve admin status"))?,
        None => false,
    };

    Ok(Json(CurrentUserResponse {
        id: auth_user.id,
        email: auth_user.email,
        display_name: auth_user.display_name,
        provider_name: auth_user.provider_name,
        is_admin,
    }))
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
    if provider.kind == OAuthProviderKind::Steam {
        return start_steam_login(&provider, &csrf_state, &nonce);
    }

    let authorize_url = oauth_authorize_url(&provider, &csrf_state, &nonce)?;
    let cookie = oauth_state_cookie(&provider, &csrf_state, &nonce);

    Ok((
        [(SET_COOKIE, cookie)],
        Redirect::temporary(authorize_url.as_str()),
    )
        .into_response())
}

fn oauth_authorize_url(
    provider: &OAuthProviderSettings,
    csrf_state: &str,
    nonce: &str,
) -> Result<url::Url, AuthError> {
    let redirect_uri = provider.redirect_uri();
    let mut authorize_url = url::Url::parse(authorize_url(provider.kind))
        .map_err(|_| AuthError::internal("failed to build OAuth authorize URL"))?;
    authorize_url
        .query_pairs_mut()
        .append_pair("client_id", &provider.client_id)
        .append_pair("redirect_uri", &redirect_uri)
        .append_pair("response_type", "code")
        .append_pair("state", csrf_state)
        .append_pair("scope", oauth_scope(provider.kind));
    if provider.kind == OAuthProviderKind::Google {
        authorize_url
            .query_pairs_mut()
            .append_pair("nonce", nonce)
            .append_pair("prompt", "select_account");
    } else if provider.kind == OAuthProviderKind::Epic {
        if let Some(deployment_id) = &provider.deployment_id {
            authorize_url
                .query_pairs_mut()
                .append_pair("deployment_id", deployment_id);
        }
    } else if provider.kind == OAuthProviderKind::Xbox {
        authorize_url
            .query_pairs_mut()
            .append_pair("prompt", "select_account");
    }
    Ok(authorize_url)
}

async fn finish_oauth_login(
    State(state): State<AppState>,
    Path(provider): Path<String>,
    headers: HeaderMap,
    Query(query): Query<HashMap<String, String>>,
) -> Result<Response, AuthError> {
    let provider = oauth_provider(&state, &provider)?;
    if provider.kind == OAuthProviderKind::Steam {
        let profile = finish_steam_login(&provider, &headers, &query).await?;
        return finish_provider_login(&state, &provider, profile);
    }

    if let Some(error) = query.get("error") {
        return Ok((
            StatusCode::BAD_REQUEST,
            Html(format!(
                "<h1>{} login failed</h1><p>{}</p>",
                provider.kind.label(),
                escape_html(error)
            )),
        )
            .into_response());
    }

    let code = query
        .get("code")
        .ok_or_else(|| AuthError::unauthorized("OAuth callback is missing code"))?;
    let state_param = query
        .get("state")
        .ok_or_else(|| AuthError::unauthorized("OAuth callback is missing state"))?;
    let (expected_state, expected_nonce) = read_oauth_state_cookie(&headers)
        .ok_or_else(|| AuthError::unauthorized("OAuth login state cookie is missing"))?;
    if state_param != &expected_state {
        return Err(AuthError::unauthorized("OAuth login state mismatch"));
    }

    let profile = exchange_oauth_code_for_profile(&provider, code, &expected_nonce).await?;
    finish_provider_login(&state, &provider, profile)
}

fn finish_provider_login(
    state: &AppState,
    provider: &OAuthProviderSettings,
    profile: OAuthProfile,
) -> Result<Response, AuthError> {
    let user = AuthUser::from_provider_identity(
        provider.kind.id(),
        &profile.subject,
        profile.email,
        profile.display_name,
    )?;
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

fn start_steam_login(
    provider: &OAuthProviderSettings,
    csrf_state: &str,
    nonce: &str,
) -> Result<Response, AuthError> {
    let mut return_to = url::Url::parse(&provider.redirect_uri())
        .map_err(|_| AuthError::internal("failed to build Steam return URL"))?;
    return_to.query_pairs_mut().append_pair("state", csrf_state);

    let mut authorize_url = url::Url::parse(STEAM_OPENID_ENDPOINT)
        .map_err(|_| AuthError::internal("failed to build Steam OpenID URL"))?;
    authorize_url
        .query_pairs_mut()
        .append_pair("openid.ns", STEAM_OPENID_NS)
        .append_pair("openid.mode", "checkid_setup")
        .append_pair("openid.return_to", return_to.as_str())
        .append_pair(
            "openid.realm",
            provider.public_base_url.trim_end_matches('/'),
        )
        .append_pair("openid.identity", STEAM_OPENID_IDENTIFIER_SELECT)
        .append_pair("openid.claimed_id", STEAM_OPENID_IDENTIFIER_SELECT);
    let cookie = oauth_state_cookie(provider, csrf_state, nonce);

    Ok((
        [(SET_COOKIE, cookie)],
        Redirect::temporary(authorize_url.as_str()),
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
    email: Option<String>,
    display_name: Option<String>,
}

fn authorize_url(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => "https://accounts.google.com/o/oauth2/v2/auth",
        OAuthProviderKind::GitHub => "https://github.com/login/oauth/authorize",
        OAuthProviderKind::Discord => "https://discord.com/oauth2/authorize",
        OAuthProviderKind::Epic => "https://www.epicgames.com/id/authorize",
        OAuthProviderKind::Xbox => {
            "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize"
        }
        OAuthProviderKind::Steam => STEAM_OPENID_ENDPOINT,
    }
}

fn token_url(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => "https://oauth2.googleapis.com/token",
        OAuthProviderKind::GitHub => "https://github.com/login/oauth/access_token",
        OAuthProviderKind::Discord => "https://discord.com/api/oauth2/token",
        OAuthProviderKind::Epic => "https://api.epicgames.dev/epic/oauth/v2/token",
        OAuthProviderKind::Xbox => "https://login.microsoftonline.com/consumers/oauth2/v2.0/token",
        OAuthProviderKind::Steam => STEAM_OPENID_ENDPOINT,
    }
}

fn oauth_scope(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => "openid email profile",
        OAuthProviderKind::GitHub => "read:user user:email",
        OAuthProviderKind::Discord => "identify email",
        OAuthProviderKind::Epic => "basic_profile",
        OAuthProviderKind::Xbox => "xboxlive.signin",
        OAuthProviderKind::Steam => "",
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
                email: Some(google_user.email.clone()),
                display_name: Some(google_user.email),
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
        OAuthProviderKind::Epic => {
            let access_token = exchange_epic_code(provider, code).await?;
            fetch_epic_profile(&access_token).await
        }
        OAuthProviderKind::Xbox => {
            let access_token = exchange_oauth_code(provider, code).await?;
            fetch_xbox_profile(&access_token).await
        }
        OAuthProviderKind::Steam => Err(AuthError::internal(
            "Steam uses OpenID, not OAuth code flow",
        )),
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

async fn exchange_epic_code(
    provider: &OAuthProviderSettings,
    code: &str,
) -> Result<String, AuthError> {
    let redirect_uri = provider.redirect_uri();
    let mut form = vec![
        ("code", code),
        ("redirect_uri", redirect_uri.as_str()),
        ("grant_type", "authorization_code"),
    ];
    if let Some(deployment_id) = &provider.deployment_id {
        form.push(("deployment_id", deployment_id.as_str()));
    }

    let response = reqwest::Client::new()
        .post(token_url(provider.kind))
        .header(reqwest::header::ACCEPT, "application/json")
        .basic_auth(&provider.client_id, Some(&provider.client_secret))
        .form(&form)
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to exchange Epic authorization code"))?;

    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "Epic authorization code exchange was rejected",
        ));
    }

    response
        .json::<OAuthTokenResponse>()
        .await
        .map(|response| response.access_token)
        .map_err(|_| AuthError::unauthorized("Epic token response did not include access_token"))
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
        email: Some(email.clone()),
        display_name: Some(email),
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
        email: Some(email.clone()),
        display_name: Some(email),
    })
}

#[derive(Debug, Deserialize)]
struct EpicUserInfoResponse {
    sub: Option<String>,
    account_id: Option<String>,
    id: Option<String>,
}

async fn fetch_epic_profile(access_token: &str) -> Result<OAuthProfile, AuthError> {
    let response = reqwest::Client::new()
        .get("https://api.epicgames.dev/epic/oauth/v2/userInfo")
        .bearer_auth(access_token)
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to fetch Epic profile"))?;
    if !response.status().is_success() {
        return Err(AuthError::unauthorized("Epic profile request was rejected"));
    }

    let user = response
        .json::<EpicUserInfoResponse>()
        .await
        .map_err(|_| AuthError::unauthorized("Epic profile response was invalid"))?;
    let subject = user
        .sub
        .or(user.account_id)
        .or(user.id)
        .ok_or_else(|| AuthError::unauthorized("Epic profile response had no subject"))?;

    Ok(OAuthProfile {
        email: Some(synthetic_epic_email(&subject)),
        display_name: Some("Epic Games player".to_owned()),
        subject,
    })
}

fn synthetic_epic_email(subject: &str) -> String {
    let local_part: String = subject
        .chars()
        .filter(|ch| ch.is_ascii_alphanumeric())
        .take(64)
        .collect();
    let local_part = if local_part.is_empty() {
        "unknown"
    } else {
        &local_part
    };
    format!("epic+{local_part}@users.rocket-sense.invalid")
}

#[derive(Debug, Deserialize)]
struct XboxUserTokenResponse {
    #[serde(rename = "Token")]
    token: String,
}

#[derive(Debug, Deserialize)]
struct XboxXstsTokenResponse {
    #[serde(rename = "DisplayClaims")]
    display_claims: XboxDisplayClaims,
}

#[derive(Debug, Deserialize)]
struct XboxDisplayClaims {
    xui: Vec<XboxUserClaim>,
}

#[derive(Debug, Deserialize)]
struct XboxUserClaim {
    #[serde(default)]
    xid: Option<String>,
    #[serde(default)]
    uhs: Option<String>,
    #[serde(default)]
    gtg: Option<String>,
}

async fn fetch_xbox_profile(access_token: &str) -> Result<OAuthProfile, AuthError> {
    let client = reqwest::Client::new();
    let user_token = fetch_xbox_user_token(&client, access_token).await?;
    let xsts = fetch_xbox_xsts_token(&client, &user_token.token).await?;
    let user_claim = xsts
        .display_claims
        .xui
        .into_iter()
        .next()
        .ok_or_else(|| AuthError::unauthorized("Xbox XSTS response had no user identity"))?;
    let xuid = user_claim
        .xid
        .ok_or_else(|| AuthError::unauthorized("Xbox XSTS response had no XUID"))?;
    let display_name = user_claim
        .gtg
        .or(user_claim.uhs)
        .map(|identifier| format!("Xbox {identifier}"))
        .unwrap_or_else(|| format!("Xbox {xuid}"));

    Ok(OAuthProfile {
        subject: xuid,
        email: None,
        display_name: Some(display_name),
    })
}

async fn fetch_xbox_user_token(
    client: &reqwest::Client,
    access_token: &str,
) -> Result<XboxUserTokenResponse, AuthError> {
    let response = client
        .post("https://user.auth.xboxlive.com/user/authenticate")
        .header("x-xbl-contract-version", "1")
        .json(&serde_json::json!({
            "RelyingParty": "http://auth.xboxlive.com",
            "TokenType": "JWT",
            "Properties": {
                "AuthMethod": "RPS",
                "SiteName": "user.auth.xboxlive.com",
                "RpsTicket": format!("d={access_token}"),
            },
        }))
        .send()
        .await
        .map_err(|_| {
            AuthError::unauthorized("failed to exchange Microsoft token for Xbox token")
        })?;

    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "Xbox user token request was rejected",
        ));
    }

    response
        .json::<XboxUserTokenResponse>()
        .await
        .map_err(|_| AuthError::unauthorized("Xbox user token response was invalid"))
}

async fn fetch_xbox_xsts_token(
    client: &reqwest::Client,
    user_token: &str,
) -> Result<XboxXstsTokenResponse, AuthError> {
    let response = client
        .post("https://xsts.auth.xboxlive.com/xsts/authorize")
        .header("x-xbl-contract-version", "1")
        .json(&serde_json::json!({
            "RelyingParty": "http://xboxlive.com",
            "TokenType": "JWT",
            "Properties": {
                "SandboxId": "RETAIL",
                "UserTokens": [user_token],
            },
        }))
        .send()
        .await
        .map_err(|_| {
            AuthError::unauthorized("failed to exchange Xbox user token for XSTS token")
        })?;

    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "Xbox XSTS token request was rejected",
        ));
    }

    response
        .json::<XboxXstsTokenResponse>()
        .await
        .map_err(|_| AuthError::unauthorized("Xbox XSTS token response was invalid"))
}

async fn finish_steam_login(
    provider: &OAuthProviderSettings,
    headers: &HeaderMap,
    query: &HashMap<String, String>,
) -> Result<OAuthProfile, AuthError> {
    let state_param = query
        .get("state")
        .ok_or_else(|| AuthError::unauthorized("Steam callback is missing state"))?;
    let (expected_state, _) = read_oauth_state_cookie(headers)
        .ok_or_else(|| AuthError::unauthorized("Steam login state cookie is missing"))?;
    if state_param != &expected_state {
        return Err(AuthError::unauthorized("Steam login state mismatch"));
    }

    validate_steam_openid_return_to(provider, state_param, query)?;
    let steam_id = verify_steam_openid(query).await?;

    Ok(OAuthProfile {
        email: Some(synthetic_steam_email(&steam_id)),
        display_name: Some(format!("Steam {steam_id}")),
        subject: steam_id,
    })
}

fn validate_steam_openid_return_to(
    provider: &OAuthProviderSettings,
    state_param: &str,
    query: &HashMap<String, String>,
) -> Result<(), AuthError> {
    let return_to = query
        .get("openid.return_to")
        .ok_or_else(|| AuthError::unauthorized("Steam callback is missing return_to"))?;
    let mut expected_return_to = url::Url::parse(&provider.redirect_uri())
        .map_err(|_| AuthError::internal("failed to build Steam return URL"))?;
    expected_return_to
        .query_pairs_mut()
        .append_pair("state", state_param);

    if return_to != expected_return_to.as_str() {
        return Err(AuthError::unauthorized("Steam callback return_to mismatch"));
    }

    Ok(())
}

async fn verify_steam_openid(query: &HashMap<String, String>) -> Result<String, AuthError> {
    if query.get("openid.ns").map(String::as_str) != Some(STEAM_OPENID_NS) {
        return Err(AuthError::unauthorized("Steam OpenID namespace is invalid"));
    }
    if query.get("openid.mode").map(String::as_str) != Some("id_res") {
        return Err(AuthError::unauthorized("Steam OpenID mode is invalid"));
    }
    if query.get("openid.op_endpoint").map(String::as_str) != Some(STEAM_OPENID_ENDPOINT) {
        return Err(AuthError::unauthorized(
            "Steam OpenID provider endpoint is invalid",
        ));
    }

    let claimed_id = query
        .get("openid.claimed_id")
        .ok_or_else(|| AuthError::unauthorized("Steam OpenID claimed_id is missing"))?;
    let identity = query
        .get("openid.identity")
        .ok_or_else(|| AuthError::unauthorized("Steam OpenID identity is missing"))?;
    if identity != claimed_id {
        return Err(AuthError::unauthorized(
            "Steam OpenID identity does not match claimed_id",
        ));
    }
    let steam_id = steam_id_from_claimed_id(claimed_id)?;

    let mut verification_form: Vec<(String, String)> = query
        .iter()
        .filter(|(key, _)| key.starts_with("openid."))
        .map(|(key, value)| {
            let value = if key == "openid.mode" {
                "check_authentication"
            } else {
                value
            };
            (key.clone(), value.to_owned())
        })
        .collect();
    verification_form.sort_by(|left, right| left.0.cmp(&right.0));

    let response = reqwest::Client::new()
        .post(STEAM_OPENID_ENDPOINT)
        .form(&verification_form)
        .send()
        .await
        .map_err(|_| AuthError::unauthorized("failed to verify Steam OpenID response"))?;
    if !response.status().is_success() {
        return Err(AuthError::unauthorized(
            "Steam OpenID verification request was rejected",
        ));
    }
    let body = response
        .text()
        .await
        .map_err(|_| AuthError::unauthorized("Steam OpenID verification response was invalid"))?;
    if !body.lines().any(|line| line.trim() == "is_valid:true") {
        return Err(AuthError::unauthorized(
            "Steam OpenID verification response was not valid",
        ));
    }

    Ok(steam_id)
}

fn steam_id_from_claimed_id(claimed_id: &str) -> Result<String, AuthError> {
    let steam_id = claimed_id
        .strip_prefix(STEAM_OPENID_ID_PREFIX)
        .ok_or_else(|| AuthError::unauthorized("Steam OpenID claimed_id is invalid"))?;
    if steam_id.is_empty() || !steam_id.chars().all(|ch| ch.is_ascii_digit()) {
        return Err(AuthError::unauthorized("Steam OpenID SteamID is invalid"));
    }

    Ok(steam_id.to_owned())
}

fn synthetic_steam_email(steam_id: &str) -> String {
    format!("steam+{steam_id}@users.rocket-sense.invalid")
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
