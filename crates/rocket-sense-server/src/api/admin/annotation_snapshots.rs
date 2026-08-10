use std::collections::{BTreeMap, BTreeSet};

use axum::{
    body::Bytes,
    extract::{Path, State},
    http::{
        header::{CACHE_CONTROL, CONTENT_DISPOSITION, CONTENT_TYPE, ETAG},
        HeaderName, HeaderValue, StatusCode,
    },
    response::{IntoResponse, Response},
    routing::get,
    Json, Router,
};
use chrono::{DateTime, Utc};
use rocket_sense_storage::{sha256_hex, StorageEncoding};
use serde::Serialize;
use serde_json::{json, Value};
use sqlx::{postgres::PgRow, PgPool, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::{app::AppState, auth::AuthUser};

use super::{require_admin, require_db, ApiError};

#[cfg(test)]
#[path = "annotation_snapshots_tests.rs"]
mod tests;

const SNAPSHOT_SCHEMA_VERSION: &str = "rocket-sense.annotations/v1";
const ANNOTATION_SCHEMA_VERSION: &str = "rocket-sense.annotation/v1";
const SNAPSHOT_CONTENT_TYPE: &str = "application/x-ndjson";
const CONTENT_SHA256_HEADER: HeaderName = HeaderName::from_static("x-content-sha256");

pub fn router() -> Router<AppState> {
    Router::new()
        .route(
            "/admin/annotation-snapshots",
            get(list_snapshots).post(create_snapshot),
        )
        .route(
            "/admin/annotation-snapshots/{snapshot_id}/download",
            get(download_snapshot),
        )
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct AnnotationSnapshotResponse {
    pub id: Uuid,
    pub schema_version: String,
    pub cutoff_at: DateTime<Utc>,
    pub created_by_user_id: Option<Uuid>,
    pub annotation_count: u64,
    pub replay_count: u64,
    pub source_counts: BTreeMap<String, u64>,
    pub label_counts: BTreeMap<String, u64>,
    pub campaign_ids: Vec<Uuid>,
    pub content_type: String,
    pub byte_size: u64,
    pub sha256: String,
    pub storage_encoding: String,
    pub storage_byte_size: u64,
    pub storage_sha256: String,
    pub download_url: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AnnotationSnapshotListResponse {
    pub snapshots: Vec<AnnotationSnapshotResponse>,
}

#[derive(Debug)]
struct SnapshotRecord {
    id: Uuid,
    schema_version: String,
    cutoff_at: DateTime<Utc>,
    created_by_user_id: Option<Uuid>,
    annotation_count: i64,
    replay_count: i64,
    source_counts: Value,
    label_counts: Value,
    campaign_ids: Vec<Uuid>,
    object_key: String,
    content_type: String,
    byte_size: i64,
    sha256: String,
    storage_encoding: String,
    storage_byte_size: i64,
    storage_sha256: String,
    created_at: DateTime<Utc>,
}

impl SnapshotRecord {
    fn from_row(row: &PgRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            id: row.try_get("id")?,
            schema_version: row.try_get("schema_version")?,
            cutoff_at: row.try_get("cutoff_at")?,
            created_by_user_id: row.try_get("created_by_user_id")?,
            annotation_count: row.try_get("annotation_count")?,
            replay_count: row.try_get("replay_count")?,
            source_counts: row.try_get("source_counts")?,
            label_counts: row.try_get("label_counts")?,
            campaign_ids: row.try_get("campaign_ids")?,
            object_key: row.try_get("object_key")?,
            content_type: row.try_get("content_type")?,
            byte_size: row.try_get("byte_size")?,
            sha256: row.try_get("sha256")?,
            storage_encoding: row.try_get("storage_encoding")?,
            storage_byte_size: row.try_get("storage_byte_size")?,
            storage_sha256: row.try_get("storage_sha256")?,
            created_at: row.try_get("created_at")?,
        })
    }

    fn response(&self) -> Result<AnnotationSnapshotResponse, ApiError> {
        Ok(AnnotationSnapshotResponse {
            id: self.id,
            schema_version: self.schema_version.clone(),
            cutoff_at: self.cutoff_at,
            created_by_user_id: self.created_by_user_id,
            annotation_count: nonnegative_count(self.annotation_count)?,
            replay_count: nonnegative_count(self.replay_count)?,
            source_counts: count_map(&self.source_counts)?,
            label_counts: count_map(&self.label_counts)?,
            campaign_ids: self.campaign_ids.clone(),
            content_type: self.content_type.clone(),
            byte_size: nonnegative_count(self.byte_size)?,
            sha256: self.sha256.clone(),
            storage_encoding: self.storage_encoding.clone(),
            storage_byte_size: nonnegative_count(self.storage_byte_size)?,
            storage_sha256: self.storage_sha256.clone(),
            download_url: snapshot_download_url(self.id),
            created_at: self.created_at,
        })
    }
}

#[derive(Debug)]
struct EventReviewRow {
    id: Uuid,
    event_id: Option<Uuid>,
    replay_id: Uuid,
    replay_sha256: String,
    reviewer_user_id: Option<Uuid>,
    status: String,
    reviewed_event_type_key: Option<String>,
    reviewed_subject_kind: Option<String>,
    reviewed_subject_id: Option<String>,
    reviewed_start_frame: Option<i32>,
    reviewed_end_frame: Option<i32>,
    reviewed_event_frame: Option<i32>,
    confidence: Option<f64>,
    notes: Option<String>,
    supersedes_review_id: Option<Uuid>,
    source_review_id: Option<Uuid>,
    carry_forward_method: Option<String>,
    carry_forward_distance_frames: Option<i32>,
    event_snapshot: Value,
    created_at: DateTime<Utc>,
}

impl EventReviewRow {
    fn from_row(row: PgRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            id: row.try_get("id")?,
            event_id: row.try_get("event_id")?,
            replay_id: row.try_get("replay_id")?,
            replay_sha256: row.try_get("replay_sha256")?,
            reviewer_user_id: row.try_get("reviewer_user_id")?,
            status: row.try_get("status")?,
            reviewed_event_type_key: row.try_get("reviewed_event_type_key")?,
            reviewed_subject_kind: row.try_get("reviewed_subject_kind")?,
            reviewed_subject_id: row.try_get("reviewed_subject_id")?,
            reviewed_start_frame: row.try_get("reviewed_start_frame")?,
            reviewed_end_frame: row.try_get("reviewed_end_frame")?,
            reviewed_event_frame: row.try_get("reviewed_event_frame")?,
            confidence: row.try_get("confidence")?,
            notes: row.try_get("notes")?,
            supersedes_review_id: row.try_get("supersedes_review_id")?,
            source_review_id: row.try_get("source_review_id")?,
            carry_forward_method: row.try_get("carry_forward_method")?,
            carry_forward_distance_frames: row.try_get("carry_forward_distance_frames")?,
            event_snapshot: row.try_get("event_snapshot")?,
            created_at: row.try_get("created_at")?,
        })
    }
}

