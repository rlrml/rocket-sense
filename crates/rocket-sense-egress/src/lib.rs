//! Round-robin HTTP egress over a pool of SOCKS5 exits.
//!
//! Each [`Exit`] is a pre-built [`reqwest::Client`] pinned to one SOCKS5 proxy
//! (or to direct egress when no proxy is configured). [`EgressPool::execute`]
//! rotates requests across the exits round-robin, parks an exit on a cooldown
//! when it returns a rate-limit / ban response, and self-throttles each exit
//! with a token bucket so we stay under an upstream's per-IP limit rather than
//! discovering that limit by getting banned. When an exit fails, the request is
//! retried on the next exit up to a cap.
//!
//! The pool is provider-agnostic: it only sees SOCKS5 proxy URLs. The intended
//! source is Mullvad's per-relay SOCKS5 proxies (every WireGuard relay runs one
//! on port 1080, reachable from inside any other relay's tunnel, each with a
//! distinct exit IP), surfaced as local ports by a single userspace-WireGuard
//! tunnel — see [`mullvad`] for helpers that turn relay codenames into exits or
//! into an `onetun` forward spec.
//!
//! # Example
//!
//! ```no_run
//! use rocket_sense_egress::{EgressPool, ExitConfig, PoolConfig};
//!
//! # async fn run() -> Result<(), Box<dyn std::error::Error>> {
//! let pool = EgressPool::new(
//!     PoolConfig::default(),
//!     vec![
//!         ExitConfig::proxy("se-mma", "socks5h://127.0.0.1:9001"),
//!         ExitConfig::proxy("nl-ams", "socks5h://127.0.0.1:9002"),
//!     ],
//! )?;
//!
//! let outcome = pool
//!     .execute(|client| client.get("https://ballchasing.com/api/replays/abc/file"))
//!     .await?;
//! println!("fetched via exit {}", outcome.exit);
//! let bytes = outcome.response.bytes().await?;
//! # let _ = bytes;
//! # Ok(())
//! # }
//! ```

use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Mutex;
use std::time::{Duration, Instant};

use reqwest::StatusCode;

pub mod mullvad;

mod token_bucket;
use token_bucket::TokenBucket;

/// Configuration for a single exit in the pool.
#[derive(Clone, Debug)]
pub struct ExitConfig {
    /// Human-readable label used in logs and [`Outcome::exit`].
    pub name: String,
    /// SOCKS5 proxy URL (`socks5h://host:port`), or `None` for direct egress.
    ///
    /// Prefer the `socks5h` scheme so DNS is resolved through the tunnel; a
    /// plain `socks5://` URL resolves names locally and can leak your real
    /// resolver / region alongside a rotated exit IP.
    pub proxy: Option<String>,
}

impl ExitConfig {
    /// An exit that routes through `proxy` (a `socks5h://host:port` URL).
    pub fn proxy(name: impl Into<String>, proxy: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            proxy: Some(proxy.into()),
        }
    }

    /// An exit that egresses directly, with no proxy.
    pub fn direct(name: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            proxy: None,
        }
    }
}

/// Pool-wide policy knobs.
#[derive(Clone, Debug)]
pub struct PoolConfig {
    /// `User-Agent` baked into every client.
    pub user_agent: String,
    /// Per-request timeout applied to each client.
    pub request_timeout: Duration,
    /// Connection timeout applied to each client.
    pub connect_timeout: Duration,
    /// Token-bucket refill rate per exit, in requests per second. This is the
    /// sustained rate each individual exit IP will issue requests at.
    pub per_exit_rps: f64,
    /// Token-bucket burst size per exit (max requests issued back-to-back
    /// before throttling kicks in).
    pub per_exit_burst: f64,
    /// How long to park an exit after it returns a rate-limit / ban response or
    /// a transport error.
    pub cooldown: Duration,
    /// Maximum number of exits to try for a single request before giving up.
    pub max_attempts: usize,
    /// HTTP status codes that trip an exit's cooldown and trigger a retry on the
    /// next exit. Defaults to 429 (Too Many Requests, incl. Cloudflare 1015),
    /// 403 (Forbidden / blocked), and 503 (Service Unavailable).
    pub cooldown_statuses: Vec<u16>,
}

impl Default for PoolConfig {
    fn default() -> Self {
        Self {
            user_agent: "rocket-sense-egress".to_owned(),
            request_timeout: Duration::from_secs(60),
            connect_timeout: Duration::from_secs(15),
            per_exit_rps: 1.0,
            per_exit_burst: 2.0,
            cooldown: Duration::from_secs(60),
            max_attempts: 4,
            cooldown_statuses: vec![429, 403, 503],
        }
    }
}

/// A configured exit: its client plus rotation state.
struct Exit {
    name: String,
    client: reqwest::Client,
    /// Instant the exit is parked until (cooldown). `None` when available.
    cooldown_until: Mutex<Option<Instant>>,
    bucket: Mutex<TokenBucket>,
}

