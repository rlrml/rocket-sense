import { formatSeasonLabel } from "../seasons";

// Time-period model for period-scoped player stats. A period is encoded in the
// URL as `period=<kind>:<anchor>` purely so the UI can render a label and
// prev/next controls; the backend only ever sees the concrete bounds written
// alongside it (`replay-date-after/before`, or `min/max-season` for seasons).
// If the two ever disagree (hand-edited URL), the bounds win.

export type PeriodKind =
  | "session"
  | "day"
  | "week"
  | "30d"
  | "year"
  | "season"
  | "last10"
  | "last100";

const PERIOD_KINDS: readonly PeriodKind[] = [
  "session",
  "day",
  "week",
  "30d",
  "year",
  "season",
  "last10",
  "last100",
];

/** Kinds whose bounds come from the last N games, not the calendar. */
export const GAME_COUNT_BY_KIND: Partial<Record<PeriodKind, number>> = {
  last10: 10,
  last100: 100,
};

export const PERIOD_PARAM = "period";
export const REPLAY_DATE_AFTER_PARAM = "replay-date-after";
export const REPLAY_DATE_BEFORE_PARAM = "replay-date-before";
export const MIN_SEASON_PARAM = "min-season";
export const MAX_SEASON_PARAM = "max-season";

export interface PeriodSelection {
  kind: PeriodKind;
  /**
   * `day`/`week`/`30d`/`year`: a local calendar date (YYYY-MM-DD) — the day
   * itself, any day inside the week/year, or the last day of the 30-day block.
   * `season`: a season code like `f23`.
   * `session` / `last10` / `last100`: the anchoring instant (RFC3339) — the
   * session start, or the latest game in the last-N window — matched against
   * timeline data.
   */
  anchor: string;
}

/**
 * A session's last point is that game's *start*; pad the upper bound so the
 * final game's replay is included by the `replay_date <=` filter.
 */
export const SESSION_END_PADDING_MS = 20 * 60 * 1000;

export function formatPeriodParam(selection: PeriodSelection): string {
  return `${selection.kind}:${selection.anchor}`;
}

export function parsePeriodParam(value: string | null): PeriodSelection | null {
  if (!value) return null;
  const separator = value.indexOf(":");
  if (separator <= 0) return null;
  const kind = value.slice(0, separator) as PeriodKind;
  const anchor = value.slice(separator + 1);
  if (!PERIOD_KINDS.includes(kind) || !anchor) {
    return null;
  }
  return { kind, anchor };
}

// Local-calendar date helpers. Day/week/30d boundaries are computed in the
// browser's timezone (a late-night session shouldn't split at UTC midnight);
// the URL then carries absolute instants, so shared links stay stable.

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Monday of the anchor's week (ISO week start). */
function startOfLocalWeek(date: Date): Date {
  return addDays(startOfLocalDay(date), -((date.getDay() + 6) % 7));
}

