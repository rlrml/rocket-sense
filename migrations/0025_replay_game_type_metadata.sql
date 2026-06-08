ALTER TABLE replays
    ADD COLUMN replay_game_type text,
    ADD COLUMN header_match_type text,
    ADD COLUMN game_playlist_id integer,
    ADD COLUMN match_type_class text,
    ADD CONSTRAINT replays_replay_game_type_check CHECK (
        replay_game_type IS NULL
        OR replay_game_type IN (
            'ranked',
            'casual',
            'private',
            'offline',
            'lan',
            'tournament',
            'unknown'
        )
    );

CREATE INDEX replays_replay_game_type_created_at_idx
    ON replays (replay_game_type, created_at DESC, id DESC)
    WHERE replay_game_type IS NOT NULL;

CREATE INDEX replays_game_playlist_id_idx
    ON replays (game_playlist_id)
    WHERE game_playlist_id IS NOT NULL;
