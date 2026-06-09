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
    assert_eq!(query.sample_count, MAX_SAMPLE_COUNT);
    assert_eq!(query.dimension_limit, MAX_DIMENSION_LIMIT);
    assert!(!query.include_samples);

    let player = query.player.expect("player filter should parse");
    assert_eq!(player.platform, "steam");
    assert_eq!(player.platform_player_id, "76561198000000000");
}

#[test]
fn event_stats_adapter_accepts_kickoff_aliases() {
    assert_eq!(event_stats_adapter("kickoff").unwrap().family, "kickoff");
    assert_eq!(event_stats_adapter("kickoffs").unwrap().family, "kickoff");
    assert!(event_stats_adapter("unknown").is_err());
}
