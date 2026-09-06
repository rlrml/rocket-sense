//! Durable replay-processing jobs and operational backfills.

use super::{
    collect_replay_analysis, collect_replay_preflight_metadata, ensure_event_types,
    insert_play_events_with_options, insert_player_replay_positioning_from_events,
    player_lookup_key, process_replay, upsert_replay_search_metadata, PlayEventInsertOptions,
    EVENT_STREAM_SCHEMA_VERSION, MATERIALIZED_DENSE_SOURCE_STREAMS,
};
use anyhow::{anyhow, Context, Result};
use apalis::prelude::*;
use apalis_postgres::{
    CompactType, Config as ApalisPostgresConfig, JsonCodec, PgContext, PgNotify, PostgresStorage,
};
use bytes::Bytes;
use rocket_sense_storage::ObjectStorage;
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Row};
use std::{collections::HashMap, sync::Arc};
use tokio::{sync::Semaphore, task::JoinSet};
use uuid::Uuid;

#[cfg(test)]
#[path = "jobs_tests.rs"]
mod tests;

pub(crate) const REPLAY_PROCESSING_QUEUE_NAME: &str = "rocket-sense:replay-processing";
const ROTATION_PROFILE_TIMING_STREAMS: [&str; 3] =
    ["rotation_role", "ball_depth", "first_man_change"];
const POSITIONING_PROFILE_TIMING_STREAMS: [&str; 6] = [
    "player_activity",
    "field_third",
    "field_half",
    "depth_role",
    "ball_proximity",
    "positioning_distance",
];
// Retired stream names that earlier analysis runs may still have indexed;
// backfills delete these alongside the live streams so re-running against a
// pre-PlayerStateSpan analysis run cannot leave duplicate coverage behind.
const RETIRED_ROTATION_PROFILE_TIMING_STREAMS: [&str; 3] = [
    "rotation_role_span",
    "rotation_depth_span",
    "rotation_first_man_stint",
];
const RETIRED_POSITIONING_PROFILE_TIMING_STREAMS: [&str; 1] = ["positioning"];

#[derive(Debug, Clone)]
pub struct ReplayReprocessOptions {
    pub replay_ids: Vec<Uuid>,
    pub force: bool,
    pub concurrency: usize,
}

#[derive(Debug, Clone, Copy)]
pub struct ReplayReprocessSummary {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Clone)]
struct ReplayProcessingTarget {
    replay_id: Uuid,
    file_sha256: String,
    storage_key: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ReplayProcessingJob {
    replay_id: Uuid,
    /// When true the worker reprocesses even if the replay is already processed
    /// (a queued force-reprocess). Defaults false for normal new-replay jobs and
    /// for jobs enqueued before this field existed.
    #[serde(default)]
    force: bool,
}

// Replay processing jobs all share one apalis queue (`job_type`), so the
// worker's `ORDER BY priority DESC` fetch ranks them against each other. Three
// tiers, highest first:

/// Queue priority for a freshly uploaded replay whose owner is waiting on it.
/// Top tier so a live upload drains ahead of both the crash-recovery backlog
/// and any reprocess flood.
const NEW_UPLOAD_JOB_PRIORITY: i32 = 10;

/// Queue priority for replays re-enqueued by the startup sweep — uploads that
/// were interrupted mid-processing by a restart. Below a live upload (no one is
/// actively waiting on the originating request) but above reprocess.
const RESUME_JOB_PRIORITY: i32 = 0;

/// Queue priority for queued force-reprocess jobs. Strictly below the other
/// tiers so a new upload is always picked ahead of the entire reprocess
/// backlog: a bulk reprocess can flood the queue without delaying new uploads
/// beyond the single reprocess parse already in flight. Lowering priority
/// (rather than adding a second, dedicated worker) keeps a single bounded
/// worker pool, preserving the per-parse memory ceiling that
/// `MAX_REPLAY_PROCESSING_CONCURRENCY` guards.
const REPROCESS_JOB_PRIORITY: i32 = -1;

#[derive(Clone)]
struct ReplayProcessingWorkerState {
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
}

#[derive(Debug, Clone)]
pub struct ReplayProfileTimingBackfillOptions {
    pub replay_ids: Vec<Uuid>,
    pub force: bool,
    pub concurrency: usize,
}

#[derive(Debug, Clone, Copy)]
pub struct ReplayProfileTimingBackfillSummary {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Clone)]
struct ReplayProfileTimingBackfillTarget {
    replay_id: Uuid,
    analysis_run_id: Uuid,
    storage_key: String,
    needs_positioning: bool,
    needs_rotation_spans: bool,
}

