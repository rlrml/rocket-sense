import { useEffect, useMemo, useState } from "react";
import { listPlayerEvents } from "../api";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import {
  comparisonSubjectLabel,
  StatComparisonGrid,
  StatComparisonPanel,
  subjectIndexByTeam,
  subjectMagnitudeRows,
  subjectSplitRows,
  type SplitValue,
} from "./comparisonPanels";
import { statPlayerRank, type StatPlayerRank } from "./shared";

// Ground play is built from the `flick` stream: a dodge-powered touch following a
// short controlled carry setup. Each FlickEvent payload carries the dodge `kind`
// (forward / reverse / side / other), its `direction` handedness, the impulse it
// imparted to the ball (`ball_speed_change`, `vertical_impulse`), and the carry
// setup that preceded it (`setup_duration`, `setup_touch_count`).
export const groundPlayEventTypes = ["flick"];

// FlickKind from subtr-actor: the dodge direction behind the flick. `other`
// covers flicks without a clear dodge axis (e.g. missing dodge torque).
const TYPE_VALUES: SplitValue[] = [
  { id: "forward", label: "Forward", segmentClass: "ground-seg-type-forward" },
  { id: "reverse", label: "Reverse", segmentClass: "ground-seg-type-reverse" },
  { id: "side", label: "Side", segmentClass: "ground-seg-type-side" },
  { id: "other", label: "Other", segmentClass: "ground-seg-type-other" },
];
const TYPE_IDS = new Set(TYPE_VALUES.map((value) => value.id));

// FlickDirection from subtr-actor: the dodge's handedness.
const SIDE_VALUES: SplitValue[] = [
  { id: "left", label: "Left", segmentClass: "ground-seg-side-left" },
  { id: "center", label: "Center", segmentClass: "ground-seg-side-center" },
  { id: "right", label: "Right", segmentClass: "ground-seg-side-right" },
];
const SIDE_IDS = new Set(SIDE_VALUES.map((value) => value.id));

interface GroundPlaySubject {
  key: string;
  name: string;
  platform: string | null;
  platformPlayerId: string | null;
  rank: StatPlayerRank | null;
  team: number | null;
  flickCount: number;
  // value id -> count
  typeCounts: Record<string, number>;
  sideCounts: Record<string, number>;
  // running totals; averaged at read time over flickCount
  powerSum: number;
  popSum: number;
  setupSum: number;
  touchesSum: number;
}

// One ranked magnitude panel. The averages return `null` for subjects with no
// flicks so the bar renders a placeholder instead of a misleading zero.
interface MagnitudePanel {
  id: string;
  title: string;
  // Filled into the aria label, e.g. "12 flicks" / "avg flick power".
  noun: string;
  // Drives the bar color in group/career scope (team-colored in replay scope).
  groupClassName: string;
  metric: (subject: GroundPlaySubject) => number | null;
  format: (value: number) => string;
}

const MAGNITUDE_PANELS: MagnitudePanel[] = [
  {
    id: "flicks",
    title: "Flicks",
    noun: "flicks",
    groupClassName: "ground-seg-flicks",
    metric: (subject) => subject.flickCount,
    format: formatCount,
  },
  {
    id: "power",
    title: "Flick power",
    noun: "avg flick power",
    groupClassName: "ground-seg-power",
    metric: (subject) => average(subject.powerSum, subject.flickCount),
    format: formatSpeed,
  },
  {
    id: "pop",
    title: "Vertical pop",
    noun: "avg vertical pop",
    groupClassName: "ground-seg-pop",
    metric: (subject) => average(subject.popSum, subject.flickCount),
    format: formatSpeed,
  },
  {
    id: "carry-time",
    title: "Carry setup",
    noun: "avg carry seconds",
    groupClassName: "ground-seg-carry-time",
    metric: (subject) => average(subject.setupSum, subject.flickCount),
    format: formatSeconds,
  },
  {
    id: "carry-touches",
    title: "Carry touches",
    noun: "avg carry touches",
    groupClassName: "ground-seg-carry-touches",
    metric: (subject) => average(subject.touchesSum, subject.flickCount),
    format: formatTouches,
  },
];

