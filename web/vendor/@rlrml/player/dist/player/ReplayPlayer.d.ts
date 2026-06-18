/**
 * ReplayPlayer — the bare playback core of @rlrml/player.
 *
 * Deliberately minimal, like `@rlrml/player`'s ReplayPlayer: it owns the
 * renderer (scene / arena / actors), a playback clock, and the plugin host —
 * nothing else. Scoreboard, name tags, overlays, effects polish, custom
 * cameras: all plugins (docs/player/EXTENSIBILITY.md).
 *
 * Data flows one way each frame:
 *   adapter.seek(t) → ActorManager interpolates meshes → plugins beforeRender →
 *   renderer.render.
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { SubtrActorPlayer } from "./adapter/SubtrActorPlayer.js";
import { type PlayerEnvironmentSpec } from "./environments.js";
import type { ReplayModel, ReplayPlayerTimelineProjection, ReplayPlayerTimelineSegment } from "../types";
import type { ReplayScene } from "../scene";
import type { BeforeRenderCallback, CameraSettings, PlayerCameraViewMode, PlayerFreeCameraPreset, PlayerOptions, PlayerPlugin, PlayerPluginDefinition, PlayerSnapshot, PlayerState, PlayerStatePatch } from "./types.js";
type PlayerListener = (state: PlayerState) => void;
type FreeCameraPresetOptions = {
    instant?: boolean;
};
export declare class ReplayPlayer extends EventTarget {
    readonly container: HTMLElement;
    /** The subtr-actor adapter — the sole data source (timelines + live entities). */
    readonly adapter: SubtrActorPlayer;
    /**
     * @rlrml/player's normalized `ReplayModel` over the same raw WASM output the
     * adapter consumes (docs/player/PLAYER_PARITY.md Phase 2) — the data surface
     * @rlrml/player consumers read. Shares the adapter's time axis (t=0 at the
     * first frame) and player-id format. Null when constructed directly with an
     * adapter only; `createPlayer()` always provides it.
     */
    readonly replay: ReplayModel | null;
    readonly options: PlayerOptions;
    readonly sceneManager: any;
    readonly arenaManager: any;
    readonly actorManager: any;
    readonly effectsManager: any;
    readonly hitboxManager: any;
    readonly controls: OrbitControls;
    /**
     * UE-coordinate mount point: children positioned in raw Unreal coords (RL
     * Z-up, UU) render correctly here — same convention as @rlrml/player's
     * `replayRoot`, see createReplayRoot. The portable seam for 3D overlays.
     */
    readonly replayRoot: THREE.Group;
    /**
     * @rlrml/player's `ReplayScene` surface (docs/player/PLAYER_PARITY.md Phase 3+):
     * what `ReplayPlayer.sceneState`-reading consumers (js/stat-evaluation-player
     * stat modules) use to mount THREE overlays. `scene`/`camera`/`renderer`/
     * `controls`/`replayRoot`/`resize` are real; `ballMesh`/`playerMeshes` are
     * live views onto this renderer's actors; the player-renderer internals
     * (body meshes, hitboxes, boost trails/meters, demo indicators) are empty
     * maps — they have no counterpart here.
     */
    readonly sceneState: ReplayScene;
    private readonly effectsEnabled;
    /** Resolves when async assets (arena meshes, ball model) are in the scene. */
    readonly ready: Promise<void>;
    private readonly plugins;
    private readonly beforeRenderCallbacks;
    private resizeObserver;
    private animationFrameId;
    private disposed;
    private playing;
    private speed;
    private loop;
    private currentTime;
    private lastTickAt;
    private freeCameraTransition;
    private cameraDistanceScaleValue;
    private customCameraSettingsValue;
    private cameraViewModeValue;
    private attachedPlayerIdValue;
    /** null = never set: follow the camera plugin's recorded-state behavior. */
    private ballCamEnabledValue;
    private boostMeterEnabledValue;
    private boostPickupAnimationEnabledValue;
    private hitboxWireframesEnabledValue;
    private hitboxOnlyModeEnabledValue;
    /** Lazily built player-name → hitbox-family map (roster is static). */
    private hitboxTypeByName;
    /** True while hitbox wireframes are showing (cheap per-frame early-out). */
    private hitboxesActive;
    private skipPostGoalTransitionsEnabledValue;
    private skipKickoffsEnabledValue;
    /** True once view-mode/attachment was set through the parity surface. */
    private attachmentTouched;
    private readonly liveGameState;
    private readonly kickoffGameState;
    private timelineSegmentsCacheKey;
    private timelineSegmentsCache;
    constructor(container: HTMLElement, adapter: SubtrActorPlayer, options?: PlayerOptions, replay?: ReplayModel | null);
    get scene(): THREE.Scene;
    get camera(): THREE.PerspectiveCamera;
    get renderer(): THREE.WebGLRenderer;
    get duration(): number;
    /**
     * Switch the skybox environment at runtime. Accepts a built-in id (e.g.
     * `"space"`), a full `PlayerEnvironment` descriptor, or `false` for the
     * neutral default (no skybox). Non-blocking: the HDR swaps in when decoded.
     */
    setEnvironment(spec: PlayerEnvironmentSpec): void;
    private applyEnvironmentSpec;
    play(): void;
    pause(): void;
    togglePlayback(): void;
    seek(time: number): void;
    setPlaybackRate(speed: number): void;
    setLoop(loop: boolean): void;
    /**
     * Switch position interpolation between replay samples (see
     * PlayerOptions.motionInterpolation). Takes effect on the next rendered
     * frame — handy for A/B-ing smoothness live.
     */
    setMotionInterpolation(method: "hermite" | "linear"): void;
    setFrameIndex(frameIndex: number): void;
    stepFrames(delta: number): void;
    stepForwardFrame(): void;
    stepBackwardFrame(): void;
    setCameraDistanceScale(scale: number): void;
    setCustomCameraSettings(settings: CameraSettings | null): void;
    setAttachedPlayer(playerId: string | null): void;
    setCameraViewMode(mode: PlayerCameraViewMode): void;
    setFreeCameraPreset(preset: PlayerFreeCameraPreset, options?: FreeCameraPresetOptions): void;
    /**
     * Force ball cam (`true`) or car cam (`false`), or pass `null` to follow the
     * attached player's recorded ball-cam toggle ("player" view — the default).
     */
    setBallCamEnabled(enabled: boolean | null): void;
    setBoostMeterEnabled(enabled: boolean): void;
    setBoostPickupAnimationEnabled(enabled: boolean): void;
    setHitboxWireframesEnabled(enabled: boolean): void;
    setHitboxOnlyModeEnabled(enabled: boolean): void;
    setSkipPostGoalTransitionsEnabled(enabled: boolean): void;
    setSkipKickoffsEnabled(enabled: boolean): void;
    setState(patch: PlayerStatePatch): void;
    getState(): PlayerState;
    getSnapshot(): PlayerSnapshot;
    getTimelineDuration(): number;
    getTimelineCurrentTime(): number;
    getTimelineSegments(): ReplayPlayerTimelineSegment[];
    projectReplayTimeToTimeline(replayTime: number): ReplayPlayerTimelineProjection;
    projectTimelineTimeToReplay(timelineTime: number): number;
    subscribe(listener: PlayerListener): () => void;
    /** Per-render frame-timing callback (@rlrml/player parity). Returns a remover. */
    onBeforeRender(callback: BeforeRenderCallback): () => void;
    addPlugin(definition: PlayerPluginDefinition): () => void;
    removePlugin(id: string): boolean;
    getPlugins(): PlayerPlugin[];
    destroy(): void;
    dispose(): void;
    private setPlayingInternal;
    private seekInternal;
    /** Where playback stops: the last segment's start if skips run to the end. */
    private getPlaybackEndTime;
    /**
     * Jump past a kickoff countdown when skip-kickoffs is on (@rlrml/player
     * semantics). A skip is a jump, so it routes through seekInternal — that
     * resets the delta-based trackers (ball trail, wheel spin) which must not
     * see it. Returns true when a skip happened.
     */
    private skipPastKickoffIfNeeded;
    /** Same as skipPastKickoffIfNeeded, for post-goal replay/celebration windows. */
    private skipPostGoalTransitionIfNeeded;
    /** The installed camera plugin, when one is present (duck-typed by id). */
    private getCameraPlugin;
    private playerNameForId;
    /**
     * When ball cam has not been manually overridden (`ballCamEnabledValue ===
     * null`), drive the follow camera from the attached player's replay ball-cam
     * state (resolved per-frame onto `entity.isBallCam` by the adapter), matching
     * the core @rlrml/player behavior. A manual `setBallCamEnabled` takes over.
     */
    private applyReplayBallCam;
    /** Push the parity view-mode/attachment onto the camera plugin. */
    private syncCameraAttachment;
    private applyCustomCameraSettings;
    /** Push explicitly-set parity camera state onto an (newly) installed plugin. */
    private pushCameraParityState;
    private applyInitialCameraOptions;
    private computeFrameRenderInfo;
    private installResizeHandling;
    private scheduleAnimationFrame;
    private tick;
    renderFrame(dt?: number): void;
    private render;
    private updateFreeCameraTransition;
    /**
     * Per-player boost / supersonic effect state, ported from the original
     * GameEngine.updateScene(): only update particle emission while playing (so
     * paused frames don't emit at frozen positions), and pass isKickoffReset so
     * the kickoff boost-reset doesn't fire particles. ActorManager resolves the
     * car mesh and forwards to EffectsManager (the stub when `effects: false`).
     */
    private updatePlayerStates;
    /**
     * Drive HitboxManager from the parity display toggles each frame, after
     * ActorManager has applied entity transforms/visibility:
     *
     * - `hitboxWireframesEnabled` — per-car wireframe boxes (color-coded by
     *   family) tracking the live car meshes.
     * - `hitboxOnlyModeEnabled` — wireframes shown AND car bodies hidden
     *   (@rlrml/player semantics). ActorManager re-applies entity visibility on
     *   every updateFromFramework, so simply not hiding next frame recovers.
     */
    private updateHitboxVisualization;
    private installPlugin;
    /**
     * Build the `ReplayScene`-shaped sceneState. `ballMesh`/`playerMeshes` are
     * getters so they track the live actors (GLB model swaps replace the
     * Object3Ds; a snapshot would go stale).
     */
    private createSceneState;
    private createPluginContext;
    private createPluginStateContext;
    private createRenderContext;
    private emitChange;
}
export {};
//# sourceMappingURL=ReplayPlayer.d.ts.map