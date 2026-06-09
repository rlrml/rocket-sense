mod admin;
mod auth;
mod ballchasing;
mod health;
mod mechanics;
mod openapi;
mod players;
mod query;
mod replay_set;
mod replays;
mod spa;
mod stats;

use crate::app::AppState;
use axum::{routing::get, Json, Router};
pub use openapi::ApiDoc;
use serde::Serialize;
use utoipa::OpenApi;

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/api", get(api_index))
        .merge(auth::public_router().with_state(state.clone()))
        .merge(mechanics::public_router().with_state(state.clone()))
        .merge(replays::public_router().with_state(state.clone()))
        .nest("/api/v1", api_v1_router(state.clone()))
        .route("/api-docs/openapi.json", get(openapi_json))
        .merge(spa::router().with_state(state))
}

fn api_v1_router(state: AppState) -> Router {
    Router::new()
        .merge(admin::router())
        .merge(auth::router())
        .merge(ballchasing::router())
        .merge(health::router())
        .merge(mechanics::router())
        .merge(players::router())
        .merge(replays::router())
        .merge(stats::router())
        .with_state(state)
}

async fn openapi_json() -> Json<utoipa::openapi::OpenApi> {
    Json(ApiDoc::openapi())
}

#[derive(Debug, Serialize)]
struct ApiIndexResponse {
    service: &'static str,
    api_base: &'static str,
    login_url: &'static str,
    profile_url: &'static str,
    replays_url: &'static str,
    health_url: &'static str,
    openapi_url: &'static str,
}

async fn api_index() -> Json<ApiIndexResponse> {
    Json(ApiIndexResponse {
        service: "rocket-sense",
        api_base: "/api/v1",
        login_url: "/login",
        profile_url: "/profile",
        replays_url: "/replays",
        health_url: "/api/v1/health",
        openapi_url: "/api-docs/openapi.json",
    })
}