interface SplitPanel {
  id: string;
  title: string;
  noun: string;
  values: SplitValue[];
  counts: (subject: GroundPlaySubject) => Record<string, number>;
}

const SPLIT_PANELS: SplitPanel[] = [
  {
    id: "type",
    title: "Flick type",
    noun: "flicks",
    values: TYPE_VALUES,
    counts: (s) => s.typeCounts,
  },
  {
    id: "side",
    title: "Flick side",
    noun: "flicks",
    values: SIDE_VALUES,
    counts: (s) => s.sideCounts,
  },
];

// Shared per-game / replay-group view. One subject per participant, ranked on
// each panel — mirrors the Aerials section's one-graph-per-stat shape.
export function GroundPlayDetail({
  events,
  players,
  scope = "replay",
}: {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  durationSeconds?: number | null;
  replayId?: string;
  scope?: "replay" | "group";
}) {
  const subjects = useMemo(() => replaySubjects(players, events), [players, events]);

  if (!subjects.length || subjects.every((subject) => subject.flickCount === 0)) {
    return (
      <div className="stat-empty">
        No flicks were detected for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  return <GroundPlayPanels subjects={subjects} scope={scope} />;
}

// Career / lifetime view: every flick whose primary subject is this player, over
// the active replay set. Self-fetching like BoostProfileDetail so the section can
// be injected into the player stats page without threading event state through.
export function GroundPlayProfileDetail({
  platform,
  platformPlayerId,
  playerName,
  search,
}: {
  platform: string;
  platformPlayerId: string;
  playerName: string;
  search: string;
}) {
  const [events, setEvents] = useState<MechanicEventResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setEvents(null);
    listPlayerEvents(
      `${platform}:${platformPlayerId}`,
      groundPlayEventTypes,
      new URLSearchParams(search),
    )
      .then((response) => {
        if (!cancelled) setEvents(response.events);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [platform, platformPlayerId, search]);

  const subject = useMemo(
    () => (events ? careerSubject(playerName, platform, platformPlayerId, events) : null),
    [events, playerName, platform, platformPlayerId],
  );

  if (loading) {
    return <div className="stat-empty">Loading ground-play data...</div>;
  }
  if (error) {
    return <div className="stat-empty">Ground-play data is unavailable: {error}</div>;
  }
  if (!subject || subject.flickCount === 0) {
    return <div className="stat-empty">No flicks were detected for this replay set yet.</div>;
  }

  return <GroundPlayPanels subjects={[subject]} scope="group" />;
}

function GroundPlayPanels({
  subjects,
  scope,
}: {
  subjects: GroundPlaySubject[];
  scope: "replay" | "group";
}) {
  const teamColored = scope !== "group";
  const subjectIndexByKey = subjectIndexByTeam(subjects);

  return (
    <div className="ground-play-detail">
      <StatComparisonGrid contained={false}>
        {MAGNITUDE_PANELS.map((panel) => (
          <StatComparisonPanel
            key={panel.id}
            title={panel.title}
            rows={subjectMagnitudeRows(subjects, {
              teamColored,
              subjectIndexByKey,
              groupClassName: panel.groupClassName,
              metric: panel.metric,
              format: panel.format,
              label: (subject) => comparisonSubjectLabel(subject, "ground-play"),
              ariaSuffix: panel.noun,
            })}
          />
        ))}
        {SPLIT_PANELS.map((panel) => (
          <StatComparisonPanel
            key={panel.id}
            title={panel.title}
            emptyLabel={`No ${panel.noun} are available yet.`}
            footer={<GroundPlayLegend values={panel.values} />}
            rows={subjectSplitRows(subjects, panel.values, {
              amount: (subject, value) => panel.counts(subject)[value.id] ?? 0,
              total: (subject) => sumCounts(panel.counts(subject)),
              format: formatCount,
              label: (subject) => comparisonSubjectLabel(subject, "ground-play"),
              minLabelShare: 0.16,
            })}
          />
        ))}
      </StatComparisonGrid>
    </div>
  );
}

function GroundPlayLegend({ values }: { values: SplitValue[] }) {
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

// --- subject building ---------------------------------------------------------

function replaySubjects(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): GroundPlaySubject[] {
  const subjects = players.map((player, index) =>
    emptySubject(playerKey(player, index), player, index),
  );
  const byKey = new Map(subjects.map((subject) => [subject.key, subject]));

  for (const event of events) {
    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const subject = byKey.get(playerKey(players[playerIndex], playerIndex));
    if (subject) accumulate(subject, event);
  }

  return subjects;
}

// Career events come pre-filtered to the target player (player-id query), so
// every event belongs to the single subject — no per-player attribution needed.
function careerSubject(
  playerName: string,
  platform: string,
  platformPlayerId: string,
  events: MechanicEventResponse[],
): GroundPlaySubject {
  const subject: GroundPlaySubject = {
    key: `${platform}:${platformPlayerId}`,
    name: playerName || platformPlayerId,
    platform,
    platformPlayerId,
    rank: null,
    team: null,
    flickCount: 0,
    typeCounts: {},
    sideCounts: {},
    powerSum: 0,
    popSum: 0,
    setupSum: 0,
    touchesSum: 0,
  };
  for (const event of events) accumulate(subject, event);
  return subject;
}

function emptySubject(key: string, player: ReplayPlayer, _index: number): GroundPlaySubject {
  return {
    key,
    name: player.name || player.platform_player_id || "Unknown",
    platform: player.platform,
    platformPlayerId: player.platform_player_id,
    rank: statPlayerRank(player),
    team: player.team,
    flickCount: 0,
    typeCounts: {},
    sideCounts: {},
    powerSum: 0,
    popSum: 0,
    setupSum: 0,
    touchesSum: 0,
  };
}

function accumulate(subject: GroundPlaySubject, event: MechanicEventResponse) {
  subject.flickCount += 1;

  const rawKind = stringPayload(event.payload, "kind");
  const kind = rawKind && TYPE_IDS.has(rawKind) ? rawKind : "other";
  subject.typeCounts[kind] = (subject.typeCounts[kind] ?? 0) + 1;

  const rawDirection = stringPayload(event.payload, "direction");
  const direction = rawDirection && SIDE_IDS.has(rawDirection) ? rawDirection : "center";
  subject.sideCounts[direction] = (subject.sideCounts[direction] ?? 0) + 1;

  subject.powerSum += numberPayload(event.payload, "ball_speed_change") ?? 0;
  subject.popSum += Math.abs(numberPayload(event.payload, "vertical_impulse") ?? 0);
  subject.setupSum += numberPayload(event.payload, "setup_duration") ?? 0;
  subject.touchesSum += numberPayload(event.payload, "setup_touch_count") ?? 0;
}

// --- player attribution (shared shape with the aerials/touches sections) ------

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

// --- payload / formatting helpers ---------------------------------------------

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function numberPayload(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function sumCounts(counts: Record<string, number>): number {
  let total = 0;
  for (const value of Object.values(counts)) total += value;
  return total;
}

function average(sum: number, count: number): number | null {
  return count > 0 ? sum / count : null;
}

function formatCount(value: number): string {
  return Math.round(value).toLocaleString();
}

// ball_speed_change / vertical_impulse are in uu/s; show km/h like the rest of
// the app's speedometers (km/h = uu/s * 0.036).
function formatSpeed(value: number): string {
  return `${Math.round(value * 0.036).toLocaleString()} km/h`;
}

function formatSeconds(value: number): string {
  return `${value.toFixed(2)} s`;
}

function formatTouches(value: number): string {
  return value.toFixed(1);
}
