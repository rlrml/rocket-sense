/**
 * Minimal event emitter — a zero-dependency stand-in for `eventemitter3`.
 *
 * `@rlrml/player` ships with no runtime dependencies; the player follows suit so
 * consumers that compile the player's source (e.g. the stat-evaluation-player,
 * which symlinks this package) don't have to resolve an external emitter from
 * the player's own node_modules. The API is the small subset the adapter uses
 * (`on`/`once`/`off`/`emit`), shaped like eventemitter3's so call sites and
 * `extends EventEmitter` usage are unchanged.
 */
type Listener = (...args: any[]) => void;
export default class EventEmitter {
    private _listeners;
    on(event: string, fn: Listener): this;
    once(event: string, fn: Listener): this;
    off(event: string, fn?: Listener): this;
    removeListener(event: string, fn?: Listener): this;
    removeAllListeners(event?: string): this;
    emit(event: string, ...args: any[]): boolean;
}
export {};
//# sourceMappingURL=EventEmitter.d.ts.map