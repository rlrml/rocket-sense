use crate::{app::AppState, auth::OptionalAuthUser};
use axum::{extract::RawQuery, extract::State, routing::get, Json, Router};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, QueryBuilder, Row};
use utoipa::{IntoParams, ToSchema};
use uuid::Uuid;

use super::{
    query::{
        deserialize_string_vec, deserialize_uuid_vec, parse_bool_filter, parse_u32_filter,
        QueryParams,
    },
    replay_set::{
        append_replay_set_filters, append_target_player_replay_set_filters,
        push_playlist_group_key_expression, PlayerStatFilter, ReplaySetFilterInput,
        ReplaySetFilters,
    },
    replays::{require_db, ApiError},
};

#[cfg(test)]
#[path = "stats_tests.rs"]
mod tests;

pub fn router() -> Router<AppState> {
    Router::new().route("/stats/aggregates", get(get_stat_aggregates))
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatAggregateSetResponse {
    pub replay_count: u64,
    pub player_appearance_count: Option<u64>,
    pub active_time_seconds: Option<f64>,
    pub non_demo_active_time_seconds: Option<f64>,
    pub time_most_back_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
    pub teammate_appearance_count: Option<u64>,
    pub teammate_active_time_seconds: Option<f64>,
    pub teammate_non_demo_active_time_seconds: Option<f64>,
    pub teammate_time_most_back_seconds: Option<f64>,
    pub teammate_time_most_forward_seconds: Option<f64>,
    pub rotation_duration_bucket_seconds: f64,
    pub rotation_duration_histogram: Vec<RotationDurationBucketResponse>,
    pub stats: Vec<StatAggregateResponse>,
    pub groups: Vec<StatAggregateGroupResponse>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct StatAggregateGroupResponse {
    pub group_by: String,
    pub key: String,
    pub display_name: String,
    pub replay_count: u64,
    pub player_appearance_count: Option<u64>,
    pub active_time_seconds: Option<f64>,
    pub non_demo_active_time_seconds: Option<f64>,
    pub time_most_back_seconds: Option<f64>,
    pub time_most_forward_seconds: Option<f64>,
    pub teammate_appearance_count: Option<u64>,
    pub teammate_active_time_seconds: Option<f64>,
    pub teammate_non_demo_active_time_seconds: Option<f64>,
    pub teammate_time_most_back_seconds: Option<f64>,
    pub teammate_time_most_forward_seconds: Option<f64>,
    pub stats: Vec<StatAggregateResponse>,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct RotationDurationBucketResponse {
    pub min_seconds: f64,
    pub max_seconds: f64,
    pub count: u64,
}

#[derive(Debug, Clone, Serialize, ToSchema)]
pub struct StatAggregateResponse {
    pub key: String,
    pub display_name: String,
    pub category: String,
    pub event_count: u64,
    pub count_per_game: f64,
    pub per_active_minute: Option<f64>,
    pub per_non_demo_active_minute: Option<f64>,
    pub teammate_event_count: u64,
    pub teammate_appearance_count: u64,
    pub teammate_count_per_game: Option<f64>,
    pub teammate_per_active_minute: Option<f64>,
    pub teammate_per_non_demo_active_minute: Option<f64>,
}

#[derive(Debug, Default, Deserialize, IntoParams)]
#[into_params(parameter_in = Query)]
pub struct StatAggregatesQuery {
    /// Text search over original filename, SHA-256, and external replay id.
    pub q: Option<String>,
    /// Ballchasing-compatible title filter. Currently maps to original filename search.
    pub title: Option<String>,
    /// Filter by one or more player display names in the replay set.
    #[serde(
        default,
        rename = "player-name",
        alias = "player-name[]",
        alias = "player_names",
        alias = "player_names[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub player_names: Vec<String>,
    /// Filter by one or more playlist/game-mode codes.
    #[serde(
        default,
        alias = "playlist[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub playlist: Vec<String>,
    /// Alias for `playlist`.
    #[serde(
        default,
        rename = "game-mode",
        alias = "game-mode[]",
        alias = "game_modes",
        alias = "game_modes[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub game_modes: Vec<String>,
    /// Filter by competitive context: ranked, casual, tournament, private, offline, lan, unknown.
    #[serde(
        default,
        rename = "game-type",
        alias = "game-type[]",
        alias = "game_types",
        alias = "game_types[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub game_types: Vec<String>,
    /// Filter by team size / player count: 1-4 or 1v1, 2v2, 3v3, 4v4.
    #[serde(
        default,
        rename = "team-size",
        alias = "team-size[]",
        alias = "team_sizes",
        alias = "team_sizes[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub team_sizes: Vec<String>,
    /// Filter to one or more Rocket Sense replay ids.
    #[serde(
        default,
        rename = "replay-id",
        alias = "replay-id[]",
        alias = "replay_ids",
        alias = "replay_ids[]",
        deserialize_with = "deserialize_uuid_vec"
    )]
    pub replay_ids: Vec<Uuid>,
    /// Filter to one or more replay file SHA-256 digests.
    #[serde(
        default,
        rename = "sha256",
        alias = "sha256[]",
        alias = "file_sha256s",
        alias = "file_sha256s[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub file_sha256s: Vec<String>,
    /// Filter to a replay group id.
    pub group: Option<String>,
    /// Filter to a legacy project id.
    pub project: Option<String>,
    /// Filter by one or more map codes.
    #[serde(
        default,
        rename = "map",
        alias = "map[]",
        alias = "maps",
        alias = "maps[]",
        deserialize_with = "deserialize_string_vec"
    )]
    pub maps: Vec<String>,
    /// Only include replays containing at least one pro player.
    pub pro: Option<bool>,
    /// `me` for the authenticated user, or a Rocket Sense user UUID.
    pub uploader: Option<String>,
    /// Replay parsing status.
    pub status: Option<String>,
    /// Optional player focus in `platform:id` form.
    #[serde(rename = "player-id")]
    pub player_id: Option<String>,
    /// Include aggregate stats for same-team players when a player filter is present.
    #[serde(rename = "include-teammates")]
    pub include_teammates: Option<bool>,
    /// Only include replays uploaded after this RFC3339 timestamp.
    #[serde(rename = "created-after")]
    pub created_after: Option<DateTime<Utc>>,
    /// Only include replays uploaded before this RFC3339 timestamp.
    #[serde(rename = "created-before")]
    pub created_before: Option<DateTime<Utc>>,
    /// Only include replays played after this RFC3339 timestamp.
    #[serde(rename = "replay-date-after")]
    pub replay_date_after: Option<DateTime<Utc>>,
    /// Only include replays played before this RFC3339 timestamp.
    #[serde(rename = "replay-date-before")]
    pub replay_date_before: Option<DateTime<Utc>>,
    /// Maximum number of stat rows to return. Clamped to 1..=200.
    pub count: Option<u32>,
    /// Optional aggregate grouping. Currently supports `playlist`.
    #[serde(rename = "group-by", alias = "group_by")]
    pub group_by: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub(crate) struct StatAggregateFilters {
    pub(crate) replay_set: ReplaySetFilters,
    pub(crate) player: Option<PlayerStatFilter>,
    pub(crate) include_teammates: bool,
    pub(crate) limit: u32,
    pub(crate) group_by: Option<StatAggregateGroupBy>,
}

