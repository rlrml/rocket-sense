use crate::app::AppState;
use crate::processing::{self, EVENT_STREAM_SCHEMA_CHANGELOG};
use axum::{routing::get, Json, Router};
use serde::Serialize;
use utoipa::ToSchema;

pub fn router() -> Router<AppState> {
    Router::new().route("/processing-version", get(get_processing_version))
}

/// The processing-pipeline version the running server produces. Clients compare
/// each replay's persisted parse version against this to determine staleness.
#[derive(Debug, Serialize, ToSchema)]
pub struct ProcessingVersionResponse {
    pub event_stream_schema_version: String,
    pub extractor_name: String,
    pub extractor_version: String,
    pub subtr_actor_version: String,
    pub subtr_actor_git_sha: Option<String>,
    pub subtr_actor_git_commit_timestamp: Option<String>,
    pub rocket_sense_git_sha: Option<String>,
    pub rocket_sense_git_commit_timestamp: Option<String>,
    /// Human-readable note for each schema version, newest last.
    pub schema_changelog: Vec<SchemaChangelogEntry>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct SchemaChangelogEntry {
    pub version: String,
    pub note: String,
}

#[utoipa::path(
    get,
    path = "/api/v1/processing-version",
    tag = "meta",
    responses(
        (status = 200, description = "Current processing pipeline version", body = ProcessingVersionResponse)
    )
)]
pub async fn get_processing_version() -> Json<ProcessingVersionResponse> {
    let current = processing::current_processing_version();
    Json(ProcessingVersionResponse {
        event_stream_schema_version: current.event_stream_schema_version.to_string(),
        extractor_name: current.extractor_name.to_string(),
        extractor_version: current.extractor_version.to_string(),
        subtr_actor_version: current.subtr_actor_version.to_string(),
        subtr_actor_git_sha: current.subtr_actor_git_sha.map(str::to_string),
        subtr_actor_git_commit_timestamp: current
            .subtr_actor_git_commit_timestamp
            .map(str::to_string),
        rocket_sense_git_sha: current.rocket_sense_git_sha.map(str::to_string),
        rocket_sense_git_commit_timestamp: current
            .rocket_sense_git_commit_timestamp
            .map(str::to_string),
        schema_changelog: EVENT_STREAM_SCHEMA_CHANGELOG
            .iter()
            .map(|(version, note)| SchemaChangelogEntry {
                version: (*version).to_string(),
                note: (*note).to_string(),
            })
            .collect(),
    })
}
