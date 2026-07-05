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

#[test]
fn teammate_role_delta_query_targets_two_v_two_teammate_samples() {
    let query = PositioningStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("positioning query should parse");
    let builder = build_teammate_role_delta_query(&query);
    let sql = builder.sql();

    assert!(sql.contains("target_appearances"));
    assert!(sql.contains("team_counts"));
    assert!(sql.contains("twos_replays"));
    assert!(sql.contains("HAVING COUNT(*) = 2 AND bool_and(team_players = 2)"));
    assert!(sql.contains("mate.player_subject_id <> ta.player_subject_id"));
    assert!(sql.contains("role_most_forward_seconds"));
    assert!(sql.contains("delta_pp"));
}

#[test]
fn teammate_role_delta_buckets_are_centered_five_point_buckets() {
    let buckets = role_delta_bucket_templates();

    assert_eq!(buckets.len(), 23);
    assert_eq!(buckets[0].key, "back-tail");
    assert_eq!(buckets[0].label, ">52.5");
    assert_eq!(buckets[11].key, "neutral");
    assert_eq!(buckets[11].label, "-2.5..+2.5");
    assert_eq!(buckets[22].key, "forward-tail");
    assert_eq!(buckets[22].label, ">52.5");

    assert_eq!(
        buckets
            .iter()
            .find(|bucket| role_delta_bucket_contains(bucket, -2.5))
            .map(|bucket| bucket.key.as_str()),
        Some("neutral")
    );
    assert_eq!(
        buckets
            .iter()
            .find(|bucket| role_delta_bucket_contains(bucket, 2.5))
            .map(|bucket| bucket.key.as_str()),
        Some("neutral")
    );
    assert_eq!(
        buckets
            .iter()
            .find(|bucket| role_delta_bucket_contains(bucket, -2.51))
            .map(|bucket| bucket.key.as_str()),
        Some("back-n7_5-n2_5")
    );
    assert_eq!(
        buckets
            .iter()
            .find(|bucket| role_delta_bucket_contains(bucket, 2.51))
            .map(|bucket| bucket.key.as_str()),
        Some("forward-2_5-7_5")
    );
}
