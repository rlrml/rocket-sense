// Large serde_json::json! literals in tests (kickoff detail payloads) exceed
// the default macro recursion limit.
#![recursion_limit = "256"]

mod api;
mod app;
mod auth;
mod ballchasing;
mod ballchasing_storage;
mod ballchasing_sync;
mod processing;
mod rank_benchmark;
mod ranks;
mod settings;
mod telemetry;

use settings::Settings;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    telemetry::init()?;
    let settings = Settings::from_env()?;
    app::run(settings).await
}
