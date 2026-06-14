import type { MechanicEventResponse, ReplayPlayer } from "../types";

export const touchEventTypes = [
  "touch",
  "shot",
  "save",
  "assist",
  "goal",
  "pass",
  "center",
  "whiff",
  "bump",
  "fifty_fifty",
];

interface TouchesDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  scope?: "replay" | "group";
}

interface PlayerTouchRow {
  key: string;
  name: string;
  games: number | null;
  touches: number;
  shots: number;
  goals: number;
  assists: number;
  saves: number;
  passes: number;
  centers: number;
  whiffs: number;
  bumps: number;
  fifties: number;
  firstTouches: number;
  contestedTouches: number;
  aerialTouches: number;
  wallTouches: number;
}

interface TouchTypeRow {
  key: string;
  label: string;
  count: number;
  playerCount: number;
  leader: { name: string; count: number } | null;
}

interface TouchTraitRow {
  key: string;
  label: string;
  count: number;
  share: number | null;
}

export function TouchesDetail({ events, players, scope = "replay" }: TouchesDetailProps) {
  const touchEvents = events.filter((event) => touchEventTypes.includes(event.event_type));
  const playerRows = playerTouchRows(players, touchEvents);
  const typeRows = touchTypeRows(players, touchEvents);
  const traitRows = touchTraitRows(touchEvents);

  if (!touchEvents.length) {
    return (
      <div className="stat-empty">
        No touch or ball-interaction events are available for this{" "}
        {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  return (
    <div className="touches-detail">
      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Player touch leaderboard</h3>
            <span>{touchEvents.length.toLocaleString()} loaded ball-interaction events</span>
          </header>
          <PlayerTouchLeaderboard rows={playerRows} />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Interaction type leaderboard</h3>
            <span>Touches, shots, saves, passes, whiffs, bumps, and 50/50s</span>
          </header>
          <TouchTypeLeaderboard rows={typeRows} totalEvents={touchEvents.length} />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Touch trait leaderboard</h3>
            <span>Only classified touch events are included</span>
          </header>
          <TouchTraitLeaderboard rows={traitRows} />
        </section>
      </div>
    </div>
  );
}

function PlayerTouchLeaderboard({ rows }: { rows: PlayerTouchRow[] }) {
  if (!rows.length) {
    return <div className="stat-empty">No player touch rows are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Touches</th>
            <th>Per game</th>
            <th>Shots</th>
            <th>G / A / S</th>
            <th>Passes</th>
            <th>Centers</th>
            <th>Whiffs</th>
            <th>Bumps</th>
            <th>50/50s</th>
            <th>Touch profile</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>
                <strong>{row.name}</strong>
                <div className="subtle">
                  {row.games == null ? "Games unknown" : `${row.games.toLocaleString()} games`}
                </div>
              </td>
              <td>{row.touches.toLocaleString()}</td>
              <td>{formatDecimal(rate(row.touches, row.games), 1)}</td>
              <td>{row.shots.toLocaleString()}</td>
              <td>{`${row.goals.toLocaleString()} / ${row.assists.toLocaleString()} / ${row.saves.toLocaleString()}`}</td>
              <td>{row.passes.toLocaleString()}</td>
              <td>{row.centers.toLocaleString()}</td>
              <td>{row.whiffs.toLocaleString()}</td>
              <td>{row.bumps.toLocaleString()}</td>
              <td>{row.fifties.toLocaleString()}</td>
              <td>{touchProfile(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TouchTypeLeaderboard({
  rows,
  totalEvents,
}: {
  rows: TouchTypeRow[];
  totalEvents: number;
}) {
  if (!rows.length) {
    return <div className="stat-empty">No interaction type rows are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Interaction</th>
            <th>Events</th>
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
              </td>
              <td>{row.count.toLocaleString()}</td>
              <td>{formatShare(row.count, totalEvents)}</td>
              <td>{row.playerCount.toLocaleString()}</td>
              <td>
                {row.leader ? `${row.leader.name} (${row.leader.count.toLocaleString()})` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TouchTraitLeaderboard({ rows }: { rows: TouchTraitRow[] }) {
  if (!rows.length) {
    return <div className="stat-empty">No classified touch traits are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Trait</th>
            <th>Touches</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>
                <strong>{row.label}</strong>
              </td>
              <td>{row.count.toLocaleString()}</td>
              <td>{formatNullableShare(row.share)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function playerTouchRows(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): PlayerTouchRow[] {
  const rows = players.map((player, index) => ({
    key: playerKey(player, index),
    name: player.name || player.platform_player_id || "Unknown",
    games: player.appearance_count ?? null,
    touches: 0,
    shots: 0,
    goals: 0,
    assists: 0,
    saves: 0,
    passes: 0,
    centers: 0,
    whiffs: 0,
    bumps: 0,
    fifties: 0,
    firstTouches: 0,
    contestedTouches: 0,
    aerialTouches: 0,
    wallTouches: 0,
  }));
  const byKey = new Map(rows.map((row) => [row.key, row]));

  for (const event of events) {
    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const row = byKey.get(playerKey(players[playerIndex], playerIndex));
    if (!row) continue;

    switch (event.event_type) {
      case "touch":
        row.touches += 1;
        if (booleanPayload(event.payload, "first_touch")) row.firstTouches += 1;
        if (booleanPayload(event.payload, "contested")) row.contestedTouches += 1;
        if (
          stringPayload(event.payload, "surface") === "air" ||
          stringPayload(event.payload, "height_band")?.includes("air")
        )
          row.aerialTouches += 1;
        if (stringPayload(event.payload, "surface") === "wall") row.wallTouches += 1;
        break;
      case "shot":
        row.shots += 1;
        break;
      case "goal":
        row.goals += 1;
        break;
      case "assist":
        row.assists += 1;
        break;
      case "save":
        row.saves += 1;
        break;
      case "pass":
        row.passes += 1;
        break;
      case "center":
        row.centers += 1;
        break;
      case "whiff":
        row.whiffs += 1;
        break;
      case "bump":
        row.bumps += 1;
        break;
      case "fifty_fifty":
        row.fifties += 1;
        break;
    }
  }

  return rows
    .filter((row) => totalPlayerInteractions(row) > 0)
    .sort(
      (left, right) =>
        totalPlayerInteractions(right) - totalPlayerInteractions(left) ||
        left.name.localeCompare(right.name),
    );
}

function touchTypeRows(players: ReplayPlayer[], events: MechanicEventResponse[]): TouchTypeRow[] {
  const rows = new Map<string, TouchTypeRow>();
  const playerCountsByType = new Map<string, Map<string, number>>();

  for (const event of events) {
    const key = event.event_type;
    const existing = rows.get(key);
    rows.set(key, {
      key,
      label: event.event_type_label || formatLabel(key),
      count: (existing?.count ?? 0) + 1,
      playerCount: existing?.playerCount ?? 0,
      leader: existing?.leader ?? null,
    });

    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const eventPlayerKey = playerKey(players[playerIndex], playerIndex);
    const counts = playerCountsByType.get(key) ?? new Map<string, number>();
    counts.set(eventPlayerKey, (counts.get(eventPlayerKey) ?? 0) + 1);
    playerCountsByType.set(key, counts);
  }

  for (const row of rows.values()) {
    const counts = playerCountsByType.get(row.key) ?? new Map<string, number>();
    row.playerCount = counts.size;
    row.leader =
      [...counts.entries()]
        .map(([key, count]) => ({ name: playerNameForKey(players, key), count }))
        .sort(
          (left, right) => right.count - left.count || left.name.localeCompare(right.name),
        )[0] ?? null;
  }

  return [...rows.values()].sort(
    (left, right) => right.count - left.count || left.label.localeCompare(right.label),
  );
}

function touchTraitRows(events: MechanicEventResponse[]): TouchTraitRow[] {
  const touchEvents = events.filter((event) => event.event_type === "touch");
  const total = touchEvents.length;
  const traits = new Map<string, TouchTraitRow>();

  for (const event of touchEvents) {
    addTrait(traits, "first_touch", "First touch", booleanPayload(event.payload, "first_touch"));
    addTrait(traits, "contested", "Contested", booleanPayload(event.payload, "contested"));
    addTrait(
      traits,
      "aerial",
      "Aerial",
      stringPayload(event.payload, "surface") === "air" ||
        stringPayload(event.payload, "height_band")?.includes("air") === true,
    );
    addTrait(traits, "wall", "Wall", stringPayload(event.payload, "surface") === "wall");
    const intention = stringPayload(event.payload, "intention");
    if (intention)
      addTrait(traits, `intention:${intention}`, `Intent: ${formatLabel(intention)}`, true);
    const kind = stringPayload(event.payload, "kind");
    if (kind) addTrait(traits, `kind:${kind}`, `Kind: ${formatLabel(kind)}`, true);
  }

  return [...traits.values()]
    .map((row) => ({ ...row, share: total > 0 ? row.count / total : null }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

function addTrait(rows: Map<string, TouchTraitRow>, key: string, label: string, present: boolean) {
  if (!present) return;
  const existing = rows.get(key);
  rows.set(key, { key, label, count: (existing?.count ?? 0) + 1, share: null });
}

function totalPlayerInteractions(row: PlayerTouchRow): number {
  return (
    row.touches +
    row.shots +
    row.goals +
    row.assists +
    row.saves +
    row.passes +
    row.centers +
    row.whiffs +
    row.bumps +
    row.fifties
  );
}

function touchProfile(row: PlayerTouchRow): string {
  if (row.touches <= 0) return "-";
  const parts = [
    `${formatShare(row.firstTouches, row.touches)} first`,
    `${formatShare(row.contestedTouches, row.touches)} contested`,
    `${formatShare(row.aerialTouches, row.touches)} aerial`,
  ];
  if (row.wallTouches > 0) parts.push(`${formatShare(row.wallTouches, row.touches)} wall`);
  return parts.join(" / ");
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
    remoteIdKey(event.payload.passer),
    remoteIdKey(event.payload.initiator),
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

function playerNameForKey(players: ReplayPlayer[], key: string): string {
  const player = players.find((candidate, index) => playerKey(candidate, index) === key);
  return player?.name || player?.platform_player_id || "Unknown";
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

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function booleanPayload(payload: Record<string, unknown>, key: string): boolean {
  return payload[key] === true;
}

function rate(value: number, games: number | null): number | null {
  return games && games > 0 ? value / games : null;
}

function formatShare(value: number, total: number): string {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

function formatNullableShare(value: number | null): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${Math.round(value * 100)}%`;
}

function formatDecimal(value: number | null, digits: number): string {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatLabel(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
