use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Path, RawQuery, State},
    http::StatusCode,
    response::{Html, IntoResponse, Redirect, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{de, Deserialize, Deserializer, Serialize};
use serde_json::Value;
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use uuid::Uuid;

#[cfg(test)]
#[path = "mechanics_tests.rs"]
mod tests;

const MECHANIC_REVIEW_PREROLL_SECONDS: f64 = 4.0;
const MECHANIC_REVIEW_POSTROLL_SECONDS: f64 = 3.0;

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/mechanics/review", get(mechanic_review_page))
        .route("/mechanics/review/open", get(open_mechanic_review))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/mechanics/events", get(list_mechanic_events))
        .route("/mechanics/review-playlist", get(mechanic_review_playlist))
        .route(
            "/mechanics/playlists",
            get(list_saved_mechanic_playlists).post(create_saved_mechanic_playlist),
        )
        .route(
            "/mechanics/playlists/{playlist_id}",
            get(get_saved_mechanic_playlist),
        )
        .route(
            "/mechanics/playlists/{playlist_id}/manifest",
            get(saved_mechanic_playlist_manifest),
        )
        .route(
            "/mechanics/events/{event_id}/reviews",
            post(create_mechanic_event_review),
        )
}

#[derive(Debug, Deserialize)]
pub struct MechanicEventsQuery {
    #[serde(
        default,
        rename = "event-id",
        deserialize_with = "deserialize_uuid_vec"
    )]
    pub event_ids: Vec<Uuid>,
    #[serde(default, deserialize_with = "deserialize_string_vec")]
    pub mechanic: Vec<String>,
    #[serde(default, deserialize_with = "deserialize_string_vec")]
    pub detector: Vec<String>,
    #[serde(rename = "review-status")]
    pub review_status: Option<String>,
    #[serde(
        default,
        rename = "min-confidence",
        deserialize_with = "deserialize_optional_f64"
    )]
    pub min_confidence: Option<f64>,
    #[serde(
        default,
        rename = "replay-id",
        deserialize_with = "deserialize_optional_uuid"
    )]
    pub replay_id: Option<Uuid>,
    #[serde(rename = "player-id")]
    pub player_id: Option<String>,
    pub count: Option<u32>,
    pub offset: Option<u32>,
}

impl MechanicEventsQuery {
    fn from_raw_query(query: Option<&str>) -> Result<Self, ApiError> {
        let mut parsed = Self {
            event_ids: Vec::new(),
            mechanic: Vec::new(),
            detector: Vec::new(),
            review_status: None,
            min_confidence: None,
            replay_id: None,
            player_id: None,
            count: None,
            offset: None,
        };

        for (key, value) in query
            .into_iter()
            .flat_map(|query| url::form_urlencoded::parse(query.as_bytes()))
        {
            let value = value.trim();
            match key.as_ref() {
                "event-id" if !value.is_empty() => {
                    parsed
                        .event_ids
                        .push(Uuid::parse_str(value).map_err(ApiError::bad_request)?);
                }
                "mechanic" if !value.is_empty() => parsed.mechanic.push(value.to_owned()),
                "detector" if !value.is_empty() => parsed.detector.push(value.to_owned()),
                "review-status" => parsed.review_status = non_empty_string(value),
                "min-confidence" => {
                    parsed.min_confidence = if value.is_empty() {
                        None
                    } else {
                        Some(value.parse::<f64>().map_err(ApiError::bad_request)?)
                    };
                }
                "replay-id" => {
                    parsed.replay_id = if value.is_empty() {
                        None
                    } else {
                        Some(Uuid::parse_str(value).map_err(ApiError::bad_request)?)
                    };
                }
                "player-id" => parsed.player_id = non_empty_string(value),
                "count" => {
                    parsed.count = if value.is_empty() {
                        None
                    } else {
                        Some(value.parse::<u32>().map_err(ApiError::bad_request)?)
                    };
                }
                "offset" => {
                    parsed.offset = if value.is_empty() {
                        None
                    } else {
                        Some(value.parse::<u32>().map_err(ApiError::bad_request)?)
                    };
                }
                _ => {}
            }
        }

        Ok(parsed)
    }
}

fn non_empty_string(value: &str) -> Option<String> {
    (!value.is_empty()).then(|| value.to_owned())
}

async fn mechanic_review_page() -> Html<&'static str> {
    Html(MECHANIC_REVIEW_PAGE)
}

async fn open_mechanic_review(RawQuery(raw_query): RawQuery) -> Result<Redirect, ApiError> {
    let query = MechanicEventsQuery::from_raw_query(raw_query.as_deref())?;
    let filters = MechanicEventFilters::from_query(query)?;
    Ok(Redirect::temporary(&mechanic_review_player_url(&filters)))
}

fn mechanic_review_player_url(filters: &MechanicEventFilters) -> String {
    let playlist_url = mechanic_review_playlist_url(filters);
    let mut target = String::from("/subtr-actor/?");
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    query.append_pair("reviewPlaylist", &playlist_url);
    target.push_str(&query.finish());
    target
}

