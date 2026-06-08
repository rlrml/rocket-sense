mod api;
mod app;
mod auth;
mod processing;
mod settings;

use anyhow::Context;
use settings::{ServiceMode, Settings};
use tokio::net::TcpListener;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "rocket_sense_server=info,tower_http=info".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let settings = Settings::from_env()?;
    match settings.service_mode {
        ServiceMode::Server => {
            let app = app::build(settings.clone()).await?;
            let listener = TcpListener::bind(settings.bind_addr)
                .await
                .with_context(|| format!("failed to bind {}", settings.bind_addr))?;

            tracing::info!(addr = %settings.bind_addr, "listening");
            axum::serve(listener, app).await?;
        }
        ServiceMode::Worker => {
            app::run_worker(settings).await?;
        }
    }

    Ok(())
}
