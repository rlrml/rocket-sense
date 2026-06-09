use anyhow::{anyhow, Context, Result};
use apalis::prelude::*;
use apalis_postgres::{Config as ApalisPostgresConfig, PostgresStorage};
use boxcars::{HeaderProp, RemoteId};
use bytes::Bytes;
use chrono::{DateTime, NaiveDateTime, Utc};
use rocket_sense_storage::{sha256_hex, ObjectStorage};
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use std::{
    collections::{BTreeMap, HashMap, HashSet},
    sync::Arc,
};
use subtr_actor::{
    EventCategory, PlayerInfo, ReplayMeta, ReplayProcessor, ReplayStatsTimelineScaffold,
    StatsTimelineEventCollector,
};
use tokio::sync::Semaphore;
use tokio::task::JoinSet;
use uuid::Uuid;

#[cfg(test)]
#[path = "processing_tests.rs"]
mod tests;

const DEFAULT_EXTRACTOR_NAME: &str = "rocket-sense:event-stream";
// Bumped v2 -> v3 when goal ball speed (`ball_speed_at_goal`) was corrected:
// previously every goal recorded 0 because the explosion frame carries no ball
// velocity. Bumping marks prior analyses stale so reprocessing re-emits the
// event stream with real speeds.
const EVENT_STREAM_SCHEMA_VERSION: &str = "rocket-sense-event-stream:v3";
const REPLAY_PROCESSING_QUEUE_NAME: &str = "rocket-sense:replay-processing";
const STATS_TIMELINE_SOURCE: &str = "subtr-actor:stats-timeline";
const ROTATION_PROFILE_TIMING_STREAMS: [&str; 4] = [
    "rotation_player",
    "rotation_role_span",
    "rotation_depth_span",
    "rotation_first_man_stint",
];
const PLAY_EVENT_INSERT_CHUNK_SIZE: usize = 500;
const PLAY_EVENT_JSON_INSERT_CHUNK_SIZE: usize = 1_000;
const PLAY_EVENT_SCALAR_FIELD_INSERT_CHUNK_SIZE: usize = 1_000;
const PLAY_EVENT_SUBJECT_INSERT_CHUNK_SIZE: usize = 1_000;
const PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE: usize = 500;
const NON_INDEXED_TIMELINE_STREAMS: &[&str] = &["goal_tags", "touch_last_touch"];

struct ReplayAnalysisOutput {
    event_stream: Value,
    indexed_events: Vec<IndexedEvent>,
    metadata: ReplaySearchMetadata,
}

#[derive(Debug, Clone)]
struct IndexedEvent {
    event_type_key: String,
    display_name: String,
    category: String,
    source: String,
    source_stream: String,
    source_index: usize,
    source_event_id: String,
    primary_subject: Option<EventSubject>,
    subjects: Vec<EventSubject>,
    team: Option<i32>,
    start_frame: Option<i32>,
    end_frame: Option<i32>,
    event_frame: Option<i32>,
    start_time: Option<f64>,
    end_time: Option<f64>,
    event_time: Option<f64>,
    duration_seconds: Option<f64>,
    confidence: Option<f64>,
    attributes: Value,
    payload: Value,
}

#[derive(Debug, Clone)]
struct EventSubject {
    kind: String,
    id: String,
    role: String,
}

#[derive(Debug, Clone, PartialEq)]
struct EventScalarField {
    source: &'static str,
    path: String,
    value_kind: &'static str,
    string_value: Option<String>,
    numeric_value: Option<f64>,
    boolean_value: Option<bool>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
struct PlayEventInsertOptions {
    payload: bool,
    attributes: bool,
    scalar_fields: bool,
    details: bool,
    subjects: bool,
}

impl PlayEventInsertOptions {
    const FULL: Self = Self {
        payload: true,
        attributes: true,
        scalar_fields: true,
        details: true,
        subjects: true,
    };

    const PROFILE_TIMING_BACKFILL: Self = Self {
        payload: true,
        attributes: false,
        scalar_fields: false,
        details: true,
        subjects: true,
    };
}

#[derive(Clone, Copy)]
struct PreparedIndexedEvent<'a> {
    id: Uuid,
    event: &'a IndexedEvent,
    event_type_id: i32,
}

#[derive(Debug, Clone, PartialEq)]
struct ReplaySearchMetadata {
    playlist: Option<String>,
    game_type: ReplayGameTypeMetadata,
    map_code: Option<String>,
    replay_date: Option<DateTime<Utc>>,
    summary: ReplaySummaryMetadata,
    has_pro_player: bool,
    players: Vec<ReplaySearchPlayer>,
}

#[derive(Debug, Clone, Default, PartialEq)]
struct ReplayGameTypeMetadata {
    replay_game_type: Option<String>,
    header_match_type: Option<String>,
    game_playlist_id: Option<i32>,
    match_type_class: Option<String>,
}

#[derive(Debug, Clone, Default, PartialEq)]
struct ReplaySummaryMetadata {
    duration_seconds: Option<f64>,
    overtime_seconds: Option<f64>,
    team_zero_score: Option<i32>,
    team_one_score: Option<i32>,
    match_guid: Option<String>,
}

#[derive(Debug, Clone, PartialEq)]
struct ReplaySearchPlayer {
    name: String,
    platform: Option<String>,
    platform_player_id: Option<String>,
    team: i32,
    is_pro: bool,
    active_time_seconds: Option<OrderedFloat>,
    time_demolished_seconds: Option<OrderedFloat>,
    time_most_back_seconds: Option<OrderedFloat>,
    time_most_forward_seconds: Option<OrderedFloat>,
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct OrderedFloat(f64);

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
}

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
    needs_rotation_player: bool,
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

pub fn start_replay_processing_workers(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    worker_count: usize,
) {
    let worker_count = worker_count.clamp(1, 4);
    let state = ReplayProcessingWorkerState { pool, storage };

    for worker_index in 0..worker_count {
        let backend = replay_processing_storage(&state.pool);
        let state = state.clone();
        let worker_name = format!("replay-processing-{worker_index}");
        let worker = WorkerBuilder::new(worker_name.clone())
            .backend(backend)
            .data(state)
            .build(process_replay_job);

        tokio::spawn(async move {
            if let Err(error) = worker.run().await {
                tracing::error!(
                    worker = worker_name,
                    error = %error,
                    "replay processing worker stopped"
                );
            }
        });
    }
}

pub async fn enqueue_replay_processing_job(pool: &PgPool, replay_id: Uuid) -> Result<()> {
    let mut backend = replay_processing_storage(pool);
    backend
        .push(ReplayProcessingJob { replay_id })
        .await
        .with_context(|| format!("failed to enqueue replay processing job for {replay_id}"))?;
    Ok(())
}

fn replay_processing_storage(pool: &PgPool) -> PostgresStorage<ReplayProcessingJob> {
    let config = ApalisPostgresConfig::new(REPLAY_PROCESSING_QUEUE_NAME);
    PostgresStorage::new_with_config(pool, &config)
}

