use super::*;

#[test]
fn rejects_absolute_and_parent_keys() {
    let storage = LocalStorage::new("/tmp/rocket-sense-test");

    assert!(storage.resolve_key("/absolute").is_err());
    assert!(storage.resolve_key("../escape").is_err());
    assert!(storage.resolve_key("nested/../escape").is_err());
}

#[test]
fn raw_replay_key_is_content_addressed() {
    let sha256 = "0123456789abcdef";

    assert_eq!(
        raw_replay_key(sha256),
        "replays/sha256/0123456789abcdef.replay"
    );
}

#[test]
fn parses_storage_encoding_aliases() {
    assert_eq!(
        "identity".parse::<StorageEncoding>().unwrap(),
        StorageEncoding::Identity
    );
    assert_eq!(
        "raw".parse::<StorageEncoding>().unwrap(),
        StorageEncoding::Identity
    );
    assert_eq!(
        "gz".parse::<StorageEncoding>().unwrap(),
        StorageEncoding::Gzip
    );
    assert_eq!(
        "zst".parse::<StorageEncoding>().unwrap(),
        StorageEncoding::Zstd
    );
    assert!("br".parse::<StorageEncoding>().is_err());
}

#[tokio::test]
async fn local_storage_compresses_and_decodes_zstd_objects() {
    let root = std::env::temp_dir().join(format!("rocket-sense-storage-{}", uuid::Uuid::now_v7()));
    let storage = LocalStorage::new(&root);
    let bytes = Bytes::from(vec![b'a'; 64 * 1024]);

    let stored = storage
        .put("objects/sample.bin", bytes.clone(), None)
        .await
        .expect("object should store");

    assert_eq!(stored.key, "objects/sample.bin.zst");
    assert_eq!(stored.storage_encoding, StorageEncoding::Zstd);
    assert_eq!(stored.byte_size, bytes.len() as u64);
    assert!(stored.storage_byte_size < stored.byte_size);
    assert_eq!(storage.get(&stored.key).await.unwrap(), bytes);

    tokio::fs::remove_dir_all(root).await.unwrap();
}

#[tokio::test]
async fn local_storage_can_store_identity_objects() {
    let root = std::env::temp_dir().join(format!("rocket-sense-storage-{}", uuid::Uuid::now_v7()));
    let storage = LocalStorage::new(&root);
    let bytes = Bytes::from_static(b"raw object");

    let stored = storage
        .put_with_encoding(
            "objects/sample.bin",
            bytes.clone(),
            None,
            StorageEncoding::Identity,
        )
        .await
        .expect("object should store");

    assert_eq!(stored.key, "objects/sample.bin");
    assert_eq!(stored.storage_encoding, StorageEncoding::Identity);
    assert_eq!(stored.storage_byte_size, stored.byte_size);
    assert_eq!(storage.get(&stored.key).await.unwrap(), bytes);

    tokio::fs::remove_dir_all(root).await.unwrap();
}
