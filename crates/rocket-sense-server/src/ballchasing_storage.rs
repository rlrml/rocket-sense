//! Object storage that leaves Ballchasing replay files at their source.
//!
//! Rocket Sense still stores uploaded replays and derived analysis artifacts in
//! local object storage. Keys in the reserved Ballchasing namespace are instead
//! downloaded on demand, allowing mirror imports to retain database-backed
//! statistics without retaining another copy of the raw replay.

use std::{io, sync::Arc};

use async_trait::async_trait;
use bytes::Bytes;
use rocket_sense_storage::{
    sha256_hex, LocalStorage, ObjectStorage, StorageEncoding, StorageError, StoredObject,
};

use crate::ballchasing::{BallchasingClient, BallchasingError};

const BALLCHASING_REPLAY_KEY_PREFIX: &str = "ballchasing/replays/";
const BALLCHASING_REPLAY_SHA256_SEGMENT: &str = "/sha256/";
const BALLCHASING_REPLAY_KEY_SUFFIX: &str = ".replay";

pub struct BallchasingBackedStorage {
    local: LocalStorage,
    ballchasing: Option<Arc<dyn BallchasingReplayFetcher>>,
}

impl BallchasingBackedStorage {
    pub fn new(local: LocalStorage, ballchasing: Option<Arc<BallchasingClient>>) -> Self {
        Self {
            local,
            ballchasing: ballchasing.map(|client| client as Arc<dyn BallchasingReplayFetcher>),
        }
    }

    #[cfg(test)]
    fn with_fetcher(local: LocalStorage, fetcher: Arc<dyn BallchasingReplayFetcher>) -> Self {
        Self {
            local,
            ballchasing: Some(fetcher),
        }
    }
}

#[async_trait]
trait BallchasingReplayFetcher: Send + Sync {
    async fn download_replay(&self, replay_id: &str) -> Result<Bytes, BallchasingError>;
}

#[async_trait]
impl BallchasingReplayFetcher for BallchasingClient {
    async fn download_replay(&self, replay_id: &str) -> Result<Bytes, BallchasingError> {
        BallchasingClient::download_replay(self, replay_id).await
    }
}

/// Return the virtual object key used by a Ballchasing-backed replay row.
pub fn ballchasing_replay_key(replay_id: &str, file_sha256: &str) -> Result<String, StorageError> {
    if !valid_ballchasing_replay_id(replay_id) || !valid_sha256(file_sha256) {
        return Err(StorageError::InvalidKey(replay_id.to_owned()));
    }
    Ok(format!(
        "{BALLCHASING_REPLAY_KEY_PREFIX}{replay_id}{BALLCHASING_REPLAY_SHA256_SEGMENT}{file_sha256}{BALLCHASING_REPLAY_KEY_SUFFIX}"
    ))
}

fn ballchasing_replay_locator(key: &str) -> Result<Option<(&str, &str)>, StorageError> {
    let Some(remainder) = key.strip_prefix(BALLCHASING_REPLAY_KEY_PREFIX) else {
        return Ok(None);
    };
    let Some((replay_id, sha256_with_suffix)) =
        remainder.split_once(BALLCHASING_REPLAY_SHA256_SEGMENT)
    else {
        return Err(StorageError::InvalidKey(key.to_owned()));
    };
    let Some(file_sha256) = sha256_with_suffix.strip_suffix(BALLCHASING_REPLAY_KEY_SUFFIX) else {
        return Err(StorageError::InvalidKey(key.to_owned()));
    };
    if !valid_ballchasing_replay_id(replay_id) || !valid_sha256(file_sha256) {
        return Err(StorageError::InvalidKey(key.to_owned()));
    }
    Ok(Some((replay_id, file_sha256)))
}

fn valid_ballchasing_replay_id(replay_id: &str) -> bool {
    !replay_id.is_empty()
        && replay_id.len() <= 128
        && replay_id
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'-' | b'_'))
}

fn valid_sha256(value: &str) -> bool {
    value.len() == 64 && value.bytes().all(|byte| byte.is_ascii_hexdigit())
}

fn reserved_ballchasing_key(key: &str) -> bool {
    key.starts_with(BALLCHASING_REPLAY_KEY_PREFIX)
}

pub fn is_ballchasing_replay_key(key: &str) -> bool {
    ballchasing_replay_locator(key).ok().flatten().is_some()
}

#[async_trait]
impl ObjectStorage for BallchasingBackedStorage {
    async fn put(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
    ) -> Result<StoredObject, StorageError> {
        if reserved_ballchasing_key(key) {
            return Err(StorageError::InvalidKey(key.to_owned()));
        }
        self.local.put(key, bytes, content_type).await
    }

    async fn put_with_encoding(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
        storage_encoding: StorageEncoding,
    ) -> Result<StoredObject, StorageError> {
        if reserved_ballchasing_key(key) {
            return Err(StorageError::InvalidKey(key.to_owned()));
        }
        self.local
            .put_with_encoding(key, bytes, content_type, storage_encoding)
            .await
    }

    async fn get(&self, key: &str) -> Result<Bytes, StorageError> {
        let Some((replay_id, expected_sha256)) = ballchasing_replay_locator(key)? else {
            return self.local.get(key).await;
        };
        let client = self
            .ballchasing
            .as_ref()
            .ok_or_else(|| StorageError::Read {
                key: key.to_owned(),
                source: io::Error::new(
                    io::ErrorKind::NotConnected,
                    "BALLCHASING_API_KEY is required to read this replay",
                ),
            })?;
        let bytes = client.download_replay(replay_id).await.map_err(|error| {
            let kind = match error.status() {
                Some(reqwest::StatusCode::NOT_FOUND) => io::ErrorKind::NotFound,
                Some(reqwest::StatusCode::UNAUTHORIZED | reqwest::StatusCode::FORBIDDEN) => {
                    io::ErrorKind::PermissionDenied
                }
                Some(reqwest::StatusCode::TOO_MANY_REQUESTS) => io::ErrorKind::WouldBlock,
                _ => io::ErrorKind::Other,
            };
            StorageError::Read {
                key: key.to_owned(),
                source: io::Error::new(kind, error.to_string()),
            }
        })?;
        let actual_sha256 = sha256_hex(&bytes);
        if !actual_sha256.eq_ignore_ascii_case(expected_sha256) {
            return Err(StorageError::Read {
                key: key.to_owned(),
                source: io::Error::new(
                    io::ErrorKind::InvalidData,
                    format!(
                        "Ballchasing replay content changed: expected {expected_sha256}, got {actual_sha256}"
                    ),
                ),
            });
        }
        Ok(bytes)
    }

    async fn delete(&self, key: &str) -> Result<(), StorageError> {
        if ballchasing_replay_locator(key)?.is_some() {
            // The upstream object is not owned by Rocket Sense.
            return Ok(());
        }
        self.local.delete(key).await
    }
}

#[cfg(test)]
#[path = "ballchasing_storage_tests.rs"]
mod tests;
