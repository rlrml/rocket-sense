DROP INDEX IF EXISTS play_events_source_identity_idx;
DROP INDEX IF EXISTS play_events_attributes_gin_idx;

ALTER TABLE play_events
    ADD COLUMN source_stream text,
    ADD COLUMN source_index integer,
    ADD COLUMN team integer,
    ADD COLUMN duration_seconds double precision;

WITH indexed_events AS (
    SELECT
        id,
        row_number() OVER (
            PARTITION BY analysis_run_id, event_type_id, source
            ORDER BY created_at, id
        ) - 1 AS legacy_source_index
    FROM play_events
)
UPDATE play_events event
SET
    source_stream = COALESCE(event.source_stream, event.source),
    source_index = COALESCE(event.source_index, indexed_events.legacy_source_index::integer)
FROM indexed_events
WHERE event.id = indexed_events.id
  AND (event.source_stream IS NULL OR event.source_index IS NULL);

ALTER TABLE play_events
    ALTER COLUMN source_stream SET NOT NULL,
    ALTER COLUMN source_index SET NOT NULL,
    ADD CONSTRAINT play_events_source_stream_check CHECK (source_stream <> ''),
    ADD CONSTRAINT play_events_source_index_check CHECK (source_index >= 0),
    ADD CONSTRAINT play_events_team_check CHECK (team IS NULL OR team IN (0, 1)),
    ADD CONSTRAINT play_events_duration_seconds_check CHECK (duration_seconds IS NULL OR duration_seconds >= 0.0);

CREATE UNIQUE INDEX play_events_source_identity_idx
    ON play_events (
        analysis_run_id,
        event_type_id,
        source,
        source_stream,
        source_index,
        COALESCE(source_event_id, ''),
        COALESCE(primary_subject_kind, ''),
        COALESCE(primary_subject_id, ''),
        COALESCE(start_frame, -1),
        COALESCE(end_frame, -1),
        COALESCE(event_frame, -1)
    );

CREATE INDEX play_events_stream_idx
    ON play_events (source_stream, event_type_id, replay_id);

CREATE INDEX play_events_duration_idx
    ON play_events (event_type_id, duration_seconds)
    WHERE duration_seconds IS NOT NULL;

CREATE INDEX play_events_team_idx
    ON play_events (team, event_type_id, replay_id)
    WHERE team IS NOT NULL;

CREATE TABLE play_event_payloads (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    payload jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(payload) = 'object')
);

INSERT INTO play_event_payloads (event_id, payload, created_at)
SELECT id, payload, created_at
FROM play_events
WHERE payload IS NOT NULL
ON CONFLICT DO NOTHING;

CREATE INDEX play_event_payloads_payload_gin_idx
    ON play_event_payloads USING gin (payload jsonb_path_ops);

CREATE TABLE play_event_attributes (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(attributes) = 'object')
);

INSERT INTO play_event_attributes (event_id, attributes, created_at)
SELECT id, attributes, created_at
FROM play_events
ON CONFLICT DO NOTHING;

CREATE INDEX play_event_attributes_gin_idx
    ON play_event_attributes USING gin (attributes jsonb_path_ops);

CREATE TABLE play_event_scalar_fields (
    event_id uuid NOT NULL REFERENCES play_events(id) ON DELETE CASCADE,
    field_source text NOT NULL,
    field_path text NOT NULL,
    value_kind text NOT NULL,
    string_value text,
    numeric_value double precision,
    boolean_value boolean,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (event_id, field_source, field_path),
    CHECK (field_source IN ('payload', 'attribute')),
    CHECK (field_path <> ''),
    CHECK (value_kind IN ('string', 'number', 'boolean')),
    CHECK (
        (value_kind = 'string' AND string_value IS NOT NULL AND numeric_value IS NULL AND boolean_value IS NULL)
        OR (value_kind = 'number' AND string_value IS NULL AND numeric_value IS NOT NULL AND boolean_value IS NULL)
        OR (value_kind = 'boolean' AND string_value IS NULL AND numeric_value IS NULL AND boolean_value IS NOT NULL)
    )
);