async fn process_replay_job(
    job: ReplayProcessingJob,
    state: Data<ReplayProcessingWorkerState>,
) -> Result<(), BoxDynError> {
    let replay_id = job.replay_id;
    tracing::info!(%replay_id, "started queued replay processing job");

    let Some(target) = replay_processing_job_target(&state.pool, replay_id).await? else {
        tracing::info!(
            %replay_id,
            "skipping replay processing job because replay is missing or already parsed"
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

pub async fn enqueue_unfinished_replay_processing(pool: &PgPool) -> Result<usize> {
    let targets = unfinished_replay_processing_targets(pool).await?;
    let enqueued_replays = targets.len();
    for target in targets {
        enqueue_replay_processing_job(pool, target.replay_id).await?;
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
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    permits: Arc<Semaphore>,
    options: ReplayReprocessOptions,
) -> Result<ReplayReprocessSummary> {
    let concurrency = options.concurrency.clamp(1, 4);
    let targets = reprocess_targets(&pool, &options).await?;
    let enqueued_replays = targets.len();
    if !targets.is_empty() {
        spawn_reprocess_worker(pool, storage, permits, targets, concurrency);
    }

    Ok(ReplayReprocessSummary {
        matched_replays: enqueued_replays,
        enqueued_replays,
        skipped_replays: 0,
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
                    let needs_rotation_player = target.needs_rotation_player;
                    tracing::info!(
                        %replay_id,
                        needs_positioning,
                        needs_rotation_player,
                        "queued profile timing backfill"
                    );
                    let _permit = permits
                        .acquire_owned()
                        .await
                        .context("profile timing backfill worker was cancelled before start")?;
                    tracing::info!(
                        %replay_id,
                        needs_positioning,
                        needs_rotation_player,
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

fn spawn_reprocess_worker(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    permits: Arc<Semaphore>,
    targets: Vec<ReplayProcessingTarget>,
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
                    tracing::info!(%replay_id, "queued replay reprocessing");
                    let _permit = permits
                        .acquire_owned()
                        .await
                        .context("replay reprocessing worker was cancelled before start")?;
                    tracing::info!(%replay_id, "started replay reprocessing");
                    let result = process_replay(
                        pool,
                        storage,
                        replay_id,
                        target.file_sha256,
                        target.storage_key,
                    )
                    .await;
                    Ok::<_, anyhow::Error>((replay_id, result))
                });
            }

            let Some(result) = tasks.join_next().await else {
                break;
            };

            match result {
                Ok(Ok((replay_id, Ok(())))) => {
                    succeeded += 1;
                    tracing::info!(
                        %replay_id,
                        succeeded,
                        failed,
                        total,
                        "replay reprocessing succeeded"
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
                        "replay reprocessing failed"
                    );
                }
                Ok(Err(error)) => {
                    failed += 1;
                    tracing::error!(
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "replay reprocessing task failed before start"
                    );
                }
                Err(error) => {
                    failed += 1;
                    tracing::error!(
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "replay reprocessing task panicked"
                    );
                }
            }
        }

        tracing::info!(
            succeeded,
            failed,
            total,
            "replay reprocessing batch finished"
        );
    });
}

async fn unfinished_replay_processing_targets(
    pool: &PgPool,
) -> Result<Vec<ReplayProcessingTarget>> {
    sqlx::query(
        r#"
        SELECT id, file_sha256, storage_key
        FROM replays
        WHERE canonical_analysis_run_id IS NULL
          AND parse_status IN ('pending', 'parsing')
        ORDER BY created_at, id
        "#,
    )
    .fetch_all(pool)
    .await
    .context("failed to list unfinished replay processing targets")?
    .into_iter()
    .map(|row| {
        Ok(ReplayProcessingTarget {
            replay_id: row.try_get("id")?,
            file_sha256: row.try_get("file_sha256")?,
            storage_key: row.try_get("storage_key")?,
        })
    })
    .collect()
}

async fn replay_processing_job_target(
    pool: &PgPool,
    replay_id: Uuid,
) -> Result<Option<ReplayProcessingTarget>> {
    let Some(row) = sqlx::query(
        r#"
        SELECT id, file_sha256, storage_key, parse_status, canonical_analysis_run_id
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

    let parse_status: String = row.try_get("parse_status")?;
    let canonical_analysis_run_id: Option<Uuid> = row.try_get("canonical_analysis_run_id")?;
    if parse_status == "parsed" && canonical_analysis_run_id.is_some() {
        return Ok(None);
    }

    Ok(Some(ReplayProcessingTarget {
        replay_id: row.try_get("id")?,
        file_sha256: row.try_get("file_sha256")?,
        storage_key: row.try_get("storage_key")?,
    }))
}

async fn reprocess_targets(
    pool: &PgPool,
    options: &ReplayReprocessOptions,
) -> Result<Vec<ReplayProcessingTarget>> {
    let mut query = sqlx::QueryBuilder::new(
        r#"
        SELECT
            r.id,
            r.file_sha256,
            r.storage_key
        FROM replays r
        "#,
    );
    let mut has_where = false;

    if !options.replay_ids.is_empty() {
        query.push(" WHERE r.id = ANY(");
        query.push_bind(&options.replay_ids);
        query.push(")");
        has_where = true;
    }

    if !options.force {
        if has_where {
            query.push(" AND ");
        } else {
            query.push(" WHERE ");
        }
        query.push(
            r#"
            (
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
        .build()
        .fetch_all(pool)
        .await
        .context("failed to list replays for reprocessing")?
        .into_iter()
        .map(|row| {
            Ok(ReplayProcessingTarget {
                replay_id: row.try_get("id")?,
                file_sha256: row.try_get("file_sha256")?,
                storage_key: row.try_get("storage_key")?,
            })
        })
        .collect()
}

async fn profile_timing_backfill_targets(
    pool: &PgPool,
    options: &ReplayProfileTimingBackfillOptions,
) -> Result<Vec<ReplayProfileTimingBackfillTarget>> {
    let mut query = sqlx::QueryBuilder::new(
        r#"
        SELECT
            r.id,
            r.storage_key,
            r.canonical_analysis_run_id,
            NOT EXISTS (
                SELECT 1
                FROM play_events event
                WHERE event.analysis_run_id = r.canonical_analysis_run_id
                  AND event.source_stream = 'positioning'
            ) AS needs_positioning,
            (
                NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_role_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_depth_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_first_man_stint'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    JOIN play_event_rotation_player_details detail
                      ON detail.event_id = event.id
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
            ) AS needs_rotation_player
        FROM replays r
        WHERE r.canonical_analysis_run_id IS NOT NULL
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
                NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'positioning'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_role_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_depth_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_first_man_stint'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    JOIN play_event_rotation_player_details detail
                      ON detail.event_id = event.id
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
            )
            "#,
        );
    }

    query.push(" ORDER BY r.created_at, r.id");

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
                needs_rotation_player: options.force || row.try_get("needs_rotation_player")?,
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
        tokio::task::spawn_blocking(move || collect_replay_analysis(replay_bytes.to_vec()))
            .await
            .context("profile timing backfill analysis task panicked")??;
    let mut indexed_events = output
        .indexed_events
        .into_iter()
        .filter(|event| {
            (target.needs_rotation_player
                && is_rotation_profile_timing_stream(&event.source_stream))
                || (target.needs_positioning && event.source_stream == "positioning")
        })
        .collect::<Vec<_>>();
    if indexed_events.is_empty() {
        return Ok(0);
    }

    indexed_events.sort_by_key(|event| match event.source_stream.as_str() {
        "rotation_player" => 0,
        "rotation_role_span" => 1,
        "rotation_depth_span" => 2,
        "rotation_first_man_stint" => 3,
        "positioning" => 4,
        _ => 5,
    });

    if target.needs_rotation_player {
        delete_profile_timing_streams(
            &pool,
            target.analysis_run_id,
            &ROTATION_PROFILE_TIMING_STREAMS,
        )
        .await?;
    }
    if target.needs_positioning {
        delete_profile_timing_streams(&pool, target.analysis_run_id, &["positioning"]).await?;
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

    Ok(inserted)
}

async fn delete_profile_timing_streams(
    pool: &PgPool,
    analysis_run_id: Uuid,
    source_streams: &[&str],
) -> Result<()> {
    let source_streams = source_streams
        .iter()
        .map(|stream| (*stream).to_owned())
        .collect::<Vec<_>>();
    sqlx::query(
        r#"
        DELETE FROM play_events
        WHERE analysis_run_id = $1
          AND source_stream = ANY($2)
        "#,
    )
    .bind(analysis_run_id)
    .bind(&source_streams)
    .execute(pool)
    .await
    .context("failed to delete stale profile timing events")?;
    Ok(())
}

fn is_rotation_profile_timing_stream(source_stream: &str) -> bool {
    ROTATION_PROFILE_TIMING_STREAMS.contains(&source_stream)
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

async fn process_replay(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    replay_id: Uuid,
    file_sha256: String,
    storage_key: String,
) -> Result<()> {
    set_replay_status(&pool, replay_id, "parsing").await?;

    let analysis_run_id = Uuid::now_v7();
    insert_analysis_run(&pool, analysis_run_id, replay_id, &file_sha256).await?;

    let result = async {
        let replay_bytes = storage
            .get(&storage_key)
            .await
            .with_context(|| format!("failed to read replay object `{storage_key}`"))?;
        let output =
            tokio::task::spawn_blocking(move || collect_replay_analysis(replay_bytes.to_vec()))
                .await
                .context("replay analysis task panicked")??;
        let event_stream_bytes = serde_json::to_vec(&output.event_stream)
            .context("failed to serialize replay event stream")?;
        let event_stream_sha256 = sha256_hex(&event_stream_bytes);
        let event_stream_key = event_stream_object_key(&file_sha256, analysis_run_id);
        let stored_event_stream = storage
            .put(&event_stream_key, Bytes::from(event_stream_bytes), None)
            .await
            .context("failed to write replay event stream object")?;

        insert_replay_object(&pool, replay_id, "event_stream", &stored_event_stream).await?;
        update_analysis_run_event_stream(
            &pool,
            analysis_run_id,
            &stored_event_stream.key,
            &event_stream_sha256,
            stored_event_stream.byte_size,
        )
        .await?;
        let replay_players =
            upsert_replay_search_metadata(&pool, replay_id, &output.metadata).await?;
        let event_type_ids = ensure_event_types(&pool, &output.indexed_events).await?;
        insert_play_events(
            &pool,
            analysis_run_id,
            replay_id,
            &output.indexed_events,
            &event_type_ids,
            &replay_players,
        )
        .await?;
        let carried_reviews =
            carry_forward_event_reviews(&pool, replay_id, analysis_run_id).await?;
        if carried_reviews > 0 {
            tracing::info!(
                %replay_id,
                %analysis_run_id,
                carried_reviews,
                "carried forward replay event reviews"
            );
        }
        mark_analysis_run_succeeded(&pool, analysis_run_id).await?;
        mark_replay_parse_succeeded(&pool, replay_id, analysis_run_id).await?;

        Ok::<_, anyhow::Error>(())
    }
    .await;

    if let Err(error) = result {
        let message = error.to_string();
        mark_analysis_run_failed(&pool, analysis_run_id, &message).await?;
        set_replay_status(&pool, replay_id, "failed").await?;
        return Err(error);
    }

    Ok(())
}

struct CarryForwardEventReview {
    event_id: Uuid,
    replay_id: Uuid,
    reviewer_user_id: Option<Uuid>,
    status: String,
    reviewed_event_type_key: Option<String>,
    reviewed_subject_kind: Option<String>,
    reviewed_subject_id: Option<String>,
    reviewed_start_frame: Option<i32>,
    reviewed_end_frame: Option<i32>,
    reviewed_event_frame: Option<i32>,
    confidence: Option<f64>,
    notes: Option<String>,
    source_review_id: Uuid,
    carry_forward_distance_frames: Option<i32>,
    event_snapshot: Value,
}

async fn carry_forward_event_reviews(
    pool: &PgPool,
    replay_id: Uuid,
    analysis_run_id: Uuid,
) -> Result<usize> {
    let rows = sqlx::query(
        r#"
        WITH previous_canonical AS (
            SELECT canonical_analysis_run_id
            FROM replays
            WHERE id = $1
              AND canonical_analysis_run_id IS NOT NULL
              AND canonical_analysis_run_id <> $2
        ),
        latest_previous_reviews AS (
            SELECT DISTINCT ON (review.event_id)
                review.id AS source_review_id,
                review.reviewer_user_id,
                review.status,
                review.reviewed_event_type_key,
                review.reviewed_subject_kind,
                review.reviewed_subject_id,
                review.reviewed_start_frame,
                review.reviewed_end_frame,
                review.reviewed_event_frame,
                review.confidence AS reviewed_confidence,
                review.notes,
                old_event.event_type_id,
                old_event.source,
                old_event.source_stream,
                old_event.source_index,
                old_event.source_event_id,
                old_event.primary_subject_kind,
                old_event.primary_subject_id,
                old_event.start_frame,
                old_event.end_frame,
                old_event.event_frame
            FROM event_reviews review
            JOIN play_events old_event
              ON old_event.id = review.event_id
            JOIN previous_canonical previous
              ON previous.canonical_analysis_run_id = old_event.analysis_run_id
            ORDER BY review.event_id, review.created_at DESC, review.id DESC
        )
        SELECT
            new_event.id AS event_id,
            new_event.replay_id,
            previous.reviewer_user_id,
            previous.status,
            COALESCE(previous.reviewed_event_type_key, event_type.key) AS reviewed_event_type_key,
            COALESCE(previous.reviewed_subject_kind, new_event.primary_subject_kind) AS reviewed_subject_kind,
            COALESCE(previous.reviewed_subject_id, new_event.primary_subject_id) AS reviewed_subject_id,
            COALESCE(previous.reviewed_start_frame, new_event.start_frame) AS reviewed_start_frame,
            COALESCE(previous.reviewed_end_frame, new_event.end_frame) AS reviewed_end_frame,
            COALESCE(previous.reviewed_event_frame, new_event.event_frame) AS reviewed_event_frame,
            COALESCE(previous.reviewed_confidence, new_event.confidence) AS confidence,
            previous.notes,
            previous.source_review_id,
            CASE
                WHEN previous.reviewed_event_frame IS NULL OR new_event.event_frame IS NULL THEN NULL
                ELSE abs(previous.reviewed_event_frame - new_event.event_frame)
            END AS carry_forward_distance_frames,
            jsonb_strip_nulls(jsonb_build_object(
                'id', new_event.id,
                'analysisRunId', new_event.analysis_run_id,
                'replayId', new_event.replay_id,
                'eventType', jsonb_build_object(
                    'key', event_type.key,
                    'displayName', event_type.display_name,
                    'category', event_type.category
                ),
                'source', new_event.source,
                'sourceStream', new_event.source_stream,
                'sourceIndex', new_event.source_index,
                'sourceEventId', new_event.source_event_id,
                'primarySubject', CASE
                    WHEN new_event.primary_subject_kind IS NULL THEN NULL
                    ELSE jsonb_build_object(
                        'kind', new_event.primary_subject_kind,
                        'id', new_event.primary_subject_id
                    )
                END,
                'team', new_event.team,
                'frames', jsonb_strip_nulls(jsonb_build_object(
                    'start', new_event.start_frame,
                    'end', new_event.end_frame,
                    'event', new_event.event_frame
                )),
                'times', jsonb_strip_nulls(jsonb_build_object(
                    'start', new_event.start_time,
                    'end', new_event.end_time,
                    'event', new_event.event_time,
                    'duration', new_event.duration_seconds
                )),
                'confidence', new_event.confidence,
                'payload', COALESCE(payload.payload, '{}'::jsonb),
                'attributes', COALESCE(attributes.attributes, '{}'::jsonb),
                'mechanicDetails', CASE
                    WHEN mechanic_detail.event_id IS NULL THEN NULL
                    ELSE jsonb_build_object(
                        'mechanic', mechanic_detail.mechanic,
                        'properties', mechanic_detail.properties
                    )
                END,
                'createdAt', new_event.created_at
            )) AS event_snapshot
        FROM latest_previous_reviews previous
        JOIN play_events new_event
          ON new_event.analysis_run_id = $2
         AND new_event.event_type_id = previous.event_type_id
         AND new_event.source = previous.source
         AND new_event.source_stream = previous.source_stream
         AND new_event.source_index = previous.source_index
         AND COALESCE(new_event.source_event_id, '') = COALESCE(previous.source_event_id, '')
         AND COALESCE(new_event.primary_subject_kind, '') = COALESCE(previous.primary_subject_kind, '')
         AND COALESCE(new_event.primary_subject_id, '') = COALESCE(previous.primary_subject_id, '')
         AND COALESCE(new_event.start_frame, -1) = COALESCE(previous.start_frame, -1)
         AND COALESCE(new_event.end_frame, -1) = COALESCE(previous.end_frame, -1)
         AND COALESCE(new_event.event_frame, -1) = COALESCE(previous.event_frame, -1)
        JOIN event_types event_type
          ON event_type.id = new_event.event_type_id
        LEFT JOIN play_event_payloads payload
          ON payload.event_id = new_event.id
        LEFT JOIN play_event_attributes attributes
          ON attributes.event_id = new_event.id
        LEFT JOIN play_event_mechanic_details mechanic_detail
          ON mechanic_detail.event_id = new_event.id
        WHERE NOT EXISTS (
            SELECT 1
            FROM event_reviews existing_review
            WHERE existing_review.event_id = new_event.id
        )
        "#,
    )
    .bind(replay_id)
    .bind(analysis_run_id)
    .fetch_all(pool)
    .await
    .context("failed to find replay event reviews to carry forward")?;

    let reviews = rows
        .into_iter()
        .map(|row| {
            Ok(CarryForwardEventReview {
                event_id: row.try_get("event_id")?,
                replay_id: row.try_get("replay_id")?,
                reviewer_user_id: row.try_get("reviewer_user_id")?,
                status: row.try_get("status")?,
                reviewed_event_type_key: row.try_get("reviewed_event_type_key")?,
                reviewed_subject_kind: row.try_get("reviewed_subject_kind")?,
                reviewed_subject_id: row.try_get("reviewed_subject_id")?,
                reviewed_start_frame: row.try_get("reviewed_start_frame")?,
                reviewed_end_frame: row.try_get("reviewed_end_frame")?,
                reviewed_event_frame: row.try_get("reviewed_event_frame")?,
                confidence: row.try_get("confidence")?,
                notes: row.try_get("notes")?,
                source_review_id: row.try_get("source_review_id")?,
                carry_forward_distance_frames: row.try_get("carry_forward_distance_frames")?,
                event_snapshot: row.try_get("event_snapshot")?,
            })
        })
        .collect::<std::result::Result<Vec<_>, sqlx::Error>>()
        .context("failed to read replay event reviews to carry forward")?;

    if reviews.is_empty() {
        return Ok(0);
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO event_reviews (
            id,
            event_id,
            replay_id,
            reviewer_user_id,
            status,
            reviewed_event_type_key,
            reviewed_subject_kind,
            reviewed_subject_id,
            reviewed_start_frame,
            reviewed_end_frame,
            reviewed_event_frame,
            confidence,
            notes,
            source_review_id,
            carry_forward_method,
            carry_forward_distance_frames,
            event_snapshot
        )
        "#,
    );
    query.push_values(&reviews, |mut row, review| {
        row.push_bind(Uuid::now_v7())
            .push_bind(review.event_id)
            .push_bind(review.replay_id)
            .push_bind(review.reviewer_user_id)
            .push_bind(&review.status)
            .push_bind(&review.reviewed_event_type_key)
            .push_bind(&review.reviewed_subject_kind)
            .push_bind(&review.reviewed_subject_id)
            .push_bind(review.reviewed_start_frame)
            .push_bind(review.reviewed_end_frame)
            .push_bind(review.reviewed_event_frame)
            .push_bind(review.confidence)
            .push_bind(&review.notes)
            .push_bind(review.source_review_id)
            .push_bind("exact_event_identity")
            .push_bind(review.carry_forward_distance_frames)
            .push_bind(&review.event_snapshot);
    });
    query
        .build()
        .execute(pool)
        .await
        .context("failed to carry forward replay event reviews")?;

    Ok(reviews.len())
}

fn collect_replay_analysis(replay_bytes: Vec<u8>) -> Result<ReplayAnalysisOutput> {
    let replay = boxcars::ParserBuilder::new(&replay_bytes)
        .must_parse_network_data()
        .on_error_check_crc()
        .parse()
        .context("failed to parse replay")?;
    let timeline = StatsTimelineEventCollector::new()
        .get_replay_stats_timeline_scaffold(&replay)
        .map_err(|error| anyhow!("failed to collect replay event timeline: {error:?}"))?;
    let metadata = replay_search_metadata(&timeline);
    let timeline_events_value = serde_json::to_value(&timeline.events)
        .context("failed to serialize replay timeline events")?;
    let event_stream = serde_json::json!({
        "schema_version": EVENT_STREAM_SCHEMA_VERSION,
        "source": {
            "extractor_name": DEFAULT_EXTRACTOR_NAME,
            "extractor_version": env!("CARGO_PKG_VERSION"),
            "subtr_actor_version": subtr_actor_version(),
            "subtr_actor_git_sha": option_env!("SUBTR_ACTOR_GIT_SHA"),
            "rocket_sense_git_sha": option_env!("GIT_SHA")
        },
        "replay_meta": timeline.replay_meta.clone(),
        "timeline_events": timeline_events_value
    });
    let indexed_events = build_indexed_events(&timeline)?;

    Ok(ReplayAnalysisOutput {
        event_stream,
        indexed_events,
        metadata,
    })
}

fn collect_replay_preflight_metadata(replay_bytes: Vec<u8>) -> Result<ReplaySearchMetadata> {
    let replay = boxcars::ParserBuilder::new(&replay_bytes)
        .must_parse_network_data()
        .on_error_check_crc()
        .parse()
        .context("failed to parse replay")?;
    let mut processor = ReplayProcessor::new(&replay)
        .map_err(|error| anyhow!("failed to inspect replay: {error:?}"))?;
    let replay_meta = processor
        .process_and_get_replay_meta()
        .map_err(|error| anyhow!("failed to collect replay metadata: {error:?}"))?;

    Ok(replay_search_metadata_from_meta(&replay_meta))
}

fn replay_search_metadata(timeline: &ReplayStatsTimelineScaffold) -> ReplaySearchMetadata {
    let replay_meta = &timeline.replay_meta;
    let playlist = replay_playlist(replay_meta);
    let map_code = header_text(&replay_meta.all_headers, &["MapName", "Map", "LevelName"])
        .map(normalize_header_value);
    let replay_date = header_text(
        &replay_meta.all_headers,
        &["Date", "ReplayDate", "RecordDate"],
    )
    .and_then(|value| parse_replay_date(&value));
    let mut players = replay_meta
        .team_zero
        .iter()
        .map(|player| replay_search_player(player, 0))
        .chain(
            replay_meta
                .team_one
                .iter()
                .map(|player| replay_search_player(player, 1)),
        )
        .collect::<Vec<_>>();
    apply_player_timing_metadata(&mut players, timeline);
    let has_pro_player = players.iter().any(|player| player.is_pro);

    ReplaySearchMetadata {
        playlist,
        game_type: replay_game_type_metadata(replay_meta),
        map_code,
        replay_date,
        summary: replay_summary_metadata(timeline),
        has_pro_player,
        players,
    }
}

fn replay_search_metadata_from_meta(replay_meta: &ReplayMeta) -> ReplaySearchMetadata {
    let playlist = replay_playlist(replay_meta);
    let map_code = header_text(&replay_meta.all_headers, &["MapName", "Map", "LevelName"])
        .map(normalize_header_value);
    let replay_date = header_text(
        &replay_meta.all_headers,
        &["Date", "ReplayDate", "RecordDate"],
    )
    .and_then(|value| parse_replay_date(&value));
    let players = replay_meta
        .team_zero
        .iter()
        .map(|player| replay_search_player(player, 0))
        .chain(
            replay_meta
                .team_one
                .iter()
                .map(|player| replay_search_player(player, 1)),
        )
        .collect::<Vec<_>>();
    let has_pro_player = players.iter().any(|player| player.is_pro);

    ReplaySearchMetadata {
        playlist,
        game_type: replay_game_type_metadata(replay_meta),
        map_code,
        replay_date,
        summary: replay_summary_metadata_from_meta(replay_meta),
        has_pro_player,
        players,
    }
}

fn replay_search_player(player: &PlayerInfo, team: i32) -> ReplaySearchPlayer {
    let (platform, platform_player_id) = remote_id_parts(&player.remote_id);

    ReplaySearchPlayer {
        name: player.name.clone(),
        platform,
        platform_player_id,
        team,
        is_pro: false,
        active_time_seconds: None,
        time_demolished_seconds: None,
        time_most_back_seconds: None,
        time_most_forward_seconds: None,
    }
}

fn replay_game_type_metadata(replay_meta: &ReplayMeta) -> ReplayGameTypeMetadata {
    ReplayGameTypeMetadata {
        replay_game_type: Some(replay_game_type_slug(replay_meta.game_type.game_type).to_owned()),
        header_match_type: replay_meta.game_type.header_match_type.clone(),
        game_playlist_id: replay_meta.game_type.playlist_id,
        match_type_class: replay_meta.game_type.match_type_class.clone(),
    }
}

fn replay_game_type_slug(game_type: subtr_actor::ReplayGameType) -> &'static str {
    match game_type {
        subtr_actor::ReplayGameType::Ranked => "ranked",
        subtr_actor::ReplayGameType::Casual => "casual",
        subtr_actor::ReplayGameType::Private => "private",
        subtr_actor::ReplayGameType::Offline => "offline",
        subtr_actor::ReplayGameType::Lan => "lan",
        subtr_actor::ReplayGameType::Tournament => "tournament",
        subtr_actor::ReplayGameType::Unknown => "unknown",
    }
}

fn replay_summary_metadata(timeline: &ReplayStatsTimelineScaffold) -> ReplaySummaryMetadata {
    let last_frame = timeline.frames.last();
    let duration_seconds = last_frame
        .map(|frame| f64::from(frame.time))
        .filter(|seconds| seconds.is_finite() && *seconds >= 0.0);
    let overtime_seconds = last_frame
        .and_then(|frame| frame.seconds_remaining)
        .filter(|seconds_remaining| *seconds_remaining < 0)
        .map(|seconds_remaining| f64::from(-seconds_remaining));

    ReplaySummaryMetadata {
        duration_seconds,
        overtime_seconds,
        team_zero_score: Some(team_score_from_events(timeline, true)),
        team_one_score: Some(team_score_from_events(timeline, false)),
        match_guid: header_text(
            &timeline.replay_meta.all_headers,
            &["Id", "MatchGuid", "MatchGUID", "ReplayId"],
        )
        .map(normalize_header_value)
        .filter(|value| !value.trim().is_empty()),
    }
}

fn replay_summary_metadata_from_meta(replay_meta: &ReplayMeta) -> ReplaySummaryMetadata {
    ReplaySummaryMetadata {
        match_guid: header_text(
            &replay_meta.all_headers,
            &["Id", "MatchGuid", "MatchGUID", "ReplayId"],
        )
        .map(normalize_header_value)
        .filter(|value| !value.trim().is_empty()),
        ..ReplaySummaryMetadata::default()
    }
}

fn team_score_from_events(timeline: &ReplayStatsTimelineScaffold, is_team_0: bool) -> i32 {
    timeline
        .events
        .events
        .iter()
        .filter_map(|event| match &event.payload {
            subtr_actor::EventPayload::CorePlayer(event) => Some(event),
            _ => None,
        })
        .filter(|event| event.is_team_0 == is_team_0)
        .map(|event| event.goals_delta)
        .sum()
}

fn apply_player_timing_metadata(
    players: &mut [ReplaySearchPlayer],
    timeline: &ReplayStatsTimelineScaffold,
) {
    let mut timing_by_key = HashMap::<String, PlayerTimingMetadata>::new();
    for event in timeline
        .events
        .events
        .iter()
        .filter_map(|event| match &event.payload {
            subtr_actor::EventPayload::PositioningActivity(event) => Some(event),
            _ => None,
        })
    {
        let (platform, platform_player_id) = remote_id_parts(&event.player);
        let Some(key) = player_lookup_key(&platform, &platform_player_id) else {
            continue;
        };
        let timing = timing_by_key.entry(key).or_default();
        let duration = f64::from(event.duration);
        if event.active {
            timing.active_time += duration;
        }
        if event.demolished {
            timing.time_demolished += duration;
        }
    }

    for event in timeline
        .events
        .events
        .iter()
        .filter_map(|event| match &event.payload {
            subtr_actor::EventPayload::PositioningTeammateRole(event) => Some(event),
            _ => None,
        })
    {
        let (platform, platform_player_id) = remote_id_parts(&event.player);
        let Some(key) = player_lookup_key(&platform, &platform_player_id) else {
            continue;
        };
        let timing = timing_by_key.entry(key).or_default();
        let duration = f64::from(event.duration);
        match event.teammate_role {
            subtr_actor::PositioningTeammateRoleState::MostBack => {
                timing.time_most_back += duration;
            }
            subtr_actor::PositioningTeammateRoleState::MostForward => {
                timing.time_most_forward += duration;
            }
            subtr_actor::PositioningTeammateRoleState::NoTeammates
            | subtr_actor::PositioningTeammateRoleState::Mid
            | subtr_actor::PositioningTeammateRoleState::Other
            | subtr_actor::PositioningTeammateRoleState::Unknown => {}
        }
    }

    let known_player_keys = timeline
        .frames
        .last()
        .into_iter()
        .flat_map(|frame| frame.players.iter())
        .filter_map(|player| {
            let (platform, platform_player_id) = remote_id_parts(&player.player_id);
            player_lookup_key(&platform, &platform_player_id)
        })
        .collect::<Vec<_>>();
    for key in known_player_keys {
        timing_by_key.entry(key).or_default();
    }

    for player in players {
        let Some(key) = player_lookup_key(&player.platform, &player.platform_player_id) else {
            continue;
        };
        let Some(timing) = timing_by_key.get(&key).copied() else {
            continue;
        };
        player.active_time_seconds = finite_nonnegative(timing.active_time).map(OrderedFloat);
        player.time_demolished_seconds =
            finite_nonnegative(timing.time_demolished).map(OrderedFloat);
        player.time_most_back_seconds = finite_nonnegative(timing.time_most_back).map(OrderedFloat);
        player.time_most_forward_seconds =
            finite_nonnegative(timing.time_most_forward).map(OrderedFloat);
    }
}

#[derive(Debug, Clone, Copy, Default)]
struct PlayerTimingMetadata {
    active_time: f64,
    time_demolished: f64,
    time_most_back: f64,
    time_most_forward: f64,
}

fn finite_nonnegative(value: f64) -> Option<f64> {
    value.is_finite().then_some(value.max(0.0))
}

fn remote_id_parts(remote_id: &RemoteId) -> (Option<String>, Option<String>) {
    match remote_id {
        RemoteId::PlayStation(id) => (Some("ps4".to_owned()), Some(id.online_id.to_string())),
        RemoteId::PsyNet(id) => (Some("psynet".to_owned()), Some(id.online_id.to_string())),
        RemoteId::SplitScreen(id) => (Some("splitscreen".to_owned()), Some(id.to_string())),
        RemoteId::Steam(id) => (Some("steam".to_owned()), Some(id.to_string())),
        RemoteId::Switch(id) => (Some("switch".to_owned()), Some(id.online_id.to_string())),
        RemoteId::Xbox(id) => (Some("xbox".to_owned()), Some(id.to_string())),
        RemoteId::QQ(id) => (Some("qq".to_owned()), Some(id.to_string())),
        RemoteId::Epic(id) => (Some("epic".to_owned()), Some(id.clone())),
    }
}

fn player_lookup_key(
    platform: &Option<String>,
    platform_player_id: &Option<String>,
) -> Option<String> {
    platform
        .as_deref()
        .zip(platform_player_id.as_deref())
        .map(|(platform, platform_player_id)| format!("{platform}:{platform_player_id}"))
}

fn header_text(headers: &[(String, HeaderProp)], keys: &[&str]) -> Option<String> {
    keys.iter().find_map(|key| {
        headers
            .iter()
            .find(|(name, _)| name.eq_ignore_ascii_case(key))
            .and_then(|(_, value)| header_prop_text(value))
    })
}

fn replay_playlist(replay_meta: &ReplayMeta) -> Option<String> {
    replay_playlist_from_game_type(replay_meta).or_else(|| {
        playlist_header_text(replay_meta, &["PlaylistName", "GamePlaylist"])
            .or_else(|| playlist_header_text(replay_meta, &["Playlist", "MatchType"]))
            .map(normalize_playlist)
            .and_then(|playlist| {
                if playlist.eq_ignore_ascii_case("online") {
                    online_playlist_from_team_size(replay_meta).or(Some(playlist))
                } else {
                    Some(playlist)
                }
            })
    })
}

fn replay_playlist_from_game_type(replay_meta: &ReplayMeta) -> Option<String> {
    match replay_meta.game_type.game_type {
        subtr_actor::ReplayGameType::Ranked | subtr_actor::ReplayGameType::Casual => replay_meta
            .game_type
            .playlist_id
            .map(|playlist_id| normalize_playlist(playlist_id.to_string())),
        subtr_actor::ReplayGameType::Private => Some("private".to_owned()),
        subtr_actor::ReplayGameType::Offline => Some("offline".to_owned()),
        subtr_actor::ReplayGameType::Lan => Some("lan".to_owned()),
        subtr_actor::ReplayGameType::Tournament => Some("tournament".to_owned()),
        subtr_actor::ReplayGameType::Unknown => None,
    }
}

fn playlist_header_text(replay_meta: &ReplayMeta, keys: &[&str]) -> Option<String> {
    header_text(&replay_meta.all_headers, keys).and_then(|value| {
        let trimmed = value.trim();
        if trimmed.is_empty() {
            None
        } else {
            Some(trimmed.to_owned())
        }
    })
}

fn online_playlist_from_team_size(replay_meta: &ReplayMeta) -> Option<String> {
    let team_size = replay_meta.team_zero.len().max(replay_meta.team_one.len());
    match team_size {
        1..=4 => Some(format!("online-{team_size}v{team_size}")),
        _ => None,
    }
}

fn header_prop_text(value: &HeaderProp) -> Option<String> {
    match value {
        HeaderProp::Name(value) | HeaderProp::Str(value) => Some(value.clone()),
        HeaderProp::Byte { kind, value } => value.clone().or_else(|| Some(kind.clone())),
        HeaderProp::Int(value) => Some(value.to_string()),
        HeaderProp::QWord(value) => Some(value.to_string()),
        HeaderProp::Float(value) => Some(value.to_string()),
        HeaderProp::Bool(value) => Some(value.to_string()),
        HeaderProp::Struct { fields, .. } => {
            fields.iter().find_map(|(_, value)| header_prop_text(value))
        }
        HeaderProp::Array(_) => None,
    }
}

fn normalize_header_value(value: String) -> String {
    value.trim().to_owned()
}

fn normalize_playlist(value: String) -> String {
    let trimmed = value.trim();
    let key = trimmed
        .to_ascii_lowercase()
        .replace(['_', '-'], " ")
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ");

    match key.as_str() {
        "1" | "casual duel" | "casual duels" | "unranked duel" | "unranked duels" => {
            "unranked-duels".to_owned()
        }
        "2" | "casual doubles" | "unranked doubles" => "unranked-doubles".to_owned(),
        "3" | "casual standard" | "unranked standard" => "unranked-standard".to_owned(),
        "4" | "chaos" | "casual chaos" | "unranked chaos" => "unranked-chaos".to_owned(),
        "6" => "private".to_owned(),
        "8" => "offline".to_owned(),
        "10" | "duel" | "duels" | "ranked duel" | "ranked duels" => "ranked-duels".to_owned(),
        "11" | "ranked doubles" => "ranked-doubles".to_owned(),
        "12" | "ranked solo standard" => "ranked-solo-standard".to_owned(),
        "13" | "standard" | "ranked standard" => "ranked-standard".to_owned(),
        "15" => "snowday".to_owned(),
        "16" | "rocket labs" | "rocketlabs" => "rocketlabs".to_owned(),
        "17" => "hoops".to_owned(),
        "22" | "tournament" => "tournament".to_owned(),
        "23" => "unranked-standard".to_owned(),
        "25" => "dropshot".to_owned(),
        "27" | "hoops" | "ranked hoops" => "ranked-hoops".to_owned(),
        "28" | "rumble" | "ranked rumble" => "ranked-rumble".to_owned(),
        "29" | "dropshot" | "ranked dropshot" => "ranked-dropshot".to_owned(),
        "30" | "snowday" | "snow day" | "ranked snowday" | "ranked snow day" => {
            "ranked-snowday".to_owned()
        }
        "34" | "tournament ranked" | "ranked tournament" => "tournament".to_owned(),
        "37" | "dropshot rumble" => "dropshot-rumble".to_owned(),
        "38" | "heatseeker" => "heatseeker".to_owned(),
        "online" => "online".to_owned(),
        "private" => "private".to_owned(),
        "season" => "season".to_owned(),
        "offline" => "offline".to_owned(),
        _ => trimmed.to_owned(),
    }
}

fn parse_replay_date(value: &str) -> Option<DateTime<Utc>> {
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

async fn upsert_replay_search_metadata(
    pool: &PgPool,
    replay_id: Uuid,
    metadata: &ReplaySearchMetadata,
) -> Result<HashMap<String, Uuid>> {
    sqlx::query(
        r#"
        UPDATE replays
        SET playlist = $2,
            replay_game_type = $3,
            header_match_type = $4,
            game_playlist_id = $5,
            match_type_class = $6,
            map_code = COALESCE($7, map_code),
            replay_date = COALESCE($8, replay_date),
            duration_seconds = COALESCE($9, duration_seconds),
            overtime_seconds = COALESCE($10, overtime_seconds),
            team_zero_score = COALESCE($11, team_zero_score),
            team_one_score = COALESCE($12, team_one_score),
            match_guid = COALESCE($13, match_guid),
            has_pro_player = has_pro_player OR $14,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .bind(&metadata.playlist)
    .bind(&metadata.game_type.replay_game_type)
    .bind(&metadata.game_type.header_match_type)
    .bind(metadata.game_type.game_playlist_id)
    .bind(&metadata.game_type.match_type_class)
    .bind(&metadata.map_code)
    .bind(metadata.replay_date)
    .bind(metadata.summary.duration_seconds)
    .bind(metadata.summary.overtime_seconds)
    .bind(metadata.summary.team_zero_score)
    .bind(metadata.summary.team_one_score)
    .bind(&metadata.summary.match_guid)
    .bind(metadata.has_pro_player)
    .execute(pool)
    .await
    .context("failed to update replay search metadata")?;

    sqlx::query("DELETE FROM replay_players WHERE replay_id = $1")
        .bind(replay_id)
        .execute(pool)
        .await
        .context("failed to replace replay players")?;

    let mut replay_players = HashMap::new();
    for player in &metadata.players {
        let replay_player_id = Uuid::now_v7();
        sqlx::query(
            r#"
            INSERT INTO replay_players (
                id,
                replay_id,
                name,
                platform,
                platform_player_id,
                team,
                is_pro,
                active_time_seconds,
                time_demolished_seconds,
                time_most_back_seconds,
                time_most_forward_seconds
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            "#,
        )
        .bind(replay_player_id)
        .bind(replay_id)
        .bind(&player.name)
        .bind(&player.platform)
        .bind(&player.platform_player_id)
        .bind(player.team)
        .bind(player.is_pro)
        .bind(player.active_time_seconds.map(|value| value.0))
        .bind(player.time_demolished_seconds.map(|value| value.0))
        .bind(player.time_most_back_seconds.map(|value| value.0))
        .bind(player.time_most_forward_seconds.map(|value| value.0))
        .execute(pool)
        .await
        .context("failed to insert replay player")?;

        if let Some(key) = player_lookup_key(&player.platform, &player.platform_player_id) {
            replay_players.entry(key).or_insert(replay_player_id);
        }
    }

    Ok(replay_players)
}

async fn insert_analysis_run(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    file_sha256: &str,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO analysis_runs (
            id,
            replay_id,
            status,
            extractor_name,
            extractor_version,
            extractor_git_sha,
            subtr_actor_version,
            subtr_actor_git_sha,
            rocket_sense_git_sha,
            input_file_sha256,
            event_stream_schema_version
        )
        VALUES ($1, $2, 'running', $3, $4, $5, $6, $7, $8, $9, $10)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(DEFAULT_EXTRACTOR_NAME)
    .bind(env!("CARGO_PKG_VERSION"))
    .bind(option_env!("GIT_SHA"))
    .bind(subtr_actor_version())
    .bind(option_env!("SUBTR_ACTOR_GIT_SHA"))
    .bind(option_env!("GIT_SHA"))
    .bind(file_sha256)
    .bind(EVENT_STREAM_SCHEMA_VERSION)
    .execute(pool)
    .await
    .context("failed to insert analysis run")?;

    Ok(())
}

async fn insert_replay_object(
    pool: &PgPool,
    replay_id: Uuid,
    kind: &str,
    stored: &rocket_sense_storage::StoredObject,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO replay_objects (
            id,
            replay_id,
            kind,
            storage_key,
            content_type,
            byte_size,
            sha256
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (replay_id, kind, storage_key) DO NOTHING
        "#,
    )
    .bind(Uuid::now_v7())
    .bind(replay_id)
    .bind(kind)
    .bind(&stored.key)
    .bind(stored.content_type.as_ref().map(ToString::to_string))
    .bind(stored.byte_size as i64)
    .bind(&stored.sha256)
    .execute(pool)
    .await
    .context("failed to insert replay object")?;

    Ok(())
}

async fn update_analysis_run_event_stream(
    pool: &PgPool,
    analysis_run_id: Uuid,
    event_stream_object_key: &str,
    event_stream_sha256: &str,
    event_stream_byte_size: u64,
) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE analysis_runs
        SET event_stream_object_key = $2,
            event_stream_sha256 = $3,
            event_stream_byte_size = $4,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(analysis_run_id)
    .bind(event_stream_object_key)
    .bind(event_stream_sha256)
    .bind(event_stream_byte_size as i64)
    .execute(pool)
    .await
    .context("failed to update analysis run event stream metadata")?;

    Ok(())
}

async fn ensure_event_types(
    pool: &PgPool,
    events: &[IndexedEvent],
) -> Result<HashMap<String, i32>> {
    let mut event_type_ids = HashMap::new();
    let mut event_types = BTreeMap::<String, (&str, &str)>::new();
    for event in events {
        event_types
            .entry(event.event_type_key.clone())
            .or_insert((&event.display_name, &event.category));
    }

    for (key, (display_name, category)) in event_types {
        let row = sqlx::query(
            r#"
            INSERT INTO event_types (
                key,
                display_name,
                category
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (key)
            DO UPDATE SET
                display_name = EXCLUDED.display_name,
                category = EXCLUDED.category,
                updated_at = now()
            RETURNING id
            "#,
        )
        .bind(&key)
        .bind(display_name)
        .bind(category)
        .fetch_one(pool)
        .await
        .with_context(|| format!("failed to ensure event type `{key}`"))?;

        event_type_ids.insert(key, row.try_get("id")?);
    }

    Ok(event_type_ids)
}

async fn insert_play_events(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
    replay_players: &HashMap<String, Uuid>,
) -> Result<usize> {
    insert_play_events_with_options(
        pool,
        analysis_run_id,
        replay_id,
        events,
        event_type_ids,
        replay_players,
        PlayEventInsertOptions::FULL,
    )
    .await
}

async fn insert_play_events_with_options(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
    replay_players: &HashMap<String, Uuid>,
    options: PlayEventInsertOptions,
) -> Result<usize> {
    if options == PlayEventInsertOptions::FULL {
        return insert_play_events_batched(
            pool,
            analysis_run_id,
            replay_id,
            events,
            event_type_ids,
            replay_players,
        )
        .await;
    }

    insert_play_events_row_by_row(
        pool,
        analysis_run_id,
        replay_id,
        events,
        event_type_ids,
        replay_players,
        options,
    )
    .await
}

async fn insert_play_events_batched(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
    replay_players: &HashMap<String, Uuid>,
) -> Result<usize> {
    let prepared_events = prepare_indexed_events(events, event_type_ids);
    if prepared_events.is_empty() {
        return Ok(0);
    }

    let inserted_event_ids =
        insert_play_event_rows(pool, analysis_run_id, replay_id, &prepared_events)
            .await
            .context("failed to insert play event rows")?;
    let inserted_events = prepared_events
        .iter()
        .copied()
        .filter(|prepared| inserted_event_ids.contains(&prepared.id))
        .collect::<Vec<_>>();

    insert_play_event_payload_rows(pool, &inserted_events).await?;
    insert_play_event_attribute_rows(pool, &inserted_events).await?;
    insert_play_event_scalar_field_rows_for_events(pool, &inserted_events).await?;
    insert_play_event_detail_rows(pool, replay_id, &inserted_events, replay_players).await?;
    insert_play_event_subject_rows(pool, &inserted_events, replay_players).await?;

    Ok(inserted_events.len())
}

fn prepare_indexed_events<'a>(
    events: &'a [IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
) -> Vec<PreparedIndexedEvent<'a>> {
    events
        .iter()
        .filter_map(|event| {
            event_type_ids
                .get(&event.event_type_key)
                .copied()
                .map(|event_type_id| PreparedIndexedEvent {
                    id: Uuid::now_v7(),
                    event,
                    event_type_id,
                })
        })
        .collect()
}

async fn insert_play_event_rows(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[PreparedIndexedEvent<'_>],
) -> Result<HashSet<Uuid>> {
    let mut inserted = HashSet::with_capacity(events.len());
    for chunk in events.chunks(PLAY_EVENT_INSERT_CHUNK_SIZE) {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            INSERT INTO play_events (
                id,
                analysis_run_id,
                replay_id,
                event_type_id,
                source,
                source_stream,
                source_index,
                source_event_id,
                primary_subject_kind,
                primary_subject_id,
                team,
                start_frame,
                end_frame,
                event_frame,
                start_time,
                end_time,
                event_time,
                duration_seconds,
                confidence
            )
            "#,
        );
        query.push_values(chunk, |mut row, prepared| {
            let event = prepared.event;
            row.push_bind(prepared.id)
                .push_bind(analysis_run_id)
                .push_bind(replay_id)
                .push_bind(prepared.event_type_id)
                .push_bind(&event.source)
                .push_bind(&event.source_stream)
                .push_bind(event.source_index as i32)
                .push_bind(&event.source_event_id)
                .push_bind(
                    event
                        .primary_subject
                        .as_ref()
                        .map(|subject| subject.kind.as_str()),
                )
                .push_bind(
                    event
                        .primary_subject
                        .as_ref()
                        .map(|subject| subject.id.as_str()),
                )
                .push_bind(event.team)
                .push_bind(event.start_frame)
                .push_bind(event.end_frame)
                .push_bind(event.event_frame)
                .push_bind(event.start_time)
                .push_bind(event.end_time)
                .push_bind(event.event_time)
                .push_bind(event.duration_seconds)
                .push_bind(event.confidence);
        });
        query.push(" ON CONFLICT DO NOTHING RETURNING id");
        for row in query
            .build()
            .fetch_all(pool)
            .await
            .context("failed to batch insert play events")?
        {
            inserted.insert(row.try_get("id")?);
        }
    }

    Ok(inserted)
}

async fn insert_play_event_payload_rows(
    pool: &PgPool,
    events: &[PreparedIndexedEvent<'_>],
) -> Result<()> {
    for chunk in events.chunks(PLAY_EVENT_JSON_INSERT_CHUNK_SIZE) {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            INSERT INTO play_event_payloads (
                event_id,
                payload
            )
            "#,
        );
        query.push_values(chunk, |mut row, prepared| {
            row.push_bind(prepared.id)
                .push_bind(&prepared.event.payload);
        });
        query.push(" ON CONFLICT DO NOTHING");
        query
            .build()
            .execute(pool)
            .await
            .context("failed to batch insert play event payloads")?;
    }

    Ok(())
}

async fn insert_play_event_attribute_rows(
    pool: &PgPool,
    events: &[PreparedIndexedEvent<'_>],
) -> Result<()> {
    for chunk in events.chunks(PLAY_EVENT_JSON_INSERT_CHUNK_SIZE) {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            INSERT INTO play_event_attributes (
                event_id,
                attributes
            )
            "#,
        );
        query.push_values(chunk, |mut row, prepared| {
            row.push_bind(prepared.id)
                .push_bind(&prepared.event.attributes);
        });
        query.push(" ON CONFLICT DO NOTHING");
        query
            .build()
            .execute(pool)
            .await
            .context("failed to batch insert play event attributes")?;
    }

    Ok(())
}

async fn insert_play_event_scalar_field_rows_for_events(
    pool: &PgPool,
    events: &[PreparedIndexedEvent<'_>],
) -> Result<()> {
    let mut rows =
        Vec::<(Uuid, EventScalarField)>::with_capacity(PLAY_EVENT_SCALAR_FIELD_INSERT_CHUNK_SIZE);
    for prepared in events {
        for field in event_scalar_fields(prepared.event) {
            rows.push((prepared.id, field));
            if rows.len() >= PLAY_EVENT_SCALAR_FIELD_INSERT_CHUNK_SIZE {
                insert_play_event_scalar_field_rows(pool, &rows).await?;
                rows.clear();
            }
        }
    }
    if !rows.is_empty() {
        insert_play_event_scalar_field_rows(pool, &rows).await?;
    }

    Ok(())
}

async fn insert_play_event_scalar_field_rows(
    pool: &PgPool,
    rows: &[(Uuid, EventScalarField)],
) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_scalar_fields (
            event_id,
            field_source,
            field_path,
            value_kind,
            string_value,
            numeric_value,
            boolean_value
        )
        "#,
    );
    query.push_values(rows, |mut row, (event_id, field)| {
        row.push_bind(event_id)
            .push_bind(field.source)
            .push_bind(&field.path)
            .push_bind(field.value_kind)
            .push_bind(field.string_value.as_deref())
            .push_bind(field.numeric_value)
            .push_bind(field.boolean_value);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert play event scalar fields")?;

    Ok(())
}

async fn insert_play_event_subject_rows(
    pool: &PgPool,
    events: &[PreparedIndexedEvent<'_>],
    replay_players: &HashMap<String, Uuid>,
) -> Result<()> {
    let mut rows = Vec::with_capacity(PLAY_EVENT_SUBJECT_INSERT_CHUNK_SIZE);
    for prepared in events {
        for subject in &prepared.event.subjects {
            rows.push((
                prepared.id,
                subject,
                resolve_replay_player_id(subject, replay_players),
            ));
            if rows.len() >= PLAY_EVENT_SUBJECT_INSERT_CHUNK_SIZE {
                insert_play_event_subject_row_chunk(pool, &rows).await?;
                rows.clear();
            }
        }
    }
    if !rows.is_empty() {
        insert_play_event_subject_row_chunk(pool, &rows).await?;
    }

    Ok(())
}

async fn insert_play_event_subject_row_chunk(
    pool: &PgPool,
    rows: &[(Uuid, &EventSubject, Option<Uuid>)],
) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_subjects (
            event_id,
            subject_kind,
            subject_id,
            replay_player_id,
            role
        )
        "#,
    );
    query.push_values(rows, |mut row, (event_id, subject, replay_player_id)| {
        row.push_bind(event_id)
            .push_bind(&subject.kind)
            .push_bind(&subject.id)
            .push_bind(replay_player_id)
            .push_bind(&subject.role);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert play event subjects")?;

    Ok(())
}

async fn insert_play_events_row_by_row(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
    replay_players: &HashMap<String, Uuid>,
    options: PlayEventInsertOptions,
) -> Result<usize> {
    let mut inserted = 0usize;
    for event in events {
        let Some(event_type_id) = event_type_ids.get(&event.event_type_key).copied() else {
            continue;
        };

        let Some(row) = sqlx::query(
            r#"
            INSERT INTO play_events (
                id,
                analysis_run_id,
                replay_id,
                event_type_id,
                source,
                source_stream,
                source_index,
                source_event_id,
                primary_subject_kind,
                primary_subject_id,
                team,
                start_frame,
                end_frame,
                event_frame,
                start_time,
                end_time,
                event_time,
                duration_seconds,
                confidence
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19
            )
            ON CONFLICT DO NOTHING
            RETURNING id
            "#,
        )
        .bind(Uuid::now_v7())
        .bind(analysis_run_id)
        .bind(replay_id)
        .bind(event_type_id)
        .bind(&event.source)
        .bind(&event.source_stream)
        .bind(event.source_index as i32)
        .bind(&event.source_event_id)
        .bind(event.primary_subject.as_ref().map(|subject| &subject.kind))
        .bind(event.primary_subject.as_ref().map(|subject| &subject.id))
        .bind(event.team)
        .bind(event.start_frame)
        .bind(event.end_frame)
        .bind(event.event_frame)
        .bind(event.start_time)
        .bind(event.end_time)
        .bind(event.event_time)
        .bind(event.duration_seconds)
        .bind(event.confidence)
        .fetch_optional(pool)
        .await
        .context("failed to insert play event")?
        else {
            continue;
        };
        let play_event_id: Uuid = row.try_get("id")?;
        inserted += 1;

        if options.payload {
            insert_play_event_payload(pool, play_event_id, &event.payload).await?;
        }
        if options.attributes {
            insert_play_event_attributes(pool, play_event_id, &event.attributes).await?;
        }
        if options.scalar_fields {
            insert_play_event_scalar_fields(pool, play_event_id, event).await?;
        }
        if options.details {
            insert_play_event_details(pool, play_event_id, replay_id, event, replay_players)
                .await?;
        }

        if options.subjects {
            for subject in &event.subjects {
                sqlx::query(
                    r#"
                INSERT INTO play_event_subjects (
                    event_id,
                    subject_kind,
                    subject_id,
                    replay_player_id,
                    role
                )
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT DO NOTHING
                "#,
                )
                .bind(play_event_id)
                .bind(&subject.kind)
                .bind(&subject.id)
                .bind(resolve_replay_player_id(subject, replay_players))
                .bind(&subject.role)
                .execute(pool)
                .await
                .context("failed to insert play event subject")?;
            }
        }
    }

    Ok(inserted)
}

struct TimelineDetailRow {
    event_id: Uuid,
    kind: String,
    player_subject_id: Option<String>,
    team: Option<i32>,
}

struct MechanicDetailRow {
    event_id: Uuid,
    mechanic: String,
    properties: Value,
}

struct GoalTagDetailRow {
    event_id: Uuid,
    goal_index: i32,
    kind: String,
    scoring_team: i32,
    scorer_subject_id: Option<String>,
    confidence: f64,
    modifiers: Value,
    evidence: Value,
}

struct TouchDetailRow {
    event_id: Uuid,
    kind: String,
    height_band: String,
    surface: String,
    dodge_state: String,
    ball_speed_change: f64,
    sample_frame: i32,
    sample_time: f64,
}

struct RotationPlayerDetailRow {
    event_id: Uuid,
    active: bool,
    current_role_state: String,
    current_depth_state: String,
    active_game_time: Option<f64>,
    tracked_time: Option<f64>,
    time_first_man: Option<f64>,
    time_second_man: Option<f64>,
    time_third_man: Option<f64>,
    time_ambiguous_role: Option<f64>,
    time_behind_play: Option<f64>,
    time_level_with_play: Option<f64>,
    time_ahead_of_play: Option<f64>,
    longest_first_man_stint_time: Option<f64>,
    first_man_stint_count: Option<i32>,
    became_first_man_count: Option<i32>,
    lost_first_man_count: Option<i32>,
}

struct KickoffDetailRow {
    event_id: Uuid,
    replay_id: Uuid,
    outcome: Option<String>,
    winning_team: Option<i32>,
    win_strength: Option<f64>,
    win_strength_band: Option<String>,
    kickoff_possession_outcome: Option<String>,
    kickoff_possession_team: Option<i32>,
    kickoff_goal: bool,
    scoring_team: Option<i32>,
    time_to_goal: Option<f64>,
    taker_touch_delay_seconds: Option<f64>,
    exit_speed: Option<f64>,
    exit_y_velocity: Option<f64>,
    first_touch_subject_id: Option<String>,
    first_touch_team: Option<i32>,
    first_touch_time: Option<f64>,
    first_touch_frame: Option<i32>,
    first_follow_up_touch_subject_id: Option<String>,
    first_follow_up_touch_team: Option<i32>,
    first_follow_up_touch_time: Option<f64>,
    first_follow_up_touch_frame: Option<i32>,
}

struct KickoffPlayerDetailRow {
    event_id: Uuid,
    replay_id: Uuid,
    replay_player_id: Option<Uuid>,
    player_subject_id: String,
    team: i32,
    role: &'static str,
    team_role: &'static str,
    player_index: i32,
    spawn_position: Option<String>,
    start_boost: Option<f64>,
    boost_after: Option<f64>,
    first_touch_time: Option<f64>,
    first_touch_frame: Option<i32>,
    taker_outcome: Option<String>,
    approach: Option<String>,
    support_behavior: Option<String>,
}

async fn insert_play_event_detail_rows(
    pool: &PgPool,
    replay_id: Uuid,
    events: &[PreparedIndexedEvent<'_>],
    replay_players: &HashMap<String, Uuid>,
) -> Result<()> {
    let mut timeline_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);
    let mut mechanic_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);
    let mut goal_tag_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);
    let mut touch_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);
    let mut rotation_player_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);
    let mut kickoff_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);
    let mut kickoff_player_rows = Vec::with_capacity(PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE);

    for prepared in events {
        match prepared.event.source_stream.as_str() {
            "timeline" => {
                timeline_rows.push(timeline_detail_row(prepared.id, prepared.event)?);
                if timeline_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_timeline_detail_rows(pool, &timeline_rows).await?;
                    timeline_rows.clear();
                }
            }
            "mechanics" => {
                mechanic_rows.push(mechanic_detail_row(prepared.id, prepared.event)?);
                if mechanic_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_mechanic_detail_rows(pool, &mechanic_rows).await?;
                    mechanic_rows.clear();
                }
            }
            "goal_tags" => {
                goal_tag_rows.push(goal_tag_detail_row(prepared.id, prepared.event)?);
                if goal_tag_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_goal_tag_detail_rows(pool, &goal_tag_rows).await?;
                    goal_tag_rows.clear();
                }
            }
            "touch" => {
                touch_rows.push(touch_detail_row(prepared.id, prepared.event)?);
                if touch_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_touch_detail_rows(pool, &touch_rows).await?;
                    touch_rows.clear();
                }
            }
            "rotation_player" => {
                rotation_player_rows.push(rotation_player_detail_row(prepared.id, prepared.event)?);
                if rotation_player_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_rotation_player_detail_rows(pool, &rotation_player_rows).await?;
                    rotation_player_rows.clear();
                }
            }
            "kickoff" => {
                kickoff_rows.push(kickoff_detail_row(prepared.id, replay_id, prepared.event)?);
                kickoff_player_rows.extend(kickoff_player_detail_rows(
                    prepared.id,
                    replay_id,
                    prepared.event,
                    replay_players,
                )?);
                if kickoff_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_kickoff_detail_rows(pool, &kickoff_rows).await?;
                    kickoff_rows.clear();
                }
                if kickoff_player_rows.len() >= PLAY_EVENT_DETAIL_INSERT_CHUNK_SIZE {
                    insert_kickoff_player_detail_rows(pool, &kickoff_player_rows).await?;
                    kickoff_player_rows.clear();
                }
            }
            _ => {}
        }
    }

    insert_timeline_detail_rows(pool, &timeline_rows).await?;
    insert_mechanic_detail_rows(pool, &mechanic_rows).await?;
    insert_goal_tag_detail_rows(pool, &goal_tag_rows).await?;
    insert_touch_detail_rows(pool, &touch_rows).await?;
    insert_rotation_player_detail_rows(pool, &rotation_player_rows).await?;
    insert_kickoff_detail_rows(pool, &kickoff_rows).await?;
    insert_kickoff_player_detail_rows(pool, &kickoff_player_rows).await?;

    Ok(())
}

