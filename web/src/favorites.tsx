import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Users } from "lucide-react";
import {
  addFavoritePlayer,
  addFavoriteUploader,
  getFavorites,
  removeFavoritePlayer,
  removeFavoriteUploader,
} from "./api";
import { PlatformIcon } from "./platform";
import { playerProfileIdPath } from "./playerIdentity";
import type { FavoritesResponse } from "./types";

const EMPTY_FAVORITES: FavoritesResponse = { players: [], uploaders: [] };

interface FavoritesState {
  favorites: FavoritesResponse;
  loading: boolean;
  isPlayerFavorited: (platform: string, platformPlayerId: string) => boolean;
  isUploaderFavorited: (userId: string) => boolean;
  togglePlayer: (platform: string, platformPlayerId: string) => Promise<void>;
  toggleUploader: (userId: string) => Promise<void>;
}

// Shared favorites state for a single page. Each page that needs favorites
// instantiates this hook (one `GET /me/favorites` per page load); the player
// and uploader profile pages and the replays sidebar are never mounted at the
// same time, so a global context is unnecessary. Toggles re-fetch so the
// derived counts (appearances, uploads) stay accurate.
function useFavorites(enabled: boolean): FavoritesState {
  const [favorites, setFavorites] = useState<FavoritesResponse>(EMPTY_FAVORITES);
  const [loading, setLoading] = useState(enabled);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setFavorites(EMPTY_FAVORITES);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getFavorites()
      .then((response) => {
        if (!cancelled) setFavorites(response);
      })
      .catch(() => {
        if (!cancelled) setFavorites(EMPTY_FAVORITES);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, nonce]);

  const isPlayerFavorited = useCallback(
    (platform: string, platformPlayerId: string) =>
      favorites.players.some(
        (player) => player.platform === platform && player.platform_player_id === platformPlayerId,
      ),
    [favorites],
  );

  const isUploaderFavorited = useCallback(
    (userId: string) => favorites.uploaders.some((uploader) => uploader.user_id === userId),
    [favorites],
  );

  const togglePlayer = useCallback(
    async (platform: string, platformPlayerId: string) => {
      if (isPlayerFavorited(platform, platformPlayerId)) {
        await removeFavoritePlayer(platform, platformPlayerId);
      } else {
        await addFavoritePlayer(platform, platformPlayerId);
      }
      setNonce((value) => value + 1);
    },
    [isPlayerFavorited],
  );

  const toggleUploader = useCallback(
    async (userId: string) => {
      if (isUploaderFavorited(userId)) {
        await removeFavoriteUploader(userId);
      } else {
        await addFavoriteUploader(userId);
      }
      setNonce((value) => value + 1);
    },
    [isUploaderFavorited],
  );

  return {
    favorites,
    loading,
    isPlayerFavorited,
    isUploaderFavorited,
    togglePlayer,
    toggleUploader,
  };
}

function FavoriteToggleButton({
  favorited,
  loading,
  onToggle,
  label,
}: {
  favorited: boolean;
  loading: boolean;
  onToggle: () => Promise<void>;
  label: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      await onToggle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update favorite");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      className={`secondary-button favorite-toggle${favorited ? " favorited" : ""}`}
      onClick={() => void handleClick()}
      disabled={pending || loading}
      aria-pressed={favorited}
      title={error ?? (favorited ? `Remove ${label} from favorites` : `Add ${label} to favorites`)}
    >
      <Star size={16} fill={favorited ? "currentColor" : "none"} />
      {favorited ? "Favorited" : "Favorite"}
    </button>
  );
}

// Star toggle for an in-game player identity. Renders nothing for signed-out
// visitors so the button-row stays clean.
export function PlayerFavoriteButton({
  enabled,
  platform,
  platformPlayerId,
}: {
  enabled: boolean;
  platform: string;
  platformPlayerId: string;
}) {
  const { loading, isPlayerFavorited, togglePlayer } = useFavorites(enabled);
  if (!enabled) return null;
  return (
    <FavoriteToggleButton
      favorited={isPlayerFavorited(platform, platformPlayerId)}
      loading={loading}
      onToggle={() => togglePlayer(platform, platformPlayerId)}
      label="this player"
    />
  );
}

