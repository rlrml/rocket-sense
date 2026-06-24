use super::super::event_stats::{KickoffSpawnShape, KickoffSpawnSide};
use super::*;

#[test]
fn stat_aggregate_filters_normalize_replay_set_and_player_filters() {
    let group_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let project_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f1").unwrap();
    let uploader_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f2").unwrap();
    let filters = StatAggregateFilters::from_query(
        StatAggregatesQuery {
            q: Some(" replay_100% ".to_owned()),
            player_names: vec![" Zen ".to_owned()],
            playlist: vec![" ranked-doubles ".to_owned()],
            game_modes: vec!["ranked-duels".to_owned(), "ranked-doubles".to_owned()],
            file_sha256s: vec![
                "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF".to_owned(),
            ],
            group: Some(group_id.to_string()),
            project: Some(project_id.to_string()),
            maps: vec![" Stadium_P ".to_owned()],
            pro: Some(true),
            uploader: Some("me".to_owned()),
            status: Some(" Processed ".to_owned()),
            player_id: Some(" Steam : 76561198000000000 ".to_owned()),
            stat_terms: vec![
                " Goal ".to_owned(),
                "goal".to_owned(),
                "Flip_Reset%".to_owned(),
            ],
            include_teammates: Some(true),
            count: Some(500),
            group_by: Some(" playlist ".to_owned()),
            ..StatAggregatesQuery::default()
        },
        Some(uploader_id),
    )
    .expect("filters should parse");

    assert_eq!(
        filters.replay_set.search_pattern,
        Some("%replay\\_100\\%%".to_owned())
    );
    assert_eq!(filters.replay_set.player_name_patterns, ["%Zen%"]);
    assert_eq!(
        filters.replay_set.playlists,
        ["ranked-doubles", "ranked-duels"]
    );
    assert_eq!(
        filters.replay_set.file_sha256s,
        ["0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"]
    );
    assert_eq!(filters.replay_set.group_id, Some(group_id));
    assert_eq!(filters.replay_set.project_id, Some(project_id));
    assert_eq!(filters.replay_set.maps, ["Stadium_P"]);
    assert_eq!(filters.replay_set.pro, Some(true));
    assert_eq!(filters.replay_set.uploader_user_id, Some(uploader_id));
    assert_eq!(filters.replay_set.status, Some("processed".to_owned()));
    assert_eq!(filters.limit, 200);
    assert_eq!(filters.group_by, Some(StatAggregateGroupBy::Playlist));
    assert!(filters.include_teammates);
    assert_eq!(filters.stat_terms, ["goal", "flip_reset%"]);
    let player = filters.player.expect("player filter should parse");
    assert_eq!(player.platform, "steam");
    assert_eq!(player.platform_player_id, "76561198000000000");
}

#[test]
fn stat_aggregate_query_accepts_html_form_array_filters() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let raw_query = format!(
        "player-name=colonelpanic8&playlist=Online&game-mode=ranked-doubles&replay-id={replay_id}&sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef&map=Stadium_P&group-by=playlist"
    );
    let query = StatAggregatesQuery::from_raw_query(Some(&raw_query))
        .expect("single-value HTML form filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8"]);
    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.game_modes, ["ranked-doubles"]);
    assert_eq!(query.replay_ids, [replay_id]);
    assert_eq!(query.file_sha256s.len(), 1);
    assert_eq!(query.maps, ["Stadium_P"]);
    assert_eq!(query.group_by.as_deref(), Some("playlist"));
}

#[test]
fn stat_aggregate_query_accepts_bracketed_array_filters() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let raw_query = format!(
        "player-name%5B%5D=colonelpanic8&playlist%5B%5D=Online&game-mode%5B%5D=ranked-doubles&replay-id%5B%5D={replay_id}&sha256%5B%5D=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef&map%5B%5D=Stadium_P"
    );
    let query = StatAggregatesQuery::from_raw_query(Some(&raw_query))
        .expect("bracketed array filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8"]);
    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.game_modes, ["ranked-doubles"]);
    assert_eq!(query.replay_ids, [replay_id]);
    assert_eq!(query.file_sha256s.len(), 1);
    assert_eq!(query.maps, ["Stadium_P"]);
}

