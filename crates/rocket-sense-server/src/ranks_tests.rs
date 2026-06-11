use super::*;

#[test]
fn normalize_platform_maps_common_spellings() {
    assert_eq!(normalize_platform("Steam").as_deref(), Some("steam"));
    assert_eq!(normalize_platform("Epic").as_deref(), Some("epic"));
    assert_eq!(normalize_platform("PS4").as_deref(), Some("ps4"));
    assert_eq!(normalize_platform("PlayStation").as_deref(), Some("ps4"));
    assert_eq!(normalize_platform("XboxOne").as_deref(), Some("xbox"));
    assert_eq!(normalize_platform("Switch").as_deref(), Some("switch"));
    assert_eq!(normalize_platform("PsyNet").as_deref(), Some("psynet"));
}

#[test]
fn normalize_platform_passes_unknown_through_lowercased() {
    assert_eq!(normalize_platform("Stadia").as_deref(), Some("stadia"));
}

#[test]
fn normalize_platform_rejects_empty() {
    assert_eq!(normalize_platform("   "), None);
    assert_eq!(normalize_platform(""), None);
}

#[test]
fn rank_submission_default_is_empty() {
    assert!(RankSubmission::default().is_empty());
}

#[test]
fn submitted_rank_deserializes_full_snapshot() {
    let payload = r#"{
        "players": [{
            "platform_player_id": "123",
            "platform": "Epic",
            "playlist": 11,
            "valid": true,
            "after":  {"tier": 16, "division": 2, "mu": 52.15, "sigma": 2.5, "mmr": 1143.0},
            "before": {"tier": 16, "division": 2, "mu": 51.4,  "sigma": 2.5, "mmr": 1128.0}
        }]
    }"#;
    let submission: RankSubmission = serde_json::from_str(payload).unwrap();
    assert_eq!(submission.players.len(), 1);
    let player = &submission.players[0];
    assert_eq!(player.platform_player_id, "123");
    assert_eq!(player.playlist, Some(11));
    assert_eq!(player.valid, Some(true));
    assert_eq!(player.after.tier, Some(16));
    assert_eq!(player.after.division, Some(2));
    assert_eq!(player.after.mmr, Some(1143.0));
    assert_eq!(player.before.mmr, Some(1128.0));
}

#[test]
fn submitted_rank_defaults_absent_snapshots_to_empty() {
    let payload = r#"{"players":[{"platform_player_id":"123"}]}"#;
    let submission: RankSubmission = serde_json::from_str(payload).unwrap();
    let player = &submission.players[0];
    assert_eq!(player.after.tier, None);
    assert_eq!(player.before.mmr, None);
    assert_eq!(player.valid, None);
    assert!(player.current.is_none());
}

#[test]
fn submitted_rank_deserializes_current_skill_counters() {
    let payload = r#"{
        "players": [{
            "platform_player_id": "123",
            "playlist": 11,
            "current": {
                "mmr": 1143.0,
                "win_streak": 4,
                "matches_played": 250,
                "placement_matches_played": 10,
                "fetched_at": 1700000000
            }
        }]
    }"#;
    let submission: RankSubmission = serde_json::from_str(payload).unwrap();
    let current = submission.players[0]
        .current
        .as_ref()
        .expect("current skill present");
    assert_eq!(current.mmr, Some(1143.0));
    assert_eq!(current.win_streak, Some(4));
    assert_eq!(current.matches_played, Some(250));
    assert_eq!(current.placement_matches_played, Some(10));
    assert_eq!(current.fetched_at, Some(1_700_000_000));
}
