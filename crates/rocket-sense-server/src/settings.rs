use anyhow::{Context, Result};
use std::{env, net::SocketAddr, path::PathBuf};

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
}

impl OAuthProviderKind {
    pub fn all() -> &'static [Self] {
        &[Self::Google, Self::GitHub, Self::Discord]
    }

    pub fn id(self) -> &'static str {
        match self {
            Self::Google => "google",
            Self::GitHub => "github",
            Self::Discord => "discord",
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            Self::Google => "Google",
            Self::GitHub => "GitHub",
            Self::Discord => "Discord",
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
    ]
    .into_iter()
    .filter_map(|(kind, client_id_env, client_secret_env)| {
        let client_id = env::var(client_id_env).ok()?;
        let client_secret = env::var(client_secret_env).ok()?;
        (!client_id.is_empty() && !client_secret.is_empty()).then(|| OAuthProviderSettings {
            kind,
            client_id,
            client_secret,
            public_base_url: public_base_url.to_owned(),
        })
    })
    .collect()
}

#[cfg(test)]
#[path = "settings_tests.rs"]
mod tests;
