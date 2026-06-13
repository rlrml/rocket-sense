import { lazy, Suspense, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerIdentity, type PlayerIdentityData } from "../playerIdentity";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import type { EventClip } from "./EventClipPlayer";
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
interface GoalsDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds: number | null;
  replayId?: string;
  scope?: "replay" | "group";
}

export interface GoalTypeDetail {
  key: string;
  value: string;
}

export interface GoalType {
  key: string;
  label: string;
  confidence: number | null;
  /** Mechanic flavor shown inside the chip, e.g. "Reverse" on a flick goal. */
  subLabel: string | null;
  details: GoalTypeDetail[];
}

export interface GoalRow {
  event: MechanicEventResponse;
  index: number;
  time: number | null;
  scorerName: string;
  scoringTeam: number | null;
  ballSpeed: number | null;
  pressureBeforeGoal: number | null;
  anchorFrame: number | null;
  types: GoalType[];
}

export function buildGoalClip(goal: GoalRow, replayNonce: number): EventClip | null {
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
}

export function GoalsDetail({ events, players, replayId, scope = "replay" }: GoalsDetailProps) {
  const goals = useMemo(() => buildGoalRows(events), [events]);
  const goalKey = useCallback((goal: GoalRow) => goal.event.id, []);
  const buildClip = useCallback(buildGoalClip, []);
  const goalTypeHref = useCallback(
    (type: GoalType) => replayId ? `/replays/${encodeURIComponent(replayId)}/goals/${encodeURIComponent(type.key)}` : undefined,
    [replayId],
  );

  const {
    activeItem: activeGoal,
    activeKey: activeId,
    clip,
    activateItem: activateGoal,
  } = useEventPreviewSelection(goals, goalKey, buildClip);

  if (scope === "group") {
    return <GroupGoalsDetail goals={goals} players={players} />;
  }

  return (
    <div className="goals-detail kickoff-detail">
      {goals.length ? (
        <div className="stat-section-grid">
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
                  typeHref={goalTypeHref}
                />
              ))}
            </div>
          </section>

          {replayId ? (
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
          ) : null}
        </div>
      ) : (
        <div className="stat-empty">No goal events are available for this selection yet.</div>
      )}
    </div>
  );
}

function GroupGoalsDetail({ goals, players }: { goals: GoalRow[]; players: ReplayPlayer[] }) {
  if (!goals.length) {
    return <div className="stat-empty">No goal events are available for this group yet.</div>;
  }

  return (
    <div className="goals-detail">
      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Scorer leaderboard</h3>
            <span>{goals.length.toLocaleString()} goals</span>
          </header>
          <GoalScorerLeaderboard goals={goals} players={players} />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Goal tag leaderboard</h3>
            <span>Tags that differentiate finishes</span>
          </header>
          <GoalTagLeaderboard goals={goals} />
        </section>
      </div>
    </div>
  );
}

