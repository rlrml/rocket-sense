use chrono::{DateTime, Utc};
use sqlx::{Postgres, QueryBuilder};
use uuid::Uuid;

use super::{
    query::{parse_bool_filter, parse_datetime_filter, parse_uuid_values, QueryParams},
    replays::{parse_rank_filter, ApiError},
};

/// Stride separating season-numbering eras in the season ordinal space. Legacy
/// (`s`) seasons occupy `1..STRIDE`; free-to-play (`f`) seasons occupy
/// `STRIDE+1..`. Kept well above any real season number so the two eras never
/// overlap. The same value is inlined into `push_season_ordinal_expression`.
const SEASON_ERA_STRIDE: i32 = 1000;

#[cfg(test)]
#[path = "replay_set_tests.rs"]
mod tests;

#[derive(Debug, Clone, Default)]
pub(crate) struct ReplaySetFilterInput {
    pub(crate) q: Option<String>,
    pub(crate) title: Option<String>,
    pub(crate) player_names: Vec<String>,
    pub(crate) playlists: Vec<String>,
    pub(crate) game_modes: Vec<String>,
    pub(crate) game_types: Vec<String>,
    pub(crate) team_sizes: Vec<String>,
    pub(crate) seasons: Vec<String>,
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
    pub(crate) min_rank: Option<String>,
    pub(crate) max_rank: Option<String>,
    pub(crate) min_season: Option<String>,
    pub(crate) max_season: Option<String>,
    pub(crate) target_player_id: Option<String>,
    pub(crate) player_outcome: Option<String>,
    pub(crate) include_incomplete_games: Option<bool>,
}

impl ReplaySetFilterInput {
    pub(crate) fn from_query_params(params: &QueryParams) -> Result<Self, ApiError> {
        Ok(Self {
            q: params.first(&["q"]),
            title: params.first(&["title"]),
            player_names: params.values(&["player-name", "player_names"]),
            playlists: params.values(&["playlist"]),
            game_modes: params.values(&["game-mode", "game_modes"]),
            game_types: params.values(&["game-type", "game_types", "replay-game-type"]),
            team_sizes: params.values(&["team-size", "team_sizes"]),
            seasons: params.values(&["season"]),
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
            min_rank: params.first(&["min-rank", "min_rank"]),
            max_rank: params.first(&["max-rank", "max_rank"]),
            min_season: params.first(&["min-season", "min_season"]),
            max_season: params.first(&["max-season", "max_season"]),
            target_player_id: params.first(&["player-id", "player_id"]),
            player_outcome: params.first(&["player-outcome", "player_outcome"]),
            include_incomplete_games: params
                .first(&["include-incomplete-games", "include_incomplete_games"])
                .map(|value| parse_bool_filter("include-incomplete-games", &value))
                .transpose()?,
        })
    }
}

#[derive(Debug, Clone, Default)]
pub(crate) struct ReplaySetFilters {
    pub(crate) search_pattern: Option<String>,
    pub(crate) player_name_patterns: Vec<String>,
    pub(crate) playlists: Vec<String>,
    pub(crate) game_types: Vec<String>,
    pub(crate) team_sizes: Vec<i32>,
    pub(crate) seasons: Vec<String>,
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
    pub(crate) min_rank_tier: Option<i32>,
    pub(crate) max_rank_tier: Option<i32>,
    /// When set, the rank-tier range filter is scoped to this player's per-replay
    /// rank (the profile/career use case: "my stats when I was Diamond"). When
    /// `None` but a rank range is set, it matches any player in the replay.
    pub(crate) rank_scope_player: Option<PlayerStatFilter>,
    pub(crate) min_season_ord: Option<i32>,
    pub(crate) max_season_ord: Option<i32>,
    pub(crate) playlist_group_key: Option<String>,
    pub(crate) player_outcome: Option<PlayerReplayOutcomeFilter>,
    pub(crate) include_incomplete_games: bool,
}

#[derive(Debug, Clone)]
pub(crate) struct PlayerStatFilter {
    pub(crate) platform: String,
    pub(crate) platform_player_id: String,
}

