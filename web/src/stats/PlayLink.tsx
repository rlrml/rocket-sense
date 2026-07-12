import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { eventIdentityUrl } from "../playerLink";

interface CopyPlayLinkProps {
  eventId?: string;
  href?: string;
  className?: string;
  size?: number;
  stopPropagation?: boolean;
}

/**
 * Copy a compact, machine-readable identity link for a detected play. The URL
 * returns only the event/replay ids, type, frame/time coordinates, and a link
 * back to the event in Rocket Sense.
 */
export function CopyPlayLink({
  eventId,
  href: providedHref,
  className = "event-preview-pip-open",
  size = 13,
  stopPropagation = false,
}: CopyPlayLinkProps) {
  const [copied, setCopied] = useState(false);
  const href = providedHref ?? (eventId ? eventIdentityUrl(eventId) : "");
  const absolute = absoluteUrl(href);

  const copy = () => {
    void copyText(absolute).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  if (stopPropagation) {
    return (
      <span
        className={className}
        role="link"
        tabIndex={0}
        title={copied ? "Play link copied" : "Copy machine-readable play link"}
        aria-label={copied ? "Play link copied" : "Copy machine-readable play link"}
        onClick={(event) => {
          event.stopPropagation();
          copy();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          event.stopPropagation();
          copy();
        }}
      >
        {copied ? <Check size={size} /> : <Link2 size={size} />}
      </span>
    );
  }

  return (
    <a
      className={className}
      href={href}
      title={copied ? "Play link copied" : "Copy machine-readable play link"}
      aria-label={copied ? "Play link copied" : "Copy machine-readable play link"}
      onClick={(event) => {
        // Modified clicks retain normal anchor behavior so the JSON can be
        // opened directly or its URL copied with the browser's context menu.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        copy();
      }}
    >
      {copied ? <Check size={size} /> : <Link2 size={size} />}
    </a>
  );
}

function absoluteUrl(href: string): string {
  try {
    return new URL(href, window.location.origin).toString();
  } catch {
    return href;
  }
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Clipboard access can be denied in local/non-secure previews; retain a
      // DOM fallback so the share control still works there.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
