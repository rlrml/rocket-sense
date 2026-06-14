import type { MechanicEventResponse, ReplayPlayer } from "../types";

export const rotationEventTypes = [
  "rotation_role",
  "rotation_role_first_man",
  "rotation_role_second_man",
  "rotation_role_third_man",
  "rotation_role_ambiguous",
  "rotation_role_unknown",
];

type RotationRole = "first_man" | "second_man" | "third_man" | "ambiguous" | "unknown";

interface RotationDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  scope?: "replay" | "group";
}

interface PlayerRotationRow {
  key: string;
  name: string;
  games: number | null;
  seconds: number;
  spans: number;
  roleSeconds: Record<RotationRole, number>;
}

interface RotationRoleRow {
  key: RotationRole;
  label: string;
  seconds: number;
  spans: number;
  playerCount: number;
  leader: { name: string; seconds: number } | null;
}

const rotationRoles: RotationRole[] = [
  "first_man",
  "second_man",
  "third_man",
  "ambiguous",
  "unknown",
];

export function RotationDetail({ events, players, scope = "replay" }: RotationDetailProps) {
  const rotationEvents = events.filter((event) => rotationEventTypes.includes(event.event_type));
  const playerRows = playerRotationRows(players, rotationEvents);
  const roleRows = rotationRoleRows(players, rotationEvents);
  const totalSeconds = sumBy(playerRows, (row) => row.seconds);

  if (!rotationEvents.length) {
    return (
      <div className="stat-empty">
        No rotation role events are available for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  return (
    <div className="rotation-detail">
      <div className="positioning-summary-grid">
        <RotationMetric
          label="Measured time"
          value={formatSeconds(totalSeconds)}
          detail="player-seconds"
        />
        <RotationMetric
          label="First man"
          value={formatShare(sumRole(playerRows, "first_man"), totalSeconds)}
          detail="rotation time"
        />
        <RotationMetric
          label="Second man"
          value={formatShare(sumRole(playerRows, "second_man"), totalSeconds)}
          detail="rotation time"
        />
        <RotationMetric
          label="Third man"
          value={formatShare(sumRole(playerRows, "third_man"), totalSeconds)}
          detail="rotation time"
        />
      </div>

      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Player rotation leaderboard</h3>
            <span>{rotationEvents.length.toLocaleString()} loaded rotation spans</span>
          </header>
          <PlayerRotationLeaderboard rows={playerRows} />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Rotation role leaderboard</h3>
            <span>Time by role state</span>
          </header>
          <RotationRoleLeaderboard rows={roleRows} totalSeconds={totalSeconds} />
        </section>
      </div>
    </div>
  );
}

function RotationMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="positioning-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

function PlayerRotationLeaderboard({ rows }: { rows: PlayerRotationRow[] }) {
  if (!rows.length) {
    return <div className="stat-empty">No player rotation rows are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Measured</th>
            <th>Spans</th>
            <th>First</th>
            <th>Second</th>
            <th>Third</th>
            <th>Ambiguous</th>
            <th>Top role</th>
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
              <td>{formatSeconds(row.seconds)}</td>
              <td>{row.spans.toLocaleString()}</td>
              <td>{formatShare(row.roleSeconds.first_man, row.seconds)}</td>
              <td>{formatShare(row.roleSeconds.second_man, row.seconds)}</td>
              <td>{formatShare(row.roleSeconds.third_man, row.seconds)}</td>
              <td>{formatShare(row.roleSeconds.ambiguous, row.seconds)}</td>
              <td>{topRole(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RotationRoleLeaderboard({
  rows,
  totalSeconds,
}: {
  rows: RotationRoleRow[];
  totalSeconds: number;
}) {
  if (!rows.length) {
    return <div className="stat-empty">No rotation role rows are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Time</th>
            <th>Share</th>
            <th>Spans</th>
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
              <td>{formatSeconds(row.seconds)}</td>
              <td>{formatShare(row.seconds, totalSeconds)}</td>
              <td>{row.spans.toLocaleString()}</td>
              <td>{row.playerCount.toLocaleString()}</td>
              <td>
                {row.leader ? `${row.leader.name} (${formatSeconds(row.leader.seconds)})` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function playerRotationRows(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): PlayerRotationRow[] {
  const rows = players.map((player, index) => ({
    key: playerKey(player, index),
    name: player.name || player.platform_player_id || "Unknown",
    games: player.appearance_count ?? null,
    seconds: 0,
    spans: 0,
    roleSeconds: emptyRoleSeconds(),
  }));
  const byKey = new Map(rows.map((row) => [row.key, row]));

  for (const event of events) {
    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const row = byKey.get(playerKey(players[playerIndex], playerIndex));
    if (!row) continue;
    const role = rotationRole(event);
    const seconds = eventDuration(event);
    row.seconds += seconds;
    row.spans += 1;
    row.roleSeconds[role] += seconds;
  }

  return rows
    .filter((row) => row.spans > 0)
    .sort((left, right) => right.seconds - left.seconds || left.name.localeCompare(right.name));
}

function rotationRoleRows(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): RotationRoleRow[] {
  const rows = new Map<RotationRole, RotationRoleRow>();
  const playerSecondsByRole = new Map<RotationRole, Map<string, number>>();

  for (const event of events) {
    const role = rotationRole(event);
    const seconds = eventDuration(event);
    const existing = rows.get(role);
    rows.set(role, {
      key: role,
      label: roleLabel(role),
      seconds: (existing?.seconds ?? 0) + seconds,
      spans: (existing?.spans ?? 0) + 1,
      playerCount: existing?.playerCount ?? 0,
      leader: existing?.leader ?? null,
    });

    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const eventPlayerKey = playerKey(players[playerIndex], playerIndex);
    const counts = playerSecondsByRole.get(role) ?? new Map<string, number>();
    counts.set(eventPlayerKey, (counts.get(eventPlayerKey) ?? 0) + seconds);
    playerSecondsByRole.set(role, counts);
  }

  for (const row of rows.values()) {
    const counts = playerSecondsByRole.get(row.key) ?? new Map<string, number>();
    row.playerCount = counts.size;
    row.leader =
      [...counts.entries()]
        .map(([key, seconds]) => ({ name: playerNameForKey(players, key), seconds }))
        .sort(
          (left, right) => right.seconds - left.seconds || left.name.localeCompare(right.name),
        )[0] ?? null;
  }

  return [...rows.values()].sort(
    (left, right) => right.seconds - left.seconds || left.label.localeCompare(right.label),
  );
}

function emptyRoleSeconds(): Record<RotationRole, number> {
  return {
    first_man: 0,
    second_man: 0,
    third_man: 0,
    ambiguous: 0,
    unknown: 0,
  };
}

function rotationRole(event: MechanicEventResponse): RotationRole {
  const payloadRole = stringPayload(event.payload, "state");
  if (isRotationRole(payloadRole)) return payloadRole;
  if (event.event_type === "rotation_role_first_man") return "first_man";
  if (event.event_type === "rotation_role_second_man") return "second_man";
  if (event.event_type === "rotation_role_third_man") return "third_man";
  if (event.event_type === "rotation_role_ambiguous") return "ambiguous";
  return "unknown";
}

function isRotationRole(value: string | null): value is RotationRole {
  return (
    value === "first_man" ||
    value === "second_man" ||
    value === "third_man" ||
    value === "ambiguous" ||
    value === "unknown"
  );
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
  return [event.player_id, remoteIdKey(event.payload.player)]
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

function eventDuration(event: MechanicEventResponse): number {
  const duration = numberPayload(event.payload, "duration");
  if (duration != null) return duration;
  if (event.start_time != null && event.end_time != null)
    return Math.max(0, event.end_time - event.start_time);
  return 0;
}

function numberPayload(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function stringPayload(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function sumBy<T>(items: T[], value: (item: T) => number): number {
  return items.reduce((total, item) => total + value(item), 0);
}

function sumRole(rows: PlayerRotationRow[], role: RotationRole): number {
  return sumBy(rows, (row) => row.roleSeconds[role]);
}

function topRole(row: PlayerRotationRow): string {
  const [role, seconds] = rotationRoles
    .map((candidate): [RotationRole, number] => [candidate, row.roleSeconds[candidate]])
    .sort(
      (left, right) => right[1] - left[1] || roleLabel(left[0]).localeCompare(roleLabel(right[0])),
    )[0];
  return seconds > 0 ? `${roleLabel(role)} (${formatShare(seconds, row.seconds)})` : "-";
}

function roleLabel(role: RotationRole): string {
  switch (role) {
    case "first_man":
      return "First man";
    case "second_man":
      return "Second man";
    case "third_man":
      return "Third man";
    case "ambiguous":
      return "Ambiguous";
    case "unknown":
      return "Unknown";
  }
}

function formatSeconds(value: number): string {
  if (!Number.isFinite(value)) return "Unknown";
  if (value > 0 && value < 10) return `${value.toFixed(1)}s`;
  return `${Math.round(value).toLocaleString()}s`;
}

function formatShare(value: number, total: number): string {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}
