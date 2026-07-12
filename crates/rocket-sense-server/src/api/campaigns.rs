//! Review campaigns: an organized human labeling effort over a curated
//! candidate set imported from a subtr-actor-emitted review playlist.
//!
//! A campaign holds a question ("Was this player genuinely challenging for
//! the ball?"), the curated items, per-reviewer labels, progress counters,
//! and a JSONL export for training. Candidate identity is *content-derived*
//! (the imported item's `meta.eventId`, `<sha12>:<event_type>:<frame>:<player>`),
//! never a `play_events` id, so labels survive detector re-runs.

use crate::{
    app::AppState,
    auth::{AuthUser, OptionalAuthUser},
};
use axum::{
    extract::{Path, Query, State},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::{json, Map, Value};
use sqlx::{PgPool, Row};
use uuid::Uuid;

use super::mechanics::{
    upsert_user, PlaylistBound, PlaylistPage, PlaylistPlayback, PlaylistReplay,
};

#[cfg(test)]
#[path = "campaigns_tests.rs"]
mod tests;

const DEFAULT_PLAYLIST_PAGE_SIZE: u32 = 500;
const MAX_PLAYLIST_PAGE_SIZE: u32 = 5_000;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/campaigns", get(list_campaigns).post(create_campaign))
        .route("/campaigns/{campaign_id}", get(get_campaign))
        .route("/campaigns/{campaign_id}/playlist", get(campaign_playlist))
        .route(
            "/campaigns/{campaign_id}/items/{item_id}/labels",
            post(create_campaign_label),
        )
        .route(
            "/campaigns/{campaign_id}/labels.jsonl",
            get(export_campaign_labels),
        )
}

// ---------------------------------------------------------------------------
// Decision vocabulary
// ---------------------------------------------------------------------------

/// The default answer set for a campaign that does not define its own.
fn default_decision_vocabulary() -> Value {
    json!([
        { "key": "confirmed", "status": "confirmed", "label": "Confirmed" },
        { "key": "rejected", "status": "rejected", "label": "Rejected" },
        { "key": "uncertain", "status": "uncertain", "label": "Uncertain" },
        { "key": "bad_candidate", "status": "bad_candidate", "label": "Bad candidate" },
    ])
}

/// The set of statuses a label may carry, derived from the campaign's
/// decision vocabulary (each entry contributes its `status`, falling back to
/// its `key`).
fn allowed_label_statuses(decision_vocabulary: &Value) -> Vec<String> {
    decision_vocabulary
        .as_array()
        .map(|entries| {
            entries
                .iter()
                .filter_map(|entry| {
                    entry
                        .get("status")
                        .and_then(Value::as_str)
                        .or_else(|| entry.get("key").and_then(Value::as_str))
                        .map(str::to_owned)
                })
                .collect()
        })
        .unwrap_or_default()
}

fn validate_label_status(decision_vocabulary: &Value, status: &str) -> Result<String, String> {
    let status = status.trim();
    if status.is_empty() {
        return Err("status must not be empty".to_owned());
    }
    let allowed = allowed_label_statuses(decision_vocabulary);
    if allowed.iter().any(|allowed| allowed == status) {
        Ok(status.to_owned())
    } else {
        Err(format!(
            "status {status:?} is not in the campaign's decision vocabulary ({})",
            allowed.join(", ")
        ))
    }
}

// ---------------------------------------------------------------------------
// Playlist import parsing (pure; unit-tested against the real emitter shape)
// ---------------------------------------------------------------------------

#[derive(Debug)]
struct ParsedPlaylistImport {
    label: Option<String>,
    kind: Option<String>,
    meta: Value,
    source_item_count: usize,
    items: Vec<ParsedPlaylistItem>,
    skipped: Vec<SkippedImportItem>,
}

#[derive(Debug)]
struct ParsedPlaylistItem {
    candidate_key: String,
    replay_sha256: String,
    label: Option<String>,
    start_time: f64,
    end_time: f64,
    perspective: Option<Value>,
    item_meta: Value,
}

