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
    event_stats::count_column,
    query::QueryParams,
    replay_set::{PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters},
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "positioning_stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/positioning/summary", get(get_positioning_summary))
}

// Per-facet span streams the positioning page reads. `ball_depth` is emitted
// under the rotation profile-timing list but is a positioning facet here, so it
// is queried by stream name alongside the rest. Retired pre-PlayerStateSpan
// streams (`positioning`, fractional zone payloads) are intentionally excluded;
// the career aggregate only spans reprocessed (>= v6) analysis runs.
const POSITIONING_SUMMARY_STREAMS: [&str; 7] = [
    "player_activity",
    "field_third",
    "field_half",
    "ball_depth",
    "depth_role",
    "ball_proximity",
    "positioning_distance",
];

/// Career positioning summary over a replay set, split into the target player's
/// own spans plus the pooled teammate and opponent cohorts that shared those
/// games. Mirrors the positioning facets the single-game positioning tab
/// renders so the same graph code can compare player vs teammates vs opponents.
#[derive(Debug, Serialize, ToSchema)]
pub struct PositioningSummaryResponse {
    pub replay_count: u64,
    pub player: PositioningCohortSummary,
    pub teammates: Option<PositioningCohortSummary>,
    pub opponents: Option<PositioningCohortSummary>,
}

#[derive(Debug, Default, Serialize, ToSchema)]
pub struct PositioningCohortSummary {
    /// Player-game appearances pooled into this cohort.
    pub appearance_count: u64,
    pub active_seconds: f64,
    pub tracked_seconds: f64,
    pub defensive_third_seconds: f64,
    pub neutral_third_seconds: f64,
    pub offensive_third_seconds: f64,
    pub defensive_half_seconds: f64,
    pub offensive_half_seconds: f64,
    pub behind_ball_seconds: f64,
    pub level_with_ball_seconds: f64,
    pub ahead_of_ball_seconds: f64,
    pub role_most_back_seconds: f64,
    pub role_mid_seconds: f64,
    pub role_most_forward_seconds: f64,
    pub role_other_seconds: f64,
    pub role_no_teammates_seconds: f64,
    pub closest_team_seconds: f64,
    pub closest_absolute_seconds: f64,
    pub farthest_seconds: f64,
    pub distance_to_ball_weighted: f64,
    pub distance_to_ball_weight: f64,
    pub distance_to_teammates_weighted: f64,
    pub distance_to_teammates_weight: f64,
}

#[derive(Debug)]
struct PositioningStatsQuery {
    replay_set: ReplaySetFilters,
    player: PlayerStatFilter,
}

