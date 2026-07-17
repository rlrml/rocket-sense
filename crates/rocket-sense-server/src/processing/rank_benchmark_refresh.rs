use super::current_processing_version;
use crate::rank_benchmark::{
    BenchmarkWindow, CalcStyle, SeasonSelector, MIN_APPEARANCE_SECONDS, SEASON_CURRENT_MIN_SAMPLE,
};
use anyhow::{anyhow, Context, Result};
use chrono::{DateTime, Utc};
use sqlx::{PgPool, Postgres, QueryBuilder, Row};

const RANK_BENCHMARK_REFRESH_INITIAL_DELAY: std::time::Duration =
    std::time::Duration::from_secs(2 * 60);
const RANK_BENCHMARK_REFRESH_INTERVAL: std::time::Duration =
    std::time::Duration::from_secs(24 * 60 * 60);

/// A [`BenchmarkWindow`] resolved against the database into concrete bounds and
/// a display label, ready to drive both the predicate and the
/// `rank_benchmark_meta` row.
struct ResolvedBenchmarkWindow {
    window_key: String,
    kind: &'static str,
    season_code: Option<String>,
    window_start: Option<DateTime<Utc>>,
    window_end: Option<DateTime<Utc>>,
    label: String,
}

/// Periodically recompute the rank-median benchmark cohort for every configured
/// window. A single pooled full-recompute (not per-replay durable work), so it
/// mirrors [`start_event_stream_gc_sweeper`] rather than using the apalis queue.
/// Started only when `ROCKET_SENSE_RANK_BENCHMARK` is set, so exactly one
/// service instance runs it.
pub fn start_rank_benchmark_refresh_job(
    pool: PgPool,
    windows: Vec<BenchmarkWindow>,
    calc: CalcStyle,
) {
    if windows.is_empty() {
        tracing::warn!("rank benchmark refresh job not started: no windows configured");
        return;
    }
    tokio::spawn(async move {
        tokio::time::sleep(RANK_BENCHMARK_REFRESH_INITIAL_DELAY).await;
        loop {
            match refresh_rank_benchmark(&pool, &windows, calc).await {
                Ok(refreshed) => {
                    tracing::info!(refreshed, "rank benchmark refresh complete");
                }
                Err(error) => {
                    tracing::warn!(
                        error = %format!("{error:#}"),
                        "rank benchmark refresh failed"
                    );
                }
            }
            tokio::time::sleep(RANK_BENCHMARK_REFRESH_INTERVAL).await;
        }
    });
}

/// Recompute the rank-median benchmark for each configured window, replacing
/// that window's rows transactionally. Returns the number of windows refreshed.
pub async fn refresh_rank_benchmark(
    pool: &PgPool,
    windows: &[BenchmarkWindow],
    calc: CalcStyle,
) -> Result<u64> {
    let mut refreshed = 0u64;
    for window in windows {
        let Some(resolved) = resolve_benchmark_window(pool, window).await? else {
            tracing::warn!(
                window = %window.window_key(),
                "skipping rank benchmark window with no qualifying replays"
            );
            continue;
        };
        refresh_rank_benchmark_window(pool, window, &resolved, calc)
            .await
            .with_context(|| format!("refreshing rank benchmark window {}", resolved.window_key))?;
        refreshed += 1;
    }
    Ok(refreshed)
}

/// Resolve a window into concrete bounds. Rolling windows resolve in-process;
/// season windows query the `replays.season`/`replay_date` ranges (and apply the
/// `season:current` min-sample fallback). Returns `None` when a season window
/// has no qualifying replays to bound it.
async fn resolve_benchmark_window(
    pool: &PgPool,
    window: &BenchmarkWindow,
) -> Result<Option<ResolvedBenchmarkWindow>> {
    match window {
        BenchmarkWindow::Rolling { months } => {
            let window_end = Utc::now();
            let window_start = window_end
                .checked_sub_months(chrono::Months::new(*months))
                .ok_or_else(|| anyhow!("rolling window {months} months overflowed"))?;
            Ok(Some(ResolvedBenchmarkWindow {
                window_key: window.window_key(),
                kind: window.kind(),
                season_code: None,
                window_start: Some(window_start),
                window_end: Some(window_end),
                label: window.default_label(),
            }))
        }
        BenchmarkWindow::Season(selector) => {
            let resolved_code = match selector {
                SeasonSelector::Code(code) => code.clone(),
                SeasonSelector::Current => match resolve_current_season(pool).await? {
                    Some(code) => code,
                    None => return Ok(None),
                },
            };
            // Bound the season by its actual replay-date range (informational; the
            // predicate filters on the season code itself).
            let bounds = sqlx::query(
                r#"
                SELECT MIN(replay_date) AS lo, MAX(replay_date) AS hi, COUNT(*) AS cnt
                FROM replays
                WHERE season = $1
                  AND canonical_analysis_run_id IS NOT NULL
                  AND NOT exclude_from_aggregates
                "#,
            )
            .bind(&resolved_code)
            .fetch_one(pool)
            .await?;
            let count: i64 = bounds.try_get("cnt")?;
            if count == 0 {
                return Ok(None);
            }
            Ok(Some(ResolvedBenchmarkWindow {
                window_key: window.window_key(),
                kind: window.kind(),
                season_code: Some(resolved_code.clone()),
                window_start: bounds.try_get("lo")?,
                window_end: bounds.try_get("hi")?,
                label: format!("Season {resolved_code}"),
            }))
        }
    }
}

/// Pick the season `season:current` resolves to: the most recent season (by its
/// `replay_date` range, not the text code) that already has enough replays,
/// falling back to the most recent prior season while a new one is still thin.
pub(crate) async fn resolve_current_season(pool: &PgPool) -> Result<Option<String>> {
    let rows = sqlx::query(
        r#"
        SELECT season, COUNT(*) AS cnt
        FROM replays
        WHERE season IS NOT NULL
          AND btrim(season) <> ''
          AND canonical_analysis_run_id IS NOT NULL
          AND NOT exclude_from_aggregates
          AND replay_date IS NOT NULL
        GROUP BY season
        ORDER BY MAX(replay_date) DESC
        "#,
    )
    .fetch_all(pool)
    .await?;
    let mut most_recent: Option<String> = None;
    for row in &rows {
        let season: String = row.try_get("season")?;
        let count: i64 = row.try_get("cnt")?;
        if most_recent.is_none() {
            most_recent = Some(season.clone());
        }
        if count >= SEASON_CURRENT_MIN_SAMPLE {
            return Ok(Some(season));
        }
    }
    // No season clears the threshold; use the most recent one we have, if any.
    Ok(most_recent)
}

