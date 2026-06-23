-- Materialized per-(replay, player) possession summary for the profile
-- possession panel. The live endpoint runs ~8 sequential per-event scans over
-- play_event_player_possession_details / play_event_touch_details /
-- play_events+payloads for the target AND every co-player (player/teammates/
-- opponents/population cohorts) across all of the target's replays (~24s for a
-- high-volume player). This collapses each player's possession spans, classified
-- touches, and possession location into one row; the read sums rows across the
-- player's replays and reconstructs cohorts by (replay, team).
--
-- "All" vs sustained-control span aggregates are stored side by side (sc_*).
-- Touch intention/surface mixes are stored as per-value count columns over the
-- known TouchIntention/TouchAction and surface value sets; location durations
-- are stored per field-third. DDL-only; populated by the processing writer +
-- backfill admin endpoint.

CREATE TABLE player_replay_possession (
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    player_subject_id text NOT NULL,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    team integer,

    -- All possession spans
    possession_count bigint NOT NULL DEFAULT 0,
    duration_seconds double precision NOT NULL DEFAULT 0.0,
    touch_count bigint NOT NULL DEFAULT 0,
    advance_distance double precision NOT NULL DEFAULT 0.0,
    retreat_distance double precision NOT NULL DEFAULT 0.0,
    carry_time double precision NOT NULL DEFAULT 0.0,
    air_dribble_time double precision NOT NULL DEFAULT 0.0,
    sustained_control_count bigint NOT NULL DEFAULT 0,
    with_carry_count bigint NOT NULL DEFAULT 0,
    with_air_dribble_count bigint NOT NULL DEFAULT 0,
    with_aerial_touch_count bigint NOT NULL DEFAULT 0,
    with_wall_touch_count bigint NOT NULL DEFAULT 0,
    duration_bucket_0 bigint NOT NULL DEFAULT 0,
    duration_bucket_1 bigint NOT NULL DEFAULT 0,
    duration_bucket_2 bigint NOT NULL DEFAULT 0,
    duration_bucket_3 bigint NOT NULL DEFAULT 0,
    duration_bucket_4 bigint NOT NULL DEFAULT 0,

    -- Sustained-control spans (controlled_plays)
    sc_possession_count bigint NOT NULL DEFAULT 0,
    sc_duration_seconds double precision NOT NULL DEFAULT 0.0,
    sc_touch_count bigint NOT NULL DEFAULT 0,
    sc_advance_distance double precision NOT NULL DEFAULT 0.0,
    sc_retreat_distance double precision NOT NULL DEFAULT 0.0,
    sc_carry_time double precision NOT NULL DEFAULT 0.0,
    sc_air_dribble_time double precision NOT NULL DEFAULT 0.0,
    sc_with_carry_count bigint NOT NULL DEFAULT 0,
    sc_with_air_dribble_count bigint NOT NULL DEFAULT 0,
    sc_with_aerial_touch_count bigint NOT NULL DEFAULT 0,
    sc_with_wall_touch_count bigint NOT NULL DEFAULT 0,
    sc_duration_bucket_0 bigint NOT NULL DEFAULT 0,
    sc_duration_bucket_1 bigint NOT NULL DEFAULT 0,
    sc_duration_bucket_2 bigint NOT NULL DEFAULT 0,
    sc_duration_bucket_3 bigint NOT NULL DEFAULT 0,
    sc_duration_bucket_4 bigint NOT NULL DEFAULT 0,

    -- Classified touches
    classified_touch_count bigint NOT NULL DEFAULT 0,
    first_touch_count bigint NOT NULL DEFAULT 0,
    first_touch_control_count bigint NOT NULL DEFAULT 0,
    contested_touch_count bigint NOT NULL DEFAULT 0,

    -- Touch intention mix (all touches) + first-touch intention mix, per value;
    -- stored as jsonb maps {intention: count} / {surface: count} so new
    -- TouchAction/intention values do not need a schema change.
    intention_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    first_touch_intention_mix jsonb NOT NULL DEFAULT '{}'::jsonb,
    surface_mix jsonb NOT NULL DEFAULT '{}'::jsonb,

    -- Possession location: seconds per field_third value {field_third: seconds}.
    location_third_seconds jsonb NOT NULL DEFAULT '{}'::jsonb,

    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (analysis_run_id, player_subject_id),
    CHECK (player_subject_id <> ''),
    CHECK (platform <> ''),
    CHECK (platform_player_id <> '')
);

CREATE INDEX player_replay_possession_player_idx
    ON player_replay_possession (platform, platform_player_id)
    INCLUDE (replay_id, analysis_run_id, team);

CREATE INDEX player_replay_possession_replay_idx
    ON player_replay_possession (replay_id, analysis_run_id)
    INCLUDE (team, platform, platform_player_id);
