DELETE FROM play_events event
USING event_types event_type
WHERE event.event_type_id = event_type.id
  AND (
      event.source_stream = 'touch_last_touch'
      OR event_type.key IN ('touch_last_touch', 'touch.last.touch')
  );

UPDATE event_reviews
SET reviewed_event_type_key = NULL
WHERE reviewed_event_type_key IN ('touch_last_touch', 'touch.last.touch');

DELETE FROM event_types
WHERE key IN ('touch_last_touch', 'touch.last.touch');
