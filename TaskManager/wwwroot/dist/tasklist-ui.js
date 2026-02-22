import { BaseUI } from "./baseclasses/baseui.js";
import { TaskUI } from "./task-ui.js";
class TasklistUI extends BaseUI {
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
}
export {
  TasklistUI
};
//# sourceMappingURL=tasklist-ui.js.map
