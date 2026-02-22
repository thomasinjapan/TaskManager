import { EventEmitter } from "./baseclasses/EventHandling.js";
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
}
export {
  Task
};
//# sourceMappingURL=task.js.map
