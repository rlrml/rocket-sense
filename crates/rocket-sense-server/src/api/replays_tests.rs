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
    let index_javascript = subtr_actor_static_asset("index-CuFV7-xb.js").unwrap();
    let javascript = subtr_actor_static_asset("main-B052gX83.js").unwrap();
    let css = subtr_actor_static_asset("main-CwtZ1J5U.css").unwrap();
    let wasm = subtr_actor_static_asset("rl_replay_subtr_actor_bg-YX0244DR.wasm").unwrap();

    assert_eq!(
        index_javascript.content_type,
        "application/javascript; charset=utf-8"
    );
    assert_eq!(
        javascript.content_type,
        "application/javascript; charset=utf-8"
    );
    assert_eq!(css.content_type, "text/css; charset=utf-8");
    assert_eq!(wasm.content_type, "application/wasm");
    assert!(javascript.bytes.len() > 100_000);
    assert!(wasm.bytes.len() > 1_000_000);
    assert!(subtr_actor_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_stats_assets_are_embedded_with_browser_content_types() {
    let javascript = subtr_actor_stats_static_asset("index-Dcp27w41.js").unwrap();
    let css = subtr_actor_stats_static_asset("index-Bw2_Ha6f.css").unwrap();
    let wasm = subtr_actor_stats_static_asset("rl_replay_subtr_actor_bg-YX0244DR.wasm").unwrap();

    assert_eq!(
        javascript.content_type,
        "application/javascript; charset=utf-8"
    );
    assert_eq!(css.content_type, "text/css; charset=utf-8");
    assert_eq!(wasm.content_type, "application/wasm");
    assert!(javascript.bytes.len() > 10_000);
    assert!(wasm.bytes.len() > 1_000_000);
    assert!(subtr_actor_stats_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_review_assets_are_embedded_with_browser_content_types() {
    let javascript = subtr_actor_review_static_asset("index-LlPJfRPh.js").unwrap();
    let css = subtr_actor_review_static_asset("index-Dy-Q3BHC.css").unwrap();
    let wasm = subtr_actor_review_static_asset("rl_replay_subtr_actor_bg-YX0244DR.wasm").unwrap();

    assert_eq!(
        javascript.content_type,
        "application/javascript; charset=utf-8"
    );
    assert_eq!(css.content_type, "text/css; charset=utf-8");
    assert_eq!(wasm.content_type, "application/wasm");
    assert!(javascript.bytes.len() > 100_000);
    assert!(wasm.bytes.len() > 1_000_000);
    assert!(subtr_actor_review_static_asset("missing.js").is_none());
}

#[test]
fn subtr_actor_stats_index_serves_report_app() {
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("subtr-actor stats report"));
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("index-Dcp27w41.js"));
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("index-Bw2_Ha6f.css"));
}

#[test]
fn subtr_actor_review_index_serves_mechanic_review_player() {
    assert!(SUBTR_ACTOR_REVIEW_INDEX.contains("Mechanic Review Player"));
    assert!(SUBTR_ACTOR_REVIEW_INDEX.contains("index-LlPJfRPh.js"));
    assert!(SUBTR_ACTOR_REVIEW_INDEX.contains("index-Dy-Q3BHC.css"));
}

#[test]
fn subtr_actor_review_without_trailing_slash_redirects_to_slash() {
    assert_eq!(
        subtr_actor_review_trailing_slash_url(Some("playlist=/api/v1/mechanics/review-playlist")),
        "/subtr-actor/review/?playlist=/api/v1/mechanics/review-playlist"
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
    assert!(REPLAY_LIST_PAGE
        .contains(r#"<a class="nav-item" href="/mechanics/review">Mechanics Review</a>"#));
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
