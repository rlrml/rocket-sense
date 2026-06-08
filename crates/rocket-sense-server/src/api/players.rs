use crate::app::AppState;
use axum::{
    extract::{Path, RawQuery, State},
    http::StatusCode,
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use super::{
    query::{
        deserialize_string_vec, deserialize_uuid_vec, parse_datetime_filter, parse_uuid_values,
        QueryParams,
    },
    replays::{replay_from_row, replay_select_sql, require_db, ApiError, ReplayResponse},
    stats::{
        load_stat_aggregates, PlayerStatFilter, RotationDurationBucketResponse,
        StatAggregateFilters, StatAggregateResponse, ROTATION_DURATION_BUCKET_SECONDS,
    },
};

#[cfg(test)]
#[path = "players_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/players/{platform}/{platform_player_id}",
        get(get_player_profile),
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
    pub time_most_back_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
    pub rotation_duration_bucket_seconds: f64,
    pub rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub second_man_to_first_rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub timing_comparison: PlayerTimingComparisonResponse,
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

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerTimingComparisonResponse {
    pub player: PlayerTimingStatsResponse,
    pub teammates: Option<PlayerTimingStatsResponse>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PlayerTimingStatsResponse {
    pub replay_count: u64,
    pub appearance_count: u64,
    pub active_time_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
    pub time_most_forward_percent: Option<f64>,
    pub time_most_back_seconds: Option<f64>,
    pub time_most_back_percent: Option<f64>,
    pub offensive_half_seconds: Option<f64>,
    pub offensive_half_percent: Option<f64>,
    pub defensive_half_seconds: Option<f64>,
    pub defensive_half_percent: Option<f64>,
}

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct PlayerProfileQuery {
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
        (status = 404, description = "Player was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_profile(
    State(state): State<AppState>,
    Path((platform, platform_player_id)): Path<(String, String)>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PlayerProfileResponse>, ApiError> {
    let db = require_db(&state)?;
    let identity = PlayerIdentity::new(platform, platform_player_id)?;
    let query = PlayerProfileQuery::from_raw_query(raw_query.as_deref())?;
    let filters = PlayerProfileFilters::from_query(query)?;

    let profile = load_player_profile(db, &identity, &filters)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "player not found"))?;

    Ok(Json(profile))
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

    fn to_stat_aggregate_filters(&self, identity: &PlayerIdentity) -> StatAggregateFilters {
        StatAggregateFilters {
            search_pattern: None,
            player_name_patterns: Vec::new(),
            playlists: self.playlists.clone(),
            replay_ids: self.replay_ids.clone(),
            file_sha256s: self.file_sha256s.clone(),
            group_id: self.group_id,
            project_id: self.project_id,
            maps: Vec::new(),
            pro: None,
            uploader_user_id: None,
            status: None,
            player: Some(PlayerStatFilter {
                platform: identity.platform.clone(),
                platform_player_id: identity.platform_player_id.clone(),
            }),
            include_teammates: true,
            created_after: self.created_after,
            created_before: self.created_before,
            replay_date_after: self.replay_date_after,
            replay_date_before: self.replay_date_before,
            limit: 50,
            group_by: None,
            playlist_group_key: None,
        }
    }
}

impl PlayerProfileQuery {
    fn from_raw_query(raw_query: Option<&str>) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        Ok(Self {
            playlist: params.values(&["playlist"]),
            game_modes: params.values(&["game-mode", "game_modes"]),
            replay_ids: parse_uuid_values(
                "replay-id",
                params.values(&["replay-id", "replay_ids"]),
            )?,
            file_sha256s: params.values(&["sha256", "file_sha256s"]),
            group: params.first(&["group"]),
            project: params.first(&["project"]),
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
            SUM(rp.time_most_back_seconds) AS time_most_back_seconds,
            SUM(rp.time_most_forward_seconds) AS time_most_forward_seconds,
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
    let rotation_duration_histogram =
        load_player_rotation_duration_histogram(pool, identity, filters).await?;
    let second_man_to_first_rotation_duration_histogram =
        load_player_second_man_to_first_rotation_duration_histogram(pool, identity, filters)
            .await?;
    let timing_comparison = load_player_timing_comparison(pool, identity, filters).await?;
    let stats = load_player_stat_aggregates(pool, identity, filters).await?;

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
        time_most_back_seconds: finite_nonnegative(summary.try_get("time_most_back_seconds")?),
        time_most_forward_seconds: finite_nonnegative(
            summary.try_get("time_most_forward_seconds")?,
        ),
        rotation_duration_bucket_seconds: ROTATION_DURATION_BUCKET_SECONDS,
        rotation_duration_histogram,
        second_man_to_first_rotation_duration_histogram,
        timing_comparison,
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
) -> Result<Vec<PlayerStatAggregateResponse>, sqlx::Error> {
    let aggregates =
        load_stat_aggregates(pool, &filters.to_stat_aggregate_filters(identity)).await?;

    Ok(aggregates
        .stats
        .into_iter()
        .map(PlayerStatAggregateResponse::from)
        .collect())
}

async fn load_player_rotation_duration_histogram(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT rp.id, rp.replay_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, identity, filters);
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
             AND et.key = 'rotation_first_man_stint'
        ),
        bucketed AS (
            SELECT floor(duration_seconds /
        "#,
    );
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
        .map(|row| {
            let min_seconds: f64 = row.try_get("bucket_start_seconds")?;
            let count: i64 = row.try_get("count")?;
            Ok(RotationDurationBucketResponse {
                min_seconds,
                max_seconds: min_seconds + ROTATION_DURATION_BUCKET_SECONDS,
                count: count.max(0) as u64,
            })
        })
        .collect()
}

async fn load_player_timing_comparison(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
) -> Result<PlayerTimingComparisonResponse, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT
                rp.id,
                rp.replay_id,
                rp.team,
                rp.active_time_seconds,
                rp.time_most_forward_seconds,
                rp.time_most_back_seconds
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, identity, filters);
    query.push(
        r#"
        ),
        teammate_appearances AS (
            SELECT DISTINCT
                teammate.id,
                teammate.replay_id,
                teammate.team,
                teammate.active_time_seconds,
                teammate.time_most_forward_seconds,
                teammate.time_most_back_seconds
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        ),
        appearance_groups AS (
            SELECT 'player'::text AS group_label, *
            FROM target_appearances
            UNION ALL
            SELECT 'teammates'::text AS group_label, *
            FROM teammate_appearances
        ),
        role_timing AS (
            SELECT
                group_label,
                COUNT(DISTINCT replay_id) AS replay_count,
                COUNT(*) AS appearance_count,
                SUM(active_time_seconds) AS active_time_seconds,
                SUM(time_most_forward_seconds) AS time_most_forward_seconds,
                SUM(time_most_back_seconds) AS time_most_back_seconds
            FROM appearance_groups
            GROUP BY group_label
        ),
        half_timing AS (
            SELECT
                appearance.group_label,
                SUM(
                    event.duration_seconds
                    * COALESCE((payload.payload->>'offensive_half_fraction')::double precision, 0.0)
                ) AS offensive_half_seconds,
                SUM(
                    event.duration_seconds
                    * COALESCE((payload.payload->>'defensive_half_fraction')::double precision, 0.0)
                ) AS defensive_half_seconds
            FROM appearance_groups appearance
            JOIN replays r
              ON r.id = appearance.replay_id
             AND r.canonical_analysis_run_id IS NOT NULL
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
             AND subject.role = 'actor'
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = r.canonical_analysis_run_id
             AND event.source_stream = 'positioning'
             AND event.duration_seconds IS NOT NULL
            JOIN play_event_payloads payload
              ON payload.event_id = event.id
            WHERE COALESCE((payload.payload->>'active')::boolean, false)
            GROUP BY appearance.group_label
        )
        SELECT
            role_timing.group_label,
            role_timing.replay_count,
            role_timing.appearance_count,
            role_timing.active_time_seconds,
            role_timing.time_most_forward_seconds,
            role_timing.time_most_back_seconds,
            half_timing.offensive_half_seconds,
            half_timing.defensive_half_seconds
        FROM role_timing
        LEFT JOIN half_timing
          ON half_timing.group_label = role_timing.group_label
        ORDER BY role_timing.group_label
        "#,
    );

    let mut player = None;
    let mut teammates = None;
    for row in query.build().fetch_all(pool).await? {
        let group_label: String = row.try_get("group_label")?;
        let stats = timing_stats_from_row(&row)?;
        match group_label.as_str() {
            "player" => player = Some(stats),
            "teammates" => teammates = Some(stats),
            _ => {}
        }
    }

    Ok(PlayerTimingComparisonResponse {
        player: player.unwrap_or_else(empty_timing_stats),
        teammates,
    })
}

