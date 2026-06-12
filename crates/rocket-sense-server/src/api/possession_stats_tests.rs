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
    assert_eq!(field_half_from_third("team_zero_third"), "team_zero_side");
    assert_eq!(field_half_from_third("neutral_third"), "neutral");
    assert_eq!(field_half_from_third("team_one_third"), "team_one_side");
}

#[test]
fn possession_time_bucket_computes_share() {
    let bucket = possession_time_bucket("team_zero_side", "Blue half", 2.0, 5.0);
    assert_eq!(bucket.key, "team_zero_side");
    assert_eq!(bucket.label, "Blue half");
    assert_eq!(bucket.duration_seconds, 2.0);
    assert_eq!(bucket.share, Some(0.4));

    let empty = possession_time_bucket("neutral", "Neutral", 0.0, 0.0);
    assert_eq!(empty.share, None);
}
