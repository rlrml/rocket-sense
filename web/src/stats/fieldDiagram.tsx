// Shared rendering + data plumbing for the 2D field "shape" diagrams (kickoff and
// goal buildup). Both diagrams load the same replay model, project the same
// frame-indexed tracks onto a field, and draw player paths + a ball trajectory in
// the same SVG furniture — so that shell lives here once. The goal/kickoff modules
// keep only their own path-selection logic and hand a `FieldDiagramModel` to the
// shared <FieldDiagramSurface>.

import type { ReplayModel } from "@rlrml/viewer";
import { type ReactNode, useEffect, useId, useState } from "react";
import { type FieldProjection, KickoffFieldBackground } from "./kickoffField";
import { preloadReplayModel } from "./replayModel";
import { type PathPoint, round } from "./replayPaths";

type Vec3Like = { x: number; y: number; z: number };

/** Load (and cache) the parsed replay model, exposing simple ready/error state. */
export function useReplayModel(replayId: string): {
  replay: ReplayModel | null;
  error: string | null;
} {
  const [replay, setReplay] = useState<ReplayModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setReplay(null);
    setError(null);
    preloadReplayModel(replayId)
      .then((model) => {
        if (!cancelled) setReplay(model);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load replay");
      });
    return () => {
      cancelled = true;
    };
  }, [replayId]);

  return { replay, error };
}

/** "blue" for team 0, "orange" for team 1 — the colour key both diagrams share. */
export function teamColorClass(team: number): string {
  return team === 0 ? "blue" : "orange";
}

/** A car contacting the ball, placed at the player's position and oriented by yaw. */
export interface TouchMark {
  /** Projected SVG position of the car at the touch frame. */
  at: PathPoint;
  team: number;
  /** SVG-space heading in degrees (car nose points toward +x at 0°), if known. */
  headingDeg: number | null;
  /** scoring = the finish (big, ringed); buildup = a contact during the play;
   *  endpoint = where a player ends up (a quiet car in place of a path arrow). */
  kind: "scoring" | "buildup" | "endpoint";
  playerName?: string;
}

/** A single player's run, already projected and ready to draw. */
export interface SurfacePath {
  key: string;
  team: number;
  /** Extra classes on the path group (e.g. "scorer winner", "taker"). */
  groupClassName?: string;
  /** SVG polyline `points` string. */
  points: string;
  /** Per-diagram start marker (dot, labelled circle, …); team colour comes from CSS. */
  startMarker?: ReactNode;
}

export interface FieldDiagramModel {
  paths: SurfacePath[];
  ballPoints: string | null;
  ballEnd: PathPoint | null;
  /** Extra class on the ball-end circle (e.g. "goal-ball-end"). */
  ballEndClassName?: string;
  touches?: TouchMark[];
}

/**
 * Heading (degrees, SVG space) for a car whose field-space forward vector is
 * `forward`. We project the position and a point a step along `forward`, then take
 * the angle of that delta, so it stays correct under any field orientation. The
 * forward vector is scaled up first purely to avoid tiny-float precision loss.
 */
export function projectHeadingDeg(
  projection: FieldProjection,
  position: Vec3Like,
  forward: Vec3Like | null | undefined,
): number | null {
  if (!forward) return null;
  const base = projection.project(position.x, position.y);
  const tip = projection.project(position.x + forward.x * 100, position.y + forward.y * 100);
  const dx = tip.x - base.x;
  const dy = tip.y - base.y;
  if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) return null;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function distanceSq(a: Vec3Like, b: Vec3Like): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

// Generous contact radius (uu): ball radius (~92) + a car half-length, widened so a
// brief dribble or a near-miss redirect still registers as one touch.
const CONTACT_RADIUS_UU = 350;

/**
 * Find ball contacts in [from, to] by proximity: a player closing within the
 * contact radius opens a "contact" that stays open until everyone backs off, and
 * the closest frame in that window becomes one touch attributed to that player.
 * Clustering this way collapses a multi-frame dribble into a single marker instead
 * of a smear. `excludeFrame` drops a touch landing on the already-highlighted
 * scoring frame so it isn't drawn twice.
 */
