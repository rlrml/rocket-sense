use async_trait::async_trait;
use bytes::Bytes;
use sha2::{Digest, Sha256};
use std::{
    path::{Component, Path, PathBuf},
    str::FromStr,
};
use tokio::fs;
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StoredObject {
    pub backend: &'static str,
    pub key: String,
    pub content_type: Option<mime::Mime>,
    pub byte_size: u64,
    pub sha256: String,
}

#[derive(Debug, thiserror::Error)]
pub enum StorageError {
    #[error("storage key must be a relative path without parent directory components: {0}")]
    InvalidKey(String),
    #[error("failed to write object at key {key}")]
    Write {
        key: String,
        #[source]
        source: std::io::Error,
    },
    #[error("failed to read object at key {key}")]
    Read {
        key: String,
        #[source]
        source: std::io::Error,
    },
}

#[async_trait]
pub trait ObjectStorage: Send + Sync {
    async fn put(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
    ) -> Result<StoredObject, StorageError>;

    async fn get(&self, key: &str) -> Result<Bytes, StorageError>;
}

#[derive(Debug, Clone)]
pub struct LocalStorage {
    root: PathBuf,
}

impl LocalStorage {
    pub fn new(root: impl Into<PathBuf>) -> Self {
        Self { root: root.into() }
    }

    pub fn root(&self) -> &Path {
        &self.root
    }

    fn resolve_key(&self, key: &str) -> Result<PathBuf, StorageError> {
        let path = Path::new(key);
        if path.is_absolute()
            || path
                .components()
                .any(|component| !matches!(component, Component::Normal(_)))
        {
            return Err(StorageError::InvalidKey(key.to_owned()));
        }

        Ok(self.root.join(path))
    }
}

#[async_trait]
impl ObjectStorage for LocalStorage {
    async fn put(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
    ) -> Result<StoredObject, StorageError> {
        let path = self.resolve_key(key)?;
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)
                .await
                .map_err(|source| StorageError::Write {
                    key: key.to_owned(),
                    source,
                })?;
        }

        fs::write(&path, &bytes)
            .await
            .map_err(|source| StorageError::Write {
                key: key.to_owned(),
                source,
            })?;

        Ok(StoredObject {
            backend: "local",
            key: key.to_owned(),
            content_type,
            byte_size: bytes.len() as u64,
            sha256: sha256_hex(&bytes),
        })
    }

    async fn get(&self, key: &str) -> Result<Bytes, StorageError> {
        let path = self.resolve_key(key)?;
        fs::read(path)
            .await
            .map(Bytes::from)
            .map_err(|source| StorageError::Read {
                key: key.to_owned(),
                source,
            })
    }
}

pub fn raw_replay_key(replay_id: Uuid) -> String {
    format!("replays/{replay_id}.replay")
}

pub fn replay_mime_type() -> mime::Mime {
    mime::Mime::from_str("application/vnd.rocketleague.replay")
        .expect("static replay MIME type should parse")
}

fn sha256_hex(bytes: &[u8]) -> String {
    hex::encode(Sha256::digest(bytes))
}

#[cfg(test)]
#[path = "lib_tests.rs"]
mod tests;