impl Exit {
    /// `Some(duration)` to wait before the exit is off cooldown, or `None` if
    /// it is available right now.
    fn cooldown_remaining(&self, now: Instant) -> Option<Duration> {
        let until = (*self.cooldown_until.lock().unwrap())?;
        (until > now).then(|| until - now)
    }

    fn trip_cooldown(&self, cooldown: Duration, now: Instant) {
        *self.cooldown_until.lock().unwrap() = Some(now + cooldown);
    }

    /// Reserve one token; returns how long to wait before the request may go out
    /// to stay within this exit's rate limit (zero if a token was available).
    fn reserve_token(&self) -> Duration {
        self.bucket.lock().unwrap().reserve()
    }
}

/// A successful dispatch: the response plus which exit served it.
pub struct Outcome {
    /// The [`ExitConfig::name`] of the exit that produced the response.
    pub exit: String,
    pub response: reqwest::Response,
}

/// Errors returned by [`EgressPool`].
#[derive(Debug, thiserror::Error)]
pub enum EgressError {
    #[error("egress pool must have at least one exit")]
    NoExits,
    #[error("failed to build client for exit {exit}: {source}")]
    BuildClient {
        exit: String,
        #[source]
        source: reqwest::Error,
    },
    #[error("all {attempts} egress attempts failed; last status: {last_status:?}")]
    Exhausted {
        attempts: usize,
        last_status: Option<StatusCode>,
        #[source]
        last_error: Option<reqwest::Error>,
    },
}

/// A round-robin pool of SOCKS5 (or direct) egress clients.
pub struct EgressPool {
    exits: Vec<Exit>,
    cursor: AtomicUsize,
    config: PoolConfig,
}

impl EgressPool {
    /// Build a pool from a policy and a list of exit configs. Each exit gets its
    /// own [`reqwest::Client`]; the proxy and timeouts are baked in at build
    /// time so dispatch is allocation-light.
    pub fn new(config: PoolConfig, exits: Vec<ExitConfig>) -> Result<Self, EgressError> {
        if exits.is_empty() {
            return Err(EgressError::NoExits);
        }

        let exits = exits
            .into_iter()
            .map(|exit| Self::build_exit(&config, exit))
            .collect::<Result<Vec<_>, _>>()?;

        Ok(Self {
            exits,
            cursor: AtomicUsize::new(0),
            config,
        })
    }

    fn build_exit(config: &PoolConfig, exit: ExitConfig) -> Result<Exit, EgressError> {
        let mut builder = reqwest::Client::builder()
            .user_agent(&config.user_agent)
            .timeout(config.request_timeout)
            .connect_timeout(config.connect_timeout);

        if let Some(proxy_url) = &exit.proxy {
            let proxy =
                reqwest::Proxy::all(proxy_url).map_err(|source| EgressError::BuildClient {
                    exit: exit.name.clone(),
                    source,
                })?;
            builder = builder.proxy(proxy);
        } else {
            // Ignore any ambient HTTP(S)_PROXY env so a "direct" exit is truly
            // direct and exits stay independent of process environment.
            builder = builder.no_proxy();
        }

        let client = builder.build().map_err(|source| EgressError::BuildClient {
            exit: exit.name.clone(),
            source,
        })?;

        Ok(Exit {
            name: exit.name,
            client,
            cooldown_until: Mutex::new(None),
            bucket: Mutex::new(TokenBucket::new(config.per_exit_rps, config.per_exit_burst)),
        })
    }

    /// Number of exits in the pool.
    pub fn len(&self) -> usize {
        self.exits.len()
    }

    /// Whether the pool has no exits. Always `false` for a pool built via
    /// [`EgressPool::new`], which rejects an empty exit list.
    pub fn is_empty(&self) -> bool {
        self.exits.is_empty()
    }

