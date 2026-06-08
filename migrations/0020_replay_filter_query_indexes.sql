CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX replays_created_at_id_idx
    ON replays (created_at DESC, id DESC);

CREATE INDEX replays_replay_date_id_idx
    ON replays (replay_date DESC NULLS LAST, id DESC);

CREATE INDEX replays_project_created_at_idx
    ON replays (project_id, created_at DESC, id DESC)
    WHERE project_id IS NOT NULL;

CREATE INDEX replays_uploader_created_at_idx
    ON replays (uploaded_by_user_id, created_at DESC, id DESC)
    WHERE uploaded_by_user_id IS NOT NULL;

CREATE INDEX replays_parse_status_created_at_idx
    ON replays (parse_status, created_at DESC, id DESC);

CREATE INDEX replays_playlist_created_at_idx
    ON replays (playlist, created_at DESC, id DESC)
    WHERE playlist IS NOT NULL;

CREATE INDEX replays_map_code_created_at_idx
    ON replays (map_code, created_at DESC, id DESC)
    WHERE map_code IS NOT NULL;

CREATE INDEX replays_has_pro_player_created_at_idx
    ON replays (created_at DESC, id DESC)
    WHERE has_pro_player;

CREATE INDEX replays_original_file_name_trgm_idx
    ON replays USING gin (original_file_name gin_trgm_ops)
    WHERE original_file_name IS NOT NULL;

CREATE INDEX replays_external_replay_id_trgm_idx
    ON replays USING gin (external_replay_id gin_trgm_ops)
    WHERE external_replay_id IS NOT NULL;

CREATE INDEX replays_file_sha256_trgm_idx
    ON replays USING gin (file_sha256 gin_trgm_ops);

CREATE INDEX replay_players_name_trgm_idx
    ON replay_players USING gin (name gin_trgm_ops)
    WHERE name IS NOT NULL;

CREATE INDEX replay_players_platform_player_replay_idx
    ON replay_players (platform, platform_player_id, replay_id)
    WHERE platform IS NOT NULL AND platform_player_id IS NOT NULL;
