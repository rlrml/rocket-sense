// Recommended-path routing for the bird's-eye reveal — ports viewer.js
// `_computeTooFarPath` / `_computeSmallPadsPath` / `_computeMistakePath`, plus
// the control-point conditioning `_showTooFarPath` performed before rendering
// (turn-angle filter + Chaikin smoothing), kept pure here so it's testable.
//
// RLVision optionally biased the router with a pro-pathing occupancy model
// (support-spot pick, pad-occupancy and pad-transition bonuses). Rocket Sense
// has no such artifact, so this port keeps viewer.js's model-absent behavior:
// the hand-tuned support-spot fallback, with the pro bonus terms inert — the
// exact code path viewer.js runs before its model loads.

import type { ReplayModel } from "@rlrml/player";
import type { CinematicMistake } from "./constants";
import {
  isPadActiveAt,
  padCollectedBetween,
  ownGoalY,
  sampleBallXY,
  samplePlayerVelocityXY,
  samplePlayerXY,
  trackIndexByName,
} from "./sampling";

export interface PathWaypoint {
  x: number;
  y: number;
  big?: boolean;
  /** Index into replay.boostPads; absent for synthetic (Bezier) points. */
  padIdx?: number;
}

export interface MistakePath {
  start: [number, number];
  leadIn: [number, number] | null;
  waypoints: PathWaypoint[];
  target: [number, number];
  /** Play-context anchor; the rewind lands at tAnchor - 1.0. */
  tAnchor: number;
  tDecision: number;
  endAtLastWaypoint?: boolean;
}

function resolveFocusTrack(replay: ReplayModel, m: CinematicMistake, focusIdx: number) {
  const idx =
    focusIdx >= 0 && focusIdx < replay.players.length
      ? focusIdx
      : trackIndexByName(replay, m.player);
  return idx >= 0 ? { idx, track: replay.players[idx] } : null;
}

/**
 * Route from the player through nearby active boost pads to a support spot
 * (too_far_from_play).
 */
