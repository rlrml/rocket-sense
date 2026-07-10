import { ExternalLink } from "lucide-react";
import { lazy, Suspense, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { playerProfilePath } from "../playerIdentity";
import { eventCaseExportUrl, subtrActorPlayerUrl } from "../playerLink";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import type { EventClip } from "./EventClipPlayer";
import type { GoalBuildupTouch, GoalPathPlayer, GoalScoringTouch } from "./GoalShapeDiagram";
import {
  eventAnchorFrame,
  eventDisplayTime,
  numberField,
  useEventPreviewSelection,
} from "./eventPreview";
import { StatPlayerLabel, statPlayerRank } from "./shared";
import { CopyPlayLink } from "./PlayLink";
import { isIgnoredGoalTag } from "./goalTagFilters";

export const goalEventTypes = ["goal_context"];

// Seconds of context shown around each goal when previewing its clip.
const GOAL_CLIP_PREROLL_SECONDS = 6;
const GOAL_CLIP_POSTROLL_SECONDS = 2.5;

// Frames of buildup the goal diagram shows before the ball crosses the line.
// Replay tracks sample at ~30Hz, so this is roughly the final five seconds of
// the play — enough to read how the goal developed.
const GOAL_DIAGRAM_BUILDUP_FRAMES = 150;

// Lazily loaded so the three.js / wasm replay player is only fetched when the
// Goals tab is actually opened, instead of bloating the main bundle.
const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);

