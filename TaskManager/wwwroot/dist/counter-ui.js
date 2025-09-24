class CounterUI {
  /** Constructor and UI **/
  constructor(container, counter) {
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
    this._container = container;
    this._counter = counter;
    this._container.innerHTML = this._design;
        this._cssClass ? this._container.classList.add(this._cssClass) : null;
    this._lblCount = this.getUIElementById("lblCount");
    this._btnIncrement = this.getUIElementById("cmdIncrement");
    this._btnDecrement = this.getUIElementById("cmdDecrement");
    this._btnReset = this.getUIElementById("cmdReset");
    this.updateUI();
    this.setupEventListeners();
    this.setupCounterEventHandlers();
  }
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
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
    console.log("Counter triggered");
    console.log("Counter changed to: ", args.newCount);
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
