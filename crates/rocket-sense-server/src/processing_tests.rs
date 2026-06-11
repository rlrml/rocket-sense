use super::*;

#[test]
fn replay_search_metadata_extracts_headers_and_players() {
    let replay_meta = ReplayMeta {
        team_zero: vec![PlayerInfo {
            remote_id: RemoteId::Steam(76561198000000001),
            stats: None,
            name: "Blue Player".to_owned(),
            car_body_id: None,
            car_body_name: None,
            car_hitbox_family: None,
        }],
        team_one: vec![PlayerInfo {
            remote_id: RemoteId::Epic("orange-epic-id".to_owned()),
            stats: None,
            name: "Orange Player".to_owned(),
            car_body_id: None,
            car_body_name: None,
            car_hitbox_family: None,
        }],
        all_headers: vec![
            (
                "Playlist".to_owned(),
                HeaderProp::Str("Ranked Doubles".to_owned()),
            ),
            (
                "MapName".to_owned(),
                HeaderProp::Name("Stadium_P".to_owned()),
            ),
            (
                "Date".to_owned(),
                HeaderProp::Str("2026-05-23 05-50-00".to_owned()),
            ),
        ],
        game_type: subtr_actor::ReplayGameTypeDetails::default(),
        season: None,
    };

    let metadata = replay_search_metadata_from_meta(&replay_meta);

    assert_eq!(metadata.playlist.as_deref(), Some("ranked-doubles"));
    assert_eq!(metadata.map_code.as_deref(), Some("Stadium_P"));
    assert_eq!(
        metadata
            .replay_date
            .map(|date| date.to_rfc3339())
            .as_deref(),
        Some("2026-05-23T05:50:00+00:00")
    );
    assert_eq!(metadata.players.len(), 2);
    assert_eq!(metadata.players[0].name, "Blue Player");
    assert_eq!(metadata.players[0].platform.as_deref(), Some("steam"));
    assert_eq!(metadata.players[0].team, 0);
    assert_eq!(metadata.players[1].name, "Orange Player");
    assert_eq!(metadata.players[1].platform.as_deref(), Some("epic"));
    assert_eq!(metadata.players[1].team, 1);
}

#[test]
fn replay_search_metadata_prefers_specific_playlist_name_over_online_match_type() {
    let replay_meta = ReplayMeta {
        team_zero: vec![],
        team_one: vec![],
        all_headers: vec![
            ("Playlist".to_owned(), HeaderProp::Str("Online".to_owned())),
            (
                "PlaylistName".to_owned(),
                HeaderProp::Str("Ranked Standard".to_owned()),
            ),
        ],
        game_type: subtr_actor::ReplayGameTypeDetails::default(),
        season: None,
    };

    let metadata = replay_search_metadata_from_meta(&replay_meta);

    assert_eq!(metadata.playlist.as_deref(), Some("ranked-standard"));
}

#[test]
fn replay_search_metadata_splits_online_playlist_by_team_size() {
    let player = || PlayerInfo {
        remote_id: RemoteId::Epic("player".to_owned()),
        stats: None,
        name: "Player".to_owned(),
        car_body_id: None,
        car_body_name: None,
        car_hitbox_family: None,
    };
    let replay_meta = ReplayMeta {
        team_zero: vec![player(), player()],
        team_one: vec![player(), player()],
        all_headers: vec![("Playlist".to_owned(), HeaderProp::Str("Online".to_owned()))],
        game_type: subtr_actor::ReplayGameTypeDetails::default(),
        season: None,
    };

    let metadata = replay_search_metadata_from_meta(&replay_meta);

    assert_eq!(metadata.playlist.as_deref(), Some("online-2v2"));
}

#[test]
fn replay_search_metadata_prefers_network_playlist_id_over_ambiguous_online_header() {
    let player = || PlayerInfo {
        remote_id: RemoteId::Epic("player".to_owned()),
        stats: None,
        name: "Player".to_owned(),
        car_body_id: None,
        car_body_name: None,
        car_hitbox_family: None,
    };
    let replay_meta = ReplayMeta {
        team_zero: vec![player(), player()],
        team_one: vec![player(), player()],
        all_headers: vec![("MatchType".to_owned(), HeaderProp::Str("Online".to_owned()))],
        game_type: subtr_actor::ReplayGameTypeDetails::from_signals(
            Some("Online".to_owned()),
            Some(11),
            Some("TAGame.MatchType_PublicRanked_TA".to_owned()),
        ),
        season: None,
    };

    let metadata = replay_search_metadata_from_meta(&replay_meta);

    assert_eq!(metadata.playlist.as_deref(), Some("ranked-doubles"));
    assert_eq!(
        metadata.game_type.replay_game_type.as_deref(),
        Some("ranked")
    );
    assert_eq!(
        metadata.game_type.header_match_type.as_deref(),
        Some("Online")
    );
    assert_eq!(metadata.game_type.game_playlist_id, Some(11));
    assert_eq!(
        metadata.game_type.match_type_class.as_deref(),
        Some("TAGame.MatchType_PublicRanked_TA")
    );
}

