-- Immutable, reproducible exports of human annotations for downstream
-- analysis and training. The annotation stream itself lives in object storage;
-- this table is its durable manifest and integrity record.
CREATE TABLE annotation_snapshots (
    id uuid PRIMARY KEY,
    schema_version text NOT NULL,
    cutoff_at timestamptz NOT NULL,
    created_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    annotation_count bigint NOT NULL,
    replay_count bigint NOT NULL,
    source_counts jsonb NOT NULL,
    label_counts jsonb NOT NULL,
    campaign_ids uuid[] NOT NULL DEFAULT '{}',
    object_key text NOT NULL UNIQUE,
    content_type text NOT NULL,
    byte_size bigint NOT NULL,
    sha256 text NOT NULL,
    storage_encoding text NOT NULL,
    storage_byte_size bigint NOT NULL,
    storage_sha256 text NOT NULL,
    created_at timestamptz NOT NULL,
    CHECK (schema_version <> ''),
    CHECK (annotation_count >= 0),
    CHECK (replay_count >= 0),
    CHECK (jsonb_typeof(source_counts) = 'object'),
    CHECK (jsonb_typeof(label_counts) = 'object'),
    CHECK (object_key <> ''),
    CHECK (content_type <> ''),
    CHECK (byte_size >= 0),
    CHECK (sha256 ~ '^[0-9a-f]{64}$'),
    CHECK (storage_encoding IN ('identity', 'gzip', 'zstd')),
    CHECK (storage_byte_size >= 0),
    CHECK (storage_sha256 ~ '^[0-9a-f]{64}$')
);

CREATE INDEX annotation_snapshots_created_idx
    ON annotation_snapshots (created_at DESC, id DESC);

COMMENT ON TABLE annotation_snapshots IS
    'Immutable manifests for versioned, object-storage-backed annotation snapshots.';
