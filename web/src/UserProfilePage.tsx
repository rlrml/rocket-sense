import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile, listReplays } from "./api";
import { playerProfileIdPath } from "./playerIdentity";
import { ProviderLoginIcon, providerLabel } from "./providerIcons";
import type {
  ReplayPlaylistMetadata,
  ReplayResponse,
  UserGameIdentity,
  UserProfileResponse,
} from "./types";

// How many of the user's most recent uploads to surface inline. The full set is
// always reachable through the "View all uploads" link into the replay browser,
// which already supports the `uploader` filter.
const RECENT_UPLOAD_LIMIT = 25;

function formatJoinDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function formatReplayDate(value: string | null): string {
  if (!value) return "Date unknown";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

// Mirrors the replay-list playlist labeling so the profile reads consistently
// with the rest of the app without exporting the helper out of App.tsx.
function playlistLabel(
  metadata: ReplayPlaylistMetadata | null | undefined,
  fallback: string | null,
): string {
  if (metadata?.label) return metadata.label;
  if (!fallback) return "Unknown";
  return fallback
    .replace(/^online-/, "Online ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function replayTitle(replay: ReplayResponse): string {
  const { blue, orange } = replay.summary.team_scores;
  if (blue != null && orange != null) {
    return `Blue ${blue} – ${orange} Orange`;
  }
  if (replay.original_file_name) {
    return replay.original_file_name.replace(/\.replay$/i, "");
  }
  return replay.map_code ?? "Replay";
}

// A linked in-game player profile for the uploader. Steam/Epic logins map
// directly to a player's platform id; verified claims map any platform.
function GameIdentityCard({ identity }: { identity: UserGameIdentity }) {
  const label = identity.display_name?.trim() || providerLabel(identity.platform);
  const sourceNote =
    identity.source === "claim"
      ? "Verified player claim"
      : `Linked via ${providerLabel(identity.platform)} login`;
  return (
    <Link
      className="game-identity-card"
      to={playerProfileIdPath(identity.platform, identity.platform_player_id)}
      title={sourceNote}
    >
      <ProviderLoginIcon providerId={identity.platform} />
      <span className="game-identity-main">
        <strong>{label}</strong>
        <span className="game-identity-meta">
          {identity.appearance_count.toLocaleString()} appearance
          {identity.appearance_count === 1 ? "" : "s"}
        </span>
      </span>
    </Link>
  );
}

export function UserProfilePage() {
  const { userId = "" } = useParams();
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [replays, setReplays] = useState<ReplayResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProfile(null);
    setReplays([]);

    const params = new URLSearchParams();
    params.set("uploader", userId);
    params.set("count", String(RECENT_UPLOAD_LIMIT));

    Promise.all([getUserProfile(userId), listReplays(params)])
      .then(([profileResponse, replaysResponse]) => {
        if (cancelled) return;
        setProfile(profileResponse);
        setReplays(replaysResponse.replays);
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
  }, [userId]);

  if (loading) {
    return (
      <section className="page user-profile-page">
        <div className="stat-empty">Loading profile…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page user-profile-page">
        <div className="stat-empty">Failed to load profile: {error}</div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="page user-profile-page">
        <div className="stat-empty">User not found.</div>
      </section>
    );
  }

  const displayName = profile.display_name?.trim() || "Unnamed uploader";
  const uploadsHref = `/replays?uploader=${encodeURIComponent(profile.id)}`;
  // Tolerate older API responses (deployed before this field existed).
  const gameIdentities = profile.game_identities ?? [];

  return (
    <section className="page user-profile-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Uploader</p>
          <h1 className="player-profile-title">
            {profile.avatar_url ? (
              <img className="user-profile-avatar" src={profile.avatar_url} alt="" />
            ) : null}
            <span>{displayName}</span>
          </h1>
          <p className="page-header-note">
            {profile.upload_count.toLocaleString()} upload
            {profile.upload_count === 1 ? "" : "s"} · Joined {formatJoinDate(profile.created_at)}
          </p>
        </div>
        <div className="page-header-actions">
          <Link className="secondary-button" to={uploadsHref}>
            View all uploads
          </Link>
        </div>
      </header>

      {gameIdentities.length > 0 ? (
        <section className="profile-section">
          <h2 className="profile-section-title">Game profiles</h2>
          <div className="game-identity-list">
            {gameIdentities.map((identity) => (
              <GameIdentityCard
                key={`${identity.platform}:${identity.platform_player_id}`}
                identity={identity}
              />
            ))}
          </div>
        </section>
      ) : null}

      {replays.length === 0 ? (
        <div className="stat-empty">No uploads yet.</div>
      ) : (
        <>
          <div className="table-frame compact-table">
            <table>
              <thead>
                <tr>
                  <th>Replay</th>
                  <th>Playlist</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {replays.map((replay) => (
                  <tr key={replay.id}>
                    <td>
                      <Link to={`/replays/${encodeURIComponent(replay.id)}`}>
                        {replayTitle(replay)}
                      </Link>
                    </td>
                    <td>{playlistLabel(replay.playlist_metadata, replay.playlist)}</td>
                    <td>{formatReplayDate(replay.replay_date ?? replay.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {profile.upload_count > replays.length ? (
            <p className="page-header-note">
              Showing {replays.length} of {profile.upload_count.toLocaleString()} uploads.{" "}
              <Link to={uploadsHref}>View all in the replay browser →</Link>
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