function GoalScorerLeaderboard({ goals, players }: { goals: GoalRow[]; players: ReplayPlayer[] }) {
  const rows = scorerRows(goals, players);

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Goals</th>
            <th>Games</th>
            <th>Per game</th>
            <th>Tagged goals</th>
            <th>Top tag</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>
                <PlayerIdentity
                  detail={row.games == null ? "Games unknown" : `${row.games.toLocaleString()} games`}
                  name={row.name}
                  player={row.player}
                />
              </td>
              <td>{row.goals.toLocaleString()}</td>
              <td>{row.games == null ? "Unknown" : row.games.toLocaleString()}</td>
              <td>{formatDecimal(rate(row.goals, row.games), 2)}</td>
              <td>{row.taggedGoals.toLocaleString()}</td>
              <td>{row.topTag ? `${row.topTag.label} (${row.topTag.count})` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GoalTagLeaderboard({ goals }: { goals: GoalRow[] }) {
  const rows = goalTagRows(goals);

  if (!rows.length) {
    return <div className="stat-empty">No goal tags are available for this group yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Goal tag</th>
            <th>Goals</th>
            <th>Share</th>
            <th>Players</th>
            <th>Leader</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>
                <strong>{row.label}</strong>
                <div className="subtle">{row.detailLabel || "All tagged goals"}</div>
              </td>
              <td>{row.count.toLocaleString()}</td>
              <td>{formatShare(row.count, goals.length)}</td>
              <td>{row.playerCount.toLocaleString()}</td>
              <td>{row.leader ? `${row.leader.name} (${row.leader.count})` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GoalCard({
  goal,
  active,
  onActivate,
  typeHref,
}: {
  goal: GoalRow;
  active: boolean;
  onActivate: (force: boolean) => void;
  /** When provided, goal type chips link to the matching goal playlist. */
  typeHref?: (type: GoalType) => string | undefined;
}) {
  const navigate = useNavigate();
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
      {goal.types.length ? (
        <div className="goal-card-types">
          {goal.types.map((type) => {
            const displayLabel = type.subLabel ? `${type.subLabel} ${type.label}` : type.label;
            const detailSuffix = type.details.length
              ? ` (${type.details.map((detail) => `${formatLabel(detail.key)}: ${formatLabel(detail.value)}`).join(", ")})`
              : "";
            const confidenceTitle =
              (type.confidence == null
                ? displayLabel
                : `${displayLabel} — ${(type.confidence * 100).toFixed(0)}% confidence`) + detailSuffix;
            const href = typeHref?.(type);
            // The card itself is a <button>, so the chip can't be a real link;
            // route imperatively instead and keep the card's hover/click intact.
            return href ? (
              <span
                className="goal-type-chip goal-type-chip-link"
                key={type.key}
                role="link"
                tabIndex={0}
                title={`${confidenceTitle} — watch all ${type.label.toLowerCase()} goals`}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(href);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.stopPropagation();
                    navigate(href);
                  }
                }}
              >
                {displayLabel}
              </span>
            ) : (
              <span className="goal-type-chip" key={type.key} title={confidenceTitle}>
                {displayLabel}
              </span>
            );
          })}
        </div>
      ) : null}
      <div className="goal-card-stats">
        <span>{formatSpeed(goal.ballSpeed)}</span>
        {goal.pressureBeforeGoal != null ? (
          <span title="How long the scoring team had sustained territorial pressure when they scored">
            {formatPressureTime(goal.pressureBeforeGoal)} pressure
          </span>
        ) : null}
      </div>
    </button>
  );
}

interface ScorerRow {
  key: string;
  name: string;
  player: PlayerIdentityData | null;
  games: number | null;
  goals: number;
  taggedGoals: number;
  topTag: CountRow | null;
}

interface CountRow {
  key: string;
  label: string;
  count: number;
}

interface GoalTagRow extends CountRow {
  detailLabel: string | null;
  playerCount: number;
  leader: { name: string; count: number } | null;
}

function scorerRows(goals: GoalRow[], players: ReplayPlayer[]): ScorerRow[] {
  const goalsByPlayer = new Map<string, GoalRow[]>();

  for (const goal of goals) {
    const playerIndex = players.findIndex((player) => goalMatchesPlayer(player, goal));
    const key = playerIndex >= 0 ? playerKey(players[playerIndex], playerIndex) : `name:${goal.scorerName.toLowerCase()}`;
    const currentGoals = goalsByPlayer.get(key) ?? [];
    currentGoals.push(goal);
    goalsByPlayer.set(key, currentGoals);
  }

  return [...goalsByPlayer.entries()]
    .map(([key, playerGoals]) => {
      const player = players.find((candidate, index) => playerKey(candidate, index) === key);
      const tagCounts = countsFromGoalTypes(playerGoals);
      return {
        key,
        name: player?.name || player?.platform_player_id || playerGoals[0]?.scorerName || "Unknown",
        player: player ?? null,
        games: player?.appearance_count ?? null,
        goals: playerGoals.length,
        taggedGoals: playerGoals.filter((goal) => goal.types.length > 0).length,
        topTag: tagCounts[0] ?? null,
      };
    })
    .sort((left, right) => {
      if (right.goals !== left.goals) return right.goals - left.goals;
      return left.name.localeCompare(right.name);
    });
}

function goalTagRows(goals: GoalRow[]): GoalTagRow[] {
  const rows = new Map<string, GoalTagRow>();
  const playerCountsByTag = new Map<string, Map<string, number>>();

  for (const goal of goals) {
    for (const type of goal.types) {
      const detailLabel = type.details.map((detail) => `${formatLabel(detail.key)}: ${formatLabel(detail.value)}`).join(", ");
      const row = rows.get(type.key);
      rows.set(type.key, {
        key: type.key,
        label: type.subLabel ? `${type.subLabel} ${type.label}` : type.label,
        detailLabel: detailLabel || null,
        count: (row?.count ?? 0) + 1,
        playerCount: row?.playerCount ?? 0,
        leader: row?.leader ?? null,
      });

      const playerKeyValue = goal.event.player_id ?? `name:${goal.scorerName.toLowerCase()}`;
      const playerCounts = playerCountsByTag.get(type.key) ?? new Map<string, number>();
      playerCounts.set(playerKeyValue, (playerCounts.get(playerKeyValue) ?? 0) + 1);
      playerCountsByTag.set(type.key, playerCounts);
    }
  }

  for (const row of rows.values()) {
    const playerCounts = playerCountsByTag.get(row.key) ?? new Map<string, number>();
    row.playerCount = playerCounts.size;
    row.leader = [...playerCounts.entries()]
      .map(([key, count]) => ({ name: goalPlayerName(goals, key), count }))
      .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))[0] ?? null;
  }

  return [...rows.values()].sort((left, right) => {
    if (right.count !== left.count) return right.count - left.count;
    return left.label.localeCompare(right.label);
  });
}

