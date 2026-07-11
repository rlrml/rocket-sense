//! Shared privacy/visibility helpers for replays, replay groups, and player
//! career stats.
//!
//! Each resource carries a [`Visibility`]. Enforcement blocks *direct* access
//! only (a private resource's own page/download/list entry); private resources
//! are still counted anonymously inside group subtree aggregates and other
//! players' career aggregates, so the aggregation queries are intentionally
//! untouched.
//!
//! Access rules (see also `migrations/0091_visibility.sql`):
//! - `public` — listed and readable by anyone.
//! - `unlisted` — readable by anyone with the direct link/id, hidden from lists.
//! - `private` — readable only by the owner/manager/admin, or a user the
//!   resource has been explicitly shared with.

use std::collections::HashSet;

use axum::http::StatusCode;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Postgres, QueryBuilder, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::replay_set::{PlayerStatFilter, ReplaySetFilters};
use super::replays::ApiError;
use crate::{app::AppState, auth::AuthUser};

#[cfg(test)]
#[path = "visibility_tests.rs"]
mod tests;

/// How visible a resource is to users other than its owner/managers.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default, ToSchema)]
#[serde(rename_all = "lowercase")]
pub(crate) enum Visibility {
    /// Listed and readable by anyone (the historical default).
    #[default]
    Public,
    /// Readable by anyone with the direct link/id, but hidden from lists.
    Unlisted,
    /// Readable only by the owner/manager/admin or a shared-with user.
    Private,
}

impl Visibility {
    pub(crate) fn as_str(self) -> &'static str {
        match self {
            Visibility::Public => "public",
            Visibility::Unlisted => "unlisted",
            Visibility::Private => "private",
        }
    }

    /// Parse a database string. The check constraints should make the fallback
    /// unreachable, but fail closed if corrupt or future data reaches an older
    /// server rather than accidentally publishing it.
    pub(crate) fn from_db(value: &str) -> Self {
        match value {
            "public" => Visibility::Public,
            "unlisted" => Visibility::Unlisted,
            "private" => Visibility::Private,
            _ => Visibility::Private,
        }
    }

    /// Whether direct (link/id) access is allowed without owner/share/admin
    /// rights. Only `private` requires them.
    fn requires_grant_for_direct_access(self) -> bool {
        matches!(self, Visibility::Private)
    }
}

/// Request body for the visibility-setter endpoints.
#[derive(Debug, Deserialize, ToSchema)]
pub(crate) struct SetVisibilityRequest {
    pub visibility: Visibility,
}

/// Resolve whether `viewer` is a server admin. Uses the same on-demand seeding
/// path as the rest of the API so a configured admin is promoted on first use.
async fn viewer_is_admin(
    state: &AppState,
    pool: &PgPool,
    viewer: &AuthUser,
) -> Result<bool, ApiError> {
    crate::auth::resolve_is_admin(pool, viewer, &state.admin_emails)
        .await
        .map_err(ApiError::internal)
}

/// Direct-access check for a single replay. Returns `false` when the replay is
/// missing or the viewer may not see it, so callers can collapse both into a
/// single 404 (which avoids leaking the existence of a private replay).
pub(crate) async fn can_view_replay(
    state: &AppState,
    pool: &PgPool,
    replay_id: Uuid,
    viewer: Option<&AuthUser>,
) -> Result<bool, ApiError> {
    let Some(row) =
        sqlx::query("SELECT visibility, uploaded_by_user_id FROM replays WHERE id = $1")
            .bind(replay_id)
            .fetch_optional(pool)
            .await
            .map_err(ApiError::internal)?
    else {
        return Ok(false);
    };
    let visibility = Visibility::from_db(
        &row.try_get::<String, _>("visibility")
            .map_err(ApiError::internal)?,
    );
    if !visibility.requires_grant_for_direct_access() {
        return Ok(true);
    }
    let owner: Option<Uuid> = row
        .try_get("uploaded_by_user_id")
        .map_err(ApiError::internal)?;

    let Some(viewer) = viewer else {
        return Ok(false);
    };
    if owner == Some(viewer.id) {
        return Ok(true);
    }
    let shared: bool = sqlx::query_scalar(
        "SELECT EXISTS (SELECT 1 FROM replay_shares WHERE replay_id = $1 AND user_id = $2)",
    )
    .bind(replay_id)
    .bind(viewer.id)
    .fetch_one(pool)
    .await
    .map_err(ApiError::internal)?;
    if shared {
        return Ok(true);
    }
    viewer_is_admin(state, pool, viewer).await
}