CREATE INDEX play_event_scalar_fields_string_idx
    ON play_event_scalar_fields (field_source, field_path, string_value)
    WHERE string_value IS NOT NULL;

CREATE INDEX play_event_scalar_fields_numeric_idx
    ON play_event_scalar_fields (field_source, field_path, numeric_value)
    WHERE numeric_value IS NOT NULL;

CREATE INDEX play_event_scalar_fields_boolean_idx
    ON play_event_scalar_fields (field_source, field_path, boolean_value)
    WHERE boolean_value IS NOT NULL;

CREATE TABLE play_event_timeline_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    kind text NOT NULL,
    player_subject_id text,
    team integer,
    CHECK (kind <> ''),
    CHECK (team IS NULL OR team IN (0, 1))
);

CREATE INDEX play_event_timeline_details_kind_idx
    ON play_event_timeline_details (kind);

CREATE TABLE play_event_mechanic_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    mechanic text NOT NULL,
    properties jsonb NOT NULL DEFAULT '{}'::jsonb,
    CHECK (mechanic <> ''),
    CHECK (jsonb_typeof(properties) = 'object')
);

CREATE INDEX play_event_mechanic_details_mechanic_idx
    ON play_event_mechanic_details (mechanic);

CREATE TABLE play_event_goal_tag_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    goal_index integer NOT NULL,
    kind text NOT NULL,
    scoring_team integer NOT NULL,
    scorer_subject_id text,
    confidence double precision NOT NULL,
    modifiers jsonb NOT NULL DEFAULT '[]'::jsonb,
    evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
    CHECK (goal_index >= 0),
    CHECK (kind <> ''),
    CHECK (scoring_team IN (0, 1)),
    CHECK (confidence >= 0.0 AND confidence <= 1.0),
    CHECK (jsonb_typeof(modifiers) = 'array'),
    CHECK (jsonb_typeof(evidence) = 'array')
);

CREATE INDEX play_event_goal_tag_details_kind_idx
    ON play_event_goal_tag_details (kind);

CREATE TABLE play_event_touch_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    kind text NOT NULL,
    height_band text NOT NULL,
    surface text NOT NULL,
    dodge_state text NOT NULL,
    ball_speed_change double precision NOT NULL,
    sample_frame integer NOT NULL,
    sample_time double precision NOT NULL,
    CHECK (kind <> ''),
    CHECK (height_band <> ''),
    CHECK (surface <> ''),
    CHECK (dodge_state <> '')
);

CREATE INDEX play_event_touch_details_kind_idx
    ON play_event_touch_details (kind);

CREATE TABLE play_event_rotation_player_details (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    active boolean NOT NULL,
    current_role_state text NOT NULL,
    current_depth_state text NOT NULL,
    active_game_time double precision NOT NULL,
    tracked_time double precision NOT NULL,
    time_first_man double precision NOT NULL,
    time_second_man double precision NOT NULL,
    time_third_man double precision NOT NULL,
    time_ambiguous_role double precision NOT NULL,
    time_behind_play double precision NOT NULL,
    time_level_with_play double precision NOT NULL,
    time_ahead_of_play double precision NOT NULL,
    longest_first_man_stint_time double precision NOT NULL,
    first_man_stint_count integer NOT NULL,
    became_first_man_count integer NOT NULL,
    lost_first_man_count integer NOT NULL,
    CHECK (current_role_state <> ''),
    CHECK (current_depth_state <> '')
);

CREATE INDEX play_event_rotation_player_details_role_idx
    ON play_event_rotation_player_details (current_role_state, active);

ALTER TABLE play_events
    DROP COLUMN payload,
    DROP COLUMN attributes;
