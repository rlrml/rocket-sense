// The shared mistake-list source: marker building, admin gating, review
// filtering, and focus-player resolution, factored out of the Coaching stat so
// the film-room tour consumes the exact same sorted, admin-gated list. Any
// rule about which markers a viewer sees belongs here, not in a view.

import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { getCurrentUser, listMistakeReviews } from "../api";
import type {
  MechanicEventResponse,
  MistakeMarker,
  MistakeReviewListItem,
  ReplayPlayer,
} from "../types";
import type { CinematicMistake } from "./cinematics/constants";

// Mistake kinds that are still being tuned and should only surface for
// admins. Mirrors RLVision's ADMIN_ONLY_MISTAKE_KINDS gate — keep the two in
// sync until these kinds graduate.
export const ADMIN_ONLY_MISTAKE_KINDS: ReadonlySet<string> = new Set([
  "bad_defensive_touch",
  "bad_fifty",
]);

export interface FocusOption {
  key: string;
  name: string;
  team: number | null;
}

export function focusOptionsFromPlayers(players: ReplayPlayer[]): FocusOption[] {
  return players
    .filter((player) => player.platform && player.platform_player_id)
    .map((player) => ({
      key: `${(player.platform as string).toLowerCase()}:${player.platform_player_id as string}`,
      name: player.name ?? "Unknown player",
      team: player.team,
    }));
}

/** Latest review per marker, matched like the Python `_merge_mistakes_with_labels`:
 * same kind + focus player, marker time within ±0.5s. */
export function reviewForMarker(
  marker: MistakeMarker,
  focusKey: string,
  reviews: MistakeReviewListItem[],
): MistakeReviewListItem | null {
  for (const review of reviews) {
    if (review.kind !== marker.kind) continue;
    if (review.player_key && review.player_key !== focusKey) continue;
    if (review.time == null || Math.abs(review.time - marker.time) > 0.5) continue;
    return review;
  }
  return null;
}

export interface MarkerRow {
  event: MechanicEventResponse;
  marker: MistakeMarker;
  detectorVersion: string | null;
  review: MistakeReviewListItem | null;
}

export function markerFromEvent(event: MechanicEventResponse): MistakeMarker | null {
  const payload = event.payload;
  const numberValue = (key: string, fallback: number | null): number | null =>
    typeof payload[key] === "number" ? payload[key] : fallback;
  const time = numberValue("time", event.event_time);
  const tStart = numberValue("t_start", event.start_time);
  const tEnd = numberValue("t_end", event.end_time);
  if (time == null || tStart == null || tEnd == null) return null;
  const features = Array.isArray(payload.features)
    ? payload.features.filter((value): value is number => typeof value === "number")
    : [];
  const evidence =
    payload.evidence != null &&
    typeof payload.evidence === "object" &&
    !Array.isArray(payload.evidence)
      ? (payload.evidence as Record<string, unknown>)
      : undefined;
  return {
    kind: event.event_type,
    time,
    t_start: tStart,
    t_end: tEnd,
    player_idx: numberValue("player_idx", 0) ?? 0,
    player:
      (typeof payload.player === "string" ? payload.player : null) ??
      event.player_name ??
      "Unknown player",
    with_player: typeof payload.with_player === "string" ? payload.with_player : undefined,
    severity: numberValue("severity", event.confidence) ?? 0,
    score: numberValue("score", event.confidence) ?? 0,
    model_keep_threshold:
      typeof payload.model_keep_threshold === "number" ? payload.model_keep_threshold : undefined,
    features,
    features_version: numberValue("features_version", 1) ?? 1,
    evidence,
  };
}

/** The cinematic-facing subset of a marker (what the directors dramatize). */
export function cinematicMistakeOf(marker: MistakeMarker): CinematicMistake {
  return {
    kind: marker.kind,
    time: marker.time,
    t_start: marker.t_start,
    t_end: marker.t_end,
    player: marker.player,
    with_player: marker.with_player,
  };
}

