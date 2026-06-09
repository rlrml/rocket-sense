-- Continuous boost quantities (instantaneous boost amount plus cumulative
-- used/collected/stolen/overfill totals) moved out of discrete timeline events
-- in the subtr-actor boost-model rewrite and now ride along as per-frame
-- accumulation tracks on the stats timeline scaffold. They are not naturally
-- modeled as play_events, so persist them per analysis run for the boost page.
CREATE TABLE replay_boost_tracks (
    analysis_run_id uuid PRIMARY KEY REFERENCES analysis_runs(id) ON DELETE CASCADE,
    replay_id uuid NOT NULL REFERENCES replays(id) ON DELETE CASCADE,
    tracks jsonb NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX replay_boost_tracks_replay_idx ON replay_boost_tracks (replay_id);
