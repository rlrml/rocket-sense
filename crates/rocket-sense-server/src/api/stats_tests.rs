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
            status: Some(" Parsed ".to_owned()),
            player_id: Some(" Steam : 76561198000000000 ".to_owned()),
            include_teammates: Some(true),
            count: Some(500),
            group_by: Some(" playlist ".to_owned()),
            ..StatAggregatesQuery::default()
        },
        Some(uploader_id),
    )
    .expect("filters should parse");

    assert_eq!(filters.search_pattern, Some("%replay\\_100\\%%".to_owned()));
    assert_eq!(filters.player_name_patterns, ["%Zen%"]);
    assert_eq!(filters.playlists, ["ranked-doubles", "ranked-duels"]);
    assert_eq!(
        filters.file_sha256s,
        ["0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"]
    );
    assert_eq!(filters.group_id, Some(group_id));
    assert_eq!(filters.project_id, Some(project_id));
    assert_eq!(filters.maps, ["Stadium_P"]);
    assert_eq!(filters.pro, Some(true));
    assert_eq!(filters.uploader_user_id, Some(uploader_id));
    assert_eq!(filters.status, Some("parsed".to_owned()));
    assert_eq!(filters.limit, 200);
    assert_eq!(filters.group_by, Some(StatAggregateGroupBy::Playlist));
    assert!(filters.include_teammates);
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
fn stat_aggregate_filters_reject_invalid_inputs() {
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