#[test]
fn replay_search_metadata_uses_game_type_when_playlist_id_is_ambiguous() {
    let replay_meta = ReplayMeta {
        team_zero: vec![],
        team_one: vec![],
        all_headers: vec![("MatchType".to_owned(), HeaderProp::Str("LAN".to_owned()))],
        game_type: subtr_actor::ReplayGameTypeDetails::from_signals(
            Some("LAN".to_owned()),
            Some(6),
            Some("TAGame.MatchType_Lan_TA".to_owned()),
        ),
        season: None,
    };

    let metadata = replay_search_metadata_from_meta(&replay_meta);

    assert_eq!(metadata.playlist.as_deref(), Some("lan"));
    assert_eq!(metadata.game_type.replay_game_type.as_deref(), Some("lan"));
    assert_eq!(metadata.game_type.game_playlist_id, Some(6));
}

#[test]
fn parse_replay_date_accepts_common_replay_header_formats() {
    assert_eq!(
        parse_replay_date("2026-05-23 05-50-00")
            .map(|date| date.to_rfc3339())
            .as_deref(),
        Some("2026-05-23T05:50:00+00:00")
    );
    assert_eq!(
        parse_replay_date("2026-05-23T05:50:00Z")
            .map(|date| date.to_rfc3339())
            .as_deref(),
        Some("2026-05-23T05:50:00+00:00")
    );
}

#[test]
fn normalize_playlist_returns_filter_slugs_for_common_values() {
    assert_eq!(normalize_playlist("2".to_owned()), "unranked-doubles");
    assert_eq!(normalize_playlist("11".to_owned()), "ranked-doubles");
    assert_eq!(normalize_playlist("13".to_owned()), "ranked-standard");
    assert_eq!(normalize_playlist("6".to_owned()), "private");
    assert_eq!(normalize_playlist("8".to_owned()), "offline");
    assert_eq!(
        normalize_playlist("Ranked Snow Day".to_owned()),
        "ranked-snowday"
    );
    assert_eq!(normalize_playlist("Doubles".to_owned()), "Doubles");
    assert_eq!(
        normalize_playlist("Unrecognized Playlist".to_owned()),
        "Unrecognized Playlist"
    );
}

#[test]
fn indexed_goal_context_does_not_synthesize_goal_tag_events() {
    let event = subtr_actor::GoalContextEvent {
        time: 123.5,
        frame: 7410,
        scoring_team_is_team_0: false,
        scorer: Some(RemoteId::Steam(76561198000000001)),
        scoring_team_most_back_player: None,
        defending_team_most_back_player: None,
        ball_position: None,
        ball_speed_at_goal: None,
        ball_air_time_before_goal: None,
        pressure_duration_before_goal: None,
        time_after_kickoff: None,
        goal_buildup: subtr_actor::GoalBuildupKind::Other,
        scorer_last_touch: None,
        players: vec![],
        tags: vec![subtr_actor::GoalTag::DoubleTapGoal(
            subtr_actor::GoalTagMetadata {
                confidence: 0.85,
                performer: None,
                modifiers: vec![subtr_actor::GoalTagModifier::ByScorer],
                related_events: vec![],
                evidence: vec![subtr_actor::GoalTagEvidence {
                    kind: subtr_actor::GoalTagEvidenceKind::DoubleTap,
                    time: 121.0,
                    frame: 7260,
                    player: Some(RemoteId::Steam(76561198000000001)),
                    player_position: None,
                }],
            },
        )],
    };
    let timeline = stats_timeline_with_events(timeline_events_from(vec![moment_event(
        "goal_context",
        event.frame,
        event.time,
        subtr_actor::EventPayload::GoalContext(event),
    )]));

    let indexed = build_indexed_events(&timeline).expect("goal context should index");
    let goal_context = indexed
        .iter()
        .find(|event| event.event_type_key == "goal_context")
        .expect("goal context row should remain indexed");

    assert_eq!(goal_context.category, "context");
    assert_eq!(goal_context.event_frame, Some(7410));
    assert_eq!(goal_context.event_time, Some(123.5));
    assert!(!indexed
        .iter()
        .any(|event| event.event_type_key.starts_with("goal_tag_")));
}

#[test]
fn build_indexed_events_uses_serialized_stats_timeline_touches() {
    let touch_events = vec![
        touch_stats_event(2.0, 120, RemoteId::Steam(76561198000000002), true),
        touch_stats_event(3.0, 180, RemoteId::Epic("epic-player".to_owned()), false),
    ];
    let timeline = stats_timeline_with_events(timeline_events_from(
        touch_events
            .into_iter()
            .map(|event| {
                moment_event(
                    "touch",
                    event.frame,
                    event.time,
                    subtr_actor::EventPayload::Touch(event),
                )
            })
            .collect(),
    ));

    let indexed = build_indexed_events(&timeline).expect("touch events should index");
    let touch_rows = indexed
        .iter()
        .filter(|event| event.event_type_key == "touch")
        .collect::<Vec<_>>();

    assert_eq!(touch_rows.len(), 2);
    assert!(touch_rows
        .iter()
        .all(|event| event.source == STATS_TIMELINE_SOURCE));
    assert!(touch_rows.iter().all(|event| event.category == "other"));
    assert_eq!(
        touch_rows[0]
            .primary_subject
            .as_ref()
            .map(|subject| subject.id.as_str()),
        Some("steam:76561198000000002")
    );
    assert_eq!(
        touch_rows[1]
            .primary_subject
            .as_ref()
            .map(|subject| subject.id.as_str()),
        Some("epic:epic-player")
    );
}

