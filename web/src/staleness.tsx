import { useEffect, useState } from "react";
import { AlertTriangle, Cpu, Info, RefreshCw, X } from "lucide-react";

import { getPlayerProcessingVersions, reprocessReplay, reprocessReplayClient } from "./api";
import { LocalReprocessProgressBar } from "./reprocessProgress";
import type {
  ProcessingVersionBreakdownResponse,
  ReplayProcessingVersion,
  ReplayStaleness,
} from "./types";
import type { LocalReprocessProgress } from "./stats/replayModel";

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
function GitSha({ repo, sha }: { repo: keyof typeof GITHUB_REPO; sha?: string | null }) {
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
 * The processing-status chip for a stale replay: it still reads "Processed" but
 * in an amber tone with a warning triangle folded in, and the whole chip is a
 * button that opens the staleness detail modal. Renders nothing when the replay
 * is current, so callers can fall back to a plain status chip. The tooltip
 * explains *why* a replay is stale (schema bump vs subtr-actor drift) and what
 * is current; the modal shows the full processed-with → current diff (with
 * commit hashes) plus reprocess controls when the viewer is allowed to use them.
 */
export function StalenessChip({
  staleness,
  processingVersion,
  replayId,
  label = "Processed",
  canReprocess,
}: {
  staleness: ReplayStaleness;
  processingVersion?: ReplayProcessingVersion | null;
  replayId: string;
  label?: string;
  canReprocess: boolean;
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
        className="chip chip-amber chip-button"
        title={title}
        aria-label={`${label}, but stale — show staleness details`}
        onClick={() => setOpen(true)}
      >
        <AlertTriangle size={12} />
        {label}
      </button>
      {open ? (
        <StalenessDetailModal
          staleness={staleness}
          processingVersion={processingVersion}
          replayId={replayId}
          canReprocess={canReprocess}
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
  replayId,
  canReprocess,
  onClose,
}: {
  staleness: ReplayStaleness;
  processingVersion?: ReplayProcessingVersion | null;
  replayId: string;
  canReprocess: boolean;
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
          This replay was processed with an older pipeline. Reprocessing it will bring its stats up
          to date with the current build.
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

        <ReprocessControls replayId={replayId} canReprocess={canReprocess} />
      </section>
    </div>
  );
}

/**
 * Reprocess controls for the staleness modal. Offers a server-queued reprocess
 * and, for users who want to spend their own compute, an in-browser reprocess
 * that regenerates the analysis with the current WASM and uploads it. Both are
 * gated on `canReprocess` (uploader or admin); other viewers just see why they
 * cannot reprocess.
 */
function ReprocessControls({
  replayId,
  canReprocess,
}: {
  replayId: string;
  canReprocess: boolean;
}) {
  const [running, setRunning] = useState<"server" | "local" | null>(null);
  const [result, setResult] = useState<{ error: boolean; message: string } | null>(null);
  const [localProgress, setLocalProgress] = useState<LocalReprocessProgress | null>(null);

  async function runServer() {
    setRunning("server");
    setLocalProgress(null);
    setResult(null);
    try {
      const response = await reprocessReplay(replayId);
      setResult({
        error: false,
        message: response.enqueued
          ? "Queued for reprocessing — refresh in a moment to see updated stats."
          : "Already up to date — nothing needed reprocessing.",
      });
    } catch (error) {
      setResult({
        error: true,
        message: error instanceof Error ? error.message : "Reprocess failed.",
      });
    } finally {
      setRunning(null);
    }
  }

  async function runLocal() {
    setRunning("local");
    setLocalProgress(null);
    setResult({ error: false, message: "Reprocessing in your browser — parsing the replay…" });
    try {
      const { computeStatsTimelineScaffoldJson } = await import("./stats/replayModel");
      const scaffoldJson = await computeStatsTimelineScaffoldJson(replayId, setLocalProgress);
      setLocalProgress({
        stage: "uploading",
        message: "Uploading regenerated analysis",
        progress: null,
      });
      await reprocessReplayClient(replayId, {
        subtrActorGitSha: __SUBTR_ACTOR_REV__,
        scaffoldJson,
      });
      setLocalProgress(null);
      setResult({
        error: false,
        message: "Reprocessed locally — refresh to see the regenerated analysis.",
      });
    } catch (error) {
      setLocalProgress(null);
      setResult({
        error: true,
        message: error instanceof Error ? error.message : "Local reprocess failed.",
      });
    } finally {
      setRunning(null);
    }
  }

  if (!canReprocess) {
    return (
      <p className="muted-text staleness-actions-note">
        Only the replay's uploader or an admin can reprocess it.
      </p>
    );
  }

  return (
    <div className="staleness-actions">
      <div className="staleness-actions-row">
        <button
          className="secondary-button"
          type="button"
          disabled={running !== null}
          onClick={() => void runServer()}
        >
          <RefreshCw size={16} className={running === "server" ? "spin" : undefined} />
          {running === "server" ? "Requesting" : "Reprocess on server"}
        </button>
        <button
          className="secondary-button"
          type="button"
          disabled={running !== null}
          onClick={() => void runLocal()}
          title="Reprocess in your browser using your own compute, then upload the result"
        >
          <Cpu size={16} className={running === "local" ? "spin" : undefined} />
          {running === "local" ? "Reprocessing" : "Reprocess locally"}
        </button>
      </div>
      {result ? (
        <p className={`reprocess-message${result.error ? " reprocess-error" : ""}`}>
          {result.message}
        </p>
      ) : null}
      <LocalReprocessProgressBar progress={localProgress} />
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
                    <tr
                      key={`${row.event_stream_schema_version ?? "?"}-${row.subtr_actor_version ?? "?"}-${index}`}
                    >
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
