use super::*;
use axum::http::{header::LOCATION, StatusCode};

#[tokio::test]
async fn root_page_redirects_to_replay_search() {
    let response = root_page().await.into_response();

    assert_eq!(response.status(), StatusCode::TEMPORARY_REDIRECT);
    assert_eq!(response.headers().get(LOCATION).unwrap(), "/replays");
}
