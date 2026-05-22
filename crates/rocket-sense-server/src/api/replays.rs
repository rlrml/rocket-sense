use crate::app::AppState;
use axum::{
    extract::{Multipart, Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use rocket_sense_storage::{raw_replay_key, replay_mime_type, ObjectStorage};
use serde::Serialize;
use utoipa::ToSchema;
use uuid::Uuid;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/replays", post(create_replay))
        .route("/replays/{replay_id}", get(get_replay))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct CreateReplayResponse {
    pub replay: ReplayResponse,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayResponse {
    pub id: Uuid,
    pub file_sha256: String,
    pub byte_size: u64,
    pub storage_backend: String,
    pub storage_key: String,
    pub status: ReplayStatus,
}

#[derive(Debug, Serialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum ReplayStatus {
    Pending,
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

#[utoipa::path(
    post,
    path = "/api/v1/replays",
    tag = "replays",
    request_body(content_type = "multipart/form-data"),
    responses(
        (status = 201, description = "Replay accepted", body = CreateReplayResponse),
        (status = 400, description = "Replay file was missing or invalid"),
        (status = 500, description = "Replay could not be stored")
    )
)]
pub async fn create_replay(
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> Result<(StatusCode, Json<CreateReplayResponse>), ApiError> {
    let mut replay_bytes = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(ApiError::bad_request)?
    {
        if field.name() == Some("file") {
            replay_bytes = Some(field.bytes().await.map_err(ApiError::bad_request)?);
            break;
        }
    }

    let bytes =
        replay_bytes.ok_or_else(|| ApiError::bad_request("missing multipart field `file`"))?;
    let replay_id = Uuid::now_v7();
    let stored = state
        .storage
        .put(&raw_replay_key(replay_id), bytes, Some(replay_mime_type()))
        .await
        .map_err(ApiError::internal)?;

    Ok((
        StatusCode::CREATED,
        Json(CreateReplayResponse {
            replay: ReplayResponse {
                id: replay_id,
                file_sha256: stored.sha256,
                byte_size: stored.byte_size,
                storage_backend: stored.backend.to_owned(),
                storage_key: stored.key,
                status: ReplayStatus::Pending,
            },
        }),
    ))
}

#[utoipa::path(
    get,
    path = "/api/v1/replays/{replay_id}",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "Rocket Sense replay id")
    ),
    responses(
        (status = 501, description = "Replay metadata reads are not backed by the database yet")
    )
)]
pub async fn get_replay(Path(_replay_id): Path<Uuid>) -> Result<Json<ReplayResponse>, ApiError> {
    Err(ApiError::new(
        StatusCode::NOT_IMPLEMENTED,
        "replay metadata reads will be backed by postgres next",
    ))
}

#[derive(Debug)]
pub struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    fn new(status: StatusCode, message: impl Into<String>) -> Self {
        Self {
            status,
            message: message.into(),
        }
    }

    fn bad_request(error: impl std::fmt::Display) -> Self {
        Self::new(StatusCode::BAD_REQUEST, error.to_string())
    }

    fn internal(error: impl std::fmt::Display) -> Self {
        tracing::error!(error = %error, "request failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
    }
}

impl IntoResponse for ApiError {
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
