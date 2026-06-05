use anyhow::{anyhow, Context, Result};
use boxcars::{HeaderProp, RemoteId};
use bytes::Bytes;
use chrono::{DateTime, NaiveDateTime, Utc};
use rocket_sense_storage::{sha256_hex, ObjectStorage};
use serde_json::{Map, Value};
use sqlx::{PgPool, Row};
use std::{
    cmp::Ordering,
    collections::{BTreeMap, HashMap},
    sync::Arc,
};
use subtr_actor::{PlayerInfo, ReplayStatsTimelineScaffold, StatsTimelineEventCollector};
use tokio::task::JoinSet;
use uuid::Uuid;

#[cfg(test)]
use subtr_actor::ReplayMeta;

#[cfg(test)]
#[path = "processing_tests.rs"]
mod tests;

const DEFAULT_EXTRACTOR_NAME: &str = "rocket-sense:event-stream";
const EVENT_STREAM_SCHEMA_VERSION: &str = "rocket-sense-event-stream:v2";
const STATS_TIMELINE_SOURCE: &str = "subtr-actor:stats-timeline";
const FIRST_MAN_STINT_END_GRACE_SECONDS: f64 = 0.35;
const ROTATION_PROFILE_TIMING_STREAMS: [&str; 4] = [
    "rotation_player",
    "rotation_role_span",
    "rotation_depth_span",
    "rotation_first_man_stint",
];

struct ReplayAnalysisOutput {
    event_stream: Value,
    indexed_events: Vec<IndexedEvent>,
    metadata: ReplaySearchMetadata,
}

#[derive(Debug, Clone)]
struct IndexedEvent {
    event_type_key: String,
    display_name: String,
    category: String,
    source: String,
    source_stream: String,
    source_index: usize,
    source_event_id: String,
    primary_subject: Option<EventSubject>,
    subjects: Vec<EventSubject>,
    team: Option<i32>,
    start_frame: Option<i32>,
    end_frame: Option<i32>,
    event_frame: Option<i32>,
    start_time: Option<f64>,
    end_time: Option<f64>,
    event_time: Option<f64>,
    duration_seconds: Option<f64>,
    confidence: Option<f64>,
    attributes: Value,
    payload: Value,
}

#[derive(Debug, Clone)]
struct EventSubject {
    kind: String,
    id: String,
    role: String,
}

#[derive(Debug, Clone)]
struct RotationSpanPayload {
    source_index: usize,
    payload: Value,
    player_subject: EventSubject,
    start_frame: Option<i32>,
    end_frame: Option<i32>,
    start_time: Option<f64>,
    end_time: Option<f64>,
    duration_seconds: f64,
    active: bool,
    role_state: Option<String>,
    depth_state: Option<String>,
    is_team_0: Option<bool>,
}

#[derive(Debug, Clone)]
struct RotationDerivedSpan {
    kind: String,
    state: String,
    player_payload: Value,
    is_team_0: Option<bool>,
    start_frame: Option<i32>,
    end_frame: Option<i32>,
    start_time: Option<f64>,
    end_time: Option<f64>,
    duration_seconds: f64,
}

#[derive(Debug, Clone, PartialEq)]
struct EventScalarField {
    source: &'static str,
    path: String,
    value_kind: &'static str,
    string_value: Option<String>,
    numeric_value: Option<f64>,
    boolean_value: Option<bool>,
}

#[derive(Debug, Clone, Copy)]
struct PlayEventInsertOptions {
    payload: bool,
    attributes: bool,
    scalar_fields: bool,
    details: bool,
    subjects: bool,
}

impl PlayEventInsertOptions {
    const FULL: Self = Self {
        payload: true,
        attributes: true,
        scalar_fields: true,
        details: true,
        subjects: true,
    };

    const PROFILE_TIMING_BACKFILL: Self = Self {
        payload: true,
        attributes: false,
        scalar_fields: false,
        details: true,
        subjects: true,
    };
}

#[derive(Debug, Clone, PartialEq)]
struct ReplaySearchMetadata {
    playlist: Option<String>,
    map_code: Option<String>,
    replay_date: Option<DateTime<Utc>>,
    summary: ReplaySummaryMetadata,
    has_pro_player: bool,
    players: Vec<ReplaySearchPlayer>,
}

#[derive(Debug, Clone, Default, PartialEq)]
struct ReplaySummaryMetadata {
    duration_seconds: Option<f64>,
    overtime_seconds: Option<f64>,
    team_zero_score: Option<i32>,
    team_one_score: Option<i32>,
    match_guid: Option<String>,
}

#[derive(Debug, Clone, PartialEq)]
struct ReplaySearchPlayer {
    name: String,
    platform: Option<String>,
    platform_player_id: Option<String>,
    team: i32,
    is_pro: bool,
    active_time_seconds: Option<OrderedFloat>,
    time_demolished_seconds: Option<OrderedFloat>,
    time_most_back_seconds: Option<OrderedFloat>,
    time_most_forward_seconds: Option<OrderedFloat>,
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct OrderedFloat(f64);

#[derive(Debug, Clone)]
pub struct ReplayReprocessOptions {
    pub replay_ids: Vec<Uuid>,
    pub force: bool,
    pub concurrency: usize,
}

#[derive(Debug, Clone, Copy)]
pub struct ReplayReprocessSummary {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Clone)]
struct ReplayProcessingTarget {
    replay_id: Uuid,
    file_sha256: String,
    storage_key: String,
}

#[derive(Debug, Clone)]
pub struct ReplayProfileTimingBackfillOptions {
    pub replay_ids: Vec<Uuid>,
    pub force: bool,
    pub concurrency: usize,
}

#[derive(Debug, Clone, Copy)]
pub struct ReplayProfileTimingBackfillSummary {
    pub matched_replays: usize,
    pub enqueued_replays: usize,
    pub skipped_replays: usize,
    pub concurrency: usize,
    pub force: bool,
}

#[derive(Debug, Clone)]
struct ReplayProfileTimingBackfillTarget {
    replay_id: Uuid,
    analysis_run_id: Uuid,
    storage_key: String,
    needs_positioning: bool,
    needs_rotation_player: bool,
}

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

pub async fn enqueue_replay_reprocessing(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    options: ReplayReprocessOptions,
) -> Result<ReplayReprocessSummary> {
    let concurrency = options.concurrency.clamp(1, 4);
    let targets = reprocess_targets(&pool, &options).await?;
    let enqueued_replays = targets.len();
    if !targets.is_empty() {
        spawn_reprocess_worker(pool, storage, targets, concurrency);
    }

    Ok(ReplayReprocessSummary {
        matched_replays: enqueued_replays,
        enqueued_replays,
        skipped_replays: 0,
        concurrency,
        force: options.force,
    })
}

pub async fn enqueue_profile_timing_backfill(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    options: ReplayProfileTimingBackfillOptions,
) -> Result<ReplayProfileTimingBackfillSummary> {
    let concurrency = options.concurrency.clamp(1, 4);
    let targets = profile_timing_backfill_targets(&pool, &options).await?;
    let enqueued_replays = targets.len();
    if !targets.is_empty() {
        spawn_profile_timing_backfill_worker(pool, storage, targets, concurrency);
    }

    Ok(ReplayProfileTimingBackfillSummary {
        matched_replays: enqueued_replays,
        enqueued_replays,
        skipped_replays: 0,
        concurrency,
        force: options.force,
    })
}

fn spawn_profile_timing_backfill_worker(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    targets: Vec<ReplayProfileTimingBackfillTarget>,
    concurrency: usize,
) {
    tokio::spawn(async move {
        let total = targets.len();
        let mut pending = targets.into_iter();
        let mut tasks = JoinSet::new();
        let mut succeeded = 0usize;
        let mut failed = 0usize;

        loop {
            while tasks.len() < concurrency {
                let Some(target) = pending.next() else {
                    break;
                };
                let pool = pool.clone();
                let storage = storage.clone();
                tasks.spawn(async move {
                    let replay_id = target.replay_id;
                    let needs_positioning = target.needs_positioning;
                    let needs_rotation_player = target.needs_rotation_player;
                    tracing::info!(
                        %replay_id,
                        needs_positioning,
                        needs_rotation_player,
                        "profile timing backfill started"
                    );
                    let result = backfill_profile_timing_events(pool, storage, target).await;
                    (replay_id, result)
                });
            }

            let Some(result) = tasks.join_next().await else {
                break;
            };

            match result {
                Ok((replay_id, Ok(inserted))) => {
                    succeeded += 1;
                    tracing::info!(
                        %replay_id,
                        inserted,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill succeeded"
                    );
                }
                Ok((replay_id, Err(error))) => {
                    failed += 1;
                    tracing::error!(
                        %replay_id,
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill failed"
                    );
                }
                Err(error) => {
                    failed += 1;
                    tracing::error!(
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "profile timing backfill task panicked"
                    );
                }
            }
        }

        tracing::info!(
            succeeded,
            failed,
            total,
            "profile timing backfill batch finished"
        );
    });
}