// The 2D buildup diagram is its own lazy chunk: it only pulls the replay model,
// not the heavy three.js player, so cards can render it without that cost.
const GoalShapeDiagram = lazy(() =>
  import("./GoalShapeDiagram").then((module) => ({ default: module.GoalShapeDiagram })),
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
  scoringTouch: GoalScoringTouch | null;
  buildupTouches: GoalBuildupTouch[];
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
  const [searchParams, setSearchParams] = useSearchParams();
  const goals = useMemo(() => buildGoalRows(events), [events]);
  const goalKey = useCallback((goal: GoalRow) => goal.event.id, []);
  const buildClip = useCallback(buildGoalClip, []);
  const goalTypeHref = useCallback(
    (type: GoalType) =>
      replayId
        ? `/replays/${encodeURIComponent(replayId)}/goals/${encodeURIComponent(type.key)}`
        : undefined,
    [replayId],
  );

  const {
    activeItem: activeGoal,
    activeKey: activeId,
    clip,
    activateItem: activateGoal,
  } = useEventPreviewSelection(goals, goalKey, buildClip, searchParams.get("event"));

  const selectGoal = useCallback(
    (goal: GoalRow, force: boolean) => {
      activateGoal(goal, force);
      if (!force || searchParams.get("event") === goal.event.id) return;
      const next = new URLSearchParams(searchParams);
      next.set("event", goal.event.id);
      setSearchParams(next, { replace: true });
    },
    [activateGoal, searchParams, setSearchParams],
  );

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
                  onActivate={(force) => selectGoal(goal, force)}
                  typeHref={goalTypeHref}
                  replayId={replayId}
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
                openHref={subtrActorPlayerUrl(replayId)}
                exportHref={activeGoal ? eventCaseExportUrl(activeGoal.event.id) : undefined}
                eventId={activeGoal?.event.id}
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
                <StatPlayerLabel
                  name={row.name}
                  platform={row.player?.platform ?? null}
                  platformPlayerId={row.player?.platform_player_id ?? null}
                  profilePath={playerProfilePath(
                    row.player?.platform,
                    row.player?.platform_player_id,
                  )}
                  rank={row.player ? statPlayerRank(row.player) : null}
                  subtitle={
                    row.games == null ? "Games unknown" : `${row.games.toLocaleString()} games`
                  }
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

export function GoalTagLeaderboard({ goals }: { goals: GoalRow[] }) {
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
  gameHref,
  replayId,
}: {
  goal: GoalRow;
  active: boolean;
  onActivate: (force: boolean) => void;
  /** When provided, goal type chips link to the matching goal playlist. */
  typeHref?: (type: GoalType) => string | undefined;
  /** When provided, the card shows a link to the game this goal came from. */
  gameHref?: string;
  /** When provided, the card shows a 2D buildup diagram for this goal. */
  replayId?: string;
}) {
  const navigate = useNavigate();
  const diagramPlayers = useMemo(() => goalPathPlayers(goal), [goal]);

  // Hovering the diagram (only) lifts it into a large overlay anchored to its own
  // right edge — so it stays under the cursor (no hover churn) — and clamped to the
  // viewport. We set the target geometry as CSS vars, snapshot the thumbnail rect,
  // then FLIP in a layout effect so it grows out of its original position.
  const panelRef = useRef<HTMLElement | null>(null);
  const firstRectRef = useRef<DOMRect | null>(null);
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    const el = panelRef.current;
    if (!el) return;
    const first = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const margin = 14;
    const h = Math.min(vh * 0.7, vw * 0.6);
    el.style.setProperty("--exp-h", `${h}px`);
    el.style.setProperty("--exp-right", `${Math.max(margin, vw - first.right)}px`);
    el.style.setProperty(
      "--exp-top",
      `${Math.max(margin, Math.min(first.top + first.height / 2 - h / 2, vh - h - margin))}px`,
    );
    firstRectRef.current = first;
    setExpanded(true);
  };
  const collapse = () => {
    firstRectRef.current = panelRef.current?.getBoundingClientRect() ?? null;
    setExpanded(false);
  };
  useLayoutEffect(() => {
    const el = panelRef.current;
    const first = firstRectRef.current;
    if (!el || !first || !first.width) return;
    const last = el.getBoundingClientRect();
    if (!last.width) return;
    el.style.transformOrigin = "top left";
    el.style.transition = "none";
    el.style.transform = `translate(${first.left - last.left}px, ${first.top - last.top}px) scale(${first.width / last.width}, ${first.height / last.height})`;
    void el.getBoundingClientRect();
    el.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
  }, [expanded]);

  return (
    <button
      type="button"
      className={`goal-card kickoff-card winner-${teamClass(goal.scoringTeam)} ${active ? "selected" : ""}`}
      onClick={() => onActivate(true)}
      onMouseEnter={() => onActivate(false)}
      onFocus={() => onActivate(false)}
    >
      <div className="goal-card-info">
        <div className="kickoff-card-header">
          <div className="goal-card-heading">
            <span className={`goal-card-index team-chip-${teamClass(goal.scoringTeam)}`}>
              {goal.index + 1}
            </span>
            <h4>{goal.scorerName}</h4>
            <span className={`kickoff-goal-chip team-chip-${teamClass(goal.scoringTeam)}`}>
              {teamLabel(goal.scoringTeam)}
            </span>
          </div>
          <div className="goal-card-header-right">
            <strong>{formatSeconds(goal.time)}</strong>
            <CopyPlayLink
              eventId={goal.event.id}
              className="goal-card-play-link"
              size={14}
              stopPropagation
            />
            {gameHref ? (
              // The card itself is a <button>, so this can't be a real link;
              // route imperatively instead and keep the card's hover/click intact.
              <span
                className="goal-card-game-link"
                role="link"
                tabIndex={0}
                title="Open the game this goal came from"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(gameHref);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.stopPropagation();
                    navigate(gameHref);
                  }
                }}
              >
                Game
                <ExternalLink size={12} />
              </span>
            ) : null}
          </div>
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
                  : `${displayLabel} — ${(type.confidence * 100).toFixed(0)}% confidence`) +
                detailSuffix;
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
      </div>
      {replayId ? (
        <section
          ref={panelRef}
          className={`goal-diagram-panel ${expanded ? "is-expanded" : ""}`}
          onMouseEnter={expand}
          onMouseLeave={collapse}
        >
          <Suspense fallback={<div className="kickoff-path-status">Loading goal paths…</div>}>
            <GoalShapeDiagram
              replayId={replayId}
              startFrame={goalDiagramStartFrame(goal)}
              goalFrame={goal.anchorFrame}
              scoringTouch={goal.scoringTouch}
              buildupTouches={goal.buildupTouches}
              players={diagramPlayers}
            />
          </Suspense>
        </section>
      ) : null}
    </button>
  );
}

/** The scorer is flagged so the diagram emphasizes their path; every other replay
 *  track renders as a supporting path colored by its own team. */
function goalPathPlayers(goal: GoalRow): GoalPathPlayer[] {
  return [
    {
      playerKey: null,
      playerName: goal.scorerName,
      team: goal.scoringTeam,
      isScorer: true,
    },
  ];
}

function goalDiagramStartFrame(goal: GoalRow): number | null {
  return goal.anchorFrame == null ? null : goal.anchorFrame - GOAL_DIAGRAM_BUILDUP_FRAMES;
}

