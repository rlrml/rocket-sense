import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendTarget = process.env.ROCKET_SENSE_WEB_API_TARGET ?? "https://rocket-sense.duckdns.org";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: backendTarget,
        changeOrigin: true,
      },
      "/auth": {
        target: backendTarget,
        changeOrigin: true,
      },
      "/login": {
        target: backendTarget,
        changeOrigin: true,
      },
      "/subtr-actor": {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
});
