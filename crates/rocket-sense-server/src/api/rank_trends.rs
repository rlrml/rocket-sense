//! "Rank Trends": a non-player-scoped view of how every materialized benchmark
//! metric moves across the rank ladder for a playlist group. Reads the
//! `rank_benchmark_*` tables directly (populated by the refresh job in
//! `crate::processing`) and pivots them into metric-vs-rank series for charting.

use std::collections::HashMap;

use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use serde::Serialize;
use sqlx::Row;
use utoipa::ToSchema;

use super::query::QueryParams;
use super::replays::{require_db, ApiError};
use crate::app::AppState;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/rank-trends", get(get_rank_trends))
}

/// One rank bucket on the ladder (a division-tier or a pooled rank group).
#[derive(Debug, Serialize, ToSchema)]
pub struct RankTrendRank {
    /// Tier index (1..22) or pooled rank-group id (0..7), per `rank_grouping`.
    pub rank_value: i32,
    pub label: String,
    pub distinct_player_count: Option<i64>,
}

/// One metric's value at each rank, aligned to the response's `ranks` order.
#[derive(Debug, Serialize, ToSchema)]
pub struct RankTrendMetric {
    pub key: String,
    pub label: String,
    pub category: String,
    /// `"median"` (typical player) or `"mean"` (pooled, for rare metrics).
    pub aggregator: String,
    pub values: Vec<Option<f64>>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct RankTrendsWindow {
    pub key: String,
    pub label: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct RankTrendsResponse {
    pub playlist_group_key: Option<String>,
    pub window: Option<RankTrendsWindow>,
    pub outcome: String,
    pub rank_grouping: String,
    pub ranks: Vec<RankTrendRank>,
    pub metrics: Vec<RankTrendMetric>,
    pub available_playlist_groups: Vec<String>,
    pub available_windows: Vec<RankTrendsWindow>,
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/rank-trends",
    tag = "stats",
    params(
        ("playlist-group" = Option<String>, Query, description = "Playlist group key, e.g. ranked-2v2"),
        ("window" = Option<String>, Query, description = "Benchmark window key, e.g. rolling-6m"),
        ("outcome" = Option<String>, Query, description = "all | win | loss"),
        ("rank-grouping" = Option<String>, Query, description = "group (pooled ranks) | tier (exact tiers)")
    ),
    responses(
        (status = 200, description = "Per-rank benchmark trends", body = RankTrendsResponse),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_rank_trends(
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<RankTrendsResponse>, ApiError> {
    let db = require_db(&state)?;
    let params = QueryParams::from_raw(raw_query.as_deref());
    let outcome = match params
        .first(&["outcome"])
        .as_deref()
        .map(str::trim)
        .unwrap_or("all")
    {
        "win" => "win",
        "loss" => "loss",
        _ => "all",
    };
    let rank_grouping = match params
        .first(&["rank-grouping", "rank_grouping"])
        .as_deref()
        .map(str::trim)
        .unwrap_or("group")
    {
        "tier" => "tier",
        _ => "group",
    };
    let window_override = params.first(&["window"]);
    let group_override = params.first(&["playlist-group", "playlist_group"]);

    let response = load_rank_trends(
        db,
        window_override.as_deref(),
        group_override.as_deref(),
        outcome,
        rank_grouping,
    )
    .await
    .map_err(ApiError::internal)?;
    Ok(Json(response))
}

async fn load_rank_trends(
    pool: &sqlx::PgPool,
    window_override: Option<&str>,
    group_override: Option<&str>,
    outcome: &str,
    rank_grouping: &str,
) -> Result<RankTrendsResponse, sqlx::Error> {
    // Available windows (labelled) from the meta table.
    let meta_rows = sqlx::query(
        "SELECT window_key, display_label FROM rank_benchmark_meta ORDER BY computed_at DESC",
    )
    .fetch_all(pool)
    .await?;
    let available_windows: Vec<RankTrendsWindow> = meta_rows
        .iter()
        .map(|row| {
            Ok(RankTrendsWindow {
                key: row.try_get("window_key")?,
                label: row.try_get("display_label")?,
            })
        })
        .collect::<Result<_, sqlx::Error>>()?;

    let window = window_override
        .and_then(|key| available_windows.iter().find(|w| w.key == key))
        .or_else(|| available_windows.first())
        .cloned();
    let Some(window) = window else {
        // No benchmark materialized yet.
        return Ok(RankTrendsResponse {
            playlist_group_key: None,
            window: None,
            outcome: outcome.to_owned(),
            rank_grouping: rank_grouping.to_owned(),
            ranks: Vec::new(),
            metrics: Vec::new(),
            available_playlist_groups: Vec::new(),
            available_windows,
        });
    };

    // Playlist groups available for this window, densest first.
    let group_rows = sqlx::query(
        "SELECT playlist_group_key, SUM(distinct_player_count) AS players \
         FROM rank_benchmark_population \
         WHERE window_key = $1 AND outcome = 'all' AND rank_grouping = 'group' \
         GROUP BY playlist_group_key ORDER BY players DESC, playlist_group_key",
    )
    .bind(&window.key)
    .fetch_all(pool)
    .await?;
    let available_playlist_groups: Vec<String> = group_rows
        .iter()
        .map(|row| row.try_get("playlist_group_key"))
        .collect::<Result<_, sqlx::Error>>()?;

    let group_key = group_override
        .filter(|key| available_playlist_groups.iter().any(|g| g == key))
        .map(str::to_owned)
        .or_else(|| available_playlist_groups.first().cloned());
    let Some(group_key) = group_key else {
        return Ok(RankTrendsResponse {
            playlist_group_key: None,
            window: Some(window),
            outcome: outcome.to_owned(),
            rank_grouping: rank_grouping.to_owned(),
            ranks: Vec::new(),
            metrics: Vec::new(),
            available_playlist_groups,
            available_windows,
        });
    };

    // Ranks on the ladder (with sample sizes), ascending.
    let pop_rows = sqlx::query(
        "SELECT rank_value, distinct_player_count FROM rank_benchmark_population \
         WHERE window_key = $1 AND playlist_group_key = $2 AND outcome = $3 AND rank_grouping = $4 \
         ORDER BY rank_value",
    )
    .bind(&window.key)
    .bind(&group_key)
    .bind(outcome)
    .bind(rank_grouping)
    .fetch_all(pool)
    .await?;
    let mut ranks = Vec::with_capacity(pop_rows.len());
    let mut rank_index: HashMap<i32, usize> = HashMap::new();
    for (index, row) in pop_rows.iter().enumerate() {
        let rank_value: i32 = row.try_get("rank_value")?;
        rank_index.insert(rank_value, index);
        // `distinct_player_count` is a Postgres `integer` (i32); decode as i32
        // and widen, or sqlx errors at runtime (see PR #199).
        let distinct_player_count: Option<i32> = row.try_get("distinct_player_count")?;
        ranks.push(RankTrendRank {
            rank_value,
            label: rank_label(rank_grouping, rank_value),
            distinct_player_count: distinct_player_count.map(i64::from),
        });
    }

    // Event-type display names + categories for labelling event metrics.
    let event_type_rows = sqlx::query("SELECT key, display_name, category FROM event_types")
        .fetch_all(pool)
        .await?;
    let mut event_types: HashMap<String, (String, String)> = HashMap::new();
    for row in &event_type_rows {
        let key: String = row.try_get("key")?;
        event_types.insert(
            key,
            (row.try_get("display_name")?, row.try_get("category")?),
        );
    }

    // Stats across all ranks; pivot into metric -> values[rank].
    let stat_rows = sqlx::query(
        "SELECT metric_key, rank_value, aggregator, \
                CASE WHEN aggregator = 'mean' THEN mean_per_active_minute ELSE median_per_active_minute END AS value \
         FROM rank_benchmark_stats \
         WHERE window_key = $1 AND playlist_group_key = $2 AND outcome = $3 AND rank_grouping = $4",
    )
    .bind(&window.key)
    .bind(&group_key)
    .bind(outcome)
    .bind(rank_grouping)
    .fetch_all(pool)
    .await?;

    let mut metrics: HashMap<String, RankTrendMetric> = HashMap::new();
    for row in &stat_rows {
        let metric_key: String = row.try_get("metric_key")?;
        let rank_value: i32 = row.try_get("rank_value")?;
        let Some(&index) = rank_index.get(&rank_value) else {
            continue;
        };
        let entry = metrics.entry(metric_key.clone()).or_insert_with(|| {
            let (label, category) = metric_label_category(&metric_key, &event_types);
            RankTrendMetric {
                key: metric_key.clone(),
                label,
                category,
                aggregator: "median".to_owned(),
                values: vec![None; ranks.len()],
            }
        });
        entry.aggregator = row.try_get("aggregator")?;
        entry.values[index] = row.try_get("value")?;
    }

    let mut metrics: Vec<RankTrendMetric> = metrics.into_values().collect();
    metrics.sort_by(|a, b| {
        a.category
            .cmp(&b.category)
            .then_with(|| a.label.cmp(&b.label))
    });

    Ok(RankTrendsResponse {
        playlist_group_key: Some(group_key),
        window: Some(window),
        outcome: outcome.to_owned(),
        rank_grouping: rank_grouping.to_owned(),
        ranks,
        metrics,
        available_playlist_groups,
        available_windows,
    })
}

fn rank_label(rank_grouping: &str, rank_value: i32) -> String {
    if rank_grouping == "group" {
        crate::ranks::rank_group_label(rank_value)
    } else {
        crate::ranks::rank_tier_label(rank_value)
    }
}

/// Display label + category for a metric key. Event metrics use their
/// `event_types` display name/category; prefixed metrics (`boost:collected`,
/// `movement:avg_speed`, ...) use the prefix as the category and a humanized
/// suffix as the label.
fn metric_label_category(
    key: &str,
    event_types: &HashMap<String, (String, String)>,
) -> (String, String) {
    if let Some((display, category)) = event_types.get(key) {
        return (display.clone(), category.clone());
    }
    // Goal flavors: `goaltag:high_aerial_goal` -> "High Aerial Goal" in "goals".
    if let Some(kind) = key.strip_prefix("goaltag:") {
        return (humanize(kind), "goals".to_owned());
    }
    if let Some((prefix, suffix)) = key.split_once(':') {
        return (humanize(suffix), prefix.to_owned());
    }
    (humanize(key), "other".to_owned())
}

fn humanize(value: &str) -> String {
    value
        .split(['_', '-'])
        .filter(|word| !word.is_empty())
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                Some(first) => first.to_uppercase().collect::<String>() + chars.as_str(),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}
