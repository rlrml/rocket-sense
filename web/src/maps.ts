// Rocket League stores the arena as an internal "map code" (the replay header's
// MapName, e.g. "EuroStadium_Night_P"). Those raw codes are what land in
// replays.map_code and, until now, what the Map filter dropdown displayed. This
// module turns a code into a human-friendly arena name, falling back to a
// best-effort humanization for codes we don't recognize.

// Known arena codes -> display names. Keys are lower-cased so lookups are
// case-insensitive. Only well-established codes are hardcoded; anything missing
// is handled by humanizeMapCode below.
const KNOWN_MAP_NAMES: Record<string, string> = {
  // DFH Stadium
  stadium_p: "DFH Stadium",
  stadium_day_p: "DFH Stadium (Day)",
  stadium_foggy_p: "DFH Stadium (Stormy)",
  stadium_winter_p: "DFH Stadium (Snowy)",
  stadium_race_day_p: "DFH Stadium (Circuit)",
  // Mannfield
  eurostadium_p: "Mannfield",
  eurostadium_night_p: "Mannfield (Night)",
  eurostadium_rainy_p: "Mannfield (Stormy)",
  eurostadium_snownight_p: "Mannfield (Snowy)",
  // Champions Field
  cs_p: "Champions Field",
  cs_day_p: "Champions Field (Day)",
  cs_hw_p: "Champions Field (Halloween)",
  // Beckwith Park
  park_p: "Beckwith Park",
  park_night_p: "Beckwith Park (Midnight)",
  park_rainy_p: "Beckwith Park (Stormy)",
  // Urban Central
  trainstation_p: "Urban Central",
  trainstation_night_p: "Urban Central (Night)",
  trainstation_dawn_p: "Urban Central (Dawn)",
  // Utopia Coliseum
  utopiastadium_p: "Utopia Coliseum",
  utopiastadium_dusk_p: "Utopia Coliseum (Dusk)",
  utopiastadium_snow_p: "Utopia Coliseum (Snowy)",
  utopiastadium_p_lux: "Utopia Coliseum (Gilded)",
  // Wasteland
  wasteland_p: "Wasteland",
  wasteland_s_p: "Wasteland",
  wasteland_night_p: "Wasteland (Night)",
  wasteland_night_s_p: "Wasteland (Night)",
  // Neo Tokyo
  neotokyo_p: "Neo Tokyo",
  neotokyo_standard_p: "Neo Tokyo",
  neotokyo_toxic_p: "Neo Tokyo (Comic)",
  // AquaDome
  underwater_p: "AquaDome",
  underwater_night_p: "AquaDome (Salty Shallows)",
  // Starbase ARC
  arc_p: "Starbase ARC",
  arc_standard_p: "Starbase ARC",
  arc_darc_p: "Starbase ARC (Aftermath)",
  // Farmstead
  farm_p: "Farmstead",
  farm_night_p: "Farmstead (Night)",
  farm_hw_p: "Farmstead (Spooky)",
  farm_grs_p: "Farmstead (Pitched)",
  // Salty Shores
  beach_p: "Salty Shores",
  beach_night_p: "Salty Shores (Night)",
  beachvolley: "Salty Shores (Volley)",
  // Forbidden Temple
  chn_stadium_p: "Forbidden Temple",
  chn_stadium_day_p: "Forbidden Temple (Day)",
  // Neon Fields
  music_p: "Neon Fields",
  // Sovereign Heights
  swamp_p: "Sovereign Heights",
  // Deadeye Canyon
  outlaw_p: "Deadeye Canyon",
  outlaw_oasis_p: "Deadeye Canyon (Oasis)",
  // Estadio Vida
  stadium_pf_p: "Estadio Vida",
  stadium_p10: "Estadio Vida",
  // Throwback Stadium
  throwbackstadium_p: "Throwback Stadium",
  throwback_p: "Throwback Stadium",
  // Hoops
  hoopsstadium_p: "Dunk House",
  // Dropshot
  shattershot_p: "Core 707",
  // Rumble / other modes reuse standard arenas, so no extra entries needed.
};

const VARIANT_SUFFIXES: Record<string, string> = {
  night: "Night",
  day: "Day",
  dawn: "Dawn",
  dusk: "Dusk",
  rainy: "Stormy",
  foggy: "Stormy",
  stormy: "Stormy",
  snow: "Snowy",
  snowy: "Snowy",
  winter: "Snowy",
  snownight: "Snowy",
};

function titleCaseWord(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Best-effort prettifier for codes not in KNOWN_MAP_NAMES. Strips the trailing
// "_P"/"_S_P" level marker, splits on underscores and camelCase boundaries, and
// title-cases the result (pulling a recognized variant into a parenthetical).
export function humanizeMapCode(code: string): string {
  const trimmed = code.trim();
  if (!trimmed) return trimmed;

  // Drop the trailing level marker: _P, _S_P, _P_LUX, etc. keep it simple.
  const base = trimmed.replace(/_(s_)?p$/i, "");

  const tokens = base
    .split("_")
    .flatMap((part) => part.split(/(?=[A-Z])/)) // break camelCase
    .map((part) => part.trim())
    .filter(Boolean);

  if (tokens.length === 0) return trimmed;

  // Pull a trailing recognized variant token into a parenthetical.
  const last = tokens[tokens.length - 1].toLowerCase();
  let variant: string | null = null;
  if (tokens.length > 1 && VARIANT_SUFFIXES[last]) {
    variant = VARIANT_SUFFIXES[last];
    tokens.pop();
  }

  const name = tokens.map(titleCaseWord).join(" ");
  return variant ? `${name} (${variant})` : name;
}

// Public entry point: resolve an arena map code to a display name.
export function mapDisplayName(code: string | null | undefined): string {
  if (!code) return "Unknown";
  const known = KNOWN_MAP_NAMES[code.trim().toLowerCase()];
  return known ?? humanizeMapCode(code);
}