async fn load_player_second_man_to_first_rotation_duration_histogram(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT rp.id, rp.replay_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, identity, filters);
    query.push(
        r#"
        ),
        ordered_role_spans AS (
            SELECT
                appearance.id AS replay_player_id,
                event.start_time,
                event.start_frame,
                event.source_index,
                et.key AS role_event_type_key,
                event.duration_seconds,
                LAG(et.key) OVER (
                    PARTITION BY appearance.id
                    ORDER BY
                        event.start_time NULLS LAST,
                        event.start_frame NULLS LAST,
                        event.source_index
                ) AS previous_role_event_type_key,
                LAG(event.duration_seconds) OVER (
                    PARTITION BY appearance.id
                    ORDER BY
                        event.start_time NULLS LAST,
                        event.start_frame NULLS LAST,
                        event.source_index
                ) AS previous_duration_seconds
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
             AND event.source_stream = 'rotation_role_span'
            JOIN event_types et
              ON et.id = event.event_type_id
             AND et.key IN ('rotation_role_first_man', 'rotation_role_second_man')
        ),
        rotation_events AS (
            SELECT previous_duration_seconds AS duration_seconds
            FROM ordered_role_spans
            WHERE role_event_type_key = 'rotation_role_first_man'
              AND previous_role_event_type_key = 'rotation_role_second_man'
        ),
        bucketed AS (
            SELECT floor(duration_seconds /
        "#,
    );
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
        .map(|row| {
            let min_seconds: f64 = row.try_get("bucket_start_seconds")?;
            let count: i64 = row.try_get("count")?;
            Ok(RotationDurationBucketResponse {
                min_seconds,
                max_seconds: min_seconds + ROTATION_DURATION_BUCKET_SECONDS,
                count: count.max(0) as u64,
            })
        })
        .collect()
}

