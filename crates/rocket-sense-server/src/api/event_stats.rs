use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{
    extract::{Path, RawQuery, State},
    http::StatusCode,
    routing::get,
    Json, Router,
};
use serde::Serialize;
use serde_json::{json, Value};
use sqlx::{Postgres, QueryBuilder, Row};
use std::cmp::Ordering;
use std::collections::{BTreeMap, HashMap};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    query::{parse_bool_filter, parse_u32_filter, QueryParams},
    replay_set::{PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters},
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "event_stats_tests.rs"]
mod tests;

const DEFAULT_SAMPLE_COUNT: u32 = 25;
const MAX_SAMPLE_COUNT: u32 = 100;
const DEFAULT_DIMENSION_LIMIT: u32 = 25;
const MAX_DIMENSION_LIMIT: u32 = 100;
const KICKOFF_GOALS_FOR_SUMMARY_SQL: &str =
    "COUNT(*) FILTER (WHERE kickoff.kickoff_goal AND kickoff.scoring_team = detail.team) AS kickoff_goals_for";
const KICKOFF_GOALS_AGAINST_SUMMARY_SQL: &str =
    "COUNT(*) FILTER (WHERE kickoff.kickoff_goal AND kickoff.scoring_team IS NOT NULL AND kickoff.scoring_team <> detail.team) AS kickoff_goals_against";
const KICKOFF_FIRST_TOUCH_SUMMARY_SQL: &str = r#"
            COUNT(*) FILTER (
                WHERE EXISTS (
                    SELECT 1
                    FROM play_event_kickoff_player_details first_touch_taker
                    WHERE first_touch_taker.event_id = detail.event_id
                      AND first_touch_taker.team = detail.team
                      AND first_touch_taker.role = 'taker'
                      AND first_touch_taker.player_subject_id = kickoff.first_touch_subject_id
                )
            ) AS first_touch_count"#;
const KICKOFF_TAKER_BOOST_USED_SUMMARY_SQL: &str = r#"
            AVG(
                COALESCE(
                    detail.boost_used,
                    (
                        SELECT (
                            payload.payload -> CASE detail.team
                                WHEN 0 THEN 'team_zero_taker'
                                ELSE 'team_one_taker'
                            END
                        ) ->> 'boost_used'
                        FROM play_event_payloads payload
                        WHERE payload.event_id = detail.event_id
                    )::double precision
                )
            ) FILTER (WHERE detail.role = 'taker') AS avg_boost_used"#;
