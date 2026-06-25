INSERT INTO player_replay_event_counts (
  analysis_run_id,
  replay_id,
  replay_player_id,
  player_subject_id,
  platform,
  platform_player_id,
  team,
  event_type_id,
  event_count
)
WITH counted_subjects AS (
  SELECT
    event.analysis_run_id,
    rp.replay_id,
    rp.id AS replay_player_id,
    rp.platform,
    rp.platform_player_id,
    rp.team,
    CASE
      WHEN source_event_type.key = 'demolition' AND subject.role = 'victim'
        THEN death_event_type.id
      ELSE event.event_type_id
    END AS event_type_id,
    event.id AS event_id
  FROM replay_players rp
  JOIN replays r
    ON r.id = rp.replay_id
  JOIN play_event_subjects subject
    ON subject.replay_player_id = rp.id
  JOIN play_events event
    ON event.id = subject.event_id
   AND event.analysis_run_id = r.canonical_analysis_run_id
  JOIN event_types source_event_type
    ON source_event_type.id = event.event_type_id
  JOIN event_types death_event_type
    ON death_event_type.key = 'death'
  WHERE r.canonical_analysis_run_id IS NOT NULL
    AND rp.platform IS NOT NULL
    AND btrim(rp.platform) <> ''
    AND rp.platform_player_id IS NOT NULL
    AND btrim(rp.platform_player_id) <> ''
    AND event.source_stream NOT IN (
      'positioning',
      'boost_state',
      'boost_ledger',
      'movement',
      'rotation_player',
      'rotation_role_span',
      'rotation_depth_span',
      'rotation_role',
      'ball_depth',
      'field_third',
      'field_half',
      'ball_proximity',
      'powerslide'
    )
    AND NOT (
      source_event_type.key = 'demolition'
      AND subject.role NOT IN ('attacker', 'victim')
    )
)
SELECT
  analysis_run_id,
  replay_id,
  (array_agg(replay_player_id))[1],
  concat(platform, ':', platform_player_id),
  platform,
  platform_player_id,
  MIN(team),
  event_type_id,
  COUNT(DISTINCT event_id)
FROM counted_subjects
GROUP BY analysis_run_id, replay_id, platform, platform_player_id, event_type_id
ON CONFLICT DO NOTHING;
