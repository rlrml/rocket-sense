import type { ReplayModel, ReplayPlayer } from "@rlrml/player";

export const CONTACT_CAMERA_HEIGHT = 700;
export const CONTACT_CAMERA_FOV = 38;
export const CONTACT_FRAME_LEAD_FRACTION = 0.35;

export interface ReplayPosition {
  x: number;
  y: number;
  z: number;
}

export function contactCaptureMoment(
  replay: ReplayModel,
  touchFrame: number,
): { time: number; ballPosition: ReplayPosition | null } {
  const frameCount = replay.frames.length;
  if (frameCount === 0) {
    return { time: 0, ballPosition: null };
  }

  const currentFrame = Math.min(Math.max(Math.trunc(touchFrame), 0), frameCount - 1);
  const previousFrame = Math.max(0, currentFrame - 1);
  const currentTime = replay.frames[currentFrame]?.time ?? 0;
  const previousTime = replay.frames[previousFrame]?.time ?? currentTime;
  const frameDuration = Math.max(0, currentTime - previousTime);
  const time = Math.max(0, currentTime - frameDuration * CONTACT_FRAME_LEAD_FRACTION);

  return {
    time,
    ballPosition: interpolatePosition(
      replay.ballFrames[previousFrame]?.position ?? null,
      replay.ballFrames[currentFrame]?.position ?? null,
      1 - CONTACT_FRAME_LEAD_FRACTION,
    ),
  };
}

export function setContactOverheadCamera(
  player: ReplayPlayer,
  position: ReplayPosition | null,
): void {
  player.setFreeCameraPreset("overhead");
  if (!position) {
    return;
  }

  const { camera, controls } = player.sceneState;
  const targetX = position.x;
  const targetY = Math.max(100, position.z);
  const targetZ = position.y;
  controls.target.set(targetX, targetY, targetZ);
  camera.position.set(targetX, targetY + CONTACT_CAMERA_HEIGHT, targetZ);
  camera.up.set(1, 0, 0);
  camera.fov = CONTACT_CAMERA_FOV;
  camera.lookAt(controls.target);
  camera.updateProjectionMatrix();
  controls.update();
}

function interpolatePosition(
  previous: ReplayPosition | null,
  current: ReplayPosition | null,
  alpha: number,
): ReplayPosition | null {
  if (!previous) return current;
  if (!current) return previous;
  return {
    x: previous.x + (current.x - previous.x) * alpha,
    y: previous.y + (current.y - previous.y) * alpha,
    z: previous.z + (current.z - previous.z) * alpha,
  };
}
