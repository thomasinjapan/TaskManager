import { EventEmitter } from "./EventHandling.js";
class Counter extends EventEmitter {
  constructor(initialValue = 0) {
    super();
    this._count = initialValue;
  }
  get count() {
    return this._count;
  }
  increment() {
    this._count += 1;
    this.emit("change", [this.count]);
    console.log(`tried to trigger change`);
    return this._count;
  }
  decrement() {
    this._count -= 1;
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
