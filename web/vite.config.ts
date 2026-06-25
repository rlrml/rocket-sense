import { cpSync, existsSync, readFileSync, realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

// The subtr-actor git sha the vendored WASM was built from. Baked into the
// bundle so a client-side reprocess can prove to the server that its WASM
// matches the server's analysis version (a stale cached tab is rejected). Kept
// in sync with the server by scripts/sync-subtr-actor, which writes this file.
const subtrActorRev = (() => {
  try {
    return readFileSync(
      fileURLToPath(new URL("./vendor/@rlrml/.subtr-actor-rev", import.meta.url)),
      "utf8",
    ).trim();
  } catch {
    return "";
  }
})();

// Resolve a path to its real location, tolerating paths that don't exist yet.
// In a git worktree, node_modules and vendor/subtr-actor are often symlinks into
// the main checkout; vite resolves served files to their real paths before the
// fs.allow check, so those real locations must be allowed too or assets like the
// subtr-actor wasm module 403.
const realPathOf = (relative: string): string => {
  const path = fileURLToPath(new URL(relative, import.meta.url));
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
};
const fsAllow = [repoRoot, realPathOf("node_modules"), realPathOf("../vendor/subtr-actor")].filter(
  (path, index, all) => all.indexOf(path) === index,
);

const backendTarget = process.env.ROCKET_SENSE_WEB_API_TARGET ?? "https://rocket-sense.duckdns.org";

const apiProxy = {
  "/api": { target: backendTarget, changeOrigin: true },
  "/auth": { target: backendTarget, changeOrigin: true },
  "/login": { target: backendTarget, changeOrigin: true },
  "/events/review/open": { target: backendTarget, changeOrigin: true },
  "/mechanics/review/open": { target: backendTarget, changeOrigin: true },
  "/subtr-actor": { target: backendTarget, changeOrigin: true },
  "/models": { target: backendTarget, changeOrigin: true },
  "/draco": { target: backendTarget, changeOrigin: true },
};

const playerAssetCandidates = [
  fileURLToPath(new URL("./node_modules/@rlrml/player/dist", import.meta.url)),
  fileURLToPath(new URL("./vendor/@rlrml/player/dist", import.meta.url)),
];

function playerAssetDir(): string {
  const dir = playerAssetCandidates.find((candidate) => existsSync(candidate));
  if (!dir) {
    throw new Error(
      `Could not find @rlrml/player dist assets in ${playerAssetCandidates.join(" or ")}`,
    );
  }
  return dir;
}

function playerAssetPlugin(): Plugin {
  const assetDir = playerAssetDir();

  return {
    name: "rocket-sense-player-assets",
    closeBundle() {
      const outDir = fileURLToPath(new URL("./dist/vendor/@rlrml/player/dist", import.meta.url));
      cpSync(assetDir, outDir, { recursive: true });
    },
  };
}

export default defineConfig({
  define: {
    __SUBTR_ACTOR_REV__: JSON.stringify(subtrActorRev),
  },
  plugins: [react(), playerAssetPlugin()],
  // The replay player ships a web worker plus a wasm-bindgen module that load
  // via `new URL(..., import.meta.url)`. Keep them out of esbuild prebundling so
  // those asset URLs resolve correctly, and emit workers as ES modules.
  optimizeDeps: {
    exclude: ["@rlrml/player"],
  },
  worker: {
    format: "es",
  },
  server: {
    port: 5173,
    proxy: apiProxy,
    // Allow serving files from the repo root (e.g. vendored package realpaths),
    // plus the real locations of any worktree symlinks.
    fs: { allow: fsAllow },
  },
  preview: {
    port: 5173,
    proxy: apiProxy,
  },
});