export function detectBallContacts(
  replay: ReplayModel,
  from: number,
  to: number,
  projection: FieldProjection,
  options: { excludeFrame?: number | null } = {},
): TouchMark[] {
  const contactRadiusSq = CONTACT_RADIUS_UU * CONTACT_RADIUS_UU;
  const excludeFrame = options.excludeFrame ?? null;
  const touches: TouchMark[] = [];

  let best: { frame: number; playerIndex: number; distSq: number } | null = null;
  const flush = () => {
    if (!best) return;
    if (excludeFrame == null || Math.abs(best.frame - excludeFrame) > 2) {
      const mark = contactToMark(replay, best.frame, best.playerIndex, projection, "buildup");
      if (mark) touches.push(mark);
    }
    best = null;
  };

  for (let frame = from; frame <= to; frame += 1) {
    const ball = replay.ballFrames[frame]?.position;
    if (!ball) {
      flush();
      continue;
    }
    let minDistSq = Infinity;
    let minIndex = -1;
    for (let p = 0; p < replay.players.length; p += 1) {
      const sample = replay.players[p].frames[frame];
      const position = sample?.position;
      if (!position || sample?.isPresent === false) continue;
      const d = distanceSq(ball, position);
      if (d < minDistSq) {
        minDistSq = d;
        minIndex = p;
      }
    }
    if (minIndex >= 0 && minDistSq <= contactRadiusSq) {
      if (!best || minDistSq < best.distSq) {
        best = { frame, playerIndex: minIndex, distSq: minDistSq };
      }
    } else {
      flush();
    }
  }
  flush();
  return touches;
}

/** Build a TouchMark from a known (frame, player) contact. */
export function contactToMark(
  replay: ReplayModel,
  frame: number,
  playerIndex: number,
  projection: FieldProjection,
  kind: TouchMark["kind"],
): TouchMark | null {
  const track = replay.players[playerIndex];
  const sample = track?.frames[frame];
  const position = sample?.position;
  if (!position) return null;
  return {
    at: projection.project(position.x, position.y),
    team: track.isTeamZero ? 0 : 1,
    headingDeg: projectHeadingDeg(projection, position, sample.forward),
    kind,
    playerName: track.name,
  };
}

/** A small top-down car glyph, nose pointing toward +x before `headingDeg` rotates it. */
export function CarGlyph({
  x,
  y,
  headingDeg,
  length,
  className,
}: {
  x: number;
  y: number;
  headingDeg: number | null;
  length: number;
  className?: string;
}) {
  const halfL = length / 2;
  const halfW = (length * 0.6) / 2;
  return (
    <g
      className={className}
      transform={`translate(${round(x)} ${round(y)}) rotate(${round(headingDeg ?? 0)})`}
    >
      <rect
        className="field-car-body"
        x={round(-halfL)}
        y={round(-halfW)}
        width={round(length)}
        height={round(halfW * 2)}
        rx={round(halfW * 0.5)}
        vectorEffect="non-scaling-stroke"
      />
      {/* Small nose wedge at the front so orientation reads without dominating. */}
      <path
        className="field-car-nose"
        d={`M ${round(halfL)} 0 L ${round(halfL * 0.5)} ${round(-halfW * 0.8)} L ${round(halfL * 0.5)} ${round(halfW * 0.8)} Z`}
      />
    </g>
  );
}

export interface FieldDiagramSurfaceProps {
  projection: FieldProjection;
  ariaLabel: string;
  model: FieldDiagramModel;
  /** Kickoff shows the centre dot; the goal buildup hides it. */
  showCenter?: boolean;
  /** Kickoff shows the corner boost pads; the goal buildup hides them. */
  showBoosts?: boolean;
  /** Kickoff marks each run's end with an arrowhead; the goal buildup uses cars. */
  showPathArrows?: boolean;
}

/**
 * Presentational SVG shell: field background, ball trajectory, player paths, touch
 * cars and the ball-end marker. All data arrives pre-projected in `model`.
 */
