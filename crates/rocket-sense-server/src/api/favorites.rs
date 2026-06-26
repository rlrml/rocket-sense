use crate::{app::AppState, auth::AuthUser};
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
    Router::new()
        .route("/me/favorites", get(list_favorites))
        .route(
            "/me/favorites/players/{platform}/{platform_player_id}",
            axum::routing::put(add_favorite_player).delete(remove_favorite_player),
        )
        .route(
            "/me/favorites/uploaders/{user_id}",
            axum::routing::put(add_favorite_uploader).delete(remove_favorite_uploader),
        )
}

/// A logged-in user's pinned profiles, split by target type so the UI can
/// render a player section and an uploader section without re-discriminating.
#[derive(Debug, Serialize, ToSchema)]
pub struct FavoritesResponse {
    pub players: Vec<FavoritePlayerResponse>,
    pub uploaders: Vec<FavoriteUploaderResponse>,
}

/// A favorited in-game player identity, enriched with its best-known display
/// name and how many replays the player appears in.
#[derive(Debug, Serialize, ToSchema)]
pub struct FavoritePlayerResponse {
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
    pub appearance_count: u64,
    pub favorited_at: DateTime<Utc>,
}

/// A favorited uploader account, enriched with the same non-sensitive fields a
/// public uploader profile exposes plus how many replays they have uploaded.
#[derive(Debug, Serialize, ToSchema)]
pub struct FavoriteUploaderResponse {
    pub user_id: Uuid,
    pub display_name: Option<String>,
    pub avatar_url: Option<String>,
    pub upload_count: u64,
    pub favorited_at: DateTime<Utc>,
}

