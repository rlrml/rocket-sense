use super::*;
use crate::api::replay_set::ReplaySetFilterInput;

fn filters_from_query(raw_query: &str) -> ReplaySetFilters {
    let params = QueryParams::from_raw(Some(raw_query));
    let input = ReplaySetFilterInput::from_query_params(&params).expect("input should parse");
    ReplaySetFilters::from_input(input, None).expect("filters should build")
}

#[test]
fn paging_defaults_and_clamps() {
    let params = QueryParams::from_raw(Some(""));
    let paging = LeaderboardPaging::from_params(&params).unwrap();
    assert_eq!(paging.count, DEFAULT_LIMIT);
    assert_eq!(paging.offset, 0);

    let params = QueryParams::from_raw(Some("count=10000&offset=25"));
    let paging = LeaderboardPaging::from_params(&params).unwrap();
    assert_eq!(paging.count, MAX_LIMIT);
    assert_eq!(paging.offset, 25);

    let params = QueryParams::from_raw(Some("count=0"));
    let paging = LeaderboardPaging::from_params(&params).unwrap();
    assert_eq!(paging.count, 1);
}

#[test]
fn paging_rejects_non_numeric() {
    let params = QueryParams::from_raw(Some("count=abc"));
    assert!(LeaderboardPaging::from_params(&params).is_err());
}

#[test]
fn next_offset_advances_until_exhausted() {
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    assert_eq!(paging.next_offset(50, 120), Some(50));
    assert_eq!(paging.next_offset(50, 50), None);

    let paging = LeaderboardPaging {
        count: 50,
        offset: 100,
    };
    assert_eq!(paging.next_offset(20, 120), None);
}

#[test]
fn uploads_rows_query_groups_and_paginates() {
    let filters = filters_from_query("game-type=ranked&team-size=2");
    let paging = LeaderboardPaging {
        count: 25,
        offset: 50,
    };
    let sql = uploads_rows_query(&filters, None, &paging).into_sql();

    assert!(sql.contains("FROM replays r JOIN users u ON u.id = r.uploaded_by_user_id"));
    assert!(sql.contains("r.uploaded_by_user_id IS NOT NULL"));
    assert!(sql.contains("r.replay_game_type = ANY("));
    assert!(sql.contains("GROUP BY r.uploaded_by_user_id"));
    assert!(sql.contains("ORDER BY upload_count DESC"));
    assert!(sql.contains("LIMIT"));
    assert!(sql.contains("OFFSET"));
    // The leaderboard must never leak uploader email addresses.
    assert!(!sql.contains("primary_email"));
}

#[test]
fn uploads_total_query_counts_distinct_uploaders() {
    let filters = filters_from_query("");
    let sql = uploads_total_query(&filters, None).into_sql();
    assert!(sql.contains("COUNT(DISTINCT r.uploaded_by_user_id)"));
    assert!(sql.contains("r.uploaded_by_user_id IS NOT NULL"));
    assert!(sql.contains("NOT r.exclude_from_aggregates"));
}

#[test]
fn appearances_rank_query_counts_distinct_replays() {
    let filters = filters_from_query("playlist=ranked-doubles");
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    let sql = appearances_rank_query(&filters, None, &paging).into_sql();

    assert!(sql.contains("COUNT(DISTINCT rp.replay_id) AS appearance_count"));
    assert!(sql.contains("FROM replay_players rp JOIN replays r ON r.id = rp.replay_id"));
    assert!(sql.contains("r.playlist = ANY("));
    assert!(sql.contains("GROUP BY rp.platform, rp.platform_player_id"));
    assert!(sql.contains("ORDER BY appearance_count DESC"));
    // The full-set rank query stays lean so it can ride the covering index; the
    // pro flag is resolved per-page in load_appearance_profiles instead.
    assert!(!sql.contains("is_pro"));
}

