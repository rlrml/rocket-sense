import { lazy, Suspense, useCallback, useMemo } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import type { EventClip } from "./EventClipPlayer";
import type { GoalTouchLocation } from "./GoalTouchMap";
import {
  eventAnchorFrame,
  eventDisplayTime,
  numberField,
  useEventPreviewSelection,
} from "./eventPreview";

export const goalEventTypes = ["goal_context"];

// Seconds of context shown around each goal when previewing its clip.
const GOAL_CLIP_PREROLL_SECONDS = 6;
const GOAL_CLIP_POSTROLL_SECONDS = 2.5;

// Lazily loaded so the three.js / wasm replay player is only fetched when the
// Goals tab is actually opened, instead of bloating the main bundle.
const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);
const GoalTouchMap = lazy(() =>
  import("./GoalTouchMap").then((module) => ({ default: module.GoalTouchMap })),
);

interface GoalsDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  replayId: string;
}

interface GoalType {
  key: string;
  label: string;
  confidence: number | null;
}

interface GoalRow {
  event: MechanicEventResponse;
  index: number;
  time: number | null;
  scorerName: string;
  scoringTeam: number | null;
  ballSpeed: number | null;
  airTime: number | null;
  anchorFrame: number | null;
  touchPosition: GoalTouchLocation["position"] | null;
  types: GoalType[];
}

export function GoalsDetail({ events, replayId }: GoalsDetailProps) {
  const goals = useMemo(() => buildGoalRows(events), [events]);
  const goalKey = useCallback((goal: GoalRow) => goal.event.id, []);
  const buildClip = useCallback((goal: GoalRow, replayNonce: number): EventClip | null => {
    if (goal.time == null) {
      return null;
    }
    return {
      start: Math.max(0, goal.time - GOAL_CLIP_PREROLL_SECONDS),
      end: goal.time + GOAL_CLIP_POSTROLL_SECONDS,
      anchorFrame: goal.anchorFrame,
      prerollSeconds: GOAL_CLIP_PREROLL_SECONDS,
      postrollSeconds: GOAL_CLIP_POSTROLL_SECONDS,
      camera: (cam) => {
        if (!cam.followPlayer({ playerName: goal.scorerName, ballCam: true })) {
          cam.freeCamera("side");
        }
      },
      key: `${goal.event.id}:${replayNonce}`,
    };
  }, []);

  const {
    activeItem: activeGoal,
    activeKey: activeId,
    clip,
    activateItem: activateGoal,
  } = useEventPreviewSelection(goals, goalKey, buildClip);
  const touchLocations = useMemo(() => goalTouchLocations(goals), [goals]);
  const activateGoalById = useCallback(
    (goalId: string, force: boolean) => {
      const goal = goals.find((candidate) => candidate.event.id === goalId);
      if (goal) {
        activateGoal(goal, force);
      }
    },
    [activateGoal, goals],
  );

  return (
    <div className="goals-detail kickoff-detail">
      {goals.length ? (
        <div className="stat-section-grid">
          {touchLocations.length ? (
            <section className="chart-panel full-span goal-touch-panel">
              <div className="chart-panel-header">
                <div>
                  <h3>Scoring touches</h3>
                </div>
              </div>
              <Suspense fallback={<div className="goal-touch-map-skeleton" />}>
                <GoalTouchMap
                  goals={touchLocations}
                  activeId={activeId}
                  onActivate={activateGoalById}
                />
              </Suspense>
            </section>
          ) : null}

          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Goal by goal</h3>
              </div>
            </div>
            <div className="goal-card-list kickoff-card-list">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.event.id}
                  goal={goal}
                  active={goal.event.id === activeId}
                  onActivate={(force) => activateGoal(goal, force)}
                />
              ))}
            </div>
          </section>

          <Suspense
            fallback={
              <aside className="event-preview-pip">
                <div className="event-preview-pip-bar">
                  <span className="event-preview-pip-label">Loading…</span>
                </div>
                <div className="event-clip-player">
                  <div className="event-clip-status">Loading player…</div>
                </div>
              </aside>
            }
          >
            <EventClipPreview
              replayId={replayId}
              clip={clip}
              label={
                activeGoal
                  ? `Goal ${activeGoal.index + 1} · ${activeGoal.scorerName} · ${formatSeconds(activeGoal.time)}`
                  : "Loading…"
              }
              openHref={`/replays/${encodeURIComponent(replayId)}/player`}
              showDebug={false}
            />
          </Suspense>
        </div>
      ) : (
        <div className="stat-empty">No goal events are available for this replay yet.</div>
      )}
    </div>
  );
}

