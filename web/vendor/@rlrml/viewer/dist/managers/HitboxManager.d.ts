export class HitboxManager {
    /**
     * @param {THREE.Scene} scene - The scene to add hitboxes to
     */
    constructor(scene: THREE.Scene);
    scene: THREE.Scene;
    hitboxes: Map<any, any>;
    enabled: boolean;
    /**
     * Enable or disable hitbox display
     * @param {boolean} enabled
     */
    setEnabled(enabled: boolean): void;
    /**
     * Create a wireframe hitbox mesh for a specific hitbox type
     * @param {string} hitboxType - One of: Octane, Dominus, Plank, Breakout, Hybrid, Merc
     * @returns {THREE.Group} - Group containing wireframe box and center pivot sphere
     */
    createHitboxWireframe(hitboxType: string): THREE.Group;
    /**
     * Add or update a hitbox for a car
     * @param {string} carActorId - The car's actor ID
     * @param {string} hitboxType - The hitbox type
     */
    addHitbox(carActorId: string, hitboxType: string): void;
    /**
     * Remove a hitbox for a car
     * @param {string} carActorId - The car's actor ID
     */
    removeHitbox(carActorId: string): void;
    /**
     * Update hitbox positions and rotations to match car transforms
     * @param {Object} actors - Map of actor ID to actor mesh
     * @param {Object} playerNameToCarActorId - Map of player name to car actor ID
     * @param {Function} getHitboxType - Function that returns hitbox type for a player name
     */
    updateHitboxes(actors: Object, playerNameToCarActorId: Object, getHitboxType: Function): void;
    /**
     * Reset all hitboxes
     */
    reset(): void;
    /**
     * Dispose of all resources
     */
    dispose(): void;
}
import * as THREE from "three";
//# sourceMappingURL=HitboxManager.d.ts.map