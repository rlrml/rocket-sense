use anyhow::{anyhow, Context, Result};
use rocket_sense_storage::{sha256_hex, ObjectStorage};
use serde_json::Value;
use sqlx::PgPool;
use std::sync::Arc;
use subtr_actor::StatsCollector;
use uuid::Uuid;

const DEFAULT_EXTRACTOR_NAME: &str = "rocket-sense:aggregate-stats";
const DEFAULT_CONFIG_HASH: &str = "aggregate-stats:v1:all-builtin-modules";

pub fn spawn_replay_processing(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    replay_id: Uuid,
    file_sha256: String,
    storage_key: String,
) {
    tokio::spawn(async move {
        if let Err(error) = process_replay(pool, storage, replay_id, file_sha256, storage_key).await
        {
            tracing::error!(%replay_id, error = %error, "replay background processing failed");
        }
    });
}

async fn process_replay(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    replay_id: Uuid,
    file_sha256: String,
    storage_key: String,
) -> Result<()> {
    set_replay_status(&pool, replay_id, "parsing").await?;

    let analysis_run_id = Uuid::now_v7();
    insert_analysis_run(&pool, analysis_run_id, replay_id, &file_sha256).await?;

    let result = async {
        let replay_bytes = storage
            .get(&storage_key)
            .await
            .with_context(|| format!("failed to read replay object `{storage_key}`"))?;
        let stats = tokio::task::spawn_blocking(move || collect_stats_json(replay_bytes.to_vec()))
            .await
            .context("replay stats task panicked")??;
        let stats_bytes =
            serde_json::to_vec(&stats).context("failed to serialize replay stats blob")?;
        let stats_sha256 = sha256_hex(&stats_bytes);

        insert_stat_blob(&pool, analysis_run_id, replay_id, stats, &stats_sha256).await?;
        mark_analysis_run_succeeded(&pool, analysis_run_id).await?;
        set_replay_status(&pool, replay_id, "parsed").await?;

        Ok::<_, anyhow::Error>(())
    }
    .await;

    if let Err(error) = result {
        let message = error.to_string();
        mark_analysis_run_failed(&pool, analysis_run_id, &message).await?;
        set_replay_status(&pool, replay_id, "failed").await?;
        return Err(error);
    }

    Ok(())
}

fn collect_stats_json(replay_bytes: Vec<u8>) -> Result<Value> {
    let replay = boxcars::ParserBuilder::new(&replay_bytes)
        .must_parse_network_data()
        .on_error_check_crc()
        .parse()
        .context("failed to parse replay")?;
    let stats = StatsCollector::new()
        .get_stats(&replay)
        .map_err(|error| anyhow!("failed to collect replay stats: {error:?}"))?;

    serde_json::to_value(stats).context("failed to convert replay stats to JSON")
}

async fn insert_analysis_run(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    file_sha256: &str,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO analysis_runs (
            id,
            replay_id,
            status,
            extractor_name,
            extractor_version,
            rocket_sense_git_sha,
            config_hash,
            input_file_sha256
        )
        VALUES ($1, $2, 'running', $3, $4, $5, $6, $7)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(DEFAULT_EXTRACTOR_NAME)
    .bind(env!("CARGO_PKG_VERSION"))
    .bind(option_env!("GIT_SHA"))
    .bind(DEFAULT_CONFIG_HASH)
    .bind(file_sha256)
    .execute(pool)
    .await
    .context("failed to insert analysis run")?;

    Ok(())
}

async fn insert_stat_blob(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    stats: Value,
    stats_sha256: &str,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO replay_stat_blobs (
            analysis_run_id,
            replay_id,
            stats,
            stats_sha256
        )
        VALUES ($1, $2, $3, $4)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(stats)
    .bind(stats_sha256)
    .execute(pool)
    .await
    .context("failed to insert replay stat blob")?;

    Ok(())
}

async fn mark_analysis_run_succeeded(pool: &PgPool, analysis_run_id: Uuid) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE analysis_runs
        SET status = 'succeeded',
            finished_at = now(),
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(analysis_run_id)
    .execute(pool)
    .await
    .context("failed to mark analysis run succeeded")?;

    Ok(())
}

async fn mark_analysis_run_failed(
    pool: &PgPool,
    analysis_run_id: Uuid,
    error_message: &str,
) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE analysis_runs
        SET status = 'failed',
            finished_at = now(),
            error_message = $2,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(analysis_run_id)
    .bind(error_message)
    .execute(pool)
    .await
    .context("failed to mark analysis run failed")?;

    Ok(())
}

async fn set_replay_status(pool: &PgPool, replay_id: Uuid, status: &str) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE replays
        SET parse_status = $2,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .bind(status)
    .execute(pool)
    .await
    .with_context(|| format!("failed to set replay status to `{status}`"))?;

    Ok(())
}
