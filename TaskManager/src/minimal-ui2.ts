/**  src/counter-ui.ts  **/
import { BaseUI } from './baseclasses/baseui.js';
import { Counter } from './counter.js';

// UI class for Counter component
export class MinimalUI2 extends HTMLElement {
    _cssClass: string | null = null;
    _design: string = `
                <h1>Minimal Header 2</h1>
         `;

    /** Constructor and UI **/
    constructor() {
        /** start initialize UI - dont change**/
        super();
    }

    /** Called when element is inserted into the DOM **/
    connectedCallback(): void {
        console.log('Initializing MinimalUI');

        this.innerHTML = this._design;
        console.log('innerHTML set in MinimalUI:', this._design);

        this._cssClass ? this.classList.add(this._cssClass) : null;
        /** end initialize UI **/

        // Initialize the display with current count
        this.updateUI();

        // Setup event listeners
        this.setupEventListeners();
        this.setupObjectsEventHandlers();

        console.log('MinimalUI initialized successfully');
    }

    /**
    * gets html element by id from the container
    * @param id id of the element to get
    * @returns element with the specified id or null if not found
    */
    public getUIElementById<T extends HTMLElement>(id: string): T | null {
        return this.querySelector(`#${id}`) as T | null;
    }

    /** Event handlers **/
    private setupEventListeners(): void {
        /** nothing here yet */
    }

    private setupObjectsEventHandlers(): void {
        /** nothing here yet */
    }

    /** Logic **/

    updateUI(): void {

        /** nothing here yet */

        //if (!this._lblCount) return;
        //this._lblCount.textContent = this._counter.count.toString();
    }
}