interface ScorerRow {
  key: string;
  name: string;
  player: ReplayPlayer | null;
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
    const key =
      playerIndex >= 0
        ? playerKey(players[playerIndex], playerIndex)
        : `name:${goal.scorerName.toLowerCase()}`;
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
      if (isIgnoredGoalTag(type.key)) continue;
      const detailLabel = type.details
        .map((detail) => `${formatLabel(detail.key)}: ${formatLabel(detail.value)}`)
        .join(", ");
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
    row.leader =
      [...playerCounts.entries()]
        .map(([key, count]) => ({ name: goalPlayerName(goals, key), count }))
        .sort(
          (left, right) => right.count - left.count || left.name.localeCompare(right.name),
        )[0] ?? null;
  }

  return [...rows.values()].sort((left, right) => {
    if (right.count !== left.count) return right.count - left.count;
    return left.label.localeCompare(right.label);
  });
}

export interface GoalTagDefinition {
  key: string;
  label: string;
}

export interface GoalTagPlayerData {
  /** Every distinct goal tag seen in the group, sorted by label. */
  tags: GoalTagDefinition[];
  /** Explorer identity (`platform:platform_player_id`, lowercased) → tag key → count. */
  byIdentity: Map<string, Map<string, number>>;
}

/** Resolve a goal to the same `platform:id` identity the group stat explorer keys
 *  participants by (lowercased platform, no normalization), via its scorer. */
function goalExplorerIdentity(goal: GoalRow, players: ReplayPlayer[]): string | null {
  const player = players.find((candidate) => goalMatchesPlayer(candidate, goal));
  if (!player?.platform || !player.platform_player_id) return null;
  return `${player.platform.toLowerCase()}:${player.platform_player_id}`;
}

/**
 * Turn the group's goal events into per-player tag counts the stat explorer can
 * surface as sortable, toggleable columns — one metric per distinct goal tag.
 * Keyed by the explorer's `platform:id` identity so it joins the participant set.
 */
export function buildGoalTagPlayerData(
  goals: GoalRow[],
  players: ReplayPlayer[],
): GoalTagPlayerData {
  const tagLabels = new Map<string, string>();
  const byIdentity = new Map<string, Map<string, number>>();

  for (const goal of goals) {
    const identity = goalExplorerIdentity(goal, players);
    if (!identity) continue;
    const counts = byIdentity.get(identity) ?? new Map<string, number>();
    byIdentity.set(identity, counts);
    for (const type of goal.types) {
      if (isIgnoredGoalTag(type.key)) continue;
      const label = type.subLabel ? `${type.subLabel} ${type.label}` : type.label;
      if (!tagLabels.has(type.key)) tagLabels.set(type.key, label);
      counts.set(type.key, (counts.get(type.key) ?? 0) + 1);
    }
  }

  const tags = [...tagLabels.entries()]
    .map(([key, label]) => ({ key, label }))
    .sort((left, right) => left.label.localeCompare(right.label));
  return { tags, byIdentity };
}

function countsFromGoalTypes(goals: GoalRow[]): CountRow[] {
  const counts = new Map<string, CountRow>();
  for (const goal of goals) {
    for (const type of goal.types) {
      if (isIgnoredGoalTag(type.key)) continue;
      const label = type.subLabel ? `${type.subLabel} ${type.label}` : type.label;
      const row = counts.get(type.key);
      counts.set(type.key, { key: type.key, label, count: (row?.count ?? 0) + 1 });
    }
  }
  return [...counts.values()].sort(
    (left, right) => right.count - left.count || left.label.localeCompare(right.label),
  );
}

function goalMatchesPlayer(player: ReplayPlayer, goal: GoalRow): boolean {
  const eventPlayerId = goal.event.player_id?.trim();
  if (
    eventPlayerId &&
    (player.platform_player_id === eventPlayerId || playerIdentity(player) === eventPlayerId)
  ) {
    return true;
  }
  return Boolean(
    goal.scorerName && player.name?.trim().toLowerCase() === goal.scorerName.trim().toLowerCase(),
  );
}