fn spawn_reprocess_worker(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    targets: Vec<ReplayProcessingTarget>,
    concurrency: usize,
) {
    tokio::spawn(async move {
        let total = targets.len();
        let mut pending = targets.into_iter();
        let mut tasks = JoinSet::new();
        let mut succeeded = 0usize;
        let mut failed = 0usize;

        loop {
            while tasks.len() < concurrency {
                let Some(target) = pending.next() else {
                    break;
                };
                let pool = pool.clone();
                let storage = storage.clone();
                tasks.spawn(async move {
                    let replay_id = target.replay_id;
                    let result = process_replay(
                        pool,
                        storage,
                        replay_id,
                        target.file_sha256,
                        target.storage_key,
                    )
                    .await;
                    (replay_id, result)
                });
            }

            let Some(result) = tasks.join_next().await else {
                break;
            };

            match result {
                Ok((replay_id, Ok(()))) => {
                    succeeded += 1;
                    tracing::info!(
                        %replay_id,
                        succeeded,
                        failed,
                        total,
                        "replay reprocessing succeeded"
                    );
                }
                Ok((replay_id, Err(error))) => {
                    failed += 1;
                    tracing::error!(
                        %replay_id,
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "replay reprocessing failed"
                    );
                }
                Err(error) => {
                    failed += 1;
                    tracing::error!(
                        error = %error,
                        succeeded,
                        failed,
                        total,
                        "replay reprocessing task panicked"
                    );
                }
            }
        }

        tracing::info!(
            succeeded,
            failed,
            total,
            "replay reprocessing batch finished"
        );
    });
}

async fn reprocess_targets(
    pool: &PgPool,
    options: &ReplayReprocessOptions,
) -> Result<Vec<ReplayProcessingTarget>> {
    let mut query = sqlx::QueryBuilder::new(
        r#"
        SELECT
            r.id,
            r.file_sha256,
            r.storage_key
        FROM replays r
        "#,
    );
    let mut has_where = false;

    if !options.replay_ids.is_empty() {
        query.push(" WHERE r.id = ANY(");
        query.push_bind(&options.replay_ids);
        query.push(")");
        has_where = true;
    }

    if !options.force {
        if has_where {
            query.push(" AND ");
        } else {
            query.push(" WHERE ");
        }
        query.push(
            r#"
            (
                r.canonical_analysis_run_id IS NULL
                OR NOT EXISTS (
                    SELECT 1
                    FROM analysis_runs ar
                    WHERE ar.id = r.canonical_analysis_run_id
                      AND ar.status = 'succeeded'
                      AND ar.event_stream_schema_version =
            "#,
        );
        query.push_bind(EVENT_STREAM_SCHEMA_VERSION);
        query.push(
            r#"
                      AND ar.event_stream_object_key IS NOT NULL
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                )
            )
            "#,
        );
    }

    query.push(" ORDER BY r.created_at, r.id");

    query
        .build()
        .fetch_all(pool)
        .await
        .context("failed to list replays for reprocessing")?
        .into_iter()
        .map(|row| {
            Ok(ReplayProcessingTarget {
                replay_id: row.try_get("id")?,
                file_sha256: row.try_get("file_sha256")?,
                storage_key: row.try_get("storage_key")?,
            })
        })
        .collect()
}

async fn profile_timing_backfill_targets(
    pool: &PgPool,
    options: &ReplayProfileTimingBackfillOptions,
) -> Result<Vec<ReplayProfileTimingBackfillTarget>> {
    let mut query = sqlx::QueryBuilder::new(
        r#"
        SELECT
            r.id,
            r.storage_key,
            r.canonical_analysis_run_id,
            NOT EXISTS (
                SELECT 1
                FROM play_events event
                WHERE event.analysis_run_id = r.canonical_analysis_run_id
                  AND event.source_stream = 'positioning'
            ) AS needs_positioning,
            (
                NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_role_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_depth_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_first_man_stint'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    JOIN play_event_rotation_player_details detail
                      ON detail.event_id = event.id
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
            ) AS needs_rotation_player
        FROM replays r
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );

    if !options.replay_ids.is_empty() {
        query.push(" AND r.id = ANY(");
        query.push_bind(&options.replay_ids);
        query.push(")");
    }

    if !options.force {
        query.push(
            r#"
            AND (
                NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'positioning'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_role_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_depth_span'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_first_man_stint'
                )
                OR NOT EXISTS (
                    SELECT 1
                    FROM play_events event
                    JOIN play_event_rotation_player_details detail
                      ON detail.event_id = event.id
                    WHERE event.analysis_run_id = r.canonical_analysis_run_id
                      AND event.source_stream = 'rotation_player'
                )
            )
            "#,
        );
    }

    query.push(" ORDER BY r.created_at, r.id");

    query
        .build()
        .fetch_all(pool)
        .await
        .context("failed to list replays for profile timing backfill")?
        .into_iter()
        .map(|row| {
            Ok(ReplayProfileTimingBackfillTarget {
                replay_id: row.try_get("id")?,
                storage_key: row.try_get("storage_key")?,
                analysis_run_id: row.try_get("canonical_analysis_run_id")?,
                needs_positioning: options.force || row.try_get("needs_positioning")?,
                needs_rotation_player: options.force || row.try_get("needs_rotation_player")?,
            })
        })
        .collect()
}

async fn backfill_profile_timing_events(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    target: ReplayProfileTimingBackfillTarget,
) -> Result<usize> {
    let replay_bytes = storage
        .get(&target.storage_key)
        .await
        .with_context(|| format!("failed to read replay object `{}`", target.storage_key))?;
    let output =
        tokio::task::spawn_blocking(move || collect_replay_analysis(replay_bytes.to_vec()))
            .await
            .context("profile timing backfill analysis task panicked")??;
    let mut indexed_events = output
        .indexed_events
        .into_iter()
        .filter(|event| {
            (target.needs_rotation_player
                && is_rotation_profile_timing_stream(&event.source_stream))
                || (target.needs_positioning && event.source_stream == "positioning")
        })
        .collect::<Vec<_>>();
    if indexed_events.is_empty() {
        return Ok(0);
    }

    indexed_events.sort_by_key(|event| match event.source_stream.as_str() {
        "rotation_player" => 0,
        "rotation_role_span" => 1,
        "rotation_depth_span" => 2,
        "rotation_first_man_stint" => 3,
        "positioning" => 4,
        _ => 5,
    });

    if target.needs_rotation_player {
        delete_profile_timing_streams(
            &pool,
            target.analysis_run_id,
            &ROTATION_PROFILE_TIMING_STREAMS,
        )
        .await?;
    }
    if target.needs_positioning {
        delete_profile_timing_streams(&pool, target.analysis_run_id, &["positioning"]).await?;
    }

    let replay_players = load_replay_player_lookup(&pool, target.replay_id).await?;
    let event_type_ids = ensure_event_types(&pool, &indexed_events).await?;
    let inserted = insert_play_events_with_options(
        &pool,
        target.analysis_run_id,
        target.replay_id,
        &indexed_events,
        &event_type_ids,
        &replay_players,
        PlayEventInsertOptions::PROFILE_TIMING_BACKFILL,
    )
    .await?;

    Ok(inserted)
}

async fn delete_profile_timing_streams(
    pool: &PgPool,
    analysis_run_id: Uuid,
    source_streams: &[&str],
) -> Result<()> {
    let source_streams = source_streams
        .iter()
        .map(|stream| (*stream).to_owned())
        .collect::<Vec<_>>();
    sqlx::query(
        r#"
        DELETE FROM play_events
        WHERE analysis_run_id = $1
          AND source_stream = ANY($2)
        "#,
    )
    .bind(analysis_run_id)
    .bind(&source_streams)
    .execute(pool)
    .await
    .context("failed to delete stale profile timing events")?;
    Ok(())
}

fn is_rotation_profile_timing_stream(source_stream: &str) -> bool {
    ROTATION_PROFILE_TIMING_STREAMS.contains(&source_stream)
}

