use std::collections::HashMap;

use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{
    extract::{RawQuery, State},
    routing::get,
    Json, Router,
};
use serde::Serialize;
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    event_stats::{count_column, display_label, finite_value},
    query::{parse_bool_filter, QueryParams},
    replay_set::{
        append_replay_set_filters, PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "possession_stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/possession/summary", get(get_possession_summary))
}

/// Career possession summary over a replay set: per-player possession spans
/// (durations, touches, ball progress, sustained-control shares) plus the
/// touch-classification mixes (first-touch intentions, surfaces) that frame
/// how possessions start and develop.
#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionSummaryResponse {
    pub replay_count: u64,
    pub possessions: PossessionSpanSummary,
    pub controlled_plays: PossessionSpanSummary,
    pub teammates: Option<PossessionTeammateComparison>,
    pub cohorts: Vec<PossessionCohortSummary>,
    pub touches: PossessionTouchSummary,
    pub locations: PossessionLocationSummary,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionTeammateComparison {
    pub appearance_count: u64,
    pub controlled_plays: PossessionSpanSummary,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionCohortSummary {
    pub key: String,
    pub label: String,
    pub appearance_count: u64,
    pub active_time_seconds: Option<f64>,
    pub possessions: PossessionSpanSummary,
    pub controlled_plays: PossessionSpanSummary,
    pub touches: PossessionTouchSummary,
    pub locations: PossessionLocationSummary,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionSpanSummary {
    pub possession_count: u64,
    pub total_duration_seconds: f64,
    pub avg_duration_seconds: Option<f64>,
    pub total_touch_count: u64,
    pub avg_touches_per_possession: Option<f64>,
    pub total_advance_distance: f64,
    pub total_retreat_distance: f64,
    pub avg_advance_distance: Option<f64>,
    pub avg_retreat_distance: Option<f64>,
    pub carry_time_seconds: f64,
    pub air_dribble_time_seconds: f64,
    /// Share of possessed time spent in a grounded carry / air dribble.
    pub carry_time_share: Option<f64>,
    pub air_dribble_time_share: Option<f64>,
    /// Share of possessions that included the given kind of play.
    pub with_carry_share: Option<f64>,
    /// Share of possessions qualifying as sustained control (the
    /// controlled-play criteria applied as a span label).
    pub sustained_control_share: Option<f64>,
    pub with_air_dribble_share: Option<f64>,
    pub with_aerial_touch_share: Option<f64>,
    pub with_wall_touch_share: Option<f64>,
    pub duration_histogram: Vec<PossessionDurationBucket>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionDurationBucket {
    pub key: String,
    pub label: String,
    pub count: u64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionLocationSummary {
    pub total_duration_seconds: f64,
    pub halves: Vec<PossessionTimeBucket>,
    pub thirds: Vec<PossessionTimeBucket>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionTimeBucket {
    pub key: String,
    pub label: String,
    pub duration_seconds: f64,
    pub share: Option<f64>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionTouchSummary {
    /// Touches with classification facets (rows processed under schema >= v6).
    pub classified_touch_count: u64,
    pub first_touch_count: u64,
    /// First touches whose resolved intention is `control`.
    pub first_touch_control_count: u64,
    pub first_touch_control_share: Option<f64>,
    pub contested_touch_count: u64,
    pub first_touch_intentions: Vec<PossessionMixValue>,
    pub intentions: Vec<PossessionMixValue>,
    pub surfaces: Vec<PossessionMixValue>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PossessionMixValue {
    pub key: Option<String>,
    pub display_name: String,
    pub count: u64,
}

#[derive(Debug)]
struct PossessionStatsQuery {
    replay_set: ReplaySetFilters,
    player: Option<PlayerStatFilter>,
    materialized: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum PossessionSpanFilter {
    All,
    SustainedControl,
}

impl PossessionStatsQuery {
    fn from_raw_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
        materialized_default: bool,
    ) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let replay_set_input = ReplaySetFilterInput::from_query_params(&params)?;
        let replay_set = ReplaySetFilters::from_input(replay_set_input, auth_user_id)?;
        let materialized = params
            .first(&["materialized"])
            .map(|value| parse_bool_filter("materialized", &value))
            .transpose()?
            .unwrap_or(materialized_default);
        Ok(Self {
            replay_set,
            materialized,
            player: params
                .first(&["player-id", "player_id"])
                .map(|player_id| PlayerStatFilter::from_query(&player_id))
                .transpose()?,
        })
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/possession/summary",
    tag = "stats",
    responses(
        (status = 200, description = "Summarize player possession spans over a replay set", body = PossessionSummaryResponse),
        (status = 400, description = "Possession stat filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_possession_summary(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PossessionSummaryResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = PossessionStatsQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
        state.materialized_stat_counts,
    )?;
    let response = load_possession_summary(db, &query)
        .await
        .map_err(ApiError::internal)?;
    Ok(Json(response))
}

/// Buckets for the possession-duration histogram. Bounds are seconds of
/// possessed time; the final bucket is open-ended.
const DURATION_BUCKETS: &[(&str, &str, f64, Option<f64>)] = &[
    ("lt_1s", "< 1s", 0.0, Some(1.0)),
    ("1_to_2s", "1–2s", 1.0, Some(2.0)),
    ("2_to_4s", "2–4s", 2.0, Some(4.0)),
    ("4_to_8s", "4–8s", 4.0, Some(8.0)),
    ("gte_8s", "8s+", 8.0, None),
];

async fn load_possession_summary(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<PossessionSummaryResponse, sqlx::Error> {
    if filters.materialized && filters.player.is_some() {
        return load_possession_summary_materialized(pool, filters).await;
    }
    let (replay_count, possessions) =
        load_possession_span_summary(pool, filters, PossessionSpanFilter::All).await?;
    let (_, controlled_plays) =
        load_possession_span_summary(pool, filters, PossessionSpanFilter::SustainedControl).await?;
    let teammates = if filters.player.is_some() {
        Some(load_teammate_controlled_play_summary(pool, filters).await?)
    } else {
        None
    };
    let cohorts = if filters.player.is_some() {
        load_possession_cohort_summaries(pool, filters).await?
    } else {
        Vec::new()
    };
    let touches = load_possession_touch_summary(pool, filters).await?;
    let locations = load_possession_location_summary(pool, filters).await?;
    Ok(PossessionSummaryResponse {
        replay_count,
        possessions,
        controlled_plays,
        teammates,
        cohorts,
        touches,
        locations,
    })
}

/// Pushes `WITH target_appearances, cohort_rows AS (...)` reconstructing the
/// player / teammates / opponents cohorts from the materialized
/// `player_replay_possession` rows in the target's replays.
fn push_materialized_possession_cohorts<'a>(
    builder: &mut QueryBuilder<'a, Postgres>,
    filters: &'a PossessionStatsQuery,
) {
    let player = filters
        .player
        .as_ref()
        .expect("materialized requires player");
    builder.push(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT poss.replay_id, poss.team AS target_team, poss.analysis_run_id AS run_id
            FROM player_replay_possession poss
            JOIN replays r ON r.id = poss.replay_id AND r.canonical_analysis_run_id = poss.analysis_run_id
            WHERE poss.platform = "#,
    );
    builder.push_bind(&player.platform);
    builder.push(" AND poss.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    append_replay_set_filters(builder, &filters.replay_set, "r");
    builder.push(
        r#"
        ),
        cohort_rows AS (
            SELECT 'player'::text AS cohort, poss.*
            FROM target_appearances ta
            JOIN player_replay_possession poss
              ON poss.replay_id = ta.replay_id AND poss.analysis_run_id = ta.run_id
             AND poss.platform = "#,
    );
    builder.push_bind(&player.platform);
    builder.push(" AND poss.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    builder.push(
        r#"
            UNION ALL
            SELECT 'teammates'::text AS cohort, poss.*
            FROM target_appearances ta
            JOIN player_replay_possession poss
              ON poss.replay_id = ta.replay_id AND poss.analysis_run_id = ta.run_id
             AND poss.team = ta.target_team
             AND NOT (poss.platform = "#,
    );
    builder.push_bind(&player.platform);
    builder.push(" AND poss.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    builder.push(
        r#")
            UNION ALL
            SELECT 'opponents'::text AS cohort, poss.*
            FROM target_appearances ta
            JOIN player_replay_possession poss
              ON poss.replay_id = ta.replay_id AND poss.analysis_run_id = ta.run_id
             AND poss.team IS NOT NULL AND ta.target_team IS NOT NULL
             AND poss.team <> ta.target_team
        )
        "#,
    );
}

/// Pushes the per-cohort span aggregate SELECT, aliased so the row matches
/// `possession_span_summary_from_row`. `sustained` reads the sc_ columns.
fn push_materialized_span_select(builder: &mut QueryBuilder<'_, Postgres>, sustained: bool) {
    let p = if sustained { "sc_" } else { "" };
    let sustained_count = if sustained {
        "sc_possession_count".to_owned()
    } else {
        "sustained_control_count".to_owned()
    };
    builder.push(format!(
        r#"
        SELECT
            cohort,
            COUNT(DISTINCT replay_id) AS replay_count,
            SUM({p}possession_count)::bigint AS possession_count,
            SUM({p}duration_seconds) AS total_duration,
            SUM({p}touch_count)::bigint AS total_touch_count,
            SUM({p}advance_distance) AS total_advance,
            SUM({p}retreat_distance) AS total_retreat,
            SUM({p}carry_time) AS carry_time,
            SUM({p}air_dribble_time) AS air_dribble_time,
            SUM({sustained_count})::bigint AS sustained_control,
            SUM({p}with_carry_count)::bigint AS with_carry,
            SUM({p}with_air_dribble_count)::bigint AS with_air_dribble,
            SUM({p}with_aerial_touch_count)::bigint AS with_aerial_touch,
            SUM({p}with_wall_touch_count)::bigint AS with_wall_touch,
            SUM({p}duration_bucket_0)::bigint AS duration_bucket_0,
            SUM({p}duration_bucket_1)::bigint AS duration_bucket_1,
            SUM({p}duration_bucket_2)::bigint AS duration_bucket_2,
            SUM({p}duration_bucket_3)::bigint AS duration_bucket_3,
            SUM({p}duration_bucket_4)::bigint AS duration_bucket_4,
            (SUM({p}duration_seconds) / NULLIF(SUM({p}possession_count), 0))::float8 AS avg_duration,
            (SUM({p}touch_count)::float8 / NULLIF(SUM({p}possession_count), 0))::float8 AS avg_touches,
            (SUM({p}advance_distance) / NULLIF(SUM({p}possession_count), 0))::float8 AS avg_advance,
            (SUM({p}retreat_distance) / NULLIF(SUM({p}possession_count), 0))::float8 AS avg_retreat
        FROM cohort_rows
        GROUP BY cohort
        "#
    ));
}

/// Roster query backing both per-cohort `appearance_count` and the
/// `active_time_seconds` denominator, reusing the live `cohort_appearances` CTE
/// (over `replay_players`) so the materialized read reports exactly the live
/// `COUNT(DISTINCT actor_id)` and `SUM(active_time_seconds)` per cohort.
fn build_materialized_cohort_appearances_query<'a>(
    filters: &'a PossessionStatsQuery,
) -> QueryBuilder<'a, Postgres> {
    let mut q = QueryBuilder::<Postgres>::new("");
    push_possession_cohort_ctes(&mut q, filters);
    q.push(
        r#"
        SELECT cohort,
            COUNT(DISTINCT actor_id)::bigint AS appearance_count,
            SUM(active_time_seconds) AS active_time_seconds
        FROM cohort_appearances
        GROUP BY cohort
        "#,
    );
    q
}

/// Per-cohort appearance counts and active-time denominators from the full
/// roster. The materialized possession table is sparse (only players who
/// recorded possession events get a row) AND has no active_time_seconds column,
/// so neither value can be derived from it -- both come from the roster CTE, the
/// authoritative source. No play_events join, so it is sub-second.
async fn load_materialized_cohort_roster(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<(HashMap<String, u64>, HashMap<String, Option<f64>>), sqlx::Error> {
    let mut q = build_materialized_cohort_appearances_query(filters);
    let mut counts = HashMap::new();
    let mut active_time = HashMap::new();
    for row in q.build().fetch_all(pool).await? {
        let cohort: String = row.try_get("cohort")?;
        counts.insert(cohort.clone(), count_column(&row, "appearance_count")?);
        active_time.insert(
            cohort,
            finite_nonnegative(row.try_get("active_time_seconds")?),
        );
    }
    Ok((counts, active_time))
}

async fn load_possession_summary_materialized(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<PossessionSummaryResponse, sqlx::Error> {
    // Per-cohort span summaries (all + sustained), reusing the live row builder.
    let mut span_all: HashMap<String, (u64, PossessionSpanSummary)> = HashMap::new();
    let mut span_sc: HashMap<String, PossessionSpanSummary> = HashMap::new();
    for sustained in [false, true] {
        let mut q = QueryBuilder::<Postgres>::new("");
        push_materialized_possession_cohorts(&mut q, filters);
        push_materialized_span_select(&mut q, sustained);
        for row in q.build().fetch_all(pool).await? {
            let cohort: String = row.try_get("cohort")?;
            let (replay_count, summary) = possession_span_summary_from_row(&row)?;
            if sustained {
                span_sc.insert(cohort, summary);
            } else {
                span_all.insert(cohort, (replay_count, summary));
            }
        }
    }

    // Appearance counts AND the active-time denominator come from the full roster
    // (replay_players), NOT the sparse materialized rows: a co-player who appeared
    // but recorded zero possession events has no player_replay_possession row (so
    // counting those rows undercounts appearances -- off by one for a teammate
    // with no possessions), and the possession table has no active_time_seconds
    // column at all. This mirrors the live COUNT(DISTINCT actor_id) /
    // SUM(active_time_seconds) over the roster-based cohort_appearances, matching
    // the live path exactly. It carries no event-table join, so it stays cheap.
    let (span_appearance, span_active_time) =
        load_materialized_cohort_roster(pool, filters).await?;

    // Per-cohort touch counts (mixes are only on the target's top-level touches).
    let mut touch_counts: HashMap<String, PossessionTouchSummary> = HashMap::new();
    {
        let mut q = QueryBuilder::<Postgres>::new("");
        push_materialized_possession_cohorts(&mut q, filters);
        q.push(
            r#"
            SELECT cohort,
                SUM(classified_touch_count)::bigint AS classified_touch_count,
                SUM(first_touch_count)::bigint AS first_touch_count,
                SUM(first_touch_control_count)::bigint AS first_touch_control_count,
                SUM(contested_touch_count)::bigint AS contested_touch_count
            FROM cohort_rows GROUP BY cohort
            "#,
        );
        for row in q.build().fetch_all(pool).await? {
            let cohort: String = row.try_get("cohort")?;
            let first_touch_count = count_column(&row, "first_touch_count")?;
            let first_touch_control_count = count_column(&row, "first_touch_control_count")?;
            touch_counts.insert(
                cohort,
                PossessionTouchSummary {
                    classified_touch_count: count_column(&row, "classified_touch_count")?,
                    first_touch_count,
                    first_touch_control_count,
                    first_touch_control_share: (first_touch_count > 0)
                        .then(|| first_touch_control_count as f64 / first_touch_count as f64),
                    contested_touch_count: count_column(&row, "contested_touch_count")?,
                    first_touch_intentions: Vec::new(),
                    intentions: Vec::new(),
                    surfaces: Vec::new(),
                },
            );
        }
    }

    // Per-cohort location: expand the location jsonb to (cohort, field_third, team, seconds).
    let mut location_rows: HashMap<String, Vec<(String, Option<i32>, f64)>> = HashMap::new();
    {
        let mut q = QueryBuilder::<Postgres>::new("");
        push_materialized_possession_cohorts(&mut q, filters);
        q.push(
            r#"
            SELECT cohort, kv.key AS field_third, team AS player_team, SUM(kv.value::float8) AS duration
            FROM cohort_rows, jsonb_each_text(location_third_seconds) kv
            GROUP BY cohort, kv.key, team
            "#,
        );
        for row in q.build().fetch_all(pool).await? {
            let cohort: String = row.try_get("cohort")?;
            let field_third: String = row.try_get("field_third")?;
            let player_team: Option<i32> = row.try_get("player_team")?;
            let duration: f64 = row.try_get("duration")?;
            location_rows
                .entry(cohort)
                .or_default()
                .push((field_third, player_team, duration));
        }
    }

    // Target touch intention/surface mixes (merge the player's per-replay jsonb maps).
    let (intentions, first_touch_intentions, surfaces) =
        load_materialized_target_touch_mixes(pool, filters).await?;

    let cohort_label = possession_cohort_label;
    let cohorts: Vec<PossessionCohortSummary> = ["player", "teammates", "opponents"]
        .into_iter()
        .filter_map(|key| {
            let (_, possessions) = span_all.get(key)?.clone();
            Some(PossessionCohortSummary {
                key: key.to_owned(),
                label: cohort_label(key).to_owned(),
                appearance_count: span_appearance.get(key).copied().unwrap_or(0),
                active_time_seconds: span_active_time.get(key).copied().flatten(),
                possessions,
                controlled_plays: span_sc
                    .get(key)
                    .cloned()
                    .unwrap_or_else(empty_possession_span_summary),
                touches: touch_counts
                    .get(key)
                    .cloned()
                    .unwrap_or_else(empty_possession_touch_summary),
                locations: location_rows
                    .get(key)
                    .cloned()
                    .map(possession_location_summary_from_rows)
                    .unwrap_or_else(empty_possession_location_summary),
            })
        })
        .collect();

    let (replay_count, possessions) = span_all
        .get("player")
        .cloned()
        .unwrap_or_else(|| (0, empty_possession_span_summary()));
    let controlled_plays = span_sc
        .get("player")
        .cloned()
        .unwrap_or_else(empty_possession_span_summary);
    let mut touches = touch_counts
        .get("player")
        .cloned()
        .unwrap_or_else(empty_possession_touch_summary);
    touches.intentions = intentions;
    touches.first_touch_intentions = first_touch_intentions;
    touches.surfaces = surfaces;
    let locations = location_rows
        .get("player")
        .cloned()
        .map(possession_location_summary_from_rows)
        .unwrap_or_else(empty_possession_location_summary);
    let teammates = Some(PossessionTeammateComparison {
        appearance_count: span_appearance.get("teammates").copied().unwrap_or(0),
        controlled_plays: span_sc
            .get("teammates")
            .cloned()
            .unwrap_or_else(empty_possession_span_summary),
    });

    Ok(PossessionSummaryResponse {
        replay_count,
        possessions,
        controlled_plays,
        teammates,
        cohorts,
        touches,
        locations,
    })
}

/// Merge the target's per-replay intention/surface jsonb mixes into sorted
/// `PossessionMixValue` lists (count desc, key NULLS last), matching the live mix.
#[allow(clippy::type_complexity)]
async fn load_materialized_target_touch_mixes(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<
    (
        Vec<PossessionMixValue>,
        Vec<PossessionMixValue>,
        Vec<PossessionMixValue>,
    ),
    sqlx::Error,
> {
    let player = filters
        .player
        .as_ref()
        .expect("materialized requires player");
    let q = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            COALESCE(jsonb_object_agg(k, v) FILTER (WHERE src = 'i'), '{}'::jsonb) AS intentions,
            COALESCE(jsonb_object_agg(k, v) FILTER (WHERE src = 'f'), '{}'::jsonb) AS first_touch_intentions,
            COALESCE(jsonb_object_agg(k, v) FILTER (WHERE src = 's'), '{}'::jsonb) AS surfaces
        FROM (
            SELECT src, key AS k, SUM(value::numeric) AS v
            FROM (
                SELECT 'i' AS src, (jsonb_each_text(intention_mix)).* FROM target_rows
                UNION ALL SELECT 'f', (jsonb_each_text(first_touch_intention_mix)).* FROM target_rows
                UNION ALL SELECT 's', (jsonb_each_text(surface_mix)).* FROM target_rows
            ) e GROUP BY src, key
        ) g
        "#,
    );
    // `rows` CTE: the target's materialized possession rows over the filter.
    let mut full = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_rows AS (
            SELECT poss.intention_mix, poss.first_touch_intention_mix, poss.surface_mix
            FROM player_replay_possession poss
            JOIN replays r ON r.id = poss.replay_id AND r.canonical_analysis_run_id = poss.analysis_run_id
            WHERE poss.platform = "#,
    );
    full.push_bind(&player.platform);
    full.push(" AND poss.platform_player_id = ");
    full.push_bind(&player.platform_player_id);
    append_replay_set_filters(&mut full, &filters.replay_set, "r");
    full.push(") ");
    full.push(q.into_sql());
    let row = full.build().fetch_one(pool).await?;
    let to_mix = |value: serde_json::Value| -> Vec<PossessionMixValue> {
        let mut items: Vec<(String, u64)> = value
            .as_object()
            .map(|map| {
                map.iter()
                    .map(|(k, v)| (k.clone(), v.as_f64().unwrap_or(0.0) as u64))
                    .collect()
            })
            .unwrap_or_default();
        items.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
        items
            .into_iter()
            .map(|(key, count)| PossessionMixValue {
                display_name: display_label(&key),
                key: Some(key),
                count,
            })
            .collect()
    };
    let intentions: sqlx::types::Json<serde_json::Value> = row.try_get("intentions")?;
    let first_touch: sqlx::types::Json<serde_json::Value> =
        row.try_get("first_touch_intentions")?;
    let surfaces: sqlx::types::Json<serde_json::Value> = row.try_get("surfaces")?;
    Ok((
        to_mix(intentions.0),
        to_mix(first_touch.0),
        to_mix(surfaces.0),
    ))
}

fn push_possession_span_select(builder: &mut QueryBuilder<'_, Postgres>) {
    builder.push(
        r#"
        SELECT
            COUNT(DISTINCT detail.replay_id) AS replay_count,
            COUNT(*) AS possession_count,
            COALESCE(SUM(detail.duration), 0) AS total_duration,
            AVG(detail.duration) AS avg_duration,
            COALESCE(SUM(detail.touch_count), 0)::bigint AS total_touch_count,
            AVG(detail.touch_count::float8) AS avg_touches,
            COALESCE(SUM(detail.advance_distance), 0) AS total_advance,
            COALESCE(SUM(detail.retreat_distance), 0) AS total_retreat,
            AVG(detail.advance_distance) AS avg_advance,
            AVG(detail.retreat_distance) AS avg_retreat,
            COALESCE(SUM(detail.carry_time), 0) AS carry_time,
            COALESCE(SUM(detail.air_dribble_time), 0) AS air_dribble_time,
            COUNT(*) FILTER (WHERE detail.sustained_control) AS sustained_control,
            COUNT(*) FILTER (WHERE detail.carry_count > 0) AS with_carry,
            COUNT(*) FILTER (WHERE detail.air_dribble_count > 0) AS with_air_dribble,
            COUNT(*) FILTER (WHERE detail.aerial_touch_count > 0) AS with_aerial_touch,
            COUNT(*) FILTER (WHERE detail.wall_touch_count > 0) AS with_wall_touch
        "#,
    );
    for (index, (_, _, lower, upper)) in DURATION_BUCKETS.iter().enumerate() {
        builder.push(format!(
            ", COUNT(*) FILTER (WHERE detail.duration >= {lower}"
        ));
        if let Some(upper) = upper {
            builder.push(format!(" AND detail.duration < {upper}"));
        }
        builder.push(format!(") AS duration_bucket_{index}"));
    }
}

fn push_possession_span_filter(
    builder: &mut QueryBuilder<'_, Postgres>,
    span_filter: PossessionSpanFilter,
) {
    if span_filter == PossessionSpanFilter::SustainedControl {
        builder.push(" AND detail.sustained_control ");
    }
}

fn push_possession_from<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args PossessionStatsQuery,
) {
    builder.push(
        r#"
        FROM replays r
        JOIN play_event_player_possession_details detail ON detail.replay_id = r.id
        JOIN play_events event
          ON event.id = detail.event_id
         AND event.analysis_run_id = r.canonical_analysis_run_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    super::replay_set::append_replay_set_filters(builder, &filters.replay_set, "r");
    if let Some(player) = &filters.player {
        builder.push(" AND detail.player_subject_id = ");
        builder.push_bind(format!("{}:{}", player.platform, player.platform_player_id));
    }
}

async fn load_possession_span_summary(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
    span_filter: PossessionSpanFilter,
) -> Result<(u64, PossessionSpanSummary), sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new("");
    push_possession_span_select(&mut query);
    push_possession_from(&mut query, filters);
    push_possession_span_filter(&mut query, span_filter);

    let row = query.build().fetch_one(pool).await?;
    possession_span_summary_from_row(&row)
}

fn possession_span_summary_from_row(
    row: &sqlx::postgres::PgRow,
) -> Result<(u64, PossessionSpanSummary), sqlx::Error> {
    let possession_count = count_column(row, "possession_count")?;
    let total_duration: f64 = row.try_get("total_duration")?;
    let carry_time: f64 = row.try_get("carry_time")?;
    let air_dribble_time: f64 = row.try_get("air_dribble_time")?;
    let share_of_count = |value: u64| -> Option<f64> {
        (possession_count > 0).then(|| value as f64 / possession_count as f64)
    };
    let share_of_time =
        |value: f64| -> Option<f64> { (total_duration > 0.0).then(|| value / total_duration) };

    let mut duration_histogram = Vec::with_capacity(DURATION_BUCKETS.len());
    for (index, (key, label, _, _)) in DURATION_BUCKETS.iter().enumerate() {
        duration_histogram.push(PossessionDurationBucket {
            key: (*key).to_owned(),
            label: (*label).to_owned(),
            count: count_column(row, &format!("duration_bucket_{index}"))?,
        });
    }

    let summary = PossessionSpanSummary {
        possession_count,
        total_duration_seconds: total_duration,
        avg_duration_seconds: finite_value(row.try_get("avg_duration")?),
        total_touch_count: count_column(row, "total_touch_count")?,
        avg_touches_per_possession: finite_value(row.try_get("avg_touches")?),
        total_advance_distance: row.try_get("total_advance")?,
        total_retreat_distance: row.try_get("total_retreat")?,
        avg_advance_distance: finite_value(row.try_get("avg_advance")?),
        avg_retreat_distance: finite_value(row.try_get("avg_retreat")?),
        carry_time_seconds: carry_time,
        air_dribble_time_seconds: air_dribble_time,
        carry_time_share: share_of_time(carry_time),
        air_dribble_time_share: share_of_time(air_dribble_time),
        sustained_control_share: share_of_count(count_column(row, "sustained_control")?),
        with_carry_share: share_of_count(count_column(row, "with_carry")?),
        with_air_dribble_share: share_of_count(count_column(row, "with_air_dribble")?),
        with_aerial_touch_share: share_of_count(count_column(row, "with_aerial_touch")?),
        with_wall_touch_share: share_of_count(count_column(row, "with_wall_touch")?),
        duration_histogram,
    };
    Ok((count_column(row, "replay_count")?, summary))
}

fn empty_possession_span_summary() -> PossessionSpanSummary {
    PossessionSpanSummary {
        possession_count: 0,
        total_duration_seconds: 0.0,
        avg_duration_seconds: None,
        total_touch_count: 0,
        avg_touches_per_possession: None,
        total_advance_distance: 0.0,
        total_retreat_distance: 0.0,
        avg_advance_distance: None,
        avg_retreat_distance: None,
        carry_time_seconds: 0.0,
        air_dribble_time_seconds: 0.0,
        carry_time_share: None,
        air_dribble_time_share: None,
        sustained_control_share: None,
        with_carry_share: None,
        with_air_dribble_share: None,
        with_aerial_touch_share: None,
        with_wall_touch_share: None,
        duration_histogram: DURATION_BUCKETS
            .iter()
            .map(|(key, label, _, _)| PossessionDurationBucket {
                key: (*key).to_owned(),
                label: (*label).to_owned(),
                count: 0,
            })
            .collect(),
    }
}

fn empty_possession_touch_summary() -> PossessionTouchSummary {
    PossessionTouchSummary {
        classified_touch_count: 0,
        first_touch_count: 0,
        first_touch_control_count: 0,
        first_touch_control_share: None,
        contested_touch_count: 0,
        first_touch_intentions: Vec::new(),
        intentions: Vec::new(),
        surfaces: Vec::new(),
    }
}

fn empty_possession_location_summary() -> PossessionLocationSummary {
    possession_location_summary_from_rows(Vec::new())
}

fn build_teammate_controlled_play_summary_query<'args>(
    filters: &'args PossessionStatsQuery,
) -> Option<QueryBuilder<'args, Postgres>> {
    let player = filters.player.as_ref()?;
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT rp.id, rp.replay_id, rp.team, r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    super::replay_set::append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(" AND rp.platform = ");
    query.push_bind(&player.platform);
    query.push(" AND rp.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    query.push(
        r#"
        ),
        teammate_appearances AS MATERIALIZED (
            SELECT DISTINCT teammate.id, teammate.replay_id, target.run_id
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        )
        "#,
    );
    push_possession_span_select(&mut query);
    query
        .push(", (SELECT COUNT(*) FROM teammate_appearances)::bigint AS teammate_appearance_count");
    query.push(
        r#"
        FROM teammate_appearances appearance
        JOIN play_event_player_possession_details detail
          ON detail.replay_player_id = appearance.id
        JOIN play_events event
          ON event.id = detail.event_id
         AND event.analysis_run_id = appearance.run_id
        WHERE TRUE
        "#,
    );
    push_possession_span_filter(&mut query, PossessionSpanFilter::SustainedControl);
    Some(query)
}

async fn load_teammate_controlled_play_summary(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<PossessionTeammateComparison, sqlx::Error> {
    let Some(mut query) = build_teammate_controlled_play_summary_query(filters) else {
        unreachable!("teammate controlled-play summary requires a player filter")
    };
    let row = query.build().fetch_one(pool).await?;
    let (_, summary) = possession_span_summary_from_row(&row)?;
    Ok(PossessionTeammateComparison {
        appearance_count: count_column(&row, "teammate_appearance_count")?,
        controlled_plays: summary,
    })
}

fn push_possession_cohort_ctes<'args>(
    query: &mut QueryBuilder<'args, Postgres>,
    filters: &'args PossessionStatsQuery,
) {
    let player = filters
        .player
        .as_ref()
        .expect("possession cohort query requires a player filter");
    query.push(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT
                rp.id,
                rp.replay_id,
                rp.team,
                rp.active_time_seconds,
                r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    super::replay_set::append_replay_set_filters(query, &filters.replay_set, "r");
    query.push(" AND rp.platform = ");
    query.push_bind(&player.platform);
    query.push(" AND rp.platform_player_id = ");
    query.push_bind(&player.platform_player_id);
    query.push(
        r#"
        ),
        cohort_appearances AS MATERIALIZED (
            SELECT 'player' AS cohort, target.id AS actor_id, target.replay_id, target.team AS actor_team, target.active_time_seconds, target.run_id
            FROM target_appearances target
            UNION ALL
            SELECT 'teammates' AS cohort, actor.id AS actor_id, actor.replay_id, actor.team AS actor_team, actor.active_time_seconds, target.run_id
            FROM target_appearances target
            JOIN replay_players actor
              ON actor.replay_id = target.replay_id
             AND actor.team = target.team
             AND actor.id <> target.id
            UNION ALL
            SELECT 'opponents' AS cohort, actor.id AS actor_id, actor.replay_id, actor.team AS actor_team, actor.active_time_seconds, target.run_id
            FROM target_appearances target
            JOIN replay_players actor
              ON actor.replay_id = target.replay_id
             AND actor.team IS NOT NULL
             AND target.team IS NOT NULL
             AND actor.team <> target.team
        "#,
    );
    query.push(
        r#"
        )
        "#,
    );
}

fn push_possession_cohort_span_select(builder: &mut QueryBuilder<'_, Postgres>) {
    builder.push(
        r#"
        SELECT
            appearance.cohort,
            COUNT(DISTINCT appearance.actor_id) AS appearance_count,
            denominator.active_time_seconds,
            COUNT(DISTINCT detail.replay_id) AS replay_count,
            COUNT(detail.event_id) AS possession_count,
            COALESCE(SUM(detail.duration), 0) AS total_duration,
            AVG(detail.duration) AS avg_duration,
            COALESCE(SUM(detail.touch_count), 0)::bigint AS total_touch_count,
            AVG(detail.touch_count::float8) AS avg_touches,
            COALESCE(SUM(detail.advance_distance), 0) AS total_advance,
            COALESCE(SUM(detail.retreat_distance), 0) AS total_retreat,
            AVG(detail.advance_distance) AS avg_advance,
            AVG(detail.retreat_distance) AS avg_retreat,
            COALESCE(SUM(detail.carry_time), 0) AS carry_time,
            COALESCE(SUM(detail.air_dribble_time), 0) AS air_dribble_time,
            COUNT(detail.event_id) FILTER (WHERE detail.sustained_control) AS sustained_control,
            COUNT(detail.event_id) FILTER (WHERE detail.carry_count > 0) AS with_carry,
            COUNT(detail.event_id) FILTER (WHERE detail.air_dribble_count > 0) AS with_air_dribble,
            COUNT(detail.event_id) FILTER (WHERE detail.aerial_touch_count > 0) AS with_aerial_touch,
            COUNT(detail.event_id) FILTER (WHERE detail.wall_touch_count > 0) AS with_wall_touch
        "#,
    );
    for (index, (_, _, lower, upper)) in DURATION_BUCKETS.iter().enumerate() {
        builder.push(format!(
            ", COUNT(detail.event_id) FILTER (WHERE detail.duration >= {lower}"
        ));
        if let Some(upper) = upper {
            builder.push(format!(" AND detail.duration < {upper}"));
        }
        builder.push(format!(") AS duration_bucket_{index}"));
    }
}

fn build_possession_cohort_span_summary_query<'args>(
    filters: &'args PossessionStatsQuery,
    span_filter: PossessionSpanFilter,
) -> QueryBuilder<'args, Postgres> {
    let mut query = QueryBuilder::<Postgres>::new("");
    push_possession_cohort_ctes(&mut query, filters);
    push_possession_cohort_span_select(&mut query);
    query.push(
        r#"
        FROM cohort_appearances appearance
        LEFT JOIN (
            SELECT cohort, SUM(active_time_seconds) AS active_time_seconds
            FROM cohort_appearances
            GROUP BY cohort
        ) denominator
          ON denominator.cohort = appearance.cohort
        LEFT JOIN (
            SELECT detail.*, event.analysis_run_id
            FROM play_event_player_possession_details detail
            JOIN play_events event ON event.id = detail.event_id
        "#,
    );
    if span_filter == PossessionSpanFilter::SustainedControl {
        query.push(" WHERE detail.sustained_control ");
    }
    query.push(
        r#"
        ) detail
         ON detail.replay_player_id = appearance.actor_id
        AND detail.analysis_run_id = appearance.run_id
        GROUP BY appearance.cohort, denominator.active_time_seconds
        "#,
    );
    query
}

struct PossessionCohortSpanAggregate {
    appearance_count: u64,
    active_time_seconds: Option<f64>,
    summary: PossessionSpanSummary,
}

async fn load_possession_cohort_span_summaries(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
    span_filter: PossessionSpanFilter,
) -> Result<HashMap<String, PossessionCohortSpanAggregate>, sqlx::Error> {
    let mut query = build_possession_cohort_span_summary_query(filters, span_filter);
    let rows = query.build().fetch_all(pool).await?;
    let mut summaries = HashMap::new();
    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        let appearance_count = count_column(&row, "appearance_count")?;
        let active_time_seconds = finite_nonnegative(row.try_get("active_time_seconds")?);
        let (_, summary) = possession_span_summary_from_row(&row)?;
        summaries.insert(
            cohort,
            PossessionCohortSpanAggregate {
                appearance_count,
                active_time_seconds,
                summary,
            },
        );
    }
    Ok(summaries)
}

async fn load_possession_cohort_touch_summaries(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<HashMap<String, PossessionTouchSummary>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new("");
    push_possession_cohort_ctes(&mut query, filters);
    query.push(
        r#"
        SELECT
            appearance.cohort,
            COUNT(*) AS classified_touch_count,
            COUNT(*) FILTER (WHERE detail.first_touch) AS first_touch_count,
            COUNT(*) FILTER (WHERE detail.first_touch AND detail.intention = 'control') AS first_touch_control_count,
            COUNT(*) FILTER (WHERE detail.contested) AS contested_touch_count
        FROM cohort_appearances appearance
        JOIN play_events event
          ON event.replay_id = appearance.replay_id
         AND event.analysis_run_id = appearance.run_id
         AND event.source_stream = 'touch'
        JOIN play_event_touch_details detail
          ON detail.event_id = event.id
         AND detail.intention IS NOT NULL
        JOIN play_event_subjects subject
          ON subject.event_id = event.id
         AND subject.role = 'actor'
         AND subject.subject_kind = 'player'
         AND subject.replay_player_id = appearance.actor_id
        GROUP BY appearance.cohort
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;
    let mut summaries = HashMap::new();
    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        let first_touch_count = count_column(&row, "first_touch_count")?;
        let first_touch_control_count = count_column(&row, "first_touch_control_count")?;
        summaries.insert(
            cohort,
            PossessionTouchSummary {
                classified_touch_count: count_column(&row, "classified_touch_count")?,
                first_touch_count,
                first_touch_control_count,
                first_touch_control_share: (first_touch_count > 0)
                    .then(|| first_touch_control_count as f64 / first_touch_count as f64),
                contested_touch_count: count_column(&row, "contested_touch_count")?,
                first_touch_intentions: Vec::new(),
                intentions: Vec::new(),
                surfaces: Vec::new(),
            },
        );
    }
    Ok(summaries)
}

async fn load_possession_cohort_location_summaries(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<HashMap<String, PossessionLocationSummary>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new("");
    push_possession_cohort_ctes(&mut query, filters);
    query.push(
        r#"
        SELECT
            appearance.cohort,
            payload.payload ->> 'field_third' AS field_third,
            appearance.actor_team AS player_team,
            COALESCE(SUM(COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0)), 0) AS duration
        FROM cohort_appearances appearance
        JOIN play_events event
          ON event.replay_id = appearance.replay_id
         AND event.analysis_run_id = appearance.run_id
         AND event.source_stream = 'possession'
        JOIN play_event_payloads payload ON payload.event_id = event.id
        JOIN play_event_subjects subject
          ON subject.event_id = event.id
         AND subject.subject_kind = 'player'
         AND subject.replay_player_id = appearance.actor_id
        WHERE COALESCE((payload.payload ->> 'active')::boolean, true)
          AND COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0) > 0.0
        GROUP BY appearance.cohort, field_third, player_team
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;
    let mut by_cohort: HashMap<String, Vec<(String, Option<i32>, f64)>> = HashMap::new();
    for row in rows {
        let cohort: String = row.try_get("cohort")?;
        let Some(field_third) = row.try_get::<Option<String>, _>("field_third")? else {
            continue;
        };
        by_cohort.entry(cohort).or_default().push((
            field_third,
            row.try_get("player_team")?,
            row.try_get("duration")?,
        ));
    }

    Ok(by_cohort
        .into_iter()
        .map(|(cohort, rows)| (cohort, possession_location_summary_from_rows(rows)))
        .collect())
}

async fn load_possession_cohort_summaries(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<Vec<PossessionCohortSummary>, sqlx::Error> {
    let mut possessions =
        load_possession_cohort_span_summaries(pool, filters, PossessionSpanFilter::All).await?;
    let mut controlled_plays = load_possession_cohort_span_summaries(
        pool,
        filters,
        PossessionSpanFilter::SustainedControl,
    )
    .await?;
    let mut touches = load_possession_cohort_touch_summaries(pool, filters).await?;
    let mut locations = load_possession_cohort_location_summaries(pool, filters).await?;
    let cohort_order = ["player", "teammates", "opponents"];

    Ok(cohort_order
        .into_iter()
        .filter_map(|key| {
            let possession = possessions.remove(key)?;
            Some(PossessionCohortSummary {
                key: key.to_owned(),
                label: possession_cohort_label(key).to_owned(),
                appearance_count: possession.appearance_count,
                active_time_seconds: possession.active_time_seconds,
                possessions: possession.summary,
                controlled_plays: controlled_plays
                    .remove(key)
                    .map(|aggregate| aggregate.summary)
                    .unwrap_or_else(empty_possession_span_summary),
                touches: touches
                    .remove(key)
                    .unwrap_or_else(empty_possession_touch_summary),
                locations: locations
                    .remove(key)
                    .unwrap_or_else(empty_possession_location_summary),
            })
        })
        .collect())
}

fn possession_cohort_label(key: &str) -> &'static str {
    match key {
        "player" => "Player",
        "teammates" => "Teammates",
        "opponents" => "Opponents",
        _ => "Unknown",
    }
}

fn push_touch_from<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args PossessionStatsQuery,
) {
    builder.push(
        r#"
        FROM replays r
        JOIN play_events event
          ON event.analysis_run_id = r.canonical_analysis_run_id
         AND event.source_stream = 'touch'
        JOIN play_event_touch_details detail ON detail.event_id = event.id
        "#,
    );
    if filters.player.is_some() {
        builder.push(
            r#"
            JOIN play_event_subjects subject ON subject.event_id = event.id
            JOIN replay_players rp ON rp.id = subject.replay_player_id
            "#,
        );
    }
    builder.push(" WHERE r.canonical_analysis_run_id IS NOT NULL ");
    // Facet columns are null for rows indexed before event-stream schema v6;
    // restrict the mix to classified rows so shares are internally consistent.
    builder.push(" AND detail.intention IS NOT NULL ");
    super::replay_set::append_replay_set_filters(builder, &filters.replay_set, "r");
    if let Some(player) = &filters.player {
        builder.push(" AND rp.platform = ");
        builder.push_bind(&player.platform);
        builder.push(" AND rp.platform_player_id = ");
        builder.push_bind(&player.platform_player_id);
    }
}

