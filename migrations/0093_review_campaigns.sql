-- Review campaigns organize a human labeling effort: a question ("Was this
-- player genuinely challenging for the ball?"), a curated candidate set
-- imported from a subtr-actor-emitted review playlist, per-reviewer labels,
-- and JSONL export for training.
--
-- Unlike `event_reviews` — which anchors verdicts to detected `play_events`
-- rows that are replaced on every detector re-run — campaign items are keyed
-- by a *content-derived* candidate key (`<sha12>:<event_type>:<frame>:<player>`
-- carried in the imported item's meta.eventId), so labels survive detector
-- re-runs. Only the curated slice lives in the DB (a few hundred ~1KB JSONB
-- rows per campaign); the bulky candidate universe stays in object storage /
-- the subtr-actor tools flat-file flow.
CREATE TABLE review_campaigns (
    id uuid PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    question text NOT NULL,
    description text,
    -- Array of {key, status, label} decision options presented to reviewers.
    -- The default vocabulary is confirmed / rejected / uncertain /
    -- bad_candidate, but a campaign may define its own answer set.
    decision_vocabulary jsonb NOT NULL,
    -- Provenance snapshot from import: source playlist label / meta, counts.
    generator jsonb NOT NULL DEFAULT '{}'::jsonb,
    status text NOT NULL DEFAULT 'active',
    labels_per_item int NOT NULL DEFAULT 1,
    created_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (slug <> ''),
    CHECK (title <> ''),
    CHECK (question <> ''),
    CHECK (status IN ('draft', 'active', 'complete', 'archived')),
    CHECK (labels_per_item >= 1),
    CHECK (jsonb_typeof(decision_vocabulary) = 'array'),
    CHECK (jsonb_typeof(generator) = 'object')
);

COMMENT ON TABLE review_campaigns IS
    'A human labeling effort: a question over a curated, content-keyed candidate set imported from a subtr-actor review playlist.';

-- The curated candidate slice for one campaign, in playlist order. The
-- candidate_key is the content-derived identity (imported meta.eventId);
-- item_meta stores the imported item meta verbatim (payload, provenance,
-- target frame/time, ...), so exports are self-contained.
CREATE TABLE review_campaign_items (
    id uuid PRIMARY KEY,
    campaign_id uuid NOT NULL REFERENCES review_campaigns(id) ON DELETE CASCADE,
    candidate_key text NOT NULL,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    position int NOT NULL,
    label text,
    start_time double precision NOT NULL,
    end_time double precision NOT NULL,
    perspective jsonb,
    item_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (campaign_id, candidate_key),
    CHECK (candidate_key <> ''),
    CHECK (position >= 0),
    CHECK (end_time >= start_time),
    CHECK (jsonb_typeof(item_meta) = 'object')
);

COMMENT ON TABLE review_campaign_items IS
    'Curated candidates for a review campaign, keyed by content-derived candidate_key so labels survive detector re-runs.';

-- Serve the campaign playlist (and progress joins) in stored order.
CREATE INDEX review_campaign_items_campaign_position_idx
    ON review_campaign_items (campaign_id, position);

-- One label per (item, reviewer): relabeling upserts, replacing the status and
-- bumping updated_at. Labels are the small, precious, multi-user artifact this
-- schema exists to protect.
CREATE TABLE review_campaign_labels (
    id uuid PRIMARY KEY,
    campaign_id uuid NOT NULL REFERENCES review_campaigns(id) ON DELETE CASCADE,
    item_id uuid NOT NULL REFERENCES review_campaign_items(id) ON DELETE CASCADE,
    reviewer_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status text NOT NULL,
    notes text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (item_id, reviewer_user_id),
    CHECK (status <> '')
);

COMMENT ON TABLE review_campaign_labels IS
    'Per-reviewer decisions on campaign items; one row per (item, reviewer), upserted on relabel.';

-- Progress queries: campaign-wide label counts / distinct labeled items, and
-- a reviewer's own progress ("what have I already labeled?") which also backs
-- the playlist's default skip-already-labeled behavior.
CREATE INDEX review_campaign_labels_campaign_idx
    ON review_campaign_labels (campaign_id);
CREATE INDEX review_campaign_labels_campaign_reviewer_idx
    ON review_campaign_labels (campaign_id, reviewer_user_id);