fn timeline_detail_row(event_id: Uuid, event: &IndexedEvent) -> Result<TimelineDetailRow> {
    Ok(TimelineDetailRow {
        event_id,
        kind: required_kind(&event.payload)?,
        player_subject_id: player_subject_id_from_field(&event.payload, "player_id")?,
        team: event.team,
    })
}

fn mechanic_detail_row(event_id: Uuid, event: &IndexedEvent) -> Result<MechanicDetailRow> {
    let mut properties = Map::new();
    append_mechanic_property_attributes(&event.payload, &mut properties);
    Ok(MechanicDetailRow {
        event_id,
        mechanic: required_kind(&event.payload)?,
        properties: Value::Object(properties),
    })
}

fn goal_tag_detail_row(event_id: Uuid, event: &IndexedEvent) -> Result<GoalTagDetailRow> {
    Ok(GoalTagDetailRow {
        event_id,
        goal_index: required_int(&event.payload, "goal_index")?,
        kind: required_kind(&event.payload)?,
        scoring_team: required_team_bool(&event.payload, "scoring_team_is_team_0")?,
        scorer_subject_id: player_subject_id_from_field(&event.payload, "scorer")?,
        confidence: required_float(&event.payload, "confidence")?,
        modifiers: json_array_or_empty(&event.payload, "modifiers"),
        evidence: json_array_or_empty(&event.payload, "evidence"),
    })
}