async fn load_replay_player_lookup(
    pool: &PgPool,
    replay_id: Uuid,
) -> Result<HashMap<String, Uuid>> {
    sqlx::query(
        r#"
        SELECT id, platform, platform_player_id
        FROM replay_players
        WHERE replay_id = $1
          AND platform IS NOT NULL
          AND platform_player_id IS NOT NULL
        "#,
    )
    .bind(replay_id)
    .fetch_all(pool)
    .await
    .context("failed to load replay player lookup")?
    .into_iter()
    .map(|row| {
        let platform: Option<String> = row.try_get("platform")?;
        let platform_player_id: Option<String> = row.try_get("platform_player_id")?;
        let id: Uuid = row.try_get("id")?;
        let Some(key) = player_lookup_key(&platform, &platform_player_id) else {
            return Err(anyhow!("replay player lookup row had no key"));
        };
        Ok((key, id))
    })
    .collect()
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
        let output =
            tokio::task::spawn_blocking(move || collect_replay_analysis(replay_bytes.to_vec()))
                .await
                .context("replay analysis task panicked")??;
        let event_stream_bytes = serde_json::to_vec(&output.event_stream)
            .context("failed to serialize replay event stream")?;
        let event_stream_sha256 = sha256_hex(&event_stream_bytes);
        let event_stream_key = event_stream_object_key(&file_sha256, analysis_run_id);
        let stored_event_stream = storage
            .put(&event_stream_key, Bytes::from(event_stream_bytes), None)
            .await
            .context("failed to write replay event stream object")?;

        insert_replay_object(&pool, replay_id, "event_stream", &stored_event_stream).await?;
        update_analysis_run_event_stream(
            &pool,
            analysis_run_id,
            &stored_event_stream.key,
            &event_stream_sha256,
            stored_event_stream.byte_size,
        )
        .await?;
        let replay_players =
            upsert_replay_search_metadata(&pool, replay_id, &output.metadata).await?;
        let event_type_ids = ensure_event_types(&pool, &output.indexed_events).await?;
        insert_play_events(
            &pool,
            analysis_run_id,
            replay_id,
            &output.indexed_events,
            &event_type_ids,
            &replay_players,
        )
        .await?;
        mark_analysis_run_succeeded(&pool, analysis_run_id).await?;
        set_canonical_analysis_run(&pool, replay_id, analysis_run_id).await?;
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

fn collect_replay_analysis(replay_bytes: Vec<u8>) -> Result<ReplayAnalysisOutput> {
    let replay = boxcars::ParserBuilder::new(&replay_bytes)
        .must_parse_network_data()
        .on_error_check_crc()
        .parse()
        .context("failed to parse replay")?;
    let timeline = StatsTimelineEventCollector::new()
        .get_replay_stats_timeline_scaffold(&replay)
        .map_err(|error| anyhow!("failed to collect replay event timeline: {error:?}"))?;
    let metadata = replay_search_metadata(&timeline);
    let timeline_events_value = serde_json::to_value(&timeline.events)
        .context("failed to serialize replay timeline events")?;
    let event_stream = serde_json::json!({
        "schema_version": EVENT_STREAM_SCHEMA_VERSION,
        "source": {
            "extractor_name": DEFAULT_EXTRACTOR_NAME,
            "extractor_version": env!("CARGO_PKG_VERSION"),
            "subtr_actor_version": subtr_actor_version(),
            "subtr_actor_git_sha": option_env!("SUBTR_ACTOR_GIT_SHA"),
            "rocket_sense_git_sha": option_env!("GIT_SHA")
        },
        "replay_meta": timeline.replay_meta.clone(),
        "timeline_events": timeline_events_value
    });
    let indexed_events = build_indexed_events(&timeline)?;

    Ok(ReplayAnalysisOutput {
        event_stream,
        indexed_events,
        metadata,
    })
}

fn replay_search_metadata(timeline: &ReplayStatsTimelineScaffold) -> ReplaySearchMetadata {
    let replay_meta = &timeline.replay_meta;
    let playlist = header_text(
        &replay_meta.all_headers,
        &["Playlist", "PlaylistName", "GamePlaylist", "MatchType"],
    )
    .map(normalize_playlist);
    let map_code = header_text(&replay_meta.all_headers, &["MapName", "Map", "LevelName"])
        .map(normalize_header_value);
    let replay_date = header_text(
        &replay_meta.all_headers,
        &["Date", "ReplayDate", "RecordDate"],
    )
    .and_then(|value| parse_replay_date(&value));
    let mut players = replay_meta
        .team_zero
        .iter()
        .map(|player| replay_search_player(player, 0))
        .chain(
            replay_meta
                .team_one
                .iter()
                .map(|player| replay_search_player(player, 1)),
        )
        .collect::<Vec<_>>();
    apply_player_timing_metadata(&mut players, timeline);
    let has_pro_player = players.iter().any(|player| player.is_pro);

    ReplaySearchMetadata {
        playlist,
        map_code,
        replay_date,
        summary: replay_summary_metadata(timeline),
        has_pro_player,
        players,
    }
}

#[cfg(test)]
fn replay_search_metadata_from_meta(replay_meta: &ReplayMeta) -> ReplaySearchMetadata {
    let playlist = header_text(
        &replay_meta.all_headers,
        &["Playlist", "PlaylistName", "GamePlaylist", "MatchType"],
    )
    .map(normalize_playlist);
    let map_code = header_text(&replay_meta.all_headers, &["MapName", "Map", "LevelName"])
        .map(normalize_header_value);
    let replay_date = header_text(
        &replay_meta.all_headers,
        &["Date", "ReplayDate", "RecordDate"],
    )
    .and_then(|value| parse_replay_date(&value));
    let players = replay_meta
        .team_zero
        .iter()
        .map(|player| replay_search_player(player, 0))
        .chain(
            replay_meta
                .team_one
                .iter()
                .map(|player| replay_search_player(player, 1)),
        )
        .collect::<Vec<_>>();
    let has_pro_player = players.iter().any(|player| player.is_pro);

    ReplaySearchMetadata {
        playlist,
        map_code,
        replay_date,
        summary: ReplaySummaryMetadata::default(),
        has_pro_player,
        players,
    }
}

fn replay_search_player(player: &PlayerInfo, team: i32) -> ReplaySearchPlayer {
    let (platform, platform_player_id) = remote_id_parts(&player.remote_id);

    ReplaySearchPlayer {
        name: player.name.clone(),
        platform,
        platform_player_id,
        team,
        is_pro: false,
        active_time_seconds: None,
        time_demolished_seconds: None,
        time_most_back_seconds: None,
        time_most_forward_seconds: None,
    }
}

fn replay_summary_metadata(timeline: &ReplayStatsTimelineScaffold) -> ReplaySummaryMetadata {
    let last_frame = timeline.frames.last();
    let duration_seconds = last_frame
        .map(|frame| f64::from(frame.time))
        .filter(|seconds| seconds.is_finite() && *seconds >= 0.0);
    let overtime_seconds = last_frame
        .and_then(|frame| frame.seconds_remaining)
        .filter(|seconds_remaining| *seconds_remaining < 0)
        .map(|seconds_remaining| f64::from(-seconds_remaining));

    ReplaySummaryMetadata {
        duration_seconds,
        overtime_seconds,
        team_zero_score: Some(team_score_from_events(timeline, true)),
        team_one_score: Some(team_score_from_events(timeline, false)),
        match_guid: header_text(
            &timeline.replay_meta.all_headers,
            &["Id", "MatchGuid", "MatchGUID", "ReplayId"],
        )
        .map(normalize_header_value)
        .filter(|value| !value.trim().is_empty()),
    }
}

fn team_score_from_events(timeline: &ReplayStatsTimelineScaffold, is_team_0: bool) -> i32 {
    timeline
        .events
        .core_player
        .iter()
        .filter(|event| event.is_team_0 == is_team_0)
        .map(|event| event.goals_delta)
        .sum()
}

fn apply_player_timing_metadata(
    players: &mut [ReplaySearchPlayer],
    timeline: &ReplayStatsTimelineScaffold,
) {
    let mut timing_by_key = HashMap::<String, PlayerTimingMetadata>::new();
    for event in &timeline.events.positioning {
        let (platform, platform_player_id) = remote_id_parts(&event.player);
        let Some(key) = player_lookup_key(&platform, &platform_player_id) else {
            continue;
        };
        let timing = timing_by_key.entry(key).or_default();
        let duration = f64::from(event.duration);
        if event.active {
            timing.active_time += duration;
        }
        if event.demolished {
            timing.time_demolished += duration;
        }
        match event.teammate_role {
            subtr_actor::PositioningTeammateRoleState::MostBack => {
                timing.time_most_back += duration;
            }
            subtr_actor::PositioningTeammateRoleState::MostForward => {
                timing.time_most_forward += duration;
            }
            subtr_actor::PositioningTeammateRoleState::NoTeammates
            | subtr_actor::PositioningTeammateRoleState::Mid
            | subtr_actor::PositioningTeammateRoleState::Other
            | subtr_actor::PositioningTeammateRoleState::Unknown => {}
        }
    }

    let known_player_keys = timeline
        .frames
        .last()
        .into_iter()
        .flat_map(|frame| frame.players.iter())
        .filter_map(|player| {
            let (platform, platform_player_id) = remote_id_parts(&player.player_id);
            player_lookup_key(&platform, &platform_player_id)
        })
        .collect::<Vec<_>>();
    for key in known_player_keys {
        timing_by_key.entry(key).or_default();
    }

    for player in players {
        let Some(key) = player_lookup_key(&player.platform, &player.platform_player_id) else {
            continue;
        };
        let Some(timing) = timing_by_key.get(&key).copied() else {
            continue;
        };
        player.active_time_seconds = finite_nonnegative(timing.active_time).map(OrderedFloat);
        player.time_demolished_seconds =
            finite_nonnegative(timing.time_demolished).map(OrderedFloat);
        player.time_most_back_seconds = finite_nonnegative(timing.time_most_back).map(OrderedFloat);
        player.time_most_forward_seconds =
            finite_nonnegative(timing.time_most_forward).map(OrderedFloat);
    }
}

#[derive(Debug, Clone, Copy, Default)]
struct PlayerTimingMetadata {
    active_time: f64,
    time_demolished: f64,
    time_most_back: f64,
    time_most_forward: f64,
}

fn finite_nonnegative(value: f64) -> Option<f64> {
    value.is_finite().then_some(value.max(0.0))
}

fn remote_id_parts(remote_id: &RemoteId) -> (Option<String>, Option<String>) {
    match remote_id {
        RemoteId::PlayStation(id) => (Some("ps4".to_owned()), Some(id.online_id.to_string())),
        RemoteId::PsyNet(id) => (Some("psynet".to_owned()), Some(id.online_id.to_string())),
        RemoteId::SplitScreen(id) => (Some("splitscreen".to_owned()), Some(id.to_string())),
        RemoteId::Steam(id) => (Some("steam".to_owned()), Some(id.to_string())),
        RemoteId::Switch(id) => (Some("switch".to_owned()), Some(id.online_id.to_string())),
        RemoteId::Xbox(id) => (Some("xbox".to_owned()), Some(id.to_string())),
        RemoteId::QQ(id) => (Some("qq".to_owned()), Some(id.to_string())),
        RemoteId::Epic(id) => (Some("epic".to_owned()), Some(id.clone())),
    }
}

fn player_lookup_key(
    platform: &Option<String>,
    platform_player_id: &Option<String>,
) -> Option<String> {
    platform
        .as_deref()
        .zip(platform_player_id.as_deref())
        .map(|(platform, platform_player_id)| format!("{platform}:{platform_player_id}"))
}

fn header_text(headers: &[(String, HeaderProp)], keys: &[&str]) -> Option<String> {
    keys.iter().find_map(|key| {
        headers
            .iter()
            .find(|(name, _)| name.eq_ignore_ascii_case(key))
            .and_then(|(_, value)| header_prop_text(value))
    })
}

fn header_prop_text(value: &HeaderProp) -> Option<String> {
    match value {
        HeaderProp::Name(value) | HeaderProp::Str(value) => Some(value.clone()),
        HeaderProp::Byte { kind, value } => value.clone().or_else(|| Some(kind.clone())),
        HeaderProp::Int(value) => Some(value.to_string()),
        HeaderProp::QWord(value) => Some(value.to_string()),
        HeaderProp::Float(value) => Some(value.to_string()),
        HeaderProp::Bool(value) => Some(value.to_string()),
        HeaderProp::Struct { fields, .. } => {
            fields.iter().find_map(|(_, value)| header_prop_text(value))
        }
        HeaderProp::Array(_) => None,
    }
}

fn normalize_header_value(value: String) -> String {
    value.trim().to_owned()
}

fn normalize_playlist(value: String) -> String {
    let trimmed = value.trim();
    let key = trimmed
        .to_ascii_lowercase()
        .replace(['_', '-'], " ")
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ");

    match key.as_str() {
        "1" | "duel" | "duels" | "casual duel" | "casual duels" | "unranked duel"
        | "unranked duels" => "unranked-duels".to_owned(),
        "2" | "doubles" | "casual doubles" | "unranked doubles" => "unranked-doubles".to_owned(),
        "3" | "standard" | "casual standard" | "unranked standard" => {
            "unranked-standard".to_owned()
        }
        "4" | "chaos" | "casual chaos" | "unranked chaos" => "unranked-chaos".to_owned(),
        "10" | "ranked duel" | "ranked duels" => "ranked-duels".to_owned(),
        "11" | "ranked doubles" => "ranked-doubles".to_owned(),
        "12" | "ranked solo standard" => "ranked-solo-standard".to_owned(),
        "13" | "ranked standard" => "ranked-standard".to_owned(),
        "27" | "hoops" | "ranked hoops" => "ranked-hoops".to_owned(),
        "28" | "rumble" | "ranked rumble" => "ranked-rumble".to_owned(),
        "29" | "dropshot" | "ranked dropshot" => "ranked-dropshot".to_owned(),
        "30" | "snowday" | "snow day" | "ranked snowday" | "ranked snow day" => {
            "ranked-snowday".to_owned()
        }
        "private" => "private".to_owned(),
        "season" => "season".to_owned(),
        "offline" => "offline".to_owned(),
        "tournament" => "tournament".to_owned(),
        "rocket labs" | "rocketlabs" => "rocketlabs".to_owned(),
        "dropshot rumble" => "dropshot-rumble".to_owned(),
        "heatseeker" => "heatseeker".to_owned(),
        _ => trimmed.to_owned(),
    }
}

fn parse_replay_date(value: &str) -> Option<DateTime<Utc>> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return None;
    }

    DateTime::parse_from_rfc3339(trimmed)
        .map(|date| date.with_timezone(&Utc))
        .ok()
        .or_else(|| {
            DateTime::parse_from_str(trimmed, "%Y-%m-%d %H:%M:%S %z")
                .map(|date| date.with_timezone(&Utc))
                .ok()
        })
        .or_else(|| {
            [
                "%Y-%m-%d %H-%M-%S",
                "%Y-%m-%d %H:%M:%S",
                "%Y.%m.%d %H.%M.%S",
                "%m/%d/%Y %H:%M:%S",
            ]
            .iter()
            .find_map(|format| {
                NaiveDateTime::parse_from_str(trimmed, format)
                    .map(|date| DateTime::from_naive_utc_and_offset(date, Utc))
                    .ok()
            })
        })
}

