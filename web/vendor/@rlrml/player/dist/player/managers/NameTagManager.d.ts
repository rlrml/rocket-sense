/**
 * NameTagManager - Renders player name tags above cars using Three.js Sprites
 * Uses canvas textures to draw name tags with boost indicators (pie chart style)
 */
export class NameTagManager {
    constructor(scene: any, camera: any);
    scene: any;
    camera: any;
    nameTags: Map<any, any>;
    playerTeams: {};
    teamColors: {
        0: {
            bg: string;
            border: string;
            text: string;
        };
        1: {
            bg: string;
            border: string;
            text: string;
        };
    };
    canvasWidth: number;
    canvasHeight: number;
    spriteScale: number;
    spriteWorldHeight: number;
    setPlayerTeams(teams: any): void;
    /**
     * Create or update a name tag for a player
     */
    createOrUpdateNameTag(playerName: any, boost: any, carPosition: any): void;
    /**
     * Create a new name tag sprite with canvas
     */
    _createNameTag(playerName: any): {
        sprite: THREE.Sprite<THREE.Object3DEventMap>;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D | null;
        texture: THREE.CanvasTexture;
    };
    /**
     * Update the canvas texture with current boost value
     */
    _updateTexture(tagData: any, playerName: any, boost: any): void;
    /**
     * Hide a name tag (when car is not visible)
     */
    hideNameTag(playerName: any): void;
    /**
     * Update all name tags based on actor data
     * Called each frame from GameEngine
     * @param {Object} actors - All actors in the scene
     * @param {Object} playerBoosts - Player boost amounts
     * @param {Object} playerNameToCarActorId - Mapping of player names to car actor IDs
     * @param {string|null} followedPlayer - Player being followed in player cam (hide their tag)
     */
    update(actors: Object, playerBoosts: Object, playerNameToCarActorId: Object, followedPlayer?: string | null): void;
    /**
     * Reset all name tags
     */
    reset(): void;
    /**
     * Dispose of all resources
     */
    dispose(): void;
}
import * as THREE from "three";
//# sourceMappingURL=NameTagManager.d.ts.map