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
    let javascript = subtr_actor_static_asset("main-CrR9IRLq.js").unwrap();
    let css = subtr_actor_static_asset("main-B47VKW7Z.css").unwrap();
    let wasm = subtr_actor_static_asset("rl_replay_subtr_actor_bg-EyPRboYq.wasm").unwrap();

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
    let javascript = subtr_actor_stats_static_asset("index-B9-_cuHE.js").unwrap();
    let css = subtr_actor_stats_static_asset("index-C_JUMRgy.css").unwrap();
    let wasm = subtr_actor_stats_static_asset("rl_replay_subtr_actor_bg-EyPRboYq.wasm").unwrap();

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
fn replay_list_page_uses_playlist_dropdown_values() {
    assert!(REPLAY_LIST_PAGE.contains(r#"<select name="playlist">"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<option value="ranked-duels">Ranked Duel</option>"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<option value="ranked-doubles">Ranked Doubles</option>"#));
    assert!(REPLAY_LIST_PAGE.contains(r#"<option value="private">Private</option>"#));
    assert!(!REPLAY_LIST_PAGE.contains(r#"<input name="playlist""#));
}
