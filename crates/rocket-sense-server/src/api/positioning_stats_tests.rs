use super::*;

#[test]
fn positioning_query_parses_replay_set_filters_and_player() {
    let query = PositioningStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("positioning query should parse");

    assert_eq!(query.replay_set.team_sizes, [2]);
    assert_eq!(query.player.platform, "steam");
    assert_eq!(query.player.platform_player_id, "76561198000000000");
}

#[test]
fn positioning_query_requires_player() {
    // Cohorts are defined relative to a target player, so a missing player-id is
    // a client error rather than an empty 200.
    assert!(PositioningStatsQuery::from_raw_query(Some("team-size=2"), None).is_err());
}

#[test]
fn positioning_summary_query_materialized_splits_cohorts_over_filtered_replays() {
    let query = PositioningStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("positioning query should parse");
    let builder = build_positioning_summary_query_materialized(&query);
    let sql = builder.sql();

    // Cohort split read from the materialized positioning table by (replay, team).
    assert!(sql.contains("player_replay_positioning"));
    assert!(sql.contains("'self'::text AS cohort"));
    assert!(sql.contains("'teammate'::text AS cohort"));
    assert!(sql.contains("'opponent'::text AS cohort"));
    // Match filters apply through the shared replay-set helper (game-type joins
    // the replays table).
    assert!(sql.contains("target_appearances"));
    // Facet aggregates the graphs read.
    assert!(sql.contains("SUM(defensive_third_seconds)"));
    assert!(sql.contains("SUM(closest_team_seconds)"));
    assert!(sql.contains("SUM(distance_to_ball_weighted)"));
    assert!(sql.contains("GROUP BY cohort"));
}
