CREATE TABLE replay_external_sources (
    id uuid PRIMARY KEY,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    source text NOT NULL,
    external_id text NOT NULL,
    created_by_user_id uuid REFERENCES users(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (source, external_id),
    UNIQUE (replay_id, source, external_id)
);

CREATE INDEX replay_external_sources_replay_id_idx
    ON replay_external_sources (replay_id);