#[test]
fn appearances_rank_query_joins_replays_for_default_incomplete_game_exclusion() {
    let filters = filters_from_query("");
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    let sql = appearances_rank_query(&filters, None, &paging).into_sql();

    assert!(sql.contains("FROM replay_players rp JOIN replays r ON r.id = rp.replay_id"));
    assert!(sql.contains("NOT r.exclude_from_aggregates"));
    assert!(sql.contains("player_identity_tags aggregate_excluded_tag"));
    assert!(sql.contains("aggregate_excluded_tag.exclude_from_aggregates"));
    assert!(sql.contains("GROUP BY rp.platform, rp.platform_player_id"));
}

#[test]
fn appearances_rank_query_omits_replays_join_when_incomplete_games_are_explicitly_included() {
    let filters = filters_from_query("include-incomplete-games=true");
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    let sql = appearances_rank_query(&filters, None, &paging).into_sql();

    assert!(sql.contains("FROM replay_players rp WHERE"));
    assert!(!sql.contains("JOIN replays"));
    assert!(!sql.contains("r.exclude_from_aggregates"));
    assert!(sql.contains("player_identity_tags aggregate_excluded_tag"));
    assert!(sql.contains("aggregate_excluded_tag.exclude_from_aggregates"));
    assert!(sql.contains("GROUP BY rp.platform, rp.platform_player_id"));
}

#[test]
fn appearances_total_query_wraps_grouped_subquery() {
    let filters = filters_from_query("");
    let sql = appearances_total_query(&filters, None).into_sql();
    assert!(sql.contains("SELECT COUNT(*) AS total FROM (SELECT 1"));
    assert!(sql.contains("GROUP BY rp.platform, rp.platform_player_id) ranked_players"));
}

#[test]
fn appearances_rank_query_rejects_invalid_game_type() {
    let params = QueryParams::from_raw(Some("game-type=bogus"));
    let input = ReplaySetFilterInput::from_query_params(&params).unwrap();
    assert!(ReplaySetFilters::from_input(input, None).is_err());
}

#[test]
fn leaderboard_filters_parse_exact_season_and_replay_date_range() {
    let (filters, _, _) = parse_filters(
        Some(
            "season=f18&replay-date-after=2026-01-01T00%3A00%3A00Z&replay-date-before=2026-01-31T23%3A59%3A59.999Z",
        ),
        None,
    )
    .expect("filters should parse");

    assert_eq!(filters.seasons, ["f18"]);
    assert!(filters.replay_date_after.is_some());
    assert!(filters.replay_date_before.is_some());
}

#[test]
fn season_window_with_explicit_range_does_not_add_current_season_filter() {
    let filters = filters_from_query("min-season=f20&max-season=f23");
    let mut builder = QueryBuilder::<Postgres>::new("SELECT r.id FROM replays r WHERE TRUE");
    append_replay_set_filters(&mut builder, &filters, "r");
    push_live_window_filter(&mut builder, Some(LeaderboardWindow::Season), &filters, "r");
    let sql = builder.sql();

    assert!(sql.contains("lower(btrim(r.season))"));
    assert!(!sql.contains("FROM replays current_replay"));
}

#[test]
fn leaderboard_window_parses_standard_windows() {
    for (raw, expected) in [
        ("window=daily", LeaderboardWindow::Daily),
        ("window=trailing-7d", LeaderboardWindow::TrailingSevenDays),
        ("window=season", LeaderboardWindow::Season),
    ] {
        let params = QueryParams::from_raw(Some(raw));
        assert_eq!(
            LeaderboardWindow::from_params(&params).unwrap(),
            Some(expected)
        );
    }

    let params = QueryParams::from_raw(Some("window=forever"));
    assert!(LeaderboardWindow::from_params(&params).is_err());
}

#[test]
fn cached_scope_accepts_only_single_standard_dimensions() {
    let filters = filters_from_query("game-type=ranked&team-size=2&playlist=ranked-doubles");
    let scope =
        CachedLeaderboardScope::from_filters(Some(LeaderboardWindow::TrailingSevenDays), &filters)
            .expect("standard scope should use the cache");
    assert_eq!(scope.game_type, "ranked");
    assert_eq!(scope.team_size, 2);
    assert_eq!(scope.playlist, "ranked-doubles");

    let filters = filters_from_query("game-type=ranked&game-type=casual");
    assert!(CachedLeaderboardScope::from_filters(
        Some(LeaderboardWindow::TrailingSevenDays),
        &filters
    )
    .is_none());

    // The cache is the default aggregate-included population, so an explicit
    // include-incomplete-games request must fall back to the live query.
    let filters = filters_from_query("include-incomplete-games=true");
    assert!(CachedLeaderboardScope::from_filters(
        Some(LeaderboardWindow::TrailingSevenDays),
        &filters
    )
    .is_none());
}