#[derive(Debug)]
struct CampaignLabelRow {
    id: Uuid,
    campaign_id: Uuid,
    campaign_slug: String,
    candidate_key: String,
    replay_id: Uuid,
    replay_sha256: String,
    item_label: Option<String>,
    start_time: f64,
    end_time: f64,
    perspective: Option<Value>,
    item_meta: Value,
    generator: Value,
    reviewer_user_id: Uuid,
    status: String,
    notes: Option<String>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

impl CampaignLabelRow {
    fn from_row(row: PgRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            id: row.try_get("id")?,
            campaign_id: row.try_get("campaign_id")?,
            campaign_slug: row.try_get("campaign_slug")?,
            candidate_key: row.try_get("candidate_key")?,
            replay_id: row.try_get("replay_id")?,
            replay_sha256: row.try_get("replay_sha256")?,
            item_label: row.try_get("item_label")?,
            start_time: row.try_get("start_time")?,
            end_time: row.try_get("end_time")?,
            perspective: row.try_get("perspective")?,
            item_meta: row.try_get("item_meta")?,
            generator: row.try_get("generator")?,
            reviewer_user_id: row.try_get("reviewer_user_id")?,
            status: row.try_get("status")?,
            notes: row.try_get("notes")?,
            created_at: row.try_get("created_at")?,
            updated_at: row.try_get("updated_at")?,
        })
    }
}

