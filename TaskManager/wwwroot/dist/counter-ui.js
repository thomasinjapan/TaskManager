import { BaseUI } from "./baseclasses/baseui.js";
class CounterUI extends BaseUI {
  /** Constructor and UI **/
  constructor(container, counter) {
    super(container);
    this._lblCount = null;
    this._btnIncrement = null;
    this._btnDecrement = null;
    this._btnReset = null;
    this._cssClass = `counter-container`;
    this._design = `
                <h1>TypeScript Counter</h1>
                <div id="lblCount">0</div>
                <div>
                    <button id="cmdDecrement">Decrement</button>
                    <button id="cmdReset">Reset</button>
                    <button id="cmdIncrement">Increment</button>
                </div>
         `;
    this.initializeUI();
    this._counter = counter;
    this._lblCount = this.getUIElementById("lblCount");
    this._btnIncrement = this.getUIElementById("cmdIncrement");
    this._btnDecrement = this.getUIElementById("cmdDecrement");
    this._btnReset = this.getUIElementById("cmdReset");
    this.updateUI();
    this.setupEventListeners();
    this.setupCounterEventHandlers();
  }
  /** Event handlers **/
  setupEventListeners() {
    this._btnIncrement?.addEventListener("click", this.onUIIncrement.bind(this));
    this._btnDecrement?.addEventListener("click", this.onUIDecrement.bind(this));
    this._btnReset?.addEventListener("click", this.onUIReset.bind(this));
  }
  setupCounterEventHandlers() {
    this._counter.addEventListener(this._counter.EVENT_CHANGED, this.onCounterChange.bind(this));
  }
  onUIIncrement() {
    const newCount = this._counter.increment();
    this.updateUI();
  }
  onUIDecrement() {
    const newCount = this._counter.decrement();
    this.updateUI();
  }
  onUIReset() {
    const newCount = this._counter.reset();
    this.updateUI();
  }
  onCounterChange(e) {
    const args = e.detail;
    console.log("Counter changed");
    console.log("Counter changed from : ", args.oldCount);
    console.log("Counter changed to: ", args.newCount);
    console.log("Counter change delta: ", args.delta);
  }
  /** Logic **/
  updateUI() {
    if (!this._lblCount) return;
    this._lblCount.textContent = this._counter.count.toString();
  }
}
export {
  CounterUI
};
//# sourceMappingURL=counter-ui.js.map
