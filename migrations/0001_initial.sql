CREATE TABLE replays (
    id uuid PRIMARY KEY,
    file_sha256 text NOT NULL UNIQUE,
    original_file_name text,
    byte_size bigint NOT NULL,
    storage_backend text NOT NULL,
    storage_key text NOT NULL,
    external_replay_id text,
    parse_status text NOT NULL DEFAULT 'pending',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX replays_external_replay_id_idx
    ON replays (external_replay_id)
    WHERE external_replay_id IS NOT NULL;

CREATE TABLE replay_objects (
    id uuid PRIMARY KEY,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    kind text NOT NULL,
    storage_backend text NOT NULL,
    storage_key text NOT NULL,
    content_type text,
    byte_size bigint NOT NULL,
    sha256 text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX replay_objects_replay_kind_key_idx
    ON replay_objects (replay_id, kind, storage_backend, storage_key);

CREATE TABLE annotation_schemas (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    version integer NOT NULL,
    schema jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (name, version)
);

CREATE TABLE annotations (
    id uuid PRIMARY KEY,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    schema_id uuid REFERENCES annotation_schemas(id),
    source text NOT NULL,
    subject_kind text NOT NULL,
    subject_id text,
    frame_start integer NOT NULL,
    frame_end integer NOT NULL,
    label text NOT NULL,
    payload jsonb NOT NULL DEFAULT '{}'::jsonb,
    confidence double precision,
    supersedes_annotation_id uuid REFERENCES annotations(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (frame_end >= frame_start)
);

CREATE INDEX annotations_replay_span_idx
    ON annotations (replay_id, frame_start, frame_end);
