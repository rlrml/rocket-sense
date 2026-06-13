/**
 * Pre-initialize all textures to avoid freeze on first explosion
 * Call this early in app startup
 */
export function initExplosionTextures(): void;
export function warmupExplosionPool(scene: any, renderer: any, camera: any): void;
export function resetExplosionPools(): void;
export function triggerGoalExplosionFromPool(scene: any, position: any, team: any): void;
/**
 * Initialize the explosion pool and do a warmup render to compile shaders.
 * This is now a no-op - pool is created lazily on first explosion.
 * Kept for backward compatibility.
 */
export function precompileExplosionMaterials(renderer: any, scene: any, camera: any): Promise<void>;
export class EffectsManager {
    constructor(scene: any);
    scene: any;
    renderer: any;
    camera: any;
    explosions: {
        active: never[];
    };
    boostTrails: Map<any, any>;
    supersonicTrails: Map<any, any>;
    ballTrail: SpiralBallTrail | null;
    /**
     * Set renderer and camera references for explosion pools
     * Should be called from GameEngine after initialization
     */
    setRenderContext(renderer: any, camera: any): void;
    reset(): void;
    clearEvents(): void;
    /**
     * Reset ball trail (call when seeking to avoid stale segments)
     */
    resetBallTrail(): void;
    createBoostTrail(carMesh: any, carActorId: any): BoostTrail;
    removeBoostTrail(carActorId: any): void;
    updateBoostTrail(carActorId: any, isBoosting: any, position: any, rotation: any, velocity: any): void;
    createSupersonicTrail(carActorId: any, team: any): SupersonicTrailV2;
    removeSupersonicTrail(carActorId: any): void;
    updateSupersonicTrail(carActorId: any, isSupersonic: any, position: any, rotation: any, velocity: any, team: any): void;
    createBallTrail(): SpiralBallTrail;
    /**
     * Update ball trail with position and velocity
     * @param {THREE.Vector3} position - Ball position
     * @param {THREE.Vector3} velocity - Ball velocity
     * @param {number} team - Team (0 = blue, 1 = orange)
     */
    updateBallTrail(position: THREE.Vector3, velocity: THREE.Vector3, team: number): void;
    triggerGoalExplosion(position: any, team: any): void;
    /**
     * Trigger a demolition explosion with car orientation
     * @param {THREE.Vector3} position - Explosion position
     * @param {THREE.Quaternion} rotation - Car rotation (optional, defaults to identity)
     * @param {number} team - Team (0 = blue, 1 = orange)
     */
    triggerDemoExplosion(position: THREE.Vector3, rotation: THREE.Quaternion, team: number): void;
    update(delta: any, isPlaying?: boolean, playbackSpeed?: number): void;
    _playbackSpeed: number | undefined;
}
import { SpiralBallTrail } from "../lib/BallTrailRenderer.js";
declare class BoostTrail {
    constructor(carMesh: any);
    carMesh: any;
    active: boolean;
    particleCount: number;
    particles: {
        life: number;
        maxLife: number;
        velocity: THREE.Vector3;
        active: boolean;
    }[];
    geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes, THREE.BufferGeometryEventMap>;
    points: THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes, THREE.BufferGeometryEventMap>, THREE.ShaderMaterial, THREE.Object3DEventMap>;
    nextParticleIndex: number;
    setActive(active: any): void;
    emit(position: any, rotation: any, velocity: any, playbackSpeed?: number): void;
    update(delta: any): void;
    addToScene(scene: any): void;
    removeFromScene(scene: any): void;
    dispose(): void;
}
/**
 * SupersonicTrailV2 - Uses TrailRendererJS for proper ribbon trails
 * Manages multiple independent trail segments that can overlap
 */
declare class SupersonicTrailV2 {
    constructor(scene: any, team?: number);
    scene: any;
    team: number;
    active: boolean;
    trailLength: number;
    trailWidth: number;
    arenaBounds: {
        floor: number;
        ceiling: number;
        wallX: number;
        wallZ: number;
    };
    groundedThreshold: number;
    segments: any[];
    currentSegment: TrailSegment | null;
    wasGrounded: boolean;
    setTeam(team: any): void;
    setActive(active: any): void;
    isGrounded(position: any): {
        grounded: boolean;
        surface: string;
        normal: THREE.Vector3;
    } | {
        grounded: boolean;
        surface: null;
        normal: null;
    };
    emit(position: any, rotation: any, velocity: any): void;
    update(delta: any): void;
    addToScene(scene: any): void;
    removeFromScene(scene: any): void;
    dispose(): void;
}
import * as THREE from "three";
/**
 * TrailSegment - A single trail segment (pair of left/right ribbons)
 * Each segment lives independently and fades out over time
 */
declare class TrailSegment {
    constructor(scene: any, team: any, trailWidth: any, trailLength: any);
    scene: any;
    team: any;
    trailWidth: any;
    trailLength: any;
    active: boolean;
    dying: boolean;
    deathTime: number;
    maxDeathTime: number;
    teamColors: {
        0: THREE.Vector4;
        1: THREE.Vector4;
    };
    leftTarget: THREE.Object3D<THREE.Object3DEventMap>;
    rightTarget: THREE.Object3D<THREE.Object3DEventMap>;
    leftTrail: TrailRenderer;
    rightTrail: TrailRenderer;
    createTrail(targetObject: any): TrailRenderer;
    updateColors(): void;
    startDying(): void;
    updatePosition(leftPos: any, rightPos: any, rotation: any): void;
    update(delta: any): void;
    dispose(): void;
}
import { TrailRenderer } from "../lib/TrailRenderer.js";
export {};
//# sourceMappingURL=EffectsManager.d.ts.map