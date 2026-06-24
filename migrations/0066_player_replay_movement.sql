-- Materialized per-(replay, player) movement summary for the profile movement
-- panel. The live endpoint scanned movement/powerslide/mechanic events for the
-- target and every co-player across all of the target's replays. This collapses
-- each player's movement events in a replay to one summable row; reads
-- reconstruct self/teammate/opponent cohorts by joining on (replay, team).

CREATE TABLE player_replay_movement (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    active_seconds double precision NOT NULL DEFAULT 0.0,
    total_distance double precision NOT NULL DEFAULT 0.0,
    speed_weighted double precision NOT NULL DEFAULT 0.0,
    speed_weight double precision NOT NULL DEFAULT 0.0,
    slow_seconds double precision NOT NULL DEFAULT 0.0,
    boost_seconds double precision NOT NULL DEFAULT 0.0,
    supersonic_seconds double precision NOT NULL DEFAULT 0.0,
    ground_seconds double precision NOT NULL DEFAULT 0.0,
    low_air_seconds double precision NOT NULL DEFAULT 0.0,
    high_air_seconds double precision NOT NULL DEFAULT 0.0,
    powerslide_count bigint NOT NULL DEFAULT 0,
    powerslide_seconds double precision NOT NULL DEFAULT 0.0,
    speed_flips bigint NOT NULL DEFAULT 0,
    wavedashes bigint NOT NULL DEFAULT 0,
    half_flips bigint NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> '')
);

CREATE INDEX player_replay_movement_player_idx
    ON player_replay_movement (platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, team);

CREATE INDEX player_replay_movement_replay_idx
    ON player_replay_movement (replay_id, analysis_run_id)
    INCLUDE (team, platform, platform_player_id);

CREATE FUNCTION rocket_sense_movement_seconds(
    payload jsonb,
    duration double precision,
    explicit_keys text[],
    states text[]
)
RETURNS double precision
LANGUAGE sql
IMMUTABLE
AS $$
    SELECT CASE
        WHEN explicit_seconds > 0.0 THEN explicit_seconds
        WHEN payload->>'speed_band' = ANY(states)
          OR payload->>'band' = ANY(states)
          OR payload->>'speed_state' = ANY(states)
          OR payload->>'height_band' = ANY(states)
          OR payload->>'surface' = ANY(states)
          OR payload->>'air_state' = ANY(states)
          OR payload->>'state' = ANY(states)
          OR payload->>'kind' = ANY(states)
            THEN GREATEST(COALESCE(duration, 0.0), 0.0)
        ELSE 0.0
    END
    FROM (
        SELECT COALESCE(MAX((payload->>key)::double precision), 0.0) AS explicit_seconds
        FROM unnest(explicit_keys) AS key
        WHERE jsonb_typeof(payload->key) = 'number'
    ) explicit_values;
$$;
