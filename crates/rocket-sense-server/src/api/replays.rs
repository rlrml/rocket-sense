use crate::{app::AppState, auth::AuthUser, processing::spawn_replay_processing};
use axum::{
    extract::{Multipart, Path, Query, RawQuery, State},
    http::{
        header::{CONTENT_DISPOSITION, CONTENT_TYPE},
        StatusCode,
    },
    response::{Html, IntoResponse, Redirect, Response},
    routing::get,
    Json, Router,
};
use chrono::{DateTime, NaiveDateTime, Utc};
use rocket_sense_storage::{raw_replay_key, replay_mime_type, sha256_hex, StorageError};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::types::Json as SqlxJson;
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
        .route("/subtr-actor/review", get(subtr_actor_review_redirect))
        .route("/subtr-actor/review/", get(subtr_actor_review))
        .route(
            "/subtr-actor/review/assets/{asset_path}",
            get(subtr_actor_review_asset),
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
    pub uploaded_by: Option<ReplayUploaderResponse>,
    pub storage_key: String,
    pub original_file_name: Option<String>,
    pub external_replay_id: Option<String>,
    pub playlist: Option<String>,
    pub map_code: Option<String>,
    pub replay_date: Option<DateTime<Utc>>,
    pub has_pro_player: bool,
    pub players: Vec<ReplayPlayerResponse>,
    pub summary: ReplaySummaryResponse,
    pub status: ReplayStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayUploaderResponse {
    pub id: Uuid,
    pub primary_email: Option<String>,
    pub display_name: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize, ToSchema)]
pub struct ReplayPlayerResponse {
    pub name: Option<String>,
    pub platform: Option<String>,
    pub platform_player_id: Option<String>,
    pub team: Option<i32>,
    pub is_pro: bool,
}

#[derive(Debug, Clone, Default, Serialize, ToSchema)]
pub struct ReplaySummaryResponse {
    pub team_scores: ReplayTeamScoresResponse,
    pub duration_seconds: Option<u32>,
    pub overtime_seconds: Option<u32>,
    pub match_guid: Option<String>,
    pub season: Option<String>,
}

#[derive(Debug, Clone, Default, Serialize, ToSchema)]
pub struct ReplayTeamScoresResponse {
    pub blue: Option<i32>,
    pub orange: Option<i32>,
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
    let sql = replay_select_sql("WHERE r.id = $1");
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

async fn subtr_actor_review() -> Html<&'static str> {
    Html(SUBTR_ACTOR_REVIEW_INDEX)
}

async fn subtr_actor_review_redirect(RawQuery(raw_query): RawQuery) -> Redirect {
    Redirect::temporary(&subtr_actor_review_trailing_slash_url(raw_query.as_deref()))
}

fn subtr_actor_review_trailing_slash_url(raw_query: Option<&str>) -> String {
    match raw_query {
        Some(query) if !query.is_empty() => format!("/subtr-actor/review/?{query}"),
        _ => "/subtr-actor/review/".to_owned(),
    }
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

async fn subtr_actor_review_asset(
    Path(asset_path): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    let asset = subtr_actor_review_static_asset(&asset_path).ok_or(StatusCode::NOT_FOUND)?;

    Ok(([(CONTENT_TYPE, asset.content_type)], asset.bytes))
}

#[derive(Debug)]
pub(super) struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    pub(super) fn new(status: StatusCode, message: impl Into<String>) -> Self {
        Self {
            status,
            message: message.into(),
        }
    }

    pub(super) fn bad_request(error: impl std::fmt::Display) -> Self {
        Self::new(StatusCode::BAD_REQUEST, error.to_string())
    }

    pub(super) fn internal(error: impl std::fmt::Display) -> Self {
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
            Self::UploadDate => "r.created_at",
            Self::ReplayDate => "r.replay_date",
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

pub(super) fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
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
        "index-C5ZLJyf-.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/index-C5ZLJyf-.js"),
        }),
        "main-CwtZ1J5U.css" => Some(StaticAsset {
            content_type: "text/css; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/main-CwtZ1J5U.css"),
        }),
        "main-DnBbSxYc.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/main-DnBbSxYc.js"),
        }),
        "replayLoader.worker-D4jOiD4n.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!(
                "../../static/subtr-actor/assets/replayLoader.worker-D4jOiD4n.js"
            ),
        }),
        "rl_replay_subtr_actor_bg-BYZJU53-.wasm" => Some(StaticAsset {
            content_type: "application/wasm",
            bytes: include_bytes!(
                "../../static/subtr-actor/assets/rl_replay_subtr_actor_bg-BYZJU53-.wasm"
            ),
        }),
        "wasm.worker-CXvX3V3O.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/assets/wasm.worker-CXvX3V3O.js"),
        }),
        _ => None,
    }
}

