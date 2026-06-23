export function touchTagValue(payload: Record<string, unknown>, group: string): string | null {
  const tags = payload.tags;
  if (!Array.isArray(tags)) return null;
  for (const tag of tags) {
    if (!tag || typeof tag !== "object" || Array.isArray(tag)) continue;
    const object = tag as Record<string, unknown>;
    if (object.group === group && typeof object.value === "string" && object.value.length > 0) {
      return object.value;
    }
  }
  return null;
}

export function touchPayloadValue(payload: Record<string, unknown>, key: string): string | null {
  const tagged = touchTagValue(payload, key);
  if (tagged) return tagged;
  const value = payload[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function touchIntentionValue(payload: Record<string, unknown>): string | null {
  return (
    touchTagValue(payload, "action") ??
    touchTagValue(payload, "possession") ??
    touchPayloadValue(payload, "intention") ??
    touchPayloadValue(payload, "category")
  );
}
