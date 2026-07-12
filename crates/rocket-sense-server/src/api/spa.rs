use crate::app::AppState;
use axum::{
    extract::Path,
    http::{
        header::{ACCEPT, CACHE_CONTROL, CONTENT_TYPE},
        HeaderMap, Method, StatusCode, Uri,
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
        .route("/leaderboards", get(spa_index))
        .route(
            "/players/{platform}/id/{platform_player_id}",
            get(spa_index),
        )
        .route("/players/{platform}/{platform_player_id}", get(spa_index))
        .route("/campaigns", get(spa_index))
        .route("/events/review", get(spa_index))
        .route("/mechanics/review", get(spa_index))
        .route("/admin/processing", get(spa_index))
        .route("/assets/{*asset_path}", get(spa_asset))
        .route("/brand/{*brand_path}", get(brand_asset))
        .route("/vendor/{*asset_path}", get(vendor_asset))
        .route("/favicon.ico", get(favicon))
        .fallback(spa_fallback)
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

async fn spa_fallback(
    method: Method,
    uri: Uri,
    headers: HeaderMap,
) -> Result<Response, StatusCode> {
    if should_serve_spa_fallback(&method, uri.path(), &headers) {
        spa_index().await
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}

fn should_serve_spa_fallback(method: &Method, path: &str, headers: &HeaderMap) -> bool {
    (method == Method::GET || method == Method::HEAD)
        && accepts_html(headers)
        && !is_reserved_non_spa_path(path)
}

fn accepts_html(headers: &HeaderMap) -> bool {
    headers
        .get(ACCEPT)
        .and_then(|value| value.to_str().ok())
        .is_some_and(|accept| {
            accept
                .split(',')
                .any(|part| part.trim().starts_with("text/html"))
        })
}

fn is_reserved_non_spa_path(path: &str) -> bool {
    let first_segment = path
        .trim_start_matches('/')
        .split('/')
        .next()
        .unwrap_or_default();

    matches!(
        first_segment,
        "api" | "api-docs" | "assets" | "auth" | "brand" | "favicon.ico" | "subtr-actor" | "vendor"
    )
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

/// Serve the brand assets vite copies from `web/public/brand` to the dist root
/// (logo SVG + rasterized favicons referenced by `<link>`s in index.html).
/// Unlike `/assets/*`, these filenames are unhashed, so they get a short cache
/// rather than the immutable one-year policy.
async fn brand_asset(Path(brand_path): Path<String>) -> Result<Response, StatusCode> {
    let asset = web_static_asset(&format!("brand/{brand_path}")).ok_or(StatusCode::NOT_FOUND)?;
    Ok((
        [
            (CONTENT_TYPE, asset.content_type),
            (CACHE_CONTROL, "public, max-age=86400"),
        ],
        asset.bytes,
    )
        .into_response())
}

async fn vendor_asset(Path(asset_path): Path<String>) -> Result<Response, StatusCode> {
    let asset = player_vendor_static_asset(&asset_path).ok_or(StatusCode::NOT_FOUND)?;
    Ok((
        [
            (CONTENT_TYPE, asset.content_type),
            (CACHE_CONTROL, "public, max-age=31536000, immutable"),
        ],
        asset.bytes,
    )
        .into_response())
}

fn player_vendor_static_asset(asset_path: &str) -> Option<StaticAsset> {
    let player_asset_path = asset_path.strip_prefix("@rlrml/player/")?;
    let public_asset_path = player_asset_path
        .strip_prefix("public/")
        .or_else(|| player_asset_path.strip_prefix("dist/"))?;

    web_vendor_player_public_static_asset(public_asset_path)
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

#[cfg(test)]
mod tests {
    use super::*;

    fn html_headers() -> HeaderMap {
        let mut headers = HeaderMap::new();
        headers.insert(ACCEPT, "text/html,application/xhtml+xml".parse().unwrap());
        headers
    }

    fn json_headers() -> HeaderMap {
        let mut headers = HeaderMap::new();
        headers.insert(ACCEPT, "application/json".parse().unwrap());
        headers
    }

    #[test]
    fn fallback_serves_deep_spa_routes() {
        let headers = html_headers();

        assert!(should_serve_spa_fallback(
            &Method::GET,
            "/players/epic/CaleMaCar/stats/mechanics",
            &headers
        ));
        assert!(should_serve_spa_fallback(
            &Method::GET,
            "/players/steam/id/76561198856200686/stats/mechanics",
            &headers
        ));
        assert!(should_serve_spa_fallback(
            &Method::GET,
            "/replay-groups/8c14be67-80b9-40e0-99f6-1bdcd8766a7d/stats/goals",
            &headers
        ));
        assert!(should_serve_spa_fallback(
            &Method::GET,
            "/leaderboards",
            &headers
        ));
    }

    #[test]
    fn fallback_does_not_shadow_api_or_static_paths() {
        let headers = html_headers();

        for path in [
            "/api/v1/health",
            "/api-docs/openapi.json",
            "/assets/missing.js",
            "/auth/google/start",
            "/brand/logo.svg",
            "/favicon.ico",
            "/subtr-actor/review/missing",
            "/vendor/@rlrml/player/dist/models/ball/scene.gltf",
        ] {
            assert!(!should_serve_spa_fallback(&Method::GET, path, &headers));
        }
    }

    #[test]
    fn fallback_only_handles_html_gets_and_heads() {
        let headers = html_headers();
        let json_headers = json_headers();

        assert!(should_serve_spa_fallback(
            &Method::HEAD,
            "/players/steam/1/stats/mechanics",
            &headers
        ));
        assert!(!should_serve_spa_fallback(
            &Method::POST,
            "/players/steam/1/stats/mechanics",
            &headers
        ));
        assert!(!should_serve_spa_fallback(
            &Method::GET,
            "/players/steam/1/stats/mechanics",
            &json_headers
        ));
    }

    #[test]
    fn player_vendor_assets_are_embedded_for_public_and_dist_urls() {
        for path in [
            "@rlrml/player/public/models/ball/scene.gltf",
            "@rlrml/player/dist/models/ball/scene.gltf",
        ] {
            let asset = player_vendor_static_asset(path)
                .unwrap_or_else(|| panic!("missing player vendor asset {path}"));
            assert_eq!(asset.content_type, "model/gltf+json; charset=utf-8");
            assert!(!asset.bytes.is_empty());
        }

        for path in [
            "@rlrml/player/public/models/cars/fennec/fennec.glb",
            "@rlrml/player/dist/models/cars/fennec/fennec.glb",
            "@rlrml/player/public/models/wheels/Wheel_Boog.glb",
            "@rlrml/player/dist/models/wheels/Wheel_Boog.glb",
            "@rlrml/player/public/models/stadium/stadium.glb",
            "@rlrml/player/dist/models/stadium/stadium.glb",
        ] {
            let asset = player_vendor_static_asset(path)
                .unwrap_or_else(|| panic!("missing player vendor asset {path}"));
            assert_eq!(asset.content_type, "model/gltf-binary");
            assert!(!asset.bytes.is_empty());
        }
    }

    #[test]
    fn player_vendor_asset_route_stays_under_player_runtime_assets() {
        assert!(player_vendor_static_asset("@rlrml/player/package.json").is_none());
        assert!(player_vendor_static_asset("@rlrml/subtr-actor/package.json").is_none());
        assert!(player_vendor_static_asset("@rlrml/player/dist/missing.glb").is_none());
    }
}
