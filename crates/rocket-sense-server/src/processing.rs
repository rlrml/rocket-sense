use anyhow::{anyhow, Context, Result};
use boxcars::{HeaderProp, RemoteId};
use chrono::{DateTime, NaiveDateTime, Utc};
use rocket_sense_storage::{sha256_hex, ObjectStorage};
use serde_json::{Map, Value};
use sqlx::{PgPool, Row};
use std::{collections::HashMap, sync::Arc};
use subtr_actor::{
    MechanicEvent, MechanicEventPropertyValue, MechanicTiming, PlayerInfo, ReplayMeta,
    StatsCollector,
};
use uuid::Uuid;

#[cfg(test)]
#[path = "processing_tests.rs"]
mod tests;

const DEFAULT_EXTRACTOR_NAME: &str = "rocket-sense:aggregate-stats";
const DEFAULT_CONFIG_HASH: &str = "aggregate-stats:v1:all-builtin-modules";
const DEFAULT_INDEX_PROFILE_ID: Uuid = Uuid::from_u128(0x0198_0000_0000_7000_8000_0000_0000_0001);
const DEFAULT_INDEX_PROFILE_NAME: &str = "default-mechanics";
const DEFAULT_INDEX_PROFILE_VERSION: i32 = 1;
const PLAY_EVENT_SOURCE: &str = "subtr-actor:stats-timeline";

struct PersistentEventType {
    key: &'static str,
    display_name: &'static str,
    category: &'static str,
    subtr_actor_kind: &'static str,
}

const PERSISTENT_MECHANIC_EVENT_TYPES: &[PersistentEventType] = &[
    PersistentEventType {
        key: "mechanic.air_dribble",
        display_name: "Air dribble",
        category: "mechanic",
        subtr_actor_kind: "air_dribble",
    },
    PersistentEventType {
        key: "mechanic.ball_carry",
        display_name: "Ball carry",
        category: "mechanic",
        subtr_actor_kind: "ball_carry",
    },
    PersistentEventType {
        key: "mechanic.ceiling_shot",
        display_name: "Ceiling shot",
        category: "mechanic",
        subtr_actor_kind: "ceiling_shot",
    },
    PersistentEventType {
        key: "mechanic.double_tap",
        display_name: "Double tap",
        category: "mechanic",
        subtr_actor_kind: "double_tap",
    },
    PersistentEventType {
        key: "mechanic.flick",
        display_name: "Flick",
        category: "mechanic",
        subtr_actor_kind: "flick",
    },
    PersistentEventType {
        key: "mechanic.flip_reset",
        display_name: "Flip reset",
        category: "mechanic",
        subtr_actor_kind: "flip_reset",
    },
    PersistentEventType {
        key: "mechanic.half_flip",
        display_name: "Half flip",
        category: "mechanic",
        subtr_actor_kind: "half_flip",
    },
    PersistentEventType {
        key: "mechanic.half_volley",
        display_name: "Half volley",
        category: "mechanic",
        subtr_actor_kind: "half_volley",
    },
    PersistentEventType {
        key: "mechanic.musty_flick",
        display_name: "Musty flick",
        category: "mechanic",
        subtr_actor_kind: "musty_flick",
    },
    PersistentEventType {
        key: "mechanic.one_timer",
        display_name: "One timer",
        category: "mechanic",
        subtr_actor_kind: "one_timer",
    },
    PersistentEventType {
        key: "mechanic.pass",
        display_name: "Pass",
        category: "mechanic",
        subtr_actor_kind: "pass",
    },
    PersistentEventType {
        key: "mechanic.speed_flip",
        display_name: "Speed flip",
        category: "mechanic",
        subtr_actor_kind: "speed_flip",
    },
    PersistentEventType {
        key: "mechanic.wavedash",
        display_name: "Wavedash",
        category: "mechanic",
        subtr_actor_kind: "wavedash",
    },
];