fn touch_detail_row(event_id: Uuid, event: &IndexedEvent) -> Result<TouchDetailRow> {
    Ok(TouchDetailRow {
        event_id,
        kind: required_string(&event.payload, "kind")?,
        height_band: required_string(&event.payload, "height_band")?,
        surface: required_string(&event.payload, "surface")?,
        dodge_state: required_string(&event.payload, "dodge_state")?,
        ball_speed_change: required_float(&event.payload, "ball_speed_change")?,
        sample_frame: required_int(&event.payload, "sample_frame")?,
        sample_time: required_float(&event.payload, "sample_time")?,
    })
}

fn rotation_player_detail_row(
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<RotationPlayerDetailRow> {
    Ok(RotationPlayerDetailRow {
        event_id,
        active: required_bool(&event.payload, "active")?,
        current_role_state: required_normalized_variant(&event.payload, "current_role_state")?,
        current_depth_state: required_normalized_variant(&event.payload, "current_depth_state")?,
        active_game_time: float_value(&event.payload, &["active_game_time"]),
        tracked_time: float_value(&event.payload, &["tracked_time"]),
        time_first_man: float_value(&event.payload, &["time_first_man"]),
        time_second_man: float_value(&event.payload, &["time_second_man"]),
        time_third_man: float_value(&event.payload, &["time_third_man"]),
        time_ambiguous_role: float_value(&event.payload, &["time_ambiguous_role"]),
        time_behind_play: float_value(&event.payload, &["time_behind_play"]),
        time_level_with_play: float_value(&event.payload, &["time_level_with_play"]),
        time_ahead_of_play: float_value(&event.payload, &["time_ahead_of_play"]),
        longest_first_man_stint_time: float_value(
            &event.payload,
            &["longest_first_man_stint_time"],
        ),
        first_man_stint_count: int_value(&event.payload, &["first_man_stint_count"]),
        became_first_man_count: int_value(&event.payload, &["became_first_man_count"]),
        lost_first_man_count: int_value(&event.payload, &["lost_first_man_count"]),
    })
}

fn kickoff_detail_row(
    event_id: Uuid,
    replay_id: Uuid,
    event: &IndexedEvent,
) -> Result<KickoffDetailRow> {
    Ok(KickoffDetailRow {
        event_id,
        replay_id,
        outcome: normalized_payload_field(&event.payload, "outcome"),
        winning_team: team_bool(&event.payload, "winning_team_is_team_0"),
        win_strength: float_value(&event.payload, &["win_strength"]),
        win_strength_band: normalized_payload_field(&event.payload, "win_strength_band"),
        kickoff_possession_outcome: normalized_payload_field(
            &event.payload,
            "kickoff_possession_outcome",
        ),
        kickoff_possession_team: team_bool(&event.payload, "kickoff_possession_team_is_team_0"),
        kickoff_goal: bool_value(&event.payload, &["kickoff_goal"]).unwrap_or(false),
        scoring_team: team_bool(&event.payload, "scoring_team_is_team_0"),
        time_to_goal: float_value(&event.payload, &["time_to_goal"]),
        taker_touch_delay_seconds: float_value(&event.payload, &["taker_touch_delay_seconds"]),
        exit_speed: float_value(&event.payload, &["exit_speed"]),
        exit_y_velocity: float_value(&event.payload, &["exit_y_velocity"]),
        first_touch_subject_id: player_subject_id_from_field(&event.payload, "first_touch_player")?,
        first_touch_team: team_bool(&event.payload, "first_touch_team_is_team_0"),
        first_touch_time: float_value(&event.payload, &["first_touch_time"]),
        first_touch_frame: int_value(&event.payload, &["first_touch_frame"]),
        first_follow_up_touch_subject_id: player_subject_id_from_field(
            &event.payload,
            "first_follow_up_touch_player",
        )?,
        first_follow_up_touch_team: team_bool(
            &event.payload,
            "first_follow_up_touch_team_is_team_0",
        ),
        first_follow_up_touch_time: float_value(&event.payload, &["first_follow_up_touch_time"]),
        first_follow_up_touch_frame: int_value(&event.payload, &["first_follow_up_touch_frame"]),
    })
}

fn kickoff_player_detail_rows(
    event_id: Uuid,
    replay_id: Uuid,
    event: &IndexedEvent,
    replay_players: &HashMap<String, Uuid>,
) -> Result<Vec<KickoffPlayerDetailRow>> {
    let mut rows = Vec::new();
    for (field, team, team_role) in [
        ("team_zero_taker", 0, "team_zero_taker"),
        ("team_one_taker", 1, "team_one_taker"),
    ] {
        if let Some(row) = kickoff_player_detail_row(
            event_id,
            replay_id,
            &event.payload,
            field,
            team,
            "taker",
            team_role,
            0,
            replay_players,
        )? {
            rows.push(row);
        }
    }
    for (field, team, team_role) in [
        ("team_zero_non_takers", 0, "team_zero_support"),
        ("team_one_non_takers", 1, "team_one_support"),
    ] {
        let Some(players) = event.payload.get(field).and_then(Value::as_array) else {
            continue;
        };
        for (index, player) in players.iter().enumerate() {
            if let Some(row) = kickoff_player_detail_row_from_payload(
                event_id,
                replay_id,
                player,
                team,
                "support",
                team_role,
                index as i32,
                replay_players,
            )? {
                rows.push(row);
            }
        }
    }
    Ok(rows)
}

fn kickoff_player_detail_row(
    event_id: Uuid,
    replay_id: Uuid,
    event_payload: &Value,
    field: &str,
    fallback_team: i32,
    role: &'static str,
    team_role: &'static str,
    player_index: i32,
    replay_players: &HashMap<String, Uuid>,
) -> Result<Option<KickoffPlayerDetailRow>> {
    let Some(payload) = event_payload.get(field) else {
        return Ok(None);
    };
    kickoff_player_detail_row_from_payload(
        event_id,
        replay_id,
        payload,
        fallback_team,
        role,
        team_role,
        player_index,
        replay_players,
    )
}

fn kickoff_player_detail_row_from_payload(
    event_id: Uuid,
    replay_id: Uuid,
    payload: &Value,
    fallback_team: i32,
    role: &'static str,
    team_role: &'static str,
    player_index: i32,
    replay_players: &HashMap<String, Uuid>,
) -> Result<Option<KickoffPlayerDetailRow>> {
    if payload.is_null() {
        return Ok(None);
    }
    let Some(player_subject_id) = player_subject_id_from_field(payload, "player")? else {
        return Ok(None);
    };
    Ok(Some(KickoffPlayerDetailRow {
        event_id,
        replay_id,
        replay_player_id: replay_players.get(&player_subject_id).copied(),
        player_subject_id,
        team: team_bool(payload, "is_team_0").unwrap_or(fallback_team),
        role,
        team_role,
        player_index,
        spawn_position: normalized_payload_field(payload, "spawn_position"),
        start_boost: float_value(payload, &["start_boost"]),
        boost_after: float_value(payload, &["boost_after"]),
        first_touch_time: float_value(payload, &["first_touch_time"]),
        first_touch_frame: int_value(payload, &["first_touch_frame"]),
        taker_outcome: normalized_payload_field(payload, "outcome"),
        approach: normalized_payload_field(payload, "approach"),
        support_behavior: normalized_payload_field(payload, "support_behavior"),
    }))
}

async fn insert_timeline_detail_rows(pool: &PgPool, rows: &[TimelineDetailRow]) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_timeline_details (
            event_id,
            kind,
            player_subject_id,
            team
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(&detail.kind)
            .push_bind(&detail.player_subject_id)
            .push_bind(detail.team);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert timeline event details")?;

    Ok(())
}

async fn insert_mechanic_detail_rows(pool: &PgPool, rows: &[MechanicDetailRow]) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_mechanic_details (
            event_id,
            mechanic,
            properties
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(&detail.mechanic)
            .push_bind(&detail.properties);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert mechanic event details")?;

    Ok(())
}

async fn insert_goal_tag_detail_rows(pool: &PgPool, rows: &[GoalTagDetailRow]) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_goal_tag_details (
            event_id,
            goal_index,
            kind,
            scoring_team,
            scorer_subject_id,
            confidence,
            modifiers,
            evidence
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(detail.goal_index)
            .push_bind(&detail.kind)
            .push_bind(detail.scoring_team)
            .push_bind(&detail.scorer_subject_id)
            .push_bind(detail.confidence)
            .push_bind(&detail.modifiers)
            .push_bind(&detail.evidence);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert goal tag event details")?;

    Ok(())
}

async fn insert_touch_detail_rows(pool: &PgPool, rows: &[TouchDetailRow]) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_touch_details (
            event_id,
            kind,
            height_band,
            surface,
            dodge_state,
            ball_speed_change,
            sample_frame,
            sample_time
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(&detail.kind)
            .push_bind(&detail.height_band)
            .push_bind(&detail.surface)
            .push_bind(&detail.dodge_state)
            .push_bind(detail.ball_speed_change)
            .push_bind(detail.sample_frame)
            .push_bind(detail.sample_time);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert touch event details")?;

    Ok(())
}

async fn insert_rotation_player_detail_rows(
    pool: &PgPool,
    rows: &[RotationPlayerDetailRow],
) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_rotation_player_details (
            event_id,
            active,
            current_role_state,
            current_depth_state,
            active_game_time,
            tracked_time,
            time_first_man,
            time_second_man,
            time_third_man,
            time_ambiguous_role,
            time_behind_play,
            time_level_with_play,
            time_ahead_of_play,
            longest_first_man_stint_time,
            first_man_stint_count,
            became_first_man_count,
            lost_first_man_count
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(detail.active)
            .push_bind(&detail.current_role_state)
            .push_bind(&detail.current_depth_state)
            .push_bind(detail.active_game_time)
            .push_bind(detail.tracked_time)
            .push_bind(detail.time_first_man)
            .push_bind(detail.time_second_man)
            .push_bind(detail.time_third_man)
            .push_bind(detail.time_ambiguous_role)
            .push_bind(detail.time_behind_play)
            .push_bind(detail.time_level_with_play)
            .push_bind(detail.time_ahead_of_play)
            .push_bind(detail.longest_first_man_stint_time)
            .push_bind(detail.first_man_stint_count)
            .push_bind(detail.became_first_man_count)
            .push_bind(detail.lost_first_man_count);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert rotation player event details")?;

    Ok(())
}

async fn insert_kickoff_detail_rows(pool: &PgPool, rows: &[KickoffDetailRow]) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_kickoff_details (
            event_id,
            replay_id,
            outcome,
            winning_team,
            win_strength,
            win_strength_band,
            kickoff_possession_outcome,
            kickoff_possession_team,
            kickoff_goal,
            scoring_team,
            time_to_goal,
            taker_touch_delay_seconds,
            exit_speed,
            exit_y_velocity,
            first_touch_subject_id,
            first_touch_team,
            first_touch_time,
            first_touch_frame,
            first_follow_up_touch_subject_id,
            first_follow_up_touch_team,
            first_follow_up_touch_time,
            first_follow_up_touch_frame
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(detail.replay_id)
            .push_bind(&detail.outcome)
            .push_bind(detail.winning_team)
            .push_bind(detail.win_strength)
            .push_bind(&detail.win_strength_band)
            .push_bind(&detail.kickoff_possession_outcome)
            .push_bind(detail.kickoff_possession_team)
            .push_bind(detail.kickoff_goal)
            .push_bind(detail.scoring_team)
            .push_bind(detail.time_to_goal)
            .push_bind(detail.taker_touch_delay_seconds)
            .push_bind(detail.exit_speed)
            .push_bind(detail.exit_y_velocity)
            .push_bind(&detail.first_touch_subject_id)
            .push_bind(detail.first_touch_team)
            .push_bind(detail.first_touch_time)
            .push_bind(detail.first_touch_frame)
            .push_bind(&detail.first_follow_up_touch_subject_id)
            .push_bind(detail.first_follow_up_touch_team)
            .push_bind(detail.first_follow_up_touch_time)
            .push_bind(detail.first_follow_up_touch_frame);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert kickoff event details")?;

    Ok(())
}

async fn insert_kickoff_player_detail_rows(
    pool: &PgPool,
    rows: &[KickoffPlayerDetailRow],
) -> Result<()> {
    if rows.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_kickoff_player_details (
            event_id,
            replay_id,
            replay_player_id,
            player_subject_id,
            team,
            role,
            team_role,
            player_index,
            spawn_position,
            start_boost,
            boost_after,
            first_touch_time,
            first_touch_frame,
            taker_outcome,
            approach,
            support_behavior
        )
        "#,
    );
    query.push_values(rows, |mut row, detail| {
        row.push_bind(detail.event_id)
            .push_bind(detail.replay_id)
            .push_bind(detail.replay_player_id)
            .push_bind(&detail.player_subject_id)
            .push_bind(detail.team)
            .push_bind(detail.role)
            .push_bind(detail.team_role)
            .push_bind(detail.player_index)
            .push_bind(&detail.spawn_position)
            .push_bind(detail.start_boost)
            .push_bind(detail.boost_after)
            .push_bind(detail.first_touch_time)
            .push_bind(detail.first_touch_frame)
            .push_bind(&detail.taker_outcome)
            .push_bind(&detail.approach)
            .push_bind(&detail.support_behavior);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to batch insert kickoff player event details")?;

    Ok(())
}

async fn insert_play_event_payload(pool: &PgPool, event_id: Uuid, payload: &Value) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_payloads (
            event_id,
            payload
        )
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(payload)
    .execute(pool)
    .await
    .context("failed to insert play event payload")?;
    Ok(())
}

async fn insert_play_event_attributes(
    pool: &PgPool,
    event_id: Uuid,
    attributes: &Value,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_attributes (
            event_id,
            attributes
        )
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(attributes)
    .execute(pool)
    .await
    .context("failed to insert play event attributes")?;
    Ok(())
}

async fn insert_play_event_scalar_fields(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    let fields = event_scalar_fields(event);
    if fields.is_empty() {
        return Ok(());
    }

    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        INSERT INTO play_event_scalar_fields (
            event_id,
            field_source,
            field_path,
            value_kind,
            string_value,
            numeric_value,
            boolean_value
        )
        "#,
    );
    query.push_values(fields, |mut row, field| {
        row.push_bind(event_id)
            .push_bind(field.source)
            .push_bind(field.path)
            .push_bind(field.value_kind)
            .push_bind(field.string_value)
            .push_bind(field.numeric_value)
            .push_bind(field.boolean_value);
    });
    query.push(" ON CONFLICT DO NOTHING");
    query
        .build()
        .execute(pool)
        .await
        .context("failed to insert play event scalar fields")?;

    Ok(())
}

