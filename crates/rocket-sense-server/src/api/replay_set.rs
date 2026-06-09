use chrono::{DateTime, Utc};
use sqlx::{Postgres, QueryBuilder};
use uuid::Uuid;

use super::{
    query::{parse_bool_filter, parse_datetime_filter, parse_uuid_values, QueryParams},
    replays::ApiError,
};

#[derive(Debug, Clone, Default)]
pub(crate) struct ReplaySetFilterInput {
    pub(crate) q: Option<String>,
    pub(crate) title: Option<String>,
    pub(crate) player_names: Vec<String>,
    pub(crate) playlists: Vec<String>,
    pub(crate) game_modes: Vec<String>,
    pub(crate) replay_ids: Vec<Uuid>,
    pub(crate) file_sha256s: Vec<String>,
    pub(crate) group: Option<String>,
    pub(crate) project: Option<String>,
    pub(crate) maps: Vec<String>,
    pub(crate) pro: Option<bool>,
    pub(crate) uploader: Option<String>,
    pub(crate) status: Option<String>,
    pub(crate) created_after: Option<DateTime<Utc>>,
    pub(crate) created_before: Option<DateTime<Utc>>,
    pub(crate) replay_date_after: Option<DateTime<Utc>>,
    pub(crate) replay_date_before: Option<DateTime<Utc>>,
}

impl ReplaySetFilterInput {
    pub(crate) fn from_query_params(params: &QueryParams) -> Result<Self, ApiError> {
        Ok(Self {
            q: params.first(&["q"]),
            title: params.first(&["title"]),
            player_names: params.values(&["player-name", "player_names"]),
            playlists: params.values(&["playlist"]),
            game_modes: params.values(&["game-mode", "game_modes"]),
            replay_ids: parse_uuid_values(
                "replay-id",
                params.values(&["replay-id", "replay_ids"]),
            )?,
            file_sha256s: params.values(&["sha256", "file_sha256s"]),
            group: params.first(&["group"]),
            project: params.first(&["project"]),
            maps: params.values(&["map", "maps"]),
            pro: params
                .first(&["pro"])
                .map(|value| parse_bool_filter("pro", &value))
                .transpose()?,
            uploader: params.first(&["uploader"]),
            status: params.first(&["status"]),
            created_after: params
                .first(&["created-after", "created_after"])
                .map(|value| parse_datetime_filter("created-after", &value))
                .transpose()?,
            created_before: params
                .first(&["created-before", "created_before"])
                .map(|value| parse_datetime_filter("created-before", &value))
                .transpose()?,
            replay_date_after: params
                .first(&["replay-date-after", "replay_date_after"])
                .map(|value| parse_datetime_filter("replay-date-after", &value))
                .transpose()?,
            replay_date_before: params
                .first(&["replay-date-before", "replay_date_before"])
                .map(|value| parse_datetime_filter("replay-date-before", &value))
                .transpose()?,
        })
    }
}

#[derive(Debug, Clone, Default)]
pub(crate) struct ReplaySetFilters {
    pub(crate) search_pattern: Option<String>,
    pub(crate) player_name_patterns: Vec<String>,
    pub(crate) playlists: Vec<String>,
    pub(crate) replay_ids: Vec<Uuid>,
    pub(crate) file_sha256s: Vec<String>,
    pub(crate) group_id: Option<Uuid>,
    pub(crate) project_id: Option<Uuid>,
    pub(crate) maps: Vec<String>,
    pub(crate) pro: Option<bool>,
    pub(crate) uploader_user_id: Option<Uuid>,
    pub(crate) status: Option<String>,
    pub(crate) created_after: Option<DateTime<Utc>>,
    pub(crate) created_before: Option<DateTime<Utc>>,
    pub(crate) replay_date_after: Option<DateTime<Utc>>,
    pub(crate) replay_date_before: Option<DateTime<Utc>>,
    pub(crate) playlist_group_key: Option<String>,
}

#[derive(Debug, Clone)]
pub(crate) struct PlayerStatFilter {
    pub(crate) platform: String,
    pub(crate) platform_player_id: String,
}

impl ReplaySetFilters {
    pub(crate) fn from_input(
        input: ReplaySetFilterInput,
        auth_user_id: Option<Uuid>,
    ) -> Result<Self, ApiError> {
        let search = input
            .q
            .or(input.title)
            .map(|term| term.trim().to_owned())
            .filter(|term| !term.is_empty());
        let mut playlists = normalize_terms(input.playlists);
        playlists.extend(normalize_terms(input.game_modes));
        playlists.sort();
        playlists.dedup();
        let file_sha256s = normalize_terms(input.file_sha256s)
            .into_iter()
            .map(|value| normalize_sha256_hex(&value))
            .collect::<Result<Vec<_>, _>>()?;
        let uploader_user_id = input
            .uploader
            .map(|uploader| parse_uploader_filter(&uploader, auth_user_id))
            .transpose()?;

        Ok(Self {
            search_pattern: search.map(|term| format!("%{}%", escape_like_term(&term))),
            player_name_patterns: normalize_terms(input.player_names)
                .into_iter()
                .map(|term| format!("%{}%", escape_like_term(&term)))
                .collect(),
            playlists,
            replay_ids: input.replay_ids,
            file_sha256s,
            group_id: input
                .group
                .map(|group| parse_uuid_filter("group", &group))
                .transpose()?,
            project_id: input
                .project
                .map(|project| parse_uuid_filter("project", &project))
                .transpose()?,
            maps: normalize_terms(input.maps),
            pro: input.pro,
            uploader_user_id,
            status: input
                .status
                .map(|status| status.trim().to_lowercase())
                .filter(|status| !status.is_empty()),
            created_after: input.created_after,
            created_before: input.created_before,
            replay_date_after: input.replay_date_after,
            replay_date_before: input.replay_date_before,
            playlist_group_key: None,
        })
    }
}