#[derive(Debug, Clone, Serialize)]
struct NeutralAnnotation {
    record_type: &'static str,
    schema_version: &'static str,
    id: String,
    source: AnnotationSource,
    replay: AnnotationReplay,
    event: AnnotationEvent,
    label: AnnotationLabel,
    reviewer_user_id: Option<Uuid>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    provenance: Value,
}

#[derive(Debug, Clone, Serialize)]
struct AnnotationSource {
    kind: &'static str,
    record_id: Uuid,
    #[serde(skip_serializing_if = "Option::is_none")]
    campaign_id: Option<Uuid>,
    #[serde(skip_serializing_if = "Option::is_none")]
    campaign_slug: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    candidate_key: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
struct AnnotationReplay {
    id: Uuid,
    sha256: String,
}

#[derive(Debug, Clone, Serialize)]
struct AnnotationEvent {
    #[serde(skip_serializing_if = "Option::is_none")]
    event_type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    source_stream: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    subject: Option<AnnotationSubject>,
    frames: AnnotationFrames,
    times: AnnotationTimes,
    #[serde(skip_serializing_if = "Option::is_none")]
    payload: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    attributes: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    perspective: Option<Value>,
}

#[derive(Debug, Clone, Serialize)]
struct AnnotationSubject {
    kind: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    name: Option<String>,
}

#[derive(Debug, Clone, Default, Serialize)]
struct AnnotationFrames {
    #[serde(skip_serializing_if = "Option::is_none")]
    start: Option<i32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    end: Option<i32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    event: Option<i32>,
}

#[derive(Debug, Clone, Default, Serialize)]
struct AnnotationTimes {
    #[serde(skip_serializing_if = "Option::is_none")]
    start: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    end: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    event: Option<f64>,
}

#[derive(Debug, Clone, Serialize)]
struct AnnotationLabel {
    status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    confidence: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    notes: Option<String>,
}

#[derive(Debug, Serialize)]
struct SnapshotDocumentManifest {
    record_type: &'static str,
    schema_version: &'static str,
    snapshot_id: Uuid,
    cutoff_at: DateTime<Utc>,
    created_at: DateTime<Utc>,
    created_by_user_id: Uuid,
    annotation_count: u64,
    replay_count: u64,
    source_counts: BTreeMap<String, u64>,
    label_counts: BTreeMap<String, u64>,
    campaign_ids: Vec<Uuid>,
}

#[derive(Debug)]
struct BuiltSnapshot {
    bytes: Bytes,
    annotation_count: u64,
    replay_count: u64,
    source_counts: BTreeMap<String, u64>,
    label_counts: BTreeMap<String, u64>,
    campaign_ids: Vec<Uuid>,
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/annotation-snapshots",
    tag = "admin",
    responses(
        (status = 201, description = "Immutable annotation snapshot created", body = AnnotationSnapshotResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(("bearer_auth" = []))
)]
pub async fn create_snapshot(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<(StatusCode, Json<AnnotationSnapshotResponse>), ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;

    let snapshot_id = Uuid::now_v7();
    let (cutoff_at, annotations) = load_annotations(pool).await?;
    let created_at = Utc::now();
    let built = build_snapshot_document(
        snapshot_id,
        cutoff_at,
        created_at,
        auth_user.id,
        annotations,
    )
    .map_err(ApiError::internal)?;

    let object_key = format!("annotation-snapshots/{snapshot_id}.jsonl");
    let content_type = SNAPSHOT_CONTENT_TYPE.parse().map_err(ApiError::internal)?;
    let stored = state
        .storage
        .put_with_encoding(
            &object_key,
            built.bytes,
            Some(content_type),
            StorageEncoding::Zstd,
        )
        .await
        .map_err(ApiError::internal)?;

    let insert_result = sqlx::query(snapshot_insert_sql())
        .bind(snapshot_id)
        .bind(SNAPSHOT_SCHEMA_VERSION)
        .bind(cutoff_at)
        .bind(auth_user.id)
        .bind(i64::try_from(built.annotation_count).map_err(ApiError::internal)?)
        .bind(i64::try_from(built.replay_count).map_err(ApiError::internal)?)
        .bind(json!(built.source_counts))
        .bind(json!(built.label_counts))
        .bind(&built.campaign_ids)
        .bind(&stored.key)
        .bind(SNAPSHOT_CONTENT_TYPE)
        .bind(i64::try_from(stored.byte_size).map_err(ApiError::internal)?)
        .bind(&stored.sha256)
        .bind(stored.storage_encoding.as_str())
        .bind(i64::try_from(stored.storage_byte_size).map_err(ApiError::internal)?)
        .bind(&stored.storage_sha256)
        .bind(created_at)
        .fetch_one(pool)
        .await;

    let row = match insert_result {
        Ok(row) => row,
        Err(error) => {
            if let Err(cleanup_error) = state.storage.delete(&stored.key).await {
                tracing::warn!(
                    object_key = %stored.key,
                    error = %cleanup_error,
                    "failed to clean up unregistered annotation snapshot object"
                );
            }
            return Err(ApiError::internal(error));
        }
    };
    let snapshot = SnapshotRecord::from_row(&row)
        .map_err(ApiError::internal)?
        .response()?;

    Ok((StatusCode::CREATED, Json(snapshot)))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/annotation-snapshots",
    tag = "admin",
    responses(
        (status = 200, description = "Available annotation snapshots", body = AnnotationSnapshotListResponse),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(("bearer_auth" = []))
)]
pub async fn list_snapshots(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<AnnotationSnapshotListResponse>, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;

    let rows = sqlx::query(&format!(
        "{} ORDER BY created_at DESC, id DESC",
        snapshot_select_sql()
    ))
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;
    let snapshots = rows
        .iter()
        .map(SnapshotRecord::from_row)
        .collect::<Result<Vec<_>, _>>()
        .map_err(ApiError::internal)?
        .iter()
        .map(SnapshotRecord::response)
        .collect::<Result<Vec<_>, _>>()?;

    Ok(Json(AnnotationSnapshotListResponse { snapshots }))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/annotation-snapshots/{snapshot_id}/download",
    tag = "admin",
    params(("snapshot_id" = Uuid, Path, description = "Snapshot id")),
    responses(
        (status = 200, description = "Versioned annotation stream", content_type = "application/x-ndjson"),
        (status = 401, description = "Authentication required"),
        (status = 403, description = "Admin access required"),
        (status = 404, description = "Snapshot not found"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(("bearer_auth" = []))
)]
pub async fn download_snapshot(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(snapshot_id): Path<Uuid>,
) -> Result<Response, ApiError> {
    let pool = require_db(&state)?;
    require_admin(&state, &auth_user).await?;
    let snapshot = fetch_snapshot(pool, snapshot_id).await?;
    let bytes = state
        .storage
        .get(&snapshot.object_key)
        .await
        .map_err(ApiError::internal)?;
    if sha256_hex(&bytes) != snapshot.sha256 {
        return Err(ApiError::internal(format!(
            "annotation snapshot {snapshot_id} failed content integrity validation"
        )));
    }

    let mut response = bytes.into_response();
    let headers = response.headers_mut();
    headers.insert(
        CONTENT_TYPE,
        HeaderValue::from_static(SNAPSHOT_CONTENT_TYPE),
    );
    headers.insert(
        CONTENT_DISPOSITION,
        HeaderValue::from_str(&format!(
            "attachment; filename=\"annotations-{snapshot_id}.jsonl\""
        ))
        .map_err(ApiError::internal)?,
    );
    headers.insert(
        ETAG,
        HeaderValue::from_str(&format!("\"{}\"", snapshot.sha256)).map_err(ApiError::internal)?,
    );
    headers.insert(
        CACHE_CONTROL,
        HeaderValue::from_static("private, immutable"),
    );
    headers.insert(
        CONTENT_SHA256_HEADER,
        HeaderValue::from_str(&snapshot.sha256).map_err(ApiError::internal)?,
    );
    Ok(response)
}

async fn load_annotations(
    pool: &PgPool,
) -> Result<(DateTime<Utc>, Vec<NeutralAnnotation>), ApiError> {
    let mut tx = pool.begin().await.map_err(ApiError::internal)?;
    sqlx::query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ, READ ONLY")
        .execute(&mut *tx)
        .await
        .map_err(ApiError::internal)?;
    let cutoff_at = sqlx::query_scalar::<_, DateTime<Utc>>("SELECT transaction_timestamp()")
        .fetch_one(&mut *tx)
        .await
        .map_err(ApiError::internal)?;

    let event_rows = sqlx::query(
        r#"
        SELECT
            review.id,
            review.event_id,
            review.replay_id,
            replay.file_sha256 AS replay_sha256,
            review.reviewer_user_id,
            review.status,
            review.reviewed_event_type_key,
            review.reviewed_subject_kind,
            review.reviewed_subject_id,
            review.reviewed_start_frame,
            review.reviewed_end_frame,
            review.reviewed_event_frame,
            review.confidence,
            review.notes,
            review.supersedes_review_id,
            review.source_review_id,
            review.carry_forward_method,
            review.carry_forward_distance_frames,
            review.event_snapshot,
            review.created_at
        FROM event_reviews review
        JOIN replays replay ON replay.id = review.replay_id
        WHERE review.created_at <= $1
        ORDER BY review.id
        "#,
    )
    .bind(cutoff_at)
    .fetch_all(&mut *tx)
    .await
    .map_err(ApiError::internal)?;

    let campaign_rows = sqlx::query(
        r#"
        SELECT
            label.id,
            label.campaign_id,
            campaign.slug AS campaign_slug,
            item.candidate_key,
            item.replay_id,
            replay.file_sha256 AS replay_sha256,
            item.label AS item_label,
            item.start_time,
            item.end_time,
            item.perspective,
            item.item_meta,
            campaign.generator,
            label.reviewer_user_id,
            label.status,
            label.notes,
            label.created_at,
            label.updated_at
        FROM review_campaign_labels label
        JOIN review_campaign_items item ON item.id = label.item_id
        JOIN review_campaigns campaign ON campaign.id = label.campaign_id
        JOIN replays replay ON replay.id = item.replay_id
        WHERE label.updated_at <= $1
        ORDER BY label.id
        "#,
    )
    .bind(cutoff_at)
    .fetch_all(&mut *tx)
    .await
    .map_err(ApiError::internal)?;

    tx.commit().await.map_err(ApiError::internal)?;

    let mut annotations = Vec::with_capacity(event_rows.len() + campaign_rows.len());
    for row in event_rows {
        annotations.push(event_review_annotation(
            EventReviewRow::from_row(row).map_err(ApiError::internal)?,
        ));
    }
    for row in campaign_rows {
        annotations.push(campaign_label_annotation(
            CampaignLabelRow::from_row(row).map_err(ApiError::internal)?,
        ));
    }
    Ok((cutoff_at, annotations))
}

fn event_review_annotation(row: EventReviewRow) -> NeutralAnnotation {
    let event_type = row.reviewed_event_type_key.clone().or_else(|| {
        json_string(
            row.event_snapshot
                .pointer("/eventType/key")
                .unwrap_or(&Value::Null),
        )
    });
    let source_stream = row.event_snapshot.get("sourceStream").and_then(json_string);
    let subject_kind = row.reviewed_subject_kind.clone().or_else(|| {
        json_string(
            row.event_snapshot
                .pointer("/primarySubject/kind")
                .unwrap_or(&Value::Null),
        )
    });
    let subject_id = row.reviewed_subject_id.clone().or_else(|| {
        json_string(
            row.event_snapshot
                .pointer("/primarySubject/id")
                .unwrap_or(&Value::Null),
        )
    });
    let subject = subject_kind.map(|kind| AnnotationSubject {
        kind,
        id: subject_id,
        name: None,
    });

    let provenance = json!({
        "event_snapshot": row.event_snapshot.clone(),
        "event_id": row.event_id,
        "analysis_run_id": row.event_snapshot.get("analysisRunId").cloned(),
        "source": row.event_snapshot.get("source").cloned(),
        "source_stream": row.event_snapshot.get("sourceStream").cloned(),
        "source_event_id": row.event_snapshot.get("sourceEventId").cloned(),
        "authored": row.event_snapshot.get("authored").cloned(),
        "supersedes_review_id": row.supersedes_review_id,
        "source_review_id": row.source_review_id,
        "carry_forward_method": row.carry_forward_method,
        "carry_forward_distance_frames": row.carry_forward_distance_frames,
    });
    let payload = non_null_clone(row.event_snapshot.get("payload"));
    let attributes = non_null_clone(row.event_snapshot.get("attributes"));

    NeutralAnnotation {
        record_type: "annotation",
        schema_version: ANNOTATION_SCHEMA_VERSION,
        id: format!("event_review:{}", row.id),
        source: AnnotationSource {
            kind: "event_review",
            record_id: row.id,
            campaign_id: None,
            campaign_slug: None,
            candidate_key: None,
        },
        replay: AnnotationReplay {
            id: row.replay_id,
            sha256: row.replay_sha256,
        },
        event: AnnotationEvent {
            event_type,
            source_stream,
            subject,
            frames: AnnotationFrames {
                start: row.reviewed_start_frame.or_else(|| {
                    json_i32(
                        row.event_snapshot
                            .pointer("/frames/start")
                            .unwrap_or(&Value::Null),
                    )
                }),
                end: row.reviewed_end_frame.or_else(|| {
                    json_i32(
                        row.event_snapshot
                            .pointer("/frames/end")
                            .unwrap_or(&Value::Null),
                    )
                }),
                event: row.reviewed_event_frame.or_else(|| {
                    json_i32(
                        row.event_snapshot
                            .pointer("/frames/event")
                            .unwrap_or(&Value::Null),
                    )
                }),
            },
            times: AnnotationTimes {
                start: json_f64(
                    row.event_snapshot
                        .pointer("/times/start")
                        .unwrap_or(&Value::Null),
                ),
                end: json_f64(
                    row.event_snapshot
                        .pointer("/times/end")
                        .unwrap_or(&Value::Null),
                ),
                event: json_f64(
                    row.event_snapshot
                        .pointer("/times/event")
                        .unwrap_or(&Value::Null),
                ),
            },
            payload,
            attributes,
            perspective: None,
        },
        label: AnnotationLabel {
            status: row.status,
            confidence: row.confidence,
            notes: row.notes,
        },
        reviewer_user_id: row.reviewer_user_id,
        created_at: row.created_at,
        updated_at: row.created_at,
        provenance,
    }
}

fn campaign_label_annotation(row: CampaignLabelRow) -> NeutralAnnotation {
    let event_type = row
        .item_meta
        .get("eventType")
        .and_then(event_type_key)
        .or_else(|| {
            row.generator
                .pointer("/source/meta/eventType")
                .and_then(event_type_key)
        })
        .map(str::to_owned);
    let source_stream = row
        .item_meta
        .get("sourceStream")
        .and_then(Value::as_str)
        .or_else(|| {
            row.generator
                .pointer("/source/meta/sourceStream")
                .and_then(Value::as_str)
        })
        .map(str::to_owned);
    let subject = row.perspective.as_ref().and_then(|perspective| {
        perspective
            .get("kind")
            .and_then(Value::as_str)
            .map(|kind| AnnotationSubject {
                kind: kind.to_owned(),
                id: perspective
                    .get("playerId")
                    .and_then(Value::as_str)
                    .map(str::to_owned),
                name: perspective
                    .get("playerName")
                    .and_then(Value::as_str)
                    .map(str::to_owned),
            })
    });
    let event_frame = row
        .item_meta
        .pointer("/target/eventFrame")
        .and_then(json_i32)
        .or_else(|| row.item_meta.pointer("/payload/frame").and_then(json_i32));
    let event_time = row
        .item_meta
        .pointer("/target/eventTime")
        .and_then(json_f64);
    let payload = non_null_clone(row.item_meta.get("payload"));
    let provenance = json!({
        "generator": row.generator,
        "item_meta": row.item_meta.clone(),
        "candidate_key": row.candidate_key,
        "item_label": row.item_label,
        "item_provenance": row.item_meta.get("provenance").cloned(),
    });

    NeutralAnnotation {
        record_type: "annotation",
        schema_version: ANNOTATION_SCHEMA_VERSION,
        id: format!("campaign_label:{}", row.id),
        source: AnnotationSource {
            kind: "campaign",
            record_id: row.id,
            campaign_id: Some(row.campaign_id),
            campaign_slug: Some(row.campaign_slug),
            candidate_key: Some(row.candidate_key),
        },
        replay: AnnotationReplay {
            id: row.replay_id,
            sha256: row.replay_sha256,
        },
        event: AnnotationEvent {
            event_type,
            source_stream,
            subject,
            frames: AnnotationFrames {
                event: event_frame,
                ..AnnotationFrames::default()
            },
            times: AnnotationTimes {
                start: Some(row.start_time),
                end: Some(row.end_time),
                event: event_time,
            },
            payload,
            attributes: None,
            perspective: row.perspective,
        },
        label: AnnotationLabel {
            status: row.status,
            confidence: None,
            notes: row.notes,
        },
        reviewer_user_id: Some(row.reviewer_user_id),
        created_at: row.created_at,
        updated_at: row.updated_at,
        provenance,
    }
}

fn build_snapshot_document(
    snapshot_id: Uuid,
    cutoff_at: DateTime<Utc>,
    created_at: DateTime<Utc>,
    created_by_user_id: Uuid,
    mut annotations: Vec<NeutralAnnotation>,
) -> Result<BuiltSnapshot, serde_json::Error> {
    annotations.sort_by(|left, right| left.id.cmp(&right.id));

    let mut replay_ids = BTreeSet::new();
    let mut source_counts = BTreeMap::new();
    let mut label_counts = BTreeMap::new();
    let mut campaign_ids = BTreeSet::new();
    for annotation in &annotations {
        replay_ids.insert(annotation.replay.sha256.clone());
        *source_counts
            .entry(annotation.source.kind.to_owned())
            .or_insert(0) += 1;
        *label_counts
            .entry(annotation.label.status.clone())
            .or_insert(0) += 1;
        if let Some(campaign_id) = annotation.source.campaign_id {
            campaign_ids.insert(campaign_id);
        }
    }

    let annotation_count = annotations.len() as u64;
    let replay_count = replay_ids.len() as u64;
    let campaign_ids = campaign_ids.into_iter().collect::<Vec<_>>();
    let manifest = SnapshotDocumentManifest {
        record_type: "manifest",
        schema_version: SNAPSHOT_SCHEMA_VERSION,
        snapshot_id,
        cutoff_at,
        created_at,
        created_by_user_id,
        annotation_count,
        replay_count,
        source_counts: source_counts.clone(),
        label_counts: label_counts.clone(),
        campaign_ids: campaign_ids.clone(),
    };

    let mut bytes = Vec::new();
    serde_json::to_writer(&mut bytes, &manifest)?;
    bytes.push(b'\n');
    for annotation in annotations {
        serde_json::to_writer(&mut bytes, &annotation)?;
        bytes.push(b'\n');
    }

    Ok(BuiltSnapshot {
        bytes: Bytes::from(bytes),
        annotation_count,
        replay_count,
        source_counts,
        label_counts,
        campaign_ids,
    })
}

async fn fetch_snapshot(pool: &PgPool, snapshot_id: Uuid) -> Result<SnapshotRecord, ApiError> {
    let row = sqlx::query(&format!("{} WHERE id = $1", snapshot_select_sql()))
        .bind(snapshot_id)
        .fetch_optional(pool)
        .await
        .map_err(ApiError::internal)?
        .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "annotation snapshot not found"))?;
    SnapshotRecord::from_row(&row).map_err(ApiError::internal)
}

fn snapshot_select_sql() -> &'static str {
    r#"
    SELECT
        id,
        schema_version,
        cutoff_at,
        created_by_user_id,
        annotation_count,
        replay_count,
        source_counts,
        label_counts,
        campaign_ids,
        object_key,
        content_type,
        byte_size,
        sha256,
        storage_encoding,
        storage_byte_size,
        storage_sha256,
        created_at
    FROM annotation_snapshots
    "#
}

