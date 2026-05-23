use super::{auth, health, players, replays};
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
        players::get_player_profile,
        replays::create_replay,
        replays::list_replays,
        replays::get_replay_by_sha256,
        replays::download_replay_file,
        replays::get_replay,
    ),
    components(
        schemas(
            auth::CreateDevTokenRequest,
            crate::auth::AccessToken,
            health::HealthResponse,
            players::PlayerProfileNameResponse,
            players::PlayerProfileResponse,
            replays::CreateReplayResponse,
            replays::ListReplaysResponse,
            replays::ReplayPlayerResponse,
            replays::ReplayResponse,
            replays::ReplayStatus,
            replays::ReplaySummaryResponse,
            replays::ReplayTeamScoresResponse,
            replays::ReplayUploaderResponse,
        )
    ),
    tags(
        (name = "auth", description = "Development auth endpoints"),
        (name = "health", description = "Service health endpoints"),
        (name = "players", description = "Player profile endpoints"),
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
