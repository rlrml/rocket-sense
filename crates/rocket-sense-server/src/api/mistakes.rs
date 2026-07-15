//! Review persistence for eagerly processed mistake detection.
//!
//! The canonical replay-processing run detects mistakes for every player and
//! materializes each surviving reranked marker as a `play_events` row. Reviews
//! attach to those existing rows and remain append-only, exactly as
//! `docs/mechanic-events-review-design.md` prescribes.
//!
//! Stable identity: `source_event_id` is a SHA-256 fingerprint over the
//! replay file hash, the `mistakes` source, the kind, the focus-player
//! identity, and the rounded time span — so the same mistake reproduces the
//! same identity on every client, and reviews can carry forward across
//! detector-version bumps that keep the same span.

use super::mechanics::upsert_user;
use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
    Json, Router,
};
use chrono::{DateTime, Utc};
use rocket_sense_storage::sha256_hex;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::{PgPool, Row};
use uuid::Uuid;

#[cfg(test)]
#[path = "mistakes_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route(
        "/replays/{replay_id}/mistakes/reviews",
        post(create_mistake_review).get(list_my_mistake_reviews),
    )
}

/// The 15 detector kinds (mirrors `rocket-sense-mistakes::kinds::KINDS`).
pub(crate) const MISTAKE_KINDS: [&str; 15] = [
    "too_far_from_play",
    "stacked_too_close",
    "bumping_teammate",
    "overcommitting_last_man",
    "bang_with_time",
    "hesitating_on_50",
    "waiting_to_challenge",
    "double_committing",
    "creeping_up_too_far",
    "poor_landing",
    "pick_up_small_pads",
    "bad_kickoff",
    "bad_fifty",
    "floating_with_boost",
    "bad_defensive_touch",
];

pub(crate) fn mistake_display_name(kind: &str) -> &'static str {
    match kind {
        "too_far_from_play" => "Too far from play",
        "stacked_too_close" => "Stacked too close",
        "bumping_teammate" => "Bumping teammate",
        "overcommitting_last_man" => "Overcommitting as last man",
        "bang_with_time" => "Banging the ball with time",
        "hesitating_on_50" => "Hesitating on a 50/50",
        "waiting_to_challenge" => "Waiting to challenge",
        "double_committing" => "Double committing",
        "creeping_up_too_far" => "Creeping up too far",
        "poor_landing" => "Poor landing",
        "pick_up_small_pads" => "Skipping small pads",
        "bad_kickoff" => "Bad kickoff",
        "bad_fifty" => "Bad fifty",
        "floating_with_boost" => "Floating with boost",
        "bad_defensive_touch" => "Bad defensive touch",
        _ => "Mistake",
    }
}

const MISTAKES_SOURCE: &str = "mistakes";

/// Deterministic `source_event_id` for one detected mistake. Times are the
/// detector's rounded (2dp) values; scaling to centiseconds keeps the key
/// integer-exact across clients.
pub(crate) fn mistake_fingerprint(
    file_sha256: &str,
    kind: &str,
    player_key: &str,
    time: f64,
    t_start: f64,
    t_end: f64,
) -> String {
    let identity = format!(
        "{file_sha256}:{MISTAKES_SOURCE}:{kind}:{player_key}:{}:{}:{}",
        (time * 100.0).round() as i64,
        (t_start * 100.0).round() as i64,
        (t_end * 100.0).round() as i64
    );
    sha256_hex(identity.as_bytes())
}

