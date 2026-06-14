import type { ReplayModel } from "@rlrml/viewer";
import { useMemo } from "react";
import {
  contactToMark,
  detectBallContacts,
  FieldDiagramSurface,
  type FieldDiagramModel,
  type SurfacePath,
  type TouchMark,
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

export interface GoalPathPlayer extends PathPlayerRef {
  team: number | null;
  /** The scorer's path is emphasized the way the kickoff winner's is. */
  isScorer: boolean;
}

export interface GoalShapeDiagramProps {
  replayId: string;
  /** Start of the buildup window (a few seconds before the goal); paths start here. */
  startFrame: number | null;
  /** Frame the scorer last touches the ball; paths end here and the scoring touch lands. */
  goalFrame: number | null;
  players: GoalPathPlayer[];
}

// Frames of buildup to show before the goal when no explicit start frame is given.
// Replay tracks sample at ~30Hz, so this is roughly a five-second lead-in — long
// enough to read the developing play without crowding the diagram.
const FALLBACK_BUILDUP_FRAMES = 150;
// Goal windows run longer than kickoffs, so allow a few more points per path.
const MAX_PATH_POINTS = 120;

export function GoalShapeDiagram({
  replayId,
  startFrame,
  goalFrame,
  players,
}: GoalShapeDiagramProps) {
  const { replay, error } = useReplayModel(replayId);
  const projection = useMemo(() => fieldProjection(520, 60, "landscape"), []);

  const model = useMemo(
    () => (replay ? buildGoalModel(replay, projection, startFrame, goalFrame, players) : null),
    [replay, projection, startFrame, goalFrame, players],
  );

  if (error) {
    return <div className="kickoff-path-status">Couldn&apos;t load replay paths: {error}</div>;
  }
  if (!model) {
    return <div className="kickoff-path-status">Loading goal paths…</div>;
  }

  return (
    <FieldDiagramSurface
      projection={projection}
      ariaLabel="Goal buildup player paths and ball trajectory"
      showCenter={false}
      showBoosts={false}
      model={model}
    />
  );
}

function buildGoalModel(
  replay: ReplayModel,
  projection: FieldProjection,
  startFrame: number | null,
  goalFrame: number | null,
  players: GoalPathPlayer[],
): FieldDiagramModel {
  const frameCount = replay.frames.length;
  const end = clampFrame(goalFrame ?? frameCount - 1, frameCount);
  const rawStart = startFrame ?? end - FALLBACK_BUILDUP_FRAMES;
  const from = clampFrame(Math.min(rawStart, end - 2), frameCount);

  const paths: SurfacePath[] = [];
  let scorerIndex = -1;
  replay.players.forEach((track, index) => {
    const meta = matchPlayer(track, players);
    const team = meta?.team ?? (track.isTeamZero ? 0 : 1);
    const isScorer = meta?.isScorer ?? false;
    if (isScorer) scorerIndex = index;
    const points = samplePath(track, from, end, projection, MAX_PATH_POINTS);
    if (points.length < 2) return;
    // No start dot: a circle at each run's start reads as a touch and is confusing.
    // The only marked points are real touches (the cars) and the ball end.
    paths.push({
      key: `${meta?.playerName ?? track.name}-${index}`,
      team,
      groupClassName: isScorer ? "winner scorer" : "",
      points: pointsToString(points),
    });
  });
  // Scorer drawn last (on top), emphasized via CSS.
  paths.sort(
    (a, b) =>
      Number(a.groupClassName?.includes("scorer")) - Number(b.groupClassName?.includes("scorer")),
  );

  // The decisive scoring touch is the scorer's car at the last-touch frame.
  const touches: TouchMark[] = detectBallContacts(replay, from, end, projection, {
    excludeFrame: end,
  });
  if (scorerIndex >= 0) {
    const scoring = contactToMark(replay, end, scorerIndex, projection, "scoring");
    if (scoring) touches.push(scoring);
  }

  const ball = sampleBallPath(replay, from, end, projection, MAX_PATH_POINTS);
  return {
    paths,
    ballPoints: ball.length >= 2 ? pointsToString(ball) : null,
    ballEnd: ball.length ? ball[ball.length - 1] : null,
    ballEndClassName: "goal-ball-end",
    touches,
  };
}