async fn load_possession_touch_summary(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<PossessionTouchSummary, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            COUNT(*) AS classified_touch_count,
            COUNT(*) FILTER (WHERE detail.first_touch) AS first_touch_count,
            COUNT(*) FILTER (WHERE detail.first_touch AND detail.intention = 'control') AS first_touch_control_count,
            COUNT(*) FILTER (WHERE detail.contested) AS contested_touch_count
        "#,
    );
    push_touch_from(&mut query, filters);
    let row = query.build().fetch_one(pool).await?;

    let first_touch_count = count_column(&row, "first_touch_count")?;
    let first_touch_control_count = count_column(&row, "first_touch_control_count")?;

    let first_touch_intentions = load_touch_mix(
        pool,
        filters,
        "detail.intention",
        Some("detail.first_touch"),
    )
    .await?;
    let intentions = load_touch_mix(pool, filters, "detail.intention", None).await?;
    let surfaces = load_touch_mix(pool, filters, "detail.surface", None).await?;

    Ok(PossessionTouchSummary {
        classified_touch_count: count_column(&row, "classified_touch_count")?,
        first_touch_count,
        first_touch_control_count,
        first_touch_control_share: (first_touch_count > 0)
            .then(|| first_touch_control_count as f64 / first_touch_count as f64),
        contested_touch_count: count_column(&row, "contested_touch_count")?,
        first_touch_intentions,
        intentions,
        surfaces,
    })
}