fn subtr_actor_stats_static_asset(path: &str) -> Option<StaticAsset> {
    match path {
        "index-CQK__Mt_.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/stats/assets/index-CQK__Mt_.js"),
        }),
        "index-Bw2_Ha6f.css" => Some(StaticAsset {
            content_type: "text/css; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/stats/assets/index-Bw2_Ha6f.css"),
        }),
        "replayLoader.worker-D4jOiD4n.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!(
                "../../static/subtr-actor/stats/assets/replayLoader.worker-D4jOiD4n.js"
            ),
        }),
        "rl_replay_subtr_actor_bg-BYZJU53-.wasm" => Some(StaticAsset {
            content_type: "application/wasm",
            bytes: include_bytes!(
                "../../static/subtr-actor/stats/assets/rl_replay_subtr_actor_bg-BYZJU53-.wasm"
            ),
        }),
        "wasm.worker-CXvX3V3O.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/stats/assets/wasm.worker-CXvX3V3O.js"),
        }),
        _ => None,
    }
}

fn subtr_actor_review_static_asset(path: &str) -> Option<StaticAsset> {
    match path {
        "index-DEe1FZ9T.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/review/assets/index-DEe1FZ9T.js"),
        }),
        "index-Dy-Q3BHC.css" => Some(StaticAsset {
            content_type: "text/css; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/review/assets/index-Dy-Q3BHC.css"),
        }),
        "rl_replay_subtr_actor_bg-BYZJU53-.wasm" => Some(StaticAsset {
            content_type: "application/wasm",
            bytes: include_bytes!(
                "../../static/subtr-actor/review/assets/rl_replay_subtr_actor_bg-BYZJU53-.wasm"
            ),
        }),
        "wasm.worker-CXvX3V3O.js" => Some(StaticAsset {
            content_type: "application/javascript; charset=utf-8",
            bytes: include_bytes!("../../static/subtr-actor/review/assets/wasm.worker-CXvX3V3O.js"),
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
    let sql = replay_select_sql("WHERE r.file_sha256 = $1");
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

    let sql = replay_select_sql("WHERE r.id = $1");
    let replay = sqlx::query(sql.as_str())
        .bind(stored_replay_id)
        .fetch_one(pool)
        .await
        .and_then(replay_from_row)?;

    Ok(InsertReplayMetadataResult { replay, created })
}

async fn count_replays(pool: &PgPool, filters: &ReplayFilters) -> Result<u64, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new("SELECT count(*) AS total FROM replays r");
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
        .push(", r.id ")
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
            .push(" AND (r.original_file_name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR r.file_sha256 ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR r.external_replay_id ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }

    for pattern in &filters.player_name_patterns {
        builder
            .push(" AND EXISTS (SELECT 1 FROM replay_players WHERE replay_players.replay_id = r.id AND replay_players.name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }

    for player_id in &filters.player_ids {
        builder
            .push(" AND EXISTS (SELECT 1 FROM replay_players WHERE replay_players.replay_id = r.id AND replay_players.platform = ")
            .push_bind(&player_id.platform)
            .push(" AND replay_players.platform_player_id = ")
            .push_bind(&player_id.player_id)
            .push(")");
    }

    if !filters.playlists.is_empty() {
        builder
            .push(" AND r.playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }

    if !filters.maps.is_empty() {
        builder
            .push(" AND r.map_code = ANY(")
            .push_bind(&filters.maps)
            .push(")");
    }

    if let Some(pro) = filters.pro {
        if pro {
            builder.push(" AND r.has_pro_player");
        } else {
            builder.push(" AND NOT r.has_pro_player");
        }
    }

    if let Some(uploader_user_id) = filters.uploader_user_id {
        builder
            .push(" AND r.uploaded_by_user_id = ")
            .push_bind(uploader_user_id);
    }

    if let Some(project_id) = filters.project_id {
        builder.push(" AND r.project_id = ").push_bind(project_id);
    }

    if let Some(status) = &filters.status {
        builder.push(" AND r.parse_status = ").push_bind(status);
    }

    if let Some(created_after) = filters.created_after {
        builder
            .push(" AND r.created_at >= ")
            .push_bind(created_after);
    }

    if let Some(created_before) = filters.created_before {
        builder
            .push(" AND r.created_at <= ")
            .push_bind(created_before);
    }

    if let Some(replay_date_after) = filters.replay_date_after {
        builder
            .push(" AND r.replay_date >= ")
            .push_bind(replay_date_after);
    }

    if let Some(replay_date_before) = filters.replay_date_before {
        builder
            .push(" AND r.replay_date <= ")
            .push_bind(replay_date_before);
    }
}

pub(super) fn replay_select_sql(where_clause: &str) -> String {
    format!(
        r#"
        SELECT
            r.id,
            r.file_sha256,
            r.original_file_name,
            r.byte_size,
            r.project_id,
            r.uploaded_by_user_id,
            uploader.id AS uploader_id,
            uploader.primary_email AS uploader_primary_email,
            uploader.display_name AS uploader_display_name,
            r.storage_key,
            r.external_replay_id,
            r.playlist,
            r.map_code,
            r.replay_date,
            r.has_pro_player,
            COALESCE(players.players, '[]'::jsonb) AS players,
            latest_stats.stats AS latest_stats,
            r.parse_status,
            r.created_at,
            r.updated_at
        FROM replays r
        LEFT JOIN users uploader ON uploader.id = r.uploaded_by_user_id
        LEFT JOIN LATERAL (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'name', player.name,
                    'platform', player.platform,
                    'platform_player_id', player.platform_player_id,
                    'team', player.team,
                    'is_pro', player.is_pro
                )
                ORDER BY player.team NULLS LAST, player.name NULLS LAST
            ) AS players
            FROM replay_players player
            WHERE player.replay_id = r.id
        ) players ON TRUE
        LEFT JOIN LATERAL (
            SELECT blob.stats
            FROM replay_stat_blobs blob
            WHERE blob.analysis_run_id = r.canonical_analysis_run_id
            LIMIT 1
        ) latest_stats ON TRUE
        {where_clause}
        "#
    )
}

pub(super) fn replay_from_row(row: sqlx::postgres::PgRow) -> Result<ReplayResponse, sqlx::Error> {
    let byte_size: i64 = row.try_get("byte_size")?;
    let parse_status: String = row.try_get("parse_status")?;
    let latest_stats: Option<Value> = row.try_get("latest_stats")?;
    let players = replay_players_from_row(&row, latest_stats.as_ref())?;
    let summary = replay_summary_from_stats(latest_stats.as_ref());
    let playlist = row
        .try_get::<Option<String>, _>("playlist")?
        .or_else(|| replay_playlist_from_stats(latest_stats.as_ref()));
    let map_code = row
        .try_get::<Option<String>, _>("map_code")?
        .or_else(|| replay_map_code_from_stats(latest_stats.as_ref()));
    let replay_date = row
        .try_get::<Option<DateTime<Utc>>, _>("replay_date")?
        .or_else(|| replay_date_from_stats(latest_stats.as_ref()));
    let uploaded_by = row
        .try_get::<Option<Uuid>, _>("uploader_id")?
        .map(|id| -> Result<ReplayUploaderResponse, sqlx::Error> {
            Ok(ReplayUploaderResponse {
                id,
                primary_email: row.try_get("uploader_primary_email")?,
                display_name: row.try_get("uploader_display_name")?,
            })
        })
        .transpose()?;

    Ok(ReplayResponse {
        id: row.try_get("id")?,
        file_sha256: row.try_get("file_sha256")?,
        original_file_name: row.try_get("original_file_name")?,
        byte_size: byte_size.max(0) as u64,
        project_id: row.try_get("project_id")?,
        uploaded_by_user_id: row.try_get("uploaded_by_user_id")?,
        uploaded_by,
        storage_key: row.try_get("storage_key")?,
        external_replay_id: row.try_get("external_replay_id")?,
        playlist,
        map_code,
        replay_date,
        has_pro_player: row.try_get("has_pro_player")?,
        players,
        summary,
        status: ReplayStatus::from_db(parse_status),
        created_at: row.try_get("created_at")?,
        updated_at: row.try_get("updated_at")?,
    })
}

fn replay_players_from_row(
    row: &sqlx::postgres::PgRow,
    latest_stats: Option<&Value>,
) -> Result<Vec<ReplayPlayerResponse>, sqlx::Error> {
    let SqlxJson(mut players): SqlxJson<Vec<ReplayPlayerResponse>> = row.try_get("players")?;
    if players.is_empty() {
        players = replay_players_from_stats(latest_stats);
    }

    Ok(players)
}

fn replay_players_from_stats(latest_stats: Option<&Value>) -> Vec<ReplayPlayerResponse> {
    let Some(stats) = latest_stats else {
        return Vec::new();
    };

    let mut players = Vec::new();
    for (team_key, team) in [("team_zero", 0_i32), ("team_one", 1_i32)] {
        let Some(team_players) = stats
            .pointer(&format!("/replay_meta/{team_key}"))
            .and_then(Value::as_array)
        else {
            continue;
        };

        players.extend(team_players.iter().map(|player| {
            ReplayPlayerResponse {
                name: player
                    .get("name")
                    .and_then(Value::as_str)
                    .map(str::to_owned),
                platform: None,
                platform_player_id: player
                    .get("remote_id")
                    .and_then(remote_id_text)
                    .map(str::to_owned),
                team: Some(team),
                is_pro: false,
            }
        }));
    }

    players
}

fn replay_summary_from_stats(latest_stats: Option<&Value>) -> ReplaySummaryResponse {
    let Some(stats) = latest_stats else {
        return ReplaySummaryResponse::default();
    };

    ReplaySummaryResponse {
        team_scores: ReplayTeamScoresResponse {
            blue: int_at(stats, "/modules/core/team_zero/goals"),
            orange: int_at(stats, "/modules/core/team_one/goals"),
        },
        duration_seconds: duration_seconds_from_stats(stats),
        overtime_seconds: overtime_seconds_from_stats(stats),
        match_guid: match_guid_from_stats(stats),
        season: season_from_stats(stats),
    }
}

fn replay_playlist_from_stats(latest_stats: Option<&Value>) -> Option<String> {
    replay_header_text(
        latest_stats?,
        &["Playlist", "PlaylistName", "GamePlaylist", "MatchType"],
    )
    .map(normalize_playlist_value)
}

fn replay_map_code_from_stats(latest_stats: Option<&Value>) -> Option<String> {
    replay_header_text(latest_stats?, &["MapName", "Map", "LevelName"])
        .map(|value| value.trim().to_owned())
        .filter(|value| !value.is_empty())
}

fn replay_date_from_stats(latest_stats: Option<&Value>) -> Option<DateTime<Utc>> {
    replay_header_text(latest_stats?, &["Date", "ReplayDate", "RecordDate"])
        .and_then(|value| parse_replay_date_text(&value))
}

fn season_from_stats(stats: &Value) -> Option<String> {
    replay_header_text(
        stats,
        &[
            "SeasonLabel",
            "SeasonName",
            "Season",
            "CompetitiveSeason",
            "RocketLeagueSeason",
        ],
    )
    .map(normalize_season_value)
    .filter(|value| !value.is_empty())
}

fn replay_header_text(stats: &Value, preferred_keys: &[&str]) -> Option<String> {
    let headers = stats
        .pointer("/replay_meta/all_headers")
        .and_then(Value::as_array)?;

    preferred_keys.iter().find_map(|preferred_key| {
        headers.iter().find_map(|header| {
            let entries = header.as_array()?;
            let key = entries.first()?.as_str()?;
            if !key.eq_ignore_ascii_case(preferred_key) {
                return None;
            }

            header_prop_value_text(entries.get(1)?)
        })
    })
}

fn header_prop_value_text(value: &Value) -> Option<String> {
    if let Some(text) = value.as_str() {
        return Some(text.to_owned());
    }

    if let Some(number) = value.as_i64() {
        return Some(number.to_string());
    }

    if let Some(number) = value.as_u64() {
        return Some(number.to_string());
    }

    if let Some(number) = value.as_f64() {
        return Some(number.to_string());
    }

    if let Some(boolean) = value.as_bool() {
        return Some(boolean.to_string());
    }

    if let Some(array) = value.as_array() {
        return array.iter().find_map(header_prop_value_text);
    }

    if let Some(object) = value.as_object() {
        return object.values().find_map(header_prop_value_text);
    }

    None
}

fn normalize_playlist_value(value: String) -> String {
    let trimmed = value.trim();
    let key = trimmed
        .to_ascii_lowercase()
        .replace(['_', '-'], " ")
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ");

    match key.as_str() {
        "1" | "duel" | "duels" | "casual duel" | "casual duels" | "unranked duel"
        | "unranked duels" => "unranked-duels".to_owned(),
        "2" | "doubles" | "casual doubles" | "unranked doubles" => "unranked-doubles".to_owned(),
        "3" | "standard" | "casual standard" | "unranked standard" => {
            "unranked-standard".to_owned()
        }
        "4" | "chaos" | "casual chaos" | "unranked chaos" => "unranked-chaos".to_owned(),
        "10" | "ranked duel" | "ranked duels" => "ranked-duels".to_owned(),
        "11" | "ranked doubles" => "ranked-doubles".to_owned(),
        "12" | "ranked solo standard" => "ranked-solo-standard".to_owned(),
        "13" | "ranked standard" => "ranked-standard".to_owned(),
        "27" | "hoops" | "ranked hoops" => "ranked-hoops".to_owned(),
        "28" | "rumble" | "ranked rumble" => "ranked-rumble".to_owned(),
        "29" | "dropshot" | "ranked dropshot" => "ranked-dropshot".to_owned(),
        "30" | "snowday" | "snow day" | "ranked snowday" | "ranked snow day" => {
            "ranked-snowday".to_owned()
        }
        "private" => "private".to_owned(),
        "season" => "season".to_owned(),
        "offline" => "offline".to_owned(),
        "tournament" => "tournament".to_owned(),
        "rocket labs" | "rocketlabs" => "rocketlabs".to_owned(),
        "dropshot rumble" => "dropshot-rumble".to_owned(),
        "heatseeker" => "heatseeker".to_owned(),
        _ => trimmed.to_owned(),
    }
}

fn normalize_season_value(value: String) -> String {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return String::new();
    }

    if trimmed.to_ascii_lowercase().starts_with("season") {
        trimmed.to_owned()
    } else {
        format!("Season {trimmed}")
    }
}

fn parse_replay_date_text(value: &str) -> Option<DateTime<Utc>> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return None;
    }

    DateTime::parse_from_rfc3339(trimmed)
        .map(|date| date.with_timezone(&Utc))
        .ok()
        .or_else(|| {
            DateTime::parse_from_str(trimmed, "%Y-%m-%d %H:%M:%S %z")
                .map(|date| date.with_timezone(&Utc))
                .ok()
        })
        .or_else(|| {
            [
                "%Y-%m-%d %H-%M-%S",
                "%Y-%m-%d %H:%M:%S",
                "%Y.%m.%d %H.%M.%S",
                "%m/%d/%Y %H:%M:%S",
            ]
            .iter()
            .find_map(|format| {
                NaiveDateTime::parse_from_str(trimmed, format)
                    .map(|date| DateTime::from_naive_utc_and_offset(date, Utc))
                    .ok()
            })
        })
}

