use crate::{
    app::AppState,
    auth::AuthUser,
    processing::{
        enqueue_profile_timing_backfill, enqueue_replay_reprocessing, gc_superseded_event_streams,
        ReplayProfileTimingBackfillOptions, ReplayReprocessOptions,
    },
};
use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Row};
use utoipa::ToSchema;
use uuid::Uuid;

const REPLAY_PROCESSING_QUEUE_NAME: &str = "rocket-sense:replay-processing";
const DEFAULT_DIAGNOSTIC_COUNT: u32 = 100;
const MAX_DIAGNOSTIC_COUNT: u32 = 500;

pub fn router() -> Router<AppState> {
    Router::new()
        .route(
            "/admin/replays/processing-diagnostics",
            get(list_replay_processing_diagnostics),
        )
        .route("/admin/replays/reprocess", post(reprocess_replays))
        .route(
            "/admin/replays/backfill-profile-timing",
            post(backfill_profile_timing),
        )
        .route(
            "/admin/stats/backfill-event-counts",
            post(backfill_event_counts),
        )
        .route(
            "/admin/stats/backfill-rotation-stints",
            post(backfill_rotation_stints),
        )
        .route(
            "/admin/stats/backfill-positioning",
            post(backfill_positioning),
        )
        .route("/admin/storage/gc-event-streams", post(gc_event_streams))
        .route("/admin/users", get(list_users))
        .route("/admin/users/{user_id}/admin", post(set_user_admin))
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct ReplayProcessingDiagnosticsQuery {
    pub status: Option<String>,
    #[serde(default)]
    pub include_healthy: bool,
    pub count: Option<u32>,
    pub offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingDiagnosticsResponse {
    pub replays: Vec<ReplayProcessingDiagnosticResponse>,
    pub summary: ReplayProcessingDiagnosticsSummaryResponse,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingDiagnosticsSummaryResponse {
    pub total_replays: u64,
    pub problem_replays: u64,
    pub status_counts: Vec<ReplayProcessingStatusCountResponse>,
    pub queue_counts: Vec<ReplayProcessingQueueCountResponse>,
    pub workers: Vec<ReplayProcessingWorkerResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingWorkerResponse {
    pub id: String,
    pub last_seen: DateTime<Utc>,
    /// Workers heartbeat every 30s; treated as dead after 90s of silence.
    pub alive: bool,
    pub active_jobs: u64,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingStatusCountResponse {
    pub status: String,
    pub count: u64,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingQueueCountResponse {
    pub status: String,
    pub count: u64,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingDiagnosticResponse {
    pub replay_id: Uuid,
    pub original_file_name: Option<String>,
    pub file_sha256: String,
    pub processing_status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub canonical_analysis_run_id: Option<Uuid>,
    pub canonical_analysis_run: Option<AnalysisRunDiagnosticResponse>,
    pub latest_analysis_run: Option<AnalysisRunDiagnosticResponse>,
    pub canonical_event_count: u64,
    pub needs_reanalysis: bool,
    pub needs_reindex: bool,
    pub stale_reasons: Vec<String>,
    pub queued_jobs: u64,
    pub running_jobs: u64,
    pub failed_jobs: u64,
    pub finished_jobs: u64,
    pub next_queue_run_at: Option<DateTime<Utc>>,
    pub last_queue_started_at: Option<DateTime<Utc>>,
    pub last_queue_done_at: Option<DateTime<Utc>>,
    pub last_queue_error: Option<String>,
    pub reasons: Vec<String>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AnalysisRunDiagnosticResponse {
    pub id: Uuid,
    pub status: String,
    pub extractor_name: String,
    pub extractor_version: String,
    pub event_stream_schema_version: Option<String>,
    pub event_stream_object_key: Option<String>,
    pub started_at: DateTime<Utc>,
    pub finished_at: Option<DateTime<Utc>>,
    pub error_message: Option<String>,
}

#[derive(Debug, Default, Deserialize, ToSchema)]
pub struct ReprocessReplaysRequest {
    #[serde(default)]
    pub replay_ids: Vec<Uuid>,
    #[serde(default)]
    pub force: bool,
    pub concurrency: Option<usize>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReprocessReplaysResponse {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Default, Deserialize, ToSchema)]
pub struct BackfillProfileTimingRequest {
    #[serde(default)]
    pub replay_ids: Vec<Uuid>,
    #[serde(default)]
    pub force: bool,
    pub concurrency: Option<usize>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct BackfillProfileTimingResponse {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Default, Deserialize, ToSchema)]
pub struct GcEventStreamsRequest {
    /// Report what would be deleted without touching storage or the database.
    #[serde(default)]
    pub dry_run: bool,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct GcEventStreamsResponse {
    pub matched_objects: u64,
    pub deleted_objects: u64,
    pub reclaimed_storage_bytes: u64,
    pub dry_run: bool,
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/replays/processing-diagnostics",
    tag = "admin",
    params(
        ("status" = Option<String>, Query, description = "Filter by replay processing status"),
        ("include_healthy" = Option<bool>, Query, description = "Include fully processed replays"),
        ("count" = Option<u32>, Query, description = "Page size"),
        ("offset" = Option<u32>, Query, description = "Page offset")
    ),
    responses(
        (status = 200, description = "Replay processing diagnostics", body = ReplayProcessingDiagnosticsResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_replay_processing_diagnostics(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Query(query): Query<ReplayProcessingDiagnosticsQuery>,
) -> Result<Json<ReplayProcessingDiagnosticsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let status = normalized_status_filter(query.status)?;
    let include_healthy = query.include_healthy;
    let count = query
        .count
        .unwrap_or(DEFAULT_DIAGNOSTIC_COUNT)
        .clamp(1, MAX_DIAGNOSTIC_COUNT);
    let offset = query.offset.unwrap_or(0);

    let summary = load_processing_diagnostics_summary(pool).await?;
    let total = load_processing_diagnostics_total(pool, status.as_deref(), include_healthy).await?;
    let replays =
        load_processing_diagnostic_rows(pool, status.as_deref(), include_healthy, count, offset)
            .await?;
    let next_offset = offset
        .checked_add(count)
        .filter(|next_offset| u64::from(*next_offset) < total);

    Ok(Json(ReplayProcessingDiagnosticsResponse {
        replays,
        summary,
        count,
        offset,
        total,
        next_offset,
    }))
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/replays/reprocess",
    tag = "admin",
    request_body = ReprocessReplaysRequest,
    responses(
        (status = 200, description = "Replay reprocessing batch enqueued", body = ReprocessReplaysResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn reprocess_replays(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<ReprocessReplaysRequest>,
) -> Result<Json<ReprocessReplaysResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let summary = enqueue_replay_reprocessing(
        pool.clone(),
        state.storage.clone(),
        state.background_processing_permits.clone(),
        ReplayReprocessOptions {
            replay_ids: request.replay_ids,
            force: request.force,
            concurrency: request.concurrency.unwrap_or(1),
        },
    )
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(ReprocessReplaysResponse {
        matched_replays: summary.matched_replays,
        enqueued_replays: summary.enqueued_replays,
        skipped_replays: summary.skipped_replays,
        concurrency: summary.concurrency,
        force: summary.force,
    }))
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/replays/backfill-profile-timing",
    tag = "admin",
    request_body = BackfillProfileTimingRequest,
    responses(
        (status = 200, description = "Profile timing event backfill batch enqueued", body = BackfillProfileTimingResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn backfill_profile_timing(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<BackfillProfileTimingRequest>,
) -> Result<Json<BackfillProfileTimingResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let summary = enqueue_profile_timing_backfill(
        pool.clone(),
        state.storage.clone(),
        state.background_processing_permits.clone(),
        ReplayProfileTimingBackfillOptions {
            replay_ids: request.replay_ids,
            force: request.force,
            concurrency: request.concurrency.unwrap_or(1),
        },
    )
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(BackfillProfileTimingResponse {
        matched_replays: summary.matched_replays,
        enqueued_replays: summary.enqueued_replays,
        skipped_replays: summary.skipped_replays,
        concurrency: summary.concurrency,
        force: summary.force,
    }))
}

/// Sweep event stream objects left behind by analysis runs that were
/// superseded before stream GC ran inline with pruning (or whose inline GC
/// failed). Safe to re-run; deletion is idempotent.
#[utoipa::path(
    post,
    path = "/api/v1/admin/storage/gc-event-streams",
    tag = "admin",
    request_body = GcEventStreamsRequest,
    responses(
        (status = 200, description = "Superseded event stream objects deleted", body = GcEventStreamsResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn gc_event_streams(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<GcEventStreamsRequest>,
) -> Result<Json<GcEventStreamsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let summary = gc_superseded_event_streams(pool, state.storage.as_ref(), request.dry_run)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(GcEventStreamsResponse {
        matched_objects: summary.matched_objects,
        deleted_objects: summary.deleted_objects,
        reclaimed_storage_bytes: summary.reclaimed_storage_bytes,
        dry_run: summary.dry_run,
    }))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AdminUserResponse {
    pub id: Uuid,
    pub primary_email: Option<String>,
    pub display_name: Option<String>,
    pub is_admin: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AdminUsersResponse {
    pub users: Vec<AdminUserResponse>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct SetUserAdminRequest {
    pub is_admin: bool,
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/users",
    tag = "admin",
    responses(
        (status = 200, description = "List of users with their admin status", body = AdminUsersResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_users(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<AdminUsersResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;

    let users = sqlx::query(
        r#"
        SELECT id, primary_email, display_name, is_admin, created_at, updated_at
        FROM users
        ORDER BY is_admin DESC, primary_email NULLS LAST, created_at
        "#,
    )
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?
    .into_iter()
    .map(|row| {
        Ok(AdminUserResponse {
            id: row.try_get("id")?,
            primary_email: row.try_get("primary_email")?,
            display_name: row.try_get("display_name")?,
            is_admin: row.try_get("is_admin")?,
            created_at: row.try_get("created_at")?,
            updated_at: row.try_get("updated_at")?,
        })
    })
    .collect::<Result<Vec<_>, sqlx::Error>>()
    .map_err(ApiError::internal)?;

    Ok(Json(AdminUsersResponse { users }))
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/users/{user_id}/admin",
    tag = "admin",
    params(("user_id" = Uuid, Path, description = "The user to grant or revoke admin status")),
    request_body = SetUserAdminRequest,
    responses(
        (status = 200, description = "Updated user", body = AdminUserResponse),
        (status = 400, description = "Invalid request"),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 404, description = "User not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn set_user_admin(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
    Json(request): Json<SetUserAdminRequest>,
) -> Result<Json<AdminUserResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;

    // Guard against an admin accidentally locking themselves out.
    if user_id == auth_user.id && !request.is_admin {
        return Err(ApiError::new(
            StatusCode::BAD_REQUEST,
            "you cannot remove your own admin status",
        ));
    }

    let row = sqlx::query(
        r#"
        UPDATE users
        SET is_admin = $2, updated_at = now()
        WHERE id = $1
        RETURNING id, primary_email, display_name, is_admin, created_at, updated_at
        "#,
    )
    .bind(user_id)
    .bind(request.is_admin)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "user not found"))?;

    Ok(Json(AdminUserResponse {
        id: row.try_get("id").map_err(ApiError::internal)?,
        primary_email: row.try_get("primary_email").map_err(ApiError::internal)?,
        display_name: row.try_get("display_name").map_err(ApiError::internal)?,
        is_admin: row.try_get("is_admin").map_err(ApiError::internal)?,
        created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        updated_at: row.try_get("updated_at").map_err(ApiError::internal)?,
    }))
}

/// Resolve the requester's admin status (persisting any bootstrap promotion) and
/// reject the request with `403 Forbidden` when they are not an admin.
#[derive(Debug, Serialize, ToSchema)]
pub struct BackfillEventCountsResponse {
    /// Always "started": the backfill runs in the background; watch server logs
    /// for `player replay event-count backfill complete`.
    pub status: String,
}

/// Populate `player_replay_event_counts` from existing events for every
/// canonical replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-event-counts",
    tag = "admin",
    responses(
        (status = 200, description = "Event-count backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_event_counts(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_event_counts(&pool).await {
            Ok(backfilled) => {
                tracing::info!(backfilled, "event-counts backfill task finished")
            }
            Err(error) => tracing::error!(?error, "event-counts backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `player_replay_first_man_stints` from existing events for every
/// canonical replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-rotation-stints",
    tag = "admin",
    responses(
        (status = 200, description = "Rotation-stint backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_rotation_stints(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_first_man_stints(&pool).await {
            Ok(backfilled) => tracing::info!(backfilled, "rotation-stint backfill task finished"),
            Err(error) => tracing::error!(?error, "rotation-stint backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `player_replay_positioning` from existing events for every canonical
/// replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-positioning",
    tag = "admin",
    responses(
        (status = 200, description = "Positioning backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_positioning(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_positioning(&pool).await {
            Ok(backfilled) => tracing::info!(backfilled, "positioning backfill task finished"),
            Err(error) => tracing::error!(?error, "positioning backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

async fn require_admin(state: &AppState, auth_user: &AuthUser) -> Result<(), ApiError> {
    let pool = require_db(state)?;
    let is_admin = crate::auth::resolve_is_admin(pool, auth_user, &state.admin_emails)
        .await
        .map_err(ApiError::internal)?;
    if !is_admin {
        return Err(ApiError::new(
            StatusCode::FORBIDDEN,
            "admin access is required for this operation",
        ));
    }
    Ok(())
}

fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
    state.db.as_ref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "postgres connection is required for admin replay operations",
        )
    })
}

fn normalized_status_filter(status: Option<String>) -> Result<Option<String>, ApiError> {
    let Some(status) = status.map(|status| status.trim().to_lowercase()) else {
        return Ok(None);
    };
    if status.is_empty() {
        return Ok(None);
    }
    match status.as_str() {
        "pending" | "processing" | "processed" | "failed" => Ok(Some(status)),
        _ => Err(ApiError::new(
            StatusCode::BAD_REQUEST,
            "status must be pending, processing, processed, or failed",
        )),
    }
}

async fn load_processing_diagnostics_summary(
    pool: &PgPool,
) -> Result<ReplayProcessingDiagnosticsSummaryResponse, ApiError> {
    let status_rows = sqlx::query(
        r#"
        SELECT processing_status, COUNT(*)::bigint AS replay_count
        FROM replays
        GROUP BY processing_status
        ORDER BY processing_status
        "#,
    )
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;

    let mut total_replays = 0u64;
    let status_counts = status_rows
        .into_iter()
        .map(|row| {
            let status: String = row.try_get("processing_status")?;
            let count = signed_count_to_u64(row.try_get("replay_count")?);
            total_replays += count;
            Ok(ReplayProcessingStatusCountResponse { status, count })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    let problem_replays = load_processing_diagnostics_total(pool, None, false).await?;

    let queue_rows = sqlx::query(
        r#"
        SELECT status, COUNT(*)::bigint AS job_count
        FROM apalis.jobs
        WHERE job_type = $1
        GROUP BY status
        ORDER BY status
        "#,
    )
    .bind(REPLAY_PROCESSING_QUEUE_NAME)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;

    let queue_counts = queue_rows
        .into_iter()
        .map(|row| {
            Ok(ReplayProcessingQueueCountResponse {
                status: row.try_get("status")?,
                count: signed_count_to_u64(row.try_get("job_count")?),
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    // Dead worker rows are never removed, so cap how far back we report;
    // anything silent past the orphan-requeue window is just noise.
    let worker_rows = sqlx::query(
        r#"
        SELECT
            worker.id,
            worker.last_seen,
            worker.last_seen > now() - interval '90 seconds' AS alive,
            COALESCE(active.job_count, 0)::bigint AS active_jobs
        FROM apalis.workers worker
        LEFT JOIN LATERAL (
            SELECT COUNT(*)::bigint AS job_count
            FROM apalis.jobs job
            WHERE job.lock_by = worker.id
              AND job.status IN ('Queued', 'Running')
        ) active ON true
        WHERE worker.worker_type = $1
          AND worker.last_seen > now() - interval '1 hour'
        ORDER BY worker.last_seen DESC
        "#,
    )
    .bind(REPLAY_PROCESSING_QUEUE_NAME)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;

    let workers = worker_rows
        .into_iter()
        .map(|row| {
            Ok(ReplayProcessingWorkerResponse {
                id: row.try_get("id")?,
                last_seen: row.try_get("last_seen")?,
                alive: row.try_get("alive")?,
                active_jobs: signed_count_to_u64(row.try_get("active_jobs")?),
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    Ok(ReplayProcessingDiagnosticsSummaryResponse {
        total_replays,
        problem_replays,
        status_counts,
        queue_counts,
        workers,
    })
}

async fn load_processing_diagnostics_total(
    pool: &PgPool,
    status: Option<&str>,
    include_healthy: bool,
) -> Result<u64, ApiError> {
    let mut query = sqlx::QueryBuilder::new("SELECT COUNT(*)::bigint AS replay_count FROM (");
    push_processing_diagnostics_rows_query(&mut query);
    query.push(") diagnostic WHERE 1 = 1");
    push_processing_diagnostics_filters(&mut query, status, include_healthy);

    let row = query
        .build()
        .fetch_one(pool)
        .await
        .map_err(ApiError::internal)?;
    Ok(signed_count_to_u64(
        row.try_get("replay_count").map_err(ApiError::internal)?,
    ))
}

async fn load_processing_diagnostic_rows(
    pool: &PgPool,
    status: Option<&str>,
    include_healthy: bool,
    count: u32,
    offset: u32,
) -> Result<Vec<ReplayProcessingDiagnosticResponse>, ApiError> {
    let mut query = sqlx::QueryBuilder::new("SELECT * FROM (");
    push_processing_diagnostics_rows_query(&mut query);
    query.push(") diagnostic WHERE 1 = 1");
    push_processing_diagnostics_filters(&mut query, status, include_healthy);
    query.push(
        r#"
        ORDER BY
            problem DESC,
            CASE processing_status
                WHEN 'failed' THEN 0
                WHEN 'processing' THEN 1
                WHEN 'pending' THEN 2
                ELSE 3
            END,
            updated_at DESC,
            replay_id DESC
        LIMIT
        "#,
    );
    query.push_bind(i64::from(count));
    query.push(" OFFSET ");
    query.push_bind(i64::from(offset));

    query
        .build()
        .fetch_all(pool)
        .await
        .map_err(ApiError::internal)?
        .into_iter()
        .map(processing_diagnostic_from_row)
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)
}

fn push_processing_diagnostics_rows_query<'args>(
    query: &mut sqlx::QueryBuilder<'args, sqlx::Postgres>,
) {
    query.push(
        r#"
        SELECT
            r.id AS replay_id,
            r.original_file_name,
            r.file_sha256,
            r.processing_status,
            r.created_at,
            r.updated_at,
            r.canonical_analysis_run_id,
            canonical_run.id AS canonical_run_id,
            canonical_run.status AS canonical_run_status,
            canonical_run.extractor_name AS canonical_run_extractor_name,
            canonical_run.extractor_version AS canonical_run_extractor_version,
            canonical_run.event_stream_schema_version AS canonical_run_event_stream_schema_version,
            canonical_run.event_stream_object_key AS canonical_run_event_stream_object_key,
            canonical_run.started_at AS canonical_run_started_at,
            canonical_run.finished_at AS canonical_run_finished_at,
            canonical_run.error_message AS canonical_run_error_message,
            latest_run.id AS latest_run_id,
            latest_run.status AS latest_run_status,
            latest_run.extractor_name AS latest_run_extractor_name,
            latest_run.extractor_version AS latest_run_extractor_version,
            latest_run.event_stream_schema_version AS latest_run_event_stream_schema_version,
            latest_run.event_stream_object_key AS latest_run_event_stream_object_key,
            latest_run.started_at AS latest_run_started_at,
            latest_run.finished_at AS latest_run_finished_at,
            latest_run.error_message AS latest_run_error_message,
            COALESCE(canonical_events.event_count, 0)::bigint AS canonical_event_count,
            false AS needs_reanalysis,
            false AS needs_reindex,
            ARRAY[]::text[] AS stale_reasons,
            COALESCE(queue_summary.queued_jobs, 0)::bigint AS queued_jobs,
            COALESCE(queue_summary.running_jobs, 0)::bigint AS running_jobs,
            COALESCE(queue_summary.failed_jobs, 0)::bigint AS failed_jobs,
            COALESCE(queue_summary.finished_jobs, 0)::bigint AS finished_jobs,
            queue_summary.next_queue_run_at,
            queue_summary.last_queue_started_at,
            queue_summary.last_queue_done_at,
            queue_summary.last_queue_error,
            (
                r.processing_status <> 'processed'
                OR r.canonical_analysis_run_id IS NULL
                OR canonical_run.id IS NULL
                OR canonical_run.status IS DISTINCT FROM 'succeeded'
                OR canonical_run.event_stream_object_key IS NULL
                OR COALESCE(canonical_events.event_count, 0) = 0
            ) AS problem
        FROM replays r
        LEFT JOIN analysis_runs canonical_run
          ON canonical_run.id = r.canonical_analysis_run_id
        LEFT JOIN LATERAL (
            SELECT *
            FROM analysis_runs run
            WHERE run.replay_id = r.id
            ORDER BY run.started_at DESC, run.created_at DESC, run.id DESC
            LIMIT 1
        ) latest_run ON true
        LEFT JOIN LATERAL (
            SELECT COUNT(*)::bigint AS event_count
            FROM play_events event
            WHERE event.analysis_run_id = r.canonical_analysis_run_id
        ) canonical_events ON true
        LEFT JOIN LATERAL (
            SELECT
                COUNT(*) FILTER (WHERE lower(job.status) IN ('pending', 'queued'))::bigint AS queued_jobs,
                COUNT(*) FILTER (WHERE lower(job.status) IN ('running'))::bigint AS running_jobs,
                COUNT(*) FILTER (WHERE lower(job.status) = 'failed')::bigint AS failed_jobs,
                COUNT(*) FILTER (WHERE lower(job.status) IN ('done', 'completed'))::bigint AS finished_jobs,
                MIN(job.run_at) FILTER (WHERE lower(job.status) IN ('pending', 'queued', 'failed')) AS next_queue_run_at,
                MAX(job.lock_at) AS last_queue_started_at,
                MAX(job.done_at) AS last_queue_done_at,
                MAX(job.last_result::text) FILTER (WHERE job.last_result IS NOT NULL) AS last_queue_error
            FROM apalis.jobs job
            WHERE job.job_type =
        "#,
    );
    query.push_bind(REPLAY_PROCESSING_QUEUE_NAME);
    query.push(
        r#"
              AND (convert_from(job.job, 'UTF8')::jsonb ->> 'replay_id')::uuid = r.id
        ) queue_summary ON true
        "#,
    );
}

fn push_processing_diagnostics_filters<'args>(
    query: &mut sqlx::QueryBuilder<'args, sqlx::Postgres>,
    status: Option<&str>,
    include_healthy: bool,
) {
    if let Some(status) = status {
        query.push(" AND processing_status = ");
        query.push_bind(status.to_owned());
    }
    if !include_healthy {
        query.push(" AND problem");
    }
}

fn processing_diagnostic_from_row(
    row: sqlx::postgres::PgRow,
) -> Result<ReplayProcessingDiagnosticResponse, sqlx::Error> {
    let canonical_event_count = signed_count_to_u64(row.try_get("canonical_event_count")?);
    let needs_reanalysis = row.try_get("needs_reanalysis")?;
    let needs_reindex = row.try_get("needs_reindex")?;
    let stale_reasons = row.try_get("stale_reasons")?;
    let queued_jobs = signed_count_to_u64(row.try_get("queued_jobs")?);
    let running_jobs = signed_count_to_u64(row.try_get("running_jobs")?);
    let failed_jobs = signed_count_to_u64(row.try_get("failed_jobs")?);
    let finished_jobs = signed_count_to_u64(row.try_get("finished_jobs")?);
    let canonical_analysis_run = analysis_run_from_row(&row, "canonical_run")?;
    let latest_analysis_run = analysis_run_from_row(&row, "latest_run")?;

    let diagnostic = ReplayProcessingDiagnosticResponse {
        replay_id: row.try_get("replay_id")?,
        original_file_name: row.try_get("original_file_name")?,
        file_sha256: row.try_get("file_sha256")?,
        processing_status: row.try_get("processing_status")?,
        created_at: row.try_get("created_at")?,
        updated_at: row.try_get("updated_at")?,
        canonical_analysis_run_id: row.try_get("canonical_analysis_run_id")?,
        canonical_analysis_run,
        latest_analysis_run,
        canonical_event_count,
        needs_reanalysis,
        needs_reindex,
        stale_reasons,
        queued_jobs,
        running_jobs,
        failed_jobs,
        finished_jobs,
        next_queue_run_at: row.try_get("next_queue_run_at")?,
        last_queue_started_at: row.try_get("last_queue_started_at")?,
        last_queue_done_at: row.try_get("last_queue_done_at")?,
        last_queue_error: row.try_get("last_queue_error")?,
        reasons: Vec::new(),
    };

    Ok(ReplayProcessingDiagnosticResponse {
        reasons: processing_diagnostic_reasons(&diagnostic),
        ..diagnostic
    })
}

fn analysis_run_from_row(
    row: &sqlx::postgres::PgRow,
    prefix: &str,
) -> Result<Option<AnalysisRunDiagnosticResponse>, sqlx::Error> {
    let id_column = format!("{prefix}_id");
    let Some(id) = row.try_get::<Option<Uuid>, _>(id_column.as_str())? else {
        return Ok(None);
    };

    Ok(Some(AnalysisRunDiagnosticResponse {
        id,
        status: row.try_get(format!("{prefix}_status").as_str())?,
        extractor_name: row.try_get(format!("{prefix}_extractor_name").as_str())?,
        extractor_version: row.try_get(format!("{prefix}_extractor_version").as_str())?,
        event_stream_schema_version: row
            .try_get(format!("{prefix}_event_stream_schema_version").as_str())?,
        event_stream_object_key: row
            .try_get(format!("{prefix}_event_stream_object_key").as_str())?,
        started_at: row.try_get(format!("{prefix}_started_at").as_str())?,
        finished_at: row.try_get(format!("{prefix}_finished_at").as_str())?,
        error_message: row.try_get(format!("{prefix}_error_message").as_str())?,
    }))
}

fn processing_diagnostic_reasons(diagnostic: &ReplayProcessingDiagnosticResponse) -> Vec<String> {
    let mut reasons = Vec::new();

    if diagnostic.processing_status == "pending" && diagnostic.latest_analysis_run.is_none() {
        reasons.push("Replay is pending and no analysis run has started.".to_owned());
    }
    if diagnostic.processing_status == "failed" {
        reasons.push("Replay processing status is failed.".to_owned());
    }
    if diagnostic.processing_status == "processing" {
        reasons.push("Replay is still being processed.".to_owned());
    }
    if diagnostic.canonical_analysis_run_id.is_none() {
        reasons.push("No canonical analysis run is attached to the replay.".to_owned());
    } else if diagnostic.canonical_analysis_run.is_none() {
        reasons
            .push("The canonical analysis run id no longer points to an analysis run.".to_owned());
    }

    if let Some(canonical_run) = &diagnostic.canonical_analysis_run {
        if canonical_run.status != "succeeded" {
            reasons.push(format!(
                "Canonical analysis run status is {}.",
                canonical_run.status
            ));
        }
        if canonical_run.event_stream_object_key.is_none() {
            reasons.push("Canonical analysis run has no stored event stream object.".to_owned());
        }
    }

    if diagnostic.canonical_analysis_run.is_some() && diagnostic.canonical_event_count == 0 {
        reasons.push("Canonical analysis run has no indexed play events.".to_owned());
    }
    if let Some(latest_run) = &diagnostic.latest_analysis_run {
        if latest_run.status == "failed" {
            let message = latest_run
                .error_message
                .as_deref()
                .unwrap_or("no error message was stored");
            reasons.push(format!("Latest analysis run failed: {message}"));
        }
        if latest_run.status == "running" && latest_run.finished_at.is_none() {
            reasons.push("Latest analysis run is still marked running.".to_owned());
        }
    }
    if diagnostic.needs_reanalysis {
        reasons.push("Replay analysis state is marked as needing reanalysis.".to_owned());
    }
    if diagnostic.needs_reindex {
        reasons.push("Replay analysis state is marked as needing reindex.".to_owned());
    }
    for stale_reason in &diagnostic.stale_reasons {
        reasons.push(format!("Stale reason: {stale_reason}"));
    }
    if diagnostic.queued_jobs > 0 {
        reasons.push(format!(
            "{} replay processing job(s) are queued.",
            diagnostic.queued_jobs
        ));
    }
    if diagnostic.running_jobs > 0 {
        reasons.push(format!(
            "{} replay processing job(s) are running.",
            diagnostic.running_jobs
        ));
    }
    if diagnostic.failed_jobs > 0 {
        reasons.push(format!(
            "{} replay processing job(s) failed in the queue.",
            diagnostic.failed_jobs
        ));
    }
    if let Some(queue_error) = &diagnostic.last_queue_error {
        reasons.push(format!("Last queue result: {queue_error}"));
    }

    if reasons.is_empty() {
        reasons.push("Replay appears fully processed.".to_owned());
    }

    reasons
}

fn signed_count_to_u64(count: i64) -> u64 {
    u64::try_from(count).unwrap_or(0)
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

    fn internal(error: impl std::fmt::Display) -> Self {
        tracing::error!(error = %error, "admin request failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
    }
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
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
