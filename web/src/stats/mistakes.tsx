import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { createMistakeReview, getCurrentUser, listMistakeReviews } from "../api";
import type {
  CreateMistakeReviewRequest,
  MistakeDetectResponse,
  MistakeMarker,
  MistakeReviewListItem,
  MistakeReviewStatus,
  ReplayPlayer,
} from "../types";
import type { EventClip } from "./EventClipPlayer";
import { useEventPreviewSelection } from "./eventPreview";
import { subtrActorPlayerUrl } from "../playerLink";
import { preloadReplay } from "./replayModel";
import type { StatDetailProps } from "./registry";

const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);

export const mistakeEventTypes: readonly string[] = [];

// Mistake kinds that are still being tuned and should only surface for
// admins. Mirrors RLVision's ADMIN_ONLY_MISTAKE_KINDS gate — keep the two in
// sync until these kinds graduate.
export const ADMIN_ONLY_MISTAKE_KINDS: ReadonlySet<string> = new Set([
  "bad_defensive_touch",
  "bad_fifty",
]);

interface MistakeKindCopy {
  label: string;
  description: string;
}

const MISTAKE_KIND_COPY: Record<string, MistakeKindCopy> = {
  too_far_from_play: {
    label: "Too far from play",
    description: "Camped deep with boost while your team pressured upfield.",
  },
  stacked_too_close: {
    label: "Stacked too close",
    description: "Occupied the same space as a teammate while the ball was elsewhere.",
  },
  bumping_teammate: {
    label: "Bumped a teammate",
    description: "Drove into a teammate hard enough to knock them off their line.",
  },
  overcommitting_last_man: {
    label: "Overcommitted as last man",
    description: "Challenged upfield as the last defender and left the net open.",
  },
  bang_with_time: {
    label: "Banged it away with time",
    description: "Smashed the ball under no pressure, gifting possession away.",
  },
  hesitating_on_50: {
    label: "Hesitated on a 50/50",
    description: "Had the beat (or an even 50) on a loose ball but backed off.",
  },
  waiting_to_challenge: {
    label: "Waited to challenge",
    description: "Shadowed a charging carrier with cover behind you but never engaged.",
  },
  double_committing: {
    label: "Double committed",
    description: "Went for the same aerial ball as a teammate, leaving the back open.",
  },
  creeping_up_too_far: {
    label: "Crept up too far",
    description: "Pushed up on a contested ball as last man and got beaten over the top.",
  },
  poor_landing: {
    label: "Poor landing",
    description: "Came down without wheels underneath, losing time and momentum.",
  },
  pick_up_small_pads: {
    label: "Skipped small pads",
    description: "Drove past free small pads while running on empty.",
  },
  bad_kickoff: {
    label: "Lost the kickoff",
    description: "Kickoff contact popped the ball up and back into your half.",
  },
  bad_fifty: {
    label: "Lost the fifty",
    description: "A contested touch pinched the ball up and deep into your half.",
  },
  floating_with_boost: {
    label: "Floated with boost",
    description: "Drifted through the air holding boost instead of committing somewhere.",
  },
  bad_defensive_touch: {
    label: "Bad defensive touch",
    description: "A save-area touch left the ball in the scoring lane instead of clearing it.",
  },
};

export function mistakeKindLabel(kind: string): string {
  return MISTAKE_KIND_COPY[kind]?.label ?? kind.replaceAll("_", " ");
}

