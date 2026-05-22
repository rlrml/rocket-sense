use super::*;

#[test]
fn rejects_absolute_and_parent_keys() {
    let storage = LocalStorage::new("/tmp/rocket-sense-test");

    assert!(storage.resolve_key("/absolute").is_err());
    assert!(storage.resolve_key("../escape").is_err());
    assert!(storage.resolve_key("nested/../escape").is_err());
}
