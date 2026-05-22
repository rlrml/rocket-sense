ALTER TABLE replays
    ADD COLUMN playlist text,
    ADD COLUMN map_code text,
    ADD COLUMN replay_date timestamptz,
    ADD COLUMN has_pro_player boolean NOT NULL DEFAULT false;

CREATE INDEX replays_playlist_idx
    ON replays (playlist)
    WHERE playlist IS NOT NULL;

CREATE INDEX replays_map_code_idx
    ON replays (map_code)
    WHERE map_code IS NOT NULL;

CREATE INDEX replays_replay_date_idx
    ON replays (replay_date)
    WHERE replay_date IS NOT NULL;

CREATE INDEX replays_has_pro_player_idx
    ON replays (has_pro_player)
    WHERE has_pro_player;

CREATE TABLE replay_players (
    id uuid PRIMARY KEY,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    name text,
    platform text,
    platform_player_id text,
    team integer,
    is_pro boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (
        (platform IS NULL AND platform_player_id IS NULL)
        OR (platform IS NOT NULL AND platform_player_id IS NOT NULL)
    )
);

CREATE INDEX replay_players_replay_id_idx
    ON replay_players (replay_id);

CREATE INDEX replay_players_lower_name_idx
    ON replay_players (lower(name))
    WHERE name IS NOT NULL;

CREATE INDEX replay_players_platform_player_id_idx
    ON replay_players (platform, platform_player_id)
    WHERE platform IS NOT NULL AND platform_player_id IS NOT NULL;

CREATE INDEX replay_players_is_pro_idx
    ON replay_players (is_pro)
    WHERE is_pro;
