use crate::{
    app::AppState,
    auth::{AuthUser, OptionalAuthUser},
    processing::{
        enqueue_replay_processing_job, enqueue_replay_reprocessing, process_client_scaffold,
        upsert_replay_preflight_metadata, ReplayReprocessOptions,
    },
    ranks::{ingest_rank_submissions, RankSubmission},
    telemetry,
};
use axum::{
    extract::{Multipart, Path, Query, RawQuery, State},
    http::{
        header::{CONTENT_DISPOSITION, CONTENT_TYPE},
        StatusCode,
    },
    response::{Html, IntoResponse, Redirect, Response},
    routing::{delete, get, post},
    Json, Router,
};
use bytes::Bytes;
use chrono::{DateTime, Utc};
use rocket_sense_storage::{
    decode_bytes_with_limit, encode_bytes, raw_replay_key, replay_mime_type, sha256_hex,
    StorageEncoding, StorageError, DEFAULT_STORAGE_ENCODING,
};
use serde::{Deserialize, Serialize};
use sqlx::types::Json as SqlxJson;
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use std::collections::HashMap;
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use super::query::{
    deserialize_string_vec, parse_bool_filter, parse_datetime_filter, parse_u32_filter, QueryParams,
};

#[cfg(test)]
#[path = "replays_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/replays", get(list_replays).post(create_replay))
        .route("/replays/filter-options", get(list_replay_filter_options))
        .route(
            "/replays/by-sha256/{file_sha256}",
            get(get_replay_by_sha256),
        )
        .route("/replays/{replay_id}/file", get(download_replay_file))
        .route("/replays/{replay_id}/ranks", post(set_replay_ranks))
        .route("/replays/{replay_id}/reprocess", post(reprocess_replay))
        .route(
            "/replays/{replay_id}/reprocess/client",
            post(reprocess_replay_client),
        )
        .route(
            "/replays/{replay_id}/stats/boost-tracks",
            get(get_replay_boost_tracks),
        )
        .route(
            "/replays/{replay_id}",
            get(get_replay).delete(delete_replay),
        )
        .route(
            "/replay-groups",
            get(list_replay_groups).post(create_replay_group),
        )
        .route(
            "/replay-groups/{group_id}",
            get(get_replay_group).delete(delete_replay_group),
        )
        .route(
            "/replay-groups/{group_id}/replays",
            get(list_replay_group_replays)
                .post(add_replay_group_replays)
                .delete(remove_replay_group_replays),
        )
        .route(
            "/replay-groups/{group_id}/managers",
            get(list_replay_group_managers).post(add_replay_group_manager),
        )
        .route(
            "/replay-groups/{group_id}/managers/{user_id}",
            delete(remove_replay_group_manager),
        )
        .route(
            "/replay-groups/{group_id}/stats/boost-totals",
            get(get_replay_group_boost_totals),
        )
}

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/subtr-actor", get(subtr_actor_viewer))
        .route("/subtr-actor/", get(subtr_actor_viewer))
        .route("/subtr-actor/stats", get(subtr_actor_stats))
        .route("/subtr-actor/stats/", get(subtr_actor_stats))
        .route("/subtr-actor/review", get(subtr_actor_review_redirect))
        .route("/subtr-actor/review/", get(subtr_actor_review))
        // One catch-all serves every bundled asset for all three viewer apps
        // (root viewer, `stats/`, `review/`) directly from the embedded
        // `static/subtr-actor` tree, keyed by its tree-relative path
        // (`assets/...`, `models/...`, `draco/...`, `skyboxes/...`, and the
        // per-app `stats/...` / `review/...` copies). The static index routes
        // above take priority over this wildcard, so the SPA entry points keep
        // serving their HTML. New asset directories the viewer ships need no
        // route changes.
        .route("/subtr-actor/{*asset_path}", get(subtr_actor_app_asset))
        // The embedded `EventClipPlayer` overrides the viewer's asset base to the
        // origin root (`assetBase: "/"`), so it fetches the shared 3D assets at
        // `/models/...` and `/draco/...` rather than under `/subtr-actor/`.
        .route("/models/{*asset_path}", get(subtr_actor_root_model_asset))
        .route("/draco/{*asset_path}", get(subtr_actor_root_draco_asset))
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
    pub playlist_metadata: ReplayPlaylistResponse,
    pub map_code: Option<String>,
    pub replay_date: Option<DateTime<Utc>>,
    pub has_pro_player: bool,
    pub players: Vec<ReplayPlayerResponse>,
    pub summary: ReplaySummaryResponse,
    pub processing_version: ReplayProcessingVersionResponse,
    pub staleness: ReplayStalenessResponse,
    pub status: ReplayStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayUploaderResponse {
    pub id: Uuid,
    pub primary_email: Option<String>,
    pub display_name: Option<String>,
    /// Auth provider the uploader signed in with (e.g. `steam`, `epic`,
    /// `xbox`, `google`), used to badge the account's platform. `None` when the
    /// uploader has no linked auth identity (e.g. legacy/dev accounts).
    pub provider: Option<String>,
}

#[derive(Debug, Clone, Default, Serialize, ToSchema)]
pub struct ReplayProcessingVersionResponse {
    pub processed_at: Option<DateTime<Utc>>,
    pub extractor_name: Option<String>,
    pub extractor_version: Option<String>,
    pub event_stream_schema_version: Option<String>,
    pub rocket_sense_git_sha: Option<String>,
    pub subtr_actor_version: Option<String>,
    pub subtr_actor_git_sha: Option<String>,
}

/// Whether a replay's persisted parse version is behind the running pipeline,
/// with the current values included so the UI can render "parsed with X /
/// current is Y" without a second request.
#[derive(Debug, Clone, Default, Serialize, ToSchema)]
pub struct ReplayStalenessResponse {
    pub is_stale: bool,
    pub schema_outdated: bool,
    pub subtr_actor_outdated: bool,
    pub current_event_stream_schema_version: String,
    pub current_subtr_actor_version: String,
    /// Git sha of subtr-actor in the running pipeline (`None` on builds that did
    /// not record one, e.g. local dev), so the UI can show "parsed sha → current
    /// sha" alongside the version.
    pub current_subtr_actor_git_sha: Option<String>,
    /// Git sha of rocket-sense in the running pipeline (`None` when unrecorded).
    pub current_rocket_sense_git_sha: Option<String>,
}

#[derive(Debug, Clone, Default, Serialize, ToSchema)]
pub struct ReplayPlaylistResponse {
    pub id: Option<String>,
    pub label: Option<String>,
    pub category: Option<String>,
    pub ruleset: Option<String>,
    pub team_size: Option<i32>,
    pub ranked: Option<bool>,
    pub casual: Option<bool>,
    pub soccar: Option<bool>,
    pub replay_game_type: Option<String>,
    pub header_match_type: Option<String>,
    pub game_playlist_id: Option<i32>,
    pub match_type_class: Option<String>,
}

#[derive(Debug, Clone, Default)]
struct ReplayGameTypeResponse {
    replay_game_type: Option<String>,
    header_match_type: Option<String>,
    game_playlist_id: Option<i32>,
    match_type_class: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize, ToSchema)]
pub struct ReplayPlayerResponse {
    pub name: Option<String>,
    pub platform: Option<String>,
    pub platform_player_id: Option<String>,
    pub team: Option<i32>,
    pub rank_tier: Option<i32>,
    pub rank_division: Option<i32>,
    pub rank_mmr: Option<f64>,
    /// True when the rank was not submitted with this replay and is instead
    /// the player's nearest known rank from another replay's submission.
    #[serde(default)]
    pub rank_is_fallback: bool,
    /// Date of the match the fallback rank was taken from.
    pub rank_fallback_replay_date: Option<DateTime<Utc>>,
    pub is_pro: bool,
    pub score: Option<i32>,
    pub goals: Option<i32>,
    pub assists: Option<i32>,
    pub saves: Option<i32>,
    pub shots: Option<i32>,
    pub active_time_seconds: Option<f64>,
    pub time_demolished_seconds: Option<f64>,
    pub non_demo_active_time_seconds: Option<f64>,
    pub time_most_back_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
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
    Processing,
    Processed,
    Failed,
}

