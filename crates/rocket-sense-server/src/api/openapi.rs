use super::{auth, health, replays};
use utoipa::{
    openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme},
    Modify, OpenApi,
};

#[derive(OpenApi)]
#[openapi(
    paths(
        auth::create_dev_token,
        auth::create_profile_token,
        health::health,
        replays::create_replay,
        replays::list_replays,
        replays::download_replay_file,
        replays::get_replay,
    ),
    components(
        schemas(
            auth::CreateDevTokenRequest,
            crate::auth::AccessToken,
            health::HealthResponse,
            replays::CreateReplayResponse,
            replays::ListReplaysResponse,
            replays::ReplayResponse,
            replays::ReplayStatus,
        )
    ),
    tags(
        (name = "auth", description = "Development auth endpoints"),
        (name = "health", description = "Service health endpoints"),
        (name = "replays", description = "Replay upload and metadata endpoints")
    ),
    modifiers(&SecurityAddon)
)]
pub struct ApiDoc;

struct SecurityAddon;

impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        if let Some(components) = openapi.components.as_mut() {
            components.add_security_scheme(
                "bearer_auth",
                SecurityScheme::Http(
                    HttpBuilder::new()
                        .scheme(HttpAuthScheme::Bearer)
                        .bearer_format("JWT")
                        .build(),
                ),
            );
        }
    }
}
