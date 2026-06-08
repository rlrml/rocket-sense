CREATE TEMP TABLE event_type_key_rewrites (
    old_key text PRIMARY KEY,
    new_key text NOT NULL
) ON COMMIT DROP;

INSERT INTO event_type_key_rewrites (old_key, new_key)
VALUES
    ('mechanic.center', 'center');

INSERT INTO event_types (
    key,
    display_name,
    category,
    description
)
SELECT DISTINCT ON (rewrite.new_key)
    rewrite.new_key,
    old_type.display_name,
    old_type.category,
    old_type.description
FROM event_type_key_rewrites rewrite
JOIN event_types old_type
  ON old_type.key = rewrite.old_key
ORDER BY rewrite.new_key, old_type.created_at
ON CONFLICT (key)
DO UPDATE SET
    updated_at = now();

UPDATE event_reviews review
SET reviewed_event_type_key = rewrite.new_key
FROM event_type_key_rewrites rewrite
WHERE review.reviewed_event_type_key = rewrite.old_key;

UPDATE play_events event
SET event_type_id = new_type.id
FROM event_types old_type
JOIN event_type_key_rewrites rewrite
  ON rewrite.old_key = old_type.key
JOIN event_types new_type
  ON new_type.key = rewrite.new_key
WHERE event.event_type_id = old_type.id
  AND event.event_type_id <> new_type.id;

DELETE FROM event_types old_type
USING event_type_key_rewrites rewrite
WHERE old_type.key = rewrite.old_key
  AND old_type.key <> rewrite.new_key;
