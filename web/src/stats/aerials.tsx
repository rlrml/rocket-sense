import { useMemo } from "react";
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

// Every aerial panel ranks all participants on its own, so this group loads the
// streams those rankings draw from:
//   - flip_reset / double_tap / wall_aerial: detected mechanic events. Flip
//     resets are confirmed only once the reset is later used by a dodge touch.
//   - air_dribble: a dedicated stream (NOT ball_carry, which is ground carries);
//     its payload carries air_dribble_origin (ground_to_air / wall_to_air)
//   - goal_context: goal tags flag which finishes were aerial
//   - touch: classified touches carry a height_band, isolating aerial contacts
export const aerialEventTypes = [
  "flip_reset",
  "double_tap",
  "air_dribble",
  "wall_aerial",
  "goal_context",
  "touch",
];

interface AerialValue {
  id: string;
  label: string;
  // Drives both the bar segment (`.source-segment.<class>`) and the matching
  // legend swatch (`.chart-legend .<class>::before`) — see styles.css.
  segmentClass: string;
}

// One ranked chart. Each pulls a per-subject `Record<valueId, count>` out of the
// matching slot on AerialSubject.counts and stacks `values` into the bar.
interface AerialPanelConfig {
  id: string;
  title: string;
  // Filled into the context line + aria, e.g. "12 air dribbles".
  noun: string;
  values: AerialValue[];
}

// The four mechanics that make up a player's aerial workload. The air dribble
// count here is the same total broken out by origin in the dedicated panel.
const MIX_VALUES: AerialValue[] = [
  { id: "flip_reset", label: "Flip reset", segmentClass: "aerial-seg-mix-flip-reset" },
  { id: "double_tap", label: "Double tap", segmentClass: "aerial-seg-mix-double-tap" },
  { id: "air_dribble", label: "Air dribble", segmentClass: "aerial-seg-mix-air-dribble" },
  { id: "wall_aerial", label: "Wall aerial", segmentClass: "aerial-seg-mix-wall-aerial" },
];

// AirDribbleOrigin from subtr-actor: where the dribble was started from.
const ORIGIN_VALUES: AerialValue[] = [
  { id: "ground_to_air", label: "From ground", segmentClass: "aerial-seg-origin-ground" },
  { id: "wall_to_air", label: "From wall", segmentClass: "aerial-seg-origin-wall" },
];

// WallAerialWall from subtr-actor: which wall the player took off from.
const WALL_VALUES: AerialValue[] = [
  { id: "side", label: "Side wall", segmentClass: "aerial-seg-wall-side" },
  { id: "back", label: "Back wall", segmentClass: "aerial-seg-wall-back" },
];

// The aerial-flavored subset of GoalTagKind. A single goal can carry more than
// one of these (e.g. an air dribble that is also a high aerial), so the bars
// count tags, not goals — hence the "tags" noun on the panel.
const GOAL_VALUES: AerialValue[] = [
  { id: "aerial_goal", label: "Aerial", segmentClass: "aerial-seg-goal-aerial" },
  { id: "high_aerial_goal", label: "High aerial", segmentClass: "aerial-seg-goal-high-aerial" },
  { id: "air_dribble_goal", label: "Air dribble", segmentClass: "aerial-seg-goal-air-dribble" },
  { id: "flip_reset_goal", label: "Flip reset", segmentClass: "aerial-seg-goal-flip-reset" },
  { id: "double_tap_goal", label: "Double tap", segmentClass: "aerial-seg-goal-double-tap" },
];

// TouchClassificationEvent.height_band has three values; "ground" is dropped
// here so the panel only ranks airborne contacts.
const HEIGHT_VALUES: AerialValue[] = [
  { id: "low_air", label: "Low air", segmentClass: "aerial-seg-height-low" },
  { id: "high_air", label: "High air", segmentClass: "aerial-seg-height-high" },
];

const PANELS: AerialPanelConfig[] = [
  { id: "mix", title: "Aerial mechanics", noun: "aerial mechanics", values: MIX_VALUES },
  { id: "origin", title: "Air dribbles by origin", noun: "air dribbles", values: ORIGIN_VALUES },
  { id: "wall", title: "Wall aerials by wall", noun: "wall aerials", values: WALL_VALUES },
  { id: "goals", title: "Aerial goals by type", noun: "aerial goal tags", values: GOAL_VALUES },
  {
    id: "height",
    title: "Aerial touches by height",
    noun: "aerial touches",
    values: HEIGHT_VALUES,
  },
];

interface AerialSubject {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  // panel id -> (value id -> count)
  counts: Record<string, Record<string, number>>;
}

