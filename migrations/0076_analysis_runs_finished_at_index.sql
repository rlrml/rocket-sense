-- Support the admin "recently processed replays" view, which orders canonical
-- analysis runs by completion time. Without this index, ordering by
-- finished_at requires sorting the entire analysis_runs table on every load.
CREATE INDEX IF NOT EXISTS analysis_runs_finished_at_idx
    ON analysis_runs (finished_at DESC);
