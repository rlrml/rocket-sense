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
separate concepts. The deployed app uses OAuth login providers. The API
validates Rocket Sense bearer/session JWTs issued after provider verification
and maps provider identity to internal `users` rows.

The initial implementation has explicit development auth only:

```sh
ROCKET_SENSE_AUTH_MODE=dev
just dev
```

Open `/` in the browser for replay search, or `/login` for authentication. In
`ROCKET_SENSE_AUTH_MODE=oauth` or the legacy-compatible
`ROCKET_SENSE_AUTH_MODE=google`, the login page shows configured OAuth provider
buttons. In development mode, the login page offers a token form for local API
upload testing.

You can request a non-expiring development token from the API:

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

To avoid uploading bytes that Rocket Sense already has, compute the replay
SHA-256 locally and check it first:

```sh
SHA256=$(sha256sum /path/to/replay.replay | awk '{print $1}')

curl -s http://127.0.0.1:8080/api/v1/replays/by-sha256/$SHA256 \
  -H "Authorization: Bearer $TOKEN"
```

If the digest exists, the lookup returns the replay metadata. Duplicate `POST
/api/v1/replays` requests also return the existing replay with HTTP 200 and
`"deduplicated": true`; new uploads return HTTP 201 and `"created": true`.

Set `ROCKET_SENSE_APP_JWT_SECRET` to change the app token signing secret. OAuth
login requires `ROCKET_SENSE_PUBLIC_BASE_URL` plus at least one configured
provider:

```sh
ROCKET_SENSE_AUTH_MODE=oauth
ROCKET_SENSE_PUBLIC_BASE_URL=https://rocket-sense.duckdns.org
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GITHUB_OAUTH_CLIENT_ID=...
GITHUB_OAUTH_CLIENT_SECRET=...
DISCORD_OAUTH_CLIENT_ID=...
DISCORD_OAUTH_CLIENT_SECRET=...
```

Each provider only appears when both its client id and client secret are set.
Provider redirect URIs are:

- Google: `https://rocket-sense.duckdns.org/auth/google/callback`
- GitHub: `https://rocket-sense.duckdns.org/auth/github/callback`
- Discord: `https://rocket-sense.duckdns.org/auth/discord/callback`
