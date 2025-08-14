import { Counter } from "./counter.js";
import { Task } from "./task.js";
import { CounterUI } from "./counter-ui.js";
import { TaskUI } from "./task-ui.js";
class App {
  /** Constructor and UI **/
  constructor(container) {
    this._design = `
            <div id="counter-ui"></div><br />
            <div id="task-ui"></div><br />
        `;
    this._container = container;
    this._container.innerHTML = this._design;
    this.initializeObjects();
  }
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
  }
  initializeObjects() {
    const counterContainer = this.getUIElementById("counter-ui");
    const taskContainer = this.getUIElementById("task-ui");
    const counter = new Counter();
    const task = new Task("New Task", "New Description");
    const counterUI = new CounterUI(counterContainer, counter);
    const taskUI = new TaskUI(taskContainer, task);
  }
}
export {
  App
};
//# sourceMappingURL=app.js.map
