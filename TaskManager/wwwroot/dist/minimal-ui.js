class MinimalUI extends HTMLElement {
  /** Constructor and UI **/
  constructor() {
    super();
    this._cssClass = null;
    this._design = `
                <h1>Minimal Header</h1>
         `;
  }
  /** Called when element is inserted into the DOM **/
  connectedCallback() {
    console.log("Initializing MinimalUI");
    this.innerHTML = this._design;
    console.log("innerHTML set in MinimalUI:", this._design);
    this._cssClass ? this.classList.add(this._cssClass) : null;
    this.updateUI();
    this.setupEventListeners();
    this.setupObjectsEventHandlers();
    console.log("MinimalUI initialized successfully");
  }
  /**
  * gets html element by id from the container
  * @param id id of the element to get
  * @returns element with the specified id or null if not found
  */
  getUIElementById(id) {
    return this.querySelector(`#${id}`);
  }
  /** Event handlers **/
  setupEventListeners() {
  }
  setupObjectsEventHandlers() {
  }
  /** Logic **/
  updateUI() {
  }
}
export {
  MinimalUI
};
//# sourceMappingURL=minimal-ui.js.map