fn int_at(value: &Value, pointer: &str) -> Option<i32> {
    value
        .pointer(pointer)
        .and_then(Value::as_i64)
        .and_then(|number| i32::try_from(number).ok())
}

fn duration_seconds_from_stats(stats: &Value) -> Option<u32> {
    let timeline = stats
        .pointer("/modules/core/timeline")
        .and_then(Value::as_array)?;
    let duration = timeline
        .iter()
        .filter_map(|event| event.get("time").and_then(Value::as_f64))
        .filter(|time| time.is_finite() && *time >= 0.0)
        .fold(None, |max_time: Option<f64>, time| {
            Some(max_time.map_or(time, |current| current.max(time)))
        })?;

    Some(duration.round() as u32)
}

fn overtime_seconds_from_stats(stats: &Value) -> Option<u32> {
    replay_header_text(
        stats,
        &[
            "OvertimeSeconds",
            "OvertimeTime",
            "Overtime",
            "OvertimeLength",
            "OTSeconds",
        ],
    )
    .and_then(|value| parse_positive_seconds(&value))
}

fn parse_positive_seconds(value: &str) -> Option<u32> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return None;
    }

    let seconds = trimmed.parse::<f64>().ok().or_else(|| {
        let (minutes, seconds) = trimmed.split_once(':')?;
        Some(minutes.trim().parse::<f64>().ok()? * 60.0 + seconds.trim().parse::<f64>().ok()?)
    })?;

    (seconds.is_finite() && seconds > 0.0).then_some(seconds.round() as u32)
}

