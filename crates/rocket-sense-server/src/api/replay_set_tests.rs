use super::*;

fn filters_from_input(input: ReplaySetFilterInput) -> Result<ReplaySetFilters, ApiError> {
    ReplaySetFilters::from_input(input, None)
}

#[test]
fn game_type_filters_normalize_and_dedup() {
    let filters = filters_from_input(ReplaySetFilterInput {
        game_types: vec![
            " Ranked ".to_owned(),
            "casual".to_owned(),
            "ranked".to_owned(),
        ],
        ..ReplaySetFilterInput::default()
    })
    .expect("game types should parse");

    assert_eq!(filters.game_types, ["casual", "ranked"]);
}

#[test]
fn game_type_filters_reject_unknown_values() {
    let error = filters_from_input(ReplaySetFilterInput {
        game_types: vec!["scrimmage".to_owned()],
        ..ReplaySetFilterInput::default()
    });
    assert!(error.is_err());
}

#[test]
fn team_size_filters_accept_numeric_and_nvn_forms() {
    let filters = filters_from_input(ReplaySetFilterInput {
        team_sizes: vec![
            "2v2".to_owned(),
            " 3 ".to_owned(),
            "2".to_owned(),
            "1V1".to_owned(),
        ],
        ..ReplaySetFilterInput::default()
    })
    .expect("team sizes should parse");

    assert_eq!(filters.team_sizes, [1, 2, 3]);
}

#[test]
fn team_size_filters_reject_out_of_range_values() {
    for value in ["0", "5", "abc", "5v5"] {
        let error = filters_from_input(ReplaySetFilterInput {
            team_sizes: vec![value.to_owned()],
            ..ReplaySetFilterInput::default()
        });
        assert!(error.is_err(), "{value} should be rejected");
    }
}

#[test]
fn rank_filters_parse_slugs_and_render_target_player_clauses() {
    let player = PlayerStatFilter::new("Steam", "76561198000000000").unwrap();
    let filters = filters_from_input(ReplaySetFilterInput {
        min_rank: Some("diamond-1".to_owned()),
        max_rank: Some("ssl".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("rank filters should parse");

    assert_eq!(filters.min_rank_tier, Some(13));
    assert_eq!(filters.max_rank_tier, Some(22));

    let mut builder = QueryBuilder::<Postgres>::new(
        "SELECT r.id FROM replay_players rp JOIN replays r ON r.id = rp.replay_id",
    );
    append_target_player_replay_set_filters(&mut builder, &filters, &player);
    let sql = builder.sql();

    assert!(sql.contains("rp.rank_tier IS NOT NULL"));
    assert!(sql.contains("rp.rank_tier >="));
    assert!(sql.contains("rp.rank_tier <="));
}

#[test]
fn rank_filters_reject_inverted_ranges() {
    let error = filters_from_input(ReplaySetFilterInput {
        min_rank: Some("champion-1".to_owned()),
        max_rank: Some("diamond-1".to_owned()),
        ..ReplaySetFilterInput::default()
    });

    assert!(error.is_err());
}

#[test]
fn replay_set_filters_render_game_type_and_team_size_clauses() {
    let filters = filters_from_input(ReplaySetFilterInput {
        game_types: vec!["ranked".to_owned()],
        team_sizes: vec!["2".to_owned()],
        ..ReplaySetFilterInput::default()
    })
    .expect("filters should parse");

    let mut builder = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    append_replay_set_filters(&mut builder, &filters, "r");
    let sql = builder.sql();

    assert!(sql.contains("r.replay_game_type = ANY("));
    assert!(sql.contains("team_player_count"));
}

#[test]
fn playlist_group_key_combines_context_and_team_size() {
    let mut builder = QueryBuilder::<Postgres>::new("SELECT ");
    push_playlist_group_key_expression(&mut builder, "r");
    let sql = builder.sql();

    // Context comes from replay_game_type with a textual playlist fallback.
    assert!(sql.contains("r.replay_game_type"));
    assert!(sql.contains("LIKE 'ranked%'"));
    // Team size labels are appended to the context.
    assert!(sql.contains("'2v2'"));
    assert!(sql.contains("|| '-' ||"));
    // Roster entries without active time (e.g. spectating referees) are
    // excluded from the team-size derivation.
    assert!(sql.contains("active_time_seconds IS NULL OR"));
    // Replays without a derivable team size fall back to the raw playlist.
    assert!(sql.contains("NULLIF(btrim(r.playlist), '')"));
}
