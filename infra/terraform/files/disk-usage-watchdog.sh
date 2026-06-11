#!/bin/sh
# Disk-usage watchdog for the rocket-sense node. Runs as a k8s CronJob with
# the replay storage PVC mounted and psql access to the rocket-sense database.
#
# Background: on 2026-06-11 the node silently filled to 93% (Postgres bloat +
# unGC'd event stream objects), kubelet raised DiskPressure, and every pod was
# evicted. The local-path provisioner enforces no PVC quota, so the only
# defense before kubelet eviction is noticing early. This job exits non-zero
# (CronJob shows Failed, and optionally posts to ALERT_WEBHOOK_URL) when:
#   - node disk usage crosses DISK_USAGE_ALERT_PERCENT, or
#   - a large table's dead/free space ratio suggests autovacuum is not keeping
#     up and an online rebuild (pg_repack) or VACUUM FULL window is needed, or
#   - superseded event stream objects are accumulating (stream GC broken).
set -eu

storage_mount="${STORAGE_MOUNT:-/var/lib/rocket-sense/storage}"
disk_alert_percent="${DISK_USAGE_ALERT_PERCENT:-80}"
bloat_alert_percent="${TABLE_BLOAT_ALERT_PERCENT:-50}"
bloat_min_table_bytes="${TABLE_BLOAT_MIN_TABLE_BYTES:-5000000000}"
superseded_stream_alert_bytes="${SUPERSEDED_STREAM_ALERT_BYTES:-5000000000}"
alerts=""

add_alert() {
    echo "ALERT: $1" >&2
    alerts="${alerts:+$alerts; }$1"
}

# local-path PVCs are plain hostPath directories, so statfs on the mount
# reports the node root filesystem - the same disk kubelet watches for
# DiskPressure.
disk_usage_percent=$(df -P "$storage_mount" | awk 'NR == 2 { sub("%", "", $5); print $5 }')
echo "node disk usage: ${disk_usage_percent}% (alert at ${disk_alert_percent}%)"
if [ "$disk_usage_percent" -ge "$disk_alert_percent" ]; then
    add_alert "node disk usage ${disk_usage_percent}% >= ${disk_alert_percent}%"
fi

echo
echo "database size: $(psql -X -t -A -c "SELECT pg_size_pretty(pg_database_size(current_database()))")"
echo
echo "largest relations:"
psql -X -P pager=off -c "
    SELECT c.relname,
           pg_size_pretty(pg_total_relation_size(c.oid)) AS total,
           pg_size_pretty(pg_relation_size(c.oid)) AS heap
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
    ORDER BY pg_total_relation_size(c.oid) DESC
    LIMIT 10"

# pgstattuple_approx walks the heap cheaply (contrib ships in the official
# postgres image) and reports dead + free space, which captures the
# delete-churn ratchet that dead-tuple counts alone miss once autovacuum has
# already marked the space reusable.
psql -X -t -A -c "CREATE EXTENSION IF NOT EXISTS pgstattuple" > /dev/null
bloated_tables=$(psql -X -t -A -F' ' -c "
    SELECT relname,
           round(100 - approx_tuple_percent)
    FROM (
        SELECT c.relname,
               (pgstattuple_approx(c.oid)).approx_tuple_percent
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind = 'r'
          AND pg_relation_size(c.oid) > ${bloat_min_table_bytes}
    ) sampled
    WHERE approx_tuple_percent < 100 - ${bloat_alert_percent}")
echo
if [ -n "$bloated_tables" ]; then
    echo "$bloated_tables" | while read -r table_name dead_percent; do
        echo "table ${table_name} is ~${dead_percent}% dead/free space"
    done
    summary=$(echo "$bloated_tables" | awk '{ printf "%s%s ~%s%% dead/free", sep, $1, $2; sep = ", " }')
    add_alert "table bloat needs reclaim (pg_repack or VACUUM FULL): ${summary}"
else
    echo "no table over $(numfmt --to=iec ${bloat_min_table_bytes} 2>/dev/null || echo ${bloat_min_table_bytes} bytes) exceeds ${bloat_alert_percent}% dead/free space"
fi

# Stream GC (inline on prune + daily worker sweep) should keep this near zero.
superseded_stream_bytes=$(psql -X -t -A -c "
    SELECT COALESCE(sum(run.event_stream_storage_byte_size), 0)
    FROM analysis_runs run
    JOIN replays replay ON replay.id = run.replay_id
    WHERE replay.canonical_analysis_run_id IS NOT NULL
      AND run.id <> replay.canonical_analysis_run_id
      AND run.status <> 'running'
      AND run.event_stream_object_key IS NOT NULL")
echo
echo "superseded event stream bytes awaiting GC: ${superseded_stream_bytes}"
if [ "$superseded_stream_bytes" -ge "$superseded_stream_alert_bytes" ]; then
    add_alert "superseded event streams hold ${superseded_stream_bytes} bytes; stream GC may be broken"
fi

if [ -n "$alerts" ]; then
    if [ -n "${ALERT_WEBHOOK_URL:-}" ]; then
        wget -q -O - --post-data "rocket-sense disk watchdog: ${alerts}" "$ALERT_WEBHOOK_URL" || true
    fi
    exit 1
fi

echo
echo "all checks passed"
