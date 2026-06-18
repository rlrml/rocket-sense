/**
 * SubtrActorPlayer — a `Player`-compatible facade backed by subtr-actor.
 *
 * Ballcam's three.js renderer (GameEngine + managers) only ever talks to one
 * object: the `Player` from framework/dist/Player.js. This class implements the
 * subset of that interface the renderer actually reads (see INTEGRATION.md), but
 * sourced from subtr-actor's raw ReplayData instead of ballcam's JS boxcars
 * compilers.
 *
 * Two data channels feed the renderer (confirmed in ActorManager.updateFromFramework):
 *   1. getTimelines()  -> { ballTimeline, playerTimelines } — drives smooth
 *      position/rotation interpolation (PRIMARY motion source).
 *   2. live entities (ball, getAllPlayers()) — updated on seek(); supply
 *      velocity / sleeping / visible / boost each frame.
 *
 * v0 scope: ball + cars move correctly. Analytics getters are stubbed empty;
 * game-phase / gap-removal / boost-pad polish are deferred (see INTEGRATION.md).
 */
import EventEmitter from "../util/EventEmitter.js";
import { type Vec3, type Quat } from "./coords.js";
interface RawRigidBody {
    sleeping?: boolean;
    location: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    linear_velocity?: {
        x: number;
        y: number;
        z: number;
    } | null;
    angular_velocity?: {
        x: number;
        y: number;
        z: number;
    } | null;
}
type RawBallFrame = "Empty" | {
    Data: {
        rigid_body: RawRigidBody;
    };
};
type RawPlayerFrame = "Empty" | {
    Data: {
        rigid_body: RawRigidBody;
        boost_amount: number;
        boost_active: boolean;
        player_name: string | null;
        team: number | null;
        is_team_0: boolean | null;
        camera?: {
            pitch?: number | null;
            yaw?: number | null;
        };
        input?: {
            throttle?: number | null;
            steer?: number | null;
            dodge_impulse?: [number, number, number] | null;
            dodge_torque?: [number, number, number] | null;
        };
    };
};
type RawBoostPadEventKind = "Available" | {
    PickedUp: {
        sequence: number;
    };
};
interface RawBoostPadEvent {
    time: number;
    frame: number;
    pad_id: string;
    kind: RawBoostPadEventKind;
}
interface RawResolvedBoostPad {
    index: number;
    pad_id: string | null;
    size: "Big" | "Small";
    position: {
        x: number;
        y: number;
        z: number;
    };
}
interface RawReplayData {
    frame_data: {
        ball_data: {
            frames: RawBallFrame[];
        };
        players: Array<[unknown, {
            frames: RawPlayerFrame[];
        }]>;
        metadata_frames: Array<{
            time: number;
            seconds_remaining: number;
            replicated_game_state_name?: number;
            replicated_game_state_time_remaining?: number;
        }>;
    };
    meta: {
        team_zero: RawPlayerInfo[];
        team_one: RawPlayerInfo[];
    };
    boost_pads?: RawResolvedBoostPad[];
    boost_pad_events?: RawBoostPadEvent[];
    goal_events?: Array<{
        time: number;
        frame: number;
    }>;
    player_camera_events?: Array<[
        unknown,
        Array<{
            frame: number;
            ball_cam_active: boolean | null;
            behind_view_active: boolean | null;
            driving: boolean | null;
        }>
    ]>;
}
interface RawPlayerInfo {
    remote_id: unknown;
    name: string;
    car_body_id?: number | null;
    car_body_name?: string | null;
    car_hitbox_family?: string | null;
    camera_settings?: RawCameraSettings | null;
}
/** subtr-actor's PlayerCameraSettings (snake_case, RL menu units). */
interface RawCameraSettings {
    fov: number;
    height: number;
    angle: number;
    distance: number;
    stiffness: number;
    swivel_speed: number;
    transition_speed?: number | null;
}
export interface MotionKeyframe {
    time: number;
    frame: number;
    position: Vec3;
    rotation: Quat | null;
    velocity: Vec3;
    angularVelocity?: Vec3 | null;
    sleeping: boolean;
}
export interface ReplayPlayerInfo {
    /** Stable player id derived from the replay's remote id (Steam/Epic/…). */
    id: string;
    name: string;
    team: number;
    carName: string;
    hitboxType: string;
    loadout?: undefined;
    /** The player's recorded RL camera preset, when the replay carries one. */
    cameraSettings: RecordedCameraSettings | null;
}
/**
 * A player's recorded Rocket League camera preset (in-game menu units; `fov`
 * is the HORIZONTAL field of view). Key names match the camera plugin's
 * `CameraSettings` so a recorded preset can be applied directly.
 */
