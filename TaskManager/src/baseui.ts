/**  src/baseui.ts  **/

export class BaseUI {
    _container: HTMLElement;

    /** design info **/
    _cssClass: string = '';
    _design: string = '';

    /** Constructor and UI **/
    constructor(container: HTMLElement) {
        this._container = container;
    }


    /** Logic **/

    /** initializes the UI with current design and css class info*/
    initializeUI(): void {
        // Render the counter 
        this._container.innerHTML = this._design
        this._cssClass ? this._container.classList.add(this._cssClass) : null;
    }

    /**
     * gets html element by id from the container
     * @param id id of the element to get
     * @returns element with the specified id or null if not found
     */
    public getUIElementById<T extends HTMLElement>(id: string): T | null {
        return this._container.querySelector(`#${id}`) as T | null;
    }

}