// Rank tiers as submitted by clients (PsyNet skill tiers): 0 = Unranked,
// 1-21 = Bronze I through Grand Champion III, 22 = Supersonic Legend.
const tierNames = [
  "Unranked",
  "Bronze I",
  "Bronze II",
  "Bronze III",
  "Silver I",
  "Silver II",
  "Silver III",
  "Gold I",
  "Gold II",
  "Gold III",
  "Platinum I",
  "Platinum II",
  "Platinum III",
  "Diamond I",
  "Diamond II",
  "Diamond III",
  "Champion I",
  "Champion II",
  "Champion III",
  "Grand Champion I",
  "Grand Champion II",
  "Grand Champion III",
  "Supersonic Legend",
];

export function rankLabel(tier: number | null | undefined, division: number | null | undefined): string | null {
  if (tier == null) return null;
  const name = tierNames[tier] ?? `Tier ${tier}`;
  if (tier <= 0 || division == null) return name;
  const visibleDivision = division >= 0 && division <= 3 ? division + 1 : division;
  return `${name} Div ${visibleDivision}`;
}

// Official in-game rank icons, one per tier index (assets/ranks/<tier>.png).
function rankIconUrl(tier: number): string | null {
  if (tier < 0 || tier >= tierNames.length) return null;
  return new URL(`./assets/ranks/${tier}.png`, import.meta.url).href;
}

export function RankBadge({
  tier,
  division,
  mmr,
}: {
  tier: number | null | undefined;
  division: number | null | undefined;
  mmr: number | null | undefined;
}) {
  if (tier == null) return null;
  const label = rankLabel(tier, division);
  const rounded = mmr != null ? Math.round(mmr) : null;
  const title = rounded != null ? `${label} · ${rounded} MMR` : (label ?? undefined);
  const icon = rankIconUrl(tier);
  return (
    <span className="rank-badge" title={title} aria-label={title}>
      {icon ? <img src={icon} alt={label ?? ""} width="20" height="20" /> : null}
      {rounded != null ? <span className="rank-mmr">{rounded}</span> : null}
    </span>
  );
}