#[test]
fn cached_scope_accepts_season_ranges_only_for_the_season_window() {
    let filters = filters_from_query("min-season=f20&max-season=f23&game-type=ranked");
    let scope = CachedLeaderboardScope::from_filters(Some(LeaderboardWindow::Season), &filters)
        .expect("season ranges should use per-season cache rows");
    assert!(scope.has_season_range());
    assert_eq!(scope.min_season_ord, Some(1020));
    assert_eq!(scope.max_season_ord, Some(1023));

    assert!(CachedLeaderboardScope::from_filters(
        Some(LeaderboardWindow::TrailingSevenDays),
        &filters
    )
    .is_none());
}

#[test]
fn cached_appearance_range_query_sums_season_rows_per_player() {
    let filters = filters_from_query("min-season=f20&max-season=f23&game-type=ranked");
    let scope = CachedLeaderboardScope::from_filters(Some(LeaderboardWindow::Season), &filters)
        .expect("season range should use cache");
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    let sql = cached_appearances_rank_query(&scope, &paging).into_sql();

    assert!(sql.contains("SUM(cached.replay_count)::bigint AS appearance_count"));
    assert!(sql.contains("GROUP BY cached.platform, cached.platform_player_id"));
    assert!(sql.contains("lower(btrim(cache_window.season))"));
}

#[test]
fn leaderboard_rank_playlist_ids_use_ranked_playlist_filter() {
    let filters = filters_from_query("playlist=ranked-doubles");
    assert_eq!(rank_playlist_ids_for_filters(&filters), vec![11]);
}

#[test]
fn leaderboard_rank_playlist_ids_infer_ranked_mode_from_team_size() {
    let filters = filters_from_query("game-type=ranked&team-size=3");
    assert_eq!(rank_playlist_ids_for_filters(&filters), vec![13]);
}

#[test]
fn leaderboard_rank_playlist_ids_skip_ambiguous_or_unranked_scopes() {
    let filters = filters_from_query("playlist=ranked-duels&playlist=ranked-doubles");
    assert_eq!(rank_playlist_ids_for_filters(&filters), vec![10, 11]);

    let filters = filters_from_query("game-type=casual&team-size=2");
    assert!(rank_playlist_ids_for_filters(&filters).is_empty());
}

#[test]
fn event_sort_parses_aliases_and_rejects_unknown() {
    assert_eq!(EventSort::from_query(None).unwrap(), EventSort::Total);
    assert_eq!(
        EventSort::from_query(Some("total")).unwrap(),
        EventSort::Total
    );
    assert_eq!(
        EventSort::from_query(Some("per-game")).unwrap(),
        EventSort::PerGame
    );
    assert_eq!(
        EventSort::from_query(Some("per_minute")).unwrap(),
        EventSort::PerMinute
    );
    assert!(EventSort::from_query(Some("sideways")).is_err());
}

#[test]
fn event_filters_parse_terms_sort_and_min_games() {
    let (filters, paging) = EventLeaderboardFilters::from_query(
        Some("event-type=air_dribble&sort=per-minute&min-games=10&game-type=ranked&count=25"),
        None,
    )
    .expect("filters should parse");

    assert_eq!(filters.stat_terms, ["air_dribble"]);
    assert_eq!(filters.sort, EventSort::PerMinute);
    assert_eq!(filters.min_games, 10);
    assert_eq!(filters.replay.game_types, ["ranked"]);
    assert_eq!(paging.count, 25);
}

#[test]
fn event_min_games_floors_at_one() {
    let (filters, _) =
        EventLeaderboardFilters::from_query(Some("min-games=0"), None).expect("parse");
    assert_eq!(filters.min_games, 1);
    let (filters, _) = EventLeaderboardFilters::from_query(Some(""), None).expect("parse");
    assert_eq!(filters.min_games, 1);
}

