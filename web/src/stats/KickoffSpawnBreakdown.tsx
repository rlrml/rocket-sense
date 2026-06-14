import { useMemo, useState } from "react";
import type { EventStatDimensionResponse, EventStatDimensionValueResponse } from "../types";
import { KickoffShapeIcon } from "./KickoffShapeIcon";

export type KickoffShapeFilter = "all" | "diagonal" | "center_offset" | "center";
export type KickoffSideFilter = "all" | "left" | "right";
type KickoffSide = Exclude<KickoffSideFilter, "all">;

interface KickoffSpawnBreakdownProps {
  dimension: EventStatDimensionResponse;
  shapeFilter?: KickoffShapeFilter;
  sideFilter?: KickoffSideFilter;
  onShapeFilterChange?: (value: KickoffShapeFilter) => void;
  onSideFilterChange?: (value: KickoffSideFilter) => void;
}

interface KickoffSpawnBucket {
  key: string;
  label: string;
  shape: Exclude<KickoffShapeFilter, "all"> | "unknown";
  side: KickoffSide | null;
  count: number;
  values: EventStatDimensionValueResponse[];
}

interface KickoffSpawnCard {
  key: string;
  label: string;
  shape: Exclude<KickoffShapeFilter, "all"> | "unknown";
  side: KickoffSide | null | "both";
  count: number;
  buckets: KickoffSpawnBucket[];
}

export const shapeOptions: Array<{ key: KickoffShapeFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "diagonal", label: "Diagonal" },
  { key: "center_offset", label: "Center offset" },
  { key: "center", label: "Center" },
];

export const sideOptions: Array<{ key: KickoffSideFilter; label: string }> = [
  { key: "all", label: "All sides" },
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
];

const shapeLabels: Record<Exclude<KickoffShapeFilter, "all"> | "unknown", string> = {
  diagonal: "Diagonal",
  center_offset: "Center offset",
  center: "Center",
  unknown: "Unknown",
};

const sideLabels: Record<KickoffSide, string> = {
  left: "Left",
  right: "Right",
};

export function KickoffSpawnBreakdown({
  dimension,
  shapeFilter: controlledShapeFilter,
  sideFilter: controlledSideFilter,
  onShapeFilterChange,
  onSideFilterChange,
}: KickoffSpawnBreakdownProps) {
  const [localShapeFilter, setLocalShapeFilter] = useState<KickoffShapeFilter>("all");
  const [localSideFilter, setLocalSideFilter] = useState<KickoffSideFilter>("all");
  const shapeFilter = controlledShapeFilter ?? localShapeFilter;
  const sideFilter = controlledSideFilter ?? localSideFilter;
  const buckets = useMemo(() => buildSpawnBuckets(dimension.values), [dimension.values]);
  const total = buckets.reduce((sum, bucket) => sum + bucket.count, 0);
  const cards = buildSpawnCards(buckets, shapeFilter, sideFilter);
  const filteredCount = cards.reduce((sum, card) => sum + card.count, 0);

  const selectShape = (value: KickoffShapeFilter) => {
    if (onShapeFilterChange) {
      onShapeFilterChange(value);
    } else {
      setLocalShapeFilter(value);
    }
  };
  const selectSide = (value: KickoffSideFilter) => {
    if (onSideFilterChange) {
      onSideFilterChange(value);
    } else {
      setLocalSideFilter(value);
    }
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className="kickoff-spawn-breakdown">
      <div className="kickoff-spawn-breakdown-header">
        <h4>{dimension.label}</h4>
        <strong>
          {filteredCount.toLocaleString()} of {total.toLocaleString()} · {formatShare(filteredCount, total)}
        </strong>
      </div>
      <div className="kickoff-filter-stack" aria-label="Kickoff spawn filters">
        <KickoffFilterGroup
          label="Shape"
          options={shapeOptions.map((option) => ({
            ...option,
            count: countBuckets(buckets, option.key, sideFilter),
          }))}
          selected={shapeFilter}
          onSelect={(value) => selectShape(value as KickoffShapeFilter)}
        />
        <KickoffFilterGroup
          label="Side"
          options={sideOptions.map((option) => ({
            ...option,
            count: countBuckets(buckets, shapeFilter, option.key),
          }))}
          selected={sideFilter}
          onSelect={(value) => selectSide(value as KickoffSideFilter)}
        />
      </div>
      <div className="kickoff-spawn-card-grid">
        {cards.map((card) => (
          <KickoffSpawnCardView card={card} total={total} key={card.key} />
        ))}
      </div>
      {cards.length === 0 ? <p className="kickoff-spawn-empty subtle">No kickoffs match this shape and side.</p> : null}
    </div>
  );
}

