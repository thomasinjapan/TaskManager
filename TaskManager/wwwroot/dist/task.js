import { EventEmitter } from "./baseclasses/EventHandling.js";
class Task extends EventEmitter {
  // #endregion
  // #region Constructor
  constructor(initialTitle, initialDescription) {
    super();
    // #endregion
    // #region Events
    /** Fired when the title changes. Payload: {@link Task.event_payload_titleupdated}. */
    this.EVENT_TITLE_UPDATED = "title_updated";
    /** Fired when the description changes. Payload: {@link Task.event_payload_descriptionupdated}. */
    this.EVENT_DESCRIPTION_UPDATED = "description_updated";
    /** Fired on any property change, after the specific event. Payload: `{}`. */
    this.EVENT_UPDATED = "updated";
    this._title = initialTitle;
    this._description = initialDescription;
  }
  // #endregion
  // #region Properties
  /** The task title. */
  get title() {
    return this._title;
  }
  /**
   * Sets the task title and emits `title_updated` and `updated`.
   * @param value - New title string.
   */
  set title(value) {
    var oldtitle = this._title;
    var newtitle = value;
    var payload = { title_new: newtitle, title_old: oldtitle };
    this._title = value;
    this.emit(this.EVENT_TITLE_UPDATED, payload);
    this.emit(this.EVENT_UPDATED, {});
  }
  /** The task description. */
  get description() {
    return this._description;
  }
  /**
   * Sets the task description and emits `description_updated` and `updated`.
   * @param value - New description string.
   */
  set description(value) {
    var olddescription = this._description;
    var newdescription = value;
    var payload = { description_new: newdescription, description_old: olddescription };
    this._description = value;
    this.emit(this.EVENT_DESCRIPTION_UPDATED, payload);
    this.emit(this.EVENT_UPDATED, {});
  }
  // #endregion
}
export {
  Task
};
//# sourceMappingURL=task.js.map