async fn upsert_replay_search_metadata(
    pool: &PgPool,
    replay_id: Uuid,
    metadata: &ReplaySearchMetadata,
) -> Result<HashMap<String, Uuid>> {
    sqlx::query(
        r#"
        UPDATE replays
        SET playlist = COALESCE($2, playlist),
            map_code = COALESCE($3, map_code),
            replay_date = COALESCE($4, replay_date),
            duration_seconds = COALESCE($5, duration_seconds),
            overtime_seconds = COALESCE($6, overtime_seconds),
            team_zero_score = COALESCE($7, team_zero_score),
            team_one_score = COALESCE($8, team_one_score),
            match_guid = COALESCE($9, match_guid),
            has_pro_player = has_pro_player OR $10,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .bind(&metadata.playlist)
    .bind(&metadata.map_code)
    .bind(metadata.replay_date)
    .bind(metadata.summary.duration_seconds)
    .bind(metadata.summary.overtime_seconds)
    .bind(metadata.summary.team_zero_score)
    .bind(metadata.summary.team_one_score)
    .bind(&metadata.summary.match_guid)
    .bind(metadata.has_pro_player)
    .execute(pool)
    .await
    .context("failed to update replay search metadata")?;

    sqlx::query("DELETE FROM replay_players WHERE replay_id = $1")
        .bind(replay_id)
        .execute(pool)
        .await
        .context("failed to replace replay players")?;

    let mut replay_players = HashMap::new();
    for player in &metadata.players {
        let replay_player_id = Uuid::now_v7();
        sqlx::query(
            r#"
            INSERT INTO replay_players (
                id,
                replay_id,
                name,
                platform,
                platform_player_id,
                team,
                is_pro,
                active_time_seconds,
                time_demolished_seconds,
                time_most_back_seconds,
                time_most_forward_seconds
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            "#,
        )
        .bind(replay_player_id)
        .bind(replay_id)
        .bind(&player.name)
        .bind(&player.platform)
        .bind(&player.platform_player_id)
        .bind(player.team)
        .bind(player.is_pro)
        .bind(player.active_time_seconds.map(|value| value.0))
        .bind(player.time_demolished_seconds.map(|value| value.0))
        .bind(player.time_most_back_seconds.map(|value| value.0))
        .bind(player.time_most_forward_seconds.map(|value| value.0))
        .execute(pool)
        .await
        .context("failed to insert replay player")?;

        if let Some(key) = player_lookup_key(&player.platform, &player.platform_player_id) {
            replay_players.entry(key).or_insert(replay_player_id);
        }
    }

    Ok(replay_players)
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
            subtr_actor_version,
            subtr_actor_git_sha,
            rocket_sense_git_sha,
            input_file_sha256,
            event_stream_schema_version
        )
        VALUES ($1, $2, 'running', $3, $4, $5, $6, $7, $8, $9)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(DEFAULT_EXTRACTOR_NAME)
    .bind(env!("CARGO_PKG_VERSION"))
    .bind(subtr_actor_version())
    .bind(option_env!("SUBTR_ACTOR_GIT_SHA"))
    .bind(option_env!("GIT_SHA"))
    .bind(file_sha256)
    .bind(EVENT_STREAM_SCHEMA_VERSION)
    .execute(pool)
    .await
    .context("failed to insert analysis run")?;

    Ok(())
}

async fn insert_replay_object(
    pool: &PgPool,
    replay_id: Uuid,
    kind: &str,
    stored: &rocket_sense_storage::StoredObject,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO replay_objects (
            id,
            replay_id,
            kind,
            storage_key,
            content_type,
            byte_size,
            sha256
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (replay_id, kind, storage_key) DO NOTHING
        "#,
    )
    .bind(Uuid::now_v7())
    .bind(replay_id)
    .bind(kind)
    .bind(&stored.key)
    .bind(stored.content_type.as_ref().map(ToString::to_string))
    .bind(stored.byte_size as i64)
    .bind(&stored.sha256)
    .execute(pool)
    .await
    .context("failed to insert replay object")?;

    Ok(())
}

async fn update_analysis_run_event_stream(
    pool: &PgPool,
    analysis_run_id: Uuid,
    event_stream_object_key: &str,
    event_stream_sha256: &str,
    event_stream_byte_size: u64,
) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE analysis_runs
        SET event_stream_object_key = $2,
            event_stream_sha256 = $3,
            event_stream_byte_size = $4,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(analysis_run_id)
    .bind(event_stream_object_key)
    .bind(event_stream_sha256)
    .bind(event_stream_byte_size as i64)
    .execute(pool)
    .await
    .context("failed to update analysis run event stream metadata")?;

    Ok(())
}

