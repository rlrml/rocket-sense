use super::*;

#[test]
fn player_replay_event_counts_role_map_demolition_subjects() {
    assert!(INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL.contains("death_event_type.key = 'death'"));
    assert!(INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL
        .contains("source_event_type.key = 'demolition' AND subject.role = 'victim'"));
    assert!(INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL
        .contains("subject.role NOT IN ('attacker', 'victim')"));
}

#[test]
fn materialized_dense_streams_are_excluded_from_event_counts() {
    // Dense rows are deleted only after `INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL`
    // has run, but the count query must also EXCLUDE them so a dropped stream can
    // never change a count regardless of ordering. Guard that the drop set is a
    // subset of the event-count exclusion list.
    for stream in MATERIALIZED_DENSE_SOURCE_STREAMS {
        assert!(
            INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL.contains(&format!("'{stream}'")),
            "{stream} is dropped post-materialization but is not excluded from \
             INSERT_PLAYER_REPLAY_EVENT_COUNTS_SQL; deleting it would change counts"
        );
    }
}

#[test]
fn materialized_dense_stream_set_retains_live_read_streams() {
    // Streams still read at request time or counted must never be dropped.
    for kept in [
        "boost_pickup",
        "possession",
        "player_possession",
        "touch",
        "ball_half",
    ] {
        assert!(
            !MATERIALIZED_DENSE_SOURCE_STREAMS.contains(&kept),
            "{kept} is read live / counted and must not be dropped post-materialization"
        );
    }
}

