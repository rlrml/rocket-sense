import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendTarget = process.env.ROCKET_SENSE_WEB_API_TARGET ?? "https://rocket-sense.duckdns.org";

const apiProxy = {
  "/api": { target: backendTarget, changeOrigin: true },
  "/auth": { target: backendTarget, changeOrigin: true },
  "/login": { target: backendTarget, changeOrigin: true },
  "/subtr-actor": { target: backendTarget, changeOrigin: true },
};

export default defineConfig({
  plugins: [react()],
  // The replay player ships a web worker plus a wasm-bindgen module that load
  // via `new URL(..., import.meta.url)`. Keep them out of esbuild prebundling so
  // those asset URLs resolve correctly, and emit workers as ES modules.
  optimizeDeps: {
    exclude: ["@rlrml/player", "@rlrml/subtr-actor"],
  },
  worker: {
    format: "es",
  },
  server: {
    port: 5173,
    proxy: apiProxy,
  },
  preview: {
    port: 5173,
    proxy: apiProxy,
  },
});