export interface RecordedCameraSettings {
    fov: number;
    height: number;
    angle: number;
    distance: number;
    stiffness: number;
    swivelSpeed: number;
    transitionSpeed?: number;
}
export interface SubtrActorPlayerOptions {
    /**
     * Preprocess compiled ball/player timelines with the same style of
     * velocity-based correction Ballcam applies before serializing its replay
     * artifact. Defaults to true; set false for raw sample inspection.
     */
    motionSmoothing?: boolean;
    /** Blend toward the measured replay sample during velocity correction. */
    smoothingBlendFactor?: number;
    /** Every N corrected samples, use a stronger measured-sample anchor. */
    smoothingAnchorInterval?: number;
    /**
     * Remove pre-kickoff idle time and post-goal replay gaps from the adapter's
     * motion timelines, matching Ballcam's compiled .rlrf time axis. Defaults to
     * false because it intentionally diverges from @rlrml/player's raw normalized
     * ReplayModel time axis.
     */
    timelineCompaction?: boolean;
    /** Skip Ballcam-style velocity/position consistency filtering. */
    disableFrameFiltering?: boolean;
}
/** Live mutable entity read by the renderer each frame after seek(). */
declare class BallEntity {
    position: Vec3;
    rotation: Quat;
    velocity: Vec3;
    angularVelocity: Vec3;
    sleeping: boolean;
    visible: boolean;
}
/**
 * Boost pad in the exact shape the original GameEngine read off framework's
 * Player.boostPads: position in raw Unreal coords (the renderer does its own
 * Y/Z swap at the mesh level) + live `isAvailable` updated on seek().
 */
export declare class BoostPadEntity {
    isBig: boolean;
    /** Unreal coords: x, y = along field length, z = height. */
    position: Vec3;
    /** Sorted availability timeline compiled from boost_pad_events. */
    events: Array<{
        time: number;
        available: boolean;
    }>;
    isAvailable: boolean;
    constructor(isBig: boolean, 
    /** Unreal coords: x, y = along field length, z = height. */
    position: Vec3, 
    /** Sorted availability timeline compiled from boost_pad_events. */
    events: Array<{
        time: number;
        available: boolean;
    }>);
}
declare class PlayerEntity extends EventEmitter {
    /** Stable player id derived from the replay's remote id. */
    id: string;
    name: string;
    team: number;
    carName: string;
    hitboxType: string;
    /** The player's recorded RL camera preset, when the replay carries one. */
    cameraSettings: RecordedCameraSettings | null;
    position: Vec3;
    rotation: Quat;
    velocity: Vec3;
    angularVelocity: Vec3;
    sleeping: boolean;
    steer: number;
    boost: number;
    isBoosting: boolean;
    isSupersonic: boolean;
    /** True while boost is being reset for a kickoff (suppresses boost particles). */
    isKickoffReset: boolean;
    isVisible: boolean;
    isBallCam: boolean;
    constructor(
    /** Stable player id derived from the replay's remote id. */
    id: string, name: string, team: number, carName: string, hitboxType: string, 
    /** The player's recorded RL camera preset, when the replay carries one. */
    cameraSettings?: RecordedCameraSettings | null);
}
export declare class SubtrActorPlayer extends EventEmitter {
    private raw;
    private options;
    duration: number;
    playerList: ReplayPlayerInfo[];
    /** Monotonic per-frame timestamps (s) — the replay's frame timeline. */
    frameTimes: number[];
    /**
     * The raw replay clock value at the first frame. All adapter times (frame
     * timeline, boost-pad events, duration) are shifted by this so t=0 is the
     * first frame — matching @rlrml/player's ReplayModel time axis exactly.
     */
    rawStartTime: number;
    ball: BallEntity;
    players: Map<string, PlayerEntity>;
    boostPads: Map<number, BoostPadEntity>;
    private _currentTime;
    private _ballTimeline;
    private _playerTimelines;
    private _ballFlags;
    private _playerFlags;
    /** Coalesced ball-cam change timeline per player name (last-before on seek). */
    private _playerCameraEvents;
    private _teams;
    private _timelineCompaction;
    constructor(raw: RawReplayData, options?: SubtrActorPlayerOptions);
    private _compile;
    private _timelineProcessingOptions;
    private _preprocessMotionTimelines;
    private _applyTimelineCompaction;
    private _buildTimelineCompaction;
    private _detectPostGoalTimeGaps;
    private _detectFirstKickoffGoTime;
    private _compactTimeline;
    private _remapReplayGaps;
    private _remapPrematch;
    private _compactTime;
    private _applyVelocityBasedPositionCorrection;
    private _filterInconsistentFrames;
    private _filterInconsistentTimeline;
    /**
     * subtr-actor resolves the standard soccar pad layout (with replay pad ids
     * when known) and emits exact pickup/availability events; fold the events
     * into per-pad timelines so seek() can resolve `isAvailable` at any time.
     */
    private _compileBoostPads;
    private _rbToKeyframe;
    private _isRemovedByTimelineCompaction;
    private _idKey;
    getTimelines(): {
        ballTimeline: MotionKeyframe[];
        playerTimelines: Record<string, MotionKeyframe[]>;
    };
    get currentTime(): number;
    seek(time: number): void;
    private _updateEntities;
    /** Index of the last frame at or before `time` (binary search over frameTimes). */
    frameIndexAt(time: number): number;
    getBall(): BallEntity;
    getPlayer(name: string): PlayerEntity | undefined;
    getPlayerById(id: string): PlayerEntity | undefined;
    getAllPlayers(): PlayerEntity[];
    getPlayerTeams(): Record<string, number>;
    getGameTimeMap(): unknown[];
    getCountdownEvents(): unknown[];
    getPlayerStatsTimelines(): Record<string, unknown[]>;
    getGameEventTimeline(): unknown[];
    getAdvancedStats(): null;
    getEvents(): unknown[];
    getEventsInRange(): unknown[];
    getTextOverlaysAt(): unknown[];
    getGamePhaseAt(): null;
}
export {};
//# sourceMappingURL=SubtrActorPlayer.d.ts.map