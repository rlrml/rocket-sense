import type { LoadedReplay, PlaybackBound, PlaylistAdvanceMode, PlaylistEndMode, PlaylistItem, PlaylistLoadSource, PlaylistPreloadPolicy, PlaylistSourceLoadContext, PlaylistSourceLoadState, ReplaySource } from "./types";
type ReplayPathLoader = (path: string, context?: PlaylistSourceLoadContext) => Promise<LoadedReplay>;
type ReplaySourceLoader = (context?: PlaylistSourceLoadContext) => Promise<LoadedReplay>;
export interface FullReplayPlaylistItemOptions {
    label?: string;
    meta?: Record<string, unknown>;
}
export declare function normalizePreloadPolicy<TSource extends PlaylistLoadSource<unknown>, TItem extends PlaylistItem<TSource>>(options: {
    preloadPolicy?: PlaylistPreloadPolicy<TSource, TItem>;
    preloadRadius?: number;
}): PlaylistPreloadPolicy<TSource, TItem>;
export declare function normalizeAdvanceMode(options: {
    advanceMode?: PlaylistAdvanceMode;
    advanceOnEnd?: boolean;
}): PlaylistAdvanceMode;
export declare function normalizeEndMode(options: {
    endMode?: PlaylistEndMode;
}): PlaylistEndMode;
export declare function uniqueSourcesFromItems<TSource extends PlaylistLoadSource<unknown>>(items: PlaylistItem<TSource>[]): TSource[];
export declare function resolvePolicySources<TSource extends PlaylistLoadSource<unknown>, TItem extends PlaylistItem<TSource>>(items: TItem[], currentIndex: number, preloadPolicy: PlaylistPreloadPolicy<TSource, TItem>): TSource[];
export declare function frameBound(value: number): PlaybackBound;
export declare function timeBound(value: number): PlaybackBound;
export declare function createReplaySource(id: string, load: ReplaySourceLoader): ReplaySource;
export declare function createStaticReplaySource(id: string, replay: LoadedReplay): ReplaySource;
export declare function createReplayBytesSource(id: string, data: Uint8Array): ReplaySource;
export declare function createReplayFileSource(file: File, id?: string): ReplaySource;
export declare function createReplayPathSource(path: string, loadReplay: ReplayPathLoader, id?: string): ReplaySource;
export declare function createFullReplayPlaylistItem(replay: ReplaySource, options?: FullReplayPlaylistItemOptions): PlaylistItem;
export declare class PlaylistLoadCache<TLoaded, TSource extends PlaylistLoadSource<TLoaded> = PlaylistLoadSource<TLoaded>> {
    private readonly cache;
    private readonly states;
    private readonly listeners;
    load(source: TSource): Promise<TLoaded>;
    preload(sources: Iterable<TSource>): void;
    has(source: TSource | string): boolean;
    delete(source: TSource | string): boolean;
    clear(): void;
    getState(source: TSource | string): PlaylistSourceLoadState;
    getStates(): PlaylistSourceLoadState[];
    subscribe(listener: () => void): () => void;
    private updateProgress;
    private setSourceState;
    private emitChange;
}
export interface PlaylistSessionState<TLoaded, TSource extends PlaylistLoadSource<TLoaded> = PlaylistLoadSource<TLoaded>, TItem extends PlaylistItem<TSource> = PlaylistItem<TSource>> {
    ready: boolean;
    loading: boolean;
    error: string | null;
    itemIndex: number;
    itemCount: number;
    item: TItem | null;
    loaded: TLoaded | null;
    advanceMode: PlaylistAdvanceMode;
    endMode: PlaylistEndMode;
    playlistEnded: boolean;
}
export interface PlaylistSessionOptions<TLoaded, TSource extends PlaylistLoadSource<TLoaded> = PlaylistLoadSource<TLoaded>, TItem extends PlaylistItem<TSource> = PlaylistItem<TSource>> {
    initialItemIndex?: number;
    advanceMode?: PlaylistAdvanceMode;
    endMode?: PlaylistEndMode;
    advanceOnEnd?: boolean;
    preloadPolicy?: PlaylistPreloadPolicy<TSource, TItem>;
    preloadRadius?: number;
    loadCache?: PlaylistLoadCache<TLoaded, TSource>;
}
type PlaylistSessionListener<TLoaded, TSource extends PlaylistLoadSource<TLoaded>, TItem extends PlaylistItem<TSource>> = (state: PlaylistSessionState<TLoaded, TSource, TItem>) => void;
export declare class PlaylistSession<TLoaded, TSource extends PlaylistLoadSource<TLoaded> = PlaylistLoadSource<TLoaded>, TItem extends PlaylistItem<TSource> = PlaylistItem<TSource>> {
    readonly items: TItem[];
    readonly loadCache: PlaylistLoadCache<TLoaded, TSource>;
    private currentItemIndex;
    private pendingItemIndex;
    private loading;
    private error;
    private currentLoaded;
    private disposed;
    private loadGeneration;
    private pendingLoad;
    private playlistEnded;
    private readonly listeners;
    private readonly preloadPolicy;
    private advanceMode;
    private endMode;
    constructor(items: TItem[], options?: PlaylistSessionOptions<TLoaded, TSource, TItem>);
    waitForCurrentItem(): Promise<void>;
    setCurrentItemIndex(index: number): Promise<void>;
    next(): Promise<boolean>;
    previous(): Promise<boolean>;
    completeCurrentItem(): Promise<boolean>;
    setAdvanceMode(mode: PlaylistAdvanceMode): void;
    setEndMode(mode: PlaylistEndMode): void;
    getCurrentLoaded(): TLoaded | null;
    getState(): PlaylistSessionState<TLoaded, TSource, TItem>;
    subscribe(listener: PlaylistSessionListener<TLoaded, TSource, TItem>): () => void;
    destroy(): void;
    dispose(): void;
    private loadItem;
    private emitChange;
}
export {};
//# sourceMappingURL=playlist-core.d.ts.map