fn push_possession_event_from<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args PossessionStatsQuery,
) {
    builder.push(
        r#"
        FROM replays r
        JOIN play_events event
          ON event.analysis_run_id = r.canonical_analysis_run_id
         AND event.replay_id = r.id
         AND event.source_stream = 'possession'
        JOIN play_event_payloads payload ON payload.event_id = event.id
        "#,
    );
    if filters.player.is_some() {
        builder.push(
            r#"
            JOIN play_event_subjects subject
              ON subject.event_id = event.id
             AND subject.subject_kind = 'player'
            JOIN replay_players rp ON rp.id = subject.replay_player_id
            "#,
        );
    }
    builder.push(
        r#"
        WHERE r.canonical_analysis_run_id IS NOT NULL
          AND COALESCE((payload.payload ->> 'active')::boolean, true)
          AND COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0) > 0.0
        "#,
    );
    super::replay_set::append_replay_set_filters(builder, &filters.replay_set, "r");
    if let Some(player) = &filters.player {
        builder.push(" AND subject.subject_id = ");
        builder.push_bind(format!("{}:{}", player.platform, player.platform_player_id));
    }
}

async fn load_possession_location_summary(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
) -> Result<PossessionLocationSummary, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            payload.payload ->> 'field_third' AS field_third,
        "#,
    );
    if filters.player.is_some() {
        query.push(" rp.team AS player_team, ");
    } else {
        query.push(" NULL::integer AS player_team, ");
    }
    query.push(
        r#"
            COALESCE(SUM(COALESCE(event.duration_seconds, (payload.payload ->> 'duration')::double precision, 0.0)), 0) AS duration
        "#,
    );
    push_possession_event_from(&mut query, filters);
    query.push(" GROUP BY 1, 2");

    let rows = query.build().fetch_all(pool).await?;
    let rows = rows
        .into_iter()
        .filter_map(|row| {
            let field_third = row.try_get::<Option<String>, _>("field_third").ok()??;
            Some((
                field_third,
                row.try_get("player_team").ok()?,
                row.try_get("duration").ok()?,
            ))
        })
        .collect();

    Ok(possession_location_summary_from_rows(rows))
}

