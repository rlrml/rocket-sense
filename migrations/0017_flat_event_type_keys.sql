CREATE TEMP TABLE event_type_key_rewrites (
    old_key text PRIMARY KEY,
    new_key text NOT NULL
) ON COMMIT DROP;

INSERT INTO event_type_key_rewrites (old_key, new_key)
VALUES
    ('ball.carry', 'ball_carry'),
    ('ball.touch', 'touch'),
    ('boost.ledger.collected', 'boost_ledger_collected'),
    ('boost.ledger.overfill', 'boost_ledger_overfill'),
    ('boost.ledger.respawn', 'boost_ledger_respawn'),
    ('boost.ledger.stolen', 'boost_ledger_stolen'),
    ('boost.ledger.used', 'boost_ledger_used'),
    ('boost.ledger.used_allocation', 'boost_ledger_used_allocation'),
    ('boost.pickup.both', 'boost_pickup_both'),
    ('boost.pickup.ghost', 'boost_pickup_ghost'),
    ('boost.pickup.missed', 'boost_pickup_missed'),
    ('boost.state', 'boost_state'),
    ('ceiling.shot', 'ceiling_shot'),
    ('core.assist', 'assist'),
    ('core.death', 'death'),
    ('core.goal', 'goal'),
    ('core.kill', 'kill'),
    ('core.player', 'player'),
    ('core.player.goal.context', 'core_player_goal_context'),
    ('core.save', 'save'),
    ('core.shot', 'shot'),
    ('dodge.reset', 'dodge_reset'),
    ('double.tap', 'double_tap'),
    ('fifty.fifty', 'fifty_fifty'),
    ('flip.impulse', 'flip_impulse'),
    ('goal.context', 'goal_context'),
    ('goal_tag.aerial_goal', 'goal_tag_aerial_goal'),
    ('goal_tag.air_dribble_goal', 'goal_tag_air_dribble_goal'),
    ('goal_tag.bump_goal', 'goal_tag_bump_goal'),
    ('goal_tag.counter_attack_goal', 'goal_tag_counter_attack_goal'),
    ('goal_tag.double_tap_goal', 'goal_tag_double_tap_goal'),
    ('goal_tag.empty_net_goal', 'goal_tag_empty_net_goal'),
    ('goal_tag.flick_goal', 'goal_tag_flick_goal'),
    ('goal_tag.flip_reset_goal', 'goal_tag_flip_reset_goal'),
    ('goal_tag.half_volley_goal', 'goal_tag_half_volley_goal'),
    ('goal_tag.high_aerial_goal', 'goal_tag_high_aerial_goal'),
    ('goal_tag.long_distance_goal', 'goal_tag_long_distance_goal'),
    ('goal_tag.one_timer_goal', 'goal_tag_one_timer_goal'),
    ('goal_tag.own_half_goal', 'goal_tag_own_half_goal'),
    ('goal_tag.passing_goal', 'goal_tag_passing_goal'),
    ('half.flip', 'half_flip'),
    ('half.volley', 'half_volley'),
    ('mechanic.air_dribble', 'air_dribble'),
    ('mechanic.ball_carry', 'ball_carry'),
    ('mechanic.ceiling_shot', 'ceiling_shot'),
    ('mechanic.double_tap', 'double_tap'),
    ('mechanic.flick', 'flick'),
    ('mechanic.flip_reset', 'flip_reset'),
    ('mechanic.half_flip', 'half_flip'),
    ('mechanic.half_volley', 'half_volley'),
    ('mechanic.musty_flick', 'musty_flick'),
    ('mechanic.one_timer', 'one_timer'),
    ('mechanic.pass', 'pass'),
    ('mechanic.speed_flip', 'speed_flip'),
    ('mechanic.wavedash', 'wavedash'),
    ('musty.flick', 'musty_flick'),
    ('one.timer', 'one_timer'),
    ('pass.last_completed', 'pass_last_completed'),
    ('rotation.depth.ahead_of_play', 'rotation_depth_ahead_of_play'),
    ('rotation.depth.behind_play', 'rotation_depth_behind_play'),
    ('rotation.depth.level_with_play', 'rotation_depth_level_with_play'),
    ('rotation.depth.unknown', 'rotation_depth_unknown'),
    ('rotation.first_man_stint', 'rotation_first_man_stint'),
    ('rotation.player_state_span', 'rotation_player_state_span'),
    ('rotation.role.ambiguous', 'rotation_role_ambiguous'),
    ('rotation.role.first_man', 'rotation_role_first_man'),
    ('rotation.role.second_man', 'rotation_role_second_man'),
    ('rotation.role.third_man', 'rotation_role_third_man'),
    ('rotation.role.unknown', 'rotation_role_unknown'),
    ('rotation.team', 'rotation_team'),
    ('speed.flip', 'speed_flip'),
    ('territorial.pressure', 'territorial_pressure'),
    ('touch.ball.movement', 'touch_ball_movement'),
    ('touch.last.touch', 'touch_last_touch'),
    ('wall.aerial', 'wall_aerial'),
    ('wall.aerial.shot', 'wall_aerial_shot');

INSERT INTO event_types (
    key,
    display_name,
    category,
    description
)
SELECT DISTINCT ON (rewrite.new_key)
    rewrite.new_key,
    old_type.display_name,
    'event',
    old_type.description
FROM event_type_key_rewrites rewrite
JOIN event_types old_type
  ON old_type.key = rewrite.old_key
ORDER BY rewrite.new_key, old_type.created_at
ON CONFLICT (key)
DO UPDATE SET
    category = 'event',
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

UPDATE event_types
SET
    category = 'event',
    updated_at = now()
WHERE category <> 'event';
