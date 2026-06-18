use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Path, Query, RawQuery, State},
    http::StatusCode,
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use super::{
    query::{
        deserialize_string_vec, deserialize_uuid_vec, parse_datetime_filter, parse_uuid_values,
        QueryParams,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "players_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/players/name-history", get(search_player_name_history))
        .route(
            "/players/{platform}/{platform_player_id}",
            get(get_player_profile).put(set_player_public_display_name),
        )
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerProfileResponse {
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: Option<String>,
    pub public_display_name: Option<String>,
    pub current_display_name: Option<String>,
    pub names: Vec<PlayerProfileNameResponse>,
    pub replay_count: u64,
    pub first_seen_at: Option<DateTime<Utc>>,
    pub last_seen_at: Option<DateTime<Utc>>,
    pub is_pro: bool,
    pub latest_replays: Vec<PlayerProfileReplayResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerProfileNameResponse {
    pub name: String,
    pub replay_count: u64,
    pub first_seen_at: Option<DateTime<Utc>>,
    pub latest_seen_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerNameHistoryResponse {
    pub names: Vec<PlayerNameHistoryEntryResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerNameHistoryEntryResponse {
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: String,
    pub first_seen_at: DateTime<Utc>,
    pub latest_seen_at: DateTime<Utc>,
    pub current_display_name: Option<String>,
    pub public_display_name: Option<String>,
}

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct PlayerNameHistoryQuery {
    /// Case-insensitive substring search over observed display names.
    pub q: Option<String>,
    /// Optional platform filter.
    #[serde(
        default,
        alias = "platform[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub platform: Vec<String>,
    /// Maximum entries to return.
    pub count: Option<u32>,
    /// Entries to skip.
    pub offset: Option<u32>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct SetPlayerPublicDisplayNameRequest {
    pub display_name: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct SetPlayerPublicDisplayNameResponse {
    pub platform: String,
    pub platform_player_id: String,
    pub display_name: String,
    pub claim_status: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerProfileReplayResponse {
    pub id: Uuid,
    pub original_file_name: Option<String>,
    pub replay_date: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub team_scores: PlayerProfileReplayTeamScoresResponse,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct PlayerProfileReplayTeamScoresResponse {
    pub blue: Option<i32>,
    pub orange: Option<i32>,
}

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct PlayerProfileQuery {
    /// Filter by one or more playlist/game-mode codes.
    #[serde(
        default,
        alias = "playlist[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub playlist: Vec<String>,
    /// Alias for `playlist`.
    #[serde(
        default,
        rename = "game-mode",
        alias = "game-mode[]",
        alias = "game_modes",
        alias = "game_modes[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub game_modes: Vec<String>,
    /// Filter to one or more Rocket Sense replay ids.
    #[serde(
        default,
        rename = "replay-id",
        alias = "replay-id[]",
        alias = "replay_ids",
        alias = "replay_ids[]",
        deserialize_with = "deserialize_uuid_vec"
    )]
    pub replay_ids: Vec<Uuid>,
    /// Filter to one or more replay file SHA-256 digests.
    #[serde(
        default,
        rename = "sha256",
        alias = "sha256[]",
        alias = "file_sha256s",
        alias = "file_sha256s[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub file_sha256s: Vec<String>,
    /// Filter to a replay group id.
    pub group: Option<String>,
    /// Filter to a legacy project id.
    pub project: Option<String>,
    /// Only include replays uploaded after this RFC3339 timestamp.
    #[serde(rename = "created-after")]
    pub created_after: Option<DateTime<Utc>>,
    /// Only include replays uploaded before this RFC3339 timestamp.
    #[serde(rename = "created-before")]
    pub created_before: Option<DateTime<Utc>>,
    /// Only include replays played after this RFC3339 timestamp.
    #[serde(rename = "replay-date-after")]
    pub replay_date_after: Option<DateTime<Utc>>,
    /// Only include replays played before this RFC3339 timestamp.
    #[serde(rename = "replay-date-before")]
    pub replay_date_before: Option<DateTime<Utc>>,
}

#[utoipa::path(
    get,
    path = "/api/v1/players/{platform}/{platform_player_id}",
    tag = "players",
    params(
        PlayerProfileQuery,
        ("platform" = String, Path, description = "Rocket League platform, such as `steam` or `epic`"),
        ("platform_player_id" = String, Path, description = "Platform-scoped player id")
    ),
    responses(
        (status = 200, description = "Player profile built from indexed replay appearances", body = PlayerProfileResponse),
        (status = 400, description = "Player identity was invalid"),
        (status = 404, description = "Player was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_player_profile(
    State(state): State<AppState>,
    Path((platform, platform_player_id)): Path<(String, String)>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<PlayerProfileResponse>, ApiError> {
    let db = require_db(&state)?;
    let identity = PlayerIdentity::new(platform, platform_player_id)?;
    let query = PlayerProfileQuery::from_raw_query(raw_query.as_deref())?;
    let filters = PlayerProfileFilters::from_query(query)?;

    let profile = load_player_profile(db, &identity, &filters)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "player not found"))?;

    Ok(Json(profile))
}

#[utoipa::path(
    get,
    path = "/api/v1/players/name-history",
    tag = "players",
    params(PlayerNameHistoryQuery),
    responses(
        (status = 200, description = "Observed display-name history across platform identities", body = PlayerNameHistoryResponse),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn search_player_name_history(
    State(state): State<AppState>,
    Query(query): Query<PlayerNameHistoryQuery>,
) -> Result<Json<PlayerNameHistoryResponse>, ApiError> {
    let db = require_db(&state)?;
    let names = load_name_history(db, query)
        .await
        .map_err(ApiError::internal)?;
    Ok(Json(PlayerNameHistoryResponse { names }))
}

#[utoipa::path(
    put,
    path = "/api/v1/players/{platform}/{platform_player_id}",
    tag = "players",
    request_body = SetPlayerPublicDisplayNameRequest,
    params(
        ("platform" = String, Path, description = "Rocket League platform, such as `steam` or `epic`"),
        ("platform_player_id" = String, Path, description = "Platform-scoped player id")
    ),
    responses(
        (status = 200, description = "Public display name selected", body = SetPlayerPublicDisplayNameResponse),
        (status = 400, description = "Requested display name was invalid or unobserved"),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Authenticated user cannot claim this player identity"),
        (status = 404, description = "Player was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn set_player_public_display_name(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path((platform, platform_player_id)): Path<(String, String)>,
    Json(request): Json<SetPlayerPublicDisplayNameRequest>,
) -> Result<Json<SetPlayerPublicDisplayNameResponse>, ApiError> {
    let db = require_db(&state)?;
    let identity = PlayerIdentity::new(platform, platform_player_id)?;
    let display_name = normalize_public_display_name(&request.display_name)?;

    let observed: bool = sqlx::query_scalar(
        r#"
        SELECT EXISTS (
            SELECT 1
            FROM player_display_names
            WHERE platform = $1
              AND platform_player_id = $2
              AND display_name = $3
        )
        "#,
    )
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .bind(&display_name)
    .fetch_one(db)
    .await
    .map_err(ApiError::internal)?;
    if !observed {
        return Err(ApiError::bad_request(
            "display_name must be one of this player identity's observed names",
        ));
    }
    let claim_status = ensure_identity_claim(db, &state, &auth_user, &identity).await?;

    let updated = sqlx::query_scalar::<_, String>(
        r#"
        UPDATE player_identities
        SET public_display_name = $3,
            public_display_name_set_by_user_id = $4,
            public_display_name_updated_at = now(),
            updated_at = now()
        WHERE platform = $1
          AND platform_player_id = $2
        RETURNING public_display_name
        "#,
    )
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .bind(&display_name)
    .bind(auth_user.id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "player not found"))?;

    Ok(Json(SetPlayerPublicDisplayNameResponse {
        platform: identity.platform,
        platform_player_id: identity.platform_player_id,
        display_name: updated,
        claim_status,
    }))
}

struct PlayerIdentity {
    platform: String,
    platform_player_id: String,
}

#[derive(Debug, Default)]
struct PlayerProfileFilters {
    playlists: Vec<String>,
    replay_ids: Vec<Uuid>,
    file_sha256s: Vec<String>,
    group_id: Option<Uuid>,
    project_id: Option<Uuid>,
    created_after: Option<DateTime<Utc>>,
    created_before: Option<DateTime<Utc>>,
    replay_date_after: Option<DateTime<Utc>>,
    replay_date_before: Option<DateTime<Utc>>,
}

impl PlayerProfileFilters {
    fn from_query(query: PlayerProfileQuery) -> Result<Self, ApiError> {
        let mut playlists = normalize_terms(query.playlist);
        playlists.extend(normalize_terms(query.game_modes));
        playlists.sort();
        playlists.dedup();
        let file_sha256s = normalize_terms(query.file_sha256s)
            .into_iter()
            .map(|value| normalize_sha256_hex(&value))
            .collect::<Result<Vec<_>, _>>()?;

        Ok(Self {
            playlists,
            replay_ids: query.replay_ids,
            file_sha256s,
            group_id: query
                .group
                .map(|group| parse_uuid_filter("group", &group))
                .transpose()?,
            project_id: query
                .project
                .map(|project| parse_uuid_filter("project", &project))
                .transpose()?,
            created_after: query.created_after,
            created_before: query.created_before,
            replay_date_after: query.replay_date_after,
            replay_date_before: query.replay_date_before,
        })
    }
}

impl PlayerProfileQuery {
    fn from_raw_query(raw_query: Option<&str>) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        Ok(Self {
            playlist: params.values(&["playlist"]),
            game_modes: params.values(&["game-mode", "game_modes"]),
            replay_ids: parse_uuid_values(
                "replay-id",
                params.values(&["replay-id", "replay_ids"]),
            )?,
            file_sha256s: params.values(&["sha256", "file_sha256s"]),
            group: params.first(&["group"]),
            project: params.first(&["project"]),
            created_after: params
                .first(&["created-after", "created_after"])
                .map(|value| parse_datetime_filter("created-after", &value))
                .transpose()?,
            created_before: params
                .first(&["created-before", "created_before"])
                .map(|value| parse_datetime_filter("created-before", &value))
                .transpose()?,
            replay_date_after: params
                .first(&["replay-date-after", "replay_date_after"])
                .map(|value| parse_datetime_filter("replay-date-after", &value))
                .transpose()?,
            replay_date_before: params
                .first(&["replay-date-before", "replay_date_before"])
                .map(|value| parse_datetime_filter("replay-date-before", &value))
                .transpose()?,
        })
    }
}

impl PlayerIdentity {
    fn new(platform: String, platform_player_id: String) -> Result<Self, ApiError> {
        let platform = platform.trim().to_ascii_lowercase();
        let platform_player_id = platform_player_id.trim().to_owned();
        if platform.is_empty() || platform_player_id.is_empty() {
            return Err(ApiError::bad_request(
                "player profile path must include both platform and player id",
            ));
        }

        Ok(Self {
            platform,
            platform_player_id,
        })
    }
}

async fn load_player_profile(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
) -> Result<Option<PlayerProfileResponse>, sqlx::Error> {
    let mut summary_query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            COUNT(DISTINCT rp.replay_id) AS replay_count,
            MIN(COALESCE(r.replay_date, r.created_at)) AS first_seen_at,
            MAX(COALESCE(r.replay_date, r.created_at)) AS last_seen_at,
            BOOL_OR(rp.is_pro) AS is_pro,
            MAX(pi.public_display_name) AS public_display_name,
            MAX(pi.current_display_name) AS current_display_name,
            COALESCE(MAX(pi.public_display_name), MAX(pi.current_display_name), (
                ARRAY_REMOVE(
                    ARRAY_AGG(rp.name ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC),
                    NULL
                )
            )[1]) AS display_name
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        LEFT JOIN player_identities pi
          ON pi.platform = rp.platform
         AND pi.platform_player_id = rp.platform_player_id
        "#,
    );
    append_target_player_filters(&mut summary_query, identity, filters);
    let summary = summary_query.build().fetch_one(pool).await?;

    let replay_count: i64 = summary.try_get("replay_count")?;
    if replay_count <= 0 {
        return Ok(None);
    }

    let names = load_player_names(pool, identity, filters).await?;
    let latest_replays = load_player_replays(pool, identity, filters, 10).await?;

    Ok(Some(PlayerProfileResponse {
        platform: identity.platform.clone(),
        platform_player_id: identity.platform_player_id.clone(),
        display_name: summary.try_get("display_name")?,
        public_display_name: summary.try_get("public_display_name")?,
        current_display_name: summary.try_get("current_display_name")?,
        names,
        replay_count: replay_count as u64,
        first_seen_at: summary.try_get("first_seen_at")?,
        last_seen_at: summary.try_get("last_seen_at")?,
        is_pro: summary
            .try_get::<Option<bool>, _>("is_pro")?
            .unwrap_or(false),
        latest_replays,
    }))
}

async fn load_player_names(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
) -> Result<Vec<PlayerProfileNameResponse>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            rp.name,
            COUNT(*) AS replay_count,
            MIN(COALESCE(r.replay_date, r.created_at)) AS first_seen_at,
            MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, identity, filters);
    query.push(
        r#"
          AND rp.name IS NOT NULL
          AND btrim(rp.name) <> ''
        GROUP BY rp.name
        ORDER BY COUNT(*) DESC, MAX(COALESCE(r.replay_date, r.created_at)) DESC NULLS LAST, rp.name
        LIMIT 12
        "#,
    );
    let rows = query.build().fetch_all(pool).await?;

    rows.into_iter()
        .map(|row| {
            let replay_count: i64 = row.try_get("replay_count")?;
            Ok(PlayerProfileNameResponse {
                name: row.try_get("name")?,
                replay_count: replay_count.max(0) as u64,
                first_seen_at: row.try_get("first_seen_at")?,
                latest_seen_at: row.try_get("latest_seen_at")?,
            })
        })
        .collect()
}

async fn load_name_history(
    pool: &sqlx::PgPool,
    query: PlayerNameHistoryQuery,
) -> Result<Vec<PlayerNameHistoryEntryResponse>, sqlx::Error> {
    let rows = player_name_history_query(query)
        .build()
        .fetch_all(pool)
        .await?;
    rows.into_iter()
        .map(|row| {
            Ok(PlayerNameHistoryEntryResponse {
                platform: row.try_get("platform")?,
                platform_player_id: row.try_get("platform_player_id")?,
                display_name: row.try_get("display_name")?,
                first_seen_at: row.try_get("first_seen_at")?,
                latest_seen_at: row.try_get("last_seen_at")?,
                current_display_name: row.try_get("current_display_name")?,
                public_display_name: row.try_get("public_display_name")?,
            })
        })
        .collect()
}

fn player_name_history_query(query: PlayerNameHistoryQuery) -> QueryBuilder<'static, Postgres> {
    let q = query
        .q
        .map(|value| value.trim().to_owned())
        .filter(|value| !value.is_empty());
    let platforms = normalize_terms(query.platform)
        .into_iter()
        .map(|platform| platform.to_ascii_lowercase())
        .collect::<Vec<_>>();
    let count = i64::from(query.count.unwrap_or(50).clamp(1, 100));
    let offset = i64::from(query.offset.unwrap_or(0));

    let mut builder = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            names.platform,
            names.platform_player_id,
            names.display_name,
            names.first_seen_at,
            names.last_seen_at,
            identities.current_display_name,
            identities.public_display_name
        FROM player_display_names names
        JOIN player_identities identities
          ON identities.platform = names.platform
         AND identities.platform_player_id = names.platform_player_id
        WHERE TRUE
        "#,
    );
    if let Some(q) = &q {
        builder.push(" AND names.display_name ILIKE ");
        builder.push_bind(format!("%{q}%"));
    }
    if !platforms.is_empty() {
        builder.push(" AND names.platform = ANY(");
        builder.push_bind(platforms);
        builder.push(")");
    }
    builder.push(
        r#"
        ORDER BY names.last_seen_at DESC, names.display_name, names.platform, names.platform_player_id
        LIMIT
        "#,
    );
    builder.push_bind(count);
    builder.push(" OFFSET ");
    builder.push_bind(offset);
    builder
}

async fn ensure_identity_claim(
    pool: &sqlx::PgPool,
    state: &AppState,
    auth_user: &AuthUser,
    identity: &PlayerIdentity,
) -> Result<String, ApiError> {
    let is_admin = crate::auth::resolve_is_admin(pool, auth_user, &state.admin_emails)
        .await
        .map_err(ApiError::internal)?;
    if is_admin {
        upsert_identity_claim(pool, auth_user, identity, "admin", None).await?;
        return Ok("verified".to_owned());
    }

    let existing_status = sqlx::query_scalar::<_, String>(
        r#"
        SELECT status
        FROM player_identity_claims
        WHERE user_id = $1
          AND platform = $2
          AND platform_player_id = $3
          AND status = 'verified'
        "#,
    )
    .bind(auth_user.id)
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::internal)?;
    if let Some(status) = existing_status {
        return Ok(status);
    }

    let replay_id = sqlx::query_scalar::<_, Uuid>(
        r#"
        SELECT r.id
        FROM replays r
        JOIN replay_players rp ON rp.replay_id = r.id
        WHERE r.uploaded_by_user_id = $1
          AND rp.platform = $2
          AND rp.platform_player_id = $3
        ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC
        LIMIT 1
        "#,
    )
    .bind(auth_user.id)
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::internal)?;

    let Some(replay_id) = replay_id else {
        return Err(ApiError::new(
            StatusCode::FORBIDDEN,
            "user must be an admin or have uploaded a replay containing this player identity",
        ));
    };

    upsert_identity_claim(
        pool,
        auth_user,
        identity,
        "uploader_replay_presence",
        Some(replay_id),
    )
    .await?;
    Ok("verified".to_owned())
}

