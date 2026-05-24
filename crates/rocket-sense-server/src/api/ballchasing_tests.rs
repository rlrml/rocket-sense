use super::*;

#[test]
fn ballchasing_file_url_points_at_ballchasing_api_download() {
    assert_eq!(
        ballchasing_replay_file_url("abc-123_DEF"),
        "https://ballchasing.com/api/replays/abc-123_DEF/file"
    );
}

#[test]
fn hosted_ballchasing_replay_app_url_uses_api_proxy() {
    assert_eq!(
        hosted_ballchasing_replay_app_url("/subtr-actor/", "abc-123"),
        "/subtr-actor/?replayUrl=%2Fapi%2Fv1%2Fballchasing%2Freplays%2Fabc-123%2Ffile"
    );
}

#[test]
fn ballchasing_replay_ids_are_path_safe() {
    assert!(validate_ballchasing_replay_id("abc-123_DEF").is_ok());
    assert!(validate_ballchasing_replay_id("").is_err());
    assert!(validate_ballchasing_replay_id("../abc").is_err());
    assert!(validate_ballchasing_replay_id("abc/123").is_err());
}

#[test]
fn proxy_cors_headers_are_permissive() {
    let mut headers = HeaderMap::new();
    apply_permissive_cors_headers(&mut headers);

    assert_eq!(
        headers.get(ACCESS_CONTROL_ALLOW_ORIGIN).unwrap(),
        HeaderValue::from_static("*")
    );
    assert_eq!(
        headers.get(ACCESS_CONTROL_ALLOW_METHODS).unwrap(),
        HeaderValue::from_static("*")
    );
    assert_eq!(
        headers.get(ACCESS_CONTROL_ALLOW_HEADERS).unwrap(),
        HeaderValue::from_static("*")
    );
    assert_eq!(
        headers.get(ACCESS_CONTROL_EXPOSE_HEADERS).unwrap(),
        HeaderValue::from_static("*")
    );
    assert_eq!(
        headers
            .get(HeaderName::from_static(
                "access-control-allow-private-network"
            ))
            .unwrap(),
        HeaderValue::from_static("true")
    );
}

#[tokio::test]
async fn load_ballchasing_replay_redirects_to_viewer_with_api_proxy_url() {
    let response = load_ballchasing_replay(Path("abc-123".to_owned()))
        .await
        .expect("valid replay id should redirect")
        .into_response();

    assert_eq!(response.status(), StatusCode::TEMPORARY_REDIRECT);
    assert_eq!(
        response
            .headers()
            .get(axum::http::header::LOCATION)
            .and_then(|value| value.to_str().ok()),
        Some("/subtr-actor/?replayUrl=%2Fapi%2Fv1%2Fballchasing%2Freplays%2Fabc-123%2Ffile")
    );
}
