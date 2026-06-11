import type { PlaylistItem, PlaylistManifest, PlaylistManifestReplay, ReplaySource } from "./types";
export declare function parsePlaylistManifest(manifest: unknown): PlaylistManifest;
export declare function loadPlaylistManifestFromFile(file: Blob): Promise<PlaylistManifest>;
export declare function resolvePlaylistItemsFromManifest(manifest: PlaylistManifest, resolveReplaySource: (context: {
    replayId: string;
    replay?: PlaylistManifestReplay;
}) => ReplaySource): PlaylistItem[];
//# sourceMappingURL=manifest.d.ts.map