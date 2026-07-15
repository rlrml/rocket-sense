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
fn dense_streams_are_never_persisted_as_play_events() {
    let movement = indexed_timeline_payload_event(
        "movement",
        0,
        &serde_json::json!({
            "start_time": 1.0,
            "end_time": 2.0,
            "duration": 1.0,
            "player": { "Steam": 76561198000000001_u64 },
            "avg_speed": 1200.0
        }),
    )
    .expect("movement event should index");
    let rotation = indexed_timeline_payload_event(
        "rotation_role",
        0,
        &serde_json::json!({
            "start_time": 1.0,
            "end_time": 2.0,
            "duration": 1.0,
            "player": { "Steam": 76561198000000001_u64 },
            "state": "first_man"
        }),
    )
    .expect("rotation role event should index");
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

    // Dense telemetry stays in memory (and object storage); reviewable events
    // like touches still become play_events rows.
    assert!(!should_persist_play_event(&movement));
    assert!(!should_persist_play_event(&rotation));
    assert!(should_persist_play_event(&touch));
}

fn aggregate_exclusion_metadata(
    replay_active_seconds: Option<f64>,
    player_active_seconds: &[Option<f64>],
) -> ReplaySearchMetadata {
    ReplaySearchMetadata {
        playlist: None,
        game_type: ReplayGameTypeMetadata::default(),
        map_code: None,
        replay_date: None,
        season: None,
        summary: ReplaySummaryMetadata {
            active_seconds: replay_active_seconds,
            ..ReplaySummaryMetadata::default()
        },
        aggregate_exclusion: None,
        has_pro_player: false,
        players: player_active_seconds
            .iter()
            .enumerate()
            .map(|(index, active_seconds)| ReplaySearchPlayer {
                name: format!("player-{index}"),
                platform: Some("steam".to_owned()),
                platform_player_id: Some(index.to_string()),
                team: (index % 2) as i32,
                is_pro: false,
                score: None,
                goals: None,
                assists: None,
                saves: None,
                shots: None,
                active_time_seconds: active_seconds.map(OrderedFloat),
                time_demolished_seconds: None,
                time_most_back_seconds: None,
                time_most_forward_seconds: None,
            })
            .collect(),
    }
}

fn default_activity_summary() -> subtr_actor::ReplayStatsActivitySummary {
    subtr_actor::ReplayStatsActivitySummary {
        live_play_seconds: 0.0,
        absent_player_min_missing_seconds: PLAYER_LEAVE_EXCLUSION_MIN_MISSING_SECONDS as f32,
        has_absent_player: false,
        players: vec![],
    }
}

#[test]
fn aggregate_exclusion_keeps_complete_games() {
    let metadata = aggregate_exclusion_metadata(Some(300.0), &[Some(300.0), Some(298.0)]);
    let exclusion = replay_aggregate_exclusion(&metadata).expect("classification should be known");

    assert!(!exclusion.exclude_from_aggregates);
    assert_eq!(exclusion.reason, None);
}

#[test]
fn aggregate_exclusion_keeps_short_missing_player_activity() {
    let metadata = aggregate_exclusion_metadata(Some(300.0), &[Some(300.0), Some(285.0)]);
    let exclusion = replay_aggregate_exclusion(&metadata).expect("classification should be known");

    assert!(!exclusion.exclude_from_aggregates);
    assert_eq!(exclusion.reason, None);
}

#[test]
fn aggregate_exclusion_flags_long_missing_player_activity() {
    let metadata = aggregate_exclusion_metadata(Some(300.0), &[Some(300.0), Some(260.0)]);
    let exclusion = replay_aggregate_exclusion(&metadata).expect("classification should be known");

    assert!(exclusion.exclude_from_aggregates);
    assert_eq!(exclusion.reason, Some("player-left-or-inactive"));
}

#[test]
fn aggregate_exclusion_prefers_activity_summary() {
    let mut metadata = aggregate_exclusion_metadata(Some(300.0), &[Some(300.0), Some(300.0)]);
    metadata.aggregate_exclusion = Some(ReplayAggregateExclusion {
        exclude_from_aggregates: true,
        reason: Some("player-left-or-inactive"),
    });
    let exclusion = replay_aggregate_exclusion(&metadata).expect("classification should be known");

    assert!(exclusion.exclude_from_aggregates);
    assert_eq!(exclusion.reason, Some("player-left-or-inactive"));
}

#[test]
fn aggregate_exclusion_is_unknown_with_missing_player_activity_time() {
    let metadata = aggregate_exclusion_metadata(Some(300.0), &[Some(300.0), None]);

    assert_eq!(replay_aggregate_exclusion(&metadata), None);
}

#[test]
fn aggregate_exclusion_flags_known_long_missing_player_activity_with_unknown_player_time() {
    let metadata = aggregate_exclusion_metadata(Some(300.0), &[Some(260.0), None]);
    let exclusion = replay_aggregate_exclusion(&metadata).expect("classification should be known");

    assert!(exclusion.exclude_from_aggregates);
    assert_eq!(exclusion.reason, Some("player-left-or-inactive"));
}

