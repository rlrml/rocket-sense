use super::*;

#[test]
fn movement_query_parses_replay_set_filters_and_player() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("movement query should parse");

    assert_eq!(query.replay_set.team_sizes, [2]);
    assert_eq!(query.player.platform, "steam");
    assert_eq!(query.player.platform_player_id, "76561198000000000");
}

#[test]
fn movement_query_requires_player() {
    assert!(MovementStatsQuery::from_raw_query(Some("team-size=2"), None).is_err());
}

#[test]
fn movement_summary_query_splits_cohorts_and_reads_movement_facets() {
    let query = MovementStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("movement query should parse");
    let builder = build_movement_summary_query(&query);
    let sql = builder.sql();

    assert!(sql.contains("WHEN concat(actor.platform, ':', actor.platform_player_id) = ta.target_subject_id THEN 'self'"));
    assert!(sql.contains("WHEN actor.team = ta.target_team THEN 'teammate'"));
    assert!(sql.contains("ELSE 'opponent'"));
    assert!(sql.contains("event.source_stream = ANY("));
    assert!(sql.contains("event_type.key = ANY("));
    assert!(sql.contains("total_distance"));
    assert!(sql.contains("avg_speed"));
    assert!(sql.contains("time_ground"));
    assert!(sql.contains("speed_flip"));
    assert!(sql.contains("GROUP BY cohort"));
}

#[test]
fn movement_summary_streams_cover_movement_spans() {
    let streams = movement_summary_streams();
    assert!(streams.iter().any(|stream| stream == "movement"));
    assert!(streams.iter().any(|stream| stream == "powerslide"));
}
