-- Materialized per-(replay, player, touch-dimension) breakdown for the profile
-- Touches view. The live endpoint scanned canonical touch events and touch
-- details across every replay in a player's lifetime cohort. This stores the
-- two breakdown dimensions rendered by the UI (kind and category) at write
-- time; reads reconstruct self/teammate/opponent cohorts by (replay, team).

CREATE TABLE player_replay_touch_breakdowns (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,
    dimension text NOT NULL,
    value text NOT NULL,
    touch_count bigint NOT NULL DEFAULT 0,
    advance_distance double precision NOT NULL DEFAULT 0.0,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id, dimension, value),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (dimension IN ('kind', 'category')),
    CHECK (value <> '')
);

CREATE INDEX player_replay_touch_breakdowns_player_idx
    ON player_replay_touch_breakdowns (platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, team, dimension, value);

CREATE INDEX player_replay_touch_breakdowns_replay_idx
    ON player_replay_touch_breakdowns (replay_id, analysis_run_id)
    INCLUDE (team, platform, platform_player_id, dimension, value);
