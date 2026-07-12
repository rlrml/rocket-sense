mod admin;
mod auth;
mod ballchasing;
mod campaigns;
mod event_stats;
mod favorites;
mod game_outcomes;
mod health;
mod leaderboards;
mod mechanics;
mod meta;
mod movement_stats;
mod openapi;
mod player_overview;
mod player_timeline;
mod players;
mod positioning_stats;
mod possession_stats;
mod query;
mod rank_benchmark_cohorts;
mod rank_trends;
mod replay_set;
mod replays;
mod spa;
mod stats;
mod users;
mod visibility;

/// Reused by `crate::processing` to key the rank-median benchmark population on
/// the exact same playlist-group expression the read path filters by (a
/// mismatch would silently empty the cohort). Re-exported narrowly so the
/// `replay_set` module itself stays private to `api`.
pub(crate) use replay_set::push_playlist_group_key_expression;

/// Reused by `crate::ballchasing_sync` to import downloaded ballchasing replays
/// through the exact same store/dedup/preflight/enqueue path as a user upload,
/// without widening the whole `replays` module.
pub(crate) use replays::{
    can_user_access_replay, find_replay_by_external_replay_id, import_replay_from_bytes,
    ReplayImportRequest,
};

/// Boost materialization helpers reused by `crate::processing` to populate
/// `player_replay_boost` with the same band/last-value accumulation as the live
/// boost-totals read, without widening the whole `stats`/`replays` modules.
pub(crate) mod boost_materialization {
    pub(crate) use super::replays::BoostTracksResponse;
    pub(crate) use super::stats::{
        accumulate_player_boost_track, boost_track_replay_duration, PlayerBoostAccumulator,
    };
}

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
        .merge(campaigns::router())
        .merge(event_stats::router())
        .merge(favorites::router())
        .merge(game_outcomes::router())
        .merge(health::router())
        .merge(leaderboards::router())
        .merge(mechanics::router())
        .merge(meta::router())
        .merge(movement_stats::router())
        .merge(player_overview::router())
        .merge(player_timeline::router())
        .merge(positioning_stats::router())
        .merge(possession_stats::router())
        .merge(players::router())
        .merge(rank_benchmark_cohorts::router())
        .merge(rank_trends::router())
        .merge(replays::router())
        .merge(stats::router())
        .merge(users::router())
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
