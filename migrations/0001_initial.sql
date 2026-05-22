CREATE TABLE users (
    id uuid PRIMARY KEY,
    primary_email text,
    display_name text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE auth_identities (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    issuer text NOT NULL,
    subject text NOT NULL,
    provider_name text NOT NULL,
    email text,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (issuer, subject)
);

CREATE INDEX auth_identities_user_id_idx
    ON auth_identities (user_id);

CREATE TABLE projects (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    created_by_user_id uuid REFERENCES users(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE project_memberships (
    project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (project_id, user_id),
    CHECK (role IN ('owner', 'admin', 'annotator', 'reviewer', 'viewer'))
);

CREATE TABLE replays (
    id uuid PRIMARY KEY,
    project_id uuid REFERENCES projects(id),
    uploaded_by_user_id uuid REFERENCES users(id),
    file_sha256 text NOT NULL UNIQUE,
    original_file_name text,
    byte_size bigint NOT NULL,
    storage_key text NOT NULL,
    external_replay_id text,
    parse_status text NOT NULL DEFAULT 'pending',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX replays_external_replay_id_idx
    ON replays (external_replay_id)
    WHERE external_replay_id IS NOT NULL;

CREATE INDEX replays_project_id_idx
    ON replays (project_id);

CREATE INDEX replays_uploaded_by_user_id_idx
    ON replays (uploaded_by_user_id);

CREATE TABLE replay_objects (
    id uuid PRIMARY KEY,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    kind text NOT NULL,
    storage_key text NOT NULL,
    content_type text,
    byte_size bigint NOT NULL,
    sha256 text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX replay_objects_replay_kind_key_idx
    ON replay_objects (replay_id, kind, storage_key);

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
    created_by_user_id uuid REFERENCES users(id),
    supersedes_annotation_id uuid REFERENCES annotations(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (frame_end >= frame_start)
);

CREATE INDEX annotations_replay_span_idx
    ON annotations (replay_id, frame_start, frame_end);