#[test]
fn stat_aggregate_query_accepts_repeated_array_filters() {
    let first_replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let second_replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f1").unwrap();
    let raw_query = format!(
        "player-name=colonelpanic8&player-name=teammate&playlist=Online&playlist=Private&replay-id={first_replay_id}&replay-id={second_replay_id}"
    );
    let query = StatAggregatesQuery::from_raw_query(Some(&raw_query))
        .expect("repeated array filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8", "teammate"]);
    assert_eq!(query.playlist, ["Online", "Private"]);
    assert_eq!(query.replay_ids, [first_replay_id, second_replay_id]);
}

#[test]
fn stat_aggregate_query_accepts_repeated_stat_terms() {
    let raw_query = "stat-term=Goal&stat-term=kickoff&stat_terms%5B%5D=double%20tap";
    let query = StatAggregatesQuery::from_raw_query(Some(raw_query))
        .expect("repeated stat terms should parse");
    let filters = StatAggregateFilters::from_query(query, None).expect("filters should parse");

    assert_eq!(filters.stat_terms, ["goal", "kickoff", "double tap"]);
}

#[test]
fn stat_aggregate_query_parses_game_type_and_team_size_filters() {
    let raw_query = "game-type=ranked&game-type=tournament&team-size=2v2&team-size=3";
    let query = StatAggregatesQuery::from_raw_query(Some(raw_query))
        .expect("game-type and team-size filters should deserialize");
    assert_eq!(query.game_types, ["ranked", "tournament"]);
    assert_eq!(query.team_sizes, ["2v2", "3"]);

    let filters = StatAggregateFilters::from_query(query, None).expect("filters should parse");
    assert_eq!(filters.replay_set.game_types, ["ranked", "tournament"]);
    assert_eq!(filters.replay_set.team_sizes, [2, 3]);
}

#[test]
fn stat_aggregate_filters_parse_kickoff_shape_and_side_filters() {
    let query = StatAggregatesQuery::from_raw_query(Some(
        "player-id=steam:76561198000000000&kickoff-shape=center_offset&kickoff-side=right",
    ))
    .expect("kickoff filters should deserialize");
    let filters = StatAggregateFilters::from_query(query, None).expect("filters should parse");

    assert_eq!(
        filters.kickoff_spawn.shape,
        Some(KickoffSpawnShape::CenterOffset)
    );
    assert_eq!(filters.kickoff_spawn.side, Some(KickoffSpawnSide::Right));
    assert_eq!(
        filters.kickoff_spawn.spawn_positions(),
        ["off_center_right"]
    );
}

#[test]
fn stat_aggregate_filters_reject_invalid_inputs() {
    assert!(StatAggregateFilters::from_query(
        StatAggregatesQuery {
            game_types: vec!["scrimmage".to_owned()],
            ..StatAggregatesQuery::default()
        },
        None
    )
    .is_err());

    assert!(StatAggregateFilters::from_query(
        StatAggregatesQuery {
            team_sizes: vec!["5".to_owned()],
            ..StatAggregatesQuery::default()
        },
        None
    )
    .is_err());

    assert!(StatAggregateFilters::from_query(
        StatAggregatesQuery {
            file_sha256s: vec!["abc".to_owned()],
            ..StatAggregatesQuery::default()
        },
        None
    )
    .is_err());

    assert!(StatAggregateFilters::from_query(
        StatAggregatesQuery {
            player_id: Some("missing_separator".to_owned()),
            ..StatAggregatesQuery::default()
        },
        None
    )
    .is_err());

    assert!(StatAggregateFilters::from_query(
        StatAggregatesQuery {
            uploader: Some("me".to_owned()),
            ..StatAggregatesQuery::default()
        },
        None
    )
    .is_err());

    assert!(StatAggregateFilters::from_query(
        StatAggregatesQuery {
            group_by: Some("rank".to_owned()),
            ..StatAggregatesQuery::default()
        },
        None
    )
    .is_err());
}

