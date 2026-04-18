/** src/counter.ts */

import { EventEmitter } from './baseclasses/EventHandling.js';

export namespace Counter {
    /** Payload carried by the `changed` event. */
    export type payloadChanged = {
        oldCount: number;
        newCount: number;
        /** Signed difference: +1 for increment, -1 for decrement. */
        delta: number;
    };
}

/** Integer counter model. Emits `changed` on every state mutation. */
export class Counter extends EventEmitter {
    private _count: number;

    /** Fired by increment(), decrement(), and reset(). Payload: {@link Counter.payloadChanged}. */
    public EVENT_CHANGED: string = 'changed';

    /** @param initialValue - Starting value; defaults to 0. */
    constructor(initialValue: number = 0) {
        super();
        this._count = initialValue;
    }

    /** Current counter value (read-only). */
    get count(): number {
        return this._count;
    }

    /** Adds 1 and emits `changed`. @returns New count. */
    increment(): number {
        this._count += 1;
        this.emit(this.EVENT_CHANGED, <Counter.payloadChanged>{ newCount: this.count , oldCount: this.count-1, delta: 1});
        return this._count;
    }

    /** Subtracts 1 and emits `changed`. @returns New count. */
    decrement(): number {
        this._count -= 1;
        this.emit(this.EVENT_CHANGED, <Counter.payloadChanged>{ newCount: this.count, oldCount: this.count + 1, delta: -1 });
        return this._count;
    }

    /** Resets to 0 and emits `changed`. @returns 0. */
    reset(): number {
        var oldCount = this._count;
        this._count = 0;
        this.emit(this.EVENT_CHANGED, <Counter.payloadChanged>{ newCount: this.count, oldCount: oldCount, delta: this.count-oldCount });
        return this._count;
    }
}