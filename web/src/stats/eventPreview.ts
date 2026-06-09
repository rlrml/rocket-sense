import { useEffect, useMemo, useState } from "react";
import type { MechanicEventResponse } from "../types";
import type { EventClip } from "./EventClipPlayer";

export interface EventPreviewSelection<TItem> {
  activeItem: TItem | null;
  activeKey: string | null;
  clip: EventClip | null;
  activateItem: (item: TItem, forceReplay: boolean) => void;
}

export function useEventPreviewSelection<TItem>(
  items: readonly TItem[],
  getItemKey: (item: TItem) => string,
  buildClip: (item: TItem, replayNonce: number) => EventClip | null,
): EventPreviewSelection<TItem> {
  const [activeItem, setActiveItem] = useState<TItem | null>(null);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    setActiveItem((current) => {
      if (current) {
        const currentKey = getItemKey(current);
        const refreshedItem = items.find((item) => getItemKey(item) === currentKey);
        if (refreshedItem) {
          return refreshedItem;
        }
      }
      return items[0] ?? null;
    });
  }, [getItemKey, items]);

  const activateItem = (item: TItem, forceReplay: boolean) => {
    setActiveItem(item);
    if (forceReplay) {
      setReplayNonce((nonce) => nonce + 1);
    }
  };

  const clip = useMemo(
    () => (activeItem ? buildClip(activeItem, replayNonce) : null),
    [activeItem, buildClip, replayNonce],
  );

  return {
    activeItem,
    activeKey: activeItem ? getItemKey(activeItem) : null,
    clip,
    activateItem,
  };
}

export function eventDisplayTime(event: MechanicEventResponse): number | null {
  if (event.event_time != null) return event.event_time;
  if (event.start_time != null) return event.start_time;
  return numberField(event.payload, "time");
}

export function eventAnchorFrame(
  event: MechanicEventResponse,
  extraPayloadPaths: readonly string[] = [],
): number | null {
  for (const path of ["frame", ...extraPayloadPaths]) {
    const frame = integerField(event.payload, path);
    if (frame != null) {
      return frame;
    }
  }
  return event.event_frame;
}

export function numberField(payload: Record<string, unknown>, key: string): number | null {
  const value = payload[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function integerField(payload: Record<string, unknown>, path: string): number | null {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    return (current as Record<string, unknown>)[key];
  }, payload);
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}
