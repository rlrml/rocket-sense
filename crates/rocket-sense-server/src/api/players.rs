use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::Html,
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

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
    pub active_time_seconds: Option<f64>,
    pub time_demolished_seconds: Option<f64>,
    pub non_demo_active_time_seconds: Option<f64>,
    pub stats: Vec<PlayerStatAggregateResponse>,
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

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerStatAggregateResponse {
    pub key: String,
    pub display_name: String,
    pub category: String,
    pub event_count: u64,
    pub count_per_game: f64,
    pub per_active_minute: Option<f64>,
    pub per_non_demo_active_minute: Option<f64>,
    pub teammate_event_count: u64,
    pub teammate_appearance_count: u64,
    pub teammate_count_per_game: Option<f64>,
    pub teammate_per_active_minute: Option<f64>,
    pub teammate_per_non_demo_active_minute: Option<f64>,
}

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct PlayerProfileQuery {
    /// Filter by one or more playlist/game-mode codes.
    #[serde(default)]
    pub playlist: Vec<String>,
    /// Alias for `playlist`.
    #[serde(default, rename = "game-mode")]
    pub game_modes: Vec<String>,
    /// Filter to one or more Rocket Sense replay ids.
    #[serde(default, rename = "replay-id")]
    pub replay_ids: Vec<Uuid>,
    /// Filter to one or more replay file SHA-256 digests.
    #[serde(default, rename = "sha256")]
    pub file_sha256s: Vec<String>,
    /// Filter to a replay group id.
    pub group: Option<String>,
    /// Filter to a legacy project id.
    pub project: Option<String>,
    /// Only include replays uploaded after this RFC3339 timestamp.
    #[serde(rename = "created-after")]
    pub created_after: Option<DateTime<Utc>>,
    /// Only include replays uploaded before this RFC3339 timestamp.
    #[serde(rename = "created-before")]
    pub created_before: Option<DateTime<Utc>>,
    /// Only include replays played after this RFC3339 timestamp.
    #[serde(rename = "replay-date-after")]
    pub replay_date_after: Option<DateTime<Utc>>,
    /// Only include replays played before this RFC3339 timestamp.
    #[serde(rename = "replay-date-before")]
    pub replay_date_before: Option<DateTime<Utc>>,
}

