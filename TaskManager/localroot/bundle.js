"use strict";
(() => {
  // src/EventHandling.ts
  var EventEmitter = class extends EventTarget {
    emit(type, args) {
      this.dispatchEvent(new CustomEvent(type, { detail: args }));
    }
  };

  // src/counter.ts
  var Counter = class extends EventEmitter {
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
  };

  // src/task.ts
  var Task = class extends EventEmitter {
    constructor(initialTitle, initialDescription) {
      super();
      this._title = initialTitle;
      this._description = initialDescription;
    }
    get title() {
      return this._title;
    }
    set title(value) {
      this._title = value;
      this.emit("title_updated", []);
      this.emit("updated", []);
    }
    get description() {
      return this._description;
    }
    set description(value) {
      this._description = value;
      this.emit("description_updated", []);
      this.emit("updated", []);
    }
  };

  // src/counter-ui.ts
  var CounterUI = class {
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
      console.log("Counter triggered");
      const [newValue] = e.detail;
      console.log("Counter changed to: ", newValue);
    }
    /** Logic **/
    updateUI() {
      if (!this._ui_lblCount) return;
      this._ui_lblCount.textContent = this._counter.count.toString();
    }
  };

  // src/task-ui.ts
  var TaskUI = class {
    /** Constructor and UI **/
    constructor(container, task) {
      this._lblTaskTitle = null;
      this._lblTaskDescription = null;
      this._design = `
            <div class="task-ui">
                <h1>Task</h1>
                <div id="task-title">NOT DEFINED</div>
                <div id="task-description"></div
            </div>
        `;
      this._container = container;
      this._task = task;
      this._container.innerHTML = this._design;
      this._lblTaskTitle = this.getUIElementById("task-title");
      this._lblTaskDescription = this.getUIElementById("task-description");
      this.updateUI();
      this.setupEventListeners();
      this.setupCounterEventHandlers();
    }
    getUIElementById(id) {
      return this._container.querySelector(`#${id}`);
    }
    /** Event handlers **/
    setupEventListeners() {
    }
    setupCounterEventHandlers() {
      this._task.addEventListener("updated", this.onTaskUpdated.bind(this));
    }
    onTaskUpdated(e) {
      this.updateUI();
      console.log(`Task was updated`);
    }
    /** Logic **/
    updateUI() {
      if (!this._lblTaskDescription || !this._lblTaskTitle) return;
      this._lblTaskTitle.textContent = this._task.title.toString();
      this._lblTaskDescription.textContent = this._task.description.toString();
    }
  };

  // src/app.ts
  var App = class {
    /** Constructor and UI **/
    constructor(container) {
      this._design = `
            <div id="counter-ui"></div><br />
            <div id="task-ui"></div><br />
        `;
      this._container = container;
      this._container.innerHTML = this._design;
      this.initializeObjects();
    }
    getUIElementById(id) {
      return this._container.querySelector(`#${id}`);
    }
    initializeObjects() {
      const counterContainer = this.getUIElementById("counter-ui");
      const taskContainer = this.getUIElementById("task-ui");
      const counter = new Counter();
      const task = new Task("New Task", "New Description");
      const counterUI = new CounterUI(counterContainer, counter);
      const taskUI = new TaskUI(taskContainer, task);
    }
  };

  // src/bootstrapper.ts
  function initializeApp() {
    const appContainer = document.getElementById("bootstrapper");
    if (!appContainer) {
      throw new Error("App container not found");
    }
    console.log("App container found:");
    const bootstrapper = new App(appContainer);
  }
  document.addEventListener("DOMContentLoaded", initializeApp);
})();
//# sourceMappingURL=bundle.js.map
