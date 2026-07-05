use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{
    extract::{RawQuery, State},
    routing::get,
    Json, Router,
};
use serde::{Serialize, Serializer};
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    event_stats::count_column,
    query::QueryParams,
    replay_set::{
        append_replay_set_filters, PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "positioning_stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/positioning/summary", get(get_positioning_summary))
}

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
    pub teammate_role_delta_histogram: PositioningRoleDeltaHistogram,
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

#[derive(Debug, Serialize, ToSchema)]
pub struct PositioningRoleDeltaHistogram {
    /// Target-player 2v2 game samples included in this histogram.
    pub sample_count: u64,
    /// Bucket width in percentage points for non-tail buckets.
    pub bucket_width_pp: f64,
    pub buckets: Vec<PositioningRoleDeltaBucket>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum PositioningRoleDeltaDirection {
    Back,
    Neutral,
    Forward,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PositioningRoleDeltaBucket {
    pub key: String,
    pub label: String,
    pub full_label: String,
    pub direction: PositioningRoleDeltaDirection,
    #[serde(serialize_with = "serialize_f64_option")]
    pub lower_pp: Option<f64>,
    #[serde(serialize_with = "serialize_f64_option")]
    pub upper_pp: Option<f64>,
    pub count: u64,
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
    let mut query = build_positioning_summary_query_materialized(filters);
    let rows = query.build().fetch_all(pool).await?;
    let teammate_role_delta_histogram = load_teammate_role_delta_histogram(pool, filters).await?;

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
        teammate_role_delta_histogram,
    })
}

/// Materialized variant: sum per-(replay, player) positioning durations from
/// `player_replay_positioning` and split into self/teammate/opponent cohorts by
/// joining the target's (replay, team) appearances.
fn build_positioning_summary_query_materialized(
    filters: &PositioningStatsQuery,
) -> QueryBuilder<'_, Postgres> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT pos.replay_id, pos.team AS target_team, pos.analysis_run_id AS run_id
            FROM player_replay_positioning pos
            JOIN replays r
              ON r.id = pos.replay_id
             AND r.canonical_analysis_run_id = pos.analysis_run_id
            WHERE pos.platform = "#,
    );
    query.push_bind(&filters.player.platform);
    query.push(" AND pos.platform_player_id = ");
    query.push_bind(&filters.player.platform_player_id);
    append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(
        r#"
        ),
        cohort AS (
            SELECT 'self'::text AS cohort, pos.*
            FROM target_appearances ta
            JOIN player_replay_positioning pos
              ON pos.replay_id = ta.replay_id
             AND pos.analysis_run_id = ta.run_id
             AND pos.platform = "#,
    );
    query.push_bind(&filters.player.platform);
    query.push(" AND pos.platform_player_id = ");
    query.push_bind(&filters.player.platform_player_id);
    query.push(
        r#"
            UNION ALL
            SELECT 'teammate'::text AS cohort, pos.*
            FROM target_appearances ta
            JOIN player_replay_positioning pos
              ON pos.replay_id = ta.replay_id
             AND pos.analysis_run_id = ta.run_id
             AND pos.team = ta.target_team
             AND NOT (pos.platform = "#,
    );
    query.push_bind(&filters.player.platform);
    query.push(" AND pos.platform_player_id = ");
    query.push_bind(&filters.player.platform_player_id);
    query.push(
        r#")
            UNION ALL
            SELECT 'opponent'::text AS cohort, pos.*
            FROM target_appearances ta
            JOIN player_replay_positioning pos
              ON pos.replay_id = ta.replay_id
             AND pos.analysis_run_id = ta.run_id
             AND pos.team IS NOT NULL
             AND ta.target_team IS NOT NULL
             AND pos.team <> ta.target_team
        )
        SELECT
            cohort,
            COUNT(*) AS appearance_count,
            COALESCE(SUM(active_seconds), 0.0) AS active_seconds,
            COALESCE(SUM(tracked_seconds), 0.0) AS tracked_seconds,
            COALESCE(SUM(defensive_third_seconds), 0.0) AS defensive_third_seconds,
            COALESCE(SUM(neutral_third_seconds), 0.0) AS neutral_third_seconds,
            COALESCE(SUM(offensive_third_seconds), 0.0) AS offensive_third_seconds,
            COALESCE(SUM(defensive_half_seconds), 0.0) AS defensive_half_seconds,
            COALESCE(SUM(offensive_half_seconds), 0.0) AS offensive_half_seconds,
            COALESCE(SUM(behind_ball_seconds), 0.0) AS behind_ball_seconds,
            COALESCE(SUM(level_with_ball_seconds), 0.0) AS level_with_ball_seconds,
            COALESCE(SUM(ahead_of_ball_seconds), 0.0) AS ahead_of_ball_seconds,
            COALESCE(SUM(role_most_back_seconds), 0.0) AS role_most_back_seconds,
            COALESCE(SUM(role_mid_seconds), 0.0) AS role_mid_seconds,
            COALESCE(SUM(role_most_forward_seconds), 0.0) AS role_most_forward_seconds,
            COALESCE(SUM(role_other_seconds), 0.0) AS role_other_seconds,
            COALESCE(SUM(role_no_teammates_seconds), 0.0) AS role_no_teammates_seconds,
            COALESCE(SUM(closest_team_seconds), 0.0) AS closest_team_seconds,
            COALESCE(SUM(closest_absolute_seconds), 0.0) AS closest_absolute_seconds,
            COALESCE(SUM(farthest_seconds), 0.0) AS farthest_seconds,
            COALESCE(SUM(distance_to_ball_weighted), 0.0) AS distance_to_ball_weighted,
            COALESCE(SUM(distance_to_ball_weight), 0.0) AS distance_to_ball_weight,
            COALESCE(SUM(distance_to_teammates_weighted), 0.0) AS distance_to_teammates_weighted,
            COALESCE(SUM(distance_to_teammates_weight), 0.0) AS distance_to_teammates_weight
        FROM cohort
        GROUP BY cohort
        "#,
    );
    query
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

