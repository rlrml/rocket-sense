//! Minimal client for the ballchasing.com API, scoped to what the group-mirror
//! sync needs: walk a group's nested subgroups, list each group's direct
//! replays, and download replay files.
//!
//! The public ballchasing API is rate limited (a regular account gets 2
//! calls/second and 500/hour). The client serializes every request behind a
//! minimum inter-request delay and retries on HTTP 429, so a long sync degrades
//! to "slow" rather than "failed".

use std::time::Duration;

use anyhow::{anyhow, Context, Result};
use bytes::Bytes;
use reqwest::{header::AUTHORIZATION, Client, StatusCode};
use serde::Deserialize;
use tokio::sync::Mutex;
use tokio::time::{sleep, Instant};

const BALLCHASING_API_BASE: &str = "https://ballchasing.com/api";
const ROCKET_SENSE_USER_AGENT: &str = "rocket-sense";
/// Conservative spacing between requests: a regular account is capped at 2/sec.
const MIN_REQUEST_INTERVAL: Duration = Duration::from_millis(550);
/// Page size for list endpoints (ballchasing caps `count` at 200).
const LIST_PAGE_SIZE: u32 = 200;
/// How many times to retry a single request after a 429 before giving up.
const MAX_RATE_LIMIT_RETRIES: u32 = 5;

#[derive(Debug, thiserror::Error)]
pub enum BallchasingError {
    #[error("ballchasing request failed: {url}")]
    Transport {
        url: String,
        #[source]
        source: reqwest::Error,
    },
    #[error("ballchasing rate limit exceeded after {retries} retries: {url}")]
    RateLimit { url: String, retries: u32 },
    #[error("ballchasing returned {status} for {url}")]
    Status { url: String, status: StatusCode },
    #[error("failed to read ballchasing replay file {replay_id}")]
    ReplayBody {
        replay_id: String,
        #[source]
        source: reqwest::Error,
    },
}

impl BallchasingError {
    pub fn status(&self) -> Option<StatusCode> {
        match self {
            Self::Status { status, .. } => Some(*status),
            Self::RateLimit { .. } => Some(StatusCode::TOO_MANY_REQUESTS),
            Self::Transport { .. } | Self::ReplayBody { .. } => None,
        }
    }
}

/// A ballchasing group as returned by the list/detail endpoints. Only the fields
/// the mirror needs are decoded.
#[derive(Debug, Clone, Deserialize)]
pub struct BallchasingGroup {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub direct_replays: u32,
    #[serde(default)]
    pub indirect_replays: u32,
}

/// A replay as returned by the replays list endpoint. `id` is the ballchasing
/// replay id we persist as `replays.external_replay_id`.
#[derive(Debug, Clone, Deserialize)]
pub struct BallchasingReplayRef {
    pub id: String,
    #[serde(default)]
    pub replay_title: Option<String>,
}

#[derive(Debug, Deserialize)]
struct GroupListResponse {
    #[serde(default)]
    list: Vec<BallchasingGroup>,
    #[serde(default)]
    next: Option<String>,
}

#[derive(Debug, Deserialize)]
struct ReplayListResponse {
    #[serde(default)]
    list: Vec<BallchasingReplayRef>,
    #[serde(default)]
    next: Option<String>,
}

pub struct BallchasingClient {
    http: Client,
    api_key: String,
    /// Timestamp of the last issued request; guards the min-interval throttle.
    last_request: Mutex<Option<Instant>>,
}

impl BallchasingClient {
    pub fn new(api_key: impl Into<String>) -> Self {
        Self {
            http: Client::new(),
            api_key: api_key.into(),
            last_request: Mutex::new(None),
        }
    }

    /// Fetch a single group's metadata. Used to resolve the mirror root's name.
    pub async fn get_group(&self, group_id: &str) -> Result<BallchasingGroup> {
        let url = format!("{BALLCHASING_API_BASE}/groups/{group_id}");
        let bytes = self.get_json_bytes(&url).await?;
        serde_json::from_slice(&bytes)
            .with_context(|| format!("failed to parse ballchasing group {group_id}"))
    }

    /// Direct child groups of `group_id` (ballchasing's `groups?group=` is
    /// non-recursive, so the caller walks the tree level by level).
    pub async fn list_child_groups(&self, group_id: &str) -> Result<Vec<BallchasingGroup>> {
        let first =
            format!("{BALLCHASING_API_BASE}/groups?group={group_id}&count={LIST_PAGE_SIZE}");
        let mut out = Vec::new();
        let mut next = Some(first);
        while let Some(url) = next.take() {
            let bytes = self.get_json_bytes(&url).await?;
            let page: GroupListResponse = serde_json::from_slice(&bytes)
                .with_context(|| format!("failed to parse child groups of {group_id}"))?;
            out.extend(page.list);
            next = page.next;
        }
        Ok(out)
    }

