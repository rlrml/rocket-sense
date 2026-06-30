//! Shared "rank average" benchmark cohorts for the career-stats profile.
//!
//! Career stats compare the viewed player against teammates and opponents; this
//! endpoint adds a third kind of cohort: the per-rank benchmark averages
//! (populated by the refresh job in `crate::processing`, the same data the Rank
//! Trends page charts). Unlike the player-scoped subview endpoints, this returns
//! ONE payload — a `metric_key -> value` map per selected rank — that the web app
//! fetches once and threads into every subview (rate cards, movement, boost,
//! possession, positioning). The benchmark values are stored in the same units
//! each subview computes (per-active-minute rates, `_share` fractions, or raw
//! averages), so a subview only needs to look up its stat's `metric_key`.
//!
//! More than one rank can be requested at once (`rank-benchmark-rank`, repeatable
//! or comma-joined). With no rank requested, the server resolves the viewed
//! player's best-estimate current rank — their modal rank over recent ranked
//! replays in the window — at GROUP granularity by default.

use std::collections::{HashMap, HashSet};

use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use serde::Serialize;
use sqlx::Row;
use utoipa::ToSchema;

use super::query::{parse_i32_filter, QueryParams};
use super::replays::{require_db, ApiError};
use super::stats::{
    load_player_rank_tier, load_stat_group_playlists, rank_benchmark_outcome_key,
    resolve_rank_benchmark_window_key, RankBenchmarkWindowOption, StatAggregateFilters,
    StatAggregatesQuery,
};
use crate::app::AppState;
use crate::auth::OptionalAuthUser;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/rank-benchmark", get(get_rank_benchmark_cohorts))
}

/// Whether the benchmark is keyed by pooled rank groups (Bronze..SSL) or exact
/// division-tiers. Group is the default — its buckets pool three divisions, so
/// samples are denser and the default current-rank estimate lands on solid data.
#[derive(Clone, Copy)]
enum RankGrouping {
    Group,
    Tier,
}

impl RankGrouping {
    fn as_str(self) -> &'static str {
        match self {
            RankGrouping::Group => "group",
            RankGrouping::Tier => "tier",
        }
    }

    fn label(self, rank_value: i32) -> String {
        match self {
            RankGrouping::Group => crate::ranks::rank_group_label(rank_value),
            RankGrouping::Tier => crate::ranks::rank_tier_label(rank_value),
        }
    }

    /// Map a modal tier to the rank value at this grouping (group id when pooled).
    fn rank_value_for_tier(self, tier: i32) -> i32 {
        match self {
            RankGrouping::Group => crate::ranks::rank_group_id(tier),
            RankGrouping::Tier => tier,
        }
    }
}

/// One selectable rank for the multi-select picker, with its sample size so thin
/// buckets can be flagged in the UI.
#[derive(Debug, Serialize, ToSchema)]
pub struct RankBenchmarkRankOption {
    pub rank_value: i32,
    pub label: String,
    pub distinct_player_count: Option<i64>,
}

/// One rank's benchmark value for a single metric. `value` is the aggregator's
/// pick (median for common stats, pooled mean for rare ones), already in the
/// metric's natural units; `aggregator` is carried so the UI can label it.
#[derive(Debug, Serialize, ToSchema)]
pub struct RankBenchmarkCohortStat {
    pub value: Option<f64>,
    pub aggregator: String,
}