fn event_filters(raw_query: &str) -> (EventLeaderboardFilters, LeaderboardPaging) {
    EventLeaderboardFilters::from_query(Some(raw_query), None).expect("filters should parse")
}

#[test]
fn event_rank_query_builds_ctes_and_metric_order() {
    let (filters, paging) = event_filters("event-type=flip_reset&sort=per-minute&game-type=ranked");
    let sql = event_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("WITH event_counts AS"));
    assert!(sql.contains("denominators AS"));
    assert!(sql.contains("JOIN play_event_subjects subject ON subject.replay_player_id = rp.id"));
    assert!(sql.contains("event.analysis_run_id = r.canonical_analysis_run_id"));
    assert!(sql.contains("player_identity_tags aggregate_excluded_tag"));
    assert!(sql.contains("NOT r.exclude_from_aggregates"));
    // stat-term filter resolves to an event_types subselect
    assert!(sql.contains("event.event_type_id IN (SELECT stat_filter.id FROM event_types"));
    // replay filter applied
    assert!(sql.contains("r.replay_game_type = ANY("));
    // per-minute ranking
    assert!(sql.contains("ORDER BY per_active_minute DESC NULLS LAST, event_count DESC"));
    assert!(sql.contains("d.replay_count >= "));
    assert!(sql.contains("LIMIT"));
    assert!(sql.contains("OFFSET"));
}

#[test]
fn event_rank_query_counts_goals_from_scoreboard() {
    let (filters, paging) = event_filters("event-type=goal&sort=per-minute&team-size=2");
    let sql = event_rank_query(&filters, &paging).into_sql();

    assert_eq!(
        filters.event_count_source(),
        EventCountSource::Scoreboard { column: "goals" }
    );
    assert!(sql.contains("COALESCE(SUM(rp.goals), 0)::bigint AS event_count"));
    assert!(sql.contains("HAVING COALESCE(SUM(rp.goals), 0) > 0"));
    assert!(sql.contains("team_player_count"));
    assert!(sql.contains("NOT r.exclude_from_aggregates"));
    assert!(!sql.contains("JOIN play_event_subjects subject"));
    assert!(!sql.contains("event.event_type_id IN"));
    assert!(sql.contains("ORDER BY per_active_minute DESC NULLS LAST, event_count DESC"));
}

#[test]
fn event_rank_query_counts_core_scoreboard_stats_from_scoreboard() {
    for (query, column) in [
        ("event-type=assist", "assists"),
        ("event-type=save", "saves"),
        ("event-type=shot", "shots"),
    ] {
        let (filters, paging) = event_filters(query);
        let sql = event_rank_query(&filters, &paging).into_sql();

        assert_eq!(
            filters.event_count_source(),
            EventCountSource::Scoreboard { column }
        );
        assert!(sql.contains(&format!(
            "COALESCE(SUM(rp.{column}), 0)::bigint AS event_count"
        )));
        assert!(!sql.contains("JOIN play_event_subjects subject"));
    }
}

#[test]
fn event_rank_query_filters_directional_events_to_credit_role() {
    for (query, role) in [
        ("event-type=bump", "initiator"),
        ("event-type=demolition", "attacker"),
        ("event-type=pass", "passer"),
    ] {
        let (filters, paging) = event_filters(query);
        let sql = event_rank_query(&filters, &paging).into_sql();

        assert_eq!(
            filters.event_count_source(),
            EventCountSource::SubjectRole { role }
        );
        assert!(
            sql.contains("JOIN play_event_subjects subject ON subject.replay_player_id = rp.id")
        );
        assert!(sql.contains("AND subject.role = "));
        assert!(sql.contains("event.event_type_id IN"));
    }
}

#[test]
fn event_rank_query_orders_by_total_by_default() {
    let (filters, paging) = event_filters("event-type=air_dribble");
    let sql = event_rank_query(&filters, &paging).into_sql();
    assert_eq!(filters.event_count_source(), EventCountSource::AnySubject);
    assert!(sql.contains("ORDER BY event_count DESC, e.platform, e.platform_player_id"));
}

