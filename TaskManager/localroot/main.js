"use strict";
(() => {
  // src/counter.ts
  var Counter = class {
    constructor() {
      this.value = 0;
    }
    increment() {
      return ++this.value;
    }
    decrement() {
      return --this.value;
    }
    getValue() {
      return this.value;
    }
  };

  // src/counterUI.ts
  var CounterUI = class {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.counter = new Counter();
      this.render();
    }
    render() {
      this.container.innerHTML = `
      <h1>Counter: <span id="value">${this.counter.getValue()}</span></h1>
      <button id="inc">+</button>
      <button id="dec">-</button>
    `;
      document.getElementById("inc").addEventListener("click", () => this.update(this.counter.increment()));
      document.getElementById("dec").addEventListener("click", () => this.update(this.counter.decrement()));
    }
    update(value) {
      const valueElement = document.getElementById("value");
      if (valueElement) {
        valueElement.textContent = value.toString();
      }
    }
  };

  // src/main.ts
  document.addEventListener("DOMContentLoaded", () => {
    new CounterUI("app");
  });
})();
//# sourceMappingURL=main.js.map