async fn ensure_event_types(
    pool: &PgPool,
    events: &[IndexedEvent],
) -> Result<HashMap<String, i32>> {
    let mut event_type_ids = HashMap::new();
    let mut event_types = BTreeMap::<String, (&str, &str)>::new();
    for event in events {
        event_types
            .entry(event.event_type_key.clone())
            .or_insert((&event.display_name, &event.category));
    }

    for (key, (display_name, category)) in event_types {
        let row = sqlx::query(
            r#"
            INSERT INTO event_types (
                key,
                display_name,
                category
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (key)
            DO UPDATE SET
                display_name = EXCLUDED.display_name,
                category = EXCLUDED.category,
                updated_at = now()
            RETURNING id
            "#,
        )
        .bind(&key)
        .bind(display_name)
        .bind(category)
        .fetch_one(pool)
        .await
        .with_context(|| format!("failed to ensure event type `{key}`"))?;

        event_type_ids.insert(key, row.try_get("id")?);
    }

    Ok(event_type_ids)
}

async fn insert_play_events(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
    replay_players: &HashMap<String, Uuid>,
) -> Result<usize> {
    insert_play_events_with_options(
        pool,
        analysis_run_id,
        replay_id,
        events,
        event_type_ids,
        replay_players,
        PlayEventInsertOptions::FULL,
    )
    .await
}

async fn insert_play_events_with_options(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[IndexedEvent],
    event_type_ids: &HashMap<String, i32>,
    replay_players: &HashMap<String, Uuid>,
    options: PlayEventInsertOptions,
) -> Result<usize> {
    let mut inserted = 0usize;
    for event in events {
        let Some(event_type_id) = event_type_ids.get(&event.event_type_key).copied() else {
            continue;
        };

        let Some(row) = sqlx::query(
            r#"
            INSERT INTO play_events (
                id,
                analysis_run_id,
                replay_id,
                event_type_id,
                source,
                source_stream,
                source_index,
                source_event_id,
                primary_subject_kind,
                primary_subject_id,
                team,
                start_frame,
                end_frame,
                event_frame,
                start_time,
                end_time,
                event_time,
                duration_seconds,
                confidence
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19
            )
            ON CONFLICT DO NOTHING
            RETURNING id
            "#,
        )
        .bind(Uuid::now_v7())
        .bind(analysis_run_id)
        .bind(replay_id)
        .bind(event_type_id)
        .bind(&event.source)
        .bind(&event.source_stream)
        .bind(event.source_index as i32)
        .bind(&event.source_event_id)
        .bind(event.primary_subject.as_ref().map(|subject| &subject.kind))
        .bind(event.primary_subject.as_ref().map(|subject| &subject.id))
        .bind(event.team)
        .bind(event.start_frame)
        .bind(event.end_frame)
        .bind(event.event_frame)
        .bind(event.start_time)
        .bind(event.end_time)
        .bind(event.event_time)
        .bind(event.duration_seconds)
        .bind(event.confidence)
        .fetch_optional(pool)
        .await
        .context("failed to insert play event")?
        else {
            continue;
        };
        let play_event_id: Uuid = row.try_get("id")?;
        inserted += 1;

        if options.payload {
            insert_play_event_payload(pool, play_event_id, &event.payload).await?;
        }
        if options.attributes {
            insert_play_event_attributes(pool, play_event_id, &event.attributes).await?;
        }
        if options.scalar_fields {
            insert_play_event_scalar_fields(pool, play_event_id, event).await?;
        }
        if options.details {
            insert_play_event_details(pool, play_event_id, event).await?;
        }

        if options.subjects {
            for subject in &event.subjects {
                sqlx::query(
                    r#"
                INSERT INTO play_event_subjects (
                    event_id,
                    subject_kind,
                    subject_id,
                    replay_player_id,
                    role
                )
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT DO NOTHING
                "#,
                )
                .bind(play_event_id)
                .bind(&subject.kind)
                .bind(&subject.id)
                .bind(resolve_replay_player_id(subject, replay_players))
                .bind(&subject.role)
                .execute(pool)
                .await
                .context("failed to insert play event subject")?;
            }
        }
    }

    Ok(inserted)
}

async fn insert_play_event_payload(pool: &PgPool, event_id: Uuid, payload: &Value) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_payloads (
            event_id,
            payload
        )
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(payload)
    .execute(pool)
    .await
    .context("failed to insert play event payload")?;
    Ok(())
}

async fn insert_play_event_attributes(
    pool: &PgPool,
    event_id: Uuid,
    attributes: &Value,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_attributes (
            event_id,
            attributes
        )
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(attributes)
    .execute(pool)
    .await
    .context("failed to insert play event attributes")?;
    Ok(())
}

async fn insert_play_event_scalar_fields(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    for field in event_scalar_fields(event) {
        sqlx::query(
            r#"
            INSERT INTO play_event_scalar_fields (
                event_id,
                field_source,
                field_path,
                value_kind,
                string_value,
                numeric_value,
                boolean_value
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT DO NOTHING
            "#,
        )
        .bind(event_id)
        .bind(field.source)
        .bind(&field.path)
        .bind(field.value_kind)
        .bind(&field.string_value)
        .bind(field.numeric_value)
        .bind(field.boolean_value)
        .execute(pool)
        .await
        .context("failed to insert play event scalar field")?;
    }

    Ok(())
}

async fn insert_play_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    match event.source_stream.as_str() {
        "timeline" => insert_timeline_event_details(pool, event_id, event).await,
        "mechanics" => insert_mechanic_event_details(pool, event_id, event).await,
        "goal_tags" => insert_goal_tag_event_details(pool, event_id, event).await,
        "touch" => insert_touch_event_details(pool, event_id, event).await,
        "rotation_player" => insert_rotation_player_event_details(pool, event_id, event).await,
        _ => Ok(()),
    }
}

async fn insert_timeline_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_timeline_details (
            event_id,
            kind,
            player_subject_id,
            team
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_kind(&event.payload)?)
    .bind(player_subject_id_from_field(&event.payload, "player_id")?)
    .bind(event.team)
    .execute(pool)
    .await
    .context("failed to insert timeline event details")?;
    Ok(())
}

async fn insert_mechanic_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    let mut properties = Map::new();
    append_mechanic_property_attributes(&event.payload, &mut properties);
    sqlx::query(
        r#"
        INSERT INTO play_event_mechanic_details (
            event_id,
            mechanic,
            properties
        )
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_kind(&event.payload)?)
    .bind(Value::Object(properties))
    .execute(pool)
    .await
    .context("failed to insert mechanic event details")?;
    Ok(())
}

async fn insert_goal_tag_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_goal_tag_details (
            event_id,
            goal_index,
            kind,
            scoring_team,
            scorer_subject_id,
            confidence,
            modifiers,
            evidence
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_int(&event.payload, "goal_index")?)
    .bind(required_kind(&event.payload)?)
    .bind(required_team_bool(
        &event.payload,
        "scoring_team_is_team_0",
    )?)
    .bind(player_subject_id_from_field(&event.payload, "scorer")?)
    .bind(required_float(&event.payload, "confidence")?)
    .bind(json_array_or_empty(&event.payload, "modifiers"))
    .bind(json_array_or_empty(&event.payload, "evidence"))
    .execute(pool)
    .await
    .context("failed to insert goal tag event details")?;
    Ok(())
}

async fn insert_touch_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_touch_details (
            event_id,
            kind,
            height_band,
            surface,
            dodge_state,
            ball_speed_change,
            sample_frame,
            sample_time
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_string(&event.payload, "kind")?)
    .bind(required_string(&event.payload, "height_band")?)
    .bind(required_string(&event.payload, "surface")?)
    .bind(required_string(&event.payload, "dodge_state")?)
    .bind(required_float(&event.payload, "ball_speed_change")?)
    .bind(required_int(&event.payload, "sample_frame")?)
    .bind(required_float(&event.payload, "sample_time")?)
    .execute(pool)
    .await
    .context("failed to insert touch event details")?;
    Ok(())
}

async fn insert_rotation_player_event_details(
    pool: &PgPool,
    event_id: Uuid,
    event: &IndexedEvent,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO play_event_rotation_player_details (
            event_id,
            active,
            current_role_state,
            current_depth_state,
            active_game_time,
            tracked_time,
            time_first_man,
            time_second_man,
            time_third_man,
            time_ambiguous_role,
            time_behind_play,
            time_level_with_play,
            time_ahead_of_play,
            longest_first_man_stint_time,
            first_man_stint_count,
            became_first_man_count,
            lost_first_man_count
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17
        )
        ON CONFLICT DO NOTHING
        "#,
    )
    .bind(event_id)
    .bind(required_bool(&event.payload, "active")?)
    .bind(required_normalized_variant(
        &event.payload,
        "current_role_state",
    )?)
    .bind(required_normalized_variant(
        &event.payload,
        "current_depth_state",
    )?)
    .bind(float_value(&event.payload, &["active_game_time"]))
    .bind(float_value(&event.payload, &["tracked_time"]))
    .bind(float_value(&event.payload, &["time_first_man"]))
    .bind(float_value(&event.payload, &["time_second_man"]))
    .bind(float_value(&event.payload, &["time_third_man"]))
    .bind(float_value(&event.payload, &["time_ambiguous_role"]))
    .bind(float_value(&event.payload, &["time_behind_play"]))
    .bind(float_value(&event.payload, &["time_level_with_play"]))
    .bind(float_value(&event.payload, &["time_ahead_of_play"]))
    .bind(float_value(
        &event.payload,
        &["longest_first_man_stint_time"],
    ))
    .bind(int_value(&event.payload, &["first_man_stint_count"]))
    .bind(int_value(&event.payload, &["became_first_man_count"]))
    .bind(int_value(&event.payload, &["lost_first_man_count"]))
    .execute(pool)
    .await
    .context("failed to insert rotation player event details")?;
    Ok(())
}

fn build_indexed_events(timeline: &ReplayStatsTimelineScaffold) -> Result<Vec<IndexedEvent>> {
    let mut events = Vec::new();
    append_serialized_timeline_events(&mut events, timeline)?;
    Ok(events)
}

fn append_serialized_timeline_events(
    events: &mut Vec<IndexedEvent>,
    timeline: &ReplayStatsTimelineScaffold,
) -> Result<()> {
    let Value::Object(streams) =
        serde_json::to_value(&timeline.events).context("failed to serialize timeline events")?
    else {
        return Ok(());
    };

    let mut goal_tag_index = 0;
    for (stream, stream_events) in streams {
        let Some(stream_events) = stream_events.as_array() else {
            continue;
        };
        for (index, payload) in stream_events.iter().enumerate() {
            events.push(indexed_timeline_payload_event(&stream, index, payload)?);
            if stream == "goal_context" {
                append_goal_context_goal_tags(events, index, payload, &mut goal_tag_index)?;
            }
        }
        if stream == "rotation_player" {
            append_rotation_derived_events(events, stream_events)?;
        }
    }

    Ok(())
}

