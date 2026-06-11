use crate::{api, processing, settings};
use anyhow::Result;
use axum::{extract::DefaultBodyLimit, Router};
use rocket_sense_storage::{LocalStorage, ObjectStorage};
use sqlx::PgPool;
use std::sync::Arc;
use tokio::sync::Semaphore;
use tower_http::{cors::CorsLayer, trace::TraceLayer};

const MAX_REPLAY_UPLOAD_BYTES: usize = 64 * 1024 * 1024;

#[derive(Clone)]
pub struct AppState {
    pub db: Option<PgPool>,
    pub storage: Arc<dyn ObjectStorage>,
    pub auth_mode: crate::settings::AuthMode,
    pub app_jwt_secret: Arc<str>,
    pub oauth_providers: Arc<[settings::OAuthProviderSettings]>,
    pub process_replays_in_background: bool,
    pub background_processing_permits: Arc<Semaphore>,
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

    Ok(api::router(state)
        .layer(DefaultBodyLimit::max(MAX_REPLAY_UPLOAD_BYTES))
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http()))
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
