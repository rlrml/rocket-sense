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
use serde::Deserialize;
use utoipa::ToSchema;
use uuid::Uuid;

const SESSION_COOKIE_MAX_AGE_SECONDS: i64 = 400 * 24 * 60 * 60;

#[cfg(test)]
#[path = "auth_tests.rs"]
mod tests;

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/", get(root_page))
        .route("/login", get(login_page))
        .route("/profile", get(profile_page))
        .route("/auth/{provider}/start", get(start_oauth_login))
        .route("/auth/{provider}/callback", get(finish_oauth_login))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/auth/dev-token", post(create_dev_token))
        .route("/auth/profile-token", post(create_profile_token))
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

async fn root_page() -> Redirect {
    Redirect::temporary("/replays")
}

async fn login_page(State(state): State<AppState>) -> Html<String> {
    Html(render_login_page(state.auth_mode, &state.oauth_providers))
}

async fn profile_page(State(state): State<AppState>) -> Html<String> {
    Html(render_profile_page(state.auth_mode))
}

fn render_login_page(auth_mode: AuthMode, oauth_providers: &[OAuthProviderSettings]) -> String {
    LOGIN_PAGE_TEMPLATE
        .replace("{{oauth_panel}}", &oauth_panel(oauth_providers))
        .replace("{{dev_link}}", dev_login_link(auth_mode))
}

fn render_profile_page(auth_mode: AuthMode) -> String {
    PROFILE_PAGE_TEMPLATE
        .replace("{{dev_token_panel}}", dev_token_panel(auth_mode))
        .replace("{{session_token_panel}}", session_token_panel(auth_mode))
        .replace("{{profile_token_script}}", profile_token_script(auth_mode))
}

fn oauth_panel(oauth_providers: &[OAuthProviderSettings]) -> String {
    let buttons = oauth_buttons(oauth_providers);
    if oauth_providers.is_empty() {
        r#"<section>
      <h1>Rocket Sense</h1>
      <p>No OAuth login providers are configured for this server.</p>
      <button type="button" disabled>Login unavailable</button>
    </section>"#
            .to_owned()
    } else {
        format!(
            r#"<section>
      <h1>Rocket Sense</h1>
      <p>Choose an account to use the deployed app.</p>
      <div class="oauth-buttons">
{buttons}
      </div>
    </section>"#
        )
    }
}

fn oauth_buttons(oauth_providers: &[OAuthProviderSettings]) -> String {
    OAuthProviderKind::all()
        .iter()
        .map(|provider| {
            let configured = oauth_providers.iter().any(|settings| settings.kind == *provider);
            if configured {
                format!(
                    r#"        <a class="button provider-{}" href="/auth/{}/start">{}<span>Continue with {}</span></a>"#,
                    provider.id(),
                    provider.id(),
                    provider_icon(*provider),
                    provider.label()
                )
            } else {
                format!(
                    r#"        <button class="button provider-{} provider-disabled" type="button" disabled>{}<span>{} unavailable</span></button>"#,
                    provider.id(),
                    provider_icon(*provider),
                    provider.label()
                )
            }
        })
        .collect::<Vec<_>>()
        .join("\n")
}

fn provider_icon(kind: OAuthProviderKind) -> &'static str {
    match kind {
        OAuthProviderKind::Google => GOOGLE_ICON,
        OAuthProviderKind::GitHub => GITHUB_ICON,
        OAuthProviderKind::Discord => DISCORD_ICON,
    }
}

fn dev_login_link(auth_mode: AuthMode) -> &'static str {
    match auth_mode {
        AuthMode::Dev => r#"<a class="secondary" href="/profile">Use development profile</a>"#,
        AuthMode::OAuth => "",
    }
}

fn dev_token_panel(auth_mode: AuthMode) -> &'static str {
    match auth_mode {
        AuthMode::Dev => DEV_TOKEN_PANEL,
        AuthMode::OAuth => "",
    }
}

