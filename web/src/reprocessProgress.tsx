import type { LocalReprocessProgress } from "./stats/replayModel";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function progressLabel(progress: LocalReprocessProgress): string {
  if (
    progress.stage === "downloading" &&
    progress.loadedBytes !== undefined &&
    progress.totalBytes !== undefined
  ) {
    return `${formatBytes(progress.loadedBytes)} / ${formatBytes(progress.totalBytes)}`;
  }

  if (progress.progress !== null) {
    return `${Math.round(progress.progress * 100)}%`;
  }

  return progress.stage === "processing" ? "Working" : "Starting";
}

export function LocalReprocessProgressBar({
  progress,
}: {
  progress: LocalReprocessProgress | null;
}) {
  if (!progress) return null;

  const determinate = progress.progress !== null;
  const progressValue = progress.progress ?? 0;
  const width = determinate ? `${Math.max(0, Math.min(1, progressValue)) * 100}%` : undefined;

  return (
    <div
      className={`local-reprocess-progress${determinate ? "" : " is-indeterminate"}`}
      role="status"
      aria-live="polite"
    >
      <div className="local-reprocess-progress-row">
        <span>{progress.message}</span>
        <span>{progressLabel(progress)}</span>
      </div>
      <div
        className="local-reprocess-progress-track"
        role={determinate ? "progressbar" : undefined}
        aria-valuemin={determinate ? 0 : undefined}
        aria-valuemax={determinate ? 100 : undefined}
        aria-valuenow={determinate ? Math.round(progressValue * 100) : undefined}
      >
        <span className="local-reprocess-progress-fill" style={{ width }} />
      </div>
    </div>
  );
}
