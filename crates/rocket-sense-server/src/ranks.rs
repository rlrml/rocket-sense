//! Ingestion of client-submitted player ranks for a replay.
//!
//! Replay files do not carry rank/MMR data, so clients submit it out of band —
//! either bundled with the upload (`ranks` multipart field) or via the
//! `POST /replays/{id}/ranks` endpoint. Submissions are stored durably in
//! `replay_player_rank_submissions` and re-applied to `replay_players` after
//! each metadata upsert, so they survive reprocessing (which deletes and
//! recreates `replay_players`).

use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use utoipa::ToSchema;
use uuid::Uuid;

#[cfg(test)]
#[path = "ranks_tests.rs"]
mod tests;

/// A skill snapshot at a single point in time (before or after the match).
/// `mu`/`sigma` are the raw TrueSkill values; `mmr` is the derived display
/// value (`mu * 20 + 100`). Any field may be absent.
#[derive(Debug, Clone, Default, Deserialize, Serialize, ToSchema)]
pub struct SkillSnapshot {
    #[serde(default)]
    pub tier: Option<i32>,
    #[serde(default)]
    pub division: Option<i32>,
    #[serde(default)]
    pub mu: Option<f64>,
    #[serde(default)]
    pub sigma: Option<f64>,
    #[serde(default)]
    pub mmr: Option<f64>,
}

/// Current per-playlist skill counters from PsyNet's `GetPlayersSkills`,
/// fetched by the client at sync time.
///
/// Unlike [`SubmittedRank::after`]/[`SubmittedRank::before`] — which are the
/// match-history snapshot tied to *this* match — these counters are a
/// point-in-time value as of `fetched_at`, a moment *after* the match was
/// played. They are the only source for `win_streak`, `matches_played`, and
/// `placement_matches_played` (match history does not carry them), but they are
/// only meaningful when `fetched_at` is close to the match time. For a backfill
/// of old replays the gap can be large, so consumers should weigh staleness
/// (`fetched_at` minus the match timestamp) before trusting them.
#[derive(Debug, Clone, Default, Deserialize, Serialize, ToSchema)]
pub struct CurrentSkill {
    /// PsyNet's own MMR value for the playlist (not derived from mu).
    #[serde(default)]
    pub mmr: Option<f64>,
    #[serde(default)]
    pub win_streak: Option<i32>,
    #[serde(default)]
    pub matches_played: Option<i32>,
    #[serde(default)]
    pub placement_matches_played: Option<i32>,
    /// Unix epoch (seconds) when the snapshot was fetched — always after the
    /// match. The staleness reference for every other field here.
    #[serde(default)]
    pub fetched_at: Option<i64>,
}

/// A single player's submitted rank for a replay, captured at upload time.
///
/// This is the full PsyNet match-history skill snapshot for the player in this
/// match: the `after` rank (current) and the `before` rank, plus the playlist
/// and a `valid` flag (false for unranked playlists).
#[derive(Debug, Clone, Deserialize, Serialize, ToSchema)]
pub struct SubmittedRank {
    /// Platform-specific online id — the stable match key within a replay
    /// (e.g. SteamID64, Epic account id, PSN account id). Required.
    pub platform_player_id: String,
    /// Player display name from the source that submitted ranks. Replay parsing
    /// remains the fallback when this is absent.
    #[serde(default, alias = "display_name")]
    pub player_name: Option<String>,
    /// Optional platform name. Normalized to rocket-sense's lowercase scheme
    /// (`steam`, `epic`, `ps4`, `xbox`, `switch`, ...). Stored for reference;
    /// matching is by `platform_player_id` only.
    #[serde(default)]
    pub platform: Option<String>,
    /// Playlist (queue) the skill is for.
    #[serde(default)]
    pub playlist: Option<i32>,
    /// Whether the skill is ranked/meaningful (PsyNet `bValid`).
    #[serde(default)]
    pub valid: Option<bool>,
    /// Rank after the match (the player's current rank for this playlist).
    #[serde(default)]
    pub after: SkillSnapshot,
    /// Rank before the match.
    #[serde(default)]
    pub before: SkillSnapshot,
    /// Current per-playlist counters (win streak, matches played, ...) fetched
    /// at sync time. Point-in-time as of `current.fetched_at`, NOT the match
    /// moment — see [`CurrentSkill`]. Absent when the client could not fetch it.
    #[serde(default)]
    pub current: Option<CurrentSkill>,
}

