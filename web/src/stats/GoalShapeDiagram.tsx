import type { ReplayModel } from "@rlrml/viewer";
import { useMemo } from "react";
import {
  contactToMark,
  detectBallContacts,
  FieldDiagramSurface,
  type FieldDiagramModel,
  projectHeadingDeg,
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

/** Field-space (uu) coordinates of the decisive scoring touch, straight from
 *  subtr-actor's `scorer_last_touch` — the exact contact point, not a frame lookup. */
export interface GoalScoringTouch {
  /** Ball position at the moment of the last touch (the touch point itself). */
  ball: { x: number; y: number };
  /** Scorer's car position at that moment, if known (used to orient the car). */
  player: { x: number; y: number } | null;
  team: number | null;
}

export interface GoalShapeDiagramProps {
  replayId: string;
  /** Start of the buildup window (a few seconds before the goal); paths start here. */
  startFrame: number | null;
  /** Frame the ball crosses the line; paths end here and the ball marker lands. */
  goalFrame: number | null;
  /** Exact scoring-touch coordinate from the goal payload (preferred over deriving
   *  it from a frame, which lands on the scorer's position at goal time, not the touch). */
  scoringTouch: GoalScoringTouch | null;
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
  scoringTouch,
  players,
}: GoalShapeDiagramProps) {
  const { replay, error } = useReplayModel(replayId);
  const projection = useMemo(() => fieldProjection(520, 60, "landscape"), []);

  const model = useMemo(
    () =>
      replay
        ? buildGoalModel(replay, projection, startFrame, goalFrame, scoringTouch, players)
        : null,
    [replay, projection, startFrame, goalFrame, scoringTouch, players],
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
      showPathArrows={false}
      model={model}
    />
  );
}

function buildGoalModel(
  replay: ReplayModel,
  projection: FieldProjection,
  startFrame: number | null,
  goalFrame: number | null,
  scoringTouch: GoalScoringTouch | null,
  players: GoalPathPlayer[],
): FieldDiagramModel {
  const frameCount = replay.frames.length;
  const end = clampFrame(goalFrame ?? frameCount - 1, frameCount);
  const rawStart = startFrame ?? end - FALLBACK_BUILDUP_FRAMES;
  const from = clampFrame(Math.min(rawStart, end - 2), frameCount);

  const paths: SurfacePath[] = [];
  let scorerIndex = -1;
  let scorerTeam = 0;
  const shownIndices: number[] = [];
  replay.players.forEach((track, index) => {
    const meta = matchPlayer(track, players);
    const team = meta?.team ?? (track.isTeamZero ? 0 : 1);
    const isScorer = meta?.isScorer ?? false;
    if (isScorer) {
      scorerIndex = index;
      scorerTeam = team;
    }
    const points = samplePath(track, from, end, projection, MAX_PATH_POINTS);
    if (points.length < 2) return;
    shownIndices.push(index);
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

  // Buildup contacts (passes/dribbles), and a quiet endpoint car for where each
  // non-scoring player ends up (in place of a path arrowhead).
  const touches: TouchMark[] = detectBallContacts(replay, from, end, projection, {
    excludeFrame: end,
  });
  for (const index of shownIndices) {
    if (index === scorerIndex) continue;
    const mark = contactToMark(replay, end, index, projection, "endpoint");
    if (mark) touches.push(mark);
  }

  // The decisive scoring touch uses subtr-actor's exact recorded contact point
  // (scorer_last_touch.ball_position), not a frame lookup — the latter lands on the
  // scorer's position when the ball crosses the line, which is not the touch. Fall
  // back to the scorer's final-frame position only if the payload lacks it.
  const scoringMark = scoringTouch
    ? {
        at: projection.project(scoringTouch.ball.x, scoringTouch.ball.y),
        team: scoringTouch.team ?? scorerTeam,
        headingDeg: scoringTouch.player
          ? projectHeadingDeg(
              projection,
              { ...scoringTouch.player, z: 0 },
              {
                x: scoringTouch.ball.x - scoringTouch.player.x,
                y: scoringTouch.ball.y - scoringTouch.player.y,
                z: 0,
              },
            )
          : null,
        kind: "scoring" as const,
      }
    : scorerIndex >= 0
      ? contactToMark(replay, end, scorerIndex, projection, "scoring")
      : null;
  if (scoringMark) touches.push(scoringMark);

  const ball = sampleBallPath(replay, from, end, projection, MAX_PATH_POINTS);
  return {
    paths,
    ballPoints: ball.length >= 2 ? pointsToString(ball) : null,
    ballEnd: ball.length ? ball[ball.length - 1] : null,
    ballEndClassName: "goal-ball-end",
    touches,
  };
}
