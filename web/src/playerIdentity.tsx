import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlatformIcon } from "./platform";
import type { ReplayPlayer } from "./types";

export interface PlayerIdentityData {
  name?: string | null;
  platform?: string | null;
  platform_player_id?: string | null;
  team?: number | null;
}

export function playerProfilePath(platform: string | null | undefined, platformPlayerId: string | null | undefined): string | null {
  if (!platform || !platformPlayerId) return null;
  return `/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}`;
}

export function playerDisplayName(player: PlayerIdentityData | ReplayPlayer | null | undefined): string {
  return player?.name || player?.platform_player_id || "Unknown";
}

export function replayLocalTeamLabel(team: number | null | undefined): string {
  if (team === 0) return "Blue";
  if (team === 1) return "Orange";
  return "Unknown";
}

export function replayLocalTeamClass(team: number | null | undefined): string {
  if (team === 0) return "blue";
  if (team === 1) return "orange";
  return "unknown";
}

export function playerIdentityKey(player: PlayerIdentityData | ReplayPlayer, fallback: string | number): string {
  return `${player.platform ?? "unknown"}:${player.platform_player_id ?? player.name ?? fallback}`;
}

export function PlayerIdentity({
  player,
  name,
  platform,
  platformPlayerId,
  team,
  detail,
  suffix,
  className = "",
  showPlatform = true,
  showTeam = true,
  link = true,
}: {
  player?: PlayerIdentityData | ReplayPlayer | null;
  name?: string | null;
  platform?: string | null;
  platformPlayerId?: string | null;
  team?: number | null;
  detail?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  showPlatform?: boolean;
  showTeam?: boolean;
  link?: boolean;
}) {
  const resolvedName = name ?? playerDisplayName(player);
  const resolvedPlatform = platform ?? player?.platform ?? null;
  const resolvedPlatformPlayerId = platformPlayerId ?? player?.platform_player_id ?? null;
  const resolvedTeam = team ?? player?.team ?? null;
  const resolvedDetail = detail ?? (showTeam ? replayLocalTeamLabel(resolvedTeam) : null);
  const href = link ? playerProfilePath(resolvedPlatform, resolvedPlatformPlayerId) : null;
  const classes = [
    "player-identity",
    `team-accent-${replayLocalTeamClass(resolvedTeam)}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="player-identity-main">
        <span className="player-name-with-platform">
          {showPlatform ? <PlatformIcon platform={resolvedPlatform} /> : null}
          <span className="player-name">{resolvedName}</span>
        </span>
        {suffix}
      </span>
      {resolvedDetail ? <span className="player-identity-detail">{resolvedDetail}</span> : null}
    </>
  );

  if (href) {
    return (
      <Link className={classes} to={href}>
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
}
