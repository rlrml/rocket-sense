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