struct ReplayAnalysisOutput {
    stats: Value,
    mechanic_events: Vec<MechanicEvent>,
    metadata: ReplaySearchMetadata,
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct ReplaySearchMetadata {
    playlist: Option<String>,
    map_code: Option<String>,
    replay_date: Option<DateTime<Utc>>,
    has_pro_player: bool,
    players: Vec<ReplaySearchPlayer>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct ReplaySearchPlayer {
    name: String,
    platform: Option<String>,
    platform_player_id: Option<String>,
    team: i32,
    is_pro: bool,
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

async fn process_replay(
    pool: PgPool,
    storage: Arc<dyn ObjectStorage>,
    replay_id: Uuid,
    file_sha256: String,
    storage_key: String,
) -> Result<()> {
    set_replay_status(&pool, replay_id, "parsing").await?;

    ensure_default_index_profile(&pool).await?;
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
                .context("replay stats task panicked")??;
        let stats = output.stats;
        let stats_bytes =
            serde_json::to_vec(&stats).context("failed to serialize replay stats blob")?;
        let stats_sha256 = sha256_hex(&stats_bytes);

        insert_stat_blob(&pool, analysis_run_id, replay_id, stats, &stats_sha256).await?;
        let replay_players =
            upsert_replay_search_metadata(&pool, replay_id, &output.metadata).await?;
        let event_type_ids = ensure_persistent_event_types(&pool).await?;
        insert_play_events(
            &pool,
            analysis_run_id,
            replay_id,
            &output.mechanic_events,
            &event_type_ids,
            &replay_players,
        )
        .await?;
        insert_mechanic_events(
            &pool,
            analysis_run_id,
            replay_id,
            &file_sha256,
            &output.mechanic_events,
        )
        .await?;
        upsert_replay_analysis_state(&pool, analysis_run_id, replay_id, &file_sha256).await?;
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
    let stats = StatsCollector::new()
        .get_stats(&replay)
        .map_err(|error| anyhow!("failed to collect replay stats: {error:?}"))?;
    let timeline = StatsCollector::new()
        .get_replay_stats_timeline(&replay)
        .map_err(|error| anyhow!("failed to collect replay mechanic events: {error:?}"))?;
    let metadata = replay_search_metadata(&stats.replay_meta);

    Ok(ReplayAnalysisOutput {
        stats: serde_json::to_value(stats).context("failed to convert replay stats to JSON")?,
        mechanic_events: timeline.events.mechanics,
        metadata,
    })
}

fn replay_search_metadata(replay_meta: &ReplayMeta) -> ReplaySearchMetadata {
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
    }
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

fn replay_player_id_for_event(
    event: &MechanicEvent,
    replay_players: &HashMap<String, Uuid>,
) -> Option<Uuid> {
    let (platform, platform_player_id) = remote_id_parts(&event.player_id);
    player_lookup_key(&platform, &platform_player_id)
        .and_then(|key| replay_players.get(&key).copied())
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
            has_pro_player = has_pro_player OR $5,
            updated_at = now()
        WHERE id = $1
        "#,
    )
    .bind(replay_id)
    .bind(&metadata.playlist)
    .bind(&metadata.map_code)
    .bind(metadata.replay_date)
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
                is_pro
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            "#,
        )
        .bind(replay_player_id)
        .bind(replay_id)
        .bind(&player.name)
        .bind(&player.platform)
        .bind(&player.platform_player_id)
        .bind(player.team)
        .bind(player.is_pro)
        .execute(pool)
        .await
        .context("failed to insert replay player")?;

        if let Some(key) = player_lookup_key(&player.platform, &player.platform_player_id) {
            replay_players.entry(key).or_insert(replay_player_id);
        }
    }

    Ok(replay_players)
}

async fn ensure_default_index_profile(pool: &PgPool) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO stat_index_profiles (
            id,
            name,
            version,
            description,
            config
        )
        VALUES (
            $1,
            $2,
            $3,
            'Default Rocket Sense mechanics/stat projection profile',
            '{"mechanics": "all"}'::jsonb
        )
        ON CONFLICT (name, version) DO NOTHING
        "#,
    )
    .bind(DEFAULT_INDEX_PROFILE_ID)
    .bind(DEFAULT_INDEX_PROFILE_NAME)
    .bind(DEFAULT_INDEX_PROFILE_VERSION)
    .execute(pool)
    .await
    .context("failed to ensure default index profile")?;

    Ok(())
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
            index_profile_id,
            status,
            extractor_name,
            extractor_version,
            rocket_sense_git_sha,
            config_hash,
            input_file_sha256
        )
        VALUES ($1, $2, $3, 'running', $4, $5, $6, $7, $8)
        "#,
    )
    .bind(analysis_run_id)
    .bind(replay_id)
    .bind(DEFAULT_INDEX_PROFILE_ID)
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