async fn insert_play_event_details(
    pool: &PgPool,
    event_id: Uuid,
    replay_id: Uuid,
    event: &IndexedEvent,
    replay_players: &HashMap<String, Uuid>,
) -> Result<()> {
    match event.source_stream.as_str() {
        "timeline" => insert_timeline_event_details(pool, event_id, event).await,
        "mechanics" => insert_mechanic_event_details(pool, event_id, event).await,
        "goal_tags" => insert_goal_tag_event_details(pool, event_id, event).await,
        "touch" => insert_touch_event_details(pool, event_id, event).await,
        "rotation_player" => insert_rotation_player_event_details(pool, event_id, event).await,
        "kickoff" => {
            insert_kickoff_event_details(pool, event_id, replay_id, event, replay_players).await
        }
        _ => Ok(()),
    }
}

async fn insert_timeline_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_timeline_details (
            event_id,
            kind,
            player_subject_id,
            team
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_kind(&event.payload)?)
    .bind(player_subject_id_from_field(&event.payload, "player_id")?)
    .bind(event.team)
    .execute(pool)
    .await
    .context("failed to insert timeline event details")?;
    Ok(())
}

async fn insert_mechanic_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    let mut properties = Map::new();
    append_mechanic_property_attributes(&event.payload, &mut properties);
    sqlx::query(
        r#"
        INSERT INTO play_event_mechanic_details (
            event_id,
            mechanic,
            properties
        )
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_kind(&event.payload)?)
    .bind(Value::Object(properties))
    .execute(pool)
    .await
    .context("failed to insert mechanic event details")?;
    Ok(())
}