fn session_token_panel(auth_mode: AuthMode) -> &'static str {
    match auth_mode {
        AuthMode::Dev => "",
        AuthMode::OAuth => SESSION_TOKEN_PANEL,
    }
}

fn profile_token_script(auth_mode: AuthMode) -> &'static str {
    match auth_mode {
        AuthMode::Dev => DEV_PROFILE_SCRIPT,
        AuthMode::OAuth => OAUTH_PROFILE_SCRIPT,
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

const GOOGLE_ICON: &str = r##"<svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
          <path fill="#4285f4" d="M17.64 9.2c0-.64-.06-1.26-.16-1.86H9v3.51h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.63z"/>
          <path fill="#34a853" d="M9 18c2.43 0 4.47-.81 5.96-2.17l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"/>
          <path fill="#fbbc05" d="M3.96 10.72A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.17.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.05l3-2.33z"/>
          <path fill="#ea4335" d="M9 3.58c1.32 0 2.5.45 3.43 1.35l2.58-2.58C13.45.9 11.42 0 9 0A9 9 0 0 0 .96 4.95l3 2.33C4.67 5.16 6.65 3.58 9 3.58z"/>
        </svg>"##;

const GITHUB_ICON: &str = r##"<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.06c.98 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
        </svg>"##;

const DISCORD_ICON: &str = r##"<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
          <path d="M19.54 5.34A18.64 18.64 0 0 0 14.91 3.9c-.2.35-.43.82-.59 1.19a17.3 17.3 0 0 0-5.15 0 12.6 12.6 0 0 0-.6-1.19c-1.62.28-3.17.76-4.63 1.44C1.01 9.72.22 13.99.62 18.19a18.8 18.8 0 0 0 5.68 2.88c.46-.62.86-1.28 1.2-1.99-.66-.25-1.3-.56-1.89-.93.16-.12.31-.24.46-.37a13.35 13.35 0 0 0 11.36 0c.15.13.3.25.46.37-.6.37-1.23.68-1.9.93.34.71.74 1.37 1.2 1.99a18.76 18.76 0 0 0 5.69-2.88c.47-4.87-.79-9.11-3.34-12.85zM8.35 15.6c-1.1 0-2-1.02-2-2.27 0-1.25.88-2.27 2-2.27 1.12 0 2.02 1.03 2 2.27 0 1.25-.88 2.27-2 2.27zm7.3 0c-1.1 0-2-1.02-2-2.27 0-1.25.88-2.27 2-2.27 1.12 0 2.02 1.03 2 2.27 0 1.25-.88 2.27-2 2.27z"/>
        </svg>"##;

const LOGIN_PAGE_TEMPLATE: &str = r##"<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rocket Sense Login</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f8fafc;
      color: #172033;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    main {
      width: min(100%, 560px);
      display: grid;
      gap: 18px;
    }

    form, section {
      border: 1px solid #d6dbe5;
      border-radius: 8px;
      background: #ffffff;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }

    h1 {
      margin: 0 0 4px;
      font-size: 28px;
      line-height: 1.15;
    }

    p {
      margin: 0;
      color: #536179;
      line-height: 1.5;
    }

    label {
      display: grid;
      gap: 8px;
      font-weight: 650;
      margin-top: 18px;
    }

    input, textarea, pre {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #c7ceda;
      border-radius: 6px;
      padding: 10px 12px;
      font: inherit;
      background: #ffffff;
      color: #172033;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
    }

    button, .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
      border: 0;
      border-radius: 6px;
      min-height: 44px;
      padding: 10px 16px;
      background: #165dff;
      color: white;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
    }

    .button svg {
      width: 20px;
      height: 20px;
      flex: 0 0 auto;
    }

    .oauth-buttons {
      display: grid;
      gap: 10px;
      margin-top: 16px;
    }

    .oauth-buttons .button {
      margin-top: 0;
    }

    .provider-google {
      border: 1px solid #dadce0;
      background: #ffffff;
      color: #3c4043;
      box-shadow: 0 1px 2px rgba(60, 64, 67, 0.16);
    }

    .provider-google:hover {
      background: #f8fafd;
      border-color: #d2e3fc;
    }

    .provider-github {
      background: #24292f;
      color: #ffffff;
    }

    .provider-github:hover {
      background: #1f2328;
    }

    .provider-discord {
      background: #5865f2;
      color: #ffffff;
    }

    .provider-discord:hover {
      background: #4752c4;
    }

    .provider-disabled,
    .provider-disabled:hover {
      opacity: 0.58;
      cursor: not-allowed;
      filter: grayscale(0.2);
    }

    .secondary {
      color: #165dff;
      font-weight: 700;
      text-decoration: none;
    }

    button:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    pre {
      overflow-x: auto;
      white-space: pre-wrap;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
    }

    .hidden {
      display: none;
    }

    .error {
      color: #b42318;
    }
  </style>