#[test]
fn touch_last_touch_is_not_an_indexed_event_stream() {
    assert!(should_index_timeline_stream("touch"));
    assert!(!should_index_timeline_stream("goal_tags"));
    assert!(!should_index_timeline_stream("touch_last_touch"));
}

#[test]
fn indexed_timeline_events_use_span_timing_fields_for_review_clips() {
    let rush = indexed_timeline_payload_event(
        "rush",
        0,
        &serde_json::json!({
            "start_time": 11.0,
            "start_frame": 660,
            "end_time": 14.25,
            "end_frame": 855,
            "is_team_0": false,
            "attackers": 2,
            "defenders": 1
        }),
    )
    .expect("rush event should index");

    assert_eq!(rush.event_type_key, "rush");
    assert_eq!(rush.category, "possession");
    assert_eq!(rush.start_time, Some(11.0));
    assert_eq!(rush.end_time, Some(14.25));
    assert_eq!(rush.event_time, Some(14.25));
    assert_eq!(rush.start_frame, Some(660));
    assert_eq!(rush.end_frame, Some(855));
    assert_eq!(rush.event_frame, Some(855));
    assert_eq!(
        rush.primary_subject.as_ref().map(|subject| (
            subject.kind.as_str(),
            subject.id.as_str(),
            subject.role.as_str()
        )),
        Some(("team", "1", "team"))
    );
}

#[test]
fn indexed_timeline_events_use_resolve_timing_fields_for_review_targets() {
    let fifty_fifty = indexed_timeline_payload_event(
        "fifty_fifty",
        0,
        &serde_json::json!({
            "start_time": 20.0,
            "start_frame": 1200,
            "resolve_time": 20.6,
            "resolve_frame": 1236,
            "is_kickoff": false,
            "team_zero_player": { "Steam": 76561198000000001_u64 },
            "team_one_player": { "Epic": "orange-player" },
            "winning_team_is_team_0": true,
            "possession_team_is_team_0": false
        }),
    )
    .expect("50/50 event should index");

    assert_eq!(fifty_fifty.event_type_key, "fifty_fifty");
    assert_eq!(fifty_fifty.start_time, Some(20.0));
    assert_eq!(fifty_fifty.end_time, Some(20.6));
    assert_eq!(fifty_fifty.event_time, Some(20.6));
    assert_eq!(fifty_fifty.start_frame, Some(1200));
    assert_eq!(fifty_fifty.end_frame, Some(1236));
    assert_eq!(fifty_fifty.event_frame, Some(1236));
    assert!(fifty_fifty.subjects.iter().any(|subject| {
        subject.kind == "player"
            && subject.id == "steam:76561198000000001"
            && subject.role == "team_zero_player"
    }));
    assert!(fifty_fifty.subjects.iter().any(|subject| {
        subject.kind == "player"
            && subject.id == "epic:orange-player"
            && subject.role == "team_one_player"
    }));
    assert!(fifty_fifty.subjects.iter().any(|subject| {
        subject.kind == "team" && subject.id == "0" && subject.role == "winning_team"
    }));
    assert!(fifty_fifty.subjects.iter().any(|subject| {
        subject.kind == "team" && subject.id == "1" && subject.role == "possession_team"
    }));
}

#[test]
fn indexed_timeline_events_keep_pass_start_and_receiver_subject() {
    let pass = indexed_timeline_payload_event(
        "pass",
        0,
        &serde_json::json!({
            "time": 31.25,
            "frame": 1875,
            "sample_time": 31.5,
            "sample_frame": 1890,
            "start_time": 30.0,
            "start_frame": 1800,
            "passer": { "Steam": 76561198000000001_u64 },
            "receiver": { "Steam": 76561198000000002_u64 },
            "is_team_0": true,
            "duration": 1.5,
            "ball_travel_distance": 700.0,
            "ball_advance_distance": 450.0,
            "pass_kind": "direct"
        }),
    )
    .expect("pass event should index");

    assert_eq!(pass.event_type_key, "pass");
    assert_eq!(pass.start_time, Some(30.0));
    assert_eq!(pass.end_time, Some(31.5));
    assert_eq!(pass.event_time, Some(31.25));
    assert_eq!(pass.start_frame, Some(1800));
    assert_eq!(pass.end_frame, Some(1890));
    assert_eq!(pass.event_frame, Some(1875));
    assert_eq!(
        pass.primary_subject
            .as_ref()
            .map(|subject| (subject.id.as_str(), subject.role.as_str())),
        Some(("steam:76561198000000001", "passer"))
    );
    assert!(pass.subjects.iter().any(|subject| {
        subject.kind == "player"
            && subject.id == "steam:76561198000000002"
            && subject.role == "receiver"
    }));
}

