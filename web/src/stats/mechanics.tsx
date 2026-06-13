import { PlayerIdentity, type PlayerIdentityData } from "../playerIdentity";
import type { MechanicEventResponse, ReplayPlayer } from "../types";

export const mechanicEventTypes = [
  "ceiling_shot",
  "backboard_bounce",
  "wall_aerial",
  "wall_aerial_shot",
  "center",
  "flick",
  "musty_flick",
  "dodge_reset",
  "flip_reset",
  "flip_reset_followup_dodge",
  "double_tap",
  "one_timer",
  "pass",
  "ball_carry",
  "controlled_play",
  "rush",
  "dodge",
  "speed_flip",
  "half_flip",
  "half_volley",
  "wavedash",
  "whiff",
  "powerslide",
  "touch",
  "bump",
  "fifty_fifty",
];

interface MechanicsDetailProps {
  events: MechanicEventResponse[];
  players: ReplayPlayer[];
  scope?: "replay" | "group";
}

interface PlayerMechanicRow {
  key: string;
  name: string;
  player: PlayerIdentityData | null;
  games: number | null;
  count: number;
  uniqueMechanics: number;
  topMechanic: MechanicCount | null;
}

interface MechanicCount {
  key: string;
  label: string;
  count: number;
}

interface MechanicTypeRow extends MechanicCount {
  playerCount: number;
  leader: { name: string; count: number } | null;
}

export function MechanicsDetail({ events, players, scope = "replay" }: MechanicsDetailProps) {
  const mechanicEvents = events.filter((event) => mechanicEventTypes.includes(event.event_type));
  const playerRows = playerMechanicRows(players, mechanicEvents);
  const mechanicRows = mechanicTypeRows(mechanicEvents, players);

  if (!mechanicEvents.length) {
    return <div className="stat-empty">No mechanic events are available for this {scope === "group" ? "group" : "replay"} yet.</div>;
  }

  return (
    <div className="mechanics-detail">
      <div className="stat-section-grid">
        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Player mechanic leaderboard</h3>
            <span>{mechanicEvents.length.toLocaleString()} loaded mechanic events</span>
          </header>
          <PlayerMechanicLeaderboard rows={playerRows} />
        </section>

        <section className="chart-panel full-span">
          <header className="chart-panel-header">
            <h3>Mechanic leaderboard</h3>
            <span>Counts by mechanic type</span>
          </header>
          <MechanicTypeLeaderboard rows={mechanicRows} totalEvents={mechanicEvents.length} />
        </section>
      </div>
    </div>
  );
}

