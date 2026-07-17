import type { ReactNode } from "react";

export type ChipTone =
  | "neutral"
  | "muted"
  | "green"
  | "blue"
  | "purple"
  | "slate"
  | "amber"
  | "red"
  | "mvp";

/**
 * The single pill/badge primitive used across the app: game-type badges,
 * date/duration, processing status, the platform fallback, and so on.
 * Every chip renders through this so they share one box style (`.chip`) and
 * stay exactly the same height — `tone` only swaps colors. The clickable stale
 * status chip reuses the same `.chip` / `.chip-button` classes directly because
 * it needs <button> semantics.
 */
export function Chip({
  tone = "neutral",
  title,
  className,
  children,
}: {
  tone?: ChipTone;
  title?: string;
  className?: string;
  children?: ReactNode;
}) {
  const base = tone === "neutral" ? "chip" : `chip chip-${tone}`;
  return (
    <span className={className ? `${base} ${className}` : base} title={title}>
      {children}
    </span>
  );
}
