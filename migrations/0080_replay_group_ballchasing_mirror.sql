-- A replay group can mirror a ballchasing.com group. The mirror is re-syncable:
-- `ballchasing_group_id` records which ballchasing group this group reflects,
-- and the sync columns track the latest run. Nested ballchasing subgroups are
-- mirrored as nested replay groups (see migration 0077), each keyed by its own
-- ballchasing group id.
ALTER TABLE replay_groups
    ADD COLUMN ballchasing_group_id text,
    ADD COLUMN ballchasing_synced_at timestamptz,
    ADD COLUMN ballchasing_sync_status text,
    ADD COLUMN ballchasing_sync_error text;

-- A given ballchasing group is mirrored by at most one replay group, so sync can
-- upsert subgroups by ballchasing id. Partial so ordinary (non-mirror) groups,
-- which leave the column NULL, are unconstrained.
CREATE UNIQUE INDEX replay_groups_ballchasing_group_id_key
    ON replay_groups (ballchasing_group_id)
    WHERE ballchasing_group_id IS NOT NULL;