#[test]
fn indexed_timeline_events_give_boost_pickups_one_review_type_with_detection_attribute() {
    let boost_pickup = indexed_timeline_payload_event(
        "boost_pickups",
        0,
        &serde_json::json!({
            "detection": "both",
            "time": 40.0,
            "frame": 2400,
            "player_id": { "Steam": 76561198000000001_u64 },
            "is_team_0": true,
            "pad_type": "big",
            "field_half": "opponent",
            "activity": "active",
            "is_steal": true,
            "collected_amount": 88.0,
            "overfill_amount": 0.0,
            "boost_before": 12.0,
            "boost_after": 100.0
        }),
    )
    .expect("boost pickup event should index");

    assert_eq!(boost_pickup.event_type_key, "boost_pickup");
    assert_eq!(boost_pickup.display_name, "Boost Pickup");
    assert_eq!(boost_pickup.category, "boost");
    assert_eq!(
        boost_pickup
            .attributes
            .get("detection")
            .and_then(|value| value.as_str()),
        Some("both")
    );
    assert_eq!(
        boost_pickup.primary_subject.as_ref().map(|subject| (
            subject.kind.as_str(),
            subject.id.as_str(),
            subject.role.as_str()
        )),
        Some(("player", "steam:76561198000000001", "actor"))
    );

    let inferred = indexed_timeline_payload_event(
        "boost_pickups",
        1,
        &serde_json::json!({
            "detection": "inferred_only",
            "time": 41.0,
            "frame": 2460,
            "player_id": { "Steam": 76561198000000001_u64 },
            "is_team_0": true,
            "pad_type": "small",
            "field_half": "own",
            "activity": "active",
            "is_steal": false,
            "collected_amount": 12.0,
            "overfill_amount": 0.0
        }),
    )
    .expect("boost pickup event should index");
    assert_eq!(inferred.event_type_key, "boost_pickup");
    assert_eq!(
        inferred
            .attributes
            .get("detection")
            .and_then(|value| value.as_str()),
        Some("inferred_only")
    );

    let reported = indexed_timeline_payload_event(
        "boost_pickups",
        2,
        &serde_json::json!({
            "detection": "reported_only",
            "time": 42.0,
            "frame": 2520,
            "player_id": { "Steam": 76561198000000001_u64 },
            "is_team_0": true,
            "pad_type": "small",
            "field_half": "own",
            "activity": "active",
            "is_steal": false,
            "collected_amount": 0.0,
            "overfill_amount": 0.0
        }),
    )
    .expect("boost pickup event should index");
    assert_eq!(reported.event_type_key, "boost_pickup");
    assert_eq!(
        reported
            .attributes
            .get("detection")
            .and_then(|value| value.as_str()),
        Some("reported_only")
    );
}

#[test]
fn indexed_timeline_events_use_resolved_timing_fields_for_whiffs() {
    let whiff = indexed_timeline_payload_event(
        "whiff",
        0,
        &serde_json::json!({
            "kind": "beaten_to_ball",
            "time": 52.0,
            "frame": 3120,
            "resolved_time": 52.35,
            "resolved_frame": 3141,
            "player": { "Steam": 76561198000000001_u64 },
            "is_team_0": true,
            "closest_approach_distance": 175.0,
            "forward_alignment": 0.8,
            "approach_speed": 1200.0,
            "dodge_active": false,
            "aerial": false
        }),
    )
    .expect("whiff event should index");

    assert_eq!(whiff.event_type_key, "whiff");
    assert_eq!(whiff.category, "other");
    assert_eq!(whiff.start_time, Some(52.0));
    assert_eq!(whiff.end_time, Some(52.35));
    assert_eq!(whiff.event_time, Some(52.0));
    assert_eq!(whiff.start_frame, Some(3120));
    assert_eq!(whiff.end_frame, Some(3141));
    assert_eq!(whiff.event_frame, Some(3120));
    assert_eq!(whiff.attributes["kind"], "beaten_to_ball");
    assert_eq!(
        whiff.primary_subject.as_ref().map(|subject| (
            subject.kind.as_str(),
            subject.id.as_str(),
            subject.role.as_str()
        )),
        Some(("player", "steam:76561198000000001", "actor"))
    );
}

