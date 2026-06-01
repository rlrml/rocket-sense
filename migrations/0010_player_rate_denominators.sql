ALTER TABLE replays
    ADD COLUMN duration_seconds double precision,
    ADD COLUMN overtime_seconds double precision,
    ADD COLUMN team_zero_score integer,
    ADD COLUMN team_one_score integer,
    ADD COLUMN match_guid text;

ALTER TABLE replays
    ADD CONSTRAINT replays_duration_seconds_check
    CHECK (duration_seconds IS NULL OR duration_seconds >= 0.0),
    ADD CONSTRAINT replays_overtime_seconds_check
    CHECK (overtime_seconds IS NULL OR overtime_seconds >= 0.0);

CREATE INDEX replays_match_guid_idx
    ON replays (match_guid)
    WHERE match_guid IS NOT NULL;

ALTER TABLE replay_players
    ADD COLUMN active_time_seconds double precision,
    ADD COLUMN time_demolished_seconds double precision;

ALTER TABLE replay_players
    ADD CONSTRAINT replay_players_active_time_seconds_check
    CHECK (active_time_seconds IS NULL OR active_time_seconds >= 0.0),
    ADD CONSTRAINT replay_players_time_demolished_seconds_check
    CHECK (time_demolished_seconds IS NULL OR time_demolished_seconds >= 0.0),
    ADD CONSTRAINT replay_players_time_demolished_not_above_active_check
    CHECK (
        active_time_seconds IS NULL
        OR time_demolished_seconds IS NULL
        OR time_demolished_seconds <= active_time_seconds
    );
