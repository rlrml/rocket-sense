// The cinematic director: a ReplayPlayer plugin that owns the playback clock
// and camera while an analysis-walkthrough cinematic runs, and the
// EventClipPlayer-facing control handle around it. This is the integration
// half of the port — viewer.js's `tick()` clock ownership, camera-mode
// dispatch, `_awApplyCinematicCamera`, `_updateBangHighlight`, callout
// projection, and the user free-look overlay.
//
// It must be installed with `player.addPlugin(...)` (never `onBeforeRender`):
// plugin beforeRender hooks run in install order *after* the camera plugin
// writes the follow camera, so writes here win the frame — and the pans can
// read the settled follow pose the camera plugin just produced (the same
// trick viewer.js plays by running `updateFollowPlayerCamera` first and
// lerping from a saved source pose).
//
// Transport: the player clamps setPlaybackRate to >= 0.1 and can't run
// backwards, so the director drives phases with its own wall clock and maps
// the effective speed onto the transport — play + setPlaybackRate in the
// normal/slow ranges, pause for freezes, and pause + per-frame seek for the
// rewind scrub and the sub-0.1x decel tails.

import * as THREE from "three";
import type { PlayerPlugin, PlayerRenderContext, ReplayModel, ReplayPlayer } from "@rlrml/player";

type CarRenderState = PlayerRenderContext["cars"][number];
import { CalloutOverlay } from "./callout";
import {
  AW_PHASE_BANG_PAN_IN_SEC,
  AW_PHASE_BANG_PAN_OUT_SEC,
  AW_PHASE_REWIND_SEC,
  AW_PHASE_WTC_PAN_SEC,
  AW_PHASE_ZOOM_SEC,
  BANG_CAM_HEIGHT_UU,
  BANG_CONE_APEX_Y_UU,
  BANG_CONE_HALF_ANGLE,
  BANG_CONE_RANGE_UU,
  BANG_SIDE_DIST_MIN_UU,
  BANG_WALL_MARGIN_UU,
  BIRDS_FIT_MARGIN_UU,
  BIRDS_HEIGHT_MAX_UU,
  BIRDS_HEIGHT_MIN_UU,
  CEILING_Z_UU,
  DEFAULT_CALLOUT_COLOR,
  FIELD_HALF_X_UU,
  FIELD_HALF_Y_UU,
  MISTAKE_COLORS,
  TEAM_COLOR_BLUE,
  TEAM_COLOR_ORANGE,
  type CinematicMistake,
} from "./constants";
import { resolveCalloutText } from "./copy";
import { smoothstep01, smootherstep01, uuToScene } from "./math";
import { BangConeOverlay, ChevronPathOverlay, FocusRingOverlay } from "./overlays";
import {
  buildChevronControlPoints,
  computeMistakePath,
  type ChevronControlPoints,
  type MistakePath,
} from "./path";
import {
  advancePhase,
  calloutPhaseView,
  cinematicOwnsCamera,
  createAwState,
  abortAwState,
  effectiveSpeed,
  resetAwState,
  type AwState,
} from "./phases";
import { trackIndexByName } from "./sampling";
import { findDoubleCommitTeammateIdx, resolveCinematicTeammateIdx } from "./teammate";

/** Contract EventClipPlayer holds while a clip carries a cinematic. */
export interface CinematicDirector {
  attach(): void;
  detach(): void;
  /** True while the director owns clock/camera — suspend the loop enforcers. */
  isEngaged(): boolean;
  /** An external seek happened (loop wrap, clip re-apply, user scrub). */
  notifyExternalSeek(): void;
}

export interface CinematicDirectorContext {
  player: ReplayPlayer;
  replay: ReplayModel;
  /** The clip canvas container (DOM overlays mount here). */
  container: HTMLElement;
  /** Track id of the mistake's focus player. */
  focusTrackId: string;
  /** The clip's own playback rate (viewer.js `state.playbackSpeed`). */
  basePlaybackRate: number;
}

const LOOK_SENSITIVITY = 1.4;
const AW_USER_LOOK_DECAY = 0.82;

