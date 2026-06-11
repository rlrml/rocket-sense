-- Kickoff settlement: who the kickoff actually ended up being good for once
-- play settled (possession run, established pressure, or kickoff goal),
-- independent of who won the immediate exchange. Mirrors the settlement
-- fields on subtr-actor's KickoffEvent.
ALTER TABLE play_event_kickoff_details
    ADD COLUMN settlement text,
    ADD COLUMN settlement_team integer,
    ADD COLUMN settlement_subject_id text,
    ADD COLUMN settlement_time double precision,
    ADD COLUMN settlement_frame integer,
    ADD COLUMN settlement_seconds_after_first_touch double precision,
    ADD CONSTRAINT play_event_kickoff_details_settlement_check
        CHECK (settlement IS NULL OR settlement <> ''),
    ADD CONSTRAINT play_event_kickoff_details_settlement_team_check
        CHECK (settlement_team IS NULL OR settlement_team IN (0, 1));

CREATE INDEX play_event_kickoff_details_settlement_idx
    ON play_event_kickoff_details (settlement, settlement_team);
