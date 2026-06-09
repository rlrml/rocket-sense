use crate::app::AppState;
use axum::{
    extract::Path,
    http::{
        header::{CACHE_CONTROL, CONTENT_TYPE},
        StatusCode,
    },
    response::{IntoResponse, Response},
    routing::get,
    Router,
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(spa_index))
        .route("/login", get(spa_index))
        .route("/profile", get(spa_index))
        .route("/replays", get(spa_index))
        .route("/replays/{*path}", get(spa_index))
        .route("/players/{platform}/{platform_player_id}", get(spa_index))
        .route("/events/review", get(spa_index))
        .route("/mechanics/review", get(spa_index))
        .route("/admin/processing", get(spa_index))
        .route("/assets/{*asset_path}", get(spa_asset))
        .route("/favicon.ico", get(favicon))
}

async fn spa_index() -> Result<Response, StatusCode> {
    let asset = web_static_asset("index.html").ok_or(StatusCode::NOT_FOUND)?;
    Ok((
        [
            (CONTENT_TYPE, asset.content_type),
            (CACHE_CONTROL, "no-cache"),
        ],
        asset.bytes,
    )
        .into_response())
}

async fn spa_asset(Path(asset_path): Path<String>) -> Result<Response, StatusCode> {
    let asset = web_static_asset(&format!("assets/{asset_path}")).ok_or(StatusCode::NOT_FOUND)?;
    Ok((
        [
            (CONTENT_TYPE, asset.content_type),
            (CACHE_CONTROL, "public, max-age=31536000, immutable"),
        ],
        asset.bytes,
    )
        .into_response())
}

async fn favicon() -> Result<Response, StatusCode> {
    let Some(asset) = web_static_asset("favicon.ico").or_else(|| web_static_asset("index.html"))
    else {
        return Err(StatusCode::NOT_FOUND);
    };
    Ok(([(CONTENT_TYPE, asset.content_type)], asset.bytes).into_response())
}

struct StaticAsset {
    content_type: &'static str,
    bytes: &'static [u8],
}

include!(concat!(env!("OUT_DIR"), "/web_static_assets.rs"));