#[derive(Debug, Clone)]
pub(crate) struct PlayerReplayOutcomeFilter {
    pub(crate) player: PlayerStatFilter,
    pub(crate) outcome: ReplayOutcome,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum ReplayOutcome {
    Win,
    Loss,
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
        let mut game_types = normalize_terms(input.game_types)
            .into_iter()
            .filter(|value| !is_all_game_type_filter(value))
            .map(|value| parse_game_type_filter(&value))
            .collect::<Result<Vec<_>, _>>()?;
        game_types.sort();
        game_types.dedup();
        let mut team_sizes = normalize_terms(input.team_sizes)
            .into_iter()
            .filter(|value| !is_all_team_size_filter(value))
            .map(|value| parse_team_size_filter(&value))
            .collect::<Result<Vec<_>, _>>()?;
        team_sizes.sort_unstable();
        team_sizes.dedup();
        let file_sha256s = normalize_terms(input.file_sha256s)
            .into_iter()
            .map(|value| normalize_sha256_hex(&value))
            .collect::<Result<Vec<_>, _>>()?;
        let uploader_user_id = input
            .uploader
            .map(|uploader| parse_uploader_filter(&uploader, auth_user_id))
            .transpose()?;
        let target_player = input
            .target_player_id
            .as_deref()
            .map(PlayerStatFilter::from_query)
            .transpose()?;
        let player_outcome = input
            .player_outcome
            .map(|outcome| {
                let player = target_player.clone().ok_or_else(|| {
                    ApiError::bad_request("player-outcome requires a player-id filter")
                })?;
                Ok::<_, ApiError>(PlayerReplayOutcomeFilter {
                    player,
                    outcome: parse_replay_outcome_filter(&outcome)?,
                })
            })
            .transpose()?;

        let min_rank_tier = input
            .min_rank
            .map(|rank| parse_rank_filter("min-rank", &rank))
            .transpose()?;
        let max_rank_tier = input
            .max_rank
            .map(|rank| parse_rank_filter("max-rank", &rank))
            .transpose()?;
        if let (Some(min), Some(max)) = (min_rank_tier, max_rank_tier) {
            if min > max {
                return Err(ApiError::bad_request(
                    "min-rank must not be greater than max-rank",
                ));
            }
        }
        let min_season_ord = input
            .min_season
            .map(|season| parse_season_filter("min-season", &season))
            .transpose()?;
        let max_season_ord = input
            .max_season
            .map(|season| parse_season_filter("max-season", &season))
            .transpose()?;
        if let (Some(min), Some(max)) = (min_season_ord, max_season_ord) {
            if min > max {
                return Err(ApiError::bad_request(
                    "min-season must not be later than max-season",
                ));
            }
        }

        Ok(Self {
            search_pattern: search.map(|term| format!("%{}%", escape_like_term(&term))),
            player_name_patterns: normalize_terms(input.player_names)
                .into_iter()
                .map(|term| format!("%{}%", escape_like_term(&term)))
                .collect(),
            playlists,
            game_types,
            team_sizes,
            seasons: normalize_seasons(input.seasons),
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
            min_rank_tier,
            max_rank_tier,
            rank_scope_player: target_player,
            min_season_ord,
            max_season_ord,
            playlist_group_key: None,
            player_outcome,
            include_incomplete_games: input.include_incomplete_games.unwrap_or(false),
        })
    }
}

