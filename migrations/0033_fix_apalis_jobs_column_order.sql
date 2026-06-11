-- apalis-postgres reads `SELECT * FROM apalis.get_jobs(...)` through sqlx
-- compile-time macros, which decode columns BY ORDINAL using metadata captured
-- against apalis's own migrations. Our hand-rolled schema from 0027 declared
-- the columns in a different order (id, job_type, job, ... started_at,
-- idempotency_key) than the official one (job, id, job_type, ...,
-- idempotency_key; started_at lives on workers, not jobs). Workers therefore
-- decoded job_type as the task id and crashed with
-- "could not decode task_id: `invalid length`" on every fetch.
--
-- Rebuild apalis.jobs with the exact official column order and move
-- started_at to apalis.workers where apalis expects it.

ALTER TABLE apalis.workers
    ADD COLUMN IF NOT EXISTS started_at timestamptz;

DROP FUNCTION IF EXISTS apalis.get_jobs(text, text, integer);
DROP TRIGGER IF EXISTS notify_workers ON apalis.jobs;

CREATE TABLE apalis.jobs_reordered (
    job bytea NOT NULL,
    id text PRIMARY KEY,
    job_type text NOT NULL,
    status text NOT NULL DEFAULT 'Pending',
    attempts integer NOT NULL DEFAULT 0,
    max_attempts integer NOT NULL DEFAULT 25,
    run_at timestamptz NOT NULL DEFAULT now(),
    last_result jsonb,
    lock_at timestamptz,
    lock_by text REFERENCES apalis.workers(id),
    done_at timestamptz,
    priority integer DEFAULT 0,
    metadata jsonb,
    idempotency_key text
);

INSERT INTO apalis.jobs_reordered (
    job, id, job_type, status, attempts, max_attempts, run_at,
    last_result, lock_at, lock_by, done_at, priority, metadata,
    idempotency_key
)
SELECT
    job, id, job_type, status, attempts, max_attempts, run_at,
    last_result, lock_at, lock_by, done_at, priority, metadata,
    idempotency_key
FROM apalis.jobs;

DROP TABLE apalis.jobs;

ALTER TABLE apalis.jobs_reordered RENAME TO jobs;

CREATE INDEX apalis_jobs_status_idx ON apalis.jobs (status);

CREATE INDEX apalis_jobs_lock_by_idx ON apalis.jobs (lock_by);

CREATE INDEX apalis_jobs_job_type_idx ON apalis.jobs (job_type);

CREATE UNIQUE INDEX idx_jobs_idempotency_key
    ON apalis.jobs (job_type, idempotency_key);

CREATE OR REPLACE FUNCTION apalis.get_jobs(
    worker_id text,
    v_job_type text,
    v_job_count integer DEFAULT 5
) RETURNS SETOF apalis.jobs AS $$
BEGIN
    RETURN QUERY
    UPDATE apalis.jobs
    SET status = 'Queued',
        lock_by = worker_id,
        lock_at = now()
    WHERE id IN (
        SELECT id
        FROM apalis.jobs
        WHERE (
                status = 'Pending'
                OR (status = 'Failed' AND attempts < max_attempts)
            )
          AND run_at < now()
          AND job_type = v_job_type
        ORDER BY priority DESC, run_at ASC
        LIMIT v_job_count
        FOR UPDATE SKIP LOCKED
    )
    RETURNING *;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TRIGGER notify_workers
AFTER INSERT ON apalis.jobs
FOR EACH ROW EXECUTE FUNCTION apalis.notify_new_jobs();
