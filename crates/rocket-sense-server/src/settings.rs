use anyhow::{Context, Result};
use std::{env, net::SocketAddr, path::PathBuf};

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
    pub bind_addr: SocketAddr,
    pub auth_mode: AuthMode,
    pub app_jwt_secret: String,
    pub oauth_providers: Vec<OAuthProviderSettings>,
    pub database_url: Option<String>,
    pub run_migrations: bool,
    pub storage_root: PathBuf,
    pub process_replays_in_background: bool,
    pub background_processing_concurrency: usize,
}

impl Settings {
    pub fn from_env() -> Result<Self> {
        let bind_addr = env::var("ROCKET_SENSE_BIND_ADDR")
            .unwrap_or_else(|_| "127.0.0.1:8080".to_owned())
            .parse()
            .context("ROCKET_SENSE_BIND_ADDR must be a socket address")?;
        let auth_mode = AuthMode::from_env_value(
            &env::var("ROCKET_SENSE_AUTH_MODE").unwrap_or_else(|_| "dev".to_owned()),
        )?;
        let public_base_url = match auth_mode {
            AuthMode::OAuth => env::var("ROCKET_SENSE_PUBLIC_BASE_URL")
                .context("ROCKET_SENSE_PUBLIC_BASE_URL is required in oauth auth mode")?,
            AuthMode::Dev => env::var("ROCKET_SENSE_PUBLIC_BASE_URL")
                .unwrap_or_else(|_| format!("http://{bind_addr}")),
        };
        let app_jwt_secret = env::var("ROCKET_SENSE_APP_JWT_SECRET")
            .or_else(|_| env::var("ROCKET_SENSE_DEV_JWT_SECRET"))
            .unwrap_or_else(|_| "rocket-sense-local-dev-secret".to_owned());
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
        let background_processing_concurrency =
            env::var("ROCKET_SENSE_BACKGROUND_PROCESSING_CONCURRENCY")
                .ok()
                .and_then(|value| value.parse::<usize>().ok())
                .unwrap_or(1)
                .clamp(1, 4);

        Ok(Self {
            bind_addr,
            auth_mode,
            app_jwt_secret,
            oauth_providers,
            database_url,
            run_migrations,
            storage_root,
            process_replays_in_background,
            background_processing_concurrency,
        })
    }
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
