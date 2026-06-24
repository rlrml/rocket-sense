use super::*;

#[test]
fn possession_query_parses_replay_set_filters_and_player() {
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        false,
    )
    .expect("possession query should parse");

    assert_eq!(query.replay_set.team_sizes, [2]);
    let player = query.player.expect("player filter should parse");
    assert_eq!(player.platform, "steam");
    assert_eq!(player.platform_player_id, "76561198000000000");
}

#[test]
fn possession_query_allows_missing_player() {
    let query =
        PossessionStatsQuery::from_raw_query(None, None, false).expect("empty query should parse");
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
        false,
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
        false,
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
    let query = PossessionStatsQuery::from_raw_query(Some("team-size=2"), None, false)
        .expect("possession query should parse");

    assert!(build_teammate_controlled_play_summary_query(&query).is_none());
}

#[test]
fn possession_cohort_span_query_compares_player_teammates_opponents_and_rank_peers_when_available()
{
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        false,
    )
    .expect("possession query should parse");
    let builder =
        build_possession_cohort_span_summary_query(&query, PossessionSpanFilter::All, true);
    let sql = builder.sql();

    assert!(sql.contains("'player' AS cohort"));
    assert!(sql.contains("'teammates' AS cohort"));
    assert!(sql.contains("'opponents' AS cohort"));
    assert!(sql.contains("'rank_peers' AS cohort"));
    assert!(sql.contains("rp.active_time_seconds"));
    assert!(sql.contains("SUM(active_time_seconds) AS active_time_seconds"));
    assert!(sql.contains("actor.team <> target.team"));
    assert!(sql.contains("actor.rank_tier = target.rank_tier"));
    assert!(sql.contains("detail.replay_player_id = appearance.actor_id"));
    assert!(sql.contains("GROUP BY appearance.cohort, denominator.active_time_seconds"));
}

#[test]
fn possession_cohort_span_query_omits_rank_peers_when_rank_schema_is_unavailable() {
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=3&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        false,
    )
    .expect("possession query should parse");
    let builder =
        build_possession_cohort_span_summary_query(&query, PossessionSpanFilter::All, false);
    let sql = builder.sql();

    assert!(sql.contains("'player' AS cohort"));
    assert!(sql.contains("'teammates' AS cohort"));
    assert!(sql.contains("'opponents' AS cohort"));
    assert!(!sql.contains("'rank_peers' AS cohort"));
    assert!(!sql.contains("rank_tier"));
}

#[test]
fn materialized_appearance_count_uses_full_roster_not_sparse_rows() {
    // Regression: the materialized possession table only has rows for players who
    // recorded possession events, so counting those rows undercounts cohort
    // appearances (a teammate with zero possessions was missed -> 448 vs 449).
    // Appearance counts must come from the roster (replay_players) via the same
    // cohort_appearances CTE + COUNT(DISTINCT actor_id) the live path uses.
    let query = PossessionStatsQuery::from_raw_query(
        Some("team-size=2&game-type=ranked&player-id=Steam:76561198000000000"),
        None,
        true,
    )
    .expect("possession query should parse");
    let builder = build_materialized_cohort_appearances_query(&query);
    let sql = builder.sql();

    // Roster-based: the live cohort CTEs over replay_players, counted by distinct
    // appearance (actor_id), NOT the sparse player_replay_possession rows.
    assert!(sql.contains("FROM replay_players rp"));
    assert!(sql.contains("cohort_appearances"));
    assert!(sql.contains("COUNT(DISTINCT actor_id)::bigint AS appearance_count"));
    assert!(!sql.contains("player_replay_possession"));

    // The materialized span select must no longer be the appearance-count source.
    let mut span = QueryBuilder::<Postgres>::new("");
    push_materialized_span_select(&mut span, false);
    assert!(!span.sql().contains("appearance_count"));
}
