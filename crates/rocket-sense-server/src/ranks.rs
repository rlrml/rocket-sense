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
        sqlx::query(
            r#"
            INSERT INTO replay_player_rank_submissions (
                replay_id, platform_player_id, platform, playlist, valid,
                tier, division, mu, sigma, mmr,
                pre_tier, pre_division, pre_mu, pre_sigma, pre_mmr
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (replay_id, platform_player_id)
            DO UPDATE SET
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
                updated_at = now()
            "#,
        )
        .bind(replay_id)
        .bind(platform_player_id)
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
            rank_mmr = s.mmr
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
