use anyhow::{Context, Result};
use std::{env, net::SocketAddr, path::PathBuf};

#[derive(Debug, Clone, Copy)]
pub enum AuthMode {
    Dev,
    Google,
}

impl AuthMode {
    fn from_env_value(value: &str) -> Result<Self> {
        match value {
            "dev" => Ok(Self::Dev),
            "google" => Ok(Self::Google),
            _ => anyhow::bail!("ROCKET_SENSE_AUTH_MODE must be `dev` or `google`"),
        }
    }
}

#[derive(Debug, Clone)]
pub struct GoogleOAuthSettings {
    pub client_id: String,
    pub client_secret: String,
    pub public_base_url: String,
}

impl GoogleOAuthSettings {
    pub fn redirect_uri(&self) -> String {
        format!(
            "{}/auth/google/callback",
            self.public_base_url.trim_end_matches('/')
        )
    }
}

#[derive(Debug, Clone)]
pub struct Settings {
    pub bind_addr: SocketAddr,
    pub auth_mode: AuthMode,
    pub app_jwt_secret: String,
    pub google_oauth: Option<GoogleOAuthSettings>,
    pub database_url: Option<String>,
    pub run_migrations: bool,
    pub storage_root: PathBuf,
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
        let app_jwt_secret = env::var("ROCKET_SENSE_APP_JWT_SECRET")
            .or_else(|_| env::var("ROCKET_SENSE_DEV_JWT_SECRET"))
            .unwrap_or_else(|_| "rocket-sense-local-dev-secret".to_owned());
        let google_oauth = match auth_mode {
            AuthMode::Google => Some(GoogleOAuthSettings {
                client_id: env::var("GOOGLE_OAUTH_CLIENT_ID")
                    .context("GOOGLE_OAUTH_CLIENT_ID is required in google auth mode")?,
                client_secret: env::var("GOOGLE_OAUTH_CLIENT_SECRET")
                    .context("GOOGLE_OAUTH_CLIENT_SECRET is required in google auth mode")?,
                public_base_url: env::var("ROCKET_SENSE_PUBLIC_BASE_URL")
                    .context("ROCKET_SENSE_PUBLIC_BASE_URL is required in google auth mode")?,
            }),
            AuthMode::Dev => {
                env::var("GOOGLE_OAUTH_CLIENT_ID")
                    .ok()
                    .map(|client_id| GoogleOAuthSettings {
                        client_id,
                        client_secret: env::var("GOOGLE_OAUTH_CLIENT_SECRET").unwrap_or_default(),
                        public_base_url: env::var("ROCKET_SENSE_PUBLIC_BASE_URL")
                            .unwrap_or_else(|_| "http://127.0.0.1:8080".to_owned()),
                    })
            }
        };
        let database_url = env::var("DATABASE_URL").ok();
        let run_migrations = env::var("ROCKET_SENSE_RUN_MIGRATIONS")
            .map(|value| value != "0" && value.to_lowercase() != "false")
            .unwrap_or(true);
        let storage_root = env::var_os("ROCKET_SENSE_STORAGE_ROOT")
            .map(PathBuf::from)
            .unwrap_or_else(|| PathBuf::from("data/storage"));

        Ok(Self {
            bind_addr,
            auth_mode,
            app_jwt_secret,
            google_oauth,
            database_url,
            run_migrations,
            storage_root,
        })
    }
}