function goalPlayerName(goals: GoalRow[], key: string): string {
  return (
    goals.find(
      (goal) => goal.event.player_id === key || `name:${goal.scorerName.toLowerCase()}` === key,
    )?.scorerName ?? "Unknown"
  );
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
  const touchEvents = events.filter((event) => event.event_type === "touch");
  return events
    .filter((event) => event.event_type === "goal_context")
    .map((event) => ({ event, sortKey: goalTime(event) ?? 0 }))
    .sort(
      (left, right) => left.sortKey - right.sortKey || left.event.id.localeCompare(right.event.id),
    )
    .map(({ event }, index) => {
      const payload = (event.payload ?? {}) as Record<string, unknown>;
      const anchorFrame = eventAnchorFrame(event, ["scorer_last_touch.frame"]);
      const scoringTouch = goalScoringTouch(payload);
      return {
        event,
        index,
        time: goalTime(event),
        scorerName: event.player_name?.trim() || "Unknown scorer",
        scoringTeam: event.team ?? teamField(payload, "scoring_team_is_team_0"),
        ballSpeed: numberField(payload, "ball_speed_at_goal"),
        pressureBeforeGoal: numberField(payload, "pressure_duration_before_goal"),
        anchorFrame,
        scoringTouch,
        buildupTouches: goalBuildupTouches(anchorFrame, scoringTouch?.touchId ?? null, touchEvents),
        types: goalTypes(payload),
      };
    });
}

/** Real attributed buildup touches for a goal: the `touch` events in the diagram's
 *  buildup window, minus the scoring touch itself (matched by touch id). */
function goalBuildupTouches(
  anchorFrame: number | null,
  scoringTouchId: number | null,
  touchEvents: MechanicEventResponse[],
): GoalBuildupTouch[] {
  if (anchorFrame == null) return [];
  const from = anchorFrame - GOAL_DIAGRAM_BUILDUP_FRAMES;
  const out: GoalBuildupTouch[] = [];
  for (const event of touchEvents) {
    const payload = (event.payload ?? {}) as Record<string, unknown>;
    const frame = numberField(payload, "frame");
    if (frame == null || frame < from || frame > anchorFrame) continue;
    const touchId = numberField(payload, "touch_id");
    if (scoringTouchId != null && touchId != null && touchId === scoringTouchId) continue;
    // Prefer the ball's contact position (`ball_position`): it lies on the ball's
    // trajectory, where the touch actually happened. `player_position` is the car
    // centre — up to a hitbox+ball-radius away from the ball — and is only the
    // fallback for older events serialized before `ball_position` existed. Both
    // are [x, y, z] arrays (Vector3fTs).
    const at = arrayPoint(payload, "ball_position") ?? arrayPoint(payload, "player_position");
    if (!at) continue;
    out.push({
      at,
      frame,
      // The event's top-level team is reliable; team_is_team_0 in the payload is a
      // best-effort fallback for very old data.
      team: event.team ?? teamField(payload, "team_is_team_0"),
      playerKey: event.player_id ?? event.player_name ?? String(touchId ?? frame),
    });
  }
  return out;
}

/** Read a `[x, y, z]` tuple field (uu) as `{ x, y }`. */
function arrayPoint(
  payload: Record<string, unknown>,
  key: string,
): { x: number; y: number } | null {
  const value = payload[key];
  if (!Array.isArray(value) || value.length < 2) return null;
  const [x, y] = value;
  return typeof x === "number" && typeof y === "number" && Number.isFinite(x) && Number.isFinite(y)
    ? { x, y }
    : null;
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

/** Pull the exact scoring-touch coordinate out of the goal payload's
 *  `scorer_last_touch` (subtr-actor's GoalTouchContext). */
function goalScoringTouch(payload: Record<string, unknown>): GoalScoringTouch | null {
  const touch = objectField(payload, "scorer_last_touch");
  if (!touch) return null;
  const ball = fieldPoint(touch, "ball_position");
  if (!ball) return null;
  return {
    ball,
    player: fieldPoint(touch, "player_position"),
    team: teamField(touch, "is_team_0"),
    touchId: numberField(touch, "touch_id"),
  };
}

/** Read a `{ x, y }` field point (uu) from a nested payload object. */
function fieldPoint(
  payload: Record<string, unknown>,
  key: string,
): { x: number; y: number; z?: number } | null {
  const point = objectField(payload, key);
  if (!point) return null;
  const x = numberField(point, "x");
  const y = numberField(point, "y");
  const z = numberField(point, "z");
  return x != null && y != null ? { x, y, ...(z == null ? {} : { z }) } : null;
}

function objectField(
  payload: Record<string, unknown>,
  key: string,
): Record<string, unknown> | null {
  const value = payload[key];
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function arrayField(payload: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = payload[key];
  return Array.isArray(value)
    ? value.filter(
        (item): item is Record<string, unknown> =>
          Boolean(item) && typeof item === "object" && !Array.isArray(item),
      )
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