/// Direct replay access for background jobs that have a persisted user id but
/// no request-time [`AuthUser`]. Configured admins are persisted as admins on
/// normal authenticated use, so the database flag is sufficient here.
pub(crate) async fn can_view_replay_for_user_id(
    pool: &PgPool,
    replay_id: Uuid,
    viewer_user_id: Uuid,
) -> Result<bool, ApiError> {
    sqlx::query_scalar(
        "SELECT EXISTS (\
            SELECT 1 FROM replays r WHERE r.id = $1 AND (\
                r.visibility <> 'private' \
                OR r.uploaded_by_user_id = $2 \
                OR EXISTS (SELECT 1 FROM replay_shares s \
                    WHERE s.replay_id = r.id AND s.user_id = $2) \
                OR EXISTS (SELECT 1 FROM users u WHERE u.id = $2 AND u.is_admin)\
            )\
        )",
    )
    .bind(replay_id)
    .bind(viewer_user_id)
    .fetch_one(pool)
    .await
    .map_err(ApiError::internal)
}

/// Direct-access check for a single replay group (creator/manager/share/admin
/// for `private`; anyone otherwise).
pub(crate) async fn can_view_group(
    state: &AppState,
    pool: &PgPool,
    group_id: Uuid,
    viewer: Option<&AuthUser>,
) -> Result<bool, ApiError> {
    let Some(row) =
        sqlx::query("SELECT visibility, created_by_user_id FROM replay_groups WHERE id = $1")
            .bind(group_id)
            .fetch_optional(pool)
            .await
            .map_err(ApiError::internal)?
    else {
        return Ok(false);
    };
    let visibility = Visibility::from_db(
        &row.try_get::<String, _>("visibility")
            .map_err(ApiError::internal)?,
    );
    if !visibility.requires_grant_for_direct_access() {
        return Ok(true);
    }
    let creator: Option<Uuid> = row
        .try_get("created_by_user_id")
        .map_err(ApiError::internal)?;

    let Some(viewer) = viewer else {
        return Ok(false);
    };
    if creator == Some(viewer.id) {
        return Ok(true);
    }
    let manager_or_shared: bool = sqlx::query_scalar(
        "SELECT EXISTS (SELECT 1 FROM replay_group_managers WHERE group_id = $1 AND user_id = $2) \
            OR EXISTS (SELECT 1 FROM replay_group_shares WHERE group_id = $1 AND user_id = $2)",
    )
    .bind(group_id)
    .bind(viewer.id)
    .fetch_one(pool)
    .await
    .map_err(ApiError::internal)?;
    if manager_or_shared {
        return Ok(true);
    }
    viewer_is_admin(state, pool, viewer).await
}

/// Whether a user owns a player identity: a verified claim, or a login identity
/// whose provider subject is that platform id (the same union surfaced as a
/// user's linked game identities).
pub(crate) async fn user_owns_player_identity(
    pool: &PgPool,
    user_id: Uuid,
    platform: &str,
    platform_player_id: &str,
) -> Result<bool, ApiError> {
    sqlx::query_scalar(
        "SELECT EXISTS ( \
            SELECT 1 FROM player_identity_claims \
            WHERE user_id = $1 AND platform = $2 AND platform_player_id = $3 \
              AND status = 'verified' \
            UNION ALL \
            SELECT 1 FROM auth_identities \
            WHERE user_id = $1 AND provider_name = $2 AND subject = $3 \
        )",
    )
    .bind(user_id)
    .bind(platform)
    .bind(platform_player_id)
    .fetch_one(pool)
    .await
    .map_err(ApiError::internal)
}

