import { lazy, type ComponentType, type LazyExoticComponent } from "react";

const chunkReloadSessionKey = "rocket_sense_chunk_reload_attempted_at";
const reloadCooldownMs = 60_000;

export function installChunkLoadRecovery(): void {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    reloadAfterChunkLoadFailure(event);
  });
}

export function lazyWithChunkLoadRecovery<T extends ComponentType<unknown>>(
  loader: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() => loader().catch(reloadAfterChunkLoadFailure));
}

function reloadAfterChunkLoadFailure(error: unknown): Promise<never> {
  if (isChunkLoadError(error) && markReloadAttempt()) {
    window.location.reload();
    return new Promise(() => undefined);
  }

  return Promise.reject(error);
}

function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return [
    "Failed to fetch dynamically imported module",
    "Importing a module script failed",
    "error loading dynamically imported module",
    "Loading chunk",
  ].some((text) => message.includes(text));
}

function markReloadAttempt(): boolean {
  const now = Date.now();

  try {
    const lastAttempt = Number(sessionStorage.getItem(chunkReloadSessionKey));
    if (Number.isFinite(lastAttempt) && now - lastAttempt < reloadCooldownMs) {
      return false;
    }
    sessionStorage.setItem(chunkReloadSessionKey, String(now));
    return true;
  } catch {
    return true;
  }
}
