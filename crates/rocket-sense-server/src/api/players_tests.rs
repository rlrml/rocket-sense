use super::*;

#[test]
fn player_identity_normalizes_platform_and_requires_id() {
    let identity = PlayerIdentity::new("Steam".to_owned(), " 76561198000000000 ".to_owned())
        .expect("identity should parse");

    assert_eq!(identity.platform, "steam");
    assert_eq!(identity.platform_player_id, "76561198000000000");
    assert!(PlayerIdentity::new(" ".to_owned(), "abc".to_owned()).is_err());
    assert!(PlayerIdentity::new("steam".to_owned(), " ".to_owned()).is_err());
}

#[test]
fn player_profile_filters_normalize_game_modes_sha_and_group_ids() {
    let group_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let project_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f1").unwrap();
    let filters = PlayerProfileFilters::from_query(PlayerProfileQuery {
        playlist: vec![" ranked-doubles ".to_owned()],
        game_modes: vec!["ranked-duels".to_owned(), "ranked-doubles".to_owned()],
        file_sha256s: vec![
            "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF".to_owned(),
        ],
        group: Some(group_id.to_string()),
        project: Some(project_id.to_string()),
        ..PlayerProfileQuery::default()
    })
    .expect("filters should parse");

    assert_eq!(filters.playlists, ["ranked-doubles", "ranked-duels"]);
    assert_eq!(
        filters.file_sha256s,
        ["0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"]
    );
    assert_eq!(filters.group_id, Some(group_id));
    assert_eq!(filters.project_id, Some(project_id));
}

#[test]
fn player_profile_query_accepts_html_form_array_filters() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let raw_query = format!(
        "playlist=Online&game-mode=ranked-doubles&replay-id={replay_id}&sha256=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    );
    let query = PlayerProfileQuery::from_raw_query(Some(&raw_query))
        .expect("single-value HTML form filters should deserialize");

    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.game_modes, ["ranked-doubles"]);
    assert_eq!(query.replay_ids, [replay_id]);
    assert_eq!(query.file_sha256s.len(), 1);
}

#[test]
fn player_profile_query_accepts_bracketed_array_filters() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let raw_query = format!(
        "playlist%5B%5D=Online&game-mode%5B%5D=ranked-doubles&replay-id%5B%5D={replay_id}&sha256%5B%5D=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    );
    let query = PlayerProfileQuery::from_raw_query(Some(&raw_query))
        .expect("bracketed array filters should deserialize");

    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.game_modes, ["ranked-doubles"]);
    assert_eq!(query.replay_ids, [replay_id]);
    assert_eq!(query.file_sha256s.len(), 1);
}

#[test]
fn player_profile_query_accepts_repeated_array_filters() {
    let first_replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let second_replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f1").unwrap();
    let raw_query = format!(
        "playlist=Online&playlist=Private&replay-id={first_replay_id}&replay-id={second_replay_id}"
    );
    let query = PlayerProfileQuery::from_raw_query(Some(&raw_query))
        .expect("repeated array filters should deserialize");

    assert_eq!(query.playlist, ["Online", "Private"]);
    assert_eq!(query.replay_ids, [first_replay_id, second_replay_id]);
}

#[test]
fn player_profile_filters_reject_invalid_sha() {
    assert!(PlayerProfileFilters::from_query(PlayerProfileQuery {
        file_sha256s: vec!["abc".to_owned()],
        ..PlayerProfileQuery::default()
    })
    .is_err());
}

#[test]
fn player_replay_query_uses_replay_player_identity() {
    let sql = replay_select_sql(
        r#"
        WHERE EXISTS (
            SELECT 1
            FROM replay_players profile_player
            WHERE profile_player.replay_id = r.id
              AND profile_player.platform = $1
              AND profile_player.platform_player_id = $2
        )
        ORDER BY COALESCE(r.replay_date, r.created_at) DESC NULLS LAST, r.created_at DESC
        LIMIT $3
        "#,
    );

    assert!(sql.contains("FROM replay_players profile_player"));
    assert!(sql.contains("profile_player.platform = $1"));
    assert!(sql.contains("profile_player.platform_player_id = $2"));
}

