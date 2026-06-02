use super::{admin, auth, ballchasing, health, players, replays, stats};
use utoipa::{
    openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme},
    Modify, OpenApi,
};

#[derive(OpenApi)]
#[openapi(
    paths(
        admin::reprocess_replays,
        auth::create_dev_token,
        auth::create_profile_token,
        ballchasing::load_ballchasing_replay,
        ballchasing::proxy_ballchasing_replay_file,
        health::health,
        players::get_player_profile,
        stats::get_stat_aggregates,
        replays::create_replay,
        replays::list_replays,
        replays::get_replay_by_sha256,
        replays::list_replay_groups,
        replays::create_replay_group,
        replays::get_replay_group,
        replays::list_replay_group_replays,
        replays::add_replay_group_replays,
        replays::remove_replay_group_replays,
        replays::download_replay_file,
        replays::get_replay,
    ),
    components(
        schemas(
            auth::CreateDevTokenRequest,
            admin::ReprocessReplaysRequest,
            admin::ReprocessReplaysResponse,
            crate::auth::AccessToken,
            health::HealthResponse,
            players::PlayerProfileNameResponse,
            players::PlayerProfileResponse,
            players::PlayerStatAggregateResponse,
            stats::StatAggregateResponse,
            stats::StatAggregateSetResponse,
            replays::CreateReplayGroupRequest,
            replays::CreateReplayResponse,
            replays::ListReplaysResponse,
            replays::ListReplayGroupsResponse,
            replays::ReplayGroupReplayUpdateRequest,
            replays::ReplayGroupReplayUpdateResponse,
            replays::ReplayGroupResponse,
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
        (name = "admin", description = "Administrative maintenance endpoints"),
        (name = "ballchasing", description = "Ballchasing replay loading and proxy endpoints"),
        (name = "health", description = "Service health endpoints"),
        (name = "players", description = "Player profile endpoints"),
        (name = "stats", description = "Aggregate replay statistics endpoints"),
        (name = "replays", description = "Replay upload and metadata endpoints"),
        (name = "replay-groups", description = "Replay group endpoints")
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
