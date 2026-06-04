DROP TABLE IF EXISTS play_event_subjects;
DROP TABLE IF EXISTS play_event_rotation_player_details;
DROP TABLE IF EXISTS play_event_touch_details;
DROP TABLE IF EXISTS play_event_goal_tag_details;
DROP TABLE IF EXISTS play_event_mechanic_details;
DROP TABLE IF EXISTS play_event_timeline_details;
DROP TABLE IF EXISTS play_event_scalar_fields;
DROP TABLE IF EXISTS play_event_attributes;
DROP TABLE IF EXISTS play_event_payloads;
DROP TABLE IF EXISTS play_event_players;
DROP TABLE IF EXISTS event_reviews;
DROP TABLE IF EXISTS mechanic_event_reviews;
DROP TABLE IF EXISTS play_events;
DROP TABLE IF EXISTS event_types;
DROP TABLE IF EXISTS replay_mechanic_rollups;
DROP TABLE IF EXISTS mechanic_events;
DROP TABLE IF EXISTS indexed_stat_facts;
DROP TABLE IF EXISTS replay_analysis_states;
DROP TABLE IF EXISTS replay_stat_blobs;

DROP INDEX IF EXISTS analysis_runs_index_profile_id_idx;
DROP INDEX IF EXISTS analysis_runs_staleness_lookup_idx;

ALTER TABLE analysis_runs
    DROP CONSTRAINT IF EXISTS analysis_runs_index_profile_id_fkey;

ALTER TABLE analysis_runs
    ADD COLUMN event_stream_schema_version text,
    ADD COLUMN event_stream_object_key text,
    ADD COLUMN event_stream_sha256 text,
    ADD COLUMN event_stream_byte_size bigint;

UPDATE analysis_runs
SET event_stream_schema_version = COALESCE(stats_schema_version, 'legacy:stats')
WHERE event_stream_schema_version IS NULL;

ALTER TABLE analysis_runs
    ALTER COLUMN event_stream_schema_version SET NOT NULL,
    DROP COLUMN IF EXISTS index_profile_id,
    DROP COLUMN IF EXISTS config_hash,
    DROP COLUMN IF EXISTS stats_schema_version,
    ADD CONSTRAINT analysis_runs_event_stream_object_metadata_check CHECK (
        (event_stream_object_key IS NULL AND event_stream_sha256 IS NULL AND event_stream_byte_size IS NULL)
        OR (event_stream_object_key IS NOT NULL AND event_stream_sha256 IS NOT NULL AND event_stream_byte_size IS NOT NULL)
    );

CREATE INDEX analysis_runs_staleness_lookup_idx
    ON analysis_runs (
        replay_id,
        extractor_name,
        extractor_version,
        input_file_sha256
    );

DROP TABLE IF EXISTS stat_index_profiles;

CREATE TABLE event_types (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    key text NOT NULL UNIQUE,
    display_name text NOT NULL,
    category text NOT NULL,
    description text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (key <> ''),
    CHECK (display_name <> ''),
    CHECK (category <> '')
);

CREATE TABLE play_events (
    id uuid PRIMARY KEY,
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    event_type_id integer NOT NULL REFERENCES event_types(id),
    source text NOT NULL,
    source_stream text NOT NULL,
    source_index integer NOT NULL,
    source_event_id text,
    primary_subject_kind text,
    primary_subject_id text,
    team integer,
    start_frame integer,
    end_frame integer,
    event_frame integer,
    start_time double precision,
    end_time double precision,
    event_time double precision,
    duration_seconds double precision,
    confidence double precision,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (source <> ''),
    CHECK (source_stream <> ''),
    CHECK (source_index >= 0),
    CHECK (
        primary_subject_kind IS NULL
        OR primary_subject_kind IN ('replay', 'team', 'player', 'ball', 'boost_pad', 'segment')
    ),
    CHECK (
        (primary_subject_kind IS NULL AND primary_subject_id IS NULL)
        OR (primary_subject_kind IS NOT NULL AND primary_subject_id IS NOT NULL)
    ),
    CHECK (team IS NULL OR team IN (0, 1)),
    CHECK (start_frame IS NULL OR end_frame IS NULL OR end_frame >= start_frame),
    CHECK (event_frame IS NULL OR start_frame IS NULL OR event_frame >= start_frame),
    CHECK (event_frame IS NULL OR end_frame IS NULL OR event_frame <= end_frame),
    CHECK (start_time IS NULL OR end_time IS NULL OR end_time >= start_time),
    CHECK (event_time IS NULL OR start_time IS NULL OR event_time >= start_time),
    CHECK (event_time IS NULL OR end_time IS NULL OR event_time <= end_time),
    CHECK (duration_seconds IS NULL OR duration_seconds >= 0.0),
    CHECK (confidence IS NULL OR (confidence >= 0.0 AND confidence <= 1.0))
);

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

