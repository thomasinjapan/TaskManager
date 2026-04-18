import { Counter } from "./counter.js";
class CounterUI2 extends HTMLElement {
  // #endregion
  // #region Constructor
  /** @param counter - Optional external Counter model to bind to. */
  constructor(counter) {
    super();
    // #region Fields
    this._counter = new Counter();
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
    counter ? this._counter = counter : this._counter = new Counter();
  }
  // #endregion
  // #region Properties
  /** The bound Counter model. */
  set counter(counter) {
    this._counter = counter;
  }
  get counter() {
    return this._counter;
  }
  // #endregion
  // #region Lifecycle
  /** Called when the element is inserted into the DOM. */
  connectedCallback() {
    this.innerHTML = this._design;
    this._cssClass ? this.classList.add(this._cssClass) : null;
    this._lblCount = this.getUIElementById("lblCount");
    this._btnIncrement = this.getUIElementById("cmdIncrement");
    this._btnDecrement = this.getUIElementById("cmdDecrement");
    this._btnReset = this.getUIElementById("cmdReset");
    this.updateUI();
    this.setupEventListeners();
    this.setupCounterEventHandlers();
  }
  // #endregion
  // #region DOM
  /**
   * Queries an element by id within this component's subtree.
   * @param id - The element id to search for.
   * @returns The element cast to T, or null if not found.
   */
  getUIElementById(id) {
    return this.querySelector(`#${id}`);
  }
  // #endregion
  // #region Event Handlers
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
  // #endregion
  // #region UI
  /** Syncs the count label to the current model value. */
  updateUI() {
    if (!this._lblCount) return;
    this._lblCount.textContent = this._counter.count.toString();
  }
  // #endregion
}
export {
  CounterUI2
};
//# sourceMappingURL=counter2-ui.js.map