export function AerialsDetail({
  events,
  players,
  scope = "replay",
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds?: number | null;
  scope?: "replay" | "group";
}) {
  const subjects = useMemo(() => aerialSubjects(players, events), [players, events]);

  if (!subjects.length) {
    return (
      <div className="stat-empty">
        No aerial mechanics are available for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  return (
    <div className="aerials-detail">
      <div className="stat-section-grid">
        {PANELS.map((panel) => (
          <AerialPanel key={panel.id} panel={panel} subjects={subjects} />
        ))}
      </div>
    </div>
  );
}

function AerialPanel({ panel, subjects }: { panel: AerialPanelConfig; subjects: AerialSubject[] }) {
  const activeValues = panel.values.filter((value) =>
    subjects.some((subject) => (subject.counts[panel.id][value.id] ?? 0) > 0),
  );

  const ranked = [...subjects]
    .map((subject) => ({ subject, total: panelTotal(subject, panel.id) }))
    .filter((entry) => entry.total > 0)
    .sort(
      (left, right) =>
        right.total - left.total || left.subject.name.localeCompare(right.subject.name),
    );

  const grandTotal = ranked.reduce((sum, entry) => sum + entry.total, 0);
  const maxValue = Math.max(1, ...ranked.map((entry) => entry.total));

  const rows: ComparisonRow[] = ranked.map(({ subject, total }) => {
    const counts = subject.counts[panel.id];
    const segments: SegmentedBarSegment[] = activeValues.map((value) => {
      const amount = counts[value.id] ?? 0;
      const share = total > 0 ? amount / total : 0;
      return {
        key: value.id,
        className: value.segmentClass,
        label: value.label,
        value: amount,
        visibleLabel: amount > 0 && share >= 0.16 ? formatCount(amount) : undefined,
        title:
          amount > 0
            ? statPercentWithValue(`${Math.round(share * 100)}%`, formatCount(amount), value.label)
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
          subtitle={teamLabel(subject.team)}
        />
      ),
      ariaLabel: `${subject.name}: ${formatCount(total)} ${panel.noun}`,
      segments,
      total,
      maxValue,
      valueLabel: formatCount(total),
    };
  });

  return (
    <section className="chart-panel full-span">
      <header className="chart-panel-header">
        <h3>{panel.title}</h3>
        <span>{`${grandTotal.toLocaleString()} ${panel.noun}`}</span>
      </header>
      <ComparisonRows rows={rows} emptyLabel={`No ${panel.noun} are available yet.`} />
      <AerialLegend values={activeValues} />
    </section>
  );
}

function AerialLegend({ values }: { values: AerialValue[] }) {
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

function panelTotal(subject: AerialSubject, panelId: string): number {
  return sumCounts(subject.counts[panelId]);
}

function sumCounts(counts: Record<string, number>): number {
  let total = 0;
  for (const value of Object.values(counts)) total += value;
  return total;
}

function aerialSubjects(players: ReplayPlayer[], events: MechanicEventResponse[]): AerialSubject[] {
  const subjects = players.map((player, index) => emptySubject(player, index));
  const byKey = new Map(subjects.map((subject) => [subject.key, subject]));

  for (const event of events) {
    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const subject = byKey.get(playerKey(players[playerIndex], playerIndex));
    if (subject) accumulate(subject, event);
  }

  return subjects.filter((subject) => PANELS.some((panel) => panelTotal(subject, panel.id) > 0));
}

function emptySubject(player: ReplayPlayer, index: number): AerialSubject {
  const counts: Record<string, Record<string, number>> = {};
  for (const panel of PANELS) counts[panel.id] = {};
  return {
    key: playerKey(player, index),
    name: player.name || player.platform_player_id || "Unknown",
    platform: player.platform,
    platformPlayerId: player.platform_player_id,
    rank: statPlayerRank(player),
    team: player.team,
    counts,
  };
}

function accumulate(subject: AerialSubject, event: MechanicEventResponse) {
  switch (event.event_type) {
    case "flip_reset":
      bump(subject, "mix", "flip_reset");
      break;
    case "double_tap":
      bump(subject, "mix", "double_tap");
      break;
    case "wall_aerial": {
      bump(subject, "mix", "wall_aerial");
      const wall = stringPayload(event.payload, "wall");
      if (wall && WALL_VALUES.some((value) => value.id === wall)) bump(subject, "wall", wall);
      break;
    }
    case "air_dribble": {
      bump(subject, "mix", "air_dribble");
      const origin = stringPayload(event.payload, "air_dribble_origin");
      if (origin && ORIGIN_VALUES.some((value) => value.id === origin)) {
        bump(subject, "origin", origin);
      }
      break;
    }
    case "goal_context": {
      for (const tag of goalTagKinds(event.payload)) {
        if (GOAL_VALUES.some((value) => value.id === tag)) bump(subject, "goals", tag);
      }
      break;
    }
    case "touch": {
      const band = stringPayload(event.payload, "height_band");
      if (band && HEIGHT_VALUES.some((value) => value.id === band)) bump(subject, "height", band);
      break;
    }
    default:
      break;
  }
}

function bump(subject: AerialSubject, panelId: string, valueId: string) {
  const counts = subject.counts[panelId];
  counts[valueId] = (counts[valueId] ?? 0) + 1;
}

// Goal tags live under payload.tags as `{ kind, metadata }` objects (GoalTag).
function goalTagKinds(payload: Record<string, unknown>): string[] {
  const tags = payload.tags;
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) =>
      tag && typeof tag === "object" && !Array.isArray(tag)
        ? (tag as Record<string, unknown>).kind
        : null,
    )
    .filter((kind): kind is string => typeof kind === "string");
}

// --- player attribution (shared shape with the touches section) ---------------

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
  return `/players/${encodeURIComponent(subject.platform)}/${encodeURIComponent(subject.platformPlayerId)}/stats/aerials`;
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
