class CounterUI {
  /** Constructor and UI **/
  constructor(container, counter) {
    this._ui_lblCount = null;
    this._design = `
            <div class="counter-container">
                <h1>TypeScript Counter</h1>
                <div id="count-display">0</div>
                <div>
                    <button id="decrement-btn">Decrement</button>
                    <button id="reset-btn">Reset</button>
                    <button id="increment-btn">Increment</button>
                </div>
            </div>
        `;
    this._container = container;
    this._counter = counter;
    this._container.innerHTML = this._design;
    this._ui_lblCount = this.getUIElementById("count-display");
    this.updateUI();
    this.setupEventListeners();
    this.setupCounterEventHandlers();
  }
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
  }
  /** Event handlers **/
  setupEventListeners() {
    const btnIncrement = this.getUIElementById("increment-btn");
    const btnDecrement = this.getUIElementById("decrement-btn");
    const btnReset = this.getUIElementById("reset-btn");
    if (btnIncrement) {
      btnIncrement.addEventListener("click", this.handleIncrement.bind(this));
    }
    if (btnDecrement) {
      btnDecrement.addEventListener("click", this.handleDecrement.bind(this));
    }
    if (btnReset) {
      btnReset.addEventListener("click", this.handleReset.bind(this));
    }
  }
  setupCounterEventHandlers() {
    this._counter.addEventListener("change", this.onChange.bind(this));
  }
  handleIncrement() {
    const newCount = this._counter.increment();
    this.updateUI();
  }
  handleDecrement() {
    const newCount = this._counter.decrement();
    this.updateUI();
  }
  handleReset() {
    const newCount = this._counter.reset();
    this.updateUI();
  }
  onChange(e) {
    console.log(`Counter triggered`);
    const [newValue] = e.detail;
    console.log(`Counter changed to: ${newValue}`);
  }
  /** Logic **/
  updateUI() {
    if (!this._ui_lblCount) return;
    this._ui_lblCount.textContent = this._counter.count.toString();
  }
}
export {
  CounterUI
};
//# sourceMappingURL=counter-ui.js.map
