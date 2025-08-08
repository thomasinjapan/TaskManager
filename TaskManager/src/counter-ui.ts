/**  src/counter-ui.ts  **/
import { Counter } from './counter.js';

// UI class for Counter component
export class CounterUI {
    private _container: HTMLElement;
    private _counter: Counter;

    private _ui_lblCount: HTMLElement | null = null;

    private _design: string = `
            <div class="counter-container">
                <h1>TypeScript Counter</h1>
                <div id="count-display">0</div>
                <div>
                    <button id="decrement-btn">Decrement</button>
                    <button id="reset-btn">Reset</button>
                    <button id="increment-btn">Increment</button>
                </div>
            </div>
        `;

    /** Constructor and UI **/
    constructor(container: HTMLElement, counter: Counter) {
        this._container = container;
        this._counter = counter;

        // Render the counter UI
        this._container.innerHTML = this._design

        // Get the count display element
        this._ui_lblCount = this.getUIElementById('count-display');

        // Initialize the display with current count
        this.updateUI();

        // Setup event listeners
        this.setupEventListeners();
        this.setupCounterEventHandlers();
    }

    private getUIElementById(id: string): HTMLElement | null {
        return this._container.querySelector(`#${id}`);
    }

    /** Event handlers **/
    private setupEventListeners(): void {
        const btnIncrement: HTMLElement | null = this.getUIElementById('increment-btn');
        const btnDecrement: HTMLElement | null = this.getUIElementById('decrement-btn');
        const btnReset: HTMLElement | null = this.getUIElementById('reset-btn');

        if (btnIncrement) {
            btnIncrement.addEventListener('click', this.handleIncrement.bind(this));
        }

        if (btnDecrement) {
            btnDecrement.addEventListener('click', this.handleDecrement.bind(this));
        }

        if (btnReset) {
            btnReset.addEventListener('click', this.handleReset.bind(this));
        }
    }

    private setupCounterEventHandlers(): void {
        // Use a single event listener for all counter events
        this._counter.addEventListener('change', this.onChange.bind(this));
    }

    private handleIncrement(): void {
        const newCount = this._counter.increment();
        this.updateUI();
    }

    private handleDecrement(): void {
        const newCount = this._counter.decrement();
        this.updateUI();
    }

    private handleReset(): void {
        const newCount = this._counter.reset();
        this.updateUI();
    }

    private onChange(e: Event): void {
        console.log(`Counter triggered`);
        const [newValue] = (e as CustomEvent).detail;
        console.log(`Counter changed to: ${newValue}`);
    }

    /** Logic **/

    updateUI(): void {
        if (!this._ui_lblCount) return;
        this._ui_lblCount.textContent = this._counter.count.toString();
    }



}