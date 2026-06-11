use sqlx::{postgres::PgPoolOptions, PgPool};
use std::time::Duration;

#[derive(Debug, thiserror::Error)]
pub enum DbError {
    #[error("failed to connect to postgres")]
    Connect(#[source] sqlx::Error),
    #[error("failed to run database migrations")]
    Migrate(#[source] sqlx::migrate::MigrateError),
}

pub async fn connect(database_url: &str) -> Result<PgPool, DbError> {
    PgPoolOptions::new()
        .max_connections(20)
        .acquire_timeout(Duration::from_secs(10))
        .connect(database_url)
        .await
        .map_err(DbError::Connect)
}

pub async fn run_migrations(pool: &PgPool) -> Result<(), DbError> {
    sqlx::migrate!("../../migrations")
        .run(pool)
        .await
        .map_err(DbError::Migrate)
}
