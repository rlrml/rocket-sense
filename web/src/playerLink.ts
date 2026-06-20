// Links into the standalone subtr-actor replay player. The in-app embedded
// player page was removed in favor of always opening the fullscreen player, so
// both the replay-detail "Player" button and the stats clip-preview "open"
// links resolve through here.

export function replayFileUrl(replayId: string): string {
  return `/api/v1/replays/${encodeURIComponent(replayId)}/file`;
}

export function subtrActorPlayerUrl(replayId: string): string {
  return `/subtr-actor/?replayUrl=${encodeURIComponent(replayFileUrl(replayId))}`;
}
