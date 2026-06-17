{
  description = "rocket-sense development environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
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
      subtr-actor-src,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        rustToolchain = fenix.packages.${system}.stable.toolchain;
        rustPlatform = pkgs.makeRustPlatform {
          cargo = rustToolchain;
          rustc = rustToolchain;
        };
        nativeBuildInputs = [
          pkgs.pkg-config
        ];
        buildInputs = [
          pkgs.openssl
        ];
        shellPackages =
          [
            rustToolchain
            fenix.packages.${system}.stable.rust-analyzer
            pkgs.cargo-watch
            pkgs.curl
            # gcloud + the GKE auth plugin so kubectl can authenticate to the
            # railbird-gke cluster (its kubeconfig user execs
            # gke-gcloud-auth-plugin).
            (pkgs.google-cloud-sdk.withExtraComponents [
              pkgs.google-cloud-sdk.components.gke-gcloud-auth-plugin
            ])
            pkgs.just
            pkgs.kubectl
            pkgs.nodejs
            pkgs.opentofu
            pkgs.skopeo
          ]
          ++ nativeBuildInputs
          ++ buildInputs;
        rocketSenseBaseSource = pkgs.lib.cleanSourceWith {
          src = ./.;
          filter =
            path: type:
            let
              name = baseNameOf path;
              parentName = baseNameOf (dirOf path);
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
            && !(name == "subtr-actor" && parentName == "vendor")
            # Exclude only the web app's own build output; vendored packages
            # under web/vendor/ legitimately contain committed dist/ trees.
            && !(type == "directory" && name == "dist" && parentName == "web")
            && !(type == "directory" && builtins.elem name excludedDirectories)
            && !(type == "regular" && builtins.elem name excludedFiles)
            && !(pkgs.lib.hasPrefix "result" name);
        };
        sourceWithSubtrActor = pkgs.runCommandLocal "rocket-sense-source" { } ''
          mkdir -p "$out"
          cp -R ${rocketSenseBaseSource}/. "$out"/
          chmod -R u+w "$out"
          rm -rf "$out/vendor/subtr-actor"
          mkdir -p "$out/vendor"
          cp -R ${subtr-actor-src} "$out/vendor/subtr-actor"
        '';
        rocketSenseWeb = pkgs.buildNpmPackage {
          pname = "rocket-sense-web";
          version = "0.1.0";
          src = sourceWithSubtrActor;
          sourceRoot = "rocket-sense-source/web";
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
        rocketSenseServer = rustPlatform.buildRustPackage {
          pname = "rocket-sense-server";
          version = "0.1.0";
          src = sourceWithSubtrActor;
          ROCKET_SENSE_GIT_SHA = self.rev or self.dirtyRev or "unknown";
          SUBTR_ACTOR_GIT_SHA = subtr-actor-src.rev or "unknown";
          ROCKET_SENSE_WEB_DIST = rocketSenseWeb;
          # subtr-actor static player/stats/review assets, built from the
          # submodule flake instead of committed under static/subtr-actor.
          ROCKET_SENSE_SUBTR_STATIC = subtr-actor-src.packages.${system}.js-stats-player-pages;
          cargoBuildFlags = [
            "-p"
            "rocket-sense-server"
          ];
          cargoLock = {
            lockFile = ./Cargo.lock;
            # Fetch git dependencies (e.g. the patched boxcars pinned by
            # vendored subtr-actor) via builtins.fetchGit so Cargo.lock stays
            # the single source of truth — no outputHashes to maintain.
            allowBuiltinFetchGit = true;
          };
          auditable = false;
          RUST_MIN_STACK = "268435456";
          inherit nativeBuildInputs buildInputs;
        };
      in
      {
        packages = {
          default = rocketSenseServer;
          rocket-sense-server = rocketSenseServer;
          rocket-sense-web = rocketSenseWeb;
          rocket-sense-server-image = pkgs.dockerTools.buildLayeredImage {
            name = "localhost:5279/rocket-sense-server";
            tag = "dev";
            contents = [
              pkgs.cacert
            ];
            config = {
              Cmd = [
                "${rocketSenseServer}/bin/rocket-sense-server"
              ];
              Env = [
                "SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
                "ROCKET_SENSE_BIND_ADDR=0.0.0.0:8080"
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