#[test]
fn indexed_timeline_events_use_upstream_event_metadata_for_newer_streams() {
    let controlled_play = indexed_timeline_payload_event(
        "controlled_play",
        0,
        &serde_json::json!({
            "start_time": 10.0,
            "start_frame": 600,
            "end_time": 12.0,
            "end_frame": 720,
            "player_id": { "Steam": 76561198000000001_u64 },
            "is_team_0": true,
            "touch_count": 3
        }),
    )
    .expect("controlled play event should index");
    let backboard = indexed_timeline_payload_event(
        "backboard",
        0,
        &serde_json::json!({
            "time": 14.0,
            "frame": 840,
            "player": { "Epic": "backboard-player" },
            "is_team_0": false
        }),
    )
    .expect("backboard event should index");
    let flip_impulse = indexed_timeline_payload_event(
        "flip_impulse",
        0,
        &serde_json::json!({
            "time": 20.0,
            "frame": 1200,
            "resolved_time": 20.18,
            "resolved_frame": 1211,
            "player": { "Steam": 76561198000000002_u64 },
            "is_team_0": true,
            "direction_label": "forward_right"
        }),
    )
    .expect("flip impulse event should index");

    assert_eq!(controlled_play.event_type_key, "controlled_play");
    assert_eq!(controlled_play.display_name, "Controlled Play");
    assert_eq!(controlled_play.category, "possession");
    assert_eq!(
        controlled_play
            .primary_subject
            .as_ref()
            .map(|subject| (subject.id.as_str(), subject.role.as_str())),
        Some(("steam:76561198000000001", "actor"))
    );

    assert_eq!(backboard.event_type_key, "backboard_bounce");
    assert_eq!(backboard.display_name, "Backboard Bounce");
    assert_eq!(backboard.category, "mechanic");

    assert_eq!(flip_impulse.event_type_key, "flip_impulse");
    assert_eq!(flip_impulse.display_name, "Flip Impulse");
    assert_eq!(flip_impulse.category, "event");
    assert_eq!(flip_impulse.end_time, Some(20.18));
}

#[test]
fn indexed_kickoff_events_capture_nested_player_subjects() {
    let kickoff = indexed_timeline_payload_event(
        "kickoff",
        0,
        &serde_json::json!({
            "start_time": 0.0,
            "start_frame": 0,
            "end_time": 2.0,
            "end_frame": 120,
            "first_touch_player": { "Steam": 76561198000000001_u64 },
            "first_touch_team_is_team_0": true,
            "first_follow_up_touch_player": { "Epic": "follow-up" },
            "first_follow_up_touch_team_is_team_0": false,
            "kickoff_possession_team_is_team_0": false,
            "team_zero_taker": {
                "player": { "Steam": 76561198000000001_u64 },
                "is_team_0": true
            },
            "team_one_taker": {
                "player": { "Steam": 76561198000000002_u64 },
                "is_team_0": false
            },
            "team_zero_non_takers": [
                { "player": { "Epic": "blue-support" }, "is_team_0": true }
            ],
            "team_one_non_takers": [
                { "player": { "Epic": "orange-support" }, "is_team_0": false }
            ]
        }),
    )
    .expect("kickoff event should index");

    assert_eq!(kickoff.event_type_key, "kickoff");
    assert_eq!(kickoff.display_name, "Kickoff");
    assert_eq!(kickoff.category, "possession");
    assert!(kickoff.subjects.iter().any(|subject| {
        subject.kind == "player"
            && subject.id == "steam:76561198000000001"
            && subject.role == "first_touch"
    }));
    assert!(kickoff.subjects.iter().any(|subject| {
        subject.kind == "player"
            && subject.id == "steam:76561198000000002"
            && subject.role == "team_one_taker"
    }));
    assert!(kickoff.subjects.iter().any(|subject| {
        subject.kind == "player"
            && subject.id == "epic:blue-support"
            && subject.role == "team_zero_support"
    }));
    assert!(kickoff.subjects.iter().any(|subject| {
        subject.kind == "team" && subject.id == "1" && subject.role == "kickoff_possession_team"
    }));
}