pub async fn setup_replay_processing_queue(pool: &PgPool) -> Result<()> {
    let row = sqlx::query("SELECT to_regclass('apalis.jobs')::text AS jobs_table")
        .fetch_one(pool)
        .await
        .context("failed to verify Apalis replay processing queue schema")?;
    let jobs_table: Option<String> = row.try_get("jobs_table")?;
    if jobs_table.is_none() {
        anyhow::bail!("Apalis replay processing queue schema is missing");
    }
    Ok(())
}

/// Hard ceiling on simultaneous replay parses, regardless of configuration.
/// Each parse holds the fully decoded replay plus its materialized event set in
/// memory (~1-2 GiB), so this cap is what keeps a flooded queue from exhausting
/// the worker pod's memory — and, before pod memory limits existed, the whole
/// host: unbounded concurrency OOM-rebooted the node on 2026-06-25.
const MAX_REPLAY_PROCESSING_CONCURRENCY: usize = 4;

pub(super) fn start_replay_processing_workers(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    concurrency: usize,
) {
    // `concurrency` is the number of replay parses allowed in flight at once.
    // apalis drives the job handler through a tower stack, so `.concurrency()`
    // (a `ConcurrencyLimitLayer`) applies real backpressure: one worker fetches
    // and runs at most this many jobs concurrently and leaves the rest Pending
    // on the queue. Without it an apalis worker runs its whole fetched batch as
    // concurrent futures, so the startup re-enqueue of an unprocessed backlog
    // spawned dozens of parses at once and OOM-rebooted the node on 2026-06-25.
    let concurrency = concurrency.clamp(1, MAX_REPLAY_PROCESSING_CONCURRENCY);
    let state = ReplayProcessingWorkerState { pool, storage };

    tokio::spawn(async move {
        loop {
            // Worker ids are registered in apalis.workers behind a
            // session-scoped advisory lock that is never released, so a static
            // name collides with other processes (api + worker pods) and across
            // our own restarts; registration then fails with
            // WORKER_ALREADY_EXISTS and the worker dies silently. A fresh suffix
            // per attempt sidesteps the collision, and the retry loop keeps a
            // worker alive instead of leaving a healthy-looking pod that
            // consumes nothing.
            let instance = Uuid::new_v4().simple().to_string();
            let worker_name = format!("replay-processing-{instance}");
            let worker = WorkerBuilder::new(worker_name.clone())
                .backend(replay_processing_consumer(&state.pool))
                .concurrency(concurrency)
                .data(state.clone())
                .build(process_replay_job);

            match worker.run().await {
                Ok(()) => {
                    tracing::info!(worker = worker_name, "replay processing worker exited");
                    break;
                }
                Err(error) => {
                    tracing::error!(
                        worker = worker_name,
                        error = %error,
                        "replay processing worker stopped; restarting in 5s"
                    );
                    tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                }
            }
        }
    });
}

/// Enqueue processing for a freshly uploaded replay. Runs at the top priority
/// tier so a live upload (its owner is waiting) jumps ahead of the startup
/// resume backlog and any reprocess flood.
pub async fn enqueue_replay_processing_job(pool: &PgPool, replay_id: Uuid) -> Result<()> {
    enqueue_replay_processing_job_inner(pool, replay_id, false, NEW_UPLOAD_JOB_PRIORITY)
        .await
        .map(|_| ())
}

/// Enqueue a force-reprocess job: the worker reprocesses the replay even if it
/// is already processed. Used by the durable, queue-backed reprocess path so
/// progress survives restarts and can be drained by the worker fleet. Runs at
/// the lowest priority tier so it never delays new uploads. Returns whether a
/// new job was enqueued (false if one was already outstanding).
pub async fn enqueue_replay_reprocessing_job(pool: &PgPool, replay_id: Uuid) -> Result<bool> {
    enqueue_replay_processing_job_inner(pool, replay_id, true, REPROCESS_JOB_PRIORITY).await
}

