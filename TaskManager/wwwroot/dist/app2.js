import { CounterUI2 } from "./counter2-ui.js";
import { MinimalUI } from "./minimal-ui.js";
import { MinimalUI2 } from "./minimal-ui2.js";
!customElements.get("minimal-ui") ? customElements.define("minimal-ui", MinimalUI) : null;
!customElements.get("minimal-ui2") ? customElements.define("minimal-ui2", MinimalUI2) : null;
!customElements.get("counter2-ui") ? customElements.define("counter2-ui", CounterUI2) : null;
class App2 extends HTMLElement {
  //private _design: string = `
  //        <div id="counter2-ui"></div><br />
  //        <!-- <div id="task-ui"></div><br /> --!>
  //        <div id="tasklist-ui"></div>
  //    `;
  // #endregion
  // #region Constructor
  constructor() {
    super();
    // #region Fields
    this._design = `
            <minimal-ui id="minimal-ui"></minimal-ui><br />
            <minimal-ui2 id="minimal-ui2"></minimal-ui2><br />
            <counter2-ui id="counter2-ui"></counter2-ui><br />
        `;
  }
  // #endregion
  // #region Lifecycle
  /** Called when the element is inserted into the DOM. */
  connectedCallback() {
    this.innerHTML = this._design;
    requestAnimationFrame(() => {
      this.initializeObjects();
    });
  }
  // #endregion
  // #region DOM
  /** Queries a child element by id within this component's subtree. */
  getUIElementById(id) {
    return this.querySelector(`#${id}`);
  }
  // #endregion
  // #region Methods
  /** Locates child components and wires them to their domain models. */
  initializeObjects() {
    const minimalContainer = this.getUIElementById("minimal-ui");
    const minimalContainer2 = this.getUIElementById("minimal-ui2");
    const counter2Container = this.getUIElementById("counter2-ui");
    minimalContainer ? console.log("Minimal container found:", minimalContainer) : console.error("Minimal container not found");
    minimalContainer2 ? console.log("Minimal2 container found:", minimalContainer2) : console.error("Minimal2 container not found");
    counter2Container ? console.log("Counter2 container found:", counter2Container) : console.error("Counter2 container not found");
  }
  // #endregion
}
export {
  App2
};
//# sourceMappingURL=app2.js.map
