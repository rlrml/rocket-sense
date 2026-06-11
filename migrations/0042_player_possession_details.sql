-- Career possession stats: persist subtr-actor's enriched `player_possession`
-- spans (one row per continuous single-player possession) and the touch
-- classification facets (intention, first-touch flag, contested flag, ball
-- movement) that the possession summary endpoint aggregates.

CREATE TABLE play_event_player_possession_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    team integer NOT NULL,
    duration double precision NOT NULL,
    touch_count integer NOT NULL,
    aerial_touch_count integer NOT NULL,
    wall_touch_count integer NOT NULL,
    advance_distance double precision NOT NULL,
    retreat_distance double precision NOT NULL,
    carry_time double precision NOT NULL,
    air_dribble_time double precision NOT NULL,
    carry_count integer NOT NULL,
    air_dribble_count integer NOT NULL,
    close_time double precision NOT NULL,
    sustained_control boolean NOT NULL,
    start_field_third text,
    end_field_third text,
    CHECK (player_subject_id <> ''),
    CHECK (team IN (0, 1)),
    CHECK (duration >= 0.0),
    CHECK (touch_count >= 0),
    CHECK (aerial_touch_count >= 0),
    CHECK (wall_touch_count >= 0),
    CHECK (advance_distance >= 0.0),
    CHECK (retreat_distance >= 0.0),
    CHECK (carry_time >= 0.0),
    CHECK (air_dribble_time >= 0.0),
    CHECK (carry_count >= 0),
    CHECK (air_dribble_count >= 0),
    CHECK (close_time >= 0.0),
    CHECK (start_field_third IS NULL OR start_field_third <> ''),
    CHECK (end_field_third IS NULL OR end_field_third <> '')
);

CREATE INDEX play_event_player_possession_details_replay_idx
    ON play_event_player_possession_details (replay_id);

CREATE INDEX play_event_player_possession_details_player_idx
    ON play_event_player_possession_details (player_subject_id);

CREATE INDEX play_event_player_possession_details_replay_player_idx
    ON play_event_player_possession_details (replay_player_id);

-- Touch classification facets that previously lived only in the JSON payload.
-- Nullable: rows written before this migration predate the fields and are
-- replaced as replays reprocess under the new event-stream schema version.
ALTER TABLE play_event_touch_details
    ADD COLUMN intention text,
    ADD COLUMN first_touch boolean,
    ADD COLUMN contested boolean,
    ADD COLUMN advance_distance double precision,
    ADD COLUMN retreat_distance double precision;

ALTER TABLE play_event_touch_details
    ADD CONSTRAINT play_event_touch_details_intention_not_empty
        CHECK (intention IS NULL OR intention <> '');