impl ReplaySetFilters {
    /// True when no filter narrows the replay set, i.e. the filters reference
    /// nothing on the replays table. Callers that join `replays` purely to apply
    /// these filters can skip the join entirely in this case.
    pub(crate) fn is_empty(&self) -> bool {
        self.search_pattern.is_none()
            && self.player_name_patterns.is_empty()
            && self.playlists.is_empty()
            && self.game_types.is_empty()
            && self.team_sizes.is_empty()
            && self.seasons.is_empty()
            && self.replay_ids.is_empty()
            && self.file_sha256s.is_empty()
            && self.group_id.is_none()
            && self.project_id.is_none()
            && self.maps.is_empty()
            && self.pro.is_none()
            && self.uploader_user_id.is_none()
            && self.status.is_none()
            && self.created_after.is_none()
            && self.created_before.is_none()
            && self.replay_date_after.is_none()
            && self.replay_date_before.is_none()
            && self.min_rank_tier.is_none()
            && self.max_rank_tier.is_none()
            && self.min_season_ord.is_none()
            && self.max_season_ord.is_none()
            && self.playlist_group_key.is_none()
            && self.player_outcome.is_none()
            && self.include_incomplete_games
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
    if !filters.include_incomplete_games {
        builder
            .push(" AND NOT ")
            .push(replay_alias)
            .push(".exclude_from_aggregates");
    }
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
    if !filters.game_types.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".replay_game_type = ANY(")
            .push_bind(&filters.game_types)
            .push(")");
    }
    if !filters.team_sizes.is_empty() {
        builder.push(" AND (");
        push_replay_team_size_expression(builder, replay_alias);
        builder
            .push(") = ANY(")
            .push_bind(&filters.team_sizes)
            .push(")");
    }
    if !filters.seasons.is_empty() {
        builder
            .push(" AND ")
            .push(replay_alias)
            .push(".season = ANY(")
            .push_bind(&filters.seasons)
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
        push_replay_group_subtree_membership_filter(builder, replay_alias, "stats_group", group_id);
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
            .push(".processing_status = ")
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
    if filters.min_rank_tier.is_some() || filters.max_rank_tier.is_some() {
        builder.push(" AND EXISTS (SELECT 1 FROM replay_players stats_rank_player WHERE stats_rank_player.replay_id = ");
        builder.push(replay_alias);
        builder.push(".id AND stats_rank_player.rank_tier IS NOT NULL");
        if let Some(scope) = &filters.rank_scope_player {
            builder
                .push(" AND stats_rank_player.platform = ")
                .push_bind(&scope.platform)
                .push(" AND stats_rank_player.platform_player_id = ")
                .push_bind(&scope.platform_player_id);
        }
        if let Some(min_rank_tier) = filters.min_rank_tier {
            builder
                .push(" AND stats_rank_player.rank_tier >= ")
                .push_bind(min_rank_tier);
        }
        if let Some(max_rank_tier) = filters.max_rank_tier {
            builder
                .push(" AND stats_rank_player.rank_tier <= ")
                .push_bind(max_rank_tier);
        }
        builder.push(")");
    }
    if let Some(min_season_ord) = filters.min_season_ord {
        builder.push(" AND ");
        push_season_ordinal_expression(builder, replay_alias);
        builder.push(" >= ").push_bind(min_season_ord);
    }
    if let Some(max_season_ord) = filters.max_season_ord {
        builder.push(" AND ");
        push_season_ordinal_expression(builder, replay_alias);
        builder.push(" <= ").push_bind(max_season_ord);
    }
    if let Some(outcome) = &filters.player_outcome {
        append_player_replay_outcome_filter(builder, outcome, replay_alias);
    }
}

pub(crate) fn push_replay_group_subtree_membership_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
    group_alias: &str,
    group_id: Uuid,
) {
    // Match a replay if it belongs to this group OR any descendant group, so a
    // non-leaf group aggregates every replay in its subtree. The recursive CTE
    // walks parent_group_id downward; UNION (not UNION ALL) dedupes and
    // guarantees termination even if a parent cycle ever slips in.
    builder
        .push(" AND EXISTS (SELECT 1 FROM replay_group_replays ")
        .push(group_alias)
        .push(" WHERE ")
        .push(group_alias)
        .push(".replay_id = ")
        .push(replay_alias)
        .push(".id AND ")
        .push(group_alias)
        .push(".group_id IN (WITH RECURSIVE group_subtree AS (SELECT id FROM replay_groups WHERE id = ")
        .push_bind(group_id)
        .push(" UNION SELECT child.id FROM replay_groups child JOIN group_subtree parent ON child.parent_group_id = parent.id) SELECT id FROM group_subtree))");
}

