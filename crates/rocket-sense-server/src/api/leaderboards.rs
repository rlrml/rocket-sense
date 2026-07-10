use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use serde::Serialize;
use sqlx::{Postgres, QueryBuilder, Row};
use std::collections::{HashMap, HashSet};
use utoipa::ToSchema;
use uuid::Uuid;

use super::{
    query::{parse_u32_filter, push_aggregate_excluded_player_filter, QueryParams},
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
const ALL_SCOPE: &str = "*";

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

/// Standard windows backed by disposable player/window aggregates. The cache
/// is only a read model: live replay/fact queries remain the correctness
/// fallback and the cache is expected to be fully rebuilt often.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum LeaderboardWindow {
    Daily,
    TrailingSevenDays,
    Season,
}

impl LeaderboardWindow {
    fn from_params(params: &QueryParams) -> Result<Option<Self>, ApiError> {
        match params
            .first(&["window"])
            .map(|value| value.trim().to_ascii_lowercase())
            .as_deref()
        {
            None | Some("") => Ok(None),
            Some("daily") | Some("day") => Ok(Some(Self::Daily)),
            Some("trailing-7d") | Some("trailing_7d") | Some("7d") => {
                Ok(Some(Self::TrailingSevenDays))
            }
            Some("season") => Ok(Some(Self::Season)),
            Some(_) => Err(ApiError::bad_request(
                "window must be one of: daily, trailing-7d, season",
            )),
        }
    }

    fn kind(self) -> &'static str {
        match self {
            Self::Daily => "daily",
            Self::TrailingSevenDays => "trailing-7d",
            Self::Season => "season",
        }
    }
}

#[derive(Debug, Clone)]
struct CachedLeaderboardScope {
    window: LeaderboardWindow,
    season: Option<String>,
    game_type: String,
    team_size: i16,
    playlist: String,
}

impl CachedLeaderboardScope {
    fn from_filters(window: Option<LeaderboardWindow>, filters: &ReplaySetFilters) -> Option<Self> {
        let window = window?;
        let only_standard_dimensions = filters.search_pattern.is_none()
            && filters.player_name_patterns.is_empty()
            && filters.replay_ids.is_empty()
            && filters.file_sha256s.is_empty()
            && filters.group_id.is_none()
            && filters.project_id.is_none()
            && filters.maps.is_empty()
            && filters.pro.is_none()
            && filters.uploader_user_id.is_none()
            && filters.status.is_none()
            && filters.created_after.is_none()
            && filters.created_before.is_none()
            && filters.replay_date_after.is_none()
            && filters.replay_date_before.is_none()
            && filters.min_rank_tier.is_none()
            && filters.max_rank_tier.is_none()
            && filters.rank_scope_player.is_none()
            && filters.min_season_ord.is_none()
            && filters.max_season_ord.is_none()
            && filters.playlist_group_key.is_none()
            && filters.player_outcome.is_none()
            && filters.playlists.len() <= 1
            && filters.game_types.len() <= 1
            && filters.team_sizes.len() <= 1
            && filters.seasons.len() <= 1
            // The cache reflects the default aggregate-included population, so it
            // cannot serve an explicit include-incomplete-games request.
            && !filters.include_incomplete_games;
        if !only_standard_dimensions {
            return None;
        }
        if window != LeaderboardWindow::Season && !filters.seasons.is_empty() {
            return None;
        }

        Some(Self {
            window,
            season: filters.seasons.first().cloned(),
            game_type: filters
                .game_types
                .first()
                .cloned()
                .unwrap_or_else(|| ALL_SCOPE.to_owned()),
            team_size: filters
                .team_sizes
                .first()
                .copied()
                .and_then(|value| i16::try_from(value).ok())
                .unwrap_or(0),
            playlist: filters
                .playlists
                .first()
                .cloned()
                .unwrap_or_else(|| ALL_SCOPE.to_owned()),
        })
    }
}

fn push_live_window_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    window: Option<LeaderboardWindow>,
    filters: &'args ReplaySetFilters,
    replay_alias: &str,
) {
    let Some(window) = window else {
        return;
    };
    match window {
        LeaderboardWindow::Daily => {
            builder.push(" AND COALESCE(");
            builder.push(replay_alias);
            builder.push(".replay_date, ");
            builder.push(replay_alias);
            builder.push(
                ".created_at) >= date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'",
            );
        }
        LeaderboardWindow::TrailingSevenDays => {
            builder.push(" AND COALESCE(");
            builder.push(replay_alias);
            builder.push(".replay_date, ");
            builder.push(replay_alias);
            builder.push(".created_at) >= now() - interval '7 days'");
        }
        LeaderboardWindow::Season if filters.seasons.is_empty() => {
            builder.push(" AND lower(btrim(");
            builder.push(replay_alias);
            builder.push(
                ".season)) = (SELECT lower(btrim(current_replay.season)) \
                 FROM replays current_replay \
                 WHERE current_replay.season IS NOT NULL \
                   AND btrim(current_replay.season) <> '' \
                   AND current_replay.canonical_analysis_run_id IS NOT NULL \
                 ORDER BY COALESCE(current_replay.replay_date, current_replay.created_at) DESC \
                 LIMIT 1)",
            );
        }
        LeaderboardWindow::Season => {}
    }
}

async fn cache_scope_available(
    pool: &sqlx::PgPool,
    scope: &CachedLeaderboardScope,
) -> Result<bool, sqlx::Error> {
    let available = match scope.window {
        LeaderboardWindow::Daily => {
            sqlx::query_scalar::<_, bool>(
                "SELECT EXISTS (SELECT 1 FROM leaderboard_cache_windows WHERE window_key = 'daily')",
            )
            .fetch_one(pool)
            .await?
        }
        LeaderboardWindow::TrailingSevenDays => {
            sqlx::query_scalar::<_, bool>(
                "SELECT EXISTS (SELECT 1 FROM leaderboard_cache_windows WHERE window_key = 'trailing-7d')",
            )
            .fetch_one(pool)
            .await?
        }
        LeaderboardWindow::Season => {
            sqlx::query_scalar::<_, bool>(
                "SELECT EXISTS (\
                 SELECT 1 FROM leaderboard_cache_windows \
                 WHERE window_kind = 'season' \
                   AND (($1::text IS NULL AND is_current) OR season = $1))",
            )
            .bind(scope.season.as_deref())
            .fetch_one(pool)
            .await?
        }
    };
    Ok(available)
}

