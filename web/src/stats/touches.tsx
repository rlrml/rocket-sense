import { useMemo, useState } from "react";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  type ComparisonRow,
  ComparisonRows,
  type SegmentedBarSegment,
  statPercentWithValue,
  StatPlayerLabel,
  statPlayerRank,
  type StatPlayerRank,
} from "./shared";

// Only the classified touch stream feeds this section. Each event carries two
// independent classification axes plus how far the touch moved the ball toward
// the attacking goal (`ball_movement.advance_distance`):
//   - kind:      hit strength (control / medium / hard hit)
//   - category:  intention (shot / save / clear / pass / challenge / dribble / neutral)
export const touchEventTypes = ["touch"];

type TouchComparisonMode = "players" | "teams";
type TouchMetric = "count" | "advance";

interface TouchDimensionValue {
  id: string;
  label: string;
  // Used both for the bar segment (`.source-segment.<class>`) and the matching
  // legend swatch (`.chart-legend .<class>::before`) — see styles.css.
  segmentClass: string;
}

interface TouchDimension {
  id: string;
  // Filled into chart titles, e.g. "Touches by kind".
  noun: string;
  payloadField: string;
  values: TouchDimensionValue[];
  other: TouchDimensionValue;
}

// Shared catch-all for any classifier value outside the known sets.
const OTHER_VALUE: TouchDimensionValue = {
  id: "other",
  label: "Other",
  segmentClass: "touch-seg-other",
};

// Hit strength, ordered as a calm-to-aggressive ramp.
const KIND_DIMENSION: TouchDimension = {
  id: "kind",
  noun: "kind",
  payloadField: "kind",
  values: [
    { id: "control", label: "Control", segmentClass: "touch-seg-kind-control" },
    { id: "medium_hit", label: "Medium", segmentClass: "touch-seg-kind-medium" },
    { id: "hard_hit", label: "Hard", segmentClass: "touch-seg-kind-hard" },
  ],
  other: OTHER_VALUE,
};

// Intention, ordered offensive -> contest -> defensive -> neutral. subtr-actor's
// `control` intention is a possession/dribble touch, labeled "Dribble" so it is
// never confused with the "Control" hit kind above.
const CATEGORY_DIMENSION: TouchDimension = {
  id: "category",
  noun: "category",
  payloadField: "intention",
  values: [
    { id: "shot", label: "Shot", segmentClass: "touch-seg-cat-shot" },
    { id: "pass", label: "Pass", segmentClass: "touch-seg-cat-pass" },
    { id: "control", label: "Dribble", segmentClass: "touch-seg-cat-dribble" },
    { id: "challenge", label: "Challenge", segmentClass: "touch-seg-cat-challenge" },
    { id: "save", label: "Save", segmentClass: "touch-seg-cat-save" },
    { id: "clear", label: "Clear", segmentClass: "touch-seg-cat-clear" },
    { id: "neutral", label: "Neutral", segmentClass: "touch-seg-cat-neutral" },
  ],
  other: OTHER_VALUE,
};

const DIMENSIONS: TouchDimension[] = [KIND_DIMENSION, CATEGORY_DIMENSION];

interface TouchSubject {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  showPlatformBadge: boolean;
  totalTouches: number;
  totalAdvance: number;
  // dimension id -> (value id -> touch count / summed advance distance)
  countsByDimension: Record<string, Record<string, number>>;
  advanceByDimension: Record<string, Record<string, number>>;
}

