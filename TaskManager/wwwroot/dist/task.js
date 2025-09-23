import { EventEmitter } from "./EventHandling.js";
class Task extends EventEmitter {
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
}
export {
  Task
};
//# sourceMappingURL=task.js.map
