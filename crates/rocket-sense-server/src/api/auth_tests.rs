use super::*;
use axum::http::{header::LOCATION, StatusCode};

#[tokio::test]
async fn root_page_redirects_to_replay_search() {
    let response = root_page().await.into_response();

    assert_eq!(response.status(), StatusCode::TEMPORARY_REDIRECT);
    assert_eq!(response.headers().get(LOCATION).unwrap(), "/replays");
}

#[test]
fn profile_page_uses_replay_app_shell() {
    let page = render_profile_page(AuthMode::Dev);

    assert!(page.contains(r#"<link rel="icon" href="data:,"#));
    assert!(page.contains(r#"<header>"#));
    assert!(page.contains(r#"<a class="nav-item" href="/replays">Replays</a>"#));
    assert!(page.contains(r#"<a class="nav-item" href="/events/review">Events Review</a>"#));
    assert!(page.contains(r#"<a class="nav-item active" href="/profile">Profile</a>"#));
    assert!(page.contains(r#".header-inner, main"#));
    assert!(page.contains(r#"background: #ffffff;"#));
}

#[test]
fn profile_page_offers_replay_upload() {
    let page = render_profile_page(AuthMode::OAuth);

    assert!(page.contains(r#"<h2>Upload replay</h2>"#));
    assert!(page.contains(r#"<form id="upload-form" class="upload-form">"#));
    assert!(page
        .contains(r#"<input id="upload-file" name="file" type="file" accept=".replay" required>"#));
    assert!(page.contains(r#"<button id="upload-submit" type="submit">Upload replay</button>"#));
    assert!(page.contains(r#"async function uploadReplay(event)"#));
    assert!(page.contains(r#"await fetch("/api/v1/replays", {"#));
    assert!(page.contains(r#"body.append("file", file, file.name);"#));
}
