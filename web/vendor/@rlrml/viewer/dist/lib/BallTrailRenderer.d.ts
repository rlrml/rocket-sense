/**
 * SpiralBallTrail - Main class for ball trail effect
 * Manages multiple independent trail segments that can overlap
 */
export class SpiralBallTrail {
    /**
     * @param {THREE.Scene} scene - The scene to add trails to
     * @param {number} team - Team color (0 = blue, 1 = orange)
     */
    constructor(scene: THREE.Scene, team?: number);
    scene: THREE.Scene;
    team: number;
    active: boolean;
    ballRadius: number;
    config: {
        trailLength: number;
        mainTrailWidth: number;
        secondaryTrailWidth: number;
        secondaryTrailOffset: number;
    };
    rotationSpeed: number;
    currentRotation: number;
    minVelocity: number;
    maxVelocity: number;
    minIntensity: number;
    maxIntensity: number;
    wasEmitting: boolean;
    segments: any[];
    currentSegment: BallTrailSegment | null;
    currentIntensity: number;
    /**
     * Calculate intensity based on velocity
     * @param {number} speed - Current ball speed
     * @returns {number} Intensity value between minIntensity and maxIntensity
     */
    _calculateIntensity(speed: number): number;
    /**
     * Set team color
     * @param {number} team - 0 = blue, 1 = orange
     */
    setTeam(team: number): void;
    /**
     * Activate the trail system
     */
    activate(): void;
    /**
     * Deactivate the trail system
     */
    deactivate(): void;
    /**
     * Update trail emission
     * @param {THREE.Vector3} position - Ball position
     * @param {THREE.Vector3} velocity - Ball velocity
     * @param {number} delta - Time delta in seconds
     */
    emit(position: THREE.Vector3, velocity: THREE.Vector3, delta: number): void;
    /**
     * Update trails (call every frame)
     * @param {number} delta - Time delta in seconds
     */
    update(delta: number): void;
    /**
     * Reset trails (call when seeking)
     */
    reset(): void;
    /**
     * Add to scene (segments add themselves)
     */
    addToScene(scene: any): void;
    /**
     * Remove from scene
     */
    removeFromScene(scene: any): void;
    /**
     * Dispose of all resources
     */
    dispose(): void;
}
import * as THREE from "three";
/**
 * BallTrailSegment - A single trail segment that can fade out independently
 */
declare class BallTrailSegment {
    constructor(scene: any, team: any, config: any, initialIntensity?: number);
    scene: any;
    team: any;
    config: any;
    active: boolean;
    dying: boolean;
    deathTime: number;
    maxDeathTime: number;
    intensity: number;
    teamColors: {
        0: {
            head: THREE.Vector4;
            tail: THREE.Vector4;
        };
        1: {
            head: THREE.Vector4;
            tail: THREE.Vector4;
        };
    };
    mainTarget: THREE.Object3D<THREE.Object3DEventMap>;
    secondaryTargets: THREE.Object3D<THREE.Object3DEventMap>[];
    mainTrail: TrailRenderer;
    secondaryTrails: TrailRenderer[];
    _createMainTrail(): TrailRenderer;
    _createSecondaryTrails(): TrailRenderer[];
    _updateColors(): void;
    _updateIntensity(): void;
    setTeam(team: any): void;
    setIntensity(intensity: any): void;
    /**
     * Start the death process - segment will fade out
     */
    startDying(): void;
    /**
     * Update trail positions
     */
    updatePosition(position: any, velocity: any, currentRotation: any): void;
    update(delta: any): void;
    dispose(): void;
}
import { TrailRenderer } from "./TrailRenderer.js";
export {};
//# sourceMappingURL=BallTrailRenderer.d.ts.map