#[derive(Debug, Clone)]
struct StatDenominators {
    replay_count: u64,
    appearance_count: Option<u64>,
    active_time_seconds: Option<f64>,
    non_demo_active_time_seconds: Option<f64>,
    time_most_back_seconds: Option<f64>,
    time_most_forward_seconds: Option<f64>,
}

#[derive(Debug, Clone)]
struct RotationDurationBucketRow {
    bucket_start_seconds: f64,
    count: u64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum StatAggregateGroupBy {
    Playlist,
}

pub(crate) const ROTATION_DURATION_BUCKET_SECONDS: f64 = 1.0;
#[cfg(test)]
const AGGREGATE_HIDDEN_EVENT_SOURCE_STREAMS: &[&str] = &[
    "positioning",
    "boost_state",
    "boost_ledger",
    "movement",
    "rotation_player",
    "rotation_role_span",
    "rotation_depth_span",
    "powerslide",
];
const AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL: &str = "source_stream NOT IN ('positioning', 'boost_state', 'boost_ledger', 'movement', 'rotation_player', 'rotation_role_span', 'rotation_depth_span', 'powerslide')";

#[derive(Debug, Clone)]
struct StatCountRow {
    key: String,
    display_name: String,
    category: String,
    event_count: u64,
    teammate_event_count: u64,
}

impl StatAggregateFilters {
    pub(crate) fn from_query(
        query: StatAggregatesQuery,
        auth_user_id: Option<Uuid>,
    ) -> Result<Self, ApiError> {
        let replay_set = ReplaySetFilters::from_input(
            ReplaySetFilterInput {
                q: query.q,
                title: query.title,
                player_names: query.player_names,
                playlists: query.playlist,
                game_modes: query.game_modes,
                game_types: query.game_types,
                team_sizes: query.team_sizes,
                replay_ids: query.replay_ids,
                file_sha256s: query.file_sha256s,
                group: query.group,
                project: query.project,
                maps: query.maps,
                pro: query.pro,
                uploader: query.uploader,
                status: query.status,
                created_after: query.created_after,
                created_before: query.created_before,
                replay_date_after: query.replay_date_after,
                replay_date_before: query.replay_date_before,
            },
            auth_user_id,
        )?;

        Ok(Self {
            replay_set,
            player: query
                .player_id
                .map(|player_id| PlayerStatFilter::from_query(&player_id))
                .transpose()?,
            include_teammates: query.include_teammates.unwrap_or(false),
            limit: query.count.unwrap_or(50).clamp(1, 200),
            group_by: query
                .group_by
                .map(|group_by| parse_stat_group_by(&group_by))
                .transpose()?,
        })
    }
}

impl StatAggregatesQuery {
    fn from_raw_query(raw_query: Option<&str>) -> Result<Self, ApiError> {
        let params = QueryParams::from_raw(raw_query);
        let replay_set = ReplaySetFilterInput::from_query_params(&params)?;
        Ok(Self {
            q: replay_set.q,
            title: replay_set.title,
            player_names: replay_set.player_names,
            playlist: replay_set.playlists,
            game_modes: replay_set.game_modes,
            game_types: replay_set.game_types,
            team_sizes: replay_set.team_sizes,
            replay_ids: replay_set.replay_ids,
            file_sha256s: replay_set.file_sha256s,
            group: replay_set.group,
            project: replay_set.project,
            maps: replay_set.maps,
            pro: replay_set.pro,
            uploader: replay_set.uploader,
            status: replay_set.status,
            player_id: params.first(&["player-id", "player_id"]),
            include_teammates: params
                .first(&["include-teammates", "include_teammates"])
                .map(|value| parse_bool_filter("include-teammates", &value))
                .transpose()?,
            created_after: replay_set.created_after,
            created_before: replay_set.created_before,
            replay_date_after: replay_set.replay_date_after,
            replay_date_before: replay_set.replay_date_before,
            count: params
                .first(&["count"])
                .map(|value| parse_u32_filter("count", &value))
                .transpose()?,
            group_by: params.first(&["group-by", "group_by"]),
        })
    }
}

#[utoipa::path(
    get,
    path = "/api/v1/stats/aggregates",
    tag = "stats",
    params(StatAggregatesQuery),
    responses(
        (status = 200, description = "Aggregate indexed replay stats", body = StatAggregateSetResponse),
        (status = 400, description = "Stats filters were invalid"),
        (status = 503, description = "Postgres connection is not configured")
    )
)]
pub async fn get_stat_aggregates(
    OptionalAuthUser(auth_user): OptionalAuthUser,
    State(state): State<AppState>,
    RawQuery(raw_query): RawQuery,
) -> Result<Json<StatAggregateSetResponse>, ApiError> {
    let db = require_db(&state)?;
    let query = StatAggregatesQuery::from_raw_query(raw_query.as_deref())?;
    let filters = StatAggregateFilters::from_query(query, auth_user.as_ref().map(|user| user.id))?;
    let aggregates = load_stat_aggregates(db, &filters)
        .await
        .map_err(ApiError::internal)?;

    Ok(Json(aggregates))
}

