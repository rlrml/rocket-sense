-- Additional users who may administer a replay group alongside its creator.
--
-- The group creator (replay_groups.created_by_user_id) always retains
-- management rights and is NOT stored here, so a creator can never be removed
-- by a co-manager. Presence of a row grants full (flat) management rights:
-- the same actions the creator can perform, including inviting and removing
-- other managers.
CREATE TABLE replay_group_managers (
    group_id uuid NOT NULL REFERENCES replay_groups(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    added_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (group_id, user_id)
);

CREATE INDEX replay_group_managers_user_id_idx
    ON replay_group_managers (user_id);
