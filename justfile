# justfile for rocket-sense

nix_develop := "nix develop -c"
railbird_registry := env_var_or_default("ROCKET_SENSE_RAILBIRD_REGISTRY", "192.168.0.159:5279")

default:
    @just --list

build: web-build
    {{nix_develop}} cargo build --workspace

web-dev:
    cd web && npm run dev

web-dev-lan:
    cd web && npm run dev:lan

web-build:
    cd web && npm run build

web-typecheck:
    cd web && npm run typecheck

build-image:
    nix build .#rocket-sense-server-image

push-image: build-image
    {{nix_develop}} skopeo copy --dest-tls-verify=false docker-archive:result docker://{{railbird_registry}}/rocket-sense-server:dev

tf-init:
    {{nix_develop}} tofu -chdir=infra/terraform init

tf-plan:
    {{nix_develop}} tofu -chdir=infra/terraform plan -var kubeconfig_path=../../.kube/railbird-sf.yaml

tf-apply:
    {{nix_develop}} tofu -chdir=infra/terraform apply -var kubeconfig_path=../../.kube/railbird-sf.yaml

deploy-railbird-sf: push-image
    KUBECONFIG=$PWD/.kube/railbird-sf.yaml {{nix_develop}} infra/bin/apply-secrets
    {{nix_develop}} tofu -chdir=infra/terraform apply -var kubeconfig_path=../../.kube/railbird-sf.yaml

sync-subtr-actor rev='':
    ./scripts/sync-subtr-actor {{rev}}

test: web-build
    {{nix_develop}} cargo test --workspace

dev: web-build
    {{nix_develop}} cargo run -p rocket-sense-server

watch: web-build
    {{nix_develop}} cargo watch -x "run -p rocket-sense-server"

fmt:
    {{nix_develop}} cargo fmt

fmt-check:
    {{nix_develop}} cargo fmt -- --check

clippy: web-build
    {{nix_develop}} cargo clippy --workspace -- -D warnings

# Check migration version numbers are unique (matches CI; parallel PRs collide)
check-migrations:
    ./scripts/check-migration-versions.sh

# ---------------------------------------------------------------------------
# CI preflight gate
#
# `just check` mirrors the blocking lint/compile checks CI runs on every PR, so
# you can verify cleanliness before committing without the slow jobs. Run it
# clean before every commit. It deliberately omits `cargo test --workspace` and
# the release/image build -- run those targeted (e.g. `cargo test module_name`)
# or via `just test` when the change warrants it.
#
# NOTE: clippy uses CI's exact flags (`--workspace -- -D warnings`), so a warning
# in a test or any crate fails CI even though a plain `cargo build` passes.
# Prefer the `just clippy` / `just fmt-check` recipes over bare cargo, and the
# server crate embeds web/dist via build.rs, so clippy depends on `web-build`.
# ---------------------------------------------------------------------------

# Fast quality gate: migrations + web typecheck + Rust fmt/clippy. Run clean before every commit.
check: check-migrations web-typecheck fmt-check clippy
