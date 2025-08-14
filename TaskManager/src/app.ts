/**  src/start-ui.ts  **/
import { Counter } from './counter.js';
import { Task } from './task.js';
import { CounterUI } from './counter-ui.js';
import { TaskUI } from './task-ui.js';


export class App {
    private _container: HTMLElement;

    private _design: string = `
            <div id="counter-ui"></div><br />
            <div id="task-ui"></div><br />
        `;


    /** Constructor and UI **/
    constructor(container: HTMLElement) {
        this._container = container
        console.log('container used for StartUI:', this._container)

        // Render the counter UI
        console.log('container inner html before design render:', this._container.innerHTML)
        this._container.innerHTML = this._design
        console.log('container inner html after design render:', this._container.innerHTML)

        // Initialize the display with current count
        this.initializeObjects();
   }

    private getUIElementById(id: string): HTMLElement | null {
        return this._container.querySelector(`#${id}`);
    }
    initializeObjects(): void {
        // identify HTML elements
        const counterContainer = this.getUIElementById('counter-ui') as HTMLElement;
        const taskContainer = this.getUIElementById('task-ui') as HTMLElement;

        // Initialize objects
        const counter = new Counter();
        const task = new Task('New Task', 'New Description');

        //initialize UI
        const counterUI = new CounterUI(counterContainer, counter);
        const taskUI = new TaskUI(taskContainer, task);
    }

}