async fn upsert_identity_claim(
    pool: &sqlx::PgPool,
    auth_user: &AuthUser,
    identity: &PlayerIdentity,
    verification_method: &str,
    replay_id: Option<Uuid>,
) -> Result<(), ApiError> {
    let evidence = replay_id
        .map(|replay_id| serde_json::json!({ "replay_id": replay_id }))
        .unwrap_or_else(|| serde_json::json!({}));
    sqlx::query(
        r#"
        INSERT INTO player_identity_claims (
            user_id,
            platform,
            platform_player_id,
            status,
            verification_method,
            evidence,
            verified_at
        )
        VALUES ($1, $2, $3, 'verified', $4, $5, now())
        ON CONFLICT (user_id, platform, platform_player_id)
        DO UPDATE SET
            status = 'verified',
            verification_method = EXCLUDED.verification_method,
            evidence = EXCLUDED.evidence,
            verified_at = COALESCE(player_identity_claims.verified_at, now()),
            updated_at = now()
        "#,
    )
    .bind(auth_user.id)
    .bind(&identity.platform)
    .bind(&identity.platform_player_id)
    .bind(verification_method)
    .bind(evidence)
    .execute(pool)
    .await
    .map_err(ApiError::internal)?;
    Ok(())
}

async fn load_player_replays(
    pool: &sqlx::PgPool,
    identity: &PlayerIdentity,
    filters: &PlayerProfileFilters,
    limit: i64,
) -> Result<Vec<PlayerProfileReplayResponse>, sqlx::Error> {
    let rows = player_replays_query(identity, filters, limit)
        .build()
        .fetch_all(pool)
        .await?;

    rows.into_iter()
        .map(|row| {
            Ok(PlayerProfileReplayResponse {
                id: row.try_get("id")?,
                original_file_name: row.try_get("original_file_name")?,
                replay_date: row.try_get("replay_date")?,
                created_at: row.try_get("created_at")?,
                team_scores: PlayerProfileReplayTeamScoresResponse {
                    blue: row.try_get("team_zero_score")?,
                    orange: row.try_get("team_one_score")?,
                },
            })
        })
        .collect()
}

