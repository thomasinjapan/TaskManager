/**  src/counter-ui.ts  **/
import { BaseUI } from './baseclasses/baseui.js';
import { Counter } from './counter.js';

// UI class for Counter component
export class CounterUI extends BaseUI {
    private _counter: Counter;

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
    constructor(container: HTMLElement, counter: Counter) {
        /** start initialize UI - dont change**/
        super(container);
        this.initializeUI();
        /** end initialize UI **/

        // get all objects
        this._counter = counter;

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
        console.log('Counter triggered');
        console.log('Counter changed to: ', args.newCount);
    }

    /** Logic **/

    updateUI(): void {
        if (!this._lblCount) return;
        this._lblCount.textContent = this._counter.count.toString();
    }
}

