use super::{health, replays};
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(
        health::health,
        replays::create_replay,
        replays::get_replay,
    ),
    components(
        schemas(
            health::HealthResponse,
            replays::CreateReplayResponse,
            replays::ReplayResponse,
            replays::ReplayStatus,
        )
    ),
    tags(
        (name = "health", description = "Service health endpoints"),
        (name = "replays", description = "Replay upload and metadata endpoints")
    )
)]
pub struct ApiDoc;