#[derive(Debug, Deserialize)]
pub struct CreateMistakeReviewRequest {
    /// Detector kind (one of the 15 mistake kinds).
    pub kind: String,
    /// Focus-player identity (`platform:id`, the `primary_subject_id`
    /// convention used by other play events).
    pub player_key: String,
    /// Display name at detection time, kept in the payload for review UI.
    pub player_name: Option<String>,
    /// Marker times in the player clock (seconds; detector output).
    pub time: f64,
    pub t_start: f64,
    pub t_end: f64,
    /// Frame anchors resolved by the client from the parsed replay.
    pub event_frame: Option<i32>,
    pub start_frame: Option<i32>,
    pub end_frame: Option<i32>,
    /// Detector severity in [0, 1]; stored as the event confidence.
    pub severity: f64,
    #[serde(default)]
    pub features: Vec<f64>,
    pub features_version: Option<u32>,
    #[serde(default)]
    pub evidence: Option<Value>,
    pub detector_version: Option<String>,
    /// `confirmed`, `rejected`, `corrected`, `uncertain`, `needs_second_review`.
    pub status: String,
    pub notes: Option<String>,
    /// For `corrected`: the kind the reviewer says this actually is.
    pub corrected_kind: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct MistakeReviewResponse {
    pub review_id: Uuid,
    pub event_id: Uuid,
    pub replay_id: Uuid,
    pub source_event_id: String,
    pub status: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct MistakeReviewListItem {
    pub source_event_id: String,
    pub kind: String,
    pub status: String,
    pub review_id: Uuid,
    pub reviewed_event_type_key: Option<String>,
    pub notes: Option<String>,
    pub created_at: DateTime<Utc>,
    /// Marker anchors from the underlying event, so the client can match a
    /// freshly-detected marker to its review without recomputing fingerprints.
    pub player_key: Option<String>,
    pub time: Option<f64>,
    pub t_start: Option<f64>,
    pub t_end: Option<f64>,
}

#[derive(Debug, Serialize)]
pub struct MistakeReviewListResponse {
    pub reviews: Vec<MistakeReviewListItem>,
}

async fn require_viewable_replay(
    state: &AppState,
    db: &PgPool,
    replay_id: Uuid,
    viewer: &AuthUser,
) -> Result<(), ApiError> {
    if super::visibility::can_view_replay(state, db, replay_id, Some(viewer))
        .await
        .map_err(|error| ApiError::internal(error.message()))?
    {
        Ok(())
    } else {
        Err(ApiError::new(StatusCode::NOT_FOUND, "replay not found"))
    }
}

pub async fn create_mistake_review(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
    Json(request): Json<CreateMistakeReviewRequest>,
) -> Result<(StatusCode, Json<MistakeReviewResponse>), ApiError> {
    let db = require_db(&state)?;
    require_viewable_replay(&state, db, replay_id, &auth_user).await?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let kind = request.kind.trim().to_lowercase();
    if !MISTAKE_KINDS.contains(&kind.as_str()) {
        return Err(ApiError::bad_request(format!(
            "unknown mistake kind: {kind}"
        )));
    }
    let status = normalize_review_status(&request.status)?;
    let reviewed_event_type_key = match &request.corrected_kind {
        Some(corrected) => {
            let corrected = corrected.trim().to_lowercase();
            if !MISTAKE_KINDS.contains(&corrected.as_str()) {
                return Err(ApiError::bad_request(format!(
                    "unknown corrected kind: {corrected}"
                )));
            }
            corrected
        }
        None => kind.clone(),
    };
    let player_key = request.player_key.trim().to_lowercase();
    if player_key.is_empty() {
        return Err(ApiError::bad_request("player_key must not be empty"));
    }
    if !(request.t_start <= request.time && request.time <= request.t_end) {
        return Err(ApiError::bad_request(
            "marker time must lie within [t_start, t_end]",
        ));
    }
    if !(0.0..=1.0).contains(&request.severity) {
        return Err(ApiError::bad_request("severity must be within [0, 1]"));
    }

    let replay_row =
        sqlx::query("SELECT canonical_analysis_run_id, file_sha256 FROM replays WHERE id = $1")
            .bind(replay_id)
            .fetch_optional(db)
            .await
            .map_err(ApiError::internal)?
            .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;
    let analysis_run_id: Option<Uuid> = replay_row
        .try_get("canonical_analysis_run_id")
        .map_err(ApiError::internal)?;
    let file_sha256: String = replay_row
        .try_get("file_sha256")
        .map_err(ApiError::internal)?;
    let Some(analysis_run_id) = analysis_run_id else {
        return Err(ApiError::new(
            StatusCode::CONFLICT,
            "replay has no canonical analysis run yet — reviews attach once processing finishes",
        ));
    };

    let source_event_id = mistake_fingerprint(
        &file_sha256,
        &kind,
        &player_key,
        request.time,
        request.t_start,
        request.t_end,
    );

    // Processing eagerly materializes every mistake. Resolve the exact event
    // in the current canonical run instead of accepting client-authored rows.
    let event_id: Uuid = sqlx::query_scalar(
        r#"
        SELECT id FROM play_events
        WHERE replay_id = $1
          AND analysis_run_id = $2
          AND source = $3
          AND source_event_id = $4
        ORDER BY created_at
        LIMIT 1
        "#,
    )
    .bind(replay_id)
    .bind(analysis_run_id)
    .bind(MISTAKES_SOURCE)
    .bind(&source_event_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| {
        ApiError::new(
            StatusCode::CONFLICT,
            "mistake is not part of the canonical processing run — reprocess the replay",
        )
    })?;

    let payload = json!({
        "detector_version": request.detector_version,
        "features": request.features,
        "features_version": request.features_version,
        "evidence": request.evidence,
        "player_name": request.player_name,
        "severity": request.severity,
        "time": request.time,
        "t_start": request.t_start,
        "t_end": request.t_end,
    });

    // Append-only review with a denormalized snapshot (the durable record —
    // survives cleanup of regenerated analysis output).
    let snapshot = json!({
        "replayId": replay_id,
        "analysisRunId": analysis_run_id,
        "eventType": {
            "key": kind,
            "displayName": mistake_display_name(&kind),
            "category": "mistake",
        },
        "source": MISTAKES_SOURCE,
        "sourceEventId": source_event_id,
        "primarySubject": { "kind": "player", "id": player_key },
        "frames": {
            "start": request.start_frame,
            "end": request.end_frame,
            "event": request.event_frame,
        },
        "times": {
            "start": request.t_start,
            "end": request.t_end,
            "event": request.time,
        },
        "confidence": request.severity,
        "payload": payload,
        "detectorVersion": request.detector_version,
    });

    let row = sqlx::query(
        r#"
        INSERT INTO event_reviews (
            id, event_id, replay_id, reviewer_user_id, status,
            reviewed_event_type_key, reviewed_subject_kind, reviewed_subject_id,
            reviewed_start_frame, reviewed_end_frame, reviewed_event_frame,
            confidence, notes, event_snapshot
        )
        VALUES ($1, $2, $3, $4, $5, $6, 'player', $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, created_at
        "#,
    )
    .bind(Uuid::now_v7())
    .bind(event_id)
    .bind(replay_id)
    .bind(auth_user.id)
    .bind(&status)
    .bind(&reviewed_event_type_key)
    .bind(&player_key)
    .bind(request.start_frame)
    .bind(request.end_frame)
    .bind(request.event_frame)
    .bind(request.severity)
    .bind(request.notes.as_deref())
    .bind(&snapshot)
    .fetch_one(db)
    .await
    .map_err(ApiError::internal)?;

    Ok((
        StatusCode::CREATED,
        Json(MistakeReviewResponse {
            review_id: row.try_get("id").map_err(ApiError::internal)?,
            event_id,
            replay_id,
            source_event_id,
            status,
            created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        }),
    ))
}

/// The signed-in user's latest review per detected mistake on this replay.
/// The client uses this to hide rejected markers ("reject hides the marker
/// but keeps the label") and to badge confirmed ones.
pub async fn list_my_mistake_reviews(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(replay_id): Path<Uuid>,
) -> Result<Json<MistakeReviewListResponse>, ApiError> {
    let db = require_db(&state)?;
    require_viewable_replay(&state, db, replay_id, &auth_user).await?;

    let rows = sqlx::query(
        r#"
        SELECT DISTINCT ON (event.source_event_id)
            review.id AS review_id,
            review.status,
            review.reviewed_event_type_key,
            review.notes,
            review.created_at,
            event.source_event_id,
            event.primary_subject_id AS player_key,
            event.event_time AS marker_time,
            event.start_time AS marker_t_start,
            event.end_time AS marker_t_end,
            event_type.key AS kind
        FROM event_reviews review
        JOIN play_events event ON event.id = review.event_id
        JOIN event_types event_type ON event_type.id = event.event_type_id
        WHERE event.replay_id = $1
          AND event.source = $2
          AND review.reviewer_user_id = $3
        ORDER BY event.source_event_id, review.created_at DESC, review.id DESC
        "#,
    )
    .bind(replay_id)
    .bind(MISTAKES_SOURCE)
    .bind(auth_user.id)
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;

    let mut reviews = Vec::with_capacity(rows.len());
    for row in rows {
        reviews.push(MistakeReviewListItem {
            source_event_id: row.try_get("source_event_id").map_err(ApiError::internal)?,
            kind: row.try_get("kind").map_err(ApiError::internal)?,
            status: row.try_get("status").map_err(ApiError::internal)?,
            review_id: row.try_get("review_id").map_err(ApiError::internal)?,
            reviewed_event_type_key: row
                .try_get("reviewed_event_type_key")
                .map_err(ApiError::internal)?,
            notes: row.try_get("notes").map_err(ApiError::internal)?,
            created_at: row.try_get("created_at").map_err(ApiError::internal)?,
            player_key: row.try_get("player_key").map_err(ApiError::internal)?,
            time: row.try_get("marker_time").map_err(ApiError::internal)?,
            t_start: row.try_get("marker_t_start").map_err(ApiError::internal)?,
            t_end: row.try_get("marker_t_end").map_err(ApiError::internal)?,
        });
    }
    Ok(Json(MistakeReviewListResponse { reviews }))
}

/// Review statuses accepted for mistakes (the `event_reviews` status enum,
/// matching the mechanic-review normalization).
fn normalize_review_status(status: &str) -> Result<String, ApiError> {
    let status = status.trim().to_lowercase();
    let normalized = if status == "accepted" {
        "confirmed".to_owned()
    } else {
        status
    };
    match normalized.as_str() {
        "confirmed" | "rejected" | "corrected" | "uncertain" | "needs_second_review" => {
            Ok(normalized)
        }
        _ => Err(ApiError::bad_request(
            "review status must be one of confirmed, rejected, corrected, uncertain, needs_second_review",
        )),
    }
}

fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
    state.db.as_ref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "postgres connection is required for mistake reviews",
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
        tracing::error!(error = %error, "mistake review request failed");
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
