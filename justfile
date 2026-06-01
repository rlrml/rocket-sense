# justfile for rocket-sense

nix_develop := "nix develop -c"
railbird_registry := env_var_or_default("ROCKET_SENSE_RAILBIRD_REGISTRY", "192.168.0.159:5279")

default:
    @just --list

build:
    {{nix_develop}} cargo build --workspace

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

test:
    {{nix_develop}} cargo test --workspace

dev:
    {{nix_develop}} cargo run -p rocket-sense-server

watch:
    {{nix_develop}} cargo watch -x "run -p rocket-sense-server"

fmt:
    {{nix_develop}} cargo fmt

fmt-check:
    {{nix_develop}} cargo fmt -- --check

clippy:
    {{nix_develop}} cargo clippy --workspace -- -D warnings