/// Maps a replay's textual `season` code (e.g. `s12`, `f23`) to its total-order
/// ordinal, mirroring `parse_season_filter` so range bounds compare against the
/// same scale. Non-conforming / NULL seasons evaluate to NULL, which excludes
/// them from any bounded range (correct: their position is unknown).
fn push_season_ordinal_expression<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
) {
    let season = format!("lower(btrim({replay_alias}.season))");
    builder.push("(CASE WHEN ");
    builder.push(&season);
    builder.push(" ~ '^[sf][0-9]+$' THEN (CASE left(");
    builder.push(&season);
    builder.push(", 1) WHEN 's' THEN 0 ELSE ");
    builder.push(SEASON_ERA_STRIDE.to_string());
    builder.push(" END) + substring(");
    builder.push(&season);
    builder.push(" from 2)::int END)");
}

/// Parses a season code like `s12` (legacy) or `f23` (free-to-play) into a
/// total-order ordinal. Legacy seasons sort before free-to-play seasons, then by
/// number, so a `[min, max]` pair resolves to a contiguous slice of the season
/// timeline. Mirrored in SQL by `push_season_ordinal_expression`.
fn parse_season_filter(name: &str, value: &str) -> Result<i32, ApiError> {
    let normalized = value.trim().to_lowercase();
    let invalid =
        || ApiError::bad_request(format!("{name} must be a season code like `s12` or `f23`"));
    let (era_base, digits) = if let Some(rest) = normalized.strip_prefix('s') {
        (0, rest)
    } else if let Some(rest) = normalized.strip_prefix('f') {
        (SEASON_ERA_STRIDE, rest)
    } else {
        return Err(invalid());
    };
    let number: i32 = digits
        .parse()
        .ok()
        .filter(|number| (1..SEASON_ERA_STRIDE).contains(number))
        .ok_or_else(invalid)?;
    Ok(era_base + number)
}

fn append_player_replay_outcome_filter<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    filter: &'args PlayerReplayOutcomeFilter,
    replay_alias: &str,
) {
    let team_zero_operator = match filter.outcome {
        ReplayOutcome::Win => ">",
        ReplayOutcome::Loss => "<",
    };
    let team_one_operator = match filter.outcome {
        ReplayOutcome::Win => "<",
        ReplayOutcome::Loss => ">",
    };

    builder.push(" AND EXISTS (SELECT 1 FROM replay_players outcome_player WHERE outcome_player.replay_id = ");
    builder.push(replay_alias);
    builder.push(".id AND outcome_player.platform = ");
    builder.push_bind(&filter.player.platform);
    builder.push(" AND outcome_player.platform_player_id = ");
    builder.push_bind(&filter.player.platform_player_id);
    builder.push(" AND outcome_player.team IS NOT NULL AND ");
    builder.push(replay_alias);
    builder.push(".team_zero_score IS NOT NULL AND ");
    builder.push(replay_alias);
    builder.push(".team_one_score IS NOT NULL AND ((outcome_player.team = 0 AND ");
    builder.push(replay_alias);
    builder.push(".team_zero_score ");
    builder.push(team_zero_operator);
    builder.push(" ");
    builder.push(replay_alias);
    builder.push(".team_one_score) OR (outcome_player.team = 1 AND ");
    builder.push(replay_alias);
    builder.push(".team_zero_score ");
    builder.push(team_one_operator);
    builder.push(" ");
    builder.push(replay_alias);
    builder.push(".team_one_score)))");
}

