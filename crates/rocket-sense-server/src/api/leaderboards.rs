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
    let profiles = load_appearance_profiles(pool, &entries).await?;
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

struct AppearanceProfile {
    display_name: Option<String>,
    is_pro: bool,
}

async fn load_appearance_profiles(
    pool: &sqlx::PgPool,
    entries: &[AppearancesLeaderboardRowResponse],
) -> Result<std::collections::HashMap<PlayerKey, AppearanceProfile>, sqlx::Error> {
    if entries.is_empty() {
        return Ok(std::collections::HashMap::new());
    }

    let pairs: Vec<PlayerKey> = entries
        .iter()
        .map(|entry| (entry.platform.clone(), entry.platform_player_id.clone()))
        .collect();

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
            AppearanceProfile {
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
    // `load_appearance_profiles`).
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
