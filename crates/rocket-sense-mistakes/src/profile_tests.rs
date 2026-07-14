use super::*;
use serde_json::json;

#[test]
fn default_profile_matches_committed_python_profile() {
    let profile = DetectorProfile::default();
    assert_eq!(profile.name, "default");
    assert_eq!(profile.enabled_kinds.len(), 15);
    assert_eq!(profile.dedupe_window_s, 1.0);
    // A few spot checks against `_DETECTOR_PROFILE`.
    assert_eq!(
        profile.param("too_far_from_play", "distance_threshold", 6000.0),
        5600.0
    );
    assert_eq!(
        profile.param("bumping_teammate", "min_heading_cos", 0.45),
        0.4
    );
    assert_eq!(
        profile.param("bad_defensive_touch", "lookahead_s", 0.0),
        2.25
    );
    // Params not in the committed profile fall through to detector defaults.
    assert_eq!(profile.param("bumping_teammate", "grid_dt", 0.1), 0.1);
    // Committed bool overrides.
    assert!(!profile.param_bool("overcommitting_last_man", "require_beaten", true));
    assert!(!profile.param_bool("bang_with_time", "require_opponent_next_touch", true));
}

#[test]
fn resolve_merges_overrides() {
    let config = json!({
        "name": "tuned",
        "enabled_kinds": ["bad_kickoff"],
        "min_severity": {"bad_kickoff": 0.7, "*": 0.1},
        "dedupe_window_s": 2.5,
        "kind_params": {
            "bad_kickoff": {"new_param": 42.0},
            "too_far_from_play": {"distance_threshold": 5000.0},
        },
    });
    let profile = DetectorProfile::resolve(Some(&config));
    assert_eq!(profile.name, "tuned");
    assert_eq!(profile.enabled_kinds, vec!["bad_kickoff".to_owned()]);
    assert!(profile.kind_enabled("bad_kickoff"));
    assert!(!profile.kind_enabled("bad_fifty"));
    assert_eq!(profile.min_severity_for("bad_kickoff"), 0.7);
    // Wildcard fallback for kinds without an explicit floor.
    assert_eq!(profile.min_severity_for("poor_landing"), 0.1);
    assert_eq!(profile.dedupe_window_s, 2.5);
    assert_eq!(profile.param("bad_kickoff", "new_param", 0.0), 42.0);
    // Overridden param wins; untouched params keep committed defaults.
    assert_eq!(
        profile.param("too_far_from_play", "distance_threshold", 6000.0),
        5000.0
    );
    assert_eq!(profile.param("too_far_from_play", "boost_min", 50.0), 35.0);
}

#[test]
fn bool_params_accept_string_forms() {
    let config = json!({
        "kind_params": {"bang_with_time": {"require_opponent_next_touch": "yes"}},
    });
    let profile = DetectorProfile::resolve(Some(&config));
    assert!(profile.param_bool("bang_with_time", "require_opponent_next_touch", false));
}
