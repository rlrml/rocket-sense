use anyhow::{Context, Result};
use rocket_sense_storage::ObjectStorage;
use sqlx::{PgPool, Row};
use std::sync::Arc;
use uuid::Uuid;

#[derive(Debug, Clone)]
struct SupersededEventStream {
    analysis_run_id: Uuid,
    replay_id: Uuid,
    event_stream_object_key: String,
    event_stream_storage_byte_size: u64,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct EventStreamGcSummary {
    pub matched_objects: u64,
    pub deleted_objects: u64,
    pub reclaimed_storage_bytes: u64,
    pub dry_run: bool,
}

fn superseded_event_stream_from_row(row: &sqlx::postgres::PgRow) -> Result<SupersededEventStream> {
    let storage_byte_size: Option<i64> = row.try_get("event_stream_storage_byte_size")?;
    Ok(SupersededEventStream {
        analysis_run_id: row.try_get("id")?,
        replay_id: row.try_get("replay_id")?,
        event_stream_object_key: row.try_get("event_stream_object_key")?,
        event_stream_storage_byte_size: storage_byte_size.unwrap_or(0).max(0) as u64,
    })
}

/// Storage-side companion to [`prune_superseded_run_events`]: delete the event
/// stream objects belonging to this replay's superseded analysis runs and
/// clear their storage metadata. The `analysis_runs` rows stay behind as an
/// audit trail, but stream objects are only ever read for the canonical run,
/// so keeping one per superseded run leaked storage without bound (~37G of
/// ~40G when the node disk filled on 2026-06-11). Runs still marked `running`
/// are skipped: a concurrent re-analysis writes its stream object before it
/// becomes canonical.
pub(super) async fn delete_superseded_run_event_streams(
    pool: &PgPool,
    storage: &dyn ObjectStorage,
    replay_id: Uuid,
    canonical_analysis_run_id: Uuid,
) -> Result<EventStreamGcSummary> {
    let streams = sqlx::query(
        r#"
        SELECT id, replay_id, event_stream_object_key, event_stream_storage_byte_size
        FROM analysis_runs
        WHERE replay_id = $1
          AND id <> $2
          AND status <> 'running'
          AND event_stream_object_key IS NOT NULL
        "#,
    )
    .bind(replay_id)
    .bind(canonical_analysis_run_id)
    .fetch_all(pool)
    .await
    .context("failed to list superseded event stream objects for replay")?
    .iter()
    .map(superseded_event_stream_from_row)
    .collect::<Result<Vec<_>>>()?;

    delete_event_stream_objects(pool, storage, &streams, false).await
}

/// Delete each stream's object from storage, then clear the run's stream
/// metadata and its `replay_objects` row. The object is removed first and
/// deletion is idempotent, so a crash between the two steps leaves a dangling
/// DB reference that the next prune or GC sweep retries — never an
/// unreferenced object that no sweep would find.
async fn delete_event_stream_objects(
    pool: &PgPool,
    storage: &dyn ObjectStorage,
    streams: &[SupersededEventStream],
    dry_run: bool,
) -> Result<EventStreamGcSummary> {
    let mut summary = EventStreamGcSummary {
        matched_objects: streams.len() as u64,
        dry_run,
        ..EventStreamGcSummary::default()
    };

    for stream in streams {
        if !dry_run {
            storage
                .delete(&stream.event_stream_object_key)
                .await
                .with_context(|| {
                    format!(
                        "failed to delete superseded event stream object `{}`",
                        stream.event_stream_object_key
                    )
                })?;

            sqlx::query(
                r#"
                UPDATE analysis_runs
                SET event_stream_object_key = NULL,
                    event_stream_sha256 = NULL,
                    event_stream_byte_size = NULL,
                    event_stream_storage_encoding = NULL,
                    event_stream_storage_byte_size = NULL,
                    updated_at = now()
                WHERE id = $1
                "#,
            )
            .bind(stream.analysis_run_id)
            .execute(pool)
            .await
            .context("failed to clear superseded event stream metadata")?;

            sqlx::query(
                r#"
                DELETE FROM replay_objects
                WHERE replay_id = $1
                  AND kind = 'event_stream'
                  AND storage_key = $2
                "#,
            )
            .bind(stream.replay_id)
            .bind(&stream.event_stream_object_key)
            .execute(pool)
            .await
            .context("failed to delete superseded event stream replay object row")?;
        }

        summary.deleted_objects += 1;
        summary.reclaimed_storage_bytes += stream.event_stream_storage_byte_size;
    }

    Ok(summary)
}

/// Garbage-collect event stream objects across *all* replays whose analysis
/// runs were superseded before stream GC existed (or whose inline GC failed).
/// Only replays with a canonical run are touched, and `running` runs are left
/// alone so an in-flight re-analysis cannot lose its freshly written stream.
/// Recent runs are also skipped: a run flips to `succeeded` an instant before
/// the replay's canonical pointer moves to it, and a sweep landing in that
/// window would otherwise see the new run as superseded. With `dry_run` the
/// summary reports what would be deleted without touching storage or the
/// database.
pub async fn gc_superseded_event_streams(
    pool: &PgPool,
    storage: &dyn ObjectStorage,
    dry_run: bool,
) -> Result<EventStreamGcSummary> {
    let streams = sqlx::query(
        r#"
        SELECT run.id, run.replay_id, run.event_stream_object_key, run.event_stream_storage_byte_size
        FROM analysis_runs run
        JOIN replays replay ON replay.id = run.replay_id
        WHERE replay.canonical_analysis_run_id IS NOT NULL
          AND run.id <> replay.canonical_analysis_run_id
          AND run.status <> 'running'
          AND run.started_at < now() - interval '1 hour'
          AND run.event_stream_object_key IS NOT NULL
        ORDER BY run.id
        "#,
    )
    .fetch_all(pool)
    .await
    .context("failed to list superseded event stream objects")?
    .iter()
    .map(superseded_event_stream_from_row)
    .collect::<Result<Vec<_>>>()?;

    delete_event_stream_objects(pool, storage, &streams, dry_run).await
}

const EVENT_STREAM_GC_SWEEP_INITIAL_DELAY: std::time::Duration = std::time::Duration::from_secs(60);
const EVENT_STREAM_GC_SWEEP_INTERVAL: std::time::Duration =
    std::time::Duration::from_secs(24 * 60 * 60);

/// Periodically run [`gc_superseded_event_streams`] so stream objects orphaned
/// before inline GC existed (or whose inline GC failed) are reclaimed without
/// operator intervention. Started alongside the replay processing workers, so
/// exactly one service instance runs it.
pub(super) fn start_event_stream_gc_sweeper(pool: PgPool, storage: Arc<dyn ObjectStorage>) {
    tokio::spawn(async move {
        tokio::time::sleep(EVENT_STREAM_GC_SWEEP_INITIAL_DELAY).await;
        loop {
            match gc_superseded_event_streams(&pool, storage.as_ref(), false).await {
                Ok(summary) if summary.deleted_objects > 0 => {
                    tracing::info!(
                        deleted_objects = summary.deleted_objects,
                        reclaimed_storage_bytes = summary.reclaimed_storage_bytes,
                        "event stream GC sweep deleted superseded objects"
                    );
                }
                Ok(_) => {
                    tracing::debug!("event stream GC sweep found nothing to delete");
                }
                Err(error) => {
                    tracing::warn!(
                        error = %format!("{error:#}"),
                        "event stream GC sweep failed"
                    );
                }
            }
            tokio::time::sleep(EVENT_STREAM_GC_SWEEP_INTERVAL).await;
        }
    });
}