</head>
<body>
  <main>
    {{oauth_panel}}

    {{dev_link}}
  </main>
</body>
</html>
"##;

const PROFILE_PAGE_TEMPLATE: &str = r##"<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rocket Sense Profile</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f8fafc;
      color: #172033;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    main {
      width: min(100%, 760px);
      display: grid;
      gap: 18px;
    }

    form, section {
      border: 1px solid #d6dbe5;
      border-radius: 8px;
      background: #ffffff;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }

    h1 {
      margin: 0 0 4px;
      font-size: 28px;
      line-height: 1.15;
    }

    p {
      margin: 0;
      color: #536179;
      line-height: 1.5;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-top: 14px;
    }

    th, td {
      padding: 10px 8px;
      border-bottom: 1px solid #e5e9f0;
      text-align: left;
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    th {
      color: #536179;
      font-size: 12px;
      font-weight: 750;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    dl {
      display: grid;
      grid-template-columns: max-content minmax(0, 1fr);
      gap: 8px 16px;
      margin: 16px 0 0;
    }

    dt {
      color: #536179;
      font-weight: 700;
    }

    dd {
      margin: 0;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    label {
      display: grid;
      gap: 8px;
      font-weight: 650;
      margin-top: 18px;
    }

    input, textarea, pre {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #c7ceda;
      border-radius: 6px;
      padding: 10px 12px;
      font: inherit;
      background: #ffffff;
      color: #172033;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
    }

    button, .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;
      border: 0;
      border-radius: 6px;
      padding: 10px 14px;
      background: #165dff;
      color: white;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
    }

    .nav {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .nav a {
      color: #165dff;
      font-weight: 700;
      text-decoration: none;
    }

    button:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    pre {
      overflow-x: auto;
      white-space: pre-wrap;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
    }

    .hidden {
      display: none;
    }

    .error {
      color: #b42318;
    }

    .muted {
      color: #536179;
    }

    .replay-link {
      color: #165dff;
      font-weight: 700;
      text-decoration: none;
    }

    .replay-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 620px) {
      body {
        padding: 12px;
      }

      dl {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <section>
      <h1>Profile</h1>
      <p>Use this page for API upload tokens and replay upload commands.</p>
      <div class="nav">
        <a href="/replays">Replay list</a>
        <a href="/login">Login</a>
      </div>
    </section>

    <section>
      <h1>Account</h1>
      <p id="account-status">No active Rocket Sense token found.</p>
      <dl>
        <dt>Email</dt>
        <dd id="account-email">-</dd>
        <dt>User id</dt>
        <dd id="account-user-id">-</dd>
        <dt>Provider</dt>
        <dd id="account-provider">-</dd>
        <dt>Connected account id</dt>
        <dd id="account-subject">-</dd>
        <dt>Token expiration</dt>
        <dd id="account-expires">-</dd>
      </dl>
    </section>

    {{dev_token_panel}}

    {{session_token_panel}}

    <section>
      <h1>Recent uploads</h1>
      <p id="recent-status">Create an upload token to show recent uploads for this account.</p>
      <div id="recent-content"></div>
    </section>
  </main>

  <script>
    const accountStatus = document.querySelector("#account-status");
    const accountEmail = document.querySelector("#account-email");
    const accountUserId = document.querySelector("#account-user-id");
    const accountProvider = document.querySelector("#account-provider");
    const accountSubject = document.querySelector("#account-subject");
    const accountExpires = document.querySelector("#account-expires");
    const recentStatus = document.querySelector("#recent-status");
    const recentContent = document.querySelector("#recent-content");

    function showProfile(token) {
      try {
        const claims = parseJwtClaims(token);
        accountEmail.textContent = text(claims.email);
        accountUserId.textContent = text(claims.sub);
        accountProvider.textContent = text(claims.provider_name);
        accountSubject.textContent = text(claims.provider_subject);
        accountExpires.textContent = claims.exp ? formatDate(new Date(claims.exp * 1000)) : "Never";
        accountStatus.textContent = claims.provider_name && claims.provider_subject
          ? `Connected through ${providerLabel(claims.provider_name)} account ${claims.provider_subject}.`
          : "This profile is tied to the current Rocket Sense token.";
      } catch (err) {
        accountEmail.textContent = "-";
        accountUserId.textContent = "-";
        accountProvider.textContent = "-";
        accountSubject.textContent = "-";
        accountExpires.textContent = "-";
        accountStatus.textContent = "The saved Rocket Sense token could not be read.";
      }
    }

    function parseJwtClaims(token) {
      const parts = token.split(".");
      if (parts.length < 2) throw new Error("Invalid token");
      const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
      const binary = atob(padded);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    }

    async function loadRecentUploads(token) {
      recentStatus.textContent = "Loading recent uploads...";
      recentContent.replaceChildren();

      try {
        const params = new URLSearchParams({
          uploader: "me",
          count: "5",
          offset: "0",
          "sort-by": "upload-date",
          "sort-dir": "desc"
        });
        const response = await fetch(`/api/v1/replays?${params}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const body = await response.json();

        if (!response.ok) {
          throw new Error(body.error || "Replay request failed");
        }

        renderRecentUploads(body.replays || []);
      } catch (err) {
        recentStatus.textContent = err.message;
      }
    }

    function renderRecentUploads(replays) {
      if (replays.length === 0) {
        recentStatus.textContent = "No uploads found for this account.";
        return;
      }

      recentStatus.textContent = `${replays.length} most recent upload${replays.length === 1 ? "" : "s"}.`;
      const rows = replays.map((replay) => {
        const name = replayName(replay);
        return `
          <tr>
            <td title="${escapeHtml(name)}"><a class="replay-link" href="/replays/${encodeURIComponent(replay.id)}">${escapeHtml(name)}</a></td>
            <td>${escapeHtml(formatDate(replay.created_at))}</td>
            <td>${escapeHtml(text(replay.status))}</td>
            <td>${escapeHtml(formatBytes(replay.byte_size))}</td>
          </tr>
        `;
      }).join("");
      recentContent.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Replay</th>
              <th>Uploaded</th>
              <th>Status</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    function replayName(replay) {
      return replay.original_file_name || replay.external_replay_id || replay.id;
    }

    function formatDate(value) {
      if (!value) return "-";
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(value));
    }

    function formatBytes(value) {
      if (!Number.isFinite(value)) return "-";
      return new Intl.NumberFormat(undefined, {
        style: "unit",
        unit: "byte",
        notation: "compact"
      }).format(value);
    }

    function text(value) {
      return value == null || value === "" ? "-" : String(value);
    }

    function providerLabel(value) {
      switch (value) {
        case "dev":
          return "development";
        case "google":
          return "Google";
        case "github":
          return "GitHub";
        case "discord":
          return "Discord";
        default:
          return value;
      }
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    }
  </script>

  {{profile_token_script}}
</body>
</html>
"##;

const DEV_TOKEN_PANEL: &str = r##"<form id="login-form">
      <h1>Development token</h1>
      <p>Create a local bearer token for replay upload testing.</p>
      <label>
        Email
        <input id="email" name="email" type="email" autocomplete="email" required>
      </label>
      <button id="submit" type="submit">Create token</button>
      <p id="error" class="error" role="alert"></p>
    </form>

    <section id="result" class="hidden">
      <p>Bearer token</p>
      <textarea id="token" readonly></textarea>
      <p>Replay upload</p>
      <pre id="curl"></pre>
    </section>"##;

const SESSION_TOKEN_PANEL: &str = r##"<section>
      <h1>Upload token</h1>
      <p>Create a bearer token from your current browser session.</p>
      <button id="session-token" type="button">Create session token</button>
      <p id="session-error" class="error" role="alert"></p>
      <div id="result" class="hidden">
        <p>Bearer token</p>
        <textarea id="token" readonly></textarea>
        <p>Replay upload</p>
        <pre id="curl"></pre>
      </div>
    </section>"##;

const DEV_PROFILE_SCRIPT: &str = r##"<script>
    const form = document.querySelector("#login-form");
    const submit = document.querySelector("#submit");
    const error = document.querySelector("#error");
    const result = document.querySelector("#result");
    const tokenOutput = document.querySelector("#token");
    const curlOutput = document.querySelector("#curl");
    const existingToken = localStorage.getItem("rocket_sense_access_token") || "";

    if (existingToken) {
      showProfile(existingToken);
      loadRecentUploads(existingToken);
    }

    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        submit.disabled = true;
        error.textContent = "";

        try {
          const response = await fetch("/api/v1/auth/dev-token", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: form.email.value })
          });
          const body = await response.json();

          if (!response.ok) {
            throw new Error(body.error || "Token request failed");
          }

          localStorage.setItem("rocket_sense_access_token", body.access_token);
          tokenOutput.value = body.access_token;
          curlOutput.textContent = `curl -X POST http://127.0.0.1:8080/api/v1/replays \\
  -H "Authorization: Bearer ${body.access_token}" \\
  -F "file=@/path/to/replay.replay"`;
          result.classList.remove("hidden");
          showProfile(body.access_token);
          loadRecentUploads(body.access_token);
        } catch (err) {
          error.textContent = err.message;
        } finally {
          submit.disabled = false;
        }
      });
    }
  </script>"##;

const OAUTH_PROFILE_SCRIPT: &str = r##"<script>
    const button = document.querySelector("#session-token");
    const error = document.querySelector("#session-error");
    const result = document.querySelector("#result");
    const tokenOutput = document.querySelector("#token");
    const curlOutput = document.querySelector("#curl");
    const existingToken = localStorage.getItem("rocket_sense_access_token") || "";

    if (existingToken) {
      showProfile(existingToken);
      loadRecentUploads(existingToken);
    }

    async function createSessionToken(options = {}) {
      button.disabled = true;
      if (!options.quiet) error.textContent = "";

      try {
        const response = await fetch("/api/v1/auth/profile-token", {
          method: "POST",
          credentials: "same-origin"
        });
        const body = await response.json();

        if (!response.ok) {
          throw new Error(body.error || "Token request failed");
        }

        localStorage.setItem("rocket_sense_access_token", body.access_token);
        tokenOutput.value = body.access_token;
        curlOutput.textContent = `curl -X POST ${location.origin}/api/v1/replays \\
  -H "Authorization: Bearer ${body.access_token}" \\
  -F "file=@/path/to/replay.replay"`;
        result.classList.remove("hidden");
        showProfile(body.access_token);
        loadRecentUploads(body.access_token);
      } catch (err) {
        if (!options.quiet) error.textContent = err.message;
      } finally {
        button.disabled = false;
      }
    }

    button.addEventListener("click", createSessionToken);
    createSessionToken({ quiet: true });
  </script>"##;
