# Training-pack publish: security follow-ups

The Epic-link / training-pack publish feature (`api/training_packs.rs`,
migration `0091_epic_account_links.sql`) deliberately did **not** change two
pre-existing server-wide behaviors that its design review flagged as
hardening concerns. They deserve a separate decision because tightening them
affects every endpoint, not just this feature:

1. **Non-expiring app JWTs.** Access tokens minted by `crate::auth` set no
   `exp` claim and the validation only requires `iss`. A leaked bearer token
   is therefore valid forever (until the shared `ROCKET_SENSE_APP_JWT_SECRET`
   rotates). Now that a bearer token can transitively publish to PsyNet as a
   user's linked Epic account (and rotate their stored refresh tokens), the
   blast radius of a stolen token is larger than before. Consider adding
   expiry + refresh, or at least per-user token revocation.

2. **Permissive global CORS.** `app.rs` applies `CorsLayer::permissive()` to
   the whole router. Combined with bearer-token auth this is mostly safe
   against classic CSRF, but it allows any origin to call the API with a
   token it has obtained by other means, and it applies equally to the new
   state-changing Epic-link endpoints. Consider an allowlist of known web
   origins.

Additional feature-scoped items worth revisiting later:

- **Key rotation.** Stored token ciphertexts carry a format version byte, but
  there is no re-encryption path for rotating
  `ROCKET_SENSE_EPIC_TOKEN_ENCRYPTION_KEY`. Rotation currently means users
  must re-link.
- **Rate limiting.** `POST /training-packs/publish` performs outbound Epic +
  PsyNet calls on behalf of the user; there is no per-user rate limit yet.
- **Audit trail.** Publishes are only visible in tracing logs; a
  `training_pack_publishes` table would let users see (and support debug)
  what was published with their link.
