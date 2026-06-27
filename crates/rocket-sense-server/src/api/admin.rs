use crate::{
    app::AppState,
    auth::AuthUser,
    processing::{
        enqueue_profile_timing_backfill, enqueue_replay_reprocessing,
        enqueue_replay_reprocessing_job, gc_superseded_event_streams,
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
const DEFAULT_QUEUE_COUNT: u32 = 200;
const MAX_QUEUE_COUNT: u32 = 1000;

pub fn router() -> Router<AppState> {
    Router::new()
        .route(
            "/admin/replays/processing-diagnostics",
            get(list_replay_processing_diagnostics),
        )
        .route(
            "/admin/replays/recently-processed",
            get(list_recently_processed_replays),
        )
        .route("/admin/replays/queue", get(list_replay_processing_queue))
        .route(
            "/admin/replays/queue/reprocess-failed",
            post(reprocess_failed_queue_jobs),
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
        .route("/admin/stats/backfill-movement", post(backfill_movement))
        .route(
            "/admin/stats/backfill-touch-breakdowns",
            post(backfill_touch_breakdowns),
        )
        .route(
            "/admin/stats/backfill-possession",
            post(backfill_possession),
        )
        .route(
            "/admin/stats/backfill-team-control",
            post(backfill_team_control),
        )
        .route("/admin/stats/backfill-boost", post(backfill_boost))
        .route("/admin/stats/backfill-kickoff", post(backfill_kickoff))
        .route(
            "/admin/stats/refresh-rank-benchmarks",
            post(refresh_rank_benchmarks),
        )
        .route("/admin/storage/gc-event-streams", post(gc_event_streams))
        .route("/admin/users", get(list_users))
        .route("/admin/users/{user_id}/admin", post(set_user_admin))
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct BackfillMovementQuery {
    /// Re-materialize every canonical replay, refreshing existing rows instead
    /// of only filling replays that have no movement rows yet. Required to pick
    /// up materialization SQL changes for already-processed replays.
    #[serde(default)]
    pub recompute: bool,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct ReplayProcessingDiagnosticsQuery {
    pub status: Option<String>,
    #[serde(default)]
    pub include_healthy: bool,
    /// Restrict to replays whose most recent analysis run failed, i.e. they have
    /// not had a successful run since their last failure.
    #[serde(default)]
    pub currently_failed: bool,
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
    /// Replays whose most recent analysis run failed (no successful run since
    /// the last failure).
    pub currently_failed_replays: u64,
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

#[derive(Debug, Deserialize, ToSchema)]
pub struct ReplayProcessingQueueQuery {
    pub count: Option<u32>,
    pub offset: Option<u32>,
    /// Which slice of the queue to return. Defaults to `outstanding`.
    pub view: Option<QueueView>,
}

/// Which jobs the queue listing should return.
#[derive(Debug, Clone, Copy, Default, Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueueView {
    /// Work the worker still has to do: Pending/Queued/Running plus retriable Failed.
    #[default]
    Outstanding,
    /// Finished history: succeeded (Done) and permanently failed (Killed).
    Completed,
    /// Every replay-processing job, regardless of status.
    All,
}

impl QueueView {
    /// `apalis.jobs`-aliased (`job`) status predicate for this view.
    fn status_filter(self) -> &'static str {
        match self {
            QueueView::Outstanding => "job.status IN ('Pending', 'Queued', 'Running', 'Failed')",
            QueueView::Completed => "job.status IN ('Done', 'Killed')",
            QueueView::All => "TRUE",
        }
    }

    /// ORDER BY clause (without the `ORDER BY` keyword).
    fn order_by(self) -> &'static str {
        match self {
            // Same order the worker pops jobs (apalis.get_jobs).
            QueueView::Outstanding => "job.priority DESC, job.run_at ASC, job.id ASC",
            // Most-recently finished first.
            QueueView::Completed => "job.done_at DESC NULLS LAST, job.id DESC",
            // Newest activity first across every status.
            QueueView::All => "COALESCE(job.done_at, job.lock_at, job.run_at) DESC, job.id DESC",
        }
    }
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingQueueResponse {
    pub jobs: Vec<ReplayProcessingQueueJobResponse>,
    pub count: u32,
    pub offset: u32,
    pub total: u64,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReplayProcessingQueueJobResponse {
    /// apalis job id (primary key in apalis.jobs).
    pub job_id: String,
    /// Replay id extracted from the JSON job payload.
    pub replay_id: Uuid,
    pub original_file_name: Option<String>,
    /// True when the job was enqueued as a force-reprocess.
    pub force: bool,
    /// Raw apalis status: Pending, Queued, Running, Failed, Done, or Killed.
    pub status: String,
    /// True for a job apalis will never run again on its own: a Killed job, or
    /// a Failed job that has exhausted its retries (`attempts >= max_attempts`).
    pub terminal: bool,
    pub attempts: i32,
    pub max_attempts: i32,
    pub priority: i32,
    /// When the job becomes (or became) eligible to run.
    pub run_at: DateTime<Utc>,
    /// Worker currently holding the job, if locked.
    pub lock_by: Option<String>,
    pub lock_at: Option<DateTime<Utc>>,
    /// When the job finished (succeeded or was killed); null while outstanding.
    pub done_at: Option<DateTime<Utc>>,
    /// Last error/result recorded by apalis (raw JSON text).
    pub last_result: Option<String>,
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

#[derive(Debug, Deserialize, ToSchema)]
pub struct RecentlyProcessedReplaysQuery {
    pub count: Option<u32>,
    pub offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct RecentlyProcessedReplaysResponse {
    pub replays: Vec<RecentlyProcessedReplayResponse>,
    pub count: u32,
    pub offset: u32,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct RecentlyProcessedReplayResponse {
    pub replay_id: Uuid,
    pub original_file_name: Option<String>,
    pub processing_status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub canonical_run_id: Option<Uuid>,
    pub canonical_run_status: Option<String>,
    pub extractor_name: Option<String>,
    pub extractor_version: Option<String>,
    /// When the canonical analysis run finished — i.e. when the replay became
    /// processed.
    pub processed_at: Option<DateTime<Utc>>,
    pub event_count: u64,
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
        ("currently_failed" = Option<bool>, Query, description = "Only replays whose most recent analysis run failed"),
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
    let currently_failed = query.currently_failed;
    let count = query
        .count
        .unwrap_or(DEFAULT_DIAGNOSTIC_COUNT)
        .clamp(1, MAX_DIAGNOSTIC_COUNT);
    let offset = query.offset.unwrap_or(0);

    let summary = load_processing_diagnostics_summary(pool).await?;
    let total = match (status.as_deref(), include_healthy, currently_failed) {
        (None, false, false) => summary.problem_replays,
        (None, true, false) => summary.total_replays,
        (None, true, true) => summary.currently_failed_replays,
        _ => {
            load_processing_diagnostics_total(
                pool,
                status.as_deref(),
                include_healthy,
                currently_failed,
            )
            .await?
        }
    };
    let replays = if total == 0 || u64::from(offset) >= total {
        Vec::new()
    } else {
        load_processing_diagnostic_rows(
            pool,
            status.as_deref(),
            include_healthy,
            currently_failed,
            count,
            offset,
        )
        .await?
    };
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
    get,
    path = "/api/v1/admin/replays/recently-processed",
    tag = "admin",
    params(
        ("count" = Option<u32>, Query, description = "Page size"),
        ("offset" = Option<u32>, Query, description = "Page offset")
    ),
    responses(
        (status = 200, description = "Recently processed replays", body = RecentlyProcessedReplaysResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_recently_processed_replays(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Query(query): Query<RecentlyProcessedReplaysQuery>,
) -> Result<Json<RecentlyProcessedReplaysResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let count = query
        .count
        .unwrap_or(DEFAULT_DIAGNOSTIC_COUNT)
        .clamp(1, MAX_DIAGNOSTIC_COUNT);
    let offset = query.offset.unwrap_or(0);

    // Drive the ordering off the canonical run's finished_at (the moment the
    // replay became processed). The per-row event count only runs for the page
    // we return, never the whole table.
    let rows = sqlx::query(
        r#"
        SELECT
            r.id AS replay_id,
            r.original_file_name,
            r.processing_status,
            r.created_at,
            r.updated_at,
            canonical_run.id AS canonical_run_id,
            canonical_run.status AS canonical_run_status,
            canonical_run.extractor_name AS extractor_name,
            canonical_run.extractor_version AS extractor_version,
            canonical_run.finished_at AS processed_at,
            COALESCE(events.event_count, 0)::bigint AS event_count
        FROM replays r
        JOIN analysis_runs canonical_run
          ON canonical_run.id = r.canonical_analysis_run_id
        LEFT JOIN LATERAL (
            SELECT COUNT(*)::bigint AS event_count
            FROM play_events event
            WHERE event.analysis_run_id = r.canonical_analysis_run_id
        ) events ON true
        WHERE r.processing_status = 'processed'
          AND canonical_run.finished_at IS NOT NULL
        ORDER BY canonical_run.finished_at DESC, r.id DESC
        LIMIT $1 OFFSET $2
        "#,
    )
    .bind(i64::from(count))
    .bind(i64::from(offset))
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;

    let replays = rows
        .into_iter()
        .map(|row| {
            Ok(RecentlyProcessedReplayResponse {
                replay_id: row.try_get("replay_id")?,
                original_file_name: row.try_get("original_file_name")?,
                processing_status: row.try_get("processing_status")?,
                created_at: row.try_get("created_at")?,
                updated_at: row.try_get("updated_at")?,
                canonical_run_id: row.try_get("canonical_run_id")?,
                canonical_run_status: row.try_get("canonical_run_status")?,
                extractor_name: row.try_get("extractor_name")?,
                extractor_version: row.try_get("extractor_version")?,
                processed_at: row.try_get("processed_at")?,
                event_count: signed_count_to_u64(row.try_get("event_count")?),
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    let next_offset = (replays.len() as u32 == count)
        .then(|| offset.checked_add(count))
        .flatten();

    Ok(Json(RecentlyProcessedReplaysResponse {
        replays,
        count,
        offset,
        next_offset,
    }))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/replays/queue",
    tag = "admin",
    params(
        ("count" = Option<u32>, Query, description = "Page size"),
        ("offset" = Option<u32>, Query, description = "Page offset"),
        ("view" = Option<QueueView>, Query, description = "Which slice: outstanding (default), completed, or all")
    ),
    responses(
        (status = 200, description = "Live replay-processing queue jobs", body = ReplayProcessingQueueResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn list_replay_processing_queue(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Query(query): Query<ReplayProcessingQueueQuery>,
) -> Result<Json<ReplayProcessingQueueResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let count = query
        .count
        .unwrap_or(DEFAULT_QUEUE_COUNT)
        .clamp(1, MAX_QUEUE_COUNT);
    let offset = query.offset.unwrap_or(0);
    let view = query.view.unwrap_or_default();

    // The status predicate and ordering both come from `view` (a fixed enum, so
    // these fragments are never user-controlled and safe to interpolate):
    //   - outstanding: Pending/Queued/Running + retriable Failed, in worker-pop order.
    //   - completed:   finished history (Done success + Killed permanent-failure),
    //                  most-recently finished first.
    //   - all:         every replay-processing job, newest activity first.
    // A job is "terminal" when apalis won't rerun it on its own: Killed, or a
    // Failed job that has already burned through its retries.
    let status_filter = view.status_filter();
    let order_by = view.order_by();

    let count_sql = format!(
        r#"
        SELECT COUNT(*)::bigint
        FROM apalis.jobs job
        WHERE job.job_type = $1
          AND {status_filter}
        "#
    );
    let total: i64 = sqlx::query_scalar(&count_sql)
        .bind(REPLAY_PROCESSING_QUEUE_NAME)
        .fetch_one(pool)
        .await
        .map_err(ApiError::internal)?;
    let total = signed_count_to_u64(total);

    let rows_sql = format!(
        r#"
        SELECT
            job.id AS job_id,
            (convert_from(job.job, 'UTF8')::jsonb ->> 'replay_id')::uuid AS replay_id,
            COALESCE((convert_from(job.job, 'UTF8')::jsonb ->> 'force')::boolean, false) AS force,
            job.status,
            (job.status = 'Killed'
                OR (job.status = 'Failed' AND job.attempts >= job.max_attempts)) AS terminal,
            job.attempts,
            job.max_attempts,
            job.priority,
            job.run_at,
            job.lock_by,
            job.lock_at,
            job.done_at,
            job.last_result::text AS last_result,
            replay.original_file_name
        FROM apalis.jobs job
        LEFT JOIN replays replay
            ON replay.id = (convert_from(job.job, 'UTF8')::jsonb ->> 'replay_id')::uuid
        WHERE job.job_type = $1
          AND {status_filter}
        ORDER BY {order_by}
        LIMIT $2 OFFSET $3
        "#
    );
    let rows = sqlx::query(&rows_sql)
        .bind(REPLAY_PROCESSING_QUEUE_NAME)
        .bind(i64::from(count))
        .bind(i64::from(offset))
        .fetch_all(pool)
        .await
        .map_err(ApiError::internal)?;

    let jobs = rows
        .into_iter()
        .map(|row| {
            Ok(ReplayProcessingQueueJobResponse {
                job_id: row.try_get("job_id")?,
                replay_id: row.try_get("replay_id")?,
                original_file_name: row.try_get("original_file_name")?,
                force: row.try_get("force")?,
                status: row.try_get("status")?,
                terminal: row.try_get("terminal")?,
                attempts: row.try_get("attempts")?,
                max_attempts: row.try_get("max_attempts")?,
                priority: row.try_get("priority")?,
                run_at: row.try_get("run_at")?,
                lock_by: row.try_get("lock_by")?,
                lock_at: row.try_get("lock_at")?,
                done_at: row.try_get("done_at")?,
                last_result: row.try_get("last_result")?,
            })
        })
        .collect::<Result<Vec<_>, sqlx::Error>>()
        .map_err(ApiError::internal)?;

    let next_offset = offset
        .checked_add(count)
        .filter(|next_offset| u64::from(*next_offset) < total);

    Ok(Json(ReplayProcessingQueueResponse {
        jobs,
        count,
        offset,
        total,
        next_offset,
    }))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ReprocessFailedQueueJobsResponse {
    /// Replays that had at least one Failed job in the queue.
    pub failed_replays: u64,
    /// Replays for which a fresh force-reprocess job was enqueued.
    pub enqueued_replays: u64,
    /// Replays skipped because a job was already outstanding (Pending/Queued/Running).
    pub skipped_replays: u64,
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/replays/queue/reprocess-failed",
    tag = "admin",
    responses(
        (status = 200, description = "Failed queue jobs re-enqueued", body = ReprocessFailedQueueJobsResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn reprocess_failed_queue_jobs(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<ReprocessFailedQueueJobsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;

    // Every replay with a Failed job in the queue — both retriable failures and
    // retry-exhausted "terminal" ones that apalis will never run again. The
    // force-enqueue path (push → notify) wakes the worker immediately and dedups
    // against any job that is still outstanding for the same replay.
    let failed_replay_ids: Vec<Uuid> = sqlx::query_scalar(
        r#"
        SELECT DISTINCT (convert_from(job, 'UTF8')::jsonb ->> 'replay_id')::uuid AS replay_id
        FROM apalis.jobs
        WHERE job_type = $1
          AND status = 'Failed'
        "#,
    )
    .bind(REPLAY_PROCESSING_QUEUE_NAME)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;

    let failed_replays = failed_replay_ids.len() as u64;
    let mut enqueued_replays = 0u64;
    for replay_id in failed_replay_ids {
        if enqueue_replay_reprocessing_job(pool, replay_id)
            .await
            .map_err(ApiError::internal)?
        {
            enqueued_replays += 1;
        }
    }

    Ok(Json(ReprocessFailedQueueJobsResponse {
        failed_replays,
        enqueued_replays,
        skipped_replays: failed_replays - enqueued_replays,
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

/// Populate `player_replay_movement` from existing events for every canonical
/// replay missing rows. Runs in the background and is resumable. Pass
/// `?recompute=true` to refresh existing rows (e.g. after materialization SQL
/// changes) instead of only filling replays without rows.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-movement",
    tag = "admin",
    params(
        ("recompute" = Option<bool>, Query, description = "Re-materialize every canonical replay, refreshing existing rows")
    ),
    responses(
        (status = 200, description = "Movement backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_movement(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Query(query): Query<BackfillMovementQuery>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    let recompute = query.recompute;
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_movement(&pool, recompute).await {
            Ok(backfilled) => {
                tracing::info!(backfilled, recompute, "movement backfill task finished")
            }
            Err(error) => tracing::error!(?error, "movement backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `player_replay_touch_breakdowns` from existing touch details for
/// every canonical replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-touch-breakdowns",
    tag = "admin",
    responses(
        (status = 200, description = "Touch-breakdown backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_touch_breakdowns(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_touch_breakdowns(&pool).await {
            Ok(backfilled) => {
                tracing::info!(backfilled, "touch-breakdown backfill task finished")
            }
            Err(error) => tracing::error!(?error, "touch-breakdown backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `player_replay_possession` from existing events for every canonical
/// replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-possession",
    tag = "admin",
    responses(
        (status = 200, description = "Possession backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_possession(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_possession(&pool).await {
            Ok(backfilled) => tracing::info!(backfilled, "possession backfill task finished"),
            Err(error) => tracing::error!(?error, "possession backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `replay_team_control` from existing events for every canonical
/// replay missing a row. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-team-control",
    tag = "admin",
    responses(
        (status = 200, description = "Team control backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_team_control(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_replay_team_control(&pool).await {
            Ok(backfilled) => tracing::info!(backfilled, "team control backfill task finished"),
            Err(error) => tracing::error!(?error, "team control backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `player_replay_boost` from existing tracks + events for every
/// canonical replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-boost",
    tag = "admin",
    responses(
        (status = 200, description = "Boost backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_boost(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_boost(&pool).await {
            Ok(backfilled) => tracing::info!(backfilled, "boost backfill task finished"),
            Err(error) => tracing::error!(?error, "boost backfill task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Recompute the rank-median benchmark cohort for every configured window. Runs
/// in the background; on-demand rebuild that mirrors the recurring refresh job.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/refresh-rank-benchmarks",
    tag = "admin",
    responses(
        (status = 200, description = "Rank benchmark refresh started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn refresh_rank_benchmarks(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    let windows = state.rank_benchmark_windows.to_vec();
    let calc = state.rank_benchmark_calc;
    tokio::spawn(async move {
        match crate::processing::refresh_rank_benchmark(&pool, &windows, calc).await {
            Ok(refreshed) => tracing::info!(refreshed, "rank benchmark refresh task finished"),
            Err(error) => tracing::error!(?error, "rank benchmark refresh task failed"),
        }
    });
    Ok(Json(BackfillEventCountsResponse {
        status: "started".to_owned(),
    }))
}

/// Populate `player_replay_kickoff` from existing kickoff details for every
/// canonical replay missing rows. Runs in the background and is resumable.
#[utoipa::path(
    post,
    path = "/api/v1/admin/stats/backfill-kickoff",
    tag = "admin",
    responses(
        (status = 200, description = "Kickoff backfill started", body = BackfillEventCountsResponse),
        (status = 401, description = "Not authenticated"),
        (status = 403, description = "Not an admin"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn backfill_kickoff(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<BackfillEventCountsResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let pool = pool.clone();
    tokio::spawn(async move {
        match crate::processing::backfill_player_replay_kickoff(&pool).await {
            Ok(backfilled) => tracing::info!(backfilled, "kickoff backfill task finished"),
            Err(error) => tracing::error!(?error, "kickoff backfill task failed"),
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

    let problem_replays = load_processing_diagnostics_total(pool, None, false, false).await?;
    let currently_failed_replays =
        load_processing_diagnostics_total(pool, None, true, true).await?;

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
        currently_failed_replays,
        status_counts,
        queue_counts,
        workers,
    })
}

async fn load_processing_diagnostics_total(
    pool: &PgPool,
    status: Option<&str>,
    include_healthy: bool,
    currently_failed: bool,
) -> Result<u64, ApiError> {
    let mut query = sqlx::QueryBuilder::new("SELECT COUNT(*)::bigint AS replay_count FROM (");
    push_processing_diagnostics_base_query(&mut query);
    query.push(") diagnostic WHERE 1 = 1");
    push_processing_diagnostics_filters(&mut query, status, include_healthy, currently_failed);

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
    currently_failed: bool,
    count: u32,
    offset: u32,
) -> Result<Vec<ReplayProcessingDiagnosticResponse>, ApiError> {
    // Select the page first (the base query is cheap: it only touches `replays`,
    // the canonical run, and a per-replay EXISTS probe), then attach the heavy
    // display-only data — latest run, canonical event count, and the apalis
    // queue summary — to just the rows we actually return. The queue summary in
    // particular has to parse every job's JSON payload to recover its
    // replay_id, so it must never run across the whole `replays` table.
    let mut query = sqlx::QueryBuilder::new("WITH filtered AS (SELECT * FROM (");
    push_processing_diagnostics_base_query(&mut query);
    query.push(") diagnostic WHERE 1 = 1");
    push_processing_diagnostics_filters(&mut query, status, include_healthy, currently_failed);
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
    query.push(
        r#"
        ),
        queue_summary AS (
            SELECT
                (convert_from(job.job, 'UTF8')::jsonb ->> 'replay_id')::uuid AS replay_id,
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
              AND (convert_from(job.job, 'UTF8')::jsonb ->> 'replay_id')::uuid IN (
                  SELECT replay_id FROM filtered
              )
            GROUP BY 1
        )
        SELECT
            filtered.*,
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
            queue_summary.last_queue_error
        FROM filtered
        LEFT JOIN LATERAL (
            SELECT *
            FROM analysis_runs run
            WHERE run.replay_id = filtered.replay_id
            ORDER BY run.started_at DESC, run.created_at DESC, run.id DESC
            LIMIT 1
        ) latest_run ON true
        LEFT JOIN LATERAL (
            SELECT COUNT(*)::bigint AS event_count
            FROM play_events event
            WHERE event.analysis_run_id = filtered.canonical_analysis_run_id
        ) canonical_events ON true
        LEFT JOIN queue_summary ON queue_summary.replay_id = filtered.replay_id
        ORDER BY
            filtered.problem DESC,
            CASE filtered.processing_status
                WHEN 'failed' THEN 0
                WHEN 'processing' THEN 1
                WHEN 'pending' THEN 2
                ELSE 3
            END,
            filtered.updated_at DESC,
            filtered.replay_id DESC
        "#,
    );

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

/// Cheap projection of every replay's processing health. Used directly by the
/// total-count query and as the inner select that the rows query paginates
/// before attaching heavier display-only joins. It deliberately avoids the
/// apalis queue scan and the play_events COUNT: the `problem` flag only needs
/// to know whether *any* canonical event exists, so it first checks the smaller
/// materialized event-count table and falls back to `play_events` only for
/// replay runs that have not been backfilled.
fn push_processing_diagnostics_base_query<'args>(
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
            (
                r.processing_status <> 'processed'
                OR r.canonical_analysis_run_id IS NULL
                OR canonical_run.id IS NULL
                OR canonical_run.status IS DISTINCT FROM 'succeeded'
                OR canonical_run.event_stream_object_key IS NULL
                OR CASE
                    WHEN event_count_runs.analysis_run_id IS NOT NULL THEN false
                    ELSE NOT EXISTS (
                        SELECT 1
                        FROM play_events event
                        WHERE event.analysis_run_id = r.canonical_analysis_run_id
                    )
                END
            ) AS problem,
            -- "Currently failed": the most recent analysis run failed, i.e. there
            -- has been no successful run since the last failure. NULL (no runs at
            -- all) is treated as not-failed by the `AND latest_run_failed` filter.
            (
                SELECT latest.status = 'failed'
                FROM analysis_runs latest
                WHERE latest.replay_id = r.id
                ORDER BY latest.started_at DESC, latest.created_at DESC, latest.id DESC
                LIMIT 1
            ) AS latest_run_failed
        FROM replays r
        LEFT JOIN analysis_runs canonical_run
          ON canonical_run.id = r.canonical_analysis_run_id
        LEFT JOIN (
            SELECT DISTINCT analysis_run_id
            FROM player_replay_event_counts
        ) event_count_runs
          ON event_count_runs.analysis_run_id = r.canonical_analysis_run_id
        "#,
    );
}

fn push_processing_diagnostics_filters<'args>(
    query: &mut sqlx::QueryBuilder<'args, sqlx::Postgres>,
    status: Option<&str>,
    include_healthy: bool,
    currently_failed: bool,
) {
    if let Some(status) = status {
        query.push(" AND processing_status = ");
        query.push_bind(status.to_owned());
    }
    if currently_failed {
        query.push(" AND latest_run_failed");
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
