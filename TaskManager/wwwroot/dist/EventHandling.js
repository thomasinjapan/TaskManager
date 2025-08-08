class EventEmitter extends EventTarget {
  emit(type, args) {
    this.dispatchEvent(new CustomEvent(type, { detail: args }));
  }
}
export {
  EventEmitter
};
//# sourceMappingURL=EventHandling.js.map
