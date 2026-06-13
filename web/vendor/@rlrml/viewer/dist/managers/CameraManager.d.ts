export class CameraManager {
    constructor(camera: any, domElement: any);
    camera: any;
    domElement: any;
    controls: CameraControls;
    minHeight: number;
    mode: string;
    defaultFreecamPosition: THREE.Vector3;
    defaultFreecamLookAt: THREE.Vector3;
    onPointerLockStateChange: ((isLocked: boolean) => void) | null;
    targetCar: any;
    targetBall: any;
    followDistance: number;
    followHeight: number;
    followAngle: number;
    stiffness: number;
    swivelSpeed: number;
    currentBlend: number;
    targetBlend: number;
    transitionSpeed: number;
    baseDuration: number;
    lastIsBallCam: any;
    currentCamPos: THREE.Vector3 | null;
    currentLookTarget: THREE.Vector3 | null;
    _tempQuatCarCam: THREE.Quaternion;
    _tempQuatBallCam: THREE.Quaternion;
    _tempMatrix: THREE.Matrix4;
    isFollowingViewer: boolean;
    followTargetPosition: THREE.Vector3;
    followTargetQuaternion: THREE.Quaternion;
    followPositionLerpFactor: number;
    followRotationSlerpFactor: number;
    hasFollowTarget: boolean;
    isRightMouseDown: boolean;
    lastMouseX: any;
    lastMouseY: any;
    savedCameraState: any;
    isInReplayMode: boolean;
    /**
     * Set camera mode
     * @param {'free' | 'ball' | 'ballOrbit' | 'car'} mode
     */
    setMode(mode: "free" | "ball" | "ballOrbit" | "car"): void;
    lastBallOrbitPos: any;
    ballOrbitScrollHandler: ((e: any) => void) | undefined;
    freeCamKeys: {
        forward: boolean;
        backward: boolean;
        left: boolean;
        right: boolean;
        up: boolean;
        down: boolean;
    } | undefined;
    freeCamSpeed: number | undefined;
    freeCamRotation: {
        yaw: number;
        pitch: number;
    } | undefined;
    onKeyDown: ((e: any) => void) | undefined;
    onKeyUp: ((e: any) => void) | undefined;
    onMouseMove: ((e: any) => void) | undefined;
    onMouseDown: ((e: any) => void) | undefined;
    onMouseUp: ((e: any) => void) | undefined;
    onPointerLockChange: (() => void) | undefined;
    onMouseLeave: (() => void) | undefined;
    onWindowBlur: (() => void) | undefined;
    onVisibilityChange: (() => void) | undefined;
    /**
     * Set target car mesh to follow
     */
    setTargetCar(carMesh: any): void;
    currentBallCamAngle: any;
    /**
     * Set target ball mesh
     */
    setTargetBall(ballMesh: any): void;
    /**
     * Handle keydown for free camera
     */
    handleFreeCamKeyDown(e: any): void;
    /**
     * Handle keyup for free camera
     */
    handleFreeCamKeyUp(e: any): void;
    /**
     * Handle mouse movement for free camera look (right-click drag style with pointer lock)
     */
    handleFreeCamMouseMove(e: any): void;
    /**
     * Update free camera movement
     */
    updateFreeCam(delta: any): void;
    /**
     * Update camera - call every frame
     * @param {number} delta - Time since last frame in seconds
     * @param {boolean} isBallCam - Whether to use ball cam or car cam
     */
    update(delta: number, isBallCam?: boolean): void;
    smoothedCarYaw: any;
    _smoothedCamPos: any;
    _smoothedCamQuat: any;
    /**
     * Calculate ball cam position and look target
     * Camera positioned so that both car and ball are visible
     * When ball is higher than car, camera goes lower to keep both in frame
     */
    calculateBallCamPosition(carPos: any, carQuaternion: any, delta?: number): {
        cameraPos: any;
        lookTarget: THREE.Vector3;
    };
    /**
     * Calculate car cam position and look target
     * Uses velocity-based direction when car is airborne/flipping
     */
    calculateCarCamPosition(carPos: any, carQuaternion: any, delta?: number): {
        cameraPos: THREE.Vector3;
        lookTarget: THREE.Vector3;
    };
    lastCarPos: any;
    /**
     * Enforce minimum camera height
     */
    enforceMinHeight(): void;
    /**
     * Instantly move camera to position (no transition)
     */
    setPosition(x: any, y: any, z: any): void;
    /**
     * Instantly set camera look target (no transition)
     */
    setTarget(x: any, y: any, z: any): void;
    /**
     * Smoothly move camera to position and target
     */
    moveTo(posX: any, posY: any, posZ: any, targetX: any, targetY: any, targetZ: any, smooth?: boolean): void;
    /**
     * Set transition smoothness
     * @param {number} time - Smooth time in seconds (lower = faster)
     */
    setSmoothTime(time: number): void;
    /**
     * Set all camera follow settings (matching Rocket League camera options)
     * @param {Object} settings - Camera settings object
     * @param {number} settings.distance - Distance behind car (100-400 UU)
     * @param {number} settings.height - Height above car (40-200 UU)
     * @param {number} settings.angle - Pitch angle in degrees (-15 to 0)
     * @param {number} settings.stiffness - Camera stiffness (0.0-1.0)
     * @param {number} settings.swivelSpeed - Rotation speed (1.0-10.0)
     * @param {number} settings.transitionSpeed - Ball cam transition speed (1.0-2.0)
     */
    setFollowSettings(settings: {
        distance: number;
        height: number;
        angle: number;
        stiffness: number;
        swivelSpeed: number;
        transitionSpeed: number;
    }): void;
    /**
     * Save current camera state before entering replay mode
     * This captures everything needed to restore the exact camera position
     */
    saveCameraState(): void;
    /**
     * Restore camera state after exiting replay mode
     * Returns the saved mode and target car index so the caller can restore
     */
    restoreCameraState(): {
        mode: any;
        targetCarIndex: any;
    } | null;
    /**
     * Enter replay mode - saves camera state before switching
     */
    enterReplayMode(): void;
    /**
     * Exit replay mode - restores the previous camera state
     * @returns {Object|null} The saved camera state info
     */
    exitReplayMode(): Object | null;
    /**
     * Check if currently in replay mode
     * @returns {boolean}
     */
    getIsInReplayMode(): boolean;
    /**
     * Set up podium camera - positions camera to look at field center
     */
    setupPodiumCamera(): void;
    /**
     * Set freecam state from position and quaternion (for following another viewer)
     * Uses interpolation for smooth movement when following
     * @param {Object} position - { x, y, z }
     * @param {Object} rotation - { x, y, z, w } quaternion
     */
    setFreecamState(position: Object, rotation: Object): void;
    /**
     * Set ball orbit camera state when following another viewer
     * Uses orbit parameters to orbit around LOCAL ball - prevents desync/stuttering
     * @param {Object} orbitParams - { distance, azimuth, polar } orbit parameters from followed viewer
     */
    setBallOrbitState(orbitParams: Object): void;
    followTargetOrbitParams: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    } | null | undefined;
    followCurrentOrbitParams: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    } | {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
    } | null | undefined;
    /**
     * Set whether we're following another viewer's camera
     * When following, inputs are disabled and camera interpolates to target
     * @param {boolean} isFollowing
     */
    setFollowingViewer(isFollowing: boolean): void;
    /**
     * Update interpolation for following mode (called from update loop)
     * @param {number} delta - Time since last frame
     */
    updateFollowInterpolation(delta: number): void;
    /**
     * Set camera to default freecam position (side view of field)
     * Call this when initializing the viewer or when switching to freecam
     */
    setDefaultFreecamPosition(): void;
    /**
     * Get current pointer lock state
     * @returns {boolean} True if pointer is currently locked
     */
    getIsPointerLocked(): boolean;
    /**
     * Set callback for pointer lock state changes
     * @param {(isLocked: boolean) => void} callback
     */
    setPointerLockCallback(callback: (isLocked: boolean) => void): void;
    /**
     * Dispose resources
     */
    dispose(): void;
}
import CameraControls from "camera-controls";
import * as THREE from "three";
//# sourceMappingURL=CameraManager.d.ts.map