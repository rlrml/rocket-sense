use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Multipart, Path, Query, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use rocket_sense_storage::{raw_replay_key, replay_mime_type, sha256_hex};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/replays", get(list_replays).post(create_replay))
        .route("/replays/{replay_id}", get(get_replay))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct CreateReplayResponse {
    pub replay: ReplayResponse,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayResponse {
    pub id: Uuid,
    pub file_sha256: String,
    pub byte_size: u64,
    pub project_id: Option<Uuid>,
    pub uploaded_by_user_id: Option<Uuid>,
    pub storage_key: String,
    pub original_file_name: Option<String>,
    pub external_replay_id: Option<String>,
    pub playlist: Option<String>,
    pub map_code: Option<String>,
    pub replay_date: Option<DateTime<Utc>>,
    pub has_pro_player: bool,
    pub status: ReplayStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum ReplayStatus {
    Pending,
    Parsing,
    Parsed,
    Failed,
}

impl ReplayStatus {
    fn from_db(value: String) -> Self {
        match value.as_str() {
            "pending" => Self::Pending,
            "parsing" => Self::Parsing,
            "parsed" => Self::Parsed,
            "failed" => Self::Failed,
            unknown => {
                tracing::warn!(status = unknown, "unknown replay parse status");
                Self::Pending
            }
        }
    }
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ListReplaysResponse {
    pub replays: Vec<ReplayResponse>,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct ListReplaysQuery {
    /// Text search over original filename, SHA-256, and external replay id.
    pub q: Option<String>,
    /// Ballchasing-compatible title filter. Currently maps to original filename.
    pub title: Option<String>,
    /// Filter by one or more player display names.
    #[serde(default, rename = "player-name")]
    pub player_names: Vec<String>,
    /// Filter by one or more player ids in `platform:id` form.
    #[serde(default, rename = "player-id")]
    pub player_ids: Vec<String>,
    /// Filter by one or more playlist codes.
    #[serde(default)]
    pub playlist: Vec<String>,
    /// Only include replays containing at least one pro player.
    pub pro: Option<bool>,
    /// `me` for the authenticated user, or a Rocket Sense user UUID.
    pub uploader: Option<String>,
    /// Rocket Sense project id. This is the closest current equivalent to a Ballchasing group.
    pub group: Option<String>,
    /// Filter by one or more map codes.
    #[serde(default, rename = "map")]
    pub maps: Vec<String>,
    /// Replay parsing status.
    pub status: Option<String>,
    /// Only include replays uploaded after this RFC3339 timestamp.
    #[serde(rename = "created-after")]
    pub created_after: Option<DateTime<Utc>>,
    /// Only include replays uploaded before this RFC3339 timestamp.
    #[serde(rename = "created-before")]
    pub created_before: Option<DateTime<Utc>>,
    /// Only include replays for games played after this RFC3339 timestamp.
    #[serde(rename = "replay-date-after")]
    pub replay_date_after: Option<DateTime<Utc>>,
    /// Only include replays for games played before this RFC3339 timestamp.
    #[serde(rename = "replay-date-before")]
    pub replay_date_before: Option<DateTime<Utc>>,
    /// Maximum number of replays to return. Clamped to 1..=200.
    pub count: Option<u32>,
    /// Number of rows to skip.
    pub offset: Option<u32>,
    /// Supported values: `upload-date`, `replay-date`.
    #[serde(rename = "sort-by")]
    pub sort_by: Option<String>,
    /// Supported values: `asc`, `desc`.
    #[serde(rename = "sort-dir")]
    pub sort_dir: Option<String>,
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

#[utoipa::path(
    post,
    path = "/api/v1/replays",
    tag = "replays",
    request_body(content_type = "multipart/form-data"),
    responses(
        (status = 201, description = "Replay accepted", body = CreateReplayResponse),
        (status = 401, description = "Authentication required"),
        (status = 400, description = "Replay file was missing or invalid"),
        (status = 500, description = "Replay could not be stored"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_replay(
    auth_user: AuthUser,
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> Result<(StatusCode, Json<CreateReplayResponse>), ApiError> {
    tracing::debug!(user_id = %auth_user.id, email = %auth_user.email, "authenticated replay upload");
    let db = require_db(&state)?;

    let mut replay_bytes = None;
    let mut original_file_name = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(ApiError::bad_request)?
    {
        if field.name() == Some("file") {
            original_file_name = field.file_name().map(ToOwned::to_owned);
            replay_bytes = Some(field.bytes().await.map_err(ApiError::bad_request)?);
            break;
        }
    }

    let bytes =
        replay_bytes.ok_or_else(|| ApiError::bad_request("missing multipart field `file`"))?;
    let replay_id = Uuid::now_v7();
    let file_sha256 = sha256_hex(&bytes);
    let stored = state
        .storage
        .put(
            &raw_replay_key(&file_sha256),
            bytes,
            Some(replay_mime_type()),
        )
        .await
        .map_err(ApiError::internal)?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;
    let replay = insert_replay_metadata(
        db,
        replay_id,
        &file_sha256,
        original_file_name.as_deref(),
        stored.byte_size,
        &stored.key,
        auth_user.id,
    )
    .await
    .map_err(ApiError::internal)?;

    Ok((StatusCode::CREATED, Json(CreateReplayResponse { replay })))
}

#[utoipa::path(
    get,
    path = "/api/v1/replays",
    tag = "replays",
    params(ListReplaysQuery),
    responses(
        (status = 200, description = "Replay list", body = ListReplaysResponse),
        (status = 400, description = "Replay filters were invalid"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_replays(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Query(query): Query<ListReplaysQuery>,
) -> Result<Json<ListReplaysResponse>, ApiError> {
    let db = require_db(&state)?;
    let filters = ReplayFilters::from_query(query, auth_user.id)?;
    let total = count_replays(db, &filters)
        .await
        .map_err(ApiError::internal)?;
    let replays = find_replays(db, &filters)
        .await
        .map_err(ApiError::internal)?;
    let count = replays.len() as u32;
    let returned_through = filters.offset.saturating_add(count);
    let next_offset = (u64::from(returned_through) < total).then_some(returned_through);

    Ok(Json(ListReplaysResponse {
        replays,
        count,
        offset: filters.offset,
        total,
        next_offset,
    }))
}

#[utoipa::path(
    get,
    path = "/api/v1/replays/{replay_id}",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "Rocket Sense replay id")
    ),
    responses(
        (status = 200, description = "Replay metadata", body = ReplayResponse),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Replay was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_replay(
    _auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
) -> Result<Json<ReplayResponse>, ApiError> {
    let db = require_db(&state)?;
    let sql = replay_select_sql("WHERE id = $1");
    let replay = sqlx::query(sql.as_str())
        .bind(replay_id)
        .fetch_optional(db)
        .await
        .map_err(ApiError::internal)?
        .map(replay_from_row)
        .transpose()
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    Ok(Json(replay))
}

#[derive(Debug)]
pub struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    fn new(status: StatusCode, message: impl Into<String>) -> Self {
        Self {
            status,
            message: message.into(),
        }
    }

    fn bad_request(error: impl std::fmt::Display) -> Self {
        Self::new(StatusCode::BAD_REQUEST, error.to_string())
    }

    fn internal(error: impl std::fmt::Display) -> Self {
        tracing::error!(error = %error, "request failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        (
            self.status,
            Json(ErrorResponse {
                error: self.message,
            }),
        )
            .into_response()
    }
}

struct ReplayFilters {
    search_pattern: Option<String>,
    player_name_patterns: Vec<String>,
    player_ids: Vec<PlayerIdFilter>,
    playlists: Vec<String>,
    maps: Vec<String>,
    pro: Option<bool>,
    uploader_user_id: Option<Uuid>,
    project_id: Option<Uuid>,
    status: Option<String>,
    created_after: Option<DateTime<Utc>>,
    created_before: Option<DateTime<Utc>>,
    replay_date_after: Option<DateTime<Utc>>,
    replay_date_before: Option<DateTime<Utc>>,
    count: u32,
    offset: u32,
    sort_by: SortBy,
    sort_dir: SortDir,
}

impl ReplayFilters {
    fn from_query(query: ListReplaysQuery, auth_user_id: Uuid) -> Result<Self, ApiError> {
        let search = query
            .q
            .or(query.title)
            .map(|term| term.trim().to_owned())
            .filter(|term| !term.is_empty());
        let uploader_user_id = query
            .uploader
            .map(|uploader| parse_uploader_filter(&uploader, auth_user_id))
            .transpose()?;
        let project_id = query
            .group
            .map(|group| parse_group_filter(&group))
            .transpose()?;

        Ok(Self {
            search_pattern: search.map(|term| format!("%{}%", escape_like_term(&term))),
            player_name_patterns: normalize_terms(query.player_names)
                .into_iter()
                .map(|term| format!("%{}%", escape_like_term(&term)))
                .collect(),
            player_ids: normalize_terms(query.player_ids)
                .into_iter()
                .map(|player_id| parse_player_id_filter(&player_id))
                .collect::<Result<Vec<_>, _>>()?,
            playlists: normalize_terms(query.playlist),
            maps: normalize_terms(query.maps),
            pro: query.pro,
            uploader_user_id,
            project_id,
            status: query
                .status
                .map(|status| status.trim().to_lowercase())
                .filter(|status| !status.is_empty()),
            created_after: query.created_after,
            created_before: query.created_before,
            replay_date_after: query.replay_date_after,
            replay_date_before: query.replay_date_before,
            count: query.count.unwrap_or(50).clamp(1, 200),
            offset: query.offset.unwrap_or(0),
            sort_by: SortBy::from_query(query.sort_by.as_deref())?,
            sort_dir: SortDir::from_query(query.sort_dir.as_deref())?,
        })
    }
}

struct PlayerIdFilter {
    platform: String,
    player_id: String,
}

enum SortBy {
    UploadDate,
    ReplayDate,
}

impl SortBy {
    fn from_query(value: Option<&str>) -> Result<Self, ApiError> {
        match value.unwrap_or("upload-date") {
            "upload-date" | "created_at" => Ok(Self::UploadDate),
            "replay-date" | "replay_date" => Ok(Self::ReplayDate),
            other => Err(ApiError::bad_request(format!(
                "unsupported sort-by `{other}`; supported values are `upload-date` and `replay-date`"
            ))),
        }
    }

    fn sql(&self) -> &'static str {
        match self {
            Self::UploadDate => "created_at",
            Self::ReplayDate => "replay_date",
        }
    }
}

enum SortDir {
    Asc,
    Desc,
}

impl SortDir {
    fn from_query(value: Option<&str>) -> Result<Self, ApiError> {
        match value.unwrap_or("desc") {
            "asc" => Ok(Self::Asc),
            "desc" => Ok(Self::Desc),
            other => Err(ApiError::bad_request(format!(
                "unsupported sort-dir `{other}`; supported values are `asc` and `desc`"
            ))),
        }
    }

    fn sql(&self) -> &'static str {
        match self {
            Self::Asc => "ASC",
            Self::Desc => "DESC",
        }
    }
}

fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
    state.db.as_ref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "postgres connection is required for replay metadata",
        )
    })
}

fn parse_uploader_filter(value: &str, auth_user_id: Uuid) -> Result<Uuid, ApiError> {
    let value = value.trim();
    if value == "me" {
        return Ok(auth_user_id);
    }

    Uuid::parse_str(value)
        .map_err(|_| ApiError::bad_request("uploader must be `me` or a Rocket Sense user UUID"))
}

fn parse_group_filter(value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request("group must be a Rocket Sense project UUID for now"))
}

fn parse_player_id_filter(value: &str) -> Result<PlayerIdFilter, ApiError> {
    let (platform, player_id) = value
        .split_once(':')
        .ok_or_else(|| ApiError::bad_request("player-id must use `platform:id` format"))?;
    let platform = platform.trim().to_lowercase();
    let player_id = player_id.trim().to_owned();
    if platform.is_empty() || player_id.is_empty() {
        return Err(ApiError::bad_request(
            "player-id must include both platform and id",
        ));
    }

    Ok(PlayerIdFilter {
        platform,
        player_id,
    })
}

fn normalize_terms(terms: Vec<String>) -> Vec<String> {
    terms
        .into_iter()
        .map(|term| term.trim().to_owned())
        .filter(|term| !term.is_empty())
        .collect()
}

fn escape_like_term(term: &str) -> String {
    term.replace('\\', "\\\\")
        .replace('%', "\\%")
        .replace('_', "\\_")
}

async fn upsert_user(pool: &PgPool, user: &AuthUser) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        INSERT INTO users (id, primary_email, display_name)
        VALUES ($1, $2, $2)
        ON CONFLICT (id) DO UPDATE
        SET primary_email = EXCLUDED.primary_email,
            display_name = COALESCE(users.display_name, EXCLUDED.display_name),
            updated_at = now()
        "#,
    )
    .bind(user.id)
    .bind(&user.email)
    .execute(pool)
    .await?;

    Ok(())
}