/// Additive-vs-gauge classification for the TEAM grain, applied generically to
/// the same `metric_key` universe the player grain materializes (each metric's
/// `(numerator, denom)` expression is defined in the `metric_values` CTE of
/// [`refresh_rank_benchmark_window`]; this is the single place the team-side
/// semantics of those keys are encoded):
///
/// * ADDITIVE metrics (event counts incl. `score` and `goaltag:*`, boost
///   counters/pads/overfill, `possession:count`/`touch_count`/
///   `advance_distance`, `movement:powerslides`, `movement:distance`, and
///   `fact:*` counts): the team's per-game numerator is the SUM of its
///   players' numerators, and the rate denominator is the TEAM's active
///   seconds (the replay's live-play length) -- a team of 3 does not get 3x
///   the minutes. Pooled mean = SUM(team numerators) / SUM(team seconds);
///   median = percentile over per-team-game rates.
///
/// * GAUGE / share metrics (`boost:avg_amount`, every `*_share` key,
///   `movement:avg_speed`, `positioning:distance_to_ball`,
///   `positioning:distance_to_teammates`): the team's per-game value is the
///   weight-pooled mean across its players (SUM of the players' weighted
///   numerators / SUM of their weights, i.e. the active/tracked-time-weighted
///   team average), served as a level exactly like the player grain.
///
/// The synthetic team-only `meta:game_seconds` metric is emitted separately
/// (numerator = team seconds, denom = 1) so its "rate" IS the team-game
/// length in seconds, letting readers convert per-minute rates to per-game.
///
/// `tm` is the `team_metric` CTE row; keep the predicate generic (suffix +
/// explicit gauge keys) so new metrics classify correctly by naming convention.
const TEAM_GAUGE_METRIC_PREDICATE_SQL: &str = "(tm.metric_key ~ '_share$' OR tm.metric_key IN \
     ('boost:avg_amount', 'movement:avg_speed', 'positioning:distance_to_ball', 'positioning:distance_to_teammates'))";

