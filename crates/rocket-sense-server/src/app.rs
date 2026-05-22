use crate::{api, settings};
use anyhow::Result;
use axum::Router;
use rocket_sense_storage::{LocalStorage, ObjectStorage};
use sqlx::PgPool;
use std::sync::Arc;
use tower_http::{cors::CorsLayer, trace::TraceLayer};

#[derive(Clone)]
pub struct AppState {
    pub db: Option<PgPool>,
    pub storage: Arc<dyn ObjectStorage>,
    pub auth_mode: crate::settings::AuthMode,
    pub public_base_url: Arc<str>,
    pub app_jwt_secret: Arc<str>,
    pub google_oauth: Option<Arc<settings::GoogleOAuthSettings>>,
    pub process_replays_in_background: bool,
}

pub async fn build(settings: settings::Settings) -> Result<Router> {
    let db = if let Some(database_url) = &settings.database_url {
        let pool = rocket_sense_db::connect(database_url).await?;
        if settings.run_migrations {
            rocket_sense_db::run_migrations(&pool).await?;
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
        public_base_url: Arc::from(settings.public_base_url),
        app_jwt_secret: Arc::from(settings.app_jwt_secret),
        google_oauth: settings.google_oauth.map(Arc::new),
        process_replays_in_background: settings.process_replays_in_background,
    };

    Ok(api::router(state)
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http()))
}
