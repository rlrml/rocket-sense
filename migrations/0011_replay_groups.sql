CREATE TABLE replay_groups (
    id uuid PRIMARY KEY,
    project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    created_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (btrim(name) <> '')
);

CREATE INDEX replay_groups_project_id_idx
    ON replay_groups (project_id)
    WHERE project_id IS NOT NULL;

CREATE INDEX replay_groups_created_by_user_id_idx
    ON replay_groups (created_by_user_id)
    WHERE created_by_user_id IS NOT NULL;

CREATE TABLE replay_group_replays (
    group_id uuid NOT NULL REFERENCES replay_groups(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    added_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (group_id, replay_id)
);

CREATE INDEX replay_group_replays_replay_id_idx
    ON replay_group_replays (replay_id);