const ROLE_DELTA_BUCKET_WIDTH_PP: f64 = 5.0;
const ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP: f64 = ROLE_DELTA_BUCKET_WIDTH_PP / 2.0;
const ROLE_DELTA_TAIL_BOUNDARY_PP: f64 = 52.5;
const ROLE_DELTA_MIN_ROLE_SECONDS: f64 = 120.0;

async fn load_teammate_role_delta_histogram(
    pool: &sqlx::PgPool,
    filters: &PositioningStatsQuery,
) -> Result<PositioningRoleDeltaHistogram, sqlx::Error> {
    let bucket_templates = role_delta_bucket_templates();
    let mut buckets = bucket_templates
        .into_iter()
        .map(|bucket| PositioningRoleDeltaBucket { count: 0, ..bucket })
        .collect::<Vec<_>>();

    let mut query = build_teammate_role_delta_query(filters);
    let rows = query.build().fetch_all(pool).await?;
    for row in &rows {
        let delta_pp: f64 = row.try_get("delta_pp")?;
        if let Some(bucket) = buckets
            .iter_mut()
            .find(|bucket| role_delta_bucket_contains(bucket, delta_pp))
        {
            bucket.count += 1;
        }
    }

    Ok(PositioningRoleDeltaHistogram {
        sample_count: rows.len() as u64,
        bucket_width_pp: ROLE_DELTA_BUCKET_WIDTH_PP,
        buckets,
    })
}

