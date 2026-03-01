"use strict";
(() => {
  // src/baseclasses/EventHandling.ts
  var EventEmitter = class extends EventTarget {
    emit(type, detail) {
      this.dispatchEvent(new CustomEvent(type, { detail }));
    }
  };

  // src/counter.ts
  var Counter = class extends EventEmitter {
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
      this.emit(this.EVENT_CHANGED, { newCount: this.count, oldCount: this.count - 1, delta: 1 });
      return this._count;
    }
    decrement() {
      this._count -= 1;
      this.emit(this.EVENT_CHANGED, { newCount: this.count, oldCount: this.count + 1, delta: -1 });
      return this._count;
    }
    reset() {
      var oldCount = this._count;
      this._count = 0;
      this.emit(this.EVENT_CHANGED, { newCount: this.count, oldCount, delta: this.count - oldCount });
      return this._count;
    }
  };

  // src/counter2-ui.ts
  var CounterUI2 = class extends HTMLElement {
    /** Constructor and UI **/
    constructor(counter) {
      super();
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
    /** Called when element is inserted into the DOM **/
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
    /**
    * gets html element by id from the container
    * @param id id of the element to get
    * @returns element with the specified id or null if not found
    */
    getUIElementById(id) {
      return this.querySelector(`#${id}`);
    }
    set counter(counter) {
      this._counter = counter;
    }
    get counter() {
      return this._counter;
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
  };

  // src/minimal-ui.ts
  var MinimalUI = class extends HTMLElement {
    /** Constructor and UI **/
    constructor() {
      super();
      this._cssClass = null;
      this._design = `
                <h1>Minimal Header</h1>
         `;
    }
    /** Called when element is inserted into the DOM **/
    connectedCallback() {
      console.log("Initializing MinimalUI");
      this.innerHTML = this._design;
      console.log("innerHTML set in MinimalUI:", this._design);
      this._cssClass ? this.classList.add(this._cssClass) : null;
      this.updateUI();
      this.setupEventListeners();
      this.setupObjectsEventHandlers();
      console.log("MinimalUI initialized successfully");
    }
    /**
    * gets html element by id from the container
    * @param id id of the element to get
    * @returns element with the specified id or null if not found
    */
    getUIElementById(id) {
      return this.querySelector(`#${id}`);
    }
    /** Event handlers **/
    setupEventListeners() {
    }
    setupObjectsEventHandlers() {
    }
    /** Logic **/
    updateUI() {
    }
  };

  // src/minimal-ui2.ts
  var MinimalUI2 = class extends HTMLElement {
    /** Constructor and UI **/
    constructor() {
      super();
      this._cssClass = null;
      this._design = `
                <h1>Minimal Header 2</h1>
         `;
    }
    /** Called when element is inserted into the DOM **/
    connectedCallback() {
      console.log("Initializing MinimalUI");
      this.innerHTML = this._design;
      console.log("innerHTML set in MinimalUI:", this._design);
      this._cssClass ? this.classList.add(this._cssClass) : null;
      this.updateUI();
      this.setupEventListeners();
      this.setupObjectsEventHandlers();
      console.log("MinimalUI initialized successfully");
    }
    /**
    * gets html element by id from the container
    * @param id id of the element to get
    * @returns element with the specified id or null if not found
    */
    getUIElementById(id) {
      return this.querySelector(`#${id}`);
    }
    /** Event handlers **/
    setupEventListeners() {
    }
    setupObjectsEventHandlers() {
    }
    /** Logic **/
    updateUI() {
    }
  };

  // src/app2.ts
  !customElements.get("minimal-ui") ? customElements.define("minimal-ui", MinimalUI) : null;
  !customElements.get("minimal-ui2") ? customElements.define("minimal-ui2", MinimalUI2) : null;
  !customElements.get("counter2-ui") ? customElements.define("counter2-ui", CounterUI2) : null;
  var App2 = class extends HTMLElement {
    //private _design: string = `
    //        <div id="counter2-ui"></div><br />
    //        <!-- <div id="task-ui"></div><br /> --!>
    //        <div id="tasklist-ui"></div>
    //    `;
    /** Constructor and UI **/
    constructor() {
      super();
      this._design = `
            <minimal-ui id="minimal-ui"></minimal-ui><br />
            <minimal-ui2 id="minimal-ui2"></minimal-ui2><br />
            <counter2-ui id="counter2-ui"></counter2-ui><br />
        `;
    }
    /** Called when element is inserted into the DOM **/
    connectedCallback() {
      this.innerHTML = this._design;
      requestAnimationFrame(() => {
        this.initializeObjects();
      });
    }
    getUIElementById(id) {
      return this.querySelector(`#${id}`);
    }
    initializeObjects() {
      const minimalContainer = this.getUIElementById("minimal-ui");
      const minimalContainer2 = this.getUIElementById("minimal-ui2");
      minimalContainer ? console.log("Minimal container found:", minimalContainer) : console.error("Minimal container not found");
      minimalContainer2 ? console.log("Minimal2 container found:", minimalContainer2) : console.error("Minimal2 container not found");
    }
  };

  // src/bootstrapper.ts
  customElements.define("app-root", App2);
  function initializeApp() {
    const appContainer = document.getElementById("bootstrapper");
    if (!appContainer) {
      throw new Error("App container not found");
    }
    console.log("App container found:", appContainer);
    const app_root = document.createElement("app-root");
    appContainer.appendChild(app_root);
  }
  document.addEventListener("DOMContentLoaded", initializeApp);
})();
//# sourceMappingURL=bundle.js.map
