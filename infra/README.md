# Rocket Sense Infrastructure

The initial hosting target is the single-node k3s cluster on `railbird-sf`.

Terraform manages non-secret Kubernetes resources:

- namespace
- Postgres Deployment/PVC/Service
- Rocket Sense server Deployment/PVC/Service
- Rocket Sense replay processing worker Deployment

Secrets are deliberately not Terraform-managed because Kubernetes Secret values
are persisted into Terraform state. Instead, encrypted agenix files live under
`infra/secrets/`, and `infra/bin/apply-secrets` decrypts them directly into the
target Kubernetes namespace.

## Secret workflow

Encrypted files are safe to commit. Plaintext files are ignored.

To edit the Rocket Sense environment secret:

```sh
cd infra/secrets
RULES=./secrets.nix agenix -e rocket-sense.env.age
```

To apply it to the current Kubernetes context:

```sh
infra/bin/apply-secrets
```

The secret creates/updates a Kubernetes Secret named `rocket-sense-secrets` with
at least these keys:

- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `ROCKET_SENSE_AUTH_MODE`
- `ROCKET_SENSE_APP_JWT_SECRET`
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GITHUB_OAUTH_CLIENT_ID`
- `GITHUB_OAUTH_CLIENT_SECRET`
- `DISCORD_OAUTH_CLIENT_ID`
- `DISCORD_OAUTH_CLIENT_SECRET`
- `EPIC_OAUTH_CLIENT_ID`
- `EPIC_OAUTH_CLIENT_SECRET`
- `EPIC_OAUTH_DEPLOYMENT_ID`
- `XBOX_OAUTH_CLIENT_ID`
- `XBOX_OAUTH_CLIENT_SECRET`
- `STEAM_WEB_API_KEY`
- `BALLCHASING_API_KEY`

Terraform references that Secret by name but never reads or stores the values.

## Kubeconfig

For `railbird-sf`, create a local kubeconfig outside git:

```sh
mkdir -p .kube
ssh railbird-sf 'sudo cat /etc/rancher/k3s/k3s.yaml' > .kube/railbird-sf.yaml
perl -0pi -e 's#server: https://127\.0\.0\.1:6443#server: https://railbird-sf:6443#' .kube/railbird-sf.yaml
export KUBECONFIG="$PWD/.kube/railbird-sf.yaml"
```

Then apply:

```sh
just push-image
infra/bin/apply-secrets
cd infra/terraform
tofu init
tofu apply -var kubeconfig_path=../../.kube/railbird-sf.yaml
```

`terraform` also works if you prefer it over OpenTofu.

The same workflow is available as:

```sh
just deploy-railbird-sf
```

That target builds the container image with Nix, pushes it to the
`railbird-sf:5279` registry, applies the agenix-backed Kubernetes Secret, and
then applies Terraform.

## Edge routing

The Terraform stack exposes the service as a NodePort on `railbird-sf` at
`30080`. The current k3s install does not include Traefik or another ingress
controller, so host-level nginx is the initial edge proxy.

For now:

- Kubernetes resources are deployed by Terraform.
- The server container is built by Nix via `.#rocket-sense-server-image`.
- The replay processing worker uses the same image as the server with
  `ROCKET_SENSE_SERVICE_MODE=worker`.
- Host nginx should proxy `rbsf.tplinkdns.com` to `http://127.0.0.1:30080`.
- OAuth providers should use these redirect URIs:
  - Google: `https://rocket-sense.duckdns.org/auth/google/callback`
  - GitHub: `https://rocket-sense.duckdns.org/auth/github/callback`
  - Discord: `https://rocket-sense.duckdns.org/auth/discord/callback`
  - Epic Games: `https://rocket-sense.duckdns.org/auth/epic/callback`
  - Xbox: `https://rocket-sense.duckdns.org/auth/xbox/callback`
- Steam login uses Steam OpenID. Store the generated Steam Web API key as
  `STEAM_WEB_API_KEY`; the registered Steam domain should be
  `rocket-sense.duckdns.org`.
- Xbox OAuth credentials come from a Microsoft Entra app registration named
  `Rocket Sense`, configured for personal Microsoft accounts only, with a web
  platform redirect URI of
  `https://rocket-sense.duckdns.org/auth/xbox/callback`. Store the application
  client ID as `XBOX_OAUTH_CLIENT_ID` and a client secret value as
  `XBOX_OAUTH_CLIENT_SECRET`.

This leaves room to move edge routing into Kubernetes later by adding an ingress
controller and Terraform-managed Ingress resources.
