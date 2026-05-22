mod auth;
mod health;
mod openapi;
mod replays;

use crate::app::AppState;
use axum::{routing::get, Json, Router};
pub use openapi::ApiDoc;
use serde::Serialize;
use utoipa::OpenApi;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/", get(root))
        .merge(auth::public_router().with_state(state.clone()))
        .nest("/api/v1", api_v1_router(state))
        .route("/api-docs/openapi.json", get(openapi_json))
}

fn api_v1_router(state: AppState) -> Router {
    Router::new()
        .merge(auth::router())
        .merge(health::router())
        .merge(replays::router())
        .with_state(state)
}

async fn openapi_json() -> Json<utoipa::openapi::OpenApi> {
    Json(ApiDoc::openapi())
}

#[derive(Debug, Serialize)]
struct RootResponse {
    service: &'static str,
    api_base: &'static str,
    login_url: &'static str,
    health_url: &'static str,
    openapi_url: &'static str,
}

async fn root() -> Json<RootResponse> {
    Json(RootResponse {
        service: "rocket-sense",
        api_base: "/api/v1",
        login_url: "/login",
        health_url: "/api/v1/health",
        openapi_url: "/api-docs/openapi.json",
    })
}
