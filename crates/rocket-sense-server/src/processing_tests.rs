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
    };

    let metadata = replay_search_metadata_from_meta(&replay_meta);

    assert_eq!(metadata.playlist.as_deref(), Some("online-2v2"));
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
    assert_eq!(normalize_playlist("11".to_owned()), "ranked-doubles");
    assert_eq!(
        normalize_playlist("Ranked Snow Day".to_owned()),
        "ranked-snowday"
    );
    assert_eq!(
        normalize_playlist("Unrecognized Playlist".to_owned()),
        "Unrecognized Playlist"
    );
}

#[test]
fn indexed_goal_context_tags_use_scorer_and_goal_tag_dimensions() {
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
        goal_buildup: subtr_actor::GoalBuildupKind::Other,
        scorer_last_touch: None,
        players: vec![],
        tags: vec![subtr_actor::GoalTag::DoubleTapGoal(
            subtr_actor::GoalTagMetadata {
                confidence: 0.85,
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
    let timeline = stats_timeline_with_events(subtr_actor::ReplayStatsTimelineEvents {
        goal_context: vec![event],
        ..Default::default()
    });

    let indexed = build_indexed_events(&timeline).expect("goal tag should index");
    let indexed = indexed
        .iter()
        .find(|event| event.event_type_key == "goal_tag_double_tap_goal")
        .expect("goal tag row should be synthesized");

    assert_eq!(indexed.event_type_key, "goal_tag_double_tap_goal");
    assert_eq!(indexed.display_name, "Double Tap Goal");
    assert_eq!(indexed.category, "event");
    assert_eq!(indexed.source_event_id, "goal_tag:0:double_tap_goal:0");
    assert_eq!(indexed.event_frame, Some(7410));
    assert_eq!(indexed.event_time, Some(123.5));
    assert_eq!(indexed.confidence, Some(0.8500000238418579));
    assert_eq!(
        indexed.primary_subject.as_ref().map(|subject| (
            subject.kind.as_str(),
            subject.id.as_str(),
            subject.role.as_str()
        )),
        Some(("player", "steam:76561198000000001", "scorer"))
    );
    assert!(indexed.subjects.iter().any(|subject| {
        subject.kind == "team" && subject.id == "1" && subject.role == "scoring_team"
    }));
    assert_eq!(indexed.attributes["goal_index"], 0);
    assert_eq!(indexed.attributes["team"], 1);
    assert_eq!(indexed.attributes["kind"], "double_tap_goal");
    assert_eq!(indexed.attributes["modifiers"][0], "by_scorer");
    assert_eq!(indexed.attributes["evidence_kinds"][0], "double_tap");
}

#[test]
fn build_indexed_events_uses_serialized_stats_timeline_touches() {
    let touch_events = vec![
        touch_stats_event(2.0, 120, RemoteId::Steam(76561198000000002), true),
        touch_stats_event(3.0, 180, RemoteId::Epic("epic-player".to_owned()), false),
    ];
    let timeline = stats_timeline_with_events(subtr_actor::ReplayStatsTimelineEvents {
        touch: touch_events,
        ..Default::default()
    });

    let indexed = build_indexed_events(&timeline).expect("touch events should index");
    let touch_rows = indexed
        .iter()
        .filter(|event| event.event_type_key == "touch")
        .collect::<Vec<_>>();

    assert_eq!(touch_rows.len(), 2);
    assert!(touch_rows
        .iter()
        .all(|event| event.source == STATS_TIMELINE_SOURCE));
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
    assert_eq!(rush.category, "event");
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
fn indexed_timeline_events_give_boost_pickups_specific_review_types() {
    let boost_pickup = indexed_timeline_payload_event(
        "boost_pickups",
        0,
        &serde_json::json!({
            "comparison": "both",
            "time": 40.0,
            "frame": 2400,
            "player_id": { "Steam": 76561198000000001_u64 },
            "is_team_0": true,
            "pad_type": "big",
            "field_half": "opponent",
            "activity": "active",
            "boost_before": 12.0,
            "boost_after": 100.0
        }),
    )
    .expect("boost pickup event should index");

    assert_eq!(boost_pickup.event_type_key, "boost_pickup_both");
    assert_eq!(boost_pickup.display_name, "Boost Pickup Both");
    assert_eq!(boost_pickup.category, "event");
    assert_eq!(
        boost_pickup.primary_subject.as_ref().map(|subject| (
            subject.kind.as_str(),
            subject.id.as_str(),
            subject.role.as_str()
        )),
        Some(("player", "steam:76561198000000001", "actor"))
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
    assert_eq!(whiff.category, "event");
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
fn build_indexed_events_emits_rotation_first_man_stint_durations() {
    let player = RemoteId::Steam(76561198000000001);
    let mut first_man_span = rotation_player_event(
        0.0,
        0,
        player.clone(),
        true,
        subtr_actor::RoleState::FirstMan,
    );
    first_man_span.end_time = 1.0;
    first_man_span.end_frame = 2;
    first_man_span.duration = 1.5;
    let timeline = stats_timeline_with_events(subtr_actor::ReplayStatsTimelineEvents {
        rotation_player: vec![
            first_man_span,
            rotation_player_event(
                1.5,
                3,
                player.clone(),
                true,
                subtr_actor::RoleState::SecondMan,
            ),
        ],
        ..Default::default()
    });

    let indexed = build_indexed_events(&timeline).expect("rotation should index");
    let raw_rotation_rows = indexed
        .iter()
        .filter(|event| event.source_stream == "rotation_player")
        .collect::<Vec<_>>();
    assert_eq!(raw_rotation_rows.len(), 2);
    assert!(raw_rotation_rows
        .iter()
        .all(|event| event.event_type_key == "rotation_player_state_span"));

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

#[test]
fn build_indexed_events_derives_role_level_rotation_events() {
    let player = RemoteId::Steam(76561198000000001);
    let mut first_man_behind = rotation_player_event_with_depth(
        0.0,
        0,
        player.clone(),
        true,
        subtr_actor::RoleState::FirstMan,
        subtr_actor::PlayDepthState::BehindPlay,
    );
    first_man_behind.end_time = 0.5;
    first_man_behind.end_frame = 5;
    first_man_behind.duration = 0.5;
    let mut first_man_ahead = rotation_player_event_with_depth(
        0.5,
        5,
        player.clone(),
        true,
        subtr_actor::RoleState::FirstMan,
        subtr_actor::PlayDepthState::AheadOfPlay,
    );
    first_man_ahead.end_time = 1.25;
    first_man_ahead.end_frame = 12;
    first_man_ahead.duration = 0.75;
    let timeline = stats_timeline_with_events(subtr_actor::ReplayStatsTimelineEvents {
        rotation_player: vec![first_man_behind, first_man_ahead],
        ..Default::default()
    });

    let indexed = build_indexed_events(&timeline).expect("rotation should index");
    let first_man_stints = indexed
        .iter()
        .filter(|event| event.event_type_key == "rotation_first_man_stint")
        .collect::<Vec<_>>();
    let first_man_role_spans = indexed
        .iter()
        .filter(|event| event.event_type_key == "rotation_role_first_man")
        .collect::<Vec<_>>();
    let depth_spans = indexed
        .iter()
        .filter(|event| event.source_stream == "rotation_depth_span")
        .collect::<Vec<_>>();

    assert_eq!(first_man_stints.len(), 1);
    assert_eq!(first_man_stints[0].start_time, Some(0.0));
    assert_eq!(first_man_stints[0].end_time, Some(1.25));
    assert_eq!(first_man_stints[0].duration_seconds, Some(1.25));
    assert_eq!(first_man_role_spans.len(), 1);
    assert_eq!(first_man_role_spans[0].duration_seconds, Some(1.25));
    assert_eq!(depth_spans.len(), 2);
}

#[test]
fn event_scalar_fields_index_payload_and_normalized_attributes() {
    let payload = serde_json::json!({
        "kind": { "FirstMan": {} },
        "player": { "Steam": 76561198000000001_u64 },
        "time_first_man": 1.5,
        "duration": 1.5,
        "active": true,
        "evidence": [
            { "kind": { "DoubleTap": {} }, "confidence": 0.75 }
        ]
    });
    let indexed = indexed_timeline_payload_event("rotation_player", 0, &payload)
        .expect("rotation payload should index");

    let scalar_fields = event_scalar_fields(&indexed);

    assert!(scalar_fields.iter().any(|field| {
        field.source == "payload"
            && field.path == "kind"
            && field.value_kind == "string"
            && field.string_value.as_deref() == Some("first_man")
    }));
    assert!(scalar_fields.iter().any(|field| {
        field.source == "payload"
            && field.path == "time_first_man"
            && field.value_kind == "number"
            && field.numeric_value == Some(1.5)
    }));
    assert!(scalar_fields.iter().any(|field| {
        field.source == "payload"
            && field.path == "evidence[0].kind"
            && field.value_kind == "string"
            && field.string_value.as_deref() == Some("double_tap")
    }));
    assert!(scalar_fields.iter().any(|field| {
        field.source == "attribute"
            && field.path == "duration_seconds"
            && field.value_kind == "number"
            && field.numeric_value == Some(1.5)
    }));
}

fn stats_timeline_with_events(
    events: subtr_actor::ReplayStatsTimelineEvents,
) -> subtr_actor::ReplayStatsTimelineScaffold {
    subtr_actor::ReplayStatsTimelineScaffold {
        config: subtr_actor::default_stats_timeline_config(),
        replay_meta: ReplayMeta {
            team_zero: vec![],
            team_one: vec![],
            all_headers: vec![],
        },
        events,
        frames: vec![],
    }
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
    }
}
