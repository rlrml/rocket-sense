# Rocket Sense Design System

Rocket Sense is a light, analytical dashboard for replay hosting, processing
state, and replay-derived statistics. The UI should feel like a precise replay
analysis tool: dense, scannable, technical, and restrained.

This document captures the durable guidance from the design-system bundle. Do
not commit generated design-bundle files or prototype-only assets unless they
are wired into the production app.

## Product Voice

- Write like an analyst, not a marketer. Prefer terse domain labels such as
  "Boost economy", "Kickoff detail", "Possession share", and "Overfill wasted".
- Use Sentence case for page titles and section headers.
- Use uppercase heavy labels for eyebrows, table headers, and micro labels.
- Keep action labels imperative: "Upload", "Search", "Reset", "Reprocess".
- Surface data caveats directly. Mark approximate ranks, stale processing, and
  missing replay metadata instead of hiding uncertainty.
- Avoid emoji. Use Lucide icons or existing domain-specific SVG diagrams.

## Visual Foundation

The app is a cool neutral dashboard with Blue and Orange as functional team
accents. Saturated color should encode team, state, or stat category.

Core palette:

| Token | Value | Usage |
| --- | --- | --- |
| `--rs-bg` | `#f6f7f8` | App background |
| `--surface` | `#ffffff` | Cards, panels, inputs |
| `--surface-subtle` | `#edf1f5` | Tracks and inset wells |
| `--text` | `#17202a` | Body text |
| `--text-strong` | `#243142` | Headings and emphasized numbers |
| `--muted` | `#617181` | Captions, labels, secondary metadata |
| `--border` | `#d8dee6` | Default hairline border |
| `--nav` | `#111827` | Sidebar background |
| `--team-blue` | `#2563eb` | Blue team and primary action |
| `--team-orange` | `#ea580c` | Orange team |

Boost analytics use a separate functional palette:

| Token | Value | Usage |
| --- | --- | --- |
| `--boost-big` | `#0f766e` | Big pad collection |
| `--boost-small` | `#94a3b8` | Small pad collection |
| `--boost-grant` | `#a855f7` | Granted or spawned boost |
| `--boost-stolen-big` | `#dc2626` | Enemy-half big pad steals |
| `--boost-stolen-small` | `#fca5a5` | Enemy-half small pad steals |
| `--boost-overfill` | `#d97706` | Wasted overfill |
| `--boost-supersonic` | `#475569` | Supersonic / idle boost state |

## Layout And Surfaces

- Keep the fixed dark sidebar at `248px`; the main panel stays light and fluid.
- Cap standard page content at `1280px` unless the page needs full-width stat
  comparison space.
- Use flat white panels with `1px` borders. Resting cards should not have
  shadows; hover and selected states may lift subtly.
- Use `6px` radius for controls, `8px` for panels, `12px` for replay cards, and
  `999px` for pills.
- Prefer CSS grid with `minmax(0, 1fr)` for stat tables and responsive panels.
- Backgrounds should be flat fills. Avoid decorative gradients, blur, texture,
  and unrelated imagery.

## Typography

Rocket Sense uses Inter first, then system sans fallbacks. Monospace is reserved
for machine identifiers, hashes, GUIDs, and game-clock values.

- Page title: `28px`, bold, compact line height.
- Detail header: `22px`.
- Panel title: `16px`.
- Body: `14px`.
- Labels and chips: `10-12px`, heavy weight, usually uppercase.
- Use tabular numerals for comparable stats, scores, rates, and timers.

## Components

- Buttons are `40px` tall, `6px` radius, white with a hairline border. The only
  filled primary action uses `--team-blue`.
- Status, playlist, team, MVP, and rank metadata should render as compact pills
  using the semantic status tokens.
- Rank badges must use the official PNG assets in `web/src/assets/ranks/`.
  Never redraw rank art.
- Platform identity should use `web/src/platform.tsx`, which wraps Simple Icons
  and local fallback paths.
- Domain diagrams such as kickoff shapes and goal-mouth plots should remain
  bespoke SVG/data visualizations derived from replay geometry.

## Implementation

Design tokens live in `web/src/design-tokens.css` and are imported by
`web/src/styles.css`. When adding new UI, prefer the existing token names and
component classes before introducing new one-off colors or spacing.

Generated artifacts from design tools can be useful references, but production
changes should be reviewed and copied intentionally into the app or docs.
