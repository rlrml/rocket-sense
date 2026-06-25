use crate::{
    api, processing,
    rank_benchmark::{BenchmarkWindow, CalcStyle},
    settings, telemetry,
};
use anyhow::Result;
use axum::{extract::DefaultBodyLimit, Router};
use rocket_sense_storage::{LocalStorage, ObjectStorage};
use sqlx::PgPool;
use std::sync::Arc;
use tokio::sync::Semaphore;
use tower_http::cors::CorsLayer;

pub(crate) const MAX_REPLAY_UPLOAD_BYTES: usize = 64 * 1024 * 1024;

#[derive(Clone)]
pub struct AppState {
    pub db: Option<PgPool>,
    pub storage: Arc<dyn ObjectStorage>,
    pub auth_mode: crate::settings::AuthMode,
    pub app_jwt_secret: Arc<str>,
    pub oauth_providers: Arc<[settings::OAuthProviderSettings]>,
    pub process_replays_in_background: bool,
    pub background_processing_permits: Arc<Semaphore>,
    /// Gates the lifetime stat-count read path between the materialized
    /// `player_replay_event_counts` table and the live event-subject scan.
    pub materialized_stat_counts: bool,
    /// Gates the rank-median benchmark cohort read path (`rank_benchmark_*`
    /// response fields). Off until the first refresh has populated the table.
    pub rank_benchmark_enabled: bool,
    /// Windows the read path exposes in `rank_benchmark_available_windows` and
    /// resolves overrides against; mirrors what the refresh job materializes.
    pub rank_benchmark_windows: Arc<[BenchmarkWindow]>,
    /// `window_key` served when a request carries no `rank-benchmark-window`.
    pub rank_benchmark_default_window: Arc<str>,
    /// How the refresh computes a stat's rate sample (per-appearance / per-player).
    pub rank_benchmark_calc: CalcStyle,
    /// Email addresses that are auto-promoted to admin on authentication.
    pub admin_emails: Arc<[String]>,
}

pub async fn build(settings: settings::Settings) -> Result<Router> {
    let db = if let Some(database_url) = &settings.database_url {
        let pool = rocket_sense_db::connect(database_url).await?;
        if settings.run_migrations {
            rocket_sense_db::run_migrations(&pool).await?;
            processing::setup_replay_processing_queue(&pool).await?;
        }
        Some(pool)
    } else {
        tracing::warn!("DATABASE_URL is not set; starting without postgres connection");
        None
    };

    let state = AppState {
        db,
        storage: Arc::new(LocalStorage::new(settings.storage_root)),
        auth_mode: settings.auth_mode,
        app_jwt_secret: Arc::from(settings.app_jwt_secret),
        oauth_providers: Arc::from(settings.oauth_providers),
        process_replays_in_background: settings.process_replays_in_background,
        background_processing_permits: Arc::new(Semaphore::new(
            settings.background_processing_concurrency,
        )),
        materialized_stat_counts: settings.materialized_stat_counts,
        rank_benchmark_enabled: settings.rank_benchmark_enabled,
        rank_benchmark_windows: Arc::from(settings.rank_benchmark_windows),
        rank_benchmark_default_window: Arc::from(settings.rank_benchmark_default_window),
        rank_benchmark_calc: settings.rank_benchmark_calc,
        admin_emails: Arc::from(settings.admin_emails),
    };

    if state.process_replays_in_background {
        if let Some(pool) = &state.db {
            if settings.run_replay_processing_workers {
                processing::start_replay_processing_workers(
                    pool.clone(),
                    state.storage.clone(),
                    settings.background_processing_concurrency,
                );
                processing::start_event_stream_gc_sweeper(pool.clone(), state.storage.clone());
                if state.rank_benchmark_enabled {
                    processing::start_rank_benchmark_refresh_job(
                        pool.clone(),
                        state.rank_benchmark_windows.to_vec(),
                        state.rank_benchmark_calc,
                    );
                }
                match processing::enqueue_unfinished_replay_processing(pool).await {
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
        }
    }

    let router = api::router(state)
        .layer(DefaultBodyLimit::max(MAX_REPLAY_UPLOAD_BYTES))
        .layer(CorsLayer::permissive());
    Ok(telemetry::apply_http_layers(router))
}

pub async fn run_worker(settings: settings::Settings) -> Result<()> {
    let database_url = settings
        .database_url
        .as_deref()
        .ok_or_else(|| anyhow::anyhow!("DATABASE_URL is required in worker mode"))?;
    let pool = rocket_sense_db::connect(database_url).await?;
    if settings.run_migrations {
        rocket_sense_db::run_migrations(&pool).await?;
        processing::setup_replay_processing_queue(&pool).await?;
    }

    let storage: Arc<dyn ObjectStorage> = Arc::new(LocalStorage::new(settings.storage_root));
    processing::start_replay_processing_workers(
        pool.clone(),
        storage.clone(),
        settings.background_processing_concurrency,
    );
    processing::start_event_stream_gc_sweeper(pool.clone(), storage);
    if settings.rank_benchmark_enabled {
        processing::start_rank_benchmark_refresh_job(
            pool.clone(),
            settings.rank_benchmark_windows.clone(),
            settings.rank_benchmark_calc,
        );
    }

    match processing::enqueue_unfinished_replay_processing(&pool).await {
        Ok(count) if count > 0 => {
            tracing::info!(
                count,
                "enqueued unfinished replay processing on worker startup"
            );
        }
        Ok(_) => {}
        Err(error) => {
            tracing::error!(
                error = %error,
                "failed to enqueue unfinished replay processing on worker startup"
            );
        }
    }

    tracing::info!(
        concurrency = settings.background_processing_concurrency,
        "replay processing worker started"
    );
    std::future::pending::<()>().await;
    Ok(())
}
