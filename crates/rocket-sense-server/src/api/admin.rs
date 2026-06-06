use crate::{
    app::AppState,
    auth::AuthUser,
    processing::{
        enqueue_profile_timing_backfill, enqueue_replay_reprocessing,
        ReplayProfileTimingBackfillOptions, ReplayReprocessOptions,
    },
};
use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use utoipa::ToSchema;
use uuid::Uuid;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/admin/replays/reprocess", post(reprocess_replays))
        .route(
            "/admin/replays/backfill-profile-timing",
            post(backfill_profile_timing),
        )
}

#[derive(Debug, Default, Deserialize, ToSchema)]
pub struct ReprocessReplaysRequest {
    #[serde(default)]
    pub replay_ids: Vec<Uuid>,
    #[serde(default)]
    pub force: bool,
    pub concurrency: Option<usize>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReprocessReplaysResponse {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Default, Deserialize, ToSchema)]
pub struct BackfillProfileTimingRequest {
    #[serde(default)]
    pub replay_ids: Vec<Uuid>,
    #[serde(default)]
    pub force: bool,
    pub concurrency: Option<usize>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct BackfillProfileTimingResponse {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/replays/reprocess",
    tag = "admin",
    request_body = ReprocessReplaysRequest,
    responses(
        (status = 200, description = "Replay reprocessing batch enqueued", body = ReprocessReplaysResponse),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn reprocess_replays(
    _auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<ReprocessReplaysRequest>,
) -> Result<Json<ReprocessReplaysResponse>, ApiError> {
    let pool = require_db(&state)?;
    let summary = enqueue_replay_reprocessing(
        pool.clone(),
        state.storage.clone(),
        state.background_processing_permits.clone(),
        ReplayReprocessOptions {
            replay_ids: request.replay_ids,
            force: request.force,
            concurrency: request.concurrency.unwrap_or(1),
        },
    )
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(ReprocessReplaysResponse {
        matched_replays: summary.matched_replays,
        enqueued_replays: summary.enqueued_replays,
        skipped_replays: summary.skipped_replays,
        concurrency: summary.concurrency,
        force: summary.force,
    }))
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/replays/backfill-profile-timing",
    tag = "admin",
    request_body = BackfillProfileTimingRequest,
    responses(
        (status = 200, description = "Profile timing event backfill batch enqueued", body = BackfillProfileTimingResponse),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn backfill_profile_timing(
    _auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<BackfillProfileTimingRequest>,
) -> Result<Json<BackfillProfileTimingResponse>, ApiError> {
    let pool = require_db(&state)?;
    let summary = enqueue_profile_timing_backfill(
        pool.clone(),
        state.storage.clone(),
        state.background_processing_permits.clone(),
        ReplayProfileTimingBackfillOptions {
            replay_ids: request.replay_ids,
            force: request.force,
            concurrency: request.concurrency.unwrap_or(1),
        },
    )
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(BackfillProfileTimingResponse {
        matched_replays: summary.matched_replays,
        enqueued_replays: summary.enqueued_replays,
        skipped_replays: summary.skipped_replays,
        concurrency: summary.concurrency,
        force: summary.force,
    }))
}

fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
    state.db.as_ref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "postgres connection is required for replay reprocessing",
        )
    })
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

    fn internal(error: impl std::fmt::Display) -> Self {
        tracing::error!(error = %error, "admin request failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
    }
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
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