    /// Dispatch a request, rotating across exits with cooldown + throttling.
    ///
    /// `build` is called once per attempt with the chosen exit's client and must
    /// return a [`reqwest::RequestBuilder`] for the request to send. It is
    /// invoked afresh per attempt because a `RequestBuilder` is bound to one
    /// client; keep it cheap and side-effect free.
    ///
    /// On a rate-limit/ban status (see [`PoolConfig::cooldown_statuses`]) or a
    /// transport error, the serving exit is parked and the next exit is tried.
    /// Any other response — success or an ordinary 4xx/5xx — is returned to the
    /// caller as-is.
    pub async fn execute<F>(&self, build: F) -> Result<Outcome, EgressError>
    where
        F: Fn(&reqwest::Client) -> reqwest::RequestBuilder,
    {
        let attempts = self.config.max_attempts.max(1).min(self.exits.len().max(1));
        let mut last_status = None;
        let mut last_error = None;

        for _ in 0..attempts {
            let idx = self.pick_exit();
            let exit = &self.exits[idx];

            // Honor an outstanding cooldown (only reached when every exit is
            // parked, since pick_exit prefers an available one).
            if let Some(wait) = exit.cooldown_remaining(Instant::now()) {
                tokio::time::sleep(wait).await;
            }
            // Then honor this exit's per-IP rate limit.
            let throttle = exit.reserve_token();
            if !throttle.is_zero() {
                tokio::time::sleep(throttle).await;
            }

            match build(&exit.client).send().await {
                Ok(response) => {
                    let status = response.status();
                    if self.config.cooldown_statuses.contains(&status.as_u16()) {
                        exit.trip_cooldown(self.config.cooldown, Instant::now());
                        tracing::warn!(
                            exit = %exit.name,
                            status = status.as_u16(),
                            "egress exit rate-limited; parking and retrying on next exit"
                        );
                        last_status = Some(status);
                        continue;
                    }
                    return Ok(Outcome {
                        exit: exit.name.clone(),
                        response,
                    });
                }
                Err(error) => {
                    exit.trip_cooldown(self.config.cooldown, Instant::now());
                    tracing::warn!(
                        exit = %exit.name,
                        error = %error,
                        "egress exit transport error; parking and retrying on next exit"
                    );
                    last_error = Some(error);
                }
            }
        }

        Err(EgressError::Exhausted {
            attempts,
            last_status,
            last_error,
        })
    }

    /// Pick the next exit: advance the round-robin cursor, then prefer the first
    /// available (off-cooldown) exit scanning forward. If every exit is parked,
    /// fall back to the one whose cooldown expires soonest.
    fn pick_exit(&self) -> usize {
        let n = self.exits.len();
        let start = self.cursor.fetch_add(1, Ordering::Relaxed) % n;
        let now = Instant::now();

        let mut soonest: Option<(usize, Duration)> = None;
        for offset in 0..n {
            let idx = (start + offset) % n;
            match self.exits[idx].cooldown_remaining(now) {
                None => return idx,
                Some(remaining) => {
                    if soonest.is_none_or(|(_, best)| remaining < best) {
                        soonest = Some((idx, remaining));
                    }
                }
            }
        }

        soonest.map(|(idx, _)| idx).unwrap_or(start)
    }

    /// Probe each exit against an IP-echo endpoint and report the exit IP it
    /// observed. Useful at startup to confirm the exits are live and distinct.
    /// Does not affect cooldown state.
    pub async fn observed_exit_ips(&self, echo_url: &str) -> Vec<(String, Result<String, String>)> {
        let mut out = Vec::with_capacity(self.exits.len());
        for exit in &self.exits {
            let result = async {
                let text = exit
                    .client
                    .get(echo_url)
                    .send()
                    .await
                    .map_err(|e| e.to_string())?
                    .error_for_status()
                    .map_err(|e| e.to_string())?
                    .text()
                    .await
                    .map_err(|e| e.to_string())?;
                Ok(text.trim().to_owned())
            }
            .await;
            out.push((exit.name.clone(), result));
        }
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn pool(exits: Vec<ExitConfig>) -> EgressPool {
        EgressPool::new(PoolConfig::default(), exits).unwrap()
    }

    #[test]
    fn empty_exit_list_is_rejected() {
        assert!(matches!(
            EgressPool::new(PoolConfig::default(), vec![]),
            Err(EgressError::NoExits)
        ));
    }

    #[test]
    fn round_robin_advances_across_exits() {
        let pool = pool(vec![
            ExitConfig::direct("a"),
            ExitConfig::direct("b"),
            ExitConfig::direct("c"),
        ]);
        let picks: Vec<usize> = (0..6).map(|_| pool.pick_exit()).collect();
        assert_eq!(picks, vec![0, 1, 2, 0, 1, 2]);
    }

    #[test]
    fn cooled_down_exits_are_skipped() {
        let pool = pool(vec![
            ExitConfig::direct("a"),
            ExitConfig::direct("b"),
            ExitConfig::direct("c"),
        ]);
        let now = Instant::now();
        pool.exits[0].trip_cooldown(Duration::from_secs(60), now);
        pool.exits[1].trip_cooldown(Duration::from_secs(60), now);

        // Cursor starts at 0, but 0 and 1 are parked, so we should land on 2.
        assert_eq!(pool.pick_exit(), 2);
        assert_eq!(pool.pick_exit(), 2);
    }

    #[test]
    fn all_cooled_down_picks_soonest_to_recover() {
        let pool = pool(vec![ExitConfig::direct("a"), ExitConfig::direct("b")]);
        let now = Instant::now();
        pool.exits[0].trip_cooldown(Duration::from_secs(120), now);
        pool.exits[1].trip_cooldown(Duration::from_secs(5), now);
        // Both parked; exit 1 recovers first.
        assert_eq!(pool.pick_exit(), 1);
    }
}