fn match_guid_from_stats(stats: &Value) -> Option<String> {
    let headers = stats
        .pointer("/replay_meta/all_headers")
        .and_then(Value::as_array)?;
    let preferred_keys = ["Id", "MatchGUID", "MatchGuid", "MatchId", "GameEvent"];

    preferred_keys.iter().find_map(|preferred_key| {
        headers.iter().find_map(|header| {
            let entries = header.as_array()?;
            let key = entries.first()?.as_str()?;
            if key != *preferred_key {
                return None;
            }

            header_prop_text(entries.get(1)?).map(str::to_owned)
        })
    })
}

fn header_prop_text(value: &Value) -> Option<&str> {
    if let Some(text) = value.as_str() {
        return Some(text);
    }

    if let Some(array) = value.as_array() {
        return array.iter().find_map(header_prop_text);
    }

    if let Some(object) = value.as_object() {
        for key in ["Str", "String", "Name", "QWord", "Guid", "Id", "value"] {
            if let Some(text) = object.get(key).and_then(header_prop_text) {
                return Some(text);
            }
        }
        return object.values().find_map(header_prop_text);
    }

    None
}

fn remote_id_text(value: &Value) -> Option<&str> {
    header_prop_text(value)
}

const SUBTR_ACTOR_VIEWER_INDEX: &str = include_str!("../../static/subtr-actor/index.html");
const SUBTR_ACTOR_STATS_INDEX: &str = include_str!("../../static/subtr-actor/stats/index.html");
const SUBTR_ACTOR_REVIEW_INDEX: &str = include_str!("../../static/subtr-actor/review/index.html");

const REPLAY_LIST_PAGE: &str = include_str!("replays_page.html");
