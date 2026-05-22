CREATE TABLE stat_index_profiles (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    version integer NOT NULL,
    description text,
    config jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (version > 0),
    CHECK (jsonb_typeof(config) = 'object'),
    UNIQUE (name, version)
);

CREATE TABLE analysis_runs (
    id uuid PRIMARY KEY,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    index_profile_id uuid REFERENCES stat_index_profiles(id),
    status text NOT NULL DEFAULT 'pending',
    extractor_name text NOT NULL,
    extractor_version text NOT NULL,
    extractor_git_sha text,
    subtr_actor_version text,
    subtr_actor_git_sha text,
    rocket_sense_git_sha text,
    config_hash text NOT NULL,
    input_file_sha256 text NOT NULL,
    stats_schema_version text,
    started_at timestamptz NOT NULL DEFAULT now(),
    finished_at timestamptz,
    error_message text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (status IN ('pending', 'running', 'succeeded', 'failed')),
    CHECK (finished_at IS NULL OR finished_at >= started_at)
);

CREATE INDEX analysis_runs_replay_id_idx
    ON analysis_runs (replay_id, started_at DESC);

CREATE INDEX analysis_runs_index_profile_id_idx
    ON analysis_runs (index_profile_id)
    WHERE index_profile_id IS NOT NULL;

CREATE INDEX analysis_runs_staleness_lookup_idx
    ON analysis_runs (
        replay_id,
        extractor_name,
        extractor_version,
        config_hash,
        input_file_sha256
    );

CREATE TABLE replay_stat_blobs (
    analysis_run_id uuid PRIMARY KEY REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    stats jsonb NOT NULL,
    stats_sha256 text,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(stats) = 'object')
);

CREATE INDEX replay_stat_blobs_replay_id_idx
    ON replay_stat_blobs (replay_id);

CREATE INDEX replay_stat_blobs_stats_gin_idx
    ON replay_stat_blobs USING gin (stats jsonb_path_ops);

CREATE TABLE replay_analysis_states (
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    index_profile_id uuid NOT NULL REFERENCES stat_index_profiles(id),
    active_analysis_run_id uuid REFERENCES analysis_runs(id) ON DELETE SET NULL,
    desired_extractor_name text NOT NULL,
    desired_extractor_version text NOT NULL,
    desired_config_hash text NOT NULL,
    desired_input_file_sha256 text NOT NULL,
    needs_reanalysis boolean NOT NULL DEFAULT true,
    needs_reindex boolean NOT NULL DEFAULT true,
    stale_reason text,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (replay_id, index_profile_id)
);

CREATE INDEX replay_analysis_states_active_run_idx
    ON replay_analysis_states (active_analysis_run_id)
    WHERE active_analysis_run_id IS NOT NULL;

CREATE INDEX replay_analysis_states_work_queue_idx
    ON replay_analysis_states (needs_reanalysis, needs_reindex, updated_at)
    WHERE needs_reanalysis OR needs_reindex;

