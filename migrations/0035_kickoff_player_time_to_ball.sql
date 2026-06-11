-- Persist the taker's time-to-ball from the subtr-actor kickoff payload.
--
-- subtr-actor already computes this as a duration (seconds from movement
-- start to the player's first touch, countdown excluded), but indexing only
-- persisted the absolute first_touch_time timestamp, forcing consumers to
-- re-derive durations against play_events.start_time — a slightly different
-- (countdown-inclusive) epoch.
ALTER TABLE play_event_kickoff_player_details
    ADD COLUMN time_to_ball double precision,
    ADD CONSTRAINT play_event_kickoff_player_details_time_to_ball_check
        CHECK (time_to_ball IS NULL OR time_to_ball >= 0);

-- Backfill taker rows from the stored event payloads. Support rows have no
-- time_to_ball in the payload; rows whose payload predates the field (or was
-- pruned) stay NULL until their replay is reprocessed.
UPDATE play_event_kickoff_player_details detail
SET time_to_ball = (
    (
        payload.payload -> CASE detail.team
            WHEN 0 THEN 'team_zero_taker'
            ELSE 'team_one_taker'
        END
    ) ->> 'time_to_ball'
)::double precision
FROM play_event_payloads payload
WHERE payload.event_id = detail.event_id
  AND detail.role = 'taker'
  AND (
    (
        payload.payload -> CASE detail.team
            WHEN 0 THEN 'team_zero_taker'
            ELSE 'team_one_taker'
        END
    ) ->> 'time_to_ball'
  ) IS NOT NULL;