fn snapshot_insert_sql() -> &'static str {
    r#"
    INSERT INTO annotation_snapshots (
        id,
        schema_version,
        cutoff_at,
        created_by_user_id,
        annotation_count,
        replay_count,
        source_counts,
        label_counts,
        campaign_ids,
        object_key,
        content_type,
        byte_size,
        sha256,
        storage_encoding,
        storage_byte_size,
        storage_sha256,
        created_at
    )
    VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17
    )
    RETURNING
        id,
        schema_version,
        cutoff_at,
        created_by_user_id,
        annotation_count,
        replay_count,
        source_counts,
        label_counts,
        campaign_ids,
        object_key,
        content_type,
        byte_size,
        sha256,
        storage_encoding,
        storage_byte_size,
        storage_sha256,
        created_at
    "#
}

fn snapshot_download_url(snapshot_id: Uuid) -> String {
    format!("/api/v1/admin/annotation-snapshots/{snapshot_id}/download")
}

fn nonnegative_count(value: i64) -> Result<u64, ApiError> {
    u64::try_from(value).map_err(ApiError::internal)
}

fn count_map(value: &Value) -> Result<BTreeMap<String, u64>, ApiError> {
    serde_json::from_value(value.clone()).map_err(ApiError::internal)
}

fn non_null_clone(value: Option<&Value>) -> Option<Value> {
    value.filter(|value| !value.is_null()).cloned()
}

fn json_string(value: &Value) -> Option<String> {
    value.as_str().map(str::to_owned)
}

fn event_type_key(value: &Value) -> Option<&str> {
    value
        .as_str()
        .or_else(|| value.get("key").and_then(Value::as_str))
}

fn json_i32(value: &Value) -> Option<i32> {
    value.as_i64().and_then(|value| i32::try_from(value).ok())
}

fn json_f64(value: &Value) -> Option<f64> {
    value.as_f64()
}
