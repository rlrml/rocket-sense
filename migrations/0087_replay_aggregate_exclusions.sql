ALTER TABLE replays
    ADD COLUMN exclude_from_aggregates boolean NOT NULL DEFAULT false,
    ADD COLUMN aggregate_exclusion_reason text;

ALTER TABLE replays
    ADD CONSTRAINT replays_aggregate_exclusion_reason_check
    CHECK (
        aggregate_exclusion_reason IS NULL
        OR aggregate_exclusion_reason IN ('player-left-or-inactive', 'missing-player-active-time')
    );

CREATE INDEX replays_aggregate_included_idx
    ON replays (created_at DESC, id DESC)
    WHERE NOT exclude_from_aggregates;

UPDATE replays r
SET exclude_from_aggregates = true,
    aggregate_exclusion_reason = CASE
        WHEN EXISTS (
            SELECT 1
            FROM replay_players rp
            WHERE rp.replay_id = r.id
              AND rp.active_time_seconds IS NULL
        )
        THEN 'missing-player-active-time'
        ELSE 'player-left-or-inactive'
    END,
    updated_at = now()
WHERE r.active_seconds IS NOT NULL
  AND r.active_seconds > 0.0
  AND EXISTS (
        SELECT 1
        FROM replay_players rp
        WHERE rp.replay_id = r.id
          AND (
              rp.active_time_seconds IS NULL
              OR GREATEST(r.active_seconds - rp.active_time_seconds, 0.0) >= 30.0
          )
      );