impl PlayerStatFilter {
    pub(crate) fn new(
        platform: impl Into<String>,
        platform_player_id: impl Into<String>,
    ) -> Result<Self, ApiError> {
        let platform = platform.into().trim().to_ascii_lowercase();
        let platform_player_id = platform_player_id.into().trim().to_owned();
        if platform.is_empty() || platform_player_id.is_empty() {
            return Err(ApiError::bad_request(
                "player filter must include both platform and id",
            ));
        }

        Ok(Self {
            platform,
            platform_player_id,
        })
    }

    pub(crate) fn from_query(value: &str) -> Result<Self, ApiError> {
        let (platform, player_id) = value
            .split_once(':')
            .ok_or_else(|| ApiError::bad_request("player-id must use `platform:id` format"))?;
        Self::new(platform, player_id)
    }
}

pub(crate) fn append_target_player_replay_set_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args ReplaySetFilters,
    player: &'args PlayerStatFilter,
) {
    builder.push(" WHERE rp.platform = ");
    builder.push_bind(&player.platform);
    builder.push(" AND rp.platform_player_id = ");
    builder.push_bind(&player.platform_player_id);
    append_replay_set_filters(builder, filters, "r");
}

pub(crate) fn append_replay_set_filters<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filters: &'args ReplaySetFilters,
    replay_alias: &str,
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
    for pattern in &filters.player_name_patterns {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_players stats_name_player WHERE stats_name_player.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND stats_name_player.name ILIKE ");
        builder.push_bind(pattern);
        builder.push(" ESCAPE '\\')");
    }
    if !filters.playlists.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".playlist = ANY(")
            .push_bind(&filters.playlists)
            .push(")");
    }
    if let Some(playlist_group_key) = &filters.playlist_group_key {
        builder.push(" AND ");
        push_playlist_group_key_expression(builder, replay_alias);
        builder.push(" = ");
        builder.push_bind(playlist_group_key);
    }
    if !filters.replay_ids.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".id = ANY(")
            .push_bind(&filters.replay_ids)
            .push(")");
    }
    if !filters.file_sha256s.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".file_sha256 = ANY(")
            .push_bind(&filters.file_sha256s)
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
        if pro {
            builder
                .push(" AND ")
                .push(replay_alias)
                .push(".has_pro_player");
        } else {
            builder
                .push(" AND NOT ")
                .push(replay_alias)
                .push(".has_pro_player");
        }
    }
    if let Some(uploader_user_id) = filters.uploader_user_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".uploaded_by_user_id = ")
            .push_bind(uploader_user_id);
    }
    if let Some(group_id) = filters.group_id {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_group_replays stats_group WHERE stats_group.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND stats_group.group_id = ");
        builder.push_bind(group_id);
        builder.push(")");
    }
    if let Some(project_id) = filters.project_id {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".project_id = ")
            .push_bind(project_id);
    }
    if let Some(status) = &filters.status {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".parse_status = ")
            .push_bind(status);
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

pub(crate) fn push_playlist_group_key_expression<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
) {
    builder
        .push("CASE WHEN lower(btrim(COALESCE(")
        .push(replay_alias)
        .push(".playlist, ''))) = 'online' THEN COALESCE(CASE (");
    push_replay_team_size_expression(builder, replay_alias);
    builder
        .push(") WHEN 1 THEN 'online-1v1' WHEN 2 THEN 'online-2v2' WHEN 3 THEN 'online-3v3' WHEN 4 THEN 'online-4v4' END, NULLIF(btrim(")
        .push(replay_alias)
        .push(".playlist), '')) ELSE NULLIF(btrim(")
        .push(replay_alias)
        .push(".playlist), '') END");
}

fn push_replay_team_size_expression<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
) {
    builder
        .push("SELECT MAX(team_player_count)::integer FROM (SELECT COUNT(*) AS team_player_count FROM replay_players stats_mode_player WHERE stats_mode_player.replay_id = ")
        .push(replay_alias)
        .push(".id AND stats_mode_player.team IS NOT NULL GROUP BY stats_mode_player.team) stats_mode_team_counts");
}

pub(crate) fn normalize_terms(terms: Vec<String>) -> Vec<String> {
    terms
        .into_iter()
        .map(|term| term.trim().to_owned())
        .filter(|term| !term.is_empty())
        .collect()
}

fn parse_uploader_filter(value: &str, auth_user_id: Option<Uuid>) -> Result<Uuid, ApiError> {
    let value = value.trim();
    if value == "me" {
        return auth_user_id.ok_or_else(|| {
            ApiError::new(
                axum::http::StatusCode::UNAUTHORIZED,
                "uploader=me requires authentication",
            )
        });
    }

    Uuid::parse_str(value)
        .map_err(|_| ApiError::bad_request("uploader must be `me` or a Rocket Sense user UUID"))
}

fn parse_uuid_filter(name: &str, value: &str) -> Result<Uuid, ApiError> {
    Uuid::parse_str(value.trim())
        .map_err(|_| ApiError::bad_request(format!("{name} must be a UUID")))
}

fn escape_like_term(term: &str) -> String {
    term.replace('\\', "\\\\")
        .replace('%', "\\%")
        .replace('_', "\\_")
}

fn normalize_sha256_hex(value: &str) -> Result<String, ApiError> {
    let value = value.trim();
    if value.len() != 64 || !value.bytes().all(|byte| byte.is_ascii_hexdigit()) {
        return Err(ApiError::bad_request(
            "sha256 must be a 64-character hexadecimal SHA-256 digest",
        ));
    }

    Ok(value.to_ascii_lowercase())
}