#[test]
fn event_total_query_counts_qualifying_players() {
    let (filters, _) = event_filters("event-type=air_dribble&min-games=5");
    let sql = event_total_query(&filters).into_sql();
    assert!(sql.contains("WITH event_counts AS"));
    assert!(sql.contains("SELECT COUNT(*) AS total FROM event_counts e"));
    assert!(sql.contains("d.replay_count >= "));
}

#[test]
fn cached_event_rate_query_is_an_ordered_player_window_read() {
    let (filters, paging) = event_filters(
        "window=trailing-7d&event-type=goal&sort=per-minute&min-games=10&game-type=ranked&team-size=2",
    );
    let scope = CachedLeaderboardScope::from_filters(filters.window, &filters.replay).unwrap();
    let sql = cached_event_rank_query(&filters, &scope, "goal", &paging).into_sql();

    assert!(sql.contains("FROM leaderboard_player_window_metrics cached"));
    assert!(sql.contains("cache_window.window_kind"));
    assert!(sql.contains("cached.metric_kind = 'event'"));
    assert!(sql.contains("cached.replay_count >="));
    assert!(sql.contains("ORDER BY cached.value_per_5_minutes DESC NULLS LAST"));
    assert!(!sql.contains("GROUP BY"));
}

#[test]
fn cached_event_range_query_recomputes_rate_after_summing_seasons() {
    let (filters, paging) = event_filters(
        "window=season&min-season=f20&max-season=f23&event-type=goal&sort=per-minute&min-games=25",
    );
    let scope = CachedLeaderboardScope::from_filters(filters.window, &filters.replay).unwrap();
    let sql = cached_event_rank_query(&filters, &scope, "goal", &paging).into_sql();

    assert!(sql.contains("SUM(cached.total_value)::float8 AS total_value"));
    assert!(sql.contains("SUM(cached.active_time_seconds)::float8 AS active_time_seconds"));
    assert!(sql.contains("aggregated.total_value * 60.0 / aggregated.active_time_seconds"));
    assert!(sql.contains("WHERE aggregated.replay_count >="));
}

#[test]
fn event_min_games_only_changes_per_five_minute_eligibility() {
    let (total, _) = event_filters("sort=total&min-games=50");
    assert_eq!(total.qualifying_min_games(), 1);
    let (rate, _) = event_filters("sort=per-minute&min-games=50");
    assert_eq!(rate.qualifying_min_games(), 50);
}

fn stat_filters(raw_query: &str) -> (StatLeaderboardFilters, LeaderboardPaging) {
    StatLeaderboardFilters::from_query(Some(raw_query), None).expect("filters should parse")
}

#[test]
fn stat_metric_parses_aliases_and_rejects_unknown() {
    assert_eq!(
        StatLeaderboardMetric::from_query(None).unwrap(),
        StatLeaderboardMetric::BallOpponentHalf
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("ball-in-opponent-half")).unwrap(),
        StatLeaderboardMetric::BallOpponentHalf
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("possession")).unwrap(),
        StatLeaderboardMetric::PossessionTime
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("advance-distance")).unwrap(),
        StatLeaderboardMetric::BallAdvance
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("touches-per-posession")).unwrap(),
        StatLeaderboardMetric::TouchesPerPossession
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("average-possession-duration")).unwrap(),
        StatLeaderboardMetric::AvgPossessionDuration
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("high-aerial-touches")).unwrap(),
        StatLeaderboardMetric::HighAerialTouchCount
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("control_touches")).unwrap(),
        StatLeaderboardMetric::ControlTouchCount
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("big-pads")).unwrap(),
        StatLeaderboardMetric::BigBoostPadCount
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("small_boost_count")).unwrap(),
        StatLeaderboardMetric::SmallBoostPadCount
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("boost-collected-big")).unwrap(),
        StatLeaderboardMetric::BigBoostAmount
    );
    assert_eq!(
        StatLeaderboardMetric::from_query(Some("amount-from-small-boosts")).unwrap(),
        StatLeaderboardMetric::SmallBoostAmount
    );
    assert!(StatLeaderboardMetric::from_query(Some("flip-reset")).is_err());
}

