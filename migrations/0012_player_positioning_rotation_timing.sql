ALTER TABLE replay_players
    ADD COLUMN time_most_back_seconds double precision,
    ADD COLUMN time_most_forward_seconds double precision;

ALTER TABLE replay_players
    ADD CONSTRAINT replay_players_time_most_back_seconds_check
    CHECK (time_most_back_seconds IS NULL OR time_most_back_seconds >= 0.0),
    ADD CONSTRAINT replay_players_time_most_forward_seconds_check
    CHECK (time_most_forward_seconds IS NULL OR time_most_forward_seconds >= 0.0);
