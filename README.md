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

The API is code-first OpenAPI via `utoipa`. The server exposes the OpenAPI
document at `/api-docs/openapi.json`.

Replay identity is intentionally split:

- `replay.id` is Rocket Sense's canonical API/database id, generated as UUIDv7.
- `file_sha256` identifies exact replay file bytes for deduplication and
  provenance.
- `external_replay_id` is nullable parser-derived replay metadata, populated
  later by `subtr-actor` when available.

Raw replay bytes and large artifacts live behind the object storage abstraction.
The initial implementation is local disk under `ROCKET_SENSE_STORAGE_ROOT`,
defaulting to `data/storage`. Raw replay objects are content-addressed by
SHA-256 under keys like `replays/sha256/<file_sha256>.replay`.

Set `DATABASE_URL` to connect to Postgres. In development, migrations run on
server startup by default; set `ROCKET_SENSE_RUN_MIGRATIONS=false` to disable
that behavior.

## Auth direction

Rocket Sense treats authentication and Rocket League platform identity as
separate concepts. The deployed app uses Google OpenID Connect login. The API
validates Rocket Sense bearer/session JWTs issued after Google ID-token
verification and maps provider identity to internal `users` rows.

The initial implementation has explicit development auth only:

```sh
ROCKET_SENSE_AUTH_MODE=dev
just dev
```

Open `/login` in the browser. In `ROCKET_SENSE_AUTH_MODE=google`, the page shows
a Google login button that redirects through `/auth/google/start` and
`/auth/google/callback`. In development mode, the same page offers a token form
for local API upload testing.

You can request a 24-hour development token from the API:

```sh
TOKEN=$(
  curl -s http://127.0.0.1:8080/api/v1/auth/dev-token \
    -H 'content-type: application/json' \
    -d '{"email":"ivan@example.com"}' |
    jq -r .access_token
)

curl -X POST http://127.0.0.1:8080/api/v1/replays \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/replay.replay"
```

Set `ROCKET_SENSE_APP_JWT_SECRET` to change the app token signing secret. Google
login requires:

```sh
ROCKET_SENSE_AUTH_MODE=google
ROCKET_SENSE_PUBLIC_BASE_URL=https://rocket-sense.duckdns.org
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
```

The Google OAuth client must allow redirect URI
`https://rocket-sense.duckdns.org/auth/google/callback`.
