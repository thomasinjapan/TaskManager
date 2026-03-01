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
    /**
     * gets title of the task
     * @returns Task 
     */
    get title() {
      return this._title;
    }
    /**
     * sets title of of the task
     * @param {number} value new title
     * @returns nothing
     * @emits title that was changed
     * @emits info that event was updated
     
     */
    set title(value) {
      var oldtitle = this._title;
      var newtitle = value;
      var payload = { title_new: newtitle, title_old: oldtitle };
      this._title = value;
      this.emit(this.EVENT_TITLE_UPDATED, payload);
      this.emit(this.EVENT_UPDATED, {});
    }
    get description() {
      return this._description;
    }
    set description(value) {
      var olddescription = this._description;
      var newdescription = value;
      var payload = { description_new: newdescription, description_old: olddescription };
      this._description = value;
      this.emit(this.EVENT_DESCRIPTION_UPDATED, payload);
      this.emit(this.EVENT_UPDATED, {});
    }
  };

  // src/tasklist.ts
  var Tasklist = class extends EventEmitter {
    constructor(initialTitle) {
      super();
      this._tasks = [];
      /** list of all valid events **/
      this.EVENT_TITLE_UPDATED = "title_updated";
      this.EVENT_TASK_ADDED = "task_added";
      this.EVENT_TASK_REMOVED = "task_removed";
      this.EVENT_TASKLIST_CLEARED = "tasklist_cleared";
      this._title = initialTitle;
      this._tasks = [];
    }
    get title() {
      return this._title;
    }
    set title(value) {
      var oldTitle = this._title;
      var newTitle = value;
      var payload = { title_old: oldTitle, title_new: newTitle };
      this._title = value;
      this.emit(this.EVENT_TITLE_UPDATED, payload);
    }
    get tasks() {
      return this._tasks;
    }
    addTask(task) {
      this._tasks.push(task);
      this.emit(this.EVENT_TASK_ADDED, { newTask: task, newCount: this._tasks.length });
    }
    removeTask(task) {
      const index = this._tasks.indexOf(task);
      if (index !== -1) {
        this._tasks.splice(index, 1);
        this.emit(this.EVENT_TASK_REMOVED, { deletedTask: task });
      }
    }
    clearTasks() {
      this._tasks = [];
      this.emit(this.EVENT_TASKLIST_CLEARED, {});
    }
  };

  // src/baseclasses/baseui.ts
  var BaseUI = class extends HTMLElement {
    /** Constructor and UI **/
    constructor(container) {
      super();
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
      this._task.addEventListener(this._task.EVENT_TITLE_UPDATED, this.onTaskTitleUpdated.bind(this));
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
      console.log(`Task description was updated: from ` + args.description_old + ` to ` + args.description_new);
    }
    onTaskTitleUpdated(e) {
      var args = e.detail;
      console.log(`Task title was updated: from ` + args.title_old + ` to ` + args.title_new);
    }
    onTaskUpdated(e) {
      this.updateUI();
      console.log(`Task updated`);
    }
    /** Logic **/
    updateUI() {
      if (!this._lblTaskDescription || !this._lblTaskTitle) return;
      this._lblTaskTitle.textContent = this._task.title.toString();
      this._lblTaskDescription.textContent = this._task.description.toString();
    }
  };

  // src/tasklist-ui.ts
  var TasklistUI = class extends BaseUI {
    /** Constructor and UI **/
    constructor(container, tasklist) {
      super(container);
      this._lblTasklistTitle = null;
      this._txtTasklistTitle = null;
      this._lstTasklist = null;
      /** design info **/
      this._cssClass = "tasklist-ui";
      this._design = `
            <h1>Task</h1>
            <div id="lblTasklistTitle">NOT DEFINED</div>
            <input type="text" id="txtTasklistTitle" />
            <ol id="lstTasklist"></ol>"
        `;
      this.initializeUI();
      this._tasklist = tasklist;
      this._lblTasklistTitle = this.getUIElementById("lblTasklistTitle");
      this._txtTasklistTitle = this.getUIElementById("txtTasklistTitle");
      this._lstTasklist = this.getUIElementById("lstTasklist");
      this.updateUI();
      this.setupDOMEventListeners();
      this.setupObjectEventHandlers();
    }
    /** Event handlers **/
    setupDOMEventListeners() {
      this._txtTasklistTitle?.addEventListener("change", this.onTaskListTitleChangeUI.bind(this));
    }
    setupObjectEventHandlers() {
      this._tasklist.addEventListener(this._tasklist.EVENT_TITLE_UPDATED, this.onTaskTitleUpdated.bind(this));
      this._tasklist.addEventListener(this._tasklist.EVENT_TASK_ADDED, this.onTaskAdded.bind(this));
      this._tasklist.addEventListener(this._tasklist.EVENT_TASK_REMOVED, this.onTaskRemoved.bind(this));
      this._tasklist.addEventListener(this._tasklist.EVENT_TASKLIST_CLEARED, this.onTasklistCleared.bind(this));
    }
    onTaskListTitleChangeUI(e) {
      this._tasklist.title = e.target.value;
    }
    onTaskTitleUpdated(e) {
      var args = e.detail;
      console.log(`Tasklist title was updated: from ` + args.title_old + ` to ` + args.title_new);
    }
    onTaskAdded(e) {
      var args = e.detail;
      console.log(`Tasklist got a new task:  ` + args.newTask.title + ` and the list has now ` + args.newCount + ` items.`);
    }
    onTaskRemoved(e) {
      var args = e.detail;
      console.log(`Tasklist had a task removed:  ` + args.deletedTask.title);
    }
    onTasklistCleared(e) {
      console.log(`Tasklist was cleared of all tasks.`);
    }
    /** Logic **/
    updateUI() {
      if (!this._lblTasklistTitle || !this._lstTasklist) return;
      this._lblTasklistTitle.textContent = this._tasklist.title.toString();
      this._tasklist.tasks.forEach(
        (task) => {
          var listItem = document.createElement("li");
          var taskItem = new TaskUI(listItem, task);
          this._lstTasklist?.appendChild(listItem);
        }
      );
    }
  };

  // src/app.ts
  var App = class {
    /** Constructor and UI **/
    constructor(container) {
      this._design = `
            <div id="counter2-ui"></div><br />
            <!-- <div id="task-ui"></div><br /> --!>
            <div id="tasklist-ui"></div>
        `;
      this._container = container;
      this._container.innerHTML = this._design;
      this.initializeObjects();
    }
    getUIElementById(id) {
      return this._container.querySelector(`#${id}`);
    }
    initializeObjects() {
      const counterContainer = this.getUIElementById("counter-ui2");
      const taskListContainer = this.getUIElementById("tasklist-ui");
      counterContainer.counter = new Counter();
      const task1 = new Task("New Task 1", "New Description 1");
      const task2 = new Task("New Task 2", "New Description 2");
      const tasklist = new Tasklist("New Tasklist");
      tasklist.addTask(task1);
      tasklist.addTask(task2);
      const tasklistUI = new TasklistUI(taskListContainer, tasklist);
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
