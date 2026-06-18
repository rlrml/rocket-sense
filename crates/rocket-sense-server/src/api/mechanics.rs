use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::{Path, RawQuery, State},
    http::StatusCode,
    response::{IntoResponse, Redirect, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::{DateTime, Utc};
use serde::{de, Deserialize, Deserializer, Serialize};
use serde_json::Value;
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use std::collections::BTreeMap;
use uuid::Uuid;

#[cfg(test)]
#[path = "mechanics_tests.rs"]
mod tests;

const EVENT_REVIEW_PREROLL_SECONDS: f64 = 4.0;
const EVENT_REVIEW_POSTROLL_SECONDS: f64 = 3.0;
const DEFAULT_EVENT_REVIEW_PAGE_SIZE: u32 = 100;
const MAX_EVENT_REVIEW_PAGE_SIZE: u32 = 5_000;

pub fn public_router() -> Router<AppState> {
    Router::new()
        .route("/events/review/open", get(open_event_review))
        .route("/mechanics/review/open", get(open_event_review))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/events", get(list_mechanic_events))
        .route("/events/types", get(list_event_types))
        .route("/events/evaluation", get(event_review_evaluation))
        .route("/events/review-playlist", get(event_review_playlist))
        .route(
            "/events/playlists",
            get(list_saved_event_playlists).post(create_saved_event_playlist),
        )
        .route(
            "/events/playlists/{playlist_id}",
            get(get_saved_event_playlist),
        )
        .route(
            "/events/playlists/{playlist_id}/manifest",
            get(saved_event_playlist_manifest),
        )
        .route("/mechanics/events", get(list_mechanic_events))
        .route("/mechanics/types", get(list_event_types))
        .route("/mechanics/evaluation", get(event_review_evaluation))
        .route("/mechanics/review-playlist", get(event_review_playlist))
        .route(
            "/mechanics/playlists",
            get(list_saved_event_playlists).post(create_saved_event_playlist),
        )
        .route(
            "/mechanics/playlists/{playlist_id}",
            get(get_saved_event_playlist),
        )
        .route(
            "/mechanics/playlists/{playlist_id}/manifest",
            get(saved_event_playlist_manifest),
        )
        .route(
            "/mechanics/events/{event_id}/reviews",
            post(create_mechanic_event_review),
        )
        .route(
            "/events/{event_id}/reviews",
            post(create_mechanic_event_review),
        )
        // Author a review for an event the engine never detected (a "missed"
        // event / false negative). Unlike the routes above, no detected event
        // id is required: the review is anchored to the replay and frames.
        .route("/events/reviews", post(create_missed_event_review))
        .route("/mechanics/reviews", post(create_missed_event_review))
}

#[derive(Debug, Default, Deserialize)]
pub struct MechanicEventsQuery {
    pub q: Option<String>,
    pub title: Option<String>,
    #[serde(
        default,
        rename = "event-id",
        deserialize_with = "deserialize_uuid_vec"
    )]
    pub event_ids: Vec<Uuid>,
    #[serde(default, deserialize_with = "deserialize_string_vec")]
    pub mechanic: Vec<String>,
    #[serde(
        default,
        rename = "event-category",
        deserialize_with = "deserialize_string_vec"
    )]
    pub event_category: Vec<String>,
    #[serde(default, deserialize_with = "deserialize_string_vec")]
    pub detector: Vec<String>,
    #[serde(
        default,
        rename = "player-name",
        alias = "player-name[]",
        alias = "player_names",
        alias = "player_names[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub player_names: Vec<String>,
    #[serde(
        default,
        rename = "player-id",
        alias = "player-id[]",
        alias = "player_ids",
        alias = "player_ids[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub player_ids: Vec<String>,
    #[serde(
        default,
        alias = "playlist[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub playlist: Vec<String>,
    #[serde(
        default,
        rename = "game-mode",
        alias = "game-mode[]",
        alias = "game_modes",
        alias = "game_modes[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub game_modes: Vec<String>,
    #[serde(
        default,
        rename = "map",
        alias = "map[]",
        alias = "maps",
        alias = "maps[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub maps: Vec<String>,
    pub pro: Option<bool>,
    pub uploader: Option<String>,
    pub group: Option<String>,
    pub project: Option<String>,
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
    #[serde(rename = "primary-player-id")]
    pub player_id: Option<String>,
    #[serde(rename = "created-after")]
    pub created_after: Option<DateTime<Utc>>,
    #[serde(rename = "created-before")]
    pub created_before: Option<DateTime<Utc>>,
    #[serde(rename = "replay-date-after")]
    pub replay_date_after: Option<DateTime<Utc>>,
    #[serde(rename = "replay-date-before")]
    pub replay_date_before: Option<DateTime<Utc>>,
    #[serde(rename = "event-created-after")]
    pub event_created_after: Option<DateTime<Utc>>,
    #[serde(rename = "event-created-before")]
    pub event_created_before: Option<DateTime<Utc>>,
    pub count: Option<u32>,
    pub offset: Option<u32>,
}

