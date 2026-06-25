use anyhow::{Context, Result};
use std::{env, net::SocketAddr, path::PathBuf};

use crate::rank_benchmark::{self, BenchmarkWindow, CalcStyle};

const DEV_JWT_SECRET: &str = "rocket-sense-local-dev-secret";
const MIN_APP_JWT_SECRET_BYTES: usize = 32;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AuthMode {
    Dev,
    OAuth,
}

impl AuthMode {
    fn from_env_value(value: &str) -> Result<Self> {
        match value {
            "dev" => Ok(Self::Dev),
            "google" | "oauth" => Ok(Self::OAuth),
            _ => anyhow::bail!("ROCKET_SENSE_AUTH_MODE must be `dev`, `google`, or `oauth`"),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OAuthProviderKind {
    Google,
    GitHub,
    Discord,
    Epic,
    Xbox,
    Steam,
}

impl OAuthProviderKind {
    pub fn all() -> &'static [Self] {
        &[
            Self::Google,
            Self::GitHub,
            Self::Discord,
            Self::Epic,
            Self::Xbox,
            Self::Steam,
        ]
    }

    pub fn id(self) -> &'static str {
        match self {
            Self::Google => "google",
            Self::GitHub => "github",
            Self::Discord => "discord",
            Self::Epic => "epic",
            Self::Xbox => "xbox",
            Self::Steam => "steam",
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            Self::Google => "Google",
            Self::GitHub => "GitHub",
            Self::Discord => "Discord",
            Self::Epic => "Epic Games",
            Self::Xbox => "Xbox",
            Self::Steam => "Steam",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ServiceMode {
    Server,
    Worker,
}

impl ServiceMode {
    fn from_env_value(value: &str) -> Result<Self> {
        match value {
            "server" => Ok(Self::Server),
            "worker" => Ok(Self::Worker),
            _ => anyhow::bail!("ROCKET_SENSE_SERVICE_MODE must be `server` or `worker`"),
        }
    }
}

#[derive(Debug, Clone)]
pub struct OAuthProviderSettings {
    pub kind: OAuthProviderKind,
    pub client_id: String,
    pub client_secret: String,
    pub deployment_id: Option<String>,
    pub public_base_url: String,
}

impl OAuthProviderSettings {
    pub fn redirect_uri(&self) -> String {
        format!(
            "{}/auth/{}/callback",
            self.public_base_url.trim_end_matches('/'),
            self.kind.id()
        )
    }
}

#[derive(Debug, Clone)]
pub struct Settings {
    pub service_mode: ServiceMode,
    pub bind_addr: SocketAddr,
    pub auth_mode: AuthMode,
    pub app_jwt_secret: String,
    pub oauth_providers: Vec<OAuthProviderSettings>,
    pub database_url: Option<String>,
    pub run_migrations: bool,
    pub storage_root: PathBuf,
    pub process_replays_in_background: bool,
    pub run_replay_processing_workers: bool,
    pub background_processing_concurrency: usize,
    /// When true, the lifetime stat-count read path reads the materialized
    /// `player_replay_event_counts` table; when false it falls back to the live
    /// `play_event_subjects`/`play_events` scan. Default false so the page stays
    /// correct until the reprocess backfill has populated the table.
    pub materialized_stat_counts: bool,
    /// Gates the rank-median benchmark cohort: the recurring refresh job, the
    /// admin trigger, and the `rank_benchmark_*` read-path fields. Default false
    /// until the first refresh has populated `rank_benchmark_stats`.
    pub rank_benchmark_enabled: bool,
    /// Which `BenchmarkWindow`s the refresh job materializes. Default
    /// `[rolling-6m]`; e.g. `["rolling-6m", "season:current"]` to offer both.
    pub rank_benchmark_windows: Vec<BenchmarkWindow>,
    /// The `window_key` the read serves when a request has no
    /// `rank-benchmark-window` override. Defaults to `rolling-6m`.
    pub rank_benchmark_default_window: String,
    /// How the refresh computes a stat's rate sample: per-appearance (default,
    /// one rate per game) or per-player (one rate per player).
    pub rank_benchmark_calc: CalcStyle,
    /// Normalized (trimmed, lowercased) email addresses that are automatically
    /// promoted to admin when they authenticate. Bootstraps the first admin(s);
    /// further admins are then granted through the admin API.
    pub admin_emails: Vec<String>,
}

impl Settings {
    pub fn from_env() -> Result<Self> {
        let service_mode = ServiceMode::from_env_value(
            &env::var("ROCKET_SENSE_SERVICE_MODE").unwrap_or_else(|_| "server".to_owned()),
        )?;
        let bind_addr = env::var("ROCKET_SENSE_BIND_ADDR")
            .unwrap_or_else(|_| "127.0.0.1:8080".to_owned())
            .parse()
            .context("ROCKET_SENSE_BIND_ADDR must be a socket address")?;
        let auth_mode_env = env::var("ROCKET_SENSE_AUTH_MODE").ok();
        let auth_mode = AuthMode::from_env_value(auth_mode_env.as_deref().unwrap_or("dev"))?;
        let public_base_url = match auth_mode {
            AuthMode::OAuth => env::var("ROCKET_SENSE_PUBLIC_BASE_URL")
                .context("ROCKET_SENSE_PUBLIC_BASE_URL is required in oauth auth mode")?,
            AuthMode::Dev => env::var("ROCKET_SENSE_PUBLIC_BASE_URL")
                .unwrap_or_else(|_| format!("http://{bind_addr}")),
        };
        let (app_jwt_secret, app_jwt_secret_configured) =
            configured_jwt_secret().unwrap_or_else(|| (DEV_JWT_SECRET.to_owned(), false));
        validate_auth_settings(
            auth_mode,
            bind_addr,
            &app_jwt_secret,
            app_jwt_secret_configured,
            allow_insecure_dev_auth(),
        )?;
        let oauth_providers = oauth_providers(&public_base_url);
        let database_url = env::var("DATABASE_URL").ok();
        let run_migrations = env::var("ROCKET_SENSE_RUN_MIGRATIONS")
            .map(|value| value != "0" && value.to_lowercase() != "false")
            .unwrap_or(true);
        let storage_root = env::var_os("ROCKET_SENSE_STORAGE_ROOT")
            .map(PathBuf::from)
            .unwrap_or_else(|| PathBuf::from("data/storage"));
        let process_replays_in_background = env::var("ROCKET_SENSE_PROCESS_REPLAYS_IN_BACKGROUND")
            .map(|value| value != "0" && value.to_lowercase() != "false")
            .unwrap_or(true);
        let run_replay_processing_workers = env::var("ROCKET_SENSE_RUN_REPLAY_PROCESSING_WORKERS")
            .map(|value| value != "0" && value.to_lowercase() != "false")
            .unwrap_or(true);
        let background_processing_concurrency =
            env::var("ROCKET_SENSE_BACKGROUND_PROCESSING_CONCURRENCY")
                .ok()
                .and_then(|value| value.parse::<usize>().ok())
                .unwrap_or(1)
                .clamp(1, 4);
        let materialized_stat_counts = env::var("ROCKET_SENSE_MATERIALIZED_STAT_COUNTS")
            .map(|value| value == "1" || value.to_lowercase() == "true")
            .unwrap_or(true);
        let rank_benchmark_enabled = env::var("ROCKET_SENSE_RANK_BENCHMARK")
            .map(|value| value == "1" || value.to_lowercase() == "true")
            .unwrap_or(false);
        let rank_benchmark_windows = env::var("ROCKET_SENSE_RANK_BENCHMARK_WINDOWS")
            .ok()
            .map(|value| rank_benchmark::parse_window_list(&value))
            .filter(|windows| !windows.is_empty())
            .unwrap_or_else(|| vec![BenchmarkWindow::Rolling { months: 6 }]);
        let rank_benchmark_default_window = env::var("ROCKET_SENSE_RANK_BENCHMARK_DEFAULT_WINDOW")
            .ok()
            .map(|value| value.trim().to_owned())
            .filter(|value| !value.is_empty())
            .unwrap_or_else(|| {
                rank_benchmark_windows
                    .first()
                    .map(BenchmarkWindow::window_key)
                    .unwrap_or_else(|| "rolling-6m".to_owned())
            });
        let rank_benchmark_calc = env::var("ROCKET_SENSE_RANK_BENCHMARK_CALC")
            .ok()
            .and_then(|value| CalcStyle::parse(&value))
            .unwrap_or_default();
        let admin_emails = parse_admin_emails(env::var("ROCKET_SENSE_ADMIN_EMAILS").ok());

        Ok(Self {
            service_mode,
            bind_addr,
            auth_mode,
            app_jwt_secret,
            oauth_providers,
            database_url,
            run_migrations,
            storage_root,
            process_replays_in_background,
            run_replay_processing_workers,
            background_processing_concurrency,
            materialized_stat_counts,
            rank_benchmark_enabled,
            rank_benchmark_windows,
            rank_benchmark_default_window,
            rank_benchmark_calc,
            admin_emails,
        })
    }
}

fn configured_jwt_secret() -> Option<(String, bool)> {
    env::var("ROCKET_SENSE_APP_JWT_SECRET")
        .ok()
        .map(|value| (value, true))
        .or_else(|| {
            env::var("ROCKET_SENSE_DEV_JWT_SECRET")
                .ok()
                .map(|value| (value, true))
        })
}

fn allow_insecure_dev_auth() -> bool {
    env::var("ROCKET_SENSE_ALLOW_INSECURE_DEV_AUTH")
        .map(|value| value == "1" || value.eq_ignore_ascii_case("true"))
        .unwrap_or(false)
}

fn validate_auth_settings(
    auth_mode: AuthMode,
    bind_addr: SocketAddr,
    app_jwt_secret: &str,
    app_jwt_secret_configured: bool,
    allow_insecure_dev_auth: bool,
) -> Result<()> {
    if app_jwt_secret_configured
        && app_jwt_secret.len() < MIN_APP_JWT_SECRET_BYTES
        && (auth_mode == AuthMode::OAuth || !bind_addr.ip().is_loopback())
    {
        anyhow::bail!(
            "ROCKET_SENSE_APP_JWT_SECRET must be at least {MIN_APP_JWT_SECRET_BYTES} bytes"
        );
    }

    match auth_mode {
        AuthMode::OAuth => {
            if !app_jwt_secret_configured {
                anyhow::bail!("ROCKET_SENSE_APP_JWT_SECRET is required in oauth auth mode");
            }
        }
        AuthMode::Dev => {
            if !bind_addr.ip().is_loopback() && !allow_insecure_dev_auth {
                anyhow::bail!(
                    "dev auth mode may only bind to loopback unless ROCKET_SENSE_ALLOW_INSECURE_DEV_AUTH=true"
                );
            }
        }
    }

    Ok(())
}

fn parse_admin_emails(value: Option<String>) -> Vec<String> {
    let Some(value) = value else {
        return Vec::new();
    };
    value
        .split([',', ';', ' ', '\n'])
        .map(|email| email.trim().to_lowercase())
        .filter(|email| !email.is_empty())
        .collect()
}

fn oauth_providers(public_base_url: &str) -> Vec<OAuthProviderSettings> {
    [
        (
            OAuthProviderKind::Google,
            "GOOGLE_OAUTH_CLIENT_ID",
            "GOOGLE_OAUTH_CLIENT_SECRET",
        ),
        (
            OAuthProviderKind::GitHub,
            "GITHUB_OAUTH_CLIENT_ID",
            "GITHUB_OAUTH_CLIENT_SECRET",
        ),
        (
            OAuthProviderKind::Discord,
            "DISCORD_OAUTH_CLIENT_ID",
            "DISCORD_OAUTH_CLIENT_SECRET",
        ),
        (
            OAuthProviderKind::Epic,
            "EPIC_OAUTH_CLIENT_ID",
            "EPIC_OAUTH_CLIENT_SECRET",
        ),
        (
            OAuthProviderKind::Xbox,
            "XBOX_OAUTH_CLIENT_ID",
            "XBOX_OAUTH_CLIENT_SECRET",
        ),
    ]
    .into_iter()
    .filter_map(|(kind, client_id_env, client_secret_env)| {
        let client_id = env::var(client_id_env).ok()?;
        let client_secret = env::var(client_secret_env).ok()?;
        let deployment_id = (kind == OAuthProviderKind::Epic)
            .then(|| env::var("EPIC_OAUTH_DEPLOYMENT_ID").ok())
            .flatten()
            .map(|value| value.trim().to_owned())
            .filter(|value| !value.is_empty());
        (!client_id.is_empty() && !client_secret.is_empty()).then(|| OAuthProviderSettings {
            kind,
            client_id,
            client_secret,
            deployment_id,
            public_base_url: public_base_url.to_owned(),
        })
    })
    .chain(env::var("STEAM_WEB_API_KEY").ok().and_then(|api_key| {
        let api_key = api_key.trim().to_owned();
        (!api_key.is_empty()).then(|| OAuthProviderSettings {
            kind: OAuthProviderKind::Steam,
            client_id: api_key,
            client_secret: String::new(),
            deployment_id: None,
            public_base_url: public_base_url.to_owned(),
        })
    }))
    .collect()
}

#[cfg(test)]
#[path = "settings_tests.rs"]
mod tests;
