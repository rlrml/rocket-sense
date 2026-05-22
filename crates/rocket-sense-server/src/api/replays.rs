use crate::{app::AppState, auth::AuthUser, processing::spawn_replay_processing};
use axum::{
    extract::{Multipart, Path, Query, State},
    http::{
        header::{CONTENT_DISPOSITION, CONTENT_TYPE},
        StatusCode,
    },
    response::{Html, IntoResponse, Redirect, Response},
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use rocket_sense_storage::{raw_replay_key, replay_mime_type, sha256_hex, StorageError};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

#[cfg(test)]
#[path = "replays_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/replays", get(list_replays).post(create_replay))
        .route(
            "/replays/by-sha256/{file_sha256}",
            get(get_replay_by_sha256),
        )
        .route("/replays/{replay_id}/file", get(download_replay_file))
        .route("/replays/{replay_id}", get(get_replay))
}

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/replays", get(replay_list_page))
        .route("/replays/{replay_id}/stats", get(open_replay_stats))
        .route("/replays/{replay_id}", get(open_replay_viewer))
        .route("/subtr-actor", get(subtr_actor_viewer))
        .route("/subtr-actor/", get(subtr_actor_viewer))
        .route("/subtr-actor/assets/{asset_path}", get(subtr_actor_asset))
        .route("/subtr-actor/stats", get(subtr_actor_stats))
        .route("/subtr-actor/stats/", get(subtr_actor_stats))
        .route(
            "/subtr-actor/stats/assets/{asset_path}",
            get(subtr_actor_stats_asset),
        )
}

#[derive(Debug, Serialize, ToSchema)]
pub struct CreateReplayResponse {
    pub replay: ReplayResponse,
    pub created: bool,
    pub deduplicated: bool,
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
        (status = 200, description = "Replay already existed", body = CreateReplayResponse),
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
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    if let Some(replay) = find_replay_by_sha256(db, &file_sha256)
        .await
        .map_err(ApiError::internal)?
    {
        return Ok((
            StatusCode::OK,
            Json(CreateReplayResponse {
                replay,
                created: false,
                deduplicated: true,
            }),
        ));
    }

    let stored = state
        .storage
        .put(
            &raw_replay_key(&file_sha256),
            bytes,
            Some(replay_mime_type()),
        )
        .await
        .map_err(ApiError::internal)?;
    let insert_result = insert_replay_metadata(
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
    let replay = insert_result.replay;

    if insert_result.created {
        maybe_spawn_replay_processing(&state, db, &replay);
    }

    let status = if insert_result.created {
        StatusCode::CREATED
    } else {
        StatusCode::OK
    };
    Ok((
        status,
        Json(CreateReplayResponse {
            replay,
            created: insert_result.created,
            deduplicated: !insert_result.created,
        }),
    ))
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

#[utoipa::path(
    get,
    path = "/api/v1/replays/by-sha256/{file_sha256}",
    tag = "replays",
    params(
        ("file_sha256" = String, Path, description = "Lower- or uppercase SHA-256 digest of the replay file bytes")
    ),
    responses(
        (status = 200, description = "Replay metadata", body = ReplayResponse),
        (status = 400, description = "SHA-256 digest was invalid"),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Replay was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_replay_by_sha256(
    _auth_user: AuthUser,
    State(state): State<AppState>,
    Path(file_sha256): Path<String>,
) -> Result<Json<ReplayResponse>, ApiError> {
    let db = require_db(&state)?;
    let file_sha256 = normalize_sha256_hex(&file_sha256)?;
    let replay = find_replay_by_sha256(db, &file_sha256)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    Ok(Json(replay))
}

#[utoipa::path(
    get,
    path = "/api/v1/replays/{replay_id}/file",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "Rocket Sense replay id")
    ),
    responses(
        (status = 200, description = "Raw replay file"),
        (status = 404, description = "Replay or replay file was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn download_replay_file(
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
) -> Result<Response, ApiError> {
    let db = require_db(&state)?;
    let file = get_replay_file_record(db, replay_id)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;
    let bytes = state
        .storage
        .get(&file.storage_key)
        .await
        .map_err(storage_read_error)?;
    let file_name = file
        .original_file_name
        .filter(|name| !name.trim().is_empty())
        .unwrap_or_else(|| format!("{replay_id}.replay"));

    Ok((
        [
            (CONTENT_TYPE, replay_mime_type().as_ref().to_owned()),
            (
                CONTENT_DISPOSITION,
                format!(
                    "attachment; filename=\"{}\"",
                    sanitize_file_name(&file_name)
                ),
            ),
        ],
        bytes,
    )
        .into_response())
}

async fn replay_list_page() -> Html<&'static str> {
    Html(REPLAY_LIST_PAGE)
}

async fn open_replay_viewer(Path(replay_id): Path<Uuid>) -> Redirect {
    Redirect::temporary(&hosted_replay_app_url("/subtr-actor/", replay_id))
}

async fn open_replay_stats(Path(replay_id): Path<Uuid>) -> Redirect {
    Redirect::temporary(&hosted_replay_app_url("/subtr-actor/stats/", replay_id))
}

async fn subtr_actor_viewer() -> Html<&'static str> {
    Html(SUBTR_ACTOR_VIEWER_INDEX)
}

