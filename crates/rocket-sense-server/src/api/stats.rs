use crate::{app::AppState, auth::AuthUser};
use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use super::{
    query::{
        deserialize_string_vec, deserialize_uuid_vec, parse_bool_filter, parse_datetime_filter,
        parse_u32_filter, parse_uuid_values, QueryParams,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/aggregates", get(get_stat_aggregates))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatAggregateSetResponse {
    pub replay_count: u64,
    pub player_appearance_count: Option<u64>,
    pub active_time_seconds: Option<f64>,
    pub non_demo_active_time_seconds: Option<f64>,
    pub time_most_back_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
    pub teammate_appearance_count: Option<u64>,
    pub teammate_active_time_seconds: Option<f64>,
    pub teammate_non_demo_active_time_seconds: Option<f64>,
    pub teammate_time_most_back_seconds: Option<f64>,
    pub teammate_time_most_forward_seconds: Option<f64>,
    pub rotation_duration_bucket_seconds: f64,
    pub rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub stats: Vec<StatAggregateResponse>,
    pub groups: Vec<StatAggregateGroupResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatAggregateGroupResponse {
    pub group_by: String,
    pub key: String,
    pub display_name: String,
    pub replay_count: u64,
    pub player_appearance_count: Option<u64>,
    pub active_time_seconds: Option<f64>,
    pub non_demo_active_time_seconds: Option<f64>,
    pub time_most_back_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
    pub teammate_appearance_count: Option<u64>,
    pub teammate_active_time_seconds: Option<f64>,
    pub teammate_non_demo_active_time_seconds: Option<f64>,
    pub teammate_time_most_back_seconds: Option<f64>,
    pub teammate_time_most_forward_seconds: Option<f64>,
    pub stats: Vec<StatAggregateResponse>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct RotationDurationBucketResponse {
    pub min_seconds: f64,
    pub max_seconds: f64,
    pub count: u64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct StatAggregateResponse {
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
pub struct StatAggregatesQuery {
    /// Text search over original filename, SHA-256, and external replay id.
    pub q: Option<String>,
    /// Ballchasing-compatible title filter. Currently maps to original filename search.
    pub title: Option<String>,
    /// Filter by one or more player display names in the replay set.
    #[serde(
        default,
        rename = "player-name",
        alias = "player-name[]",
        alias = "player_names",
        alias = "player_names[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub player_names: Vec<String>,
    /// Filter by one or more playlist/game-mode codes.
    #[serde(
        default,
        alias = "playlist[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub playlist: Vec<String>,
    /// Alias for `playlist`.
    #[serde(
        default,
        rename = "game-mode",
        alias = "game-mode[]",
        alias = "game_modes",
        alias = "game_modes[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub game_modes: Vec<String>,
    /// Filter to one or more Rocket Sense replay ids.
    #[serde(
        default,
        rename = "replay-id",
        alias = "replay-id[]",
        alias = "replay_ids",
        alias = "replay_ids[]",
        deserialize_with = "deserialize_uuid_vec"
    )]
    pub replay_ids: Vec<Uuid>,
    /// Filter to one or more replay file SHA-256 digests.
    #[serde(
        default,
        rename = "sha256",
        alias = "sha256[]",
        alias = "file_sha256s",
        alias = "file_sha256s[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub file_sha256s: Vec<String>,
    /// Filter to a replay group id.
    pub group: Option<String>,
    /// Filter to a legacy project id.
    pub project: Option<String>,
    /// Filter by one or more map codes.
    #[serde(
        default,
        rename = "map",
        alias = "map[]",
        alias = "maps",
        alias = "maps[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub maps: Vec<String>,
    /// Only include replays containing at least one pro player.
    pub pro: Option<bool>,
    /// `me` for the authenticated user, or a Rocket Sense user UUID.
    pub uploader: Option<String>,
    /// Replay parsing status.
    pub status: Option<String>,
    /// Optional player focus in `platform:id` form.
    #[serde(rename = "player-id")]
    pub player_id: Option<String>,
    /// Include aggregate stats for same-team players when a player filter is present.
    #[serde(rename = "include-teammates")]
    pub include_teammates: Option<bool>,
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
    /// Maximum number of stat rows to return. Clamped to 1..=200.
    pub count: Option<u32>,
    /// Optional aggregate grouping. Currently supports `playlist`.
    #[serde(rename = "group-by", alias = "group_by")]
    pub group_by: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub(crate) struct StatAggregateFilters {
    pub(crate) search_pattern: Option<String>,
    pub(crate) player_name_patterns: Vec<String>,
    pub(crate) playlists: Vec<String>,
    pub(crate) replay_ids: Vec<Uuid>,
    pub(crate) file_sha256s: Vec<String>,
    pub(crate) group_id: Option<Uuid>,
    pub(crate) project_id: Option<Uuid>,
    pub(crate) maps: Vec<String>,
    pub(crate) pro: Option<bool>,
    pub(crate) uploader_user_id: Option<Uuid>,
    pub(crate) status: Option<String>,
    pub(crate) player: Option<PlayerStatFilter>,
    pub(crate) include_teammates: bool,
    pub(crate) created_after: Option<DateTime<Utc>>,
    pub(crate) created_before: Option<DateTime<Utc>>,
    pub(crate) replay_date_after: Option<DateTime<Utc>>,
    pub(crate) replay_date_before: Option<DateTime<Utc>>,
    pub(crate) limit: u32,
    pub(crate) group_by: Option<StatAggregateGroupBy>,
}

#[derive(Debug, Clone)]
pub(crate) struct PlayerStatFilter {
    pub(crate) platform: String,
    pub(crate) platform_player_id: String,
}

#[derive(Debug, Clone)]
struct StatDenominators {
    replay_count: u64,
    appearance_count: Option<u64>,
    active_time_seconds: Option<f64>,
    non_demo_active_time_seconds: Option<f64>,
    time_most_back_seconds: Option<f64>,
    time_most_forward_seconds: Option<f64>,
}

#[derive(Debug, Clone)]
struct RotationDurationBucketRow {
    bucket_start_seconds: f64,
    count: u64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum StatAggregateGroupBy {
    Playlist,
}

pub(crate) const ROTATION_DURATION_BUCKET_SECONDS: f64 = 1.0;

#[derive(Debug, Clone)]
struct StatCountRow {
    key: String,
    display_name: String,
    category: String,
    event_count: u64,
    teammate_event_count: u64,
}

impl StatAggregateFilters {
    pub(crate) fn from_query(
        query: StatAggregatesQuery,
        auth_user_id: Option<Uuid>,
    ) -> Result<Self, ApiError> {
        let search = query
            .q
            .or(query.title)
            .map(|term| term.trim().to_owned())
            .filter(|term| !term.is_empty());
        let mut playlists = normalize_terms(query.playlist);
        playlists.extend(normalize_terms(query.game_modes));
        playlists.sort();
        playlists.dedup();
        let file_sha256s = normalize_terms(query.file_sha256s)
            .into_iter()
            .map(|value| normalize_sha256_hex(&value))
            .collect::<Result<Vec<_>, _>>()?;
        let uploader_user_id = query
            .uploader
            .map(|uploader| parse_uploader_filter(&uploader, auth_user_id))
            .transpose()?;

        Ok(Self {
            search_pattern: search.map(|term| format!("%{}%", escape_like_term(&term))),
            player_name_patterns: normalize_terms(query.player_names)
                .into_iter()
                .map(|term| format!("%{}%", escape_like_term(&term)))
                .collect(),
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
            maps: normalize_terms(query.maps),
            pro: query.pro,
            uploader_user_id,
            status: query
                .status
                .map(|status| status.trim().to_lowercase())
                .filter(|status| !status.is_empty()),
            player: query
                .player_id
                .map(|player_id| PlayerStatFilter::from_query(&player_id))
                .transpose()?,
            include_teammates: query.include_teammates.unwrap_or(false),
            created_after: query.created_after,
            created_before: query.created_before,
            replay_date_after: query.replay_date_after,
            replay_date_before: query.replay_date_before,
            limit: query.count.unwrap_or(50).clamp(1, 200),
            group_by: query
                .group_by
                .map(|group_by| parse_stat_group_by(&group_by))
                .transpose()?,
        })
    }
}

impl StatAggregatesQuery {
    fn from_raw_query(raw_query: Option<&str>) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        Ok(Self {
            q: params.first(&["q"]),
            title: params.first(&["title"]),
            player_names: params.values(&["player-name", "player_names"]),
            playlist: params.values(&["playlist"]),
            game_modes: params.values(&["game-mode", "game_modes"]),
            replay_ids: parse_uuid_values(
                "replay-id",
                params.values(&["replay-id", "replay_ids"]),
            )?,
            file_sha256s: params.values(&["sha256", "file_sha256s"]),
            group: params.first(&["group"]),
            project: params.first(&["project"]),
            maps: params.values(&["map", "maps"]),
            pro: params
                .first(&["pro"])
                .map(|value| parse_bool_filter("pro", &value))
                .transpose()?,
            uploader: params.first(&["uploader"]),
            status: params.first(&["status"]),
            player_id: params.first(&["player-id", "player_id"]),
            include_teammates: params
                .first(&["include-teammates", "include_teammates"])
                .map(|value| parse_bool_filter("include-teammates", &value))
                .transpose()?,
            created_after: params
                .first(&["created-after", "created_after"])
                .map(|value| parse_datetime_filter("created-after", &value))
                .transpose()?,
            created_before: params
                .first(&["created-before", "created_before"])
                .map(|value| parse_datetime_filter("created-before", &value))
                .transpose()?,
            replay_date_after: params
                .first(&["replay-date-after", "replay_date_after"])
                .map(|value| parse_datetime_filter("replay-date-after", &value))
                .transpose()?,
            replay_date_before: params
                .first(&["replay-date-before", "replay_date_before"])
                .map(|value| parse_datetime_filter("replay-date-before", &value))
                .transpose()?,
            count: params
                .first(&["count"])
                .map(|value| parse_u32_filter("count", &value))
                .transpose()?,
            group_by: params.first(&["group-by", "group_by"]),
        })
    }
}

impl PlayerStatFilter {
    pub(crate) fn new(
        platform: impl Into<String>,
        platform_player_id: impl Into<String>,
    ) -> Result<Self, ApiError> {
        let platform = platform.into().trim().to_ascii_lowercase();
        let platform_player_id = platform_player_id.into().trim().to_owned();
        if platform.is_empty() || platform_player_id.is_empty() {
            return Err(ApiError::bad_request(
                "player filter must include both platform and id",
            ));
        }

        Ok(Self {
            platform,
            platform_player_id,
        })
    }

    fn from_query(value: &str) -> Result<Self, ApiError> {
        let (platform, player_id) = value
            .split_once(':')
            .ok_or_else(|| ApiError::bad_request("player-id must use `platform:id` format"))?;
        Self::new(platform, player_id)
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/aggregates",
    tag = "stats",
    params(StatAggregatesQuery),
    responses(
        (status = 200, description = "Aggregate indexed replay stats", body = StatAggregateSetResponse),
        (status = 400, description = "Stats filters were invalid"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_stat_aggregates(
    auth_user: AuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<StatAggregateSetResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let filters = StatAggregateFilters::from_query(query, Some(auth_user.id))?;
    let aggregates = load_stat_aggregates(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(aggregates))
}

pub(crate) async fn load_stat_aggregates(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    let mut aggregates = load_stat_aggregates_base(pool, filters).await?;
    aggregates.groups = load_stat_aggregate_groups(pool, filters).await?;
    Ok(aggregates)
}

async fn load_stat_aggregates_base(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    let target_denominators = load_target_denominators(pool, filters).await?;
    let teammate_denominators = if filters.player.is_some() && filters.include_teammates {
        Some(load_teammate_denominators(pool, filters).await?)
    } else {
        None
    };
    let rows = load_stat_count_rows(pool, filters).await?;
    let target_replay_count = target_denominators.replay_count.max(1) as f64;
    let teammate_appearance_count = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.appearance_count)
        .unwrap_or(0);
    let teammate_active_time_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.active_time_seconds);
    let teammate_non_demo_active_time_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.non_demo_active_time_seconds);
    let teammate_time_most_back_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.time_most_back_seconds);
    let teammate_time_most_forward_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.time_most_forward_seconds);
    let rotation_duration_histogram = load_rotation_duration_histogram(pool, filters).await?;

    let stats = rows
        .into_iter()
        .map(|row| StatAggregateResponse {
            key: row.key,
            display_name: row.display_name,
            category: row.category,
            event_count: row.event_count,
            count_per_game: row.event_count as f64 / target_replay_count,
            per_active_minute: per_minute(row.event_count, target_denominators.active_time_seconds),
            per_non_demo_active_minute: per_minute(
                row.event_count,
                target_denominators.non_demo_active_time_seconds,
            ),
            teammate_event_count: row.teammate_event_count,
            teammate_appearance_count,
            teammate_count_per_game: (teammate_appearance_count > 0)
                .then(|| row.teammate_event_count as f64 / teammate_appearance_count as f64),
            teammate_per_active_minute: per_minute(
                row.teammate_event_count,
                teammate_active_time_seconds,
            ),
            teammate_per_non_demo_active_minute: per_minute(
                row.teammate_event_count,
                teammate_non_demo_active_time_seconds,
            ),
        })
        .collect();

    Ok(StatAggregateSetResponse {
        replay_count: target_denominators.replay_count,
        player_appearance_count: target_denominators.appearance_count,
        active_time_seconds: target_denominators.active_time_seconds,
        non_demo_active_time_seconds: target_denominators.non_demo_active_time_seconds,
        time_most_back_seconds: target_denominators.time_most_back_seconds,
        time_most_forward_seconds: target_denominators.time_most_forward_seconds,
        teammate_appearance_count: teammate_denominators
            .as_ref()
            .and_then(|denominator| denominator.appearance_count),
        teammate_active_time_seconds,
        teammate_non_demo_active_time_seconds,
        teammate_time_most_back_seconds,
        teammate_time_most_forward_seconds,
        rotation_duration_bucket_seconds: ROTATION_DURATION_BUCKET_SECONDS,
        rotation_duration_histogram,
        stats,
        groups: Vec::new(),
    })
}

async fn load_stat_aggregate_groups(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    let Some(group_by) = filters.group_by else {
        return Ok(Vec::new());
    };

    match group_by {
        StatAggregateGroupBy::Playlist => load_playlist_stat_aggregate_groups(pool, filters).await,
    }
}

async fn load_playlist_stat_aggregate_groups(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    let playlists = load_stat_group_playlists(pool, filters).await?;
    let mut groups = Vec::with_capacity(playlists.len());
    for playlist in playlists {
        let mut group_filters = filters.clone();
        group_filters.group_by = None;
        group_filters.playlists = vec![playlist.clone()];
        let aggregates = load_stat_aggregates_base(pool, &group_filters).await?;
        groups.push(StatAggregateGroupResponse {
            group_by: "playlist".to_owned(),
            display_name: playlist_label(&playlist),
            key: playlist,
            replay_count: aggregates.replay_count,
            player_appearance_count: aggregates.player_appearance_count,
            active_time_seconds: aggregates.active_time_seconds,
            non_demo_active_time_seconds: aggregates.non_demo_active_time_seconds,
            time_most_back_seconds: aggregates.time_most_back_seconds,
            time_most_forward_seconds: aggregates.time_most_forward_seconds,
            teammate_appearance_count: aggregates.teammate_appearance_count,
            teammate_active_time_seconds: aggregates.teammate_active_time_seconds,
            teammate_non_demo_active_time_seconds: aggregates.teammate_non_demo_active_time_seconds,
            teammate_time_most_back_seconds: aggregates.teammate_time_most_back_seconds,
            teammate_time_most_forward_seconds: aggregates.teammate_time_most_forward_seconds,
            stats: aggregates.stats,
        });
    }

    Ok(groups)
}

async fn load_stat_group_playlists(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<String>, sqlx::Error> {
    let mut query = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                r.playlist,
                COUNT(DISTINCT rp.replay_id) AS replay_count,
                MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query
    } else {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                r.playlist,
                COUNT(DISTINCT r.id) AS replay_count,
                MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
            FROM replays r
            WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query
    };
    query.push(
        r#"
          AND r.playlist IS NOT NULL
          AND btrim(r.playlist) <> ''
        GROUP BY r.playlist
        ORDER BY COUNT(*) DESC, MAX(COALESCE(r.replay_date, r.created_at)) DESC NULLS LAST, r.playlist
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| row.try_get("playlist"))
        .collect()
}

async fn load_target_denominators(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatDenominators, sqlx::Error> {
    let row = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                COUNT(DISTINCT rp.replay_id) AS replay_count,
                COUNT(*) AS appearance_count,
                SUM(rp.active_time_seconds) AS active_time_seconds,
                SUM(GREATEST(rp.active_time_seconds - COALESCE(rp.time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
                SUM(rp.time_most_back_seconds) AS time_most_back_seconds,
                SUM(rp.time_most_forward_seconds) AS time_most_forward_seconds
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query.build().fetch_one(pool).await?
    } else {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                COUNT(DISTINCT r.id) AS replay_count,
                NULL::bigint AS appearance_count,
                NULL::double precision AS active_time_seconds,
                NULL::double precision AS non_demo_active_time_seconds,
                SUM(rp.time_most_back_seconds) AS time_most_back_seconds,
                SUM(rp.time_most_forward_seconds) AS time_most_forward_seconds
            FROM replays r
            LEFT JOIN replay_players rp ON rp.replay_id = r.id
            WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query.build().fetch_one(pool).await?
    };

    let replay_count: i64 = row.try_get("replay_count")?;
    let appearance_count: Option<i64> = row.try_get("appearance_count")?;
    Ok(StatDenominators {
        replay_count: replay_count.max(0) as u64,
        appearance_count: appearance_count.map(|count| count.max(0) as u64),
        active_time_seconds: finite_nonnegative(row.try_get("active_time_seconds")?),
        non_demo_active_time_seconds: finite_nonnegative(
            row.try_get("non_demo_active_time_seconds")?,
        ),
        time_most_back_seconds: finite_nonnegative(row.try_get("time_most_back_seconds")?),
        time_most_forward_seconds: finite_nonnegative(row.try_get("time_most_forward_seconds")?),
    })
}

async fn load_teammate_denominators(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatDenominators, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT rp.id, rp.replay_id, rp.team
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        ),
        teammate_appearances AS (
            SELECT DISTINCT
                teammate.id,
                teammate.replay_id,
                teammate.active_time_seconds,
                teammate.time_demolished_seconds,
                teammate.time_most_back_seconds,
                teammate.time_most_forward_seconds
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        )
        SELECT
            COUNT(DISTINCT replay_id) AS replay_count,
            COUNT(*) AS appearance_count,
            SUM(active_time_seconds) AS active_time_seconds,
            SUM(GREATEST(active_time_seconds - COALESCE(time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
            SUM(time_most_back_seconds) AS time_most_back_seconds,
            SUM(time_most_forward_seconds) AS time_most_forward_seconds
        FROM teammate_appearances
        "#,
    );

    let row = query.build().fetch_one(pool).await?;
    let replay_count: i64 = row.try_get("replay_count")?;
    let appearance_count: Option<i64> = row.try_get("appearance_count")?;
    Ok(StatDenominators {
        replay_count: replay_count.max(0) as u64,
        appearance_count: appearance_count.map(|count| count.max(0) as u64),
        active_time_seconds: finite_nonnegative(row.try_get("active_time_seconds")?),
        non_demo_active_time_seconds: finite_nonnegative(
            row.try_get("non_demo_active_time_seconds")?,
        ),
        time_most_back_seconds: finite_nonnegative(row.try_get("time_most_back_seconds")?),
        time_most_forward_seconds: finite_nonnegative(row.try_get("time_most_forward_seconds")?),
    })
}

async fn load_rotation_duration_histogram(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            WITH target_appearances AS (
                SELECT rp.id, rp.replay_id
                FROM replay_players rp
                JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query.push(
            r#"
            ),
            rotation_events AS (
                SELECT event.duration_seconds
                FROM target_appearances appearance
                JOIN replays r
                  ON r.id = appearance.replay_id
                 AND r.canonical_analysis_run_id IS NOT NULL
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                 AND subject.role = 'actor'
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = r.canonical_analysis_run_id
                 AND event.source_stream = 'rotation_first_man_stint'
                JOIN event_types et
                  ON et.id = event.event_type_id
                 AND et.key = 'rotation.first_man_stint'
            ),
            bucketed AS (
                SELECT floor(duration_seconds /
            "#,
        );
        query
    } else {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            WITH rotation_events AS (
                SELECT event.duration_seconds
                FROM replays r
                JOIN play_events event
                  ON event.replay_id = r.id
                 AND event.analysis_run_id = r.canonical_analysis_run_id
                 AND event.source_stream = 'rotation_first_man_stint'
                JOIN event_types et
                  ON et.id = event.event_type_id
                 AND et.key = 'rotation.first_man_stint'
                WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query.push(
            r#"
            ),
            bucketed AS (
                SELECT floor(duration_seconds /
            "#,
        );
        query
    };

    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(") * ");
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(
        r#" AS bucket_start_seconds
        FROM rotation_events
        WHERE duration_seconds IS NOT NULL AND duration_seconds > 0.0
    )
    SELECT bucket_start_seconds, COUNT(*) AS count
    FROM bucketed
    GROUP BY bucket_start_seconds
    ORDER BY bucket_start_seconds
    "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(rotation_duration_bucket_row_from_db)
        .collect()
}

async fn load_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    if filters.player.is_some() {
        load_player_stat_count_rows(pool, filters).await
    } else {
        load_replay_set_stat_count_rows(pool, filters).await
    }
}

async fn load_replay_set_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            et.key,
            et.display_name,
            et.category,
            COUNT(DISTINCT event.id) AS event_count,
            0::bigint AS teammate_event_count
        FROM replays r
        JOIN play_events event
          ON event.replay_id = r.id
         AND event.analysis_run_id = r.canonical_analysis_run_id
        JOIN event_types et
          ON et.id = event.event_type_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    query.push(
        r#"
        GROUP BY et.key, et.display_name, et.category
        ORDER BY COUNT(DISTINCT event.id) DESC, et.category, et.display_name, et.key
        LIMIT
        "#,
    );
    query.push_bind(i64::from(filters.limit));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(stat_count_row_from_db).collect()
}

async fn load_player_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT
                rp.id,
                rp.replay_id,
                rp.team
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
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
        )
        "#,
    );

    if filters.include_teammates {
        query.push(
            r#"
            ,
            teammate_appearances AS (
                SELECT DISTINCT
                    teammate.id,
                    teammate.replay_id
                FROM target_appearances target
                JOIN replay_players teammate
                  ON teammate.replay_id = target.replay_id
                 AND teammate.team = target.team
                 AND teammate.id <> target.id
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
                COALESCE(teammate_stats.event_count, 0) AS teammate_event_count
            FROM target_stats
            FULL OUTER JOIN teammate_stats
              ON teammate_stats.key = target_stats.key
            ORDER BY
                GREATEST(COALESCE(target_stats.event_count, 0), COALESCE(teammate_stats.event_count, 0)) DESC,
                category,
                display_name,
                key
            LIMIT
            "#,
        );
    } else {
        query.push(
            r#"
            SELECT
                key,
                display_name,
                category,
                event_count,
                0::bigint AS teammate_event_count
            FROM target_stats
            ORDER BY event_count DESC, category, display_name, key
            LIMIT
            "#,
        );
    }
    query.push_bind(i64::from(filters.limit));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(stat_count_row_from_db).collect()
}

fn stat_count_row_from_db(row: sqlx::postgres::PgRow) -> Result<StatCountRow, sqlx::Error> {
    let event_count: i64 = row.try_get("event_count")?;
    let teammate_event_count: i64 = row.try_get("teammate_event_count")?;
    Ok(StatCountRow {
        key: row.try_get("key")?,
        display_name: row.try_get("display_name")?,
        category: row.try_get("category")?,
        event_count: event_count.max(0) as u64,
        teammate_event_count: teammate_event_count.max(0) as u64,
    })
}

fn rotation_duration_bucket_row_from_db(
    row: sqlx::postgres::PgRow,
) -> Result<RotationDurationBucketResponse, sqlx::Error> {
    let bucket = RotationDurationBucketRow {
        bucket_start_seconds: row.try_get("bucket_start_seconds")?,
        count: row.try_get::<i64, _>("count")?.max(0) as u64,
    };
    Ok(RotationDurationBucketResponse {
        min_seconds: bucket.bucket_start_seconds,
        max_seconds: bucket.bucket_start_seconds + ROTATION_DURATION_BUCKET_SECONDS,
        count: bucket.count,
    })
}

fn append_target_player_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
) {
    let player = filters
        .player
        .as_ref()
        .expect("target player filters require a player");
    builder.push(" WHERE rp.platform = ");
    builder.push_bind(&player.platform);
    builder.push(" AND rp.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    append_replay_filters(builder, filters, "r");
}

fn append_replay_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
    replay_alias: &str,
) {
    if let Some(pattern) = &filters.search_pattern {
        builder
            .push(" AND (")
            .push(replay_alias)
            .push(".original_file_name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR ")
            .push(replay_alias)
            .push(".file_sha256 ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR ")
            .push(replay_alias)
            .push(".external_replay_id ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }
    for pattern in &filters.player_name_patterns {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_players stats_name_player WHERE stats_name_player.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND stats_name_player.name ILIKE ");
        builder.push_bind(pattern);
        builder.push(" ESCAPE '\\')");
    }
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
    if !filters.maps.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".map_code = ANY(")
            .push_bind(&filters.maps)
            .push(")");
    }
    if let Some(pro) = filters.pro {
        if pro {
            builder
                .push(" AND ")
                .push(replay_alias)
                .push(".has_pro_player");
        } else {
            builder
                .push(" AND NOT ")
                .push(replay_alias)
                .push(".has_pro_player");
        }
    }
    if let Some(uploader_user_id) = filters.uploader_user_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".uploaded_by_user_id = ")
            .push_bind(uploader_user_id);
    }
    if let Some(group_id) = filters.group_id {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_group_replays stats_group WHERE stats_group.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND stats_group.group_id = ");
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
    if let Some(status) = &filters.status {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".parse_status = ")
            .push_bind(status);
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

fn finite_nonnegative(value: Option<f64>) -> Option<f64> {
    value.filter(|seconds| seconds.is_finite() && *seconds >= 0.0)
}

fn per_minute(count: u64, denominator_seconds: Option<f64>) -> Option<f64> {
    denominator_seconds
        .filter(|seconds| *seconds > 0.0)
        .map(|seconds| count as f64 * 60.0 / seconds)
}

fn normalize_terms(terms: Vec<String>) -> Vec<String> {
    terms
        .into_iter()
        .map(|term| term.trim().to_owned())
        .filter(|term| !term.is_empty())
        .collect()
}

fn parse_uploader_filter(value: &str, auth_user_id: Option<Uuid>) -> Result<Uuid, ApiError> {
    let value = value.trim();
    if value == "me" {
        return auth_user_id.ok_or_else(|| {
            ApiError::new(
                axum::http::StatusCode::UNAUTHORIZED,
                "uploader=me requires authentication",
            )
        });
    }

    Uuid::parse_str(value)
        .map_err(|_| ApiError::bad_request("uploader must be `me` or a Rocket Sense user UUID"))
}

fn parse_uuid_filter(name: &str, value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request(format!("{name} must be a UUID")))
}

fn parse_stat_group_by(value: &str) -> Result<StatAggregateGroupBy, ApiError> {
    match value.trim().to_ascii_lowercase().as_str() {
        "playlist" | "game-mode" | "game_mode" => Ok(StatAggregateGroupBy::Playlist),
        _ => Err(ApiError::bad_request("group-by must be one of: playlist")),
    }
}

fn playlist_label(value: &str) -> String {
    value
        .split(['-', '_'])
        .filter(|part| !part.is_empty())
        .map(|part| {
            let mut chars = part.chars();
            match chars.next() {
                Some(first) => first.to_uppercase().chain(chars).collect::<String>(),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn escape_like_term(term: &str) -> String {
    term.replace('\\', "\\\\")
        .replace('%', "\\%")
        .replace('_', "\\_")
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
