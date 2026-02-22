import { EventEmitter } from "./baseclasses/EventHandling.js";
class Tasklist extends EventEmitter {
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
}
export {
  Tasklist
};
//# sourceMappingURL=tasklist.js.map