    /// Replays filed directly under `group_id` (non-recursive).
    pub async fn list_direct_replays(&self, group_id: &str) -> Result<Vec<BallchasingReplayRef>> {
        let first =
            format!("{BALLCHASING_API_BASE}/replays?group={group_id}&count={LIST_PAGE_SIZE}");
        let mut out = Vec::new();
        let mut next = Some(first);
        while let Some(url) = next.take() {
            let bytes = self.get_json_bytes(&url).await?;
            let page: ReplayListResponse = serde_json::from_slice(&bytes)
                .with_context(|| format!("failed to parse replays of group {group_id}"))?;
            out.extend(page.list);
            next = page.next;
        }
        Ok(out)
    }

    /// Download the raw `.replay` file bytes for a ballchasing replay.
    pub async fn download_replay(
        &self,
        replay_id: &str,
    ) -> std::result::Result<Bytes, BallchasingError> {
        let url = format!("{BALLCHASING_API_BASE}/replays/{replay_id}/file");
        self.get_with_retry(&url, "application/octet-stream")
            .await?
            .bytes()
            .await
            .map_err(|source| BallchasingError::ReplayBody {
                replay_id: replay_id.to_owned(),
                source,
            })
    }

    async fn get_json_bytes(&self, url: &str) -> Result<Bytes> {
        self.get_with_retry(url, "application/json")
            .await
            .map_err(anyhow::Error::new)?
            .bytes()
            .await
            .with_context(|| format!("failed to read ballchasing response from {url}"))
    }

    /// Issue a GET, honoring the min-interval throttle and retrying on 429.
    async fn get_with_retry(
        &self,
        url: &str,
        accept: &str,
    ) -> std::result::Result<reqwest::Response, BallchasingError> {
        let mut attempt = 0;
        loop {
            self.throttle().await;
            let response = self
                .http
                .get(url)
                .header(AUTHORIZATION, &self.api_key)
                .header(reqwest::header::USER_AGENT, ROCKET_SENSE_USER_AGENT)
                .header(reqwest::header::ACCEPT, accept)
                .send()
                .await
                .map_err(|source| BallchasingError::Transport {
                    url: url.to_owned(),
                    source,
                })?;

            if response.status() == StatusCode::TOO_MANY_REQUESTS {
                if attempt >= MAX_RATE_LIMIT_RETRIES {
                    return Err(BallchasingError::RateLimit {
                        url: url.to_owned(),
                        retries: attempt,
                    });
                }
                let wait =
                    retry_after(&response).unwrap_or_else(|| Duration::from_secs(2 << attempt));
                tracing::warn!(%url, ?wait, attempt, "ballchasing 429; backing off");
                sleep(wait).await;
                attempt += 1;
                continue;
            }

            if !response.status().is_success() {
                let status = response.status();
                return Err(BallchasingError::Status {
                    url: url.to_owned(),
                    status,
                });
            }
            return Ok(response);
        }
    }

    /// Block until at least `MIN_REQUEST_INTERVAL` has elapsed since the previous
    /// request, then stamp the new request time.
    async fn throttle(&self) {
        let mut guard = self.last_request.lock().await;
        if let Some(previous) = *guard {
            let elapsed = previous.elapsed();
            if elapsed < MIN_REQUEST_INTERVAL {
                sleep(MIN_REQUEST_INTERVAL - elapsed).await;
            }
        }
        *guard = Some(Instant::now());
    }
}

fn retry_after(response: &reqwest::Response) -> Option<Duration> {
    response
        .headers()
        .get(reqwest::header::RETRY_AFTER)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.trim().parse::<u64>().ok())
        .map(Duration::from_secs)
}

/// Extract a ballchasing group id from either a bare id or a ballchasing URL
/// such as `https://ballchasing.com/group/<id>`. Returns the trimmed id.
pub fn parse_group_id(input: &str) -> Result<String> {
    let trimmed = input.trim();
    if trimmed.is_empty() {
        return Err(anyhow!("ballchasing group id must not be empty"));
    }
    let candidate = if let Some(rest) = trimmed.split("/group/").nth(1) {
        rest
    } else if let Some(rest) = trimmed.split("/api/groups/").nth(1) {
        rest
    } else {
        trimmed
    };
    // Strip any trailing query/fragment/path.
    let id = candidate
        .split(['/', '?', '#'])
        .next()
        .unwrap_or(candidate)
        .trim();
    if id.is_empty() {
        return Err(anyhow!("could not parse a ballchasing group id from input"));
    }
    Ok(id.to_owned())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_group_id_accepts_bare_id() {
        assert_eq!(
            parse_group_id("season-17-kb9f6hekna").unwrap(),
            "season-17-kb9f6hekna"
        );
    }

    #[test]
    fn parse_group_id_extracts_from_web_url() {
        assert_eq!(
            parse_group_id("https://ballchasing.com/group/season-17-kb9f6hekna").unwrap(),
            "season-17-kb9f6hekna"
        );
    }

    #[test]
    fn parse_group_id_extracts_from_api_url_with_query() {
        assert_eq!(
            parse_group_id("https://ballchasing.com/api/groups/abc-123?foo=bar").unwrap(),
            "abc-123"
        );
    }

    #[test]
    fn parse_group_id_rejects_empty() {
        assert!(parse_group_id("   ").is_err());
    }
}
