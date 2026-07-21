// Analysis-walkthrough cinematic constants, ported from RLVision's
// frontend/static/3d-viewer/viewer.js. Durations are real-time seconds and
// carry over unchanged; lengths/heights/distances are re-derived in raw
// Unreal units (UU) because rocket-sense's player renders raw UU while
// RLVision rendered at SCALE=0.01 (see docs/analysis-walkthrough-port.md).

/** The mistake entry a cinematic dramatizes (subset of MistakeMarker). */
export interface CinematicMistake {
  kind: string;
  time: number;
  t_start: number;
  t_end: number;
  player: string;
  with_player?: string;
  /** Per-entry overrides for the cinematic window (rare; kept for parity). */
  cinematic_before?: number;
  cinematic_after?: number;
}

export const AW_SLOW_SPEED = 0.25;
export const AW_PHASE_SLOW_SEC = 3.5;
/** Per-kind override for slow-phase real-time length. */
export const AW_PHASE_SLOW_SEC_BY_KIND: Record<string, number> = {
  double_committing: 4.0,
};
export function awSlowSec(m: CinematicMistake | null): number {
  const v = m ? AW_PHASE_SLOW_SEC_BY_KIND[m.kind] : undefined;
  return typeof v === "number" ? v : AW_PHASE_SLOW_SEC;
}
export const AW_PHASE_REWIND_SEC = 1.5;
export const AW_PHASE_HOLD_SEC = 0.5;
export const AW_PHASE_POST_REWIND_SEC = 1.8;
export const AW_PHASE_ZOOM_SEC = 0.6;
export const AW_PHASE_BIRDS_SEC = 6.0;
export const AW_PHASE_DECEL_SEC = 0.6;
export const AW_PHASE_WTC_PAN_SEC = 1.0;
export const AW_PHASE_WTC_SEC = 2.5;
export const AW_PHASE_WTC_AFTERMATH_SEC = 2.5;
export const AW_PHASE_BANG_WAIT_SEC = 1.0;
export const AW_PHASE_BANG_PAN_IN_SEC = 0.8;
export const AW_PHASE_BANG_HOLD_SEC = 1.6;
export const AW_PHASE_BANG_PAN_OUT_SEC = 0.6;
// Smoothstep decel into the bang freeze covers AW_SLOW_SPEED * T/2 of
// game-time (integral of 1-smoothstep over [0,T] is T/2); the entry threshold
// is derived from that so the playhead lands exactly on the freeze target.
export const AW_PHASE_BANG_DECEL_SEC = 0.5;
export const AW_PHASE_BANG_DECEL_GAME_SEC = (AW_SLOW_SPEED * AW_PHASE_BANG_DECEL_SEC) / 2;
// Extra slow-mo past m.time before the freeze so the bang gets follow-through.
export const AW_PHASE_BANG_POST_HIT_SEC = 0.5;
export const AW_PHASE_BANG_POST_HIT_GAME_SEC = AW_SLOW_SPEED * AW_PHASE_BANG_POST_HIT_SEC;

export const AW_PHASE_WTC_SEC_BY_KIND: Record<string, number> = {
  double_committing: 1.5,
  // waiting_to_challenge: no rewind; slow-mo runs 5s at 0.25x from teammate
  // POV showing the aftermath of the missed challenge.
  waiting_to_challenge: 5.0,
};
export function awWtcSec(m: CinematicMistake | null): number {
  const v = m ? AW_PHASE_WTC_SEC_BY_KIND[m.kind] : undefined;
  return typeof v === "number" ? v : AW_PHASE_WTC_SEC;
}
export const AW_PHASE_WTC_AFTERMATH_SEC_BY_KIND: Record<string, number> = {
  double_committing: 2.0,
  waiting_to_challenge: 1.5,
};
export function awAftermathSec(m: CinematicMistake | null): number {
  const v = m ? AW_PHASE_WTC_AFTERMATH_SEC_BY_KIND[m.kind] : undefined;
  return typeof v === "number" ? v : AW_PHASE_WTC_AFTERMATH_SEC;
}

