use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use serde::Serialize;
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    query::{parse_u32_filter, QueryParams},
    replay_set::{append_replay_set_filters, ReplaySetFilterInput, ReplaySetFilters},
    replays::{require_db, ApiError},
    stats::{
        append_stat_term_event_filter, append_user_facing_stat_event_join_filter,
        normalize_stat_terms, resolve_matched_event_types,
    },
};

#[cfg(test)]
#[path = "leaderboards_tests.rs"]
mod tests;

const DEFAULT_LIMIT: u32 = 50;
const MAX_LIMIT: u32 = 200;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/leaderboards/uploads", get(get_uploads_leaderboard))
        .route(
            "/leaderboards/appearances",
            get(get_appearances_leaderboard),
        )
        .route("/leaderboards/event", get(get_event_leaderboard))
        .route("/leaderboards/stat", get(get_stat_leaderboard))
}

/// Pagination shared by every leaderboard. Mirrors the `count`/`offset` cursor
/// pattern used by the replay list so the frontend can reuse "load more".
#[derive(Debug, Clone, Copy)]
struct LeaderboardPaging {
    count: u32,
    offset: u32,
}

impl LeaderboardPaging {
    fn from_params(params: &QueryParams) -> Result<Self, ApiError> {
        let count = params
            .first(&["count"])
            .map(|value| parse_u32_filter("count", &value))
            .transpose()?
            .unwrap_or(DEFAULT_LIMIT)
            .clamp(1, MAX_LIMIT);
        let offset = params
            .first(&["offset"])
            .map(|value| parse_u32_filter("offset", &value))
            .transpose()?
            .unwrap_or(0);
        Ok(Self { count, offset })
    }

    fn next_offset(&self, returned: usize, total: u64) -> Option<u32> {
        let returned_through = self.offset.saturating_add(returned as u32);
        (u64::from(returned_through) < total).then_some(returned_through)
    }
}

