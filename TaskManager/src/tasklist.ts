/**  src/tasklist.ts  **/
import { EventEmitter } from './baseclasses/EventHandling.js';
import { Task } from './task.js'; 

export namespace Tasklist {
    export type event_payload_payloadTitleupdated = {
        title_old: string,
        title_new: string
    }; 

    export type event_payload_TaskAdded = {
        newTask: Task,
        newCount: number
    };

    export type event_payload_TaskRemoved = {
        deletedTask: Task,
    };
}

export class Tasklist extends EventEmitter {
    private _title: string;
    private _tasks: Task[] = [];

    /** list of all valid events **/
    public EVENT_TITLE_UPDATED: string = 'title_updated';
    public EVENT_TASK_ADDED: string = 'task_added';
    public EVENT_TASK_REMOVED: string = 'task_removed';
    public EVENT_TASKLIST_CLEARED: string = 'tasklist_cleared';


    constructor(initialTitle: string) {
        super();
        this._title = initialTitle;
        this._tasks = [];
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        var oldTitle: string = this._title;
        var newTitle: string = value;
        var payload: Tasklist.event_payload_payloadTitleupdated = { title_old:oldTitle, title_new:newTitle};


        this._title = value;

        this.emit(this.EVENT_TITLE_UPDATED,payload);
    }

    public get tasks(): Task[] {
        return this._tasks;
    }

    public addTask(task: Task): void {
        this._tasks.push(task);
        this.emit(this.EVENT_TASK_ADDED, <Tasklist.event_payload_TaskAdded>{ newTask: task, newCount: this._tasks.length });
    }

    public removeTask(task: Task): void {
        const index = this._tasks.indexOf(task);
        if (index !== -1) {
            this._tasks.splice(index, 1);
            this.emit(this.EVENT_TASK_REMOVED, <Tasklist.event_payload_TaskRemoved>{deletedTask:task});
        }
    }

    public clearTasks(): void {
        this._tasks = [];
        this.emit(this.EVENT_TASKLIST_CLEARED, {});
    }
}