#[test]
fn kickoff_detail_rows_capture_event_and_player_behavior_dimensions() {
    let event_id = Uuid::now_v7();
    let replay_id = Uuid::now_v7();
    let blue_taker_replay_player_id = Uuid::now_v7();
    let kickoff = indexed_timeline_payload_event(
        "kickoff",
        4,
        &serde_json::json!({
            "start_time": 0.0,
            "start_frame": 0,
            "end_time": 2.0,
            "end_frame": 120,
            "first_touch_time": 1.45,
            "first_touch_frame": 87,
            "first_touch_player": { "Steam": 76561198000000001_u64 },
            "first_touch_team_is_team_0": true,
            "first_follow_up_touch_time": 1.9,
            "first_follow_up_touch_frame": 114,
            "first_follow_up_touch_player": { "Epic": "follow-up" },
            "first_follow_up_touch_team_is_team_0": false,
            "outcome": "team_zero_win",
            "winning_team_is_team_0": true,
            "win_strength": 0.72,
            "win_strength_band": "strong",
            "kickoff_possession_outcome": "team_zero_advantage",
            "kickoff_possession_team_is_team_0": true,
            "kickoff_goal": true,
            "scoring_team_is_team_0": true,
            "time_to_goal": 5.5,
            "taker_touch_delay_seconds": 0.18,
            "exit_speed": 2180.0,
            "exit_y_velocity": 1320.0,
            "advantage": "team_one_possession",
            "advantage_team_is_team_0": false,
            "advantage_player": { "Epic": "follow-up" },
            "advantage_time": 4.8,
            "advantage_frame": 288,
            "advantage_seconds_after_first_touch": 3.35,
            "team_zero_taker": {
                "player": { "Steam": 76561198000000001_u64 },
                "is_team_0": true,
                "spawn_position": "diagonal_left",
                "start_boost": 33.0,
                "boost_after": 12.0,
                "time_to_ball": 1.05,
                "first_touch_time": 1.45,
                "first_touch_frame": 87,
                "outcome": "touched",
                "approach": "speed_flip"
            },
            "team_one_taker": {
                "player": { "Steam": 76561198000000002_u64 },
                "is_team_0": false,
                "spawn_position": "diagonal_right",
                "start_boost": 33.0,
                "boost_after": 18.0,
                "time_to_ball": null,
                "first_touch_time": null,
                "first_touch_frame": null,
                "outcome": "missed",
                "approach": "diagonal_flip"
            },
            "team_zero_non_takers": [
                {
                    "player": { "Epic": "blue-support" },
                    "is_team_0": true,
                    "spawn_position": "off_center_left",
                    "start_boost": 33.0,
                    "boost_after": 100.0,
                    "support_behavior": "go_for_boost"
                }
            ],
            "team_one_non_takers": [
                {
                    "player": { "Epic": "orange-support" },
                    "is_team_0": false,
                    "spawn_position": "off_center_right",
                    "start_boost": 33.0,
                    "boost_after": 20.0,
                    "support_behavior": "cheat"
                }
            ]
        }),
    )
    .expect("kickoff event should index");
    let replay_players = HashMap::from([(
        "steam:76561198000000001".to_owned(),
        blue_taker_replay_player_id,
    )]);

    let detail =
        kickoff_detail_row(event_id, replay_id, &kickoff).expect("kickoff detail should parse");
    assert_eq!(detail.event_id, event_id);
    assert_eq!(detail.replay_id, replay_id);
    assert_eq!(detail.outcome.as_deref(), Some("team_zero_win"));
    assert_eq!(detail.winning_team, Some(0));
    assert_eq!(detail.win_strength, Some(0.72));
    assert_eq!(detail.win_strength_band.as_deref(), Some("strong"));
    assert_eq!(
        detail.kickoff_possession_outcome.as_deref(),
        Some("team_zero_advantage")
    );
    assert_eq!(detail.kickoff_possession_team, Some(0));
    assert!(detail.kickoff_goal);
    assert_eq!(detail.scoring_team, Some(0));
    assert_eq!(
        detail.first_touch_subject_id.as_deref(),
        Some("steam:76561198000000001")
    );
    assert_eq!(
        detail.first_follow_up_touch_subject_id.as_deref(),
        Some("epic:follow-up")
    );
    assert_eq!(detail.advantage.as_deref(), Some("team_one_possession"));
    assert_eq!(detail.advantage_team, Some(1));
    assert_eq!(
        detail.advantage_subject_id.as_deref(),
        Some("epic:follow-up")
    );
    assert_eq!(detail.advantage_time, Some(4.8));
    assert_eq!(detail.advantage_frame, Some(288));
    assert_eq!(detail.advantage_seconds_after_first_touch, Some(3.35));

    let player_rows = kickoff_player_detail_rows(event_id, replay_id, &kickoff, &replay_players)
        .expect("kickoff player rows should parse");
    assert_eq!(player_rows.len(), 4);
    let blue_taker = player_rows
        .iter()
        .find(|row| row.team_role == "team_zero_taker")
        .expect("blue taker should be captured");
    assert_eq!(blue_taker.event_id, event_id);
    assert_eq!(blue_taker.replay_id, replay_id);
    assert_eq!(
        blue_taker.replay_player_id,
        Some(blue_taker_replay_player_id)
    );
    assert_eq!(blue_taker.player_subject_id, "steam:76561198000000001");
    assert_eq!(blue_taker.role, "taker");
    assert_eq!(blue_taker.team, 0);
    assert_eq!(blue_taker.spawn_position.as_deref(), Some("diagonal_left"));
    assert_eq!(blue_taker.taker_outcome.as_deref(), Some("touched"));
    assert_eq!(blue_taker.approach.as_deref(), Some("speed_flip"));
    assert_eq!(blue_taker.boost_after, Some(12.0));
    assert_eq!(blue_taker.time_to_ball, Some(1.05));

    let orange_support = player_rows
        .iter()
        .find(|row| row.team_role == "team_one_support")
        .expect("orange support should be captured");
    assert_eq!(orange_support.player_subject_id, "epic:orange-support");
    assert_eq!(orange_support.role, "support");
    assert_eq!(orange_support.replay_id, replay_id);
    assert_eq!(orange_support.replay_player_id, None);
    assert_eq!(orange_support.team, 1);
    assert_eq!(orange_support.support_behavior.as_deref(), Some("cheat"));
}

#[test]
fn remote_id_value_to_subject_id_extracts_platform_online_id_objects() {
    let ps4_id = serde_json::to_value(RemoteId::PlayStation(boxcars::Ps4Id {
        online_id: 6788998483854448235,
        name: "KvonUnknown".to_owned(),
        unknown1: vec![98, 50, 117],
    }))
    .unwrap();
    let switch_id = serde_json::to_value(RemoteId::Switch(boxcars::SwitchId {
        online_id: 123456789,
        unknown1: vec![1, 2, 3],
    }))
    .unwrap();

    assert_eq!(
        remote_id_value_to_subject_id(&ps4_id).unwrap(),
        "ps4:6788998483854448235"
    );
    assert_eq!(
        remote_id_value_to_subject_id(&switch_id).unwrap(),
        "switch:123456789"
    );
}