#[test]
fn per_minute_requires_positive_denominator() {
    assert_eq!(per_minute(2, Some(30.0)), Some(4.0));
    assert_eq!(per_minute(2, Some(0.0)), None);
    assert_eq!(per_minute(2, None), None);
}

#[test]
fn player_boost_total_response_carries_event_derived_pad_breakdowns() {
    let mut accumulator = PlayerBoostAccumulator {
        boost_collected: 180.0,
        boost_stolen: 90.0,
        ..PlayerBoostAccumulator::default()
    };
    let event_fields = PlayerBoostEventAccumulator {
        boost_collected_big: 100.0,
        boost_collected_small: 36.0,
        boost_collected_grant: 24.0,
        boost_stolen_big: 80.0,
        boost_stolen_small: 10.0,
        boost_stolen_overfill: 6.0,
        big_pads: 1,
        big_pads_offensive: 1,
        small_pads: 3,
        small_pads_defensive: 2,
        stolen_big_pads: 1,
        stolen_small_pads: 1,
        ..PlayerBoostEventAccumulator::default()
    };

    accumulator.merge_event_fields(Some(&event_fields));
    let response = accumulator.into_response();

    assert_eq!(response.boost_collected_big, 100.0);
    assert_eq!(response.boost_collected_small, 36.0);
    assert_eq!(response.boost_collected_grant, 24.0);
    assert_eq!(response.boost_collected_unknown, 20.0);
    assert_eq!(response.big_pads, 1);
    assert_eq!(response.big_pads_offensive, 1);
    assert_eq!(response.small_pads, 3);
    assert_eq!(response.small_pads_defensive, 2);
    assert_eq!(response.boost_stolen_big, 80.0);
    assert_eq!(response.boost_stolen_small, 10.0);
    assert_eq!(response.boost_stolen_overfill, 6.0);
    assert_eq!(response.stolen_pads, 2);
}

#[test]
fn touch_aggregate_cohort_response_carries_active_time_denominator() {
    let mut accumulator = TouchAggregateCohortAccumulator::default();
    accumulator.set_active_time_seconds(Some(900.0));
    accumulator.add("kind".to_owned(), "control".to_owned(), 15, 120.0);
    accumulator.add("category".to_owned(), "advance".to_owned(), 15, 120.0);

    let response = accumulator.into_response("opponents");

    assert_eq!(response.active_time_seconds, Some(900.0));
    assert_eq!(response.total_touch_count, 15);
    assert_eq!(response.total_advance_distance, 120.0);
}

#[test]
fn aggregate_hidden_event_source_streams_cover_state_and_context_rows() {
    for source_stream in [
        "positioning",
        "boost_state",
        "boost_ledger",
        "movement",
        "rotation_player",
        "rotation_role_span",
        "rotation_depth_span",
        "powerslide",
    ] {
        assert!(
            AGGREGATE_HIDDEN_EVENT_SOURCE_STREAMS.contains(&source_stream),
            "{source_stream} should be hidden from aggregate stat counts"
        );
        assert!(
            AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL.contains(&format!("'{source_stream}'")),
            "{source_stream} should be present in the aggregate query predicate"
        );
    }
}

#[test]
fn player_profile_stat_indexes_cover_appearance_subject_and_teammate_joins() {
    let migration = include_str!("../../../../migrations/0026_player_profile_stats_indexes.sql");

    assert!(migration.contains("replay_players_platform_player_profile_cover_idx"));
    assert!(migration.contains("INCLUDE"));
    assert!(migration.contains("replay_players_replay_team_id_idx"));
    assert!(migration.contains("play_event_subjects_replay_player_event_idx"));
}

