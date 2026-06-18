CREATE TEMP TABLE event_type_key_rewrites (
    old_key text PRIMARY KEY,
    new_key text NOT NULL
) ON COMMIT DROP;

INSERT INTO event_type_key_rewrites (old_key, new_key)
VALUES
    ('rotation_role_first_man', 'rotation_role'),
    ('rotation_role_second_man', 'rotation_role'),
    ('rotation_role_third_man', 'rotation_role'),
    ('rotation_role_ambiguous', 'rotation_role'),
    ('rotation_role_unknown', 'rotation_role'),
    ('ball_depth_behind_ball', 'ball_depth'),
    ('ball_depth_level_with_ball', 'ball_depth'),
    ('ball_depth_ahead_of_ball', 'ball_depth');

INSERT INTO event_types (
    key,
    display_name,
    category,
    description
)
VALUES
    ('rotation_role', 'Rotation Role', 'positioning', NULL),
    ('ball_depth', 'Ball Depth', 'positioning', NULL)
ON CONFLICT (key)
DO UPDATE SET
    display_name = EXCLUDED.display_name,
    category = EXCLUDED.category,
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
WHERE old_type.key = rewrite.old_key;
