import { playerProfilePath } from "../playerIdentity";
import type { MechanicEventResponse, ReplayPlayer } from "../types";
import { SegmentedBar, StatPlayerLabel, statPlayerRank } from "./shared";

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
  player: ReplayPlayer | null;
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

interface MechanicPlayerCount {
  key: string;
  name: string;
  player: ReplayPlayer;
  games: number | null;
  count: number;
}

interface MechanicLeaderboard {
  key: string;
  label: string;
  total: number;
  players: MechanicPlayerCount[];
}

export function MechanicsDetail({ events, players, scope = "replay" }: MechanicsDetailProps) {
  const mechanicEvents = events.filter((event) => mechanicEventTypes.includes(event.event_type));

  if (!mechanicEvents.length) {
    return (
      <div className="stat-empty">
        No mechanic events are available for this {scope === "group" ? "group" : "replay"} yet.
      </div>
    );
  }

  if (scope === "group") {
    return (
      <MechanicLeaderboards
        mechanics={mechanicLeaderboards(mechanicEvents, players)}
        totalEvents={mechanicEvents.length}
      />
    );
  }

  const playerRows = playerMechanicRows(players, mechanicEvents);
  const mechanicRows = mechanicTypeRows(mechanicEvents, players);

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

function MechanicLeaderboards({
  mechanics,
  totalEvents,
}: {
  mechanics: MechanicLeaderboard[];
  totalEvents: number;
}) {
  if (!mechanics.length) {
    return (
      <div className="stat-empty">No mechanic leaderboards are available for this group yet.</div>
    );
  }

  return (
    <div className="mechanics-detail">
      <div className="stat-section-grid">
        {mechanics.map((mechanic) => {
          const maxCount = mechanic.players[0]?.count ?? 0;
          return (
            <section className="chart-panel full-span" key={mechanic.key}>
              <header className="chart-panel-header">
                <h3>{mechanic.label}</h3>
                <span>
                  {mechanic.total.toLocaleString()} events ·{" "}
                  {formatShare(mechanic.total, totalEvents)} of mechanics
                </span>
              </header>
              <div className="mechanic-leaderboard-rows">
                {mechanic.players.map((entry) => (
                  <div className="mechanic-leaderboard-row" key={entry.key}>
                    <StatPlayerLabel
                      name={entry.name}
                      platform={entry.player.platform ?? null}
                      profilePath={playerProfilePath(
                        entry.player.platform,
                        entry.player.platform_player_id,
                      )}
                      rank={statPlayerRank(entry.player)}
                      subtitle={
                        entry.games == null
                          ? "Games unknown"
                          : `${entry.games.toLocaleString()} games`
                      }
                    />
                    <SegmentedBar
                      ariaLabel={`${entry.name}: ${entry.count.toLocaleString()} ${mechanic.label}`}
                      className="mechanic-leaderboard-track"
                      maxValue={maxCount}
                      segments={[
                        {
                          key: entry.key,
                          className: "mechanic-leaderboard-segment",
                          label: mechanic.label,
                          value: entry.count,
                        },
                      ]}
                      total={entry.count}
                    />
                    <strong className="mechanic-leaderboard-count">
                      {entry.count.toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
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
                <StatPlayerLabel
                  name={row.name}
                  platform={row.player?.platform ?? null}
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
              <td>{row.count.toLocaleString()}</td>
              <td>{row.games == null ? "Unknown" : row.games.toLocaleString()}</td>
              <td>{formatDecimal(rate(row.count, row.games), 2)}</td>
              <td>{row.uniqueMechanics.toLocaleString()}</td>
              <td>
                {row.topMechanic ? `${row.topMechanic.label} (${row.topMechanic.count})` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MechanicTypeLeaderboard({
  rows,
  totalEvents,
}: {
  rows: MechanicTypeRow[];
  totalEvents: number;
}) {
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
              <td>
                <strong>{row.label}</strong>
              </td>
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

function playerMechanicRows(
  players: ReplayPlayer[],
  events: MechanicEventResponse[],
): PlayerMechanicRow[] {
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
      const mechanicCounts = [...(mechanicCountsByPlayer.get(key)?.values() ?? [])].sort(
        compareCounts,
      );
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

function mechanicTypeRows(
  events: MechanicEventResponse[],
  players: ReplayPlayer[],
): MechanicTypeRow[] {
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
    row.leader =
      [...counts.entries()]
        .map(([key, count]) => ({ name: playerNameForKey(players, key), count }))
        .sort(
          (left, right) => right.count - left.count || left.name.localeCompare(right.name),
        )[0] ?? null;
  }

  return [...rows.values()].sort(compareCounts);
}

function mechanicLeaderboards(
  events: MechanicEventResponse[],
  players: ReplayPlayer[],
): MechanicLeaderboard[] {
  const boards = new Map<
    string,
    { key: string; label: string; total: number; counts: Map<string, MechanicPlayerCount> }
  >();

  for (const event of events) {
    const mechanic = mechanicCount(event);
    const board = boards.get(mechanic.key) ?? {
      key: mechanic.key,
      label: mechanic.label,
      total: 0,
      counts: new Map<string, MechanicPlayerCount>(),
    };
    board.total += 1;

    for (const playerIndex of creditedPlayerIndexes(event, players)) {
      const player = players[playerIndex];
      const key = playerKey(player, playerIndex);
      const existing = board.counts.get(key);
      board.counts.set(key, {
        key,
        name: player.name || player.platform_player_id || "Unknown",
        player,
        games: player.appearance_count ?? null,
        count: (existing?.count ?? 0) + 1,
      });
    }
    boards.set(mechanic.key, board);
  }

  return [...boards.values()]
    .map((board) => ({
      key: board.key,
      label: board.label,
      total: board.total,
      players: [...board.counts.values()].sort(
        (left, right) => right.count - left.count || left.name.localeCompare(right.name),
      ),
    }))
    .filter((board) => board.players.length > 0)
    .sort((left, right) => right.total - left.total || left.label.localeCompare(right.label));
}

// Mechanics that are inherently a contest between two players. Their top-level
// player_id only names one side (e.g. fifty_fifty always attributes to team
// zero), so counting by player_id is meaningless — both participants took part.
// Credit each participant named in the payload instead.
const CONTESTED_MECHANIC_PAYLOAD_PLAYERS: Record<string, readonly string[]> = {
  fifty_fifty: ["team_zero_player", "team_one_player"],
};

// A payload participant is encoded as a single-key platform map, e.g.
// {"Epic":"b70a..."} or {"Xbox":"2535..."}. Normalize it to the same
// "platform:id" identity used by playerIdentity so it can be matched to a player.
function payloadPlayerIdentity(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const entry = Object.entries(value as Record<string, unknown>)[0];
  if (!entry) return null;
  const [platform, id] = entry;
  if (!platform || typeof id !== "string" || !id) return null;
  return `${normalizePlatform(platform)}:${id}`;
}

function creditedPlayerIndexes(event: MechanicEventResponse, players: ReplayPlayer[]): number[] {
  const payloadFields = CONTESTED_MECHANIC_PAYLOAD_PLAYERS[event.event_type];
  if (payloadFields) {
    const indexes = new Set<number>();
    for (const field of payloadFields) {
      const identity = payloadPlayerIdentity(event.payload[field]);
      if (!identity) continue;
      const index = players.findIndex((player) => playerIdentity(player) === identity);
      if (index >= 0) indexes.add(index);
    }
    if (indexes.size) return [...indexes];
  }

  const index = players.findIndex((player) => eventMatchesPlayer(player, event));
  return index >= 0 ? [index] : [];
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
  if (
    eventPlayerId &&
    (player.platform_player_id === eventPlayerId || playerIdentity(player) === eventPlayerId)
  ) {
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
