-- Free-form, user-applied tags on detected events (and on arbitrary replay
-- moments). Unlike `event_reviews` — which carries the confirm/reject/correct
-- review verdict workflow with a fixed status enum — a tag is just a label a
-- user sticks on a moment ("missing_flip_reset", "good_demo_example", ...).
-- Its payoff is the machine-readable playlist export: filtering events by tag
-- yields replay id + frame/time window + subject, the exact shape needed to
-- author subtr-actor regression tests.
--
-- `event_id` is nullable so a tag can anchor to a moment the detector never
-- emitted (a "missed" moment), mirroring how `event_reviews` allows
-- detector-less reviews. `event_snapshot` captures the event's identity at tag
-- time (frames/times/subject/payload) so the export stays reproducible even if
-- the underlying analysis run is later replaced.
CREATE TABLE event_tags (
    id uuid PRIMARY KEY,
    event_id uuid REFERENCES play_events(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    tag text NOT NULL,
    tagger_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    event_frame integer,
    start_frame integer,
    end_frame integer,
    event_time double precision,
    notes text,
    context jsonb NOT NULL DEFAULT '{}'::jsonb,
    event_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (tag <> ''),
    CHECK (jsonb_typeof(context) = 'object'),
    CHECK (jsonb_typeof(event_snapshot) = 'object'),
    CHECK (start_frame IS NULL OR end_frame IS NULL OR end_frame >= start_frame)
);

-- One row per (event, tag, tagger): re-applying the same tag is idempotent
-- (ON CONFLICT DO UPDATE) rather than piling up duplicates. Partial index
-- because event_id is nullable for missed-moment tags.
CREATE UNIQUE INDEX event_tags_event_tag_user_uq
    ON event_tags (event_id, tag, tagger_user_id)
    WHERE event_id IS NOT NULL;

-- Primary access path: gather every event carrying a given tag (the export /
-- tag-filtered playlist).
CREATE INDEX event_tags_tag_idx ON event_tags (tag);

-- Secondary: surface a replay's tags and support the per-event `tags` lookup.
CREATE INDEX event_tags_event_id_idx ON event_tags (event_id) WHERE event_id IS NOT NULL;
CREATE INDEX event_tags_replay_id_idx ON event_tags (replay_id);
