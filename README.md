# Rocket Sense

Rocket League replay analytics backend.

`rocket-sense` will be the service home for hosting replay files, metadata,
processing state, and replay-derived stats built on top of
[`subtr-actor`](https://github.com/rlrml/subtr-actor).

## Development

```sh
direnv allow
just test
just build
```

The development environment is provided by Nix and fenix. The flake tracks
current `nixos-unstable` and fenix's latest Rust toolchain.

## Initial architecture

This repository starts as a small Cargo workspace:

- `crates/rocket-sense-server` - Axum HTTP API server and OpenAPI generation.
- `crates/rocket-sense-db` - PostgreSQL connection and SQLx migrations.
- `crates/rocket-sense-storage` - Replay/artifact object storage abstraction.
- `migrations/` - SQLx database migrations.

The API is code-first OpenAPI via `utoipa`. The server exposes Swagger UI at
`/docs` and the OpenAPI document at `/api-docs/openapi.json`.

Replay identity is intentionally split:

- `replay.id` is Rocket Sense's canonical API/database id, generated as UUIDv7.
- `file_sha256` identifies exact replay file bytes for deduplication and
  provenance.
- `external_replay_id` is nullable parser-derived replay metadata, populated
  later by `subtr-actor` when available.

Raw replay bytes and large artifacts live in object storage. The initial storage
backend is local disk under `ROCKET_SENSE_STORAGE_ROOT`, defaulting to
`data/storage`.

Set `DATABASE_URL` to connect to Postgres. In development, migrations run on
server startup by default; set `ROCKET_SENSE_RUN_MIGRATIONS=false` to disable
that behavior.
