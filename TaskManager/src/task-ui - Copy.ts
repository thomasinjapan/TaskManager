/**  src/task-ui.ts  **/
import { Task } from './task.js';

export class TaskUI {
    private _container: HTMLElement;
    private _task: Task;

    private _lblTaskTitle: HTMLElement | null = null
    private _lblTaskDescription: HTMLElement | null = null;

    private _txtTaskTitle: HTMLInputElement | null = null;
    private _txtTaskDescription: HTMLTextAreaElement | null = null;

    /** design info **/
    private _cssClass: string = 'task-ui';
    private _design: string = `
            <h1>Task</h1>
            <div id="lblTaskTitle">NOT DEFINED</div>
            <input type="text" id="txtTaskTitle" />
            <div id="lblTaskDescription"></div>
            <textarea id="txtTaskDescription"></textarea>
        `;

    /** Constructor and UI **/
    constructor(container: HTMLElement, task: Task) {
        this._container = container;
        this._task = task;

        // Render the counter 
        this._container.innerHTML = this._design
        this._cssClass ? this._container.classList.add(this._cssClass) : null;
 

        // Get the display elements to interact with
        this._lblTaskTitle = this.getUIElementById<HTMLElement>('lblTaskTitle')
        this._lblTaskDescription = this.getUIElementById<HTMLElement>('lblTaskDescription');

        this._txtTaskTitle = this.getUIElementById<HTMLInputElement>('txtTaskTitle')
        this._txtTaskDescription = this.getUIElementById<HTMLTextAreaElement>('txtTaskDescription');

        // Initialize the display with current count
        this.updateUI();

        // Setup event listeners
        this.setupDOMEventListeners();
        this.setupObjectEventHandlers();
    }

    private getUIElementById<T extends HTMLElement>(id: string): T | null {
        var containerr: HTMLElement | null = this._container.querySelector(`#${id}`);
        console.log(`root container: `, this._container)
        console.log(`Searching for element with id '${id}' in container: `, containerr);

        return this._container.querySelector(`#${id}`) as T | null;
    }

    /** Event handlers **/
    private setupDOMEventListeners(): void {
        this._txtTaskTitle?.addEventListener('change', this.onTaskTitleChangeUI.bind(this));
        this._txtTaskDescription?.addEventListener('change', this.onTaskDescriptionChangeUI.bind(this));
    }

    private setupObjectEventHandlers(): void {
        this._task.addEventListener(this._task.EVENT_UPDATED, this.onTaskUpdated.bind(this));
        //this._task.addEventListener(this._task.EVENT_TITLE_UPDATED, this.onTaskUpdated.bind(this));
        this._task.addEventListener(this._task.EVENT_DESCRIPTION_UPDATED, this.onTaskDescriptionUpdated.bind(this));
    }

    private onTaskTitleChangeUI(e: Event): void {
        this._task.title = (e.target as HTMLInputElement).value;
    }

    private onTaskDescriptionChangeUI(e: Event): void {
        this._task.description = (e.target as HTMLTextAreaElement).value;
    }

    private onTaskDescriptionUpdated(e: Event): void {
        var args = (e as CustomEvent<any>).detail as Task.structPayloadDescription;
        console.log(`Task description was updated: ` + args.description);
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