fn append_goal_context_goal_tags(
    events: &mut Vec<IndexedEvent>,
    goal_index: usize,
    goal_payload: &Value,
    goal_tag_index: &mut usize,
) -> Result<()> {
    let Some(tags) = goal_payload.get("tags").and_then(Value::as_array) else {
        return Ok(());
    };

    for tag in tags {
        let Some(kind) = tag.get("kind") else {
            continue;
        };
        let metadata = tag
            .get("metadata")
            .and_then(Value::as_object)
            .cloned()
            .unwrap_or_default();
        let mut payload = Map::new();
        payload.insert("goal_index".to_owned(), Value::from(goal_index));
        payload.insert("kind".to_owned(), kind.clone());
        for field in ["time", "frame", "scoring_team_is_team_0", "scorer"] {
            if let Some(value) = goal_payload.get(field) {
                payload.insert(field.to_owned(), value.clone());
            }
        }
        for field in ["confidence", "modifiers", "related_events", "evidence"] {
            if let Some(value) = metadata.get(field) {
                payload.insert(field.to_owned(), value.clone());
            }
        }

        events.push(indexed_timeline_payload_event(
            "goal_tags",
            *goal_tag_index,
            &Value::Object(payload),
        )?);
        *goal_tag_index += 1;
    }

    Ok(())
}

fn append_rotation_derived_events(
    events: &mut Vec<IndexedEvent>,
    payloads: &[Value],
) -> Result<()> {
    let mut spans_by_player = BTreeMap::<String, Vec<RotationSpanPayload>>::new();
    for (index, payload) in payloads.iter().enumerate() {
        let payload = ensure_object_payload(payload);
        let Some(span) = rotation_span_payload(index, payload)? else {
            continue;
        };
        spans_by_player
            .entry(span.player_subject.id.clone())
            .or_default()
            .push(span);
    }

    let mut role_spans = Vec::new();
    let mut depth_spans = Vec::new();
    let mut first_man_stints = Vec::new();

    for spans in spans_by_player.values_mut() {
        spans.sort_by(compare_rotation_spans);
        role_spans.extend(derive_rotation_state_spans(
            spans,
            RotationStateSpanKind::Role,
        ));
        depth_spans.extend(derive_rotation_state_spans(
            spans,
            RotationStateSpanKind::Depth,
        ));
        first_man_stints.extend(derive_first_man_stints(spans));
    }

    role_spans.sort_by(compare_rotation_derived_spans);
    depth_spans.sort_by(compare_rotation_derived_spans);
    first_man_stints.sort_by(compare_rotation_derived_spans);

    for (index, span) in role_spans.into_iter().enumerate() {
        events.push(indexed_timeline_payload_event(
            "rotation_role_span",
            index,
            &rotation_derived_span_payload(span, "current_role_state"),
        )?);
    }
    for (index, span) in depth_spans.into_iter().enumerate() {
        events.push(indexed_timeline_payload_event(
            "rotation_depth_span",
            index,
            &rotation_derived_span_payload(span, "current_depth_state"),
        )?);
    }
    for (index, span) in first_man_stints.into_iter().enumerate() {
        events.push(indexed_timeline_payload_event(
            "rotation_first_man_stint",
            index,
            &rotation_derived_span_payload(span, "current_role_state"),
        )?);
    }

    Ok(())
}

fn rotation_span_payload(index: usize, payload: Value) -> Result<Option<RotationSpanPayload>> {
    let Some(player_subject) = rotation_player_subject(&payload)? else {
        return Ok(None);
    };
    let (start_frame, end_frame, _, start_time, end_time, _) = timeline_event_timing(&payload);
    let duration_seconds = float_value(&payload, &["duration"])
        .filter(|duration| *duration > 0.0)
        .unwrap_or(0.0);
    let active = bool_value(&payload, &["active"]).unwrap_or(false);
    let role_state = payload
        .get("current_role_state")
        .and_then(normalized_variant_name);
    let depth_state = payload
        .get("current_depth_state")
        .and_then(normalized_variant_name);
    let is_team_0 = bool_value(&payload, &["is_team_0", "team_is_team_0"]);
    Ok(Some(RotationSpanPayload {
        source_index: index,
        player_subject,
        payload,
        start_frame,
        end_frame,
        start_time,
        end_time,
        duration_seconds,
        active,
        role_state,
        depth_state,
        is_team_0,
    }))
}

fn rotation_player_subject(payload: &Value) -> Result<Option<EventSubject>> {
    if let Some(subject) = player_subject_from_field(payload, "player", "actor")? {
        return Ok(Some(subject));
    }
    player_subject_from_field(payload, "player_id", "actor")
}

#[derive(Debug, Clone, Copy)]
enum RotationStateSpanKind {
    Role,
    Depth,
}

impl RotationStateSpanKind {
    fn state<'a>(&self, span: &'a RotationSpanPayload) -> Option<&'a str> {
        match self {
            Self::Role => span.role_state.as_deref(),
            Self::Depth => span.depth_state.as_deref(),
        }
    }
}

fn derive_rotation_state_spans(
    spans: &[RotationSpanPayload],
    kind: RotationStateSpanKind,
) -> Vec<RotationDerivedSpan> {
    let mut derived = Vec::new();
    let mut current: Option<RotationDerivedSpan> = None;

    for span in spans {
        let eligible = span.active && span.duration_seconds > 0.0;
        let Some(state) = kind.state(span).filter(|_| eligible) else {
            if let Some(span) = current.take() {
                derived.push(span);
            }
            continue;
        };

        if let Some(current_span) = current.as_mut() {
            if current_span.kind == state {
                extend_rotation_derived_span(current_span, span);
                continue;
            }
            derived.push(current.take().expect("current span must exist"));
        }

        current = Some(new_rotation_derived_span(state, span));
    }

    if let Some(span) = current {
        derived.push(span);
    }

    derived
}

fn derive_first_man_stints(spans: &[RotationSpanPayload]) -> Vec<RotationDerivedSpan> {
    let mut stints = Vec::new();
    let mut current: Option<RotationDerivedSpan> = None;
    let mut non_first_man_seconds = 0.0;

    for span in spans {
        let is_first_man = span.active
            && span.duration_seconds > 0.0
            && span.role_state.as_deref() == Some("first_man");

        if is_first_man {
            match current.as_mut() {
                Some(current_span) => extend_rotation_derived_span(current_span, span),
                None => current = Some(new_first_man_stint_span(span)),
            }
            non_first_man_seconds = 0.0;
            continue;
        }

        if current.is_some() {
            non_first_man_seconds += span.duration_seconds;
            if non_first_man_seconds > FIRST_MAN_STINT_END_GRACE_SECONDS {
                stints.push(current.take().expect("current stint must exist"));
                non_first_man_seconds = 0.0;
            }
        }
    }

    if let Some(stint) = current {
        stints.push(stint);
    }

    stints
}

fn new_rotation_derived_span(kind: &str, span: &RotationSpanPayload) -> RotationDerivedSpan {
    RotationDerivedSpan {
        kind: kind.to_owned(),
        state: kind.to_owned(),
        player_payload: rotation_player_payload(span),
        is_team_0: span.is_team_0,
        start_frame: span.start_frame,
        end_frame: span.end_frame,
        start_time: span.start_time,
        end_time: span.end_time,
        duration_seconds: span.duration_seconds,
    }
}

fn new_first_man_stint_span(span: &RotationSpanPayload) -> RotationDerivedSpan {
    let mut derived = new_rotation_derived_span("first_man", span);
    derived.kind = "first_man_stint".to_owned();
    derived
}

fn extend_rotation_derived_span(derived: &mut RotationDerivedSpan, span: &RotationSpanPayload) {
    derived.end_frame = span.end_frame.or(derived.end_frame);
    derived.end_time = span.end_time.or(derived.end_time);
    derived.duration_seconds += span.duration_seconds;
}

fn rotation_player_payload(span: &RotationSpanPayload) -> Value {
    span.payload
        .get("player")
        .or_else(|| span.payload.get("player_id"))
        .cloned()
        .unwrap_or_else(|| Value::String(span.player_subject.id.clone()))
}

fn rotation_derived_span_payload(span: RotationDerivedSpan, state_field: &str) -> Value {
    let mut payload = Map::new();
    payload.insert("kind".to_owned(), Value::String(span.kind.clone()));
    payload.insert("player".to_owned(), span.player_payload);
    payload.insert("active".to_owned(), Value::Bool(true));
    payload.insert(state_field.to_owned(), Value::String(span.state));
    payload.insert("duration".to_owned(), Value::from(span.duration_seconds));
    if let Some(is_team_0) = span.is_team_0 {
        payload.insert("is_team_0".to_owned(), Value::Bool(is_team_0));
    }
    if let Some(frame) = span.start_frame {
        payload.insert("frame".to_owned(), Value::from(frame));
    }
    if let Some(frame) = span.end_frame {
        payload.insert("end_frame".to_owned(), Value::from(frame));
    }
    if let Some(time) = span.start_time {
        payload.insert("time".to_owned(), Value::from(time));
    }
    if let Some(time) = span.end_time {
        payload.insert("end_time".to_owned(), Value::from(time));
    }
    Value::Object(payload)
}

fn compare_rotation_spans(left: &RotationSpanPayload, right: &RotationSpanPayload) -> Ordering {
    compare_optional_f64(left.start_time, right.start_time)
        .then_with(|| left.start_frame.cmp(&right.start_frame))
        .then_with(|| left.source_index.cmp(&right.source_index))
}

fn compare_rotation_derived_spans(
    left: &RotationDerivedSpan,
    right: &RotationDerivedSpan,
) -> Ordering {
    compare_optional_f64(left.start_time, right.start_time)
        .then_with(|| left.start_frame.cmp(&right.start_frame))
        .then_with(|| left.kind.cmp(&right.kind))
}

fn compare_optional_f64(left: Option<f64>, right: Option<f64>) -> Ordering {
    left.unwrap_or(f64::INFINITY)
        .partial_cmp(&right.unwrap_or(f64::INFINITY))
        .unwrap_or(Ordering::Equal)
}