function GoalCard({
  goal,
  active,
  onActivate,
}: {
  goal: GoalRow;
  active: boolean;
  onActivate: (force: boolean) => void;
}) {
  return (
    <button
      type="button"
      className={`goal-card kickoff-card winner-${teamClass(goal.scoringTeam)} ${active ? "selected" : ""}`}
      onClick={() => onActivate(true)}
      onMouseEnter={() => onActivate(false)}
      onFocus={() => onActivate(false)}
    >
      <div className="kickoff-card-header">
        <div className="goal-card-heading">
          <span className={`goal-card-index team-chip-${teamClass(goal.scoringTeam)}`}>{goal.index + 1}</span>
          <h4>{goal.scorerName}</h4>
          <span className={`kickoff-goal-chip team-chip-${teamClass(goal.scoringTeam)}`}>{teamLabel(goal.scoringTeam)}</span>
        </div>
        <strong>{formatSeconds(goal.time)}</strong>
      </div>
      <div className="goal-card-types">
        {goal.types.length ? (
          goal.types.map((type) => (
            <span className="goal-type-chip" key={type.key} title={type.confidence == null ? type.label : `${type.label} — ${(type.confidence * 100).toFixed(0)}% confidence`}>
              {type.label}
            </span>
          ))
        ) : (
          <span className="goal-type-chip muted">Standard goal</span>
        )}
      </div>
      <div className="goal-card-stats">
        <span>{formatSpeed(goal.ballSpeed)}</span>
        <span>{goal.airTime == null ? "Ground" : `${goal.airTime.toFixed(1)}s air`}</span>
      </div>
    </button>
  );
}

function buildGoalRows(events: MechanicEventResponse[]): GoalRow[] {
  return events
    .filter((event) => event.event_type === "goal_context")
    .map((event) => ({ event, sortKey: goalTime(event) ?? 0 }))
    .sort((left, right) => left.sortKey - right.sortKey || left.event.id.localeCompare(right.event.id))
    .map(({ event }, index) => {
      const payload = (event.payload ?? {}) as Record<string, unknown>;
      return {
        event,
        index,
        time: goalTime(event),
        scorerName: event.player_name?.trim() || "Unknown scorer",
        scoringTeam: event.team ?? teamField(payload, "scoring_team_is_team_0"),
        ballSpeed: numberField(payload, "ball_speed_at_goal"),
        airTime: numberField(payload, "ball_air_time_before_goal"),
        anchorFrame: eventAnchorFrame(event, ["scorer_last_touch.frame"]),
        touchPosition: goalTouchPosition(payload),
        types: goalTypes(payload),
      };
    });
}

function goalTime(event: MechanicEventResponse): number | null {
  return eventDisplayTime(event);
}

function goalTypes(payload: Record<string, unknown>): GoalType[] {
  return arrayField(payload, "tags").map((tag) => {
    const key = stringField(tag, "kind") ?? "goal";
    const metadata = objectField(tag, "metadata") ?? {};
    return {
      key,
      label: formatLabel(key.replace(/_goal$/, "")) || "Goal",
      confidence: numberField(metadata, "confidence"),
    };
  });
}

function goalTouchLocations(goals: GoalRow[]): GoalTouchLocation[] {
  return goals.flatMap((goal) =>
    goal.touchPosition
      ? [
          {
            id: goal.event.id,
            index: goal.index,
            scorerName: goal.scorerName,
            team: goal.scoringTeam,
            time: goal.time,
            position: goal.touchPosition,
          },
        ]
      : [],
  );
}

function goalTouchPosition(payload: Record<string, unknown>): GoalTouchLocation["position"] | null {
  const scorerLastTouch = objectField(payload, "scorer_last_touch");
  return positionField(scorerLastTouch, "ball_position") ?? positionField(payload, "ball_position");
}

function positionField(payload: Record<string, unknown> | null, key: string): GoalTouchLocation["position"] | null {
  if (!payload) return null;
  const value = objectField(payload, key);
  if (!value) return null;
  const x = numberField(value, "x");
  const y = numberField(value, "y");
  const z = numberField(value, "z");
  return x == null || y == null || z == null ? null : { x, y, z };
}

function objectField(payload: Record<string, unknown>, key: string): Record<string, unknown> | null {
  const value = payload[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function arrayField(payload: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = payload[key];
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item))
    : [];
}

function stringField(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" ? value : null;
}

function booleanField(payload: Record<string, unknown>, key: string): boolean | null {
  const value = payload[key];
  return typeof value === "boolean" ? value : null;
}

function teamField(payload: Record<string, unknown>, key: string): number | null {
  const value = booleanField(payload, key);
  return value == null ? null : value ? 0 : 1;
}

function teamClass(team: number | null): string {
  return team === 0 ? "blue" : team === 1 ? "orange" : "neutral";
}

function teamLabel(team: number | null): string {
  return team === 0 ? "Blue" : team === 1 ? "Orange" : "Neutral";
}

function formatLabel(value: string | null): string {
  if (!value) return "";
  return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatSeconds(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  const tenths = value < 10 ? `.${Math.round((value % 1) * 10)}` : "";
  return `${minutes}:${seconds.toString().padStart(2, "0")}${tenths}`;
}

function formatSpeed(value: number | null): string {
  return value == null ? "-" : `${Math.round(value).toLocaleString()} uu/s`;
}
