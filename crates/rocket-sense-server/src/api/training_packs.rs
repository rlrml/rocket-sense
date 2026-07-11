//! Epic account linking + PsyNet training-pack publishing.
//!
//! The browser stats player builds a custom training pack (rounds of
//! serialized UE archetype strings) and publishes it to Psyonix's PsyNet to
//! get back a public share code. Publishing requires authenticating against
//! PsyNet as a real Epic account, so a rocket-sense user first *links* an
//! Epic account:
//!
//! 1. `POST /me/epic-link/start` returns Epic's login URL. The user signs in
//!    there and copies the authorization code Epic displays.
//! 2. `POST /me/epic-link/complete` exchanges that code for Epic tokens
//!    (EGS token -> exchange code -> EOS token, mirroring
//!    `rlru::auth::AuthManager`) and stores the refresh tokens encrypted.
//! 3. `POST /training-packs/publish` refreshes an EOS session from the stored
//!    tokens, authenticates a PsyNet websocket session, and calls
//!    `Training/AddTrainingData` to obtain the share code.
//!
//! Refresh tokens are sealed with XChaCha20-Poly1305 under the
//! `ROCKET_SENSE_EPIC_TOKEN_ENCRYPTION_KEY` server secret, with row-specific
//! associated data binding each ciphertext to (user, Epic account, token
//! kind). The long-lived EGS refresh token is the durable credential; the
//! short-lived EOS refresh token is kept as a fallback only.

use crate::{app::AppState, auth::AuthUser};
use axum::{
    extract::State,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use chacha20poly1305::{
    aead::{Aead, AeadCore, KeyInit, OsRng, Payload},
    XChaCha20Poly1305, XNonce,
};
use chrono::{DateTime, Utc};
use psynet::{PsyNetClient, SaveTrainingData, SaveTrainingRound};
use rlru::auth::{EosTokenResponse, EpicClient};
use secrecy::ExposeSecret;
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, Row};
use utoipa::ToSchema;
use uuid::Uuid;

use super::replays::{require_db, ApiError};

pub fn router() -> Router<AppState> {
    Router::new()
        .route(
            "/me/epic-link",
            get(get_epic_link).delete(unlink_epic_account),
        )
        .route("/me/epic-link/start", post(start_epic_link))
        .route("/me/epic-link/complete", post(complete_epic_link))
        .route("/training-packs/publish", post(publish_training_pack))
}

// ---------------------------------------------------------------------------
// Encrypted token storage
// ---------------------------------------------------------------------------

/// Format version byte prefixed to every stored ciphertext so the sealing
/// scheme can be rotated without guessing at blob layouts.
const TOKEN_CIPHERTEXT_VERSION: u8 = 1;
const XNONCE_LEN: usize = 24;

/// Which refresh token a ciphertext holds; part of the associated data so an
/// EGS blob can never be replayed into the EOS column or vice versa.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum TokenKind {
    EgsRefresh,
    EosRefresh,
}

impl TokenKind {
    fn as_str(self) -> &'static str {
        match self {
            Self::EgsRefresh => "egs-refresh",
            Self::EosRefresh => "eos-refresh",
        }
    }
}

/// Row-specific associated data: binds a ciphertext to the exact (user, Epic
/// account, token kind) cell it was written for, so a blob copied between
/// rows or columns fails authentication instead of decrypting.
fn token_aad(user_id: Uuid, epic_account_id: &str, kind: TokenKind) -> String {
    format!(
        "rocket-sense/epic-link/v{TOKEN_CIPHERTEXT_VERSION}/{user_id}/{epic_account_id}/{}",
        kind.as_str()
    )
}

/// Authenticated encryption for stored Epic refresh tokens. Blob layout:
/// `version(1) || nonce(24) || ciphertext+tag`.
struct TokenCipher {
    cipher: XChaCha20Poly1305,
}

impl TokenCipher {
    fn new(key: &[u8; 32]) -> Self {
        Self {
            cipher: XChaCha20Poly1305::new(key.into()),
        }
    }

