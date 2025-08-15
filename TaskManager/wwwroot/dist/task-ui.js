class TaskUI {
  /** Constructor and UI **/
  constructor(container, task) {
    this._lblTaskTitle = null;
    this._lblTaskDescription = null;
    this._txtTaskTitle = null;
    this._txtTaskDescription = null;
    this._design = `
            <div class="task-ui">
                <h1>Task</h1>
                <div id="lblTaskTitle">NOT DEFINED</div>
                <input type="text" id="txtTaskTitle" />
                <div id="lblTaskDescription"></div>
                <textarea id="txtTaskDescription"></textarea>
            </div>
        `;
    this._container = container;
    this._task = task;
    this._container.innerHTML = this._design;
    this._lblTaskTitle = this.getUIElementById("lblTaskTitle");
    this._lblTaskDescription = this.getUIElementById("lblTaskDescription");
    this._txtTaskTitle = this.getUIElementById("txtTaskTitle");
    this._txtTaskDescription = this.getUIElementById("txtTaskDescription");
    this.updateUI();
    this.setupDOMEventListeners();
    this.setupObjectEventHandlers();
  }
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
  }
  /** Event handlers **/
  setupDOMEventListeners() {
    this._txtTaskTitle?.addEventListener("change", this.onTaskTitleChange.bind(this));
    this._txtTaskDescription?.addEventListener("change", this.onTaskDescriptionChange.bind(this));
  }
  setupObjectEventHandlers() {
    this._task.addEventListener(this._task.EVENT_UPDATED, this.onTaskUpdated.bind(this));
  }
  onTaskTitleChange(e) {
    this._task.title = e.target.value;
  }
  onTaskDescriptionChange(e) {
    this._task.description = e.target.value;
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
