use super::{
    admin, auth, ballchasing, health, meta, player_overview, players, possession_stats, replays,
    stats,
};
use utoipa::{
    openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme},
    Modify, OpenApi,
};

#[derive(OpenApi)]
#[openapi(
    paths(
        admin::backfill_profile_timing,
        admin::gc_event_streams,
        admin::list_replay_processing_diagnostics,
        admin::reprocess_replays,
        admin::list_users,
        admin::set_user_admin,
        auth::auth_options,
        auth::create_dev_token,
        auth::create_profile_token,
        auth::get_current_user,
        ballchasing::load_ballchasing_replay,
        ballchasing::proxy_ballchasing_replay_file,
        health::health,
        meta::get_processing_version,
        players::get_player_profile,
        player_overview::get_player_stat_overview,
        possession_stats::get_possession_summary,
        stats::get_stat_aggregates,
        stats::get_processing_version_breakdown,
        replays::create_replay,
        replays::list_replays,
        replays::list_replay_filter_options,
        replays::get_replay_by_sha256,
        replays::list_replay_groups,
        replays::create_replay_group,
        replays::get_replay_group,
        replays::delete_replay_group,
        replays::list_replay_group_replays,
        replays::add_replay_group_replays,
        replays::remove_replay_group_replays,
        replays::download_replay_file,
        replays::get_replay,
        replays::reprocess_replay,
        replays::reprocess_replay_client,
        replays::set_replay_ranks,
    ),
    components(
        schemas(
            auth::CreateDevTokenRequest,
            auth::AuthOptionsResponse,
            auth::AuthProviderResponse,
            admin::BackfillProfileTimingRequest,
            admin::BackfillProfileTimingResponse,
            admin::GcEventStreamsRequest,
            admin::GcEventStreamsResponse,
            admin::AnalysisRunDiagnosticResponse,
            admin::ReplayProcessingDiagnosticResponse,
            admin::ReplayProcessingDiagnosticsResponse,
            admin::ReplayProcessingDiagnosticsSummaryResponse,
            admin::ReplayProcessingQueueCountResponse,
            admin::ReplayProcessingStatusCountResponse,
            admin::ReplayProcessingWorkerResponse,
            admin::ReplayProcessingDiagnosticsQuery,
            admin::ReprocessReplaysRequest,
            admin::ReprocessReplaysResponse,
            admin::AdminUserResponse,
            admin::AdminUsersResponse,
            admin::SetUserAdminRequest,
            auth::CurrentUserResponse,
            crate::auth::AccessToken,
            health::HealthResponse,
            meta::ProcessingVersionResponse,
            meta::SchemaChangelogEntry,
            players::PlayerProfileNameResponse,
            players::PlayerProfileResponse,
            players::PlayerProfileReplayResponse,
            players::PlayerProfileReplayTeamScoresResponse,
            player_overview::PlayerStatOverviewResponse,
            player_overview::GoalTagAggregateResponse,
            player_overview::ScoringRateResponse,
            player_overview::RotationTimeShareResponse,
            possession_stats::PossessionSummaryResponse,
            possession_stats::PossessionTeammateComparison,
            possession_stats::PossessionSpanSummary,
            possession_stats::PossessionDurationBucket,
            possession_stats::PossessionTouchSummary,
            possession_stats::PossessionMixValue,
            stats::StatAggregateResponse,
            stats::StatAggregateSetResponse,
            stats::ProcessingVersionBreakdownResponse,
            stats::ProcessingVersionBreakdownRow,
            replays::CreateReplayGroupRequest,
            replays::CreateReplayResponse,
            replays::ListReplaysResponse,
            replays::ReplayFilterOptionResponse,
            replays::ReplayFilterOptionsResponse,
            replays::ListReplayGroupsResponse,
            replays::ReplayGroupReplayUpdateRequest,
            replays::ReplayGroupReplayUpdateResponse,
            replays::ReplayGroupResponse,
            replays::ReplayPlayerResponse,
            replays::ReplayResponse,
            replays::ReplayStalenessResponse,
            replays::ReplayStatus,
            replays::ReplaySummaryResponse,
            replays::ReplayTeamScoresResponse,
            replays::ReplayUploaderResponse,
            replays::ReprocessReplayResponse,
            replays::ReprocessReplayClientRequest,
            replays::ReprocessReplayClientResponse,
            replays::SetReplayRanksResponse,
            crate::ranks::RankSubmission,
            crate::ranks::SubmittedRank,
            crate::ranks::SkillSnapshot,
        )
    ),
    tags(
        (name = "auth", description = "Development auth endpoints"),
        (name = "admin", description = "Administrative maintenance endpoints"),
        (name = "ballchasing", description = "Ballchasing replay loading and proxy endpoints"),
        (name = "health", description = "Service health endpoints"),
        (name = "meta", description = "Service metadata endpoints"),
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
