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
    /// In-game player identities linked to this account, so a profile can deep
    /// link to the uploader's `/players/{platform}/id/{platform_player_id}`
    /// page. Sourced from the account's Steam/Epic login subject (which *is*
    /// the in-game platform id) plus any verified player-identity claims.
    pub game_identities: Vec<UserGameIdentity>,
}

/// A single linked in-game player identity for an uploader.
#[derive(Debug, Serialize, ToSchema)]
pub struct UserGameIdentity {
    /// Player platform, e.g. `steam` or `epic`.
    pub platform: String,
    /// Platform-specific player id (Steam ID64, Epic account id, ...).
    pub platform_player_id: String,
    /// Best-known public display name for the player, if any.
    pub display_name: Option<String>,
    /// Number of distinct replays this player appears in.
    pub appearance_count: u64,
    /// How the link was established: `login` (auto from the OAuth subject) or
    /// `claim` (a verified player-identity claim).
    pub source: String,
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

    // Linked in-game identities: the account's Steam/Epic login subject is the
    // in-game platform id, and verified claims explicitly map a user to a
    // player. UNION-dedup the two; `claim` sorts before `login` so a verified
    // claim wins `DISTINCT ON` when both point at the same identity.
    let identity_rows = sqlx::query(
        "WITH ids AS ( \
             SELECT provider_name AS platform, subject AS platform_player_id, 'login' AS source \
             FROM auth_identities \
             WHERE user_id = $1 AND provider_name IN ('steam', 'epic') \
             UNION \
             SELECT platform, platform_player_id, 'claim' AS source \
             FROM player_identity_claims \
             WHERE user_id = $1 AND status = 'verified' \
         ), \
         deduped AS ( \
             SELECT DISTINCT ON (platform, platform_player_id) \
                 platform, platform_player_id, source \
             FROM ids \
             ORDER BY platform, platform_player_id, source \
         ) \
         SELECT d.platform, d.platform_player_id, d.source, \
                COALESCE(pi.public_display_name, pi.current_display_name) AS display_name, \
                ( \
                    SELECT COUNT(DISTINCT rp.replay_id) \
                    FROM replay_players rp \
                    WHERE rp.platform = d.platform \
                      AND rp.platform_player_id = d.platform_player_id \
                ) AS appearance_count \
         FROM deduped d \
         LEFT JOIN player_identities pi \
             ON pi.platform = d.platform AND pi.platform_player_id = d.platform_player_id \
         ORDER BY appearance_count DESC NULLS LAST, d.platform, d.platform_player_id",
    )
    .bind(user_id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let mut game_identities = Vec::with_capacity(identity_rows.len());
    for identity in identity_rows {
        let appearance_count: i64 = identity
            .try_get("appearance_count")
            .map_err(ApiError::internal)?;
        game_identities.push(UserGameIdentity {
            platform: identity.try_get("platform").map_err(ApiError::internal)?,
            platform_player_id: identity
                .try_get("platform_player_id")
                .map_err(ApiError::internal)?,
            display_name: identity
                .try_get("display_name")
                .map_err(ApiError::internal)?,
            appearance_count: appearance_count.max(0) as u64,
            source: identity.try_get("source").map_err(ApiError::internal)?,
        });
    }

    Ok(Json(UserProfileResponse {
        id: row.try_get("id").map_err(ApiError::internal)?,
        display_name: row.try_get("display_name").map_err(ApiError::internal)?,
        avatar_url: row.try_get("avatar_url").map_err(ApiError::internal)?,
        created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        upload_count: upload_count.max(0) as u64,
        game_identities,
    }))
}
