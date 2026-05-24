ALTER TABLE replays
    ADD COLUMN season text;

CREATE INDEX replays_season_idx
    ON replays (season)
    WHERE season IS NOT NULL;