function evidenceNumber(marker: MistakeMarker, key: string): number | null {
  const value = marker.evidence?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** A short data-backed "why" line per marker, from the detector's evidence. */
export function mistakeWhy(marker: MistakeMarker): string | null {
  switch (marker.kind) {
    case "too_far_from_play": {
      const mean = evidenceNumber(marker, "mean_dist_to_ball");
      return mean != null
        ? `Averaged ~${Math.round((mean * 8000) / 100) * 100}uu from the ball during team pressure.`
        : null;
    }
    case "bumping_teammate": {
      const share = evidenceNumber(marker, "responsibility_share");
      return share != null
        ? `You drove ${Math.round(share * 100)}% of the closing speed into ${marker.with_player ?? "your teammate"}.`
        : null;
    }
    case "overcommitting_last_man":
      return marker.evidence?.outcome_confirmed === true
        ? "The dive failed — the ball ended up behind you with the opponent in control."
        : "Committed forward as the deepest defender while the ball was contested.";
    case "bang_with_time":
      return marker.evidence?.outcome_confirmed === true
        ? "The next touch after the clear was an opponent's, taken comfortably."
        : null;
    case "hesitating_on_50": {
      const gap = evidenceNumber(marker, "eta_gap_s");
      return gap != null && gap > 0
        ? `You were ~${(gap * 1.5).toFixed(1)}s ahead to the ball but pulled off it.`
        : "Even race to a loose ball, but you backed away instead of contesting.";
    }
    case "double_committing":
      return marker.with_player
        ? `You and ${marker.with_player} both went for the same aerial.`
        : null;
    case "stacked_too_close":
      return marker.with_player ? `Doubled up on ${marker.with_player}'s position.` : null;
    case "pick_up_small_pads": {
      const misses = evidenceNumber(marker, "miss_count_norm");
      return misses != null
        ? `Passed ${Math.round(misses * 6)} active pads while low on boost.`
        : null;
    }
    case "floating_with_boost": {
      const boost = evidenceNumber(marker, "min_boost_norm");
      return boost != null
        ? `Stayed airborne with ${Math.round(boost * 100)}+ boost unspent.`
        : null;
    }
    case "bad_defensive_touch": {
      const danger = evidenceNumber(marker, "danger_lane_time_s");
      return danger != null && danger > 0
        ? `The ball sat in the scoring lane for ${danger.toFixed(1)}s after your touch.`
        : null;
    }
    default:
      return null;
  }
}

// --- WASM module (lazy, shared across mounts) --------------------------------

type MistakesWasm = typeof import("@rocket-sense/mistakes");

let wasmModulePromise: Promise<MistakesWasm> | null = null;

function loadMistakesWasm(): Promise<MistakesWasm> {
  if (!wasmModulePromise) {
    wasmModulePromise = (async () => {
      const module = await import("@rocket-sense/mistakes");
      await module.default();
      return module;
    })();
    wasmModulePromise.catch(() => {
      wasmModulePromise = null;
    });
  }
  return wasmModulePromise;
}

// --- Detection + review state -------------------------------------------------

interface FocusOption {
  key: string;
  name: string;
  team: number | null;
}

function focusOptionsFromPlayers(players: ReplayPlayer[]): FocusOption[] {
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
function reviewForMarker(
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

function frameIndexAtTime(frames: { time: number }[], time: number): number | null {
  if (!frames.length) return null;
  let lo = 0;
  let hi = frames.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (frames[mid].time <= time) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }
  return lo;
}

function severityBand(severity: number): string {
  if (severity >= 0.75) return "is-high";
  if (severity >= 0.5) return "is-medium";
  return "is-low";
}

function formatClock(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

interface MarkerRow {
  marker: MistakeMarker;
  review: MistakeReviewListItem | null;
}

export function MistakesDetail({ players, replayId }: StatDetailProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const focusOptions = useMemo(() => focusOptionsFromPlayers(players), [players]);
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const [detection, setDetection] = useState<MistakeDetectResponse | null>(null);
  const [reviews, setReviews] = useState<MistakeReviewListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingReview, setPendingReview] = useState<string | null>(null);

  const activeFocusKey = focusKey ?? focusOptions[0]?.key ?? null;

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

  // Run detection over the cached parsed replay whenever the focus changes.
  useEffect(() => {
    if (!replayId || !activeFocusKey) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([preloadReplay(replayId), loadMistakesWasm()])
      .then(([loaded, wasm]) => {
        if (cancelled) return;
        const response = wasm.detect_mistakes(
          loaded.raw,
          activeFocusKey,
          undefined,
        ) as MistakeDetectResponse;
        setDetection(response);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [replayId, activeFocusKey]);

  useEffect(() => {
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
    if (!detection || !activeFocusKey) return [];
    return (
      detection.markers
        .filter((marker) => isAdmin || !ADMIN_ONLY_MISTAKE_KINDS.has(marker.kind))
        .map((marker) => ({
          marker,
          review: reviewForMarker(marker, activeFocusKey, reviews),
        }))
        // Reject hides the marker but keeps the label (review record persists).
        .filter((row) => row.review?.status !== "rejected")
    );
  }, [detection, activeFocusKey, reviews, isAdmin]);

  const focusName = detection?.focus_player_name ?? null;
  const rowKey = useCallback((row: MarkerRow) => `${row.marker.kind}:${row.marker.time}`, []);
  const buildClip = useCallback(
    (row: MarkerRow, replayNonce: number): EventClip | null => {
      const { marker } = row;
      return {
        start: Math.max(0, marker.t_start),
        end: marker.t_end,
        camera: (cam) => {
          if (
            !cam.followPlayer({
              playerKey: activeFocusKey,
              playerName: focusName ?? marker.player,
              ballCam: true,
            })
          ) {
            cam.freeCamera("side");
          }
        },
        key: `${marker.kind}:${marker.time}:${activeFocusKey ?? ""}:${replayNonce}`,
      };
    },
    [activeFocusKey, focusName],
  );

  const {
    activeItem: activeRow,
    activeKey,
    clip,
    activateItem,
  } = useEventPreviewSelection(rows, rowKey, buildClip);

  const submitReview = useCallback(
    async (row: MarkerRow, status: MistakeReviewStatus, correctedKind?: string) => {
      if (!replayId || !activeFocusKey || !detection) return;
      const { marker } = row;
      const key = rowKey(row);
      setPendingReview(key);
      try {
        const loaded = await preloadReplay(replayId);
        const frames = loaded.replay.frames;
        const body: CreateMistakeReviewRequest = {
          kind: marker.kind,
          player_key: activeFocusKey,
          player_name: marker.player,
          time: marker.time,
          t_start: marker.t_start,
          t_end: marker.t_end,
          event_frame: frameIndexAtTime(frames, marker.time),
          start_frame: frameIndexAtTime(frames, marker.t_start),
          end_frame: frameIndexAtTime(frames, marker.t_end),
          severity: marker.severity,
          features: marker.features,
          features_version: marker.features_version,
          evidence: marker.evidence,
          detector_version: detection.detector_version,
          status,
          corrected_kind: correctedKind,
        };
        const response = await createMistakeReview(replayId, body);
        setReviews((current) => [
          {
            source_event_id: response.source_event_id,
            kind: marker.kind,
            status: response.status,
            review_id: response.review_id,
            reviewed_event_type_key: correctedKind ?? marker.kind,
            notes: null,
            created_at: response.created_at,
            player_key: activeFocusKey,
            time: marker.time,
            t_start: marker.t_start,
            t_end: marker.t_end,
          },
          ...current.filter((review) => reviewForMarker(marker, activeFocusKey, [review]) === null),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setPendingReview(null);
      }
    },
    [replayId, activeFocusKey, detection, rowKey],
  );

  if (!replayId) {
    return <div className="stat-empty">Coaching runs per replay — open a specific game.</div>;
  }
  if (!focusOptions.length) {
    return (
      <div className="stat-empty">
        No player identities are available for this replay yet, so mistakes can't be attributed.
      </div>
    );
  }

  return (
    <div className="mistakes-detail">
      <div className="mistakes-toolbar">
        <label className="mistakes-focus-label">
          Focus player
          <select
            value={activeFocusKey ?? ""}
            onChange={(event) => setFocusKey(event.target.value)}
          >
            {focusOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.name}
                {option.team != null ? ` (${option.team === 0 ? "Blue" : "Orange"})` : ""}
              </option>
            ))}
          </select>
        </label>
        {detection ? (
          <span className="mistakes-summary">
            {rows.length} mistake{rows.length === 1 ? "" : "s"} detected in your browser
          </span>
        ) : null}
      </div>

      {error ? <div className="stat-empty">Mistake detection failed: {error}</div> : null}
      {loading ? <div className="stat-empty">Analyzing replay locally…</div> : null}

      {!loading && detection && !rows.length ? (
        <div className="stat-empty">
          No mistakes surfaced for this player — clean game, or everything detected was already
          rejected.
        </div>
      ) : null}

      {rows.length ? (
        <div className="stat-section-grid">
          <section className="chart-panel full-span">
            <div className="chart-panel-header">
              <div>
                <h3>Detected mistakes</h3>
              </div>
              {!signedIn ? <span>Sign in to confirm or reject markers</span> : null}
            </div>
            <div className="mistake-card-list">
              {rows.map((row) => {
                const key = rowKey(row);
                const copy = MISTAKE_KIND_COPY[row.marker.kind];
                const why = mistakeWhy(row.marker);
                const confirmed = row.review?.status === "confirmed";
                const corrected = row.review?.status === "corrected";
                return (
                  <article
                    key={key}
                    className={`mistake-card ${key === activeKey ? "active" : ""}`}
                    onClick={() => activateItem(row, true)}
                  >
                    <div className="mistake-card-main">
                      <span className="mistake-card-time">{formatClock(row.marker.time)}</span>
                      <div className="mistake-card-copy">
                        <strong>
                          {copy?.label ?? mistakeKindLabel(row.marker.kind)}
                          {ADMIN_ONLY_MISTAKE_KINDS.has(row.marker.kind) ? (
                            <span className="mistake-admin-chip" title="Only admins see this kind">
                              tuning
                            </span>
                          ) : null}
                        </strong>
                        <span>{why ?? copy?.description ?? ""}</span>
                      </div>
                      <span
                        className={`mistake-severity ${severityBand(row.marker.severity)}`}
                        title="Detector severity (0-100%)"
                      >
                        {Math.round(row.marker.severity * 100)}%
                      </span>
                    </div>
                    {signedIn ? (
                      <div className="mistake-card-actions">
                        {confirmed ? <span className="mistake-review-state">Confirmed</span> : null}
                        {corrected ? (
                          <span className="mistake-review-state">
                            Corrected to{" "}
                            {mistakeKindLabel(
                              row.review?.reviewed_event_type_key ?? row.marker.kind,
                            )}
                          </span>
                        ) : null}
                        {!confirmed && !corrected ? (
                          <>
                            <button
                              type="button"
                              disabled={pendingReview === key}
                              onClick={(event) => {
                                event.stopPropagation();
                                void submitReview(row, "confirmed");
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              disabled={pendingReview === key}
                              onClick={(event) => {
                                event.stopPropagation();
                                void submitReview(row, "rejected");
                              }}
                            >
                              Not a mistake
                            </button>
                            <select
                              className="mistake-correct-select"
                              value=""
                              disabled={pendingReview === key}
                              onClick={(event) => event.stopPropagation()}
                              onChange={(event) => {
                                const corrected_kind = event.target.value;
                                if (corrected_kind) {
                                  void submitReview(row, "corrected", corrected_kind);
                                }
                              }}
                            >
                              <option value="">Actually was…</option>
                              {Object.keys(MISTAKE_KIND_COPY)
                                .filter(
                                  (kind) =>
                                    kind !== row.marker.kind &&
                                    (isAdmin || !ADMIN_ONLY_MISTAKE_KINDS.has(kind)),
                                )
                                .map((kind) => (
                                  <option key={kind} value={kind}>
                                    {mistakeKindLabel(kind)}
                                  </option>
                                ))}
                            </select>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <Suspense
            fallback={
              <aside className="event-preview-pip">
                <div className="event-preview-pip-bar">
                  <span className="event-preview-pip-label">Loading…</span>
                </div>
                <div className="event-clip-player">
                  <div className="event-clip-status">Loading player…</div>
                </div>
              </aside>
            }
          >
            <EventClipPreview
              replayId={replayId}
              clip={clip}
              label={
                activeRow
                  ? `${mistakeKindLabel(activeRow.marker.kind)} · ${formatClock(activeRow.marker.time)}`
                  : "Loading…"
              }
              openHref={subtrActorPlayerUrl(replayId)}
              showDebug={false}
            />
          </Suspense>
        </div>
      ) : null}
    </div>
  );
}