async fn enqueue_replay_processing_job_inner(
    pool: &PgPool,
    replay_id: Uuid,
    force: bool,
    priority: i32,
) -> Result<bool> {
    // Startup re-enqueue sweeps and repeated reprocess requests would
    // otherwise pile up duplicate jobs for the same replay; one outstanding
    // job is enough since processing always reads current state.
    let already_queued: bool = sqlx::query_scalar(
        r#"
        SELECT EXISTS (
            SELECT 1
            FROM apalis.jobs
            WHERE job_type = $1
              AND status IN ('Pending', 'Queued', 'Running')
              AND convert_from(job, 'UTF8')::jsonb ->> 'replay_id' = $2
        )
        "#,
    )
    .bind(REPLAY_PROCESSING_QUEUE_NAME)
    .bind(replay_id.to_string())
    .fetch_one(pool)
    .await
    .with_context(|| format!("failed to check for queued replay processing job for {replay_id}"))?;
    if already_queued {
        return Ok(false);
    }

    let mut backend = replay_processing_storage(pool);
    // The worker fetch orders by `priority DESC`, so the caller-supplied tier
    // decides whether this job drains ahead of others on the shared queue.
    let task = Task::new_with_ctx(
        ReplayProcessingJob { replay_id, force },
        PgContext::new().with_priority(priority),
    );
    backend
        .push_task(task)
        .await
        .with_context(|| format!("failed to enqueue replay processing job for {replay_id}"))?;
    Ok(true)
}

// Producer-side handle, used only to `push` new jobs onto the queue. The
// default polling backend is fine here because we never consume from it.
fn replay_processing_storage(pool: &PgPool) -> PostgresStorage<ReplayProcessingJob> {
    let config = ApalisPostgresConfig::new(REPLAY_PROCESSING_QUEUE_NAME);
    PostgresStorage::new_with_config(pool, &config)
}

// Consumer-side handle for the worker. `new_with_notify` makes the worker LISTEN
// on `apalis::job::insert` (emitted by the `notify_workers` trigger added in
// migration 0027), so it wakes the instant a job is enqueued. The default
// `new_with_config` backend never opens a listener: every pickup then waited on
// `PgPollFetcher`'s exponential backoff, which doubles up to a 5-minute cap once
// the worker has been idle. That left freshly uploaded replays sitting minutes
// (and, when the lone worker also dropped its connection, far longer) before
// processing even though the parse itself takes a few seconds. `poll_with_notify`
// keeps the poll fetcher as a fallback, so a dropped listener degrades to the old
// behavior instead of stalling.
fn replay_processing_consumer(
    pool: &PgPool,
) -> PostgresStorage<ReplayProcessingJob, CompactType, JsonCodec<CompactType>, PgNotify> {
    let config = ApalisPostgresConfig::new(REPLAY_PROCESSING_QUEUE_NAME);
    PostgresStorage::new_with_notify(pool, &config)
}

async fn process_replay_job(
    job: ReplayProcessingJob,
    state: Data<ReplayProcessingWorkerState>,
) -> Result<(), BoxDynError> {
    let replay_id = job.replay_id;
    tracing::info!(%replay_id, "started queued replay processing job");

    let Some(target) = replay_processing_job_target(&state.pool, replay_id, job.force).await?
    else {
        tracing::info!(
            %replay_id,
            "skipping replay processing job because replay is missing or already processed"
        );
        return Ok(());
    };

    process_replay(
        state.pool.clone(),
        state.storage.clone(),
        target.replay_id,
        target.file_sha256,
        target.storage_key,
    )
    .await?;

    tracing::info!(%replay_id, "finished queued replay processing job");
    Ok(())
}

pub(super) async fn enqueue_unfinished_replay_processing(pool: &PgPool) -> Result<usize> {
    let replay_ids = sqlx::query_scalar::<_, Uuid>(
        r#"
        SELECT id
        FROM replays
        WHERE canonical_analysis_run_id IS NULL
          AND processing_status IN ('pending', 'processing')
        ORDER BY created_at, id
        "#,
    )
    .fetch_all(pool)
    .await
    .context("failed to list unfinished replay processing targets")?;
    let enqueued_replays = replay_ids.len();
    for replay_id in replay_ids {
        // Resume backlog: below live uploads (no one is waiting on the original
        // request) but above reprocess.
        enqueue_replay_processing_job_inner(pool, replay_id, false, RESUME_JOB_PRIORITY).await?;
    }

    Ok(enqueued_replays)
}

