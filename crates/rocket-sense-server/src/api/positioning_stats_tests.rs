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
fn positioning_summary_query_splits_cohorts_over_filtered_replays() {
    let query = PositioningStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("positioning query should parse");
    let builder = build_positioning_summary_query(&query);
    let sql = builder.sql();

    // Cohort split: self by subject, teammate/opponent by the actor's team
    // relative to the target's team in that replay.
    assert!(sql.contains("WHEN event.primary_subject_id = ta.target_subject_id THEN 'self'"));
    assert!(sql.contains("WHEN actor.team = ta.target_team THEN 'teammate'"));
    assert!(sql.contains("ELSE 'opponent'"));
    // Actor team resolved via the replay_player whose subject id matches.
    assert!(
        sql.contains("concat(actor.platform, ':', actor.platform_player_id) = event.primary_subject_id")
    );
    // Match filters apply through the shared replay-set helper (game-type joins
    // the replays table).
    assert!(sql.contains("target_appearances"));
    // Facet aggregates the graphs read.
    assert!(sql.contains("stream = 'field_third' AND payload->>'state' = 'defensive'"));
    assert!(sql.contains("payload->'state'->>'closest_to_ball_team' = 'true'"));
    assert!(sql.contains("payload->'distance_to_ball'"));
    assert!(sql.contains("GROUP BY cohort"));
}

#[test]
fn positioning_summary_streams_cover_the_player_state_facets() {
    let streams = positioning_summary_streams();
    for expected in [
        "player_activity",
        "field_third",
        "ball_depth",
        "depth_role",
        "ball_proximity",
        "positioning_distance",
    ] {
        assert!(
            streams.iter().any(|stream| stream == expected),
            "missing positioning stream {expected}"
        );
    }
}