fn push_cached_scope_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    scope: &'args CachedLeaderboardScope,
    row_alias: &str,
) {
    builder.push(" JOIN leaderboard_cache_windows cache_window ON cache_window.window_key = ");
    builder.push(row_alias);
    builder.push(".window_key WHERE cache_window.window_kind = ");
    builder.push_bind(scope.window.kind());
    if scope.window == LeaderboardWindow::Season {
        if let Some(season) = &scope.season {
            builder.push(" AND cache_window.season = ");
            builder.push_bind(season);
        } else {
            builder.push(" AND cache_window.is_current");
        }
    }
    builder.push(" AND ");
    builder.push(row_alias);
    builder.push(".scope_game_type = ");
    builder.push_bind(&scope.game_type);
    builder.push(" AND ");
    builder.push(row_alias);
    builder.push(".scope_team_size = ");
    builder.push_bind(scope.team_size);
    builder.push(" AND ");
    builder.push(row_alias);
    builder.push(".scope_playlist = ");
    builder.push_bind(&scope.playlist);
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
) -> Result<
    (
        ReplaySetFilters,
        LeaderboardPaging,
        Option<LeaderboardWindow>,
    ),
    ApiError,
> {
    let params = QueryParams::from_raw(raw_query);
    let paging = LeaderboardPaging::from_params(&params)?;
    let window = LeaderboardWindow::from_params(&params)?;
    let input = ReplaySetFilterInput::from_query_params(&params)?;
    let filters = ReplaySetFilters::from_input(input, auth_user_id)?;
    Ok((filters, paging, window))
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
    pub estimated_rank_tier: Option<i32>,
    pub estimated_rank_division: Option<i32>,
    pub estimated_rank_mmr: Option<f64>,
    pub appearance_count: u64,
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/uploads",
    tag = "leaderboards",
    params(
        ("window" = Option<String>, Query, description = "Standard cached window: daily, trailing-7d, or season"),
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter (ranked, casual, tournament, ...)"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("season" = Option<Vec<String>>, Query, description = "Exact replay season filter, e.g. f18 or s12"),
        ("replay-date-after" = Option<String>, Query, description = "Only include games played after this RFC3339 timestamp"),
        ("replay-date-before" = Option<String>, Query, description = "Only include games played before this RFC3339 timestamp"),
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
    let (filters, paging, window) =
        parse_filters(raw_query.as_deref(), auth_user.as_ref().map(|u| u.id))?;

    let (total, rows) = tokio::try_join!(
        load_uploads_total(db, &filters, window),
        load_uploads_rows(db, &filters, window, &paging),
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
        ("window" = Option<String>, Query, description = "Standard cached window: daily, trailing-7d, or season"),
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter (ranked, casual, tournament, ...)"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("season" = Option<Vec<String>>, Query, description = "Exact replay season filter, e.g. f18 or s12"),
        ("replay-date-after" = Option<String>, Query, description = "Only include games played after this RFC3339 timestamp"),
        ("replay-date-before" = Option<String>, Query, description = "Only include games played before this RFC3339 timestamp"),
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
    let (filters, paging, window) =
        parse_filters(raw_query.as_deref(), auth_user.as_ref().map(|u| u.id))?;
    let mut cached_scope = CachedLeaderboardScope::from_filters(window, &filters);
    if let Some(scope) = &cached_scope {
        if !cache_scope_available(db, scope)
            .await
            .map_err(ApiError::internal)?
        {
            cached_scope = None;
        }
    }

    let (total, rows) = tokio::try_join!(
        load_appearances_total(db, &filters, window, cached_scope.as_ref()),
        load_appearances_rows(db, &filters, window, cached_scope.as_ref(), &paging),
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
    window: Option<LeaderboardWindow>,
) -> Result<u64, sqlx::Error> {
    let total: i64 = uploads_total_query(filters, window)
        .build()
        .fetch_one(pool)
        .await?
        .try_get("total")?;
    Ok(total.max(0) as u64)
}

async fn load_uploads_rows(
    pool: &sqlx::PgPool,
    filters: &ReplaySetFilters,
    window: Option<LeaderboardWindow>,
    paging: &LeaderboardPaging,
) -> Result<Vec<UploadsLeaderboardRowResponse>, sqlx::Error> {
    let rows = uploads_rows_query(filters, window, paging)
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

fn uploads_total_query(
    filters: &ReplaySetFilters,
    window: Option<LeaderboardWindow>,
) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT COUNT(DISTINCT r.uploaded_by_user_id) AS total FROM replays r \
         WHERE r.uploaded_by_user_id IS NOT NULL",
    );
    append_replay_set_filters(&mut builder, filters, "r");
    push_live_window_filter(&mut builder, window, filters, "r");
    builder
}

fn uploads_rows_query<'args>(
    filters: &'args ReplaySetFilters,
    window: Option<LeaderboardWindow>,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT r.uploaded_by_user_id AS user_id, u.display_name AS display_name, \
         COUNT(*) AS upload_count \
         FROM replays r JOIN users u ON u.id = r.uploaded_by_user_id \
         WHERE r.uploaded_by_user_id IS NOT NULL",
    );
    append_replay_set_filters(&mut builder, filters, "r");
    push_live_window_filter(&mut builder, window, filters, "r");
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
    window: Option<LeaderboardWindow>,
    cached_scope: Option<&CachedLeaderboardScope>,
) -> Result<u64, sqlx::Error> {
    let total: i64 = match cached_scope {
        Some(scope) => cached_appearances_total_query(scope),
        None => appearances_total_query(filters, window),
    }
    .build()
    .fetch_one(pool)
    .await?
    .try_get("total")?;
    Ok(total.max(0) as u64)
}

async fn load_appearances_rows(
    pool: &sqlx::PgPool,
    filters: &ReplaySetFilters,
    window: Option<LeaderboardWindow>,
    cached_scope: Option<&CachedLeaderboardScope>,
    paging: &LeaderboardPaging,
) -> Result<Vec<AppearancesLeaderboardRowResponse>, sqlx::Error> {
    let rows = match cached_scope {
        Some(scope) => cached_appearances_rank_query(scope, paging),
        None => appearances_rank_query(filters, window, paging),
    }
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
                estimated_rank_tier: None,
                estimated_rank_division: None,
                estimated_rank_mmr: None,
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
    let profiles = load_player_profiles(pool, &pairs, filters, window).await?;
    for entry in &mut entries {
        if let Some(profile) =
            profiles.get(&(entry.platform.clone(), entry.platform_player_id.clone()))
        {
            entry.display_name = profile.display_name.clone();
            entry.is_pro = profile.is_pro;
            entry.estimated_rank_tier = profile.estimated_rank_tier;
            entry.estimated_rank_division = profile.estimated_rank_division;
            entry.estimated_rank_mmr = profile.estimated_rank_mmr;
        }
    }

    Ok(entries)
}

