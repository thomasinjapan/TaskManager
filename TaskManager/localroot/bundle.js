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

  // src/task.ts
  var Task = class extends EventEmitter {
    constructor(initialTitle, initialDescription) {
      super();
      /** list of all valid events **/
      this.EVENT_TITLE_UPDATED = "title_updated";
      this.EVENT_DESCRIPTION_UPDATED = "description_updated";
      this.EVENT_UPDATED = "updated";
      this._title = initialTitle;
      this._description = initialDescription;
    }
    get title() {
      return this._title;
    }
    set title(value) {
      this._title = value;
      this.emit(this.EVENT_TITLE_UPDATED, {});
      this.emit(this.EVENT_UPDATED, {});
    }
    get description() {
      return this._description;
    }
    set description(value) {
      this._description = value;
      this.emit(this.EVENT_DESCRIPTION_UPDATED, { description: this._description });
      this.emit(this.EVENT_UPDATED, {});
    }
  };

  // src/baseclasses/baseui.ts
  var BaseUI = class {
    /** Constructor and UI **/
    constructor(container) {
      /** dummy design info to be sure that it is available in UI initialization when called**/
      this._cssClass = "";
      this._design = "";
      this._container = container;
    }
    /** Logic **/
    /** initializes the UI with current design and css class info*/
    initializeUI() {
      this._container.innerHTML = this._design;
      this._cssClass ? this._container.classList.add(this._cssClass) : null;
    }
    /**
     * gets html element by id from the container
     * @param id id of the element to get
     * @returns element with the specified id or null if not found
     */
    getUIElementById(id) {
      return this._container.querySelector(`#${id}`);
    }
  };

  // src/counter-ui.ts
  var CounterUI = class extends BaseUI {
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
  };

  // src/task-ui.ts
  var TaskUI = class extends BaseUI {
    /** Constructor and UI **/
    constructor(container, task) {
      super(container);
      this._lblTaskTitle = null;
      this._lblTaskDescription = null;
      this._txtTaskTitle = null;
      this._txtTaskDescription = null;
      /** design info **/
      this._cssClass = "task-ui";
      this._design = `
            <h1>Task</h1>
            <div id="lblTaskTitle">NOT DEFINED</div>
            <input type="text" id="txtTaskTitle" />
            <div id="lblTaskDescription"></div>
            <textarea id="txtTaskDescription"></textarea>
        `;
      this.initializeUI();
      this._task = task;
      this._container.innerHTML = this._design;
      this._cssClass ? this._container.classList.add(this._cssClass) : null;
      this._lblTaskTitle = this.getUIElementById("lblTaskTitle");
      this._lblTaskDescription = this.getUIElementById("lblTaskDescription");
      this._txtTaskTitle = this.getUIElementById("txtTaskTitle");
      this._txtTaskDescription = this.getUIElementById("txtTaskDescription");
      this.updateUI();
      this.setupDOMEventListeners();
      this.setupObjectEventHandlers();
    }
    /** Event handlers **/
    setupDOMEventListeners() {
      this._txtTaskTitle?.addEventListener("change", this.onTaskTitleChangeUI.bind(this));
      this._txtTaskDescription?.addEventListener("change", this.onTaskDescriptionChangeUI.bind(this));
    }
    setupObjectEventHandlers() {
      this._task.addEventListener(this._task.EVENT_UPDATED, this.onTaskUpdated.bind(this));
      this._task.addEventListener(this._task.EVENT_DESCRIPTION_UPDATED, this.onTaskDescriptionUpdated.bind(this));
    }
    onTaskTitleChangeUI(e) {
      this._task.title = e.target.value;
    }
    onTaskDescriptionChangeUI(e) {
      this._task.description = e.target.value;
    }
    onTaskDescriptionUpdated(e) {
      var args = e.detail;
      console.log(`Task description was updated: ` + args.description);
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
    console.log("App container found:", appContainer);
    const bootstrapper = new App(appContainer);
  }
  document.addEventListener("DOMContentLoaded", initializeApp);
})();
//# sourceMappingURL=bundle.js.map
