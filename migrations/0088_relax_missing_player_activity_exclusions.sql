UPDATE replays r
SET exclude_from_aggregates = EXISTS (
        SELECT 1
        FROM replay_players rp
        WHERE rp.replay_id = r.id
          AND rp.active_time_seconds IS NOT NULL
          AND GREATEST(r.active_seconds - rp.active_time_seconds, 0.0) >= 30.0
    ),
    aggregate_exclusion_reason = CASE
        WHEN EXISTS (
            SELECT 1
            FROM replay_players rp
            WHERE rp.replay_id = r.id
              AND rp.active_time_seconds IS NOT NULL
              AND GREATEST(r.active_seconds - rp.active_time_seconds, 0.0) >= 30.0
        )
        THEN 'player-left-or-inactive'
        ELSE NULL
    END,
    updated_at = now()
WHERE r.aggregate_exclusion_reason = 'missing-player-active-time'
  AND r.active_seconds IS NOT NULL
  AND r.active_seconds > 0.0;
