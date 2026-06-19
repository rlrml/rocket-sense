import * as _e from "@rlrml/subtr-actor";
import * as h from "three";
import { OrbitControls as fa } from "three/examples/jsm/controls/OrbitControls.js";
import { HDRLoader as ga } from "three/examples/jsm/loaders/HDRLoader.js";
import { RoomEnvironment as li } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader as tt } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as ci } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OBJLoader as ya } from "three/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader as ba } from "three/examples/jsm/loaders/FBXLoader.js";
import { clone as Ve } from "three/examples/jsm/utils/SkeletonUtils.js";
import pt from "camera-controls";
import { boostAmountToPercent as hi } from "./boost-units.js";
import { BOOST_RAW_MAX as Dl, boostPercentToAmount as kl } from "./boost-units.js";
const ft = "octane", xa = {
  breakout: {
    kind: "breakout",
    label: "Breakout",
    length: 131.4924,
    width: 80.521,
    height: 30.3,
    slopeDegrees: -0.9795,
    groundHeightFront: 43.8976,
    groundHeightBack: 46.1454,
    offset: 13.88,
    elevation: 17.05
  },
  dominus: {
    kind: "dominus",
    label: "Dominus",
    length: 127.9268,
    width: 83.27995,
    height: 31.3,
    slopeDegrees: -0.9635,
    groundHeightFront: 47.2238,
    groundHeightBack: 49.3749,
    offset: 13.88,
    elevation: 17.05
  },
  hybrid: {
    kind: "hybrid",
    label: "Hybrid",
    length: 127.0192,
    width: 82.18787,
    height: 34.15907,
    slopeDegrees: -0.5499,
    groundHeightFront: 54.0982,
    groundHeightBack: 55.3173,
    offset: 13.88,
    elevation: 17.05
  },
  merc: {
    kind: "merc",
    label: "Merc",
    length: 120.72,
    width: 76.71,
    height: 41.66,
    slopeDegrees: 0.28,
    groundHeightFront: 60.76,
    groundHeightBack: 61.35,
    offset: 13.88,
    elevation: 17.05
  },
  octane: {
    kind: "octane",
    label: "Octane",
    length: 118.0074,
    width: 84.19941,
    height: 36.15907,
    slopeDegrees: -0.5518,
    groundHeightFront: 55.1449,
    groundHeightBack: 56.2814,
    offset: 13.88,
    elevation: 17.05
  },
  plank: {
    kind: "plank",
    label: "Plank",
    length: 128.8198,
    width: 84.67036,
    height: 29.3944,
    slopeDegrees: -0.3447,
    groundHeightFront: 44.998,
    groundHeightBack: 45.773,
    offset: 13.88,
    elevation: 17.05
  }
}, wa = {
  "16batmobile": "plank",
  "70dodgechargerrt": "dominus",
  "89batmobile": "dominus",
  "99nissanskylinegtrr34": "hybrid",
  aftershock: "dominus",
  animusgp: "breakout",
  artemis: "plank",
  artemisg1: "plank",
  artemisgxt: "plank",
  astonmartinvalhalla: "breakout",
  backfire: "octane",
  backtothefuturetimemachine: "dominus",
  batmobile1989: "dominus",
  battlebus: "merc",
  breakout: "breakout",
  breakouttypes: "breakout",
  centio: "plank",
  centiov17: "plank",
  cyclone: "breakout",
  deloreantimemachine: "dominus",
  diestro: "dominus",
  dominus: "dominus",
  dominusgt: "dominus",
  endo: "hybrid",
  esper: "hybrid",
  fast4wd: "octane",
  fennec: "octane",
  gazellagt: "dominus",
  gizmo: "octane",
  grog: "octane",
  guardian: "dominus",
  guardiang1: "dominus",
  guardiangxt: "dominus",
  hotshot: "dominus",
  icecharger: "dominus",
  imperatordt5: "dominus",
  jager619rs: "hybrid",
  jurassicjeepwrangler: "octane",
  mantis: "plank",
  marauder: "octane",
  masamune: "dominus",
  maverick: "dominus",
  maverickg1: "dominus",
  maverickgxt: "dominus",
  mclaren570s: "dominus",
  merc: "merc",
  mr11: "dominus",
  nimbus: "hybrid",
  octane: "octane",
  octanezsr: "octane",
  paladin: "plank",
  proteus: "octane",
  ripper: "dominus",
  roadhog: "octane",
  roadhogxl: "octane",
  samurai: "breakout",
  scarab: "octane",
  takumi: "octane",
  takumirxt: "octane",
  thedarkknightstumbler: "octane",
  thedarkknightrisestumbler: "octane",
  triton: "octane",
  twinmilliii: "plank",
  twinzer: "octane",
  venom: "hybrid",
  vulcan: "octane",
  werewolf: "dominus",
  xdevil: "hybrid",
  xdevilmk2: "hybrid",
  zippy: "octane",
  "1966cadillacdeville": "breakout",
  ace: "breakout",
  admiral: "dominus",
  azura: "breakout",
  behemoth: "merc",
  beskar: "hybrid",
  bmwm3e30: "dominus",
  bmwm2racing: "dominus",
  bmwm4gt3evo: "dominus",
  bmw1series: "octane",
  bmw1seriesrle: "octane",
  bmwm240i: "dominus",
  bugatticentodieci: "plank",
  bumblebee: "dominus",
  bumblebeecar: "dominus",
  chevroletastro: "merc",
  chevroletcorvettestingray: "breakout",
  chevroletcorvettezr1: "breakout",
  chryslerpacifica: "hybrid",
  corlay: "octane",
  cyberpunkquadra: "breakout",
  defenderd7xr: "merc",
  diesel: "breakout",
  dodgechargerdaytonascatpack: "dominus",
  dodgerchargerdaytonascatpack: "dominus",
  dominusneon: "dominus",
  emperor: "breakout",
  emperorii: "breakout",
  emperoriifrozen: "breakout",
  emperoriiscorched: "breakout",
  fastfuriousdodgecharger: "dominus",
  fastandfuriousdodgecharger: "dominus",
  fastandfuriousdodgechargersrthellcat: "dominus",
  fastfuriousmazdarx7: "breakout",
  fastandfuriousmazdarx7: "breakout",
  fastfuriousnissanskyline: "hybrid",
  fastandfuriousnissanskyline: "hybrid",
  fastfuriouspontiacfiero: "hybrid",
  fastandfuriouspontiacfiero: "hybrid",
  fenneczrf: "octane",
  ferrari296gtb: "dominus",
  ferrarif40: "breakout",
  fordbroncoraptorrle: "merc",
  fordf150rle: "octane",
  fordmustanggtd: "dominus",
  fordmustangshelbygt500: "dominus",
  fordmustangmacherle: "octane",
  fordmustangshelbygt350rrle: "dominus",
  formula12021: "plank",
  formula12022: "plank",
  fuse: "breakout",
  havoc: "breakout",
  hearse: "hybrid",
  homerscar: "dominus",
  hondacivictyper: "octane",
  hondacivictyperle: "octane",
  jackal: "octane",
  jeepwranglerrubicon: "octane",
  kitt: "dominus",
  knightindustries2000: "dominus",
  komodo: "breakout",
  lamborghinicountachlpi8004: "dominus",
  lamborghinihuracansto: "dominus",
  lamborghiniurus: "hybrid",
  lamborghiniurusse: "hybrid",
  lightningmcqueen: "dominus",
  lightningmcqueencar: "dominus",
  lockjaw: "dominus",
  luiginsr: "octane",
  maestro: "dominus",
  magnifique: "dominus",
  magnifiquegxt: "dominus",
  mako: "breakout",
  mamba: "dominus",
  mario: "octane",
  marionsr: "octane",
  maven: "dominus",
  mclaren765lt: "dominus",
  mclarenp1: "dominus",
  mclarensenna: "breakout",
  megastar: "breakout",
  mercedesamggt63s: "dominus",
  mercedesbenzcla: "dominus",
  mudcat: "octane",
  mudcatg1: "octane",
  mudcatgxt: "octane",
  nissan350z: "dominus",
  nissanfairladyz: "dominus",
  nissanfairladyzrle: "dominus",
  nissansilvia: "hybrid",
  nissansilviarle: "hybrid",
  nissanskylinegtr: "hybrid",
  nissanskylinegtrr32: "hybrid",
  nissanzperformance: "dominus",
  nissanzperformancecar: "dominus",
  outlaw: "octane",
  outlawgxt: "octane",
  pattywagon: "octane",
  pizzaplanetdeliverytruck: "merc",
  pontiacfirebird: "breakout",
  porsche918spyder: "breakout",
  porsche911gt3rs: "dominus",
  porsche911turbo: "dominus",
  porsche911turborle: "dominus",
  primo: "hybrid",
  psyclops: "octane",
  quadraturbor: "breakout",
  ram1500rho: "hybrid",
  recoilav: "merc",
  redline: "breakout",
  revolver: "breakout",
  rivianr1s: "hybrid",
  scorpion: "dominus",
  shokunin: "octane",
  shokuningxt: "octane",
  stampede: "merc",
  teslacybertruck: "hybrid",
  themysterymachine: "merc",
  theincredibile: "breakout",
  turtlevan: "merc",
  voidburn: "hybrid",
  volkswagengolfgti: "octane",
  volkswagengolfgtirle: "octane",
  xentari: "octane",
  zefira: "dominus",
  breakoutx: "breakout",
  nexus: "breakout",
  nexussc: "breakout",
  whiplash: "breakout",
  "007sastonmartindbs": "dominus",
  "007sastonmartinvalhalla": "dominus",
  batmobile2022: "dominus",
  chikara: "dominus",
  chikarag1: "dominus",
  chikaragxt: "dominus",
  ecto1: "dominus",
  ecto1ghostbusters: "dominus",
  fastfuriousdodgechargersrthellcat: "dominus",
  gazellagthotwheels: "dominus",
  kittknightrider: "dominus",
  lamborghinihuracnsto: "dominus",
  mr11hotwheels: "dominus",
  nascarchevroletcamaro: "dominus",
  nascarfordmustang: "dominus",
  nascartoyotacamry: "dominus",
  nascarnextgenchevroletcamaro: "dominus",
  nascarnextgenchevroletcamaro2022: "dominus",
  nascarnextgenfordmustang: "dominus",
  nascarnextgenfordmustang2022: "dominus",
  nascarnextgentoyotacamry: "dominus",
  nascarnextgentoyotacamry2022: "dominus",
  nemesis: "dominus",
  peregrinett: "dominus",
  perigrinett: "dominus",
  ronin: "dominus",
  roning1: "dominus",
  roningxt: "dominus",
  samusgunship: "dominus",
  samusgunshipnintendoexclusive: "dominus",
  tyranno: "dominus",
  tyrannogxt: "dominus",
  insidio: "hybrid",
  jager619: "hybrid",
  jger619: "hybrid",
  jger619rs: "hybrid",
  r3mx: "hybrid",
  r3mxgxt: "hybrid",
  tygris: "hybrid",
  nomad: "merc",
  nomadgxt: "merc",
  "007sastonmartindb5": "octane",
  armadillo: "octane",
  armadilloxboxexclusive: "octane",
  boneshaker: "octane",
  dingo: "octane",
  fast4wdhotwheels: "octane",
  harbinger: "octane",
  harbingergxt: "octane",
  hogsticker: "octane",
  hogstickerxboxexclusive: "octane",
  sweettooth: "octane",
  sweettoothplaystationexclusive: "octane",
  thedarkknighttumbler: "octane",
  batmobile2016: "plank",
  sentinel: "plank"
};
function va(n) {
  const e = {};
  for (const [t, i] of n)
    for (const a of t)
      e[a] = i;
  return e;
}
const Ma = va([
  [
    [
      22,
      1416,
      1894,
      1932,
      3031,
      3311,
      6243,
      6489,
      7651,
      7696,
      7890,
      7901,
      8006,
      8360,
      8361,
      8565,
      8566,
      8669,
      9357,
      10697,
      10698,
      10817,
      10822,
      11038,
      11394,
      11505,
      11677,
      11800,
      11933,
      11949,
      12173,
      12315,
      12361,
      12484
    ],
    "breakout"
  ],
  [
    [
      29,
      403,
      597,
      600,
      1018,
      1171,
      1286,
      1675,
      1689,
      1883,
      2070,
      2268,
      2666,
      2950,
      2951,
      3155,
      3156,
      3157,
      3265,
      3426,
      3875,
      3879,
      3880,
      4014,
      4155,
      4367,
      4472,
      4473,
      4745,
      4770,
      4781,
      4861,
      4864,
      5709,
      5773,
      5823,
      5858,
      5964,
      5979,
      6122,
      6244,
      6247,
      6260,
      6836,
      7211,
      7337,
      7338,
      7341,
      7343,
      7415,
      7512,
      7532,
      7593,
      7772,
      8454,
      9053,
      9088,
      9089,
      9140,
      9388,
      9894,
      10094,
      10440,
      10441,
      10694,
      10695,
      11016,
      11095,
      11315,
      11336,
      11534,
      11941,
      11996,
      12106,
      12142,
      12262,
      12286,
      12325,
      12382,
      12563,
      12669
    ],
    "dominus"
  ],
  [
    [
      28,
      31,
      1159,
      1317,
      1624,
      1856,
      2269,
      3451,
      3582,
      3702,
      5470,
      5488,
      5879,
      7012,
      9084,
      9085,
      9427,
      10044,
      10805,
      11138,
      11141,
      11379,
      11932,
      12569,
      12652
    ],
    "hybrid"
  ],
  [[30, 4780, 7336, 7477, 7815, 7979, 10689, 11098, 11736, 11905, 11950, 12318, 12335], "merc"],
  [
    [
      21,
      23,
      25,
      26,
      27,
      402,
      404,
      523,
      607,
      625,
      723,
      1172,
      1295,
      1300,
      1475,
      1478,
      1533,
      1568,
      1623,
      2665,
      2853,
      2919,
      2949,
      4284,
      4318,
      4319,
      4320,
      4782,
      4906,
      5020,
      5039,
      5188,
      5361,
      5547,
      5713,
      5837,
      5951,
      6939,
      7947,
      7948,
      8383,
      8806,
      8807,
      10896,
      10897,
      10900,
      10901,
      11314,
      11603,
      12104,
      12105
    ],
    "octane"
  ],
  [[24, 803, 1603, 1691, 1919, 3594, 3614, 3622, 4268, 5265, 7052, 8524], "plank"]
]);
function di(n) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function mi(n) {
  if (!n)
    return null;
  switch (di(n)) {
    case "breakout":
      return "breakout";
    case "dominus":
      return "dominus";
    case "hybrid":
      return "hybrid";
    case "merc":
      return "merc";
    case "octane":
      return "octane";
    case "batmobile":
    case "plank":
      return "plank";
    default:
      return null;
  }
}
function ui(n) {
  return n ? wa[di(n)] ?? null : null;
}
function Ta(n) {
  return mi(n) ?? ui(n);
}
function pi(n) {
  return xa[n];
}
function Ye(n, e) {
  if (!(!n || typeof n != "object")) {
    if ("Str" in n && typeof n.Str == "string") {
      e.push(n.Str);
      return;
    }
    if ("Name" in n && typeof n.Name == "string") {
      e.push(n.Name);
      return;
    }
    if ("Byte" in n && n.Byte && typeof n.Byte == "object") {
      const t = n.Byte;
      typeof t.kind == "string" && e.push(t.kind), typeof t.value == "string" && e.push(t.value);
      return;
    }
    if ("Struct" in n && n.Struct && typeof n.Struct == "object") {
      const t = n.Struct;
      if (typeof t.name == "string" && e.push(t.name), Array.isArray(t.fields))
        for (const i of t.fields)
          Array.isArray(i) && (typeof i[0] == "string" && e.push(i[0]), Ye(i[1], e));
      return;
    }
    if ("Array" in n && Array.isArray(n.Array)) {
      for (const t of n.Array)
        if (Array.isArray(t))
          for (const i of t)
            Array.isArray(i) && (typeof i[0] == "string" && e.push(i[0]), Ye(i[1], e));
    }
  }
}
function fi(n) {
  const e = mi(n?.car_hitbox_family);
  if (e)
    return e;
  const t = n?.car_body_id;
  if (typeof t == "number") {
    const o = Ma[t];
    if (o)
      return o;
  }
  const i = ui(n?.car_body_name);
  if (i)
    return i;
  const a = n?.stats;
  if (!a)
    return ft;
  const s = [];
  for (const [o, r] of Object.entries(a))
    s.push(o), Ye(r, s);
  for (const o of s) {
    const r = Ta(o);
    if (r)
      return r;
  }
  return ft;
}
function U(n) {
  const [e, t] = Object.entries(n)[0] ?? ["Unknown", "unknown"];
  return typeof t == "string" || typeof t == "number" ? `${e}:${t}` : t && typeof t == "object" ? `${e}:${JSON.stringify(t)}` : `${e}:${JSON.stringify(t)}`;
}
function se(n, e) {
  return Math.max(0, n - e);
}
function Ae(n) {
  return new Map(n.map((e) => [e.id, e]));
}
const j = 70, gt = 73, Ca = 3072, Sa = 4096, _a = 1792, Pa = 4184, Ea = 940, Ia = 3308, Aa = 2816, yt = 3584, za = 2484, Ba = 1788, Da = 2300, ka = 2048, Fa = 1036, Ra = 1024, Oa = 1024, La = 4240, it = 34;
function Pe(n, e, t, i, a) {
  n.push({
    index: n.length,
    padId: null,
    size: a,
    position: { x: e, y: t, z: i },
    events: []
  });
}
function Ee(n, e, t, i, a) {
  Pe(n, -e, t, i, a), Pe(n, e, t, i, a);
}
function Ne(n, e, t, i, a) {
  Pe(n, e, -t, i, a), Pe(n, e, t, i, a);
}
function ae(n, e, t, i, a) {
  Ee(n, e, -t, i, a), Ee(n, e, t, i, a);
}
function gi() {
  const n = [];
  return Ne(n, 0, La, j, "small"), ae(n, _a, Pa, j, "small"), ae(n, Ca, Sa, gt, "big"), ae(n, Ea, Ia, j, "small"), Ne(n, 0, Aa, j, "small"), ae(n, yt, za, j, "small"), ae(n, Ba, Da, j, "small"), ae(n, ka, Fa, j, "small"), Ne(n, 0, Oa, j, "small"), Ee(n, yt, 0, gt, "big"), Ee(n, Ra, 0, j, "small"), n;
}
function pe(n) {
  if (n === "Available")
    return !0;
  if (n && typeof n == "object") {
    if ("Available" in n)
      return !0;
    if ("PickedUp" in n)
      return !1;
    const e = n.kind;
    if (e === "Available")
      return !0;
    if (e === "PickedUp")
      return !1;
  }
  return null;
}
function yi(n) {
  return n === "big" || n === "Big" ? "big" : n === "small" || n === "Small" ? "small" : null;
}
function bi(n) {
  let e = null;
  for (const t of n) {
    const i = pe(t.kind);
    if (i === !1) {
      e = t.time;
      continue;
    }
    if (i === !0 && e !== null)
      return t.time - e >= 7 ? "big" : "small";
  }
  return null;
}
function Va(n, e, t, i) {
  const a = Ae(e), s = /* @__PURE__ */ new Map();
  for (const c of n.boost_pad_events ?? []) {
    if (pe(c.kind) === null) {
      i?.advance();
      continue;
    }
    const m = s.get(c.pad_id);
    m ? m.push(c) : s.set(c.pad_id, [c]), i?.advance();
  }
  const o = n.boost_pads;
  if (!o || o.length === 0)
    return i?.advance(it), gi();
  const r = [...o].sort((c, d) => c.index - d.index), l = new Array(r.length);
  for (let c = 0; c < r.length; c += 1) {
    const d = r[c], m = typeof d.pad_id == "string" ? d.pad_id : null, u = m ? [...s.get(m) ?? []] : [], p = yi(d.size) ?? bi(u) ?? (d.position.z >= 72 ? "big" : "small"), f = u.sort((y, x) => y.time - x.time), g = new Array(f.length);
    for (let y = 0; y < f.length; y += 1) {
      const x = f[y], v = x.player ? U(x.player) : null;
      g[y] = {
        time: se(x.time, t),
        frame: x.frame,
        available: pe(x.kind) ?? !0,
        playerId: v,
        playerName: v ? a.get(v)?.name ?? v : null
      };
    }
    l[c] = {
      index: d.index,
      padId: m,
      size: p,
      position: d.position,
      events: g
    }, i?.advance();
  }
  return l;
}
async function Na(n, e, t, i) {
  const a = Ae(e), s = /* @__PURE__ */ new Map();
  for (const c of n.boost_pad_events ?? []) {
    if (pe(c.kind) === null) {
      i.advance() && await i.yieldToMainThread();
      continue;
    }
    const m = s.get(c.pad_id);
    m ? m.push(c) : s.set(c.pad_id, [c]), i.advance() && await i.yieldToMainThread();
  }
  const o = n.boost_pads;
  if (!o || o.length === 0)
    return i.advance(it) && await i.yieldToMainThread(), gi();
  const r = [...o].sort((c, d) => c.index - d.index), l = new Array(r.length);
  for (let c = 0; c < r.length; c += 1) {
    const d = r[c], m = typeof d.pad_id == "string" ? d.pad_id : null, u = m ? [...s.get(m) ?? []] : [], p = yi(d.size) ?? bi(u) ?? (d.position.z >= 72 ? "big" : "small"), f = u.sort((y, x) => y.time - x.time), g = new Array(f.length);
    for (let y = 0; y < f.length; y += 1) {
      const x = f[y], v = x.player ? U(x.player) : null;
      g[y] = {
        time: se(x.time, t),
        frame: x.frame,
        available: pe(x.kind) ?? !0,
        playerId: v,
        playerName: v ? a.get(v)?.name ?? v : null
      };
    }
    l[c] = {
      index: d.index,
      padId: m,
      size: p,
      position: d.position,
      events: g
    }, i.advance() && await i.yieldToMainThread();
  }
  return l;
}
function at(n) {
  return Number.isInteger(n.frame) && n.frame >= 0 ? n.frame : null;
}
function Ga(n, e) {
  if (typeof n.time == "number" && Number.isFinite(n.time))
    return n.time;
  const t = at(n);
  if (t === null)
    return null;
  const i = e.frame_data.metadata_frames[t]?.time;
  return typeof i == "number" && Number.isFinite(i) ? i : null;
}
function $a(n, e) {
  return `bookmark:${at(n) ?? "unknown"}:${n.description || "tick-mark"}:${e}`;
}
function xi(n, e, t) {
  return (n.replay_tick_marks ?? []).flatMap((i, a) => {
    t?.advance();
    const s = Ga(i, n);
    return s === null ? [] : [
      {
        id: $a(i, a),
        description: i.description,
        frame: at(i),
        time: se(s, e)
      }
    ];
  });
}
function wi(n) {
  const e = n.description.trim() || "Replay bookmark";
  return {
    id: n.id,
    time: n.time,
    seekTime: n.time,
    frame: n.frame ?? void 0,
    kind: "bookmark",
    label: e,
    shortLabel: "BM",
    iconName: "bookmark"
  };
}
const J = {
  distance: 270,
  height: 100,
  pitch: -4,
  fov: 110
}, Ha = 5e-3, Wa = Number.POSITIVE_INFINITY, Ua = 16, ja = !0, Ka = 0.15, Xa = 10, Ya = 0.1, qa = 10;
function bt(n) {
  const e = Math.hypot(n.x, n.y, n.z);
  return e < 1e-6 ? null : {
    x: n.x / e,
    y: n.y / e,
    z: n.z / e
  };
}
function vi(n) {
  const e = Math.hypot(n.x, n.y, n.z, n.w);
  return e < 1e-6 ? null : {
    x: n.x / e,
    y: n.y / e,
    z: n.z / e,
    w: n.w / e
  };
}
function xt(n, e) {
  return {
    w: n.w * e.w - n.x * e.x - n.y * e.y - n.z * e.z,
    x: n.w * e.x + n.x * e.w + n.y * e.z - n.z * e.y,
    y: n.w * e.y - n.x * e.z + n.y * e.w + n.z * e.x,
    z: n.w * e.z + n.x * e.y - n.y * e.x + n.z * e.w
  };
}
function wt(n, e) {
  const t = xt(
    xt(e, {
      x: n.x,
      y: n.y,
      z: n.z,
      w: 0
    }),
    {
      x: -e.x,
      y: -e.y,
      z: -e.z,
      w: e.w
    }
  );
  return {
    x: t.x,
    y: t.y,
    z: t.z
  };
}
function Mi(n) {
  if (n === "Empty")
    return {
      position: null,
      linearVelocity: null,
      angularVelocity: null,
      rotation: null
    };
  const e = n.Data.rigid_body;
  return {
    position: e.location,
    linearVelocity: e.linear_velocity ?? null,
    angularVelocity: e.angular_velocity ?? null,
    rotation: vi(e.rotation)
  };
}
function vt(n) {
  return n == null ? null : Math.max(-1, Math.min(1, (n - 128) / 128));
}
function Mt(n) {
  return n == null ? null : (n > 127 ? n - 256 : n) * Math.PI / 128;
}
function Tt(n) {
  return n ? { x: n[0], y: n[1], z: n[2] } : null;
}
const Za = {
  cameraPitch: null,
  cameraYaw: null,
  throttle: null,
  steer: null,
  dodgeImpulse: null,
  dodgeTorque: null
};
function Ti(n) {
  if (n === "Empty")
    return {
      isPresent: !1,
      position: null,
      linearVelocity: null,
      angularVelocity: null,
      rotation: null,
      forward: null,
      up: null,
      boostAmount: 0,
      boostFraction: 0,
      boostActive: !1,
      powerslideActive: !1,
      jumpActive: !1,
      doubleJumpActive: !1,
      dodgeActive: !1,
      ...Za
    };
  const e = n.Data.rigid_body, t = vi(e.rotation), i = t ? bt(wt({ x: 1, y: 0, z: 0 }, t)) : null, a = t ? bt(wt({ x: 0, y: 0, z: 1 }, t)) : null, s = n.Data.camera, o = n.Data.input;
  return {
    isPresent: !0,
    position: e.location,
    linearVelocity: e.linear_velocity ?? null,
    angularVelocity: e.angular_velocity ?? null,
    rotation: t,
    forward: i,
    up: a,
    boostAmount: n.Data.boost_amount,
    boostFraction: Math.max(0, Math.min(1, n.Data.boost_amount / 255)),
    boostActive: n.Data.boost_active,
    powerslideActive: n.Data.powerslide_active,
    jumpActive: n.Data.jump_active,
    doubleJumpActive: n.Data.double_jump_active,
    dodgeActive: n.Data.dodge_active,
    cameraPitch: Mt(s?.pitch),
    cameraYaw: Mt(s?.yaw),
    throttle: vt(o?.throttle),
    steer: vt(o?.steer),
    dodgeImpulse: Tt(o?.dodge_impulse),
    dodgeTorque: Tt(o?.dodge_torque)
  };
}
function Qa(n) {
  return n.position !== null;
}
function Ja(n) {
  return {
    ...n,
    isPresent: !1,
    linearVelocity: null,
    angularVelocity: null,
    boostActive: !1,
    powerslideActive: !1,
    jumpActive: !1,
    doubleJumpActive: !1,
    dodgeActive: !1,
    // Camera look angles carry forward across a brief gap, but transient
    // vehicle inputs reset to neutral so wheels/flips don't freeze mid-turn
    // while the player has no data.
    throttle: null,
    steer: null,
    dodgeImpulse: null,
    dodgeTorque: null
  };
}
function Ci(n) {
  let e = null, t = null;
  for (let i = 0; i < n.length; i += 1) {
    const a = n[i];
    if (Qa(a)) {
      if (t !== null && e) {
        const s = Ja(e);
        for (let o = t; o < i; o += 1)
          n[o] = s;
      }
      e = a, t = null;
    } else e && t === null && (t = i);
  }
}
function en(n, e) {
  return Math.hypot(n.x - e.x, n.y - e.y, n.z - e.z);
}
function ce(n) {
  return { x: n.x, y: n.y, z: n.z };
}
function Ct(n) {
  return !!(n && "isPresent" in n && n.isPresent === !1);
}
function Ie(n, e, t) {
  if (!t.motionSmoothing || e.length < 3 || n.length < 3)
    return;
  let i = 0;
  for (; i < e.length && (!e[i]?.position || !e[i]?.linearVelocity || Ct(e[i])); )
    i += 1;
  if (i >= e.length - 1)
    return;
  let a = ce(e[i].position);
  for (let s = i + 1; s < e.length; s += 1) {
    const o = e[s - 1], r = e[s];
    if (!o.position || !r.position || Ct(r))
      continue;
    if (!o.linearVelocity || !r.linearVelocity) {
      a = ce(r.position);
      continue;
    }
    const l = n[s], c = n[s - 1], d = l && c ? l.time - c.time : 0;
    if (d <= 0 || d > Ya) {
      a = ce(r.position);
      continue;
    }
    if (en(a, r.position) > qa) {
      a = ce(r.position);
      continue;
    }
    const m = {
      x: (o.linearVelocity.x + r.linearVelocity.x) / 2,
      y: (o.linearVelocity.y + r.linearVelocity.y) / 2,
      z: (o.linearVelocity.z + r.linearVelocity.z) / 2
    }, u = {
      x: a.x + m.x * d,
      y: a.y + m.y * d,
      z: a.z + m.z * d
    }, p = (s - i) % t.smoothingAnchorInterval === 0 ? 0.5 : t.smoothingBlendFactor;
    a = {
      x: u.x * (1 - p) + r.position.x * p,
      y: u.y * (1 - p) + r.position.y * p,
      z: u.z * (1 - p) + r.position.z * p
    }, r.position = ce(a);
  }
}
function Si(n) {
  return {
    motionSmoothing: n.motionSmoothing ?? ja,
    smoothingBlendFactor: n.smoothingBlendFactor ?? Ka,
    smoothingAnchorInterval: Math.max(
      1,
      n.smoothingAnchorInterval ?? Xa
    )
  };
}
function St() {
  return typeof performance > "u" ? Date.now() : performance.now();
}
function tn() {
  return new Promise((n) => setTimeout(n, 0));
}
function an(n) {
  const e = n.meta.team_zero.length + n.meta.team_one.length, t = n.frame_data.players.reduce(
    (o, [, r]) => o + r.frames.length,
    0
  ), i = n.boost_pads?.length ?? it, a = n.boost_pad_events?.length ?? 0, s = (n.goal_events?.length ?? 0) + (n.player_stat_events?.length ?? 0) + (n.demolish_infos?.length ?? 0) + (n.replay_tick_marks?.length ?? 0);
  return [
    Math.max(1, n.frame_data.metadata_frames.length),
    Math.max(1, e),
    Math.max(1, t),
    Math.max(1, n.frame_data.ball_data.frames.length),
    Math.max(1, i + a),
    Math.max(1, s)
  ].reduce((o, r) => o + r, 0);
}
function nn(n) {
  const e = n.frame_data.players.reduce(
    (t, [, i]) => t + i.frames.length,
    0
  );
  return [
    Math.max(1, n.frame_data.metadata_frames.length),
    Math.max(1, e),
    Math.max(1, n.frame_data.ball_data.frames.length)
  ].reduce((t, i) => t + i, 0);
}
function _i(n, e, t = {}) {
  const i = an(n), a = nn(n);
  let s = 0, o = 0, r = -1, l = -1, c = St();
  const d = t.yieldEveryMs ?? Number.POSITIVE_INFINITY, m = t.progressReportMinDelta ?? Ha, u = Math.max(
    1,
    t.progressReportFrameInterval ?? Wa
  ), p = () => {
    if (!e)
      return !1;
    const g = Math.max(0, Math.min(1, s / i));
    if (g <= r)
      return !1;
    const x = o - l >= u;
    return g >= 1 || g - r >= m || x ? (r = g, l = o, e(g, {
      progress: g,
      processedFrames: Math.min(o, a),
      totalFrames: a,
      processedUnits: s,
      totalUnits: i
    }), !0) : !1;
  }, f = (g = !1) => {
    const y = St();
    return !g && y - c < d ? !1 : (c = y, !0);
  };
  return p(), {
    advance(g = 1) {
      if (g <= 0)
        return !1;
      s = Math.min(i, s + g);
      const y = p();
      return f(y);
    },
    advanceFrame(g = 1) {
      if (g <= 0)
        return !1;
      o = Math.min(a, o + g), s = Math.min(i, s + g);
      const y = p();
      return f(y);
    },
    finish() {
      s = i, o = a, p();
    }
  };
}
function sn(n, e) {
  return {
    ..._i(n, e.onProgress, {
      progressReportMinDelta: e.progressReportMinDelta,
      progressReportFrameInterval: e.progressReportFrameInterval,
      yieldEveryMs: e.yieldEveryMs ?? Ua
    }),
    yieldToMainThread: e.yieldToMainThread ?? tn
  };
}
function on(n, e) {
  const t = n.frame_data.metadata_frames;
  if (t.length === 0)
    return e?.advanceFrame(), [];
  const i = t[0]?.time ?? 0, a = new Array(t.length);
  for (let s = 0; s < t.length; s += 1) {
    const o = t[s];
    a[s] = {
      time: o.time - i,
      secondsRemaining: o.seconds_remaining,
      gameState: o.replicated_game_state_name,
      kickoffCountdown: o.replicated_game_state_time_remaining
    }, e?.advanceFrame();
  }
  return a;
}
async function rn(n, e) {
  const t = n.frame_data.metadata_frames;
  if (t.length === 0)
    return e.advanceFrame() && await e.yieldToMainThread(), [];
  const i = t[0]?.time ?? 0, a = new Array(t.length);
  for (let s = 0; s < t.length; s += 1) {
    const o = t[s];
    a[s] = {
      time: o.time - i,
      secondsRemaining: o.seconds_remaining,
      gameState: o.replicated_game_state_name,
      kickoffCountdown: o.replicated_game_state_time_remaining
    }, e.advanceFrame() && await e.yieldToMainThread();
  }
  return a;
}
function Pi(n, e, t, i) {
  return e.has(n) ? !0 : t.has(n) ? !1 : i && i !== "Empty" && typeof i.Data.is_team_0 == "boolean" ? i.Data.is_team_0 : !0;
}
function ln(n) {
  return n ? Object.entries(n) : [];
}
function ee(n, e) {
  const t = n.find(([i]) => i === e)?.[1];
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function Ei(n) {
  const e = ln(n?.stats);
  return {
    fov: ee(e, "CameraFOV") ?? J.fov,
    height: ee(e, "CameraHeight") ?? J.height,
    pitch: ee(e, "CameraPitch") ?? J.pitch,
    distance: ee(e, "CameraDistance") ?? J.distance,
    stiffness: ee(e, "CameraStiffness") ?? J.stiffness,
    swivelSpeed: ee(e, "CameraSwivelSpeed") ?? J.swivelSpeed,
    transitionSpeed: ee(e, "CameraTransitionSpeed") ?? J.transitionSpeed
  };
}
function cn(n, e) {
  const t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = [...n.meta.team_zero, ...n.meta.team_one];
  if (a.length === 0)
    return e?.advance(), { byId: t, byName: i };
  for (const s of a)
    i.set(s.name, s), s.remote_id && t.set(U(s.remote_id), s), e?.advance();
  return { byId: t, byName: i };
}
async function hn(n, e) {
  const t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = [...n.meta.team_zero, ...n.meta.team_one];
  if (a.length === 0)
    return e.advance() && await e.yieldToMainThread(), { byId: t, byName: i };
  for (const s of a)
    i.set(s.name, s), s.remote_id && t.set(U(s.remote_id), s), e.advance() && await e.yieldToMainThread();
  return { byId: t, byName: i };
}
function Ii(n) {
  const e = /* @__PURE__ */ new Map();
  for (const [t, i] of n.player_camera_events ?? [])
    e.set(
      U(t),
      i.map((a) => ({
        frame: a.frame,
        ballCamActive: a.ball_cam_active,
        behindViewActive: a.behind_view_active,
        driving: a.driving
      }))
    );
  return e;
}
function dn(n, e) {
  const t = new Set(n.meta.team_zero.map((l) => l.name)), i = new Set(n.meta.team_one.map((l) => l.name)), a = cn(n, e), s = Ii(n), o = [];
  let r = 0;
  for (const [l, c] of n.frame_data.players) {
    const d = new Array(c.frames.length);
    let m;
    for (let g = 0; g < c.frames.length; g += 1) {
      const y = c.frames[g];
      m === void 0 && y !== "Empty" && (m = y), d[g] = Ti(y), r += 1, e?.advanceFrame();
    }
    Ci(d);
    const u = U(l), p = m !== void 0 && m.Data.player_name ? m.Data.player_name : a.byId.get(u)?.name ?? u, f = a.byId.get(u) ?? a.byName.get(p);
    o.push({
      id: u,
      name: p,
      isTeamZero: Pi(p, t, i, m),
      cameraSettings: Ei(f),
      hitbox: pi(fi(f)),
      frames: d,
      cameraEvents: s.get(u) ?? []
    });
  }
  return r === 0 && e?.advanceFrame(), o;
}
async function mn(n, e) {
  const t = new Set(n.meta.team_zero.map((l) => l.name)), i = new Set(n.meta.team_one.map((l) => l.name)), a = await hn(n, e), s = Ii(n), o = [];
  let r = 0;
  for (const [l, c] of n.frame_data.players) {
    const d = new Array(c.frames.length);
    let m;
    for (let g = 0; g < c.frames.length; g += 1) {
      const y = c.frames[g];
      m === void 0 && y !== "Empty" && (m = y), d[g] = Ti(y), r += 1, e.advanceFrame() && await e.yieldToMainThread();
    }
    Ci(d);
    const u = U(l), p = m !== void 0 && m.Data.player_name ? m.Data.player_name : a.byId.get(u)?.name ?? u, f = a.byId.get(u) ?? a.byName.get(p);
    o.push({
      id: u,
      name: p,
      isTeamZero: Pi(p, t, i, m),
      cameraSettings: Ei(f),
      hitbox: pi(fi(f)),
      frames: d,
      cameraEvents: s.get(u) ?? []
    });
  }
  return r === 0 && e.advanceFrame() && await e.yieldToMainThread(), o;
}
function un(n, e) {
  const t = n.frame_data.ball_data.frames;
  if (t.length === 0)
    return e?.advanceFrame(), [];
  const i = new Array(t.length);
  for (let a = 0; a < t.length; a += 1)
    i[a] = Mi(t[a]), e?.advanceFrame();
  return i;
}
async function pn(n, e) {
  const t = n.frame_data.ball_data.frames;
  if (t.length === 0)
    return e.advanceFrame() && await e.yieldToMainThread(), [];
  const i = new Array(t.length);
  for (let a = 0; a < t.length; a += 1)
    i[a] = Mi(t[a]), e.advanceFrame() && await e.yieldToMainThread();
  return i;
}
function nt(n, e, t) {
  return `${n}:${e}:${t}`;
}
function Ai(n) {
  return n.sort((e, t) => e.time !== t.time ? e.time - t.time : (e.frame ?? 0) - (t.frame ?? 0));
}
function zi(n, e, t) {
  const i = n.player ? U(n.player) : null, a = i ? e.get(i)?.name ?? i : null, s = a ? `${a} scored` : "Goal";
  return {
    id: nt("goal", n.frame, i ?? "team"),
    time: se(n.time, t),
    frame: n.frame,
    kind: "goal",
    label: s,
    shortLabel: "G",
    playerId: i,
    playerName: a,
    isTeamZero: n.scoring_team_is_team_0
  };
}
function Bi(n, e, t) {
  const i = U(n.player), a = e.get(i)?.name ?? i, s = n.kind.toLowerCase(), o = n.kind === "Shot" ? "shot" : n.kind === "Save" ? "save" : "assist", r = n.kind === "Shot" ? "SH" : n.kind === "Save" ? "SV" : "A";
  return {
    id: nt(s, n.frame, i),
    time: se(n.time, t),
    frame: n.frame,
    kind: s,
    label: `${a} ${o}`,
    shortLabel: r,
    playerId: i,
    playerName: a,
    location: n.shot?.shot_touch_position ?? n.shot?.ball_position ?? null,
    shot: n.shot ?? null,
    isTeamZero: n.is_team_0
  };
}
function Di(n, e, t) {
  const i = U(n.attacker), a = U(n.victim), s = e.get(i), o = e.get(a);
  return {
    id: nt("demo", n.frame, `${i}:${a}`),
    time: se(n.time, t),
    frame: n.frame,
    kind: "demo",
    label: `${s?.name ?? i} demoed ${o?.name ?? a}`,
    shortLabel: "D",
    playerId: i,
    playerName: s?.name ?? i,
    secondaryPlayerId: a,
    secondaryPlayerName: o?.name ?? a,
    location: n.victim_location,
    isTeamZero: s?.isTeamZero ?? null
  };
}
function fn(n, e, t, i, a) {
  const s = Ae(e), o = [];
  for (const r of n.goal_events ?? [])
    o.push(zi(r, s, i)), a?.advance();
  for (const r of n.player_stat_events ?? [])
    o.push(Bi(r, s, i)), a?.advance();
  for (const r of n.demolish_infos ?? [])
    o.push(Di(r, s, i)), a?.advance();
  for (const r of t)
    o.push(wi(r));
  return o.length === 0 && a?.advance(), Ai(o);
}
async function gn(n, e, t, i, a) {
  const s = Ae(e), o = [];
  for (const r of n.goal_events ?? [])
    o.push(zi(r, s, i)), a.advance() && await a.yieldToMainThread();
  for (const r of n.player_stat_events ?? [])
    o.push(Bi(r, s, i)), a.advance() && await a.yieldToMainThread();
  for (const r of n.demolish_infos ?? [])
    o.push(Di(r, s, i)), a.advance() && await a.yieldToMainThread();
  for (const r of t)
    o.push(wi(r));
  return o.length === 0 && a.advance() && await a.yieldToMainThread(), Ai(o);
}
function sl(n, e = {}) {
  const t = _i(n, e.onProgress, {
    progressReportMinDelta: e.progressReportMinDelta,
    progressReportFrameInterval: e.progressReportFrameInterval
  }), i = n.frame_data.metadata_frames[0]?.time ?? 0, a = on(n, t), s = dn(n, t), o = un(n, t), r = Si(e);
  Ie(a, o, r);
  for (const m of s)
    Ie(a, m.frames, r);
  const l = Va(n, s, i, t), c = xi(n, i, t), d = fn(n, s, c, i, t);
  return t.finish(), {
    frameCount: a.length,
    duration: a.at(-1)?.time ?? 0,
    rawStartTime: i,
    frames: a,
    ballFrames: o,
    boostPads: l,
    players: s,
    tickMarks: c,
    timelineEvents: d,
    teamZeroNames: n.meta.team_zero.map((m) => m.name),
    teamOneNames: n.meta.team_one.map((m) => m.name)
  };
}
async function yn(n, e = {}) {
  const t = sn(n, e), i = n.frame_data.metadata_frames[0]?.time ?? 0, a = await rn(n, t), s = await mn(n, t), o = await pn(n, t), r = Si(e);
  Ie(a, o, r);
  for (const m of s)
    Ie(a, m.frames, r);
  const l = await Na(n, s, i, t), c = xi(n, i, t), d = await gn(
    n,
    s,
    c,
    i,
    t
  );
  return t.finish(), {
    frameCount: a.length,
    duration: a.at(-1)?.time ?? 0,
    rawStartTime: i,
    frames: a,
    ballFrames: o,
    boostPads: l,
    players: s,
    tickMarks: c,
    timelineEvents: d,
    teamZeroNames: n.meta.team_zero.map((m) => m.name),
    teamOneNames: n.meta.team_one.map((m) => m.name)
  };
}
function fe(n, e) {
  if (n.frames.length === 0)
    return 0;
  let t = 0, i = n.frames.length - 1;
  for (; t <= i; ) {
    const a = Math.floor((t + i) / 2), s = n.frames[a]?.time ?? 0;
    if (s < e)
      t = a + 1;
    else if (s > e)
      i = a - 1;
    else
      return a;
  }
  return Math.max(0, t - 1);
}
let Ge = null;
function me(n) {
  if (n instanceof Map)
    return Object.fromEntries(
      Array.from(n.entries()).map(([e, t]) => [e, me(t)])
    );
  if (Array.isArray(n))
    return n.map((e) => me(e));
  if (n && typeof n == "object") {
    const e = {};
    for (const [t, i] of Object.entries(n))
      e[t] = me(i);
    return e;
  }
  return n;
}
async function bn() {
  if (!Ge) {
    const n = _e.default;
    Ge = typeof n == "function" ? n() : Promise.resolve();
  }
  await Ge;
}
function xn(n) {
  return n.useWorker !== void 0 ? n.useWorker && typeof Worker < "u" : typeof Worker < "u";
}
function wn(n) {
  return n instanceof Error ? n : new Error(String(n));
}
function vn(n = 100) {
  return typeof requestAnimationFrame != "function" ? Promise.resolve() : new Promise((e) => {
    let t = !1, i = null;
    const a = () => {
      t || (t = !0, i !== null && clearTimeout(i), e());
    };
    i = setTimeout(a, n), requestAnimationFrame(() => a());
  });
}
async function Mn(n, e) {
  const t = new Worker(new URL(
    /* @vite-ignore */
    "" + new URL("assets/wasm.worker-Cg4SXYvi.js", import.meta.url).href,
    import.meta.url
  ), {
    type: "module"
  }), i = n.slice();
  return new Promise((a, s) => {
    const o = () => {
      t.terminate();
    };
    t.onmessage = async (l) => {
      const c = l.data;
      if (c.type === "progress") {
        e.onProgress?.(c.progress);
        return;
      }
      if (c.type === "error") {
        o(), s(new Error(c.error));
        return;
      }
      o();
      try {
        e.onProgress?.({ stage: "decoding-replay", progress: 0 }), await vn();
        const d = new TextDecoder(), m = JSON.parse(
          d.decode(new Uint8Array(c.rawBuffer))
        );
        e.onProgress?.({ stage: "decoding-replay", progress: 0.5 });
        const u = JSON.parse(
          d.decode(new Uint8Array(c.replayBuffer))
        );
        e.onProgress?.({ stage: "decoding-replay", progress: 1 }), a({
          raw: m,
          replay: u
        });
      } catch (d) {
        s(wn(d));
      }
    }, t.onerror = (l) => {
      o(), s(new Error(l.message || "Replay loading worker failed"));
    };
    const r = {
      type: "load-replay",
      bytes: i.buffer,
      reportEveryNFrames: e.reportEveryNFrames ?? 1e3,
      motionSmoothing: e.motionSmoothing,
      smoothingBlendFactor: e.smoothingBlendFactor,
      smoothingAnchorInterval: e.smoothingAnchorInterval
    };
    t.postMessage(r, [i.buffer]);
  });
}
async function ze(n, e = {}) {
  if (xn(e))
    return Mn(n, e);
  await bn(), e.onProgress?.({ stage: "validating", progress: 0 });
  const t = Tn(n);
  if (!t.valid)
    throw new Error(t.error ?? "Replay validation failed");
  e.onProgress?.({ stage: "processing", progress: 0 });
  const i = me(
    e.onProgress ? _e.get_replay_frames_data_with_progress(
      n,
      (s) => {
        e.onProgress?.(s);
      },
      e.reportEveryNFrames ?? 1e3
    ) : _e.get_replay_frames_data(n)
  );
  e.onProgress?.({ stage: "normalizing", progress: 0 });
  const a = await yn(i, {
    motionSmoothing: e.motionSmoothing,
    smoothingBlendFactor: e.smoothingBlendFactor,
    smoothingAnchorInterval: e.smoothingAnchorInterval,
    onProgress(s) {
      e.onProgress?.({ stage: "normalizing", progress: s });
    }
  });
  return {
    raw: i,
    replay: a
  };
}
function Tn(n) {
  return me(
    _e.validate_replay(n)
  );
}
async function Be(n) {
  return ze(n, { useWorker: !1 });
}
async function ol(n) {
  const { raw: e } = await Be(n);
  return e;
}
class ki {
  _listeners = /* @__PURE__ */ new Map();
  on(e, t) {
    let i = this._listeners.get(e);
    return i || (i = /* @__PURE__ */ new Set(), this._listeners.set(e, i)), i.add(t), this;
  }
  once(e, t) {
    const i = (...a) => {
      this.off(e, i), t(...a);
    };
    return this.on(e, i);
  }
  off(e, t) {
    const i = this._listeners.get(e);
    return i ? (t ? i.delete(t) : i.clear(), i.size === 0 && this._listeners.delete(e), this) : this;
  }
  removeListener(e, t) {
    return this.off(e, t);
  }
  removeAllListeners(e) {
    return e ? this._listeners.delete(e) : this._listeners.clear(), this;
  }
  emit(e, ...t) {
    const i = this._listeners.get(e);
    if (!i || i.size === 0) return !1;
    for (const a of [...i]) a(...t);
    return !0;
  }
}
function $e(n) {
  return n ? { x: n.x, y: n.z, z: n.y } : null;
}
function Cn(n) {
  return n ? { x: n.x, y: n.z, z: n.y, w: -n.w } : null;
}
function Sn(n) {
  return n * 100 / 255;
}
const _t = {
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
}, _n = {
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
}, Pn = _n;
function Fi(n) {
  const e = Pn[String(n)];
  return e ? { name: e.name, hitboxType: e.hitbox } : null;
}
function En(n) {
  if (!n) return null;
  const e = {
    fov: n.fov,
    height: n.height,
    angle: n.angle,
    distance: n.distance,
    stiffness: n.stiffness,
    swivelSpeed: n.swivel_speed
  };
  return n.transition_speed != null && (e.transitionSpeed = n.transition_speed), e;
}
const In = 2200, An = !0, zn = !1, Bn = 0.15, Dn = 10, kn = 0.1, Fn = 10, Rn = 0.1, On = 0.15, Ln = 10;
function he(n, e) {
  if (n.length === 0) return null;
  let t = 0, i = n.length - 1;
  if (e <= n[0].time) return n[0];
  if (e >= n[i].time) return n[i];
  for (; t < i; ) {
    const a = t + i + 1 >> 1;
    n[a].time <= e ? t = a : i = a - 1;
  }
  return n[t];
}
class Vn {
  position = { x: 0, y: 0, z: 0 };
  rotation = { x: 0, y: 0, z: 0, w: 1 };
  velocity = { x: 0, y: 0, z: 0 };
  angularVelocity = { x: 0, y: 0, z: 0 };
  sleeping = !1;
  visible = !0;
}
class Nn {
  constructor(e, t, i) {
    this.isBig = e, this.position = t, this.events = i;
  }
  isAvailable = !0;
}
class Gn extends ki {
  constructor(e, t, i, a, s, o = null) {
    super(), this.id = e, this.name = t, this.team = i, this.carName = a, this.hitboxType = s, this.cameraSettings = o;
  }
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
class Ri extends ki {
  constructor(e, t = {}) {
    super(), this.raw = e, this.options = t, this._compile();
  }
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
  ball = new Vn();
  players = /* @__PURE__ */ new Map();
  boostPads = /* @__PURE__ */ new Map();
  _currentTime = 0;
  _ballTimeline = [];
  _playerTimelines = {};
  _ballFlags = [];
  // ball has none, kept for symmetry
  _playerFlags = {};
  /** Coalesced ball-cam change timeline per player name (last-before on seek). */
  _playerCameraEvents = {};
  _teams = {};
  _timelineCompaction = null;
  // ── Compilation: raw ReplayData -> ballcam-space timelines + entities. ──────
  _compile() {
    const e = this.raw.frame_data, t = this.raw.meta, i = e.metadata_frames, a = i[0]?.time ?? 0;
    this.rawStartTime = a;
    const s = (l) => Math.max(0, l - a);
    this.duration = i.length ? s(i[i.length - 1].time) : 0, this.frameTimes = i.map((l) => s(l.time));
    const o = /* @__PURE__ */ new Map();
    t.team_zero.forEach((l) => o.set(this._idKey(l.remote_id), { info: l, team: 0 })), t.team_one.forEach((l) => o.set(this._idKey(l.remote_id), { info: l, team: 1 })), e.ball_data.frames.forEach((l, c) => {
      if (l === "Empty" || !("Data" in l)) return;
      const d = this._rbToKeyframe(l.Data.rigid_body, s(i[c]?.time ?? a), c);
      d && this._ballTimeline.push(d);
    }), e.players.forEach(([l, c]) => {
      const d = this._idKey(l), m = o.get(d);
      let u = m?.info.name ?? null, p = m?.team ?? 0;
      if (!u) {
        for (const C of c.frames)
          if (C !== "Empty" && "Data" in C && C.Data.player_name) {
            u = C.Data.player_name, C.Data.is_team_0 != null && (p = C.Data.is_team_0 ? 0 : 1);
            break;
          }
      }
      u || (u = `Player_${d}`);
      const f = m?.info, g = f?.car_body_id != null ? Fi(f.car_body_id) : null, y = f?.car_body_name ?? g?.name ?? "Octane", x = f?.car_hitbox_family ?? g?.hitboxType ?? "Octane", v = [], b = [];
      c.frames.forEach((C, w) => {
        const S = s(i[w]?.time ?? a);
        if (C === "Empty" || !("Data" in C)) return;
        const E = this._rbToKeyframe(C.Data.rigid_body, S, w);
        E && v.push(E);
        const B = C.Data.input?.steer;
        b.push({
          time: S,
          boost: Sn(C.Data.boost_amount ?? 0),
          isBoosting: !!C.Data.boost_active,
          present: !0,
          // ReplicatedSteer is a byte (~128 neutral); normalize to -1..1 for
          // the renderer's wheel steering (ActorManager scales by max angle).
          steer: B == null ? 0 : Math.max(-1, Math.min(1, (B - 128) / 128))
        });
      });
      const M = En(f?.camera_settings);
      this._playerTimelines[u] = v, this._playerFlags[u] = b, this._teams[u] = p, this.playerList.push({ id: d, name: u, team: p, carName: y, hitboxType: x, cameraSettings: M }), this.players.set(
        u,
        new Gn(d, u, p, y, x, M)
      );
    });
    const r = /* @__PURE__ */ new Map();
    this.playerList.forEach((l) => r.set(l.id, l.name));
    for (const [l, c] of this.raw.player_camera_events ?? []) {
      const d = r.get(this._idKey(l));
      d && (this._playerCameraEvents[d] = c.map((m) => ({
        time: s(i[m.frame]?.time ?? a),
        ballCam: m.ball_cam_active
      })));
    }
    this._preprocessMotionTimelines(), this._compileBoostPads(), this.seek(0);
  }
  _timelineProcessingOptions() {
    return {
      motionSmoothing: this.options.motionSmoothing ?? An,
      smoothingBlendFactor: this.options.smoothingBlendFactor ?? Bn,
      smoothingAnchorInterval: this.options.smoothingAnchorInterval ?? Dn,
      timelineCompaction: this.options.timelineCompaction ?? zn,
      disableFrameFiltering: this.options.disableFrameFiltering ?? !1
    };
  }
  _preprocessMotionTimelines() {
    const e = this._timelineProcessingOptions();
    e.motionSmoothing && this._applyVelocityBasedPositionCorrection(e), e.timelineCompaction && this._applyTimelineCompaction(), e.disableFrameFiltering || this._filterInconsistentFrames();
  }
  _applyTimelineCompaction() {
    const e = this._buildTimelineCompaction();
    !e || e.gaps.length === 0 && e.prematchEndTime === null || (this._timelineCompaction = e, this._ballTimeline = this._compactTimeline(this._ballTimeline, e), Object.entries(this._playerTimelines).forEach(([t, i]) => {
      this._playerTimelines[t] = this._compactTimeline(i, e);
    }), Object.entries(this._playerFlags).forEach(([t, i]) => {
      this._playerFlags[t] = this._compactTimeline(i, e);
    }), this.frameTimes = this.frameTimes.map((t) => this._compactTime(t, e)), this.duration = e.compactedDuration);
  }
  _buildTimelineCompaction() {
    if (this.frameTimes.length === 0) return null;
    const e = this._detectPostGoalTimeGaps(), t = this._detectFirstKickoffGoTime(), i = t == null ? null : de(t, e), s = e.reduce((o, r) => o + r.duration, 0) + (i ?? 0);
    return s <= 0 ? null : {
      gaps: e,
      prematchEndTime: i,
      removedDuration: s,
      compactedDuration: Math.max(0, this.duration - s)
    };
  }
  _detectPostGoalTimeGaps() {
    const e = [];
    for (const t of this.raw.goal_events ?? []) {
      const i = t.frame;
      if (!Number.isInteger(i) || i < 0 || i >= this.frameTimes.length)
        continue;
      const a = this.frameTimes[i];
      for (let s = i + 1; s < this.frameTimes.length; s += 1) {
        const o = this.frameTimes[s - 1], r = this.frameTimes[s];
        if (o - a > 10) break;
        const l = r - o;
        if (l > 0.3) {
          e.push({
            beforeFrame: s - 1,
            afterFrame: s,
            beforeTime: o,
            afterTime: r,
            duration: l
          });
          break;
        }
      }
    }
    return e;
  }
  _detectFirstKickoffGoTime() {
    const e = this.raw.frame_data.metadata_frames;
    let t = !1;
    for (let a = 0; a < e.length; a += 1) {
      const s = e[a]?.replicated_game_state_time_remaining;
      if (s != null && s > 0 && (t = !0), t && s === 0) return this.frameTimes[a] ?? null;
    }
    const i = e.findIndex((a) => a.replicated_game_state_name === 54);
    return i === -1 ? null : this.frameTimes[i] ?? null;
  }
  _compactTimeline(e, t) {
    const i = this._remapReplayGaps(e, t.gaps);
    return t.prematchEndTime === null ? i : this._remapPrematch(i, t.prematchEndTime);
  }
  _remapReplayGaps(e, t) {
    if (t.length === 0) return e;
    const i = [];
    t.forEach((s, o) => {
      const r = e.find((l) => l.time >= s.afterTime);
      r && i.push({
        ...r,
        time: de(s.afterTime, t.slice(0, o + 1))
      });
    });
    const a = e.filter((s) => !It(s.time, t)).map((s) => ({ ...s, time: de(s.time, t) }));
    for (const s of i) {
      if (a.some((r) => Math.abs(r.time - s.time) < 1e-3)) continue;
      let o = a.findIndex((r) => r.time > s.time);
      o === -1 && (o = a.length), a.splice(o, 0, s);
    }
    return a;
  }
  _remapPrematch(e, t) {
    let i = null;
    for (const s of e)
      if (s.time < t) i = s;
      else break;
    const a = e.filter((s) => s.time >= t).map((s) => ({ ...s, time: s.time - t }));
    return i && (a.length === 0 || a[0].time > 1e-3) && a.unshift({ ...i, time: 0 }), a;
  }
  _compactTime(e, t) {
    const i = de(e, t.gaps);
    return t.prematchEndTime === null ? i : Math.max(0, i - t.prematchEndTime);
  }
  _applyVelocityBasedPositionCorrection(e) {
    const t = (i) => {
      if (i.length < 3) return;
      let a = 0;
      for (; a < i.length && (!i[a].position || !i[a].velocity); )
        a += 1;
      if (a >= i.length - 1) return;
      let s = { ...i[a].position };
      for (let o = a + 1; o < i.length; o += 1) {
        const r = i[o - 1], l = i[o];
        if (!r.position || !l.position) continue;
        if (!r.velocity || !l.velocity) {
          s = { ...l.position };
          continue;
        }
        const c = l.time - r.time;
        if (c <= 0 || c > kn) {
          s = { ...l.position };
          continue;
        }
        if (Et(s, l.position) > Fn) {
          s = { ...l.position };
          continue;
        }
        const d = {
          x: (r.velocity.x + l.velocity.x) / 2,
          y: (r.velocity.y + l.velocity.y) / 2,
          z: (r.velocity.z + l.velocity.z) / 2
        }, m = {
          x: s.x + d.x * c,
          y: s.y + d.y * c,
          z: s.z + d.z * c
        }, u = (o - a) % e.smoothingAnchorInterval === 0 ? 0.5 : e.smoothingBlendFactor;
        s = {
          x: m.x * (1 - u) + l.position.x * u,
          y: m.y * (1 - u) + l.position.y * u,
          z: m.z * (1 - u) + l.position.z * u
        }, l.position = { ...s };
      }
    };
    t(this._ballTimeline), Object.values(this._playerTimelines).forEach(t);
  }
  _filterInconsistentFrames() {
    this._ballTimeline = this._filterInconsistentTimeline(this._ballTimeline), Object.entries(this._playerTimelines).forEach(([e, t]) => {
      this._playerTimelines[e] = this._filterInconsistentTimeline(t);
    });
  }
  _filterInconsistentTimeline(e) {
    if (e.length < 2) return e;
    const t = [e[0]];
    let i = 0;
    for (let a = 1; a < e.length; a += 1) {
      const s = e[a], o = e[i];
      if (!s.position || !s.velocity || !o.position || !o.velocity) {
        t.push(s), i = a;
        continue;
      }
      const r = Pt(o.velocity), l = Pt(s.velocity);
      if (r < Ln) {
        t.push(s), i = a;
        continue;
      }
      if (Math.abs(l - r) / r < Rn) {
        const c = s.time - o.time;
        if (c > 1e-3) {
          const d = r * c, m = Et(o.position, s.position), u = Math.abs(m - d) / d;
          if (Number.isFinite(u) && u > On)
            continue;
        }
      }
      t.push(s), i = a;
    }
    return t;
  }
  /**
   * subtr-actor resolves the standard soccar pad layout (with replay pad ids
   * when known) and emits exact pickup/availability events; fold the events
   * into per-pad timelines so seek() can resolve `isAvailable` at any time.
   */
  _compileBoostPads() {
    const e = /* @__PURE__ */ new Map();
    (this.raw.boost_pad_events ?? []).forEach((t) => {
      const i = t.kind === "Available" ? !0 : t.kind && typeof t.kind == "object" && "PickedUp" in t.kind ? !1 : null;
      if (i === null) return;
      const a = Math.max(0, t.time - this.rawStartTime);
      if (this._timelineCompaction && this._isRemovedByTimelineCompaction(a)) return;
      const s = this._timelineCompaction ? this._compactTime(a, this._timelineCompaction) : a, o = e.get(t.pad_id);
      o ? o.push({ time: s, available: i }) : e.set(t.pad_id, [{ time: s, available: i }]);
    }), (this.raw.boost_pads ?? []).forEach((t) => {
      const i = (t.pad_id ? e.get(t.pad_id) : void 0) ?? [];
      i.sort((a, s) => a.time - s.time), this.boostPads.set(t.index, new Nn(t.size === "Big", t.position, i));
    });
  }
  _rbToKeyframe(e, t, i) {
    const a = $e(e.location);
    return a ? {
      time: t,
      frame: i,
      position: a,
      rotation: Cn(e.rotation),
      velocity: $e(e.linear_velocity) ?? { x: 0, y: 0, z: 0 },
      angularVelocity: $e(e.angular_velocity),
      sleeping: !!e.sleeping
    } : null;
  }
  _isRemovedByTimelineCompaction(e) {
    const t = this._timelineCompaction;
    if (!t) return !1;
    if (It(e, t.gaps)) return !0;
    const i = de(e, t.gaps);
    return t.prematchEndTime !== null && i < t.prematchEndTime;
  }
  _idKey(e) {
    if (typeof e == "string" || typeof e == "number") return String(e);
    if (e && typeof e == "object") {
      const [t, i] = Object.entries(e)[0] ?? ["Unknown", "unknown"];
      return typeof i == "string" || typeof i == "number" ? `${t}:${i}` : `${t}:${JSON.stringify(i)}`;
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
    const t = he(this._ballTimeline, e);
    t && (this.ball.position = t.position, this.ball.rotation = t.rotation ?? this.ball.rotation, this.ball.velocity = t.velocity, this.ball.angularVelocity = t.angularVelocity ?? { x: 0, y: 0, z: 0 }, this.ball.sleeping = t.sleeping, this.ball.visible = !0);
    for (const [i, a] of this.players) {
      const s = he(this._playerTimelines[i] ?? [], e);
      if (s) {
        a.position = s.position, a.rotation = s.rotation ?? a.rotation, a.velocity = s.velocity, a.angularVelocity = s.angularVelocity ?? { x: 0, y: 0, z: 0 }, a.sleeping = s.sleeping;
        const c = s.velocity;
        a.isSupersonic = Math.hypot(c.x, c.y, c.z) >= In;
      }
      const o = he(this._playerFlags[i] ?? [], e);
      o && (a.boost = o.boost, a.isBoosting = o.isBoosting, a.steer = o.steer);
      const r = he(this._playerCameraEvents[i] ?? [], e);
      r && r.ballCam != null && (a.isBallCam = r.ballCam);
      const l = this._playerTimelines[i] ?? [];
      a.isVisible = l.length > 0 && e >= l[0].time - 1e-3 && e <= l[l.length - 1].time + 1;
    }
    for (const i of this.boostPads.values()) {
      if (i.events.length === 0) continue;
      const a = he(i.events, e);
      i.isAvailable = a && a.time <= e ? a.available : !0;
    }
  }
  /** Index of the last frame at or before `time` (binary search over frameTimes). */
  frameIndexAt(e) {
    const t = this.frameTimes;
    if (t.length === 0 || e <= t[0]) return 0;
    let i = 0, a = t.length - 1;
    if (e >= t[a]) return a;
    for (; i < a; ) {
      const s = i + a + 1 >> 1;
      t[s] <= e ? i = s : a = s - 1;
    }
    return i;
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
function Pt(n) {
  return Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
}
function Et(n, e) {
  const t = e.x - n.x, i = e.y - n.y, a = e.z - n.z;
  return Math.sqrt(t * t + i * i + a * a);
}
function de(n, e) {
  let t = 0;
  for (const i of e) {
    if (n < i.beforeTime) break;
    if (n >= i.afterTime) {
      t += i.duration;
      continue;
    }
    return i.beforeTime - t;
  }
  return n - t;
}
function It(n, e) {
  return e.some((t) => n > t.beforeTime && n < t.afterTime);
}
let st = null;
function $n() {
  return typeof document < "u" && document.baseURI ? document.baseURI : typeof window < "u" && window.location?.href ? window.location.href : import.meta.url;
}
function Hn() {
  return "./";
}
function Wn(n) {
  return /^[a-z][a-z\d+\-.]*:/i.test(n) || n.startsWith("//");
}
function rl(n) {
  st = n == null ? null : String(n);
}
function Un(n = st) {
  const e = n == null || n === "" ? Hn() : String(n);
  return new URL(e, $n()).href;
}
function G(n, e = st) {
  const t = String(n);
  return Wn(t) ? t : new URL(t.replace(/^\/+/, ""), Un(e)).href;
}
class jn {
  constructor(e, t = {}) {
    if (this.container = typeof e == "string" ? document.getElementById(e) : e, this.assetBase = t.assetBase, !this.container) {
      console.error("Invalid container passed to SceneManager");
      return;
    }
    this.scene = new h.Scene(), this.scene.background = new h.Color(8900331);
    const i = this.container.clientWidth, a = this.container.clientHeight;
    this.camera = new h.PerspectiveCamera(75, i / a, 10, 5e4), this.camera.position.set(0, 2e3, 5e3), this.renderer = new h.WebGLRenderer({
      antialias: !0,
      preserveDrawingBuffer: t.preserveDrawingBuffer === !0
    }), this.renderer.setSize(i, a), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = h.PCFSoftShadowMap, this.renderer.toneMapping = h.ACESFilmicToneMapping, this.renderer.toneMappingExposure = 1, this.renderer.outputColorSpace = h.SRGBColorSpace, this.container.appendChild(this.renderer.domElement), window.addEventListener("resize", () => this.onWindowResize());
  }
  /**
   * Asset-free default lighting. The original ballcam app lit everything via
   * an HDR skybox (scene.environment -> IBL on the PBR materials); those HDRs
   * were never vendored into this package, so without this the scene renders
   * nearly black. RoomEnvironment + PMREM gives equivalent neutral IBL from
   * code, and a directional key light adds definition.
   */
  initDefaultEnvironment() {
    if (!this._neutralEnvTexture) {
      const e = new h.PMREMGenerator(this.renderer);
      this._neutralEnvTexture = e.fromScene(new li(), 0.04).texture, e.dispose();
    }
    if (this.scene.environment = this._neutralEnvTexture, !this._defaultLightsAdded) {
      const e = new h.DirectionalLight(16777215, 1.5);
      e.position.set(3e3, 8e3, 4e3), this.scene.add(e);
      const t = new h.AmbientLight(16777215, 0.4);
      this.scene.add(t), this._defaultLightsAdded = !0;
    }
  }
  /**
   * Load and apply a {@link PlayerEnvironment}: an HDR skybox that drives both
   * the visible background and the image-based lighting (reflections/ambient) on
   * every PBR material. Async and non-blocking — call it without awaiting so the
   * neutral `initDefaultEnvironment()` lighting renders immediately and the HDR
   * swaps in once decoded. Resolves `true` on success, `false` on load failure
   * (the neutral default is left in place).
   *
   * @param {import("../environments.js").PlayerEnvironment} env
   * @returns {Promise<boolean>}
   */
  applyEnvironment(e) {
    return new Promise((t) => {
      const i = new ga(), a = G(e.skyboxUrl, this.assetBase);
      i.load(
        a,
        (s) => {
          this.scene.background && this.scene.background.dispose && this.scene.background.dispose(), s.mapping = h.EquirectangularReflectionMapping, this.scene.background = s, this.scene.environment = s, this.currentEnvironmentId = e.id;
          const o = e.rotation ?? {};
          this._skyboxBaseRotation = {
            x: h.MathUtils.degToRad(o.x ?? 0),
            y: h.MathUtils.degToRad(o.y ?? 0),
            z: h.MathUtils.degToRad(o.z ?? 0)
          }, this._skyboxAnimatedY = 0, this._skyboxAnimation = e.animation ?? null, this._applySkyboxRotation(), typeof e.exposure == "number" && (this.renderer.toneMappingExposure = e.exposure), console.log(`[SceneManager] environment applied: ${e.id}`), t(!0);
        },
        void 0,
        (s) => {
          console.error(`[SceneManager] Failed to load environment "${e.id}":`, s), t(!1);
        }
      );
    });
  }
  /** Apply base tilt + accumulated animation to background/environment rotation. */
  _applySkyboxRotation() {
    const e = this._skyboxBaseRotation;
    if (!e) return;
    const t = e.y + (this._skyboxAnimatedY ?? 0);
    this.scene.backgroundRotation && this.scene.backgroundRotation.set(e.x, t, e.z), this.scene.environmentRotation && this.scene.environmentRotation.set(e.x, t, e.z);
  }
  /**
   * Advance the slow skybox drift, if the active environment enables it. Cheap
   * no-op otherwise. `dt` is in seconds (already scaled by playback speed).
   */
  updateSkyboxAnimation(e) {
    const t = this._skyboxAnimation;
    !t || !t.enabled || !e || (this._skyboxAnimatedY = (this._skyboxAnimatedY ?? 0) + h.MathUtils.degToRad(t.speed * e), this._applySkyboxRotation());
  }
  /**
   * Revert to the neutral default: a flat background plus the asset-free
   * RoomEnvironment IBL (so PBR materials stay lit). Used when no environment is
   * selected (`environment: false`) or when switching away from an HDR skybox.
   */
  setDefaultBackground() {
    this.scene.background && this.scene.background.dispose && this.scene.background.dispose(), this.scene.background = new h.Color(1710638), this.initDefaultEnvironment(), this.renderer.toneMappingExposure = 1, this._skyboxAnimation = null, this._skyboxBaseRotation = null, this.currentEnvironmentId = null, console.log("[SceneManager] Using neutral default environment (no skybox)");
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
const He = /* @__PURE__ */ new Map();
async function Kn(n, e) {
  const t = G("models/stadium/stadium.glb", e);
  let i = He.get(t);
  return i || (i = n.loadAsync(t).then((a) => {
    const s = a.scene;
    return Xn(s), s;
  }).catch((a) => {
    throw He.delete(t), a;
  }), He.set(t, i)), i;
}
function Xn(n) {
  const e = [
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
  ], t = ["Glow", "Glass"], i = ["Plafond_Hexagone_T0", "Plafond_Hexagone_T1", "Plafond_Transparent"];
  n.traverse((a) => {
    if (!a.isMesh)
      return;
    a.receiveShadow = !0, a.castShadow = !i.includes(a.name), t.some(
      (o) => a.name.includes(o)
    ) && (console.log(`[ArenaManager] Disabling frustum culling for: ${a.name}`), a.frustumCulled = !1), a.material && /^Hexagone_T[01]$/.test(a.material.name ?? "") && (a.material = a.material.clone(), a.material.transparent = !0, a.material.opacity = 0.18, a.material.depthWrite = !1, a.renderOrder = 1), a.material && a.material.name === "bannière_pub" && (a.visible = !1), a.material && a.material.name === "Sol_Hexagone" && (a.material = a.material.clone(), a.material.color.setScalar(0.35), a.material.metalness = 0, a.material.roughness = 1), a.material && a.material.name && e.includes(a.material.name) && (console.log(
      `[ArenaManager] Fixing visibility for: ${a.name} (material: ${a.material.name})`
    ), a.material = a.material.clone(), a.material.side = h.DoubleSide, a.material.depthWrite = !1, a.renderOrder = 1, a.frustumCulled = !1);
  });
}
class Yn {
  constructor(e, t = {}) {
    this.scene = e, this.assetBase = t.assetBase, this.arenaMeshes = [], this.drawingCollider = null, this.drawingColliderMeshes = [], this.arenaDecorMesh = null, this.showArenaDecor = !0, this.dracoLoader = new ci(), this.dracoLoader.setDecoderPath(G("draco/", this.assetBase)), this.gltfLoader = new tt(), this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }
  async loadArenaMeshes() {
    try {
      console.log("Loading arena mesh...");
      const t = (await Kn(this.gltfLoader, this.assetBase)).clone(!0);
      t.traverse((i) => {
        i.isMesh && this.arenaMeshes.push(i);
      }), console.log(`[ArenaManager] Collected ${this.arenaMeshes.length} meshes for raycasting`), this.scene.add(t), console.log("Arena mesh loaded successfully with correct orientation");
    } catch (e) {
      console.error("Error loading arena mesh:", e);
      const t = new h.PlaneGeometry(10240, 8192), i = new h.MeshStandardMaterial({
        color: 3355443,
        side: h.DoubleSide
      }), a = new h.Mesh(t, i);
      a.rotation.x = -Math.PI / 2, a.receiveShadow = !0, this.scene.add(a), this.arenaMeshes.push(a);
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
      const i = await new ya().loadAsync(
        G("models/stadium/DrawingArena.obj", this.assetBase)
      );
      i.rotation.x = Math.PI / 2, i.rotation.y = Math.PI, i.scale.setScalar(0.99), i.position.y = 20, i.traverse((a) => {
        a.isMesh && (this.drawingColliderMeshes.push(a), a.castShadow = !1, a.receiveShadow = !1, e ? a.material = new h.MeshBasicMaterial({
          color: 65280,
          transparent: !0,
          opacity: 0.7,
          side: h.DoubleSide
        }) : a.material = new h.MeshBasicMaterial({
          visible: !1
        }));
      }), this.drawingCollider = i, this.scene.add(i), console.log(
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
      e ? t.material = new h.MeshBasicMaterial({
        color: 65280,
        wireframe: !0,
        transparent: !0,
        opacity: 0.5
      }) : t.material = new h.MeshBasicMaterial({
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
      const t = await this.gltfLoader.loadAsync(
        G("models/stadium/arene.glb", this.assetBase)
      );
      this.arenaDecorMesh = t.scene, this.showArenaDecor = e, this.arenaDecorMesh.traverse((i) => {
        i.isMesh && (i.receiveShadow = !0, i.castShadow = !0);
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
const qn = /* @__PURE__ */ new Map(), Zn = /* @__PURE__ */ new Map(), Qn = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new Map();
class es {
  constructor(e = {}) {
    this.assetBase = e.assetBase, this.fbxLoader = new ba(), this.gltfLoader = new tt(), this.textureLoader = new h.TextureLoader();
    const t = new ci();
    t.setDecoderPath(G("draco/", this.assetBase)), this.gltfLoader.setDRACOLoader(t), this.modelCache = qn, this.loadingPromises = Zn, this.modelConfig = {
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
    }, this.wheelModelCache = Qn, this.wheelLoadingPromises = Jn, this.preloadReady = Promise.resolve(), this._preloadStarted = !1, this.carNameToModel = {
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
      blue: new h.Color(26367),
      orange: new h.Color(16737792)
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
    for (const a of e) {
      const s = this.getModelTypeForCar(a.carName, a.hitboxType);
      t.add(s);
    }
    const i = [...t];
    return console.log(
      `[CarModelLoader] Preloading ${i.length} car models for replay: ${i.join(", ")}`
    ), this.preloadReady = this._preloadModels(i), this.preloadReady;
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
      } catch (i) {
        console.warn(`⚠️ Failed to preload ${t}:`, i.message);
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
    const t = this.modelCacheKey(e);
    if (this.modelCache.has(t))
      return this.modelCache.get(t);
    if (this.loadingPromises.has(t))
      return this.loadingPromises.get(t);
    const i = this._loadModelInternal(e);
    this.loadingPromises.set(t, i);
    try {
      const a = await i;
      return this.modelCache.set(t, a), a;
    } finally {
      this.loadingPromises.delete(t);
    }
  }
  modelCacheKey(e) {
    return G(`models/cars/${e}`, this.assetBase);
  }
  async _loadModelInternal(e) {
    const t = `models/cars/${e}`, i = this.modelConfig[e] || {
      format: "glb",
      file: `${e}.glb`,
      scale: 100,
      wheelSockets: !0,
      wheelModel: "Wheel_Boog.glb"
    };
    let a, s = null, o = null;
    if (i.format === "glb") {
      const l = G(`${t}/${i.file}`, this.assetBase);
      i.wheelSockets && i.wheelModel ? ([a, o] = await Promise.all([
        this._loadGLB(l),
        this.loadWheelModel(i.wheelModel)
      ]), console.log(`✓ Loaded GLB model with separate wheels: ${l}`)) : (a = await this._loadGLB(l), console.log(`✓ Loaded GLB model: ${l}`));
    } else {
      const l = G(`${t}/${i.file}.fbx`, this.assetBase), c = i.file, d = G(
        `${t}/${c}_engine.png`,
        this.assetBase
      );
      [a, s] = await Promise.all([
        this._loadFBX(l),
        this._loadTexture(d).catch((m) => (console.warn(`⚠️ Could not load texture ${d}:`, m.message), null))
      ]);
    }
    this._processModelMaterials(a, s, e, i.format);
    const r = this._calculateModelScale(a, e, i.scale);
    if (a.userData.scaleInfo = r, a.userData.format = i.format, i.wheelSockets) {
      a.userData.wheelSockets = !0, a.userData.wheelModelName = i.wheelModel;
      const l = this._findWheelSockets(a);
      a.userData.wheelSocketObjects = l, console.log(`🔌 Found ${Object.keys(l).length} wheel sockets`);
    }
    return { model: a, chassisTexture: s, wheelModel: o };
  }
  /**
   * Find wheel socket empty objects in the model
   * Expected names: Wheel_BL, Wheel_BR, Wheel_FL, Wheel_FR
   * (BackLeft, BackRight, FrontLeft, FrontRight)
   * @param {THREE.Group} model - The loaded model
   * @returns {Object} Map of socket name to socket object
   */
  _findWheelSockets(e) {
    const t = {}, i = ["Wheel_BL", "Wheel_BR", "Wheel_FL", "Wheel_FR"];
    console.log("🔍 Searching for wheel sockets..."), e.traverse((a) => {
      const s = a.name, o = s.toLowerCase();
      for (const r of i)
        (s === r || o === r.toLowerCase()) && (t[r] = a, console.log(
          `   Found socket: "${s}" at position (${a.position.x.toFixed(2)}, ${a.position.y.toFixed(2)}, ${a.position.z.toFixed(2)})`
        ));
    });
    for (const a of i)
      t[a] || console.warn(`   ⚠️ Missing wheel socket: ${a}`);
    return Object.keys(t).length === 0 && (console.warn("⚠️ No wheel sockets found! Listing all objects:"), e.traverse((a) => {
      console.log(`   - "${a.name}" (${a.type})`);
    })), t;
  }
  /**
   * Calculate the proper scale factor to match Rocket League hitbox dimensions
   * @param {THREE.Group} model - The loaded model
   * @param {string} modelType - 'octane', 'dominus', or 'fennec'
   * @param {number|null} overrideScale - If provided, use this scale directly (skip auto-calc)
   * @returns {{ scale: number, offsetX: number, offsetY: number }}
   */
  _calculateModelScale(e, t, i = null) {
    const a = new h.Box3().setFromObject(e), s = new h.Vector3();
    a.getSize(s), console.log(`📐 ${t.toUpperCase()} model dimensions (raw):`), console.log(`   Size: X=${s.x.toFixed(2)}, Y=${s.y.toFixed(2)}, Z=${s.z.toFixed(2)}`), console.log(`   Min Y: ${a.min.y.toFixed(2)}, Max Y: ${a.max.y.toFixed(2)}`);
    const o = this.HITBOX_DIMENSIONS[t] || this.HITBOX_DIMENSIONS.octane;
    let r;
    if (i !== null)
      r = i, console.log(`   Using override scale: ${r}`);
    else {
      const l = s.z, d = o.length * 1 / l;
      r = d * 0.55, console.log(`   Target RL: ${o.length} x ${o.width} x ${o.height} uu`), console.log(`   Scale to RL: ${d.toFixed(4)}, Final scale: ${r.toFixed(6)}`);
    }
    return { scale: r };
  }
  _loadFBX(e) {
    return new Promise((t, i) => {
      this.fbxLoader.load(
        e,
        (a) => t(a),
        void 0,
        (a) => i(new Error(`Failed to load FBX: ${e} - ${a.message}`))
      );
    });
  }
  _loadGLB(e) {
    return new Promise((t, i) => {
      this.gltfLoader.load(
        e,
        (a) => {
          t(a.scene);
        },
        void 0,
        (a) => i(new Error(`Failed to load GLB: ${e} - ${a.message}`))
      );
    });
  }
  /**
   * Load a wheel model for cars with separate wheels
   * @param {string} wheelModelName - The wheel model filename (e.g., 'Wheel_Boog.glb')
   * @returns {Promise<THREE.Group>}
   */
  async loadWheelModel(e) {
    const t = G(`models/wheels/${e}`, this.assetBase);
    if (this.wheelModelCache.has(t))
      return this.wheelModelCache.get(t);
    if (this.wheelLoadingPromises.has(t))
      return this.wheelLoadingPromises.get(t);
    const i = this._loadGLB(t);
    this.wheelLoadingPromises.set(t, i);
    try {
      const a = await i;
      return console.log(`✓ Loaded wheel model: ${e}`), a.traverse((s) => {
        s.isMesh && (s.castShadow = !0, s.receiveShadow = !0);
      }), this.wheelModelCache.set(t, a), a;
    } catch (a) {
      throw console.error(`Failed to load wheel model ${e}:`, a), a;
    } finally {
      this.wheelLoadingPromises.delete(t);
    }
  }
  _loadTexture(e) {
    return new Promise((t, i) => {
      this.textureLoader.load(
        e,
        (a) => {
          a.flipY = !1, a.colorSpace = h.SRGBColorSpace, t(a);
        },
        void 0,
        (a) => i(new Error(`Failed to load texture: ${e}`))
      );
    });
  }
  _processModelMaterials(e, t, i, a = "fbx") {
    console.log(`📦 Processing materials for ${i} (${a}):`);
    const s = ["body", "paint"], o = [];
    e.traverse((r) => {
      r.isLight && (o.push(r), console.log(`  🔦 Removing imported light: "${r.name || r.type}"`));
    }), o.forEach((r) => {
      r.parent && r.parent.remove(r);
    }), e.traverse((r) => {
      r.isMesh && (console.log(`  Mesh: "${r.name}"`), (Array.isArray(r.material) ? r.material : [r.material]).forEach((c, d) => {
        console.log(
          `    [${d}] Material: "${c.name}" - Color: #${c.color?.getHexString() || "none"}`
        );
        const m = (c.name || "").toLowerCase(), u = (r.name || "").toLowerCase(), p = s.some(
          (f) => m.includes(f) || u.includes(f)
        );
        if (a === "glb")
          (c.isMeshStandardMaterial || c.isMeshPhysicalMaterial) && (console.log(
            `      → GLB material (keeping as-is): metalness=${c.metalness?.toFixed(2)}, roughness=${c.roughness?.toFixed(2)}`
          ), c.userData.originalColor = c.color?.clone(), c.userData.isBodyMaterial = p);
        else if (c.isMeshPhongMaterial || c.isMeshLambertMaterial || c.isMeshBasicMaterial) {
          let f;
          p ? (f = new h.MeshStandardMaterial({
            color: c.color,
            map: c.map,
            metalness: 0.8,
            roughness: 0.15
          }), console.log("      → Body material: shiny metallic")) : (f = new h.MeshStandardMaterial({
            color: c.color,
            map: c.map,
            metalness: 0.1,
            roughness: 0.6
          }), console.log("      → Non-body material: matte")), f.name = c.name, Array.isArray(r.material) ? r.material[d] = f : r.material = f;
        }
      }));
    }), t ? console.log(`  ✓ Chassis texture loaded for ${i}`) : a === "fbx" && console.log(`  ⚠️ No chassis texture for ${i}`);
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
    const i = this.getModelTypeForHitbox(e);
    try {
      const a = await this.loadModel(i);
      if (!a || !a.model)
        return console.warn(`No cached model for ${i}`), null;
      const s = a.model.userData.format || "fbx";
      let o;
      s === "glb" ? (o = Ve(a.model), o.traverse((c) => {
        c.isMesh && (Array.isArray(c.material) ? c.material = c.material.map((d) => d.clone()) : c.material && (c.material = c.material.clone()));
      })) : o = a.model.clone(), this.applyTeamColor(o, t);
      const r = new h.Group(), l = a.model.userData.scaleInfo;
      return l && o.scale.setScalar(l.scale), r.add(o), o.traverse((c) => {
        c.isMesh && (c.castShadow = !0);
      }), r.userData.modelType = i, r.userData.hitboxType = e, r.userData.team = t, r.userData.isFBXModel = s === "fbx", r.userData.isGLBModel = s === "glb", r;
    } catch (a) {
      return console.error(`Failed to create car mesh for ${e}:`, a), null;
    }
  }
  /**
   * Apply team color to the car body material
   * @param {THREE.Group} carMesh - The car mesh group
   * @param {number} team - 0 for blue, 1 for orange
   */
  applyTeamColor(e, t) {
    const i = t === 0 ? this.TEAM_COLORS.blue : this.TEAM_COLORS.orange, a = ["body", "paint"];
    let s = !1;
    console.log("🔍 Analyzing car meshes for team coloring:"), e.traverse((o) => {
      if (o.isMesh) {
        const r = Array.isArray(o.material) ? o.material : [o.material];
        console.log(`  Mesh: "${o.name}" with ${r.length} material(s)`), r.forEach((l, c) => {
          console.log(
            `    [${c}] Material: "${l.name}", isBodyMaterial: ${l.userData?.isBodyMaterial}`
          );
        });
      }
    }), e.traverse((o) => {
      o.isMesh && (Array.isArray(o.material) ? o.material : [o.material]).forEach((l, c) => {
        const d = (l.name || "").toLowerCase(), m = (o.name || "").toLowerCase(), u = l.userData?.isBodyMaterial || a.some((p) => d.includes(p) || m.includes(p));
        if (console.log(`    Checking "${l.name}" on "${o.name}": isBody=${u}`), u) {
          s = !0;
          const p = l.clone();
          p.color = i.clone(), p.metalness = 0.39, p.roughness = 0.47, p.userData = { ...l.userData }, Array.isArray(o.material) ? o.material[c] = p : o.material = p, console.log(
            `🎨 Applied team color to: "${l.name}" on mesh "${o.name}" (index ${c})`
          );
        }
      });
    }), s || console.warn("⚠️ No body material found for team coloring! Check material names.");
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
    const i = this.getModelTypeForCar(e, t);
    return this.modelCache.has(this.modelCacheKey(i));
  }
  /**
   * Get a synchronous car mesh if available (returns null if not loaded)
   * @param {string} carName - The car name
   * @param {string} hitboxType - The hitbox type as fallback
   * @param {number} team - 0 for blue, 1 for orange
   * @returns {THREE.Group|null}
   */
  getCarMeshSync(e, t, i = 0) {
    const a = this.getModelTypeForCar(e, t), s = this.modelCache.get(this.modelCacheKey(a));
    if (!s || !s.model)
      return null;
    const o = s.model.userData.format || "fbx", r = s.model.userData.wheelSockets;
    let l;
    o === "glb" ? (l = Ve(s.model), l.traverse((m) => {
      m.isMesh && (Array.isArray(m.material) ? m.material = m.material.map((u) => u.clone()) : m.material && (m.material = m.material.clone()));
    })) : l = s.model.clone(), this.applyTeamColor(l, i);
    const c = new h.Group(), d = s.model.userData.scaleInfo;
    return d && l.scale.setScalar(d.scale), c.add(l), l.traverse((m) => {
      m.isMesh && (m.castShadow = !0);
    }), c.userData.modelType = a, c.userData.carName = e, c.userData.hitboxType = t, c.userData.team = i, c.userData.isFBXModel = o === "fbx", c.userData.isGLBModel = o === "glb", c.userData.hasWheelSockets = r, r ? c.userData.wheels = this._attachWheelsToSockets(l, s.wheelModel) : c.userData.wheels = this._findWheelMeshes(l), c;
  }
  /**
   * Attach wheel models to socket empty objects in the car model
   * Socket naming: Wheel_BL (BackLeft), Wheel_BR (BackRight), Wheel_FL (FrontLeft), Wheel_FR (FrontRight)
   * @param {THREE.Group} carModel - The cloned car model
   * @param {THREE.Group} wheelModelTemplate - The wheel model to clone and attach
   * @returns {Array<{mesh: THREE.Object3D, steeringPivot: THREE.Object3D|null, side: string, position: string}>}
   */
  _attachWheelsToSockets(e, t) {
    const i = [], a = {
      Wheel_FL: { side: "left", position: "front" },
      Wheel_FR: { side: "right", position: "front" },
      Wheel_BL: { side: "left", position: "rear" },
      Wheel_BR: { side: "right", position: "rear" }
    };
    if (!t)
      return console.warn("⚠️ No wheel model template available for socket attachment"), i;
    console.log("🔧 Attaching wheels to sockets...");
    const s = {};
    e.traverse((o) => {
      const r = o.name;
      a[r] && (s[r] = o);
    });
    for (const [o, r] of Object.entries(a)) {
      const l = s[o];
      if (!l) {
        console.warn(`   ⚠️ Socket not found: ${o}`);
        continue;
      }
      const c = Ve(t);
      c.traverse((d) => {
        d.isMesh && (Array.isArray(d.material) ? d.material = d.material.map((m) => m.clone()) : d.material && (d.material = d.material.clone()), d.castShadow = !0);
      }), c.position.set(0, 0, 0), c.rotation.set(0, 0, 0), l.add(c), console.log(
        `   ✓ Attached wheel to ${o} (${r.position} ${r.side})`
      ), i.push({
        mesh: c,
        steeringPivot: r.position === "front" ? l : null,
        side: r.side,
        position: r.position,
        socket: l
        // Keep reference to socket for debugging
      });
    }
    return console.log(`✓ Attached ${i.length} wheels to sockets`), i;
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
    const t = [], i = {
      fl: { side: "left", position: "front" },
      fr: { side: "right", position: "front" },
      rl: { side: "left", position: "rear" },
      rr: { side: "right", position: "rear" }
    };
    console.log("🔍 Searching for wheels in model...");
    const a = {};
    e.traverse((s) => {
      const r = s.name.toLowerCase().match(/^wheel_(fl|fr|rl|rr)_(y|z)$/);
      if (r) {
        const l = r[1], c = r[2];
        a[l] || (a[l] = {}), a[l][c] = s, console.log(
          `   Found: "${s.name}" (${c === "y" ? "wheel mesh" : "steering pivot"})`
        );
      }
    });
    for (const [s, o] of Object.entries(a)) {
      const r = i[s];
      if (!r) continue;
      const l = o.y, c = o.z;
      l && (s === "fr" && (l.rotation.z += Math.PI, console.log("   Fixed FR wheel orientation (rotation.z += PI)")), t.push({
        mesh: l,
        steeringPivot: r.position === "front" ? c : null,
        side: r.side,
        position: r.position
      }), console.log(
        `🛞 Wheel ${s.toUpperCase()}: mesh="${l.name}"${c && r.position === "front" ? `, steering="${c.name}"` : ""}`
      ));
    }
    return t.length === 0 ? (console.warn("⚠️ No wheel meshes found. Expected: Wheel_FL_Y, Wheel_FR_Y, etc."), console.warn("   Listing all objects in model:"), e.traverse((s) => {
      console.log(`   - "${s.name}" (${s.type})`);
    })) : console.log(`✓ Found ${t.length} wheels`), t;
  }
  dispose() {
  }
}
const ts = 2, We = /* @__PURE__ */ new Map();
function is(n) {
  const e = G("models/ball/scene.gltf", n);
  let t = We.get(e);
  if (!t) {
    const i = new tt();
    t = new Promise((a) => {
      i.load(
        e,
        (s) => {
          console.log("✓ Ball model loaded"), a(s.scene);
        },
        void 0,
        (s) => {
          console.error("Failed to load ball model:", s), We.delete(e), a(null);
        }
      );
    }), We.set(e, t);
  }
  return t;
}
class as {
  constructor(e, t, i = {}) {
    this.scene = e, this.effectsManager = t, this.assetBase = i.assetBase, this.actors = {}, this.ballActorId = null, this.ballIndicator = null, this.ballVerticalLine = null, this.playerNames = /* @__PURE__ */ new Set(), this.actorToPlayer = {}, this.actorLinks = {}, this.playerNameToCarActorId = {}, this.playerNameToPriActorId = {}, this.playerTeams = {}, this.actorLoadouts = {}, this.carBodyIds = {}, this.carModelLoader = new es({ assetBase: this.assetBase }), this.pendingCarReplacements = /* @__PURE__ */ new Map(), this._lastGoalScanTime = null, this._firedGoalTimes = /* @__PURE__ */ new Set(), this._p0 = new h.Vector3(), this._p1 = new h.Vector3(), this._v0 = new h.Vector3(), this._v1 = new h.Vector3(), this._nextRot = new h.Quaternion(), this._q0 = new h.Quaternion(), this._q1 = new h.Quaternion(), this._qResult = new h.Quaternion(), this.onPlayerFound = null, this.lastBallTouchTeam = 0, this.BALL_TOUCH_DISTANCE = 200, this.ballTimeline = [], this.playerTimelineMap = {}, this.timelineIndices = { ball: 0, players: {} }, this.interpolantsInitialized = !1, this.animationMixer = null, this.animationActions = {}, this.animationClock = new h.Clock(!1), this.replayDuration = 0, this.useAnimationSystem = !1, this.SMOOTHING_WINDOW = 5, this.positionBuffers = {}, this.rotationBuffers = {}, this.interpolationEnabled = !0, this.interpolationMethod = "lerp", this.smoothingWindowSize = 12, this.lastFrameInfo = null, this._lowPassState = /* @__PURE__ */ new Map(), this._lowPassAlpha = 0.3, this._predictState = /* @__PURE__ */ new Map(), this._predictCorrectionTime = 0.1, this._smoothingBuffers = /* @__PURE__ */ new Map(), this._adaptiveState = /* @__PURE__ */ new Map(), this.ballModel = null, this._ballModelReplaced = !1, this.ballModelReady = is(this.assetBase).then((a) => (this.ballModel = a, a !== null));
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
    const i = this.ballModel.clone();
    i.userData = t.userData, i.position.copy(t.position), i.quaternion.copy(t.quaternion), i.scale.copy(t.scale);
    const a = 92.75;
    i.scale.set(a, a, a), i.traverse((s) => {
      s.isMesh && (s.castShadow = !0, s.receiveShadow = !0);
    }), this.scene.remove(t), this.scene.add(i), t.geometry && t.geometry.dispose(), t.material && t.material.dispose(), this.actors[e] = i, console.log("✓ Ball replaced with GLTF model");
  }
  reset() {
    Object.values(this.actors).forEach((e) => {
      this.scene.remove(e), e.geometry && e.geometry.dispose(), e.material && e.material.dispose();
    }), this.actors = {}, this.ballActorId = null, this.ballIndicator && (this.scene.remove(this.ballIndicator), this.ballIndicator.geometry && this.ballIndicator.geometry.dispose(), this.ballIndicator.material && this.ballIndicator.material.dispose(), this.ballIndicator = null), this.ballVerticalLine && (this.scene.remove(this.ballVerticalLine), this.ballVerticalLine.geometry && this.ballVerticalLine.geometry.dispose(), this.ballVerticalLine.material && this.ballVerticalLine.material.dispose(), this.ballVerticalLine = null), this.actorToPlayer = {}, this.actorLinks = {}, this.playerNames.clear(), this.playerNameToCarActorId = {}, this.playerNameToPriActorId = {}, this.playerTeams = {}, this.actorLoadouts = {}, this.carBodyIds = {}, this.pendingCarReplacements.clear(), this._lastGoalScanTime = null, this._firedGoalTimes.clear(), this.ballTimeline = [], this.playerTimelineMap = {}, this.ballTimelineCorrected = [], this.playerTimelineMapCorrected = {}, this.ballTimelineFiltered = [], this.playerTimelineMapFiltered = {}, this.timelineIndices = { ball: 0, players: {} }, this.timelineIndicesFiltered = { ball: 0, players: {} }, this.timelineIndicesCorrected = { ball: 0, players: {} }, this.interpolantsInitialized = !1, this.animationMixer?.stopAllAction?.(), this.animationMixer = null, this.animationActions = {}, this.replayDuration = 0, this.positionBuffers = {}, this.rotationBuffers = {}, this._lowPassState.clear(), this._predictState.clear(), this._smoothingBuffers.clear(), this._adaptiveState.clear(), this._ballModelReplaced = !1;
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
    t.forEach((i, a) => {
      this._createCarMesh(
        i.name,
        i.team,
        a,
        i.carName,
        i.hitboxType
      );
      const s = this.playerNameToCarActorId[i.name];
      this.actors[s];
    }), console.log(`[ActorManager] Created ${t.length} car meshes + 1 ball`);
  }
  /**
   * Initialize interpolation system with timeline data
   * Uses Three.js AnimationMixer for smooth playback (handles variable frame deltas correctly)
   * @param {Object} timelines - { ballTimeline, playerTimelines } from framework
   */
  initInterpolants(e) {
    console.log("[ActorManager] Initializing interpolation system..."), this.ballTimeline = e.ballTimeline || [], this.playerTimelineMap = e.playerTimelines || {}, this.ballTimelineCorrected = this._correctTimeShiftedPositions(this.ballTimeline), this.playerTimelineMapCorrected = {}, Object.entries(this.playerTimelineMap).forEach(([a, s]) => {
      this.playerTimelineMapCorrected[a] = this._correctTimeShiftedPositions(s);
    }), this.ballTimelineFiltered = this._filterBadFrames(this.ballTimeline), this.playerTimelineMapFiltered = {}, Object.entries(this.playerTimelineMap).forEach(([a, s]) => {
      this.playerTimelineMapFiltered[a] = this._filterBadFrames(s);
    }), this.timelineIndices = {
      ball: 0,
      players: {}
    }, this.timelineIndicesFiltered = {
      ball: 0,
      players: {}
    }, this.timelineIndicesCorrected = {
      ball: 0,
      players: {}
    }, Object.keys(this.playerTimelineMap).forEach((a) => {
      this.timelineIndices.players[a] = 0, this.timelineIndicesFiltered.players[a] = 0, this.timelineIndicesCorrected.players[a] = 0;
    }), this.ballTimeline.length > 0 && (this.replayDuration = this.ballTimeline[this.ballTimeline.length - 1].time), this.useAnimationSystem && this._initAnimationSystem(), this.interpolantsInitialized = !0;
    const t = this.ballTimeline.length - this.ballTimelineFiltered.length, i = this.ballTimelineCorrected._correctedCount || 0;
    console.log(
      `  Ball: ${this.ballTimeline.length} keyframes (${i} corrected, ${t} filtered)`
    ), Object.entries(this.playerTimelineMap).forEach(([a, s]) => {
      const o = this.playerTimelineMapCorrected[a]?._correctedCount || 0;
      console.log(`  ${a}: ${s.length} keyframes (${o} corrected)`);
    }), console.log(`  Replay duration: ${this.replayDuration.toFixed(2)}s`), console.log("[ActorManager] Animation system ready");
  }
  /**
   * Initialize Three.js AnimationMixer and create KeyframeTracks for all entities
   * This is the recommended approach for smooth replay playback with variable frame deltas
   */
  _initAnimationSystem() {
    console.log("[ActorManager] Building Three.js animation clips..."), this.animationMixer = new h.AnimationMixer(this.scene);
    const e = this.actors[this.ballActorId];
    if (e && this.ballTimeline.length > 0) {
      const t = this._createAnimationClip("ball", this.ballTimeline, e);
      if (t) {
        const i = this.animationMixer.clipAction(t, e);
        i.setLoop(h.LoopOnce), i.clampWhenFinished = !0, this.animationActions.ball = i, console.log(`  ✓ Ball animation: ${t.duration.toFixed(2)}s`);
      }
    }
    Object.entries(this.playerTimelineMap).forEach(([t, i]) => {
      const a = this.playerNameToCarActorId[t], s = this.actors[a];
      if (s && i.length > 0) {
        const o = this._createAnimationClip(t, i, s);
        if (o) {
          const r = this.animationMixer.clipAction(o, s);
          r.setLoop(h.LoopOnce), r.clampWhenFinished = !0, this.animationActions[t] = r, console.log(`  ✓ ${t} animation: ${o.duration.toFixed(2)}s`);
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
  _createAnimationClip(e, t, i) {
    if (!t || t.length < 2) return null;
    const a = [], s = [], o = [], r = t[0];
    r.time > 0 && (a.push(0), r.position ? s.push(
      r.position.x,
      r.position.y,
      r.position.z
    ) : s.push(0, 0, 0), r.rotation ? o.push(
      r.rotation.x,
      r.rotation.y,
      r.rotation.z,
      r.rotation.w
    ) : o.push(0, 0, 0, 1));
    for (const u of t) {
      if (a.push(u.time), u.position)
        s.push(u.position.x, u.position.y, u.position.z);
      else {
        const p = s.length - 3;
        p >= 0 ? s.push(s[p], s[p + 1], s[p + 2]) : s.push(0, 0, 0);
      }
      if (u.rotation)
        o.push(
          u.rotation.x,
          u.rotation.y,
          u.rotation.z,
          u.rotation.w
        );
      else {
        const p = o.length - 4;
        p >= 0 ? o.push(
          o[p],
          o[p + 1],
          o[p + 2],
          o[p + 3]
        ) : o.push(0, 0, 0, 1);
      }
    }
    const l = new h.VectorKeyframeTrack(
      ".position",
      a,
      s,
      h.InterpolateLinear
    ), c = new h.QuaternionKeyframeTrack(
      ".quaternion",
      a,
      o
      // Quaternion tracks use SLERP by default
    ), d = a[a.length - 1] - a[0];
    return new h.AnimationClip(e, d, [l, c]);
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
    return !e || e.length < 4 ? e : e.filter((t, i) => i % 2 === 0);
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
    const i = this._getOrCreateSmoothingBuffer(e).positions;
    for (i.push({ x: t.x, y: t.y, z: t.z }); i.length > this.SMOOTHING_WINDOW; )
      i.shift();
    if (i.length === 1) return t;
    let a = 0, s = 0, o = 0;
    for (const r of i)
      a += r.x, s += r.y, o += r.z;
    return {
      x: a / i.length,
      y: s / i.length,
      z: o / i.length
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
    const i = this._getOrCreateSmoothingBuffer(e).rotations;
    for (i.push({ x: t.x, y: t.y, z: t.z, w: t.w }); i.length > this.SMOOTHING_WINDOW; )
      i.shift();
    if (i.length < 3) return t;
    const a = Math.floor(i.length / 2);
    return i[a];
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
  _findKeyframeIndex(e, t, i = 0) {
    if (!e || e.length === 0) return -1;
    if (t <= e[0].time) return 0;
    if (t >= e[e.length - 1].time) return e.length - 2;
    let a = Math.max(0, Math.min(i, e.length - 2));
    if (e[a].time <= t && e[a + 1].time > t)
      return a;
    if (a + 2 < e.length && e[a + 1].time <= t && e[a + 2].time > t)
      return a + 1;
    let s = 0, o = e.length - 2;
    for (; s <= o; ) {
      const r = Math.floor((s + o) / 2);
      if (e[r].time <= t && e[r + 1].time > t)
        return r;
      e[r].time > t ? o = r - 1 : s = r + 1;
    }
    return Math.max(0, Math.min(s, e.length - 2));
  }
  /**
   * Apply smoothing filter to a position (moving average)
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applySmoothing(e, t) {
    this._smoothingBuffers.has(e) || this._smoothingBuffers.set(e, []);
    const i = this._smoothingBuffers.get(e);
    for (i.push({ x: t.x, y: t.y, z: t.z }); i.length > this.smoothingWindowSize; )
      i.shift();
    if (i.length === 1) return t;
    let a = 0, s = 0, o = 0;
    for (const r of i)
      a += r.x, s += r.y, o += r.z;
    return {
      x: a / i.length,
      y: s / i.length,
      z: o / i.length
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
    const i = `ema-${e}`;
    if (!this._smoothingBuffers.has(i))
      return this._smoothingBuffers.set(i, { x: t.x, y: t.y, z: t.z }), t;
    const a = this._smoothingBuffers.get(i), s = Math.max(0.05, Math.min(0.5, 1 / this.smoothingWindowSize)), o = {
      x: s * t.x + (1 - s) * a.x,
      y: s * t.y + (1 - s) * a.y,
      z: s * t.z + (1 - s) * a.z
    };
    return this._smoothingBuffers.set(i, o), o;
  }
  /**
   * Apply double exponential smoothing (Holt's method)
   * Predicts trend and reduces lag while maintaining smoothness
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyDoubleEmaSmoothing(e, t) {
    const i = `dema-${e}`;
    if (!this._smoothingBuffers.has(i))
      return this._smoothingBuffers.set(i, {
        level: { x: t.x, y: t.y, z: t.z },
        trend: { x: 0, y: 0, z: 0 }
      }), t;
    const a = this._smoothingBuffers.get(i), s = Math.max(0.1, Math.min(0.6, 2 / this.smoothingWindowSize)), o = s * 0.5, r = {
      x: s * t.x + (1 - s) * (a.level.x + a.trend.x),
      y: s * t.y + (1 - s) * (a.level.y + a.trend.y),
      z: s * t.z + (1 - s) * (a.level.z + a.trend.z)
    }, l = {
      x: o * (r.x - a.level.x) + (1 - o) * a.trend.x,
      y: o * (r.y - a.level.y) + (1 - o) * a.trend.y,
      z: o * (r.z - a.level.z) + (1 - o) * a.trend.z
    };
    return a.level = r, a.trend = l, {
      x: r.x + l.x,
      y: r.y + l.y,
      z: r.z + l.z
    };
  }
  /**
   * Apply weighted moving average (recent frames count more)
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyWeightedSmoothing(e, t) {
    const i = `wma-${e}`;
    this._smoothingBuffers.has(i) || this._smoothingBuffers.set(i, []);
    const a = this._smoothingBuffers.get(i);
    for (a.push({ x: t.x, y: t.y, z: t.z }); a.length > this.smoothingWindowSize; )
      a.shift();
    if (a.length === 1) return t;
    let s = 0, o = 0, r = 0, l = 0;
    for (let c = 0; c < a.length; c++) {
      const d = c + 1;
      s += a[c].x * d, o += a[c].y * d, r += a[c].z * d, l += d;
    }
    return {
      x: s / l,
      y: o / l,
      z: r / l
    };
  }
  /**
   * Apply Gaussian-weighted smoothing (bell curve weights)
   * @param {string} entityId - Entity identifier
   * @param {Object} pos - Position {x, y, z}
   * @returns {Object} Smoothed position
   */
  _applyGaussianSmoothing(e, t) {
    const i = `gauss-${e}`;
    this._smoothingBuffers.has(i) || this._smoothingBuffers.set(i, []);
    const a = this._smoothingBuffers.get(i);
    for (a.push({ x: t.x, y: t.y, z: t.z }); a.length > this.smoothingWindowSize; )
      a.shift();
    if (a.length === 1) return t;
    const s = a.length / 3;
    let o = 0, r = 0, l = 0, c = 0;
    for (let d = 0; d < a.length; d++) {
      const m = a.length - 1 - d, u = Math.exp(-(m * m) / (2 * s * s));
      o += a[d].x * u, r += a[d].y * u, l += a[d].z * u, c += u;
    }
    return {
      x: o / c,
      y: r / c,
      z: l / c
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
  _applyAdaptiveSmoothing(e, t, i) {
    if (!this._adaptiveState.has(e))
      return this._adaptiveState.set(e, {
        buffer: [{ x: t.x, y: t.y, z: t.z }],
        lastPos: { x: t.x, y: t.y, z: t.z },
        lastTime: i,
        derivedVel: { x: 0, y: 0, z: 0 }
      }), t;
    const a = this._adaptiveState.get(e), s = i - a.lastTime;
    s > 1e-3 && (a.derivedVel = {
      x: (t.x - a.lastPos.x) / s,
      y: (t.y - a.lastPos.y) / s,
      z: (t.z - a.lastPos.z) / s
    });
    const o = Math.sqrt(
      a.derivedVel.x ** 2 + a.derivedVel.y ** 2 + a.derivedVel.z ** 2
    ), r = 2, l = this.smoothingWindowSize, c = 300, d = 1500;
    let m;
    if (o < c)
      m = l;
    else if (o > d)
      m = r;
    else {
      const y = (o - c) / (d - c);
      m = Math.round(l - y * (l - r));
    }
    if (a.buffer.length >= 2) {
      const y = a.buffer[a.buffer.length - 1], x = a.buffer[a.buffer.length - 2], v = {
        x: y.x - x.x,
        y: y.y - x.y,
        z: y.z - x.z
      }, b = {
        x: t.x - y.x,
        y: t.y - y.y,
        z: t.z - y.z
      }, M = Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2), C = Math.sqrt(b.x ** 2 + b.y ** 2 + b.z ** 2);
      if (M > 0.1 && C > 0.1 && (v.x * b.x + v.y * b.y + v.z * b.z) / (M * C) < 0.5)
        for (; a.buffer.length > Math.max(2, m / 2); )
          a.buffer.shift();
    }
    for (a.buffer.push({ x: t.x, y: t.y, z: t.z }); a.buffer.length > m; )
      a.buffer.shift();
    if (a.lastPos = { x: t.x, y: t.y, z: t.z }, a.lastTime = i, a.buffer.length === 1) return t;
    let u = 0, p = 0, f = 0, g = 0;
    for (let y = 0; y < a.buffer.length; y++) {
      const x = y + 1;
      u += a.buffer[y].x * x, p += a.buffer[y].y * x, f += a.buffer[y].z * x, g += x;
    }
    return {
      x: u / g,
      y: p / g,
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
    const i = `1euro-${e}`;
    if (!this._smoothingBuffers.has(i))
      return this._smoothingBuffers.set(i, {
        x: t.x,
        y: t.y,
        z: t.z,
        dx: 0,
        dy: 0,
        dz: 0,
        lastTime: performance.now()
      }), t;
    const a = this._smoothingBuffers.get(i), s = performance.now(), o = Math.max(1e-3, (s - a.lastTime) / 1e3);
    a.lastTime = s;
    const r = 0.5 + (20 - this.smoothingWindowSize) * 0.1, l = 0.01 * this.smoothingWindowSize, c = 1, d = (t.x - a.x) / o, m = (t.y - a.y) / o, u = (t.z - a.z) / o, p = this._oneEuroAlpha(o, c), f = p * d + (1 - p) * a.dx, g = p * m + (1 - p) * a.dy, y = p * u + (1 - p) * a.dz, x = Math.sqrt(
      f * f + g * g + y * y
    ), v = r + l * x, b = this._oneEuroAlpha(o, v), M = {
      x: b * t.x + (1 - b) * a.x,
      y: b * t.y + (1 - b) * a.y,
      z: b * t.z + (1 - b) * a.z
    };
    return a.x = M.x, a.y = M.y, a.z = M.z, a.dx = f, a.dy = g, a.dz = y, M;
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
  _catmullRomInterpolate(e, t, i, a, s) {
    const o = s * s, r = o * s, l = -0.5 * r + o - 0.5 * s, c = 1.5 * r - 2.5 * o + 1, d = -1.5 * r + 2 * o + 0.5 * s, m = 0.5 * r - 0.5 * o;
    return {
      x: l * e.x + c * t.x + d * i.x + m * a.x,
      y: l * e.y + c * t.y + d * i.y + m * a.y,
      z: l * e.z + c * t.z + d * i.z + m * a.z
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
    const i = this._lowPassState.get(e), a = Math.max(0.05, Math.min(0.5, 1 / this.smoothingWindowSize)), s = {
      x: a * t.x + (1 - a) * i.x,
      y: a * t.y + (1 - a) * i.y,
      z: a * t.z + (1 - a) * i.z
    };
    return this._lowPassState.set(e, s), s;
  }
  /**
   * Calculate derived velocity from position differences
   * This ignores the replay's velocity data and computes velocity from positions
   * @param {Object} p0 - Previous position {x, y, z}
   * @param {Object} p1 - Current position {x, y, z}
   * @param {number} dt - Time delta between positions (seconds)
   * @returns {Object} Derived velocity {x, y, z}
   */
  _deriveVelocity(e, t, i) {
    return i <= 0 ? { x: 0, y: 0, z: 0 } : {
      x: (t.x - e.x) / i,
      y: (t.y - e.y) / i,
      z: (t.z - e.z) / i
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
  _predictCorrectInterpolate(e, t, i, a) {
    const s = a - t.time, o = i.time - t.time, r = s / o;
    if (!t.velocity)
      return {
        x: t.position.x + (i.position.x - t.position.x) * r,
        y: t.position.y + (i.position.y - t.position.y) * r,
        z: t.position.z + (i.position.z - t.position.z) * r
      };
    const l = {
      x: t.position.x + t.velocity.x * s,
      y: t.position.y + t.velocity.y * s,
      z: t.position.z + t.velocity.z * s
    }, c = {
      x: t.position.x + t.velocity.x * o,
      y: t.position.y + t.velocity.y * o,
      z: t.position.z + t.velocity.z * o
    }, d = {
      x: i.position.x - c.x,
      y: i.position.y - c.y,
      z: i.position.z - c.z
    }, m = r * r * (3 - 2 * r);
    return {
      x: l.x + d.x * m,
      y: l.y + d.y * m,
      z: l.z + d.z * m
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
  _velocitySmoothInterpolate(e, t, i, a, s = !1) {
    const o = a - t.time, r = i.time - t.time, l = o / r, c = 650, d = 93, m = 500;
    if (!t.velocity)
      return {
        x: t.position.x + (i.position.x - t.position.x) * l,
        y: t.position.y + (i.position.y - t.position.y) * l,
        z: t.position.z + (i.position.z - t.position.z) * l
      };
    let u = {
      x: t.position.x + t.velocity.x * o,
      y: t.position.y + t.velocity.y * o,
      z: t.position.z + t.velocity.z * o
    };
    s && t.position.z > d + 10 && (u.z = t.position.z + t.velocity.z * o - 0.5 * c * o * o, u.z < d && (u.z = d));
    const p = i.position;
    let f = {
      x: t.position.x + t.velocity.x * r,
      y: t.position.y + t.velocity.y * r,
      z: t.position.z + t.velocity.z * r
    };
    s && t.position.z > d + 10 && (f.z = t.position.z + t.velocity.z * r - 0.5 * c * r * r, f.z < d && (f.z = d));
    const g = {
      x: p.x - f.x,
      y: p.y - f.y,
      z: p.z - f.z
    }, y = l < 0.5 ? 2 * l * l : 1 - Math.pow(-2 * l + 2, 2) / 2, x = Math.sqrt(
      g.x * g.x + g.y * g.y + g.z * g.z
    );
    let v = 1;
    if (x > 0 && r > 0) {
      const M = m * r;
      x > M * 2 && (v = M * 2 / x);
    }
    const b = y * v + (1 - v) * l;
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
  _physicsTickInterpolate(e, t, i) {
    const a = t.time - e.time, s = i - e.time, o = s / a;
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * o,
        y: e.position.y + (t.position.y - e.position.y) * o,
        z: e.position.z + (t.position.z - e.position.z) * o
      };
    const r = (e.velocity.x + t.velocity.x) / 2, l = (e.velocity.y + t.velocity.y) / 2, c = (e.velocity.z + t.velocity.z) / 2, d = e.position.x + r * s, m = e.position.y + l * s, u = e.position.z + c * s, p = e.position.x + r * a, f = e.position.y + l * a, g = e.position.z + c * a, y = t.position.x - p, x = t.position.y - f, v = t.position.z - g;
    return {
      x: d + y * o,
      y: m + x * o,
      z: u + v * o
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
  _velocityOnlyInterpolate(e, t, i) {
    const a = i - e.time, s = t.time - e.time, o = a / s;
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * o,
        y: e.position.y + (t.position.y - e.position.y) * o,
        z: e.position.z + (t.position.z - e.position.z) * o
      };
    const r = e.velocity.x + (t.velocity.x - e.velocity.x) * o / 2, l = e.velocity.y + (t.velocity.y - e.velocity.y) * o / 2, c = e.velocity.z + (t.velocity.z - e.velocity.z) * o / 2;
    return {
      x: e.position.x + r * a,
      y: e.position.y + l * a,
      z: e.position.z + c * a
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
  _smartHybridInterpolate(e, t, i) {
    const a = i - e.time, s = t.time - e.time, o = Math.max(0, Math.min(1, a / s));
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * o,
        y: e.position.y + (t.position.y - e.position.y) * o,
        z: e.position.z + (t.position.z - e.position.z) * o
      };
    const r = Math.sqrt(e.velocity.x ** 2 + e.velocity.y ** 2 + e.velocity.z ** 2), l = Math.sqrt(t.velocity.x ** 2 + t.velocity.y ** 2 + t.velocity.z ** 2);
    let c = 1;
    r > 10 && l > 10 && (c = (e.velocity.x * t.velocity.x + e.velocity.y * t.velocity.y + e.velocity.z * t.velocity.z) / (r * l));
    const d = r > 10 ? Math.abs(l - r) / r : 0;
    if (c < 0.95 || d > 0.1) {
      const u = o * o * (3 - 2 * o);
      return {
        x: e.position.x + (t.position.x - e.position.x) * u,
        y: e.position.y + (t.position.y - e.position.y) * u,
        z: e.position.z + (t.position.z - e.position.z) * u
      };
    } else {
      const u = (e.velocity.x + t.velocity.x) / 2, p = (e.velocity.y + t.velocity.y) / 2, f = (e.velocity.z + t.velocity.z) / 2, g = e.position.x + u * a, y = e.position.y + p * a, x = e.position.z + f * a, v = e.position.x + u * s, b = e.position.y + p * s, M = e.position.z + f * s, C = t.position.x - v, w = t.position.y - b, S = t.position.z - M;
      return {
        x: g + C * o,
        y: y + w * o,
        z: x + S * o
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
    const i = t.time - e.time;
    if (i < 1e-3) return !1;
    const a = (e.velocity.x + t.velocity.x) / 2, s = (e.velocity.y + t.velocity.y) / 2, o = (e.velocity.z + t.velocity.z) / 2, r = Math.sqrt(a ** 2 + s ** 2 + o ** 2);
    if (r < 200) return !1;
    const l = t.position.x - e.position.x, c = t.position.y - e.position.y, d = t.position.z - e.position.z, m = Math.sqrt(l * l + c * c + d * d), u = r * i, p = m / u;
    return p < 0.6 || p > 1.4;
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
    for (let i = 1; i < e.length; i++) {
      const a = t[t.length - 1], s = e[i];
      this._isBadFrame(a, s) || t.push(s);
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
      const a = e ? [...e] : [];
      return a._correctedCount = 0, a;
    }
    const t = [];
    let i = 0;
    for (let a = 0; a < e.length; a++) {
      const s = e[a], o = {
        ...s,
        position: s.position ? { ...s.position } : null,
        velocity: s.velocity ? { ...s.velocity } : null,
        rotation: s.rotation ? { ...s.rotation } : null
      };
      if (a > 0 && s.position && s.velocity) {
        const r = e[a - 1];
        if (r.position && r.velocity) {
          const l = s.time - r.time;
          if (l > 1e-3) {
            const c = (r.velocity.x + s.velocity.x) / 2, d = (r.velocity.y + s.velocity.y) / 2, m = (r.velocity.z + s.velocity.z) / 2, u = Math.sqrt(c ** 2 + d ** 2 + m ** 2);
            if (u > 100) {
              const p = s.position.x - r.position.x, f = s.position.y - r.position.y, g = s.position.z - r.position.z, y = Math.sqrt(p * p + f * f + g * g), x = u * l, v = y / x;
              let b = 0;
              v > 0.15 && v < 0.35 ? b = l * 0.75 : v > 0.4 && v < 0.6 ? b = l * 0.5 : v > 0.65 && v < 0.85 && (b = l * 0.25), b > 0 && (o.position.x += s.velocity.x * b, o.position.y += s.velocity.y * b, o.position.z += s.velocity.z * b, i++);
            }
          }
        }
      }
      t.push(o);
    }
    return t._correctedCount = i, t;
  }
  /**
   * Time-Shifted Interpolation
   * Now uses pre-filtered timeline, so this is just lerp
   */
  _timeShiftedInterpolate(e, t, i) {
    const a = i - e.time, s = t.time - e.time, o = Math.max(0, Math.min(1, a / s));
    return {
      x: e.position.x + (t.position.x - e.position.x) * o,
      y: e.position.y + (t.position.y - e.position.y) * o,
      z: e.position.z + (t.position.z - e.position.z) * o
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
  _velocityAnchoredInterpolate(e, t, i, a, s, o) {
    if (!t.velocity || !i.velocity) {
      const x = (a - t.time) / (i.time - t.time);
      return {
        x: t.position.x + (i.position.x - t.position.x) * x,
        y: t.position.y + (i.position.y - t.position.y) * x,
        z: t.position.z + (i.position.z - t.position.z) * x
      };
    }
    this._velocityAnchorState || (this._velocityAnchorState = /* @__PURE__ */ new Map());
    let r = this._velocityAnchorState.get(e);
    (!r || Math.abs(a - r.lastTime) > 0.5 || // Seek detected
    o % 10 === 0) && (r = {
      anchorPos: { ...t.position },
      anchorTime: t.time,
      anchorIdx: o,
      lastTime: a
    }, this._velocityAnchorState.set(e, r)), a - r.anchorTime;
    let d = r.anchorPos.x, m = r.anchorPos.y, u = r.anchorPos.z;
    const p = (t.velocity.x + i.velocity.x) / 2, f = (t.velocity.y + i.velocity.y) / 2, g = (t.velocity.z + i.velocity.z) / 2, y = a - t.time;
    return r.anchorIdx === o ? (d = r.anchorPos.x + p * y, m = r.anchorPos.y + f * y, u = r.anchorPos.z + g * y) : (d = t.position.x + p * y, m = t.position.y + f * y, u = t.position.z + g * y), r.lastTime = a, { x: d, y: m, z: u };
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
  _hermiteInterpolate(e, t, i) {
    const a = t.time - e.time, s = i - e.time, o = Math.max(0, Math.min(1, s / a)), r = {
      x: e.position.x + (t.position.x - e.position.x) * o,
      y: e.position.y + (t.position.y - e.position.y) * o,
      z: e.position.z + (t.position.z - e.position.z) * o
    };
    if (!e.velocity || !t.velocity)
      return r;
    const l = o * o, c = l * o, d = 2 * c - 3 * l + 1, m = c - 2 * l + o, u = -2 * c + 3 * l, p = c - l, f = {
      x: e.velocity.x * a,
      y: e.velocity.y * a,
      z: e.velocity.z * a
    }, g = {
      x: t.velocity.x * a,
      y: t.velocity.y * a,
      z: t.velocity.z * a
    }, y = {
      x: d * e.position.x + m * f.x + u * t.position.x + p * g.x,
      y: d * e.position.y + m * f.y + u * t.position.y + p * g.y,
      z: d * e.position.z + m * f.z + u * t.position.z + p * g.z
    }, x = y.x - r.x, v = y.y - r.y, b = y.z - r.z, M = t.position.x - e.position.x, C = t.position.y - e.position.y, w = t.position.z - e.position.z;
    return x * x + v * v + b * b > M * M + C * C + w * w ? r : y;
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
  _physicsSimInterpolate(e, t, i, a = !1) {
    const s = t.time - e.time, o = i - e.time, r = Math.max(0, Math.min(1, o / s));
    if (!e.velocity || !t.velocity)
      return {
        x: e.position.x + (t.position.x - e.position.x) * r,
        y: e.position.y + (t.position.y - e.position.y) * r,
        z: e.position.z + (t.position.z - e.position.z) * r
      };
    const l = -650, c = r * r, d = c * r, m = 2 * d - 3 * c + 1, u = d - 2 * c + r, p = -2 * d + 3 * c, f = d - c;
    let g = e.velocity.y * s, y = t.velocity.y * s;
    if (a) {
      const x = 0.5 * l * s * s;
      g += x * 0.5, y += x * 0.5;
    }
    return {
      x: m * e.position.x + u * (e.velocity.x * s) + p * t.position.x + f * (t.velocity.x * s),
      y: m * e.position.y + u * g + p * t.position.y + f * y,
      z: m * e.position.z + u * (e.velocity.z * s) + p * t.position.z + f * (t.velocity.z * s)
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
    const i = this._findKeyframeIndex(this.ballTimeline, e, this.timelineIndices.ball);
    this.timelineIndices.ball = i;
    const a = this.ballTimeline[i], s = this.ballTimeline[i + 1];
    if (this.lastFrameInfo = {
      currentFrame: i,
      totalFrames: this.ballTimeline.length
    }, !a || !a.position) return null;
    if (!this.interpolationEnabled)
      return { ...a.position };
    if (!s || !s.position) return a.position;
    const o = s.time - a.time;
    if (o <= 0) return a.position;
    const r = s.position.x - a.position.x, l = s.position.y - a.position.y, c = s.position.z - a.position.z;
    if (Math.sqrt(r * r + l * l + c * c) > 2e3)
      return a.sleeping ? null : { ...a.position };
    if (a.sleeping)
      return { ...a.position };
    const m = (e - a.time) / o;
    let u;
    switch (this.interpolationMethod) {
      case "catmull-rom": {
        const p = this.ballTimeline[Math.max(0, i - 1)], f = this.ballTimeline[Math.min(this.ballTimeline.length - 1, i + 2)];
        p?.position && f?.position ? u = this._catmullRomInterpolate(p.position, a.position, s.position, f.position, m) : u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        };
        break;
      }
      case "lerp-smooth": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applySmoothing("ball", u);
        break;
      }
      case "lerp-ema": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyEmaSmoothing("ball", u);
        break;
      }
      case "lerp-dema": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyDoubleEmaSmoothing("ball", u);
        break;
      }
      case "lerp-wma": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyWeightedSmoothing("ball", u);
        break;
      }
      case "lerp-gauss": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyGaussianSmoothing("ball", u);
        break;
      }
      case "one-euro": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyOneEuroFilter("ball", u);
        break;
      }
      case "predict-correct": {
        u = this._predictCorrectInterpolate("ball", a, s, e);
        break;
      }
      case "velocity-smooth": {
        u = this._velocitySmoothInterpolate("ball", a, s, e, !0);
        break;
      }
      case "physics-tick": {
        u = this._physicsTickInterpolate(a, s, e);
        break;
      }
      case "hermite": {
        u = this._hermiteInterpolate(a, s, e);
        break;
      }
      case "physics-sim": {
        const p = this.ballTimelineCorrected;
        if (p && p.length >= 2) {
          const f = this._findKeyframeIndex(
            p,
            e,
            this.timelineIndicesCorrected.ball
          );
          this.timelineIndicesCorrected.ball = f;
          const g = p[f], y = p[f + 1];
          if (g?.position && y?.position) {
            u = this._physicsSimInterpolate(g, y, e, !0);
            break;
          }
        }
        u = this._physicsSimInterpolate(a, s, e, !0);
        break;
      }
      case "velocity-only": {
        u = this._velocityOnlyInterpolate(a, s, e);
        break;
      }
      case "smart-hybrid": {
        u = this._smartHybridInterpolate(a, s, e);
        break;
      }
      case "time-shifted": {
        const p = this.ballTimelineFiltered;
        if (!p || p.length < 2) {
          u = {
            x: a.position.x + (s.position.x - a.position.x) * m,
            y: a.position.y + (s.position.y - a.position.y) * m,
            z: a.position.z + (s.position.z - a.position.z) * m
          };
          break;
        }
        const f = this._findKeyframeIndex(
          p,
          e,
          this.timelineIndicesFiltered.ball
        );
        this.timelineIndicesFiltered.ball = f;
        const g = p[f], y = p[f + 1];
        if (!g?.position || !y?.position) {
          u = g?.position ? { ...g.position } : { ...a.position };
          break;
        }
        const x = y.time - g.time, v = x > 0 ? Math.max(0, Math.min(1, (e - g.time) / x)) : 0;
        u = {
          x: g.position.x + (y.position.x - g.position.x) * v,
          y: g.position.y + (y.position.y - g.position.y) * v,
          z: g.position.z + (y.position.z - g.position.z) * v
        };
        break;
      }
      case "position-lerp": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        };
        break;
      }
      case "position-catmull": {
        const p = this.ballTimeline[Math.max(0, i - 1)], f = this.ballTimeline[Math.min(this.ballTimeline.length - 1, i + 2)];
        p?.position && f?.position ? u = this._catmullRomInterpolate(p.position, a.position, s.position, f.position, m) : u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        };
        break;
      }
      case "position-smooth": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyLowPassFilter("ball", u);
        break;
      }
      case "adaptive-smooth": {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
        }, u = this._applyAdaptiveSmoothing("ball", u, e);
        break;
      }
      default: {
        u = {
          x: a.position.x + (s.position.x - a.position.x) * m,
          y: a.position.y + (s.position.y - a.position.y) * m,
          z: a.position.z + (s.position.z - a.position.z) * m
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
    const i = this.timelineIndices.ball, a = this.ballTimeline[i], s = this.ballTimeline[i + 1];
    if (!a || !a.rotation) return null;
    if (!this.interpolationEnabled)
      return { ...a.rotation };
    if (!s || !s.rotation) return a.rotation;
    const o = s.time - a.time;
    if (o <= 0) return a.rotation;
    if (a.position && s.position) {
      const l = s.position.x - a.position.x, c = s.position.y - a.position.y, d = s.position.z - a.position.z;
      if (Math.sqrt(l * l + c * c + d * d) > 2e3)
        return { ...a.rotation };
    }
    if (a.sleeping)
      return { ...a.rotation };
    const r = (e - a.time) / o;
    return this._q0.set(a.rotation.x, a.rotation.y, a.rotation.z, a.rotation.w), this._q1.set(s.rotation.x, s.rotation.y, s.rotation.z, s.rotation.w), this._qResult.slerpQuaternions(this._q0, this._q1, r), { x: this._qResult.x, y: this._qResult.y, z: this._qResult.z, w: this._qResult.w };
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
    const i = this.playerTimelineMap[e];
    if (!i || i.length < 2) return null;
    const a = i[0];
    if (t < a.time && a.position)
      return { ...a.position };
    const s = this._findKeyframeIndex(
      i,
      t,
      this.timelineIndices.players[e] || 0
    );
    this.timelineIndices.players[e] = s;
    const o = i[s], r = i[s + 1];
    if (!o || !o.position) return null;
    if (!this.interpolationEnabled)
      return { ...o.position };
    if (!r || !r.position) return o.position;
    const l = r.time - o.time;
    if (l <= 0) return o.position;
    const c = (t - o.time) / l;
    let d;
    switch (this.interpolationMethod) {
      case "catmull-rom": {
        const m = i[Math.max(0, s - 1)], u = i[Math.min(i.length - 1, s + 2)];
        m?.position && u?.position ? d = this._catmullRomInterpolate(m.position, o.position, r.position, u.position, c) : d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        };
        break;
      }
      case "lerp-smooth": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applySmoothing(`player-${e}`, d);
        break;
      }
      case "lerp-ema": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyEmaSmoothing(`player-${e}`, d);
        break;
      }
      case "lerp-dema": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyDoubleEmaSmoothing(`player-${e}`, d);
        break;
      }
      case "lerp-wma": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyWeightedSmoothing(`player-${e}`, d);
        break;
      }
      case "lerp-gauss": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyGaussianSmoothing(`player-${e}`, d);
        break;
      }
      case "one-euro": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyOneEuroFilter(`player-${e}`, d);
        break;
      }
      case "predict-correct": {
        d = this._predictCorrectInterpolate(`player-${e}`, o, r, t);
        break;
      }
      case "velocity-smooth": {
        d = this._velocitySmoothInterpolate(`player-${e}`, o, r, t, !1);
        break;
      }
      case "physics-tick": {
        d = this._physicsTickInterpolate(o, r, t);
        break;
      }
      case "hermite": {
        d = this._hermiteInterpolate(o, r, t);
        break;
      }
      case "physics-sim": {
        const m = this.playerTimelineMapCorrected[e];
        if (m && m.length >= 2) {
          const u = this._findKeyframeIndex(
            m,
            t,
            this.timelineIndicesCorrected.players[e] || 0
          );
          this.timelineIndicesCorrected.players[e] = u;
          const p = m[u], f = m[u + 1];
          if (p?.position && f?.position) {
            d = this._physicsSimInterpolate(p, f, t, !1);
            break;
          }
        }
        d = this._physicsSimInterpolate(o, r, t, !1);
        break;
      }
      case "velocity-only": {
        d = this._velocityOnlyInterpolate(o, r, t);
        break;
      }
      case "smart-hybrid": {
        d = this._smartHybridInterpolate(o, r, t);
        break;
      }
      case "time-shifted": {
        const m = this.playerTimelineMapFiltered[e];
        if (!m || m.length < 2) {
          d = {
            x: o.position.x + (r.position.x - o.position.x) * c,
            y: o.position.y + (r.position.y - o.position.y) * c,
            z: o.position.z + (r.position.z - o.position.z) * c
          };
          break;
        }
        const u = this._findKeyframeIndex(
          m,
          t,
          this.timelineIndicesFiltered.players[e] || 0
        );
        this.timelineIndicesFiltered.players[e] = u;
        const p = m[u], f = m[u + 1];
        if (!p?.position || !f?.position) {
          d = p?.position ? { ...p.position } : { ...o.position };
          break;
        }
        const g = f.time - p.time, y = g > 0 ? Math.max(0, Math.min(1, (t - p.time) / g)) : 0;
        d = {
          x: p.position.x + (f.position.x - p.position.x) * y,
          y: p.position.y + (f.position.y - p.position.y) * y,
          z: p.position.z + (f.position.z - p.position.z) * y
        };
        break;
      }
      case "position-lerp": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        };
        break;
      }
      case "position-catmull": {
        const m = i[Math.max(0, s - 1)], u = i[Math.min(i.length - 1, s + 2)];
        m?.position && u?.position ? d = this._catmullRomInterpolate(m.position, o.position, r.position, u.position, c) : d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        };
        break;
      }
      case "position-smooth": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyLowPassFilter(`player-${e}`, d);
        break;
      }
      case "adaptive-smooth": {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        }, d = this._applyAdaptiveSmoothing(`player-${e}`, d, t);
        break;
      }
      default: {
        d = {
          x: o.position.x + (r.position.x - o.position.x) * c,
          y: o.position.y + (r.position.y - o.position.y) * c,
          z: o.position.z + (r.position.z - o.position.z) * c
        };
        break;
      }
    }
    return d;
  }
  /**
   * Get interpolated rotation for player at given time (slerp)
   * @param {string} playerName - Player name
   * @param {number} time - Current time
   * @returns {Object|null} Interpolated rotation quaternion or null
   */
  getPlayerRotationAt(e, t) {
    const i = this.playerTimelineMap[e];
    if (!i || i.length < 2) return null;
    const a = i[0];
    if (t < a.time && a.rotation)
      return { ...a.rotation };
    const s = this.timelineIndices.players[e] || 0, o = i[s], r = i[s + 1];
    if (!o || !o.rotation) return null;
    if (!this.interpolationEnabled)
      return { ...o.rotation };
    if (!r || !r.rotation) return o.rotation;
    const l = r.time - o.time;
    if (l <= 0) return o.rotation;
    const c = (t - o.time) / l;
    return this._q0.set(o.rotation.x, o.rotation.y, o.rotation.z, o.rotation.w), this._q1.set(r.rotation.x, r.rotation.y, r.rotation.z, r.rotation.w), this._qResult.slerpQuaternions(this._q0, this._q1, c), { x: this._qResult.x, y: this._qResult.y, z: this._qResult.z, w: this._qResult.w };
  }
  /**
   * Create the ball mesh
   */
  _createBallMesh() {
    const e = "ball", t = new h.SphereGeometry(92.75, 16, 16), i = new h.MeshStandardMaterial({ color: 16777215 }), a = new h.Mesh(t, i);
    a.castShadow = !0, a.receiveShadow = !0, a.userData = {
      location: new h.Vector3(),
      rotation: new h.Quaternion(),
      velocity: new h.Vector3(),
      angularVelocity: new h.Vector3(),
      isCar: !1,
      isBall: !0,
      playerId: null,
      sleeping: !1,
      isHiddenByGoal: !1
    }, this.scene.add(a), this.actors[e] = a, this.ballActorId = e, this.ballModel && !this._ballModelReplaced && (this.replaceBallWithModel(e), this._ballModelReplaced = !0);
    const s = 92.75, o = new h.RingGeometry(s * 0.95, s, 32), r = new h.MeshBasicMaterial({ color: 16777215, side: h.DoubleSide });
    this.ballIndicator = new h.Mesh(o, r), this.ballIndicator.rotation.x = -Math.PI / 2, this.ballIndicator.visible = !1, this.scene.add(this.ballIndicator);
    const l = new h.BufferGeometry().setFromPoints([
      new h.Vector3(0, 0, 0),
      new h.Vector3(0, 1, 0)
    ]), c = new h.LineBasicMaterial({
      color: 16777215,
      opacity: 0.5,
      transparent: !0
    });
    this.ballVerticalLine = new h.Line(l, c), this.ballVerticalLine.frustumCulled = !1, this.ballVerticalLine.visible = !1, this.scene.add(this.ballVerticalLine);
  }
  /**
   * Create a car mesh for a player
   * @param {string} playerName - Player name
   * @param {number} team - Team (0 = blue, 1 = orange)
   * @param {number} index - Player index (used as actor ID)
   * @param {Object} loadout - Player's TeamLoadout (optional)
   */
  _createCarMesh(e, t, i, a, s) {
    const o = `car_${i}`, r = new h.BoxGeometry(118, 36, 84), l = t === 0 ? 3381759 : 16737792, c = new h.MeshStandardMaterial({ color: l }), d = new h.Mesh(r, c);
    d.castShadow = !0, d.receiveShadow = !0;
    const m = a || "Octane", u = s || "Octane";
    d.userData = {
      location: new h.Vector3(),
      rotation: new h.Quaternion(),
      velocity: new h.Vector3(),
      angularVelocity: new h.Vector3(),
      isCar: !0,
      isBall: !1,
      playerId: e,
      team: t,
      sleeping: !1,
      steer: 0,
      carName: m,
      hitboxType: u
    }, this.scene.add(d), this.actors[o] = d, this.playerNameToCarActorId[e] = o, this.playerTeams[e] = t, this.playerNames.add(e), this.effectsManager.createBoostTrail(d, o), this.onPlayerFound && this.onPlayerFound(e), this.replaceCarWithModel(o, d, m, u), console.log(
      `[ActorManager] Created car for ${e} (team ${t === 0 ? "blue" : "orange"}, ${m} / ${u} hitbox)`
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
    const i = this.actors[this.ballActorId];
    if (i && e.ball) {
      const a = e.ball;
      let s = !0;
      if (!this.useAnimationSystem || !this.animationMixer)
        if (this.interpolantsInitialized && this.ballTimeline && this.ballTimeline.length >= 2) {
          const o = this.getBallPositionAt(t), r = this.getBallRotationAt(t);
          o ? i.position.set(o.x, o.y, o.z) : s = !1, r && i.quaternion.set(r.x, r.y, r.z, r.w);
        } else
          i.position.set(a.position.x, a.position.y, a.position.z), i.quaternion.set(
            a.rotation.x,
            a.rotation.y,
            a.rotation.z,
            a.rotation.w
          );
      if (i.userData.location.copy(i.position), i.userData.rotation.copy(i.quaternion), i.userData.velocity.set(a.velocity.x, a.velocity.y, a.velocity.z), a.angularVelocity && i.userData.angularVelocity.set(
        a.angularVelocity.x,
        a.angularVelocity.y,
        a.angularVelocity.z
      ), i.userData.sleeping = a.sleeping, i.visible = s && a.visible !== !1 && !i.userData.isHiddenByGoal, this.ballIndicator && (this.ballIndicator.position.set(i.position.x, 2, i.position.z), this.ballIndicator.visible = i.visible), this.ballVerticalLine) {
        const r = new Float32Array([
          i.position.x,
          2,
          i.position.z,
          i.position.x,
          i.position.y,
          i.position.z
        ]);
        this.ballVerticalLine.geometry.setAttribute(
          "position",
          new h.BufferAttribute(r, 3)
        ), this.ballVerticalLine.geometry.attributes.position.needsUpdate = !0, this.ballVerticalLine.visible = i.visible;
      }
      if (i.userData.velocity && i.visible) {
        let o = this.lastBallTouchTeam, r = this.BALL_TOUCH_DISTANCE;
        Object.keys(this.actors).forEach((l) => {
          const c = this.actors[l];
          if (c && c.userData.isCar && c.userData.playerId) {
            const d = i.position.distanceTo(c.position);
            d < r && (r = d, o = c.userData.team || 0);
          }
        }), r < this.BALL_TOUCH_DISTANCE && (this.lastBallTouchTeam = o), this.effectsManager.updateBallTrail(
          i.position,
          i.userData.velocity,
          this.lastBallTouchTeam
        );
      }
    }
    e.getAllPlayers().forEach((a) => {
      const s = this.playerNameToCarActorId[a.name];
      if (!s) return;
      const o = this.actors[s];
      if (!o) return;
      const r = a.name;
      if (!this.useAnimationSystem || !this.animationMixer)
        if (this.interpolantsInitialized && this.playerTimelineMap[r]) {
          const c = this.getPlayerPositionAt(r, t), d = this.getPlayerRotationAt(r, t);
          c && o.position.set(c.x, c.y, c.z), d && o.quaternion.set(d.x, d.y, d.z, d.w);
        } else
          o.position.set(
            a.position.x,
            a.position.y,
            a.position.z
          ), o.quaternion.set(
            a.rotation.x,
            a.rotation.y,
            a.rotation.z,
            a.rotation.w
          );
      o.userData.location.copy(o.position), o.userData.rotation.copy(o.quaternion), o.userData.velocity.set(
        a.velocity.x,
        a.velocity.y,
        a.velocity.z
      ), o.userData.sleeping = a.sleeping, o.userData.steer = a.steer || 0;
      const l = o.position.length() > 0.1;
      o.visible = a.isVisible && l && !o.userData.sleeping;
    }), this._updateGoalExplosions(t);
  }
  /**
   * Trigger the team-colored goal explosion the first time forward playback
   * crosses each goal, and hide the ball for the celebration window so it
   * vanishes inside the blast (matching the original Ballcam player). Robust to
   * scrubbing and post-goal skips: keyed on goal time, self-correcting on
   * backward seeks, and the ball-hidden state is recomputed every frame.
   */
  _updateGoalExplosions(e) {
    const t = this.effectsManager, i = t && t.explosions ? t.explosions.goalEvents : null;
    if (!(i instanceof Map) || i.size === 0) return;
    const a = this._lastGoalScanTime;
    a !== null && e < a - 1e-3 && this._firedGoalTimes.clear();
    const s = this.actors[this.ballActorId];
    let o = !1;
    for (const r of i.values()) {
      const l = r.time;
      if (!Number.isFinite(l)) continue;
      if (e >= l && e <= l + ts && (o = !0), a !== null && a < l && e >= l && !this._firedGoalTimes.has(l)) {
        this._firedGoalTimes.add(l);
        const d = this.getBallPositionAt(l) || s && s.position || null;
        d && this.effectsManager.triggerGoalExplosion(d, r.team);
      }
    }
    s && (s.userData.isHiddenByGoal = o, o && (s.visible = !1)), this._lastGoalScanTime = e;
  }
  /**
   * Process a network frame for mesh lifecycle management
   * @deprecated Use initFromFramework() and updateFromFramework() instead
   * @param {Object} frame - Network frame
   * @param {Function} getObjectName - Function to get object name by ID (objectId => name)
   * @param {number} frameIndex - Frame index
   * @param {boolean} isSeeking - Whether we're seeking (skip some effects)
   */
  processFrame(e, t, i, a) {
    if (e) {
      if (e.new_actors && e.new_actors.forEach((s) => {
        if (!this.actors[s.actor_id]) {
          const o = t(s.object_id), r = o && o.includes("Ball"), l = o && o.includes("Car");
          if (r || l) {
            let c;
            r ? c = new h.SphereGeometry(92.75, 16, 16) : c = new h.BoxGeometry(118, 36, 84);
            const d = new h.MeshStandardMaterial({
              color: r ? 16777215 : Math.random() * 16777215
            }), m = new h.Mesh(c, d);
            if (m.userData = {
              location: new h.Vector3(),
              rotation: new h.Quaternion(),
              isCar: l,
              isBall: r,
              playerId: null,
              lastUpdateTime: e.time,
              bodyId: null,
              // Will be set from TeamLoadout
              hasReceivedUpdate: !1
              // Track if actor has received at least one RigidBody update
            }, this.scene.add(m), this.actors[s.actor_id] = m, r) {
              this.ballActorId = s.actor_id, this.ballModel && this.replaceBallWithModel(s.actor_id);
              const u = 92.75, p = new h.RingGeometry(u * 0.95, u, 32), f = new h.MeshBasicMaterial({
                color: 16777215,
                side: h.DoubleSide
              });
              this.ballIndicator = new h.Mesh(p, f), this.ballIndicator.rotation.x = -Math.PI / 2, this.ballIndicator.visible = !1, this.scene.add(this.ballIndicator);
              const g = new h.BufferGeometry().setFromPoints([
                new h.Vector3(0, 0, 0),
                new h.Vector3(0, 1, 0)
              ]), y = new h.LineBasicMaterial({
                color: 16777215,
                opacity: 0.5,
                transparent: !0
              });
              this.ballVerticalLine = new h.Line(g, y), this.ballVerticalLine.frustumCulled = !1, this.ballVerticalLine.visible = !1, this.scene.add(this.ballVerticalLine);
            } else l && this.effectsManager.createBoostTrail(m, s.actor_id);
          }
        }
      }), e.deleted_actors && e.deleted_actors.forEach((s) => {
        if (this.actors[s]) {
          const o = this.actors[s];
          o.userData.isCar && this.effectsManager.removeBoostTrail(s), this.scene.remove(o), o.geometry && o.geometry.dispose(), o.material && o.material.dispose(), delete this.actors[s], this.ballActorId === s && (this.ballActorId = null, this.ballIndicator && (this.scene.remove(this.ballIndicator), this.ballIndicator.geometry && this.ballIndicator.geometry.dispose(), this.ballIndicator.material && this.ballIndicator.material.dispose(), this.ballIndicator = null), this.ballVerticalLine && (this.scene.remove(this.ballVerticalLine), this.ballVerticalLine.geometry && this.ballVerticalLine.geometry.dispose(), this.ballVerticalLine.material && this.ballVerticalLine.material.dispose(), this.ballVerticalLine = null));
        }
      }), e.updated_actors && e.updated_actors.forEach((s) => {
        const o = this.actors[s.actor_id];
        s.attribute.TeamLoadout && (this.actorLoadouts[s.actor_id] = s.attribute.TeamLoadout, o && o.userData.isCar && (o.userData.teamLoadout = s.attribute.TeamLoadout, this.resolveBodyId(o, s.actor_id)));
        const r = t(s.object_id), l = r && (r.includes("PRI_TA") || r.includes("PlayerReplicationInfo"));
        if (s.attribute.String && this.playerNames.has(s.attribute.String)) {
          const c = s.attribute.String;
          this.actorToPlayer[s.actor_id] = c, l && !this.playerNameToPriActorId[c] && (this.playerNameToPriActorId[c] = s.actor_id, console.log(
            `[ActorManager] Mapped ${c} -> PRI Actor ${s.actor_id} (object: ${r})`
          )), this.checkCarPlayerLink(s.actor_id);
        }
        if (s.attribute.Reservation && this.playerNames.has(s.attribute.Reservation.name)) {
          const c = s.attribute.Reservation.name;
          this.actorToPlayer[s.actor_id] = c, l && !this.playerNameToPriActorId[c] && (this.playerNameToPriActorId[c] = s.actor_id, console.log(
            `[ActorManager] Mapped ${c} -> PRI Actor ${s.actor_id} (object: ${r})`
          )), this.checkCarPlayerLink(s.actor_id);
        }
        if (s.attribute.ActiveActor) {
          const c = s.attribute.ActiveActor.actor;
          this.actorLinks[s.actor_id] || (this.actorLinks[s.actor_id] = /* @__PURE__ */ new Set()), this.actorLinks[s.actor_id].add(c), o && o.userData.isCar && this.checkCarPlayerLink(c, s.actor_id);
        }
        if (o && s.attribute && s.attribute.RigidBody) {
          const c = s.attribute.RigidBody;
          if (c.location && (o.userData.location.set(c.location.x, c.location.z, c.location.y), o.userData.lastUpdateTime = e.time, o.userData.hasReceivedUpdate = !0), c.linear_velocity && (o.userData.velocity || (o.userData.velocity = new h.Vector3()), o.userData.velocity.set(
            c.linear_velocity.x,
            c.linear_velocity.z,
            c.linear_velocity.y
          )), c.rotation && o.userData.rotation.set(c.rotation.x, c.rotation.z, c.rotation.y, -c.rotation.w), c.angular_velocity && (o.userData.angularVelocity || (o.userData.angularVelocity = new h.Vector3()), o.userData.angularVelocity.set(
            c.angular_velocity.x,
            c.angular_velocity.z,
            c.angular_velocity.y
          )), c.sleeping !== void 0 && (o.userData.sleeping = c.sleeping, c.sleeping && (o.userData.velocity && o.userData.velocity.set(0, 0, 0), o.userData.angularVelocity && o.userData.angularVelocity.set(0, 0, 0))), o.userData.isBall && o.userData.isHiddenByGoal && c.location) {
            const d = c.location.x, m = c.location.y, u = c.location.z;
            Math.sqrt(d * d + m * m + u * u) < 500 && (o.userData.isHiddenByGoal = !1);
          }
        }
      }), this.effectsManager.explosions.goalEvents.has(i)) {
        const s = this.effectsManager.explosions.goalEvents.get(i), o = this.actors[this.ballActorId];
        o && (a || (this.effectsManager.triggerGoalExplosion(o.position, s.team), console.log(
          `🎯 GOAL! Explosion at frame ${i} for team ${s.team} by ${s.playerName}`
        )), o.userData.isHiddenByGoal = !0);
      }
      if (this.effectsManager.explosions.demoEvents.has(i)) {
        const s = this.effectsManager.explosions.demoEvents.get(i), o = this.actors[s.victimActorId];
        if (o) {
          if (!a) {
            const r = o.userData.playerId, l = r && this.playerTeams && this.playerTeams[r] || 0;
            this.effectsManager.triggerDemoExplosion(o.position, l), console.log(
              `💥 DEMO! Explosion at frame ${i} for actor ${s.victimActorId}`
            );
          }
          o.userData.sleeping = !0;
        }
      }
    }
  }
  resolveBodyId(e, t) {
    if (!e || !e.userData.isCar || !e.userData.teamLoadout) return;
    let i = 0;
    e.userData.playerId && Object.prototype.hasOwnProperty.call(this.playerTeams, e.userData.playerId) && (i = this.playerTeams[e.userData.playerId]);
    const a = e.userData.teamLoadout, s = i === 1 ? a.orange?.body : a.blue?.body;
    s && e.userData.bodyId !== s && (e.userData.bodyId = s, this.updateCarHitbox(e, s, t));
  }
  updateCarHitbox(e, t, i) {
    const a = Fi(t), s = a?.name || "Octane", o = a?.hitboxType || "Octane";
    this.replaceCarWithModel(i, e, s, o);
  }
  /**
   * Replace a car's BoxGeometry with a loaded FBX model
   */
  async replaceCarWithModel(e, t, i, a) {
    if (this.carModelLoader.isModelReady(i, a))
      this._doCarReplacement(e, t, i, a);
    else {
      this.pendingCarReplacements.set(e, { oldMesh: t, carName: i, hitboxType: a });
      try {
        const s = this.carModelLoader.getModelTypeForCar(i, a);
        await this.carModelLoader.loadModel(s);
        const o = this.pendingCarReplacements.get(e);
        o && this.actors[e] === o.oldMesh && this._doCarReplacement(e, o.oldMesh, o.carName, o.hitboxType), this.pendingCarReplacements.delete(e);
      } catch (s) {
        console.warn(`Failed to load model for ${i} (${a}):`, s), this.pendingCarReplacements.delete(e), t && (t.visible = !0);
      }
    }
  }
  _doCarReplacement(e, t, i, a) {
    let s = 0;
    t.userData.playerId && Object.prototype.hasOwnProperty.call(this.playerTeams, t.userData.playerId) ? s = this.playerTeams[t.userData.playerId] : t.userData.team !== void 0 && (s = t.userData.team);
    const o = this.carModelLoader.getCarMeshSync(i, a, s);
    if (!o) {
      console.warn(`Could not get car mesh for ${i} (${a})`);
      return;
    }
    const r = o.userData.wheels;
    o.userData = { ...t.userData }, o.userData.isFBXModel = !0, o.userData.carName = i, o.userData.hitboxType = a, o.userData.wheels = r, o.position.copy(t.position), o.quaternion.copy(t.quaternion), this.scene.remove(t), t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((c) => c.dispose()) : t.material.dispose()), this.scene.add(o), this.actors[e] = o, this.effectsManager.removeBoostTrail(e), this.effectsManager.createBoostTrail(o, e);
    const l = this.carModelLoader.getModelTypeForCar(i, a);
    console.log(
      `🚗 Replaced car ${e} with ${l.toUpperCase()} model (${i}, ${a} hitbox, team ${s === 0 ? "blue" : "orange"})`
    );
  }
  checkCarPlayerLink(e, t) {
    const i = this.actorToPlayer[e], a = this.actorLoadouts[e];
    if (!(!i && !a))
      if (t) {
        const s = this.actors[t];
        s && s.userData.isCar && (this.onPlayerFound && this.onPlayerFound(i), s.userData.playerId = i, this.playerNameToCarActorId[i] = t, a && (s.userData.teamLoadout = a), this.resolveBodyId(s, t));
      } else
        this.actorLinks[e] && this.actorLinks[e].forEach((s) => {
          this.checkCarPlayerLink(e, s);
        });
  }
  updateInterpolation(e, t, i) {
    const a = t[i];
    if (a && Object.keys(this.actors).forEach((s) => {
      const o = this.actors[s], r = o.userData.location, l = o.userData.rotation;
      if (!r || !l || !o.userData.hasReceivedUpdate) return;
      let c = null, d = 0;
      for (let m = i + 1; m < Math.min(t.length, i + 60); m++) {
        const u = t[m];
        if (u.updated_actors) {
          const p = u.updated_actors.find(
            (f) => f.actor_id == s && f.attribute && f.attribute.RigidBody
          );
          if (p) {
            c = p, d = u.time;
            break;
          }
        }
      }
      if (c) {
        const m = o.userData.lastUpdateTime || a.time, u = d;
        if (u > m) {
          const p = (e - m) / (u - m), f = Math.max(0, Math.min(1, p)), g = u - m || 0.033, y = c.attribute.RigidBody;
          if (y.location)
            if (this._p0.copy(r), this._p1.set(y.location.x, y.location.z, y.location.y), o.userData.sleeping)
              o.position.copy(r);
            else {
              const x = c.attribute.RigidBody;
              if (o.userData.velocity && x.linear_velocity) {
                const v = f, b = v * v, M = b * v;
                if (g > 0.5)
                  o.position.lerpVectors(r, this._p1, f);
                else {
                  this._v0.copy(o.userData.velocity).multiplyScalar(g), this._v1.set(
                    x.linear_velocity.x,
                    x.linear_velocity.z,
                    x.linear_velocity.y
                  ).multiplyScalar(g);
                  const C = 2 * M - 3 * b + 1, w = M - 2 * b + v, S = -2 * M + 3 * b, E = M - b;
                  o.position.set(
                    C * this._p0.x + w * this._v0.x + S * this._p1.x + E * this._v1.x,
                    C * this._p0.y + w * this._v0.y + S * this._p1.y + E * this._v1.y,
                    C * this._p0.z + w * this._v0.z + S * this._p1.z + E * this._v1.z
                  );
                }
              } else
                o.position.lerpVectors(r, this._p1, f);
            }
          else
            o.position.copy(r);
          y.rotation ? (this._nextRot.set(y.rotation.x, y.rotation.z, y.rotation.y, -y.rotation.w), o.quaternion.slerpQuaternions(l, this._nextRot, f)) : o.quaternion.copy(l);
          return;
        }
      }
      o.position.copy(r), o.quaternion.copy(l);
    }), Object.keys(this.actors).forEach((s) => {
      const o = this.actors[s];
      if (o && o.userData.isCar) {
        const l = o.position.length() > 0.1, c = o.userData.sleeping === !0;
        o.visible = l && !c;
      }
    }), this.ballActorId && this.actors[this.ballActorId]) {
      const s = this.actors[this.ballActorId];
      if (s.visible = !s.userData.isHiddenByGoal, this.ballIndicator && (this.ballIndicator.position.set(s.position.x, 2, s.position.z), this.ballIndicator.visible = s.visible), this.ballVerticalLine) {
        const r = new Float32Array([
          s.position.x,
          2,
          s.position.z,
          s.position.x,
          s.position.y,
          s.position.z
        ]);
        this.ballVerticalLine.geometry.setAttribute(
          "position",
          new h.BufferAttribute(r, 3)
        ), this.ballVerticalLine.geometry.attributes.position.needsUpdate = !0, this.ballVerticalLine.visible = s.visible;
      }
      if (s.userData.velocity && s.visible) {
        let o = this.lastBallTouchTeam, r = this.BALL_TOUCH_DISTANCE;
        Object.keys(this.actors).forEach((l) => {
          const c = this.actors[l];
          if (c && c.userData.isCar && c.userData.playerId) {
            const d = s.position.distanceTo(c.position);
            if (d < r) {
              r = d;
              const m = c.userData.playerId;
              Object.prototype.hasOwnProperty.call(this.playerTeams, m) && (o = this.playerTeams[m]);
            }
          }
        }), r < this.BALL_TOUCH_DISTANCE && (this.lastBallTouchTeam = o), this.effectsManager.updateBallTrail(
          s.position,
          s.userData.velocity,
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
  updateBoostState(e, t, i = !1) {
    const a = this.playerNameToCarActorId[e];
    if (!a) {
      t && !this._warnedNoCarId && (console.warn(`⚠️ updateBoostState: No carId for ${e}`), this._warnedNoCarId = !0);
      return;
    }
    const s = this.actors[a];
    if (!s || !s.userData.isCar) {
      t && console.warn(`⚠️ updateBoostState: No mesh for car ${a}, player ${e}`);
      return;
    }
    const o = s.userData.velocity || new h.Vector3(0, 0, 0), r = t && !i;
    this.effectsManager.updateBoostTrail(
      a,
      r,
      s.position,
      s.quaternion,
      o
    );
  }
  /**
   * Update player steering value from framework
   * @param {string} playerName - Player name
   * @param {number} steer - Normalized steering value (-1 to 1)
   */
  updatePlayerSteer(e, t) {
    const i = this.playerNameToCarActorId[e];
    if (!i) return;
    const a = this.actors[i];
    !a || !a.userData.isCar || (a.userData.steer = t);
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
    this._previousCarPositions || (this._previousCarPositions = /* @__PURE__ */ new Map()), Object.keys(this.actors).forEach((i) => {
      const a = this.actors[i];
      if (!a || !a.userData.isCar || !a.userData.isFBXModel && !a.userData.hasWheelSockets || !a.userData.wheels || a.userData.wheels.length === 0) return;
      const s = a.position;
      let o = this._previousCarPositions.get(i);
      o || (o = s.clone(), this._previousCarPositions.set(i, o));
      const l = new h.Vector3().subVectors(s, o).length();
      if (this._previousCarPositions.set(i, s.clone()), l < 0.01) return;
      const m = Math.min(l / e, 0.5) * 1;
      let u = 0;
      a.userData.steer !== void 0 && (u = -a.userData.steer * t), a.userData.wheels.forEach((p) => {
        if (p.socket) {
          const f = p.side === "left" ? 1 : -1;
          if (p.mesh.rotateZ(f * m), p.position === "front" && p.steeringPivot) {
            const g = p.side === "left" ? -1 : 1;
            p.steeringPivot.rotation.y = g * u;
          }
        } else {
          const f = p.side === "left" ? -1 : 1;
          p.mesh.rotateY(f * m), p.position === "front" && p.steeringPivot && (p.steeringPivot.rotation.z = u);
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
  updateSupersonicState(e, t, i) {
    const a = this.playerNameToCarActorId[e];
    if (!a)
      return;
    const s = this.actors[a];
    if (!s || !s.userData.isCar)
      return;
    const o = s.userData.velocity || new h.Vector3(0, 0, 0);
    this.effectsManager.updateSupersonicTrail(
      a,
      t,
      s.position,
      s.quaternion,
      o,
      i
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
  // LIVE MODE METHODS (027-live-player)
  // ============================================
  /**
   * Create ball mesh for live mode
   * Returns the ball mesh directly instead of storing it
   * @returns {THREE.Mesh} The ball mesh
   */
  createBallMeshForLive() {
    const e = new h.SphereGeometry(92.75, 16, 16), t = new h.MeshStandardMaterial({ color: 16777215 }), i = new h.Mesh(e, t);
    if (i.castShadow = !0, i.receiveShadow = !0, i.userData = {
      location: new h.Vector3(),
      rotation: new h.Quaternion(),
      velocity: new h.Vector3(),
      angularVelocity: new h.Vector3(),
      isCar: !1,
      isBall: !0,
      playerId: null,
      sleeping: !1,
      isHiddenByGoal: !1
    }, this.scene.add(i), this.ballModel) {
      const a = this.ballModel.clone();
      a.position.copy(i.position), a.quaternion.copy(i.quaternion), a.userData = { ...i.userData };
      const s = 92.75;
      return a.scale.set(s, s, s), a.traverse((o) => {
        o.isMesh && (o.castShadow = !0, o.receiveShadow = !0);
      }), this.scene.remove(i), this.scene.add(a), i.geometry && i.geometry.dispose(), i.material && i.material.dispose(), console.log("✓ Live ball created with GLTF model"), a;
    }
    return i;
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
  createCarMeshForLive(e, t, i, a = null) {
    const s = `live_car_${t}`, o = new h.BoxGeometry(118, 36, 84), r = e === 0 ? 3381759 : 16737792, l = new h.MeshStandardMaterial({ color: r }), c = new h.Mesh(o, l);
    return c.castShadow = !0, c.receiveShadow = !0, c.visible = !1, c.userData = {
      location: new h.Vector3(),
      rotation: new h.Quaternion(),
      velocity: new h.Vector3(),
      angularVelocity: new h.Vector3(),
      isCar: !0,
      isBall: !1,
      playerId: i,
      team: e,
      sleeping: !1,
      steer: 0,
      bodyId: a,
      liveActorId: s
    }, this.scene.add(c), this.actors[s] = c, this.playerNameToCarActorId[i] = s, this.effectsManager.createBoostTrail(c, s), a && a > 0 ? this.updateCarHitbox(c, a, s) : this.replaceCarWithModel(s, c, "Octane", "Octane"), console.log(
      `[ActorManager] Created live car for ${i} (team ${e === 0 ? "blue" : "orange"}, bodyId: ${a})`
    ), c;
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
  updateBoostParticlesLive(e, t, i, a) {
    const s = t && i > 0, o = a.userData.velocity || new h.Vector3(0, 0, 0);
    this.effectsManager.updateBoostTrail(
      e,
      s,
      a.position,
      a.quaternion,
      o
    );
  }
  /**
   * Update supersonic trail for live mode car
   * @param {string} actorId - Car actor ID
   * @param {boolean} isSupersonic - Whether car is supersonic (speed > 2200)
   * @param {number} team - Team number (0 or 1)
   * @param {THREE.Mesh} mesh - Car mesh
   */
  updateSupersonicTrailLive(e, t, i, a) {
    const s = a.userData.velocity || new h.Vector3(0, 0, 0);
    this.effectsManager.updateSupersonicTrail(
      e,
      t,
      a.position,
      a.quaternion,
      s,
      i
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
function K(n, e, t) {
  t === -1 ? (n.clearUpdateRanges?.(), n.addUpdateRange?.(0, n.count * n.itemSize)) : n.addUpdateRange ? (n.clearUpdateRanges(), n.addUpdateRange(e, t)) : (n.updateRange.offset = e, n.updateRange.count = t);
}
class I extends h.Object3D {
  constructor(e, t) {
    super(), this.active = !1, this.orientToMovement = !1, t && (this.orientToMovement = !0), this.scene = e, this.geometry = null, this.mesh = null, this.nodeCenters = null, this.lastNodeCenter = null, this.currentNodeCenter = null, this.lastOrientationDir = null, this.nodeIDs = null, this.currentLength = 0, this.currentEnd = 0, this.currentNodeID = 0, this.advanceFrequency = 60, this.advancePeriod = 1 / this.advanceFrequency, this.lastAdvanceTime = 0, this.paused = !1, this.pauseAdvanceUpdateTimeDiff = 0, this._internalTime = 0, this._useInternalTime = !1;
  }
  setAdvanceFrequency(e) {
    this.advanceFrequency = e, this.advancePeriod = 1 / this.advanceFrequency;
  }
  initialize(e, t, i, a, s, o) {
    this.deactivate(), this.destroyMesh(), this.length = t > 0 ? t + 1 : 0, this.dragTexture = i ? 1 : 0, this.targetObject = o, this.initializeLocalHeadGeometry(a, s), this.nodeIDs = [], this.nodeCenters = [];
    for (let r = 0; r < this.length; r++)
      this.nodeIDs[r] = -1, this.nodeCenters[r] = new h.Vector3();
    this.material = e, this.initializeGeometry(), this.initializeMesh(), this.material.uniforms.trailLength.value = 0, this.material.uniforms.minID.value = 0, this.material.uniforms.maxID.value = 0, this.material.uniforms.dragTexture.value = this.dragTexture, this.material.uniforms.maxTrailLength.value = this.length, this.material.uniforms.verticesPerNode.value = this.VerticesPerNode, this.material.uniforms.textureTileFactor.value = new h.Vector2(1, 1), this.reset();
  }
  initializeLocalHeadGeometry(e, t) {
    if (this.localHeadGeometry = [], t) {
      this.VerticesPerNode = 0;
      for (let i = 0; i < t.length && i < I.MaxHeadVertices; i++) {
        const a = t[i];
        if (a && a instanceof h.Vector3) {
          const s = new h.Vector3();
          s.copy(a), this.localHeadGeometry.push(s), this.VerticesPerNode++;
        }
      }
    } else {
      const i = (e || 1) / 2;
      this.localHeadGeometry.push(new h.Vector3(-i, 0, 0)), this.localHeadGeometry.push(new h.Vector3(i, 0, 0)), this.VerticesPerNode = 2;
    }
    this.FacesPerNode = (this.VerticesPerNode - 1) * 2, this.FaceIndicesPerNode = this.FacesPerNode * 3;
  }
  initializeGeometry() {
    this.vertexCount = this.length * this.VerticesPerNode, this.faceCount = this.length * this.FacesPerNode;
    const e = new h.BufferGeometry(), t = new Float32Array(this.vertexCount), i = new Float32Array(this.vertexCount * this.VerticesPerNode), a = new Float32Array(this.vertexCount * I.PositionComponentCount), s = new Float32Array(this.vertexCount * I.PositionComponentCount), o = new Float32Array(this.vertexCount * I.UVComponentCount), r = new Uint32Array(this.faceCount * I.IndicesPerFace), l = new h.BufferAttribute(t, 1);
    l.dynamic = !0, e.setAttribute("nodeID", l);
    const c = new h.BufferAttribute(i, 1);
    c.dynamic = !0, e.setAttribute("nodeVertexID", c);
    const d = new h.BufferAttribute(
      s,
      I.PositionComponentCount
    );
    d.dynamic = !0, e.setAttribute("nodeCenter", d);
    const m = new h.BufferAttribute(
      a,
      I.PositionComponentCount
    );
    m.dynamic = !0, e.setAttribute("position", m);
    const u = new h.BufferAttribute(o, I.UVComponentCount);
    u.dynamic = !0, e.setAttribute("uv", u);
    const p = new h.BufferAttribute(r, 1);
    p.dynamic = !0, e.setIndex(p), this.geometry = e;
  }
  zeroVertices() {
    const e = this.geometry.getAttribute("position");
    for (let t = 0; t < this.vertexCount; t++) {
      const i = t * 3;
      e.array[i] = 0, e.array[i + 1] = 0, e.array[i + 2] = 0;
    }
    e.needsUpdate = !0, K(e, 0, -1);
  }
  zeroIndices() {
    const e = this.geometry.getIndex();
    for (let t = 0; t < this.faceCount; t++) {
      const i = t * 3;
      e.array[i] = 0, e.array[i + 1] = 0, e.array[i + 2] = 0;
    }
    e.needsUpdate = !0, K(e, 0, -1);
  }
  formInitialFaces() {
    this.zeroIndices();
    const e = this.geometry.getIndex();
    for (let t = 0; t < this.length - 1; t++)
      this.connectNodes(t, t + 1);
    e.needsUpdate = !0, K(e, 0, -1);
  }
  initializeMesh() {
    this.mesh = new h.Mesh(this.geometry, this.material), this.mesh.dynamic = !0, this.mesh.matrixAutoUpdate = !1;
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
    const e = new h.Matrix4();
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
    return function(t, i) {
      const a = this.currentEnd + 1 >= this.length ? 0 : this.currentEnd + 1;
      if (i ? this.updateNodePositionsFromTransformMatrix(a, i) : this.updateNodePositionsFromOrientationTangent(
        a,
        t.position,
        t.tangent
      ), this.currentLength >= 1 && (this.connectNodes(this.currentEnd, a), this.currentLength >= this.length)) {
        const s = this.currentEnd + 1 >= this.length ? 0 : this.currentEnd + 1;
        this.disconnectNodes(s);
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
    const e = new h.Matrix4();
    return function() {
      this.currentEnd < 0 || (this.targetObject.updateMatrixWorld(), e.copy(this.targetObject.matrixWorld), this.updateNodePositionsFromTransformMatrix(this.currentEnd, e));
    };
  })();
  updateNodeID(e, t) {
    this.nodeIDs[e] = t;
    const i = this.geometry.getAttribute("nodeID"), a = this.geometry.getAttribute("nodeVertexID");
    for (let s = 0; s < this.VerticesPerNode; s++) {
      const o = e * this.VerticesPerNode + s;
      i.array[o] = t, a.array[o] = s;
    }
    i.needsUpdate = !0, a.needsUpdate = !0, K(i, e * this.VerticesPerNode, this.VerticesPerNode), K(a, e * this.VerticesPerNode, this.VerticesPerNode);
  }
  updateNodeCenter(e, t) {
    this.lastNodeCenter = this.currentNodeCenter, this.currentNodeCenter = this.nodeCenters[e], this.currentNodeCenter.copy(t);
    const i = this.geometry.getAttribute("nodeCenter");
    for (let a = 0; a < this.VerticesPerNode; a++) {
      const s = (e * this.VerticesPerNode + a) * 3;
      i.array[s] = t.x, i.array[s + 1] = t.y, i.array[s + 2] = t.z;
    }
    i.needsUpdate = !0, K(
      i,
      e * this.VerticesPerNode * I.PositionComponentCount,
      this.VerticesPerNode * I.PositionComponentCount
    );
  }
  updateNodePositionsFromOrientationTangent = (function() {
    const e = new h.Quaternion(), t = new h.Vector3(), i = [];
    for (let a = 0; a < I.MaxHeadVertices; a++) {
      const s = new h.Vector3();
      i.push(s);
    }
    return function(s, o, r) {
      const l = this.geometry.getAttribute("position");
      this.updateNodeCenter(s, o), t.copy(o), t.sub(I.LocalHeadOrigin), e.setFromUnitVectors(I.LocalOrientationTangent, r);
      for (let c = 0; c < this.localHeadGeometry.length; c++) {
        const d = i[c];
        d.copy(this.localHeadGeometry[c]), d.applyQuaternion(e), d.add(t);
      }
      for (let c = 0; c < this.localHeadGeometry.length; c++) {
        const d = (this.VerticesPerNode * s + c) * I.PositionComponentCount, m = i[c];
        l.array[d] = m.x, l.array[d + 1] = m.y, l.array[d + 2] = m.z;
      }
      l.needsUpdate = !0;
    };
  })();
  updateNodePositionsFromTransformMatrix = (function() {
    const e = new h.Matrix3(), t = new h.Quaternion(), i = new h.Vector3(), a = new h.Vector3(), s = new h.Vector3(), o = new h.Vector3(), r = [];
    for (let c = 0; c < I.MaxHeadVertices; c++) {
      const d = new h.Vector3();
      r.push(d);
    }
    function l(c, d) {
      const m = d.elements;
      c.set(m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]);
    }
    return function(d, m) {
      const u = this.geometry.getAttribute("position");
      i.set(0, 0, 0), i.applyMatrix4(m), this.updateNodeCenter(d, i);
      for (let p = 0; p < this.localHeadGeometry.length; p++)
        r[p].copy(this.localHeadGeometry[p]);
      for (let p = 0; p < this.localHeadGeometry.length; p++)
        r[p].applyMatrix4(m);
      if (this.lastNodeCenter && this.orientToMovement && (l(e, m), s.set(0, 0, -1), s.applyMatrix3(e), o.copy(this.currentNodeCenter), o.sub(this.lastNodeCenter), o.normalize(), o.lengthSq() <= 1e-4 && this.lastOrientationDir && o.copy(this.lastOrientationDir), o.lengthSq() > 1e-4)) {
        this.lastOrientationDir || (this.lastOrientationDir = new h.Vector3()), t.setFromUnitVectors(s, o), a.copy(this.currentNodeCenter);
        for (let p = 0; p < this.localHeadGeometry.length; p++) {
          const f = r[p];
          f.sub(a), f.applyQuaternion(t), f.add(a);
        }
      }
      for (let p = 0; p < this.localHeadGeometry.length; p++) {
        const f = (this.VerticesPerNode * d + p) * I.PositionComponentCount, g = r[p];
        u.array[f] = g.x, u.array[f + 1] = g.y, u.array[f + 2] = g.z;
      }
      u.needsUpdate = !0, K(
        u,
        d * this.VerticesPerNode * I.PositionComponentCount,
        this.VerticesPerNode * I.PositionComponentCount
      );
    };
  })();
  connectNodes = /* @__PURE__ */ (function() {
    const e = {
      attribute: null,
      offset: 0,
      count: -1
    };
    return function(i, a) {
      const s = this.geometry.getIndex();
      for (let o = 0; o < this.localHeadGeometry.length - 1; o++) {
        const r = this.VerticesPerNode * i + o, l = this.VerticesPerNode * a + o, c = (i * this.FacesPerNode + o * I.FacesPerQuad) * I.IndicesPerFace;
        s.array[c] = r, s.array[c + 1] = l, s.array[c + 2] = r + 1, s.array[c + 3] = l, s.array[c + 4] = l + 1, s.array[c + 5] = r + 1;
      }
      return s.needsUpdate = !0, K(s, 0, -1), e.attribute = s, e.offset = i * this.FacesPerNode * I.IndicesPerFace, e.count = this.FacesPerNode * I.IndicesPerFace, e;
    };
  })();
  disconnectNodes = /* @__PURE__ */ (function() {
    const e = {
      attribute: null,
      offset: 0,
      count: -1
    };
    return function(i) {
      const a = this.geometry.getIndex();
      for (let s = 0; s < this.localHeadGeometry.length - 1; s++) {
        const o = (i * this.FacesPerNode + s * I.FacesPerQuad) * I.IndicesPerFace;
        a.array[o] = 0, a.array[o + 1] = 0, a.array[o + 2] = 0, a.array[o + 3] = 0, a.array[o + 4] = 0, a.array[o + 5] = 0;
      }
      return a.needsUpdate = !0, K(a, 0, -1), e.attribute = a, e.offset = i * this.FacesPerNode * I.IndicesPerFace, e.count = this.FacesPerNode * I.IndicesPerFace, e;
    };
  })();
  deactivate() {
    this.isActive && (this.scene.remove(this.mesh), this.isActive = !1);
  }
  activate() {
    this.isActive || (this.scene.add(this.mesh), this.isActive = !0);
  }
  static createMaterial(e, t, i) {
    return i = i || {}, i.trailLength = { type: "f", value: null }, i.verticesPerNode = { type: "f", value: null }, i.minID = { type: "f", value: null }, i.maxID = { type: "f", value: null }, i.dragTexture = { type: "f", value: null }, i.maxTrailLength = { type: "f", value: null }, i.textureTileFactor = { type: "v2", value: null }, i.headColor = { type: "v4", value: new h.Vector4() }, i.tailColor = { type: "v4", value: new h.Vector4() }, e = e || I.Shader.BaseVertexShader, t = t || I.Shader.BaseFragmentShader, new h.ShaderMaterial({
      uniforms: i,
      vertexShader: e,
      fragmentShader: t,
      transparent: !0,
      alphaTest: 0.5,
      blending: h.CustomBlending,
      blendSrc: h.SrcAlphaFactor,
      blendDst: h.OneMinusSrcAlphaFactor,
      blendEquation: h.AddEquation,
      depthTest: !0,
      depthWrite: !1,
      side: h.DoubleSide
    });
  }
  static createBaseMaterial(e) {
    return I.createMaterial(
      I.Shader.BaseVertexShader,
      I.Shader.BaseFragmentShader,
      e
    );
  }
  static createTexturedMaterial(e) {
    return e = {}, e.trailTexture = { type: "t", value: null }, I.createMaterial(
      I.Shader.TexturedVertexShader,
      I.Shader.TexturedFragmentShader,
      e
    );
  }
  static get MaxHeadVertices() {
    return 128;
  }
  static _LocalOrientationTangent = new h.Vector3(1, 0, 0);
  static get LocalOrientationTangent() {
    return I._LocalOrientationTangent;
  }
  static _LocalHeadOrigin = new h.Vector3(0, 0, 0);
  static get LocalHeadOrigin() {
    return I._LocalHeadOrigin;
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
const At = {
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
function zt() {
  const n = {
    trailLength: { type: "f", value: null },
    verticesPerNode: { type: "f", value: null },
    minID: { type: "f", value: null },
    maxID: { type: "f", value: null },
    dragTexture: { type: "f", value: null },
    maxTrailLength: { type: "f", value: null },
    textureTileFactor: { type: "v2", value: new h.Vector2(1, 1) },
    headColor: { type: "v4", value: new h.Vector4() },
    tailColor: { type: "v4", value: new h.Vector4() },
    intensityMultiplier: { type: "f", value: 1 }
  };
  return new h.ShaderMaterial({
    uniforms: n,
    vertexShader: At.vertexShader,
    fragmentShader: At.fragmentShader,
    transparent: !0,
    blending: h.AdditiveBlending,
    depthTest: !0,
    depthWrite: !1,
    side: h.DoubleSide
  });
}
class ns {
  constructor(e, t, i, a = 1) {
    this.scene = e, this.team = t, this.config = i, this.active = !0, this.dying = !1, this.deathTime = 0, this.maxDeathTime = 0.8, this.intensity = a, this.teamColors = {
      0: {
        head: new h.Vector4(0.2, 0.4, 1, 1),
        // Deep blue (less cyan)
        tail: new h.Vector4(0.1, 0.2, 0.8, 0)
        // Darker blue, transparent
      },
      1: {
        head: new h.Vector4(1, 0.45, 0, 1),
        // Vibrant orange
        tail: new h.Vector4(0.8, 0.25, 0, 0)
        // Darker orange, transparent
      }
    }, this.mainTarget = new h.Object3D(), this.secondaryTargets = [
      new h.Object3D(),
      new h.Object3D(),
      new h.Object3D(),
      new h.Object3D()
    ], e.add(this.mainTarget), this.secondaryTargets.forEach((s) => e.add(s)), this.mainTrail = this._createMainTrail(), this.secondaryTrails = this._createSecondaryTrails(), this._updateColors(), this._updateIntensity(), this.mainTrail.activate(), this.secondaryTrails.forEach((s) => s.activate());
  }
  _createMainTrail() {
    const e = new I(this.scene, !1), t = zt(), i = this.config.mainTrailWidth, a = [
      // Vertical ribbon (Y axis)
      new h.Vector3(0, -i, 0),
      new h.Vector3(0, i, 0),
      // Horizontal ribbon (X axis)
      new h.Vector3(-i, 0, 0),
      new h.Vector3(i, 0, 0),
      // Depth ribbon (Z axis)
      new h.Vector3(0, 0, -i),
      new h.Vector3(0, 0, i)
    ];
    return e.initialize(t, this.config.trailLength, !1, 0, a, this.mainTarget), e.setAdvanceFrequency(60), e.mesh && (e.mesh.frustumCulled = !1, e.mesh.renderOrder = 100), e;
  }
  _createSecondaryTrails() {
    const e = [];
    for (let t = 0; t < 4; t++) {
      const i = new I(this.scene, !1), a = zt(), s = this.config.secondaryTrailWidth, o = [
        // Vertical ribbon (Y axis)
        new h.Vector3(0, -s, 0),
        new h.Vector3(0, s, 0),
        // Horizontal ribbon (X axis)
        new h.Vector3(-s, 0, 0),
        new h.Vector3(s, 0, 0),
        // Depth ribbon (Z axis)
        new h.Vector3(0, 0, -s),
        new h.Vector3(0, 0, s)
      ];
      i.initialize(
        a,
        this.config.trailLength,
        !1,
        0,
        o,
        this.secondaryTargets[t]
      ), i.setAdvanceFrequency(60), i.mesh && (i.mesh.frustumCulled = !1, i.mesh.renderOrder = 100), e.push(i);
    }
    return e;
  }
  _updateColors() {
    const e = this.teamColors[this.team] || this.teamColors[0];
    this.mainTrail?.material && (this.mainTrail.material.uniforms.headColor.value.copy(e.head), this.mainTrail.material.uniforms.tailColor.value.copy(e.tail));
    const t = e.head.clone();
    t.w = e.head.w * 0.85;
    const i = e.tail.clone();
    this.secondaryTrails.forEach((a) => {
      a?.material && (a.material.uniforms.headColor.value.copy(t), a.material.uniforms.tailColor.value.copy(i));
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
  updatePosition(e, t, i) {
    if (this.dying) return;
    const a = t.clone().normalize();
    this.mainTarget.position.copy(e), this.mainTarget.updateMatrixWorld();
    for (let s = 0; s < 4; s++) {
      const r = s / 4 * Math.PI * 2 + i, l = new h.Vector3(
        Math.cos(r) * this.config.secondaryTrailOffset,
        Math.sin(r) * this.config.secondaryTrailOffset,
        0
      );
      if (a.lengthSq() > 1e-3) {
        const c = new h.Vector3(0, 0, 1), d = new h.Quaternion();
        d.setFromUnitVectors(c, a), l.applyQuaternion(d);
      }
      this.secondaryTargets[s].position.copy(e).add(l), this.secondaryTargets[s].updateMatrixWorld();
    }
  }
  update(e) {
    if (this.dying) {
      this.deathTime += e;
      const t = Math.min(1, this.deathTime / this.maxDeathTime), i = this.intensity * (1 - t);
      this.mainTrail?.material && (this.mainTrail.material.uniforms.intensityMultiplier.value = i), this.secondaryTrails.forEach((a) => {
        a?.material && (a.material.uniforms.intensityMultiplier.value = i);
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
class ss {
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
  emit(e, t, i) {
    const a = t.length();
    if (!(a >= this.minVelocity)) {
      this.currentSegment && !this.currentSegment.dying && (this.currentSegment.startDying(), this.currentSegment = null), this.wasEmitting = !1;
      return;
    }
    this.currentIntensity = this._calculateIntensity(a), this.active || this.activate(), !this.wasEmitting || !this.currentSegment ? (this.currentSegment && !this.currentSegment.dying && this.currentSegment.startDying(), this.currentSegment = new ns(
      this.scene,
      this.team,
      this.config,
      this.currentIntensity
    ), this.segments.push(this.currentSegment)) : this.currentSegment.setIntensity(this.currentIntensity), this.wasEmitting = !0, this.currentRotation += this.rotationSpeed * i, this.currentRotation > Math.PI * 2 && (this.currentRotation -= Math.PI * 2), this.currentSegment.updatePosition(e, t, this.currentRotation);
  }
  /**
   * Update trails (call every frame)
   * @param {number} delta - Time delta in seconds
   */
  update(e) {
    for (let t = this.segments.length - 1; t >= 0; t--) {
      const i = this.segments[t];
      i.update(e), i.active || (i.dispose(), this.segments.splice(t, 1));
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
let ye = null, be = null, xe = null, Bt = !1;
function os() {
  Bt || (hs(), ds(), ms(), Bt = !0);
}
let X = null;
class rs {
  constructor(e, t, i, a = 2) {
    this.scene = e, this.renderer = t, this.camera = i, this.maxExplosions = a, this.explosions = [], this.warmedUp = !1, this.initPool();
  }
  initPool() {
    this.sphereGeo = new h.SphereGeometry(1, 16, 12), this.coreGeo = new h.SphereGeometry(1, 12, 8), this.ringGeo = new h.RingGeometry(0.5, 1, 32), this.particleGeo = new h.PlaneGeometry(1, 1), this.coreMaterial = new h.MeshBasicMaterial({
      color: 16777130,
      transparent: !0,
      opacity: 0.9,
      blending: h.AdditiveBlending,
      side: h.DoubleSide,
      depthWrite: !1
    }), this.sphereMaterial = new h.MeshBasicMaterial({
      color: 16737792,
      transparent: !0,
      opacity: 0.5,
      blending: h.AdditiveBlending,
      side: h.DoubleSide,
      depthWrite: !1
    }), this.ringMaterial = new h.MeshBasicMaterial({
      color: 16746496,
      transparent: !0,
      opacity: 0.7,
      blending: h.AdditiveBlending,
      side: h.DoubleSide,
      depthWrite: !1
    }), this.particleMaterial = new h.MeshBasicMaterial({
      color: 16763904,
      transparent: !0,
      opacity: 0.8,
      blending: h.AdditiveBlending,
      side: h.DoubleSide,
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
    const e = this.renderer.getClearColor(new h.Color()), t = this.renderer.getClearAlpha(), i = this.renderer.autoClear;
    for (const a of this.explosions) {
      a.container.position.copy(this.camera.position), a.container.visible = !0, a.core.scale.set(1e-3, 1e-3, 1e-3), a.sphere.scale.set(1e-3, 1e-3, 1e-3), a.ring.scale.set(1e-3, 1e-3, 1e-3);
      for (const s of a.particles)
        s.mesh.scale.set(1e-3, 1e-3, 1e-3);
    }
    this.renderer.autoClear = !1, this.renderer.render(this.scene, this.camera);
    for (const a of this.explosions) {
      a.container.visible = !1, a.core.scale.set(0.1, 0.1, 0.1), a.sphere.scale.set(0.1, 0.1, 0.1), a.ring.scale.set(0.1, 0.1, 0.1);
      for (const s of a.particles)
        s.mesh.scale.set(12, 12, 12);
    }
    this.renderer.autoClear = i, this.renderer.setClearColor(e, t), this.warmedUp = !0, console.log("[SimplifiedExplosionPool] GPU shader warmup complete");
  }
  createExplosion() {
    const e = new h.Group();
    e.visible = !1, e.renderOrder = 999, this.scene.add(e);
    const t = this.coreMaterial.clone(), i = this.sphereMaterial.clone(), a = this.ringMaterial.clone(), s = this.particleMaterial.clone(), o = new h.Mesh(this.coreGeo, t);
    o.scale.set(0.1, 0.1, 0.1), o.renderOrder = 999, e.add(o);
    const r = new h.Mesh(this.sphereGeo, i);
    r.scale.set(0.1, 0.1, 0.1), r.renderOrder = 999, e.add(r);
    const l = new h.Mesh(this.ringGeo, a);
    l.rotation.x = -Math.PI / 2, l.scale.set(0.1, 0.1, 0.1), l.renderOrder = 999, e.add(l);
    const c = [];
    for (let d = 0; d < 12; d++) {
      const m = new h.Mesh(this.particleGeo, s);
      m.scale.set(12, 12, 12), m.renderOrder = 999, e.add(m);
      const u = d / 12 * Math.PI * 2, p = (Math.random() - 0.3) * Math.PI, f = 350 + Math.random() * 250;
      c.push({
        mesh: m,
        velocity: new h.Vector3(
          Math.cos(u) * Math.cos(p) * f,
          Math.sin(p) * f + 100,
          // Upward bias
          Math.sin(u) * Math.cos(p) * f
        )
      });
    }
    return {
      container: e,
      core: o,
      coreMat: t,
      sphere: r,
      ring: l,
      particles: c,
      particleMat: s,
      active: !1,
      elapsed: 0,
      duration: 0.4,
      position: new h.Vector3()
    };
  }
  trigger(e) {
    let t = this.explosions.find((i) => !i.active);
    t || (t = this.explosions[0], this.resetExplosion(t)), t.active = !0, t.elapsed = 0, t.position.copy(e), t.container.position.copy(e), t.container.visible = !0, t.core.scale.set(0.1, 0.1, 0.1), t.coreMat.opacity = 1, t.sphere.scale.set(0.1, 0.1, 0.1), t.sphere.material.opacity = 0.6, t.ring.scale.set(0.1, 0.1, 0.1), t.ring.material.opacity = 0.8, t.particleMat.opacity = 0.9, t.particles.forEach((i, a) => {
      i.mesh.position.set(0, 0, 0);
      const s = a / 12 * Math.PI * 2, o = (Math.random() - 0.3) * Math.PI, r = 350 + Math.random() * 250;
      i.velocity.set(
        Math.cos(s) * Math.cos(o) * r,
        Math.sin(o) * r + 100,
        Math.sin(s) * Math.cos(o) * r
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
      const i = t.elapsed / t.duration;
      if (i >= 1) {
        this.resetExplosion(t);
        continue;
      }
      const a = 30 + i * 80;
      t.core.scale.set(a, a, a), t.coreMat.opacity = 1 * Math.pow(1 - i, 2);
      const s = 50 + i * 200;
      t.sphere.scale.set(s, s, s), t.sphere.material.opacity = 0.6 * (1 - i);
      const o = 80 + i * 350;
      t.ring.scale.set(o, o, o), t.ring.material.opacity = 0.8 * (1 - i * i), t.particleMat.opacity = 0.9 * (1 - i);
      for (const r of t.particles)
        r.mesh.position.add(r.velocity.clone().multiplyScalar(e)), r.velocity.y -= 300 * e, this.camera && r.mesh.lookAt(this.camera.position);
    }
  }
  dispose() {
    for (const e of this.explosions)
      this.scene.remove(e.container), e.coreMat.dispose(), e.sphere.material.dispose(), e.ring.material.dispose(), e.particleMat.dispose();
    this.coreGeo.dispose(), this.sphereGeo.dispose(), this.ringGeo.dispose(), this.particleGeo.dispose(), this.coreMaterial.dispose(), this.sphereMaterial.dispose(), this.ringMaterial.dispose(), this.particleMaterial.dispose();
  }
}
function Oi(n, e = null, t = null) {
  return X || (X = new rs(n, e, t)), e && t && !X.warmedUp && (X.renderer = e, X.camera = t, X.warmup()), X;
}
function ls(n, e, t) {
  Oi(n, e, t), Li(n, e, t);
}
let Y = null;
const Dt = {
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
class cs {
  constructor(e, t, i, a = 2) {
    this.scene = e, this.renderer = t, this.camera = i, this.maxExplosions = a, this.explosions = [], this.warmedUp = !1, this.initPool();
  }
  initPool() {
    this.coreGeo = new h.SphereGeometry(1, 16, 12), this.sphereGeo = new h.SphereGeometry(1, 20, 14), this.ringGeo = new h.RingGeometry(0.3, 1, 48), this.particleGeo = new h.PlaneGeometry(1, 1), this.rayGeo = new h.PlaneGeometry(1, 1);
    for (let e = 0; e < this.maxExplosions; e++) {
      const t = this.createExplosion();
      this.explosions.push(t);
    }
  }
  createMaterialsForTeam(e) {
    const t = Dt[e] || Dt[0];
    return {
      core: new h.MeshBasicMaterial({
        color: t.core,
        transparent: !0,
        opacity: 1,
        blending: h.AdditiveBlending,
        side: h.DoubleSide,
        depthWrite: !1
      }),
      sphere: new h.MeshBasicMaterial({
        color: t.sphere,
        transparent: !0,
        opacity: 0.6,
        blending: h.AdditiveBlending,
        side: h.DoubleSide,
        depthWrite: !1
      }),
      ring: new h.MeshBasicMaterial({
        color: t.ring,
        transparent: !0,
        opacity: 0.8,
        blending: h.AdditiveBlending,
        side: h.DoubleSide,
        depthWrite: !1
      }),
      particles: new h.MeshBasicMaterial({
        color: t.particles,
        transparent: !0,
        opacity: 0.9,
        blending: h.AdditiveBlending,
        side: h.DoubleSide,
        depthWrite: !1
      }),
      rays: new h.MeshBasicMaterial({
        color: t.core,
        transparent: !0,
        opacity: 0.7,
        blending: h.AdditiveBlending,
        side: h.DoubleSide,
        depthWrite: !1
      })
    };
  }
  createExplosion() {
    const e = new h.Group();
    e.visible = !1, e.renderOrder = 999, this.scene.add(e);
    const t = {
      0: this.createMaterialsForTeam(0),
      1: this.createMaterialsForTeam(1)
    }, i = new h.Mesh(this.coreGeo, t[0].core);
    i.scale.set(0.1, 0.1, 0.1), i.renderOrder = 999, e.add(i);
    const a = new h.Mesh(this.coreGeo, t[0].core.clone());
    a.scale.set(0.1, 0.1, 0.1), a.renderOrder = 999, e.add(a);
    const s = new h.Mesh(this.coreGeo, t[0].sphere.clone());
    s.scale.set(0.1, 0.1, 0.1), s.renderOrder = 999, e.add(s);
    const o = new h.Mesh(this.sphereGeo, t[0].sphere);
    o.scale.set(0.1, 0.1, 0.1), o.renderOrder = 999, e.add(o);
    const r = [], l = [];
    for (let p = 0; p < 12; p++) {
      const f = new h.Mesh(this.rayGeo, t[0].rays.clone());
      f.scale.set(20, 300, 1), f.renderOrder = 999;
      const g = p / 12 * Math.PI * 2;
      f.rotation.z = g, f.position.set(0, 0, 0), e.add(f), l.push({ mesh: f, baseAngle: g });
    }
    const c = [], d = 12, m = 8;
    for (let p = 0; p < d; p++) {
      const f = p / d * Math.PI * 2, g = p % 3 === 0 ? 0.6 : p % 3 === 1 ? 0.2 : -0.1;
      for (let y = 0; y < m; y++) {
        const x = new h.Mesh(this.particleGeo, t[0].particles.clone());
        x.scale.set(40, 40, 40), x.renderOrder = 999, e.add(x);
        const v = f + (Math.random() - 0.5) * 0.3, b = g + (Math.random() - 0.5) * 0.2, w = 1800 * (1 - y / m * 0.5) + Math.random() * 300, S = y * 0.02, E = 1 - y / m * 0.4, B = (35 + Math.random() * 25) * E;
        c.push({
          mesh: x,
          velocity: new h.Vector3(
            Math.cos(v) * Math.cos(b) * w,
            Math.sin(b) * w + 300,
            Math.sin(v) * Math.cos(b) * w
          ),
          initialScale: B,
          delay: S,
          jetIndex: p
        });
      }
    }
    const u = 100;
    for (let p = 0; p < u; p++) {
      const f = new h.Mesh(this.particleGeo, t[0].particles.clone()), g = 8 + Math.random() * 18;
      f.scale.set(g, g, g), f.renderOrder = 999, e.add(f);
      const y = Math.random() * Math.PI * 2, x = (Math.random() - 0.5) * Math.PI, v = Math.random();
      let b;
      v < 0.3 ? b = 1500 + Math.random() * 800 : v < 0.6 ? b = 800 + Math.random() * 600 : b = 300 + Math.random() * 500, c.push({
        mesh: f,
        velocity: new h.Vector3(
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
      core: i,
      core2: a,
      core3: s,
      sphere: o,
      rings: r,
      rays: l,
      particles: c,
      materials: t,
      currentTeam: 0,
      active: !1,
      elapsed: 0,
      duration: 1.8,
      // Longer for dramatic jets
      position: new h.Vector3(),
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
    let i = this.explosions.find((l) => !l.active);
    i || (i = this.explosions[0], this.resetExplosion(i));
    const a = i.materials[t] || i.materials[0];
    i.core.material = a.core, i.core2.material = a.core.clone(), i.core3.material = a.sphere.clone(), i.sphere.material = a.sphere;
    for (const l of i.rings)
      l.mesh.material = a.ring.clone();
    for (const l of i.rays)
      l.mesh.material = a.rays.clone();
    for (const l of i.particles)
      l.mesh.material = a.particles.clone();
    i.active = !0, i.elapsed = 0, i.currentTeam = t, i.position.copy(e), i.container.position.copy(e), i.container.visible = !0, i.rotationOffset = 0, i.core.scale.set(0.1, 0.1, 0.1), i.core.material.opacity = 1, i.core2.scale.set(0.1, 0.1, 0.1), i.core2.material.opacity = 0.8, i.core3.scale.set(0.1, 0.1, 0.1), i.core3.material.opacity = 0.5, i.sphere.scale.set(0.1, 0.1, 0.1), i.sphere.material.opacity = 0.4;
    for (const l of i.rings)
      l.mesh.scale.set(0.1, 0.1, 0.1), l.mesh.material.opacity = 0.9;
    for (let l = 0; l < i.rays.length; l++) {
      const c = i.rays[l];
      c.mesh.material.opacity = 0.8, c.mesh.scale.set(40, 0.1, 1);
    }
    const s = 12, o = 8;
    let r = 0;
    for (let l = 0; l < s; l++) {
      const c = l / s * Math.PI * 2, d = l % 3 === 0 ? 0.6 : l % 3 === 1 ? 0.2 : -0.1;
      for (let m = 0; m < o && !(r >= i.particles.length); m++) {
        const u = i.particles[r];
        u.mesh.position.set(0, 0, 0), u.mesh.material.opacity = 1;
        const p = u.initialScale;
        u.mesh.scale.set(p, p, p);
        const f = c + (Math.random() - 0.5) * 0.3, g = d + (Math.random() - 0.5) * 0.2, v = 1800 * (1 - m / o * 0.5) + Math.random() * 300;
        u.velocity.set(
          Math.cos(f) * Math.cos(g) * v,
          Math.sin(g) * v + 300,
          Math.sin(f) * Math.cos(g) * v
        ), u.delay = m * 0.02, r++;
      }
    }
    for (; r < i.particles.length; ) {
      const l = i.particles[r];
      l.mesh.position.set(0, 0, 0), l.mesh.material.opacity = 1;
      const c = l.initialScale;
      l.mesh.scale.set(c, c, c);
      const d = Math.random() * Math.PI * 2, m = (Math.random() - 0.4) * Math.PI, u = 600 + Math.random() * 800;
      l.velocity.set(
        Math.cos(d) * Math.cos(m) * u,
        Math.sin(m) * u + 200,
        Math.sin(d) * Math.cos(m) * u
      ), l.delay = Math.random() * 0.15, r++;
    }
  }
  resetExplosion(e) {
    e.active = !1, e.container.visible = !1;
  }
  update(e) {
    for (const t of this.explosions) {
      if (!t.active) continue;
      t.elapsed += e;
      const i = t.elapsed / t.duration;
      if (i >= 1) {
        this.resetExplosion(t);
        continue;
      }
      t.rotationOffset += e * 2;
      const a = this.easeOutElastic(Math.min(i * 2, 1)), s = this.easeOutExpo(i), o = this.easeOutBack(Math.min(i * 1.5, 1)), r = 1 + Math.sin(t.elapsed * 15) * 0.15 * (1 - i), l = (150 + a * 300) * r;
      t.core.scale.set(l, l, l), t.core.material.opacity = 1 * Math.pow(1 - i, 1.2);
      const c = 1 + Math.sin(t.elapsed * 12 + 1) * 0.12 * (1 - i), d = (200 + o * 400) * c;
      t.core2.scale.set(d, d, d), t.core2.material.opacity = 0.7 * Math.pow(1 - i, 1.5);
      const m = 300 + s * 600;
      t.core3.scale.set(m, m, m), t.core3.material.opacity = 0.4 * Math.pow(1 - i, 2);
      const u = 400 + s * 1200;
      t.sphere.scale.set(u, u, u), t.sphere.material.opacity = 0.3 * (1 - i * i);
      for (let g = 0; g < t.rings.length; g++) {
        const y = t.rings[g], x = this.easeOutExpo(Math.min(i * (1.2 + g * 0.1), 1)), v = 300 + g * 100 + x * (1500 + g * 200);
        y.mesh.scale.set(v, v, v), y.mesh.material.opacity = 0.8 * Math.pow(1 - i, 1.5), y.axis === "horizontal" ? y.mesh.rotation.z = t.rotationOffset * 0.3 : y.axis === "verticalX" ? y.mesh.rotation.x += e * 1.5 : y.axis === "verticalZ" ? y.mesh.rotation.y += e * 1.2 : y.mesh.rotation.z += e * 0.8;
      }
      const p = 200 + s * 2e3, f = 1 + Math.sin(t.elapsed * 20) * 0.1 * (1 - i);
      for (let g = 0; g < t.rays.length; g++) {
        const y = t.rays[g], x = p * f * (0.8 + Math.sin(g * 0.5 + t.elapsed * 8) * 0.2), v = 60 * (1 - i * 0.4);
        y.mesh.scale.set(v, x, 1), y.mesh.rotation.z = y.baseAngle + t.rotationOffset * 0.5, y.mesh.material.opacity = 0.8 * Math.pow(1 - i, 1.3);
      }
      for (const g of t.particles) {
        if (Math.max(0, t.elapsed - (g.delay || 0)) > 0) {
          g.mesh.position.add(g.velocity.clone().multiplyScalar(e)), g.velocity.y -= 600 * e, g.velocity.multiplyScalar(0.995);
          const x = Math.max(0.3, 1 - i * 0.7), v = g.initialScale * x;
          g.mesh.scale.set(v, v, v);
        }
        g.mesh.material.opacity = 1 * Math.pow(1 - i, 1.2), this.camera && g.mesh.lookAt(this.camera.position);
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
function Li(n, e = null, t = null) {
  return Y || (Y = new cs(n, e, t)), e && t && !Y.warmedUp && (Y.renderer = e, Y.camera = t, Y.warmup()), Y;
}
function hs() {
  if (ye) return ye;
  const n = document.createElement("canvas");
  n.width = 64, n.height = 64;
  const e = n.getContext("2d"), t = e.createRadialGradient(32, 32, 0, 32, 32, 32);
  return t.addColorStop(0, "rgba(255,255,255,1)"), t.addColorStop(0.2, "rgba(255,255,255,0.8)"), t.addColorStop(0.5, "rgba(255,255,255,0.3)"), t.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = t, e.fillRect(0, 0, 64, 64), ye = new h.CanvasTexture(n), ye;
}
function ds() {
  if (be) return be;
  const n = document.createElement("canvas");
  n.width = 128, n.height = 128;
  const e = n.getContext("2d"), t = e.createRadialGradient(64, 64, 0, 64, 64, 64);
  return t.addColorStop(0, "rgba(255,255,255,1)"), t.addColorStop(0.1, "rgba(255,200,100,0.9)"), t.addColorStop(0.4, "rgba(255,100,50,0.4)"), t.addColorStop(0.7, "rgba(255,50,0,0.1)"), t.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = t, e.fillRect(0, 0, 128, 128), be = new h.CanvasTexture(n), be;
}
function ms() {
  if (xe) return xe;
  const n = document.createElement("canvas");
  n.width = 64, n.height = 64;
  const e = n.getContext("2d"), t = e.createImageData(64, 64);
  for (let i = 0; i < t.data.length; i += 4) {
    const a = i / 4 % 64, s = Math.floor(i / 4 / 64), o = a - 32, r = s - 32, l = Math.sqrt(o * o + r * r) / 32, c = Math.random() * 0.3 + 0.7, d = Math.max(0, 1 - l * l) * c * 255;
    t.data[i] = 255, t.data[i + 1] = 255, t.data[i + 2] = 255, t.data[i + 3] = d;
  }
  return e.putImageData(t, 0, 0), xe = new h.CanvasTexture(n), xe;
}
class us {
  constructor(e) {
    this.carMesh = e, this.active = !1, this.particleCount = 200, this.particles = [];
    const t = new h.BufferGeometry(), i = new Float32Array(this.particleCount * 3), a = new Float32Array(this.particleCount * 3), s = new Float32Array(this.particleCount), o = new Float32Array(this.particleCount);
    for (let l = 0; l < this.particleCount; l++)
      i[l * 3] = 0, i[l * 3 + 1] = 0, i[l * 3 + 2] = 0, a[l * 3] = 1, a[l * 3 + 1] = 0.5, a[l * 3 + 2] = 0.1, s[l] = 2, o[l] = 0, this.particles.push({
        life: 0,
        maxLife: 0.5,
        velocity: new h.Vector3(),
        active: !1
      });
    t.setAttribute("position", new h.BufferAttribute(i, 3)), t.setAttribute("color", new h.BufferAttribute(a, 3)), t.setAttribute("size", new h.BufferAttribute(s, 1)), t.setAttribute("alpha", new h.BufferAttribute(o, 1)), this.geometry = t;
    const r = new h.ShaderMaterial({
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
      blending: h.AdditiveBlending
    });
    this.points = new h.Points(t, r), this.points.frustumCulled = !1, this.nextParticleIndex = 0;
  }
  setActive(e) {
    this.active = e;
  }
  emit(e, t, i, a = 1) {
    if (!this.active) return;
    const s = Math.floor(Math.random() * 3) + 3, o = Math.max(1, Math.round(s * a));
    for (let r = 0; r < o; r++) {
      const l = this.particles[this.nextParticleIndex], c = this.geometry.attributes.position.array, d = this.geometry.attributes.alpha.array, m = this.geometry.attributes.size.array, u = this.geometry.attributes.color.array, p = this.nextParticleIndex, f = new h.Vector3(-55, 0, 0);
      f.applyQuaternion(t);
      const g = new h.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ), y = e.clone().add(f).add(g);
      c[p * 3] = y.x, c[p * 3 + 1] = y.y, c[p * 3 + 2] = y.z;
      const x = new h.Vector3(-1, 0, 0);
      x.applyQuaternion(t), x.multiplyScalar(150 + Math.random() * 80), l.velocity.copy(x), l.velocity.add(i.clone().multiplyScalar(0.2)), l.velocity.add(
        new h.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        )
      ), l.life = 0, l.maxLife = 0.3 + Math.random() * 0.3, l.active = !0, d[p] = 1, m[p] = 3 + Math.random() * 2, l.initialSize = m[p], u[p * 3] = 1, u[p * 3 + 1] = 0.8 + Math.random() * 0.2, u[p * 3 + 2] = 0.3 + Math.random() * 0.3, this.nextParticleIndex = (this.nextParticleIndex + 1) % this.particleCount;
    }
    this.geometry.attributes.position.needsUpdate = !0, this.geometry.attributes.alpha.needsUpdate = !0, this.geometry.attributes.size.needsUpdate = !0, this.geometry.attributes.color.needsUpdate = !0;
  }
  update(e) {
    const t = this.geometry.attributes.position.array, i = this.geometry.attributes.alpha.array, a = this.geometry.attributes.size.array, s = this.geometry.attributes.color.array;
    for (let o = 0; o < this.particleCount; o++) {
      const r = this.particles[o];
      if (!r.active) continue;
      if (r.life += e, r.life >= r.maxLife) {
        r.active = !1, i[o] = 0, a[o] = 0;
        continue;
      }
      t[o * 3] += r.velocity.x * e, t[o * 3 + 1] += r.velocity.y * e, t[o * 3 + 2] += r.velocity.z * e;
      const l = r.life / r.maxLife;
      i[o] = Math.pow(1 - l, 0.5);
      const c = r.initialSize || 3;
      a[o] = c * (1 - l * 0.7), s[o * 3] = 1, s[o * 3 + 1] = Math.max(0.2, 0.9 - l * 0.7), s[o * 3 + 2] = Math.max(0, 0.4 - l * 0.4), r.velocity.y += 20 * e;
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
class ps {
  constructor(e, t, i, a) {
    this.scene = e, this.team = t, this.trailWidth = i, this.trailLength = a, this.active = !0, this.dying = !1, this.deathTime = 0, this.maxDeathTime = 1.5, this.teamColors = {
      0: new h.Vector4(0.3, 0.6, 1, 0.9),
      // Blue
      1: new h.Vector4(1, 0.5, 0.15, 0.9)
      // Orange
    }, this.leftTarget = new h.Object3D(), this.rightTarget = new h.Object3D(), e.add(this.leftTarget), e.add(this.rightTarget), this.leftTrail = this.createTrail(this.leftTarget), this.rightTrail = this.createTrail(this.rightTarget), this.updateColors(), this.leftTrail.activate(), this.rightTrail.activate();
  }
  createTrail(e) {
    const t = new I(this.scene, !1), i = I.createBaseMaterial();
    i.blending = h.AdditiveBlending, i.depthWrite = !1, i.side = h.DoubleSide;
    const a = this.trailWidth, s = [
      // Vertical ribbon
      new h.Vector3(0, 0, 0),
      new h.Vector3(0, a, 0),
      // Horizontal ribbon (perpendicular)
      new h.Vector3(-a / 2, a / 2, 0),
      new h.Vector3(a / 2, a / 2, 0)
    ];
    return t.initialize(i, this.trailLength, !1, 0, s, e), t.setAdvanceFrequency(60), t.mesh && (t.mesh.frustumCulled = !1), t;
  }
  updateColors() {
    const e = this.teamColors[this.team] || this.teamColors[0], t = new h.Vector4(e.x * 0.3, e.y * 0.3, e.z * 0.3, 0);
    this.leftTrail?.material && (this.leftTrail.material.uniforms.headColor.value.copy(e), this.leftTrail.material.uniforms.tailColor.value.copy(t)), this.rightTrail?.material && (this.rightTrail.material.uniforms.headColor.value.copy(e), this.rightTrail.material.uniforms.tailColor.value.copy(t));
  }
  // Start the death process - trail will fade out
  startDying() {
    this.dying || (this.dying = !0, this.deathTime = 0, this.leftTrail.pause(), this.rightTrail.pause());
  }
  updatePosition(e, t, i) {
    this.dying || (this.leftTarget.position.copy(e), this.rightTarget.position.copy(t), this.leftTarget.quaternion.copy(i), this.rightTarget.quaternion.copy(i), this.leftTarget.updateMatrixWorld(), this.rightTarget.updateMatrixWorld());
  }
  update(e) {
    if (this.dying) {
      this.deathTime += e;
      const i = 1 - Math.min(1, this.deathTime / this.maxDeathTime), a = this.teamColors[this.team] || this.teamColors[0], s = new h.Vector4(a.x, a.y, a.z, a.w * i), o = new h.Vector4(a.x * 0.3, a.y * 0.3, a.z * 0.3, 0);
      this.leftTrail?.material && (this.leftTrail.material.uniforms.headColor.value.copy(s), this.leftTrail.material.uniforms.tailColor.value.copy(o)), this.rightTrail?.material && (this.rightTrail.material.uniforms.headColor.value.copy(s), this.rightTrail.material.uniforms.tailColor.value.copy(o)), this.deathTime >= this.maxDeathTime && (this.active = !1);
    }
    this.leftTrail.isActive && this.leftTrail.update(e), this.rightTrail.isActive && this.rightTrail.update(e);
  }
  dispose() {
    this.leftTrail.deactivate(), this.rightTrail.deactivate(), this.leftTrail.geometry && this.leftTrail.geometry.dispose(), this.rightTrail.geometry && this.rightTrail.geometry.dispose(), this.leftTrail.material && this.leftTrail.material.dispose(), this.rightTrail.material && this.rightTrail.material.dispose(), this.scene.remove(this.leftTarget), this.scene.remove(this.rightTarget);
  }
}
class fs {
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
    const t = this.groundedThreshold, i = this.arenaBounds;
    if (e.y < t)
      return { grounded: !0, surface: "floor", normal: new h.Vector3(0, 1, 0) };
    if (e.y > i.ceiling - t)
      return { grounded: !0, surface: "ceiling", normal: new h.Vector3(0, -1, 0) };
    if (Math.abs(e.x) > i.wallX - t) {
      const a = e.x > 0 ? -1 : 1;
      return { grounded: !0, surface: "wall", normal: new h.Vector3(a, 0, 0) };
    }
    if (Math.abs(e.z) > i.wallZ - t) {
      const a = e.z > 0 ? -1 : 1;
      return { grounded: !0, surface: "wall", normal: new h.Vector3(0, 0, a) };
    }
    return { grounded: !1, surface: null, normal: null };
  }
  emit(e, t, i) {
    if (!this.active) return;
    const a = this.isGrounded(e);
    if (!a.grounded) {
      this.currentSegment && !this.currentSegment.dying && (this.currentSegment.startDying(), this.currentSegment = null), this.wasGrounded = !1;
      return;
    }
    (!this.wasGrounded || !this.currentSegment) && (this.currentSegment && !this.currentSegment.dying && this.currentSegment.startDying(), this.currentSegment = new ps(
      this.scene,
      this.team,
      this.trailWidth,
      this.trailLength
    ), this.segments.push(this.currentSegment)), this.wasGrounded = !0;
    const o = new h.Vector3(-30, 5, 40), r = new h.Vector3(-30, 5, -40);
    o.applyQuaternion(t), r.applyQuaternion(t);
    const l = e.clone().add(o), c = e.clone().add(r), d = 2;
    if (a.surface === "floor")
      l.y = d, c.y = d;
    else if (a.surface === "ceiling")
      l.y = this.arenaBounds.ceiling - d, c.y = this.arenaBounds.ceiling - d;
    else if (a.surface === "wall") {
      if (a.normal.x !== 0) {
        const m = a.normal.x > 0 ? -this.arenaBounds.wallX + d : this.arenaBounds.wallX - d;
        l.x = m, c.x = m;
      } else if (a.normal.z !== 0) {
        const m = a.normal.z > 0 ? -this.arenaBounds.wallZ + d : this.arenaBounds.wallZ - d;
        l.z = m, c.z = m;
      }
    }
    this.currentSegment.updatePosition(l, c, t);
  }
  update(e) {
    for (let t = this.segments.length - 1; t >= 0; t--) {
      const i = this.segments[t];
      i.update(e), i.active || (i.dispose(), this.segments.splice(t, 1));
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
class gs {
  constructor(e) {
    this.scene = e, this.renderer = null, this.camera = null, this.explosions = {
      active: [],
      // frameIndex -> { time, team, playerName }: the replay's goal events, so
      // ActorManager can fire a team-colored explosion when playback reaches a
      // goal. Populated via setGoalEvents(); demoEvents is reserved for the
      // (currently inert) demolition path.
      goalEvents: /* @__PURE__ */ new Map(),
      demoEvents: /* @__PURE__ */ new Map()
    }, this.boostTrails = /* @__PURE__ */ new Map(), this.supersonicTrails = /* @__PURE__ */ new Map(), this.ballTrail = null, os();
  }
  /**
   * Set renderer and camera references for explosion pools
   * Should be called from GameEngine after initialization
   */
  setRenderContext(e, t) {
    this.renderer = e, this.camera = t, ls(this.scene, e, t);
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
   * Register the replay's goal events so the goal explosion fires when playback
   * reaches each one. Each event is `{ frame, time, team, playerName }` (team:
   * 0 = blue, 1 = orange). Static per replay — call once after load.
   */
  setGoalEvents(e) {
    this.explosions.goalEvents.clear();
    for (const t of e ?? [])
      Number.isFinite(t.frame) && this.explosions.goalEvents.set(t.frame, {
        time: t.time,
        team: t.team ?? 0,
        playerName: t.playerName ?? ""
      });
  }
  /**
   * Reset ball trail (call when seeking to avoid stale segments)
   */
  resetBallTrail() {
    this.ballTrail && this.ballTrail.reset();
  }
  createBoostTrail(e, t) {
    if (this.boostTrails.has(t)) {
      const a = this.boostTrails.get(t);
      a.removeFromScene(this.scene), a.dispose();
    }
    const i = new us(e);
    return i.addToScene(this.scene), this.boostTrails.set(t, i), i;
  }
  removeBoostTrail(e) {
    const t = this.boostTrails.get(e);
    t && (t.removeFromScene(this.scene), t.dispose(), this.boostTrails.delete(e));
  }
  updateBoostTrail(e, t, i, a, s) {
    const o = this.boostTrails.get(e);
    o && (o.setActive(t), t && o.emit(i, a, s, this._playbackSpeed || 1));
  }
  createSupersonicTrail(e, t) {
    if (this.supersonicTrails.has(e)) {
      const a = this.supersonicTrails.get(e);
      a.removeFromScene(this.scene), a.dispose();
    }
    const i = new fs(this.scene, t);
    return i.addToScene(this.scene), this.supersonicTrails.set(e, i), i;
  }
  removeSupersonicTrail(e) {
    const t = this.supersonicTrails.get(e);
    t && (t.removeFromScene(this.scene), t.dispose(), this.supersonicTrails.delete(e));
  }
  updateSupersonicTrail(e, t, i, a, s, o) {
    let r = this.supersonicTrails.get(e);
    !r && t && (r = this.createSupersonicTrail(e, o)), r && (o !== void 0 && r.team !== o && r.setTeam(o), r.setActive(t), t && r.emit(i, a, s));
  }
  createBallTrail() {
    return this.ballTrail && (this.ballTrail.removeFromScene(this.scene), this.ballTrail.dispose()), this.ballTrail = new ss(this.scene, 0), this.ballTrail.addToScene(this.scene), console.log("✓ Spiral ball trail created and added to scene"), this.ballTrail;
  }
  /**
   * Update ball trail with position and velocity
   * @param {THREE.Vector3} position - Ball position
   * @param {THREE.Vector3} velocity - Ball velocity
   * @param {number} team - Team (0 = blue, 1 = orange)
   */
  updateBallTrail(e, t, i) {
    this.ballTrail || this.createBallTrail(), i !== void 0 && this.ballTrail.team !== i && this.ballTrail.setTeam(i);
    const a = 1 / 60 * (this._playbackSpeed || 1);
    this.ballTrail.emit(e, t, a);
  }
  triggerGoalExplosion(e, t) {
    const i = Li(this.scene, this.renderer, this.camera);
    i && (this.camera && (i.camera = this.camera), i.trigger(e, t));
  }
  /**
   * Trigger a demolition explosion with car orientation
   * @param {THREE.Vector3} position - Explosion position
   * @param {THREE.Quaternion} rotation - Car rotation (optional, defaults to identity)
   * @param {number} team - Team (0 = blue, 1 = orange)
   */
  triggerDemoExplosion(e, t, i) {
    typeof t == "number" && (t = new h.Quaternion());
    const a = Oi(this.scene);
    a && a.trigger(e);
  }
  update(e, t = !0, i = 1) {
    this._playbackSpeed = i;
    const a = e * i;
    X && X.update(a), Y && Y.update(a);
    for (let s = this.explosions.active.length - 1; s >= 0; s--) {
      const o = this.explosions.active[s];
      o.update(a) && (o.removeFromScene(this.scene), this.explosions.active.splice(s, 1));
    }
    t && (this.boostTrails.forEach((s) => {
      s.update(a);
    }), this.supersonicTrails.forEach((s) => {
      s.update(a);
    }), this.ballTrail && this.ballTrail.update(a));
  }
}
const kt = {
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
class ys {
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
    const t = _t[e] || _t.Octane, i = kt[e] || kt.Octane, a = t.length, s = t.width, o = t.height, r = t.offsetX, l = t.offsetZ;
    console.log(`[HitboxManager] Creating hitbox for ${e}:`, {
      dims: t,
      length: a,
      width: s,
      height: o,
      offsetX: r,
      offsetY: l
    });
    const c = new h.Group(), d = new h.BoxGeometry(a, o, s), m = new h.EdgesGeometry(d), u = new h.LineBasicMaterial({
      color: i,
      linewidth: 2,
      transparent: !0,
      opacity: 0.8,
      depthTest: !1
    }), p = new h.LineSegments(m, u);
    p.frustumCulled = !1, p.position.set(r, l, 0), c.add(p);
    const f = 3.33, g = new h.SphereGeometry(f, 8, 6), y = new h.WireframeGeometry(g), x = new h.LineBasicMaterial({
      color: 16777215,
      // White for visibility
      linewidth: 1,
      transparent: !0,
      opacity: 0.9,
      depthTest: !1
    }), v = new h.LineSegments(y, x);
    return v.frustumCulled = !1, c.add(v), c.userData.hitboxType = e, c.frustumCulled = !1, c;
  }
  /**
   * Add or update a hitbox for a car
   * @param {string} carActorId - The car's actor ID
   * @param {string} hitboxType - The hitbox type
   */
  addHitbox(e, t) {
    if (this.hitboxes.has(e)) {
      const a = this.hitboxes.get(e);
      if (a.hitboxType === t)
        return;
      this.scene.remove(a.mesh), a.mesh.geometry.dispose(), a.mesh.material.dispose();
    }
    const i = this.createHitboxWireframe(t);
    i.visible = this.enabled, this.scene.add(i), this.hitboxes.set(e, { mesh: i, hitboxType: t });
  }
  /**
   * Remove a hitbox for a car
   * @param {string} carActorId - The car's actor ID
   */
  removeHitbox(e) {
    if (this.hitboxes.has(e)) {
      const { mesh: t } = this.hitboxes.get(e);
      this.scene.remove(t), t.traverse((i) => {
        i.geometry && i.geometry.dispose(), i.material && i.material.dispose();
      }), this.hitboxes.delete(e);
    }
  }
  /**
   * Update hitbox positions and rotations to match car transforms
   * @param {Object} actors - Map of actor ID to actor mesh
   * @param {Object} playerNameToCarActorId - Map of player name to car actor ID
   * @param {Function} getHitboxType - Function that returns hitbox type for a player name
   */
  updateHitboxes(e, t, i) {
    if (!this.enabled) return;
    for (const [s, o] of Object.entries(t)) {
      const r = e[o];
      if (!r || !r.userData.isCar) continue;
      const l = i ? i(s) : "Octane";
      this.hitboxes.has(o) || this.addHitbox(o, l);
      const { mesh: c } = this.hitboxes.get(o);
      c.position.copy(r.position), c.quaternion.copy(r.quaternion), c.visible = this.enabled && r.visible;
    }
    const a = new Set(Object.values(t));
    for (const s of this.hitboxes.keys())
      a.has(s) || this.removeHitbox(s);
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
const Vi = [
  "baseGroup",
  "glowMesh",
  "innerGlowMesh",
  "lensColumnMesh",
  "lensRimMesh",
  "topGlowMesh",
  "coreGlowMesh",
  "highlightMesh"
];
function Ue(n, e, t, i) {
  const a = new h.Mesh(
    new h.CircleGeometry(n, 32),
    new h.MeshBasicMaterial({
      color: e,
      transparent: !0,
      opacity: t,
      blending: h.AdditiveBlending,
      side: h.DoubleSide,
      depthWrite: !1
    })
  );
  return a.rotation.x = -Math.PI / 2, a.renderOrder = i, a;
}
function Ft(n, e) {
  n && n.traverse((t) => {
    const i = t;
    if (!i.isMesh || !(i.material instanceof h.MeshBasicMaterial))
      return;
    const a = i.userData.baseOpacity;
    i.material.opacity = (a ?? i.material.opacity) * e;
  });
}
function we(n, e, t) {
  n.rotation.x = -Math.PI / 2, n.renderOrder = t, n.frustumCulled = !1, n.userData.baseOpacity = e, n.material.transparent = !0, n.material.opacity = e, n.material.side = h.DoubleSide, n.material.depthWrite = !1;
}
function bs(n) {
  const e = new h.Group();
  e.renderOrder = 98, e.frustumCulled = !1;
  const t = new h.MeshBasicMaterial({ color: 1118477 }), i = new h.MeshBasicMaterial({
    color: 16752640,
    blending: h.AdditiveBlending
  }), a = new h.Mesh(new h.CircleGeometry(n * 0.55, 48), t.clone());
  we(a, 0.86, 98), e.add(a);
  const s = new h.Mesh(
    new h.RingGeometry(n * 0.45, n * 0.62, 48),
    new h.MeshBasicMaterial({
      color: 16765242,
      blending: h.AdditiveBlending
    })
  );
  we(s, 0.78, 100), s.position.y = 1.4, e.add(s);
  function o(r, l, c) {
    const d = new h.Shape();
    return [
      [r * Math.cos(-c * 0.72), r * Math.sin(-c * 0.72)],
      [l * Math.cos(-c), l * Math.sin(-c)],
      [l * Math.cos(c), l * Math.sin(c)],
      [r * Math.cos(c * 0.72), r * Math.sin(c * 0.72)]
    ].forEach(([u, p], f) => {
      f === 0 ? d.moveTo(u, p) : d.lineTo(u, p);
    }), d.closePath(), d;
  }
  for (let r = 0; r < 3; r += 1) {
    const l = r * (Math.PI * 2) / 3 + Math.PI / 2, c = new h.Mesh(
      new h.ShapeGeometry(o(n * 0.52, n * 1.42, 0.33)),
      t.clone()
    );
    we(c, 0.86, 98), c.rotation.z = l, e.add(c);
    const d = new h.Mesh(
      new h.ShapeGeometry(o(n * 0.66, n * 1.2, 0.21)),
      i.clone()
    );
    we(d, 0.86, 99), d.position.y = 1.1, d.rotation.z = l, e.add(d);
  }
  return e;
}
function Rt(n, e) {
  for (const t of Vi) {
    const i = n.userData[t];
    i && (i.visible = e);
  }
}
function xs() {
  let n = /* @__PURE__ */ new Map();
  function e(i) {
    const a = i.player.adapter.boostPads;
    !a || a.size === 0 || (console.log(`[boost-pads] Creating ${a.size} boost pads...`), n = /* @__PURE__ */ new Map(), a.forEach((s, o) => {
      const r = s.isBig;
      let l, c, d;
      if (r) {
        l = new h.SphereGeometry(37, 24, 18), c = new h.MeshPhysicalMaterial({
          color: 16757274,
          emissive: 16747008,
          emissiveIntensity: 0.42,
          metalness: 0.04,
          roughness: 0.08,
          clearcoat: 1,
          clearcoatRoughness: 0.025,
          transmission: 0.18,
          thickness: 30,
          ior: 1.42,
          envMapIntensity: 1.9,
          blending: h.AdditiveBlending,
          transparent: !0,
          // CRITICAL: Required for opacity changes
          opacity: 0.68,
          depthWrite: !1
          // Fix transparency sorting with arena walls
        }), d = new h.Mesh(l, c), d.renderOrder = 100;
        const f = bs(37 * 2.05);
        f.position.y = -140, d.add(f), d.userData.baseGroup = f;
        const g = new h.Mesh(
          new h.CylinderGeometry(37 * 0.12, 37 * 0.18, 112, 24, 1, !0),
          new h.MeshBasicMaterial({
            color: 16761664,
            transparent: !0,
            opacity: 0.28,
            blending: h.AdditiveBlending,
            side: h.DoubleSide,
            depthWrite: !1
          })
        );
        g.position.y = -62, g.renderOrder = 99, d.add(g), d.userData.lensColumnMesh = g;
        const y = new h.Mesh(
          new h.SphereGeometry(37 * 1.03, 24, 14),
          new h.MeshBasicMaterial({
            color: 16768890,
            transparent: !0,
            opacity: 0.32,
            blending: h.AdditiveBlending,
            side: h.BackSide,
            depthWrite: !1
          })
        );
        y.renderOrder = 101, d.add(y), d.userData.lensRimMesh = y;
        const x = new h.SphereGeometry(37 * 1.3, 20, 14), v = new h.MeshBasicMaterial({
          color: 16758315,
          transparent: !0,
          opacity: 0.16,
          blending: h.AdditiveBlending,
          side: h.BackSide,
          // Render inside of sphere for halo effect
          depthWrite: !1
        }), b = new h.Mesh(x, v);
        b.renderOrder = 99, d.add(b), d.userData.glowMesh = b;
        const M = new h.SphereGeometry(37 * 1.12, 20, 14), C = new h.MeshBasicMaterial({
          color: 16761130,
          transparent: !0,
          opacity: 0.22,
          blending: h.AdditiveBlending,
          side: h.BackSide,
          depthWrite: !1
        }), w = new h.Mesh(M, C);
        w.renderOrder = 99, d.add(w), d.userData.innerGlowMesh = w, d.userData.needsLight = !0;
      } else {
        l = new h.CylinderGeometry(45, 45 * 0.92, 8, 32), c = new h.MeshPhysicalMaterial({
          color: 16761370,
          emissive: 16750336,
          emissiveIntensity: 0.72,
          metalness: 0.88,
          roughness: 0.14,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          envMapIntensity: 2,
          transparent: !0,
          // CRITICAL: Required for opacity changes
          opacity: 1,
          depthWrite: !1
          // Fix transparency sorting with arena walls
        }), d = new h.Mesh(l, c), d.renderOrder = 100;
        const g = Ue(45 * 1.42, 16756736, 0.34, 101);
        g.position.y = 8 / 2 + 0.15, d.add(g), d.userData.topGlowMesh = g;
        const y = Ue(45 * 0.74, 16777114, 0.42, 102);
        y.position.y = 8 / 2 + 0.35, d.add(y), d.userData.coreGlowMesh = y;
        const x = Ue(45 * 0.42, 16775376, 0.46, 103);
        x.position.set(-45 * 0.18, 8 / 2 + 0.55, -45 * 0.12), x.scale.y = 0.34, d.add(x), d.userData.highlightMesh = x;
      }
      const u = r ? 130 : 10;
      if (d.position.set(
        s.position.x,
        // X stays the same
        u,
        // Y = height (use our custom float height)
        s.position.y
        // Z = Unreal Y (position along the field length)
      ), d.userData.padId = o, d.userData.isBig = r, d.userData.isAvailable = !0, i.scene.add(d), n.set(o, d), d.userData.needsLight) {
        const p = new h.PointLight(16751872, 0.7, 480);
        p.decay = 0, p.position.set(s.position.x, u - 50, s.position.y), i.scene.add(p), d.userData.light = p;
      }
    }), console.log(`[boost-pads] ✓ Created ${n.size} boost pad meshes`));
  }
  function t(i) {
    i.player.adapter.boostPads.forEach((s, o) => {
      const r = n.get(o);
      if (!r) return;
      const l = s.isAvailable;
      r.userData.isAvailable !== l && (r.userData.isAvailable = l, l ? (r.material.color.setHex(s.isBig ? 16757274 : 16761370), r.material.emissive.setHex(s.isBig ? 16747008 : 16750336), r.material.emissiveIntensity = s.isBig ? 0.42 : 0.72, r.material.opacity = s.isBig ? 0.68 : 1, r.visible = !0, Rt(r, !0), Ft(r.userData.baseGroup, 1), r.userData.light && (r.userData.light.intensity = 0.85), r.userData.glowMesh && (r.userData.glowMesh.visible = !0), r.userData.innerGlowMesh && (r.userData.innerGlowMesh.visible = !0)) : (r.material.color.setHex(s.isBig ? 9063424 : 9065472), r.material.emissive.setHex(0), r.material.emissiveIntensity = 0, r.material.opacity = 0.2, r.visible = !0, Rt(r, !1), r.userData.baseGroup && (r.userData.baseGroup.visible = !0, Ft(r.userData.baseGroup, 0.26)), r.userData.light && (r.userData.light.intensity = 0), r.userData.glowMesh && (r.userData.glowMesh.visible = !1), r.userData.innerGlowMesh && (r.userData.innerGlowMesh.visible = !1)));
    });
  }
  return {
    id: "boost-pads",
    setup(i) {
      e(i);
    },
    beforeRender(i) {
      t(i);
    },
    teardown(i) {
      n.forEach((a) => {
        i.scene.remove(a), a.geometry.dispose(), a.material.dispose();
        for (const o of Vi) {
          const r = a.userData[o];
          r && r.traverse((l) => {
            const c = l;
            c.isMesh && (c.geometry.dispose(), c.material.dispose());
          });
        }
        const s = a.userData.light;
        s && (i.scene.remove(s), s.dispose());
      }), n.clear();
    }
  };
}
function ws(n) {
  if (n.frames.length === 0)
    return null;
  const e = /* @__PURE__ */ new Map();
  for (const a of n.frames)
    e.set(a.gameState, (e.get(a.gameState) ?? 0) + 1);
  let t = null, i = -1;
  for (const [a, s] of e.entries())
    s <= i || (t = a, i = s);
  return t;
}
function vs(n, e) {
  if (e === null)
    return null;
  for (const t of n.frames) {
    if (t.gameState === e)
      break;
    return t.gameState;
  }
  return null;
}
function Ni(n, e) {
  return e === null ? n.kickoffCountdown <= 0 : n.gameState === e;
}
function ot(n, e) {
  return n.kickoffCountdown > 0 ? !0 : e !== null && n.gameState === e;
}
function Ms(n, e) {
  return n.ballFrames[e]?.position ? !0 : n.players.some((t) => t.frames[e]?.position);
}
function Ts(n, e, t, i) {
  return ot(e, i) && Ms(n, t);
}
function Ce(n, e, t, i, a) {
  return !Ni(e, i) && !Ts(n, e, t, a);
}
function Ot(n, e, t, i, a, s, o) {
  return i && Ce(n, e, t, s, o) || a && ot(e, o);
}
function Cs(n, e, t, i, a) {
  const s = [], { frames: o } = n;
  if (o.length === 0 || !e && !t)
    return s;
  let r = 0;
  for (; r < o.length; ) {
    const l = o[r];
    if (!l || !Ot(
      n,
      l,
      r,
      e,
      t,
      i,
      a
    )) {
      r += 1;
      continue;
    }
    const c = l.time;
    let d = r + 1;
    for (; d < o.length && Ot(
      n,
      o[d],
      d,
      e,
      t,
      i,
      a
    ); )
      d += 1;
    const m = o[d]?.time ?? n.duration;
    if (m > c) {
      const u = s.at(-1);
      u && u.endTime >= c ? u.endTime = Math.max(u.endTime, m) : s.push({ startTime: c, endTime: m });
    }
    r = d;
  }
  return s;
}
function Ss(n, e, t) {
  const i = h.MathUtils.clamp(t, 0, n);
  for (const a of e) {
    if (i < a.startTime)
      break;
    if (i < a.endTime)
      return {
        replayTime: i,
        timelineTime: i,
        seekTime: a.endTime,
        hiddenBySkip: !0
      };
  }
  return {
    replayTime: i,
    timelineTime: i,
    seekTime: i,
    hiddenBySkip: !1
  };
}
function _s(n, e, t, i) {
  return h.MathUtils.clamp(i, 0, n);
}
function Ps(n, e) {
  const t = e.at(-1);
  return !t || t.endTime < n ? n : h.MathUtils.clamp(t.startTime, 0, n);
}
function Es(n, e, t) {
  const i = n.frames[e];
  if (!i || i.kickoffCountdown <= 0)
    return null;
  let a = e;
  for (; a > 0 && (n.frames[a - 1]?.kickoffCountdown ?? 0) > 0; )
    a -= 1;
  let s = e + 1;
  for (; s < n.frames.length && n.frames[s].kickoffCountdown > 0; )
    s += 1;
  let o = 0;
  for (let c = a; c < s; c += 1)
    o = Math.max(o, n.frames[c].kickoffCountdown);
  const r = n.frames[s]?.time ?? n.duration, l = Math.max(0, r - t);
  return {
    kind: "kickoff-countdown",
    countdown: Math.max(1, Math.min(o, Math.ceil(l))),
    secondsRemaining: l,
    endsAt: r
  };
}
function Is(n, e) {
  const t = fe(n, e), i = Math.min(t + 1, n.frames.length - 1);
  if (i === t)
    return { frameIndex: t, nextFrameIndex: i, alpha: 0, dt: 0 };
  const a = n.frames[t]?.time ?? 0, s = n.frames[i]?.time ?? a;
  return s <= a ? { frameIndex: t, nextFrameIndex: i, alpha: 0, dt: 0 } : {
    frameIndex: t,
    nextFrameIndex: i,
    alpha: h.MathUtils.clamp((e - a) / (s - a), 0, 1),
    dt: s - a
  };
}
new h.Vector3(-1, 0, 0);
new h.Vector3(0, 0, 1);
new h.Vector3(-1, 0, 0);
new h.Vector3(0, 0, 700);
new h.Vector3(0, 0, 900);
new h.Vector3(9600, 12600, -5500).normalize();
function Gi(n, e, t) {
  return n ? !e || t <= 0 ? n : {
    x: h.MathUtils.lerp(n.x, e.x, t),
    y: h.MathUtils.lerp(n.y, e.y, t),
    z: h.MathUtils.lerp(n.z, e.z, t)
  } : e;
}
const As = 3.2;
function zs(n, e, t, i) {
  const a = fe(n, e), s = n.frames[a];
  if (!s || !ot(s, i))
    return null;
  const o = n.frames.find(
    (r, l) => l > a && Ni(r, t)
  );
  return !o || o.time === e ? null : o.time;
}
function Bs(n, e, t, i) {
  const a = fe(n, e), s = n.frames[a];
  if (!s || !Ce(n, s, a, t, i))
    return null;
  const o = n.frames.find(
    (c, d) => d > a && !Ce(n, c, d, t, i)
  );
  if (o)
    return o.time === e ? null : o.time;
  let r = a;
  for (; r > 0 && Ce(
    n,
    n.frames[r - 1],
    r - 1,
    t,
    i
  ); )
    r -= 1;
  const l = n.frames[r]?.time;
  return l === void 0 || l === e ? null : l;
}
function Ds(n) {
  return !!n?.position && n?.isPresent !== !1;
}
function ks(n, e, t) {
  for (let i = n.length - 1; i >= 0; i -= 1) {
    const a = n[i], s = t - a.time;
    if (!(s < 0)) {
      if (s > As)
        break;
      if (a.kind === "demo" && a.secondaryPlayerId === e)
        return a;
    }
  }
  return null;
}
const Fs = "space", Rs = {
  // Mirrors ballcam's "Space" environment, including its slow skybox drift.
  // Disable with `animation: { enabled: false }` on a custom descriptor.
  space: {
    id: "space",
    skyboxUrl: "/skyboxes/PlanetaryEarth4k.hdr",
    exposure: 1.45,
    rotation: { x: 8, y: 0, z: 28 },
    animation: { enabled: !0, speed: 2 }
  }
};
function Os(n) {
  if (n === !1) return null;
  if (typeof n == "string") {
    const e = Rs[n];
    return e || (console.warn(`[player] unknown environment "${n}"; using neutral default`), null);
  }
  return n;
}
const Ls = new Proxy({}, { get: () => () => {
} });
function Lt(n) {
  if (!n) return null;
  const e = {};
  for (const t of Object.keys(n)) {
    const i = n[t];
    typeof i == "number" && Number.isFinite(i) && (e[t] = i);
  }
  return e;
}
const Vt = 48, ve = 0.14, Vs = 16, Ns = 16, Gs = 3e-3, $s = 0.05, Hs = 1.08, Nt = 4120, Gt = 5140, Ws = 0, Us = 2200, js = new h.Vector3(0, 700, 0), Ks = new h.Vector3(-1, 0, 0), Xs = new h.Vector3(0, -1, 0), Ys = new h.Vector3(0, 900, 0), qs = new h.Vector3(0, 1, 0), Zs = new h.Vector3(9600, -5500, 12600).normalize();
function Qs(n, e) {
  const t = Number.isFinite(e) && e > 0 ? e : 1.7777777777777777, i = n === "overhead" ? js.clone() : Ys.clone(), a = n === "overhead" ? Ks.clone() : qs.clone(), s = n === "overhead" ? Xs.clone() : Zs.clone(), o = Js({
    aspect: t,
    fov: Vt,
    forward: s,
    margin: Hs,
    target: i,
    up: a
  });
  return {
    position: i.clone().addScaledVector(s, -o),
    target: i,
    up: a,
    fov: Vt
  };
}
function Js(n) {
  const { aspect: e, fov: t, forward: i, margin: a, target: s, up: o } = n, r = i.clone().normalize(), l = new h.Vector3().crossVectors(r, o).normalize(), c = new h.Vector3().crossVectors(l, r).normalize(), d = Math.tan(h.MathUtils.degToRad(t) / 2), m = d * e;
  let u = 1;
  for (const p of [-Nt, Nt])
    for (const f of [Ws, Us])
      for (const g of [-Gt, Gt]) {
        const y = new h.Vector3(p, f, g).sub(s), x = Math.abs(y.dot(l)), v = Math.abs(y.dot(c)), b = y.dot(r);
        u = Math.max(
          u,
          x / m - b,
          v / d - b
        );
      }
  return Math.max(1, u * a);
}
function eo(n) {
  const e = new h.Group();
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
  ), n.add(e), e;
}
class to extends EventTarget {
  container;
  /** The subtr-actor adapter — the sole data source (timelines + live entities). */
  adapter;
  /**
   * @rlrml/player's normalized `ReplayModel` over the same raw WASM output the
   * adapter consumes (docs/player/PLAYER_PARITY.md Phase 2) — the data surface
   * @rlrml/player consumers read. Shares the adapter's time axis (t=0 at the
   * first frame) and player-id format. Null when constructed directly with an
   * adapter only; `createPlayer()` always provides it.
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
   * @rlrml/player's `ReplayScene` surface (docs/player/PLAYER_PARITY.md Phase 3+):
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
  freeCameraTransition = null;
  // ── @rlrml/player-parity state (docs/player/PLAYER_PARITY.md). Camera fields are
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
  constructor(e, t, i = {}, a = null) {
    super(), this.container = e, this.adapter = t, this.replay = a, this.options = i, this.updateReplayGameStates(), this.speed = Math.max(0.1, i.initialPlaybackRate ?? i.speed ?? 1), this.loop = i.loop ?? !1, this.cameraDistanceScaleValue = Math.max(0.25, i.initialCameraDistanceScale ?? 1), this.customCameraSettingsValue = Lt(
      i.initialCustomCameraSettings
    ), this.attachedPlayerIdValue = i.initialAttachedPlayerId ?? null, this.cameraViewModeValue = i.initialCameraViewMode ?? (this.attachedPlayerIdValue ? "follow" : "free"), this.ballCamEnabledValue = i.initialBallCamEnabled ?? null, this.boostMeterEnabledValue = i.initialBoostMeterEnabled ?? !1, this.boostPickupAnimationEnabledValue = i.initialBoostPickupAnimationEnabled ?? !0, this.hitboxWireframesEnabledValue = i.initialHitboxWireframesEnabled ?? !1, this.hitboxOnlyModeEnabledValue = i.initialHitboxOnlyModeEnabled ?? !1, this.skipPostGoalTransitionsEnabledValue = i.initialSkipPostGoalTransitionsEnabled ?? !0, this.skipKickoffsEnabledValue = i.initialSkipKickoffsEnabled ?? !1, this.sceneManager = new jn(e, {
      assetBase: i.assetBase,
      preserveDrawingBuffer: i.preserveDrawingBuffer
    }), this.sceneManager.initDefaultEnvironment(), this.applyEnvironmentSpec(i.environment ?? Fs), this.arenaManager = new Yn(this.scene, { assetBase: i.assetBase }), this.effectsEnabled = i.effects ?? !0, this.effectsManager = this.effectsEnabled ? new gs(this.scene) : Ls, this.actorManager = new as(this.scene, this.effectsManager, {
      assetBase: i.assetBase
    }), i.motionInterpolation && this.setMotionInterpolation(i.motionInterpolation), this.actorManager.initFromFramework(t), this.actorManager.initInterpolants(t.getTimelines()), this.hitboxManager = new ys(this.scene), this.syncGoalEvents(), this.controls = new fa(this.camera, this.renderer.domElement), this.controls.zoomSpeed = 2.5, this.camera.position.set(0, 4e3, 6e3), this.controls.target.set(0, 200, 0), this.controls.update(), this.replayRoot = eo(this.scene), this.sceneState = this.createSceneState(), this.ready = Promise.all([
      this.arenaManager.loadArenaMeshes().catch((s) => {
        console.warn("[player] arena load failed", s);
      }),
      this.prepareReplayAssets()
    ]).then(() => {
    }), this.installResizeHandling();
    for (const s of i.plugins ?? [])
      this.installPlugin(s, !1);
    this.plugins.some((s) => s.plugin.id === "boost-pads") || this.installPlugin(xs(), !1), this.applyInitialCameraOptions(), this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded(), this.scheduleAnimationFrame(), this.emitChange(), i.autoplay && this.play();
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
  /**
   * Replace the replay data feeding this player without replacing the renderer,
   * canvas, arena, camera controls, or player instance. This is the replay-boundary
   * path for playlist/review UIs: replay-specific actors, effects, timelines,
   * and plugin setup are refreshed against the new adapter while the static
   * render shell remains mounted.
   */
  async replaceReplay(e, t, i = {}) {
    if (this.disposed)
      throw new Error("Cannot replace replay on a disposed ReplayPlayer");
    const a = i.preservePlayback ?? this.playing;
    this.playing && this.setPlayingInternal(!1), this.teardownPlugins(), this.effectsManager.reset(), this.effectsManager.clearEvents?.(), this.hitboxManager.reset(), this.actorManager.reset(), this.adapter = e, this.replay = t, this.updateReplayGameStates(), this.timelineSegmentsCacheKey = null, this.timelineSegmentsCache = [], this.hitboxTypeByName = null, this.hitboxesActive = !1, this.freeCameraTransition = null, this.actorManager.initFromFramework(e), this.actorManager.initInterpolants(e.getTimelines()), this.syncGoalEvents();
    const s = this.attachedPlayerIdValue && this.adapter.playerList.some((o) => o.id === this.attachedPlayerIdValue) ? this.attachedPlayerIdValue : null;
    s !== this.attachedPlayerIdValue && (this.attachedPlayerIdValue = s, this.cameraViewModeValue === "follow" && (this.cameraViewModeValue = "free")), this.seekInternal(i.currentTime ?? 0), this.ready = this.prepareReplayAssets(), await this.ready, this.setupPlugins(), this.applyInitialCameraOptions(), this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded(), a && this.setPlayingInternal(!0), this.render(), this.emitChange();
  }
  // ── Environment (skybox + IBL) ──────────────────────────────────────────────
  /**
   * Switch the skybox environment at runtime. Accepts a built-in id (e.g.
   * `"space"`), a full `PlayerEnvironment` descriptor, or `false` for the
   * neutral default (no skybox). Non-blocking: the HDR swaps in when decoded.
   */
  setEnvironment(e) {
    this.applyEnvironmentSpec(e);
  }
  applyEnvironmentSpec(e) {
    const t = Os(e);
    if (!t) {
      this.sceneManager.setDefaultBackground();
      return;
    }
    this.sceneManager.applyEnvironment(t).catch((i) => {
      console.warn(`[player] environment "${t.id}" failed to load`, i);
    });
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
   * PlayerOptions.motionInterpolation). Takes effect on the next rendered
   * frame — handy for A/B-ing smoothness live.
   */
  setMotionInterpolation(e) {
    this.actorManager.interpolationMethod = e === "linear" ? "lerp" : "hermite";
  }
  // ── Frame stepping (@rlrml/player parity, off the adapter's frame timeline) ──
  setFrameIndex(e) {
    const t = this.adapter.frameTimes;
    if (t.length === 0 || !Number.isFinite(e)) return;
    const i = Math.min(Math.max(Math.trunc(e), 0), t.length - 1);
    this.playing && this.setPlayingInternal(!1), this.seekInternal(t[i]), this.emitChange();
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
    this.attachedPlayerIdValue = e, this.cameraViewModeValue = e ? "follow" : "free", this.attachmentTouched = !0, this.freeCameraTransition = null, this.syncCameraAttachment(), this.emitChange();
  }
  setCameraViewMode(e) {
    this.cameraViewModeValue = e, this.attachmentTouched = !0, this.freeCameraTransition = null, this.syncCameraAttachment(), this.emitChange();
  }
  setFreeCameraPreset(e, t = {}) {
    this.cameraViewModeValue = "free", this.attachmentTouched = !0, this.syncCameraAttachment();
    const i = Qs(e, this.camera.aspect);
    t.instant ? (this.camera.position.copy(i.position), this.controls.target.copy(i.target), this.camera.up.copy(i.up).normalize(), this.camera.fov = i.fov, this.camera.updateProjectionMatrix(), this.camera.lookAt(i.target), this.controls.enabled = !0, this.freeCameraTransition = null) : this.freeCameraTransition = i, this.emitChange();
  }
  /**
   * Force ball cam (`true`) or car cam (`false`), or pass `null` to follow the
   * attached player's recorded ball-cam toggle ("player" view — the default).
   */
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
    e.speed !== void 0 && (this.speed = Math.max(0.1, e.speed)), e.cameraDistanceScale !== void 0 && (this.cameraDistanceScaleValue = Math.max(0.25, e.cameraDistanceScale), this.getCameraPlugin()?.setDistanceScale(this.cameraDistanceScaleValue)), e.customCameraSettings !== void 0 && this.applyCustomCameraSettings(e.customCameraSettings), e.cameraViewMode !== void 0 && (this.cameraViewModeValue = e.cameraViewMode, this.attachmentTouched = !0), e.attachedPlayerId !== void 0 && (this.attachedPlayerIdValue = e.attachedPlayerId, this.attachmentTouched = !0, e.cameraViewMode === void 0 && (this.cameraViewModeValue = e.attachedPlayerId ? "follow" : "free")), (e.cameraViewMode !== void 0 || e.attachedPlayerId !== void 0) && (this.freeCameraTransition = null, this.syncCameraAttachment()), e.useReplayBallCam === !0 ? (this.ballCamEnabledValue = null, this.getCameraPlugin()?.setBallCam(null)) : e.ballCamEnabled !== void 0 && (this.ballCamEnabledValue = e.ballCamEnabled, this.getCameraPlugin()?.setBallCam(e.ballCamEnabled)), e.boostMeterEnabled !== void 0 && (this.boostMeterEnabledValue = e.boostMeterEnabled), e.boostPickupAnimationEnabled !== void 0 && (this.boostPickupAnimationEnabledValue = e.boostPickupAnimationEnabled), e.hitboxWireframesEnabled !== void 0 && (this.hitboxWireframesEnabledValue = e.hitboxWireframesEnabled), e.hitboxOnlyModeEnabled !== void 0 && (this.hitboxOnlyModeEnabledValue = e.hitboxOnlyModeEnabled), e.skipPostGoalTransitionsEnabled !== void 0 && (this.skipPostGoalTransitionsEnabledValue = e.skipPostGoalTransitionsEnabled), e.skipKickoffsEnabled !== void 0 && (this.skipKickoffsEnabledValue = e.skipKickoffsEnabled), e.currentTime !== void 0 && this.seekInternal(e.currentTime), e.playing !== void 0 && e.playing !== this.playing && this.setPlayingInternal(e.playing), this.playing && (e.currentTime !== void 0 || e.playing !== void 0) && (this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded()), this.emitChange();
  }
  getState() {
    const e = this.adapter.frameIndexAt(this.currentTime), t = this.getCameraPlugin();
    let i = this.cameraViewModeValue, a = this.attachedPlayerIdValue;
    if (t)
      if (t.getMode() === "follow") {
        i = "follow";
        const s = t.getTarget();
        a = (s ? this.adapter.playerList.find((r) => r.name === s) : void 0)?.id ?? a;
      } else
        i = "free", a = null;
    return {
      currentTime: this.currentTime,
      duration: this.duration,
      frameIndex: e,
      // Kickoff countdowns, like @rlrml/player. The adapter's frame timeline is
      // the ReplayModel's (same metadata frames, same time axis), so its index
      // is valid against the model.
      activeMetadata: this.replay ? Es(this.replay, e, this.currentTime) : null,
      playing: this.playing,
      speed: this.speed,
      cameraDistanceScale: this.cameraDistanceScaleValue,
      customCameraSettings: this.customCameraSettingsValue,
      cameraViewMode: i,
      attachedPlayerId: a,
      ballCamEnabled: t ? t.getBallCam() : this.ballCamEnabledValue ?? !1,
      // null override = follow the player's recorded ball-cam toggle.
      useReplayBallCam: this.ballCamEnabledValue === null,
      effectiveBallCamEnabled: t ? t.getBallCam() : this.ballCamEnabledValue ?? !1,
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
    return this.timelineSegmentsCacheKey === e ? this.timelineSegmentsCache : (this.timelineSegmentsCacheKey = e, this.timelineSegmentsCache = Cs(
      this.replay,
      this.skipPostGoalTransitionsEnabledValue,
      this.skipKickoffsEnabledValue,
      this.liveGameState,
      this.kickoffGameState
    ), this.timelineSegmentsCache);
  }
  projectReplayTimeToTimeline(e) {
    return Ss(
      this.replay?.duration ?? this.duration,
      this.getTimelineSegments(),
      e
    );
  }
  projectTimelineTimeToReplay(e) {
    return _s(
      this.replay?.duration ?? this.duration,
      this.getTimelineDuration(),
      this.getTimelineSegments(),
      e
    );
  }
  subscribe(e) {
    const t = (i) => {
      e(i.detail);
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
    const t = this.plugins.findIndex((a) => a.plugin.id === e);
    if (t < 0) return !1;
    const [i] = this.plugins.splice(t, 1);
    return i.plugin.teardown?.(this.createPluginContext()), !0;
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
  prepareReplayAssets() {
    return this.actorManager.waitForBallModel().catch(() => !1).then(() => {
      if (this.effectsEnabled)
        try {
          this.effectsManager.setRenderContext(this.renderer, this.camera);
        } catch (e) {
          console.warn("[player] explosion warmup failed", e);
        }
    });
  }
  updateReplayGameStates() {
    if (!this.replay) {
      this.liveGameState = null, this.kickoffGameState = null;
      return;
    }
    this.liveGameState = ws(this.replay), this.kickoffGameState = vs(this.replay, this.liveGameState);
  }
  syncGoalEvents() {
    this.effectsEnabled && (this.effectsManager.clearEvents?.(), this.replay && this.effectsManager.setGoalEvents(
      this.replay.timelineEvents.filter((e) => e.kind === "goal").map((e) => ({
        frame: e.frame,
        time: e.time,
        team: e.isTeamZero ? 0 : 1,
        playerName: e.playerName ?? ""
      }))
    ));
  }
  teardownPlugins() {
    const e = this.createPluginContext();
    for (const t of this.plugins)
      t.plugin.teardown?.(e);
  }
  setupPlugins() {
    for (const e of this.plugins)
      e.plugin.setup?.(this.createPluginContext()), e.plugin.id === "camera" && this.pushCameraParityState(), e.plugin.onStateChange?.(this.createPluginStateContext(this.getState()));
  }
  seekInternal(e) {
    this.currentTime = h.MathUtils.clamp(e, 0, this.duration), this.actorManager.seekAnimations(this.currentTime), this.effectsManager.resetBallTrail(), this.actorManager.resetWheelTracking();
  }
  /** Where playback stops: the last segment's start if skips run to the end. */
  getPlaybackEndTime() {
    return this.replay ? Ps(this.replay.duration, this.getTimelineSegments()) : this.duration;
  }
  /**
   * Jump past a kickoff countdown when skip-kickoffs is on (@rlrml/player
   * semantics). A skip is a jump, so it routes through seekInternal — that
   * resets the delta-based trackers (ball trail, wheel spin) which must not
   * see it. Returns true when a skip happened.
   */
  skipPastKickoffIfNeeded() {
    if (!this.replay || !this.skipKickoffsEnabledValue) return !1;
    const e = zs(
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
    const e = Bs(
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
  /**
   * When ball cam has not been manually overridden (`ballCamEnabledValue ===
   * null`), drive the follow camera from the attached player's replay ball-cam
   * state (resolved per-frame onto `entity.isBallCam` by the adapter), matching
   * the core @rlrml/player behavior. A manual `setBallCamEnabled` takes over.
   */
  applyReplayBallCam() {
    if (this.ballCamEnabledValue !== null || this.cameraViewModeValue !== "follow" || !this.attachedPlayerIdValue) return;
    const e = this.playerNameForId(this.attachedPlayerIdValue);
    if (!e) return;
    const t = this.adapter.getAllPlayers().find((i) => i.name === e);
    t && this.getCameraPlugin()?.setBallCam(t.isBallCam);
  }
  /** Push the parity view-mode/attachment onto the camera plugin. */
  syncCameraAttachment() {
    const e = this.getCameraPlugin();
    if (e) {
      if (this.cameraViewModeValue === "follow" && this.attachedPlayerIdValue) {
        const t = this.playerNameForId(this.attachedPlayerIdValue);
        if (!t) {
          console.warn(`[player] no player with id ${JSON.stringify(this.attachedPlayerIdValue)}`);
          return;
        }
        this.camera.up.set(0, 1, 0), e.follow(t);
        return;
      }
      e.getMode() === "follow" && e.release();
    }
  }
  applyCustomCameraSettings(e) {
    this.customCameraSettingsValue = Lt(e);
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
    const e = this.adapter.frameTimes, t = this.adapter.frameIndexAt(this.currentTime), i = Math.min(t + 1, Math.max(e.length - 1, 0)), a = e[t] ?? 0, s = e[i] ?? a, o = s > a ? h.MathUtils.clamp((this.currentTime - a) / (s - a), 0, 1) : 0;
    return { frameIndex: t, nextFrameIndex: i, alpha: o, currentTime: this.currentTime };
  }
  installResizeHandling() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => this.sceneManager.onWindowResize()), this.resizeObserver.observe(this.container));
  }
  scheduleAnimationFrame() {
    this.animationFrameId !== null || this.disposed || (this.animationFrameId = requestAnimationFrame(this.tick));
  }
  tick = (e) => {
    if (this.animationFrameId = null, this.disposed) return;
    let t = !1, i = 0;
    if (this.playing) {
      i = this.lastTickAt === null ? 0 : Math.min(0.1, (e - this.lastTickAt) / 1e3), this.lastTickAt = e;
      let a = this.currentTime + i * this.speed;
      const s = this.getPlaybackEndTime();
      a >= s && (this.loop ? (a = 0, this.actorManager.seekAnimations(0), this.effectsManager.resetBallTrail(), this.actorManager.resetWheelTracking()) : (a = s, this.playing = !1)), t = a !== this.currentTime || !this.playing, this.currentTime = a, this.playing && (t = this.skipPostGoalTransitionIfNeeded() || t, t = this.skipPastKickoffIfNeeded() || t);
    }
    this.render(i), t && this.emitChange(), this.scheduleAnimationFrame();
  };
  renderFrame(e = 0) {
    if (this.adapter.seek(this.currentTime), this.playing && this.actorManager.updateAnimations(e * this.speed), this.actorManager.updateFromFramework(this.adapter, this.currentTime), this.updatePlayerStates(), this.applyReplayBallCam(), this.updateHitboxVisualization(), this.effectsManager.update(e, this.playing, this.speed), this.playing && this.actorManager.updateWheelRotations(), this.sceneManager.updateSkyboxAnimation(this.playing ? e * this.speed : 0), this.controls.update(), this.beforeRenderCallbacks.length > 0) {
      const t = this.computeFrameRenderInfo();
      for (const i of [...this.beforeRenderCallbacks])
        i(t);
    }
    if (this.plugins.length > 0) {
      const t = this.createRenderContext();
      for (const i of this.plugins)
        i.plugin.beforeRender?.(t);
    }
    this.updateFreeCameraTransition(), this.renderer.render(this.scene, this.camera);
  }
  render(e = 0) {
    this.renderFrame(e);
  }
  updateFreeCameraTransition() {
    const e = this.freeCameraTransition;
    if (!e) return;
    this.controls.enabled = !1, this.camera.position.lerp(e.position, ve), this.controls.target.lerp(e.target, ve), this.camera.up.lerp(e.up, ve).normalize(), this.camera.fov = h.MathUtils.lerp(
      this.camera.fov,
      e.fov,
      ve
    ), this.camera.updateProjectionMatrix(), this.camera.lookAt(this.controls.target);
    const t = this.camera.position.distanceToSquared(e.position) <= Vs, i = this.controls.target.distanceToSquared(e.target) <= Ns, a = this.camera.up.angleTo(e.up) <= Gs, s = Math.abs(this.camera.fov - e.fov) <= $s;
    !t || !i || !a || !s || (this.camera.position.copy(e.position), this.controls.target.copy(e.target), this.camera.up.copy(e.up).normalize(), this.camera.fov = e.fov, this.camera.updateProjectionMatrix(), this.camera.lookAt(e.target), this.controls.enabled = !0, this.freeCameraTransition = null);
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
      this.adapter.getAllPlayers().map((i) => [i.name, i.hitboxType])
    )), this.hitboxManager.updateHitboxes(
      t.actors,
      t.playerNameToCarActorId,
      (i) => this.hitboxTypeByName?.get(i) ?? "Octane"
    ), this.hitboxOnlyModeEnabledValue)
      for (const i of Object.values(t.playerNameToCarActorId)) {
        const a = i === void 0 ? void 0 : t.actors[i];
        a && (a.visible = !1);
      }
  }
  installPlugin(e, t) {
    const i = typeof e == "function" ? e() : e;
    if (this.plugins.some((s) => s.plugin.id === i.id))
      throw new Error(`Player plugin "${i.id}" is already installed`);
    const a = { definition: e, plugin: i };
    return this.plugins.push(a), i.setup?.(this.createPluginContext()), i.id === "camera" && this.pushCameraParityState(), i.onStateChange?.(this.createPluginStateContext(this.getState())), t && this.render(), () => {
      const s = this.plugins.indexOf(a);
      s < 0 || (this.plugins.splice(s, 1), i.teardown?.(this.createPluginContext()));
    };
  }
  /**
   * Build the `ReplayScene`-shaped sceneState. `ballMesh`/`playerMeshes` are
   * getters so they track the live actors (GLB model swaps replace the
   * Object3Ds; a snapshot would go stale).
   */
  createSceneState() {
    const e = this.actorManager, t = this, i = new h.Mesh();
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
      // should normally call player.destroy() instead.
      dispose: () => this.destroy(),
      get ballMesh() {
        return (e.ballActorId != null ? e.actors[e.ballActorId] : null) ?? i;
      },
      // Car Object3Ds keyed by stable player id, rebuilt per access.
      get playerMeshes() {
        const a = /* @__PURE__ */ new Map();
        for (const s of t.adapter.playerList) {
          const o = e.playerNameToCarActorId[s.name], r = o != null ? e.actors[o] : void 0;
          r && a.set(s.id, r);
        }
        return a;
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
    const e = this.actorManager, t = this.adapter.ball, i = {
      position: t.position,
      rotation: t.rotation,
      velocity: t.velocity,
      visible: t.visible,
      object3d: e.ballActorId != null ? e.actors[e.ballActorId] ?? null : null
    }, a = this.adapter.getAllPlayers().map((s) => {
      const o = e.playerNameToCarActorId[s.name];
      return {
        id: s.id,
        name: s.name,
        team: s.team,
        carName: s.carName,
        hitboxType: s.hitboxType,
        position: s.position,
        rotation: s.rotation,
        velocity: s.velocity,
        boost: s.boost,
        isBoosting: s.isBoosting,
        visible: s.isVisible,
        object3d: o != null ? e.actors[o] ?? null : null
      };
    });
    return {
      ...this.createPluginContext(),
      ...this.computeFrameRenderInfo(),
      state: this.getState(),
      time: this.currentTime,
      ball: i,
      cars: a
    };
  }
  emitChange() {
    const e = this.getState(), t = this.createPluginStateContext(e);
    for (const i of this.plugins)
      i.plugin.onStateChange?.(t);
    this.dispatchEvent(new CustomEvent("change", { detail: e }));
  }
}
const $i = pt.default ?? pt;
$i.install({ THREE: h });
class io {
  constructor(e, t) {
    this.camera = e, this.domElement = t, this.controls = new $i(e, t), this.controls.dollyToCursor = !1, this.controls.infinityDolly = !1, this.controls.dollySpeed = 2.5, this.controls.smoothTime = 0.05, this.controls.draggingSmoothTime = 0.05, this.controls.minPolarAngle = 0.1, this.controls.maxPolarAngle = Math.PI / 2 - 0.1, this.controls.minDistance = 100, this.controls.maxDistance = 1e4, this.minHeight = 50, this.mode = "free", this.defaultFreecamPosition = new h.Vector3(0, 1e3, 5e3), this.defaultFreecamLookAt = new h.Vector3(0, 100, 0), this.onPointerLockStateChange = null, this.targetCar = null, this.targetBall = null, this.followDistance = 260, this.followHeight = 90, this.followAngle = -4, this.stiffness = 0.45, this.swivelSpeed = 4.3, this.currentBlend = 0, this.targetBlend = 0, this.transitionSpeed = 1.3, this.baseDuration = 0.5, this.lastIsBallCam = null, this.currentCamPos = null, this.currentLookTarget = null, this._tempQuatCarCam = new h.Quaternion(), this._tempQuatBallCam = new h.Quaternion(), this._tempMatrix = new h.Matrix4(), this.controls.enabled = !0, t.addEventListener("contextmenu", (i) => i.preventDefault()), this.isFollowingViewer = !1, this.followTargetPosition = new h.Vector3(), this.followTargetQuaternion = new h.Quaternion(), this.followPositionLerpFactor = 0.12, this.followRotationSlerpFactor = 0.1, this.hasFollowTarget = !1, this.isRightMouseDown = !1, this.lastMouseX = null, this.lastMouseY = null, this.savedCameraState = null, this.isInReplayMode = !1;
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
          const i = Math.max(this.controls.distance * 0.2, 100);
          t.deltaY > 0 ? this.controls.dolly(-i, !0) : this.controls.dolly(i, !0);
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
        const t = new h.Vector3();
        this.camera.getWorldDirection(t), this.freeCamRotation.yaw = Math.atan2(t.x, t.z), this.freeCamRotation.pitch = Math.asin(-t.y), this.onKeyDown = (i) => this.handleFreeCamKeyDown(i), this.onKeyUp = (i) => this.handleFreeCamKeyUp(i), this.onMouseMove = (i) => this.handleFreeCamMouseMove(i), this.onMouseDown = (i) => {
          i.button === 2 && this.mode === "free" && !this.isFollowingViewer && (this.isRightMouseDown = !0, this.domElement.requestPointerLock?.());
        }, this.onMouseUp = (i) => {
          i.button === 2 && (this.isRightMouseDown = !1, document.pointerLockElement === this.domElement && document.exitPointerLock?.());
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
    const t = e.movementX || 0, i = e.movementY || 0, a = 3e-3;
    this.freeCamRotation.yaw -= t * a, this.freeCamRotation.pitch += i * a, this.freeCamRotation.pitch = Math.max(
      -Math.PI / 2 + 0.01,
      Math.min(Math.PI / 2 - 0.01, this.freeCamRotation.pitch)
    );
  }
  /**
   * Update free camera movement
   */
  updateFreeCam(e) {
    if (!this.freeCamKeys) return;
    const t = new h.Vector3(
      Math.sin(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch),
      -Math.sin(this.freeCamRotation.pitch),
      Math.cos(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch)
    );
    t.normalize();
    const i = new h.Vector3(
      Math.sin(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch),
      -Math.sin(this.freeCamRotation.pitch),
      Math.cos(this.freeCamRotation.yaw) * Math.cos(this.freeCamRotation.pitch)
    );
    i.normalize();
    const a = new h.Vector3(
      Math.sin(this.freeCamRotation.yaw - Math.PI / 2),
      0,
      Math.cos(this.freeCamRotation.yaw - Math.PI / 2)
    ), s = new h.Vector3(0, 1, 0), o = new h.Vector3(), r = this.freeCamSpeed * e;
    this.freeCamKeys.forward && o.add(i.clone().multiplyScalar(r)), this.freeCamKeys.backward && o.add(i.clone().multiplyScalar(-r)), this.freeCamKeys.right && o.add(a.clone().multiplyScalar(r)), this.freeCamKeys.left && o.add(a.clone().multiplyScalar(-r)), this.freeCamKeys.up && o.add(s.clone().multiplyScalar(r)), this.freeCamKeys.down && o.add(s.clone().multiplyScalar(-r)), o.length() > 0 && o.normalize().multiplyScalar(r), this.camera.position.add(o);
    const l = this.camera.position.clone().add(t);
    this.camera.lookAt(l), this.controls.setLookAt(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z,
      l.x,
      l.y,
      l.z,
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
        const f = this.targetBall.position;
        this.lastBallOrbitPos || (this.lastBallOrbitPos = f.clone());
        const g = new h.Vector3().subVectors(f, this.lastBallOrbitPos);
        if (this.controls.setTarget(f.x, f.y, f.z, !1), g.lengthSq() > 0.01) {
          const y = new h.Vector3();
          this.controls.getPosition(y);
          const x = y.x + g.x, v = y.y + g.y, b = y.z + g.z;
          this.controls.setPosition(x, v, b, !1), this.lastBallOrbitPos.copy(f);
        }
      }
      this.controls.update(e);
      return;
    }
    if (!this.targetCar) {
      this.controls.update(e);
      return;
    }
    const i = this.targetCar.position.clone(), a = this.targetCar.quaternion;
    if (this.lastIsBallCam !== null && this.lastIsBallCam !== t && !t) {
      const f = new h.Vector3().subVectors(this.camera.position, i);
      f.y = 0, f.length() > 0.01 && (f.normalize(), this.smoothedCarYaw = Math.atan2(-f.x, -f.z));
    }
    this.lastIsBallCam = t;
    const s = this.calculateCarCamPosition(i, a, e), o = this.calculateBallCamPosition(i, a, e);
    this.targetBlend = t ? 1 : 0;
    const r = Math.max(
      0.15,
      Math.min(0.6, this.baseDuration / this.transitionSpeed)
    ), l = e / r;
    this.currentBlend < this.targetBlend ? this.currentBlend = Math.min(this.currentBlend + l, this.targetBlend) : this.currentBlend > this.targetBlend && (this.currentBlend = Math.max(this.currentBlend - l, this.targetBlend));
    const c = this.currentBlend, d = c * c * (3 - 2 * c), m = new h.Vector3().lerpVectors(
      s.cameraPos,
      o.cameraPos,
      d
    );
    this._tempMatrix.lookAt(
      s.cameraPos,
      s.lookTarget,
      new h.Vector3(0, 1, 0)
    ), this._tempQuatCarCam.setFromRotationMatrix(this._tempMatrix), this._tempMatrix.lookAt(
      o.cameraPos,
      o.lookTarget,
      new h.Vector3(0, 1, 0)
    ), this._tempQuatBallCam.setFromRotationMatrix(this._tempMatrix), this._tempQuatCarCam.dot(this._tempQuatBallCam) < 0 && this._tempQuatBallCam.set(
      -this._tempQuatBallCam.x,
      -this._tempQuatBallCam.y,
      -this._tempQuatBallCam.z,
      -this._tempQuatBallCam.w
    );
    const u = new h.Quaternion().slerpQuaternions(
      this._tempQuatCarCam,
      this._tempQuatBallCam,
      d
    );
    if (this.camera.position.copy(m), this.camera.quaternion.copy(u), this.followAngle !== 0) {
      const f = this.followAngle * Math.PI / 180;
      this.camera.rotateX(-f);
    }
    this.currentCamPos || (this.currentCamPos = new h.Vector3()), this.currentLookTarget || (this.currentLookTarget = new h.Vector3()), this.currentCamPos.copy(m);
    const p = new h.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    this.currentLookTarget.copy(m).add(p.multiplyScalar(100)), this.enforceMinHeight();
  }
  /**
   * Calculate ball cam position and look target
   * Camera positioned so that both car and ball are visible
   * When ball is higher than car, camera goes lower to keep both in frame
   */
  calculateBallCamPosition(e, t, i = 1 / 60) {
    if (!this.targetBall)
      return this.calculateCarCamPosition(e, t, i);
    const a = this.targetBall.position.clone(), s = new h.Vector3().subVectors(e, a);
    s.y = 0, s.normalize();
    const o = e.clone().add(s.multiplyScalar(this.followDistance)), r = a.y - e.y, c = Math.min(1, Math.max(0, r / 800));
    o.y = e.y + this.followHeight - c * 100, o.y < this.minHeight && (o.y = this.minHeight);
    const d = new h.Vector3().lerpVectors(
      a,
      new h.Vector3(e.x, e.y + 100, e.z),
      c * 0.6
    );
    return { cameraPos: o, lookTarget: d };
  }
  /**
   * Calculate car cam position and look target
   * Uses velocity-based direction when car is airborne/flipping
   */
  calculateCarCamPosition(e, t, i = 1 / 60) {
    this.lastCarPos || (this.lastCarPos = e.clone());
    const a = new h.Vector3().subVectors(e, this.lastCarPos);
    a.y = 0;
    const s = a.length(), o = new h.Vector3(1, 0, 0);
    o.applyQuaternion(t);
    const r = Math.atan2(o.x, o.z), l = new h.Vector3(0, 1, 0);
    l.applyQuaternion(t);
    const c = l.y < 0.5;
    let d;
    if (c && s > 0.01)
      a.normalize(), d = Math.atan2(a.x, a.z);
    else if (s > 0.05) {
      a.normalize();
      let b = Math.atan2(a.x, a.z) - r;
      for (; b > Math.PI; ) b -= Math.PI * 2;
      for (; b < -Math.PI; ) b += Math.PI * 2;
      Math.abs(b) > Math.PI / 2 ? d = r + Math.PI : d = r;
    } else
      d = r;
    this.lastCarPos.copy(e), this.smoothedCarYaw === void 0 && (this.smoothedCarYaw = d);
    let m = d - this.smoothedCarYaw;
    for (; m > Math.PI; ) m -= Math.PI * 2;
    for (; m < -Math.PI; ) m += Math.PI * 2;
    const u = c ? this.swivelSpeed * 0.4 : this.swivelSpeed;
    this.smoothedCarYaw += m * Math.min(1, u * (1 / 60));
    const p = -Math.sin(this.smoothedCarYaw), f = -Math.cos(this.smoothedCarYaw), g = new h.Vector3(
      e.x + p * this.followDistance,
      e.y + this.followHeight,
      e.z + f * this.followDistance
    );
    g.y < this.minHeight && (g.y = this.minHeight);
    const y = 50, x = new h.Vector3(
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
  setPosition(e, t, i) {
    this.controls.setPosition(e, t, i, !1);
  }
  /**
   * Instantly set camera look target (no transition)
   */
  setTarget(e, t, i) {
    this.controls.setTarget(e, t, i, !1);
  }
  /**
   * Smoothly move camera to position and target
   */
  moveTo(e, t, i, a, s, o, r = !0) {
    this.controls.setLookAt(e, t, i, a, s, o, r);
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
    const t = new h.Vector3(0, 0, -1).applyQuaternion(e.quaternion);
    t.multiplyScalar(100).add(e.position), this.controls.setLookAt(
      e.position.x,
      e.position.y,
      e.position.z,
      t.x,
      t.y,
      t.z,
      !1
    );
    const i = {
      mode: e.mode,
      targetCarIndex: e.targetCarIndex
    };
    return this.savedCameraState = null, this.isInReplayMode = !1, i;
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
    const e = new h.Vector3(0, 1500, 3e3), t = new h.Vector3(0, 200, 0);
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
        const a = new h.Vector3();
        this.camera.getWorldDirection(a), this.freeCamRotation.yaw = Math.atan2(a.x, a.z), this.freeCamRotation.pitch = Math.asin(-a.y);
      }
      const i = new h.Vector3();
      this.camera.getWorldDirection(i), i.multiplyScalar(100).add(this.camera.position), this.controls.setLookAt(
        e.x,
        e.y,
        e.z,
        i.x,
        i.y,
        i.z,
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
      const t = this.targetBall?.position || new h.Vector3(0, 100, 0);
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
          let a = this.followTargetOrbitParams.azimuth - this.followCurrentOrbitParams.azimuth;
          for (; a > Math.PI; ) a -= Math.PI * 2;
          for (; a < -Math.PI; ) a += Math.PI * 2;
          this.followCurrentOrbitParams.azimuth += a * 0.15, this.followCurrentOrbitParams.polar += (this.followTargetOrbitParams.polar - this.followCurrentOrbitParams.polar) * 0.15, this.controls.setTarget(t.x, t.y, t.z, !1), this.controls.dollyTo(this.followCurrentOrbitParams.distance, !1), this.controls.rotateTo(
            this.followCurrentOrbitParams.azimuth,
            this.followCurrentOrbitParams.polar,
            !1
          ), this.controls.update(e);
        }
      } else {
        if (this.camera.position.lerp(this.followTargetPosition, this.followPositionLerpFactor), this.camera.quaternion.slerp(this.followTargetQuaternion, this.followRotationSlerpFactor), this.freeCamRotation) {
          const i = new h.Vector3();
          this.camera.getWorldDirection(i), this.freeCamRotation.yaw = Math.atan2(i.x, i.z), this.freeCamRotation.pitch = Math.asin(-i.y);
        }
        const t = new h.Vector3();
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
   * Call this when initializing the player or when switching to freecam
   */
  setDefaultFreecamPosition() {
    if (this.camera.position.copy(this.defaultFreecamPosition), this.camera.lookAt(this.defaultFreecamLookAt), this.freeCamRotation) {
      const e = new h.Vector3();
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
function $t(n) {
  if (n.pitch === void 0 || n.angle !== void 0) return n;
  const { pitch: e, ...t } = n;
  return { ...t, angle: e };
}
const ao = {
  distance: 260,
  height: 90,
  angle: -4,
  stiffness: 0.45,
  swivelSpeed: 4.3,
  transitionSpeed: 1.3,
  fov: 110
};
function no(n = {}) {
  let e = null, t = null, i = n.mode ?? (n.follow ? "follow" : "orbit"), a = n.follow ?? null, s = n.ballCam ?? null, o = s ?? !0, r = $t({ ...n.settings }), l = 1;
  const c = n.useRecordedSettings !== !1;
  let d = null;
  const m = new h.Vector3();
  let u = !1;
  function p() {
    if (!(!t || !e)) {
      if (t.player.controls.enabled = i === "orbit", i === "free")
        e.setMode("free");
      else if (i === "ballOrbit") {
        const b = y();
        b && e.setTargetBall(b), e.setMode("ballOrbit");
      } else
        e.setMode("car");
      d = null;
    }
  }
  function f() {
    return !c || !t || !a ? null : t.player.adapter.getPlayer(a)?.cameraSettings ?? null;
  }
  function g() {
    const b = { ...ao, ...f(), ...r };
    return l !== 1 && b.distance !== void 0 && (b.distance *= l), b;
  }
  function y() {
    if (!t) return null;
    const b = t.player.actorManager;
    return b.ballActorId != null ? b.actors[b.ballActorId] ?? null : null;
  }
  function x(b) {
    const M = g().fov;
    if (!M) return;
    const C = M * Math.PI / 180, w = 16 / 9, S = 2 * Math.atan(Math.tan(C / 2) / w), E = 2 * Math.atan(Math.tan(C / 2) / b.aspect), B = Math.max(S, E) * 180 / Math.PI;
    Math.abs(b.fov - B) > 0.1 && (b.fov = B, b.updateProjectionMatrix());
  }
  function v(b, M) {
    if (!e) return;
    if (i === "free") {
      r.freeCamSpeed && (e.freeCamSpeed = r.freeCamSpeed), e.update(M);
      return;
    }
    if (i === "ballOrbit") {
      b.ball.object3d && e.setTargetBall(b.ball.object3d), e.update(M);
      return;
    }
    const w = (a ? b.cars.find((E) => E.name === a) : void 0)?.object3d ?? null;
    if (!w) {
      e.update(M);
      return;
    }
    e.setTargetCar(w), b.ball.object3d && e.setTargetBall(b.ball.object3d), e.setFollowSettings(g());
    const S = a ? b.player.adapter.getPlayer(a) : void 0;
    o = s ?? S?.isBallCam ?? !0, m.copy(w.position), u = !0, e.update(M, o);
  }
  return {
    id: "camera",
    setup(b) {
      t = b, e = new io(b.camera, b.renderer.domElement), p();
    },
    beforeRender(b) {
      if (!e || (x(b.camera), i === "orbit")) return;
      const M = performance.now(), C = d === null ? 1 / 60 : Math.min(0.1, (M - d) / 1e3);
      d = M, v(b, C);
    },
    teardown() {
      i = "orbit", t && (t.player.controls.enabled = !0), e?.dispose(), e = null, t = null;
    },
    setMode(b) {
      b !== i && (i = b, p());
    },
    getMode() {
      return i;
    },
    follow(b) {
      a = b, i = "follow", p();
    },
    release() {
      i = "orbit", t && u && t.player.controls.target.copy(m), p();
    },
    getTarget() {
      return a;
    },
    setBallCam(b) {
      s = b, b !== null && (o = b);
    },
    getBallCam() {
      return o;
    },
    setCameraSettings(b) {
      r = b === null ? {} : { ...r, ...$t(b) };
    },
    setDistanceScale(b) {
      l = Math.max(0.25, b);
    },
    getDistanceScale() {
      return l;
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
const Hi = 1280, Wi = 720, Ui = "image/png", so = 2, oo = 3e4;
async function ll(n, e = {}) {
  return ro(await Be(n), e);
}
async function cl(n, e, t = {}) {
  return ji(await Be(n), e, t);
}
async function ro(n, e = {}) {
  const [t] = await ji(n, [e], e);
  if (!t)
    throw new Error("Static image capture did not produce a result");
  return t;
}
async function ji(n, e, t = {}) {
  if (e.length === 0)
    return [];
  const i = Ki(t, e[0]), a = ue(i.width, Hi), s = ue(i.height, Wi), o = ho(a, s);
  let r = null;
  try {
    r = lt(o, n, {
      ...t.playerOptions,
      autoplay: !1,
      loop: !1,
      preserveDrawingBuffer: !0
    }), await co(r, t.readyTimeoutMs), r.pause();
    const l = [];
    for (const c of e)
      l.push(await lo(r, t, c));
    return l;
  } finally {
    r?.destroy(), o.remove();
  }
}
async function lo(n, e, t) {
  const i = Ki(e, t), a = ue(i.width, Hi), s = ue(i.height, Wi), o = Xi(
    i.pixelRatio,
    typeof window > "u" ? 1 : window.devicePixelRatio || 1
  ), r = i.mimeType ?? Ui;
  n.renderer.setPixelRatio(o), n.renderer.setSize(a, s, !1), n.camera.aspect = a / s, n.camera.updateProjectionMatrix(), mo(n, i), await uo(n, i.camera), fo(n, ue(i.settleFrames, so));
  const l = n.renderer.domElement, c = l.toDataURL(r, i.quality), d = await go(l, r, i.quality, c), m = n.getState();
  return {
    blob: d,
    dataUrl: c,
    width: a,
    height: s,
    pixelRatio: o,
    mimeType: d.type || r,
    time: m.currentTime,
    frameIndex: m.frameIndex
  };
}
function Ki(n, e) {
  return {
    ...n,
    ...e,
    playerOptions: n.playerOptions,
    readyTimeoutMs: n.readyTimeoutMs
  };
}
async function co(n, e) {
  if (e === !1) {
    await n.ready;
    return;
  }
  const t = Xi(e, oo);
  let i = null;
  try {
    await Promise.race([
      n.ready.then(() => "ready"),
      new Promise((s) => {
        i = setTimeout(() => s("timeout"), t);
      })
    ]) === "timeout" && console.warn(
      `[player] static image capture proceeding before assets settled after ${t}ms`
    );
  } finally {
    i != null && clearTimeout(i);
  }
}
function ho(n, e) {
  const t = document.createElement("div");
  return t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0", t.style.width = `${n}px`, t.style.height = `${e}px`, t.style.overflow = "hidden", t.style.pointerEvents = "none", t.setAttribute("aria-hidden", "true"), document.body.appendChild(t), t;
}
function mo(n, e) {
  if (e.frameIndex != null) {
    n.setFrameIndex(e.frameIndex);
    return;
  }
  n.seek(e.time ?? 0);
}
async function uo(n, e) {
  if (!e || e.mode === "free") {
    n.setFreeCameraPreset(e?.preset ?? "side", { instant: !0 });
    return;
  }
  if (e.mode === "custom") {
    await e.setup(n);
    return;
  }
  const t = po(n, e);
  if (!t)
    throw new Error("Unable to resolve static image capture player target");
  e.cameraSettings !== void 0 && n.setCustomCameraSettings(e.cameraSettings), e.cameraDistanceScale !== void 0 && n.setCameraDistanceScale(e.cameraDistanceScale), n.setAttachedPlayer(t.id), n.setBallCamEnabled(e.ballCam === "replay" ? null : e.ballCam ?? !0);
}
function po(n, e) {
  if (e.playerId) {
    const i = n.adapter.playerList.find((a) => a.id === e.playerId);
    if (i)
      return i;
  }
  const t = e.playerName?.trim().toLowerCase();
  return t ? n.adapter.playerList.find((i) => i.name.trim().toLowerCase() === t) ?? null : n.adapter.playerList[0] ?? null;
}
function fo(n, e) {
  for (let t = 0; t < e; t += 1)
    n.renderFrame(1 / 60);
}
function go(n, e, t, i) {
  return new Promise((a) => {
    n.toBlob(
      (s) => {
        a(s ?? yo(i));
      },
      e,
      t
    );
  });
}
function yo(n) {
  const [e, t] = n.split(",", 2), i = e?.match(/^data:([^;]+)/)?.[1] ?? Ui, a = atob(t ?? ""), s = new Uint8Array(a.length);
  for (let o = 0; o < a.length; o += 1)
    s[o] = a.charCodeAt(o);
  return new Blob([s], { type: i });
}
function ue(n, e) {
  return typeof n == "number" && Number.isFinite(n) && n > 0 ? Math.round(n) : e;
}
function Xi(n, e) {
  return typeof n == "number" && Number.isFinite(n) && n > 0 ? n : e;
}
class bo {
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
  createOrUpdateNameTag(e, t, i) {
    let a = this.nameTags.get(e);
    if (a || (a = this._createNameTag(e), this.nameTags.set(e, a)), (Math.abs((a.lastBoost || 0) - t) > 1 || a.lastBoost === void 0) && (this._updateTexture(a, e, t), a.lastBoost = t), i && this.camera) {
      const o = this.camera.position.distanceTo(i), r = 80, l = 200, c = 500, m = Math.max(0, Math.min(1, (o - c) / (5e3 - c))), u = r + m * (l - r);
      a.sprite.position.set(i.x, i.y + u, i.z);
      const p = 800, f = this.canvasWidth / this.canvasHeight;
      if (o < p) {
        const g = p / Math.max(o, 100), y = this.spriteScale * g;
        a.sprite.scale.set(y * f, y, 1);
      } else
        a.sprite.scale.set(this.spriteScale * f, this.spriteScale, 1);
      a.sprite.visible = !0;
    }
  }
  /**
   * Create a new name tag sprite with canvas
   */
  _createNameTag(e) {
    const t = document.createElement("canvas");
    t.width = this.canvasWidth, t.height = this.canvasHeight;
    const i = t.getContext("2d"), a = new h.CanvasTexture(t);
    a.minFilter = h.LinearFilter, a.magFilter = h.LinearFilter;
    const s = new h.SpriteMaterial({
      map: a,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      sizeAttenuation: !1
    }), o = new h.Sprite(s), r = this.canvasWidth / this.canvasHeight;
    return o.scale.set(this.spriteScale * r, this.spriteScale, 1), o.renderOrder = 999, this.scene.add(o), { sprite: o, canvas: t, ctx: i, texture: a };
  }
  /**
   * Update the canvas texture with current boost value
   */
  _updateTexture(e, t, i) {
    const { canvas: a, ctx: s, texture: o } = e, r = this.playerTeams[t] ?? 0, l = this.teamColors[r], c = a.width, d = a.height;
    s.clearRect(0, 0, c, d);
    const m = 4, u = 44, p = (d - u) / 2, f = 28, g = 8;
    s.font = "bold 20px Arial, sans-serif";
    const x = s.measureText(t).width + f + g * 3 + m * 2, v = (c - x) / 2, b = u / 2;
    s.beginPath(), s.roundRect(v, p, x, u, b), s.fillStyle = l.bg, s.fill(), s.strokeStyle = l.border, s.lineWidth = 3, s.stroke();
    const M = v + g + f / 2 + 2, C = d / 2, w = f / 2 - 2;
    if (s.beginPath(), s.arc(M, C, w, 0, Math.PI * 2), s.fillStyle = l.bg, s.fill(), s.strokeStyle = "#FFFFFF", s.lineWidth = 2, s.stroke(), i > 0) {
      const E = Math.min(100, Math.max(0, i)) / 100, B = w * 2 * E, z = C + w - B;
      s.save(), s.beginPath(), s.arc(M, C, w - 1, 0, Math.PI * 2), s.clip(), s.fillStyle = "#FFFFFF", s.fillRect(M - w, z, w * 2, B), s.restore(), i >= 100 && (s.shadowColor = "rgba(255, 255, 255, 0.8)", s.shadowBlur = 10, s.beginPath(), s.arc(M, C, w - 1, 0, Math.PI * 2), s.fillStyle = "#FFFFFF", s.fill(), s.shadowBlur = 0);
    }
    s.font = "bold 20px Arial, sans-serif", s.fillStyle = l.text, s.textAlign = "left", s.textBaseline = "middle", s.shadowColor = "rgba(0, 0, 0, 0.5)", s.shadowBlur = 3, s.shadowOffsetX = 1, s.shadowOffsetY = 1;
    const S = M + w + g;
    s.fillText(t, S, d / 2), s.shadowBlur = 0, o.needsUpdate = !0;
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
  update(e, t, i, a = null) {
    const s = /* @__PURE__ */ new Set();
    Object.entries(i).forEach(([o, r]) => {
      if (o === a) {
        this.hideNameTag(o), s.add(o);
        return;
      }
      const l = e[r];
      if (!l || !l.visible) {
        this.hideNameTag(o);
        return;
      }
      const c = t[o] ?? 0;
      this.createOrUpdateNameTag(o, c, l.position), s.add(o);
    }), this.nameTags.forEach((o, r) => {
      s.has(r) || (o.sprite.visible = !1);
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
function hl() {
  let n = null;
  return {
    id: "name-tags",
    setup(e) {
      n = new bo(e.scene, e.camera), n.setPlayerTeams(e.player.adapter.getPlayerTeams());
    },
    beforeRender(e) {
      if (!n) return;
      const t = {}, i = {}, a = {};
      for (const o of e.cars)
        o.object3d && (t[o.name] = o.object3d, i[o.name] = o.boost, a[o.name] = o.name);
      const s = e.state.cameraViewMode === "follow" && e.state.attachedPlayerId ? e.player.adapter.playerList.find(
        (o) => o.id === e.state.attachedPlayerId || o.name === e.state.attachedPlayerId
      )?.name ?? null : null;
      n.update(t, i, a, s ?? null);
    },
    teardown() {
      n?.dispose(), n = null;
    }
  };
}
const xo = {
  "top-left": "top: 8px; left: 8px;",
  "top-right": "top: 8px; right: 8px;",
  "bottom-left": "bottom: 8px; left: 8px;",
  "bottom-right": "bottom: 8px; right: 8px;"
};
function dl(n = {}) {
  const e = n.corner ?? "top-right", t = n.updateIntervalMs ?? 500, i = () => typeof n.mount == "function" ? n.mount() : n.mount ?? null;
  let a = null, s = null, o = null, r = 0, l = performance.now(), c = 0, d = 0;
  const m = typeof n.onSample == "function";
  return {
    id: "fps-overlay",
    setup(u) {
      if (l = performance.now(), r = 0, d = u.player.getState().frameIndex, c = d, m) return;
      const p = i(), f = p != null;
      a = document.createElement("div"), a.className = "player-fps-overlay", a.style.cssText = f ? `
          display: inline-flex; gap: 10px; align-items: center;
          font: 600 11px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #c8d4e6; letter-spacing: 0.02em; white-space: nowrap;
        ` : `
          position: absolute; ${xo[e]}
          z-index: 30; pointer-events: none; user-select: none;
          display: flex; gap: 10px;
          font: 600 11px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace;
          color: #e8f0ff; background: rgba(12, 16, 24, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 6px;
          padding: 4px 8px; letter-spacing: 0.02em; white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
        `;
      const g = document.createElement("span");
      g.append("Render "), s = document.createElement("span"), s.style.color = "#7fd4ff", s.textContent = "– fps", g.append(s);
      const y = document.createElement("span");
      y.append("Replay "), o = document.createElement("span"), o.style.color = "#9affc0", o.textContent = "– fps", y.append(o), a.append(g, y), p ? p.appendChild(a) : (getComputedStyle(u.container).position === "static" && (u.container.style.position = "relative"), u.container.appendChild(a));
    },
    beforeRender(u) {
      r += 1, d = u.frameIndex;
      const p = performance.now(), f = p - l;
      if (f < t) return;
      const g = f / 1e3, y = r / g, x = Math.abs(d - c) / g;
      n.onSample ? n.onSample({ renderFps: y, replayFps: x }) : (s && (s.textContent = `${y.toFixed(0)} fps`), o && (o.textContent = `${x.toFixed(0)} fps`)), r = 0, l = p, c = d;
    },
    teardown() {
      a?.remove(), a = null, s = null, o = null;
    }
  };
}
const wo = 4;
function vo(n) {
  const e = n.trim();
  return (e ? `${e} SCORED !!` : "GOAL !!").toUpperCase();
}
function Mo(n) {
  return n ? n.timelineEvents.filter((e) => e.kind === "goal").map((e) => ({ time: e.time, scorerName: e.playerName ?? "" })).sort((e, t) => e.time - t.time) : [];
}
function ml(n = {}) {
  const e = n.durationSeconds ?? wo, t = n.formatText ?? vo, i = (p) => (typeof n.mount == "function" ? n.mount() : n.mount) ?? p.container;
  let a = [], s = null, o = null, r = null;
  const l = /* @__PURE__ */ new Set();
  let c = 0, d = "", m = null;
  function u(p) {
    if (o && p !== m) {
      if (m = p, p === null) {
        o.style.opacity = "0";
        return;
      }
      o.textContent = p, o.style.opacity = "1";
    }
  }
  return {
    id: "scored-text",
    setup(p) {
      a = Mo(p.replay), r = null, l.clear(), c = 0, d = "", m = null;
      const f = i(p);
      f === p.container && getComputedStyle(p.container).position === "static" && (p.container.style.position = "relative"), s = document.createElement("div"), s.className = "player-scored-text-overlay", s.style.cssText = `
        position: absolute; inset: 0; z-index: 50;
        display: flex; align-items: center; justify-content: center;
        pointer-events: none; user-select: none;
      `, o = document.createElement("div"), o.className = "player-scored-text", o.style.cssText = `
        font-family: "Bourgeois", "Arial Black", system-ui, sans-serif;
        font-size: 6rem; line-height: 1; text-align: center;
        color: #ffcb58;
        text-shadow:
          0 6px 25px rgba(0, 0, 0, 0.35),
          0 0 4px #ffcb58, 0 0 8px #ffcb58, 0 0 15px #ffcb58;
        opacity: 0; transition: opacity 0.15s ease-out;
      `, s.appendChild(o), f.appendChild(s);
    },
    beforeRender(p) {
      if (!o || a.length === 0) return;
      const f = p.time, g = r;
      g !== null && f < g - 1e-3 && (l.clear(), c = 0);
      for (const v of a)
        g !== null && g < v.time && f >= v.time && !l.has(v.time) && (l.add(v.time), d = t(v.scorerName), c = performance.now() + e * 1e3);
      r = f;
      const y = a.find(
        (v) => f >= v.time && f <= v.time + e
      ), x = performance.now() < c;
      u(y ? t(y.scorerName) : x ? d : null);
    },
    teardown() {
      s?.remove(), s = null, o = null, a = [], l.clear(), m = null;
    }
  };
}
function qe(n, e) {
  if (!n.replay)
    throw new Error(
      `[player] cannot run @rlrml/player plugin "${e}" without a ReplayModel — construct the player via createPlayer(), which always provides one.`
    );
  return {
    // ReplayPlayer implements ReplayPlayer's control + timeline surface
    // (docs/player/PLAYER_PARITY.md), which is all a DOM plugin calls.
    player: n.player,
    replay: n.replay,
    scene: n.player.sceneState,
    container: n.container,
    options: n.options
  };
}
function Yi(n, e) {
  return { ...qe(n, e), state: n.state };
}
function To(n, e, t, i, a) {
  const s = n.frames[i.frameIndex] ?? null, o = n.frames[i.nextFrameIndex] ?? s, r = {
    track: n,
    mesh: t.playerMeshes.get(n.id) ?? null,
    boostTrail: t.playerBoostTrails.get(n.id) ?? null,
    frame: s,
    nextFrame: o,
    interpolatedPosition: null,
    boostFraction: 0
  };
  if (!r.mesh)
    return r;
  const l = Gi(
    s?.position ?? null,
    o?.position ?? null,
    i.alpha
  );
  if (!l || ks(e.timelineEvents, n.id, a) || !Ds(s))
    return r;
  r.interpolatedPosition = l;
  const c = s?.boostFraction ?? 0, d = o?.boostFraction ?? c;
  return r.boostFraction = h.MathUtils.lerp(
    c,
    d,
    i.alpha
  ), r;
}
function Co(n, e) {
  const t = Yi(n, e), i = t.replay, a = t.scene, s = Is(i, n.currentTime), o = i.ballFrames[s.frameIndex] ?? null, r = i.ballFrames[s.nextFrameIndex] ?? o, l = Gi(
    o?.position ?? null,
    r?.position ?? null,
    s.alpha
  ), c = l ? a.replayRoot.localToWorld(
    new h.Vector3(
      l.x,
      l.y,
      l.z
    )
  ) : null;
  return {
    ...t,
    frameIndex: s.frameIndex,
    nextFrameIndex: s.nextFrameIndex,
    alpha: s.alpha,
    currentTime: n.currentTime,
    frame: i.frames[s.frameIndex] ?? null,
    nextFrame: i.frames[s.nextFrameIndex] ?? null,
    ballFrame: o,
    nextBallFrame: r,
    ballPosition: c,
    players: i.players.map(
      (d) => To(d, i, a, s, n.currentTime)
    )
  };
}
function ul(n) {
  return {
    ...n,
    setup: n.setup ? (e) => {
      n.setup?.(qe(e, n.id));
    } : void 0,
    onStateChange: n.onStateChange ? (e) => {
      n.onStateChange?.(Yi(e, n.id));
    } : void 0,
    beforeRender: n.beforeRender ? (e) => {
      n.beforeRender?.(Co(e, n.id));
    } : void 0,
    teardown: n.teardown ? (e) => {
      n.teardown?.(qe(e, n.id));
    } : void 0
  };
}
function ie(n) {
  n.depthTest = !1, n.depthWrite = !1, n.transparent = !0, n.polygonOffset = !0, n.polygonOffsetFactor = -2, n.polygonOffsetUnits = -2, n.forceSinglePass = !0;
}
const $ = 6, So = 0.6;
function q(n) {
  return n * So;
}
function _o(n) {
  return q(n.size === "big" ? 150 : 92);
}
function rt(n) {
  return q(n.size === "big" ? 104 : 46);
}
function Po(n) {
  return q(n.size === "big" ? 34 : 14);
}
function qi(n) {
  return $ + Po(n) + rt(n);
}
function Se(n) {
  return n.size === "big" ? qi(n) : $ + q(1.2);
}
function Zi(n) {
  return n.size === "big" ? qi(n) : $ + q(0.8);
}
function Eo(n) {
  return n.size === "big" ? 13206784 : 16765209;
}
function Ht(n, e) {
  n.traverse((t) => {
    const i = t;
    if (!i.isMesh || !(i.material instanceof h.MeshBasicMaterial))
      return;
    const a = i.userData.baseOpacity;
    i.material.opacity = (a ?? i.material.opacity) * e;
  });
}
function Io(n) {
  const e = new h.Group();
  e.renderOrder = 18, e.frustumCulled = !1;
  const t = new h.MeshBasicMaterial({
    color: 1118477,
    transparent: !0,
    opacity: 0.86,
    side: h.DoubleSide,
    depthWrite: !1
  });
  ie(t);
  const i = new h.MeshBasicMaterial({
    color: 16752640,
    transparent: !0,
    opacity: 0.86,
    side: h.DoubleSide,
    blending: h.AdditiveBlending,
    depthWrite: !1
  });
  ie(i);
  const a = new h.Mesh(new h.CircleGeometry(n * 0.55, 48), t.clone());
  a.userData.baseOpacity = t.opacity, a.position.z = $ - 2.2, a.renderOrder = 18, a.frustumCulled = !1, e.add(a);
  const s = new h.Mesh(
    new h.RingGeometry(n * 0.45, n * 0.62, 48),
    new h.MeshBasicMaterial({
      color: 16765242,
      transparent: !0,
      opacity: 0.78,
      side: h.DoubleSide,
      blending: h.AdditiveBlending,
      depthWrite: !1
    })
  );
  ie(s.material), s.userData.baseOpacity = s.material.opacity, s.position.z = $ - 1.1, s.renderOrder = 20, s.frustumCulled = !1, e.add(s);
  function o(r, l, c) {
    const d = new h.Shape();
    return [
      [r * Math.cos(-c * 0.72), r * Math.sin(-c * 0.72)],
      [l * Math.cos(-c), l * Math.sin(-c)],
      [l * Math.cos(c), l * Math.sin(c)],
      [r * Math.cos(c * 0.72), r * Math.sin(c * 0.72)]
    ].forEach(([u, p], f) => {
      f === 0 ? d.moveTo(u, p) : d.lineTo(u, p);
    }), d.closePath(), d;
  }
  for (let r = 0; r < 3; r += 1) {
    const l = r * (Math.PI * 2) / 3 + Math.PI / 2, c = new h.Mesh(
      new h.ShapeGeometry(o(n * 0.52, n * 1.42, 0.33)),
      t.clone()
    );
    c.userData.baseOpacity = t.opacity, c.position.z = $ - 2, c.rotation.z = l, c.renderOrder = 18, c.frustumCulled = !1, e.add(c);
    const d = new h.Mesh(
      new h.ShapeGeometry(o(n * 0.66, n * 1.2, 0.21)),
      i.clone()
    );
    d.userData.baseOpacity = i.opacity, d.position.z = $ - 0.8, d.rotation.z = l, d.renderOrder = 19, d.frustumCulled = !1, e.add(d);
  }
  return e;
}
function Ao(n, e) {
  const t = _o(n), i = Eo(n), a = rt(n), s = n.size === "big", o = new h.Group();
  o.position.set(n.position.x, n.position.y, n.position.z), o.renderOrder = 20, o.frustumCulled = !1;
  const r = s ? Io(t) : new h.Group();
  s && o.add(r);
  const l = new h.Mesh(
    new h.RingGeometry(t * (s ? 0.62 : 0.72), t * (s ? 0.82 : 1), 32),
    new h.MeshBasicMaterial({
      color: s ? 16765239 : i,
      transparent: !0,
      opacity: s ? 0.82 : 0.92,
      side: h.DoubleSide,
      blending: s ? h.AdditiveBlending : h.NormalBlending,
      depthWrite: !1
    })
  );
  ie(l.material), l.position.z = $, l.renderOrder = 20, l.frustumCulled = !1, o.add(l);
  const c = new h.Mesh(
    new h.CircleGeometry(t * (s ? 0.54 : 0.58), 32),
    new h.MeshBasicMaterial({
      color: s ? 16754176 : i,
      transparent: !0,
      opacity: s ? 0.46 : 0.3,
      side: h.DoubleSide,
      blending: s ? h.AdditiveBlending : h.NormalBlending,
      depthWrite: !1
    })
  );
  ie(c.material), c.position.z = $ + 0.5, c.renderOrder = 21, c.frustumCulled = !1, o.add(c);
  const d = new h.Mesh(
    new h.CircleGeometry(t * 0.42, 20),
    new h.MeshBasicMaterial({
      color: 16777215,
      transparent: !0,
      opacity: 0.22,
      side: h.DoubleSide,
      depthWrite: !1
    })
  );
  ie(d.material), d.position.z = $ + 1, d.renderOrder = 22, d.frustumCulled = !1, o.add(d);
  const m = new h.Mesh(
    s ? new h.SphereGeometry(a, 32, 18) : new h.SphereGeometry(a * 1.22, 32, 12),
    s ? new h.MeshPhysicalMaterial({
      color: 16757274,
      emissive: new h.Color(16747008),
      emissiveIntensity: 0.42,
      metalness: 0.04,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.025,
      transmission: 0.18,
      thickness: q(48),
      ior: 1.42,
      envMap: e.reflectionMap,
      envMapIntensity: 1.9,
      transparent: !0,
      opacity: 0.68,
      depthWrite: !1,
      blending: h.AdditiveBlending
    }) : new h.MeshPhysicalMaterial({
      color: i,
      emissive: new h.Color(16751872),
      emissiveIntensity: 0.72,
      metalness: 0.88,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMap: e.reflectionMap,
      envMapIntensity: 2,
      transparent: !0,
      opacity: 0.96,
      depthWrite: !1
    })
  );
  m.position.z = Se(n), s || (m.scale.z = 0.18), m.renderOrder = 23, m.frustumCulled = !1, o.add(m);
  const u = new h.Mesh(
    s ? new h.CylinderGeometry(t * 0.07, t * 0.11, a * 2.04, 24, 1, !0) : new h.CylinderGeometry(
      a * 0.72,
      a * 1.12,
      a * 0.42,
      24,
      1,
      !0
    ),
    new h.MeshBasicMaterial({
      color: s ? 16761664 : 16766538,
      transparent: !0,
      opacity: s ? 0.28 : 0.12,
      side: h.DoubleSide,
      blending: h.AdditiveBlending,
      depthWrite: !1
    })
  );
  u.rotation.x = Math.PI / 2, u.position.z = s ? $ + q(58) : $ + q(7), u.renderOrder = 23, u.frustumCulled = !1, o.add(u);
  const p = new h.Mesh(
    new h.SphereGeometry(s ? a * 1.01 : a * 1.24, 32, 14),
    new h.MeshBasicMaterial({
      color: s ? 16768890 : i,
      transparent: !0,
      opacity: s ? 0.32 : 0.12,
      side: h.BackSide,
      blending: h.AdditiveBlending,
      depthWrite: !1
    })
  );
  p.position.z = Se(n), s || (p.scale.z = 0.18), p.renderOrder = 24, p.frustumCulled = !1, o.add(p);
  const f = new h.Mesh(
    new h.CircleGeometry(s ? a * 0.72 : a * 0.82, 24),
    new h.MeshBasicMaterial({
      color: s ? 16768898 : 16775119,
      transparent: !0,
      opacity: s ? 0.52 : 0.34,
      side: h.DoubleSide,
      blending: h.AdditiveBlending,
      depthWrite: !1
    })
  );
  ie(f.material), f.scale.y = s ? 0.36 : 0.44, f.position.set(
    s ? -a * 0.16 : -a * 0.22,
    s ? a * 0.1 : a * 0.12,
    Se(n) + (s ? a * 0.5 : a * 0.16)
  ), f.renderOrder = 25, f.frustumCulled = !1, o.add(f);
  const g = new h.Mesh(
    s ? new h.SphereGeometry(a * 1.28, 32, 14) : new h.CircleGeometry(a * 1.82, 32),
    new h.MeshBasicMaterial({
      color: i,
      transparent: !0,
      opacity: s ? 0.16 : 0.28,
      side: h.DoubleSide,
      blending: h.AdditiveBlending,
      depthWrite: !1
    })
  );
  return g.position.z = Zi(n), g.renderOrder = 24, g.frustumCulled = !1, o.add(g), { group: o, base: r, ring: l, core: c, cooldown: d, orb: m, lensColumn: u, lensRim: p, sheen: f, glow: g };
}
function zo(n) {
  const e = n.scene.scene.environment;
  if (e instanceof h.Texture)
    return {
      reflectionMap: e,
      dispose() {
      }
    };
  const t = new h.PMREMGenerator(n.scene.renderer), i = t.fromScene(new li(), 0.04).texture;
  return t.dispose(), {
    reflectionMap: i,
    dispose() {
      i.dispose();
    }
  };
}
function Bo(n, e) {
  let t = -1;
  for (let s = 0; s < n.events.length && !(n.events[s].time > e); s += 1)
    t = s;
  if (t < 0)
    return { available: !0, progress: 1 };
  const i = n.events[t];
  if (i.available)
    return { available: !0, progress: 1 };
  const a = n.events.slice(t + 1).find((s) => s.available);
  return !a || a.time <= i.time ? { available: !1, progress: 0 } : {
    available: !1,
    progress: h.MathUtils.clamp(
      (e - i.time) / (a.time - i.time),
      0,
      1
    )
  };
}
function Do(n, e, t, i) {
  const { available: a, progress: s } = Bo(e, t), o = e.size === "big", r = 0.92 + 0.08 * Math.sin(t * 6 + e.index * 0.45), l = (o ? 0.98 : 0.96) + (o ? 0.025 : 0.04) * Math.sin(t * (o ? 4.8 : 7.2) + e.index * 0.37), c = o ? Math.sin(t * 2.2 + e.index * 0.61) * 10 : 0, d = Se(e) + c, m = Zi(e) + c, u = rt(e);
  if (n.orb.position.z = d, n.lensRim.position.z = d, n.sheen.position.z = d + (o ? u * 0.5 : u * 0.16), n.glow.position.z = m, n.orb.rotation.z = t * (o ? 0.9 : 1.25), n.lensRim.rotation.z = -t * (o ? 0.7 : 1.1), n.lensColumn.rotation.z = t * 0.18, n.sheen.rotation.z = t * (o ? -0.35 : -0.8), n.glow.rotation.z = -t * 0.45, a) {
    n.group.visible = !0, Ht(n.base, 1), n.ring.material.opacity = o ? 0.82 : 0.95, n.core.material.opacity = o ? 0.48 : 0.5, n.cooldown.visible = !1, n.base.visible = o, n.base.scale.setScalar(1 + (r - 0.92) * 0.18), n.ring.scale.setScalar(o ? 1 + (r - 0.92) * 0.32 : r), n.core.scale.setScalar(1), n.orb.visible = !0, n.lensColumn.visible = !0, n.lensRim.visible = !0, n.sheen.visible = !0, n.glow.visible = !0, n.orb.material.opacity = o ? 0.68 : 0.98, n.lensColumn.material.opacity = (o ? 0.28 : 0.12) + (l - (o ? 0.98 : 0.96)) * 0.34, n.lensRim.material.opacity = (o ? 0.32 : 0.12) + (l - (o ? 0.98 : 0.96)) * 0.55, n.sheen.material.opacity = (o ? 0.52 : 0.34) + (l - (o ? 0.98 : 0.96)) * 0.7, n.glow.material.opacity = (o ? 0.16 : 0.28) + (l - (o ? 0.98 : 0.96)), n.orb.scale.setScalar(l), n.lensRim.scale.setScalar(1.01 + (l - (o ? 0.98 : 0.96)) * 1.7), n.lensColumn.scale.setScalar(1 + (l - (o ? 0.98 : 0.96)) * 1.2), o || (n.orb.scale.z = 0.18 * l, n.lensRim.scale.z = 0.18 * l), n.sheen.scale.setScalar(o ? 1.02 + (l - 0.96) : 1.06 + (l - 0.96)), n.sheen.scale.y *= o ? 0.36 : 0.44, n.glow.scale.setScalar(o ? 1.02 + (l - 0.96) * 2 : 1);
    return;
  }
  if (n.group.visible = !0, Ht(n.base, 0.26), n.ring.material.opacity = 0.18, n.core.material.opacity = 0.07, n.base.scale.setScalar(1), n.ring.scale.setScalar(1), n.core.scale.setScalar(1), n.orb.visible = !1, n.lensColumn.visible = !1, n.lensRim.visible = !1, n.sheen.visible = !1, n.glow.visible = !1, n.cooldown.visible = i, i) {
    const p = 0.3 + s * 0.7;
    n.cooldown.scale.setScalar(p), n.cooldown.material.opacity = 0.16 + s * 0.2;
  }
}
function pl(n = {}) {
  const e = n.showCooldownProgress ?? !0;
  let t = null, i = null;
  const a = /* @__PURE__ */ new Map();
  function s(r) {
    t = new h.Group(), t.name = "boost-pad-overlay", t.renderOrder = 20, t.frustumCulled = !1, i = zo(r);
    for (const l of r.replay.boostPads) {
      const c = Ao(l, i);
      t.add(c.group), a.set(l.index, c);
    }
    r.scene.replayRoot.add(t);
  }
  function o(r) {
    for (const l of r.replay.boostPads) {
      const c = a.get(l.index);
      c && Do(c, l, r.state.currentTime, e);
    }
  }
  return {
    id: "boost-pad-overlay",
    setup(r) {
      s(r), o({
        ...r,
        state: r.player.getState()
      });
    },
    onStateChange(r) {
      o(r);
    },
    teardown() {
      t?.removeFromParent(), i?.dispose(), i = null, t = null, a.clear();
    }
  };
}
const ko = 1.35, Fo = "#57a8ff", Ro = "#ff9c40", Oo = 256, Lo = 160, Vo = 360, No = 225, Go = 260, $o = 430, Qi = 18, Wt = 120;
function Ho(n) {
  return n ? Fo : Ro;
}
function Wo(n) {
  return n.events.filter((e) => !e.available && e.playerId);
}
function Ji(n, e) {
  const t = document.createElement("canvas");
  t.width = Oo, t.height = Lo;
  const i = t.getContext("2d");
  if (!i)
    throw new Error("Unable to create boost pickup count canvas");
  i.clearRect(0, 0, t.width, t.height), i.textAlign = "center", i.textBaseline = "middle", i.lineJoin = "round", i.font = "800 124px sans-serif", i.lineWidth = 18, i.strokeStyle = "rgba(4, 10, 18, 0.88)", i.strokeText(`${n}`, t.width / 2, t.height / 2), i.fillStyle = e, i.fillText(`${n}`, t.width / 2, t.height / 2);
  const a = new h.CanvasTexture(t);
  return a.colorSpace = h.SRGBColorSpace, a.needsUpdate = !0, a;
}
function Uo(n) {
  n?.dispose();
}
function jo(n) {
  const e = new h.Group();
  e.visible = !1, e.renderOrder = 60, e.frustumCulled = !1;
  const t = Ji(1, n), i = new h.SpriteMaterial({
    map: t,
    transparent: !0,
    depthTest: !1,
    depthWrite: !1
  }), a = new h.Sprite(i);
  a.scale.set(Vo, No, 1), a.renderOrder = 62, a.frustumCulled = !1, e.add(a);
  const s = new h.MeshBasicMaterial({
    color: n,
    transparent: !0,
    opacity: 0,
    side: h.DoubleSide,
    depthTest: !1,
    depthWrite: !1,
    blending: h.AdditiveBlending
  }), o = new h.Mesh(
    new h.RingGeometry(Wt * 0.72, Wt, 36),
    s
  );
  return o.position.z = Qi, o.renderOrder = 61, o.frustumCulled = !1, e.add(o), { group: e, textMaterial: i, ringMaterial: s };
}
function Ko(n, e) {
  n.currentCount !== e && (Uo(n.textMaterial.map), n.textMaterial.map = Ji(e, n.color), n.textMaterial.needsUpdate = !0, n.currentCount = e);
}
function Xo(n) {
  const e = /* @__PURE__ */ new Map();
  for (const a of n.replay.players)
    e.set(a.id, a);
  const t = [];
  for (const a of n.replay.boostPads)
    for (const s of Wo(a))
      t.push({ pad: a, event: s });
  t.sort((a, s) => a.event.time !== s.event.time ? a.event.time - s.event.time : a.event.frame !== s.event.frame ? a.event.frame - s.event.frame : a.pad.index - s.pad.index);
  const i = [];
  for (const { pad: a, event: s } of t) {
    if (!s.playerId)
      continue;
    const o = e.get(s.playerId);
    if (!o)
      continue;
    const r = Ho(o.isTeamZero), { group: l, textMaterial: c, ringMaterial: d } = jo(r);
    l.position.copy(a.position), n.scene.replayRoot.add(l), i.push({
      time: s.time,
      pad: a,
      event: s,
      player: o,
      color: r,
      currentCount: 1,
      position: new h.Vector3(a.position.x, a.position.y, a.position.z),
      size: a.size,
      group: l,
      textMaterial: c,
      ringMaterial: d
    });
  }
  return i;
}
function Yo(n, e, t) {
  const i = h.MathUtils.clamp(e / t, 0, 1), a = 1 - Math.pow(1 - i, 3), s = i * i, o = n.size === "big" ? $o : Go, r = n.size === "big" ? 360 : 280, l = 1 + Math.sin(i * Math.PI) * 0.22;
  n.group.visible = !0, n.group.position.set(
    n.position.x,
    n.position.y,
    n.position.z + o + a * r
  ), n.group.scale.setScalar(l), n.textMaterial.opacity = Math.max(0, 1 - s), n.ringMaterial.opacity = Math.max(0, 0.48 * (1 - i));
  const c = n.group.children[1];
  if (c) {
    const d = 0.75 + a * (n.size === "big" ? 2.8 : 1.85);
    c.scale.setScalar(d), c.position.z = Qi - o - a * r;
  }
}
function fl(n = {}) {
  const e = Math.max(0.1, n.durationSeconds ?? ko);
  let t = [];
  function i(s) {
    return n.includePickup?.({
      pad: s.pad,
      event: s.event,
      player: s.player
    }) ?? !0;
  }
  function a() {
    for (const s of t)
      s.group.visible = !1;
  }
  return {
    id: "boost-pickup-animation",
    setup(s) {
      t = Xo(s);
    },
    beforeRender(s) {
      if (!s.state.boostPickupAnimationEnabled) {
        a();
        return;
      }
      const o = s.currentTime - e, r = /* @__PURE__ */ new Map();
      for (const l of t) {
        if (l.time > s.currentTime) {
          l.group.visible = !1;
          continue;
        }
        if (!i(l)) {
          l.group.visible = !1;
          continue;
        }
        const c = (r.get(l.player.id) ?? 0) + 1;
        if (r.set(l.player.id, c), l.time < o) {
          l.group.visible = !1;
          continue;
        }
        Ko(l, c), Yo(l, s.currentTime - l.time, e);
      }
    },
    teardown() {
      for (const s of t)
        s.group.removeFromParent(), s.group.traverse((o) => {
          (o instanceof h.Mesh || o instanceof h.Sprite) && o.geometry?.dispose();
        }), s.textMaterial.map?.dispose(), s.textMaterial.dispose(), s.ringMaterial.dispose();
      t = [];
    }
  };
}
const qo = 60, Zo = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
function Qo(n) {
  if (n && MediaRecorder.isTypeSupported(n))
    return n;
  for (const e of Zo)
    if (MediaRecorder.isTypeSupported(e))
      return e;
  return "";
}
function Jo(n) {
  return n instanceof Error ? n.message : String(n);
}
function gl(n = {}) {
  let e = null, t = null, i = [], a = null, s = 0, o = 0, r = "", l = 0, c = null, d = null, m = null, u = null, p = !1, f = null;
  const g = /* @__PURE__ */ new Set();
  function y() {
    return {
      state: t ? t.state === "recording" ? "recording" : "stopping" : c ? "error" : a ? "ready" : "idle",
      elapsedSeconds: o,
      mimeType: r,
      sizeBytes: l,
      error: c
    };
  }
  function x() {
    const w = y();
    n.onStatusChange?.(w);
    for (const S of g)
      S(w);
  }
  function v() {
    if (!e)
      throw new Error("Canvas recorder plugin is not installed");
    return e;
  }
  function b(w) {
    t = null, u = null, p = !1, a = w, l = w?.size ?? 0, f && e && e.player.setState({
      currentTime: f.currentTime,
      speed: f.speed,
      playing: f.playing
    }), f = null, w && n.onComplete?.(w), x(), m?.(w), m = null, d = null;
  }
  function M(w) {
    c = Jo(w), t = null, u = null, p = !1, f = null, x(), m?.(null), m = null, d = null;
  }
  const C = {
    id: "canvas-recorder",
    setup(w) {
      e = w;
    },
    beforeRender(w) {
      t?.state === "recording" && (o = (performance.now() - s) / 1e3, x()), t?.state === "recording" && u !== null && w.currentTime >= u && C.stop();
    },
    onStateChange(w) {
      p && t?.state === "recording" && !w.state.playing && o > 0 && C.stop();
    },
    teardown() {
      t?.state === "recording" && t.stop(), e = null, t = null, u = null, p = !1, f = null, m?.(null), m = null, d = null, g.clear();
    },
    start(w = {}) {
      const S = v();
      if (t?.state === "recording")
        throw new Error("Canvas recording is already in progress");
      if (typeof MediaRecorder > "u")
        throw new Error("MediaRecorder is not available in this browser");
      const E = S.scene.renderer.domElement;
      if (!E.captureStream)
        throw new Error("Canvas captureStream is not available in this browser");
      c = null, a = null, i = [], l = 0, o = 0, s = performance.now(), r = Qo(w.mimeType ?? n.mimeType);
      const B = Math.max(1, w.fps ?? n.fps ?? qo), z = E.captureStream(B);
      t = new MediaRecorder(z, {
        mimeType: r,
        videoBitsPerSecond: w.videoBitsPerSecond ?? n.videoBitsPerSecond
      }), d = new Promise((k) => {
        m = k;
      }), t.addEventListener("dataavailable", (k) => {
        k.data.size > 0 && (i.push(k.data), l += k.data.size, x());
      }), t.addEventListener(
        "stop",
        () => {
          z.getTracks().forEach((k) => k.stop()), b(new Blob(i, { type: r || "video/webm" }));
        },
        { once: !0 }
      ), t.addEventListener(
        "error",
        (k) => {
          z.getTracks().forEach((L) => L.stop()), M(k.error ?? k);
        },
        { once: !0 }
      ), t.start(1e3), x();
    },
    stop() {
      if (!t)
        return Promise.resolve(a);
      if (t.state === "inactive")
        return d ?? Promise.resolve(a);
      const w = d ?? new Promise((S) => {
        m = S;
      });
      return t.stop(), x(), w;
    },
    clear() {
      if (t?.state === "recording")
        throw new Error("Cannot clear a recording while recording is in progress");
      a = null, i = [], l = 0, o = 0, c = null, x();
    },
    getRecording() {
      return a;
    },
    getStatus() {
      return y();
    },
    subscribe(w) {
      return g.add(w), w(y()), () => {
        g.delete(w);
      };
    },
    recordRange(w = {}) {
      const S = v(), E = S.player.getState();
      (w.restorePlaybackState ?? !0) && (f = E);
      const B = w.playbackRate ?? E.speed, z = w.startTime ?? E.currentTime;
      u = w.endTime ?? E.duration, p = !0, S.player.setState({
        currentTime: z,
        speed: B,
        playing: !1
      }), C.start(w);
      const k = d;
      return S.player.play(), (k ?? Promise.resolve(null)).then((L) => {
        if (!L)
          throw new Error("Recording stopped without producing a video");
        return L;
      });
    },
    recordFullReplay(w = {}) {
      return C.recordRange({
        ...w,
        startTime: w.startTime ?? 0,
        endTime: w.endTime ?? v().replay.duration
      });
    }
  };
  return C;
}
const Ut = "subtr-actor-timeline-overlay-styles";
function er() {
  if (document.getElementById(Ut))
    return;
  const n = document.createElement("style");
  n.id = Ut, n.textContent = `
    .sap-tl-root {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Segoe UI", Roboto, sans-serif;
    }

    .sap-tl-shell {
      --sap-tl-thumb-size: 1.35rem;
      --sap-tl-track-height: 0.6rem;
      --sap-tl-gutter-width: 2.25rem;
      --sap-tl-gutter-gap: 0.55rem;
      --sap-tl-marker-offset: 1.05rem;
      position: absolute;
      left: 0.8rem;
      right: 0.8rem;
      bottom: 0.9rem;
      padding: 0.75rem 0.9rem 0.9rem;
      border: 1px solid rgba(180, 205, 226, 0.18);
      border-radius: 1.05rem;
      background:
        linear-gradient(180deg, rgba(13, 20, 28, 0.92), rgba(7, 12, 18, 0.96));
      box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
      backdrop-filter: blur(12px);
      pointer-events: auto;
    }

    .sap-tl-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background:
        linear-gradient(90deg, rgba(60, 134, 255, 0.18), transparent 28%, transparent 72%, rgba(242, 138, 37, 0.16));
      pointer-events: none;
    }

    .sap-tl-topline {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: calc(var(--sap-tl-gutter-width) + var(--sap-tl-gutter-gap));
      margin-bottom: 0.55rem;
      color: #f5fbff;
      font-size: 0.82rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      gap: 0.85rem;
    }

    .sap-tl-primary {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      min-width: 0;
    }

    .sap-tl-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      min-width: 4.9rem;
      padding: 0.42rem 0.72rem;
      border: 1px solid rgba(184, 214, 236, 0.24);
      border-radius: 999px;
      background: rgba(18, 30, 42, 0.92);
      color: #f5fbff;
      font: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition:
        transform 140ms ease,
        border-color 140ms ease,
        background 140ms ease;
    }

    .sap-tl-track-toggle {
      width: 2.15rem;
      min-width: 2.15rem;
      min-height: 2.15rem;
      padding: 0;
      gap: 0;
    }

    .sap-tl-toggle-label {
      display: none;
      min-width: 0;
    }

    .sap-tl-toggle:hover {
      border-color: rgba(184, 214, 236, 0.4);
      background: rgba(28, 45, 61, 0.96);
      transform: translateY(-1px);
    }

    .sap-tl-toggle:focus-visible {
      outline: 2px solid rgba(123, 180, 255, 0.9);
      outline-offset: 2px;
    }

    .sap-tl-toggle-icon {
      width: 0.85rem;
      text-align: center;
      font-size: 0.7rem;
      line-height: 1;
    }

    .sap-tl-current {
      color: #f5fbff;
    }

    .sap-tl-remaining {
      color: #b8c9d9;
    }

    .sap-tl-track-wrap {
      position: relative;
      display: grid;
      grid-template-columns: var(--sap-tl-gutter-width) minmax(0, 1fr);
      column-gap: var(--sap-tl-gutter-gap);
      row-gap: 0;
      align-items: center;
    }

    .sap-tl-ranges {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 0.34rem;
      margin-bottom: 0;
    }

    .sap-tl-event-lanes {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 0.34rem;
      margin-bottom: 0;
    }

    .sap-tl-event-lane {
      position: relative;
      display: grid;
      grid-template-columns: var(--sap-tl-gutter-width) minmax(0, 1fr);
      column-gap: var(--sap-tl-gutter-gap);
      align-items: center;
    }

    .sap-tl-event-lane-track {
      position: relative;
      grid-column: 2;
      height: 1.05rem;
      margin: 0 calc(var(--sap-tl-thumb-size) / 2);
      box-sizing: border-box;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.045);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
    }

    .sap-tl-event-lane-label {
      display: block;
      max-width: 100%;
      padding: 0.08rem 0.38rem;
      border: 1px solid rgba(184, 214, 236, 0.18);
      border-radius: 999px;
      background: rgba(10, 16, 23, 0.82);
      color: #c8d7e4;
      font-size: 0.54rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.2;
      text-transform: uppercase;
      backdrop-filter: blur(6px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sap-tl-range-lane {
      position: relative;
      display: grid;
      grid-template-columns: var(--sap-tl-gutter-width) minmax(0, 1fr);
      column-gap: var(--sap-tl-gutter-gap);
      align-items: center;
    }

    .sap-tl-range-lane-track {
      position: relative;
      grid-column: 2;
      height: var(--sap-tl-track-height);
      margin: 0 calc(var(--sap-tl-thumb-size) / 2);
      box-sizing: border-box;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .sap-tl-range-lane-label {
      display: block;
      max-width: 100%;
      padding: 0.08rem 0.38rem;
      border: 1px solid rgba(184, 214, 236, 0.18);
      border-radius: 999px;
      background: rgba(10, 16, 23, 0.82);
      color: #c8d7e4;
      font-size: 0.54rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.2;
      text-transform: uppercase;
      backdrop-filter: blur(6px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sap-tl-event-lane[data-label]::after,
    .sap-tl-range-lane[data-label]::after {
      content: attr(data-label);
      position: absolute;
      left: calc(var(--sap-tl-gutter-width) + var(--sap-tl-gutter-gap) + calc(var(--sap-tl-thumb-size) / 2));
      bottom: calc(100% + 0.28rem);
      z-index: 8;
      max-width: min(22rem, calc(100% - var(--sap-tl-gutter-width) - var(--sap-tl-gutter-gap)));
      padding: 0.28rem 0.48rem;
      border: 1px solid rgba(184, 214, 236, 0.24);
      border-radius: 0.4rem;
      background: rgba(7, 12, 18, 0.96);
      color: #f5fbff;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.34);
      font-size: 0.68rem;
      font-weight: 800;
      line-height: 1.2;
      opacity: 0;
      overflow: hidden;
      pointer-events: none;
      text-overflow: ellipsis;
      transform: translateY(0.14rem);
      transition:
        opacity 120ms ease,
        transform 120ms ease;
      white-space: nowrap;
    }

    .sap-tl-event-lane[data-label]:hover::after,
    .sap-tl-event-lane[data-label]:focus-within::after,
    .sap-tl-range-lane[data-label]:hover::after,
    .sap-tl-range-lane[data-label]:focus-within::after {
      opacity: 1;
      transform: translateY(0);
    }

    .sap-tl-range-segment {
      position: absolute;
      top: 0;
      bottom: 0;
      min-width: 2px;
      border-radius: 999px;
      opacity: 0.62;
      transition:
        opacity 120ms ease,
        filter 120ms ease,
        transform 120ms ease;
    }

    .sap-tl-range-segment[data-active="true"] {
      opacity: 0.92;
      filter: brightness(1.12);
      transform: scaleY(1.06);
    }

    .sap-tl-range-playhead,
    .sap-tl-event-playhead {
      position: absolute;
      top: -0.14rem;
      bottom: -0.14rem;
      width: 1px;
      transform: translateX(-50%);
      border-radius: 999px;
      background: rgba(245, 251, 255, 0.74);
      box-shadow: 0 0 0 1px rgba(6, 12, 18, 0.45);
      opacity: 0.9;
      pointer-events: none;
      z-index: 3;
    }

    .sap-tl-event-playhead {
      top: -0.08rem;
      bottom: -0.08rem;
    }

    .sap-tl-track-rail {
      position: relative;
      grid-column: 2;
      min-width: 0;
      min-height: var(--sap-tl-thumb-size);
      margin-top: 0.58rem;
    }

    .sap-tl-main-rail {
      position: absolute;
      left: calc(var(--sap-tl-thumb-size) / 2);
      right: calc(var(--sap-tl-thumb-size) / 2);
      top: 50%;
      height: var(--sap-tl-track-height);
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background:
        linear-gradient(90deg, rgba(60, 134, 255, 0.42), rgba(103, 179, 255, 0.58) 45%, rgba(242, 138, 37, 0.58));
      box-shadow: inset 0 0 0 999px rgba(5, 10, 15, 0.4);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 0;
    }

    .sap-tl-range {
      position: relative;
      z-index: 2;
      width: 100%;
      height: var(--sap-tl-thumb-size);
      margin: 0;
      appearance: none;
      background: transparent;
      cursor: pointer;
    }

    .sap-tl-range:focus {
      outline: none;
    }

    .sap-tl-range::-webkit-slider-runnable-track {
      height: var(--sap-tl-track-height);
      border-radius: 999px;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    .sap-tl-range::-moz-range-track {
      height: var(--sap-tl-track-height);
      border-radius: 999px;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    .sap-tl-range::-webkit-slider-thumb {
      appearance: none;
      margin-top: -0.38rem;
      width: var(--sap-tl-thumb-size);
      height: var(--sap-tl-thumb-size);
      border: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 35%, #ffffff 0%, #d8ebff 28%, #7bb4ff 55%, #27456d 100%);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.34);
    }

    .sap-tl-range::-moz-range-thumb {
      width: var(--sap-tl-thumb-size);
      height: var(--sap-tl-thumb-size);
      border: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 35%, #ffffff 0%, #d8ebff 28%, #7bb4ff 55%, #27456d 100%);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.34);
    }

    .sap-tl-shell[data-scrubbing="true"] .sap-tl-range::-webkit-slider-thumb,
    .sap-tl-shell[data-scrubbing="true"] .sap-tl-range::-moz-range-thumb {
      background:
        radial-gradient(circle at 35% 35%, #ffffff 0%, #ffe5c5 32%, #ffad47 58%, #7b3d00 100%);
      transform: scale(1.05);
    }

    .sap-tl-markers {
      position: absolute;
      left: calc(var(--sap-tl-thumb-size) / 2);
      right: calc(var(--sap-tl-thumb-size) / 2);
      top: calc(-1 * var(--sap-tl-marker-offset));
      height: 1rem;
      pointer-events: none;
      z-index: 1;
    }

    .sap-tl-event-lane .sap-tl-markers {
      position: relative;
      left: auto;
      right: auto;
      top: auto;
      height: 100%;
    }

    .sap-tl-event-lane .sap-tl-marker {
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .sap-tl-event-lane .sap-tl-marker::before {
      display: none;
    }

    .sap-tl-event-lane .sap-tl-marker[data-active="true"] {
      transform: translate(-50%, -50%) scale(1.16);
    }

    .sap-tl-marker {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      width: 0.95rem;
      height: 0.95rem;
      padding: 0;
      border: 0;
      border-radius: 999px;
      background: rgba(12, 18, 24, 0.96);
      color: #f5fbff;
      font-size: 0.52rem;
      font-weight: 800;
      line-height: 1;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      pointer-events: auto;
      cursor: pointer;
    }

    .sap-tl-marker::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 0.85rem;
      width: 2px;
      height: 0.55rem;
      transform: translateX(-50%);
      background: currentColor;
      opacity: 0.7;
    }

    .sap-tl-marker:hover {
      filter: brightness(1.08);
    }

    .sap-tl-marker[data-passed="true"] {
      opacity: 0.9;
    }

    .sap-tl-marker[data-active="true"] {
      transform: translateX(-50%) scale(1.16);
      opacity: 1;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.38);
    }

    @media (max-width: 720px) {
      .sap-tl-shell {
        --sap-tl-gutter-width: 4rem;
        --sap-tl-gutter-gap: 0.55rem;
        bottom: 0.6rem;
        left: 0.5rem;
        right: 0.5rem;
        padding: 0.65rem 0.7rem 0.75rem;
      }

      .sap-tl-topline {
        font-size: 0.72rem;
      }
    }
  `, document.head.append(n);
}
const tr = /* @__PURE__ */ new Set(["goal", "save", "bookmark"]), ir = 0.2, je = 60, ar = 2, nr = 4, sr = 0.01, jt = 0.01;
function Ze(n) {
  if (!Number.isFinite(n))
    return "--:--.--";
  const e = Math.max(0, n), t = Math.floor(e / 60), i = Math.floor(e % 60), a = Math.floor((e - Math.floor(e)) * 100);
  return `${t}:${String(i).padStart(2, "0")}.${String(a).padStart(2, "0")}`;
}
function Kt(n) {
  switch (n.kind) {
    case "goal":
      return 5;
    case "demo":
      return 4;
    case "save":
      return 3;
    case "assist":
      return 2;
    case "shot":
    case "bookmark":
      return 1;
    default:
      return 0;
  }
}
function or(n) {
  switch (n.kind) {
    case "goal":
    case "goal-context":
    case "goal-tag":
      return nr;
    default:
      return ar;
  }
}
function rr(n) {
  return n.seekTime !== void 0 && Number.isFinite(n.seekTime) ? Math.max(0, n.seekTime) : Number.isFinite(n.time) ? Math.max(0, n.time - or(n)) : 0;
}
function lr(n) {
  if (n.color)
    return n.color;
  if (n.isTeamZero === !0)
    return "#3b82f6";
  if (n.isTeamZero === !1)
    return "#f59e0b";
  switch (n.kind) {
    case "goal":
      return "#f5f7fa";
    case "demo":
      return "#ef4444";
    case "save":
      return "#34d399";
    case "assist":
      return "#c084fc";
    case "shot":
      return "#60a5fa";
    case "bookmark":
      return "#facc15";
    default:
      return "#d1d9e0";
  }
}
function cr(n) {
  if (n.events.length > 1)
    return `${n.events.length}`;
  const e = n.events[0];
  return e ? e.shortLabel && e.shortLabel.trim() !== "" ? e.shortLabel.slice(0, 3).toUpperCase() : e.kind.slice(0, 1).toUpperCase() : "";
}
function Qe(n) {
  return [...n].sort((e, t) => {
    const i = Kt(t) - Kt(e);
    return i !== 0 ? i : e.time - t.time;
  });
}
function hr(n) {
  return n.events.map((e) => `${Ze(e.time)} ${e.label ?? e.kind}`).join(`
`);
}
function ea(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) {
    const i = t.frame !== void 0 ? `frame:${t.frame}` : `time:${t.time.toFixed(2)}`, a = e.get(i);
    if (a) {
      a.events.push(t);
      continue;
    }
    e.set(i, {
      key: i,
      time: t.time,
      events: [t]
    });
  }
  return [...e.values()].map((t) => ({
    ...t,
    events: Qe(t.events)
  })).sort((t, i) => t.time - i.time);
}
function Xt(n) {
  if (n.length <= je)
    return n;
  const e = n[0]?.time ?? 0, i = (n[n.length - 1]?.time ?? e) - e;
  if (i <= 0)
    return [
      {
        key: "compact:0",
        time: e,
        events: Qe(n.flatMap((o) => o.events))
      }
    ];
  const a = i / je, s = /* @__PURE__ */ new Map();
  for (const o of n) {
    const r = Math.min(
      je - 1,
      Math.max(0, Math.floor((o.time - e) / a))
    ), l = s.get(r);
    if (l) {
      l.events.push(...o.events);
      continue;
    }
    s.set(r, {
      key: `compact:${r}`,
      time: o.time,
      events: [...o.events]
    });
  }
  return [...s.values()].map((o) => ({
    ...o,
    events: Qe(o.events)
  })).sort((o, r) => o.time - r.time);
}
function ta(n, e) {
  return n ? typeof n == "function" ? n(e) : n : [];
}
function dr(n, e) {
  const t = [];
  for (const i of n) {
    const a = ta(i.source, e);
    a.length !== 0 && t.push({
      key: i.key,
      label: i.label,
      buckets: ea(a)
    });
  }
  return t;
}
function mr(n, e) {
  return n ? typeof n == "function" ? n(e) : n : [];
}
function ur(n, e) {
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const a of n)
    for (const s of mr(a, e)) {
      const o = s.id;
      if (o !== void 0) {
        if (t.has(o))
          continue;
        t.add(o);
      }
      i.push(s);
    }
  return i;
}
function pr(n) {
  const e = /* @__PURE__ */ new Map();
  for (const t of n) {
    const i = t.lane ?? "default", a = t.laneLabel ?? t.lane ?? "", s = e.get(i);
    if (s) {
      s.ranges.push(t);
      continue;
    }
    e.set(i, {
      key: i,
      label: a,
      ranges: [t]
    });
  }
  return [...e.values()].map((t) => ({
    ...t,
    ranges: [...t.ranges].sort((i, a) => i.startTime - a.startTime)
  }));
}
function fr(n) {
  return n.color ? n.color : n.isTeamZero === !0 ? "#3b82f6" : n.isTeamZero === !1 ? "#f59e0b" : "#d1d9e0";
}
function gr(n, e) {
  if (n.replayEvents)
    return ta(n.replayEvents, e);
  if (n.includeReplayEvents === !1)
    return [];
  const t = new Set(n.replayEventKinds ?? tr);
  return e.replay.timelineEvents.filter((i) => t.has(i.kind));
}
function yr(n, e) {
  const t = e.player.projectReplayTimeToTimeline(rr(n));
  if (!t.hiddenBySkip)
    return t.seekTime;
  const i = Math.min(
    e.player.getTimelineDuration(),
    t.timelineTime + sr
  );
  return e.player.projectTimelineTimeToReplay(i);
}
function Me(n, e) {
  return `${n / Math.max(e, 1e-4) * 100}%`;
}
function br(n, e, t) {
  let i = n.timelineTime, a = e.timelineTime;
  return a <= i && (n.hiddenBySkip || e.hiddenBySkip) && (i >= t ? (i = Math.max(0, t - jt), a = t) : a = Math.min(
    t,
    i + jt
  )), { startTimelineTime: i, endTimelineTime: a };
}
function yl(n = {}) {
  const e = n.pauseWhileScrubbing ?? !0;
  let t = 0;
  const i = n.events ? [
    {
      key: "events:initial",
      label: n.eventsLabel ?? "Events",
      source: n.events
    }
  ] : [], a = n.ranges ? [n.ranges] : [];
  let s = null, o = null, r = null, l = null, c = null, d = null, m = null, u = null, p = null, f = null, g = null, y = null, x = !1, v = "", b = !1, M = !1, C = null, w = [], S = [], E = null;
  const B = /* @__PURE__ */ new Map(), z = [], k = [], L = [], H = [];
  let W = 0, oe = /* @__PURE__ */ new Set();
  function Fe() {
    C && (Oe(C), ge({
      ...C,
      state: C.player.getState()
    }));
  }
  function Re() {
    C && (Le(C), ge({
      ...C,
      state: C.player.getState()
    }));
  }
  function ge(T) {
    if (!l || !c || !d || !m || !u || !p || !o)
      return;
    const P = T.player.getTimelineCurrentTime(), D = T.player.getTimelineDuration(), A = [
      D.toFixed(4),
      T.state.skipKickoffsEnabled ? "1" : "0",
      T.state.skipPostGoalTransitionsEnabled ? "1" : "0"
    ].join(":");
    E !== A && (Oe(T), Le(T), E = A), l.min = "0", l.max = `${D}`, l.step = "0.01", l.value = `${Math.min(P, D)}`, c.dataset.playing = T.state.playing ? "true" : "false", c.setAttribute("aria-label", T.state.playing ? "Pause replay" : "Play replay"), c.title = T.state.playing ? "Pause replay" : "Play replay", d.textContent = T.state.playing ? "||" : ">", m.textContent = T.state.playing ? "Pause" : "Play", u.textContent = Ze(P), p.textContent = `-${Ze(D - P)}`, o.dataset.scrubbing = b ? "true" : "false", ua(P);
    for (const _ of k) {
      const F = Math.max(0, _.startTimelineTime), R = Math.min(D, _.endTimelineTime);
      if (Math.max(0, R - F) <= 1e-4) {
        _.element.hidden = !0;
        continue;
      }
      _.element.hidden = !1, _.element.dataset.active = P >= F && P <= R ? "true" : "false";
    }
    const O = Me(Math.min(P, D), D);
    for (const _ of H)
      _.element.style.left = O;
    for (const _ of L)
      _.element.style.left = O;
  }
  function da(T) {
    let P = 0, D = z.length;
    for (; P < D; ) {
      const A = Math.floor((P + D) / 2);
      z[A].timelineTime <= T ? P = A + 1 : D = A;
    }
    return P;
  }
  function ma(T) {
    let P = 0, D = z.length;
    for (; P < D; ) {
      const A = Math.floor((P + D) / 2);
      z[A].timelineTime < T ? P = A + 1 : D = A;
    }
    return P;
  }
  function ht(T, P) {
    T.active !== P && (T.active = P, T.element.dataset.active = P ? "true" : "false");
  }
  function dt(T, P) {
    T.passed !== P && (T.passed = P, T.element.dataset.passed = P ? "true" : "false");
  }
  function ua(T) {
    if (z.length === 0)
      return;
    const P = da(T);
    if (P > W)
      for (let _ = W; _ < P; _ += 1)
        dt(z[_], !0);
    else if (P < W)
      for (let _ = P; _ < W; _ += 1)
        dt(z[_], !1);
    W = P;
    const D = ma(T - ir), A = P, O = /* @__PURE__ */ new Set();
    for (let _ = D; _ < A; _ += 1) {
      const F = z[_];
      O.add(F), ht(F, !0);
    }
    for (const _ of oe)
      O.has(_) || ht(_, !1);
    oe = O;
  }
  function mt(T, P, D) {
    const A = T.events[0];
    if (!A)
      return null;
    const O = P.player.projectReplayTimeToTimeline(T.time), _ = document.createElement("button");
    _.type = "button", _.className = "sap-tl-marker", _.style.left = Me(O.timelineTime, D), _.style.color = lr(A), _.title = hr(T), _.textContent = cr(T), _.addEventListener("click", () => {
      P.player.seek(yr(A, P));
    }), _.dataset.active = "false", _.dataset.passed = "false";
    const F = {
      element: _,
      timelineTime: O.timelineTime,
      active: !1,
      passed: !1
    };
    return B.set(T.key, F), z.push(F), _;
  }
  function Oe(T) {
    if (!g || !f)
      return;
    g.replaceChildren(), f.replaceChildren(), B.clear(), z.splice(0, z.length), W = 0, oe = /* @__PURE__ */ new Set(), H.splice(0, H.length);
    const P = gr(n, T);
    w = [], P.length > 0 && w.push({
      key: "replay",
      label: n.replayEventsLabel ?? "Replay",
      buckets: ea(P)
    }), w.push(...dr(i, T));
    const D = Math.max(T.player.getTimelineDuration(), 1e-4), A = w[0];
    if (A?.key === "replay")
      for (const _ of Xt(A.buckets)) {
        const F = mt(
          { ..._, key: `${A.key}:${_.key}` },
          T,
          D
        );
        F && g.append(F);
      }
    const O = w.filter((_) => _.key !== "replay");
    f.hidden = O.length === 0;
    for (const _ of O) {
      const F = document.createElement("div");
      F.className = "sap-tl-event-lane", F.dataset.label = _.label;
      const R = document.createElement("span");
      R.className = "sap-tl-event-lane-label", R.textContent = _.label, R.setAttribute("aria-label", _.label), F.append(R);
      const V = document.createElement("div");
      V.className = "sap-tl-event-lane-track";
      const re = document.createElement("div");
      re.className = "sap-tl-markers";
      for (const le of Xt(_.buckets)) {
        const N = mt(
          { ...le, key: `${_.key}:${le.key}` },
          T,
          D
        );
        N && re.append(N);
      }
      const Q = document.createElement("div");
      Q.className = "sap-tl-event-playhead", V.append(re, Q), H.push({ element: Q }), F.append(V), f.append(F);
    }
    z.sort((_, F) => _.timelineTime - F.timelineTime);
  }
  function Le(T) {
    if (!r)
      return;
    r.replaceChildren(), k.splice(0, k.length), L.splice(0, L.length);
    const P = ur(a, T).filter(
      (A) => Number.isFinite(A.startTime) && Number.isFinite(A.endTime) && A.endTime > A.startTime
    );
    S = pr(P);
    const D = Math.max(T.player.getTimelineDuration(), 1e-4);
    if (S.length === 0) {
      r.hidden = !0;
      return;
    }
    r.hidden = !1;
    for (const A of S) {
      const O = document.createElement("div");
      O.className = "sap-tl-range-lane";
      const _ = document.createElement("div");
      if (_.className = "sap-tl-range-lane-track", A.label) {
        O.dataset.label = A.label;
        const R = document.createElement("span");
        R.className = "sap-tl-range-lane-label", R.textContent = A.label, R.setAttribute("aria-label", A.label), O.append(R);
      }
      for (const R of A.ranges) {
        const V = T.player.projectReplayTimeToTimeline(R.startTime), re = T.player.projectReplayTimeToTimeline(R.endTime), { startTimelineTime: Q, endTimelineTime: le } = br(
          V,
          re,
          D
        ), N = document.createElement("div");
        N.className = "sap-tl-range-segment", R.className && N.classList.add(R.className), N.style.background = fr(R), N.title = R.label ?? A.label, N.dataset.active = "false", N.style.left = Me(Q, D), N.style.width = Me(
          Math.max(0, le - Q),
          D
        ), _.append(N), k.push({
          range: R,
          element: N,
          startTimelineTime: Q,
          endTimelineTime: le
        });
      }
      const F = document.createElement("div");
      F.className = "sap-tl-range-playhead", _.append(F), L.push({ element: F }), O.append(_), r.append(O);
    }
  }
  function ut() {
    b && (b = !1, o?.setAttribute("data-scrubbing", "false"), M && C?.player.play(), M = !1);
  }
  function pa() {
    if (b || (b = !0, o?.setAttribute("data-scrubbing", "true"), !e))
      return;
    const T = C?.player;
    T && (M = T.getState().playing, M && T.pause());
  }
  return {
    id: "timeline-overlay",
    addEventSource(T, P = {}) {
      return i.push({
        key: P.id ?? `events:${t++}`,
        label: P.label ?? "Events",
        source: T
      }), Fe(), () => {
        this.removeEventSource(T);
      };
    },
    removeEventSource(T) {
      const P = i.findIndex((D) => D.source === T);
      return P < 0 ? !1 : (i.splice(P, 1), Fe(), !0);
    },
    refreshEvents() {
      Fe();
    },
    addRangeSource(T) {
      return a.push(T), Re(), () => {
        this.removeRangeSource(T);
      };
    },
    removeRangeSource(T) {
      const P = a.indexOf(T);
      return P < 0 ? !1 : (a.splice(P, 1), Re(), !0);
    },
    refreshRanges() {
      Re();
    },
    setup(T) {
      C = T, er(), getComputedStyle(T.container).position === "static" && (x = !0, v = T.container.style.position, T.container.style.position = "relative"), s = document.createElement("div"), s.className = "sap-tl-root", o = document.createElement("div"), o.className = "sap-tl-shell", o.dataset.scrubbing = "false";
      const P = document.createElement("div");
      P.className = "sap-tl-topline";
      const D = document.createElement("div");
      D.className = "sap-tl-primary", c = document.createElement("button"), c.type = "button", c.className = "sap-tl-toggle sap-tl-track-toggle", d = document.createElement("span"), d.className = "sap-tl-toggle-icon", d.setAttribute("aria-hidden", "true"), d.textContent = ">", m = document.createElement("span"), m.className = "sap-tl-toggle-label", m.textContent = "Play", c.append(d, m), c.addEventListener("click", () => {
        T.player.togglePlayback();
      }), u = document.createElement("span"), u.className = "sap-tl-current", u.textContent = "0:00.00", p = document.createElement("span"), p.className = "sap-tl-remaining", p.textContent = "-0:00.00", D.append(u), P.append(D, p);
      const A = document.createElement("div");
      A.className = "sap-tl-track-wrap", r = document.createElement("div"), r.className = "sap-tl-ranges", r.hidden = !0, f = document.createElement("div"), f.className = "sap-tl-event-lanes", f.hidden = !0;
      const O = document.createElement("div");
      O.className = "sap-tl-track-rail";
      const _ = document.createElement("div");
      _.className = "sap-tl-main-rail", g = document.createElement("div"), g.className = "sap-tl-markers", l = document.createElement("input"), l.className = "sap-tl-range", l.type = "range", l.min = "0", l.max = `${T.replay.duration}`, l.step = "0.01", l.value = "0";
      const F = () => {
        pa();
      }, R = () => {
        l && T.player.seek(T.player.projectTimelineTimeToReplay(Number(l.value)));
      }, V = () => {
        ut();
      };
      l.addEventListener("pointerdown", F), l.addEventListener("input", R), l.addEventListener("change", V), window.addEventListener("pointerup", V), window.addEventListener("pointercancel", V), y = () => {
        l?.removeEventListener("pointerdown", F), l?.removeEventListener("input", R), l?.removeEventListener("change", V), window.removeEventListener("pointerup", V), window.removeEventListener("pointercancel", V);
      }, O.append(_, g, l), A.append(r, f, c, O), o.append(P, A), s.append(o), T.container.append(s), Oe(T), Le(T), ge({
        ...T,
        state: T.player.getState()
      });
    },
    onStateChange(T) {
      C = T, ge(T);
    },
    teardown(T) {
      y?.(), y = null, ut(), s?.remove(), s = null, o = null, r = null, f = null, l = null, c = null, d = null, m = null, u = null, p = null, g = null, C = null, w = [], S = [], E = null, B.clear(), z.splice(0, z.length), k.splice(0, k.length), L.splice(0, L.length), H.splice(0, H.length), W = 0, oe = /* @__PURE__ */ new Set(), x && (T.container.style.position = v, x = !1);
    }
  };
}
async function bl(n, e, t = {}) {
  return lt(n, await Be(e), t);
}
function lt(n, e, t = {}) {
  const i = new Ri(e.raw, {
    motionSmoothing: t.motionSmoothing,
    smoothingBlendFactor: t.smoothingBlendFactor,
    smoothingAnchorInterval: t.smoothingAnchorInterval,
    timelineCompaction: t.timelineCompaction,
    disableFrameFiltering: t.disableFrameFiltering
  }), a = new to(n, i, t, e.replay);
  return a.getPlugins().some((s) => s.id === "camera") || a.addPlugin(no()), a;
}
const xr = "https://ballchasing.com/api", ia = "https://ballchasing.com", wr = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function aa(n, e) {
  const i = (e instanceof URL ? e.href : e).replace(/\/+$/, "");
  return new URL(`${i}/${n.replace(/^\/+/, "")}`);
}
function vr(n) {
  const e = new Headers(n.fetchInit?.headers);
  return {
    ...n.fetchInit,
    method: n.fetchInit?.method ?? "POST",
    headers: e,
    signal: n.signal ?? n.fetchInit?.signal
  };
}
function Mr(n, e) {
  const t = n.statusText ? ` ${n.statusText}` : "", i = n.status === 401 || n.status === 403 || n.status === 404 ? ". The replay may be private, unavailable, or not downloadable without a Ballchasing session" : "";
  return `Failed to fetch Ballchasing replay from ${e.href} (${n.status}${t})${i}`;
}
function Yt(n) {
  return wr.test(n.trim());
}
function De(n) {
  const e = n.trim();
  if (Yt(e))
    return e.toLowerCase();
  let t;
  try {
    t = new URL(e);
  } catch {
    throw new Error(`Invalid Ballchasing replay id: ${n}`);
  }
  if (!/(^|\.)ballchasing\.com$/i.test(t.hostname))
    throw new Error(`Invalid Ballchasing replay URL: ${n}`);
  const i = t.pathname.split("/").filter(Boolean), a = i.findIndex((r) => r === "replay"), s = i.findIndex((r) => r === "replays"), o = a >= 0 ? i[a + 1] : s >= 0 ? i[s + 1] : void 0;
  if (!o || !Yt(o))
    throw new Error(`Invalid Ballchasing replay URL: ${n}`);
  return o.toLowerCase();
}
function xl(n) {
  return `ballchasing-${De(n)}.replay`;
}
function Tr(n, e = ia) {
  const t = De(n);
  return aa(`dl/replay/${encodeURIComponent(t)}`, e);
}
function wl(n, e = xr) {
  const t = De(n);
  return aa(`replays/${encodeURIComponent(t)}/file`, e);
}
async function Cr(n, e = {}) {
  const t = Tr(n, e.baseUrl ?? ia), i = e.fetch ?? globalThis.fetch;
  if (!i)
    throw new Error("No fetch implementation is available");
  const a = await i(t, vr(e));
  if (!a.ok)
    throw new Error(Mr(a, t));
  return new Uint8Array(await a.arrayBuffer());
}
function vl(n, e = {}) {
  const t = De(n);
  return {
    id: `ballchasing:${t}`,
    async load(i) {
      const a = await Cr(t, e);
      return ze(a, {
        useWorker: !0,
        onProgress(s) {
          i?.updateProgress({
            stage: s.stage,
            progress: s.progress,
            processedFrames: s.processedFrames,
            totalFrames: s.totalFrames
          });
        }
      });
    }
  };
}
const Sr = 250, qt = "subtr-actor-ballchasing-overlay-styles", Ke = "#3b82f6", Zt = "#f59e0b";
function _r() {
  if (document.getElementById(qt))
    return;
  const n = document.createElement("style");
  n.id = qt, n.textContent = `
    .sap-bc-overlay-root {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Segoe UI", Roboto, sans-serif;
    }

    .sap-bc-floating-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .sap-bc-floating-track {
      position: absolute;
      display: flex;
      align-items: center;
      min-width: max-content;
      transform: translate(-50%, -100%);
      will-change: transform;
    }

    .sap-bc-player-selectable {
      pointer-events: auto;
      cursor: pointer;
    }

    .sap-bc-player-selectable:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.88);
      outline-offset: 2px;
    }

    .sap-bc-floating-track[hidden] {
      display: none;
    }

    .sap-bc-floating-track.sap-bc-player-following {
      display: none;
    }

    .sap-bc-boost-bar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 8rem;
      max-width: 14rem;
      min-height: 1.7rem;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.42);
      background: rgba(6, 11, 17, 0.52);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(6px);
      transition:
        border-color 0.12s ease-out,
        box-shadow 0.12s ease-out,
        transform 0.12s ease-out;
    }

    .sap-bc-boost-bar-blue {
      background: rgba(18, 39, 68, 0.68);
      border-color: rgba(109, 169, 255, 0.5);
    }

    .sap-bc-boost-bar-orange {
      background: rgba(71, 35, 8, 0.72);
      border-color: rgba(255, 189, 110, 0.5);
    }

    .sap-bc-boost-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      border-radius: 999px;
      transition: width 0.08s ease-out;
    }

    .sap-bc-boost-fill-blue {
      background:
        linear-gradient(90deg, rgba(123, 185, 255, 0.94), rgba(59, 130, 246, 0.96));
    }

    .sap-bc-boost-fill-orange {
      background:
        linear-gradient(90deg, rgba(255, 201, 118, 0.94), rgba(245, 158, 11, 0.96));
    }

    .sap-bc-boost-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      position: relative;
      z-index: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.24rem 0.78rem;
      color: #ffffff;
      font-size: 0.82rem;
      font-weight: 800;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.75);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .sap-bc-team-hud {
      position: absolute;
      top: 0.7rem;
      display: flex;
      gap: 0.35rem;
      padding: 0.35rem 0.42rem;
      border-radius: 999px;
      background: rgba(9, 14, 21, 0.52);
      backdrop-filter: blur(8px);
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.2);
    }

    .sap-bc-team-hud-blue {
      right: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-end;
      border-bottom: 2px solid ${Ke};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${Zt};
    }

    .sap-bc-hud-player {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .sap-bc-hud-boost-bar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 5.9rem;
      max-width: 8rem;
      min-height: 1.05rem;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.26);
      background: rgba(0, 0, 0, 0.44);
      transition:
        border-color 0.12s ease-out,
        box-shadow 0.12s ease-out,
        transform 0.12s ease-out;
    }

    .sap-bc-hud-boost-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      border-radius: 999px;
      transition: width 0.08s ease-out;
    }

    .sap-bc-hud-boost-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      position: relative;
      z-index: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.14rem 0.65rem;
      color: #ffffff;
      font-size: 0.64rem;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .sap-bc-hud-player-inactive {
      opacity: 0.45;
    }

    .sap-bc-player-selectable:hover .sap-bc-boost-bar,
    .sap-bc-player-selectable:hover .sap-bc-hud-boost-bar,
    .sap-bc-player-selectable:focus-visible .sap-bc-boost-bar,
    .sap-bc-player-selectable:focus-visible .sap-bc-hud-boost-bar {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.56);
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.24);
    }

    .sap-bc-player-following .sap-bc-boost-bar,
    .sap-bc-player-following .sap-bc-hud-boost-bar {
      border-color: rgba(255, 255, 255, 0.82);
      box-shadow:
        0 0 0 2px rgba(255, 255, 255, 0.22),
        0 12px 28px rgba(0, 0, 0, 0.28);
    }

    .sap-bc-followed-hud {
      position: absolute;
      right: 1rem;
      bottom: 5.2rem;
      display: flex;
      align-items: center;
      gap: 0.72rem;
      min-width: 8.8rem;
      padding: 0.58rem 0.7rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.55rem;
      background: rgba(6, 11, 17, 0.58);
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
      backdrop-filter: blur(8px);
    }

    .sap-bc-followed-hud[hidden] {
      display: none;
    }

    .sap-bc-followed-hud-blue {
      border-color: rgba(109, 169, 255, 0.52);
    }

    .sap-bc-followed-hud-orange {
      border-color: rgba(255, 189, 110, 0.52);
    }

    .sap-bc-followed-boost-ring {
      --sap-bc-followed-boost: 0%;
      --sap-bc-followed-color: ${Ke};
      position: relative;
      display: grid;
      place-items: center;
      width: 4.1rem;
      height: 4.1rem;
      flex: 0 0 auto;
      border-radius: 50%;
      background:
        radial-gradient(circle at center, rgba(6, 11, 17, 0.95) 0 57%, transparent 58%),
        conic-gradient(
          var(--sap-bc-followed-color) var(--sap-bc-followed-boost),
          rgba(255, 255, 255, 0.16) 0
        );
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.2),
        0 10px 22px rgba(0, 0, 0, 0.22);
    }

    .sap-bc-followed-hud-blue .sap-bc-followed-boost-ring {
      --sap-bc-followed-color: ${Ke};
    }

    .sap-bc-followed-hud-orange .sap-bc-followed-boost-ring {
      --sap-bc-followed-color: ${Zt};
    }

    .sap-bc-followed-boost-value {
      color: #ffffff;
      font-size: 1.45rem;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      line-height: 1;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.72);
    }

    .sap-bc-followed-meta {
      display: flex;
      flex-direction: column;
      min-width: 0;
      color: rgba(255, 255, 255, 0.82);
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      line-height: 1.15;
      text-transform: uppercase;
    }

    .sap-bc-followed-name {
      display: block;
      max-width: 8rem;
      margin-top: 0.18rem;
      overflow: hidden;
      color: #ffffff;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0;
      text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
    }

    @media (max-width: 900px) {
      .sap-bc-team-hud {
        top: 3.25rem;
      }
    }

    @media (max-width: 640px) {
      .sap-bc-boost-bar {
        min-width: 6.7rem;
        max-width: 11rem;
        min-height: 1.2rem;
      }

      .sap-bc-boost-text {
        font-size: 0.64rem;
        padding-inline: 0.58rem;
      }

      /*
       * Team HUDs (a row of per-player boost bars on each side of center) are
       * too wide for a phone: with fixed-width bars a 3v3 roster runs off both
       * edges. Cap each HUD to its half of the viewport, anchor it tight to
       * center, and let the bars flex-shrink to share the space.
       */
      .sap-bc-team-hud {
        max-width: calc(50vw - 0.6rem);
        gap: 0.2rem;
        padding: 0.28rem 0.3rem;
      }

      .sap-bc-team-hud-blue {
        right: calc(50% + 0.3rem);
      }

      .sap-bc-team-hud-orange {
        left: calc(50% + 0.3rem);
      }

      .sap-bc-team-hud .sap-bc-hud-player {
        flex: 1 1 0;
        min-width: 0;
      }

      .sap-bc-hud-boost-bar {
        min-width: 0;
        max-width: none;
        width: 100%;
      }

      .sap-bc-hud-boost-text {
        gap: 0.2rem;
        padding-inline: 0.32rem;
        font-size: 0.58rem;
      }

      .sap-bc-followed-hud {
        right: 0.65rem;
        bottom: 4.85rem;
        min-width: 7.5rem;
        gap: 0.55rem;
        padding: 0.5rem 0.58rem;
      }

      .sap-bc-followed-boost-ring {
        width: 3.45rem;
        height: 3.45rem;
      }

      .sap-bc-followed-boost-value {
        font-size: 1.2rem;
      }

      .sap-bc-followed-name {
        max-width: 6.2rem;
        font-size: 0.68rem;
      }
    }
  `, document.head.append(n);
}
function Pr(n, e) {
  const t = n.players[e], i = t.frame?.boostAmount ?? 0, a = t.nextFrame?.boostAmount ?? i;
  return h.MathUtils.lerp(i, a, n.alpha);
}
function Er(n, e) {
  const t = n.replay.players.find((u) => u.id === e);
  if (!t)
    return null;
  const i = fe(n.replay, n.state.currentTime), a = Math.min(i + 1, n.replay.frames.length - 1), s = n.replay.frames[i], o = n.replay.frames[a] ?? s, r = s?.time ?? n.state.currentTime, l = o?.time ?? r, c = l > r ? h.MathUtils.clamp((n.state.currentTime - r) / (l - r), 0, 1) : 0, d = t.frames[i]?.boostAmount ?? 0, m = t.frames[a]?.boostAmount ?? d;
  return h.MathUtils.lerp(d, m, c);
}
function Qt(n, e, t, i) {
  if (!n || !e)
    return;
  const a = Math.max(0, Math.min(100, Math.round(hi(t))));
  n.style.width = `${a}%`, e.textContent = `${a} ${i}`;
}
function Jt(n, e, t, i) {
  if (!n)
    return;
  const a = Math.max(0, Math.min(100, Math.round(hi(e))));
  n.root.hidden = !1, n.root.classList.toggle("sap-bc-followed-hud-blue", i), n.root.classList.toggle("sap-bc-followed-hud-orange", !i), n.root.setAttribute("aria-label", `${t} boost ${a}`), n.ring.style.setProperty("--sap-bc-followed-boost", `${a}%`), n.value.textContent = `${a}`, n.name.textContent = t;
}
function ei(n, e, t, i) {
  if (!n)
    return;
  const a = () => {
    e.player.setAttachedPlayer(t);
  };
  n.classList.add("sap-bc-player-selectable"), n.tabIndex = 0, n.setAttribute("role", "button"), n.setAttribute("aria-label", `Follow ${i}`), n.title = `Follow ${i}`, n.addEventListener("click", a), n.addEventListener("keydown", (s) => {
    s.key !== "Enter" && s.key !== " " || (s.preventDefault(), a());
  });
}
function Ir(n, e, t, i, a) {
  if (n.getWorldPosition(a), a.add(e), a.project(t), a.z < -1 || a.z > 1)
    return !1;
  const s = i.clientWidth || 1, o = i.clientHeight || 1;
  return a.x = (a.x + 1) * s / 2, a.y = (1 - a.y) * o / 2, !(a.x < -80 || a.x > s + 80 || a.y < -80 || a.y > o + 80);
}
function Ml(n = {}) {
  const e = n.showFloatingNames ?? !0, t = n.showFloatingBoostBars ?? !0, i = n.showTeamBoostHud ?? !0, a = n.showFollowedPlayerHud ?? !0;
  let s = null, o = null, r = null, l = null, c = null, d = !1, m = "";
  const u = /* @__PURE__ */ new Map(), p = n.floatingLiftUu, f = new h.Vector3(), g = new h.Vector3();
  function y() {
    const M = typeof p == "function" ? p() : p;
    return typeof M == "number" && Number.isFinite(M) ? M : Sr;
  }
  function x(M) {
    for (const [C, w] of u.entries()) {
      const S = C === M;
      w.floatingRoot?.classList.toggle("sap-bc-player-following", S), w.teamHudEntry?.classList.toggle("sap-bc-player-following", S), w.floatingRoot?.setAttribute("aria-pressed", S ? "true" : "false"), w.teamHudEntry?.setAttribute("aria-pressed", S ? "true" : "false");
    }
  }
  function v(M) {
    if (!c || !M.state.attachedPlayerId) {
      c && (c.root.hidden = !0);
      return;
    }
    const C = M.replay.players.find(
      (S) => S.id === M.state.attachedPlayerId
    );
    if (!C) {
      c.root.hidden = !0;
      return;
    }
    const w = Er(M, C.id);
    if (w === null) {
      c.root.hidden = !0;
      return;
    }
    Jt(c, w, C.name, C.isTeamZero);
  }
  function b(M, C) {
    if (_r(), getComputedStyle(C).position === "static" && (d = !0, m = C.style.position, C.style.position = "relative"), s = document.createElement("div"), s.className = "sap-bc-overlay-root", e || t ? (o = document.createElement("div"), o.className = "sap-bc-floating-layer", s.append(o)) : o = null, i ? (r = document.createElement("div"), r.className = "sap-bc-team-hud sap-bc-team-hud-blue", l = document.createElement("div"), l.className = "sap-bc-team-hud sap-bc-team-hud-orange", s.append(r, l)) : (r = null, l = null), a) {
      const w = document.createElement("div");
      w.className = "sap-bc-followed-hud", w.hidden = !0;
      const S = document.createElement("div");
      S.className = "sap-bc-followed-boost-ring";
      const E = document.createElement("span");
      E.className = "sap-bc-followed-boost-value", S.append(E);
      const B = document.createElement("div");
      B.className = "sap-bc-followed-meta", B.textContent = "Boost";
      const z = document.createElement("span");
      z.className = "sap-bc-followed-name", B.append(z), w.append(S, B), s.append(w), c = {
        root: w,
        ring: S,
        value: E,
        name: z
      };
    } else
      c = null;
    for (const w of M.replay.players) {
      let S = null, E = null, B = null, z = null;
      o && (S = document.createElement("div"), S.className = "sap-bc-floating-track", S.hidden = !0, (e || t) && (E = document.createElement("div"), E.className = `sap-bc-boost-bar ${w.isTeamZero ? "sap-bc-boost-bar-blue" : "sap-bc-boost-bar-orange"}`, B = document.createElement("div"), B.className = `sap-bc-boost-fill ${w.isTeamZero ? "sap-bc-boost-fill-blue" : "sap-bc-boost-fill-orange"}`, z = document.createElement("span"), z.className = "sap-bc-boost-text", E.append(B, z), S.append(E)), ei(S, M, w.id, w.name), o.append(S));
      let k = null, L = null, H = null;
      if (i) {
        k = document.createElement("div"), k.className = "sap-bc-hud-player";
        const W = document.createElement("div");
        W.className = `sap-bc-hud-boost-bar ${w.isTeamZero ? "sap-bc-boost-bar-blue" : "sap-bc-boost-bar-orange"}`, L = document.createElement("div"), L.className = `sap-bc-hud-boost-fill ${w.isTeamZero ? "sap-bc-boost-fill-blue" : "sap-bc-boost-fill-orange"}`, H = document.createElement("span"), H.className = "sap-bc-hud-boost-text", W.append(L, H), k.append(W), ei(k, M, w.id, w.name), (w.isTeamZero ? r : l)?.append(k);
      }
      u.set(w.id, {
        floatingRoot: S,
        floatingBoostFill: B,
        floatingBoostText: z,
        teamHudEntry: k,
        teamHudFill: L,
        teamHudText: H
      });
    }
    C.append(s), x(M.player.getState().attachedPlayerId), v({ ...M, state: M.player.getState() });
  }
  return {
    id: "ballchasing-overlay",
    setup(M) {
      b(M, M.container);
    },
    onStateChange(M) {
      x(M.state.attachedPlayerId), v(M);
    },
    teardown(M) {
      s?.remove(), s = null, o = null, r = null, l = null, c = null, u.clear(), d && (M.container.style.position = m, d = !1);
    },
    beforeRender(M) {
      if (!s)
        return;
      g.copy(M.scene.camera.up).normalize().multiplyScalar(y() * (M.options.fieldScale ?? 1));
      let C = !1;
      for (const [w, S] of M.players.entries()) {
        const E = u.get(S.track.id);
        if (!E)
          continue;
        const B = Pr(M, w), z = E.floatingRoot?.classList.contains("sap-bc-player-following") ?? !1;
        z && (Jt(c, B, S.track.name, S.track.isTeamZero), C = !0), Qt(
          E.floatingBoostFill,
          E.floatingBoostText,
          B,
          S.track.name
        ), Qt(E.teamHudFill, E.teamHudText, B, S.track.name);
        const k = S.mesh, L = k !== null && S.interpolatedPosition !== null;
        if (E.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive", !L), !!E.floatingRoot) {
          if (z || !L || !Ir(
            k,
            g,
            M.scene.camera,
            M.container,
            f
          )) {
            E.floatingRoot.hidden = !0;
            continue;
          }
          E.floatingRoot.hidden = !1, E.floatingRoot.style.transform = `translate(${f.x.toFixed(1)}px, ${f.y.toFixed(1)}px) translate(-50%, -100%)`;
        }
      }
      !C && c && (c.root.hidden = !0);
    }
  };
}
function Z(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n);
}
function ct(n) {
  return Z(n);
}
function ti(n, e) {
  if (!Z(n))
    throw new Error(`${e} must be an object`);
  const t = n.kind, i = n.value;
  if (t !== "frame" && t !== "time")
    throw new Error(`${e}.kind must be "frame" or "time"`);
  if (typeof i != "number" || !Number.isFinite(i))
    throw new Error(`${e}.value must be a finite number`);
  return {
    kind: t,
    value: i
  };
}
function Ar(n, e) {
  const t = `manifest.replays[${e}]`;
  if (!Z(n))
    throw new Error(`${t} must be an object`);
  if (typeof n.id != "string" || n.id.trim() === "")
    throw new Error(`${t}.id must be a non-empty string`);
  if (n.path !== void 0 && typeof n.path != "string")
    throw new Error(`${t}.path must be a string when provided`);
  if (n.label !== void 0 && typeof n.label != "string")
    throw new Error(`${t}.label must be a string when provided`);
  if (n.meta !== void 0 && !ct(n.meta))
    throw new Error(`${t}.meta must be an object when provided`);
  const i = typeof n.path == "string" ? n.path : "";
  return {
    id: n.id,
    path: i,
    label: typeof n.label == "string" ? n.label : n.id,
    locator: Br(n.locator, `${t}.locator`, i),
    meta: n.meta ?? {}
  };
}
function zr(n, e) {
  const t = `manifest.items[${e}]`;
  if (!Z(n))
    throw new Error(`${t} must be an object`);
  if (typeof n.replay != "string" || n.replay.trim() === "")
    throw new Error(`${t}.replay must be a non-empty string`);
  if (n.label !== void 0 && typeof n.label != "string")
    throw new Error(`${t}.label must be a string when provided`);
  if (n.meta !== void 0 && !ct(n.meta))
    throw new Error(`${t}.meta must be an object when provided`);
  return {
    id: typeof n.id == "string" && n.id.trim() !== "" ? n.id : `${n.replay}:${e}`,
    replay: n.replay,
    start: ti(n.start, `${t}.start`),
    end: ti(n.end, `${t}.end`),
    label: typeof n.label == "string" ? n.label : "",
    meta: n.meta ?? {}
  };
}
function Br(n, e, t) {
  if (n === void 0)
    return t ? { kind: "path", path: t } : { kind: "inline" };
  if (!Z(n))
    throw new Error(`${e} must be an object when provided`);
  if (typeof n.kind != "string" || n.kind.trim() === "")
    throw new Error(`${e}.kind must be a non-empty string`);
  if (n.id !== void 0 && typeof n.id != "string")
    throw new Error(`${e}.id must be a string when provided`);
  if (n.path !== void 0 && typeof n.path != "string")
    throw new Error(`${e}.path must be a string when provided`);
  if (n.cachePath !== void 0 && typeof n.cachePath != "string")
    throw new Error(`${e}.cachePath must be a string when provided`);
  return {
    kind: n.kind,
    id: n.id,
    path: n.path,
    cachePath: n.cachePath
  };
}
function Dr(n) {
  if (!Z(n))
    throw new Error("manifest.playback must be an object");
  if (n.advanceMode !== void 0 && n.advanceMode !== "auto" && n.advanceMode !== "manual")
    throw new Error('manifest.playback.advanceMode must be "auto" or "manual"');
  if (n.endMode !== void 0 && n.endMode !== "stop" && n.endMode !== "loop")
    throw new Error('manifest.playback.endMode must be "stop" or "loop"');
  if (n.advanceOnEnd !== void 0 && typeof n.advanceOnEnd != "boolean")
    throw new Error("manifest.playback.advanceOnEnd must be a boolean");
  return {
    advanceMode: n.advanceMode ?? (n.advanceOnEnd === !0 ? "auto" : "manual"),
    endMode: n.endMode ?? "stop"
  };
}
function Te(n, e) {
  if (n != null) {
    if (typeof n != "number" || !Number.isInteger(n) || !Number.isFinite(n) || n < 0)
      throw new Error(`${e} must be a non-negative integer when provided`);
    return n;
  }
}
function ii(n, e) {
  if (n != null) {
    if (typeof n != "string")
      throw new Error(`${e} must be a string when provided`);
    return n;
  }
}
function kr(n) {
  if (!Z(n))
    throw new Error("manifest.page must be an object when provided");
  return {
    next: ii(n.next, "manifest.page.next"),
    previous: ii(n.previous, "manifest.page.previous"),
    total: Te(n.total, "manifest.page.total"),
    count: Te(n.count, "manifest.page.count"),
    limit: Te(n.limit, "manifest.page.limit"),
    offset: Te(n.offset, "manifest.page.offset")
  };
}
function Fr(n) {
  if (!Z(n))
    throw new Error("manifest must be an object");
  if (!Array.isArray(n.items))
    throw new Error("manifest.items must be an array");
  if (n.replays !== void 0 && !Array.isArray(n.replays))
    throw new Error("manifest.replays must be an array when provided");
  if (n.label !== void 0 && typeof n.label != "string")
    throw new Error("manifest.label must be a string when provided");
  if (n.meta !== void 0 && !ct(n.meta))
    throw new Error("manifest.meta must be an object when provided");
  const e = n.playback === void 0 ? { advanceMode: "manual", endMode: "stop" } : Dr(n.playback);
  return {
    version: typeof n.version == "number" ? n.version : 1,
    kind: typeof n.kind == "string" ? n.kind : "playlist",
    replays: (n.replays ?? []).map(Ar),
    items: n.items.map(zr),
    label: typeof n.label == "string" ? n.label : "Playlist",
    page: n.page === void 0 ? void 0 : kr(n.page),
    meta: n.meta ?? {},
    playback: e
  };
}
async function Tl(n) {
  const e = await n.text();
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw new Error(
      `Failed to parse playlist manifest JSON: ${i instanceof Error ? i.message : String(i)}`
    );
  }
  return Fr(t);
}
function Cl(n, e) {
  const t = new Map(
    (n.replays ?? []).map((i) => [i.id, i])
  );
  return n.items.map((i) => {
    const a = t.get(i.replay);
    return {
      replay: e({
        replayId: i.replay,
        replay: a
      }),
      start: i.start,
      end: i.end,
      label: i.label || a?.label,
      meta: i.meta
    };
  });
}
function Rr(n) {
  return typeof n != "string";
}
function ai(n, e, t) {
  return Math.min(Math.max(n, e), t);
}
function na(n) {
  return n instanceof Error ? n.message : "Failed to load replay";
}
function sa(n) {
  return n.preloadPolicy ? n.preloadPolicy : n.preloadRadius !== void 0 ? {
    kind: "adjacent",
    ahead: n.preloadRadius,
    behind: n.preloadRadius
  } : {
    kind: "adjacent",
    ahead: 1,
    behind: 1
  };
}
function oa(n) {
  return n.advanceMode ? n.advanceMode : n.advanceOnEnd === !1 ? "manual" : "auto";
}
function ra(n) {
  return n.endMode ?? "stop";
}
function Je(n) {
  const e = [], t = /* @__PURE__ */ new Set();
  for (const i of n)
    t.has(i.replay.id) || (t.add(i.replay.id), e.push(i.replay));
  return e;
}
function ni(n, e, t, i, a) {
  const s = [], o = /* @__PURE__ */ new Set([a]);
  for (let r = e + t; r >= 0 && r < n.length && s.length < Math.max(0, i); r += t) {
    const l = n[r]?.replay;
    !l || o.has(l.id) || (o.add(l.id), s.push(l));
  }
  return s;
}
function la(n, e, t) {
  const i = n[e];
  if (!i)
    return [];
  if (t.kind === "none")
    return [];
  if (t.kind === "all")
    return Je(n).filter((l) => l.id !== i.replay.id);
  if (t.kind === "adjacent") {
    const l = ni(
      n,
      e,
      -1,
      t.behind ?? 0,
      i.replay.id
    ), c = ni(
      n,
      e,
      1,
      t.ahead,
      i.replay.id
    );
    return [...l, ...c];
  }
  const a = {
    items: n,
    currentIndex: e,
    currentItem: i
  }, s = /* @__PURE__ */ new Set([i.replay.id]), o = [], r = new Map(
    Je(n).map((l) => [l.id, l])
  );
  for (const l of t.pick(a)) {
    const c = Rr(l) ? l : r.get(l);
    !c || s.has(c.id) || (s.add(c.id), o.push(c));
  }
  return o;
}
function Sl(n) {
  return { kind: "frame", value: n };
}
function si(n) {
  return { kind: "time", value: n };
}
function ke(n, e) {
  return { id: n, load: e };
}
function Or(n, e) {
  return ke(n, async () => e);
}
function _l(n, e) {
  return ke(n, async () => ze(e, { useWorker: !0 }));
}
function Pl(n, e = n.webkitRelativePath || n.name) {
  return ke(e, async () => {
    const t = new Uint8Array(await n.arrayBuffer());
    return ze(t, { useWorker: !0 });
  });
}
function El(n, e, t = n) {
  return ke(t, async (i) => e(n, i));
}
function Lr(n, e = {}) {
  return {
    replay: n,
    start: si(0),
    end: si(Number.POSITIVE_INFINITY),
    label: e.label,
    meta: e.meta
  };
}
class ca {
  cache = /* @__PURE__ */ new Map();
  states = /* @__PURE__ */ new Map();
  listeners = /* @__PURE__ */ new Set();
  load(e) {
    const t = this.cache.get(e.id);
    if (t)
      return t;
    this.setSourceState(e.id, {
      status: "loading",
      progress: null,
      error: null,
      startedAt: Date.now(),
      completedAt: null
    });
    const i = {
      sourceId: e.id,
      updateProgress: (s) => this.updateProgress(e.id, s)
    }, a = Promise.resolve().then(() => e.load(i)).then((s) => (this.setSourceState(e.id, {
      status: "loaded",
      progress: null,
      error: null,
      completedAt: Date.now()
    }), s)).catch((s) => {
      throw this.cache.delete(e.id), this.setSourceState(e.id, {
        status: "error",
        error: na(s),
        completedAt: Date.now()
      }), s;
    });
    return this.cache.set(e.id, a), a;
  }
  preload(e) {
    for (const t of e)
      this.load(t).catch(() => {
      });
  }
  has(e) {
    return this.cache.has(typeof e == "string" ? e : e.id);
  }
  delete(e) {
    const t = typeof e == "string" ? e : e.id, i = this.cache.delete(t);
    return i && (this.states.delete(t), this.emitChange()), i;
  }
  clear() {
    this.cache.clear(), this.states.size > 0 && (this.states.clear(), this.emitChange());
  }
  getState(e) {
    const t = typeof e == "string" ? e : e.id;
    return this.states.get(t) ?? {
      sourceId: t,
      status: "idle",
      progress: null,
      error: null,
      startedAt: null,
      updatedAt: null,
      completedAt: null
    };
  }
  getStates() {
    return Array.from(this.states.values());
  }
  subscribe(e) {
    return this.listeners.add(e), () => {
      this.listeners.delete(e);
    };
  }
  updateProgress(e, t) {
    const i = this.getState(e);
    this.setSourceState(e, {
      status: i.status === "idle" ? "loading" : i.status,
      progress: t,
      updatedAt: Date.now()
    });
  }
  setSourceState(e, t) {
    const i = this.getState(e);
    this.states.set(e, {
      ...i,
      ...t,
      sourceId: e,
      updatedAt: t.updatedAt ?? Date.now()
    }), this.emitChange();
  }
  emitChange() {
    for (const e of this.listeners)
      e();
  }
}
class Il {
  items;
  loadCache;
  currentItemIndex = 0;
  pendingItemIndex = null;
  loading = !1;
  error = null;
  currentLoaded = null;
  disposed = !1;
  loadGeneration = 0;
  pendingLoad = Promise.resolve();
  playlistEnded = !1;
  listeners = /* @__PURE__ */ new Set();
  preloadPolicy;
  advanceMode;
  endMode;
  constructor(e, t = {}) {
    this.items = e, this.loadCache = t.loadCache ?? new ca(), this.preloadPolicy = sa(t), this.advanceMode = oa(t), this.endMode = ra(t), e.length > 0 && (this.currentItemIndex = ai(t.initialItemIndex ?? 0, 0, e.length - 1), this.pendingLoad = this.loadItem(this.currentItemIndex));
  }
  async waitForCurrentItem() {
    await this.pendingLoad;
  }
  async setCurrentItemIndex(e) {
    this.pendingLoad = this.loadItem(e), await this.pendingLoad;
  }
  async next() {
    const e = this.pendingItemIndex ?? this.currentItemIndex;
    return e >= this.items.length - 1 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(0), !0) : !1 : (await this.setCurrentItemIndex(e + 1), !0);
  }
  async previous() {
    const e = this.pendingItemIndex ?? this.currentItemIndex;
    return e <= 0 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(this.items.length - 1), !0) : !1 : (await this.setCurrentItemIndex(e - 1), !0);
  }
  async completeCurrentItem() {
    if (this.advanceMode !== "auto")
      return this.playlistEnded = this.currentItemIndex >= this.items.length - 1, this.emitChange(), !1;
    const e = await this.next();
    return this.playlistEnded = !e && this.currentItemIndex >= this.items.length - 1, this.emitChange(), e;
  }
  setAdvanceMode(e) {
    this.advanceMode = e, this.emitChange();
  }
  setEndMode(e) {
    this.endMode = e, this.playlistEnded = !1, this.emitChange();
  }
  getCurrentLoaded() {
    return this.currentLoaded;
  }
  getState() {
    const e = this.pendingItemIndex ?? this.currentItemIndex;
    return {
      ready: this.currentLoaded !== null && !this.loading && this.error === null,
      loading: this.loading,
      error: this.error,
      itemIndex: e,
      itemCount: this.items.length,
      item: this.items[e] ?? null,
      loaded: this.currentLoaded,
      advanceMode: this.advanceMode,
      endMode: this.endMode,
      playlistEnded: this.playlistEnded
    };
  }
  subscribe(e) {
    return this.listeners.add(e), e(this.getState()), () => {
      this.listeners.delete(e);
    };
  }
  destroy() {
    this.disposed = !0, this.listeners.clear();
  }
  dispose() {
    this.destroy();
  }
  async loadItem(e) {
    if (this.items.length === 0)
      return;
    const t = ai(e, 0, this.items.length - 1), i = ++this.loadGeneration, a = this.items[t];
    this.pendingItemIndex = t, this.loading = !0, this.error = null, this.playlistEnded = !1, this.emitChange();
    try {
      const s = await this.loadCache.load(a.replay);
      if (this.disposed || i !== this.loadGeneration)
        return;
      this.currentItemIndex = t, this.pendingItemIndex = null, this.currentLoaded = s, this.loading = !1, this.error = null, this.loadCache.preload(la(this.items, t, this.preloadPolicy)), this.emitChange();
    } catch (s) {
      if (this.disposed || i !== this.loadGeneration)
        return;
      throw this.pendingItemIndex = null, this.loading = !1, this.error = na(s), this.currentLoaded = null, this.emitChange(), s;
    }
  }
  emitChange() {
    const e = this.getState();
    for (const t of this.listeners)
      t(e);
  }
}
const Vr = 2.25, Nr = 1, Xe = 1e-4;
function ne(n, e, t) {
  return Math.min(Math.max(n, e), t);
}
function Gr(n, e) {
  if (n.frames.length === 0)
    return 0;
  const t = n.frames.length - 1;
  return ne(Math.round(e), 0, t);
}
function $r(n) {
  return n instanceof Error ? n.message : "Failed to load replay";
}
function te(n) {
  return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}
function ha(n) {
  if (!n)
    return null;
  const e = {}, t = te(n.fov), i = te(n.height), a = te(n.pitch), s = te(n.distance), o = te(n.stiffness), r = te(n.swivelSpeed), l = te(n.transitionSpeed);
  return t !== void 0 && (e.fov = t), i !== void 0 && (e.height = i), a !== void 0 && (e.pitch = a), s !== void 0 && (e.distance = s), o !== void 0 && (e.stiffness = o), r !== void 0 && (e.swivelSpeed = r), l !== void 0 && (e.transitionSpeed = l), e;
}
function oi(n, e) {
  if (e.kind === "frame") {
    const i = Gr(n, e.value);
    return {
      frameIndex: i,
      time: n.frames[i]?.time ?? 0
    };
  }
  const t = ne(e.value, 0, n.duration);
  return {
    frameIndex: fe(n, t),
    time: t
  };
}
function Hr(n, e, t) {
  if (t.time < e.time) {
    const i = n.label ? ` "${n.label}"` : "";
    throw new Error(`Playlist item${i} ends before it starts`);
  }
}
function Wr(n) {
  return {
    speed: Math.max(0.1, n.initialPlaybackRate ?? Nr),
    cameraDistanceScale: Math.max(
      0.25,
      n.initialCameraDistanceScale ?? Vr
    ),
    customCameraSettings: ha(n.initialCustomCameraSettings),
    cameraViewMode: n.initialCameraViewMode ?? (n.initialAttachedPlayerId ? "follow" : "free"),
    attachedPlayerId: n.initialAttachedPlayerId ?? null,
    ballCamEnabled: n.initialBallCamEnabled ?? !1,
    boostPickupAnimationEnabled: n.initialBoostPickupAnimationEnabled ?? !0,
    hitboxWireframesEnabled: n.initialHitboxWireframesEnabled ?? !1,
    hitboxOnlyModeEnabled: n.initialHitboxOnlyModeEnabled ?? !1,
    skipPostGoalTransitionsEnabled: n.initialSkipPostGoalTransitionsEnabled ?? !0,
    skipKickoffsEnabled: n.initialSkipKickoffsEnabled ?? !1
  };
}
function Ur(n, e) {
  const t = oi(e.replay, n.start), i = oi(e.replay, n.end);
  return Hr(n, t, i), {
    source: n,
    replay: e,
    start: t,
    end: i,
    duration: Math.max(0, i.time - t.time)
  };
}
class et extends EventTarget {
  container;
  items;
  options;
  player = null;
  playerUnsubscribe = null;
  currentResolvedItem = null;
  currentItemIndex = 0;
  pendingItemIndex = null;
  loading = !1;
  error = null;
  disposed = !1;
  playbackIntent;
  loadGeneration = 0;
  boundaryGuard = !1;
  pendingLoad = Promise.resolve();
  replayCache = new ca();
  replayCacheUnsubscribe = null;
  preferences;
  preloadPolicy;
  advanceMode;
  endMode;
  static fromReplay(e, t, i = {}) {
    return et.fromReplaySource(
      e,
      Or(i.replayId ?? "replay", t),
      i
    );
  }
  static fromReplaySource(e, t, i = {}) {
    return new et(
      e,
      [
        Lr(t, {
          label: i.itemLabel,
          meta: i.itemMeta
        })
      ],
      i
    );
  }
  constructor(e, t, i = {}) {
    if (super(), this.container = e, this.items = t, this.options = i, this.preferences = Wr(i), this.preloadPolicy = sa(i), this.advanceMode = oa(i), this.endMode = ra(i), this.playbackIntent = i.autoplay ?? !1, this.replayCacheUnsubscribe = this.replayCache.subscribe(() => {
      this.emitChange();
    }), t.length > 0) {
      const a = ne(i.initialItemIndex ?? 0, 0, t.length - 1);
      this.pendingLoad = this.loadItem(a);
      return;
    }
    this.emitChange();
  }
  async waitForCurrentItem() {
    await this.pendingLoad;
  }
  async setCurrentItemIndex(e) {
    this.pendingLoad = this.loadItem(e), await this.pendingLoad;
  }
  async next() {
    const e = this.pendingItemIndex ?? this.currentItemIndex;
    return e >= this.items.length - 1 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(0), !0) : !1 : (await this.setCurrentItemIndex(e + 1), !0);
  }
  async previous() {
    const e = this.pendingItemIndex ?? this.currentItemIndex;
    return e <= 0 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(this.items.length - 1), !0) : !1 : (await this.setCurrentItemIndex(e - 1), !0);
  }
  play() {
    this.playbackIntent = !0, this.player?.play(), this.emitChange();
  }
  pause() {
    this.playbackIntent = !1, this.player?.pause(), this.emitChange();
  }
  togglePlayback() {
    this.player?.getState().playing ? this.pause() : this.play();
  }
  seek(e) {
    if (!this.player || !this.currentResolvedItem)
      return;
    const t = ne(
      this.currentResolvedItem.start.time + e,
      this.currentResolvedItem.start.time,
      this.currentResolvedItem.end.time
    );
    this.player.seek(t);
  }
  setReplayFrameIndex(e) {
    return this.player ? (this.playbackIntent = !1, this.player.setFrameIndex(e), this.emitChange(), !0) : !1;
  }
  stepFrames(e) {
    return !this.player || !Number.isFinite(e) ? !1 : (this.playbackIntent = !1, this.player.stepFrames(e), this.emitChange(), !0);
  }
  stepForwardFrame() {
    return this.stepFrames(1);
  }
  stepBackwardFrame() {
    return this.stepFrames(-1);
  }
  setPlaybackRate(e) {
    this.preferences.speed = Math.max(0.1, e), this.player?.setPlaybackRate(this.preferences.speed), this.emitChange();
  }
  setCameraDistanceScale(e) {
    this.preferences.cameraDistanceScale = Math.max(0.25, e), this.player?.setCameraDistanceScale(this.preferences.cameraDistanceScale), this.emitChange();
  }
  setCustomCameraSettings(e) {
    this.preferences.customCameraSettings = ha(e), this.player?.setCustomCameraSettings(this.preferences.customCameraSettings), this.emitChange();
  }
  setCameraViewMode(e) {
    this.preferences.cameraViewMode = e, this.player?.setCameraViewMode(e), this.emitChange();
  }
  setFreeCameraPreset(e) {
    this.preferences.cameraViewMode = "free", this.player?.setFreeCameraPreset(e), this.emitChange();
  }
  setAttachedPlayer(e) {
    this.preferences.attachedPlayerId = e, this.preferences.cameraViewMode = e ? "follow" : "free", this.player?.setAttachedPlayer(e), this.emitChange();
  }
  setBallCamEnabled(e) {
    this.preferences.ballCamEnabled = e, this.player?.setBallCamEnabled(e), this.emitChange();
  }
  setBoostPickupAnimationEnabled(e) {
    this.preferences.boostPickupAnimationEnabled = e, this.player?.setBoostPickupAnimationEnabled(e), this.emitChange();
  }
  setHitboxWireframesEnabled(e) {
    this.preferences.hitboxWireframesEnabled = e, this.player?.setHitboxWireframesEnabled(e), this.emitChange();
  }
  setHitboxOnlyModeEnabled(e) {
    this.preferences.hitboxOnlyModeEnabled = e, this.player?.setHitboxOnlyModeEnabled(e), this.emitChange();
  }
  setSkipPostGoalTransitionsEnabled(e) {
    this.preferences.skipPostGoalTransitionsEnabled = e, this.player?.setSkipPostGoalTransitionsEnabled(e), this.emitChange();
  }
  setSkipKickoffsEnabled(e) {
    this.preferences.skipKickoffsEnabled = e, this.player?.setSkipKickoffsEnabled(e), this.emitChange();
  }
  setAdvanceMode(e) {
    this.advanceMode = e, this.emitChange();
  }
  setEndMode(e) {
    this.endMode = e, this.emitChange();
  }
  getState() {
    const e = this.player?.getState() ?? null, t = this.pendingItemIndex ?? this.currentItemIndex, i = this.items[t] ?? null, a = e?.currentTime ?? 0, s = e?.duration ?? this.currentResolvedItem?.replay.replay.duration ?? 0, o = this.currentResolvedItem?.start.time ?? 0, r = this.currentResolvedItem?.duration ?? 0, l = ne(a - o, 0, r), c = this.currentResolvedItem !== null && l >= r - Xe;
    return {
      ready: this.currentResolvedItem !== null && !this.loading && this.error === null,
      loading: this.loading,
      error: this.error,
      replayLoadStates: this.getReplayLoadStates(),
      itemIndex: t,
      itemCount: this.items.length,
      item: i,
      advanceMode: this.advanceMode,
      endMode: this.endMode,
      itemEnded: c,
      playlistEnded: c && t >= this.items.length - 1,
      currentTime: l,
      duration: r,
      replayCurrentTime: a,
      replayDuration: s,
      frameIndex: e?.frameIndex ?? this.currentResolvedItem?.start.frameIndex ?? 0,
      activeMetadata: e?.activeMetadata ?? null,
      playing: e?.playing ?? !1,
      speed: e?.speed ?? this.preferences.speed,
      cameraDistanceScale: e?.cameraDistanceScale ?? this.preferences.cameraDistanceScale,
      customCameraSettings: e?.customCameraSettings ?? this.preferences.customCameraSettings,
      cameraViewMode: e?.cameraViewMode ?? this.preferences.cameraViewMode,
      attachedPlayerId: e?.attachedPlayerId ?? this.preferences.attachedPlayerId,
      ballCamEnabled: e?.ballCamEnabled ?? this.preferences.ballCamEnabled,
      boostPickupAnimationEnabled: e?.boostPickupAnimationEnabled ?? this.preferences.boostPickupAnimationEnabled,
      hitboxWireframesEnabled: e?.hitboxWireframesEnabled ?? this.preferences.hitboxWireframesEnabled,
      hitboxOnlyModeEnabled: e?.hitboxOnlyModeEnabled ?? this.preferences.hitboxOnlyModeEnabled,
      skipPostGoalTransitionsEnabled: e?.skipPostGoalTransitionsEnabled ?? this.preferences.skipPostGoalTransitionsEnabled,
      skipKickoffsEnabled: e?.skipKickoffsEnabled ?? this.preferences.skipKickoffsEnabled
    };
  }
  getSnapshot() {
    return this.getState();
  }
  getCurrentReplay() {
    return this.currentResolvedItem?.replay ?? null;
  }
  getCurrentPlayer() {
    return this.player;
  }
  getCurrentResolvedItem() {
    return this.currentResolvedItem;
  }
  subscribe(e) {
    const t = (i) => {
      e(i.detail);
    };
    return this.addEventListener("change", t), e(this.getState()), () => {
      this.removeEventListener("change", t);
    };
  }
  destroy() {
    this.disposed = !0, this.replayCacheUnsubscribe?.(), this.replayCacheUnsubscribe = null, this.detachPlayer(), this.replayCache.clear();
  }
  dispose() {
    this.destroy();
  }
  async loadItem(e) {
    if (this.items.length === 0)
      return;
    const t = ne(e, 0, this.items.length - 1), i = ++this.loadGeneration, a = this.items[t];
    this.pendingItemIndex = t, this.loading = !0, this.error = null, this.emitChange();
    try {
      const s = this.loadReplaySource(a.replay);
      this.prefetchNearbyReplays(t);
      const o = await s;
      if (this.disposed || i !== this.loadGeneration)
        return;
      const r = Ur(a, o);
      if (this.currentItemIndex = t, this.pendingItemIndex = null, this.currentResolvedItem = r, !await this.attachPlayer(r, i) || this.disposed || i !== this.loadGeneration)
        return;
      this.loading = !1, this.error = null, this.prefetchNearbyReplays(t), this.emitChange();
    } catch (s) {
      if (this.disposed || i !== this.loadGeneration)
        return;
      throw this.playbackIntent = !1, this.pendingItemIndex = null, this.loading = !1, this.error = $r(s), this.detachPlayer(), this.currentResolvedItem = null, this.emitChange(), s;
    }
  }
  loadReplaySource(e) {
    return this.replayCache.load(e);
  }
  prefetchNearbyReplays(e) {
    this.replayCache.preload(la(this.items, e, this.preloadPolicy));
  }
  getReplayLoadStates() {
    return Je(this.items).map((e) => this.replayCache.getState(e));
  }
  async attachPlayer(e, t) {
    const i = e.replay, { replay: a, raw: s } = i;
    if (!s)
      throw new Error(
        "ReplayPlaylistPlayer requires LoadedReplay.raw; load replays with loadReplayFromBytes, createReplayBytesSource, or createReplayFileSource."
      );
    const o = a.players.some(
      (l) => l.id === this.preferences.attachedPlayerId
    ) ? this.preferences.attachedPlayerId : null;
    if (this.preferences.attachedPlayerId = o, o === null && this.preferences.cameraViewMode === "follow" && (this.preferences.cameraViewMode = "free"), this.player) {
      const l = new Ri(s, {
        motionSmoothing: this.options.motionSmoothing,
        smoothingBlendFactor: this.options.smoothingBlendFactor,
        smoothingAnchorInterval: this.options.smoothingAnchorInterval,
        timelineCompaction: this.options.timelineCompaction,
        disableFrameFiltering: this.options.disableFrameFiltering
      });
      return await this.player.replaceReplay(l, a, {
        currentTime: e.start.time,
        preservePlayback: this.playbackIntent
      }), !(this.disposed || t !== this.loadGeneration);
    }
    const r = lt(
      this.container,
      { replay: a, raw: s },
      {
        initialPlaybackRate: this.preferences.speed,
        initialCameraDistanceScale: this.preferences.cameraDistanceScale,
        initialCustomCameraSettings: this.preferences.customCameraSettings,
        initialCameraViewMode: this.preferences.cameraViewMode,
        initialAttachedPlayerId: o,
        initialBallCamEnabled: this.preferences.ballCamEnabled,
        initialBoostPickupAnimationEnabled: this.preferences.boostPickupAnimationEnabled,
        initialHitboxWireframesEnabled: this.preferences.hitboxWireframesEnabled,
        initialHitboxOnlyModeEnabled: this.preferences.hitboxOnlyModeEnabled,
        initialSkipPostGoalTransitionsEnabled: this.preferences.skipPostGoalTransitionsEnabled,
        initialSkipKickoffsEnabled: this.preferences.skipKickoffsEnabled,
        plugins: this.options.plugins
      }
    );
    r.seek(e.start.time);
    try {
      await r.ready;
    } catch (l) {
      throw r.destroy(), l;
    }
    return this.disposed || t !== this.loadGeneration ? (r.destroy(), !1) : (this.detachPlayer(), this.player = r, this.playerUnsubscribe = r.subscribe((l) => {
      this.handlePlayerState(l);
    }), this.playbackIntent && r.play(), !0);
  }
  detachPlayer() {
    this.playerUnsubscribe?.(), this.playerUnsubscribe = null, this.player?.destroy(), this.player = null;
  }
  handlePlayerState(e) {
    if (!this.currentResolvedItem || this.boundaryGuard) {
      this.emitChange();
      return;
    }
    const t = this.currentResolvedItem.end.time;
    if (e.playing && e.currentTime >= t - Xe) {
      this.boundaryGuard = !0, this.advanceMode === "auto" && this.playbackIntent ? this.currentItemIndex < this.items.length - 1 ? this.setCurrentItemIndex(this.currentItemIndex + 1) : this.endMode === "loop" && this.items.length > 0 ? this.setCurrentItemIndex(0) : (this.playbackIntent = !1, this.player?.setState({ currentTime: t, playing: !1 })) : (this.playbackIntent = !1, this.player?.setState({ currentTime: t, playing: !1 })), this.boundaryGuard = !1, this.emitChange();
      return;
    }
    if (e.currentTime > t + Xe) {
      this.boundaryGuard = !0, this.player?.setState({ currentTime: t, playing: !1 }), this.playbackIntent = !1, this.boundaryGuard = !1, this.emitChange();
      return;
    }
    this.emitChange();
  }
  emitChange() {
    this.dispatchEvent(new CustomEvent("change", { detail: this.getState() }));
  }
}
const ri = "subtr-actor-replay-load-overlay-styles";
function jr() {
  if (document.getElementById(ri))
    return;
  const n = document.createElement("style");
  n.id = ri, n.textContent = `
    .sap-load-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 50%),
        rgba(10, 15, 26, 0.72);
      backdrop-filter: blur(8px);
      z-index: 40;
      pointer-events: none;
    }

    .sap-load-overlay__panel {
      width: min(360px, 100%);
      padding: 18px 20px;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 16px;
      background: rgba(8, 12, 20, 0.88);
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      color: #f5f7fb;
      font: 500 14px/1.4 "IBM Plex Sans", "Avenir Next", sans-serif;
      letter-spacing: 0.01em;
    }

    .sap-load-overlay__title {
      margin: 0 0 10px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.64);
    }

    .sap-load-overlay__status {
      margin: 0 0 12px;
      font-size: 15px;
      color: #ffffff;
    }

    .sap-load-overlay__bar {
      overflow: hidden;
      height: 8px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
    }

    .sap-load-overlay__fill {
      width: 0%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #58c4dd 0%, #f4b860 100%);
      transition: width 120ms linear;
    }

    .sap-load-overlay__meta {
      margin-top: 10px;
      font-size: 12px;
      color: rgba(255,255,255,0.6);
    }

    .sap-load-overlay__panel[data-state="error"] .sap-load-overlay__fill {
      background: linear-gradient(90deg, #ff6b6b 0%, #ff9b6b 100%);
      width: 100% !important;
    }
  `, document.head.append(n);
}
function Kr(n) {
  const e = n.progress === void 0 ? null : Math.round(n.progress * 100);
  return n.stage === "processing" ? e === null || n.totalFrames === void 0 ? "Processing replay frames..." : `Processing replay frames... ${e}% (${n.processedFrames ?? 0}/${n.totalFrames})` : n.stage === "validating" ? "Validating replay..." : n.stage === "normalizing" ? e !== null ? `Normalizing replay data... ${e}%` : "Normalizing replay data..." : "Loading replay...";
}
function Xr(n) {
  const e = n.progress ?? 0;
  return n.stage === "processing" ? n.totalFrames !== void 0 ? n.processedFrames === void 0 ? `${n.totalFrames} frames` : `${n.processedFrames}/${n.totalFrames} frames` : "Extracting frame data" : n.stage === "validating" ? "Checking replay file" : n.stage === "normalizing" ? e < 0.45 ? "Decoding structured replay data" : e < 0.65 ? "Parsing frame data" : e < 1 ? "Building playback model" : "Playback model ready" : n.stage;
}
function Al(n, e = {}) {
  jr();
  let t = null;
  getComputedStyle(n).position === "static" && (t = n.style.position, n.style.position = "relative");
  const i = document.createElement("div");
  i.className = "sap-load-overlay";
  const a = document.createElement("div");
  a.className = "sap-load-overlay__panel", a.dataset.state = "loading";
  const s = document.createElement("p");
  s.className = "sap-load-overlay__title", s.textContent = e.title ?? "Replay Loading";
  const o = document.createElement("p");
  o.className = "sap-load-overlay__status", o.textContent = "Loading replay...";
  const r = document.createElement("div");
  r.className = "sap-load-overlay__bar";
  const l = document.createElement("div");
  l.className = "sap-load-overlay__fill", r.append(l);
  const c = document.createElement("div");
  c.className = "sap-load-overlay__meta", c.textContent = "", a.append(s, o, r, c), i.append(a), n.append(i);
  const d = (m) => {
    const u = Math.max(0, Math.min(1, m ?? 0));
    l.style.width = `${Math.round(u * 100)}%`;
  };
  return {
    update(m) {
      a.dataset.state = "loading", o.textContent = e.formatProgress?.(m) ?? Kr(m), d(m.progress), c.textContent = Xr(m);
    },
    complete(m = "Replay loaded") {
      a.dataset.state = "complete", o.textContent = m, l.style.width = "100%", c.textContent = "";
    },
    fail(m) {
      a.dataset.state = "error", o.textContent = m, c.textContent = "Loading failed";
    },
    destroy() {
      i.remove(), t !== null && (n.style.position = t);
    }
  };
}
export {
  xr as BALLCHASING_API_BASE_URL,
  ia as BALLCHASING_BASE_URL,
  Dl as BOOST_RAW_MAX,
  Sr as DEFAULT_FLOATING_NAMEPLATE_LIFT_UU,
  ft as DEFAULT_REPLAY_HITBOX_KIND,
  ca as PlaylistLoadCache,
  Il as PlaylistSession,
  xa as REPLAY_HITBOX_SPECS,
  to as ReplayPlayer,
  et as ReplayPlaylistPlayer,
  Ri as SubtrActorPlayer,
  hi as boostAmountToPercent,
  kl as boostPercentToAmount,
  ll as capturePlayerImage,
  ro as capturePlayerImageFromParsed,
  cl as capturePlayerImages,
  ji as capturePlayerImagesFromParsed,
  Cs as computeTimelineSegments,
  Ml as createBallchasingOverlayPlugin,
  vl as createBallchasingReplaySource,
  pl as createBoostPadOverlayPlugin,
  xs as createBoostPadsPlugin,
  fl as createBoostPickupAnimationPlugin,
  no as createCameraPlugin,
  gl as createCanvasRecorderPlugin,
  dl as createFpsOverlayPlugin,
  Lr as createFullReplayPlaylistItem,
  hl as createNameTagPlugin,
  bl as createPlayer,
  lt as createPlayerFromParsed,
  _l as createReplayBytesSource,
  Pl as createReplayFileSource,
  Al as createReplayLoadOverlay,
  El as createReplayPathSource,
  ke as createReplaySource,
  ml as createScoredTextPlugin,
  Or as createStaticReplaySource,
  yl as createTimelineOverlayPlugin,
  bn as ensureBindingsReady,
  Cr as fetchBallchasingReplayBytes,
  fe as findFrameIndexAtTime,
  Kr as formatReplayLoadProgress,
  Xr as formatReplayLoadProgressMeta,
  Sl as frameBound,
  ul as fromReplayPlayerPlugin,
  ks as getActiveDemoEvent,
  wl as getBallchasingReplayApiFileUrl,
  xl as getBallchasingReplayFileName,
  Tr as getBallchasingReplayFileUrl,
  Is as getFrameWindow,
  Es as getKickoffCountdownMetadata,
  zs as getKickoffSkipTargetTime,
  Un as getPlayerAssetBase,
  Bs as getPostGoalTransitionSkipTargetTime,
  pi as getReplayHitboxSpec,
  Ps as getReplayPlaybackEndTime,
  vs as inferKickoffGameState,
  ws as inferLiveGameState,
  fi as inferReplayHitboxKind,
  ui as inferReplayHitboxKindFromBodyName,
  Gi as interpolatePosition,
  Yt as isBallchasingReplayId,
  Ds as isPlayerSamplePresent,
  Tl as loadPlaylistManifestFromFile,
  Be as loadReplay,
  ze as loadReplayFromBytes,
  De as normalizeBallchasingReplayId,
  sl as normalizeReplayData,
  yn as normalizeReplayDataAsync,
  Ta as normalizeReplayHitboxKind,
  Fr as parsePlaylistManifest,
  ol as parseReplay,
  U as playerIdToString,
  Ss as projectReplayTimeToTimeline,
  _s as projectTimelineTimeToReplay,
  G as resolvePlayerAssetUrl,
  Ur as resolvePlaylistItem,
  Cl as resolvePlaylistItemsFromManifest,
  rl as setPlayerAssetBase,
  si as timeBound,
  rr as timelineEventSeekTime,
  Tn as validateReplayBytes
};
