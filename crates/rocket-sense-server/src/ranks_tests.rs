use super::*;

#[test]
fn rank_group_mapping_matches_refresh_sql() {
    // Must stay in sync with the benchmark refresh CASE
    // `WHEN tier = 22 THEN 7 ELSE (tier - 1) / 3 END`.
    assert_eq!(rank_group_id(1), 0); // Bronze I
    assert_eq!(rank_group_id(3), 0); // Bronze III
    assert_eq!(rank_group_id(7), 2); // Gold I
    assert_eq!(rank_group_id(9), 2); // Gold III
    assert_eq!(rank_group_id(10), 3); // Platinum I
    assert_eq!(rank_group_id(12), 3); // Platinum III
    assert_eq!(rank_group_id(19), 6); // Grand Champion I
    assert_eq!(rank_group_id(21), 6); // Grand Champion III
    assert_eq!(rank_group_id(22), 7); // Supersonic Legend

    assert_eq!(rank_group_label(2), "Gold");
    assert_eq!(rank_group_label(3), "Platinum");
    assert_eq!(rank_group_label(7), "Supersonic Legend");
    assert_eq!(rank_tier_label(14), "Diamond II");
}

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
            "player_name": "Blue",
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
    assert_eq!(player.player_name.as_deref(), Some("Blue"));
    assert_eq!(player.playlist, Some(11));
    assert_eq!(player.valid, Some(true));
    assert_eq!(player.after.tier, Some(16));
    assert_eq!(player.after.division, Some(2));
    assert_eq!(player.after.mmr, Some(1143.0));
    assert_eq!(player.before.mmr, Some(1128.0));
}

#[test]
fn submitted_rank_accepts_display_name_alias() {
    let payload = r#"{"players":[{"platform_player_id":"123","display_name":"Orange"}]}"#;
    let submission: RankSubmission = serde_json::from_str(payload).unwrap();

    assert_eq!(submission.players[0].player_name.as_deref(), Some("Orange"));
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

#[test]
fn observability_summary_counts_rank_metadata_presence() {
    let payload = r#"{
        "players": [
            {
                "platform_player_id": "123",
                "player_name": "Blue",
                "platform": "Epic",
                "playlist": 11,
                "valid": true,
                "after": {"tier": 16, "division": 2, "mmr": 1143.0},
                "before": {"tier": 15, "division": 4, "mmr": 1118.0},
                "current": {
                    "mmr": 1148.0,
                    "win_streak": 4,
                    "matches_played": 250,
                    "placement_matches_played": 10,
                    "fetched_at": 1700000000
                }
            },
            {
                "platform_player_id": "456",
                "after": {"tier": 12},
                "current": {
                    "matches_played": 80
                }
            }
        ]
    }"#;

    let submission: RankSubmission = serde_json::from_str(payload).unwrap();
    let summary = submission.observability_summary();

    assert_eq!(summary.players, 2);
    assert_eq!(summary.player_names, 1);
    assert_eq!(summary.platforms, 1);
    assert_eq!(summary.playlists, 1);
    assert_eq!(summary.valid_flags, 1);
    assert_eq!(summary.after_snapshots, 2);
    assert_eq!(summary.before_snapshots, 1);
    assert_eq!(summary.current_snapshots, 2);
    assert_eq!(summary.current_mmr, 1);
    assert_eq!(summary.current_win_streak, 1);
    assert_eq!(summary.current_matches_played, 2);
    assert_eq!(summary.current_placement_matches_played, 1);
    assert_eq!(summary.current_fetched_at, 1);
}
