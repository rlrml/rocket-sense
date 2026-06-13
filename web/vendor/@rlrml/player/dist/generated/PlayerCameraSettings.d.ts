/**
 * The Rocket League camera preset a player used during the match, replicated
 * through `TAGame.CameraSettingsActor_TA:ProfileSettings`.
 *
 * Values use the in-game units shown in Rocket League's camera settings menu
 * (`fov` is the horizontal field of view in degrees, distances/heights are in
 * unreal units, `angle` in degrees, and `stiffness`/`swivel_speed`/
 * `transition_speed` are the menu's dimensionless multipliers).
 */
export type PlayerCameraSettings = {
    /**
     * Horizontal field of view, in degrees.
     */
    fov: number;
    /**
     * Camera height above the car, in unreal units.
     */
    height: number;
    /**
     * Camera pitch angle, in degrees (negative looks down).
     */
    angle: number;
    /**
     * Camera distance behind the car, in unreal units.
     */
    distance: number;
    /**
     * Camera stiffness in `[0, 1]`; higher tracks the car more rigidly.
     */
    stiffness: number;
    /**
     * Swivel speed multiplier.
     */
    swivel_speed: number;
    /**
     * Transition speed multiplier; absent in replays older than its addition.
     */
    transition_speed?: number;
};
//# sourceMappingURL=PlayerCameraSettings.d.ts.map