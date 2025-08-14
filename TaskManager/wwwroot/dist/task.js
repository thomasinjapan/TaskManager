import { EventEmitter } from "./EventHandling.js";
class Task extends EventEmitter {
  constructor(initialTitle, initialDescription) {
    super();
    this._title = initialTitle;
    this._description = initialDescription;
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
    this.emit("title_updated", []);
    this.emit("updated", []);
  }
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
    this.emit("description_updated", []);
    this.emit("updated", []);
  }
}
export {
  Task
};
//# sourceMappingURL=task.js.map
