//! Mirror a ballchasing.com group (and its nested subgroups) into rocket-sense
//! replay groups, re-syncably.
//!
//! A "mirror" replay group records the ballchasing group id it reflects
//! (`replay_groups.ballchasing_group_id`). Syncing walks the ballchasing tree:
//! each ballchasing subgroup becomes a nested replay group (keyed by its
//! ballchasing id so re-runs are idempotent), and each ballchasing replay is
//! imported through the normal upload pipeline (downloading only the ones not
//! already present) and attached to the matching group. Because groups nest,
//! stats on the mirror root automatically aggregate the whole subtree (see
//! migration 0077).
//!
//! The heavy work (downloading + parsing potentially hundreds of replays under
//! a 2 req/s ballchasing rate limit) runs as an apalis background job, mirroring
//! the replay-processing worker in `crate::processing`.

use std::sync::Arc;

use anyhow::{anyhow, Context, Result};
use apalis::prelude::*;
use apalis_postgres::{
    CompactType, Config as ApalisPostgresConfig, JsonCodec, PgNotify, PostgresStorage,
};
use rocket_sense_storage::ObjectStorage;
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Row};
use uuid::Uuid;

use crate::api::{
    can_user_access_replay, find_replay_by_external_replay_id, import_replay_from_bytes,
    ReplayImportRequest,
};
use crate::ballchasing::{BallchasingClient, BallchasingGroup};

const BALLCHASING_SYNC_QUEUE_NAME: &str = "rocket-sense:ballchasing-group-sync";

/// Counts surfaced in logs after a sync run.
#[derive(Debug, Default, Clone)]
pub struct SyncSummary {
    pub groups: u64,
    pub replays_imported: u64,
    pub replays_existing: u64,
    pub memberships_added: u64,
}