type PlayerKey = (String, String);

struct PlayerProfile {
    display_name: Option<String>,
    is_pro: bool,
    estimated_rank_tier: Option<i32>,
    estimated_rank_division: Option<i32>,
    estimated_rank_mmr: Option<f64>,
}

/// Resolves the latest-known name and pro flag for a bounded set of players.
/// Shared by every player-keyed leaderboard so the heavy ranking queries can
/// stay lean and enrich only the returned page.
async fn load_player_profiles(
    pool: &sqlx::PgPool,
    pairs: &[PlayerKey],
    filters: &ReplaySetFilters,
    window: Option<LeaderboardWindow>,
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
    let estimated_ranks = load_estimated_player_ranks(pool, pairs, filters, window).await?;
    let mut profiles = HashMap::with_capacity(rows.len());
    for row in rows {
        let platform: String = row.try_get("platform")?;
        let platform_player_id: String = row.try_get("platform_player_id")?;
        let rank = estimated_ranks.get(&platform_player_id);
        profiles.insert(
            (platform, platform_player_id),
            PlayerProfile {
                display_name: row.try_get("display_name")?,
                is_pro: row.try_get::<Option<bool>, _>("is_pro")?.unwrap_or(false),
                estimated_rank_tier: rank.and_then(|rank| rank.tier),
                estimated_rank_division: rank.and_then(|rank| rank.division),
                estimated_rank_mmr: rank.and_then(|rank| rank.mmr),
            },
        );
    }
    Ok(profiles)
}

#[derive(Debug, Clone, Copy)]
struct EstimatedPlayerRank {
    tier: Option<i32>,
    division: Option<i32>,
    mmr: Option<f64>,
}

async fn load_estimated_player_ranks(
    pool: &sqlx::PgPool,
    pairs: &[PlayerKey],
    filters: &ReplaySetFilters,
    window: Option<LeaderboardWindow>,
) -> Result<HashMap<String, EstimatedPlayerRank>, sqlx::Error> {
    let playlist_ids = rank_playlist_ids_for_filters(filters);
    if playlist_ids.len() != 1 {
        return Ok(HashMap::new());
    }

    let player_ids: Vec<String> = pairs
        .iter()
        .map(|(_, platform_player_id)| platform_player_id.clone())
        .collect::<HashSet<_>>()
        .into_iter()
        .collect();
    if player_ids.is_empty() {
        return Ok(HashMap::new());
    }

    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT DISTINCT ON (s.platform_player_id) \
         s.platform_player_id AS platform_player_id, \
         s.tier AS tier, s.division AS division, s.mmr AS mmr \
         FROM replay_player_rank_submissions s \
         JOIN replays r ON r.id = s.replay_id \
         WHERE s.platform_player_id = ANY(",
    );
    builder.push_bind(&player_ids);
    builder.push(
        ") AND s.tier IS NOT NULL \
         AND s.valid IS DISTINCT FROM FALSE \
         AND s.playlist = ",
    );
    builder.push_bind(playlist_ids[0]);
    append_replay_set_filters(&mut builder, filters, "r");
    push_live_window_filter(&mut builder, window, filters, "r");
    builder.push(
        " ORDER BY s.platform_player_id, \
         COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, s.updated_at DESC",
    );

    let rows = builder.build().fetch_all(pool).await?;
    let mut ranks = HashMap::with_capacity(rows.len());
    for row in rows {
        ranks.insert(
            row.try_get("platform_player_id")?,
            EstimatedPlayerRank {
                tier: row.try_get("tier")?,
                division: row.try_get("division")?,
                mmr: row.try_get("mmr")?,
            },
        );
    }
    Ok(ranks)
}

fn rank_playlist_ids_for_filters(filters: &ReplaySetFilters) -> Vec<i32> {
    let mut ids: Vec<i32> = filters
        .playlists
        .iter()
        .filter_map(|playlist| rank_playlist_id_for_slug(playlist))
        .collect();
    ids.sort_unstable();
    ids.dedup();
    if !ids.is_empty() {
        return ids;
    }

    let ranked_scope = filters.game_types.is_empty()
        || (filters.game_types.len() == 1 && filters.game_types[0] == "ranked");
    if ranked_scope && filters.team_sizes.len() == 1 {
        if let Some(id) = ranked_playlist_id_for_team_size(filters.team_sizes[0]) {
            return vec![id];
        }
    }

    Vec::new()
}

fn rank_playlist_id_for_slug(playlist: &str) -> Option<i32> {
    match playlist {
        "ranked-duels" => Some(10),
        "ranked-doubles" => Some(11),
        "ranked-standard" => Some(13),
        _ => None,
    }
}

fn ranked_playlist_id_for_team_size(team_size: i32) -> Option<i32> {
    match team_size {
        1 => Some(10),
        2 => Some(11),
        3 => Some(13),
        _ => None,
    }
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
    window: Option<LeaderboardWindow>,
) {
    if filters.is_empty() && window.is_none() {
        builder.push(
            " FROM replay_players rp \
             WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
             AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> ''",
        );
        push_aggregate_excluded_player_filter(builder, "rp.platform", "rp.platform_player_id");
        return;
    }

    builder.push(
        " FROM replay_players rp JOIN replays r ON r.id = rp.replay_id \
         WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
         AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> ''",
    );
    push_aggregate_excluded_player_filter(builder, "rp.platform", "rp.platform_player_id");
    append_replay_set_filters(builder, filters, "r");
    push_live_window_filter(builder, window, filters, "r");
}

fn appearances_rank_query<'args>(
    filters: &'args ReplaySetFilters,
    window: Option<LeaderboardWindow>,
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
    append_appearances_from_where(&mut builder, filters, window);
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

fn appearances_total_query(
    filters: &ReplaySetFilters,
    window: Option<LeaderboardWindow>,
) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("SELECT COUNT(*) AS total FROM (SELECT 1");
    append_appearances_from_where(&mut builder, filters, window);
    builder.push(" GROUP BY rp.platform, rp.platform_player_id) ranked_players");
    builder
}

fn cached_appearances_rank_query<'args>(
    scope: &'args CachedLeaderboardScope,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT cached.platform, cached.platform_player_id, \
         cached.replay_count AS appearance_count \
         FROM leaderboard_player_window_totals cached",
    );
    push_cached_scope_filter(&mut builder, scope, "cached");
    builder.push(
        " ORDER BY cached.replay_count DESC, cached.platform, cached.platform_player_id LIMIT ",
    );
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