fn parse_filters(
    raw_query: Option<&str>,
    auth_user_id: Option<Uuid>,
) -> Result<(ReplaySetFilters, LeaderboardPaging), ApiError> {
    let params = QueryParams::from_raw(raw_query);
    let paging = LeaderboardPaging::from_params(&params)?;
    let input = ReplaySetFilterInput::from_query_params(&params)?;
    let filters = ReplaySetFilters::from_input(input, auth_user_id)?;
    Ok((filters, paging))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct UploadsLeaderboardResponse {
    pub rows: Vec<UploadsLeaderboardRowResponse>,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct UploadsLeaderboardRowResponse {
    pub rank: u32,
    pub user_id: Uuid,
    pub display_name: Option<String>,
    pub upload_count: u64,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AppearancesLeaderboardResponse {
    pub rows: Vec<AppearancesLeaderboardRowResponse>,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AppearancesLeaderboardRowResponse {
    pub rank: u32,
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
    pub is_pro: bool,
    pub appearance_count: u64,
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/uploads",
    tag = "leaderboards",
    params(
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter (ranked, casual, tournament, ...)"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("count" = Option<u32>, Query, description = "Maximum rows to return (default 50, max 200)"),
        ("offset" = Option<u32>, Query, description = "Row offset for pagination")
    ),
    responses(
        (status = 200, description = "Top uploaders ranked by replay upload count", body = UploadsLeaderboardResponse),
        (status = 400, description = "Leaderboard filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_uploads_leaderboard(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<UploadsLeaderboardResponse>, ApiError> {
    let db = require_db(&state)?;
    let (filters, paging) = parse_filters(raw_query.as_deref(), auth_user.as_ref().map(|u| u.id))?;

    let (total, rows) = tokio::try_join!(
        load_uploads_total(db, &filters),
        load_uploads_rows(db, &filters, &paging),
    )
    .map_err(ApiError::internal)?;

    let next_offset = paging.next_offset(rows.len(), total);
    Ok(Json(UploadsLeaderboardResponse {
        rows,
        count: paging.count,
        offset: paging.offset,
        total,
        next_offset,
    }))
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/appearances",
    tag = "leaderboards",
    params(
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter (ranked, casual, tournament, ...)"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("count" = Option<u32>, Query, description = "Maximum rows to return (default 50, max 200)"),
        ("offset" = Option<u32>, Query, description = "Row offset for pagination")
    ),
    responses(
        (status = 200, description = "Top players ranked by replay appearance count", body = AppearancesLeaderboardResponse),
        (status = 400, description = "Leaderboard filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_appearances_leaderboard(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<AppearancesLeaderboardResponse>, ApiError> {
    let db = require_db(&state)?;
    let (filters, paging) = parse_filters(raw_query.as_deref(), auth_user.as_ref().map(|u| u.id))?;

    let (total, rows) = tokio::try_join!(
        load_appearances_total(db, &filters),
        load_appearances_rows(db, &filters, &paging),
    )
    .map_err(ApiError::internal)?;

    let next_offset = paging.next_offset(rows.len(), total);
    Ok(Json(AppearancesLeaderboardResponse {
        rows,
        count: paging.count,
        offset: paging.offset,
        total,
        next_offset,
    }))
}

async fn load_uploads_total(
    pool: &sqlx::PgPool,
    filters: &ReplaySetFilters,
) -> Result<u64, sqlx::Error> {
    let total: i64 = uploads_total_query(filters)
        .build()
        .fetch_one(pool)
        .await?
        .try_get("total")?;
    Ok(total.max(0) as u64)
}

async fn load_uploads_rows(
    pool: &sqlx::PgPool,
    filters: &ReplaySetFilters,
    paging: &LeaderboardPaging,
) -> Result<Vec<UploadsLeaderboardRowResponse>, sqlx::Error> {
    let rows = uploads_rows_query(filters, paging)
        .build()
        .fetch_all(pool)
        .await?;

    rows.into_iter()
        .enumerate()
        .map(|(index, row)| {
            let upload_count: i64 = row.try_get("upload_count")?;
            Ok(UploadsLeaderboardRowResponse {
                rank: paging.offset.saturating_add(index as u32 + 1),
                user_id: row.try_get("user_id")?,
                display_name: row.try_get("display_name")?,
                upload_count: upload_count.max(0) as u64,
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
}

fn uploads_total_query(filters: &ReplaySetFilters) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT COUNT(DISTINCT r.uploaded_by_user_id) AS total FROM replays r \
         WHERE r.uploaded_by_user_id IS NOT NULL",
    );
    append_replay_set_filters(&mut builder, filters, "r");
    builder
}

fn uploads_rows_query<'args>(
    filters: &'args ReplaySetFilters,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT r.uploaded_by_user_id AS user_id, u.display_name AS display_name, \
         COUNT(*) AS upload_count \
         FROM replays r JOIN users u ON u.id = r.uploaded_by_user_id \
         WHERE r.uploaded_by_user_id IS NOT NULL",
    );
    append_replay_set_filters(&mut builder, filters, "r");
    builder.push(
        " GROUP BY r.uploaded_by_user_id, u.display_name \
         ORDER BY upload_count DESC, u.display_name ASC NULLS LAST, r.uploaded_by_user_id \
         LIMIT ",
    );
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

async fn load_appearances_total(
    pool: &sqlx::PgPool,
    filters: &ReplaySetFilters,
) -> Result<u64, sqlx::Error> {
    let total: i64 = appearances_total_query(filters)
        .build()
        .fetch_one(pool)
        .await?
        .try_get("total")?;
    Ok(total.max(0) as u64)
}

async fn load_appearances_rows(
    pool: &sqlx::PgPool,
    filters: &ReplaySetFilters,
    paging: &LeaderboardPaging,
) -> Result<Vec<AppearancesLeaderboardRowResponse>, sqlx::Error> {
    let rows = appearances_rank_query(filters, paging)
        .build()
        .fetch_all(pool)
        .await?;

    let mut entries = rows
        .into_iter()
        .enumerate()
        .map(|(index, row)| {
            let appearance_count: i64 = row.try_get("appearance_count")?;
            Ok(AppearancesLeaderboardRowResponse {
                rank: paging.offset.saturating_add(index as u32 + 1),
                platform: row.try_get("platform")?,
                platform_player_id: row.try_get("platform_player_id")?,
                display_name: None,
                is_pro: false,
                appearance_count: appearance_count.max(0) as u64,
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()?;

    // The expensive per-player resolution (latest known name ordered by replay
    // date, plus the pro flag) only runs for the bounded page of ranked players
    // rather than the full filtered set.
    let pairs: Vec<PlayerKey> = entries
        .iter()
        .map(|entry| (entry.platform.clone(), entry.platform_player_id.clone()))
        .collect();
    let profiles = load_player_profiles(pool, &pairs).await?;
    for entry in &mut entries {
        if let Some(profile) =
            profiles.get(&(entry.platform.clone(), entry.platform_player_id.clone()))
        {
            entry.display_name = profile.display_name.clone();
            entry.is_pro = profile.is_pro;
        }
    }

    Ok(entries)
}

type PlayerKey = (String, String);

struct PlayerProfile {
    display_name: Option<String>,
    is_pro: bool,
}

/// Resolves the latest-known name and pro flag for a bounded set of players.
/// Shared by every player-keyed leaderboard so the heavy ranking queries can
/// stay lean and enrich only the returned page.
async fn load_player_profiles(
    pool: &sqlx::PgPool,
    pairs: &[PlayerKey],
) -> Result<std::collections::HashMap<PlayerKey, PlayerProfile>, sqlx::Error> {
    if pairs.is_empty() {
        return Ok(std::collections::HashMap::new());
    }

    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT rp.platform AS platform, rp.platform_player_id AS platform_player_id, \
         (ARRAY_REMOVE(ARRAY_AGG(rp.name ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC) \
         FILTER (WHERE rp.name IS NOT NULL AND btrim(rp.name) <> ''), NULL))[1] AS display_name, \
         BOOL_OR(rp.is_pro) AS is_pro \
         FROM replay_players rp JOIN replays r ON r.id = rp.replay_id \
         WHERE (rp.platform, rp.platform_player_id) IN ",
    );
    builder.push_tuples(pairs.iter(), |mut separated, pair| {
        separated.push_bind(&pair.0).push_bind(&pair.1);
    });
    builder.push(" GROUP BY rp.platform, rp.platform_player_id");

    let rows = builder.build().fetch_all(pool).await?;
    let mut profiles = std::collections::HashMap::with_capacity(rows.len());
    for row in rows {
        let platform: String = row.try_get("platform")?;
        let platform_player_id: String = row.try_get("platform_player_id")?;
        profiles.insert(
            (platform, platform_player_id),
            PlayerProfile {
                display_name: row.try_get("display_name")?,
                is_pro: row.try_get::<Option<bool>, _>("is_pro")?.unwrap_or(false),
            },
        );
    }
    Ok(profiles)
}

/// Shared base of the appearances aggregation: every `replay_players` row whose
/// replay matches the active filters, grouped by player identity. The string is
/// reused by both the ranked page query and the total-count query so the two
/// stay in lockstep.
///
/// When no filter narrows the replay set we omit the `replays` join entirely.
/// That is what lets the default (unfiltered) leaderboard ride
/// `replay_players_platform_player_replay_idx` as an index-only scan instead of
/// hash-joining and externally sorting every appearance row.
fn append_appearances_from_where<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args ReplaySetFilters,
) {
    if filters.is_empty() {
        builder.push(
            " FROM replay_players rp \
             WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
             AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> ''",
        );
        return;
    }

    builder.push(
        " FROM replay_players rp JOIN replays r ON r.id = rp.replay_id \
         WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
         AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> ''",
    );
    append_replay_set_filters(builder, filters, "r");
}

fn appearances_rank_query<'args>(
    filters: &'args ReplaySetFilters,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    // Deliberately lean: only the columns the existing
    // `replay_players_platform_player_replay_idx` covers, so this full-set
    // aggregation can stay index-only. The display name and pro flag are
    // resolved separately for just the returned page (see
    // `load_player_profiles`).
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT rp.platform AS platform, rp.platform_player_id AS platform_player_id, \
         COUNT(DISTINCT rp.replay_id) AS appearance_count",
    );
    append_appearances_from_where(&mut builder, filters);
    builder.push(
        " GROUP BY rp.platform, rp.platform_player_id \
         ORDER BY appearance_count DESC, rp.platform, rp.platform_player_id \
         LIMIT ",
    );
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

fn appearances_total_query(filters: &ReplaySetFilters) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("SELECT COUNT(*) AS total FROM (SELECT 1");
    append_appearances_from_where(&mut builder, filters);
    builder.push(" GROUP BY rp.platform, rp.platform_player_id) ranked_players");
    builder
}

// ---------------------------------------------------------------------------
// Event leaderboard: rank players by an arbitrary event type, per unit time,
// under arbitrary replay filters.
// ---------------------------------------------------------------------------

/// How the event leaderboard is ranked. Total counts reward volume; the rate
/// metrics normalize by games played or active time so a player with fewer games
/// can still top the board.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum LeaderboardSort {
    Total,
    PerGame,
    PerMinute,
}

impl LeaderboardSort {
    fn from_query(value: Option<&str>) -> Result<Self, ApiError> {
        match value.map(|v| v.trim().to_ascii_lowercase()).as_deref() {
            None | Some("") | Some("count") | Some("total") => Ok(Self::Total),
            Some("per-game") | Some("per_game") | Some("game") => Ok(Self::PerGame),
            Some("per-minute") | Some("per_minute") | Some("minute") | Some("rate") => {
                Ok(Self::PerMinute)
            }
            Some(_) => Err(ApiError::bad_request(
                "sort must be one of: total, per-game, per-minute",
            )),
        }
    }

    /// The SQL ordering expression for this metric. A secondary sort by raw
    /// event count keeps the ranking stable when rates tie (e.g. two players at
    /// exactly 1.0/game).
    fn order_sql(
        self,
        total_column: &'static str,
        per_game_column: &'static str,
        per_minute_column: &'static str,
    ) -> String {
        match self {
            Self::Total => format!("{total_column} DESC"),
            Self::PerGame => format!("{per_game_column} DESC NULLS LAST, {total_column} DESC"),
            Self::PerMinute => {
                format!("{per_minute_column} DESC NULLS LAST, {total_column} DESC")
            }
        }
    }
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventLeaderboardResponse {
    pub rows: Vec<EventLeaderboardRowResponse>,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
    /// The event types the `event-type`/`stat-term` filter resolved to. An empty
    /// filter resolves to every user-facing event type.
    pub matched_event_types: Vec<LeaderboardEventTypeResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct LeaderboardEventTypeResponse {
    pub key: String,
    pub display_name: String,
    pub category: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct EventLeaderboardRowResponse {
    pub rank: u32,
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
    pub is_pro: bool,
    /// Number of matching events the player recorded across the filtered set.
    pub event_count: u64,
    /// Replays the player appeared in within the filtered set (the per-game
    /// denominator).
    pub replay_count: u64,
    /// Total active time across those appearances (the per-minute denominator).
    pub active_time_seconds: Option<f64>,
    pub count_per_game: Option<f64>,
    pub per_active_minute: Option<f64>,
}

#[derive(Debug, Clone)]
struct EventLeaderboardFilters {
    replay: ReplaySetFilters,
    stat_terms: Vec<String>,
    sort: LeaderboardSort,
    min_games: i64,
}

impl EventLeaderboardFilters {
    fn from_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
    ) -> Result<(Self, LeaderboardPaging), ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let paging = LeaderboardPaging::from_params(&params)?;
        let replay = ReplaySetFilters::from_input(
            ReplaySetFilterInput::from_query_params(&params)?,
            auth_user_id,
        )?;
        let stat_terms = normalize_stat_terms(params.values(&[
            "event-type",
            "event_type",
            "stat-term",
            "stat_terms",
        ]));
        let sort = LeaderboardSort::from_query(params.first(&["sort", "rate"]).as_deref())?;
        let min_games = params
            .first(&["min-games", "min_games"])
            .map(|value| parse_u32_filter("min-games", &value))
            .transpose()?
            .unwrap_or(1)
            .max(1) as i64;
        Ok((
            Self {
                replay,
                stat_terms,
                sort,
                min_games,
            },
            paging,
        ))
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/event",
    tag = "leaderboards",
    params(
        ("event-type" = Option<Vec<String>>, Query, description = "Event-type filter (alias stat-term); fuzzy-matches event_types key/display/category. Empty = all user-facing events"),
        ("sort" = Option<String>, Query, description = "Ranking metric: total (default), per-game, per-minute, or share"),
        ("min-games" = Option<u32>, Query, description = "Minimum replay appearances to qualify (default 1)"),
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("count" = Option<u32>, Query, description = "Maximum rows to return (default 50, max 200)"),
        ("offset" = Option<u32>, Query, description = "Row offset for pagination")
    ),
    responses(
        (status = 200, description = "Players ranked by an event type per unit time", body = EventLeaderboardResponse),
        (status = 400, description = "Leaderboard filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_event_leaderboard(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<EventLeaderboardResponse>, ApiError> {
    let db = require_db(&state)?;
    let (filters, paging) = EventLeaderboardFilters::from_query(
        raw_query.as_deref(),
        auth_user.as_ref().map(|u| u.id),
    )?;

    let (total, rows, matched) = tokio::try_join!(
        load_event_total(db, &filters),
        load_event_rows(db, &filters, &paging),
        async {
            resolve_matched_event_types(db, &filters.stat_terms)
                .await
                .map_err(ApiError::internal)
        },
    )?;

    let next_offset = paging.next_offset(rows.len(), total);
    Ok(Json(EventLeaderboardResponse {
        rows,
        count: paging.count,
        offset: paging.offset,
        total,
        next_offset,
        matched_event_types: matched
            .into_iter()
            .map(|et| LeaderboardEventTypeResponse {
                key: et.key,
                display_name: et.display_name,
                category: et.category,
            })
            .collect(),
    }))
}

async fn load_event_total(
    pool: &sqlx::PgPool,
    filters: &EventLeaderboardFilters,
) -> Result<u64, ApiError> {
    let total: i64 = event_total_query(filters)
        .build()
        .fetch_one(pool)
        .await
        .map_err(ApiError::internal)?
        .try_get("total")
        .map_err(ApiError::internal)?;
    Ok(total.max(0) as u64)
}

async fn load_event_rows(
    pool: &sqlx::PgPool,
    filters: &EventLeaderboardFilters,
    paging: &LeaderboardPaging,
) -> Result<Vec<EventLeaderboardRowResponse>, ApiError> {
    let rows = event_rank_query(filters, paging)
        .build()
        .fetch_all(pool)
        .await
        .map_err(ApiError::internal)?;

    let mut entries = rows
        .into_iter()
        .enumerate()
        .map(|(index, row)| {
            let event_count: i64 = row.try_get("event_count")?;
            let replay_count: i64 = row.try_get("replay_count")?;
            Ok(EventLeaderboardRowResponse {
                rank: paging.offset.saturating_add(index as u32 + 1),
                platform: row.try_get("platform")?,
                platform_player_id: row.try_get("platform_player_id")?,
                display_name: None,
                is_pro: false,
                event_count: event_count.max(0) as u64,
                replay_count: replay_count.max(0) as u64,
                active_time_seconds: row.try_get("active_time_seconds")?,
                count_per_game: row.try_get("count_per_game")?,
                per_active_minute: row.try_get("per_active_minute")?,
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    let pairs: Vec<PlayerKey> = entries
        .iter()
        .map(|entry| (entry.platform.clone(), entry.platform_player_id.clone()))
        .collect();
    let profiles = load_player_profiles(pool, &pairs)
        .await
        .map_err(ApiError::internal)?;
    for entry in &mut entries {
        if let Some(profile) =
            profiles.get(&(entry.platform.clone(), entry.platform_player_id.clone()))
        {
            entry.display_name = profile.display_name.clone();
            entry.is_pro = profile.is_pro;
        }
    }

    Ok(entries)
}

/// Emits the two CTEs shared by the ranked-page and total-count queries:
/// `event_counts` (matching events per candidate player) and `denominators`
/// (games + active time per candidate, over the filtered set). Restricting
/// `denominators` to candidates from `event_counts` keeps it bounded to players
/// who actually recorded the event.
fn push_event_ctes<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args EventLeaderboardFilters,
) {
    builder.push(
        "WITH event_counts AS (\
         SELECT rp.platform AS platform, rp.platform_player_id AS platform_player_id, \
         COUNT(DISTINCT event.id) AS event_count \
         FROM replay_players rp \
         JOIN replays r ON r.id = rp.replay_id \
         JOIN play_event_subjects subject ON subject.replay_player_id = rp.id \
         JOIN play_events event ON event.id = subject.event_id \
         AND event.analysis_run_id = r.canonical_analysis_run_id",
    );
    append_user_facing_stat_event_join_filter(builder, "event");
    append_stat_term_event_filter(builder, "event", &filters.stat_terms);
    builder.push(
        " WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
         AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> '' \
         AND r.canonical_analysis_run_id IS NOT NULL",
    );
    append_replay_set_filters(builder, &filters.replay, "r");
    builder.push(
        " GROUP BY rp.platform, rp.platform_player_id), \
         denominators AS (\
         SELECT rp.platform AS platform, rp.platform_player_id AS platform_player_id, \
         COUNT(DISTINCT rp.replay_id) AS replay_count, \
         SUM(rp.active_time_seconds) AS active_time_seconds \
         FROM replay_players rp \
         JOIN replays r ON r.id = rp.replay_id \
         WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
         AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> '' \
         AND r.canonical_analysis_run_id IS NOT NULL \
         AND (rp.platform, rp.platform_player_id) IN (SELECT platform, platform_player_id FROM event_counts)",
    );
    append_replay_set_filters(builder, &filters.replay, "r");
    builder.push(" GROUP BY rp.platform, rp.platform_player_id)");
}

fn event_rank_query<'args>(
    filters: &'args EventLeaderboardFilters,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_event_ctes(&mut builder, filters);
    builder.push(
        " SELECT e.platform AS platform, e.platform_player_id AS platform_player_id, \
         e.event_count AS event_count, d.replay_count AS replay_count, \
         d.active_time_seconds AS active_time_seconds, \
         (e.event_count::float8 / NULLIF(d.replay_count, 0)) AS count_per_game, \
         CASE WHEN COALESCE(d.active_time_seconds, 0) > 0 \
         THEN e.event_count::float8 * 60.0 / d.active_time_seconds ELSE NULL END AS per_active_minute \
         FROM event_counts e \
         JOIN denominators d ON d.platform = e.platform AND d.platform_player_id = e.platform_player_id \
         WHERE d.replay_count >= ",
    );
    builder.push_bind(filters.min_games);
    builder.push(" ORDER BY ");
    builder.push(
        filters
            .sort
            .order_sql("event_count", "count_per_game", "per_active_minute"),
    );
    builder.push(", e.platform, e.platform_player_id LIMIT ");
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

fn event_total_query(filters: &EventLeaderboardFilters) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_event_ctes(&mut builder, filters);
    builder.push(
        " SELECT COUNT(*) AS total FROM event_counts e \
         JOIN denominators d ON d.platform = e.platform AND d.platform_player_id = e.platform_player_id \
         WHERE d.replay_count >= ",
    );
    builder.push_bind(filters.min_games);
    builder
}

// ---------------------------------------------------------------------------
// Stat leaderboard: rank players by accumulated continuous stats. These are not
// event counts; they use duration/value semantics and share active-time
// denominators with event rate boards.
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StatLeaderboardMetric {
    BallOpponentHalf,
    PossessionTime,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum RelativeFieldHalf {
    Opponent,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StatMetricSource {
    BallHalfDuration { half: RelativeFieldHalf },
    PlayerPossessionDuration,
}

#[derive(Debug, Clone, Copy)]
struct StatMetricDefinition {
    metric: StatLeaderboardMetric,
    key: &'static str,
    aliases: &'static [&'static str],
    display_name: &'static str,
    description: &'static str,
    unit: &'static str,
    source: StatMetricSource,
}

impl StatMetricDefinition {
    fn fact_key(self) -> &'static str {
        match self.source {
            StatMetricSource::BallHalfDuration { half } => match half {
                RelativeFieldHalf::Opponent => self.key,
            },
            StatMetricSource::PlayerPossessionDuration => self.key,
        }
    }
}

const STAT_METRIC_DEFINITIONS: &[StatMetricDefinition] = &[
    StatMetricDefinition {
        metric: StatLeaderboardMetric::BallOpponentHalf,
        key: "ball-opponent-half",
        aliases: &[
            "ball_opponent_half",
            "ball-in-opponent-half",
            "ball_in_opponent_half",
            "opponent-half",
            "opponent_half",
        ],
        display_name: "Ball in opponent half",
        description:
            "Seconds the ball spent in the player's opponent half while the player appeared",
        unit: "seconds",
        source: StatMetricSource::BallHalfDuration {
            half: RelativeFieldHalf::Opponent,
        },
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::PossessionTime,
        key: "possession-time",
        aliases: &["possession_time", "possession"],
        display_name: "Possession time",
        description: "Seconds the player held possession",
        unit: "seconds",
        source: StatMetricSource::PlayerPossessionDuration,
    },
];

impl StatLeaderboardMetric {
    fn from_query(value: Option<&str>) -> Result<Self, ApiError> {
        let Some(value) = value
            .map(|v| v.trim().to_ascii_lowercase())
            .filter(|value| !value.is_empty())
        else {
            return Ok(Self::BallOpponentHalf);
        };
        STAT_METRIC_DEFINITIONS
            .iter()
            .find(|definition| {
                definition.key == value || definition.aliases.contains(&value.as_str())
            })
            .map(|definition| definition.metric)
            .ok_or_else(|| {
                ApiError::bad_request("stat must be one of: ball-opponent-half, possession-time")
            })
    }

    fn definition(self) -> &'static StatMetricDefinition {
        STAT_METRIC_DEFINITIONS
            .iter()
            .find(|definition| definition.metric == self)
            .expect("all stat leaderboard metrics must have a definition")
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StatLeaderboardSort {
    Total,
    PerGame,
    PerMinute,
    Share,
}

impl StatLeaderboardSort {
    fn from_query(value: Option<&str>) -> Result<Self, ApiError> {
        match value.map(|v| v.trim().to_ascii_lowercase()).as_deref() {
            None | Some("") | Some("count") | Some("total") => Ok(Self::Total),
            Some("per-game") | Some("per_game") | Some("game") => Ok(Self::PerGame),
            Some("per-minute") | Some("per_minute") | Some("minute") | Some("rate") => {
                Ok(Self::PerMinute)
            }
            Some("share") | Some("percentage") | Some("percent") | Some("pct") => Ok(Self::Share),
            Some(_) => Err(ApiError::bad_request(
                "sort must be one of: total, per-game, per-minute, share",
            )),
        }
    }

    fn order_sql(self) -> &'static str {
        match self {
            Self::Total => "value DESC",
            Self::PerGame => "value_per_game DESC NULLS LAST, value DESC",
            Self::PerMinute => "value_per_active_minute DESC NULLS LAST, value DESC",
            Self::Share => "share_of_active_time DESC NULLS LAST, value DESC",
        }
    }
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatLeaderboardResponse {
    pub rows: Vec<StatLeaderboardRowResponse>,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
    pub metric: LeaderboardStatMetricResponse,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct LeaderboardStatMetricResponse {
    pub key: String,
    pub display_name: String,
    pub description: String,
    pub unit: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatLeaderboardRowResponse {
    pub rank: u32,
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
    pub is_pro: bool,
    /// Accumulated metric value. Current metrics are duration-like and report
    /// seconds.
    pub value: f64,
    pub replay_count: u64,
    pub active_time_seconds: Option<f64>,
    pub value_per_game: Option<f64>,
    pub value_per_active_minute: Option<f64>,
    /// Value divided by active time. For duration metrics this is a time share
    /// suitable for percentage displays.
    pub share_of_active_time: Option<f64>,
}

#[derive(Debug, Clone)]
struct StatLeaderboardFilters {
    replay: ReplaySetFilters,
    metric: StatLeaderboardMetric,
    sort: StatLeaderboardSort,
    min_games: i64,
}

impl StatLeaderboardFilters {
    fn from_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
    ) -> Result<(Self, LeaderboardPaging), ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let paging = LeaderboardPaging::from_params(&params)?;
        let replay = ReplaySetFilters::from_input(
            ReplaySetFilterInput::from_query_params(&params)?,
            auth_user_id,
        )?;
        let metric =
            StatLeaderboardMetric::from_query(params.first(&["stat", "metric"]).as_deref())?;
        let sort = StatLeaderboardSort::from_query(params.first(&["sort", "rate"]).as_deref())?;
        let min_games = params
            .first(&["min-games", "min_games"])
            .map(|value| parse_u32_filter("min-games", &value))
            .transpose()?
            .unwrap_or(1)
            .max(1) as i64;
        Ok((
            Self {
                replay,
                metric,
                sort,
                min_games,
            },
            paging,
        ))
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/stat",
    tag = "leaderboards",
    params(
        ("stat" = Option<String>, Query, description = "Continuous stat metric: ball-opponent-half (default) or possession-time"),
        ("sort" = Option<String>, Query, description = "Ranking metric: total (default), per-game, or per-minute"),
        ("min-games" = Option<u32>, Query, description = "Minimum replay appearances to qualify (default 1)"),
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("count" = Option<u32>, Query, description = "Maximum rows to return (default 50, max 200)"),
        ("offset" = Option<u32>, Query, description = "Row offset for pagination")
    ),
    responses(
        (status = 200, description = "Players ranked by an accumulated continuous stat", body = StatLeaderboardResponse),
        (status = 400, description = "Leaderboard filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_stat_leaderboard(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<StatLeaderboardResponse>, ApiError> {
    let db = require_db(&state)?;
    let (filters, paging) =
        StatLeaderboardFilters::from_query(raw_query.as_deref(), auth_user.as_ref().map(|u| u.id))?;

    let (total, rows) = tokio::try_join!(
        load_stat_total(db, &filters),
        load_stat_rows(db, &filters, &paging),
    )?;

    let next_offset = paging.next_offset(rows.len(), total);
    let definition = filters.metric.definition();
    Ok(Json(StatLeaderboardResponse {
        rows,
        count: paging.count,
        offset: paging.offset,
        total,
        next_offset,
        metric: LeaderboardStatMetricResponse {
            key: definition.key.to_owned(),
            display_name: definition.display_name.to_owned(),
            description: definition.description.to_owned(),
            unit: definition.unit.to_owned(),
        },
    }))
}

async fn load_stat_total(
    pool: &sqlx::PgPool,
    filters: &StatLeaderboardFilters,
) -> Result<u64, ApiError> {
    let total: i64 = stat_total_query(filters)
        .build()
        .fetch_one(pool)
        .await
        .map_err(ApiError::internal)?
        .try_get("total")
        .map_err(ApiError::internal)?;
    Ok(total.max(0) as u64)
}

async fn load_stat_rows(
    pool: &sqlx::PgPool,
    filters: &StatLeaderboardFilters,
    paging: &LeaderboardPaging,
) -> Result<Vec<StatLeaderboardRowResponse>, ApiError> {
    let rows = stat_rank_query(filters, paging)
        .build()
        .fetch_all(pool)
        .await
        .map_err(ApiError::internal)?;

    let mut entries = rows
        .into_iter()
        .enumerate()
        .map(|(index, row)| {
            let replay_count: i64 = row.try_get("replay_count")?;
            Ok(StatLeaderboardRowResponse {
                rank: paging.offset.saturating_add(index as u32 + 1),
                platform: row.try_get("platform")?,
                platform_player_id: row.try_get("platform_player_id")?,
                display_name: None,
                is_pro: false,
                value: row.try_get("value")?,
                replay_count: replay_count.max(0) as u64,
                active_time_seconds: row.try_get("active_time_seconds")?,
                value_per_game: row.try_get("value_per_game")?,
                value_per_active_minute: row.try_get("value_per_active_minute")?,
                share_of_active_time: row.try_get("share_of_active_time")?,
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    let pairs: Vec<PlayerKey> = entries
        .iter()
        .map(|entry| (entry.platform.clone(), entry.platform_player_id.clone()))
        .collect();
    let profiles = load_player_profiles(pool, &pairs)
        .await
        .map_err(ApiError::internal)?;
    for entry in &mut entries {
        if let Some(profile) =
            profiles.get(&(entry.platform.clone(), entry.platform_player_id.clone()))
        {
            entry.display_name = profile.display_name.clone();
            entry.is_pro = profile.is_pro;
        }
    }

    Ok(entries)
}

fn push_stat_fact_cte<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatLeaderboardFilters,
) {
    builder.push(
        "metric_values AS (\
         SELECT fact.platform AS platform, fact.platform_player_id AS platform_player_id, \
         COALESCE(SUM(fact.value), 0.0) AS value, \
         COUNT(DISTINCT fact.replay_id) AS replay_count, \
         SUM(fact.active_time_seconds) AS active_time_seconds, \
         SUM(fact.denominator_value) AS denominator_value \
         FROM player_replay_stat_facts fact \
         JOIN replays r ON r.id = fact.replay_id AND r.canonical_analysis_run_id = fact.analysis_run_id \
         WHERE fact.stat_key = ",
    );
    builder.push_bind(filters.metric.definition().fact_key());
    append_replay_set_filters(builder, &filters.replay, "r");
    builder.push(
        " GROUP BY fact.platform, fact.platform_player_id \
         HAVING COALESCE(SUM(fact.value), 0.0) > 0)",
    );
}

fn push_stat_ctes<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatLeaderboardFilters,
) {
    builder.push("WITH ");
    push_stat_fact_cte(builder, filters);
}

fn stat_rank_query<'args>(
    filters: &'args StatLeaderboardFilters,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_stat_ctes(&mut builder, filters);
    builder.push(
        " SELECT m.platform AS platform, m.platform_player_id AS platform_player_id, \
         m.value AS value, m.replay_count AS replay_count, \
         m.active_time_seconds AS active_time_seconds, \
         (m.value / NULLIF(m.replay_count, 0)) AS value_per_game, \
         (m.value / NULLIF(m.denominator_value, 0)) AS share_of_active_time, \
         CASE WHEN COALESCE(m.active_time_seconds, 0) > 0 \
         THEN m.value * 60.0 / m.active_time_seconds ELSE NULL END AS value_per_active_minute \
         FROM metric_values m \
         WHERE m.replay_count >= ",
    );
    builder.push_bind(filters.min_games);
    builder.push(" ORDER BY ");
    builder.push(filters.sort.order_sql());
    builder.push(", m.platform, m.platform_player_id LIMIT ");
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

fn stat_total_query(filters: &StatLeaderboardFilters) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    push_stat_ctes(&mut builder, filters);
    builder.push(
        " SELECT COUNT(*) AS total FROM metric_values m \
         WHERE m.replay_count >= ",
    );
    builder.push_bind(filters.min_games);
    builder
}