/// The mirror root's identity needed to drive a sync.
struct MirrorRoot {
    ballchasing_group_id: String,
    created_by_user_id: Uuid,
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

/// Run a full (re-)sync of the mirror group `root_group_id` against ballchasing.
/// Idempotent: subgroups upsert by ballchasing id and memberships use
/// `ON CONFLICT DO NOTHING`, so re-running only adds what is new.
pub async fn sync_mirror_group(
    pool: &PgPool,
    storage: &dyn ObjectStorage,
    api_key: &str,
    process_in_background: bool,
    root_group_id: Uuid,
) -> Result<SyncSummary> {
    let root = load_mirror_root(pool, root_group_id)
        .await?
        .ok_or_else(|| anyhow!("replay group {root_group_id} is not a ballchasing mirror"))?;

    mark_sync_started(pool, root_group_id).await?;

    let client = BallchasingClient::new(api_key.to_owned());
    let result = walk_tree(
        &client,
        pool,
        storage,
        process_in_background,
        root_group_id,
        &root.ballchasing_group_id,
        root.created_by_user_id,
    )
    .await;

    match &result {
        Ok(summary) => {
            mark_sync_finished(pool, root_group_id, None).await?;
            tracing::info!(
                %root_group_id,
                groups = summary.groups,
                imported = summary.replays_imported,
                existing = summary.replays_existing,
                memberships = summary.memberships_added,
                "ballchasing mirror sync finished"
            );
        }
        Err(error) => {
            mark_sync_finished(pool, root_group_id, Some(&error.to_string())).await?;
        }
    }

    result
}

/// Iteratively walk the ballchasing group tree from the root, mirroring groups
/// and importing replays. An explicit work stack avoids boxed async recursion.
async fn walk_tree(
    client: &BallchasingClient,
    pool: &PgPool,
    storage: &dyn ObjectStorage,
    process_in_background: bool,
    root_group_id: Uuid,
    root_ballchasing_id: &str,
    created_by_user_id: Uuid,
) -> Result<SyncSummary> {
    let mut summary = SyncSummary::default();
    // Work items left to process. `counts` is known for discovered subgroups and
    // lets us skip rate-limited list calls; it is None for the root (so we always
    // list both replays and children there).
    struct Pending {
        rs_group_id: Uuid,
        bc_group_id: String,
        counts: Option<(u32, u32)>, // (direct_replays, indirect_replays)
    }
    let mut stack = vec![Pending {
        rs_group_id: root_group_id,
        bc_group_id: root_ballchasing_id.to_owned(),
        counts: None,
    }];

    while let Some(Pending {
        rs_group_id,
        bc_group_id,
        counts,
    }) = stack.pop()
    {
        // Replays filed directly under this ballchasing group. Skip the call when
        // we know there are none (ballchasing's rate limit is the bottleneck).
        let has_direct = counts.is_none_or(|(direct, _)| direct > 0);
        if has_direct {
            let replays = client.list_direct_replays(&bc_group_id).await?;
            for replay_ref in replays {
                let replay_id = attach_replay(
                    client,
                    pool,
                    storage,
                    process_in_background,
                    &replay_ref.id,
                    replay_ref.replay_title.as_deref(),
                    created_by_user_id,
                    &mut summary,
                )
                .await
                .with_context(|| format!("failed to mirror replay {}", replay_ref.id))?;
                if attach_membership(pool, rs_group_id, replay_id, created_by_user_id).await? {
                    summary.memberships_added += 1;
                }
            }
        }

        // Nested subgroups become nested replay groups. Skip the call when the
        // indirect count equals the direct count (no replays live in subgroups).
        let has_subgroups = counts.is_none_or(|(direct, indirect)| indirect > direct);
        if has_subgroups {
            let children = client.list_child_groups(&bc_group_id).await?;
            for child in children {
                let child_rs_id =
                    upsert_mirror_subgroup(pool, rs_group_id, &child, created_by_user_id).await?;
                summary.groups += 1;
                stack.push(Pending {
                    rs_group_id: child_rs_id,
                    bc_group_id: child.id,
                    counts: Some((child.direct_replays, child.indirect_replays)),
                });
            }
        }
    }

    Ok(summary)
}

/// Resolve a ballchasing replay to a rocket-sense replay id, downloading and
/// importing it only if it is not already present (matched by ballchasing id).
#[allow(clippy::too_many_arguments)]
async fn attach_replay(
    client: &BallchasingClient,
    pool: &PgPool,
    storage: &dyn ObjectStorage,
    process_in_background: bool,
    ballchasing_replay_id: &str,
    replay_title: Option<&str>,
    created_by_user_id: Uuid,
    summary: &mut SyncSummary,
) -> Result<Uuid> {
    if let Some(existing) = find_replay_by_external_replay_id(pool, ballchasing_replay_id)
        .await
        .context("lookup by external replay id failed")?
    {
        if !can_user_access_replay(pool, existing.id, created_by_user_id)
            .await
            .map_err(|error| anyhow!("replay access check failed: {}", error.message()))?
        {
            return Err(anyhow!(
                "an inaccessible replay with this ballchasing id already exists"
            ));
        }
        summary.replays_existing += 1;
        return Ok(existing.id);
    }

    let bytes = client.download_replay(ballchasing_replay_id).await?;
    let replay = import_replay_from_bytes(
        pool,
        storage,
        process_in_background,
        ReplayImportRequest {
            bytes,
            original_file_name: replay_title,
            external_replay_id: Some(ballchasing_replay_id),
            uploaded_by_user_id: created_by_user_id,
        },
    )
    .await
    .map_err(|error| anyhow!("import failed: {}", error.message()))?;
    summary.replays_imported += 1;
    Ok(replay.id)
}

// ---------------------------------------------------------------------------
// DB helpers
// ---------------------------------------------------------------------------

async fn load_mirror_root(pool: &PgPool, group_id: Uuid) -> Result<Option<MirrorRoot>> {
    let row = sqlx::query(
        "SELECT ballchasing_group_id, created_by_user_id \
         FROM replay_groups WHERE id = $1",
    )
    .bind(group_id)
    .fetch_optional(pool)
    .await
    .context("failed to load mirror root")?;

    let Some(row) = row else { return Ok(None) };
    let ballchasing_group_id: Option<String> = row.try_get("ballchasing_group_id")?;
    let created_by_user_id: Option<Uuid> = row.try_get("created_by_user_id")?;
    let Some(ballchasing_group_id) = ballchasing_group_id else {
        return Ok(None);
    };
    let created_by_user_id = created_by_user_id
        .ok_or_else(|| anyhow!("mirror group {group_id} has no creator to attribute imports to"))?;

    Ok(Some(MirrorRoot {
        ballchasing_group_id,
        created_by_user_id,
    }))
}

/// Insert or update the rocket-sense group mirroring a ballchasing subgroup,
/// keyed by ballchasing id so re-syncs reuse the same group. Returns its id.
async fn upsert_mirror_subgroup(
    pool: &PgPool,
    parent_group_id: Uuid,
    child: &BallchasingGroup,
    created_by_user_id: Uuid,
) -> Result<Uuid> {
    let row = sqlx::query(
        "INSERT INTO replay_groups (\
             id, parent_group_id, name, created_by_user_id, ballchasing_group_id, visibility\
         ) \
         SELECT $1, $2, $3, $4, $5, parent.visibility \
         FROM replay_groups parent WHERE parent.id = $2 \
         ON CONFLICT (ballchasing_group_id) WHERE ballchasing_group_id IS NOT NULL \
         DO UPDATE SET name = EXCLUDED.name, parent_group_id = EXCLUDED.parent_group_id, updated_at = now() \
         RETURNING id",
    )
    .bind(Uuid::now_v7())
    .bind(parent_group_id)
    .bind(child.name.trim())
    .bind(created_by_user_id)
    .bind(&child.id)
    .fetch_one(pool)
    .await
    .with_context(|| format!("failed to upsert mirror subgroup for {}", child.id))?;
    Ok(row.try_get("id")?)
}

/// Attach a replay to a group; returns true if a new membership was created.
async fn attach_membership(
    pool: &PgPool,
    group_id: Uuid,
    replay_id: Uuid,
    added_by_user_id: Uuid,
) -> Result<bool> {
    let result = sqlx::query(
        "INSERT INTO replay_group_replays (group_id, replay_id, added_by_user_id) \
         VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
    )
    .bind(group_id)
    .bind(replay_id)
    .bind(added_by_user_id)
    .execute(pool)
    .await
    .context("failed to attach replay to mirror group")?;
    Ok(result.rows_affected() > 0)
}

async fn mark_sync_started(pool: &PgPool, group_id: Uuid) -> Result<()> {
    sqlx::query(
        "UPDATE replay_groups \
         SET ballchasing_sync_status = 'syncing', ballchasing_sync_error = NULL, updated_at = now() \
         WHERE id = $1",
    )
    .bind(group_id)
    .execute(pool)
    .await
    .context("failed to mark sync started")?;
    Ok(())
}

async fn mark_sync_finished(pool: &PgPool, group_id: Uuid, error: Option<&str>) -> Result<()> {
    let status = if error.is_some() { "failed" } else { "synced" };
    sqlx::query(
        "UPDATE replay_groups \
         SET ballchasing_sync_status = $2, \
             ballchasing_sync_error = $3, \
             ballchasing_synced_at = CASE WHEN $3 IS NULL THEN now() ELSE ballchasing_synced_at END, \
             updated_at = now() \
         WHERE id = $1",
    )
    .bind(group_id)
    .bind(status)
    .bind(error)
    .execute(pool)
    .await
    .context("failed to mark sync finished")?;
    Ok(())
}

// ---------------------------------------------------------------------------
// Background job (apalis), modeled on crate::processing
// ---------------------------------------------------------------------------

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct BallchasingGroupSyncJob {
    group_id: Uuid,
}

#[derive(Clone)]
struct BallchasingSyncWorkerState {
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    api_key: Arc<str>,
    process_in_background: bool,
}

fn sync_producer(pool: &PgPool) -> PostgresStorage<BallchasingGroupSyncJob> {
    let config = ApalisPostgresConfig::new(BALLCHASING_SYNC_QUEUE_NAME);
    PostgresStorage::new_with_config(pool, &config)
}

fn sync_consumer(
    pool: &PgPool,
) -> PostgresStorage<BallchasingGroupSyncJob, CompactType, JsonCodec<CompactType>, PgNotify> {
    let config = ApalisPostgresConfig::new(BALLCHASING_SYNC_QUEUE_NAME);
    PostgresStorage::new_with_notify(pool, &config)
}

/// Enqueue a sync for a mirror group, deduping against any outstanding job for
/// the same group (one in-flight sync is enough).
pub async fn enqueue_ballchasing_group_sync(pool: &PgPool, group_id: Uuid) -> Result<()> {
    let already_queued: bool = sqlx::query_scalar(
        r#"
        SELECT EXISTS (
            SELECT 1
            FROM apalis.jobs
            WHERE job_type = $1
              AND status IN ('Pending', 'Queued', 'Running')
              AND convert_from(job, 'UTF8')::jsonb ->> 'group_id' = $2
        )
        "#,
    )
    .bind(BALLCHASING_SYNC_QUEUE_NAME)
    .bind(group_id.to_string())
    .fetch_one(pool)
    .await
    .with_context(|| format!("failed to check for queued ballchasing sync job for {group_id}"))?;
    if already_queued {
        return Ok(());
    }

    let mut backend = sync_producer(pool);
    backend
        .push(BallchasingGroupSyncJob { group_id })
        .await
        .with_context(|| format!("failed to enqueue ballchasing sync job for {group_id}"))?;
    Ok(())
}

async fn run_sync_job(
    job: BallchasingGroupSyncJob,
    state: Data<BallchasingSyncWorkerState>,
) -> Result<(), BoxDynError> {
    tracing::info!(group_id = %job.group_id, "started ballchasing group sync job");
    sync_mirror_group(
        &state.pool,
        state.storage.as_ref(),
        &state.api_key,
        state.process_in_background,
        job.group_id,
    )
    .await?;
    Ok(())
}

/// Spawn the worker that drains the ballchasing-sync queue. Like the replay
/// worker, it uses a fresh worker name per attempt and restarts on failure.
pub fn start_ballchasing_group_sync_workers(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    api_key: Arc<str>,
    process_in_background: bool,
) {
    let state = BallchasingSyncWorkerState {
        pool,
        storage,
        api_key,
        process_in_background,
    };

    tokio::spawn(async move {
        loop {
            let instance = Uuid::new_v4().simple().to_string();
            let worker_name = format!("ballchasing-group-sync-{instance}");
            // Concurrency 1: ballchasing's rate limit is the real bottleneck, and
            // the client serializes its own requests anyway.
            let worker = WorkerBuilder::new(worker_name.clone())
                .backend(sync_consumer(&state.pool))
                .concurrency(1)
                .data(state.clone())
                .build(run_sync_job);

            match worker.run().await {
                Ok(()) => {
                    tracing::info!(worker = worker_name, "ballchasing sync worker exited");
                    break;
                }
                Err(error) => {
                    tracing::error!(
                        worker = worker_name,
                        error = %error,
                        "ballchasing sync worker stopped; restarting in 5s"
                    );
                    tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                }
            }
        }
    });
}
