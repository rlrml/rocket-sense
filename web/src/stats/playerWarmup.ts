import { PLAYER_ASSET_BASE } from "./playerAssets";

type PlayerWarmupModule = {
  createBallchasingOverlayPlugin?: (options: Record<string, unknown>) => unknown;
  createBoostPadsPlugin?: () => unknown;
  createNameTagPlugin?: () => unknown;
  createPlayerFromParsed?: (
    container: HTMLElement,
    loadedReplay: unknown,
    options: Record<string, unknown>,
  ) => WarmedReplayPlayer;
  ensureBindingsReady?: () => Promise<void>;
  fromReplayPlayerPlugin?: (plugin: unknown) => unknown;
  resolvePlayerAssetUrl?: (path: string, assetBase?: string | null) => string;
  setPlayerAssetBase?: (assetBase: string | null) => void;
};

type WarmedReplayPlayer = {
  destroy?: () => void;
  pause?: () => void;
  ready?: Promise<void>;
  render?: () => void;
  setFreeCameraPreset?: (preset: string) => void;
};

type PreviewAsset = {
  path: string;
  as: "fetch" | "image" | "script";
};

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export type PreviewPlayerWarmupStatus =
  | "idle"
  | "scheduled"
  | "warming-runtime"
  | "runtime-ready"
  | "warming-player"
  | "ready"
  | "error";

const PREVIEW_PLAYER_ASSETS: PreviewAsset[] = [
  { path: "models/stadium/stadium.glb", as: "fetch" },
  { path: "models/ball/scene.gltf", as: "fetch" },
  { path: "models/ball/scene.bin", as: "fetch" },
  { path: "models/ball/textures/Mat.3_baseColor.png", as: "image" },
  { path: "models/wheels/Wheel_Boog.glb", as: "fetch" },
  { path: "draco/draco_decoder.js", as: "script" },
  { path: "draco/draco_wasm_wrapper.js", as: "script" },
  { path: "draco/draco_decoder.wasm", as: "fetch" },
];

const replayWarmupCache = new Map<string, Promise<void>>();
const prefetchedUrls = new Set<string>();
const statusListeners = new Set<(status: PreviewPlayerWarmupStatus) => void>();
let warmupStatus: PreviewPlayerWarmupStatus = "idle";
let runtimeWarmup: Promise<void> | null = null;
let warmedPlayerContainer: HTMLDivElement | null = null;

export function schedulePreviewPlayerWarmup(replayId: string | null): () => void {
  if (warmupStatus === "idle" || warmupStatus === "error") {
    setWarmupStatus("scheduled");
  }
  return scheduleIdleTask(() => {
    const warmup = replayId ? warmPreviewPlayerForReplay(replayId) : warmPreviewPlayerRuntime();
    void warmup.catch((error: unknown) => {
      console.debug("Preview player warmup failed:", error);
    });
  });
}

export async function warmPreviewPlayerForReplay(replayId: string): Promise<void> {
  await warmPreviewPlayerRuntime();
  await warmPreviewReplay(replayId);
}

export function getPreviewPlayerWarmupStatus(): PreviewPlayerWarmupStatus {
  return warmupStatus;
}

export function subscribePreviewPlayerWarmupStatus(
  listener: (status: PreviewPlayerWarmupStatus) => void,
): () => void {
  statusListeners.add(listener);
  listener(warmupStatus);
  return () => {
    statusListeners.delete(listener);
  };
}

async function warmPreviewPlayerRuntime(): Promise<void> {
  if (!runtimeWarmup) {
    setWarmupStatus("warming-runtime");
    runtimeWarmup = (async () => {
      await import("./EventClipPlayer");
      const playerModule = (await import("@rlrml/player")) as unknown as PlayerWarmupModule;

      playerModule.setPlayerAssetBase?.(PLAYER_ASSET_BASE);
      prefetchPreviewPlayerAssets(playerModule);
      await playerModule.ensureBindingsReady?.();
      setWarmupStatus("runtime-ready");
    })();
    runtimeWarmup.catch(() => {
      runtimeWarmup = null;
      setWarmupStatus("error");
    });
  }
  return runtimeWarmup;
}

async function warmPreviewReplay(replayId: string): Promise<void> {
  const existing = replayWarmupCache.get(replayId);
  if (existing) {
    return existing;
  }
  const pending = (async () => {
    setWarmupStatus("warming-player");
    const { preloadReplay } = await import("./replayModel");
    const loadedReplay = await preloadReplay(replayId);
    await warmPreviewRenderer(loadedReplay);
    setWarmupStatus("ready");
  })();
  replayWarmupCache.set(replayId, pending);
  pending.catch(() => {
    replayWarmupCache.delete(replayId);
  });
  return pending;
}

