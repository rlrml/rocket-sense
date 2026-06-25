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
fn field_thirds_map_to_field_halves() {
    assert_eq!(field_half_from_third("own_third"), "own_side");
    assert_eq!(field_half_from_third("team_zero_third"), "team_zero_side");
    assert_eq!(field_half_from_third("neutral_third"), "neutral");
    assert_eq!(field_half_from_third("opponent_third"), "opponent_side");
    assert_eq!(field_half_from_third("team_one_third"), "team_one_side");
}

#[test]
fn field_thirds_orient_to_player_side_when_player_team_is_known() {
    assert_eq!(
        possession_third_key("team_zero_third", Some(0)),
        "own_third"
    );
    assert_eq!(
        possession_third_key("team_one_third", Some(0)),
        "opponent_third"
    );
    assert_eq!(possession_third_key("team_one_third", Some(1)), "own_third");
    assert_eq!(
        possession_third_key("team_zero_third", Some(1)),
        "opponent_third"
    );
    assert_eq!(
        possession_third_key("team_zero_third", None),
        "team_zero_third"
    );
}

#[test]
fn team_metrics_orient_raw_values_to_player_team() {
    // Possession share.
    assert_eq!(
        TeamMetricKind::Possession.orient("team_zero", Some(0)),
        Some("own_team")
    );
    assert_eq!(
        TeamMetricKind::Possession.orient("team_zero", Some(1)),
        Some("opponent_team")
    );
    assert_eq!(
        TeamMetricKind::Possession.orient("team_one", Some(1)),
        Some("own_team")
    );
    assert_eq!(
        TeamMetricKind::Possession.orient("neutral", Some(0)),
        Some("neutral")
    );
    // Ball half.
    assert_eq!(
        TeamMetricKind::BallHalf.orient("team_one_side", Some(0)),
        Some("opponent_side")
    );
    assert_eq!(
        TeamMetricKind::BallHalf.orient("team_one_side", Some(1)),
        Some("own_side")
    );
    // Ball thirds.
    assert_eq!(
        TeamMetricKind::BallThird.orient("team_zero_third", Some(1)),
        Some("opponent_third")
    );
    assert_eq!(
        TeamMetricKind::BallThird.orient("neutral_third", Some(0)),
        Some("neutral_third")
    );
    // Unknown team or unrecognized values drop out.
    assert_eq!(TeamMetricKind::Possession.orient("team_zero", None), None);
    assert_eq!(TeamMetricKind::BallHalf.orient("garbage", Some(0)), None);
}

#[test]
fn team_metric_slots_preserve_bucket_order_and_share() {
    let mut accumulator = TeamSplitAccumulator::new();
    accumulator.add(TeamMetricKind::BallHalf, "own_side", 3.0);
    accumulator.add(TeamMetricKind::BallHalf, "opponent_side", 1.0);
    let split = accumulator.into_split(7);
    assert_eq!(split.replay_count, 7);

    let halves = split.ball_halves;
    assert_eq!(halves.total_duration_seconds, 4.0);
    let keys: Vec<_> = halves.buckets.iter().map(|b| b.key.as_str()).collect();
    assert_eq!(keys, vec!["own_side", "neutral", "opponent_side"]);
    assert_eq!(halves.buckets[0].label, "Your half");
    assert_eq!(halves.buckets[0].share, Some(0.75));
    assert_eq!(halves.buckets[1].duration_seconds, 0.0);
}

#[test]
fn possession_time_bucket_computes_share() {
    let bucket = possession_time_bucket("own_side", "Own half", 2.0, 5.0);
    assert_eq!(bucket.key, "own_side");
    assert_eq!(bucket.label, "Own half");
    assert_eq!(bucket.duration_seconds, 2.0);
    assert_eq!(bucket.share, Some(0.4));

    let empty = possession_time_bucket("neutral", "Neutral", 0.0, 0.0);
    assert_eq!(empty.share, None);
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
