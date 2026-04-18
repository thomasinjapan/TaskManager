import { EventEmitter } from "./baseclasses/EventHandling.js";
class Counter extends EventEmitter {
  // #endregion
  // #region Constructor
  /** @param initialValue - Starting value; defaults to 0. */
  constructor(initialValue = 0) {
    super();
    // #endregion
    // #region Events
    /** Fired by increment(), decrement(), and reset(). Payload: {@link Counter.payloadChanged}. */
    this.EVENT_CHANGED = "changed";
    this._count = initialValue;
  }
  // #endregion
  // #region Properties
  /** Current counter value (read-only). */
  get count() {
    return this._count;
  }
  // #endregion
  // #region Methods
  /** Adds 1 and emits `changed`. @returns New count. */
  increment() {
    this._count += 1;
    this.emit(this.EVENT_CHANGED, { newCount: this.count, oldCount: this.count - 1, delta: 1 });
    return this._count;
  }
  /** Subtracts 1 and emits `changed`. @returns New count. */
  decrement() {
    this._count -= 1;
    this.emit(this.EVENT_CHANGED, { newCount: this.count, oldCount: this.count + 1, delta: -1 });
    return this._count;
  }
  /** Resets to 0 and emits `changed`. @returns 0. */
  reset() {
    var oldCount = this._count;
    this._count = 0;
    this.emit(this.EVENT_CHANGED, { newCount: this.count, oldCount, delta: this.count - oldCount });
    return this._count;
  }
  // #endregion
}
export {
  Counter
};
//# sourceMappingURL=counter.js.map