/// Direct-access check for a player's career stats / profile.
pub(crate) async fn can_view_player_stats(
    state: &AppState,
    pool: &PgPool,
    platform: &str,
    platform_player_id: &str,
    viewer: Option<&AuthUser>,
) -> Result<bool, ApiError> {
    // Absent identity rows default to public: an unseen player has no stats to
    // hide, and gating them would break first-sighting profile loads.
    let visibility: Option<String> = sqlx::query_scalar(
        "SELECT stats_visibility FROM player_identities \
            WHERE platform = $1 AND platform_player_id = $2",
    )
    .bind(platform)
    .bind(platform_player_id)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::internal)?;
    let visibility = visibility
        .as_deref()
        .map(Visibility::from_db)
        .unwrap_or_default();
    if !visibility.requires_grant_for_direct_access() {
        return Ok(true);
    }

    let Some(viewer) = viewer else {
        return Ok(false);
    };
    if user_owns_player_identity(pool, viewer.id, platform, platform_player_id).await? {
        return Ok(true);
    }
    let shared: bool = sqlx::query_scalar(
        "SELECT EXISTS (SELECT 1 FROM player_identity_stats_shares \
            WHERE platform = $1 AND platform_player_id = $2 AND user_id = $3)",
    )
    .bind(platform)
    .bind(platform_player_id)
    .bind(viewer.id)
    .fetch_one(pool)
    .await
    .map_err(ApiError::internal)?;
    if shared {
        return Ok(true);
    }
    viewer_is_admin(state, pool, viewer).await
}

/// Privacy gate shared by every player-stat endpoint. Player-scoped career
/// data is direct access to that player's stats; a single replay or explicit
/// group scope is likewise direct access to that resource. Multi-replay sets
/// remain aggregate queries by design.
pub(crate) async fn enforce_stat_scope_visibility(
    state: &AppState,
    pool: &PgPool,
    player: Option<&PlayerStatFilter>,
    replay_set: &ReplaySetFilters,
    viewer: Option<&AuthUser>,
) -> Result<(), ApiError> {
    if let Some(player) = player {
        if !can_view_player_stats(
            state,
            pool,
            &player.platform,
            &player.platform_player_id,
            viewer,
        )
        .await?
        {
            return Err(ApiError::new(
                StatusCode::NOT_FOUND,
                "player stats not found",
            ));
        }
    }
    if let Some(group_id) = replay_set.group_id {
        if !can_view_group(state, pool, group_id, viewer).await? {
            return Err(ApiError::new(
                StatusCode::NOT_FOUND,
                "replay group not found",
            ));
        }
    }
    if let [replay_id] = replay_set.replay_ids.as_slice() {
        if !can_view_replay(state, pool, *replay_id, viewer).await? {
            return Err(ApiError::new(StatusCode::NOT_FOUND, "replay not found"));
        }
    }
    Ok(())
}

/// The career-stats visibility of a player identity, for display on the profile
/// response. Defaults to public when the identity has no row yet.
pub(crate) async fn player_stats_visibility(
    pool: &PgPool,
    platform: &str,
    platform_player_id: &str,
) -> Result<Visibility, ApiError> {
    let value: Option<String> = sqlx::query_scalar(
        "SELECT stats_visibility FROM player_identities \
            WHERE platform = $1 AND platform_player_id = $2",
    )
    .bind(platform)
    .bind(platform_player_id)
    .fetch_optional(pool)
    .await
    .map_err(ApiError::internal)?;
    Ok(value
        .as_deref()
        .map(Visibility::from_db)
        .unwrap_or_default())
}

