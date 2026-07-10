//! Disposable player/window aggregates for fast leaderboard reads.
//!
//! These rows are emphatically not sources of truth. Canonical replay metadata
//! and per-replay/player facts own the data; this module is expected to throw
//! away and recompute the cache often. Keeping the rebuild idempotent and
//! boring is more important than preserving cache rows across refreshes.

use anyhow::{Context, Result};
use sqlx::{PgPool, Row};
use std::time::Duration;

#[cfg(test)]
#[path = "leaderboard_cache_tests.rs"]
mod tests;

const REFRESH_INITIAL_DELAY: Duration = Duration::from_secs(15);
const ADVISORY_LOCK_KEY: i64 = 0x5253_4c42; // "RSLB"

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct LeaderboardCacheRefreshSummary {
    pub windows: u64,
    pub player_rows: u64,
    pub metric_rows: u64,
}

/// Start the recurring full rebuild on the process that owns background work.
///
/// A full rebuild is intentional: this cache must stay disposable, and a replay
/// reprocess or identity-exclusion change should heal without bespoke repair
/// logic. The transaction keeps readers on the previous generation until the
/// replacement is complete.
pub fn start_refresh_job(pool: PgPool, refresh_interval: Duration) {
    tokio::spawn(async move {
        tokio::time::sleep(REFRESH_INITIAL_DELAY).await;
        loop {
            match refresh(&pool).await {
                Ok(Some(summary)) => tracing::info!(
                    windows = summary.windows,
                    player_rows = summary.player_rows,
                    metric_rows = summary.metric_rows,
                    "leaderboard player/window cache refresh complete"
                ),
                Ok(None) => tracing::debug!(
                    "leaderboard player/window cache refresh skipped because another refresh is running"
                ),
                Err(error) => tracing::warn!(
                    error = %format!("{error:#}"),
                    "leaderboard player/window cache refresh failed"
                ),
            }
            tokio::time::sleep(refresh_interval).await;
        }
    });
}

