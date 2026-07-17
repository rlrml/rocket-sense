# Model Delivery & Retrainability Architecture

How the client-side mistake reranker models reach the browser, and what a
refresh actually requires. For the detector port itself (what was translated
from RLVision and how the data maps), see
[mistake-detection-port.md](mistake-detection-port.md).

## Current Setup

### How models are delivered to clients

**The file**: `mistake_models.json.gz` (~506 KB gzipped, ~6.4 MB raw)

- **Canonical copy**: `crates/rocket-sense-mistakes/fixtures/mistake_models.json.gz`
  — it lives with the golden fixtures because the WASM↔Python parity tests
  prove the build scores it exactly like the upstream oracle.
- **Shipped copy**: `web/vendor/@rocket-sense/mistakes/mistake_models.json.gz`,
  synced from the fixture by `scripts/build-mistakes-vendor`. Unlike the
  `@rlrml/*` packages (generated from the subtr-actor flake and gitignored),
  this vendored output **is committed** — it is small, first-party, and
  committing it keeps `npm ci` and the Nix web build working without extra
  toolchain wiring.
- **Loaded**: in
  [web/src/stats/reprocess.worker.ts](../web/src/stats/reprocess.worker.ts)
  (`loadMistakeModels`) whenever the client reprocesses a replay. Mistake
  detection is part of that eager replay-analysis pass; opening the Coaching
  tab only displays the results already attached to the generated scaffold.
- **Transport**: imported as a Vite `?url` asset and fetched at runtime. The
  loader sniffs the gzip magic bytes and inflates with `DecompressionStream`
  itself, so it works whether the server sends the raw `.gz` (embedded prod
  server) or has already inflated it (`Content-Encoding: gzip` from Vite dev).

### What's in the model artifact

Top level:

```json
{
  "schema_version": 1,
  "updated_at": 1781447806.56,
  "models": {
    "bad_defensive_touch": { "model_type": "boosted_trees", "family": "gradient_boosting", "keep_threshold": 0.4, "n": 15, "trees": [...], "base_score": ..., "learning_rate": ... },
    "bad_fifty":           { "w": [...], "b": ..., "keep_threshold": 0.4, "n": 8, "input_center": [...], "input_scale": [...] },
    "bang_with_time":      { "model_type": "tree_ensemble", "family": "random_forest", "keep_threshold": 0.4, "n": ..., "trees": [...] }
  }
}
```

- **`models` is keyed by mistake kind**, not a flat list. The shipped artifact
  carries **14 per-kind reranker models** — fewer than the 15 detector kinds,
  because a kind that ships without a model simply stays on the heuristic path.
- Each blob is one of three families, dispatched by `model_type` in
  [crates/rocket-sense-mistakes/src/model.rs](../crates/rocket-sense-mistakes/src/model.rs):
  - `"tree_ensemble"` — random-forest / extra-trees (`trees`)
  - `"boosted_trees"` — gradient boosting (`trees`, `base_score`, `learning_rate`)
  - **absent `model_type`** → logistic regression (`w`, `b`, plus optional
    `input_center` / `input_scale` for centering/scaling)
- **`keep_threshold`**: the probability cutoff — a candidate whose model score
  falls below this is gated out.
- **`n`**: the model's feature count; features are **positional**.

There is no `feature_names` list in the artifact. The feature names and their
order live in Rust — the `feature_names` mapping in
[crates/rocket-sense-mistakes/src/kinds.rs](../crates/rocket-sense-mistakes/src/kinds.rs)
— and `schema_version` is what guards that the artifact's positional features
still line up with what Rust expects.

### Loading and failure behavior

```typescript
// web/src/stats/reprocess.worker.ts — loadMistakeModels()
const response = await fetch(mistakeModelsUrl);
if (!response.ok) throw new Error(`Fetching mistake models failed (${response.status})`);
const body = await response.arrayBuffer();
const bytes = new Uint8Array(body);
const isGzip = bytes[0] === 0x1f && bytes[1] === 0x8b;   // sniff, don't trust headers
const artifactJson = isGzip
  ? await new Response(new Blob([body]).stream().pipeThrough(new DecompressionStream("gzip"))).text()
  : new TextDecoder().decode(body);
return new wasm.MistakeModels(artifactJson);              // throws on schema_version mismatch
```

`new wasm.MistakeModels(json)` calls `ModelSet::from_json_str`
([model.rs](../crates/rocket-sense-mistakes/src/model.rs)), which returns an
error on invalid JSON or when `schema_version` doesn't match
`FEATURE_SCHEMA_VERSION`.

The worker does **not** currently degrade an artifact-wide failure to
heuristics. A fetch/HTTP error, decompression error, invalid document, or schema
mismatch propagates through `collectMistakes` and causes the reprocess worker to
post an error instead of a completed scaffold. Starting another reprocess run
creates another load attempt; there is no shared model promise or in-run retry.

