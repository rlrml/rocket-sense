// Large serde_json::json! literals in tests (kickoff detail payloads) exceed
// the default macro recursion limit.
#![recursion_limit = "256"]

mod api;
mod app;
mod auth;
mod population_stats;
mod processing;
mod ranks;
mod settings;
mod telemetry;

use anyhow::Context;
use settings::{ServiceMode, Settings};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    telemetry::init()?;

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
