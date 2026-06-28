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
fn game_type_filters_treat_any_and_all_as_unfiltered() {
    let filters = filters_from_input(ReplaySetFilterInput {
        game_types: vec![" any ".to_owned(), "ALL".to_owned()],
        ..ReplaySetFilterInput::default()
    })
    .expect("all-game-type sentinels should be ignored");

    assert!(filters.game_types.is_empty());
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
fn team_size_filters_treat_all_and_any_as_unfiltered() {
    let filters = filters_from_input(ReplaySetFilterInput {
        team_sizes: vec![" all ".to_owned(), "ANY".to_owned()],
        ..ReplaySetFilterInput::default()
    })
    .expect("all-team-size sentinels should be ignored");

    assert!(filters.team_sizes.is_empty());
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
fn player_outcome_filter_requires_target_player() {
    let error = filters_from_input(ReplaySetFilterInput {
        player_outcome: Some("win".to_owned()),
        ..ReplaySetFilterInput::default()
    });
    assert!(error.is_err());
}

#[test]
fn player_outcome_filter_renders_score_predicate() {
    let filters = filters_from_input(ReplaySetFilterInput {
        target_player_id: Some("steam:abc123".to_owned()),
        player_outcome: Some("loss".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("player outcome should parse");

    let mut builder = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    append_replay_set_filters(&mut builder, &filters, "r");
    let sql = builder.sql();

    assert!(sql.contains("outcome_player.platform"));
    assert!(sql.contains("r.team_zero_score < r.team_one_score"));
    assert!(sql.contains("r.team_zero_score > r.team_one_score"));
}

#[test]
fn rank_range_filter_parses_slugs_and_tiers() {
    let filters = filters_from_input(ReplaySetFilterInput {
        min_rank: Some("diamond-1".to_owned()),
        max_rank: Some("18".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("rank range should parse");

    assert_eq!(filters.min_rank_tier, Some(13));
    assert_eq!(filters.max_rank_tier, Some(18));
}

#[test]
fn rank_range_filter_rejects_inverted_bounds() {
    let error = filters_from_input(ReplaySetFilterInput {
        min_rank: Some("grand-champion-1".to_owned()),
        max_rank: Some("diamond-1".to_owned()),
        ..ReplaySetFilterInput::default()
    });
    assert!(error.is_err());
}

#[test]
fn rank_range_filter_scopes_to_target_player_when_present() {
    let filters = filters_from_input(ReplaySetFilterInput {
        target_player_id: Some("steam:abc123".to_owned()),
        min_rank: Some("champion-1".to_owned()),
        max_rank: Some("ssl".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("rank range should parse");

    let mut builder = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    append_replay_set_filters(&mut builder, &filters, "r");
    let sql = builder.sql();

    assert!(sql.contains("EXISTS (SELECT 1 FROM replay_players stats_rank_player"));
    assert!(sql.contains("stats_rank_player.replay_id = r.id"));
    assert!(sql.contains("stats_rank_player.platform = "));
    assert!(sql.contains("stats_rank_player.platform_player_id = "));
    assert!(sql.contains("stats_rank_player.rank_tier >= "));
    assert!(sql.contains("stats_rank_player.rank_tier <= "));
}

#[test]
fn rank_range_filter_matches_any_player_without_target() {
    let filters = filters_from_input(ReplaySetFilterInput {
        min_rank: Some("champion-1".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("rank range should parse");

    let mut builder = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    append_replay_set_filters(&mut builder, &filters, "r");
    let sql = builder.sql();

    assert!(sql.contains("stats_rank_player.rank_tier >= "));
    // No target player => no player-identity predicate scopes the EXISTS.
    assert!(!sql.contains("stats_rank_player.platform = "));
}

#[test]
fn season_range_filter_parses_eras_into_ordinals() {
    let filters = filters_from_input(ReplaySetFilterInput {
        min_season: Some("s12".to_owned()),
        max_season: Some("F1".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("season range should parse");

    // Legacy s12 sorts strictly before free-to-play f1.
    assert_eq!(filters.min_season_ord, Some(12));
    assert_eq!(filters.max_season_ord, Some(SEASON_ERA_STRIDE + 1));
    assert!(filters.min_season_ord < filters.max_season_ord);
}

#[test]
fn season_range_filter_rejects_inverted_bounds() {
    let error = filters_from_input(ReplaySetFilterInput {
        min_season: Some("f5".to_owned()),
        max_season: Some("s12".to_owned()),
        ..ReplaySetFilterInput::default()
    });
    assert!(error.is_err());
}

#[test]
fn season_range_filter_rejects_malformed_codes() {
    for value in ["", "x3", "s", "s0", "12", "f-3"] {
        let error = filters_from_input(ReplaySetFilterInput {
            min_season: Some(value.to_owned()),
            ..ReplaySetFilterInput::default()
        });
        assert!(error.is_err(), "{value} should be rejected");
    }
}

#[test]
fn season_range_filter_renders_ordinal_expression() {
    let filters = filters_from_input(ReplaySetFilterInput {
        min_season: Some("f1".to_owned()),
        max_season: Some("f23".to_owned()),
        ..ReplaySetFilterInput::default()
    })
    .expect("season range should parse");

    let mut builder = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    append_replay_set_filters(&mut builder, &filters, "r");
    let sql = builder.sql();

    assert!(sql.contains("lower(btrim(r.season)) ~ '^[sf][0-9]+$'"));
    assert!(sql.contains(">= "));
    assert!(sql.contains("<= "));
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
