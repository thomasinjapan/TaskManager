import { EventEmitter } from "./baseclasses/EventHandling.js";
class Tasklist extends EventEmitter {
  // #endregion
  // #region Constructor
  constructor(initialTitle) {
    super();
    this._tasks = [];
    // #endregion
    // #region Events
    /** Fired when the title changes. Payload: {@link Tasklist.event_payload_payloadTitleupdated}. */
    this.EVENT_TITLE_UPDATED = "title_updated";
    /** Fired when a task is added. Payload: {@link Tasklist.event_payload_TaskAdded}. */
    this.EVENT_TASK_ADDED = "task_added";
    /** Fired when a task is removed. Payload: {@link Tasklist.event_payload_TaskRemoved}. */
    this.EVENT_TASK_REMOVED = "task_removed";
    /** Fired when all tasks are cleared. Payload: `{}`. */
    this.EVENT_TASKLIST_CLEARED = "tasklist_cleared";
    this._title = initialTitle;
    this._tasks = [];
  }
  // #endregion
  // #region Properties
  /** The list title. Setting this emits `title_updated`. */
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
  /** Read-only snapshot of the current task array. */
  get tasks() {
    return this._tasks;
  }
  // #endregion
  // #region Methods
  /** Appends a task and emits `task_added`. */
  addTask(task) {
    this._tasks.push(task);
    this.emit(this.EVENT_TASK_ADDED, { newTask: task, newCount: this._tasks.length });
  }
  /** Removes a task by reference and emits `task_removed`. No-op if not found. */
  removeTask(task) {
    const index = this._tasks.indexOf(task);
    if (index !== -1) {
      this._tasks.splice(index, 1);
      this.emit(this.EVENT_TASK_REMOVED, { deletedTask: task });
    }
  }
  /** Removes all tasks and emits `tasklist_cleared`. */
  clearTasks() {
    this._tasks = [];
    this.emit(this.EVENT_TASKLIST_CLEARED, {});
  }
  // #endregion
}
export {
  Tasklist
};
//# sourceMappingURL=tasklist.js.map
