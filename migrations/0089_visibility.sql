-- Optional privacy for replays, replay groups, and player career stats.
--
-- Each resource gains a `visibility` of 'public' | 'unlisted' | 'private':
--   public   -> listed and openly readable (current behavior; the default)
--   unlisted -> readable by anyone with the direct link/id, hidden from lists
--   private  -> readable only by the owner/manager/admin or an explicitly
--               shared-with user
--
-- Privacy blocks *direct* access only: a private replay is still counted
-- (anonymously) inside group subtree aggregates and other players' career
-- aggregates, so the recursive-CTE aggregation queries are intentionally
-- untouched.
--
-- Per-user sharing is an explicit allowlist modeled on replay_group_managers
-- (migration 0058): a row grants read access to an otherwise non-public
-- resource. The owner/creator is never stored in the share table.

-- ---------------------------------------------------------------------------
-- Visibility columns. NOT NULL DEFAULT 'public' preserves existing behavior.
-- ---------------------------------------------------------------------------
ALTER TABLE replays
    ADD COLUMN visibility text NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'unlisted', 'private'));

ALTER TABLE replay_groups
    ADD COLUMN visibility text NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'unlisted', 'private'));

ALTER TABLE player_identities
    ADD COLUMN stats_visibility text NOT NULL DEFAULT 'public'
    CHECK (stats_visibility IN ('public', 'unlisted', 'private'));

-- ---------------------------------------------------------------------------
-- Per-user share allowlists. Presence of a row grants read access to an
-- otherwise non-public resource.
-- ---------------------------------------------------------------------------
CREATE TABLE replay_shares (
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    added_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (replay_id, user_id)
);

CREATE INDEX replay_shares_user_id_idx ON replay_shares (user_id);

CREATE TABLE replay_group_shares (
    group_id uuid NOT NULL REFERENCES replay_groups(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    added_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (group_id, user_id)
);

CREATE INDEX replay_group_shares_user_id_idx ON replay_group_shares (user_id);

CREATE TABLE player_identity_stats_shares (
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    added_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (platform, platform_player_id, user_id),
    FOREIGN KEY (platform, platform_player_id)
        REFERENCES player_identities (platform, platform_player_id)
        ON DELETE CASCADE
);

CREATE INDEX player_identity_stats_shares_user_id_idx
    ON player_identity_stats_shares (user_id);

-- ---------------------------------------------------------------------------
-- Account-level default visibility applied to a user's new uploads/groups.
-- ---------------------------------------------------------------------------
ALTER TABLE users
    ADD COLUMN default_replay_visibility text NOT NULL DEFAULT 'public'
    CHECK (default_replay_visibility IN ('public', 'unlisted', 'private')),
    ADD COLUMN default_group_visibility text NOT NULL DEFAULT 'public'
    CHECK (default_group_visibility IN ('public', 'unlisted', 'private'));