/// Payload accepted by the bundled upload field and the ranks endpoint.
#[derive(Debug, Clone, Default, Deserialize, Serialize, ToSchema)]
pub struct RankSubmission {
    #[serde(default)]
    pub players: Vec<SubmittedRank>,
}

impl RankSubmission {
    pub fn is_empty(&self) -> bool {
        self.players.is_empty()
    }

    pub fn observability_summary(&self) -> RankSubmissionObservabilitySummary {
        RankSubmissionObservabilitySummary::from_submission(self)
    }
}

/// Privacy-preserving counts used when logging submitted rank payloads.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct RankSubmissionObservabilitySummary {
    pub players: usize,
    pub player_names: usize,
    pub platforms: usize,
    pub playlists: usize,
    pub valid_flags: usize,
    pub after_snapshots: usize,
    pub before_snapshots: usize,
    pub current_snapshots: usize,
    pub current_mmr: usize,
    pub current_win_streak: usize,
    pub current_matches_played: usize,
    pub current_placement_matches_played: usize,
    pub current_fetched_at: usize,
}

impl RankSubmissionObservabilitySummary {
    fn from_submission(submission: &RankSubmission) -> Self {
        let mut summary = Self {
            players: submission.players.len(),
            ..Self::default()
        };

        for player in &submission.players {
            if player.player_name.as_deref().is_some_and(has_text) {
                summary.player_names += 1;
            }
            if player.platform.is_some() {
                summary.platforms += 1;
            }
            if player.playlist.is_some() {
                summary.playlists += 1;
            }
            if player.valid.is_some() {
                summary.valid_flags += 1;
            }
            if has_skill_snapshot_fields(&player.after) {
                summary.after_snapshots += 1;
            }
            if has_skill_snapshot_fields(&player.before) {
                summary.before_snapshots += 1;
            }
            let Some(current) = &player.current else {
                continue;
            };
            summary.current_snapshots += 1;
            if current.mmr.is_some() {
                summary.current_mmr += 1;
            }
            if current.win_streak.is_some() {
                summary.current_win_streak += 1;
            }
            if current.matches_played.is_some() {
                summary.current_matches_played += 1;
            }
            if current.placement_matches_played.is_some() {
                summary.current_placement_matches_played += 1;
            }
            if current.fetched_at.is_some() {
                summary.current_fetched_at += 1;
            }
        }

        summary
    }
}

fn has_skill_snapshot_fields(snapshot: &SkillSnapshot) -> bool {
    snapshot.tier.is_some()
        || snapshot.division.is_some()
        || snapshot.mu.is_some()
        || snapshot.sigma.is_some()
        || snapshot.mmr.is_some()
}

fn has_text(value: &str) -> bool {
    !value.trim().is_empty()
}

/// Outcome of ingesting a rank submission.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct RankIngestSummary {
    /// Rows written to the durable submissions table.
    pub submitted: u64,
    /// `replay_players` rows updated with a matching submission.
    pub matched: u64,
}

/// Upserts the submitted ranks, then applies them to the replay's players.
pub async fn ingest_rank_submissions(
    pool: &PgPool,
    replay_id: Uuid,
    submission: &RankSubmission,
) -> Result<RankIngestSummary> {
    let submitted = upsert_rank_submissions(pool, replay_id, submission).await?;
    let matched = apply_rank_submissions_to_players(pool, replay_id).await?;
    Ok(RankIngestSummary { submitted, matched })
}

