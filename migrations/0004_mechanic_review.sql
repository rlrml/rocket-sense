ALTER TABLE mechanic_events
    ADD COLUMN detector_version text,
    ADD COLUMN subject_kind text NOT NULL DEFAULT 'player',
    ADD COLUMN subject_id text,
    ADD COLUMN severity double precision,
    ADD COLUMN stable_fingerprint text;

ALTER TABLE mechanic_events
    ADD CONSTRAINT mechanic_events_subject_kind_check
    CHECK (subject_kind IN ('replay', 'team', 'player', 'ball', 'segment'));

ALTER TABLE mechanic_events
    ADD CONSTRAINT mechanic_events_event_frame_start_check
    CHECK (event_frame IS NULL OR start_frame IS NULL OR event_frame >= start_frame);

ALTER TABLE mechanic_events
    ADD CONSTRAINT mechanic_events_event_frame_end_check
    CHECK (event_frame IS NULL OR end_frame IS NULL OR event_frame <= end_frame);

CREATE INDEX mechanic_events_subject_mechanic_idx
    ON mechanic_events (subject_kind, subject_id, mechanic)
    WHERE subject_id IS NOT NULL;

CREATE INDEX mechanic_events_event_frame_idx
    ON mechanic_events (replay_id, event_frame)
    WHERE event_frame IS NOT NULL;

CREATE INDEX mechanic_events_stable_fingerprint_idx
    ON mechanic_events (stable_fingerprint)
    WHERE stable_fingerprint IS NOT NULL;

CREATE INDEX mechanic_events_payload_gin_idx
    ON mechanic_events USING gin (payload jsonb_path_ops);

CREATE TABLE mechanic_event_reviews (
    id uuid PRIMARY KEY,
    mechanic_event_id uuid NOT NULL REFERENCES mechanic_events(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    reviewer_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    status text NOT NULL,
    reviewed_mechanic text,
    reviewed_subject_kind text,
    reviewed_subject_id text,
    reviewed_start_frame integer,
    reviewed_end_frame integer,
    reviewed_event_frame integer,
    confidence double precision,
    notes text,
    supersedes_review_id uuid REFERENCES mechanic_event_reviews(id),
    source_review_id uuid REFERENCES mechanic_event_reviews(id),
    carry_forward_method text,
    carry_forward_distance_frames integer,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (status IN ('confirmed', 'rejected', 'corrected', 'uncertain', 'needs_second_review')),
    CHECK (
        reviewed_subject_kind IS NULL
        OR reviewed_subject_kind IN ('replay', 'team', 'player', 'ball', 'segment')
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

CREATE INDEX mechanic_event_reviews_event_created_idx
    ON mechanic_event_reviews (mechanic_event_id, created_at DESC);

CREATE INDEX mechanic_event_reviews_reviewer_created_idx
    ON mechanic_event_reviews (reviewer_user_id, created_at DESC)
    WHERE reviewer_user_id IS NOT NULL;

CREATE INDEX mechanic_event_reviews_status_idx
    ON mechanic_event_reviews (status, created_at DESC);

CREATE TABLE mechanic_review_playlists (
    id uuid PRIMARY KEY,
    project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    query jsonb NOT NULL,
    created_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (jsonb_typeof(query) = 'object')
);

CREATE INDEX mechanic_review_playlists_project_id_idx
    ON mechanic_review_playlists (project_id)
    WHERE project_id IS NOT NULL;
