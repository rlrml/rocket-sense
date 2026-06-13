use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{
    Json, Router,
    extract::{RawQuery, State},
    routing::get,
};
use serde::Serialize;
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    event_stats::{count_column, display_label, finite_value},
    query::QueryParams,
    replay_set::{PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters},
    replays::{ApiError, require_db},
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
#[derive(Debug, Serialize, ToSchema)]
pub struct PossessionSummaryResponse {
    pub replay_count: u64,
    pub possessions: PossessionSpanSummary,
    pub controlled_plays: PossessionSpanSummary,
    pub teammates: Option<PossessionTeammateComparison>,
    pub touches: PossessionTouchSummary,
    pub locations: PossessionLocationSummary,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PossessionTeammateComparison {
    pub appearance_count: u64,
    pub controlled_plays: PossessionSpanSummary,
}

#[derive(Debug, Serialize, ToSchema)]
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

#[derive(Debug, Serialize, ToSchema)]
pub struct PossessionDurationBucket {
    pub key: String,
    pub label: String,
    pub count: u64,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PossessionLocationSummary {
    pub total_duration_seconds: f64,
    pub halves: Vec<PossessionTimeBucket>,
    pub thirds: Vec<PossessionTimeBucket>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PossessionTimeBucket {
    pub key: String,
    pub label: String,
    pub duration_seconds: f64,
    pub share: Option<f64>,
}

#[derive(Debug, Serialize, ToSchema)]
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

#[derive(Debug, Serialize, ToSchema)]
pub struct PossessionMixValue {
    pub key: Option<String>,
    pub display_name: String,
    pub count: u64,
}

#[derive(Debug)]
struct PossessionStatsQuery {
    replay_set: ReplaySetFilters,
    player: Option<PlayerStatFilter>,
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
    ) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let replay_set_input = ReplaySetFilterInput::from_query_params(&params)?;
        let replay_set = ReplaySetFilters::from_input(replay_set_input, auth_user_id)?;
        Ok(Self {
            replay_set,
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
    let (replay_count, possessions) =
        load_possession_span_summary(pool, filters, PossessionSpanFilter::All).await?;
    let (_, controlled_plays) =
        load_possession_span_summary(pool, filters, PossessionSpanFilter::SustainedControl).await?;
    let teammates = if filters.player.is_some() {
        Some(load_teammate_controlled_play_summary(pool, filters).await?)
    } else {
        None
    };
    let touches = load_possession_touch_summary(pool, filters).await?;
    let locations = load_possession_location_summary(pool, filters).await?;
    Ok(PossessionSummaryResponse {
        replay_count,
        possessions,
        controlled_plays,
        teammates,
        touches,
        locations,
    })
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
    let player_relative = filters.player.is_some();
    let mut third_seconds = possession_third_keys(player_relative)
        .into_iter()
        .map(|key| (key, 0.0))
        .collect::<Vec<_>>();
    let mut half_seconds = possession_half_keys(player_relative)
        .into_iter()
        .map(|key| (key, 0.0))
        .collect::<Vec<_>>();

    for row in rows {
        let field_third: Option<String> = row.try_get("field_third")?;
        let player_team: Option<i32> = row.try_get("player_team")?;
        let duration: f64 = row.try_get("duration")?;
        let Some(field_third) = field_third.as_deref() else {
            continue;
        };
        let bucket_third = possession_third_key(field_third, player_team);
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

    Ok(PossessionLocationSummary {
        total_duration_seconds,
        halves,
        thirds,
    })
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