async fn insert_goal_tag_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_goal_tag_details (
            event_id,
            goal_index,
            kind,
            scoring_team,
            scorer_subject_id,
            confidence,
            modifiers,
            evidence
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_int(&event.payload, "goal_index")?)
    .bind(required_kind(&event.payload)?)
    .bind(required_team_bool(
        &event.payload,
        "scoring_team_is_team_0",
    )?)
    .bind(player_subject_id_from_field(&event.payload, "scorer")?)
    .bind(required_float(&event.payload, "confidence")?)
    .bind(json_array_or_empty(&event.payload, "modifiers"))
    .bind(json_array_or_empty(&event.payload, "evidence"))
    .execute(pool)
    .await
    .context("failed to insert goal tag event details")?;
    Ok(())
}

async fn insert_touch_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_touch_details (
            event_id,
            kind,
            height_band,
            surface,
            dodge_state,
            ball_speed_change,
            sample_frame,
            sample_time
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_string(&event.payload, "kind")?)
    .bind(required_string(&event.payload, "height_band")?)
    .bind(required_string(&event.payload, "surface")?)
    .bind(required_string(&event.payload, "dodge_state")?)
    .bind(required_float(&event.payload, "ball_speed_change")?)
    .bind(required_int(&event.payload, "sample_frame")?)
    .bind(required_float(&event.payload, "sample_time")?)
    .execute(pool)
    .await
    .context("failed to insert touch event details")?;
    Ok(())
}

async fn insert_rotation_player_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_rotation_player_details (
            event_id,
            active,
            current_role_state,
            current_depth_state,
            active_game_time,
            tracked_time,
            time_first_man,
            time_second_man,
            time_third_man,
            time_ambiguous_role,
            time_behind_play,
            time_level_with_play,
            time_ahead_of_play,
            longest_first_man_stint_time,
            first_man_stint_count,
            became_first_man_count,
            lost_first_man_count
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17
        )
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_bool(&event.payload, "active")?)
    .bind(required_normalized_variant(
        &event.payload,
        "current_role_state",
    )?)
    .bind(required_normalized_variant(
        &event.payload,
        "current_depth_state",
    )?)
    .bind(float_value(&event.payload, &["active_game_time"]))
    .bind(float_value(&event.payload, &["tracked_time"]))
    .bind(float_value(&event.payload, &["time_first_man"]))
    .bind(float_value(&event.payload, &["time_second_man"]))
    .bind(float_value(&event.payload, &["time_third_man"]))
    .bind(float_value(&event.payload, &["time_ambiguous_role"]))
    .bind(float_value(&event.payload, &["time_behind_play"]))
    .bind(float_value(&event.payload, &["time_level_with_play"]))
    .bind(float_value(&event.payload, &["time_ahead_of_play"]))
    .bind(float_value(
        &event.payload,
        &["longest_first_man_stint_time"],
    ))
    .bind(int_value(&event.payload, &["first_man_stint_count"]))
    .bind(int_value(&event.payload, &["became_first_man_count"]))
    .bind(int_value(&event.payload, &["lost_first_man_count"]))
    .execute(pool)
    .await
    .context("failed to insert rotation player event details")?;
    Ok(())
}

async fn insert_kickoff_event_details(
    pool: &PgPool,
    event_id: Uuid,
    replay_id: Uuid,
    event: &IndexedEvent,
    replay_players: &HashMap<String, Uuid>,
) -> Result<()> {
    insert_kickoff_detail_rows(pool, &[kickoff_detail_row(event_id, replay_id, event)?]).await?;
    insert_kickoff_player_detail_rows(
        pool,
        &kickoff_player_detail_rows(event_id, replay_id, event, replay_players)?,
    )
    .await?;
    Ok(())
}

/// Index the stats-timeline event envelope.
///
/// `ReplayStatsTimelineEvents` serializes as a single flat `{ "events": [ {
/// "meta": { "stream", "timing", "confidence", "properties", ... }, "payload": {
/// "kind", "payload" } } ] }` array. We walk it in order — events arrive globally
/// sorted by start time, so each stream stays time-ordered — assigning a
/// per-stream `source_index` and indexing each envelope from its `meta` plus the
/// inner typed payload (`payload.payload`).
fn build_indexed_events(timeline: &ReplayStatsTimelineScaffold) -> Result<Vec<IndexedEvent>> {
    let serialized =
        serde_json::to_value(&timeline.events).context("failed to serialize timeline events")?;
    let mut events = Vec::new();
    let Some(envelopes) = serialized.get("events").and_then(Value::as_array) else {
        return Ok(events);
    };
    let mut indices: HashMap<&str, usize> = HashMap::new();
    for envelope in envelopes {
        let Some(stream) = envelope
            .get("meta")
            .and_then(|meta| meta.get("stream"))
            .and_then(Value::as_str)
        else {
            continue;
        };
        if !should_index_timeline_stream(stream) {
            continue;
        }
        let index = indices.entry(stream).or_insert(0);
        events.push(indexed_timeline_envelope_event(envelope, stream, *index)?);
        *index += 1;
    }
    Ok(events)
}

