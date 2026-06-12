use crate::ranks::RankSubmissionObservabilitySummary;
use anyhow::Result;
use axum::{body::Body, extract::MatchedPath, http::Request, Router};
use std::env;
use tower_http::{
    request_id::{MakeRequestUuid, PropagateRequestIdLayer, RequestId, SetRequestIdLayer},
    trace::{DefaultOnResponse, TraceLayer},
};
use tracing::Level;
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};
use uuid::Uuid;

const DEFAULT_LOG_FILTER: &str = "rocket_sense_server=info,tower_http=info";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum LogFormat {
    Text,
    Compact,
    Pretty,
    Json,
}

impl LogFormat {
    fn from_env() -> Result<Self> {
        let value = env::var("ROCKET_SENSE_LOG_FORMAT").unwrap_or_else(|_| "text".to_owned());
        Self::parse(&value)
    }

    fn parse(value: &str) -> Result<Self> {
        match value.trim().to_ascii_lowercase().as_str() {
            "" | "text" | "full" => Ok(Self::Text),
            "compact" => Ok(Self::Compact),
            "pretty" => Ok(Self::Pretty),
            "json" => Ok(Self::Json),
            _ => anyhow::bail!(
                "ROCKET_SENSE_LOG_FORMAT must be `text`, `compact`, `pretty`, or `json`"
            ),
        }
    }
}

pub fn init() -> Result<()> {
    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| DEFAULT_LOG_FILTER.into());

    match LogFormat::from_env()? {
        LogFormat::Text => tracing_subscriber::registry()
            .with(env_filter)
            .with(fmt::layer())
            .init(),
        LogFormat::Compact => tracing_subscriber::registry()
            .with(env_filter)
            .with(fmt::layer().compact())
            .init(),
        LogFormat::Pretty => tracing_subscriber::registry()
            .with(env_filter)
            .with(fmt::layer().pretty())
            .init(),
        LogFormat::Json => tracing_subscriber::registry()
            .with(env_filter)
            .with(fmt::layer().json().flatten_event(true))
            .init(),
    }

    Ok(())
}

pub fn apply_http_layers(router: Router) -> Router {
    router
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(|request: &Request<Body>| {
                    let matched_path = request
                        .extensions()
                        .get::<MatchedPath>()
                        .map(MatchedPath::as_str)
                        .unwrap_or("<unmatched>");
                    let request_id = request
                        .extensions()
                        .get::<RequestId>()
                        .and_then(|request_id| request_id.header_value().to_str().ok())
                        .unwrap_or("<missing>");
                    tracing::info_span!(
                        "http_request",
                        request_id,
                        method = %request.method(),
                        uri = %request.uri(),
                        matched_path,
                    )
                })
                .on_response(
                    DefaultOnResponse::new()
                        .level(Level::INFO)
                        .latency_unit(tower_http::LatencyUnit::Micros),
                ),
        )
        .layer(SetRequestIdLayer::x_request_id(MakeRequestUuid))
        .layer(PropagateRequestIdLayer::x_request_id())
}

pub fn record_rank_submission_received(
    source: &'static str,
    replay_id: Option<Uuid>,
    summary: RankSubmissionObservabilitySummary,
) {
    tracing::info!(
        event = "rank_submission.received",
        source,
        ?replay_id,
        players = summary.players,
        platforms = summary.platforms,
        playlists = summary.playlists,
        valid_flags = summary.valid_flags,
        after_snapshots = summary.after_snapshots,
        before_snapshots = summary.before_snapshots,
        current_snapshots = summary.current_snapshots,
        current_mmr = summary.current_mmr,
        current_win_streak = summary.current_win_streak,
        current_matches_played = summary.current_matches_played,
        current_placement_matches_played = summary.current_placement_matches_played,
        current_fetched_at = summary.current_fetched_at,
        "received replay rank submission"
    );
}

pub fn record_rank_submission_ingested(
    source: &'static str,
    replay_id: Uuid,
    summary: RankSubmissionObservabilitySummary,
    submitted: u64,
    matched: u64,
) {
    tracing::info!(
        event = "rank_submission.ingested",
        source,
        %replay_id,
        submitted,
        matched,
        players = summary.players,
        current_snapshots = summary.current_snapshots,
        current_mmr = summary.current_mmr,
        current_win_streak = summary.current_win_streak,
        current_matches_played = summary.current_matches_played,
        current_placement_matches_played = summary.current_placement_matches_played,
        current_fetched_at = summary.current_fetched_at,
        "ingested replay rank submission"
    );
}

pub fn record_invalid_rank_submission(
    source: &'static str,
    payload_bytes: usize,
    error: &dyn std::fmt::Display,
) {
    tracing::warn!(
        event = "rank_submission.invalid",
        source,
        payload_bytes,
        error = %error,
        "invalid replay rank submission payload"
    );
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn log_format_accepts_known_values() {
        assert_eq!(LogFormat::parse("text").unwrap(), LogFormat::Text);
        assert_eq!(LogFormat::parse("compact").unwrap(), LogFormat::Compact);
        assert_eq!(LogFormat::parse("pretty").unwrap(), LogFormat::Pretty);
        assert_eq!(LogFormat::parse("json").unwrap(), LogFormat::Json);
    }

    #[test]
    fn log_format_rejects_unknown_values() {
        assert!(LogFormat::parse("xml").is_err());
    }
}