#[test]
fn stat_sort_includes_share_and_average_metrics() {
    assert_eq!(
        StatLeaderboardSort::from_query(Some("share")).unwrap(),
        StatLeaderboardSort::Share
    );
    assert_eq!(
        StatLeaderboardSort::from_query(Some("pct")).unwrap(),
        StatLeaderboardSort::Share
    );
    assert_eq!(
        StatLeaderboardSort::from_query(Some("avg")).unwrap(),
        StatLeaderboardSort::Average
    );
    assert!(StatLeaderboardSort::from_query(Some("sideways")).is_err());
}

#[test]
fn stat_filters_reject_share_for_count_metrics() {
    assert!(
        StatLeaderboardFilters::from_query(Some("stat=control-touch-count&sort=share"), None,)
            .is_err()
    );
}

#[test]
fn stat_rank_query_reads_materialized_facts() {
    let (filters, paging) = stat_filters("stat=ball-opponent-half&sort=per-minute&team-size=2");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("WITH metric_values AS"));
    assert!(sql.contains("FROM player_replay_stat_facts fact"));
    assert!(sql.contains("r.canonical_analysis_run_id = fact.analysis_run_id"));
    assert!(sql.contains("WHERE fact.stat_key = "));
    assert!(sql.contains("player_identity_tags aggregate_excluded_tag"));
    assert!(sql.contains("SUM(fact.denominator_value) AS denominator_value"));
    assert!(sql.contains("team_player_count"));
    assert!(sql.contains("NOT r.exclude_from_aggregates"));
    assert!(sql.contains("share_of_active_time"));
    assert!(sql.contains("ORDER BY value_per_active_minute DESC NULLS LAST, value DESC"));
}

#[test]
fn stat_rank_query_can_read_touch_count_facts() {
    let (filters, paging) = stat_filters("stat=high-aerial-touch-count&sort=per-game");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("FROM player_replay_stat_facts fact"));
    assert!(sql.contains("WHERE fact.stat_key = "));
    assert!(sql.contains("ORDER BY value_per_game DESC NULLS LAST, value DESC"));
}

#[test]
fn stat_rank_query_supports_ball_advance_metric() {
    let (filters, paging) = stat_filters("stat=ball-advance&sort=per-game");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert_eq!(filters.metric, StatLeaderboardMetric::BallAdvance);
    assert_eq!(filters.metric.definition().fact_key(), "ball-advance");
    assert_eq!(filters.metric.definition().unit, "uu");
    assert!(sql.contains("FROM player_replay_stat_facts fact"));
    assert!(sql.contains("ORDER BY value_per_game DESC NULLS LAST, value DESC"));
}

#[test]
fn stat_rank_query_can_read_boost_count_materialization() {
    let (filters, paging) = stat_filters("stat=big-boost-pad-count&sort=per-minute&team-size=2");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("FROM player_replay_boost boost"));
    assert!(sql.contains("SUM(boost.big_pads"));
    assert!(sql.contains("r.canonical_analysis_run_id = boost.analysis_run_id"));
    assert!(sql.contains("SUM(boost.tracked_seconds) AS active_time_seconds"));
    assert!(sql.contains("NULL::float8 AS denominator_value"));
    assert!(sql.contains("team_player_count"));
    assert!(sql.contains("NOT r.exclude_from_aggregates"));
    assert!(sql.contains("ORDER BY value_per_active_minute DESC NULLS LAST, value DESC"));
}

#[test]
fn stat_rank_query_can_read_boost_amount_materialization() {
    let (filters, paging) = stat_filters("stat=small-boost-amount&sort=per-minute");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("FROM player_replay_boost boost"));
    assert!(sql.contains("SUM(boost.boost_collected_small"));
    assert!(sql.contains("COUNT(DISTINCT boost.replay_id) AS replay_count"));
    assert!(sql.contains("ORDER BY value_per_active_minute DESC NULLS LAST, value DESC"));
}

