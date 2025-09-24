class TaskUI {
  /** Constructor and UI **/
  constructor(container, task) {
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
    this._container = container;
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
  getUIElementById(id) {
    var containerr = this._container.querySelector(`#${id}`);
    console.log(`root container: `, this._container);
    console.log(`Searching for element with id '${id}' in container: `, containerr);
    return this._container.querySelector(`#${id}`);
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
}
export {
  TaskUI
};
//# sourceMappingURL=task-ui%20-%20Copy.js.map
