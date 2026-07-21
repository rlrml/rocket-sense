# Analysis-walkthrough cinematics port

The "Coaching" stat's mistake clips play RLVision's analysis-walkthrough
camera cinematics: when the playhead enters a detected mistake's window, a
per-kind choreography takes over the clock and camera — slow-mo, rewinds,
freezes, a bird's-eye reveal with a recommended-path overlay, a teammate-POV
pan, or a perpendicular sideview framing an open-space cone — while a callout
textbox explains the mistake.

The source of truth is the cinematic subsystem of RLVision's standalone viewer
(`RLAgent/frontend/static/3d-viewer/viewer.js`, camera mode
`"analysis-walkthrough"`): the `_aw` phase machine (`_awAdvancePhase`), the
camera driver (`_awApplyCinematicCamera`), the speed curve
(`_awEffectiveSpeed`), the callout logic (`_updateMistakeCallout` +
`MISTAKE_CALLOUT_MSG` / `TEAMMATE_SWITCH_MSG` / `BANG_PAUSE_MSG`), the
chevron path (`_computeMistakePath` / `_showTooFarPath`), and the bang cone
(`bangOpenSpace` / `_updateBangHighlight`). Phase order, durations, easing
curves, and copy carry over unchanged. This note records where the port had
to diverge and why.

## Where things live

- `web/src/stats/cinematics/` — the port.
  - `phases.ts` — the pure phase state machine, speed curve, callout phase
    view, and the widened clip-window calculation. No THREE/player imports;
    unit-tested in `__tests__/`.
  - `constants.ts`, `copy.ts`, `math.ts`, `sampling.ts`, `teammate.ts`,
    `path.ts` — pure support modules (copy tables, ReplayModel samplers,
    teammate resolution, path routing).
  - `director.ts` — the ReplayPlayer plugin that owns clock + camera during a
    cinematic, plus overlays wiring and the user free-look.
  - `overlays.ts` (THREE overlays on `replayRoot`), `callout.ts` (DOM
    overlays).
  - `lazy.ts` — the stats-bundle-safe entry: dynamic-imports the director so
    the eager stats chunk stays free of the renderer bundle.
- `web/src/stats/EventClipPlayer.tsx` — the generic seam: `EventClip` gained
  an optional `cinematic` factory whose director suspends the two loop
  enforcers (the `subscribe` handler and the 500 ms watchdog) while engaged,
  and is notified on any loop reseek.
- `web/src/stats/mistakes.tsx` — builds the cinematic per marker and widens
  the clip loop window so the rewind's furthest reach stays inside it.

## Structural divergences

**Single-mistake context.** viewer.js scanned a whole-replay `_mistakes` list
(`_findActiveMistake`). An `EventClipPlayer` clip dramatizes exactly one
marker, so "the active mistake" reduces to a window test against that marker,
and per-mistake caches (`_cachedTmFocusIdx`, `_cachedTooFarPath`) become
director-lifetime caches.

**Phase side effects as transitions.** viewer.js interleaved camera-pose
captures, follow-target switches, and playhead writes with the phase
switches. `advancePhase` returns those as an ordered `AwTransition[]`
(`capture_pose`, `begin_rewind`, `snap_time`, `attach_teammate`,
`attach_focus`) that the director applies — this is what makes the state
machine pure and testable.

**The director is a player plugin, deliberately not an `onBeforeRender`
callback.** The player's render loop runs `onBeforeRender` callbacks *before*
plugin `beforeRender` hooks, and the camera plugin (installed last by
`createPlayerFromParsed`) writes the follow camera in its plugin hook. A
plugin added later via `player.addPlugin` runs after it, so cinematic camera
writes win the frame — and the pans can read the settled follow pose the
camera plugin just produced.

**Follow-cam poses come from the camera plugin's live output.** viewer.js ran
its own `updateFollowPlayerCamera` to advance the destination player's
follow-cam and lerped from a saved source pose (`wtc_pan`), and computed an
analytic descent target (`_awFollowPlayerDestination`) for `zoom_in`. The
port keeps the same trick with native primitives: switch the attachment
(`setAttachedPlayer` + `setBallCamEnabled(true)`), let the camera plugin
place the camera, read `camera.position`/`quaternion` as the blend
destination, and smoothstep-lerp/slerp from the captured source pose. At
blend end the camera equals the plugin's own output, so the handoff is
seamless; there is no parallel follow-cam implementation.

**Transport mapping.** viewer.js integrated `currentTime += dt *
_awEffectiveSpeed()` in its own rAF loop. The vendored player clamps
`setPlaybackRate` to ≥ 0.1 and cannot run backwards, so the director drives
phases on its own wall clock and maps the effective speed onto the transport:

- speed ≥ 0.1 → `play()` + `setPlaybackRate(speed)`;
- speed = 0 (holds, freezes) → `pause()`;
- 0 < speed < 0.1 (the smoothstep decel tails into rewinds and the bang
  freeze) → `pause()` + per-frame `seek(t + dt·speed)`;