fn indexed_timeline_payload_event(
    stream: &str,
    index: usize,
    payload: &Value,
) -> Result<IndexedEvent> {
    let payload = ensure_object_payload(payload);
    let (event_type_key, display_name, category) = timeline_event_type(stream, &payload);
    let (start_frame, end_frame, event_frame, start_time, end_time, event_time) =
        timeline_event_timing(&payload);
    let subjects = timeline_event_subjects(&payload)?;
    let primary_subject = subjects.first().cloned();
    let source_event_id = timeline_source_event_id(stream, index, &payload, &event_type_key);
    let duration_seconds = timeline_event_duration(&payload);
    let team = timeline_event_team(&payload);

    Ok(IndexedEvent {
        event_type_key,
        display_name,
        category,
        source: STATS_TIMELINE_SOURCE.to_owned(),
        source_stream: stream.to_owned(),
        source_index: index,
        source_event_id,
        primary_subject,
        subjects,
        team,
        start_frame,
        end_frame,
        event_frame,
        start_time,
        end_time,
        event_time,
        duration_seconds,
        confidence: float_value(&payload, &["confidence"]),
        attributes: timeline_event_attributes(stream, &payload),
        payload,
    })
}

fn ensure_object_payload(payload: &Value) -> Value {
    if payload.is_object() {
        payload.clone()
    } else {
        serde_json::json!({ "value": payload })
    }
}

fn timeline_event_type(stream: &str, payload: &Value) -> (String, String, String) {
    let kind = payload.get("kind").and_then(normalized_variant_name);
    let event_type_key = match stream {
        "mechanics" => format!("mechanic.{}", kind.as_deref().unwrap_or("unknown")),
        "goal_tags" => format!("goal_tag.{}", kind.as_deref().unwrap_or("unknown")),
        "touch" => "ball.touch".to_owned(),
        "timeline" => format!("core.{}", kind.as_deref().unwrap_or("event")),
        "rotation_player" => "rotation.player_state_span".to_owned(),
        "rotation_role_span" => format!("rotation.role.{}", kind.as_deref().unwrap_or("unknown")),
        "rotation_depth_span" => {
            format!("rotation.depth.{}", kind.as_deref().unwrap_or("unknown"))
        }
        "rotation_first_man_stint" => "rotation.first_man_stint".to_owned(),
        _ => stream.replace('_', "."),
    };
    let category = if event_type_key == "ball.touch" {
        "touch".to_owned()
    } else {
        event_type_key
            .split_once('.')
            .map(|(category, _)| category.to_owned())
            .unwrap_or_else(|| stream.to_owned())
    };
    let display_name = match stream {
        "mechanics" | "goal_tags" | "timeline" => {
            display_name_from_key(kind.as_deref().unwrap_or(&event_type_key))
        }
        "rotation_first_man_stint" => display_name_from_key("first_man_stint"),
        "rotation_player" => display_name_from_key("player_state_span"),
        _ => display_name_from_key(&event_type_key),
    };

    (event_type_key, display_name, category)
}

fn timeline_event_duration(payload: &Value) -> Option<f64> {
    float_value(payload, &["duration"]).filter(|value| *value >= 0.0)
}

fn timeline_event_team(payload: &Value) -> Option<i32> {
    bool_value(
        payload,
        &["is_team_0", "team_is_team_0", "scoring_team_is_team_0"],
    )
    .map(|is_team_0| if is_team_0 { 0 } else { 1 })
}

fn timeline_source_event_id(
    stream: &str,
    index: usize,
    payload: &Value,
    _event_type_key: &str,
) -> String {
    if stream == "mechanics" {
        if let Some(id) = payload.get("id").and_then(Value::as_str) {
            return id.to_owned();
        }
    }
    if stream == "goal_tags" {
        let kind = payload
            .get("kind")
            .and_then(normalized_variant_name)
            .unwrap_or_else(|| "goal_tag".to_owned());
        let goal_index = payload
            .get("goal_index")
            .and_then(Value::as_u64)
            .map(|value| value.to_string())
            .unwrap_or_else(|| "unknown".to_owned());
        return format!("goal_tag:{goal_index}:{kind}:{index}");
    }
    if stream == "rotation_first_man_stint" {
        return format!("rotation:first_man_stint:{index}");
    }
    format!("{stream}:{index}")
}

fn timeline_event_timing(payload: &Value) -> MechanicTimingColumns {
    if let Some(timing) = payload.get("timing") {
        if let Some(columns) = stats_event_timing_columns(timing) {
            return columns;
        }
    }

    let start_frame = int_value(payload, &["frame", "frame_number"]);
    let end_frame = int_value(payload, &["end_frame"]).or(start_frame);
    let start_time = float_value(payload, &["time"]);
    let end_time = float_value(payload, &["end_time"]).or(start_time);
    (
        start_frame,
        end_frame,
        end_frame.or(start_frame),
        start_time,
        end_time,
        end_time.or(start_time),
    )
}

fn stats_event_timing_columns(timing: &Value) -> Option<MechanicTimingColumns> {
    let object = timing.as_object()?;
    match object.get("type").and_then(Value::as_str)? {
        "moment" => {
            let value = object.get("value").unwrap_or(timing);
            let frame = int_value(value, &["frame"])?;
            let time = float_value(value, &["time"])?;
            Some((
                Some(frame),
                Some(frame),
                Some(frame),
                Some(time),
                Some(time),
                Some(time),
            ))
        }
        "span" => {
            let value = object.get("value").unwrap_or(timing);
            let start_frame = int_value(value, &["start_frame"])?;
            let end_frame = int_value(value, &["end_frame"])?;
            let start_time = float_value(value, &["start_time"])?;
            let end_time = float_value(value, &["end_time"])?;
            Some((
                Some(start_frame),
                Some(end_frame),
                Some(end_frame),
                Some(start_time),
                Some(end_time),
                Some(end_time),
            ))
        }
        _ => None,
    }
}

fn timeline_event_subjects(payload: &Value) -> Result<Vec<EventSubject>> {
    let mut subjects = Vec::new();
    for (field, role) in [
        ("player", "actor"),
        ("player_id", "actor"),
        ("scorer", "scorer"),
        ("initiator", "initiator"),
        ("victim", "victim"),
        ("attacker", "attacker"),
    ] {
        if let Some(subject) = player_subject_from_field(payload, field, role)? {
            push_unique_subject(&mut subjects, subject);
        }
    }
    for (field, role) in [
        ("is_team_0", "team"),
        ("team_is_team_0", "team"),
        ("scoring_team_is_team_0", "scoring_team"),
    ] {
        if let Some(is_team_0) = bool_value(payload, &[field]) {
            push_unique_subject(
                &mut subjects,
                EventSubject {
                    kind: "team".to_owned(),
                    id: team_subject_id(is_team_0),
                    role: role.to_owned(),
                },
            );
        }
    }
    if let Some(id) = stringish_value(payload, &["pad_id", "boost_pad_id", "actor_id"])? {
        push_unique_subject(
            &mut subjects,
            EventSubject {
                kind: "boost_pad".to_owned(),
                id,
                role: "pad".to_owned(),
            },
        );
    }
    Ok(subjects)
}

fn push_unique_subject(subjects: &mut Vec<EventSubject>, subject: EventSubject) {
    if !subjects.iter().any(|existing| {
        existing.kind == subject.kind && existing.id == subject.id && existing.role == subject.role
    }) {
        subjects.push(subject);
    }
}