async fn insert_replay_metadata(
    pool: &PgPool,
    replay_id: Uuid,
    file_sha256: &str,
    original_file_name: Option<&str>,
    byte_size: u64,
    storage_key: &str,
    uploaded_by_user_id: Uuid,
) -> Result<ReplayResponse, sqlx::Error> {
    let sql = format!(
        r#"
        WITH inserted_replay AS (
            INSERT INTO replays (
                    id,
                    uploaded_by_user_id,
                    file_sha256,
                    original_file_name,
                    byte_size,
                    storage_key
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (file_sha256) DO UPDATE
            SET file_sha256 = replays.file_sha256
            RETURNING id
        )
        {}
        "#,
        replay_select_sql("WHERE id = (SELECT id FROM inserted_replay)")
    );

    sqlx::query(sql.as_str())
        .bind(replay_id)
        .bind(uploaded_by_user_id)
        .bind(file_sha256)
        .bind(original_file_name)
        .bind(byte_size as i64)
        .bind(storage_key)
        .fetch_one(pool)
        .await
        .and_then(replay_from_row)
}

async fn count_replays(pool: &PgPool, filters: &ReplayFilters) -> Result<u64, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("SELECT count(*) AS total FROM replays");
    append_replay_filters(&mut builder, filters);
    let row = builder.build().fetch_one(pool).await?;
    let total: i64 = row.try_get("total")?;

    Ok(total.max(0) as u64)
}

