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
        }>;
    };
    meta: {
        team_zero: RawPlayerInfo[];
        team_one: RawPlayerInfo[];
    };
    boost_pads?: RawResolvedBoostPad[];
    boost_pad_events?: RawBoostPadEvent[];
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
export interface ViewerPlayerInfo {
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
    duration: number;
    playerList: ViewerPlayerInfo[];
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
    private _teams;
    constructor(raw: RawReplayData);
    private _compile;
    /**
     * subtr-actor resolves the standard soccar pad layout (with replay pad ids
     * when known) and emits exact pickup/availability events; fold the events
     * into per-pad timelines so seek() can resolve `isAvailable` at any time.
     */
    private _compileBoostPads;
    private _rbToKeyframe;
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