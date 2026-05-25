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
}

#[test]
fn player_profile_header_can_show_authenticated_account() {
    assert!(PLAYER_PROFILE_PAGE.contains(r#"id="account-link""#));
    assert!(PLAYER_PROFILE_PAGE
        .contains(r#"<a class="nav-item" href="/mechanics/review">Mechanics Review</a>"#));
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