#[test]
fn player_profile_page_fetches_player_profile_api() {
    assert!(PLAYER_PROFILE_PAGE.contains("/api/v1/players/"));
    assert!(PLAYER_PROFILE_PAGE.contains("rocket_sense_access_token"));
    assert!(PLAYER_PROFILE_PAGE.contains("Latest replays"));
    assert!(PLAYER_PROFILE_PAGE.contains("const query = location.search || \"\";"));
    assert!(PLAYER_PROFILE_PAGE.contains("}${query}`"));
}

#[test]
fn player_profile_header_can_show_authenticated_account() {
    assert!(PLAYER_PROFILE_PAGE.contains(r#"id="account-link""#));
    assert!(PLAYER_PROFILE_PAGE
        .contains(r#"<a class="nav-item" href="/events/review">Events Review</a>"#));
    assert!(PLAYER_PROFILE_PAGE.contains("function renderHeaderAccount()"));
    assert!(PLAYER_PROFILE_PAGE.contains("function setHeaderAccountFromToken(token)"));
    assert!(PLAYER_PROFILE_PAGE.contains("function hydrateHeaderAccount()"));
    assert!(PLAYER_PROFILE_PAGE.contains(r#"/api/v1/auth/profile-token"#));
    assert!(PLAYER_PROFILE_PAGE.contains(r#"class="account-avatar""#));
}

#[test]
fn player_profile_page_links_replay_names_to_stats() {
    assert!(PLAYER_PROFILE_PAGE.contains("function replayStatsUrl(replay)"));
    assert!(PLAYER_PROFILE_PAGE
        .contains(r#"<a href="${replayStatsUrl(replay)}" target="_blank" rel="noopener">"#));
    assert!(!PLAYER_PROFILE_PAGE.contains(r#"<a href="${replayUrl(replay)}""#));
}

#[test]
fn player_profile_page_keeps_replay_player_link() {
    assert!(PLAYER_PROFILE_PAGE.contains("function replayViewerUrl(replay)"));
    assert!(PLAYER_PROFILE_PAGE.contains(
        r#"<a class="player-link" href="${replayViewerUrl(replay)}" target="_blank" rel="noopener">Player</a>"#
    ));
}

#[test]
fn player_profile_page_shows_teammate_aggregate_columns() {
    assert!(PLAYER_PROFILE_PAGE.contains("Tm avg/game"));
    assert!(PLAYER_PROFILE_PAGE.contains("stat.teammate_count_per_game"));
    assert!(PLAYER_PROFILE_PAGE.contains("stat.teammate_per_active_minute"));
}

#[test]
fn player_profile_page_renders_rotation_duration_histogram() {
    assert!(PLAYER_PROFILE_PAGE.contains("Timing comparison"));
    assert!(PLAYER_PROFILE_PAGE.contains("profile.timing_comparison"));
    assert!(PLAYER_PROFILE_PAGE.contains("Most forward"));
    assert!(PLAYER_PROFILE_PAGE.contains("Offensive half"));
    assert!(PLAYER_PROFILE_PAGE.contains("First-man stint duration"));
    assert!(PLAYER_PROFILE_PAGE.contains("Second-to-first rotation duration"));
    assert!(PLAYER_PROFILE_PAGE.contains("profile.rotation_duration_histogram"));
    assert!(PLAYER_PROFILE_PAGE.contains("profile.second_man_to_first_rotation_duration_histogram"));
    assert!(PLAYER_PROFILE_PAGE
        .contains("function renderRotationHistogram(buckets, ariaLabel, emptyMessage)"));
    assert!(PLAYER_PROFILE_PAGE.contains(r#"class="histogram-fill""#));
}