/// Target-player 2v2 role delta samples. Each row is one target-player game:
///
/// `target most-forward share - teammate most-forward share`
///
/// Negative samples mean the target was more often the deeper teammate; positive
/// samples mean the target was more often furthest forward.
fn build_teammate_role_delta_query(filters: &PositioningStatsQuery) -> QueryBuilder<'_, Postgres> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT
                pos.replay_id,
                pos.analysis_run_id AS run_id,
                pos.player_subject_id,
                pos.team AS target_team,
                pos.role_most_forward_seconds,
                (
                    pos.role_most_back_seconds +
                    pos.role_mid_seconds +
                    pos.role_most_forward_seconds +
                    pos.role_other_seconds +
                    pos.role_no_teammates_seconds
                ) AS role_seconds
            FROM player_replay_positioning pos
            JOIN replays r
              ON r.id = pos.replay_id
             AND r.canonical_analysis_run_id = pos.analysis_run_id
            WHERE pos.platform = "#,
    );
    query.push_bind(&filters.player.platform);
    query.push(" AND pos.platform_player_id = ");
    query.push_bind(&filters.player.platform_player_id);
    query.push(" AND pos.team IN (0, 1)");
    append_replay_set_filters(&mut query, &filters.replay_set, "r");
    query.push(
        r#"
        ),
        team_counts AS MATERIALIZED (
            SELECT pos.replay_id, pos.analysis_run_id AS run_id, pos.team, COUNT(*) AS team_players
            FROM player_replay_positioning pos
            JOIN target_appearances ta
              ON ta.replay_id = pos.replay_id
             AND ta.run_id = pos.analysis_run_id
            WHERE pos.team IN (0, 1)
            GROUP BY pos.replay_id, pos.analysis_run_id, pos.team
        ),
        twos_replays AS MATERIALIZED (
            SELECT replay_id, run_id
            FROM team_counts
            GROUP BY replay_id, run_id
            HAVING COUNT(*) = 2 AND bool_and(team_players = 2)
        )
        SELECT
            (
                ta.role_most_forward_seconds / NULLIF(ta.role_seconds, 0.0) -
                mate.role_most_forward_seconds / NULLIF((
                    mate.role_most_back_seconds +
                    mate.role_mid_seconds +
                    mate.role_most_forward_seconds +
                    mate.role_other_seconds +
                    mate.role_no_teammates_seconds
                ), 0.0)
            ) * 100.0 AS delta_pp
        FROM target_appearances ta
        JOIN twos_replays tr
          ON tr.replay_id = ta.replay_id
         AND tr.run_id = ta.run_id
        JOIN player_replay_positioning mate
          ON mate.replay_id = ta.replay_id
         AND mate.analysis_run_id = ta.run_id
         AND mate.team = ta.target_team
         AND mate.player_subject_id <> ta.player_subject_id
        WHERE ta.role_seconds >= "#,
    );
    query.push_bind(ROLE_DELTA_MIN_ROLE_SECONDS);
    query.push(
        r#"
          AND (
                mate.role_most_back_seconds +
                mate.role_mid_seconds +
                mate.role_most_forward_seconds +
                mate.role_other_seconds +
                mate.role_no_teammates_seconds
              ) >= "#,
    );
    query.push_bind(ROLE_DELTA_MIN_ROLE_SECONDS);
    query
}