    fn encrypt(&self, plaintext: &str, aad: &str) -> Result<Vec<u8>, String> {
        let nonce = XChaCha20Poly1305::generate_nonce(&mut OsRng);
        let ciphertext = self
            .cipher
            .encrypt(
                &nonce,
                Payload {
                    msg: plaintext.as_bytes(),
                    aad: aad.as_bytes(),
                },
            )
            .map_err(|error| format!("token encryption failed: {error}"))?;

        let mut blob = Vec::with_capacity(1 + XNONCE_LEN + ciphertext.len());
        blob.push(TOKEN_CIPHERTEXT_VERSION);
        blob.extend_from_slice(&nonce);
        blob.extend_from_slice(&ciphertext);
        Ok(blob)
    }

    fn decrypt(&self, blob: &[u8], aad: &str) -> Result<String, String> {
        let (&version, rest) = blob
            .split_first()
            .ok_or_else(|| "token ciphertext is empty".to_owned())?;
        if version != TOKEN_CIPHERTEXT_VERSION {
            return Err(format!("unsupported token ciphertext version {version}"));
        }
        if rest.len() <= XNONCE_LEN {
            return Err("token ciphertext is truncated".to_owned());
        }
        let (nonce, ciphertext) = rest.split_at(XNONCE_LEN);
        let plaintext = self
            .cipher
            .decrypt(
                XNonce::from_slice(nonce),
                Payload {
                    msg: ciphertext,
                    aad: aad.as_bytes(),
                },
            )
            .map_err(|error| format!("token decryption failed: {error}"))?;
        String::from_utf8(plaintext).map_err(|_| "decrypted token is not utf-8".to_owned())
    }
}

fn require_token_cipher(state: &AppState) -> Result<TokenCipher, ApiError> {
    let key = state.epic_token_encryption_key.as_deref().ok_or_else(|| {
        ApiError::new(
            StatusCode::SERVICE_UNAVAILABLE,
            "Epic account linking is not configured on this server \
             (ROCKET_SENSE_EPIC_TOKEN_ENCRYPTION_KEY is unset)",
        )
    })?;
    Ok(TokenCipher::new(key))
}

// ---------------------------------------------------------------------------
// Publish request DTO -> psynet::SaveTrainingData
// ---------------------------------------------------------------------------

/// `ETrainingType` ordinals accepted from the browser: None=0, Aerial=1,
/// Goalie=2, Striker=3. (4 is the UE enum-end sentinel, never a real pack
/// type.)
const MAX_TRAINING_TYPE: i32 = 3;
/// `EDifficulty` ordinal upper bound; kept permissive since PsyNet enforces
/// the authoritative range.
const MAX_DIFFICULTY: i32 = 4;

/// A training pack to publish, as sent by the browser stats player.
#[derive(Debug, Clone, Deserialize, ToSchema)]
pub struct PublishTrainingPackRequest {
    /// Pack name shown in-game.
    pub name: String,
    /// Optional free-text description.
    #[serde(default)]
    pub description: Option<String>,
    /// `ETrainingType` ordinal: None=0, Aerial=1, Goalie=2, Striker=3.
    pub training_type: i32,
    /// `EDifficulty` ordinal.
    pub difficulty: i32,
    /// In-game map the pack was authored on (e.g. `EuroStadium_P`).
    pub map_name: String,
    /// Free-form tag strings.
    #[serde(default)]
    pub tags: Vec<String>,
    /// The pack's rounds (shots), in order.
    pub rounds: Vec<PublishTrainingRoundRequest>,
}

/// One round (shot) of a training pack.
#[derive(Debug, Clone, Deserialize, ToSchema)]
pub struct PublishTrainingRoundRequest {
    /// Round time limit in seconds.
    pub time_limit: f32,
    /// Raw UE serialized archetype strings (ball spawn, dynamic spawn point,
    /// player car), preserved verbatim.
    pub serialized_archetypes: Vec<String>,
}