/// Whether `viewer` can change a player's career-stats privacy (own the
/// identity, or be an admin).
pub(crate) async fn can_manage_player_stats(
    state: &AppState,
    pool: &PgPool,
    platform: &str,
    platform_player_id: &str,
    viewer: &AuthUser,
) -> Result<bool, ApiError> {
    if user_owns_player_identity(pool, viewer.id, platform, platform_player_id).await? {
        return Ok(true);
    }
    viewer_is_admin(state, pool, viewer).await
}

/// Of `candidate_ids`, which replays may `viewer` manage (own or admin). Used to
/// populate `viewer_can_manage` on responses without an extra round trip per row.
pub(crate) async fn manageable_replay_ids(
    pool: &PgPool,
    viewer: Option<&AuthUser>,
    candidate_ids: &[Uuid],
) -> Result<HashSet<Uuid>, ApiError> {
    let Some(viewer) = viewer else {
        return Ok(HashSet::new());
    };
    if candidate_ids.is_empty() {
        return Ok(HashSet::new());
    }
    let rows = sqlx::query(
        "SELECT r.id FROM replays r \
            WHERE r.id = ANY($1) AND ( \
                r.uploaded_by_user_id = $2 \
                OR EXISTS (SELECT 1 FROM users u WHERE u.id = $2 AND u.is_admin) \
            )",
    )
    .bind(candidate_ids)
    .bind(viewer.id)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;
    rows.into_iter()
        .map(|row| row.try_get::<Uuid, _>("id").map_err(ApiError::internal))
        .collect()
}

/// Of `candidate_ids`, which groups may `viewer` manage (creator, co-manager, or
/// admin).
pub(crate) async fn manageable_group_ids(
    pool: &PgPool,
    viewer: Option<&AuthUser>,
    candidate_ids: &[Uuid],
) -> Result<HashSet<Uuid>, ApiError> {
    let Some(viewer) = viewer else {
        return Ok(HashSet::new());
    };
    if candidate_ids.is_empty() {
        return Ok(HashSet::new());
    }
    let rows = sqlx::query(
        "SELECT g.id FROM replay_groups g \
            WHERE g.id = ANY($1) AND ( \
                g.created_by_user_id = $2 \
                OR EXISTS (SELECT 1 FROM replay_group_managers m \
                    WHERE m.group_id = g.id AND m.user_id = $2) \
                OR EXISTS (SELECT 1 FROM users u WHERE u.id = $2 AND u.is_admin) \
            )",
    )
    .bind(candidate_ids)
    .bind(viewer.id)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;
    rows.into_iter()
        .map(|row| row.try_get::<Uuid, _>("id").map_err(ApiError::internal))
        .collect()
}

/// SQL predicate (with a leading `AND`) limiting a `replay_groups replay_group`
/// query to rows the viewer may see in a *list*: public to all, plus groups the
/// viewer created, co-manages, or has been shared. `viewer_param` is the
/// positional placeholder (e.g. `"$1"`) for the viewer id the caller binds, or
/// `None` for an anonymous viewer.
///
/// (The replay-list path uses `QueryBuilder` auto-numbered binds inline rather
/// than this pre-rendered form.)
pub(crate) fn group_list_visibility_sql(viewer_param: Option<&str>) -> String {
    list_visibility_sql(
        "replay_group.visibility",
        "replay_group.created_by_user_id",
        "replay_group.id",
        "replay_group_shares",
        "group_id",
        Some("replay_group_managers"),
        viewer_param,
    )
}

/// SQL predicate (with a leading `AND`) limiting a replay list to public rows,
/// plus rows owned by or explicitly shared with the viewer. Unlisted replays
/// remain available by direct id/link but do not appear in lists.
pub(crate) fn replay_list_visibility_sql(replay_alias: &str, viewer_param: Option<&str>) -> String {
    list_visibility_sql(
        &format!("{replay_alias}.visibility"),
        &format!("{replay_alias}.uploaded_by_user_id"),
        &format!("{replay_alias}.id"),
        "replay_shares",
        "replay_id",
        None,
        viewer_param,
    )
}