export function FieldDiagramSurface({
  projection,
  ariaLabel,
  model,
  showCenter = true,
  showBoosts = true,
  showPathArrows = true,
}: FieldDiagramSurfaceProps) {
  const rawId = useId();
  const markerId = rawId.replace(/:/g, "");
  const arrow = (team: number) => `url(#${markerId}-arrow-${teamColorClass(team)})`;
  const { paths, ballPoints, ballEnd, ballEndClassName, touches } = model;
  // Touch cars are drawn well above real scale (a real car is ~150uu) so they stay
  // legible on a thumbnail-sized diagram.
  const carLength = projection.toUnits(300);

  return (
    <div className="kickoff-path-diagram">
      <svg
        className="kickoff-path-svg"
        viewBox={`0 0 ${projection.width} ${projection.height}`}
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <marker
            id={`${markerId}-arrow-blue`}
            className="kickoff-arrow blue"
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L4,2 L0,4 Z" />
          </marker>
          <marker
            id={`${markerId}-arrow-orange`}
            className="kickoff-arrow orange"
            markerWidth="4"
            markerHeight="4"
            refX="2"
            refY="2"
            orient="auto"
          >
            <path d="M0,0 L4,2 L0,4 Z" />
          </marker>
        </defs>

        <KickoffFieldBackground
          projection={projection}
          showCenter={showCenter}
          showBoosts={showBoosts}
          ballRadius={projection.toUnits(120)}
        />

        {ballPoints ? (
          <polyline
            className="kickoff-ball-path"
            points={ballPoints}
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {paths.map((path) => (
          <g
            key={path.key}
            className={`kickoff-path team-${teamColorClass(path.team)} ${path.groupClassName ?? ""}`}
          >
            <polyline
              className="kickoff-path-line"
              points={path.points}
              markerEnd={showPathArrows ? arrow(path.team) : undefined}
              vectorEffect="non-scaling-stroke"
            />
            {path.startMarker}
          </g>
        ))}

        {/* Where each (non-scoring) player ends up — a quiet little car instead of an
            arrowhead, so the runs read as cars without competing with the touches. */}
        {touches?.map((touch, index) =>
          touch.kind === "endpoint" ? (
            <CarGlyph
              key={`end-${index}`}
              x={touch.at.x}
              y={touch.at.y}
              headingDeg={touch.headingDeg}
              length={carLength * 0.85}
              className={`field-touch-car endpoint team-${teamColorClass(touch.team)}`}
            />
          ) : null,
        )}

        {/* Buildup touches: clearly visible team-coloured cars. */}
        {touches?.map((touch, index) =>
          touch.kind === "buildup" ? (
            <CarGlyph
              key={`buildup-${index}`}
              x={touch.at.x}
              y={touch.at.y}
              headingDeg={touch.headingDeg}
              length={carLength}
              className={`field-touch-car buildup team-${teamColorClass(touch.team)}`}
            />
          ) : null,
        )}

        {ballEnd ? (
          <circle
            className={`kickoff-ball-end ${ballEndClassName ?? ""}`}
            cx={ballEnd.x}
            cy={ballEnd.y}
            r={projection.toUnits(150)}
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {/* The decisive scoring touch is drawn last and biggest, ringed so it pops. */}
        {touches?.map((touch, index) =>
          touch.kind === "scoring" ? (
            <g
              key={`scoring-${index}`}
              className={`field-scoring team-${teamColorClass(touch.team)}`}
            >
              <circle
                className="field-scoring-disc"
                cx={touch.at.x}
                cy={touch.at.y}
                r={carLength * 1.35}
              />
              <circle
                className="field-scoring-ring"
                cx={touch.at.x}
                cy={touch.at.y}
                r={carLength * 1.35}
                vectorEffect="non-scaling-stroke"
              />
              <CarGlyph
                x={touch.at.x}
                y={touch.at.y}
                headingDeg={touch.headingDeg}
                length={carLength * 1.6}
                className={`field-touch-car scoring team-${teamColorClass(touch.team)}`}
              />
            </g>
          ) : null,
        )}
      </svg>
    </div>
  );
}