export function formatLocalDateAnchor(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseLocalDateAnchor(anchor: string): Date | null {
  const match = anchor.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

export interface PeriodBounds {
  /** Inclusive lower bound instant. */
  after: Date;
  /** Inclusive upper bound instant (backend filters use `<=`). */
  before: Date;
}

/** End-exclusive instant turned into an inclusive `replay_date <=` bound. */
function inclusiveBefore(exclusiveEnd: Date): Date {
  return new Date(exclusiveEnd.getTime() - 1);
}

/**
 * Concrete instants for a date-based period. Seasons filter by code (not
 * dates) and sessions get their bounds from timeline data, so both return
 * null here.
 */
export function periodBounds(selection: PeriodSelection): PeriodBounds | null {
  // Seasons filter by code; sessions and last-N windows need timeline data.
  if (
    selection.kind === "season" ||
    selection.kind === "session" ||
    selection.kind in GAME_COUNT_BY_KIND
  ) {
    return null;
  }
  const anchor = parseLocalDateAnchor(selection.anchor);
  if (!anchor) return null;
  switch (selection.kind) {
    case "day":
      return { after: anchor, before: inclusiveBefore(addDays(anchor, 1)) };
    case "week": {
      const monday = startOfLocalWeek(anchor);
      return { after: monday, before: inclusiveBefore(addDays(monday, 7)) };
    }
    case "30d":
      return { after: addDays(anchor, -29), before: inclusiveBefore(addDays(anchor, 1)) };
    case "year": {
      const start = new Date(anchor.getFullYear(), 0, 1);
      const nextYear = new Date(anchor.getFullYear() + 1, 0, 1);
      return { after: start, before: inclusiveBefore(nextYear) };
    }
    default:
      return null;
  }
}

/** Bounds for a session given its timeline start/end instants. */
export function sessionPeriodBounds(startIso: string, endIso: string): PeriodBounds {
  return {
    after: new Date(startIso),
    before: new Date(new Date(endIso).getTime() + SESSION_END_PADDING_MS),
  };
}

/**
 * Bounds spanning the `count` most recent games, given the player's
 * chronologically ordered (oldest-first) game timestamps. Returns null when
 * there are no games. Because the aggregate filter is `replay_date` between the
 * bounds, exact-tie timestamps at the window edge could pull in a neighbour,
 * but distinct game starts make that vanishingly rare.
 */
export function lastGamesPeriodBounds(
  orderedGameIsos: string[],
  count: number,
): PeriodBounds | null {
  if (orderedGameIsos.length === 0) return null;
  const window = orderedGameIsos.slice(-count);
  return sessionPeriodBounds(window[0]!, window[window.length - 1]!);
}

/**
 * The most recent period of a calendar kind (day/week/30d/year), anchored on
 * `now`. Only meaningful for calendar kinds; other kinds derive their anchor
 * from timeline data at the call site.
 */
export function latestPeriodAnchor(kind: PeriodKind, now: Date): string {
  return formatLocalDateAnchor(kind === "week" ? startOfLocalWeek(now) : now);
}

/**
 * Shift a calendar-based period by whole steps. Seasons, sessions, and last-N
 * windows shift through their ordered data at the call site, not by calendar
 * math, so they return null here.
 */
export function shiftPeriodAnchor(selection: PeriodSelection, steps: number): string | null {
  if (
    selection.kind === "season" ||
    selection.kind === "session" ||
    selection.kind in GAME_COUNT_BY_KIND
  ) {
    return null;
  }
  const anchor = parseLocalDateAnchor(selection.anchor);
  if (!anchor) return null;
  if (selection.kind === "year") {
    return formatLocalDateAnchor(
      new Date(anchor.getFullYear() + steps, anchor.getMonth(), anchor.getDate()),
    );
  }
  const stride = selection.kind === "day" ? 1 : selection.kind === "week" ? 7 : 30;
  return formatLocalDateAnchor(addDays(anchor, steps * stride));
}

const dayLabelFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export function formatPeriodLabel(selection: PeriodSelection): string {
  const gameCount = GAME_COUNT_BY_KIND[selection.kind];
  if (gameCount != null) {
    return `Last ${gameCount} games`;
  }
  switch (selection.kind) {
    case "season":
      return formatSeasonLabel(selection.anchor);
    case "session": {
      const start = new Date(selection.anchor);
      if (Number.isNaN(start.getTime())) return "Session";
      return `Session · ${start.toLocaleString(undefined, {
        ...dayLabelFormat,
        hour: "numeric",
        minute: "2-digit",
      })}`;
    }
    case "year": {
      const anchor = parseLocalDateAnchor(selection.anchor);
      return anchor ? String(anchor.getFullYear()) : selection.anchor;
    }
    default: {
      const bounds = periodBounds(selection);
      if (!bounds) return selection.anchor;
      if (selection.kind === "day") {
        return bounds.after.toLocaleDateString(undefined, dayLabelFormat);
      }
      if (selection.kind === "week") {
        return `Week of ${bounds.after.toLocaleDateString(undefined, dayLabelFormat)}`;
      }
      const end = new Date(bounds.before.getTime() + 1 - 24 * 60 * 60 * 1000);
      return `${bounds.after.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })} – ${end.toLocaleDateString(undefined, dayLabelFormat)}`;
    }
  }
}

/**
 * Write a period selection into search params: the `period=` marker plus the
 * bounds the backend consumes. The date and season param families are mutually
 * exclusive, so the family the kind doesn't use is cleared. Passing `null`
 * clears the period entirely. Session selections must pass explicit `bounds`
 * (from timeline data).
 */
export function applyPeriodToParams(
  params: URLSearchParams,
  selection: PeriodSelection | null,
  bounds?: PeriodBounds | null,
): void {
  params.delete(PERIOD_PARAM);
  params.delete(REPLAY_DATE_AFTER_PARAM);
  params.delete(REPLAY_DATE_BEFORE_PARAM);
  params.delete(MIN_SEASON_PARAM);
  params.delete(MAX_SEASON_PARAM);
  if (!selection) return;
  if (selection.kind === "season") {
    params.set(PERIOD_PARAM, formatPeriodParam(selection));
    params.set(MIN_SEASON_PARAM, selection.anchor);
    params.set(MAX_SEASON_PARAM, selection.anchor);
    return;
  }
  // Data-driven kinds (session, last-N) can't derive their own bounds, so a
  // caller that omits them leaves the period unset rather than writing a marker
  // with no filter behind it.
  const resolved = bounds ?? periodBounds(selection);
  if (!resolved) return;
  params.set(PERIOD_PARAM, formatPeriodParam(selection));
  params.set(REPLAY_DATE_AFTER_PARAM, resolved.after.toISOString());
  params.set(REPLAY_DATE_BEFORE_PARAM, resolved.before.toISOString());
}
