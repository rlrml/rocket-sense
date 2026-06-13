export class ActorManager {
    constructor(scene: any, effectsManager: any);
    scene: any;
    effectsManager: any;
    actors: {};
    ballActorId: any;
    ballIndicator: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> | null;
    ballVerticalLine: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes, THREE.BufferGeometryEventMap>, THREE.LineBasicMaterial, THREE.Object3DEventMap> | null;
    playerNames: Set<any>;
    actorToPlayer: {};
    actorLinks: {};
    playerNameToCarActorId: {};
    playerNameToPriActorId: {};
    playerTeams: {};
    actorLoadouts: {};
    carBodyIds: {};
    carModelLoader: CarModelLoader;
    pendingCarReplacements: Map<any, any>;
    _p0: THREE.Vector3;
    _p1: THREE.Vector3;
    _v0: THREE.Vector3;
    _v1: THREE.Vector3;
    _nextRot: THREE.Quaternion;
    _q0: THREE.Quaternion;
    _q1: THREE.Quaternion;
    _qResult: THREE.Quaternion;
    onPlayerFound: any;
    lastBallTouchTeam: number;
    BALL_TOUCH_DISTANCE: number;
    ballTimeline: any[];
    playerTimelineMap: {};
    timelineIndices: {
        ball: number;
        players: {};
    };
    interpolantsInitialized: boolean;
    animationMixer: THREE.AnimationMixer | null;
    animationActions: {};
    animationClock: THREE.Clock;
    replayDuration: number;
    useAnimationSystem: boolean;
    SMOOTHING_WINDOW: number;
    positionBuffers: {};
    rotationBuffers: {};
    interpolationEnabled: boolean;
    interpolationMethod: string;
    smoothingWindowSize: number;
    lastFrameInfo: {
        currentFrame: number;
        totalFrames: number;
    } | {
        currentFrame: number;
        totalFrames: number;
    } | null;
    _lowPassState: Map<any, any>;
    _lowPassAlpha: number;
    _predictState: Map<any, any>;
    _predictCorrectionTime: number;
    _smoothingBuffers: Map<any, any>;
    _adaptiveState: Map<any, any>;
    ballModel: THREE.Group<THREE.Object3DEventMap> | null;
    _ballModelReplaced: boolean;
    ballModelReady: Promise<any>;
    /**
     * Wait for ball model to be loaded, then replace the ball mesh if not already done.
     * This should be called BEFORE shader compilation to ensure all meshes are ready.
     * @returns {Promise<boolean>} - true if loaded successfully, false otherwise
     */
    waitForBallModel(): Promise<boolean>;
    replaceBallWithModel(actorId: any): void;
    reset(): void;
    setPlayerTeams(teams: any): void;
    /**
     * Initialize actors from framework Player API (static mesh creation)
     * This replaces the old processFrame approach - meshes are created once at load time
     * @param {Player} player - Framework Player instance
     */
    initFromFramework(player: Player): void;
    /**
     * Initialize interpolation system with timeline data
     * Uses Three.js AnimationMixer for smooth playback (handles variable frame deltas correctly)
     * @param {Object} timelines - { ballTimeline, playerTimelines } from framework
     */
    initInterpolants(timelines: Object): void;
    ballTimelineCorrected: any[] | undefined;
    playerTimelineMapCorrected: {} | undefined;
    ballTimelineFiltered: any[] | undefined;
    playerTimelineMapFiltered: {} | undefined;
    timelineIndicesFiltered: {
        ball: number;
        players: {};
    } | undefined;
    timelineIndicesCorrected: {
        ball: number;
        players: {};
    } | undefined;
    /**
     * Initialize Three.js AnimationMixer and create KeyframeTracks for all entities
     * This is the recommended approach for smooth replay playback with variable frame deltas
     */
    _initAnimationSystem(): void;
    /**
     * Create a Three.js AnimationClip from timeline data
     * @param {string} name - Clip name
     * @param {Array} timeline - Array of {time, position, rotation, velocity}
     * @param {THREE.Object3D} target - Target mesh
     * @returns {THREE.AnimationClip|null}
     */
    _createAnimationClip(name: string, timeline: any[], target: THREE.Object3D): THREE.AnimationClip | null;
    /**
     * Start all animations (call when replay starts playing)
     */
    startAnimations(): void;
    /**
     * Pause all animations
     */
    pauseAnimations(): void;
    /**
     * Resume animations
     */
    resumeAnimations(): void;
    /**
     * Seek animations to a specific time
     * @param {number} time - Time in seconds
     */
    seekAnimations(time: number): void;
    /**
     * Update the animation mixer (call every frame)
     * @param {number} delta - Time delta in seconds
     */
    updateAnimations(delta: number): void;
    /**
     * Sub-sample a timeline by taking every 2nd keyframe
     * This reduces the alternating acceleration pattern caused by
     * what appears to be two interleaved update sources in the replay
     * @param {Array} timeline - Original timeline array
     * @returns {Array} Sub-sampled timeline (half the keyframes)
     */
    _subsampleTimeline(timeline: any[]): any[];
    /**
     * Initialize or get a smoothing buffer for an entity
     * @param {string} entityId - Entity identifier (ball or player name)
     * @returns {Object} Buffer object with { positions: [], rotations: [] }
     */
    _getOrCreateSmoothingBuffer(entityId: string): Object;
    /**
     * Add a position to the smoothing buffer and return smoothed position
     * Uses moving average over SMOOTHING_WINDOW frames
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position {x, y, z}
     */
    _smoothPosition(entityId: string, pos: Object): Object;
    /**
     * Add a rotation to the smoothing buffer and return smoothed rotation
     * Uses SLERP-based averaging
     * @param {string} entityId - Entity identifier
     * @param {Object} rot - Rotation quaternion {x, y, z, w}
     * @returns {Object} Smoothed rotation {x, y, z, w}
     */
    _smoothRotation(entityId: string, rot: Object): Object;
    /**
     * Reset smoothing buffers (call when seeking)
     */
    resetSmoothingBuffers(): void;
    /**
     * Find the keyframe index for a given time using cached binary search
     * @param {Array} timeline - Timeline array with {time} entries
     * @param {number} time - Current time
     * @param {number} lastIndex - Last known index (for cache)
     * @returns {number} Index of the keyframe just before or at time
     */
    _findKeyframeIndex(timeline: any[], time: number, lastIndex?: number): number;
    /**
     * Apply smoothing filter to a position (moving average)
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position
     */
    _applySmoothing(entityId: string, pos: Object): Object;
    /**
     * Apply exponential moving average (EMA) smoothing
     * Less latency than simple moving average, weights recent values more
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position
     */
    _applyEmaSmoothing(entityId: string, pos: Object): Object;
    /**
     * Apply double exponential smoothing (Holt's method)
     * Predicts trend and reduces lag while maintaining smoothness
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position
     */
    _applyDoubleEmaSmoothing(entityId: string, pos: Object): Object;
    /**
     * Apply weighted moving average (recent frames count more)
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position
     */
    _applyWeightedSmoothing(entityId: string, pos: Object): Object;
    /**
     * Apply Gaussian-weighted smoothing (bell curve weights)
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position
     */
    _applyGaussianSmoothing(entityId: string, pos: Object): Object;
    /**
     * Adaptive smoothing based on derived velocity from position differences
     * This method adapts the smoothing level based on actual movement:
     * - Slow movement: more smoothing (reduces micro-jitter)
     * - Fast movement: less smoothing (maintains responsiveness)
     * - Direction changes: reduces buffer to avoid lag
     *
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @param {number} time - Current playback time
     * @returns {Object} Smoothed position
     */
    _applyAdaptiveSmoothing(entityId: string, pos: Object, time: number): Object;
    /**
     * One Euro Filter - adaptive filter that's smooth at low speeds, responsive at high speeds
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Position {x, y, z}
     * @returns {Object} Smoothed position
     */
    _applyOneEuroFilter(entityId: string, pos: Object): Object;
    /**
     * Helper for One Euro Filter - calculate smoothing factor
     */
    _oneEuroAlpha(dt: any, cutoff: any): number;
    /**
     * Catmull-Rom spline interpolation (uses 4 keyframes)
     */
    _catmullRomInterpolate(p0: any, p1: any, p2: any, p3: any, t: any): {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Apply low-pass filter to smooth positions
     * This filters out high-frequency noise/jitter from the replay data
     * @param {string} entityId - Entity identifier
     * @param {Object} pos - Raw interpolated position {x, y, z}
     * @returns {Object} Filtered position {x, y, z}
     */
    _applyLowPassFilter(entityId: string, pos: Object): Object;
    /**
     * Calculate derived velocity from position differences
     * This ignores the replay's velocity data and computes velocity from positions
     * @param {Object} p0 - Previous position {x, y, z}
     * @param {Object} p1 - Current position {x, y, z}
     * @param {number} dt - Time delta between positions (seconds)
     * @returns {Object} Derived velocity {x, y, z}
     */
    _deriveVelocity(p0: Object, p1: Object, dt: number): Object;
    /**
     * Predict-Correct interpolation (dead reckoning)
     * Instead of interpolating between keyframes, we:
     * 1. Predict position using velocity: P_predicted = P0 + V0 * elapsed
     * 2. When approaching next keyframe, smoothly correct towards it
     *
     * This creates smoother motion because it follows physics instead of
     * interpolating between potentially inconsistent position snapshots.
     *
     * @param {string} entityId - Entity identifier
     * @param {Object} k0 - Start keyframe {position, velocity, time}
     * @param {Object} k1 - End keyframe {position, velocity, time}
     * @param {number} currentTime - Current playback time
     * @returns {Object} Predicted/corrected position {x, y, z}
     */
    _predictCorrectInterpolate(entityId: string, k0: Object, k1: Object, currentTime: number): Object;
    /**
     * Velocity-based interpolation with clamped correction to avoid jitter
     * This method follows the velocity data but limits how fast corrections are applied
     * to prevent sudden acceleration/deceleration when keyframes are far apart.
     *
     * @param {string} entityId - Entity identifier for state tracking
     * @param {Object} k0 - Start keyframe {position, velocity, time}
     * @param {Object} k1 - End keyframe {position, velocity, time}
     * @param {number} currentTime - Current playback time
     * @param {boolean} isBall - Whether this is the ball (applies gravity)
     * @returns {Object} Interpolated position {x, y, z}
     */
    _velocitySmoothInterpolate(entityId: string, k0: Object, k1: Object, currentTime: number, isBall?: boolean): Object;
    /**
     * Physics-tick-aware interpolation
     *
     * The problem: Rocket League replays have positions captured at alternating
     * 5 or 6 physics ticks (120Hz), but timestamps suggest ~46ms intervals.
     * This causes ±10% speed oscillation when interpolating between positions.
     *
     * The solution: Use VELOCITY for movement (which is consistent), not positions.
     * Move at the reported velocity, then smoothly correct to hit the next keyframe.
     *
     * @param {Object} k0 - Start keyframe {position, velocity, time}
     * @param {Object} k1 - End keyframe {position, velocity, time}
     * @param {number} currentTime - Current playback time
     * @returns {Object} Interpolated position {x, y, z}
     */
    _physicsTickInterpolate(k0: Object, k1: Object, currentTime: number): Object;
    /**
     * Velocity-only interpolation (experimental)
     *
     * Uses ONLY velocity data, completely ignoring position keyframes.
     * This produces the smoothest possible motion but will drift from
     * the actual recorded positions over time.
     *
     * Best for visual quality when exact position accuracy is not critical.
     */
    _velocityOnlyInterpolate(k0: any, k1: any, currentTime: any): {
        x: any;
        y: any;
        z: any;
    };
    /**
     * Smart hybrid interpolation
     *
     * Automatically detects collisions/impacts and switches interpolation method:
     * - COLLISION: Velocity direction or magnitude changes significantly
     *   → Use position lerp (velocity is unreliable mid-interval)
     * - NORMAL: Velocity is consistent
     *   → Use velocity-based interpolation (smoother, more accurate)
     *
     * This addresses the core issue: replay data contains collision frames where
     * the velocity changes during the interval, making velocity-based interpolation
     * produce incorrect results.
     */
    _smartHybridInterpolate(k0: any, k1: any, currentTime: any): {
        x: any;
        y: any;
        z: any;
    };
    /**
     * Check if a keyframe transition has a "bad" ratio (time-shifted position)
     * Bad frames have distance ratio ~0.25, 0.50 (position recorded at wrong time)
     *
     * @param {Object} k0 - Start keyframe
     * @param {Object} k1 - End keyframe
     * @returns {boolean} True if this is a bad frame that should be skipped
     */
    _isBadFrame(k0: Object, k1: Object): boolean;
    /**
     * Filter out bad frames from a timeline
     * Bad frames have position recorded at wrong time (ratio ~0.25 or ~0.50)
     *
     * @param {Array} timeline - Array of keyframes
     * @returns {Array} Filtered timeline without bad frames
     */
    _filterBadFrames(timeline: any[]): any[];
    /**
     * Correct time-shifted positions in a timeline
     *
     * Based on Rocket League's 120Hz physics / 30Hz recording:
     * - When ratio ≈ 0.25: position was recorded after 1/4 of the interval
     * - When ratio ≈ 0.50: position was recorded after 1/2 of the interval
     * - When ratio ≈ 0.75: position was recorded after 3/4 of the interval
     *
     * This function extrapolates each time-shifted position to where it
     * SHOULD have been at the actual frame time, using velocity.
     *
     * @param {Array} timeline - Array of keyframes
     * @returns {Array} Timeline with corrected positions
     */
    _correctTimeShiftedPositions(timeline: any[]): any[];
    /**
     * Time-Shifted Interpolation
     * Now uses pre-filtered timeline, so this is just lerp
     */
    _timeShiftedInterpolate(k0: any, k1: any, currentTime: any): {
        x: any;
        y: any;
        z: any;
    };
    /**
     * Velocity-Anchored Interpolation
     *
     * Uses ONLY velocity for smooth motion, but periodically "anchors" to
     * a known-good position to prevent drift. This gives smooth constant-speed
     * motion while staying accurate over time.
     *
     * The key insight: positions in replay data are unreliable (62% have wrong ratio),
     * but velocities are consistent. We trust velocity for motion, position for anchoring.
     *
     * @param {string} entityId - Unique ID for state tracking
     * @param {Object} k0 - Start keyframe
     * @param {Object} k1 - End keyframe
     * @param {number} currentTime - Current time
     * @param {Array} timeline - Full timeline for anchor lookup
     * @param {number} currentIdx - Current index in timeline
     */
    _velocityAnchoredInterpolate(entityId: string, k0: Object, k1: Object, currentTime: number, timeline: any[], currentIdx: number): {
        x: any;
        y: any;
        z: any;
    };
    _velocityAnchorState: Map<any, any> | undefined;
    /**
     * Hermite Spline interpolation
     *
     * Uses cubic Hermite splines which are C1-continuous (smooth in both
     * position and velocity). This creates a curve that:
     * - Passes exactly through keyframe positions
     * - Has tangents matching the reported velocities
     * - Creates natural, smooth motion without visible jitter
     *
     * The Hermite basis functions:
     * h00(t) = 2t³ - 3t² + 1     (start position weight)
     * h10(t) = t³ - 2t² + t      (start tangent weight)
     * h01(t) = -2t³ + 3t²        (end position weight)
     * h11(t) = t³ - t²           (end tangent weight)
     *
     * Position = h00*p0 + h10*m0 + h01*p1 + h11*m1
     * where m0, m1 are the tangents (velocity * dt)
     *
     * @param {Object} k0 - Start keyframe {position, velocity, time}
     * @param {Object} k1 - End keyframe {position, velocity, time}
     * @param {number} currentTime - Current playback time
     * @returns {Object} Interpolated position {x, y, z}
     */
    _hermiteInterpolate(k0: Object, k1: Object, currentTime: number): Object;
    /**
     * Physics Simulation Interpolation (RocketSim-based)
     *
     * Based on Rocket League's actual physics from RocketSim:
     * - Physics runs at 120Hz (120 ticks per second)
     * - Replays record at 30Hz (4 physics ticks per frame)
     * - Gravity: -650 UU/s² (Z axis in RL coordinates = Y in Three.js)
     * - Ball max speed: 6000 UU/s
     * - Car max speed: 2300 UU/s
     *
     * The key insight: velocities are accurate, positions may be time-shifted.
     * We use Hermite interpolation which respects both position AND velocity
     * constraints, creating a physically plausible trajectory.
     *
     * @param {Object} k0 - Start keyframe {position, velocity, time}
     * @param {Object} k1 - End keyframe {position, velocity, time}
     * @param {number} currentTime - Current playback time
     * @param {boolean} isBall - Whether this is the ball (applies gravity)
     * @returns {Object} Interpolated position {x, y, z}
     */
    _physicsSimInterpolate(k0: Object, k1: Object, currentTime: number, isBall?: boolean): Object;
    /**
     * Get interpolated position for ball at given time
     * Supports multiple interpolation methods:
     * - 'lerp': Linear interpolation (default)
     * - 'lerp-smooth': Linear + moving average smoothing
     * - 'catmull-rom': Catmull-Rom spline (uses 4 keyframes)
     *
     * @param {number} time - Current time
     * @returns {Object|null} Interpolated position or null
     */
    getBallPositionAt(time: number): Object | null;
    /**
     * Get interpolated rotation for ball at given time
     * Uses angular velocity for physics-based rotation when available
     * @param {number} time - Current time
     * @returns {Object|null} Interpolated rotation quaternion or null
     */
    getBallRotationAt(time: number): Object | null;
    /**
     * Get interpolated position for player at given time
     * Supports multiple interpolation methods (same as ball)
     *
     * @param {string} playerName - Player name
     * @param {number} time - Current time
     * @returns {Object|null} Interpolated position or null
     */
    getPlayerPositionAt(playerName: string, time: number): Object | null;
    /**
     * Get interpolated rotation for player at given time (slerp)
     * @param {string} playerName - Player name
     * @param {number} time - Current time
     * @returns {Object|null} Interpolated rotation quaternion or null
     */
    getPlayerRotationAt(playerName: string, time: number): Object | null;
    /**
     * Create the ball mesh
     */
    _createBallMesh(): void;
    /**
     * Create a car mesh for a player
     * @param {string} playerName - Player name
     * @param {number} team - Team (0 = blue, 1 = orange)
     * @param {number} index - Player index (used as actor ID)
     * @param {Object} loadout - Player's TeamLoadout (optional)
     */
    _createCarMesh(playerName: string, team: number, index: number, carName: any, hitboxType: any): void;
    /**
     * Update all actors from framework state
     * When useAnimationSystem=true, the AnimationMixer handles position/rotation
     * This method still updates userData and visual effects
     * @param {Player} player - Framework Player instance
     * @param {number} currentTime - Current playback time (for interpolation)
     */
    updateFromFramework(player: Player, currentTime: number): void;
    /**
     * Process a network frame for mesh lifecycle management
     * @deprecated Use initFromFramework() and updateFromFramework() instead
     * @param {Object} frame - Network frame
     * @param {Function} getObjectName - Function to get object name by ID (objectId => name)
     * @param {number} frameIndex - Frame index
     * @param {boolean} isSeeking - Whether we're seeking (skip some effects)
     */
    processFrame(frame: Object, getObjectName: Function, frameIndex: number, isSeeking: boolean): void;
    resolveBodyId(mesh: any, actorId: any): void;
    updateCarHitbox(mesh: any, bodyId: any, actorId: any): void;
    /**
     * Replace a car's BoxGeometry with a loaded FBX model
     */
    replaceCarWithModel(actorId: any, oldMesh: any, carName: any, hitboxType: any): Promise<void>;
    _doCarReplacement(actorId: any, oldMesh: any, carName: any, hitboxType: any): void;
    checkCarPlayerLink(priActorId: any, carActorId: any): void;
    updateInterpolation(time: any, frames: any, targetFrameIndex: any): void;
    /**
     * Update boost state for a player
     * @param {string} playerName - Player name
     * @param {boolean} isBoosting - Whether player is actively boosting
     * @param {boolean} isKickoffReset - Whether boost was reset during kickoff (skip particles)
     */
    updateBoostState(playerName: string, isBoosting: boolean, isKickoffReset?: boolean): void;
    _warnedNoCarId: boolean | undefined;
    /**
     * Update player steering value from framework
     * @param {string} playerName - Player name
     * @param {number} steer - Normalized steering value (-1 to 1)
     */
    updatePlayerSteer(playerName: string, steer: number): void;
    /**
     * Update wheel rotations for all cars based on actual distance traveled
     * This method uses position delta instead of velocity * time to ensure
     * wheel rotation matches visual movement at any playback speed
     * - Wheel_XX_Y: rotates around local Y for rolling (spin)
     * - Wheel_XX_Z: rotates around local Z for steering (front wheels only)
     */
    updateWheelRotations(): void;
    _wheelDebugCounter: number | undefined;
    _previousCarPositions: Map<any, any> | undefined;
    /**
     * Reset wheel rotation tracking (call when seeking)
     */
    resetWheelTracking(): void;
    updateSupersonicState(playerName: any, isSupersonic: any, team: any): void;
    /**
     * Enable or disable interpolation (for debugging)
     * When disabled, shows raw frame data without interpolation
     */
    setInterpolationEnabled(enabled: any): void;
    /**
     * Set interpolation method
     * @param {string} method - Interpolation method name
     */
    setInterpolationMethod(method: string): void;
    /**
     * Set smoothing window size (for lerp-smooth method)
     * @param {number} size - Window size (1-20)
     */
    setSmoothingWindowSize(size: number): void;
    /**
     * Get current interpolation settings
     */
    getInterpolationSettings(): {
        enabled: boolean;
        method: string;
        smoothingWindowSize: number;
    };
    /**
     * Clear all smoothing buffers (call when seeking or changing settings)
     */
    clearSmoothingBuffers(): void;
    /**
     * Get current frame info for debug panel
     */
    getFrameInfo(): {
        currentFrame: number;
        totalFrames: number;
    } | {
        currentFrame: number;
        totalFrames: number;
    } | null;
    /**
     * Create ball mesh for live mode
     * Returns the ball mesh directly instead of storing it
     * @returns {THREE.Mesh} The ball mesh
     */
    createBallMeshForLive(): THREE.Mesh;
    /**
     * Create car mesh for live mode
     * Returns the car mesh directly
     * @param {number} team - Team (0 = blue, 1 = orange)
     * @param {number} playerIndex - Player index for unique identification
     * @param {string} playerName - Player name
     * @param {number|null} bodyId - Car body ID (e.g., 23=Octane, 403=Fennec)
     * @returns {THREE.Mesh} The car mesh
     */
    createCarMeshForLive(team: number, playerIndex: number, playerName: string, bodyId?: number | null): THREE.Mesh;
    /**
     * Update boost particles for live mode car
     * IMPORTANT: Checks BOTH isBoosting AND boost > 0
     * (isBoosting is input, need amount > 0 to emit particles)
     * @param {string} actorId - Car actor ID
     * @param {boolean} isBoosting - Input state
     * @param {number} boostAmount - Current boost amount (0-100)
     * @param {THREE.Mesh} mesh - Car mesh
     */
    updateBoostParticlesLive(actorId: string, isBoosting: boolean, boostAmount: number, mesh: THREE.Mesh): void;
    /**
     * Update supersonic trail for live mode car
     * @param {string} actorId - Car actor ID
     * @param {boolean} isSupersonic - Whether car is supersonic (speed > 2200)
     * @param {number} team - Team number (0 or 1)
     * @param {THREE.Mesh} mesh - Car mesh
     */
    updateSupersonicTrailLive(actorId: string, isSupersonic: boolean, team: number, mesh: THREE.Mesh): void;
    /**
     * Remove a live mode car
     * @param {string} actorId - Car actor ID
     */
    removeLiveCar(actorId: string): void;
    /**
     * Remove live mode ball
     * @param {THREE.Mesh} ballMesh - Ball mesh to remove
     */
    removeLiveBall(ballMesh: THREE.Mesh): void;
}
import * as THREE from "three";
import { CarModelLoader } from "./CarModelLoader.js";
//# sourceMappingURL=ActorManager.d.ts.map