#[utoipa::path(
    get,
    path = "/api/v1/me/favorites",
    tag = "favorites",
    responses(
        (status = 200, description = "The current user's favorited players and uploaders", body = FavoritesResponse),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_favorites(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<FavoritesResponse>, ApiError> {
    let db = require_db(&state)?;

    let player_rows = sqlx::query(
        "SELECT f.platform, f.platform_player_id, f.created_at AS favorited_at, \
                COALESCE(pi.public_display_name, pi.current_display_name) AS display_name, \
                ( \
                    SELECT COUNT(DISTINCT rp.replay_id) \
                    FROM replay_players rp \
                    WHERE rp.platform = f.platform \
                      AND rp.platform_player_id = f.platform_player_id \
                ) AS appearance_count \
         FROM user_favorites f \
         LEFT JOIN player_identities pi \
             ON pi.platform = f.platform AND pi.platform_player_id = f.platform_player_id \
         WHERE f.user_id = $1 AND f.target_type = 'player' \
         ORDER BY f.created_at DESC",
    )
    .bind(auth_user.id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let mut players = Vec::with_capacity(player_rows.len());
    for row in player_rows {
        let appearance_count: i64 = row
            .try_get("appearance_count")
            .map_err(ApiError::internal)?;
        players.push(FavoritePlayerResponse {
            platform: row.try_get("platform").map_err(ApiError::internal)?,
            platform_player_id: row
                .try_get("platform_player_id")
                .map_err(ApiError::internal)?,
            display_name: row.try_get("display_name").map_err(ApiError::internal)?,
            appearance_count: appearance_count.max(0) as u64,
            favorited_at: row.try_get("favorited_at").map_err(ApiError::internal)?,
        });
    }

    let uploader_rows = sqlx::query(
        "SELECT u.id AS user_id, u.display_name, u.avatar_url, f.created_at AS favorited_at, \
                (SELECT COUNT(*) FROM replays r WHERE r.uploaded_by_user_id = u.id) AS upload_count \
         FROM user_favorites f \
         JOIN users u ON u.id = f.target_user_id \
         WHERE f.user_id = $1 AND f.target_type = 'uploader' \
         ORDER BY f.created_at DESC",
    )
    .bind(auth_user.id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let mut uploaders = Vec::with_capacity(uploader_rows.len());
    for row in uploader_rows {
        let upload_count: i64 = row.try_get("upload_count").map_err(ApiError::internal)?;
        uploaders.push(FavoriteUploaderResponse {
            user_id: row.try_get("user_id").map_err(ApiError::internal)?,
            display_name: row.try_get("display_name").map_err(ApiError::internal)?,
            avatar_url: row.try_get("avatar_url").map_err(ApiError::internal)?,
            upload_count: upload_count.max(0) as u64,
            favorited_at: row.try_get("favorited_at").map_err(ApiError::internal)?,
        });
    }

    Ok(Json(FavoritesResponse { players, uploaders }))
}

#[utoipa::path(
    put,
    path = "/api/v1/me/favorites/players/{platform}/{platform_player_id}",
    tag = "favorites",
    params(
        ("platform" = String, Path, description = "Rocket League platform, such as `steam` or `epic`"),
        ("platform_player_id" = String, Path, description = "Platform-scoped player id")
    ),
    responses(
        (status = 204, description = "Player favorited (idempotent)"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn add_favorite_player(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path((platform, platform_player_id)): Path<(String, String)>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;
    sqlx::query(
        "INSERT INTO user_favorites (user_id, target_type, platform, platform_player_id) \
         VALUES ($1, 'player', $2, $3) \
         ON CONFLICT DO NOTHING",
    )
    .bind(auth_user.id)
    .bind(&platform)
    .bind(&platform_player_id)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    Ok(StatusCode::NO_CONTENT)
}

#[utoipa::path(
    delete,
    path = "/api/v1/me/favorites/players/{platform}/{platform_player_id}",
    tag = "favorites",
    params(
        ("platform" = String, Path, description = "Rocket League platform, such as `steam` or `epic`"),
        ("platform_player_id" = String, Path, description = "Platform-scoped player id")
    ),
    responses(
        (status = 204, description = "Player un-favorited (idempotent)"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn remove_favorite_player(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path((platform, platform_player_id)): Path<(String, String)>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;
    sqlx::query(
        "DELETE FROM user_favorites \
         WHERE user_id = $1 AND target_type = 'player' \
           AND platform = $2 AND platform_player_id = $3",
    )
    .bind(auth_user.id)
    .bind(&platform)
    .bind(&platform_player_id)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    Ok(StatusCode::NO_CONTENT)
}

#[utoipa::path(
    put,
    path = "/api/v1/me/favorites/uploaders/{user_id}",
    tag = "favorites",
    params(
        ("user_id" = Uuid, Path, description = "Rocket Sense uploader user id")
    ),
    responses(
        (status = 204, description = "Uploader favorited (idempotent)"),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Uploader was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn add_favorite_uploader(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;

    let exists: bool = sqlx::query_scalar("SELECT EXISTS (SELECT 1 FROM users WHERE id = $1)")
        .bind(user_id)
        .fetch_one(db)
        .await
        .map_err(ApiError::internal)?;
    if !exists {
        return Err(ApiError::new(StatusCode::NOT_FOUND, "user not found"));
    }

    sqlx::query(
        "INSERT INTO user_favorites (user_id, target_type, target_user_id) \
         VALUES ($1, 'uploader', $2) \
         ON CONFLICT DO NOTHING",
    )
    .bind(auth_user.id)
    .bind(user_id)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    Ok(StatusCode::NO_CONTENT)
}

#[utoipa::path(
    delete,
    path = "/api/v1/me/favorites/uploaders/{user_id}",
    tag = "favorites",
    params(
        ("user_id" = Uuid, Path, description = "Rocket Sense uploader user id")
    ),
    responses(
        (status = 204, description = "Uploader un-favorited (idempotent)"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn remove_favorite_uploader(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;
    sqlx::query(
        "DELETE FROM user_favorites \
         WHERE user_id = $1 AND target_type = 'uploader' AND target_user_id = $2",
    )
    .bind(auth_user.id)
    .bind(user_id)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    Ok(StatusCode::NO_CONTENT)
}