pub async fn upsert_replay_preflight_metadata(
    pool: &PgPool,
    replay_id: Uuid,
    replay_bytes: Bytes,
) -> Result<()> {
    let metadata = tokio::task::spawn_blocking(move || {
        collect_replay_preflight_metadata(replay_bytes.to_vec())
    })
    .await
    .context("replay preflight metadata task panicked")??;
    upsert_replay_search_metadata(pool, replay_id, &metadata).await?;

    Ok(())
}

pub async fn enqueue_replay_reprocessing(
    pool: &PgPool,
    options: ReplayReprocessOptions,
) -> Result<ReplayReprocessSummary> {
    let concurrency = options.concurrency.clamp(1, 4);
    let replay_ids = reprocess_replay_ids(pool, &options).await?;
    let matched_replays = replay_ids.len();
    // Enqueue durable force-reprocess jobs onto the apalis queue rather than
    // running an in-process batch: progress is persisted in postgres, survives
    // server restarts, and is drained by the worker fleet (scale to parallelize).
    let mut enqueued_replays = 0usize;
    for replay_id in replay_ids {
        if enqueue_replay_reprocessing_job(pool, replay_id).await? {
            enqueued_replays += 1;
        }
    }

    Ok(ReplayReprocessSummary {
        matched_replays,
        enqueued_replays,
        skipped_replays: matched_replays - enqueued_replays,
        concurrency,
        force: options.force,
    })
}

pub async fn enqueue_profile_timing_backfill(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    permits: Arc<Semaphore>,
    options: ReplayProfileTimingBackfillOptions,
) -> Result<ReplayProfileTimingBackfillSummary> {
    let concurrency = options.concurrency.clamp(1, 4);
    let targets = profile_timing_backfill_targets(&pool, &options).await?;
    let enqueued_replays = targets.len();
    if !targets.is_empty() {
        spawn_profile_timing_backfill_worker(pool, storage, permits, targets, concurrency);
    }

    Ok(ReplayProfileTimingBackfillSummary {
        matched_replays: enqueued_replays,
        enqueued_replays,
        skipped_replays: 0,
        concurrency,
        force: options.force,
    })
}

fn spawn_profile_timing_backfill_worker(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    permits: Arc<Semaphore>,
    targets: Vec<ReplayProfileTimingBackfillTarget>,
    concurrency: usize,
) {
    tokio::spawn(async move {
        let total = targets.len();
        let mut pending = targets.into_iter();
        let mut tasks = JoinSet::new();
        let mut succeeded = 0usize;
        let mut failed = 0usize;

        loop {
            while tasks.len() < concurrency {
                let Some(target) = pending.next() else {
                    break;
                };
                let pool = pool.clone();
                let storage = storage.clone();
                let permits = permits.clone();
                tasks.spawn(async move {
                    let replay_id = target.replay_id;
                    let needs_positioning = target.needs_positioning;
                    let needs_rotation_spans = target.needs_rotation_spans;
                    tracing::info!(
                        %replay_id,
                        needs_positioning,
                        needs_rotation_spans,
                        "queued profile timing backfill"
                    );
                    let _permit = permits
                        .acquire_owned()
                        .await
                        .context("profile timing backfill worker was cancelled before start")?;
                    tracing::info!(
                        %replay_id,
                        needs_positioning,
                        needs_rotation_spans,
                        "started profile timing backfill"
                    );
                    let result = backfill_profile_timing_events(pool, storage, target).await;
                    Ok::<_, anyhow::Error>((replay_id, result))
                });
            }

            let Some(result) = tasks.join_next().await else {
                break;
            };

            match result {
                Ok(Ok((replay_id, Ok(inserted)))) => {
                    succeeded += 1;
                    tracing::info!(
                        %replay_id,
                        inserted,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill succeeded"
                    );
                }
                Ok(Ok((replay_id, Err(error)))) => {
                    failed += 1;
                    tracing::error!(
                        %replay_id,
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill failed"
                    );
                }
                Ok(Err(error)) => {
                    failed += 1;
                    tracing::error!(
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill task failed before start"
                    );
                }
                Err(error) => {
                    failed += 1;
                    tracing::error!(
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill task panicked"
                    );
                }
            }
        }

        tracing::info!(
            succeeded,
            failed,
            total,
            "profile timing backfill batch finished"
        );
    });
}

