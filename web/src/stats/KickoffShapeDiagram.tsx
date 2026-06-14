import type { ReplayModel } from "@rlrml/viewer";
import { useEffect, useId, useMemo, useState } from "react";
import { fieldProjection, type FieldProjection, KickoffFieldBackground } from "./kickoffField";
import { preloadReplayModel } from "./replayModel";
import {
  clampFrame,
  matchPlayer,
  type PathPlayerRef,
  pointsToString,
  sampleBallPath,
  samplePath,
} from "./replayPaths";

export interface KickoffPathPlayer extends PathPlayerRef {
  team: number | null;
  role: "taker" | "support";
}

export interface KickoffShapeDiagramProps {
  replayId: string;
  /** Frame the live action begins (countdown -> 0); paths start here. */
  startFrame: number | null;
  /** Frame the kickoff resolves (first follow-up touch, else the kickoff end); paths end here. */
  endFrame: number | null;
  winningTeam: number | null;
  players: KickoffPathPlayer[];
}

interface ResolvedPath {
  playerName: string;
  team: number;
  role: "taker" | "support";
  isWinner: boolean;
  points: string;
  start: { x: number; y: number } | null;
  end: { x: number; y: number } | null;
}

// How many frames to show past the kickoff start when no follow-up touch frame is
// available, so the diagram still shows a meaningful slice of movement.
const FALLBACK_PATH_FRAMES = 150;
// Resample paths down to at most this many points; kickoff windows are short, but
// this keeps the SVG light if a replay has an unusually high frame rate.
const MAX_PATH_POINTS = 90;

export function KickoffShapeDiagram({
  replayId,
  startFrame,
  endFrame,
  winningTeam,
  players,
}: KickoffShapeDiagramProps) {
  const [replay, setReplay] = useState<ReplayModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const markerId = useId().replace(/:/g, "");

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

  const projection = useMemo(() => fieldProjection(520, 60, "landscape"), []);

  const extracted = useMemo(
    () =>
      replay ? extractPaths(replay, projection, startFrame, endFrame, winningTeam, players) : null,
    [replay, projection, startFrame, endFrame, winningTeam, players],
  );

  if (error) {
    return <div className="kickoff-path-status">Couldn&apos;t load replay paths: {error}</div>;
  }
  if (!replay || !extracted) {
    return <div className="kickoff-path-status">Loading kickoff paths…</div>;
  }

  const { paths, ballPoints, ballEnd } = extracted;

  return (
    <div className="kickoff-path-diagram">
      <svg
        className="kickoff-path-svg"
        viewBox={`0 0 ${projection.width} ${projection.height}`}
        role="img"
        aria-label="Kickoff player paths and ball trajectory"
      >
        <defs>
          <marker
            id={`${markerId}-arrow-blue`}
            className="kickoff-arrow blue"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" />
          </marker>
          <marker
            id={`${markerId}-arrow-orange`}
            className="kickoff-arrow orange"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" />
          </marker>
        </defs>

        <KickoffFieldBackground projection={projection} ballRadius={projection.toUnits(120)} />

        {/* Ball trajectory through the kickoff, up to its resolution (follow-up touch or kickoff end). */}
        {ballPoints ? (
          <polyline
            className="kickoff-ball-path"
            points={ballPoints}
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        {ballEnd ? (
          <circle
            className="kickoff-ball-end"
            cx={ballEnd.x}
            cy={ballEnd.y}
            r={projection.toUnits(150)}
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {paths.map((path, index) => (
          <g
            key={`${path.playerName}-${index}`}
            className={`kickoff-path team-${path.team === 0 ? "blue" : "orange"} ${path.role} ${path.isWinner ? "winner" : ""}`}
          >
            <polyline
              className="kickoff-path-line"
              points={path.points}
              markerEnd={`url(#${markerId}-arrow-${path.team === 0 ? "blue" : "orange"})`}
              vectorEffect="non-scaling-stroke"
            />
            {path.start ? (
              <g className="kickoff-path-start">
                <circle
                  cx={path.start.x}
                  cy={path.start.y}
                  r={projection.toUnits(path.role === "taker" ? 320 : 240)}
                  vectorEffect="non-scaling-stroke"
                />
                <text x={path.start.x} y={path.start.y + projection.toUnits(120)}>
                  {path.role === "taker" ? "T" : "S"}
                </text>
              </g>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}

function extractPaths(
  replay: ReplayModel,
  projection: FieldProjection,
  startFrame: number | null,
  endFrame: number | null,
  winningTeam: number | null,
  players: KickoffPathPlayer[],
): { paths: ResolvedPath[]; ballPoints: string | null; ballEnd: { x: number; y: number } | null } {
  const frameCount = replay.frames.length;
  const from = clampFrame(startFrame ?? 0, frameCount);
  const rawEnd = endFrame ?? from + FALLBACK_PATH_FRAMES;
  const to = clampFrame(Math.max(rawEnd, from + 2), frameCount);

  const paths: ResolvedPath[] = [];
  for (const track of replay.players) {
    const meta = matchPlayer(track, players);
    const team = meta?.team ?? (track.isTeamZero ? 0 : 1);
    const points = samplePath(track, from, to, projection, MAX_PATH_POINTS);
    if (points.length < 2) continue;
    paths.push({
      playerName: meta?.playerName ?? track.name,
      team,
      role: meta?.role ?? "support",
      isWinner: winningTeam != null && team === winningTeam,
      points: pointsToString(points),
      start: points[0],
      end: points[points.length - 1],
    });
  }
  // Takers drawn last (on top), winner emphasized via CSS.
  paths.sort((a, b) => Number(a.role === "taker") - Number(b.role === "taker"));

  const ball = sampleBallPath(replay, from, to, projection, MAX_PATH_POINTS);
  return {
    paths,
    ballPoints: ball.length >= 2 ? pointsToString(ball) : null,
    ballEnd: ball.length ? ball[ball.length - 1] : null,
  };
}