impl From<StatAggregateResponse> for PlayerStatAggregateResponse {
    fn from(stat: StatAggregateResponse) -> Self {
        Self {
            key: stat.key,
            display_name: stat.display_name,
            category: stat.category,
            event_count: stat.event_count,
            count_per_game: stat.count_per_game,
            per_active_minute: stat.per_active_minute,
            per_non_demo_active_minute: stat.per_non_demo_active_minute,
            teammate_event_count: stat.teammate_event_count,
            teammate_appearance_count: stat.teammate_appearance_count,
            teammate_count_per_game: stat.teammate_count_per_game,
            teammate_per_active_minute: stat.teammate_per_active_minute,
            teammate_per_non_demo_active_minute: stat.teammate_per_non_demo_active_minute,
        }
    }
}

fn finite_nonnegative(value: Option<f64>) -> Option<f64> {
    value.filter(|seconds| seconds.is_finite() && *seconds >= 0.0)
}

fn timing_stats_from_row(
    row: &sqlx::postgres::PgRow,
) -> Result<PlayerTimingStatsResponse, sqlx::Error> {
    let replay_count: i64 = row.try_get("replay_count")?;
    let appearance_count: i64 = row.try_get("appearance_count")?;
    let active_time_seconds = finite_nonnegative(row.try_get("active_time_seconds")?);
    let time_most_forward_seconds = finite_nonnegative(row.try_get("time_most_forward_seconds")?);
    let time_most_back_seconds = finite_nonnegative(row.try_get("time_most_back_seconds")?);
    let offensive_half_seconds = finite_nonnegative(row.try_get("offensive_half_seconds")?);
    let defensive_half_seconds = finite_nonnegative(row.try_get("defensive_half_seconds")?);
    let half_denominator_seconds = match (offensive_half_seconds, defensive_half_seconds) {
        (Some(offensive), Some(defensive)) if offensive + defensive > 0.0 => {
            Some(offensive + defensive)
        }
        _ => active_time_seconds,
    };

    Ok(PlayerTimingStatsResponse {
        replay_count: replay_count.max(0) as u64,
        appearance_count: appearance_count.max(0) as u64,
        active_time_seconds,
        time_most_forward_seconds,
        time_most_forward_percent: percent_of(time_most_forward_seconds, active_time_seconds),
        time_most_back_seconds,
        time_most_back_percent: percent_of(time_most_back_seconds, active_time_seconds),
        offensive_half_seconds,
        offensive_half_percent: percent_of(offensive_half_seconds, half_denominator_seconds),
        defensive_half_seconds,
        defensive_half_percent: percent_of(defensive_half_seconds, half_denominator_seconds),
    })
}

fn empty_timing_stats() -> PlayerTimingStatsResponse {
    PlayerTimingStatsResponse {
        replay_count: 0,
        appearance_count: 0,
        active_time_seconds: None,
        time_most_forward_seconds: None,
        time_most_forward_percent: None,
        time_most_back_seconds: None,
        time_most_back_percent: None,
        offensive_half_seconds: None,
        offensive_half_percent: None,
        defensive_half_seconds: None,
        defensive_half_percent: None,
    }
}

fn percent_of(numerator: Option<f64>, denominator: Option<f64>) -> Option<f64> {
    numerator
        .zip(denominator)
        .and_then(|(numerator, denominator)| {
            (denominator.is_finite() && denominator > 0.0 && numerator.is_finite())
                .then(|| (numerator / denominator) * 100.0)
        })
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
