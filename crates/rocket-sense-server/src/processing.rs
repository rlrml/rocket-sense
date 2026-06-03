use anyhow::{anyhow, Context, Result};
use boxcars::{HeaderProp, RemoteId};
use bytes::Bytes;
use chrono::{DateTime, NaiveDateTime, Utc};
use rocket_sense_storage::{sha256_hex, ObjectStorage};
use serde_json::{Map, Value};
use sqlx::{PgPool, Row};
use std::{
    collections::{BTreeMap, HashMap},
    sync::Arc,
};
use subtr_actor::{
    GoalTagEvent, PlayerInfo, ReplayDataCollector, ReplayStatsTimelineScaffold,
    StatsEventPropertyValue, StatsEventTiming, StatsTimelineEventCollector, StatsTimelineTagEvent,
    TouchStatsEvent,
};
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
const REPLAY_DATA_SOURCE: &str = "subtr-actor:replay-data";

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
    source_event_id: String,
    primary_subject: Option<EventSubject>,
    subjects: Vec<EventSubject>,
    start_frame: Option<i32>,
    end_frame: Option<i32>,
    event_frame: Option<i32>,
    start_time: Option<f64>,
    end_time: Option<f64>,
    event_time: Option<f64>,
    confidence: Option<f64>,
    attributes: Value,
    payload: Option<Value>,
}

#[derive(Debug, Clone)]
struct EventSubject {
    kind: String,
    id: String,
    role: String,
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
    let (replay_data_value, replay_data_error) =
        match ReplayDataCollector::new().get_replay_data(&replay) {
            Ok(replay_data) => (
                serde_json::to_value(&replay_data).context("failed to serialize replay data")?,
                None,
            ),
            Err(error) => {
                let message = format!("{error:?}");
                tracing::warn!(
                    error = %message,
                    "exact replay-data event extraction failed; continuing with timeline events"
                );
                (Value::Object(Map::new()), Some(message))
            }
        };
    let timeline_events_value = serde_json::to_value(&timeline.events)
        .context("failed to serialize replay timeline events")?;
    let exact_events = replay_data_value
        .as_object()
        .context("serialized replay data was not an object")?;
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
        "diagnostics": {
            "replay_data_error": replay_data_error,
        },
        "exact_events": {
            "boost_pad": exact_events.get("boost_pad_events").cloned().unwrap_or(Value::Array(Vec::new())),
            "demo": exact_events.get("demolish_infos").cloned().unwrap_or(Value::Array(Vec::new())),
            "dodge_refresh": exact_events.get("dodge_refreshed_events").cloned().unwrap_or(Value::Array(Vec::new())),
            "goal": exact_events.get("goal_events").cloned().unwrap_or(Value::Array(Vec::new())),
            "player_stat": exact_events.get("player_stat_events").cloned().unwrap_or(Value::Array(Vec::new()))
        },
        "timeline_events": timeline_events_value
    });
    let indexed_events = build_indexed_events(
        &replay_data_value,
        &timeline.events.touch,
        &timeline.events.mechanics,
        &timeline.events.goal_tags,
    )?;

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
        .core_team
        .iter()
        .filter(|event| event.is_team_0 == is_team_0)
        .map(|event| event.delta.goals)
        .sum()
}

