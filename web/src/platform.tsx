import { siEpicgames, siPlaystation, siQq, siSteam } from "simple-icons";

import { Chip } from "./chip";

type KnownPlatform = "steam" | "epic" | "playstation" | "xbox" | "switch" | "splitscreen" | "qq";

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
    case "qq":
      return "QQ";
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
    case "qq":
      return "qq";
    default:
      return null;
  }
}

// Official brand glyph paths (24x24 viewBox), from the MIT-licensed
// simple-icons set. Xbox and Nintendo Switch were removed from current
// simple-icons releases at the brands' request, so their paths are embedded
// from simple-icons 9.21.0.
export const xboxBrandPath =
  "M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.48 24 14.861 24 12.004c0-3.34-1.365-6.362-3.57-8.536 0 0-.027-.022-.082-.042-.063-.022-.152-.045-.281-.045-.592 0-1.985.434-4.805 3.246zM3.654 3.426c-.057.02-.082.041-.086.042C1.365 5.642 0 8.664 0 12.004c0 2.854.998 5.473 2.661 7.533-1.401-2.605 3.579-9.951 6.08-12.91-2.82-2.813-4.216-3.245-4.806-3.245-.131 0-.223.021-.281.046v-.002zM12 3.551S9.055 1.828 6.755 1.746c-.903-.033-1.454.295-1.521.339C7.379.646 9.659 0 11.984 0H12c2.334 0 4.605.646 6.766 2.085-.068-.046-.615-.372-1.52-.339C14.946 1.828 12 3.545 12 3.545v.006z";

const switchPath =
  "M14.176 24h3.674c3.376 0 6.15-2.774 6.15-6.15V6.15C24 2.775 21.226 0 17.85 0H14.1c-.074 0-.15.074-.15.15v23.7c-.001.076.075.15.226.15zm4.574-13.199c1.351 0 2.399 1.125 2.399 2.398 0 1.352-1.125 2.4-2.399 2.4-1.35 0-2.4-1.049-2.4-2.4-.075-1.349 1.05-2.398 2.4-2.398zM11.4 0H6.15C2.775 0 0 2.775 0 6.15v11.7C0 21.226 2.775 24 6.15 24h5.25c.074 0 .15-.074.15-.149V.15c.001-.076-.075-.15-.15-.15zM9.676 22.051H6.15c-2.326 0-4.201-1.875-4.201-4.201V6.15c0-2.326 1.875-4.201 4.201-4.201H9.6l.076 20.102zM3.75 7.199c0 1.275.975 2.25 2.25 2.25s2.25-.975 2.25-2.25c0-1.273-.975-2.25-2.25-2.25s-2.25.977-2.25 2.25z";

// Not a brand: two side-by-side viewports for local split screen players.
const splitscreenPath =
  "M2.5 4A1.5 1.5 0 0 0 1 5.5v13A1.5 1.5 0 0 0 2.5 20H11V4zm19 0H13v16h8.5a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 21.5 4z";

const platformPaths: Record<KnownPlatform, string> = {
  steam: siSteam.path,
  epic: siEpicgames.path,
  playstation: siPlaystation.path,
  xbox: xboxBrandPath,
  switch: switchPath,
  splitscreen: splitscreenPath,
  qq: siQq.path,
};

export function PlatformIcon({ platform }: { platform: string | null }) {
  const key = normalizePlatform(platform);
  const label = platformLabel(platform);
  if (!key) {
    return <Chip>{label}</Chip>;
  }
  return (
    <span className="platform-icon" title={label} aria-label={label}>
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
        <path d={platformPaths[key]} fill="currentColor" />
      </svg>
    </span>
  );
}