#[utoipa::path(
    get,
    path = "/api/v1/players/{platform}/{platform_player_id}",
    tag = "players",
    params(
        PlayerProfileQuery,
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
    Query(query): Query<PlayerProfileQuery>,
) -> Result<Json<PlayerProfileResponse>, ApiError> {
    let db = require_db(&state)?;
    let identity = PlayerIdentity::new(platform, platform_player_id)?;
    let filters = PlayerProfileFilters::from_query(query)?;

    let profile = load_player_profile(db, &identity, &filters)
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

#[derive(Debug, Default)]
struct PlayerProfileFilters {
    playlists: Vec<String>,
    replay_ids: Vec<Uuid>,
    file_sha256s: Vec<String>,
    group_id: Option<Uuid>,
    project_id: Option<Uuid>,
    created_after: Option<DateTime<Utc>>,
    created_before: Option<DateTime<Utc>>,
    replay_date_after: Option<DateTime<Utc>>,
    replay_date_before: Option<DateTime<Utc>>,
}

impl PlayerProfileFilters {
    fn from_query(query: PlayerProfileQuery) -> Result<Self, ApiError> {
        let mut playlists = normalize_terms(query.playlist);
        playlists.extend(normalize_terms(query.game_modes));
        playlists.sort();
        playlists.dedup();
        let file_sha256s = normalize_terms(query.file_sha256s)
            .into_iter()
            .map(|value| normalize_sha256_hex(&value))
            .collect::<Result<Vec<_>, _>>()?;

        Ok(Self {
            playlists,
            replay_ids: query.replay_ids,
            file_sha256s,
            group_id: query
                .group
                .map(|group| parse_uuid_filter("group", &group))
                .transpose()?,
            project_id: query
                .project
                .map(|project| parse_uuid_filter("project", &project))
                .transpose()?,
            created_after: query.created_after,
            created_before: query.created_before,
            replay_date_after: query.replay_date_after,
            replay_date_before: query.replay_date_before,
        })
    }
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
    filters: &PlayerProfileFilters,
) -> Result<Option<PlayerProfileResponse>, sqlx::Error> {
    let mut summary_query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            COUNT(DISTINCT rp.replay_id) AS replay_count,
            MIN(COALESCE(r.replay_date, r.created_at)) AS first_seen_at,
            MAX(COALESCE(r.replay_date, r.created_at)) AS last_seen_at,
            SUM(rp.active_time_seconds) AS active_time_seconds,
            SUM(rp.time_demolished_seconds) AS time_demolished_seconds,
            SUM(GREATEST(rp.active_time_seconds - COALESCE(rp.time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
            BOOL_OR(rp.is_pro) AS is_pro,
            (
                ARRAY_REMOVE(
                    ARRAY_AGG(rp.name ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC),
                    NULL
                )
            )[1] AS display_name
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut summary_query, identity, filters);
    let summary = summary_query.build().fetch_one(pool).await?;

    let replay_count: i64 = summary.try_get("replay_count")?;
    if replay_count <= 0 {
        return Ok(None);
    }

    let names = load_player_names(pool, identity, filters).await?;
    let latest_replays = load_player_replays(pool, identity, filters, 25).await?;
    let stats = load_player_stat_aggregates(pool, identity, filters, replay_count).await?;

    Ok(Some(PlayerProfileResponse {
        platform: identity.platform.clone(),
        platform_player_id: identity.platform_player_id.clone(),
        display_name: summary.try_get("display_name")?,
        names,
        replay_count: replay_count as u64,
        active_time_seconds: finite_nonnegative(summary.try_get("active_time_seconds")?),
        time_demolished_seconds: finite_nonnegative(summary.try_get("time_demolished_seconds")?),
        non_demo_active_time_seconds: finite_nonnegative(
            summary.try_get("non_demo_active_time_seconds")?,
        ),
        stats,
        first_seen_at: summary.try_get("first_seen_at")?,
        last_seen_at: summary.try_get("last_seen_at")?,
        is_pro: summary
            .try_get::<Option<bool>, _>("is_pro")?
            .unwrap_or(false),
        latest_replays,
    }))
}

async fn load_player_stat_aggregates(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
    replay_count: i64,
) -> Result<Vec<PlayerStatAggregateResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT
                rp.id,
                rp.replay_id,
                rp.team,
                rp.active_time_seconds,
                rp.time_demolished_seconds
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, identity, filters);
    query.push(
        r#"
        ),
        target_denominators AS (
            SELECT
                COUNT(DISTINCT replay_id) AS replay_count,
                SUM(active_time_seconds) AS active_time_seconds,
                SUM(GREATEST(active_time_seconds - COALESCE(time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds
            FROM target_appearances
        ),
        teammate_appearances AS (
            SELECT DISTINCT
                teammate.id,
                teammate.replay_id,
                teammate.active_time_seconds,
                teammate.time_demolished_seconds
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        ),
        teammate_denominators AS (
            SELECT
                COUNT(*) AS appearance_count,
                SUM(active_time_seconds) AS active_time_seconds,
                SUM(GREATEST(active_time_seconds - COALESCE(time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds
            FROM teammate_appearances
        ),
        target_stats AS (
            SELECT
                et.key,
                et.display_name,
                et.category,
                COUNT(DISTINCT event.id) AS event_count
            FROM target_appearances appearance
            JOIN replays r
              ON r.id = appearance.replay_id
             AND r.canonical_analysis_run_id IS NOT NULL
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = r.canonical_analysis_run_id
            JOIN event_types et
              ON et.id = event.event_type_id
            GROUP BY et.key, et.display_name, et.category
        ),
        teammate_stats AS (
            SELECT
                et.key,
                et.display_name,
                et.category,
                COUNT(DISTINCT event.id) AS event_count
            FROM teammate_appearances appearance
            JOIN replays r
              ON r.id = appearance.replay_id
             AND r.canonical_analysis_run_id IS NOT NULL
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = r.canonical_analysis_run_id
            JOIN event_types et
              ON et.id = event.event_type_id
            GROUP BY et.key, et.display_name, et.category
        )
        SELECT
            COALESCE(target_stats.key, teammate_stats.key) AS key,
            COALESCE(target_stats.display_name, teammate_stats.display_name) AS display_name,
            COALESCE(target_stats.category, teammate_stats.category) AS category,
            COALESCE(target_stats.event_count, 0) AS event_count,
            COALESCE(teammate_stats.event_count, 0) AS teammate_event_count,
            target_denominators.active_time_seconds,
            target_denominators.non_demo_active_time_seconds,
            teammate_denominators.appearance_count AS teammate_appearance_count,
            teammate_denominators.active_time_seconds AS teammate_active_time_seconds,
            teammate_denominators.non_demo_active_time_seconds AS teammate_non_demo_active_time_seconds
        FROM target_stats
        FULL OUTER JOIN teammate_stats
          ON teammate_stats.key = target_stats.key
        CROSS JOIN target_denominators
        CROSS JOIN teammate_denominators
        ORDER BY
            GREATEST(COALESCE(target_stats.event_count, 0), COALESCE(teammate_stats.event_count, 0)) DESC,
            category,
            display_name,
            key
        LIMIT 50
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;

    let replay_count = replay_count.max(1) as f64;
    rows.into_iter()
        .map(|row| {
            let event_count: i64 = row.try_get("event_count")?;
            let event_count = event_count.max(0) as u64;
            let teammate_event_count: i64 = row.try_get("teammate_event_count")?;
            let teammate_event_count = teammate_event_count.max(0) as u64;
            let teammate_appearance_count: i64 = row.try_get("teammate_appearance_count")?;
            let teammate_appearance_count = teammate_appearance_count.max(0) as u64;
            let active_time_seconds = finite_nonnegative(row.try_get("active_time_seconds")?);
            let non_demo_active_time_seconds =
                finite_nonnegative(row.try_get("non_demo_active_time_seconds")?);
            let teammate_active_time_seconds =
                finite_nonnegative(row.try_get("teammate_active_time_seconds")?);
            let teammate_non_demo_active_time_seconds =
                finite_nonnegative(row.try_get("teammate_non_demo_active_time_seconds")?);

            Ok(PlayerStatAggregateResponse {
                key: row.try_get("key")?,
                display_name: row.try_get("display_name")?,
                category: row.try_get("category")?,
                event_count,
                count_per_game: event_count as f64 / replay_count,
                per_active_minute: per_minute(event_count, active_time_seconds),
                per_non_demo_active_minute: per_minute(event_count, non_demo_active_time_seconds),
                teammate_event_count,
                teammate_appearance_count,
                teammate_count_per_game: (teammate_appearance_count > 0)
                    .then(|| teammate_event_count as f64 / teammate_appearance_count as f64),
                teammate_per_active_minute: per_minute(
                    teammate_event_count,
                    teammate_active_time_seconds,
                ),
                teammate_per_non_demo_active_minute: per_minute(
                    teammate_event_count,
                    teammate_non_demo_active_time_seconds,
                ),
            })
        })
        .collect()
}

fn finite_nonnegative(value: Option<f64>) -> Option<f64> {
    value.filter(|seconds| seconds.is_finite() && *seconds >= 0.0)
}

fn per_minute(count: u64, denominator_seconds: Option<f64>) -> Option<f64> {
    denominator_seconds
        .filter(|seconds| *seconds > 0.0)
        .map(|seconds| count as f64 * 60.0 / seconds)
}

async fn load_player_names(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
) -> Result<Vec<PlayerProfileNameResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            rp.name,
            COUNT(*) AS replay_count,
            MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, identity, filters);
    query.push(
        r#"
          AND rp.name IS NOT NULL
          AND btrim(rp.name) <> ''
        GROUP BY rp.name
        ORDER BY COUNT(*) DESC, MAX(COALESCE(r.replay_date, r.created_at)) DESC NULLS LAST, rp.name
        LIMIT 12
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;

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
    filters: &PlayerProfileFilters,
    limit: i64,
) -> Result<Vec<ReplayResponse>, sqlx::Error> {
    let sql = replay_select_sql(
        r#"
        "#,
    );
    let mut query = QueryBuilder::<Postgres>::new(sql);
    query.push(" WHERE EXISTS (SELECT 1 FROM replay_players profile_player WHERE profile_player.replay_id = r.id AND profile_player.platform = ");
    query.push_bind(&identity.platform);
    query.push(" AND profile_player.platform_player_id = ");
    query.push_bind(&identity.platform_player_id);
    query.push(")");
    append_replay_filters(&mut query, filters, "r");
    query.push(
        " ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC LIMIT ",
    );
    query.push_bind(limit);

    let rows = query.build().fetch_all(pool).await?;

    rows.into_iter().map(replay_from_row).collect()
}

fn append_target_player_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    identity: &'args PlayerIdentity,
    filters: &'args PlayerProfileFilters,
) {
    builder.push(" WHERE rp.platform = ");
    builder.push_bind(&identity.platform);
    builder.push(" AND rp.platform_player_id = ");
    builder.push_bind(&identity.platform_player_id);
    append_replay_filters(builder, filters, "r");
}

fn append_replay_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args PlayerProfileFilters,
    replay_alias: &str,
) {
    if !filters.playlists.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }
    if !filters.replay_ids.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".id = ANY(")
            .push_bind(&filters.replay_ids)
            .push(")");
    }
    if !filters.file_sha256s.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".file_sha256 = ANY(")
            .push_bind(&filters.file_sha256s)
            .push(")");
    }
    if let Some(group_id) = filters.group_id {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_group_replays profile_group WHERE profile_group.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND profile_group.group_id = ");
        builder.push_bind(group_id);
        builder.push(")");
    }
    if let Some(project_id) = filters.project_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".project_id = ")
            .push_bind(project_id);
    }
    if let Some(created_after) = filters.created_after {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".created_at >= ")
            .push_bind(created_after);
    }
    if let Some(created_before) = filters.created_before {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".created_at <= ")
            .push_bind(created_before);
    }
    if let Some(replay_date_after) = filters.replay_date_after {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_date >= ")
            .push_bind(replay_date_after);
    }
    if let Some(replay_date_before) = filters.replay_date_before {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_date <= ")
            .push_bind(replay_date_before);
    }
}

fn normalize_terms(terms: Vec<String>) -> Vec<String> {
    terms
        .into_iter()
        .map(|term| term.trim().to_owned())
        .filter(|term| !term.is_empty())
        .collect()
}

fn parse_uuid_filter(name: &str, value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request(format!("{name} must be a UUID")))
}

fn normalize_sha256_hex(value: &str) -> Result<String, ApiError> {
    let value = value.trim();
    if value.len() != 64 || !value.bytes().all(|byte| byte.is_ascii_hexdigit()) {
        return Err(ApiError::bad_request(
            "sha256 must be a 64-character hexadecimal SHA-256 digest",
        ));
    }

    Ok(value.to_ascii_lowercase())
}

const PLAYER_PROFILE_PAGE: &str = include_str!("players_page.html");
