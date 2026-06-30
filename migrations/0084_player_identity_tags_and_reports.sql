CREATE TABLE player_identity_tags (
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    tag text NOT NULL,
    exclude_from_aggregates boolean NOT NULL DEFAULT false,
    note text,
    created_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (platform, platform_player_id, tag),
    FOREIGN KEY (platform, platform_player_id)
        REFERENCES player_identities (platform, platform_player_id)
        ON DELETE CASCADE,
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (tag = lower(tag)),
    CHECK (tag ~ '^[a-z][a-z0-9_-]*$'),
    CHECK (note IS NULL OR btrim(note) <> '')
);

CREATE INDEX player_identity_tags_exclude_aggregates_idx
    ON player_identity_tags (platform, platform_player_id)
    WHERE exclude_from_aggregates;

CREATE TABLE player_identity_reports (
    id uuid PRIMARY KEY,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    report_type text NOT NULL,
    reported_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    note text,
    status text NOT NULL DEFAULT 'pending',
    reviewed_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    review_note text,
    reviewed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    FOREIGN KEY (platform, platform_player_id)
        REFERENCES player_identities (platform, platform_player_id)
        ON DELETE CASCADE,
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (report_type = lower(report_type)),
    CHECK (report_type ~ '^[a-z][a-z0-9_-]*$'),
    CHECK (note IS NULL OR btrim(note) <> ''),
    CHECK (review_note IS NULL OR btrim(review_note) <> ''),
    CHECK (status IN ('pending', 'accepted', 'dismissed')),
    CHECK (
        (status = 'pending' AND reviewed_by_user_id IS NULL AND reviewed_at IS NULL)
        OR (status <> 'pending' AND reviewed_by_user_id IS NOT NULL AND reviewed_at IS NOT NULL)
    )
);

CREATE UNIQUE INDEX player_identity_reports_one_pending_per_user_idx
    ON player_identity_reports (reported_by_user_id, platform, platform_player_id, report_type)
    WHERE status = 'pending' AND reported_by_user_id IS NOT NULL;

CREATE INDEX player_identity_reports_admin_queue_idx
    ON player_identity_reports (status, report_type, created_at DESC);

CREATE INDEX player_identity_reports_identity_idx
    ON player_identity_reports (platform, platform_player_id, report_type, created_at DESC);