- the rewind → `pause()` + per-frame `seek` along the quintic smootherstep,
  exactly viewer.js's curve.

Phase-exit snaps (`snap_time`) land the playhead exactly on the rewind target
/ bang freeze target as in the source.

**Loop-enforcer suspension and re-arm.** The clip's two loop enforcers stand
down while the director is engaged (any phase other than `idle`/`done`). When
they do reseek (loop wrap after the cinematic hands back, or an external
scrub), they call `notifyExternalSeek()`, which aborts any in-flight
cinematic, restores the focus attachment, and clears the consumed guard — so
a loop wrap replays the cinematic on the next pass, matching viewer.js's
"scrub back in to replay" semantics. Within a run, the consumed-mistake guard
is a straight port: marked at `wtc_teammate → wtc_aftermath` or at `done`,
cleared only once the playhead passes the window end. `mistakes.tsx` widens
the clip loop window (`cinematicClipWindow`) to contain the rewind's furthest
reach; without that the watchdog's `< start - 0.05` check would fight the
rewound playhead the moment the director hands back.

## Scale and geometry (UU re-derivation)

RLVision rendered at `SCALE = 0.01` (RL cm → meters); rocket-sense renders
raw UU with the scene mapping `sceneX = x`, `sceneY = z` (up), `sceneZ = y`.
All camera and overlay constants were re-derived as viewer value × 100 and
checked against the arena's real extents (`x: ±4096`, `y: ±5120` — team
zero/blue defends −y — `z: 0..2044`): bang cam height 2000 UU, sideview
minimum distance 2600 UU, wall margins 200 UU, cone apex 150 / range 1600 /
half-angle 0.62 rad, chevron spacing 250 UU, path z-offset 30 UU, floater
offsets 700/140 UU.

Two camera computations are fitted from the live `fov`/`aspect` instead of
copying fixed numbers, because the camera plugin manages fov dynamically
(~110° horizontal, aspect-corrected) where viewer.js owned a fixed-fov
camera:

- **Bird's-eye height**: viewer.js parked at a fixed 180 scene units
  (18000 UU). The port solves the height that fits the field (+600 UU margin)
  in the tighter FOV axis, clamped to [9000, 26000] UU, so the full field
  fills the clip canvas at any viewport shape.
- **Bang sideview distance** uses the same cone-radius-over-sin(fov) formula
  as the source, just against the live fov/aspect.

3D overlays mount on `player.replayRoot`, whose matrix maps children in raw
UU (RL Z-up) into the scene — so chevron/cone/ring geometry is built in the
RL ground plane (XY, +Z up) with rotations about Z derived purely in RL
coordinates.

## Feature divergences

- **Pro-pathing model not ported.** RLVision optionally biased the too-far
  router with a pro occupancy/transition artifact (`_proResolveBucket`,
  `_proPickSupportTarget`, pad-transition bonuses). Rocket Sense has no such
  artifact, so `path.ts` ports the model-absent code path exactly: the
  hand-tuned support-spot fallback with the pro bonus terms inert — the same
  behavior viewer.js has before its model loads.
- **Pad strobe is an overlay, not a material edit.** viewer.js lifted the
  actual pad meshes' emissive and scale in sync with the traveling pulse. The
  vendored boost-pads plugin keeps its meshes closure-private, so the flare
  here is an additive ground disc pulsing at the pad position + the same
  "+12"/"+100" canvas-sprite floaters — same read, no plugin surgery.
- **Bird's-eye de-clutter is partial.** The focus-player team ring is ported
  (`FocusRingOverlay`). viewer.js additionally hid non-focus nameplates
  during the lead-in and promoted the ball above sprites during the wide
  shot; the vendored name-tag plugin's sprites are private, and on the
  compact clip canvas the tags don't cover the ball the way the full-screen
  viewer's did, so those two tweaks were not carried over.
- **Callout layout is scaled for the clip canvas.** The box/leader-line
  behavior (per-kind colors, off-screen anchor clamping into the projected
  field bounds, side-flipping placement) is a straight port, but the box
  width/offsets are roughly halved (RLVision positioned a 240px box with
  ±130/−110 offsets on a full-screen canvas; the clip is ~360×208). The box
  itself uses the type-scale tokens with the fixed dark-glass background the
  clip canvas's other overlays use (the canvas stays dark in both themes).
- **Review controls coexist with a running cinematic.** Confirm/reject stays
  clickable during playback; a reject removes the row, which switches the
  clip and tears the director down through the normal abort path.

## Verifying

- `cd web && npm test` — phase machine, windows, teammate resolution, path
  routing, control-point conditioning, copy branches.
- Open a replay's Coaching stat and watch each family end-to-end
  (`/replays/<id>/stats/coaching`). Kind → family: `bang_with_time` → freeze
  + sideview + cone; `too_far_from_play` / `pick_up_small_pads` → rewind +
  bird's-eye + chevrons/strobe; `waiting_to_challenge` / `double_committing`
  → teammate-POV pan (the latter with rewind + freeze beat); everything else
  → 0.25× slow-mo with the callout.