async fn replay_processing_job_target(
    pool: &PgPool,
    replay_id: Uuid,
    force: bool,
) -> Result<Option<ReplayProcessingTarget>> {
    let Some(row) = sqlx::query(
        r#"
        SELECT id, file_sha256, storage_key, processing_status, canonical_analysis_run_id
        FROM replays
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .fetch_optional(pool)
    .await
    .context("failed to load replay processing job target")?
    else {
        return Ok(None);
    };

    let processing_status: String = row.try_get("processing_status")?;
    let canonical_analysis_run_id: Option<Uuid> = row.try_get("canonical_analysis_run_id")?;
    // A normal job skips an already-processed replay; a force-reprocess job
    // proceeds regardless so it can rebuild the analysis under a new run.
    if !force && processing_status == "processed" && canonical_analysis_run_id.is_some() {
        return Ok(None);
    }

    Ok(Some(ReplayProcessingTarget {
        replay_id: row.try_get("id")?,
        file_sha256: row.try_get("file_sha256")?,
        storage_key: row.try_get("storage_key")?,
    }))
}

async fn reprocess_replay_ids(
    pool: &PgPool,
    options: &ReplayReprocessOptions,
) -> Result<Vec<Uuid>> {
    let mut query = sqlx::QueryBuilder::new(
        r#"
        SELECT r.id
        FROM replays r
        WHERE TRUE
        "#,
    );

    if !options.replay_ids.is_empty() {
        query.push(" AND r.id = ANY(");
        query.push_bind(&options.replay_ids);
        query.push(")");
    }

    if !options.force {
        query.push(
            r#"
            AND (
                r.canonical_analysis_run_id IS NULL
                OR NOT EXISTS (
                    SELECT 1
                    FROM analysis_runs ar
                    WHERE ar.id = r.canonical_analysis_run_id
                      AND ar.status = 'succeeded'
                      AND ar.event_stream_schema_version =
            "#,
        );
        query.push_bind(EVENT_STREAM_SCHEMA_VERSION);
        query.push(
            r#"
                      AND ar.event_stream_object_key IS NOT NULL
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                )
            )
            "#,
        );
    }

    query.push(" ORDER BY r.created_at, r.id");

    query
        .build_query_scalar()
        .fetch_all(pool)
        .await
        .context("failed to list replays for reprocessing")
}

async fn profile_timing_backfill_targets(
    pool: &PgPool,
    options: &ReplayProfileTimingBackfillOptions,
) -> Result<Vec<ReplayProfileTimingBackfillTarget>> {
    let mut query = sqlx::QueryBuilder::new(
        r#"
        WITH candidates AS (
        SELECT
            r.id,
            r.created_at,
            r.storage_key,
            r.canonical_analysis_run_id,
            (
                NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'player_activity'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'positioning_distance'
                )
            ) AS needs_positioning,
            (
                NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_role'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'ball_depth'
                )
            ) AS needs_rotation_spans
        FROM replays r
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );

    if !options.replay_ids.is_empty() {
        query.push(" AND r.id = ANY(");
        query.push_bind(&options.replay_ids);
        query.push(")");
    }

    query.push(") SELECT * FROM candidates");
    if !options.force {
        query.push(" WHERE needs_positioning OR needs_rotation_spans");
    }
    query.push(" ORDER BY created_at, id");

    query
        .build()
        .fetch_all(pool)
        .await
        .context("failed to list replays for profile timing backfill")?
        .into_iter()
        .map(|row| {
            Ok(ReplayProfileTimingBackfillTarget {
                replay_id: row.try_get("id")?,
                storage_key: row.try_get("storage_key")?,
                analysis_run_id: row.try_get("canonical_analysis_run_id")?,
                needs_positioning: options.force || row.try_get("needs_positioning")?,
                needs_rotation_spans: options.force || row.try_get("needs_rotation_spans")?,
            })
        })
        .collect()
}