fn deserialize_uuid_vec<'de, D>(deserializer: D) -> Result<Vec<Uuid>, D::Error>
where
    D: Deserializer<'de>,
{
    struct UuidVecVisitor;

    impl<'de> de::Visitor<'de> for UuidVecVisitor {
        type Value = Vec<Uuid>;

        fn expecting(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            formatter.write_str("a UUID or list of UUIDs")
        }

        fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Uuid::parse_str(value)
                .map(|value| vec![value])
                .map_err(E::custom)
        }

        fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            self.visit_str(&value)
        }

        fn visit_seq<A>(self, mut sequence: A) -> Result<Self::Value, A::Error>
        where
            A: de::SeqAccess<'de>,
        {
            let mut values = Vec::new();
            while let Some(value) = sequence.next_element::<String>()? {
                values.push(Uuid::parse_str(&value).map_err(de::Error::custom)?);
            }
            Ok(values)
        }
    }

    deserializer.deserialize_any(UuidVecVisitor)
}

fn deserialize_string_vec<'de, D>(deserializer: D) -> Result<Vec<String>, D::Error>
where
    D: Deserializer<'de>,
{
    struct StringVecVisitor;

    impl<'de> de::Visitor<'de> for StringVecVisitor {
        type Value = Vec<String>;

        fn expecting(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            formatter.write_str("a string or list of strings")
        }

        fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(vec![value.to_owned()])
        }

        fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(vec![value])
        }

        fn visit_seq<A>(self, mut sequence: A) -> Result<Self::Value, A::Error>
        where
            A: de::SeqAccess<'de>,
        {
            let mut values = Vec::new();
            while let Some(value) = sequence.next_element::<String>()? {
                values.push(value);
            }
            Ok(values)
        }
    }

    deserializer.deserialize_any(StringVecVisitor)
}

fn deserialize_optional_uuid<'de, D>(deserializer: D) -> Result<Option<Uuid>, D::Error>
where
    D: Deserializer<'de>,
{
    let value = Option::<String>::deserialize(deserializer)?;
    value
        .map(|value| value.trim().to_owned())
        .filter(|value| !value.is_empty())
        .map(|value| Uuid::parse_str(&value).map_err(de::Error::custom))
        .transpose()
}

fn deserialize_optional_f64<'de, D>(deserializer: D) -> Result<Option<f64>, D::Error>
where
    D: Deserializer<'de>,
{
    struct OptionalF64Visitor;

    impl<'de> de::Visitor<'de> for OptionalF64Visitor {
        type Value = Option<f64>;

        fn expecting(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            formatter.write_str("a number or empty string")
        }

        fn visit_none<E>(self) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(None)
        }

        fn visit_unit<E>(self) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(None)
        }

        fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            let value = value.trim();
            if value.is_empty() {
                Ok(None)
            } else {
                value.parse::<f64>().map(Some).map_err(E::custom)
            }
        }

        fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            self.visit_str(&value)
        }

        fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(Some(value))
        }

        fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(Some(value as f64))
        }

        fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
        where
            E: de::Error,
        {
            Ok(Some(value as f64))
        }
    }

    deserializer.deserialize_any(OptionalF64Visitor)
}

#[derive(Debug, Serialize)]
pub struct MechanicEventsResponse {
    pub events: Vec<MechanicEventResponse>,
    pub count: u32,
    pub offset: u32,
    pub next_offset: Option<u32>,
}

