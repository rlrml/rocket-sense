-- Provenance for analysis runs produced from a client-submitted (browser WASM)
-- stats-timeline scaffold. `source` distinguishes server-produced runs from
-- trusted client reprocesses; `submitted_by_user_id` records the trusted user
-- (replay owner or admin) who uploaded the scaffold; `client_subtr_actor_git_sha`
-- records the subtr-actor build the browser ran so we can audit/version-gate it.
ALTER TABLE analysis_runs
    ADD COLUMN source text NOT NULL DEFAULT 'server',
    ADD COLUMN submitted_by_user_id uuid REFERENCES users(id),
    ADD COLUMN client_subtr_actor_git_sha text;