export function KickoffFilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: Array<{ key: string; label: string; count: number }>;
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="kickoff-filter-group">
      <span className="kickoff-filter-label">{label}</span>
      <div className="kickoff-filter-options">
        {options.map((option) => (
          <button
            className={`kickoff-filter-button ${selected === option.key ? "active" : ""}`}
            type="button"
            aria-pressed={selected === option.key}
            onClick={() => onSelect(option.key)}
            key={option.key}
          >
            <span>{option.label}</span>
            <strong>{option.count.toLocaleString()}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function KickoffSpawnCardView({ card, total }: { card: KickoffSpawnCard; total: number }) {
  const share = total > 0 ? card.count / total : null;
  const sideRows = card.buckets
    .filter((bucket) => bucket.side != null)
    .sort((left, right) => sideOrder(left.side) - sideOrder(right.side));

  return (
    <article className="kickoff-spawn-card">
      <div className="kickoff-spawn-card-main">
        <KickoffSpawnIcon shape={card.shape} side={card.side} label={card.label} />
        <div className="kickoff-spawn-card-copy">
          <strong>{card.label}</strong>
          <span>
            {card.count.toLocaleString()} kickoffs · {formatShare(card.count, total)}
          </span>
        </div>
      </div>
      <div className="kickoff-spawn-share-track" aria-label={`${card.label}: ${formatShare(card.count, total)}`}>
        <span style={{ width: `${barPercent(share)}%` }} />
      </div>
      {sideRows.length > 1 ? (
        <div className="kickoff-spawn-side-rows">
          {sideRows.map((bucket) => (
            <div className="kickoff-spawn-side-row" key={bucket.key}>
              <span>{bucket.side ? sideLabels[bucket.side] : bucket.label}</span>
              <div className="kickoff-spawn-mini-track" aria-label={`${bucket.label}: ${formatShare(bucket.count, card.count)}`}>
                <span style={{ width: `${barPercent(card.count > 0 ? bucket.count / card.count : null)}%` }} />
              </div>
              <strong>{formatShare(bucket.count, card.count)}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function KickoffSpawnIcon({
  shape,
  side,
  label,
}: {
  shape: KickoffSpawnCard["shape"];
  side: KickoffSpawnCard["side"];
  label: string;
}) {
  if (shape === "unknown") {
    return <span className="kickoff-spawn-unknown-icon">?</span>;
  }
  if (shape === "center") {
    return <KickoffShapeIcon type={shape} direction="left" size={38} title={label} />;
  }
  if (side === "both") {
    return (
      <span className="kickoff-spawn-paired-icons" aria-label={label} role="img">
        <KickoffShapeIcon type={shape} direction="left" size={34} title={`${label} left`} />
        <KickoffShapeIcon type={shape} direction="right" size={34} title={`${label} right`} />
      </span>
    );
  }
  return <KickoffShapeIcon type={shape} direction={side ?? "left"} size={38} title={label} />;
}

function buildSpawnBuckets(values: EventStatDimensionValueResponse[]): KickoffSpawnBucket[] {
  const grouped = new Map<string, KickoffSpawnBucket>();
  for (const value of values) {
    const parsed = parseSpawnValue(value);
    const existing = grouped.get(parsed.key);
    if (existing) {
      existing.count += value.count;
      existing.values.push(value);
    } else {
      grouped.set(parsed.key, { ...parsed, count: value.count, values: [value] });
    }
  }
  return [...grouped.values()].sort(compareBuckets);
}

function parseSpawnValue(value: EventStatDimensionValueResponse): Omit<KickoffSpawnBucket, "count" | "values"> {
  switch (value.key) {
    case "diagonal_left":
      return { key: "diagonal_left", label: "Diagonal left", shape: "diagonal", side: "left" };
    case "diagonal_right":
      return { key: "diagonal_right", label: "Diagonal right", shape: "diagonal", side: "right" };
    case "off_center_left":
    case "center_offset_left":
      return { key: "center_offset_left", label: "Center offset left", shape: "center_offset", side: "left" };
    case "off_center_right":
    case "center_offset_right":
      return { key: "center_offset_right", label: "Center offset right", shape: "center_offset", side: "right" };
    case "center":
      return { key: "center", label: "Center", shape: "center", side: null };
    default:
      return {
        key: value.key ?? "unknown",
        label: value.display_name || "Unknown",
        shape: "unknown",
        side: null,
      };
  }
}

function buildSpawnCards(
  buckets: KickoffSpawnBucket[],
  shapeFilter: KickoffShapeFilter,
  sideFilter: KickoffSideFilter,
): KickoffSpawnCard[] {
  const filtered = buckets.filter((bucket) => bucketMatches(bucket, shapeFilter, sideFilter));
  const aggregateByShape = sideFilter === "all";
  if (!aggregateByShape) {
    return filtered.map((bucket) => ({
      key: bucket.key,
      label: bucket.label,
      shape: bucket.shape,
      side: bucket.side,
      count: bucket.count,
      buckets: [bucket],
    }));
  }

  const cards = new Map<string, KickoffSpawnCard>();
  for (const bucket of filtered) {
    const key = bucket.shape;
    const existing = cards.get(key);
    if (existing) {
      existing.count += bucket.count;
      existing.buckets.push(bucket);
    } else {
      cards.set(key, {
        key,
        label: shapeLabels[bucket.shape],
        shape: bucket.shape,
        side: bucket.side == null ? null : "both",
        count: bucket.count,
        buckets: [bucket],
      });
    }
  }

  return [...cards.values()].sort(compareCards);
}

function bucketMatches(bucket: KickoffSpawnBucket, shapeFilter: KickoffShapeFilter, sideFilter: KickoffSideFilter): boolean {
  if (shapeFilter !== "all" && bucket.shape !== shapeFilter) return false;
  if (sideFilter !== "all" && bucket.side !== sideFilter) return false;
  return true;
}

function countBuckets(buckets: KickoffSpawnBucket[], shapeFilter: KickoffShapeFilter, sideFilter: KickoffSideFilter): number {
  return buckets
    .filter((bucket) => bucketMatches(bucket, shapeFilter, sideFilter))
    .reduce((sum, bucket) => sum + bucket.count, 0);
}

function compareBuckets(left: KickoffSpawnBucket, right: KickoffSpawnBucket): number {
  return shapeOrder(left.shape) - shapeOrder(right.shape) || sideOrder(left.side) - sideOrder(right.side) || left.label.localeCompare(right.label);
}

function compareCards(left: KickoffSpawnCard, right: KickoffSpawnCard): number {
  return shapeOrder(left.shape) - shapeOrder(right.shape) || sideOrder(left.side) - sideOrder(right.side) || left.label.localeCompare(right.label);
}

function shapeOrder(shape: KickoffSpawnBucket["shape"]): number {
  switch (shape) {
    case "diagonal":
      return 0;
    case "center_offset":
      return 1;
    case "center":
      return 2;
    default:
      return 3;
  }
}

function sideOrder(side: KickoffSpawnBucket["side"] | "both"): number {
  switch (side) {
    case "left":
      return 0;
    case "right":
      return 1;
    case "both":
      return 2;
    default:
      return 3;
  }
}

function barPercent(value: number | null): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value * 100));
}

function formatShare(value: number, total: number): string;
function formatShare(value: number | null): string;
function formatShare(value: number | null, total?: number): string {
  const share = total == null ? value : total > 0 && value != null ? value / total : null;
  if (share == null || !Number.isFinite(share)) return "–";
  return `${Math.round(share * 100)}%`;
}