function PlayerMechanicLeaderboard({ rows }: { rows: PlayerMechanicRow[] }) {
  if (!rows.length) {
    return <div className="stat-empty">No player mechanic rows are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Events</th>
            <th>Games</th>
            <th>Per game</th>
            <th>Mechanics</th>
            <th>Top mechanic</th>
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
              <td>{row.count.toLocaleString()}</td>
              <td>{row.games == null ? "Unknown" : row.games.toLocaleString()}</td>
              <td>{formatDecimal(rate(row.count, row.games), 2)}</td>
              <td>{row.uniqueMechanics.toLocaleString()}</td>
              <td>{row.topMechanic ? `${row.topMechanic.label} (${row.topMechanic.count})` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MechanicTypeLeaderboard({ rows, totalEvents }: { rows: MechanicTypeRow[]; totalEvents: number }) {
  if (!rows.length) {
    return <div className="stat-empty">No mechanic type rows are available yet.</div>;
  }

  return (
    <div className="table-frame compact-table stat-leaderboard-table">
      <table>
        <thead>
          <tr>
            <th>Mechanic</th>
            <th>Events</th>
            <th>Share</th>
            <th>Players</th>
            <th>Leader</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td><strong>{row.label}</strong></td>
              <td>{row.count.toLocaleString()}</td>
              <td>{formatShare(row.count, totalEvents)}</td>
              <td>{row.playerCount.toLocaleString()}</td>
              <td>{row.leader ? `${row.leader.name} (${row.leader.count})` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function playerMechanicRows(players: ReplayPlayer[], events: MechanicEventResponse[]): PlayerMechanicRow[] {
  const eventCounts = new Map<string, number>();
  const mechanicCountsByPlayer = new Map<string, Map<string, MechanicCount>>();

  for (const event of events) {
    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const player = players[playerIndex];
    const key = playerKey(player, playerIndex);
    eventCounts.set(key, (eventCounts.get(key) ?? 0) + 1);
    const counts = mechanicCountsByPlayer.get(key) ?? new Map<string, MechanicCount>();
    const mechanic = mechanicCount(event);
    const existing = counts.get(mechanic.key);
    counts.set(mechanic.key, { ...mechanic, count: (existing?.count ?? 0) + 1 });
    mechanicCountsByPlayer.set(key, counts);
  }

  return players
    .map((player, index) => {
      const key = playerKey(player, index);
      const mechanicCounts = [...(mechanicCountsByPlayer.get(key)?.values() ?? [])].sort(compareCounts);
      return {
        key,
        name: player.name || player.platform_player_id || "Unknown",
        player,
        games: player.appearance_count ?? null,
        count: eventCounts.get(key) ?? 0,
        uniqueMechanics: mechanicCounts.length,
        topMechanic: mechanicCounts[0] ?? null,
      };
    })
    .filter((row) => row.count > 0)
    .sort((left, right) => {
      if (right.count !== left.count) return right.count - left.count;
      return left.name.localeCompare(right.name);
    });
}

function mechanicTypeRows(events: MechanicEventResponse[], players: ReplayPlayer[]): MechanicTypeRow[] {
  const rows = new Map<string, MechanicTypeRow>();
  const playerCountsByMechanic = new Map<string, Map<string, number>>();

  for (const event of events) {
    const mechanic = mechanicCount(event);
    const existing = rows.get(mechanic.key);
    rows.set(mechanic.key, {
      key: mechanic.key,
      label: mechanic.label,
      count: (existing?.count ?? 0) + 1,
      playerCount: existing?.playerCount ?? 0,
      leader: existing?.leader ?? null,
    });

    const playerIndex = players.findIndex((player) => eventMatchesPlayer(player, event));
    if (playerIndex < 0) continue;
    const player = players[playerIndex];
    const playerKeyValue = playerKey(player, playerIndex);
    const counts = playerCountsByMechanic.get(mechanic.key) ?? new Map<string, number>();
    counts.set(playerKeyValue, (counts.get(playerKeyValue) ?? 0) + 1);
    playerCountsByMechanic.set(mechanic.key, counts);
  }

  for (const row of rows.values()) {
    const counts = playerCountsByMechanic.get(row.key) ?? new Map<string, number>();
    row.playerCount = counts.size;
    row.leader = [...counts.entries()]
      .map(([key, count]) => ({ name: playerNameForKey(players, key), count }))
      .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))[0] ?? null;
  }

  return [...rows.values()].sort(compareCounts);
}

function mechanicCount(event: MechanicEventResponse): MechanicCount {
  const key = event.mechanic || event.event_type;
  return {
    key,
    label: event.event_type_label || formatLabel(key),
    count: 0,
  };
}

function eventMatchesPlayer(player: ReplayPlayer, event: MechanicEventResponse): boolean {
  const eventPlayerId = (event.player_id ?? stringPayloadValue(event.payload, "player_id"))?.trim();
  if (eventPlayerId && (player.platform_player_id === eventPlayerId || playerIdentity(player) === eventPlayerId)) {
    return true;
  }
  const eventName = event.player_name?.trim().toLowerCase();
  return Boolean(eventName && player.name?.trim().toLowerCase() === eventName);
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

function stringPayloadValue(payload: Record<string, unknown>, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizePlatform(value: string): string {
  const lower = value.toLowerCase();
  if (lower === "psynet") return "epic";
  if (lower === "playstation") return "ps4";
  return lower;
}

function compareCounts(left: MechanicCount, right: MechanicCount): number {
  if (right.count !== left.count) return right.count - left.count;
  return left.label.localeCompare(right.label);
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

function formatLabel(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