impl PositioningStatsQuery {
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
            .ok_or_else(|| {
                ApiError::bad_request("positioning summary requires a player-id filter")
            })?;
        Ok(Self { replay_set, player })
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/positioning/summary",
    tag = "stats",
    responses(
        (status = 200, description = "Summarize player vs teammate vs opponent positioning over a replay set", body = PositioningSummaryResponse),
        (status = 400, description = "Positioning stat filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_positioning_summary(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PositioningSummaryResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = PositioningStatsQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
    )?;
    let response = load_positioning_summary(db, &query)
        .await
        .map_err(ApiError::internal)?;
    Ok(Json(response))
}

async fn load_positioning_summary(
    pool: &sqlx::PgPool,
    filters: &PositioningStatsQuery,
) -> Result<PositioningSummaryResponse, sqlx::Error> {
    let mut query = build_positioning_summary_query(filters);
    let rows = query.build().fetch_all(pool).await?;

    let mut player = None;
    let mut teammates = None;
    let mut opponents = None;
    for row in &rows {
        let cohort: String = row.try_get("cohort")?;
        let summary = positioning_cohort_from_row(row)?;
        match cohort.as_str() {
            "self" => player = Some(summary),
            "teammate" => teammates = Some(summary),
            "opponent" => opponents = Some(summary),
            _ => {}
        }
    }

    let player = player.unwrap_or_default();
    Ok(PositioningSummaryResponse {
        replay_count: player.appearance_count,
        player,
        teammates,
        opponents,
    })
}

fn build_positioning_summary_query(filters: &PositioningStatsQuery) -> QueryBuilder<'_, Postgres> {
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
        positioning_events AS (
            SELECT
                CASE
                    WHEN event.primary_subject_id = ta.target_subject_id THEN 'self'
                    WHEN actor.team = ta.target_team THEN 'teammate'
                    ELSE 'opponent'
                END AS cohort,
                event.replay_id AS replay_id,
                event.primary_subject_id AS subject_id,
                event.source_stream AS stream,
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
            FROM target_appearances ta
            JOIN play_events event
              ON event.replay_id = ta.replay_id
             AND event.analysis_run_id = ta.run_id
             AND event.source_stream = ANY(
        "#,
    );
    query.push_bind(positioning_summary_streams());
    query.push(
        r#"
             )
            JOIN replay_players actor
              ON actor.replay_id = event.replay_id
             AND actor.platform IS NOT NULL
             AND actor.platform_player_id IS NOT NULL
             AND concat(actor.platform, ':', actor.platform_player_id) = event.primary_subject_id
            LEFT JOIN play_event_payloads payload ON payload.event_id = event.id
        )
        SELECT
            cohort,
            COUNT(DISTINCT replay_id::text || ':' || subject_id) AS appearance_count,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'player_activity'), 0.0) AS active_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third'), 0.0) AS tracked_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third' AND payload->>'state' = 'defensive'), 0.0) AS defensive_third_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third' AND payload->>'state' = 'neutral'), 0.0) AS neutral_third_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_third' AND payload->>'state' = 'offensive'), 0.0) AS offensive_third_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_half' AND payload->>'state' = 'defensive'), 0.0) AS defensive_half_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'field_half' AND payload->>'state' = 'offensive'), 0.0) AS offensive_half_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_depth' AND payload->>'state' = 'behind_ball'), 0.0) AS behind_ball_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_depth' AND payload->>'state' = 'level_with_ball'), 0.0) AS level_with_ball_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_depth' AND payload->>'state' = 'ahead_of_ball'), 0.0) AS ahead_of_ball_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'most_back'), 0.0) AS role_most_back_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'mid'), 0.0) AS role_mid_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'most_forward'), 0.0) AS role_most_forward_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'other'), 0.0) AS role_other_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'depth_role' AND payload->>'state' = 'no_teammates'), 0.0) AS role_no_teammates_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_proximity' AND payload->'state'->>'closest_to_ball_team' = 'true'), 0.0) AS closest_team_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_proximity' AND payload->'state'->>'closest_to_ball_absolute' = 'true'), 0.0) AS closest_absolute_seconds,
            COALESCE(SUM(duration) FILTER (WHERE stream = 'ball_proximity' AND payload->'state'->>'farthest_from_ball' = 'true'), 0.0) AS farthest_seconds,
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_ball') = 'number' THEN (payload->>'distance_to_ball')::float8 * duration ELSE 0 END), 0.0) AS distance_to_ball_weighted,
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_ball') = 'number' THEN duration ELSE 0 END), 0.0) AS distance_to_ball_weight,
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_teammates') = 'number' THEN (payload->>'distance_to_teammates')::float8 * duration ELSE 0 END), 0.0) AS distance_to_teammates_weighted,
            COALESCE(SUM(CASE WHEN stream = 'positioning_distance' AND jsonb_typeof(payload->'distance_to_teammates') = 'number' THEN duration ELSE 0 END), 0.0) AS distance_to_teammates_weight
        FROM positioning_events
        GROUP BY cohort
        "#,
    );
    query
}

fn positioning_summary_streams() -> Vec<String> {
    POSITIONING_SUMMARY_STREAMS
        .iter()
        .map(|stream| (*stream).to_owned())
        .collect()
}

fn positioning_cohort_from_row(
    row: &sqlx::postgres::PgRow,
) -> Result<PositioningCohortSummary, sqlx::Error> {
    Ok(PositioningCohortSummary {
        appearance_count: count_column(row, "appearance_count")?,
        active_seconds: row.try_get("active_seconds")?,
        tracked_seconds: row.try_get("tracked_seconds")?,
        defensive_third_seconds: row.try_get("defensive_third_seconds")?,
        neutral_third_seconds: row.try_get("neutral_third_seconds")?,
        offensive_third_seconds: row.try_get("offensive_third_seconds")?,
        defensive_half_seconds: row.try_get("defensive_half_seconds")?,
        offensive_half_seconds: row.try_get("offensive_half_seconds")?,
        behind_ball_seconds: row.try_get("behind_ball_seconds")?,
        level_with_ball_seconds: row.try_get("level_with_ball_seconds")?,
        ahead_of_ball_seconds: row.try_get("ahead_of_ball_seconds")?,
        role_most_back_seconds: row.try_get("role_most_back_seconds")?,
        role_mid_seconds: row.try_get("role_mid_seconds")?,
        role_most_forward_seconds: row.try_get("role_most_forward_seconds")?,
        role_other_seconds: row.try_get("role_other_seconds")?,
        role_no_teammates_seconds: row.try_get("role_no_teammates_seconds")?,
        closest_team_seconds: row.try_get("closest_team_seconds")?,
        closest_absolute_seconds: row.try_get("closest_absolute_seconds")?,
        farthest_seconds: row.try_get("farthest_seconds")?,
        distance_to_ball_weighted: row.try_get("distance_to_ball_weighted")?,
        distance_to_ball_weight: row.try_get("distance_to_ball_weight")?,
        distance_to_teammates_weighted: row.try_get("distance_to_teammates_weighted")?,
        distance_to_teammates_weight: row.try_get("distance_to_teammates_weight")?,
    })
}