/// QueryBuilder form of [`replay_list_visibility_sql`] for callers whose bind
/// positions are assigned dynamically.
pub(crate) fn push_replay_list_visibility<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
    viewer_user_id: Option<Uuid>,
) {
    match viewer_user_id {
        Some(viewer_user_id) => {
            builder
                .push(format!(
                    " AND ({replay_alias}.visibility = 'public' OR \
                     {replay_alias}.uploaded_by_user_id = "
                ))
                .push_bind(viewer_user_id)
                .push(format!(
                    " OR EXISTS (SELECT 1 FROM replay_shares s \
                     WHERE s.replay_id = {replay_alias}.id AND s.user_id = "
                ))
                .push_bind(viewer_user_id)
                .push("))");
        }
        None => {
            builder.push(format!(" AND {replay_alias}.visibility = 'public'"));
        }
    }
}

/// Restrict an explicit replay-id/link lookup to rows the viewer may access.
/// Unlike a list, this admits unlisted rows; only private rows require a grant.
pub(crate) fn push_replay_direct_visibility<'args>(
    builder: &mut QueryBuilder<'args, Postgres>,
    replay_alias: &str,
    viewer_user_id: Option<Uuid>,
) {
    match viewer_user_id {
        Some(viewer_user_id) => {
            builder
                .push(format!(
                    " AND ({replay_alias}.visibility <> 'private' OR \
                     {replay_alias}.uploaded_by_user_id = "
                ))
                .push_bind(viewer_user_id)
                .push(format!(
                    " OR EXISTS (SELECT 1 FROM replay_shares s \
                     WHERE s.replay_id = {replay_alias}.id AND s.user_id = "
                ))
                .push_bind(viewer_user_id)
                .push(") OR EXISTS (SELECT 1 FROM users u WHERE u.id = ")
                .push_bind(viewer_user_id)
                .push(" AND u.is_admin)))");
        }
        None => {
            builder.push(format!(" AND {replay_alias}.visibility <> 'private'"));
        }
    }
}

// ---------------------------------------------------------------------------
// Per-user sharing (the explicit allowlist that grants read access to an
// otherwise non-public resource).
// ---------------------------------------------------------------------------

/// Identify a user to share with. Provide exactly one of `user_id` or `email`;
/// `email` is matched case-insensitively against an existing user.
#[derive(Debug, Deserialize, ToSchema)]
pub(crate) struct ShareTargetRequest {
    #[serde(default)]
    pub user_id: Option<Uuid>,
    #[serde(default)]
    pub email: Option<String>,
}

/// A user a resource has been shared with.
#[derive(Debug, Serialize, ToSchema)]
pub(crate) struct ShareResponse {
    pub user_id: Uuid,
    pub email: Option<String>,
    pub display_name: Option<String>,
    pub added_by_user_id: Option<Uuid>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, ToSchema)]
pub(crate) struct ListSharesResponse {
    pub shares: Vec<ShareResponse>,
}

/// Resolve a [`ShareTargetRequest`] to an existing user id.
pub(crate) async fn resolve_share_target_user(
    pool: &PgPool,
    request: &ShareTargetRequest,
) -> Result<Uuid, ApiError> {
    let email = request
        .email
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty());
    match (request.user_id, email) {
        (Some(_), Some(_)) => Err(ApiError::bad_request(
            "provide either user_id or email, not both",
        )),
        (None, None) => Err(ApiError::bad_request(
            "a share must identify a user by user_id or email",
        )),
        (Some(user_id), None) => {
            let exists: bool =
                sqlx::query_scalar("SELECT EXISTS (SELECT 1 FROM users WHERE id = $1)")
                    .bind(user_id)
                    .fetch_one(pool)
                    .await
                    .map_err(ApiError::internal)?;
            exists
                .then_some(user_id)
                .ok_or_else(|| ApiError::new(StatusCode::NOT_FOUND, "no such user"))
        }
        (None, Some(email)) => {
            let user_id: Option<Uuid> =
                sqlx::query_scalar("SELECT id FROM users WHERE lower(primary_email) = lower($1)")
                    .bind(email)
                    .fetch_optional(pool)
                    .await
                    .map_err(ApiError::internal)?;
            user_id.ok_or_else(|| {
                ApiError::new(
                    StatusCode::NOT_FOUND,
                    "no user with that email has signed in yet",
                )
            })
        }
    }
}

