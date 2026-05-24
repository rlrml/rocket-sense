ALTER TABLE replays
    ADD COLUMN canonical_analysis_run_id uuid REFERENCES analysis_runs(id) ON DELETE SET NULL;

UPDATE replays replay
SET canonical_analysis_run_id = state.active_analysis_run_id
FROM replay_analysis_states state
WHERE state.replay_id = replay.id
  AND state.active_analysis_run_id IS NOT NULL
  AND replay.canonical_analysis_run_id IS NULL;

CREATE INDEX replays_canonical_analysis_run_id_idx
    ON replays (canonical_analysis_run_id)
    WHERE canonical_analysis_run_id IS NOT NULL;

CREATE TABLE event_types (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    key text NOT NULL UNIQUE,
    display_name text NOT NULL,
    category text,
    description text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (key <> ''),
    CHECK (display_name <> ''),
    CHECK (category IS NULL OR category <> '')
);

INSERT INTO event_types (
    key,
    display_name,
    category
)
VALUES
    ('mechanic.air_dribble', 'Air dribble', 'mechanic'),
    ('mechanic.ball_carry', 'Ball carry', 'mechanic'),
    ('mechanic.ceiling_shot', 'Ceiling shot', 'mechanic'),
    ('mechanic.double_tap', 'Double tap', 'mechanic'),
    ('mechanic.flick', 'Flick', 'mechanic'),
    ('mechanic.flip_reset', 'Flip reset', 'mechanic'),
    ('mechanic.half_flip', 'Half flip', 'mechanic'),
    ('mechanic.half_volley', 'Half volley', 'mechanic'),
    ('mechanic.musty_flick', 'Musty flick', 'mechanic'),
    ('mechanic.one_timer', 'One timer', 'mechanic'),
    ('mechanic.pass', 'Pass', 'mechanic'),
    ('mechanic.speed_flip', 'Speed flip', 'mechanic'),
    ('mechanic.wavedash', 'Wavedash', 'mechanic');

CREATE TABLE play_events (
    id uuid PRIMARY KEY,
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    event_type_id integer NOT NULL REFERENCES event_types(id),
    primary_replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    source text NOT NULL,
    source_event_id text,
    start_frame integer,
    end_frame integer,
    event_frame integer,
    start_time double precision,
    end_time double precision,
    event_time double precision,
    confidence double precision,
    attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
    payload jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (source <> ''),
    CHECK (start_frame IS NULL OR end_frame IS NULL OR end_frame >= start_frame),
    CHECK (event_frame IS NULL OR start_frame IS NULL OR event_frame >= start_frame),
    CHECK (event_frame IS NULL OR end_frame IS NULL OR event_frame <= end_frame),
    CHECK (start_time IS NULL OR end_time IS NULL OR end_time >= start_time),
    CHECK (event_time IS NULL OR start_time IS NULL OR event_time >= start_time),
    CHECK (event_time IS NULL OR end_time IS NULL OR event_time <= end_time),
    CHECK (confidence IS NULL OR (confidence >= 0.0 AND confidence <= 1.0)),
    CHECK (jsonb_typeof(attributes) = 'object'),
    CHECK (jsonb_typeof(payload) = 'object')
);

CREATE UNIQUE INDEX play_events_source_identity_idx
    ON play_events (
        analysis_run_id,
        event_type_id,
        COALESCE(source_event_id, ''),
        COALESCE(primary_replay_player_id, '00000000-0000-0000-0000-000000000000'::uuid),
        COALESCE(event_frame, -1),
        md5(payload::text)
    );

CREATE INDEX play_events_type_replay_idx
    ON play_events (event_type_id, replay_id);

CREATE INDEX play_events_primary_replay_player_type_idx
    ON play_events (primary_replay_player_id, event_type_id)
    WHERE primary_replay_player_id IS NOT NULL;

CREATE INDEX play_events_replay_frame_idx
    ON play_events (replay_id, event_frame)
    WHERE event_frame IS NOT NULL;

CREATE INDEX play_events_analysis_run_id_idx
    ON play_events (analysis_run_id);

CREATE INDEX play_events_attributes_gin_idx
    ON play_events USING gin (attributes jsonb_path_ops);

CREATE TABLE play_event_players (
    event_id uuid NOT NULL REFERENCES play_events(id) ON DELETE CASCADE,
    replay_player_id uuid NOT NULL REFERENCES replay_players(id) ON DELETE CASCADE,
    role text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (event_id, replay_player_id, role),
    CHECK (role <> '')
);

CREATE INDEX play_event_players_replay_player_role_idx
    ON play_event_players (replay_player_id, role);
