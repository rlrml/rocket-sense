use super::*;

#[test]
fn fingerprint_is_deterministic_and_sensitive() {
    let a = mistake_fingerprint("abc123", "too_far_from_play", "steam:1", 10.25, 8.0, 12.5);
    let b = mistake_fingerprint("abc123", "too_far_from_play", "steam:1", 10.25, 8.0, 12.5);
    assert_eq!(a, b);
    assert_eq!(a.len(), 64);

    // Any identity component changing produces a different fingerprint.
    assert_ne!(
        a,
        mistake_fingerprint("abc124", "too_far_from_play", "steam:1", 10.25, 8.0, 12.5)
    );
    assert_ne!(
        a,
        mistake_fingerprint("abc123", "bad_kickoff", "steam:1", 10.25, 8.0, 12.5)
    );
    assert_ne!(
        a,
        mistake_fingerprint("abc123", "too_far_from_play", "steam:2", 10.25, 8.0, 12.5)
    );
    assert_ne!(
        a,
        mistake_fingerprint("abc123", "too_far_from_play", "steam:1", 10.26, 8.0, 12.5)
    );
}

#[test]
fn fingerprint_rounds_to_centiseconds() {
    // Detector times are already rounded to 2dp; tiny representation noise
    // below a centisecond must not change the identity.
    let a = mistake_fingerprint("abc", "poor_landing", "steam:1", 10.25, 8.0, 12.5);
    let b = mistake_fingerprint(
        "abc",
        "poor_landing",
        "steam:1",
        10.250000000001,
        7.999999999999,
        12.500000000001,
    );
    assert_eq!(a, b);
}

#[test]
fn all_kinds_have_display_names() {
    for kind in MISTAKE_KINDS {
        assert_ne!(
            mistake_display_name(kind),
            "Mistake",
            "missing name: {kind}"
        );
    }
    assert_eq!(mistake_display_name("unknown_kind"), "Mistake");
}

#[test]
fn review_status_normalization() {
    assert_eq!(normalize_review_status("confirmed").unwrap(), "confirmed");
    assert_eq!(normalize_review_status("Accepted").unwrap(), "confirmed");
    assert_eq!(normalize_review_status("REJECTED").unwrap(), "rejected");
    assert!(normalize_review_status("bogus").is_err());
    assert!(normalize_review_status("").is_err());
}
