{
  description = "rocket-sense development environment";

  nixConfig = {
    extra-substituters = [
      "https://rocket-sense.cachix.org"
    ];
    extra-trusted-public-keys = [
      "rocket-sense.cachix.org-1:URNAS7hJKReblHpK3kh5YiOiBFYTSyrJ5HAgawySFvU="
    ];
  };

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    agenix = {
      url = "github:ryantm/agenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    crane = {
      url = "github:ipetkov/crane";
    };
    # A flake input (not flake = false) so the web build can reference the
    # submodule's js package outputs (js-wasm-pkg / js-player-pkg /
    # js-viewer-pkg) directly instead of consuming committed copies under
    # web/vendor/@rlrml. `${subtr-actor-src}` still resolves to its source tree
    # for the Rust submodule injection below.
    subtr-actor-src = {
      url = "git+file:./vendor/subtr-actor";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      fenix,
      agenix,
      crane,
      subtr-actor-src,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        rustToolchain = fenix.packages.${system}.stable.toolchain;
        craneLib = ((crane.mkLib pkgs).overrideToolchain rustToolchain).overrideScope (
          _final: _prev: {
            stdenvSelector = pkgs: pkgs.gcc14Stdenv;
          }
        );
        nativeBuildInputs = [
          pkgs.pkg-config
        ];
        buildInputs = [
          pkgs.openssl
        ];
        flakeCommitTimestamp =
          input:
          let
            value = input.lastModifiedDate or "";
          in
          if builtins.stringLength value >= 14 then
            "${builtins.substring 0 4 value}-${builtins.substring 4 2 value}-${builtins.substring 6 2 value}T${builtins.substring 8 2 value}:${builtins.substring 10 2 value}:${builtins.substring 12 2 value}Z"
          else
            "unknown";
        shellPackages =
          [
            rustToolchain
            fenix.packages.${system}.stable.rust-analyzer
            # agenix: decrypts infra/secrets/*.age (see infra/bin/apply-secrets,
            # which runs `agenix -d`) using your SSH key.
            agenix.packages.${system}.default
            pkgs.cargo-watch
            pkgs.cachix
            pkgs.curl
            # gcloud + the GKE auth plugin so kubectl can authenticate to the
            # railbird-gke cluster (its kubeconfig user execs
            # gke-gcloud-auth-plugin).
            (pkgs.google-cloud-sdk.withExtraComponents [
              pkgs.google-cloud-sdk.components.gke-gcloud-auth-plugin
            ])
            pkgs.just
            pkgs.kubectl
            pkgs.librsvg
            pkgs.nodejs
            pkgs.opentofu
            pkgs.skopeo
          ]
          ++ nativeBuildInputs
          ++ buildInputs;
        cleanSourceFilter =
          path: type:
          let
            name = baseNameOf path;
            excludedDirectories = [
              ".direnv"
              ".kube"
              ".terraform"
              ".worktrees"
              "node_modules"
              "target"
            ];
            excludedFiles = [
              "terraform.tfstate"
              "terraform.tfstate.backup"
              "tsconfig.node.tsbuildinfo"
              "tsconfig.tsbuildinfo"
              "vite.config.d.ts"
              "vite.config.js"
            ];
          in
          pkgs.lib.cleanSourceFilter path type
          && !(type == "directory" && builtins.elem name excludedDirectories)
          && !(type == "regular" && builtins.elem name excludedFiles)
          && !(pkgs.lib.hasPrefix "result" name);
        rocketSenseRustBaseSource = pkgs.lib.cleanSourceWith {
          src = ./.;
          filter =
            path: type:
            let
              name = baseNameOf path;
              parentName = baseNameOf (dirOf path);
              root = toString ./.;
              relPath = pkgs.lib.removePrefix "${root}/" (toString path);
              topLevel = builtins.head (pkgs.lib.splitString "/" relPath);
            in
            cleanSourceFilter path type
            && !(name == "subtr-actor" && parentName == "vendor")
            && (
              builtins.elem relPath [
                "Cargo.lock"
                "Cargo.toml"
              ]
              || builtins.elem topLevel [
                "crates"
                "migrations"
                "vendor"
              ]
            );
        };
        cargoManifestFilter =
          path: type:
          type == "directory"
          || (
            type == "regular"
            && builtins.elem (baseNameOf path) [
              "Cargo.lock"
              "Cargo.toml"
            ]
          );
        rocketSenseCargoSource = pkgs.lib.cleanSourceWith {
          src = ./.;
          filter =
            path: type:
            let
              root = toString ./.;
              relPath = pkgs.lib.removePrefix "${root}/" (toString path);
            in
            cleanSourceFilter path type
            && cargoManifestFilter path type
            && !(pkgs.lib.hasPrefix "vendor/subtr-actor/" relPath);
        };
        subtrActorCargoSource = pkgs.lib.cleanSourceWith {
          src = subtr-actor-src;
          filter = cargoManifestFilter;
        };
        sourceWithSubtrActor = pkgs.runCommandLocal "rocket-sense-rust-source" { } ''
          mkdir -p "$out"
          cp -R ${rocketSenseRustBaseSource}/. "$out"/
          chmod -R u+w "$out"
          rm -rf "$out/vendor/subtr-actor"
          mkdir -p "$out/vendor"
          cp -R ${subtr-actor-src} "$out/vendor/subtr-actor"
        '';
        sourceWithSubtrActorCargoManifests =
          pkgs.runCommandLocal "rocket-sense-cargo-manifest-source" { }
            ''
              mkdir -p "$out"
              cp -R ${rocketSenseCargoSource}/. "$out"/
              chmod -R u+w "$out"
              rm -rf "$out/vendor/subtr-actor"
              mkdir -p "$out/vendor"
              cp -R ${subtrActorCargoSource} "$out/vendor/subtr-actor"
              chmod -R u+w "$out"
              find "$out" -name Cargo.toml -print0 | while IFS= read -r -d "" manifest; do
                crate_dir="$(dirname "$manifest")"
                mkdir -p "$crate_dir/src"
                printf '%s\n' 'pub fn __rocket_sense_nix_dummy() {}' >"$crate_dir/src/lib.rs"
                printf '%s\n' 'fn main() {}' >"$crate_dir/src/main.rs"
              done
            '';
        rocketSenseWebSource = pkgs.lib.cleanSourceWith {
          src = ./web;
          filter =
            path: type:
            let
              name = baseNameOf path;
              parentName = baseNameOf (dirOf path);
            in
            cleanSourceFilter path type
            # Exclude only the web app's own build output; vendored packages
            # under web/vendor/ legitimately contain committed dist/ trees.
            && !(type == "directory" && name == "dist" && parentName == "web");
        };
        rocketSenseWeb = pkgs.buildNpmPackage {
          pname = "rocket-sense-web";
          version = "0.1.0";
          src = rocketSenseWebSource;
          npmDeps = pkgs.importNpmLock { npmRoot = ./web; };
          npmConfigHook = pkgs.importNpmLock.npmConfigHook;
          # The @rlrml/* packages are `file:vendor/...` directory deps; copy them
          # into node_modules instead of symlinking to /nix/store paths so module
          # resolution from inside the packages stays within the web tree.
          npmInstallFlags = [ "--install-links" ];
          npmBuildScript = "build";
          # Populate the @rlrml/* packages straight from the subtr-actor flake
          # outputs. web/vendor/@rlrml now ships only package.json manifests in
          # git (built dist/wasm is gitignored + generated), so npm links empty
          # shells from the manifest-only vendor dirs; overwrite them here with
          # the real built packages for the exact pinned submodule rev.
          preBuild = ''
            mkdir -p node_modules/@rlrml
            rm -rf node_modules/@rlrml/subtr-actor node_modules/@rlrml/player node_modules/@rlrml/viewer
            cp -R ${subtr-actor-src.packages.${system}.js-wasm-pkg} node_modules/@rlrml/subtr-actor
            cp -R ${subtr-actor-src.packages.${system}.js-player-pkg} node_modules/@rlrml/player
            cp -R ${subtr-actor-src.packages.${system}.js-viewer-pkg} node_modules/@rlrml/viewer
            chmod -R u+w node_modules/@rlrml
          '';
          installPhase = ''
            runHook preInstall
            cp -R dist "$out"
            runHook postInstall
          '';
        };
        rocketSenseServerCommonArgs = {
          pname = "rocket-sense-server";
          version = "0.1.0";
          src = sourceWithSubtrActor;
          cargoExtraArgs = "-p rocket-sense-server";
          RUST_MIN_STACK = "1073741824";
          strictDeps = true;
          inherit nativeBuildInputs buildInputs;
        };
        rocketSenseServerCargoArtifacts = craneLib.buildDepsOnly (
          rocketSenseServerCommonArgs
          // {
            src = sourceWithSubtrActorCargoManifests;
          }
        );
        rocketSenseServer = craneLib.buildPackage (rocketSenseServerCommonArgs // {
          ROCKET_SENSE_GIT_SHA = self.rev or self.dirtyRev or "unknown";
          ROCKET_SENSE_GIT_COMMIT_TIMESTAMP = flakeCommitTimestamp self;
          SUBTR_ACTOR_GIT_SHA = subtr-actor-src.rev or "unknown";
          SUBTR_ACTOR_GIT_COMMIT_TIMESTAMP = flakeCommitTimestamp subtr-actor-src;
          ROCKET_SENSE_WEB_DIST = rocketSenseWeb;
          # subtr-actor static player/stats/review assets, built from the
          # submodule flake instead of committed under static/subtr-actor.
          ROCKET_SENSE_SUBTR_STATIC = subtr-actor-src.packages.${system}.js-stats-player-pages;
          ROCKET_SENSE_PLAYER_PUBLIC_STATIC = "${subtr-actor-src.packages.${system}.js-player-pkg}/public";
          cargoArtifacts = rocketSenseServerCargoArtifacts;
          nativeBuildInputs = nativeBuildInputs ++ [ pkgs.removeReferencesTo ];
          auditable = false;
          doCheck = false;
          postInstall = ''
            for leakedRustToolchain in $(grep -aoE '/nix/store/[0-9a-z]{32}-rust-mixed' "$out/bin/rocket-sense-server" | sort -u); do
              echo "stripping references to $leakedRustToolchain"
              remove-references-to -t "$leakedRustToolchain" "$out/bin/rocket-sense-server"
            done
          '';
        });
      in
      {
        packages = {
          default = rocketSenseServer;
          rocket-sense-server = rocketSenseServer;
          rocket-sense-web = rocketSenseWeb;
          rocket-sense-server-image =
            let
              # Entrypoint that optionally brings up the Mullvad/onetun egress
              # tunnel (when a WG key is provided) before exec'ing the server, so
              # the tunnel ships in-image with no sidecar / Deployment edits.
              # See scripts/container-entrypoint.sh.
              entrypoint = pkgs.writeShellScriptBin "rocket-sense-entrypoint" ''
                export PATH=${pkgs.lib.makeBinPath [ pkgs.onetun pkgs.dnsutils pkgs.coreutils ]}''${PATH:+:$PATH}
                exec ${pkgs.bash}/bin/bash ${./scripts/container-entrypoint.sh} "$@"
              '';
            in
            pkgs.dockerTools.buildLayeredImage {
              name = "localhost:5279/rocket-sense-server";
              tag = "dev";
              contents = [
                pkgs.cacert
              ];
              config = {
                Cmd = [
                  "${entrypoint}/bin/rocket-sense-entrypoint"
                ];
                Env = [
                  "SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
                  "ROCKET_SENSE_BIND_ADDR=0.0.0.0:8080"
                  "ROCKET_SENSE_SERVER_BIN=${rocketSenseServer}/bin/rocket-sense-server"
                ];
                ExposedPorts = {
                  "8080/tcp" = {};
                };
              };
            };
        };

        devShells.default = pkgs.mkShell {
          packages = shellPackages;

          shellHook = ''
            export REPO_ROOT=$(git rev-parse --show-toplevel)
            export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath buildInputs}:${pkgs.stdenv.cc.cc.lib.outPath}/lib:''${LD_LIBRARY_PATH:-}"
          '';
        };
      }
    );
}
