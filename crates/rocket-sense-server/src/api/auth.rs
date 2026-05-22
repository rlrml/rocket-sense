use crate::{
    app::AppState,
    auth::{issue_access_token, issue_dev_token, AccessToken, AuthError, AuthUser, SESSION_COOKIE},
    settings::GoogleOAuthSettings,
};
use axum::{
    extract::{Query, State},
    http::{header::SET_COOKIE, HeaderMap, StatusCode},
    response::{Html, IntoResponse, Redirect, Response},
    routing::{get, post},
    Json, Router,
};
use jsonwebtoken::{decode, decode_header, Algorithm, DecodingKey, Validation};
use serde::Deserialize;
use std::sync::Arc;
use utoipa::ToSchema;
use uuid::Uuid;

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/login", get(login_page))
        .route("/auth/google/start", get(start_google_login))
        .route("/auth/google/callback", get(finish_google_login))
}

pub fn router() -> Router<AppState> {
    Router::new().route("/auth/dev-token", post(create_dev_token))
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
    issue_dev_token(request.email, &state.app_jwt_secret).map(Json)
}

async fn login_page(State(state): State<AppState>) -> Html<String> {
    Html(render_login_page(state.google_oauth.as_deref()))
}

fn render_login_page(google_oauth: Option<&GoogleOAuthSettings>) -> String {
    LOGIN_PAGE_TEMPLATE.replace("{{oauth_panel}}", &oauth_panel(google_oauth))
}

fn oauth_panel(google_oauth: Option<&GoogleOAuthSettings>) -> String {
    match google_oauth {
        Some(_) => r#"<section>
      <h1>Rocket Sense</h1>
      <p>Sign in with Google to use the deployed app.</p>
      <a class="button" href="/auth/google/start">Continue with Google</a>
    </section>"#
            .to_owned(),
        None => r#"<section>
      <h1>Rocket Sense</h1>
      <p>Google login is not configured for this server.</p>
      <button type="button" disabled>Continue with Google</button>
    </section>"#
            .to_owned(),
    }
}

async fn start_google_login(State(state): State<AppState>) -> Result<Response, AuthError> {
    let google = google_settings(&state)?;
    let csrf_state = Uuid::new_v4().to_string();
    let nonce = Uuid::new_v4().to_string();
    let redirect_uri = google.redirect_uri();
    let mut authorize_url = url::Url::parse("https://accounts.google.com/o/oauth2/v2/auth")
        .map_err(|_| AuthError::internal("failed to build Google authorize URL"))?;
    authorize_url
        .query_pairs_mut()
        .append_pair("client_id", &google.client_id)
        .append_pair("redirect_uri", &redirect_uri)
        .append_pair("response_type", "code")
        .append_pair("scope", "openid email profile")
        .append_pair("state", &csrf_state)
        .append_pair("nonce", &nonce)
        .append_pair("prompt", "select_account");
    let cookie = oauth_state_cookie(&google, &csrf_state, &nonce);

    Ok((
        [(SET_COOKIE, cookie)],
        Redirect::temporary(authorize_url.as_str()),
    )
        .into_response())
}

#[derive(Debug, Deserialize)]
struct GoogleCallbackQuery {
    code: Option<String>,
    state: Option<String>,
    error: Option<String>,
}

async fn finish_google_login(
    State(state): State<AppState>,
    headers: HeaderMap,
    Query(query): Query<GoogleCallbackQuery>,
) -> Result<Response, AuthError> {
    let google = google_settings(&state)?;
    if let Some(error) = query.error {
        return Ok((
            StatusCode::BAD_REQUEST,
            Html(format!(
                "<h1>Google login failed</h1><p>{}</p>",
                escape_html(&error)
            )),
        )
            .into_response());
    }

    let code = query
        .code
        .ok_or_else(|| AuthError::unauthorized("Google callback is missing code"))?;
    let state_param = query
        .state
        .ok_or_else(|| AuthError::unauthorized("Google callback is missing state"))?;
    let (expected_state, expected_nonce) = read_oauth_state_cookie(&headers)
        .ok_or_else(|| AuthError::unauthorized("Google login state cookie is missing"))?;
    if state_param != expected_state {
        return Err(AuthError::unauthorized("Google login state mismatch"));
    }

    let id_token = exchange_google_code(&google, &code).await?;
    let google_user = verify_google_id_token(&google, &id_token, &expected_nonce).await?;
    let user = AuthUser::from_google_identity(&google_user.sub, google_user.email)?;
    let token = issue_access_token(&user, &state.app_jwt_secret)?;
    let secure = google.public_base_url.starts_with("https://");
    let session_cookie = session_cookie(&token.access_token, token.expires_in_seconds, secure);
    let clear_state_cookie = clear_oauth_state_cookie(secure);
    let body = render_login_success(&user, &token.access_token);

    Ok((
        [
            (SET_COOKIE, clear_state_cookie),
            (SET_COOKIE, session_cookie),
        ],
        Html(body),
    )
        .into_response())
}