fn possession_location_summary_from_rows(
    rows: Vec<(String, Option<i32>, f64)>,
) -> PossessionLocationSummary {
    let player_relative = rows.iter().any(|(_, player_team, _)| player_team.is_some());
    let mut third_seconds = possession_third_keys(player_relative)
        .into_iter()
        .map(|key| (key, 0.0))
        .collect::<Vec<_>>();
    let mut half_seconds = possession_half_keys(player_relative)
        .into_iter()
        .map(|key| (key, 0.0))
        .collect::<Vec<_>>();

    for (field_third, player_team, duration) in rows {
        let bucket_third = possession_third_key(&field_third, player_team);
        if let Some((_, seconds)) = third_seconds
            .iter_mut()
            .find(|(key, _)| *key == bucket_third)
        {
            *seconds += duration;
        }
        let field_half = field_half_from_third(bucket_third);
        if let Some((_, seconds)) = half_seconds.iter_mut().find(|(key, _)| *key == field_half) {
            *seconds += duration;
        }
    }

    let total_duration_seconds = third_seconds
        .iter()
        .map(|(_, seconds)| *seconds)
        .sum::<f64>();
    let halves = half_seconds
        .into_iter()
        .map(|(key, seconds)| {
            possession_time_bucket(key, field_half_label(key), seconds, total_duration_seconds)
        })
        .collect();
    let thirds = third_seconds
        .into_iter()
        .map(|(key, seconds)| {
            possession_time_bucket(key, field_third_label(key), seconds, total_duration_seconds)
        })
        .collect();

    PossessionLocationSummary {
        total_duration_seconds,
        halves,
        thirds,
    }
}