/// A uuid-keyed share table (replays / replay groups). `table`/`id_col` are
/// fixed, trusted identifiers, never user input, so interpolating them is safe.
#[derive(Clone, Copy)]
pub(crate) enum UuidShareTable {
    Replay,
    ReplayGroup,
}

impl UuidShareTable {
    fn table(self) -> &'static str {
        match self {
            UuidShareTable::Replay => "replay_shares",
            UuidShareTable::ReplayGroup => "replay_group_shares",
        }
    }

    fn id_col(self) -> &'static str {
        match self {
            UuidShareTable::Replay => "replay_id",
            UuidShareTable::ReplayGroup => "group_id",
        }
    }
}

fn shares_from_rows(rows: Vec<sqlx::postgres::PgRow>) -> Result<Vec<ShareResponse>, ApiError> {
    rows.into_iter()
        .map(|row| {
            Ok(ShareResponse {
                user_id: row.try_get("user_id").map_err(ApiError::internal)?,
                email: row.try_get("email").map_err(ApiError::internal)?,
                display_name: row.try_get("display_name").map_err(ApiError::internal)?,
                added_by_user_id: row
                    .try_get("added_by_user_id")
                    .map_err(ApiError::internal)?,
                created_at: row.try_get("created_at").map_err(ApiError::internal)?,
            })
        })
        .collect()
}

pub(crate) async fn list_uuid_shares(
    pool: &PgPool,
    table: UuidShareTable,
    resource_id: Uuid,
) -> Result<Vec<ShareResponse>, ApiError> {
    let sql = format!(
        "SELECT u.id AS user_id, u.primary_email AS email, u.display_name AS display_name, \
            s.added_by_user_id AS added_by_user_id, s.created_at AS created_at \
         FROM {table} s JOIN users u ON u.id = s.user_id \
         WHERE s.{id} = $1 \
         ORDER BY u.display_name NULLS LAST, u.primary_email NULLS LAST",
        table = table.table(),
        id = table.id_col(),
    );
    let rows = sqlx::query(&sql)
        .bind(resource_id)
        .fetch_all(pool)
        .await
        .map_err(ApiError::internal)?;
    shares_from_rows(rows)
}

pub(crate) async fn add_uuid_share(
    pool: &PgPool,
    table: UuidShareTable,
    resource_id: Uuid,
    target_user_id: Uuid,
    added_by_user_id: Uuid,
) -> Result<(), ApiError> {
    let sql = format!(
        "INSERT INTO {table} ({id}, user_id, added_by_user_id) \
         VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        table = table.table(),
        id = table.id_col(),
    );
    sqlx::query(&sql)
        .bind(resource_id)
        .bind(target_user_id)
        .bind(added_by_user_id)
        .execute(pool)
        .await
        .map_err(ApiError::internal)?;
    Ok(())
}

/// Returns whether a row was removed (false → that user was not shared with).
pub(crate) async fn remove_uuid_share(
    pool: &PgPool,
    table: UuidShareTable,
    resource_id: Uuid,
    target_user_id: Uuid,
) -> Result<bool, ApiError> {
    let sql = format!(
        "DELETE FROM {table} WHERE {id} = $1 AND user_id = $2",
        table = table.table(),
        id = table.id_col(),
    );
    let result = sqlx::query(&sql)
        .bind(resource_id)
        .bind(target_user_id)
        .execute(pool)
        .await
        .map_err(ApiError::internal)?;
    Ok(result.rows_affected() > 0)
}

