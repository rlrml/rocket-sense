-- Kickoff advantage: who the kickoff actually ended up being good for once
-- play settled (possession run, established pressure, or kickoff goal),
-- independent of who won the immediate exchange. Mirrors the advantage
-- fields on subtr-actor's KickoffEvent.
ALTER TABLE play_event_kickoff_details
    ADD COLUMN advantage text,
    ADD COLUMN advantage_team integer,
    ADD COLUMN advantage_subject_id text,
    ADD COLUMN advantage_time double precision,
    ADD COLUMN advantage_frame integer,
    ADD COLUMN advantage_seconds_after_first_touch double precision,
    ADD CONSTRAINT play_event_kickoff_details_advantage_check
        CHECK (advantage IS NULL OR advantage <> ''),
    ADD CONSTRAINT play_event_kickoff_details_advantage_team_check
        CHECK (advantage_team IS NULL OR advantage_team IN (0, 1));

CREATE INDEX play_event_kickoff_details_advantage_idx
    ON play_event_kickoff_details (advantage, advantage_team);