/// Validate a publish request and lower it to the PsyNet wire struct: mints a
/// fresh pack GUID, derives `NumRounds`, and normalizes name/description/tags.
fn build_save_training_data(
    request: &PublishTrainingPackRequest,
) -> Result<SaveTrainingData, String> {
    let name = request.name.trim();
    if name.is_empty() {
        return Err("training pack name must not be empty".to_owned());
    }
    let map_name = request.map_name.trim();
    if map_name.is_empty() {
        return Err("training pack map_name must not be empty".to_owned());
    }
    if !(0..=MAX_TRAINING_TYPE).contains(&request.training_type) {
        return Err(format!(
            "training_type must be between 0 and {MAX_TRAINING_TYPE} (None/Aerial/Goalie/Striker), got {}",
            request.training_type
        ));
    }
    if !(0..=MAX_DIFFICULTY).contains(&request.difficulty) {
        return Err(format!(
            "difficulty must be between 0 and {MAX_DIFFICULTY}, got {}",
            request.difficulty
        ));
    }
    if request.rounds.is_empty() {
        return Err("training pack must contain at least one round".to_owned());
    }

    let mut rounds = Vec::with_capacity(request.rounds.len());
    for (index, round) in request.rounds.iter().enumerate() {
        if !round.time_limit.is_finite() || round.time_limit < 0.0 {
            return Err(format!(
                "round {index} time_limit must be a non-negative number"
            ));
        }
        if round.serialized_archetypes.is_empty()
            || round
                .serialized_archetypes
                .iter()
                .any(|archetype| archetype.trim().is_empty())
        {
            return Err(format!(
                "round {index} must contain non-empty serialized archetypes"
            ));
        }
        rounds.push(SaveTrainingRound {
            time_limit: round.time_limit,
            serialized_archetypes: round.serialized_archetypes.clone(),
        });
    }

    let tags: Vec<String> = request
        .tags
        .iter()
        .map(|tag| tag.trim().to_owned())
        .filter(|tag| !tag.is_empty())
        .collect();
    let description = request
        .description
        .as_deref()
        .map(str::trim)
        .filter(|description| !description.is_empty())
        .map(str::to_owned);

    Ok(SaveTrainingData {
        tm_guid: SaveTrainingData::new_guid(),
        tm_name: name.to_owned(),
        training_type: request.training_type,
        difficulty: request.difficulty,
        map_name: map_name.to_owned(),
        tags,
        num_rounds: rounds.len() as i32,
        rounds,
        description,
    })
}

// ---------------------------------------------------------------------------
// Epic account link storage
// ---------------------------------------------------------------------------

struct EpicLinkRow {
    epic_account_id: String,
    epic_display_name: Option<String>,
    egs_refresh_token_ciphertext: Vec<u8>,
    eos_refresh_token_ciphertext: Option<Vec<u8>>,
    created_at: DateTime<Utc>,
}

async fn load_epic_link(db: &PgPool, user_id: Uuid) -> Result<Option<EpicLinkRow>, ApiError> {
    let row = sqlx::query(
        "SELECT epic_account_id, epic_display_name, egs_refresh_token_ciphertext, \
                eos_refresh_token_ciphertext, created_at \
         FROM epic_account_links WHERE user_id = $1",
    )
    .bind(user_id)
    .fetch_optional(db)
    .await
    .map_err(ApiError::internal)?;

    row.map(|row| {
        Ok(EpicLinkRow {
            epic_account_id: row.try_get("epic_account_id").map_err(ApiError::internal)?,
            epic_display_name: row
                .try_get("epic_display_name")
                .map_err(ApiError::internal)?,
            egs_refresh_token_ciphertext: row
                .try_get("egs_refresh_token_ciphertext")
                .map_err(ApiError::internal)?,
            eos_refresh_token_ciphertext: row
                .try_get("eos_refresh_token_ciphertext")
                .map_err(ApiError::internal)?,
            created_at: row.try_get("created_at").map_err(ApiError::internal)?,
        })
    })
    .transpose()
}

/// Persist rotated refresh tokens after a successful Epic token refresh.
/// Best-effort callers may ignore failures: the previous tokens usually stay
/// valid, so losing one rotation only risks an extra re-link later.
async fn store_rotated_tokens(
    db: &PgPool,
    user_id: Uuid,
    egs_ciphertext: Option<&[u8]>,
    eos_ciphertext: &[u8],
) -> Result<(), sqlx::Error> {
    sqlx::query(
        "UPDATE epic_account_links \
         SET egs_refresh_token_ciphertext = COALESCE($2, egs_refresh_token_ciphertext), \
             eos_refresh_token_ciphertext = $3, \
             updated_at = now() \
         WHERE user_id = $1",
    )
    .bind(user_id)
    .bind(egs_ciphertext)
    .bind(eos_ciphertext)
    .execute(db)
    .await?;
    Ok(())
}