async fn backfill_profile_timing_events(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    target: ReplayProfileTimingBackfillTarget,
) -> Result<usize> {
    let replay_bytes = storage
        .get(&target.storage_key)
        .await
        .with_context(|| format!("failed to read replay object `{}`", target.storage_key))?;
    let output =
        tokio::task::spawn_blocking(move || collect_replay_analysis(replay_bytes.to_vec(), None))
            .await
            .context("profile timing backfill analysis task panicked")??;
    let mut indexed_events = output
        .indexed_events
        .into_iter()
        .filter(|event| {
            (target.needs_rotation_spans
                && ROTATION_PROFILE_TIMING_STREAMS.contains(&event.source_stream.as_str()))
                || (target.needs_positioning
                    && POSITIONING_PROFILE_TIMING_STREAMS.contains(&event.source_stream.as_str()))
        })
        .collect::<Vec<_>>();
    if indexed_events.is_empty() {
        return Ok(0);
    }

    indexed_events.sort_by_key(|event| match event.source_stream.as_str() {
        "rotation_role" => 0,
        "ball_depth" => 1,
        "first_man_change" => 2,
        "player_activity" => 3,
        "field_third" => 4,
        "field_half" => 5,
        "depth_role" => 6,
        "ball_proximity" => 7,
        "positioning_distance" => 8,
        _ => 9,
    });

    if target.needs_rotation_spans {
        let streams = ROTATION_PROFILE_TIMING_STREAMS
            .iter()
            .chain(RETIRED_ROTATION_PROFILE_TIMING_STREAMS.iter())
            .copied()
            .collect::<Vec<_>>();
        delete_profile_timing_streams(&pool, target.analysis_run_id, &streams).await?;
    }
    if target.needs_positioning {
        let streams = POSITIONING_PROFILE_TIMING_STREAMS
            .iter()
            .chain(RETIRED_POSITIONING_PROFILE_TIMING_STREAMS.iter())
            .copied()
            .collect::<Vec<_>>();
        delete_profile_timing_streams(&pool, target.analysis_run_id, &streams).await?;
    }

    let replay_players = load_replay_player_lookup(&pool, target.replay_id).await?;
    let event_type_ids = ensure_event_types(&pool, &indexed_events).await?;
    let inserted = insert_play_events_with_options(
        &pool,
        target.analysis_run_id,
        target.replay_id,
        &indexed_events,
        &event_type_ids,
        &replay_players,
        PlayEventInsertOptions::PROFILE_TIMING_BACKFILL,
    )
    .await?;
    if target.needs_positioning {
        insert_player_replay_positioning_from_events(
            &pool,
            target.analysis_run_id,
            target.replay_id,
            &indexed_events,
            &output.metadata,
            &replay_players,
        )
        .await?;
    }

    Ok(inserted)
}

async fn delete_profile_timing_streams(
    pool: &PgPool,
    analysis_run_id: Uuid,
    source_streams: &[&str],
) -> Result<()> {
    sqlx::query(
        r#"
        DELETE FROM play_events
        WHERE analysis_run_id = $1
          AND source_stream = ANY($2)
        "#,
    )
    .bind(analysis_run_id)
    .bind(source_streams)
    .execute(pool)
    .await
    .context("failed to delete stale profile timing events")?;
    Ok(())
}

/// Remove dense telemetry left by older versions or profile-timing backfills
/// after materialization. Dependent payload, attribute, subject, and detail
/// rows are removed by cascading deletes.
pub(super) async fn delete_materialized_dense_stream_events(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
) -> Result<u64> {
    let result = sqlx::query(
        r#"
        DELETE FROM play_events
        WHERE analysis_run_id = $1
          AND replay_id = $2
          AND source_stream = ANY($3)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(MATERIALIZED_DENSE_SOURCE_STREAMS)
    .execute(pool)
    .await
    .context("failed to delete materialized dense-stream play events")?;
    Ok(result.rows_affected())
}

async fn load_replay_player_lookup(
    pool: &PgPool,
    replay_id: Uuid,
) -> Result<HashMap<String, Uuid>> {
    sqlx::query(
        r#"
        SELECT id, platform, platform_player_id
        FROM replay_players
        WHERE replay_id = $1
          AND platform IS NOT NULL
          AND platform_player_id IS NOT NULL
        "#,
    )
    .bind(replay_id)
    .fetch_all(pool)
    .await
    .context("failed to load replay player lookup")?
    .into_iter()
    .map(|row| {
        let platform: Option<String> = row.try_get("platform")?;
        let platform_player_id: Option<String> = row.try_get("platform_player_id")?;
        let id: Uuid = row.try_get("id")?;
        let Some(key) = player_lookup_key(&platform, &platform_player_id) else {
            return Err(anyhow!("replay player lookup row had no key"));
        };
        Ok((key, id))
    })
    .collect()
}
