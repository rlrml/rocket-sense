#!/usr/bin/env bash
# Reclaim the dense per-frame telemetry backlog from `play_events`.
#
# As of the post-materialization cleanup (see
# `MATERIALIZED_DENSE_SOURCE_STREAMS` / `should_persist_play_event` in
# crates/rocket-sense-server/src/processing.rs), newly processed replays never
# write their dense per-frame streams to `play_events` at all: the materializers
# consume them straight from the in-memory event list during processing. This
# script removes the pre-existing backlog (replays processed before that change)
# so the disk is reclaimed without reprocessing every replay.
#
# The streams below MUST match MATERIALIZED_DENSE_SOURCE_STREAMS. They are already
# excluded from every user-facing count/aggregate and are served from the
# materialized `player_replay_*` tables, so deleting their raw rows changes no
# API response. The canonical event stream is also retained as a JSON object in
# storage, so nothing is lost irrecoverably -- reprocessing rebuilds the index.
#
# Deletes run in small, independently-committed batches (via `ctid`) to keep each
# transaction's WAL bounded -- important on a near-full disk, where a single giant
# DELETE could exhaust WAL space before it commits. The DELETE cascades to
# play_event_payloads / _attributes / _subjects and the detail tables.
#
# Usage:
#   # Point at the database with standard libpq env vars (PGHOST/PGUSER/...),
#   # a DATABASE_URL, or by exec-ing inside the prod pod:
#   kubectl --kubeconfig ~/.kube/railbird-sf.yaml exec -i deploy/rocket-sense -- \
#     env BATCH_SIZE=50000 bash -s < scripts/reclaim-dense-stream-events.sh
#
#   # ...or locally against a connection string:
#   DATABASE_URL=postgres://rocket_sense@host/rocket_sense \
#     scripts/reclaim-dense-stream-events.sh
#
# Env knobs:
#   BATCH_SIZE   rows per batch (default 50000)
#   SLEEP_SECS   pause between batches to let autovacuum/replication keep up (default 0)
#   DRY_RUN      if set to 1, only report the remaining row count and exit
#
# NOTE: deleting rows returns space to Postgres for reuse but does NOT shrink the
# table files on disk. Autovacuum will reuse the freed space for new rows over
# time. To return space to the OS immediately, run `VACUUM (VERBOSE) play_events`
# (reclaims to the free space map; does not shrink files) or, for an actual
# shrink, `pg_repack` (online) or `VACUUM FULL play_events` (takes an ACCESS
# EXCLUSIVE lock -- offline). Pick based on how urgently the OS disk is needed.

set -euo pipefail

BATCH_SIZE="${BATCH_SIZE:-50000}"
SLEEP_SECS="${SLEEP_SECS:-0}"
DRY_RUN="${DRY_RUN:-0}"

# Keep in sync with MATERIALIZED_DENSE_SOURCE_STREAMS in processing.rs.
STREAMS_SQL="ARRAY[
  'positioning','boost_state','boost_ledger','movement','rotation_player',
  'rotation_role_span','rotation_depth_span','rotation_role','ball_depth',
  'field_third','field_half','ball_proximity','powerslide'
]::text[]"

psql_cmd=(psql --no-psqlrc --quiet --tuples-only --no-align)
if [[ -n "${DATABASE_URL:-}" ]]; then
  psql_cmd+=("$DATABASE_URL")
fi

run_sql() { "${psql_cmd[@]}" -c "$1"; }

remaining() {
  run_sql "SELECT count(*) FROM play_events WHERE source_stream = ANY(${STREAMS_SQL});"
}

start_total="$(remaining)"
echo "dense-stream play_events rows remaining: ${start_total}"

if [[ "${DRY_RUN}" == "1" ]]; then
  echo "DRY_RUN=1 set; not deleting."
  exit 0
fi

deleted_total=0
while :; do
  # One statement: delete a batch by ctid and return how many rows it removed.
  batch="$(run_sql "
    WITH victims AS (
      SELECT ctid FROM play_events
      WHERE source_stream = ANY(${STREAMS_SQL})
      LIMIT ${BATCH_SIZE}
    ),
    del AS (
      DELETE FROM play_events e USING victims WHERE e.ctid = victims.ctid
      RETURNING 1
    )
    SELECT count(*) FROM del;
  ")"
  batch="${batch//[[:space:]]/}"

  deleted_total=$(( deleted_total + batch ))
  echo "deleted this batch: ${batch} (cumulative: ${deleted_total} / ${start_total})"

  if [[ "${batch}" == "0" ]]; then
    break
  fi
  if [[ "${SLEEP_SECS}" != "0" ]]; then
    sleep "${SLEEP_SECS}"
  fi
done

echo "done; deleted ${deleted_total} dense-stream play_events rows."
echo "remember to VACUUM (or pg_repack / VACUUM FULL) play_events to reclaim OS disk."