export function computeTooFarPath(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
): MistakePath | null {
  const focus = resolveFocusTrack(replay, m, focusIdx);
  if (!focus) return null;
  const track = focus.track;
  // tDecision sources play context; tAnchor frames the routing target (1.5s
  // before the decision, mid-rotation). tPathStart is where the chevrons
  // originate — pulled back so the path starts flush with the player when the
  // rewind lands at tAnchor - 1.0.
  const tDecision = m.t_start ?? m.time;
  const LOOKBACK = 1.5;
  const REWIND_PRE_ROLL = 1.0;
  const tAnchor = Math.max(0, tDecision - LOOKBACK);
  const tPathStart = Math.max(0, tAnchor - REWIND_PRE_ROLL);

  let pp = samplePlayerXY(replay, track, tPathStart);
  if (!pp) pp = samplePlayerXY(replay, track, tAnchor);
  const bp = sampleBallXY(replay, tDecision);
  if (!pp || !bp) return null;

  // Velocity at the path start seeds router heading and lead-in placement.
  let velUnitX: number | null = null;
  let velUnitY: number | null = null;
  let velRL = samplePlayerVelocityXY(replay, track, tPathStart);
  if (!velRL) velRL = samplePlayerVelocityXY(replay, track, tAnchor);
  if (velRL) {
    const vmag = Math.hypot(velRL[0], velRL[1]);
    if (vmag > 50) {
      velUnitX = velRL[0] / vmag;
      velUnitY = velRL[1] / vmag;
    }
  }
  const t = tDecision;
  const oppDir = ownGoalY(track) < 0 ? 1 : -1;

  // Support spot ~2500uu goal-side of the ball, on the lateral side opposite
  // the closest teammate to the ball (the pro-model target when RLVision has
  // its pathing artifact loaded; the hand-tuned fallback otherwise — here
  // always the fallback, see module note).
  const tms: [number, number][] = [];
  for (let i = 0; i < replay.players.length; i++) {
    const cand = replay.players[i];
    if (i === focus.idx) continue;
    if (cand.isTeamZero !== track.isTeamZero) continue;
    const xy = samplePlayerXY(replay, cand, t);
    if (xy) tms.push(xy);
  }
  const SUPPORT_BACK = 2500.0;
  const SUPPORT_LATERAL = 1800.0;
  let lateralSide = 0;
  if (tms.length) {
    let closest = tms[0];
    let cd = Infinity;
    for (const tm of tms) {
      const dx = tm[0] - bp[0];
      const dy = tm[1] - bp[1];
      const d = dx * dx + dy * dy;
      if (d < cd) {
        cd = d;
        closest = tm;
      }
    }
    lateralSide = closest[0] >= bp[0] ? -1 : 1;
  }
  let targetX = bp[0] + lateralSide * SUPPORT_LATERAL;
  let targetY = bp[1] - oppDir * SUPPORT_BACK;
  // Clamp inside the field so the marker doesn't sit in a wall.
  const HX = 8192 / 2 - 200;
  const HY = 10240 / 2 - 200;
  if (targetX > HX) targetX = HX;
  else if (targetX < -HX) targetX = -HX;
  if (targetY > HY) targetY = HY;
  else if (targetY < -HY) targetY = -HY;

  // Candidate pads = those on the field at tPathStart (the reveal frame) that
  // also survive the rewound span — routing to a pad about to vanish is bad
  // advice.
  const pads: { x: number; y: number; big: boolean; padIdx: number }[] = [];
  for (let i = 0; i < replay.boostPads.length; i++) {
    const pad = replay.boostPads[i];
    if (!isPadActiveAt(pad, tPathStart)) continue;
    if (padCollectedBetween(pad, tPathStart, tDecision)) continue;
    pads.push({ x: pad.position.x, y: pad.position.y, big: pad.size === "big", padIdx: i });
  }

  // Lead-in along velocity — 600uu when velocity points toward the target,
  // shrinking to 150uu when anti-aligned so a turn-around reads as a small
  // arc instead of a spike Catmull-Rom can't bend back smoothly.
  let leadIn: [number, number] | null = null;
  if (velUnitX !== null && velUnitY !== null) {
    const dxT = targetX - pp[0];
    const dyT = targetY - pp[1];
    const tMag = Math.hypot(dxT, dyT);
    let LEAD_DIST = 600.0;
    if (tMag > 1) {
      const align = (velUnitX * dxT + velUnitY * dyT) / tMag;
      if (align < 0) LEAD_DIST = 150.0 + 450.0 * (1 + align);
    }
    let lx = pp[0] + velUnitX * LEAD_DIST;
    let ly = pp[1] + velUnitY * LEAD_DIST;
    if (lx > HX) lx = HX;
    else if (lx < -HX) lx = -HX;
    if (ly > HY) ly = HY;
    else if (ly < -HY) ly = -HY;
    leadIn = [lx, ly];
  }

  // Greedy routing: pick pads by (savings + big-pad bonus) under a detour
  // budget. Until MIN_PADS waypoints, "priority" mode relaxes budget/progress;
  // ALIGN_MIN is the actual smoothness gatekeeper.
  const MAX_DETOUR_RATIO_SMALL = 1.7;
  const MAX_DETOUR_RATIO_BIG = 2.15;
  const PRIORITY_RATIO_SMALL = 2.6;
  const PRIORITY_RATIO_BIG = 3.2;
  const MIN_PADS = 3;
  const MAX_HOPS = 12;
  const BIG_BONUS = 1200.0;
  // Full bonus only for a big pad the player can actually reach; fades to
  // zero by BIG_BONUS_FAR so a far-corner big pad stops outweighing the small
  // pads on the way to support.
  const BIG_BONUS_NEAR = 3000.0;
  const BIG_BONUS_FAR = 6500.0;
  const MIN_FORWARD_PROGRESS = -0.05;
  const PRIORITY_MIN_PROGRESS = -0.3;
  const used = new Set<number>();
  const waypoints: PathWaypoint[] = [];
  let cx: number;
  let cy: number;
  if (leadIn) {
    cx = leadIn[0];
    cy = leadIn[1];
  } else {
    cx = pp[0];
    cy = pp[1];
  }
  const directDist = Math.hypot(targetX - pp[0], targetY - pp[1]);
  let pathLenSoFar = leadIn ? Math.hypot(leadIn[0] - pp[0], leadIn[1] - pp[1]) : 0;
  let curDirX: number;
  let curDirY: number;
  if (leadIn) {
    const ldx = leadIn[0] - pp[0];
    const ldy = leadIn[1] - pp[1];
    const lm = Math.hypot(ldx, ldy);
    if (lm > 1) {
      curDirX = ldx / lm;
      curDirY = ldy / lm;
    } else {
      curDirX = velUnitX ?? 0;
      curDirY = velUnitY ?? 0;
    }
  } else if (velUnitX !== null && velUnitY !== null) {
    curDirX = velUnitX;
    curDirY = velUnitY;
  } else {
    const dm = Math.max(directDist, 1);
    curDirX = (targetX - pp[0]) / dm;
    curDirY = (targetY - pp[1]) / dm;
  }
  // Turn cap: ~35° normal, ~90° in priority mode.
  const ALIGN_MIN = 0.819;
  const PRIORITY_ALIGN_MIN = 0.0;
  const ALIGN_BONUS = 500.0;
  const PROGRESS_WEIGHT = 2000.0;
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const isPriority = waypoints.length < MIN_PADS;
    const dxRem = targetX - cx;
    const dyRem = targetY - cy;
    const remDist = Math.hypot(dxRem, dyRem);
    if (remDist < (isPriority ? 250 : 800)) break;
    const nx = dxRem / remDist;
    const ny = dyRem / remDist;
    let best = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < pads.length; i++) {
      if (used.has(i)) continue;
      const p = pads[i];
      const dx = p.x - cx;
      const dy = p.y - cy;
      const distToPad = Math.hypot(dx, dy);
      if (distToPad < 1) continue;
      const progress = (dx * nx + dy * ny) / remDist;
      const minProg = isPriority ? PRIORITY_MIN_PROGRESS : MIN_FORWARD_PROGRESS;
      if (progress < minProg) continue;
      // Heading alignment filter — kills zigzag through scattered pads.
      const padDirX = dx / distToPad;
      const padDirY = dy / distToPad;
      const align = padDirX * curDirX + padDirY * curDirY;
      const minAlign = isPriority ? PRIORITY_ALIGN_MIN : ALIGN_MIN;
      if (align < minAlign) continue;
      const distPadToTarget = Math.hypot(targetX - p.x, targetY - p.y);
      const newTotal = pathLenSoFar + distToPad + distPadToTarget;
      const ratioSmall = isPriority ? PRIORITY_RATIO_SMALL : MAX_DETOUR_RATIO_SMALL;
      const ratioBig = isPriority ? PRIORITY_RATIO_BIG : MAX_DETOUR_RATIO_BIG;
      const budget = directDist * (p.big ? ratioBig : ratioSmall);
      if (newTotal > budget) continue;
      const detour = distToPad + distPadToTarget - remDist;
      let bigBonus = 0;
      if (p.big) {
        const dFromStart = Math.hypot(p.x - pp[0], p.y - pp[1]);
        const f = (BIG_BONUS_FAR - dFromStart) / (BIG_BONUS_FAR - BIG_BONUS_NEAR);
        bigBonus = BIG_BONUS * Math.max(0, Math.min(1, f));
      }
      const score = -detour + bigBonus + progress * PROGRESS_WEIGHT + align * ALIGN_BONUS;
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    }
    if (best < 0) break;
    used.add(best);
    const p = pads[best];
    waypoints.push({ x: p.x, y: p.y, big: p.big, padIdx: p.padIdx });
    const segLen = Math.hypot(p.x - cx, p.y - cy);
    pathLenSoFar += segLen;
    if (segLen > 1e-3) {
      curDirX = (p.x - cx) / segLen;
      curDirY = (p.y - cy) / segLen;
    }
    cx = p.x;
    cy = p.y;
  }

  // Beeline collapse: a terminal big pad IS the destination — strip the
  // small-pad detour, snap the target onto the big pad, and for the
  // single-big-pad case replace the straight control polygon with a quadratic
  // Bezier so the chevrons turn continuously instead of kinking at leadIn.
  let endAtLastWaypoint = false;
  if (waypoints.length > 0 && waypoints[waypoints.length - 1].big) {
    const bigs = waypoints.filter((w) => w.big);
    waypoints.length = 0;
    if (bigs.length === 1 && velUnitX !== null && velUnitY !== null) {
      const dest = bigs[0];
      const dxT = dest.x - pp[0];
      const dyT = dest.y - pp[1];
      const chord = Math.hypot(dxT, dyT);
      if (chord > 500) {
        const align = Math.max(0, (velUnitX * dxT + velUnitY * dyT) / chord);
        const handleDist = Math.min(2000, chord * 0.5) * (0.5 + 0.5 * align);
        const hX = pp[0] + velUnitX * handleDist;
        const hY = pp[1] + velUnitY * handleDist;
        const N = 10;
        for (let i = 1; i < N; i++) {
          const bt = i / N;
          const u = 1 - bt;
          waypoints.push({
            x: u * u * pp[0] + 2 * u * bt * hX + bt * bt * dest.x,
            y: u * u * pp[1] + 2 * u * bt * hY + bt * bt * dest.y,
          });
        }
      }
      waypoints.push(dest);
      // Bezier samples already encode the initial heading; a leadIn would
      // just re-kink the curve.
      leadIn = null;
    } else {
      waypoints.push(...bigs);
    }
    const last = waypoints[waypoints.length - 1];
    targetX = last.x;
    targetY = last.y;
    endAtLastWaypoint = true;
  }

  // Corridor snag (additive): pull in unused active pads sitting within
  // CORRIDOR of a route segment — pads the car already drives past — spliced
  // in path order. Skipped for the beeline case (waypoints are Bezier
  // samples, not pads).
  if (!endAtLastWaypoint) {
    const CORRIDOR = 600;
    const poly: { p: [number, number]; wi: number }[] = [{ p: [pp[0], pp[1]], wi: 0 }];
    if (leadIn) poly.push({ p: leadIn, wi: 0 });
    for (let i = 0; i < waypoints.length; i++) {
      poly.push({ p: [waypoints[i].x, waypoints[i].y], wi: i + 1 });
    }
    poly.push({ p: [targetX, targetY], wi: waypoints.length });

    const snagged: { pad: (typeof pads)[number]; padListIdx: number; wi: number; order: number }[] =
      [];
    for (let pi = 0; pi < pads.length; pi++) {
      if (used.has(pi)) continue;
      const pad = pads[pi];
      let bestD = Infinity;
      let bestSeg = -1;
      let bestT = 0;
      for (let s = 0; s < poly.length - 1; s++) {
        const a = poly[s].p;
        const b = poly[s + 1].p;
        const abx = b[0] - a[0];
        const aby = b[1] - a[1];
        const ab2 = abx * abx + aby * aby;
        if (ab2 < 1) continue;
        const tt = ((pad.x - a[0]) * abx + (pad.y - a[1]) * aby) / ab2;
        if (tt < 0 || tt > 1) continue;
        const cxp = a[0] + abx * tt;
        const cyp = a[1] + aby * tt;
        const d = Math.hypot(pad.x - cxp, pad.y - cyp);
        if (d < bestD) {
          bestD = d;
          bestSeg = s;
          bestT = tt;
        }
      }
      if (bestSeg >= 0 && bestD <= CORRIDOR) {
        snagged.push({ pad, padListIdx: pi, wi: poly[bestSeg].wi, order: bestSeg + bestT });
      }
    }
    // Splice late-to-early so each insertion leaves lower indices unshifted.
    snagged.sort((a, b) => b.order - a.order);
    for (const s of snagged) {
      used.add(s.padListIdx);
      waypoints.splice(s.wi, 0, { x: s.pad.x, y: s.pad.y, big: s.pad.big, padIdx: s.pad.padIdx });
    }
  }

  return {
    start: [pp[0], pp[1]],
    leadIn,
    waypoints,
    target: [targetX, targetY],
    tAnchor,
    tDecision,
    endAtLastWaypoint,
  };
}

