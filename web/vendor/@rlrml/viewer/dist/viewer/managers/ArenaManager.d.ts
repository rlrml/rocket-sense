export class ArenaManager {
    constructor(scene: any);
    scene: any;
    arenaMeshes: any[];
    drawingCollider: THREE.Group<THREE.Object3DEventMap> | null;
    drawingColliderMeshes: any[];
    arenaDecorMesh: THREE.Group<THREE.Object3DEventMap> | null;
    showArenaDecor: boolean;
    dracoLoader: DRACOLoader;
    gltfLoader: GLTFLoader;
    loadArenaMeshes(): Promise<void>;
    /**
     * Get all arena meshes for raycasting
     * @returns {THREE.Mesh[]}
     */
    getArenaMeshes(): THREE.Mesh[];
    /**
     * Get drawing collider meshes for raycasting (simplified geometry)
     * @returns {THREE.Mesh[]}
     */
    getDrawingColliderMeshes(): THREE.Mesh[];
    /**
     * Load the simplified drawing collider mesh
     * @param {boolean} visible - Whether to show the collider (for debugging/positioning)
     */
    loadDrawingCollider(visible?: boolean): Promise<void>;
    /**
     * Toggle drawing collider visibility (for debugging)
     * @param {boolean} visible
     */
    setDrawingColliderVisible(visible: boolean): void;
    /**
     * Load the arena decoration mesh (stands, stadium surroundings)
     * @param {boolean} show - Whether to show the decoration initially
     */
    loadArenaDecor(show?: boolean): Promise<void>;
    /**
     * Set the visibility of the arena decoration
     * @param {boolean} visible
     */
    setArenaDecorVisible(visible: boolean): void;
    /**
     * Get the current visibility state of the arena decoration
     * @returns {boolean}
     */
    isArenaDecorVisible(): boolean;
}
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//# sourceMappingURL=ArenaManager.d.ts.map