fn boost_filters_with_player(raw_query: &str, materialized: bool) -> StatAggregateFilters {
    let query =
        StatAggregatesQuery::from_raw_query(Some(raw_query)).expect("boost query should parse");
    let mut filters = StatAggregateFilters::from_query(query, None).expect("filters should parse");
    filters.materialized_stat_counts = materialized;
    filters
}

#[test]
fn boost_totals_query_parses_materialized_default_and_override() {
    let default =
        StatAggregatesQuery::from_raw_query(Some("player-id=Steam:76561198000000000&team-size=2"))
            .expect("boost query should parse");
    assert_eq!(default.materialized, None, "materialized defaults to unset");

    let on = StatAggregatesQuery::from_raw_query(Some(
        "player-id=Steam:76561198000000000&materialized=true",
    ))
    .expect("boost query should parse");
    assert_eq!(on.materialized, Some(true));

    let off = StatAggregatesQuery::from_raw_query(Some(
        "player-id=Steam:76561198000000000&materialized=false",
    ))
    .expect("boost query should parse");
    assert_eq!(off.materialized, Some(false));
}

#[test]
fn materialized_boost_query_reconstructs_cohorts_by_replay_and_team() {
    let filters = boost_filters_with_player(
        "player-id=Steam:76561198000000000&team-size=2&game-type=ranked",
        true,
    );
    let mut builder = build_materialized_boost_query(&filters);
    let sql = builder.sql();

    // Reads the materialized table, not the live tracks/event scan.
    assert!(sql.contains("FROM player_replay_boost boost"));
    assert!(!sql.contains("replay_boost_tracks"));

    // Cohorts reconstructed by (replay, team): self, same-team teammate,
    // other-team opponent.
    assert!(sql.contains("'player'::text AS cohort"));
    assert!(sql.contains("'teammates'::text AS cohort"));
    assert!(sql.contains("'opponents'::text AS cohort"));
    assert!(sql.contains("boost.team = ta.target_team"));
    assert!(sql.contains("boost.team <> ta.target_team"));
    assert!(sql.contains("GROUP BY cohort"));
}

#[test]
fn materialized_boost_query_casts_pad_count_sums_to_bigint() {
    let filters = boost_filters_with_player("player-id=Steam:76561198000000000", true);
    let mut builder = build_materialized_boost_query(&filters);
    let sql = builder.sql();

    // Postgres SUM(bigint) returns NUMERIC; every pad-count sum must be cast back
    // to ::bigint so sqlx decodes it as i64 (the gotcha that bit possession).
    for column in [
        "big_pads",
        "big_pads_offensive",
        "big_pads_neutral",
        "big_pads_defensive",
        "small_pads",
        "small_pads_offensive",
        "small_pads_defensive",
        "stolen_big_pads",
        "stolen_small_pads",
    ] {
        assert!(
            sql.contains(&format!("::bigint AS {column}")),
            "{column} sum must be cast to ::bigint"
        );
    }

    // Double-precision sums are not cast (they decode as f64 directly).
    assert!(sql.contains("SUM(boost_collected), 0.0) AS boost_collected"));
    assert!(sql.contains("SUM(tracked_seconds), 0.0) AS tracked_seconds"));
}

#[test]
fn boost_event_fields_writer_sql_groups_by_player_and_scales_to_percent() {
    let sql = crate::processing::PLAYER_REPLAY_BOOST_EVENT_FIELDS_SQL;

    // Grouped per absolute player (no cohort concept in the materialized table).
    assert!(sql.contains("GROUP BY replay_player_id"));
    assert!(!sql.contains("AS cohort"));
    // Same boost_pickup/boost_respawn source as the live event-field scan.
    assert!(sql.contains("'boost_pickup', 'boost_respawn'"));
    // Percent-scaled amounts and ::bigint pad counts in the stored row.
    assert!(sql.contains("* 100.0 / 255.0 AS boost_collected_big"));
    assert!(sql.contains("::bigint AS big_pads"));
}
