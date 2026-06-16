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
    let sql = uploads_rows_query(&filters, &paging).into_sql();

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
    let sql = uploads_total_query(&filters).into_sql();
    assert!(sql.contains("COUNT(DISTINCT r.uploaded_by_user_id)"));
    assert!(sql.contains("r.uploaded_by_user_id IS NOT NULL"));
}

#[test]
fn appearances_rank_query_counts_distinct_replays() {
    let filters = filters_from_query("playlist=ranked-doubles");
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    let sql = appearances_rank_query(&filters, &paging).into_sql();

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
fn appearances_rank_query_omits_replays_join_when_unfiltered() {
    let filters = filters_from_query("");
    let paging = LeaderboardPaging {
        count: 50,
        offset: 0,
    };
    let sql = appearances_rank_query(&filters, &paging).into_sql();

    // No filter touches the replays table, so the join is dropped and the query
    // can ride the covering index as an index-only scan.
    assert!(sql.contains("FROM replay_players rp WHERE"));
    assert!(!sql.contains("JOIN replays"));
    assert!(sql.contains("GROUP BY rp.platform, rp.platform_player_id"));
}

#[test]
fn appearances_total_query_wraps_grouped_subquery() {
    let filters = filters_from_query("");
    let sql = appearances_total_query(&filters).into_sql();
    assert!(sql.contains("SELECT COUNT(*) AS total FROM (SELECT 1"));
    assert!(sql.contains("GROUP BY rp.platform, rp.platform_player_id) ranked_players"));
}

#[test]
fn appearances_rank_query_rejects_invalid_game_type() {
    let params = QueryParams::from_raw(Some("game-type=bogus"));
    let input = ReplaySetFilterInput::from_query_params(&params).unwrap();
    assert!(ReplaySetFilters::from_input(input, None).is_err());
}
