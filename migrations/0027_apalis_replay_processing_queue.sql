CREATE SCHEMA IF NOT EXISTS apalis;

CREATE TABLE IF NOT EXISTS apalis.workers (
    id text PRIMARY KEY,
    worker_type text NOT NULL,
    storage_name text NOT NULL,
    layers text NOT NULL DEFAULT '',
    last_seen timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS apalis_workers_worker_type_idx
    ON apalis.workers (worker_type);

CREATE INDEX IF NOT EXISTS apalis_workers_last_seen_idx
    ON apalis.workers (last_seen);

CREATE TABLE IF NOT EXISTS apalis.jobs (
    id text PRIMARY KEY,
    job_type text NOT NULL,
    job bytea NOT NULL,
    status text NOT NULL DEFAULT 'Pending',
    attempts integer NOT NULL DEFAULT 0,
    max_attempts integer NOT NULL DEFAULT 25,
    run_at timestamptz NOT NULL DEFAULT now(),
    last_result jsonb,
    lock_at timestamptz,
    lock_by text REFERENCES apalis.workers(id),
    done_at timestamptz,
    priority integer NOT NULL DEFAULT 0,
    metadata jsonb,
    started_at timestamptz,
    idempotency_key text
);

CREATE INDEX IF NOT EXISTS apalis_jobs_status_idx
    ON apalis.jobs (status);

CREATE INDEX IF NOT EXISTS apalis_jobs_lock_by_idx
    ON apalis.jobs (lock_by);

CREATE INDEX IF NOT EXISTS apalis_jobs_job_type_idx
    ON apalis.jobs (job_type);

CREATE UNIQUE INDEX IF NOT EXISTS apalis_jobs_job_type_idempotency_key_idx
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
        ORDER BY priority DESC, run_at ASC, id ASC
        LIMIT v_job_count
        FOR UPDATE SKIP LOCKED
    )
    RETURNING *;
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION apalis.notify_new_jobs()
RETURNS trigger AS $$
BEGIN
    IF NEW.run_at <= now() THEN
        PERFORM pg_notify(
            'apalis::job::insert',
            json_build_object(
                'job_type', NEW.job_type,
                'id', NEW.id,
                'run_at', NEW.run_at
            )::text
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notify_workers ON apalis.jobs;

CREATE TRIGGER notify_workers
AFTER INSERT ON apalis.jobs
FOR EACH ROW EXECUTE FUNCTION apalis.notify_new_jobs();
