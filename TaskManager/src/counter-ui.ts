/**  src/counter-ui.ts  **/
import { Counter } from './counter.js';

// UI class for Counter component
export class CounterUI {
    private _container: HTMLElement;
    private _counter: Counter;

    private _lblCount: HTMLElement | null = null;
    private _btnIncrement: HTMLElement | null = null;
    private _btnDecrement: HTMLElement | null = null;
    private _btnReset: HTMLElement | null = null;

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
        console.log('Counter UI initialized');

        // Get the count display element
        this._lblCount = this.getUIElementById('count-display');

        this._btnIncrement = this.getUIElementById('increment-btn');
        this._btnDecrement = this.getUIElementById('decrement-btn');
        this._btnReset = this.getUIElementById('reset-btn');
        console.log('Buttons initialized:', this._btnIncrement, this._btnDecrement, this._btnReset);

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
        this._btnIncrement?.addEventListener('click', this.handleIncrement.bind(this));
        this._btnDecrement?.addEventListener('click', this.handleDecrement.bind(this));
        this._btnReset?.addEventListener('click', this.handleReset.bind(this));
    }

    private setupCounterEventHandlers(): void {
        // Use a single event listener for all counter events
        this._counter.addEventListener(this._counter.EVENT_CHANGED, this.onChange.bind(this));
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
        console.log('Counter triggered');
        const [newValue] = (e as CustomEvent).detail;
        console.log('Counter changed to: ', newValue);
    }

    /** Logic **/

    updateUI(): void {
        if (!this._lblCount) return;
        this._lblCount.textContent = this._counter.count.toString();
    }

}