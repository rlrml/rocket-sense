-- Materialized per-replay team-level ball control for the profile possession
-- panel. The team metrics (which team controlled the ball, which half/third the
-- ball sat in) are ball-global event streams with no player subject, so they
-- live per-(analysis_run, replay) rather than per replay_player. Durations are
-- stored in absolute team_zero/team_one/neutral terms; the read path orients
-- them to the queried player's team by joining replay_players.team, and splits
-- by game result via the existing replay-set outcome filter (no win/loss is
-- baked in here). DDL-only; populated by the processing writer + the
-- backfill-team-control admin endpoint.
CREATE TABLE replay_team_control (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,

    -- possession stream: seconds each team controlled the ball.
    possession_team_zero_seconds double precision NOT NULL DEFAULT 0.0,
    possession_team_one_seconds double precision NOT NULL DEFAULT 0.0,
    possession_neutral_seconds double precision NOT NULL DEFAULT 0.0,

    -- ball_half stream: seconds the ball sat in each half.
    ball_half_team_zero_seconds double precision NOT NULL DEFAULT 0.0,
    ball_half_team_one_seconds double precision NOT NULL DEFAULT 0.0,
    ball_half_neutral_seconds double precision NOT NULL DEFAULT 0.0,

    -- ball_third stream: seconds the ball sat in each third.
    ball_third_team_zero_seconds double precision NOT NULL DEFAULT 0.0,
    ball_third_team_one_seconds double precision NOT NULL DEFAULT 0.0,
    ball_third_neutral_seconds double precision NOT NULL DEFAULT 0.0,

    created_at timestamptz NOT NULL DEFAULT now(),

    PRIMARY KEY (analysis_run_id, replay_id)
);

-- Read path joins by replay_id (canonical analysis run) across a replay set.
CREATE INDEX replay_team_control_replay_idx ON replay_team_control (replay_id, analysis_run_id);