const KICKOFF_TYPE_DIMENSION_SQL: &str = r#"
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM play_event_kickoff_player_details taker
                    WHERE taker.event_id = detail.event_id
                      AND taker.role = 'taker'
                      AND taker.spawn_position LIKE 'diagonal_%'
                )
                    THEN 'diagonal'
                WHEN EXISTS (
                    SELECT 1
                    FROM play_event_kickoff_player_details taker
                    WHERE taker.event_id = detail.event_id
                      AND taker.role = 'taker'
                      AND taker.spawn_position LIKE 'off_center_%'
                )
                    THEN 'center_offset'
                WHEN EXISTS (
                    SELECT 1
                    FROM play_event_kickoff_player_details taker
                    WHERE taker.event_id = detail.event_id
                      AND taker.role = 'taker'
                      AND taker.spawn_position = 'center'
                )
                    THEN 'center'
                ELSE NULL
            END"#;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/stats/events/{family}/summary",
        get(get_event_stat_summary),
    )
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventStatSummaryResponse {
    pub family: String,
    pub replay_count: u64,
    pub event_count: u64,
    pub row_count: u64,
    pub metrics: Vec<EventStatMetricResponse>,
    pub dimensions: Vec<EventStatDimensionResponse>,
    pub samples: Vec<EventStatSampleResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventStatMetricResponse {
    pub key: String,
    pub label: String,
    pub value: Option<f64>,
    pub kind: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventStatDimensionResponse {
    pub key: String,
    pub label: String,
    pub values: Vec<EventStatDimensionValueResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventStatDimensionValueResponse {
    pub key: Option<String>,
    pub display_name: String,
    pub count: u64,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventStatSampleResponse {
    pub replay_id: Uuid,
    pub event_id: Uuid,
    pub replay_player_id: Option<Uuid>,
    pub player_subject_id: Option<String>,
    pub event_time: Option<f64>,
    pub role: Option<String>,
    pub team: Option<i32>,
    pub fields: BTreeMap<String, Value>,
}

#[derive(Debug)]
struct EventStatsQuery {
    replay_set: ReplaySetFilters,
    player: Option<PlayerStatFilter>,
    role: Option<String>,
    kickoff_spawn: KickoffSpawnFilter,
    sample_count: u32,
    dimension_limit: u32,
    include_samples: bool,
    materialized: bool,
}

#[derive(Debug, Clone, Copy)]
struct EventStatsAdapter {
    family: &'static str,
    base_table: &'static str,
    base_alias: &'static str,
    event_detail_join: Option<&'static str>,
    player_subject_column: &'static str,
    role_column: Option<&'static str>,
    dimensions: &'static [EventStatsDimension],
}

#[derive(Debug, Clone, Copy)]
struct EventStatsDimension {
    key: &'static str,
    label: &'static str,
    expression: &'static str,
}

#[derive(Debug)]
struct KickoffSummaryRow {
    replay_count: u64,
    event_count: u64,
    row_count: u64,
    taker_count: u64,
    support_count: u64,
    touched_count: u64,
    first_touch_count: u64,
    missed_count: u64,
    fake_count: u64,
    win_count: u64,
    loss_count: u64,
    neutral_count: u64,
    kickoff_goals_for: u64,
    kickoff_goals_against: u64,
    advantages_for: u64,
    advantages_against: u64,
    no_advantage_count: u64,
    avg_taker_time_to_touch: Option<f64>,
    avg_boost_after: Option<f64>,
    avg_boost_used: Option<f64>,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub(crate) struct KickoffSpawnFilter {
    pub(crate) shape: Option<KickoffSpawnShape>,
    pub(crate) side: Option<KickoffSpawnSide>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum KickoffSpawnShape {
    Diagonal,
    CenterOffset,
    Center,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum KickoffSpawnSide {
    Left,
    Right,
}

impl KickoffSpawnFilter {
    pub(crate) fn from_query_params(params: &QueryParams) -> Result<Self, ApiError> {
        Self::from_values(
            params.first(&["kickoff-shape", "kickoff_shape"]),
            params.first(&["kickoff-side", "kickoff_side"]),
        )
    }

    pub(crate) fn from_values(
        shape: Option<String>,
        side: Option<String>,
    ) -> Result<Self, ApiError> {
        Ok(Self {
            shape: shape
                .as_deref()
                .filter(|value| !is_all_filter_value(value))
                .map(parse_kickoff_spawn_shape)
                .transpose()?,
            side: side
                .as_deref()
                .filter(|value| !is_all_filter_value(value))
                .map(parse_kickoff_spawn_side)
                .transpose()?,
        })
    }

    pub(crate) fn is_empty(&self) -> bool {
        self.shape.is_none() && self.side.is_none()
    }

    pub(crate) fn spawn_positions(&self) -> Vec<&'static str> {
        const ALL: &[&str] = &[
            "diagonal_left",
            "diagonal_right",
            "off_center_left",
            "off_center_right",
            "center",
        ];
        ALL.iter()
            .copied()
            .filter(|spawn| self.matches_spawn(spawn))
            .collect()
    }

    fn matches_spawn(&self, spawn: &str) -> bool {
        let shape_matches = match self.shape {
            Some(KickoffSpawnShape::Diagonal) => spawn.starts_with("diagonal_"),
            Some(KickoffSpawnShape::CenterOffset) => spawn.starts_with("off_center_"),
            Some(KickoffSpawnShape::Center) => spawn == "center",
            None => true,
        };
        let side_matches = match self.side {
            Some(KickoffSpawnSide::Left) => spawn.ends_with("_left"),
            Some(KickoffSpawnSide::Right) => spawn.ends_with("_right"),
            None => true,
        };
        shape_matches && side_matches
    }
}

fn is_all_filter_value(value: &str) -> bool {
    matches!(value.trim().to_ascii_lowercase().as_str(), "" | "all")
}

fn parse_kickoff_spawn_shape(value: &str) -> Result<KickoffSpawnShape, ApiError> {
    match value.trim().to_ascii_lowercase().as_str() {
        "diagonal" => Ok(KickoffSpawnShape::Diagonal),
        "center_offset" | "center-offset" | "off_center" | "off-center" => {
            Ok(KickoffSpawnShape::CenterOffset)
        }
        "center" => Ok(KickoffSpawnShape::Center),
        _ => Err(ApiError::bad_request(
            "kickoff-shape must be diagonal, center_offset, or center",
        )),
    }
}

fn parse_kickoff_spawn_side(value: &str) -> Result<KickoffSpawnSide, ApiError> {
    match value.trim().to_ascii_lowercase().as_str() {
        "left" => Ok(KickoffSpawnSide::Left),
        "right" => Ok(KickoffSpawnSide::Right),
        _ => Err(ApiError::bad_request("kickoff-side must be left or right")),
    }
}

const KICKOFF_DIMENSIONS: &[EventStatsDimension] = &[
    EventStatsDimension {
        key: "role",
        label: "Role",
        expression: "detail.role",
    },
    EventStatsDimension {
        key: "kickoff_type",
        label: "Kickoff type",
        expression: KICKOFF_TYPE_DIMENSION_SQL,
    },
    EventStatsDimension {
        key: "spawn_position",
        label: "Spawn position",
        expression: "detail.spawn_position",
    },
    EventStatsDimension {
        key: "approach",
        label: "Approach",
        expression: "detail.approach",
    },
    EventStatsDimension {
        key: "taker_outcome",
        label: "Taker outcome",
        expression: "detail.taker_outcome",
    },
    EventStatsDimension {
        key: "support_behavior",
        label: "Approach",
        expression: "detail.support_behavior",
    },
    EventStatsDimension {
        key: "kickoff_outcome",
        label: "Kickoff outcome",
        expression: "kickoff.outcome",
    },
    EventStatsDimension {
        key: "player_result",
        label: "Player result",
        expression: "CASE WHEN kickoff.winning_team IS NULL THEN 'neutral' WHEN kickoff.winning_team = detail.team THEN 'win' ELSE 'loss' END",
    },
    EventStatsDimension {
        key: "win_strength_result",
        label: "Win strength",
        expression: "CASE WHEN kickoff.winning_team IS NULL THEN 'neutral' WHEN kickoff.winning_team = detail.team THEN concat('win_', COALESCE(kickoff.win_strength_band, 'unknown')) ELSE concat('loss_', COALESCE(kickoff.win_strength_band, 'unknown')) END",
    },
    // Player-relative kickoff advantage: who the kickoff ended up being good
    // for (possession run, established pressure, or kickoff goal) and whether
    // that was this player's team, e.g. `won_possession` / `lost_pressure`.
    // NULL (pre-advantage analysis runs) is distinct from `no_advantage`.
    EventStatsDimension {
        key: "advantage_result",
        label: "Advantage",
        expression: "CASE WHEN kickoff.advantage IS NULL THEN NULL WHEN kickoff.advantage_team IS NULL THEN kickoff.advantage ELSE concat(CASE WHEN kickoff.advantage_team = detail.team THEN 'won_' ELSE 'lost_' END, regexp_replace(kickoff.advantage, '^team_(zero|one)_', '')) END",
    },
];

const KICKOFF_ADAPTER: EventStatsAdapter = EventStatsAdapter {
    family: "kickoff",
    base_table: "play_event_kickoff_player_details",
    base_alias: "detail",
    event_detail_join: Some(
        "JOIN play_event_kickoff_details kickoff ON kickoff.event_id = detail.event_id",
    ),
    player_subject_column: "detail.player_subject_id",
    role_column: Some("detail.role"),
    dimensions: KICKOFF_DIMENSIONS,
};

#[utoipa::path(
    get,
    path = "/api/v1/stats/events/{family}/summary",
    tag = "stats",
    responses(
        (status = 200, description = "Summarize an indexed event family over a replay set", body = EventStatSummaryResponse),
        (status = 400, description = "Event stat filters were invalid"),
        (status = 404, description = "Unknown event stat family"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_event_stat_summary(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    Path(family): Path<String>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<EventStatSummaryResponse>, ApiError> {
    let db = require_db(&state)?;
    let adapter = event_stats_adapter(&family)?;
    let query = EventStatsQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
        state.materialized_stat_counts,
    )?;
    let response = load_event_stat_summary(db, adapter, &query)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(response))
}

fn event_stats_adapter(family: &str) -> Result<&'static EventStatsAdapter, ApiError> {
    match family.trim().to_ascii_lowercase().as_str() {
        "kickoff" | "kickoffs" => Ok(&KICKOFF_ADAPTER),
        _ => Err(ApiError::new(
            StatusCode::NOT_FOUND,
            "unknown event stat family",
        )),
    }
}

impl EventStatsQuery {
    fn from_raw_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
        materialized_default: bool,
    ) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let replay_set_input = ReplaySetFilterInput::from_query_params(&params)?;
        let replay_set = ReplaySetFilters::from_input(replay_set_input, auth_user_id)?;
        let sample_count = params
            .first(&["sample-count", "sample_count", "count"])
            .map(|value| parse_u32_filter("sample-count", &value))
            .transpose()?
            .unwrap_or(DEFAULT_SAMPLE_COUNT)
            .clamp(0, MAX_SAMPLE_COUNT);
        let dimension_limit = params
            .first(&["dimension-limit", "dimension_limit"])
            .map(|value| parse_u32_filter("dimension-limit", &value))
            .transpose()?
            .unwrap_or(DEFAULT_DIMENSION_LIMIT)
            .clamp(1, MAX_DIMENSION_LIMIT);

        Ok(Self {
            replay_set,
            player: params
                .first(&["player-id", "player_id"])
                .map(|player_id| PlayerStatFilter::from_query(&player_id))
                .transpose()?,
            role: params
                .first(&["role"])
                .map(|role| role.trim().to_ascii_lowercase())
                .filter(|role| !role.is_empty()),
            kickoff_spawn: KickoffSpawnFilter::from_query_params(&params)?,
            sample_count,
            dimension_limit,
            include_samples: params
                .first(&["include-samples", "include_samples"])
                .map(|value| parse_bool_filter("include-samples", &value))
                .transpose()?
                .unwrap_or(true),
            materialized: params
                .first(&["materialized"])
                .map(|value| parse_bool_filter("materialized", &value))
                .transpose()?
                .unwrap_or(materialized_default),
        })
    }
}

async fn load_event_stat_summary(
    pool: &sqlx::PgPool,
    adapter: &EventStatsAdapter,
    filters: &EventStatsQuery,
) -> Result<EventStatSummaryResponse, sqlx::Error> {
    let (summary, dimensions) = if filters.materialized && filters.player.is_some() {
        load_kickoff_materialized(pool, filters).await?
    } else {
        let summary = load_kickoff_summary(pool, adapter, filters).await?;
        let dimensions = load_event_stat_dimensions(pool, adapter, filters).await?;
        (summary, dimensions)
    };
    let samples = if filters.include_samples && filters.sample_count > 0 {
        load_event_stat_samples(pool, adapter, filters).await?
    } else {
        Vec::new()
    };

    Ok(EventStatSummaryResponse {
        family: adapter.family.to_owned(),
        replay_count: summary.replay_count,
        event_count: summary.event_count,
        row_count: summary.row_count,
        metrics: kickoff_metrics(summary),
        dimensions,
        samples,
    })
}

async fn load_kickoff_summary(
    pool: &sqlx::PgPool,
    adapter: &EventStatsAdapter,
    filters: &EventStatsQuery,
) -> Result<KickoffSummaryRow, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            COUNT(DISTINCT r.id) AS replay_count,
            COUNT(DISTINCT detail.event_id) AS event_count,
            COUNT(*) AS row_count,
            COUNT(*) FILTER (WHERE detail.role = 'taker') AS taker_count,
            COUNT(*) FILTER (WHERE detail.role = 'support') AS support_count,
            COUNT(*) FILTER (WHERE detail.taker_outcome = 'touched') AS touched_count,
        "#,
    );
    query.push(KICKOFF_FIRST_TOUCH_SUMMARY_SQL);
    query.push(
        r#",
            COUNT(*) FILTER (WHERE detail.taker_outcome = 'missed') AS missed_count,
            COUNT(*) FILTER (WHERE detail.taker_outcome = 'fake') AS fake_count,
            COUNT(*) FILTER (WHERE kickoff.winning_team = detail.team) AS win_count,
            COUNT(*) FILTER (WHERE kickoff.winning_team IS NOT NULL AND kickoff.winning_team <> detail.team) AS loss_count,
            COUNT(*) FILTER (WHERE kickoff.winning_team IS NULL) AS neutral_count,
        "#,
    );
    query.push(KICKOFF_GOALS_FOR_SUMMARY_SQL);
    query.push(",\n            ");
    query.push(KICKOFF_GOALS_AGAINST_SUMMARY_SQL);
    query.push(
        r#",
            COUNT(*) FILTER (WHERE kickoff.advantage_team = detail.team) AS advantages_for,
            COUNT(*) FILTER (WHERE kickoff.advantage_team IS NOT NULL AND kickoff.advantage_team <> detail.team) AS advantages_against,
            COUNT(*) FILTER (WHERE kickoff.advantage = 'no_advantage') AS no_advantage_count,
            -- time_to_ball is subtr-actor's duration from movement start to the
            -- taker's first touch (countdown excluded). Taker-scoped and
            -- touch-conditional: misses have no finite time-to-touch and support
            -- touches are a different distribution (see docs/stats-principles.md §2).
            AVG(detail.time_to_ball) FILTER (
                WHERE detail.role = 'taker'
                  AND detail.time_to_ball IS NOT NULL
            ) AS avg_taker_time_to_touch,
            AVG(detail.boost_after) FILTER (WHERE detail.boost_after IS NOT NULL) AS avg_boost_after,
        "#,
    );
    query.push(KICKOFF_TAKER_BOOST_USED_SUMMARY_SQL);
    push_event_stats_from(&mut query, adapter);
    push_event_stats_filters(&mut query, adapter, filters);

    let row = query.build().fetch_one(pool).await?;
    Ok(KickoffSummaryRow {
        replay_count: count_column(&row, "replay_count")?,
        event_count: count_column(&row, "event_count")?,
        row_count: count_column(&row, "row_count")?,
        taker_count: count_column(&row, "taker_count")?,
        support_count: count_column(&row, "support_count")?,
        touched_count: count_column(&row, "touched_count")?,
        first_touch_count: count_column(&row, "first_touch_count")?,
        missed_count: count_column(&row, "missed_count")?,
        fake_count: count_column(&row, "fake_count")?,
        win_count: count_column(&row, "win_count")?,
        loss_count: count_column(&row, "loss_count")?,
        neutral_count: count_column(&row, "neutral_count")?,
        kickoff_goals_for: count_column(&row, "kickoff_goals_for")?,
        kickoff_goals_against: count_column(&row, "kickoff_goals_against")?,
        advantages_for: count_column(&row, "advantages_for")?,
        advantages_against: count_column(&row, "advantages_against")?,
        no_advantage_count: count_column(&row, "no_advantage_count")?,
        avg_taker_time_to_touch: finite_value(row.try_get("avg_taker_time_to_touch")?),
        avg_boost_after: finite_value(row.try_get("avg_boost_after")?),
        avg_boost_used: finite_value(row.try_get("avg_boost_used")?),
    })
}

// Materialized kickoff read: fetch this player's pre-aggregated per-(replay,
// role, event-taker-spawn-set) rows from `player_replay_kickoff` and reconstruct
// the same summary + dimension responses the live scans produce, applying the
// replay-set / role / spawn filters at read time so every filter change still
// re-aggregates from the stored rows. Only valid when a player filter is set.
async fn load_kickoff_materialized(
    pool: &sqlx::PgPool,
    filters: &EventStatsQuery,
) -> Result<(KickoffSummaryRow, Vec<EventStatDimensionResponse>), sqlx::Error> {
    let player = filters
        .player
        .as_ref()
        .expect("materialized kickoff read requires a player filter");
    let player_subject_id = format!("{}:{}", player.platform, player.platform_player_id);

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            k.replay_id,
            k.role,
            k.team,
            k.taker_spawns,
            k.row_count,
            k.touched_count,
            k.first_touch_count,
            k.missed_count,
            k.fake_count,
            k.win_count,
            k.loss_count,
            k.neutral_count,
            k.kickoff_goals_for,
            k.kickoff_goals_against,
            k.advantages_for,
            k.advantages_against,
            k.no_advantage_count,
            k.time_to_ball_sum,
            k.time_to_ball_count,
            k.boost_after_sum,
            k.boost_after_count,
            k.boost_used_sum,
            k.boost_used_count,
            k.spawn_position_mix,
            k.approach_mix,
            k.taker_outcome_mix,
            k.support_behavior_mix,
            k.kickoff_outcome_mix,
            k.player_result_mix,
            k.win_strength_result_mix,
            k.advantage_result_mix
        FROM player_replay_kickoff k
        JOIN replays r
          ON r.id = k.replay_id
         AND r.canonical_analysis_run_id = k.analysis_run_id
        WHERE k.player_subject_id = "#,
    );
    query.push_bind(player_subject_id);
    super::replay_set::append_replay_set_filters(&mut query, &filters.replay_set, "r");
    if let Some(role) = &filters.role {
        query.push(" AND k.role = ");
        query.push_bind(role.clone());
    }
    if !filters.kickoff_spawn.is_empty() {
        // The live spawn filter keeps events where ANY taker spawned in the
        // selected set; `taker_spawns` carries that set so array-overlap (&&)
        // reproduces it (an empty selection -> overlaps nothing -> no rows).
        let positions: Vec<String> = filters
            .kickoff_spawn
            .spawn_positions()
            .into_iter()
            .map(|spawn| spawn.to_owned())
            .collect();
        query.push(" AND k.taker_spawns && ");
        query.push_bind(positions);
    }

    let rows = query.build().fetch_all(pool).await?;

    let mut summary = MaterializedKickoffSummary::default();
    // dimension key -> (value -> count); '' jsonb key already mapped to None.
    let mut dimension_counts: HashMap<&'static str, HashMap<Option<String>, u64>> = HashMap::new();

    for row in &rows {
        let role: String = row.try_get("role")?;
        let taker_spawns: Vec<String> = row.try_get("taker_spawns")?;
        let row_count = count_column(row, "row_count")?;

        summary
            .replay_ids
            .insert(row.try_get::<Uuid, _>("replay_id")?);
        summary.row_count += row_count;
        if role == "taker" {
            summary.taker_count += row_count;
        } else if role == "support" {
            summary.support_count += row_count;
        }
        summary.touched_count += count_column(row, "touched_count")?;
        summary.first_touch_count += count_column(row, "first_touch_count")?;
        summary.missed_count += count_column(row, "missed_count")?;
        summary.fake_count += count_column(row, "fake_count")?;
        summary.win_count += count_column(row, "win_count")?;
        summary.loss_count += count_column(row, "loss_count")?;
        summary.neutral_count += count_column(row, "neutral_count")?;
        summary.kickoff_goals_for += count_column(row, "kickoff_goals_for")?;
        summary.kickoff_goals_against += count_column(row, "kickoff_goals_against")?;
        summary.advantages_for += count_column(row, "advantages_for")?;
        summary.advantages_against += count_column(row, "advantages_against")?;
        summary.no_advantage_count += count_column(row, "no_advantage_count")?;
        summary.time_to_ball_sum += row.try_get::<f64, _>("time_to_ball_sum")?;
        summary.time_to_ball_count += count_column(row, "time_to_ball_count")?;
        summary.boost_after_sum += row.try_get::<f64, _>("boost_after_sum")?;
        summary.boost_after_count += count_column(row, "boost_after_count")?;
        summary.boost_used_sum += row.try_get::<f64, _>("boost_used_sum")?;
        summary.boost_used_count += count_column(row, "boost_used_count")?;

        // role + kickoff_type are recoverable from the grain columns.
        *dimension_counts
            .entry("role")
            .or_default()
            .entry(Some(role.clone()))
            .or_default() += row_count;
        *dimension_counts
            .entry("kickoff_type")
            .or_default()
            .entry(classify_kickoff_type(&taker_spawns))
            .or_default() += row_count;

        for (dimension_key, column) in MATERIALIZED_KICKOFF_DIMENSION_MIXES {
            let mix: Value = row.try_get(*column)?;
            merge_mix_counts(dimension_counts.entry(dimension_key).or_default(), &mix);
        }
    }

    let dimensions = KICKOFF_DIMENSIONS
        .iter()
        .map(|dimension| {
            let counts = dimension_counts.remove(dimension.key).unwrap_or_default();
            dimension_response_from_counts(
                dimension.key,
                dimension.label,
                counts,
                filters.dimension_limit,
            )
        })
        .collect();

    Ok((summary.into_row(), dimensions))
}

// Dimension key -> the `player_replay_kickoff` jsonb mix column that stores its
// {value: count} distribution. `role` and `kickoff_type` are derived from the
// grain columns instead and are handled separately.
const MATERIALIZED_KICKOFF_DIMENSION_MIXES: &[(&str, &str)] = &[
    ("spawn_position", "spawn_position_mix"),
    ("approach", "approach_mix"),
    ("taker_outcome", "taker_outcome_mix"),
    ("support_behavior", "support_behavior_mix"),
    ("kickoff_outcome", "kickoff_outcome_mix"),
    ("player_result", "player_result_mix"),
    ("win_strength_result", "win_strength_result_mix"),
    ("advantage_result", "advantage_result_mix"),
];

#[derive(Default)]
struct MaterializedKickoffSummary {
    replay_ids: std::collections::HashSet<Uuid>,
    row_count: u64,
    taker_count: u64,
    support_count: u64,
    touched_count: u64,
    first_touch_count: u64,
    missed_count: u64,
    fake_count: u64,
    win_count: u64,
    loss_count: u64,
    neutral_count: u64,
    kickoff_goals_for: u64,
    kickoff_goals_against: u64,
    advantages_for: u64,
    advantages_against: u64,
    no_advantage_count: u64,
    time_to_ball_sum: f64,
    time_to_ball_count: u64,
    boost_after_sum: f64,
    boost_after_count: u64,
    boost_used_sum: f64,
    boost_used_count: u64,
}

impl MaterializedKickoffSummary {
    fn into_row(self) -> KickoffSummaryRow {
        let average = |sum: f64, count: u64| (count > 0).then(|| sum / count as f64);
        KickoffSummaryRow {
            replay_count: self.replay_ids.len() as u64,
            // Each player appears once per kickoff event, so their distinct event
            // count equals their summed row count.
            event_count: self.row_count,
            row_count: self.row_count,
            taker_count: self.taker_count,
            support_count: self.support_count,
            touched_count: self.touched_count,
            first_touch_count: self.first_touch_count,
            missed_count: self.missed_count,
            fake_count: self.fake_count,
            win_count: self.win_count,
            loss_count: self.loss_count,
            neutral_count: self.neutral_count,
            kickoff_goals_for: self.kickoff_goals_for,
            kickoff_goals_against: self.kickoff_goals_against,
            advantages_for: self.advantages_for,
            advantages_against: self.advantages_against,
            no_advantage_count: self.no_advantage_count,
            avg_taker_time_to_touch: average(self.time_to_ball_sum, self.time_to_ball_count),
            avg_boost_after: average(self.boost_after_sum, self.boost_after_count),
            avg_boost_used: average(self.boost_used_sum, self.boost_used_count),
        }
    }
}

// Coarse kickoff type from the event's taker spawn set, matching the priority of
// KICKOFF_TYPE_DIMENSION_SQL (diagonal > center_offset > center).
fn classify_kickoff_type(taker_spawns: &[String]) -> Option<String> {
    if taker_spawns
        .iter()
        .any(|spawn| spawn.starts_with("diagonal_"))
    {
        Some("diagonal".to_owned())
    } else if taker_spawns
        .iter()
        .any(|spawn| spawn.starts_with("off_center_"))
    {
        Some("center_offset".to_owned())
    } else if taker_spawns.iter().any(|spawn| spawn == "center") {
        Some("center".to_owned())
    } else {
        None
    }
}

// Fold a stored {value: count} jsonb mix into the running per-value totals,
// mapping the '' sentinel key back to a NULL (None) dimension value.
fn merge_mix_counts(counts: &mut HashMap<Option<String>, u64>, mix: &Value) {
    let Some(object) = mix.as_object() else {
        return;
    };
    for (key, value) in object {
        let count = value.as_u64().or_else(|| value.as_f64().map(|v| v as u64));
        let Some(count) = count else {
            continue;
        };
        let dimension_value = if key.is_empty() {
            None
        } else {
            Some(key.clone())
        };
        *counts.entry(dimension_value).or_default() += count;
    }
}

fn dimension_response_from_counts(
    key: &str,
    label: &str,
    counts: HashMap<Option<String>, u64>,
    limit: u32,
) -> EventStatDimensionResponse {
    let mut values: Vec<EventStatDimensionValueResponse> = counts
        .into_iter()
        .map(|(value, count)| EventStatDimensionValueResponse {
            display_name: value
                .as_deref()
                .map(display_label)
                .unwrap_or_else(|| "Unknown".to_owned()),
            key: value,
            count,
        })
        .collect();
    // Mirror the live `ORDER BY COUNT(*) DESC, key NULLS LAST`.
    values.sort_by(|a, b| {
        b.count.cmp(&a.count).then_with(|| match (&a.key, &b.key) {
            (Some(left), Some(right)) => left.cmp(right),
            (Some(_), None) => Ordering::Less,
            (None, Some(_)) => Ordering::Greater,
            (None, None) => Ordering::Equal,
        })
    });
    values.truncate(limit as usize);
    EventStatDimensionResponse {
        key: key.to_owned(),
        label: label.to_owned(),
        values,
    }
}

async fn load_event_stat_dimensions(
    pool: &sqlx::PgPool,
    adapter: &EventStatsAdapter,
    filters: &EventStatsQuery,
) -> Result<Vec<EventStatDimensionResponse>, sqlx::Error> {
    let mut dimensions = Vec::with_capacity(adapter.dimensions.len());
    for dimension in adapter.dimensions {
        let mut query = QueryBuilder::<Postgres>::new("SELECT ");
        query.push(dimension.expression);
        query.push(" AS key, COUNT(*) AS count");
        push_event_stats_from(&mut query, adapter);
        push_event_stats_filters(&mut query, adapter, filters);
        query.push(" GROUP BY 1 ORDER BY COUNT(*) DESC, key NULLS LAST LIMIT ");
        query.push_bind(i64::from(filters.dimension_limit));

        let rows = query.build().fetch_all(pool).await?;
        dimensions.push(EventStatDimensionResponse {
            key: dimension.key.to_owned(),
            label: dimension.label.to_owned(),
            values: rows
                .into_iter()
                .map(|row| {
                    let key: Option<String> = row.try_get("key")?;
                    let count = count_column(&row, "count")?;
                    Ok(EventStatDimensionValueResponse {
                        display_name: key
                            .as_deref()
                            .map(display_label)
                            .unwrap_or_else(|| "Unknown".to_owned()),
                        key,
                        count,
                    })
                })
                .collect::<Result<Vec<_>, sqlx::Error>>()?,
        });
    }

    Ok(dimensions)
}

async fn load_event_stat_samples(
    pool: &sqlx::PgPool,
    adapter: &EventStatsAdapter,
    filters: &EventStatsQuery,
) -> Result<Vec<EventStatSampleResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            detail.replay_id,
            detail.event_id,
            detail.replay_player_id,
            detail.player_subject_id,
            event.event_time,
            detail.role,
            detail.team,
            detail.spawn_position,
            detail.approach,
            detail.taker_outcome,
            detail.support_behavior,
            detail.start_boost,
            detail.boost_after,
            detail.boost_used,
            detail.time_to_ball,
            detail.first_touch_time,
            kickoff.outcome AS kickoff_outcome,
            kickoff.winning_team,
            kickoff.kickoff_goal,
            kickoff.scoring_team,
            kickoff.time_to_goal,
            kickoff.advantage,
            kickoff.advantage_team,
            kickoff.advantage_seconds_after_first_touch
        "#,
    );
    push_event_stats_from(&mut query, adapter);
    push_event_stats_filters(&mut query, adapter, filters);
    query.push(
        " ORDER BY COALESCE(event.event_time, event.start_time) NULLS LAST, detail.event_id LIMIT ",
    );
    query.push_bind(i64::from(filters.sample_count));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(sample_from_row).collect()
}

