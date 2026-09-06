use crate::{
    api,
    ballchasing::BallchasingClient,
    ballchasing_storage::BallchasingBackedStorage,
    processing,
    rank_benchmark::{BenchmarkWindow, CalcStyle},
    settings, telemetry,
};
use anyhow::{Context, Result};
use axum::{extract::DefaultBodyLimit, Router};
use rocket_sense_egress::EgressPool;
use rocket_sense_storage::{LocalStorage, ObjectStorage};
use sqlx::PgPool;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::Semaphore;
use tower_http::cors::CorsLayer;

pub(crate) const MAX_REPLAY_UPLOAD_BYTES: usize = 64 * 1024 * 1024;

/// Run the configured service mode. This is the executable's single entry
/// point after settings and telemetry have been initialized.
pub async fn run(settings: settings::Settings) -> Result<()> {
    match settings.service_mode {
        settings::ServiceMode::Server => run_server(settings).await,
        settings::ServiceMode::Worker => run_worker(settings).await,
    }
}

async fn run_server(settings: settings::Settings) -> Result<()> {
    let bind_addr = settings.bind_addr;
    let router = build(settings).await?;
    let listener = TcpListener::bind(bind_addr)
        .await
        .with_context(|| format!("failed to bind {bind_addr}"))?;

    tracing::info!(addr = %bind_addr, "listening");
    axum::serve(listener, router).await?;
    Ok(())
}

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
    /// Shared client for mirror sync and dynamically backed replay reads.
    pub ballchasing_client: Option<Arc<BallchasingClient>>,
    /// Round-robin SOCKS5 egress pool for rate-limited upstreams (ballchasing
    /// replay-file proxying). A single direct exit unless proxies are configured.
    pub egress: Arc<EgressPool>,
}

pub async fn build(settings: settings::Settings) -> Result<Router> {
    let db = if let Some(database_url) = &settings.database_url {
        let pool = rocket_sense_db::connect(database_url).await?;
        if settings.run_migrations {
            rocket_sense_db::run_migrations(&pool).await?;
            processing::initialize(&pool).await?;
        }
        Some(pool)
    } else {
        tracing::warn!("DATABASE_URL is not set; starting without postgres connection");
        None
    };

    let egress = Arc::new(EgressPool::new(
        settings.egress.pool.clone(),
        settings.egress.exits.clone(),
    )?);
    tracing::info!(exits = egress.len(), "egress pool initialized");

    let ballchasing_client = settings
        .ballchasing_api_key
        .as_ref()
        .map(|api_key| Arc::new(BallchasingClient::new(api_key.clone())));
    let storage: Arc<dyn ObjectStorage> = Arc::new(BallchasingBackedStorage::new(
        LocalStorage::new(settings.storage_root.clone()),
        ballchasing_client.clone(),
    ));
    if settings.process_replays_in_background && settings.run_replay_processing_workers {
        if let Some(pool) = &db {
            processing::start(
                pool.clone(),
                storage.clone(),
                ballchasing_client.clone(),
                &settings,
            )
            .await;
        }
    }

    let state = AppState {
        db,
        storage,
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
        ballchasing_client,
        egress,
    };

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
        processing::initialize(&pool).await?;
    }

    let ballchasing_client = settings
        .ballchasing_api_key
        .as_ref()
        .map(|api_key| Arc::new(BallchasingClient::new(api_key.clone())));
    let storage: Arc<dyn ObjectStorage> = Arc::new(BallchasingBackedStorage::new(
        LocalStorage::new(settings.storage_root.clone()),
        ballchasing_client.clone(),
    ));
    processing::start(pool, storage, ballchasing_client, &settings).await;

    tracing::info!(
        concurrency = settings.background_processing_concurrency,
        "replay processing worker started"
    );
    std::future::pending::<()>().await;
    Ok(())
}