/** Per-kind cinematic window around m.time (game seconds). */
export const MISTAKE_CINEMATIC_BEFORE: Record<string, number> = {
  too_far_from_play: 1.5,
  stacked_too_close: 0.5,
  bumping_teammate: 0.6,
  overcommitting_last_man: 0.4,
  bang_with_time: 0.4,
  hesitating_on_50: 0.5,
  waiting_to_challenge: 0.8,
  double_committing: 0.8,
  creeping_up_too_far: 0.3,
  poor_landing: 0.75,
  pick_up_small_pads: 0.7,
  bad_kickoff: 0.25,
  bad_fifty: 0.4,
  floating_with_boost: 1.5,
  bad_defensive_touch: 0.5,
};
export const MISTAKE_CINEMATIC_AFTER: Record<string, number> = {
  too_far_from_play: 0.8,
  stacked_too_close: 1.0,
  bumping_teammate: 1.0,
  overcommitting_last_man: 1.0,
  bang_with_time: 0.75,
  hesitating_on_50: 0.7,
  waiting_to_challenge: 0.6,
  double_committing: 2.1,
  creeping_up_too_far: 1.0,
  poor_landing: 0.25,
  pick_up_small_pads: 0.7,
  bad_kickoff: 1.0,
  bad_fifty: 1.0,
  floating_with_boost: 1.5,
  bad_defensive_touch: 1.4,
};
export const MISTAKE_CINEMATIC_DEFAULT_BEFORE = 1.0;
export const MISTAKE_CINEMATIC_DEFAULT_AFTER = 1.0;

export function mistakeCinematicBefore(m: CinematicMistake): number {
  if (typeof m.cinematic_before === "number" && m.cinematic_before >= 0) {
    return m.cinematic_before;
  }
  const v = MISTAKE_CINEMATIC_BEFORE[m.kind];
  return typeof v === "number" ? v : MISTAKE_CINEMATIC_DEFAULT_BEFORE;
}
export function mistakeCinematicAfter(m: CinematicMistake): number {
  if (typeof m.cinematic_after === "number" && m.cinematic_after >= 0) {
    return m.cinematic_after;
  }
  const v = MISTAKE_CINEMATIC_AFTER[m.kind];
  return typeof v === "number" ? v : MISTAKE_CINEMATIC_DEFAULT_AFTER;
}

export const MISTAKE_CALLOUT_MSG: Record<string, string> = {
  too_far_from_play: "You're too far from the play — push up to support your teammates",
  stacked_too_close: "You're stacked too close to teammate — spread out and cover something else",
  bumping_teammate:
    "You bumped your teammate out of the play — read their lane and route around them",
  overcommitting_last_man:
    "You're diving as last man — play it safe and buy time for your teammate to recover",
  bang_with_time: "You're banging the ball away. Hit the brakes and slow down.",
  hesitating_on_50:
    "You had a clean challenge window here. If you jumped swiftly you could have gotten a beat or 50/50.",
  waiting_to_challenge:
    "You waited too long to challenge — jump earlier when an opponent has uncontested possession",
  double_committing: "You double-committed. Let them go for it instead of crashing in.",
  creeping_up_too_far:
    "You crept up too far - now you're overcommited whilst the opponent booms the ball over you. Position a little further back to give yourself time to react.",
  poor_landing: "Use air roll to land cleanly on your wheels",
  pick_up_small_pads: "You drove past free boost along your path",
  bad_kickoff:
    "Bad kickoff. Make sure to get solid contact through the middle of the ball so the ball doesn't go flying backwards.",
  bad_fifty:
    "Bad fifty. Make sure to get solid contact through the middle of the ball so it doesn't pop up and squirt back into your half.",
  floating_with_boost:
    "You're flailing in the air. Use boost to get to the wall or ceiling to recover faster.",
  bad_defensive_touch:
    "Your defensive touch left the ball in front of net — clear it wide or away from danger",
};

