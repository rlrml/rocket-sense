use std::{io::ErrorKind, path::PathBuf, sync::Arc};

use bytes::Bytes;
use rocket_sense_storage::{LocalStorage, ObjectStorage, StorageError};
use uuid::Uuid;

use super::{
    ballchasing_replay_key, ballchasing_replay_locator, BallchasingBackedStorage,
    BallchasingReplayFetcher,
};

const SHA256: &str = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

fn temp_storage() -> (BallchasingBackedStorage, PathBuf) {
    let root = std::env::temp_dir().join(format!(
        "rocket-sense-ballchasing-storage-test-{}",
        Uuid::new_v4()
    ));
    (
        BallchasingBackedStorage::new(LocalStorage::new(&root), None),
        root,
    )
}

struct StaticFetcher(Bytes);
struct MissingFetcher;

#[async_trait::async_trait]
impl BallchasingReplayFetcher for StaticFetcher {
    async fn download_replay(
        &self,
        _replay_id: &str,
    ) -> Result<Bytes, crate::ballchasing::BallchasingError> {
        Ok(self.0.clone())
    }
}

#[async_trait::async_trait]
impl BallchasingReplayFetcher for MissingFetcher {
    async fn download_replay(
        &self,
        _replay_id: &str,
    ) -> Result<Bytes, crate::ballchasing::BallchasingError> {
        Err(crate::ballchasing::BallchasingError::Status {
            url: "https://ballchasing.test/replay".to_owned(),
            status: reqwest::StatusCode::NOT_FOUND,
        })
    }
}

#[test]
fn ballchasing_keys_round_trip_valid_ids() {
    let key = ballchasing_replay_key("abc-123_DEF", SHA256).unwrap();
    assert_eq!(
        key,
        format!("ballchasing/replays/abc-123_DEF/sha256/{SHA256}.replay")
    );
    assert_eq!(
        ballchasing_replay_locator(&key).unwrap(),
        Some(("abc-123_DEF", SHA256))
    );
}

#[test]
fn ballchasing_keys_reject_unsafe_ids_and_malformed_reserved_keys() {
    assert!(ballchasing_replay_key("../abc", SHA256).is_err());
    assert!(ballchasing_replay_key("abc", "not-a-sha").is_err());
    assert!(ballchasing_replay_locator("ballchasing/replays/../abc.replay").is_err());
    assert!(ballchasing_replay_locator("ballchasing/replays/abc").is_err());
}

#[tokio::test]
async fn ordinary_objects_still_use_local_storage() {
    let (storage, root) = temp_storage();
    let bytes = Bytes::from_static(b"derived stats");
    let stored = storage
        .put("analysis/test.json", bytes.clone(), None)
        .await
        .unwrap();

    assert_eq!(storage.get(&stored.key).await.unwrap(), bytes);
    storage.delete(&stored.key).await.unwrap();
    assert!(!root.join(stored.key).exists());
    let _ = tokio::fs::remove_dir_all(root).await;
}

#[tokio::test]
async fn remote_reads_require_configuration_and_remote_deletes_are_noops() {
    let (storage, root) = temp_storage();
    let key = ballchasing_replay_key("abc-123", SHA256).unwrap();

    let error = storage.get(&key).await.unwrap_err();
    assert!(matches!(
        error,
        StorageError::Read { source, .. } if source.kind() == ErrorKind::NotConnected
    ));
    storage.delete(&key).await.unwrap();
    assert!(!root.exists());
}

#[tokio::test]
async fn remote_reads_verify_the_pinned_content_hash() {
    let root = std::env::temp_dir().join(format!(
        "rocket-sense-ballchasing-storage-test-{}",
        Uuid::new_v4()
    ));
    let bytes = Bytes::from_static(b"remote replay bytes");
    let storage = BallchasingBackedStorage::with_fetcher(
        LocalStorage::new(&root),
        Arc::new(StaticFetcher(bytes.clone())),
    );
    let actual_sha256 = rocket_sense_storage::sha256_hex(&bytes);

    let valid_key = ballchasing_replay_key("abc-123", &actual_sha256).unwrap();
    assert_eq!(storage.get(&valid_key).await.unwrap(), bytes);

    let mismatched_key = ballchasing_replay_key("abc-123", SHA256).unwrap();
    let error = storage.get(&mismatched_key).await.unwrap_err();
    assert!(matches!(
        error,
        StorageError::Read { source, .. } if source.kind() == ErrorKind::InvalidData
    ));
    assert!(!root.exists());
}

#[tokio::test]
async fn remote_not_found_status_is_preserved() {
    let root = std::env::temp_dir().join(format!(
        "rocket-sense-ballchasing-storage-test-{}",
        Uuid::new_v4()
    ));
    let storage =
        BallchasingBackedStorage::with_fetcher(LocalStorage::new(&root), Arc::new(MissingFetcher));
    let key = ballchasing_replay_key("missing", SHA256).unwrap();

    let error = storage.get(&key).await.unwrap_err();
    assert!(matches!(
        error,
        StorageError::Read { source, .. } if source.kind() == ErrorKind::NotFound
    ));
    assert!(!root.exists());
}

#[tokio::test]
async fn writes_to_the_remote_namespace_are_rejected() {
    let (storage, root) = temp_storage();
    let key = ballchasing_replay_key("abc-123", SHA256).unwrap();

    assert!(matches!(
        storage.put(&key, Bytes::from_static(b"no"), None).await,
        Err(StorageError::InvalidKey(_))
    ));
    assert!(!root.exists());
}
