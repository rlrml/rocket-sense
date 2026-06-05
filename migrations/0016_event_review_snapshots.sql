ALTER TABLE event_reviews
    ADD COLUMN event_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
    ADD CONSTRAINT event_reviews_event_snapshot_object_check
        CHECK (jsonb_typeof(event_snapshot) = 'object');

WITH review_snapshots AS (
    SELECT
        review.id AS review_id,
        event_type.key AS event_type_key,
        event.primary_subject_kind,
        event.primary_subject_id,
        event.start_frame,
        event.end_frame,
        event.event_frame,
        event.confidence,
        jsonb_strip_nulls(jsonb_build_object(
            'id', event.id,
            'analysisRunId', event.analysis_run_id,
            'replayId', event.replay_id,
            'eventType', jsonb_build_object(
                'key', event_type.key,
                'displayName', event_type.display_name,
                'category', event_type.category
            ),
            'source', event.source,
            'sourceStream', event.source_stream,
            'sourceIndex', event.source_index,
            'sourceEventId', event.source_event_id,
            'primarySubject', CASE
                WHEN event.primary_subject_kind IS NULL THEN NULL
                ELSE jsonb_build_object(
                    'kind', event.primary_subject_kind,
                    'id', event.primary_subject_id
                )
            END,
            'team', event.team,
            'frames', jsonb_strip_nulls(jsonb_build_object(
                'start', event.start_frame,
                'end', event.end_frame,
                'event', event.event_frame
            )),
            'times', jsonb_strip_nulls(jsonb_build_object(
                'start', event.start_time,
                'end', event.end_time,
                'event', event.event_time,
                'duration', event.duration_seconds
            )),
            'confidence', event.confidence,
            'payload', COALESCE(payload.payload, '{}'::jsonb),
            'attributes', COALESCE(attributes.attributes, '{}'::jsonb),
            'mechanicDetails', CASE
                WHEN mechanic_detail.event_id IS NULL THEN NULL
                ELSE jsonb_build_object(
                    'mechanic', mechanic_detail.mechanic,
                    'properties', mechanic_detail.properties
                )
            END,
            'createdAt', event.created_at
        )) AS event_snapshot
    FROM event_reviews review
    JOIN play_events event
      ON event.id = review.event_id
    JOIN event_types event_type
      ON event_type.id = event.event_type_id
    LEFT JOIN play_event_payloads payload
      ON payload.event_id = event.id
    LEFT JOIN play_event_attributes attributes
      ON attributes.event_id = event.id
    LEFT JOIN play_event_mechanic_details mechanic_detail
      ON mechanic_detail.event_id = event.id
)
UPDATE event_reviews review
SET
    reviewed_event_type_key = COALESCE(review.reviewed_event_type_key, snapshot.event_type_key),
    reviewed_subject_kind = COALESCE(review.reviewed_subject_kind, snapshot.primary_subject_kind),
    reviewed_subject_id = COALESCE(review.reviewed_subject_id, snapshot.primary_subject_id),
    reviewed_start_frame = COALESCE(review.reviewed_start_frame, snapshot.start_frame),
    reviewed_end_frame = COALESCE(review.reviewed_end_frame, snapshot.end_frame),
    reviewed_event_frame = COALESCE(review.reviewed_event_frame, snapshot.event_frame),
    confidence = COALESCE(review.confidence, snapshot.confidence),
    event_snapshot = snapshot.event_snapshot
FROM review_snapshots snapshot
WHERE review.id = snapshot.review_id;

ALTER TABLE event_reviews
    DROP CONSTRAINT IF EXISTS event_reviews_event_id_fkey,
    ALTER COLUMN event_id DROP NOT NULL,
    ADD CONSTRAINT event_reviews_event_id_fkey
        FOREIGN KEY (event_id) REFERENCES play_events(id) ON DELETE SET NULL;

CREATE INDEX event_reviews_replay_created_idx
    ON event_reviews (replay_id, created_at DESC);