fn indexed_timeline_envelope_event(
    envelope: &Value,
    stream: &str,
    index: usize,
) -> Result<IndexedEvent> {
    let payload = envelope
        .get("payload")
        .and_then(|payload| payload.get("payload"))
        .map(ensure_object_payload)
        .unwrap_or_else(|| Value::Object(Map::new()));
    indexed_timeline_event(stream, index, &payload, envelope.get("meta"))
}

fn should_index_timeline_stream(stream: &str) -> bool {
    !NON_INDEXED_TIMELINE_STREAMS.contains(&stream)
}

/// Index a bare inner payload with no envelope metadata. Used by unit tests that
/// exercise the per-payload derivation directly.
#[cfg(test)]
fn indexed_timeline_payload_event(
    stream: &str,
    index: usize,
    payload: &Value,
) -> Result<IndexedEvent> {
    let payload = ensure_object_payload(payload);
    indexed_timeline_event(stream, index, &payload, None)
}

/// Build an [`IndexedEvent`] from the inner typed payload and, when available, the
/// envelope `meta`. `meta` is the canonical source for envelope-level fields
/// (`confidence`, `properties`); everything else is derived from the typed
/// payload, falling back to payload fields when `meta` is absent.
fn indexed_timeline_event(
    stream: &str,
    index: usize,
    payload: &Value,
    meta: Option<&Value>,
) -> Result<IndexedEvent> {
    let (event_type_key, display_name, category) = timeline_event_type(stream, payload);
    let (start_frame, end_frame, event_frame, start_time, end_time, event_time) =
        timeline_event_timing(payload);
    let subjects = timeline_event_subjects(payload)?;
    let primary_subject = subjects.first().cloned();
    let source_event_id = timeline_source_event_id(stream, index, payload, &event_type_key);
    let duration_seconds = timeline_event_duration(payload);
    let team = timeline_event_team(payload);
    let confidence = meta
        .and_then(|meta| meta.get("confidence"))
        .and_then(Value::as_f64)
        .or_else(|| float_value(payload, &["confidence"]));

    Ok(IndexedEvent {
        event_type_key,
        display_name,
        category,
        source: STATS_TIMELINE_SOURCE.to_owned(),
        source_stream: stream.to_owned(),
        source_index: index,
        source_event_id,
        primary_subject,
        subjects,
        team,
        start_frame,
        end_frame,
        event_frame,
        start_time,
        end_time,
        event_time,
        duration_seconds,
        confidence,
        attributes: timeline_event_attributes(stream, payload, meta),
        payload: payload.clone(),
    })
}

fn ensure_object_payload(payload: &Value) -> Value {
    if payload.is_object() {
        payload.clone()
    } else {
        serde_json::json!({ "value": payload })
    }
}

fn timeline_event_type(stream: &str, payload: &Value) -> (String, String, String) {
    let kind = payload.get("kind").and_then(normalized_variant_name);
    let metadata = direct_timeline_event_metadata(stream);
    let event_type_key = match stream {
        "mechanics" => kind.as_deref().unwrap_or("unknown").to_owned(),
        "goal_tags" => kind
            .as_deref()
            .map(|kind| format!("goal_tag_{kind}"))
            .unwrap_or_else(|| "goal_tag_unknown".to_owned()),
        "touch" => "touch".to_owned(),
        "timeline" => kind.as_deref().unwrap_or("event").to_owned(),
        "rotation_player" => "rotation_player_state_span".to_owned(),
        "rotation_role_span" => format!(
            "rotation_role_{}",
            normalized_payload_field(payload, "current_role_state")
                .as_deref()
                .or(kind.as_deref())
                .unwrap_or("unknown")
        ),
        "rotation_depth_span" => {
            format!(
                "rotation_depth_{}",
                normalized_payload_field(payload, "current_depth_state")
                    .as_deref()
                    .or(kind.as_deref())
                    .unwrap_or("unknown")
            )
        }
        "rotation_first_man_stint" => "rotation_first_man_stint".to_owned(),
        "boost_pickups" => format!(
            "boost_pickup_{}",
            payload
                .get("comparison")
                .and_then(normalized_variant_name)
                .as_deref()
                .unwrap_or("event")
        ),
        "boost_ledger" => format!(
            "boost_ledger_{}",
            payload
                .get("transaction")
                .and_then(normalized_variant_name)
                .as_deref()
                .unwrap_or("event")
        ),
        "boost_state" => "boost_state".to_owned(),
        _ => metadata
            .map(|metadata| metadata.id.to_owned())
            .unwrap_or_else(|| stream.to_owned()),
    };
    let category = match stream {
        "mechanics" => "mechanic",
        "rotation_role_span" | "rotation_depth_span" | "rotation_first_man_stint" => "positioning",
        _ => metadata
            .map(|metadata| metadata.category)
            .unwrap_or("event"),
    }
    .to_owned();
    let display_name = match stream {
        "goal_tags" => kind
            .as_deref()
            .and_then(goal_tag_display_name)
            .map(ToOwned::to_owned)
            .unwrap_or_else(|| display_name_from_key(kind.as_deref().unwrap_or(&event_type_key))),
        "mechanics" | "timeline" => {
            display_name_from_key(kind.as_deref().unwrap_or(&event_type_key))
        }
        "rotation_first_man_stint" => display_name_from_key("first_man_stint"),
        "rotation_player" => display_name_from_key("player_state_span"),
        "rotation_role_span" | "rotation_depth_span" => display_name_from_key(&event_type_key),
        _ if metadata.is_some_and(|metadata| metadata.id == event_type_key) => metadata
            .map(|metadata| metadata.label.to_owned())
            .unwrap_or_else(|| display_name_from_key(&event_type_key)),
        _ => display_name_from_key(&event_type_key),
    };

    (event_type_key, display_name, category)
}

#[derive(Clone, Copy)]
struct EventDefinitionMetadata {
    id: &'static str,
    label: &'static str,
    category: &'static str,
}

fn direct_timeline_event_metadata(stream: &str) -> Option<EventDefinitionMetadata> {
    let id = match stream {
        "backboard" => "backboard_bounce",
        "core_player" => "core_player_scoreboard",
        _ => stream,
    };
    if let Some(metadata) = rocket_sense_timeline_event_metadata(id) {
        return Some(metadata);
    }
    subtr_actor::all_event_definitions()
        .iter()
        .copied()
        .find(|definition| definition.id == id)
        .map(|definition| EventDefinitionMetadata {
            id: definition.id,
            label: definition.label,
            category: event_category_key(definition.category),
        })
}

fn rocket_sense_timeline_event_metadata(id: &str) -> Option<EventDefinitionMetadata> {
    let (id, label, category) = match id {
        "core_player_goal_context" => (
            "core_player_goal_context",
            "Core Player Goal Context",
            "context",
        ),
        "controlled_play" => ("controlled_play", "Controlled Play", "possession"),
        "core_player_scoreboard" => (
            "core_player_scoreboard",
            "Core Player Scoreboard",
            "context",
        ),
        "goal_context" => ("goal_context", "Goal Context", "context"),
        "kickoff" => ("kickoff", "Kickoff", "possession"),
        _ => return None,
    };
    Some(EventDefinitionMetadata {
        id,
        label,
        category,
    })
}

fn goal_tag_display_name(kind: &str) -> Option<&'static str> {
    subtr_actor::ALL_GOAL_TAG_DEFINITIONS
        .iter()
        .find(|definition| definition.id == kind)
        .map(|definition| definition.label)
}

fn normalized_payload_field(payload: &Value, field: &str) -> Option<String> {
    payload.get(field).and_then(normalized_variant_name)
}

fn event_category_key(category: EventCategory) -> &'static str {
    match category {
        EventCategory::Core => "core",
        EventCategory::Mechanic => "mechanic",
        EventCategory::Possession => "possession",
        EventCategory::Positioning => "positioning",
        EventCategory::Boost => "boost",
        EventCategory::Movement => "movement",
        EventCategory::Other => "other",
        EventCategory::Annotation => "annotation",
        EventCategory::Context => "context",
    }
}

fn timeline_event_duration(payload: &Value) -> Option<f64> {
    float_value(payload, &["duration"]).filter(|value| *value >= 0.0)
}

fn timeline_event_team(payload: &Value) -> Option<i32> {
    bool_value(
        payload,
        &["is_team_0", "team_is_team_0", "scoring_team_is_team_0"],
    )
    .map(|is_team_0| if is_team_0 { 0 } else { 1 })
}

fn timeline_source_event_id(
    stream: &str,
    index: usize,
    payload: &Value,
    _event_type_key: &str,
) -> String {
    if stream == "mechanics" {
        if let Some(id) = payload.get("id").and_then(Value::as_str) {
            return id.to_owned();
        }
    }
    if stream == "goal_tags" {
        let kind = payload
            .get("kind")
            .and_then(normalized_variant_name)
            .unwrap_or_else(|| "goal_tag".to_owned());
        let goal_index = payload
            .get("goal_index")
            .and_then(Value::as_u64)
            .map(|value| value.to_string())
            .unwrap_or_else(|| "unknown".to_owned());
        return format!("goal_tag:{goal_index}:{kind}:{index}");
    }
    if stream == "rotation_first_man_stint" {
        return format!("rotation:first_man_stint:{index}");
    }
    format!("{stream}:{index}")
}

fn timeline_event_timing(payload: &Value) -> MechanicTimingColumns {
    if let Some(timing) = payload.get("timing") {
        if let Some(columns) = stats_event_timing_columns(timing) {
            return columns;
        }
    }

    let representative_frame = int_value(
        payload,
        &[
            "event_frame",
            "frame",
            "sample_frame",
            "resolve_frame",
            "resolved_frame",
            "reported_frame",
            "inferred_frame",
        ],
    );
    let representative_time = float_value(
        payload,
        &[
            "event_time",
            "time",
            "sample_time",
            "resolve_time",
            "resolved_time",
            "reported_time",
            "inferred_time",
        ],
    );
    let start_frame = int_value(payload, &["start_frame"]).or(representative_frame);
    let end_frame = int_value(
        payload,
        &[
            "end_frame",
            "resolve_frame",
            "resolved_frame",
            "sample_frame",
        ],
    )
    .or(representative_frame)
    .or(start_frame);
    let event_frame = representative_frame.or(end_frame).or(start_frame);
    let start_time = float_value(payload, &["start_time"]).or(representative_time);
    let end_time = float_value(
        payload,
        &["end_time", "resolve_time", "resolved_time", "sample_time"],
    )
    .or(representative_time)
    .or(start_time);
    let event_time = representative_time.or(end_time).or(start_time);

    (
        start_frame,
        end_frame,
        event_frame,
        start_time,
        end_time,
        event_time,
    )
}

fn stats_event_timing_columns(timing: &Value) -> Option<MechanicTimingColumns> {
    let object = timing.as_object()?;
    match object.get("type").and_then(Value::as_str)? {
        "moment" => {
            let value = object.get("value").unwrap_or(timing);
            let frame = int_value(value, &["frame"])?;
            let time = float_value(value, &["time"])?;
            Some((
                Some(frame),
                Some(frame),
                Some(frame),
                Some(time),
                Some(time),
                Some(time),
            ))
        }
        "span" => {
            let value = object.get("value").unwrap_or(timing);
            let start_frame = int_value(value, &["start_frame"])?;
            let end_frame = int_value(value, &["end_frame"])?;
            let start_time = float_value(value, &["start_time"])?;
            let end_time = float_value(value, &["end_time"])?;
            Some((
                Some(start_frame),
                Some(end_frame),
                Some(end_frame),
                Some(start_time),
                Some(end_time),
                Some(end_time),
            ))
        }
        _ => None,
    }
}

fn timeline_event_subjects(payload: &Value) -> Result<Vec<EventSubject>> {
    let mut subjects = Vec::new();
    for (field, role) in [
        ("player", "actor"),
        ("player_id", "actor"),
        ("scorer", "scorer"),
        ("passer", "passer"),
        ("receiver", "receiver"),
        ("team_zero_player", "team_zero_player"),
        ("team_one_player", "team_one_player"),
        ("previous_first_man", "previous_first_man"),
        ("next_first_man", "next_first_man"),
        ("initiator", "initiator"),
        ("victim", "victim"),
        ("attacker", "attacker"),
        ("first_touch_player", "first_touch"),
        ("first_follow_up_touch_player", "first_follow_up_touch"),
    ] {
        if let Some(subject) = player_subject_from_field(payload, field, role)? {
            push_unique_subject(&mut subjects, subject);
        }
    }
    append_nested_player_subjects(payload, &mut subjects)?;
    for (field, role) in [
        ("is_team_0", "team"),
        ("team_is_team_0", "team"),
        ("scoring_team_is_team_0", "scoring_team"),
        ("winning_team_is_team_0", "winning_team"),
        ("possession_team_is_team_0", "possession_team"),
        ("first_touch_team_is_team_0", "first_touch_team"),
        (
            "first_follow_up_touch_team_is_team_0",
            "first_follow_up_touch_team",
        ),
        (
            "kickoff_possession_team_is_team_0",
            "kickoff_possession_team",
        ),
        ("initiator_is_team_0", "initiator_team"),
        ("victim_is_team_0", "victim_team"),
    ] {
        if let Some(is_team_0) = bool_value(payload, &[field]) {
            push_unique_subject(
                &mut subjects,
                EventSubject {
                    kind: "team".to_owned(),
                    id: team_subject_id(is_team_0),
                    role: role.to_owned(),
                },
            );
        }
    }
    if let Some(id) = stringish_value(payload, &["pad_id", "boost_pad_id", "actor_id"])? {
        push_unique_subject(
            &mut subjects,
            EventSubject {
                kind: "boost_pad".to_owned(),
                id,
                role: "pad".to_owned(),
            },
        );
    }
    Ok(subjects)
}

fn append_nested_player_subjects(payload: &Value, subjects: &mut Vec<EventSubject>) -> Result<()> {
    for (field, role) in [
        ("team_zero_taker", "team_zero_taker"),
        ("team_one_taker", "team_one_taker"),
    ] {
        if let Some(subject) = nested_player_subject_from_field(payload, field, role)? {
            push_unique_subject(subjects, subject);
        }
    }
    for (field, role) in [
        ("team_zero_non_takers", "team_zero_support"),
        ("team_one_non_takers", "team_one_support"),
    ] {
        if let Some(players) = payload.get(field).and_then(Value::as_array) {
            for player in players {
                if let Some(subject) = player_subject_from_field(player, "player", role)? {
                    push_unique_subject(subjects, subject);
                }
            }
        }
    }
    Ok(())
}