fn player_replays_query<'args>(
    identity: &'args PlayerIdentity,
    filters: &'args PlayerProfileFilters,
    limit: i64,
) -> QueryBuilder<'args, Postgres> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            r.id,
            r.original_file_name,
            r.replay_date,
            r.created_at,
            r.team_zero_score,
            r.team_one_score
        FROM replays r
        "#,
    );
    query.push(" WHERE EXISTS (SELECT 1 FROM replay_players profile_player WHERE profile_player.replay_id = r.id AND profile_player.platform = ");
    query.push_bind(&identity.platform);
    query.push(" AND profile_player.platform_player_id = ");
    query.push_bind(&identity.platform_player_id);
    query.push(")");
    append_replay_filters(&mut query, filters, "r");
    query.push(
        " ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC LIMIT ",
    );
    query.push_bind(limit);
    query
}

fn append_target_player_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    identity: &'args PlayerIdentity,
    filters: &'args PlayerProfileFilters,
) {
    builder.push(" WHERE rp.platform = ");
    builder.push_bind(&identity.platform);
    builder.push(" AND rp.platform_player_id = ");
    builder.push_bind(&identity.platform_player_id);
    append_replay_filters(builder, filters, "r");
}

fn append_replay_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args PlayerProfileFilters,
    replay_alias: &str,
) {
    if !filters.playlists.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }
    if !filters.replay_ids.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".id = ANY(")
            .push_bind(&filters.replay_ids)
            .push(")");
    }
    if !filters.file_sha256s.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".file_sha256 = ANY(")
            .push_bind(&filters.file_sha256s)
            .push(")");
    }
    if let Some(group_id) = filters.group_id {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_group_replays profile_group WHERE profile_group.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND profile_group.group_id = ");
        builder.push_bind(group_id);
        builder.push(")");
    }
    if let Some(project_id) = filters.project_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".project_id = ")
            .push_bind(project_id);
    }
    if let Some(created_after) = filters.created_after {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".created_at >= ")
            .push_bind(created_after);
    }
    if let Some(created_before) = filters.created_before {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".created_at <= ")
            .push_bind(created_before);
    }
    if let Some(replay_date_after) = filters.replay_date_after {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_date >= ")
            .push_bind(replay_date_after);
    }
    if let Some(replay_date_before) = filters.replay_date_before {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_date <= ")
            .push_bind(replay_date_before);
    }
}

fn normalize_terms(terms: Vec<String>) -> Vec<String> {
    terms
        .into_iter()
        .map(|term| term.trim().to_owned())
        .filter(|term| !term.is_empty())
        .collect()
}

fn normalize_public_display_name(value: &str) -> Result<String, ApiError> {
    let value = value.trim();
    if value.is_empty() {
        return Err(ApiError::bad_request("display_name must not be empty"));
    }
    if value.chars().count() > 128 {
        return Err(ApiError::bad_request(
            "display_name must be 128 characters or fewer",
        ));
    }
    Ok(value.to_owned())
}

fn parse_uuid_filter(name: &str, value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request(format!("{name} must be a UUID")))
}

fn normalize_sha256_hex(value: &str) -> Result<String, ApiError> {
    let value = value.trim();
    if value.len() != 64 || !value.bytes().all(|byte| byte.is_ascii_hexdigit()) {
        return Err(ApiError::bad_request(
            "sha256 must be a 64-character hexadecimal SHA-256 digest",
        ));
    }

    Ok(value.to_ascii_lowercase())
}
