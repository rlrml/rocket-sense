-- Materialized per-(replay, player, role, event-taker-spawn-set) kickoff summary
-- for the profile Kickoffs view. The live endpoint
-- (api/event_stats.rs::load_kickoff_summary + load_event_stat_dimensions) ran one
-- summary aggregate plus one GROUP BY per dimension, each a full scan of
-- play_event_kickoff_player_details joined to play_event_kickoff_details,
-- play_events and replays across the player's whole lifetime cohort -- ~13 scans
-- per call, fetched three times (taker / support / role-neutral) per page load.
--
-- This stores, at write time, each player's per-replay kickoff appearances
-- pre-aggregated to the grain that the read path still needs to filter on:
--   * role            -- so the taker / support / role-neutral reads can split
--   * taker_spawns     -- the distinct set of TAKER spawn positions in the event
--                         (across both teams), so the shape/side spawn filter --
--                         which matches events where ANY taker spawned in the
--                         selected set -- is reproduced by an array-overlap (&&)
--                         instead of a per-event EXISTS scan.
-- Summary metrics are stored as counts plus sum/count pairs for the averages;
-- the per-dimension value distributions are stored as jsonb {value: count} mixes
-- (NULL values keyed as '' since every source value column is CHECK (<> '')).
-- Reads sum the matching rows and reconstruct the summary + dimension responses.

CREATE TABLE player_replay_kickoff (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    role text NOT NULL,
    -- Sorted, distinct, non-null TAKER spawn positions present in the event.
    taker_spawns text[] NOT NULL DEFAULT '{}'::text[],

    row_count bigint NOT NULL DEFAULT 0,
    touched_count bigint NOT NULL DEFAULT 0,
    first_touch_count bigint NOT NULL DEFAULT 0,
    missed_count bigint NOT NULL DEFAULT 0,
    fake_count bigint NOT NULL DEFAULT 0,
    win_count bigint NOT NULL DEFAULT 0,
    loss_count bigint NOT NULL DEFAULT 0,
    neutral_count bigint NOT NULL DEFAULT 0,
    kickoff_goals_for bigint NOT NULL DEFAULT 0,
    kickoff_goals_against bigint NOT NULL DEFAULT 0,
    advantages_for bigint NOT NULL DEFAULT 0,
    advantages_against bigint NOT NULL DEFAULT 0,
    no_advantage_count bigint NOT NULL DEFAULT 0,

    -- Average components (avg = sum / NULLIF(count, 0) at read time).
    time_to_ball_sum double precision NOT NULL DEFAULT 0.0,
    time_to_ball_count bigint NOT NULL DEFAULT 0,
    boost_after_sum double precision NOT NULL DEFAULT 0.0,
    boost_after_count bigint NOT NULL DEFAULT 0,
    boost_used_sum double precision NOT NULL DEFAULT 0.0,
    boost_used_count bigint NOT NULL DEFAULT 0,

    -- Per-dimension {value: count} mixes; '' key represents a NULL value.
    spawn_position_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    approach_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    taker_outcome_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    support_behavior_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    kickoff_outcome_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    player_result_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    win_strength_result_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    advantage_result_mix jsonb NOT NULL DEFAULT '{}'::jsonb,

    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, replay_id, player_subject_id, role, taker_spawns),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (team IS NULL OR team IN (0, 1)),
    CHECK (role IN ('taker', 'support'))
);

CREATE INDEX player_replay_kickoff_player_idx
    ON player_replay_kickoff (player_subject_id)
    INCLUDE (replay_id, analysis_run_id, role, team);

CREATE INDEX player_replay_kickoff_replay_idx
    ON player_replay_kickoff (replay_id, analysis_run_id);
