-- subtr-actor#138 removed the per-player core_player_goal_context timeline
-- event (its data lives on the canonical goal_context event's per-player
-- entries), so newly processed replays no longer emit it. Drop the stale
-- indexed events and the event type itself.

DELETE FROM play_events event
USING event_types event_type
WHERE event.event_type_id = event_type.id
  AND (
      event.source_stream = 'core_player_goal_context'
      OR event_type.key IN ('core_player_goal_context', 'core.player.goal.context')
  );

UPDATE event_reviews
SET reviewed_event_type_key = NULL
WHERE reviewed_event_type_key IN ('core_player_goal_context', 'core.player.goal.context');

DELETE FROM event_types
WHERE key IN ('core_player_goal_context', 'core.player.goal.context');