fn push_event_stats_from<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    adapter: &EventStatsAdapter,
) {
    builder.push(" FROM replays r JOIN ");
    builder.push(adapter.base_table);
    builder.push(" ");
    builder.push(adapter.base_alias);
    builder.push(" ON ");
    builder.push(adapter.base_alias);
    builder.push(".replay_id = r.id ");
    if let Some(join) = adapter.event_detail_join {
        builder.push(join);
        builder.push(" ");
    }
    builder.push(
        r#"
        JOIN play_events event
          ON event.id = "#,
    );
    builder.push(adapter.base_alias);
    builder.push(
        r#".event_id
         AND event.analysis_run_id = r.canonical_analysis_run_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
}

fn push_event_stats_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    adapter: &EventStatsAdapter,
    filters: &'args EventStatsQuery,
) {
    super::replay_set::append_replay_set_filters(builder, &filters.replay_set, "r");
    if let Some(player) = &filters.player {
        builder.push(" AND ");
        builder.push(adapter.player_subject_column);
        builder.push(" = ");
        let player_subject_id = format!("{}:{}", player.platform, player.platform_player_id);
        builder.push_bind(player_subject_id);
    }
    if let (Some(role_column), Some(role)) = (adapter.role_column, &filters.role) {
        builder.push(" AND ");
        builder.push(role_column);
        builder.push(" = ");
        builder.push_bind(role);
    }
    push_kickoff_event_spawn_filter(
        builder,
        &filters.kickoff_spawn,
        "detail.event_id",
        "spawn_filter",
    );
}

