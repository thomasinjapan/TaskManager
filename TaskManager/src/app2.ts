/**  src/app.ts  **/
import { Counter } from './counter.js';
import { Task } from './task.js';
import { CounterUI } from './counter-ui.js';
import { TaskUI } from './task-ui.js';
import { Tasklist } from './tasklist.js';
import { TasklistUI } from './tasklist-ui.js';
import { CounterUI2 } from './counter2-ui.js';
import { MinimalUI } from './minimal-ui.js';
import { MinimalUI2 } from './minimal-ui2.js';

/** define all elements that are used if they are not defined yet */
!customElements.get('minimal-ui') ? customElements.define('minimal-ui', MinimalUI) : null;
!customElements.get('minimal-ui2') ? customElements.define('minimal-ui2', MinimalUI2) : null;
!customElements.get('counter2-ui') ? customElements.define('counter2-ui', CounterUI2) : null;

export class App2 extends HTMLElement {
    private _design: string = `
            <minimal-ui id="minimal-ui"></minimal-ui><br />
            <minimal-ui2 id="minimal-ui2"></minimal-ui2><br />
            <counter2-ui id="counter2-ui"></counter2-ui><br />
        `;

    //private _design: string = `
    //        <div id="counter2-ui"></div><br />
    //        <!-- <div id="task-ui"></div><br /> --!>
    //        <div id="tasklist-ui"></div>
    //    `;


    /** Constructor and UI **/
    constructor() {
        super();
    }

    /** Called when element is inserted into the DOM **/
    connectedCallback(): void {
        // Render the UI
        this.innerHTML = this._design;

        // Wait for child elements to initialize
        requestAnimationFrame(() => {
            this.initializeObjects();
        });

        //// Initialize the display
        //this.initializeObjects();
    }

    private getUIElementById(id: string): HTMLElement | null {
        return this.querySelector(`#${id}`);
    }

    initializeObjects(): void {
        // identify HTML elements

        const minimalContainer: MinimalUI | null = this.getUIElementById('minimal-ui') as MinimalUI;
        const minimalContainer2: MinimalUI2 | null = this.getUIElementById('minimal-ui2') as MinimalUI2;
        const counter2Container: CounterUI2 | null = this.getUIElementById('counter2-ui') as CounterUI2;

        minimalContainer ? console.log('Minimal container found:', minimalContainer) : console.error('Minimal container not found');
        minimalContainer2 ? console.log('Minimal2 container found:', minimalContainer2) : console.error('Minimal2 container not found');
        counter2Container ? console.log('Counter2 container found:', counter2Container) : console.error('Counter2 container not found');



        //const taskContainer = this.getUIElementById('task-ui') as HTMLElement;
        //const taskListContainer = this.getUIElementById('tasklist-ui') as HTMLElement;

        // Initialize objects
        //counterContainer.counter = new Counter();

        //const counter = new Counter();
        //const task1 = new Task('New Task 1', 'New Description 1');
        //const task2 = new Task('New Task 2', 'New Description 2');
        //const tasklist = new Tasklist('New Tasklist');
        //tasklist.addTask(task1);
        //tasklist.addTask(task2);

        //initialize UI
        //const counterUI = new CounterUI(counterContainer, counter);
        //const taskUI = new TaskUI(taskContainer, task);
        //const tasklistUI = new TasklistUI(taskListContainer, tasklist);
    }

}