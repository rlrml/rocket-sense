import type { ReplayModel } from "@rlrml/viewer";
import { useEffect, useId, useMemo, useState } from "react";
import { fieldProjection, type FieldProjection, KickoffFieldBackground } from "./kickoffField";
import { preloadReplayModel } from "./replayModel";
import { clampFrame, matchPlayer, type PathPlayerRef, pointsToString, sampleBallPath, samplePath } from "./replayPaths";

export interface GoalPathPlayer extends PathPlayerRef {
  team: number | null;
  /** The scorer's path is emphasized the way the kickoff winner's is. */
  isScorer: boolean;
}

export interface GoalShapeDiagramProps {
  replayId: string;
  /** Start of the buildup window (a few seconds before the goal); paths start here. */
  startFrame: number | null;
  /** Frame the ball crosses the line; paths end here and the ball marker lands. */
  goalFrame: number | null;
  players: GoalPathPlayer[];
}

interface ResolvedPath {
  playerName: string;
  team: number;
  isScorer: boolean;
  points: string;
  start: { x: number; y: number } | null;
  end: { x: number; y: number } | null;
}

// Frames of buildup to show before the goal when no explicit start frame is given.
// Replay tracks sample at ~30Hz, so this is roughly a five-second lead-in — long
// enough to read the developing play without crowding the diagram.
const FALLBACK_BUILDUP_FRAMES = 150;
// Goal windows run longer than kickoffs, so allow a few more points per path.
const MAX_PATH_POINTS = 120;

export function GoalShapeDiagram({ replayId, startFrame, goalFrame, players }: GoalShapeDiagramProps) {
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
    () => (replay ? extractPaths(replay, projection, startFrame, goalFrame, players) : null),
    [replay, projection, startFrame, goalFrame, players],
  );

  if (error) {
    return <div className="kickoff-path-status">Couldn&apos;t load replay paths: {error}</div>;
  }
  if (!replay || !extracted) {
    return <div className="kickoff-path-status">Loading goal paths…</div>;
  }

  const { paths, ballPoints, ballEnd } = extracted;

  return (
    <div className="kickoff-path-diagram">
      <svg
        className="kickoff-path-svg"
        viewBox={`0 0 ${projection.width} ${projection.height}`}
        role="img"
        aria-label="Goal buildup player paths and ball trajectory"
      >
        <defs>
          <marker id={`${markerId}-arrow-blue`} className="kickoff-arrow blue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" />
          </marker>
          <marker id={`${markerId}-arrow-orange`} className="kickoff-arrow orange" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" />
          </marker>
        </defs>

        <KickoffFieldBackground projection={projection} showCenter={false} ballRadius={projection.toUnits(120)} />

        {/* Ball trajectory through the buildup, ending where it crosses the line. */}
        {ballPoints ? <polyline className="kickoff-ball-path" points={ballPoints} vectorEffect="non-scaling-stroke" /> : null}
        {ballEnd ? (
          <circle className="kickoff-ball-end goal-ball-end" cx={ballEnd.x} cy={ballEnd.y} r={projection.toUnits(150)} vectorEffect="non-scaling-stroke" />
        ) : null}

        {paths.map((path, index) => (
          <g
            key={`${path.playerName}-${index}`}
            className={`kickoff-path team-${path.team === 0 ? "blue" : "orange"} ${path.isScorer ? "winner scorer" : ""}`}
          >
            <polyline
              className="kickoff-path-line"
              points={path.points}
              markerEnd={`url(#${markerId}-arrow-${path.team === 0 ? "blue" : "orange"})`}
              vectorEffect="non-scaling-stroke"
            />
            {path.start ? (
              <circle
                className="kickoff-path-start-dot"
                cx={path.start.x}
                cy={path.start.y}
                r={projection.toUnits(path.isScorer ? 220 : 150)}
                vectorEffect="non-scaling-stroke"
              />
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
  goalFrame: number | null,
  players: GoalPathPlayer[],
): { paths: ResolvedPath[]; ballPoints: string | null; ballEnd: { x: number; y: number } | null } {
  const frameCount = replay.frames.length;
  const end = clampFrame(goalFrame ?? frameCount - 1, frameCount);
  const rawStart = startFrame ?? end - FALLBACK_BUILDUP_FRAMES;
  const from = clampFrame(Math.min(rawStart, end - 2), frameCount);

  const paths: ResolvedPath[] = [];
  for (const track of replay.players) {
    const meta = matchPlayer(track, players);
    const team = meta?.team ?? (track.isTeamZero ? 0 : 1);
    const points = samplePath(track, from, end, projection, MAX_PATH_POINTS);
    if (points.length < 2) continue;
    paths.push({
      playerName: meta?.playerName ?? track.name,
      team,
      isScorer: meta?.isScorer ?? false,
      points: pointsToString(points),
      start: points[0],
      end: points[points.length - 1],
    });
  }
  // Scorer drawn last (on top), emphasized via CSS.
  paths.sort((a, b) => Number(a.isScorer) - Number(b.isScorer));

  const ball = sampleBallPath(replay, from, end, projection, MAX_PATH_POINTS);
  return {
    paths,
    ballPoints: ball.length >= 2 ? pointsToString(ball) : null,
    ballEnd: ball.length ? ball[ball.length - 1] : null,
  };
}
