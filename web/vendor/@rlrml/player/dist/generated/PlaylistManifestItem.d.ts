import type { PlaybackBound } from "./PlaybackBound.ts";
export type PlaylistManifestItem = {
    id: string;
    replay: string;
    start: PlaybackBound;
    end: PlaybackBound;
    label: string;
    meta: Record<string, unknown>;
};
//# sourceMappingURL=PlaylistManifestItem.d.ts.map