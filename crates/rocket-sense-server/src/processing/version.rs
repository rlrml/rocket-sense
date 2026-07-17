use super::DEFAULT_EXTRACTOR_NAME;

// Bumped v2 -> v3 when goal ball speed (`ball_speed_at_goal`) was corrected:
// previously every goal recorded 0 because the explosion frame carries no ball
// velocity. Bumping marks prior analyses stale so reprocessing re-emits the
// event stream with real speeds.
// Bumped v3 -> v4 for the subtr-actor boost-model rewrite: the `boost_ledger`
// and `boost_state` timeline streams were removed in favor of consolidated
// `boost_pickups`/`boost_respawn` events plus per-frame accumulation tracks.
// Bumping marks prior analyses stale so reprocessing re-keys pickups and
// persists the new boost accumulation tracks.
// Bumped v4 -> v5 for the kickoff win-strength redesign: `win_strength` is now
// the velocity-projected ball depth as a fraction of the half-field length
// (0..=1) instead of a ratio over the minimal-win threshold, and the
// narrow/clear/strong bands were recalibrated (previously ~82% of decided
// kickoffs landed in "strong"). Bumping marks prior analyses stale so
// reprocessing re-emits kickoff events on the new scale.
// Bumped v5 -> v6 for the subtr-actor PlayerStateSpan unification and kickoff
// advantage: the positioning/rotation streams (`positioning*`,
// `rotation_player`, `rotation_role_span`, `rotation_depth_span`,
// `rotation_first_man_stint`) were replaced by per-facet span streams
// (`player_activity`, `field_third`, `field_half`, `ball_depth`, `depth_role`,
// `ball_proximity`, `rotation_role`, `first_man_change`), and kickoff events
// gained the advantage verdict. Bumping marks prior analyses stale so
// reprocessing emits the new streams and kickoff advantage fields.
// Bumped v6 -> v7 for career possession stats: subtr-actor now emits the
// enriched `player_possession` span stream (indexed into
// `play_event_player_possession_details`) and touch details gained the
// intention/first-touch/contested/ball-movement facets. Bumping marks prior
// analyses stale so reprocessing persists the new spans and touch columns.
// Bumped v7 -> v8 to index per-player positioning distance summaries into the
// stats event stream. Bumping marks prior analyses stale so reprocessing fills
// the positioning page's average ball/team distance rows.
// Bumped v8 -> v9 for the loosened subtr-actor whiff detector: the
// whiff/beaten-to-ball candidate detector was retuned for recall to feed the
// event review loop, so reprocessing re-emits the now-looser whiff candidates
// for confirm/reject labeling.
// Bumped v9 -> v10 for subtr-actor's tag-based touch classification: touch
// events no longer carry fixed intention/first-touch/contested fields, so
// reprocessing derives those indexed detail columns from classification tags.
// Bumped v10 -> v11 to backfill replay-player scoreboard metadata from
// `core_player_scoreboard` deltas when the replay header lacks `PlayerStats`.
// Reprocessing fills score/goals/assists/saves/shots for replay cards, group
// participants, and Core stats.
// Bumped v11 -> v12 for subtr-actor's multi-frame dodge-contact flip reset
// detector: reprocessing classifies resets where contact begins before the
// dodge byte is sampled but the dodge still carries through the ball.
// Bumped v12 -> v13 for subtr-actor's dodge-touch rate-limit bypass: the soft
// first contact of a carry no longer swallows the dodge-powered launch touch,
// so reprocessing recovers flip-reset conversions, air-dribble touch runs, and
// flick launch measurements that the touch rate limit had dropped.
// Bumped v13 -> v14 for subtr-actor's dedicated beaten-to-ball detector: what
// was previously only a WhiffEvent subtype is now its own `beaten_to_ball`
// event stream (retrospective, touch-anchored, tuned toward recall to feed the
// event-review labeling campaigns). The submodule bump also preserves mechanic
// goal tags through late saves. Bumping marks prior analyses stale so
// reprocessing emits the new `beaten_to_ball` stream for confirm/reject
// labeling and re-tags the affected mechanic goals.
// Bumped v14 -> v15 to eagerly run the RLVision mistake detector and persist
// every surviving per-player marker as an indexed play event during the
// canonical replay-processing run.
pub(crate) const EVENT_STREAM_SCHEMA_VERSION: &str = "rocket-sense-event-stream:v15";

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
