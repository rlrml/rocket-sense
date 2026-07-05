use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{
    extract::{RawQuery, State},
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    query::{parse_u32_filter, QueryParams},
    replay_set::{
        append_target_player_replay_set_filters, PlayerStatFilter, ReplaySetFilterInput,
        ReplaySetFilters,
    },
    replays::{require_db, ApiError},
};

const DEFAULT_PAGE_SIZE: u32 = 1000;
const MAX_PAGE_SIZE: u32 = 2000;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/game-outcomes", get(get_player_game_outcomes))
}

/// One game's outcome from the target player's perspective: their team's score,
/// the opponents' score, and the player's own goal contribution. The frontend
/// derives every Outcomes distribution (win rate, margin histogram, scoreline
/// heatmap, goal-count histograms) from these rows client-side.
#[derive(Debug, Serialize, ToSchema)]
pub struct GameOutcomeResponse {
    pub replay_id: Uuid,
    pub replay_date: Option<DateTime<Utc>>,
    pub playlist: Option<String>,
    /// Team index (0 or 1) the target player was on.
    pub player_team: i32,
    /// Goals scored by the player's team.
    pub team_score: i32,
    /// Goals scored by the opposing team.
    pub opponent_score: i32,
    /// Goals credited to the target player on the scoreboard.
    pub player_goals: i32,
    /// Team goals not credited to the player (clamped at zero in case own-goal
    /// accounting ever puts the player's tally above the team score).
    pub teammate_goals: i32,
    /// `true` = win, `false` = loss, `null` = tie (equal scores — rare;
    /// typically disconnects/forfeits that ended level).
    pub won: Option<bool>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct GameOutcomesResponse {
    pub games: Vec<GameOutcomeResponse>,
    /// Number of rows in this page.
    pub count: u32,
    /// Offset this page started at.
    pub offset: u32,
    /// Total qualifying games across all pages.
    pub total_count: u64,
    /// Offset of the next page, or `null` when this page exhausted the set.
    pub next_offset: Option<u32>,
}

#[derive(Debug)]
struct GameOutcomesQuery {
    replay_set: ReplaySetFilters,
    player: PlayerStatFilter,
    count: u32,
    offset: u32,
}

impl GameOutcomesQuery {
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
        let count = params
            .first(&["count"])
            .map(|value| parse_u32_filter("count", &value))
            .transpose()?
            .unwrap_or(DEFAULT_PAGE_SIZE)
            .clamp(1, MAX_PAGE_SIZE);
        let offset = params
            .first(&["offset"])
            .map(|value| parse_u32_filter("offset", &value))
            .transpose()?
            .unwrap_or(0);

        Ok(Self {
            replay_set,
            player,
            count,
            offset,
        })
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/game-outcomes",
    tag = "stats",
    responses(
        (status = 200, description = "Per-game outcome rows (team/opponent/player goal counts) for the target player's filtered replay set", body = GameOutcomesResponse),
        (status = 400, description = "Game-outcome filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_game_outcomes(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<GameOutcomesResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = GameOutcomesQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
    )?;
    let response = load_game_outcomes(db, &query)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(response))
}

async fn load_game_outcomes(
    pool: &sqlx::PgPool,
    query: &GameOutcomesQuery,
) -> Result<GameOutcomesResponse, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new(
        // The target player's appearances joined to their replays, projected to
        // the player's perspective (team score vs opponent score). Rows without
        // team scores or a team assignment (unprocessed/odd replays, spectators)
        // carry no outcome and are excluded.
        r#"
        WITH target_games AS (
            SELECT
                rp.replay_id,
                r.replay_date,
                r.playlist,
                rp.team AS player_team,
                CASE WHEN rp.team = 0 THEN r.team_zero_score ELSE r.team_one_score END AS team_score,
                CASE WHEN rp.team = 0 THEN r.team_one_score ELSE r.team_zero_score END AS opponent_score,
                COALESCE(rp.goals, 0) AS player_goals
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_replay_set_filters(&mut builder, &query.replay_set, &query.player);
    builder.push(
        r#"
              AND rp.team IS NOT NULL
              AND r.team_zero_score IS NOT NULL
              AND r.team_one_score IS NOT NULL
        )
        SELECT
            replay_id,
            replay_date,
            playlist,
            player_team,
            team_score,
            opponent_score,
            player_goals,
            GREATEST(team_score - player_goals, 0) AS teammate_goals,
            COUNT(*) OVER () AS total_count
        FROM target_games
        ORDER BY replay_date DESC NULLS LAST, replay_id
        LIMIT
        "#,
    );
    builder.push_bind(i64::from(query.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(query.offset));

    let rows = builder.build().fetch_all(pool).await?;
    // `COUNT(*) OVER ()` only exists on returned rows; an empty page past the
    // end of the set reports the page boundary itself as the floor.
    let total_count = rows
        .first()
        .map(|row| row.try_get::<i64, _>("total_count"))
        .transpose()?
        .map(|count| count.max(0) as u64)
        .unwrap_or(u64::from(query.offset));

    let games = rows
        .iter()
        .map(|row| {
            let team_score = row.try_get::<i32, _>("team_score")?;
            let opponent_score = row.try_get::<i32, _>("opponent_score")?;
            Ok(GameOutcomeResponse {
                replay_id: row.try_get("replay_id")?,
                replay_date: row.try_get("replay_date")?,
                playlist: row.try_get("playlist")?,
                player_team: row.try_get("player_team")?,
                team_score,
                opponent_score,
                player_goals: row.try_get("player_goals")?,
                teammate_goals: row.try_get("teammate_goals")?,
                won: match team_score.cmp(&opponent_score) {
                    std::cmp::Ordering::Greater => Some(true),
                    std::cmp::Ordering::Less => Some(false),
                    std::cmp::Ordering::Equal => None,
                },
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()?;

    let count = games.len() as u32;
    let next_offset = if u64::from(query.offset) + u64::from(count) < total_count && count > 0 {
        Some(query.offset + count)
    } else {
        None
    };

    Ok(GameOutcomesResponse {
        games,
        count,
        offset: query.offset,
        total_count,
        next_offset,
    })
}
