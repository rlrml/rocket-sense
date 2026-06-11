# rocket-sense disk usage — analysis & remediation plan

**Context:** On 2026-06-11 `railbird-sf` (single-node k3s) hit 93% disk (796G/904G).
kubelet raised `DiskPressure` and evicted every `rocket-sense` pod. An emergency
`VACUUM FULL` of the bloated Postgres tables recovered ~207G (disk now ~70%), and
all pods are healthy again — **but that fix is temporary**. The underlying churn
that produced the bloat is still running and *will* refill the disk. This doc is
the handoff for the durable fixes.

All paths/line numbers below are against `origin/master` as of this worktree
(`colonelpanic/disk-usage-remediation`, base `eb20724`).

---

## Implementation status (this branch)

| Issue | Status | Where |
|-------|--------|-------|
| Issue 0 — drop `play_event_scalar_fields` | **implemented** | write path + EAV helpers removed from `processing.rs`; `migrations/0039_drop_play_event_scalar_fields.sql` drops the table |
| Issue 1.1 — stop persisting unused streams | **implemented** | `rotation_player` + `positioning_ball_relative_depth` added to `NON_INDEXED_TIMELINE_STREAMS`; rotation-player detail machinery and the `needs_rotation_player` staleness checks removed; `migrations/0040_drop_unconsumed_high_volume_streams.sql` deletes legacy rows + drops `play_event_rotation_player_details`. **`boost_pickups` is KEPT** — `web/src/stats/boost.tsx` renders it (the earlier "no consumer" call was a bad grep). |
| Issue 1.2 — autovacuum tuning | **implemented** | `migrations/0038_play_event_autovacuum_tuning.sql` |
| Issue 2 — event-stream GC | **implemented** | `ObjectStorage::delete`, prune-path GC in `processing.rs`, admin `POST /admin/storage/gc-event-streams` (with `dry_run`) for the one-time backfill sweep |
| Issue 3 — PVC quota/monitoring | **partially implemented** | terraform: PVC sizes made honest + monitoring scaffolding under `infra/terraform/`; XFS/LVM quota enforcement still operational follow-up |