export const BANG_PAUSE_MSG = "Nobody is on you. Hit the brakes and take a dribble.";
export const BIRDS_PATH_MSG_TOO_FAR = "Play off small pads and stay relevant to the play";
export const BIRDS_PATH_MSG_SMALL_PADS = "Path through small pads to stay boosted up";
export const TEAMMATE_SWITCH_MSG_WTC = "Challenge sooner to force the ball to your teammate";
export const TEAMMATE_SWITCH_MSG_DC_CLOSER =
  "Your teammate is closer to the ball. Let them have it.";
export const TEAMMATE_SWITCH_MSG_DC_ANGLE = "Your teammate has a better angle. Let them handle it.";
// A teammate must be closer by at least this gap before the proximity copy
// kicks in; smaller gaps read as a "better angle" situation. ~5m.
export const DC_CLOSER_GAP_UU = 500;

export const MISTAKE_COLORS: Record<string, string> = {
  too_far_from_play: "#ff5577",
  stacked_too_close: "#ffaa22",
  bumping_teammate: "#ff3355",
  overcommitting_last_man: "#55cc77",
  bang_with_time: "#22aaff",
  hesitating_on_50: "#ffd866",
  waiting_to_challenge: "#22ddcc",
  double_committing: "#ee44bb",
  creeping_up_too_far: "#aaee44",
  poor_landing: "#ff7733",
  pick_up_small_pads: "#b388ff",
  bad_kickoff: "#ff66cc",
  bad_fifty: "#cc66ff",
  floating_with_boost: "#66ccff",
  bad_defensive_touch: "#9b6a3a",
};
export const DEFAULT_CALLOUT_COLOR = "#22aaff";

export const TEAM_COLOR_BLUE = "#2a8cff";
export const TEAM_COLOR_ORANGE = "#ff8c2a";

// ---- Arena geometry (raw UU; subtr-actor frame, RL Z-up) --------------------
// x: ±4096 (side walls), y: ±5120 (goal axis — blue/team-zero defends -y),
// z: 0..2044 (ceiling). Matches crates/rocket-sense-mistakes/src/view.rs.
export const FIELD_HALF_X_UU = 4096;
export const FIELD_HALF_Y_UU = 5120;
export const CEILING_Z_UU = 2044;

// ---- Camera constants re-derived in UU (RLVision scene units × 100) ---------
/** bang sideview: camera height above the car. (viewer.js CAM_HEIGHT 20) */
export const BANG_CAM_HEIGHT_UU = 2000;
/** bang sideview: clamp margin inside walls/ceiling. (viewer.js WALL_MARGIN 2) */
export const BANG_WALL_MARGIN_UU = 200;
/** bang sideview: never closer than this to the cone center. (viewer.js 26) */
export const BANG_SIDE_DIST_MIN_UU = 2600;
/** open-space cone: apex just ahead of the car nose. (viewer.js 1.5) */
export const BANG_CONE_APEX_Y_UU = 150;
/** open-space cone: apex→far-arc distance. (viewer.js 16) */
export const BANG_CONE_RANGE_UU = 1600;
/** open-space cone: half spread in radians (~35°). */
export const BANG_CONE_HALF_ANGLE = 0.62;

// Bird's-eye camera: RLVision parked at a fixed 180 scene units (18000 UU).
// Here the height is fitted per-frame from the live fov/aspect so the whole
// field fills the clip canvas at any viewport shape; these bound the fit.
export const BIRDS_HEIGHT_MIN_UU = 9000;
export const BIRDS_HEIGHT_MAX_UU = 26000;
/** Extra field margin included in the bird's-eye fit. */
export const BIRDS_FIT_MARGIN_UU = 600;
