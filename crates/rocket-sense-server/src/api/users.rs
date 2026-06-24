use crate::app::AppState;
use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::Row;
use utoipa::ToSchema;
use uuid::Uuid;

use super::replays::{require_db, ApiError};

pub fn router() -> Router<AppState> {
    Router::new().route("/users/{user_id}", get(get_user_profile))
}

/// Public-facing profile for an uploader. Intentionally narrow: the same
/// non-sensitive fields already surfaced alongside replays (display name,
/// avatar) plus how many replays they have uploaded. Email is deliberately
/// omitted so a profile page does not become a public email directory.
#[derive(Debug, Serialize, ToSchema)]
pub struct UserProfileResponse {
    pub id: Uuid,
    pub display_name: Option<String>,
    pub avatar_url: Option<String>,
    pub created_at: DateTime<Utc>,
    pub upload_count: u64,
}

#[utoipa::path(
    get,
    path = "/api/v1/users/{user_id}",
    tag = "users",
    params(
        ("user_id" = Uuid, Path, description = "Rocket Sense user id")
    ),
    responses(
        (status = 200, description = "Public user profile", body = UserProfileResponse),
        (status = 404, description = "User was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_user_profile(
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<Json<UserProfileResponse>, ApiError> {
    let db = require_db(&state)?;
    let row = sqlx::query(
        "SELECT u.id, u.display_name, u.avatar_url, u.created_at, \
         (SELECT COUNT(*) FROM replays r WHERE r.uploaded_by_user_id = u.id) AS upload_count \
         FROM users u WHERE u.id = $1",
    )
    .bind(user_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "user not found"))?;

    let upload_count: i64 = row.try_get("upload_count").map_err(ApiError::internal)?;
    Ok(Json(UserProfileResponse {
        id: row.try_get("id").map_err(ApiError::internal)?,
        display_name: row.try_get("display_name").map_err(ApiError::internal)?,
        avatar_url: row.try_get("avatar_url").map_err(ApiError::internal)?,
        created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        upload_count: upload_count.max(0) as u64,
    }))
}
