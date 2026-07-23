// THREE overlays for the cinematics, mounted on the player's `replayRoot`
// (children positioned in raw UU, RL Z-up):
//
// - the chevron recommended-path + traveling strobe pulse + "+12"/"+100"
//   boost floaters (bird's-eye reveal), porting `_showTooFarPath`. RLVision
//   strobe-lifted the actual pad meshes' emissive; the vendored boost-pads
//   plugin keeps its meshes private, so the pad flare here is an additive
//   ground disc pulsing at the pad position — same read, no plugin surgery.
// - the bang_with_time open-space cone (`bangOpenSpace`).
// - the focus-player team ring shown during the held bird's-eye.
//
// All lengths are UU (RLVision scene units × 100).

import * as THREE from "three";
import type { ReplayBoostPad } from "@rlrml/player";
import { BANG_CONE_APEX_Y_UU, BANG_CONE_HALF_ANGLE, BANG_CONE_RANGE_UU } from "./constants";
import type { ChevronControlPoints } from "./path";

const PATH_Z_OFFSET_UU = 30; // raise above the field surface for visibility
const TOO_FAR_PATH_COLOR = 0xffb300;
const STROBE_FLASH_HEX = 0xff6a00;
const BANG_LANE_Z_UU = 16;
const BANG_LANE_OPACITY = 0.32;
const BANG_LANE_BORDER_OPACITY = 1.0;

const strobeFlashR = ((STROBE_FLASH_HEX >> 16) & 0xff) / 255;
const strobeFlashG = ((STROBE_FLASH_HEX >> 8) & 0xff) / 255;
const strobeFlashB = (STROBE_FLASH_HEX & 0xff) / 255;

