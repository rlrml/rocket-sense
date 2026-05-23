use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::Html,
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::Row;
use utoipa::ToSchema;

use super::replays::{replay_from_row, replay_select_sql, require_db, ApiError, ReplayResponse};

#[cfg(test)]
#[path = "players_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/players/{platform}/{platform_player_id}",
        get(get_player_profile),
    )
}

pub fn public_router() -> Router<AppState> {
    Router::new().route(
        "/players/{platform}/{platform_player_id}",
        get(player_profile_page),
    )
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerProfileResponse {
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
    pub names: Vec<PlayerProfileNameResponse>,
    pub replay_count: u64,
    pub first_seen_at: Option<DateTime<Utc>>,
    pub last_seen_at: Option<DateTime<Utc>>,
    pub is_pro: bool,
    pub latest_replays: Vec<ReplayResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerProfileNameResponse {
    pub name: String,
    pub replay_count: u64,
    pub latest_seen_at: Option<DateTime<Utc>>,
}

#[utoipa::path(
    get,
    path = "/api/v1/players/{platform}/{platform_player_id}",
    tag = "players",
    params(
        ("platform" = String, Path, description = "Rocket League platform, such as `steam` or `epic`"),
        ("platform_player_id" = String, Path, description = "Platform-scoped player id")
    ),
    responses(
        (status = 200, description = "Player profile built from indexed replay appearances", body = PlayerProfileResponse),
        (status = 400, description = "Player identity was invalid"),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Player was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_player_profile(
    _auth_user: AuthUser,
    State(state): State<AppState>,
    Path((platform, platform_player_id)): Path<(String, String)>,
) -> Result<Json<PlayerProfileResponse>, ApiError> {
    let db = require_db(&state)?;
    let identity = PlayerIdentity::new(platform, platform_player_id)?;

    let profile = load_player_profile(db, &identity)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "player not found"))?;

    Ok(Json(profile))
}

async fn player_profile_page() -> Html<&'static str> {
    Html(PLAYER_PROFILE_PAGE)
}

struct PlayerIdentity {
    platform: String,
    platform_player_id: String,
}

impl PlayerIdentity {
    fn new(platform: String, platform_player_id: String) -> Result<Self, ApiError> {
        let platform = platform.trim().to_ascii_lowercase();
        let platform_player_id = platform_player_id.trim().to_owned();
        if platform.is_empty() || platform_player_id.is_empty() {
            return Err(ApiError::bad_request(
                "player profile path must include both platform and player id",
            ));
        }

        Ok(Self {
            platform,
            platform_player_id,
        })
    }
}

async fn load_player_profile(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
) -> Result<Option<PlayerProfileResponse>, sqlx::Error> {
    let summary = sqlx::query(
        r#"
        SELECT
            COUNT(DISTINCT rp.replay_id) AS replay_count,
            MIN(COALESCE(r.replay_date, r.created_at)) AS first_seen_at,
            MAX(COALESCE(r.replay_date, r.created_at)) AS last_seen_at,
            BOOL_OR(rp.is_pro) AS is_pro,
            (
                ARRAY_REMOVE(
                    ARRAY_AGG(rp.name ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC),
                    NULL
                )
            )[1] AS display_name
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        WHERE rp.platform = $1
          AND rp.platform_player_id = $2
        "#,
    )
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .fetch_one(pool)
    .await?;

    let replay_count: i64 = summary.try_get("replay_count")?;
    if replay_count <= 0 {
        return Ok(None);
    }

    let names = load_player_names(pool, identity).await?;
    let latest_replays = load_player_replays(pool, identity, 25).await?;

    Ok(Some(PlayerProfileResponse {
        platform: identity.platform.clone(),
        platform_player_id: identity.platform_player_id.clone(),
        display_name: summary.try_get("display_name")?,
        names,
        replay_count: replay_count as u64,
        first_seen_at: summary.try_get("first_seen_at")?,
        last_seen_at: summary.try_get("last_seen_at")?,
        is_pro: summary
            .try_get::<Option<bool>, _>("is_pro")?
            .unwrap_or(false),
        latest_replays,
    }))
}

async fn load_player_names(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
) -> Result<Vec<PlayerProfileNameResponse>, sqlx::Error> {
    let rows = sqlx::query(
        r#"
        SELECT
            rp.name,
            COUNT(*) AS replay_count,
            MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        WHERE rp.platform = $1
          AND rp.platform_player_id = $2
          AND rp.name IS NOT NULL
          AND btrim(rp.name) <> ''
        GROUP BY rp.name
        ORDER BY COUNT(*) DESC, MAX(COALESCE(r.replay_date, r.created_at)) DESC NULLS LAST, rp.name
        LIMIT 12
        "#,
    )
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .fetch_all(pool)
    .await?;

    rows.into_iter()
        .map(|row| {
            let replay_count: i64 = row.try_get("replay_count")?;
            Ok(PlayerProfileNameResponse {
                name: row.try_get("name")?,
                replay_count: replay_count.max(0) as u64,
                latest_seen_at: row.try_get("latest_seen_at")?,
            })
        })
        .collect()
}

async fn load_player_replays(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    limit: i64,
) -> Result<Vec<ReplayResponse>, sqlx::Error> {
    let sql = replay_select_sql(
        r#"
        WHERE EXISTS (
            SELECT 1
            FROM replay_players profile_player
            WHERE profile_player.replay_id = r.id
              AND profile_player.platform = $1
              AND profile_player.platform_player_id = $2
        )
        ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC
        LIMIT $3
        "#,
    );

    let rows = sqlx::query(sql.as_str())
        .bind(&identity.platform)
        .bind(&identity.platform_player_id)
        .bind(limit)
        .fetch_all(pool)
        .await?;

    rows.into_iter().map(replay_from_row).collect()
}

const PLAYER_PROFILE_PAGE: &str = include_str!("players_page.html");