/// Rebuild every cached window from authoritative replay/fact data.
///
/// Returns `None` when another process holds the refresh lock. Cache contents
/// are replaced transactionally; no incremental state is required for repair.
pub async fn refresh(pool: &PgPool) -> Result<Option<LeaderboardCacheRefreshSummary>> {
    let mut tx = pool
        .begin()
        .await
        .context("starting leaderboard cache refresh transaction")?;
    let locked: bool = sqlx::query_scalar("SELECT pg_try_advisory_xact_lock($1)")
        .bind(ADVISORY_LOCK_KEY)
        .fetch_one(&mut *tx)
        .await
        .context("acquiring leaderboard cache refresh lock")?;
    if !locked {
        return Ok(None);
    }

    // One canonical appearance can feed three disposable windows: current UTC
    // day, trailing 168 hours, and its replay season. Scope values are normalized
    // before CUBE; `*` / 0 are reserved for the generated all-scope rows.
    sqlx::query(
        r#"
        CREATE TEMP TABLE leaderboard_refresh_appearances ON COMMIT DROP AS
        WITH replay_scope AS (
            SELECT
                r.id AS replay_id,
                r.canonical_analysis_run_id AS analysis_run_id,
                COALESCE(NULLIF(lower(btrim(r.replay_game_type)), ''), '') AS game_type,
                COALESCE(NULLIF(btrim(r.playlist), ''), '') AS playlist,
                NULLIF(lower(btrim(r.season)), '') AS season,
                COALESCE(r.replay_date, r.created_at) AS replay_time,
                COALESCE(team_size.value, -1)::smallint AS team_size
            FROM replays r
            LEFT JOIN LATERAL (
                SELECT MAX(team_count)::integer AS value
                FROM (
                    SELECT COUNT(*) AS team_count
                    FROM replay_players size_player
                    WHERE size_player.replay_id = r.id
                      AND size_player.team IS NOT NULL
                      AND (
                          size_player.active_time_seconds IS NULL
                          OR size_player.active_time_seconds > 0
                      )
                    GROUP BY size_player.team
                ) team_counts
            ) team_size ON true
            WHERE r.canonical_analysis_run_id IS NOT NULL
              AND NOT r.exclude_from_aggregates
              AND COALESCE(r.replay_date, r.created_at) <= now()
        ),
        canonical_appearances AS (
            SELECT DISTINCT ON (
                scope.analysis_run_id,
                rp.platform,
                rp.platform_player_id
            )
                scope.*,
                rp.platform,
                rp.platform_player_id,
                GREATEST(COALESCE(rp.active_time_seconds, 0.0), 0.0) AS active_time_seconds
            FROM replay_scope scope
            JOIN replay_players rp ON rp.replay_id = scope.replay_id
            WHERE rp.platform IS NOT NULL
              AND btrim(rp.platform) <> ''
              AND rp.platform_player_id IS NOT NULL
              AND btrim(rp.platform_player_id) <> ''
              AND NOT EXISTS (
                  SELECT 1
                  FROM player_identity_tags excluded
                  WHERE excluded.platform = rp.platform
                    AND excluded.platform_player_id = rp.platform_player_id
                    AND excluded.exclude_from_aggregates
              )
            ORDER BY
                scope.analysis_run_id,
                rp.platform,
                rp.platform_player_id,
                rp.active_time_seconds DESC NULLS LAST
        )
        SELECT
            appearance.analysis_run_id,
            appearance.replay_id,
            appearance.platform,
            appearance.platform_player_id,
            appearance.active_time_seconds,
            appearance.game_type,
            appearance.team_size,
            appearance.playlist,
            appearance.replay_time,
            win.window_key,
            win.window_kind,
            win.window_season,
            win.window_start,
            win.window_end
        FROM canonical_appearances appearance
        CROSS JOIN LATERAL (
            SELECT
                'daily'::text AS window_key,
                'daily'::text AS window_kind,
                NULL::text AS window_season,
                date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' AS window_start,
                now() AS window_end
            WHERE appearance.replay_time >=
                date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'

            UNION ALL

            SELECT
                'trailing-7d',
                'trailing-7d',
                NULL::text,
                now() - interval '7 days',
                now()
            WHERE appearance.replay_time >= now() - interval '7 days'

            UNION ALL

            SELECT
                'season:' || appearance.season,
                'season',
                appearance.season,
                NULL::timestamptz,
                NULL::timestamptz
            WHERE appearance.season IS NOT NULL
        ) win
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("building leaderboard refresh appearances")?;

    sqlx::query(
        r#"
        CREATE INDEX leaderboard_refresh_appearances_join_idx
            ON leaderboard_refresh_appearances (
                analysis_run_id,
                replay_id,
                platform,
                platform_player_id
            )
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("indexing leaderboard refresh appearances")?;

    // Contributions retain the per-replay grain. The next step aggregates them
    // into every standard scope combination. Scoreboard core events preserve the
    // existing leaderboard semantics; role-sensitive events use their actor role
    // rather than counting both participants from the generic event-count fact.
    sqlx::query(
        r#"
        CREATE TEMP TABLE leaderboard_refresh_metric_contributions ON COMMIT DROP AS
        SELECT
            fact.analysis_run_id,
            fact.replay_id,
            fact.platform,
            fact.platform_player_id,
            'stat'::text AS metric_kind,
            fact.stat_key AS metric_key,
            SUM(fact.value)::float8 AS total_value,
            NULL::bigint AS sample_count
        FROM player_replay_stat_facts fact
        JOIN replays r
          ON r.id = fact.replay_id
         AND r.canonical_analysis_run_id = fact.analysis_run_id
        WHERE fact.stat_key IN (
            'ball-opponent-half',
            'possession-time',
            'ball-advance',
            'high-aerial-touch-count',
            'control-touch-count'
        )
        GROUP BY
            fact.analysis_run_id,
            fact.replay_id,
            fact.platform,
            fact.platform_player_id,
            fact.stat_key

        UNION ALL

        SELECT
            possession.analysis_run_id,
            possession.replay_id,
            possession.platform,
            possession.platform_player_id,
            'stat',
            metric.metric_key,
            metric.total_value,
            possession.possession_count
        FROM player_replay_possession possession
        JOIN replays r
          ON r.id = possession.replay_id
         AND r.canonical_analysis_run_id = possession.analysis_run_id
        CROSS JOIN LATERAL (
            VALUES
                ('touches-per-possession'::text, possession.touch_count::float8),
                ('avg-possession-duration'::text, possession.duration_seconds::float8)
        ) metric(metric_key, total_value)
        WHERE possession.possession_count > 0

        UNION ALL

        SELECT
            boost.analysis_run_id,
            boost.replay_id,
            boost.platform,
            boost.platform_player_id,
            'stat',
            metric.metric_key,
            metric.total_value,
            NULL::bigint
        FROM player_replay_boost boost
        JOIN replays r
          ON r.id = boost.replay_id
         AND r.canonical_analysis_run_id = boost.analysis_run_id
        CROSS JOIN LATERAL (
            VALUES
                ('big-boost-pad-count'::text, boost.big_pads::float8),
                ('small-boost-pad-count'::text, boost.small_pads::float8),
                ('big-boost-amount'::text, boost.boost_collected_big::float8),
                ('small-boost-amount'::text, boost.boost_collected_small::float8)
        ) metric(metric_key, total_value)
        WHERE metric.total_value > 0

        UNION ALL

        SELECT
            r.canonical_analysis_run_id,
            rp.replay_id,
            rp.platform,
            rp.platform_player_id,
            'event',
            metric.metric_key,
            metric.total_value,
            NULL::bigint
        FROM replay_players rp
        JOIN replays r ON r.id = rp.replay_id
        CROSS JOIN LATERAL (
            VALUES
                ('goal'::text, COALESCE(rp.goals, 0)::float8),
                ('assist'::text, COALESCE(rp.assists, 0)::float8),
                ('save'::text, COALESCE(rp.saves, 0)::float8),
                ('shot'::text, COALESCE(rp.shots, 0)::float8)
        ) metric(metric_key, total_value)
        WHERE r.canonical_analysis_run_id IS NOT NULL
          AND rp.platform IS NOT NULL
          AND btrim(rp.platform) <> ''
          AND rp.platform_player_id IS NOT NULL
          AND btrim(rp.platform_player_id) <> ''
          AND metric.total_value > 0

        UNION ALL

        SELECT
            counts.analysis_run_id,
            counts.replay_id,
            counts.platform,
            counts.platform_player_id,
            'event',
            event_type.key,
            counts.event_count::float8,
            NULL::bigint
        FROM player_replay_event_counts counts
        JOIN replays r
          ON r.id = counts.replay_id
         AND r.canonical_analysis_run_id = counts.analysis_run_id
        JOIN event_types event_type ON event_type.id = counts.event_type_id
        WHERE event_type.key NOT IN (
            'goal', 'assist', 'save', 'shot', 'bump', 'demolition', 'pass'
        )

        UNION ALL

        SELECT
            event.analysis_run_id,
            event.replay_id,
            rp.platform,
            rp.platform_player_id,
            'event',
            event_type.key,
            COUNT(DISTINCT event.id)::float8,
            NULL::bigint
        FROM play_events event
        JOIN event_types event_type ON event_type.id = event.event_type_id
        JOIN play_event_subjects subject ON subject.event_id = event.id
        JOIN replay_players rp ON rp.id = subject.replay_player_id
        JOIN replays r
          ON r.id = event.replay_id
         AND r.canonical_analysis_run_id = event.analysis_run_id
        WHERE (event_type.key = 'bump' AND subject.role = 'initiator')
           OR (event_type.key = 'demolition' AND subject.role = 'attacker')
           OR (event_type.key = 'pass' AND subject.role = 'passer')
        GROUP BY
            event.analysis_run_id,
            event.replay_id,
            rp.platform,
            rp.platform_player_id,
            event_type.key
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("building leaderboard metric contributions")?;

    sqlx::query(
        r#"
        CREATE TEMP TABLE leaderboard_refresh_metric_sums ON COMMIT DROP AS
        SELECT
            appearance.window_key,
            CASE WHEN GROUPING(appearance.game_type) = 1
                 THEN '*' ELSE appearance.game_type END AS scope_game_type,
            CASE WHEN GROUPING(appearance.team_size) = 1
                 THEN 0 ELSE appearance.team_size END AS scope_team_size,
            CASE WHEN GROUPING(appearance.playlist) = 1
                 THEN '*' ELSE appearance.playlist END AS scope_playlist,
            appearance.platform,
            appearance.platform_player_id,
            contribution.metric_kind,
            contribution.metric_key,
            SUM(contribution.total_value)::float8 AS total_value,
            SUM(contribution.sample_count)::bigint AS sample_count
        FROM leaderboard_refresh_appearances appearance
        JOIN leaderboard_refresh_metric_contributions contribution
          ON contribution.analysis_run_id = appearance.analysis_run_id
         AND contribution.replay_id = appearance.replay_id
         AND contribution.platform = appearance.platform
         AND contribution.platform_player_id = appearance.platform_player_id
        GROUP BY
            appearance.window_key,
            appearance.platform,
            appearance.platform_player_id,
            contribution.metric_kind,
            contribution.metric_key,
            CUBE(appearance.game_type, appearance.team_size, appearance.playlist)
        HAVING SUM(contribution.total_value) > 0
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("aggregating leaderboard metric scopes")?;

    // Replace the prior generation only after all expensive source work has
    // succeeded. Readers continue seeing the old committed rows until commit.
    sqlx::query("DELETE FROM leaderboard_player_window_metrics")
        .execute(&mut *tx)
        .await
        .context("clearing old leaderboard metric cache")?;
    sqlx::query("DELETE FROM leaderboard_player_window_totals")
        .execute(&mut *tx)
        .await
        .context("clearing old leaderboard player cache")?;
    sqlx::query("DELETE FROM leaderboard_cache_windows")
        .execute(&mut *tx)
        .await
        .context("clearing old leaderboard window metadata")?;

    sqlx::query(
        r#"
        INSERT INTO leaderboard_cache_windows (
            window_key,
            window_kind,
            season,
            window_start,
            window_end,
            is_current,
            refreshed_at
        )
        SELECT
            window_key,
            MAX(window_kind),
            MAX(window_season),
            COALESCE(MAX(window_start), MIN(replay_time)),
            COALESCE(MAX(window_end), MAX(replay_time)),
            MAX(window_kind) <> 'season',
            now()
        FROM leaderboard_refresh_appearances
        GROUP BY window_key
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("inserting leaderboard window metadata")?;

    sqlx::query(
        r#"
        UPDATE leaderboard_cache_windows cached_window
        SET is_current = cached_window.window_key = (
            SELECT current_window.window_key
            FROM leaderboard_cache_windows current_window
            WHERE current_window.window_kind = 'season'
            ORDER BY current_window.window_end DESC NULLS LAST, current_window.season DESC
            LIMIT 1
        )
        WHERE cached_window.window_kind = 'season'
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("marking current leaderboard season")?;

    let player_rows = sqlx::query(
        r#"
        INSERT INTO leaderboard_player_window_totals (
            window_key,
            scope_game_type,
            scope_team_size,
            scope_playlist,
            platform,
            platform_player_id,
            replay_count,
            active_time_seconds,
            refreshed_at
        )
        SELECT
            appearance.window_key,
            CASE WHEN GROUPING(appearance.game_type) = 1
                 THEN '*' ELSE appearance.game_type END,
            CASE WHEN GROUPING(appearance.team_size) = 1
                 THEN 0 ELSE appearance.team_size END,
            CASE WHEN GROUPING(appearance.playlist) = 1
                 THEN '*' ELSE appearance.playlist END,
            appearance.platform,
            appearance.platform_player_id,
            COUNT(DISTINCT appearance.replay_id),
            SUM(appearance.active_time_seconds),
            now()
        FROM leaderboard_refresh_appearances appearance
        GROUP BY
            appearance.window_key,
            appearance.platform,
            appearance.platform_player_id,
            CUBE(appearance.game_type, appearance.team_size, appearance.playlist)
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("inserting leaderboard player/window totals")?
    .rows_affected();

    let metric_rows = sqlx::query(
        r#"
        INSERT INTO leaderboard_player_window_metrics (
            window_key,
            scope_game_type,
            scope_team_size,
            scope_playlist,
            platform,
            platform_player_id,
            metric_kind,
            metric_key,
            total_value,
            replay_count,
            active_time_seconds,
            value_per_5_minutes,
            sample_count,
            average_value,
            refreshed_at
        )
        SELECT
            metric.window_key,
            metric.scope_game_type,
            metric.scope_team_size,
            metric.scope_playlist,
            metric.platform,
            metric.platform_player_id,
            metric.metric_kind,
            metric.metric_key,
            metric.total_value,
            totals.replay_count,
            totals.active_time_seconds,
            CASE WHEN totals.active_time_seconds > 0
                 THEN metric.total_value * 300.0 / totals.active_time_seconds
                 ELSE NULL END,
            metric.sample_count,
            CASE WHEN metric.sample_count > 0
                 THEN metric.total_value / metric.sample_count::float8
                 ELSE NULL END,
            now()
        FROM leaderboard_refresh_metric_sums metric
        JOIN leaderboard_player_window_totals totals
          ON totals.window_key = metric.window_key
         AND totals.scope_game_type = metric.scope_game_type
         AND totals.scope_team_size = metric.scope_team_size
         AND totals.scope_playlist = metric.scope_playlist
         AND totals.platform = metric.platform
         AND totals.platform_player_id = metric.platform_player_id
        "#,
    )
    .execute(&mut *tx)
    .await
    .context("inserting leaderboard player/window metrics")?
    .rows_affected();

    let windows: i64 = sqlx::query("SELECT COUNT(*) AS count FROM leaderboard_cache_windows")
        .fetch_one(&mut *tx)
        .await
        .context("counting refreshed leaderboard windows")?
        .try_get("count")?;

    tx.commit()
        .await
        .context("committing leaderboard cache refresh")?;

    Ok(Some(LeaderboardCacheRefreshSummary {
        windows: windows.max(0) as u64,
        player_rows,
        metric_rows,
    }))
}
