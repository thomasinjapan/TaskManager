/**  src/task-ui.ts  **/
import { BaseUI } from './baseclasses/baseui.js';
import { TaskUI } from './task-ui.js' ;
import { Tasklist } from './tasklist.js';

export class TasklistUI extends BaseUI {
    private _tasklist: Tasklist;

    private _lblTasklistTitle: HTMLElement | null = null
    private _txtTasklistTitle: HTMLInputElement | null = null;
    private _lstTasklist: HTMLElement | null = null;

    /** design info **/
    _cssClass: string = 'tasklist-ui';
    _design: string = `
            <h1>Task</h1>
            <div id="lblTasklistTitle">NOT DEFINED</div>
            <input type="text" id="txtTasklistTitle" />
            <ol id="lstTasklist"></ol>"
        `;

    /** Constructor and UI **/
    constructor(container: HTMLElement, tasklist: Tasklist) {
        super(container);
        this.initializeUI();
        this._tasklist = tasklist;

        // Get the display elements to interact with
        this._lblTasklistTitle = this.getUIElementById<HTMLElement>('lblTasklistTitle');
        this._txtTasklistTitle = this.getUIElementById<HTMLInputElement>('txtTasklistTitle');
        this._lstTasklist = this.getUIElementById<HTMLOListElement>('lstTasklist');

        // Initialize the display with current count
        this.updateUI();

        // Setup event listeners
        this.setupDOMEventListeners();
        this.setupObjectEventHandlers();
    }

    /** Event handlers **/
    private setupDOMEventListeners(): void {
        this._txtTasklistTitle?.addEventListener('change', this.onTaskListTitleChangeUI.bind(this));
    }

    private setupObjectEventHandlers(): void {
        this._tasklist.addEventListener(this._tasklist.EVENT_TITLE_UPDATED, this.onTaskTitleUpdated.bind(this));
        this._tasklist.addEventListener(this._tasklist.EVENT_TASK_ADDED, this.onTaskAdded.bind(this));
        this._tasklist.addEventListener(this._tasklist.EVENT_TASK_REMOVED, this.onTaskRemoved.bind(this));
        this._tasklist.addEventListener(this._tasklist.EVENT_TASKLIST_CLEARED, this.onTasklistCleared.bind(this));
    }

    private onTaskListTitleChangeUI(e: Event): void {
        this._tasklist.title = (e.target as HTMLInputElement).value;
    }

    private onTaskTitleUpdated(e: Event): void {
        var args = (e as CustomEvent<any>).detail as Tasklist.event_payload_payloadTitleupdated;
        console.log(`Tasklist title was updated: from ` + args.title_old + ` to ` + args.title_new);
    }

    private onTaskAdded(e: Event): void {
        var args = (e as CustomEvent<any>).detail as Tasklist.event_payload_TaskAdded;
        // !!! add task to UI

        console.log(`Tasklist got a new task:  ` + args.newTask.title + ` and the list has now ` + args.newCount + ` items.`);
    }

    private onTaskRemoved(e: Event): void {
        var args = (e as CustomEvent<any>).detail as Tasklist.event_payload_TaskRemoved;
        // !!! remove task from UI

        console.log(`Tasklist had a task removed:  ` + args.deletedTask.title);
    }

    private onTasklistCleared(e: Event): void {
        console.log(`Tasklist was cleared of all tasks.`);
    }



    /** Logic **/

    updateUI(): void {
        if (!this._lblTasklistTitle || !this._lstTasklist) return;
        this._lblTasklistTitle.textContent = this._tasklist.title.toString();

        //render all tasks in the list
        this._tasklist.tasks.forEach(
            (task) => {
                var listItem = document.createElement('li');
                var taskItem = new TaskUI(listItem, task);
                this._lstTasklist?.appendChild(listItem);
            }
        );
    }

}