ALTER TABLE play_event_kickoff_details
    ADD COLUMN replay_id uuid;

UPDATE play_event_kickoff_details detail
SET replay_id = event.replay_id
FROM play_events event
WHERE event.id = detail.event_id;

ALTER TABLE play_event_kickoff_details
    ALTER COLUMN replay_id SET NOT NULL,
    ADD CONSTRAINT play_event_kickoff_details_replay_id_fkey
        FOREIGN KEY (replay_id) REFERENCES replays(id) ON DELETE CASCADE;

CREATE INDEX play_event_kickoff_details_replay_event_idx
    ON play_event_kickoff_details (replay_id, event_id);

CREATE INDEX play_event_kickoff_details_replay_outcome_idx
    ON play_event_kickoff_details (replay_id, outcome, winning_team);

CREATE INDEX play_event_kickoff_details_replay_goal_idx
    ON play_event_kickoff_details (replay_id, scoring_team, time_to_goal)
    WHERE kickoff_goal;

ALTER TABLE play_event_kickoff_player_details
    ADD COLUMN replay_id uuid,
    ADD COLUMN replay_player_id uuid;

UPDATE play_event_kickoff_player_details detail
SET replay_id = event.replay_id
FROM play_events event
WHERE event.id = detail.event_id;

UPDATE play_event_kickoff_player_details detail
SET replay_player_id = replay_player.id
FROM replay_players replay_player
WHERE replay_player.replay_id = detail.replay_id
  AND replay_player.platform IS NOT NULL
  AND replay_player.platform_player_id IS NOT NULL
  AND replay_player.platform || ':' || replay_player.platform_player_id = detail.player_subject_id;

ALTER TABLE play_event_kickoff_player_details
    ALTER COLUMN replay_id SET NOT NULL,
    ADD CONSTRAINT play_event_kickoff_player_details_replay_id_fkey
        FOREIGN KEY (replay_id) REFERENCES replays(id) ON DELETE CASCADE,
    ADD CONSTRAINT play_event_kickoff_player_details_replay_player_id_fkey
        FOREIGN KEY (replay_player_id) REFERENCES replay_players(id) ON DELETE SET NULL;

CREATE INDEX play_event_kickoff_player_details_player_role_replay_idx
    ON play_event_kickoff_player_details (player_subject_id, role, replay_id, event_id)
    INCLUDE (
        replay_player_id,
        team,
        spawn_position,
        start_boost,
        boost_after,
        first_touch_time,
        first_touch_frame,
        taker_outcome,
        approach,
        support_behavior
    );

CREATE INDEX play_event_kickoff_player_details_replay_role_event_idx
    ON play_event_kickoff_player_details (replay_id, role, event_id);

CREATE INDEX play_event_kickoff_player_details_replay_player_role_idx
    ON play_event_kickoff_player_details (replay_player_id, role, event_id)
    WHERE replay_player_id IS NOT NULL;

CREATE INDEX play_event_kickoff_player_details_taker_career_idx
    ON play_event_kickoff_player_details (
        player_subject_id,
        replay_id,
        approach,
        taker_outcome,
        spawn_position
    )
    INCLUDE (
        event_id,
        replay_player_id,
        team,
        start_boost,
        boost_after,
        first_touch_time,
        first_touch_frame
    )
    WHERE role = 'taker';