function countsFromGoalTypes(goals: GoalRow[]): CountRow[] {
  const counts = new Map<string, CountRow>();
  for (const goal of goals) {
    for (const type of goal.types) {
      const label = type.subLabel ? `${type.subLabel} ${type.label}` : type.label;
      const row = counts.get(type.key);
      counts.set(type.key, { key: type.key, label, count: (row?.count ?? 0) + 1 });
    }
  }
  return [...counts.values()].sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

function goalMatchesPlayer(player: ReplayPlayer, goal: GoalRow): boolean {
  const eventPlayerId = goal.event.player_id?.trim();
  if (eventPlayerId && (player.platform_player_id === eventPlayerId || playerIdentity(player) === eventPlayerId)) {
    return true;
  }
  return Boolean(goal.scorerName && player.name?.trim().toLowerCase() === goal.scorerName.trim().toLowerCase());
}

function goalPlayerName(goals: GoalRow[], key: string): string {
  return goals.find((goal) => goal.event.player_id === key || `name:${goal.scorerName.toLowerCase()}` === key)?.scorerName ?? "Unknown";
}

function playerIdentity(player: ReplayPlayer): string | null {
  if (!player.platform || !player.platform_player_id) return null;
  return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
}

function playerKey(player: ReplayPlayer, index: number): string {
  return playerIdentity(player) ?? `name:${player.name?.trim().toLowerCase() || index}`;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

export function buildGoalRows(events: MechanicEventResponse[]): GoalRow[] {
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
        pressureBeforeGoal: numberField(payload, "pressure_duration_before_goal"),
        anchorFrame: eventAnchorFrame(event, ["scorer_last_touch.frame"]),
        types: goalTypes(payload),
      };
    });
}

function goalTime(event: MechanicEventResponse): number | null {
  return eventDisplayTime(event);
}

export function goalTypeLabel(key: string): string {
  return formatLabel(key.replace(/_goal$/, "")) || "Goal";
}

function goalTypes(payload: Record<string, unknown>): GoalType[] {
  return arrayField(payload, "tags").map((tag) => {
    const key = stringField(tag, "kind") ?? "goal";
    const metadata = objectField(tag, "metadata") ?? {};
    const details = goalTypeDetails(metadata);
    return {
      key,
      label: goalTypeLabel(key),
      confidence: numberField(metadata, "confidence"),
      subLabel: goalTypeSubLabel(details),
      details,
    };
  });
}

function goalTypeDetails(metadata: Record<string, unknown>): GoalTypeDetail[] {
  return arrayField(metadata, "details").flatMap((detail) => {
    const key = stringField(detail, "key");
    const value = stringField(detail, "value");
    return key && value ? [{ key, value }] : [];
  });
}

// Tags whose source mechanic has a non-default `kind` detail (e.g. a reverse
// flick) surface it as a sub-label inside the chip.
function goalTypeSubLabel(details: GoalTypeDetail[]): string | null {
  const kind = details.find((detail) => detail.key === "kind")?.value;
  return kind && kind !== "other" && kind !== "unknown" ? formatLabel(kind) : null;
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

function rate(count: number, games: number | null): number | null {
  return games && games > 0 ? count / games : null;
}

function formatDecimal(value: number | null, digits: number): string {
  return value == null || !Number.isFinite(value) ? "Unknown" : value.toFixed(digits);
}

function formatShare(count: number, total: number): string {
  return total > 0 ? `${Math.round((count / total) * 100)}%` : "0%";
}

export function formatSeconds(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "-";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  const tenths = value < 10 ? `.${Math.round((value % 1) * 10)}` : "";
  return `${minutes}:${seconds.toString().padStart(2, "0")}${tenths}`;
}

function formatPressureTime(value: number): string {
  return `${value.toFixed(1)}s`;
}

// Rocket League positions/velocities are in unreal units (uu) where 1 uu = 1 cm,
// so a uu/s value converts to real-world speed the same way the in-game
// speedometer does: km/h = uu/s * 3.6 / 100, mph = uu/s / 100 * 2.2369363.
const UU_PER_SECOND_TO_KMH = 0.036;
const UU_PER_SECOND_TO_MPH = 0.022369363;

function formatSpeed(value: number | null): string {
  if (value == null) return "-";
  const kmh = Math.round(value * UU_PER_SECOND_TO_KMH);
  const mph = Math.round(value * UU_PER_SECOND_TO_MPH);
  return `${kmh} km/h · ${mph} mph`;
}
