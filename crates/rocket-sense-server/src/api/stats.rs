use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::types::Json as SqlxJson;
use sqlx::{Postgres, QueryBuilder, Row};
use std::collections::{HashMap, HashSet};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use super::{
    event_stats::{count_column, push_kickoff_event_spawn_filter, KickoffSpawnFilter},
    query::{
        deserialize_string_vec, deserialize_uuid_vec, parse_bool_filter, parse_u32_filter,
        QueryParams,
    },
    replay_set::{
        append_replay_set_filters, append_target_player_replay_set_filters,
        push_playlist_group_key_expression, PlayerStatFilter, ReplaySetFilterInput,
        ReplaySetFilters,
    },
    replays::{require_db, ApiError, BoostTracksResponse},
};

#[cfg(test)]
#[path = "stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/stats/aggregates", get(get_stat_aggregates))
        .route("/stats/boost-totals", get(get_player_boost_totals))
        .route(
            "/stats/processing-versions",
            get(get_processing_version_breakdown),
        )
}

/// Breakdown of the replays contributing to an aggregate by the processing
/// version they were parsed with. Lets a profile/aggregate view show how much
/// of its data reflects the current pipeline.
#[derive(Debug, Serialize, ToSchema)]
pub struct ProcessingVersionBreakdownResponse {
    pub current_event_stream_schema_version: String,
    pub current_subtr_actor_version: String,
    pub total_replays: u64,
    pub current_replays: u64,
    pub stale_replays: u64,
    pub rows: Vec<ProcessingVersionBreakdownRow>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ProcessingVersionBreakdownRow {
    pub event_stream_schema_version: Option<String>,
    pub subtr_actor_version: Option<String>,
    pub subtr_actor_git_sha: Option<String>,
    pub replay_count: u64,
    pub is_current: bool,
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
    pub teammate_rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
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

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PlayerBoostTotalResponse {
    pub boost_collected: f64,
    pub boost_collected_big: f64,
    pub boost_collected_small: f64,
    pub boost_collected_grant: f64,
    pub boost_collected_unknown: f64,
    pub boost_stolen: f64,
    pub boost_stolen_big: f64,
    pub boost_stolen_small: f64,
    pub boost_overfill: f64,
    pub boost_used: f64,
    pub boost_used_supersonic: f64,
    pub boost_stolen_overfill: f64,
    pub big_pads: u64,
    pub big_pads_offensive: u64,
    pub big_pads_neutral: u64,
    pub big_pads_defensive: u64,
    pub small_pads: u64,
    pub small_pads_offensive: u64,
    pub small_pads_defensive: u64,
    pub stolen_big_pads: u64,
    pub stolen_small_pads: u64,
    pub stolen_pads: u64,
    pub boost_amount_weighted_sum: f64,
    pub tracked_seconds: f64,
    pub time_empty: f64,
    pub time_low: f64,
    pub time_medium: f64,
    pub time_high: f64,
    pub time_full: f64,
    pub time_over: f64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PlayerBoostTotalsResponse {
    pub player: PlayerBoostTotalResponse,
    pub teammates: Option<PlayerBoostTotalResponse>,
    pub opponents: Option<PlayerBoostTotalResponse>,
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
    /// Filter by competitive context: ranked, casual, tournament, private, offline, lan, unknown.
    #[serde(
        default,
        rename = "game-type",
        alias = "game-type[]",
        alias = "game_types",
        alias = "game_types[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub game_types: Vec<String>,
    /// Filter by team size / player count: 1-4 or 1v1, 2v2, 3v3, 4v4.
    #[serde(
        default,
        rename = "team-size",
        alias = "team-size[]",
        alias = "team_sizes",
        alias = "team_sizes[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub team_sizes: Vec<String>,
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
    /// Replay processing status.
    pub status: Option<String>,
    /// Optional player focus in `platform:id` form.
    #[serde(rename = "player-id")]
    pub player_id: Option<String>,
    /// Restrict aggregate event counts to event types matching one or more
    /// search terms. Denominators still cover the full filtered replay set.
    #[serde(
        default,
        rename = "stat-term",
        alias = "stat-term[]",
        alias = "stat_terms",
        alias = "stat_terms[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub stat_terms: Vec<String>,
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
    /// Kickoff spawn shape filter for kickoff-scoped aggregate rows.
    #[serde(rename = "kickoff-shape", alias = "kickoff_shape")]
    pub kickoff_shape: Option<String>,
    /// Kickoff spawn side filter for kickoff-scoped aggregate rows.
    #[serde(rename = "kickoff-side", alias = "kickoff_side")]
    pub kickoff_side: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub(crate) struct StatAggregateFilters {
    pub(crate) replay_set: ReplaySetFilters,
    pub(crate) player: Option<PlayerStatFilter>,
    pub(crate) stat_terms: Vec<String>,
    pub(crate) include_teammates: bool,
    pub(crate) kickoff_spawn: KickoffSpawnFilter,
    pub(crate) limit: u32,
    pub(crate) group_by: Option<StatAggregateGroupBy>,
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
#[cfg(test)]
const AGGREGATE_HIDDEN_EVENT_SOURCE_STREAMS: &[&str] = &[
    "positioning",
    "boost_state",
    "boost_ledger",
    "movement",
    "rotation_player",
    "rotation_role_span",
    "rotation_depth_span",
    "rotation_role",
    "ball_depth",
    "field_third",
    "field_half",
    "ball_proximity",
    "powerslide",
];
const AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL: &str = "source_stream NOT IN ('positioning', 'boost_state', 'boost_ledger', 'movement', 'rotation_player', 'rotation_role_span', 'rotation_depth_span', 'rotation_role', 'ball_depth', 'field_third', 'field_half', 'ball_proximity', 'powerslide')";

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
        let replay_set = ReplaySetFilters::from_input(
            ReplaySetFilterInput {
                q: query.q,
                title: query.title,
                player_names: query.player_names,
                playlists: query.playlist,
                game_modes: query.game_modes,
                game_types: query.game_types,
                team_sizes: query.team_sizes,
                replay_ids: query.replay_ids,
                file_sha256s: query.file_sha256s,
                group: query.group,
                project: query.project,
                maps: query.maps,
                pro: query.pro,
                uploader: query.uploader,
                status: query.status,
                created_after: query.created_after,
                created_before: query.created_before,
                replay_date_after: query.replay_date_after,
                replay_date_before: query.replay_date_before,
            },
            auth_user_id,
        )?;

        Ok(Self {
            replay_set,
            player: query
                .player_id
                .map(|player_id| PlayerStatFilter::from_query(&player_id))
                .transpose()?,
            stat_terms: normalize_stat_terms(query.stat_terms),
            include_teammates: query.include_teammates.unwrap_or(false),
            kickoff_spawn: KickoffSpawnFilter::from_values(
                query.kickoff_shape,
                query.kickoff_side,
            )?,
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
        let replay_set = ReplaySetFilterInput::from_query_params(&params)?;
        Ok(Self {
            q: replay_set.q,
            title: replay_set.title,
            player_names: replay_set.player_names,
            playlist: replay_set.playlists,
            game_modes: replay_set.game_modes,
            game_types: replay_set.game_types,
            team_sizes: replay_set.team_sizes,
            replay_ids: replay_set.replay_ids,
            file_sha256s: replay_set.file_sha256s,
            group: replay_set.group,
            project: replay_set.project,
            maps: replay_set.maps,
            pro: replay_set.pro,
            uploader: replay_set.uploader,
            status: replay_set.status,
            player_id: params.first(&["player-id", "player_id"]),
            stat_terms: params.values(&["stat-term", "stat_terms"]),
            include_teammates: params
                .first(&["include-teammates", "include_teammates"])
                .map(|value| parse_bool_filter("include-teammates", &value))
                .transpose()?,
            created_after: replay_set.created_after,
            created_before: replay_set.created_before,
            replay_date_after: replay_set.replay_date_after,
            replay_date_before: replay_set.replay_date_before,
            count: params
                .first(&["count"])
                .map(|value| parse_u32_filter("count", &value))
                .transpose()?,
            group_by: params.first(&["group-by", "group_by"]),
            kickoff_shape: params.first(&["kickoff-shape", "kickoff_shape"]),
            kickoff_side: params.first(&["kickoff-side", "kickoff_side"]),
        })
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
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_stat_aggregates(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<StatAggregateSetResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let filters = StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    let aggregates = load_stat_aggregates(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(aggregates))
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/boost-totals",
    tag = "stats",
    params(StatAggregatesQuery),
    responses(
        (status = 200, description = "Player and teammate boost totals from accumulation tracks", body = PlayerBoostTotalsResponse),
        (status = 400, description = "Stats filters were invalid or player-id was omitted"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_boost_totals(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PlayerBoostTotalsResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let filters = StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    if filters.player.is_none() {
        return Err(ApiError::bad_request("boost totals require player-id"));
    }
    let totals = load_player_boost_totals(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(totals))
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/processing-versions",
    tag = "stats",
    params(StatAggregatesQuery),
    responses(
        (status = 200, description = "Processing-version breakdown of contributing replays", body = ProcessingVersionBreakdownResponse),
        (status = 400, description = "Stats filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_processing_version_breakdown(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<ProcessingVersionBreakdownResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let filters = StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    let breakdown = load_processing_version_breakdown(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(breakdown))
}

pub(crate) async fn load_processing_version_breakdown(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<ProcessingVersionBreakdownResponse, sqlx::Error> {
    let mut query = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                r.parsed_with_event_stream_schema_version AS schema_version,
                r.parsed_with_subtr_actor_version AS subtr_actor_version,
                r.parsed_with_subtr_actor_git_sha AS subtr_actor_git_sha,
                COUNT(DISTINCT rp.replay_id) AS replay_count
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query.push(" AND r.canonical_analysis_run_id IS NOT NULL");
        query
    } else {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                r.parsed_with_event_stream_schema_version AS schema_version,
                r.parsed_with_subtr_actor_version AS subtr_actor_version,
                r.parsed_with_subtr_actor_git_sha AS subtr_actor_git_sha,
                COUNT(DISTINCT r.id) AS replay_count
            FROM replays r
            WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query
    };
    query.push(
        r#"
        GROUP BY 1, 2, 3
        ORDER BY replay_count DESC, schema_version DESC NULLS LAST, subtr_actor_version DESC NULLS LAST
        "#,
    );

    let db_rows = query.build().fetch_all(pool).await?;

    let current = crate::processing::current_processing_version();
    let mut rows = Vec::with_capacity(db_rows.len());
    let mut total_replays: u64 = 0;
    let mut current_replays: u64 = 0;
    for row in db_rows {
        let schema_version: Option<String> = row.try_get("schema_version")?;
        let subtr_actor_version: Option<String> = row.try_get("subtr_actor_version")?;
        let subtr_actor_git_sha: Option<String> = row.try_get("subtr_actor_git_sha")?;
        let replay_count = row.try_get::<i64, _>("replay_count")?.max(0) as u64;
        let is_current = !crate::processing::replay_staleness(
            schema_version.as_deref(),
            subtr_actor_version.as_deref(),
            subtr_actor_git_sha.as_deref(),
        )
        .is_stale;
        total_replays += replay_count;
        if is_current {
            current_replays += replay_count;
        }
        rows.push(ProcessingVersionBreakdownRow {
            event_stream_schema_version: schema_version,
            subtr_actor_version,
            subtr_actor_git_sha,
            replay_count,
            is_current,
        });
    }

    Ok(ProcessingVersionBreakdownResponse {
        current_event_stream_schema_version: current.event_stream_schema_version.to_string(),
        current_subtr_actor_version: current.subtr_actor_version.to_string(),
        total_replays,
        current_replays,
        stale_replays: total_replays - current_replays,
        rows,
    })
}

pub(crate) async fn load_stat_aggregates(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    // The base aggregate and the per-playlist breakdown are independent, so run
    // them concurrently rather than serializing the (many) underlying queries.
    let (mut aggregates, groups) = tokio::try_join!(
        load_stat_aggregates_base(pool, filters, true),
        load_stat_aggregate_groups(pool, filters),
    )?;
    aggregates.groups = groups;
    Ok(aggregates)
}

async fn load_player_boost_totals(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<PlayerBoostTotalsResponse, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT DISTINCT
                rp.replay_id,
                rp.team,
                concat(rp.platform, ':', rp.platform_player_id) AS target_player_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
              AND r.canonical_analysis_run_id IS NOT NULL
        ),
        teammate_ids AS (
            SELECT
                appearance.replay_id,
                COALESCE(
                    array_agg(DISTINCT concat(teammate.platform, ':', teammate.platform_player_id))
                        FILTER (
                            WHERE teammate.id IS NOT NULL
                              AND teammate.platform IS NOT NULL
                              AND teammate.platform_player_id IS NOT NULL
                        ),
                    ARRAY[]::text[]
                ) AS teammate_player_ids
            FROM target_appearances appearance
            LEFT JOIN replay_players teammate
              ON teammate.replay_id = appearance.replay_id
             AND teammate.team = appearance.team
             AND concat(teammate.platform, ':', teammate.platform_player_id) <> appearance.target_player_id
            GROUP BY appearance.replay_id
        ),
        opponent_ids AS (
            SELECT
                appearance.replay_id,
                COALESCE(
                    array_agg(DISTINCT concat(opponent.platform, ':', opponent.platform_player_id))
                        FILTER (
                            WHERE opponent.id IS NOT NULL
                              AND opponent.platform IS NOT NULL
                              AND opponent.platform_player_id IS NOT NULL
                        ),
                    ARRAY[]::text[]
                ) AS opponent_player_ids
            FROM target_appearances appearance
            LEFT JOIN replay_players opponent
              ON opponent.replay_id = appearance.replay_id
             AND opponent.team IS NOT NULL
             AND appearance.team IS NOT NULL
             AND opponent.team <> appearance.team
            GROUP BY appearance.replay_id
        )
        SELECT
            t.tracks AS tracks,
            appearance.target_player_id,
            teammate_ids.teammate_player_ids,
            opponent_ids.opponent_player_ids
        FROM target_appearances appearance
        JOIN replays r ON r.id = appearance.replay_id
        JOIN replay_boost_tracks t
          ON t.replay_id = r.id
         AND t.analysis_run_id = r.canonical_analysis_run_id
        JOIN teammate_ids ON teammate_ids.replay_id = appearance.replay_id
        JOIN opponent_ids ON opponent_ids.replay_id = appearance.replay_id
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    let mut player = PlayerBoostAccumulator::default();
    let mut teammates = PlayerBoostAccumulator::default();
    let mut opponents = PlayerBoostAccumulator::default();
    for row in rows {
        let SqlxJson(tracks): SqlxJson<BoostTracksResponse> = row.try_get("tracks")?;
        let target_player_id: String = row.try_get("target_player_id")?;
        let teammate_player_ids: Vec<String> = row.try_get("teammate_player_ids")?;
        let opponent_player_ids: Vec<String> = row.try_get("opponent_player_ids")?;
        accumulate_player_boost_tracks(
            &tracks,
            &target_player_id,
            &teammate_player_ids,
            &opponent_player_ids,
            &mut player,
            &mut teammates,
            &mut opponents,
        );
    }
    let event_fields = load_player_boost_event_fields(pool, filters).await?;
    player.merge_event_fields(event_fields.get("player"));
    teammates.merge_event_fields(event_fields.get("teammates"));
    opponents.merge_event_fields(event_fields.get("opponents"));

    Ok(PlayerBoostTotalsResponse {
        player: player.into_response(),
        teammates: (teammates.has_data()).then(|| teammates.into_response()),
        opponents: (opponents.has_data()).then(|| opponents.into_response()),
    })
}

#[derive(Default)]
struct PlayerBoostAccumulator {
    boost_collected: f64,
    boost_collected_big: f64,
    boost_collected_small: f64,
    boost_collected_grant: f64,
    boost_stolen: f64,
    boost_stolen_big: f64,
    boost_stolen_small: f64,
    boost_overfill: f64,
    boost_used: f64,
    boost_used_supersonic: f64,
    boost_stolen_overfill: f64,
    big_pads: u64,
    big_pads_offensive: u64,
    big_pads_neutral: u64,
    big_pads_defensive: u64,
    small_pads: u64,
    small_pads_offensive: u64,
    small_pads_defensive: u64,
    stolen_big_pads: u64,
    stolen_small_pads: u64,
    boost_amount_weighted_sum: f64,
    tracked_seconds: f64,
    bands: [f64; 6],
}

impl PlayerBoostAccumulator {
    fn merge_event_fields(&mut self, fields: Option<&PlayerBoostEventAccumulator>) {
        let Some(fields) = fields else {
            return;
        };
        self.boost_collected_big += fields.boost_collected_big;
        self.boost_collected_small += fields.boost_collected_small;
        self.boost_collected_grant += fields.boost_collected_grant;
        self.boost_stolen_big += fields.boost_stolen_big;
        self.boost_stolen_small += fields.boost_stolen_small;
        self.boost_stolen_overfill += fields.boost_stolen_overfill;
        self.big_pads += fields.big_pads;
        self.big_pads_offensive += fields.big_pads_offensive;
        self.big_pads_neutral += fields.big_pads_neutral;
        self.big_pads_defensive += fields.big_pads_defensive;
        self.small_pads += fields.small_pads;
        self.small_pads_offensive += fields.small_pads_offensive;
        self.small_pads_defensive += fields.small_pads_defensive;
        self.stolen_big_pads += fields.stolen_big_pads;
        self.stolen_small_pads += fields.stolen_small_pads;
    }

    fn has_data(&self) -> bool {
        self.tracked_seconds > 0.0
            || self.boost_collected > 0.0
            || self.boost_collected_big > 0.0
            || self.boost_collected_small > 0.0
            || self.boost_collected_grant > 0.0
            || self.boost_stolen > 0.0
            || self.boost_overfill > 0.0
            || self.boost_used > 0.0
            || self.boost_used_supersonic > 0.0
            || self.big_pads > 0
            || self.small_pads > 0
    }

    fn into_response(self) -> PlayerBoostTotalResponse {
        let known_collected =
            self.boost_collected_big + self.boost_collected_small + self.boost_collected_grant;
        let boost_collected_unknown = (self.boost_collected - known_collected).max(0.0);
        PlayerBoostTotalResponse {
            boost_collected: self.boost_collected,
            boost_collected_big: self.boost_collected_big,
            boost_collected_small: self.boost_collected_small,
            boost_collected_grant: self.boost_collected_grant,
            boost_collected_unknown,
            boost_stolen: self.boost_stolen,
            boost_stolen_big: self.boost_stolen_big,
            boost_stolen_small: self.boost_stolen_small,
            boost_overfill: self.boost_overfill,
            boost_used: self.boost_used,
            boost_used_supersonic: self.boost_used_supersonic,
            boost_stolen_overfill: self.boost_stolen_overfill,
            big_pads: self.big_pads,
            big_pads_offensive: self.big_pads_offensive,
            big_pads_neutral: self.big_pads_neutral,
            big_pads_defensive: self.big_pads_defensive,
            small_pads: self.small_pads,
            small_pads_offensive: self.small_pads_offensive,
            small_pads_defensive: self.small_pads_defensive,
            stolen_big_pads: self.stolen_big_pads,
            stolen_small_pads: self.stolen_small_pads,
            stolen_pads: self.stolen_big_pads + self.stolen_small_pads,
            boost_amount_weighted_sum: self.boost_amount_weighted_sum,
            tracked_seconds: self.tracked_seconds,
            time_empty: self.bands[0],
            time_low: self.bands[1],
            time_medium: self.bands[2],
            time_high: self.bands[3],
            time_full: self.bands[4],
            time_over: self.bands[5],
        }
    }
}

#[derive(Default)]
struct PlayerBoostEventAccumulator {
    boost_collected_big: f64,
    boost_collected_small: f64,
    boost_collected_grant: f64,
    boost_stolen_big: f64,
    boost_stolen_small: f64,
    boost_stolen_overfill: f64,
    big_pads: u64,
    big_pads_offensive: u64,
    big_pads_neutral: u64,
    big_pads_defensive: u64,
    small_pads: u64,
    small_pads_offensive: u64,
    small_pads_defensive: u64,
    stolen_big_pads: u64,
    stolen_small_pads: u64,
}

async fn load_player_boost_event_fields(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<HashMap<String, PlayerBoostEventAccumulator>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT DISTINCT
                rp.replay_id,
                rp.team,
                r.canonical_analysis_run_id AS run_id,
                concat(rp.platform, ':', rp.platform_player_id) AS target_player_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
              AND r.canonical_analysis_run_id IS NOT NULL
        ),
        boost_events AS MATERIALIZED (
            SELECT
                CASE
                    WHEN concat(actor.platform, ':', actor.platform_player_id) = appearance.target_player_id THEN 'player'
                    WHEN actor.team = appearance.team
                     AND concat(actor.platform, ':', actor.platform_player_id) <> appearance.target_player_id THEN 'teammates'
                    WHEN actor.team IS NOT NULL
                     AND appearance.team IS NOT NULL
                     AND actor.team <> appearance.team THEN 'opponents'
                    ELSE NULL
                END AS cohort,
                et.key AS event_type,
                COALESCE(payload.payload, '{}'::jsonb) AS payload
            FROM target_appearances appearance
            JOIN play_events event
              ON event.replay_id = appearance.replay_id
             AND event.analysis_run_id = appearance.run_id
            JOIN event_types et
              ON et.id = event.event_type_id
             AND et.key IN ('boost_pickup', 'boost_respawn')
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.role = 'actor'
             AND subject.replay_player_id IS NOT NULL
            JOIN replay_players actor ON actor.id = subject.replay_player_id
            LEFT JOIN play_event_payloads payload ON payload.event_id = event.id
        ),
        normalized AS (
            SELECT
                cohort,
                event_type,
                COALESCE(payload->>'pad_type', payload->>'pad_size') AS pad_size,
                COALESCE(payload->>'pad_zone', payload->>'big_pad_zone') AS pad_zone,
                payload->>'field_half' AS field_half,
                COALESCE((payload->>'is_steal')::boolean, false) AS is_steal,
                COALESCE((payload->>'collected_amount')::double precision, 0.0) AS collected_amount,
                COALESCE((payload->>'overfill_amount')::double precision, 0.0) AS overfill_amount,
                COALESCE((payload->>'boost_granted')::double precision, 0.0) AS boost_granted
            FROM boost_events
            WHERE cohort IS NOT NULL
        )
        SELECT
            cohort,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big'), 0.0) AS boost_collected_big,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small'), 0.0) AS boost_collected_small,
            COALESCE(SUM(boost_granted) FILTER (WHERE event_type = 'boost_respawn'), 0.0) AS boost_collected_grant,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'big'), 0.0) AS boost_stolen_big,
            COALESCE(SUM(collected_amount) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'small'), 0.0) AS boost_stolen_small,
            COALESCE(SUM(overfill_amount) FILTER (WHERE event_type = 'boost_pickup' AND is_steal), 0.0) AS boost_stolen_overfill,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big') AS big_pads,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big' AND (pad_zone = 'offensive' OR (pad_zone IS NULL AND field_half = 'opponent'))) AS big_pads_offensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big' AND pad_zone = 'neutral') AS big_pads_neutral,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'big' AND (pad_zone = 'defensive' OR (pad_zone IS NULL AND field_half = 'own'))) AS big_pads_defensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small') AS small_pads,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small' AND (pad_zone = 'offensive' OR (pad_zone IS NULL AND field_half = 'opponent'))) AS small_pads_offensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND pad_size = 'small' AND (pad_zone = 'defensive' OR (pad_zone IS NULL AND field_half = 'own'))) AS small_pads_defensive,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'big') AS stolen_big_pads,
            COUNT(*) FILTER (WHERE event_type = 'boost_pickup' AND is_steal AND pad_size = 'small') AS stolen_small_pads
        FROM normalized
        GROUP BY cohort
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    let mut fields = HashMap::new();
    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        fields.insert(
            cohort,
            PlayerBoostEventAccumulator {
                boost_collected_big: boost_raw_to_percent(row.try_get("boost_collected_big")?),
                boost_collected_small: boost_raw_to_percent(row.try_get("boost_collected_small")?),
                boost_collected_grant: boost_raw_to_percent(row.try_get("boost_collected_grant")?),
                boost_stolen_big: boost_raw_to_percent(row.try_get("boost_stolen_big")?),
                boost_stolen_small: boost_raw_to_percent(row.try_get("boost_stolen_small")?),
                boost_stolen_overfill: boost_raw_to_percent(row.try_get("boost_stolen_overfill")?),
                big_pads: count_column(&row, "big_pads")?,
                big_pads_offensive: count_column(&row, "big_pads_offensive")?,
                big_pads_neutral: count_column(&row, "big_pads_neutral")?,
                big_pads_defensive: count_column(&row, "big_pads_defensive")?,
                small_pads: count_column(&row, "small_pads")?,
                small_pads_offensive: count_column(&row, "small_pads_offensive")?,
                small_pads_defensive: count_column(&row, "small_pads_defensive")?,
                stolen_big_pads: count_column(&row, "stolen_big_pads")?,
                stolen_small_pads: count_column(&row, "stolen_small_pads")?,
            },
        );
    }
    Ok(fields)
}

fn accumulate_player_boost_tracks(
    tracks: &BoostTracksResponse,
    target_player_id: &str,
    teammate_player_ids: &[String],
    opponent_player_ids: &[String],
    player: &mut PlayerBoostAccumulator,
    teammates: &mut PlayerBoostAccumulator,
    opponents: &mut PlayerBoostAccumulator,
) {
    let teammate_ids: HashSet<&str> = teammate_player_ids.iter().map(String::as_str).collect();
    let opponent_ids: HashSet<&str> = opponent_player_ids.iter().map(String::as_str).collect();
    let replay_duration = tracks
        .tracks
        .iter()
        .filter(|track| track.quantity == "boost_amount")
        .flat_map(|track| track.points.iter())
        .filter_map(|point| point.time)
        .fold(0.0_f64, f64::max);

    for track in &tracks.tracks {
        let Some(player_id) = track.player_id.as_deref() else {
            continue;
        };

        if player_id == target_player_id {
            accumulate_player_boost_track(track, replay_duration, player);
        } else if teammate_ids.contains(player_id) {
            accumulate_player_boost_track(track, replay_duration, teammates);
        } else if opponent_ids.contains(player_id) {
            accumulate_player_boost_track(track, replay_duration, opponents);
        }
    }
}

fn accumulate_player_boost_track(
    track: &super::replays::BoostTrack,
    replay_duration: f64,
    accumulator: &mut PlayerBoostAccumulator,
) {
    match track.quantity.as_str() {
        "boost_amount" => {
            let mut samples: Vec<(f64, f64)> = track
                .points
                .iter()
                .filter_map(|point| point.time.map(|time| (time, point.value)))
                .collect();
            samples.sort_by(|left, right| left.0.total_cmp(&right.0));
            for index in 0..samples.len() {
                let (time, value) = samples[index];
                let next_time = samples.get(index + 1).map_or(replay_duration, |s| s.0);
                let seconds = (next_time.min(replay_duration) - time.max(0.0)).max(0.0);
                if seconds == 0.0 {
                    continue;
                }
                let percent = value * 100.0 / BOOST_RAW_MAX;
                accumulator.boost_amount_weighted_sum += percent * seconds;
                accumulator.tracked_seconds += seconds;
                accumulator.bands[player_boost_band_index(percent)] += seconds;
            }
        }
        "boost_used" => {
            if let Some(last) = track.points.last() {
                accumulator.boost_used += last.value * 100.0 / BOOST_RAW_MAX;
            }
        }
        "boost_collected" => {
            if let Some(last) = track.points.last() {
                accumulator.boost_collected += last.value * 100.0 / BOOST_RAW_MAX;
            }
        }
        "boost_stolen" => {
            if let Some(last) = track.points.last() {
                accumulator.boost_stolen += last.value * 100.0 / BOOST_RAW_MAX;
            }
        }
        "boost_overfill" => {
            if let Some(last) = track.points.last() {
                accumulator.boost_overfill += last.value * 100.0 / BOOST_RAW_MAX;
            }
        }
        "boost_used_supersonic" => {
            if let Some(last) = track.points.last() {
                accumulator.boost_used_supersonic += last.value * 100.0 / BOOST_RAW_MAX;
            }
        }
        _ => {}
    }
}

const BOOST_RAW_MAX: f64 = 255.0;

fn boost_raw_to_percent(value: f64) -> f64 {
    value * 100.0 / BOOST_RAW_MAX
}

fn player_boost_band_index(percent: f64) -> usize {
    if percent < 1.0 {
        0
    } else if percent < 25.0 {
        1
    } else if percent < 50.0 {
        2
    } else if percent < 75.0 {
        3
    } else if percent < 100.0 {
        4
    } else {
        5
    }
}

async fn load_stat_aggregates_base(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
    include_rotation_histogram: bool,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    // These queries are independent; run them concurrently against the pool.
    let teammate_fut = async {
        if filters.player.is_some() && filters.include_teammates {
            Ok::<_, sqlx::Error>(Some(load_teammate_denominators(pool, filters).await?))
        } else {
            Ok(None)
        }
    };
    // The rotation histogram is only surfaced on the top-level response, not on
    // per-playlist groups, so skip the (expensive) query when grouping.
    let histogram_fut = async {
        if include_rotation_histogram {
            load_rotation_duration_histogram(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    // Teammate stint distribution, surfaced alongside the player's for comparison.
    let teammate_histogram_fut = async {
        if include_rotation_histogram && filters.player.is_some() && filters.include_teammates {
            load_teammate_rotation_duration_histogram(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    let (
        target_denominators,
        teammate_denominators,
        rows,
        rotation_duration_histogram,
        teammate_rotation_duration_histogram,
    ) = tokio::try_join!(
        load_target_denominators(pool, filters),
        teammate_fut,
        load_stat_count_rows(pool, filters),
        histogram_fut,
        teammate_histogram_fut,
    )?;
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
        teammate_rotation_duration_histogram,
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

/// Maximum number of per-playlist aggregate groups to compute concurrently.
///
/// Each group runs a handful of queries (which themselves fan out), so this is
/// kept comfortably below the connection-pool size to leave headroom for the
/// concurrent top-level base query and other in-flight requests.
const PLAYLIST_GROUP_CONCURRENCY: usize = 4;

async fn load_playlist_stat_aggregate_groups(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    use futures::stream::{StreamExt, TryStreamExt};

    let playlists = load_stat_group_playlists(pool, filters).await?;

    // Compute each playlist's aggregates concurrently. `buffered` preserves the
    // input ordering (replay_count DESC) while bounding in-flight work.
    futures::stream::iter(playlists.into_iter().map(|playlist| async move {
        let mut group_filters = filters.clone();
        group_filters.group_by = None;
        group_filters.replay_set.playlist_group_key = Some(playlist.clone());
        let aggregates = load_stat_aggregates_base(pool, &group_filters, false).await?;
        Ok::<_, sqlx::Error>(StatAggregateGroupResponse {
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
        })
    }))
    .buffered(PLAYLIST_GROUP_CONCURRENCY)
    .try_collect()
    .await
}

async fn load_stat_group_playlists(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<String>, sqlx::Error> {
    let mut query = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new("\n            SELECT\n                ");
        push_playlist_group_key_expression(&mut query, "r");
        query.push(
            r#" AS playlist,
                COUNT(DISTINCT rp.replay_id) AS replay_count,
                MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query
    } else {
        let mut query = QueryBuilder::<Postgres>::new("\n            SELECT\n                ");
        push_playlist_group_key_expression(&mut query, "r");
        query.push(
            r#" AS playlist,
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
          AND "#,
    );
    push_playlist_group_key_expression(&mut query, "r");
    query.push(
        r#" IS NOT NULL
        GROUP BY 1
        ORDER BY replay_count DESC, latest_seen_at DESC NULLS LAST, playlist
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
            WITH target_appearances AS MATERIALIZED (
                SELECT rp.id, rp.replay_id, r.canonical_analysis_run_id AS run_id
                FROM replay_players rp
                JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query.push(
            r#"
            ),
            rotation_events AS MATERIALIZED (
                SELECT event.duration_seconds
                FROM target_appearances appearance
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                 AND subject.role = 'actor'
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = appearance.run_id
                 AND event.source_stream IN ('rotation_first_man_stint', 'rotation_role')
                JOIN event_types et
                  ON et.id = event.event_type_id
                LEFT JOIN play_event_attributes attributes
                  ON attributes.event_id = event.id
                WHERE (
                    event.source_stream = 'rotation_first_man_stint'
                    AND et.key = 'rotation_first_man_stint'
                ) OR (
                    event.source_stream = 'rotation_role'
                    AND attributes.attributes->>'state' = 'first_man'
                )
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
                 AND event.source_stream IN ('rotation_first_man_stint', 'rotation_role')
                JOIN event_types et
                  ON et.id = event.event_type_id
                LEFT JOIN play_event_attributes attributes
                  ON attributes.event_id = event.id
                WHERE r.canonical_analysis_run_id IS NOT NULL
                  AND (
                    (
                        event.source_stream = 'rotation_first_man_stint'
                        AND et.key = 'rotation_first_man_stint'
                    ) OR (
                        event.source_stream = 'rotation_role'
                        AND attributes.attributes->>'state' = 'first_man'
                    )
                  )
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

/// First-man stint distribution for the target player's teammates, bucketed the
/// same way as [`load_rotation_duration_histogram`] so the two can be compared.
async fn load_teammate_rotation_duration_histogram(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT rp.id, rp.replay_id, rp.team, r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        ),
        teammate_appearances AS MATERIALIZED (
            SELECT DISTINCT teammate.id, target.run_id
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        ),
        rotation_events AS MATERIALIZED (
            SELECT event.duration_seconds
            FROM teammate_appearances appearance
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
             AND subject.role = 'actor'
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = appearance.run_id
             AND event.source_stream IN ('rotation_first_man_stint', 'rotation_role')
            JOIN event_types et
              ON et.id = event.event_type_id
            LEFT JOIN play_event_attributes attributes
              ON attributes.event_id = event.id
            WHERE (
                event.source_stream = 'rotation_first_man_stint'
                AND et.key = 'rotation_first_man_stint'
            ) OR (
                event.source_stream = 'rotation_role'
                AND attributes.attributes->>'state' = 'first_man'
            )
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
        "#,
    );
    append_user_facing_stat_event_join_filter(&mut query, "event");
    append_stat_term_event_filter(&mut query, "event", &filters.stat_terms);
    query.push(
        r#"
        JOIN event_types et
          ON et.id = event.event_type_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    append_event_kickoff_spawn_filter(&mut query, filters, "event.id");
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

/// Loads per-stat event counts for a single target player (and their teammates).
///
/// Reads the materialized `player_replay_event_counts` table when possible,
/// falling back to the live `play_event_subjects`/`play_events` scan when a
/// filter cannot be served from the materialization. The only such filter today
/// is `kickoff_spawn`, a per-event-id predicate that the per-(player, type)
/// counts cannot reproduce; the lifetime stats page never sets it, so the fast
/// path covers that page.
async fn load_player_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    if filters.kickoff_spawn.is_empty() {
        load_player_stat_count_rows_materialized(pool, filters).await
    } else {
        load_player_stat_count_rows_live(pool, filters).await
    }
}

async fn load_player_stat_count_rows_live(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    // Drive the scan from the player's own event subjects rather than from every
    // event in each replay. Carrying the replay's canonical `run_id` on the
    // appearance lets Postgres look events up by primary key (subject.event_id)
    // and filter to the canonical analysis run inline, instead of scanning the
    // full per-replay event stream and merge-joining it against subjects. The
    // `MATERIALIZED` fences keep the planner from collapsing the CTEs back into
    // that pathological plan. See `play_event_subjects_replay_player_event_idx`.
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT
                rp.id,
                rp.replay_id,
                rp.team,
                r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        ),
        target_events AS MATERIALIZED (
            SELECT DISTINCT event.id, event.event_type_id
            FROM target_appearances appearance
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = appearance.run_id
            "#,
    );
    append_user_facing_stat_event_join_filter(&mut query, "event");
    append_stat_term_event_filter(&mut query, "event", &filters.stat_terms);
    append_event_kickoff_spawn_filter(&mut query, filters, "event.id");
    query.push(
        r#"
        ),
        target_stats AS (
            SELECT
                et.key,
                et.display_name,
                et.category,
                COUNT(*) AS event_count
            FROM target_events
            JOIN event_types et ON et.id = target_events.event_type_id
            GROUP BY et.key, et.display_name, et.category
        )
        "#,
    );

    if filters.include_teammates {
        query.push(
            r#"
            ,
            teammate_appearances AS MATERIALIZED (
                SELECT DISTINCT
                    teammate.id,
                    teammate.replay_id,
                    target.run_id
                FROM target_appearances target
                JOIN replay_players teammate
                  ON teammate.replay_id = target.replay_id
                 AND teammate.team = target.team
                 AND teammate.id <> target.id
            ),
            teammate_events AS MATERIALIZED (
                SELECT DISTINCT event.id, event.event_type_id
                FROM teammate_appearances appearance
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = appearance.run_id
                "#,
        );
        append_user_facing_stat_event_join_filter(&mut query, "event");
        append_stat_term_event_filter(&mut query, "event", &filters.stat_terms);
        append_event_kickoff_spawn_filter(&mut query, filters, "event.id");
        query.push(
            r#"
            ),
            teammate_stats AS (
                SELECT
                    et.key,
                    et.display_name,
                    et.category,
                    COUNT(*) AS event_count
                FROM teammate_events
                JOIN event_types et ON et.id = teammate_events.event_type_id
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

/// Materialized version of `load_player_stat_count_rows_live`, reading
/// pre-aggregated per-(replay, player, event type) counts instead of scanning
/// `play_event_subjects`/`play_events`. The target player's counts are exact (a
/// single player, so the stored count equals `COUNT(DISTINCT event.id)`).
///
/// Teammate counts are the SUM of each teammate's own involvement count, which
/// differs from the live query's `COUNT(DISTINCT event.id)` across the whole
/// teammate set only for events with multiple same-team subjects (e.g. passes):
/// such an event contributes once in the live query and once per involved
/// teammate here. See the read-path note in the PR -- if exact parity is
/// required, teammates need a team-level distinct-count materialization.
async fn load_player_stat_count_rows_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    let player = filters
        .player
        .as_ref()
        .expect("materialized player stat counts require a player");

    // The player's matching (replay, type, count) rows, restricted to canonical
    // runs and the request's replay filters via a `replays` join. This is the
    // only filtered scan; both target and teammate aggregates derive from it.
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_rows AS MATERIALIZED (
            SELECT
                counts.replay_id,
                counts.team,
                counts.event_type_id,
                counts.event_count
            FROM player_replay_event_counts counts
            JOIN replays r
              ON r.id = counts.replay_id
             AND r.canonical_analysis_run_id = counts.analysis_run_id
            WHERE counts.platform = "#,
    );
    query.push_bind(&player.platform);
    query.push(" AND counts.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(
        r#"
        ),
        target_stats AS (
            SELECT event_type_id, SUM(event_count) AS event_count
            FROM target_rows
            GROUP BY event_type_id
        )
        "#,
    );

    if filters.include_teammates {
        // Co-players sharing the target's (replay, team), excluding the target.
        query.push(
            r#"
            ,
            target_appearances AS (
                SELECT DISTINCT replay_id, team FROM target_rows
            ),
            teammate_stats AS (
                SELECT counts.event_type_id, SUM(counts.event_count) AS event_count
                FROM target_appearances appearance
                JOIN player_replay_event_counts counts
                  ON counts.replay_id = appearance.replay_id
                 AND counts.team = appearance.team
                 AND NOT (
                    counts.platform = "#,
        );
        query.push_bind(&player.platform);
        query.push(" AND counts.platform_player_id = ");
        query.push_bind(&player.platform_player_id);
        query.push(
            r#")
                GROUP BY counts.event_type_id
            )
            SELECT
                et.key,
                et.display_name,
                et.category,
                COALESCE(target_stats.event_count, 0) AS event_count,
                COALESCE(teammate_stats.event_count, 0) AS teammate_event_count
            FROM target_stats
            FULL OUTER JOIN teammate_stats
              ON teammate_stats.event_type_id = target_stats.event_type_id
            JOIN event_types et
              ON et.id = COALESCE(target_stats.event_type_id, teammate_stats.event_type_id)
            "#,
        );
        append_materialized_stat_term_filter(&mut query, &filters.stat_terms);
        query.push(
            r#"
            ORDER BY
                GREATEST(COALESCE(target_stats.event_count, 0), COALESCE(teammate_stats.event_count, 0)) DESC,
                et.category,
                et.display_name,
                et.key
            LIMIT
            "#,
        );
    } else {
        query.push(
            r#"
            SELECT
                et.key,
                et.display_name,
                et.category,
                target_stats.event_count AS event_count,
                0::bigint AS teammate_event_count
            FROM target_stats
            JOIN event_types et ON et.id = target_stats.event_type_id
            "#,
        );
        append_materialized_stat_term_filter(&mut query, &filters.stat_terms);
        query.push(
            r#"
            ORDER BY target_stats.event_count DESC, et.category, et.display_name, et.key
            LIMIT
            "#,
        );
    }
    query.push_bind(i64::from(filters.limit));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(stat_count_row_from_db).collect()
}

/// Applies the stat-term filter directly against the joined `event_types et`
/// row. Equivalent to `append_stat_term_event_filter` but for reads that have
/// already grouped by `event_type_id`, so there is no per-event subquery.
fn append_materialized_stat_term_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    terms: &[String],
) {
    if terms.is_empty() {
        return;
    }
    builder.push(" WHERE (");
    append_stat_term_predicate(builder, "et", terms);
    builder.push(")");
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

pub(crate) fn append_user_facing_stat_event_join_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    event_alias: &str,
) {
    builder
        .push(" AND ")
        .push(event_alias)
        .push(".")
        .push(AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL);
}

fn append_event_kickoff_spawn_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
    event_id_expression: &str,
) {
    push_kickoff_event_spawn_filter(
        builder,
        &filters.kickoff_spawn,
        event_id_expression,
        "kickoff_filter",
    );
}

pub(crate) fn append_stat_term_event_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    event_alias: &str,
    terms: &[String],
) {
    if terms.is_empty() {
        return;
    }

    builder
        .push(" AND ")
        .push(event_alias)
        .push(".event_type_id IN (SELECT stat_filter.id FROM event_types stat_filter WHERE ");
    append_stat_term_predicate(builder, "stat_filter", terms);
    builder.push(")");
}

fn append_stat_term_predicate<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    event_type_alias: &str,
    terms: &[String],
) {
    for (index, term) in terms.iter().enumerate() {
        if index > 0 {
            builder.push(" OR ");
        }
        let pattern = format!("%{}%", escape_like_term(term));
        builder
            .push("(")
            .push(event_type_alias)
            .push(".key ILIKE ")
            .push_bind(pattern.clone())
            .push(" ESCAPE '\\' OR ")
            .push(event_type_alias)
            .push(".display_name ILIKE ")
            .push_bind(pattern.clone())
            .push(" ESCAPE '\\' OR ")
            .push(event_type_alias)
            .push(".category ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }
}

fn append_target_player_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
) {
    let player = filters
        .player
        .as_ref()
        .expect("target player filters require a player");
    append_target_player_replay_set_filters(builder, &filters.replay_set, player);
}

fn append_replay_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
    replay_alias: &str,
) {
    append_replay_set_filters(builder, &filters.replay_set, replay_alias);
}

fn finite_nonnegative(value: Option<f64>) -> Option<f64> {
    value.filter(|seconds| seconds.is_finite() && *seconds >= 0.0)
}

fn per_minute(count: u64, denominator_seconds: Option<f64>) -> Option<f64> {
    denominator_seconds
        .filter(|seconds| *seconds > 0.0)
        .map(|seconds| count as f64 * 60.0 / seconds)
}

fn parse_stat_group_by(value: &str) -> Result<StatAggregateGroupBy, ApiError> {
    match value.trim().to_ascii_lowercase().as_str() {
        "playlist" | "game-mode" | "game_mode" => Ok(StatAggregateGroupBy::Playlist),
        _ => Err(ApiError::bad_request("group-by must be one of: playlist")),
    }
}

pub(crate) fn normalize_stat_terms(values: Vec<String>) -> Vec<String> {
    let mut terms = Vec::new();
    for value in values {
        let term = value.trim().to_ascii_lowercase();
        if !term.is_empty() && !terms.contains(&term) {
            terms.push(term);
        }
    }
    terms
}

fn escape_like_term(term: &str) -> String {
    term.replace('\\', "\\\\")
        .replace('%', "\\%")
        .replace('_', "\\_")
}

/// A single user-facing event type, used to report which stat keys a fuzzy
/// `stat-term` resolved to (e.g. for the mechanic leaderboard).
pub(crate) struct MatchedEventType {
    pub(crate) key: String,
    pub(crate) display_name: String,
    pub(crate) category: String,
}

/// Resolves the user-facing event types matched by the given `stat-term`
/// patterns (the same ILIKE matching used to filter aggregates). Returns every
/// user-facing event type when `terms` is empty.
pub(crate) async fn resolve_matched_event_types(
    pool: &sqlx::PgPool,
    terms: &[String],
) -> Result<Vec<MatchedEventType>, sqlx::Error> {
    let mut builder =
        QueryBuilder::<Postgres>::new("SELECT key, display_name, category FROM event_types");
    if !terms.is_empty() {
        builder.push(" WHERE ");
        append_stat_term_predicate(&mut builder, "event_types", terms);
    }
    builder.push(" ORDER BY category, display_name, key");

    let rows = builder.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            Ok(MatchedEventType {
                key: row.try_get("key")?,
                display_name: row.try_get("display_name")?,
                category: row.try_get("category")?,
            })
        })
        .collect()
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