pub(crate) fn push_kickoff_spawn_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filter: &'args KickoffSpawnFilter,
    spawn_expression: &str,
) {
    if filter.is_empty() {
        return;
    }
    let positions = filter.spawn_positions();
    builder.push(" AND ");
    if positions.is_empty() {
        builder.push("FALSE");
    } else {
        builder.push(spawn_expression);
        builder.push(" = ANY(");
        builder.push_bind(positions);
        builder.push(")");
    }
}

pub(crate) fn push_kickoff_event_spawn_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filter: &'args KickoffSpawnFilter,
    event_id_expression: &str,
    alias: &str,
) {
    if filter.is_empty() {
        return;
    }

    builder.push(" AND EXISTS (SELECT 1 FROM play_event_kickoff_player_details ");
    builder.push(alias);
    builder.push(" WHERE ");
    builder.push(alias);
    builder.push(".event_id = ");
    builder.push(event_id_expression);
    builder.push(" AND ");
    builder.push(alias);
    builder.push(".role = 'taker'");
    push_kickoff_spawn_filter(builder, filter, &format!("{alias}.spawn_position"));
    builder.push(")");
}

fn kickoff_metrics(summary: KickoffSummaryRow) -> Vec<EventStatMetricResponse> {
    vec![
        count_metric("taker_count", "Taker rows", summary.taker_count),
        count_metric("support_count", "Support rows", summary.support_count),
        count_metric("touched_count", "Touches", summary.touched_count),
        count_metric(
            "first_touch_count",
            "First touches",
            summary.first_touch_count,
        ),
        share_metric(
            "first_touch_share",
            "First touch yes share",
            ratio(summary.first_touch_count, summary.event_count),
        ),
        count_metric("missed_count", "Misses", summary.missed_count),
        count_metric("fake_count", "Fakes", summary.fake_count),
        count_metric("win_count", "Wins", summary.win_count),
        count_metric("loss_count", "Losses", summary.loss_count),
        count_metric("neutral_count", "Neutral", summary.neutral_count),
        count_metric(
            "kickoff_goals_for",
            "Kickoff goals for",
            summary.kickoff_goals_for,
        ),
        count_metric(
            "kickoff_goals_against",
            "Kickoff goals against",
            summary.kickoff_goals_against,
        ),
        count_metric("advantages_for", "Advantage gained", summary.advantages_for),
        count_metric(
            "advantages_against",
            "Advantage conceded",
            summary.advantages_against,
        ),
        count_metric(
            "no_advantage_count",
            "No advantage",
            summary.no_advantage_count,
        ),
        average_metric(
            "avg_taker_time_to_touch",
            "Avg taker time to touch",
            summary.avg_taker_time_to_touch,
        ),
        average_metric(
            "avg_boost_after",
            "Avg boost after",
            summary.avg_boost_after,
        ),
        average_metric("avg_boost_used", "Avg boost used", summary.avg_boost_used),
    ]
}

