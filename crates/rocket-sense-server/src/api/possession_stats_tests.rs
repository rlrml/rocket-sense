use super::*;

#[test]
fn possession_query_parses_replay_set_filters_and_player() {
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("possession query should parse");

    assert_eq!(query.replay_set.team_sizes, [2]);
    let player = query.player.expect("player filter should parse");
    assert_eq!(player.platform, "steam");
    assert_eq!(player.platform_player_id, "76561198000000000");
}

#[test]
fn possession_query_allows_missing_player() {
    let query = PossessionStatsQuery::from_raw_query(None, None).expect("empty query should parse");
    assert!(query.player.is_none());
}

#[test]
fn duration_buckets_are_contiguous_and_open_ended() {
    let mut previous_upper = Some(0.0);
    for (_, _, lower, upper) in DURATION_BUCKETS {
        assert_eq!(Some(*lower), previous_upper, "buckets must be contiguous");
        previous_upper = *upper;
    }
    assert_eq!(previous_upper, None, "last bucket must be open-ended");
}

#[test]
fn controlled_play_span_query_filters_to_sustained_control() {
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("possession query should parse");
    let mut builder = QueryBuilder::<Postgres>::new("");

    push_possession_span_select(&mut builder);
    push_possession_from(&mut builder, &query);
    push_possession_span_filter(&mut builder, PossessionSpanFilter::SustainedControl);
    let sql = builder.sql();

    assert!(sql.contains("play_event_player_possession_details detail"));
    assert!(sql.contains("detail.player_subject_id ="));
    assert!(sql.contains("detail.sustained_control"));
}

#[test]
fn teammate_controlled_play_query_compares_same_team_appearances() {
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
    )
    .expect("possession query should parse");
    let builder = build_teammate_controlled_play_summary_query(&query)
        .expect("teammate query should be available with player filter");
    let sql = builder.sql();

    assert!(sql.contains("teammate.team = target.team"));
    assert!(sql.contains("teammate.id <> target.id"));
    assert!(sql.contains("detail.replay_player_id = appearance.id"));
    assert!(sql.contains("teammate_appearance_count"));
    assert!(sql.contains("detail.sustained_control"));
}

#[test]
fn teammate_controlled_play_query_requires_player_filter() {
    let query = PossessionStatsQuery::from_raw_query(Some("team-size=2"), None)
        .expect("possession query should parse");

    assert!(build_teammate_controlled_play_summary_query(&query).is_none());
}