async fn subtr_actor_stats() -> Html<&'static str> {
    Html(SUBTR_ACTOR_STATS_INDEX)
}

async fn subtr_actor_asset(
    Path(asset_path): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    let asset = subtr_actor_static_asset(&asset_path).ok_or(StatusCode::NOT_FOUND)?;

    Ok(([(CONTENT_TYPE, asset.content_type)], asset.bytes))
}

async fn subtr_actor_stats_asset(
    Path(asset_path): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    let asset = subtr_actor_stats_static_asset(&asset_path).ok_or(StatusCode::NOT_FOUND)?;

    Ok(([(CONTENT_TYPE, asset.content_type)], asset.bytes))
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

struct ReplayFileRecord {
    storage_key: String,
    original_file_name: Option<String>,
}

struct InsertReplayMetadataResult {
    replay: ReplayResponse,
    created: bool,
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

fn sanitize_file_name(value: &str) -> String {
    value
        .chars()
        .map(|character| match character {
            '"' | '\\' | '/' | '\0'..='\u{1f}' => '_',
            _ => character,
        })
        .collect()
}

fn normalize_sha256_hex(value: &str) -> Result<String, ApiError> {
    let value = value.trim();
    if value.len() != 64 || !value.bytes().all(|byte| byte.is_ascii_hexdigit()) {
        return Err(ApiError::bad_request(
            "file_sha256 must be a 64-character hexadecimal SHA-256 digest",
        ));
    }

    Ok(value.to_ascii_lowercase())
}

fn hosted_replay_app_url(app_path: &str, replay_id: Uuid) -> String {
    let replay_url = format!("/api/v1/replays/{replay_id}/file");
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    query.append_pair("replayUrl", &replay_url);

    format!("{app_path}?{}", query.finish())
}

struct StaticAsset {
    content_type: &'static str,
    bytes: &'static [u8],
}

fn subtr_actor_static_asset(path: &str) -> Option<StaticAsset> {
    match path {
        "index-sCJKH-RF.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/index-sCJKH-RF.js"),
        }),
        "main-B47VKW7Z.css" => Some(StaticAsset {
            content_type: "text/css; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/main-B47VKW7Z.css"),
        }),
        "main-CrR9IRLq.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/main-CrR9IRLq.js"),
        }),
        "replayLoader.worker-D2-XMRtw.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!(
                "../../static/subtr-actor/assets/replayLoader.worker-D2-XMRtw.js"
            ),
        }),
        "rl_replay_subtr_actor_bg-EyPRboYq.wasm" => Some(StaticAsset {
            content_type: "application/wasm",
            bytes: include_bytes!(
                "../../static/subtr-actor/assets/rl_replay_subtr_actor_bg-EyPRboYq.wasm"
            ),
        }),
        "wasm.worker-BUoxJonY.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/wasm.worker-BUoxJonY.js"),
        }),
        _ => None,
    }
}

fn subtr_actor_stats_static_asset(path: &str) -> Option<StaticAsset> {
    match path {
        "index-CBS_ASa4.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/stats/assets/index-CBS_ASa4.js"),
        }),
        "index-PB1mR1-R.css" => Some(StaticAsset {
            content_type: "text/css; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/stats/assets/index-PB1mR1-R.css"),
        }),
        "replayLoader.worker-DIgIq4nG.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!(
                "../../static/subtr-actor/stats/assets/replayLoader.worker-DIgIq4nG.js"
            ),
        }),
        "rl_replay_subtr_actor_bg-BMUMQ3Gy.wasm" => Some(StaticAsset {
            content_type: "application/wasm",
            bytes: include_bytes!(
                "../../static/subtr-actor/stats/assets/rl_replay_subtr_actor_bg-BMUMQ3Gy.wasm"
            ),
        }),
        "wasm.worker-NsphfXJ3.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/stats/assets/wasm.worker-NsphfXJ3.js"),
        }),
        _ => None,
    }
}