pub(crate) async fn list_player_stats_shares(
    pool: &PgPool,
    platform: &str,
    platform_player_id: &str,
) -> Result<Vec<ShareResponse>, ApiError> {
    let rows = sqlx::query(
        "SELECT u.id AS user_id, u.primary_email AS email, u.display_name AS display_name, \
            s.added_by_user_id AS added_by_user_id, s.created_at AS created_at \
         FROM player_identity_stats_shares s JOIN users u ON u.id = s.user_id \
         WHERE s.platform = $1 AND s.platform_player_id = $2 \
         ORDER BY u.display_name NULLS LAST, u.primary_email NULLS LAST",
    )
    .bind(platform)
    .bind(platform_player_id)
    .fetch_all(pool)
    .await
    .map_err(ApiError::internal)?;
    shares_from_rows(rows)
}

pub(crate) async fn add_player_stats_share(
    pool: &PgPool,
    platform: &str,
    platform_player_id: &str,
    target_user_id: Uuid,
    added_by_user_id: Uuid,
) -> Result<(), ApiError> {
    sqlx::query(
        "INSERT INTO player_identity_stats_shares \
            (platform, platform_player_id, user_id, added_by_user_id) \
         VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
    )
    .bind(platform)
    .bind(platform_player_id)
    .bind(target_user_id)
    .bind(added_by_user_id)
    .execute(pool)
    .await
    .map_err(ApiError::internal)?;
    Ok(())
}

pub(crate) async fn remove_player_stats_share(
    pool: &PgPool,
    platform: &str,
    platform_player_id: &str,
    target_user_id: Uuid,
) -> Result<bool, ApiError> {
    let result = sqlx::query(
        "DELETE FROM player_identity_stats_shares \
         WHERE platform = $1 AND platform_player_id = $2 AND user_id = $3",
    )
    .bind(platform)
    .bind(platform_player_id)
    .bind(target_user_id)
    .execute(pool)
    .await
    .map_err(ApiError::internal)?;
    Ok(result.rows_affected() > 0)
}

/// A user's account-level default visibility for new replays / groups.
pub(crate) async fn user_default_visibility(
    pool: &PgPool,
    user_id: Uuid,
    column: &str,
) -> Result<Visibility, ApiError> {
    // `column` is one of two fixed identifiers chosen by the caller, not input.
    let sql = format!("SELECT {column} FROM users WHERE id = $1");
    let value: Option<String> = sqlx::query_scalar(&sql)
        .bind(user_id)
        .fetch_optional(pool)
        .await
        .map_err(ApiError::internal)?;
    Ok(value
        .as_deref()
        .map(Visibility::from_db)
        .unwrap_or_default())
}

fn list_visibility_sql(
    visibility_expr: &str,
    owner_expr: &str,
    id_expr: &str,
    share_table: &str,
    share_id_col: &str,
    manager_table: Option<&str>,
    viewer_param: Option<&str>,
) -> String {
    let Some(viewer) = viewer_param else {
        return format!(" AND {visibility_expr} = 'public'");
    };
    let mut sql = format!(
        " AND ({visibility_expr} = 'public' \
            OR {owner_expr} = {viewer} \
            OR EXISTS (SELECT 1 FROM {share_table} s \
                WHERE s.{share_id_col} = {id_expr} AND s.user_id = {viewer})"
    );
    if let Some(manager_table) = manager_table {
        sql.push_str(&format!(
            " OR EXISTS (SELECT 1 FROM {manager_table} m \
                WHERE m.{share_id_col} = {id_expr} AND m.user_id = {viewer})"
        ));
    }
    sql.push(')');
    sql
}
