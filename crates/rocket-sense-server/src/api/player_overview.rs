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
    pub goal_tags: Vec<GoalTagAggregateResponse>,
    pub rotation_roles: Vec<RotationTimeShareResponse>,
    pub rotation_depths: Vec<RotationTimeShareResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct GoalTagAggregateResponse {
    pub kind: String,
    pub display_name: String,
    pub count: u64,
    /// Fraction of the player's goals carrying this tag, when any goals exist.
    pub share_of_goals: Option<f64>,
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
    let ((replay_count, goals_scored), mut goal_tags, (rotation_roles, rotation_depths)) = tokio::try_join!(
        load_goal_totals(pool, query),
        load_goal_tag_aggregates(pool, query),
        load_rotation_time_shares(pool, query),
    )?;
    if goals_scored > 0 {
        for tag in &mut goal_tags {
            tag.share_of_goals = Some(tag.count as f64 / goals_scored as f64);
        }
    }

    Ok(PlayerStatOverviewResponse {
        replay_count,
        goals_scored,
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
            SELECT rp.id, rp.replay_id, r.canonical_analysis_run_id AS run_id
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

/// Load per-kind goal tag counts; `share_of_goals` is filled in by the caller
/// once the goal total is known.
async fn load_goal_tag_aggregates(
    pool: &sqlx::PgPool,
    query: &PlayerOverviewQuery,
) -> Result<Vec<GoalTagAggregateResponse>, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_target_appearances_cte(&mut builder, query);
    push_goal_events_cte(&mut builder);
    builder.push(
        r#"
        SELECT
            tag->>'kind' AS kind,
            COUNT(*) AS tag_count,
            AVG((tag#>>'{metadata,confidence}')::double precision) AS avg_confidence
        FROM goal_events goal_event
        JOIN play_event_payloads payload ON payload.event_id = goal_event.id
        CROSS JOIN LATERAL jsonb_array_elements(
            CASE jsonb_typeof(payload.payload->'tags')
                WHEN 'array' THEN payload.payload->'tags'
                ELSE '[]'::jsonb
            END
        ) AS tag
        WHERE tag->>'kind' IS NOT NULL
        GROUP BY tag->>'kind'
        ORDER BY COUNT(*) DESC, tag->>'kind'
        "#,
    );

    let rows = builder.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            let kind: String = row.try_get("kind")?;
            let count = count_column(&row, "tag_count")?;
            Ok(GoalTagAggregateResponse {
                display_name: goal_tag_label(&kind),
                share_of_goals: None,
                avg_confidence: finite_value(row.try_get("avg_confidence")?),
                kind,
                count,
            })
        })
        .collect()
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
            et.key,
            MIN(et.display_name) AS display_name,
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
        WHERE event.duration_seconds IS NOT NULL
        GROUP BY event.source_stream, et.key
        ORDER BY SUM(event.duration_seconds) DESC, et.key
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
            display_name: row.try_get("display_name")?,
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