export function formatClock(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export interface MistakeMarkerSource {
  focusOptions: FocusOption[];
  /** Selected focus key, defaulting to the first identified player. */
  activeFocusKey: string | null;
  setFocusKey: (key: string) => void;
  focusName: string | null;
  /** Time-sorted, admin-gated rows for the focus player, minus rejected markers. */
  rows: MarkerRow[];
  isAdmin: boolean;
  signedIn: boolean;
  reviews: MistakeReviewListItem[];
  setReviews: Dispatch<SetStateAction<MistakeReviewListItem[]>>;
}

/**
 * One focus player's reviewed mistake list for a replay. Both the Coaching
 * stat and the film-room tour derive their markers from this hook so the two
 * views can never disagree about which mistakes exist or who may see them.
 */
export function useMistakeMarkers(
  replayId: string | undefined,
  events: MechanicEventResponse[],
  players: ReplayPlayer[],
): MistakeMarkerSource {
  const [isAdmin, setIsAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const focusOptions = useMemo(() => focusOptionsFromPlayers(players), [players]);
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const [reviews, setReviews] = useState<MistakeReviewListItem[]>([]);

  // Validate the stored key against the current options: the hook stays mounted
  // across replay navigation, so a focusKey chosen for the previous replay can
  // outlive its focusOptions. Falling back to the first option when the stored
  // key is absent keeps the select populated (and the tour attached) instead of
  // pointing at a missing option and rendering an empty list.
  const activeFocusKey =
    (focusKey != null && focusOptions.some((option) => option.key === focusKey)
      ? focusKey
      : focusOptions[0]?.key) ?? null;

  useEffect(() => {
    let cancelled = false;
    getCurrentUser()
      .then((user) => {
        if (cancelled) return;
        setSignedIn(true);
        setIsAdmin(user.is_admin);
      })
      .catch(() => {
        if (cancelled) return;
        setSignedIn(false);
        setIsAdmin(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Drop the previous replay's reviews immediately: the hook stays mounted
    // across replay navigation, and a stale review whose kind/player/time
    // happens to match a marker in the new replay would silently hide it —
    // forever, if the new fetch fails or the user is signed out.
    setReviews([]);
    if (!replayId || !signedIn) return;
    let cancelled = false;
    listMistakeReviews(replayId)
      .then((response) => {
        if (!cancelled) setReviews(response.reviews);
      })
      .catch(() => {
        // Review state is an enhancement; detection still renders without it.
      });
    return () => {
      cancelled = true;
    };
  }, [replayId, signedIn]);

  const rows = useMemo<MarkerRow[]>(() => {
    if (!activeFocusKey) return [];
    return (
      events
        .filter((event) => event.player_id === activeFocusKey)
        .map((event) => ({ event, marker: markerFromEvent(event) }))
        .filter(
          (row): row is { event: MechanicEventResponse; marker: MistakeMarker } =>
            row.marker != null,
        )
        .filter(({ marker }) => isAdmin || !ADMIN_ONLY_MISTAKE_KINDS.has(marker.kind))
        .map(({ event, marker }) => ({
          event,
          marker,
          detectorVersion:
            typeof event.payload.detector_version === "string"
              ? event.payload.detector_version
              : null,
          review: reviewForMarker(marker, activeFocusKey, reviews),
        }))
        // Reject hides the marker but keeps the label (review record persists).
        .filter((row) => row.review?.status !== "rejected")
        .sort((a, b) => a.marker.time - b.marker.time)
    );
  }, [events, activeFocusKey, reviews, isAdmin]);

  const focusName = focusOptions.find((option) => option.key === activeFocusKey)?.name ?? null;

  return {
    focusOptions,
    activeFocusKey,
    setFocusKey,
    focusName,
    rows,
    isAdmin,
    signedIn,
    reviews,
    setReviews,
  };
}
