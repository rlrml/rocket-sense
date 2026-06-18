CREATE TABLE player_identities (
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    current_display_name text,
    first_seen_at timestamptz,
    last_seen_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (platform, platform_player_id),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (current_display_name IS NULL OR btrim(current_display_name) <> ''),
    CHECK (
        first_seen_at IS NULL
        OR last_seen_at IS NULL
        OR last_seen_at >= first_seen_at
    )
);

CREATE INDEX player_identities_current_display_name_lower_idx
    ON player_identities (lower(current_display_name))
    WHERE current_display_name IS NOT NULL;

CREATE INDEX player_identities_last_seen_at_idx
    ON player_identities (last_seen_at DESC)
    WHERE last_seen_at IS NOT NULL;

CREATE TABLE player_display_names (
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    display_name text NOT NULL,
    first_seen_at timestamptz NOT NULL,
    last_seen_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (platform, platform_player_id, display_name),
    FOREIGN KEY (platform, platform_player_id)
        REFERENCES player_identities (platform, platform_player_id)
        ON DELETE CASCADE,
    CHECK (display_name <> ''),
    CHECK (btrim(display_name) <> ''),
    CHECK (last_seen_at >= first_seen_at)
);

CREATE INDEX player_display_names_lookup_idx
    ON player_display_names (platform, platform_player_id, last_seen_at DESC);

CREATE INDEX player_display_names_display_name_lower_idx
    ON player_display_names (lower(display_name));

WITH appearances AS (
    SELECT
        lower(rp.platform) AS platform,
        rp.platform_player_id,
        NULLIF(btrim(rp.name), '') AS display_name,
        COALESCE(r.replay_date, r.created_at, rp.created_at, now()) AS seen_at
    FROM replay_players rp
    JOIN replays r ON r.id = rp.replay_id
    WHERE rp.platform IS NOT NULL
      AND rp.platform_player_id IS NOT NULL
      AND btrim(rp.platform) <> ''
      AND btrim(rp.platform_player_id) <> ''
),
identity_windows AS (
    SELECT
        platform,
        platform_player_id,
        MIN(seen_at) AS first_seen_at,
        MAX(seen_at) AS last_seen_at
    FROM appearances
    GROUP BY platform, platform_player_id
),
latest_names AS (
    SELECT DISTINCT ON (platform, platform_player_id)
        platform,
        platform_player_id,
        display_name AS current_display_name
    FROM appearances
    WHERE display_name IS NOT NULL
    ORDER BY platform, platform_player_id, seen_at DESC, display_name
)
INSERT INTO player_identities (
    platform,
    platform_player_id,
    current_display_name,
    first_seen_at,
    last_seen_at
)
SELECT
    identity_windows.platform,
    identity_windows.platform_player_id,
    latest_names.current_display_name,
    identity_windows.first_seen_at,
    identity_windows.last_seen_at
FROM identity_windows
LEFT JOIN latest_names
  ON latest_names.platform = identity_windows.platform
 AND latest_names.platform_player_id = identity_windows.platform_player_id;

WITH appearances AS (
    SELECT
        lower(rp.platform) AS platform,
        rp.platform_player_id,
        NULLIF(btrim(rp.name), '') AS display_name,
        COALESCE(r.replay_date, r.created_at, rp.created_at, now()) AS seen_at
    FROM replay_players rp
    JOIN replays r ON r.id = rp.replay_id
    WHERE rp.platform IS NOT NULL
      AND rp.platform_player_id IS NOT NULL
      AND btrim(rp.platform) <> ''
      AND btrim(rp.platform_player_id) <> ''
      AND NULLIF(btrim(rp.name), '') IS NOT NULL
)
INSERT INTO player_display_names (
    platform,
    platform_player_id,
    display_name,
    first_seen_at,
    last_seen_at
)
SELECT
    platform,
    platform_player_id,
    display_name,
    MIN(seen_at),
    MAX(seen_at)
FROM appearances
GROUP BY platform, platform_player_id, display_name;