export function TouchesDetail({
  events,
  players,
  scope = "replay",
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds?: number | null;
  scope?: "replay" | "group";
}) {
  const touchEvents = useMemo(
    () => events.filter((event) => event.event_type === "touch"),
    [events],
  );
  const playerSubjects = useMemo(
    () => playerTouchSubjects(players, touchEvents),
    [players, touchEvents],
  );
  const teamSubjects = useMemo(() => teamTouchSubjects(touchEvents), [touchEvents]);

  const oneVOne = isOneVOneMatch(players);
  const [selectedMode, setSelectedMode] = useState<TouchComparisonMode>("players");
  const hasPlayerSubjects = playerSubjects.length > 0;
  const effectiveMode: TouchComparisonMode = !hasPlayerSubjects
    ? "teams"
    : oneVOne
      ? "players"
      : selectedMode;
  const subjects = effectiveMode === "players" ? playerSubjects : teamSubjects;

  const totalTouches = touchEvents.length;
  const totalAdvance = subjects.reduce((sum, subject) => sum + subject.totalAdvance, 0);
  const maxTouches = Math.max(1, ...subjects.map((subject) => subject.totalTouches));
  const maxAdvance = Math.max(1, ...subjects.map((subject) => subject.totalAdvance));

  if (!touchEvents.length) {
    return (
      <div className="stat-empty">
        No touch events are available for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  return (
    <div className="touches-detail">
      {oneVOne ? null : (
        <TouchComparisonModeToggle
          comparisonMode={effectiveMode}
          hasPlayerSubjects={hasPlayerSubjects}
          onComparisonModeChange={setSelectedMode}
        />
      )}
      <div className="stat-section-grid">
        {DIMENSIONS.map((dimension) => (
          <TouchChartPanel
            key={`touches-${dimension.id}`}
            title={`Touches by ${dimension.noun}`}
            contextLabel={`${totalTouches.toLocaleString()} total touches`}
            subjects={subjects}
            dimension={dimension}
            metric="count"
            maxValue={maxTouches}
            format={formatCount}
          />
        ))}
        {DIMENSIONS.map((dimension) => (
          <TouchChartPanel
            key={`advance-${dimension.id}`}
            title={`Ball advanced by ${dimension.noun}`}
            contextLabel={`${formatDistance(totalAdvance)} advanced`}
            subjects={subjects}
            dimension={dimension}
            metric="advance"
            maxValue={maxAdvance}
            format={formatDistance}
          />
        ))}
      </div>
    </div>
  );
}

function TouchChartPanel({
  title,
  contextLabel,
  subjects,
  dimension,
  metric,
  maxValue,
  format,
}: {
  title: string;
  contextLabel: string;
  subjects: TouchSubject[];
  dimension: TouchDimension;
  metric: TouchMetric;
  maxValue: number;
  format: (value: number) => string;
}) {
  const activeValues = activeDimensionValues(subjects, dimension, metric);
  const rows = touchDimensionRows(subjects, dimension, activeValues, metric, maxValue, format);

  return (
    <section className="chart-panel full-span">
      <header className="chart-panel-header">
        <h3>{title}</h3>
        <span>{contextLabel}</span>
      </header>
      <ComparisonRows rows={rows} emptyLabel="No classified touches are available yet." />
      <TouchLegend values={activeValues} />
    </section>
  );
}

function TouchComparisonModeToggle({
  comparisonMode,
  hasPlayerSubjects,
  onComparisonModeChange,
}: {
  comparisonMode: TouchComparisonMode;
  hasPlayerSubjects: boolean;
  onComparisonModeChange: (mode: TouchComparisonMode) => void;
}) {
  return (
    <div className="boost-page-controls">
      <div className="boost-comparison-tabs" role="tablist" aria-label="Touch comparison mode">
        <button
          className={comparisonMode === "players" ? "active" : ""}
          disabled={!hasPlayerSubjects}
          onClick={() => onComparisonModeChange("players")}
          role="tab"
          title={
            hasPlayerSubjects
              ? "Per-player touches"
              : "No touches could be attributed to individual players"
          }
          type="button"
          aria-selected={comparisonMode === "players"}
        >
          Players
        </button>
        <button
          className={comparisonMode === "teams" ? "active" : ""}
          onClick={() => onComparisonModeChange("teams")}
          role="tab"
          type="button"
          aria-selected={comparisonMode === "teams"}
        >
          Teams
        </button>
      </div>
    </div>
  );
}

function TouchLegend({ values }: { values: TouchDimensionValue[] }) {
  if (!values.length) return null;
  return (
    <div className="chart-legend">
      {values.map((value) => (
        <span className={value.segmentClass} key={value.id}>
          {value.label}
        </span>
      ))}
    </div>
  );
}

function activeDimensionValues(
  subjects: TouchSubject[],
  dimension: TouchDimension,
  metric: TouchMetric,
): TouchDimensionValue[] {
  return [...dimension.values, dimension.other].filter((value) =>
    subjects.some((subject) => (metricMap(subject, dimension, metric)[value.id] ?? 0) > 0),
  );
}

function touchDimensionRows(
  subjects: TouchSubject[],
  dimension: TouchDimension,
  activeValues: TouchDimensionValue[],
  metric: TouchMetric,
  maxValue: number,
  format: (value: number) => string,
): ComparisonRow[] {
  return [...subjects]
    .sort(
      (left, right) =>
        metricTotal(right, metric) - metricTotal(left, metric) ||
        left.name.localeCompare(right.name),
    )
    .map((subject) => {
      const values = metricMap(subject, dimension, metric);
      const total = metricTotal(subject, metric);
      const segments: SegmentedBarSegment[] = activeValues.map((value) => {
        const amount = values[value.id] ?? 0;
        const share = total > 0 ? amount / total : 0;
        return {
          key: value.id,
          className: value.segmentClass,
          label: value.label,
          value: amount,
          visibleLabel: amount > 0 && share >= 0.14 ? format(amount) : undefined,
          title:
            amount > 0
              ? statPercentWithValue(`${Math.round(share * 100)}%`, format(amount), value.label)
              : undefined,
        };
      });
      return {
        key: subject.key,
        label: (
          <StatPlayerLabel
            className={`team-accent-${teamClass(subject.team)}`}
            name={subject.name}
            platform={subject.platform}
            profilePath={playerProfilePath(subject)}
            rank={subject.rank}
            showPlatformBadge={subject.showPlatformBadge}
            subtitle={subject.showPlatformBadge ? teamLabel(subject.team) : "Team"}
          />
        ),
        ariaLabel: `${subject.name}: ${format(total)}`,
        segments,
        total,
        maxValue,
        valueLabel: format(total),
        placeholder: total > 0 ? undefined : "0",
      };
    });
}

function metricMap(
  subject: TouchSubject,
  dimension: TouchDimension,
  metric: TouchMetric,
): Record<string, number> {
  return metric === "count"
    ? subject.countsByDimension[dimension.id]
    : subject.advanceByDimension[dimension.id];
}

function metricTotal(subject: TouchSubject, metric: TouchMetric): number {
  return metric === "count" ? subject.totalTouches : subject.totalAdvance;
}

function playerTouchSubjects(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): TouchSubject[] {
  const subjects = players.map((player, index) =>
    emptySubject(playerKey(player, index), {
      name: player.name || player.platform_player_id || "Unknown",
      platform: player.platform,
      platformPlayerId: player.platform_player_id,
      rank: statPlayerRank(player),
      team: player.team,
      showPlatformBadge: true,
    }),
  );
  const byKey = new Map(subjects.map((subject) => [subject.key, subject]));

  for (const event of events) {
    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const subject = byKey.get(playerKey(players[playerIndex], playerIndex));
    if (subject) accumulateTouch(subject, event);
  }

  return subjects.filter((subject) => subject.totalTouches > 0);
}

function teamTouchSubjects(events: MechanicEventResponse[]): TouchSubject[] {
  const subjects = ([0, 1] as const).map((team) =>
    emptySubject(`team:${team}`, {
      name: `${teamLabel(team)} team`,
      platform: null,
      platformPlayerId: null,
      rank: null,
      team,
      showPlatformBadge: false,
    }),
  );

  for (const event of events) {
    const team = event.team;
    if (team !== 0 && team !== 1) continue;
    accumulateTouch(subjects[team], event);
  }

  return subjects.filter((subject) => subject.totalTouches > 0);
}

function emptySubject(
  key: string,
  identity: Omit<
    TouchSubject,
    "key" | "totalTouches" | "totalAdvance" | "countsByDimension" | "advanceByDimension"
  >,
): TouchSubject {
  const countsByDimension: Record<string, Record<string, number>> = {};
  const advanceByDimension: Record<string, Record<string, number>> = {};
  for (const dimension of DIMENSIONS) {
    countsByDimension[dimension.id] = {};
    advanceByDimension[dimension.id] = {};
  }
  return {
    key,
    ...identity,
    totalTouches: 0,
    totalAdvance: 0,
    countsByDimension,
    advanceByDimension,
  };
}

function accumulateTouch(subject: TouchSubject, event: MechanicEventResponse) {
  const advance = touchAdvance(event.payload);
  subject.totalTouches += 1;
  if (advance > 0) subject.totalAdvance += advance;

  for (const dimension of DIMENSIONS) {
    const valueId = dimensionValueId(dimension, event.payload);
    const counts = subject.countsByDimension[dimension.id];
    counts[valueId] = (counts[valueId] ?? 0) + 1;
    if (advance > 0) {
      const adv = subject.advanceByDimension[dimension.id];
      adv[valueId] = (adv[valueId] ?? 0) + advance;
    }
  }
}

function dimensionValueId(dimension: TouchDimension, payload: Record<string, unknown>): string {
  const raw = stringPayload(payload, dimension.payloadField);
  if (raw && dimension.values.some((value) => value.id === raw)) return raw;
  return dimension.other.id;
}

function touchAdvance(payload: Record<string, unknown>): number {
  const movement = payload.ball_movement;
  if (!movement || typeof movement !== "object" || Array.isArray(movement)) return 0;
  const value = (movement as Record<string, unknown>).advance_distance;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function isOneVOneMatch(players: ReplayPlayer[]): boolean {
  const blue = players.filter((player) => player.team === 0);
  const orange = players.filter((player) => player.team === 1);
  const unknown = players.filter((player) => player.team !== 0 && player.team !== 1);
  return blue.length === 1 && orange.length === 1 && unknown.length === 0;
}

function eventMatchesPlayer(player: ReplayPlayer, event: MechanicEventResponse): boolean {
  for (const key of eventPlayerKeys(event)) {
    if (
      key === playerIdentity(player) ||
      key === normalizePlayerKey(player.platform_player_id ?? "")
    )
      return true;
  }
  const eventName = event.player_name?.trim().toLowerCase();
  return Boolean(eventName && player.name?.trim().toLowerCase() === eventName);
}

function eventPlayerKeys(event: MechanicEventResponse): string[] {
  return [
    event.player_id,
    stringPayload(event.payload, "player_id"),
    remoteIdKey(event.payload.player_id),
    remoteIdKey(event.payload.player),
  ]
    .filter((key): key is string => Boolean(key))
    .flatMap((key) => [key, normalizePlayerKey(key)]);
}

function remoteIdKey(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length !== 1) return null;
  const [platform, id] = entries[0];
  if (typeof id === "string" || typeof id === "number")
    return `${normalizePlatform(platform)}:${String(id)}`;
  if (id && typeof id === "object" && !Array.isArray(id)) {
    const nested = id as Record<string, unknown>;
    const onlineId = nested.online_id ?? nested.id;
    if (typeof onlineId === "string" || typeof onlineId === "number")
      return `${normalizePlatform(platform)}:${String(onlineId)}`;
  }
  return null;
}

function playerIdentity(player: ReplayPlayer): string | null {
  if (!player.platform || !player.platform_player_id) return null;
  return `${normalizePlatform(player.platform)}:${player.platform_player_id}`;
}

function playerKey(player: ReplayPlayer, index: number): string {
  return playerIdentity(player) ?? `name:${player.name?.trim().toLowerCase() || index}`;
}

function normalizePlayerKey(value: string): string {
  const [platform, ...rest] = value.split(":");
  return rest.length > 0 ? `${normalizePlatform(platform)}:${rest.join(":")}` : value;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function playerProfilePath(subject: {
  platform: string | null;
  platformPlayerId: string | null;
}): string | null {
  if (!subject.platform || !subject.platformPlayerId) return null;
  return `/players/${encodeURIComponent(subject.platform)}/id/${encodeURIComponent(subject.platformPlayerId)}/stats/touches`;
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function teamClass(team: number | null): string {
  if (team === 0) return "blue";
  if (team === 1) return "orange";
  return "unknown";
}

function teamLabel(team: number | null): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}

function formatCount(value: number): string {
  return Math.round(value).toLocaleString();
}

function formatDistance(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return Math.round(value).toLocaleString();
}
