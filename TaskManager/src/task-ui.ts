/**  src/task-ui.ts  **/
import { Task } from './task.js';

export class TaskUI {
    private _container: HTMLElement;
    private _task: Task;

    private _lblTaskTitle: HTMLElement | null = null
    private _lblTaskDescription: HTMLElement | null = null;

    private _txtTaskTitle: HTMLInputElement | null = null;
    private _txtTaskDescription: HTMLTextAreaElement | null = null;

    private _design: string = `
            <div class="task-ui">
                <h1>Task</h1>
                <div id="task-title">NOT DEFINED</div>
                <input type="text" id="task-title-edit" />
                <div id="task-description"></div>
                <textarea id="task-description-edit"></textarea>
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

        this._txtTaskTitle = this.getUIInputElementById('task-title-edit')
        this._txtTaskDescription = this.getUITextAreaElementById('task-description-edit');

        // Initialize the display with current count
        this.updateUI();

        // Setup event listeners
        this.setupDOMEventListeners();
        this.setupObjectEventHandlers();
    }

    private getUIElementById(id: string): HTMLElement | null {
        return this._container.querySelector(`#${id}`);
    }

    private getUIInputElementById(id: string): HTMLInputElement | null {
        return this._container.querySelector(`#${id}`);
    }

    private getUITextAreaElementById(id: string): HTMLTextAreaElement | null {
        return this._container.querySelector(`#${id}`);
    }

    /** Event handlers **/
    private setupDOMEventListeners(): void {
        this._txtTaskTitle?.addEventListener('change', this.onTaskTitleChange.bind(this));
        this._txtTaskDescription?.addEventListener('change', this.onTaskDescriptionChange.bind(this));
    }

    private setupObjectEventHandlers(): void {
        // Use a single event listener for all counter events
        this._task.addEventListener(this._task.EVENT_UPDATED, this.onTaskUpdated.bind(this));
    }

    private onTaskTitleChange(e: Event): void {
        this._task.title = (e.target as HTMLInputElement).value;
    }

    private onTaskDescriptionChange(e: Event): void {
        this._task.description = (e.target as HTMLTextAreaElement).value;
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