/// Persists submitted ranks durably, keyed by `(replay_id, platform_player_id)`.
pub async fn upsert_rank_submissions(
    pool: &PgPool,
    replay_id: Uuid,
    submission: &RankSubmission,
) -> Result<u64> {
    let mut submitted = 0u64;
    for player in &submission.players {
        let platform_player_id = player.platform_player_id.trim();
        if platform_player_id.is_empty() {
            continue;
        }
        let platform = player.platform.as_deref().and_then(normalize_platform);
        let player_name = player
            .player_name
            .as_deref()
            .map(str::trim)
            .filter(|value| !value.is_empty());
        let current = player.current.clone().unwrap_or_default();
        sqlx::query(
            r#"
            INSERT INTO replay_player_rank_submissions (
                replay_id, platform_player_id, player_name, platform, playlist, valid,
                tier, division, mu, sigma, mmr,
                pre_tier, pre_division, pre_mu, pre_sigma, pre_mmr,
                current_mmr, win_streak, matches_played,
                placement_matches_played, current_fetched_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
                    $16, $17, $18, $19, $20, $21)
            ON CONFLICT (replay_id, platform_player_id)
            DO UPDATE SET
                player_name = COALESCE(EXCLUDED.player_name, replay_player_rank_submissions.player_name),
                platform = EXCLUDED.platform,
                playlist = EXCLUDED.playlist,
                valid = EXCLUDED.valid,
                tier = EXCLUDED.tier,
                division = EXCLUDED.division,
                mu = EXCLUDED.mu,
                sigma = EXCLUDED.sigma,
                mmr = EXCLUDED.mmr,
                pre_tier = EXCLUDED.pre_tier,
                pre_division = EXCLUDED.pre_division,
                pre_mu = EXCLUDED.pre_mu,
                pre_sigma = EXCLUDED.pre_sigma,
                pre_mmr = EXCLUDED.pre_mmr,
                current_mmr = EXCLUDED.current_mmr,
                win_streak = EXCLUDED.win_streak,
                matches_played = EXCLUDED.matches_played,
                placement_matches_played = EXCLUDED.placement_matches_played,
                current_fetched_at = EXCLUDED.current_fetched_at,
                updated_at = now()
            "#,
        )
        .bind(replay_id)
        .bind(platform_player_id)
        .bind(player_name)
        .bind(&platform)
        .bind(player.playlist)
        .bind(player.valid)
        .bind(player.after.tier)
        .bind(player.after.division)
        .bind(player.after.mu)
        .bind(player.after.sigma)
        .bind(player.after.mmr)
        .bind(player.before.tier)
        .bind(player.before.division)
        .bind(player.before.mu)
        .bind(player.before.sigma)
        .bind(player.before.mmr)
        .bind(current.mmr)
        .bind(current.win_streak)
        .bind(current.matches_played)
        .bind(current.placement_matches_played)
        .bind(current.fetched_at)
        .execute(pool)
        .await
        .context("failed to upsert replay player rank submission")?;
        submitted += 1;
    }
    Ok(submitted)
}

/// Copies stored submissions onto `replay_players`, matching by online id
/// within the replay. Safe to call repeatedly (e.g. after every reprocess).
pub async fn apply_rank_submissions_to_players(pool: &PgPool, replay_id: Uuid) -> Result<u64> {
    let result = sqlx::query(
        r#"
        UPDATE replay_players AS p
        SET rank_tier = s.tier,
            rank_division = s.division,
            rank_mmr = s.mmr,
            name = COALESCE(NULLIF(btrim(s.player_name), ''), p.name)
        FROM replay_player_rank_submissions AS s
        WHERE p.replay_id = $1
          AND s.replay_id = $1
          AND p.platform_player_id = s.platform_player_id
        "#,
    )
    .bind(replay_id)
    .execute(pool)
    .await
    .context("failed to apply rank submissions to replay players")?;

    crate::processing::sync_player_identities_for_replay(pool, replay_id)
        .await
        .context("failed to sync player identities after rank submission apply")?;

    Ok(result.rows_affected())
}

/// Normalizes a platform name from any common spelling to rocket-sense's
/// lowercase scheme (matching `remote_id_parts` in `processing`). Returns
/// `None` for empty input. Unknown platforms pass through lowercased.
pub fn normalize_platform(platform: &str) -> Option<String> {
    let trimmed = platform.trim();
    if trimmed.is_empty() {
        return None;
    }
    let canonical = match trimmed.to_ascii_lowercase().as_str() {
        "ps4" | "ps3" | "ps5" | "playstation" | "psn" => "ps4",
        "xbox" | "xboxone" | "xbox_one" | "dingo" | "live" => "xbox",
        "switch" | "nnx" | "nintendo" => "switch",
        "steam" => "steam",
        "epic" | "epicgames" => "epic",
        "psynet" => "psynet",
        "qq" => "qq",
        other => return Some(other.to_string()),
    };
    Some(canonical.to_string())
}