/**
 * pick_up_small_pads variant: follow the player's actual trajectory and sweep
 * the small pads they drove past, in trajectory order.
 */
export function computeSmallPadsPath(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
): MistakePath | null {
  const focus = resolveFocusTrack(replay, m, focusIdx);
  if (!focus) return null;
  const track = focus.track;
  // End at the labeled moment (m.time) — t_start is often ~1.5s earlier and
  // would cut the chevrons off before the player's actual stop point.
  const tEnd = m.time ?? m.t_start;
  // The rewind lands at tAnchor - 1.0; with tAnchor = tEnd - (TOTAL_SPAN - 1)
  // it lands exactly at the path's start time, so chevrons cover the whole
  // rewound window.
  const TOTAL_SPAN = 4.0;
  const REWIND_PRE_ROLL = 1.0;
  const tPathStart = Math.max(0, tEnd - TOTAL_SPAN);
  const tAnchor = Math.max(0, tEnd - (TOTAL_SPAN - REWIND_PRE_ROLL));

  const pp = samplePlayerXY(replay, track, tPathStart);
  const endPos = samplePlayerXY(replay, track, tEnd);
  if (!pp || !endPos) return null;

  // Sample the real run at fixed intervals so pad proximity is scored against
  // the actual trajectory, not a synthesized line.
  const SAMPLES = 32;
  const traj: [number, number][] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const ts = tPathStart + (tEnd - tPathStart) * (i / SAMPLES);
    const p = samplePlayerXY(replay, track, ts);
    if (p) traj.push(p);
  }
  if (traj.length < 2) return null;

  // "Drove past" radius; DUPE_RADIUS keeps stacked pads from double-backing.
  const NEAR_THRESHOLD = 700;
  const DUPE_RADIUS = 250;
  const MAX_WAYPOINTS = 8;
  const candidates: { x: number; y: number; trajIdx: number; dist: number; padIdx: number }[] = [];
  for (let i = 0; i < replay.boostPads.length; i++) {
    const pad = replay.boostPads[i];
    if (pad.size === "big") continue;
    if (!isPadActiveAt(pad, tAnchor)) continue;
    let bestDist = Infinity;
    let bestIdx = -1;
    for (let j = 0; j < traj.length; j++) {
      const dx = traj[j][0] - pad.position.x;
      const dy = traj[j][1] - pad.position.y;
      const d = Math.hypot(dx, dy);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = j;
      }
    }
    if (bestDist > NEAR_THRESHOLD || bestIdx < 0) continue;
    candidates.push({
      x: pad.position.x,
      y: pad.position.y,
      trajIdx: bestIdx,
      dist: bestDist,
      padIdx: i,
    });
  }
  candidates.sort((a, b) => a.trajIdx - b.trajIdx || a.dist - b.dist);
  const waypoints: PathWaypoint[] = [];
  for (const c of candidates) {
    let dup = false;
    for (const w of waypoints) {
      if (Math.hypot(c.x - w.x, c.y - w.y) < DUPE_RADIUS) {
        dup = true;
        break;
      }
    }
    if (dup) continue;
    waypoints.push({ x: c.x, y: c.y, big: false, padIdx: c.padIdx });
    if (waypoints.length >= MAX_WAYPOINTS) break;
  }

  return {
    start: [pp[0], pp[1]],
    leadIn: null,
    waypoints,
    target: [endPos[0], endPos[1]],
    tAnchor,
    tDecision: tEnd,
  };
}