pub(crate) async fn load_stat_aggregates(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    // The base aggregate and the per-playlist breakdown are independent, so run
    // them concurrently rather than serializing the (many) underlying queries.
    let (mut aggregates, groups) = tokio::try_join!(
        load_stat_aggregates_base(pool, filters, true),
        load_stat_aggregate_groups(pool, filters),
    )?;
    aggregates.groups = groups;
    Ok(aggregates)
}

async fn load_stat_aggregates_base(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
    include_rotation_histogram: bool,
) -> Result<StatAggregateSetResponse, sqlx::Error> {
    // These queries are independent; run them concurrently against the pool.
    let teammate_fut = async {
        if filters.player.is_some() && filters.include_teammates {
            Ok::<_, sqlx::Error>(Some(load_teammate_denominators(pool, filters).await?))
        } else {
            Ok(None)
        }
    };
    // The rotation histogram is only surfaced on the top-level response, not on
    // per-playlist groups, so skip the (expensive) query when grouping.
    let histogram_fut = async {
        if include_rotation_histogram {
            load_rotation_duration_histogram(pool, filters).await
        } else {
            Ok::<_, sqlx::Error>(Vec::new())
        }
    };
    let (target_denominators, teammate_denominators, rows, rotation_duration_histogram) = tokio::try_join!(
        load_target_denominators(pool, filters),
        teammate_fut,
        load_stat_count_rows(pool, filters),
        histogram_fut,
    )?;
    let target_replay_count = target_denominators.replay_count.max(1) as f64;
    let teammate_appearance_count = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.appearance_count)
        .unwrap_or(0);
    let teammate_active_time_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.active_time_seconds);
    let teammate_non_demo_active_time_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.non_demo_active_time_seconds);
    let teammate_time_most_back_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.time_most_back_seconds);
    let teammate_time_most_forward_seconds = teammate_denominators
        .as_ref()
        .and_then(|denominator| denominator.time_most_forward_seconds);

    let stats = rows
        .into_iter()
        .map(|row| StatAggregateResponse {
            key: row.key,
            display_name: row.display_name,
            category: row.category,
            event_count: row.event_count,
            count_per_game: row.event_count as f64 / target_replay_count,
            per_active_minute: per_minute(row.event_count, target_denominators.active_time_seconds),
            per_non_demo_active_minute: per_minute(
                row.event_count,
                target_denominators.non_demo_active_time_seconds,
            ),
            teammate_event_count: row.teammate_event_count,
            teammate_appearance_count,
            teammate_count_per_game: (teammate_appearance_count > 0)
                .then(|| row.teammate_event_count as f64 / teammate_appearance_count as f64),
            teammate_per_active_minute: per_minute(
                row.teammate_event_count,
                teammate_active_time_seconds,
            ),
            teammate_per_non_demo_active_minute: per_minute(
                row.teammate_event_count,
                teammate_non_demo_active_time_seconds,
            ),
        })
        .collect();

    Ok(StatAggregateSetResponse {
        replay_count: target_denominators.replay_count,
        player_appearance_count: target_denominators.appearance_count,
        active_time_seconds: target_denominators.active_time_seconds,
        non_demo_active_time_seconds: target_denominators.non_demo_active_time_seconds,
        time_most_back_seconds: target_denominators.time_most_back_seconds,
        time_most_forward_seconds: target_denominators.time_most_forward_seconds,
        teammate_appearance_count: teammate_denominators
            .as_ref()
            .and_then(|denominator| denominator.appearance_count),
        teammate_active_time_seconds,
        teammate_non_demo_active_time_seconds,
        teammate_time_most_back_seconds,
        teammate_time_most_forward_seconds,
        rotation_duration_bucket_seconds: ROTATION_DURATION_BUCKET_SECONDS,
        rotation_duration_histogram,
        stats,
        groups: Vec::new(),
    })
}

