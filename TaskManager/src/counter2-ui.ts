/**  src/counter-ui.ts  **/
import { BaseUI } from './baseclasses/baseui.js';
import { Counter } from './counter.js';

// UI class for Counter component
export class CounterUI2 extends HTMLElement {
    private _counter: Counter = new Counter();

    private _lblCount: HTMLElement | null = null;
    private _btnIncrement: HTMLElement | null = null;
    private _btnDecrement: HTMLElement | null = null;
    private _btnReset: HTMLElement | null = null;

    _cssClass: string = `counter-container`;
    _design: string = `
                <h1>TypeScript Counter</h1>
                <div id="lblCount">0</div>
                <div>
                    <button id="cmdDecrement">Decrement</button>
                    <button id="cmdReset">Reset</button>
                    <button id="cmdIncrement">Increment</button>
                </div>
         `;

    /** Constructor and UI **/
    constructor(counter?: Counter) {
        /** start initialize UI - dont change**/
        super();

        //** use counter from external else set up own counter*/
        counter ? this._counter = counter : this._counter = new Counter();
    }

    /** Called when element is inserted into the DOM **/
    connectedCallback(): void {
        // Render the counter 
        this.innerHTML = this._design
        this._cssClass ? this.classList.add(this._cssClass) : null;
        /** end initialize UI **/

        // Get the count display element
        this._lblCount = this.getUIElementById('lblCount');

        this._btnIncrement = this.getUIElementById('cmdIncrement');
        this._btnDecrement = this.getUIElementById('cmdDecrement');
        this._btnReset = this.getUIElementById('cmdReset');

        // Initialize the display with current count
        this.updateUI();

        // Setup event listeners
        this.setupEventListeners();
        this.setupCounterEventHandlers();
    }


    /**
    * gets html element by id from the container
    * @param id id of the element to get
    * @returns element with the specified id or null if not found
    */
    public getUIElementById<T extends HTMLElement>(id: string): T | null {
        return this.querySelector(`#${id}`) as T | null;
    }

    set counter(counter: Counter) {
        this._counter = counter;
    }

    get counter(): Counter {
        return this._counter;
    }


    /** Event handlers **/
    private setupEventListeners(): void {
        this._btnIncrement?.addEventListener('click', this.onUIIncrement.bind(this));
        this._btnDecrement?.addEventListener('click', this.onUIDecrement.bind(this));
        this._btnReset?.addEventListener('click', this.onUIReset.bind(this));
    }

    private setupCounterEventHandlers(): void {
        // Use a single event listener for all counter events
        this._counter.addEventListener(this._counter.EVENT_CHANGED, this.onCounterChange.bind(this));
    }

    private onUIIncrement(): void {
        const newCount = this._counter.increment();
        this.updateUI();
    }

    private onUIDecrement(): void {
        const newCount = this._counter.decrement();
        this.updateUI();
    }

    private onUIReset(): void {
        const newCount = this._counter.reset();
        this.updateUI();
    }

    private onCounterChange(e: Event): void {
        const args = <Counter.payloadChanged>(e as CustomEvent).detail;
        console.log('Counter changed');
        console.log('Counter changed from : ', args.oldCount);
        console.log('Counter changed to: ', args.newCount);
        console.log('Counter change delta: ', args.delta);
    }

    /** Logic **/

    updateUI(): void {
        if (!this._lblCount) return;
        this._lblCount.textContent = this._counter.count.toString();
    }
}