#[test]
fn build_indexed_events_does_not_duplicate_serialized_rotation_span_streams() {
    let player = RemoteId::Steam(76561198000000001);
    let timeline = stats_timeline_with_events(timeline_events_from(vec![
        moment_event(
            "rotation_player",
            0,
            0.0,
            subtr_actor::EventPayload::RotationPlayer(rotation_player_event(
                0.0,
                0,
                player.clone(),
                true,
                subtr_actor::RoleState::FirstMan,
            )),
        ),
        envelope_event(
            "rotation_role_span",
            subtr_actor::EventTiming::Span {
                start_frame: 0,
                end_frame: 60,
                start_time: 0.0,
                end_time: 1.0,
            },
            subtr_actor::EventPayload::RotationRoleSpan(subtr_actor::RotationRoleSpanEvent {
                time: 0.0,
                frame: 0,
                end_time: 1.0,
                end_frame: 60,
                duration: 1.0,
                player,
                player_position: None,
                is_team_0: true,
                current_role_state: subtr_actor::RoleState::FirstMan,
            }),
        ),
    ]));

    let indexed = build_indexed_events(&timeline).expect("rotation should index");
    let role_spans = indexed
        .iter()
        .filter(|event| event.source_stream == "rotation_role_span")
        .collect::<Vec<_>>();
    let first_man_stints = indexed
        .iter()
        .filter(|event| event.event_type_key == "rotation_first_man_stint")
        .collect::<Vec<_>>();
    let rotation_player_events = indexed
        .iter()
        .filter(|event| event.source_stream == "rotation_player")
        .collect::<Vec<_>>();

    assert_eq!(role_spans.len(), 1);
    assert_eq!(role_spans[0].event_type_key, "rotation_role_first_man");
    assert_eq!(role_spans[0].category, "positioning");
    assert_eq!(first_man_stints.len(), 0);
    // Per-frame rotation_player state spans are no longer indexed as play
    // events; they live only in the event stream object.
    assert_eq!(rotation_player_events.len(), 0);
}

#[test]
fn build_indexed_events_indexes_rotation_first_man_stint_durations() {
    // subtr-actor emits rotation_first_man_stint spans directly; rocket-sense just
    // indexes them.
    let player = RemoteId::Steam(76561198000000001);
    let timeline = stats_timeline_with_events(timeline_events_from(vec![envelope_event(
        "rotation_first_man_stint",
        subtr_actor::EventTiming::Span {
            start_frame: 0,
            end_frame: 2,
            start_time: 0.0,
            end_time: 1.0,
        },
        subtr_actor::EventPayload::RotationFirstManStint(subtr_actor::RotationFirstManStintEvent {
            time: 0.0,
            frame: 0,
            end_time: 1.0,
            end_frame: 2,
            duration: 1.5,
            player,
            player_position: None,
            is_team_0: true,
        }),
    )]));

    let indexed = build_indexed_events(&timeline).expect("rotation should index");
    let rotation_rows = indexed
        .iter()
        .filter(|event| event.event_type_key == "rotation_first_man_stint")
        .collect::<Vec<_>>();

    assert_eq!(rotation_rows.len(), 1);
    let row = rotation_rows[0];
    assert_eq!(row.start_frame, Some(0));
    assert_eq!(row.end_frame, Some(2));
    assert_eq!(row.start_time, Some(0.0));
    assert_eq!(row.end_time, Some(1.0));
    assert_eq!(row.attributes["duration_seconds"], 1.5);
    assert_eq!(
        row.primary_subject
            .as_ref()
            .map(|subject| subject.id.as_str()),
        Some("steam:76561198000000001")
    );
}

fn stats_timeline_with_events(
    events: subtr_actor::ReplayStatsTimelineEvents,
) -> subtr_actor::ReplayStatsTimelineScaffold {
    subtr_actor::ReplayStatsTimelineScaffold {
        config: subtr_actor::default_stats_timeline_config(),
        replay_meta: ReplayMeta {
            team_zero: vec![],
            team_one: vec![],
            game_type: subtr_actor::ReplayGameTypeDetails::default(),
            season: None,
            all_headers: vec![],
        },
        events,
        frames: vec![],
        positioning_summary: vec![],
        accumulation_tracks: vec![],
    }
}

fn timeline_events_from(events: Vec<subtr_actor::Event>) -> subtr_actor::ReplayStatsTimelineEvents {
    subtr_actor::ReplayStatsTimelineEvents { events }
}

fn envelope_event(
    stream: &str,
    timing: subtr_actor::EventTiming,
    payload: subtr_actor::EventPayload,
) -> subtr_actor::Event {
    subtr_actor::Event {
        meta: subtr_actor::EventMeta {
            id: format!("{stream}:0"),
            stream: stream.to_owned(),
            label: stream.to_owned(),
            timing,
            primary_player: None,
            secondary_player: None,
            player_position: None,
            ball_position: None,
            team_is_team_0: None,
            confidence: None,
            properties: vec![],
        },
        payload,
    }
}

