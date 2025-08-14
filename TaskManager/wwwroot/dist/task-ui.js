class TaskUI {
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
}
export {
  TaskUI
};
//# sourceMappingURL=task-ui.js.map