Per-kind failure is intentionally softer: a malformed blob, a model with the
wrong feature count, or a kind absent from `models` is skipped by `ModelSet`.
Detection then uses the heuristic score (`score == severity`) for that kind
while the other kinds continue to use their loaded rerankers.

## Retrainability Path

### Where the models come from

Training is **not in this repo**. The detectors and rerankers are trained
upstream in the RLVision/RLAgent project (`RLAgent/ml/mistakes.py`), which
exports the `mistake_models.json` artifact. This repo ports only the
**inference** path into `crates/rocket-sense-mistakes{,-wasm}` and consumes the
exported artifact. The handoff is the JSON artifact itself — there is no
circular Python↔Rust dependency.

### Refreshing the shipped models

1. **Upstream**: retrain in RLAgent and export a new `mistake_models.json`.
2. **Drop it in**: replace the committed golden fixture
   `crates/rocket-sense-mistakes/fixtures/mistake_models.json.gz` (gzip the
   export). The parity tests will confirm the WASM build scores it identically
   to the Python oracle.
3. **Vendor it**: run `scripts/build-mistakes-vendor`, then commit the result.
   The script does exactly two things:
   - `cargo build --release --target wasm32-unknown-unknown -p
     rocket-sense-mistakes-wasm` and `wasm-bindgen` the result into
     `web/vendor/@rocket-sense/mistakes/`;
   - `cp` the pre-gzipped fixture into that same vendor directory.

   It does **not** run any Python, does **not** gzip the artifact (the fixture
   is already `.gz`), and does **not** touch `package-lock.json`. It needs the
   `wasm32-unknown-unknown` target and a `wasm-bindgen-cli` matching the
   `wasm-bindgen` crate version.
4. **Deploy**: the committed `.gz` and wasm ship in the app bundle. Inference
   runs entirely on the client — no server calls.

### Schema versioning

Two independent version knobs guard correctness:

- **`FEATURE_SCHEMA_VERSION`** (currently `1`) in
  [kinds.rs](../crates/rocket-sense-mistakes/src/kinds.rs). The artifact's
  `schema_version` must equal it, or `ModelSet::from_json_str`
  ([model.rs](../crates/rocket-sense-mistakes/src/model.rs)) rejects the entire
  document and client reprocessing fails explicitly — no silent misscoring
  against a stale feature layout.
- **`DETECTOR_VERSION`** (`"mistakes-v1"`) in
  [crates/rocket-sense-mistakes/src/lib.rs](../crates/rocket-sense-mistakes/src/lib.rs).
  Bump it when detector *behavior* changes in a way that should re-identify
  already-detected events.

**A refresh needs no schema bump** if it only changes thresholds, coefficients,
or tree structure for the existing feature sets.

**A schema bump is required** when the feature set changes (add/remove/rename/
reorder) or the keep-threshold semantics change. In that case you must, in one
coordinated change:

- bump `FEATURE_SCHEMA_VERSION` in `kinds.rs` and update the `feature_names`
  mapping;
- regenerate the golden fixtures (they are versioned against the schema);
- re-export the artifact upstream against the new schema and re-vendor it;
- keep the Rust inference port and the upstream trainer in lock-step in the
  same release.

## Current gaps for easier retrainability

- **No versioned model endpoint**: models are baked into the committed bundle,
  not fetched from a model server, so an update is a redeploy.
- **No hot swap / A/B**: can't route users to different model versions or roll
  a new model out gradually.
- **Cross-repo coupling on schema changes**: a feature-set change has to be
  coordinated between the upstream trainer and the Rust inference port.

### Potential improvements

1. **Versioned model endpoint** (`/api/models/{schema_version}`) — update
   models without a code redeploy; enables gradual rollout and rollback.
2. **Schema discovery endpoint** — client reports the `schema_version` it
   supports so the server can track compatibility and deprecate features
   gracefully.
3. **Per-kind versioning** — ship only the one improved kind's model instead of
   the whole artifact.

---

**TL;DR**: `mistake_models.json.gz` is a `{schema_version, updated_at, models}`
document of 14 per-kind reranker models (logreg / tree-ensemble / boosted-tree
families), committed as a fixture and vendored into the app bundle by
`scripts/build-mistakes-vendor` (WASM build + fixture copy, no Python, no
gzip, no lockfile). The reprocess worker loads it as part of eager replay
analysis; an artifact-wide load or `schema_version` failure aborts that
reprocess run, while a missing or malformed per-kind model falls back to that
kind's heuristic score. Training stays upstream in RLAgent; this repo consumes
the exported artifact.