impl ReplayStatus {
    fn from_db(value: String) -> Self {
        match value.as_str() {
            "pending" => Self::Pending,
            "processing" => Self::Processing,
            "processed" => Self::Processed,
            "failed" => Self::Failed,
            unknown => {
                tracing::warn!(status = unknown, "unknown replay processing status");
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

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayFilterOptionsResponse {
    pub maps: Vec<ReplayFilterOptionResponse>,
    pub seasons: Vec<ReplayFilterOptionResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayFilterOptionResponse {
    pub value: String,
    pub label: String,
    pub count: u64,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreateReplayGroupRequest {
    pub name: String,
    pub description: Option<String>,
    pub project_id: Option<Uuid>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct ReplayGroupReplayUpdateRequest {
    #[serde(default)]
    pub replay_ids: Vec<Uuid>,
    #[serde(default)]
    pub file_sha256s: Vec<String>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayGroupResponse {
    pub id: Uuid,
    pub project_id: Option<Uuid>,
    pub name: String,
    pub description: Option<String>,
    pub created_by_user_id: Option<Uuid>,
    pub replay_count: u64,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ListReplayGroupsResponse {
    pub groups: Vec<ReplayGroupResponse>,
}

/// A user who may administer a replay group: either its creator
/// (`is_creator = true`, always present) or a co-manager that was invited.
#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayGroupManagerResponse {
    pub user_id: Uuid,
    pub email: Option<String>,
    pub display_name: Option<String>,
    pub is_creator: bool,
    pub added_by_user_id: Option<Uuid>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ListReplayGroupManagersResponse {
    pub managers: Vec<ReplayGroupManagerResponse>,
}

/// Identify the user to grant management rights to. Provide exactly one of
/// `user_id` or `email`; `email` is matched case-insensitively against an
/// existing user's primary email.
#[derive(Debug, Deserialize, ToSchema)]
pub struct AddReplayGroupManagerRequest {
    #[serde(default)]
    pub user_id: Option<Uuid>,
    #[serde(default)]
    pub email: Option<String>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayGroupReplayUpdateResponse {
    pub group: ReplayGroupResponse,
    pub matched_replays: u64,
    pub changed_replays: u64,
}

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct ListReplaysQuery {
    /// Text search over original filename, SHA-256, and external replay id.
    pub q: Option<String>,
    /// Ballchasing-compatible title filter. Currently maps to original filename.
    pub title: Option<String>,
    /// Filter by one or more player display names.
    #[serde(
        default,
        rename = "player-name",
        alias = "player-name[]",
        alias = "player_names",
        alias = "player_names[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub player_names: Vec<String>,
    /// Filter by one or more player ids in `platform:id` form.
    #[serde(
        default,
        rename = "player-id",
        alias = "player-id[]",
        alias = "player_ids",
        alias = "player_ids[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub player_ids: Vec<String>,
    /// Filter by one or more playlist codes.
    #[serde(
        default,
        alias = "playlist[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub playlist: Vec<String>,
    /// Filter by one or more season codes.
    #[serde(
        default,
        alias = "season[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub season: Vec<String>,
    /// Only include replays where at least one player is at or above this rank tier.
    #[serde(rename = "min-rank")]
    pub min_rank: Option<String>,
    /// Only include replays where at least one player is at or below this rank tier.
    #[serde(rename = "max-rank")]
    pub max_rank: Option<String>,
    /// Only include replays containing at least one pro player.
    pub pro: Option<bool>,
    /// `me` for the authenticated user, or a Rocket Sense user UUID.
    pub uploader: Option<String>,
    /// Rocket Sense replay group id.
    pub group: Option<String>,
    /// Rocket Sense project id.
    pub project: Option<String>,
    /// Filter by one or more map codes.
    #[serde(
        default,
        rename = "map",
        alias = "map[]",
        alias = "maps",
        alias = "maps[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub maps: Vec<String>,
    /// Replay processing status.
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
    /// Supported values: `replay-date` (default), `upload-date`.
    #[serde(rename = "sort-by")]
    pub sort_by: Option<String>,
    /// Supported values: `asc`, `desc`.
    #[serde(rename = "sort-dir")]
    pub sort_dir: Option<String>,
}

impl ListReplaysQuery {
    fn from_raw_query(raw_query: Option<&str>) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        Ok(Self {
            q: params.first(&["q"]),
            title: params.first(&["title"]),
            player_names: params.values(&["player-name", "player_names"]),
            player_ids: params.values(&["player-id", "player_ids"]),
            playlist: params.values(&["playlist"]),
            season: params.values(&["season"]),
            min_rank: params.first(&["min-rank", "min_rank"]),
            max_rank: params.first(&["max-rank", "max_rank"]),
            pro: params
                .first(&["pro"])
                .map(|value| parse_bool_filter("pro", &value))
                .transpose()?,
            uploader: params.first(&["uploader"]),
            group: params.first(&["group"]),
            project: params.first(&["project"]),
            maps: params.values(&["map", "maps"]),
            status: params.first(&["status"]),
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
            count: params
                .first(&["count"])
                .map(|value| parse_u32_filter("count", &value))
                .transpose()?,
            offset: params
                .first(&["offset"])
                .map(|value| parse_u32_filter("offset", &value))
                .transpose()?,
            sort_by: params.first(&["sort-by", "sort_by"]),
            sort_dir: params.first(&["sort-dir", "sort_dir"]),
        })
    }
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
    RawQuery(raw_query): RawQuery,
    mut multipart: Multipart,
) -> Result<(StatusCode, Json<CreateReplayResponse>), ApiError> {
    tracing::debug!(
        user_id = %auth_user.id,
        email = ?auth_user.email,
        "authenticated replay upload"
    );
    let db = require_db(&state)?;
    let upload_encoding = parse_encoding_query(
        raw_query.as_deref(),
        &["upload-encoding", "upload_encoding"],
        StorageEncoding::Identity,
    )?;
    let storage_encoding = parse_encoding_query(
        raw_query.as_deref(),
        &["storage-encoding", "storage_encoding"],
        DEFAULT_STORAGE_ENCODING,
    )?;

    let mut replay_bytes = None;
    let mut original_file_name = None;
    let mut rank_submission: Option<RankSubmission> = None;

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(ApiError::bad_request)?
    {
        match field.name() {
            Some("file") => {
                original_file_name = field
                    .file_name()
                    .map(|name| normalize_uploaded_file_name(name, upload_encoding));
                replay_bytes = Some(field.bytes().await.map_err(ApiError::bad_request)?);
            }
            // Optional rank metadata submitted alongside the replay. Replay
            // files do not carry ranks, so a client (e.g. the rlru uploader)
            // may bundle them here as JSON; see `crate::ranks`.
            Some("ranks") => {
                let text = field.text().await.map_err(ApiError::bad_request)?;
                if !text.trim().is_empty() {
                    let parsed: RankSubmission = serde_json::from_str(&text).map_err(|error| {
                        telemetry::record_invalid_rank_submission(
                            "multipart_upload",
                            text.len(),
                            &error,
                        );
                        ApiError::bad_request(format!("invalid `ranks` field: {error}"))
                    })?;
                    telemetry::record_rank_submission_received(
                        "multipart_upload",
                        None,
                        parsed.observability_summary(),
                    );
                    rank_submission = Some(parsed);
                }
            }
            // Drain any other field so the multipart stream keeps advancing.
            _ => {
                let _ = field.bytes().await;
            }
        }
    }

    let uploaded_bytes =
        replay_bytes.ok_or_else(|| ApiError::bad_request("missing multipart field `file`"))?;
    let bytes = decode_transfer_bytes(uploaded_bytes, upload_encoding)?;
    let replay_id = Uuid::now_v7();
    let file_sha256 = sha256_hex(&bytes);
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    if let Some(replay) = find_replay_by_sha256(db, &file_sha256)
        .await
        .map_err(ApiError::internal)?
    {
        let replay = maybe_upsert_preflight_metadata(db, replay, bytes.clone()).await?;
        ingest_bundled_ranks(db, replay.id, rank_submission.as_ref()).await;
        maybe_enqueue_replay_processing(&state, db, &replay).await?;
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
        .put_with_encoding(
            &raw_replay_key(&file_sha256),
            bytes.clone(),
            Some(replay_mime_type()),
            storage_encoding,
        )
        .await
        .map_err(ApiError::internal)?;
    let insert_result = insert_replay_metadata(
        db,
        NewReplayMetadata {
            replay_id,
            file_sha256: &file_sha256,
            original_file_name: original_file_name.as_deref(),
            byte_size: stored.byte_size,
            storage_key: &stored.key,
            storage_encoding: stored.storage_encoding,
            storage_byte_size: stored.storage_byte_size,
            uploaded_by_user_id: auth_user.id,
        },
    )
    .await
    .map_err(ApiError::internal)?;
    let replay = insert_result.replay;

    let replay = maybe_upsert_preflight_metadata(db, replay, bytes).await?;
    ingest_bundled_ranks(db, replay.id, rank_submission.as_ref()).await;

    if insert_result.created {
        maybe_enqueue_replay_processing(&state, db, &replay).await?;
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

/// Ingests rank metadata bundled with an upload. Best-effort: a malformed
/// payload is rejected at parse time (400), but a failure to persist here must
/// not fail the upload itself — the replay is already stored — so errors are
/// logged and swallowed.
async fn ingest_bundled_ranks(db: &PgPool, replay_id: Uuid, submission: Option<&RankSubmission>) {
    let Some(submission) = submission else {
        return;
    };
    if submission.is_empty() {
        return;
    }
    match ingest_rank_submissions(db, replay_id, submission).await {
        Ok(summary) => {
            let rank_fields = submission.observability_summary();
            telemetry::record_rank_submission_ingested(
                "multipart_upload",
                replay_id,
                rank_fields,
                summary.submitted,
                summary.matched,
            );
        }
        Err(error) => tracing::warn!(
            %replay_id,
            error = %error,
            "failed to ingest bundled replay ranks"
        ),
    }
}

struct NewReplayMetadata<'a> {
    replay_id: Uuid,
    file_sha256: &'a str,
    original_file_name: Option<&'a str>,
    byte_size: u64,
    storage_key: &'a str,
    storage_encoding: StorageEncoding,
    storage_byte_size: u64,
    uploaded_by_user_id: Uuid,
}

async fn maybe_upsert_preflight_metadata(
    db: &PgPool,
    replay: ReplayResponse,
    replay_bytes: Bytes,
) -> Result<ReplayResponse, ApiError> {
    let needs_preflight = replay.players.is_empty()
        || matches!(&replay.status, ReplayStatus::Pending | ReplayStatus::Failed);
    if !needs_preflight {
        return Ok(replay);
    }

    let replay_id = replay.id;
    let file_sha256 = replay.file_sha256.clone();
    match upsert_replay_preflight_metadata(db, replay_id, replay_bytes).await {
        Ok(()) => find_replay_by_sha256(db, &file_sha256)
            .await
            .map_err(ApiError::internal)?
            .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found")),
        Err(error) => {
            tracing::warn!(
                %replay_id,
                error = %error,
                "failed to extract replay preflight metadata"
            );
            Ok(replay)
        }
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/replays",
    tag = "replays",
    params(ListReplaysQuery),
    responses(
        (status = 200, description = "Replay list", body = ListReplaysResponse),
        (status = 400, description = "Replay filters were invalid"),
        (status = 401, description = "Authentication was invalid or required for the selected filter"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn list_replays(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<ListReplaysResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = ListReplaysQuery::from_raw_query(raw_query.as_deref())?;
    let filters = ReplayFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    let (total, replays) =
        tokio::try_join!(count_replays(db, &filters), find_replays(db, &filters),)
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
    path = "/api/v1/replays/filter-options",
    tag = "replays",
    responses(
        (status = 200, description = "Replay search filter options", body = ReplayFilterOptionsResponse),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn list_replay_filter_options(
    State(state): State<AppState>,
) -> Result<Json<ReplayFilterOptionsResponse>, ApiError> {
    let db = require_db(&state)?;
    let maps = load_replay_filter_options(db, ReplayFilterOptionKind::Map)
        .await
        .map_err(ApiError::internal)?;
    let seasons = load_replay_filter_options(db, ReplayFilterOptionKind::Season)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(ReplayFilterOptionsResponse { maps, seasons }))
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
        (status = 404, description = "Replay was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_replay(
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
    delete,
    path = "/api/v1/replays/{replay_id}",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "The replay to delete")
    ),
    responses(
        (status = 204, description = "Replay was deleted"),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not have permission to delete this replay"),
        (status = 404, description = "Replay not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn delete_replay(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;

    let uploaded_by = sqlx::query_scalar::<_, Option<Uuid>>(
        "SELECT uploaded_by_user_id FROM replays WHERE id = $1",
    )
    .bind(replay_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    // A replay can be deleted by the user who uploaded it, or by any admin.
    let is_owner = uploaded_by == Some(auth_user.id);
    if !is_owner {
        let is_admin = crate::auth::resolve_is_admin(db, &auth_user, &state.admin_emails)
            .await
            .map_err(ApiError::internal)?;
        if !is_admin {
            return Err(ApiError::new(
                StatusCode::FORBIDDEN,
                "you do not have permission to delete this replay",
            ));
        }
    }

    // Collect the storage objects tied to this replay before its rows cascade
    // away. Raw replay files and event streams are content-addressed, so the
    // same key can be shared by duplicate uploads; we only delete an object once
    // nothing else references its key (checked after the cascade below).
    let object_keys = sqlx::query_scalar::<_, String>(
        "SELECT storage_key FROM replay_objects WHERE replay_id = $1",
    )
    .bind(replay_id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let event_stream_keys = sqlx::query_scalar::<_, String>(
        "SELECT event_stream_object_key FROM analysis_runs \
         WHERE replay_id = $1 AND event_stream_object_key IS NOT NULL",
    )
    .bind(replay_id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    // Deleting the replay row cascades to analysis_runs, play_events, every
    // player_replay_* materialized table, replay_objects, rank submissions, and
    // group membership via the ON DELETE CASCADE foreign keys.
    let result = sqlx::query("DELETE FROM replays WHERE id = $1")
        .bind(replay_id)
        .execute(db)
        .await
        .map_err(ApiError::internal)?;

    if result.rows_affected() == 0 {
        return Err(ApiError::new(StatusCode::NOT_FOUND, "replay not found"));
    }

    // Best-effort storage cleanup. The DB delete is the source of truth and has
    // already committed; a leftover object is harmless and re-importable, so we
    // log and continue rather than failing the request.
    for key in object_keys {
        if storage_key_still_referenced(db, &key).await {
            continue;
        }
        if let Err(error) = state.storage.delete(&key).await {
            tracing::warn!(%error, storage_key = %key, "failed to delete replay object during replay deletion");
        }
    }
    for key in event_stream_keys {
        if storage_key_still_referenced_event_stream(db, &key).await {
            continue;
        }
        if let Err(error) = state.storage.delete(&key).await {
            tracing::warn!(%error, storage_key = %key, "failed to delete event stream object during replay deletion");
        }
    }

    Ok(StatusCode::NO_CONTENT)
}

/// Whether any surviving `replay_objects` row still points at `storage_key`.
/// On a query error we conservatively report `true` so a shared/uncertain
/// object is never deleted out from under another replay.
async fn storage_key_still_referenced(db: &PgPool, storage_key: &str) -> bool {
    sqlx::query_scalar::<_, bool>(
        "SELECT EXISTS(SELECT 1 FROM replay_objects WHERE storage_key = $1)",
    )
    .bind(storage_key)
    .fetch_one(db)
    .await
    .unwrap_or(true)
}

/// Whether any surviving `analysis_runs` row still points at this event-stream
/// object key. Conservatively reports `true` on error.
async fn storage_key_still_referenced_event_stream(db: &PgPool, storage_key: &str) -> bool {
    sqlx::query_scalar::<_, bool>(
        "SELECT EXISTS(SELECT 1 FROM analysis_runs WHERE event_stream_object_key = $1)",
    )
    .bind(storage_key)
    .fetch_one(db)
    .await
    .unwrap_or(true)
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
        (status = 404, description = "Replay was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_replay_by_sha256(
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
    path = "/api/v1/replay-groups",
    tag = "replay-groups",
    responses(
        (status = 200, description = "Replay groups", body = ListReplayGroupsResponse),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn list_replay_groups(
    State(state): State<AppState>,
) -> Result<Json<ListReplayGroupsResponse>, ApiError> {
    let db = require_db(&state)?;
    let groups = load_replay_groups(db).await.map_err(ApiError::internal)?;

    Ok(Json(ListReplayGroupsResponse { groups }))
}

#[utoipa::path(
    post,
    path = "/api/v1/replay-groups",
    tag = "replay-groups",
    request_body = CreateReplayGroupRequest,
    responses(
        (status = 200, description = "Created replay group", body = ReplayGroupResponse),
        (status = 400, description = "Replay group request was invalid"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_replay_group(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<CreateReplayGroupRequest>,
) -> Result<Json<ReplayGroupResponse>, ApiError> {
    let db = require_db(&state)?;
    let name = validate_replay_group_name(&request.name)?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let group_id = Uuid::now_v7();
    sqlx::query(
        r#"
        INSERT INTO replay_groups (
            id,
            project_id,
            name,
            description,
            created_by_user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        "#,
    )
    .bind(group_id)
    .bind(request.project_id)
    .bind(name)
    .bind(request.description.filter(|value| !value.trim().is_empty()))
    .bind(auth_user.id)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    let group = load_replay_group(db, group_id)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay group not found"))?;

    Ok(Json(group))
}

#[utoipa::path(
    get,
    path = "/api/v1/replay-groups/{group_id}",
    tag = "replay-groups",
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 200, description = "Replay group", body = ReplayGroupResponse),
        (status = 404, description = "Replay group was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_replay_group(
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
) -> Result<Json<ReplayGroupResponse>, ApiError> {
    let db = require_db(&state)?;
    let group = load_replay_group(db, group_id)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay group not found"))?;

    Ok(Json(group))
}

#[utoipa::path(
    delete,
    path = "/api/v1/replay-groups/{group_id}",
    tag = "replay-groups",
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 204, description = "Replay group was deleted"),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Replay group was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn delete_replay_group(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;
    require_replay_group_manager(&state, db, group_id, &auth_user).await?;
    // Member rows are removed by the replay_group_replays ON DELETE CASCADE.
    let result = sqlx::query("DELETE FROM replay_groups WHERE id = $1")
        .bind(group_id)
        .execute(db)
        .await
        .map_err(ApiError::internal)?;

    if result.rows_affected() == 0 {
        return Err(ApiError::new(
            StatusCode::NOT_FOUND,
            "replay group not found",
        ));
    }

    Ok(StatusCode::NO_CONTENT)
}

#[utoipa::path(
    get,
    path = "/api/v1/replay-groups/{group_id}/replays",
    tag = "replay-groups",
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 200, description = "Replay group replays", body = ListReplaysResponse),
        (status = 404, description = "Replay group was not found"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn list_replay_group_replays(
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
) -> Result<Json<ListReplaysResponse>, ApiError> {
    let db = require_db(&state)?;
    require_replay_group(db, group_id).await?;
    let total = count_replay_group_replays(db, group_id)
        .await
        .map_err(ApiError::internal)?;
    let replays = load_replay_group_replays(db, group_id)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(ListReplaysResponse {
        count: replays.len() as u32,
        offset: 0,
        total,
        next_offset: None,
        replays,
    }))
}

#[utoipa::path(
    post,
    path = "/api/v1/replay-groups/{group_id}/replays",
    tag = "replay-groups",
    request_body = ReplayGroupReplayUpdateRequest,
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 200, description = "Replay group update result", body = ReplayGroupReplayUpdateResponse),
        (status = 400, description = "Replay group update request was invalid"),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Replay group was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn add_replay_group_replays(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
    Json(request): Json<ReplayGroupReplayUpdateRequest>,
) -> Result<Json<ReplayGroupReplayUpdateResponse>, ApiError> {
    let db = require_db(&state)?;
    require_replay_group_manager(&state, db, group_id, &auth_user).await?;
    let replay_ids = resolve_replay_group_update_replays(db, &request).await?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let mut changed_replays = 0u64;
    for replay_id in &replay_ids {
        let result = sqlx::query(
            r#"
            INSERT INTO replay_group_replays (
                group_id,
                replay_id,
                added_by_user_id
            )
            VALUES ($1, $2, $3)
            ON CONFLICT DO NOTHING
            "#,
        )
        .bind(group_id)
        .bind(replay_id)
        .bind(auth_user.id)
        .execute(db)
        .await
        .map_err(ApiError::internal)?;
        changed_replays += result.rows_affected();
    }

    let group = load_replay_group(db, group_id)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay group not found"))?;

    Ok(Json(ReplayGroupReplayUpdateResponse {
        group,
        matched_replays: replay_ids.len() as u64,
        changed_replays,
    }))
}

#[utoipa::path(
    delete,
    path = "/api/v1/replay-groups/{group_id}/replays",
    tag = "replay-groups",
    request_body = ReplayGroupReplayUpdateRequest,
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 200, description = "Replay group update result", body = ReplayGroupReplayUpdateResponse),
        (status = 400, description = "Replay group update request was invalid"),
        (status = 401, description = "Authentication required"),
        (status = 404, description = "Replay group was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn remove_replay_group_replays(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
    Json(request): Json<ReplayGroupReplayUpdateRequest>,
) -> Result<Json<ReplayGroupReplayUpdateResponse>, ApiError> {
    let db = require_db(&state)?;
    require_replay_group_manager(&state, db, group_id, &auth_user).await?;
    let replay_ids = resolve_replay_group_update_replays(db, &request).await?;
    let result = sqlx::query(
        r#"
        DELETE FROM replay_group_replays
        WHERE group_id = $1
          AND replay_id = ANY($2)
        "#,
    )
    .bind(group_id)
    .bind(&replay_ids)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;
    let group = load_replay_group(db, group_id)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay group not found"))?;

    Ok(Json(ReplayGroupReplayUpdateResponse {
        group,
        matched_replays: replay_ids.len() as u64,
        changed_replays: result.rows_affected(),
    }))
}

#[utoipa::path(
    get,
    path = "/api/v1/replay-groups/{group_id}/managers",
    tag = "replay-groups",
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 200, description = "Replay group managers", body = ListReplayGroupManagersResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not manage this replay group"),
        (status = 404, description = "Replay group was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_replay_group_managers(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
) -> Result<Json<ListReplayGroupManagersResponse>, ApiError> {
    let db = require_db(&state)?;
    // Only people who can administer the group may see who else can.
    require_replay_group_manager(&state, db, group_id, &auth_user).await?;
    let managers = load_replay_group_managers(db, group_id)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(ListReplayGroupManagersResponse { managers }))
}

#[utoipa::path(
    post,
    path = "/api/v1/replay-groups/{group_id}/managers",
    tag = "replay-groups",
    request_body = AddReplayGroupManagerRequest,
    params(
        ("group_id" = Uuid, Path, description = "Replay group id")
    ),
    responses(
        (status = 200, description = "Updated manager list", body = ListReplayGroupManagersResponse),
        (status = 400, description = "Request was invalid"),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not manage this replay group"),
        (status = 404, description = "Replay group or target user was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn add_replay_group_manager(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
    Json(request): Json<AddReplayGroupManagerRequest>,
) -> Result<Json<ListReplayGroupManagersResponse>, ApiError> {
    let db = require_db(&state)?;
    // Any existing manager (or the creator/admin) may invite another manager.
    require_replay_group_manager(&state, db, group_id, &auth_user).await?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let target_user_id = resolve_manager_target_user(db, &request).await?;

    sqlx::query(
        r#"
        INSERT INTO replay_group_managers (group_id, user_id, added_by_user_id)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(group_id)
    .bind(target_user_id)
    .bind(auth_user.id)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    let managers = load_replay_group_managers(db, group_id)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(ListReplayGroupManagersResponse { managers }))
}

#[utoipa::path(
    delete,
    path = "/api/v1/replay-groups/{group_id}/managers/{user_id}",
    tag = "replay-groups",
    params(
        ("group_id" = Uuid, Path, description = "Replay group id"),
        ("user_id" = Uuid, Path, description = "User to remove as a manager")
    ),
    responses(
        (status = 200, description = "Updated manager list", body = ListReplayGroupManagersResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not manage this replay group"),
        (status = 404, description = "Replay group or manager was not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn remove_replay_group_manager(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path((group_id, user_id)): Path<(Uuid, Uuid)>,
) -> Result<Json<ListReplayGroupManagersResponse>, ApiError> {
    let db = require_db(&state)?;
    require_replay_group_manager(&state, db, group_id, &auth_user).await?;

    let result =
        sqlx::query("DELETE FROM replay_group_managers WHERE group_id = $1 AND user_id = $2")
            .bind(group_id)
            .bind(user_id)
            .execute(db)
            .await
            .map_err(ApiError::internal)?;

    if result.rows_affected() == 0 {
        return Err(ApiError::new(
            StatusCode::NOT_FOUND,
            "that user is not a manager of this replay group",
        ));
    }

    let managers = load_replay_group_managers(db, group_id)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(ListReplayGroupManagersResponse { managers }))
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
    RawQuery(raw_query): RawQuery,
) -> Result<Response, ApiError> {
    let db = require_db(&state)?;
    let download_encoding = parse_encoding_query(
        raw_query.as_deref(),
        &["download-encoding", "download_encoding", "encoding"],
        StorageEncoding::Identity,
    )?;
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
    let response_bytes = encode_transfer_bytes(bytes, download_encoding)?;
    let response_file_name = encoded_file_name(&file_name, download_encoding);

    Ok((
        [
            (
                CONTENT_TYPE,
                replay_download_content_type(download_encoding).to_owned(),
            ),
            (
                CONTENT_DISPOSITION,
                format!(
                    "attachment; filename=\"{}\"",
                    sanitize_file_name(&response_file_name)
                ),
            ),
        ],
        response_bytes,
    )
        .into_response())
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct BoostTrackPoint {
    pub frame: i64,
    #[serde(default)]
    pub time: Option<f64>,
    pub value: f64,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct BoostTrack {
    #[serde(default)]
    pub player_id: Option<String>,
    pub is_team_0: bool,
    /// subtr-actor `AccumulationQuantity`, snake_case (e.g. `boost_amount`,
    /// `boost_used`, `boost_used_supersonic`, `boost_collected`, ...).
    pub quantity: String,
    pub points: Vec<BoostTrackPoint>,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct BoostTracksResponse {
    pub tracks: Vec<BoostTrack>,
}

/// Per-player continuous boost quantities (instantaneous amount + cumulative
/// totals) for the replay's canonical analysis run. Returns an empty list when
/// the replay has not been (re)processed with boost accumulation tracks yet.
pub async fn get_replay_boost_tracks(
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
) -> Result<Json<BoostTracksResponse>, ApiError> {
    let db = require_db(&state)?;
    let row = sqlx::query(
        r#"
        SELECT t.tracks AS tracks
        FROM replay_boost_tracks t
        JOIN replays r ON r.canonical_analysis_run_id = t.analysis_run_id
        WHERE r.id = $1
        "#,
    )
    .bind(replay_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?;

    let response = match row {
        Some(row) => {
            let SqlxJson(tracks): SqlxJson<BoostTracksResponse> =
                row.try_get("tracks").map_err(ApiError::internal)?;
            tracks
        }
        None => BoostTracksResponse { tracks: Vec::new() },
    };

    Ok(Json(response))
}

/// Per-player boost totals aggregated across every replay in a group, derived
/// from the boost accumulation tracks (the continuous quantities that are *not*
/// indexed as discrete events). The instantaneous `boost_amount` track is
/// time-weighted into a mean and partitioned into boost-level band seconds; the
/// monotonic `boost_used` / `boost_used_supersonic` tracks contribute their
/// final cumulative totals. Values are summed over the group's replays so the
/// group stats page can build a boost stat table and level distribution without
/// a single-replay timeline (which has no group-level meaning).
#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct GroupBoostTotal {
    /// `platform:platform_player_id` identity key, matching event `player_id`.
    pub player_id: String,
    pub is_team_0: bool,
    /// Total boost used across the group, in 0-100 percent units.
    pub boost_used: f64,
    /// Total boost used while supersonic, in 0-100 percent units.
    pub boost_used_supersonic: f64,
    /// Sum of `boost_amount_percent * seconds_held`, the numerator of the
    /// time-weighted mean boost amount (denominator is `tracked_seconds`).
    pub boost_amount_weighted_sum: f64,
    /// Total seconds the boost-amount track covered across the group.
    pub tracked_seconds: f64,
    /// Seconds held in each boost-level band (a partition of `tracked_seconds`):
    /// empty (<1%), low (1-25), medium (25-50), high (50-75), full (75-100),
    /// over (>=100). The web layer recombines these into table/chart bands.
    pub time_empty: f64,
    pub time_low: f64,
    pub time_medium: f64,
    pub time_high: f64,
    pub time_full: f64,
    pub time_over: f64,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct GroupBoostTotalsResponse {
    pub totals: Vec<GroupBoostTotal>,
    /// Sum across the group's replays of each replay's tracked boost-amount
    /// duration; the denominator for per-minute (BPM/BCPM) rates.
    pub duration_seconds: f64,
}

/// Raw replay boost is stored on a `0..=255` scale; mirror
/// subtr-actor's `boost_amount_to_percent` (in f64 to match the JS bindings).
const BOOST_RAW_MAX: f64 = 255.0;

#[derive(Default)]
struct GroupBoostAccumulator {
    is_team_0: bool,
    boost_used: f64,
    boost_used_supersonic: f64,
    boost_amount_weighted_sum: f64,
    tracked_seconds: f64,
    bands: [f64; 6],
}

/// Index into `GroupBoostAccumulator::bands` for a boost amount percentage,
/// matching the web's `boostBandForAmount` partition.
fn boost_band_index(percent: f64) -> usize {
    if percent < 1.0 {
        0
    } else if percent < 25.0 {
        1
    } else if percent < 50.0 {
        2
    } else if percent < 75.0 {
        3
    } else if percent < 100.0 {
        4
    } else {
        5
    }
}

/// Fold one replay's boost tracks into the per-player accumulators. The
/// time-weighting mirrors the web's `timeWeightedBoostAverage` /
/// `boostBandDurations`: each change-point sample is weighted by the time it
/// holds until the next sample (or the replay's tracked duration).
fn accumulate_group_boost_tracks(
    tracks: &[BoostTrack],
    accumulators: &mut HashMap<String, GroupBoostAccumulator>,
) -> f64 {
    // Replay duration = latest boost-amount sample time, used to weight the
    // final held sample (matches the web's per-replay duration derivation).
    let replay_duration = tracks
        .iter()
        .filter(|track| track.quantity == "boost_amount")
        .flat_map(|track| track.points.iter())
        .filter_map(|point| point.time)
        .fold(0.0_f64, f64::max);

    for track in tracks {
        let Some(player_id) = track.player_id.as_ref() else {
            continue;
        };
        let accumulator = accumulators.entry(player_id.clone()).or_default();
        accumulator.is_team_0 = track.is_team_0;

        match track.quantity.as_str() {
            "boost_amount" => {
                let mut samples: Vec<(f64, f64)> = track
                    .points
                    .iter()
                    .filter_map(|point| point.time.map(|time| (time, point.value)))
                    .collect();
                samples.sort_by(|left, right| left.0.total_cmp(&right.0));
                for index in 0..samples.len() {
                    let (time, value) = samples[index];
                    let next_time = samples.get(index + 1).map_or(replay_duration, |s| s.0);
                    let seconds = (next_time.min(replay_duration) - time.max(0.0)).max(0.0);
                    if seconds == 0.0 {
                        continue;
                    }
                    let percent = value * 100.0 / BOOST_RAW_MAX;
                    accumulator.boost_amount_weighted_sum += percent * seconds;
                    accumulator.tracked_seconds += seconds;
                    accumulator.bands[boost_band_index(percent)] += seconds;
                }
            }
            "boost_used" => {
                if let Some(last) = track.points.last() {
                    accumulator.boost_used += last.value * 100.0 / BOOST_RAW_MAX;
                }
            }
            "boost_used_supersonic" => {
                if let Some(last) = track.points.last() {
                    accumulator.boost_used_supersonic += last.value * 100.0 / BOOST_RAW_MAX;
                }
            }
            _ => {}
        }
    }

    replay_duration
}

/// Per-player boost totals aggregated across every replay in a group. Empty
/// when no replay in the group has been processed with boost accumulation
/// tracks yet.
pub async fn get_replay_group_boost_totals(
    State(state): State<AppState>,
    Path(group_id): Path<Uuid>,
) -> Result<Json<GroupBoostTotalsResponse>, ApiError> {
    let db = require_db(&state)?;
    let rows = sqlx::query(
        r#"
        SELECT t.tracks AS tracks
        FROM replay_boost_tracks t
        JOIN replays r ON r.canonical_analysis_run_id = t.analysis_run_id
        JOIN replay_group_replays gr ON gr.replay_id = r.id
        WHERE gr.group_id = $1
        "#,
    )
    .bind(group_id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let mut accumulators: HashMap<String, GroupBoostAccumulator> = HashMap::new();
    let mut duration_seconds = 0.0_f64;
    for row in rows {
        let SqlxJson(tracks): SqlxJson<BoostTracksResponse> =
            row.try_get("tracks").map_err(ApiError::internal)?;
        duration_seconds += accumulate_group_boost_tracks(&tracks.tracks, &mut accumulators);
    }

    let mut totals: Vec<GroupBoostTotal> = accumulators
        .into_iter()
        .map(|(player_id, accumulator)| GroupBoostTotal {
            player_id,
            is_team_0: accumulator.is_team_0,
            boost_used: accumulator.boost_used,
            boost_used_supersonic: accumulator.boost_used_supersonic,
            boost_amount_weighted_sum: accumulator.boost_amount_weighted_sum,
            tracked_seconds: accumulator.tracked_seconds,
            time_empty: accumulator.bands[0],
            time_low: accumulator.bands[1],
            time_medium: accumulator.bands[2],
            time_high: accumulator.bands[3],
            time_full: accumulator.bands[4],
            time_over: accumulator.bands[5],
        })
        .collect();
    totals.sort_by(|left, right| left.player_id.cmp(&right.player_id));

    Ok(Json(GroupBoostTotalsResponse {
        totals,
        duration_seconds,
    }))
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

/// Serves any bundled viewer asset by its tree-relative path under
/// `static/subtr-actor` (e.g. `assets/index-X.js`, `models/ball/scene.gltf`,
/// `stats/skyboxes/PlanetaryEarth4k.hdr`).
async fn subtr_actor_app_asset(
    Path(asset_path): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    serve_subtr_actor_asset(&asset_path)
}

/// `/models/...` alias for the embedded `EventClipPlayer` (`assetBase: "/"`),
/// mapping onto the shared `models/` assets in the embedded tree.
async fn subtr_actor_root_model_asset(
    Path(asset_path): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    serve_subtr_actor_asset(&format!("models/{asset_path}"))
}

/// `/draco/...` alias for the embedded `EventClipPlayer` (`assetBase: "/"`).
async fn subtr_actor_root_draco_asset(
    Path(asset_path): Path<String>,
) -> Result<impl IntoResponse, StatusCode> {
    serve_subtr_actor_asset(&format!("draco/{asset_path}"))
}

fn serve_subtr_actor_asset(path: &str) -> Result<impl IntoResponse, StatusCode> {
    let asset = subtr_actor_asset(path).ok_or(StatusCode::NOT_FOUND)?;

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
    seasons: Vec<String>,
    maps: Vec<String>,
    min_rank_tier: Option<i32>,
    max_rank_tier: Option<i32>,
    pro: Option<bool>,
    uploader_user_id: Option<Uuid>,
    group_id: Option<Uuid>,
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
    fn from_query(query: ListReplaysQuery, auth_user_id: Option<Uuid>) -> Result<Self, ApiError> {
        let search = query
            .q
            .or(query.title)
            .map(|term| term.trim().to_owned())
            .filter(|term| !term.is_empty());
        let uploader_user_id = query
            .uploader
            .map(|uploader| parse_uploader_filter(&uploader, auth_user_id))
            .transpose()?;
        let group_id = query
            .group
            .map(|group| parse_group_filter(&group))
            .transpose()?;
        let project_id = query
            .project
            .map(|project| parse_project_filter(&project))
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
            seasons: normalize_terms(query.season),
            maps: normalize_terms(query.maps),
            min_rank_tier: query
                .min_rank
                .map(|rank| parse_rank_filter("min-rank", &rank))
                .transpose()?,
            max_rank_tier: query
                .max_rank
                .map(|rank| parse_rank_filter("max-rank", &rank))
                .transpose()?,
            pro: query.pro,
            uploader_user_id,
            group_id,
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
        match value.unwrap_or("replay-date") {
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

    /// NULLS placement for this column's ORDER BY, chosen so the planner can
    /// satisfy the sort from the backing index instead of scanning + sorting
    /// the whole table.
    ///
    /// `created_at` is NOT NULL and indexed as `(created_at DESC, id DESC)`
    /// (i.e. NULLS FIRST). Emitting an explicit `NULLS LAST` here makes the
    /// ORDER BY not match the index, forcing a full Seq Scan + Sort on every
    /// page load even with a small LIMIT. Using the default placement lets a
    /// forward index scan serve DESC and a backward scan serve ASC.
    ///
    /// `replay_date` is nullable and indexed as
    /// `(replay_date DESC NULLS LAST, id DESC)`, so it must keep `NULLS LAST`
    /// to match.
    fn nulls_sql(&self) -> &'static str {
        match self {
            Self::UploadDate => "",
            Self::ReplayDate => " NULLS LAST",
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

fn parse_uploader_filter(value: &str, auth_user_id: Option<Uuid>) -> Result<Uuid, ApiError> {
    let value = value.trim();
    if value == "me" {
        return auth_user_id.ok_or_else(|| {
            ApiError::new(
                StatusCode::UNAUTHORIZED,
                "uploader=me requires authentication",
            )
        });
    }

    Uuid::parse_str(value)
        .map_err(|_| ApiError::bad_request("uploader must be `me` or a Rocket Sense user UUID"))
}

fn parse_group_filter(value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request("group must be a Rocket Sense replay group UUID"))
}

fn parse_project_filter(value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request("project must be a Rocket Sense project UUID"))
}

pub(crate) fn parse_rank_filter(name: &str, value: &str) -> Result<i32, ApiError> {
    let normalized = value.trim().to_lowercase().replace('_', "-");
    if normalized.is_empty() {
        return Err(ApiError::bad_request(format!("{name} must not be empty")));
    }
    if let Ok(tier) = normalized.parse::<i32>() {
        if (0..=22).contains(&tier) {
            return Ok(tier);
        }
    }

    let tier = match normalized.as_str() {
        "unranked" => 0,
        "bronze-1" | "bronze-i" => 1,
        "bronze-2" | "bronze-ii" => 2,
        "bronze-3" | "bronze-iii" => 3,
        "silver-1" | "silver-i" => 4,
        "silver-2" | "silver-ii" => 5,
        "silver-3" | "silver-iii" => 6,
        "gold-1" | "gold-i" => 7,
        "gold-2" | "gold-ii" => 8,
        "gold-3" | "gold-iii" => 9,
        "platinum-1" | "platinum-i" => 10,
        "platinum-2" | "platinum-ii" => 11,
        "platinum-3" | "platinum-iii" => 12,
        "diamond-1" | "diamond-i" => 13,
        "diamond-2" | "diamond-ii" => 14,
        "diamond-3" | "diamond-iii" => 15,
        "champion-1" | "champion-i" => 16,
        "champion-2" | "champion-ii" => 17,
        "champion-3" | "champion-iii" => 18,
        "grand-champion" | "grand-champion-1" | "grand-champion-i" => 19,
        "grand-champion-2" | "grand-champion-ii" => 20,
        "grand-champion-3" | "grand-champion-iii" => 21,
        "supersonic-legend" | "ssl" => 22,
        _ => {
            return Err(ApiError::bad_request(format!(
                "{name} must be a rank slug or tier number"
            )))
        }
    };

    Ok(tier)
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

fn parse_encoding_query(
    raw_query: Option<&str>,
    names: &[&str],
    default: StorageEncoding,
) -> Result<StorageEncoding, ApiError> {
    let params = QueryParams::from_raw(raw_query);
    params
        .first(names)
        .map(|value| parse_encoding(names[0], &value))
        .transpose()
        .map(|value| value.unwrap_or(default))
}

fn parse_encoding(name: &str, value: &str) -> Result<StorageEncoding, ApiError> {
    value.parse::<StorageEncoding>().map_err(|_| {
        ApiError::bad_request(format!("{name} must be one of: identity, raw, gzip, zstd"))
    })
}

fn decode_transfer_bytes(bytes: Bytes, encoding: StorageEncoding) -> Result<Bytes, ApiError> {
    decode_transfer_bytes_with_limit(bytes, encoding, crate::app::MAX_REPLAY_UPLOAD_BYTES)
}

fn decode_transfer_bytes_with_limit(
    bytes: Bytes,
    encoding: StorageEncoding,
    decoded_limit: usize,
) -> Result<Bytes, ApiError> {
    decode_bytes_with_limit(&bytes, encoding, decoded_limit).map_err(|error| {
        ApiError::bad_request(format!("failed to decode {encoding} upload: {error}"))
    })
}

fn encode_transfer_bytes(bytes: Bytes, encoding: StorageEncoding) -> Result<Bytes, ApiError> {
    encode_bytes(&bytes, encoding).map_err(ApiError::internal)
}

fn replay_download_content_type(encoding: StorageEncoding) -> &'static str {
    match encoding {
        StorageEncoding::Identity => "application/vnd.rocketleague.replay",
        StorageEncoding::Gzip => "application/gzip",
        StorageEncoding::Zstd => "application/zstd",
    }
}

fn normalize_uploaded_file_name(name: &str, upload_encoding: StorageEncoding) -> String {
    if upload_encoding.compressed() {
        strip_encoding_extension(name, upload_encoding).to_owned()
    } else {
        name.to_owned()
    }
}

fn encoded_file_name(name: &str, encoding: StorageEncoding) -> String {
    let extension = encoding.extension();
    if extension.is_empty() || name.to_ascii_lowercase().ends_with(extension) {
        name.to_owned()
    } else {
        format!("{name}{extension}")
    }
}

fn strip_encoding_extension(name: &str, encoding: StorageEncoding) -> &str {
    let extension = encoding.extension();
    if extension.is_empty() {
        return name;
    }

    let lower_name = name.to_ascii_lowercase();
    if lower_name.ends_with(extension) {
        &name[..name.len() - extension.len()]
    } else {
        name
    }
}

struct StaticAsset {
    content_type: &'static str,
    bytes: &'static [u8],
}

include!(concat!(env!("OUT_DIR"), "/subtr_actor_static_assets.rs"));

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct ReprocessReplayQuery {
    /// Re-run analysis even when the replay's canonical run is already up to date.
    #[serde(default)]
    pub force: bool,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReprocessReplayResponse {
    pub replay_id: Uuid,
    /// Whether a new processing job was enqueued. False when `force` was not set
    /// and the replay was already up to date.
    pub enqueued: bool,
    /// Echoes whether the reprocess was forced.
    pub forced: bool,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct SetReplayRanksResponse {
    pub replay_id: Uuid,
    /// Number of player ranks persisted to the durable submissions store.
    pub submitted: u64,
    /// Number of `replay_players` rows matched and updated with a rank.
    pub matched: u64,
}

#[utoipa::path(
    post,
    path = "/api/v1/replays/{replay_id}/reprocess",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "The replay to reprocess"),
        ReprocessReplayQuery,
    ),
    responses(
        (status = 200, description = "Replay reprocessing enqueued", body = ReprocessReplayResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not have permission to reprocess this replay"),
        (status = 404, description = "Replay not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn reprocess_replay(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
    Query(query): Query<ReprocessReplayQuery>,
) -> Result<Json<ReprocessReplayResponse>, ApiError> {
    let db = require_db(&state)?;

    let uploaded_by = sqlx::query_scalar::<_, Option<Uuid>>(
        "SELECT uploaded_by_user_id FROM replays WHERE id = $1",
    )
    .bind(replay_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    let is_owner = uploaded_by == Some(auth_user.id);
    if !is_owner {
        let is_admin = crate::auth::resolve_is_admin(db, &auth_user, &state.admin_emails)
            .await
            .map_err(ApiError::internal)?;
        if !is_admin {
            return Err(ApiError::new(
                StatusCode::FORBIDDEN,
                "you do not have permission to reprocess this replay",
            ));
        }
    }

    let summary = enqueue_replay_reprocessing(
        db.clone(),
        state.storage.clone(),
        state.background_processing_permits.clone(),
        ReplayReprocessOptions {
            replay_ids: vec![replay_id],
            force: query.force,
            concurrency: 1,
        },
    )
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(ReprocessReplayResponse {
        replay_id,
        enqueued: summary.enqueued_replays > 0,
        forced: query.force,
    }))
}

/// Body for a client-side reprocess: the browser ran subtr-actor WASM to produce
/// the stats-timeline scaffold JSON and uploads it here for the server to persist
/// as a new canonical analysis run (no server-side subtr-actor re-run).
#[derive(Debug, Deserialize, ToSchema)]
pub struct ReprocessReplayClientRequest {
    /// The subtr-actor git sha the browser ran. Version-gated against the
    /// server's build to reject stale clients.
    pub subtr_actor_git_sha: String,
    /// The full `ReplayStatsTimelineScaffold` serialized to JSON.
    #[schema(value_type = Object)]
    pub scaffold: serde_json::Value,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReprocessReplayClientResponse {
    pub replay_id: Uuid,
    /// The new canonical analysis run created from the uploaded scaffold.
    pub analysis_run_id: Uuid,
    /// Replay processing status after persisting (`processed`).
    pub status: String,
}

#[utoipa::path(
    post,
    path = "/api/v1/replays/{replay_id}/reprocess/client",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "The replay to reprocess client-side"),
    ),
    request_body = ReprocessReplayClientRequest,
    responses(
        (status = 200, description = "Client scaffold persisted as new canonical run", body = ReprocessReplayClientResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not have permission to reprocess this replay"),
        (status = 404, description = "Replay not found"),
        (status = 409, description = "Stale client: subtr-actor version mismatch"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn reprocess_replay_client(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
    Json(request): Json<ReprocessReplayClientRequest>,
) -> Result<Json<ReprocessReplayClientResponse>, ApiError> {
    let db = require_db(&state)?;

    // Resolve owner + the input file sha for the new analysis run in one fetch.
    let row = sqlx::query("SELECT uploaded_by_user_id, file_sha256 FROM replays WHERE id = $1")
        .bind(replay_id)
        .fetch_optional(db)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    let uploaded_by: Option<Uuid> = row
        .try_get("uploaded_by_user_id")
        .map_err(ApiError::internal)?;
    let file_sha256: String = row.try_get("file_sha256").map_err(ApiError::internal)?;

    let is_owner = uploaded_by == Some(auth_user.id);
    if !is_owner {
        let is_admin = crate::auth::resolve_is_admin(db, &auth_user, &state.admin_emails)
            .await
            .map_err(ApiError::internal)?;
        if !is_admin {
            return Err(ApiError::new(
                StatusCode::FORBIDDEN,
                "you do not have permission to reprocess this replay",
            ));
        }
    }

    // Version gate: reject a stale client whose subtr-actor build differs from
    // the server's. Skipped on dev builds where the server sha is unknown.
    if let Some(server_sha) = option_env!("SUBTR_ACTOR_GIT_SHA") {
        if server_sha != request.subtr_actor_git_sha {
            return Err(ApiError::new(
                StatusCode::CONFLICT,
                "stale client: refresh the page (subtr-actor version mismatch)",
            ));
        }
    }

    let analysis_run_id = process_client_scaffold(
        db,
        &state.storage,
        replay_id,
        &file_sha256,
        auth_user.id,
        &request.subtr_actor_git_sha,
        request.scaffold,
    )
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(ReprocessReplayClientResponse {
        replay_id,
        analysis_run_id,
        status: "processed".to_owned(),
    }))
}

#[utoipa::path(
    post,
    path = "/api/v1/replays/{replay_id}/ranks",
    tag = "replays",
    params(
        ("replay_id" = Uuid, Path, description = "The replay to attach ranks to"),
    ),
    request_body = RankSubmission,
    responses(
        (status = 200, description = "Ranks ingested", body = SetReplayRanksResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "You do not have permission to set ranks for this replay"),
        (status = 404, description = "Replay not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn set_replay_ranks(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
    Json(submission): Json<RankSubmission>,
) -> Result<Json<SetReplayRanksResponse>, ApiError> {
    let db = require_db(&state)?;

    let uploaded_by = sqlx::query_scalar::<_, Option<Uuid>>(
        "SELECT uploaded_by_user_id FROM replays WHERE id = $1",
    )
    .bind(replay_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    let is_owner = uploaded_by == Some(auth_user.id);
    if !is_owner {
        let is_admin = crate::auth::resolve_is_admin(db, &auth_user, &state.admin_emails)
            .await
            .map_err(ApiError::internal)?;
        if !is_admin {
            return Err(ApiError::new(
                StatusCode::FORBIDDEN,
                "you do not have permission to set ranks for this replay",
            ));
        }
    }

    telemetry::record_rank_submission_received(
        "ranks_endpoint",
        Some(replay_id),
        submission.observability_summary(),
    );
    let summary = ingest_rank_submissions(db, replay_id, &submission)
        .await
        .map_err(ApiError::internal)?;
    telemetry::record_rank_submission_ingested(
        "ranks_endpoint",
        replay_id,
        submission.observability_summary(),
        summary.submitted,
        summary.matched,
    );

    Ok(Json(SetReplayRanksResponse {
        replay_id,
        submitted: summary.submitted,
        matched: summary.matched,
    }))
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
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO UPDATE
        SET primary_email = EXCLUDED.primary_email,
            display_name = COALESCE(users.display_name, EXCLUDED.display_name),
            updated_at = now()
        "#,
    )
    .bind(user.id)
    .bind(&user.email)
    .bind(&user.display_name)
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

async fn load_replay_groups(pool: &PgPool) -> Result<Vec<ReplayGroupResponse>, sqlx::Error> {
    let rows = sqlx::query(replay_group_select_sql("").as_str())
        .fetch_all(pool)
        .await?;

    rows.into_iter().map(replay_group_from_row).collect()
}

async fn load_replay_group(
    pool: &PgPool,
    group_id: Uuid,
) -> Result<Option<ReplayGroupResponse>, sqlx::Error> {
    let sql = replay_group_select_sql("WHERE replay_group.id = $1");
    sqlx::query(sql.as_str())
        .bind(group_id)
        .fetch_optional(pool)
        .await?
        .map(replay_group_from_row)
        .transpose()
}

async fn require_replay_group(pool: &PgPool, group_id: Uuid) -> Result<(), ApiError> {
    let exists: bool =
        sqlx::query_scalar("SELECT EXISTS (SELECT 1 FROM replay_groups WHERE id = $1)")
            .bind(group_id)
            .fetch_one(pool)
            .await
            .map_err(ApiError::internal)?;
    if exists {
        Ok(())
    } else {
        Err(ApiError::new(
            StatusCode::NOT_FOUND,
            "replay group not found",
        ))
    }
}

async fn require_replay_group_manager(
    state: &AppState,
    pool: &PgPool,
    group_id: Uuid,
    auth_user: &AuthUser,
) -> Result<(), ApiError> {
    let created_by_user_id: Option<Uuid> =
        sqlx::query_scalar("SELECT created_by_user_id FROM replay_groups WHERE id = $1")
            .bind(group_id)
            .fetch_optional(pool)
            .await
            .map_err(ApiError::internal)?
            .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay group not found"))?;

    if created_by_user_id == Some(auth_user.id) {
        return Ok(());
    }

    // Co-managers added to replay_group_managers have the same (flat) rights as
    // the creator. The creator is never stored there, so they cannot be removed.
    let is_manager: bool = sqlx::query_scalar(
        "SELECT EXISTS (SELECT 1 FROM replay_group_managers WHERE group_id = $1 AND user_id = $2)",
    )
    .bind(group_id)
    .bind(auth_user.id)
    .fetch_one(pool)
    .await
    .map_err(ApiError::internal)?;
    if is_manager {
        return Ok(());
    }

    let is_admin = crate::auth::resolve_is_admin(pool, auth_user, &state.admin_emails)
        .await
        .map_err(ApiError::internal)?;
    if is_admin {
        Ok(())
    } else {
        Err(ApiError::new(
            StatusCode::FORBIDDEN,
            "you do not have permission to modify this replay group",
        ))
    }
}

/// Return everyone who can administer the group: the creator (`is_creator =
/// true`, listed first) followed by any invited co-managers, alphabetised by
/// display name then email.
async fn load_replay_group_managers(
    pool: &PgPool,
    group_id: Uuid,
) -> Result<Vec<ReplayGroupManagerResponse>, sqlx::Error> {
    let rows = sqlx::query(
        r#"
        SELECT
            u.id AS user_id,
            u.primary_email AS email,
            u.display_name AS display_name,
            (u.id = g.created_by_user_id) AS is_creator,
            m.added_by_user_id AS added_by_user_id,
            COALESCE(m.created_at, g.created_at) AS created_at
        FROM replay_groups g
        JOIN users u
          ON u.id = g.created_by_user_id
          OR u.id IN (
              SELECT user_id FROM replay_group_managers WHERE group_id = g.id
          )
        LEFT JOIN replay_group_managers m
          ON m.group_id = g.id AND m.user_id = u.id
        WHERE g.id = $1
        ORDER BY is_creator DESC, u.display_name NULLS LAST, u.primary_email NULLS LAST
        "#,
    )
    .bind(group_id)
    .fetch_all(pool)
    .await?;

    rows.into_iter()
        .map(|row| {
            Ok(ReplayGroupManagerResponse {
                user_id: row.try_get("user_id")?,
                email: row.try_get("email")?,
                display_name: row.try_get("display_name")?,
                is_creator: row.try_get("is_creator")?,
                added_by_user_id: row.try_get("added_by_user_id")?,
                created_at: row.try_get("created_at")?,
            })
        })
        .collect()
}

/// Resolve the user named in an add-manager request to an existing user id.
/// Exactly one of `user_id` / `email` must be supplied; the user must already
/// exist (we cannot grant rights to someone who has never signed in).
async fn resolve_manager_target_user(
    pool: &PgPool,
    request: &AddReplayGroupManagerRequest,
) -> Result<Uuid, ApiError> {
    let email = request
        .email
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty());

    match (request.user_id, email) {
        (Some(_), Some(_)) => Err(ApiError::bad_request(
            "provide either user_id or email, not both",
        )),
        (None, None) => Err(ApiError::bad_request(
            "a manager must be identified by user_id or email",
        )),
        (Some(user_id), None) => {
            let exists: bool =
                sqlx::query_scalar("SELECT EXISTS (SELECT 1 FROM users WHERE id = $1)")
                    .bind(user_id)
                    .fetch_one(pool)
                    .await
                    .map_err(ApiError::internal)?;
            if exists {
                Ok(user_id)
            } else {
                Err(ApiError::new(StatusCode::NOT_FOUND, "no such user"))
            }
        }
        (None, Some(email)) => {
            let user_id: Option<Uuid> =
                sqlx::query_scalar("SELECT id FROM users WHERE lower(primary_email) = lower($1)")
                    .bind(email)
                    .fetch_optional(pool)
                    .await
                    .map_err(ApiError::internal)?;
            user_id.ok_or_else(|| {
                ApiError::new(
                    StatusCode::NOT_FOUND,
                    "no user with that email has signed in yet",
                )
            })
        }
    }
}

async fn count_replay_group_replays(pool: &PgPool, group_id: Uuid) -> Result<u64, sqlx::Error> {
    let total: i64 = sqlx::query_scalar(
        r#"
        SELECT COUNT(*)
        FROM replay_group_replays
        WHERE group_id = $1
        "#,
    )
    .bind(group_id)
    .fetch_one(pool)
    .await?;

    Ok(total.max(0) as u64)
}

async fn load_replay_group_replays(
    pool: &PgPool,
    group_id: Uuid,
) -> Result<Vec<ReplayResponse>, sqlx::Error> {
    let sql = replay_select_sql(
        r#"
        JOIN replay_group_replays group_replay
          ON group_replay.replay_id = r.id
        WHERE group_replay.group_id = $1
        ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC
        "#,
    );

    let rows = sqlx::query(sql.as_str())
        .bind(group_id)
        .fetch_all(pool)
        .await?;

    rows.into_iter().map(replay_from_row).collect()
}

async fn resolve_replay_group_update_replays(
    pool: &PgPool,
    request: &ReplayGroupReplayUpdateRequest,
) -> Result<Vec<Uuid>, ApiError> {
    let file_sha256s = request
        .file_sha256s
        .iter()
        .map(|sha256| normalize_sha256_hex(sha256))
        .collect::<Result<Vec<_>, _>>()?;
    if request.replay_ids.is_empty() && file_sha256s.is_empty() {
        return Err(ApiError::bad_request(
            "replay group update must include at least one replay id or sha256",
        ));
    }

    let rows = sqlx::query(
        r#"
        SELECT id
        FROM replays
        WHERE id = ANY($1)
           OR file_sha256 = ANY($2)
        "#,
    )
    .bind(&request.replay_ids)
    .bind(&file_sha256s)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;
    let mut replay_ids = rows
        .into_iter()
        .map(|row| row.try_get("id"))
        .collect::<Result<Vec<Uuid>, _>>()
        .map_err(ApiError::internal)?;
    replay_ids.sort();
    replay_ids.dedup();

    Ok(replay_ids)
}

fn validate_replay_group_name(value: &str) -> Result<String, ApiError> {
    let name = value.trim();
    if name.is_empty() {
        return Err(ApiError::bad_request("replay group name must not be empty"));
    }

    Ok(name.to_owned())
}

fn replay_group_select_sql(where_clause: &str) -> String {
    format!(
        r#"
        SELECT
            replay_group.id,
            replay_group.project_id,
            replay_group.name,
            replay_group.description,
            replay_group.created_by_user_id,
            COALESCE(replay_counts.replay_count, 0) AS replay_count,
            replay_group.created_at,
            replay_group.updated_at
        FROM replay_groups replay_group
        LEFT JOIN LATERAL (
            SELECT COUNT(*) AS replay_count
            FROM replay_group_replays group_replay
            WHERE group_replay.group_id = replay_group.id
        ) replay_counts ON TRUE
        {where_clause}
        ORDER BY replay_group.updated_at DESC, replay_group.created_at DESC, replay_group.name
        "#
    )
}

fn replay_group_from_row(row: sqlx::postgres::PgRow) -> Result<ReplayGroupResponse, sqlx::Error> {
    let replay_count: i64 = row.try_get("replay_count")?;

    Ok(ReplayGroupResponse {
        id: row.try_get("id")?,
        project_id: row.try_get("project_id")?,
        name: row.try_get("name")?,
        description: row.try_get("description")?,
        created_by_user_id: row.try_get("created_by_user_id")?,
        replay_count: replay_count.max(0) as u64,
        created_at: row.try_get("created_at")?,
        updated_at: row.try_get("updated_at")?,
    })
}

async fn maybe_enqueue_replay_processing(
    state: &AppState,
    db: &PgPool,
    replay: &ReplayResponse,
) -> Result<(), ApiError> {
    if state.process_replays_in_background
        && matches!(&replay.status, ReplayStatus::Pending | ReplayStatus::Failed)
    {
        enqueue_replay_processing_job(db, replay.id)
            .await
            .map_err(ApiError::internal)?;
    }
    Ok(())
}

async fn insert_replay_metadata(
    pool: &PgPool,
    metadata: NewReplayMetadata<'_>,
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
                storage_key,
                storage_encoding,
                storage_byte_size
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
    .bind(metadata.replay_id)
    .bind(metadata.uploaded_by_user_id)
    .bind(metadata.file_sha256)
    .bind(metadata.original_file_name)
    .bind(metadata.byte_size as i64)
    .bind(metadata.storage_key)
    .bind(metadata.storage_encoding.as_str())
    .bind(metadata.storage_byte_size as i64)
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
    let mut builder = find_replays_query(filters);
    let rows = builder.build().fetch_all(pool).await?;
    rows.into_iter().map(replay_from_row).collect()
}

fn find_replays_query<'args>(filters: &'args ReplayFilters) -> QueryBuilder<'args, Postgres> {
    let mut builder =
        QueryBuilder::<Postgres>::new("WITH filtered_replays AS (SELECT r.id FROM replays r");
    append_replay_filters(&mut builder, filters);
    builder
        .push(" ORDER BY ")
        .push(filters.sort_by.sql())
        .push(" ")
        .push(filters.sort_dir.sql())
        .push(filters.sort_by.nulls_sql())
        .push(", r.id ")
        .push(filters.sort_dir.sql())
        .push(" LIMIT ")
        .push_bind(filters.count as i64)
        .push(" OFFSET ")
        .push_bind(filters.offset as i64)
        .push(") ")
        .push(replay_select_sql(
            "JOIN filtered_replays filtered_replay ON filtered_replay.id = r.id",
        ))
        .push(" ORDER BY ")
        .push(filters.sort_by.sql())
        .push(" ")
        .push(filters.sort_dir.sql())
        .push(filters.sort_by.nulls_sql())
        .push(", r.id ")
        .push(filters.sort_dir.sql());

    builder
}

#[derive(Clone, Copy)]
enum ReplayFilterOptionKind {
    Map,
    Season,
}

impl ReplayFilterOptionKind {
    fn sql(self) -> &'static str {
        match self {
            Self::Map => {
                r#"
                SELECT map_code AS value, count(*) AS replay_count
                FROM replays
                WHERE map_code IS NOT NULL AND btrim(map_code) <> ''
                GROUP BY map_code
                ORDER BY replay_count DESC, map_code ASC
                LIMIT 500
                "#
            }
            Self::Season => {
                r#"
                SELECT season AS value, count(*) AS replay_count
                FROM replays
                WHERE season IS NOT NULL AND btrim(season) <> ''
                GROUP BY season
                ORDER BY replay_count DESC, season ASC
                LIMIT 200
                "#
            }
        }
    }
}

async fn load_replay_filter_options(
    pool: &PgPool,
    kind: ReplayFilterOptionKind,
) -> Result<Vec<ReplayFilterOptionResponse>, sqlx::Error> {
    let rows = sqlx::query(kind.sql()).fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| {
            let value: String = row.try_get("value")?;
            let count: i64 = row.try_get("replay_count")?;
            Ok(ReplayFilterOptionResponse {
                label: value.clone(),
                value,
                count: count.max(0) as u64,
            })
        })
        .collect()
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
            .push(" ESCAPE '\\' OR r.map_code ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR r.match_guid ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR EXISTS (SELECT 1 FROM replay_players WHERE replay_players.replay_id = r.id AND replay_players.name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\'))");
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

    if !filters.seasons.is_empty() {
        builder
            .push(" AND r.season = ANY(")
            .push_bind(&filters.seasons)
            .push(")");
    }

    if !filters.maps.is_empty() {
        builder
            .push(" AND r.map_code = ANY(")
            .push_bind(&filters.maps)
            .push(")");
    }

    if filters.min_rank_tier.is_some() || filters.max_rank_tier.is_some() {
        builder.push(
            " AND EXISTS (SELECT 1 FROM replay_players rank_player WHERE rank_player.replay_id = r.id AND rank_player.rank_tier IS NOT NULL",
        );
        if let Some(min_rank_tier) = filters.min_rank_tier {
            builder
                .push(" AND rank_player.rank_tier >= ")
                .push_bind(min_rank_tier);
        }
        if let Some(max_rank_tier) = filters.max_rank_tier {
            builder
                .push(" AND rank_player.rank_tier <= ")
                .push_bind(max_rank_tier);
        }
        builder.push(")");
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

    if let Some(group_id) = filters.group_id {
        builder.push(
            " AND EXISTS (SELECT 1 FROM replay_group_replays list_group WHERE list_group.replay_id = r.id AND list_group.group_id = ",
        );
        builder.push_bind(group_id);
        builder.push(")");
    }

    if let Some(project_id) = filters.project_id {
        builder.push(" AND r.project_id = ").push_bind(project_id);
    }

    if let Some(status) = &filters.status {
        builder
            .push(" AND r.processing_status = ")
            .push_bind(status);
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
            (
                -- earliest-linked provider; array_agg+subscript avoids a LIMIT
                -- so the page-query's single LIMIT/OFFSET invariant still holds
                SELECT (array_agg(
                    ai.provider_name
                    ORDER BY ai.created_at, ai.provider_name, ai.subject
                ))[1]
                FROM auth_identities ai
                WHERE ai.user_id = uploader.id
            ) AS uploader_provider,
            r.storage_key,
            r.external_replay_id,
            r.playlist,
            r.replay_game_type,
            r.header_match_type,
            r.game_playlist_id,
            r.match_type_class,
            r.map_code,
            r.replay_date,
            r.season,
            r.duration_seconds,
            r.overtime_seconds,
            r.team_zero_score,
            r.team_one_score,
            r.match_guid,
            r.has_pro_player,
            COALESCE(players.players, '[]'::jsonb) AS players,
            r.processed_at,
            r.processed_with_extractor_name,
            r.processed_with_extractor_version,
            r.processed_with_event_stream_schema_version,
            r.processed_with_rocket_sense_git_sha,
            r.processed_with_subtr_actor_version,
            r.processed_with_subtr_actor_git_sha,
            r.processing_status,
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
                    'rank_tier', COALESCE(player.rank_tier, rank_fallback.tier),
                    'rank_division', CASE WHEN player.rank_tier IS NULL THEN rank_fallback.division ELSE player.rank_division END,
                    'rank_mmr', CASE WHEN player.rank_tier IS NULL THEN rank_fallback.mmr ELSE player.rank_mmr END,
                    'rank_is_fallback', player.rank_tier IS NULL AND rank_fallback.tier IS NOT NULL,
                    'rank_fallback_replay_date', CASE WHEN player.rank_tier IS NULL THEN rank_fallback.replay_date END,
                    'is_pro', player.is_pro,
                    'score', player.score,
                    'goals', player.goals,
                    'assists', player.assists,
                    'saves', player.saves,
                    'shots', player.shots,
                    'active_time_seconds', player.active_time_seconds,
                    'time_demolished_seconds', player.time_demolished_seconds,
                    'non_demo_active_time_seconds',
                        GREATEST(player.active_time_seconds - COALESCE(player.time_demolished_seconds, 0.0), 0.0),
                    'time_most_back_seconds', player.time_most_back_seconds,
                    'time_most_forward_seconds', player.time_most_forward_seconds
                )
                ORDER BY player.team NULLS LAST, player.name NULLS LAST
            ) AS players
            FROM replay_players player
            -- Fallback rank for players with no submission on this replay:
            -- the same player's nearest submission on another replay,
            -- preferring the same playlist, then the closest match at or
            -- before this one, then the closest after. Display-only — rank
            -- filters keep matching the directly submitted columns.
            LEFT JOIN LATERAL (
                SELECT s.tier, s.division, s.mmr,
                       COALESCE(r2.replay_date, r2.created_at) AS replay_date
                FROM replay_player_rank_submissions s
                JOIN replays r2 ON r2.id = s.replay_id
                WHERE player.rank_tier IS NULL
                  AND s.platform_player_id = player.platform_player_id
                  AND s.tier IS NOT NULL
                  AND s.valid IS DISTINCT FROM FALSE
                ORDER BY
                    (s.playlist IS NOT DISTINCT FROM r.game_playlist_id) DESC,
                    (COALESCE(r2.replay_date, r2.created_at)
                        <= COALESCE(r.replay_date, r.created_at)) DESC,
                    CASE WHEN COALESCE(r2.replay_date, r2.created_at)
                              <= COALESCE(r.replay_date, r.created_at)
                         THEN COALESCE(r2.replay_date, r2.created_at) END DESC,
                    COALESCE(r2.replay_date, r2.created_at) ASC
                FETCH FIRST 1 ROW ONLY
            ) rank_fallback ON TRUE
            WHERE player.replay_id = r.id
        ) players ON TRUE
        {where_clause}
        "#
    )
}

pub(super) fn replay_from_row(row: sqlx::postgres::PgRow) -> Result<ReplayResponse, sqlx::Error> {
    let byte_size: i64 = row.try_get("byte_size")?;
    let processing_status: String = row.try_get("processing_status")?;
    let players = replay_players_from_row(&row)?;
    let summary = ReplaySummaryResponse {
        season: row.try_get("season").unwrap_or(None),
        duration_seconds: optional_seconds_to_u32(row.try_get("duration_seconds").unwrap_or(None)),
        overtime_seconds: optional_seconds_to_u32(row.try_get("overtime_seconds").unwrap_or(None)),
        match_guid: row.try_get("match_guid").unwrap_or(None),
        team_scores: ReplayTeamScoresResponse {
            blue: row.try_get("team_zero_score").unwrap_or(None),
            orange: row.try_get("team_one_score").unwrap_or(None),
        },
    };
    let playlist = row.try_get::<Option<String>, _>("playlist")?;
    let game_type = ReplayGameTypeResponse {
        replay_game_type: row.try_get("replay_game_type").unwrap_or(None),
        header_match_type: row.try_get("header_match_type").unwrap_or(None),
        game_playlist_id: row.try_get("game_playlist_id").unwrap_or(None),
        match_type_class: row.try_get("match_type_class").unwrap_or(None),
    };
    let map_code = row.try_get::<Option<String>, _>("map_code")?;
    let replay_date = row.try_get::<Option<DateTime<Utc>>, _>("replay_date")?;
    let processing_version = ReplayProcessingVersionResponse {
        processed_at: row.try_get("processed_at").unwrap_or(None),
        extractor_name: row.try_get("processed_with_extractor_name").unwrap_or(None),
        extractor_version: row
            .try_get("processed_with_extractor_version")
            .unwrap_or(None),
        event_stream_schema_version: row
            .try_get("processed_with_event_stream_schema_version")
            .unwrap_or(None),
        rocket_sense_git_sha: row
            .try_get("processed_with_rocket_sense_git_sha")
            .unwrap_or(None),
        subtr_actor_version: row
            .try_get("processed_with_subtr_actor_version")
            .unwrap_or(None),
        subtr_actor_git_sha: row
            .try_get("processed_with_subtr_actor_git_sha")
            .unwrap_or(None),
    };
    let current_version = crate::processing::current_processing_version();
    let staleness_info = crate::processing::replay_staleness(
        processing_version.event_stream_schema_version.as_deref(),
        processing_version.subtr_actor_version.as_deref(),
        processing_version.subtr_actor_git_sha.as_deref(),
    );
    let staleness = ReplayStalenessResponse {
        is_stale: staleness_info.is_stale,
        schema_outdated: staleness_info.schema_outdated,
        subtr_actor_outdated: staleness_info.subtr_actor_outdated,
        current_event_stream_schema_version: current_version
            .event_stream_schema_version
            .to_string(),
        current_subtr_actor_version: current_version.subtr_actor_version.to_string(),
        current_subtr_actor_git_sha: current_version.subtr_actor_git_sha.map(str::to_string),
        current_rocket_sense_git_sha: current_version.rocket_sense_git_sha.map(str::to_string),
    };
    let uploaded_by = row
        .try_get::<Option<Uuid>, _>("uploader_id")?
        .map(|id| -> Result<ReplayUploaderResponse, sqlx::Error> {
            Ok(ReplayUploaderResponse {
                id,
                primary_email: row.try_get("uploader_primary_email")?,
                display_name: row.try_get("uploader_display_name")?,
                provider: row.try_get("uploader_provider")?,
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
        playlist: playlist.clone(),
        playlist_metadata: playlist_metadata(playlist.as_deref(), game_type),
        map_code,
        replay_date,
        has_pro_player: row.try_get("has_pro_player")?,
        players,
        summary,
        processing_version,
        staleness,
        status: ReplayStatus::from_db(processing_status),
        created_at: row.try_get("created_at")?,
        updated_at: row.try_get("updated_at")?,
    })
}

fn replay_players_from_row(
    row: &sqlx::postgres::PgRow,
) -> Result<Vec<ReplayPlayerResponse>, sqlx::Error> {
    let SqlxJson(players): SqlxJson<Vec<ReplayPlayerResponse>> = row.try_get("players")?;
    Ok(players)
}

fn optional_seconds_to_u32(value: Option<f64>) -> Option<u32> {
    value
        .filter(|seconds| seconds.is_finite() && *seconds >= 0.0)
        .map(|seconds| seconds.round().min(f64::from(u32::MAX)) as u32)
}

fn playlist_metadata(
    playlist: Option<&str>,
    game_type: ReplayGameTypeResponse,
) -> ReplayPlaylistResponse {
    let Some(playlist) = playlist
        .map(str::trim)
        .filter(|playlist| !playlist.is_empty())
    else {
        return ReplayPlaylistResponse {
            replay_game_type: game_type.replay_game_type,
            header_match_type: game_type.header_match_type,
            game_playlist_id: game_type.game_playlist_id,
            match_type_class: game_type.match_type_class,
            ..ReplayPlaylistResponse::default()
        };
    };
    let key = playlist
        .to_ascii_lowercase()
        .replace(['_', ' '], "-")
        .split('-')
        .filter(|part| !part.is_empty())
        .collect::<Vec<_>>()
        .join("-");
    let descriptor = playlist_descriptor(&key);
    ReplayPlaylistResponse {
        id: Some(key),
        label: Some(
            descriptor
                .map(|descriptor| descriptor.label)
                .map(str::to_owned)
                .unwrap_or_else(|| humanize_playlist(playlist)),
        ),
        category: descriptor.and_then(|descriptor| descriptor.category.map(str::to_owned)),
        ruleset: descriptor.and_then(|descriptor| descriptor.ruleset.map(str::to_owned)),
        team_size: descriptor.and_then(|descriptor| descriptor.team_size),
        ranked: descriptor.and_then(|descriptor| descriptor.ranked),
        casual: descriptor.and_then(|descriptor| descriptor.casual),
        soccar: descriptor.and_then(|descriptor| descriptor.soccar),
        replay_game_type: game_type.replay_game_type,
        header_match_type: game_type.header_match_type,
        game_playlist_id: game_type.game_playlist_id,
        match_type_class: game_type.match_type_class,
    }
}

#[derive(Debug, Clone, Copy)]
struct PlaylistDescriptor {
    label: &'static str,
    category: Option<&'static str>,
    ruleset: Option<&'static str>,
    team_size: Option<i32>,
    ranked: Option<bool>,
    casual: Option<bool>,
    soccar: Option<bool>,
}

fn playlist_descriptor(key: &str) -> Option<PlaylistDescriptor> {
    let descriptor = match key {
        "unranked-duels" | "casual-duels" => soccar_playlist("Casual Soccar Duel", "casual", 1),
        "unranked-doubles" | "casual-doubles" => {
            soccar_playlist("Casual Soccar Doubles", "casual", 2)
        }
        "unranked-standard" | "casual-standard" => {
            soccar_playlist("Casual Soccar Standard", "casual", 3)
        }
        "unranked-chaos" | "casual-chaos" => soccar_playlist("Casual Soccar Chaos", "casual", 4),
        "ranked-duels" | "ranked-duel" => soccar_playlist("Ranked Soccar Duel", "ranked", 1),
        "ranked-doubles" => soccar_playlist("Ranked Soccar Doubles", "ranked", 2),
        "ranked-solo-standard" => soccar_playlist("Ranked Soccar Solo Standard", "ranked", 3),
        "ranked-standard" => soccar_playlist("Ranked Soccar Standard", "ranked", 3),
        "online-1v1" => online_soccar_playlist("Online Soccar 1v1", 1),
        "online-2v2" => online_soccar_playlist("Online Soccar 2v2", 2),
        "online-3v3" => online_soccar_playlist("Online Soccar 3v3", 3),
        "online-4v4" => online_soccar_playlist("Online Soccar 4v4", 4),
        "private" => playlist(
            "Private Match",
            Some("private"),
            None,
            None,
            None,
            None,
            None,
        ),
        "season" => playlist(
            "Season",
            Some("offline"),
            Some("soccar"),
            None,
            None,
            None,
            Some(true),
        ),
        "offline" => playlist("Offline", Some("offline"), None, None, None, None, None),
        "lan" => playlist("LAN", Some("lan"), None, None, None, None, None),
        "tournament" => playlist(
            "Tournament",
            Some("tournament"),
            None,
            None,
            None,
            None,
            None,
        ),
        "ranked-hoops" | "hoops" => extra_playlist("Ranked Hoops", "hoops", Some(true)),
        "ranked-rumble" | "rumble" => extra_playlist("Ranked Rumble", "rumble", Some(true)),
        "ranked-dropshot" | "dropshot" => extra_playlist("Ranked Dropshot", "dropshot", Some(true)),
        "ranked-snowday" | "ranked-snow-day" | "snowday" | "snow-day" => {
            extra_playlist("Ranked Snow Day", "snow_day", Some(true))
        }
        "rocketlabs" | "rocket-labs" => extra_playlist("Rocket Labs", "soccar", None),
        "dropshot-rumble" => extra_playlist("Dropshot Rumble", "dropshot_rumble", None),
        "heatseeker" => extra_playlist("Heatseeker", "heatseeker", None),
        "online" => playlist("Online", Some("online"), None, None, None, None, None),
        _ => return None,
    };
    Some(descriptor)
}

fn soccar_playlist(
    label: &'static str,
    category: &'static str,
    team_size: i32,
) -> PlaylistDescriptor {
    playlist(
        label,
        Some(category),
        Some("soccar"),
        Some(team_size),
        Some(category == "ranked"),
        Some(category == "casual"),
        Some(true),
    )
}

fn online_soccar_playlist(label: &'static str, team_size: i32) -> PlaylistDescriptor {
    playlist(
        label,
        Some("online"),
        Some("soccar"),
        Some(team_size),
        None,
        None,
        Some(true),
    )
}

fn extra_playlist(
    label: &'static str,
    ruleset: &'static str,
    ranked: Option<bool>,
) -> PlaylistDescriptor {
    playlist(
        label,
        Some("extra"),
        Some(ruleset),
        None,
        ranked,
        ranked.map(|ranked| !ranked),
        Some(ruleset == "soccar"),
    )
}

fn playlist(
    label: &'static str,
    category: Option<&'static str>,
    ruleset: Option<&'static str>,
    team_size: Option<i32>,
    ranked: Option<bool>,
    casual: Option<bool>,
    soccar: Option<bool>,
) -> PlaylistDescriptor {
    PlaylistDescriptor {
        label,
        category,
        ruleset,
        team_size,
        ranked,
        casual,
        soccar,
    }
}

fn humanize_playlist(value: &str) -> String {
    value
        .replace(['_', '-'], " ")
        .split_whitespace()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                Some(first) => first
                    .to_uppercase()
                    .chain(chars.flat_map(char::to_lowercase))
                    .collect(),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

// SUBTR_ACTOR_{VIEWER,STATS,REVIEW}_INDEX — the SPA entry HTML, generated by
// build.rs from the subtr-actor static tree (ROCKET_SENSE_SUBTR_STATIC flake
// output in Nix, on-disk static/subtr-actor otherwise) so the source tree need
// not commit the generated assets.
include!(concat!(env!("OUT_DIR"), "/subtr_actor_index_html.rs"));
