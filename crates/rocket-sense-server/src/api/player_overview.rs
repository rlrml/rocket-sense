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
    query::QueryParams,
    replay_set::{
        append_target_player_replay_set_filters, PlayerStatFilter, ReplaySetFilterInput,
        ReplaySetFilters,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "player_overview_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/player-overview", get(get_player_stat_overview))
}

/// Profile-page rollups that the generic event-count aggregates cannot express:
/// goal tag proportions over the player's goals and rotation role/depth time
/// shares summed from the rotation span streams.
#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerStatOverviewResponse {
    pub replay_count: u64,
    pub goals_scored: u64,
    /// Headline goal rate for the player vs the pooled teammate average.
    pub goals: ScoringRateResponse,
    /// Headline assist rate for the player vs the pooled teammate average.
    pub assists: ScoringRateResponse,
    /// Headline shot rate for the player vs the pooled teammate average.
    pub shots: ScoringRateResponse,
    pub goal_tags: Vec<GoalTagAggregateResponse>,
    pub rotation_roles: Vec<RotationTimeShareResponse>,
    pub rotation_depths: Vec<RotationTimeShareResponse>,
}

/// A scoreboard counter expressed as a player rate alongside the pooled
/// teammate average, so the UI can render the same per-minute comparison used
/// elsewhere on the profile.
#[derive(Debug, Serialize, ToSchema)]
pub struct ScoringRateResponse {
    pub count: u64,
    pub per_active_minute: Option<f64>,
    pub teammate_count: u64,
    pub teammate_per_active_minute: Option<f64>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct GoalTagAggregateResponse {
    pub kind: String,
    pub display_name: String,
    pub count: u64,
    /// Fraction of the player's goals carrying this tag, when any goals exist.
    pub share_of_goals: Option<f64>,
    /// Player goals of this type per active minute across the filtered replay set.
    pub per_active_minute: Option<f64>,
    /// Goals of this type scored by the player's teammates, pooled across the
    /// filtered replay set.
    pub teammate_count: u64,
    /// Pooled teammate goals of this type per active minute (the teammate
    /// average to compare the player's rate against).
    pub teammate_per_active_minute: Option<f64>,
    pub avg_confidence: Option<f64>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct RotationTimeShareResponse {
    pub key: String,
    pub display_name: String,
    pub seconds: f64,
    pub span_count: u64,
}

#[derive(Debug)]
struct PlayerOverviewQuery {
    replay_set: ReplaySetFilters,
    player: PlayerStatFilter,
}

impl PlayerOverviewQuery {
    fn from_raw_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
    ) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let replay_set_input = ReplaySetFilterInput::from_query_params(&params)?;
        let replay_set = ReplaySetFilters::from_input(replay_set_input, auth_user_id)?;
        let player = params
            .first(&["player-id", "player_id"])
            .ok_or_else(|| ApiError::bad_request("player-id is required"))
            .and_then(|player_id| PlayerStatFilter::from_query(&player_id))?;

        Ok(Self { replay_set, player })
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/player-overview",
    tag = "stats",
    responses(
        (status = 200, description = "Player profile stat overview (goal tags, rotation time shares)", body = PlayerStatOverviewResponse),
        (status = 400, description = "Player overview filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_stat_overview(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PlayerStatOverviewResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = PlayerOverviewQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
    )?;
    let response = load_player_stat_overview(db, &query)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(response))
}

async fn load_player_stat_overview(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<PlayerStatOverviewResponse, sqlx::Error> {
    let (
        (replay_count, goals_scored),
        mut goal_tags,
        (rotation_roles, rotation_depths),
        (player_active_time_seconds, teammate_active_time_seconds),
        counters,
    ) = tokio::try_join!(
        load_goal_totals(pool, query),
        load_goal_tag_aggregates(pool, query),
        load_rotation_time_shares(pool, query),
        load_goal_rate_denominators(pool, query),
        load_scoring_counters(pool, query),
    )?;
    for tag in &mut goal_tags {
        if goals_scored > 0 {
            tag.share_of_goals = Some(tag.count as f64 / goals_scored as f64);
        }
        tag.per_active_minute = goal_tag_per_minute(tag.count, player_active_time_seconds);
        tag.teammate_per_active_minute =
            goal_tag_per_minute(tag.teammate_count, teammate_active_time_seconds);
    }

    let scoring_rate = |player_count: u64, teammate_count: u64| ScoringRateResponse {
        count: player_count,
        per_active_minute: goal_tag_per_minute(player_count, player_active_time_seconds),
        teammate_count,
        teammate_per_active_minute: goal_tag_per_minute(
            teammate_count,
            teammate_active_time_seconds,
        ),
    };

    Ok(PlayerStatOverviewResponse {
        replay_count,
        goals_scored,
        goals: scoring_rate(counters.player_goals, counters.teammate_goals),
        assists: scoring_rate(counters.player_assists, counters.teammate_assists),
        shots: scoring_rate(counters.player_shots, counters.teammate_shots),
        goal_tags,
        rotation_roles,
        rotation_depths,
    })
}

/// Push the shared `target_appearances` CTE selecting the target player's
/// `replay_players` rows for the filtered replay set.
fn push_target_appearances_cte<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    query: &'args PlayerOverviewQuery,
) {
    builder.push(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT rp.id, rp.replay_id, r.canonical_analysis_run_id AS run_id, rp.team, rp.active_time_seconds, rp.goals, rp.assists, rp.shots
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_replay_set_filters(builder, &query.replay_set, &query.player);
    builder.push(
        r#"
        )
        "#,
    );
}

/// Push a `goal_events` CTE (requires `target_appearances`) selecting the ids
/// of canonical `goal_context` events where the target player is the scorer.
fn push_goal_events_cte(builder: &mut QueryBuilder<'_, Postgres>) {
    builder.push(
        r#"
        , goal_events AS MATERIALIZED (
            SELECT event.id, appearance.replay_id
            FROM target_appearances appearance
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
             AND subject.role = 'scorer'
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = appearance.run_id
            JOIN event_types et
              ON et.id = event.event_type_id
             AND et.key = 'goal_context'
        )
        "#,
    );
}

async fn load_goal_totals(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<(u64, u64), sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_target_appearances_cte(&mut builder, query);
    push_goal_events_cte(&mut builder);
    builder.push(
        r#"
        SELECT
            (SELECT COUNT(DISTINCT replay_id) FROM target_appearances) AS replay_count,
            (SELECT COUNT(*) FROM goal_events) AS goals_scored
        "#,
    );

    let row = builder.build().fetch_one(pool).await?;
    Ok((
        count_column(&row, "replay_count")?,
        count_column(&row, "goals_scored")?,
    ))
}

/// Push a `teammate_goal_events` CTE (requires `target_appearances`) selecting
/// the ids of canonical `goal_context` events scored by any teammate of the
/// target player (same team, same replay) across the filtered replay set.
fn push_teammate_goal_events_cte(builder: &mut QueryBuilder<'_, Postgres>) {
    builder.push(
        r#"
        , teammate_appearances AS MATERIALIZED (
            SELECT DISTINCT teammate.id, r.canonical_analysis_run_id AS run_id
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
            JOIN replays r ON r.id = teammate.replay_id
        )
        , teammate_goal_events AS MATERIALIZED (
            SELECT event.id
            FROM teammate_appearances appearance
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
             AND subject.role = 'scorer'
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = appearance.run_id
            JOIN event_types et
              ON et.id = event.event_type_id
             AND et.key = 'goal_context'
        )
        "#,
    );
}

/// Tag-count aggregation over a goal-events CTE: one row per tag `kind` with a
/// count and average confidence. `source_cte` is the name of a CTE exposing an
/// `id` column of `goal_context` event ids.
fn push_goal_tag_count_select(builder: &mut QueryBuilder<'_, Postgres>, source_cte: &str) {
    builder.push(
        r#"
            SELECT
                tag->>'kind' AS kind,
                COUNT(*) AS tag_count,
                AVG((tag#>>'{metadata,confidence}')::double precision) AS avg_confidence
            FROM "#,
    );
    builder.push(source_cte);
    builder.push(
        r#" goal_event
            JOIN play_event_payloads payload ON payload.event_id = goal_event.id
            CROSS JOIN LATERAL jsonb_array_elements(
                CASE jsonb_typeof(payload.payload->'tags')
                    WHEN 'array' THEN payload.payload->'tags'
                    ELSE '[]'::jsonb
                END
            ) AS tag
            WHERE tag->>'kind' IS NOT NULL
            GROUP BY tag->>'kind'
        "#,
    );
}

/// Load per-kind goal tag counts for the player and the pooled teammate set;
/// `share_of_goals` and the per-minute rates are filled in by the caller once
/// the goal total and active-time denominators are known.
async fn load_goal_tag_aggregates(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<Vec<GoalTagAggregateResponse>, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_target_appearances_cte(&mut builder, query);
    push_goal_events_cte(&mut builder);
    push_teammate_goal_events_cte(&mut builder);
    builder.push(", player_tags AS (");
    push_goal_tag_count_select(&mut builder, "goal_events");
    builder.push("), teammate_tags AS (");
    push_goal_tag_count_select(&mut builder, "teammate_goal_events");
    builder.push(
        r#")
        SELECT
            COALESCE(player_tags.kind, teammate_tags.kind) AS kind,
            COALESCE(player_tags.tag_count, 0) AS tag_count,
            player_tags.avg_confidence AS avg_confidence,
            COALESCE(teammate_tags.tag_count, 0) AS teammate_tag_count
        FROM player_tags
        FULL OUTER JOIN teammate_tags ON player_tags.kind = teammate_tags.kind
        ORDER BY COALESCE(player_tags.tag_count, 0) DESC, COALESCE(player_tags.kind, teammate_tags.kind)
        "#,
    );

    let rows = builder.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            let kind: String = row.try_get("kind")?;
            let count = count_column(&row, "tag_count")?;
            let teammate_count = count_column(&row, "teammate_tag_count")?;
            Ok(GoalTagAggregateResponse {
                display_name: goal_tag_label(&kind),
                share_of_goals: None,
                per_active_minute: None,
                teammate_per_active_minute: None,
                avg_confidence: finite_value(row.try_get("avg_confidence")?),
                kind,
                count,
                teammate_count,
            })
        })
        .collect()
}

/// Active-time denominators (seconds) for the target player and their pooled
/// teammates across the filtered replay set, used to turn goal-tag counts into
/// per-minute rates.
async fn load_goal_rate_denominators(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<(Option<f64>, Option<f64>), sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_target_appearances_cte(&mut builder, query);
    builder.push(
        r#"
        , teammate_appearances AS (
            SELECT DISTINCT teammate.id, teammate.active_time_seconds
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        )
        SELECT
            (SELECT SUM(active_time_seconds) FROM target_appearances) AS player_active_time_seconds,
            (SELECT SUM(active_time_seconds) FROM teammate_appearances) AS teammate_active_time_seconds
        "#,
    );

    let row = builder.build().fetch_one(pool).await?;
    Ok((
        nonnegative_seconds(row.try_get("player_active_time_seconds")?),
        nonnegative_seconds(row.try_get("teammate_active_time_seconds")?),
    ))
}

#[derive(Debug, Default)]
struct ScoringCounters {
    player_goals: u64,
    player_assists: u64,
    player_shots: u64,
    teammate_goals: u64,
    teammate_assists: u64,
    teammate_shots: u64,
}

/// Sum the scoreboard goal/assist/shot counters for the target player and the pooled
/// teammate set across the filtered replay set.
async fn load_scoring_counters(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<ScoringCounters, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_target_appearances_cte(&mut builder, query);
    builder.push(
        r#"
        , teammate_appearances AS (
            SELECT DISTINCT teammate.id, teammate.goals, teammate.assists, teammate.shots
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        )
        SELECT
            (SELECT COALESCE(SUM(goals), 0) FROM target_appearances) AS player_goals,
            (SELECT COALESCE(SUM(assists), 0) FROM target_appearances) AS player_assists,
            (SELECT COALESCE(SUM(shots), 0) FROM target_appearances) AS player_shots,
            (SELECT COALESCE(SUM(goals), 0) FROM teammate_appearances) AS teammate_goals,
            (SELECT COALESCE(SUM(assists), 0) FROM teammate_appearances) AS teammate_assists,
            (SELECT COALESCE(SUM(shots), 0) FROM teammate_appearances) AS teammate_shots
        "#,
    );

    let row = builder.build().fetch_one(pool).await?;
    Ok(ScoringCounters {
        player_goals: count_column(&row, "player_goals")?,
        player_assists: count_column(&row, "player_assists")?,
        player_shots: count_column(&row, "player_shots")?,
        teammate_goals: count_column(&row, "teammate_goals")?,
        teammate_assists: count_column(&row, "teammate_assists")?,
        teammate_shots: count_column(&row, "teammate_shots")?,
    })
}

fn nonnegative_seconds(value: Option<f64>) -> Option<f64> {
    finite_value(value).filter(|seconds| *seconds >= 0.0)
}

fn goal_tag_per_minute(count: u64, denominator_seconds: Option<f64>) -> Option<f64> {
    denominator_seconds
        .filter(|seconds| *seconds > 0.0)
        .map(|seconds| count as f64 * 60.0 / seconds)
}

async fn load_rotation_time_shares(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<
    (
        Vec<RotationTimeShareResponse>,
        Vec<RotationTimeShareResponse>,
    ),
    sqlx::Error,
> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_target_appearances_cte(&mut builder, query);
    builder.push(
        r#"
        SELECT
            event.source_stream AS stream,
            CASE
                WHEN event.source_stream IN ('rotation_role', 'ball_depth') THEN
                    COALESCE(attributes.attributes->>'state', 'unknown')
                ELSE et.key
            END AS key,
            MIN(
                CASE
                    WHEN event.source_stream IN ('rotation_role', 'ball_depth') THEN
                        COALESCE(attributes.attributes->>'state', 'unknown')
                    ELSE et.display_name
                END
            ) AS display_name,
            SUM(event.duration_seconds) AS seconds,
            COUNT(*) AS span_count
        FROM target_appearances appearance
        JOIN play_event_subjects subject
          ON subject.replay_player_id = appearance.id
         AND subject.role = 'actor'
        JOIN play_events event
          ON event.id = subject.event_id
         AND event.analysis_run_id = appearance.run_id
         AND event.source_stream IN ('rotation_role_span', 'rotation_depth_span', 'rotation_role', 'ball_depth')
        JOIN event_types et
          ON et.id = event.event_type_id
        LEFT JOIN play_event_attributes attributes
          ON attributes.event_id = event.id
        WHERE event.duration_seconds IS NOT NULL
        GROUP BY
            event.source_stream,
            CASE
                WHEN event.source_stream IN ('rotation_role', 'ball_depth') THEN
                    COALESCE(attributes.attributes->>'state', 'unknown')
                ELSE et.key
            END
        ORDER BY SUM(event.duration_seconds) DESC, key
        "#,
    );

    let rows = builder.build().fetch_all(pool).await?;
    let mut roles = Vec::new();
    let mut depths = Vec::new();
    for row in rows {
        let stream: String = row.try_get("stream")?;
        let seconds: Option<f64> = row.try_get("seconds")?;
        let share = RotationTimeShareResponse {
            key: row.try_get("key")?,
            display_name: display_label(&row.try_get::<String, _>("display_name")?),
            seconds: finite_value(seconds).unwrap_or(0.0).max(0.0),
            span_count: count_column(&row, "span_count")?,
        };
        match stream.as_str() {
            "rotation_role_span" | "rotation_role" => roles.push(share),
            "rotation_depth_span" | "ball_depth" => depths.push(share),
            _ => {}
        }
    }

    Ok((roles, depths))
}

fn goal_tag_label(kind: &str) -> String {
    display_label(kind.strip_suffix("_goal").unwrap_or(kind))
}