CREATE INDEX play_events_type_replay_idx
    ON play_events (event_type_id, replay_id);

CREATE INDEX play_events_replay_frame_idx
    ON play_events (replay_id, event_frame)
    WHERE event_frame IS NOT NULL;

CREATE INDEX play_events_analysis_run_id_idx
    ON play_events (analysis_run_id);

CREATE INDEX play_events_primary_subject_idx
    ON play_events (primary_subject_kind, primary_subject_id, event_type_id)
    WHERE primary_subject_id IS NOT NULL;

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

CREATE INDEX play_event_payloads_payload_gin_idx
    ON play_event_payloads USING gin (payload jsonb_path_ops);

CREATE TABLE play_event_attributes (
    event_id uuid PRIMARY KEY REFERENCES play_events(id) ON DELETE CASCADE,
    attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(attributes) = 'object')
);

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

CREATE TABLE play_event_subjects (
    event_id uuid NOT NULL REFERENCES play_events(id) ON DELETE CASCADE,
    subject_kind text NOT NULL,
    subject_id text NOT NULL,
    replay_player_id uuid REFERENCES replay_players(id) ON DELETE SET NULL,
    role text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (event_id, subject_kind, subject_id, role),
    CHECK (subject_kind IN ('replay', 'team', 'player', 'ball', 'boost_pad', 'segment')),
    CHECK (subject_id <> ''),
    CHECK (role <> '')
);

CREATE INDEX play_event_subjects_subject_role_idx
    ON play_event_subjects (subject_kind, subject_id, role);

CREATE INDEX play_event_subjects_replay_player_role_idx
    ON play_event_subjects (replay_player_id, role)
    WHERE replay_player_id IS NOT NULL;

CREATE TABLE event_reviews (
    id uuid PRIMARY KEY,
    event_id uuid NOT NULL REFERENCES play_events(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    reviewer_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    status text NOT NULL,
    reviewed_event_type_key text,
    reviewed_subject_kind text,
    reviewed_subject_id text,
    reviewed_start_frame integer,
    reviewed_end_frame integer,
    reviewed_event_frame integer,
    confidence double precision,
    notes text,
    supersedes_review_id uuid REFERENCES event_reviews(id),
    source_review_id uuid REFERENCES event_reviews(id),
    carry_forward_method text,
    carry_forward_distance_frames integer,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (status IN ('confirmed', 'rejected', 'corrected', 'uncertain', 'needs_second_review')),
    CHECK (
        reviewed_subject_kind IS NULL
        OR reviewed_subject_kind IN ('replay', 'team', 'player', 'ball', 'boost_pad', 'segment')
    ),
    CHECK (
        reviewed_start_frame IS NULL
        OR reviewed_end_frame IS NULL
        OR reviewed_end_frame >= reviewed_start_frame
    ),
    CHECK (
        reviewed_event_frame IS NULL
        OR reviewed_start_frame IS NULL
        OR reviewed_event_frame >= reviewed_start_frame
    ),
    CHECK (
        reviewed_event_frame IS NULL
        OR reviewed_end_frame IS NULL
        OR reviewed_event_frame <= reviewed_end_frame
    ),
    CHECK (confidence IS NULL OR (confidence >= 0.0 AND confidence <= 1.0))
);

CREATE INDEX event_reviews_event_created_idx
    ON event_reviews (event_id, created_at DESC);

CREATE INDEX event_reviews_reviewer_created_idx
    ON event_reviews (reviewer_user_id, created_at DESC)
    WHERE reviewer_user_id IS NOT NULL;

CREATE INDEX event_reviews_status_idx
    ON event_reviews (status, created_at DESC);
