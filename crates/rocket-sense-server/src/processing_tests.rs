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
        .find(|event| event.event_type_key == "goal_tag.double_tap_goal")
        .expect("goal tag row should be synthesized");

    assert_eq!(indexed.event_type_key, "goal_tag.double_tap_goal");
    assert_eq!(indexed.display_name, "Double Tap Goal");
    assert_eq!(indexed.category, "goal_tag");
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
        .filter(|event| event.event_type_key == "ball.touch")
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
    let rotation_rows = indexed
        .iter()
        .filter(|event| event.event_type_key == "rotation.first_man_stint")
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
fn event_scalar_fields_index_payload_and_normalized_attributes() {
    let payload = serde_json::json!({
        "kind": { "FirstMan": {} },
        "player": { "Steam": 76561198000000001_u64 },
        "time_first_man": 1.5,
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
        current_depth_state: subtr_actor::PlayDepthState::BehindPlay,
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