#[test]
fn stat_rank_query_can_order_by_share() {
    let (filters, paging) = stat_filters("stat=possession-time&sort=share&min-games=5");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("FROM player_replay_stat_facts fact"));
    assert!(sql.contains("COALESCE(SUM(fact.value), 0.0) AS value"));
    assert!(sql.contains("ORDER BY share_of_active_time DESC NULLS LAST, value DESC"));
    assert!(sql.contains("m.replay_count >= "));
}

#[test]
fn stat_total_query_counts_qualifying_players() {
    let (filters, _) = stat_filters("stat=possession-time&min-games=3");
    let sql = stat_total_query(&filters).into_sql();
    assert!(sql.contains("WITH metric_values AS"));
    assert!(sql.contains("SELECT COUNT(*) AS total FROM metric_values m"));
    assert!(sql.contains("m.replay_count >= "));
}

#[test]
fn stat_rank_query_reads_possession_average_materialization() {
    let (filters, paging) =
        stat_filters("stat=touches-per-possession&sort=average&team-size=2&min-games=4");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("FROM player_replay_possession possession"));
    assert!(sql.contains("SUM(possession.touch_count)::float8"));
    assert!(sql.contains("NULLIF(SUM(possession.possession_count), 0)"));
    assert!(sql.contains("SUM(possession.possession_count)::bigint AS sample_count"));
    assert!(sql.contains("r.canonical_analysis_run_id = possession.analysis_run_id"));
    assert!(sql.contains("SELECT MAX(team_player_count)::integer"));
    assert!(sql.contains(") = ANY("));
    assert!(sql.contains("NULL::float8 AS value_per_game"));
    assert!(sql.contains("ORDER BY value DESC"));
    assert!(sql.contains("m.replay_count >= "));
}

#[test]
fn stat_rank_query_reads_average_possession_duration() {
    let (filters, paging) = stat_filters("stat=avg-possession-duration&sort=average");
    let sql = stat_rank_query(&filters, &paging).into_sql();

    assert!(sql.contains("FROM player_replay_possession possession"));
    assert!(sql.contains("SUM(possession.duration_seconds)::float8"));
    assert!(sql.contains("ORDER BY value DESC"));
}

#[test]
fn cached_stat_rate_query_is_an_ordered_player_window_read() {
    let (filters, paging) =
        stat_filters("window=season&season=f23&stat=possession-time&sort=per-minute&min-games=25");
    let scope = CachedLeaderboardScope::from_filters(filters.window, &filters.replay).unwrap();
    let sql = cached_stat_rank_query(&filters, &scope, &paging).into_sql();

    assert!(sql.contains("FROM leaderboard_player_window_metrics cached"));
    assert!(sql.contains("cache_window.season"));
    assert!(sql.contains("cached.metric_kind = 'stat'"));
    assert!(sql.contains("cached.replay_count >="));
    assert!(sql.contains("ORDER BY cached.value_per_5_minutes DESC NULLS LAST"));
    assert!(!sql.contains("GROUP BY"));
}

#[test]
fn cached_stat_range_query_recomputes_rate_after_summing_seasons() {
    let (filters, paging) = stat_filters(
        "window=season&min-season=f20&max-season=f23&stat=possession-time&sort=per-minute&min-games=25",
    );
    let scope = CachedLeaderboardScope::from_filters(filters.window, &filters.replay).unwrap();
    let sql = cached_stat_rank_query(&filters, &scope, &paging).into_sql();

    assert!(sql.contains("SUM(cached.total_value)::float8 AS total_value"));
    assert!(sql.contains("SUM(cached.sample_count)::bigint AS sample_count"));
    assert!(sql.contains("aggregated.total_value * 60.0 / aggregated.active_time_seconds"));
    assert!(sql.contains("WHERE aggregated.replay_count >="));
}

#[test]
fn stat_min_games_only_changes_per_five_minute_eligibility() {
    let (total, _) = stat_filters("sort=total&min-games=50");
    assert_eq!(total.qualifying_min_games(), 1);
    let (rate, _) = stat_filters("sort=per-minute&min-games=50");
    assert_eq!(rate.qualifying_min_games(), 50);
}
