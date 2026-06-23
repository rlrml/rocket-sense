-- Materialized first-man rotation stint durations for the rotation-duration
-- histogram on the profile stats page. The live query scanned every actor's
-- rotation events (rotation_first_man_stint / rotation_role) and LEFT JOINed the
-- jsonb play_event_attributes to filter `state = 'first_man'`; for the teammate
-- comparison that scan dominated the aggregates latency (~15s for a high-volume
-- player). This stores one row per first-man stint with its duration, baking the
-- jsonb filter in at write time so the histogram reads are an indexed scan.
--
-- Grain and identity mirror player_replay_event_counts (0056): rows are tied to
-- an analysis run but carry durable player identity, and reads join to
-- replays.canonical_analysis_run_id to ignore superseded runs. Populated by the
-- per-replay writer in processing.rs and the backfill admin endpoint; no
-- in-migration backfill so this applies instantly on boot.

CREATE TABLE player_replay_first_man_stints (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    event_id uuid NOT NULL,
    duration_seconds double precision NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, event_id, player_subject_id),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (duration_seconds > 0.0)
);

-- Target histogram: filter by player, join replays, bucket durations.
CREATE INDEX player_replay_first_man_stints_player_idx
    ON player_replay_first_man_stints (platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, team, duration_seconds);

-- Teammate histogram: fan out from the target's replays to co-players' stints.
CREATE INDEX player_replay_first_man_stints_replay_idx
    ON player_replay_first_man_stints (replay_id, analysis_run_id)
    INCLUDE (team, platform, platform_player_id, duration_seconds);