fn role_delta_bucket_templates() -> Vec<PositioningRoleDeltaBucket> {
    let mut buckets = Vec::new();
    buckets.push(role_delta_bucket(
        "back-tail",
        format!(">{}", format_pp(ROLE_DELTA_TAIL_BOUNDARY_PP)),
        format!(
            "More most back >{} pp",
            format_pp(ROLE_DELTA_TAIL_BOUNDARY_PP)
        ),
        PositioningRoleDeltaDirection::Back,
        None,
        Some(-ROLE_DELTA_TAIL_BOUNDARY_PP),
    ));

    let mut lower = -ROLE_DELTA_TAIL_BOUNDARY_PP;
    while lower < -ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP {
        let upper = lower + ROLE_DELTA_BUCKET_WIDTH_PP;
        buckets.push(role_delta_bucket(
            &format!("back-{}-{}", bucket_key(lower), bucket_key(upper)),
            format!("{}-{}", format_pp(upper.abs()), format_pp(lower.abs())),
            format!(
                "More most back {}-{} pp",
                format_pp(upper.abs()),
                format_pp(lower.abs())
            ),
            PositioningRoleDeltaDirection::Back,
            Some(lower),
            Some(upper),
        ));
        lower = upper;
    }

    buckets.push(role_delta_bucket(
        "neutral",
        format!(
            "-{}..+{}",
            format_pp(ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP),
            format_pp(ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP)
        ),
        format!(
            "Neutral -{} to +{} pp",
            format_pp(ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP),
            format_pp(ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP)
        ),
        PositioningRoleDeltaDirection::Neutral,
        Some(-ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP),
        Some(ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP),
    ));

    let mut lower = ROLE_DELTA_NEUTRAL_HALF_WIDTH_PP;
    while lower < ROLE_DELTA_TAIL_BOUNDARY_PP {
        let upper = lower + ROLE_DELTA_BUCKET_WIDTH_PP;
        buckets.push(role_delta_bucket(
            &format!("forward-{}-{}", bucket_key(lower), bucket_key(upper)),
            format!("{}-{}", format_pp(lower), format_pp(upper)),
            format!(
                "More most forward {}-{} pp",
                format_pp(lower),
                format_pp(upper)
            ),
            PositioningRoleDeltaDirection::Forward,
            Some(lower),
            Some(upper),
        ));
        lower = upper;
    }

    buckets.push(role_delta_bucket(
        "forward-tail",
        format!(">{}", format_pp(ROLE_DELTA_TAIL_BOUNDARY_PP)),
        format!(
            "More most forward >{} pp",
            format_pp(ROLE_DELTA_TAIL_BOUNDARY_PP)
        ),
        PositioningRoleDeltaDirection::Forward,
        Some(ROLE_DELTA_TAIL_BOUNDARY_PP),
        None,
    ));

    buckets
}

fn role_delta_bucket(
    key: &str,
    label: String,
    full_label: String,
    direction: PositioningRoleDeltaDirection,
    lower_pp: Option<f64>,
    upper_pp: Option<f64>,
) -> PositioningRoleDeltaBucket {
    PositioningRoleDeltaBucket {
        key: key.to_owned(),
        label,
        full_label,
        direction,
        lower_pp,
        upper_pp,
        count: 0,
    }
}

fn role_delta_bucket_contains(bucket: &PositioningRoleDeltaBucket, delta_pp: f64) -> bool {
    match bucket.direction {
        PositioningRoleDeltaDirection::Back if bucket.lower_pp.is_none() => {
            delta_pp < bucket.upper_pp.unwrap_or(0.0)
        }
        PositioningRoleDeltaDirection::Back => {
            delta_pp >= bucket.lower_pp.unwrap_or(f64::NEG_INFINITY)
                && delta_pp < bucket.upper_pp.unwrap_or(f64::INFINITY)
        }
        PositioningRoleDeltaDirection::Neutral => {
            delta_pp >= bucket.lower_pp.unwrap_or(f64::NEG_INFINITY)
                && delta_pp <= bucket.upper_pp.unwrap_or(f64::INFINITY)
        }
        PositioningRoleDeltaDirection::Forward if bucket.upper_pp.is_none() => {
            delta_pp > bucket.lower_pp.unwrap_or(0.0)
        }
        PositioningRoleDeltaDirection::Forward => {
            delta_pp > bucket.lower_pp.unwrap_or(f64::NEG_INFINITY)
                && delta_pp <= bucket.upper_pp.unwrap_or(f64::INFINITY)
        }
    }
}

fn format_pp(value: f64) -> String {
    if value.fract().abs() < f64::EPSILON {
        format!("{}", value as i64)
    } else {
        format!("{value:.1}")
    }
}

fn bucket_key(value: f64) -> String {
    format_pp(value).replace('-', "n").replace('.', "_")
}

fn serialize_f64_option<S>(value: &Option<f64>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    match value {
        Some(value) => serializer.serialize_some(value),
        None => serializer.serialize_none(),
    }
}
