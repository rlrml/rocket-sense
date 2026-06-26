-- Per-user pinned/favorited profiles. A single polymorphic table covers both
-- favorite targets the UI exposes today: in-game player identities (the
-- `/players/{platform}/id/{platform_player_id}` pages) and uploader accounts
-- (the `/users/{user_id}` pages). The shape CHECK keeps each row pointed at
-- exactly one target type so the partial unique indexes below can dedupe per
-- (user, target) without colliding across types.
CREATE TABLE user_favorites (
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type text NOT NULL CHECK (target_type IN ('player', 'uploader')),
    -- Populated when target_type = 'player'.
    platform text,
    platform_player_id text,
    -- Populated when target_type = 'uploader'.
    target_user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT user_favorites_target_shape CHECK (
        (
            target_type = 'player'
            AND platform IS NOT NULL
            AND platform_player_id IS NOT NULL
            AND target_user_id IS NULL
        )
        OR (
            target_type = 'uploader'
            AND target_user_id IS NOT NULL
            AND platform IS NULL
            AND platform_player_id IS NULL
        )
    )
);

-- One favorite per (user, player identity) and per (user, uploader). Partial
-- unique indexes rather than a composite PK because the keying columns differ
-- by target type and NULLs would otherwise defeat a single unique constraint.
CREATE UNIQUE INDEX user_favorites_player_uq
    ON user_favorites (user_id, platform, platform_player_id)
    WHERE target_type = 'player';

CREATE UNIQUE INDEX user_favorites_uploader_uq
    ON user_favorites (user_id, target_user_id)
    WHERE target_type = 'uploader';

-- Primary access path: list a single user's favorites, newest first.
CREATE INDEX user_favorites_user_id_created_at_idx
    ON user_favorites (user_id, created_at DESC);