async function warmPreviewRenderer(loadedReplay: unknown): Promise<void> {
  if (typeof document === "undefined") {
    return;
  }
  const playerModule = (await import("@rlrml/player")) as unknown as PlayerWarmupModule;
  if (!playerModule.createPlayerFromParsed) {
    return;
  }

  const container = document.createElement("div");
  warmedPlayerContainer?.remove();
  warmedPlayerContainer = container;
  container.className = "event-clip-player-warmup";
  Object.assign(container.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: "320px",
    height: "180px",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.appendChild(container);

  const player = playerModule.createPlayerFromParsed(container, loadedReplay, {
    assetBase: PLAYER_ASSET_BASE,
    initialCameraViewMode: "free",
    initialPlaybackRate: 1,
    autoplay: false,
    initialBallCamEnabled: true,
    initialCameraDistanceScale: 1,
    initialSkipKickoffsEnabled: false,
    initialSkipPostGoalTransitionsEnabled: false,
    environment: false,
    plugins: previewPlayerPlugins(playerModule),
  });

  try {
    player.setFreeCameraPreset?.("side");
    await withTimeout(player.ready ?? Promise.resolve(), 12000);
    player.render?.();
    player.pause?.();
  } finally {
    player.destroy?.();
    if (warmedPlayerContainer === container) {
      warmedPlayerContainer = null;
    }
    container.remove();
  }
}

function previewPlayerPlugins(playerModule: PlayerWarmupModule): unknown[] {
  const plugins: unknown[] = [];
  const boostPads = playerModule.createBoostPadsPlugin?.();
  if (boostPads) {
    plugins.push(boostPads);
  }
  const nameTags = playerModule.createNameTagPlugin?.();
  if (nameTags) {
    plugins.push(nameTags);
  }
  const overlay =
    playerModule.createBallchasingOverlayPlugin &&
    playerModule.fromReplayPlayerPlugin?.(
      playerModule.createBallchasingOverlayPlugin({
        showFloatingNames: false,
        showFloatingBoostBars: true,
        showTeamBoostHud: false,
      }),
    );
  if (overlay) {
    plugins.push(overlay);
  }
  return plugins;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: number | null = null;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(
      () => reject(new Error("Timed out warming preview player renderer.")),
      timeoutMs,
    );
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId != null) {
      window.clearTimeout(timeoutId);
    }
  }
}

function prefetchPreviewPlayerAssets(playerModule: PlayerWarmupModule): void {
  if (typeof document === "undefined") {
    return;
  }
  for (const asset of PREVIEW_PLAYER_ASSETS) {
    prefetchAsset(resolveAssetUrl(asset.path, playerModule), asset.as);
  }
}

function resolveAssetUrl(path: string, playerModule: PlayerWarmupModule): string {
  const resolved = playerModule.resolvePlayerAssetUrl?.(path, PLAYER_ASSET_BASE);
  if (resolved) {
    return resolved;
  }
  return new URL(path.replace(/^\/+/, ""), new URL(PLAYER_ASSET_BASE, window.location.href)).href;
}

function prefetchAsset(href: string, as: PreviewAsset["as"]): void {
  if (prefetchedUrls.has(href)) {
    return;
  }
  prefetchedUrls.add(href);

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  link.as = as;
  (link as HTMLLinkElement & { fetchPriority?: "low" }).fetchPriority = "low";
  document.head.appendChild(link);
}

function setWarmupStatus(status: PreviewPlayerWarmupStatus): void {
  if (warmupStatus === status) {
    return;
  }
  warmupStatus = status;
  for (const listener of statusListeners) {
    listener(status);
  }
}

function scheduleIdleTask(task: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  let cancelled = false;
  const run = () => {
    if (!cancelled) {
      task();
    }
  };

  const idleWindow = window as IdleWindow;
  if (
    typeof idleWindow.requestIdleCallback === "function" &&
    typeof idleWindow.cancelIdleCallback === "function"
  ) {
    const handle = idleWindow.requestIdleCallback(run, { timeout: 5000 });
    return () => {
      cancelled = true;
      idleWindow.cancelIdleCallback(handle);
    };
  }

  const handle = window.setTimeout(run, 1500);
  return () => {
    cancelled = true;
    window.clearTimeout(handle);
  };
}