impl MechanicEventsQuery {
    fn from_raw_query(query: Option<&str>) -> Result<Self, ApiError> {
        let mut parsed = Self::default();

        for (key, value) in query
            .into_iter()
            .flat_map(|query| url::form_urlencoded::parse(query.as_bytes()))
        {
            let value = value.trim();
            let key = key.strip_suffix("[]").unwrap_or(key.as_ref());
            match key {
                "q" => parsed.q = non_empty_string(value),
                "title" => parsed.title = non_empty_string(value),
                "event-id" if !value.is_empty() => {
                    parsed
                        .event_ids
                        .push(Uuid::parse_str(value).map_err(ApiError::bad_request)?);
                }
                "event-type" | "eventType" | "mechanic" if !value.is_empty() => {
                    parsed.mechanic.push(value.to_owned())
                }
                "event-category" | "eventCategory" | "category" if !value.is_empty() => {
                    parsed.event_category.push(value.to_owned())
                }
                "detector" if !value.is_empty() => parsed.detector.push(value.to_owned()),
                "player-name" | "player_names" if !value.is_empty() => {
                    parsed.player_names.push(value.to_owned())
                }
                "player-id" | "player_ids" if !value.is_empty() => {
                    parsed.player_ids.push(value.to_owned());
                    if parsed.player_id.is_none() {
                        parsed.player_id = Some(value.to_owned());
                    }
                }
                "primary-player-id" if !value.is_empty() => {
                    parsed.player_ids.push(value.to_owned());
                    parsed.player_id = Some(value.to_owned());
                }
                "playlist" if !value.is_empty() => parsed.playlist.push(value.to_owned()),
                "game-mode" | "game_modes" if !value.is_empty() => {
                    parsed.game_modes.push(value.to_owned())
                }
                "map" | "maps" if !value.is_empty() => parsed.maps.push(value.to_owned()),
                "pro" if !value.is_empty() => {
                    parsed.pro = Some(parse_review_bool_filter("pro", value)?);
                }
                "uploader" => parsed.uploader = non_empty_string(value),
                "group" => parsed.group = non_empty_string(value),
                "project" => parsed.project = non_empty_string(value),
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
                "created-after" | "created_after" if !value.is_empty() => {
                    parsed.created_after =
                        Some(parse_review_datetime_filter("created-after", value)?);
                }
                "created-before" | "created_before" if !value.is_empty() => {
                    parsed.created_before =
                        Some(parse_review_datetime_filter("created-before", value)?);
                }
                "replay-date-after" | "replay_date_after" if !value.is_empty() => {
                    parsed.replay_date_after =
                        Some(parse_review_datetime_filter("replay-date-after", value)?);
                }
                "replay-date-before" | "replay_date_before" if !value.is_empty() => {
                    parsed.replay_date_before =
                        Some(parse_review_datetime_filter("replay-date-before", value)?);
                }
                "event-created-after" | "event_created_after" if !value.is_empty() => {
                    parsed.event_created_after =
                        Some(parse_review_datetime_filter("event-created-after", value)?);
                }
                "event-created-before" | "event_created_before" if !value.is_empty() => {
                    parsed.event_created_before =
                        Some(parse_review_datetime_filter("event-created-before", value)?);
                }
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

async fn open_event_review(RawQuery(raw_query): RawQuery) -> Result<Redirect, ApiError> {
    let query = MechanicEventsQuery::from_raw_query(raw_query.as_deref())?;
    let filters = MechanicEventFilters::from_query(query)?;
    Ok(Redirect::temporary(&event_review_player_url(&filters)))
}

fn event_review_player_url(filters: &MechanicEventFilters) -> String {
    let playlist_url = event_review_playlist_url(filters);
    let mut target = String::from("/subtr-actor/?");
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    query.append_pair("reviewPlaylist", &playlist_url);
    if let Some(config) = event_review_player_config_json(filters) {
        query.append_pair("cfg", &config.to_string());
    }
    target.push_str(&query.finish());
    target
}

fn event_review_player_config_json(filters: &MechanicEventFilters) -> Option<Value> {
    let mechanics = event_review_mechanic_timeline_kinds(filters);
    if mechanics.is_empty() {
        return None;
    }

    Some(serde_json::json!({
        "version": 1,
        "playback": {},
        "camera": {},
        "overlays": {
            "timelineEvents": [],
            "timelineRanges": [],
            "mechanics": mechanics,
            "renderEffects": [],
            "followedPlayerHud": false,
            "boostPads": true,
            "boostPickupAnimation": false,
            "hitboxWireframes": false,
            "hitboxOnlyMode": false
        },
        "recording": {},
        "singletonWindows": [],
        "statsWindows": [],
        "moduleConfigs": {}
    }))
}

fn event_review_mechanic_timeline_kinds(filters: &MechanicEventFilters) -> Vec<String> {
    let mut mechanics = filters
        .mechanics
        .iter()
        .filter_map(|event_type| mechanic_timeline_kind(event_type))
        .collect::<Vec<_>>();
    mechanics.sort();
    mechanics.dedup();
    mechanics
}

fn mechanic_timeline_kind(event_type: &str) -> Option<String> {
    matches!(
        event_type,
        "air_dribble"
            | "ball_carry"
            | "ceiling_shot"
            | "double_tap"
            | "flick"
            | "flip_reset"
            | "half_flip"
            | "half_volley"
            | "musty_flick"
            | "one_timer"
            | "pass"
            | "speed_flip"
            | "wall_aerial"
            | "wall_aerial_shot"
            | "wavedash"
    )
    .then(|| event_type.to_owned())
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
pub struct EventTypesResponse {
    pub event_types: Vec<EventTypeResponse>,
}

#[derive(Debug, Serialize)]
pub struct EventTypeResponse {
    pub key: String,
    pub display_name: String,
    pub category: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct MechanicEventResponse {
    pub id: Uuid,
    pub replay_id: Uuid,
    pub replay_label: Option<String>,
    pub analysis_run_id: Uuid,
    pub event_type: String,
    pub event_type_label: String,
    pub event_category: String,
    pub mechanic: String,
    pub detector: String,
    pub player_id: Option<String>,
    pub player_name: Option<String>,
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
pub struct EventReviewPlaylist {
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
    pub next: Option<String>,
    pub previous: Option<String>,
    pub count: u32,
    pub limit: u32,
    pub offset: u32,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PlaylistPlayback {
    pub advance_mode: &'static str,
    pub end_mode: &'static str,
    pub time_base: &'static str,
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
    pub event_type: String,
    pub event_type_label: String,
    pub event_category: String,
    pub mechanic: String,
    pub mechanic_label: String,
    pub detector: String,
    pub confidence: Option<f64>,
    pub reason: Option<String>,
    pub player_id: Option<String>,
    pub player_name: Option<String>,
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

/// Request body for authoring a review of a *missed* event — an instance a
/// human observed during playback that the detector never emitted. There is no
/// detected `event_id`; the label is anchored to the replay plus the mechanic
/// type, subject, and frame location.
#[derive(Debug, Deserialize)]
pub struct CreateMissedEventReviewRequest {
    pub replay_id: Uuid,
    /// Mechanic / event-type the human is asserting happened (normalized to a
    /// canonical event-type key, e.g. `flick`).
    pub reviewed_mechanic: String,
    pub reviewed_subject_kind: Option<String>,
    pub reviewed_subject_id: Option<String>,
    /// Frame the mechanic occurs on. Required: a missed event without a temporal
    /// anchor cannot be matched against detector output later.
    pub reviewed_event_frame: i32,
    pub reviewed_start_frame: Option<i32>,
    pub reviewed_end_frame: Option<i32>,
    /// Optional wall-clock playback time, preserved in the snapshot for context.
    pub reviewed_event_time: Option<f64>,
    pub confidence: Option<f64>,
    pub notes: Option<String>,
    /// Defaults to `confirmed` (a captured missed event is a confirmed positive).
    pub status: Option<String>,
    /// Free-form viewer-supplied context (ball/car positions, nearby detected
    /// events, etc.), stored verbatim under `context` in the snapshot.
    #[serde(default)]
    pub context: Option<Value>,
}

#[derive(Debug, Serialize)]
pub struct MissedEventReviewResponse {
    pub id: Uuid,
    pub event_id: Option<Uuid>,
    pub replay_id: Uuid,
    pub reviewer_user_id: Uuid,
    pub status: String,
    pub reviewed_event_type_key: Option<String>,
    pub reviewed_event_frame: Option<i32>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateEventReviewPlaylistRequest {
    pub name: String,
    pub description: Option<String>,
    #[serde(default)]
    pub spec: Option<Value>,
    #[serde(default)]
    pub query: Option<Value>,
}

#[derive(Debug, Serialize)]
pub struct SavedEventReviewPlaylistResponse {
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
pub struct SavedEventReviewPlaylistsResponse {
    pub playlists: Vec<SavedEventReviewPlaylistResponse>,
    pub count: u32,
}

#[derive(Debug, Serialize)]
pub struct EventReviewEvaluationResponse {
    pub label_count: i64,
    pub positive_label_count: i64,
    pub rejected_label_count: i64,
    pub candidate_count: i64,
    pub matched_positive_label_count: i64,
    pub missed_positive_label_count: i64,
    pub matched_rejected_label_count: i64,
    pub clean_rejected_label_count: i64,
    pub unlabeled_candidate_count: i64,
    pub reviewed_precision: Option<f64>,
    pub reviewed_recall: Option<f64>,
    pub reviewed_false_positive_rate: Option<f64>,
    pub candidate_analysis_run_id: Option<Uuid>,
    pub frame_tolerance: i32,
    pub time_tolerance_seconds: f64,
    pub filters: Value,
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

pub async fn list_event_types() -> Result<Json<EventTypesResponse>, ApiError> {
    Ok(Json(EventTypesResponse {
        event_types: code_defined_event_types(),
    }))
}

pub async fn event_review_playlist(
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<EventReviewPlaylist>, ApiError> {
    let query = MechanicEventsQuery::from_raw_query(raw_query.as_deref())?;
    let db = require_db(&state)?;
    let filters = MechanicEventFilters::from_query(query)?;
    let events = find_mechanic_events(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(build_review_playlist(
        events,
        "Rocket Sense events review".to_owned(),
        &filters,
        None,
    )))
}

pub async fn event_review_evaluation(
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<EventReviewEvaluationResponse>, ApiError> {
    let query = MechanicEventsQuery::from_raw_query(raw_query.as_deref())?;
    let db = require_db(&state)?;
    let filters = MechanicEventFilters::from_query(query)?;
    let options = EventEvaluationOptions::from_raw_query(raw_query.as_deref())?;
    let evaluation = evaluate_reviewed_events(db, &filters, &options)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(evaluation))
}

pub async fn list_saved_event_playlists(
    State(state): State<AppState>,
) -> Result<Json<SavedEventReviewPlaylistsResponse>, ApiError> {
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

    Ok(Json(SavedEventReviewPlaylistsResponse {
        count: playlists.len() as u32,
        playlists,
    }))
}

pub async fn create_saved_event_playlist(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<CreateEventReviewPlaylistRequest>,
) -> Result<(StatusCode, Json<SavedEventReviewPlaylistResponse>), ApiError> {
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

pub async fn get_saved_event_playlist(
    State(state): State<AppState>,
    Path(playlist_id): Path<Uuid>,
) -> Result<Json<SavedEventReviewPlaylistResponse>, ApiError> {
    let playlist = get_saved_playlist(require_db(&state)?, playlist_id).await?;
    Ok(Json(playlist))
}

pub async fn saved_event_playlist_manifest(
    State(state): State<AppState>,
    Path(playlist_id): Path<Uuid>,
) -> Result<Json<EventReviewPlaylist>, ApiError> {
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
    let reviewed_event_type_key = request
        .reviewed_mechanic
        .as_deref()
        .map(normalize_reviewed_event_type_key)
        .transpose()?;
    validate_review_request(&request)?;

    let row = sqlx::query(
        r#"
        WITH target_event AS (
            SELECT
                event.id,
                event.replay_id,
                event.analysis_run_id,
                event.source,
                event.source_stream,
                event.source_index,
                event.source_event_id,
                event.primary_subject_kind,
                event.primary_subject_id,
                event.team,
                event.start_frame,
                event.end_frame,
                event.event_frame,
                event.start_time,
                event.end_time,
                event.event_time,
                event.duration_seconds,
                event.confidence,
                event.created_at,
                event_type.key AS event_type_key,
                event_type.display_name AS event_type_label,
                event_type.category AS event_category,
                payload.payload,
                attributes.attributes,
                mechanic_detail.mechanic,
                mechanic_detail.properties AS mechanic_properties
            FROM play_events event
            JOIN event_types event_type
              ON event_type.id = event.event_type_id
            LEFT JOIN play_event_payloads payload
              ON payload.event_id = event.id
            LEFT JOIN play_event_attributes attributes
              ON attributes.event_id = event.id
            LEFT JOIN play_event_mechanic_details mechanic_detail
              ON mechanic_detail.event_id = event.id
            WHERE event.id = $1
        )
        INSERT INTO event_reviews (
            id,
            event_id,
            replay_id,
            reviewer_user_id,
            status,
            reviewed_event_type_key,
            reviewed_subject_kind,
            reviewed_subject_id,
            reviewed_start_frame,
            reviewed_end_frame,
            reviewed_event_frame,
            confidence,
            notes,
            event_snapshot
        )
        SELECT
            $2,
            target_event.id,
            target_event.replay_id,
            $3,
            $4,
            COALESCE($5, target_event.event_type_key),
            COALESCE($6, target_event.primary_subject_kind),
            COALESCE($7, target_event.primary_subject_id),
            COALESCE($8, target_event.start_frame),
            COALESCE($9, target_event.end_frame),
            COALESCE($10, target_event.event_frame),
            COALESCE($11, target_event.confidence),
            $12,
            jsonb_strip_nulls(jsonb_build_object(
                'id', target_event.id,
                'analysisRunId', target_event.analysis_run_id,
                'replayId', target_event.replay_id,
                'eventType', jsonb_build_object(
                    'key', target_event.event_type_key,
                    'displayName', target_event.event_type_label,
                    'category', target_event.event_category
                ),
                'source', target_event.source,
                'sourceStream', target_event.source_stream,
                'sourceIndex', target_event.source_index,
                'sourceEventId', target_event.source_event_id,
                'primarySubject', CASE
                    WHEN target_event.primary_subject_kind IS NULL THEN NULL
                    ELSE jsonb_build_object(
                        'kind', target_event.primary_subject_kind,
                        'id', target_event.primary_subject_id
                    )
                END,
                'team', target_event.team,
                'frames', jsonb_strip_nulls(jsonb_build_object(
                    'start', target_event.start_frame,
                    'end', target_event.end_frame,
                    'event', target_event.event_frame
                )),
                'times', jsonb_strip_nulls(jsonb_build_object(
                    'start', target_event.start_time,
                    'end', target_event.end_time,
                    'event', target_event.event_time,
                    'duration', target_event.duration_seconds
                )),
                'confidence', target_event.confidence,
                'payload', COALESCE(target_event.payload, '{}'::jsonb),
                'attributes', COALESCE(target_event.attributes, '{}'::jsonb),
                'mechanicDetails', CASE
                    WHEN target_event.mechanic IS NULL THEN NULL
                    ELSE jsonb_build_object(
                        'mechanic', target_event.mechanic,
                        'properties', target_event.mechanic_properties
                    )
                END,
                'createdAt', target_event.created_at
            ))
        FROM target_event
        RETURNING id, event_id AS mechanic_event_id, replay_id, reviewer_user_id, status, created_at
        "#,
    )
    .bind(event_id)
    .bind(Uuid::now_v7())
    .bind(auth_user.id)
    .bind(&status)
    .bind(reviewed_event_type_key.as_deref())
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

/// Source tag stored in `event_snapshot.source` for human-authored missed
/// events, so they are distinguishable from detector-backed reviews.
pub(crate) const MISSED_EVENT_REVIEW_SOURCE: &str = "rocket-sense:manual-missed";

pub async fn create_missed_event_review(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<CreateMissedEventReviewRequest>,
) -> Result<(StatusCode, Json<MissedEventReviewResponse>), ApiError> {
    let db = require_db(&state)?;
    upsert_user(db, &auth_user)
        .await
        .map_err(ApiError::internal)?;

    let status = match request.status.as_deref() {
        Some(raw) => normalize_review_status(raw)?,
        None => "confirmed".to_owned(),
    };
    let reviewed_event_type_key = normalize_reviewed_event_type_key(&request.reviewed_mechanic)?;
    validate_missed_event_review_request(&request)?;

    let event_snapshot =
        build_missed_event_snapshot(&request, &reviewed_event_type_key, &status, auth_user.id);

    // INSERT ... SELECT FROM replays gates on the replay existing: a bogus
    // replay_id yields zero rows (404) rather than a foreign-key 500.
    let row = sqlx::query(
        r#"
        INSERT INTO event_reviews (
            id,
            event_id,
            replay_id,
            reviewer_user_id,
            status,
            reviewed_event_type_key,
            reviewed_subject_kind,
            reviewed_subject_id,
            reviewed_start_frame,
            reviewed_end_frame,
            reviewed_event_frame,
            confidence,
            notes,
            event_snapshot
        )
        SELECT
            $1,
            NULL,
            replay.id,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13
        FROM replays replay
        WHERE replay.id = $2
        RETURNING
            id,
            event_id,
            replay_id,
            reviewer_user_id,
            status,
            reviewed_event_type_key,
            reviewed_event_frame,
            created_at
        "#,
    )
    .bind(Uuid::now_v7())
    .bind(request.replay_id)
    .bind(auth_user.id)
    .bind(&status)
    .bind(&reviewed_event_type_key)
    .bind(request.reviewed_subject_kind.as_deref())
    .bind(request.reviewed_subject_id.as_deref())
    .bind(request.reviewed_start_frame)
    .bind(request.reviewed_end_frame)
    .bind(request.reviewed_event_frame)
    .bind(request.confidence)
    .bind(request.notes.as_deref())
    .bind(event_snapshot)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "replay not found"))?;

    Ok((
        StatusCode::CREATED,
        Json(MissedEventReviewResponse {
            id: row.try_get("id").map_err(ApiError::internal)?,
            event_id: row.try_get("event_id").map_err(ApiError::internal)?,
            replay_id: row.try_get("replay_id").map_err(ApiError::internal)?,
            reviewer_user_id: row
                .try_get("reviewer_user_id")
                .map_err(ApiError::internal)?,
            status: row.try_get("status").map_err(ApiError::internal)?,
            reviewed_event_type_key: row
                .try_get("reviewed_event_type_key")
                .map_err(ApiError::internal)?,
            reviewed_event_frame: row
                .try_get("reviewed_event_frame")
                .map_err(ApiError::internal)?,
            created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        }),
    ))
}

fn build_missed_event_snapshot(
    request: &CreateMissedEventReviewRequest,
    reviewed_event_type_key: &str,
    status: &str,
    reviewer_user_id: Uuid,
) -> Value {
    let mut frames = serde_json::Map::new();
    frames.insert(
        "event".to_owned(),
        Value::from(request.reviewed_event_frame),
    );
    if let Some(start) = request.reviewed_start_frame {
        frames.insert("start".to_owned(), Value::from(start));
    }
    if let Some(end) = request.reviewed_end_frame {
        frames.insert("end".to_owned(), Value::from(end));
    }

    let primary_subject = match (
        request.reviewed_subject_kind.as_deref(),
        request.reviewed_subject_id.as_deref(),
    ) {
        (Some(kind), id) => serde_json::json!({ "kind": kind, "id": id }),
        _ => Value::Null,
    };

    let mut snapshot = serde_json::Map::new();
    snapshot.insert("source".to_owned(), Value::from(MISSED_EVENT_REVIEW_SOURCE));
    snapshot.insert("authored".to_owned(), Value::Bool(true));
    snapshot.insert("status".to_owned(), Value::from(status));
    snapshot.insert(
        "replayId".to_owned(),
        Value::from(request.replay_id.to_string()),
    );
    snapshot.insert(
        "reviewerUserId".to_owned(),
        Value::from(reviewer_user_id.to_string()),
    );
    snapshot.insert(
        "eventType".to_owned(),
        serde_json::json!({ "key": reviewed_event_type_key }),
    );
    if !primary_subject.is_null() {
        snapshot.insert("primarySubject".to_owned(), primary_subject);
    }
    snapshot.insert("frames".to_owned(), Value::Object(frames));
    if let Some(time) = request.reviewed_event_time {
        snapshot.insert("times".to_owned(), serde_json::json!({ "event": time }));
    }
    if let Some(confidence) = request.confidence {
        snapshot.insert("confidence".to_owned(), serde_json::json!(confidence));
    }
    if let Some(notes) = request.notes.as_deref() {
        snapshot.insert("notes".to_owned(), Value::from(notes));
    }
    if let Some(context) = request.context.clone() {
        snapshot.insert("context".to_owned(), context);
    }

    Value::Object(snapshot)
}

fn validate_missed_event_review_request(
    request: &CreateMissedEventReviewRequest,
) -> Result<(), ApiError> {
    if let Some(kind) = request.reviewed_subject_kind.as_deref() {
        if !matches!(
            kind,
            "replay" | "team" | "player" | "ball" | "boost_pad" | "segment"
        ) {
            return Err(ApiError::bad_request(
                "reviewed_subject_kind must be one of replay, team, player, ball, boost_pad, segment",
            ));
        }
    }
    if let Some(confidence) = request.confidence {
        if !(0.0..=1.0).contains(&confidence) {
            return Err(ApiError::bad_request(
                "confidence must be between 0.0 and 1.0",
            ));
        }
    }
    if request.reviewed_event_frame < 0 {
        return Err(ApiError::bad_request(
            "reviewed_event_frame must be non-negative",
        ));
    }
    if let (Some(start), Some(end)) = (request.reviewed_start_frame, request.reviewed_end_frame) {
        if end < start {
            return Err(ApiError::bad_request(
                "reviewed_end_frame must be greater than or equal to reviewed_start_frame",
            ));
        }
    }
    if let Some(start) = request.reviewed_start_frame {
        if request.reviewed_event_frame < start {
            return Err(ApiError::bad_request(
                "reviewed_event_frame must be within [reviewed_start_frame, reviewed_end_frame]",
            ));
        }
    }
    if let Some(end) = request.reviewed_end_frame {
        if request.reviewed_event_frame > end {
            return Err(ApiError::bad_request(
                "reviewed_event_frame must be within [reviewed_start_frame, reviewed_end_frame]",
            ));
        }
    }
    Ok(())
}

fn saved_playlist_from_row(
    row: sqlx::postgres::PgRow,
) -> Result<SavedEventReviewPlaylistResponse, ApiError> {
    let id: Uuid = row.try_get("id").map_err(ApiError::internal)?;
    Ok(SavedEventReviewPlaylistResponse {
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
        manifest_url: format!("/api/v1/events/playlists/{id}/manifest"),
    })
}

async fn get_saved_playlist(
    pool: &PgPool,
    playlist_id: Uuid,
) -> Result<SavedEventReviewPlaylistResponse, ApiError> {
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
    .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "events review playlist not found"))?;

    saved_playlist_from_row(row)
}

struct MechanicEventFilters {
    search_pattern: Option<String>,
    event_ids: Vec<Uuid>,
    mechanics: Vec<String>,
    event_categories: Vec<String>,
    detectors: Vec<String>,
    player_name_patterns: Vec<String>,
    player_ids: Vec<String>,
    playlists: Vec<String>,
    maps: Vec<String>,
    pro: Option<bool>,
    uploader_user_id: Option<Uuid>,
    group_id: Option<Uuid>,
    project_id: Option<Uuid>,
    review_status: Option<String>,
    min_confidence: Option<f64>,
    replay_id: Option<Uuid>,
    created_after: Option<DateTime<Utc>>,
    created_before: Option<DateTime<Utc>>,
    replay_date_after: Option<DateTime<Utc>>,
    replay_date_before: Option<DateTime<Utc>>,
    event_created_after: Option<DateTime<Utc>>,
    event_created_before: Option<DateTime<Utc>>,
    count: u32,
    offset: u32,
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct EventEvaluationOptions {
    candidate_analysis_run_id: Option<Uuid>,
    frame_tolerance: i32,
    time_tolerance_seconds: f64,
}

impl Default for EventEvaluationOptions {
    fn default() -> Self {
        Self {
            candidate_analysis_run_id: None,
            frame_tolerance: 90,
            time_tolerance_seconds: 3.0,
        }
    }
}

impl EventEvaluationOptions {
    fn from_raw_query(query: Option<&str>) -> Result<Self, ApiError> {
        let mut options = Self::default();

        for (key, value) in query
            .into_iter()
            .flat_map(|query| url::form_urlencoded::parse(query.as_bytes()))
        {
            let value = value.trim();
            if value.is_empty() {
                continue;
            }
            match key.strip_suffix("[]").unwrap_or(key.as_ref()) {
                "candidate-analysis-run"
                | "candidate-analysis-run-id"
                | "analysis-run"
                | "analysis-run-id" => {
                    options.candidate_analysis_run_id =
                        Some(Uuid::parse_str(value).map_err(|_| {
                            ApiError::bad_request("analysis-run-id must be a UUID")
                        })?);
                }
                "frame-tolerance" | "frameTolerance" => {
                    options.frame_tolerance = value
                        .parse::<i32>()
                        .map_err(|_| ApiError::bad_request("frame-tolerance must be an integer"))?;
                    if options.frame_tolerance < 0 {
                        return Err(ApiError::bad_request(
                            "frame-tolerance must be greater than or equal to zero",
                        ));
                    }
                }
                "time-tolerance" | "time-tolerance-seconds" | "timeToleranceSeconds" => {
                    options.time_tolerance_seconds = value.parse::<f64>().map_err(|_| {
                        ApiError::bad_request("time-tolerance-seconds must be a number")
                    })?;
                    if options.time_tolerance_seconds < 0.0 {
                        return Err(ApiError::bad_request(
                            "time-tolerance-seconds must be greater than or equal to zero",
                        ));
                    }
                }
                _ => {}
            }
        }

        Ok(options)
    }
}

impl Default for MechanicEventFilters {
    fn default() -> Self {
        Self {
            search_pattern: None,
            event_ids: Vec::new(),
            mechanics: Vec::new(),
            event_categories: Vec::new(),
            detectors: Vec::new(),
            player_name_patterns: Vec::new(),
            player_ids: Vec::new(),
            playlists: Vec::new(),
            maps: Vec::new(),
            pro: None,
            uploader_user_id: None,
            group_id: None,
            project_id: None,
            review_status: None,
            min_confidence: None,
            replay_id: None,
            created_after: None,
            created_before: None,
            replay_date_after: None,
            replay_date_before: None,
            event_created_after: None,
            event_created_before: None,
            count: DEFAULT_EVENT_REVIEW_PAGE_SIZE,
            offset: 0,
        }
    }
}

impl MechanicEventFilters {
    fn from_query(query: MechanicEventsQuery) -> Result<Self, ApiError> {
        let search = query
            .q
            .or(query.title)
            .map(|term| term.trim().to_owned())
            .filter(|term| !term.is_empty());
        let mut player_ids = normalize_terms(query.player_ids);
        if let Some(player_id) = query.player_id {
            player_ids.push(player_id);
        }
        player_ids = normalize_terms(player_ids);
        player_ids.sort();
        player_ids.dedup();
        let mut playlists = normalize_terms(query.playlist);
        playlists.extend(normalize_terms(query.game_modes));
        playlists.sort();
        playlists.dedup();
        let review_status = match query.review_status {
            Some(status) => normalize_review_status_filter(&status)?,
            None => None,
        };
        if let Some(confidence) = query.min_confidence {
            if !(0.0..=1.0).contains(&confidence) {
                return Err(ApiError::bad_request(
                    "min-confidence must be between 0.0 and 1.0",
                ));
            }
        }

        Ok(Self {
            search_pattern: search.map(|term| format!("%{}%", escape_like_term(&term))),
            event_ids: query.event_ids,
            mechanics: normalize_event_type_keys(query.mechanic),
            event_categories: normalize_terms(query.event_category),
            detectors: normalize_terms(query.detector),
            player_name_patterns: normalize_terms(query.player_names)
                .into_iter()
                .map(|term| format!("%{}%", escape_like_term(&term)))
                .collect(),
            player_ids,
            playlists,
            maps: normalize_terms(query.maps),
            pro: query.pro,
            uploader_user_id: query
                .uploader
                .map(|uploader| parse_review_uuid_filter("uploader", &uploader))
                .transpose()?,
            group_id: query
                .group
                .map(|group| parse_review_uuid_filter("group", &group))
                .transpose()?,
            project_id: query
                .project
                .map(|project| parse_review_uuid_filter("project", &project))
                .transpose()?,
            review_status,
            min_confidence: query.min_confidence,
            replay_id: query.replay_id,
            created_after: query.created_after,
            created_before: query.created_before,
            replay_date_after: query.replay_date_after,
            replay_date_before: query.replay_date_before,
            event_created_after: query.event_created_after,
            event_created_before: query.event_created_before,
            count: query
                .count
                .unwrap_or(DEFAULT_EVENT_REVIEW_PAGE_SIZE)
                .clamp(1, MAX_EVENT_REVIEW_PAGE_SIZE),
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
            .unwrap_or_else(|| "event".to_owned())
            .trim()
            .to_owned();
        if entity != "event" && entity != "mechanic_event" {
            return Err(ApiError::bad_request(
                "playlist spec source entity must be event",
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
                    filters.count = filters
                        .count
                        .max(filters.event_ids.len() as u32)
                        .min(MAX_EVENT_REVIEW_PAGE_SIZE);
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
        let mechanics = json_string_vec(
            object
                .get("eventTypes")
                .or_else(|| object.get("event-types"))
                .or_else(|| object.get("eventType"))
                .or_else(|| object.get("event-type"))
                .or_else(|| object.get("mechanics"))
                .or_else(|| object.get("mechanic")),
        )?;
        let detectors =
            json_string_vec(object.get("detectors").or_else(|| object.get("detector")))?;
        let search = json_string(object.get("q").or_else(|| object.get("title")))?
            .map(|term| term.trim().to_owned())
            .filter(|term| !term.is_empty());
        let player_names = json_string_vec(
            object
                .get("playerNames")
                .or_else(|| object.get("player-names"))
                .or_else(|| object.get("playerName"))
                .or_else(|| object.get("player-name")),
        )?;
        let mut player_ids = json_string_vec(
            object
                .get("playerIds")
                .or_else(|| object.get("player-ids"))
                .or_else(|| object.get("playerId"))
                .or_else(|| object.get("player-id"))
                .or_else(|| object.get("primaryPlayerId"))
                .or_else(|| object.get("primary-player-id")),
        )?;
        player_ids.sort();
        player_ids.dedup();
        let mut playlists = json_string_vec(
            object
                .get("playlists")
                .or_else(|| object.get("playlist"))
                .or_else(|| object.get("gameModes"))
                .or_else(|| object.get("game-modes"))
                .or_else(|| object.get("gameMode"))
                .or_else(|| object.get("game-mode")),
        )?;
        playlists.sort();
        playlists.dedup();
        let maps = json_string_vec(object.get("maps").or_else(|| object.get("map")))?;
        let event_categories = json_string_vec(
            object
                .get("eventCategories")
                .or_else(|| object.get("event-categories"))
                .or_else(|| object.get("eventCategory"))
                .or_else(|| object.get("event-category"))
                .or_else(|| object.get("categories"))
                .or_else(|| object.get("category")),
        )?;
        let event_ids = json_uuid_vec(object.get("eventIds").or_else(|| object.get("event-id")))?;
        let review_status = match json_string(
            object
                .get("reviewStatus")
                .or_else(|| object.get("review-status")),
        )? {
            Some(status) => normalize_review_status_filter(&status)?,
            None => None,
        };
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
        let pro = json_bool(object.get("pro"))?;
        let uploader_user_id = json_string(object.get("uploader"))?
            .map(|value| parse_review_uuid_filter("uploader", &value))
            .transpose()?;
        let group_id = json_string(object.get("group").or_else(|| object.get("groupId")))?
            .map(|value| parse_review_uuid_filter("group", &value))
            .transpose()?;
        let project_id = json_string(object.get("project").or_else(|| object.get("projectId")))?
            .map(|value| parse_review_uuid_filter("project", &value))
            .transpose()?;
        let created_after = json_datetime(
            "created-after",
            object
                .get("createdAfter")
                .or_else(|| object.get("created-after")),
        )?;
        let created_before = json_datetime(
            "created-before",
            object
                .get("createdBefore")
                .or_else(|| object.get("created-before")),
        )?;
        let replay_date_after = json_datetime(
            "replay-date-after",
            object
                .get("replayDateAfter")
                .or_else(|| object.get("replay-date-after")),
        )?;
        let replay_date_before = json_datetime(
            "replay-date-before",
            object
                .get("replayDateBefore")
                .or_else(|| object.get("replay-date-before")),
        )?;
        let event_created_after = json_datetime(
            "event-created-after",
            object
                .get("eventCreatedAfter")
                .or_else(|| object.get("event-created-after")),
        )?;
        let event_created_before = json_datetime(
            "event-created-before",
            object
                .get("eventCreatedBefore")
                .or_else(|| object.get("event-created-before")),
        )?;
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
        .unwrap_or(DEFAULT_EVENT_REVIEW_PAGE_SIZE)
        .clamp(1, MAX_EVENT_REVIEW_PAGE_SIZE);
        let offset = json_u32(
            page_object
                .and_then(|page| page.get("offset"))
                .or_else(|| object.get("offset")),
        )?
        .unwrap_or(0);

        Ok(Self {
            search_pattern: search.map(|term| format!("%{}%", escape_like_term(&term))),
            event_ids,
            mechanics: normalize_event_type_keys(mechanics),
            event_categories: normalize_terms(event_categories),
            detectors: normalize_terms(detectors),
            player_name_patterns: normalize_terms(player_names)
                .into_iter()
                .map(|term| format!("%{}%", escape_like_term(&term)))
                .collect(),
            player_ids: normalize_terms(player_ids),
            playlists: normalize_terms(playlists),
            maps: normalize_terms(maps),
            pro,
            uploader_user_id,
            group_id,
            project_id,
            review_status,
            min_confidence,
            replay_id,
            created_after,
            created_before,
            replay_date_after,
            replay_date_before,
            event_created_after,
            event_created_before,
            count,
            offset,
        })
    }

    fn event_type_keys(&self) -> Vec<String> {
        let mut keys = self.mechanics.clone();
        keys.sort();
        keys.dedup();
        keys
    }
}

fn event_review_playlist_url(filters: &MechanicEventFilters) -> String {
    event_review_playlist_url_with_offset(filters, filters.offset)
}

fn event_review_playlist_url_with_offset(filters: &MechanicEventFilters, offset: u32) -> String {
    let mut query = url::form_urlencoded::Serializer::new(String::new());
    if let Some(pattern) = &filters.search_pattern {
        query.append_pair("q", &unescape_like_pattern(pattern));
    }
    for event_id in &filters.event_ids {
        query.append_pair("event-id", &event_id.to_string());
    }
    for mechanic in &filters.mechanics {
        query.append_pair("event-type", mechanic);
    }
    for category in &filters.event_categories {
        query.append_pair("event-category", category);
    }
    for detector in &filters.detectors {
        query.append_pair("detector", detector);
    }
    for pattern in &filters.player_name_patterns {
        query.append_pair("player-name", &unescape_like_pattern(pattern));
    }
    for player_id in &filters.player_ids {
        query.append_pair("player-id", player_id);
    }
    for playlist in &filters.playlists {
        query.append_pair("playlist", playlist);
    }
    for map in &filters.maps {
        query.append_pair("map", map);
    }
    if let Some(pro) = filters.pro {
        query.append_pair("pro", if pro { "true" } else { "false" });
    }
    if let Some(uploader_user_id) = filters.uploader_user_id {
        query.append_pair("uploader", &uploader_user_id.to_string());
    }
    if let Some(group_id) = filters.group_id {
        query.append_pair("group", &group_id.to_string());
    }
    if let Some(project_id) = filters.project_id {
        query.append_pair("project", &project_id.to_string());
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
    if let Some(created_after) = filters.created_after {
        query.append_pair("created-after", &created_after.to_rfc3339());
    }
    if let Some(created_before) = filters.created_before {
        query.append_pair("created-before", &created_before.to_rfc3339());
    }
    if let Some(replay_date_after) = filters.replay_date_after {
        query.append_pair("replay-date-after", &replay_date_after.to_rfc3339());
    }
    if let Some(replay_date_before) = filters.replay_date_before {
        query.append_pair("replay-date-before", &replay_date_before.to_rfc3339());
    }
    if let Some(event_created_after) = filters.event_created_after {
        query.append_pair("event-created-after", &event_created_after.to_rfc3339());
    }
    if let Some(event_created_before) = filters.event_created_before {
        query.append_pair("event-created-before", &event_created_before.to_rfc3339());
    }
    query.append_pair("count", &filters.count.to_string());
    query.append_pair("offset", &offset.to_string());

    let query_string = query.finish();
    if query_string.is_empty() {
        "/api/v1/events/review-playlist".to_owned()
    } else {
        format!("/api/v1/events/review-playlist?{query_string}")
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
                "entity": "event",
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
            "entity": "event",
            "filters": {
                "q": filters.search_pattern.as_ref().map(|pattern| unescape_like_pattern(pattern)),
                "eventIds": filters.event_ids,
                "eventTypes": filters.mechanics,
                "eventCategories": filters.event_categories,
                "detectors": filters.detectors,
                "playerNames": filters.player_name_patterns.iter().map(|pattern| unescape_like_pattern(pattern)).collect::<Vec<_>>(),
                "playerIds": filters.player_ids,
                "playlists": filters.playlists,
                "maps": filters.maps,
                "pro": filters.pro,
                "uploader": filters.uploader_user_id,
                "group": filters.group_id,
                "project": filters.project_id,
                "reviewStatus": filters.review_status,
                "minConfidence": filters.min_confidence,
                "replayId": filters.replay_id,
                "createdAfter": filters.created_after,
                "createdBefore": filters.created_before,
                "replayDateAfter": filters.replay_date_after,
                "replayDateBefore": filters.replay_date_before,
                "eventCreatedAfter": filters.event_created_after,
                "eventCreatedBefore": filters.event_created_before,
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

fn json_bool(value: Option<&Value>) -> Result<Option<bool>, ApiError> {
    match value {
        None | Some(Value::Null) => Ok(None),
        Some(Value::Bool(value)) => Ok(Some(*value)),
        Some(Value::String(value)) => {
            parse_review_bool_filter("playlist spec boolean", value).map(Some)
        }
        Some(_) => Err(ApiError::bad_request(
            "playlist spec field must be a boolean when provided",
        )),
    }
}

fn json_datetime(name: &str, value: Option<&Value>) -> Result<Option<DateTime<Utc>>, ApiError> {
    json_string(value)?
        .map(|value| parse_review_datetime_filter(name, &value))
        .transpose()
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

async fn evaluate_reviewed_events(
    pool: &PgPool,
    filters: &MechanicEventFilters,
    options: &EventEvaluationOptions,
) -> Result<EventReviewEvaluationResponse, sqlx::Error> {
    let event_type_keys = filters.event_type_keys();
    let mut builder = QueryBuilder::<Postgres>::new(
        r#"
        WITH review_label_values AS (
            SELECT
                review.id,
                review.event_id,
                review.replay_id,
                review.status,
                review.created_at,
                COALESCE(
                    review.reviewed_event_type_key,
                    review.event_snapshot #>> '{eventType,key}'
                ) AS event_type_key,
                COALESCE(
                    review.reviewed_subject_kind,
                    review.event_snapshot #>> '{primarySubject,kind}'
                ) AS subject_kind,
                COALESCE(
                    review.reviewed_subject_id,
                    review.event_snapshot #>> '{primarySubject,id}'
                ) AS subject_id,
                COALESCE(
                    review.reviewed_start_frame,
                    NULLIF(review.event_snapshot #>> '{frames,start}', '')::integer
                ) AS start_frame,
                COALESCE(
                    review.reviewed_end_frame,
                    NULLIF(review.event_snapshot #>> '{frames,end}', '')::integer
                ) AS end_frame,
                COALESCE(
                    review.reviewed_event_frame,
                    NULLIF(review.event_snapshot #>> '{frames,event}', '')::integer
                ) AS event_frame,
                NULLIF(review.event_snapshot #>> '{times,start}', '')::double precision AS start_time,
                NULLIF(review.event_snapshot #>> '{times,end}', '')::double precision AS end_time,
                NULLIF(review.event_snapshot #>> '{times,event}', '')::double precision AS event_time
            FROM event_reviews review
            JOIN replays replay
              ON replay.id = review.replay_id
            LEFT JOIN replay_players review_player
              ON review_player.replay_id = review.replay_id
             AND review_player.platform IS NOT NULL
             AND review_player.platform_player_id IS NOT NULL
             AND concat(review_player.platform, ':', review_player.platform_player_id) = COALESCE(
                    review.reviewed_subject_id,
                    review.event_snapshot #>> '{primarySubject,id}'
                 )
            WHERE review.status IN ('confirmed', 'corrected', 'rejected')
        "#,
    );
    push_evaluation_label_filters(&mut builder, filters, &event_type_keys);
    builder.push(
        r#"
        ),
        latest_labels AS (
            SELECT *
            FROM (
                SELECT
                    review_label_values.*,
                    row_number() OVER (
                        PARTITION BY
                            replay_id,
                            event_type_key,
                            COALESCE(subject_kind, ''),
                            COALESCE(subject_id, ''),
                            COALESCE(start_frame, -1),
                            COALESCE(end_frame, -1),
                            COALESCE(event_frame, -1),
                            status
                        ORDER BY created_at DESC, id DESC
                    ) AS label_rank
                FROM review_label_values
                WHERE event_type_key IS NOT NULL
            ) ranked_labels
            WHERE label_rank = 1
        ),
        candidate_events AS (
            SELECT
                event.id,
                event.replay_id,
                event_type.key AS event_type_key,
                event.primary_subject_kind AS subject_kind,
                event.primary_subject_id AS subject_id,
                event.start_frame,
                event.end_frame,
                event.event_frame,
                event.start_time,
                event.end_time,
                event.event_time
            FROM play_events event
            JOIN event_types event_type
              ON event_type.id = event.event_type_id
            JOIN replays replay
              ON replay.id = event.replay_id
            LEFT JOIN replay_players candidate_player
              ON candidate_player.replay_id = event.replay_id
             AND event.primary_subject_kind = 'player'
             AND candidate_player.platform IS NOT NULL
             AND candidate_player.platform_player_id IS NOT NULL
             AND concat(candidate_player.platform, ':', candidate_player.platform_player_id) = event.primary_subject_id
            WHERE (
                (
        "#,
    );
    builder
        .push_bind(options.candidate_analysis_run_id)
        .push(
            r#"::uuid IS NULL
                  AND event.analysis_run_id = replay.canonical_analysis_run_id
                )
                OR event.analysis_run_id =
        "#,
        )
        .push_bind(options.candidate_analysis_run_id)
        .push(
            r#"
            )
        "#,
        );
    push_evaluation_candidate_filters(&mut builder, filters, &event_type_keys);
    builder
        .push(
            r#"
        ),
        label_matches AS (
            SELECT DISTINCT
                label.id AS label_id,
                candidate.id AS candidate_id
            FROM latest_labels label
            JOIN candidate_events candidate
              ON candidate.replay_id = label.replay_id
             AND candidate.event_type_key = label.event_type_key
             AND (
                    label.subject_kind IS NULL
                 OR label.subject_id IS NULL
                 OR (
                        candidate.subject_kind = label.subject_kind
                    AND candidate.subject_id = label.subject_id
                 )
             )
             AND (
                    (
                        COALESCE(candidate.event_frame, candidate.start_frame, candidate.end_frame) IS NOT NULL
                    AND COALESCE(label.event_frame, label.start_frame, label.end_frame) IS NOT NULL
                    AND abs(
                            COALESCE(candidate.event_frame, candidate.start_frame, candidate.end_frame)
                          - COALESCE(label.event_frame, label.start_frame, label.end_frame)
                        ) <=
        "#,
        )
        .push_bind(options.frame_tolerance)
        .push(
            r#"
                    )
                 OR (
                        COALESCE(candidate.event_time, candidate.start_time, candidate.end_time) IS NOT NULL
                    AND COALESCE(label.event_time, label.start_time, label.end_time) IS NOT NULL
                    AND abs(
                            COALESCE(candidate.event_time, candidate.start_time, candidate.end_time)
                          - COALESCE(label.event_time, label.start_time, label.end_time)
                        ) <=
        "#,
        )
        .push_bind(options.time_tolerance_seconds)
        .push(
            r#"
                    )
             )
        ),
        summary AS (
            SELECT
                (SELECT count(*) FROM latest_labels) AS label_count,
                (SELECT count(*) FROM latest_labels WHERE status IN ('confirmed', 'corrected')) AS positive_label_count,
                (SELECT count(*) FROM latest_labels WHERE status = 'rejected') AS rejected_label_count,
                (SELECT count(*) FROM candidate_events) AS candidate_count,
                (
                    SELECT count(DISTINCT match.label_id)
                    FROM label_matches match
                    JOIN latest_labels label
                      ON label.id = match.label_id
                    WHERE label.status IN ('confirmed', 'corrected')
                ) AS matched_positive_label_count,
                (
                    SELECT count(DISTINCT match.label_id)
                    FROM label_matches match
                    JOIN latest_labels label
                      ON label.id = match.label_id
                    WHERE label.status = 'rejected'
                ) AS matched_rejected_label_count,
                (
                    SELECT count(*)
                    FROM candidate_events candidate
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM label_matches match
                        WHERE match.candidate_id = candidate.id
                    )
                ) AS unlabeled_candidate_count
        )
        SELECT *
        FROM summary
        "#,
        );

    let row = builder.build().fetch_one(pool).await?;
    let positive_label_count: i64 = row.try_get("positive_label_count")?;
    let rejected_label_count: i64 = row.try_get("rejected_label_count")?;
    let matched_positive_label_count: i64 = row.try_get("matched_positive_label_count")?;
    let matched_rejected_label_count: i64 = row.try_get("matched_rejected_label_count")?;
    let label_count = row.try_get("label_count")?;
    let candidate_count = row.try_get("candidate_count")?;
    let unlabeled_candidate_count = row.try_get("unlabeled_candidate_count")?;
    let missed_positive_label_count = positive_label_count - matched_positive_label_count;
    let clean_rejected_label_count = rejected_label_count - matched_rejected_label_count;

    Ok(EventReviewEvaluationResponse {
        label_count,
        positive_label_count,
        rejected_label_count,
        candidate_count,
        matched_positive_label_count,
        missed_positive_label_count,
        matched_rejected_label_count,
        clean_rejected_label_count,
        unlabeled_candidate_count,
        reviewed_precision: ratio(
            matched_positive_label_count,
            matched_positive_label_count + matched_rejected_label_count,
        ),
        reviewed_recall: ratio(matched_positive_label_count, positive_label_count),
        reviewed_false_positive_rate: ratio(matched_rejected_label_count, rejected_label_count),
        candidate_analysis_run_id: options.candidate_analysis_run_id,
        frame_tolerance: options.frame_tolerance,
        time_tolerance_seconds: options.time_tolerance_seconds,
        filters: playlist_spec_from_filters(filters)["source"]["filters"].clone(),
    })
}

fn push_evaluation_label_filters<'a>(
    builder: &mut QueryBuilder<'a, Postgres>,
    filters: &'a MechanicEventFilters,
    event_type_keys: &'a [String],
) {
    if !filters.event_ids.is_empty() {
        builder
            .push(" AND review.event_id = ANY(")
            .push_bind(&filters.event_ids)
            .push(")");
    }
    if !event_type_keys.is_empty() {
        builder
            .push(" AND COALESCE(review.reviewed_event_type_key, review.event_snapshot #>> '{eventType,key}') = ANY(")
            .push_bind(event_type_keys)
            .push(")");
    }
    if !filters.event_categories.is_empty() {
        builder
            .push(" AND review.event_snapshot #>> '{eventType,category}' = ANY(")
            .push_bind(&filters.event_categories)
            .push(")");
    }
    if !filters.detectors.is_empty() {
        builder
            .push(" AND review.event_snapshot #>> '{source}' = ANY(")
            .push_bind(&filters.detectors)
            .push(")");
    }
    for pattern in &filters.player_name_patterns {
        builder
            .push(" AND review_player.name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\'");
    }
    if !filters.player_ids.is_empty() {
        builder
            .push(" AND COALESCE(review.reviewed_subject_kind, review.event_snapshot #>> '{primarySubject,kind}') = 'player' AND COALESCE(review.reviewed_subject_id, review.event_snapshot #>> '{primarySubject,id}') = ANY(")
            .push_bind(&filters.player_ids)
            .push(")");
    }
    if let Some(status) = &filters.review_status {
        if status == "unreviewed" {
            builder.push(" AND false");
        } else if status != "all" {
            builder.push(" AND review.status = ").push_bind(status);
        }
    }
    push_evaluation_replay_filters(builder, filters, "review", "replay");
}

fn push_evaluation_candidate_filters<'a>(
    builder: &mut QueryBuilder<'a, Postgres>,
    filters: &'a MechanicEventFilters,
    event_type_keys: &'a [String],
) {
    if !filters.event_ids.is_empty() {
        builder
            .push(" AND event.id = ANY(")
            .push_bind(&filters.event_ids)
            .push(")");
    }
    if !event_type_keys.is_empty() {
        builder
            .push(" AND event_type.key = ANY(")
            .push_bind(event_type_keys)
            .push(")");
    }
    if !filters.event_categories.is_empty() {
        builder
            .push(" AND event_type.category = ANY(")
            .push_bind(&filters.event_categories)
            .push(")");
    }
    if !filters.detectors.is_empty() {
        builder
            .push(" AND event.source = ANY(")
            .push_bind(&filters.detectors)
            .push(")");
    }
    for pattern in &filters.player_name_patterns {
        builder
            .push(" AND candidate_player.name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\'");
    }
    if !filters.player_ids.is_empty() {
        builder
            .push(" AND event.primary_subject_kind = 'player' AND event.primary_subject_id = ANY(")
            .push_bind(&filters.player_ids)
            .push(")");
    }
    if let Some(confidence) = filters.min_confidence {
        builder
            .push(" AND event.confidence >= ")
            .push_bind(confidence);
    }
    if let Some(event_created_after) = filters.event_created_after {
        builder
            .push(" AND event.created_at >= ")
            .push_bind(event_created_after);
    }
    if let Some(event_created_before) = filters.event_created_before {
        builder
            .push(" AND event.created_at <= ")
            .push_bind(event_created_before);
    }
    push_evaluation_replay_filters(builder, filters, "event", "replay");
}

fn push_evaluation_replay_filters<'a>(
    builder: &mut QueryBuilder<'a, Postgres>,
    filters: &'a MechanicEventFilters,
    replay_id_source: &'static str,
    replay_alias: &'static str,
) {
    if let Some(pattern) = &filters.search_pattern {
        builder
            .push(" AND (")
            .push(replay_alias)
            .push(".original_file_name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR ")
            .push(replay_alias)
            .push(".file_sha256 ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR ")
            .push(replay_alias)
            .push(".external_replay_id ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }
    if !filters.playlists.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }
    if !filters.maps.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".map_code = ANY(")
            .push_bind(&filters.maps)
            .push(")");
    }
    if let Some(pro) = filters.pro {
        builder.push(" AND ");
        if !pro {
            builder.push("NOT ");
        }
        builder.push(replay_alias).push(".has_pro_player");
    }
    if let Some(uploader_user_id) = filters.uploader_user_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".uploaded_by_user_id = ")
            .push_bind(uploader_user_id);
    }
    if let Some(group_id) = filters.group_id {
        builder
            .push(" AND EXISTS (SELECT 1 FROM replay_group_replays review_group WHERE review_group.replay_id = ")
            .push(replay_id_source)
            .push(".replay_id AND review_group.group_id = ")
            .push_bind(group_id)
            .push(")");
    }
    if let Some(project_id) = filters.project_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".project_id = ")
            .push_bind(project_id);
    }
    if let Some(replay_id) = filters.replay_id {
        builder
            .push(" AND ")
            .push(replay_id_source)
            .push(".replay_id = ")
            .push_bind(replay_id);
    }
    if let Some(created_after) = filters.created_after {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".created_at >= ")
            .push_bind(created_after);
    }
    if let Some(created_before) = filters.created_before {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".created_at <= ")
            .push_bind(created_before);
    }
    if let Some(replay_date_after) = filters.replay_date_after {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_date >= ")
            .push_bind(replay_date_after);
    }
    if let Some(replay_date_before) = filters.replay_date_before {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_date <= ")
            .push_bind(replay_date_before);
    }
}

fn ratio(numerator: i64, denominator: i64) -> Option<f64> {
    (denominator > 0).then(|| numerator as f64 / denominator as f64)
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
            NULLIF(replay.original_file_name, '') AS replay_label,
            event.analysis_run_id,
            event_type.key AS event_type,
            event_type.display_name AS event_type_label,
            event_type.category AS event_category,
            event_type.key AS mechanic,
            event.source AS detector,
            event.primary_subject_id AS player_id,
            NULLIF(replay_player.name, '') AS player_name,
            event.team,
            event.start_frame,
            event.end_frame,
            event.event_frame,
            event.start_time,
            event.end_time,
            event.event_time,
            event.confidence,
            NULL::text AS reason,
            COALESCE(payload.payload, '{}'::jsonb) AS payload,
            event.created_at,
            review.id AS latest_review_id,
            review.status AS review_status
        FROM play_events event
        JOIN event_types event_type
          ON event_type.id = event.event_type_id
        LEFT JOIN play_event_payloads payload
          ON payload.event_id = event.id
        JOIN replays replay
          ON replay.id = event.replay_id
        LEFT JOIN replay_players replay_player
          ON replay_player.replay_id = event.replay_id
         AND event.primary_subject_kind = 'player'
         AND replay_player.platform IS NOT NULL
         AND replay_player.platform_player_id IS NOT NULL
         AND concat(replay_player.platform, ':', replay_player.platform_player_id) = event.primary_subject_id
        LEFT JOIN LATERAL (
            SELECT id, status
            FROM event_reviews
            WHERE event_id = event.id
            ORDER BY created_at DESC
            LIMIT 1
        ) review ON TRUE
        WHERE event.analysis_run_id = replay.canonical_analysis_run_id
        "#,
    );

    if filters.event_ids.is_empty() && filters.mechanics.is_empty() {
        let context_event_types = context_event_type_keys_for_filter();
        builder
            .push(" AND event_type.key NOT LIKE 'goal_tag\\_%' ESCAPE '\\'")
            .push(" AND event_type.key <> ALL(")
            .push_bind(context_event_types)
            .push(")");
    }

    if let Some(pattern) = &filters.search_pattern {
        builder
            .push(" AND (replay.original_file_name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR replay.file_sha256 ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\' OR replay.external_replay_id ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\')");
    }
    if !filters.event_ids.is_empty() {
        builder
            .push(" AND event.id = ANY(")
            .push_bind(&filters.event_ids)
            .push(")");
    }
    if !filters.mechanics.is_empty() {
        let event_type_keys = filters.event_type_keys();
        builder
            .push(" AND event_type.key = ANY(")
            .push_bind(event_type_keys)
            .push(")");
    }
    if !filters.event_categories.is_empty() {
        builder
            .push(" AND event_type.category = ANY(")
            .push_bind(&filters.event_categories)
            .push(")");
    }
    if !filters.detectors.is_empty() {
        builder
            .push(" AND event.source = ANY(")
            .push_bind(&filters.detectors)
            .push(")");
    }
    for pattern in &filters.player_name_patterns {
        builder
            .push(" AND event.primary_subject_kind = 'player' AND replay_player.name ILIKE ")
            .push_bind(pattern)
            .push(" ESCAPE '\\'");
    }
    if !filters.player_ids.is_empty() {
        builder
            .push(" AND event.primary_subject_kind = 'player' AND event.primary_subject_id = ANY(")
            .push_bind(&filters.player_ids)
            .push(")");
    }
    if !filters.playlists.is_empty() {
        builder
            .push(" AND replay.playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }
    if !filters.maps.is_empty() {
        builder
            .push(" AND replay.map_code = ANY(")
            .push_bind(&filters.maps)
            .push(")");
    }
    if let Some(pro) = filters.pro {
        if pro {
            builder.push(" AND replay.has_pro_player");
        } else {
            builder.push(" AND NOT replay.has_pro_player");
        }
    }
    if let Some(uploader_user_id) = filters.uploader_user_id {
        builder
            .push(" AND replay.uploaded_by_user_id = ")
            .push_bind(uploader_user_id);
    }
    if let Some(group_id) = filters.group_id {
        builder.push(
            " AND EXISTS (SELECT 1 FROM replay_group_replays review_group WHERE review_group.replay_id = replay.id AND review_group.group_id = ",
        );
        builder.push_bind(group_id);
        builder.push(")");
    }
    if let Some(project_id) = filters.project_id {
        builder
            .push(" AND replay.project_id = ")
            .push_bind(project_id);
    }
    if let Some(replay_id) = filters.replay_id {
        builder.push(" AND event.replay_id = ").push_bind(replay_id);
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
    if let Some(created_after) = filters.created_after {
        builder
            .push(" AND replay.created_at >= ")
            .push_bind(created_after);
    }
    if let Some(created_before) = filters.created_before {
        builder
            .push(" AND replay.created_at <= ")
            .push_bind(created_before);
    }
    if let Some(replay_date_after) = filters.replay_date_after {
        builder
            .push(" AND replay.replay_date >= ")
            .push_bind(replay_date_after);
    }
    if let Some(replay_date_before) = filters.replay_date_before {
        builder
            .push(" AND replay.replay_date <= ")
            .push_bind(replay_date_before);
    }
    if let Some(event_created_after) = filters.event_created_after {
        builder
            .push(" AND event.created_at >= ")
            .push_bind(event_created_after);
    }
    if let Some(event_created_before) = filters.event_created_before {
        builder
            .push(" AND event.created_at <= ")
            .push_bind(event_created_before);
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
    let event_type: String = row.try_get("event_type")?;
    let event_category: String = row.try_get("event_category")?;
    Ok(MechanicEventResponse {
        id: row.try_get("id")?,
        replay_id: row.try_get("replay_id")?,
        replay_label: row.try_get("replay_label")?,
        analysis_run_id: row.try_get("analysis_run_id")?,
        event_category: canonical_event_type_category(&event_type, &event_category).to_owned(),
        event_type,
        event_type_label: row.try_get("event_type_label")?,
        mechanic: row.try_get("mechanic")?,
        detector: row.try_get("detector")?,
        player_id: row.try_get("player_id")?,
        player_name: row.try_get("player_name")?,
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
) -> EventReviewPlaylist {
    let mut replays = Vec::<(Uuid, Option<String>)>::new();
    for event in &events {
        if !replays
            .iter()
            .any(|(replay_id, _)| *replay_id == event.replay_id)
        {
            replays.push((event.replay_id, event.replay_label.clone()));
        }
    }
    let count = events.len() as u32;
    let next = (count == filters.count).then(|| {
        event_review_playlist_url_with_offset(filters, filters.offset.saturating_add(count))
    });
    let previous = (filters.offset > 0).then(|| {
        event_review_playlist_url_with_offset(filters, filters.offset.saturating_sub(filters.count))
    });

    EventReviewPlaylist {
        version: 1,
        kind: "playlist",
        label,
        playback: PlaylistPlayback {
            advance_mode: "manual",
            end_mode: "stop",
            time_base: "rawReplay",
        },
        page: PlaylistPage {
            next,
            previous,
            count,
            limit: filters.count,
            offset: filters.offset,
        },
        replays: replays
            .into_iter()
            .map(|(replay_id, replay_label)| PlaylistReplay {
                id: replay_id.to_string(),
                path: format!("/api/v1/replays/{replay_id}/file"),
                label: replay_label.unwrap_or_else(|| replay_id.to_string()),
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
    let clip_start = (start_time - EVENT_REVIEW_PREROLL_SECONDS).max(0.0);
    let clip_end = (end_time + EVENT_REVIEW_POSTROLL_SECONDS).max(clip_start + 0.5);
    let (start_bound, end_bound) = playlist_playback_bounds(clip_start, clip_end);
    let event_type_label = event.event_type_label.clone();
    let mechanic_label = event_type_label.clone();
    let item_label = "review item";
    let label = event
        .player_name
        .as_deref()
        .map(|player_label| {
            format!(
                "{player_label} - {event_type_label} {item_label} {}",
                index + 1
            )
        })
        .unwrap_or_else(|| format!("{event_type_label} {item_label} {}", index + 1));

    PlaylistItem {
        id: event.id.to_string(),
        replay: event.replay_id.to_string(),
        start: start_bound,
        end: end_bound,
        label,
        meta: PlaylistItemMeta {
            event_id: event.id,
            event_type: event.event_type,
            event_type_label,
            event_category: canonical_event_type_category(&event.mechanic, &event.event_category)
                .to_owned(),
            mechanic: event.mechanic,
            mechanic_label,
            detector: event.detector,
            confidence: event.confidence,
            reason: event.reason,
            player_id: event.player_id.clone(),
            player_name: event.player_name,
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
                kind: "event",
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

fn playlist_playback_bounds(clip_start: f64, clip_end: f64) -> (PlaylistBound, PlaylistBound) {
    (
        PlaylistBound {
            kind: "time",
            value: clip_start,
        },
        PlaylistBound {
            kind: "time",
            value: clip_end,
        },
    )
}

fn code_defined_event_types() -> Vec<EventTypeResponse> {
    let mut event_types = BTreeMap::new();

    for definition in subtr_actor::all_event_definitions() {
        for variant in definition.variants {
            insert_code_defined_event_type(
                &mut event_types,
                variant.key,
                variant.label,
                event_category_key(variant.category),
                None,
            );
        }

        if !definition.hidden_from_review {
            insert_code_defined_event_type(
                &mut event_types,
                definition.id,
                definition.label,
                event_category_key(definition.category),
                Some(definition.summary),
            );
        }
    }

    // rocket-sense splits rotation_role / ball_depth spans into per-state
    // event types at indexing time (see processing::timeline_event_type), a
    // convention subtr-actor's definition registry no longer carries variants
    // for; register those keys here so the catalog stays canonical.
    for (key, label) in [
        ("rotation_role_first_man", "Rotation Role First Man"),
        ("rotation_role_second_man", "Rotation Role Second Man"),
        ("rotation_role_third_man", "Rotation Role Third Man"),
        ("rotation_role_ambiguous", "Rotation Role Ambiguous"),
        ("rotation_role_unknown", "Rotation Role Unknown"),
        ("ball_depth_behind_ball", "Ball Depth Behind Ball"),
        ("ball_depth_level_with_ball", "Ball Depth Level With Ball"),
        ("ball_depth_ahead_of_ball", "Ball Depth Ahead Of Ball"),
    ] {
        insert_code_defined_event_type(&mut event_types, key, label, "positioning", None);
    }

    let mut event_types = event_types.into_values().collect::<Vec<_>>();
    event_types.sort_by(|left, right| {
        left.display_name
            .cmp(&right.display_name)
            .then_with(|| left.key.cmp(&right.key))
    });
    event_types
}

fn insert_code_defined_event_type(
    event_types: &mut BTreeMap<String, EventTypeResponse>,
    key: &str,
    display_name: &str,
    category: &str,
    description: Option<&str>,
) {
    let key = canonical_event_type_key(key).to_owned();
    event_types.insert(
        key.clone(),
        EventTypeResponse {
            category: canonical_event_type_category(&key, category).to_owned(),
            key,
            display_name: display_name.to_owned(),
            description: description
                .filter(|description| {
                    !description.is_empty() && *description != "Definition pending."
                })
                .map(ToOwned::to_owned),
        },
    );
}

fn canonical_event_type_category(event_type: &str, stored_category: &str) -> &'static str {
    if context_event_type_keys(event_type) {
        return "context";
    }
    if matches!(event_type, "touch" | "touch_ball_movement" | "whiff") {
        return "other";
    }
    if stored_category != "event" {
        return event_category_alias(stored_category);
    }
    if let Some(category) = registered_event_type_category(event_type) {
        return category;
    }
    if mechanic_event_type_keys(event_type) || event_type.starts_with("mechanic.") {
        return "mechanic";
    }
    if matches!(
        event_type,
        "bump" | "demolition" | "kill" | "death" | "core.demo"
    ) {
        return "contact";
    }
    if event_type.starts_with("boost") || event_type == "boost.pad_event" {
        return "boost";
    }
    if event_type.starts_with("rotation_")
        || event_type.starts_with("rotation.")
        || event_type == "positioning"
        || event_type.starts_with("positioning_")
    {
        return "positioning";
    }
    if matches!(
        event_type,
        "possession"
            | "pressure"
            | "territorial_pressure"
            | "controlled_play"
            | "kickoff"
            | "fifty_fifty"
            | "rush"
    ) {
        return "possession";
    }
    if matches!(
        event_type,
        "movement" | "flip_impulse" | "powerslide" | "movement.dodge_refresh"
    ) {
        return "movement";
    }
    if matches!(event_type, "goal") {
        return "core";
    }
    "event"
}

fn registered_event_type_category(event_type: &str) -> Option<&'static str> {
    subtr_actor::all_event_definitions()
        .iter()
        .find_map(|definition| {
            if definition.id == event_type {
                return Some(event_category_key(definition.category));
            }
            definition
                .variants
                .iter()
                .find(|variant| variant.key == event_type)
                .map(|variant| event_category_key(variant.category))
        })
}

fn event_category_key(category: subtr_actor::EventCategory) -> &'static str {
    match category {
        subtr_actor::EventCategory::Core => "core",
        subtr_actor::EventCategory::Mechanic => "mechanic",
        subtr_actor::EventCategory::Positioning => "positioning",
        subtr_actor::EventCategory::Other => "other",
        subtr_actor::EventCategory::Annotation => "annotation",
        subtr_actor::EventCategory::Context => "context",
    }
}

fn canonical_event_type_key(event_type: &str) -> &str {
    if let Some(mechanic_key) = event_type.strip_prefix("mechanic.") {
        if mechanic_event_type_keys(mechanic_key) {
            return mechanic_key;
        }
    }
    event_type
}

fn event_category_alias(category: &str) -> &'static str {
    match category {
        "context" => "context",
        "mechanics" => "mechanic",
        "touch" => "contact",
        "goal_context" => "context",
        "team" => "core",
        "boost" => "boost",
        "contact" => "contact",
        "core" => "core",
        "mechanic" => "mechanic",
        "movement" => "movement",
        "possession" => "possession",
        "positioning" => "positioning",
        "other" => "other",
        "annotation" => "annotation",
        _ => "event",
    }
}

fn mechanic_event_type_keys(event_type: &str) -> bool {
    registered_event_type_category(event_type) == Some("mechanic")
}

fn context_event_type_keys(event_type: &str) -> bool {
    CONTEXT_EVENT_TYPE_KEYS.contains(&event_type)
}

fn context_event_type_keys_for_filter() -> Vec<String> {
    CONTEXT_EVENT_TYPE_KEYS
        .iter()
        .map(|event_type| (*event_type).to_owned())
        .collect()
}

const CONTEXT_EVENT_TYPE_KEYS: &[&str] = &[
    "core_player",
    "core_player_scoreboard",
    "goal_context",
    "player",
];

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
            | "accepted"
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

fn normalize_review_status_filter(status: &str) -> Result<Option<String>, ApiError> {
    let status = status.trim().to_lowercase();
    if status.is_empty() {
        return Ok(None);
    }
    validate_review_status_filter(&status)?;
    if status == "accepted" {
        Ok(Some("confirmed".to_owned()))
    } else {
        Ok(Some(status))
    }
}

fn normalize_review_status(status: &str) -> Result<String, ApiError> {
    let Some(status) = normalize_review_status_filter(status)? else {
        return Err(ApiError::bad_request(
            "review status must be one of confirmed, rejected, corrected, uncertain, needs_second_review",
        ));
    };
    if status == "all" || status == "unreviewed" {
        return Err(ApiError::bad_request(
            "review status must be one of confirmed, rejected, corrected, uncertain, needs_second_review",
        ));
    }
    Ok(status)
}

fn normalize_reviewed_event_type_key(value: &str) -> Result<String, ApiError> {
    let value = value.trim();
    if value.is_empty() {
        return Err(ApiError::bad_request(
            "reviewed_mechanic must not be empty when provided",
        ));
    }
    Ok(canonical_event_type_key(value).to_owned())
}

fn normalize_event_type_keys(values: Vec<String>) -> Vec<String> {
    values
        .into_iter()
        .map(|value| value.trim().to_owned())
        .filter(|value| !value.is_empty())
        .map(|value| canonical_event_type_key(&value).to_owned())
        .collect()
}

fn normalize_terms(values: Vec<String>) -> Vec<String> {
    values
        .into_iter()
        .map(|value| value.trim().to_owned())
        .filter(|value| !value.is_empty())
        .collect()
}

fn parse_review_uuid_filter(name: &str, value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request(format!("{name} must be a Rocket Sense UUID")))
}

fn parse_review_bool_filter(name: &str, value: &str) -> Result<bool, ApiError> {
    value
        .trim()
        .parse::<bool>()
        .map_err(|_| ApiError::bad_request(format!("{name} must be true or false")))
}

fn parse_review_datetime_filter(name: &str, value: &str) -> Result<DateTime<Utc>, ApiError> {
    DateTime::parse_from_rfc3339(value.trim())
        .map(|date| date.with_timezone(&Utc))
        .map_err(|_| ApiError::bad_request(format!("{name} must be an RFC3339 timestamp")))
}

fn escape_like_term(term: &str) -> String {
    term.replace('\\', "\\\\")
        .replace('%', "\\%")
        .replace('_', "\\_")
}

fn unescape_like_pattern(pattern: &str) -> String {
    let pattern = pattern
        .strip_prefix('%')
        .and_then(|pattern| pattern.strip_suffix('%'))
        .unwrap_or(pattern);
    let mut output = String::with_capacity(pattern.len());
    let mut escaped = false;
    for character in pattern.chars() {
        if escaped {
            output.push(character);
            escaped = false;
        } else if character == '\\' {
            escaped = true;
        } else {
            output.push(character);
        }
    }
    if escaped {
        output.push('\\');
    }
    output
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
            "postgres connection is required for events review",
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
