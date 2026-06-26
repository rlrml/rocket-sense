-- Allow replay groups to nest inside one another so a parent (non-leaf) group
-- can aggregate stats across every replay in its descendant leaf groups.
ALTER TABLE replay_groups
    ADD COLUMN parent_group_id uuid REFERENCES replay_groups(id) ON DELETE CASCADE;

-- A group cannot be its own parent. Deeper cycles are prevented in the API layer
-- (a group may not be reparented under one of its own descendants); the subtree
-- queries also use UNION (not UNION ALL) so any stray cycle still terminates.
ALTER TABLE replay_groups
    ADD CONSTRAINT replay_groups_parent_not_self
    CHECK (parent_group_id IS NULL OR parent_group_id <> id);

CREATE INDEX replay_groups_parent_group_id_idx
    ON replay_groups (parent_group_id)
    WHERE parent_group_id IS NOT NULL;
