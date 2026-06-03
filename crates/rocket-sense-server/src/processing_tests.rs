use super::*;

#[test]
fn replay_search_metadata_extracts_headers_and_players() {
    let replay_meta = ReplayMeta {
        team_zero: vec![PlayerInfo {
            remote_id: RemoteId::Steam(76561198000000001),
            stats: None,
            name: "Blue Player".to_owned(),
        }],
        team_one: vec![PlayerInfo {
            remote_id: RemoteId::Epic("orange-epic-id".to_owned()),
            stats: None,
            name: "Orange Player".to_owned(),
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
fn indexed_goal_tag_event_uses_scorer_and_goal_tag_dimensions() {
    let event = subtr_actor::GoalTagEvent {
        goal_index: 2,
        time: 123.5,
        frame: 7410,
        kind: subtr_actor::GoalTagKind::DoubleTapGoal,
        scoring_team_is_team_0: false,
        scorer: Some(RemoteId::Steam(76561198000000001)),
        scorer_position: None,
        confidence: 0.85,
        modifiers: vec![subtr_actor::GoalTagModifier::ByScorer],
        evidence: vec![subtr_actor::GoalTagEvidence {
            kind: subtr_actor::GoalTagEvidenceKind::DoubleTap,
            time: 121.0,
            frame: 7260,
            player: Some(RemoteId::Steam(76561198000000001)),
            player_position: None,
        }],
    };

    let indexed = indexed_goal_tag_event(3, &event).expect("goal tag should index");

    assert_eq!(indexed.event_type_key, "goal_tag.double_tap_goal");
    assert_eq!(indexed.display_name, "Double Tap Goal");
    assert_eq!(indexed.category, "goal_tag");
    assert_eq!(indexed.source_event_id, "goal_tag:2:double_tap_goal:3");
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
    assert_eq!(indexed.attributes["goal_index"], 2);
    assert_eq!(indexed.attributes["team"], 1);
    assert_eq!(indexed.attributes["kind"], "double_tap_goal");
    assert_eq!(indexed.attributes["modifiers"][0], "by_scorer");
    assert_eq!(indexed.attributes["evidence_kinds"][0], "double_tap");
}

#[test]
fn build_indexed_events_uses_stats_timeline_touches_not_replay_data_touches() {
    let replay_data = serde_json::json!({
        "touch_events": [
            {
                "time": 1.0,
                "frame": 60,
                "team_is_team_0": true,
                "player": { "Steam": 76561198000000001_u64 }
            }
        ]
    });
    let touch_events = vec![
        touch_stats_event(2.0, 120, RemoteId::Steam(76561198000000002), true),
        touch_stats_event(3.0, 180, RemoteId::Epic("epic-player".to_owned()), false),
    ];

    let indexed = build_indexed_events(&replay_data, &touch_events, &[], &[])
        .expect("touch events should index");
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

fn touch_stats_event(
    time: f32,
    frame: usize,
    player: RemoteId,
    is_team_0: bool,
) -> subtr_actor::TouchStatsEvent {
    subtr_actor::TouchStatsEvent {
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