#[derive(Debug, Serialize)]
pub struct MechanicEventResponse {
    pub id: Uuid,
    pub replay_id: Uuid,
    pub analysis_run_id: Uuid,
    pub mechanic: String,
    pub detector: String,
    pub player_id: Option<String>,
    pub team: Option<i32>,
    pub start_frame: Option<i32>,
    pub end_frame: Option<i32>,
    pub event_frame: Option<i32>,
    pub start_time: Option<f64>,
    pub end_time: Option<f64>,
    pub event_time: Option<f64>,
    pub confidence: Option<f64>,
    pub reason: Option<String>,
    pub payload: Value,
    pub review_status: Option<String>,
    pub latest_review_id: Option<Uuid>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct MechanicReviewPlaylist {
    pub version: u32,
    pub kind: &'static str,
    pub label: String,
    pub playback: PlaylistPlayback,
    pub page: PlaylistPage,
    pub replays: Vec<PlaylistReplay>,
    pub items: Vec<PlaylistItem>,
    pub meta: PlaylistMeta,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistPage {
    pub count: u32,
    pub limit: u32,
    pub offset: u32,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistPlayback {
    pub advance_mode: &'static str,
    pub end_mode: &'static str,
}

#[derive(Debug, Serialize)]
pub struct PlaylistReplay {
    pub id: String,
    pub path: String,
    pub label: String,
    pub meta: Value,
}

#[derive(Debug, Serialize)]
pub struct PlaylistItem {
    pub id: String,
    pub replay: String,
    pub start: PlaylistBound,
    pub end: PlaylistBound,
    pub label: String,
    pub meta: PlaylistItemMeta,
}

#[derive(Debug, Serialize)]
pub struct PlaylistBound {
    pub kind: &'static str,
    pub value: f64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistItemMeta {
    pub event_id: Uuid,
    pub mechanic: String,
    pub mechanic_label: String,
    pub detector: String,
    pub confidence: Option<f64>,
    pub reason: Option<String>,
    pub player_id: Option<String>,
    pub team: Option<String>,
    pub review_status: Option<String>,
    pub clip: PlaylistItemClip,
    pub target: PlaylistItemTarget,
    pub event: Value,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistItemClip {
    pub start_time: f64,
    pub end_time: f64,
    pub preroll_seconds: f64,
    pub postroll_seconds: f64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistItemTarget {
    pub kind: &'static str,
    pub player_id: Option<String>,
    pub start_time: Option<f64>,
    pub end_time: Option<f64>,
    pub event_time: Option<f64>,
    pub start_frame: Option<i32>,
    pub end_frame: Option<i32>,
    pub event_frame: Option<i32>,
}

#[derive(Debug, Serialize)]
pub struct PlaylistMeta {
    pub spec: Value,
    pub saved_playlist_id: Option<Uuid>,
}

#[derive(Debug, Deserialize)]
pub struct CreateReviewRequest {
    pub status: String,
    pub notes: Option<String>,
    pub confidence: Option<f64>,
    pub reviewed_mechanic: Option<String>,
    pub reviewed_subject_kind: Option<String>,
    pub reviewed_subject_id: Option<String>,
    pub reviewed_start_frame: Option<i32>,
    pub reviewed_end_frame: Option<i32>,
    pub reviewed_event_frame: Option<i32>,
}

#[derive(Debug, Serialize)]
pub struct CreateReviewResponse {
    pub id: Uuid,
    pub mechanic_event_id: Uuid,
    pub replay_id: Uuid,
    pub reviewer_user_id: Uuid,
    pub status: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateMechanicReviewPlaylistRequest {
    pub name: String,
    pub description: Option<String>,
    #[serde(default)]
    pub spec: Option<Value>,
    #[serde(default)]
    pub query: Option<Value>,
}

#[derive(Debug, Serialize)]
pub struct SavedMechanicReviewPlaylistResponse {
    pub id: Uuid,
    pub project_id: Option<Uuid>,
    pub name: String,
    pub description: Option<String>,
    pub spec: Value,
    pub created_by_user_id: Option<Uuid>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub manifest_url: String,
}

#[derive(Debug, Serialize)]
pub struct SavedMechanicReviewPlaylistsResponse {
    pub playlists: Vec<SavedMechanicReviewPlaylistResponse>,
    pub count: u32,
}

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
}

pub async fn list_mechanic_events(
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<MechanicEventsResponse>, ApiError> {
    let query = MechanicEventsQuery::from_raw_query(raw_query.as_deref())?;
    let db = require_db(&state)?;
    let filters = MechanicEventFilters::from_query(query)?;
    let events = find_mechanic_events(db, &filters)
        .await
        .map_err(ApiError::internal)?;
    let count = events.len() as u32;
    let next_offset = (count == filters.count).then_some(filters.offset + count);

    Ok(Json(MechanicEventsResponse {
        events,
        count,
        offset: filters.offset,
        next_offset,
    }))
}

pub async fn mechanic_review_playlist(
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<MechanicReviewPlaylist>, ApiError> {
    let query = MechanicEventsQuery::from_raw_query(raw_query.as_deref())?;
    let db = require_db(&state)?;
    let filters = MechanicEventFilters::from_query(query)?;
    let events = find_mechanic_events(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(build_review_playlist(
        events,
        "Rocket Sense mechanic review".to_owned(),
        &filters,
        None,
    )))
}

pub async fn list_saved_mechanic_playlists(
    State(state): State<AppState>,
) -> Result<Json<SavedMechanicReviewPlaylistsResponse>, ApiError> {
    let db = require_db(&state)?;
    let rows = sqlx::query(
        r#"
        SELECT id, project_id, name, description, query, created_by_user_id, created_at, updated_at
        FROM mechanic_review_playlists
        ORDER BY updated_at DESC, id DESC
        "#,
    )
    .fetch_all(db)
    .await
    .map_err(ApiError::internal)?;
    let playlists = rows
        .into_iter()
        .map(saved_playlist_from_row)
        .collect::<Result<Vec<_>, _>>()?;

    Ok(Json(SavedMechanicReviewPlaylistsResponse {
        count: playlists.len() as u32,
        playlists,
    }))
}

pub async fn create_saved_mechanic_playlist(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<CreateMechanicReviewPlaylistRequest>,
) -> Result<(StatusCode, Json<SavedMechanicReviewPlaylistResponse>), ApiError> {
    let db = require_db(&state)?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;
    let name = request.name.trim();
    if name.is_empty() {
        return Err(ApiError::bad_request("playlist name must not be empty"));
    }
    let description = request
        .description
        .map(|description| description.trim().to_owned())
        .filter(|description| !description.is_empty());
    let raw_spec = request.spec.or(request.query).unwrap_or(Value::Null);
    let spec = normalize_saved_playlist_spec(raw_spec)?;

    let row = sqlx::query(
        r#"
        INSERT INTO mechanic_review_playlists (
            id,
            name,
            description,
            query,
            created_by_user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, project_id, name, description, query, created_by_user_id, created_at, updated_at
        "#,
    )
    .bind(Uuid::now_v7())
    .bind(name)
    .bind(description)
    .bind(spec)
    .bind(auth_user.id)
    .fetch_one(db)
    .await
    .map_err(ApiError::internal)?;

    Ok((StatusCode::CREATED, Json(saved_playlist_from_row(row)?)))
}

pub async fn get_saved_mechanic_playlist(
    State(state): State<AppState>,
    Path(playlist_id): Path<Uuid>,
) -> Result<Json<SavedMechanicReviewPlaylistResponse>, ApiError> {
    let playlist = get_saved_playlist(require_db(&state)?, playlist_id).await?;
    Ok(Json(playlist))
}

pub async fn saved_mechanic_playlist_manifest(
    State(state): State<AppState>,
    Path(playlist_id): Path<Uuid>,
) -> Result<Json<MechanicReviewPlaylist>, ApiError> {
    let db = require_db(&state)?;
    let playlist = get_saved_playlist(db, playlist_id).await?;
    let filters = MechanicEventFilters::from_playlist_spec(&playlist.spec)?;
    let events = find_mechanic_events(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(build_review_playlist(
        events,
        playlist.name,
        &filters,
        Some(playlist.id),
    )))
}

pub async fn create_mechanic_event_review(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Path(event_id): Path<Uuid>,
    Json(request): Json<CreateReviewRequest>,
) -> Result<(StatusCode, Json<CreateReviewResponse>), ApiError> {
    let db = require_db(&state)?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;
    let status = normalize_review_status(&request.status)?;
    validate_review_request(&request)?;

    let row = sqlx::query(
        r#"
        WITH target_event AS (
            SELECT id, replay_id
            FROM mechanic_events
            WHERE id = $1
        )
        INSERT INTO mechanic_event_reviews (
            id,
            mechanic_event_id,
            replay_id,
            reviewer_user_id,
            status,
            reviewed_mechanic,
            reviewed_subject_kind,
            reviewed_subject_id,
            reviewed_start_frame,
            reviewed_end_frame,
            reviewed_event_frame,
            confidence,
            notes
        )
        SELECT
            $2,
            target_event.id,
            target_event.replay_id,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12
        FROM target_event
        RETURNING id, mechanic_event_id, replay_id, reviewer_user_id, status, created_at
        "#,
    )
    .bind(event_id)
    .bind(Uuid::now_v7())
    .bind(auth_user.id)
    .bind(&status)
    .bind(request.reviewed_mechanic)
    .bind(request.reviewed_subject_kind)
    .bind(request.reviewed_subject_id)
    .bind(request.reviewed_start_frame)
    .bind(request.reviewed_end_frame)
    .bind(request.reviewed_event_frame)
    .bind(request.confidence)
    .bind(request.notes)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "mechanic event not found"))?;

    Ok((
        StatusCode::CREATED,
        Json(CreateReviewResponse {
            id: row.try_get("id").map_err(ApiError::internal)?,
            mechanic_event_id: row
                .try_get("mechanic_event_id")
                .map_err(ApiError::internal)?,
            replay_id: row.try_get("replay_id").map_err(ApiError::internal)?,
            reviewer_user_id: row
                .try_get("reviewer_user_id")
                .map_err(ApiError::internal)?,
            status: row.try_get("status").map_err(ApiError::internal)?,
            created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        }),
    ))
}

fn saved_playlist_from_row(
    row: sqlx::postgres::PgRow,
) -> Result<SavedMechanicReviewPlaylistResponse, ApiError> {
    let id: Uuid = row.try_get("id").map_err(ApiError::internal)?;
    Ok(SavedMechanicReviewPlaylistResponse {
        id,
        project_id: row.try_get("project_id").map_err(ApiError::internal)?,
        name: row.try_get("name").map_err(ApiError::internal)?,
        description: row.try_get("description").map_err(ApiError::internal)?,
        spec: normalize_saved_playlist_spec(row.try_get("query").map_err(ApiError::internal)?)?,
        created_by_user_id: row
            .try_get("created_by_user_id")
            .map_err(ApiError::internal)?,
        created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        updated_at: row.try_get("updated_at").map_err(ApiError::internal)?,
        manifest_url: format!("/api/v1/mechanics/playlists/{id}/manifest"),
    })
}

async fn get_saved_playlist(
    pool: &PgPool,
    playlist_id: Uuid,
) -> Result<SavedMechanicReviewPlaylistResponse, ApiError> {
    let row = sqlx::query(
        r#"
        SELECT id, project_id, name, description, query, created_by_user_id, created_at, updated_at
        FROM mechanic_review_playlists
        WHERE id = $1
        "#,
    )
    .bind(playlist_id)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "mechanic review playlist not found"))?;

    saved_playlist_from_row(row)
}

struct MechanicEventFilters {
    event_ids: Vec<Uuid>,
    mechanics: Vec<String>,
    detectors: Vec<String>,
    review_status: Option<String>,
    min_confidence: Option<f64>,
    replay_id: Option<Uuid>,
    player_id: Option<String>,
    count: u32,
    offset: u32,
}

impl MechanicEventFilters {
    fn from_query(query: MechanicEventsQuery) -> Result<Self, ApiError> {
        let review_status = query
            .review_status
            .map(|status| status.trim().to_lowercase())
            .filter(|status| !status.is_empty());
        if let Some(status) = &review_status {
            validate_review_status_filter(status)?;
        }
        if let Some(confidence) = query.min_confidence {
            if !(0.0..=1.0).contains(&confidence) {
                return Err(ApiError::bad_request(
                    "min-confidence must be between 0.0 and 1.0",
                ));
            }
        }

        Ok(Self {
            event_ids: query.event_ids,
            mechanics: normalize_terms(query.mechanic),
            detectors: normalize_terms(query.detector),
            review_status,
            min_confidence: query.min_confidence,
            replay_id: query.replay_id,
            player_id: query
                .player_id
                .map(|value| value.trim().to_owned())
                .filter(|value| !value.is_empty()),
            count: query.count.unwrap_or(500).clamp(1, 5_000),
            offset: query.offset.unwrap_or(0),
        })
    }

    fn from_query_value(query: &Value) -> Result<Self, ApiError> {
        Self::from_filter_value(query, None)
    }

    fn from_playlist_spec(spec: &Value) -> Result<Self, ApiError> {
        let Some(object) = spec.as_object() else {
            return Err(ApiError::bad_request("playlist spec must be an object"));
        };

        let Some(source) = object.get("source") else {
            return Self::from_query_value(spec);
        };
        let Some(source) = source.as_object() else {
            return Err(ApiError::bad_request(
                "playlist spec source must be an object",
            ));
        };
        let kind = json_string(source.get("kind"))?
            .unwrap_or_else(|| "query".to_owned())
            .trim()
            .to_owned();
        let entity = json_string(source.get("entity"))?
            .unwrap_or_else(|| "mechanic_event".to_owned())
            .trim()
            .to_owned();
        if entity != "mechanic_event" {
            return Err(ApiError::bad_request(
                "playlist spec source entity must be mechanic_event",
            ));
        }

        let page = object.get("page");
        match kind.as_str() {
            "query" => {
                let empty_filters = Value::Object(serde_json::Map::new());
                let filters = source.get("filters").unwrap_or(&empty_filters);
                Self::from_filter_value(filters, page)
            }
            "snapshot" => {
                let event_ids = json_uuid_vec(
                    source
                        .get("itemIds")
                        .or_else(|| source.get("item-ids"))
                        .or_else(|| source.get("eventIds")),
                )?;
                let empty_filters = Value::Object(serde_json::Map::new());
                let mut filters = Self::from_filter_value(&empty_filters, page)?;
                filters.event_ids = event_ids;
                if !filters.event_ids.is_empty() {
                    filters.count = filters.count.max(filters.event_ids.len() as u32).min(5_000);
                }
                Ok(filters)
            }
            _ => Err(ApiError::bad_request(
                "playlist spec source kind must be query or snapshot",
            )),
        }
    }

    fn from_filter_value(filters: &Value, page: Option<&Value>) -> Result<Self, ApiError> {
        let Some(object) = filters.as_object() else {
            return Err(ApiError::bad_request(
                "playlist spec filters must be an object",
            ));
        };
        let mechanics =
            json_string_vec(object.get("mechanics").or_else(|| object.get("mechanic")))?;
        let detectors =
            json_string_vec(object.get("detectors").or_else(|| object.get("detector")))?;
        let event_ids = json_uuid_vec(object.get("eventIds").or_else(|| object.get("event-id")))?;
        let review_status = json_string(
            object
                .get("reviewStatus")
                .or_else(|| object.get("review-status")),
        )?
        .map(|status| status.trim().to_lowercase())
        .filter(|status| !status.is_empty());
        if let Some(status) = &review_status {
            validate_review_status_filter(status)?;
        }
        let min_confidence = json_f64(
            object
                .get("minConfidence")
                .or_else(|| object.get("min-confidence")),
        )?;
        if let Some(confidence) = min_confidence {
            if !(0.0..=1.0).contains(&confidence) {
                return Err(ApiError::bad_request(
                    "playlist spec minConfidence must be between 0.0 and 1.0",
                ));
            }
        }
        let replay_id = json_string(object.get("replayId").or_else(|| object.get("replay-id")))?
            .map(|value| Uuid::parse_str(&value))
            .transpose()
            .map_err(|_| ApiError::bad_request("playlist spec replayId must be a UUID"))?;
        let player_id = json_string(object.get("playerId").or_else(|| object.get("player-id")))?
            .map(|value| value.trim().to_owned())
            .filter(|value| !value.is_empty());
        let page_object = page.and_then(Value::as_object);
        if page.is_some() && page_object.is_none() {
            return Err(ApiError::bad_request(
                "playlist spec page must be an object",
            ));
        }
        let count = json_u32(
            page_object
                .and_then(|page| page.get("limit").or_else(|| page.get("count")))
                .or_else(|| object.get("count")),
        )?
        .unwrap_or(500)
        .clamp(1, 5_000);
        let offset = json_u32(
            page_object
                .and_then(|page| page.get("offset"))
                .or_else(|| object.get("offset")),
        )?
        .unwrap_or(0);

        Ok(Self {
            event_ids,
            mechanics: normalize_terms(mechanics),
            detectors: normalize_terms(detectors),
            review_status,
            min_confidence,
            replay_id,
            player_id,
            count,
            offset,
        })
    }
}

fn mechanic_review_playlist_url(filters: &MechanicEventFilters) -> String {
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    for event_id in &filters.event_ids {
        query.append_pair("event-id", &event_id.to_string());
    }
    for mechanic in &filters.mechanics {
        query.append_pair("mechanic", mechanic);
    }
    for detector in &filters.detectors {
        query.append_pair("detector", detector);
    }
    if let Some(status) = &filters.review_status {
        query.append_pair("review-status", status);
    }
    if let Some(confidence) = filters.min_confidence {
        query.append_pair("min-confidence", &confidence.to_string());
    }
    if let Some(replay_id) = filters.replay_id {
        query.append_pair("replay-id", &replay_id.to_string());
    }
    if let Some(player_id) = &filters.player_id {
        query.append_pair("player-id", player_id);
    }
    query.append_pair("count", &filters.count.to_string());
    query.append_pair("offset", &filters.offset.to_string());

    let query_string = query.finish();
    if query_string.is_empty() {
        "/api/v1/mechanics/review-playlist".to_owned()
    } else {
        format!("/api/v1/mechanics/review-playlist?{query_string}")
    }
}

fn normalize_saved_playlist_spec(spec: Value) -> Result<Value, ApiError> {
    let spec = if spec.is_null() {
        serde_json::json!({})
    } else {
        spec
    };
    let filters = MechanicEventFilters::from_playlist_spec(&spec)?;
    let source_kind = spec
        .as_object()
        .and_then(|object| object.get("source"))
        .and_then(Value::as_object)
        .and_then(|source| source.get("kind"))
        .and_then(Value::as_str)
        .unwrap_or("query");

    if source_kind == "snapshot" {
        Ok(serde_json::json!({
            "source": {
                "kind": "snapshot",
                "entity": "mechanic_event",
                "itemIds": filters.event_ids,
            },
            "page": {
                "limit": filters.count,
                "offset": filters.offset,
            },
        }))
    } else {
        Ok(playlist_spec_from_filters(&filters))
    }
}

fn playlist_spec_from_filters(filters: &MechanicEventFilters) -> Value {
    serde_json::json!({
        "source": {
            "kind": "query",
            "entity": "mechanic_event",
            "filters": {
                "eventIds": filters.event_ids,
                "mechanics": filters.mechanics,
                "detectors": filters.detectors,
                "reviewStatus": filters.review_status,
                "minConfidence": filters.min_confidence,
                "replayId": filters.replay_id,
                "playerId": filters.player_id,
            },
        },
        "page": {
            "limit": filters.count,
            "offset": filters.offset,
        },
    })
}

fn json_string_vec(value: Option<&Value>) -> Result<Vec<String>, ApiError> {
    match value {
        None | Some(Value::Null) => Ok(Vec::new()),
        Some(Value::String(value)) => Ok(vec![value.clone()]),
        Some(Value::Array(values)) => values
            .iter()
            .map(|value| match value {
                Value::String(value) => Ok(value.clone()),
                _ => Err(ApiError::bad_request(
                    "playlist spec string-list fields must contain only strings",
                )),
            })
            .collect(),
        Some(_) => Err(ApiError::bad_request(
            "playlist spec string-list fields must be a string or array of strings",
        )),
    }
}

fn json_uuid_vec(value: Option<&Value>) -> Result<Vec<Uuid>, ApiError> {
    match value {
        None | Some(Value::Null) => Ok(Vec::new()),
        Some(Value::String(value)) => Uuid::parse_str(value)
            .map(|value| vec![value])
            .map_err(|_| ApiError::bad_request("playlist spec eventIds must contain UUIDs")),
        Some(Value::Array(values)) => values
            .iter()
            .map(|value| match value {
                Value::String(value) => Uuid::parse_str(value).map_err(|_| {
                    ApiError::bad_request("playlist spec eventIds must contain UUIDs")
                }),
                _ => Err(ApiError::bad_request(
                    "playlist spec eventIds must contain only strings",
                )),
            })
            .collect(),
        Some(_) => Err(ApiError::bad_request(
            "playlist spec eventIds must be a UUID string or array of UUID strings",
        )),
    }
}

fn json_string(value: Option<&Value>) -> Result<Option<String>, ApiError> {
    match value {
        None | Some(Value::Null) => Ok(None),
        Some(Value::String(value)) => Ok(Some(value.clone())),
        Some(_) => Err(ApiError::bad_request(
            "playlist spec field must be a string when provided",
        )),
    }
}

fn json_f64(value: Option<&Value>) -> Result<Option<f64>, ApiError> {
    match value {
        None | Some(Value::Null) => Ok(None),
        Some(Value::Number(value)) => value
            .as_f64()
            .ok_or_else(|| ApiError::bad_request("playlist spec number is out of range"))
            .map(Some),
        Some(_) => Err(ApiError::bad_request(
            "playlist spec field must be a number when provided",
        )),
    }
}

fn json_u32(value: Option<&Value>) -> Result<Option<u32>, ApiError> {
    match value {
        None | Some(Value::Null) => Ok(None),
        Some(Value::Number(value)) => {
            let value = value
                .as_u64()
                .ok_or_else(|| ApiError::bad_request("playlist spec integer is out of range"))?;
            u32::try_from(value)
                .map(Some)
                .map_err(|_| ApiError::bad_request("playlist spec integer is out of range"))
        }
        Some(_) => Err(ApiError::bad_request(
            "playlist spec field must be an unsigned integer when provided",
        )),
    }
}

async fn find_mechanic_events(
    pool: &PgPool,
    filters: &MechanicEventFilters,
) -> Result<Vec<MechanicEventResponse>, sqlx::Error> {
    let mut builder = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            event.id,
            event.replay_id,
            event.analysis_run_id,
            event.mechanic,
            event.detector,
            event.player_id,
            event.team,
            event.start_frame,
            event.end_frame,
            event.event_frame,
            event.start_time,
            event.end_time,
            event.event_time,
            event.confidence,
            event.reason,
            event.payload,
            event.created_at,
            review.id AS latest_review_id,
            review.status AS review_status
        FROM mechanic_events event
        JOIN replays replay
          ON replay.id = event.replay_id
        LEFT JOIN LATERAL (
            SELECT id, status
            FROM mechanic_event_reviews
            WHERE mechanic_event_id = event.id
            ORDER BY created_at DESC
            LIMIT 1
        ) review ON TRUE
        WHERE event.analysis_run_id = replay.canonical_analysis_run_id
        "#,
    );

    if !filters.event_ids.is_empty() {
        builder
            .push(" AND event.id = ANY(")
            .push_bind(&filters.event_ids)
            .push(")");
    }
    if !filters.mechanics.is_empty() {
        builder
            .push(" AND event.mechanic = ANY(")
            .push_bind(&filters.mechanics)
            .push(")");
    }
    if !filters.detectors.is_empty() {
        builder
            .push(" AND event.detector = ANY(")
            .push_bind(&filters.detectors)
            .push(")");
    }
    if let Some(replay_id) = filters.replay_id {
        builder.push(" AND event.replay_id = ").push_bind(replay_id);
    }
    if let Some(player_id) = &filters.player_id {
        builder.push(" AND event.player_id = ").push_bind(player_id);
    }
    if let Some(confidence) = filters.min_confidence {
        builder
            .push(" AND event.confidence >= ")
            .push_bind(confidence);
    }
    if let Some(status) = &filters.review_status {
        if status == "unreviewed" {
            builder.push(" AND review.id IS NULL");
        } else if status != "all" {
            builder.push(" AND review.status = ").push_bind(status);
        }
    }

    builder
        .push(
            " ORDER BY event.replay_id, COALESCE(event.event_time, event.start_time, 0), event.id",
        )
        .push(" LIMIT ")
        .push_bind(filters.count as i64)
        .push(" OFFSET ")
        .push_bind(filters.offset as i64);

    let rows = builder.build().fetch_all(pool).await?;
    rows.into_iter().map(mechanic_event_from_row).collect()
}

fn mechanic_event_from_row(
    row: sqlx::postgres::PgRow,
) -> Result<MechanicEventResponse, sqlx::Error> {
    Ok(MechanicEventResponse {
        id: row.try_get("id")?,
        replay_id: row.try_get("replay_id")?,
        analysis_run_id: row.try_get("analysis_run_id")?,
        mechanic: row.try_get("mechanic")?,
        detector: row.try_get("detector")?,
        player_id: row.try_get("player_id")?,
        team: row.try_get("team")?,
        start_frame: row.try_get("start_frame")?,
        end_frame: row.try_get("end_frame")?,
        event_frame: row.try_get("event_frame")?,
        start_time: row.try_get("start_time")?,
        end_time: row.try_get("end_time")?,
        event_time: row.try_get("event_time")?,
        confidence: row.try_get("confidence")?,
        reason: row.try_get("reason")?,
        payload: row.try_get("payload")?,
        latest_review_id: row.try_get("latest_review_id")?,
        review_status: row.try_get("review_status")?,
        created_at: row.try_get("created_at")?,
    })
}

fn build_review_playlist(
    events: Vec<MechanicEventResponse>,
    label: String,
    filters: &MechanicEventFilters,
    saved_playlist_id: Option<Uuid>,
) -> MechanicReviewPlaylist {
    let mut replay_ids = Vec::<Uuid>::new();
    for event in &events {
        if !replay_ids.contains(&event.replay_id) {
            replay_ids.push(event.replay_id);
        }
    }
    let count = events.len() as u32;

    MechanicReviewPlaylist {
        version: 1,
        kind: "playlist",
        label,
        playback: PlaylistPlayback {
            advance_mode: "manual",
            end_mode: "stop",
        },
        page: PlaylistPage {
            count,
            limit: filters.count,
            offset: filters.offset,
        },
        replays: replay_ids
            .into_iter()
            .map(|replay_id| PlaylistReplay {
                id: replay_id.to_string(),
                path: format!("/api/v1/replays/{replay_id}/file"),
                label: replay_id.to_string(),
                meta: serde_json::json!({ "rocketSenseReplayId": replay_id }),
            })
            .collect(),
        items: events
            .into_iter()
            .enumerate()
            .map(|(index, event)| playlist_item(index, event))
            .collect(),
        meta: PlaylistMeta {
            spec: playlist_spec_from_filters(filters),
            saved_playlist_id,
        },
    }
}

fn playlist_item(index: usize, event: MechanicEventResponse) -> PlaylistItem {
    let event_time = event
        .event_time
        .or(event.end_time)
        .or(event.start_time)
        .unwrap_or(0.0);
    let start_time = event.start_time.unwrap_or(event_time);
    let end_time = event.end_time.unwrap_or(event_time);
    let clip_start = (start_time - MECHANIC_REVIEW_PREROLL_SECONDS).max(0.0);
    let clip_end = (end_time + MECHANIC_REVIEW_POSTROLL_SECONDS).max(clip_start + 0.5);
    let mechanic_label = mechanic_label(&event.mechanic);

    PlaylistItem {
        id: event.id.to_string(),
        replay: event.replay_id.to_string(),
        start: PlaylistBound {
            kind: "time",
            value: clip_start,
        },
        end: PlaylistBound {
            kind: "time",
            value: clip_end,
        },
        label: format!("{mechanic_label} candidate {}", index + 1),
        meta: PlaylistItemMeta {
            event_id: event.id,
            mechanic: event.mechanic,
            mechanic_label,
            detector: event.detector,
            confidence: event.confidence,
            reason: event.reason,
            player_id: event.player_id.clone(),
            team: event.team.map(|team| {
                if team == 0 {
                    "blue".to_owned()
                } else {
                    "orange".to_owned()
                }
            }),
            review_status: event.review_status,
            clip: PlaylistItemClip {
                start_time: clip_start,
                end_time: clip_end,
                preroll_seconds: start_time - clip_start,
                postroll_seconds: clip_end - end_time,
            },
            target: PlaylistItemTarget {
                kind: "mechanic",
                player_id: event.player_id,
                start_time: event.start_time,
                end_time: event.end_time,
                event_time: event.event_time,
                start_frame: event.start_frame,
                end_frame: event.end_frame,
                event_frame: event.event_frame,
            },
            event: event.payload,
        },
    }
}

fn mechanic_label(mechanic: &str) -> String {
    mechanic
        .split('_')
        .filter(|part| !part.is_empty())
        .map(|part| {
            let mut chars = part.chars();
            match chars.next() {
                Some(first) => first.to_uppercase().collect::<String>() + chars.as_str(),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn validate_review_request(request: &CreateReviewRequest) -> Result<(), ApiError> {
    if let Some(confidence) = request.confidence {
        if !(0.0..=1.0).contains(&confidence) {
            return Err(ApiError::bad_request(
                "confidence must be between 0.0 and 1.0",
            ));
        }
    }
    if let (Some(start), Some(end)) = (request.reviewed_start_frame, request.reviewed_end_frame) {
        if end < start {
            return Err(ApiError::bad_request(
                "reviewed_end_frame must be greater than or equal to reviewed_start_frame",
            ));
        }
    }
    Ok(())
}

fn validate_review_status_filter(status: &str) -> Result<(), ApiError> {
    if matches!(
        status,
        "all"
            | "unreviewed"
            | "confirmed"
            | "rejected"
            | "corrected"
            | "uncertain"
            | "needs_second_review"
    ) {
        Ok(())
    } else {
        Err(ApiError::bad_request(format!(
            "unsupported review-status `{status}`"
        )))
    }
}

fn normalize_review_status(status: &str) -> Result<String, ApiError> {
    let status = status.trim().to_lowercase();
    validate_review_status_filter(&status)?;
    if status == "all" || status == "unreviewed" {
        return Err(ApiError::bad_request(
            "review status must be one of confirmed, rejected, corrected, uncertain, needs_second_review",
        ));
    }
    Ok(status)
}

fn normalize_terms(values: Vec<String>) -> Vec<String> {
    values
        .into_iter()
        .map(|value| value.trim().to_owned())
        .filter(|value| !value.is_empty())
        .collect()
}

async fn upsert_user(pool: &PgPool, auth_user: &AuthUser) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        INSERT INTO users (id, primary_email, display_name)
        VALUES ($1, $2, $2)
        ON CONFLICT (id)
        DO UPDATE SET
            primary_email = EXCLUDED.primary_email,
            display_name = COALESCE(users.display_name, EXCLUDED.display_name),
            updated_at = now()
        "#,
    )
    .bind(auth_user.id)
    .bind(&auth_user.email)
    .execute(pool)
    .await?;

    Ok(())
}

fn require_db(state: &AppState) -> Result<&PgPool, ApiError> {
    state.db.as_ref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "postgres connection is required for mechanic review",
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
        tracing::error!(error = %error, "mechanics request failed");
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, "internal server error")
    }
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

const MECHANIC_REVIEW_PAGE: &str = include_str!("mechanics_review_page.html");
