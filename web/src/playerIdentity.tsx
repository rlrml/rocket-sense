import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlatformIcon } from "./platform";
import { RankBadge } from "./rank";
import type { ReplayPlayer } from "./types";

export interface PlayerIdentityData {
  name?: string | null;
  platform?: string | null;
  platform_player_id?: string | null;
  team?: number | null;
  rank_tier?: number | null;
  rank_division?: number | null;
  rank_mmr?: number | null;
  rank_is_fallback?: boolean;
  rank_fallback_replay_date?: string | null;
}

export function playerProfilePath(
  platform: string | null | undefined,
  platformPlayerId: string | null | undefined,
): string | null {
  if (!platform || !platformPlayerId) return null;
  return `/players/${encodeURIComponent(platform)}/${encodeURIComponent(platformPlayerId)}`;
}

export function playerDisplayName(
  player: PlayerIdentityData | ReplayPlayer | null | undefined,
): string {
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

export function playerIdentityKey(
  player: PlayerIdentityData | ReplayPlayer,
  fallback: string | number,
): string {
  return `${player.platform ?? "unknown"}:${player.platform_player_id ?? player.name ?? fallback}`;
}

export function PlayerIdentity({
  player,
  name,
  platform,
  platformPlayerId,
  team,
  detail,
  rank,
  suffix,
  className = "",
  showPlatform = true,
  showRank = false,
  showTeam = true,
  link = true,
}: {
  player?: PlayerIdentityData | ReplayPlayer | null;
  name?: string | null;
  platform?: string | null;
  platformPlayerId?: string | null;
  team?: number | null;
  detail?: ReactNode;
  rank?: {
    tier: number | null | undefined;
    division: number | null | undefined;
    mmr: number | null | undefined;
    approximate?: boolean;
    approximateAsOf?: string | null;
  } | null;
  suffix?: ReactNode;
  className?: string;
  showPlatform?: boolean;
  showRank?: boolean;
  showTeam?: boolean;
  link?: boolean;
}) {
  const resolvedName = name ?? playerDisplayName(player);
  const resolvedPlatform = platform ?? player?.platform ?? null;
  const resolvedPlatformPlayerId = platformPlayerId ?? player?.platform_player_id ?? null;
  const resolvedTeam = team ?? player?.team ?? null;
  const resolvedDetail = detail ?? (showTeam ? replayLocalTeamLabel(resolvedTeam) : null);
  const resolvedRank =
    rank ??
    (player
      ? {
          tier: player.rank_tier,
          division: player.rank_division,
          mmr: player.rank_mmr,
          approximate: player.rank_is_fallback,
          approximateAsOf: player.rank_fallback_replay_date,
        }
      : null);
  const href = link ? playerProfilePath(resolvedPlatform, resolvedPlatformPlayerId) : null;
  const classes = [
    "player-identity",
    `team-accent-${replayLocalTeamClass(resolvedTeam)}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const nameNode = <span className="player-name">{resolvedName}</span>;
  const content = (
    <>
      <span className="player-identity-main">
        <span className="player-name-with-platform">
          {showPlatform ? (
            <PlatformIcon
              platform={resolvedPlatform}
              platformPlayerId={resolvedPlatformPlayerId}
              linkToRlTracker
            />
          ) : null}
          {href ? (
            <Link className="player-identity-profile-link" to={href}>
              {nameNode}
            </Link>
          ) : (
            nameNode
          )}
        </span>
        {suffix}
      </span>
      {resolvedDetail || (showRank && resolvedRank?.tier != null) ? (
        <span className="player-identity-detail">
          {resolvedDetail ? (
            <span className="player-identity-detail-text">{resolvedDetail}</span>
          ) : null}
          {showRank ? (
            <RankBadge
              tier={resolvedRank?.tier}
              division={resolvedRank?.division}
              mmr={resolvedRank?.mmr}
              approximate={resolvedRank?.approximate}
              approximateAsOf={resolvedRank?.approximateAsOf}
            />
          ) : null}
        </span>
      ) : null}
    </>
  );

  return <span className={classes}>{content}</span>;
}