/** Flat `>`-shaped chevron in the ground (XY) plane, apex at +X. */
function buildChevronGeometry(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(40, 0);
  shape.lineTo(-40, 36);
  shape.lineTo(-30, 26);
  shape.lineTo(10, 0);
  shape.lineTo(-30, -26);
  shape.lineTo(-40, -36);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function buildFloaterTexture(value: number): {
  texture: THREE.CanvasTexture;
  aspect: number;
} {
  const text = `+${value}`;
  const fontPx = 56;
  const padX = 14;
  const padY = 8;
  const dpr = 2;
  const canvas = document.createElement("canvas");
  const measure = canvas.getContext("2d")!;
  measure.font = `bold ${fontPx}px sans-serif`;
  const textW = Math.ceil(measure.measureText(text).width);
  const logicalW = textW + padX * 2;
  const logicalH = fontPx + padY * 2;
  canvas.width = Math.ceil(logicalW * dpr);
  canvas.height = Math.ceil(logicalH * dpr);
  const c = canvas.getContext("2d")!;
  c.scale(dpr, dpr);
  c.font = `bold ${fontPx}px sans-serif`;
  c.textBaseline = "middle";
  c.textAlign = "center";
  c.lineWidth = 6;
  c.strokeStyle = "rgba(0,0,0,0.9)";
  c.fillStyle = value >= 100 ? "#ffb300" : "#ffd84a";
  c.strokeText(text, logicalW / 2, logicalH / 2);
  c.fillText(text, logicalW / 2, logicalH / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { texture, aspect: logicalW / logicalH };
}

interface PadFlareEntry {
  disc: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
  sprite: THREE.Sprite;
  spriteAspect: number;
}

export interface ChevronPathInput {
  control: ChevronControlPoints;
  /** Path color (focus player's team color as hex int). */
  colorHex: number;
  pads: ReplayBoostPad[];
  /** Camera world position (scene coords) for floater distance scaling. */
  cameraWorldPos: THREE.Vector3;
}

/**
 * The chevron route + strobe + floaters. Create once per director, call
 * `update` every rendered frame while visible, `hide` otherwise, and
 * `dispose` on teardown.
 */
export class ChevronPathOverlay {
  private readonly group = new THREE.Group();
  private readonly chevronGeo = buildChevronGeometry();
  private readonly chevrons: THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>[] = [];
  private readonly flares = new Map<number, PadFlareEntry>();
  private readonly tmpPos = new THREE.Vector3();
  private readonly tmpTan = new THREE.Vector3();
  private readonly tmpWorld = new THREE.Vector3();
  // Geometry cache: `control` is memoized once per director, but update() runs
  // every rendered frame — rebuilding the Catmull-Rom curve (and its ~200-entry
  // arc-length table) plus hundreds of Vector3 control points per frame is
  // pure GC churn on the hottest path. Everything derived solely from
  // `control` is computed once here; the per-frame pass only animates the
  // pulse colors/opacities and camera-distance sprite scale.
  private cachedControl: ChevronPathInput["control"] | null = null;
  private cachedN = 0;
  // Per-chevron on-path visibility (pads punch holes in the trail). Re-applied
  // every frame because hide() blanks mesh visibility and a rewound cinematic
  // can re-enter the window with the geometry cache still warm.
  private cachedChevronVisible: boolean[] = [];
  private cachedPadAnims: {
    padIdx: number;
    big: boolean;
    x: number;
    y: number;
    bestI: number;
    spriteX: number;
    spriteY: number;
  }[] = [];

  constructor(private readonly root: THREE.Object3D) {
    this.group.visible = false;
    root.add(this.group);
  }

  private ensureChevron(i: number) {
    while (this.chevrons.length <= i) {
      const material = new THREE.MeshBasicMaterial({
        color: TOO_FAR_PATH_COLOR,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(this.chevronGeo, material);
      mesh.renderOrder = 999;
      mesh.visible = false;
      this.group.add(mesh);
      this.chevrons.push(mesh);
    }
    return this.chevrons[i];
  }

  private ensureFlare(padIdx: number, big: boolean): PadFlareEntry {
    let entry = this.flares.get(padIdx);
    if (entry) return entry;
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(big ? 220 : 130, 28),
      new THREE.MeshBasicMaterial({
        color: STROBE_FLASH_HEX,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      }),
    );
    disc.renderOrder = 998;
    disc.visible = false;
    const { texture, aspect } = buildFloaterTexture(big ? 100 : 12);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      }),
    );
    sprite.renderOrder = 1000;
    sprite.visible = false;
    this.group.add(disc);
    this.group.add(sprite);
    entry = { disc, sprite, spriteAspect: aspect };
    this.flares.set(padIdx, entry);
    return entry;
  }

  /** Build everything derivable from `control` alone: curve sampling, chevron
   * placement/visibility, and per-pad flare anchors. Runs once per control
   * identity; returns false for a degenerate path (which stays cached so a
   * hidden overlay doesn't re-derive its curve every frame). */
  private rebuildGeometry(input: ChevronPathInput): boolean {
    const { control } = input;
    this.cachedControl = control;
    this.cachedN = 0;
    this.cachedChevronVisible = [];
    this.cachedPadAnims = [];
    const pts = control.points.map(([x, y]) => new THREE.Vector3(x, y, 0));
    if (pts.length < 2) {
      return false;
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5);
    const length = curve.getLength();
    if (!isFinite(length) || length < 100) {
      return false;
    }

    // Tight spacing so individual chevrons can be skipped over pads while the
    // trail still reads continuous.
    const SPACING = 250;
    const T_START = Math.min(0.05, 150 / Math.max(length, 1));
    const T_END = 1 - T_START;
    const usableLen = length * (T_END - T_START);
    const n = Math.max(2, Math.round(usableLen / SPACING));

    // Pre-project surviving pad waypoints so overlapping chevrons hide.
    const padClearXY: number[] = [];
    for (const w of control.survivingWaypoints) padClearXY.push(w.x, w.y);
    const PAD_CLEAR_SQ = 250 * 250;

    const chevronXY: number[] = [];
    for (let i = 0; i < n; i++) {
      const t = T_START + (T_END - T_START) * (i / (n - 1));
      curve.getPointAt(t, this.tmpPos);
      curve.getTangentAt(t, this.tmpTan);
      const mesh = this.ensureChevron(i);
      mesh.position.set(this.tmpPos.x, this.tmpPos.y, PATH_Z_OFFSET_UU);
      mesh.rotation.set(0, 0, Math.atan2(this.tmpTan.y, this.tmpTan.x));
      // Hide chevrons that land on a pad; keep the slot in chevronXY so the
      // pulse math is unaffected.
      let onPad = false;
      for (let pi = 0; pi < padClearXY.length; pi += 2) {
        const dx = this.tmpPos.x - padClearXY[pi];
        const dy = this.tmpPos.y - padClearXY[pi + 1];
        if (dx * dx + dy * dy < PAD_CLEAR_SQ) {
          onPad = true;
          break;
        }
      }
      mesh.visible = !onPad;
      this.cachedChevronVisible.push(!onPad);
      chevronXY.push(this.tmpPos.x, this.tmpPos.y);
    }
    for (let i = n; i < this.chevrons.length; i++) this.chevrons[i].visible = false;

    // Per-pad flare anchors: nearest chevron and the fixed floater position
    // (perpendicular offset along the nearest chevron tangent).
    const chevCount = chevronXY.length / 2;
    if (chevCount > 0) {
      for (const w of control.survivingWaypoints) {
        const padIdx = w.padIdx!;
        const pad = input.pads[padIdx];
        if (!pad) continue;
        let bestI = -1;
        let bestD2 = Infinity;
        for (let i = 0; i < chevCount; i++) {
          const dx = chevronXY[i * 2] - w.x;
          const dy = chevronXY[i * 2 + 1] - w.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD2) {
            bestD2 = d2;
            bestI = i;
          }
        }
        if (bestI < 0) continue;
        let tdx = 0;
        let tdy = 0;
        if (bestI > 0) {
          tdx = chevronXY[bestI * 2] - chevronXY[(bestI - 1) * 2];
          tdy = chevronXY[bestI * 2 + 1] - chevronXY[(bestI - 1) * 2 + 1];
        } else if (bestI + 1 < chevCount) {
          tdx = chevronXY[(bestI + 1) * 2] - chevronXY[bestI * 2];
          tdy = chevronXY[(bestI + 1) * 2 + 1] - chevronXY[bestI * 2 + 1];
        }
        const tlen = Math.hypot(tdx, tdy) || 1;
        const PERP_OFFSET = 700;
        this.cachedPadAnims.push({
          padIdx,
          big: pad.size === "big",
          x: w.x,
          y: w.y,
          bestI,
          spriteX: w.x + (-tdy / tlen) * PERP_OFFSET,
          spriteY: w.y + (tdx / tlen) * PERP_OFFSET,
        });
      }
    }
    this.cachedN = n;
    return true;
  }

  update(input: ChevronPathInput): void {
    const { control, colorHex } = input;
    if (control !== this.cachedControl) {
      this.rebuildGeometry(input);
    }
    const n = this.cachedN;
    if (n === 0) {
      this.hide();
      return;
    }
    const tr = ((colorHex >> 16) & 0xff) / 255;
    const tg = ((colorHex >> 8) & 0xff) / 255;
    const tb = (colorHex & 0xff) / 255;

    // Traveling pulse: one bright crest sweeps start→end, then loops.
    const WAVE_PERIOD_MS = 1700;
    const WAVE_WIDTH = 2.0;
    const TRAIL_GAP = WAVE_WIDTH;
    const wavePhase = (performance.now() % WAVE_PERIOD_MS) / WAVE_PERIOD_MS;
    const pulsePos = wavePhase * (n - 1 + TRAIL_GAP) - TRAIL_GAP * 0.5;
    const DIM_COLOR = 0.9;
    const DIM_OPACITY = 0.85;
    const PEAK_OPACITY = 1.0;

    for (let i = 0; i < n; i++) {
      const mesh = this.chevrons[i];
      mesh.visible = this.cachedChevronVisible[i];
      const baseS = 2.85 + 1.2 * (i / Math.max(1, n - 1));
      const d = Math.abs(i - pulsePos);
      const k = Math.max(0, 1 - d / WAVE_WIDTH);
      const cMul = DIM_COLOR + (1 - DIM_COLOR) * k;
      const lift = Math.max(0, (k - 0.5) * 2);
      mesh.material.color.setRGB(
        tr * cMul + (1 - tr * cMul) * lift,
        tg * cMul + (1 - tg * cMul) * lift,
        tb * cMul + (1 - tb * cMul) * lift,
      );
      mesh.material.opacity = DIM_OPACITY + (PEAK_OPACITY - DIM_OPACITY) * k;
      const s = baseS * (1 + 0.3 * k);
      mesh.scale.set(s, s, 1);
    }

    // Pad flare + floater synced to the pulse sweeping the nearest chevron.
    const seenPads = new Set<number>();
    for (const anim of this.cachedPadAnims) {
      const dist = Math.abs(anim.bestI - pulsePos);
      const kk = Math.max(0, 1 - dist / WAVE_WIDTH);
      const entry = this.ensureFlare(anim.padIdx, anim.big);
      seenPads.add(anim.padIdx);
      if (kk <= 0) {
        entry.disc.visible = false;
        entry.sprite.visible = false;
        continue;
      }
      const PAD_EXPAND_PEAK = 3.0;
      const grow = 1 + kk * PAD_EXPAND_PEAK;
      entry.disc.position.set(anim.x, anim.y, PATH_Z_OFFSET_UU - 4);
      entry.disc.scale.set(grow, grow, 1);
      entry.disc.material.opacity = 0.55 * kk;
      entry.disc.material.color.setRGB(strobeFlashR, strobeFlashG * (0.7 + 0.3 * kk), strobeFlashB);
      entry.disc.visible = true;
      // Floater beside the trail, distance-scaled like nameplate sprites so
      // it reads at bird's-eye altitude.
      entry.sprite.position.set(anim.spriteX, anim.spriteY, PATH_Z_OFFSET_UU + 140);
      entry.sprite.getWorldPosition(this.tmpWorld);
      const camDist = input.cameraWorldPos.distanceTo(this.tmpWorld);
      const s = camDist * 0.03;
      entry.sprite.scale.set(s * entry.spriteAspect, s, 1);
      (entry.sprite.material as THREE.SpriteMaterial).opacity = kk;
      entry.sprite.visible = true;
    }
    for (const [padIdx, entry] of this.flares) {
      if (!seenPads.has(padIdx)) {
        entry.disc.visible = false;
        entry.sprite.visible = false;
      }
    }
    this.group.visible = true;
  }

  hide(): void {
    this.group.visible = false;
    for (const mesh of this.chevrons) mesh.visible = false;
    for (const entry of this.flares.values()) {
      entry.disc.visible = false;
      entry.sprite.visible = false;
    }
  }

  dispose(): void {
    this.root.remove(this.group);
    this.chevronGeo.dispose();
    for (const mesh of this.chevrons) mesh.material.dispose();
    for (const entry of this.flares.values()) {
      entry.disc.geometry.dispose();
      entry.disc.material.dispose();
      const material = entry.sprite.material as THREE.SpriteMaterial;
      material.map?.dispose();
      material.dispose();
    }
    this.flares.clear();
  }
}

