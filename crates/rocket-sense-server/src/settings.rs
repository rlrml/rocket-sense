use anyhow::{Context, Result};
use std::{env, net::SocketAddr, path::PathBuf};

#[derive(Debug, Clone)]
pub struct Settings {
    pub bind_addr: SocketAddr,
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
        let database_url = env::var("DATABASE_URL").ok();
        let run_migrations = env::var("ROCKET_SENSE_RUN_MIGRATIONS")
            .map(|value| value != "0" && value.to_lowercase() != "false")
            .unwrap_or(true);
        let storage_root = env::var_os("ROCKET_SENSE_STORAGE_ROOT")
            .map(PathBuf::from)
            .unwrap_or_else(|| PathBuf::from("data/storage"));

        Ok(Self {
            bind_addr,
            database_url,
            run_migrations,
            storage_root,
        })
    }
}