#[test]
fn aggregate_exclusion_is_unknown_without_replay_active_time() {
    let metadata = aggregate_exclusion_metadata(None, &[Some(300.0), None]);

    assert_eq!(replay_aggregate_exclusion(&metadata), None);
}

#[test]
fn in_memory_movement_aggregation_matches_sql_semantics() {
    let player = serde_json::json!({ "Steam": 76561198000000001_u64 });
    let events = vec![
        // Explicit per-state seconds keys win over the state fallback; speed is
        // duration-weighted.
        indexed_timeline_payload_event(
            "movement",
            0,
            &serde_json::json!({
                "start_time": 0.0,
                "end_time": 2.0,
                "duration": 2.0,
                "player": player,
                "avg_speed": 1000.0,
                "total_distance": 2000.0,
                "time_supersonic_speed": 0.75,
                "time_ground": 1.5
            }),
        )
        .expect("movement event should index"),
        // No explicit seconds keys: the state fallback credits the whole
        // duration, and the alternate speed/distance key names are honored.
        indexed_timeline_payload_event(
            "movement",
            1,
            &serde_json::json!({
                "start_time": 2.0,
                "end_time": 5.0,
                "duration": 3.0,
                "player": player,
                "speed": 500.0,
                "distance": 1000.0,
                "speed_band": "slow_speed",
                "height_band": "low_air"
            }),
        )
        .expect("movement event should index"),
        // Powerslide toggles pair on->off (1.5s); the trailing unclosed `on`
        // still counts as a slide but adds no seconds.
        indexed_timeline_payload_event(
            "powerslide",
            0,
            &serde_json::json!({ "time": 10.0, "frame": 600, "player": player, "active": true }),
        )
        .expect("powerslide event should index"),
        indexed_timeline_payload_event(
            "powerslide",
            1,
            &serde_json::json!({ "time": 11.5, "frame": 690, "player": player, "active": false }),
        )
        .expect("powerslide event should index"),
        indexed_timeline_payload_event(
            "powerslide",
            2,
            &serde_json::json!({ "time": 12.0, "frame": 720, "player": player, "active": true }),
        )
        .expect("powerslide event should index"),
        // Mechanic counts come from the kept mechanics stream, not the dense
        // movement stream.
        indexed_timeline_payload_event(
            "mechanics",
            0,
            &serde_json::json!({ "kind": "wavedash", "time": 1.0, "frame": 60, "player": player }),
        )
        .expect("mechanic event should index"),
    ];

    let aggregates = player_replay_movement_aggregates_from_events(&events);
    let aggregate = aggregates
        .get("steam:76561198000000001")
        .expect("player should have movement aggregate");
    assert_eq!(aggregate.total_distance, 3000.0);
    assert_eq!(aggregate.speed_weighted, 1000.0 * 2.0 + 500.0 * 3.0);
    assert_eq!(aggregate.speed_weight, 5.0);
    assert_eq!(aggregate.supersonic_seconds, 0.75);
    assert_eq!(aggregate.ground_seconds, 1.5);
    assert_eq!(aggregate.slow_seconds, 3.0);
    assert_eq!(aggregate.low_air_seconds, 3.0);
    assert_eq!(aggregate.boost_seconds, 0.0);
    assert_eq!(aggregate.high_air_seconds, 0.0);
    assert_eq!(aggregate.powerslide_count, 2);
    assert_eq!(aggregate.powerslide_seconds, 1.5);
    assert_eq!(aggregate.wavedashes, 1);
    assert_eq!(aggregate.speed_flips, 0);
    assert_eq!(aggregate.half_flips, 0);
}

