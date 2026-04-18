class EventEmitter extends EventTarget {
  /**
   * Dispatches a typed CustomEvent on this object.
   * @param type - Event name (e.g. 'changed', 'task_added')
   * @param detail - Strongly-typed payload attached to the event
   */
  emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
export {
  EventEmitter
};
//# sourceMappingURL=EventHandling.js.map
