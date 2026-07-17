use super::{DEFAULT_EXTRACTOR_NAME, EVENT_STREAM_SCHEMA_VERSION};

pub(crate) fn subtr_actor_version() -> &'static str {
    option_env!("SUBTR_ACTOR_VERSION").unwrap_or("unknown")
}

/// A short, human-readable note for each event-stream schema version, surfaced
/// in the UI so a staleness badge can explain *what* a bump changed. Keep this
/// in sync with the changelog comment above `EVENT_STREAM_SCHEMA_VERSION`.
pub(crate) const EVENT_STREAM_SCHEMA_CHANGELOG: &[(&str, &str)] = &[
    (
        "rocket-sense-event-stream:v3",
        "Corrected goal ball speed (ball_speed_at_goal); prior goals recorded 0.",
    ),
    (
        "rocket-sense-event-stream:v4",
        "subtr-actor boost-model rewrite: consolidated boost pickup/respawn events \
         and per-frame boost accumulation tracks.",
    ),
    (
        "rocket-sense-event-stream:v5",
        "Kickoff win-strength redesign: win_strength is now a 0..=1 fraction of \
         half-field depth; narrow/clear/strong bands recalibrated.",
    ),
    (
        "rocket-sense-event-stream:v6",
        "subtr-actor PlayerStateSpan unification and kickoff advantage: \
         positioning/rotation streams replaced by per-facet span streams and \
         kickoff events gained the advantage verdict.",
    ),
    (
        "rocket-sense-event-stream:v7",
        "Career possession stats: enriched player_possession spans are indexed \
         and touch details gained intention/first-touch/contested/ball-movement \
         facets.",
    ),
    (
        "rocket-sense-event-stream:v8",
        "Positioning distance summaries are indexed so the positioning stats page \
         can show average ball and teammate spacing.",
    ),
    (
        "rocket-sense-event-stream:v9",
        "Loosened whiff/beaten-to-ball detector emits more candidates; reprocess \
         to surface them for confirm/reject review.",
    ),
    (
        "rocket-sense-event-stream:v10",
        "subtr-actor touch classification now uses tags; reprocess to derive \
         touch detail columns from action/reception/possession/contested tags.",
    ),
    (
        "rocket-sense-event-stream:v11",
        "Replay-player scoreboard metadata is backfilled from core_player_scoreboard \
         deltas when the replay header lacks PlayerStats.",
    ),
    (
        "rocket-sense-event-stream:v12",
        "subtr-actor flip reset detection now handles multi-frame dodge contact; \
         reprocess to classify dodge resets where the dodge carries through the ball.",
    ),
    (
        "rocket-sense-event-stream:v13",
        "subtr-actor dodge touches bypass the touch rate limit; reprocess to \
         recover flip-reset conversions, air-dribble runs, and flick launches \
         that a preceding soft carry contact had suppressed.",
    ),
    (
        "rocket-sense-event-stream:v14",
        "subtr-actor promotes beaten-to-ball to its own event stream (was a whiff \
         subtype) and preserves mechanic goal tags through late saves; reprocess \
         to surface beaten_to_ball candidates for review labeling.",
    ),
    (
        "rocket-sense-event-stream:v15",
        "RLVision mistake detection now runs eagerly for every replay player during \
         canonical processing and persists the surviving reranked markers as play events.",
    ),
];

/// The pipeline version the running binary produces. Compared against each
/// replay's persisted `parsed_with_*` values to determine staleness.
#[derive(Debug, Clone, Copy)]
pub struct CurrentProcessingVersion {
    pub event_stream_schema_version: &'static str,
    pub extractor_name: &'static str,
    pub extractor_version: &'static str,
    pub subtr_actor_version: &'static str,
    /// `None` when the build did not record a sha (e.g. local dev).
    pub subtr_actor_git_sha: Option<&'static str>,
    pub subtr_actor_git_commit_timestamp: Option<&'static str>,
    pub rocket_sense_git_sha: Option<&'static str>,
    pub rocket_sense_git_commit_timestamp: Option<&'static str>,
}

pub fn current_processing_version() -> CurrentProcessingVersion {
    CurrentProcessingVersion {
        event_stream_schema_version: EVENT_STREAM_SCHEMA_VERSION,
        extractor_name: DEFAULT_EXTRACTOR_NAME,
        extractor_version: env!("CARGO_PKG_VERSION"),
        subtr_actor_version: subtr_actor_version(),
        subtr_actor_git_sha: option_env!("SUBTR_ACTOR_GIT_SHA"),
        subtr_actor_git_commit_timestamp: option_env!("SUBTR_ACTOR_GIT_COMMIT_TIMESTAMP"),
        rocket_sense_git_sha: option_env!("GIT_SHA"),
        rocket_sense_git_commit_timestamp: option_env!("GIT_COMMIT_TIMESTAMP"),
    }
}

#[derive(Debug, Clone, Copy, Default)]
pub struct StalenessInfo {
    pub is_stale: bool,
    pub schema_outdated: bool,
    pub subtr_actor_outdated: bool,
}

/// Decide whether a replay's persisted parse version is behind the current
/// pipeline. A replay is stale when its event-stream schema differs from
/// current (semantic change) OR its subtr-actor version/git sha differs.
///
/// Unknown/unparsed fields are treated as *not* outdated here — an unprocessed
/// replay is surfaced by its parse status, not by this version comparison.
pub fn replay_staleness(
    parsed_schema: Option<&str>,
    parsed_subtr_actor_version: Option<&str>,
    parsed_subtr_actor_git_sha: Option<&str>,
) -> StalenessInfo {
    compute_staleness(
        &current_processing_version(),
        parsed_schema,
        parsed_subtr_actor_version,
        parsed_subtr_actor_git_sha,
    )
}

pub(crate) fn compute_staleness(
    current: &CurrentProcessingVersion,
    parsed_schema: Option<&str>,
    parsed_subtr_actor_version: Option<&str>,
    parsed_subtr_actor_git_sha: Option<&str>,
) -> StalenessInfo {
    let schema_outdated = parsed_schema
        .map(|parsed| parsed != current.event_stream_schema_version)
        .unwrap_or(false);

    // Only compare subtr-actor version when the current build actually knows it
    // (a build without SUBTR_ACTOR_VERSION reports "unknown" and must not flag
    // every replay as stale).
    let version_outdated = match parsed_subtr_actor_version {
        Some(parsed) if current.subtr_actor_version != "unknown" => {
            parsed != current.subtr_actor_version
        }
        _ => false,
    };
    let git_outdated = match (parsed_subtr_actor_git_sha, current.subtr_actor_git_sha) {
        (Some(parsed), Some(current_sha)) => parsed != current_sha,
        _ => false,
    };
    let subtr_actor_outdated = version_outdated || git_outdated;

    StalenessInfo {
        is_stale: schema_outdated || subtr_actor_outdated,
        schema_outdated,
        subtr_actor_outdated,
    }
}