fn google_settings(state: &AppState) -> Result<Arc<GoogleOAuthSettings>, AuthError> {
    state
        .google_oauth
        .clone()
        .ok_or_else(|| AuthError::unauthorized("Google login is not configured"))
}

#[derive(Debug, Deserialize)]
struct GoogleTokenResponse {
    id_token: String,
}

async fn exchange_google_code(
    google: &GoogleOAuthSettings,
    code: &str,
) -> Result<String, AuthError> {
    let client = reqwest::Client::new();
    let response = client
        .post("https://oauth2.googleapis.com/token")
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
    google: &GoogleOAuthSettings,
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

fn oauth_state_cookie(google: &GoogleOAuthSettings, state: &str, nonce: &str) -> String {
    cookie(
        "rocket_sense_oauth_state",
        &format!("{state}.{nonce}"),
        600,
        google.public_base_url.starts_with("https://"),
        "/auth/google",
        true,
    )
}

fn clear_oauth_state_cookie(secure: bool) -> String {
    cookie(
        "rocket_sense_oauth_state",
        "",
        0,
        secure,
        "/auth/google",
        true,
    )
}

fn session_cookie(token: &str, max_age_seconds: i64, secure: bool) -> String {
    cookie(SESSION_COOKIE, token, max_age_seconds, secure, "/", true)
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

fn render_login_success(user: &AuthUser, token: &str) -> String {
    LOGIN_SUCCESS_TEMPLATE
        .replace("{{email}}", &escape_html(&user.email))
        .replace("{{token}}", &escape_html(token))
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

    <form id="login-form">
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
    </section>
  </main>

  <script>
    const form = document.querySelector("#login-form");
    const submit = document.querySelector("#submit");
    const error = document.querySelector("#error");
    const result = document.querySelector("#result");
    const tokenOutput = document.querySelector("#token");
    const curlOutput = document.querySelector("#curl");

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

        tokenOutput.value = body.access_token;
        curlOutput.textContent = `curl -X POST http://127.0.0.1:8080/api/v1/replays \\
  -H "Authorization: Bearer ${body.access_token}" \\
  -F "file=@/path/to/replay.replay"`;
        result.classList.remove("hidden");
      } catch (err) {
        error.textContent = err.message;
      } finally {
        submit.disabled = false;
      }
    });
  </script>
</body>
</html>
"##;

const LOGIN_SUCCESS_TEMPLATE: &str = r##"<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rocket Sense Login Complete</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f8fafc;
      color: #172033;
    }

    main {
      width: min(100%, 640px);
      border: 1px solid #d6dbe5;
      border-radius: 8px;
      background: #ffffff;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }

    h1 {
      margin: 0 0 8px;
      font-size: 28px;
    }

    p {
      color: #536179;
      line-height: 1.5;
    }

    textarea, pre {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #c7ceda;
      border-radius: 6px;
      padding: 10px 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
      color: #172033;
      background: #ffffff;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    pre {
      overflow-x: auto;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <main>
    <h1>Logged in</h1>
    <p>Signed in as {{email}}. A session cookie has been set for the browser.</p>
    <p>Bearer token</p>
    <textarea readonly>{{token}}</textarea>
    <p>Replay upload</p>
    <pre>curl -X POST https://rocket-sense.duckdns.org/api/v1/replays \
  -H "Authorization: Bearer {{token}}" \
  -F "file=@/path/to/replay.replay"</pre>
  </main>
</body>
</html>
"##;