#[derive(Debug, Serialize, PartialEq)]
pub struct SkippedImportItem {
    candidate: String,
    reason: String,
}

fn is_sha256_hex(value: &str) -> bool {
    value.len() == 64 && value.chars().all(|character| character.is_ascii_hexdigit())
}

/// Parse a subtr-actor review playlist (the emitter's flat-file / manifest
/// format) into campaign items. Items missing a usable candidate key, replay
/// sha, or time bounds are skipped with a reason rather than failing the whole
/// import; a playlist that is not even shaped like a playlist is an error.
fn parse_import_playlist(playlist: &Value) -> Result<ParsedPlaylistImport, String> {
    let playlist = playlist
        .as_object()
        .ok_or_else(|| "playlist must be a JSON object".to_owned())?;
    let raw_items = playlist
        .get("items")
        .and_then(Value::as_array)
        .ok_or_else(|| "playlist must contain an items array".to_owned())?;

    // Map replay-ref -> file sha256. The emitter's replays[].id is the replay
    // file's sha256 stem.
    let mut replay_shas = std::collections::BTreeMap::new();
    if let Some(replays) = playlist.get("replays").and_then(Value::as_array) {
        for replay in replays {
            if let Some(id) = replay.get("id").and_then(Value::as_str) {
                if is_sha256_hex(id) {
                    replay_shas.insert(id.to_owned(), id.to_lowercase());
                }
            }
        }
    }

    let mut items = Vec::new();
    let mut skipped = Vec::new();
    let mut seen_candidates = std::collections::BTreeSet::new();
    for (index, item) in raw_items.iter().enumerate() {
        let fallback_candidate = format!("item {index}");
        let item_id = item.get("id").and_then(Value::as_str);
        let meta = item.get("meta").cloned().unwrap_or_else(|| json!({}));
        let candidate_key = meta
            .get("eventId")
            .and_then(Value::as_str)
            .or(item_id)
            .map(str::to_owned);
        let Some(candidate_key) = candidate_key.filter(|key| !key.is_empty()) else {
            skipped.push(SkippedImportItem {
                candidate: fallback_candidate,
                reason: "item has neither meta.eventId nor id".to_owned(),
            });
            continue;
        };
        if !seen_candidates.insert(candidate_key.clone()) {
            skipped.push(SkippedImportItem {
                candidate: candidate_key,
                reason: "duplicate candidate key in playlist".to_owned(),
            });
            continue;
        }

        let replay_ref = item.get("replay").and_then(Value::as_str).unwrap_or("");
        let replay_sha256 = replay_shas
            .get(replay_ref)
            .cloned()
            .or_else(|| is_sha256_hex(replay_ref).then(|| replay_ref.to_lowercase()));
        let Some(replay_sha256) = replay_sha256 else {
            skipped.push(SkippedImportItem {
                candidate: candidate_key,
                reason: format!("item replay ref {replay_ref:?} does not resolve to a sha256"),
            });
            continue;
        };

        let start_time = playlist_bound_seconds(item.get("start"));
        let end_time = playlist_bound_seconds(item.get("end"));
        let (Some(start_time), Some(end_time)) = (start_time, end_time) else {
            skipped.push(SkippedImportItem {
                candidate: candidate_key,
                reason: "item is missing time-kind start/end bounds".to_owned(),
            });
            continue;
        };

        items.push(ParsedPlaylistItem {
            candidate_key,
            replay_sha256,
            label: item.get("label").and_then(Value::as_str).map(str::to_owned),
            start_time,
            end_time: end_time.max(start_time),
            perspective: item.get("perspective").cloned(),
            item_meta: meta,
        });
    }

    Ok(ParsedPlaylistImport {
        label: playlist
            .get("label")
            .and_then(Value::as_str)
            .map(str::to_owned),
        kind: playlist
            .get("kind")
            .and_then(Value::as_str)
            .map(str::to_owned),
        meta: playlist.get("meta").cloned().unwrap_or_else(|| json!({})),
        source_item_count: raw_items.len(),
        items,
        skipped,
    })
}