fn apply_player_timing_metadata(
    players: &mut [ReplaySearchPlayer],
    timeline: &ReplayStatsTimelineScaffold,
) {
    let mut timing_by_key = HashMap::<String, (f64, f64)>::new();
    for event in &timeline.events.positioning {
        let (platform, platform_player_id) = remote_id_parts(&event.player);
        let Some(key) = player_lookup_key(&platform, &platform_player_id) else {
            continue;
        };
        let timing = timing_by_key.entry(key).or_default();
        timing.0 += f64::from(event.active_game_time);
        timing.1 += f64::from(event.time_demolished);
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
        let Some((active_time, demolished_time)) = timing_by_key.get(&key).copied() else {
            continue;
        };
        player.active_time_seconds = finite_nonnegative(active_time).map(OrderedFloat);
        player.time_demolished_seconds = finite_nonnegative(demolished_time).map(OrderedFloat);
    }
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
                time_demolished_seconds
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
) -> Result<()> {
    for event in events {
        let Some(event_type_id) = event_type_ids.get(&event.event_type_key).copied() else {
            continue;
        };

        let play_event_id = Uuid::now_v7();

        sqlx::query(
            r#"
            INSERT INTO play_events (
                id,
                analysis_run_id,
                replay_id,
                event_type_id,
                source,
                source_event_id,
                primary_subject_kind,
                primary_subject_id,
                start_frame,
                end_frame,
                event_frame,
                start_time,
                end_time,
                event_time,
                confidence,
                attributes,
                payload
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17
            )
            ON CONFLICT DO NOTHING
            "#,
        )
        .bind(play_event_id)
        .bind(analysis_run_id)
        .bind(replay_id)
        .bind(event_type_id)
        .bind(&event.source)
        .bind(&event.source_event_id)
        .bind(event.primary_subject.as_ref().map(|subject| &subject.kind))
        .bind(event.primary_subject.as_ref().map(|subject| &subject.id))
        .bind(event.start_frame)
        .bind(event.end_frame)
        .bind(event.event_frame)
        .bind(event.start_time)
        .bind(event.end_time)
        .bind(event.event_time)
        .bind(event.confidence)
        .bind(&event.attributes)
        .bind(&event.payload)
        .execute(pool)
        .await
        .context("failed to insert play event")?;

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

    Ok(())
}

fn build_indexed_events(
    replay_data: &Value,
    touch_events: &[TouchStatsEvent],
    mechanics: &[StatsTimelineTagEvent],
    goal_tags: &[GoalTagEvent],
) -> Result<Vec<IndexedEvent>> {
    let mut events = Vec::new();
    append_touch_stats_events(&mut events, touch_events)?;
    append_exact_events(
        &mut events,
        replay_data,
        "boost_pad_events",
        "boost.pad_event",
        "Boost pad event",
        "boost",
        "boost_pad",
    )?;
    append_exact_events(
        &mut events,
        replay_data,
        "demolish_infos",
        "core.demo",
        "Demo",
        "core",
        "demo",
    )?;
    append_exact_events(
        &mut events,
        replay_data,
        "dodge_refreshed_events",
        "movement.dodge_refresh",
        "Dodge refresh",
        "movement",
        "dodge_refresh",
    )?;
    append_exact_events(
        &mut events,
        replay_data,
        "goal_events",
        "core.goal",
        "Goal",
        "core",
        "goal",
    )?;
    append_player_stat_events(&mut events, replay_data)?;

    for event in mechanics {
        events.push(indexed_mechanic_event(event)?);
    }
    for (index, event) in goal_tags.iter().enumerate() {
        events.push(indexed_goal_tag_event(index, event)?);
    }

    Ok(events)
}

fn append_touch_stats_events(
    events: &mut Vec<IndexedEvent>,
    touch_events: &[TouchStatsEvent],
) -> Result<()> {
    for (index, event) in touch_events.iter().enumerate() {
        let player_id = remote_id_value_to_subject_id(
            &serde_json::to_value(&event.player)
                .context("failed to serialize touch event player id")?,
        )?;
        let team_subject = EventSubject {
            kind: "team".to_owned(),
            id: team_subject_id(event.is_team_0),
            role: "team".to_owned(),
        };
        let player_subject = EventSubject {
            kind: "player".to_owned(),
            id: player_id.clone(),
            role: "actor".to_owned(),
        };
        let frame = i32::try_from(event.frame).ok();
        let time = Some(f64::from(event.time));

        events.push(IndexedEvent {
            event_type_key: "ball.touch".to_owned(),
            display_name: "Ball touch".to_owned(),
            category: "touch".to_owned(),
            source: STATS_TIMELINE_SOURCE.to_owned(),
            source_event_id: format!("touch:{index}"),
            primary_subject: Some(player_subject.clone()),
            subjects: vec![player_subject, team_subject],
            start_frame: frame,
            end_frame: frame,
            event_frame: frame,
            start_time: time,
            end_time: time,
            event_time: time,
            confidence: None,
            attributes: touch_stats_event_attributes(event),
            payload: Some(
                serde_json::to_value(event).context("failed to serialize touch stats event")?,
            ),
        });
    }

    Ok(())
}

fn append_exact_events(
    events: &mut Vec<IndexedEvent>,
    replay_data: &Value,
    field: &str,
    event_type_key: &str,
    display_name: &str,
    category: &str,
    source_kind: &str,
) -> Result<()> {
    let Some(items) = replay_data.get(field).and_then(Value::as_array) else {
        return Ok(());
    };

    for (index, payload) in items.iter().enumerate() {
        let payload = payload.clone();
        let source_event_id = format!("{source_kind}:{index}");
        let event_frame = int_value(&payload, &["frame", "frame_number"]);
        let event_time = float_value(&payload, &["time"]);
        let primary_subject = exact_primary_subject(source_kind, &payload)?;
        let subjects = primary_subject.iter().cloned().collect::<Vec<_>>();

        events.push(IndexedEvent {
            event_type_key: event_type_key.to_owned(),
            display_name: display_name.to_owned(),
            category: category.to_owned(),
            source: REPLAY_DATA_SOURCE.to_owned(),
            source_event_id,
            primary_subject,
            subjects,
            start_frame: event_frame,
            end_frame: event_frame,
            event_frame,
            start_time: event_time,
            end_time: event_time,
            event_time,
            confidence: None,
            attributes: exact_event_attributes(source_kind, &payload),
            payload: None,
        });
    }

    Ok(())
}

fn append_player_stat_events(events: &mut Vec<IndexedEvent>, replay_data: &Value) -> Result<()> {
    let Some(items) = replay_data
        .get("player_stat_events")
        .and_then(Value::as_array)
    else {
        return Ok(());
    };

    for (index, payload) in items.iter().enumerate() {
        let payload = payload.clone();
        let kind = payload
            .get("kind")
            .and_then(serialized_variant_name)
            .unwrap_or("stat");
        let key_suffix = kind.to_ascii_lowercase();
        let event_type_key = format!("core.{key_suffix}");
        let event_frame = int_value(&payload, &["frame", "frame_number"]);
        let event_time = float_value(&payload, &["time"]);
        let primary_subject = player_subject_from_field(&payload, "player", "actor")?;
        let subjects = primary_subject.iter().cloned().collect::<Vec<_>>();

        events.push(IndexedEvent {
            event_type_key,
            display_name: display_name_from_key(kind),
            category: "core".to_owned(),
            source: REPLAY_DATA_SOURCE.to_owned(),
            source_event_id: format!("player_stat:{index}"),
            primary_subject,
            subjects,
            start_frame: event_frame,
            end_frame: event_frame,
            event_frame,
            start_time: event_time,
            end_time: event_time,
            event_time,
            confidence: None,
            attributes: exact_event_attributes("player_stat", &payload),
            payload: None,
        });
    }

    Ok(())
}

fn indexed_mechanic_event(event: &StatsTimelineTagEvent) -> Result<IndexedEvent> {
    let player_id = remote_id_value_to_subject_id(
        &serde_json::to_value(&event.player_id)
            .context("failed to serialize mechanic event player id")?,
    )?;
    let (start_frame, end_frame, event_frame, start_time, end_time, event_time) =
        mechanic_timing_columns(&event.timing);
    let mut attributes = mechanic_event_attributes(event)?;
    if let Value::Object(attributes) = &mut attributes {
        attributes.insert(
            "team".to_owned(),
            Value::from(if event.is_team_0 { 0 } else { 1 }),
        );
    }

    Ok(IndexedEvent {
        event_type_key: format!("mechanic.{}", event.kind),
        display_name: display_name_from_key(&event.kind),
        category: "mechanic".to_owned(),
        source: STATS_TIMELINE_SOURCE.to_owned(),
        source_event_id: event.id.clone(),
        primary_subject: Some(EventSubject {
            kind: "player".to_owned(),
            id: player_id.clone(),
            role: "actor".to_owned(),
        }),
        subjects: vec![EventSubject {
            kind: "player".to_owned(),
            id: player_id,
            role: "actor".to_owned(),
        }],
        start_frame,
        end_frame,
        event_frame,
        start_time,
        end_time,
        event_time,
        confidence: None,
        attributes,
        payload: Some(serde_json::to_value(event).context("failed to serialize mechanic event")?),
    })
}

fn indexed_goal_tag_event(index: usize, event: &GoalTagEvent) -> Result<IndexedEvent> {
    let payload = serde_json::to_value(event).context("failed to serialize goal tag event")?;
    let kind = payload
        .get("kind")
        .and_then(serialized_variant_name)
        .unwrap_or("goal_tag")
        .to_owned();
    let scorer_subject = payload
        .get("scorer")
        .filter(|value| !value.is_null())
        .map(|value| {
            remote_id_value_to_subject_id(value).map(|id| EventSubject {
                kind: "player".to_owned(),
                id,
                role: "scorer".to_owned(),
            })
        })
        .transpose()?;
    let scoring_team_subject = EventSubject {
        kind: "team".to_owned(),
        id: team_subject_id(event.scoring_team_is_team_0),
        role: "scoring_team".to_owned(),
    };
    let primary_subject = scorer_subject
        .clone()
        .or_else(|| Some(scoring_team_subject.clone()));
    let mut subjects = Vec::new();
    if let Some(subject) = scorer_subject {
        subjects.push(subject);
    }
    subjects.push(scoring_team_subject);
    let frame = i32::try_from(event.frame).ok();
    let time = Some(f64::from(event.time));

    Ok(IndexedEvent {
        event_type_key: format!("goal_tag.{kind}"),
        display_name: display_name_from_key(&kind),
        category: "goal_tag".to_owned(),
        source: STATS_TIMELINE_SOURCE.to_owned(),
        source_event_id: format!("goal_tag:{}:{kind}:{index}", event.goal_index),
        primary_subject,
        subjects,
        start_frame: frame,
        end_frame: frame,
        event_frame: frame,
        start_time: time,
        end_time: time,
        event_time: time,
        confidence: Some(f64::from(event.confidence)),
        attributes: goal_tag_event_attributes(event, &payload),
        payload: Some(payload),
    })
}

fn exact_primary_subject(source_kind: &str, payload: &Value) -> Result<Option<EventSubject>> {
    match source_kind {
        "touch" => player_subject_from_field(payload, "player", "actor").or_else(|_| {
            Ok(
                bool_value(payload, &["team_is_team_0"]).map(|is_team_0| EventSubject {
                    kind: "team".to_owned(),
                    id: team_subject_id(is_team_0),
                    role: "actor".to_owned(),
                }),
            )
        }),
        "goal" => player_subject_from_field(payload, "player", "scorer").or_else(|_| {
            Ok(
                bool_value(payload, &["scoring_team_is_team_0"]).map(|is_team_0| EventSubject {
                    kind: "team".to_owned(),
                    id: team_subject_id(is_team_0),
                    role: "scoring_team".to_owned(),
                }),
            )
        }),
        "demo" => player_subject_from_field(payload, "attacker", "attacker"),
        "dodge_refresh" => player_subject_from_field(payload, "player", "actor"),
        "boost_pad" => {
            stringish_value(payload, &["pad_id", "boost_pad_id", "actor_id"]).map(|id| {
                id.map(|id| EventSubject {
                    kind: "boost_pad".to_owned(),
                    id,
                    role: "pad".to_owned(),
                })
            })
        }
        _ => Ok(None),
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

fn exact_event_attributes(source_kind: &str, payload: &Value) -> Value {
    let mut attributes = Map::new();
    if let Some(is_team_0) = bool_value(payload, &["team_is_team_0", "is_team_0"]) {
        attributes.insert(
            "team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
    }
    if let Some(is_team_0) = bool_value(payload, &["scoring_team_is_team_0"]) {
        attributes.insert(
            "scoring_team".to_owned(),
            Value::from(if is_team_0 { 0 } else { 1 }),
        );
    }
    if source_kind == "player_stat" {
        if let Some(kind) = payload.get("kind").and_then(serialized_variant_name) {
            attributes.insert("kind".to_owned(), Value::String(kind.to_owned()));
        }
    }
    if let Some(distance) = float_value(payload, &["closest_approach_distance"]) {
        attributes.insert(
            "closest_approach_distance".to_owned(),
            Value::from(distance),
        );
    }
    Value::Object(attributes)
}

fn touch_stats_event_attributes(event: &TouchStatsEvent) -> Value {
    let mut attributes = Map::new();
    attributes.insert(
        "team".to_owned(),
        Value::from(if event.is_team_0 { 0 } else { 1 }),
    );
    attributes.insert("kind".to_owned(), Value::String(event.kind.clone()));
    attributes.insert(
        "height_band".to_owned(),
        Value::String(event.height_band.clone()),
    );
    attributes.insert("surface".to_owned(), Value::String(event.surface.clone()));
    attributes.insert(
        "dodge_state".to_owned(),
        Value::String(event.dodge_state.clone()),
    );
    attributes.insert(
        "ball_speed_change".to_owned(),
        Value::from(f64::from(event.ball_speed_change)),
    );
    attributes.insert(
        "sample_time".to_owned(),
        Value::from(f64::from(event.sample_time)),
    );
    if let Ok(sample_frame) = i64::try_from(event.sample_frame) {
        attributes.insert("sample_frame".to_owned(), Value::from(sample_frame));
    }
    Value::Object(attributes)
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

fn mechanic_timing_columns(timing: &StatsEventTiming) -> MechanicTimingColumns {
    match *timing {
        StatsEventTiming::Moment { frame, time } => {
            let frame = Some(frame as i32);
            let time = Some(f64::from(time));
            (frame, frame, frame, time, time, time)
        }
        StatsEventTiming::Span {
            start_frame,
            end_frame,
            start_time,
            end_time,
        } => (
            Some(start_frame as i32),
            Some(end_frame as i32),
            Some(end_frame as i32),
            Some(f64::from(start_time)),
            Some(f64::from(end_time)),
            Some(f64::from(end_time)),
        ),
    }
}

fn mechanic_event_attributes(event: &StatsTimelineTagEvent) -> Result<Value> {
    let mut attributes = Map::new();
    for property in &event.properties {
        let value = match &property.value {
            StatsEventPropertyValue::Text(value) => Value::String(value.clone()),
            StatsEventPropertyValue::Unsigned(value) => serde_json::to_value(value)
                .context("failed to serialize unsigned mechanic event property")?,
            StatsEventPropertyValue::Float(value) => serde_json::to_value(value)
                .context("failed to serialize float mechanic event property")?,
            StatsEventPropertyValue::Boolean(value) => Value::Bool(*value),
        };
        attributes.insert(property.key.clone(), value);
    }

    Ok(Value::Object(attributes))
}

fn goal_tag_event_attributes(event: &GoalTagEvent, payload: &Value) -> Value {
    let mut attributes = Map::new();
    attributes.insert(
        "goal_index".to_owned(),
        serde_json::to_value(event.goal_index).unwrap_or(Value::Null),
    );
    attributes.insert(
        "team".to_owned(),
        Value::from(if event.scoring_team_is_team_0 { 0 } else { 1 }),
    );
    if let Some(kind) = payload.get("kind").and_then(serialized_variant_name) {
        attributes.insert("kind".to_owned(), Value::String(kind.to_owned()));
    }
    if let Some(modifiers) = payload.get("modifiers") {
        attributes.insert("modifiers".to_owned(), modifiers.clone());
    }
    let evidence_kinds = payload
        .get("evidence")
        .and_then(Value::as_array)
        .map(|evidence| {
            evidence
                .iter()
                .filter_map(|item| item.get("kind").and_then(serialized_variant_name))
                .map(|kind| Value::String(kind.to_owned()))
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();
    attributes.insert("evidence_kinds".to_owned(), Value::Array(evidence_kinds));
    Value::Object(attributes)
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