/// Rebuild a live EOS session from the stored refresh tokens, mirroring
/// `rlru::auth::AuthManager::restore_or_refresh`: prefer the long-lived EGS
/// refresh token (refresh -> exchange code -> EOS token), fall back to the
/// short-lived EOS refresh token, and persist whichever tokens were rotated.
async fn refresh_eos_session(
    client: &EpicClient,
    cipher: &TokenCipher,
    db: &PgPool,
    user_id: Uuid,
    link: &EpicLinkRow,
) -> Result<EosTokenResponse, ApiError> {
    let egs_aad = token_aad(user_id, &link.epic_account_id, TokenKind::EgsRefresh);
    let eos_aad = token_aad(user_id, &link.epic_account_id, TokenKind::EosRefresh);

    let egs_refresh = cipher
        .decrypt(&link.egs_refresh_token_ciphertext, &egs_aad)
        .map_err(ApiError::internal)?;

    match refresh_via_egs(client, &egs_refresh).await {
        Ok((egs_refresh_token, eos)) => {
            let egs_ciphertext = cipher
                .encrypt(&egs_refresh_token, &egs_aad)
                .map_err(ApiError::internal)?;
            let eos_ciphertext = cipher
                .encrypt(eos.refresh_token.expose_secret(), &eos_aad)
                .map_err(ApiError::internal)?;
            if let Err(error) =
                store_rotated_tokens(db, user_id, Some(&egs_ciphertext), &eos_ciphertext).await
            {
                tracing::warn!(error = %error, "failed to persist rotated Epic tokens");
            }
            return Ok(eos);
        }
        Err(error) => {
            tracing::warn!(error = %error, "EGS refresh failed; falling back to EOS refresh token");
        }
    }

    let Some(eos_ciphertext) = link.eos_refresh_token_ciphertext.as_deref() else {
        return Err(epic_session_expired());
    };
    let eos_refresh = cipher
        .decrypt(eos_ciphertext, &eos_aad)
        .map_err(ApiError::internal)?;
    let eos = match client.refresh_eos_token(&eos_refresh).await {
        Ok(eos) => eos,
        Err(error) => {
            tracing::warn!(error = %error, "EOS refresh failed; Epic link must be recreated");
            return Err(epic_session_expired());
        }
    };
    let eos_ciphertext = cipher
        .encrypt(eos.refresh_token.expose_secret(), &eos_aad)
        .map_err(ApiError::internal)?;
    if let Err(error) = store_rotated_tokens(db, user_id, None, &eos_ciphertext).await {
        tracing::warn!(error = %error, "failed to persist rotated Epic tokens");
    }
    Ok(eos)
}

/// EGS-refresh-token path to a fresh EOS session. Returns the rotated EGS
/// refresh token alongside the EOS token so both can be re-sealed.
async fn refresh_via_egs(
    client: &EpicClient,
    egs_refresh_token: &str,
) -> anyhow::Result<(String, EosTokenResponse)> {
    let egs = client
        .authenticate_with_refresh_token(egs_refresh_token)
        .await?;
    let exchange_code = client
        .exchange_code(egs.access_token.expose_secret())
        .await?;
    let eos = client.exchange_eos_token(&exchange_code).await?;
    Ok((egs.refresh_token.expose_secret().to_owned(), eos))
}

fn epic_session_expired() -> ApiError {
    ApiError::new(
        StatusCode::CONFLICT,
        "the linked Epic session has expired; re-link your Epic account",
    )
}