async fn find_replays(
    pool: &PgPool,
    filters: &ReplayFilters,
) -> Result<Vec<ReplayResponse>, sqlx::Error> {
    let select_sql = replay_select_sql("");
    let mut builder = QueryBuilder::<Postgres>::new(select_sql);
    append_replay_filters(&mut builder, filters);
    builder
        .push(" ORDER BY ")
        .push(filters.sort_by.sql())
        .push(" ")
        .push(filters.sort_dir.sql())
        .push(" NULLS LAST")
        .push(", id ")
        .push(filters.sort_dir.sql())
        .push(" LIMIT ")
        .push_bind(filters.count as i64)
        .push(" OFFSET ")
        .push_bind(filters.offset as i64);

    let rows = builder.build().fetch_all(pool).await?;
    rows.into_iter().map(replay_from_row).collect()
}

fn append_replay_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args ReplayFilters,
) {
    builder.push(" WHERE TRUE");

    if let Some(pattern) = &filters.search_pattern {
        builder
            .push(" AND (original_file_name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR file_sha256 ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR external_replay_id ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }

    for pattern in &filters.player_name_patterns {
        builder
            .push(" AND EXISTS (SELECT 1 FROM replay_players WHERE replay_players.replay_id = replays.id AND replay_players.name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }

    for player_id in &filters.player_ids {
        builder
            .push(" AND EXISTS (SELECT 1 FROM replay_players WHERE replay_players.replay_id = replays.id AND replay_players.platform = ")
            .push_bind(&player_id.platform)
            .push(" AND replay_players.platform_player_id = ")
            .push_bind(&player_id.player_id)
            .push(")");
    }

    if !filters.playlists.is_empty() {
        builder
            .push(" AND playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }

    if !filters.maps.is_empty() {
        builder
            .push(" AND map_code = ANY(")
            .push_bind(&filters.maps)
            .push(")");
    }

    if let Some(pro) = filters.pro {
        if pro {
            builder.push(" AND has_pro_player");
        } else {
            builder.push(" AND NOT has_pro_player");
        }
    }

    if let Some(uploader_user_id) = filters.uploader_user_id {
        builder
            .push(" AND uploaded_by_user_id = ")
            .push_bind(uploader_user_id);
    }

    if let Some(project_id) = filters.project_id {
        builder.push(" AND project_id = ").push_bind(project_id);
    }

    if let Some(status) = &filters.status {
        builder.push(" AND parse_status = ").push_bind(status);
    }

    if let Some(created_after) = filters.created_after {
        builder.push(" AND created_at >= ").push_bind(created_after);
    }

    if let Some(created_before) = filters.created_before {
        builder
            .push(" AND created_at <= ")
            .push_bind(created_before);
    }

    if let Some(replay_date_after) = filters.replay_date_after {
        builder
            .push(" AND replay_date >= ")
            .push_bind(replay_date_after);
    }

    if let Some(replay_date_before) = filters.replay_date_before {
        builder
            .push(" AND replay_date <= ")
            .push_bind(replay_date_before);
    }
}

fn replay_select_sql(where_clause: &str) -> String {
    format!(
        r#"
        SELECT
            id,
            file_sha256,
            original_file_name,
            byte_size,
            project_id,
            uploaded_by_user_id,
            storage_key,
            external_replay_id,
            playlist,
            map_code,
            replay_date,
            has_pro_player,
            parse_status,
            created_at,
            updated_at
        FROM replays
        {where_clause}
        "#
    )
}

fn replay_from_row(row: sqlx::postgres::PgRow) -> Result<ReplayResponse, sqlx::Error> {
    let byte_size: i64 = row.try_get("byte_size")?;
    let parse_status: String = row.try_get("parse_status")?;

    Ok(ReplayResponse {
        id: row.try_get("id")?,
        file_sha256: row.try_get("file_sha256")?,
        original_file_name: row.try_get("original_file_name")?,
        byte_size: byte_size.max(0) as u64,
        project_id: row.try_get("project_id")?,
        uploaded_by_user_id: row.try_get("uploaded_by_user_id")?,
        storage_key: row.try_get("storage_key")?,
        external_replay_id: row.try_get("external_replay_id")?,
        playlist: row.try_get("playlist")?,
        map_code: row.try_get("map_code")?,
        replay_date: row.try_get("replay_date")?,
        has_pro_player: row.try_get("has_pro_player")?,
        status: ReplayStatus::from_db(parse_status),
        created_at: row.try_get("created_at")?,
        updated_at: row.try_get("updated_at")?,
    })
}
