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
    event_stats::{count_column, finite_value},
    query::QueryParams,
    replay_set::{PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters},
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "movement_stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/movement/summary", get(get_movement_summary))
}

const MOVEMENT_SUMMARY_STREAMS: [&str; 2] = ["movement", "powerslide"];
const MOVEMENT_MECHANIC_EVENT_TYPES: [&str; 3] = ["speed_flip", "wavedash", "half_flip"];

#[derive(Debug, Serialize, ToSchema)]
pub struct MovementSummaryResponse {
    pub replay_count: u64,
    pub player: MovementCohortSummary,
    pub teammates: Option<MovementCohortSummary>,
    pub opponents: Option<MovementCohortSummary>,
}

#[derive(Debug, Default, Serialize, ToSchema)]
pub struct MovementCohortSummary {
    pub appearance_count: u64,
    pub active_seconds: f64,
    pub total_distance: f64,
    pub speed_weighted: f64,
    pub speed_weight: f64,
    pub slow_seconds: f64,
    pub boost_seconds: f64,
    pub supersonic_seconds: f64,
    pub ground_seconds: f64,
    pub low_air_seconds: f64,
    pub high_air_seconds: f64,
    pub powerslide_count: u64,
    pub powerslide_seconds: f64,
    pub speed_flips: u64,
    pub wavedashes: u64,
    pub half_flips: u64,
}

#[derive(Debug)]
struct MovementStatsQuery {
    replay_set: ReplaySetFilters,
    player: PlayerStatFilter,
}

impl MovementStatsQuery {
    fn from_raw_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
    ) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let replay_set_input = ReplaySetFilterInput::from_query_params(&params)?;
        let replay_set = ReplaySetFilters::from_input(replay_set_input, auth_user_id)?;
        let player = params
            .first(&["player-id", "player_id"])
            .map(|player_id| PlayerStatFilter::from_query(&player_id))
            .transpose()?
            .ok_or_else(|| ApiError::bad_request("movement summary requires a player-id filter"))?;
        Ok(Self { replay_set, player })
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/movement/summary",
    tag = "stats",
    responses(
        (status = 200, description = "Summarize player vs teammate vs opponent movement over a replay set", body = MovementSummaryResponse),
        (status = 400, description = "Movement stat filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_movement_summary(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<MovementSummaryResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = MovementStatsQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
    )?;
    let response = load_movement_summary(db, &query)
        .await
        .map_err(ApiError::internal)?;
    Ok(Json(response))
}

async fn load_movement_summary(
    pool: &sqlx::PgPool,
    filters: &MovementStatsQuery,
) -> Result<MovementSummaryResponse, sqlx::Error> {
    let mut query = build_movement_summary_query(filters);
    let rows = query.build().fetch_all(pool).await?;

    let mut player = None;
    let mut teammates = None;
    let mut opponents = None;
    for row in &rows {
        let cohort: String = row.try_get("cohort")?;
        let summary = movement_cohort_from_row(row)?;
        match cohort.as_str() {
            "self" => player = Some(summary),
            "teammate" => teammates = Some(summary),
            "opponent" => opponents = Some(summary),
            _ => {}
        }
    }

    let player = player.unwrap_or_default();
    Ok(MovementSummaryResponse {
        replay_count: player.appearance_count,
        player,
        teammates,
        opponents,
    })
}

