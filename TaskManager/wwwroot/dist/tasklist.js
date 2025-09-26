import { EventEmitter } from "./baseclasses/EventHandling.js";
class Tasklist extends EventEmitter {
  constructor(initialTitle) {
    super();
    this._tasks = [];
    /** list of all valid events **/
    this.EVENT_TITLE_UPDATED = "title_updated";
    this.EVENT_TASK_ADDED = "task_added";
    this.EVENT_TASK_REMOVED = "task_removed";
    this._title = initialTitle;
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
    this.emit(this.EVENT_TITLE_UPDATED, {});
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
}
export {
  Tasklist
};
//# sourceMappingURL=tasklist.js.map