fn count_metric(key: &str, label: &str, value: u64) -> EventStatMetricResponse {
    EventStatMetricResponse {
        key: key.to_owned(),
        label: label.to_owned(),
        value: Some(value as f64),
        kind: "count".to_owned(),
    }
}

fn average_metric(key: &str, label: &str, value: Option<f64>) -> EventStatMetricResponse {
    EventStatMetricResponse {
        key: key.to_owned(),
        label: label.to_owned(),
        value,
        kind: "average".to_owned(),
    }
}

fn share_metric(key: &str, label: &str, value: Option<f64>) -> EventStatMetricResponse {
    EventStatMetricResponse {
        key: key.to_owned(),
        label: label.to_owned(),
        value,
        kind: "share".to_owned(),
    }
}

fn ratio(numerator: u64, denominator: u64) -> Option<f64> {
    (denominator > 0).then(|| numerator as f64 / denominator as f64)
}

fn sample_from_row(row: sqlx::postgres::PgRow) -> Result<EventStatSampleResponse, sqlx::Error> {
    let mut fields = BTreeMap::new();
    insert_optional(
        &mut fields,
        "spawn_position",
        row.try_get::<Option<String>, _>("spawn_position")?,
    );
    insert_optional(
        &mut fields,
        "approach",
        row.try_get::<Option<String>, _>("approach")?,
    );
    insert_optional(
        &mut fields,
        "taker_outcome",
        row.try_get::<Option<String>, _>("taker_outcome")?,
    );
    insert_optional(
        &mut fields,
        "support_behavior",
        row.try_get::<Option<String>, _>("support_behavior")?,
    );
    insert_optional(
        &mut fields,
        "start_boost",
        row.try_get::<Option<f64>, _>("start_boost")?,
    );
    insert_optional(
        &mut fields,
        "boost_after",
        row.try_get::<Option<f64>, _>("boost_after")?,
    );
    insert_optional(
        &mut fields,
        "boost_used",
        row.try_get::<Option<f64>, _>("boost_used")?,
    );
    insert_optional(
        &mut fields,
        "time_to_ball",
        row.try_get::<Option<f64>, _>("time_to_ball")?,
    );
    insert_optional(
        &mut fields,
        "first_touch_time",
        row.try_get::<Option<f64>, _>("first_touch_time")?,
    );
    insert_optional(
        &mut fields,
        "kickoff_outcome",
        row.try_get::<Option<String>, _>("kickoff_outcome")?,
    );
    insert_optional(
        &mut fields,
        "winning_team",
        row.try_get::<Option<i32>, _>("winning_team")?,
    );
    insert_optional(
        &mut fields,
        "kickoff_goal",
        row.try_get::<Option<bool>, _>("kickoff_goal")?,
    );
    insert_optional(
        &mut fields,
        "scoring_team",
        row.try_get::<Option<i32>, _>("scoring_team")?,
    );
    insert_optional(
        &mut fields,
        "time_to_goal",
        row.try_get::<Option<f64>, _>("time_to_goal")?,
    );
    insert_optional(
        &mut fields,
        "advantage",
        row.try_get::<Option<String>, _>("advantage")?,
    );
    insert_optional(
        &mut fields,
        "advantage_team",
        row.try_get::<Option<i32>, _>("advantage_team")?,
    );
    insert_optional(
        &mut fields,
        "advantage_seconds_after_first_touch",
        row.try_get::<Option<f64>, _>("advantage_seconds_after_first_touch")?,
    );

    Ok(EventStatSampleResponse {
        replay_id: row.try_get("replay_id")?,
        event_id: row.try_get("event_id")?,
        replay_player_id: row.try_get("replay_player_id")?,
        player_subject_id: row.try_get("player_subject_id")?,
        event_time: finite_value(row.try_get("event_time")?),
        role: row.try_get("role")?,
        team: row.try_get("team")?,
        fields,
    })
}

fn insert_optional<T>(fields: &mut BTreeMap<String, Value>, key: &str, value: Option<T>)
where
    T: serde::Serialize,
{
    if let Some(value) = value {
        fields.insert(key.to_owned(), json!(value));
    }
}

pub(crate) fn count_column(row: &sqlx::postgres::PgRow, column: &str) -> Result<u64, sqlx::Error> {
    let count: i64 = row.try_get(column)?;
    Ok(count.max(0) as u64)
}

pub(crate) fn finite_value(value: Option<f64>) -> Option<f64> {
    value.filter(|value| value.is_finite())
}

pub(crate) fn display_label(value: &str) -> String {
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
