use axum::{
    extract::Path,
    http::{
        header::{
            ACCEPT, ACCESS_CONTROL_ALLOW_HEADERS, ACCESS_CONTROL_ALLOW_METHODS,
            ACCESS_CONTROL_ALLOW_ORIGIN, ACCESS_CONTROL_EXPOSE_HEADERS, AUTHORIZATION,
            CONTENT_DISPOSITION, CONTENT_TYPE, USER_AGENT,
        },
        HeaderMap, HeaderName, HeaderValue, StatusCode,
    },
    response::{IntoResponse, Redirect, Response},
    routing::get,
    Router,
};

use crate::app::AppState;

use super::replays::ApiError;

const BALLCHASING_REPLAY_FILE_BASE_URL: &str = "https://ballchasing.com/api/replays";
const ROCKET_SENSE_USER_AGENT: &str = "rocket-sense";

#[cfg(test)]
#[path = "ballchasing_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new()
        .route(
            "/ballchasing/replays/{ballchasing_replay_id}/file",
            get(proxy_ballchasing_replay_file),
        )
        .route(
            "/ballchasing/replays/{ballchasing_replay_id}/load",
            get(load_ballchasing_replay),
        )
}

#[utoipa::path(
    get,
    path = "/api/v1/ballchasing/replays/{ballchasing_replay_id}/load",
    tag = "ballchasing",
    params(
        ("ballchasing_replay_id" = String, Path, description = "Ballchasing replay id")
    ),
    responses(
        (status = 307, description = "Redirects to the hosted replay viewer"),
        (status = 400, description = "Ballchasing replay id was invalid")
    )
)]
pub async fn load_ballchasing_replay(
    Path(ballchasing_replay_id): Path<String>,
) -> Result<Redirect, ApiError> {
    validate_ballchasing_replay_id(&ballchasing_replay_id)?;

    Ok(Redirect::temporary(&hosted_ballchasing_replay_app_url(
        "/subtr-actor/",
        &ballchasing_replay_id,
    )))
}

#[utoipa::path(
    get,
    path = "/api/v1/ballchasing/replays/{ballchasing_replay_id}/file",
    tag = "ballchasing",
    params(
        ("ballchasing_replay_id" = String, Path, description = "Ballchasing replay id")
    ),
    responses(
        (status = 200, description = "Raw replay file proxied from Ballchasing"),
        (status = 400, description = "Ballchasing replay id was invalid"),
        (status = 404, description = "Ballchasing replay was not found"),
        (status = 502, description = "Ballchasing returned an unexpected response")
    )
)]
pub async fn proxy_ballchasing_replay_file(
    Path(ballchasing_replay_id): Path<String>,
    request_headers: HeaderMap,
) -> Result<Response, ApiError> {
    validate_ballchasing_replay_id(&ballchasing_replay_id)?;
    let upstream = fetch_ballchasing_replay_file(
        &ballchasing_replay_id,
        request_headers
            .get(AUTHORIZATION)
            .and_then(|value| value.to_str().ok()),
    )
    .await?;

    let mut response = upstream.bytes.into_response();
    apply_permissive_cors_headers(response.headers_mut());
    set_header_if_valid(
        response.headers_mut(),
        CONTENT_TYPE,
        upstream
            .content_type
            .as_deref()
            .unwrap_or("application/octet-stream"),
    );
    set_header_if_valid(
        response.headers_mut(),
        CONTENT_DISPOSITION,
        upstream.content_disposition.as_deref().unwrap_or(&format!(
            "attachment; filename=\"{ballchasing_replay_id}.replay\""
        )),
    );

    Ok(response)
}

struct BallchasingReplayFile {
    bytes: Vec<u8>,
    content_type: Option<String>,
    content_disposition: Option<String>,
}

async fn fetch_ballchasing_replay_file(
    ballchasing_replay_id: &str,
    authorization: Option<&str>,
) -> Result<BallchasingReplayFile, ApiError> {
    let client = reqwest::Client::new();
    fetch_ballchasing_replay_file_with_client(&client, ballchasing_replay_id, authorization).await
}

