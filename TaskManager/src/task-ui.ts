/**  src/task-ui.ts  **/
import { Task } from './task.js';

export class TaskUI {
    private _container: HTMLElement;
    private _task: Task;

    private _lblTaskTitle: HTMLElement | null = null
    private _lblTaskDescription: HTMLElement | null = null;

    private _design: string = `
            <div class="task-ui">
                <h1>Task</h1>
                <div id="task-title">NOT DEFINED</div>
                <div id="task-description"></div
            </div>
        `;


    /** Constructor and UI **/
    constructor(container: HTMLElement, task: Task) {
        this._container = container;
        this._task = task;

        // Render the counter UI
        this._container.innerHTML = this._design

        // Get the display elements to interact with
        this._lblTaskTitle = this.getUIElementById('task-title')
        this._lblTaskDescription = this.getUIElementById('task-description');

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
        //none
    }

    private setupCounterEventHandlers(): void {
        // Use a single event listener for all counter events
        this._task.addEventListener('updated', this.onTaskUpdated.bind(this));
    }

    private onTaskUpdated(e: Event): void {
        this.updateUI();
        console.log(`Task was updated`);
    }

    /** Logic **/

    updateUI(): void {
        if (!this._lblTaskDescription || !this._lblTaskTitle) return;

        this._lblTaskTitle.textContent = this._task.title.toString();
        this._lblTaskDescription.textContent = this._task.description.toString();
    }



}