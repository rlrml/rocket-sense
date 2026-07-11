use axum::{
    extract::{RawQuery, State},
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Duration, Utc};
use serde::Serialize;
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::{app::AppState, auth::OptionalAuthUser};

use super::{
    query::QueryParams,
    replay_set::{
        append_target_player_replay_set_filters, push_playlist_group_key_expression,
        PlayerStatFilter, ReplaySetFilterInput, ReplaySetFilters,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "player_timeline_tests.rs"]
mod tests;

/// New session when consecutive game starts are further apart than this.
const DEFAULT_SESSION_GAP_MINUTES: u32 = 30;
const MIN_SESSION_GAP_MINUTES: u32 = 5;
const MAX_SESSION_GAP_MINUTES: u32 = 360;

const DEFAULT_POINT_LIMIT: u32 = 2000;
const MAX_POINT_LIMIT: u32 = 5000;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/player-timeline", get(get_player_timeline))
}

/// A player's per-replay rank/outcome history over the filtered replay set,
/// with replays clustered into play sessions by temporal proximity. Powers the
/// profile timeline page: the MMR-over-time chart and the session list that
/// links into period-scoped career stats.
#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerTimelineResponse {
    /// One point per replay appearance, ordered oldest first.
    pub points: Vec<PlayerTimelinePoint>,
    /// Gap-clustered sessions covering `points`, ordered oldest first.
    pub sessions: Vec<PlayerTimelineSession>,
    /// The gap threshold the sessions were computed with.
    pub session_gap_minutes: u32,
    /// True when `limit` clipped older replays: `points` covers only the most
    /// recent games and the oldest session may be partially represented.
    pub truncated: bool,
    /// The season code `season=current` resolved to, when it was requested.
    pub resolved_season: Option<String>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerTimelinePoint {
    pub replay_id: Uuid,
    pub replay_date: DateTime<Utc>,
    /// Canonical playlist group key (e.g. `ranked-2v2`), when derivable.
    pub playlist_group: Option<String>,
    pub season: Option<String>,
    pub rank_tier: Option<i32>,
    pub rank_division: Option<i32>,
    pub rank_mmr: Option<f64>,
    /// True when the rank fields were not submitted with this replay and were
    /// carried forward from the player's nearest earlier point in the same
    /// playlist group (display affordance; mirrors the replay-list fallback).
    pub rank_is_fallback: bool,
    /// `win` / `loss`, or null for ties and replays missing scores or team.
    pub outcome: Option<String>,
    /// Index into `sessions`, 0-based oldest first.
    pub session_index: u32,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerTimelineSession {
    pub session_index: u32,
    /// `replay_date` of the session's first game (game start).
    pub start: DateTime<Utc>,
    /// `replay_date` of the session's last game (that game's start, not end).
    pub end: DateTime<Utc>,
    pub replay_count: u32,
    pub wins: u32,
    pub losses: u32,
    /// First/last directly-submitted MMR in the session (fallback values are
    /// excluded so a session's delta only reflects real submissions).
    pub start_mmr: Option<f64>,
    pub end_mmr: Option<f64>,
}

#[derive(Debug)]
struct PlayerTimelineQuery {
    replay_set: ReplaySetFilters,
    player: PlayerStatFilter,
    session_gap_minutes: u32,
    limit: u32,
    /// `season=current` was requested; resolve against the database and swap
    /// the concrete code into `replay_set.seasons` before querying.
    wants_current_season: bool,
}

impl PlayerTimelineQuery {
    fn from_raw_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
    ) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let mut replay_set_input = ReplaySetFilterInput::from_query_params(&params)?;
        let season_count = replay_set_input.seasons.len();
        replay_set_input
            .seasons
            .retain(|season| !season.trim().eq_ignore_ascii_case("current"));
        let wants_current_season = replay_set_input.seasons.len() != season_count;
        let replay_set = ReplaySetFilters::from_input(replay_set_input, auth_user_id)?;
        let player = params
            .first(&["player-id", "player_id"])
            .ok_or_else(|| ApiError::bad_request("player-id is required"))
            .and_then(|player_id| PlayerStatFilter::from_query(&player_id))?;
        let session_gap_minutes = parse_clamped_u32(
            &params,
            &["session-gap-minutes", "session_gap_minutes"],
            DEFAULT_SESSION_GAP_MINUTES,
            MIN_SESSION_GAP_MINUTES,
            MAX_SESSION_GAP_MINUTES,
        )?;
        let limit =
            parse_clamped_u32(&params, &["limit"], DEFAULT_POINT_LIMIT, 1, MAX_POINT_LIMIT)?;

        Ok(Self {
            replay_set,
            player,
            session_gap_minutes,
            limit,
            wants_current_season,
        })
    }
}