Still operational (not code): run the admin GC sweep to reclaim the ~37G of
superseded stream objects, and `pg_repack`/`VACUUM FULL` after migrations 0039/0040
land to return the freed space to the OS (autovacuum alone won't shrink files).

---

## Where the space actually went

`/var/lib/rancher/k3s/storage` is the **k3s `local-path` provisioner backing
dir** — it's where every PVC in the cluster physically lives as a plain hostPath
directory. It held 272G across exactly two PVCs (both in `rocket-sense`):

| PVC | declared | actual (pre-fix) | actual (post-fix) | what's in it |
|-----|----------|------------------|-------------------|--------------|
| `rocket-sense-postgres` | **10Gi** | **231G** | 25G | the Postgres data dir (`pgdata`) |
| `rocket-sense-storage`  | **50Gi** | 41G | 41G | event-stream + replay object storage (`event-streams/`, `replays/`) |

The single most important "weird" thing is in that table: **a PVC that requested
10Gi was holding 231G.** That is not a bug in your app — it is how `local-path`
works (see Issue 3). But the deeper question — *why is there 230G of Postgres for
~400 replays?* — has a blunt answer in Issue 0.

---

## Issue 0 — The biggest table is write-only; nothing reads it  *(~71% of the DB; START HERE)*

For ~400 replays the DB held **230G**. That is ~165MB of Postgres *per replay*,
which is absurd. The reason: one table, **`play_event_scalar_fields`**, was
**164G (74G heap + 90G indexes) ≈ 71% of the whole database** — and **no code path
reads it.**

### Evidence
- Every reference to `play_event_scalar_fields` in the repo (outside tests) is an
  `INSERT`, the `CREATE` in `migrations/0013_event_stream_indexing_extensions.sql:92`,
  or the prune `DELETE`. **There is not one `SELECT`/`JOIN` against it** in `crates/`
  or `web/`. It is purely write-only.
- It's an EAV index that explodes **every event into ~26 rows**
  (`event_scalar_fields()` at `processing.rs:4293`, which walks both `payload` and
  `attribute` JSON). 3.26M events → **86.3M rows**.
- Heavy redundancy: the top field paths (`time`, `frame`, `end_time`, `end_frame`,
  `duration`, `is_team_0`) are each stored **twice** — once as `field_source='payload'`
  and once as `'attribute'` — across millions of rows.
- It is driven by per-frame telemetry streams (see Issue 1 table): `movement`
  ~1,300 events/replay, `rotation_player` ~1,100, `positioning_*` ~1,000 each.
- There is already a feature flag to stop writing it: `IndexingOptions.scalar_fields:
  bool` (`processing.rs:114`, set `true` at `:123`). Writers:
  `insert_play_event_scalar_field_rows_for_events` (`processing.rs:2458`) and
  `insert_play_event_scalar_fields` (`processing.rs:3478`).

### Fix (high impact, low risk)
1. **Stop populating it** — flip `scalar_fields` to `false` (or remove the writes at
   `processing.rs:2297` / `:2663`). Eliminates ~71% of DB growth at the source.
2. **Drop the table + its 4 indexes** once you've confirmed no out-of-repo consumer
   (ad-hoc analytics, notebooks, BI) depends on it. If something *does*, that's the
   signal to design a real read path instead of a write-only firehose.
3. If any of its data is genuinely wanted later, it should be derived on demand from
   the event-stream JSON objects (already stored, Issue 2), not eagerly exploded into
   the OLTP DB.

> The other child tables — `play_event_payloads`, `play_event_attributes`,
> `play_event_subjects` — **are** read, but only by narrow queries on specific event
> types (goals in `player_overview.rs`, touches/mechanics in `mechanics.rs`,
> rotation stints in `stats.rs`). That's where the "store per-replay counts / skip
> unused streams" idea applies — see Issue 1.

---

## Issue 1 — We persist far more event volume than we display  *(per-frame telemetry churn)*

### Root cause
Re-analyzing a replay creates a new `analysis_runs` row and re-inserts the full
event set, then deletes the superseded run's events:

- `prune_superseded_run_events` — `crates/rocket-sense-server/src/processing.rs:1125`
  `DELETE`s all `play_events` (and `replay_boost_tracks`) belonging to non-canonical
  runs for the replay. Child tables cascade.
- Called on every successful run at `processing.rs:1093`.

The DB currently has **~4.1 analysis runs per replay** (1660 runs / 401 replays),
so most event rows are written and then deleted. The dominant table is the EAV
table **`play_event_scalar_fields`** (~26 rows *per event*, 4 indexes incl. 3
partial). Pre-fix sizes:

```
play_event_scalar_fields   164 GB total  (74 GB heap + 90 GB indexes)  ~86M live rows
play_events                 18 GB
play_event_payloads         18 GB
play_event_attributes       15 GB
play_event_subjects         14 GB
```

`pgstattuple_approx('play_event_scalar_fields')` reported the heap was **~88%
dead/free space** holding only ~8G of live tuples. So the pruning *logic is
correct* (live row counts match the latest run exactly — no stale rows), but plain
autovacuum only returns dead space to the table's free-space map; it **never
returns it to the OS**. Under this much delete churn the files grow without bound.

### The volume is concentrated in a few telemetry streams — not all consumed
Events per replay (canonical runs), with whether any API/`web` code consumes the
stream (`source_stream`). "Consumed" excludes the producer in `processing.rs`/the
extractor and the `AGGREGATE_*` hide-lists:

| stream | events/replay | consumed by | notes |
|--------|--------------:|-------------|-------|
| `movement` | ~1,300 | `mechanics.rs` (dodge/flip patterns) | partly |
| `rotation_player` | ~1,100 | **none found** | producer + hide-list only |
| `positioning_ball_relative_depth` | ~1,050 | **none found** | zero refs anywhere |
| `positioning_field_zone` | ~710 | `web/src/stats/positioning.tsx` | rendered |
| `rotation_role_span` | ~610 | `player_overview.rs:272` | used |
| `rotation_depth_span` | ~510 | `player_overview.rs:272` | used |
| `positioning_ball_proximity` | ~470 | `web/.../positioning.tsx` | rendered |
| `powerslide` | ~430 | `mechanics.rs` | used |
| `positioning_teammate_role` | ~325 | `web/.../positioning.tsx` | rendered |
| `boost_pickups` | ~315 | `web/src/stats/boost.tsx` | rendered — **keep** |

Two relevant in-code facts:
- `AGGREGATE_VISIBLE_EVENT_SOURCE_STREAM_SQL` (`api/stats.rs:280`) already excludes
  `positioning, boost_state, boost_ledger, movement, rotation_player,
  rotation_role_span, rotation_depth_span, powerslide` from aggregate stat counts —
  the app already treats these as not-user-facing-as-counts.
- But "hidden from counts" ≠ "unused": several of those are still read elsewhere
  (rotation spans in `player_overview`, positioning in the web UI). So the safe-to-drop
  set must be determined per stream, not from the hide-list.

**Dropped on this branch** (high volume, no consumer): `rotation_player` (whose
only "reader" was the profile-timing backfill's own staleness check — that check
is removed too) and `positioning_ball_relative_depth` (zero refs anywhere).
Together ~2.1k of ~8.1k events per replay (~26%). `boost_pickups` stays — the
boost stats page renders it.

### Fix options (pick a combination)
1. **Stop persisting unused high-volume streams at the source.** In the
   extractor→DB path, filter out streams that no read path consumes (start with the
   drop candidates above). This is the user-requested direction: don't even store
   counts unless something displays them. Combine with Issue 0 (kill `scalar_fields`)
   and the DB shrinks dramatically with no UX change.
2. **Bound residual bloat — aggressive per-table autovacuum** on whatever hot tables
   remain (`autovacuum_vacuum_scale_factor ≈ 0.02`, higher `cost_limit`). Keeps
   steady-state low; does not shrink existing files.
3. **Reclaim without downtime — `pg_repack`** on a schedule instead of `VACUUM FULL`
   (which needs an `ACCESS EXCLUSIVE` lock / outage; the emergency fix only used it
   because the app was already down).
4. **Structural — partition `play_events` + child tables by `analysis_run_id`** so
   superseding a run is `DROP PARTITION` (instant, zero dead tuples) instead of a
   churny `DELETE`. Removes the re-analysis bloat mechanism entirely.

**Recommended order:** Issue 0 first (biggest, safest), then 1 (drop unused
streams), then 2+3 for hygiene; 4 if re-analysis churn is still material afterward.

---

## Issue 2 — Event-stream objects are never garbage-collected  *(~37G reclaimable)*

### Root cause
For every run, the serialized event stream is written to object storage:

- key built at `processing.rs:4669`: `event-streams/sha256/{file_sha256}/{analysis_run_id}.json`
- written at `processing.rs:1050-1056` via `LocalStorage` (`crates/rocket-sense-storage/src/lib.rs`).

`prune_superseded_run_events` deletes the DB rows but **deliberately keeps the
`analysis_runs` rows and their stream objects as an audit trail** (see the doc
comment at `processing.rs:1117-1124`). Nothing ever deletes superseded stream
objects from disk, so they accumulate one-per-run forever.

Measured: 1557 runs reference **~40G** of stream storage, but only **~2.4G**
belongs to *canonical* runs (`replays.canonical_analysis_run_id`). So **~37G is
superseded.** Additionally the on-disk files are a **mix of uncompressed
`.json` (identity) and `.zst`** — the largest files (~100MB each) are uncompressed
old streams, even though `DEFAULT_STORAGE_ENCODING` is now `Zstd`
(`rocket-sense-storage/src/lib.rs:75`).

### Fix options
1. **Add deletion to the storage layer.** `ObjectStorage` has `put`/`get` but no
   `delete` (`rocket-sense-storage/src/lib.rs:143`). Add `delete(&self, key)`.
2. **GC superseded streams.** In the prune path (or a periodic admin job), delete
   stream objects for non-canonical runs — optionally retain the last N runs or a
   time window if you want some audit history. Admin already surfaces
   `canonical_run_event_stream_object_key` (`api/admin.rs:650+`), so the data to
   drive this exists.
3. **One-time backfill sweep** to remove the ~37G already orphaned.
4. **(optional) Re-encode identity streams to zstd** — the uncompressed `.json`
   blobs compress heavily.

---

## Issue 3 — PVC capacity is not enforced  *(why the node filled silently)*

### Root cause
Both PVCs use `storageClassName = "local-path"`
(`infra/terraform/variables.tf:25`), with requests of `10Gi`
(`variables.tf:31`, postgres) and `50Gi` (`variables.tf:37`, replay storage),
defined at `infra/terraform/main.tf:26` and `:46`.

The k3s **local-path provisioner ignores the requested size** — it just creates a
hostPath directory under `/var/lib/rancher/k3s/storage` with **no quota**. So a
PVC can grow until the *whole node disk* is full, which is exactly what happened
(10Gi claim → 231G actual). There is no per-volume back-pressure; the only limit
is the physical disk, enforced after the fact by kubelet eviction.

### Fix options
1. **Accept local-path but add guardrails:** node-level disk alerting *before*
   `DiskPressure`, and explicit, sane kubelet eviction thresholds.
2. **Enforce quotas:** back the storage dir with XFS project quotas (or a dedicated
   LVM/filesystem per PVC) so a runaway volume can't take the node down.
3. **Switch to a provisioner that honors capacity** if/when this graduates past a
   single node.
4. Regardless: make the declared PVC sizes reflect reality for capacity-planning
   clarity, even though local-path won't enforce them.

---

## Suggested order of work
1. **Issue 0** (stop writing + drop `play_event_scalar_fields`) — removes ~71% of DB
   growth, no read path affected. Biggest, safest win. Confirm no out-of-repo
   consumer first, then `pg_repack`/`VACUUM FULL` to actually reclaim the space.
2. **Issue 1.1** (stop persisting unused high-volume streams — start with
   `rotation_player`, `positioning_ball_relative_depth`, `boost_pickups`) after
   verifying each has no consumer.
3. **Issue 2** (storage `delete` + superseded-stream GC + backfill) — easy ~37G,
   low risk.
4. **Issue 1.2 + 1.3** (autovacuum tuning + scheduled `pg_repack`) — hygiene so
   residual churn never refills the disk. *Do this or it slowly refills.*
5. **Issue 3.1/3.2** (monitoring + quota) — prevents another silent node-fill.
6. **Issue 1.4** (partition `play_events` by run) — durable structural fix if
   re-analysis churn is still material after the above; scope separately.

## Verification commands
```bash
# disk + PVC physical sizes (run on railbird-sf)
df -h /
sudo du -sh /var/lib/rancher/k3s/storage/*

# DB + table sizes
kubectl exec -n rocket-sense deploy/rocket-sense-postgres -- \
  psql -U rocket_sense -d rocket_sense -c "SELECT pg_size_pretty(pg_database_size('rocket_sense'));"
kubectl exec -n rocket-sense deploy/rocket-sense-postgres -- psql -U rocket_sense -d rocket_sense -c "
  SELECT relname, pg_size_pretty(pg_total_relation_size(c.oid)) total
  FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='public' AND c.relkind='r'
  ORDER BY pg_total_relation_size(c.oid) DESC LIMIT 10;"

# superseded vs canonical event-stream storage
kubectl exec -n rocket-sense deploy/rocket-sense-postgres -- psql -U rocket_sense -d rocket_sense -c "
  SELECT pg_size_pretty(sum(event_stream_storage_byte_size)) total,
         pg_size_pretty(sum(event_stream_storage_byte_size) FILTER (
           WHERE id IN (SELECT canonical_analysis_run_id FROM replays WHERE canonical_analysis_run_id IS NOT NULL))) canonical
  FROM analysis_runs WHERE event_stream_object_key IS NOT NULL;"
```

---

## Implementation status (2026-06-11, branch `colonelpanic/disk-usage-remediation`)

| Item | Status | Where |
|------|--------|-------|
| **Issue 0** — drop `play_event_scalar_fields` | **done** | writers/walker/flag removed from `processing.rs`; migration `0039` drops the table |
| **Issue 1.1** — stop persisting unused streams | **done, with one correction** | `rotation_player` + `positioning_ball_relative_depth` added to `NON_INDEXED_TIMELINE_STREAMS`; migration `0040` deletes existing rows + drops `play_event_rotation_player_details`. **`boost_pickups` was kept** — it *is* consumed: the web boost panel (`web/src/stats/boost.tsx`) requests `boost_pickup`/`boost_respawn` events and renders pickup maps, steal stats, and per-player summaries from them |
| **Issue 1.2** — aggressive autovacuum on hot tables | **done** | migration `0038`: scale_factor 0.02, threshold 1000, cost_limit 2000, cost_delay 1 on all play_event tables + `replay_boost_tracks` |
| **Issue 1.3** — scheduled `pg_repack` | **resolved differently** | `postgres:16-alpine` is musl; pg_repack needs a matching server build, and switching to the glibc image risks collation-order index corruption without a full `REINDEX`. Instead the watchdog (below) alerts when `pgstattuple_approx` shows >50% dead/free on any >5GB table, signalling a manual reclaim window |
| **Issue 1.4** — partition `play_events` by run | **not done** | scope separately if churn is still material after the above; expected to be much less urgent now that ~⅔ of per-run event volume is gone |
| **Issue 2** — superseded event-stream GC | **done** | `ObjectStorage::delete` + inline best-effort GC after each prune; daily sweeper in server/worker (first pass ~60s after startup, clears the ~37G backlog); `POST /admin/storage/gc-event-streams` with `dry_run` for inspection. Object is deleted *before* DB metadata is cleared (crash-safe), `running` runs are skipped, and the global sweep has a 1h age guard against the succeeded-but-not-yet-canonical race |
| **Issue 3.1** — monitoring | **done** | `disk-usage-watchdog` CronJob (daily 01:23 PT, `infra/terraform/files/disk-usage-watchdog.sh`): node disk ≥80%, table bloat via `pgstattuple_approx`, superseded-stream backlog ≥5G; optional `ALERT_WEBHOOK_URL` secret posts alerts |
| **Issue 3.1** — kubelet eviction thresholds | **already in place** | `/srv/dotfiles/nixos/k3s.nix` already sets `eviction-hard=nodefs.available<2Gi` + soft `<5Gi` (5m grace); no change needed |
| **Issue 3.2/3.4** — PVC sizes | **deliberately unchanged** | local-path can't expand a bound PVC (API server rejects the edit; replacement deletes data) and doesn't enforce sizes anyway — documented as advisory in `infra/terraform/variables.tf` |
| **Issue 3.2** — XFS project quotas | **not done** | host-level change, out of scope for this branch |

### Caveats / follow-ups
- Migrations `0039`/`0040` assume **no out-of-repo consumer** (notebooks, ad-hoc
  SQL, BI) reads `play_event_scalar_fields`, `play_event_rotation_player_details`,
  or the two dropped streams' play_events rows. The data stays derivable: full
  streams remain in each run's event-stream object, and reprocessing can re-index.
- `0040`'s `DELETE FROM play_events` (~860k rows + cascades) runs inside the
  startup migration; expect the first deploy's migration step to take a minute or
  two and to leave dead tuples that the tuned autovacuum then reclaims into the FSM.
- The freed file space from the pre-existing bloat is *not* returned to the OS by
  autovacuum — the watchdog's bloat alert indicates when a manual
  `VACUUM FULL`/repack window is worth it.

### Deploy / verify
```bash
just deploy-railbird-sf   # build + skopeo push + tofu apply (runs migrations on rollout)

# first GC sweep fires ~60s after the worker starts; expect ~1150 objects / ~37G:
kubectl logs -n rocket-sense deploy/rocket-sense-worker | grep "event stream"

# or inspect first:
curl -s -X POST https://rocket-sense.duckdns.org/api/admin/storage/gc-event-streams \
  -H "Authorization: Bearer $ADMIN_JWT" -H 'Content-Type: application/json' \
  -d '{"dry_run": true}'

# optionally add a webhook for watchdog alerts:
kubectl -n rocket-sense patch secret rocket-sense-secrets \
  -p '{"stringData":{"ALERT_WEBHOOK_URL":"https://..."}}'
```
