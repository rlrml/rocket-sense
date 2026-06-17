use anyhow::{anyhow, Context, Result};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{PgPool, Row};
use std::collections::BTreeMap;
use utoipa::ToSchema;
use uuid::Uuid;

const STAT_VERSION: i32 = 1;
const BUCKET_STRATEGY_VERSION: i32 = 1;

#[cfg(test)]
#[path = "population_stats_tests.rs"]
mod tests;

#[derive(Debug, Clone, Deserialize, Serialize, ToSchema)]
pub struct PopulationStatRunOptions {
    /// Minimum games a player must have in an exact segment before they
    /// contribute one player-level value to the population distribution.
    pub min_games: i32,
    /// Optional subset of registered stat keys. Empty means all registered
    /// stats.
    #[serde(default)]
    pub stat_keys: Vec<String>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct PopulationStatRunSummary {
    pub run_id: Uuid,
    pub status: String,
    pub stat_version: i32,
    pub bucket_strategy_version: i32,
    pub min_games: i32,
    pub stat_keys: Vec<String>,
    pub player_segment_count: i64,
    pub distribution_count: i64,
    pub started_at: DateTime<Utc>,
    pub finished_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum BucketStrategy {
    Fixed { edges: Vec<f64> },
    Quantile { bucket_count: usize },
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct BucketCount {
    pub lower: Option<f64>,
    pub upper: Option<f64>,
    pub count: u64,
}

#[derive(Debug, Clone, Copy)]
struct StatDefinition {
    key: &'static str,
    value_kind: StatValueKind,
    bucket_strategy: BucketStrategyRef,
}

#[derive(Debug, Clone, Copy)]
#[allow(dead_code)]
pub enum StatValueKind {
    /// Event or scoreboard counts normalized to a standard Rocket League game
    /// length. A player contributes one value per segment, so large samples do
    /// not over-weight that player in the final population distribution.
    CountingPerFiveMinutes { count_column: &'static str },
    /// Ratios such as kickoff win rate or shot percentage.
    Proportion {
        numerator_column: &'static str,
        denominator_column: &'static str,
    },
    /// Values that are already measured as magnitudes and should be averaged,
    /// such as speed or distance-to-ball.
    AverageValue {
        sum_column: &'static str,
        sample_count_column: &'static str,
    },
}

impl StatValueKind {
    fn stat_value_sql(self) -> String {
        match self {
            Self::CountingPerFiveMinutes { count_column } => format!(
                "CASE WHEN SUM(COALESCE(rp.active_time_seconds, 0.0)) > 0.0 \
                 THEN SUM(rp.{count_column})::double precision / \
                 (SUM(COALESCE(rp.active_time_seconds, 0.0)) / 300.0) \
                 END"
            ),
            Self::Proportion {
                numerator_column,
                denominator_column,
            } => format!(
                "CASE WHEN SUM(rp.{denominator_column}) > 0 \
                 THEN SUM(rp.{numerator_column})::double precision / SUM(rp.{denominator_column})::double precision \
                 END"
            ),
            Self::AverageValue {
                sum_column,
                sample_count_column,
            } => format!(
                "CASE WHEN SUM(rp.{sample_count_column}) > 0 \
                 THEN SUM(rp.{sum_column})::double precision / SUM(rp.{sample_count_column})::double precision \
                 END"
            ),
        }
    }

    fn source_predicates(self) -> Vec<String> {
        match self {
            Self::CountingPerFiveMinutes { count_column } => {
                vec![format!("rp.{count_column} IS NOT NULL")]
            }
            Self::Proportion {
                numerator_column,
                denominator_column,
            } => vec![
                format!("rp.{numerator_column} IS NOT NULL"),
                format!("rp.{denominator_column} IS NOT NULL"),
            ],
            Self::AverageValue {
                sum_column,
                sample_count_column,
            } => vec![
                format!("rp.{sum_column} IS NOT NULL"),
                format!("rp.{sample_count_column} IS NOT NULL"),
            ],
        }
    }
}

#[derive(Debug, Clone, Copy)]
enum BucketStrategyRef {
    Fixed(&'static [f64]),
    Quantile(usize),
}

impl BucketStrategyRef {
    fn materialize(self) -> BucketStrategy {
        match self {
            Self::Fixed(edges) => BucketStrategy::Fixed {
                edges: edges.to_vec(),
            },
            Self::Quantile(bucket_count) => BucketStrategy::Quantile { bucket_count },
        }
    }
}

const SCOREBOARD_RATE_EDGES: &[f64] = &[0.0, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 3.0];
const SCORE_PER_FIVE_MINUTES_EDGES: &[f64] =
    &[0.0, 100.0, 200.0, 300.0, 400.0, 500.0, 700.0, 1000.0];

const STAT_DEFINITIONS: &[StatDefinition] = &[
    StatDefinition {
        key: "score_per_5_minutes",
        value_kind: StatValueKind::CountingPerFiveMinutes {
            count_column: "score",
        },
        bucket_strategy: BucketStrategyRef::Fixed(SCORE_PER_FIVE_MINUTES_EDGES),
    },
    StatDefinition {
        key: "goals_per_5_minutes",
        value_kind: StatValueKind::CountingPerFiveMinutes {
            count_column: "goals",
        },
        bucket_strategy: BucketStrategyRef::Fixed(SCOREBOARD_RATE_EDGES),
    },
    StatDefinition {
        key: "assists_per_5_minutes",
        value_kind: StatValueKind::CountingPerFiveMinutes {
            count_column: "assists",
        },
        bucket_strategy: BucketStrategyRef::Fixed(SCOREBOARD_RATE_EDGES),
    },
    StatDefinition {
        key: "saves_per_5_minutes",
        value_kind: StatValueKind::CountingPerFiveMinutes {
            count_column: "saves",
        },
        bucket_strategy: BucketStrategyRef::Fixed(SCOREBOARD_RATE_EDGES),
    },
    StatDefinition {
        key: "shots_per_5_minutes",
        value_kind: StatValueKind::CountingPerFiveMinutes {
            count_column: "shots",
        },
        bucket_strategy: BucketStrategyRef::Quantile(20),
    },
];

pub async fn compute_population_stats(
    pool: &PgPool,
    options: PopulationStatRunOptions,
) -> Result<PopulationStatRunSummary> {
    if options.min_games <= 0 {
        return Err(anyhow!("min_games must be greater than zero"));
    }

    let definitions = selected_stat_definitions(&options.stat_keys)?;
    let stat_keys = definitions
        .iter()
        .map(|definition| definition.key.to_owned())
        .collect::<Vec<_>>();
    let run_id = Uuid::now_v7();
    let started_at = Utc::now();

    sqlx::query(
        r#"
        INSERT INTO population_stat_runs (
            id,
            status,
            stat_version,
            min_games,
            bucket_strategy_version,
            requested_stat_keys,
            segment_spec,
            started_at
        )
        VALUES ($1, 'running', $2, $3, $4, $5, $6, $7)
        "#,
    )
    .bind(run_id)
    .bind(STAT_VERSION)
    .bind(options.min_games)
    .bind(BUCKET_STRATEGY_VERSION)
    .bind(&stat_keys)
    .bind(json!({
        "dimensions": [
            "season",
            "replay_game_type",
            "playlist_key",
            "team_size",
            "rank_tier"
        ],
        "population_grain": "player"
    }))
    .bind(started_at)
    .execute(pool)
    .await
    .context("failed to create population stats run")?;

    let result = async {
        let (player_segment_count, distribution_count) =
            compute_population_stats_for_run(pool, run_id, options.min_games, &definitions).await?;
        let finished_at = Utc::now();
        sqlx::query(
            r#"
            UPDATE population_stat_runs
            SET status = 'succeeded',
                player_segment_count = $2,
                distribution_count = $3,
                finished_at = $4
            WHERE id = $1
            "#,
        )
        .bind(run_id)
        .bind(player_segment_count)
        .bind(distribution_count)
        .bind(finished_at)
        .execute(pool)
        .await
        .context("failed to mark population stats run succeeded")?;
        Ok(PopulationStatRunSummary {
            run_id,
            status: "succeeded".to_owned(),
            stat_version: STAT_VERSION,
            bucket_strategy_version: BUCKET_STRATEGY_VERSION,
            min_games: options.min_games,
            stat_keys,
            player_segment_count,
            distribution_count,
            started_at,
            finished_at,
        })
    }
    .await;

    if let Err(error) = &result {
        if let Err(update_error) = mark_run_failed(pool, run_id, error).await {
            tracing::error!(%run_id, error = %update_error, "failed to mark population stats run failed");
        }
    }

    result
}

async fn compute_population_stats_for_run(
    pool: &PgPool,
    run_id: Uuid,
    min_games: i32,
    definitions: &[StatDefinition],
) -> Result<(i64, i64)> {
    for definition in definitions {
        insert_player_segments(pool, run_id, min_games, *definition).await?;
    }

    let player_segment_count = count_rows(pool, "population_player_stat_segments", run_id).await?;
    let distributions = load_distribution_inputs(pool, run_id).await?;
    let distribution_count = insert_distributions(pool, run_id, distributions).await?;
    Ok((player_segment_count, distribution_count))
}

async fn insert_player_segments(
    pool: &PgPool,
    run_id: Uuid,
    min_games: i32,
    definition: StatDefinition,
) -> Result<()> {
    let stat_value_sql = definition.value_kind.stat_value_sql();
    let source_predicates = definition
        .value_kind
        .source_predicates()
        .into_iter()
        .map(|predicate| format!("              AND {predicate}\n"))
        .collect::<String>();

    let sql = format!(
        r#"
        INSERT INTO population_player_stat_segments (
            run_id,
            stat_key,
            season,
            replay_game_type,
            playlist_key,
            game_playlist_id,
            team_size,
            rank_bucket,
            rank_tier,
            platform,
            platform_player_id,
            game_count,
            active_time_seconds,
            stat_value
        )
        WITH replay_segments AS (
            SELECT
                segmented_replays.replay_id,
                segmented_replays.season,
                segmented_replays.replay_game_type,
                COALESCE(
                    segmented_replays.game_playlist_id::text,
                    segmented_replays.playlist,
                    segmented_replays.replay_game_type || '-' || segmented_replays.team_size::text || 'v' || segmented_replays.team_size::text
                ) AS playlist_key,
                segmented_replays.game_playlist_id,
                segmented_replays.team_size
            FROM (
                SELECT
                    r.id AS replay_id,
                    COALESCE(NULLIF(btrim(r.season), ''), 'unknown') AS season,
                    COALESCE(
                        r.replay_game_type,
                        CASE
                            WHEN lower(btrim(COALESCE(r.playlist, ''))) LIKE 'ranked%' THEN 'ranked'
                            WHEN lower(btrim(COALESCE(r.playlist, ''))) LIKE 'casual%' THEN 'casual'
                            WHEN lower(btrim(COALESCE(r.playlist, ''))) LIKE 'tournament%' THEN 'tournament'
                            ELSE 'unknown'
                        END
                    ) AS replay_game_type,
                    r.game_playlist_id,
                    NULLIF(btrim(r.playlist), '') AS playlist,
                    (
                        SELECT MAX(team_player_count)::integer
                        FROM (
                            SELECT COUNT(*) AS team_player_count
                            FROM replay_players team_player
                            WHERE team_player.replay_id = r.id
                              AND team_player.team IS NOT NULL
                              AND (
                                  team_player.active_time_seconds IS NULL
                                  OR team_player.active_time_seconds > 0.0
                              )
                            GROUP BY team_player.team
                        ) team_counts
                    ) AS team_size
                FROM replays r
                WHERE r.processing_status = 'processed'
            ) segmented_replays
            WHERE segmented_replays.team_size BETWEEN 1 AND 4
        ),
        player_values AS (
            SELECT
                $1::uuid AS run_id,
                $2::text AS stat_key,
                rs.season,
                rs.replay_game_type,
                rs.playlist_key,
                rs.game_playlist_id,
                rs.team_size,
                'tier:' || rp.rank_tier::text AS rank_bucket,
                rp.rank_tier,
                rp.platform,
                rp.platform_player_id,
                COUNT(DISTINCT rp.replay_id)::integer AS game_count,
                SUM(COALESCE(rp.active_time_seconds, 0.0))::double precision AS active_time_seconds,
                {stat_value_sql} AS stat_value
            FROM replay_players rp
            JOIN replay_segments rs ON rs.replay_id = rp.replay_id
            WHERE rp.platform IS NOT NULL
              AND btrim(rp.platform) <> ''
              AND rp.platform_player_id IS NOT NULL
              AND btrim(rp.platform_player_id) <> ''
              AND rp.rank_tier IS NOT NULL
{source_predicates}
              AND (
                  rp.active_time_seconds IS NULL
                  OR rp.active_time_seconds > 0.0
              )
            GROUP BY
                rs.season,
                rs.replay_game_type,
                rs.playlist_key,
                rs.game_playlist_id,
                rs.team_size,
                rp.rank_tier,
                rp.platform,
                rp.platform_player_id
        )
        SELECT
            run_id,
            stat_key,
            season,
            replay_game_type,
            playlist_key,
            game_playlist_id,
            team_size,
            rank_bucket,
            rank_tier,
            platform,
            platform_player_id,
            game_count,
            active_time_seconds,
            stat_value
        FROM player_values
        WHERE game_count >= $3
          AND stat_value IS NOT NULL
          AND stat_value = stat_value
        "#
    );

    sqlx::query(&sql)
        .bind(run_id)
        .bind(definition.key)
        .bind(min_games)
        .execute(pool)
        .await
        .with_context(|| format!("failed to insert player segments for {}", definition.key))?;
    Ok(())
}

async fn count_rows(pool: &PgPool, table: &str, run_id: Uuid) -> Result<i64> {
    let sql = format!("SELECT COUNT(*)::bigint AS row_count FROM {table} WHERE run_id = $1");
    let row = sqlx::query(&sql)
        .bind(run_id)
        .fetch_one(pool)
        .await
        .with_context(|| format!("failed to count rows in {table}"))?;
    row.try_get("row_count")
        .with_context(|| format!("failed to decode {table} row count"))
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
struct DistributionKey {
    stat_key: String,
    season: String,
    replay_game_type: String,
    playlist_key: String,
    game_playlist_id: Option<i32>,
    team_size: i32,
    rank_bucket: String,
    rank_tier: Option<i32>,
}

#[derive(Debug, Clone)]
struct DistributionInput {
    game_count: i32,
    stat_value: f64,
}

async fn load_distribution_inputs(
    pool: &PgPool,
    run_id: Uuid,
) -> Result<BTreeMap<DistributionKey, Vec<DistributionInput>>> {
    let rows = sqlx::query(
        r#"
        SELECT
            stat_key,
            season,
            replay_game_type,
            playlist_key,
            game_playlist_id,
            team_size,
            rank_bucket,
            rank_tier,
            game_count,
            stat_value
        FROM population_player_stat_segments
        WHERE run_id = $1
        ORDER BY
            stat_key,
            season,
            replay_game_type,
            playlist_key,
            team_size,
            rank_bucket,
            stat_value
        "#,
    )
    .bind(run_id)
    .fetch_all(pool)
    .await
    .context("failed to load population player segments")?;

    let mut grouped = BTreeMap::new();
    for row in rows {
        let key = DistributionKey {
            stat_key: row.try_get("stat_key")?,
            season: row.try_get("season")?,
            replay_game_type: row.try_get("replay_game_type")?,
            playlist_key: row.try_get("playlist_key")?,
            game_playlist_id: row.try_get("game_playlist_id")?,
            team_size: row.try_get("team_size")?,
            rank_bucket: row.try_get("rank_bucket")?,
            rank_tier: row.try_get("rank_tier")?,
        };
        grouped
            .entry(key)
            .or_insert_with(Vec::new)
            .push(DistributionInput {
                game_count: row.try_get("game_count")?,
                stat_value: row.try_get("stat_value")?,
            });
    }
    Ok(grouped)
}

async fn insert_distributions(
    pool: &PgPool,
    run_id: Uuid,
    grouped: BTreeMap<DistributionKey, Vec<DistributionInput>>,
) -> Result<i64> {
    let mut inserted = 0i64;
    for (key, inputs) in grouped {
        let Some(definition) = definition_by_key(&key.stat_key) else {
            continue;
        };
        let values = inputs
            .iter()
            .map(|input| input.stat_value)
            .collect::<Vec<_>>();
        let game_count_total = inputs.iter().map(|input| input.game_count).sum::<i32>();
        let distribution = DistributionSummary::from_values(&values)
            .with_context(|| format!("failed to summarize {}", key.stat_key))?;
        let bucket_strategy = definition.bucket_strategy.materialize();
        let buckets = buckets_for_strategy(&bucket_strategy, &values)?;

        sqlx::query(
            r#"
            INSERT INTO population_stat_distributions (
                run_id,
                stat_key,
                season,
                replay_game_type,
                playlist_key,
                game_playlist_id,
                team_size,
                rank_bucket,
                rank_tier,
                bucket_strategy,
                buckets,
                player_count,
                game_count_total,
                mean,
                stddev,
                min_value,
                p10,
                p25,
                p50,
                p75,
                p90,
                max_value
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19,
                $20, $21, $22
            )
            "#,
        )
        .bind(run_id)
        .bind(&key.stat_key)
        .bind(&key.season)
        .bind(&key.replay_game_type)
        .bind(&key.playlist_key)
        .bind(key.game_playlist_id)
        .bind(key.team_size)
        .bind(&key.rank_bucket)
        .bind(key.rank_tier)
        .bind(serde_json::to_value(&bucket_strategy)?)
        .bind(serde_json::to_value(&buckets)?)
        .bind(distribution.player_count)
        .bind(game_count_total)
        .bind(distribution.mean)
        .bind(distribution.stddev)
        .bind(distribution.min_value)
        .bind(distribution.p10)
        .bind(distribution.p25)
        .bind(distribution.p50)
        .bind(distribution.p75)
        .bind(distribution.p90)
        .bind(distribution.max_value)
        .execute(pool)
        .await
        .with_context(|| format!("failed to insert distribution for {}", key.stat_key))?;
        inserted += 1;
    }

    Ok(inserted)
}

#[derive(Debug, Clone)]
struct DistributionSummary {
    player_count: i32,
    mean: f64,
    stddev: Option<f64>,
    min_value: f64,
    p10: f64,
    p25: f64,
    p50: f64,
    p75: f64,
    p90: f64,
    max_value: f64,
}

impl DistributionSummary {
    fn from_values(values: &[f64]) -> Result<Self> {
        if values.is_empty() {
            return Err(anyhow!("distribution has no values"));
        }
        if values.iter().any(|value| !value.is_finite()) {
            return Err(anyhow!("distribution contains non-finite values"));
        }

        let mut sorted = values.to_vec();
        sorted.sort_by(f64::total_cmp);
        let player_count =
            i32::try_from(sorted.len()).context("population distribution is too large")?;
        let sum = sorted.iter().sum::<f64>();
        let mean = sum / sorted.len() as f64;
        let stddev = if sorted.len() > 1 {
            let variance = sorted
                .iter()
                .map(|value| {
                    let delta = value - mean;
                    delta * delta
                })
                .sum::<f64>()
                / (sorted.len() - 1) as f64;
            Some(variance.sqrt())
        } else {
            None
        };

        Ok(Self {
            player_count,
            mean,
            stddev,
            min_value: sorted[0],
            p10: percentile_cont(&sorted, 0.10),
            p25: percentile_cont(&sorted, 0.25),
            p50: percentile_cont(&sorted, 0.50),
            p75: percentile_cont(&sorted, 0.75),
            p90: percentile_cont(&sorted, 0.90),
            max_value: sorted[sorted.len() - 1],
        })
    }
}

fn selected_stat_definitions(keys: &[String]) -> Result<Vec<StatDefinition>> {
    if keys.is_empty() {
        return Ok(STAT_DEFINITIONS.to_vec());
    }

    let mut definitions = Vec::with_capacity(keys.len());
    for key in keys {
        let key = key.trim();
        if key.is_empty() {
            continue;
        }
        let Some(definition) = definition_by_key(key) else {
            return Err(anyhow!("unknown population stat key: {key}"));
        };
        if !definitions
            .iter()
            .any(|existing: &StatDefinition| existing.key == definition.key)
        {
            definitions.push(*definition);
        }
    }
    if definitions.is_empty() {
        return Err(anyhow!("at least one stat key must be provided"));
    }
    Ok(definitions)
}

fn definition_by_key(key: &str) -> Option<&'static StatDefinition> {
    STAT_DEFINITIONS
        .iter()
        .find(|definition| definition.key == key)
}

fn buckets_for_strategy(strategy: &BucketStrategy, values: &[f64]) -> Result<Vec<BucketCount>> {
    match strategy {
        BucketStrategy::Fixed { edges } => fixed_buckets(edges, values),
        BucketStrategy::Quantile { bucket_count } => {
            let edges = quantile_edges(values, *bucket_count)?;
            fixed_buckets(&edges, values)
        }
    }
}

fn fixed_buckets(edges: &[f64], values: &[f64]) -> Result<Vec<BucketCount>> {
    if values.iter().any(|value| !value.is_finite()) {
        return Err(anyhow!("bucket values must be finite"));
    }
    if edges.iter().any(|edge| !edge.is_finite()) {
        return Err(anyhow!("bucket edges must be finite"));
    }
    if edges.windows(2).any(|window| window[0] >= window[1]) {
        return Err(anyhow!("bucket edges must be strictly increasing"));
    }

    let mut buckets = Vec::with_capacity(edges.len() + 1);
    buckets.push(BucketCount {
        lower: None,
        upper: edges.first().copied(),
        count: 0,
    });
    for window in edges.windows(2) {
        buckets.push(BucketCount {
            lower: Some(window[0]),
            upper: Some(window[1]),
            count: 0,
        });
    }
    buckets.push(BucketCount {
        lower: edges.last().copied(),
        upper: None,
        count: 0,
    });

    for value in values {
        let index = edges
            .iter()
            .position(|edge| value < edge)
            .unwrap_or(edges.len());
        buckets[index].count += 1;
    }

    Ok(buckets)
}

fn quantile_edges(values: &[f64], bucket_count: usize) -> Result<Vec<f64>> {
    if bucket_count < 2 {
        return Err(anyhow!("quantile bucket_count must be at least 2"));
    }
    if values.is_empty() {
        return Ok(Vec::new());
    }
    if values.iter().any(|value| !value.is_finite()) {
        return Err(anyhow!("quantile values must be finite"));
    }

    let mut sorted = values.to_vec();
    sorted.sort_by(f64::total_cmp);
    let mut edges = Vec::with_capacity(bucket_count.saturating_sub(1));
    for bucket in 1..bucket_count {
        let edge = percentile_cont(&sorted, bucket as f64 / bucket_count as f64);
        if edges
            .last()
            .is_none_or(|previous| f64::abs(edge - *previous) > f64::EPSILON)
        {
            edges.push(edge);
        }
    }
    Ok(edges)
}

fn percentile_cont(sorted_values: &[f64], percentile: f64) -> f64 {
    debug_assert!(!sorted_values.is_empty());
    debug_assert!(percentile.is_finite());
    let clamped = percentile.clamp(0.0, 1.0);
    let position = clamped * (sorted_values.len() - 1) as f64;
    let lower = position.floor() as usize;
    let upper = position.ceil() as usize;
    if lower == upper {
        return sorted_values[lower];
    }
    let fraction = position - lower as f64;
    sorted_values[lower] + (sorted_values[upper] - sorted_values[lower]) * fraction
}

async fn mark_run_failed(pool: &PgPool, run_id: Uuid, error: &anyhow::Error) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE population_stat_runs
        SET status = 'failed',
            error_message = $2,
            finished_at = now()
        WHERE id = $1
        "#,
    )
    .bind(run_id)
    .bind(error.to_string())
    .execute(pool)
    .await
    .context("failed to mark population stats run failed")?;
    Ok(())
}

pub fn registered_stat_keys() -> Vec<&'static str> {
    STAT_DEFINITIONS
        .iter()
        .map(|definition| definition.key)
        .collect()
}