fn parse_clamped_u32(
    params: &QueryParams,
    aliases: &[&str],
    default: u32,
    min: u32,
    max: u32,
) -> Result<u32, ApiError> {
    let Some(value) = params.first(aliases) else {
        return Ok(default);
    };
    let parsed: u32 = value
        .trim()
        .parse()
        .map_err(|_| ApiError::bad_request(format!("{} must be a positive integer", aliases[0])))?;
    Ok(parsed.clamp(min, max))
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/player-timeline",
    tag = "stats",
    responses(
        (status = 200, description = "Per-replay rank/outcome timeline with session clustering", body = PlayerTimelineResponse),
        (status = 400, description = "Timeline filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_timeline(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PlayerTimelineResponse>, ApiError> {
    let db = require_db(&state)?;
    let mut query = PlayerTimelineQuery::from_raw_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|user| user.id),
    )?;
    super::visibility::enforce_stat_scope_visibility(
        &state,
        db,
        Some(&query.player),
        &query.replay_set,
        auth_user.as_ref(),
    )
    .await?;

    let mut resolved_season = None;
    if query.wants_current_season {
        match crate::processing::resolve_current_season(db)
            .await
            .map_err(ApiError::internal)?
        {
            Some(code) => {
                query.replay_set.seasons.push(code.clone());
                query.replay_set.seasons.sort();
                query.replay_set.seasons.dedup();
                resolved_season = Some(code);
            }
            // No season data exists at all; an unfiltered response would
            // silently widen "current season" to all-time, so return empty.
            None => {
                return Ok(Json(PlayerTimelineResponse {
                    points: Vec::new(),
                    sessions: Vec::new(),
                    session_gap_minutes: query.session_gap_minutes,
                    truncated: false,
                    resolved_season: None,
                }))
            }
        }
    }

    let (mut points, truncated) = load_timeline_points(db, &query)
        .await
        .map_err(ApiError::internal)?;
    fill_fallback_ranks(&mut points);
    let sessions = assign_sessions(&mut points, query.session_gap_minutes);

    Ok(Json(PlayerTimelineResponse {
        points,
        sessions,
        session_gap_minutes: query.session_gap_minutes,
        truncated,
        resolved_season,
    }))
}

