use super::*;

#[test]
fn event_stats_query_reuses_replay_set_filters_and_parses_event_options() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let query = EventStatsQuery::from_raw_query(
        Some(&format!(
            "replay-id={replay_id}&playlist=Online&player-id=Steam:76561198000000000&role=taker&sample-count=250&dimension-limit=250&include-samples=false"
        )),
        None,
    )
    .expect("event stats query should parse");

    assert_eq!(query.replay_set.replay_ids, [replay_id]);
    assert_eq!(query.replay_set.playlists, ["Online"]);
    assert_eq!(query.role.as_deref(), Some("taker"));
    assert!(query.kickoff_spawn.is_empty());
    assert_eq!(query.sample_count, MAX_SAMPLE_COUNT);
    assert_eq!(query.dimension_limit, MAX_DIMENSION_LIMIT);
    assert!(!query.include_samples);

    let player = query.player.expect("player filter should parse");
    assert_eq!(player.platform, "steam");
    assert_eq!(player.platform_player_id, "76561198000000000");
}

#[test]
fn event_stats_query_parses_kickoff_shape_and_side_filters() {
    let query =
        EventStatsQuery::from_raw_query(Some("kickoff-shape=diagonal&kickoff-side=left"), None)
            .expect("kickoff filters should parse");

    assert_eq!(query.kickoff_spawn.shape, Some(KickoffSpawnShape::Diagonal));
    assert_eq!(query.kickoff_spawn.side, Some(KickoffSpawnSide::Left));
    assert_eq!(query.kickoff_spawn.spawn_positions(), ["diagonal_left"]);
}

#[test]
fn kickoff_spawn_filter_collapses_side_independently_from_shape() {
    let diagonal = KickoffSpawnFilter {
        shape: Some(KickoffSpawnShape::Diagonal),
        side: None,
    };
    assert_eq!(
        diagonal.spawn_positions(),
        ["diagonal_left", "diagonal_right"]
    );

    let right_side = KickoffSpawnFilter {
        shape: None,
        side: Some(KickoffSpawnSide::Right),
    };
    assert_eq!(
        right_side.spawn_positions(),
        ["diagonal_right", "off_center_right"]
    );

    let impossible = KickoffSpawnFilter {
        shape: Some(KickoffSpawnShape::Center),
        side: Some(KickoffSpawnSide::Left),
    };
    assert!(impossible.spawn_positions().is_empty());
}

#[test]
fn event_stats_adapter_accepts_kickoff_aliases() {
    assert_eq!(event_stats_adapter("kickoff").unwrap().family, "kickoff");
    assert_eq!(event_stats_adapter("kickoffs").unwrap().family, "kickoff");
    assert!(event_stats_adapter("unknown").is_err());
}

#[test]
fn kickoff_metrics_expose_taker_time_to_touch_not_absolute_first_touch() {
    let metrics = kickoff_metrics(KickoffSummaryRow {
        replay_count: 1,
        event_count: 1,
        row_count: 1,
        taker_count: 1,
        support_count: 0,
        touched_count: 1,
        first_touch_count: 1,
        missed_count: 0,
        fake_count: 0,
        win_count: 1,
        loss_count: 0,
        neutral_count: 0,
        kickoff_goals_for: 0,
        kickoff_goals_against: 0,
        advantages_for: 1,
        advantages_against: 0,
        no_advantage_count: 0,
        avg_taker_time_to_touch: Some(2.1),
        avg_boost_after: None,
        avg_boost_delta: None,
    });

    let time_to_touch = metrics
        .iter()
        .find(|metric| metric.key == "avg_taker_time_to_touch")
        .expect("taker time-to-touch metric should be exposed");
    assert_eq!(time_to_touch.value, Some(2.1));
    let first_touch_share = metrics
        .iter()
        .find(|metric| metric.key == "first_touch_share")
        .expect("first touch percentage metric should be exposed");
    assert_eq!(first_touch_share.value, Some(1.0));
    // The old key averaged absolute replay timestamps pooled across roles.
    assert!(metrics
        .iter()
        .all(|metric| metric.key != "avg_first_touch_time"));
}
