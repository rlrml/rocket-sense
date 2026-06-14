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
  /** subtr-actor touch id, so the matching buildup touch event can be de-duped. */
  touchId: number | null;
}

/** A real attributed buildup touch from a subtr-actor `touch` event — accurate
 *  (both sides of a 50/50 each get one) where the proximity heuristic guessed. */
export interface GoalBuildupTouch {
  /** The toucher's car position (uu) at the touch. */
  at: { x: number; y: number };
  /** team_is_team_0 from the event (null on older data without it). */
  teamHint: number | null;
  /** subtr-actor frame, for chronological ordering / numbering / team resolution. */
  frame: number;
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
  /** Real attributed buildup touches (subtr-actor `touch` events) in the window.
   *  When null we fall back to the proximity heuristic. */
  buildupTouches: GoalBuildupTouch[] | null;
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
  buildupTouches,
  players,
}: GoalShapeDiagramProps) {
  const { replay, error } = useReplayModel(replayId);
  const projection = useMemo(() => fieldProjection(520, 60, "landscape"), []);

  const model = useMemo(
    () =>
      replay
        ? buildGoalModel(
            replay,
            projection,
            startFrame,
            goalFrame,
            scoringTouch,
            buildupTouches,
            players,
          )
        : null,
    [replay, projection, startFrame, goalFrame, scoringTouch, buildupTouches, players],
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

/** Team of the car nearest a field-space (uu) point at `frame` — used to colour a
 *  touch when the event itself doesn't carry the team. */
function nearestPlayerTeam(
  replay: ReplayModel,
  frame: number,
  at: { x: number; y: number },
): number {
  let bestSq = Infinity;
  let team = 0;
  for (const track of replay.players) {
    const pos = track.frames[frame]?.position;
    if (!pos) continue;
    const dx = pos.x - at.x;
    const dy = pos.y - at.y;
    const d = dx * dx + dy * dy;
    if (d < bestSq) {
      bestSq = d;
      team = track.isTeamZero ? 0 : 1;
    }
  }
  return team;
}

function buildGoalModel(
  replay: ReplayModel,
  projection: FieldProjection,
  startFrame: number | null,
  goalFrame: number | null,
  scoringTouch: GoalScoringTouch | null,
  buildupTouches: GoalBuildupTouch[] | null,
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

  // Prefer the real attributed touch events (the scoring touch is already excluded
  // upstream by id, so we keep every other contact — both sides of a 50/50). Only
  // when no touch data is available fall back to the proximity heuristic, which then
  // needs a position de-dup to avoid drawing the scorer's own last contact twice.
  let buildupMarks: TouchMark[];
  if (buildupTouches) {
    buildupMarks = [...buildupTouches]
      .sort((a, b) => a.frame - b.frame)
      .map((t) => ({
        // team_is_team_0 is missing on older replays, so fall back to whichever car
        // sits on the touch point at that frame (player_position is that car).
        at: projection.project(t.at.x, t.at.y),
        team: t.teamHint ?? nearestPlayerTeam(replay, t.frame, t.at),
        headingDeg: null,
        kind: "buildup" as const,
      }));
  } else {
    const detected = detectBallContacts(replay, from, end, projection, { excludeFrame: end });
    const minSep = projection.toUnits(350);
    buildupMarks =
      scoringMark != null
        ? detected.filter(
            (b) => Math.hypot(b.at.x - scoringMark.at.x, b.at.y - scoringMark.at.y) > minSep,
          )
        : detected;
  }

  // Number them in contact order; the scoring touch is the last number.
  const touches: TouchMark[] = [];
  buildupMarks.forEach((touch, i) => {
    touch.num = i + 1;
    touches.push(touch);
  });
  if (scoringMark) {
    scoringMark.num = buildupMarks.length + 1;
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
