/**  src/counter.ts  **/
import { EventEmitter } from './EventHandling.js';

export namespace Counter {
    export type payloadChanged = {
        newCount: number;
    };
}

export class Counter extends EventEmitter {
    private _count: number;

    /** list of all valid events **/
    public EVENT_CHANGED: string = 'changed';

    constructor(initialValue: number = 0) {
        super();
        this._count = initialValue;
    }

    get count(): number {
        return this._count;
    }

    increment(): number {
        this._count += 1;
        this.emit(this.EVENT_CHANGED, <Counter.payloadChanged>{ newCount: this.count });
        return this._count;
    }

    decrement(): number {
        this._count -= 1;
        this.emit(this.EVENT_CHANGED, <Counter.payloadChanged>{ newCount: this.count });
        return this._count;
    }

    reset(): number {
        this._count = 0;
        return this._count;
    }
}