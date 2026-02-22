/**  src/app.ts  **/
import { Counter } from './counter.js';
import { Task } from './task.js';
import { CounterUI } from './counter-ui.js';
import { TaskUI } from './task-ui.js';
import { Tasklist } from './tasklist.js';
import { TasklistUI } from './tasklist-ui.js';


export class App {
    private _container: HTMLElement;

    private _design: string = `
            <div id="counter-ui"></div><br />
            <!-- <div id="task-ui"></div><br /> --!>
            <div id="tasklist-ui"></div>
        `;


    /** Constructor and UI **/
    constructor(container: HTMLElement) {
        this._container = container
        
        // Render the counter UI
        this._container.innerHTML = this._design

        // Initialize the display with current count
        this.initializeObjects();
   }

    private getUIElementById(id: string): HTMLElement | null {
        return this._container.querySelector(`#${id}`);
    }

    initializeObjects(): void {
        // identify HTML elements
        const counterContainer = this.getUIElementById('counter-ui') as HTMLElement;
        //const taskContainer = this.getUIElementById('task-ui') as HTMLElement;
        const taskListContainer = this.getUIElementById('tasklist-ui') as HTMLElement;

        // Initialize objects
        const counter = new Counter();
        const task = new Task('New Task', 'New Description');
        const tasklist = new Tasklist('New Tasklist');
        tasklist.addTask(task);

        //initialize UI
        const counterUI = new CounterUI(counterContainer, counter);
        //const taskUI = new TaskUI(taskContainer, task);
        const tasklistUI = new TasklistUI(taskListContainer, tasklist);
    }

}