fn timeline_event_attributes(stream: &str, payload: &Value) -> Value {
    let mut attributes = Map::new();
    attributes.insert("source_stream".to_owned(), Value::String(stream.to_owned()));
    if let Some(object) = payload.as_object() {
        for (key, value) in object {
            if matches!(value, Value::String(_) | Value::Number(_) | Value::Bool(_)) {
                attributes.insert(key.clone(), value.clone());
            }
        }
    }
    if let Some(kind) = payload.get("kind").and_then(normalized_variant_name) {
        attributes.insert("kind".to_owned(), Value::String(kind.to_owned()));
    }
    if let Some(is_team_0) = bool_value(payload, &["is_team_0", "team_is_team_0"]) {
        attributes.insert(
            "team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
    }
    if let Some(is_team_0) = bool_value(payload, &["scoring_team_is_team_0"]) {
        attributes.insert(
            "team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
        attributes.insert(
            "scoring_team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
    }
    if let Some(duration) = timeline_event_duration(payload) {
        attributes.insert("duration_seconds".to_owned(), Value::from(duration));
    }
    append_mechanic_property_attributes(payload, &mut attributes);
    append_goal_tag_attributes(payload, &mut attributes);
    Value::Object(attributes)
}

fn event_scalar_fields(event: &IndexedEvent) -> Vec<EventScalarField> {
    let mut fields = Vec::new();
    append_json_scalar_fields("payload", "", &event.payload, &mut fields);
    append_json_scalar_fields("attribute", "", &event.attributes, &mut fields);
    fields
}

fn append_json_scalar_fields(
    source: &'static str,
    path: &str,
    value: &Value,
    fields: &mut Vec<EventScalarField>,
) {
    match value {
        Value::Object(object) => {
            if let Some(variant) = serialized_unit_variant(object) {
                push_string_scalar_field(
                    source,
                    scalar_path(path),
                    &normalize_identifier(variant),
                    fields,
                );
                return;
            }
            for (key, value) in object {
                let field_path = if path.is_empty() {
                    key.clone()
                } else {
                    format!("{path}.{key}")
                };
                append_json_scalar_fields(source, &field_path, value, fields);
            }
        }
        Value::Array(values) => {
            for (index, value) in values.iter().enumerate() {
                let field_path = format!("{}[{index}]", scalar_path(path));
                append_json_scalar_fields(source, &field_path, value, fields);
            }
        }
        Value::String(value) => {
            push_string_scalar_field(source, scalar_path(path), value, fields);
        }
        Value::Number(value) => {
            if let Some(value) = value.as_f64().filter(|value| value.is_finite()) {
                fields.push(EventScalarField {
                    source,
                    path: scalar_path(path),
                    value_kind: "number",
                    string_value: None,
                    numeric_value: Some(value),
                    boolean_value: None,
                });
            }
        }
        Value::Bool(value) => {
            fields.push(EventScalarField {
                source,
                path: scalar_path(path),
                value_kind: "boolean",
                string_value: None,
                numeric_value: None,
                boolean_value: Some(*value),
            });
        }
        Value::Null => {}
    }
}

fn push_string_scalar_field(
    source: &'static str,
    path: String,
    value: &str,
    fields: &mut Vec<EventScalarField>,
) {
    fields.push(EventScalarField {
        source,
        path,
        value_kind: "string",
        string_value: Some(value.to_owned()),
        numeric_value: None,
        boolean_value: None,
    });
}

fn scalar_path(path: &str) -> String {
    if path.is_empty() {
        "value".to_owned()
    } else {
        path.to_owned()
    }
}

fn serialized_unit_variant(object: &Map<String, Value>) -> Option<&str> {
    if object.len() != 1 {
        return None;
    }
    let (variant, value) = object.iter().next()?;
    match value {
        Value::Object(inner) if inner.is_empty() => Some(variant.as_str()),
        Value::Null => Some(variant.as_str()),
        _ => None,
    }
}

fn append_mechanic_property_attributes(payload: &Value, attributes: &mut Map<String, Value>) {
    let Some(properties) = payload.get("properties").and_then(Value::as_array) else {
        return;
    };
    for property in properties {
        let Some(key) = property.get("key").and_then(Value::as_str) else {
            continue;
        };
        let Some(value) = property.get("value") else {
            continue;
        };
        attributes.insert(key.to_owned(), stats_property_value(value));
    }
}

fn stats_property_value(value: &Value) -> Value {
    let Some(object) = value.as_object() else {
        return value.clone();
    };
    if object.len() == 1 {
        object.values().next().cloned().unwrap_or(Value::Null)
    } else {
        value.clone()
    }
}

fn append_goal_tag_attributes(payload: &Value, attributes: &mut Map<String, Value>) {
    let evidence_kinds = payload
        .get("evidence")
        .and_then(Value::as_array)
        .map(|evidence| {
            evidence
                .iter()
                .filter_map(|item| item.get("kind").and_then(normalized_variant_name))
                .map(|kind| Value::String(kind.to_owned()))
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();
    if !evidence_kinds.is_empty() {
        attributes.insert("evidence_kinds".to_owned(), Value::Array(evidence_kinds));
    }
    if let Some(modifiers) = payload.get("modifiers") {
        attributes.insert("modifiers".to_owned(), modifiers.clone());
    }
}

fn player_subject_from_field(
    payload: &Value,
    field: &str,
    role: &str,
) -> Result<Option<EventSubject>> {
    payload
        .get(field)
        .filter(|value| !value.is_null())
        .map(|value| {
            remote_id_value_to_subject_id(value).map(|id| EventSubject {
                kind: "player".to_owned(),
                id,
                role: role.to_owned(),
            })
        })
        .transpose()
}

fn player_subject_id_from_field(payload: &Value, field: &str) -> Result<Option<String>> {
    payload
        .get(field)
        .filter(|value| !value.is_null())
        .map(remote_id_value_to_subject_id)
        .transpose()
}

fn remote_id_value_to_subject_id(value: &Value) -> Result<String> {
    let Value::Object(object) = value else {
        return Ok(format!("unknown:{value}"));
    };
    let Some((kind, value)) = object.iter().next() else {
        return Ok("unknown:null".to_owned());
    };
    let platform = match kind.as_str() {
        "PlayStation" => "ps4",
        "PsyNet" => "psynet",
        "SplitScreen" => "splitscreen",
        "Steam" => "steam",
        "Switch" => "switch",
        "Xbox" => "xbox",
        "QQ" => "qq",
        "Epic" => "epic",
        other => {
            return Ok(format!(
                "{}:{}",
                other.to_ascii_lowercase(),
                json_scalar_text(value)?
            ))
        }
    };
    Ok(format!("{platform}:{}", json_scalar_text(value)?))
}

fn json_scalar_text(value: &Value) -> Result<String> {
    match value {
        Value::String(value) => Ok(value.clone()),
        Value::Number(value) => Ok(value.to_string()),
        other => serde_json::to_string(other).context("failed to stringify JSON scalar"),
    }
}

fn serialized_variant_name(value: &Value) -> Option<&str> {
    value
        .as_str()
        .or_else(|| value.as_object()?.keys().next().map(String::as_str))
}

fn normalized_variant_name(value: &Value) -> Option<String> {
    serialized_variant_name(value).map(normalize_identifier)
}

fn normalize_identifier(value: &str) -> String {
    let mut normalized = String::new();
    let mut previous_was_separator = true;
    let mut previous_was_lower_or_digit = false;
    for character in value.chars() {
        if character == '-' || character == ' ' || character == '.' {
            if !previous_was_separator {
                normalized.push('_');
            }
            previous_was_separator = true;
            previous_was_lower_or_digit = false;
            continue;
        }
        if character == '_' {
            if !previous_was_separator {
                normalized.push('_');
            }
            previous_was_separator = true;
            previous_was_lower_or_digit = false;
            continue;
        }
        if character.is_uppercase() && previous_was_lower_or_digit {
            normalized.push('_');
        }
        for lowercase in character.to_lowercase() {
            normalized.push(lowercase);
        }
        previous_was_separator = false;
        previous_was_lower_or_digit = character.is_lowercase() || character.is_ascii_digit();
    }
    normalized.trim_matches('_').to_owned()
}

fn int_value(value: &Value, keys: &[&str]) -> Option<i32> {
    keys.iter().find_map(|key| {
        value
            .get(*key)
            .and_then(Value::as_i64)
            .and_then(|number| i32::try_from(number).ok())
    })
}

fn float_value(value: &Value, keys: &[&str]) -> Option<f64> {
    keys.iter()
        .find_map(|key| value.get(*key).and_then(Value::as_f64))
        .filter(|value| value.is_finite())
}

fn bool_value(value: &Value, keys: &[&str]) -> Option<bool> {
    keys.iter()
        .find_map(|key| value.get(*key).and_then(Value::as_bool))
}

fn required_string(value: &Value, key: &str) -> Result<String> {
    value
        .get(key)
        .and_then(Value::as_str)
        .map(ToOwned::to_owned)
        .with_context(|| format!("timeline event missing string field `{key}`"))
}

fn required_kind(value: &Value) -> Result<String> {
    required_normalized_variant(value, "kind")
}

fn required_normalized_variant(value: &Value, key: &str) -> Result<String> {
    value
        .get(key)
        .and_then(normalized_variant_name)
        .with_context(|| format!("timeline event missing variant field `{key}`"))
}

fn required_int(value: &Value, key: &str) -> Result<i32> {
    int_value(value, &[key]).with_context(|| format!("timeline event missing int field `{key}`"))
}

fn required_float(value: &Value, key: &str) -> Result<f64> {
    float_value(value, &[key])
        .with_context(|| format!("timeline event missing float field `{key}`"))
}

fn required_bool(value: &Value, key: &str) -> Result<bool> {
    bool_value(value, &[key]).with_context(|| format!("timeline event missing bool field `{key}`"))
}

fn required_team_bool(value: &Value, key: &str) -> Result<i32> {
    required_bool(value, key).map(|is_team_0| if is_team_0 { 0 } else { 1 })
}

fn json_array_or_empty(value: &Value, key: &str) -> Value {
    value
        .get(key)
        .filter(|value| value.is_array())
        .cloned()
        .unwrap_or_else(|| Value::Array(Vec::new()))
}

fn stringish_value(value: &Value, keys: &[&str]) -> Result<Option<String>> {
    keys.iter()
        .find_map(|key| value.get(*key))
        .map(json_scalar_text)
        .transpose()
}

fn team_subject_id(is_team_0: bool) -> String {
    if is_team_0 {
        "0".to_owned()
    } else {
        "1".to_owned()
    }
}

fn resolve_replay_player_id(
    subject: &EventSubject,
    replay_players: &HashMap<String, Uuid>,
) -> Option<Uuid> {
    (subject.kind == "player")
        .then(|| replay_players.get(&subject.id).copied())
        .flatten()
}

fn display_name_from_key(key: &str) -> String {
    key.split(['.', '_', '-'])
        .filter(|part| !part.is_empty())
        .map(|part| {
            let mut chars = part.chars();
            match chars.next() {
                Some(first) => format!("{}{}", first.to_uppercase(), chars.as_str()),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn event_stream_object_key(file_sha256: &str, analysis_run_id: Uuid) -> String {
    format!("event-streams/sha256/{file_sha256}/{analysis_run_id}.json")
}

fn subtr_actor_version() -> &'static str {
    option_env!("SUBTR_ACTOR_VERSION").unwrap_or("unknown")
}

type MechanicTimingColumns = (
    Option<i32>,
    Option<i32>,
    Option<i32>,
    Option<f64>,
    Option<f64>,
    Option<f64>,
);

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

async fn set_canonical_analysis_run(
    pool: &PgPool,
    replay_id: Uuid,
    analysis_run_id: Uuid,
) -> Result<()> {
    sqlx::query(
        r#"
        UPDATE replays
        SET canonical_analysis_run_id = $2,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .bind(analysis_run_id)
    .execute(pool)
    .await
    .context("failed to set canonical analysis run")?;

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