async fn load_stat_aggregate_groups(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    let Some(group_by) = filters.group_by else {
        return Ok(Vec::new());
    };

    match group_by {
        StatAggregateGroupBy::Playlist => load_playlist_stat_aggregate_groups(pool, filters).await,
    }
}

/// Maximum number of per-playlist aggregate groups to compute concurrently.
///
/// Each group runs a handful of queries (which themselves fan out), so this is
/// kept comfortably below the connection-pool size to leave headroom for the
/// concurrent top-level base query and other in-flight requests.
const PLAYLIST_GROUP_CONCURRENCY: usize = 4;

async fn load_playlist_stat_aggregate_groups(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatAggregateGroupResponse>, sqlx::Error> {
    use futures::stream::{StreamExt, TryStreamExt};

    let playlists = load_stat_group_playlists(pool, filters).await?;

    // Compute each playlist's aggregates concurrently. `buffered` preserves the
    // input ordering (replay_count DESC) while bounding in-flight work.
    futures::stream::iter(playlists.into_iter().map(|playlist| async move {
        let mut group_filters = filters.clone();
        group_filters.group_by = None;
        group_filters.replay_set.playlist_group_key = Some(playlist.clone());
        let aggregates = load_stat_aggregates_base(pool, &group_filters, false).await?;
        Ok::<_, sqlx::Error>(StatAggregateGroupResponse {
            group_by: "playlist".to_owned(),
            display_name: playlist_label(&playlist),
            key: playlist,
            replay_count: aggregates.replay_count,
            player_appearance_count: aggregates.player_appearance_count,
            active_time_seconds: aggregates.active_time_seconds,
            non_demo_active_time_seconds: aggregates.non_demo_active_time_seconds,
            time_most_back_seconds: aggregates.time_most_back_seconds,
            time_most_forward_seconds: aggregates.time_most_forward_seconds,
            teammate_appearance_count: aggregates.teammate_appearance_count,
            teammate_active_time_seconds: aggregates.teammate_active_time_seconds,
            teammate_non_demo_active_time_seconds: aggregates.teammate_non_demo_active_time_seconds,
            teammate_time_most_back_seconds: aggregates.teammate_time_most_back_seconds,
            teammate_time_most_forward_seconds: aggregates.teammate_time_most_forward_seconds,
            stats: aggregates.stats,
        })
    }))
    .buffered(PLAYLIST_GROUP_CONCURRENCY)
    .try_collect()
    .await
}

async fn load_stat_group_playlists(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<String>, sqlx::Error> {
    let mut query = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new("\n            SELECT\n                ");
        push_playlist_group_key_expression(&mut query, "r");
        query.push(
            r#" AS playlist,
                COUNT(DISTINCT rp.replay_id) AS replay_count,
                MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query
    } else {
        let mut query = QueryBuilder::<Postgres>::new("\n            SELECT\n                ");
        push_playlist_group_key_expression(&mut query, "r");
        query.push(
            r#" AS playlist,
                COUNT(DISTINCT r.id) AS replay_count,
                MAX(COALESCE(r.replay_date, r.created_at)) AS latest_seen_at
            FROM replays r
            WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query
    };
    query.push(
        r#"
          AND "#,
    );
    push_playlist_group_key_expression(&mut query, "r");
    query.push(
        r#" IS NOT NULL
        GROUP BY 1
        ORDER BY replay_count DESC, latest_seen_at DESC NULLS LAST, playlist
        "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(|row| row.try_get("playlist"))
        .collect()
}

async fn load_target_denominators(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatDenominators, sqlx::Error> {
    let row = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                COUNT(DISTINCT rp.replay_id) AS replay_count,
                COUNT(*) AS appearance_count,
                SUM(rp.active_time_seconds) AS active_time_seconds,
                SUM(GREATEST(rp.active_time_seconds - COALESCE(rp.time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
                SUM(rp.time_most_back_seconds) AS time_most_back_seconds,
                SUM(rp.time_most_forward_seconds) AS time_most_forward_seconds
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query.build().fetch_one(pool).await?
    } else {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            SELECT
                COUNT(DISTINCT r.id) AS replay_count,
                NULL::bigint AS appearance_count,
                NULL::double precision AS active_time_seconds,
                NULL::double precision AS non_demo_active_time_seconds,
                SUM(rp.time_most_back_seconds) AS time_most_back_seconds,
                SUM(rp.time_most_forward_seconds) AS time_most_forward_seconds
            FROM replays r
            LEFT JOIN replay_players rp ON rp.replay_id = r.id
            WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query.build().fetch_one(pool).await?
    };

    let replay_count: i64 = row.try_get("replay_count")?;
    let appearance_count: Option<i64> = row.try_get("appearance_count")?;
    Ok(StatDenominators {
        replay_count: replay_count.max(0) as u64,
        appearance_count: appearance_count.map(|count| count.max(0) as u64),
        active_time_seconds: finite_nonnegative(row.try_get("active_time_seconds")?),
        non_demo_active_time_seconds: finite_nonnegative(
            row.try_get("non_demo_active_time_seconds")?,
        ),
        time_most_back_seconds: finite_nonnegative(row.try_get("time_most_back_seconds")?),
        time_most_forward_seconds: finite_nonnegative(row.try_get("time_most_forward_seconds")?),
    })
}

async fn load_teammate_denominators(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<StatDenominators, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS (
            SELECT rp.id, rp.replay_id, rp.team
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        ),
        teammate_appearances AS (
            SELECT DISTINCT
                teammate.id,
                teammate.replay_id,
                teammate.active_time_seconds,
                teammate.time_demolished_seconds,
                teammate.time_most_back_seconds,
                teammate.time_most_forward_seconds
            FROM target_appearances target
            JOIN replay_players teammate
              ON teammate.replay_id = target.replay_id
             AND teammate.team = target.team
             AND teammate.id <> target.id
        )
        SELECT
            COUNT(DISTINCT replay_id) AS replay_count,
            COUNT(*) AS appearance_count,
            SUM(active_time_seconds) AS active_time_seconds,
            SUM(GREATEST(active_time_seconds - COALESCE(time_demolished_seconds, 0.0), 0.0)) AS non_demo_active_time_seconds,
            SUM(time_most_back_seconds) AS time_most_back_seconds,
            SUM(time_most_forward_seconds) AS time_most_forward_seconds
        FROM teammate_appearances
        "#,
    );

    let row = query.build().fetch_one(pool).await?;
    let replay_count: i64 = row.try_get("replay_count")?;
    let appearance_count: Option<i64> = row.try_get("appearance_count")?;
    Ok(StatDenominators {
        replay_count: replay_count.max(0) as u64,
        appearance_count: appearance_count.map(|count| count.max(0) as u64),
        active_time_seconds: finite_nonnegative(row.try_get("active_time_seconds")?),
        non_demo_active_time_seconds: finite_nonnegative(
            row.try_get("non_demo_active_time_seconds")?,
        ),
        time_most_back_seconds: finite_nonnegative(row.try_get("time_most_back_seconds")?),
        time_most_forward_seconds: finite_nonnegative(row.try_get("time_most_forward_seconds")?),
    })
}

async fn load_rotation_duration_histogram(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<RotationDurationBucketResponse>, sqlx::Error> {
    let mut query = if filters.player.is_some() {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            WITH target_appearances AS MATERIALIZED (
                SELECT rp.id, rp.replay_id, r.canonical_analysis_run_id AS run_id
                FROM replay_players rp
                JOIN replays r ON r.id = rp.replay_id
            "#,
        );
        append_target_player_filters(&mut query, filters);
        query.push(
            r#"
            ),
            rotation_events AS MATERIALIZED (
                SELECT event.duration_seconds
                FROM target_appearances appearance
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                 AND subject.role = 'actor'
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = appearance.run_id
                 AND event.source_stream = 'rotation_first_man_stint'
            ),
            bucketed AS (
                SELECT floor(duration_seconds /
            "#,
        );
        query
    } else {
        let mut query = QueryBuilder::<Postgres>::new(
            r#"
            WITH rotation_events AS (
                SELECT event.duration_seconds
                FROM replays r
                JOIN play_events event
                  ON event.replay_id = r.id
                 AND event.analysis_run_id = r.canonical_analysis_run_id
                 AND event.source_stream = 'rotation_first_man_stint'
                JOIN event_types et
                  ON et.id = event.event_type_id
                 AND et.key = 'rotation_first_man_stint'
                WHERE r.canonical_analysis_run_id IS NOT NULL
            "#,
        );
        append_replay_filters(&mut query, filters, "r");
        query.push(
            r#"
            ),
            bucketed AS (
                SELECT floor(duration_seconds /
            "#,
        );
        query
    };

    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(") * ");
    query.push_bind(ROTATION_DURATION_BUCKET_SECONDS);
    query.push(
        r#" AS bucket_start_seconds
        FROM rotation_events
        WHERE duration_seconds IS NOT NULL AND duration_seconds > 0.0
    )
    SELECT bucket_start_seconds, COUNT(*) AS count
    FROM bucketed
    GROUP BY bucket_start_seconds
    ORDER BY bucket_start_seconds
    "#,
    );

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter()
        .map(rotation_duration_bucket_row_from_db)
        .collect()
}

async fn load_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    if filters.player.is_some() {
        load_player_stat_count_rows(pool, filters).await
    } else {
        load_replay_set_stat_count_rows(pool, filters).await
    }
}

async fn load_replay_set_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        SELECT
            et.key,
            et.display_name,
            et.category,
            COUNT(DISTINCT event.id) AS event_count,
            0::bigint AS teammate_event_count
        FROM replays r
        JOIN play_events event
          ON event.replay_id = r.id
         AND event.analysis_run_id = r.canonical_analysis_run_id
        "#,
    );
    append_user_facing_stat_event_join_filter(&mut query, "event");
    query.push(
        r#"
        JOIN event_types et
          ON et.id = event.event_type_id
        WHERE r.canonical_analysis_run_id IS NOT NULL
        "#,
    );
    append_replay_filters(&mut query, filters, "r");
    query.push(
        r#"
        GROUP BY et.key, et.display_name, et.category
        ORDER BY COUNT(DISTINCT event.id) DESC, et.category, et.display_name, et.key
        LIMIT
        "#,
    );
    query.push_bind(i64::from(filters.limit));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(stat_count_row_from_db).collect()
}

async fn load_player_stat_count_rows(
    pool: &sqlx::PgPool,
    filters: &StatAggregateFilters,
) -> Result<Vec<StatCountRow>, sqlx::Error> {
    // Drive the scan from the player's own event subjects rather than from every
    // event in each replay. Carrying the replay's canonical `run_id` on the
    // appearance lets Postgres look events up by primary key (subject.event_id)
    // and filter to the canonical analysis run inline, instead of scanning the
    // full per-replay event stream and merge-joining it against subjects. The
    // `MATERIALIZED` fences keep the planner from collapsing the CTEs back into
    // that pathological plan. See `play_event_subjects_replay_player_event_idx`.
    let mut query = QueryBuilder::<Postgres>::new(
        r#"
        WITH target_appearances AS MATERIALIZED (
            SELECT
                rp.id,
                rp.replay_id,
                rp.team,
                r.canonical_analysis_run_id AS run_id
            FROM replay_players rp
            JOIN replays r ON r.id = rp.replay_id
        "#,
    );
    append_target_player_filters(&mut query, filters);
    query.push(
        r#"
        ),
        target_events AS MATERIALIZED (
            SELECT DISTINCT event.id, event.event_type_id
            FROM target_appearances appearance
            JOIN play_event_subjects subject
              ON subject.replay_player_id = appearance.id
            JOIN play_events event
              ON event.id = subject.event_id
             AND event.analysis_run_id = appearance.run_id
            "#,
    );
    append_user_facing_stat_event_join_filter(&mut query, "event");
    query.push(
        r#"
        ),
        target_stats AS (
            SELECT
                et.key,
                et.display_name,
                et.category,
                COUNT(*) AS event_count
            FROM target_events
            JOIN event_types et ON et.id = target_events.event_type_id
            GROUP BY et.key, et.display_name, et.category
        )
        "#,
    );

    if filters.include_teammates {
        query.push(
            r#"
            ,
            teammate_appearances AS MATERIALIZED (
                SELECT DISTINCT
                    teammate.id,
                    teammate.replay_id,
                    target.run_id
                FROM target_appearances target
                JOIN replay_players teammate
                  ON teammate.replay_id = target.replay_id
                 AND teammate.team = target.team
                 AND teammate.id <> target.id
            ),
            teammate_events AS MATERIALIZED (
                SELECT DISTINCT event.id, event.event_type_id
                FROM teammate_appearances appearance
                JOIN play_event_subjects subject
                  ON subject.replay_player_id = appearance.id
                JOIN play_events event
                  ON event.id = subject.event_id
                 AND event.analysis_run_id = appearance.run_id
                "#,
        );
        append_user_facing_stat_event_join_filter(&mut query, "event");
        query.push(
            r#"
            ),
            teammate_stats AS (
                SELECT
                    et.key,
                    et.display_name,
                    et.category,
                    COUNT(*) AS event_count
                FROM teammate_events
                JOIN event_types et ON et.id = teammate_events.event_type_id
                GROUP BY et.key, et.display_name, et.category
            )
            SELECT
                COALESCE(target_stats.key, teammate_stats.key) AS key,
                COALESCE(target_stats.display_name, teammate_stats.display_name) AS display_name,
                COALESCE(target_stats.category, teammate_stats.category) AS category,
                COALESCE(target_stats.event_count, 0) AS event_count,
                COALESCE(teammate_stats.event_count, 0) AS teammate_event_count
            FROM target_stats
            FULL OUTER JOIN teammate_stats
              ON teammate_stats.key = target_stats.key
            ORDER BY
                GREATEST(COALESCE(target_stats.event_count, 0), COALESCE(teammate_stats.event_count, 0)) DESC,
                category,
                display_name,
                key
            LIMIT
            "#,
        );
    } else {
        query.push(
            r#"
            SELECT
                key,
                display_name,
                category,
                event_count,
                0::bigint AS teammate_event_count
            FROM target_stats
            ORDER BY event_count DESC, category, display_name, key
            LIMIT
            "#,
        );
    }
    query.push_bind(i64::from(filters.limit));

    let rows = query.build().fetch_all(pool).await?;
    rows.into_iter().map(stat_count_row_from_db).collect()
}

fn stat_count_row_from_db(row: sqlx::postgres::PgRow) -> Result<StatCountRow, sqlx::Error> {
    let event_count: i64 = row.try_get("event_count")?;
    let teammate_event_count: i64 = row.try_get("teammate_event_count")?;
    Ok(StatCountRow {
        key: row.try_get("key")?,
        display_name: row.try_get("display_name")?,
        category: row.try_get("category")?,
        event_count: event_count.max(0) as u64,
        teammate_event_count: teammate_event_count.max(0) as u64,
    })
}

fn rotation_duration_bucket_row_from_db(
    row: sqlx::postgres::PgRow,
) -> Result<RotationDurationBucketResponse, sqlx::Error> {
    let bucket = RotationDurationBucketRow {
        bucket_start_seconds: row.try_get("bucket_start_seconds")?,
        count: row.try_get::<i64, _>("count")?.max(0) as u64,
    };
    Ok(RotationDurationBucketResponse {
        min_seconds: bucket.bucket_start_seconds,
        max_seconds: bucket.bucket_start_seconds + ROTATION_DURATION_BUCKET_SECONDS,
        count: bucket.count,
    })
}

fn append_user_facing_stat_event_join_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    event_alias: &str,
) {
    builder
        .push(" AND ")
        .push(event_alias)
        .push(".")
        .push(AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL);
}

fn append_target_player_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
) {
    let player = filters
        .player
        .as_ref()
        .expect("target player filters require a player");
    append_target_player_replay_set_filters(builder, &filters.replay_set, player);
}

fn append_replay_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args StatAggregateFilters,
    replay_alias: &str,
) {
    append_replay_set_filters(builder, &filters.replay_set, replay_alias);
}

fn finite_nonnegative(value: Option<f64>) -> Option<f64> {
    value.filter(|seconds| seconds.is_finite() && *seconds >= 0.0)
}

fn per_minute(count: u64, denominator_seconds: Option<f64>) -> Option<f64> {
    denominator_seconds
        .filter(|seconds| *seconds > 0.0)
        .map(|seconds| count as f64 * 60.0 / seconds)
}

fn parse_stat_group_by(value: &str) -> Result<StatAggregateGroupBy, ApiError> {
    match value.trim().to_ascii_lowercase().as_str() {
        "playlist" | "game-mode" | "game_mode" => Ok(StatAggregateGroupBy::Playlist),
        _ => Err(ApiError::bad_request("group-by must be one of: playlist")),
    }
}

fn playlist_label(value: &str) -> String {
    value
        .split(['-', '_'])
        .filter(|part| !part.is_empty())
        .map(|part| {
            let mut chars = part.chars();
            match chars.next() {
                Some(first) => first.to_uppercase().chain(chars).collect::<String>(),
                None => String::new(),
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}