fn finite_nonnegative(value: Option<f64>) -> Option<f64> {
    value.filter(|value| value.is_finite() && *value >= 0.0)
}

fn possession_time_bucket(
    key: &str,
    label: &str,
    duration_seconds: f64,
    total_duration_seconds: f64,
) -> PossessionTimeBucket {
    PossessionTimeBucket {
        key: key.to_owned(),
        label: label.to_owned(),
        duration_seconds,
        share: (total_duration_seconds > 0.0).then(|| duration_seconds / total_duration_seconds),
    }
}

fn field_half_from_third(field_third: &str) -> &'static str {
    match field_third {
        "own_third" => "own_side",
        "team_zero_third" => "team_zero_side",
        "opponent_third" => "opponent_side",
        "team_one_third" => "team_one_side",
        _ => "neutral",
    }
}

fn possession_third_keys(player_relative: bool) -> Vec<&'static str> {
    if player_relative {
        vec!["own_third", "neutral_third", "opponent_third"]
    } else {
        vec!["team_zero_third", "neutral_third", "team_one_third"]
    }
}

fn possession_half_keys(player_relative: bool) -> Vec<&'static str> {
    if player_relative {
        vec!["own_side", "neutral", "opponent_side"]
    } else {
        vec!["team_zero_side", "neutral", "team_one_side"]
    }
}

