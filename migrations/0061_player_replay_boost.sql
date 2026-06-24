-- Materialized per-(replay, player) boost-totals summary for the profile
-- boost panel. The live endpoint (load_player_boost_totals in api/stats.rs) is
-- ~13.8s for a high-volume player: for EVERY one of the player's replays it
-- loads the replay_boost_tracks.tracks JSONB blob (a full per-frame boost
-- time-series for all players), deserializes it in Rust, and runs the band /
-- last-value accumulation per player, then a separate per-cohort scan over
-- play_events boost_pickup/boost_respawn. This collapses each player's
-- track-derived band totals and event-derived pad counts into one summable row;
-- the read sums rows across the player's replays and reconstructs the
-- player/teammates/opponents cohorts by (replay, team).
--
-- All data columns are summable. Derived response fields are NOT stored:
--   boost_collected_unknown = max(boost_collected - (big+small+grant), 0)
--   stolen_pads             = stolen_big_pads + stolen_small_pads
-- are recomputed on read from the stored raw columns.
--
-- DDL-only; populated by the processing writer (insert_player_replay_boost) +
-- the backfill admin endpoint (backfill_player_replay_boost). The track-derived
-- columns require Rust (JSONB band accumulation, reusing the live helpers); the
-- event-field columns are a per-player SQL aggregation. Identity columns and
-- indexes mirror 0060_player_replay_possession.sql exactly.

CREATE TABLE player_replay_boost (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,

    -- Track-derived (Rust band / last-value accumulation), percent-scaled
    boost_collected double precision NOT NULL DEFAULT 0.0,
    boost_stolen double precision NOT NULL DEFAULT 0.0,
    boost_used double precision NOT NULL DEFAULT 0.0,
    boost_used_supersonic double precision NOT NULL DEFAULT 0.0,
    boost_overfill double precision NOT NULL DEFAULT 0.0,
    boost_amount_weighted_sum double precision NOT NULL DEFAULT 0.0,
    tracked_seconds double precision NOT NULL DEFAULT 0.0,
    time_empty double precision NOT NULL DEFAULT 0.0,
    time_low double precision NOT NULL DEFAULT 0.0,
    time_medium double precision NOT NULL DEFAULT 0.0,
    time_high double precision NOT NULL DEFAULT 0.0,
    time_full double precision NOT NULL DEFAULT 0.0,
    time_over double precision NOT NULL DEFAULT 0.0,

    -- Event-derived (play_events boost_pickup/boost_respawn), percent-scaled
    boost_collected_big double precision NOT NULL DEFAULT 0.0,
    boost_collected_small double precision NOT NULL DEFAULT 0.0,
    boost_collected_grant double precision NOT NULL DEFAULT 0.0,
    boost_stolen_big double precision NOT NULL DEFAULT 0.0,
    boost_stolen_small double precision NOT NULL DEFAULT 0.0,
    boost_stolen_overfill double precision NOT NULL DEFAULT 0.0,
    big_pads bigint NOT NULL DEFAULT 0,
    big_pads_offensive bigint NOT NULL DEFAULT 0,
    big_pads_neutral bigint NOT NULL DEFAULT 0,
    big_pads_defensive bigint NOT NULL DEFAULT 0,
    small_pads bigint NOT NULL DEFAULT 0,
    small_pads_offensive bigint NOT NULL DEFAULT 0,
    small_pads_defensive bigint NOT NULL DEFAULT 0,
    stolen_big_pads bigint NOT NULL DEFAULT 0,
    stolen_small_pads bigint NOT NULL DEFAULT 0,

    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> '')
);

CREATE INDEX player_replay_boost_player_idx
    ON player_replay_boost (platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, team);

CREATE INDEX player_replay_boost_replay_idx
    ON player_replay_boost (replay_id, analysis_run_id)
    INCLUDE (team, platform, platform_player_id);
