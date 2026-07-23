// Synthetic ReplayModel builders for the cinematic unit tests: uniform 10Hz
// frames with piecewise-linear player/ball tracks and scriptable boost pads.

import type {
  PlayerSample,
  ReplayBoostPad,
  ReplayBoostPadEvent,
  ReplayModel,
  ReplayPlayerTrack,
} from "@rlrml/player";

export const FRAME_DT = 0.1;

export function sampleAt(x: number, y: number, z = 17): PlayerSample {
  return {
    isPresent: true,
    position: { x, y, z },
    linearVelocity: null,
    angularVelocity: null,
    rotation: null,
    forward: null,
    up: null,
    boostAmount: 50,
    boostFraction: 0.5,
    boostActive: false,
    powerslideActive: false,
    jumpActive: false,
    doubleJumpActive: false,
    dodgeActive: false,
  };
}

export interface TrackSpec {
  id: string;
  name: string;
  isTeamZero: boolean;
  /** position at frame index i (uniform FRAME_DT grid). */
  positionAt: (t: number) => { x: number; y: number; z?: number };
}

export function makePad(
  index: number,
  x: number,
  y: number,
  size: "big" | "small",
  events: ReplayBoostPadEvent[] = [],
): ReplayBoostPad {
  return { index, padId: `pad-${index}`, size, position: { x, y, z: 0 }, events };
}

export function makeReplay(options: {
  durationSeconds: number;
  tracks: TrackSpec[];
  ballAt?: (t: number) => { x: number; y: number; z?: number };
  pads?: ReplayBoostPad[];
}): ReplayModel {
  const frameCount = Math.round(options.durationSeconds / FRAME_DT) + 1;
  const times = Array.from({ length: frameCount }, (_, i) => i * FRAME_DT);
  const ballAt: (t: number) => { x: number; y: number; z?: number } =
    options.ballAt ?? (() => ({ x: 0, y: 0 }));
  const players: ReplayPlayerTrack[] = options.tracks.map((spec) => ({
    id: spec.id,
    name: spec.name,
    isTeamZero: spec.isTeamZero,
    cameraSettings: {},
    hitbox: { preset: "octane" } as unknown as ReplayPlayerTrack["hitbox"],
    frames: times.map((t) => {
      const p = spec.positionAt(t);
      return sampleAt(p.x, p.y, p.z ?? 17);
    }),
  }));
  return {
    frameCount,
    duration: options.durationSeconds,
    rawStartTime: 0,
    frames: times.map((time) => ({
      time,
      secondsRemaining: 300,
      gameState: 1,
      kickoffCountdown: 0,
    })),
    ballFrames: times.map((t) => {
      const p = ballAt(t);
      return {
        position: { x: p.x, y: p.y, z: p.z ?? 93 },
        linearVelocity: null,
        angularVelocity: null,
        rotation: null,
      };
    }),
    boostPads: options.pads ?? [],
    players,
    tickMarks: [],
    timelineEvents: [],
    teamZeroNames: options.tracks.filter((t) => t.isTeamZero).map((t) => t.name),
    teamOneNames: options.tracks.filter((t) => !t.isTeamZero).map((t) => t.name),
  };
}