fn possession_third_key(field_third: &str, player_team: Option<i32>) -> &'static str {
    match (field_third, player_team) {
        ("team_zero_third", Some(0)) | ("team_one_third", Some(1)) => "own_third",
        ("team_one_third", Some(0)) | ("team_zero_third", Some(1)) => "opponent_third",
        ("team_zero_third", _) => "team_zero_third",
        ("team_one_third", _) => "team_one_third",
        _ => "neutral_third",
    }
}

fn field_third_label(field_third: &str) -> &'static str {
    match field_third {
        "own_third" => "Own third",
        "team_zero_third" => "Blue third",
        "opponent_third" => "Opponent third",
        "team_one_third" => "Orange third",
        _ => "Neutral third",
    }
}

fn field_half_label(field_half: &str) -> &'static str {
    match field_half {
        "own_side" => "Own half",
        "team_zero_side" => "Blue half",
        "opponent_side" => "Opponent half",
        "team_one_side" => "Orange half",
        _ => "Neutral",
    }
}

async fn load_touch_mix(
    pool: &sqlx::PgPool,
    filters: &PossessionStatsQuery,
    expression: &str,
    extra_predicate: Option<&str>,
) -> Result<Vec<PossessionMixValue>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new("SELECT ");
    query.push(expression);
    query.push(" AS key, COUNT(*) AS count");
    push_touch_from(&mut query, filters);
    if let Some(predicate) = extra_predicate {
        query.push(" AND ");
        query.push(predicate);
    }
    query.push(" GROUP BY 1 ORDER BY COUNT(*) DESC, key NULLS LAST");

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            let key: Option<String> = row.try_get("key")?;
            let count = count_column(&row, "count")?;
            Ok(PossessionMixValue {
                display_name: key
                    .as_deref()
                    .map(display_label)
                    .unwrap_or_else(|| "Unknown".to_owned()),
                key,
                count,
            })
        })
        .collect()
}
