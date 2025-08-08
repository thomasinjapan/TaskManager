/**  src/counter.ts  **/
import { EventEmitter } from './EventHandling.js';

export class Counter extends EventEmitter {
    private _count: number;

    constructor(initialValue: number = 0) {
        super();
        this._count = initialValue;
    }

    get count(): number {
        return this._count;
    }

    increment(): number {
        this._count += 1;
        this.emit('change', [this.count]);
        console.log(`tried to trigger change`);
        return this._count;
    }

    decrement(): number {
        this._count -= 1;
        return this._count;
    }

    reset(): number {
        this._count = 0;
        return this._count;
    }
}