/**
 * The bang_with_time "open space ahead" cone: a translucent cyan sector on
 * the ground in front of the focus car, apex at the car nose, fanning toward
 * the net the player attacks. Port of viewer.js `bangOpenSpace`.
 */
export class BangConeOverlay {
  private readonly group = new THREE.Group();
  private readonly fill: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private readonly border: THREE.LineLoop<THREE.BufferGeometry, THREE.LineBasicMaterial>;

  constructor(private readonly root: THREE.Object3D) {
    const SEGMENTS = 28;
    const apex = new THREE.Vector3(0, BANG_CONE_APEX_Y_UU, 0);
    const arc: THREE.Vector3[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const th = -BANG_CONE_HALF_ANGLE + (i / SEGMENTS) * (2 * BANG_CONE_HALF_ANGLE);
      arc.push(
        new THREE.Vector3(
          Math.sin(th) * BANG_CONE_RANGE_UU,
          BANG_CONE_APEX_Y_UU + Math.cos(th) * BANG_CONE_RANGE_UU,
          0,
        ),
      );
    }
    const fillPos: number[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      fillPos.push(apex.x, apex.y, apex.z);
      fillPos.push(arc[i].x, arc[i].y, arc[i].z);
      fillPos.push(arc[i + 1].x, arc[i + 1].y, arc[i + 1].z);
    }
    const fillGeo = new THREE.BufferGeometry();
    fillGeo.setAttribute("position", new THREE.Float32BufferAttribute(fillPos, 3));
    this.fill = new THREE.Mesh(
      fillGeo,
      new THREE.MeshBasicMaterial({
        color: 0x2ad4ff,
        transparent: true,
        opacity: BANG_LANE_OPACITY,
        side: THREE.DoubleSide,
        // Depth-test ON so cars/ball occlude the cone (it reads as painted on
        // the ground); depthWrite OFF so the fill doesn't punch a hole for
        // later transparents.
        depthTest: true,
        depthWrite: false,
      }),
    );
    this.fill.renderOrder = 1000;
    this.border = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([apex.clone(), ...arc]),
      new THREE.LineBasicMaterial({
        color: 0xb3f0ff,
        transparent: true,
        opacity: BANG_LANE_BORDER_OPACITY,
        depthTest: true,
        depthWrite: false,
      }),
    );
    this.border.renderOrder = 1001;
    this.group.add(this.fill);
    this.group.add(this.border);
    this.group.visible = false;
    root.add(this.group);
  }

  /**
   * Place under the focus car, aimed at the opposition net (x=0 on the goal
   * line), faded by the pan. Positions in UU.
   */
  show(carX: number, carY: number, netY: number, fade: number): void {
    this.group.position.set(carX, carY, BANG_LANE_Z_UU);
    // Rotate local +Y (the cone axis) onto the car→net direction.
    this.group.rotation.set(0, 0, Math.atan2(carX, netY - carY));
    this.fill.material.opacity = BANG_LANE_OPACITY * fade;
    this.border.material.opacity = BANG_LANE_BORDER_OPACITY * fade;
    this.group.visible = true;
  }

  hide(): void {
    this.group.visible = false;
  }

  dispose(): void {
    this.root.remove(this.group);
    this.fill.geometry.dispose();
    this.fill.material.dispose();
    this.border.geometry.dispose();
    this.border.material.dispose();
  }
}

/**
 * Team-colored ground ring under the focus car during the held bird's-eye —
 * the wide shot's "you are here" anchor (viewer.js `focusPlayerIndicator`).
 */
export class FocusRingOverlay {
  private readonly ring: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;

  constructor(private readonly root: THREE.Object3D) {
    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(170, 230, 40),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
      }),
    );
    this.ring.renderOrder = 1001;
    this.ring.visible = false;
    root.add(this.ring);
  }

  show(carX: number, carY: number, colorHex: number): void {
    this.ring.position.set(carX, carY, 20);
    this.ring.material.color.setHex(colorHex);
    this.ring.visible = true;
  }

  hide(): void {
    this.ring.visible = false;
  }

  dispose(): void {
    this.root.remove(this.ring);
    this.ring.geometry.dispose();
    this.ring.material.dispose();
  }
}
