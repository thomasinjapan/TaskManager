import { MinimalUI } from "./minimal-ui.js";
customElements.define("minimal-ui", MinimalUI);
class App {
  //private _design: string = `
  //        <div id="counter2-ui"></div><br />
  //        <!-- <div id="task-ui"></div><br /> --!>
  //        <div id="tasklist-ui"></div>
  //    `;
  /** Constructor and UI **/
  constructor(container) {
    this._design = `
            <minimal-ui id="minimal-ui"/><br />
        `;
    this._container = container;
    this._container.innerHTML = this._design;
    this.initializeObjects();
  }
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
  }
  initializeObjects() {
    const minimalContainer = this.getUIElementById("minimal-ui");
    minimalContainer ? console.log("Minimal container found:", minimalContainer) : console.error("Minimal container not found");
  }
}
export {
  App
};
//# sourceMappingURL=app.js.map
