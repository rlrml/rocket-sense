//! Startup orchestration for the long-lived processing services.
//!
//! The HTTP server and the dedicated worker use the same runtime so queue
//! recovery, maintenance jobs, and optional sync workers cannot drift apart.

use super::event_stream_gc::start_event_stream_gc_sweeper;
use super::jobs::{enqueue_unfinished_replay_processing, start_replay_processing_workers};
use super::rank_benchmark_refresh::start_rank_benchmark_refresh_job;
use crate::ballchasing::BallchasingClient;
use crate::settings::Settings;
use rocket_sense_storage::ObjectStorage;
use sqlx::PgPool;
use std::sync::Arc;

pub async fn start(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    ballchasing_client: Option<Arc<BallchasingClient>>,
    settings: &Settings,
) {
    start_replay_processing_workers(
        pool.clone(),
        storage.clone(),
        settings.background_processing_concurrency,
    );

    if let Some(client) = ballchasing_client {
        crate::ballchasing_sync::start_ballchasing_group_sync_workers(
            pool.clone(),
            client,
            settings.process_replays_in_background,
        );
    }

    start_event_stream_gc_sweeper(pool.clone(), storage);
    if settings.rank_benchmark_enabled {
        start_rank_benchmark_refresh_job(
            pool.clone(),
            settings.rank_benchmark_windows.clone(),
            settings.rank_benchmark_calc,
        );
    }

    match enqueue_unfinished_replay_processing(&pool).await {
        Ok(count) if count > 0 => {
            tracing::info!(count, "enqueued unfinished replay processing on startup");
        }
        Ok(_) => {}
        Err(error) => {
            tracing::error!(
                error = %error,
                "failed to enqueue unfinished replay processing on startup"
            );
        }
    }
}
