use super::*;

#[test]
fn hosted_replay_app_urls_point_at_local_subtr_actor_apps() {
    let replay_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();

    assert_eq!(
        hosted_replay_app_url("/subtr-actor/", replay_id),
        "/subtr-actor/?replayUrl=%2Fapi%2Fv1%2Freplays%2F0196f449-e997-7413-af77-28082e6478f0%2Ffile"
    );
    assert_eq!(
        hosted_replay_app_url("/subtr-actor/stats/", replay_id),
        "/subtr-actor/stats/?replayUrl=%2Fapi%2Fv1%2Freplays%2F0196f449-e997-7413-af77-28082e6478f0%2Ffile"
    );
}

#[test]
fn subtr_actor_viewer_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_VIEWER_INDEX, subtr_actor_static_asset);
    assert!(subtr_actor_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_stats_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_STATS_INDEX, subtr_actor_stats_static_asset);
    assert!(subtr_actor_stats_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_review_assets_are_embedded_with_browser_content_types() {
    assert_index_assets_are_embedded(SUBTR_ACTOR_REVIEW_INDEX, subtr_actor_review_static_asset);
    assert!(subtr_actor_review_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_stats_index_serves_report_app() {
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("subtr-actor stats report"));
    assert!(asset_paths(SUBTR_ACTOR_STATS_INDEX)
        .iter()
        .any(|path| path.ends_with(".js")));
    assert!(asset_paths(SUBTR_ACTOR_STATS_INDEX)
        .iter()
        .any(|path| path.ends_with(".css")));
}

#[test]
fn subtr_actor_review_index_serves_event_review_player() {
    assert!(SUBTR_ACTOR_REVIEW_INDEX.contains("stat evaluation player"));
    assert!(asset_paths(SUBTR_ACTOR_REVIEW_INDEX)
        .iter()
        .any(|path| path.ends_with(".js")));
}

fn assert_index_assets_are_embedded(index: &str, load: fn(&str) -> Option<StaticAsset>) {
    let paths = asset_paths(index);
    assert!(!paths.is_empty());
    for path in paths {
        let asset = load(&path).unwrap_or_else(|| panic!("missing asset {path}"));
        if path.ends_with(".css") {
            assert_eq!(asset.content_type, "text/css; charset=utf-8");
        } else if path.ends_with(".js") {
            assert_eq!(asset.content_type, "application/javascript; charset=utf-8");
            assert!(!asset.bytes.is_empty());
        } else if path.ends_with(".wasm") {
            assert_eq!(asset.content_type, "application/wasm");
            assert!(asset.bytes.len() > 1_000_000);
        }
    }
}

fn asset_paths(index: &str) -> Vec<String> {
    let mut paths = Vec::new();
    let mut rest = index;
    while let Some(start) = rest.find("./assets/") {
        let after_prefix = &rest[start + "./assets/".len()..];
        let Some(end) = after_prefix.find(|character| character == '"' || character == '\'') else {
            break;
        };
        paths.push(after_prefix[..end].to_owned());
        rest = &after_prefix[end..];
    }
    paths
}

#[test]
fn subtr_actor_review_without_trailing_slash_redirects_to_slash() {
    assert_eq!(
        subtr_actor_review_trailing_slash_url(Some("playlist=/api/v1/events/review-playlist")),
        "/subtr-actor/review/?playlist=/api/v1/events/review-playlist"
    );
    assert_eq!(
        subtr_actor_review_trailing_slash_url(None),
        "/subtr-actor/review/"
    );
}

#[test]
fn replay_list_page_uses_playlist_dropdown_values() {
    assert!(REPLAY_LIST_PAGE.contains(r#"<div class="filter-group-title">Ranked</div>"#));
    assert!(REPLAY_LIST_PAGE
        .contains(r#"<input type="checkbox" name="playlist" value="ranked-duels"> Ranked Duels"#));
    assert!(REPLAY_LIST_PAGE.contains(
        r#"<input type="checkbox" name="playlist" value="ranked-doubles"> Ranked Doubles"#
    ));
    assert!(REPLAY_LIST_PAGE
        .contains(r#"<input type="checkbox" name="playlist" value="private"> Private"#));
}

#[test]
fn replay_list_page_preserves_hidden_api_filters() {
    assert!(REPLAY_LIST_PAGE.contains(r#"<input type="hidden" name="group">"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<input type="hidden" name="player-id">"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<input type="hidden" name="project">"#));
}

#[test]
fn replay_list_page_links_replay_name_to_stats() {
    assert!(REPLAY_LIST_PAGE.contains(r#"const replayHref = statsUrl(replay);"#));
    assert!(!REPLAY_LIST_PAGE.contains(r#"const replayHref = viewerUrl(replay);"#));
    assert!(REPLAY_LIST_PAGE.contains(
        r#"<a href="${replayHref}" target="_blank" rel="noopener">${escapeHtml(name)}</a>"#
    ));
}

#[test]
fn replay_list_page_uses_ballchasing_style_replay_rows() {
    assert!(REPLAY_LIST_PAGE.contains(r#"<ol class="replay-list">${rows}</ol>"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<div class="score-side blue">"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<div class="score-side orange">"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"sortButton("Replay Date", "replay-date")"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"content.addEventListener("click", (event) => {"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<div class="keyboard-hint">"#));
    assert!(REPLAY_LIST_PAGE.contains("function iconDownload()"));
    assert!(REPLAY_LIST_PAGE.contains("function iconPlay()"));
    assert!(REPLAY_LIST_PAGE.contains("function platformIcon(player)"));
    assert!(REPLAY_LIST_PAGE.contains("function renderTeam(players, teamClass)"));
    assert!(REPLAY_LIST_PAGE.contains("function updateSelectedReplay"));
    assert!(REPLAY_LIST_PAGE.contains(r#"document.addEventListener("keydown", (event) => {"#));
    assert!(REPLAY_LIST_PAGE.contains("function openRandomReplay"));
    assert!(
        REPLAY_LIST_PAGE.contains(r#"randomButton.addEventListener("click", openRandomReplay);"#)
    );
    assert_eq!(
        REPLAY_LIST_PAGE
            .matches(r#"if (replay) location.href = statsUrl(replay);"#)
            .count(),
        2
    );
    assert!(REPLAY_LIST_PAGE.contains(
        r#"<a href="${viewerUrl(replay)}" target="_blank" rel="noopener" title="Open replay player" aria-label="Open replay player">${iconPlay()}</a>"#
    ));
}

#[test]
fn replay_list_header_only_links_rocket_sense_destinations() {
    assert!(REPLAY_LIST_PAGE.contains(r#"<a class="nav-item active" href="/replays">Replays</a>"#));
    assert!(
        REPLAY_LIST_PAGE.contains(r#"<a class="nav-item" href="/events/review">Events Review</a>"#)
    );
    assert!(REPLAY_LIST_PAGE.contains(r#"<a class="nav-item" href="/profile">Profile</a>"#));
    assert!(!REPLAY_LIST_PAGE.contains("Patreon"));
    assert!(!REPLAY_LIST_PAGE.contains("Help"));
    assert!(!REPLAY_LIST_PAGE.contains("Community"));
    assert!(!REPLAY_LIST_PAGE.contains("Replay Groups"));
    assert!(!REPLAY_LIST_PAGE.contains(">Top<"));
}

#[test]
fn replay_list_header_can_show_authenticated_account() {
    assert!(REPLAY_LIST_PAGE.contains(r#"id="account-link""#));
    assert!(REPLAY_LIST_PAGE.contains("function renderHeaderAccount()"));
    assert!(REPLAY_LIST_PAGE.contains("function setHeaderAccountFromToken(token)"));
    assert!(REPLAY_LIST_PAGE.contains("function hydrateHeaderAccount()"));
    assert!(REPLAY_LIST_PAGE.contains(r#"/api/v1/auth/profile-token"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"class="account-avatar""#));
}

#[test]
fn replay_list_page_links_indexed_players_to_profiles() {
    assert!(REPLAY_LIST_PAGE.contains("function playerProfileUrl(player)"));
    assert!(REPLAY_LIST_PAGE
        .contains("`/players/${encodeURIComponent(player.platform)}/${encodeURIComponent(player.platform_player_id)}`"));
    assert!(REPLAY_LIST_PAGE.contains("href ? `<a href=\"${href}\">${label}</a>` : label"));
}

#[test]
fn replay_list_page_shows_uploader_metadata_line() {
    assert!(REPLAY_LIST_PAGE.contains("function uploaderName(replay)"));
    assert!(REPLAY_LIST_PAGE.contains("Uploaded by"));
    assert!(REPLAY_LIST_PAGE.contains(r#"class="uploader-avatar""#));
    assert!(REPLAY_LIST_PAGE.contains(r#"title="${escapeHtml(uploader)}""#));
}

#[test]
fn replay_select_includes_uploader_profile() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("LEFT JOIN users uploader ON uploader.id = r.uploaded_by_user_id"));
    assert!(sql.contains("uploader.primary_email AS uploader_primary_email"));
    assert!(sql.contains("uploader.display_name AS uploader_display_name"));
}

#[test]
fn replay_select_includes_players_without_stats_blob_join() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("jsonb_build_object"));
    assert!(sql.contains("FROM replay_players player"));
    assert!(!sql.contains("replay_stat_blobs"));
    assert!(!sql.contains("latest_stats"));
}

#[test]
fn replay_group_select_includes_member_count() {
    let sql = replay_group_select_sql("WHERE replay_group.id = $1");

    assert!(sql.contains("FROM replay_groups replay_group"));
    assert!(sql.contains("FROM replay_group_replays group_replay"));
    assert!(sql.contains("COALESCE(replay_counts.replay_count, 0) AS replay_count"));
}

#[test]
fn replay_filters_parse_group_as_replay_group_and_project_separately() {
    let group_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f0").unwrap();
    let project_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f1").unwrap();
    let auth_user_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f2").unwrap();
    let filters = ReplayFilters::from_query(
        ListReplaysQuery {
            group: Some(group_id.to_string()),
            project: Some(project_id.to_string()),
            ..ListReplaysQuery::default()
        },
        Some(auth_user_id),
    )
    .expect("filters should parse");

    assert_eq!(filters.group_id, Some(group_id));
    assert_eq!(filters.project_id, Some(project_id));
}

#[test]
fn list_replays_query_accepts_html_form_array_filters() {
    let query = ListReplaysQuery::from_raw_query(Some(
        "player-name=colonelpanic8&player-id=epic%3Aabc&playlist=Online&map=Stadium_P",
    ))
    .expect("single-value HTML form filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8"]);
    assert_eq!(query.player_ids, ["epic:abc"]);
    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.maps, ["Stadium_P"]);
}

#[test]
fn list_replays_query_accepts_bracketed_array_filters() {
    let query = ListReplaysQuery::from_raw_query(Some(
        "player-name%5B%5D=colonelpanic8&player-id%5B%5D=epic%3Aabc&playlist%5B%5D=Online&map%5B%5D=Stadium_P",
    ))
    .expect("bracketed array filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8"]);
    assert_eq!(query.player_ids, ["epic:abc"]);
    assert_eq!(query.playlist, ["Online"]);
    assert_eq!(query.maps, ["Stadium_P"]);
}

#[test]
fn list_replays_query_accepts_repeated_array_filters() {
    let query = ListReplaysQuery::from_raw_query(Some(
        "player-name=colonelpanic8&player-name=teammate&player-id=epic%3Aabc&player-id=steam%3Adef&playlist=Online&playlist=Private",
    ))
    .expect("repeated array filters should deserialize");

    assert_eq!(query.player_names, ["colonelpanic8", "teammate"]);
    assert_eq!(query.player_ids, ["epic:abc", "steam:def"]);
    assert_eq!(query.playlist, ["Online", "Private"]);
}

#[test]
fn replay_filters_do_not_require_authentication_without_me_filter() {
    let filters = ReplayFilters::from_query(ListReplaysQuery::default(), None)
        .expect("anonymous replay filters should parse");

    assert_eq!(filters.uploader_user_id, None);
}

#[test]
fn replay_filters_require_authentication_for_me_uploader_filter() {
    let result = ReplayFilters::from_query(
        ListReplaysQuery {
            uploader: Some("me".to_owned()),
            ..ListReplaysQuery::default()
        },
        None,
    );
    let Err(error) = result else {
        panic!("uploader=me should require auth");
    };

    assert_eq!(error.status, StatusCode::UNAUTHORIZED);
}

#[test]
fn replay_filters_parse_me_uploader_when_authenticated() {
    let auth_user_id = Uuid::parse_str("0196f449-e997-7413-af77-28082e6478f2").unwrap();
    let filters = ReplayFilters::from_query(
        ListReplaysQuery {
            uploader: Some("me".to_owned()),
            ..ListReplaysQuery::default()
        },
        Some(auth_user_id),
    )
    .expect("uploader=me should parse with auth");

    assert_eq!(filters.uploader_user_id, Some(auth_user_id));
}

#[test]
fn normalize_sha256_hex_accepts_lower_and_uppercase_hashes() {
    let lowercase = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    let uppercase = "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF";

    assert_eq!(normalize_sha256_hex(lowercase).unwrap(), lowercase);
    assert_eq!(normalize_sha256_hex(uppercase).unwrap(), lowercase);
}

#[test]
fn normalize_sha256_hex_rejects_non_sha256_values() {
    assert!(normalize_sha256_hex("abc").is_err());
    assert!(normalize_sha256_hex(
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdeg"
    )
    .is_err());
}
