import { EventEmitter } from "./EventHandling.js";
class Counter extends EventEmitter {
  constructor(initialValue = 0) {
    super();
    /** list of all valid events **/
    this.EVENT_CHANGED = "changed";
    this._count = initialValue;
  }
  get count() {
    return this._count;
  }
  increment() {
    this._count += 1;
    this.emit(this.EVENT_CHANGED, [this.count]);
    return this._count;
  }
  decrement() {
    this._count -= 1;
    this.emit(this.EVENT_CHANGED, [this.count]);
    return this._count;
  }
  reset() {
    this._count = 0;
    return this._count;
  }
}
export {
  Counter
};
//# sourceMappingURL=counter.js.map
