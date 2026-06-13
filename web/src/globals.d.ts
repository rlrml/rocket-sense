/// <reference types="vite/client" />

// The subtr-actor git sha the vendored WASM was built from, injected by Vite's
// `define` (see vite.config.ts). Sent with a client-side reprocess so the
// server can reject a stale cached client whose WASM predates the server's
// analysis version.
declare const __SUBTR_ACTOR_REV__: string;
