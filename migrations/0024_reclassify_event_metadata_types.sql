UPDATE event_types
SET
    category = 'context',
    updated_at = now()
WHERE key IN (
    'core_player',
    'core_player_goal_context',
    'core_player_scoreboard',
    'goal_context',
    'player'
)
  AND category <> 'context';

UPDATE event_types
SET
    category = 'other',
    updated_at = now()
WHERE key IN ('touch', 'touch_ball_movement', 'whiff')
  AND category <> 'other';
