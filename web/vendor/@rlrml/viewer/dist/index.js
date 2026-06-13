import { loadReplayFromBytes as se, inferLiveGameState as oe, inferKickoffGameState as ae, getKickoffCountdownMetadata as ne, computeTimelineSegments as re, projectReplayTimeToTimeline as le, projectTimelineTimeToReplay as ce, getReplayPlaybackEndTime as he, getKickoffSkipTargetTime as de, getPostGoalTransitionSkipTargetTime as me, getFrameWindow as ue, interpolatePosition as X, getActiveDemoEvent as pe, isPlayerSamplePresent as fe } from "@rlrml/player";
import { BOOST_RAW_MAX as Pt, boostAmountToPercent as zt, boostPercentToAmount as Dt, createBoostPadOverlayPlugin as _t, createBoostPickupAnimationPlugin as It, createCanvasRecorderPlugin as Bt, createTimelineOverlayPlugin as At, timelineEventSeekTime as Vt } from "@rlrml/player";
import * as l from "three";
import { OrbitControls as ge } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader as ye } from "three/examples/jsm/loaders/RGBELoader.js";
import { RoomEnvironment as be } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader as R } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as U } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OBJLoader as xe } from "three/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader as we } from "three/examples/jsm/loaders/FBXLoader.js";
import { clone as E } from "three/examples/jsm/utils/SkeletonUtils.js";
import q from "camera-controls";
async function Q(p) {
  return se(p, { useWorker: !1 });
}
async function bt(p) {
  const { raw: e } = await Q(p);
  return e;
}
class Y {
  _listeners = /* @__PURE__ */ new Map();
  on(e, t) {
    let s = this._listeners.get(e);
    return s || (s = /* @__PURE__ */ new Set(), this._listeners.set(e, s)), s.add(t), this;
  }
  once(e, t) {
    const s = (...i) => {
      this.off(e, s), t(...i);
    };
    return this.on(e, s);
  }
  off(e, t) {
    const s = this._listeners.get(e);
    return s ? (t ? s.delete(t) : s.clear(), s.size === 0 && this._listeners.delete(e), this) : this;
  }
  removeListener(e, t) {
    return this.off(e, t);
  }
  removeAllListeners(e) {
    return e ? this._listeners.delete(e) : this._listeners.clear(), this;
  }
  emit(e, ...t) {
    const s = this._listeners.get(e);
    if (!s || s.size === 0) return !1;
    for (const i of [...s]) i(...t);
    return !0;
  }
}
function L(p) {
  return p ? { x: p.x, y: p.z, z: p.y } : null;
}
function ve(p) {
  return p ? { x: p.x, y: p.z, z: p.y, w: -p.w } : null;
}
function Me(p) {
  return p * 100 / 255;
}
const k = {
  Octane: {
    length: 118.0074,
    width: 84.19941,
    height: 36.15907,
    offsetX: 13.87566,
    offsetZ: 20.75499
  },
  Dominus: {
    length: 127.9268,
    width: 83.27995,
    height: 31.3,
    offsetX: 9,
    offsetZ: 15.75
  },
  Plank: {
    length: 128.8198,
    width: 84.67036,
    height: 29.3944,
    offsetX: 9.00857,
    offsetZ: 12.0942
  },
  Breakout: {
    length: 131.4924,
    width: 80.521,
    height: 30.3,
    offsetX: 12.5,
    offsetZ: 11.75
  },
  Hybrid: {
    length: 127.0192,
    width: 82.18787,
    height: 34.15907,
    offsetX: 13.87566,
    offsetZ: 20.75499
  },
  Merc: {
    length: 120.72,
    width: 76.71,
    height: 41.66,
    offsetX: 11.37566,
    offsetZ: 21.504988
  }
}, Ce = {
  21: { name: "Backfire", hitbox: "Octane" },
  22: { name: "Breakout", hitbox: "Breakout" },
  23: { name: "Octane", hitbox: "Octane" },
  24: { name: "Paladin", hitbox: "Plank" },
  25: { name: "Road Hog", hitbox: "Octane" },
  26: { name: "Gizmo", hitbox: "Octane" },
  28: { name: "X-Devil", hitbox: "Hybrid" },
  29: { name: "Hotshot", hitbox: "Dominus" },
  30: { name: "Merc", hitbox: "Merc" },
  31: { name: "Venom", hitbox: "Hybrid" },
  402: { name: "Takumi", hitbox: "Octane" },
  403: { name: "Dominus", hitbox: "Dominus" },
  404: { name: "Scarab", hitbox: "Octane" },
  523: { name: "Zippy", hitbox: "Octane" },
  597: { name: "DeLorean Time Machine", hitbox: "Dominus" },
  600: { name: "Ripper", hitbox: "Dominus" },
  607: { name: "Grog", hitbox: "Octane" },
  1018: { name: "Dominus GT", hitbox: "Dominus" },
  1159: { name: "X-Devil Mk2", hitbox: "Hybrid" },
  1171: { name: "Masamune", hitbox: "Dominus" },
  1172: { name: "Marauder", hitbox: "Octane" },
  1286: { name: "Aftershock", hitbox: "Dominus" },
  1295: { name: "Takumi RX-T", hitbox: "Octane" },
  1300: { name: "Road Hog XL", hitbox: "Octane" },
  1317: { name: "Esper", hitbox: "Hybrid" },
  1416: { name: "Breakout Type-S", hitbox: "Breakout" },
  1475: { name: "Proteus", hitbox: "Octane" },
  1478: { name: "Triton", hitbox: "Octane" },
  1533: { name: "Vulcan", hitbox: "Octane" },
  1568: { name: "Octane ZSR", hitbox: "Octane" },
  1603: { name: "Twin Mill III", hitbox: "Plank" },
  1623: { name: "Bone Shaker", hitbox: "Octane" },
  1624: { name: "Endo", hitbox: "Hybrid" },
  1675: { name: "Ice Charger", hitbox: "Dominus" },
  1689: { name: "Nemesis", hitbox: "Dominus" },
  1691: { name: "Mantis", hitbox: "Plank" },
  1856: { name: "Jager 619", hitbox: "Hybrid" },
  1883: { name: "Imperator DT5", hitbox: "Dominus" },
  1894: { name: "Samurai", hitbox: "Breakout" },
  1919: { name: "Centio", hitbox: "Plank" },
  1932: { name: "Animus GP", hitbox: "Breakout" },
  2070: { name: "Werewolf", hitbox: "Dominus" },
  2268: { name: "Fast & Furious Dodge Charger", hitbox: "Dominus" },
  2269: { name: "Fast & Furious Nissan Skyline", hitbox: "Hybrid" },
  2665: { name: "The Dark Knight's Tumbler", hitbox: "Octane" },
  2666: { name: "Batmobile (1989)", hitbox: "Dominus" },
  2853: { name: "Twinzer", hitbox: "Octane" },
  2919: { name: "Jurassic Jeep Wrangler", hitbox: "Octane" },
  2949: { name: "Fast 4WD", hitbox: "Octane" },
  2950: { name: "MR11", hitbox: "Dominus" },
  2951: { name: "Gazella GT", hitbox: "Dominus" },
  3031: { name: "Cyclone", hitbox: "Breakout" },
  3155: { name: "Maverick", hitbox: "Dominus" },
  3156: { name: "Maverick G1", hitbox: "Dominus" },
  3157: { name: "Maverick GXT", hitbox: "Dominus" },
  3265: { name: "McLaren 570S", hitbox: "Dominus" },
  3311: { name: "Komodo", hitbox: "Breakout" },
  3426: { name: "Diestro", hitbox: "Dominus" },
  3451: { name: "Nimbus", hitbox: "Hybrid" },
  3582: { name: "Insidio", hitbox: "Hybrid" },
  3594: { name: "Artemis G1", hitbox: "Plank" },
  3614: { name: "Artemis", hitbox: "Plank" },
  3622: { name: "Artemis GXT", hitbox: "Plank" },
  3702: { name: "Tygris", hitbox: "Hybrid" },
  3875: { name: "Guardian GXT", hitbox: "Dominus" },
  3879: { name: "Guardian", hitbox: "Dominus" },
  3880: { name: "Guardian G1", hitbox: "Dominus" },
  4014: { name: "K.I.T.T.", hitbox: "Dominus" },
  4155: { name: "Ecto-1", hitbox: "Dominus" },
  4268: { name: "Sentinel", hitbox: "Plank" },
  4284: { name: "Fennec", hitbox: "Octane" },
  4318: { name: "Mudcat", hitbox: "Octane" },
  4319: { name: "Mudcat G1", hitbox: "Octane" },
  4320: { name: "Mudcat GXT", hitbox: "Octane" },
  4367: { name: "Chikara GXT", hitbox: "Dominus" },
  4472: { name: "Chikara", hitbox: "Dominus" },
  4473: { name: "Chikara G1", hitbox: "Dominus" },
  4745: { name: "Ronin GXT", hitbox: "Dominus" },
  4770: { name: "Dominus", hitbox: "Dominus" },
  4780: { name: "Battle Bus", hitbox: "Merc" },
  4781: { name: "Peregrine TT", hitbox: "Dominus" },
  4782: { name: "Psyclops", hitbox: "Body_Tritip_Handling" },
  4861: { name: "Ronin", hitbox: "Dominus" },
  4864: { name: "Ronin G1", hitbox: "Dominus" },
  4906: { name: "Harbinger", hitbox: "Octane" },
  5020: { name: "Outlaw", hitbox: "Octane" },
  5039: { name: "Harbinger GXT", hitbox: "Octane" },
  5188: { name: "Scarab", hitbox: "Octane" },
  5265: { name: "Formula 1 2021", hitbox: "Plank" },
  5361: { name: "Dingo", hitbox: "Octane" },
  5470: { name: "R3MX", hitbox: "Hybrid" },
  5488: { name: "R3MX GXT", hitbox: "Hybrid" },
  5547: { name: "007's Aston Martin DB5", hitbox: "Octane" },
  5709: { name: "NASCAR Ford Mustang", hitbox: "Dominus" },
  5713: { name: "Ford F-150 RLE", hitbox: "Octane" },
  5773: { name: "NASCAR Toyota Camry", hitbox: "Dominus" },
  5823: { name: "NASCAR Chevrolet Camaro", hitbox: "Dominus" },
  5837: { name: "Outlaw GXT", hitbox: "Octane" },
  5858: { name: "Tyranno", hitbox: "Dominus" },
  5879: { name: "Fast & Furious Pontiac Fiero", hitbox: "Hybrid" },
  5951: { name: "Jackal", hitbox: "Octane" },
  5964: { name: "Lamborghini Huracan STO", hitbox: "Dominus" },
  5979: { name: "Tyranno GXT", hitbox: "Dominus" },
  6122: { name: "Masamune", hitbox: "Dominus" },
  6243: { name: "Nexus", hitbox: "Breakout" },
  6244: { name: "BMW M240i", hitbox: "Dominus" },
  6247: { name: "McLaren 765LT", hitbox: "Dominus" },
  6260: { name: "007's Aston Martin Valhalla", hitbox: "Dominus" },
  6489: { name: "Nexus SC", hitbox: "Breakout" },
  6836: { name: "Ford Mustang Shelby GT350R RLE", hitbox: "Dominus" },
  6939: { name: "Ford Mustang Mach-E RLE", hitbox: "Octane" },
  7012: { name: "Tesla Cybertruck", hitbox: "Hybrid" },
  7052: { name: "Formula 1 2022", hitbox: "Plank" },
  7211: { name: "Mamba", hitbox: "Dominus" },
  7336: { name: "Nomad", hitbox: "Merc" },
  7337: { name: "NASCAR Next Gen Chevrolet Camaro", hitbox: "Dominus" },
  7338: { name: "NASCAR Next Gen Ford Mustang", hitbox: "Dominus" },
  7341: { name: "NASCAR Next Gen Toyota Camry", hitbox: "Dominus" },
  7343: { name: "007's Aston Martin DBS", hitbox: "Dominus" },
  7415: { name: "Batmobile (2022)", hitbox: "Dominus" },
  7477: { name: "Nomad GXT", hitbox: "Merc" },
  7512: { name: "Lamborghini Countach LPI 800-4", hitbox: "Dominus" },
  7532: { name: "Maestro", hitbox: "Dominus" },
  7593: { name: "Nissan Z Performance", hitbox: "Dominus" },
  7651: { name: "Redline", hitbox: "Breakout" },
  7696: { name: "Whiplash", hitbox: "Breakout" },
  7772: { name: "Ferrari 296 GTB", hitbox: "Dominus" },
  7815: { name: "Ford Bronco Raptor RLE", hitbox: "Merc" },
  7890: { name: "Fuse", hitbox: "Breakout" },
  7901: { name: "Fast & Furious Mazda RX-7", hitbox: "Breakout" },
  7947: { name: "Honda Civic Type R", hitbox: "Octane" },
  7948: { name: "Honda Civic Type R-LE", hitbox: "Octane" },
  7979: { name: "Stampede", hitbox: "Merc" },
  8006: { name: "Mako", hitbox: "Breakout" },
  8360: { name: "Emperor", hitbox: "Breakout" },
  8361: { name: "Emperor II", hitbox: "Breakout" },
  8383: { name: "Xentari", hitbox: "Octane" },
  8454: { name: "Admiral", hitbox: "Dominus" },
  8524: { name: "Bugatti Centodieci", hitbox: "Plank" },
  8565: { name: "Emperor II: Frozen", hitbox: "Breakout" },
  8566: { name: "Emperor II: Scorched", hitbox: "Breakout" },
  8669: { name: "Ace", hitbox: "Breakout" },
  8806: { name: "Volkswagen Golf GTI", hitbox: "Octane" },
  8807: { name: "Volkswagen Golf GTI RLE", hitbox: "Octane" },
  9053: { name: "Fast & Furious Dodge Charger SRT Hellcat", hitbox: "Dominus" },
  9084: { name: "Nissan Silvia", hitbox: "Hybrid" },
  9085: { name: "Nissan Silvia RLE", hitbox: "Hybrid" },
  9088: { name: "Porsche 911 Turbo", hitbox: "Dominus" },
  9089: { name: "Porsche 911 Turbo RLE", hitbox: "Dominus" },
  9140: { name: "Bumblebee", hitbox: "Dominus" },
  9357: { name: "Diesel", hitbox: "Breakout" },
  9388: { name: "Lightning McQueen", hitbox: "Dominus" },
  9427: { name: "Primo", hitbox: "Hybrid" },
  9894: { name: "Scorpion", hitbox: "Dominus" },
  10044: { name: "Beskar", hitbox: "Hybrid" },
  10094: { name: "Ford Mustang GTD", hitbox: "Dominus" },
  10440: { name: "Nissan Fairlady Z", hitbox: "Dominus" },
  10441: { name: "Nissan Fairlady Z RLE", hitbox: "Dominus" },
  10689: { name: "Behemoth", hitbox: "Merc" },
  10694: { name: "Lockjaw", hitbox: "Dominus" },
  10697: { name: "The Incredibile", hitbox: "Breakout" },
  10698: { name: "1966 Cadillac DeVille", hitbox: "Breakout" },
  10805: { name: "Nissan Skyline GT-R (R32)", hitbox: "Hybrid" },
  10817: { name: "Quadra Turbo-R", hitbox: "Breakout" },
  10822: { name: "McLaren Senna", hitbox: "Breakout" },
  10896: { name: "BMW 1 Series", hitbox: "Octane" },
  10897: { name: "BMW 1 Series RLE", hitbox: "Octane" },
  10900: { name: "Shokunin", hitbox: "Octane" },
  10901: { name: "Shokunin GXT", hitbox: "Octane" },
  11016: { name: "Porsche 911 GT3 RS", hitbox: "Dominus" },
  11038: { name: "Revolver", hitbox: "Breakout" },
  11095: { name: "Dodge Charger Daytona Scat Pack", hitbox: "Dominus" },
  11098: { name: "Turtle Van", hitbox: "Merc" },
  11138: { name: "Void Burn", hitbox: "Hybrid" },
  11141: { name: "Lamborghini Urus SE", hitbox: "Hybrid" },
  11314: { name: "Jeep Wrangler Rubicon", hitbox: "Merc" },
  11315: { name: "Ford Mustang Shelby GT500", hitbox: "Dominus" },
  11336: { name: "Dominus: Neon", hitbox: "Dominus" },
  11379: { name: "Ram 1500 RHO", hitbox: "Hybrid" },
  11394: { name: "Azura", hitbox: "Breakout" },
  11505: { name: "Breakout X", hitbox: "Breakout" },
  11534: { name: "BMW M3 (E30)", hitbox: "Dominus" },
  11603: { name: "Fennec ZR-F", hitbox: "Octane" },
  11677: { name: "Chevrolet Corvette ZR1", hitbox: "Breakout" },
  11736: { name: "Recoil AV", hitbox: "Merc" },
  11800: { name: "Megastar", hitbox: "Breakout" },
  11905: { name: "The Mystery Machine", hitbox: "Merc" },
  11932: { name: "Hearse", hitbox: "Hybrid" },
  11933: { name: "Porsche 918 Spyder", hitbox: "Breakout" },
  11941: { name: "Mercedes-AMG GT 63 S", hitbox: "Dominus" },
  11949: { name: "Pontiac Firebird", hitbox: "Breakout" },
  11950: { name: "Chevrolet Astro", hitbox: "Merc" },
  12142: { name: "Homer's Car", hitbox: "Dominus" },
  12173: { name: "Ferrari F40", hitbox: "Breakout" }
}, Te = Ce;
function Z(p) {
  const e = Te[String(p)];
  return e ? { name: e.name, hitboxType: e.hitbox } : null;
}
function Se(p) {
  if (!p) return null;
  const e = {
    fov: p.fov,
    height: p.height,
    angle: p.angle,
    distance: p.distance,
    stiffness: p.stiffness,
    swivelSpeed: p.swivel_speed
  };
  return p.transition_speed != null && (e.transitionSpeed = p.transition_speed), e;
}
const Pe = 2200;
function B(p, e) {
  if (p.length === 0) return null;
  let t = 0, s = p.length - 1;
  if (e <= p[0].time) return p[0];
  if (e >= p[s].time) return p[s];
  for (; t < s; ) {
    const i = t + s + 1 >> 1;
    p[i].time <= e ? t = i : s = i - 1;
  }
  return p[t];
}
class ze {
  position = { x: 0, y: 0, z: 0 };
  rotation = { x: 0, y: 0, z: 0, w: 1 };
  velocity = { x: 0, y: 0, z: 0 };
  angularVelocity = { x: 0, y: 0, z: 0 };
  sleeping = !1;
  visible = !0;
}
class De {
  constructor(e, t, s) {
    this.isBig = e, this.position = t, this.events = s;
  }
  isBig;
  position;
  events;
  isAvailable = !0;
}
class _e extends Y {
  constructor(e, t, s, i, o, a = null) {
    super(), this.id = e, this.name = t, this.team = s, this.carName = i, this.hitboxType = o, this.cameraSettings = a;
  }
  id;
  name;
  team;
  carName;
  hitboxType;
  cameraSettings;
  position = { x: 0, y: 0, z: 0 };
  rotation = { x: 0, y: 0, z: 0, w: 1 };
  velocity = { x: 0, y: 0, z: 0 };
  angularVelocity = { x: 0, y: 0, z: 0 };
  sleeping = !1;
  steer = 0;
  boost = 0;
  // 0-100
  isBoosting = !1;
  isSupersonic = !1;
  /** True while boost is being reset for a kickoff (suppresses boost particles). */
  isKickoffReset = !1;
  isVisible = !0;
  isBallCam = !0;
}
class Ie extends Y {
  constructor(e) {
    super(), this.raw = e, this._compile();
  }
  raw;
  duration = 0;
  playerList = [];
  /** Monotonic per-frame timestamps (s) — the replay's frame timeline. */
  frameTimes = [];
  /**
   * The raw replay clock value at the first frame. All adapter times (frame
   * timeline, boost-pad events, duration) are shifted by this so t=0 is the
   * first frame — matching @rlrml/player's ReplayModel time axis exactly.
   */
  rawStartTime = 0;
  ball = new ze();
  players = /* @__PURE__ */ new Map();
  boostPads = /* @__PURE__ */ new Map();
  _currentTime = 0;
  _ballTimeline = [];
  _playerTimelines = {};
  _ballFlags = [];
  // ball has none, kept for symmetry
  _playerFlags = {};
  _teams = {};
  // ── Compilation: raw ReplayData -> ballcam-space timelines + entities. ──────
  _compile() {
    const e = this.raw.frame_data, t = this.raw.meta, s = e.metadata_frames, i = s[0]?.time ?? 0;
    this.rawStartTime = i;
    const o = (n) => Math.max(0, n - i);
    this.duration = s.length ? o(s[s.length - 1].time) : 0, this.frameTimes = s.map((n) => o(n.time));
    const a = /* @__PURE__ */ new Map();
    t.team_zero.forEach((n) => a.set(this._idKey(n.remote_id), { info: n, team: 0 })), t.team_one.forEach((n) => a.set(this._idKey(n.remote_id), { info: n, team: 1 })), e.ball_data.frames.forEach((n, c) => {
      if (n === "Empty" || !("Data" in n)) return;
      const r = this._rbToKeyframe(n.Data.rigid_body, o(s[c]?.time ?? i), c);
      r && this._ballTimeline.push(r);
    }), e.players.forEach(([n, c]) => {
      const r = this._idKey(n), h = a.get(r);
      let d = h?.info.name ?? null, u = h?.team ?? 0;
      if (!d) {
        for (const v of c.frames)
          if (v !== "Empty" && "Data" in v && v.Data.player_name) {
            d = v.Data.player_name, v.Data.is_team_0 != null && (u = v.Data.is_team_0 ? 0 : 1);
            break;
          }
      }
      d || (d = `Player_${r}`);
      const m = h?.info, f = m?.car_body_id != null ? Z(m.car_body_id) : null, g = m?.car_body_name ?? f?.name ?? "Octane", y = m?.car_hitbox_family ?? f?.hitboxType ?? "Octane", x = [], w = [];
      c.frames.forEach((v, T) => {
        const C = o(s[T]?.time ?? i);
        if (v === "Empty" || !("Data" in v)) return;
        const S = this._rbToKeyframe(v.Data.rigid_body, C, T);
        S && x.push(S), w.push({
          time: C,
          boost: Me(v.Data.boost_amount ?? 0),
          isBoosting: !!v.Data.boost_active,
          present: !0
        });
      });
      const b = Se(m?.camera_settings);
      this._playerTimelines[d] = x, this._playerFlags[d] = w, this._teams[d] = u, this.playerList.push({ id: r, name: d, team: u, carName: g, hitboxType: y, cameraSettings: b }), this.players.set(
        d,
        new _e(r, d, u, g, y, b)
      );
    }), this._compileBoostPads(), this.seek(0);
  }
  /**
   * subtr-actor resolves the standard soccar pad layout (with replay pad ids
   * when known) and emits exact pickup/availability events; fold the events
   * into per-pad timelines so seek() can resolve `isAvailable` at any time.
   */
  _compileBoostPads() {
    const e = /* @__PURE__ */ new Map();
    (this.raw.boost_pad_events ?? []).forEach((t) => {
      const s = t.kind === "Available" ? !0 : t.kind && typeof t.kind == "object" && "PickedUp" in t.kind ? !1 : null;
      if (s === null) return;
      const i = Math.max(0, t.time - this.rawStartTime), o = e.get(t.pad_id);
      o ? o.push({ time: i, available: s }) : e.set(t.pad_id, [{ time: i, available: s }]);
    }), (this.raw.boost_pads ?? []).forEach((t) => {
      const s = (t.pad_id ? e.get(t.pad_id) : void 0) ?? [];
      s.sort((i, o) => i.time - o.time), this.boostPads.set(t.index, new De(t.size === "Big", t.position, s));
    });
  }
  _rbToKeyframe(e, t, s) {
    const i = L(e.location);
    return i ? {
      time: t,
      frame: s,
      position: i,
      rotation: ve(e.rotation),
      velocity: L(e.linear_velocity) ?? { x: 0, y: 0, z: 0 },
      angularVelocity: L(e.angular_velocity),
      sleeping: !!e.sleeping
    } : null;
  }
  _idKey(e) {
    if (typeof e == "string" || typeof e == "number") return String(e);
    if (e && typeof e == "object") {
      const [t, s] = Object.entries(e)[0] ?? ["Unknown", "unknown"];
      return typeof s == "string" || typeof s == "number" ? `${t}:${s}` : `${t}:${JSON.stringify(s)}`;
    }
    return JSON.stringify(e);
  }
  // ── Renderer-facing API ────────────────────────────────────────────────────
  getTimelines() {
    return { ballTimeline: this._ballTimeline, playerTimelines: this._playerTimelines };
  }
  get currentTime() {
    return this._currentTime;
  }
  seek(e) {
    this._currentTime = Math.max(0, Math.min(e, this.duration)), this._updateEntities(this._currentTime), this.emit("seek", this._currentTime);
  }
  _updateEntities(e) {
    const t = B(this._ballTimeline, e);
    t && (this.ball.position = t.position, this.ball.rotation = t.rotation ?? this.ball.rotation, this.ball.velocity = t.velocity, this.ball.angularVelocity = t.angularVelocity ?? { x: 0, y: 0, z: 0 }, this.ball.sleeping = t.sleeping, this.ball.visible = !0);
    for (const [s, i] of this.players) {
      const o = B(this._playerTimelines[s] ?? [], e);
      if (o) {
        i.position = o.position, i.rotation = o.rotation ?? i.rotation, i.velocity = o.velocity, i.angularVelocity = o.angularVelocity ?? { x: 0, y: 0, z: 0 }, i.sleeping = o.sleeping;
        const c = o.velocity;
        i.isSupersonic = Math.hypot(c.x, c.y, c.z) >= Pe;
      }
      const a = B(this._playerFlags[s] ?? [], e);
      a && (i.boost = a.boost, i.isBoosting = a.isBoosting);
      const n = this._playerTimelines[s] ?? [];
      i.isVisible = n.length > 0 && e >= n[0].time - 1e-3 && e <= n[n.length - 1].time + 1;
    }
    for (const s of this.boostPads.values()) {
      if (s.events.length === 0) continue;
      const i = B(s.events, e);
      s.isAvailable = i && i.time <= e ? i.available : !0;
    }
  }
  /** Index of the last frame at or before `time` (binary search over frameTimes). */
  frameIndexAt(e) {
    const t = this.frameTimes;
    if (t.length === 0 || e <= t[0]) return 0;
    let s = 0, i = t.length - 1;
    if (e >= t[i]) return i;
    for (; s < i; ) {
      const o = s + i + 1 >> 1;
      t[o] <= e ? s = o : i = o - 1;
    }
    return s;
  }
  getBall() {
    return this.ball;
  }
  getPlayer(e) {
    return this.players.get(e);
  }
  getPlayerById(e) {
    for (const t of this.players.values())
      if (t.id === e) return t;
  }
  getAllPlayers() {
    return Array.from(this.players.values());
  }
  getPlayerTeams() {
    return { ...this._teams };
  }
  // ── Analytics / overlay getters: stubbed empty for v0 (renderer guards them).
  getGameTimeMap() {
    return [];
  }
  getCountdownEvents() {
    return [];
  }
  getPlayerStatsTimelines() {
    return {};
  }
  getGameEventTimeline() {
    return [];
  }
  getAdvancedStats() {
    return null;
  }
  getEvents() {
    return [];
  }
  getEventsInRange() {
    return [];
  }
  getTextOverlaysAt() {
    return [];
  }
  getGamePhaseAt() {
    return null;
  }
}
class Be {
  constructor(e) {
    if (this.container = typeof e == "string" ? document.getElementById(e) : e, !this.container) {
      console.error("Invalid container passed to SceneManager");
      return;
    }
    this.scene = new l.Scene(), this.scene.background = new l.Color(8900331);
    const t = this.container.clientWidth, s = this.container.clientHeight;
    this.camera = new l.PerspectiveCamera(75, t / s, 10, 5e4), this.camera.position.set(0, 2e3, 5e3), this.renderer = new l.WebGLRenderer({ antialias: !0 }), this.renderer.setSize(t, s), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = l.PCFSoftShadowMap, this.renderer.toneMapping = l.ACESFilmicToneMapping, this.renderer.toneMappingExposure = 1, this.renderer.outputColorSpace = l.SRGBColorSpace, this.container.appendChild(this.renderer.domElement), window.addEventListener("resize", () => this.onWindowResize());
  }
  /**
   * Asset-free default lighting. The original ballcam app lit everything via
   * an HDR skybox (scene.environment -> IBL on the PBR materials); those HDRs
   * were never vendored into this package, so without this the scene renders
   * nearly black. RoomEnvironment + PMREM gives equivalent neutral IBL from
   * code, and a directional key light adds definition.
   */
  initDefaultEnvironment() {
    const e = new l.PMREMGenerator(this.renderer);
    this.scene.environment = e.fromScene(new be(), 0.04).texture, e.dispose();
    const t = new l.DirectionalLight(16777215, 1.5);
    t.position.set(3e3, 8e3, 4e3), this.scene.add(t);
    const s = new l.AmbientLight(16777215, 0.4);
    this.scene.add(s);
  }
  loadSkybox(e = "HighFantasy4k") {
    return new Promise((t) => {
      const s = new ye(), i = `/skyboxes/${e}.hdr`;
      s.load(
        i,
        (o) => {
          this.scene.background && this.scene.background.dispose && this.scene.background.dispose(), o.mapping = l.EquirectangularReflectionMapping, this.scene.background = o, this.scene.environment = o, this.currentSkyboxId = e, console.log(`[SceneManager] HDR skybox loaded: ${e}`), t(!0);
        },
        void 0,
        (o) => {
          console.error(`[SceneManager] Failed to load HDR skybox (${e}):`, o), this.scene.background = new l.Color(8900331), t(!1);
        }
      );
    });
  }
  setSkybox(e) {
    this.currentSkyboxId !== e && this.loadSkybox(e);
  }
  /**
   * Set a simple default background (no skybox HDR)
   * Used when no custom environment is selected
   */
  setDefaultBackground() {
    this.scene.background && this.scene.background.dispose && this.scene.background.dispose(), this.scene.background = new l.Color(1710638), this.scene.environment = null, this.currentSkyboxId = null, console.log("[SceneManager] Using default background (no skybox)");
  }
  setExposure(e) {
    this.renderer && (this.renderer.toneMappingExposure = e);
  }
  onWindowResize() {
    if (!this.container || !this.renderer) return;
    const e = this.container.clientWidth, t = this.container.clientHeight;
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
  }
  render() {
    this.renderer && this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.renderer && (this.renderer.dispose(), this.renderer.domElement && this.renderer.domElement.parentNode && this.renderer.domElement.parentNode.removeChild(this.renderer.domElement), this.renderer = null);
  }
}
class Ae {
  constructor(e) {
    this.scene = e, this.arenaMeshes = [], this.drawingCollider = null, this.drawingColliderMeshes = [], this.arenaDecorMesh = null, this.showArenaDecor = !0, this.dracoLoader = new U(), this.dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"), this.gltfLoader = new R(), this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }
  async loadArenaMeshes() {
    try {
      console.log("Loading arena mesh...");
      const t = (await this.gltfLoader.loadAsync("/models/stadium/stadium.glb")).scene, s = [
        "Sol_Trait_T0",
        "Sol_Trait_T1",
        "Milieu_Forme",
        "Milieu_Forme.001",
        "cage_T0",
        "cage_T1",
        "Couleur_Hexagone_T0",
        "Couleur_Hexagone_T1",
        "wall_gradient_color_2",
        "wall_gradient_color_2.001",
        "Fond_BackBoard_Transparent",
        // For Transparant_BackBoard_+_Cage meshes
        "dégradé_transparent_T0",
        "dégradé_transparent_T1",
        // Glow effects on field edges
        "grid_transperant",
        // Goal glass mesh
        "Detail_Milieu",
        "Detail_Milieu.001"
        // Field mid details
      ], i = ["Glow", "Glass"], o = [
        "Plafond_Hexagone_T0",
        "Plafond_Hexagone_T1",
        "Plafond_Transparent"
      ];
      t.traverse((a) => {
        a.isMesh && (a.receiveShadow = !0, a.castShadow = !o.includes(a.name), this.arenaMeshes.push(a), i.some(
          (c) => a.name.includes(c)
        ) && (console.log(`[ArenaManager] Disabling frustum culling for: ${a.name}`), a.frustumCulled = !1), a.material && /^Hexagone_T[01]$/.test(a.material.name ?? "") && (a.material = a.material.clone(), a.material.transparent = !0, a.material.opacity = 0.18, a.material.depthWrite = !1, a.renderOrder = 1), a.material && a.material.name === "bannière_pub" && (a.visible = !1), a.material && a.material.name === "Sol_Hexagone" && (a.material = a.material.clone(), a.material.color.setScalar(0.35), a.material.metalness = 0, a.material.roughness = 1), a.material && a.material.name && s.includes(a.material.name) && (console.log(
          `[ArenaManager] Fixing visibility for: ${a.name} (material: ${a.material.name})`
        ), a.material = a.material.clone(), a.material.side = l.DoubleSide, a.material.depthWrite = !1, a.renderOrder = 1, a.frustumCulled = !1));
      }), console.log(`[ArenaManager] Collected ${this.arenaMeshes.length} meshes for raycasting`), this.scene.add(t), console.log("Arena mesh loaded successfully with correct orientation");
    } catch (e) {
      console.error("Error loading arena mesh:", e);
      const t = new l.PlaneGeometry(10240, 8192), s = new l.MeshStandardMaterial({
        color: 3355443,
        side: l.DoubleSide
      }), i = new l.Mesh(t, s);
      i.rotation.x = -Math.PI / 2, i.receiveShadow = !0, this.scene.add(i), this.arenaMeshes.push(i);
    }
  }
  /**
   * Get all arena meshes for raycasting
   * @returns {THREE.Mesh[]}
   */
  getArenaMeshes() {
    return this.arenaMeshes;
  }
  /**
   * Get drawing collider meshes for raycasting (simplified geometry)
   * @returns {THREE.Mesh[]}
   */
  getDrawingColliderMeshes() {
    return this.drawingColliderMeshes;
  }
  /**
   * Load the simplified drawing collider mesh
   * @param {boolean} visible - Whether to show the collider (for debugging/positioning)
   */
  async loadDrawingCollider(e = !1) {
    try {
      console.log("[ArenaManager] Loading drawing collider...");
      const s = await new xe().loadAsync("/models/stadium/DrawingArena.obj");
      s.rotation.x = Math.PI / 2, s.rotation.y = Math.PI, s.scale.setScalar(0.99), s.position.y = 20, s.traverse((i) => {
        i.isMesh && (this.drawingColliderMeshes.push(i), i.castShadow = !1, i.receiveShadow = !1, e ? i.material = new l.MeshBasicMaterial({
          color: 65280,
          transparent: !0,
          opacity: 0.7,
          side: l.DoubleSide
        }) : i.material = new l.MeshBasicMaterial({
          visible: !1
        }));
      }), this.drawingCollider = s, this.scene.add(s), console.log(
        `[ArenaManager] Drawing collider loaded with ${this.drawingColliderMeshes.length} meshes`
      );
    } catch (t) {
      console.error("[ArenaManager] Failed to load drawing collider:", t);
    }
  }
  /**
   * Toggle drawing collider visibility (for debugging)
   * @param {boolean} visible
   */
  setDrawingColliderVisible(e) {
    for (const t of this.drawingColliderMeshes)
      e ? t.material = new l.MeshBasicMaterial({
        color: 65280,
        wireframe: !0,
        transparent: !0,
        opacity: 0.5
      }) : t.material = new l.MeshBasicMaterial({
        visible: !1
      });
  }
  /**
   * Load the arena decoration mesh (stands, stadium surroundings)
   * @param {boolean} show - Whether to show the decoration initially
   */
  async loadArenaDecor(e = !0) {
    try {
      console.log("[ArenaManager] Loading arena decoration mesh...");
      const t = await this.gltfLoader.loadAsync("/models/stadium/arene.glb");
      this.arenaDecorMesh = t.scene, this.showArenaDecor = e, this.arenaDecorMesh.traverse((s) => {
        s.isMesh && (s.receiveShadow = !0, s.castShadow = !0);
      }), this.arenaDecorMesh.visible = e, this.scene.add(this.arenaDecorMesh), console.log(`[ArenaManager] Arena decoration loaded, visible: ${e}`);
    } catch (t) {
      console.error("[ArenaManager] Failed to load arena decoration:", t);
    }
  }
  /**
   * Set the visibility of the arena decoration
   * @param {boolean} visible
   */
  setArenaDecorVisible(e) {
    this.showArenaDecor = e, this.arenaDecorMesh && (this.arenaDecorMesh.visible = e, console.log(`[ArenaManager] Arena decoration visibility set to: ${e}`));
  }
  /**
   * Get the current visibility state of the arena decoration
   * @returns {boolean}
   */
  isArenaDecorVisible() {
    return this.showArenaDecor;
  }
}
class Ve {
  constructor() {
    this.fbxLoader = new we(), this.gltfLoader = new R(), this.textureLoader = new l.TextureLoader();
    const e = new U();
    e.setDecoderPath("/draco/"), this.gltfLoader.setDRACOLoader(e), this.modelCache = /* @__PURE__ */ new Map(), this.loadingPromises = /* @__PURE__ */ new Map(), this.modelConfig = {
      octane: {
        format: "glb",
        file: "octane.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      },
      fennec: {
        format: "glb",
        file: "fennec.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      },
      dominus: {
        format: "glb",
        file: "dominus.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      },
      breakout: {
        format: "glb",
        file: "breakout.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      },
      merc: {
        format: "glb",
        file: "merc.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      },
      mantis: {
        format: "glb",
        file: "mantis.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      },
      "x-devil": {
        format: "glb",
        file: "x-devil.glb",
        scale: 100,
        wheelSockets: !0,
        wheelModel: "Wheel_Boog.glb"
      }
    }, this.wheelModelCache = /* @__PURE__ */ new Map(), this.wheelLoadingPromises = /* @__PURE__ */ new Map(), this.preloadReady = Promise.resolve(), this._preloadStarted = !1, this.carNameToModel = {
      Octane: "octane",
      "Octane ZSR": "octane",
      Fennec: "fennec",
      Dominus: "dominus",
      "Dominus GT": "dominus",
      Breakout: "breakout",
      "Breakout Type-S": "breakout",
      Merc: "merc",
      Mantis: "mantis",
      "X-Devil": "x-devil",
      "X-Devil Mk2": "x-devil"
    }, this.hitboxToModel = {
      Octane: "octane",
      Dominus: "dominus",
      Breakout: "breakout",
      Plank: "mantis",
      Hybrid: "x-devil",
      Merc: "merc"
    }, this.TEAM_COLORS = {
      blue: new l.Color(26367),
      orange: new l.Color(16737792)
    }, this.HITBOX_DIMENSIONS = {
      octane: {
        length: 118.0074,
        width: 84.1994,
        height: 36.1591,
        offsetX: 13.87566,
        offsetZ: 20.75499
      },
      fennec: {
        length: 118.0074,
        width: 84.1994,
        height: 36.1591,
        offsetX: 13.87566,
        offsetZ: 20.75499
      },
      // Same as Octane hitbox
      dominus: { length: 127.9268, width: 83.28, height: 31.3, offsetX: 9, offsetZ: 15.75 },
      breakout: { length: 131.4924, width: 80.521, height: 30.3, offsetX: 12.5, offsetZ: 11.75 },
      mantis: {
        length: 128.8198,
        width: 84.6704,
        height: 29.3944,
        offsetX: 9.00857,
        offsetZ: 12.0942
      },
      // Plank hitbox
      "x-devil": {
        length: 127.0192,
        width: 82.1879,
        height: 34.1591,
        offsetX: 13.87566,
        offsetZ: 20.75499
      },
      // Hybrid hitbox
      merc: { length: 120.72, width: 76.71, height: 41.66, offsetX: 11.37566, offsetZ: 21.504988 }
    };
  }
  /**
   * Preload car models for a specific replay based on players' cars.
   * Only loads models actually used in the replay.
   * @param {Array<{carName: string, hitboxType: string}>} players - Array of player entities with carName and hitboxType
   * @returns {Promise<void>}
   */
  async preloadModelsForReplay(e) {
    if (this._preloadStarted)
      return console.log("[CarModelLoader] Preload already started, returning existing promise"), this.preloadReady;
    this._preloadStarted = !0;
    const t = /* @__PURE__ */ new Set();
    for (const i of e) {
      const o = this.getModelTypeForCar(i.carName, i.hitboxType);
      t.add(o);
    }
    const s = [...t];
    return console.log(
      `[CarModelLoader] Preloading ${s.length} car models for replay: ${s.join(", ")}`
    ), this.preloadReady = this._preloadModels(s), this.preloadReady;
  }
  /**
   * Preload specific car models. Returns a promise that resolves when all models are loaded.
   * @param {string[]} modelTypes - Array of model types to preload (e.g., ['octane', 'fennec'])
   * @returns {Promise<void>}
   */
  async _preloadModels(e) {
    for (const t of e)
      try {
        await this.loadModel(t), console.log(`✓ Preloaded car model: ${t}`);
      } catch (s) {
        console.warn(`⚠️ Failed to preload ${t}:`, s.message);
      }
  }
  /**
   * Preload ALL car models (legacy method for backwards compatibility).
   * Prefer preloadModelsForReplay() for better performance.
   * @returns {Promise<void>}
   */
  async preloadAllModels() {
    const e = ["octane", "fennec", "dominus", "breakout", "merc", "mantis", "x-devil"];
    return console.log("[CarModelLoader] Preloading ALL car models (legacy mode)"), this._preloadStarted = !0, this.preloadReady = this._preloadModels(e), this.preloadReady;
  }
  /**
   * Wait for all preloaded models to be ready
   * @returns {Promise<void>}
   */
  async waitForPreload() {
    return this.preloadReady;
  }
  /**
   * Load a car model and its chassis texture
   * @param {string} modelType - 'octane', 'dominus', or 'fennec'
   * @returns {Promise<{model: THREE.Group, chassisTexture: THREE.Texture}>}
   */
  async loadModel(e) {
    if (this.modelCache.has(e))
      return this.modelCache.get(e);
    if (this.loadingPromises.has(e))
      return this.loadingPromises.get(e);
    const t = this._loadModelInternal(e);
    this.loadingPromises.set(e, t);
    try {
      const s = await t;
      return this.modelCache.set(e, s), s;
    } finally {
      this.loadingPromises.delete(e);
    }
  }
  async _loadModelInternal(e) {
    const t = `/models/cars/${e}`, s = this.modelConfig[e] || {
      format: "glb",
      file: `${e}.glb`,
      scale: 100,
      wheelSockets: !0,
      wheelModel: "Wheel_Boog.glb"
    };
    let i, o = null, a = null;
    if (s.format === "glb") {
      const c = `${t}/${s.file}`;
      s.wheelSockets && s.wheelModel ? ([i, a] = await Promise.all([
        this._loadGLB(c),
        this.loadWheelModel(s.wheelModel)
      ]), console.log(`✓ Loaded GLB model with separate wheels: ${c}`)) : (i = await this._loadGLB(c), console.log(`✓ Loaded GLB model: ${c}`));
    } else {
      const c = `${t}/${s.file}.fbx`, r = s.file, h = `${t}/${r}_engine.png`;
      [i, o] = await Promise.all([
        this._loadFBX(c),
        this._loadTexture(h).catch((d) => (console.warn(`⚠️ Could not load texture ${h}:`, d.message), null))
      ]);
    }
    this._processModelMaterials(i, o, e, s.format);
    const n = this._calculateModelScale(i, e, s.scale);
    if (i.userData.scaleInfo = n, i.userData.format = s.format, s.wheelSockets) {
      i.userData.wheelSockets = !0, i.userData.wheelModelName = s.wheelModel;
      const c = this._findWheelSockets(i);
      i.userData.wheelSocketObjects = c, console.log(`🔌 Found ${Object.keys(c).length} wheel sockets`);
    }
    return { model: i, chassisTexture: o, wheelModel: a };
  }
  /**
   * Find wheel socket empty objects in the model
   * Expected names: Wheel_BL, Wheel_BR, Wheel_FL, Wheel_FR
   * (BackLeft, BackRight, FrontLeft, FrontRight)
   * @param {THREE.Group} model - The loaded model
   * @returns {Object} Map of socket name to socket object
   */
  _findWheelSockets(e) {
    const t = {}, s = ["Wheel_BL", "Wheel_BR", "Wheel_FL", "Wheel_FR"];
    console.log("🔍 Searching for wheel sockets..."), e.traverse((i) => {
      const o = i.name, a = o.toLowerCase();
      for (const n of s)
        (o === n || a === n.toLowerCase()) && (t[n] = i, console.log(
          `   Found socket: "${o}" at position (${i.position.x.toFixed(2)}, ${i.position.y.toFixed(2)}, ${i.position.z.toFixed(2)})`
        ));
    });
    for (const i of s)
      t[i] || console.warn(`   ⚠️ Missing wheel socket: ${i}`);
    return Object.keys(t).length === 0 && (console.warn("⚠️ No wheel sockets found! Listing all objects:"), e.traverse((i) => {
      console.log(`   - "${i.name}" (${i.type})`);
    })), t;
  }
  /**
   * Calculate the proper scale factor to match Rocket League hitbox dimensions
   * @param {THREE.Group} model - The loaded model
   * @param {string} modelType - 'octane', 'dominus', or 'fennec'
   * @param {number|null} overrideScale - If provided, use this scale directly (skip auto-calc)
   * @returns {{ scale: number, offsetX: number, offsetY: number }}
   */
  _calculateModelScale(e, t, s = null) {
    const i = new l.Box3().setFromObject(e), o = new l.Vector3();
    i.getSize(o), console.log(`📐 ${t.toUpperCase()} model dimensions (raw):`), console.log(`   Size: X=${o.x.toFixed(2)}, Y=${o.y.toFixed(2)}, Z=${o.z.toFixed(2)}`), console.log(`   Min Y: ${i.min.y.toFixed(2)}, Max Y: ${i.max.y.toFixed(2)}`);
    const a = this.HITBOX_DIMENSIONS[t] || this.HITBOX_DIMENSIONS.octane;
    let n;
    if (s !== null)
      n = s, console.log(`   Using override scale: ${n}`);
    else {
      const c = o.z, h = a.length * 1 / c;
      n = h * 0.55, console.log(`   Target RL: ${a.length} x ${a.width} x ${a.height} uu`), console.log(`   Scale to RL: ${h.toFixed(4)}, Final scale: ${n.toFixed(6)}`);
    }
    return { scale: n };
  }
  _loadFBX(e) {
    return new Promise((t, s) => {
      this.fbxLoader.load(
        e,
        (i) => t(i),
        void 0,
        (i) => s(new Error(`Failed to load FBX: ${e} - ${i.message}`))
      );
    });
  }
  _loadGLB(e) {
    return new Promise((t, s) => {
      this.gltfLoader.load(
        e,
        (i) => {
          t(i.scene);
        },
        void 0,
        (i) => s(new Error(`Failed to load GLB: ${e} - ${i.message}`))
      );
    });
  }
  /**
   * Load a wheel model for cars with separate wheels
   * @param {string} wheelModelName - The wheel model filename (e.g., 'Wheel_Boog.glb')
   * @returns {Promise<THREE.Group>}
   */
  async loadWheelModel(e) {
    if (this.wheelModelCache.has(e))
      return this.wheelModelCache.get(e);
    if (this.wheelLoadingPromises.has(e))
      return this.wheelLoadingPromises.get(e);
    const t = this._loadGLB(`/models/wheels/${e}`);
    this.wheelLoadingPromises.set(e, t);
    try {
      const s = await t;
      return console.log(`✓ Loaded wheel model: ${e}`), s.traverse((i) => {
        i.isMesh && (i.castShadow = !0, i.receiveShadow = !0);
      }), this.wheelModelCache.set(e, s), s;
    } catch (s) {
      throw console.error(`Failed to load wheel model ${e}:`, s), s;
    } finally {
      this.wheelLoadingPromises.delete(e);
    }
  }
  _loadTexture(e) {
    return new Promise((t, s) => {
      this.textureLoader.load(
        e,
        (i) => {
          i.flipY = !1, i.colorSpace = l.SRGBColorSpace, t(i);
        },
        void 0,
        (i) => s(new Error(`Failed to load texture: ${e}`))
      );
    });
  }
  _processModelMaterials(e, t, s, i = "fbx") {
    console.log(`📦 Processing materials for ${s} (${i}):`);
    const o = ["body", "paint"], a = [];
    e.traverse((n) => {
      n.isLight && (a.push(n), console.log(`  🔦 Removing imported light: "${n.name || n.type}"`));
    }), a.forEach((n) => {
      n.parent && n.parent.remove(n);
    }), e.traverse((n) => {
      n.isMesh && (console.log(`  Mesh: "${n.name}"`), (Array.isArray(n.material) ? n.material : [n.material]).forEach((r, h) => {
        console.log(
          `    [${h}] Material: "${r.name}" - Color: #${r.color?.getHexString() || "none"}`
        );
        const d = (r.name || "").toLowerCase(), u = (n.name || "").toLowerCase(), m = o.some(
          (f) => d.includes(f) || u.includes(f)
        );
        if (i === "glb")
          (r.isMeshStandardMaterial || r.isMeshPhysicalMaterial) && (console.log(
            `      → GLB material (keeping as-is): metalness=${r.metalness?.toFixed(2)}, roughness=${r.roughness?.toFixed(2)}`
          ), r.userData.originalColor = r.color?.clone(), r.userData.isBodyMaterial = m);
        else if (r.isMeshPhongMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial) {
          let f;
          m ? (f = new l.MeshStandardMaterial({
            color: r.color,
            map: r.map,
            metalness: 0.8,
            roughness: 0.15
          }), console.log("      → Body material: shiny metallic")) : (f = new l.MeshStandardMaterial({
            color: r.color,
            map: r.map,
            metalness: 0.1,
            roughness: 0.6
          }), console.log("      → Non-body material: matte")), f.name = r.name, Array.isArray(n.material) ? n.material[h] = f : n.material = f;
        }
      }));
    }), t ? console.log(`  ✓ Chassis texture loaded for ${s}`) : i === "fbx" && console.log(`  ⚠️ No chassis texture for ${s}`);
  }
  /**
   * Get the model type for a given car name and hitbox type
   * @param {string} carName - The car name (e.g., "Fennec", "Octane")
   * @param {string} hitboxType - The hitbox type as fallback
   * @returns {string} The model folder name
   */
  getModelTypeForCar(e, t) {
    return e && this.carNameToModel[e] ? this.carNameToModel[e] : this.hitboxToModel[t] || "octane";
  }
  /**
   * @deprecated Use getModelTypeForCar instead
   */
  getModelTypeForHitbox(e) {
    return this.hitboxToModel[e] || "octane";
  }
  /**
   * Create a car mesh for a specific hitbox type and team
   * @param {string} hitboxType - 'Octane', 'Dominus', etc.
   * @param {number} team - 0 for blue, 1 for orange
   * @returns {Promise<THREE.Group|null>} The car mesh or null if not loaded
   */
  async createCarMesh(e, t = 0) {
    const s = this.getModelTypeForHitbox(e);
    try {
      const i = await this.loadModel(s);
      if (!i || !i.model)
        return console.warn(`No cached model for ${s}`), null;
      const o = i.model.userData.format || "fbx";
      let a;
      o === "glb" ? (a = E(i.model), a.traverse((r) => {
        r.isMesh && (Array.isArray(r.material) ? r.material = r.material.map((h) => h.clone()) : r.material && (r.material = r.material.clone()));
      })) : a = i.model.clone(), this.applyTeamColor(a, t);
      const n = new l.Group(), c = i.model.userData.scaleInfo;
      return c && a.scale.setScalar(c.scale), n.add(a), a.traverse((r) => {
        r.isMesh && (r.castShadow = !0);
      }), n.userData.modelType = s, n.userData.hitboxType = e, n.userData.team = t, n.userData.isFBXModel = o === "fbx", n.userData.isGLBModel = o === "glb", n;
    } catch (i) {
      return console.error(`Failed to create car mesh for ${e}:`, i), null;
    }
  }
  /**
   * Apply team color to the car body material
   * @param {THREE.Group} carMesh - The car mesh group
   * @param {number} team - 0 for blue, 1 for orange
   */
  applyTeamColor(e, t) {
    const s = t === 0 ? this.TEAM_COLORS.blue : this.TEAM_COLORS.orange, i = ["body", "paint"];
    let o = !1;
    console.log("🔍 Analyzing car meshes for team coloring:"), e.traverse((a) => {
      if (a.isMesh) {
        const n = Array.isArray(a.material) ? a.material : [a.material];
        console.log(`  Mesh: "${a.name}" with ${n.length} material(s)`), n.forEach((c, r) => {
          console.log(
            `    [${r}] Material: "${c.name}", isBodyMaterial: ${c.userData?.isBodyMaterial}`
          );
        });
      }
    }), e.traverse((a) => {
      a.isMesh && (Array.isArray(a.material) ? a.material : [a.material]).forEach((c, r) => {
        const h = (c.name || "").toLowerCase(), d = (a.name || "").toLowerCase(), u = c.userData?.isBodyMaterial || i.some((m) => h.includes(m) || d.includes(m));
        if (console.log(`    Checking "${c.name}" on "${a.name}": isBody=${u}`), u) {
          o = !0;
          const m = c.clone();
          m.color = s.clone(), m.metalness = 0.39, m.roughness = 0.47, m.userData = { ...c.userData }, Array.isArray(a.material) ? a.material[r] = m : a.material = m, console.log(
            `🎨 Applied team color to: "${c.name}" on mesh "${a.name}" (index ${r})`
          );
        }
      });
    }), o || console.warn("⚠️ No body material found for team coloring! Check material names.");
  }
  /**
   * Update the team color of an existing car mesh
   * @param {THREE.Group} carMesh - The car mesh group
   * @param {number} team - 0 for blue, 1 for orange
   */
  updateTeamColor(e, t) {
    this.applyTeamColor(e, t);
  }
  /**
   * Check if a model is loaded and ready
   * @param {string} carName - The car name
   * @param {string} hitboxType - The hitbox type as fallback
   * @returns {boolean}
   */
  isModelReady(e, t) {
    const s = this.getModelTypeForCar(e, t);
    return this.modelCache.has(s);
  }
  /**
   * Get a synchronous car mesh if available (returns null if not loaded)
   * @param {string} carName - The car name
   * @param {string} hitboxType - The hitbox type as fallback
   * @param {number} team - 0 for blue, 1 for orange
   * @returns {THREE.Group|null}
   */
  getCarMeshSync(e, t, s = 0) {
    const i = this.getModelTypeForCar(e, t), o = this.modelCache.get(i);
    if (!o || !o.model)
      return null;
    const a = o.model.userData.format || "fbx", n = o.model.userData.wheelSockets;
    let c;
    a === "glb" ? (c = E(o.model), c.traverse((d) => {
      d.isMesh && (Array.isArray(d.material) ? d.material = d.material.map((u) => u.clone()) : d.material && (d.material = d.material.clone()));
    })) : c = o.model.clone(), this.applyTeamColor(c, s);
    const r = new l.Group(), h = o.model.userData.scaleInfo;
    return h && c.scale.setScalar(h.scale), r.add(c), c.traverse((d) => {
      d.isMesh && (d.castShadow = !0);
    }), r.userData.modelType = i, r.userData.carName = e, r.userData.hitboxType = t, r.userData.team = s, r.userData.isFBXModel = a === "fbx", r.userData.isGLBModel = a === "glb", r.userData.hasWheelSockets = n, n ? r.userData.wheels = this._attachWheelsToSockets(c, o.wheelModel) : r.userData.wheels = this._findWheelMeshes(c), r;
  }
  /**
   * Attach wheel models to socket empty objects in the car model
   * Socket naming: Wheel_BL (BackLeft), Wheel_BR (BackRight), Wheel_FL (FrontLeft), Wheel_FR (FrontRight)
   * @param {THREE.Group} carModel - The cloned car model
   * @param {THREE.Group} wheelModelTemplate - The wheel model to clone and attach
   * @returns {Array<{mesh: THREE.Object3D, steeringPivot: THREE.Object3D|null, side: string, position: string}>}
   */
  _attachWheelsToSockets(e, t) {
    const s = [], i = {
      Wheel_FL: { side: "left", position: "front" },
      Wheel_FR: { side: "right", position: "front" },
      Wheel_BL: { side: "left", position: "rear" },
      Wheel_BR: { side: "right", position: "rear" }
    };
    if (!t)
      return console.warn("⚠️ No wheel model template available for socket attachment"), s;
    console.log("🔧 Attaching wheels to sockets...");
    const o = {};
    e.traverse((a) => {
      const n = a.name;
      i[n] && (o[n] = a);
    });
    for (const [a, n] of Object.entries(i)) {
      const c = o[a];
      if (!c) {
        console.warn(`   ⚠️ Socket not found: ${a}`);
        continue;
      }
      const r = E(t);
      r.traverse((h) => {
        h.isMesh && (Array.isArray(h.material) ? h.material = h.material.map((d) => d.clone()) : h.material && (h.material = h.material.clone()), h.castShadow = !0);
      }), r.position.set(0, 0, 0), r.rotation.set(0, 0, 0), c.add(r), console.log(
        `   ✓ Attached wheel to ${a} (${n.position} ${n.side})`
      ), s.push({
        mesh: r,
        steeringPivot: n.position === "front" ? c : null,
        side: n.side,
        position: n.position,
        socket: c
        // Keep reference to socket for debugging
      });
    }
    return console.log(`✓ Attached ${s.length} wheels to sockets`), s;
  }
  /**
   * Find wheel meshes in the car model
   * New naming convention with pivot hierarchy:
   * - Wheel_XX_Z = steering pivot (rotates around Z for steering)
   * - Wheel_XX_Y = wheel mesh (rotates around Y for rolling)
   * @param {THREE.Group} model - The FBX model
   * @returns {Array<{mesh: THREE.Object3D, steeringPivot: THREE.Object3D|null, side: string, position: string}>}
   */
  _findWheelMeshes(e) {
    const t = [], s = {
      fl: { side: "left", position: "front" },
      fr: { side: "right", position: "front" },
      rl: { side: "left", position: "rear" },
      rr: { side: "right", position: "rear" }
    };
    console.log("🔍 Searching for wheels in model...");
    const i = {};
    e.traverse((o) => {
      const n = o.name.toLowerCase().match(/^wheel_(fl|fr|rl|rr)_(y|z)$/);
      if (n) {
        const c = n[1], r = n[2];
        i[c] || (i[c] = {}), i[c][r] = o, console.log(
          `   Found: "${o.name}" (${r === "y" ? "wheel mesh" : "steering pivot"})`
        );
      }
    });
    for (const [o, a] of Object.entries(i)) {
      const n = s[o];
      if (!n) continue;
      const c = a.y, r = a.z;
      c && (o === "fr" && (c.rotation.z += Math.PI, console.log("   Fixed FR wheel orientation (rotation.z += PI)")), t.push({
        mesh: c,
        steeringPivot: n.position === "front" ? r : null,
        side: n.side,
        position: n.position
      }), console.log(
        `🛞 Wheel ${o.toUpperCase()}: mesh="${c.name}"${r && n.position === "front" ? `, steering="${r.name}"` : ""}`
      ));
    }
    return t.length === 0 ? (console.warn("⚠️ No wheel meshes found. Expected: Wheel_FL_Y, Wheel_FR_Y, etc."), console.warn("   Listing all objects in model:"), e.traverse((o) => {
      console.log(`   - "${o.name}" (${o.type})`);
    })) : console.log(`✓ Found ${t.length} wheels`), t;
  }
  dispose() {
    this.modelCache.forEach(({ model: e, chassisTexture: t }) => {
      e.traverse((s) => {
        s.isMesh && (s.geometry && s.geometry.dispose(), (Array.isArray(s.material) ? s.material : [s.material]).forEach((o) => o.dispose()));
      }), t && t.dispose();
    }), this.modelCache.clear(), this.wheelModelCache.forEach((e) => {
      e.traverse((t) => {
        t.isMesh && (t.geometry && t.geometry.dispose(), (Array.isArray(t.material) ? t.material : [t.material]).forEach((i) => i.dispose()));
      });
    }), this.wheelModelCache.clear();
  }
}
class Fe {
  constructor(e, t) {
    this.scene = e, this.effectsManager = t, this.actors = {}, this.ballActorId = null, this.ballIndicator = null, this.ballVerticalLine = null, this.playerNames = /* @__PURE__ */ new Set(), this.actorToPlayer = {}, this.actorLinks = {}, this.playerNameToCarActorId = {}, this.playerNameToPriActorId = {}, this.playerTeams = {}, this.actorLoadouts = {}, this.carBodyIds = {}, this.carModelLoader = new Ve(), this.pendingCarReplacements = /* @__PURE__ */ new Map(), this._p0 = new l.Vector3(), this._p1 = new l.Vector3(), this._v0 = new l.Vector3(), this._v1 = new l.Vector3(), this._nextRot = new l.Quaternion(), this._q0 = new l.Quaternion(), this._q1 = new l.Quaternion(), this._qResult = new l.Quaternion(), this.onPlayerFound = null, this.lastBallTouchTeam = 0, this.BALL_TOUCH_DISTANCE = 200, this.ballTimeline = [], this.playerTimelineMap = {}, this.timelineIndices = { ball: 0, players: {} }, this.interpolantsInitialized = !1, this.animationMixer = null, this.animationActions = {}, this.animationClock = new l.Clock(!1), this.replayDuration = 0, this.useAnimationSystem = !1, this.SMOOTHING_WINDOW = 5, this.positionBuffers = {}, this.rotationBuffers = {}, this.interpolationEnabled = !0, this.interpolationMethod = "hermite", this.smoothingWindowSize = 12, this.lastFrameInfo = null, this._lowPassState = /* @__PURE__ */ new Map(), this._lowPassAlpha = 0.3, this._predictState = /* @__PURE__ */ new Map(), this._predictCorrectionTime = 0.1, this._smoothingBuffers = /* @__PURE__ */ new Map(), this._adaptiveState = /* @__PURE__ */ new Map(), this.ballModel = null, this._ballModelReplaced = !1;
    const s = new R();
    this.ballModelReady = new Promise((i) => {
      s.load(
        "/models/ball/scene.gltf",
        (o) => {
          this.ballModel = o.scene, console.log("✓ Ball model loaded"), i(!0);
        },
        void 0,
        (o) => {
          console.error("Failed to load ball model:", o), i(!1);
        }
      );
    });
  }
  /**
   * Wait for ball model to be loaded, then replace the ball mesh if not already done.
   * This should be called BEFORE shader compilation to ensure all meshes are ready.
   * @returns {Promise<boolean>} - true if loaded successfully, false otherwise
   */
  async waitForBallModel() {
    const e = await this.ballModelReady;
    return e && !this._ballModelReplaced && this.ballActorId && this.actors[this.ballActorId] && (this.replaceBallWithModel(this.ballActorId), this._ballModelReplaced = !0), e;
  }
  replaceBallWithModel(e) {
    const t = this.actors[e];
    if (!t || !this.ballModel) return;
    const s = this.ballModel.clone();
    s.userData = t.userData, s.position.copy(t.position), s.quaternion.copy(t.quaternion), s.scale.copy(t.scale);
    const i = 92.75;
    s.scale.set(i, i, i), s.traverse((o) => {
      o.isMesh && (o.castShadow = !0, o.receiveShadow = !0);
    }), this.scene.remove(t), this.scene.add(s), t.geometry && t.geometry.dispose(), t.material && t.material.dispose(), this.actors[e] = s, console.log("✓ Ball replaced with GLTF model");
  }
  reset() {
    Object.values(this.actors).forEach((e) => {
      this.scene.remove(e), e.geometry && e.geometry.dispose(), e.material && e.material.dispose();
    }), this.actors = {}, this.ballActorId = null, this.ballIndicator && (this.scene.remove(this.ballIndicator), this.ballIndicator.geometry && this.ballIndicator.geometry.dispose(), this.ballIndicator.material && this.ballIndicator.material.dispose(), this.ballIndicator = null), this.ballVerticalLine && (this.scene.remove(this.ballVerticalLine), this.ballVerticalLine.geometry && this.ballVerticalLine.geometry.dispose(), this.ballVerticalLine.material && this.ballVerticalLine.material.dispose(), this.ballVerticalLine = null), this.actorToPlayer = {}, this.actorLinks = {}, this.playerNameToCarActorId = {}, this.playerNameToPriActorId = {}, this.actorLoadouts = {};
  }
  setPlayerTeams(e) {
    this.playerTeams = e;
  }
  /**
   * Initialize actors from framework Player API (static mesh creation)
   * This replaces the old processFrame approach - meshes are created once at load time
   * @param {Player} player - Framework Player instance
   */
  initFromFramework(e) {
    console.log("[ActorManager] Initializing actors from framework..."), this._createBallMesh();
    const t = e.playerList;
    t.forEach((s, i) => {
      this._createCarMesh(
        s.name,
        s.team,
        i,
        s.carName,
        s.hitboxType
      );
      const o = this.playerNameToCarActorId[s.name];
      this.actors[o];
    }), console.log(`[ActorManager] Created ${t.length} car meshes + 1 ball`);
  }
  /**
   * Initialize interpolation system with timeline data
   * Uses Three.js AnimationMixer for smooth playback (handles variable frame deltas correctly)
   * @param {Object} timelines - { ballTimeline, playerTimelines } from framework
   */
  initInterpolants(e) {
    console.log("[ActorManager] Initializing interpolation system..."), this.ballTimeline = e.ballTimeline || [], this.playerTimelineMap = e.playerTimelines || {}, this.ballTimelineCorrected = this._correctTimeShiftedPositions(this.ballTimeline), this.playerTimelineMapCorrected = {}, Object.entries(this.playerTimelineMap).forEach(([i, o]) => {
      this.playerTimelineMapCorrected[i] = this._correctTimeShiftedPositions(o);
    }), this.ballTimelineFiltered = this._filterBadFrames(this.ballTimeline), this.playerTimelineMapFiltered = {}, Object.entries(this.playerTimelineMap).forEach(([i, o]) => {
      this.playerTimelineMapFiltered[i] = this._filterBadFrames(o);
    }), this.timelineIndices = {
      ball: 0,
      players: {}
    }, this.timelineIndicesFiltered = {
      ball: 0,
      players: {}
    }, this.timelineIndicesCorrected = {
      ball: 0,
      players: {}
    }, Object.keys(this.playerTimelineMap).forEach((i) => {
      this.timelineIndices.players[i] = 0, this.timelineIndicesFiltered.players[i] = 0, this.timelineIndicesCorrected.players[i] = 0;
    }), this.ballTimeline.length > 0 && (this.replayDuration = this.ballTimeline[this.ballTimeline.length - 1].time), this.useAnimationSystem && this._initAnimationSystem(), this.interpolantsInitialized = !0;
    const t = this.ballTimeline.length - this.ballTimelineFiltered.length, s = this.ballTimelineCorrected._correctedCount || 0;
    console.log(
      `  Ball: ${this.ballTimeline.length} keyframes (${s} corrected, ${t} filtered)`
    ), Object.entries(this.playerTimelineMap).forEach(([i, o]) => {
      const a = this.playerTimelineMapCorrected[i]?._correctedCount || 0;
      console.log(`  ${i}: ${o.length} keyframes (${a} corrected)`);
    }), console.log(`  Replay duration: ${this.replayDuration.toFixed(2)}s`), console.log("[ActorManager] Animation system ready");
  }
  /**
   * Initialize Three.js AnimationMixer and create KeyframeTracks for all entities
   * This is the recommended approach for smooth replay playback with variable frame deltas
   */
  _initAnimationSystem() {
    console.log("[ActorManager] Building Three.js animation clips..."), this.animationMixer = new l.AnimationMixer(this.scene);
    const e = this.actors[this.ballActorId];
    if (e && this.ballTimeline.length > 0) {
      const t = this._createAnimationClip("ball", this.ballTimeline, e);
      if (t) {
        const s = this.animationMixer.clipAction(t, e);
        s.setLoop(l.LoopOnce), s.clampWhenFinished = !0, this.animationActions.ball = s, console.log(`  ✓ Ball animation: ${t.duration.toFixed(2)}s`);
      }
    }
    Object.entries(this.playerTimelineMap).forEach(([t, s]) => {
      const i = this.playerNameToCarActorId[t], o = this.actors[i];
      if (o && s.length > 0) {
        const a = this._createAnimationClip(t, s, o);
        if (a) {
          const n = this.animationMixer.clipAction(a, o);
          n.setLoop(l.LoopOnce), n.clampWhenFinished = !0, this.animationActions[t] = n, console.log(`  ✓ ${t} animation: ${a.duration.toFixed(2)}s`);
        }
      }
    }), console.log("[ActorManager] Animation clips ready");
  }
  /**
   * Create a Three.js AnimationClip from timeline data
   * @param {string} name - Clip name
   * @param {Array} timeline - Array of {time, position, rotation, velocity}
   * @param {THREE.Object3D} target - Target mesh
   * @returns {THREE.AnimationClip|null}
   */
  _createAnimationClip(e, t, s) {
    if (!t || t.length < 2) return null;
    const i = [], o = [], a = [], n = t[0];
    n.time > 0 && (i.push(0), n.position ? o.push(
      n.position.x,
      n.position.y,
      n.position.z
    ) : o.push(0, 0, 0), n.rotation ? a.push(
      n.rotation.x,
      n.rotation.y,
      n.rotation.z,
      n.rotation.w
    ) : a.push(0, 0, 0, 1));
    for (const u of t) {
      if (i.push(u.time), u.position)
        o.push(u.position.x, u.position.y, u.position.z);
      else {
        const m = o.length - 3;
        m >= 0 ? o.push(o[m], o[m + 1], o[m + 2]) : o.push(0, 0, 0);
      }
      if (u.rotation)
        a.push(
          u.rotation.x,
          u.rotation.y,
          u.rotation.z,
          u.rotation.w
        );
      else {
        const m = a.length - 4;
        m >= 0 ? a.push(
          a[m],
          a[m + 1],
          a[m + 2],
          a[m + 3]
        ) : a.push(0, 0, 0, 1);
      }
    }
    const c = new l.VectorKeyframeTrack(
      ".position",
      i,
      o,
      l.InterpolateLinear
    ), r = new l.QuaternionKeyframeTrack(
      ".quaternion",
      i,
      a
      // Quaternion tracks use SLERP by default
    ), h = i[i.length - 1] - i[0];
    return new l.AnimationClip(e, h, [c, r]);
  }
  /**
   * Start all animations (call when replay starts playing)
   */
  startAnimations() {
    this.animationMixer && (Object.values(this.animationActions).forEach((e) => {
      e.reset(), e.play();
    }), this.animationClock.start(), console.log("[ActorManager] Animations started"));
  }
  /**
   * Pause all animations
   */
  pauseAnimations() {
    this.animationMixer && Object.values(this.animationActions).forEach((e) => {
      e.paused = !0;
    });
  }
  /**
   * Resume animations
   */
  resumeAnimations() {
    this.animationMixer && Object.values(this.animationActions).forEach((e) => {
      e.paused = !1;
    });
  }
  /**
   * Seek animations to a specific time
   * @param {number} time - Time in seconds
   */
  seekAnimations(e) {
    this.animationMixer && (Object.values(this.animationActions).forEach((t) => {
      t.time = e;
    }), this.animationMixer.setTime(e));
  }
  /**
   * Update the animation mixer (call every frame)
   * @param {number} delta - Time delta in seconds
   */
  updateAnimations(e) {
    !this.animationMixer || !this.useAnimationSystem || this.animationMixer.update(e);
  }
  /**
   * Sub-sample a timeline by taking every 2nd keyframe
   * This reduces the alternating acceleration pattern caused by
   * what appears to be two interleaved update sources in the replay
   * @param {Array} timeline - Original timeline array
   * @returns {Array} Sub-sampled timeline (half the keyframes)
   */
  _subsampleTimeline(e) {
    return !e || e.length < 4 ? e : e.filter((t, s) => s % 2 === 0);
  }
  /**
   * Initialize or get a smoothing buffer for an entity
   * @param {string} entityId - Entity identifier (ball or player name)
   * @returns {Object} Buffer object with { positions: [], rotations: [] }
   */
  _getOrCreateSmoothingBuffer(e) {
    return this.positionBuffers[e] || (this.positionBuffers[e] = [], this.rotationBuffers[e] = []), {
      positions: this.positionBuffers[e],
      rotations: this.rotationBuffers[e]
    };
  }
  /**
   * Add a position to the smoothing buffer and return smoothed position
   * Uses moving average over SMOOTHING_WINDOW frames
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position {x, y, z}
   */
  _smoothPosition(e, t) {
    const s = this._getOrCreateSmoothingBuffer(e).positions;
    for (s.push({ x: t.x, y: t.y, z: t.z }); s.length > this.SMOOTHING_WINDOW; )
      s.shift();
    if (s.length === 1) return t;
    let i = 0, o = 0, a = 0;
    for (const n of s)
      i += n.x, o += n.y, a += n.z;
    return {
      x: i / s.length,
      y: o / s.length,
      z: a / s.length
    };
  }
  /**
   * Add a rotation to the smoothing buffer and return smoothed rotation
   * Uses SLERP-based averaging
   * @param {string} entityId - Entity identifier
   * @param {Object} rot - Rotation quaternion {x, y, z, w}
   * @returns {Object} Smoothed rotation {x, y, z, w}
   */
  _smoothRotation(e, t) {
    const s = this._getOrCreateSmoothingBuffer(e).rotations;
    for (s.push({ x: t.x, y: t.y, z: t.z, w: t.w }); s.length > this.SMOOTHING_WINDOW; )
      s.shift();
    if (s.length < 3) return t;
    const i = Math.floor(s.length / 2);
    return s[i];
  }
  /**
   * Reset smoothing buffers (call when seeking)
   */
  resetSmoothingBuffers() {
    this.positionBuffers = {}, this.rotationBuffers = {}, this._lowPassState.clear();
  }
  /**
   * Find the keyframe index for a given time using cached binary search
   * @param {Array} timeline - Timeline array with {time} entries
   * @param {number} time - Current time
   * @param {number} lastIndex - Last known index (for cache)
   * @returns {number} Index of the keyframe just before or at time
   */
  _findKeyframeIndex(e, t, s = 0) {
    if (!e || e.length === 0) return -1;
    if (t <= e[0].time) return 0;
    if (t >= e[e.length - 1].time) return e.length - 2;
    let i = Math.max(0, Math.min(s, e.length - 2));
    if (e[i].time <= t && e[i + 1].time > t)
      return i;
    if (i + 2 < e.length && e[i + 1].time <= t && e[i + 2].time > t)
      return i + 1;
    let o = 0, a = e.length - 2;
    for (; o <= a; ) {
      const n = Math.floor((o + a) / 2);
      if (e[n].time <= t && e[n + 1].time > t)
        return n;
      e[n].time > t ? a = n - 1 : o = n + 1;
    }
    return Math.max(0, Math.min(o, e.length - 2));
  }
  /**
   * Apply smoothing filter to a position (moving average)
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applySmoothing(e, t) {
    this._smoothingBuffers.has(e) || this._smoothingBuffers.set(e, []);
    const s = this._smoothingBuffers.get(e);
    for (s.push({ x: t.x, y: t.y, z: t.z }); s.length > this.smoothingWindowSize; )
      s.shift();
    if (s.length === 1) return t;
    let i = 0, o = 0, a = 0;
    for (const n of s)
      i += n.x, o += n.y, a += n.z;
    return {
      x: i / s.length,
      y: o / s.length,
      z: a / s.length
    };
  }
  /**
   * Apply exponential moving average (EMA) smoothing
   * Less latency than simple moving average, weights recent values more
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyEmaSmoothing(e, t) {
    const s = `ema-${e}`;
    if (!this._smoothingBuffers.has(s))
      return this._smoothingBuffers.set(s, { x: t.x, y: t.y, z: t.z }), t;
    const i = this._smoothingBuffers.get(s), o = Math.max(0.05, Math.min(0.5, 1 / this.smoothingWindowSize)), a = {
      x: o * t.x + (1 - o) * i.x,
      y: o * t.y + (1 - o) * i.y,
      z: o * t.z + (1 - o) * i.z
    };
    return this._smoothingBuffers.set(s, a), a;
  }
  /**
   * Apply double exponential smoothing (Holt's method)
   * Predicts trend and reduces lag while maintaining smoothness
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyDoubleEmaSmoothing(e, t) {
    const s = `dema-${e}`;
    if (!this._smoothingBuffers.has(s))
      return this._smoothingBuffers.set(s, {
        level: { x: t.x, y: t.y, z: t.z },
        trend: { x: 0, y: 0, z: 0 }
      }), t;
    const i = this._smoothingBuffers.get(s), o = Math.max(0.1, Math.min(0.6, 2 / this.smoothingWindowSize)), a = o * 0.5, n = {
      x: o * t.x + (1 - o) * (i.level.x + i.trend.x),
      y: o * t.y + (1 - o) * (i.level.y + i.trend.y),
      z: o * t.z + (1 - o) * (i.level.z + i.trend.z)
    }, c = {
      x: a * (n.x - i.level.x) + (1 - a) * i.trend.x,
      y: a * (n.y - i.level.y) + (1 - a) * i.trend.y,
      z: a * (n.z - i.level.z) + (1 - a) * i.trend.z
    };
    return i.level = n, i.trend = c, {
      x: n.x + c.x,
      y: n.y + c.y,
      z: n.z + c.z
    };
  }
  /**
   * Apply weighted moving average (recent frames count more)
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyWeightedSmoothing(e, t) {
    const s = `wma-${e}`;
    this._smoothingBuffers.has(s) || this._smoothingBuffers.set(s, []);
    const i = this._smoothingBuffers.get(s);
    for (i.push({ x: t.x, y: t.y, z: t.z }); i.length > this.smoothingWindowSize; )
      i.shift();
    if (i.length === 1) return t;
    let o = 0, a = 0, n = 0, c = 0;
    for (let r = 0; r < i.length; r++) {
      const h = r + 1;
      o += i[r].x * h, a += i[r].y * h, n += i[r].z * h, c += h;
    }
    return {
      x: o / c,
      y: a / c,
      z: n / c
    };
  }
  /**
   * Apply Gaussian-weighted smoothing (bell curve weights)
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyGaussianSmoothing(e, t) {
    const s = `gauss-${e}`;
    this._smoothingBuffers.has(s) || this._smoothingBuffers.set(s, []);
    const i = this._smoothingBuffers.get(s);
    for (i.push({ x: t.x, y: t.y, z: t.z }); i.length > this.smoothingWindowSize; )
      i.shift();
    if (i.length === 1) return t;
    const o = i.length / 3;
    let a = 0, n = 0, c = 0, r = 0;
    for (let h = 0; h < i.length; h++) {
      const d = i.length - 1 - h, u = Math.exp(-(d * d) / (2 * o * o));
      a += i[h].x * u, n += i[h].y * u, c += i[h].z * u, r += u;
    }
    return {
      x: a / r,
      y: n / r,
      z: c / r
    };
  }
  /**
   * Adaptive smoothing based on derived velocity from position differences
   * This method adapts the smoothing level based on actual movement:
   * - Slow movement: more smoothing (reduces micro-jitter)
   * - Fast movement: less smoothing (maintains responsiveness)
   * - Direction changes: reduces buffer to avoid lag
   *
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @param {number} time - Current playback time
   * @returns {Object} Smoothed position
   */
  _applyAdaptiveSmoothing(e, t, s) {
    if (!this._adaptiveState.has(e))
      return this._adaptiveState.set(e, {
        buffer: [{ x: t.x, y: t.y, z: t.z }],
        lastPos: { x: t.x, y: t.y, z: t.z },
        lastTime: s,
        derivedVel: { x: 0, y: 0, z: 0 }
      }), t;
    const i = this._adaptiveState.get(e), o = s - i.lastTime;
    o > 1e-3 && (i.derivedVel = {
      x: (t.x - i.lastPos.x) / o,
      y: (t.y - i.lastPos.y) / o,
      z: (t.z - i.lastPos.z) / o
    });
    const a = Math.sqrt(
      i.derivedVel.x ** 2 + i.derivedVel.y ** 2 + i.derivedVel.z ** 2
    ), n = 2, c = this.smoothingWindowSize, r = 300, h = 1500;
    let d;
    if (a < r)
      d = c;
    else if (a > h)
      d = n;
    else {
      const y = (a - r) / (h - r);
      d = Math.round(c - y * (c - n));
    }
    if (i.buffer.length >= 2) {
      const y = i.buffer[i.buffer.length - 1], x = i.buffer[i.buffer.length - 2], w = {
        x: y.x - x.x,
        y: y.y - x.y,
        z: y.z - x.z
      }, b = {
        x: t.x - y.x,
        y: t.y - y.y,
        z: t.z - y.z
      }, v = Math.sqrt(w.x ** 2 + w.y ** 2 + w.z ** 2), T = Math.sqrt(b.x ** 2 + b.y ** 2 + b.z ** 2);
      if (v > 0.1 && T > 0.1 && (w.x * b.x + w.y * b.y + w.z * b.z) / (v * T) < 0.5)
        for (; i.buffer.length > Math.max(2, d / 2); )
          i.buffer.shift();
    }
    for (i.buffer.push({ x: t.x, y: t.y, z: t.z }); i.buffer.length > d; )
      i.buffer.shift();
    if (i.lastPos = { x: t.x, y: t.y, z: t.z }, i.lastTime = s, i.buffer.length === 1) return t;
    let u = 0, m = 0, f = 0, g = 0;
    for (let y = 0; y < i.buffer.length; y++) {
      const x = y + 1;
      u += i.buffer[y].x * x, m += i.buffer[y].y * x, f += i.buffer[y].z * x, g += x;
    }
    return {
      x: u / g,
      y: m / g,
      z: f / g
    };
  }
  /**
   * One Euro Filter - adaptive filter that's smooth at low speeds, responsive at high speeds
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyOneEuroFilter(e, t) {
    const s = `1euro-${e}`;
    if (!this._smoothingBuffers.has(s))
      return this._smoothingBuffers.set(s, {
        x: t.x,
        y: t.y,
        z: t.z,
        dx: 0,
        dy: 0,
        dz: 0,
        lastTime: performance.now()
      }), t;
    const i = this._smoothingBuffers.get(s), o = performance.now(), a = Math.max(1e-3, (o - i.lastTime) / 1e3);
    i.lastTime = o;
    const n = 0.5 + (20 - this.smoothingWindowSize) * 0.1, c = 0.01 * this.smoothingWindowSize, r = 1, h = (t.x - i.x) / a, d = (t.y - i.y) / a, u = (t.z - i.z) / a, m = this._oneEuroAlpha(a, r), f = m * h + (1 - m) * i.dx, g = m * d + (1 - m) * i.dy, y = m * u + (1 - m) * i.dz, x = Math.sqrt(
      f * f + g * g + y * y
    ), w = n + c * x, b = this._oneEuroAlpha(a, w), v = {
      x: b * t.x + (1 - b) * i.x,
      y: b * t.y + (1 - b) * i.y,
      z: b * t.z + (1 - b) * i.z
    };
    return i.x = v.x, i.y = v.y, i.z = v.z, i.dx = f, i.dy = g, i.dz = y, v;
  }
  /**
   * Helper for One Euro Filter - calculate smoothing factor
   */
  _oneEuroAlpha(e, t) {
    return 1 / (1 + 1 / (2 * Math.PI * t) / e);
  }
  /**
   * Catmull-Rom spline interpolation (uses 4 keyframes)
   */
  _catmullRomInterpolate(e, t, s, i, o) {
    const a = o * o, n = a * o, c = -0.5 * n + a - 0.5 * o, r = 1.5 * n - 2.5 * a + 1, h = -1.5 * n + 2 * a + 0.5 * o, d = 0.5 * n - 0.5 * a;
    return {
      x: c * e.x + r * t.x + h * s.x + d * i.x,
      y: c * e.y + r * t.y + h * s.y + d * i.y,
      z: c * e.z + r * t.z + h * s.z + d * i.z
    };
  }
  /**
   * Apply low-pass filter to smooth positions
   * This filters out high-frequency noise/jitter from the replay data
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Raw interpolated position {x, y, z}
   * @returns {Object} Filtered position {x, y, z}
   */
  _applyLowPassFilter(e, t) {
    if (!this._lowPassState.has(e))
      return this._lowPassState.set(e, { x: t.x, y: t.y, z: t.z }), t;
    const s = this._lowPassState.get(e), i = Math.max(0.05, Math.min(0.5, 1 / this.smoothingWindowSize)), o = {
      x: i * t.x + (1 - i) * s.x,
      y: i * t.y + (1 - i) * s.y,
      z: i * t.z + (1 - i) * s.z
    };
    return this._lowPassState.set(e, o), o;
  }
  /**
   * Calculate derived velocity from position differences
   * This ignores the replay's velocity data and computes velocity from positions
   * @param {Object} p0 - Previous position {x, y, z}
   * @param {Object} p1 - Current position {x, y, z}
   * @param {number} dt - Time delta between positions (seconds)
   * @returns {Object} Derived velocity {x, y, z}
   */
  _deriveVelocity(e, t, s) {
    return s <= 0 ? { x: 0, y: 0, z: 0 } : {
      x: (t.x - e.x) / s,
      y: (t.y - e.y) / s,
      z: (t.z - e.z) / s
    };
  }
  /**
   * Predict-Correct interpolation (dead reckoning)
   * Instead of interpolating between keyframes, we:
   * 1. Predict position using velocity: P_predicted = P0 + V0 * elapsed
   * 2. When approaching next keyframe, smoothly correct towards it
   *
   * This creates smoother motion because it follows physics instead of
   * interpolating between potentially inconsistent position snapshots.
   *
   * @param {string} entityId - Entity identifier
   * @param {Object} k0 - Start keyframe {position, velocity, time}
   * @param {Object} k1 - End keyframe {position, velocity, time}
   * @param {number} currentTime - Current playback time
   * @returns {Object} Predicted/corrected position {x, y, z}
   */
  _predictCorrectInterpolate(e, t, s, i) {
    const o = i - t.time, a = s.time - t.time, n = o / a;
    if (!t.velocity)
      return {
        x: t.position.x + (s.position.x - t.position.x) * n,
        y: t.position.y + (s.position.y - t.position.y) * n,
        z: t.position.z + (s.position.z - t.position.z) * n
      };
    const c = {
      x: t.position.x + t.velocity.x * o,
      y: t.position.y + t.velocity.y * o,
      z: t.position.z + t.velocity.z * o
    }, r = {
      x: t.position.x + t.velocity.x * a,
      y: t.position.y + t.velocity.y * a,
      z: t.position.z + t.velocity.z * a
    }, h = {
      x: s.position.x - r.x,
      y: s.position.y - r.y,
      z: s.position.z - r.z
    }, d = n * n * (3 - 2 * n);
    return {
      x: c.x + h.x * d,
      y: c.y + h.y * d,
      z: c.z + h.z * d
    };
  }
  /**
   * Velocity-based interpolation with clamped correction to avoid jitter
   * This method follows the velocity data but limits how fast corrections are applied
   * to prevent sudden acceleration/deceleration when keyframes are far apart.
   *
   * @param {string} entityId - Entity identifier for state tracking
   * @param {Object} k0 - Start keyframe {position, velocity, time}
   * @param {Object} k1 - End keyframe {position, velocity, time}
   * @param {number} currentTime - Current playback time
   * @param {boolean} isBall - Whether this is the ball (applies gravity)
   * @returns {Object} Interpolated position {x, y, z}
   */
  _velocitySmoothInterpolate(e, t, s, i, o = !1) {
    const a = i - t.time, n = s.time - t.time, c = a / n, r = 650, h = 93, d = 500;
    if (!t.velocity)
      return {
        x: t.position.x + (s.position.x - t.position.x) * c,
        y: t.position.y + (s.position.y - t.position.y) * c,
        z: t.position.z + (s.position.z - t.position.z) * c
      };
    let u = {
      x: t.position.x + t.velocity.x * a,
      y: t.position.y + t.velocity.y * a,
      z: t.position.z + t.velocity.z * a
    };
    o && t.position.z > h + 10 && (u.z = t.position.z + t.velocity.z * a - 0.5 * r * a * a, u.z < h && (u.z = h));
    const m = s.position;
    let f = {
      x: t.position.x + t.velocity.x * n,
      y: t.position.y + t.velocity.y * n,
      z: t.position.z + t.velocity.z * n
    };
    o && t.position.z > h + 10 && (f.z = t.position.z + t.velocity.z * n - 0.5 * r * n * n, f.z < h && (f.z = h));
    const g = {
      x: m.x - f.x,
      y: m.y - f.y,
      z: m.z - f.z
    }, y = c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2, x = Math.sqrt(
      g.x * g.x + g.y * g.y + g.z * g.z
    );
    let w = 1;
    if (x > 0 && n > 0) {
      const v = d * n;
      x > v * 2 && (w = v * 2 / x);
    }
    const b = y * w + (1 - w) * c;
    return {
      x: u.x + g.x * b,
      y: u.y + g.y * b,
      z: u.z + g.z * b
    };
  }
  /**
   * Physics-tick-aware interpolation
   *
   * The problem: Rocket League replays have positions captured at alternating
   * 5 or 6 physics ticks (120Hz), but timestamps suggest ~46ms intervals.
   * This causes ±10% speed oscillation when interpolating between positions.
   *
   * The solution: Use VELOCITY for movement (which is consistent), not positions.
   * Move at the reported velocity, then smoothly correct to hit the next keyframe.
   *
   * @param {Object} k0 - Start keyframe {position, velocity, time}
   * @param {Object} k1 - End keyframe {position, velocity, time}
   * @param {number} currentTime - Current playback time
   * @returns {Object} Interpolated position {x, y, z}
   */
  _physicsTickInterpolate(e, t, s) {
    const i = t.time - e.time, o = s - e.time, a = o / i;
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * a,
        y: e.position.y + (t.position.y - e.position.y) * a,
        z: e.position.z + (t.position.z - e.position.z) * a
      };
    const n = (e.velocity.x + t.velocity.x) / 2, c = (e.velocity.y + t.velocity.y) / 2, r = (e.velocity.z + t.velocity.z) / 2, h = e.position.x + n * o, d = e.position.y + c * o, u = e.position.z + r * o, m = e.position.x + n * i, f = e.position.y + c * i, g = e.position.z + r * i, y = t.position.x - m, x = t.position.y - f, w = t.position.z - g;
    return {
      x: h + y * a,
      y: d + x * a,
      z: u + w * a
    };
  }
  /**
   * Velocity-only interpolation (experimental)
   *
   * Uses ONLY velocity data, completely ignoring position keyframes.
   * This produces the smoothest possible motion but will drift from
   * the actual recorded positions over time.
   *
   * Best for visual quality when exact position accuracy is not critical.
   */
  _velocityOnlyInterpolate(e, t, s) {
    const i = s - e.time, o = t.time - e.time, a = i / o;
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * a,
        y: e.position.y + (t.position.y - e.position.y) * a,
        z: e.position.z + (t.position.z - e.position.z) * a
      };
    const n = e.velocity.x + (t.velocity.x - e.velocity.x) * a / 2, c = e.velocity.y + (t.velocity.y - e.velocity.y) * a / 2, r = e.velocity.z + (t.velocity.z - e.velocity.z) * a / 2;
    return {
      x: e.position.x + n * i,
      y: e.position.y + c * i,
      z: e.position.z + r * i
    };
  }
  /**
   * Smart hybrid interpolation
   *
   * Automatically detects collisions/impacts and switches interpolation method:
   * - COLLISION: Velocity direction or magnitude changes significantly
   *   → Use position lerp (velocity is unreliable mid-interval)
   * - NORMAL: Velocity is consistent
   *   → Use velocity-based interpolation (smoother, more accurate)
   *
   * This addresses the core issue: replay data contains collision frames where
   * the velocity changes during the interval, making velocity-based interpolation
   * produce incorrect results.
   */
  _smartHybridInterpolate(e, t, s) {
    const i = s - e.time, o = t.time - e.time, a = Math.max(0, Math.min(1, i / o));
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * a,
        y: e.position.y + (t.position.y - e.position.y) * a,
        z: e.position.z + (t.position.z - e.position.z) * a
      };
    const n = Math.sqrt(e.velocity.x ** 2 + e.velocity.y ** 2 + e.velocity.z ** 2), c = Math.sqrt(t.velocity.x ** 2 + t.velocity.y ** 2 + t.velocity.z ** 2);
    let r = 1;
    n > 10 && c > 10 && (r = (e.velocity.x * t.velocity.x + e.velocity.y * t.velocity.y + e.velocity.z * t.velocity.z) / (n * c));
    const h = n > 10 ? Math.abs(c - n) / n : 0;
    if (r < 0.95 || h > 0.1) {
      const u = a * a * (3 - 2 * a);
      return {
        x: e.position.x + (t.position.x - e.position.x) * u,
        y: e.position.y + (t.position.y - e.position.y) * u,
        z: e.position.z + (t.position.z - e.position.z) * u
      };
    } else {
      const u = (e.velocity.x + t.velocity.x) / 2, m = (e.velocity.y + t.velocity.y) / 2, f = (e.velocity.z + t.velocity.z) / 2, g = e.position.x + u * i, y = e.position.y + m * i, x = e.position.z + f * i, w = e.position.x + u * o, b = e.position.y + m * o, v = e.position.z + f * o, T = t.position.x - w, C = t.position.y - b, S = t.position.z - v;
      return {
        x: g + T * a,
        y: y + C * a,
        z: x + S * a
      };
    }
  }
  /**
   * Check if a keyframe transition has a "bad" ratio (time-shifted position)
   * Bad frames have distance ratio ~0.25, 0.50 (position recorded at wrong time)
   *
   * @param {Object} k0 - Start keyframe
   * @param {Object} k1 - End keyframe
   * @returns {boolean} True if this is a bad frame that should be skipped
   */
  _isBadFrame(e, t) {
    if (!e.velocity || !t.velocity || !e.position || !t.position) return !1;
    const s = t.time - e.time;
    if (s < 1e-3) return !1;
    const i = (e.velocity.x + t.velocity.x) / 2, o = (e.velocity.y + t.velocity.y) / 2, a = (e.velocity.z + t.velocity.z) / 2, n = Math.sqrt(i ** 2 + o ** 2 + a ** 2);
    if (n < 200) return !1;
    const c = t.position.x - e.position.x, r = t.position.y - e.position.y, h = t.position.z - e.position.z, d = Math.sqrt(c * c + r * r + h * h), u = n * s, m = d / u;
    return m < 0.6 || m > 1.4;
  }
  /**
   * Filter out bad frames from a timeline
   * Bad frames have position recorded at wrong time (ratio ~0.25 or ~0.50)
   *
   * @param {Array} timeline - Array of keyframes
   * @returns {Array} Filtered timeline without bad frames
   */
  _filterBadFrames(e) {
    if (!e || e.length < 2) return e;
    const t = [e[0]];
    for (let s = 1; s < e.length; s++) {
      const i = t[t.length - 1], o = e[s];
      this._isBadFrame(i, o) || t.push(o);
    }
    return t;
  }
  /**
   * Correct time-shifted positions in a timeline
   *
   * Based on Rocket League's 120Hz physics / 30Hz recording:
   * - When ratio ≈ 0.25: position was recorded after 1/4 of the interval
   * - When ratio ≈ 0.50: position was recorded after 1/2 of the interval
   * - When ratio ≈ 0.75: position was recorded after 3/4 of the interval
   *
   * This function extrapolates each time-shifted position to where it
   * SHOULD have been at the actual frame time, using velocity.
   *
   * @param {Array} timeline - Array of keyframes
   * @returns {Array} Timeline with corrected positions
   */
  _correctTimeShiftedPositions(e) {
    if (!e || e.length < 2) {
      const i = e ? [...e] : [];
      return i._correctedCount = 0, i;
    }
    const t = [];
    let s = 0;
    for (let i = 0; i < e.length; i++) {
      const o = e[i], a = {
        ...o,
        position: o.position ? { ...o.position } : null,
        velocity: o.velocity ? { ...o.velocity } : null,
        rotation: o.rotation ? { ...o.rotation } : null
      };
      if (i > 0 && o.position && o.velocity) {
        const n = e[i - 1];
        if (n.position && n.velocity) {
          const c = o.time - n.time;
          if (c > 1e-3) {
            const r = (n.velocity.x + o.velocity.x) / 2, h = (n.velocity.y + o.velocity.y) / 2, d = (n.velocity.z + o.velocity.z) / 2, u = Math.sqrt(r ** 2 + h ** 2 + d ** 2);
            if (u > 100) {
              const m = o.position.x - n.position.x, f = o.position.y - n.position.y, g = o.position.z - n.position.z, y = Math.sqrt(m * m + f * f + g * g), x = u * c, w = y / x;
              let b = 0;
              w > 0.15 && w < 0.35 ? b = c * 0.75 : w > 0.4 && w < 0.6 ? b = c * 0.5 : w > 0.65 && w < 0.85 && (b = c * 0.25), b > 0 && (a.position.x += o.velocity.x * b, a.position.y += o.velocity.y * b, a.position.z += o.velocity.z * b, s++);
            }
          }
        }
      }
      t.push(a);
    }
    return t._correctedCount = s, t;
  }
  /**
   * Time-Shifted Interpolation
   * Now uses pre-filtered timeline, so this is just lerp
   */
  _timeShiftedInterpolate(e, t, s) {
    const i = s - e.time, o = t.time - e.time, a = Math.max(0, Math.min(1, i / o));
    return {
      x: e.position.x + (t.position.x - e.position.x) * a,
      y: e.position.y + (t.position.y - e.position.y) * a,
      z: e.position.z + (t.position.z - e.position.z) * a
    };
  }
  /**
   * Velocity-Anchored Interpolation
   *
   * Uses ONLY velocity for smooth motion, but periodically "anchors" to
   * a known-good position to prevent drift. This gives smooth constant-speed
   * motion while staying accurate over time.
   *
   * The key insight: positions in replay data are unreliable (62% have wrong ratio),
   * but velocities are consistent. We trust velocity for motion, position for anchoring.
   *
   * @param {string} entityId - Unique ID for state tracking
   * @param {Object} k0 - Start keyframe
   * @param {Object} k1 - End keyframe
   * @param {number} currentTime - Current time
   * @param {Array} timeline - Full timeline for anchor lookup
   * @param {number} currentIdx - Current index in timeline
   */
  _velocityAnchoredInterpolate(e, t, s, i, o, a) {
    if (!t.velocity || !s.velocity) {
      const x = (i - t.time) / (s.time - t.time);
      return {
        x: t.position.x + (s.position.x - t.position.x) * x,
        y: t.position.y + (s.position.y - t.position.y) * x,
        z: t.position.z + (s.position.z - t.position.z) * x
      };
    }
    this._velocityAnchorState || (this._velocityAnchorState = /* @__PURE__ */ new Map());
    let n = this._velocityAnchorState.get(e);
    (!n || Math.abs(i - n.lastTime) > 0.5 || // Seek detected
    a % 10 === 0) && (n = {
      anchorPos: { ...t.position },
      anchorTime: t.time,
      anchorIdx: a,
      lastTime: i
    }, this._velocityAnchorState.set(e, n)), i - n.anchorTime;
    let h = n.anchorPos.x, d = n.anchorPos.y, u = n.anchorPos.z;
    const m = (t.velocity.x + s.velocity.x) / 2, f = (t.velocity.y + s.velocity.y) / 2, g = (t.velocity.z + s.velocity.z) / 2, y = i - t.time;
    return n.anchorIdx === a ? (h = n.anchorPos.x + m * y, d = n.anchorPos.y + f * y, u = n.anchorPos.z + g * y) : (h = t.position.x + m * y, d = t.position.y + f * y, u = t.position.z + g * y), n.lastTime = i, { x: h, y: d, z: u };
  }
  /**
   * Hermite Spline interpolation
   *
   * Uses cubic Hermite splines which are C1-continuous (smooth in both
   * position and velocity). This creates a curve that:
   * - Passes exactly through keyframe positions
   * - Has tangents matching the reported velocities
   * - Creates natural, smooth motion without visible jitter
   *
   * The Hermite basis functions:
   * h00(t) = 2t³ - 3t² + 1     (start position weight)
   * h10(t) = t³ - 2t² + t      (start tangent weight)
   * h01(t) = -2t³ + 3t²        (end position weight)
   * h11(t) = t³ - t²           (end tangent weight)
   *
   * Position = h00*p0 + h10*m0 + h01*p1 + h11*m1
   * where m0, m1 are the tangents (velocity * dt)
   *
   * @param {Object} k0 - Start keyframe {position, velocity, time}
   * @param {Object} k1 - End keyframe {position, velocity, time}
   * @param {number} currentTime - Current playback time
   * @returns {Object} Interpolated position {x, y, z}
   */
  _hermiteInterpolate(e, t, s) {
    const i = t.time - e.time, o = s - e.time, a = Math.max(0, Math.min(1, o / i)), n = {
      x: e.position.x + (t.position.x - e.position.x) * a,
      y: e.position.y + (t.position.y - e.position.y) * a,
      z: e.position.z + (t.position.z - e.position.z) * a
    };
    if (!e.velocity || !t.velocity)
      return n;
    const c = a * a, r = c * a, h = 2 * r - 3 * c + 1, d = r - 2 * c + a, u = -2 * r + 3 * c, m = r - c, f = {
      x: e.velocity.x * i,
      y: e.velocity.y * i,
      z: e.velocity.z * i
    }, g = {
      x: t.velocity.x * i,
      y: t.velocity.y * i,
      z: t.velocity.z * i
    }, y = {
      x: h * e.position.x + d * f.x + u * t.position.x + m * g.x,
      y: h * e.position.y + d * f.y + u * t.position.y + m * g.y,
      z: h * e.position.z + d * f.z + u * t.position.z + m * g.z
    }, x = y.x - n.x, w = y.y - n.y, b = y.z - n.z, v = t.position.x - e.position.x, T = t.position.y - e.position.y, C = t.position.z - e.position.z;
    return x * x + w * w + b * b > v * v + T * T + C * C ? n : y;
  }
  /**
   * Physics Simulation Interpolation (RocketSim-based)
   *
   * Based on Rocket League's actual physics from RocketSim:
   * - Physics runs at 120Hz (120 ticks per second)
   * - Replays record at 30Hz (4 physics ticks per frame)
   * - Gravity: -650 UU/s² (Z axis in RL coordinates = Y in Three.js)
   * - Ball max speed: 6000 UU/s
   * - Car max speed: 2300 UU/s
   *
   * The key insight: velocities are accurate, positions may be time-shifted.
   * We use Hermite interpolation which respects both position AND velocity
   * constraints, creating a physically plausible trajectory.
   *
   * @param {Object} k0 - Start keyframe {position, velocity, time}
   * @param {Object} k1 - End keyframe {position, velocity, time}
   * @param {number} currentTime - Current playback time
   * @param {boolean} isBall - Whether this is the ball (applies gravity)
   * @returns {Object} Interpolated position {x, y, z}
   */
  _physicsSimInterpolate(e, t, s, i = !1) {
    const o = t.time - e.time, a = s - e.time, n = Math.max(0, Math.min(1, a / o));
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * n,
        y: e.position.y + (t.position.y - e.position.y) * n,
        z: e.position.z + (t.position.z - e.position.z) * n
      };
    const c = -650, r = n * n, h = r * n, d = 2 * h - 3 * r + 1, u = h - 2 * r + n, m = -2 * h + 3 * r, f = h - r;
    let g = e.velocity.y * o, y = t.velocity.y * o;
    if (i) {
      const x = 0.5 * c * o * o;
      g += x * 0.5, y += x * 0.5;
    }
    return {
      x: d * e.position.x + u * (e.velocity.x * o) + m * t.position.x + f * (t.velocity.x * o),
      y: d * e.position.y + u * g + m * t.position.y + f * y,
      z: d * e.position.z + u * (e.velocity.z * o) + m * t.position.z + f * (t.velocity.z * o)
    };
  }
  /**
   * Get interpolated position for ball at given time
   * Supports multiple interpolation methods:
   * - 'lerp': Linear interpolation (default)
   * - 'lerp-smooth': Linear + moving average smoothing
   * - 'catmull-rom': Catmull-Rom spline (uses 4 keyframes)
   *
   * @param {number} time - Current time
   * @returns {Object|null} Interpolated position or null
   */
  getBallPositionAt(e) {
    if (!this.ballTimeline || this.ballTimeline.length < 2) return null;
    const t = this.ballTimeline[0];
    if (e < t.time && t.position)
      return this.lastFrameInfo = {
        currentFrame: 0,
        totalFrames: this.ballTimeline.length
      }, { ...t.position };
    const s = this._findKeyframeIndex(this.ballTimeline, e, this.timelineIndices.ball);
    this.timelineIndices.ball = s;
    const i = this.ballTimeline[s], o = this.ballTimeline[s + 1];
    if (this.lastFrameInfo = {
      currentFrame: s,
      totalFrames: this.ballTimeline.length
    }, !i || !i.position) return null;
    if (!this.interpolationEnabled)
      return { ...i.position };
    if (!o || !o.position) return i.position;
    const a = o.time - i.time;
    if (a <= 0) return i.position;
    const n = o.position.x - i.position.x, c = o.position.y - i.position.y, r = o.position.z - i.position.z;
    if (Math.sqrt(n * n + c * c + r * r) > 2e3)
      return i.sleeping ? null : { ...i.position };
    if (i.sleeping)
      return { ...i.position };
    const d = (e - i.time) / a;
    let u;
    switch (this.interpolationMethod) {
      case "catmull-rom": {
        const m = this.ballTimeline[Math.max(0, s - 1)], f = this.ballTimeline[Math.min(this.ballTimeline.length - 1, s + 2)];
        m?.position && f?.position ? u = this._catmullRomInterpolate(m.position, i.position, o.position, f.position, d) : u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        };
        break;
      }
      case "lerp-smooth": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applySmoothing("ball", u);
        break;
      }
      case "lerp-ema": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyEmaSmoothing("ball", u);
        break;
      }
      case "lerp-dema": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyDoubleEmaSmoothing("ball", u);
        break;
      }
      case "lerp-wma": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyWeightedSmoothing("ball", u);
        break;
      }
      case "lerp-gauss": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyGaussianSmoothing("ball", u);
        break;
      }
      case "one-euro": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyOneEuroFilter("ball", u);
        break;
      }
      case "predict-correct": {
        u = this._predictCorrectInterpolate("ball", i, o, e);
        break;
      }
      case "velocity-smooth": {
        u = this._velocitySmoothInterpolate("ball", i, o, e, !0);
        break;
      }
      case "physics-tick": {
        u = this._physicsTickInterpolate(i, o, e);
        break;
      }
      case "hermite": {
        u = this._hermiteInterpolate(i, o, e);
        break;
      }
      case "physics-sim": {
        const m = this.ballTimelineCorrected;
        if (m && m.length >= 2) {
          const f = this._findKeyframeIndex(
            m,
            e,
            this.timelineIndicesCorrected.ball
          );
          this.timelineIndicesCorrected.ball = f;
          const g = m[f], y = m[f + 1];
          if (g?.position && y?.position) {
            u = this._physicsSimInterpolate(g, y, e, !0);
            break;
          }
        }
        u = this._physicsSimInterpolate(i, o, e, !0);
        break;
      }
      case "velocity-only": {
        u = this._velocityOnlyInterpolate(i, o, e);
        break;
      }
      case "smart-hybrid": {
        u = this._smartHybridInterpolate(i, o, e);
        break;
      }
      case "time-shifted": {
        const m = this.ballTimelineFiltered;
        if (!m || m.length < 2) {
          u = {
            x: i.position.x + (o.position.x - i.position.x) * d,
            y: i.position.y + (o.position.y - i.position.y) * d,
            z: i.position.z + (o.position.z - i.position.z) * d
          };
          break;
        }
        const f = this._findKeyframeIndex(
          m,
          e,
          this.timelineIndicesFiltered.ball
        );
        this.timelineIndicesFiltered.ball = f;
        const g = m[f], y = m[f + 1];
        if (!g?.position || !y?.position) {
          u = g?.position ? { ...g.position } : { ...i.position };
          break;
        }
        const x = y.time - g.time, w = x > 0 ? Math.max(0, Math.min(1, (e - g.time) / x)) : 0;
        u = {
          x: g.position.x + (y.position.x - g.position.x) * w,
          y: g.position.y + (y.position.y - g.position.y) * w,
          z: g.position.z + (y.position.z - g.position.z) * w
        };
        break;
      }
      case "position-lerp": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        };
        break;
      }
      case "position-catmull": {
        const m = this.ballTimeline[Math.max(0, s - 1)], f = this.ballTimeline[Math.min(this.ballTimeline.length - 1, s + 2)];
        m?.position && f?.position ? u = this._catmullRomInterpolate(m.position, i.position, o.position, f.position, d) : u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        };
        break;
      }
      case "position-smooth": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyLowPassFilter("ball", u);
        break;
      }
      case "adaptive-smooth": {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        }, u = this._applyAdaptiveSmoothing("ball", u, e);
        break;
      }
      default: {
        u = {
          x: i.position.x + (o.position.x - i.position.x) * d,
          y: i.position.y + (o.position.y - i.position.y) * d,
          z: i.position.z + (o.position.z - i.position.z) * d
        };
        break;
      }
    }
    return u;
  }
  /**
   * Get interpolated rotation for ball at given time
   * Uses angular velocity for physics-based rotation when available
   * @param {number} time - Current time
   * @returns {Object|null} Interpolated rotation quaternion or null
   */
  getBallRotationAt(e) {
    if (!this.ballTimeline || this.ballTimeline.length < 2) return null;
    const t = this.ballTimeline[0];
    if (e < t.time && t.rotation)
      return { ...t.rotation };
    const s = this.timelineIndices.ball, i = this.ballTimeline[s], o = this.ballTimeline[s + 1];
    if (!i || !i.rotation) return null;
    if (!this.interpolationEnabled)
      return { ...i.rotation };
    if (!o || !o.rotation) return i.rotation;
    const a = o.time - i.time;
    if (a <= 0) return i.rotation;
    if (i.position && o.position) {
      const c = o.position.x - i.position.x, r = o.position.y - i.position.y, h = o.position.z - i.position.z;
      if (Math.sqrt(c * c + r * r + h * h) > 2e3)
        return { ...i.rotation };
    }
    if (i.sleeping)
      return { ...i.rotation };
    const n = (e - i.time) / a;
    return this._q0.set(i.rotation.x, i.rotation.y, i.rotation.z, i.rotation.w), this._q1.set(o.rotation.x, o.rotation.y, o.rotation.z, o.rotation.w), this._qResult.slerpQuaternions(this._q0, this._q1, n), { x: this._qResult.x, y: this._qResult.y, z: this._qResult.z, w: this._qResult.w };
  }
  /**
   * Get interpolated position for player at given time
   * Supports multiple interpolation methods (same as ball)
   *
   * @param {string} playerName - Player name
   * @param {number} time - Current time
   * @returns {Object|null} Interpolated position or null
   */
  getPlayerPositionAt(e, t) {
    const s = this.playerTimelineMap[e];
    if (!s || s.length < 2) return null;
    const i = s[0];
    if (t < i.time && i.position)
      return { ...i.position };
    const o = this._findKeyframeIndex(
      s,
      t,
      this.timelineIndices.players[e] || 0
    );
    this.timelineIndices.players[e] = o;
    const a = s[o], n = s[o + 1];
    if (!a || !a.position) return null;
    if (!this.interpolationEnabled)
      return { ...a.position };
    if (!n || !n.position) return a.position;
    const c = n.time - a.time;
    if (c <= 0) return a.position;
    const r = (t - a.time) / c;
    let h;
    switch (this.interpolationMethod) {
      case "catmull-rom": {
        const d = s[Math.max(0, o - 1)], u = s[Math.min(s.length - 1, o + 2)];
        d?.position && u?.position ? h = this._catmullRomInterpolate(d.position, a.position, n.position, u.position, r) : h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        };
        break;
      }
      case "lerp-smooth": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applySmoothing(`player-${e}`, h);
        break;
      }
      case "lerp-ema": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyEmaSmoothing(`player-${e}`, h);
        break;
      }
      case "lerp-dema": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyDoubleEmaSmoothing(`player-${e}`, h);
        break;
      }
      case "lerp-wma": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyWeightedSmoothing(`player-${e}`, h);
        break;
      }
      case "lerp-gauss": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyGaussianSmoothing(`player-${e}`, h);
        break;
      }
      case "one-euro": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyOneEuroFilter(`player-${e}`, h);
        break;
      }
      case "predict-correct": {
        h = this._predictCorrectInterpolate(`player-${e}`, a, n, t);
        break;
      }
      case "velocity-smooth": {
        h = this._velocitySmoothInterpolate(`player-${e}`, a, n, t, !1);
        break;
      }
      case "physics-tick": {
        h = this._physicsTickInterpolate(a, n, t);
        break;
      }
      case "hermite": {
        h = this._hermiteInterpolate(a, n, t);
        break;
      }
      case "physics-sim": {
        const d = this.playerTimelineMapCorrected[e];
        if (d && d.length >= 2) {
          const u = this._findKeyframeIndex(
            d,
            t,
            this.timelineIndicesCorrected.players[e] || 0
          );
          this.timelineIndicesCorrected.players[e] = u;
          const m = d[u], f = d[u + 1];
          if (m?.position && f?.position) {
            h = this._physicsSimInterpolate(m, f, t, !1);
            break;
          }
        }
        h = this._physicsSimInterpolate(a, n, t, !1);
        break;
      }
      case "velocity-only": {
        h = this._velocityOnlyInterpolate(a, n, t);
        break;
      }
      case "smart-hybrid": {
        h = this._smartHybridInterpolate(a, n, t);
        break;
      }
      case "time-shifted": {
        const d = this.playerTimelineMapFiltered[e];
        if (!d || d.length < 2) {
          h = {
            x: a.position.x + (n.position.x - a.position.x) * r,
            y: a.position.y + (n.position.y - a.position.y) * r,
            z: a.position.z + (n.position.z - a.position.z) * r
          };
          break;
        }
        const u = this._findKeyframeIndex(
          d,
          t,
          this.timelineIndicesFiltered.players[e] || 0
        );
        this.timelineIndicesFiltered.players[e] = u;
        const m = d[u], f = d[u + 1];
        if (!m?.position || !f?.position) {
          h = m?.position ? { ...m.position } : { ...a.position };
          break;
        }
        const g = f.time - m.time, y = g > 0 ? Math.max(0, Math.min(1, (t - m.time) / g)) : 0;
        h = {
          x: m.position.x + (f.position.x - m.position.x) * y,
          y: m.position.y + (f.position.y - m.position.y) * y,
          z: m.position.z + (f.position.z - m.position.z) * y
        };
        break;
      }
      case "position-lerp": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        };
        break;
      }
      case "position-catmull": {
        const d = s[Math.max(0, o - 1)], u = s[Math.min(s.length - 1, o + 2)];
        d?.position && u?.position ? h = this._catmullRomInterpolate(d.position, a.position, n.position, u.position, r) : h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        };
        break;
      }
      case "position-smooth": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyLowPassFilter(`player-${e}`, h);
        break;
      }
      case "adaptive-smooth": {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        }, h = this._applyAdaptiveSmoothing(`player-${e}`, h, t);
        break;
      }
      default: {
        h = {
          x: a.position.x + (n.position.x - a.position.x) * r,
          y: a.position.y + (n.position.y - a.position.y) * r,
          z: a.position.z + (n.position.z - a.position.z) * r
        };
        break;
      }
    }
    return h;
  }
  /**
   * Get interpolated rotation for player at given time (slerp)
   * @param {string} playerName - Player name
   * @param {number} time - Current time
   * @returns {Object|null} Interpolated rotation quaternion or null
   */
  getPlayerRotationAt(e, t) {
    const s = this.playerTimelineMap[e];
    if (!s || s.length < 2) return null;
    const i = s[0];
    if (t < i.time && i.rotation)
      return { ...i.rotation };
    const o = this.timelineIndices.players[e] || 0, a = s[o], n = s[o + 1];
    if (!a || !a.rotation) return null;
    if (!this.interpolationEnabled)
      return { ...a.rotation };
    if (!n || !n.rotation) return a.rotation;
    const c = n.time - a.time;
    if (c <= 0) return a.rotation;
    const r = (t - a.time) / c;
    return this._q0.set(a.rotation.x, a.rotation.y, a.rotation.z, a.rotation.w), this._q1.set(n.rotation.x, n.rotation.y, n.rotation.z, n.rotation.w), this._qResult.slerpQuaternions(this._q0, this._q1, r), { x: this._qResult.x, y: this._qResult.y, z: this._qResult.z, w: this._qResult.w };
  }
  /**
   * Create the ball mesh
   */
  _createBallMesh() {
    const e = "ball", t = new l.SphereGeometry(92.75, 16, 16), s = new l.MeshStandardMaterial({ color: 16777215 }), i = new l.Mesh(t, s);
    i.castShadow = !0, i.receiveShadow = !0, i.userData = {
      location: new l.Vector3(),
      rotation: new l.Quaternion(),
      velocity: new l.Vector3(),
      angularVelocity: new l.Vector3(),
      isCar: !1,
      isBall: !0,
      playerId: null,
      sleeping: !1,
      isHiddenByGoal: !1
    }, this.scene.add(i), this.actors[e] = i, this.ballActorId = e, this.ballModel && !this._ballModelReplaced && (this.replaceBallWithModel(e), this._ballModelReplaced = !0);
    const o = 92.75, a = new l.RingGeometry(o * 0.95, o, 32), n = new l.MeshBasicMaterial({ color: 16777215, side: l.DoubleSide });
    this.ballIndicator = new l.Mesh(a, n), this.ballIndicator.rotation.x = -Math.PI / 2, this.ballIndicator.visible = !1, this.scene.add(this.ballIndicator);
    const c = new l.BufferGeometry().setFromPoints([
      new l.Vector3(0, 0, 0),
      new l.Vector3(0, 1, 0)
    ]), r = new l.LineBasicMaterial({
      color: 16777215,
      opacity: 0.5,
      transparent: !0
    });
    this.ballVerticalLine = new l.Line(c, r), this.ballVerticalLine.frustumCulled = !1, this.ballVerticalLine.visible = !1, this.scene.add(this.ballVerticalLine);
  }
  /**
   * Create a car mesh for a player
   * @param {string} playerName - Player name
   * @param {number} team - Team (0 = blue, 1 = orange)
   * @param {number} index - Player index (used as actor ID)
   * @param {Object} loadout - Player's TeamLoadout (optional)
   */
  _createCarMesh(e, t, s, i, o) {
    const a = `car_${s}`, n = new l.BoxGeometry(118, 36, 84), c = t === 0 ? 3381759 : 16737792, r = new l.MeshStandardMaterial({ color: c }), h = new l.Mesh(n, r);
    h.castShadow = !0, h.receiveShadow = !0;
    const d = i || "Octane", u = o || "Octane";
    h.userData = {
      location: new l.Vector3(),
      rotation: new l.Quaternion(),
      velocity: new l.Vector3(),
      angularVelocity: new l.Vector3(),
      isCar: !0,
      isBall: !1,
      playerId: e,
      team: t,
      sleeping: !1,
      steer: 0,
      carName: d,
      hitboxType: u
    }, this.scene.add(h), this.actors[a] = h, this.playerNameToCarActorId[e] = a, this.playerNames.add(e), this.effectsManager.createBoostTrail(h, a), this.onPlayerFound && this.onPlayerFound(e), this.replaceCarWithModel(a, h, d, u), console.log(
      `[ActorManager] Created car for ${e} (team ${t === 0 ? "blue" : "orange"}, ${d} / ${u} hitbox)`
    );
  }
  /**
   * Update all actors from framework state
   * When useAnimationSystem=true, the AnimationMixer handles position/rotation
   * This method still updates userData and visual effects
   * @param {Player} player - Framework Player instance
   * @param {number} currentTime - Current playback time (for interpolation)
   */
  updateFromFramework(e, t) {
    const s = this.actors[this.ballActorId];
    if (s && e.ball) {
      const i = e.ball;
      let o = !0;
      if (!this.useAnimationSystem || !this.animationMixer)
        if (this.interpolantsInitialized && this.ballTimeline && this.ballTimeline.length >= 2) {
          const a = this.getBallPositionAt(t), n = this.getBallRotationAt(t);
          a ? s.position.set(a.x, a.y, a.z) : o = !1, n && s.quaternion.set(n.x, n.y, n.z, n.w);
        } else
          s.position.set(i.position.x, i.position.y, i.position.z), s.quaternion.set(
            i.rotation.x,
            i.rotation.y,
            i.rotation.z,
            i.rotation.w
          );
      if (s.userData.location.copy(s.position), s.userData.rotation.copy(s.quaternion), s.userData.velocity.set(i.velocity.x, i.velocity.y, i.velocity.z), i.angularVelocity && s.userData.angularVelocity.set(
        i.angularVelocity.x,
        i.angularVelocity.y,
        i.angularVelocity.z
      ), s.userData.sleeping = i.sleeping, s.visible = o && i.visible !== !1 && !s.userData.isHiddenByGoal, this.ballIndicator && (this.ballIndicator.position.set(s.position.x, 2, s.position.z), this.ballIndicator.visible = s.visible), this.ballVerticalLine) {
        const n = new Float32Array([
          s.position.x,
          2,
          s.position.z,
          s.position.x,
          s.position.y,
          s.position.z
        ]);
        this.ballVerticalLine.geometry.setAttribute(
          "position",
          new l.BufferAttribute(n, 3)
        ), this.ballVerticalLine.geometry.attributes.position.needsUpdate = !0, this.ballVerticalLine.visible = s.visible;
      }
      if (s.userData.velocity && s.visible) {
        let a = this.lastBallTouchTeam, n = this.BALL_TOUCH_DISTANCE;
        Object.keys(this.actors).forEach((c) => {
          const r = this.actors[c];
          if (r && r.userData.isCar && r.userData.playerId) {
            const h = s.position.distanceTo(r.position);
            h < n && (n = h, a = r.userData.team || 0);
          }
        }), n < this.BALL_TOUCH_DISTANCE && (this.lastBallTouchTeam = a), this.effectsManager.updateBallTrail(
          s.position,
          s.userData.velocity,
          this.lastBallTouchTeam
        );
      }
    }
    e.getAllPlayers().forEach((i) => {
      const o = this.playerNameToCarActorId[i.name];
      if (!o) return;
      const a = this.actors[o];
      if (!a) return;
      const n = i.name;
      if (!this.useAnimationSystem || !this.animationMixer)
        if (this.interpolantsInitialized && this.playerTimelineMap[n]) {
          const r = this.getPlayerPositionAt(n, t), h = this.getPlayerRotationAt(n, t);
          r && a.position.set(r.x, r.y, r.z), h && a.quaternion.set(h.x, h.y, h.z, h.w);
        } else
          a.position.set(
            i.position.x,
            i.position.y,
            i.position.z
          ), a.quaternion.set(
            i.rotation.x,
            i.rotation.y,
            i.rotation.z,
            i.rotation.w
          );
      a.userData.location.copy(a.position), a.userData.rotation.copy(a.quaternion), a.userData.velocity.set(
        i.velocity.x,
        i.velocity.y,
        i.velocity.z
      ), a.userData.sleeping = i.sleeping, a.userData.steer = i.steer || 0;
      const c = a.position.length() > 0.1;
      a.visible = i.isVisible && c && !a.userData.sleeping;
    });
  }
  /**
   * Process a network frame for mesh lifecycle management
   * @deprecated Use initFromFramework() and updateFromFramework() instead
   * @param {Object} frame - Network frame
   * @param {Function} getObjectName - Function to get object name by ID (objectId => name)
   * @param {number} frameIndex - Frame index
   * @param {boolean} isSeeking - Whether we're seeking (skip some effects)
   */
  processFrame(e, t, s, i) {
    if (e) {
      if (e.new_actors && e.new_actors.forEach((o) => {
        if (!this.actors[o.actor_id]) {
          const a = t(o.object_id), n = a && a.includes("Ball"), c = a && a.includes("Car");
          if (n || c) {
            let r;
            n ? r = new l.SphereGeometry(92.75, 16, 16) : r = new l.BoxGeometry(118, 36, 84);
            const h = new l.MeshStandardMaterial({
              color: n ? 16777215 : Math.random() * 16777215
            }), d = new l.Mesh(r, h);
            if (d.userData = {
              location: new l.Vector3(),
              rotation: new l.Quaternion(),
              isCar: c,
              isBall: n,
              playerId: null,
              lastUpdateTime: e.time,
              bodyId: null,
              // Will be set from TeamLoadout
              hasReceivedUpdate: !1
              // Track if actor has received at least one RigidBody update
            }, this.scene.add(d), this.actors[o.actor_id] = d, n) {
              this.ballActorId = o.actor_id, this.ballModel && this.replaceBallWithModel(o.actor_id);
              const u = 92.75, m = new l.RingGeometry(u * 0.95, u, 32), f = new l.MeshBasicMaterial({
                color: 16777215,
                side: l.DoubleSide
              });
              this.ballIndicator = new l.Mesh(m, f), this.ballIndicator.rotation.x = -Math.PI / 2, this.ballIndicator.visible = !1, this.scene.add(this.ballIndicator);
              const g = new l.BufferGeometry().setFromPoints([
                new l.Vector3(0, 0, 0),
                new l.Vector3(0, 1, 0)
              ]), y = new l.LineBasicMaterial({
                color: 16777215,
                opacity: 0.5,
                transparent: !0
              });
              this.ballVerticalLine = new l.Line(g, y), this.ballVerticalLine.frustumCulled = !1, this.ballVerticalLine.visible = !1, this.scene.add(this.ballVerticalLine);
            } else c && this.effectsManager.createBoostTrail(d, o.actor_id);
          }
        }
      }), e.deleted_actors && e.deleted_actors.forEach((o) => {
        if (this.actors[o]) {
          const a = this.actors[o];
          a.userData.isCar && this.effectsManager.removeBoostTrail(o), this.scene.remove(a), a.geometry && a.geometry.dispose(), a.material && a.material.dispose(), delete this.actors[o], this.ballActorId === o && (this.ballActorId = null, this.ballIndicator && (this.scene.remove(this.ballIndicator), this.ballIndicator.geometry && this.ballIndicator.geometry.dispose(), this.ballIndicator.material && this.ballIndicator.material.dispose(), this.ballIndicator = null), this.ballVerticalLine && (this.scene.remove(this.ballVerticalLine), this.ballVerticalLine.geometry && this.ballVerticalLine.geometry.dispose(), this.ballVerticalLine.material && this.ballVerticalLine.material.dispose(), this.ballVerticalLine = null));
        }
      }), e.updated_actors && e.updated_actors.forEach((o) => {
        const a = this.actors[o.actor_id];
        o.attribute.TeamLoadout && (this.actorLoadouts[o.actor_id] = o.attribute.TeamLoadout, a && a.userData.isCar && (a.userData.teamLoadout = o.attribute.TeamLoadout, this.resolveBodyId(a, o.actor_id)));
        const n = t(o.object_id), c = n && (n.includes("PRI_TA") || n.includes("PlayerReplicationInfo"));
        if (o.attribute.String && this.playerNames.has(o.attribute.String)) {
          const r = o.attribute.String;
          this.actorToPlayer[o.actor_id] = r, c && !this.playerNameToPriActorId[r] && (this.playerNameToPriActorId[r] = o.actor_id, console.log(
            `[ActorManager] Mapped ${r} -> PRI Actor ${o.actor_id} (object: ${n})`
          )), this.checkCarPlayerLink(o.actor_id);
        }
        if (o.attribute.Reservation && this.playerNames.has(o.attribute.Reservation.name)) {
          const r = o.attribute.Reservation.name;
          this.actorToPlayer[o.actor_id] = r, c && !this.playerNameToPriActorId[r] && (this.playerNameToPriActorId[r] = o.actor_id, console.log(
            `[ActorManager] Mapped ${r} -> PRI Actor ${o.actor_id} (object: ${n})`
          )), this.checkCarPlayerLink(o.actor_id);
        }
        if (o.attribute.ActiveActor) {
          const r = o.attribute.ActiveActor.actor;
          this.actorLinks[o.actor_id] || (this.actorLinks[o.actor_id] = /* @__PURE__ */ new Set()), this.actorLinks[o.actor_id].add(r), a && a.userData.isCar && this.checkCarPlayerLink(r, o.actor_id);
        }
        if (a && o.attribute && o.attribute.RigidBody) {
          const r = o.attribute.RigidBody;
          if (r.location && (a.userData.location.set(r.location.x, r.location.z, r.location.y), a.userData.lastUpdateTime = e.time, a.userData.hasReceivedUpdate = !0), r.linear_velocity && (a.userData.velocity || (a.userData.velocity = new l.Vector3()), a.userData.velocity.set(
            r.linear_velocity.x,
            r.linear_velocity.z,
            r.linear_velocity.y
          )), r.rotation && a.userData.rotation.set(r.rotation.x, r.rotation.z, r.rotation.y, -r.rotation.w), r.angular_velocity && (a.userData.angularVelocity || (a.userData.angularVelocity = new l.Vector3()), a.userData.angularVelocity.set(
            r.angular_velocity.x,
            r.angular_velocity.z,
            r.angular_velocity.y
          )), r.sleeping !== void 0 && (a.userData.sleeping = r.sleeping, r.sleeping && (a.userData.velocity && a.userData.velocity.set(0, 0, 0), a.userData.angularVelocity && a.userData.angularVelocity.set(0, 0, 0))), a.userData.isBall && a.userData.isHiddenByGoal && r.location) {
            const h = r.location.x, d = r.location.y, u = r.location.z;
            Math.sqrt(h * h + d * d + u * u) < 500 && (a.userData.isHiddenByGoal = !1);
          }
        }
      }), this.effectsManager.explosions.goalEvents.has(s)) {
        const o = this.effectsManager.explosions.goalEvents.get(s), a = this.actors[this.ballActorId];
        a && (i || (this.effectsManager.triggerGoalExplosion(a.position, o.team), console.log(
          `🎯 GOAL! Explosion at frame ${s} for team ${o.team} by ${o.playerName}`
        )), a.userData.isHiddenByGoal = !0);
      }
      if (this.effectsManager.explosions.demoEvents.has(s)) {
        const o = this.effectsManager.explosions.demoEvents.get(s), a = this.actors[o.victimActorId];
        if (a) {
          if (!i) {
            const n = a.userData.playerId, c = n && this.playerTeams && this.playerTeams[n] || 0;
            this.effectsManager.triggerDemoExplosion(a.position, c), console.log(
              `💥 DEMO! Explosion at frame ${s} for actor ${o.victimActorId}`
            );
          }
          a.userData.sleeping = !0;
        }
      }
    }
  }
  resolveBodyId(e, t) {
    if (!e || !e.userData.isCar || !e.userData.teamLoadout) return;
    let s = 0;
    e.userData.playerId && Object.prototype.hasOwnProperty.call(this.playerTeams, e.userData.playerId) && (s = this.playerTeams[e.userData.playerId]);
    const i = e.userData.teamLoadout, o = s === 1 ? i.orange?.body : i.blue?.body;
    o && e.userData.bodyId !== o && (e.userData.bodyId = o, this.updateCarHitbox(e, o, t));
  }
  updateCarHitbox(e, t, s) {
    const i = Z(t), o = i?.name || "Octane", a = i?.hitboxType || "Octane";
    this.replaceCarWithModel(s, e, o, a);
  }
  /**
   * Replace a car's BoxGeometry with a loaded FBX model
   */
  async replaceCarWithModel(e, t, s, i) {
    if (this.carModelLoader.isModelReady(s, i))
      this._doCarReplacement(e, t, s, i);
    else {
      this.pendingCarReplacements.set(e, { oldMesh: t, carName: s, hitboxType: i });
      try {
        const o = this.carModelLoader.getModelTypeForCar(s, i);
        await this.carModelLoader.loadModel(o);
        const a = this.pendingCarReplacements.get(e);
        a && this.actors[e] === a.oldMesh && this._doCarReplacement(e, a.oldMesh, a.carName, a.hitboxType), this.pendingCarReplacements.delete(e);
      } catch (o) {
        console.warn(`Failed to load model for ${s} (${i}):`, o), this.pendingCarReplacements.delete(e), t && (t.visible = !0);
      }
    }
  }
  _doCarReplacement(e, t, s, i) {
    let o = 0;
    t.userData.playerId && Object.prototype.hasOwnProperty.call(this.playerTeams, t.userData.playerId) ? o = this.playerTeams[t.userData.playerId] : t.userData.team !== void 0 && (o = t.userData.team);
    const a = this.carModelLoader.getCarMeshSync(s, i, o);
    if (!a) {
      console.warn(`Could not get car mesh for ${s} (${i})`);
      return;
    }
    const n = a.userData.wheels;
    a.userData = { ...t.userData }, a.userData.isFBXModel = !0, a.userData.carName = s, a.userData.hitboxType = i, a.userData.wheels = n, a.position.copy(t.position), a.quaternion.copy(t.quaternion), this.scene.remove(t), t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((r) => r.dispose()) : t.material.dispose()), this.scene.add(a), this.actors[e] = a, this.effectsManager.removeBoostTrail(e), this.effectsManager.createBoostTrail(a, e);
    const c = this.carModelLoader.getModelTypeForCar(s, i);
    console.log(
      `🚗 Replaced car ${e} with ${c.toUpperCase()} model (${s}, ${i} hitbox, team ${o === 0 ? "blue" : "orange"})`
    );
  }
  checkCarPlayerLink(e, t) {
    const s = this.actorToPlayer[e], i = this.actorLoadouts[e];
    if (!(!s && !i))
      if (t) {
        const o = this.actors[t];
        o && o.userData.isCar && (this.onPlayerFound && this.onPlayerFound(s), o.userData.playerId = s, this.playerNameToCarActorId[s] = t, i && (o.userData.teamLoadout = i), this.resolveBodyId(o, t));
      } else
        this.actorLinks[e] && this.actorLinks[e].forEach((o) => {
          this.checkCarPlayerLink(e, o);
        });
  }
  updateInterpolation(e, t, s) {
    const i = t[s];
    if (i && Object.keys(this.actors).forEach((o) => {
      const a = this.actors[o], n = a.userData.location, c = a.userData.rotation;
      if (!n || !c || !a.userData.hasReceivedUpdate) return;
      let r = null, h = 0;
      for (let d = s + 1; d < Math.min(t.length, s + 60); d++) {
        const u = t[d];
        if (u.updated_actors) {
          const m = u.updated_actors.find(
            (f) => f.actor_id == o && f.attribute && f.attribute.RigidBody
          );
          if (m) {
            r = m, h = u.time;
            break;
          }
        }
      }
      if (r) {
        const d = a.userData.lastUpdateTime || i.time, u = h;
        if (u > d) {
          const m = (e - d) / (u - d), f = Math.max(0, Math.min(1, m)), g = u - d || 0.033, y = r.attribute.RigidBody;
          if (y.location)
            if (this._p0.copy(n), this._p1.set(y.location.x, y.location.z, y.location.y), a.userData.sleeping)
              a.position.copy(n);
            else {
              const x = r.attribute.RigidBody;
              if (a.userData.velocity && x.linear_velocity) {
                const w = f, b = w * w, v = b * w;
                if (g > 0.5)
                  a.position.lerpVectors(n, this._p1, f);
                else {
                  this._v0.copy(a.userData.velocity).multiplyScalar(g), this._v1.set(
                    x.linear_velocity.x,
                    x.linear_velocity.z,
                    x.linear_velocity.y
                  ).multiplyScalar(g);
                  const T = 2 * v - 3 * b + 1, C = v - 2 * b + w, S = -2 * v + 3 * b, P = v - b;
                  a.position.set(
                    T * this._p0.x + C * this._v0.x + S * this._p1.x + P * this._v1.x,
                    T * this._p0.y + C * this._v0.y + S * this._p1.y + P * this._v1.y,
                    T * this._p0.z + C * this._v0.z + S * this._p1.z + P * this._v1.z
                  );
                }
              } else
                a.position.lerpVectors(n, this._p1, f);
            }
          else
            a.position.copy(n);
          y.rotation ? (this._nextRot.set(y.rotation.x, y.rotation.z, y.rotation.y, -y.rotation.w), a.quaternion.slerpQuaternions(c, this._nextRot, f)) : a.quaternion.copy(c);
          return;
        }
      }
      a.position.copy(n), a.quaternion.copy(c);
    }), Object.keys(this.actors).forEach((o) => {
      const a = this.actors[o];
      if (a && a.userData.isCar) {
        const c = a.position.length() > 0.1, r = a.userData.sleeping === !0;
        a.visible = c && !r;
      }
    }), this.ballActorId && this.actors[this.ballActorId]) {
      const o = this.actors[this.ballActorId];
      if (o.visible = !o.userData.isHiddenByGoal, this.ballIndicator && (this.ballIndicator.position.set(o.position.x, 2, o.position.z), this.ballIndicator.visible = o.visible), this.ballVerticalLine) {
        const n = new Float32Array([
          o.position.x,
          2,
          o.position.z,
          o.position.x,
          o.position.y,
          o.position.z
        ]);
        this.ballVerticalLine.geometry.setAttribute(
          "position",
          new l.BufferAttribute(n, 3)
        ), this.ballVerticalLine.geometry.attributes.position.needsUpdate = !0, this.ballVerticalLine.visible = o.visible;
      }
      if (o.userData.velocity && o.visible) {
        let a = this.lastBallTouchTeam, n = this.BALL_TOUCH_DISTANCE;
        Object.keys(this.actors).forEach((c) => {
          const r = this.actors[c];
          if (r && r.userData.isCar && r.userData.playerId) {
            const h = o.position.distanceTo(r.position);
            if (h < n) {
              n = h;
              const d = r.userData.playerId;
              Object.prototype.hasOwnProperty.call(this.playerTeams, d) && (a = this.playerTeams[d]);
            }
          }
        }), n < this.BALL_TOUCH_DISTANCE && (this.lastBallTouchTeam = a), this.effectsManager.updateBallTrail(
          o.position,
          o.userData.velocity,
          this.lastBallTouchTeam
        );
      }
    }
  }
  /**
   * Update boost state for a player
   * @param {string} playerName - Player name
   * @param {boolean} isBoosting - Whether player is actively boosting
   * @param {boolean} isKickoffReset - Whether boost was reset during kickoff (skip particles)
   */
  updateBoostState(e, t, s = !1) {
    const i = this.playerNameToCarActorId[e];
    if (!i) {
      t && !this._warnedNoCarId && (console.warn(`⚠️ updateBoostState: No carId for ${e}`), this._warnedNoCarId = !0);
      return;
    }
    const o = this.actors[i];
    if (!o || !o.userData.isCar) {
      t && console.warn(`⚠️ updateBoostState: No mesh for car ${i}, player ${e}`);
      return;
    }
    const a = o.userData.velocity || new l.Vector3(0, 0, 0), n = t && !s;
    this.effectsManager.updateBoostTrail(
      i,
      n,
      o.position,
      o.quaternion,
      a
    );
  }
  /**
   * Update player steering value from framework
   * @param {string} playerName - Player name
   * @param {number} steer - Normalized steering value (-1 to 1)
   */
  updatePlayerSteer(e, t) {
    const s = this.playerNameToCarActorId[e];
    if (!s) return;
    const i = this.actors[s];
    !i || !i.userData.isCar || (i.userData.steer = t);
  }
  /**
   * Update wheel rotations for all cars based on actual distance traveled
   * This method uses position delta instead of velocity * time to ensure
   * wheel rotation matches visual movement at any playback speed
   * - Wheel_XX_Y: rotates around local Y for rolling (spin)
   * - Wheel_XX_Z: rotates around local Z for steering (front wheels only)
   */
  updateWheelRotations() {
    this._wheelDebugCounter || (this._wheelDebugCounter = 0), this._wheelDebugCounter++;
    const e = 17, t = Math.PI / 6;
    this._previousCarPositions || (this._previousCarPositions = /* @__PURE__ */ new Map()), Object.keys(this.actors).forEach((s) => {
      const i = this.actors[s];
      if (!i || !i.userData.isCar || !i.userData.isFBXModel && !i.userData.hasWheelSockets || !i.userData.wheels || i.userData.wheels.length === 0) return;
      const o = i.position;
      let a = this._previousCarPositions.get(s);
      a || (a = o.clone(), this._previousCarPositions.set(s, a));
      const c = new l.Vector3().subVectors(o, a).length();
      if (this._previousCarPositions.set(s, o.clone()), c < 0.01) return;
      const d = Math.min(c / e, 0.5) * 1;
      let u = 0;
      i.userData.steer !== void 0 && (u = -i.userData.steer * t), i.userData.wheels.forEach((m) => {
        if (m.socket) {
          const f = m.side === "left" ? 1 : -1;
          if (m.mesh.rotateZ(f * d), m.position === "front" && m.steeringPivot) {
            const g = m.side === "left" ? -1 : 1;
            m.steeringPivot.rotation.y = g * u;
          }
        } else {
          const f = m.side === "left" ? -1 : 1;
          m.mesh.rotateY(f * d), m.position === "front" && m.steeringPivot && (m.steeringPivot.rotation.z = u);
        }
      });
    });
  }
  /**
   * Reset wheel rotation tracking (call when seeking)
   */
  resetWheelTracking() {
    this._previousCarPositions && this._previousCarPositions.clear();
  }
  updateSupersonicState(e, t, s) {
    const i = this.playerNameToCarActorId[e];
    if (!i)
      return;
    const o = this.actors[i];
    if (!o || !o.userData.isCar)
      return;
    const a = o.userData.velocity || new l.Vector3(0, 0, 0);
    this.effectsManager.updateSupersonicTrail(
      i,
      t,
      o.position,
      o.quaternion,
      a,
      s
    );
  }
  /**
   * Enable or disable interpolation (for debugging)
   * When disabled, shows raw frame data without interpolation
   */
  setInterpolationEnabled(e) {
    this.interpolationEnabled = e, console.log(`[ActorManager] Interpolation ${e ? "enabled" : "disabled"}`);
  }
  /**
   * Set interpolation method
   * @param {string} method - Interpolation method name
   */
  setInterpolationMethod(e) {
    if (![
      "lerp",
      "hermite",
      "catmull-rom",
      "predict-correct",
      "velocity-smooth",
      "physics-tick",
      "velocity-only",
      "smart-hybrid",
      "time-shifted",
      "lerp-smooth",
      "lerp-ema",
      "lerp-dema",
      "lerp-wma",
      "lerp-gauss",
      "one-euro",
      "position-lerp",
      "position-catmull",
      "position-smooth",
      "adaptive-smooth"
    ].includes(e)) {
      console.warn(`[ActorManager] Invalid interpolation method: ${e}`);
      return;
    }
    this.interpolationMethod = e, this._smoothingBuffers.clear(), this._lowPassState.clear(), this._adaptiveState.clear(), this.resetSmoothingBuffers(), console.log(`[ActorManager] Interpolation method set to: ${e}`);
  }
  /**
   * Set smoothing window size (for lerp-smooth method)
   * @param {number} size - Window size (1-20)
   */
  setSmoothingWindowSize(e) {
    this.smoothingWindowSize = Math.max(1, Math.min(20, e)), this._smoothingBuffers.clear(), console.log(`[ActorManager] Smoothing window size set to: ${this.smoothingWindowSize}`);
  }
  /**
   * Get current interpolation settings
   */
  getInterpolationSettings() {
    return {
      enabled: this.interpolationEnabled,
      method: this.interpolationMethod,
      smoothingWindowSize: this.smoothingWindowSize
    };
  }
  /**
   * Clear all smoothing buffers (call when seeking or changing settings)
   */
  clearSmoothingBuffers() {
    this._smoothingBuffers.clear();
  }
  /**
   * Get current frame info for debug panel
   */
  getFrameInfo() {
    return this.lastFrameInfo;
  }
  // ============================================
  // LIVE MODE METHODS (027-live-viewer)
  // ============================================
  /**
   * Create ball mesh for live mode
   * Returns the ball mesh directly instead of storing it
   * @returns {THREE.Mesh} The ball mesh
   */
  createBallMeshForLive() {
    const e = new l.SphereGeometry(92.75, 16, 16), t = new l.MeshStandardMaterial({ color: 16777215 }), s = new l.Mesh(e, t);
    if (s.castShadow = !0, s.receiveShadow = !0, s.userData = {
      location: new l.Vector3(),
      rotation: new l.Quaternion(),
      velocity: new l.Vector3(),
      angularVelocity: new l.Vector3(),
      isCar: !1,
      isBall: !0,
      playerId: null,
      sleeping: !1,
      isHiddenByGoal: !1
    }, this.scene.add(s), this.ballModel) {
      const i = this.ballModel.clone();
      i.position.copy(s.position), i.quaternion.copy(s.quaternion), i.userData = { ...s.userData };
      const o = 92.75;
      return i.scale.set(o, o, o), i.traverse((a) => {
        a.isMesh && (a.castShadow = !0, a.receiveShadow = !0);
      }), this.scene.remove(s), this.scene.add(i), s.geometry && s.geometry.dispose(), s.material && s.material.dispose(), console.log("✓ Live ball created with GLTF model"), i;
    }
    return s;
  }
  /**
   * Create car mesh for live mode
   * Returns the car mesh directly
   * @param {number} team - Team (0 = blue, 1 = orange)
   * @param {number} playerIndex - Player index for unique identification
   * @param {string} playerName - Player name
   * @param {number|null} bodyId - Car body ID (e.g., 23=Octane, 403=Fennec)
   * @returns {THREE.Mesh} The car mesh
   */
  createCarMeshForLive(e, t, s, i = null) {
    const o = `live_car_${t}`, a = new l.BoxGeometry(118, 36, 84), n = e === 0 ? 3381759 : 16737792, c = new l.MeshStandardMaterial({ color: n }), r = new l.Mesh(a, c);
    return r.castShadow = !0, r.receiveShadow = !0, r.visible = !1, r.userData = {
      location: new l.Vector3(),
      rotation: new l.Quaternion(),
      velocity: new l.Vector3(),
      angularVelocity: new l.Vector3(),
      isCar: !0,
      isBall: !1,
      playerId: s,
      team: e,
      sleeping: !1,
      steer: 0,
      bodyId: i,
      liveActorId: o
    }, this.scene.add(r), this.actors[o] = r, this.playerNameToCarActorId[s] = o, this.effectsManager.createBoostTrail(r, o), i && i > 0 ? this.updateCarHitbox(r, i, o) : this.replaceCarWithModel(o, r, "Octane", "Octane"), console.log(
      `[ActorManager] Created live car for ${s} (team ${e === 0 ? "blue" : "orange"}, bodyId: ${i})`
    ), r;
  }
  /**
   * Update boost particles for live mode car
   * IMPORTANT: Checks BOTH isBoosting AND boost > 0
   * (isBoosting is input, need amount > 0 to emit particles)
   * @param {string} actorId - Car actor ID
   * @param {boolean} isBoosting - Input state
   * @param {number} boostAmount - Current boost amount (0-100)
   * @param {THREE.Mesh} mesh - Car mesh
   */
  updateBoostParticlesLive(e, t, s, i) {
    const o = t && s > 0, a = i.userData.velocity || new l.Vector3(0, 0, 0);
    this.effectsManager.updateBoostTrail(
      e,
      o,
      i.position,
      i.quaternion,
      a
    );
  }
  /**
   * Update supersonic trail for live mode car
   * @param {string} actorId - Car actor ID
   * @param {boolean} isSupersonic - Whether car is supersonic (speed > 2200)
   * @param {number} team - Team number (0 or 1)
   * @param {THREE.Mesh} mesh - Car mesh
   */
  updateSupersonicTrailLive(e, t, s, i) {
    const o = i.userData.velocity || new l.Vector3(0, 0, 0);
    this.effectsManager.updateSupersonicTrail(
      e,
      t,
      i.position,
      i.quaternion,
      o,
      s
    );
  }
  /**
   * Remove a live mode car
   * @param {string} actorId - Car actor ID
   */
  removeLiveCar(e) {
    const t = this.actors[e];
    t && (this.scene.remove(t), t.geometry && t.geometry.dispose(), t.material && t.material.dispose(), delete this.actors[e], this.effectsManager.removeBoostTrail(e));
  }
  /**
   * Remove live mode ball
   * @param {THREE.Mesh} ballMesh - Ball mesh to remove
   */
  removeLiveBall(e) {
    e && (this.scene.remove(e), e.geometry && e.geometry.dispose(), e.material && e.material.dispose());
  }
}
function z(p, e, t) {
  t === -1 ? (p.clearUpdateRanges?.(), p.addUpdateRange?.(0, p.count * p.itemSize)) : p.addUpdateRange ? (p.clearUpdateRanges(), p.addUpdateRange(e, t)) : (p.updateRange.offset = e, p.updateRange.count = t);
}
class M extends l.Object3D {
  constructor(e, t) {
    super(), this.active = !1, this.orientToMovement = !1, t && (this.orientToMovement = !0), this.scene = e, this.geometry = null, this.mesh = null, this.nodeCenters = null, this.lastNodeCenter = null, this.currentNodeCenter = null, this.lastOrientationDir = null, this.nodeIDs = null, this.currentLength = 0, this.currentEnd = 0, this.currentNodeID = 0, this.advanceFrequency = 60, this.advancePeriod = 1 / this.advanceFrequency, this.lastAdvanceTime = 0, this.paused = !1, this.pauseAdvanceUpdateTimeDiff = 0, this._internalTime = 0, this._useInternalTime = !1;
  }
  setAdvanceFrequency(e) {
    this.advanceFrequency = e, this.advancePeriod = 1 / this.advanceFrequency;
  }
  initialize(e, t, s, i, o, a) {
    this.deactivate(), this.destroyMesh(), this.length = t > 0 ? t + 1 : 0, this.dragTexture = s ? 1 : 0, this.targetObject = a, this.initializeLocalHeadGeometry(i, o), this.nodeIDs = [], this.nodeCenters = [];
    for (let n = 0; n < this.length; n++)
      this.nodeIDs[n] = -1, this.nodeCenters[n] = new l.Vector3();
    this.material = e, this.initializeGeometry(), this.initializeMesh(), this.material.uniforms.trailLength.value = 0, this.material.uniforms.minID.value = 0, this.material.uniforms.maxID.value = 0, this.material.uniforms.dragTexture.value = this.dragTexture, this.material.uniforms.maxTrailLength.value = this.length, this.material.uniforms.verticesPerNode.value = this.VerticesPerNode, this.material.uniforms.textureTileFactor.value = new l.Vector2(1, 1), this.reset();
  }
  initializeLocalHeadGeometry(e, t) {
    if (this.localHeadGeometry = [], t) {
      this.VerticesPerNode = 0;
      for (let s = 0; s < t.length && s < M.MaxHeadVertices; s++) {
        const i = t[s];
        if (i && i instanceof l.Vector3) {
          const o = new l.Vector3();
          o.copy(i), this.localHeadGeometry.push(o), this.VerticesPerNode++;
        }
      }
    } else {
      const s = (e || 1) / 2;
      this.localHeadGeometry.push(new l.Vector3(-s, 0, 0)), this.localHeadGeometry.push(new l.Vector3(s, 0, 0)), this.VerticesPerNode = 2;
    }
    this.FacesPerNode = (this.VerticesPerNode - 1) * 2, this.FaceIndicesPerNode = this.FacesPerNode * 3;
  }
  initializeGeometry() {
    this.vertexCount = this.length * this.VerticesPerNode, this.faceCount = this.length * this.FacesPerNode;
    const e = new l.BufferGeometry(), t = new Float32Array(this.vertexCount), s = new Float32Array(this.vertexCount * this.VerticesPerNode), i = new Float32Array(this.vertexCount * M.PositionComponentCount), o = new Float32Array(this.vertexCount * M.PositionComponentCount), a = new Float32Array(this.vertexCount * M.UVComponentCount), n = new Uint32Array(this.faceCount * M.IndicesPerFace), c = new l.BufferAttribute(t, 1);
    c.dynamic = !0, e.setAttribute("nodeID", c);
    const r = new l.BufferAttribute(s, 1);
    r.dynamic = !0, e.setAttribute("nodeVertexID", r);
    const h = new l.BufferAttribute(
      o,
      M.PositionComponentCount
    );
    h.dynamic = !0, e.setAttribute("nodeCenter", h);
    const d = new l.BufferAttribute(
      i,
      M.PositionComponentCount
    );
    d.dynamic = !0, e.setAttribute("position", d);
    const u = new l.BufferAttribute(a, M.UVComponentCount);
    u.dynamic = !0, e.setAttribute("uv", u);
    const m = new l.BufferAttribute(n, 1);
    m.dynamic = !0, e.setIndex(m), this.geometry = e;
  }
  zeroVertices() {
    const e = this.geometry.getAttribute("position");
    for (let t = 0; t < this.vertexCount; t++) {
      const s = t * 3;
      e.array[s] = 0, e.array[s + 1] = 0, e.array[s + 2] = 0;
    }
    e.needsUpdate = !0, z(e, 0, -1);
  }
  zeroIndices() {
    const e = this.geometry.getIndex();
    for (let t = 0; t < this.faceCount; t++) {
      const s = t * 3;
      e.array[s] = 0, e.array[s + 1] = 0, e.array[s + 2] = 0;
    }
    e.needsUpdate = !0, z(e, 0, -1);
  }
  formInitialFaces() {
    this.zeroIndices();
    const e = this.geometry.getIndex();
    for (let t = 0; t < this.length - 1; t++)
      this.connectNodes(t, t + 1);
    e.needsUpdate = !0, z(e, 0, -1);
  }
  initializeMesh() {
    this.mesh = new l.Mesh(this.geometry, this.material), this.mesh.dynamic = !0, this.mesh.matrixAutoUpdate = !1;
  }
  destroyMesh() {
    this.mesh && (this.scene.remove(this.mesh), this.mesh = null);
  }
  reset() {
    this.currentLength = 0, this.currentEnd = -1, this.lastNodeCenter = null, this.currentNodeCenter = null, this.lastOrientationDir = null, this.currentNodeID = 0, this.formInitialFaces(), this.zeroVertices(), this.geometry.setDrawRange(0, 0);
  }
  updateUniforms() {
    this.currentLength < this.length ? this.material.uniforms.minID.value = 0 : this.material.uniforms.minID.value = this.currentNodeID - this.length, this.material.uniforms.maxID.value = this.currentNodeID, this.material.uniforms.trailLength.value = this.currentLength, this.material.uniforms.maxTrailLength.value = this.length, this.material.uniforms.verticesPerNode.value = this.VerticesPerNode;
  }
  advance = (function() {
    const e = new l.Matrix4();
    return function() {
      this.targetObject.updateMatrixWorld(), e.copy(this.targetObject.matrixWorld), this.advanceWithTransform(e), this.updateUniforms();
    };
  })();
  advanceWithPositionAndOrientation(e, t) {
    this.advanceGeometry({ position: e, tangent: t }, null);
  }
  advanceWithTransform(e) {
    this.advanceGeometry(null, e);
  }
  advanceGeometry = /* @__PURE__ */ (function() {
    return function(t, s) {
      const i = this.currentEnd + 1 >= this.length ? 0 : this.currentEnd + 1;
      if (s ? this.updateNodePositionsFromTransformMatrix(i, s) : this.updateNodePositionsFromOrientationTangent(
        i,
        t.position,
        t.tangent
      ), this.currentLength >= 1 && (this.connectNodes(this.currentEnd, i), this.currentLength >= this.length)) {
        const o = this.currentEnd + 1 >= this.length ? 0 : this.currentEnd + 1;
        this.disconnectNodes(o);
      }
      this.currentLength < this.length && this.currentLength++, this.currentEnd++, this.currentEnd >= this.length && (this.currentEnd = 0), this.currentLength >= 1 && (this.currentLength < this.length ? this.geometry.setDrawRange(0, (this.currentLength - 1) * this.FaceIndicesPerNode) : this.geometry.setDrawRange(0, this.currentLength * this.FaceIndicesPerNode)), this.updateNodeID(this.currentEnd, this.currentNodeID), this.currentNodeID++;
    };
  })();
  currentTime() {
    return this._useInternalTime ? this._internalTime : performance.now() / 1e3;
  }
  pause() {
    this.paused || (this.paused = !0, this.pauseAdvanceUpdateTimeDiff = this.currentTime() - this.lastAdvanceTime);
  }
  resume() {
    this.paused && (this.paused = !1, this.lastAdvanceTime = this.currentTime() - this.pauseAdvanceUpdateTimeDiff);
  }
  /**
   * Update trail with optional delta for playback synchronization
   * @param {number} delta - Optional time delta in seconds. If provided, uses internal time accumulation
   *                         instead of performance.now() for playback speed synchronization.
   */
  update(e) {
    if (!this.paused) {
      e !== void 0 && (this._useInternalTime = !0, this._internalTime += e);
      const t = this.currentTime();
      this.lastAdvanceTime || (this.lastAdvanceTime = t), t - this.lastAdvanceTime > this.advancePeriod ? (this.advance(), this.lastAdvanceTime = t) : this.updateHead();
    }
  }
  updateHead = (function() {
    const e = new l.Matrix4();
    return function() {
      this.currentEnd < 0 || (this.targetObject.updateMatrixWorld(), e.copy(this.targetObject.matrixWorld), this.updateNodePositionsFromTransformMatrix(this.currentEnd, e));
    };
  })();
  updateNodeID(e, t) {
    this.nodeIDs[e] = t;
    const s = this.geometry.getAttribute("nodeID"), i = this.geometry.getAttribute("nodeVertexID");
    for (let o = 0; o < this.VerticesPerNode; o++) {
      const a = e * this.VerticesPerNode + o;
      s.array[a] = t, i.array[a] = o;
    }
    s.needsUpdate = !0, i.needsUpdate = !0, z(s, e * this.VerticesPerNode, this.VerticesPerNode), z(i, e * this.VerticesPerNode, this.VerticesPerNode);
  }
  updateNodeCenter(e, t) {
    this.lastNodeCenter = this.currentNodeCenter, this.currentNodeCenter = this.nodeCenters[e], this.currentNodeCenter.copy(t);
    const s = this.geometry.getAttribute("nodeCenter");
    for (let i = 0; i < this.VerticesPerNode; i++) {
      const o = (e * this.VerticesPerNode + i) * 3;
      s.array[o] = t.x, s.array[o + 1] = t.y, s.array[o + 2] = t.z;
    }
    s.needsUpdate = !0, z(
      s,
      e * this.VerticesPerNode * M.PositionComponentCount,
      this.VerticesPerNode * M.PositionComponentCount
    );
  }
  updateNodePositionsFromOrientationTangent = (function() {
    const e = new l.Quaternion(), t = new l.Vector3(), s = [];
    for (let i = 0; i < M.MaxHeadVertices; i++) {
      const o = new l.Vector3();
      s.push(o);
    }
    return function(o, a, n) {
      const c = this.geometry.getAttribute("position");
      this.updateNodeCenter(o, a), t.copy(a), t.sub(M.LocalHeadOrigin), e.setFromUnitVectors(M.LocalOrientationTangent, n);
      for (let r = 0; r < this.localHeadGeometry.length; r++) {
        const h = s[r];
        h.copy(this.localHeadGeometry[r]), h.applyQuaternion(e), h.add(t);
      }
      for (let r = 0; r < this.localHeadGeometry.length; r++) {
        const h = (this.VerticesPerNode * o + r) * M.PositionComponentCount, d = s[r];
        c.array[h] = d.x, c.array[h + 1] = d.y, c.array[h + 2] = d.z;
      }
      c.needsUpdate = !0;
    };
  })();
  updateNodePositionsFromTransformMatrix = (function() {
    const e = new l.Matrix3(), t = new l.Quaternion(), s = new l.Vector3(), i = new l.Vector3(), o = new l.Vector3(), a = new l.Vector3(), n = [];
    for (let r = 0; r < M.MaxHeadVertices; r++) {
      const h = new l.Vector3();
      n.push(h);
    }
    function c(r, h) {
      const d = h.elements;
      r.set(d[0], d[1], d[2], d[4], d[5], d[6], d[8], d[9], d[10]);
    }
    return function(h, d) {
      const u = this.geometry.getAttribute("position");
      s.set(0, 0, 0), s.applyMatrix4(d), this.updateNodeCenter(h, s);
      for (let m = 0; m < this.localHeadGeometry.length; m++)
        n[m].copy(this.localHeadGeometry[m]);
      for (let m = 0; m < this.localHeadGeometry.length; m++)
        n[m].applyMatrix4(d);
      if (this.lastNodeCenter && this.orientToMovement && (c(e, d), o.set(0, 0, -1), o.applyMatrix3(e), a.copy(this.currentNodeCenter), a.sub(this.lastNodeCenter), a.normalize(), a.lengthSq() <= 1e-4 && this.lastOrientationDir && a.copy(this.lastOrientationDir), a.lengthSq() > 1e-4)) {
        this.lastOrientationDir || (this.lastOrientationDir = new l.Vector3()), t.setFromUnitVectors(o, a), i.copy(this.currentNodeCenter);
        for (let m = 0; m < this.localHeadGeometry.length; m++) {
          const f = n[m];
          f.sub(i), f.applyQuaternion(t), f.add(i);
        }
      }
      for (let m = 0; m < this.localHeadGeometry.length; m++) {
        const f = (this.VerticesPerNode * h + m) * M.PositionComponentCount, g = n[m];
        u.array[f] = g.x, u.array[f + 1] = g.y, u.array[f + 2] = g.z;
      }
      u.needsUpdate = !0, z(
        u,
        h * this.VerticesPerNode * M.PositionComponentCount,
        this.VerticesPerNode * M.PositionComponentCount
      );
    };
  })();
  connectNodes = /* @__PURE__ */ (function() {
    const e = {
      attribute: null,
      offset: 0,
      count: -1
    };
    return function(s, i) {
      const o = this.geometry.getIndex();
      for (let a = 0; a < this.localHeadGeometry.length - 1; a++) {
        const n = this.VerticesPerNode * s + a, c = this.VerticesPerNode * i + a, r = (s * this.FacesPerNode + a * M.FacesPerQuad) * M.IndicesPerFace;
        o.array[r] = n, o.array[r + 1] = c, o.array[r + 2] = n + 1, o.array[r + 3] = c, o.array[r + 4] = c + 1, o.array[r + 5] = n + 1;
      }
      return o.needsUpdate = !0, z(o, 0, -1), e.attribute = o, e.offset = s * this.FacesPerNode * M.IndicesPerFace, e.count = this.FacesPerNode * M.IndicesPerFace, e;
    };
  })();
  disconnectNodes = /* @__PURE__ */ (function() {
    const e = {
      attribute: null,
      offset: 0,
      count: -1
    };
    return function(s) {
      const i = this.geometry.getIndex();
      for (let o = 0; o < this.localHeadGeometry.length - 1; o++) {
        const a = (s * this.FacesPerNode + o * M.FacesPerQuad) * M.IndicesPerFace;
        i.array[a] = 0, i.array[a + 1] = 0, i.array[a + 2] = 0, i.array[a + 3] = 0, i.array[a + 4] = 0, i.array[a + 5] = 0;
      }
      return i.needsUpdate = !0, z(i, 0, -1), e.attribute = i, e.offset = s * this.FacesPerNode * M.IndicesPerFace, e.count = this.FacesPerNode * M.IndicesPerFace, e;
    };
  })();
  deactivate() {
    this.isActive && (this.scene.remove(this.mesh), this.isActive = !1);
  }
  activate() {
    this.isActive || (this.scene.add(this.mesh), this.isActive = !0);
  }
  static createMaterial(e, t, s) {
    return s = s || {}, s.trailLength = { type: "f", value: null }, s.verticesPerNode = { type: "f", value: null }, s.minID = { type: "f", value: null }, s.maxID = { type: "f", value: null }, s.dragTexture = { type: "f", value: null }, s.maxTrailLength = { type: "f", value: null }, s.textureTileFactor = { type: "v2", value: null }, s.headColor = { type: "v4", value: new l.Vector4() }, s.tailColor = { type: "v4", value: new l.Vector4() }, e = e || M.Shader.BaseVertexShader, t = t || M.Shader.BaseFragmentShader, new l.ShaderMaterial({
      uniforms: s,
      vertexShader: e,
      fragmentShader: t,
      transparent: !0,
      alphaTest: 0.5,
      blending: l.CustomBlending,
      blendSrc: l.SrcAlphaFactor,
      blendDst: l.OneMinusSrcAlphaFactor,
      blendEquation: l.AddEquation,
      depthTest: !0,
      depthWrite: !1,
      side: l.DoubleSide
    });
  }
  static createBaseMaterial(e) {
    return M.createMaterial(
      M.Shader.BaseVertexShader,
      M.Shader.BaseFragmentShader,
      e
    );
  }
  static createTexturedMaterial(e) {
    return e = {}, e.trailTexture = { type: "t", value: null }, M.createMaterial(
      M.Shader.TexturedVertexShader,
      M.Shader.TexturedFragmentShader,
      e
    );
  }
  static get MaxHeadVertices() {
    return 128;
  }
  static _LocalOrientationTangent = new l.Vector3(1, 0, 0);
  static get LocalOrientationTangent() {
    return M._LocalOrientationTangent;
  }
  static _LocalHeadOrigin = new l.Vector3(0, 0, 0);
  static get LocalHeadOrigin() {
    return M._LocalHeadOrigin;
  }
  static get PositionComponentCount() {
    return 3;
  }
  static get UVComponentCount() {
    return 2;
  }
  static get IndicesPerFace() {
    return 3;
  }
  static get FacesPerQuad() {
    return 2;
  }
  static Shader = {
    get BaseVertexVars() {
      return [
        "attribute float nodeID;",
        "attribute float nodeVertexID;",
        "attribute vec3 nodeCenter;",
        "uniform float minID;",
        "uniform float maxID;",
        "uniform float trailLength;",
        "uniform float maxTrailLength;",
        "uniform float verticesPerNode;",
        "uniform vec2 textureTileFactor;",
        "uniform vec4 headColor;",
        "uniform vec4 tailColor;",
        "varying vec4 vColor;"
      ].join(`
`);
    },
    get TexturedVertexVars() {
      return [this.BaseVertexVars, "varying vec2 vUV;", "uniform float dragTexture;"].join(`
`);
    },
    BaseFragmentVars: ["varying vec4 vColor;", "uniform sampler2D trailTexture;"].join(`
`),
    get TexturedFragmentVars() {
      return [this.BaseFragmentVars, "varying vec2 vUV;"].join(`
`);
    },
    get VertexShaderCore() {
      return [
        "float fraction = (maxID - nodeID) / (maxID - minID);",
        "vColor = (1.0 - fraction) * headColor + fraction * tailColor;",
        "vec4 realPosition = vec4((1.0 - fraction) * position.xyz + fraction * nodeCenter.xyz, 1.0); "
      ].join(`
`);
    },
    get BaseVertexShader() {
      return [
        this.BaseVertexVars,
        "void main() { ",
        this.VertexShaderCore,
        "gl_Position = projectionMatrix * viewMatrix * realPosition;",
        "}"
      ].join(`
`);
    },
    get BaseFragmentShader() {
      return [this.BaseFragmentVars, "void main() { ", "gl_FragColor = vColor;", "}"].join(`
`);
    },
    get TexturedVertexShader() {
      return [
        this.TexturedVertexVars,
        "void main() { ",
        this.VertexShaderCore,
        "float s = 0.0;",
        "float t = 0.0;",
        "if (dragTexture == 1.0) { ",
        "   s = fraction *  textureTileFactor.s; ",
        "     t = (nodeVertexID / verticesPerNode) * textureTileFactor.t;",
        "} else { ",
        "    s = nodeID / maxTrailLength * textureTileFactor.s;",
        "     t = (nodeVertexID / verticesPerNode) * textureTileFactor.t;",
        "}",
        "vUV = vec2(s, t); ",
        "gl_Position = projectionMatrix * viewMatrix * realPosition;",
        "}"
      ].join(`
`);
    },
    get TexturedFragmentShader() {
      return [
        this.TexturedFragmentVars,
        "void main() { ",
        "vec4 textureColor = texture2D(trailTexture, vUV);",
        "gl_FragColor = vColor * textureColor;",
        "}"
      ].join(`
`);
    }
  };
}
const G = {
  vertexShader: `
        attribute float nodeID;
        attribute float nodeVertexID;
        attribute vec3 nodeCenter;
        uniform float minID;
        uniform float maxID;
        uniform float trailLength;
        uniform float maxTrailLength;
        uniform float verticesPerNode;
        uniform vec2 textureTileFactor;
        uniform vec4 headColor;
        uniform vec4 tailColor;
        uniform float intensityMultiplier;
        varying vec4 vColor;
        varying float vFraction;

        void main() {
            float fraction = (maxID - nodeID) / (maxID - minID);
            vFraction = fraction;

            // Non-linear gradient: white at head (0-20%), then team color (20-100%)
            // Use smoothstep for smooth transition
            float whiteZone = 0.20; // First 20% is white blend zone
            float whiteFactor = 1.0 - smoothstep(0.0, whiteZone, fraction);

            // Mix between white and team color based on whiteFactor
            vec4 white = vec4(1.0, 1.0, 1.0, headColor.a);
            vec4 baseColor = mix(headColor, tailColor, fraction);
            vec4 colorWithWhite = mix(baseColor, white, whiteFactor * 0.7); // 70% white blend max

            // Apply intensity multiplier to alpha
            colorWithWhite.a *= intensityMultiplier;

            vColor = colorWithWhite;
            vec4 realPosition = vec4((1.0 - fraction) * position.xyz + fraction * nodeCenter.xyz, 1.0);
            gl_Position = projectionMatrix * viewMatrix * realPosition;
        }
    `,
  fragmentShader: `
        varying vec4 vColor;
        varying float vFraction;

        void main() {
            gl_FragColor = vColor;
        }
    `
};
function N() {
  const p = {
    trailLength: { type: "f", value: null },
    verticesPerNode: { type: "f", value: null },
    minID: { type: "f", value: null },
    maxID: { type: "f", value: null },
    dragTexture: { type: "f", value: null },
    maxTrailLength: { type: "f", value: null },
    textureTileFactor: { type: "v2", value: new l.Vector2(1, 1) },
    headColor: { type: "v4", value: new l.Vector4() },
    tailColor: { type: "v4", value: new l.Vector4() },
    intensityMultiplier: { type: "f", value: 1 }
  };
  return new l.ShaderMaterial({
    uniforms: p,
    vertexShader: G.vertexShader,
    fragmentShader: G.fragmentShader,
    transparent: !0,
    blending: l.AdditiveBlending,
    depthTest: !0,
    depthWrite: !1,
    side: l.DoubleSide
  });
}
class Ee {
  constructor(e, t, s, i = 1) {
    this.scene = e, this.team = t, this.config = s, this.active = !0, this.dying = !1, this.deathTime = 0, this.maxDeathTime = 0.8, this.intensity = i, this.teamColors = {
      0: {
        head: new l.Vector4(0.2, 0.4, 1, 1),
        // Deep blue (less cyan)
        tail: new l.Vector4(0.1, 0.2, 0.8, 0)
        // Darker blue, transparent
      },
      1: {
        head: new l.Vector4(1, 0.45, 0, 1),
        // Vibrant orange
        tail: new l.Vector4(0.8, 0.25, 0, 0)
        // Darker orange, transparent
      }
    }, this.mainTarget = new l.Object3D(), this.secondaryTargets = [
      new l.Object3D(),
      new l.Object3D(),
      new l.Object3D(),
      new l.Object3D()
    ], e.add(this.mainTarget), this.secondaryTargets.forEach((o) => e.add(o)), this.mainTrail = this._createMainTrail(), this.secondaryTrails = this._createSecondaryTrails(), this._updateColors(), this._updateIntensity(), this.mainTrail.activate(), this.secondaryTrails.forEach((o) => o.activate());
  }
  _createMainTrail() {
    const e = new M(this.scene, !1), t = N(), s = this.config.mainTrailWidth, i = [
      // Vertical ribbon (Y axis)
      new l.Vector3(0, -s, 0),
      new l.Vector3(0, s, 0),
      // Horizontal ribbon (X axis)
      new l.Vector3(-s, 0, 0),
      new l.Vector3(s, 0, 0),
      // Depth ribbon (Z axis)
      new l.Vector3(0, 0, -s),
      new l.Vector3(0, 0, s)
    ];
    return e.initialize(t, this.config.trailLength, !1, 0, i, this.mainTarget), e.setAdvanceFrequency(60), e.mesh && (e.mesh.frustumCulled = !1, e.mesh.renderOrder = 100), e;
  }
  _createSecondaryTrails() {
    const e = [];
    for (let t = 0; t < 4; t++) {
      const s = new M(this.scene, !1), i = N(), o = this.config.secondaryTrailWidth, a = [
        // Vertical ribbon (Y axis)
        new l.Vector3(0, -o, 0),
        new l.Vector3(0, o, 0),
        // Horizontal ribbon (X axis)
        new l.Vector3(-o, 0, 0),
        new l.Vector3(o, 0, 0),
        // Depth ribbon (Z axis)
        new l.Vector3(0, 0, -o),
        new l.Vector3(0, 0, o)
      ];
      s.initialize(
        i,
        this.config.trailLength,
        !1,
        0,
        a,
        this.secondaryTargets[t]
      ), s.setAdvanceFrequency(60), s.mesh && (s.mesh.frustumCulled = !1, s.mesh.renderOrder = 100), e.push(s);
    }
    return e;
  }
  _updateColors() {
    const e = this.teamColors[this.team] || this.teamColors[0];
    this.mainTrail?.material && (this.mainTrail.material.uniforms.headColor.value.copy(e.head), this.mainTrail.material.uniforms.tailColor.value.copy(e.tail));
    const t = e.head.clone();
    t.w = e.head.w * 0.85;
    const s = e.tail.clone();
    this.secondaryTrails.forEach((i) => {
      i?.material && (i.material.uniforms.headColor.value.copy(t), i.material.uniforms.tailColor.value.copy(s));
    });
  }
  _updateIntensity() {
    this.mainTrail?.material && (this.mainTrail.material.uniforms.intensityMultiplier.value = this.intensity), this.secondaryTrails.forEach((e) => {
      e?.material && (e.material.uniforms.intensityMultiplier.value = this.intensity);
    });
  }
  setTeam(e) {
    this.team !== e && (this.team = e, this._updateColors());
  }
  setIntensity(e) {
    this.intensity = e, this.dying || this._updateIntensity();
  }
  /**
   * Start the death process - segment will fade out
   */
  startDying() {
    this.dying || (this.dying = !0, this.deathTime = 0, this.mainTrail.pause(), this.secondaryTrails.forEach((e) => e.pause()));
  }
  /**
   * Update trail positions
   */
  updatePosition(e, t, s) {
    if (this.dying) return;
    const i = t.clone().normalize();
    this.mainTarget.position.copy(e), this.mainTarget.updateMatrixWorld();
    for (let o = 0; o < 4; o++) {
      const n = o / 4 * Math.PI * 2 + s, c = new l.Vector3(
        Math.cos(n) * this.config.secondaryTrailOffset,
        Math.sin(n) * this.config.secondaryTrailOffset,
        0
      );
      if (i.lengthSq() > 1e-3) {
        const r = new l.Vector3(0, 0, 1), h = new l.Quaternion();
        h.setFromUnitVectors(r, i), c.applyQuaternion(h);
      }
      this.secondaryTargets[o].position.copy(e).add(c), this.secondaryTargets[o].updateMatrixWorld();
    }
  }
  update(e) {
    if (this.dying) {
      this.deathTime += e;
      const t = Math.min(1, this.deathTime / this.maxDeathTime), s = this.intensity * (1 - t);
      this.mainTrail?.material && (this.mainTrail.material.uniforms.intensityMultiplier.value = s), this.secondaryTrails.forEach((i) => {
        i?.material && (i.material.uniforms.intensityMultiplier.value = s);
      }), this.deathTime >= this.maxDeathTime && (this.active = !1);
    }
    this.mainTrail.isActive && this.mainTrail.update(e), this.secondaryTrails.forEach((t) => {
      t.isActive && t.update(e);
    });
  }
  dispose() {
    this.mainTrail.deactivate(), this.secondaryTrails.forEach((e) => e.deactivate()), this.mainTrail.geometry && this.mainTrail.geometry.dispose(), this.mainTrail.material && this.mainTrail.material.dispose(), this.secondaryTrails.forEach((e) => {
      e.geometry && e.geometry.dispose(), e.material && e.material.dispose();
    }), this.scene.remove(this.mainTarget), this.secondaryTargets.forEach((e) => this.scene.remove(e));
  }
}
class Le {
  /**
   * @param {THREE.Scene} scene - The scene to add trails to
   * @param {number} team - Team color (0 = blue, 1 = orange)
   */
  constructor(e, t = 0) {
    this.scene = e, this.team = t, this.active = !1, this.ballRadius = 92.75, this.config = {
      trailLength: 60,
      mainTrailWidth: 15,
      // 15 UU
      secondaryTrailWidth: 1.5,
      // Thinner satellite trails
      secondaryTrailOffset: this.ballRadius * 0.7
    }, this.rotationSpeed = Math.PI / 3, this.currentRotation = 0, this.minVelocity = 1500, this.maxVelocity = 6e3, this.minIntensity = 0.3, this.maxIntensity = 1, this.wasEmitting = !1, this.segments = [], this.currentSegment = null, this.currentIntensity = 1;
  }
  /**
   * Calculate intensity based on velocity
   * @param {number} speed - Current ball speed
   * @returns {number} Intensity value between minIntensity and maxIntensity
   */
  _calculateIntensity(e) {
    if (e <= this.minVelocity) return this.minIntensity;
    if (e >= this.maxVelocity) return this.maxIntensity;
    const t = (e - this.minVelocity) / (this.maxVelocity - this.minVelocity);
    return this.minIntensity + t * (this.maxIntensity - this.minIntensity);
  }
  /**
   * Set team color
   * @param {number} team - 0 = blue, 1 = orange
   */
  setTeam(e) {
    this.team !== e && (this.team = e, this.currentSegment && !this.currentSegment.dying && (this.currentSegment.startDying(), this.currentSegment = null));
  }
  /**
   * Activate the trail system
   */
  activate() {
    this.active || (this.active = !0, this.currentSegment = null, this.wasEmitting = !1);
  }
  /**
   * Deactivate the trail system
   */
  deactivate() {
    this.active && (this.active = !1, this.currentSegment && (this.currentSegment.startDying(), this.currentSegment = null));
  }
  /**
   * Update trail emission
   * @param {THREE.Vector3} position - Ball position
   * @param {THREE.Vector3} velocity - Ball velocity
   * @param {number} delta - Time delta in seconds
   */
  emit(e, t, s) {
    const i = t.length();
    if (!(i >= this.minVelocity)) {
      this.currentSegment && !this.currentSegment.dying && (this.currentSegment.startDying(), this.currentSegment = null), this.wasEmitting = !1;
      return;
    }
    this.currentIntensity = this._calculateIntensity(i), this.active || this.activate(), !this.wasEmitting || !this.currentSegment ? (this.currentSegment && !this.currentSegment.dying && this.currentSegment.startDying(), this.currentSegment = new Ee(
      this.scene,
      this.team,
      this.config,
      this.currentIntensity
    ), this.segments.push(this.currentSegment)) : this.currentSegment.setIntensity(this.currentIntensity), this.wasEmitting = !0, this.currentRotation += this.rotationSpeed * s, this.currentRotation > Math.PI * 2 && (this.currentRotation -= Math.PI * 2), this.currentSegment.updatePosition(e, t, this.currentRotation);
  }
  /**
   * Update trails (call every frame)
   * @param {number} delta - Time delta in seconds
   */
  update(e) {
    for (let t = this.segments.length - 1; t >= 0; t--) {
      const s = this.segments[t];
      s.update(e), s.active || (s.dispose(), this.segments.splice(t, 1));
    }
  }
  /**
   * Reset trails (call when seeking)
   */
  reset() {
    for (const e of this.segments)
      e.dispose();
    this.segments = [], this.currentSegment = null, this.currentRotation = 0, this.wasEmitting = !1;
  }
  /**
   * Add to scene (segments add themselves)
   */
  addToScene(e) {
  }
  /**
   * Remove from scene
   */
  removeFromScene(e) {
    for (const t of this.segments)
      t.startDying();
    this.currentSegment = null;
  }
  /**
   * Dispose of all resources
   */
  dispose() {
    for (const e of this.segments)
      e.dispose();
    this.segments = [], this.currentSegment = null;
  }
}
let A = null, V = null, F = null, W = !1;
function Oe() {
  W || (Ne(), We(), He(), W = !0);
}
let D = null;
class Re {
  constructor(e, t, s, i = 2) {
    this.scene = e, this.renderer = t, this.camera = s, this.maxExplosions = i, this.explosions = [], this.warmedUp = !1, this.initPool();
  }
  initPool() {
    this.sphereGeo = new l.SphereGeometry(1, 16, 12), this.coreGeo = new l.SphereGeometry(1, 12, 8), this.ringGeo = new l.RingGeometry(0.5, 1, 32), this.particleGeo = new l.PlaneGeometry(1, 1), this.coreMaterial = new l.MeshBasicMaterial({
      color: 16777130,
      transparent: !0,
      opacity: 0.9,
      blending: l.AdditiveBlending,
      side: l.DoubleSide,
      depthWrite: !1
    }), this.sphereMaterial = new l.MeshBasicMaterial({
      color: 16737792,
      transparent: !0,
      opacity: 0.5,
      blending: l.AdditiveBlending,
      side: l.DoubleSide,
      depthWrite: !1
    }), this.ringMaterial = new l.MeshBasicMaterial({
      color: 16746496,
      transparent: !0,
      opacity: 0.7,
      blending: l.AdditiveBlending,
      side: l.DoubleSide,
      depthWrite: !1
    }), this.particleMaterial = new l.MeshBasicMaterial({
      color: 16763904,
      transparent: !0,
      opacity: 0.8,
      blending: l.AdditiveBlending,
      side: l.DoubleSide,
      depthWrite: !1
    });
    for (let e = 0; e < this.maxExplosions; e++) {
      const t = this.createExplosion();
      this.explosions.push(t);
    }
  }
  // Pre-compile shaders by doing an ACTUAL render (not just compile)
  // renderer.compile() only does CPU-side prep, GPU compilation happens on first render
  warmup() {
    if (this.warmedUp || !this.renderer || !this.camera) return;
    console.log("[SimplifiedExplosionPool] Starting GPU shader warmup...");
    const e = this.renderer.getClearColor(new l.Color()), t = this.renderer.getClearAlpha(), s = this.renderer.autoClear;
    for (const i of this.explosions) {
      i.container.position.copy(this.camera.position), i.container.visible = !0, i.core.scale.set(1e-3, 1e-3, 1e-3), i.sphere.scale.set(1e-3, 1e-3, 1e-3), i.ring.scale.set(1e-3, 1e-3, 1e-3);
      for (const o of i.particles)
        o.mesh.scale.set(1e-3, 1e-3, 1e-3);
    }
    this.renderer.autoClear = !1, this.renderer.render(this.scene, this.camera);
    for (const i of this.explosions) {
      i.container.visible = !1, i.core.scale.set(0.1, 0.1, 0.1), i.sphere.scale.set(0.1, 0.1, 0.1), i.ring.scale.set(0.1, 0.1, 0.1);
      for (const o of i.particles)
        o.mesh.scale.set(12, 12, 12);
    }
    this.renderer.autoClear = s, this.renderer.setClearColor(e, t), this.warmedUp = !0, console.log("[SimplifiedExplosionPool] GPU shader warmup complete");
  }
  createExplosion() {
    const e = new l.Group();
    e.visible = !1, e.renderOrder = 999, this.scene.add(e);
    const t = this.coreMaterial.clone(), s = this.sphereMaterial.clone(), i = this.ringMaterial.clone(), o = this.particleMaterial.clone(), a = new l.Mesh(this.coreGeo, t);
    a.scale.set(0.1, 0.1, 0.1), a.renderOrder = 999, e.add(a);
    const n = new l.Mesh(this.sphereGeo, s);
    n.scale.set(0.1, 0.1, 0.1), n.renderOrder = 999, e.add(n);
    const c = new l.Mesh(this.ringGeo, i);
    c.rotation.x = -Math.PI / 2, c.scale.set(0.1, 0.1, 0.1), c.renderOrder = 999, e.add(c);
    const r = [];
    for (let h = 0; h < 12; h++) {
      const d = new l.Mesh(this.particleGeo, o);
      d.scale.set(12, 12, 12), d.renderOrder = 999, e.add(d);
      const u = h / 12 * Math.PI * 2, m = (Math.random() - 0.3) * Math.PI, f = 350 + Math.random() * 250;
      r.push({
        mesh: d,
        velocity: new l.Vector3(
          Math.cos(u) * Math.cos(m) * f,
          Math.sin(m) * f + 100,
          // Upward bias
          Math.sin(u) * Math.cos(m) * f
        )
      });
    }
    return {
      container: e,
      core: a,
      coreMat: t,
      sphere: n,
      ring: c,
      particles: r,
      particleMat: o,
      active: !1,
      elapsed: 0,
      duration: 0.4,
      position: new l.Vector3()
    };
  }
  trigger(e) {
    let t = this.explosions.find((s) => !s.active);
    t || (t = this.explosions[0], this.resetExplosion(t)), t.active = !0, t.elapsed = 0, t.position.copy(e), t.container.position.copy(e), t.container.visible = !0, t.core.scale.set(0.1, 0.1, 0.1), t.coreMat.opacity = 1, t.sphere.scale.set(0.1, 0.1, 0.1), t.sphere.material.opacity = 0.6, t.ring.scale.set(0.1, 0.1, 0.1), t.ring.material.opacity = 0.8, t.particleMat.opacity = 0.9, t.particles.forEach((s, i) => {
      s.mesh.position.set(0, 0, 0);
      const o = i / 12 * Math.PI * 2, a = (Math.random() - 0.3) * Math.PI, n = 350 + Math.random() * 250;
      s.velocity.set(
        Math.cos(o) * Math.cos(a) * n,
        Math.sin(a) * n + 100,
        Math.sin(o) * Math.cos(a) * n
      );
    });
  }
  resetExplosion(e) {
    e.active = !1, e.container.visible = !1;
  }
  update(e) {
    for (const t of this.explosions) {
      if (!t.active) continue;
      t.elapsed += e;
      const s = t.elapsed / t.duration;
      if (s >= 1) {
        this.resetExplosion(t);
        continue;
      }
      const i = 30 + s * 80;
      t.core.scale.set(i, i, i), t.coreMat.opacity = 1 * Math.pow(1 - s, 2);
      const o = 50 + s * 200;
      t.sphere.scale.set(o, o, o), t.sphere.material.opacity = 0.6 * (1 - s);
      const a = 80 + s * 350;
      t.ring.scale.set(a, a, a), t.ring.material.opacity = 0.8 * (1 - s * s), t.particleMat.opacity = 0.9 * (1 - s);
      for (const n of t.particles)
        n.mesh.position.add(n.velocity.clone().multiplyScalar(e)), n.velocity.y -= 300 * e, this.camera && n.mesh.lookAt(this.camera.position);
    }
  }
  dispose() {
    for (const e of this.explosions)
      this.scene.remove(e.container), e.coreMat.dispose(), e.sphere.material.dispose(), e.ring.material.dispose(), e.particleMat.dispose();
    this.coreGeo.dispose(), this.sphereGeo.dispose(), this.ringGeo.dispose(), this.particleGeo.dispose(), this.coreMaterial.dispose(), this.sphereMaterial.dispose(), this.ringMaterial.dispose(), this.particleMaterial.dispose();
  }
}
function J(p, e = null, t = null) {
  return D || (D = new Re(p, e, t)), e && t && !D.warmedUp && (D.renderer = e, D.camera = t, D.warmup()), D;
}
function ke(p, e, t) {
  J(p, e, t), ee(p, e, t);
}
let _ = null;
const H = {
  // Team 0 = Blue
  0: {
    core: 6737151,
    // Bright cyan-blue
    sphere: 35071,
    // Blue
    ring: 43775,
    // Light blue
    particles: 8969727
    // Pale blue
  },
  // Team 1 = Orange
  1: {
    core: 16768358,
    // Bright yellow-orange
    sphere: 16737792,
    // Orange
    ring: 16746496,
    // Light orange
    particles: 16755268
    // Pale orange
  }
};
class Ge {
  constructor(e, t, s, i = 2) {
    this.scene = e, this.renderer = t, this.camera = s, this.maxExplosions = i, this.explosions = [], this.warmedUp = !1, this.initPool();
  }
  initPool() {
    this.coreGeo = new l.SphereGeometry(1, 16, 12), this.sphereGeo = new l.SphereGeometry(1, 20, 14), this.ringGeo = new l.RingGeometry(0.3, 1, 48), this.particleGeo = new l.PlaneGeometry(1, 1), this.rayGeo = new l.PlaneGeometry(1, 1);
    for (let e = 0; e < this.maxExplosions; e++) {
      const t = this.createExplosion();
      this.explosions.push(t);
    }
  }
  createMaterialsForTeam(e) {
    const t = H[e] || H[0];
    return {
      core: new l.MeshBasicMaterial({
        color: t.core,
        transparent: !0,
        opacity: 1,
        blending: l.AdditiveBlending,
        side: l.DoubleSide,
        depthWrite: !1
      }),
      sphere: new l.MeshBasicMaterial({
        color: t.sphere,
        transparent: !0,
        opacity: 0.6,
        blending: l.AdditiveBlending,
        side: l.DoubleSide,
        depthWrite: !1
      }),
      ring: new l.MeshBasicMaterial({
        color: t.ring,
        transparent: !0,
        opacity: 0.8,
        blending: l.AdditiveBlending,
        side: l.DoubleSide,
        depthWrite: !1
      }),
      particles: new l.MeshBasicMaterial({
        color: t.particles,
        transparent: !0,
        opacity: 0.9,
        blending: l.AdditiveBlending,
        side: l.DoubleSide,
        depthWrite: !1
      }),
      rays: new l.MeshBasicMaterial({
        color: t.core,
        transparent: !0,
        opacity: 0.7,
        blending: l.AdditiveBlending,
        side: l.DoubleSide,
        depthWrite: !1
      })
    };
  }
  createExplosion() {
    const e = new l.Group();
    e.visible = !1, e.renderOrder = 999, this.scene.add(e);
    const t = {
      0: this.createMaterialsForTeam(0),
      1: this.createMaterialsForTeam(1)
    }, s = new l.Mesh(this.coreGeo, t[0].core);
    s.scale.set(0.1, 0.1, 0.1), s.renderOrder = 999, e.add(s);
    const i = new l.Mesh(this.coreGeo, t[0].core.clone());
    i.scale.set(0.1, 0.1, 0.1), i.renderOrder = 999, e.add(i);
    const o = new l.Mesh(this.coreGeo, t[0].sphere.clone());
    o.scale.set(0.1, 0.1, 0.1), o.renderOrder = 999, e.add(o);
    const a = new l.Mesh(this.sphereGeo, t[0].sphere);
    a.scale.set(0.1, 0.1, 0.1), a.renderOrder = 999, e.add(a);
    const n = [], c = [];
    for (let m = 0; m < 12; m++) {
      const f = new l.Mesh(this.rayGeo, t[0].rays.clone());
      f.scale.set(20, 300, 1), f.renderOrder = 999;
      const g = m / 12 * Math.PI * 2;
      f.rotation.z = g, f.position.set(0, 0, 0), e.add(f), c.push({ mesh: f, baseAngle: g });
    }
    const r = [], h = 12, d = 8;
    for (let m = 0; m < h; m++) {
      const f = m / h * Math.PI * 2, g = m % 3 === 0 ? 0.6 : m % 3 === 1 ? 0.2 : -0.1;
      for (let y = 0; y < d; y++) {
        const x = new l.Mesh(this.particleGeo, t[0].particles.clone());
        x.scale.set(40, 40, 40), x.renderOrder = 999, e.add(x);
        const w = f + (Math.random() - 0.5) * 0.3, b = g + (Math.random() - 0.5) * 0.2, C = 1800 * (1 - y / d * 0.5) + Math.random() * 300, S = y * 0.02, P = 1 - y / d * 0.4, I = (35 + Math.random() * 25) * P;
        r.push({
          mesh: x,
          velocity: new l.Vector3(
            Math.cos(w) * Math.cos(b) * C,
            Math.sin(b) * C + 300,
            Math.sin(w) * Math.cos(b) * C
          ),
          initialScale: I,
          delay: S,
          jetIndex: m
        });
      }
    }
    const u = 100;
    for (let m = 0; m < u; m++) {
      const f = new l.Mesh(this.particleGeo, t[0].particles.clone()), g = 8 + Math.random() * 18;
      f.scale.set(g, g, g), f.renderOrder = 999, e.add(f);
      const y = Math.random() * Math.PI * 2, x = (Math.random() - 0.5) * Math.PI, w = Math.random();
      let b;
      w < 0.3 ? b = 1500 + Math.random() * 800 : w < 0.6 ? b = 800 + Math.random() * 600 : b = 300 + Math.random() * 500, r.push({
        mesh: f,
        velocity: new l.Vector3(
          Math.cos(y) * Math.cos(x) * b,
          Math.sin(x) * b + 150,
          Math.sin(y) * Math.cos(x) * b
        ),
        initialScale: g,
        delay: Math.random() * 0.2,
        // Staggered launch
        jetIndex: -1
        // scatter particle
      });
    }
    return {
      container: e,
      core: s,
      core2: i,
      core3: o,
      sphere: a,
      rings: n,
      rays: c,
      particles: r,
      materials: t,
      currentTeam: 0,
      active: !1,
      elapsed: 0,
      duration: 1.8,
      // Longer for dramatic jets
      position: new l.Vector3(),
      rotationOffset: 0
    };
  }
  warmup() {
    if (!(this.warmedUp || !this.renderer || !this.camera)) {
      console.log("[GoalExplosionPool] Starting GPU shader warmup...");
      for (const e of this.explosions) {
        e.container.position.copy(this.camera.position), e.container.visible = !0, e.core.scale.set(1e-3, 1e-3, 1e-3), e.core2.scale.set(1e-3, 1e-3, 1e-3), e.core3.scale.set(1e-3, 1e-3, 1e-3), e.sphere.scale.set(1e-3, 1e-3, 1e-3);
        for (const t of e.rings)
          t.mesh.scale.set(1e-3, 1e-3, 1e-3);
        for (const t of e.rays)
          t.mesh.scale.set(1e-3, 1e-3, 1e-3);
        for (const t of e.particles)
          t.mesh.scale.set(1e-3, 1e-3, 1e-3);
      }
      this.renderer.render(this.scene, this.camera);
      for (const e of this.explosions) {
        e.container.visible = !1, e.core.scale.set(0.1, 0.1, 0.1), e.core2.scale.set(0.1, 0.1, 0.1), e.core3.scale.set(0.1, 0.1, 0.1), e.sphere.scale.set(0.1, 0.1, 0.1);
        for (const t of e.rings)
          t.mesh.scale.set(0.1, 0.1, 0.1);
        for (const t of e.rays)
          t.mesh.scale.set(20, 300, 1);
        for (const t of e.particles)
          t.mesh.scale.set(30, 30, 30);
      }
      this.warmedUp = !0, console.log("[GoalExplosionPool] GPU shader warmup complete");
    }
  }
  // Easing functions for non-linear animation
  easeOutElastic(e) {
    const t = 2 * Math.PI / 3;
    return e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * t) + 1;
  }
  easeOutExpo(e) {
    return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
  }
  easeOutBack(e) {
    return 1 + 2.70158 * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2);
  }
  trigger(e, t = 0) {
    let s = this.explosions.find((c) => !c.active);
    s || (s = this.explosions[0], this.resetExplosion(s));
    const i = s.materials[t] || s.materials[0];
    s.core.material = i.core, s.core2.material = i.core.clone(), s.core3.material = i.sphere.clone(), s.sphere.material = i.sphere;
    for (const c of s.rings)
      c.mesh.material = i.ring.clone();
    for (const c of s.rays)
      c.mesh.material = i.rays.clone();
    for (const c of s.particles)
      c.mesh.material = i.particles.clone();
    s.active = !0, s.elapsed = 0, s.currentTeam = t, s.position.copy(e), s.container.position.copy(e), s.container.visible = !0, s.rotationOffset = 0, s.core.scale.set(0.1, 0.1, 0.1), s.core.material.opacity = 1, s.core2.scale.set(0.1, 0.1, 0.1), s.core2.material.opacity = 0.8, s.core3.scale.set(0.1, 0.1, 0.1), s.core3.material.opacity = 0.5, s.sphere.scale.set(0.1, 0.1, 0.1), s.sphere.material.opacity = 0.4;
    for (const c of s.rings)
      c.mesh.scale.set(0.1, 0.1, 0.1), c.mesh.material.opacity = 0.9;
    for (let c = 0; c < s.rays.length; c++) {
      const r = s.rays[c];
      r.mesh.material.opacity = 0.8, r.mesh.scale.set(40, 0.1, 1);
    }
    const o = 12, a = 8;
    let n = 0;
    for (let c = 0; c < o; c++) {
      const r = c / o * Math.PI * 2, h = c % 3 === 0 ? 0.6 : c % 3 === 1 ? 0.2 : -0.1;
      for (let d = 0; d < a && !(n >= s.particles.length); d++) {
        const u = s.particles[n];
        u.mesh.position.set(0, 0, 0), u.mesh.material.opacity = 1;
        const m = u.initialScale;
        u.mesh.scale.set(m, m, m);
        const f = r + (Math.random() - 0.5) * 0.3, g = h + (Math.random() - 0.5) * 0.2, w = 1800 * (1 - d / a * 0.5) + Math.random() * 300;
        u.velocity.set(
          Math.cos(f) * Math.cos(g) * w,
          Math.sin(g) * w + 300,
          Math.sin(f) * Math.cos(g) * w
        ), u.delay = d * 0.02, n++;
      }
    }
    for (; n < s.particles.length; ) {
      const c = s.particles[n];
      c.mesh.position.set(0, 0, 0), c.mesh.material.opacity = 1;
      const r = c.initialScale;
      c.mesh.scale.set(r, r, r);
      const h = Math.random() * Math.PI * 2, d = (Math.random() - 0.4) * Math.PI, u = 600 + Math.random() * 800;
      c.velocity.set(
        Math.cos(h) * Math.cos(d) * u,
        Math.sin(d) * u + 200,
        Math.sin(h) * Math.cos(d) * u
      ), c.delay = Math.random() * 0.15, n++;
    }
  }
  resetExplosion(e) {
    e.active = !1, e.container.visible = !1;
  }
  update(e) {
    for (const t of this.explosions) {
      if (!t.active) continue;
      t.elapsed += e;
      const s = t.elapsed / t.duration;
      if (s >= 1) {
        this.resetExplosion(t);
        continue;
      }
      t.rotationOffset += e * 2;
      const i = this.easeOutElastic(Math.min(s * 2, 1)), o = this.easeOutExpo(s), a = this.easeOutBack(Math.min(s * 1.5, 1)), n = 1 + Math.sin(t.elapsed * 15) * 0.15 * (1 - s), c = (150 + i * 300) * n;
      t.core.scale.set(c, c, c), t.core.material.opacity = 1 * Math.pow(1 - s, 1.2);
      const r = 1 + Math.sin(t.elapsed * 12 + 1) * 0.12 * (1 - s), h = (200 + a * 400) * r;
      t.core2.scale.set(h, h, h), t.core2.material.opacity = 0.7 * Math.pow(1 - s, 1.5);
      const d = 300 + o * 600;
      t.core3.scale.set(d, d, d), t.core3.material.opacity = 0.4 * Math.pow(1 - s, 2);
      const u = 400 + o * 1200;
      t.sphere.scale.set(u, u, u), t.sphere.material.opacity = 0.3 * (1 - s * s);
      for (let g = 0; g < t.rings.length; g++) {
        const y = t.rings[g], x = this.easeOutExpo(Math.min(s * (1.2 + g * 0.1), 1)), w = 300 + g * 100 + x * (1500 + g * 200);
        y.mesh.scale.set(w, w, w), y.mesh.material.opacity = 0.8 * Math.pow(1 - s, 1.5), y.axis === "horizontal" ? y.mesh.rotation.z = t.rotationOffset * 0.3 : y.axis === "verticalX" ? y.mesh.rotation.x += e * 1.5 : y.axis === "verticalZ" ? y.mesh.rotation.y += e * 1.2 : y.mesh.rotation.z += e * 0.8;
      }
      const m = 200 + o * 2e3, f = 1 + Math.sin(t.elapsed * 20) * 0.1 * (1 - s);
      for (let g = 0; g < t.rays.length; g++) {
        const y = t.rays[g], x = m * f * (0.8 + Math.sin(g * 0.5 + t.elapsed * 8) * 0.2), w = 60 * (1 - s * 0.4);
        y.mesh.scale.set(w, x, 1), y.mesh.rotation.z = y.baseAngle + t.rotationOffset * 0.5, y.mesh.material.opacity = 0.8 * Math.pow(1 - s, 1.3);
      }
      for (const g of t.particles) {
        if (Math.max(0, t.elapsed - (g.delay || 0)) > 0) {
          g.mesh.position.add(g.velocity.clone().multiplyScalar(e)), g.velocity.y -= 600 * e, g.velocity.multiplyScalar(0.995);
          const x = Math.max(0.3, 1 - s * 0.7), w = g.initialScale * x;
          g.mesh.scale.set(w, w, w);
        }
        g.mesh.material.opacity = 1 * Math.pow(1 - s, 1.2), this.camera && g.mesh.lookAt(this.camera.position);
      }
    }
  }
  dispose() {
    for (const e of this.explosions) {
      this.scene.remove(e.container);
      for (const t of Object.values(e.materials))
        t.core.dispose(), t.sphere.dispose(), t.ring.dispose(), t.particles.dispose(), t.rays.dispose();
    }
    this.coreGeo.dispose(), this.sphereGeo.dispose(), this.ringGeo.dispose(), this.particleGeo.dispose(), this.rayGeo.dispose();
  }
}
function ee(p, e = null, t = null) {
  return _ || (_ = new Ge(p, e, t)), e && t && !_.warmedUp && (_.renderer = e, _.camera = t, _.warmup()), _;
}
function Ne() {
  if (A) return A;
  const p = document.createElement("canvas");
  p.width = 64, p.height = 64;
  const e = p.getContext("2d"), t = e.createRadialGradient(32, 32, 0, 32, 32, 32);
  return t.addColorStop(0, "rgba(255,255,255,1)"), t.addColorStop(0.2, "rgba(255,255,255,0.8)"), t.addColorStop(0.5, "rgba(255,255,255,0.3)"), t.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = t, e.fillRect(0, 0, 64, 64), A = new l.CanvasTexture(p), A;
}
function We() {
  if (V) return V;
  const p = document.createElement("canvas");
  p.width = 128, p.height = 128;
  const e = p.getContext("2d"), t = e.createRadialGradient(64, 64, 0, 64, 64, 64);
  return t.addColorStop(0, "rgba(255,255,255,1)"), t.addColorStop(0.1, "rgba(255,200,100,0.9)"), t.addColorStop(0.4, "rgba(255,100,50,0.4)"), t.addColorStop(0.7, "rgba(255,50,0,0.1)"), t.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = t, e.fillRect(0, 0, 128, 128), V = new l.CanvasTexture(p), V;
}
function He() {
  if (F) return F;
  const p = document.createElement("canvas");
  p.width = 64, p.height = 64;
  const e = p.getContext("2d"), t = e.createImageData(64, 64);
  for (let s = 0; s < t.data.length; s += 4) {
    const i = s / 4 % 64, o = Math.floor(s / 4 / 64), a = i - 32, n = o - 32, c = Math.sqrt(a * a + n * n) / 32, r = Math.random() * 0.3 + 0.7, h = Math.max(0, 1 - c * c) * r * 255;
    t.data[s] = 255, t.data[s + 1] = 255, t.data[s + 2] = 255, t.data[s + 3] = h;
  }
  return e.putImageData(t, 0, 0), F = new l.CanvasTexture(p), F;
}
class $e {
  constructor(e) {
    this.carMesh = e, this.active = !1, this.particleCount = 200, this.particles = [];
    const t = new l.BufferGeometry(), s = new Float32Array(this.particleCount * 3), i = new Float32Array(this.particleCount * 3), o = new Float32Array(this.particleCount), a = new Float32Array(this.particleCount);
    for (let c = 0; c < this.particleCount; c++)
      s[c * 3] = 0, s[c * 3 + 1] = 0, s[c * 3 + 2] = 0, i[c * 3] = 1, i[c * 3 + 1] = 0.5, i[c * 3 + 2] = 0.1, o[c] = 2, a[c] = 0, this.particles.push({
        life: 0,
        maxLife: 0.5,
        velocity: new l.Vector3(),
        active: !1
      });
    t.setAttribute("position", new l.BufferAttribute(s, 3)), t.setAttribute("color", new l.BufferAttribute(i, 3)), t.setAttribute("size", new l.BufferAttribute(o, 1)), t.setAttribute("alpha", new l.BufferAttribute(a, 1)), this.geometry = t;
    const n = new l.ShaderMaterial({
      uniforms: {},
      vertexShader: `
                attribute float size;
                attribute float alpha;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    vColor = color;
                    vAlpha = alpha;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (2500.0 / -mvPosition.z); // Slightly larger for flame effect
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
      fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;

                    // Softer glow with hot center
                    float glow = 1.0 - (dist * 2.0);
                    glow = pow(glow, 0.6); // Softer falloff for more glow

                    // Brighter center (white-hot core)
                    vec3 flameColor = vColor;
                    if (dist < 0.15) {
                        flameColor = mix(vec3(1.0, 1.0, 0.9), vColor, dist / 0.15); // White-yellow core
                    }

                    gl_FragColor = vec4(flameColor * glow * 1.5, vAlpha * glow);
                }
            `,
      transparent: !0,
      depthWrite: !1,
      blending: l.AdditiveBlending
    });
    this.points = new l.Points(t, n), this.points.frustumCulled = !1, this.nextParticleIndex = 0;
  }
  setActive(e) {
    this.active = e;
  }
  emit(e, t, s, i = 1) {
    if (!this.active) return;
    const o = Math.floor(Math.random() * 3) + 3, a = Math.max(1, Math.round(o * i));
    for (let n = 0; n < a; n++) {
      const c = this.particles[this.nextParticleIndex], r = this.geometry.attributes.position.array, h = this.geometry.attributes.alpha.array, d = this.geometry.attributes.size.array, u = this.geometry.attributes.color.array, m = this.nextParticleIndex, f = new l.Vector3(-55, 0, 0);
      f.applyQuaternion(t);
      const g = new l.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ), y = e.clone().add(f).add(g);
      r[m * 3] = y.x, r[m * 3 + 1] = y.y, r[m * 3 + 2] = y.z;
      const x = new l.Vector3(-1, 0, 0);
      x.applyQuaternion(t), x.multiplyScalar(150 + Math.random() * 80), c.velocity.copy(x), c.velocity.add(s.clone().multiplyScalar(0.2)), c.velocity.add(
        new l.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        )
      ), c.life = 0, c.maxLife = 0.3 + Math.random() * 0.3, c.active = !0, h[m] = 1, d[m] = 3 + Math.random() * 2, c.initialSize = d[m], u[m * 3] = 1, u[m * 3 + 1] = 0.8 + Math.random() * 0.2, u[m * 3 + 2] = 0.3 + Math.random() * 0.3, this.nextParticleIndex = (this.nextParticleIndex + 1) % this.particleCount;
    }
    this.geometry.attributes.position.needsUpdate = !0, this.geometry.attributes.alpha.needsUpdate = !0, this.geometry.attributes.size.needsUpdate = !0, this.geometry.attributes.color.needsUpdate = !0;
  }
  update(e) {
    const t = this.geometry.attributes.position.array, s = this.geometry.attributes.alpha.array, i = this.geometry.attributes.size.array, o = this.geometry.attributes.color.array;
    for (let a = 0; a < this.particleCount; a++) {
      const n = this.particles[a];
      if (!n.active) continue;
      if (n.life += e, n.life >= n.maxLife) {
        n.active = !1, s[a] = 0, i[a] = 0;
        continue;
      }
      t[a * 3] += n.velocity.x * e, t[a * 3 + 1] += n.velocity.y * e, t[a * 3 + 2] += n.velocity.z * e;
      const c = n.life / n.maxLife;
      s[a] = Math.pow(1 - c, 0.5);
      const r = n.initialSize || 3;
      i[a] = r * (1 - c * 0.7), o[a * 3] = 1, o[a * 3 + 1] = Math.max(0.2, 0.9 - c * 0.7), o[a * 3 + 2] = Math.max(0, 0.4 - c * 0.4), n.velocity.y += 20 * e;
    }
    this.geometry.attributes.position.needsUpdate = !0, this.geometry.attributes.alpha.needsUpdate = !0, this.geometry.attributes.size.needsUpdate = !0, this.geometry.attributes.color.needsUpdate = !0;
  }
  addToScene(e) {
    e.add(this.points);
  }
  removeFromScene(e) {
    e.remove(this.points);
  }
  dispose() {
    this.geometry.dispose(), this.points.material.dispose();
  }
}
class Ke {
  constructor(e, t, s, i) {
    this.scene = e, this.team = t, this.trailWidth = s, this.trailLength = i, this.active = !0, this.dying = !1, this.deathTime = 0, this.maxDeathTime = 1.5, this.teamColors = {
      0: new l.Vector4(0.3, 0.6, 1, 0.9),
      // Blue
      1: new l.Vector4(1, 0.5, 0.15, 0.9)
      // Orange
    }, this.leftTarget = new l.Object3D(), this.rightTarget = new l.Object3D(), e.add(this.leftTarget), e.add(this.rightTarget), this.leftTrail = this.createTrail(this.leftTarget), this.rightTrail = this.createTrail(this.rightTarget), this.updateColors(), this.leftTrail.activate(), this.rightTrail.activate();
  }
  createTrail(e) {
    const t = new M(this.scene, !1), s = M.createBaseMaterial();
    s.blending = l.AdditiveBlending, s.depthWrite = !1, s.side = l.DoubleSide;
    const i = this.trailWidth, o = [
      // Vertical ribbon
      new l.Vector3(0, 0, 0),
      new l.Vector3(0, i, 0),
      // Horizontal ribbon (perpendicular)
      new l.Vector3(-i / 2, i / 2, 0),
      new l.Vector3(i / 2, i / 2, 0)
    ];
    return t.initialize(s, this.trailLength, !1, 0, o, e), t.setAdvanceFrequency(60), t.mesh && (t.mesh.frustumCulled = !1), t;
  }
  updateColors() {
    const e = this.teamColors[this.team] || this.teamColors[0], t = new l.Vector4(e.x * 0.3, e.y * 0.3, e.z * 0.3, 0);
    this.leftTrail?.material && (this.leftTrail.material.uniforms.headColor.value.copy(e), this.leftTrail.material.uniforms.tailColor.value.copy(t)), this.rightTrail?.material && (this.rightTrail.material.uniforms.headColor.value.copy(e), this.rightTrail.material.uniforms.tailColor.value.copy(t));
  }
  // Start the death process - trail will fade out
  startDying() {
    this.dying || (this.dying = !0, this.deathTime = 0, this.leftTrail.pause(), this.rightTrail.pause());
  }
  updatePosition(e, t, s) {
    this.dying || (this.leftTarget.position.copy(e), this.rightTarget.position.copy(t), this.leftTarget.quaternion.copy(s), this.rightTarget.quaternion.copy(s), this.leftTarget.updateMatrixWorld(), this.rightTarget.updateMatrixWorld());
  }
  update(e) {
    if (this.dying) {
      this.deathTime += e;
      const s = 1 - Math.min(1, this.deathTime / this.maxDeathTime), i = this.teamColors[this.team] || this.teamColors[0], o = new l.Vector4(i.x, i.y, i.z, i.w * s), a = new l.Vector4(i.x * 0.3, i.y * 0.3, i.z * 0.3, 0);
      this.leftTrail?.material && (this.leftTrail.material.uniforms.headColor.value.copy(o), this.leftTrail.material.uniforms.tailColor.value.copy(a)), this.rightTrail?.material && (this.rightTrail.material.uniforms.headColor.value.copy(o), this.rightTrail.material.uniforms.tailColor.value.copy(a)), this.deathTime >= this.maxDeathTime && (this.active = !1);
    }
    this.leftTrail.isActive && this.leftTrail.update(e), this.rightTrail.isActive && this.rightTrail.update(e);
  }
  dispose() {
    this.leftTrail.deactivate(), this.rightTrail.deactivate(), this.leftTrail.geometry && this.leftTrail.geometry.dispose(), this.rightTrail.geometry && this.rightTrail.geometry.dispose(), this.leftTrail.material && this.leftTrail.material.dispose(), this.rightTrail.material && this.rightTrail.material.dispose(), this.scene.remove(this.leftTarget), this.scene.remove(this.rightTarget);
  }
}
class je {
  constructor(e, t = 0) {
    this.scene = e, this.team = t, this.active = !1, this.trailLength = 80, this.trailWidth = 15, this.arenaBounds = {
      floor: 0,
      ceiling: 2044,
      // ~20.44 meters in UU
      wallX: 4096,
      // Side walls
      wallZ: 5120
      // Back walls (goal ends)
    }, this.groundedThreshold = 50, this.segments = [], this.currentSegment = null, this.wasGrounded = !0;
  }
  setTeam(e) {
    this.team !== e && (this.team = e, this.currentSegment && !this.currentSegment.dying && (this.currentSegment.team = e, this.currentSegment.updateColors()));
  }
  setActive(e) {
    e && !this.active ? (this.currentSegment = null, this.wasGrounded = !0) : !e && this.active && this.currentSegment && (this.currentSegment.startDying(), this.currentSegment = null), this.active = e;
  }
  isGrounded(e) {
    const t = this.groundedThreshold, s = this.arenaBounds;
    if (e.y < t)
      return { grounded: !0, surface: "floor", normal: new l.Vector3(0, 1, 0) };
    if (e.y > s.ceiling - t)
      return { grounded: !0, surface: "ceiling", normal: new l.Vector3(0, -1, 0) };
    if (Math.abs(e.x) > s.wallX - t) {
      const i = e.x > 0 ? -1 : 1;
      return { grounded: !0, surface: "wall", normal: new l.Vector3(i, 0, 0) };
    }
    if (Math.abs(e.z) > s.wallZ - t) {
      const i = e.z > 0 ? -1 : 1;
      return { grounded: !0, surface: "wall", normal: new l.Vector3(0, 0, i) };
    }
    return { grounded: !1, surface: null, normal: null };
  }
  emit(e, t, s) {
    if (!this.active) return;
    const i = this.isGrounded(e);
    if (!i.grounded) {
      this.currentSegment && !this.currentSegment.dying && (this.currentSegment.startDying(), this.currentSegment = null), this.wasGrounded = !1;
      return;
    }
    (!this.wasGrounded || !this.currentSegment) && (this.currentSegment && !this.currentSegment.dying && this.currentSegment.startDying(), this.currentSegment = new Ke(
      this.scene,
      this.team,
      this.trailWidth,
      this.trailLength
    ), this.segments.push(this.currentSegment)), this.wasGrounded = !0;
    const a = new l.Vector3(-30, 5, 40), n = new l.Vector3(-30, 5, -40);
    a.applyQuaternion(t), n.applyQuaternion(t);
    const c = e.clone().add(a), r = e.clone().add(n), h = 2;
    if (i.surface === "floor")
      c.y = h, r.y = h;
    else if (i.surface === "ceiling")
      c.y = this.arenaBounds.ceiling - h, r.y = this.arenaBounds.ceiling - h;
    else if (i.surface === "wall") {
      if (i.normal.x !== 0) {
        const d = i.normal.x > 0 ? -this.arenaBounds.wallX + h : this.arenaBounds.wallX - h;
        c.x = d, r.x = d;
      } else if (i.normal.z !== 0) {
        const d = i.normal.z > 0 ? -this.arenaBounds.wallZ + h : this.arenaBounds.wallZ - h;
        c.z = d, r.z = d;
      }
    }
    this.currentSegment.updatePosition(c, r, t);
  }
  update(e) {
    for (let t = this.segments.length - 1; t >= 0; t--) {
      const s = this.segments[t];
      s.update(e), s.active || (s.dispose(), this.segments.splice(t, 1));
    }
  }
  addToScene(e) {
  }
  removeFromScene(e) {
    for (const t of this.segments)
      t.startDying();
    this.currentSegment = null;
  }
  dispose() {
    for (const e of this.segments)
      e.dispose();
    this.segments = [], this.currentSegment = null;
  }
}
class Xe {
  constructor(e) {
    this.scene = e, this.renderer = null, this.camera = null, this.explosions = {
      active: []
    }, this.boostTrails = /* @__PURE__ */ new Map(), this.supersonicTrails = /* @__PURE__ */ new Map(), this.ballTrail = null, Oe();
  }
  /**
   * Set renderer and camera references for explosion pools
   * Should be called from GameEngine after initialization
   */
  setRenderContext(e, t) {
    this.renderer = e, this.camera = t, ke(this.scene, e, t);
  }
  reset() {
    this.explosions.active.forEach((e) => e.removeFromScene(this.scene)), this.explosions.active = [], this.boostTrails.forEach((e) => {
      e.removeFromScene(this.scene), e.dispose();
    }), this.boostTrails.clear(), this.supersonicTrails.forEach((e) => {
      e.removeFromScene(this.scene), e.dispose();
    }), this.supersonicTrails.clear(), this.ballTrail && (this.ballTrail.removeFromScene(this.scene), this.ballTrail.dispose(), this.ballTrail = null);
  }
  clearEvents() {
    this.explosions.goalEvents.clear(), this.explosions.demoEvents.clear();
  }
  /**
   * Reset ball trail (call when seeking to avoid stale segments)
   */
  resetBallTrail() {
    this.ballTrail && this.ballTrail.reset();
  }
  createBoostTrail(e, t) {
    if (this.boostTrails.has(t)) {
      const i = this.boostTrails.get(t);
      i.removeFromScene(this.scene), i.dispose();
    }
    const s = new $e(e);
    return s.addToScene(this.scene), this.boostTrails.set(t, s), s;
  }
  removeBoostTrail(e) {
    const t = this.boostTrails.get(e);
    t && (t.removeFromScene(this.scene), t.dispose(), this.boostTrails.delete(e));
  }
  updateBoostTrail(e, t, s, i, o) {
    const a = this.boostTrails.get(e);
    a && (a.setActive(t), t && a.emit(s, i, o, this._playbackSpeed || 1));
  }
  createSupersonicTrail(e, t) {
    if (this.supersonicTrails.has(e)) {
      const i = this.supersonicTrails.get(e);
      i.removeFromScene(this.scene), i.dispose();
    }
    const s = new je(this.scene, t);
    return s.addToScene(this.scene), this.supersonicTrails.set(e, s), s;
  }
  removeSupersonicTrail(e) {
    const t = this.supersonicTrails.get(e);
    t && (t.removeFromScene(this.scene), t.dispose(), this.supersonicTrails.delete(e));
  }
  updateSupersonicTrail(e, t, s, i, o, a) {
    let n = this.supersonicTrails.get(e);
    !n && t && (n = this.createSupersonicTrail(e, a)), n && (a !== void 0 && n.team !== a && n.setTeam(a), n.setActive(t), t && n.emit(s, i, o));
  }
  createBallTrail() {
    return this.ballTrail && (this.ballTrail.removeFromScene(this.scene), this.ballTrail.dispose()), this.ballTrail = new Le(this.scene, 0), this.ballTrail.addToScene(this.scene), console.log("✓ Spiral ball trail created and added to scene"), this.ballTrail;
  }
  /**
   * Update ball trail with position and velocity
   * @param {THREE.Vector3} position - Ball position
   * @param {THREE.Vector3} velocity - Ball velocity
   * @param {number} team - Team (0 = blue, 1 = orange)
   */
  updateBallTrail(e, t, s) {
    this.ballTrail || this.createBallTrail(), s !== void 0 && this.ballTrail.team !== s && this.ballTrail.setTeam(s);
    const i = 1 / 60 * (this._playbackSpeed || 1);
    this.ballTrail.emit(e, t, i);
  }
  triggerGoalExplosion(e, t) {
    const s = ee(this.scene, this.renderer, this.camera);
    s && (this.camera && (s.camera = this.camera), s.trigger(e, t));
  }
  /**
   * Trigger a demolition explosion with car orientation
   * @param {THREE.Vector3} position - Explosion position
   * @param {THREE.Quaternion} rotation - Car rotation (optional, defaults to identity)
   * @param {number} team - Team (0 = blue, 1 = orange)
   */
  triggerDemoExplosion(e, t, s) {
    typeof t == "number" && (t = new l.Quaternion());
    const i = J(this.scene);
    i && i.trigger(e);
  }
  update(e, t = !0, s = 1) {
    this._playbackSpeed = s;
    const i = e * s;
    D && D.update(i), _ && _.update(i);
    for (let o = this.explosions.active.length - 1; o >= 0; o--) {
      const a = this.explosions.active[o];
      a.update(i) && (a.removeFromScene(this.scene), this.explosions.active.splice(o, 1));
    }
    t && (this.boostTrails.forEach((o) => {
      o.update(i);
    }), this.supersonicTrails.forEach((o) => {
      o.update(i);
    }), this.ballTrail && this.ballTrail.update(i));
  }
}
const $ = {
  Octane: 65535,
  // Cyan
  Dominus: 16746496,
  // Orange
  Plank: 8978176,
  // Lime green
  Breakout: 16711816,
  // Pink
  Hybrid: 8913151,
  // Purple
  Merc: 16776960
  // Yellow
};
class Ue {
  /**
   * @param {THREE.Scene} scene - The scene to add hitboxes to
   */
  constructor(e) {
    this.scene = e, this.hitboxes = /* @__PURE__ */ new Map(), this.enabled = !1;
  }
  /**
   * Enable or disable hitbox display
   * @param {boolean} enabled
   */
  setEnabled(e) {
    this.enabled = e, this.hitboxes.forEach(({ mesh: t }) => {
      t.visible = e;
    });
  }
  /**
   * Create a wireframe hitbox mesh for a specific hitbox type
   * @param {string} hitboxType - One of: Octane, Dominus, Plank, Breakout, Hybrid, Merc
   * @returns {THREE.Group} - Group containing wireframe box and center pivot sphere
   */
  createHitboxWireframe(e) {
    const t = k[e] || k.Octane, s = $[e] || $.Octane, i = t.length, o = t.width, a = t.height, n = t.offsetX, c = t.offsetZ;
    console.log(`[HitboxManager] Creating hitbox for ${e}:`, {
      dims: t,
      length: i,
      width: o,
      height: a,
      offsetX: n,
      offsetY: c
    });
    const r = new l.Group(), h = new l.BoxGeometry(i, a, o), d = new l.EdgesGeometry(h), u = new l.LineBasicMaterial({
      color: s,
      linewidth: 2,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1
    }), m = new l.LineSegments(d, u);
    m.frustumCulled = !1, m.position.set(n, c, 0), r.add(m);
    const f = 3.33, g = new l.SphereGeometry(f, 8, 6), y = new l.WireframeGeometry(g), x = new l.LineBasicMaterial({
      color: 16777215,
      // White for visibility
      linewidth: 1,
      transparent: !0,
      opacity: 0.9,
      depthTest: !1
    }), w = new l.LineSegments(y, x);
    return w.frustumCulled = !1, r.add(w), r.userData.hitboxType = e, r.frustumCulled = !1, r;
  }
  /**
   * Add or update a hitbox for a car
   * @param {string} carActorId - The car's actor ID
   * @param {string} hitboxType - The hitbox type
   */
  addHitbox(e, t) {
    if (this.hitboxes.has(e)) {
      const i = this.hitboxes.get(e);
      if (i.hitboxType === t)
        return;
      this.scene.remove(i.mesh), i.mesh.geometry.dispose(), i.mesh.material.dispose();
    }
    const s = this.createHitboxWireframe(t);
    s.visible = this.enabled, this.scene.add(s), this.hitboxes.set(e, { mesh: s, hitboxType: t });
  }
  /**
   * Remove a hitbox for a car
   * @param {string} carActorId - The car's actor ID
   */
  removeHitbox(e) {
    if (this.hitboxes.has(e)) {
      const { mesh: t } = this.hitboxes.get(e);
      this.scene.remove(t), t.traverse((s) => {
        s.geometry && s.geometry.dispose(), s.material && s.material.dispose();
      }), this.hitboxes.delete(e);
    }
  }
  /**
   * Update hitbox positions and rotations to match car transforms
   * @param {Object} actors - Map of actor ID to actor mesh
   * @param {Object} playerNameToCarActorId - Map of player name to car actor ID
   * @param {Function} getHitboxType - Function that returns hitbox type for a player name
   */
  updateHitboxes(e, t, s) {
    if (!this.enabled) return;
    for (const [o, a] of Object.entries(t)) {
      const n = e[a];
      if (!n || !n.userData.isCar) continue;
      const c = s ? s(o) : "Octane";
      this.hitboxes.has(a) || this.addHitbox(a, c);
      const { mesh: r } = this.hitboxes.get(a);
      r.position.copy(n.position), r.quaternion.copy(n.quaternion), r.visible = this.enabled && n.visible;
    }
    const i = new Set(Object.values(t));
    for (const o of this.hitboxes.keys())
      i.has(o) || this.removeHitbox(o);
  }
  /**
   * Reset all hitboxes
   */
  reset() {
    this.hitboxes.forEach(({ mesh: e }) => {
      this.scene.remove(e), e.traverse((t) => {
        t.geometry && t.geometry.dispose(), t.material && t.material.dispose();
      });
    }), this.hitboxes.clear();
  }
  /**
   * Dispose of all resources
   */
  dispose() {
    this.reset();
  }
}
const qe = new Proxy({}, { get: () => () => {
} });
function K(p) {
  if (!p) return null;
  const e = {};
  for (const t of Object.keys(p)) {
    const s = p[t];
    typeof s == "number" && Number.isFinite(s) && (e[t] = s);
  }
  return e;
}
const Qe = {
  overhead: { position: [0, 18800, 0], target: [0, 700, 0], up: [-1, 0, 0] },
  side: { position: [-9600, 6400, -12600], target: [0, 900, 0], up: [0, 1, 0] }
};
function Ye(p) {
  const e = new l.Group();
  return e.name = "replayRoot", e.matrixAutoUpdate = !1, e.matrix.set(
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1
  ), p.add(e), e;
}
class Ze extends EventTarget {
  container;
  /** The subtr-actor adapter — the sole data source (timelines + live entities). */
  adapter;
  /**
   * @rlrml/player's normalized `ReplayModel` over the same raw WASM output the
   * adapter consumes (docs/PLAYER_PARITY.md Phase 2) — the data surface
   * @rlrml/player consumers read. Shares the adapter's time axis (t=0 at the
   * first frame) and player-id format. Null when constructed directly with an
   * adapter only; `createViewer()` always provides it.
   */
  replay;
  options;
  sceneManager;
  arenaManager;
  actorManager;
  effectsManager;
  hitboxManager;
  controls;
  /**
   * UE-coordinate mount point: children positioned in raw Unreal coords (RL
   * Z-up, UU) render correctly here — same convention as @rlrml/player's
   * `replayRoot`, see createReplayRoot. The portable seam for 3D overlays.
   */
  replayRoot;
  /**
   * @rlrml/player's `ReplayScene` surface (docs/PLAYER_PARITY.md Phase 3+):
   * what `ReplayPlayer.sceneState`-reading consumers (js/stat-evaluation-player
   * stat modules) use to mount THREE overlays. `scene`/`camera`/`renderer`/
   * `controls`/`replayRoot`/`resize` are real; `ballMesh`/`playerMeshes` are
   * live views onto this renderer's actors; the player-renderer internals
   * (body meshes, hitboxes, boost trails/meters, demo indicators) are empty
   * maps — they have no counterpart here.
   */
  sceneState;
  effectsEnabled;
  /** Resolves when async assets (arena meshes, ball model) are in the scene. */
  ready;
  plugins = [];
  beforeRenderCallbacks = [];
  resizeObserver = null;
  animationFrameId = null;
  disposed = !1;
  playing = !1;
  speed;
  loop;
  currentTime = 0;
  lastTickAt = null;
  // ── @rlrml/player-parity state (docs/PLAYER_PARITY.md). Camera fields are
  //    delegated to an installed camera plugin (id "camera") when present; the
  //    display toggles are tracked-but-inert until their rendering lands.
  cameraDistanceScaleValue;
  customCameraSettingsValue;
  cameraViewModeValue;
  attachedPlayerIdValue;
  /** null = never set: follow the camera plugin's recorded-state behavior. */
  ballCamEnabledValue;
  boostMeterEnabledValue;
  boostPickupAnimationEnabledValue;
  hitboxWireframesEnabledValue;
  hitboxOnlyModeEnabledValue;
  /** Lazily built player-name → hitbox-family map (roster is static). */
  hitboxTypeByName = null;
  /** True while hitbox wireframes are showing (cheap per-frame early-out). */
  hitboxesActive = !1;
  skipPostGoalTransitionsEnabledValue;
  skipKickoffsEnabledValue;
  /** True once view-mode/attachment was set through the parity surface. */
  attachmentTouched = !1;
  // ── Timeline projection / skip windows (require a ReplayModel) ──────────────
  liveGameState = null;
  kickoffGameState = null;
  timelineSegmentsCacheKey = null;
  timelineSegmentsCache = [];
  constructor(e, t, s = {}, i = null) {
    super(), this.container = e, this.adapter = t, this.replay = i, this.options = s, i && (this.liveGameState = oe(i), this.kickoffGameState = ae(i, this.liveGameState)), this.speed = Math.max(0.1, s.initialPlaybackRate ?? s.speed ?? 1), this.loop = s.loop ?? !1, this.cameraDistanceScaleValue = Math.max(0.25, s.initialCameraDistanceScale ?? 1), this.customCameraSettingsValue = K(
      s.initialCustomCameraSettings
    ), this.attachedPlayerIdValue = s.initialAttachedPlayerId ?? null, this.cameraViewModeValue = s.initialCameraViewMode ?? (this.attachedPlayerIdValue ? "follow" : "free"), this.ballCamEnabledValue = s.initialBallCamEnabled ?? null, this.boostMeterEnabledValue = s.initialBoostMeterEnabled ?? !1, this.boostPickupAnimationEnabledValue = s.initialBoostPickupAnimationEnabled ?? !0, this.hitboxWireframesEnabledValue = s.initialHitboxWireframesEnabled ?? !1, this.hitboxOnlyModeEnabledValue = s.initialHitboxOnlyModeEnabled ?? !1, this.skipPostGoalTransitionsEnabledValue = s.initialSkipPostGoalTransitionsEnabled ?? !0, this.skipKickoffsEnabledValue = s.initialSkipKickoffsEnabled ?? !1, this.sceneManager = new Be(e), this.sceneManager.initDefaultEnvironment(), this.arenaManager = new Ae(this.scene), this.effectsEnabled = s.effects ?? !0, this.effectsManager = this.effectsEnabled ? new Xe(this.scene) : qe, this.actorManager = new Fe(this.scene, this.effectsManager), s.motionInterpolation && this.setMotionInterpolation(s.motionInterpolation), this.actorManager.initFromFramework(t), this.actorManager.initInterpolants(t.getTimelines()), this.hitboxManager = new Ue(this.scene), this.controls = new ge(this.camera, this.renderer.domElement), this.controls.zoomSpeed = 2.5, this.camera.position.set(0, 4e3, 6e3), this.controls.target.set(0, 200, 0), this.controls.update(), this.replayRoot = Ye(this.scene), this.sceneState = this.createSceneState(), this.ready = Promise.all([
      this.arenaManager.loadArenaMeshes().catch((o) => {
        console.warn("[viewer] arena load failed", o);
      }),
      this.actorManager.waitForBallModel().catch(() => !1)
    ]).then(() => {
    }), this.installResizeHandling();
    for (const o of s.plugins ?? [])
      this.installPlugin(o, !1);
    this.applyInitialCameraOptions(), this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded(), this.scheduleAnimationFrame(), this.emitChange(), s.autoplay && this.play();
  }
  get scene() {
    return this.sceneManager.scene;
  }
  get camera() {
    return this.sceneManager.camera;
  }
  get renderer() {
    return this.sceneManager.renderer;
  }
  get duration() {
    return this.adapter.duration;
  }
  // ── Playback control ────────────────────────────────────────────────────────
  play() {
    this.playing || (this.setPlayingInternal(!0), this.emitChange());
  }
  pause() {
    this.playing && (this.setPlayingInternal(!1), this.emitChange());
  }
  togglePlayback() {
    this.playing ? this.pause() : this.play();
  }
  seek(e) {
    this.seekInternal(e), this.playing && (this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded()), this.emitChange();
  }
  setPlaybackRate(e) {
    this.speed = Math.max(0.1, e), this.emitChange();
  }
  setLoop(e) {
    this.loop = e;
  }
  /**
   * Switch position interpolation between replay samples (see
   * ViewerOptions.motionInterpolation). Takes effect on the next rendered
   * frame — handy for A/B-ing smoothness live.
   */
  setMotionInterpolation(e) {
    this.actorManager.interpolationMethod = e === "linear" ? "lerp" : "hermite";
  }
  // ── Frame stepping (@rlrml/player parity, off the adapter's frame timeline) ──
  setFrameIndex(e) {
    const t = this.adapter.frameTimes;
    if (t.length === 0 || !Number.isFinite(e)) return;
    const s = Math.min(Math.max(Math.trunc(e), 0), t.length - 1);
    this.playing && this.setPlayingInternal(!1), this.seekInternal(t[s]), this.emitChange();
  }
  stepFrames(e) {
    Number.isFinite(e) && this.setFrameIndex(this.adapter.frameIndexAt(this.currentTime) + Math.trunc(e));
  }
  stepForwardFrame() {
    this.stepFrames(1);
  }
  stepBackwardFrame() {
    this.stepFrames(-1);
  }
  // ── Camera controls (@rlrml/player parity) ──────────────────────────────────
  // All delegate to an installed camera plugin (id "camera") when present —
  // state is tracked either way, so a plugin added later picks it up.
  setCameraDistanceScale(e) {
    this.cameraDistanceScaleValue = Math.max(0.25, e), this.getCameraPlugin()?.setDistanceScale(this.cameraDistanceScaleValue), this.emitChange();
  }
  setCustomCameraSettings(e) {
    this.applyCustomCameraSettings(e), this.emitChange();
  }
  setAttachedPlayer(e) {
    this.attachedPlayerIdValue = e, this.cameraViewModeValue = e ? "follow" : "free", this.attachmentTouched = !0, this.syncCameraAttachment(), this.emitChange();
  }
  setCameraViewMode(e) {
    this.cameraViewModeValue = e, this.attachmentTouched = !0, this.syncCameraAttachment(), this.emitChange();
  }
  setFreeCameraPreset(e) {
    this.cameraViewModeValue = "free", this.attachmentTouched = !0, this.syncCameraAttachment();
    const t = Qe[e];
    this.camera.up.set(...t.up), this.camera.position.set(...t.position), this.controls.target.set(...t.target), this.controls.update(), this.emitChange();
  }
  setBallCamEnabled(e) {
    this.ballCamEnabledValue = e, this.getCameraPlugin()?.setBallCam(e), this.emitChange();
  }
  // ── Display toggles (@rlrml/player parity). Hitbox toggles drive
  //    HitboxManager (see updateHitboxVisualization); the pickup-animation
  //    toggle is read by the bridged plugin; the boost meter is still inert. ──
  setBoostMeterEnabled(e) {
    this.boostMeterEnabledValue = e, this.emitChange();
  }
  setBoostPickupAnimationEnabled(e) {
    this.boostPickupAnimationEnabledValue = e, this.emitChange();
  }
  setHitboxWireframesEnabled(e) {
    this.hitboxWireframesEnabledValue = e, this.emitChange();
  }
  setHitboxOnlyModeEnabled(e) {
    this.hitboxOnlyModeEnabledValue = e, this.emitChange();
  }
  // ── Skip windows (@rlrml/player parity; live when a ReplayModel is present) ──
  setSkipPostGoalTransitionsEnabled(e) {
    this.skipPostGoalTransitionsEnabledValue = e, e && this.playing && this.skipPostGoalTransitionIfNeeded(), this.emitChange();
  }
  setSkipKickoffsEnabled(e) {
    this.skipKickoffsEnabledValue = e, e && this.playing && (this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded()), this.emitChange();
  }
  // ── State surface (@rlrml/player parity) ────────────────────────────────────
  setState(e) {
    e.speed !== void 0 && (this.speed = Math.max(0.1, e.speed)), e.cameraDistanceScale !== void 0 && (this.cameraDistanceScaleValue = Math.max(0.25, e.cameraDistanceScale), this.getCameraPlugin()?.setDistanceScale(this.cameraDistanceScaleValue)), e.customCameraSettings !== void 0 && this.applyCustomCameraSettings(e.customCameraSettings), e.cameraViewMode !== void 0 && (this.cameraViewModeValue = e.cameraViewMode, this.attachmentTouched = !0), e.attachedPlayerId !== void 0 && (this.attachedPlayerIdValue = e.attachedPlayerId, this.attachmentTouched = !0, e.cameraViewMode === void 0 && (this.cameraViewModeValue = e.attachedPlayerId ? "follow" : "free")), (e.cameraViewMode !== void 0 || e.attachedPlayerId !== void 0) && this.syncCameraAttachment(), e.ballCamEnabled !== void 0 && (this.ballCamEnabledValue = e.ballCamEnabled, this.getCameraPlugin()?.setBallCam(e.ballCamEnabled)), e.boostMeterEnabled !== void 0 && (this.boostMeterEnabledValue = e.boostMeterEnabled), e.boostPickupAnimationEnabled !== void 0 && (this.boostPickupAnimationEnabledValue = e.boostPickupAnimationEnabled), e.hitboxWireframesEnabled !== void 0 && (this.hitboxWireframesEnabledValue = e.hitboxWireframesEnabled), e.hitboxOnlyModeEnabled !== void 0 && (this.hitboxOnlyModeEnabledValue = e.hitboxOnlyModeEnabled), e.skipPostGoalTransitionsEnabled !== void 0 && (this.skipPostGoalTransitionsEnabledValue = e.skipPostGoalTransitionsEnabled), e.skipKickoffsEnabled !== void 0 && (this.skipKickoffsEnabledValue = e.skipKickoffsEnabled), e.currentTime !== void 0 && this.seekInternal(e.currentTime), e.playing !== void 0 && e.playing !== this.playing && this.setPlayingInternal(e.playing), this.playing && (e.currentTime !== void 0 || e.playing !== void 0) && (this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded()), this.emitChange();
  }
  getState() {
    const e = this.adapter.frameIndexAt(this.currentTime), t = this.getCameraPlugin();
    let s = this.cameraViewModeValue, i = this.attachedPlayerIdValue;
    if (t)
      if (t.getMode() === "follow") {
        s = "follow";
        const o = t.getTarget();
        i = (o ? this.adapter.playerList.find((n) => n.name === o) : void 0)?.id ?? i;
      } else
        s = "free", i = null;
    return {
      currentTime: this.currentTime,
      duration: this.duration,
      frameIndex: e,
      // Kickoff countdowns, like @rlrml/player. The adapter's frame timeline is
      // the ReplayModel's (same metadata frames, same time axis), so its index
      // is valid against the model.
      activeMetadata: this.replay ? ne(this.replay, e, this.currentTime) : null,
      playing: this.playing,
      speed: this.speed,
      cameraDistanceScale: this.cameraDistanceScaleValue,
      customCameraSettings: this.customCameraSettingsValue,
      cameraViewMode: s,
      attachedPlayerId: i,
      ballCamEnabled: t ? t.getBallCam() : this.ballCamEnabledValue ?? !1,
      boostMeterEnabled: this.boostMeterEnabledValue,
      boostPickupAnimationEnabled: this.boostPickupAnimationEnabledValue,
      hitboxWireframesEnabled: this.hitboxWireframesEnabledValue,
      hitboxOnlyModeEnabled: this.hitboxOnlyModeEnabledValue,
      skipPostGoalTransitionsEnabled: this.skipPostGoalTransitionsEnabledValue,
      skipKickoffsEnabled: this.skipKickoffsEnabledValue
    };
  }
  getSnapshot() {
    return this.getState();
  }
  // ── Timeline projection (@rlrml/player parity) ──────────────────────────────
  // Maps replay time onto the skip-aware timeline (and back). Without a
  // ReplayModel there are no segments, so every projection is the identity.
  getTimelineDuration() {
    return this.replay?.duration ?? this.duration;
  }
  getTimelineCurrentTime() {
    return this.projectReplayTimeToTimeline(this.currentTime).timelineTime;
  }
  getTimelineSegments() {
    if (!this.replay) return [];
    const e = `${this.skipPostGoalTransitionsEnabledValue}:${this.skipKickoffsEnabledValue}`;
    return this.timelineSegmentsCacheKey === e ? this.timelineSegmentsCache : (this.timelineSegmentsCacheKey = e, this.timelineSegmentsCache = re(
      this.replay,
      this.skipPostGoalTransitionsEnabledValue,
      this.skipKickoffsEnabledValue,
      this.liveGameState,
      this.kickoffGameState
    ), this.timelineSegmentsCache);
  }
  projectReplayTimeToTimeline(e) {
    return le(
      this.replay?.duration ?? this.duration,
      this.getTimelineSegments(),
      e
    );
  }
  projectTimelineTimeToReplay(e) {
    return ce(
      this.replay?.duration ?? this.duration,
      this.getTimelineDuration(),
      this.getTimelineSegments(),
      e
    );
  }
  subscribe(e) {
    const t = (s) => {
      e(s.detail);
    };
    return this.addEventListener("change", t), e(this.getState()), () => {
      this.removeEventListener("change", t);
    };
  }
  /** Per-render frame-timing callback (@rlrml/player parity). Returns a remover. */
  onBeforeRender(e) {
    return this.beforeRenderCallbacks.push(e), () => {
      const t = this.beforeRenderCallbacks.indexOf(e);
      t >= 0 && this.beforeRenderCallbacks.splice(t, 1);
    };
  }
  // ── Plugin host (mirrors @rlrml/player) ────────────────────────────────────
  addPlugin(e) {
    return this.installPlugin(e, !0);
  }
  removePlugin(e) {
    const t = this.plugins.findIndex((i) => i.plugin.id === e);
    if (t < 0) return !1;
    const [s] = this.plugins.splice(t, 1);
    return s.plugin.teardown?.(this.createPluginContext()), !0;
  }
  getPlugins() {
    return this.plugins.map((e) => e.plugin);
  }
  destroy() {
    if (!this.disposed) {
      for (this.disposed = !0, this.playing = !1, this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.resizeObserver?.disconnect(), this.resizeObserver = null, this.beforeRenderCallbacks.length = 0; this.plugins.length > 0; )
        this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());
      this.controls.dispose(), this.effectsEnabled && this.effectsManager.reset(), this.hitboxManager.dispose(), this.actorManager.reset(), this.sceneManager.dispose();
    }
  }
  dispose() {
    this.destroy();
  }
  // ── Internals ───────────────────────────────────────────────────────────────
  setPlayingInternal(e) {
    this.playing = e, this.lastTickAt = null, e ? this.actorManager.resumeAnimations() : this.actorManager.pauseAnimations();
  }
  seekInternal(e) {
    this.currentTime = l.MathUtils.clamp(e, 0, this.duration), this.actorManager.seekAnimations(this.currentTime), this.effectsManager.resetBallTrail(), this.actorManager.resetWheelTracking();
  }
  /** Where playback stops: the last segment's start if skips run to the end. */
  getPlaybackEndTime() {
    return this.replay ? he(this.replay.duration, this.getTimelineSegments()) : this.duration;
  }
  /**
   * Jump past a kickoff countdown when skip-kickoffs is on (@rlrml/player
   * semantics). A skip is a jump, so it routes through seekInternal — that
   * resets the delta-based trackers (ball trail, wheel spin) which must not
   * see it. Returns true when a skip happened.
   */
  skipPastKickoffIfNeeded() {
    if (!this.replay || !this.skipKickoffsEnabledValue) return !1;
    const e = de(
      this.replay,
      this.currentTime,
      this.liveGameState,
      this.kickoffGameState
    );
    return e === null ? !1 : (this.seekInternal(e), !0);
  }
  /** Same as skipPastKickoffIfNeeded, for post-goal replay/celebration windows. */
  skipPostGoalTransitionIfNeeded() {
    if (!this.replay || !this.skipPostGoalTransitionsEnabledValue) return !1;
    const e = me(
      this.replay,
      this.currentTime,
      this.liveGameState,
      this.kickoffGameState
    );
    return e === null ? !1 : (this.seekInternal(e), !0);
  }
  /** The installed camera plugin, when one is present (duck-typed by id). */
  getCameraPlugin() {
    const e = this.plugins.find((t) => t.plugin.id === "camera")?.plugin;
    return e && typeof e.follow == "function" ? e : null;
  }
  playerNameForId(e) {
    return this.adapter.playerList.find((t) => t.id === e)?.name ?? null;
  }
  /** Push the parity view-mode/attachment onto the camera plugin. */
  syncCameraAttachment() {
    const e = this.getCameraPlugin();
    if (e) {
      if (this.cameraViewModeValue === "follow" && this.attachedPlayerIdValue) {
        const t = this.playerNameForId(this.attachedPlayerIdValue);
        if (!t) {
          console.warn(`[viewer] no player with id ${JSON.stringify(this.attachedPlayerIdValue)}`);
          return;
        }
        this.camera.up.set(0, 1, 0), e.follow(t);
        return;
      }
      e.getMode() === "follow" && e.release();
    }
  }
  applyCustomCameraSettings(e) {
    this.customCameraSettingsValue = K(e);
    const t = this.getCameraPlugin();
    t && (t.setCameraSettings(null), this.customCameraSettingsValue && t.setCameraSettings(this.customCameraSettingsValue));
  }
  /** Push explicitly-set parity camera state onto an (newly) installed plugin. */
  pushCameraParityState() {
    const e = this.getCameraPlugin();
    e && (this.cameraDistanceScaleValue !== 1 && e.setDistanceScale(this.cameraDistanceScaleValue), this.customCameraSettingsValue && e.setCameraSettings(this.customCameraSettingsValue), this.ballCamEnabledValue !== null && e.setBallCam(this.ballCamEnabledValue), this.attachmentTouched && this.syncCameraAttachment());
  }
  applyInitialCameraOptions() {
    const e = this.options;
    (e.initialAttachedPlayerId !== void 0 || e.initialCameraViewMode !== void 0) && (this.attachmentTouched = !0), this.pushCameraParityState();
  }
  computeFrameRenderInfo() {
    const e = this.adapter.frameTimes, t = this.adapter.frameIndexAt(this.currentTime), s = Math.min(t + 1, Math.max(e.length - 1, 0)), i = e[t] ?? 0, o = e[s] ?? i, a = o > i ? l.MathUtils.clamp((this.currentTime - i) / (o - i), 0, 1) : 0;
    return { frameIndex: t, nextFrameIndex: s, alpha: a, currentTime: this.currentTime };
  }
  installResizeHandling() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => this.sceneManager.onWindowResize()), this.resizeObserver.observe(this.container));
  }
  scheduleAnimationFrame() {
    this.animationFrameId !== null || this.disposed || (this.animationFrameId = requestAnimationFrame(this.tick));
  }
  tick = (e) => {
    if (this.animationFrameId = null, this.disposed) return;
    let t = !1, s = 0;
    if (this.playing) {
      s = this.lastTickAt === null ? 0 : Math.min(0.1, (e - this.lastTickAt) / 1e3), this.lastTickAt = e;
      let i = this.currentTime + s * this.speed;
      const o = this.getPlaybackEndTime();
      i >= o && (this.loop ? (i = 0, this.actorManager.seekAnimations(0), this.effectsManager.resetBallTrail(), this.actorManager.resetWheelTracking()) : (i = o, this.playing = !1)), t = i !== this.currentTime || !this.playing, this.currentTime = i, this.playing && (t = this.skipPostGoalTransitionIfNeeded() || t, t = this.skipPastKickoffIfNeeded() || t);
    }
    this.render(s), t && this.emitChange(), this.scheduleAnimationFrame();
  };
  render(e = 0) {
    if (this.adapter.seek(this.currentTime), this.playing && this.actorManager.updateAnimations(e * this.speed), this.actorManager.updateFromFramework(this.adapter, this.currentTime), this.updatePlayerStates(), this.updateHitboxVisualization(), this.effectsManager.update(e, this.playing, this.speed), this.playing && this.actorManager.updateWheelRotations(), this.controls.update(), this.beforeRenderCallbacks.length > 0) {
      const t = this.computeFrameRenderInfo();
      for (const s of [...this.beforeRenderCallbacks])
        s(t);
    }
    if (this.plugins.length > 0) {
      const t = this.createRenderContext();
      for (const s of this.plugins)
        s.plugin.beforeRender?.(t);
    }
    this.renderer.render(this.scene, this.camera);
  }
  /**
   * Per-player boost / supersonic effect state, ported from the original
   * GameEngine.updateScene(): only update particle emission while playing (so
   * paused frames don't emit at frozen positions), and pass isKickoffReset so
   * the kickoff boost-reset doesn't fire particles. ActorManager resolves the
   * car mesh and forwards to EffectsManager (the stub when `effects: false`).
   */
  updatePlayerStates() {
    if (!this.playing) return;
    const e = this.hitboxOnlyModeEnabledValue;
    for (const t of this.adapter.getAllPlayers())
      this.actorManager.updateBoostState(
        t.name,
        t.isBoosting && !e,
        t.isKickoffReset
      ), this.actorManager.updateSupersonicState(
        t.name,
        t.isSupersonic && !e,
        t.team
      );
  }
  /**
   * Drive HitboxManager from the parity display toggles each frame, after
   * ActorManager has applied entity transforms/visibility:
   *
   * - `hitboxWireframesEnabled` — per-car wireframe boxes (color-coded by
   *   family) tracking the live car meshes.
   * - `hitboxOnlyModeEnabled` — wireframes shown AND car bodies hidden
   *   (@rlrml/player semantics). ActorManager re-applies entity visibility on
   *   every updateFromFramework, so simply not hiding next frame recovers.
   */
  updateHitboxVisualization() {
    const e = this.hitboxWireframesEnabledValue || this.hitboxOnlyModeEnabledValue;
    if (!e && !this.hitboxesActive || (this.hitboxesActive = e, this.hitboxManager.setEnabled(e), !e)) return;
    const t = this.actorManager;
    if (this.hitboxTypeByName || (this.hitboxTypeByName = new Map(
      this.adapter.getAllPlayers().map((s) => [s.name, s.hitboxType])
    )), this.hitboxManager.updateHitboxes(
      t.actors,
      t.playerNameToCarActorId,
      (s) => this.hitboxTypeByName?.get(s) ?? "Octane"
    ), this.hitboxOnlyModeEnabledValue)
      for (const s of Object.values(t.playerNameToCarActorId)) {
        const i = s === void 0 ? void 0 : t.actors[s];
        i && (i.visible = !1);
      }
  }
  installPlugin(e, t) {
    const s = typeof e == "function" ? e() : e;
    if (this.plugins.some((o) => o.plugin.id === s.id))
      throw new Error(`Viewer plugin "${s.id}" is already installed`);
    const i = { definition: e, plugin: s };
    return this.plugins.push(i), s.setup?.(this.createPluginContext()), s.id === "camera" && this.pushCameraParityState(), s.onStateChange?.(this.createPluginStateContext(this.getState())), t && this.render(), () => {
      const o = this.plugins.indexOf(i);
      o < 0 || (this.plugins.splice(o, 1), s.teardown?.(this.createPluginContext()));
    };
  }
  /**
   * Build the `ReplayScene`-shaped sceneState. `ballMesh`/`playerMeshes` are
   * getters so they track the live actors (GLB model swaps replace the
   * Object3Ds; a snapshot would go stale).
   */
  createSceneState() {
    const e = this.actorManager, t = this, s = new l.Mesh();
    return {
      get scene() {
        return t.scene;
      },
      replayRoot: this.replayRoot,
      get camera() {
        return t.camera;
      },
      get renderer() {
        return t.renderer;
      },
      controls: this.controls,
      resize: () => this.sceneManager.onWindowResize(),
      // Parity with ReplayPlayer.destroy() → sceneState.dispose(); consumers
      // should normally call viewer.destroy() instead.
      dispose: () => this.destroy(),
      get ballMesh() {
        return (e.ballActorId != null ? e.actors[e.ballActorId] : null) ?? s;
      },
      // Car Object3Ds keyed by stable player id, rebuilt per access.
      get playerMeshes() {
        const i = /* @__PURE__ */ new Map();
        for (const o of t.adapter.playerList) {
          const a = e.playerNameToCarActorId[o.name], n = a != null ? e.actors[a] : void 0;
          n && i.set(o.id, n);
        }
        return i;
      },
      // Schematic-player internals with no counterpart in this renderer.
      playerBodyMeshes: /* @__PURE__ */ new Map(),
      playerHitboxes: /* @__PURE__ */ new Map(),
      playerBoostTrails: /* @__PURE__ */ new Map(),
      playerBoostMeters: /* @__PURE__ */ new Map(),
      playerDemoIndicators: /* @__PURE__ */ new Map(),
      updateWallVisibility: () => {
      }
    };
  }
  createPluginContext() {
    return {
      player: this,
      replay: this.replay,
      options: this.options,
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      container: this.container
    };
  }
  createPluginStateContext(e) {
    return { ...this.createPluginContext(), state: e };
  }
  createRenderContext() {
    const e = this.actorManager, t = this.adapter.ball, s = {
      position: t.position,
      rotation: t.rotation,
      velocity: t.velocity,
      visible: t.visible,
      object3d: e.ballActorId != null ? e.actors[e.ballActorId] ?? null : null
    }, i = this.adapter.getAllPlayers().map((o) => {
      const a = e.playerNameToCarActorId[o.name];
      return {
        id: o.id,
        name: o.name,
        team: o.team,
        carName: o.carName,
        hitboxType: o.hitboxType,
        position: o.position,
        rotation: o.rotation,
        velocity: o.velocity,
        boost: o.boost,
        isBoosting: o.isBoosting,
        visible: o.isVisible,
        object3d: a != null ? e.actors[a] ?? null : null
      };
    });
    return {
      ...this.createPluginContext(),
      ...this.computeFrameRenderInfo(),
      state: this.getState(),
      time: this.currentTime,
      ball: s,
      cars: i
    };
  }
  emitChange() {
    const e = this.getState(), t = this.createPluginStateContext(e);
    for (const s of this.plugins)
      s.plugin.onStateChange?.(t);
    this.dispatchEvent(new CustomEvent("change", { detail: e }));
  }
}
q.install({ THREE: l });
const Je = new l.Vector3(1, 0, 0);
class et {
  constructor(e, t) {
    this.camera = e, this.domElement = t, this.controls = new q(e, t), this.controls.dollyToCursor = !1, this.controls.infinityDolly = !1, this.controls.dollySpeed = 2.5, this.controls.smoothTime = 0.05, this.controls.draggingSmoothTime = 0.05, this.controls.minPolarAngle = 0.1, this.controls.maxPolarAngle = Math.PI / 2 - 0.1, this.controls.minDistance = 100, this.controls.maxDistance = 1e4, this.minHeight = 50, this.mode = "free", this.defaultFreecamPosition = new l.Vector3(0, 1e3, 5e3), this.defaultFreecamLookAt = new l.Vector3(0, 100, 0), this.onPointerLockStateChange = null, this.targetCar = null, this.targetBall = null, this.followDistance = 260, this.followHeight = 90, this.followAngle = -4, this.stiffness = 0.45, this.swivelSpeed = 4.3, this.currentBlend = 0, this.targetBlend = 0, this.transitionSpeed = 1.3, this.baseDuration = 0.5, this.lastIsBallCam = null, this.currentCamPos = null, this.currentLookTarget = null, this._tempQuatCarCam = new l.Quaternion(), this._tempQuatBallCam = new l.Quaternion(), this._tempMatrix = new l.Matrix4(), this.controls.enabled = !0, t.addEventListener("contextmenu", (s) => s.preventDefault()), this.isFollowingViewer = !1, this.followTargetPosition = new l.Vector3(), this.followTargetQuaternion = new l.Quaternion(), this.followPositionLerpFactor = 0.12, this.followRotationSlerpFactor = 0.1, this.hasFollowTarget = !1, this.isRightMouseDown = !1, this.lastMouseX = null, this.lastMouseY = null, this.savedCameraState = null, this.isInReplayMode = !1;
  }
  /**
   * Set camera mode
   * @param {'free' | 'ball' | 'ballOrbit' | 'car'} mode
   */
  setMode(e) {
    if (this.mode = e, e === "ballOrbit") {
      if (this.controls.enabled = !0, this.lastBallOrbitPos = null, this.ballOrbitScrollHandler || (this.ballOrbitScrollHandler = (t) => {
        if (this.mode === "ballOrbit" && !this.isFollowingViewer) {
          t.preventDefault();
          const s = Math.max(this.controls.distance * 0.2, 100);
          t.deltaY > 0 ? this.controls.dolly(-s, !0) : this.controls.dolly(s, !0);
        }
      }, this.domElement.addEventListener("wheel", this.ballOrbitScrollHandler, { passive: !1 })), this.targetBall) {
        const t = this.targetBall.position;
        this.camera.position.distanceTo(t), this.controls.setLookAt(
          this.camera.position.x,
          this.camera.position.y,
          this.camera.position.z,
          t.x,
          t.y,
          t.z,
          !1
        );
      }
      return;
    }
    if (e === "free") {
      if (this.controls.enabled = !1, !this.freeCamKeys) {
        this.freeCamKeys = {
          forward: !1,
          backward: !1,
          left: !1,
          right: !1,
          up: !1,
          down: !1
        }, this.freeCamSpeed = 2e3, this.freeCamRotation = { yaw: 0, pitch: 0 };
        const t = new l.Vector3();
        this.camera.getWorldDirection(t), this.freeCamRotation.yaw = Math.atan2(t.x, t.z), this.freeCamRotation.pitch = Math.asin(-t.y), this.onKeyDown = (s) => this.handleFreeCamKeyDown(s), this.onKeyUp = (s) => this.handleFreeCamKeyUp(s), this.onMouseMove = (s) => this.handleFreeCamMouseMove(s), this.onMouseDown = (s) => {
          s.button === 2 && this.mode === "free" && !this.isFollowingViewer && (this.isRightMouseDown = !0, this.domElement.requestPointerLock?.());
        }, this.onMouseUp = (s) => {
          s.button === 2 && (this.isRightMouseDown = !1, document.pointerLockElement === this.domElement && document.exitPointerLock?.());
        }, this.onPointerLockChange = () => {
          document.pointerLockElement !== this.domElement && (this.isRightMouseDown = !1);
        }, this.onMouseLeave = () => {
          document.pointerLockElement !== this.domElement && (this.isRightMouseDown = !1);
        }, this.onWindowBlur = () => {
          this.isRightMouseDown = !1, document.pointerLockElement === this.domElement && document.exitPointerLock?.(), this.freeCamKeys && (this.freeCamKeys.forward = !1, this.freeCamKeys.backward = !1, this.freeCamKeys.left = !1, this.freeCamKeys.right = !1, this.freeCamKeys.up = !1, this.freeCamKeys.down = !1);
        }, this.onVisibilityChange = () => {
          document.hidden && (this.isRightMouseDown = !1, document.pointerLockElement === this.domElement && document.exitPointerLock?.(), this.freeCamKeys && (this.freeCamKeys.forward = !1, this.freeCamKeys.backward = !1, this.freeCamKeys.left = !1, this.freeCamKeys.right = !1, this.freeCamKeys.up = !1, this.freeCamKeys.down = !1));
        }, document.addEventListener("keydown", this.onKeyDown), document.addEventListener("keyup", this.onKeyUp), document.addEventListener("mousemove", this.onMouseMove), this.domElement.addEventListener("mousedown", this.onMouseDown), document.addEventListener("mouseup", this.onMouseUp), document.addEventListener("pointerlockchange", this.onPointerLockChange), this.domElement.addEventListener("mouseleave", this.onMouseLeave), window.addEventListener("blur", this.onWindowBlur), document.addEventListener("visibilitychange", this.onVisibilityChange);
      }
      this.isRightMouseDown = !1;
    } else
      this.controls.enabled = !1, this.lastIsBallCam = null, this.currentBlend = 0, this.targetBlend = 0;
  }
  /**
   * Set target car mesh to follow
   */
  setTargetCar(e) {
    this.targetCar !== e && (this.currentBallCamAngle = null), this.targetCar = e;
  }
  /**
   * Set target ball mesh
   */
  setTargetBall(e) {
    this.targetBall = e;
  }
  /**
   * Handle keydown for free camera
   */
  handleFreeCamKeyDown(e) {
    if (this.mode !== "free" || this.isFollowingViewer) return;
    const t = e.target;
    if (!(t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable))
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          this.freeCamKeys.forward = !0;
          break;
        case "KeyS":
        case "ArrowDown":
          this.freeCamKeys.backward = !0;
          break;
        case "KeyA":
        case "ArrowLeft":
          this.freeCamKeys.left = !0;
          break;
        case "KeyD":
        case "ArrowRight":
          this.freeCamKeys.right = !0;
          break;
        case "Space":
          this.freeCamKeys.up = !0;
          break;
        case "ShiftLeft":
        case "ShiftRight":
          this.freeCamKeys.down = !0;
          break;
      }
  }
  /**
   * Handle keyup for free camera
   */
  handleFreeCamKeyUp(e) {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        this.freeCamKeys.forward = !1;
        break;
      case "KeyS":
      case "ArrowDown":
        this.freeCamKeys.backward = !1;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.freeCamKeys.left = !1;
        break;
      case "KeyD":
      case "ArrowRight":
        this.freeCamKeys.right = !1;
        break;
      case "Space":
        this.freeCamKeys.up = !1;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.freeCamKeys.down = !1;
        break;
    }
  }
  /**
   * Handle mouse movement for free camera look (right-click drag style with pointer lock)
   */
  handleFreeCamMouseMove(e) {
    if (this.mode !== "free" || !this.isRightMouseDown || this.isFollowingViewer) return;
    const t = e.movementX || 0, s = e.movementY || 0, i = 3e-3;
    this.freeCamRotation.yaw -= t * i, this.freeCamRotation.pitch += s * i, this.freeCamRotation.pitch = Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, this.freeCamRotation.pitch)
    );
  }
  /**
   * Update free camera movement
   */
  updateFreeCam(e) {
    if (!this.freeCamKeys) return;
    const t = new l.Vector3(
      Math.sin(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch),
      -Math.sin(this.freeCamRotation.pitch),
      Math.cos(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch)
    );
    t.normalize();
    const s = new l.Vector3(
      Math.sin(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch),
      -Math.sin(this.freeCamRotation.pitch),
      Math.cos(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch)
    );
    s.normalize();
    const i = new l.Vector3(
      Math.sin(this.freeCamRotation.yaw - Math.PI / 2),
      0,
      Math.cos(this.freeCamRotation.yaw - Math.PI / 2)
    ), o = new l.Vector3(0, 1, 0), a = new l.Vector3(), n = this.freeCamSpeed * e;
    this.freeCamKeys.forward && a.add(s.clone().multiplyScalar(n)), this.freeCamKeys.backward && a.add(s.clone().multiplyScalar(-n)), this.freeCamKeys.right && a.add(i.clone().multiplyScalar(n)), this.freeCamKeys.left && a.add(i.clone().multiplyScalar(-n)), this.freeCamKeys.up && a.add(o.clone().multiplyScalar(n)), this.freeCamKeys.down && a.add(o.clone().multiplyScalar(-n)), a.length() > 0 && a.normalize().multiplyScalar(n), this.camera.position.add(a);
    const c = this.camera.position.clone().add(t);
    this.camera.lookAt(c), this.controls.setLookAt(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z,
      c.x,
      c.y,
      c.z,
      !1
    );
  }
  /**
   * Update camera - call every frame
   * @param {number} delta - Time since last frame in seconds
   * @param {boolean} isBallCam - Whether to use ball cam or car cam
   */
  update(e, t = !0) {
    if (this.isFollowingViewer) {
      this.updateFollowInterpolation(e);
      return;
    }
    if (this.mode === "free") {
      this.updateFreeCam(e), this.controls.update(e);
      return;
    }
    if (this.mode === "ballOrbit") {
      if (this.targetBall) {
        const x = this.targetBall.position;
        this.lastBallOrbitPos || (this.lastBallOrbitPos = x.clone());
        const w = new l.Vector3().subVectors(x, this.lastBallOrbitPos);
        if (this.controls.setTarget(x.x, x.y, x.z, !1), w.lengthSq() > 0.01) {
          const b = new l.Vector3();
          this.controls.getPosition(b);
          const v = b.x + w.x, T = b.y + w.y, C = b.z + w.z;
          this.controls.setPosition(v, T, C, !1), this.lastBallOrbitPos.copy(x);
        }
      }
      this.controls.update(e);
      return;
    }
    if (!this.targetCar) {
      this.controls.update(e);
      return;
    }
    const s = this.targetCar.position.clone(), i = this.targetCar.quaternion;
    if (this.lastIsBallCam !== null && this.lastIsBallCam !== t && !t) {
      const x = new l.Vector3().subVectors(this.camera.position, s);
      x.y = 0, x.length() > 0.01 && (x.normalize(), this.smoothedCarYaw = Math.atan2(-x.x, -x.z));
    }
    this.lastIsBallCam = t;
    const o = this.calculateCarCamPosition(s, i, e), a = this.calculateBallCamPosition(s, i, e);
    this.targetBlend = t ? 1 : 0;
    const n = Math.max(
      0.15,
      Math.min(0.6, this.baseDuration / this.transitionSpeed)
    ), c = e / n;
    this.currentBlend < this.targetBlend ? this.currentBlend = Math.min(this.currentBlend + c, this.targetBlend) : this.currentBlend > this.targetBlend && (this.currentBlend = Math.max(this.currentBlend - c, this.targetBlend));
    const r = this.currentBlend, h = r * r * (3 - 2 * r), d = new l.Vector3().lerpVectors(
      o.cameraPos,
      a.cameraPos,
      h
    );
    this._tempMatrix.lookAt(
      o.cameraPos,
      o.lookTarget,
      new l.Vector3(0, 1, 0)
    ), this._tempQuatCarCam.setFromRotationMatrix(this._tempMatrix), this._tempMatrix.lookAt(
      a.cameraPos,
      a.lookTarget,
      new l.Vector3(0, 1, 0)
    ), this._tempQuatBallCam.setFromRotationMatrix(this._tempMatrix), this._tempQuatCarCam.dot(this._tempQuatBallCam) < 0 && this._tempQuatBallCam.set(
      -this._tempQuatBallCam.x,
      -this._tempQuatBallCam.y,
      -this._tempQuatBallCam.z,
      -this._tempQuatBallCam.w
    );
    const u = new l.Quaternion().slerpQuaternions(
      this._tempQuatCarCam,
      this._tempQuatBallCam,
      h
    );
    if (this.followAngle !== 0) {
      const x = this.followAngle * Math.PI / 180;
      u.multiply(this._tempQuatCarCam.setFromAxisAngle(Je, -x));
    }
    const f = (1 - Math.min(1, Math.max(0, this.stiffness))) * 0.15, g = 1500 * 1500;
    if (!this._smoothedCamPos || f < 1e-3 || this._smoothedCamPos.distanceToSquared(d) > g)
      this._smoothedCamPos = (this._smoothedCamPos || new l.Vector3()).copy(d), this._smoothedCamQuat = (this._smoothedCamQuat || new l.Quaternion()).copy(u);
    else {
      const x = 1 - Math.exp(-e / f);
      this._smoothedCamPos.lerp(d, x), this._smoothedCamQuat.slerp(u, x);
    }
    this.camera.position.copy(this._smoothedCamPos), this.camera.quaternion.copy(this._smoothedCamQuat), this.currentCamPos || (this.currentCamPos = new l.Vector3()), this.currentLookTarget || (this.currentLookTarget = new l.Vector3()), this.currentCamPos.copy(this._smoothedCamPos);
    const y = new l.Vector3(0, 0, -1).applyQuaternion(this._smoothedCamQuat);
    this.currentLookTarget.copy(this._smoothedCamPos).add(y.multiplyScalar(100)), this.enforceMinHeight();
  }
  /**
   * Calculate ball cam position and look target
   * Camera positioned so that both car and ball are visible
   * When ball is higher than car, camera goes lower to keep both in frame
   */
  calculateBallCamPosition(e, t, s = 1 / 60) {
    if (!this.targetBall)
      return this.calculateCarCamPosition(e, t, s);
    const i = this.targetBall.position.clone(), o = new l.Vector3().subVectors(e, i);
    o.y = 0, o.normalize();
    const a = e.clone().add(o.multiplyScalar(this.followDistance)), n = i.y - e.y, r = Math.min(1, Math.max(0, n / 800));
    a.y = e.y + this.followHeight - r * 100, a.y < this.minHeight && (a.y = this.minHeight);
    const h = new l.Vector3().lerpVectors(
      i,
      new l.Vector3(e.x, e.y + 100, e.z),
      r * 0.6
    );
    return { cameraPos: a, lookTarget: h };
  }
  /**
   * Calculate car cam position and look target
   * Uses velocity-based direction when car is airborne/flipping
   */
  calculateCarCamPosition(e, t, s = 1 / 60) {
    this.lastCarPos || (this.lastCarPos = e.clone());
    const i = new l.Vector3().subVectors(e, this.lastCarPos);
    i.y = 0;
    const o = i.length(), a = new l.Vector3(1, 0, 0);
    a.applyQuaternion(t);
    const n = Math.atan2(a.x, a.z), c = new l.Vector3(0, 1, 0);
    c.applyQuaternion(t);
    const r = c.y < 0.5;
    let h;
    if (r && o > 0.01)
      i.normalize(), h = Math.atan2(i.x, i.z);
    else if (o > 0.05) {
      i.normalize();
      let b = Math.atan2(i.x, i.z) - n;
      for (; b > Math.PI; ) b -= Math.PI * 2;
      for (; b < -Math.PI; ) b += Math.PI * 2;
      Math.abs(b) > Math.PI / 2 ? h = n + Math.PI : h = n;
    } else
      h = n;
    this.lastCarPos.copy(e), this.smoothedCarYaw === void 0 && (this.smoothedCarYaw = h);
    let d = h - this.smoothedCarYaw;
    for (; d > Math.PI; ) d -= Math.PI * 2;
    for (; d < -Math.PI; ) d += Math.PI * 2;
    const u = r ? this.swivelSpeed * 0.4 : this.swivelSpeed;
    this.smoothedCarYaw += d * Math.min(1, u * s);
    const m = -Math.sin(this.smoothedCarYaw), f = -Math.cos(this.smoothedCarYaw), g = new l.Vector3(
      e.x + m * this.followDistance,
      e.y + this.followHeight,
      e.z + f * this.followDistance
    );
    g.y < this.minHeight && (g.y = this.minHeight);
    const y = 50, x = new l.Vector3(
      e.x + Math.sin(this.smoothedCarYaw) * y,
      e.y,
      e.z + Math.cos(this.smoothedCarYaw) * y
    );
    return { cameraPos: g, lookTarget: x };
  }
  /**
   * Enforce minimum camera height
   */
  enforceMinHeight() {
    const e = this.camera.position;
    e.y < this.minHeight && (e.y = this.minHeight, this.controls.setPosition(e.x, this.minHeight, e.z, !1));
  }
  /**
   * Instantly move camera to position (no transition)
   */
  setPosition(e, t, s) {
    this.controls.setPosition(e, t, s, !1);
  }
  /**
   * Instantly set camera look target (no transition)
   */
  setTarget(e, t, s) {
    this.controls.setTarget(e, t, s, !1);
  }
  /**
   * Smoothly move camera to position and target
   */
  moveTo(e, t, s, i, o, a, n = !0) {
    this.controls.setLookAt(e, t, s, i, o, a, n);
  }
  /**
   * Set transition smoothness
   * @param {number} time - Smooth time in seconds (lower = faster)
   */
  setSmoothTime(e) {
    this.controls.smoothTime = e;
  }
  /**
   * Set all camera follow settings (matching Rocket League camera options)
   * @param {Object} settings - Camera settings object
   * @param {number} settings.distance - Distance behind car (100-400 UU)
   * @param {number} settings.height - Height above car (40-200 UU)
   * @param {number} settings.angle - Pitch angle in degrees (-15 to 0)
   * @param {number} settings.stiffness - Camera stiffness (0.0-1.0)
   * @param {number} settings.swivelSpeed - Rotation speed (1.0-10.0)
   * @param {number} settings.transitionSpeed - Ball cam transition speed (1.0-2.0)
   */
  setFollowSettings(e) {
    e.distance !== void 0 && (this.followDistance = e.distance), e.height !== void 0 && (this.followHeight = e.height), e.angle !== void 0 && (this.followAngle = e.angle), e.stiffness !== void 0 && (this.stiffness = e.stiffness), e.swivelSpeed !== void 0 && (this.swivelSpeed = e.swivelSpeed), e.transitionSpeed !== void 0 && (this.transitionSpeed = e.transitionSpeed);
  }
  // ============================================
  // Replay Mode Camera Management (v9 protocol)
  // ============================================
  /**
   * Save current camera state before entering replay mode
   * This captures everything needed to restore the exact camera position
   */
  saveCameraState() {
    this.savedCameraState = {
      mode: this.mode,
      position: this.camera.position.clone(),
      quaternion: this.camera.quaternion.clone(),
      targetCarIndex: this.targetCar ? this.targetCar.userData?.index : null,
      currentBlend: this.currentBlend,
      targetBlend: this.targetBlend,
      smoothedCarYaw: this.smoothedCarYaw,
      freeCamRotation: this.freeCamRotation ? { ...this.freeCamRotation } : null,
      // Ball orbit specific state
      lastBallOrbitPos: this.lastBallOrbitPos ? this.lastBallOrbitPos.clone() : null
    }, console.log("[CameraManager] Camera state saved:", this.savedCameraState.mode);
  }
  /**
   * Restore camera state after exiting replay mode
   * Returns the saved mode and target car index so the caller can restore
   */
  restoreCameraState() {
    if (!this.savedCameraState)
      return console.warn("[CameraManager] No saved camera state to restore"), null;
    const e = this.savedCameraState;
    console.log("[CameraManager] Restoring camera state:", e.mode), this.camera.position.copy(e.position), this.camera.quaternion.copy(e.quaternion), this.currentBlend = e.currentBlend, this.targetBlend = e.targetBlend, this.smoothedCarYaw = e.smoothedCarYaw, e.freeCamRotation && this.freeCamRotation && (this.freeCamRotation.yaw = e.freeCamRotation.yaw, this.freeCamRotation.pitch = e.freeCamRotation.pitch), e.lastBallOrbitPos && (this.lastBallOrbitPos = e.lastBallOrbitPos);
    const t = new l.Vector3(0, 0, -1).applyQuaternion(e.quaternion);
    t.multiplyScalar(100).add(e.position), this.controls.setLookAt(
      e.position.x,
      e.position.y,
      e.position.z,
      t.x,
      t.y,
      t.z,
      !1
    );
    const s = {
      mode: e.mode,
      targetCarIndex: e.targetCarIndex
    };
    return this.savedCameraState = null, this.isInReplayMode = !1, s;
  }
  /**
   * Enter replay mode - saves camera state before switching
   */
  enterReplayMode() {
    this.isInReplayMode || (this.saveCameraState(), this.isInReplayMode = !0);
  }
  /**
   * Exit replay mode - restores the previous camera state
   * @returns {Object|null} The saved camera state info
   */
  exitReplayMode() {
    return this.restoreCameraState();
  }
  /**
   * Check if currently in replay mode
   * @returns {boolean}
   */
  getIsInReplayMode() {
    return this.isInReplayMode;
  }
  /**
   * Set up podium camera - positions camera to look at field center
   */
  setupPodiumCamera() {
    this.isInReplayMode || (this.saveCameraState(), this.isInReplayMode = !0);
    const e = new l.Vector3(0, 1500, 3e3), t = new l.Vector3(0, 200, 0);
    this.camera.position.copy(e), this.camera.lookAt(t), this.controls.setLookAt(
      e.x,
      e.y,
      e.z,
      t.x,
      t.y,
      t.z,
      !1
    ), console.log("[CameraManager] Podium camera setup");
  }
  /**
   * Set freecam state from position and quaternion (for following another viewer)
   * Uses interpolation for smooth movement when following
   * @param {Object} position - { x, y, z }
   * @param {Object} rotation - { x, y, z, w } quaternion
   */
  setFreecamState(e, t) {
    if (e && (this.followTargetPosition.set(e.x, e.y, e.z), t && this.followTargetQuaternion.set(t.x, t.y, t.z, t.w), !this.hasFollowTarget)) {
      if (this.camera.position.copy(this.followTargetPosition), this.camera.quaternion.copy(this.followTargetQuaternion), this.freeCamRotation) {
        const i = new l.Vector3();
        this.camera.getWorldDirection(i), this.freeCamRotation.yaw = Math.atan2(i.x, i.z), this.freeCamRotation.pitch = Math.asin(-i.y);
      }
      const s = new l.Vector3();
      this.camera.getWorldDirection(s), s.multiplyScalar(100).add(this.camera.position), this.controls.setLookAt(
        e.x,
        e.y,
        e.z,
        s.x,
        s.y,
        s.z,
        !1
      ), this.hasFollowTarget = !0;
    }
  }
  /**
   * Set ball orbit camera state when following another viewer
   * Uses orbit parameters to orbit around LOCAL ball - prevents desync/stuttering
   * @param {Object} orbitParams - { distance, azimuth, polar } orbit parameters from followed viewer
   */
  setBallOrbitState(e) {
    if (e && (this.followTargetOrbitParams ? (this.followTargetOrbitParams.distance = e.distance, this.followTargetOrbitParams.azimuth = e.azimuth, this.followTargetOrbitParams.polar = e.polar) : this.followTargetOrbitParams = { ...e }, this.followCurrentOrbitParams || (this.followCurrentOrbitParams = { ...e }), !this.hasFollowTarget)) {
      const t = this.targetBall?.position || new l.Vector3(0, 100, 0);
      this.controls.setTarget(t.x, t.y, t.z, !1), this.controls.dollyTo(e.distance, !1), this.controls.rotateTo(e.azimuth, e.polar, !1), this.followCurrentOrbitParams = { ...e }, this.hasFollowTarget = !0;
    }
  }
  /**
   * Set whether we're following another viewer's camera
   * When following, inputs are disabled and camera interpolates to target
   * @param {boolean} isFollowing
   */
  setFollowingViewer(e) {
    this.isFollowingViewer = e, e ? this.controls.enabled = !1 : (this.hasFollowTarget = !1, this.followCurrentOrbitParams = null, this.followTargetOrbitParams = null, this.mode === "ballOrbit" && (this.controls.enabled = !0), this.mode === "free" && document.pointerLockElement === this.domElement && document.exitPointerLock());
  }
  /**
   * Update interpolation for following mode (called from update loop)
   * @param {number} delta - Time since last frame
   */
  updateFollowInterpolation(e) {
    if (!(!this.isFollowingViewer || !this.hasFollowTarget))
      if (this.mode === "ballOrbit") {
        const t = this.targetBall?.position;
        if (t && this.followCurrentOrbitParams && this.followTargetOrbitParams) {
          this.followCurrentOrbitParams.distance += (this.followTargetOrbitParams.distance - this.followCurrentOrbitParams.distance) * 0.15;
          let i = this.followTargetOrbitParams.azimuth - this.followCurrentOrbitParams.azimuth;
          for (; i > Math.PI; ) i -= Math.PI * 2;
          for (; i < -Math.PI; ) i += Math.PI * 2;
          this.followCurrentOrbitParams.azimuth += i * 0.15, this.followCurrentOrbitParams.polar += (this.followTargetOrbitParams.polar - this.followCurrentOrbitParams.polar) * 0.15, this.controls.setTarget(t.x, t.y, t.z, !1), this.controls.dollyTo(this.followCurrentOrbitParams.distance, !1), this.controls.rotateTo(
            this.followCurrentOrbitParams.azimuth,
            this.followCurrentOrbitParams.polar,
            !1
          ), this.controls.update(e);
        }
      } else {
        if (this.camera.position.lerp(this.followTargetPosition, this.followPositionLerpFactor), this.camera.quaternion.slerp(this.followTargetQuaternion, this.followRotationSlerpFactor), this.freeCamRotation) {
          const s = new l.Vector3();
          this.camera.getWorldDirection(s), this.freeCamRotation.yaw = Math.atan2(s.x, s.z), this.freeCamRotation.pitch = Math.asin(-s.y);
        }
        const t = new l.Vector3();
        this.camera.getWorldDirection(t), t.multiplyScalar(100).add(this.camera.position), this.controls.setLookAt(
          this.camera.position.x,
          this.camera.position.y,
          this.camera.position.z,
          t.x,
          t.y,
          t.z,
          !1
        );
      }
  }
  /**
   * Set camera to default freecam position (side view of field)
   * Call this when initializing the viewer or when switching to freecam
   */
  setDefaultFreecamPosition() {
    if (this.camera.position.copy(this.defaultFreecamPosition), this.camera.lookAt(this.defaultFreecamLookAt), this.freeCamRotation) {
      const e = new l.Vector3();
      this.camera.getWorldDirection(e), this.freeCamRotation.yaw = Math.atan2(e.x, e.z), this.freeCamRotation.pitch = Math.asin(-e.y);
    }
    this.controls.setLookAt(
      this.defaultFreecamPosition.x,
      this.defaultFreecamPosition.y,
      this.defaultFreecamPosition.z,
      this.defaultFreecamLookAt.x,
      this.defaultFreecamLookAt.y,
      this.defaultFreecamLookAt.z,
      !1
    );
  }
  /**
   * Get current pointer lock state
   * @returns {boolean} True if pointer is currently locked
   */
  getIsPointerLocked() {
    return this.isPointerLocked || !1;
  }
  /**
   * Set callback for pointer lock state changes
   * @param {(isLocked: boolean) => void} callback
   */
  setPointerLockCallback(e) {
    this.onPointerLockStateChange = e;
  }
  /**
   * Dispose resources
   */
  dispose() {
    this.controls.dispose(), this.ballOrbitScrollHandler && this.domElement.removeEventListener("wheel", this.ballOrbitScrollHandler), this.onKeyDown && document.removeEventListener("keydown", this.onKeyDown), this.onKeyUp && document.removeEventListener("keyup", this.onKeyUp), this.onMouseMove && document.removeEventListener("mousemove", this.onMouseMove), this.onMouseDown && this.domElement.removeEventListener("mousedown", this.onMouseDown), this.onMouseUp && document.removeEventListener("mouseup", this.onMouseUp), this.onPointerLockChange && document.removeEventListener("pointerlockchange", this.onPointerLockChange), this.onMouseLeave && this.domElement.removeEventListener("mouseleave", this.onMouseLeave), this.onWindowBlur && window.removeEventListener("blur", this.onWindowBlur), this.onVisibilityChange && document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }
}
function j(p) {
  if (p.pitch === void 0 || p.angle !== void 0) return p;
  const { pitch: e, ...t } = p;
  return { ...t, angle: e };
}
const tt = {
  distance: 260,
  height: 90,
  angle: -4,
  stiffness: 0.45,
  swivelSpeed: 4.3,
  transitionSpeed: 1.3,
  fov: 110
};
function it(p = {}) {
  let e = null, t = null, s = p.mode ?? (p.follow ? "follow" : "orbit"), i = p.follow ?? null, o = p.ballCam ?? null, a = o ?? !0, n = j({ ...p.settings }), c = 1;
  const r = p.useRecordedSettings !== !1;
  let h = null;
  const d = new l.Vector3();
  let u = !1;
  function m() {
    if (!(!t || !e)) {
      if (t.player.controls.enabled = s === "orbit", s === "free")
        e.setMode("free");
      else if (s === "ballOrbit") {
        const b = y();
        b && e.setTargetBall(b), e.setMode("ballOrbit");
      } else
        e.setMode("car");
      h = null;
    }
  }
  function f() {
    return !r || !t || !i ? null : t.player.adapter.getPlayer(i)?.cameraSettings ?? null;
  }
  function g() {
    const b = { ...tt, ...f(), ...n };
    return c !== 1 && b.distance !== void 0 && (b.distance *= c), b;
  }
  function y() {
    if (!t) return null;
    const b = t.player.actorManager;
    return b.ballActorId != null ? b.actors[b.ballActorId] ?? null : null;
  }
  function x(b) {
    const v = g().fov;
    if (!v) return;
    const T = v * Math.PI / 180, C = 16 / 9, S = 2 * Math.atan(Math.tan(T / 2) / C), P = 2 * Math.atan(Math.tan(T / 2) / b.aspect), I = Math.max(S, P) * 180 / Math.PI;
    Math.abs(b.fov - I) > 0.1 && (b.fov = I, b.updateProjectionMatrix());
  }
  function w(b, v) {
    if (!e) return;
    if (s === "free") {
      n.freeCamSpeed && (e.freeCamSpeed = n.freeCamSpeed), e.update(v);
      return;
    }
    if (s === "ballOrbit") {
      b.ball.object3d && e.setTargetBall(b.ball.object3d), e.update(v);
      return;
    }
    const C = (i ? b.cars.find((P) => P.name === i) : void 0)?.object3d ?? null;
    if (!C) {
      e.update(v);
      return;
    }
    e.setTargetCar(C), b.ball.object3d && e.setTargetBall(b.ball.object3d), e.setFollowSettings(g());
    const S = i ? b.player.adapter.getPlayer(i) : void 0;
    a = o ?? S?.isBallCam ?? !0, d.copy(C.position), u = !0, e.update(v, a);
  }
  return {
    id: "camera",
    setup(b) {
      t = b, e = new et(b.camera, b.renderer.domElement), m();
    },
    beforeRender(b) {
      if (!e || (x(b.camera), s === "orbit")) return;
      const v = performance.now(), T = h === null ? 1 / 60 : Math.min(0.1, (v - h) / 1e3);
      h = v, w(b, T);
    },
    teardown() {
      s = "orbit", t && (t.player.controls.enabled = !0), e?.dispose(), e = null, t = null;
    },
    setMode(b) {
      b !== s && (s = b, m());
    },
    getMode() {
      return s;
    },
    follow(b) {
      i = b, s = "follow", m();
    },
    release() {
      s = "orbit", t && u && t.player.controls.target.copy(d), m();
    },
    getTarget() {
      return i;
    },
    setBallCam(b) {
      o = b, b !== null && (a = b);
    },
    getBallCam() {
      return a;
    },
    setCameraSettings(b) {
      n = b === null ? {} : { ...n, ...j(b) };
    },
    setDistanceScale(b) {
      c = Math.max(0.25, b);
    },
    getDistanceScale() {
      return c;
    },
    getCameraSettings() {
      return g();
    },
    getRecordedSettings() {
      const b = f();
      return b ? { ...b } : null;
    }
  };
}
class st {
  constructor(e, t) {
    this.scene = e, this.camera = t, this.nameTags = /* @__PURE__ */ new Map(), this.playerTeams = {}, this.teamColors = {
      0: {
        // Blue team
        bg: "#1976D2",
        border: "#FFFFFF",
        text: "#FFFFFF"
      },
      1: {
        // Orange team
        bg: "#E65100",
        border: "#FFFFFF",
        text: "#FFFFFF"
      }
    }, this.canvasWidth = 256, this.canvasHeight = 80, this.spriteScale = 0.06, this.spriteWorldHeight = 1.2;
  }
  setPlayerTeams(e) {
    this.playerTeams = e;
  }
  /**
   * Create or update a name tag for a player
   */
  createOrUpdateNameTag(e, t, s) {
    let i = this.nameTags.get(e);
    if (i || (i = this._createNameTag(e), this.nameTags.set(e, i)), (Math.abs((i.lastBoost || 0) - t) > 1 || i.lastBoost === void 0) && (this._updateTexture(i, e, t), i.lastBoost = t), s && this.camera) {
      const a = this.camera.position.distanceTo(s), n = 80, c = 200, r = 500, d = Math.max(0, Math.min(1, (a - r) / (5e3 - r))), u = n + d * (c - n);
      i.sprite.position.set(s.x, s.y + u, s.z);
      const m = 800, f = this.canvasWidth / this.canvasHeight;
      if (a < m) {
        const g = m / Math.max(a, 100), y = this.spriteScale * g;
        i.sprite.scale.set(y * f, y, 1);
      } else
        i.sprite.scale.set(this.spriteScale * f, this.spriteScale, 1);
      i.sprite.visible = !0;
    }
  }
  /**
   * Create a new name tag sprite with canvas
   */
  _createNameTag(e) {
    const t = document.createElement("canvas");
    t.width = this.canvasWidth, t.height = this.canvasHeight;
    const s = t.getContext("2d"), i = new l.CanvasTexture(t);
    i.minFilter = l.LinearFilter, i.magFilter = l.LinearFilter;
    const o = new l.SpriteMaterial({
      map: i,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      sizeAttenuation: !1
    }), a = new l.Sprite(o), n = this.canvasWidth / this.canvasHeight;
    return a.scale.set(this.spriteScale * n, this.spriteScale, 1), a.renderOrder = 999, this.scene.add(a), { sprite: a, canvas: t, ctx: s, texture: i };
  }
  /**
   * Update the canvas texture with current boost value
   */
  _updateTexture(e, t, s) {
    const { canvas: i, ctx: o, texture: a } = e, n = this.playerTeams[t] ?? 0, c = this.teamColors[n], r = i.width, h = i.height;
    o.clearRect(0, 0, r, h);
    const d = 4, u = 44, m = (h - u) / 2, f = 28, g = 8;
    o.font = "bold 20px Arial, sans-serif";
    const x = o.measureText(t).width + f + g * 3 + d * 2, w = (r - x) / 2, b = u / 2;
    o.beginPath(), o.roundRect(w, m, x, u, b), o.fillStyle = c.bg, o.fill(), o.strokeStyle = c.border, o.lineWidth = 3, o.stroke();
    const v = w + g + f / 2 + 2, T = h / 2, C = f / 2 - 2;
    if (o.beginPath(), o.arc(v, T, C, 0, Math.PI * 2), o.fillStyle = c.bg, o.fill(), o.strokeStyle = "#FFFFFF", o.lineWidth = 2, o.stroke(), s > 0) {
      const P = Math.min(100, Math.max(0, s)) / 100, I = C * 2 * P, ie = T + C - I;
      o.save(), o.beginPath(), o.arc(v, T, C - 1, 0, Math.PI * 2), o.clip(), o.fillStyle = "#FFFFFF", o.fillRect(v - C, ie, C * 2, I), o.restore(), s >= 100 && (o.shadowColor = "rgba(255, 255, 255, 0.8)", o.shadowBlur = 10, o.beginPath(), o.arc(v, T, C - 1, 0, Math.PI * 2), o.fillStyle = "#FFFFFF", o.fill(), o.shadowBlur = 0);
    }
    o.font = "bold 20px Arial, sans-serif", o.fillStyle = c.text, o.textAlign = "left", o.textBaseline = "middle", o.shadowColor = "rgba(0, 0, 0, 0.5)", o.shadowBlur = 3, o.shadowOffsetX = 1, o.shadowOffsetY = 1;
    const S = v + C + g;
    o.fillText(t, S, h / 2), o.shadowBlur = 0, a.needsUpdate = !0;
  }
  /**
   * Hide a name tag (when car is not visible)
   */
  hideNameTag(e) {
    const t = this.nameTags.get(e);
    t && (t.sprite.visible = !1);
  }
  /**
   * Update all name tags based on actor data
   * Called each frame from GameEngine
   * @param {Object} actors - All actors in the scene
   * @param {Object} playerBoosts - Player boost amounts
   * @param {Object} playerNameToCarActorId - Mapping of player names to car actor IDs
   * @param {string|null} followedPlayer - Player being followed in player cam (hide their tag)
   */
  update(e, t, s, i = null) {
    const o = /* @__PURE__ */ new Set();
    Object.entries(s).forEach(([a, n]) => {
      if (a === i) {
        this.hideNameTag(a), o.add(a);
        return;
      }
      const c = e[n];
      if (!c || !c.visible) {
        this.hideNameTag(a);
        return;
      }
      const r = t[a] ?? 0;
      this.createOrUpdateNameTag(a, r, c.position), o.add(a);
    }), this.nameTags.forEach((a, n) => {
      o.has(n) || (a.sprite.visible = !1);
    });
  }
  /**
   * Reset all name tags
   */
  reset() {
    this.nameTags.forEach((e) => {
      this.scene.remove(e.sprite), e.sprite.material.map.dispose(), e.sprite.material.dispose();
    }), this.nameTags.clear();
  }
  /**
   * Dispose of all resources
   */
  dispose() {
    this.reset();
  }
}
function xt() {
  let p = null;
  return {
    id: "name-tags",
    setup(e) {
      p = new st(e.scene, e.camera), p.setPlayerTeams(e.player.adapter.getPlayerTeams());
    },
    beforeRender(e) {
      if (!p) return;
      const t = {}, s = {}, i = {};
      for (const o of e.cars)
        o.object3d && (t[o.name] = o.object3d, s[o.name] = o.boost, i[o.name] = o.name);
      p.update(t, s, i, null);
    },
    teardown() {
      p?.dispose(), p = null;
    }
  };
}
function wt() {
  let p = /* @__PURE__ */ new Map();
  function e(s) {
    const i = s.player.adapter.boostPads;
    !i || i.size === 0 || (console.log(`[boost-pads] Creating ${i.size} boost pads...`), p = /* @__PURE__ */ new Map(), i.forEach((o, a) => {
      const n = o.isBig;
      let c, r, h;
      if (n) {
        c = new l.SphereGeometry(50, 16, 16), r = new l.MeshStandardMaterial({
          color: 16768324,
          // Bright yellow/orange core
          emissive: 16755200,
          emissiveIntensity: 1,
          metalness: 0.3,
          roughness: 0.2,
          transparent: !0,
          // CRITICAL: Required for opacity changes
          opacity: 1,
          depthWrite: !1
          // Fix transparency sorting with arena walls
        }), h = new l.Mesh(c, r), h.renderOrder = 100;
        const f = new l.SphereGeometry(100, 16, 16), g = new l.MeshBasicMaterial({
          color: 16755200,
          transparent: !0,
          opacity: 0.3,
          blending: l.AdditiveBlending,
          side: l.BackSide,
          // Render inside of sphere for halo effect
          depthWrite: !1
        }), y = new l.Mesh(f, g);
        y.renderOrder = 99, h.add(y), h.userData.glowMesh = y;
        const x = new l.SphereGeometry(50 * 1.4, 16, 16), w = new l.MeshBasicMaterial({
          color: 16763904,
          transparent: !0,
          opacity: 0.4,
          blending: l.AdditiveBlending,
          side: l.BackSide,
          depthWrite: !1
        }), b = new l.Mesh(x, w);
        b.renderOrder = 99, h.add(b), h.userData.innerGlowMesh = b, h.userData.needsLight = !0;
      } else
        c = new l.CylinderGeometry(40, 40, 5, 16), r = new l.MeshStandardMaterial({
          color: 16763904,
          // Yellow/orange
          emissive: 16750848,
          emissiveIntensity: 0.4,
          metalness: 0.2,
          roughness: 0.8,
          transparent: !0,
          // CRITICAL: Required for opacity changes
          opacity: 1,
          depthWrite: !1
          // Fix transparency sorting with arena walls
        }), h = new l.Mesh(c, r), h.renderOrder = 100;
      const u = n ? 150 : 10;
      if (h.position.set(
        o.position.x,
        // X stays the same
        u,
        // Y = height (use our custom float height)
        o.position.y
        // Z = Unreal Y (position along the field length)
      ), h.userData.padId = a, h.userData.isBig = n, h.userData.isAvailable = !0, s.scene.add(h), p.set(a, h), h.userData.needsLight) {
        const m = new l.PointLight(16755200, 1, 600);
        m.decay = 0, m.position.set(o.position.x, u - 50, o.position.y), s.scene.add(m), h.userData.light = m;
      }
    }), console.log(`[boost-pads] ✓ Created ${p.size} boost pad meshes`));
  }
  function t(s) {
    s.player.adapter.boostPads.forEach((o, a) => {
      const n = p.get(a);
      if (!n) return;
      const c = o.isAvailable;
      n.userData.isAvailable !== c && (n.userData.isAvailable = c, c ? (n.material.color.setHex(o.isBig ? 16768324 : 16763904), n.material.emissive.setHex(o.isBig ? 16755200 : 16750848), n.material.emissiveIntensity = o.isBig ? 1 : 0.4, n.material.opacity = 1, n.visible = !0, n.userData.light && (n.userData.light.intensity = 1), n.userData.glowMesh && (n.userData.glowMesh.visible = !0), n.userData.innerGlowMesh && (n.userData.innerGlowMesh.visible = !0)) : (n.material.color.setHex(o.isBig ? 16755200 : 16763904), n.material.emissive.setHex(0), n.material.emissiveIntensity = 0, n.material.opacity = 0.2, n.visible = !0, n.userData.light && (n.userData.light.intensity = 0), n.userData.glowMesh && (n.userData.glowMesh.visible = !1), n.userData.innerGlowMesh && (n.userData.innerGlowMesh.visible = !1)));
    });
  }
  return {
    id: "boost-pads",
    setup(s) {
      e(s);
    },
    beforeRender(s) {
      t(s);
    },
    teardown(s) {
      p.forEach((i) => {
        s.scene.remove(i), i.geometry.dispose(), i.material.dispose();
        for (const a of ["glowMesh", "innerGlowMesh"]) {
          const n = i.userData[a];
          n && (n.geometry.dispose(), n.material.dispose());
        }
        const o = i.userData.light;
        o && (s.scene.remove(o), o.dispose());
      }), p.clear();
    }
  };
}
const ot = {
  "top-left": "top: 8px; left: 8px;",
  "top-right": "top: 8px; right: 8px;",
  "bottom-left": "bottom: 8px; left: 8px;",
  "bottom-right": "bottom: 8px; right: 8px;"
};
function vt(p = {}) {
  const e = p.corner ?? "top-right", t = p.updateIntervalMs ?? 500, s = () => typeof p.mount == "function" ? p.mount() : p.mount ?? null;
  let i = null, o = null, a = null, n = 0, c = performance.now(), r = 0, h = 0;
  const d = typeof p.onSample == "function";
  return {
    id: "fps-overlay",
    setup(u) {
      if (c = performance.now(), n = 0, h = u.player.getState().frameIndex, r = h, d) return;
      const m = s(), f = m != null;
      i = document.createElement("div"), i.className = "viewer-fps-overlay", i.style.cssText = f ? `
          display: inline-flex; gap: 10px; align-items: center;
          font: 600 11px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #c8d4e6; letter-spacing: 0.02em; white-space: nowrap;
        ` : `
          position: absolute; ${ot[e]}
          z-index: 30; pointer-events: none; user-select: none;
          display: flex; gap: 10px;
          font: 600 11px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #e8f0ff; background: rgba(12, 16, 24, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 6px;
          padding: 4px 8px; letter-spacing: 0.02em; white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
        `;
      const g = document.createElement("span");
      g.append("Render "), o = document.createElement("span"), o.style.color = "#7fd4ff", o.textContent = "– fps", g.append(o);
      const y = document.createElement("span");
      y.append("Replay "), a = document.createElement("span"), a.style.color = "#9affc0", a.textContent = "– fps", y.append(a), i.append(g, y), m ? m.appendChild(i) : (getComputedStyle(u.container).position === "static" && (u.container.style.position = "relative"), u.container.appendChild(i));
    },
    beforeRender(u) {
      n += 1, h = u.frameIndex;
      const m = performance.now(), f = m - c;
      if (f < t) return;
      const g = f / 1e3, y = n / g, x = Math.abs(h - r) / g;
      p.onSample ? p.onSample({ renderFps: y, replayFps: x }) : (o && (o.textContent = `${y.toFixed(0)} fps`), a && (a.textContent = `${x.toFixed(0)} fps`)), n = 0, c = m, r = h;
    },
    teardown() {
      i?.remove(), i = null, o = null, a = null;
    }
  };
}
function O(p, e) {
  if (!p.replay)
    throw new Error(
      `[viewer] cannot run @rlrml/player plugin "${e}" without a ReplayModel — construct the viewer via createViewer(), which always provides one.`
    );
  return {
    // ViewerPlayer implements ReplayPlayer's control + timeline surface
    // (docs/PLAYER_PARITY.md), which is all a DOM plugin calls.
    player: p.player,
    replay: p.replay,
    scene: p.player.sceneState,
    container: p.container,
    options: p.options
  };
}
function te(p, e) {
  return { ...O(p, e), state: p.state };
}
function at(p, e, t, s, i) {
  const o = p.frames[s.frameIndex] ?? null, a = p.frames[s.nextFrameIndex] ?? o, n = {
    track: p,
    mesh: t.playerMeshes.get(p.id) ?? null,
    boostTrail: t.playerBoostTrails.get(p.id) ?? null,
    frame: o,
    nextFrame: a,
    interpolatedPosition: null,
    boostFraction: 0
  };
  if (!n.mesh)
    return n;
  const c = X(
    o?.position ?? null,
    a?.position ?? null,
    s.alpha
  );
  if (!c || pe(e.timelineEvents, p.id, i) || !fe(o))
    return n;
  n.interpolatedPosition = c;
  const r = o?.boostFraction ?? 0, h = a?.boostFraction ?? r;
  return n.boostFraction = l.MathUtils.lerp(
    r,
    h,
    s.alpha
  ), n;
}
function nt(p, e) {
  const t = te(p, e), s = t.replay, i = t.scene, o = ue(s, p.currentTime), a = s.ballFrames[o.frameIndex] ?? null, n = s.ballFrames[o.nextFrameIndex] ?? a, c = X(
    a?.position ?? null,
    n?.position ?? null,
    o.alpha
  ), r = c ? i.replayRoot.localToWorld(
    new l.Vector3(
      c.x,
      c.y,
      c.z
    )
  ) : null;
  return {
    ...t,
    frameIndex: o.frameIndex,
    nextFrameIndex: o.nextFrameIndex,
    alpha: o.alpha,
    currentTime: p.currentTime,
    frame: s.frames[o.frameIndex] ?? null,
    nextFrame: s.frames[o.nextFrameIndex] ?? null,
    ballFrame: a,
    nextBallFrame: n,
    ballPosition: r,
    players: s.players.map(
      (h) => at(h, s, i, o, p.currentTime)
    )
  };
}
function Mt(p) {
  return {
    ...p,
    setup: p.setup ? (e) => {
      p.setup?.(O(e, p.id));
    } : void 0,
    onStateChange: p.onStateChange ? (e) => {
      p.onStateChange?.(te(e, p.id));
    } : void 0,
    beforeRender: p.beforeRender ? (e) => {
      p.beforeRender?.(nt(e, p.id));
    } : void 0,
    teardown: p.teardown ? (e) => {
      p.teardown?.(O(e, p.id));
    } : void 0
  };
}
async function Ct(p, e, t = {}) {
  return rt(p, await Q(e), t);
}
function rt(p, e, t = {}) {
  const s = new Ie(e.raw), i = new Ze(p, s, t, e.replay);
  return i.getPlugins().some((o) => o.id === "camera") || i.addPlugin(it()), i;
}
export {
  Pt as BOOST_RAW_MAX,
  Ie as SubtrActorPlayer,
  Ze as ViewerPlayer,
  zt as boostAmountToPercent,
  Dt as boostPercentToAmount,
  _t as createBoostPadOverlayPlugin,
  wt as createBoostPadsPlugin,
  It as createBoostPickupAnimationPlugin,
  it as createCameraPlugin,
  Bt as createCanvasRecorderPlugin,
  vt as createFpsOverlayPlugin,
  xt as createNameTagPlugin,
  At as createTimelineOverlayPlugin,
  Ct as createViewer,
  rt as createViewerFromParsed,
  Mt as fromReplayPlayerPlugin,
  Q as loadReplay,
  bt as parseReplay,
  Vt as timelineEventSeekTime
};
