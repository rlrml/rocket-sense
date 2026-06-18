ALTER TABLE player_identities
    ADD COLUMN public_display_name text,
    ADD COLUMN public_display_name_set_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    ADD COLUMN public_display_name_updated_at timestamptz,
    ADD CONSTRAINT player_identities_public_display_name_check
        CHECK (public_display_name IS NULL OR btrim(public_display_name) <> ''),
    ADD CONSTRAINT player_identities_public_display_name_setter_check
        CHECK (
            (public_display_name IS NULL AND public_display_name_set_by_user_id IS NULL AND public_display_name_updated_at IS NULL)
            OR (public_display_name IS NOT NULL AND public_display_name_set_by_user_id IS NOT NULL AND public_display_name_updated_at IS NOT NULL)
        );

CREATE TABLE player_identity_claims (
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform text NOT NULL,
    platform_player_id text NOT NULL,
    status text NOT NULL,
    verification_method text NOT NULL,
    evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
    verified_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, platform, platform_player_id),
    FOREIGN KEY (platform, platform_player_id)
        REFERENCES player_identities (platform, platform_player_id)
        ON DELETE CASCADE,
    CHECK (platform <> ''),
    CHECK (platform_player_id <> ''),
    CHECK (status IN ('verified', 'revoked', 'rejected')),
    CHECK (verification_method IN ('admin', 'uploader_replay_presence')),
    CHECK (jsonb_typeof(evidence) = 'object'),
    CHECK (
        (status = 'verified' AND verified_at IS NOT NULL)
        OR (status <> 'verified')
    )
);

CREATE INDEX player_identity_claims_identity_idx
    ON player_identity_claims (platform, platform_player_id, status);

CREATE INDEX player_identity_claims_user_status_idx
    ON player_identity_claims (user_id, status);