/// One selected rank's full benchmark cohort: every materialized metric for the
/// `(window, playlist group, rank, outcome)` cell, keyed by `metric_key`.
#[derive(Debug, Serialize, ToSchema)]
pub struct RankBenchmarkCohort {
    pub rank_value: i32,
    pub label: String,
    pub rank_grouping: String,
    /// True when this cohort is the server-resolved current-rank estimate (no
    /// explicit rank was requested).
    pub is_player_default: bool,
    pub distinct_player_count: Option<i64>,
    pub per_stat: HashMap<String, RankBenchmarkCohortStat>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct RankBenchmarkCohortsResponse {
    pub rank_grouping: String,
    /// Served window key (`rolling-6m`, `season:current`, ...); `None` when no
    /// benchmark is materialized.
    pub window: Option<String>,
    pub window_label: Option<String>,
    /// The single playlist group the cohorts are scoped to; `None` for the
    /// all-playlists view (no single rank ladder to compare to).
    pub playlist_group_key: Option<String>,
    /// The viewed player's best-estimate current rank value at this grouping.
    pub default_rank_value: Option<i32>,
    pub available_ranks: Vec<RankBenchmarkRankOption>,
    pub available_windows: Vec<RankBenchmarkWindowOption>,
    /// One cohort per selected rank, in request order.
    pub cohorts: Vec<RankBenchmarkCohort>,
}

impl RankBenchmarkCohortsResponse {
    fn empty(rank_grouping: &str) -> Self {
        Self {
            rank_grouping: rank_grouping.to_owned(),
            window: None,
            window_label: None,
            playlist_group_key: None,
            default_rank_value: None,
            available_ranks: Vec::new(),
            available_windows: Vec::new(),
            cohorts: Vec::new(),
        }
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/rank-benchmark",
    tag = "stats",
    params(
        ("player-id" = Option<String>, Query, description = "Viewed player, for the current-rank estimate"),
        ("team-size" = Option<String>, Query, description = "Playlist size segment (resolves the rank ladder)"),
        ("game-type" = Option<String>, Query, description = "Competitive context segment"),
        ("rank-benchmark-rank" = Option<String>, Query, description = "Selected rank value(s); repeatable or comma-joined. 'none' selects no ranks. Absent uses the player's estimated rank."),
        ("rank-benchmark-grouping" = Option<String>, Query, description = "group (pooled, default) | tier"),
        ("rank-benchmark-window" = Option<String>, Query, description = "Benchmark window key, e.g. rolling-6m"),
    ),
    responses(
        (status = 200, description = "Per-rank benchmark cohorts for the career comparison", body = RankBenchmarkCohortsResponse),
        (status = 400, description = "Stats filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_rank_benchmark_cohorts(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<RankBenchmarkCohortsResponse>, ApiError> {
    let db = require_db(&state)?;
    let params = QueryParams::from_raw(raw_query.as_deref());

    let grouping = match params
        .first(&["rank-benchmark-grouping", "rank_benchmark_grouping"])
        .as_deref()
        .map(str::trim)
        .unwrap_or("group")
    {
        "tier" => RankGrouping::Tier,
        _ => RankGrouping::Group,
    };

    // `rank-benchmark-rank` is repeatable and/or comma-joined. Absent => use the
    // player default; a literal `none` (or an explicit empty selection) => no
    // cohorts; otherwise the parsed list.
    let raw_ranks = params.values(&["rank-benchmark-rank", "rank_benchmark_rank"]);
    let requested_ranks: Option<Vec<i32>> = if raw_ranks.is_empty() {
        None
    } else {
        let mut values = Vec::new();
        let mut explicit_none = false;
        for raw in &raw_ranks {
            for token in raw.split(',') {
                let token = token.trim();
                if token.is_empty() {
                    continue;
                }
                if token.eq_ignore_ascii_case("none") {
                    explicit_none = true;
                    continue;
                }
                values.push(parse_i32_filter("rank-benchmark-rank", token)?);
            }
        }
        if values.is_empty() && !explicit_none {
            None
        } else {
            Some(values)
        }
    };

    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let mut filters =
        StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    filters.rank_benchmark_enabled = state.rank_benchmark_enabled;
    filters.rank_benchmark_windows = state.rank_benchmark_windows.clone();
    filters.rank_benchmark_default_window = state.rank_benchmark_default_window.clone();

    let response = load_rank_benchmark_cohorts(db, &filters, requested_ranks, grouping)
        .await
        .map_err(ApiError::internal)?;
    Ok(Json(response))
}

async fn load_rank_benchmark_cohorts(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
    requested_ranks: Option<Vec<i32>>,
    grouping: RankGrouping,
) -> Result<RankBenchmarkCohortsResponse, sqlx::Error> {
    let grouping_str = grouping.as_str();
    if !filters.rank_benchmark_enabled {
        return Ok(RankBenchmarkCohortsResponse::empty(grouping_str));
    }

    // The benchmark needs one playlist group to compare against. Use the explicit
    // per-group key when set; otherwise resolve the filtered set's group and only
    // proceed when it collapses to exactly one (the all-playlists view has no
    // single rank ladder).
    let group_key = match filters.replay_set.playlist_group_key.clone() {
        Some(group_key) => group_key,
        None => {
            let mut groups = load_stat_group_playlists(pool, filters).await?;
            if groups.len() == 1 {
                groups.remove(0)
            } else {
                return Ok(RankBenchmarkCohortsResponse::empty(grouping_str));
            }
        }
    };
    let window_key = resolve_rank_benchmark_window_key(filters);
    let outcome = rank_benchmark_outcome_key(filters);

    // Window picker: every configured window, labelled from its meta row.
    let configured_keys: Vec<String> = filters
        .rank_benchmark_windows
        .iter()
        .map(|window| window.window_key())
        .collect();
    let meta_rows = sqlx::query(
        "SELECT window_key, display_label FROM rank_benchmark_meta WHERE window_key = ANY($1)",
    )
    .bind(&configured_keys)
    .fetch_all(pool)
    .await?;
    let mut meta_labels: HashMap<String, String> = HashMap::new();
    for row in &meta_rows {
        meta_labels.insert(row.try_get("window_key")?, row.try_get("display_label")?);
    }
    let available_windows: Vec<RankBenchmarkWindowOption> = filters
        .rank_benchmark_windows
        .iter()
        .map(|window| {
            let key = window.window_key();
            let label = meta_labels
                .get(&key)
                .cloned()
                .unwrap_or_else(|| window.default_label());
            RankBenchmarkWindowOption { key, label }
        })
        .collect();
    let window_label = meta_labels.get(&window_key).cloned();

    // Ranks materialized at this grouping (with sample sizes), for the picker and
    // the per-cohort `distinct_player_count`.
    let population_rows = sqlx::query(
        "SELECT rank_value, distinct_player_count FROM rank_benchmark_population \
         WHERE window_key = $1 AND playlist_group_key = $2 AND outcome = $3 AND rank_grouping = $4 \
         ORDER BY rank_value",
    )
    .bind(&window_key)
    .bind(&group_key)
    .bind(outcome)
    .bind(grouping_str)
    .fetch_all(pool)
    .await?;
    let mut available_ranks = Vec::with_capacity(population_rows.len());
    let mut population_by_rank: HashMap<i32, i64> = HashMap::new();
    for row in &population_rows {
        let rank_value: i32 = row.try_get("rank_value")?;
        // `distinct_player_count` is an INT4 column; decode as i32 and widen
        // rather than asking sqlx for an i64 (which fails with a type mismatch).
        let count: Option<i64> = row
            .try_get::<Option<i32>, _>("distinct_player_count")?
            .map(i64::from);
        if let Some(count) = count {
            population_by_rank.insert(rank_value, count);
        }
        available_ranks.push(RankBenchmarkRankOption {
            rank_value,
            label: grouping.label(rank_value),
            distinct_player_count: count,
        });
    }

    // Default current-rank estimate: the player's modal tier mapped to this
    // grouping. None when there is no player or no qualifying ranked replay.
    let default_rank_value = load_player_rank_tier(pool, filters, &group_key, &window_key)
        .await?
        .map(|tier| grouping.rank_value_for_tier(tier));

    // Selected ranks: the request when present (possibly empty => no cohorts),
    // else the resolved default. De-duplicate while preserving request order.
    let selected_raw: Vec<i32> = match &requested_ranks {
        Some(values) => values.clone(),
        None => default_rank_value.into_iter().collect(),
    };
    let mut seen = HashSet::new();
    let selected: Vec<i32> = selected_raw
        .into_iter()
        .filter(|value| seen.insert(*value))
        .collect();

    // Bulk-load every selected rank's metrics in one query, then bucket by rank.
    let mut per_stat_by_rank: HashMap<i32, HashMap<String, RankBenchmarkCohortStat>> =
        HashMap::new();
    if !selected.is_empty() {
        let stat_rows = sqlx::query(
            "SELECT s.rank_value, s.metric_key, s.aggregator, \
                    CASE WHEN s.aggregator = 'mean' THEN s.mean_per_active_minute ELSE s.median_per_active_minute END AS value \
             FROM rank_benchmark_stats s \
             WHERE s.window_key = $1 AND s.playlist_group_key = $2 AND s.rank_grouping = $3 \
               AND s.outcome = $4 AND s.rank_value = ANY($5)",
        )
        .bind(&window_key)
        .bind(&group_key)
        .bind(grouping_str)
        .bind(outcome)
        .bind(&selected)
        .fetch_all(pool)
        .await?;
        for row in &stat_rows {
            let rank_value: i32 = row.try_get("rank_value")?;
            let metric_key: String = row.try_get("metric_key")?;
            per_stat_by_rank.entry(rank_value).or_default().insert(
                metric_key,
                RankBenchmarkCohortStat {
                    value: row.try_get("value")?,
                    aggregator: row.try_get("aggregator")?,
                },
            );
        }
    }

    let cohorts = selected
        .iter()
        .map(|&rank_value| RankBenchmarkCohort {
            rank_value,
            label: grouping.label(rank_value),
            rank_grouping: grouping_str.to_owned(),
            is_player_default: requested_ranks.is_none() && Some(rank_value) == default_rank_value,
            distinct_player_count: population_by_rank.get(&rank_value).copied(),
            per_stat: per_stat_by_rank.remove(&rank_value).unwrap_or_default(),
        })
        .collect();

    Ok(RankBenchmarkCohortsResponse {
        rank_grouping: grouping_str.to_owned(),
        window: Some(window_key),
        window_label,
        playlist_group_key: Some(group_key),
        default_rank_value,
        available_ranks,
        available_windows,
        cohorts,
    })
}
