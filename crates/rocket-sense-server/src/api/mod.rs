mod health;
mod openapi;
mod replays;

use crate::app::AppState;
use axum::Router;
pub use openapi::ApiDoc;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

pub fn router(state: AppState) -> Router {
    Router::new()
        .nest("/api/v1", api_v1_router(state))
        .merge(SwaggerUi::new("/docs").url("/api-docs/openapi.json", ApiDoc::openapi()))
}

fn api_v1_router(state: AppState) -> Router {
    Router::new()
        .merge(health::router())
        .merge(replays::router())
        .with_state(state)
}
