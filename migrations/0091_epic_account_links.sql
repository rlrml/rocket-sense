-- Per-user Epic Games account link used to publish custom training packs to
-- Psyonix's PsyNet on the user's behalf. One link per rocket-sense user.
--
-- Refresh tokens are stored as authenticated-encryption ciphertext
-- (XChaCha20-Poly1305 keyed by ROCKET_SENSE_EPIC_TOKEN_ENCRYPTION_KEY) with
-- row-specific associated data binding each blob to (user_id,
-- epic_account_id, token kind), so a ciphertext copied between rows or
-- columns fails to decrypt. Plaintext tokens never touch the database.
--
-- Two token columns because Epic's auth is two-tier: the EGS (launcher)
-- refresh token is long-lived and is the durable credential; the EOS refresh
-- token expires quickly and is kept only as a fallback so a recently-used
-- link can survive a transient EGS refresh failure.
CREATE TABLE epic_account_links (
    user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    epic_account_id text NOT NULL,
    epic_display_name text,
    egs_refresh_token_ciphertext bytea NOT NULL,
    eos_refresh_token_ciphertext bytea,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