async fn ensure_persistent_event_types(pool: &PgPool) -> Result<HashMap<&'static str, i32>> {
    let mut event_type_ids = HashMap::new();
    for event_type in PERSISTENT_MECHANIC_EVENT_TYPES {
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
        .bind(event_type.key)
        .bind(event_type.display_name)
        .bind(event_type.category)
        .fetch_one(pool)
        .await
        .with_context(|| format!("failed to ensure event type `{}`", event_type.key))?;

        event_type_ids.insert(event_type.subtr_actor_kind, row.try_get("id")?);
    }

    Ok(event_type_ids)
}

async fn insert_play_events(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    events: &[MechanicEvent],
    event_type_ids: &HashMap<&'static str, i32>,
    replay_players: &HashMap<String, Uuid>,
) -> Result<()> {
    for event in events {
        let Some(event_type_id) = event_type_ids.get(event.kind.as_str()).copied() else {
            continue;
        };

        let play_event_id = Uuid::now_v7();
        let primary_replay_player_id = replay_player_id_for_event(event, replay_players);
        let (start_frame, end_frame, event_frame, start_time, end_time, event_time) =
            mechanic_timing_columns(&event.timing);
        let attributes = mechanic_event_attributes(event)?;
        let payload =
            serde_json::to_value(event).context("failed to serialize play event payload")?;

        sqlx::query(
            r#"
            INSERT INTO play_events (
                id,
                analysis_run_id,
                replay_id,
                event_type_id,
                primary_replay_player_id,
                source,
                source_event_id,
                start_frame,
                end_frame,
                event_frame,
                start_time,
                end_time,
                event_time,
                attributes,
                payload
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15
            )
            ON CONFLICT DO NOTHING
            "#,
        )
        .bind(play_event_id)
        .bind(analysis_run_id)
        .bind(replay_id)
        .bind(event_type_id)
        .bind(primary_replay_player_id)
        .bind(PLAY_EVENT_SOURCE)
        .bind(&event.id)
        .bind(start_frame)
        .bind(end_frame)
        .bind(event_frame)
        .bind(start_time)
        .bind(end_time)
        .bind(event_time)
        .bind(attributes)
        .bind(payload)
        .execute(pool)
        .await
        .context("failed to insert play event")?;

        if let Some(replay_player_id) = primary_replay_player_id {
            sqlx::query(
                r#"
                INSERT INTO play_event_players (
                    event_id,
                    replay_player_id,
                    role
                )
                VALUES ($1, $2, 'actor')
                ON CONFLICT DO NOTHING
                "#,
            )
            .bind(play_event_id)
            .bind(replay_player_id)
            .execute(pool)
            .await
            .context("failed to insert play event player")?;
        }
    }

    Ok(())
}

async fn insert_mechanic_events(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    file_sha256: &str,
    events: &[MechanicEvent],
) -> Result<()> {
    for event in events {
        let mechanic_event_id = Uuid::now_v7();
        let player_id = player_id_to_string(
            serde_json::to_value(&event.player_id)
                .context("failed to serialize mechanic event player id")?,
        )?;
        let team = if event.is_team_0 { 0_i32 } else { 1_i32 };
        let (start_frame, end_frame, event_frame, start_time, end_time, event_time) =
            mechanic_timing_columns(&event.timing);
        let payload =
            serde_json::to_value(event).context("failed to serialize mechanic event payload")?;
        let stable_fingerprint = mechanic_event_fingerprint(
            file_sha256,
            &event.kind,
            &player_id,
            start_frame,
            end_frame,
            event_frame,
        );

        sqlx::query(
            r#"
            INSERT INTO mechanic_events (
                id,
                analysis_run_id,
                index_profile_id,
                replay_id,
                mechanic,
                detector,
                detector_version,
                subject_kind,
                subject_id,
                player_id,
                team,
                start_frame,
                end_frame,
                event_frame,
                start_time,
                end_time,
                event_time,
                stable_fingerprint,
                payload
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, 'player', $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18
            )
            ON CONFLICT DO NOTHING
            "#,
        )
        .bind(mechanic_event_id)
        .bind(analysis_run_id)
        .bind(DEFAULT_INDEX_PROFILE_ID)
        .bind(replay_id)
        .bind(&event.kind)
        .bind("subtr-actor:stats-timeline")
        .bind(option_env!("SUBTR_ACTOR_GIT_SHA"))
        .bind(&player_id)
        .bind(&player_id)
        .bind(team)
        .bind(start_frame)
        .bind(end_frame)
        .bind(event_frame)
        .bind(start_time)
        .bind(end_time)
        .bind(event_time)
        .bind(stable_fingerprint)
        .bind(payload)
        .execute(pool)
        .await
        .context("failed to insert mechanic event")?;
    }

    Ok(())
}