async fn fetch_ballchasing_replay_file_with_client(
    client: &reqwest::Client,
    ballchasing_replay_id: &str,
    authorization: Option<&str>,
) -> Result<BallchasingReplayFile, ApiError> {
    let url = ballchasing_replay_file_url(ballchasing_replay_id);
    let mut request = client
        .get(url)
        .header(USER_AGENT.as_str(), ROCKET_SENSE_USER_AGENT)
        .header(ACCEPT.as_str(), "application/octet-stream");
    if let Some(authorization) = authorization {
        request = request.header(AUTHORIZATION.as_str(), authorization);
    }

    let response = request
        .send()
        .await
        .map_err(|error| upstream_error("failed to fetch Ballchasing replay", error))?;
    let status = response.status();
    if !status.is_success() {
        return Err(ballchasing_status_error(status));
    }

    let content_type = response
        .headers()
        .get(CONTENT_TYPE.as_str())
        .and_then(|value| value.to_str().ok())
        .map(str::to_owned);
    let content_disposition = response
        .headers()
        .get(CONTENT_DISPOSITION.as_str())
        .and_then(|value| value.to_str().ok())
        .map(str::to_owned);
    let bytes = response
        .bytes()
        .await
        .map_err(|error| upstream_error("failed to read Ballchasing replay", error))?
        .to_vec();

    Ok(BallchasingReplayFile {
        bytes,
        content_type,
        content_disposition,
    })
}

fn ballchasing_status_error(status: reqwest::StatusCode) -> ApiError {
    let axum_status = StatusCode::from_u16(status.as_u16()).unwrap_or(StatusCode::BAD_GATEWAY);
    let message = match axum_status {
        StatusCode::NOT_FOUND => "Ballchasing replay not found",
        StatusCode::TOO_MANY_REQUESTS => "Ballchasing rate limit exceeded",
        StatusCode::UNAUTHORIZED | StatusCode::FORBIDDEN => {
            "Ballchasing rejected the replay download request"
        }
        _ => "Ballchasing replay download failed",
    };

    ApiError::new(axum_status, message)
}

fn upstream_error(message: &'static str, error: reqwest::Error) -> ApiError {
    tracing::warn!(%error, "Ballchasing replay download failed");
    ApiError::new(StatusCode::BAD_GATEWAY, message)
}

fn validate_ballchasing_replay_id(ballchasing_replay_id: &str) -> Result<(), ApiError> {
    let valid = !ballchasing_replay_id.is_empty()
        && ballchasing_replay_id.len() <= 128
        && ballchasing_replay_id
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'-' | b'_'));
    if valid {
        Ok(())
    } else {
        Err(ApiError::bad_request(
            "ballchasing_replay_id must contain only letters, numbers, hyphens, and underscores",
        ))
    }
}

fn ballchasing_replay_file_url(ballchasing_replay_id: &str) -> String {
    format!("{BALLCHASING_REPLAY_FILE_BASE_URL}/{ballchasing_replay_id}/file")
}

fn hosted_ballchasing_replay_app_url(app_path: &str, ballchasing_replay_id: &str) -> String {
    let replay_url = format!("/api/v1/ballchasing/replays/{ballchasing_replay_id}/file");
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    query.append_pair("replayUrl", &replay_url);

    format!("{app_path}?{}", query.finish())
}

fn apply_permissive_cors_headers(headers: &mut HeaderMap) {
    headers.insert(ACCESS_CONTROL_ALLOW_ORIGIN, HeaderValue::from_static("*"));
    headers.insert(ACCESS_CONTROL_ALLOW_METHODS, HeaderValue::from_static("*"));
    headers.insert(ACCESS_CONTROL_ALLOW_HEADERS, HeaderValue::from_static("*"));
    headers.insert(ACCESS_CONTROL_EXPOSE_HEADERS, HeaderValue::from_static("*"));
    headers.insert(
        HeaderName::from_static("access-control-max-age"),
        HeaderValue::from_static("86400"),
    );
    headers.insert(
        HeaderName::from_static("access-control-allow-private-network"),
        HeaderValue::from_static("true"),
    );
    headers.insert(
        HeaderName::from_static("cross-origin-resource-policy"),
        HeaderValue::from_static("cross-origin"),
    );
    headers.insert(
        HeaderName::from_static("timing-allow-origin"),
        HeaderValue::from_static("*"),
    );
}

fn set_header_if_valid(headers: &mut HeaderMap, name: HeaderName, value: &str) {
    if let Ok(value) = HeaderValue::from_str(value) {
        headers.insert(name, value);
    }
}
