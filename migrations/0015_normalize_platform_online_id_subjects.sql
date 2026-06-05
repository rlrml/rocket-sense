WITH normalized_primary_subjects AS (
    SELECT
        event.id,
        normalized.subject_id
    FROM play_events event
    JOIN play_event_payloads payload
      ON payload.event_id = event.id
    JOIN LATERAL (
        SELECT candidate.platform || ':' || jsonb_extract_path_text(
            payload.payload,
            candidate.field_name,
            candidate.variant_name,
            'online_id'
        ) AS subject_id
        FROM (
            VALUES
                (1, 'player', 'PlayStation', 'ps4'),
                (2, 'player_id', 'PlayStation', 'ps4'),
                (3, 'scorer', 'PlayStation', 'ps4'),
                (4, 'initiator', 'PlayStation', 'ps4'),
                (5, 'victim', 'PlayStation', 'ps4'),
                (6, 'attacker', 'PlayStation', 'ps4'),
                (1, 'player', 'PsyNet', 'psynet'),
                (2, 'player_id', 'PsyNet', 'psynet'),
                (3, 'scorer', 'PsyNet', 'psynet'),
                (4, 'initiator', 'PsyNet', 'psynet'),
                (5, 'victim', 'PsyNet', 'psynet'),
                (6, 'attacker', 'PsyNet', 'psynet'),
                (1, 'player', 'Switch', 'switch'),
                (2, 'player_id', 'Switch', 'switch'),
                (3, 'scorer', 'Switch', 'switch'),
                (4, 'initiator', 'Switch', 'switch'),
                (5, 'victim', 'Switch', 'switch'),
                (6, 'attacker', 'Switch', 'switch')
        ) AS candidate(priority, field_name, variant_name, platform)
        WHERE event.primary_subject_id LIKE candidate.platform || ':{%'
          AND jsonb_extract_path_text(
              payload.payload,
              candidate.field_name,
              candidate.variant_name,
              'online_id'
          ) IS NOT NULL
        ORDER BY candidate.priority
        LIMIT 1
    ) normalized ON TRUE
    WHERE event.primary_subject_kind = 'player'
)
UPDATE play_events event
SET primary_subject_id = normalized.subject_id
FROM normalized_primary_subjects normalized
WHERE event.id = normalized.id
  AND event.primary_subject_id <> normalized.subject_id
  AND NOT EXISTS (
      SELECT 1
      FROM play_events existing
      WHERE existing.id <> event.id
        AND existing.analysis_run_id = event.analysis_run_id
        AND existing.event_type_id = event.event_type_id
        AND existing.source = event.source
        AND existing.source_stream = event.source_stream
        AND existing.source_index = event.source_index
        AND COALESCE(existing.source_event_id, '') = COALESCE(event.source_event_id, '')
        AND COALESCE(existing.primary_subject_kind, '') = COALESCE(event.primary_subject_kind, '')
        AND COALESCE(existing.primary_subject_id, '') = normalized.subject_id
        AND COALESCE(existing.start_frame, -1) = COALESCE(event.start_frame, -1)
        AND COALESCE(existing.end_frame, -1) = COALESCE(event.end_frame, -1)
        AND COALESCE(existing.event_frame, -1) = COALESCE(event.event_frame, -1)
  );

WITH normalized_subjects AS (
    SELECT
        subject.event_id,
        subject.subject_kind,
        subject.subject_id AS old_subject_id,
        subject.role,
        normalized.subject_id AS normalized_subject_id
    FROM play_event_subjects subject
    JOIN play_event_payloads payload
      ON payload.event_id = subject.event_id
    JOIN LATERAL (
        SELECT candidate.platform || ':' || jsonb_extract_path_text(
            payload.payload,
            candidate.field_name,
            candidate.variant_name,
            'online_id'
        ) AS subject_id
        FROM (
            VALUES
                (1, 'player', 'actor', 'PlayStation', 'ps4'),
                (2, 'player_id', 'actor', 'PlayStation', 'ps4'),
                (3, 'scorer', 'scorer', 'PlayStation', 'ps4'),
                (4, 'initiator', 'initiator', 'PlayStation', 'ps4'),
                (5, 'victim', 'victim', 'PlayStation', 'ps4'),
                (6, 'attacker', 'attacker', 'PlayStation', 'ps4'),
                (1, 'player', 'actor', 'PsyNet', 'psynet'),
                (2, 'player_id', 'actor', 'PsyNet', 'psynet'),
                (3, 'scorer', 'scorer', 'PsyNet', 'psynet'),
                (4, 'initiator', 'initiator', 'PsyNet', 'psynet'),
                (5, 'victim', 'victim', 'PsyNet', 'psynet'),
                (6, 'attacker', 'attacker', 'PsyNet', 'psynet'),
                (1, 'player', 'actor', 'Switch', 'switch'),
                (2, 'player_id', 'actor', 'Switch', 'switch'),
                (3, 'scorer', 'scorer', 'Switch', 'switch'),
                (4, 'initiator', 'initiator', 'Switch', 'switch'),
                (5, 'victim', 'victim', 'Switch', 'switch'),
                (6, 'attacker', 'attacker', 'Switch', 'switch')
        ) AS candidate(priority, field_name, role, variant_name, platform)
        WHERE subject.role = candidate.role
          AND subject.subject_id LIKE candidate.platform || ':{%'
          AND jsonb_extract_path_text(
              payload.payload,
              candidate.field_name,
              candidate.variant_name,
              'online_id'
          ) IS NOT NULL
        ORDER BY candidate.priority
        LIMIT 1
    ) normalized ON TRUE
    WHERE subject.subject_kind = 'player'
)
UPDATE play_event_subjects subject
SET subject_id = normalized.normalized_subject_id
FROM normalized_subjects normalized
WHERE subject.event_id = normalized.event_id
  AND subject.subject_kind = normalized.subject_kind
  AND subject.subject_id = normalized.old_subject_id
  AND subject.role = normalized.role
  AND subject.subject_id <> normalized.normalized_subject_id
  AND NOT EXISTS (
      SELECT 1
      FROM play_event_subjects existing
      WHERE existing.event_id = subject.event_id
        AND existing.subject_kind = subject.subject_kind
        AND existing.subject_id = normalized.normalized_subject_id
        AND existing.role = subject.role
  );

UPDATE play_event_subjects subject
SET replay_player_id = replay_player.id
FROM play_events event
JOIN replay_players replay_player
  ON replay_player.replay_id = event.replay_id
 AND replay_player.platform IS NOT NULL
 AND replay_player.platform_player_id IS NOT NULL
WHERE subject.event_id = event.id
  AND subject.subject_kind = 'player'
  AND replay_player.platform || ':' || replay_player.platform_player_id = subject.subject_id
  AND subject.replay_player_id IS DISTINCT FROM replay_player.id;
