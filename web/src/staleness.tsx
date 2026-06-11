import { useEffect, useState } from "react";
import { AlertTriangle, Info, RefreshCw, X } from "lucide-react";

import { getPlayerProcessingVersions, reprocessReplay } from "./api";
import type {
  ProcessingVersionBreakdownResponse,
  ReplayParseVersion,
  ReplayStaleness,
} from "./types";

/**
 * Compact "stale processing" pill. Renders nothing when the replay is current,
 * so callers can drop it inline unconditionally. The tooltip explains *why* a
 * replay is stale (schema bump vs subtr-actor drift) and what is current.
 */
export function StalenessBadge({
  staleness,
  parseVersion,
}: {
  staleness: ReplayStaleness;
  parseVersion?: ReplayParseVersion | null;
}) {
  if (!staleness.is_stale) return null;

  const reasons: string[] = [];
  if (staleness.schema_outdated) {
    reasons.push(
      `event schema ${parseVersion?.event_stream_schema_version ?? "unknown"} → ${staleness.current_event_stream_schema_version}`,
    );
  }
  if (staleness.subtr_actor_outdated) {
    reasons.push(
      `subtr-actor ${parseVersion?.subtr_actor_version ?? "unknown"} → ${staleness.current_subtr_actor_version}`,
    );
  }
  const title = `Processed with an older pipeline (${reasons.join("; ")}). Stats may be out of date.`;

  return (
    <span className="status-badge status-stale" title={title}>
      <AlertTriangle size={12} />
      Stale
    </span>
  );
}

/**
 * On-demand reprocess for a single replay. The backend authorizes by uploader,
 * so a 403 here is expected for replays the viewer does not own — surfaced as a
 * message rather than hidden, since the viewer cannot know ownership up front.
 */
export function ReprocessButton({ replayId }: { replayId: string }) {
  const [state, setState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function run() {
    setState("working");
    setMessage(null);
    try {
      const result = await reprocessReplay(replayId);
      setState("done");
      setMessage(
        result.enqueued
          ? "Reprocess queued — refresh in a moment."
          : "Nothing to reprocess.",
      );
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Reprocess failed.");
    }
  }

  return (
    <div className="reprocess-control">
      <button
        className="secondary-button"
        type="button"
        onClick={() => void run()}
        disabled={state === "working"}
      >
        <RefreshCw size={16} className={state === "working" ? "spin" : undefined} />
        Reprocess
      </button>
      {message ? (
        <span className={`reprocess-message${state === "error" ? " reprocess-error" : ""}`}>
          {message}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Small info-icon trigger + modal showing how the replays contributing to an
 * aggregate split across processing versions.
 */
export function ProcessingVersionTrigger({
  platform,
  platformPlayerId,
  search,
}: {
  platform: string;
  platformPlayerId: string;
  search: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="icon-button metric-info"
        type="button"
        title="Processing-version breakdown"
        aria-label="Show processing-version breakdown"
        onClick={() => setOpen(true)}
      >
        <Info size={14} />
      </button>
      {open ? (
        <ProcessingVersionModal
          platform={platform}
          platformPlayerId={platformPlayerId}
          search={search}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function ProcessingVersionModal({
  platform,
  platformPlayerId,
  search,
  onClose,
}: {
  platform: string;
  platformPlayerId: string;
  search: string;
  onClose: () => void;
}) {
  const [breakdown, setBreakdown] = useState<ProcessingVersionBreakdownResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPlayerProcessingVersions(platform, platformPlayerId, new URLSearchParams(search))
      .then((response) => {
        if (!cancelled) {
          setBreakdown(response);
          setError(null);
        }
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Failed to load breakdown.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [platform, platformPlayerId, search]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const currentShare =
    breakdown && breakdown.total_replays > 0
      ? Math.round((breakdown.current_replays / breakdown.total_replays) * 100)
      : null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="login-modal version-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="version-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <p className="eyebrow">Processing versions</p>
            <h2 id="version-modal-title">Contributing replays</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} title="Close">
            <X size={17} />
          </button>
        </header>

        {loading ? (
          <div className="status-line">
            <RefreshCw size={16} className="spin" />
            Loading breakdown
          </div>
        ) : null}

        {error ? <p className="reprocess-message reprocess-error">{error}</p> : null}

        {breakdown && !loading ? (
          <>
            <p className="muted-text">
              {currentShare != null
                ? `${breakdown.current_replays.toLocaleString()} of ${breakdown.total_replays.toLocaleString()} replays (${currentShare}%) are on the current pipeline (${breakdown.current_event_stream_schema_version}, subtr-actor ${breakdown.current_subtr_actor_version}).`
                : "No contributing replays."}
            </p>
            {breakdown.rows.length > 0 ? (
              <table className="version-breakdown-table">
                <thead>
                  <tr>
                    <th>Event schema</th>
                    <th>subtr-actor</th>
                    <th className="numeric">Replays</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {breakdown.rows.map((row, index) => (
                    <tr key={`${row.event_stream_schema_version ?? "?"}-${row.subtr_actor_version ?? "?"}-${index}`}>
                      <td>{row.event_stream_schema_version ?? "unknown"}</td>
                      <td>
                        {row.subtr_actor_version ?? "unknown"}
                        {row.subtr_actor_git_sha ? (
                          <span className="subtle"> ({row.subtr_actor_git_sha.slice(0, 7)})</span>
                        ) : null}
                      </td>
                      <td className="numeric">{row.replay_count.toLocaleString()}</td>
                      <td>
                        {row.is_current ? (
                          <span className="status-badge status-parsed">Current</span>
                        ) : (
                          <span className="status-badge status-stale">Stale</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
}
