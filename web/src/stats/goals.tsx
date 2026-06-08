import { ExternalLink, Gauge, Goal, type LucideIcon, Timer, Trophy, Wind } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";

export const goalEventTypes = ["goal_context"];

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
  buildup: string | null;
  types: GoalType[];
}

interface GoalsSummary {
  total: number;
  blue: number;
  orange: number;
  fastest: number | null;
  averageSpeed: number | null;
}

export function GoalsDetail({ events, durationSeconds, replayId }: GoalsDetailProps) {
  const goals = useMemo(() => buildGoalRows(events), [events]);
  const summary = useMemo(() => buildSummary(goals), [goals]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const selectedGoal = goals.find((goal) => goal.event.id === selectedGoalId) ?? goals[0] ?? null;

  const frameRef = useRef<HTMLIFrameElement>(null);
  const reviewUrl = useMemo(() => subtrActorGoalsReviewUrl(replayId), [replayId]);

  const activateClip = useCallback((index: number) => {
    const frame = frameRef.current?.contentWindow;
    if (!frame) return;
    // Handled by the subtr-actor player's postMessage listener; ignored by older builds.
    frame.postMessage({ source: "rocket-sense", type: "activateReviewItem", index }, window.location.origin);
  }, []);

  const selectGoal = useCallback(
    (goal: GoalRow) => {
      setSelectedGoalId(goal.event.id);
      activateClip(goal.index);
    },
    [activateClip],
  );

  return (
    <div className="goals-detail kickoff-detail">
      <section className="kickoff-hero">
        <div>
          <p className="eyebrow">Goal report</p>
          <h2>Goals</h2>
          <p>
            {goals.length
              ? goalReportSentence(summary)
              : "No goals have been indexed for this replay yet."}
          </p>
        </div>
        <div className="kickoff-hero-metrics">
          <GoalMetric icon={Goal} label="Goals" value={summary.total.toLocaleString()} />
          <GoalMetric icon={Trophy} label="Blue" value={summary.blue.toLocaleString()} />
          <GoalMetric icon={Trophy} label="Orange" value={summary.orange.toLocaleString()} />
          <GoalMetric icon={Gauge} label="Top speed" value={formatSpeed(summary.fastest)} />
        </div>
      </section>

      {goals.length ? (
        <div className="stat-section-grid">
          <section className="chart-panel full-span">
            <div className="kickoff-preview">
              <div className="kickoff-preview-copy">
                <div className="chart-panel-header">
                  <div>
                    <h3>Goal preview</h3>
                    <span>
                      {selectedGoal
                        ? `Goal ${selectedGoal.index + 1} — ${selectedGoal.scorerName} at ${formatSeconds(selectedGoal.time)}`
                        : "Hover or select a goal below"}
                    </span>
                  </div>
                  <a className="secondary-button" href={`/replays/${encodeURIComponent(replayId)}/player`}>
                    <ExternalLink size={15} />
                    Open player
                  </a>
                </div>
                {selectedGoal ? <SelectedGoalSummary goal={selectedGoal} /> : null}
                <p className="goal-preview-hint">Hover a goal to scrub its clip in the player.</p>
              </div>
              <iframe
                ref={frameRef}
                className="kickoff-preview-frame"
                title="Goal replay preview"
                src={reviewUrl}
              />
            </div>
          </section>

          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Goal flow</h3>
                <span>{durationSeconds ? `Spread across ${formatSeconds(durationSeconds)}` : "Ordered by game clock"}</span>
              </div>
            </div>
            <GoalFlow goals={goals} durationSeconds={durationSeconds} selectedId={selectedGoal?.event.id ?? null} onSelect={selectGoal} onHover={activateClip} />
          </section>

          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Goal by goal</h3>
                <span>Scorer, scoring team, ball speed, air time, and detected goal types.</span>
              </div>
            </div>
            <div className="goal-card-list kickoff-card-list">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.event.id}
                  goal={goal}
                  selected={goal.event.id === selectedGoal?.event.id}
                  onSelect={() => selectGoal(goal)}
                  onHover={() => activateClip(goal.index)}
                />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="stat-empty">No goal events are available for this replay yet.</div>
      )}
    </div>
  );
}

function GoalMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="kickoff-metric">
      <Icon size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SelectedGoalSummary({ goal }: { goal: GoalRow }) {
  return (
    <div className="selected-kickoff-summary">
      <GoalFact icon={Trophy} label="Scored by" value={goal.scorerName} team={goal.scoringTeam} />
      <GoalFact icon={Timer} label="Game clock" value={formatSeconds(goal.time)} team={null} />
      <GoalFact icon={Gauge} label="Ball speed" value={formatSpeed(goal.ballSpeed)} team={null} />
      <GoalFact icon={Wind} label="Air time" value={goal.airTime == null ? "-" : `${goal.airTime.toFixed(1)}s`} team={null} />
    </div>
  );
}

function GoalFact({ icon: Icon, label, value, team }: { icon: LucideIcon; label: string; value: string; team: number | null }) {
  return (
    <div className={`kickoff-fact team-soft-${teamClass(team)}`}>
      <Icon size={15} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function GoalFlow({
  goals,
  durationSeconds,
  selectedId,
  onSelect,
  onHover,
}: {
  goals: GoalRow[];
  durationSeconds: number | null;
  selectedId: string | null;
  onSelect: (goal: GoalRow) => void;
  onHover: (index: number) => void;
}) {
  const maxTime = Math.max(durationSeconds ?? 0, ...goals.map((goal) => goal.time ?? 0), 1);

  return (
    <div className="kickoff-flow" aria-label="Goal timeline">
      <div className="kickoff-flow-track">
        {goals.map((goal) => {
          const position = Math.max(0, Math.min(100, ((goal.time ?? 0) / maxTime) * 100));
          return (
            <button
              type="button"
              key={goal.event.id}
              className={`kickoff-flow-marker goal-flow-marker team-marker-${teamClass(goal.scoringTeam)} ${goal.event.id === selectedId ? "selected" : ""}`}
              style={{ left: `${position}%` }}
              title={`Goal ${goal.index + 1}: ${goal.scorerName} (${teamLabel(goal.scoringTeam)}) at ${formatSeconds(goal.time)}`}
              onClick={() => onSelect(goal)}
              onMouseEnter={() => onHover(goal.index)}
            >
              {goal.index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GoalCard({
  goal,
  selected,
  onSelect,
  onHover,
}: {
  goal: GoalRow;
  selected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <button
      type="button"
      className={`goal-card kickoff-card winner-${teamClass(goal.scoringTeam)} ${selected ? "selected" : ""}`}
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
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
        {goal.buildup ? <span>{formatLabel(goal.buildup)}</span> : null}
      </div>
    </button>
  );
}

function goalReportSentence(summary: GoalsSummary): string {
  const lead =
    summary.blue === summary.orange
      ? `${summary.total} goals, evenly split`
      : summary.blue > summary.orange
        ? `${summary.total} goals, Blue ahead ${summary.blue}-${summary.orange}`
        : `${summary.total} goals, Orange ahead ${summary.orange}-${summary.blue}`;
  const speed = summary.fastest != null ? `, hardest hit ${formatSpeed(summary.fastest)}` : "";
  return `${lead}${speed}.`;
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
        buildup: stringField(payload, "goal_buildup"),
        types: goalTypes(payload),
      };
    });
}

function goalTime(event: MechanicEventResponse): number | null {
  if (event.event_time != null) return event.event_time;
  if (event.start_time != null) return event.start_time;
  const payload = (event.payload ?? {}) as Record<string, unknown>;
  return numberField(payload, "time");
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

function buildSummary(goals: GoalRow[]): GoalsSummary {
  const speeds = goals.map((goal) => goal.ballSpeed).filter((speed): speed is number => speed != null);
  return {
    total: goals.length,
    blue: goals.filter((goal) => goal.scoringTeam === 0).length,
    orange: goals.filter((goal) => goal.scoringTeam === 1).length,
    fastest: speeds.length ? Math.max(...speeds) : null,
    averageSpeed: speeds.length ? speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length : null,
  };
}

function subtrActorGoalsReviewUrl(replayId: string): string {
  const manifestParams = new URLSearchParams({ "replay-id": replayId });
  for (const eventType of goalEventTypes) {
    manifestParams.append("event-type", eventType);
  }
  const manifestUrl = `/api/v1/events/review-playlist?${manifestParams.toString()}`;
  return `/subtr-actor/?reviewPlaylist=${encodeURIComponent(manifestUrl)}`;
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

function numberField(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
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
