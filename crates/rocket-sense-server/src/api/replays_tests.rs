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
fn subtr_actor_review_url_points_at_evaluation_player() {
    assert_eq!(
        subtr_actor_review_url(SubtrActorReviewQuery {
            review_playlist: Some("/api/v1/mechanics/review-playlist?count=1000".to_owned()),
            ..SubtrActorReviewQuery::default()
        }),
        "/subtr-actor/?reviewPlaylist=%2Fapi%2Fv1%2Fmechanics%2Freview-playlist%3Fcount%3D1000"
    );
}

#[test]
fn subtr_actor_viewer_assets_are_embedded_with_browser_content_types() {
    let javascript = subtr_actor_static_asset("main-CCtnzKrb.js").unwrap();
    let css = subtr_actor_static_asset("main-C7fEXYAc.css").unwrap();
    let wasm = subtr_actor_static_asset("rl_replay_subtr_actor_bg-B7UAPf2m.wasm").unwrap();

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
    let javascript = subtr_actor_stats_static_asset("index-C6mF9tUF.js").unwrap();
    let css = subtr_actor_stats_static_asset("index-BO4Z84VP.css").unwrap();
    let wasm = subtr_actor_stats_static_asset("rl_replay_subtr_actor_bg-B7UAPf2m.wasm").unwrap();

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
fn subtr_actor_stats_index_serves_report_app() {
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("subtr-actor stats report"));
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("index-C6mF9tUF.js"));
    assert!(SUBTR_ACTOR_STATS_INDEX.contains("index-BO4Z84VP.css"));
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
fn replay_select_includes_players_and_latest_stats() {
    let sql = replay_select_sql("WHERE r.id = $1");

    assert!(sql.contains("jsonb_build_object"));
    assert!(sql.contains("FROM replay_players player"));
    assert!(sql.contains("FROM replay_stat_blobs blob"));
    assert!(sql.contains("blob.analysis_run_id = r.canonical_analysis_run_id"));
    assert!(sql.contains("latest_stats.stats AS latest_stats"));
}

#[test]
fn replay_metadata_falls_back_to_latest_stats_headers() {
    let stats = serde_json::json!({
        "replay_meta": {
            "all_headers": [
                ["Playlist", { "Int": 11 }],
                ["MapName", { "Name": "Stadium_P" }],
                ["Date", { "Str": "2026-05-23 05-50-00" }],
                ["Season", { "Int": 21 }],
                ["OvertimeSeconds", { "Float": 28.4 }]
            ]
        }
    });

    assert_eq!(
        replay_playlist_from_stats(Some(&stats)).as_deref(),
        Some("ranked-doubles")
    );
    assert_eq!(
        replay_map_code_from_stats(Some(&stats)).as_deref(),
        Some("Stadium_P")
    );
    assert_eq!(
        replay_date_from_stats(Some(&stats))
            .map(|date| date.to_rfc3339())
            .as_deref(),
        Some("2026-05-23T05:50:00+00:00")
    );
    assert_eq!(season_from_stats(&stats).as_deref(), Some("Season 21"));
    assert_eq!(overtime_seconds_from_stats(&stats), Some(28));
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