fn storage_read_error(error: StorageError) -> ApiError {
    match &error {
        StorageError::Read { source, .. } if source.kind() == std::io::ErrorKind::NotFound => {
            ApiError::new(StatusCode::NOT_FOUND, "replay file not found")
        }
        _ => ApiError::internal(error),
    }
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

async fn get_replay_file_record(
    pool: &PgPool,
    replay_id: Uuid,
) -> Result<Option<ReplayFileRecord>, sqlx::Error> {
    sqlx::query(
        r#"
        SELECT storage_key, original_file_name
        FROM replays
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .fetch_optional(pool)
    .await?
    .map(|row| {
        Ok(ReplayFileRecord {
            storage_key: row.try_get("storage_key")?,
            original_file_name: row.try_get("original_file_name")?,
        })
    })
    .transpose()
}

async fn find_replay_by_sha256(
    pool: &PgPool,
    file_sha256: &str,
) -> Result<Option<ReplayResponse>, sqlx::Error> {
    let sql = replay_select_sql("WHERE file_sha256 = $1");
    sqlx::query(sql.as_str())
        .bind(file_sha256)
        .fetch_optional(pool)
        .await?
        .map(replay_from_row)
        .transpose()
}

fn maybe_spawn_replay_processing(state: &AppState, db: &PgPool, replay: &ReplayResponse) {
    if state.process_replays_in_background
        && matches!(&replay.status, ReplayStatus::Pending | ReplayStatus::Failed)
    {
        spawn_replay_processing(
            db.clone(),
            state.storage.clone(),
            replay.id,
            replay.file_sha256.clone(),
            replay.storage_key.clone(),
        );
    }
}

async fn insert_replay_metadata(
    pool: &PgPool,
    replay_id: Uuid,
    file_sha256: &str,
    original_file_name: Option<&str>,
    byte_size: u64,
    storage_key: &str,
    uploaded_by_user_id: Uuid,
) -> Result<InsertReplayMetadataResult, sqlx::Error> {
    let row = sqlx::query(
        r#"
        WITH inserted AS (
            INSERT INTO replays (
                id,
                uploaded_by_user_id,
                file_sha256,
                original_file_name,
                byte_size,
                storage_key
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (file_sha256) DO NOTHING
            RETURNING id, TRUE AS created
        )
        SELECT id, created
        FROM inserted
        UNION ALL
        SELECT id, FALSE AS created
        FROM replays
        WHERE file_sha256 = $3
          AND NOT EXISTS (SELECT 1 FROM inserted)
        LIMIT 1
        "#,
    )
    .bind(replay_id)
    .bind(uploaded_by_user_id)
    .bind(file_sha256)
    .bind(original_file_name)
    .bind(byte_size as i64)
    .bind(storage_key)
    .fetch_one(pool)
    .await?;
    let stored_replay_id: Uuid = row.try_get("id")?;
    let created: bool = row.try_get("created")?;

    let sql = replay_select_sql("WHERE id = $1");
    let replay = sqlx::query(sql.as_str())
        .bind(stored_replay_id)
        .fetch_one(pool)
        .await
        .and_then(replay_from_row)?;

    Ok(InsertReplayMetadataResult { replay, created })
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

const SUBTR_ACTOR_VIEWER_INDEX: &str = include_str!("../../static/subtr-actor/index.html");
const SUBTR_ACTOR_STATS_INDEX: &str = include_str!("../../static/subtr-actor/stats/index.html");

const REPLAY_LIST_PAGE: &str = r##"<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="data:,">
  <title>Rocket Sense Replays</title>
  <style>
    :root {
      color-scheme: light dark;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f6f7f9;
      color: #18202f;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: #f6f7f9;
    }

    header {
      border-bottom: 1px solid #d8dee8;
      background: #ffffff;
    }

    .header-inner, main {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
    }

    .header-inner {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    h1 {
      margin: 0;
      font-size: 22px;
      line-height: 1.2;
    }

    main {
      padding: 18px 0 32px;
      display: grid;
      gap: 14px;
    }

    form {
      display: grid;
      grid-template-columns: minmax(220px, 2fr) repeat(4, minmax(120px, 1fr)) auto;
      gap: 10px;
      align-items: end;
      padding: 14px 0;
      border-bottom: 1px solid #d8dee8;
    }

    label {
      display: grid;
      gap: 5px;
      color: #536176;
      font-size: 12px;
      font-weight: 650;
    }

    input, select, button {
      height: 36px;
      box-sizing: border-box;
      border: 1px solid #c6cfda;
      border-radius: 6px;
      padding: 0 10px;
      font: inherit;
      background: #ffffff;
      color: #18202f;
    }

    button, .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 36px;
      border: 1px solid #0f766e;
      border-radius: 6px;
      padding: 0 12px;
      background: #0f766e;
      color: #ffffff;
      font-weight: 750;
      text-decoration: none;
      cursor: pointer;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      color: #536176;
      font-size: 13px;
    }

    .token {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .token input {
      width: min(420px, 48vw);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 12px;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid #d8dee8;
      border-radius: 8px;
      background: #ffffff;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    th, td {
      padding: 11px 12px;
      border-bottom: 1px solid #e7ebf0;
      text-align: left;
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    th {
      color: #536176;
      font-size: 12px;
      font-weight: 750;
      background: #fbfcfd;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    .name {
      width: 34%;
      font-weight: 720;
    }

    .muted {
      color: #64748b;
    }

    .status {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      padding: 0 8px;
      border-radius: 999px;
      background: #eef2f7;
      color: #344256;
      font-size: 12px;
      font-weight: 750;
    }

    .actions {
      width: 160px;
      text-align: right;
    }

    td.actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .actions a {
      color: #0f766e;
      font-weight: 750;
      text-decoration: none;
    }

    .empty, .error {
      padding: 24px;
      border: 1px solid #d8dee8;
      border-radius: 8px;
      background: #ffffff;
      color: #536176;
    }

    .error {
      border-color: #f3b4ad;
      color: #b42318;
    }

    .pager {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .pager button {
      background: #ffffff;
      color: #18202f;
      border-color: #c6cfda;
      font-weight: 650;
    }

    .pager button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    @media (max-width: 860px) {
      .header-inner, main {
        width: min(100% - 20px, 1180px);
      }

      .header-inner, .toolbar {
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-start;
      }

      form {
        grid-template-columns: 1fr 1fr;
      }

      form button {
        grid-column: 1 / -1;
      }

      .token {
        width: 100%;
      }

      .token input {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <h1>Rocket Sense Replays</h1>
      <a class="button" href="/profile">Profile</a>
    </div>
  </header>
  <main>
    <form id="filters">
      <label>
        Search
        <input name="q" placeholder="Filename, player, id">
      </label>
      <label>
        Player
        <input name="player-name" placeholder="Display name">
      </label>
      <label>
        Playlist
        <select name="playlist">
          <option value="">Any</option>
          <option value="ranked-duels">Ranked Duel</option>
          <option value="ranked-doubles">Ranked Doubles</option>
          <option value="ranked-standard">Ranked Standard</option>
          <option value="ranked-solo-standard">Ranked Solo Standard</option>
          <option value="ranked-hoops">Ranked Hoops</option>
          <option value="ranked-rumble">Ranked Rumble</option>
          <option value="ranked-dropshot">Ranked Dropshot</option>
          <option value="ranked-snowday">Ranked Snow Day</option>
          <option value="unranked-duels">Casual Duel</option>
          <option value="unranked-doubles">Casual Doubles</option>
          <option value="unranked-standard">Casual Standard</option>
          <option value="unranked-chaos">Casual Chaos</option>
          <option value="private">Private</option>
          <option value="season">Season</option>
          <option value="offline">Offline</option>
          <option value="tournament">Tournament</option>
          <option value="hoops">Hoops</option>
          <option value="rumble">Rumble</option>
          <option value="dropshot">Dropshot</option>
          <option value="snowday">Snow Day</option>
          <option value="rocketlabs">Rocket Labs</option>
          <option value="dropshot-rumble">Dropshot Rumble</option>
          <option value="heatseeker">Heatseeker</option>
        </select>
      </label>
      <label>
        Map
        <input name="map" placeholder="stadium_p">
      </label>
      <label>
        Status
        <select name="status">
          <option value="">Any</option>
          <option value="pending">Pending</option>
          <option value="parsing">Parsing</option>
          <option value="parsed">Parsed</option>
          <option value="failed">Failed</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>

    <div class="toolbar">
      <div id="summary">Loading replays...</div>
      <label class="token">
        API token
        <input id="token" type="password" autocomplete="off" placeholder="Optional bearer token">
      </label>
    </div>

    <div id="content"></div>
    <div class="pager">
      <button id="previous" type="button">Previous</button>
      <button id="next" type="button">Next</button>
    </div>
  </main>

  <script>
    const form = document.querySelector("#filters");
    const content = document.querySelector("#content");
    const summary = document.querySelector("#summary");
    const tokenInput = document.querySelector("#token");
    const previousButton = document.querySelector("#previous");
    const nextButton = document.querySelector("#next");
    const pageSize = 50;
    let offset = Number(new URLSearchParams(location.search).get("offset") || 0);
    let nextOffset = null;

    tokenInput.value = localStorage.getItem("rocket_sense_access_token") || "";
    tokenInput.addEventListener("change", () => {
      localStorage.setItem("rocket_sense_access_token", tokenInput.value.trim());
      offset = 0;
      loadReplays();
    });

    function restoreFilters() {
      const params = new URLSearchParams(location.search);
      for (const element of form.elements) {
        if (!element.name || element.type === "submit") continue;
        element.value = params.get(element.name) || "";
      }
    }

    function buildParams() {
      const params = new URLSearchParams();
      const data = new FormData(form);
      for (const [key, value] of data.entries()) {
        const text = String(value).trim();
        if (text) params.append(key, text);
      }
      params.set("count", String(pageSize));
      params.set("offset", String(offset));
      params.set("sort-by", "upload-date");
      params.set("sort-dir", "desc");
      return params;
    }

    function headers() {
      const token = tokenInput.value.trim();
      return token ? { Authorization: `Bearer ${token}` } : {};
    }

    function viewerUrl(replay) {
      return `/replays/${encodeURIComponent(replay.id)}`;
    }

    function statsUrl(replay) {
      return `/replays/${encodeURIComponent(replay.id)}/stats`;
    }

    function replayName(replay) {
      return replay.original_file_name || replay.external_replay_id || replay.id;
    }

    function formatDate(value) {
      if (!value) return "";
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(value));
    }

    function formatBytes(value) {
      if (!Number.isFinite(value)) return "";
      return new Intl.NumberFormat(undefined, {
        style: "unit",
        unit: "byte",
        notation: "compact"
      }).format(value);
    }

    function text(value) {
      return value == null || value === "" ? "-" : String(value);
    }

    function render(replays) {
      if (replays.length === 0) {
        content.innerHTML = `<div class="empty">No replays match these filters.</div>`;
        return;
      }

      const rows = replays.map((replay) => `
        <tr>
          <td class="name" title="${escapeHtml(replayName(replay))}">
            ${escapeHtml(replayName(replay))}
            <div class="muted">${escapeHtml(replay.id)}</div>
          </td>
          <td>${escapeHtml(formatDate(replay.replay_date || replay.created_at))}</td>
          <td>${escapeHtml(text(replay.playlist))}</td>
          <td>${escapeHtml(text(replay.map_code))}</td>
          <td><span class="status">${escapeHtml(replay.status)}</span></td>
          <td>${escapeHtml(formatBytes(replay.byte_size))}</td>
          <td class="actions">
            <a href="${viewerUrl(replay)}" target="_blank" rel="noopener">Viewer</a>
            <a href="${statsUrl(replay)}" target="_blank" rel="noopener">Stats</a>
          </td>
        </tr>
      `).join("");

      content.innerHTML = `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th class="name">Replay</th>
                <th>Date</th>
                <th>Playlist</th>
                <th>Map</th>
                <th>Status</th>
                <th>Size</th>
                <th class="actions">Action</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character]));
    }

    async function loadReplays() {
      const params = buildParams();
      history.replaceState(null, "", `/replays?${params.toString()}`);
      summary.textContent = "Loading replays...";
      content.innerHTML = "";
      previousButton.disabled = offset === 0;
      nextButton.disabled = true;

      try {
        const response = await fetch(`/api/v1/replays?${params.toString()}`, {
          headers: headers(),
          credentials: "same-origin"
        });
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.error || "Replay search failed");
        }

        nextOffset = body.next_offset;
        summary.textContent = `${body.total} total replays`;
        previousButton.disabled = offset === 0;
        nextButton.disabled = nextOffset == null;
        render(body.replays);
      } catch (error) {
        summary.textContent = "Replay search failed";
        content.innerHTML = `<div class="error">${escapeHtml(error.message)}</div>`;
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      offset = 0;
      loadReplays();
    });

    previousButton.addEventListener("click", () => {
      offset = Math.max(0, offset - pageSize);
      loadReplays();
    });

    nextButton.addEventListener("click", () => {
      if (nextOffset != null) {
        offset = nextOffset;
        loadReplays();
      }
    });

    restoreFilters();
    loadReplays();
  </script>
</body>
</html>
"##;