/// Canonical playlist group key combining the two orthogonal segmentation
/// dimensions described in `docs/stats-principles.md`: competitive context
/// (from `replay_game_type`, with a textual-playlist fallback) and team size
/// (derived from active players). Produces keys like `ranked-2v2`,
/// `casual-3v3`, or `tournament-1v1`, falling back to the raw playlist text
/// when team size cannot be derived.
pub(crate) fn push_playlist_group_key_expression<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
) {
    builder.push("(SELECT CASE WHEN stats_mode_size.size_label IS NULL THEN NULLIF(btrim(");
    builder.push(replay_alias);
    builder.push(".playlist), '') ELSE COALESCE(");
    builder.push(replay_alias);
    builder.push(".replay_game_type, CASE WHEN lower(btrim(COALESCE(");
    builder.push(replay_alias);
    builder.push(".playlist, ''))) LIKE 'ranked%' THEN 'ranked' WHEN lower(btrim(COALESCE(");
    builder.push(replay_alias);
    builder.push(".playlist, ''))) LIKE 'casual%' THEN 'casual' WHEN lower(btrim(COALESCE(");
    builder.push(replay_alias);
    builder.push(
        ".playlist, ''))) LIKE 'tournament%' THEN 'tournament' ELSE 'unknown' END) || '-' || stats_mode_size.size_label END FROM (SELECT CASE (",
    );
    push_replay_team_size_expression(builder, replay_alias);
    builder.push(
        ") WHEN 1 THEN '1v1' WHEN 2 THEN '2v2' WHEN 3 THEN '3v3' WHEN 4 THEN '4v4' END AS size_label) stats_mode_size)",
    );
}

/// Derives the per-team player count for a replay from the players that
/// actually participated, not from header metadata. Players with a recorded
/// active time of zero (e.g. spectating referees in private/RLCS lobbies that
/// still appear on a team roster) are excluded; players with no recorded
/// active time (legacy rows) are counted.
pub(crate) fn push_replay_team_size_expression<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
) {
    builder
        .push("SELECT MAX(team_player_count)::integer FROM (SELECT COUNT(*) AS team_player_count FROM replay_players stats_mode_player WHERE stats_mode_player.replay_id = ")
        .push(replay_alias)
        .push(".id AND stats_mode_player.team IS NOT NULL AND (stats_mode_player.active_time_seconds IS NULL OR stats_mode_player.active_time_seconds > 0) GROUP BY stats_mode_player.team) stats_mode_team_counts");
}

const ALLOWED_GAME_TYPE_FILTERS: &[&str] = &[
    "ranked",
    "casual",
    "private",
    "offline",
    "lan",
    "tournament",
    "unknown",
];

fn parse_game_type_filter(value: &str) -> Result<String, ApiError> {
    let normalized = value.trim().to_ascii_lowercase();
    if ALLOWED_GAME_TYPE_FILTERS.contains(&normalized.as_str()) {
        Ok(normalized)
    } else {
        Err(ApiError::bad_request(format!(
            "game-type must be one of: {}",
            ALLOWED_GAME_TYPE_FILTERS.join(", ")
        )))
    }
}

fn is_all_game_type_filter(value: &str) -> bool {
    matches!(value.trim().to_ascii_lowercase().as_str(), "any" | "all")
}

fn parse_team_size_filter(value: &str) -> Result<i32, ApiError> {
    let normalized = value.trim().to_ascii_lowercase();
    let digits = match normalized.as_str() {
        "1v1" => "1",
        "2v2" => "2",
        "3v3" => "3",
        "4v4" => "4",
        other => other,
    };
    digits
        .parse::<i32>()
        .ok()
        .filter(|size| (1..=4).contains(size))
        .ok_or_else(|| ApiError::bad_request("team-size must be 1-4 (or 1v1, 2v2, 3v3, 4v4)"))
}

fn is_all_team_size_filter(value: &str) -> bool {
    matches!(value.trim().to_ascii_lowercase().as_str(), "all" | "any")
}

fn parse_replay_outcome_filter(value: &str) -> Result<ReplayOutcome, ApiError> {
    match value.trim().to_ascii_lowercase().as_str() {
        "win" | "wins" | "won" => Ok(ReplayOutcome::Win),
        "loss" | "losses" | "lost" => Ok(ReplayOutcome::Loss),
        _ => Err(ApiError::bad_request("player-outcome must be win or loss")),
    }
}

pub(crate) fn normalize_terms(terms: Vec<String>) -> Vec<String> {
    terms
        .into_iter()
        .map(|term| term.trim().to_owned())
        .filter(|term| !term.is_empty())
        .collect()
}

fn normalize_seasons(seasons: Vec<String>) -> Vec<String> {
    let mut seasons: Vec<String> = normalize_terms(seasons)
        .into_iter()
        .map(|season| season.to_ascii_lowercase())
        .collect();
    seasons.sort();
    seasons.dedup();
    seasons
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
