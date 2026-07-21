// Easing + coordinate helpers shared by the cinematic camera and overlays.

/** Hermite smoothstep clamped to [0, 1] (viewer.js `_awSmoothstep`). */
export function smoothstep01(a: number): number {
  if (a < 0) return 0;
  if (a > 1) return 1;
  return a * a * (3 - 2 * a);
}

/** Quintic smootherstep clamped to [0, 1] — the rewind scrub curve. */
export function smootherstep01(a: number): number {
  const u = a < 0 ? 0 : a > 1 ? 1 : a;
  return u * u * u * (u * (u * 6 - 15) + 10);
}

export interface Vec3Like {
  x: number;
  y: number;
  z: number;
}

/**
 * Replay (raw UU, RL Z-up) → scene world coordinates. The player's scene maps
 * sceneX = replay.x, sceneY = replay.z (up), sceneZ = replay.y — the same
 * mapping contactCamera.ts uses when placing the overhead camera.
 */
export function uuToScene(x: number, y: number, z: number): { x: number; y: number; z: number } {
  return { x, y: z, z: y };
}