fn playlist_bound_seconds(bound: Option<&Value>) -> Option<f64> {
    let bound = bound?;
    let kind = bound.get("kind").and_then(Value::as_str)?;
    if kind != "time" {
        return None;
    }
    bound.get("value").and_then(Value::as_f64)
}

fn slugify(value: &str) -> String {
    let mut slug = String::new();
    let mut last_dash = true;
    for character in value.chars() {
        if character.is_ascii_alphanumeric() {
            slug.push(character.to_ascii_lowercase());
            last_dash = false;
        } else if !last_dash {
            slug.push('-');
            last_dash = true;
        }
    }
    slug.trim_matches('-').to_owned()
}

// ---------------------------------------------------------------------------
// Create / import
// ---------------------------------------------------------------------------

#[derive(Debug, Deserialize)]
pub struct CreateCampaignRequest {
    pub title: String,
    pub slug: Option<String>,
    pub question: Option<String>,
    pub description: Option<String>,
    pub decision_vocabulary: Option<Value>,
    pub playlist: Value,
}

#[derive(Debug, Serialize)]
pub struct CreateCampaignResponse {
    pub id: Uuid,
    pub slug: String,
    pub imported: u32,
    pub skipped: Vec<SkippedImportItem>,
}

pub async fn create_campaign(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<CreateCampaignRequest>,
) -> Result<(StatusCode, Json<CreateCampaignResponse>), ApiError> {
    let db = require_db(&state)?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let title = request.title.trim().to_owned();
    if title.is_empty() {
        return Err(ApiError::bad_request("campaign title must not be empty"));
    }
    let slug = request
        .slug
        .as_deref()
        .map(slugify)
        .filter(|slug| !slug.is_empty())
        .unwrap_or_else(|| slugify(&title));
    if slug.is_empty() {
        return Err(ApiError::bad_request(
            "campaign slug must contain at least one alphanumeric character",
        ));
    }
    let question = request
        .question
        .map(|question| question.trim().to_owned())
        .filter(|question| !question.is_empty())
        .unwrap_or_else(|| title.clone());
    let description = request
        .description
        .map(|description| description.trim().to_owned())
        .filter(|description| !description.is_empty());
    let decision_vocabulary = match request.decision_vocabulary {
        Some(vocabulary) => {
            if allowed_label_statuses(&vocabulary).is_empty() {
                return Err(ApiError::bad_request(
                    "decision_vocabulary must be an array of {key, status, label} entries",
                ));
            }
            vocabulary
        }
        None => default_decision_vocabulary(),
    };

    let parsed = parse_import_playlist(&request.playlist).map_err(ApiError::bad_request)?;
    let mut skipped = parsed.skipped;

    // Resolve replay file shas to rocket-sense replay rows; skip-and-report
    // items whose replay is not hosted here.
    let shas: Vec<String> = {
        let mut shas: Vec<String> = parsed
            .items
            .iter()
            .map(|item| item.replay_sha256.clone())
            .collect();
        shas.sort();
        shas.dedup();
        shas
    };
    let replay_rows = sqlx::query(
        r#"
        SELECT id, file_sha256
        FROM replays
        WHERE file_sha256 = ANY($1)
        "#,
    )
    .bind(&shas)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;
    let mut replay_ids = std::collections::BTreeMap::new();
    for row in replay_rows {
        let id: Uuid = row.try_get("id").map_err(ApiError::internal)?;
        let sha: String = row.try_get("file_sha256").map_err(ApiError::internal)?;
        replay_ids.insert(sha.to_lowercase(), id);
    }

    let mut importable = Vec::new();
    for item in parsed.items {
        match replay_ids.get(&item.replay_sha256) {
            Some(replay_id) => importable.push((*replay_id, item)),
            None => skipped.push(SkippedImportItem {
                candidate: item.candidate_key,
                reason: format!("no hosted replay with file sha256 {}", item.replay_sha256),
            }),
        }
    }

    let generator = json!({
        "source": {
            "kind": parsed.kind,
            "label": parsed.label,
            "meta": parsed.meta,
        },
        "sourceItemCount": parsed.source_item_count,
        "importedItemCount": importable.len(),
        "skippedItemCount": skipped.len(),
        "importedAt": Utc::now(),
    });

    let campaign_id = Uuid::now_v7();
    let mut tx = db.begin().await.map_err(ApiError::internal)?;
    sqlx::query(
        r#"
        INSERT INTO review_campaigns (
            id, slug, title, question, description,
            decision_vocabulary, generator, created_by_user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        "#,
    )
    .bind(campaign_id)
    .bind(&slug)
    .bind(&title)
    .bind(&question)
    .bind(&description)
    .bind(&decision_vocabulary)
    .bind(&generator)
    .bind(auth_user.id)
    .execute(&mut *tx)
    .await
    .map_err(|error| match &error {
        sqlx::Error::Database(db_error) if db_error.is_unique_violation() => ApiError::new(
            StatusCode::CONFLICT,
            format!("a campaign with slug {slug:?} already exists"),
        ),
        _ => ApiError::internal(error),
    })?;

    for (position, (replay_id, item)) in importable.iter().enumerate() {
        sqlx::query(
            r#"
            INSERT INTO review_campaign_items (
                id, campaign_id, candidate_key, replay_id, position,
                label, start_time, end_time, perspective, item_meta
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            "#,
        )
        .bind(Uuid::now_v7())
        .bind(campaign_id)
        .bind(&item.candidate_key)
        .bind(replay_id)
        .bind(position as i32)
        .bind(&item.label)
        .bind(item.start_time)
        .bind(item.end_time)
        .bind(&item.perspective)
        .bind(&item.item_meta)
        .execute(&mut *tx)
        .await
        .map_err(ApiError::internal)?;
    }
    tx.commit().await.map_err(ApiError::internal)?;

    Ok((
        StatusCode::CREATED,
        Json(CreateCampaignResponse {
            id: campaign_id,
            slug,
            imported: importable.len() as u32,
            skipped,
        }),
    ))
}

// ---------------------------------------------------------------------------
// List / detail
// ---------------------------------------------------------------------------

#[derive(Debug, Serialize)]
pub struct CampaignSummary {
    pub id: Uuid,
    pub slug: String,
    pub title: String,
    pub question: String,
    pub status: String,
    pub item_count: i64,
    pub label_count: i64,
    pub distinct_labeled_items: i64,
    pub my_labeled_count: i64,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct CampaignListResponse {
    pub count: u32,
    pub campaigns: Vec<CampaignSummary>,
}

#[derive(Debug, Serialize)]
pub struct CampaignDetailResponse {
    #[serde(flatten)]
    pub summary: CampaignSummary,
    pub description: Option<String>,
    pub decision_vocabulary: Value,
    pub generator: Value,
    pub labels_per_item: i32,
}

const CAMPAIGN_SUMMARY_SQL: &str = r#"
    SELECT
        c.id, c.slug, c.title, c.question, c.description, c.status,
        c.decision_vocabulary, c.generator, c.labels_per_item, c.created_at,
        (SELECT count(*) FROM review_campaign_items i
          WHERE i.campaign_id = c.id) AS item_count,
        (SELECT count(*) FROM review_campaign_labels l
          WHERE l.campaign_id = c.id) AS label_count,
        (SELECT count(DISTINCT l.item_id) FROM review_campaign_labels l
          WHERE l.campaign_id = c.id) AS distinct_labeled_items,
        (SELECT count(*) FROM review_campaign_labels l
          WHERE l.campaign_id = c.id AND l.reviewer_user_id = $1) AS my_labeled_count
    FROM review_campaigns c
"#;

fn campaign_summary_from_row(row: &sqlx::postgres::PgRow) -> Result<CampaignSummary, sqlx::Error> {
    Ok(CampaignSummary {
        id: row.try_get("id")?,
        slug: row.try_get("slug")?,
        title: row.try_get("title")?,
        question: row.try_get("question")?,
        status: row.try_get("status")?,
        item_count: row.try_get("item_count")?,
        label_count: row.try_get("label_count")?,
        distinct_labeled_items: row.try_get("distinct_labeled_items")?,
        my_labeled_count: row.try_get("my_labeled_count")?,
        created_at: row.try_get("created_at")?,
    })
}

pub async fn list_campaigns(
    OptionalAuthUser(viewer): OptionalAuthUser,
    State(state): State<AppState>,
) -> Result<Json<CampaignListResponse>, ApiError> {
    let db = require_db(&state)?;
    let sql = format!("{CAMPAIGN_SUMMARY_SQL} ORDER BY c.created_at DESC, c.id DESC");
    let rows = sqlx::query(&sql)
        .bind(viewer.map(|user| user.id))
        .fetch_all(db)
        .await
        .map_err(ApiError::internal)?;
    let campaigns = rows
        .iter()
        .map(campaign_summary_from_row)
        .collect::<Result<Vec<_>, _>>()
        .map_err(ApiError::internal)?;

    Ok(Json(CampaignListResponse {
        count: campaigns.len() as u32,
        campaigns,
    }))
}

async fn fetch_campaign_row(
    db: &PgPool,
    campaign_id: Uuid,
    viewer_id: Option<Uuid>,
) -> Result<sqlx::postgres::PgRow, ApiError> {
    let sql = format!("{CAMPAIGN_SUMMARY_SQL} WHERE c.id = $2");
    sqlx::query(&sql)
        .bind(viewer_id)
        .bind(campaign_id)
        .fetch_optional(db)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "campaign not found"))
}

pub async fn get_campaign(
    OptionalAuthUser(viewer): OptionalAuthUser,
    State(state): State<AppState>,
    Path(campaign_id): Path<Uuid>,
) -> Result<Json<CampaignDetailResponse>, ApiError> {
    let db = require_db(&state)?;
    let row = fetch_campaign_row(db, campaign_id, viewer.map(|user| user.id)).await?;

    Ok(Json(CampaignDetailResponse {
        summary: campaign_summary_from_row(&row).map_err(ApiError::internal)?,
        description: row.try_get("description").map_err(ApiError::internal)?,
        decision_vocabulary: row
            .try_get("decision_vocabulary")
            .map_err(ApiError::internal)?,
        generator: row.try_get("generator").map_err(ApiError::internal)?,
        labels_per_item: row.try_get("labels_per_item").map_err(ApiError::internal)?,
    }))
}

// ---------------------------------------------------------------------------
// Playlist manifest
// ---------------------------------------------------------------------------

#[derive(Debug, Deserialize)]
pub struct CampaignPlaylistQuery {
    #[serde(default, rename = "include-labeled")]
    pub include_labeled: Option<String>,
    pub limit: Option<u32>,
    pub offset: Option<u32>,
}

#[derive(Debug, Serialize)]
pub struct CampaignReviewPlaylist {
    pub version: u32,
    pub kind: &'static str,
    pub label: String,
    pub playback: PlaylistPlayback,
    pub page: PlaylistPage,
    pub replays: Vec<PlaylistReplay>,
    pub items: Vec<CampaignPlaylistItem>,
    pub meta: Value,
}

#[derive(Debug, Serialize)]
pub struct CampaignPlaylistItem {
    pub id: String,
    pub replay: String,
    pub start: PlaylistBound,
    pub end: PlaylistBound,
    pub label: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub perspective: Option<Value>,
    pub meta: Value,
}

fn parse_bool_flag(value: Option<&str>) -> bool {
    matches!(value, Some("true") | Some("1") | Some(""))
}

fn campaign_playlist_url(
    campaign_id: Uuid,
    include_labeled: bool,
    limit: u32,
    offset: u32,
) -> String {
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    if include_labeled {
        query.append_pair("include-labeled", "true");
    }
    query.append_pair("limit", &limit.to_string());
    query.append_pair("offset", &offset.to_string());
    format!(
        "/api/v1/campaigns/{campaign_id}/playlist?{}",
        query.finish()
    )
}

/// Merge the stored item meta with the campaign-derived keys the review
/// player consumes: `eventId` (the candidate key), `reviewStatus` (the
/// current viewer's label, if any), and `reviewEndpoint` (where the player
/// posts decisions — checked before falling back to the event-review route).
fn campaign_item_meta(
    stored_meta: Value,
    candidate_key: &str,
    review_status: Option<String>,
    review_endpoint: String,
) -> Value {
    let mut meta = match stored_meta {
        Value::Object(map) => map,
        _ => Map::new(),
    };
    meta.insert("eventId".to_owned(), json!(candidate_key));
    meta.insert(
        "reviewStatus".to_owned(),
        review_status.map(Value::String).unwrap_or(Value::Null),
    );
    meta.insert("reviewEndpoint".to_owned(), json!(review_endpoint));
    Value::Object(meta)
}

pub async fn campaign_playlist(
    OptionalAuthUser(viewer): OptionalAuthUser,
    State(state): State<AppState>,
    Path(campaign_id): Path<Uuid>,
    Query(query): Query<CampaignPlaylistQuery>,
) -> Result<Json<CampaignReviewPlaylist>, ApiError> {
    let db = require_db(&state)?;
    let viewer_id = viewer.map(|user| user.id);
    let campaign = fetch_campaign_row(db, campaign_id, viewer_id).await?;
    let campaign_summary = campaign_summary_from_row(&campaign).map_err(ApiError::internal)?;

    let include_labeled = parse_bool_flag(query.include_labeled.as_deref());
    let limit = query
        .limit
        .unwrap_or(DEFAULT_PLAYLIST_PAGE_SIZE)
        .clamp(1, MAX_PLAYLIST_PAGE_SIZE);
    let offset = query.offset.unwrap_or(0);

    // Items the current viewer already labeled are excluded by default so
    // "Continue review" resumes where they left off; ?include-labeled=true
    // shows the full curated set (with reviewStatus populated).
    let exclude_labeled = !include_labeled && viewer_id.is_some();
    let sql = format!(
        r#"
        SELECT
            i.id, i.candidate_key, i.replay_id, i.label,
            i.start_time, i.end_time, i.perspective, i.item_meta,
            r.file_sha256,
            NULLIF(r.original_file_name, '') AS replay_label,
            my.status AS my_status
        FROM review_campaign_items i
        JOIN replays r ON r.id = i.replay_id
        LEFT JOIN review_campaign_labels my
          ON my.item_id = i.id AND my.reviewer_user_id = $2
        WHERE i.campaign_id = $1{}
        ORDER BY i.position, i.id
        LIMIT $3 OFFSET $4
        "#,
        if exclude_labeled {
            " AND my.id IS NULL"
        } else {
            ""
        }
    );
    let rows = sqlx::query(&sql)
        .bind(campaign_id)
        .bind(viewer_id)
        .bind(i64::from(limit))
        .bind(i64::from(offset))
        .fetch_all(db)
        .await
        .map_err(ApiError::internal)?;

    let mut replays = Vec::<PlaylistReplay>::new();
    let mut items = Vec::with_capacity(rows.len());
    for row in rows {
        let item_id: Uuid = row.try_get("id").map_err(ApiError::internal)?;
        let candidate_key: String = row.try_get("candidate_key").map_err(ApiError::internal)?;
        let replay_id: Uuid = row.try_get("replay_id").map_err(ApiError::internal)?;
        let file_sha256: String = row.try_get("file_sha256").map_err(ApiError::internal)?;
        let replay_label: Option<String> =
            row.try_get("replay_label").map_err(ApiError::internal)?;
        let start_time: f64 = row.try_get("start_time").map_err(ApiError::internal)?;
        let end_time: f64 = row.try_get("end_time").map_err(ApiError::internal)?;
        let label: Option<String> = row.try_get("label").map_err(ApiError::internal)?;
        let perspective: Option<Value> = row.try_get("perspective").map_err(ApiError::internal)?;
        let item_meta: Value = row.try_get("item_meta").map_err(ApiError::internal)?;
        let my_status: Option<String> = row.try_get("my_status").map_err(ApiError::internal)?;

        if !replays
            .iter()
            .any(|replay| replay.id == replay_id.to_string())
        {
            replays.push(PlaylistReplay {
                id: replay_id.to_string(),
                path: format!("/api/v1/replays/{replay_id}/file"),
                label: replay_label.unwrap_or_else(|| file_sha256.clone()),
                meta: json!({
                    "rocketSenseReplayId": replay_id,
                    "fileSha256": file_sha256,
                }),
            });
        }

        items.push(CampaignPlaylistItem {
            id: candidate_key.clone(),
            replay: replay_id.to_string(),
            start: PlaylistBound {
                kind: "time",
                value: start_time,
            },
            end: PlaylistBound {
                kind: "time",
                value: end_time,
            },
            label: label.unwrap_or_else(|| candidate_key.clone()),
            perspective,
            meta: campaign_item_meta(
                item_meta,
                &candidate_key,
                my_status,
                format!("/api/v1/campaigns/{campaign_id}/items/{item_id}/labels"),
            ),
        });
    }

    let count = items.len() as u32;
    let next = (count == limit).then(|| {
        campaign_playlist_url(
            campaign_id,
            include_labeled,
            limit,
            offset.saturating_add(count),
        )
    });
    let previous = (offset > 0).then(|| {
        campaign_playlist_url(
            campaign_id,
            include_labeled,
            limit,
            offset.saturating_sub(limit),
        )
    });

    Ok(Json(CampaignReviewPlaylist {
        version: 1,
        kind: "playlist",
        label: campaign_summary.title.clone(),
        playback: PlaylistPlayback {
            advance_mode: "manual",
            end_mode: "stop",
            time_base: "rawReplay",
        },
        page: PlaylistPage {
            next,
            previous,
            count,
            limit,
            offset,
        },
        replays,
        items,
        meta: json!({
            "campaignId": campaign_summary.id,
            "campaignSlug": campaign_summary.slug,
            "question": campaign_summary.question,
            "decisionVocabulary": campaign
                .try_get::<Value, _>("decision_vocabulary")
                .map_err(ApiError::internal)?,
        }),
    }))
}

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

#[derive(Debug, Deserialize)]
pub struct CreateCampaignLabelRequest {
    pub status: String,
    pub notes: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct CampaignLabelResponse {
    pub id: Uuid,
    pub campaign_id: Uuid,
    pub item_id: Uuid,
    pub candidate_key: String,
    pub reviewer_user_id: Uuid,
    pub status: String,
    pub notes: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

pub async fn create_campaign_label(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path((campaign_id, item_id)): Path<(Uuid, Uuid)>,
    Json(request): Json<CreateCampaignLabelRequest>,
) -> Result<Json<CampaignLabelResponse>, ApiError> {
    let db = require_db(&state)?;

    let item = sqlx::query(
        r#"
        SELECT i.candidate_key, c.decision_vocabulary
        FROM review_campaign_items i
        JOIN review_campaigns c ON c.id = i.campaign_id
        WHERE i.id = $1 AND i.campaign_id = $2
        "#,
    )
    .bind(item_id)
    .bind(campaign_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "campaign item not found"))?;
    let candidate_key: String = item.try_get("candidate_key").map_err(ApiError::internal)?;
    let decision_vocabulary: Value = item
        .try_get("decision_vocabulary")
        .map_err(ApiError::internal)?;

    let status = validate_label_status(&decision_vocabulary, &request.status)
        .map_err(ApiError::bad_request)?;
    let notes = request
        .notes
        .map(|notes| notes.trim().to_owned())
        .filter(|notes| !notes.is_empty());

    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let row = sqlx::query(
        r#"
        INSERT INTO review_campaign_labels (
            id, campaign_id, item_id, reviewer_user_id, status, notes
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (item_id, reviewer_user_id) DO UPDATE
        SET status = EXCLUDED.status,
            notes = EXCLUDED.notes,
            updated_at = now()
        RETURNING id, reviewer_user_id, status, notes, created_at, updated_at
        "#,
    )
    .bind(Uuid::now_v7())
    .bind(campaign_id)
    .bind(item_id)
    .bind(auth_user.id)
    .bind(&status)
    .bind(&notes)
    .fetch_one(db)
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(CampaignLabelResponse {
        id: row.try_get("id").map_err(ApiError::internal)?,
        campaign_id,
        item_id,
        candidate_key,
        reviewer_user_id: row
            .try_get("reviewer_user_id")
            .map_err(ApiError::internal)?,
        status: row.try_get("status").map_err(ApiError::internal)?,
        notes: row.try_get("notes").map_err(ApiError::internal)?,
        created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        updated_at: row.try_get("updated_at").map_err(ApiError::internal)?,
    }))
}

// ---------------------------------------------------------------------------
// JSONL export
// ---------------------------------------------------------------------------

pub async fn export_campaign_labels(
    OptionalAuthUser(_viewer): OptionalAuthUser,
    State(state): State<AppState>,
    Path(campaign_id): Path<Uuid>,
) -> Result<Response, ApiError> {
    let db = require_db(&state)?;
    // 404 for unknown campaigns rather than an empty export.
    fetch_campaign_row(db, campaign_id, None).await?;

    let rows = sqlx::query(
        r#"
        SELECT
            c.slug,
            i.candidate_key, i.item_meta,
            r.file_sha256,
            l.status, l.notes, l.reviewer_user_id, l.created_at, l.updated_at
        FROM review_campaign_labels l
        JOIN review_campaign_items i ON i.id = l.item_id
        JOIN review_campaigns c ON c.id = l.campaign_id
        JOIN replays r ON r.id = i.replay_id
        WHERE l.campaign_id = $1
        ORDER BY i.position, i.id, l.created_at
        "#,
    )
    .bind(campaign_id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let mut body = String::new();
    for row in rows {
        let item_meta: Value = row.try_get("item_meta").map_err(ApiError::internal)?;
        let line = json!({
            "campaign": row.try_get::<String, _>("slug").map_err(ApiError::internal)?,
            "candidate": row
                .try_get::<String, _>("candidate_key")
                .map_err(ApiError::internal)?,
            "status": row.try_get::<String, _>("status").map_err(ApiError::internal)?,
            "notes": row
                .try_get::<Option<String>, _>("notes")
                .map_err(ApiError::internal)?,
            "reviewer": row
                .try_get::<Uuid, _>("reviewer_user_id")
                .map_err(ApiError::internal)?,
            "at": row
                .try_get::<DateTime<Utc>, _>("created_at")
                .map_err(ApiError::internal)?,
            "updated_at": row
                .try_get::<DateTime<Utc>, _>("updated_at")
                .map_err(ApiError::internal)?,
            "replay_sha256": row
                .try_get::<String, _>("file_sha256")
                .map_err(ApiError::internal)?,
            "provenance": item_meta.get("provenance").cloned().unwrap_or(Value::Null),
            "frame": item_meta
                .get("target")
                .and_then(|target| target.get("eventFrame"))
                .cloned()
                .unwrap_or(Value::Null),
            "event_type": item_meta.get("eventType").cloned().unwrap_or(Value::Null),
            "payload": item_meta.get("payload").cloned().unwrap_or(Value::Null),
        });
        body.push_str(&line.to_string());
        body.push('\n');
    }

    Ok((
        StatusCode::OK,
        [(header::CONTENT_TYPE, "application/x-ndjson")],
        body,
    )
        .into_response())
}

// ---------------------------------------------------------------------------
// Shared plumbing
// ---------------------------------------------------------------------------

fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
    state.db.as_ref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "postgres connection is required for review campaigns",
        )
    })
}

#[derive(Debug)]
pub struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    fn new(status: StatusCode, message: impl Into<String>) -> Self {
        Self {
            status,
            message: message.into(),
        }
    }

    fn bad_request(error: impl std::fmt::Display) -> Self {
        Self::new(StatusCode::BAD_REQUEST, error.to_string())
    }

    fn internal(error: impl std::fmt::Display) -> Self {
        tracing::error!(error = %error, "review campaign request failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
    }
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        (
            self.status,
            Json(ErrorResponse {
                error: self.message,
            }),
        )
            .into_response()
    }
}
