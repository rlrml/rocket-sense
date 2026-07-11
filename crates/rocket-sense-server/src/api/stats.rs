use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::types::Json as SqlxJson;
use sqlx::{Postgres, QueryBuilder, Row};
use std::collections::{HashMap, HashSet};
use std::sync::Arc;
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use crate::rank_benchmark::BenchmarkWindow;

use super::{
    event_stats::{count_column, push_kickoff_event_spawn_filter, KickoffSpawnFilter},
    query::{
        deserialize_string_vec, deserialize_uuid_vec, parse_bool_filter, parse_u32_filter,
        QueryParams,
    },
    replay_set::{
        append_replay_set_filters, append_target_player_replay_set_filters,
        push_playlist_group_key_expression, PlayerStatFilter, ReplayOutcome, ReplaySetFilterInput,
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
        .route(
            "/stats/boost-pad-control",
            get(get_player_boost_pad_control),
        )
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
    pub opponent_appearance_count: Option<u64>,
    pub opponent_active_time_seconds: Option<f64>,
    pub opponent_non_demo_active_time_seconds: Option<f64>,
    pub opponent_time_most_back_seconds: Option<f64>,
    pub opponent_time_most_forward_seconds: Option<f64>,
    pub rotation_duration_bucket_seconds: f64,
    pub rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub teammate_rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub opponent_rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub touch_breakdown: Option<TouchAggregateBreakdownResponse>,
    pub stats: Vec<StatAggregateResponse>,
    pub groups: Vec<StatAggregateGroupResponse>,
    /// Present only when a `group-by=player` set had more distinct players than
    /// the per-request cap, so `groups` holds the top `limit` (by replay count)
    /// out of `total`. Lets the client warn that the leaderboard is partial.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub groups_truncated: Option<GroupTruncation>,
}

/// Reports that a grouped leaderboard was capped: `groups` holds the top
/// `limit` rows out of `total` available groups.
#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct GroupTruncation {
    pub limit: u64,
    pub total: u64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct TouchAggregateBreakdownResponse {
    pub cohorts: Vec<TouchAggregateCohortResponse>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct TouchAggregateCohortResponse {
    pub key: String,
    pub label: String,
    pub total_touch_count: u64,
    pub total_advance_distance: f64,
    pub active_time_seconds: Option<f64>,
    pub dimensions: Vec<TouchAggregateDimensionResponse>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct TouchAggregateDimensionResponse {
    pub key: String,
    pub values: Vec<TouchAggregateValueResponse>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct TouchAggregateValueResponse {
    pub key: String,
    pub touch_count: u64,
    pub advance_distance: f64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct StatAggregateGroupPlayer {
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatAggregateGroupResponse {
    pub group_by: String,
    pub key: String,
    pub display_name: String,
    /// Player identity for `group-by=player` rows so the leaderboard can render
    /// player chips and link into the group-scoped career view. `None` for other
    /// groupings (e.g. playlist).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub player: Option<StatAggregateGroupPlayer>,
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
    pub opponent_appearance_count: Option<u64>,
    pub opponent_active_time_seconds: Option<f64>,
    pub opponent_non_demo_active_time_seconds: Option<f64>,
    pub opponent_time_most_back_seconds: Option<f64>,
    pub opponent_time_most_forward_seconds: Option<f64>,
    /// Replays in the set the player's team won / lost, decided by final score
    /// (ties count as neither). A base measure for the `win_rate` derived metric.
    /// `None` for non-player groupings, where there is no single team to credit.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub win_count: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub loss_count: Option<u64>,
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
    pub opponent_event_count: u64,
    pub opponent_appearance_count: u64,
    pub opponent_count_per_game: Option<f64>,
    pub opponent_per_active_minute: Option<f64>,
    pub opponent_per_non_demo_active_minute: Option<f64>,
}

/// One selectable benchmark window (`rolling-6m`, `season:current`, ...).
#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct RankBenchmarkWindowOption {
    pub key: String,
    pub label: String,
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

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct BoostPadControlPointResponse {
    pub pad_id: String,
    /// Player-relative field X coordinate after rotating team-one appearances.
    pub x: f64,
    /// Player-relative field Y coordinate: negative is own half, positive is opponent half.
    pub y: f64,
    pub pad_size: String,
    pub player_count: u64,
    pub teammate_count: u64,
    pub opponent_count: u64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct BoostPadControlResponse {
    pub points: Vec<BoostPadControlPointResponse>,
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
    /// Lower bound (inclusive) of the focused player's per-replay rank, as a rank
    /// slug (`diamond-1`) or tier number. Scoped to `player-id` when present.
    #[serde(rename = "min-rank", alias = "min_rank")]
    pub min_rank: Option<String>,
    /// Upper bound (inclusive) of the focused player's per-replay rank.
    #[serde(rename = "max-rank", alias = "max_rank")]
    pub max_rank: Option<String>,
    /// Lower bound (inclusive) of the replay's competitive season (`s12`, `f23`).
    #[serde(rename = "min-season", alias = "min_season")]
    pub min_season: Option<String>,
    /// Upper bound (inclusive) of the replay's competitive season.
    #[serde(rename = "max-season", alias = "max_season")]
    pub max_season: Option<String>,
    /// Optional player focus in `platform:id` form.
    #[serde(rename = "player-id")]
    pub player_id: Option<String>,
    /// Restrict the replay set to games the focused player won or lost.
    #[serde(rename = "player-outcome", alias = "player_outcome")]
    pub player_outcome: Option<String>,
    /// Include replays automatically excluded from aggregate surfaces because a
    /// player appears to have left or gone untracked for an extended period.
    #[serde(
        rename = "include-incomplete-games",
        alias = "include_incomplete_games"
    )]
    pub include_incomplete_games: Option<bool>,
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
    /// Include first-man stint histograms. Defaults to true for compatibility,
    /// but expensive lifetime views can opt out when they do not render them.
    #[serde(
        rename = "include-rotation-histogram",
        alias = "include_rotation_histogram"
    )]
    pub include_rotation_histogram: Option<bool>,
    /// Kickoff spawn shape filter for kickoff-scoped aggregate rows.
    #[serde(rename = "kickoff-shape", alias = "kickoff_shape")]
    pub kickoff_shape: Option<String>,
    /// Kickoff spawn side filter for kickoff-scoped aggregate rows.
    #[serde(rename = "kickoff-side", alias = "kickoff_side")]
    pub kickoff_side: Option<String>,
    /// Per-request override of the server's materialized-stats default:
    /// `materialized=false` forces the live (non-materialized) query path,
    /// `materialized=true` forces the materialized path. Absent uses the server
    /// default. Lets any view run a query both ways for comparison/verification.
    pub materialized: Option<bool>,
    /// Benchmark-window override (`rolling-6m`, `season:current`, ...) for the
    /// rank-average cohorts; absent uses the server default window.
    #[serde(rename = "rank-benchmark-window", alias = "rank_benchmark_window")]
    pub rank_benchmark_window: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub(crate) struct StatAggregateFilters {
    pub(crate) replay_set: ReplaySetFilters,
    pub(crate) player: Option<PlayerStatFilter>,
    pub(crate) stat_terms: Vec<String>,
    pub(crate) include_teammates: bool,
    pub(crate) include_rotation_histogram: bool,
    pub(crate) kickoff_spawn: KickoffSpawnFilter,
    pub(crate) limit: u32,
    pub(crate) group_by: Option<StatAggregateGroupBy>,
    /// When true, player stat counts read the materialized
    /// `player_replay_event_counts` table instead of the live event scan. Set
    /// from `AppState::materialized_stat_counts` by the handler.
    pub(crate) materialized_stat_counts: bool,
    /// Gates the `rank-peers` benchmark cohort. Set from
    /// `AppState::rank_benchmark_enabled` by the handler.
    pub(crate) rank_benchmark_enabled: bool,
    /// Configured benchmark windows (for the available-windows picker and
    /// override validation). Set from `AppState` by the handler.
    pub(crate) rank_benchmark_windows: Arc<[BenchmarkWindow]>,
    /// `window_key` served when a request carries no `rank-benchmark-window`.
    pub(crate) rank_benchmark_default_window: Arc<str>,
    /// Manual window override (`rank-benchmark-window`), else the default window.
    pub(crate) rank_benchmark_window: Option<String>,
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
    /// One aggregate block per distinct player in the replay set. Used by the
    /// replay-group leaderboard, where the comparison axis is player-vs-player
    /// rather than one player vs cohorts.
    Player,
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
    opponent_event_count: u64,
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
                seasons: Vec::new(),
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
                min_rank: query.min_rank,
                max_rank: query.max_rank,
                min_season: query.min_season,
                max_season: query.max_season,
                target_player_id: query.player_id.clone(),
                player_outcome: query.player_outcome,
                include_incomplete_games: query.include_incomplete_games,
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
            include_rotation_histogram: query.include_rotation_histogram.unwrap_or(true),
            kickoff_spawn: KickoffSpawnFilter::from_values(
                query.kickoff_shape,
                query.kickoff_side,
            )?,
            limit: query.count.unwrap_or(50).clamp(1, 200),
            group_by: query
                .group_by
                .map(|group_by| parse_stat_group_by(&group_by))
                .transpose()?,
            materialized_stat_counts: false,
            rank_benchmark_enabled: false,
            rank_benchmark_windows: Arc::from(Vec::new()),
            rank_benchmark_default_window: Arc::from(""),
            rank_benchmark_window: query
                .rank_benchmark_window
                .map(|window| window.trim().to_owned())
                .filter(|window| !window.is_empty()),
        })
    }
}

impl StatAggregatesQuery {
    pub(crate) fn from_raw_query(raw_query: Option<&str>) -> Result<Self, ApiError> {
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
            player_outcome: params.first(&["player-outcome", "player_outcome"]),
            include_incomplete_games: replay_set.include_incomplete_games,
            stat_terms: params.values(&["stat-term", "stat_terms"]),
            include_teammates: params
                .first(&["include-teammates", "include_teammates"])
                .map(|value| parse_bool_filter("include-teammates", &value))
                .transpose()?,
            created_after: replay_set.created_after,
            created_before: replay_set.created_before,
            replay_date_after: replay_set.replay_date_after,
            replay_date_before: replay_set.replay_date_before,
            min_rank: replay_set.min_rank,
            max_rank: replay_set.max_rank,
            min_season: replay_set.min_season,
            max_season: replay_set.max_season,
            count: params
                .first(&["count"])
                .map(|value| parse_u32_filter("count", &value))
                .transpose()?,
            group_by: params.first(&["group-by", "group_by"]),
            include_rotation_histogram: params
                .first(&["include-rotation-histogram", "include_rotation_histogram"])
                .map(|value| parse_bool_filter("include-rotation-histogram", &value))
                .transpose()?,
            kickoff_shape: params.first(&["kickoff-shape", "kickoff_shape"]),
            kickoff_side: params.first(&["kickoff-side", "kickoff_side"]),
            materialized: params
                .first(&["materialized"])
                .map(|value| parse_bool_filter("materialized", &value))
                .transpose()?,
            rank_benchmark_window: params
                .first(&["rank-benchmark-window", "rank_benchmark_window"]),
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
    // Per-request `materialized=true|false` overrides the server default, so any
    // view can be run both ways (e.g. live-vs-materialized parity checks).
    let materialized_override = query.materialized;
    let mut filters =
        StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    filters.materialized_stat_counts =
        materialized_override.unwrap_or(state.materialized_stat_counts);
    filters.rank_benchmark_enabled = state.rank_benchmark_enabled;
    filters.rank_benchmark_windows = state.rank_benchmark_windows.clone();
    filters.rank_benchmark_default_window = state.rank_benchmark_default_window.clone();
    super::visibility::enforce_stat_scope_visibility(
        &state,
        db,
        filters.player.as_ref(),
        &filters.replay_set,
        auth_user.as_ref(),
    )
    .await?;
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
    // Per-request `materialized=true|false` overrides the server default, so the
    // boost panel can run live-vs-materialized parity checks.
    let materialized_override = query.materialized;
    let mut filters =
        StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    filters.materialized_stat_counts =
        materialized_override.unwrap_or(state.materialized_stat_counts);
    if filters.player.is_none() {
        return Err(ApiError::bad_request("boost totals require player-id"));
    }
    super::visibility::enforce_stat_scope_visibility(
        &state,
        db,
        filters.player.as_ref(),
        &filters.replay_set,
        auth_user.as_ref(),
    )
    .await?;
    let totals = if filters.materialized_stat_counts {
        load_player_boost_totals_materialized(db, &filters)
            .await
            .map_err(ApiError::internal)?
    } else {
        load_player_boost_totals(db, &filters)
            .await
            .map_err(ApiError::internal)?
    };

    Ok(Json(totals))
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/boost-pad-control",
    tag = "stats",
    params(StatAggregatesQuery),
    responses(
        (status = 200, description = "Lifetime boost pad pickup counts by player/team relationship", body = BoostPadControlResponse),
        (status = 400, description = "Stats filters were invalid or player-id was omitted"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_boost_pad_control(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<BoostPadControlResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let filters = StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    if filters.player.is_none() {
        return Err(ApiError::bad_request(
            "boost pad control requires player-id",
        ));
    }
    super::visibility::enforce_stat_scope_visibility(
        &state,
        db,
        filters.player.as_ref(),
        &filters.replay_set,
        auth_user.as_ref(),
    )
    .await?;
    let response = load_player_boost_pad_control(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(response))
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
    super::visibility::enforce_stat_scope_visibility(
        &state,
        db,
        filters.player.as_ref(),
        &filters.replay_set,
        auth_user.as_ref(),
    )
    .await?;
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
                r.processed_with_event_stream_schema_version AS schema_version,
                r.processed_with_subtr_actor_version AS subtr_actor_version,
                r.processed_with_subtr_actor_git_sha AS subtr_actor_git_sha,
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
                r.processed_with_event_stream_schema_version AS schema_version,
                r.processed_with_subtr_actor_version AS subtr_actor_version,
                r.processed_with_subtr_actor_git_sha AS subtr_actor_git_sha,
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
    // A `group-by=player` request (the replay-group leaderboard) consumes only the
    // per-player `groups`; its top-level base block is discarded by the client. The
    // base stat-count is the live whole-set `play_events` scan -- ~24s over a
    // 500-replay group -- so skip it (and the equally-unused rotation histogram)
    // when grouping by player. Every other grouping still surfaces the base block.
    let is_player_group = matches!(filters.group_by, Some(StatAggregateGroupBy::Player));
    let base_needs_stats = !is_player_group;
    // The base aggregate, the grouped breakdown, and (for player groups) the total
    // participant count are independent, so run them concurrently rather than
    // serializing the (many) underlying queries.
    let (mut aggregates, groups, player_total) = tokio::try_join!(
        load_stat_aggregates_base(
            pool,
            filters,
            base_needs_stats,
            base_needs_stats,
            base_needs_stats
        ),
        load_stat_aggregate_groups(pool, filters),
        async {
            if is_player_group {
                count_stat_group_players(pool, filters).await.map(Some)
            } else {
                Ok(None)
            }
        },
    )?;
    aggregates.groups = groups;
    // `groups` was capped at `PLAYER_GROUP_MAX`; if more players existed, tell the
    // client the leaderboard is partial so it can warn instead of silently
    // dropping the long tail.
    if let Some(total) = player_total {
        if total as usize > PLAYER_GROUP_MAX {
            aggregates.groups_truncated = Some(GroupTruncation {
                limit: PLAYER_GROUP_MAX as u64,
                total,
            });
        }
    }
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

async fn load_player_boost_pad_control(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<BoostPadControlResponse, sqlx::Error> {
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
        boost_pickups AS MATERIALIZED (
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
                appearance.team AS target_team,
                COALESCE(payload.payload->>'pad_type', payload.payload->>'pad_size') AS pad_size,
                COALESCE(payload.payload, '{}'::jsonb) AS payload
            FROM target_appearances appearance
            JOIN play_events event
              ON event.replay_id = appearance.replay_id
             AND event.analysis_run_id = appearance.run_id
            JOIN event_types et
              ON et.id = event.event_type_id
             AND et.key = 'boost_pickup'
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.role = 'actor'
             AND subject.replay_player_id IS NOT NULL
            JOIN replay_players actor ON actor.id = subject.replay_player_id
            LEFT JOIN play_event_payloads payload ON payload.event_id = event.id
        )
        SELECT cohort, target_team, pad_size, payload
        FROM boost_pickups
        WHERE cohort IS NOT NULL
          AND pad_size IN ('big', 'small')
          AND target_team IN (0, 1)
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    let pad_locations = boost_pad_locations();
    let mut counts: HashMap<String, BoostPadControlPointResponse> = pad_locations
        .iter()
        .map(|pad| {
            (
                pad.id.clone(),
                BoostPadControlPointResponse {
                    pad_id: pad.id.clone(),
                    x: pad.x,
                    y: pad.y,
                    pad_size: pad.size.to_owned(),
                    player_count: 0,
                    teammate_count: 0,
                    opponent_count: 0,
                },
            )
        })
        .collect();

    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        let target_team: i32 = row.try_get("target_team")?;
        let pad_size: String = row.try_get("pad_size")?;
        let SqlxJson(payload): SqlxJson<Value> = row.try_get("payload")?;
        let Some(position) = boost_pickup_position(&payload) else {
            continue;
        };
        let position = player_relative_field_position(position, target_team);
        let Some(pad) = nearest_boost_pad(&pad_locations, position, &pad_size) else {
            continue;
        };
        let Some(point) = counts.get_mut(&pad.id) else {
            continue;
        };
        match cohort.as_str() {
            "player" => point.player_count += 1,
            "teammates" => point.teammate_count += 1,
            "opponents" => point.opponent_count += 1,
            _ => {}
        }
    }

    let mut points: Vec<BoostPadControlPointResponse> = counts
        .into_values()
        .filter(|point| point.player_count + point.teammate_count + point.opponent_count > 0)
        .collect();
    points.sort_by(|left, right| {
        left.pad_size
            .cmp(&right.pad_size)
            .then_with(|| left.y.total_cmp(&right.y))
            .then_with(|| left.x.total_cmp(&right.x))
    });

    Ok(BoostPadControlResponse { points })
}

/// Pushes `WITH target_appearances, cohort_rows AS (...)` reconstructing the
/// player / teammates / opponents cohorts from the materialized
/// `player_replay_boost` rows in the target's filtered replays, joined by
/// (replay, team) -- mirrors possession's `push_materialized_possession_cohorts`.
fn push_materialized_boost_cohorts<'a>(
    builder: &mut QueryBuilder<'a, Postgres>,
    filters: &'a StatAggregateFilters,
) {
    let player = filters
        .player
        .as_ref()
        .expect("materialized boost requires player");
    builder.push(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT boost.replay_id, boost.team AS target_team, boost.analysis_run_id AS run_id
            FROM player_replay_boost boost
            JOIN replays r ON r.id = boost.replay_id AND r.canonical_analysis_run_id = boost.analysis_run_id
            WHERE boost.platform = "#,
    );
    builder.push_bind(&player.platform);
    builder.push(" AND boost.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    append_replay_set_filters(builder, &filters.replay_set, "r");
    builder.push(
        r#"
        ),
        cohort_rows AS (
            SELECT 'player'::text AS cohort, boost.*
            FROM target_appearances ta
            JOIN player_replay_boost boost
              ON boost.replay_id = ta.replay_id AND boost.analysis_run_id = ta.run_id
             AND boost.platform = "#,
    );
    builder.push_bind(&player.platform);
    builder.push(" AND boost.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    builder.push(
        r#"
            UNION ALL
            SELECT 'teammates'::text AS cohort, boost.*
            FROM target_appearances ta
            JOIN player_replay_boost boost
              ON boost.replay_id = ta.replay_id AND boost.analysis_run_id = ta.run_id
             AND boost.team = ta.target_team
             AND NOT (boost.platform = "#,
    );
    builder.push_bind(&player.platform);
    builder.push(" AND boost.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    builder.push(
        r#")
            UNION ALL
            SELECT 'opponents'::text AS cohort, boost.*
            FROM target_appearances ta
            JOIN player_replay_boost boost
              ON boost.replay_id = ta.replay_id AND boost.analysis_run_id = ta.run_id
             AND boost.team IS NOT NULL AND ta.target_team IS NOT NULL
             AND boost.team <> ta.target_team
        )
        "#,
    );
}

/// Pushes the per-cohort SUM select over `cohort_rows`. The double-precision
/// sums decode as f64; every bigint pad-count sum is cast `::bigint` (Postgres
/// `SUM(bigint)` returns NUMERIC, which sqlx will not decode as i64).
fn push_materialized_boost_sum_select(builder: &mut QueryBuilder<'_, Postgres>) {
    builder.push(
        r#"
        SELECT
            cohort,
            COALESCE(SUM(boost_collected), 0.0) AS boost_collected,
            COALESCE(SUM(boost_stolen), 0.0) AS boost_stolen,
            COALESCE(SUM(boost_used), 0.0) AS boost_used,
            COALESCE(SUM(boost_used_supersonic), 0.0) AS boost_used_supersonic,
            COALESCE(SUM(boost_overfill), 0.0) AS boost_overfill,
            COALESCE(SUM(boost_amount_weighted_sum), 0.0) AS boost_amount_weighted_sum,
            COALESCE(SUM(tracked_seconds), 0.0) AS tracked_seconds,
            COALESCE(SUM(time_empty), 0.0) AS time_empty,
            COALESCE(SUM(time_low), 0.0) AS time_low,
            COALESCE(SUM(time_medium), 0.0) AS time_medium,
            COALESCE(SUM(time_high), 0.0) AS time_high,
            COALESCE(SUM(time_full), 0.0) AS time_full,
            COALESCE(SUM(time_over), 0.0) AS time_over,
            COALESCE(SUM(boost_collected_big), 0.0) AS boost_collected_big,
            COALESCE(SUM(boost_collected_small), 0.0) AS boost_collected_small,
            COALESCE(SUM(boost_collected_grant), 0.0) AS boost_collected_grant,
            COALESCE(SUM(boost_stolen_big), 0.0) AS boost_stolen_big,
            COALESCE(SUM(boost_stolen_small), 0.0) AS boost_stolen_small,
            COALESCE(SUM(boost_stolen_overfill), 0.0) AS boost_stolen_overfill,
            COALESCE(SUM(big_pads), 0)::bigint AS big_pads,
            COALESCE(SUM(big_pads_offensive), 0)::bigint AS big_pads_offensive,
            COALESCE(SUM(big_pads_neutral), 0)::bigint AS big_pads_neutral,
            COALESCE(SUM(big_pads_defensive), 0)::bigint AS big_pads_defensive,
            COALESCE(SUM(small_pads), 0)::bigint AS small_pads,
            COALESCE(SUM(small_pads_offensive), 0)::bigint AS small_pads_offensive,
            COALESCE(SUM(small_pads_defensive), 0)::bigint AS small_pads_defensive,
            COALESCE(SUM(stolen_big_pads), 0)::bigint AS stolen_big_pads,
            COALESCE(SUM(stolen_small_pads), 0)::bigint AS stolen_small_pads
        FROM cohort_rows
        GROUP BY cohort
        "#,
    );
}

fn build_materialized_boost_query<'a>(
    filters: &'a StatAggregateFilters,
) -> QueryBuilder<'a, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_materialized_boost_cohorts(&mut builder, filters);
    push_materialized_boost_sum_select(&mut builder);
    builder
}

/// Read `player_replay_boost` for the target's filtered replay set and
/// reconstruct the player/teammates/opponents cohorts by (replay, team). Derives
/// `boost_collected_unknown` and `stolen_pads` on read (they are not stored).
async fn load_player_boost_totals_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<PlayerBoostTotalsResponse, sqlx::Error> {
    let mut builder = build_materialized_boost_query(filters);
    let rows = builder.build().fetch_all(pool).await?;
    let mut cohorts: HashMap<String, PlayerBoostTotalResponse> = HashMap::new();
    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        cohorts.insert(cohort, materialized_boost_response_from_row(&row)?);
    }
    let cohort_has_data = |response: &PlayerBoostTotalResponse| -> bool {
        response.tracked_seconds > 0.0
            || response.boost_collected > 0.0
            || response.boost_collected_big > 0.0
            || response.boost_collected_small > 0.0
            || response.boost_collected_grant > 0.0
            || response.boost_stolen > 0.0
            || response.boost_overfill > 0.0
            || response.boost_used > 0.0
            || response.boost_used_supersonic > 0.0
            || response.big_pads > 0
            || response.small_pads > 0
    };
    let player = cohorts
        .remove("player")
        .unwrap_or_else(empty_player_boost_total_response);
    let teammates = cohorts.remove("teammates").filter(cohort_has_data);
    let opponents = cohorts.remove("opponents").filter(cohort_has_data);
    Ok(PlayerBoostTotalsResponse {
        player,
        teammates,
        opponents,
    })
}

fn materialized_boost_response_from_row(
    row: &sqlx::postgres::PgRow,
) -> Result<PlayerBoostTotalResponse, sqlx::Error> {
    let boost_collected: f64 = row.try_get("boost_collected")?;
    let boost_collected_big: f64 = row.try_get("boost_collected_big")?;
    let boost_collected_small: f64 = row.try_get("boost_collected_small")?;
    let boost_collected_grant: f64 = row.try_get("boost_collected_grant")?;
    let known_collected = boost_collected_big + boost_collected_small + boost_collected_grant;
    let boost_collected_unknown = (boost_collected - known_collected).max(0.0);
    let stolen_big_pads = count_column(row, "stolen_big_pads")?;
    let stolen_small_pads = count_column(row, "stolen_small_pads")?;
    Ok(PlayerBoostTotalResponse {
        boost_collected,
        boost_collected_big,
        boost_collected_small,
        boost_collected_grant,
        boost_collected_unknown,
        boost_stolen: row.try_get("boost_stolen")?,
        boost_stolen_big: row.try_get("boost_stolen_big")?,
        boost_stolen_small: row.try_get("boost_stolen_small")?,
        boost_overfill: row.try_get("boost_overfill")?,
        boost_used: row.try_get("boost_used")?,
        boost_used_supersonic: row.try_get("boost_used_supersonic")?,
        boost_stolen_overfill: row.try_get("boost_stolen_overfill")?,
        big_pads: count_column(row, "big_pads")?,
        big_pads_offensive: count_column(row, "big_pads_offensive")?,
        big_pads_neutral: count_column(row, "big_pads_neutral")?,
        big_pads_defensive: count_column(row, "big_pads_defensive")?,
        small_pads: count_column(row, "small_pads")?,
        small_pads_offensive: count_column(row, "small_pads_offensive")?,
        small_pads_defensive: count_column(row, "small_pads_defensive")?,
        stolen_big_pads,
        stolen_small_pads,
        stolen_pads: stolen_big_pads + stolen_small_pads,
        boost_amount_weighted_sum: row.try_get("boost_amount_weighted_sum")?,
        tracked_seconds: row.try_get("tracked_seconds")?,
        time_empty: row.try_get("time_empty")?,
        time_low: row.try_get("time_low")?,
        time_medium: row.try_get("time_medium")?,
        time_high: row.try_get("time_high")?,
        time_full: row.try_get("time_full")?,
        time_over: row.try_get("time_over")?,
    })
}

fn empty_player_boost_total_response() -> PlayerBoostTotalResponse {
    PlayerBoostTotalResponse {
        boost_collected: 0.0,
        boost_collected_big: 0.0,
        boost_collected_small: 0.0,
        boost_collected_grant: 0.0,
        boost_collected_unknown: 0.0,
        boost_stolen: 0.0,
        boost_stolen_big: 0.0,
        boost_stolen_small: 0.0,
        boost_overfill: 0.0,
        boost_used: 0.0,
        boost_used_supersonic: 0.0,
        boost_stolen_overfill: 0.0,
        big_pads: 0,
        big_pads_offensive: 0,
        big_pads_neutral: 0,
        big_pads_defensive: 0,
        small_pads: 0,
        small_pads_offensive: 0,
        small_pads_defensive: 0,
        stolen_big_pads: 0,
        stolen_small_pads: 0,
        stolen_pads: 0,
        boost_amount_weighted_sum: 0.0,
        tracked_seconds: 0.0,
        time_empty: 0.0,
        time_low: 0.0,
        time_medium: 0.0,
        time_high: 0.0,
        time_full: 0.0,
        time_over: 0.0,
    }
}

/// Accumulates one player's boost totals over a replay set (live read) or a
/// single replay (the materialization writer). The track-derived fields
/// (`boost_collected`/`boost_stolen`/`boost_used`/`boost_used_supersonic`/
/// `boost_overfill`/`boost_amount_weighted_sum`/`tracked_seconds`/`bands`) come
/// from [`accumulate_player_boost_track`]; the event-derived fields come from
/// [`PlayerBoostEventAccumulator`]/[`PlayerBoostAccumulator::merge_event_fields`].
#[derive(Default)]
pub(crate) struct PlayerBoostAccumulator {
    pub(crate) boost_collected: f64,
    boost_collected_big: f64,
    boost_collected_small: f64,
    boost_collected_grant: f64,
    pub(crate) boost_stolen: f64,
    boost_stolen_big: f64,
    boost_stolen_small: f64,
    pub(crate) boost_overfill: f64,
    pub(crate) boost_used: f64,
    pub(crate) boost_used_supersonic: f64,
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
    pub(crate) boost_amount_weighted_sum: f64,
    pub(crate) tracked_seconds: f64,
    pub(crate) bands: [f64; 6],
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

/// Replay duration used to time-weight boost-amount samples: the max sample
/// time over all `boost_amount` tracks. Shared by the live read and the
/// materialization writer so both bound the last sample's weight identically.
pub(crate) fn boost_track_replay_duration(tracks: &BoostTracksResponse) -> f64 {
    tracks
        .tracks
        .iter()
        .filter(|track| track.quantity == "boost_amount")
        .flat_map(|track| track.points.iter())
        .filter_map(|point| point.time)
        .fold(0.0_f64, f64::max)
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
    let replay_duration = boost_track_replay_duration(tracks);

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

pub(crate) fn accumulate_player_boost_track(
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

pub(crate) const BOOST_RAW_MAX: f64 = 255.0;

pub(crate) fn boost_raw_to_percent(value: f64) -> f64 {
    value * 100.0 / BOOST_RAW_MAX
}

pub(crate) fn player_boost_band_index(percent: f64) -> usize {
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

/// `all` / `win` / `loss` for the benchmark, mirroring the player-outcome filter.
pub(crate) fn rank_benchmark_outcome_key(filters: &StatAggregateFilters) -> &'static str {
    match filters
        .replay_set
        .player_outcome
        .as_ref()
        .map(|f| &f.outcome)
    {
        Some(ReplayOutcome::Win) => "win",
        Some(ReplayOutcome::Loss) => "loss",
        None => "all",
    }
}

/// The served benchmark window: the request override when it names a configured
/// window, otherwise the server default.
pub(crate) fn resolve_rank_benchmark_window_key(filters: &StatAggregateFilters) -> String {
    if let Some(override_key) = &filters.rank_benchmark_window {
        if filters
            .rank_benchmark_windows
            .iter()
            .any(|window| &window.window_key() == override_key)
        {
            return override_key.clone();
        }
    }
    filters.rank_benchmark_default_window.to_string()
}

/// The viewed player's representative tier: the modal `rank_tier` over their
/// most recent ranked replays in the group, within the served window's bounds.
/// `None` when there is no player, no qualifying ranked replay, or no window
/// metadata (the benchmark has not been materialized yet).
pub(crate) async fn load_player_rank_tier(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
    group_key: &str,
    window_key: &str,
) -> Result<Option<i32>, sqlx::Error> {
    let Some(player) = filters.player.as_ref() else {
        return Ok(None);
    };
    let meta =
        sqlx::query("SELECT window_kind, window_start, season_code FROM rank_benchmark_meta WHERE window_key = $1")
            .bind(window_key)
            .fetch_optional(pool)
            .await?;

    let mut query = QueryBuilder::<Postgres>::new(
        "SELECT rp.rank_tier FROM replay_players rp \
         JOIN replays r ON r.id = rp.replay_id AND r.canonical_analysis_run_id IS NOT NULL \
         WHERE rp.platform = ",
    );
    query.push_bind(&player.platform);
    query.push(" AND rp.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    query.push(" AND rp.rank_tier IS NOT NULL AND ");
    push_playlist_group_key_expression(&mut query, "r");
    query.push(" = ");
    query.push_bind(group_key);
    if let Some(meta) = &meta {
        let kind: String = meta.try_get("window_kind")?;
        if kind == "season" {
            if let Some(code) = meta.try_get::<Option<String>, _>("season_code")? {
                query.push(" AND r.season = ");
                query.push_bind(code);
            }
        } else if let Some(start) = meta.try_get::<Option<DateTime<Utc>>, _>("window_start")? {
            query.push(" AND r.replay_date IS NOT NULL AND r.replay_date >= ");
            query.push_bind(start);
        }
    }
    query.push(" ORDER BY r.replay_date DESC NULLS LAST LIMIT 20");

    let rows = query.build().fetch_all(pool).await?;
    // Modal tier; ties resolve to the most recent (first-seen) tier.
    let mut order: Vec<i32> = Vec::new();
    let mut counts: HashMap<i32, usize> = HashMap::new();
    for row in &rows {
        let tier: i32 = row.try_get("rank_tier")?;
        if !counts.contains_key(&tier) {
            order.push(tier);
        }
        *counts.entry(tier).or_insert(0) += 1;
    }
    let mut best: Option<i32> = None;
    let mut best_count = 0usize;
    for tier in order {
        let count = counts[&tier];
        if count > best_count {
            best_count = count;
            best = Some(tier);
        }
    }
    Ok(best)
}

#[derive(Clone)]
struct BoostPadLocation {
    id: String,
    x: f64,
    y: f64,
    size: &'static str,
}

fn boost_pad_locations() -> Vec<BoostPadLocation> {
    let mut pads = Vec::new();
    mirror_boost_pad_y(&mut pads, 0.0, 4240.0, "small");
    mirror_boost_pad_both(&mut pads, 1792.0, 4184.0, "small");
    mirror_boost_pad_both(&mut pads, 3072.0, 4096.0, "big");
    mirror_boost_pad_both(&mut pads, 940.0, 3308.0, "small");
    mirror_boost_pad_y(&mut pads, 0.0, 2816.0, "small");
    mirror_boost_pad_both(&mut pads, 3584.0, 2484.0, "small");
    mirror_boost_pad_both(&mut pads, 1788.0, 2300.0, "small");
    mirror_boost_pad_both(&mut pads, 2048.0, 1036.0, "small");
    mirror_boost_pad_y(&mut pads, 0.0, 1024.0, "small");
    mirror_boost_pad_x(&mut pads, 3584.0, 0.0, "big");
    mirror_boost_pad_x(&mut pads, 1024.0, 0.0, "small");

    pads
}

fn add_boost_pad(pads: &mut Vec<BoostPadLocation>, x: f64, y: f64, size: &'static str) {
    pads.push(BoostPadLocation {
        id: format!("{size}:{}:{}", x.round(), y.round()),
        x,
        y,
        size,
    });
}

fn mirror_boost_pad_x(pads: &mut Vec<BoostPadLocation>, x: f64, y: f64, size: &'static str) {
    add_boost_pad(pads, -x, y, size);
    add_boost_pad(pads, x, y, size);
}

fn mirror_boost_pad_y(pads: &mut Vec<BoostPadLocation>, x: f64, y: f64, size: &'static str) {
    add_boost_pad(pads, x, -y, size);
    add_boost_pad(pads, x, y, size);
}

fn mirror_boost_pad_both(pads: &mut Vec<BoostPadLocation>, x: f64, y: f64, size: &'static str) {
    mirror_boost_pad_x(pads, x, -y, size);
    mirror_boost_pad_x(pads, x, y, size);
}

fn nearest_boost_pad<'a>(
    pads: &'a [BoostPadLocation],
    position: (f64, f64),
    size: &str,
) -> Option<&'a BoostPadLocation> {
    pads.iter()
        .filter(|pad| pad.size == size)
        .min_by(|left, right| {
            let left_distance = (position.0 - left.x).hypot(position.1 - left.y);
            let right_distance = (position.0 - right.x).hypot(position.1 - right.y);
            left_distance.total_cmp(&right_distance)
        })
}

fn boost_pickup_position(payload: &Value) -> Option<(f64, f64)> {
    let position = payload.get("player_position")?.as_array()?;
    let x = position.first()?.as_f64()?;
    let y = position.get(1)?.as_f64()?;
    (x.is_finite() && y.is_finite()).then_some((x, y))
}

fn player_relative_field_position((x, y): (f64, f64), target_team: i32) -> (f64, f64) {
    match target_team {
        0 => (x, y),
        // Team 1 attacks in the opposite direction. Rotate the field so the
        // profile player's own half is always rendered at negative Y.
        1 => (-x, -y),
        _ => (x, y),
    }
}

async fn load_stat_aggregates_base(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
    include_rotation_histogram: bool,
    include_touch_breakdown: bool,
    include_stat_counts: bool,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    // These queries are independent; run them concurrently against the pool.
    let teammate_fut = async {
        if filters.player.is_some() && filters.include_teammates {
            Ok::<_, sqlx::Error>(Some(load_teammate_denominators(pool, filters).await?))
        } else {
            Ok(None)
        }
    };
    let opponent_fut = async {
        if filters.player.is_some() && filters.include_teammates {
            Ok::<_, sqlx::Error>(Some(load_opponent_denominators(pool, filters).await?))
        } else {
            Ok(None)
        }
    };
    // The rotation histogram is only surfaced on the top-level response, not on
    // per-playlist groups, so skip the (expensive) query when grouping.
    let histogram_fut = async {
        if include_rotation_histogram && filters.include_rotation_histogram {
            load_rotation_duration_histogram(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    // Teammate stint distribution, from the materialized first-man stints. Only
    // served on the materialized path: the live version was a per-event scan over
    // every teammate's rotation stints (with a jsonb attribute join) that
    // dominated the aggregates latency (~15s), so `materialized=false` returns
    // empty rather than resurrecting it.
    let teammate_histogram_fut = async {
        if include_rotation_histogram
            && filters.include_rotation_histogram
            && filters.player.is_some()
            && filters.include_teammates
            && filters.materialized_stat_counts
        {
            load_teammate_rotation_duration_histogram_materialized(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    let opponent_histogram_fut = async {
        if include_rotation_histogram
            && filters.include_rotation_histogram
            && filters.player.is_some()
            && filters.include_teammates
            && filters.materialized_stat_counts
        {
            load_opponent_rotation_duration_histogram_materialized(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    let touch_breakdown_fut = async {
        if include_touch_breakdown
            && filters.player.is_some()
            && filters.include_teammates
            && should_include_touch_breakdown(filters)
        {
            Ok::<_, sqlx::Error>(Some(load_touch_aggregate_breakdown(pool, filters).await?))
        } else {
            Ok(None)
        }
    };
    // The whole-set stat-count is the costliest query in the base (a live
    // `play_events` scan when no player is set). Callers that don't surface the
    // base `stats` -- e.g. the `group-by=player` leaderboard, which reads only the
    // per-player `groups` -- skip it entirely.
    let stat_count_fut = async {
        if include_stat_counts {
            load_stat_count_rows(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    let (
        target_denominators,
        teammate_denominators,
        opponent_denominators,
        rows,
        rotation_duration_histogram,
        teammate_rotation_duration_histogram,
        opponent_rotation_duration_histogram,
        touch_breakdown,
    ) = tokio::try_join!(
        load_target_denominators(pool, filters),
        teammate_fut,
        opponent_fut,
        stat_count_fut,
        histogram_fut,
        teammate_histogram_fut,
        opponent_histogram_fut,
        touch_breakdown_fut,
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
    let opponent_appearance_count = opponent_denominators
        .as_ref()
        .and_then(|denominator| denominator.appearance_count)
        .unwrap_or(0);
    let opponent_active_time_seconds = opponent_denominators
        .as_ref()
        .and_then(|denominator| denominator.active_time_seconds);
    let opponent_non_demo_active_time_seconds = opponent_denominators
        .as_ref()
        .and_then(|denominator| denominator.non_demo_active_time_seconds);
    let opponent_time_most_back_seconds = opponent_denominators
        .as_ref()
        .and_then(|denominator| denominator.time_most_back_seconds);
    let opponent_time_most_forward_seconds = opponent_denominators
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
            opponent_event_count: row.opponent_event_count,
            opponent_appearance_count,
            opponent_count_per_game: (opponent_appearance_count > 0)
                .then(|| row.opponent_event_count as f64 / opponent_appearance_count as f64),
            opponent_per_active_minute: per_minute(
                row.opponent_event_count,
                opponent_active_time_seconds,
            ),
            opponent_per_non_demo_active_minute: per_minute(
                row.opponent_event_count,
                opponent_non_demo_active_time_seconds,
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
        opponent_appearance_count: opponent_denominators
            .as_ref()
            .and_then(|denominator| denominator.appearance_count),
        opponent_active_time_seconds,
        opponent_non_demo_active_time_seconds,
        opponent_time_most_back_seconds,
        opponent_time_most_forward_seconds,
        rotation_duration_bucket_seconds: ROTATION_DURATION_BUCKET_SECONDS,
        rotation_duration_histogram,
        teammate_rotation_duration_histogram,
        opponent_rotation_duration_histogram,
        touch_breakdown,
        stats,
        groups: Vec::new(),
        groups_truncated: None,
    })
}

fn should_include_touch_breakdown(filters: &StatAggregateFilters) -> bool {
    filters.stat_terms.is_empty() || filters.stat_terms.iter().any(|term| term.contains("touch"))
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
        StatAggregateGroupBy::Player => load_player_stat_aggregate_groups(pool, filters).await,
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
        let aggregates =
            load_stat_aggregates_base(pool, &group_filters, false, false, true).await?;
        Ok::<_, sqlx::Error>(StatAggregateGroupResponse {
            group_by: "playlist".to_owned(),
            player: None,
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
            opponent_appearance_count: aggregates.opponent_appearance_count,
            opponent_active_time_seconds: aggregates.opponent_active_time_seconds,
            opponent_non_demo_active_time_seconds: aggregates.opponent_non_demo_active_time_seconds,
            opponent_time_most_back_seconds: aggregates.opponent_time_most_back_seconds,
            opponent_time_most_forward_seconds: aggregates.opponent_time_most_forward_seconds,
            // Win/loss credits a single team, which a playlist grouping doesn't have.
            win_count: None,
            loss_count: None,
            stats: aggregates.stats,
        })
    }))
    .buffered(PLAYLIST_GROUP_CONCURRENCY)
    .try_collect()
    .await
}

pub(crate) async fn load_stat_group_playlists(
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

/// Maximum number of per-player aggregate groups to compute concurrently. Kept
/// in step with `PLAYLIST_GROUP_CONCURRENCY` since each player runs the same
/// base-aggregate fan-out.
const PLAYER_GROUP_CONCURRENCY: usize = 4;

/// Upper bound on the number of players a single `group-by=player` request will
/// expand into. Most curated replay groups are well under this; the cap is a
/// backstop against an unexpectedly large set spawning a base-aggregate fan-out
/// per player. Players are ordered by replay_count DESC, so the most-present
/// players are kept when truncation happens, and the response carries a
/// [`GroupTruncation`] so the client can warn that the leaderboard is partial.
const PLAYER_GROUP_MAX: usize = 256;

#[derive(Debug, Clone)]
struct StatGroupPlayerRow {
    platform: String,
    platform_player_id: String,
    display_name: Option<String>,
}

async fn load_player_stat_aggregate_groups(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    // The leaderboard is rows=players, columns=stats. The materialized path
    // computes it column-wise: one grouped query for per-player denominators plus
    // one grouped `(player, event_type)` scan over `player_replay_event_counts` --
    // two queries total, regardless of player count -- instead of a base-aggregate
    // fan-out per player. Restricting the count scan to the requested `stat_terms`
    // makes "only the displayed columns" a strictly smaller query, so the client
    // can fetch stats a subset at a time. The live path can't be expressed as a
    // single cheap grouped scan, so it keeps the per-player fan-out.
    let mut groups = if filters.materialized_stat_counts && filters.kickoff_spawn.is_empty() {
        load_player_stat_aggregate_groups_materialized(pool, filters).await?
    } else {
        load_player_stat_aggregate_groups_fanout(pool, filters).await?
    };

    // Win/loss is a replay-outcome measure, not an event count, so it lives
    // outside both count paths: one grouped scan over the same replay set, merged
    // onto each player row by the exact enumerated identity. Every player row gets
    // a concrete count (0 when undecided/absent) so `win_rate` is never spuriously
    // null on the client.
    let win_loss = load_player_win_loss_counts(pool, filters).await?;
    for group in &mut groups {
        if let Some(player) = &group.player {
            let key = (player.platform.clone(), player.platform_player_id.clone());
            let (wins, losses) = win_loss.get(&key).copied().unwrap_or((0, 0));
            group.win_count = Some(wins);
            group.loss_count = Some(losses);
        }
    }
    Ok(groups)
}

/// Per-player won / lost replay counts over the filtered set, keyed by the raw
/// `(platform, platform_player_id)` identity (the same column the leaderboard
/// rows are enumerated from, so the merge needs no case normalization). Outcome
/// is decided by final score, mirroring [`append_player_replay_outcome_filter`];
/// score ties count as neither a win nor a loss.
async fn load_player_win_loss_counts(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<HashMap<(String, String), (u64, u64)>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            rp.platform AS platform,
            rp.platform_player_id AS platform_player_id,
            COUNT(DISTINCT rp.replay_id) FILTER (
                WHERE rp.team IS NOT NULL
                  AND r.team_zero_score IS NOT NULL AND r.team_one_score IS NOT NULL
                  AND ((rp.team = 0 AND r.team_zero_score > r.team_one_score)
                    OR (rp.team = 1 AND r.team_one_score > r.team_zero_score))
            ) AS win_count,
            COUNT(DISTINCT rp.replay_id) FILTER (
                WHERE rp.team IS NOT NULL
                  AND r.team_zero_score IS NOT NULL AND r.team_one_score IS NOT NULL
                  AND ((rp.team = 0 AND r.team_zero_score < r.team_one_score)
                    OR (rp.team = 1 AND r.team_one_score < r.team_zero_score))
            ) AS loss_count
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
          AND rp.platform IS NOT NULL
          AND rp.platform_player_id IS NOT NULL
          AND rp.platform_player_id <> ''
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    query.push(" GROUP BY rp.platform, rp.platform_player_id");

    let rows = query.build().fetch_all(pool).await?;
    let mut out = HashMap::with_capacity(rows.len());
    for row in rows {
        let platform: String = row.try_get("platform")?;
        let platform_player_id: String = row.try_get("platform_player_id")?;
        let wins: i64 = row.try_get("win_count")?;
        let losses: i64 = row.try_get("loss_count")?;
        out.insert((platform, platform_player_id), (wins as u64, losses as u64));
    }
    Ok(out)
}

async fn load_player_stat_aggregate_groups_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    // 1) The ordered, capped player list with each player's denominators, in one
    //    grouped scan of `replay_players`.
    let players = load_stat_group_player_denominators(pool, filters).await?;
    if players.is_empty() {
        return Ok(Vec::new());
    }

    // 2) Every `(player, event_type)` count for exactly those players, in one
    //    grouped scan of the materialized counts (narrowed to `stat_terms`).
    let identities: Vec<(String, String)> = players
        .iter()
        .map(|player| (player.platform.clone(), player.platform_player_id.clone()))
        .collect();
    let mut stats_by_player = load_group_player_stat_counts(pool, filters, &identities).await?;
    let limit = filters.limit as usize;

    // 3) Stitch each player's columns onto their denominators. Cohort
    //    (teammate/opponent) comparisons aren't meaningful on a player-vs-player
    //    leaderboard, so those fields stay empty -- matching the fan-out path,
    //    which ran with `include_teammates = false`.
    Ok(players
        .into_iter()
        .map(|player| {
            let key = format!("{}:{}", player.platform, player.platform_player_id);
            let replay_count_divisor = player.replay_count.max(1) as f64;
            let mut rows = stats_by_player
                .remove(&(player.platform.clone(), player.platform_player_id.clone()))
                .unwrap_or_default();
            // Match the fan-out's per-player ordering and cap.
            rows.sort_by(|a, b| {
                b.event_count
                    .cmp(&a.event_count)
                    .then_with(|| a.category.cmp(&b.category))
                    .then_with(|| a.display_name.cmp(&b.display_name))
                    .then_with(|| a.key.cmp(&b.key))
            });
            rows.truncate(limit);
            let stats = rows
                .into_iter()
                .map(|row| StatAggregateResponse {
                    key: row.key,
                    display_name: row.display_name,
                    category: row.category,
                    event_count: row.event_count,
                    count_per_game: row.event_count as f64 / replay_count_divisor,
                    per_active_minute: per_minute(row.event_count, player.active_time_seconds),
                    per_non_demo_active_minute: per_minute(
                        row.event_count,
                        player.non_demo_active_time_seconds,
                    ),
                    teammate_event_count: 0,
                    teammate_appearance_count: 0,
                    teammate_count_per_game: None,
                    teammate_per_active_minute: None,
                    teammate_per_non_demo_active_minute: None,
                    opponent_event_count: 0,
                    opponent_appearance_count: 0,
                    opponent_count_per_game: None,
                    opponent_per_active_minute: None,
                    opponent_per_non_demo_active_minute: None,
                })
                .collect();
            let display_name = player.display_name.clone().unwrap_or_else(|| key.clone());
            StatAggregateGroupResponse {
                group_by: "player".to_owned(),
                player: Some(StatAggregateGroupPlayer {
                    platform: player.platform,
                    platform_player_id: player.platform_player_id,
                    display_name: player.display_name,
                }),
                display_name,
                key,
                replay_count: player.replay_count,
                player_appearance_count: Some(player.appearance_count),
                active_time_seconds: player.active_time_seconds,
                non_demo_active_time_seconds: player.non_demo_active_time_seconds,
                time_most_back_seconds: player.time_most_back_seconds,
                time_most_forward_seconds: player.time_most_forward_seconds,
                teammate_appearance_count: None,
                teammate_active_time_seconds: None,
                teammate_non_demo_active_time_seconds: None,
                teammate_time_most_back_seconds: None,
                teammate_time_most_forward_seconds: None,
                opponent_appearance_count: None,
                opponent_active_time_seconds: None,
                opponent_non_demo_active_time_seconds: None,
                opponent_time_most_back_seconds: None,
                opponent_time_most_forward_seconds: None,
                // Filled in by the dispatcher's path-agnostic win/loss merge.
                win_count: None,
                loss_count: None,
                stats,
            }
        })
        .collect())
}

async fn load_player_stat_aggregate_groups_fanout(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    use futures::stream::{StreamExt, TryStreamExt};

    let players = load_stat_group_players(pool, filters).await?;

    // Compute each player's aggregates concurrently. `buffered` preserves the
    // input ordering (replay_count DESC) while bounding in-flight work.
    futures::stream::iter(players.into_iter().map(|player| async move {
        let mut group_filters = filters.clone();
        group_filters.group_by = None;
        // Each block is that player's own stats within the replay set. Cohort
        // (teammate/opponent) comparisons aren't meaningful on a
        // player-vs-player leaderboard, and skipping them avoids a teammate /
        // opponent query fan-out per player.
        group_filters.include_teammates = false;
        // Exact-match the raw enumerated identity (same column the rows came
        // from) so `rp.platform = $1` matches without case-normalization drift.
        group_filters.player = Some(PlayerStatFilter {
            platform: player.platform.clone(),
            platform_player_id: player.platform_player_id.clone(),
        });
        let aggregates =
            load_stat_aggregates_base(pool, &group_filters, false, false, true).await?;
        let key = format!("{}:{}", player.platform, player.platform_player_id);
        let display_name = player.display_name.clone().unwrap_or_else(|| key.clone());
        Ok::<_, sqlx::Error>(StatAggregateGroupResponse {
            group_by: "player".to_owned(),
            player: Some(StatAggregateGroupPlayer {
                platform: player.platform,
                platform_player_id: player.platform_player_id,
                display_name: player.display_name,
            }),
            display_name,
            key,
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
            opponent_appearance_count: aggregates.opponent_appearance_count,
            opponent_active_time_seconds: aggregates.opponent_active_time_seconds,
            opponent_non_demo_active_time_seconds: aggregates.opponent_non_demo_active_time_seconds,
            opponent_time_most_back_seconds: aggregates.opponent_time_most_back_seconds,
            opponent_time_most_forward_seconds: aggregates.opponent_time_most_forward_seconds,
            // Filled in by the dispatcher's path-agnostic win/loss merge.
            win_count: None,
            loss_count: None,
            stats: aggregates.stats,
        })
    }))
    .buffered(PLAYER_GROUP_CONCURRENCY)
    .try_collect()
    .await
}

/// Count the distinct platform-identified players present in the replay set --
/// the un-capped denominator behind the `PLAYER_GROUP_MAX` truncation, used to
/// tell the client how many players the leaderboard left off. Mirrors the
/// `WHERE` / `GROUP BY` identity of [`load_stat_group_players`] exactly so the
/// total lines up with what would have been enumerated.
async fn count_stat_group_players(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<u64, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT COUNT(*) AS total FROM (
            SELECT 1
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            WHERE r.canonical_analysis_run_id IS NOT NULL
              AND rp.platform IS NOT NULL
              AND rp.platform_player_id IS NOT NULL
              AND rp.platform_player_id <> ''
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    query.push(" GROUP BY rp.platform, rp.platform_player_id) AS players");

    let row = query.build().fetch_one(pool).await?;
    let total: i64 = row.try_get("total")?;
    Ok(total.max(0) as u64)
}

/// Enumerate the distinct platform-identified players present in the replay set,
/// ordered by how many of the set's replays they appear in (most first). Players
/// without a platform id (bots / unresolved) are skipped: the leaderboard keys
/// off `platform:platform_player_id` for chips and drill-down links.
async fn load_stat_group_players(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatGroupPlayerRow>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            rp.platform AS platform,
            rp.platform_player_id AS platform_player_id,
            mode() WITHIN GROUP (ORDER BY rp.name) AS display_name,
            COUNT(DISTINCT rp.replay_id) AS replay_count,
            MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
          AND rp.platform IS NOT NULL
          AND rp.platform_player_id IS NOT NULL
          AND rp.platform_player_id <> ''
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    query.push(
        r#"
        GROUP BY rp.platform, rp.platform_player_id
        ORDER BY replay_count DESC, latest_seen_at DESC NULLS LAST, rp.platform, rp.platform_player_id
        LIMIT "#,
    );
    query.push_bind(PLAYER_GROUP_MAX as i64);

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            Ok(StatGroupPlayerRow {
                platform: row.try_get("platform")?,
                platform_player_id: row.try_get("platform_player_id")?,
                display_name: row.try_get("display_name")?,
            })
        })
        .collect()
}

/// A group player together with the denominators the leaderboard needs to turn
/// raw event counts into per-game / per-minute rates -- all in one grouped scan.
#[derive(Debug, Clone)]
struct StatGroupPlayerDenominators {
    platform: String,
    platform_player_id: String,
    display_name: Option<String>,
    replay_count: u64,
    appearance_count: u64,
    active_time_seconds: Option<f64>,
    non_demo_active_time_seconds: Option<f64>,
    time_most_back_seconds: Option<f64>,
    time_most_forward_seconds: Option<f64>,
}

/// The ordered, capped set of group players plus each one's denominators, in a
/// single `GROUP BY player` scan of `replay_players`. Replaces the per-player
/// `load_stat_group_players` enumeration + one `load_target_denominators` query
/// each for the materialized leaderboard path.
async fn load_stat_group_player_denominators(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatGroupPlayerDenominators>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            rp.platform AS platform,
            rp.platform_player_id AS platform_player_id,
            mode() WITHIN GROUP (ORDER BY rp.name) AS display_name,
            COUNT(DISTINCT rp.replay_id) AS replay_count,
            COUNT(*) AS appearance_count,
            SUM(rp.active_time_seconds) AS active_time_seconds,
            SUM(GREATEST(rp.active_time_seconds - COALESCE(rp.time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
            SUM(rp.time_most_back_seconds) AS time_most_back_seconds,
            SUM(rp.time_most_forward_seconds) AS time_most_forward_seconds,
            MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
          AND rp.platform IS NOT NULL
          AND rp.platform_player_id IS NOT NULL
          AND rp.platform_player_id <> ''
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    query.push(
        r#"
        GROUP BY rp.platform, rp.platform_player_id
        ORDER BY replay_count DESC, latest_seen_at DESC NULLS LAST, rp.platform, rp.platform_player_id
        LIMIT "#,
    );
    query.push_bind(PLAYER_GROUP_MAX as i64);

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            let replay_count: i64 = row.try_get("replay_count")?;
            let appearance_count: i64 = row.try_get("appearance_count")?;
            Ok(StatGroupPlayerDenominators {
                platform: row.try_get("platform")?,
                platform_player_id: row.try_get("platform_player_id")?,
                display_name: row.try_get("display_name")?,
                replay_count: replay_count.max(0) as u64,
                appearance_count: appearance_count.max(0) as u64,
                active_time_seconds: row.try_get("active_time_seconds")?,
                non_demo_active_time_seconds: row.try_get("non_demo_active_time_seconds")?,
                time_most_back_seconds: row.try_get("time_most_back_seconds")?,
                time_most_forward_seconds: row.try_get("time_most_forward_seconds")?,
            })
        })
        .collect()
}

/// Every `(player, event_type)` count for the given players in one grouped scan
/// of the materialized `player_replay_event_counts`, keyed back to the player.
/// Restricted to `filters.stat_terms` so requesting fewer columns is a strictly
/// smaller query.
async fn load_group_player_stat_counts(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
    identities: &[(String, String)],
) -> Result<HashMap<(String, String), Vec<StatCountRow>>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            counts.platform AS platform,
            counts.platform_player_id AS platform_player_id,
            et.key AS key,
            et.display_name AS display_name,
            et.category AS category,
            SUM(counts.event_count) AS event_count
        FROM player_replay_event_counts counts
        JOIN replays r
          ON r.id = counts.replay_id
         AND r.canonical_analysis_run_id = counts.analysis_run_id
        JOIN event_types et ON et.id = counts.event_type_id
        WHERE (counts.platform, counts.platform_player_id) IN ("#,
    );
    for (index, (platform, platform_player_id)) in identities.iter().enumerate() {
        if index > 0 {
            query.push(", ");
        }
        query.push("(");
        query.push_bind(platform);
        query.push(", ");
        query.push_bind(platform_player_id);
        query.push(")");
    }
    query.push(")");
    append_replay_set_filters(&mut query, &filters.replay_set, "r");
    if !filters.stat_terms.is_empty() {
        query.push(" AND (");
        append_stat_term_predicate(&mut query, "et", &filters.stat_terms);
        query.push(")");
    }
    query.push(
        r#"
        GROUP BY counts.platform, counts.platform_player_id, et.key, et.display_name, et.category
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    let mut by_player: HashMap<(String, String), Vec<StatCountRow>> = HashMap::new();
    for row in rows {
        let platform: String = row.try_get("platform")?;
        let platform_player_id: String = row.try_get("platform_player_id")?;
        let event_count: i64 = row.try_get("event_count")?;
        by_player
            .entry((platform, platform_player_id))
            .or_default()
            .push(StatCountRow {
                key: row.try_get("key")?,
                display_name: row.try_get("display_name")?,
                category: row.try_get("category")?,
                event_count: event_count.max(0) as u64,
                teammate_event_count: 0,
                opponent_event_count: 0,
            });
    }
    Ok(by_player)
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

async fn load_opponent_denominators(
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
        opponent_appearances AS (
            SELECT DISTINCT
                opponent.id,
                opponent.replay_id,
                opponent.active_time_seconds,
                opponent.time_demolished_seconds,
                opponent.time_most_back_seconds,
                opponent.time_most_forward_seconds
            FROM target_appearances target
            JOIN replay_players opponent
              ON opponent.replay_id = target.replay_id
             AND opponent.team IS NOT NULL
             AND target.team IS NOT NULL
             AND opponent.team <> target.team
        )
        SELECT
            COUNT(DISTINCT replay_id) AS replay_count,
            COUNT(*) AS appearance_count,
            SUM(active_time_seconds) AS active_time_seconds,
            SUM(GREATEST(active_time_seconds - COALESCE(time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
            SUM(time_most_back_seconds) AS time_most_back_seconds,
            SUM(time_most_forward_seconds) AS time_most_forward_seconds
        FROM opponent_appearances
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

/// Buckets the target player's first-man stint durations from the materialized
/// `player_replay_first_man_stints` table instead of the live rotation-event
/// scan. Mirrors the player branch of `load_rotation_duration_histogram`.
async fn load_rotation_duration_histogram_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let player = filters
        .player
        .as_ref()
        .expect("materialized rotation histogram requires a player");
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT floor(stint.duration_seconds / "#,
    );
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(") * ");
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(
        r#" AS bucket_start_seconds, COUNT(*) AS count
        FROM player_replay_first_man_stints stint
        JOIN replays r
          ON r.id = stint.replay_id
         AND r.canonical_analysis_run_id = stint.analysis_run_id
        WHERE stint.platform = "#,
    );
    query.push_bind(&player.platform);
    query.push(" AND stint.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(
        r#"
        GROUP BY bucket_start_seconds
        ORDER BY bucket_start_seconds
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(rotation_duration_bucket_row_from_db)
        .collect()
}

/// Buckets the target player's teammates' first-man stint durations from the
/// materialized table: the target's (replay, team) appearances joined to
/// co-players' stints in those replays.
async fn load_teammate_rotation_duration_histogram_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let player = filters
        .player
        .as_ref()
        .expect("materialized teammate rotation histogram requires a player");
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT rp.replay_id, rp.team, r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        )
        SELECT floor(stint.duration_seconds / "#,
    );
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(") * ");
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(
        r#" AS bucket_start_seconds, COUNT(*) AS count
        FROM target_appearances appearance
        JOIN player_replay_first_man_stints stint
          ON stint.replay_id = appearance.replay_id
         AND stint.analysis_run_id = appearance.run_id
         AND stint.team = appearance.team
         AND NOT (
            stint.platform = "#,
    );
    query.push_bind(&player.platform);
    query.push(" AND stint.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    query.push(
        r#")
        GROUP BY bucket_start_seconds
        ORDER BY bucket_start_seconds
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(rotation_duration_bucket_row_from_db)
        .collect()
}

async fn load_opponent_rotation_duration_histogram_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT rp.replay_id, rp.team, r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        )
        SELECT floor(stint.duration_seconds / "#,
    );
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(") * ");
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(
        r#" AS bucket_start_seconds, COUNT(*) AS count
        FROM target_appearances appearance
        JOIN player_replay_first_man_stints stint
          ON stint.replay_id = appearance.replay_id
         AND stint.analysis_run_id = appearance.run_id
         AND stint.team IS NOT NULL
         AND appearance.team IS NOT NULL
         AND stint.team <> appearance.team
        GROUP BY bucket_start_seconds
        ORDER BY bucket_start_seconds
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(rotation_duration_bucket_row_from_db)
        .collect()
}

async fn load_rotation_duration_histogram(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    // First-man stint durations are served entirely from the materialized
    // `player_replay_first_man_stints` table. The dense `rotation_role` rows the
    // live histogram used to scan are dropped after materialization, and
    // `rotation_first_man_stint` is a retired stream, so there is no raw-event
    // path to fall back to.
    if filters.player.is_some() {
        return load_rotation_duration_histogram_materialized(pool, filters).await;
    }
    load_rotation_duration_histogram_aggregate_materialized(pool, filters).await
}

/// Buckets every first-man stint across the matched replay set from the
/// materialized `player_replay_first_man_stints` table. This is the aggregate
/// (no-player) counterpart to `load_rotation_duration_histogram_materialized`.
async fn load_rotation_duration_histogram_aggregate_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT floor(stint.duration_seconds / "#,
    );
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(") * ");
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(
        r#" AS bucket_start_seconds, COUNT(*) AS count
        FROM player_replay_first_man_stints stint
        JOIN replays r
          ON r.id = stint.replay_id
         AND r.canonical_analysis_run_id = stint.analysis_run_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(
        r#"
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

#[derive(Debug, Default)]
struct TouchAggregateCohortAccumulator {
    kind_counts: HashMap<String, u64>,
    kind_advance: HashMap<String, f64>,
    category_counts: HashMap<String, u64>,
    category_advance: HashMap<String, f64>,
    location_counts: HashMap<String, u64>,
    location_advance: HashMap<String, f64>,
    active_time_seconds: Option<f64>,
}

impl TouchAggregateCohortAccumulator {
    fn set_active_time_seconds(&mut self, active_time_seconds: Option<f64>) {
        self.active_time_seconds = active_time_seconds;
    }

    fn add(&mut self, dimension: String, value: String, count: u64, advance: f64) {
        let (counts, advances) = match dimension.as_str() {
            "kind" => (&mut self.kind_counts, &mut self.kind_advance),
            "location" => (&mut self.location_counts, &mut self.location_advance),
            _ => (&mut self.category_counts, &mut self.category_advance),
        };
        *counts.entry(value.clone()).or_insert(0) += count;
        *advances.entry(value).or_insert(0.0) += advance.max(0.0);
    }

    fn total_touch_count(&self) -> u64 {
        self.kind_counts.values().sum()
    }

    fn total_advance_distance(&self) -> f64 {
        self.kind_advance.values().sum()
    }

    fn into_response(self, key: &str) -> TouchAggregateCohortResponse {
        let total_touch_count = self.total_touch_count();
        let total_advance_distance = self.total_advance_distance();
        TouchAggregateCohortResponse {
            key: key.to_owned(),
            label: touch_cohort_label(key).to_owned(),
            total_touch_count,
            total_advance_distance,
            active_time_seconds: self.active_time_seconds,
            dimensions: vec![
                TouchAggregateDimensionResponse {
                    key: "kind".to_owned(),
                    values: touch_values_response(self.kind_counts, self.kind_advance),
                },
                TouchAggregateDimensionResponse {
                    key: "category".to_owned(),
                    values: touch_values_response(self.category_counts, self.category_advance),
                },
                TouchAggregateDimensionResponse {
                    key: "location".to_owned(),
                    values: touch_values_response(self.location_counts, self.location_advance),
                },
            ],
        }
    }
}

async fn load_touch_aggregate_breakdown(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<TouchAggregateBreakdownResponse, sqlx::Error> {
    if filters.materialized_stat_counts {
        return load_touch_aggregate_breakdown_materialized(pool, filters).await;
    }

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
              AND r.canonical_analysis_run_id IS NOT NULL
        ),
        touch_events AS MATERIALIZED (
            SELECT
                CASE
                    WHEN actor.id = appearance.id THEN 'player'
                    WHEN actor.team = appearance.team
                     AND actor.id <> appearance.id THEN 'teammates'
                    WHEN actor.team IS NOT NULL
                     AND appearance.team IS NOT NULL
                     AND actor.team <> appearance.team THEN 'opponents'
                    ELSE NULL
                END AS cohort,
                CASE
                    WHEN detail.kind IN ('control', 'medium_hit', 'hard_hit') THEN detail.kind
                    WHEN detail.kind IN ('hit', 'medium') THEN 'medium_hit'
                    WHEN detail.kind = 'hard' THEN 'hard_hit'
                    WHEN detail.kind IN ('soft', 'soft_touch') THEN 'control'
                    ELSE 'other'
                END AS kind,
                CASE
                    WHEN detail.intention IN ('shot', 'pass', 'boom', 'control', 'advance', 'challenge', 'save', 'clear', 'neutral') THEN detail.intention
                    ELSE 'other'
                END AS category,
                CASE
                    WHEN detail.surface = 'wall' THEN 'wall'
                    WHEN detail.surface = 'ground' THEN 'ground'
                    WHEN detail.surface = 'air' AND detail.height_band = 'high_air' THEN 'high_aerial'
                    WHEN detail.surface = 'air' AND detail.height_band = 'low_air' THEN 'aerial'
                    ELSE 'other'
                END AS location,
                COALESCE(GREATEST(detail.advance_distance, 0.0), 0.0) AS advance_distance
            FROM target_appearances appearance
            JOIN play_events event
              ON event.replay_id = appearance.replay_id
             AND event.analysis_run_id = appearance.run_id
             AND event.source_stream = 'touch'
            JOIN play_event_touch_details detail
              ON detail.event_id = event.id
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.role = 'actor'
             AND subject.subject_kind = 'player'
             AND subject.replay_player_id IS NOT NULL
            JOIN replay_players actor ON actor.id = subject.replay_player_id
        ),
        cohort_players AS MATERIALIZED (
            SELECT DISTINCT
                CASE
                    WHEN actor.id = appearance.id THEN 'player'
                    WHEN actor.team = appearance.team
                     AND actor.id <> appearance.id THEN 'teammates'
                    WHEN actor.team IS NOT NULL
                     AND appearance.team IS NOT NULL
                     AND actor.team <> appearance.team THEN 'opponents'
                    ELSE NULL
                END AS cohort,
                actor.id,
                actor.active_time_seconds
            FROM target_appearances appearance
            JOIN replay_players actor
              ON actor.replay_id = appearance.replay_id
        ),
        cohort_denominators AS (
            SELECT
                cohort,
                SUM(active_time_seconds) AS active_time_seconds
            FROM cohort_players
            WHERE cohort IS NOT NULL
            GROUP BY cohort
        ),
        normalized AS (
            SELECT cohort, kind, category, location, advance_distance
            FROM touch_events
            WHERE cohort IS NOT NULL
        )
        SELECT
            rows.cohort,
            rows.dimension,
            rows.value,
            rows.touch_count,
            rows.advance_distance,
            denominator.active_time_seconds
        FROM (
            SELECT
                cohort,
                'kind' AS dimension,
                kind AS value,
                COUNT(*) AS touch_count,
                COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM normalized
            GROUP BY cohort, kind
            UNION ALL
            SELECT
                cohort,
                'category' AS dimension,
                category AS value,
                COUNT(*) AS touch_count,
                COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM normalized
            GROUP BY cohort, category
            UNION ALL
            SELECT
                cohort,
                'location' AS dimension,
                location AS value,
                COUNT(*) AS touch_count,
                COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM normalized
            GROUP BY cohort, location
        ) rows
        LEFT JOIN cohort_denominators denominator
          ON denominator.cohort = rows.cohort
        ORDER BY
            CASE rows.cohort
                WHEN 'player' THEN 0
                WHEN 'teammates' THEN 1
                WHEN 'opponents' THEN 2
                ELSE 3
            END,
            rows.dimension,
            rows.touch_count DESC,
            rows.value
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    touch_aggregate_breakdown_from_rows(rows)
}

async fn load_touch_aggregate_breakdown_materialized(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<TouchAggregateBreakdownResponse, sqlx::Error> {
    let player = filters
        .player
        .as_ref()
        .expect("materialized touch breakdown requires player");
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
            WHERE rp.platform = "#,
    );
    query.push_bind(&player.platform);
    query.push(" AND rp.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    append_replay_filters(&mut query, filters, "r");
    query.push(
        r#"
        ),
        cohort_breakdowns AS MATERIALIZED (
            SELECT 'player'::text AS cohort, touch.dimension, touch.value, touch.touch_count, touch.advance_distance
            FROM target_appearances appearance
            JOIN player_replay_touch_breakdowns touch
              ON touch.replay_id = appearance.replay_id
             AND touch.analysis_run_id = appearance.run_id
             AND touch.platform = "#,
    );
    query.push_bind(&player.platform);
    query.push(" AND touch.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    query.push(
        r#"
            UNION ALL
            SELECT 'teammates'::text AS cohort, touch.dimension, touch.value, touch.touch_count, touch.advance_distance
            FROM target_appearances appearance
            JOIN player_replay_touch_breakdowns touch
              ON touch.replay_id = appearance.replay_id
             AND touch.analysis_run_id = appearance.run_id
             AND touch.team = appearance.team
             AND NOT (touch.platform = "#,
    );
    query.push_bind(&player.platform);
    query.push(" AND touch.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    query.push(
        r#")
            UNION ALL
            SELECT 'opponents'::text AS cohort, touch.dimension, touch.value, touch.touch_count, touch.advance_distance
            FROM target_appearances appearance
            JOIN player_replay_touch_breakdowns touch
              ON touch.replay_id = appearance.replay_id
             AND touch.analysis_run_id = appearance.run_id
             AND touch.team IS NOT NULL
             AND appearance.team IS NOT NULL
             AND touch.team <> appearance.team
        ),
        cohort_players AS MATERIALIZED (
            SELECT DISTINCT
                CASE
                    WHEN actor.id = appearance.id THEN 'player'
                    WHEN actor.team = appearance.team
                     AND actor.id <> appearance.id THEN 'teammates'
                    WHEN actor.team IS NOT NULL
                     AND appearance.team IS NOT NULL
                     AND actor.team <> appearance.team THEN 'opponents'
                    ELSE NULL
                END AS cohort,
                actor.id,
                actor.active_time_seconds
            FROM target_appearances appearance
            JOIN replay_players actor
              ON actor.replay_id = appearance.replay_id
        ),
        cohort_denominators AS (
            SELECT cohort, SUM(active_time_seconds) AS active_time_seconds
            FROM cohort_players
            WHERE cohort IS NOT NULL
            GROUP BY cohort
        )
        SELECT
            rows.cohort,
            rows.dimension,
            rows.value,
            rows.touch_count,
            rows.advance_distance,
            denominator.active_time_seconds
        FROM (
            SELECT
                cohort,
                dimension,
                value,
                SUM(touch_count)::bigint AS touch_count,
                COALESCE(SUM(advance_distance), 0.0) AS advance_distance
            FROM cohort_breakdowns
            GROUP BY cohort, dimension, value
        ) rows
        LEFT JOIN cohort_denominators denominator
          ON denominator.cohort = rows.cohort
        ORDER BY
            CASE rows.cohort
                WHEN 'player' THEN 0
                WHEN 'teammates' THEN 1
                WHEN 'opponents' THEN 2
                ELSE 3
            END,
            rows.dimension,
            rows.touch_count DESC,
            rows.value
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    touch_aggregate_breakdown_from_rows(rows)
}

fn touch_aggregate_breakdown_from_rows(
    rows: Vec<sqlx::postgres::PgRow>,
) -> Result<TouchAggregateBreakdownResponse, sqlx::Error> {
    let mut cohorts: HashMap<String, TouchAggregateCohortAccumulator> = HashMap::new();
    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        let dimension: String = row.try_get("dimension")?;
        let value: String = row.try_get("value")?;
        let touch_count = count_column(&row, "touch_count")?;
        let advance_distance: f64 = row.try_get("advance_distance")?;
        let active_time_seconds = finite_nonnegative(row.try_get("active_time_seconds")?);
        let cohort = cohorts.entry(cohort).or_default();
        cohort.set_active_time_seconds(active_time_seconds);
        cohort.add(dimension, value, touch_count, advance_distance);
    }

    Ok(TouchAggregateBreakdownResponse {
        cohorts: ["player", "teammates", "opponents"]
            .into_iter()
            .filter_map(|key| {
                cohorts
                    .remove(key)
                    .filter(|cohort| cohort.total_touch_count() > 0)
                    .map(|cohort| cohort.into_response(key))
            })
            .collect(),
    })
}

fn touch_values_response(
    counts: HashMap<String, u64>,
    advances: HashMap<String, f64>,
) -> Vec<TouchAggregateValueResponse> {
    let mut values: Vec<_> = counts
        .into_iter()
        .map(|(key, touch_count)| TouchAggregateValueResponse {
            advance_distance: advances.get(&key).copied().unwrap_or(0.0),
            key,
            touch_count,
        })
        .collect();
    values.sort_by(|left, right| {
        right
            .touch_count
            .cmp(&left.touch_count)
            .then_with(|| left.key.cmp(&right.key))
    });
    values
}

fn touch_cohort_label(key: &str) -> &'static str {
    match key {
        "player" => "You",
        "teammates" => "Teammates",
        "opponents" => "Opponents",
        _ => "Unknown",
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
            COUNT(*) AS event_count,
            0::bigint AS teammate_event_count,
            0::bigint AS opponent_event_count
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
        ORDER BY COUNT(*) DESC, et.category, et.display_name, et.key
        LIMIT
        "#,
    );
    query.push_bind(i64::from(filters.limit));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(stat_count_row_from_db).collect()
}

/// Loads per-stat event counts for a single target player (and their teammates).
///
/// Reads the materialized `player_replay_event_counts` table when enabled and
/// usable, falling back to the live `play_event_subjects`/`play_events` scan
/// otherwise. The materialization is gated by `materialized_stat_counts` and
/// cannot serve the `kickoff_spawn` filter -- a per-event-id predicate the
/// per-(player, type) counts cannot reproduce, which the lifetime stats page
/// never sets.
async fn load_player_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    if filters.materialized_stat_counts && filters.kickoff_spawn.is_empty() {
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
            SELECT DISTINCT
                event.id,
                CASE
                    WHEN source_event_type.key = 'demolition' AND subject.role = 'victim'
                        THEN death_event_type.id
                    ELSE event.event_type_id
                END AS event_type_id
            FROM target_appearances appearance
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = appearance.run_id
            JOIN event_types source_event_type
              ON source_event_type.id = event.event_type_id
            JOIN event_types death_event_type
              ON death_event_type.key = 'death'
            "#,
    );
    append_user_facing_stat_event_join_filter(&mut query, "event");
    append_event_kickoff_spawn_filter(&mut query, filters, "event.id");
    query.push(
        r#"
              AND NOT (
                    source_event_type.key = 'demolition'
                    AND subject.role NOT IN ('attacker', 'victim')
                  )
        ),
        target_stats AS (
            SELECT
                et.key,
                et.display_name,
                et.category,
                COUNT(*) AS event_count
            FROM target_events
            JOIN event_types et ON et.id = target_events.event_type_id
            "#,
    );
    append_materialized_stat_term_filter(&mut query, &filters.stat_terms);
    query.push(
        r#"
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
                SELECT DISTINCT
                    event.id,
                    CASE
                        WHEN source_event_type.key = 'demolition' AND subject.role = 'victim'
                            THEN death_event_type.id
                        ELSE event.event_type_id
                    END AS event_type_id
                FROM teammate_appearances appearance
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = appearance.run_id
                JOIN event_types source_event_type
                  ON source_event_type.id = event.event_type_id
                JOIN event_types death_event_type
                  ON death_event_type.key = 'death'
                "#,
        );
        append_user_facing_stat_event_join_filter(&mut query, "event");
        append_event_kickoff_spawn_filter(&mut query, filters, "event.id");
        query.push(
            r#"
                  AND NOT (
                        source_event_type.key = 'demolition'
                        AND subject.role NOT IN ('attacker', 'victim')
                      )
            ),
            teammate_stats AS (
                SELECT
                    et.key,
                    et.display_name,
                    et.category,
                    COUNT(*) AS event_count
                FROM teammate_events
                JOIN event_types et ON et.id = teammate_events.event_type_id
                "#,
        );
        append_materialized_stat_term_filter(&mut query, &filters.stat_terms);
        query.push(
            r#"
                GROUP BY et.key, et.display_name, et.category
            ),
            opponent_appearances AS MATERIALIZED (
                SELECT DISTINCT
                    opponent.id,
                    opponent.replay_id,
                    target.run_id
                FROM target_appearances target
                JOIN replay_players opponent
                  ON opponent.replay_id = target.replay_id
                 AND opponent.team IS NOT NULL
                 AND target.team IS NOT NULL
                 AND opponent.team <> target.team
            ),
            opponent_events AS MATERIALIZED (
                SELECT DISTINCT
                    event.id,
                    CASE
                        WHEN source_event_type.key = 'demolition' AND subject.role = 'victim'
                            THEN death_event_type.id
                        ELSE event.event_type_id
                    END AS event_type_id
                FROM opponent_appearances appearance
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = appearance.run_id
                JOIN event_types source_event_type
                  ON source_event_type.id = event.event_type_id
                JOIN event_types death_event_type
                  ON death_event_type.key = 'death'
                "#,
        );
        append_user_facing_stat_event_join_filter(&mut query, "event");
        append_event_kickoff_spawn_filter(&mut query, filters, "event.id");
        query.push(
            r#"
                  AND NOT (
                        source_event_type.key = 'demolition'
                        AND subject.role NOT IN ('attacker', 'victim')
                      )
            ),
            opponent_stats AS (
                SELECT
                    et.key,
                    et.display_name,
                    et.category,
                    COUNT(*) AS event_count
                FROM opponent_events
                JOIN event_types et ON et.id = opponent_events.event_type_id
                "#,
        );
        append_materialized_stat_term_filter(&mut query, &filters.stat_terms);
        query.push(
            r#"
                GROUP BY et.key, et.display_name, et.category
            ),
            stat_keys AS (
                SELECT key FROM target_stats
                UNION
                SELECT key FROM teammate_stats
                UNION
                SELECT key FROM opponent_stats
            )
            SELECT
                stat_keys.key,
                COALESCE(target_stats.display_name, teammate_stats.display_name, opponent_stats.display_name) AS display_name,
                COALESCE(target_stats.category, teammate_stats.category, opponent_stats.category) AS category,
                COALESCE(target_stats.event_count, 0) AS event_count,
                COALESCE(teammate_stats.event_count, 0) AS teammate_event_count,
                COALESCE(opponent_stats.event_count, 0) AS opponent_event_count
            FROM stat_keys
            LEFT JOIN target_stats ON target_stats.key = stat_keys.key
            LEFT JOIN teammate_stats ON teammate_stats.key = stat_keys.key
            LEFT JOIN opponent_stats ON opponent_stats.key = stat_keys.key
            ORDER BY
                GREATEST(COALESCE(target_stats.event_count, 0), COALESCE(teammate_stats.event_count, 0), COALESCE(opponent_stats.event_count, 0)) DESC,
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
                0::bigint AS teammate_event_count,
                0::bigint AS opponent_event_count
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
        // Co-players sharing the target's replay, split into same-team and
        // opponent cohorts. These are pooled player-appearance totals, so their
        // rates use the pooled cohort active-time denominators loaded above.
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
            ),
            opponent_stats AS (
                SELECT counts.event_type_id, SUM(counts.event_count) AS event_count
                FROM target_appearances appearance
                JOIN player_replay_event_counts counts
                  ON counts.replay_id = appearance.replay_id
                 AND counts.team IS NOT NULL
                 AND appearance.team IS NOT NULL
                 AND counts.team <> appearance.team
                GROUP BY counts.event_type_id
            ),
            stat_ids AS (
                SELECT event_type_id FROM target_stats
                UNION
                SELECT event_type_id FROM teammate_stats
                UNION
                SELECT event_type_id FROM opponent_stats
            )
            SELECT
                et.key,
                et.display_name,
                et.category,
                COALESCE(target_stats.event_count, 0) AS event_count,
                COALESCE(teammate_stats.event_count, 0) AS teammate_event_count,
                COALESCE(opponent_stats.event_count, 0) AS opponent_event_count
            FROM stat_ids
            LEFT JOIN target_stats ON target_stats.event_type_id = stat_ids.event_type_id
            LEFT JOIN teammate_stats ON teammate_stats.event_type_id = stat_ids.event_type_id
            LEFT JOIN opponent_stats ON opponent_stats.event_type_id = stat_ids.event_type_id
            JOIN event_types et ON et.id = stat_ids.event_type_id
            "#,
        );
        append_materialized_stat_term_filter(&mut query, &filters.stat_terms);
        query.push(
            r#"
            ORDER BY
                GREATEST(COALESCE(target_stats.event_count, 0), COALESCE(teammate_stats.event_count, 0), COALESCE(opponent_stats.event_count, 0)) DESC,
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
                0::bigint AS teammate_event_count,
                0::bigint AS opponent_event_count
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
    let opponent_event_count: i64 = row.try_get("opponent_event_count")?;
    Ok(StatCountRow {
        key: row.try_get("key")?,
        display_name: row.try_get("display_name")?,
        category: row.try_get("category")?,
        event_count: event_count.max(0) as u64,
        teammate_event_count: teammate_event_count.max(0) as u64,
        opponent_event_count: opponent_event_count.max(0) as u64,
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
        "player" => Ok(StatAggregateGroupBy::Player),
        _ => Err(ApiError::bad_request(
            "group-by must be one of: playlist, player",
        )),
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
