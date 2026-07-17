//! Application-facing replay processing requests.
//!
//! Callers express what processing they need without depending on how work is
//! scheduled. The current adapter uses the durable Postgres job queue in
//! [`super::jobs`]; replacing that adapter should not change API handlers or
//! replay-import code.

use super::jobs;
use anyhow::Result;
use sqlx::PgPool;
use uuid::Uuid;

pub async fn initialize(pool: &PgPool) -> Result<()> {
    jobs::setup_replay_processing_queue(pool).await
}

pub async fn request_replay_processing(pool: &PgPool, replay_id: Uuid) -> Result<()> {
    jobs::enqueue_replay_processing_job(pool, replay_id).await
}

pub async fn request_replay_reprocessing(pool: &PgPool, replay_id: Uuid) -> Result<bool> {
    jobs::enqueue_replay_reprocessing_job(pool, replay_id).await
}

pub async fn request_replay_reprocessing_batch(
    pool: &PgPool,
    options: jobs::ReplayReprocessOptions,
) -> Result<jobs::ReplayReprocessSummary> {
    jobs::enqueue_replay_reprocessing(pool.clone(), options).await
}
