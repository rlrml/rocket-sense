use crate::{api, settings::Settings};
use anyhow::Result;
use axum::Router;
use rocket_sense_storage::LocalStorage;
use sqlx::PgPool;
use tower_http::{cors::CorsLayer, trace::TraceLayer};

#[derive(Clone)]
pub struct AppState {
    pub db: Option<PgPool>,
    pub storage: LocalStorage,
}

pub async fn build(settings: Settings) -> Result<Router> {
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
        storage: LocalStorage::new(settings.storage_root),
    };

    Ok(api::router(state)
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http()))
}
