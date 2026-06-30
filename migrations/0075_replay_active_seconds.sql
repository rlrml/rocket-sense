ALTER TABLE replays
    ADD COLUMN active_seconds double precision;

ALTER TABLE replays
    ADD CONSTRAINT replays_active_seconds_check
    CHECK (active_seconds IS NULL OR active_seconds >= 0.0);