#[test]
fn first_man_stints_come_from_rotation_role_spans_in_memory() {
    let player = serde_json::json!({ "Steam": 76561198000000001_u64 });
    let events = vec![
        indexed_timeline_payload_event(
            "rotation_role",
            0,
            &serde_json::json!({
                "start_time": 1.0,
                "end_time": 4.0,
                "duration": 3.0,
                "player": player,
                "state": "first_man"
            }),
        )
        .expect("first-man span should index"),
        // Non-first-man roles and zero-duration spans are excluded, matching
        // INSERT_PLAYER_REPLAY_FIRST_MAN_STINTS_SQL.
        indexed_timeline_payload_event(
            "rotation_role",
            1,
            &serde_json::json!({
                "start_time": 4.0,
                "end_time": 6.0,
                "duration": 2.0,
                "player": player,
                "state": "mid"
            }),
        )
        .expect("mid span should index"),
        indexed_timeline_payload_event(
            "rotation_role",
            2,
            &serde_json::json!({
                "start_time": 6.0,
                "end_time": 6.0,
                "duration": 0.0,
                "player": player,
                "state": "first_man"
            }),
        )
        .expect("zero-duration span should index"),
    ];

    let stints = first_man_stint_events(&events).collect::<Vec<_>>();
    assert_eq!(stints.len(), 1);
    let (event, duration) = &stints[0];
    assert_eq!(*duration, 3.0);
    assert!(event
        .subjects
        .iter()
        .any(|subject| subject.role == "actor" && subject.id == "steam:76561198000000001"));
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
        activity_summary: default_activity_summary(),
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
        None,
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
fn nonpermanent_timeline_streams_are_not_indexed() {
    assert!(should_index_timeline_stream("touch"));
    assert!(should_index_timeline_stream("depth_role"));
    assert!(!should_index_timeline_stream("goal_tags"));
    assert!(!should_index_timeline_stream("touch_last_touch"));
    assert!(!should_index_timeline_stream("dodge"));
    assert!(!should_index_timeline_stream("shadow_defense"));
}

#[test]
fn depth_role_is_processing_only_and_not_persisted_as_play_events() {
    let depth_role = indexed_timeline_payload_event(
        "depth_role",
        0,
        &serde_json::json!({
            "start_time": 1.0,
            "end_time": 3.0,
            "duration": 2.0,
            "player": { "Steam": 76561198000000001_u64 },
            "state": "most_back"
        }),
    )
    .expect("depth role event should be available in memory");

    assert_eq!(depth_role.event_type_key, "depth_role");
    assert!(!should_persist_play_event(&depth_role));
}

#[test]
fn in_memory_positioning_aggregation_keeps_depth_role_facts() {
    let player_subject_id = "steam:76561198000000001".to_owned();
    let mut players = BTreeMap::new();
    players.insert(
        player_subject_id.clone(),
        ReplayPlayerPositioningInput {
            replay_player_id: Uuid::now_v7(),
            platform: "steam".to_owned(),
            platform_player_id: "76561198000000001".to_owned(),
            team: 0,
        },
    );
    let events = vec![
        indexed_timeline_payload_event(
            "depth_role",
            0,
            &serde_json::json!({
                "start_time": 1.0,
                "end_time": 4.0,
                "duration": 3.0,
                "player": { "Steam": 76561198000000001_u64 },
                "state": "most_back"
            }),
        )
        .expect("depth role event should build"),
        indexed_timeline_payload_event(
            "field_third",
            0,
            &serde_json::json!({
                "start_time": 1.0,
                "end_time": 5.0,
                "duration": 4.0,
                "player": { "Steam": 76561198000000001_u64 },
                "state": "defensive"
            }),
        )
        .expect("field third event should build"),
    ];

    let aggregates = player_replay_positioning_aggregates_from_events(&events, &players);
    let aggregate = aggregates
        .get(&player_subject_id)
        .expect("player should have positioning aggregate");
    assert_eq!(aggregate.role_most_back_seconds, 3.0);
    assert_eq!(aggregate.tracked_seconds, 4.0);
    assert_eq!(aggregate.defensive_third_seconds, 4.0);
}

#[test]
fn only_read_attribute_streams_write_attribute_rows() {
    let rotation = indexed_timeline_payload_event(
        "rotation_role",
        0,
        &serde_json::json!({
            "start_time": 1.0,
            "end_time": 2.0,
            "duration": 1.0,
            "player": { "Steam": 76561198000000001_u64 },
            "state": "first_man"
        }),
    )
    .expect("rotation role event should index");
    let movement = indexed_timeline_payload_event(
        "movement",
        0,
        &serde_json::json!({
            "start_time": 1.0,
            "end_time": 2.0,
            "duration": 1.0,
            "player": { "Steam": 76561198000000001_u64 },
            "avg_speed": 1200.0
        }),
    )
    .expect("movement event should index");
    let mechanic = indexed_timeline_payload_event(
        "mechanics",
        0,
        &serde_json::json!({
            "kind": "wavedash",
            "time": 1.0,
            "frame": 60,
            "player": { "Steam": 76561198000000001_u64 }
        }),
    )
    .expect("mechanic event should index");

    assert!(should_insert_play_event_attributes(&rotation));
    assert!(!should_insert_play_event_attributes(&movement));
    assert!(should_insert_play_event_attributes(&mechanic));
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
        activity_summary: default_activity_summary(),
        positioning_summary: vec![],
        accumulation_tracks: vec![],
    }
}

fn summary_frame(
    frame_number: usize,
    time: f32,
    dt: f32,
    is_live_play: bool,
) -> subtr_actor::ReplayStatsFrameScaffold {
    subtr_actor::ReplayStatsFrameScaffold {
        frame_number,
        time,
        dt,
        seconds_remaining: None,
        game_state: None,
        ball_has_been_hit: Some(is_live_play),
        kickoff_countdown_time: None,
        gameplay_phase: if is_live_play {
            subtr_actor::GameplayPhase::ActivePlay
        } else {
            subtr_actor::GameplayPhase::PostGoal
        },
        is_live_play,
        team_zero: BTreeMap::new(),
        team_one: BTreeMap::new(),
        players: vec![],
    }
}