fn build_movement_summary_query(filters: &MovementStatsQuery) -> QueryBuilder<'_, Postgres> {
    let distance = json_number_expr(
        "payload",
        &[
            "total_distance",
            "distance",
            "distance_traveled",
            "distance_uu",
        ],
    );
    let avg_speed = json_number_expr("payload", &["avg_speed", "average_speed", "speed"]);
    let duration = "duration";
    let slow_seconds = seconds_expr(
        "payload",
        &[
            "time_slow_speed",
            "slow_speed_seconds",
            "slow_speed_time_seconds",
            "time_slow_speed_seconds",
        ],
        duration,
        &["slow_speed", "slow"],
    );
    let boost_seconds = seconds_expr(
        "payload",
        &[
            "time_boost_speed",
            "boost_speed_seconds",
            "boost_speed_time_seconds",
            "time_boost_speed_seconds",
        ],
        duration,
        &["boost_speed", "boost"],
    );
    let supersonic_seconds = seconds_expr(
        "payload",
        &[
            "time_supersonic_speed",
            "supersonic_seconds",
            "supersonic_speed_time_seconds",
            "time_supersonic_speed_seconds",
        ],
        duration,
        &["supersonic_speed", "supersonic"],
    );
    let ground_seconds = seconds_expr(
        "payload",
        &[
            "time_ground",
            "ground_seconds",
            "ground_time_seconds",
            "time_on_ground",
        ],
        duration,
        &["ground", "on_ground"],
    );
    let low_air_seconds = seconds_expr(
        "payload",
        &["time_low_air", "low_air_seconds", "low_air_time_seconds"],
        duration,
        &["low_air", "low"],
    );
    let high_air_seconds = seconds_expr(
        "payload",
        &["time_high_air", "high_air_seconds", "high_air_time_seconds"],
        duration,
        &["high_air", "high"],
    );

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT
                rp.replay_id,
                rp.team AS target_team,
                concat(rp.platform, ':', rp.platform_player_id) AS target_subject_id,
                r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    query.push(" AND rp.platform = ");
    query.push_bind(&filters.player.platform);
    query.push(" AND rp.platform_player_id = ");
    query.push_bind(&filters.player.platform_player_id);
    super::replay_set::append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(
        r#"
        ),
        subject_appearances AS MATERIALIZED (
            SELECT
                CASE
                    WHEN concat(actor.platform, ':', actor.platform_player_id) = ta.target_subject_id THEN 'self'
                    WHEN actor.team = ta.target_team THEN 'teammate'
                    ELSE 'opponent'
                END AS cohort,
                actor.replay_id,
                concat(actor.platform, ':', actor.platform_player_id) AS subject_id,
                ta.run_id,
                GREATEST(COALESCE(actor.active_time_seconds, 0.0), 0.0) AS active_seconds
            FROM target_appearances ta
            JOIN replay_players actor
              ON actor.replay_id = ta.replay_id
             AND actor.platform IS NOT NULL
             AND actor.platform_player_id IS NOT NULL
        ),
        movement_events AS (
            SELECT
                sa.cohort,
                sa.replay_id,
                sa.subject_id,
                event_type.key AS event_type,
                event.source_stream,
                COALESCE(
                    event.duration_seconds,
                    CASE
                        WHEN event.start_time IS NOT NULL AND event.end_time IS NOT NULL
                        THEN GREATEST(event.end_time - event.start_time, 0)
                        ELSE 0
                    END,
                    0
                ) AS duration,
                COALESCE(payload.payload, '{}'::jsonb) AS payload
            FROM subject_appearances sa
            JOIN play_events event
              ON event.replay_id = sa.replay_id
             AND event.analysis_run_id = sa.run_id
             AND event.primary_subject_id = sa.subject_id
            JOIN event_types event_type ON event_type.id = event.event_type_id
            LEFT JOIN play_event_payloads payload ON payload.event_id = event.id
            WHERE event.source_stream = ANY(
        "#,
    );
    query.push_bind(movement_summary_streams());
    query.push(") OR event_type.key = ANY(");
    query.push_bind(movement_mechanic_event_types());
    query.push(
        r#"
            )
        ),
        appearance_aggregates AS (
            SELECT
                cohort,
                COUNT(DISTINCT replay_id::text || ':' || subject_id) AS appearance_count,
                COALESCE(SUM(active_seconds), 0.0) AS active_seconds
            FROM subject_appearances
            GROUP BY cohort
        ),
        event_aggregates AS (
            SELECT
                cohort,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN
        "#,
    );
    query.push(&distance);
    query.push(
        r#"
                    ELSE 0 END), 0.0) AS total_distance,
                COALESCE(SUM(CASE WHEN event_type = 'movement' THEN
        "#,
    );
    query.push(&avg_speed);
    query.push(" * NULLIF(duration, 0) ELSE 0 END), 0.0) AS speed_weighted,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' AND ");
    query.push(&avg_speed);
    query.push(" IS NOT NULL AND duration > 0 THEN duration ELSE 0 END), 0.0) AS speed_weight,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' THEN ");
    query.push(&slow_seconds);
    query.push(" ELSE 0 END), 0.0) AS slow_seconds,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' THEN ");
    query.push(&boost_seconds);
    query.push(" ELSE 0 END), 0.0) AS boost_seconds,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' THEN ");
    query.push(&supersonic_seconds);
    query.push(" ELSE 0 END), 0.0) AS supersonic_seconds,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' THEN ");
    query.push(&ground_seconds);
    query.push(" ELSE 0 END), 0.0) AS ground_seconds,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' THEN ");
    query.push(&low_air_seconds);
    query.push(" ELSE 0 END), 0.0) AS low_air_seconds,");
    query.push(" COALESCE(SUM(CASE WHEN event_type = 'movement' THEN ");
    query.push(&high_air_seconds);
    query.push(
        r#"
                    ELSE 0 END), 0.0) AS high_air_seconds,
                COUNT(*) FILTER (WHERE event_type = 'powerslide') AS powerslide_count,
                COALESCE(SUM(duration) FILTER (WHERE event_type = 'powerslide'), 0.0) AS powerslide_seconds,
                COUNT(*) FILTER (WHERE event_type = 'speed_flip') AS speed_flips,
                COUNT(*) FILTER (WHERE event_type = 'wavedash') AS wavedashes,
                COUNT(*) FILTER (WHERE event_type = 'half_flip') AS half_flips
            FROM movement_events
            GROUP BY cohort
        )
        SELECT
            appearances.cohort,
            appearances.appearance_count,
            appearances.active_seconds,
            COALESCE(events.total_distance, 0.0) AS total_distance,
            COALESCE(events.speed_weighted, 0.0) AS speed_weighted,
            COALESCE(events.speed_weight, 0.0) AS speed_weight,
            COALESCE(events.slow_seconds, 0.0) AS slow_seconds,
            COALESCE(events.boost_seconds, 0.0) AS boost_seconds,
            COALESCE(events.supersonic_seconds, 0.0) AS supersonic_seconds,
            COALESCE(events.ground_seconds, 0.0) AS ground_seconds,
            COALESCE(events.low_air_seconds, 0.0) AS low_air_seconds,
            COALESCE(events.high_air_seconds, 0.0) AS high_air_seconds,
            COALESCE(events.powerslide_count, 0) AS powerslide_count,
            COALESCE(events.powerslide_seconds, 0.0) AS powerslide_seconds,
            COALESCE(events.speed_flips, 0) AS speed_flips,
            COALESCE(events.wavedashes, 0) AS wavedashes,
            COALESCE(events.half_flips, 0) AS half_flips
        FROM appearance_aggregates appearances
        LEFT JOIN event_aggregates events USING (cohort)
        "#,
    );
    query
}

