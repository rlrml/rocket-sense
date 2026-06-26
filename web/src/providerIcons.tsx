import { LogIn } from "lucide-react";
import { siDiscord, siEpicgames, siGithub, siGoogle, siSteam } from "simple-icons";
import { xboxBrandPath } from "./platform";

// Human-readable label for an auth/platform provider id (Steam, Epic Games, ...).
export function providerLabel(provider: string): string {
  switch (provider) {
    case "dev":
      return "development";
    case "google":
      return "Google";
    case "github":
      return "GitHub";
    case "discord":
      return "Discord";
    case "epic":
      return "Epic Games";
    case "xbox":
      return "Xbox";
    case "steam":
      return "Steam";
    default:
      return provider;
  }
}

const providerLoginIconPaths: Record<string, string> = {
  google: siGoogle.path,
  github: siGithub.path,
  discord: siDiscord.path,
  epic: siEpicgames.path,
  xbox: xboxBrandPath,
  steam: siSteam.path,
};

// Brand glyph for a provider, falling back to a generic login icon.
export function ProviderLoginIcon({ providerId }: { providerId: string }) {
  const path = providerLoginIconPaths[providerId];
  if (path) {
    return (
      <svg
        className="provider-login-icon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} fill="currentColor" />
      </svg>
    );
  }
  return <LogIn size={16} className="provider-login-icon" />;
}
