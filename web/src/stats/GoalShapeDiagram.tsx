import type { ReplayModel } from "@rlrml/viewer";
import { useMemo } from "react";
import {
  contactToMark,
  detectBallContacts,
  FieldDiagramSurface,
  type FieldDiagramModel,
  Fledge,
  type SurfacePath,
  teamColorClass,
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
    // No start dot (reads as a touch). The run ends in an arrow fledge pointing the
    // way the player was travelling; the only circles are real touches.
    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    const endHeadingDeg = (Math.atan2(last.y - prev.y, last.x - prev.x) * 180) / Math.PI;
    paths.push({
      key: `${meta?.playerName ?? track.name}-${index}`,
      team,
      groupClassName: isScorer ? "winner scorer" : "",
      points: pointsToString(points),
      endMarker: (
        <Fledge
          x={last.x}
          y={last.y}
          headingDeg={endHeadingDeg}
          size={projection.toUnits(240)}
          className={`field-fledge team-${teamColorClass(team)}`}
        />
      ),
    });
  });
  // Scorer drawn last (on top), emphasized via CSS.
  paths.sort(
    (a, b) =>
      Number(a.groupClassName?.includes("scorer")) - Number(b.groupClassName?.includes("scorer")),
  );

  // Buildup contacts (passes/dribbles), in chronological order.
  const buildup = detectBallContacts(replay, from, end, projection, { excludeFrame: end });

  // The decisive scoring touch uses subtr-actor's exact recorded contact point
  // (scorer_last_touch.ball_position), not a frame lookup — the latter lands on the
  // scorer's position when the ball crosses the line, which is not the touch. Fall
  // back to the scorer's final-frame position only if the payload lacks it.
  const scoringMark: TouchMark | null = scoringTouch
    ? {
        at: projection.project(scoringTouch.ball.x, scoringTouch.ball.y),
        team: scoringTouch.team ?? scorerTeam,
        headingDeg: null,
        kind: "scoring",
      }
    : scorerIndex >= 0
      ? contactToMark(replay, end, scorerIndex, projection, "scoring")
      : null;

  // Drop the scorer's own last contact if proximity detection already surfaced it
  // near the scoring point, so it isn't both a numbered buildup dot and the finish.
  const minSep = projection.toUnits(350);
  const buildupTouches =
    scoringMark != null
      ? buildup.filter(
          (b) => Math.hypot(b.at.x - scoringMark.at.x, b.at.y - scoringMark.at.y) > minSep,
        )
      : buildup;

  // Number them in contact order; the scoring touch is the last number.
  const touches: TouchMark[] = [];
  buildupTouches.forEach((touch, i) => {
    touch.num = i + 1;
    touches.push(touch);
  });
  if (scoringMark) {
    scoringMark.num = buildupTouches.length + 1;
    touches.push(scoringMark);
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