#[test]
fn replay_summary_metadata_active_seconds_sums_live_play_frame_dt() {
    let mut timeline = stats_timeline_with_events(timeline_events_from(vec![]));
    // Wall clock advances by dt every frame; only live-play frames count toward
    // active time. 3 live frames (0.5s) + 2 non-live frames (skipped) → 1.5s.
    timeline.frames = vec![
        summary_frame(0, 0.0, 0.5, true),
        summary_frame(1, 0.5, 0.5, true),
        summary_frame(2, 1.0, 0.5, false),
        summary_frame(3, 1.5, 0.5, false),
        summary_frame(4, 2.0, 0.5, true),
    ];

    let summary = replay_summary_metadata(&timeline);

    assert_eq!(summary.duration_seconds, Some(2.0));
    assert_eq!(summary.active_seconds, Some(1.5));
}

#[test]
fn replay_summary_metadata_active_seconds_absent_without_frames() {
    let timeline = stats_timeline_with_events(timeline_events_from(vec![]));
    let summary = replay_summary_metadata(&timeline);
    assert_eq!(summary.duration_seconds, None);
    assert_eq!(summary.active_seconds, None);
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
        activity_summary: default_activity_summary(),
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
            // Fixture events model a completed, batch-projected stream, which the
            // collector always emits as `Finalized` (analysis_graph upgrades every
            // event to Finalized before diffing). processing.rs does not branch on
            // lifecycle, but match the real batch output for fidelity.
            lifecycle: subtr_actor::EventLifecycle::Finalized,
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
    let typed = collect_replay_analysis(bytes.clone(), Some("fixture-sha"))
        .expect("typed analysis with eager mistakes");

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
    let mut scaffold_json = serde_json::to_value(&scaffold).expect("serialize scaffold");
    scaffold_json["mistakes"] = typed.event_stream["mistakes"].clone();

    let from_json = replay_analysis_output_from_scaffold_json(
        &scaffold_json,
        serde_json::json!({ "source": "client_wasm_test" }),
        Some("fixture-sha"),
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
    assert_eq!(
        typed.event_stream["mistakes"], from_json.event_stream["mistakes"],
        "eager mistake stream mismatch",
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
        "player_replay_movement",
        "player_replay_touch_breakdowns",
        "player_replay_kickoff",
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

/// Validates the rank-benchmark refresh SQL end-to-end against a real
/// Postgres, focusing on the TEAM grain (migration 0086): completeness/rank
/// gating of team units, additive-vs-gauge team aggregation, the team
/// denominator (`replays.active_seconds`), `meta:game_seconds`, and the
/// player-grain rows staying shape-identical (now tagged `grain = 'player'`).
///
/// Seeds a small synthetic dataset (no replay files) with hand-computable
/// numbers, then runs the actual `refresh_rank_benchmark` and asserts exact
/// values. Same env gating as `reprocess_populates_all_materialized_tables`:
/// set `RS_REPROCESS_TEST_DATABASE_URL` to a FRESH, EMPTY database. Run with:
///   RS_REPROCESS_TEST_DATABASE_URL=postgres://... cargo test -p rocket-sense-server \
///     rank_benchmark_refresh_materializes_team_grain -- --ignored --nocapture
#[tokio::test]
#[ignore = "requires RS_REPROCESS_TEST_DATABASE_URL"]
async fn rank_benchmark_refresh_materializes_team_grain() {
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

    // One ranked-2v2 replay whose two teams are both complete + fully ranked.
    // Team 0 (win): P1 tier 10 (300s active, score 100, 2 goals),
    //               P2 tier 11 (290s active, score 200) -> team tier 11 (10.5
    //               rounds away from zero), team seconds = replays.active_seconds = 310.
    // Team 1 (loss): P3 tier 12, P4 tier 13 -> team tier 13 (12.5 -> 13).
    let r1 = Uuid::now_v7();
    let run1 = Uuid::now_v7();
    // A second replay whose team 0 carries an UNRANKED player (rank_tier NULL),
    // so team 0 is incomplete and must NOT materialize a team unit; team 1
    // (tiers 4 + 5 -> team tier 5, one goal by P7, 300s) must.
    let r2 = Uuid::now_v7();
    let run2 = Uuid::now_v7();

    let seed_replay = |replay: Uuid,
                       run: Uuid,
                       team_zero_score: i32,
                       team_one_score: i32,
                       active_seconds: f64| {
        let pool = pool.clone();
        async move {
            sqlx::query(
                "INSERT INTO replays (id, uploaded_by_user_id, file_sha256, original_file_name, \
                                      byte_size, storage_key, storage_encoding, storage_byte_size) \
                 VALUES ($1, NULL, $2, 'bench.replay', 1, $3, 'zstd', 1)",
            )
            .bind(replay)
            .bind(format!("sha-{replay}"))
            .bind(format!("replays/{replay}.replay"))
            .execute(&pool)
            .await
            .expect("insert replay");
            sqlx::query(
                "INSERT INTO analysis_runs (id, replay_id, status, extractor_name, extractor_version, \
                                            input_file_sha256, event_stream_schema_version) \
                 VALUES ($1, $2, 'succeeded', 'test', '1', $3, '1')",
            )
            .bind(run)
            .bind(replay)
            .bind(format!("sha-{replay}"))
            .execute(&pool)
            .await
            .expect("insert analysis run");
            sqlx::query(
                "UPDATE replays SET canonical_analysis_run_id = $2, \
                        replay_date = now() - interval '1 day', replay_game_type = 'ranked', \
                        team_zero_score = $3, team_one_score = $4, active_seconds = $5 \
                 WHERE id = $1",
            )
            .bind(replay)
            .bind(run)
            .bind(team_zero_score)
            .bind(team_one_score)
            .bind(active_seconds)
            .execute(&pool)
            .await
            .expect("update replay metadata");
        }
    };
    seed_replay(r1, run1, 2, 1, 310.0).await;
    seed_replay(r2, run2, 0, 1, 300.0).await;

    let seed_player = |replay: Uuid,
                       pid: &str,
                       team: i32,
                       rank_tier: Option<i32>,
                       score: i32,
                       goals: i32,
                       active: f64| {
        let pool = pool.clone();
        let pid = pid.to_owned();
        async move {
            sqlx::query(
                "INSERT INTO replay_players (id, replay_id, name, platform, platform_player_id, \
                                             team, rank_tier, score, goals, active_time_seconds) \
                 VALUES ($1, $2, $3, 'steam', $3, $4, $5, $6, $7, $8)",
            )
            .bind(Uuid::now_v7())
            .bind(replay)
            .bind(&pid)
            .bind(team)
            .bind(rank_tier)
            .bind(score)
            .bind(goals)
            .bind(active)
            .execute(&pool)
            .await
            .expect("insert replay player");
        }
    };
    seed_player(r1, "p1", 0, Some(10), 100, 2, 300.0).await;
    seed_player(r1, "p2", 0, Some(11), 200, 0, 290.0).await;
    seed_player(r1, "p3", 1, Some(12), 50, 1, 300.0).await;
    seed_player(r1, "p4", 1, Some(13), 60, 0, 300.0).await;
    seed_player(r2, "p5", 0, None, 10, 0, 300.0).await; // unranked -> team 0 incomplete
    seed_player(r2, "p6", 0, Some(9), 20, 0, 300.0).await;
    seed_player(r2, "p7", 1, Some(4), 30, 1, 300.0).await;
    seed_player(r2, "p8", 1, Some(5), 40, 0, 300.0).await;

    // Event counts: only positive counts are stored (0-filled by the refresh).
    let goal_type_id: i32 = sqlx::query_scalar(
        "INSERT INTO event_types (key, display_name, category) VALUES ('goal', 'Goal', 'core') \
         ON CONFLICT (key) DO UPDATE SET display_name = EXCLUDED.display_name RETURNING id",
    )
    .fetch_one(&pool)
    .await
    .expect("insert goal event type");
    for (run, replay, pid, team, count) in [(run1, r1, "p1", 0, 2i32), (run2, r2, "p7", 1, 1i32)] {
        sqlx::query(
            "INSERT INTO player_replay_event_counts \
             (analysis_run_id, replay_id, player_subject_id, platform, platform_player_id, team, event_type_id, event_count) \
             VALUES ($1, $2, 'steam:' || $3, 'steam', $3, $4, $5, $6)",
        )
        .bind(run)
        .bind(replay)
        .bind(pid)
        .bind(team)
        .bind(goal_type_id)
        .bind(count)
        .execute(&pool)
        .await
        .expect("insert event count");
    }

    // Boost: additive counter (collected) + gauge (avg_amount = weighted_sum /
    // tracked_seconds; P1 -> 50, P2 -> 30; team pooled -> 23700 / 590).
    for (pid, team, collected, weighted_sum, tracked) in [
        ("p1", 0, 1000.0, 15000.0, 300.0),
        ("p2", 0, 500.0, 8700.0, 290.0),
    ] {
        sqlx::query(
            "INSERT INTO player_replay_boost \
             (analysis_run_id, replay_id, player_subject_id, platform, platform_player_id, team, \
              boost_collected, boost_amount_weighted_sum, tracked_seconds) \
             VALUES ($1, $2, 'steam:' || $3, 'steam', $3, $4, $5, $6, $7)",
        )
        .bind(run1)
        .bind(r1)
        .bind(pid)
        .bind(team)
        .bind(collected)
        .bind(weighted_sum)
        .bind(tracked)
        .execute(&pool)
        .await
        .expect("insert boost row");
    }

    // Movement: gauge avg_speed (P1 1000, P2 1400 -> team 706000/590) and
    // additive distance (150000 total over the 310s team game).
    for (pid, team, speed_weighted, speed_weight, distance, active) in [
        ("p1", 0, 300_000.0, 300.0, 100_000.0, 300.0),
        ("p2", 0, 406_000.0, 290.0, 50_000.0, 290.0),
    ] {
        sqlx::query(
            "INSERT INTO player_replay_movement \
             (analysis_run_id, replay_id, player_subject_id, platform, platform_player_id, team, \
              active_seconds, speed_weighted, speed_weight, total_distance) \
             VALUES ($1, $2, 'steam:' || $3, 'steam', $3, $4, $5, $6, $7, $8)",
        )
        .bind(run1)
        .bind(r1)
        .bind(pid)
        .bind(team)
        .bind(active)
        .bind(speed_weighted)
        .bind(speed_weight)
        .bind(distance)
        .execute(&pool)
        .await
        .expect("insert movement row");
    }

    // Possession: additive count + gauge duration_share ((60+40)/(300+290)).
    for (pid, team, count, duration) in [("p1", 0, 5i64, 60.0), ("p2", 0, 3i64, 40.0)] {
        sqlx::query(
            "INSERT INTO player_replay_possession \
             (analysis_run_id, replay_id, player_subject_id, platform, platform_player_id, team, \
              possession_count, duration_seconds) \
             VALUES ($1, $2, 'steam:' || $3, 'steam', $3, $4, $5, $6)",
        )
        .bind(run1)
        .bind(r1)
        .bind(pid)
        .bind(team)
        .bind(count)
        .bind(duration)
        .execute(&pool)
        .await
        .expect("insert possession row");
    }

    // Positioning: gauge share ((150+145)/(300+290) = 0.5) and weighted
    // distance-to-ball ((900000+870000)/(300+290) = 3000).
    for (pid, team, def_third, tracked, dtb_weighted, dtb_weight) in [
        ("p1", 0, 150.0, 300.0, 900_000.0, 300.0),
        ("p2", 0, 145.0, 290.0, 870_000.0, 290.0),
    ] {
        sqlx::query(
            "INSERT INTO player_replay_positioning \
             (analysis_run_id, replay_id, player_subject_id, platform, platform_player_id, team, \
              defensive_third_seconds, tracked_seconds, distance_to_ball_weighted, distance_to_ball_weight) \
             VALUES ($1, $2, 'steam:' || $3, 'steam', $3, $4, $5, $6, $7, $8)",
        )
        .bind(run1)
        .bind(r1)
        .bind(pid)
        .bind(team)
        .bind(def_third)
        .bind(tracked)
        .bind(dtb_weighted)
        .bind(dtb_weight)
        .execute(&pool)
        .await
        .expect("insert positioning row");
    }

    // Stat facts: additive count metric, per-player denominators live but the
    // team denominator is the team game ((10+20)*60/310).
    for (pid, team, value, ats) in [("p1", 0, 10.0, 300.0), ("p2", 0, 20.0, 290.0)] {
        sqlx::query(
            "INSERT INTO player_replay_stat_facts \
             (analysis_run_id, replay_id, player_subject_id, platform, platform_player_id, team, \
              stat_key, value, unit, active_time_seconds) \
             VALUES ($1, $2, 'steam:' || $3, 'steam', $3, $4, 'ball-advance', $5, 'count', $6)",
        )
        .bind(run1)
        .bind(r1)
        .bind(pid)
        .bind(team)
        .bind(value)
        .bind(ats)
        .execute(&pool)
        .await
        .expect("insert stat fact row");
    }

    let refreshed = refresh_rank_benchmark(
        &pool,
        &[BenchmarkWindow::Rolling { months: 6 }],
        CalcStyle::PerAppearance,
    )
    .await
    .expect("refresh rank benchmark");
    assert_eq!(refreshed, 1, "one window refreshed");

    let stat = |grain: &str, grouping: &str, rank_value: i32, outcome: &str, metric: &str| {
        let pool = pool.clone();
        let (grain, grouping, outcome, metric) = (
            grain.to_owned(),
            grouping.to_owned(),
            outcome.to_owned(),
            metric.to_owned(),
        );
        async move {
            sqlx::query_scalar::<_, Option<f64>>(
                "SELECT mean_per_active_minute FROM rank_benchmark_stats \
                 WHERE window_key = 'rolling-6m' AND playlist_group_key = 'ranked-2v2' \
                   AND grain = $1 AND rank_grouping = $2 AND rank_value = $3 \
                   AND outcome = $4 AND metric_key = $5",
            )
            .bind(&grain)
            .bind(&grouping)
            .bind(rank_value)
            .bind(&outcome)
            .bind(&metric)
            .fetch_optional(&pool)
            .await
            .expect("query benchmark stat")
            .flatten()
        }
    };
    let assert_close = |label: &str, actual: Option<f64>, expected: f64| {
        let actual = actual.unwrap_or_else(|| panic!("{label}: row missing"));
        assert!(
            (actual - expected).abs() < 1e-9,
            "{label}: got {actual}, expected {expected}"
        );
    };

    // (a) Player grain unchanged in shape: per-appearance rates at the exact
    // tier, and no team-only synthetic metric.
    assert_close(
        "player tier 10 goal",
        stat("player", "tier", 10, "all", "goal").await,
        2.0 * 60.0 / 300.0,
    );
    assert_close(
        "player tier 10 two-goal games",
        stat("player", "tier", 10, "all", "core:goal_games:2").await,
        1.0,
    );
    assert_close(
        "player tier 10 win share",
        stat("player", "tier", 10, "all", "outcome:win_share").await,
        1.0,
    );
    assert_close(
        "player tier 10 +1 margin",
        stat("player", "tier", 10, "all", "outcome:margin:pos1").await,
        1.0,
    );
    assert_close(
        "player tier 10 team goals",
        stat("player", "tier", 10, "all", "outcome:team_goals:2").await,
        1.0,
    );
    assert_close(
        "player tier 10 opponent team goals",
        stat("player", "tier", 10, "all", "outcome:opponent_team_goals:1").await,
        1.0,
    );
    assert_close(
        "player tier 11 zero-goal games",
        stat("player", "tier", 11, "all", "core:goal_games:0").await,
        1.0,
    );
    assert_close(
        "player tier 11 boost:avg_amount",
        stat("player", "tier", 11, "all", "boost:avg_amount").await,
        8700.0 / 290.0,
    );
    let player_meta: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM rank_benchmark_stats WHERE grain = 'player' AND metric_key = 'meta:game_seconds'",
    )
    .fetch_one(&pool)
    .await
    .expect("count player meta metric");
    assert_eq!(player_meta, 0, "meta:game_seconds is team-grain only");

    // (b) Team grain: hand-computed sums over the seeded team-games.
    // R1 team 0 -> tier ROUND(10.5) = 11, team seconds 310.
    assert_close(
        "team tier 11 goal (all)",
        stat("team", "tier", 11, "all", "goal").await,
        2.0 * 60.0 / 310.0,
    );
    assert_close(
        "team tier 11 two-goal games",
        stat("team", "tier", 11, "all", "core:goal_games:2").await,
        1.0,
    );
    assert_close(
        "team tier 11 win share",
        stat("team", "tier", 11, "all", "outcome:win_share").await,
        1.0,
    );
    assert_close(
        "team tier 11 +1 margin",
        stat("team", "tier", 11, "all", "outcome:margin:pos1").await,
        1.0,
    );
    assert_close(
        "team tier 11 total goals",
        stat("team", "tier", 11, "all", "outcome:total_goals:3").await,
        1.0,
    );
    assert_close(
        "team tier 11 goal (win)",
        stat("team", "tier", 11, "win", "goal").await,
        2.0 * 60.0 / 310.0,
    );
    assert_close(
        "team tier 11 score",
        stat("team", "tier", 11, "all", "score").await,
        (100.0 + 200.0) * 60.0 / 310.0,
    );
    assert_close(
        "team tier 11 boost:collected",
        stat("team", "tier", 11, "all", "boost:collected").await,
        1500.0 * 60.0 / 310.0,
    );
    assert_close(
        "team tier 11 boost:avg_amount (pooled gauge)",
        stat("team", "tier", 11, "all", "boost:avg_amount").await,
        23_700.0 / 590.0,
    );
    assert_close(
        "team tier 11 movement:avg_speed",
        stat("team", "tier", 11, "all", "movement:avg_speed").await,
        706_000.0 / 590.0,
    );
    assert_close(
        "team tier 11 movement:distance",
        stat("team", "tier", 11, "all", "movement:distance").await,
        150_000.0 * 60.0 / 310.0,
    );
    assert_close(
        "team tier 11 possession:count",
        stat("team", "tier", 11, "all", "possession:count").await,
        8.0 * 60.0 / 310.0,
    );
    assert_close(
        "team tier 11 possession:duration_share",
        stat("team", "tier", 11, "all", "possession:duration_share").await,
        100.0 / 590.0,
    );
    assert_close(
        "team tier 11 positioning:defensive_third_share",
        stat(
            "team",
            "tier",
            11,
            "all",
            "positioning:defensive_third_share",
        )
        .await,
        0.5,
    );
    assert_close(
        "team tier 11 positioning:distance_to_ball",
        stat("team", "tier", 11, "all", "positioning:distance_to_ball").await,
        3000.0,
    );
    assert_close(
        "team tier 11 fact:ball-advance",
        stat("team", "tier", 11, "all", "fact:ball-advance").await,
        30.0 * 60.0 / 310.0,
    );
    // R1 team 1 -> tier ROUND(12.5) = 13, zero goals (0-filled).
    assert_close(
        "team tier 13 goal",
        stat("team", "tier", 13, "all", "goal").await,
        0.0,
    );
    assert_close(
        "team tier 13 one-goal games",
        stat("team", "tier", 13, "all", "core:goal_games:1").await,
        1.0,
    );
    // R2 team 1 -> tier ROUND(4.5) = 5, one goal over 300s.
    assert_close(
        "team tier 5 goal",
        stat("team", "tier", 5, "all", "goal").await,
        1.0 * 60.0 / 300.0,
    );
    // Group granularity: tier 11 -> group (11-1)/3 = 3.
    assert_close(
        "team group 3 goal",
        stat("team", "group", 3, "all", "goal").await,
        2.0 * 60.0 / 310.0,
    );

    // (c) meta:game_seconds carries the team-game length.
    assert_close(
        "team tier 11 meta:game_seconds",
        stat("team", "tier", 11, "all", "meta:game_seconds").await,
        310.0,
    );

    // Incomplete team (unranked P5): R2 team 0 (whose qualifying-player tier
    // would be 9) must not materialize any team rows.
    let incomplete: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM rank_benchmark_stats \
         WHERE grain = 'team' AND rank_grouping = 'tier' AND rank_value = 9",
    )
    .fetch_one(&pool)
    .await
    .expect("count incomplete-team rows");
    assert_eq!(
        incomplete, 0,
        "incomplete team must not enter the benchmark"
    );

    // Team population: 1 team-game, 2 contributing players for R1 team 0.
    let (players, replays): (i32, i32) = sqlx::query_as(
        "SELECT distinct_player_count, replay_count FROM rank_benchmark_population \
         WHERE window_key = 'rolling-6m' AND playlist_group_key = 'ranked-2v2' \
           AND grain = 'team' AND rank_grouping = 'tier' AND rank_value = 11 AND outcome = 'all'",
    )
    .fetch_one(&pool)
    .await
    .expect("team population row");
    assert_eq!((players, replays), (2, 1), "team population counts");

    // Player population rows still materialize under grain = 'player'.
    let player_pop: i64 =
        sqlx::query_scalar("SELECT COUNT(*) FROM rank_benchmark_population WHERE grain = 'player'")
            .fetch_one(&pool)
            .await
            .expect("player population rows");
    assert!(player_pop > 0, "player population rows exist");
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
    // Team-grain rows (migration 0086): an adequately-sampled team population
    // (>= MIN_SAMPLE) plus one stats row, so the cohorts endpoint's
    // `team_per_stat` read path both gates and decodes against real rows.
    sqlx::query(
        "INSERT INTO rank_benchmark_population \
         (window_key, grain, playlist_group_key, rank_grouping, rank_value, outcome, distinct_player_count, replay_count) \
         VALUES ($1, 'team', $2, 'tier', $3, 'all', 25, 40)",
    )
    .bind(window_key)
    .bind(&group_key)
    .bind(tier)
    .execute(&pool)
    .await
    .expect("seed team rank_benchmark_population");
    sqlx::query(
        "INSERT INTO rank_benchmark_stats \
         (window_key, grain, playlist_group_key, rank_grouping, rank_value, outcome, metric_key, \
          median_per_active_minute, mean_per_active_minute, aggregator) \
         VALUES ($1, 'team', $2, 'tier', $3, 'all', 'goal', 0.7, 0.75, 'mean')",
    )
    .bind(window_key)
    .bind(&group_key)
    .bind(tier)
    .execute(&pool)
    .await
    .expect("seed team rank_benchmark_stats");

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
        ballchasing_api_key: None,
        egress: Arc::new(
            rocket_sense_egress::EgressPool::new(
                rocket_sense_egress::PoolConfig::default(),
                vec![rocket_sense_egress::ExitConfig::direct("direct")],
            )
            .expect("build direct egress pool"),
        ),
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

    // Team grain: explicitly select the seeded tier so a cohort is returned,
    // and assert its `team_per_stat` served the seeded team-grain row (the
    // seeded team population clears MIN_SAMPLE, so no group fallback applies).
    let response = app
        .clone()
        .oneshot(
            Request::builder()
                .uri(format!(
                    "/api/v1/stats/rank-benchmark?{q}&rank-benchmark-grouping=tier&rank-benchmark-rank={tier}"
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
    let team_goal_value = json
        .get("cohorts")
        .and_then(|v| v.as_array())
        .and_then(|cohorts| {
            cohorts
                .iter()
                .find(|c| c.get("rank_value").and_then(|v| v.as_i64()) == Some(tier as i64))
        })
        .and_then(|cohort| cohort.get("team_per_stat"))
        .and_then(|map| map.get("goal"))
        .and_then(|stat| stat.get("value"))
        .and_then(|v| v.as_f64());
    assert_eq!(
        team_goal_value,
        Some(0.75),
        "team_per_stat did not serve the seeded team-grain benchmark row"
    );

    let _ = std::fs::remove_dir_all(&storage_root);
}