fn movement_summary_streams() -> Vec<String> {
    MOVEMENT_SUMMARY_STREAMS
        .iter()
        .map(|stream| (*stream).to_owned())
        .collect()
}

fn movement_mechanic_event_types() -> Vec<String> {
    MOVEMENT_MECHANIC_EVENT_TYPES
        .iter()
        .map(|event_type| (*event_type).to_owned())
        .collect()
}

fn json_number_expr(payload_alias: &str, keys: &[&str]) -> String {
    let parts = keys
        .iter()
        .map(|key| {
            format!(
                "CASE WHEN jsonb_typeof({payload_alias}->'{key}') = 'number' THEN ({payload_alias}->>'{key}')::float8 END"
            )
        })
        .collect::<Vec<_>>()
        .join(", ");
    format!("COALESCE({parts}, 0.0)")
}

fn seconds_expr(
    payload_alias: &str,
    explicit_keys: &[&str],
    duration_expr: &str,
    states: &[&str],
) -> String {
    let explicit = json_number_expr(payload_alias, explicit_keys);
    let state_checks = states
        .iter()
        .flat_map(|state| {
            [
                format!("{payload_alias}->>'speed_band' = '{state}'"),
                format!("{payload_alias}->>'band' = '{state}'"),
                format!("{payload_alias}->>'speed_state' = '{state}'"),
                format!("{payload_alias}->>'height_band' = '{state}'"),
                format!("{payload_alias}->>'surface' = '{state}'"),
                format!("{payload_alias}->>'air_state' = '{state}'"),
                format!("{payload_alias}->>'state' = '{state}'"),
                format!("{payload_alias}->>'kind' = '{state}'"),
            ]
        })
        .collect::<Vec<_>>()
        .join(" OR ");
    format!(
        "CASE WHEN {explicit} > 0 THEN {explicit} WHEN {state_checks} THEN {duration_expr} ELSE 0 END"
    )
}

fn movement_cohort_from_row(
    row: &sqlx::postgres::PgRow,
) -> Result<MovementCohortSummary, sqlx::Error> {
    Ok(MovementCohortSummary {
        appearance_count: count_column(row, "appearance_count")?,
        active_seconds: nonnegative(row.try_get("active_seconds")?),
        total_distance: nonnegative(row.try_get("total_distance")?),
        speed_weighted: nonnegative(row.try_get("speed_weighted")?),
        speed_weight: nonnegative(row.try_get("speed_weight")?),
        slow_seconds: nonnegative(row.try_get("slow_seconds")?),
        boost_seconds: nonnegative(row.try_get("boost_seconds")?),
        supersonic_seconds: nonnegative(row.try_get("supersonic_seconds")?),
        ground_seconds: nonnegative(row.try_get("ground_seconds")?),
        low_air_seconds: nonnegative(row.try_get("low_air_seconds")?),
        high_air_seconds: nonnegative(row.try_get("high_air_seconds")?),
        powerslide_count: count_column(row, "powerslide_count")?,
        powerslide_seconds: nonnegative(row.try_get("powerslide_seconds")?),
        speed_flips: count_column(row, "speed_flips")?,
        wavedashes: count_column(row, "wavedashes")?,
        half_flips: count_column(row, "half_flips")?,
    })
}

fn nonnegative(value: Option<f64>) -> f64 {
    finite_value(value)
        .filter(|number| *number >= 0.0)
        .unwrap_or(0.0)
}
