class EventEmitter extends EventTarget {
  emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
export {
  EventEmitter
};
//# sourceMappingURL=EventHandling.js.map
