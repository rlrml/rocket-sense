-- Materialized per-(replay, player) positioning durations for the profile
-- positioning-summary panel. The live endpoint scanned every positioning event
-- (player_activity / field_third / field_half / ball_depth / depth_role /
-- ball_proximity / positioning_distance) for the target and every co-player in
-- all of the target's replays (~9s for a high-volume player). This collapses
-- each player's positioning events in a replay to one row of summed durations;
-- the read sums rows across the player's replays and reconstructs the teammate/
-- opponent cohorts by joining on (replay, team).
--
-- Grain/identity mirror player_replay_event_counts (0056). DDL-only; populated
-- by the processing writer and the backfill admin endpoint. Reads join
-- replays.canonical_analysis_run_id to ignore superseded runs.

CREATE TABLE player_replay_positioning (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    active_seconds double precision NOT NULL DEFAULT 0.0,
    tracked_seconds double precision NOT NULL DEFAULT 0.0,
    defensive_third_seconds double precision NOT NULL DEFAULT 0.0,
    neutral_third_seconds double precision NOT NULL DEFAULT 0.0,
    offensive_third_seconds double precision NOT NULL DEFAULT 0.0,
    defensive_half_seconds double precision NOT NULL DEFAULT 0.0,
    offensive_half_seconds double precision NOT NULL DEFAULT 0.0,
    behind_ball_seconds double precision NOT NULL DEFAULT 0.0,
    level_with_ball_seconds double precision NOT NULL DEFAULT 0.0,
    ahead_of_ball_seconds double precision NOT NULL DEFAULT 0.0,
    role_most_back_seconds double precision NOT NULL DEFAULT 0.0,
    role_mid_seconds double precision NOT NULL DEFAULT 0.0,
    role_most_forward_seconds double precision NOT NULL DEFAULT 0.0,
    role_other_seconds double precision NOT NULL DEFAULT 0.0,
    role_no_teammates_seconds double precision NOT NULL DEFAULT 0.0,
    closest_team_seconds double precision NOT NULL DEFAULT 0.0,
    closest_absolute_seconds double precision NOT NULL DEFAULT 0.0,
    farthest_seconds double precision NOT NULL DEFAULT 0.0,
    distance_to_ball_weighted double precision NOT NULL DEFAULT 0.0,
    distance_to_ball_weight double precision NOT NULL DEFAULT 0.0,
    distance_to_teammates_weighted double precision NOT NULL DEFAULT 0.0,
    distance_to_teammates_weight double precision NOT NULL DEFAULT 0.0,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> '')
);

-- Target read: filter by player, join replays, sum columns.
CREATE INDEX player_replay_positioning_player_idx
    ON player_replay_positioning (platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, team);

-- Teammate/opponent cohorts: fan out from the target's replays to co-players.
CREATE INDEX player_replay_positioning_replay_idx
    ON player_replay_positioning (replay_id, analysis_run_id)
    INCLUDE (team, platform, platform_player_id);