export function computeMistakePath(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
): MistakePath | null {
  if (m.kind === "pick_up_small_pads") return computeSmallPadsPath(replay, m, focusIdx);
  return computeTooFarPath(replay, m, focusIdx);
}

// ---- Render-side control-point conditioning ---------------------------------

export interface ChevronControlPoints {
  /** Smoothed [x, y] control points for the Catmull-Rom curve. */
  points: [number, number][];
  /** Pad waypoints that survived the angle filter (drive the strobe). */
  survivingWaypoints: PathWaypoint[];
}

/**
 * Assemble and condition the chevron curve's control points: start → leadIn?
 * → waypoints → target?, then the turn-angle filter and (for the routed kind)
 * Chaikin corner-cutting. Ports the front half of `_showTooFarPath`.
 */
export function buildChevronControlPoints(
  kind: string,
  path: MistakePath,
): ChevronControlPoints | null {
  // Skip the trailing target when the path terminates at its last waypoint
  // (beeline-to-big) or for pick_up_small_pads with pads to weave through —
  // both want the chevrons to end exactly at the final pad.
  const endAtLast = path.endAtLastWaypoint === true && path.waypoints.length > 0;
  const appendTarget = !endAtLast && (kind !== "pick_up_small_pads" || path.waypoints.length === 0);

  const allRL: [number, number][] = [path.start];
  if (path.leadIn) allRL.push(path.leadIn);
  for (const w of path.waypoints) allRL.push([w.x, w.y]);
  if (appendTarget) allRL.push(path.target);

  const allMeta: (PathWaypoint | null)[] = [null];
  if (path.leadIn) allMeta.push(null);
  for (const w of path.waypoints) allMeta.push(w);
  if (appendTarget) allMeta.push(null);

  // Drop interior points whose turn angle exceeds the threshold (≤5 passes).
  // pick_up_small_pads weaves through pads, so only true doublebacks (>150°)
  // get dropped. The leadIn is protected — it carries the turn-around cue.
  const MAX_TURN_DEG = kind === "pick_up_small_pads" ? 150 : 90;
  const cosThresh = Math.cos((Math.PI / 180) * MAX_TURN_DEG);
  const protectedIdx = path.leadIn ? 1 : -1;
  for (let pass = 0; pass < 5; pass++) {
    let dropped = false;
    for (let i = 1; i < allRL.length - 1; i++) {
      if (i === protectedIdx) continue;
      const a = allRL[i - 1];
      const b = allRL[i];
      const c = allRL[i + 1];
      const ux = b[0] - a[0];
      const uy = b[1] - a[1];
      const vx = c[0] - b[0];
      const vy = c[1] - b[1];
      const um = Math.hypot(ux, uy);
      const vm = Math.hypot(vx, vy);
      if (um < 1 || vm < 1) continue;
      const dot = (ux * vx + uy * vy) / (um * vm);
      if (dot < cosThresh) {
        allRL.splice(i, 1);
        allMeta.splice(i, 1);
        dropped = true;
        i--;
      }
    }
    if (!dropped) break;
  }
  const survivingWaypoints = allMeta.filter(
    (w): w is PathWaypoint => w !== null && typeof w.padIdx === "number" && w.padIdx >= 0,
  );

  // Chaikin corner-cutting (endpoint-preserving), 5 passes. Skipped for
  // pick_up_small_pads — smoothing would pull the curve off each pad.
  let smoothedRL = allRL;
  if (kind !== "pick_up_small_pads") {
    for (let pass = 0; pass < 5; pass++) {
      if (smoothedRL.length < 3) break;
      const next: [number, number][] = [smoothedRL[0]];
      for (let i = 0; i < smoothedRL.length - 1; i++) {
        const a = smoothedRL[i];
        const b = smoothedRL[i + 1];
        next.push([0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]]);
        next.push([0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]]);
      }
      next.push(smoothedRL[smoothedRL.length - 1]);
      smoothedRL = next;
    }
  }
  if (smoothedRL.length < 2) return null;
  return { points: smoothedRL, survivingWaypoints };
}