// Star toggle for an uploader account.
export function UploaderFavoriteButton({ enabled, userId }: { enabled: boolean; userId: string }) {
  const { loading, isUploaderFavorited, toggleUploader } = useFavorites(enabled);
  if (!enabled) return null;
  return (
    <FavoriteToggleButton
      favorited={isUploaderFavorited(userId)}
      loading={loading}
      onToggle={() => toggleUploader(userId)}
      label="this uploader"
    />
  );
}

// Player + uploader lists, shared by the replays sidebar and the logo dropdown.
// `onNavigate` lets the logo menu close itself when a link is followed.
function FavoritesLists({
  favorites,
  onNavigate,
}: {
  favorites: FavoritesResponse;
  onNavigate?: () => void;
}) {
  const { players, uploaders } = favorites;
  return (
    <>
      {players.length > 0 ? (
        <section className="favorites-section">
          <h3 className="favorites-section-title">Players</h3>
          <ul className="favorites-list">
            {players.map((player) => (
              <li key={`${player.platform}:${player.platform_player_id}`}>
                <Link
                  className="favorites-item"
                  to={playerProfileIdPath(player.platform, player.platform_player_id)}
                  onClick={onNavigate}
                >
                  <PlatformIcon
                    platform={player.platform}
                    platformPlayerId={player.platform_player_id}
                  />
                  <span className="favorites-item-name">
                    {player.display_name ?? player.platform_player_id}
                  </span>
                  <span className="favorites-item-meta">
                    {player.appearance_count.toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {uploaders.length > 0 ? (
        <section className="favorites-section">
          <h3 className="favorites-section-title">Uploaders</h3>
          <ul className="favorites-list">
            {uploaders.map((uploader) => (
              <li key={uploader.user_id}>
                <Link
                  className="favorites-item"
                  to={`/users/${encodeURIComponent(uploader.user_id)}`}
                  onClick={onNavigate}
                >
                  {uploader.avatar_url ? (
                    <img className="favorites-item-avatar" src={uploader.avatar_url} alt="" />
                  ) : (
                    <Users size={16} className="favorites-item-icon" />
                  )}
                  <span className="favorites-item-name">
                    {uploader.display_name ?? "Anonymous uploader"}
                  </span>
                  <span className="favorites-item-meta">
                    {uploader.upload_count.toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

// Quick-access list of pinned profiles for the replay browser. Self-contained:
// fetches its own favorites and renders nothing for signed-out visitors. Shows
// an empty-state hint the first time a signed-in user has no favorites yet.
export function FavoritesSidebar({ enabled }: { enabled: boolean }) {
  const { favorites, loading } = useFavorites(enabled);
  if (!enabled) return null;

  const { players, uploaders } = favorites;
  const isEmpty = players.length === 0 && uploaders.length === 0;

  return (
    <aside className="favorites-sidebar" aria-label="Favorited profiles">
      <h2 className="favorites-sidebar-title">
        <Star size={16} fill="currentColor" />
        Favorites
      </h2>

      {loading && isEmpty ? <p className="favorites-empty">Loading…</p> : null}

      {!loading && isEmpty ? (
        <p className="favorites-empty">
          Star a player or uploader from their profile to pin it here.
        </p>
      ) : null}

      <FavoritesLists favorites={favorites} />
    </aside>
  );
}

// A deliberately unmarked dropdown hung off the home logo: hover (or keyboard
// focus) the brand to reveal pinned profiles. Renders nothing unless the user
// is signed in AND has at least one favorite, so there is no visible affordance
// for anyone who would find it empty — it stays a "secret" until you have
// something to show. The logo itself still navigates home on click.
export function LogoFavoritesMenu({ enabled }: { enabled: boolean }) {
  const { favorites } = useFavorites(enabled);
  if (!enabled) return null;

  const isEmpty = favorites.players.length === 0 && favorites.uploaders.length === 0;
  if (isEmpty) return null;

  // Drop focus from the clicked link so the menu (revealed via :focus-within)
  // collapses after navigating instead of lingering open on the next page.
  const closeMenu = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="logo-favorites-menu">
      <div className="logo-favorites-panel" role="menu" aria-label="Favorited profiles">
        <FavoritesLists favorites={favorites} onNavigate={closeMenu} />
      </div>
    </div>
  );
}