async fn upsert_replay_analysis_state(
    pool: &PgPool,
    analysis_run_id: Uuid,
    replay_id: Uuid,
    file_sha256: &str,
) -> Result<()> {
    sqlx::query(
        r#"
        INSERT INTO replay_analysis_states (
            replay_id,
            index_profile_id,
            active_analysis_run_id,
            desired_extractor_name,
            desired_extractor_version,
            desired_config_hash,
            desired_input_file_sha256,
            needs_reanalysis,
            needs_reindex,
            stale_reason,
            updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, false, false, NULL, now())
        ON CONFLICT (replay_id, index_profile_id)
        DO UPDATE SET
            active_analysis_run_id = EXCLUDED.active_analysis_run_id,
            desired_extractor_name = EXCLUDED.desired_extractor_name,
            desired_extractor_version = EXCLUDED.desired_extractor_version,
            desired_config_hash = EXCLUDED.desired_config_hash,
            desired_input_file_sha256 = EXCLUDED.desired_input_file_sha256,
            needs_reanalysis = false,
            needs_reindex = false,
            stale_reason = NULL,
            updated_at = now()
        "#,
    )
    .bind(replay_id)
    .bind(DEFAULT_INDEX_PROFILE_ID)
    .bind(analysis_run_id)
    .bind(DEFAULT_EXTRACTOR_NAME)
    .bind(env!("CARGO_PKG_VERSION"))
    .bind(DEFAULT_CONFIG_HASH)
    .bind(file_sha256)
    .execute(pool)
    .await
    .context("failed to upsert replay analysis state")?;

    Ok(())
}

type MechanicTimingColumns = (
    Option<i32>,
    Option<i32>,
    Option<i32>,
    Option<f64>,
    Option<f64>,
    Option<f64>,
);

fn mechanic_timing_columns(timing: &MechanicTiming) -> MechanicTimingColumns {
    match *timing {
        MechanicTiming::Moment { frame, time } => {
            let frame = Some(frame as i32);
            let time = Some(f64::from(time));
            (frame, frame, frame, time, time, time)
        }
        MechanicTiming::Span {
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

fn mechanic_event_attributes(event: &MechanicEvent) -> Result<Value> {
    let mut attributes = Map::new();
    for property in &event.properties {
        let value = match &property.value {
            MechanicEventPropertyValue::Text(value) => Value::String(value.clone()),
            MechanicEventPropertyValue::Unsigned(value) => serde_json::to_value(value)
                .context("failed to serialize unsigned mechanic event property")?,
            MechanicEventPropertyValue::Float(value) => serde_json::to_value(value)
                .context("failed to serialize float mechanic event property")?,
            MechanicEventPropertyValue::Boolean(value) => Value::Bool(*value),
        };
        attributes.insert(property.key.clone(), value);
    }

    Ok(Value::Object(attributes))
}

fn player_id_to_string(value: Value) -> Result<String> {
    let Value::Object(object) = value else {
        return Ok(format!("Unknown:{value}"));
    };
    let Some((kind, value)) = object.into_iter().next() else {
        return Ok("Unknown:null".to_owned());
    };
    match value {
        Value::String(value) => Ok(format!("{kind}:{value}")),
        Value::Number(value) => Ok(format!("{kind}:{value}")),
        other => Ok(format!(
            "{kind}:{}",
            serde_json::to_string(&other).context("failed to stringify player id")?
        )),
    }
}

fn mechanic_event_fingerprint(
    file_sha256: &str,
    mechanic: &str,
    player_id: &str,
    start_frame: Option<i32>,
    end_frame: Option<i32>,
    event_frame: Option<i32>,
) -> String {
    sha256_hex(
        format!(
            "{file_sha256}:{mechanic}:{player_id}:{}:{}:{}",
            start_frame.unwrap_or(-1),
            end_frame.unwrap_or(-1),
            event_frame.unwrap_or(-1)
        )
        .as_bytes(),
    )
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
