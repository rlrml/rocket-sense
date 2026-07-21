// Callout copy resolution — which text a given CalloutMessageKind shows,
// including the double_committing closer-vs-better-angle branch (a port of
// viewer.js's TEAMMATE_SWITCH_MSG function entry).

import type { ReplayModel } from "@rlrml/player";
import {
  BANG_PAUSE_MSG,
  BIRDS_PATH_MSG_SMALL_PADS,
  BIRDS_PATH_MSG_TOO_FAR,
  DC_CLOSER_GAP_UU,
  MISTAKE_CALLOUT_MSG,
  TEAMMATE_SWITCH_MSG_DC_ANGLE,
  TEAMMATE_SWITCH_MSG_DC_CLOSER,
  TEAMMATE_SWITCH_MSG_WTC,
  type CinematicMistake,
} from "./constants";
import type { CalloutMessageKind } from "./phases";
import { sampleBallXY, samplePlayerXY } from "./sampling";

/**
 * double_committing second-half copy: "closer" only when the teammate is
 * unambiguously nearer the ball (gap ≥ DC_CLOSER_GAP_UU at the peak moment);
 * a barely-closer teammate on a cleaner approach reads as "better angle".
 */
export function doubleCommitSwitchMessage(
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
  teammateIdx: number,
): string {
  const focus = replay.players[focusIdx];
  const teammate = replay.players[teammateIdx];
  if (focus && teammate) {
    const peakT = m.time;
    const fxy = samplePlayerXY(replay, focus, peakT);
    const txy = samplePlayerXY(replay, teammate, peakT);
    const bxy = sampleBallXY(replay, peakT);
    if (fxy && txy && bxy) {
      const focusDist = Math.hypot(fxy[0] - bxy[0], fxy[1] - bxy[1]);
      const tmDist = Math.hypot(txy[0] - bxy[0], txy[1] - bxy[1]);
      if (focusDist - tmDist >= DC_CLOSER_GAP_UU) {
        return TEAMMATE_SWITCH_MSG_DC_CLOSER;
      }
    }
  }
  return TEAMMATE_SWITCH_MSG_DC_ANGLE;
}

export function resolveCalloutText(
  message: CalloutMessageKind,
  replay: ReplayModel,
  m: CinematicMistake,
  focusIdx: number,
  teammateIdx: number,
): string {
  switch (message) {
    case "birds_path":
      return m.kind === "pick_up_small_pads" ? BIRDS_PATH_MSG_SMALL_PADS : BIRDS_PATH_MSG_TOO_FAR;
    case "teammate_switch":
      if (m.kind === "waiting_to_challenge") return TEAMMATE_SWITCH_MSG_WTC;
      if (m.kind === "double_committing" && teammateIdx >= 0) {
        return doubleCommitSwitchMessage(replay, m, focusIdx, teammateIdx);
      }
      return MISTAKE_CALLOUT_MSG[m.kind] ?? "";
    case "bang_pause":
      return BANG_PAUSE_MSG;
    default:
      return MISTAKE_CALLOUT_MSG[m.kind] ?? "";
  }
}
