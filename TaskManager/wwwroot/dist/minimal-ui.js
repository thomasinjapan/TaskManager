class MinimalUI extends HTMLElement {
  // #endregion
  // #region Constructor
  constructor() {
    super();
    // #region Fields
    this._cssClass = null;
    this._design = `
                <h1>Minimal Header</h1>
         `;
  }
  // #endregion
  // #region Lifecycle
  /** Called when the element is inserted into the DOM. */
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
  // #endregion
  // #region DOM
  /**
   * Queries an element by id within this component's subtree.
   * @param id - The element id to search for.
   * @returns The element cast to T, or null if not found.
   */
  getUIElementById(id) {
    return this.querySelector(`#${id}`);
  }
  // #endregion
  // #region Event Handlers
  setupEventListeners() {
  }
  setupObjectsEventHandlers() {
  }
  // #endregion
  // #region UI
  updateUI() {
  }
  // #endregion
}
export {
  MinimalUI
};
//# sourceMappingURL=minimal-ui.js.map
