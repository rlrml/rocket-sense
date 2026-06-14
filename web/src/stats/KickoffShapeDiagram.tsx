import type { ReplayModel } from "@rlrml/viewer";
import { useMemo } from "react";
import {
  FieldDiagramSurface,
  type FieldDiagramModel,
  type SurfacePath,
  useReplayModel,
} from "./fieldDiagram";
import { fieldProjection, type FieldProjection } from "./kickoffField";
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
  const { replay, error } = useReplayModel(replayId);
  const projection = useMemo(() => fieldProjection(520, 60, "landscape"), []);

  const model = useMemo(
    () =>
      replay
        ? buildKickoffModel(replay, projection, startFrame, endFrame, winningTeam, players)
        : null,
    [replay, projection, startFrame, endFrame, winningTeam, players],
  );

  if (error) {
    return <div className="kickoff-path-status">Couldn&apos;t load replay paths: {error}</div>;
  }
  if (!model) {
    return <div className="kickoff-path-status">Loading kickoff paths…</div>;
  }

  return (
    <FieldDiagramSurface
      projection={projection}
      ariaLabel="Kickoff player paths and ball trajectory"
      model={model}
    />
  );
}

function buildKickoffModel(
  replay: ReplayModel,
  projection: FieldProjection,
  startFrame: number | null,
  endFrame: number | null,
  winningTeam: number | null,
  players: KickoffPathPlayer[],
): FieldDiagramModel {
  const frameCount = replay.frames.length;
  const from = clampFrame(startFrame ?? 0, frameCount);
  const rawEnd = endFrame ?? from + FALLBACK_PATH_FRAMES;
  const to = clampFrame(Math.max(rawEnd, from + 2), frameCount);

  const paths: SurfacePath[] = [];
  for (const track of replay.players) {
    const meta = matchPlayer(track, players);
    const team = meta?.team ?? (track.isTeamZero ? 0 : 1);
    const role = meta?.role ?? "support";
    const isWinner = winningTeam != null && team === winningTeam;
    const points = samplePath(track, from, to, projection, MAX_PATH_POINTS);
    if (points.length < 2) continue;
    const start = points[0];
    paths.push({
      key: `${meta?.playerName ?? track.name}-${track.id}`,
      team,
      groupClassName: `${role} ${isWinner ? "winner" : ""}`,
      points: pointsToString(points),
      startMarker: (
        <g className="kickoff-path-start">
          <circle
            cx={start.x}
            cy={start.y}
            r={projection.toUnits(role === "taker" ? 320 : 240)}
            vectorEffect="non-scaling-stroke"
          />
          <text x={start.x} y={start.y + projection.toUnits(120)}>
            {role === "taker" ? "T" : "S"}
          </text>
        </g>
      ),
    });
  }
  // Takers drawn last (on top), winner emphasized via CSS.
  paths.sort(
    (a, b) =>
      Number(a.groupClassName?.includes("taker")) - Number(b.groupClassName?.includes("taker")),
  );

  const ball = sampleBallPath(replay, from, to, projection, MAX_PATH_POINTS);
  return {
    paths,
    ballPoints: ball.length >= 2 ? pointsToString(ball) : null,
    ballEnd: ball.length ? ball[ball.length - 1] : null,
  };
}
