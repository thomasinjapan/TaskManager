class BaseUI {
  /** Constructor and UI **/
  constructor(container) {
    /** design info **/
    this._cssClass = "";
    this._design = "";
    this._container = container;
  }
  /** Logic **/
  /** initializes the UI with current design and css class info*/
  initializeUI() {
    this._container.innerHTML = this._design;
    this._cssClass ? this._container.classList.add(this._cssClass) : null;
  }
  /**
   * gets html element by id from the container
   * @param id id of the element to get
   * @returns element with the specified id or null if not found
   */
  getUIElementById(id) {
    return this._container.querySelector(`#${id}`);
  }
}
export {
  BaseUI
};
//# sourceMappingURL=baseui.js.map
