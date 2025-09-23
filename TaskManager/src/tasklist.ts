/**  src/tasklist.ts  **/
import { EventEmitter } from './EventHandling.js';
import { Task } from './task.js'; 

export namespace Tasklist {
    export type payloadTitleupdated = {
    }; 

    export type payloadTaskAdded = {
        newTask: Task,
        newCount: number
    };

    export type payloadTaskRemoved = {
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

    constructor(initialTitle: string) {
        super();
        this._title = initialTitle;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        this.emit(this.EVENT_TITLE_UPDATED, <Tasklist.payloadTitleupdated>{});
    }

    public addTask(task: Task): void {
        this._tasks.push(task);
        this.emit(this.EVENT_TASK_ADDED, <Tasklist.payloadTaskAdded>{ newTask: task, newCount: this._tasks.length });
    }

    public removeTask(task: Task): void {
        const index = this._tasks.indexOf(task);
        if (index !== -1) {
            this._tasks.splice(index, 1);
            this.emit(this.EVENT_TASK_REMOVED, <Tasklist.payloadTaskRemoved>{deletedTask:task});
        }
    }
}