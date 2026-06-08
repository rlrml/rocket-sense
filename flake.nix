{
  description = "rocket-sense development environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    subtr-actor-src = {
      url = "git+file:./vendor/subtr-actor";
      flake = false;
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
            in
            pkgs.lib.cleanSourceFilter path type
            && !(name == "subtr-actor" && parentName == "vendor")
            && !(name == "target" && type == "directory")
            && !(name == ".worktrees" && type == "directory")
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
          src = ./web;
          npmDeps = pkgs.importNpmLock { npmRoot = ./web; };
          npmConfigHook = pkgs.importNpmLock.npmConfigHook;
          npmBuildScript = "build";
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
          cargoBuildFlags = [
            "-p"
            "rocket-sense-server"
          ];
          cargoLock.lockFile = ./Cargo.lock;
          auditable = false;
          RUST_MIN_STACK = "268435456";
          inherit nativeBuildInputs buildInputs;
        };
      in
      {
        packages = {
          default = rocketSenseServer;
          rocket-sense-server = rocketSenseServer;
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