#[test]
fn ball_opponent_half_facts_are_clipped_to_player_activity_spans() {
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL.contains("source_stream = 'player_activity'"));
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL.contains("JOIN play_event_subjects subject"));
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL.contains("activity.replay_player_id = rp.id"));
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL.contains("LEAST(ball.end_time, activity.end_time)"));
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL
        .contains("GREATEST(ball.start_time, activity.start_time)"));
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL.contains("ball.end_time > activity.start_time"));
    assert!(INSERT_BALL_OPPONENT_HALF_FACTS_SQL.contains("ball.start_time < activity.end_time"));
}

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
            camera_settings: None,
        }],
        team_one: vec![PlayerInfo {
            remote_id: RemoteId::Epic("orange-epic-id".to_owned()),
            stats: None,
            name: "Orange Player".to_owned(),
            car_body_id: None,
            car_body_name: None,
            car_hitbox_family: None,
            camera_settings: None,
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
fn replay_search_player_extracts_scoreboard_stats_from_header() {
    let player = PlayerInfo {
        remote_id: RemoteId::Steam(76561198000000001),
        stats: Some(
            [
                ("Score".to_owned(), HeaderProp::Int(512)),
                ("Goals".to_owned(), HeaderProp::Int(2)),
                ("Assists".to_owned(), HeaderProp::Int(1)),
                ("Saves".to_owned(), HeaderProp::Int(3)),
                ("Shots".to_owned(), HeaderProp::Int(5)),
            ]
            .into_iter()
            .collect(),
        ),
        name: "Blue Player".to_owned(),
        car_body_id: None,
        car_body_name: None,
        car_hitbox_family: None,
        camera_settings: None,
    };

    let search_player = replay_search_player(&player, 0);

    assert_eq!(search_player.score, Some(512));
    assert_eq!(search_player.goals, Some(2));
    assert_eq!(search_player.assists, Some(1));
    assert_eq!(search_player.saves, Some(3));
    assert_eq!(search_player.shots, Some(5));

    let no_stats = PlayerInfo {
        remote_id: RemoteId::Steam(76561198000000002),
        stats: None,
        name: "No Stats".to_owned(),
        car_body_id: None,
        car_body_name: None,
        car_hitbox_family: None,
        camera_settings: None,
    };
    let search_player = replay_search_player(&no_stats, 1);
    assert_eq!(search_player.score, None);
    assert_eq!(search_player.goals, None);
}

#[test]
fn replay_search_metadata_backfills_missing_scoreboard_stats_from_core_events() {
    let steam_player = RemoteId::Steam(76561198000000001);
    let epic_player = RemoteId::Epic("orange-epic-id".to_owned());
    let timeline = subtr_actor::ReplayStatsTimelineScaffold {
        config: subtr_actor::default_stats_timeline_config(),
        replay_meta: ReplayMeta {
            team_zero: vec![PlayerInfo {
                remote_id: steam_player.clone(),
                stats: None,
                name: "Blue Player".to_owned(),
                car_body_id: None,
                car_body_name: None,
                camera_settings: None,
                car_hitbox_family: None,
            }],
            team_one: vec![PlayerInfo {
                remote_id: epic_player.clone(),
                stats: Some(
                    [
                        ("Score".to_owned(), HeaderProp::Int(999)),
                        ("Goals".to_owned(), HeaderProp::Int(3)),
                        ("Assists".to_owned(), HeaderProp::Int(2)),
                        ("Saves".to_owned(), HeaderProp::Int(1)),
                        ("Shots".to_owned(), HeaderProp::Int(7)),
                    ]
                    .into_iter()
                    .collect(),
                ),
                name: "Orange Player".to_owned(),
                car_body_id: None,
                car_body_name: None,
                camera_settings: None,
                car_hitbox_family: None,
            }],
            all_headers: vec![],
            game_type: subtr_actor::ReplayGameTypeDetails::default(),
            season: None,
        },
        events: timeline_events_from(vec![
            moment_event(
                "core_player",
                60,
                1.0,
                subtr_actor::EventPayload::CorePlayer(subtr_actor::CorePlayerScoreboardEvent {
                    time: 1.0,
                    frame: 60,
                    player: steam_player.clone(),
                    player_position: None,
                    is_team_0: true,
                    score_delta: 100,
                    goals_delta: 1,
                    assists_delta: 0,
                    saves_delta: 0,
                    shots_delta: 1,
                }),
            ),
            moment_event(
                "core_player",
                120,
                2.0,
                subtr_actor::EventPayload::CorePlayer(subtr_actor::CorePlayerScoreboardEvent {
                    time: 2.0,
                    frame: 120,
                    player: steam_player.clone(),
                    player_position: None,
                    is_team_0: true,
                    score_delta: 50,
                    goals_delta: 0,
                    assists_delta: 1,
                    saves_delta: 2,
                    shots_delta: 1,
                }),
            ),
            moment_event(
                "core_player",
                180,
                3.0,
                subtr_actor::EventPayload::CorePlayer(subtr_actor::CorePlayerScoreboardEvent {
                    time: 3.0,
                    frame: 180,
                    player: epic_player,
                    player_position: None,
                    is_team_0: false,
                    score_delta: 10,
                    goals_delta: 1,
                    assists_delta: 0,
                    saves_delta: 0,
                    shots_delta: 1,
                }),
            ),
        ]),
        frames: vec![],
        positioning_summary: vec![],
        accumulation_tracks: vec![],
    };

    let typed = replay_search_metadata(&timeline);
    let scaffold_json = serde_json::to_value(&timeline).expect("serialize scaffold");
    let from_json = replay_search_metadata_from_scaffold_json(&scaffold_json);
    assert_eq!(typed, from_json);

    let blue = &typed.players[0];
    assert_eq!(blue.score, Some(150));
    assert_eq!(blue.goals, Some(1));
    assert_eq!(blue.assists, Some(1));
    assert_eq!(blue.saves, Some(2));
    assert_eq!(blue.shots, Some(2));

    let orange = &typed.players[1];
    assert_eq!(orange.score, Some(999));
    assert_eq!(orange.goals, Some(3));
    assert_eq!(orange.assists, Some(2));
    assert_eq!(orange.saves, Some(1));
    assert_eq!(orange.shots, Some(7));
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
        camera_settings: None,
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
        camera_settings: None,
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
fn client_scaffold_json_matches_typed_analysis_outputs() {
    let steam_player = RemoteId::Steam(76561198000000001);
    let ps4_player = RemoteId::PlayStation(boxcars::Ps4Id {
        online_id: 6788998483854448235,
        name: "KvonUnknown".to_owned(),
        unknown1: vec![98, 50, 117],
    });
    let timeline = stats_timeline_fixture_for_client_json(steam_player.clone(), ps4_player.clone());
    let scaffold_json = serde_json::to_value(&timeline).expect("typed scaffold should serialize");

    let output = replay_analysis_output_from_scaffold_json(
        &scaffold_json,
        serde_json::json!({ "source": "client_wasm" }),
    )
    .expect("client scaffold should convert");

    assert_eq!(output.metadata, replay_search_metadata(&timeline));
    assert_eq!(
        output.boost_tracks,
        collect_boost_accumulation_tracks(&timeline)
    );
    assert_eq!(
        indexed_event_fingerprints(&output.indexed_events),
        indexed_event_fingerprints(&build_indexed_events(&timeline).expect("typed events index"))
    );
    assert_eq!(
        output.event_stream["timeline_events"],
        serde_json::to_value(&timeline.events).expect("events should serialize")
    );
    assert_eq!(
        output.event_stream["replay_meta"],
        scaffold_json["replay_meta"]
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
                details: vec![],
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
    assert!(touch_rows.iter().all(|event| event.category == "basic"));
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
    assert_eq!(rush.category, "other");
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
            "pad_zone": "offensive",
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
    assert_eq!(boost_pickup.category, "other");
    assert_eq!(
        boost_pickup
            .attributes
            .get("detection")
            .and_then(|value| value.as_str()),
        Some("both")
    );
    assert_eq!(
        boost_pickup
            .attributes
            .get("pad_zone")
            .and_then(|value| value.as_str()),
        Some("offensive")
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
    assert_eq!(controlled_play.category, "other");
    assert_eq!(
        controlled_play
            .primary_subject
            .as_ref()
            .map(|subject| (subject.id.as_str(), subject.role.as_str())),
        Some(("steam:76561198000000001", "actor"))
    );

    assert_eq!(backboard.event_type_key, "backboard_bounce");
    assert_eq!(backboard.display_name, "Backboard Hit");
    assert_eq!(backboard.category, "basic");

    assert_eq!(flip_impulse.event_type_key, "flip_impulse");
    assert_eq!(flip_impulse.display_name, "Flip Impulse");
    assert_eq!(flip_impulse.category, "event");
    assert_eq!(flip_impulse.end_time, Some(20.18));

    let touch = indexed_timeline_payload_event(
        "touch",
        0,
        &serde_json::json!({
            "time": 21.0,
            "frame": 1260,
            "player": { "Steam": 76561198000000001_u64 },
            "team_is_team_0": true
        }),
    )
    .expect("touch event should index");

    assert_eq!(touch.event_type_key, "touch");
    assert_eq!(touch.display_name, "Touch");
    assert_eq!(touch.category, "basic");
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
    assert_eq!(kickoff.category, "core");
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
                "boost_used": 21.0,
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
                "boost_used": 15.0,
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
    assert_eq!(blue_taker.boost_used, Some(21.0));
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
fn build_indexed_events_indexes_rotation_role_spans_with_state_attribute() {
    let player = RemoteId::Steam(76561198000000001);
    let timeline = stats_timeline_with_events(timeline_events_from(vec![envelope_event(
        "rotation_role",
        subtr_actor::EventTiming::Span {
            start_frame: 0,
            end_frame: 60,
            start_time: 0.0,
            end_time: 1.0,
        },
        subtr_actor::EventPayload::RotationRole(subtr_actor::RotationRoleEvent {
            time: 0.0,
            frame: 0,
            end_time: 1.0,
            end_frame: 60,
            duration: 1.0,
            player,
            player_position: None,
            is_team_0: true,
            state: subtr_actor::RoleState::FirstMan,
        }),
    )]));

    let indexed = build_indexed_events(&timeline).expect("rotation should index");
    let role_spans = indexed
        .iter()
        .filter(|event| event.source_stream == "rotation_role")
        .collect::<Vec<_>>();

    assert_eq!(role_spans.len(), 1);
    assert_eq!(role_spans[0].event_type_key, "rotation_role");
    assert_eq!(role_spans[0].category, "positioning");
    assert_eq!(role_spans[0].attributes["state"], "first_man");
}

#[test]
fn build_indexed_events_indexes_ball_depth_span_durations() {
    let player = RemoteId::Steam(76561198000000001);
    let timeline = stats_timeline_with_events(timeline_events_from(vec![envelope_event(
        "ball_depth",
        subtr_actor::EventTiming::Span {
            start_frame: 0,
            end_frame: 2,
            start_time: 0.0,
            end_time: 1.0,
        },
        subtr_actor::EventPayload::BallDepth(subtr_actor::BallDepthEvent {
            time: 0.0,
            frame: 0,
            end_time: 1.0,
            end_frame: 2,
            duration: 1.5,
            player,
            player_position: None,
            is_team_0: true,
            state: subtr_actor::BallDepthState::BehindBall,
        }),
    )]));

    let indexed = build_indexed_events(&timeline).expect("ball depth should index");
    let depth_rows = indexed
        .iter()
        .filter(|event| event.event_type_key == "ball_depth")
        .collect::<Vec<_>>();

    assert_eq!(depth_rows.len(), 1);
    let row = depth_rows[0];
    assert_eq!(row.source_stream, "ball_depth");
    assert_eq!(row.category, "positioning");
    assert_eq!(row.attributes["state"], "behind_ball");
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
fn build_indexed_events_indexes_positioning_distance_summaries() {
    let player = RemoteId::Steam(76561198000000001);
    let mut timeline = stats_timeline_with_events(timeline_events_from(vec![envelope_event(
        "field_third",
        subtr_actor::EventTiming::Span {
            start_frame: 0,
            end_frame: 120,
            start_time: 0.0,
            end_time: 2.0,
        },
        subtr_actor::EventPayload::FieldThird(subtr_actor::FieldThirdEvent {
            time: 0.0,
            frame: 0,
            end_time: 2.0,
            end_frame: 120,
            duration: 2.0,
            player: player.clone(),
            player_position: None,
            is_team_0: true,
            state: subtr_actor::FieldThirdState::Neutral,
        }),
    )]));
    timeline.positioning_summary = vec![subtr_actor::ReplayStatsPositioningSummary {
        player_id: player,
        is_team_0: true,
        distance: subtr_actor::PositioningSignalSnapshot {
            sum_distance_to_teammates: 6_000.0,
            sum_distance_to_ball: 4_000.0,
            sum_distance_to_ball_has_possession: 1_000.0,
            time_has_possession: 0.5,
            sum_distance_to_ball_no_possession: 3_000.0,
            time_no_possession: 1.5,
        },
    }];

    let indexed = build_indexed_events(&timeline).expect("positioning distance should index");
    let distance_rows = indexed
        .iter()
        .filter(|event| event.source_stream == "positioning_distance")
        .collect::<Vec<_>>();

    assert_eq!(distance_rows.len(), 1);
    let row = distance_rows[0];
    assert_eq!(row.event_type_key, "positioning_distance");
    assert_eq!(row.category, "positioning");
    assert_eq!(row.duration_seconds, Some(2.0));
    assert_eq!(row.payload["duration"], 2.0);
    assert_eq!(row.payload["distance_to_ball"], 2_000.0);
    assert_eq!(row.payload["distance_to_teammates"], 3_000.0);
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

fn stats_timeline_fixture_for_client_json(
    steam_player: RemoteId,
    ps4_player: RemoteId,
) -> subtr_actor::ReplayStatsTimelineScaffold {
    let scoreboard_stats = Some(
        [
            ("Score".to_owned(), HeaderProp::Int(512)),
            ("Goals".to_owned(), HeaderProp::QWord(2)),
            ("Assists".to_owned(), HeaderProp::Float(1.0)),
            ("Saves".to_owned(), HeaderProp::Int(3)),
            ("Shots".to_owned(), HeaderProp::Int(5)),
        ]
        .into_iter()
        .collect(),
    );
    let events = vec![
        moment_event(
            "core_player",
            60,
            1.0,
            subtr_actor::EventPayload::CorePlayer(subtr_actor::CorePlayerScoreboardEvent {
                time: 1.0,
                frame: 60,
                player: steam_player.clone(),
                player_position: None,
                is_team_0: true,
                score_delta: 100,
                goals_delta: 1,
                assists_delta: 0,
                saves_delta: 0,
                shots_delta: 1,
            }),
        ),
        envelope_event(
            "player_activity",
            subtr_actor::EventTiming::Span {
                start_frame: 60,
                end_frame: 180,
                start_time: 1.0,
                end_time: 3.0,
            },
            subtr_actor::EventPayload::PlayerActivity(subtr_actor::PlayerActivityEvent {
                time: 1.0,
                frame: 60,
                end_time: 3.0,
                end_frame: 180,
                duration: 2.0,
                player: steam_player.clone(),
                player_position: None,
                is_team_0: true,
                state: subtr_actor::ActivityState::Demolished,
            }),
        ),
        envelope_event(
            "depth_role",
            subtr_actor::EventTiming::Span {
                start_frame: 180,
                end_frame: 300,
                start_time: 3.0,
                end_time: 5.0,
            },
            subtr_actor::EventPayload::DepthRole(subtr_actor::DepthRoleEvent {
                time: 3.0,
                frame: 180,
                end_time: 5.0,
                end_frame: 300,
                duration: 2.0,
                player: ps4_player.clone(),
                player_position: None,
                is_team_0: false,
                state: subtr_actor::DepthRoleState::MostBack,
            }),
        ),
        moment_event(
            "touch",
            240,
            4.0,
            subtr_actor::EventPayload::Touch(touch_stats_event(
                4.0,
                240,
                ps4_player.clone(),
                false,
            )),
        ),
    ];

    subtr_actor::ReplayStatsTimelineScaffold {
        config: subtr_actor::default_stats_timeline_config(),
        replay_meta: ReplayMeta {
            team_zero: vec![PlayerInfo {
                remote_id: steam_player.clone(),
                stats: scoreboard_stats,
                name: "Blue Player".to_owned(),
                car_body_id: None,
                car_body_name: None,
                car_hitbox_family: None,
                camera_settings: None,
            }],
            team_one: vec![PlayerInfo {
                remote_id: ps4_player.clone(),
                stats: None,
                name: "Orange Player".to_owned(),
                car_body_id: None,
                car_body_name: None,
                car_hitbox_family: None,
                camera_settings: None,
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
                (
                    "Id".to_owned(),
                    HeaderProp::Str("fixture-match-guid".to_owned()),
                ),
            ],
            game_type: subtr_actor::ReplayGameTypeDetails::from_signals(
                Some("Online".to_owned()),
                Some(11),
                Some("TAGame.MatchType_PublicRanked_TA".to_owned()),
            ),
            season: None,
        },
        events: timeline_events_from(events),
        frames: vec![subtr_actor::ReplayStatsFrameScaffold {
            frame_number: 300,
            time: 5.0,
            dt: 1.0 / 60.0,
            seconds_remaining: Some(-2),
            game_state: None,
            ball_has_been_hit: Some(true),
            kickoff_countdown_time: None,
            gameplay_phase: subtr_actor::GameplayPhase::ActivePlay,
            is_live_play: true,
            team_zero: BTreeMap::new(),
            team_one: BTreeMap::new(),
            players: vec![subtr_actor::ReplayStatsPlayerIdentity {
                player_id: ps4_player.clone(),
                name: "Orange Player".to_owned(),
                is_team_0: false,
            }],
        }],
        positioning_summary: vec![],
        accumulation_tracks: vec![subtr_actor::AccumulationTrack {
            player_id: ps4_player,
            is_team_0: false,
            quantity: subtr_actor::AccumulationQuantity::BoostAmount,
            points: vec![subtr_actor::AccumulationPoint {
                frame: 300,
                value: 42.0,
            }],
        }],
    }
}

fn indexed_event_fingerprints(events: &[IndexedEvent]) -> Vec<Value> {
    events
        .iter()
        .map(|event| {
            serde_json::json!({
                "event_type_key": event.event_type_key,
                "display_name": event.display_name,
                "category": event.category,
                "source": event.source,
                "source_stream": event.source_stream,
                "source_index": event.source_index,
                "source_event_id": event.source_event_id,
                "primary_subject": event.primary_subject.as_ref().map(event_subject_fingerprint),
                "subjects": event.subjects.iter().map(event_subject_fingerprint).collect::<Vec<_>>(),
                "team": event.team,
                "start_frame": event.start_frame,
                "end_frame": event.end_frame,
                "event_frame": event.event_frame,
                "start_time": event.start_time,
                "end_time": event.end_time,
                "event_time": event.event_time,
                "duration_seconds": event.duration_seconds,
                "confidence": event.confidence,
                "attributes": event.attributes,
                "payload": event.payload,
            })
        })
        .collect()
}

fn event_subject_fingerprint(subject: &EventSubject) -> Value {
    serde_json::json!({
        "kind": subject.kind,
        "id": subject.id,
        "role": subject.role,
    })
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
            scope: subtr_actor::EventScope::Match,
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
        ball_position: None,
        is_team_0,
        tags: vec![
            touch_tag("kind", "hit"),
            touch_tag("height_band", "ground"),
            touch_tag("surface", "floor"),
            touch_tag("dodge_state", "none"),
            touch_tag("reception", "continuation"),
        ],
        ball_speed_change: 250.0,
        ball_movement: None,
        role: subtr_actor::RoleState::default(),
        play_depth: subtr_actor::PlayDepthState::default(),
        touch_id: None,
    }
}

fn touch_tag(group: &str, value: &str) -> subtr_actor::TouchTag {
    subtr_actor::TouchTag {
        group: group.to_owned(),
        value: value.to_owned(),
    }
}

fn version_fixture() -> CurrentProcessingVersion {
    CurrentProcessingVersion {
        event_stream_schema_version: "rocket-sense-event-stream:v5",
        extractor_name: "rocket-sense:event-stream",
        extractor_version: "0.1.0",
        subtr_actor_version: "0.12.0",
        subtr_actor_git_sha: Some("aaaaaaa"),
        subtr_actor_git_commit_timestamp: Some("2026-01-01T00:00:00Z"),
        rocket_sense_git_sha: Some("bbbbbbb"),
        rocket_sense_git_commit_timestamp: Some("2026-01-01T00:00:00Z"),
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

/// End-to-end equivalence check for the client-side reprocess path: a real
/// replay analyzed by the typed `collect_replay_analysis` must produce the same
/// `ReplayAnalysisOutput` as `replay_analysis_output_from_scaffold_json` fed the
/// serialized scaffold (exactly what the WASM `get_stats_timeline_json` uploads).
/// This is the rigorous guard that the JSON-reading twins (metadata, indexed
/// events, boost tracks) stay faithful to the typed extractors.
#[test]
fn client_scaffold_json_matches_typed_analysis() {
    let replay_path = concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../../vendor/subtr-actor/assets/post-eac-ranked-doubles-2026-04-28.replay"
    );
    let bytes = std::fs::read(replay_path).expect("read sample replay fixture");

    // Typed path (the existing server pipeline).
    let typed = collect_replay_analysis(bytes.clone()).expect("typed analysis");

    // Reproduce the WASM upload: serialize the scaffold to JSON, then run the
    // JSON-reading twins over it.
    let replay = boxcars::ParserBuilder::new(&bytes)
        .must_parse_network_data()
        .on_error_check_crc()
        .parse()
        .expect("parse replay");
    let scaffold = StatsTimelineEventCollector::new()
        .get_replay_stats_timeline_scaffold(&replay)
        .expect("collect scaffold");
    let scaffold_json = serde_json::to_value(&scaffold).expect("serialize scaffold");

    let from_json = replay_analysis_output_from_scaffold_json(
        &scaffold_json,
        serde_json::json!({ "source": "client_wasm_test" }),
    )
    .expect("json analysis");

    assert_eq!(
        typed.metadata, from_json.metadata,
        "search metadata mismatch"
    );
    assert_eq!(
        typed.boost_tracks, from_json.boost_tracks,
        "boost tracks mismatch"
    );
    assert_eq!(
        format!("{:#?}", typed.indexed_events),
        format!("{:#?}", from_json.indexed_events),
        "indexed events mismatch",
    );
    assert_eq!(
        typed.event_stream["timeline_events"], from_json.event_stream["timeline_events"],
        "event stream timeline_events mismatch",
    );
    assert_eq!(
        typed.event_stream["replay_meta"], from_json.event_stream["replay_meta"],
        "event stream replay_meta mismatch",
    );

    // Sanity: the fixture actually exercised the twins.
    assert!(!typed.indexed_events.is_empty(), "expected indexed events");
    assert!(!typed.metadata.players.is_empty(), "expected players");
}

/// End-to-end check that a full reprocess (the exact `process_replay` path the
/// queue worker runs) populates EVERY per-(replay, player) materialized table,
/// including the boost table added on this branch. Guards against a regression
/// where a writer is silently dropped from `persist_analysis_output` or a new
/// subtr-actor output shape stops feeding one of the aggregations.
///
/// Requires a throwaway Postgres: set `RS_REPROCESS_TEST_DATABASE_URL` to a
/// FRESH, EMPTY database (migrations run against it). Skipped otherwise, so CI
/// (no DB) still compiles it. Run with:
///   RS_REPROCESS_TEST_DATABASE_URL=postgres://... cargo test -p rocket-sense-server \
///     reprocess_populates_all_materialized_tables -- --ignored --nocapture
#[tokio::test]
#[ignore = "requires RS_REPROCESS_TEST_DATABASE_URL"]
async fn reprocess_populates_all_materialized_tables() {
    use std::sync::Arc;

    let Ok(database_url) = std::env::var("RS_REPROCESS_TEST_DATABASE_URL") else {
        eprintln!("skipping: RS_REPROCESS_TEST_DATABASE_URL not set");
        return;
    };

    let pool = rocket_sense_db::connect(&database_url)
        .await
        .expect("connect to test db");
    rocket_sense_db::run_migrations(&pool)
        .await
        .expect("run migrations");

    // A normal ranked-standard replay: exercises boost, possession, positioning,
    // rotation stints, and event counts for a full roster.
    let fixture = concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../../vendor/subtr-actor/assets/recent-ranked-standard-2026-03-10-b.replay"
    );
    let bytes = std::fs::read(fixture).expect("read replay fixture");
    let file_sha256 = sha256_hex(&bytes);

    let storage_root = std::env::temp_dir().join(format!("rs-reprocess-check-{}", Uuid::now_v7()));
    std::fs::create_dir_all(&storage_root).expect("create storage root");
    let storage: Arc<dyn rocket_sense_storage::ObjectStorage> = Arc::new(
        rocket_sense_storage::LocalStorage::new(storage_root.clone()),
    );
    let storage_key = format!("replays/{file_sha256}.replay");
    let stored = storage
        .put(&storage_key, bytes::Bytes::from(bytes.clone()), None)
        .await
        .expect("store replay bytes");

    let replay_id = Uuid::now_v7();
    sqlx::query(
        r#"
        INSERT INTO replays (
            id, uploaded_by_user_id, file_sha256, original_file_name,
            byte_size, storage_key, storage_encoding, storage_byte_size
        )
        VALUES ($1, NULL, $2, $3, $4, $5, $6, $7)
        "#,
    )
    .bind(replay_id)
    .bind(&file_sha256)
    .bind("reprocess-check.replay")
    .bind(bytes.len() as i64)
    .bind(&stored.key)
    .bind(stored.storage_encoding.to_string())
    .bind(stored.storage_byte_size as i64)
    .execute(&pool)
    .await
    .expect("insert replays row");

    // The real worker path: analyze + persist (all writers, prune, GC).
    process_replay(
        pool.clone(),
        storage,
        replay_id,
        file_sha256,
        stored.key.clone(),
    )
    .await
    .expect("process_replay succeeds");

    // Every per-(replay, player) materialized table must have rows for this
    // replay's canonical run.
    let tables = [
        "player_replay_stat_facts",
        "player_replay_event_counts",
        "player_replay_first_man_stints",
        "player_replay_positioning",
        "player_replay_possession",
        "player_replay_boost",
        "replay_team_control",
    ];
    let mut summary = Vec::new();
    for table in tables {
        let sql = format!(
            "SELECT count(*) FROM {table} m \
             JOIN replays r ON r.id = m.replay_id \
             AND r.canonical_analysis_run_id = m.analysis_run_id \
             WHERE m.replay_id = $1"
        );
        let count: i64 = sqlx::query_scalar(&sql)
            .bind(replay_id)
            .fetch_one(&pool)
            .await
            .unwrap_or_else(|e| panic!("count {table}: {e}"));
        eprintln!("{table}: {count} rows");
        summary.push((table, count));
    }

    let _ = std::fs::remove_dir_all(&storage_root);

    for (table, count) in summary {
        assert!(count > 0, "{table} had no rows after reprocess");
    }
}

/// Regression guard for the sqlx **decode-type** bug class: a Rust
/// `row.try_get::<T>()` whose `T` doesn't match the SQL column type (e.g. `i64`
/// for an `INT4` column, or `f64` for a `NUMERIC` expression) compiles fine and
/// only 500s at runtime, when a row is actually decoded -- so neither
/// `cargo check` nor the SQL-string unit tests catch it.
///
/// This ingests a real replay (so every read path has rows to decode), seeds a
/// rank-benchmark population + stats row (so the benchmark read path actually
/// decodes `distinct_player_count`), then fires every player stat endpoint at
/// the real router and asserts each returns 200. Would have caught both the
/// `distinct_player_count` (INT4 vs i64) and `mvp_expected` (NUMERIC vs f64)
/// production 500s.
///
/// Same env gating as `reprocess_populates_all_materialized_tables`: set
/// `RS_REPROCESS_TEST_DATABASE_URL` to a FRESH, EMPTY database. Run with:
///   RS_REPROCESS_TEST_DATABASE_URL=postgres://... cargo test -p rocket-sense-server \
///     stats_read_paths_decode_after_reprocess -- --ignored --nocapture
#[tokio::test]
#[ignore = "requires RS_REPROCESS_TEST_DATABASE_URL"]
async fn stats_read_paths_decode_after_reprocess() {
    use axum::body::{to_bytes, Body};
    use axum::http::{Request, StatusCode};
    use std::sync::Arc;
    use tower::ServiceExt;

    let Ok(database_url) = std::env::var("RS_REPROCESS_TEST_DATABASE_URL") else {
        eprintln!("skipping: RS_REPROCESS_TEST_DATABASE_URL not set");
        return;
    };

    let pool = rocket_sense_db::connect(&database_url)
        .await
        .expect("connect to test db");
    rocket_sense_db::run_migrations(&pool)
        .await
        .expect("run migrations");

    // Ingest a real replay so every read path has populated rows to decode.
    let fixture = concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../../vendor/subtr-actor/assets/recent-ranked-standard-2026-03-10-b.replay"
    );
    let bytes = std::fs::read(fixture).expect("read replay fixture");
    // Salt the content hash so this replay row never collides with
    // `reprocess_populates_all_materialized_tables` (same fixture) on the shared
    // CI database -- or with a prior run of this test against a persistent DB.
    // `process_replay` reads the bytes by storage key and doesn't verify the
    // hash, so a synthetic sha is fine.
    let file_sha256 = sha256_hex(&[bytes.as_slice(), Uuid::now_v7().as_bytes()].concat());
    let storage_root = std::env::temp_dir().join(format!("rs-decode-check-{}", Uuid::now_v7()));
    std::fs::create_dir_all(&storage_root).expect("create storage root");
    let storage: Arc<dyn rocket_sense_storage::ObjectStorage> = Arc::new(
        rocket_sense_storage::LocalStorage::new(storage_root.clone()),
    );
    let storage_key = format!("replays/{file_sha256}.replay");
    let stored = storage
        .put(&storage_key, bytes::Bytes::from(bytes.clone()), None)
        .await
        .expect("store replay bytes");
    let replay_id = Uuid::now_v7();
    sqlx::query(
        r#"
        INSERT INTO replays (
            id, uploaded_by_user_id, file_sha256, original_file_name,
            byte_size, storage_key, storage_encoding, storage_byte_size
        )
        VALUES ($1, NULL, $2, $3, $4, $5, $6, $7)
        "#,
    )
    .bind(replay_id)
    .bind(&file_sha256)
    .bind("decode-check.replay")
    .bind(bytes.len() as i64)
    .bind(&stored.key)
    .bind(stored.storage_encoding.to_string())
    .bind(stored.storage_byte_size as i64)
    .execute(&pool)
    .await
    .expect("insert replays row");
    process_replay(
        pool.clone(),
        storage.clone(),
        replay_id,
        file_sha256,
        stored.key.clone(),
    )
    .await
    .expect("process_replay succeeds");

    // A player from the replay, plus the playlist group key (game type + team
    // size) the read path resolves for it -- derived the same way as
    // `push_playlist_group_key_expression`.
    let (platform, platform_player_id): (String, String) = sqlx::query_as(
        "SELECT platform, platform_player_id FROM replay_players \
         WHERE replay_id = $1 AND platform IS NOT NULL AND platform_player_id IS NOT NULL LIMIT 1",
    )
    .bind(replay_id)
    .fetch_one(&pool)
    .await
    .expect("a player with platform identity");
    let (game_type, team_size): (String, i32) = sqlx::query_as(
        "SELECT COALESCE(r.replay_game_type, 'ranked') AS game, \
                (SELECT MAX(c)::int FROM ( \
                    SELECT COUNT(*) c FROM replay_players p \
                    WHERE p.replay_id = r.id AND p.team IS NOT NULL GROUP BY p.team \
                 ) t) AS size \
         FROM replays r WHERE r.id = $1",
    )
    .bind(replay_id)
    .fetch_one(&pool)
    .await
    .expect("derive playlist group key");
    let group_key = format!("{game_type}-{team_size}v{team_size}");
    let window_key = "rolling-6m";

    // Seed one rank-benchmark population (tier) + stats row so the benchmark
    // read path returns a row and actually decodes `distinct_player_count`. A
    // single fixture replay won't clear the refresh job's sample thresholds, so
    // seed directly. The `available_tiers` assertion below proves it ran (guards
    // against a silent group-key mismatch making this a no-op).
    let tier = 15i32;
    sqlx::query(
        "INSERT INTO rank_benchmark_population \
         (window_key, playlist_group_key, rank_grouping, rank_value, outcome, distinct_player_count, replay_count) \
         VALUES ($1, $2, 'tier', $3, 'all', 5, 3)",
    )
    .bind(window_key)
    .bind(&group_key)
    .bind(tier)
    .execute(&pool)
    .await
    .expect("seed rank_benchmark_population");
    sqlx::query(
        "INSERT INTO rank_benchmark_stats \
         (window_key, playlist_group_key, rank_grouping, rank_value, outcome, metric_key, \
          median_per_active_minute, mean_per_active_minute, aggregator) \
         VALUES ($1, $2, 'tier', $3, 'all', 'goal', 0.5, 0.5, 'median')",
    )
    .bind(window_key)
    .bind(&group_key)
    .bind(tier)
    .execute(&pool)
    .await
    .expect("seed rank_benchmark_stats");

    // Router wired like prod: materialized reads on, benchmark enabled.
    let state = crate::app::AppState {
        db: Some(pool.clone()),
        storage: storage.clone(),
        auth_mode: crate::settings::AuthMode::Dev,
        app_jwt_secret: Arc::from("test-secret"),
        oauth_providers: Arc::from(Vec::new()),
        process_replays_in_background: false,
        background_processing_permits: Arc::new(tokio::sync::Semaphore::new(1)),
        materialized_stat_counts: true,
        rank_benchmark_enabled: true,
        rank_benchmark_windows: Arc::from(vec![crate::rank_benchmark::BenchmarkWindow::Rolling {
            months: 6,
        }]),
        rank_benchmark_default_window: Arc::from(window_key),
        rank_benchmark_calc: crate::rank_benchmark::CalcStyle::PerAppearance,
        admin_emails: Arc::from(Vec::new()),
    };
    let app = crate::api::router(state);

    let pid = format!("{platform}:{platform_player_id}");
    let q = format!("player-id={pid}&team-size={team_size}&game-type={game_type}");
    // Every read path the Core/Scoring/Boost/etc. player views hit, across the
    // materialized + live + outcome-split variants.
    let endpoints = [
        format!("/api/v1/stats/aggregates?{q}&include-teammates=true&count=200"),
        format!("/api/v1/stats/aggregates?{q}&include-teammates=true&count=200&materialized=false"),
        format!("/api/v1/stats/aggregates?{q}&include-teammates=true&count=200&split-outcome=true"),
        format!("/api/v1/stats/player-overview?{q}&materialized=true"),
        format!("/api/v1/stats/player-overview?{q}&materialized=true&include-goal-tags=true&include-rotation=true"),
        format!("/api/v1/stats/player-overview?{q}&materialized=true&player-outcome=win"),
        format!("/api/v1/stats/boost-totals?{q}"),
        format!("/api/v1/stats/possession/summary?{q}"),
        format!("/api/v1/stats/positioning/summary?{q}"),
        format!("/api/v1/stats/movement/summary?{q}"),
        format!("/api/v1/stats/events/kickoff/summary?{q}&include-samples=false"),
        format!("/api/v1/stats/rank-benchmark?{q}&rank-benchmark-grouping=tier"),
    ];
    for uri in &endpoints {
        let response = app
            .clone()
            .oneshot(Request::builder().uri(uri).body(Body::empty()).unwrap())
            .await
            .expect("router responds");
        let status = response.status();
        let body = to_bytes(response.into_body(), usize::MAX)
            .await
            .map(|b| String::from_utf8_lossy(&b).into_owned())
            .unwrap_or_default();
        assert_eq!(status, StatusCode::OK, "{uri} -> {status}: {body}");
    }

    // Prove the benchmark decode path actually ran: the rank-benchmark cohorts
    // endpoint builds `available_ranks` straight from the seeded population row
    // (independent of rank resolution), so a non-empty list means the
    // `distinct_player_count` decode executed. The seed is at `tier` grouping, so
    // query that grouping.
    let response = app
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!(
                    "/api/v1/stats/rank-benchmark?{q}&rank-benchmark-grouping=tier"
                ))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .expect("router responds");
    let body = to_bytes(response.into_body(), usize::MAX)
        .await
        .expect("read rank-benchmark body");
    let json: serde_json::Value = serde_json::from_slice(&body).expect("rank-benchmark json");
    let ranks = json
        .get("available_ranks")
        .and_then(|v| v.as_array())
        .map(|a| a.len())
        .unwrap_or(0);
    assert!(
        ranks > 0,
        "benchmark population decode did not run (group_key={group_key}); \
         seed did not match the resolved cohort"
    );

    let _ = std::fs::remove_dir_all(&storage_root);
}
