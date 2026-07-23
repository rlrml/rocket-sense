// Standalone Vitest config. Without this file Vitest falls back to loading
// vite.config.ts, whose playerAssetPlugin() throws at config-load time when
// the nix-built vendor/@rlrml/player/dist assets are absent — killing a
// pure-logic suite (the cinematics tests only `import type` from
// @rlrml/player) with a misleading vendor error for anyone without nix.
// The suite needs none of the app's Vite plugins, so keep this minimal.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