fn epic_link_missing() -> ApiError {
    ApiError::new(
        StatusCode::CONFLICT,
        "no Epic account is linked; link one before publishing training packs",
    )
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

/// Whether the current user has a linked Epic account.
#[derive(Debug, Serialize, ToSchema)]
pub struct EpicLinkStatusResponse {
    pub linked: bool,
    pub epic_account_id: Option<String>,
    pub epic_display_name: Option<String>,
    pub linked_at: Option<DateTime<Utc>>,
}

#[utoipa::path(
    get,
    path = "/api/v1/me/epic-link",
    tag = "training-packs",
    responses(
        (status = 200, description = "The current user's Epic account link status", body = EpicLinkStatusResponse),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_epic_link(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<EpicLinkStatusResponse>, ApiError> {
    let db = require_db(&state)?;
    let link = load_epic_link(db, auth_user.id).await?;

    Ok(Json(match link {
        Some(link) => EpicLinkStatusResponse {
            linked: true,
            epic_account_id: Some(link.epic_account_id),
            epic_display_name: link.epic_display_name,
            linked_at: Some(link.created_at),
        },
        None => EpicLinkStatusResponse {
            linked: false,
            epic_account_id: None,
            epic_display_name: None,
            linked_at: None,
        },
    }))
}

/// Where the user should sign in to obtain an Epic authorization code.
#[derive(Debug, Serialize, ToSchema)]
pub struct EpicLinkStartResponse {
    /// Epic login URL; after signing in, Epic displays a JSON document whose
    /// `authorizationCode` field is what `complete` expects.
    pub login_url: String,
}

#[utoipa::path(
    post,
    path = "/api/v1/me/epic-link/start",
    tag = "training-packs",
    responses(
        (status = 200, description = "Epic login URL to obtain an authorization code", body = EpicLinkStartResponse),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Epic linking is not configured on this server")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn start_epic_link(
    _auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<Json<EpicLinkStartResponse>, ApiError> {
    // Fail before sending the user through Epic's login if the server cannot
    // store the resulting tokens anyway.
    require_token_cipher(&state)?;

    Ok(Json(EpicLinkStartResponse {
        login_url: EpicClient::new().login_url(),
    }))
}

/// The Epic authorization code produced by the login URL from `start`.
#[derive(Debug, Deserialize, ToSchema)]
pub struct CompleteEpicLinkRequest {
    pub code: String,
}

/// The Epic account that was linked.
#[derive(Debug, Serialize, ToSchema)]
pub struct EpicLinkResponse {
    pub epic_account_id: String,
    pub epic_display_name: Option<String>,
}

#[utoipa::path(
    post,
    path = "/api/v1/me/epic-link/complete",
    tag = "training-packs",
    request_body = CompleteEpicLinkRequest,
    responses(
        (status = 200, description = "Epic account linked", body = EpicLinkResponse),
        (status = 400, description = "The authorization code was rejected by Epic"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres or Epic linking is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn complete_epic_link(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<CompleteEpicLinkRequest>,
) -> Result<Json<EpicLinkResponse>, ApiError> {
    let db = require_db(&state)?;
    let cipher = require_token_cipher(&state)?;
    let code = request.code.trim();
    if code.is_empty() {
        return Err(ApiError::bad_request(
            "authorization code must not be empty",
        ));
    }

    // EGS authorization code -> EGS tokens -> exchange code -> EOS tokens,
    // mirroring rlru::auth::AuthManager::authenticate_with_code.
    let client = EpicClient::new();
    let (egs, eos) = async {
        let egs = client.authenticate_with_code(code).await?;
        let exchange_code = client
            .exchange_code(egs.access_token.expose_secret())
            .await?;
        let eos = client.exchange_eos_token(&exchange_code).await?;
        anyhow::Ok((egs, eos))
    }
    .await
    .map_err(|error| {
        tracing::warn!(error = %error, "Epic authorization code exchange failed");
        ApiError::bad_request(
            "failed to authenticate with Epic; the authorization code may be invalid or expired",
        )
    })?;

    let epic_account_id = eos.account_id.clone();
    let epic_display_name =
        Some(egs.display_name.trim().to_owned()).filter(|display_name| !display_name.is_empty());

    let egs_ciphertext = cipher
        .encrypt(
            egs.refresh_token.expose_secret(),
            &token_aad(auth_user.id, &epic_account_id, TokenKind::EgsRefresh),
        )
        .map_err(ApiError::internal)?;
    let eos_ciphertext = cipher
        .encrypt(
            eos.refresh_token.expose_secret(),
            &token_aad(auth_user.id, &epic_account_id, TokenKind::EosRefresh),
        )
        .map_err(ApiError::internal)?;

    sqlx::query(
        "INSERT INTO epic_account_links \
             (user_id, epic_account_id, epic_display_name, \
              egs_refresh_token_ciphertext, eos_refresh_token_ciphertext) \
         VALUES ($1, $2, $3, $4, $5) \
         ON CONFLICT (user_id) DO UPDATE \
         SET epic_account_id = EXCLUDED.epic_account_id, \
             epic_display_name = EXCLUDED.epic_display_name, \
             egs_refresh_token_ciphertext = EXCLUDED.egs_refresh_token_ciphertext, \
             eos_refresh_token_ciphertext = EXCLUDED.eos_refresh_token_ciphertext, \
             updated_at = now()",
    )
    .bind(auth_user.id)
    .bind(&epic_account_id)
    .bind(&epic_display_name)
    .bind(&egs_ciphertext)
    .bind(&eos_ciphertext)
    .execute(db)
    .await
    .map_err(ApiError::internal)?;

    Ok(Json(EpicLinkResponse {
        epic_account_id,
        epic_display_name,
    }))
}

#[utoipa::path(
    delete,
    path = "/api/v1/me/epic-link",
    tag = "training-packs",
    responses(
        (status = 204, description = "Epic account unlinked (idempotent)"),
        (status = 401, description = "Authentication required"),
        (status = 503, description = "Postgres connection is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn unlink_epic_account(
    auth_user: AuthUser,
    State(state): State<AppState>,
) -> Result<StatusCode, ApiError> {
    let db = require_db(&state)?;
    sqlx::query("DELETE FROM epic_account_links WHERE user_id = $1")
        .bind(auth_user.id)
        .execute(db)
        .await
        .map_err(ApiError::internal)?;

    Ok(StatusCode::NO_CONTENT)
}

/// The published pack's public share code.
#[derive(Debug, Serialize, ToSchema)]
pub struct PublishTrainingPackResponse {
    /// Share code, e.g. `9F94-DF9F-0460-7481`.
    pub code: String,
    /// The pack GUID minted for this publish.
    pub tm_guid: String,
}

#[utoipa::path(
    post,
    path = "/api/v1/training-packs/publish",
    tag = "training-packs",
    request_body = PublishTrainingPackRequest,
    responses(
        (status = 200, description = "Training pack published to PsyNet", body = PublishTrainingPackResponse),
        (status = 400, description = "The training pack payload is invalid"),
        (status = 401, description = "Authentication required"),
        (status = 409, description = "No linked Epic account, or the linked session expired"),
        (status = 502, description = "PsyNet rejected the publish"),
        (status = 503, description = "Postgres or Epic linking is not configured")
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn publish_training_pack(
    auth_user: AuthUser,
    State(state): State<AppState>,
    Json(request): Json<PublishTrainingPackRequest>,
) -> Result<Json<PublishTrainingPackResponse>, ApiError> {
    let db = require_db(&state)?;
    let cipher = require_token_cipher(&state)?;

    let pack = build_save_training_data(&request).map_err(ApiError::bad_request)?;
    let tm_guid = pack.tm_guid.clone();

    let link = load_epic_link(db, auth_user.id)
        .await?
        .ok_or_else(epic_link_missing)?;

    let client = EpicClient::new();
    let eos = refresh_eos_session(&client, &cipher, db, auth_user.id, &link).await?;

    let rpc = PsyNetClient::new()
        .auth_player(&eos.account_id, eos.access_token.expose_secret())
        .await
        .map_err(|error| {
            tracing::warn!(error = %error, "PsyNet player authentication failed");
            ApiError::new(
                StatusCode::BAD_GATEWAY,
                "failed to authenticate the linked Epic account with PsyNet",
            )
        })?;

    let publish_result = rpc.save_training_data(pack).await;
    if let Err(error) = rpc.close().await {
        tracing::debug!(error = %error, "failed to close PsyNet socket after publish");
    }

    let response = publish_result.map_err(|error| {
        tracing::warn!(error = %error, "PsyNet training pack publish failed");
        ApiError::new(
            StatusCode::BAD_GATEWAY,
            format!("PsyNet rejected the training pack: {error}"),
        )
    })?;

    Ok(Json(PublishTrainingPackResponse {
        code: response.code,
        tm_guid,
    }))
}

#[cfg(test)]
#[path = "training_packs_tests.rs"]
mod tests;
