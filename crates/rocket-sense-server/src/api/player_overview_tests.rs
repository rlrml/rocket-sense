use super::*;

#[test]
fn player_overview_query_requires_player_id() {
    let error = PlayerOverviewQuery::from_raw_query(Some("playlist=Online"), None)
        .expect_err("player overview should require a player id");
    assert!(format!("{error:?}").contains("player-id"));
}

#[test]
fn player_overview_query_parses_player_and_replay_set_filters() {
    let query = PlayerOverviewQuery::from_raw_query(
        Some("player-id=Steam:76561198000000000&playlist=Online&pro=true&include-goal-tags=false&include-rotation=false"),
        None,
    )
    .expect("player overview query should parse");

    assert_eq!(query.player.platform, "steam");
    assert_eq!(query.player.platform_player_id, "76561198000000000");
    assert_eq!(query.replay_set.playlists, ["Online"]);
    assert_eq!(query.replay_set.pro, Some(true));
    assert!(!query.include_goal_tags);
    assert!(!query.include_rotation);
}

#[test]
fn per_replay_rate_divides_by_games_and_guards_empty_sets() {
    assert_eq!(per_replay_rate(0.0, 0), None);
    assert_eq!(per_replay_rate(5.0, 0), None);
    assert_eq!(per_replay_rate(5.0, 10), Some(0.5));
    // Fair-share expected (e.g. 2 wins worth 1/3 each) over 12 games.
    assert_eq!(per_replay_rate(2.0 / 3.0, 12), Some((2.0 / 3.0) / 12.0));
}

#[test]
fn goal_tag_labels_strip_goal_suffix_and_title_case() {
    assert_eq!(goal_tag_label("aerial_goal"), "Aerial");
    assert_eq!(goal_tag_label("flip_reset_goal"), "Flip Reset");
    assert_eq!(goal_tag_label("kickoff_goal"), "Kickoff");
    assert_eq!(goal_tag_label("weird"), "Weird");
}
