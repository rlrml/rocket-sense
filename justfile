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