CREATE TABLE indexed_stat_facts (
    id uuid PRIMARY KEY,
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    index_profile_id uuid NOT NULL REFERENCES stat_index_profiles(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    subject_kind text NOT NULL,
    subject_id text,
    stat_key text NOT NULL,
    unit text,
    labels jsonb NOT NULL DEFAULT '{}'::jsonb,
    source_path text,
    value_type text NOT NULL,
    value_double double precision,
    value_int bigint,
    value_text text,
    value_bool boolean,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (subject_kind IN ('replay', 'team', 'player', 'segment')),
    CHECK (jsonb_typeof(labels) = 'object'),
    CHECK (value_type IN ('double', 'int', 'text', 'bool')),
    CHECK (
        num_nonnulls(value_double, value_int, value_text, value_bool) = 1
    ),
    CHECK (
        (value_type = 'double' AND value_double IS NOT NULL)
        OR (value_type = 'int' AND value_int IS NOT NULL)
        OR (value_type = 'text' AND value_text IS NOT NULL)
        OR (value_type = 'bool' AND value_bool IS NOT NULL)
    )
);

CREATE UNIQUE INDEX indexed_stat_facts_identity_idx
    ON indexed_stat_facts (
        analysis_run_id,
        index_profile_id,
        subject_kind,
        COALESCE(subject_id, ''),
        stat_key,
        md5(labels::text)
    );

CREATE INDEX indexed_stat_facts_replay_profile_idx
    ON indexed_stat_facts (replay_id, index_profile_id);

CREATE INDEX indexed_stat_facts_subject_idx
    ON indexed_stat_facts (subject_kind, subject_id)
    WHERE subject_id IS NOT NULL;

CREATE INDEX indexed_stat_facts_key_double_idx
    ON indexed_stat_facts (stat_key, value_double, replay_id)
    WHERE value_double IS NOT NULL;

CREATE INDEX indexed_stat_facts_key_int_idx
    ON indexed_stat_facts (stat_key, value_int, replay_id)
    WHERE value_int IS NOT NULL;

CREATE INDEX indexed_stat_facts_key_bool_idx
    ON indexed_stat_facts (stat_key, value_bool, replay_id)
    WHERE value_bool IS NOT NULL;

CREATE INDEX indexed_stat_facts_labels_gin_idx
    ON indexed_stat_facts USING gin (labels jsonb_path_ops);

CREATE TABLE mechanic_events (
    id uuid PRIMARY KEY,
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    index_profile_id uuid NOT NULL REFERENCES stat_index_profiles(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    mechanic text NOT NULL,
    detector text NOT NULL,
    player_id text,
    team integer,
    start_frame integer,
    end_frame integer,
    event_frame integer,
    start_time double precision,
    end_time double precision,
    event_time double precision,
    confidence double precision,
    reason text,
    payload jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (team IS NULL OR team IN (0, 1)),
    CHECK (start_frame IS NULL OR end_frame IS NULL OR end_frame >= start_frame),
    CHECK (start_time IS NULL OR end_time IS NULL OR end_time >= start_time),
    CHECK (confidence IS NULL OR (confidence >= 0.0 AND confidence <= 1.0)),
    CHECK (jsonb_typeof(payload) = 'object')
);

CREATE UNIQUE INDEX mechanic_events_identity_idx
    ON mechanic_events (
        analysis_run_id,
        index_profile_id,
        mechanic,
        detector,
        COALESCE(player_id, ''),
        COALESCE(event_frame, -1),
        md5(payload::text)
    );

CREATE INDEX mechanic_events_replay_profile_idx
    ON mechanic_events (replay_id, index_profile_id);

CREATE INDEX mechanic_events_mechanic_replay_idx
    ON mechanic_events (mechanic, replay_id);

CREATE INDEX mechanic_events_player_mechanic_idx
    ON mechanic_events (player_id, mechanic)
    WHERE player_id IS NOT NULL;

CREATE INDEX mechanic_events_confidence_idx
    ON mechanic_events (mechanic, confidence, replay_id)
    WHERE confidence IS NOT NULL;

CREATE INDEX mechanic_events_frame_span_idx
    ON mechanic_events (replay_id, start_frame, end_frame)
    WHERE start_frame IS NOT NULL AND end_frame IS NOT NULL;

CREATE TABLE replay_mechanic_rollups (
    id uuid PRIMARY KEY,
    analysis_run_id uuid NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    index_profile_id uuid NOT NULL REFERENCES stat_index_profiles(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    mechanic text NOT NULL,
    subject_kind text NOT NULL DEFAULT 'replay',
    subject_id text,
    event_count integer NOT NULL,
    max_confidence double precision,
    first_event_time double precision,
    last_event_time double precision,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (subject_kind IN ('replay', 'team', 'player')),
    CHECK (event_count >= 0),
    CHECK (max_confidence IS NULL OR (max_confidence >= 0.0 AND max_confidence <= 1.0)),
    CHECK (
        first_event_time IS NULL
        OR last_event_time IS NULL
        OR last_event_time >= first_event_time
    )
);

CREATE UNIQUE INDEX replay_mechanic_rollups_identity_idx
    ON replay_mechanic_rollups (
        analysis_run_id,
        index_profile_id,
        mechanic,
        subject_kind,
        COALESCE(subject_id, '')
    );

CREATE INDEX replay_mechanic_rollups_replay_profile_idx
    ON replay_mechanic_rollups (replay_id, index_profile_id);

CREATE INDEX replay_mechanic_rollups_count_idx
    ON replay_mechanic_rollups (mechanic, event_count, replay_id);