fn nested_player_subject_from_field(
    payload: &Value,
    field: &str,
    role: &str,
) -> Result<Option<EventSubject>> {
    let Some(value) = payload.get(field) else {
        return Ok(None);
    };
    player_subject_from_field(value, "player", role)
}

fn push_unique_subject(subjects: &mut Vec<EventSubject>, subject: EventSubject) {
    if !subjects.iter().any(|existing| {
        existing.kind == subject.kind && existing.id == subject.id && existing.role == subject.role
    }) {
        subjects.push(subject);
    }
}

fn timeline_event_attributes(stream: &str, payload: &Value, meta: Option<&Value>) -> Value {
    let mut attributes = Map::new();
    attributes.insert("source_stream".to_owned(), Value::String(stream.to_owned()));
    if let Some(object) = payload.as_object() {
        for (key, value) in object {
            if matches!(value, Value::String(_) | Value::Number(_) | Value::Bool(_)) {
                attributes.insert(key.clone(), value.clone());
            }
        }
    }
    if let Some(kind) = payload.get("kind").and_then(normalized_variant_name) {
        attributes.insert("kind".to_owned(), Value::String(kind.to_owned()));
    }
    if let Some(is_team_0) = bool_value(payload, &["is_team_0", "team_is_team_0"]) {
        attributes.insert(
            "team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
    }
    if let Some(is_team_0) = bool_value(payload, &["scoring_team_is_team_0"]) {
        attributes.insert(
            "team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
        attributes.insert(
            "scoring_team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
    }
    if let Some(duration) = timeline_event_duration(payload) {
        attributes.insert("duration_seconds".to_owned(), Value::from(duration));
    }
    if let Some(properties) = meta
        .and_then(|meta| meta.get("properties"))
        .or_else(|| payload.get("properties"))
    {
        append_mechanic_property_attributes(properties, &mut attributes);
    }
    append_goal_tag_attributes(payload, &mut attributes);
    Value::Object(attributes)
}

fn event_scalar_fields(event: &IndexedEvent) -> Vec<EventScalarField> {
    let mut fields = Vec::new();
    append_json_scalar_fields("payload", "", &event.payload, &mut fields);
    append_json_scalar_fields("attribute", "", &event.attributes, &mut fields);
    fields
}

fn append_json_scalar_fields(
    source: &'static str,
    path: &str,
    value: &Value,
    fields: &mut Vec<EventScalarField>,
) {
    match value {
        Value::Object(object) => {
            if let Some(variant) = serialized_unit_variant(object) {
                push_string_scalar_field(
                    source,
                    scalar_path(path),
                    &normalize_identifier(variant),
                    fields,
                );
                return;
            }
            for (key, value) in object {
                let field_path = if path.is_empty() {
                    key.clone()
                } else {
                    format!("{path}.{key}")
                };
                append_json_scalar_fields(source, &field_path, value, fields);
            }
        }
        Value::Array(values) => {
            for (index, value) in values.iter().enumerate() {
                let field_path = format!("{}[{index}]", scalar_path(path));
                append_json_scalar_fields(source, &field_path, value, fields);
            }
        }
        Value::String(value) => {
            push_string_scalar_field(source, scalar_path(path), value, fields);
        }
        Value::Number(value) => {
            if let Some(value) = value.as_f64().filter(|value| value.is_finite()) {
                fields.push(EventScalarField {
                    source,
                    path: scalar_path(path),
                    value_kind: "number",
                    string_value: None,
                    numeric_value: Some(value),
                    boolean_value: None,
                });
            }
        }
        Value::Bool(value) => {
            fields.push(EventScalarField {
                source,
                path: scalar_path(path),
                value_kind: "boolean",
                string_value: None,
                numeric_value: None,
                boolean_value: Some(*value),
            });
        }
        Value::Null => {}
    }
}

fn push_string_scalar_field(
    source: &'static str,
    path: String,
    value: &str,
    fields: &mut Vec<EventScalarField>,
) {
    fields.push(EventScalarField {
        source,
        path,
        value_kind: "string",
        string_value: Some(value.to_owned()),
        numeric_value: None,
        boolean_value: None,
    });
}

fn scalar_path(path: &str) -> String {
    if path.is_empty() {
        "value".to_owned()
    } else {
        path.to_owned()
    }
}

fn serialized_unit_variant(object: &Map<String, Value>) -> Option<&str> {
    if object.len() != 1 {
        return None;
    }
    let (variant, value) = object.iter().next()?;
    match value {
        Value::Object(inner) if inner.is_empty() => Some(variant.as_str()),
        Value::Null => Some(variant.as_str()),
        _ => None,
    }
}

fn append_mechanic_property_attributes(properties: &Value, attributes: &mut Map<String, Value>) {
    let Some(properties) = properties.as_array() else {
        return;
    };
    for property in properties {
        let Some(key) = property.get("key").and_then(Value::as_str) else {
            continue;
        };
        let Some(value) = property.get("value") else {
            continue;
        };
        attributes.insert(key.to_owned(), stats_property_value(value));
    }
}

fn stats_property_value(value: &Value) -> Value {
    let Some(object) = value.as_object() else {
        return value.clone();
    };
    if object.len() == 1 {
        object.values().next().cloned().unwrap_or(Value::Null)
    } else {
        value.clone()
    }
}

fn append_goal_tag_attributes(payload: &Value, attributes: &mut Map<String, Value>) {
    let evidence_kinds = payload
        .get("evidence")
        .and_then(Value::as_array)
        .map(|evidence| {
            evidence
                .iter()
                .filter_map(|item| item.get("kind").and_then(normalized_variant_name))
                .map(|kind| Value::String(kind.to_owned()))
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();
    if !evidence_kinds.is_empty() {
        attributes.insert("evidence_kinds".to_owned(), Value::Array(evidence_kinds));
    }
    if let Some(modifiers) = payload.get("modifiers") {
        attributes.insert("modifiers".to_owned(), modifiers.clone());
    }
}

fn player_subject_from_field(
    payload: &Value,
    field: &str,
    role: &str,
) -> Result<Option<EventSubject>> {
    payload
        .get(field)
        .filter(|value| !value.is_null())
        .map(|value| {
            remote_id_value_to_subject_id(value).map(|id| EventSubject {
                kind: "player".to_owned(),
                id,
                role: role.to_owned(),
            })
        })
        .transpose()
}

fn player_subject_id_from_field(payload: &Value, field: &str) -> Result<Option<String>> {
    payload
        .get(field)
        .filter(|value| !value.is_null())
        .map(remote_id_value_to_subject_id)
        .transpose()
}

fn remote_id_value_to_subject_id(value: &Value) -> Result<String> {
    let Value::Object(object) = value else {
        return Ok(format!("unknown:{value}"));
    };
    let Some((kind, value)) = object.iter().next() else {
        return Ok("unknown:null".to_owned());
    };
    let platform = match kind.as_str() {
        "PlayStation" => "ps4",
        "PsyNet" => "psynet",
        "SplitScreen" => "splitscreen",
        "Steam" => "steam",
        "Switch" => "switch",
        "Xbox" => "xbox",
        "QQ" => "qq",
        "Epic" => "epic",
        other => {
            return Ok(format!(
                "{}:{}",
                other.to_ascii_lowercase(),
                json_scalar_text(value)?
            ))
        }
    };
    Ok(format!(
        "{platform}:{}",
        remote_id_platform_value_text(value)?
    ))
}

fn remote_id_platform_value_text(value: &Value) -> Result<String> {
    value
        .as_object()
        .and_then(|object| object.get("online_id"))
        .map(json_scalar_text)
        .unwrap_or_else(|| json_scalar_text(value))
}

fn json_scalar_text(value: &Value) -> Result<String> {
    match value {
        Value::String(value) => Ok(value.clone()),
        Value::Number(value) => Ok(value.to_string()),
        other => serde_json::to_string(other).context("failed to stringify JSON scalar"),
    }
}

fn serialized_variant_name(value: &Value) -> Option<&str> {
    value
        .as_str()
        .or_else(|| value.as_object()?.keys().next().map(String::as_str))
}

fn normalized_variant_name(value: &Value) -> Option<String> {
    serialized_variant_name(value).map(normalize_identifier)
}

fn normalize_identifier(value: &str) -> String {
    let mut normalized = String::new();
    let mut previous_was_separator = true;
    let mut previous_was_lower_or_digit = false;
    for character in value.chars() {
        if character == '-' || character == ' ' || character == '.' {
            if !previous_was_separator {
                normalized.push('_');
            }
            previous_was_separator = true;
            previous_was_lower_or_digit = false;
            continue;
        }
        if character == '_' {
            if !previous_was_separator {
                normalized.push('_');
            }
            previous_was_separator = true;
            previous_was_lower_or_digit = false;
            continue;
        }
        if character.is_uppercase() && previous_was_lower_or_digit {
            normalized.push('_');
        }
        for lowercase in character.to_lowercase() {
            normalized.push(lowercase);
        }
        previous_was_separator = false;
        previous_was_lower_or_digit = character.is_lowercase() || character.is_ascii_digit();
    }
    normalized.trim_matches('_').to_owned()
}

fn int_value(value: &Value, keys: &[&str]) -> Option<i32> {
    keys.iter().find_map(|key| {
        value
            .get(*key)
            .and_then(Value::as_i64)
            .and_then(|number| i32::try_from(number).ok())
    })
}

fn float_value(value: &Value, keys: &[&str]) -> Option<f64> {
    keys.iter()
        .find_map(|key| value.get(*key).and_then(Value::as_f64))
        .filter(|value| value.is_finite())
}

fn bool_value(value: &Value, keys: &[&str]) -> Option<bool> {
    keys.iter()
        .find_map(|key| value.get(*key).and_then(Value::as_bool))
}

fn required_string(value: &Value, key: &str) -> Result<String> {
    value
        .get(key)
        .and_then(Value::as_str)
        .map(ToOwned::to_owned)
        .with_context(|| format!("timeline event missing string field `{key}`"))
}

fn required_kind(value: &Value) -> Result<String> {
    required_normalized_variant(value, "kind")
}

fn required_normalized_variant(value: &Value, key: &str) -> Result<String> {
    value
        .get(key)
        .and_then(normalized_variant_name)
        .with_context(|| format!("timeline event missing variant field `{key}`"))
}

fn required_int(value: &Value, key: &str) -> Result<i32> {
    int_value(value, &[key]).with_context(|| format!("timeline event missing int field `{key}`"))
}

fn required_float(value: &Value, key: &str) -> Result<f64> {
    float_value(value, &[key])
        .with_context(|| format!("timeline event missing float field `{key}`"))
}

fn required_bool(value: &Value, key: &str) -> Result<bool> {
    bool_value(value, &[key]).with_context(|| format!("timeline event missing bool field `{key}`"))
}

fn required_team_bool(value: &Value, key: &str) -> Result<i32> {
    required_bool(value, key).map(|is_team_0| if is_team_0 { 0 } else { 1 })
}

fn team_bool(value: &Value, key: &str) -> Option<i32> {
    bool_value(value, &[key]).map(|is_team_0| if is_team_0 { 0 } else { 1 })
}

fn json_array_or_empty(value: &Value, key: &str) -> Value {
    value
        .get(key)
        .filter(|value| value.is_array())
        .cloned()
        .unwrap_or_else(|| Value::Array(Vec::new()))
}

fn stringish_value(value: &Value, keys: &[&str]) -> Result<Option<String>> {
    keys.iter()
        .find_map(|key| value.get(*key))
        .map(json_scalar_text)
        .transpose()
}

fn team_subject_id(is_team_0: bool) -> String {
    if is_team_0 {
        "0".to_owned()
    } else {
        "1".to_owned()
    }
}

fn resolve_replay_player_id(
    subject: &EventSubject,
    replay_players: &HashMap<String, Uuid>,
) -> Option<Uuid> {
    (subject.kind == "player")
        .then(|| replay_players.get(&subject.id).copied())
        .flatten()
}

fn display_name_from_key(key: &str) -> String {
    key.split(['.', '_', '-'])
        .filter(|part| !part.is_empty())
        .map(|part| {
            let mut chars = part.chars();
            match chars.next() {
                Some(first) => format!("{}{}", first.to_uppercase(), chars.as_str()),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn event_stream_object_key(file_sha256: &str, analysis_run_id: Uuid) -> String {
    format!("event-streams/sha256/{file_sha256}/{analysis_run_id}.json")
}

fn subtr_actor_version() -> &'static str {
    option_env!("SUBTR_ACTOR_VERSION").unwrap_or("unknown")
}

type MechanicTimingColumns = (
    Option<i32>,
    Option<i32>,
    Option<i32>,
    Option<f64>,
    Option<f64>,
    Option<f64>,
);

async fn mark_analysis_run_succeeded(pool: &PgPool, analysis_run_id: Uuid) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE analysis_runs
        SET status = 'succeeded',
            finished_at = now(),
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(analysis_run_id)
    .execute(pool)
    .await
    .context("failed to mark analysis run succeeded")?;

    Ok(())
}

async fn mark_analysis_run_failed(
    pool: &PgPool,
    analysis_run_id: Uuid,
    error_message: &str,
) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE analysis_runs
        SET status = 'failed',
            finished_at = now(),
            error_message = $2,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(analysis_run_id)
    .bind(error_message)
    .execute(pool)
    .await
    .context("failed to mark analysis run failed")?;

    Ok(())
}

async fn mark_replay_parse_succeeded(
    pool: &PgPool,
    replay_id: Uuid,
    analysis_run_id: Uuid,
) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE replays replay
        SET canonical_analysis_run_id = analysis_run.id,
            parse_status = 'parsed',
            parsed_at = COALESCE(analysis_run.finished_at, now()),
            parsed_with_extractor_name = analysis_run.extractor_name,
            parsed_with_extractor_version = analysis_run.extractor_version,
            parsed_with_event_stream_schema_version = analysis_run.event_stream_schema_version,
            parsed_with_rocket_sense_git_sha = COALESCE(
                analysis_run.rocket_sense_git_sha,
                analysis_run.extractor_git_sha
            ),
            parsed_with_subtr_actor_version = analysis_run.subtr_actor_version,
            parsed_with_subtr_actor_git_sha = analysis_run.subtr_actor_git_sha,
            updated_at = now()
        FROM analysis_runs analysis_run
        WHERE replay.id = $1
          AND analysis_run.id = $2
        "#,
    )
    .bind(replay_id)
    .bind(analysis_run_id)
    .execute(pool)
    .await
    .context("failed to mark replay parse succeeded")?;

    Ok(())
}

async fn set_replay_status(pool: &PgPool, replay_id: Uuid, status: &str) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE replays
        SET parse_status = $2,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .bind(status)
    .execute(pool)
    .await
    .with_context(|| format!("failed to set replay status to `{status}`"))?;

    Ok(())
}