/// Replace one window's `rank_benchmark_*` rows in a single transaction.
async fn refresh_rank_benchmark_window(
    pool: &PgPool,
    window: &BenchmarkWindow,
    resolved: &ResolvedBenchmarkWindow,
    calc: CalcStyle,
) -> Result<()> {
    // Server pipeline snapshot that RUNS this aggregation (recorded on the meta
    // row alongside the source-replay provenance computed below).
    let current = current_processing_version();
    let mut tx = pool.begin().await?;

    for table in [
        "rank_benchmark_stats",
        "rank_benchmark_population",
        "rank_benchmark_meta",
    ] {
        sqlx::query(&format!("DELETE FROM {table} WHERE window_key = $1"))
            .bind(&resolved.window_key)
            .execute(&mut *tx)
            .await?;
    }

    // Per-(replay, player) appearances within the window. DISTINCT ON the
    // analysis run + player identity so a player holding two roster rows in one
    // replay (rare) counts once, matching `player_replay_event_counts`' grain.
    let mut builder = QueryBuilder::<Postgres>::new(
        r#"
        WITH appearance AS (
            SELECT DISTINCT ON (r.canonical_analysis_run_id, concat(rp.platform, ':', rp.platform_player_id))
                r.canonical_analysis_run_id AS analysis_run_id,
                rp.replay_id,
                concat(rp.platform, ':', rp.platform_player_id) AS player_subject_id,
                rp.rank_tier,
                rp.team AS team,
                rp.score AS score,
                COALESCE(rp.goals, 0) AS goals,
                CASE
                    WHEN rp.team = 0 THEN r.team_zero_score
                    WHEN rp.team = 1 THEN r.team_one_score
                END AS team_score,
                CASE
                    WHEN rp.team = 0 THEN r.team_one_score
                    WHEN rp.team = 1 THEN r.team_zero_score
                END AS opponent_score,
                "#,
    );
    crate::api::push_playlist_group_key_expression(&mut builder, "r");
    builder.push(
        r#" AS playlist_group_key,
                COALESCE(rp.active_time_seconds, 0.0) AS active_seconds,
                GREATEST(COALESCE(rp.active_time_seconds, 0.0) - COALESCE(rp.time_demolished_seconds, 0.0), 0.0) AS non_demo_active_seconds,
                CASE
                    WHEN r.team_zero_score IS NULL OR r.team_one_score IS NULL OR r.team_zero_score = r.team_one_score THEN NULL
                    WHEN rp.team = 0 AND r.team_zero_score > r.team_one_score THEN 'win'
                    WHEN rp.team = 1 AND r.team_one_score > r.team_zero_score THEN 'win'
                    WHEN rp.team IN (0, 1) THEN 'loss'
                    ELSE NULL
                END AS appearance_outcome
            FROM replay_players rp
            JOIN replays r
              ON r.id = rp.replay_id
             AND r.canonical_analysis_run_id IS NOT NULL
             AND NOT r.exclude_from_aggregates
            WHERE rp.rank_tier >= 1
              AND rp.platform IS NOT NULL
              AND btrim(rp.platform) <> ''
              AND rp.platform_player_id IS NOT NULL
              AND btrim(rp.platform_player_id) <> ''
              AND NOT EXISTS (
                    SELECT 1 FROM player_identity_tags aggregate_excluded_tag
                    WHERE aggregate_excluded_tag.platform = rp.platform
                      AND aggregate_excluded_tag.platform_player_id = rp.platform_player_id
                      AND aggregate_excluded_tag.exclude_from_aggregates
                  )
              AND rp.active_time_seconds >= "#,
    );
    builder.push_bind(MIN_APPEARANCE_SECONDS);
    builder.push(" AND ");
    match window {
        BenchmarkWindow::Rolling { .. } => {
            let start = resolved
                .window_start
                .ok_or_else(|| anyhow!("rolling window missing resolved start"))?;
            builder.push("r.replay_date IS NOT NULL AND r.replay_date >= ");
            builder.push_bind(start);
        }
        BenchmarkWindow::Season(_) => {
            let code = resolved
                .season_code
                .as_ref()
                .ok_or_else(|| anyhow!("season window missing resolved code"))?;
            builder.push("r.season = ");
            builder.push_bind(code);
        }
    }
    builder.push(
        r#"
            ORDER BY r.canonical_analysis_run_id, concat(rp.platform, ':', rp.platform_player_id), rp.active_time_seconds DESC NULLS LAST
        ),
        appearance_keyed AS (
            SELECT * FROM appearance WHERE playlist_group_key IS NOT NULL
        ),
        -- Each appearance feeds the combined 'all' bucket plus its own decided
        -- outcome ('win'/'loss'); medians are not additive so 'all' is computed
        -- directly here, never reconstructed from win+loss. It also feeds two
        -- rank granularities: the exact 'tier' and the pooled 'group' (a rank's
        -- three divisions), so sparse tiers can fall back to the group bucket.
        appearance_bucket AS (
            SELECT a.analysis_run_id, a.replay_id, a.player_subject_id,
                   rank.grouping AS rank_grouping, rank.value AS rank_value,
                   a.playlist_group_key, a.active_seconds, a.non_demo_active_seconds,
                   a.score, a.goals, a.team_score, a.opponent_score,
                   CASE
                       WHEN a.team_score IS NOT NULL AND a.opponent_score IS NOT NULL
                       THEN a.team_score - a.opponent_score
                   END AS goal_margin,
                   a.appearance_outcome, bucket.outcome
            FROM appearance_keyed a
            CROSS JOIN LATERAL (
                SELECT 'tier'::text AS grouping, a.rank_tier AS value
                UNION ALL
                SELECT 'group'::text, CASE WHEN a.rank_tier = 22 THEN 7 ELSE (a.rank_tier - 1) / 3 END
            ) rank
            CROSS JOIN LATERAL (
                SELECT 'all'::text AS outcome
                UNION ALL
                SELECT a.appearance_outcome WHERE a.appearance_outcome IS NOT NULL
            ) bucket
        ),
        event_type_universe AS (
            SELECT DISTINCT event_type_id FROM player_replay_event_counts
        ),
        -- Goals split by flavor (aerial, flip reset, ...), from the JSONB `tags`
        -- on the scorer's `goal_context` event. Classified live here (not
        -- materialized) since the daily refresh can absorb the canonical-goal
        -- scan; 0-filled across kinds below so a player who scored no aerial
        -- goals enters that kind's distribution at 0.
        goal_tag_counts AS (
            SELECT ev.analysis_run_id,
                   scorer_rp.replay_id,
                   concat(scorer_rp.platform, ':', scorer_rp.platform_player_id) AS player_subject_id,
                   tag->>'kind' AS kind,
                   COUNT(*) AS goals
            FROM play_events ev
            JOIN event_types goal_et ON goal_et.id = ev.event_type_id AND goal_et.key = 'goal_context'
            JOIN replays gr ON gr.canonical_analysis_run_id = ev.analysis_run_id
            JOIN play_event_subjects scorer ON scorer.event_id = ev.id AND scorer.role = 'scorer'
            JOIN replay_players scorer_rp ON scorer_rp.id = scorer.replay_player_id
            JOIN play_event_payloads payload ON payload.event_id = ev.id
            CROSS JOIN LATERAL jsonb_array_elements(
                CASE jsonb_typeof(payload.payload->'tags')
                    WHEN 'array' THEN payload.payload->'tags'
                    ELSE '[]'::jsonb
                END
            ) AS tag
            WHERE tag->>'kind' IS NOT NULL
              AND scorer_rp.platform IS NOT NULL AND btrim(scorer_rp.platform) <> ''
              AND scorer_rp.platform_player_id IS NOT NULL AND btrim(scorer_rp.platform_player_id) <> ''
            GROUP BY ev.analysis_run_id, scorer_rp.replay_id, player_subject_id, tag->>'kind'
        ),
        goal_tag_kinds AS (SELECT DISTINCT kind FROM goal_tag_counts),
        -- Goal-game distribution buckets for Core histograms. The values are
        -- shares (denom = 1), not rates: "what proportion of games had N
        -- scoreboard goals." The final bucket absorbs rare high-goal games so
        -- the metric-key universe remains fixed.
        goal_game_buckets(bucket_key, min_goals, max_goals) AS (
            VALUES
                ('0', 0, 0),
                ('1', 1, 1),
                ('2', 2, 2),
                ('3', 3, 3),
                ('4', 4, 4),
                ('5_plus', 5, NULL)
        ),
        team_goal_buckets(bucket_key, min_goals, max_goals) AS (
            VALUES
                ('0', 0, 0),
                ('1', 1, 1),
                ('2', 2, 2),
                ('3', 3, 3),
                ('4', 4, 4),
                ('5', 5, 5),
                ('6', 6, 6),
                ('7_plus', 7, NULL)
        ),
        total_goal_buckets(bucket_key, min_goals, max_goals) AS (
            VALUES
                ('0', 0, 0),
                ('1', 1, 1),
                ('2', 2, 2),
                ('3', 3, 3),
                ('4', 4, 4),
                ('5', 5, 5),
                ('6', 6, 6),
                ('7', 7, 7),
                ('8', 8, 8),
                ('9', 9, 9),
                ('10', 10, 10),
                ('11_plus', 11, NULL)
        ),
        margin_buckets(bucket_key, min_margin, max_margin) AS (
            VALUES
                ('neg4_plus', NULL, -4),
                ('neg3', -3, -3),
                ('neg2', -2, -2),
                ('neg1', -1, -1),
                ('0', 0, 0),
                ('pos1', 1, 1),
                ('pos2', 2, 2),
                ('pos3', 3, 3),
                ('pos4_plus', 4, NULL)
        ),
        -- Every lifetime-stat metric, long-format, one row per (appearance,
        -- metric). Each metric reduces to a (numerator, denom) pair so the same
        -- median/mean machinery covers counts, rates and gauges: rate metrics use
        -- denom = active seconds and numerator = value * 60 (per-minute); gauges
        -- (avg speed) use (weighted_sum, weight); shares use (seconds, total).
        -- Event counts are 0-filled across every event type; the other sources
        -- contribute only where their per-replay-player row exists.
        metric_values AS (
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, et.key AS metric_key,
                   COALESCE(c.event_count, 0) * 60.0 AS numerator,
                   ab.active_seconds AS denom,
                   ab.non_demo_active_seconds AS denom_non_demo
            FROM appearance_bucket ab
            CROSS JOIN event_type_universe etu
            JOIN event_types et ON et.id = etu.event_type_id
            LEFT JOIN player_replay_event_counts c
              ON c.analysis_run_id = ab.analysis_run_id
             AND c.replay_id = ab.replay_id
             AND c.player_subject_id = ab.player_subject_id
             AND c.event_type_id = etu.event_type_id
            UNION ALL
            -- Scoreboard score as a per-active-minute rate (the headline Core
            -- stat). Only emitted where the replay carried a scoreboard score.
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'score',
                   ab.score * 60.0, ab.active_seconds, ab.non_demo_active_seconds
            FROM appearance_bucket ab
            WHERE ab.score IS NOT NULL
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'core:goal_games:' || b.bucket_key,
                   CASE
                       WHEN ab.goals >= b.min_goals AND (b.max_goals IS NULL OR ab.goals <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0,
                   NULL
            FROM appearance_bucket ab
            CROSS JOIN goal_game_buckets b
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'outcome:win_share',
                   CASE WHEN ab.appearance_outcome = 'win' THEN 1.0 ELSE 0.0 END,
                   1.0,
                   NULL
            FROM appearance_bucket ab
            WHERE ab.appearance_outcome IS NOT NULL
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'outcome:margin:' || b.bucket_key,
                   CASE
                       WHEN ab.goal_margin IS NOT NULL
                        AND (b.min_margin IS NULL OR ab.goal_margin >= b.min_margin)
                        AND (b.max_margin IS NULL OR ab.goal_margin <= b.max_margin)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0,
                   NULL
            FROM appearance_bucket ab
            CROSS JOIN margin_buckets b
            WHERE ab.goal_margin IS NOT NULL
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'outcome:team_goals:' || b.bucket_key,
                   CASE
                       WHEN ab.team_score IS NOT NULL
                        AND ab.team_score >= b.min_goals
                        AND (b.max_goals IS NULL OR ab.team_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0,
                   NULL
            FROM appearance_bucket ab
            CROSS JOIN team_goal_buckets b
            WHERE ab.team_score IS NOT NULL
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'outcome:opponent_team_goals:' || b.bucket_key,
                   CASE
                       WHEN ab.opponent_score IS NOT NULL
                        AND ab.opponent_score >= b.min_goals
                        AND (b.max_goals IS NULL OR ab.opponent_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0,
                   NULL
            FROM appearance_bucket ab
            CROSS JOIN team_goal_buckets b
            WHERE ab.opponent_score IS NOT NULL
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'outcome:total_goals:' || b.bucket_key,
                   CASE
                       WHEN ab.team_score IS NOT NULL AND ab.opponent_score IS NOT NULL
                        AND ab.team_score + ab.opponent_score >= b.min_goals
                        AND (b.max_goals IS NULL OR ab.team_score + ab.opponent_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0,
                   NULL
            FROM appearance_bucket ab
            CROSS JOIN total_goal_buckets b
            WHERE ab.team_score IS NOT NULL AND ab.opponent_score IS NOT NULL
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, m.metric_key, m.numerator, m.denom, NULL
            FROM appearance_bucket ab
            JOIN player_replay_boost b
              ON b.analysis_run_id = ab.analysis_run_id AND b.player_subject_id = ab.player_subject_id
            CROSS JOIN LATERAL (VALUES
                ('boost:collected', b.boost_collected * 60.0, ab.active_seconds),
                ('boost:stolen', b.boost_stolen * 60.0, ab.active_seconds),
                ('boost:used', b.boost_used * 60.0, ab.active_seconds),
                ('boost:used_supersonic', b.boost_used_supersonic * 60.0, ab.active_seconds),
                ('boost:overfill', b.boost_overfill * 60.0, ab.active_seconds),
                ('boost:big_pads', b.big_pads * 60.0, ab.active_seconds),
                ('boost:small_pads', b.small_pads * 60.0, ab.active_seconds),
                ('boost:stolen_big_pads', b.stolen_big_pads * 60.0, ab.active_seconds),
                ('boost:stolen_small_pads', b.stolen_small_pads * 60.0, ab.active_seconds),
                ('boost:avg_amount', b.boost_amount_weighted_sum, NULLIF(b.tracked_seconds, 0)),
                ('boost:time_empty_share', b.time_empty, NULLIF(b.tracked_seconds, 0)),
                ('boost:time_full_share', b.time_full, NULLIF(b.tracked_seconds, 0)),
                ('boost:time_supersonic_share', b.time_over, NULLIF(b.tracked_seconds, 0))
            ) AS m(metric_key, numerator, denom)
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, m.metric_key, m.numerator, m.denom, NULL
            FROM appearance_bucket ab
            JOIN player_replay_movement mv
              ON mv.analysis_run_id = ab.analysis_run_id AND mv.player_subject_id = ab.player_subject_id
            CROSS JOIN LATERAL (VALUES
                ('movement:avg_speed', mv.speed_weighted, NULLIF(mv.speed_weight, 0)),
                ('movement:supersonic_share', mv.supersonic_seconds, NULLIF(mv.active_seconds, 0)),
                ('movement:boost_speed_share', mv.boost_seconds, NULLIF(mv.active_seconds, 0)),
                ('movement:slow_share', mv.slow_seconds, NULLIF(mv.active_seconds, 0)),
                ('movement:ground_share', mv.ground_seconds, NULLIF(mv.active_seconds, 0)),
                ('movement:low_air_share', mv.low_air_seconds, NULLIF(mv.active_seconds, 0)),
                ('movement:high_air_share', mv.high_air_seconds, NULLIF(mv.active_seconds, 0)),
                ('movement:powerslides', mv.powerslide_count * 60.0, ab.active_seconds),
                ('movement:distance', mv.total_distance * 60.0, ab.active_seconds)
            ) AS m(metric_key, numerator, denom)
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'fact:' || f.stat_key,
                   f.value * 60.0, NULLIF(f.active_time_seconds, 0), NULL
            FROM appearance_bucket ab
            JOIN player_replay_stat_facts f
              ON f.analysis_run_id = ab.analysis_run_id AND f.player_subject_id = ab.player_subject_id
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, m.metric_key, m.numerator, m.denom, NULL
            FROM appearance_bucket ab
            JOIN player_replay_possession p
              ON p.analysis_run_id = ab.analysis_run_id AND p.player_subject_id = ab.player_subject_id
            CROSS JOIN LATERAL (VALUES
                ('possession:count', p.possession_count * 60.0, ab.active_seconds),
                ('possession:touch_count', p.touch_count * 60.0, ab.active_seconds),
                ('possession:advance_distance', p.advance_distance * 60.0, ab.active_seconds),
                ('possession:duration_share', p.duration_seconds, ab.active_seconds),
                ('possession:carry_time_share', p.carry_time, ab.active_seconds),
                ('possession:air_dribble_time_share', p.air_dribble_time, ab.active_seconds)
            ) AS m(metric_key, numerator, denom)
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, m.metric_key, m.numerator, m.denom, NULL
            FROM appearance_bucket ab
            JOIN player_replay_positioning pos
              ON pos.analysis_run_id = ab.analysis_run_id AND pos.player_subject_id = ab.player_subject_id
            CROSS JOIN LATERAL (VALUES
                ('positioning:defensive_third_share', pos.defensive_third_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:neutral_third_share', pos.neutral_third_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:offensive_third_share', pos.offensive_third_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:behind_ball_share', pos.behind_ball_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:ahead_of_ball_share', pos.ahead_of_ball_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:most_back_share', pos.role_most_back_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:most_forward_share', pos.role_most_forward_seconds, NULLIF(pos.tracked_seconds, 0)),
                ('positioning:distance_to_ball', pos.distance_to_ball_weighted, NULLIF(pos.distance_to_ball_weight, 0)),
                ('positioning:distance_to_teammates', pos.distance_to_teammates_weighted, NULLIF(pos.distance_to_teammates_weight, 0))
            ) AS m(metric_key, numerator, denom)
            UNION ALL
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   ab.replay_id, ab.player_subject_id, 'goaltag:' || k.kind,
                   COALESCE(gtc.goals, 0) * 60.0, ab.active_seconds, ab.non_demo_active_seconds
            FROM appearance_bucket ab
            CROSS JOIN goal_tag_kinds k
            LEFT JOIN goal_tag_counts gtc
              ON gtc.analysis_run_id = ab.analysis_run_id
             AND gtc.replay_id = ab.replay_id
             AND gtc.player_subject_id = ab.player_subject_id
             AND gtc.kind = k.kind
        ),
        -- ===== TEAM grain =====
        -- One sample unit per (replay, team) whose roster is COMPLETE and fully
        -- ranked: every rostered player on the team passed the appearance
        -- filters above AND the team is at the replay's full team size.
        --
        -- Rostered players per (replay, team), using the same participation
        -- rule as `push_replay_team_size_expression` (team set, recorded
        -- active time NULL or > 0), restricted to the window's replays.
        team_roster AS (
            SELECT rp.replay_id, rp.team, COUNT(*) AS roster_count
            FROM replay_players rp
            WHERE rp.replay_id IN (SELECT DISTINCT replay_id FROM appearance_keyed)
              AND rp.team IN (0, 1)
              AND (rp.active_time_seconds IS NULL OR rp.active_time_seconds > 0)
            GROUP BY rp.replay_id, rp.team
        ),
        replay_team_size AS (
            SELECT replay_id, MAX(roster_count) AS team_size
            FROM team_roster
            GROUP BY replay_id
        ),
        -- Qualifying (appearance-passing) players per (replay, team): the
        -- team's rank tier is the rounded average of its players' tiers, and
        -- the team's denominator is the replay's live-play length (overtime-
        -- inclusive `replays.active_seconds`), falling back to the team's max
        -- player active time when the replay-level column is absent.
        team_qualified AS (
            SELECT a.analysis_run_id, a.replay_id, a.team, a.playlist_group_key,
                   MIN(a.appearance_outcome) AS team_outcome,
                   ROUND(AVG(a.rank_tier))::int AS team_rank_tier,
                   COALESCE(NULLIF(MAX(r.active_seconds), 0.0), MAX(a.active_seconds)) AS team_seconds,
                   CASE
                       WHEN a.team = 0 THEN MAX(r.team_zero_score)
                       WHEN a.team = 1 THEN MAX(r.team_one_score)
                   END AS team_score,
                   CASE
                       WHEN a.team = 0 THEN MAX(r.team_one_score)
                       WHEN a.team = 1 THEN MAX(r.team_zero_score)
                   END AS opponent_score,
                   COUNT(*) AS qualified_count
            FROM appearance_keyed a
            JOIN replays r ON r.id = a.replay_id
            WHERE a.team IN (0, 1)
            GROUP BY a.analysis_run_id, a.replay_id, a.team, a.playlist_group_key
        ),
        team_unit AS (
            SELECT tq.*
            FROM team_qualified tq
            JOIN team_roster tr
              ON tr.replay_id = tq.replay_id AND tr.team = tq.team
             AND tr.roster_count = tq.qualified_count
            JOIN replay_team_size ts
              ON ts.replay_id = tq.replay_id AND ts.team_size = tq.qualified_count
        ),
        -- Fan each team-game across the same rank granularities and outcome
        -- buckets as player appearances (team tier -> pooled group id).
        team_bucket AS (
            SELECT tu.analysis_run_id, tu.replay_id, tu.team, tu.playlist_group_key,
                   tu.team_seconds, tu.team_score, tu.opponent_score,
                   CASE
                       WHEN tu.team_score IS NOT NULL AND tu.opponent_score IS NOT NULL
                       THEN tu.team_score - tu.opponent_score
                   END AS goal_margin,
                   tu.team_outcome,
                   rank.grouping AS rank_grouping, rank.value AS rank_value,
                   bucket.outcome
            FROM team_unit tu
            CROSS JOIN LATERAL (
                SELECT 'tier'::text AS grouping, tu.team_rank_tier AS value
                UNION ALL
                SELECT 'group'::text, CASE WHEN tu.team_rank_tier = 22 THEN 7 ELSE (tu.team_rank_tier - 1) / 3 END
            ) rank
            CROSS JOIN LATERAL (
                SELECT 'all'::text AS outcome
                UNION ALL
                SELECT tu.team_outcome WHERE tu.team_outcome IS NOT NULL
            ) bucket
        ),
        -- Per-(team-game, metric) sums across the team's players. Sourced from
        -- the player metric rows in their ('tier', 'all') bucket, which is 1:1
        -- with appearances (every appearance emits exactly that bucket), so no
        -- metric expression is duplicated and the player/team numerators can
        -- never drift apart.
        team_metric AS (
            SELECT a.analysis_run_id, a.replay_id, a.team, mv.metric_key,
                   SUM(mv.numerator) AS numerator_sum,
                   SUM(mv.denom) AS denom_sum
            FROM metric_values mv
            JOIN appearance_keyed a
              ON a.replay_id = mv.replay_id
             AND a.player_subject_id = mv.player_subject_id
            WHERE mv.rank_grouping = 'tier' AND mv.outcome = 'all'
              AND a.team IN (0, 1)
              AND mv.metric_key !~ '^core:goal_games:'
              AND mv.metric_key !~ '^outcome:'
            GROUP BY a.analysis_run_id, a.replay_id, a.team, mv.metric_key
        ),
        -- One value per (team-game, metric): additive metrics rate over the
        -- TEAM's seconds, gauges pool the players' weighted numerators over
        -- their summed weights (see TEAM_GAUGE_METRIC_PREDICATE_SQL for the
        -- classification rationale). `meta:game_seconds` (denom = 1) exposes
        -- the team-game length itself so readers can convert rates to
        -- per-game numbers.
        team_rate_units AS (
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, tm.metric_key,
                   tm.numerator_sum AS numerator,
                   CASE WHEN "#,
    );
    builder.push(TEAM_GAUGE_METRIC_PREDICATE_SQL);
    builder.push(
        r#" THEN tm.denom_sum ELSE tb.team_seconds END AS denom
            FROM team_bucket tb
            JOIN team_metric tm
              ON tm.analysis_run_id = tb.analysis_run_id
             AND tm.replay_id = tb.replay_id
             AND tm.team = tb.team
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'core:goal_games:' || b.bucket_key,
                   CASE
                       WHEN tb.team_score >= b.min_goals AND (b.max_goals IS NULL OR tb.team_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0
            FROM team_bucket tb
            CROSS JOIN goal_game_buckets b
            WHERE tb.team_score IS NOT NULL
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'outcome:win_share',
                   CASE WHEN tb.team_outcome = 'win' THEN 1.0 ELSE 0.0 END,
                   1.0
            FROM team_bucket tb
            WHERE tb.team_outcome IS NOT NULL
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'outcome:margin:' || b.bucket_key,
                   CASE
                       WHEN tb.goal_margin IS NOT NULL
                        AND (b.min_margin IS NULL OR tb.goal_margin >= b.min_margin)
                        AND (b.max_margin IS NULL OR tb.goal_margin <= b.max_margin)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0
            FROM team_bucket tb
            CROSS JOIN margin_buckets b
            WHERE tb.goal_margin IS NOT NULL
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'outcome:team_goals:' || b.bucket_key,
                   CASE
                       WHEN tb.team_score IS NOT NULL
                        AND tb.team_score >= b.min_goals
                        AND (b.max_goals IS NULL OR tb.team_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0
            FROM team_bucket tb
            CROSS JOIN team_goal_buckets b
            WHERE tb.team_score IS NOT NULL
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'outcome:opponent_team_goals:' || b.bucket_key,
                   CASE
                       WHEN tb.opponent_score IS NOT NULL
                        AND tb.opponent_score >= b.min_goals
                        AND (b.max_goals IS NULL OR tb.opponent_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0
            FROM team_bucket tb
            CROSS JOIN team_goal_buckets b
            WHERE tb.opponent_score IS NOT NULL
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'outcome:total_goals:' || b.bucket_key,
                   CASE
                       WHEN tb.team_score IS NOT NULL AND tb.opponent_score IS NOT NULL
                        AND tb.team_score + tb.opponent_score >= b.min_goals
                        AND (b.max_goals IS NULL OR tb.team_score + tb.opponent_score <= b.max_goals)
                       THEN 1.0 ELSE 0.0
                   END,
                   1.0
            FROM team_bucket tb
            CROSS JOIN total_goal_buckets b
            WHERE tb.team_score IS NOT NULL AND tb.opponent_score IS NOT NULL
            UNION ALL
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   tb.replay_id, tb.team, 'meta:game_seconds', tb.team_seconds, 1.0
            FROM team_bucket tb
        ),
        team_stat_agg AS (
            SELECT playlist_group_key, rank_grouping, rank_value, outcome, metric_key,
                   percentile_cont(0.5) WITHIN GROUP (ORDER BY CASE WHEN denom > 0 THEN numerator / denom END) AS median_per_active_minute,
                   CASE WHEN SUM(denom) > 0 THEN SUM(numerator) / SUM(denom) END AS mean_per_active_minute
            FROM team_rate_units
            GROUP BY playlist_group_key, rank_grouping, rank_value, outcome, metric_key
        ),
        -- Team-grain sample adequacy: replay_count counts distinct team-games
        -- and distinct_player_count the distinct players contributing to the
        -- bucket's teams (the same MIN_SAMPLE gate the read path applies to
        -- player-grain buckets).
        team_population AS (
            SELECT tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome,
                   COUNT(DISTINCT a.player_subject_id)::int AS distinct_player_count,
                   COUNT(DISTINCT (tb.replay_id, tb.team))::int AS replay_count
            FROM team_bucket tb
            JOIN appearance_keyed a
              ON a.analysis_run_id = tb.analysis_run_id
             AND a.replay_id = tb.replay_id
             AND a.team = tb.team
            GROUP BY tb.playlist_group_key, tb.rank_grouping, tb.rank_value, tb.outcome
        ),
        "#,
    );

    // Calc-style-specific: define `rate_units` (one row per sample unit ×
    // metric) and `population`. The sample unit is a player (per-player) or a
    // (player, game) appearance (per-appearance).
    match calc {
        CalcStyle::PerPlayer => {
            builder.push(
                r#"
        player_games AS (
            SELECT playlist_group_key, rank_grouping, rank_value, outcome, player_subject_id,
                   COUNT(DISTINCT replay_id) AS games
            FROM appearance_bucket
            GROUP BY playlist_group_key, rank_grouping, rank_value, outcome, player_subject_id
        ),
        -- One value per qualifying player per metric: their pooled rate/level
        -- across their games (sum numerator / sum denom).
        rate_units AS (
            SELECT mv.playlist_group_key, mv.rank_grouping, mv.rank_value, mv.outcome, mv.metric_key,
                   SUM(mv.numerator) AS numerator,
                   SUM(mv.denom) AS denom,
                   SUM(mv.denom_non_demo) AS denom_non_demo,
                   CASE WHEN SUM(mv.denom) > 0 THEN SUM(mv.numerator) / SUM(mv.denom) END AS per_active_minute,
                   CASE WHEN SUM(mv.denom_non_demo) > 0 THEN SUM(mv.numerator) / SUM(mv.denom_non_demo) END AS per_non_demo_active_minute
            FROM metric_values mv
            JOIN player_games g
              ON g.playlist_group_key = mv.playlist_group_key AND g.rank_grouping = mv.rank_grouping
             AND g.rank_value = mv.rank_value AND g.outcome = mv.outcome
             AND g.player_subject_id = mv.player_subject_id
            WHERE g.games >= "#,
            );
            builder.push_bind(crate::rank_benchmark::MIN_PLAYER_GAMES);
            builder.push(
                r#"
            GROUP BY mv.playlist_group_key, mv.rank_grouping, mv.rank_value, mv.outcome,
                     mv.metric_key, mv.player_subject_id
        ),
        population AS (
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   COUNT(DISTINCT ab.player_subject_id)::int AS distinct_player_count,
                   COUNT(DISTINCT ab.replay_id)::int AS replay_count
            FROM appearance_bucket ab
            JOIN player_games g
              ON g.playlist_group_key = ab.playlist_group_key AND g.rank_grouping = ab.rank_grouping
             AND g.rank_value = ab.rank_value AND g.outcome = ab.outcome
             AND g.player_subject_id = ab.player_subject_id
            WHERE g.games >= "#,
            );
            builder.push_bind(crate::rank_benchmark::MIN_PLAYER_GAMES);
            builder.push(
                r#"
            GROUP BY ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome
        ),
        "#,
            );
        }
        CalcStyle::PerAppearance => {
            builder.push(
                r#"
        -- One value per (player, game) appearance per metric. No min-games floor,
        -- so every game counts -- many more samples for rare metrics.
        rate_units AS (
            SELECT playlist_group_key, rank_grouping, rank_value, outcome, metric_key,
                   numerator, denom, denom_non_demo,
                   CASE WHEN denom > 0 THEN numerator / denom END AS per_active_minute,
                   CASE WHEN denom_non_demo > 0 THEN numerator / denom_non_demo END AS per_non_demo_active_minute
            FROM metric_values
        ),
        population AS (
            SELECT ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome,
                   COUNT(DISTINCT ab.player_subject_id)::int AS distinct_player_count,
                   COUNT(DISTINCT ab.replay_id)::int AS replay_count
            FROM appearance_bucket ab
            GROUP BY ab.playlist_group_key, ab.rank_grouping, ab.rank_value, ab.outcome
        ),
        "#,
            );
        }
    }

    // Shared across calc styles: per-cell median + pooled mean + the rare-stat
    // aggregator decision, then the transactional inserts.
    builder.push(
        r#"stat_agg AS (
            SELECT playlist_group_key, rank_grouping, rank_value, outcome, metric_key,
                   percentile_cont(0.5) WITHIN GROUP (ORDER BY per_active_minute) AS median_per_active_minute,
                   percentile_cont(0.5) WITHIN GROUP (ORDER BY per_non_demo_active_minute) AS median_per_non_demo_active_minute,
                   CASE WHEN SUM(denom) > 0 THEN SUM(numerator) / SUM(denom) END AS mean_per_active_minute,
                   CASE WHEN SUM(denom_non_demo) > 0 THEN SUM(numerator) / SUM(denom_non_demo) END AS mean_per_non_demo_active_minute,
                   COUNT(*) FILTER (WHERE numerator > 0) AS nonzero_units,
                   COUNT(*) AS total_units
            FROM rate_units
            GROUP BY playlist_group_key, rank_grouping, rank_value, outcome, metric_key
        ),
        -- One aggregator per (group, metric): pooled mean across the board. The
        -- benchmark is then computed the same way as the player's own stat
        -- (sum(numerator)/sum(denom)), so the two are directly comparable. A median
        -- line sits systematically below any mean-based number on right-skewed rate
        -- stats (median player < mean), which made every player -- and their
        -- teammates and opponents -- read "above the line" regardless of playstyle.
        -- median_* columns are still materialized for a future percentile view.
        stat_aggregator AS (
            SELECT playlist_group_key, metric_key, 'mean' AS aggregator
            FROM stat_agg
            GROUP BY playlist_group_key, metric_key
        ),
        ins_stats AS (
            INSERT INTO rank_benchmark_stats (
                window_key, grain, playlist_group_key, rank_grouping, rank_value, outcome, metric_key,
                median_per_active_minute, median_per_non_demo_active_minute,
                mean_per_active_minute, mean_per_non_demo_active_minute, aggregator
            )
            SELECT "#,
    );
    builder.push_bind(&resolved.window_key);
    builder.push(
        r#", 'player', sa.playlist_group_key, sa.rank_grouping, sa.rank_value, sa.outcome, sa.metric_key,
                   sa.median_per_active_minute, sa.median_per_non_demo_active_minute,
                   sa.mean_per_active_minute, sa.mean_per_non_demo_active_minute, agg.aggregator
            FROM stat_agg sa
            JOIN stat_aggregator agg
              ON agg.playlist_group_key = sa.playlist_group_key
             AND agg.metric_key = sa.metric_key
            UNION ALL
            -- Team grain: no non-demo variant (a team is never "demolished"),
            -- and the served aggregator is the pooled mean, matching the
            -- player grain's across-the-board 'mean' choice above.
            SELECT "#,
    );
    builder.push_bind(&resolved.window_key);
    builder.push(
        r#", 'team', tsa.playlist_group_key, tsa.rank_grouping, tsa.rank_value, tsa.outcome, tsa.metric_key,
                   tsa.median_per_active_minute, NULL,
                   tsa.mean_per_active_minute, NULL, 'mean'
            FROM team_stat_agg tsa
            RETURNING 1
        )
        INSERT INTO rank_benchmark_population (
            window_key, grain, playlist_group_key, rank_grouping, rank_value, outcome, distinct_player_count, replay_count
        )
        SELECT "#,
    );
    builder.push_bind(&resolved.window_key);
    builder.push(
        r#", 'player', playlist_group_key, rank_grouping, rank_value, outcome, distinct_player_count, replay_count
        FROM population
        UNION ALL
        SELECT "#,
    );
    builder.push_bind(&resolved.window_key);
    builder.push(
        r#", 'team', playlist_group_key, rank_grouping, rank_value, outcome, distinct_player_count, replay_count
        FROM team_population"#,
    );
    builder.build().execute(&mut *tx).await?;

    // Source-replay provenance (see migration 0085): the distribution of
    // processed_with_* versions across the replays feeding this window. Unlike
    // the `current` server snapshot below, this reflects what actually produced
    // the underlying event counts, so it reveals whether the trends are on the
    // latest subtr-actor or on stale, un-reprocessed data. Mirrors the window
    // predicate + appearance gate of the benchmark query above.
    let mut summary_builder = QueryBuilder::<Postgres>::new(
        r#"
        WITH src AS (
            SELECT
                r.processed_with_subtr_actor_version AS subtr_actor_version,
                r.processed_with_subtr_actor_git_sha AS subtr_actor_git_sha,
                r.processed_with_rocket_sense_git_sha AS rocket_sense_git_sha,
                r.processed_with_event_stream_schema_version AS event_stream_schema_version,
                COUNT(*) AS replay_count
            FROM replays r
            WHERE r.canonical_analysis_run_id IS NOT NULL
              AND NOT r.exclude_from_aggregates
              AND EXISTS (
                    SELECT 1 FROM replay_players rp
                    WHERE rp.replay_id = r.id
                      AND rp.rank_tier >= 1
                      AND rp.platform IS NOT NULL
                      AND btrim(rp.platform) <> ''
                      AND rp.platform_player_id IS NOT NULL
                      AND btrim(rp.platform_player_id) <> ''
                      AND rp.active_time_seconds >= "#,
    );
    summary_builder.push_bind(MIN_APPEARANCE_SECONDS);
    summary_builder.push(") AND ");
    match window {
        BenchmarkWindow::Rolling { .. } => {
            let start = resolved
                .window_start
                .ok_or_else(|| anyhow!("rolling window missing resolved start"))?;
            summary_builder.push("r.replay_date IS NOT NULL AND r.replay_date >= ");
            summary_builder.push_bind(start);
        }
        BenchmarkWindow::Season(_) => {
            let code = resolved
                .season_code
                .as_ref()
                .ok_or_else(|| anyhow!("season window missing resolved code"))?;
            summary_builder.push("r.season = ");
            summary_builder.push_bind(code);
        }
    }
    summary_builder.push(
        r#"
            GROUP BY 1, 2, 3, 4
        )
        SELECT jsonb_build_object(
            'total_replay_count', COALESCE(SUM(replay_count), 0)::bigint,
            'versions', COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'subtr_actor_version', subtr_actor_version,
                        'subtr_actor_git_sha', subtr_actor_git_sha,
                        'rocket_sense_git_sha', rocket_sense_git_sha,
                        'event_stream_schema_version', event_stream_schema_version,
                        'replay_count', replay_count
                    ) ORDER BY replay_count DESC
                ),
                '[]'::jsonb
            )
        )
        FROM src
        "#,
    );
    let source_version_summary: serde_json::Value = summary_builder
        .build_query_scalar()
        .fetch_one(&mut *tx)
        .await?;

    sqlx::query(
        r#"
        INSERT INTO rank_benchmark_meta (
            window_key, window_kind, window_start, window_end, season_code, display_label,
            calc_style, computed_at,
            computed_with_subtr_actor_version, computed_with_subtr_actor_git_sha,
            computed_with_rocket_sense_git_sha, computed_with_event_stream_schema_version,
            source_version_summary
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, now(), $8, $9, $10, $11, $12)
        "#,
    )
    .bind(&resolved.window_key)
    .bind(resolved.kind)
    .bind(resolved.window_start)
    .bind(resolved.window_end)
    .bind(&resolved.season_code)
    .bind(&resolved.label)
    .bind(calc.as_str())
    .bind(current.subtr_actor_version)
    .bind(current.subtr_actor_git_sha)
    .bind(current.rocket_sense_git_sha)
    .bind(current.event_stream_schema_version)
    .bind(source_version_summary)
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok(())
}
