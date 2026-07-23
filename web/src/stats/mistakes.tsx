import { Clapperboard } from "lucide-react";
import { lazy, Suspense, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { createMistakeReview } from "../api";
import type { CreateMistakeReviewRequest, MistakeMarker, MistakeReviewStatus } from "../types";
import type { EventClip } from "./EventClipPlayer";
import { lazyMistakeCinematic } from "./cinematics/lazy";
import { cinematicClipWindow } from "./cinematics/phases";
import { useEventPreviewSelection } from "./eventPreview";
import {
  ADMIN_ONLY_MISTAKE_KINDS,
  cinematicMistakeOf,
  formatClock,
  reviewForMarker,
  useMistakeMarkers,
  type MarkerRow,
} from "./mistakeList";
import { subtrActorPlayerUrl } from "../playerLink";
import type { StatDetailProps } from "./registry";

// Re-exported for existing importers; the shared list logic lives in
// mistakeList.ts so the film room consumes the same gate.
export { ADMIN_ONLY_MISTAKE_KINDS };

const EventClipPreview = lazy(() =>
  import("./EventClipPlayer").then((module) => ({ default: module.EventClipPreview })),
);

export const mistakeEventTypes: readonly string[] = [
  "too_far_from_play",
  "stacked_too_close",
  "bumping_teammate",
  "overcommitting_last_man",
  "bang_with_time",
  "hesitating_on_50",
  "waiting_to_challenge",
  "double_committing",
  "creeping_up_too_far",
  "poor_landing",
  "pick_up_small_pads",
  "bad_kickoff",
  "bad_fifty",
  "floating_with_boost",
  "bad_defensive_touch",
];

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

function severityBand(severity: number): string {
  if (severity >= 0.75) return "is-high";
  if (severity >= 0.5) return "is-medium";
  return "is-low";
}

export function MistakesDetail({ events, players, replayId }: StatDetailProps) {
  const {
    focusOptions,
    activeFocusKey,
    setFocusKey,
    focusName,
    rows,
    isAdmin,
    signedIn,
    setReviews,
  } = useMistakeMarkers(replayId, events, players);
  const [error, setError] = useState<string | null>(null);
  const [pendingReview, setPendingReview] = useState<string | null>(null);

  const rowKey = useCallback((row: MarkerRow) => row.event.id, []);
  const buildClip = useCallback(
    (row: MarkerRow, replayNonce: number): EventClip | null => {
      const { marker } = row;
      const cinematicMistake = cinematicMistakeOf(marker);
      // The loop window must contain the whole cinematic — including the
      // rewind's furthest reach before t_start — or the loop enforcers would
      // fight the rewound playhead the moment the director hands back.
      const window = cinematicClipWindow(cinematicMistake);
      return {
        start: Math.max(0, window.start),
        end: window.end,
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
        cinematic: lazyMistakeCinematic(cinematicMistake, {
          playerKey: activeFocusKey,
          playerName: focusName ?? marker.player,
        }),
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
      if (!replayId || !activeFocusKey) return;
      const { event, marker } = row;
      const key = rowKey(row);
      setPendingReview(key);
      try {
        const body: CreateMistakeReviewRequest = {
          kind: marker.kind,
          player_key: activeFocusKey,
          player_name: marker.player,
          time: marker.time,
          t_start: marker.t_start,
          t_end: marker.t_end,
          event_frame: event.event_frame,
          start_frame: event.start_frame,
          end_frame: event.end_frame,
          severity: marker.severity,
          features: marker.features,
          features_version: marker.features_version,
          evidence: marker.evidence,
          detector_version: row.detectorVersion ?? undefined,
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
    [replayId, activeFocusKey, rowKey],
  );

  if (!replayId) {
    return (
      <div className="stat-empty">Mistakes are processed per replay — open a specific game.</div>
    );
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
        <span className="mistakes-summary">
          {rows.length} mistake{rows.length === 1 ? "" : "s"} found during replay processing
        </span>
        <Link
          className="secondary-button mistakes-film-link"
          to={`/replays/${encodeURIComponent(replayId)}/film`}
          title="Watch the whole replay with each mistake's cinematic firing in place"
        >
          <Clapperboard size={15} />
          Film room
        </Link>
      </div>

      {error ? <div className="stat-empty">Mistake review failed: {error}</div> : null}

      {!rows.length ? (
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
