import type { ReactNode } from "react";

type KnownPlatform = "steam" | "epic" | "playstation" | "xbox" | "switch" | "splitscreen";

export function platformLabel(value: string | null): string {
  if (!value) return "unknown";
  const key = normalizePlatform(value);
  switch (key) {
    case "steam":
      return "Steam";
    case "epic":
      return "Epic";
    case "playstation":
      return "PlayStation";
    case "xbox":
      return "Xbox";
    case "switch":
      return "Switch";
    case "splitscreen":
      return "Split screen";
    default:
      return value;
  }
}

function normalizePlatform(value: string | null): KnownPlatform | null {
  switch (value?.toLowerCase()) {
    case "steam":
      return "steam";
    // psynet ids are Epic Online Services ids.
    case "epic":
    case "psynet":
      return "epic";
    case "ps4":
    case "ps5":
    case "psn":
    case "playstation":
      return "playstation";
    case "xbox":
      return "xbox";
    case "switch":
      return "switch";
    case "splitscreen":
      return "splitscreen";
    default:
      return null;
  }
}

export function PlatformIcon({ platform }: { platform: string | null }) {
  const key = normalizePlatform(platform);
  const label = platformLabel(platform);
  if (!key) {
    return <span className="platform-chip">{label}</span>;
  }
  return (
    <span className="platform-icon" title={label} aria-label={label}>
      {platformGlyphs[key]}
    </span>
  );
}

function glyph(children: ReactNode) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const platformGlyphs: Record<KnownPlatform, ReactNode> = {
  steam: glyph(
    <>
      <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10.1" cy="5.9" r="2.3" fill="currentColor" />
      <circle cx="5.9" cy="10.3" r="1.8" fill="currentColor" />
      <path d="M5 11 2.4 12.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>,
  ),
  epic: glyph(
    <>
      <path
        d="M4.1 1.6h7.8a1 1 0 0 1 1 1v7.9c0 .5-.25.97-.66 1.25L8.56 14.3a1 1 0 0 1-1.12 0l-3.68-2.55a1.5 1.5 0 0 1-.66-1.25V2.6a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M6.3 4.4h3.4M6.3 7h2.8M6.3 9.6h3.4M6.3 4.4v5.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </>,
  ),
  playstation: glyph(
    <>
      <path d="M4.2 1.6 6.7 5.9H1.7z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="11.8" cy="3.9" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.3 9.6l3.8 3.8M6.1 9.6l-3.8 3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="9.7" y="9.5" width="4.2" height="4.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>,
  ),
  xbox: glyph(
    <>
      <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.7 4.5c2 1.5 4.7 4.4 6.6 7M11.3 4.5c-2 1.5-4.7 4.4-6.6 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>,
  ),
  switch: glyph(
    <>
      <rect x="1.6" y="1.6" width="5.6" height="12.8" rx="2.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4.4" cy="5.2" r="1.1" fill="currentColor" />
      <rect x="8.8" y="1.6" width="5.6" height="12.8" rx="2.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.6" cy="10.8" r="1.1" fill="currentColor" />
    </>,
  ),
  splitscreen: glyph(
    <>
      <rect x="1.6" y="3" width="12.8" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 3v10" stroke="currentColor" strokeWidth="1.3" />
    </>,
  ),
};
