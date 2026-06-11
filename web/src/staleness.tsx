import { useEffect, useState } from "react";
import { AlertTriangle, Info, RefreshCw, X } from "lucide-react";

import { getPlayerProcessingVersions, reprocessReplay } from "./api";
import type {
  ProcessingVersionBreakdownResponse,
  ReplayProcessingVersion,
  ReplayStaleness,
} from "./types";

const SHORT_SHA = 7;
const GITHUB_REPO = {
  "rocket-sense": "https://github.com/rlrml/rocket-sense",
  "subtr-actor": "https://github.com/rlrml/subtr-actor",
} as const;

function shortSha(sha?: string | null) {
  return sha ? sha.slice(0, SHORT_SHA) : null;
}

/** subtr-actor version with its short git sha appended when known. */
function versionWithSha(version?: string | null, sha?: string | null) {
  const v = version ?? "unknown";
  const s = shortSha(sha);
  return s ? `${v} (${s})` : v;
}

/** A git sha rendered as a link to its GitHub commit, short text + full title. */
function GitSha({
  repo,
  sha,
}: {
  repo: keyof typeof GITHUB_REPO;
  sha?: string | null;
}) {
  if (!sha) return <span className="subtle">unknown</span>;
  return (
    <a
      className="git-sha"
      href={`${GITHUB_REPO[repo]}/commit/${sha}`}
      target="_blank"
      rel="noreferrer"
      title={sha}
    >
      {shortSha(sha)}
    </a>
  );
}

/**
 * Compact "stale processing" pill. Renders nothing when the replay is current,
 * so callers can drop it inline unconditionally. The tooltip explains *why* a
 * replay is stale (schema bump vs subtr-actor drift) and what is current;
 * clicking opens a detail modal with the full processed-with → current diff,
 * including commit hashes for both subtr-actor and rocket-sense.
 */
export function StalenessBadge({
  staleness,
  processingVersion,
}: {
  staleness: ReplayStaleness;
  processingVersion?: ReplayProcessingVersion | null;
}) {
  const [open, setOpen] = useState(false);
  if (!staleness.is_stale) return null;

  const reasons: string[] = [];
  if (staleness.schema_outdated) {
    reasons.push(
      `event schema ${processingVersion?.event_stream_schema_version ?? "unknown"} → ${staleness.current_event_stream_schema_version}`,
    );
  }
  if (staleness.subtr_actor_outdated) {
    reasons.push(
      `subtr-actor ${versionWithSha(processingVersion?.subtr_actor_version, processingVersion?.subtr_actor_git_sha)} → ${versionWithSha(staleness.current_subtr_actor_version, staleness.current_subtr_actor_git_sha)}`,
    );
  }
  const title = `Processed with an older pipeline (${reasons.join("; ")}). Click for details. Stats may be out of date.`;

  return (
    <>
      <button
        type="button"
        className="status-badge status-stale"
        title={title}
        aria-label="Show staleness details"
        onClick={() => setOpen(true)}
      >
        <AlertTriangle size={12} />
        Stale
      </button>
      {open ? (
        <StalenessDetailModal
          staleness={staleness}
          processingVersion={processingVersion}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

/**
 * Per-replay version diff: how the replay was processed vs what the running
 * pipeline produces now. Highlights the rows that actually drifted and links
 * each commit hash to its GitHub commit.
 */
function StalenessDetailModal({
  staleness,
  processingVersion,
  onClose,
}: {
  staleness: ReplayStaleness;
  processingVersion?: ReplayProcessingVersion | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const rocketSenseDrifted =
    processingVersion?.rocket_sense_git_sha != null &&
    staleness.current_rocket_sense_git_sha != null &&
    processingVersion.rocket_sense_git_sha !== staleness.current_rocket_sense_git_sha;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="login-modal version-modal staleness-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="staleness-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <p className="eyebrow">Stale replay</p>
            <h2 id="staleness-modal-title">Processing version</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} title="Close">
            <X size={17} />
          </button>
        </header>

        <p className="muted-text">
          This replay was processed with an older pipeline. Reprocessing it will
          bring its stats up to date with the current build.
        </p>

        <table className="version-breakdown-table staleness-detail-table">
          <thead>
            <tr>
              <th />
              <th>Processed with</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            <tr className={staleness.schema_outdated ? "row-changed" : undefined}>
              <th scope="row">Event schema</th>
              <td>{processingVersion?.event_stream_schema_version ?? "unknown"}</td>
              <td>{staleness.current_event_stream_schema_version}</td>
            </tr>
            <tr className={staleness.subtr_actor_outdated ? "row-changed" : undefined}>
              <th scope="row">subtr-actor</th>
              <td>
                {processingVersion?.subtr_actor_version ?? "unknown"}{" "}
                <GitSha repo="subtr-actor" sha={processingVersion?.subtr_actor_git_sha} />
              </td>
              <td>
                {staleness.current_subtr_actor_version}{" "}
                <GitSha repo="subtr-actor" sha={staleness.current_subtr_actor_git_sha} />
              </td>
            </tr>
            <tr className={rocketSenseDrifted ? "row-changed" : undefined}>
              <th scope="row">rocket-sense</th>
              <td>
                <GitSha repo="rocket-sense" sha={processingVersion?.rocket_sense_git_sha} />
              </td>
              <td>
                <GitSha repo="rocket-sense" sha={staleness.current_rocket_sense_git_sha} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
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
