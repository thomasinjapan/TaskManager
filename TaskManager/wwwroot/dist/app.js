import { Counter } from "./counter.js";
import { Task } from "./task.js";
import { Tasklist } from "./tasklist.js";
import { TasklistUI } from "./tasklist-ui.js";
class App {
  /** Constructor and UI **/
  constructor(container) {
    this._design = `
            <div id="counter2-ui"></div><br />
            <!-- <div id="task-ui"></div><br /> --!>
            <div id="tasklist-ui"></div>
        `;
    this._container = container;
    this._container.innerHTML = this._design;
    this.initializeObjects();
  }
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
  }
  initializeObjects() {
    const counterContainer = this.getUIElementById("counter-ui2");
    const taskListContainer = this.getUIElementById("tasklist-ui");
    counterContainer.counter = new Counter();
    const task1 = new Task("New Task 1", "New Description 1");
    const task2 = new Task("New Task 2", "New Description 2");
    const tasklist = new Tasklist("New Tasklist");
    tasklist.addTask(task1);
    tasklist.addTask(task2);
    const tasklistUI = new TasklistUI(taskListContainer, tasklist);
  }
}
export {
  App
};
//# sourceMappingURL=app.js.map
