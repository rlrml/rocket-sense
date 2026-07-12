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

/**
 * Machine-readable subtr-actor "case" export for one event (no auth required).
 * This is the link to hand to subtr-actor for writing/correcting a test against
 * the clip.
 */
export function eventCaseExportUrl(eventId: string): string {
  return `/api/v1/events/${encodeURIComponent(eventId)}/export`;
}

/** Compact event/replay coordinates suitable for identifying one play. */
export function eventIdentityUrl(eventId: string): string {
  return `/api/v1/events/${encodeURIComponent(eventId)}/identity`;
}
