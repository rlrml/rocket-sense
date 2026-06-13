/**
 * CarModelLoader - Loads and manages car models (GLB format) with team-colored materials
 *
 * Supports 7 car models: octane, fennec, dominus, breakout, merc, mantis, x-devil
 * Each hitbox type maps to its representative car model.
 *
 * Mapping:
 * - Octane hitbox -> octane (or fennec if car name is Fennec)
 * - Dominus hitbox -> dominus
 * - Breakout hitbox -> breakout
 * - Plank hitbox -> mantis
 * - Hybrid hitbox -> x-devil
 * - Merc hitbox -> merc
 */
export class CarModelLoader {
    fbxLoader: FBXLoader;
    gltfLoader: GLTFLoader;
    textureLoader: THREE.TextureLoader;
    modelCache: Map<any, any>;
    loadingPromises: Map<any, any>;
    modelConfig: {
        octane: {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
        fennec: {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
        dominus: {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
        breakout: {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
        merc: {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
        mantis: {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
        "x-devil": {
            format: string;
            file: string;
            scale: number;
            wheelSockets: boolean;
            wheelModel: string;
        };
    };
    wheelModelCache: Map<any, any>;
    wheelLoadingPromises: Map<any, any>;
    preloadReady: Promise<void>;
    _preloadStarted: boolean;
    carNameToModel: {
        Octane: string;
        "Octane ZSR": string;
        Fennec: string;
        Dominus: string;
        "Dominus GT": string;
        Breakout: string;
        "Breakout Type-S": string;
        Merc: string;
        Mantis: string;
        "X-Devil": string;
        "X-Devil Mk2": string;
    };
    hitboxToModel: {
        Octane: string;
        Dominus: string;
        Breakout: string;
        Plank: string;
        Hybrid: string;
        Merc: string;
    };
    TEAM_COLORS: {
        blue: THREE.Color;
        orange: THREE.Color;
    };
    HITBOX_DIMENSIONS: {
        octane: {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
        fennec: {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
        dominus: {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
        breakout: {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
        mantis: {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
        "x-devil": {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
        merc: {
            length: number;
            width: number;
            height: number;
            offsetX: number;
            offsetZ: number;
        };
    };
    /**
     * Preload car models for a specific replay based on players' cars.
     * Only loads models actually used in the replay.
     * @param {Array<{carName: string, hitboxType: string}>} players - Array of player entities with carName and hitboxType
     * @returns {Promise<void>}
     */
    preloadModelsForReplay(players: Array<{
        carName: string;
        hitboxType: string;
    }>): Promise<void>;
    /**
     * Preload specific car models. Returns a promise that resolves when all models are loaded.
     * @param {string[]} modelTypes - Array of model types to preload (e.g., ['octane', 'fennec'])
     * @returns {Promise<void>}
     */
    _preloadModels(modelTypes: string[]): Promise<void>;
    /**
     * Preload ALL car models (legacy method for backwards compatibility).
     * Prefer preloadModelsForReplay() for better performance.
     * @returns {Promise<void>}
     */
    preloadAllModels(): Promise<void>;
    /**
     * Wait for all preloaded models to be ready
     * @returns {Promise<void>}
     */
    waitForPreload(): Promise<void>;
    /**
     * Load a car model and its chassis texture
     * @param {string} modelType - 'octane', 'dominus', or 'fennec'
     * @returns {Promise<{model: THREE.Group, chassisTexture: THREE.Texture}>}
     */
    loadModel(modelType: string): Promise<{
        model: THREE.Group;
        chassisTexture: THREE.Texture;
    }>;
    _loadModelInternal(modelType: any): Promise<{
        model: any;
        chassisTexture: any;
        wheelModel: THREE.Group<THREE.Object3DEventMap> | null;
    }>;
    /**
     * Find wheel socket empty objects in the model
     * Expected names: Wheel_BL, Wheel_BR, Wheel_FL, Wheel_FR
     * (BackLeft, BackRight, FrontLeft, FrontRight)
     * @param {THREE.Group} model - The loaded model
     * @returns {Object} Map of socket name to socket object
     */
    _findWheelSockets(model: THREE.Group): Object;
    /**
     * Calculate the proper scale factor to match Rocket League hitbox dimensions
     * @param {THREE.Group} model - The loaded model
     * @param {string} modelType - 'octane', 'dominus', or 'fennec'
     * @param {number|null} overrideScale - If provided, use this scale directly (skip auto-calc)
     * @returns {{ scale: number, offsetX: number, offsetY: number }}
     */
    _calculateModelScale(model: THREE.Group, modelType: string, overrideScale?: number | null): {
        scale: number;
        offsetX: number;
        offsetY: number;
    };
    _loadFBX(path: any): Promise<any>;
    _loadGLB(path: any): Promise<any>;
    /**
     * Load a wheel model for cars with separate wheels
     * @param {string} wheelModelName - The wheel model filename (e.g., 'Wheel_Boog.glb')
     * @returns {Promise<THREE.Group>}
     */
    loadWheelModel(wheelModelName: string): Promise<THREE.Group>;
    _loadTexture(path: any): Promise<any>;
    _processModelMaterials(model: any, chassisTexture: any, modelType: any, format?: string): void;
    /**
     * Get the model type for a given car name and hitbox type
     * @param {string} carName - The car name (e.g., "Fennec", "Octane")
     * @param {string} hitboxType - The hitbox type as fallback
     * @returns {string} The model folder name
     */
    getModelTypeForCar(carName: string, hitboxType: string): string;
    /**
     * @deprecated Use getModelTypeForCar instead
     */
    getModelTypeForHitbox(hitboxType: any): any;
    /**
     * Create a car mesh for a specific hitbox type and team
     * @param {string} hitboxType - 'Octane', 'Dominus', etc.
     * @param {number} team - 0 for blue, 1 for orange
     * @returns {Promise<THREE.Group|null>} The car mesh or null if not loaded
     */
    createCarMesh(hitboxType: string, team?: number): Promise<THREE.Group | null>;
    /**
     * Apply team color to the car body material
     * @param {THREE.Group} carMesh - The car mesh group
     * @param {number} team - 0 for blue, 1 for orange
     */
    applyTeamColor(carMesh: THREE.Group, team: number): void;
    /**
     * Update the team color of an existing car mesh
     * @param {THREE.Group} carMesh - The car mesh group
     * @param {number} team - 0 for blue, 1 for orange
     */
    updateTeamColor(carMesh: THREE.Group, team: number): void;
    /**
     * Check if a model is loaded and ready
     * @param {string} carName - The car name
     * @param {string} hitboxType - The hitbox type as fallback
     * @returns {boolean}
     */
    isModelReady(carName: string, hitboxType: string): boolean;
    /**
     * Get a synchronous car mesh if available (returns null if not loaded)
     * @param {string} carName - The car name
     * @param {string} hitboxType - The hitbox type as fallback
     * @param {number} team - 0 for blue, 1 for orange
     * @returns {THREE.Group|null}
     */
    getCarMeshSync(carName: string, hitboxType: string, team?: number): THREE.Group | null;
    /**
     * Attach wheel models to socket empty objects in the car model
     * Socket naming: Wheel_BL (BackLeft), Wheel_BR (BackRight), Wheel_FL (FrontLeft), Wheel_FR (FrontRight)
     * @param {THREE.Group} carModel - The cloned car model
     * @param {THREE.Group} wheelModelTemplate - The wheel model to clone and attach
     * @returns {Array<{mesh: THREE.Object3D, steeringPivot: THREE.Object3D|null, side: string, position: string}>}
     */
    _attachWheelsToSockets(carModel: THREE.Group, wheelModelTemplate: THREE.Group): Array<{
        mesh: THREE.Object3D;
        steeringPivot: THREE.Object3D | null;
        side: string;
        position: string;
    }>;
    /**
     * Find wheel meshes in the car model
     * New naming convention with pivot hierarchy:
     * - Wheel_XX_Z = steering pivot (rotates around Z for steering)
     * - Wheel_XX_Y = wheel mesh (rotates around Y for rolling)
     * @param {THREE.Group} model - The FBX model
     * @returns {Array<{mesh: THREE.Object3D, steeringPivot: THREE.Object3D|null, side: string, position: string}>}
     */
    _findWheelMeshes(model: THREE.Group): Array<{
        mesh: THREE.Object3D;
        steeringPivot: THREE.Object3D | null;
        side: string;
        position: string;
    }>;
    dispose(): void;
}
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
//# sourceMappingURL=CarModelLoader.d.ts.map