-- Persist the taker's boost-used value from the subtr-actor kickoff payload.
--
-- `boost_used` accounts for boost collected before contact, so it cannot be
-- reconstructed from `start_boost - boost_after` without dropping valid usage
-- on kickoff approaches that include a pad pickup.
ALTER TABLE play_event_kickoff_player_details
    ADD COLUMN boost_used double precision,
    ADD CONSTRAINT play_event_kickoff_player_details_boost_used_check
        CHECK (boost_used IS NULL OR boost_used >= 0);

UPDATE play_event_kickoff_player_details detail
SET boost_used = (
    (
        payload.payload -> CASE detail.team
            WHEN 0 THEN 'team_zero_taker'
            ELSE 'team_one_taker'
        END
    ) ->> 'boost_used'
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
    ) ->> 'boost_used'
  ) IS NOT NULL;