export function createMistakeCinematicDirector(
  m: CinematicMistake,
  ctx: CinematicDirectorContext,
): CinematicDirector {
  const { player, replay, container } = ctx;
  const aw: AwState = createAwState();
  const focusIdx = resolveFocusIdx(replay, ctx.focusTrackId, m.player);
  const basePlaybackRate = ctx.basePlaybackRate;

  // Lazily resolved / cached per director lifetime (viewer.js cached these on
  // the mistake object itself).
  let teammateIdx: number | undefined;
  let anchorPartnerIdx: number | undefined;
  let path: MistakePath | null | undefined;
  let chevronControl: ChevronControlPoints | null | undefined;

  const fromPos = new THREE.Vector3();
  const fromQuat = new THREE.Quaternion();
  const tmpPos = new THREE.Vector3();
  const tmpTarget = new THREE.Vector3();
  const tmpQuatA = new THREE.Quaternion();
  const tmpQuatB = new THREE.Quaternion();
  const tmpMat = new THREE.Matrix4();
  const tmpProj = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);

  const userLook = {
    active: false,
    snapping: false,
    yaw: 0,
    pitch: 0,
    lastX: 0,
    lastY: 0,
  };

  let removePlugin: (() => void) | null = null;
  let callout: CalloutOverlay | null = null;
  let chevrons: ChevronPathOverlay | null = null;
  let bangCone: BangConeOverlay | null = null;
  let focusRing: FocusRingOverlay | null = null;
  let lastNow: number | null = null;
  let lastRateSet: number | null = null;
  let attachedTeammate = false;

  function resolveTeammateIdx(): number {
    if (teammateIdx === undefined) {
      teammateIdx = resolveCinematicTeammateIdx(replay, m, focusIdx);
    }
    return teammateIdx;
  }

  function resolvePath(): MistakePath | null {
    if (path === undefined) {
      path = computeMistakePath(replay, m, focusIdx);
    }
    return path;
  }

  function resolveChevronControl(): ChevronControlPoints | null {
    if (chevronControl === undefined) {
      const p = resolvePath();
      chevronControl = p ? buildChevronControlPoints(m.kind, p) : null;
    }
    return chevronControl;
  }

  function lookQuat(from: THREE.Vector3, at: THREE.Vector3, out: THREE.Quaternion) {
    tmpMat.lookAt(from, at, worldUp);
    out.setFromRotationMatrix(tmpMat);
  }

  function focusTrackIdOrNull(): string | null {
    return focusIdx >= 0 ? replay.players[focusIdx].id : null;
  }

  function attachTrack(idx: number) {
    const track = replay.players[idx];
    if (!track) return;
    player.setAttachedPlayer(track.id);
    player.setBallCamEnabled(true);
  }

  function restoreFocusAttachment() {
    if (!attachedTeammate) return;
    attachedTeammate = false;
    const id = focusTrackIdOrNull();
    if (id != null) {
      player.setAttachedPlayer(id);
      player.setBallCamEnabled(true);
    }
  }

  function carById(render: PlayerRenderContext, idx: number): CarRenderState | null {
    const track = replay.players[idx];
    if (!track) return null;
    return render.cars.find((car) => car.id === track.id) ?? null;
  }

  /** Car ground position in UU from its rendered (scene-space) object. */
  function carUu(car: CarRenderState): { x: number; y: number; z: number } | null {
    const obj = car.object3d;
    if (!obj || !car.visible) return null;
    // Scene → UU is the same y/z swap as UU → scene.
    return { x: obj.position.x, y: obj.position.z, z: obj.position.y };
  }

  // ---- Transport --------------------------------------------------------------

  function ensurePlaying(render: PlayerRenderContext) {
    if (!render.state.playing) player.play();
  }

  function ensurePaused(render: PlayerRenderContext) {
    if (render.state.playing) player.pause();
  }

  function applyTransport(render: PlayerRenderContext, dt: number) {
    if (aw.phase === "rewind") {
      // Rewind owns currentTime: quintic smootherstep from the slow-end
      // position back to the anchor — gentler at both ends than smoothstep.
      ensurePaused(render);
      const a = smootherstep01(aw.phaseElapsed / AW_PHASE_REWIND_SEC);
      player.seek(aw.rewindFromTime + (aw.rewindToTime - aw.rewindFromTime) * a);
      return;
    }
    const eff = effectiveSpeed(aw, m, basePlaybackRate, render.currentTime);
    if (eff <= 0) {
      ensurePaused(render);
      return;
    }
    // The player clamps rates below 0.1x, so the decel tails hand the clock
    // to the director: paused transport advanced by per-frame seeks.
    if (eff < 0.1) {
      ensurePaused(render);
      player.seek(Math.min(player.duration, render.currentTime + dt * eff));
      return;
    }
    ensurePlaying(render);
    if (lastRateSet === null || Math.abs(lastRateSet - eff) > 1e-3) {
      player.setPlaybackRate(eff);
      lastRateSet = eff;
    }
  }

  // ---- Camera -----------------------------------------------------------------

  function birdsPose(camera: THREE.PerspectiveCamera): {
    pos: THREE.Vector3;
    target: THREE.Vector3;
  } {
    // RLVision parked at a fixed 18000 UU; fit from the live fov/aspect
    // instead so the whole field fills any canvas shape. Straight-down view:
    // screen-vertical spans field length (y_uu), horizontal spans width.
    const vHalf = (camera.fov * Math.PI) / 360;
    const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    const h = Math.max(
      (FIELD_HALF_Y_UU + BIRDS_FIT_MARGIN_UU) / Math.tan(vHalf),
      (FIELD_HALF_X_UU + BIRDS_FIT_MARGIN_UU) / Math.tan(hHalf),
    );
    const height = Math.min(BIRDS_HEIGHT_MAX_UU, Math.max(BIRDS_HEIGHT_MIN_UU, h));
    // The tiny +z keeps lookAt's up vector resolvable when looking straight
    // down (same trick as viewer.js's birdsPos z=0.01).
    return {
      pos: new THREE.Vector3(0, height, 0.01),
      target: new THREE.Vector3(0, 0, 0),
    };
  }

  interface BangSolveResult {
    pos: THREE.Vector3;
    target: THREE.Vector3;
  }

  /**
   * Perpendicular sideview framing the open-space cone: aims at the cone
   * midpoint, pulls back far enough that the whole fan fits the tighter FOV
   * axis, prefers a side whose camera lands inside the arena (falling back to
   * the less-crowded half), and clamps inside walls/ceiling. UU math; result
   * in scene coordinates.
   */
  function solveBangSideview(
    render: PlayerRenderContext,
    focusCar: CarRenderState,
    camera: THREE.PerspectiveCamera,
  ): BangSolveResult | null {
    const car = carUu(focusCar);
    if (!car) return null;
    const track = replay.players[focusIdx];
    const forward = track?.isTeamZero === false ? -1 : 1;
    const netY = forward * FIELD_HALF_Y_UU;
    // Aim the cone at the opposition net so it angles toward goal when the
    // player is off to one side.
    const aimLen = Math.hypot(-car.x, netY - car.y) || 1;
    const aimX = -car.x / aimLen;
    const aimY = (netY - car.y) / aimLen;
    const coneMid = BANG_CONE_APEX_Y_UU + BANG_CONE_RANGE_UU / 2;
    const centerX = car.x + aimX * coneMid;
    const centerY = car.y + aimY * coneMid;
    const coneReach = (BANG_CONE_RANGE_UU + BANG_CONE_APEX_Y_UU) / 2;
    const coneWide = Math.sin(BANG_CONE_HALF_ANGLE) * BANG_CONE_RANGE_UU;
    const coneRadius = Math.hypot(coneReach, coneWide);
    const vHalf = (camera.fov * Math.PI) / 360;
    const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    const sideDist = Math.max(
      BANG_SIDE_DIST_MIN_UU,
      (coneRadius * 1.3) / Math.sin(Math.min(vHalf, hHalf)),
    );
    const minCamX = -FIELD_HALF_X_UU + BANG_WALL_MARGIN_UU;
    const maxCamX = FIELD_HALF_X_UU - BANG_WALL_MARGIN_UU;
    const leftFits = centerX - sideDist >= minCamX;
    const rightFits = centerX + sideDist <= maxCamX;
    let sideSign: number;
    if (leftFits && !rightFits) sideSign = -1;
    else if (rightFits && !leftFits) sideSign = 1;
    else {
      let leftCount = 0;
      let rightCount = 0;
      for (const other of render.cars) {
        if (other.id === focusCar.id || !other.visible || !other.object3d) continue;
        if (other.object3d.position.x < 0) leftCount++;
        else rightCount++;
      }
      if (leftCount < rightCount) sideSign = -1;
      else if (rightCount < leftCount) sideSign = 1;
      else sideSign = centerX >= 0 ? -1 : 1;
    }
    let camX = centerX + sideSign * sideDist;
    let camZ = car.z + BANG_CAM_HEIGHT_UU;
    let camY = centerY;
    camX = Math.max(minCamX, Math.min(maxCamX, camX));
    camZ = Math.max(BANG_WALL_MARGIN_UU, Math.min(CEILING_Z_UU - BANG_WALL_MARGIN_UU, camZ));
    camY = Math.max(
      -FIELD_HALF_Y_UU + BANG_WALL_MARGIN_UU,
      Math.min(FIELD_HALF_Y_UU - BANG_WALL_MARGIN_UU, camY),
    );
    const targetX = Math.max(minCamX, Math.min(maxCamX, centerX));
    const targetY = Math.max(
      -FIELD_HALF_Y_UU + BANG_WALL_MARGIN_UU,
      Math.min(FIELD_HALF_Y_UU - BANG_WALL_MARGIN_UU, centerY),
    );
    const posScene = uuToScene(camX, camY, camZ);
    const targetScene = uuToScene(targetX, targetY, car.z);
    return {
      pos: new THREE.Vector3(posScene.x, posScene.y, posScene.z),
      target: new THREE.Vector3(targetScene.x, targetScene.y, targetScene.z),
    };
  }

  /** Drive the camera for phases the cinematic owns. True when it did. */
  function applyCinematicCamera(render: PlayerRenderContext): boolean {
    const camera = render.camera;
    if (aw.phase === "wtc_pan" || aw.phase === "wtc_unpan") {
      // The camera plugin already ran this frame attached to the destination
      // player — camera.position/quaternion hold its settled output. Overlay
      // a smoothstep lerp from the saved source pose; at a=1 the camera
      // matches what the follow cam would set on its own, so the handoff is
      // seamless.
      tmpPos.copy(camera.position);
      tmpQuatA.copy(camera.quaternion);
      const a = smoothstep01(aw.phaseElapsed / AW_PHASE_WTC_PAN_SEC);
      camera.position.copy(fromPos).lerp(tmpPos, a);
      camera.quaternion.copy(fromQuat).slerp(tmpQuatA, a);
      return true;
    }
    if (aw.phase === "bang_wait") {
      // Hold the pose latched at the decel→wait handoff so the camera sits
      // perfectly still while playback is frozen (the follow cam would keep
      // easing and read as drift).
      camera.position.copy(fromPos);
      camera.quaternion.copy(fromQuat);
      return true;
    }
    if (aw.phase === "bang_pan_in" || aw.phase === "bang_hold" || aw.phase === "bang_pan_out") {
      const focusCar = carById(render, focusIdx);
      const solved = focusCar && camera ? solveBangSideview(render, focusCar, camera) : null;
      if (solved) {
        tmpPos.copy(solved.pos);
        tmpTarget.copy(solved.target);
        lookQuat(tmpPos, tmpTarget, tmpQuatA);
      } else {
        tmpPos.copy(fromPos);
        tmpQuatA.copy(fromQuat);
      }
      if (aw.phase === "bang_pan_in") {
        const a = smoothstep01(aw.phaseElapsed / AW_PHASE_BANG_PAN_IN_SEC);
        camera.position.copy(fromPos).lerp(tmpPos, a);
        camera.quaternion.copy(fromQuat).slerp(tmpQuatA, a);
      } else if (aw.phase === "bang_hold") {
        camera.position.copy(tmpPos);
        camera.quaternion.copy(tmpQuatA);
      } else {
        const a = smoothstep01(aw.phaseElapsed / AW_PHASE_BANG_PAN_OUT_SEC);
        camera.position.copy(tmpPos).lerp(fromPos, a);
        camera.quaternion.copy(tmpQuatA).slerp(fromQuat, a);
      }
      return true;
    }
    if (aw.phase === "birds") {
      const birds = birdsPose(camera);
      camera.position.copy(birds.pos);
      lookQuat(birds.pos, birds.target, tmpQuatA);
      camera.quaternion.copy(tmpQuatA);
      return true;
    }
    if (aw.phase === "zoom_out") {
      const birds = birdsPose(camera);
      const a = smoothstep01(aw.phaseElapsed / AW_PHASE_ZOOM_SEC);
      camera.position.copy(fromPos).lerp(birds.pos, a);
      lookQuat(birds.pos, birds.target, tmpQuatA);
      camera.quaternion.copy(fromQuat).slerp(tmpQuatA, a);
      return true;
    }
    if (aw.phase === "zoom_in") {
      // Descend from the bird's-eye onto the focus player's follow pose. The
      // destination is the camera plugin's live output this frame (it keeps
      // converging toward the settled follow cam), so at a=1 the handoff to
      // plain following is seamless — viewer.js used an analytic destination;
      // reading the plugin's own output is the native equivalent.
      tmpPos.copy(camera.position);
      tmpQuatB.copy(camera.quaternion);
      const birds = birdsPose(camera);
      const a = smoothstep01(aw.phaseElapsed / AW_PHASE_ZOOM_SEC);
      camera.position.copy(birds.pos).lerp(tmpPos, a);
      lookQuat(birds.pos, birds.target, tmpQuatA);
      camera.quaternion.copy(tmpQuatA).slerp(tmpQuatB, a);
      return true;
    }
    return false;
  }

  /**
   * Click-drag free-look on top of the follow cam during phases the cinematic
   * doesn't own: orbit the camera around the followed car by the accumulated
   * yaw/pitch offsets; on release they decay back so the camera eases home.
   */
  function applyUserLook(render: PlayerRenderContext) {
    if (!userLook.active && !userLook.snapping) return;
    if (userLook.snapping) {
      userLook.yaw *= AW_USER_LOOK_DECAY;
      userLook.pitch *= AW_USER_LOOK_DECAY;
      if (Math.abs(userLook.yaw) < 0.003 && Math.abs(userLook.pitch) < 0.003) {
        userLook.snapping = false;
        userLook.yaw = 0;
        userLook.pitch = 0;
        return;
      }
    }
    const followIdx = attachedTeammate ? resolveTeammateIdx() : focusIdx;
    const car = carById(render, followIdx >= 0 ? followIdx : focusIdx);
    const obj = car?.object3d;
    if (!obj || !car.visible) return;
    const camera = render.camera;
    const carPos = obj.position;
    tmpPos.subVectors(camera.position, carPos);
    const dist = tmpPos.length();
    if (dist < 0.1) return;
    const theta = Math.atan2(tmpPos.x, tmpPos.z) + userLook.yaw;
    let phi = Math.acos(Math.max(-1, Math.min(1, tmpPos.y / dist))) + userLook.pitch;
    phi = Math.max(0.05, Math.min(Math.PI - 0.05, phi));
    const sinPhi = Math.sin(phi);
    camera.position.set(
      carPos.x + dist * sinPhi * Math.sin(theta),
      carPos.y + dist * Math.cos(phi),
      carPos.z + dist * sinPhi * Math.cos(theta),
    );
    camera.lookAt(carPos);
  }

  // ---- Callout ---------------------------------------------------------------

  /**
   * Per-kind anchor: focus player, optionally midpoint with the ball or the
   * partner teammate, clamped inside the arena (port of
   * `_resolveMistakeAnchor`). Returns the anchor in UU.
   */
  function resolveAnchorUu(
    render: PlayerRenderContext,
  ): { x: number; y: number; z: number } | null {
    const focusCar = carById(render, focusIdx);
    const focus = focusCar ? carUu(focusCar) : null;
    if (!focus) return null;
    let secondary: { x: number; y: number; z: number } | null = null;
    if (
      m.kind === "stacked_too_close" ||
      m.kind === "double_committing" ||
      m.kind === "bumping_teammate"
    ) {
      if (anchorPartnerIdx === undefined) {
        anchorPartnerIdx = findDoubleCommitTeammateIdx(replay, m, focusIdx);
      }
      if (anchorPartnerIdx >= 0) {
        const partner = carById(render, anchorPartnerIdx);
        secondary = partner ? carUu(partner) : null;
      }
    } else if (
      m.kind === "overcommitting_last_man" ||
      m.kind === "bang_with_time" ||
      m.kind === "hesitating_on_50" ||
      m.kind === "waiting_to_challenge"
    ) {
      const ballObj = render.ball.object3d;
      if (ballObj && render.ball.visible) {
        secondary = { x: ballObj.position.x, y: ballObj.position.z, z: ballObj.position.y };
      }
    }
    const out = { ...focus };
    if (secondary) {
      out.x = (out.x + secondary.x) / 2;
      out.y = (out.y + secondary.y) / 2;
      out.z = (out.z + secondary.z) / 2;
    }
    out.x = Math.max(-FIELD_HALF_X_UU, Math.min(FIELD_HALF_X_UU, out.x));
    out.y = Math.max(-FIELD_HALF_Y_UU, Math.min(FIELD_HALF_Y_UU, out.y));
    if (out.z < 0) out.z = 0;
    return out;
  }

  /** NDC bbox of the visible field corners, for clamping offscreen anchors. */
  function fieldNdcBounds(
    camera: THREE.PerspectiveCamera,
  ): { minX: number; maxX: number; minY: number; maxY: number } | null {
    const corners: [number, number][] = [
      [FIELD_HALF_X_UU, FIELD_HALF_Y_UU],
      [-FIELD_HALF_X_UU, FIELD_HALF_Y_UU],
      [-FIELD_HALF_X_UU, -FIELD_HALF_Y_UU],
      [FIELD_HALF_X_UU, -FIELD_HALF_Y_UU],
    ];
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let any = false;
    for (const [x, y] of corners) {
      const scene = uuToScene(x, y, 0);
      tmpProj.set(scene.x, scene.y, scene.z).project(camera);
      if (tmpProj.z > 1) continue;
      minX = Math.min(minX, tmpProj.x);
      maxX = Math.max(maxX, tmpProj.x);
      minY = Math.min(minY, tmpProj.y);
      maxY = Math.max(maxY, tmpProj.y);
      any = true;
    }
    if (!any) return null;
    minX = Math.max(-0.97, minX);
    maxX = Math.min(0.97, maxX);
    minY = Math.max(-0.97, minY);
    maxY = Math.min(0.97, maxY);
    if (minX >= maxX || minY >= maxY) return null;
    return { minX, maxX, minY, maxY };
  }

  function updateCallout(render: PlayerRenderContext) {
    if (!callout) return;
    callout.setRewindVisible(aw.phase === "rewind");
    const view = calloutPhaseView(aw, m, render.currentTime);
    const birdsKind = m.kind === "too_far_from_play" || m.kind === "pick_up_small_pads";
    const focusTrack = replay.players[focusIdx];
    const teamColor = focusTrack?.isTeamZero === false ? TEAM_COLOR_ORANGE : TEAM_COLOR_BLUE;

    // Chevron overlay renders through zoom_out + birds (`showChevrons`).
    if (view?.showChevrons && chevrons) {
      const control = resolveChevronControl();
      if (control) {
        chevrons.update({
          control,
          colorHex: focusTrack?.isTeamZero === false ? 0xff8c2a : 0x2a8cff,
          pads: replay.boostPads,
          cameraWorldPos: render.camera.position,
        });
      } else {
        chevrons.hide();
      }
    } else {
      chevrons?.hide();
    }

    // Focus ring only during the held bird's-eye.
    if (aw.phase === "birds" && birdsKind && focusRing) {
      const focusCar = carById(render, focusIdx);
      const pos = focusCar ? carUu(focusCar) : null;
      if (pos) {
        focusRing.show(pos.x, pos.y, focusTrack?.isTeamZero === false ? 0xff8c2a : 0x2a8cff);
      } else {
        focusRing.hide();
      }
    } else {
      focusRing?.hide();
    }

    if (!view || view.textboxHidden) {
      callout.hide();
      return;
    }

    // too_far keeps its red mistake color through the bird's-eye morph; the
    // pick_up_small_pads variant recolors to the team color.
    const inBirdsPath = view.message === "birds_path";
    const keepMistakeColor = !inBirdsPath || m.kind === "too_far_from_play";
    const color = keepMistakeColor ? (MISTAKE_COLORS[m.kind] ?? DEFAULT_CALLOUT_COLOR) : teamColor;
    const text = resolveCalloutText(view.message, replay, m, focusIdx, resolveTeammateIdx());

    let anchorUu = resolveAnchorUu(render);
    if (view.anchorTeammate) {
      const tmIdx = resolveTeammateIdx();
      const teammate = tmIdx >= 0 ? carById(render, tmIdx) : null;
      const pos = teammate ? carUu(teammate) : null;
      if (pos) anchorUu = pos;
    }

    const w = container.clientWidth;
    const h = container.clientHeight;
    let anchor: { x: number; y: number } | null = null;
    if (anchorUu && w > 0 && h > 0) {
      const camera = render.camera;
      camera.updateMatrixWorld();
      const scene = uuToScene(anchorUu.x, anchorUu.y, anchorUu.z);
      tmpProj.set(scene.x, scene.y, scene.z).project(camera);
      let ndcX = tmpProj.x;
      let ndcY = tmpProj.y;
      const behind = tmpProj.z > 1;
      const onScreen = !behind && Math.abs(ndcX) <= 1 && Math.abs(ndcY) <= 1;
      if (!onScreen) {
        if (behind) {
          ndcX = -ndcX;
          ndcY = -ndcY;
        }
        const fb = fieldNdcBounds(camera);
        ndcX = Math.max(fb?.minX ?? -0.94, Math.min(fb?.maxX ?? 0.94, ndcX));
        ndcY = Math.max(fb?.minY ?? -0.94, Math.min(fb?.maxY ?? 0.94, ndcY));
      }
      anchor = { x: (ndcX * 0.5 + 0.5) * w, y: (-ndcY * 0.5 + 0.5) * h };
    }
    callout.update({ text, color, anchor, dotHidden: view.dotHidden, width: w, height: h });
  }

  function updateBangCone(render: PlayerRenderContext) {
    if (!bangCone) return;
    const inSideView =
      aw.phase === "bang_pan_in" || aw.phase === "bang_hold" || aw.phase === "bang_pan_out";
    if (!inSideView) {
      bangCone.hide();
      return;
    }
    const focusCar = carById(render, focusIdx);
    const pos = focusCar ? carUu(focusCar) : null;
    if (!pos) {
      bangCone.hide();
      return;
    }
    const track = replay.players[focusIdx];
    const netY = (track?.isTeamZero === false ? -1 : 1) * FIELD_HALF_Y_UU;
    let fade = 1;
    if (aw.phase === "bang_pan_in") {
      fade = smoothstep01(aw.phaseElapsed / AW_PHASE_BANG_PAN_IN_SEC);
    } else if (aw.phase === "bang_pan_out") {
      fade = 1 - smoothstep01(aw.phaseElapsed / AW_PHASE_BANG_PAN_OUT_SEC);
    }
    bangCone.show(pos.x, pos.y, netY, fade);
  }

  // ---- Frame driver -----------------------------------------------------------

  function beforeRender(render: PlayerRenderContext) {
    const now = performance.now();
    const dt = lastNow === null ? 0 : Math.min(0.1, (now - lastNow) / 1000);
    lastNow = now;
    if (focusIdx < 0) return;

    const transitions = advancePhase(
      aw,
      m,
      {
        currentTime: render.currentTime,
        hasTeammate: () => resolveTeammateIdx() >= 0,
        birdsRewindTarget: () => {
          const p = resolvePath();
          // 1s of pre-roll before the chevrons begin so the viewer sees the
          // drift start, not just the path start frame.
          return p ? Math.max(0, p.tAnchor - 1.0) : null;
        },
      },
      dt,
    );
    for (const transition of transitions) {
      switch (transition.type) {
        case "capture_pose":
          fromPos.copy(render.camera.position);
          fromQuat.copy(render.camera.quaternion);
          break;
        case "begin_rewind":
          player.pause();
          break;
        case "snap_time":
          player.seek(transition.time);
          break;
        case "attach_teammate": {
          const tmIdx = resolveTeammateIdx();
          if (tmIdx >= 0) {
            attachedTeammate = true;
            attachTrack(tmIdx);
          }
          break;
        }
        case "attach_focus":
          restoreFocusAttachment();
          break;
      }
    }
    // Natural completion of the teammate arc leaves the teammate attached
    // only until wtc_unpan begins (attach_focus above); an abort path also
    // restores — but if we reached done/idle some other way, ensure focus.
    if ((aw.phase === "done" || aw.phase === "idle") && attachedTeammate) {
      restoreFocusAttachment();
    }

    applyTransport(render, dt);

    const owned = applyCinematicCamera(render);
    if (owned) {
      if (userLook.active || userLook.snapping) {
        userLook.active = false;
        userLook.snapping = false;
        userLook.yaw = 0;
        userLook.pitch = 0;
      }
      render.camera.updateMatrixWorld();
    } else {
      applyUserLook(render);
    }

    updateBangCone(render);
    updateCallout(render);
  }

  // ---- User free-look pointer handling ---------------------------------------

  function canUserLook(): boolean {
    return !cinematicOwnsCamera(aw.phase);
  }

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0 || !canUserLook()) return;
    userLook.active = true;
    userLook.snapping = false;
    userLook.lastX = e.clientX;
    userLook.lastY = e.clientY;
    (e.currentTarget as HTMLElement | null)?.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!userLook.active) return;
    const dx = e.clientX - userLook.lastX;
    const dy = e.clientY - userLook.lastY;
    userLook.lastX = e.clientX;
    userLook.lastY = e.clientY;
    const camera = player.sceneState.camera;
    const height = Math.max(1, container.clientHeight);
    const sens = ((LOOK_SENSITIVITY * 2 * Math.tan((camera.fov * Math.PI) / 360)) / height) * 1.6;
    userLook.yaw -= dx * sens;
    userLook.pitch -= dy * sens;
  }

  function endUserLook() {
    if (!userLook.active) return;
    userLook.active = false;
    userLook.snapping = true;
  }

  const plugin: PlayerPlugin = {
    id: "mistake-cinematic-director",
    beforeRender,
  };

  return {
    attach() {
      if (removePlugin) return;
      callout = new CalloutOverlay(container);
      const root = player.replayRoot;
      chevrons = new ChevronPathOverlay(root);
      bangCone = new BangConeOverlay(root);
      focusRing = new FocusRingOverlay(root);
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", endUserLook);
      container.addEventListener("pointercancel", endUserLook);
      lastNow = null;
      removePlugin = player.addPlugin(plugin);
    },
    detach() {
      if (!removePlugin) return;
      removePlugin();
      removePlugin = null;
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endUserLook);
      container.removeEventListener("pointercancel", endUserLook);
      callout?.dispose();
      callout = null;
      chevrons?.dispose();
      chevrons = null;
      bangCone?.dispose();
      bangCone = null;
      focusRing?.dispose();
      focusRing = null;
      restoreFocusAttachment();
      player.setPlaybackRate(basePlaybackRate);
      lastRateSet = null;
    },
    isEngaged() {
      return aw.phase !== "idle" && aw.phase !== "done";
    },
    notifyExternalSeek() {
      // User scrub / loop wrap / clip re-apply: cancel any in-flight
      // cinematic, revert to the pre-cinematic focus player, clear the
      // consumed guard so a deliberate re-entry replays the cinematic, and
      // hand the transport back.
      const wasRunning = abortAwState(aw);
      if (wasRunning) {
        restoreFocusAttachment();
        player.setPlaybackRate(basePlaybackRate);
        lastRateSet = null;
        player.play();
      }
      resetAwState(aw);
    },
  };
}

function resolveFocusIdx(replay: ReplayModel, focusTrackId: string, playerName: string): number {
  for (let i = 0; i < replay.players.length; i++) {
    if (replay.players[i].id === focusTrackId) return i;
  }
  return trackIndexByName(replay, playerName);
}
