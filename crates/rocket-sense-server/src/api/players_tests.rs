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
fn public_display_name_is_trimmed_and_limited() {
    assert_eq!(
        normalize_public_display_name("  colonelpanic8  ").unwrap(),
        "colonelpanic8"
    );
    assert!(normalize_public_display_name(" ").is_err());
    assert!(normalize_public_display_name(&"a".repeat(129)).is_err());
}

#[test]
fn report_and_tag_slugs_are_lowercase_ascii_slugs() {
    assert_eq!(normalize_slug("report_type", " Smurf ").unwrap(), "smurf");
    assert_eq!(normalize_slug("tag", "thrower_2").unwrap(), "thrower_2");
    assert!(normalize_slug("tag", "2smurf").is_err());
    assert!(normalize_slug("tag", "bad tag").is_err());
    assert!(normalize_slug("tag", &"a".repeat(65)).is_err());
}

#[test]
fn player_replay_query_uses_compact_replay_preview() {
    let identity = PlayerIdentity::new("epic".to_owned(), "abc123".to_owned()).unwrap();
    let filters = PlayerProfileFilters::default();
    let query = player_replays_query(&identity, &filters, 10);
    let sql = query.sql();

    assert!(sql.contains("SELECT"));
    assert!(sql.contains("r.id"));
    assert!(sql.contains("r.original_file_name"));
    assert!(sql.contains("r.team_zero_score"));
    assert!(sql.contains("r.team_one_score"));
    assert!(sql.contains("FROM replay_players profile_player"));
    assert!(sql.contains("profile_player.platform = $1"));
    assert!(sql.contains("profile_player.platform_player_id = $2"));
    assert!(sql.contains("LIMIT $3"));
    assert!(!sql.contains("jsonb_agg"));
    assert!(!sql.contains("FROM replay_players player"));
}

#[test]
fn player_name_history_query_filters_by_name_and_platform() {
    let query = player_name_history_query(PlayerNameHistoryQuery {
        q: Some(" Blue ".to_owned()),
        platform: vec!["Steam".to_owned()],
        count: Some(25),
        offset: Some(5),
    });
    let sql = query.sql();

    assert!(sql.contains("FROM player_display_names names"));
    assert!(sql.contains("JOIN player_identities identities"));
    assert!(sql.contains("names.display_name ILIKE $1"));
    assert!(sql.contains("names.platform = ANY($2)"));
    assert!(sql.contains("LIMIT"));
    assert!(sql.contains("OFFSET"));
}