/// Fetch the player's most recent `limit` replay appearances matching the
/// filters, returned oldest first, plus whether older rows were clipped.
async fn load_timeline_points(
    pool: &sqlx::PgPool,
    query: &PlayerTimelineQuery,
) -> Result<(Vec<PlayerTimelinePoint>, bool), sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new(
        r#"
        SELECT r.id AS replay_id,
               r.replay_date,
               r.season,
               rp.rank_tier,
               rp.rank_division,
               rp.rank_mmr,
               CASE
                   WHEN rp.team IS NULL
                       OR r.team_zero_score IS NULL
                       OR r.team_one_score IS NULL
                       OR r.team_zero_score = r.team_one_score THEN NULL
                   WHEN (rp.team = 0) = (r.team_zero_score > r.team_one_score) THEN 'win'
                   ELSE 'loss'
               END AS outcome,
        "#,
    );
    push_playlist_group_key_expression(&mut builder, "r");
    builder.push(
        r#" AS playlist_group
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_replay_set_filters(&mut builder, &query.replay_set, &query.player);
    builder.push(
        r#"
          AND r.replay_date IS NOT NULL
          AND r.canonical_analysis_run_id IS NOT NULL
        ORDER BY r.replay_date DESC, r.id DESC
        LIMIT "#,
    );
    // One extra row so truncation is detectable without a second count query.
    builder.push_bind(query.limit as i64 + 1);

    let mut rows = builder.build().fetch_all(pool).await?;
    let truncated = rows.len() > query.limit as usize;
    rows.truncate(query.limit as usize);
    // DESC + LIMIT keeps the most recent games; present oldest first.
    rows.reverse();

    let points = rows
        .into_iter()
        .map(|row| {
            Ok(PlayerTimelinePoint {
                replay_id: row.try_get("replay_id")?,
                replay_date: row.try_get("replay_date")?,
                playlist_group: row.try_get("playlist_group")?,
                season: row.try_get("season")?,
                rank_tier: row.try_get("rank_tier")?,
                rank_division: row.try_get("rank_division")?,
                rank_mmr: row.try_get("rank_mmr")?,
                rank_is_fallback: false,
                outcome: row.try_get("outcome")?,
                session_index: 0,
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()?;
    Ok((points, truncated))
}

/// Carry the player's most recent directly-submitted rank forward (per
/// playlist group) into points that had no submission, marking them as
/// fallback. Cheap in-memory analogue of the replay-list's nearest-submission
/// lateral join; limited to the fetched window by construction.
fn fill_fallback_ranks(points: &mut [PlayerTimelinePoint]) {
    /// Last directly-submitted (tier, division, mmr) seen for a playlist group.
    type LastRank = (Option<i32>, Option<i32>, Option<f64>);
    let mut last_by_group: std::collections::HashMap<String, LastRank> =
        std::collections::HashMap::new();
    for point in points.iter_mut() {
        let Some(group) = point.playlist_group.clone() else {
            continue;
        };
        if point.rank_tier.is_some() || point.rank_mmr.is_some() {
            last_by_group.insert(
                group,
                (point.rank_tier, point.rank_division, point.rank_mmr),
            );
        } else if let Some((tier, division, mmr)) = last_by_group.get(&group) {
            point.rank_tier = *tier;
            point.rank_division = *division;
            point.rank_mmr = *mmr;
            point.rank_is_fallback = true;
        }
    }
}

/// Cluster the (oldest-first) points into sessions: a new session starts when
/// the gap between consecutive game starts exceeds the threshold. Writes each
/// point's `session_index` and returns the session summaries.
fn assign_sessions(
    points: &mut [PlayerTimelinePoint],
    gap_minutes: u32,
) -> Vec<PlayerTimelineSession> {
    let gap = Duration::minutes(gap_minutes as i64);
    let mut sessions: Vec<PlayerTimelineSession> = Vec::new();
    for point in points.iter_mut() {
        let start_new = match sessions.last() {
            Some(session) => point.replay_date - session.end > gap,
            None => true,
        };
        if start_new {
            sessions.push(PlayerTimelineSession {
                session_index: sessions.len() as u32,
                start: point.replay_date,
                end: point.replay_date,
                replay_count: 0,
                wins: 0,
                losses: 0,
                start_mmr: None,
                end_mmr: None,
            });
        }
        let session = sessions
            .last_mut()
            .expect("assign_sessions always opens a session before use");
        session.end = point.replay_date;
        session.replay_count += 1;
        match point.outcome.as_deref() {
            Some("win") => session.wins += 1,
            Some("loss") => session.losses += 1,
            _ => {}
        }
        if !point.rank_is_fallback {
            if let Some(mmr) = point.rank_mmr {
                session.start_mmr.get_or_insert(mmr);
                session.end_mmr = Some(mmr);
            }
        }
        point.session_index = session.session_index;
    }
    sessions
}