fn cached_appearances_total_query(scope: &CachedLeaderboardScope) -> QueryBuilder<'_, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT COUNT(*) AS total FROM leaderboard_player_window_totals cached",
    );
    push_cached_scope_filter(&mut builder, scope, "cached");
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
enum EventSort {
    Total,
    PerGame,
    PerMinute,
}

impl EventSort {
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
    fn order_sql(self) -> &'static str {
        match self {
            Self::Total => "event_count DESC",
            Self::PerGame => "count_per_game DESC NULLS LAST, event_count DESC",
            Self::PerMinute => "per_active_minute DESC NULLS LAST, event_count DESC",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum EventCountSource {
    Scoreboard { column: &'static str },
    SubjectRole { role: &'static str },
    AnySubject,
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
    pub estimated_rank_tier: Option<i32>,
    pub estimated_rank_division: Option<i32>,
    pub estimated_rank_mmr: Option<f64>,
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
    window: Option<LeaderboardWindow>,
    stat_terms: Vec<String>,
    sort: EventSort,
    min_games: i64,
}

impl EventLeaderboardFilters {
    fn from_query(
        raw_query: Option<&str>,
        auth_user_id: Option<Uuid>,
    ) -> Result<(Self, LeaderboardPaging), ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let paging = LeaderboardPaging::from_params(&params)?;
        let window = LeaderboardWindow::from_params(&params)?;
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
        let sort = EventSort::from_query(params.first(&["sort", "rate"]).as_deref())?;
        let min_games = params
            .first(&["min-games", "min_games"])
            .map(|value| parse_u32_filter("min-games", &value))
            .transpose()?
            .unwrap_or(1)
            .max(1) as i64;
        Ok((
            Self {
                replay,
                window,
                stat_terms,
                sort,
                min_games,
            },
            paging,
        ))
    }

    fn event_count_source(&self) -> EventCountSource {
        let [term] = self.stat_terms.as_slice() else {
            return EventCountSource::AnySubject;
        };
        match term.as_str() {
            "goal" | "goals" | "core.goal" => EventCountSource::Scoreboard { column: "goals" },
            "assist" | "assists" | "core.assist" => {
                EventCountSource::Scoreboard { column: "assists" }
            }
            "save" | "saves" | "core.save" => EventCountSource::Scoreboard { column: "saves" },
            "shot" | "shots" | "core.shot" => EventCountSource::Scoreboard { column: "shots" },
            "bump" | "bumps" => EventCountSource::SubjectRole { role: "initiator" },
            "demolition" | "demolitions" | "demo" | "demos" => {
                EventCountSource::SubjectRole { role: "attacker" }
            }
            "pass" | "passes" => EventCountSource::SubjectRole { role: "passer" },
            _ => EventCountSource::AnySubject,
        }
    }

    fn qualifying_min_games(&self) -> i64 {
        if self.sort == EventSort::PerMinute {
            self.min_games
        } else {
            1
        }
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/event",
    tag = "leaderboards",
    params(
        ("window" = Option<String>, Query, description = "Standard cached window: daily, trailing-7d, or season"),
        ("event-type" = Option<Vec<String>>, Query, description = "Event-type filter (alias stat-term); fuzzy-matches event_types key/display/category. Empty = all user-facing events"),
        ("sort" = Option<String>, Query, description = "Ranking metric: total (default), per-game, or per-minute"),
        ("min-games" = Option<u32>, Query, description = "Minimum replay appearances to qualify (default 1)"),
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("season" = Option<Vec<String>>, Query, description = "Exact replay season filter, e.g. f18 or s12"),
        ("replay-date-after" = Option<String>, Query, description = "Only include games played after this RFC3339 timestamp"),
        ("replay-date-before" = Option<String>, Query, description = "Only include games played before this RFC3339 timestamp"),
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

    let matched = resolve_matched_event_types(db, &filters.stat_terms)
        .await
        .map_err(ApiError::internal)?;
    let mut cached_scope = CachedLeaderboardScope::from_filters(filters.window, &filters.replay);
    if let Some(scope) = &cached_scope {
        if !cache_scope_available(db, scope)
            .await
            .map_err(ApiError::internal)?
        {
            cached_scope = None;
        }
    }
    let cached_metric_key = (matched.len() == 1).then(|| matched[0].key.as_str());
    let use_cache = cached_scope.is_some()
        && cached_metric_key.is_some()
        && matches!(filters.sort, EventSort::Total | EventSort::PerMinute);
    let cached_scope_ref = if use_cache {
        cached_scope.as_ref()
    } else {
        None
    };
    let cached_metric_key = if use_cache { cached_metric_key } else { None };

    let (total, rows) = tokio::try_join!(
        load_event_total(db, &filters, cached_scope_ref, cached_metric_key),
        load_event_rows(db, &filters, cached_scope_ref, cached_metric_key, &paging,),
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
    cached_scope: Option<&CachedLeaderboardScope>,
    cached_metric_key: Option<&str>,
) -> Result<u64, ApiError> {
    let total: i64 = match (cached_scope, cached_metric_key) {
        (Some(scope), Some(metric_key)) => cached_event_total_query(filters, scope, metric_key),
        _ => event_total_query(filters),
    }
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
    cached_scope: Option<&CachedLeaderboardScope>,
    cached_metric_key: Option<&str>,
    paging: &LeaderboardPaging,
) -> Result<Vec<EventLeaderboardRowResponse>, ApiError> {
    let rows = match (cached_scope, cached_metric_key) {
        (Some(scope), Some(metric_key)) => {
            cached_event_rank_query(filters, scope, metric_key, paging)
        }
        _ => event_rank_query(filters, paging),
    }
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
                estimated_rank_tier: None,
                estimated_rank_division: None,
                estimated_rank_mmr: None,
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
    let profiles = load_player_profiles(pool, &pairs, &filters.replay, filters.window)
        .await
        .map_err(ApiError::internal)?;
    for entry in &mut entries {
        if let Some(profile) =
            profiles.get(&(entry.platform.clone(), entry.platform_player_id.clone()))
        {
            entry.display_name = profile.display_name.clone();
            entry.is_pro = profile.is_pro;
            entry.estimated_rank_tier = profile.estimated_rank_tier;
            entry.estimated_rank_division = profile.estimated_rank_division;
            entry.estimated_rank_mmr = profile.estimated_rank_mmr;
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
    if let EventCountSource::Scoreboard { column } = filters.event_count_source() {
        builder.push(
            "WITH event_counts AS (\
             SELECT rp.platform AS platform, rp.platform_player_id AS platform_player_id, \
             COALESCE(SUM(rp.",
        );
        builder.push(column);
        builder.push(
            "), 0)::bigint AS event_count \
             FROM replay_players rp \
             JOIN replays r ON r.id = rp.replay_id \
             WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
             AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> '' \
             AND r.canonical_analysis_run_id IS NOT NULL",
        );
        push_aggregate_excluded_player_filter(builder, "rp.platform", "rp.platform_player_id");
        append_replay_set_filters(builder, &filters.replay, "r");
        push_live_window_filter(builder, filters.window, &filters.replay, "r");
        builder.push(
            " GROUP BY rp.platform, rp.platform_player_id \
             HAVING COALESCE(SUM(rp.",
        );
        builder.push(column);
        builder.push(
            "), 0) > 0), \
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
        push_aggregate_excluded_player_filter(builder, "rp.platform", "rp.platform_player_id");
        append_replay_set_filters(builder, &filters.replay, "r");
        push_live_window_filter(builder, filters.window, &filters.replay, "r");
        builder.push(" GROUP BY rp.platform, rp.platform_player_id)");
        return;
    }

    builder.push(
        "WITH event_counts AS (\
         SELECT rp.platform AS platform, rp.platform_player_id AS platform_player_id, \
         COUNT(DISTINCT event.id) AS event_count \
         FROM replay_players rp \
         JOIN replays r ON r.id = rp.replay_id \
         JOIN play_event_subjects subject ON subject.replay_player_id = rp.id \
         ",
    );
    if let EventCountSource::SubjectRole { role } = filters.event_count_source() {
        builder.push("AND subject.role = ");
        builder.push_bind(role);
        builder.push(" ");
    }
    builder.push(
        "JOIN play_events event ON event.id = subject.event_id \
         AND event.analysis_run_id = r.canonical_analysis_run_id",
    );
    append_user_facing_stat_event_join_filter(builder, "event");
    append_stat_term_event_filter(builder, "event", &filters.stat_terms);
    builder.push(
        " WHERE rp.platform IS NOT NULL AND btrim(rp.platform) <> '' \
         AND rp.platform_player_id IS NOT NULL AND btrim(rp.platform_player_id) <> '' \
         AND r.canonical_analysis_run_id IS NOT NULL",
    );
    push_aggregate_excluded_player_filter(builder, "rp.platform", "rp.platform_player_id");
    append_replay_set_filters(builder, &filters.replay, "r");
    push_live_window_filter(builder, filters.window, &filters.replay, "r");
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
    push_aggregate_excluded_player_filter(builder, "rp.platform", "rp.platform_player_id");
    append_replay_set_filters(builder, &filters.replay, "r");
    push_live_window_filter(builder, filters.window, &filters.replay, "r");
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
    builder.push_bind(filters.qualifying_min_games());
    builder.push(" ORDER BY ");
    builder.push(filters.sort.order_sql());
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
    builder.push_bind(filters.qualifying_min_games());
    builder
}

fn cached_event_rank_query<'args>(
    filters: &'args EventLeaderboardFilters,
    scope: &'args CachedLeaderboardScope,
    metric_key: &'args str,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT cached.platform, cached.platform_player_id, \
         ROUND(cached.total_value)::bigint AS event_count, \
         cached.replay_count, cached.active_time_seconds, \
         cached.total_value / NULLIF(cached.replay_count, 0) AS count_per_game, \
         cached.value_per_5_minutes / 5.0 AS per_active_minute \
         FROM leaderboard_player_window_metrics cached",
    );
    push_cached_scope_filter(&mut builder, scope, "cached");
    builder.push(" AND cached.metric_kind = 'event' AND cached.metric_key = ");
    builder.push_bind(metric_key);
    if filters.sort == EventSort::PerMinute {
        builder.push(" AND cached.replay_count >= ");
        builder.push_bind(filters.min_games);
    }
    match filters.sort {
        EventSort::Total => builder.push(" ORDER BY cached.total_value DESC"),
        EventSort::PerMinute => builder
            .push(" ORDER BY cached.value_per_5_minutes DESC NULLS LAST, cached.total_value DESC"),
        EventSort::PerGame => unreachable!("per-game event rankings use the live query"),
    };
    builder.push(", cached.platform, cached.platform_player_id LIMIT ");
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

fn cached_event_total_query<'args>(
    filters: &'args EventLeaderboardFilters,
    scope: &'args CachedLeaderboardScope,
    metric_key: &'args str,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT COUNT(*) AS total FROM leaderboard_player_window_metrics cached",
    );
    push_cached_scope_filter(&mut builder, scope, "cached");
    builder.push(" AND cached.metric_kind = 'event' AND cached.metric_key = ");
    builder.push_bind(metric_key);
    if filters.sort == EventSort::PerMinute {
        builder.push(" AND cached.replay_count >= ");
        builder.push_bind(filters.min_games);
    }
    builder
}

// ---------------------------------------------------------------------------
// Stat leaderboard: rank players by materialized continuous stats. Composite
// time/share stats are projected into `player_replay_stat_facts` during replay
// processing, then aggregated here with common value/denominator semantics.
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StatLeaderboardMetric {
    BallOpponentHalf,
    BallAdvance,
    PossessionTime,
    TouchesPerPossession,
    AvgPossessionDuration,
    HighAerialTouchCount,
    ControlTouchCount,
    BigBoostPadCount,
    SmallBoostPadCount,
    BigBoostAmount,
    SmallBoostAmount,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum RelativeFieldHalf {
    Opponent,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StatMetricSource {
    BallHalfDuration {
        half: RelativeFieldHalf,
    },
    PlayerPossessionAdvance,
    PlayerPossessionDuration,
    PlayerPossessionAverage {
        numerator: PossessionAverageNumerator,
    },
    TouchCount,
    Boost {
        column: BoostMetricColumn,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum PossessionAverageNumerator {
    Touches,
    DurationSeconds,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum BoostMetricColumn {
    BigPads,
    SmallPads,
    BigAmount,
    SmallAmount,
}

impl BoostMetricColumn {
    fn sql(self) -> &'static str {
        match self {
            Self::BigPads => "boost.big_pads",
            Self::SmallPads => "boost.small_pads",
            Self::BigAmount => "boost.boost_collected_big",
            Self::SmallAmount => "boost.boost_collected_small",
        }
    }
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
            StatMetricSource::BallHalfDuration {
                half: RelativeFieldHalf::Opponent,
            } => self.key,
            StatMetricSource::PlayerPossessionAdvance => self.key,
            StatMetricSource::PlayerPossessionDuration => self.key,
            StatMetricSource::PlayerPossessionAverage { .. } => self.key,
            StatMetricSource::TouchCount => self.key,
            StatMetricSource::Boost { .. } => self.key,
        }
    }

    fn is_average(self) -> bool {
        matches!(
            self.source,
            StatMetricSource::PlayerPossessionAverage { .. }
        )
    }

    fn supports_share(self) -> bool {
        self.unit == "seconds" && !self.is_average()
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
    StatMetricDefinition {
        metric: StatLeaderboardMetric::BallAdvance,
        key: "ball-advance",
        aliases: &[
            "ball_advance",
            "ball-advanced",
            "ball_advanced",
            "advance",
            "advance-distance",
            "advance_distance",
        ],
        display_name: "Ball advance",
        description: "Unreal units the player advanced the ball during possessions",
        unit: "uu",
        source: StatMetricSource::PlayerPossessionAdvance,
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::TouchesPerPossession,
        key: "touches-per-possession",
        aliases: &[
            "touches_per_possession",
            "touches-per-posession",
            "touches_per_posession",
            "touches-possession",
            "touches_possession",
        ],
        display_name: "Touches per possession",
        description: "Average touches recorded in each individual possession",
        unit: "touches_per_possession",
        source: StatMetricSource::PlayerPossessionAverage {
            numerator: PossessionAverageNumerator::Touches,
        },
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::AvgPossessionDuration,
        key: "avg-possession-duration",
        aliases: &[
            "average-possession-duration",
            "average_possession_duration",
            "avg_possession_duration",
            "possession-duration",
            "posession-duration",
            "average-posession-duration",
            "avg-posession-duration",
        ],
        display_name: "Average possession duration",
        description: "Average seconds per individual possession",
        unit: "seconds",
        source: StatMetricSource::PlayerPossessionAverage {
            numerator: PossessionAverageNumerator::DurationSeconds,
        },
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::HighAerialTouchCount,
        key: "high-aerial-touch-count",
        aliases: &[
            "high_aerial_touch_count",
            "high-aerial-touches",
            "high_aerial_touches",
            "high-aerial-touch",
            "high_aerial_touch",
        ],
        display_name: "High aerial touches",
        description: "Touches classified as high aerial contacts",
        unit: "count",
        source: StatMetricSource::TouchCount,
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::ControlTouchCount,
        key: "control-touch-count",
        aliases: &[
            "control_touch_count",
            "control-touches",
            "control_touches",
            "control-touch",
            "control_touch",
        ],
        display_name: "Control touches",
        description: "Touches classified as controlled contacts",
        unit: "count",
        source: StatMetricSource::TouchCount,
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::BigBoostPadCount,
        key: "big-boost-pad-count",
        aliases: &[
            "big_boost_pad_count",
            "big-boost-count",
            "big_boost_count",
            "big-pads",
            "big_pads",
            "big-boost-pads",
            "big_boost_pads",
        ],
        display_name: "Big boost pad count",
        description: "Big boost pads collected by the player",
        unit: "count",
        source: StatMetricSource::Boost {
            column: BoostMetricColumn::BigPads,
        },
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::SmallBoostPadCount,
        key: "small-boost-pad-count",
        aliases: &[
            "small_boost_pad_count",
            "small-boost-count",
            "small_boost_count",
            "small-pads",
            "small_pads",
            "small-boost-pads",
            "small_boost_pads",
        ],
        display_name: "Small boost pad count",
        description: "Small boost pads collected by the player",
        unit: "count",
        source: StatMetricSource::Boost {
            column: BoostMetricColumn::SmallPads,
        },
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::BigBoostAmount,
        key: "big-boost-amount",
        aliases: &[
            "big_boost_amount",
            "amount-from-big-boosts",
            "amount_from_big_boosts",
            "boost-from-big-boosts",
            "boost_from_big_boosts",
            "boost-collected-big",
            "boost_collected_big",
        ],
        display_name: "Boost from big pads",
        description: "Boost amount collected from big pads, in normal 0-100 boost units",
        unit: "boost",
        source: StatMetricSource::Boost {
            column: BoostMetricColumn::BigAmount,
        },
    },
    StatMetricDefinition {
        metric: StatLeaderboardMetric::SmallBoostAmount,
        key: "small-boost-amount",
        aliases: &[
            "small_boost_amount",
            "amount-from-small-boosts",
            "amount_from_small_boosts",
            "boost-from-small-boosts",
            "boost_from_small_boosts",
            "boost-collected-small",
            "boost_collected_small",
        ],
        display_name: "Boost from small pads",
        description: "Boost amount collected from small pads, in normal 0-100 boost units",
        unit: "boost",
        source: StatMetricSource::Boost {
            column: BoostMetricColumn::SmallAmount,
        },
    },
];

const STAT_METRIC_KEYS: &str = "ball-opponent-half, possession-time, ball-advance, touches-per-possession, avg-possession-duration, high-aerial-touch-count, control-touch-count, big-boost-pad-count, small-boost-pad-count, big-boost-amount, small-boost-amount";

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
                ApiError::bad_request(format!("stat must be one of: {STAT_METRIC_KEYS}"))
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
    Average,
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
            Some("average") | Some("avg") => Ok(Self::Average),
            Some(_) => Err(ApiError::bad_request(
                "sort must be one of: total, per-game, per-minute, share, average",
            )),
        }
    }

    fn order_sql(self) -> &'static str {
        match self {
            Self::Total => "value DESC",
            Self::PerGame => "value_per_game DESC NULLS LAST, value DESC",
            Self::PerMinute => "value_per_active_minute DESC NULLS LAST, value DESC",
            Self::Share => "share_of_active_time DESC NULLS LAST, value DESC",
            Self::Average => "value DESC",
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
    pub estimated_rank_tier: Option<i32>,
    pub estimated_rank_division: Option<i32>,
    pub estimated_rank_mmr: Option<f64>,
    pub value: f64,
    pub replay_count: u64,
    pub active_time_seconds: Option<f64>,
    /// Count of underlying samples for average metrics, e.g. possession spans.
    pub sample_count: Option<u64>,
    pub value_per_game: Option<f64>,
    pub value_per_active_minute: Option<f64>,
    pub share_of_active_time: Option<f64>,
}

#[derive(Debug, Clone)]
struct StatLeaderboardFilters {
    replay: ReplaySetFilters,
    window: Option<LeaderboardWindow>,
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
        let window = LeaderboardWindow::from_params(&params)?;
        let replay = ReplaySetFilters::from_input(
            ReplaySetFilterInput::from_query_params(&params)?,
            auth_user_id,
        )?;
        let metric =
            StatLeaderboardMetric::from_query(params.first(&["stat", "metric"]).as_deref())?;
        let sort = StatLeaderboardSort::from_query(params.first(&["sort", "rate"]).as_deref())?;
        if sort == StatLeaderboardSort::Share && !metric.definition().supports_share() {
            return Err(ApiError::bad_request(
                "share sorting is only available for second-based stats",
            ));
        }
        let min_games = params
            .first(&["min-games", "min_games"])
            .map(|value| parse_u32_filter("min-games", &value))
            .transpose()?
            .unwrap_or(1)
            .max(1) as i64;
        Ok((
            Self {
                replay,
                window,
                metric,
                sort,
                min_games,
            },
            paging,
        ))
    }

    fn qualifying_min_games(&self) -> i64 {
        if self.sort == StatLeaderboardSort::PerMinute {
            self.min_games
        } else {
            1
        }
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/leaderboards/stat",
    tag = "leaderboards",
    params(
        ("window" = Option<String>, Query, description = "Standard cached window: daily, trailing-7d, or season"),
        ("stat" = Option<String>, Query, description = "Materialized stat metric: ball-opponent-half (default), possession-time, ball-advance, touches-per-possession, avg-possession-duration, high-aerial-touch-count, control-touch-count, big-boost-pad-count, small-boost-pad-count, big-boost-amount, or small-boost-amount"),
        ("sort" = Option<String>, Query, description = "Ranking metric: total (default), per-game, per-minute, share, or average"),
        ("min-games" = Option<u32>, Query, description = "Minimum replay appearances to qualify (default 1)"),
        ("game-type" = Option<Vec<String>>, Query, description = "Competitive context filter"),
        ("team-size" = Option<Vec<String>>, Query, description = "Team size filter (1-4 or 1v1/2v2/3v3/4v4)"),
        ("playlist" = Option<Vec<String>>, Query, description = "Playlist/game-mode filter"),
        ("season" = Option<Vec<String>>, Query, description = "Exact replay season filter, e.g. f18 or s12"),
        ("replay-date-after" = Option<String>, Query, description = "Only include games played after this RFC3339 timestamp"),
        ("replay-date-before" = Option<String>, Query, description = "Only include games played before this RFC3339 timestamp"),
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
    let mut cached_scope = CachedLeaderboardScope::from_filters(filters.window, &filters.replay);
    if let Some(scope) = &cached_scope {
        if !cache_scope_available(db, scope)
            .await
            .map_err(ApiError::internal)?
        {
            cached_scope = None;
        }
    }
    let use_cache = cached_scope.is_some()
        && matches!(
            filters.sort,
            StatLeaderboardSort::Total | StatLeaderboardSort::PerMinute
        );
    let cached_scope = if use_cache {
        cached_scope.as_ref()
    } else {
        None
    };

    let (total, rows) = tokio::try_join!(
        load_stat_total(db, &filters, cached_scope),
        load_stat_rows(db, &filters, cached_scope, &paging),
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
    cached_scope: Option<&CachedLeaderboardScope>,
) -> Result<u64, ApiError> {
    let total: i64 = match cached_scope {
        Some(scope) => cached_stat_total_query(filters, scope),
        None => stat_total_query(filters),
    }
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
    cached_scope: Option<&CachedLeaderboardScope>,
    paging: &LeaderboardPaging,
) -> Result<Vec<StatLeaderboardRowResponse>, ApiError> {
    let rows = match cached_scope {
        Some(scope) => cached_stat_rank_query(filters, scope, paging),
        None => stat_rank_query(filters, paging),
    }
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
                estimated_rank_tier: None,
                estimated_rank_division: None,
                estimated_rank_mmr: None,
                value: row.try_get("value")?,
                replay_count: replay_count.max(0) as u64,
                active_time_seconds: row.try_get("active_time_seconds")?,
                sample_count: row
                    .try_get::<Option<i64>, _>("sample_count")?
                    .map(|value| value.max(0) as u64),
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
    let profiles = load_player_profiles(pool, &pairs, &filters.replay, filters.window)
        .await
        .map_err(ApiError::internal)?;
    for entry in &mut entries {
        if let Some(profile) =
            profiles.get(&(entry.platform.clone(), entry.platform_player_id.clone()))
        {
            entry.display_name = profile.display_name.clone();
            entry.is_pro = profile.is_pro;
            entry.estimated_rank_tier = profile.estimated_rank_tier;
            entry.estimated_rank_division = profile.estimated_rank_division;
            entry.estimated_rank_mmr = profile.estimated_rank_mmr;
        }
    }

    Ok(entries)
}

fn push_stat_fact_cte<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatLeaderboardFilters,
) {
    let definition = filters.metric.definition();
    if let StatMetricSource::PlayerPossessionAverage { numerator } = definition.source {
        let numerator_sql = match numerator {
            PossessionAverageNumerator::Touches => "possession.touch_count",
            PossessionAverageNumerator::DurationSeconds => "possession.duration_seconds",
        };
        builder.push(
            "WITH metric_values AS (\
             SELECT possession.platform AS platform, possession.platform_player_id AS platform_player_id, \
             SUM(",
        );
        builder.push(numerator_sql);
        builder.push(
            ")::float8 / NULLIF(SUM(possession.possession_count), 0)::float8 AS value, \
             COUNT(DISTINCT possession.replay_id) AS replay_count, \
             SUM(rp.active_time_seconds) AS active_time_seconds, \
             NULL::float8 AS denominator_value, \
             SUM(possession.possession_count)::bigint AS sample_count \
             FROM player_replay_possession possession \
             JOIN replays r ON r.id = possession.replay_id \
             AND r.canonical_analysis_run_id = possession.analysis_run_id \
             LEFT JOIN replay_players rp ON rp.id = possession.replay_player_id \
             WHERE possession.platform IS NOT NULL AND btrim(possession.platform) <> '' \
             AND possession.platform_player_id IS NOT NULL \
             AND btrim(possession.platform_player_id) <> ''",
        );
        push_aggregate_excluded_player_filter(
            builder,
            "possession.platform",
            "possession.platform_player_id",
        );
        append_replay_set_filters(builder, &filters.replay, "r");
        push_live_window_filter(builder, filters.window, &filters.replay, "r");
        builder.push(
            " GROUP BY possession.platform, possession.platform_player_id \
             HAVING SUM(possession.possession_count) > 0)",
        );
        return;
    }

    if let StatMetricSource::Boost { column } = definition.source {
        builder.push(
            "WITH metric_values AS (\
             SELECT boost.platform AS platform, boost.platform_player_id AS platform_player_id, \
             COALESCE(SUM(",
        );
        builder.push(column.sql());
        builder.push(
            "), 0.0)::float8 AS value, \
             COUNT(DISTINCT boost.replay_id) AS replay_count, \
             SUM(boost.tracked_seconds) AS active_time_seconds, \
             NULL::float8 AS denominator_value, \
             NULL::bigint AS sample_count \
             FROM player_replay_boost boost \
             JOIN replays r ON r.id = boost.replay_id \
             AND r.canonical_analysis_run_id = boost.analysis_run_id \
             WHERE boost.platform IS NOT NULL AND btrim(boost.platform) <> '' \
             AND boost.platform_player_id IS NOT NULL \
             AND btrim(boost.platform_player_id) <> ''",
        );
        push_aggregate_excluded_player_filter(
            builder,
            "boost.platform",
            "boost.platform_player_id",
        );
        append_replay_set_filters(builder, &filters.replay, "r");
        push_live_window_filter(builder, filters.window, &filters.replay, "r");
        builder.push(
            " GROUP BY boost.platform, boost.platform_player_id \
             HAVING COALESCE(SUM(",
        );
        builder.push(column.sql());
        builder.push("), 0.0) > 0)");
        return;
    }

    builder.push(
        "WITH metric_values AS (\
         SELECT fact.platform AS platform, fact.platform_player_id AS platform_player_id, \
         COALESCE(SUM(fact.value), 0.0) AS value, \
         COUNT(DISTINCT fact.replay_id) AS replay_count, \
         SUM(fact.active_time_seconds) AS active_time_seconds, \
         SUM(fact.denominator_value) AS denominator_value, \
         NULL::bigint AS sample_count \
         FROM player_replay_stat_facts fact \
         JOIN replays r ON r.id = fact.replay_id AND r.canonical_analysis_run_id = fact.analysis_run_id \
         WHERE fact.stat_key = ",
    );
    builder.push_bind(definition.fact_key());
    push_aggregate_excluded_player_filter(builder, "fact.platform", "fact.platform_player_id");
    append_replay_set_filters(builder, &filters.replay, "r");
    push_live_window_filter(builder, filters.window, &filters.replay, "r");
    builder.push(
        " GROUP BY fact.platform, fact.platform_player_id \
         HAVING COALESCE(SUM(fact.value), 0.0) > 0)",
    );
}

fn stat_rank_query<'args>(
    filters: &'args StatLeaderboardFilters,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new("");
    let is_average = filters.metric.definition().is_average();
    push_stat_fact_cte(&mut builder, filters);
    builder.push(
        " SELECT m.platform AS platform, m.platform_player_id AS platform_player_id, \
         m.value AS value, m.replay_count AS replay_count, \
         m.active_time_seconds AS active_time_seconds, m.sample_count AS sample_count, ",
    );
    if is_average {
        builder.push(
            "NULL::float8 AS value_per_game, \
             NULL::float8 AS share_of_active_time, \
             NULL::float8 AS value_per_active_minute ",
        );
    } else {
        builder.push(
            "(m.value / NULLIF(m.replay_count, 0)) AS value_per_game, \
             (m.value / NULLIF(m.denominator_value, 0)) AS share_of_active_time, \
             CASE WHEN COALESCE(m.active_time_seconds, 0) > 0 \
             THEN m.value * 60.0 / m.active_time_seconds ELSE NULL END AS value_per_active_minute ",
        );
    }
    builder.push(
        " FROM metric_values m \
         WHERE m.replay_count >= ",
    );
    builder.push_bind(filters.qualifying_min_games());
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
    push_stat_fact_cte(&mut builder, filters);
    builder.push(
        " SELECT COUNT(*) AS total FROM metric_values m \
         WHERE m.replay_count >= ",
    );
    builder.push_bind(filters.qualifying_min_games());
    builder
}

fn cached_stat_rank_query<'args>(
    filters: &'args StatLeaderboardFilters,
    scope: &'args CachedLeaderboardScope,
    paging: &LeaderboardPaging,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT cached.platform, cached.platform_player_id, \
         cached.total_value AS value, cached.replay_count, \
         cached.active_time_seconds, cached.sample_count, \
         cached.total_value / NULLIF(cached.replay_count, 0) AS value_per_game, \
         cached.value_per_5_minutes / 5.0 AS value_per_active_minute, \
         NULL::float8 AS share_of_active_time \
         FROM leaderboard_player_window_metrics cached",
    );
    push_cached_scope_filter(&mut builder, scope, "cached");
    builder.push(" AND cached.metric_kind = 'stat' AND cached.metric_key = ");
    builder.push_bind(filters.metric.definition().key);
    if filters.sort == StatLeaderboardSort::PerMinute {
        builder.push(" AND cached.replay_count >= ");
        builder.push_bind(filters.min_games);
    }
    match filters.sort {
        StatLeaderboardSort::Total => builder.push(" ORDER BY cached.total_value DESC"),
        StatLeaderboardSort::PerMinute => builder
            .push(" ORDER BY cached.value_per_5_minutes DESC NULLS LAST, cached.total_value DESC"),
        _ => unreachable!("unsupported cached stat sort uses the live query"),
    };
    builder.push(", cached.platform, cached.platform_player_id LIMIT ");
    builder.push_bind(i64::from(paging.count));
    builder.push(" OFFSET ");
    builder.push_bind(i64::from(paging.offset));
    builder
}

fn cached_stat_total_query<'args>(
    filters: &'args StatLeaderboardFilters,
    scope: &'args CachedLeaderboardScope,
) -> QueryBuilder<'args, Postgres> {
    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT COUNT(*) AS total FROM leaderboard_player_window_metrics cached",
    );
    push_cached_scope_filter(&mut builder, scope, "cached");
    builder.push(" AND cached.metric_kind = 'stat' AND cached.metric_key = ");
    builder.push_bind(filters.metric.definition().key);
    if filters.sort == StatLeaderboardSort::PerMinute {
        builder.push(" AND cached.replay_count >= ");
        builder.push_bind(filters.min_games);
    }
    builder
}