fn moment_event(
    stream: &str,
    frame: usize,
    time: f32,
    payload: subtr_actor::EventPayload,
) -> subtr_actor::Event {
    envelope_event(
        stream,
        subtr_actor::EventTiming::Moment { frame, time },
        payload,
    )
}

fn rotation_player_event(
    time: f32,
    frame: usize,
    player: RemoteId,
    is_team_0: bool,
    current_role_state: subtr_actor::RoleState,
) -> subtr_actor::RotationPlayerEvent {
    rotation_player_event_with_depth(
        time,
        frame,
        player,
        is_team_0,
        current_role_state,
        subtr_actor::PlayDepthState::BehindPlay,
    )
}

fn rotation_player_event_with_depth(
    time: f32,
    frame: usize,
    player: RemoteId,
    is_team_0: bool,
    current_role_state: subtr_actor::RoleState,
    current_depth_state: subtr_actor::PlayDepthState,
) -> subtr_actor::RotationPlayerEvent {
    subtr_actor::RotationPlayerEvent {
        time,
        frame,
        end_time: time,
        end_frame: frame,
        duration: 0.0,
        player,
        player_position: None,
        is_team_0,
        active: true,
        current_role_state,
        current_depth_state,
    }
}

fn touch_stats_event(
    time: f32,
    frame: usize,
    player: RemoteId,
    is_team_0: bool,
) -> subtr_actor::TouchClassificationEvent {
    subtr_actor::TouchClassificationEvent {
        time,
        frame,
        sample_time: time,
        sample_frame: frame,
        player,
        player_position: None,
        is_team_0,
        kind: "hit".to_owned(),
        height_band: "ground".to_owned(),
        surface: "floor".to_owned(),
        dodge_state: "none".to_owned(),
        ball_speed_change: 250.0,
        ball_movement: None,
        intention: "unclear".to_owned(),
        first_touch: false,
        contested: false,
        role: subtr_actor::RoleState::default(),
        play_depth: subtr_actor::PlayDepthState::default(),
        touch_id: None,
    }
}

fn version_fixture() -> CurrentProcessingVersion {
    CurrentProcessingVersion {
        event_stream_schema_version: "rocket-sense-event-stream:v5",
        extractor_name: "rocket-sense:event-stream",
        extractor_version: "0.1.0",
        subtr_actor_version: "0.12.0",
        subtr_actor_git_sha: Some("aaaaaaa"),
        rocket_sense_git_sha: Some("bbbbbbb"),
    }
}

#[test]
fn staleness_is_current_when_everything_matches() {
    let current = version_fixture();
    let info = compute_staleness(
        &current,
        Some("rocket-sense-event-stream:v5"),
        Some("0.12.0"),
        Some("aaaaaaa"),
    );
    assert!(!info.is_stale);
    assert!(!info.schema_outdated);
    assert!(!info.subtr_actor_outdated);
}

#[test]
fn staleness_flags_outdated_schema() {
    let current = version_fixture();
    let info = compute_staleness(
        &current,
        Some("rocket-sense-event-stream:v3"),
        Some("0.12.0"),
        Some("aaaaaaa"),
    );
    assert!(info.is_stale);
    assert!(info.schema_outdated);
    assert!(!info.subtr_actor_outdated);
}

#[test]
fn staleness_flags_subtr_actor_version_drift() {
    let current = version_fixture();
    let info = compute_staleness(
        &current,
        Some("rocket-sense-event-stream:v5"),
        Some("0.11.0"),
        Some("aaaaaaa"),
    );
    assert!(info.is_stale);
    assert!(!info.schema_outdated);
    assert!(info.subtr_actor_outdated);
}

#[test]
fn staleness_flags_subtr_actor_git_drift() {
    let current = version_fixture();
    let info = compute_staleness(
        &current,
        Some("rocket-sense-event-stream:v5"),
        Some("0.12.0"),
        Some("ccccccc"),
    );
    assert!(info.is_stale);
    assert!(info.subtr_actor_outdated);
}

#[test]
fn staleness_ignores_unknown_current_subtr_actor_version() {
    let current = CurrentProcessingVersion {
        subtr_actor_version: "unknown",
        subtr_actor_git_sha: None,
        ..version_fixture()
    };
    // A build that doesn't know its subtr-actor version must not flag every
    // replay as stale just because the stored version differs.
    let info = compute_staleness(
        &current,
        Some("rocket-sense-event-stream:v5"),
        Some("0.12.0"),
        Some("aaaaaaa"),
    );
    assert!(!info.is_stale);
    assert!(!info.subtr_actor_outdated);
}

#[test]
fn staleness_is_not_flagged_for_unparsed_replay() {
    let current = version_fixture();
    let info = compute_staleness(&current, None, None, None);
    assert!(!info.is_stale);
    assert!(!info.schema_outdated);
    assert!(!info.subtr_actor_outdated);
}
