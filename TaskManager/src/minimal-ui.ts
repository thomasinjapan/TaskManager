/** src/minimal-ui.ts */

import { BaseUI } from './baseclasses/baseui.js';
import { Counter } from './counter.js';

/**
 * Minimal example custom element `<minimal-ui>`.
 * Serves as a template for learning the custom element lifecycle.
 */
export class MinimalUI extends HTMLElement {

    // #region Fields
    _cssClass: string | null = null;
    _design: string = `
                <h1>Minimal Header</h1>
         `;
    // #endregion

    // #region Constructor
    constructor() {
        super();
    }
    // #endregion

    // #region Lifecycle
    /** Called when the element is inserted into the DOM. */
    connectedCallback(): void {
        console.log('Initializing MinimalUI');

        this.innerHTML = this._design;
        console.log('innerHTML set in MinimalUI:', this._design);

        this._cssClass ? this.classList.add(this._cssClass) : null;

        this.updateUI();
        this.setupEventListeners();
        this.setupObjectsEventHandlers();

        console.log('MinimalUI initialized successfully');
    }
    // #endregion

    // #region DOM
    /**
     * Queries an element by id within this component's subtree.
     * @param id - The element id to search for.
     * @returns The element cast to T, or null if not found.
     */
    public getUIElementById<T extends HTMLElement>(id: string): T | null {
        return this.querySelector(`#${id}`) as T | null;
    }
    // #endregion

    // #region Event Handlers
    private setupEventListeners(): void {
        /** nothing here yet */
    }

    private setupObjectsEventHandlers(): void {
        /** nothing here yet */
    }
    // #endregion

    // #region UI
    updateUI(): void {
        /** nothing here yet */

        //if (!this._lblCount) return;
        //this._lblCount.textContent = this._counter.count.toString();
    }
    // #endregion
}
