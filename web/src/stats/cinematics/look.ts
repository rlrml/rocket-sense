// Click-drag free-look shared by the per-mistake director and the film-room
// tour: orbit the camera around the followed car by accumulated yaw/pitch
// offsets; on release they decay back so the camera eases home. Extracted
// from the director unchanged so both surfaces feel identical.

import * as THREE from "three";
import type { PlayerRenderContext, ReplayPlayer } from "@rlrml/player";

const LOOK_SENSITIVITY = 1.4;
const AW_USER_LOOK_DECAY = 0.82;

export interface FreeLookControl {
  /** Add the pointer listeners to the container. */
  attach(): void;
  detach(): void;
  /** Hard-reset the accumulated look (a cinematic just took the camera). */
  cancel(): void;
  /**
   * Orbit the camera around the followed car; call after the frame's camera
   * write so the offset applies on top of the settled follow pose. No-op
   * unless a drag is active or decaying home.
   */
  apply(render: PlayerRenderContext, followCarId: string | null): void;
}

export function createFreeLookControl(options: {
  player: ReplayPlayer;
  container: HTMLElement;
  /** Gate for starting a drag (e.g. not while a cinematic owns the camera). */
  canLook(): boolean;
}): FreeLookControl {
  const { player, container } = options;
  const tmpPos = new THREE.Vector3();
  const look = {
    active: false,
    snapping: false,
    yaw: 0,
    pitch: 0,
    lastX: 0,
    lastY: 0,
  };
  let attached = false;

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0 || !options.canLook()) return;
    look.active = true;
    look.snapping = false;
    look.lastX = e.clientX;
    look.lastY = e.clientY;
    (e.currentTarget as HTMLElement | null)?.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!look.active) return;
    const dx = e.clientX - look.lastX;
    const dy = e.clientY - look.lastY;
    look.lastX = e.clientX;
    look.lastY = e.clientY;
    const camera = player.sceneState.camera;
    const height = Math.max(1, container.clientHeight);
    const sens = ((LOOK_SENSITIVITY * 2 * Math.tan((camera.fov * Math.PI) / 360)) / height) * 1.6;
    look.yaw -= dx * sens;
    look.pitch -= dy * sens;
  }

  function endLook() {
    if (!look.active) return;
    look.active = false;
    look.snapping = true;
  }

  return {
    attach() {
      if (attached) return;
      attached = true;
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", endLook);
      container.addEventListener("pointercancel", endLook);
    },
    detach() {
      if (!attached) return;
      attached = false;
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endLook);
      container.removeEventListener("pointercancel", endLook);
    },
    cancel() {
      look.active = false;
      look.snapping = false;
      look.yaw = 0;
      look.pitch = 0;
    },
    apply(render: PlayerRenderContext, followCarId: string | null) {
      if (!look.active && !look.snapping) return;
      if (look.snapping) {
        look.yaw *= AW_USER_LOOK_DECAY;
        look.pitch *= AW_USER_LOOK_DECAY;
        if (Math.abs(look.yaw) < 0.003 && Math.abs(look.pitch) < 0.003) {
          look.snapping = false;
          look.yaw = 0;
          look.pitch = 0;
          return;
        }
      }
      const car = followCarId ? (render.cars.find((c) => c.id === followCarId) ?? null) : null;
      const obj = car?.object3d;
      if (!obj || !car.visible) return;
      const camera = render.camera;
      const carPos = obj.position;
      tmpPos.subVectors(camera.position, carPos);
      const dist = tmpPos.length();
      if (dist < 0.1) return;
      const theta = Math.atan2(tmpPos.x, tmpPos.z) + look.yaw;
      let phi = Math.acos(Math.max(-1, Math.min(1, tmpPos.y / dist))) + look.pitch;
      phi = Math.max(0.05, Math.min(Math.PI - 0.05, phi));
      const sinPhi = Math.sin(phi);
      camera.position.set(
        carPos.x + dist * sinPhi * Math.sin(theta),
        carPos.y + dist * Math.cos(phi),
        carPos.z + dist * sinPhi * Math.cos(theta),
      );
      camera.lookAt(carPos);
    },
  };
}
