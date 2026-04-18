/** src/tasklist.ts */

import { EventEmitter } from './baseclasses/EventHandling.js';
import { Task } from './task.js';

export namespace Tasklist {
    /** Payload carried by the `title_updated` event. */
    export type event_payload_payloadTitleupdated = {
        title_old: string,
        title_new: string
    };

    /** Payload carried by the `task_added` event. */
    export type event_payload_TaskAdded = {
        newTask: Task,
        /** Total number of tasks after the add. */
        newCount: number
    };

    /** Payload carried by the `task_removed` event. */
    export type event_payload_TaskRemoved = {
        deletedTask: Task,
    };
}

/**
 * Domain model for an ordered collection of tasks.
 * Emits events whenever the collection or its title changes.
 */
export class Tasklist extends EventEmitter {
    private _title: string;
    private _tasks: Task[] = [];

    /** Fired when the title changes. Payload: {@link Tasklist.event_payload_payloadTitleupdated}. */
    public EVENT_TITLE_UPDATED: string = 'title_updated';
    /** Fired when a task is added. Payload: {@link Tasklist.event_payload_TaskAdded}. */
    public EVENT_TASK_ADDED: string = 'task_added';
    /** Fired when a task is removed. Payload: {@link Tasklist.event_payload_TaskRemoved}. */
    public EVENT_TASK_REMOVED: string = 'task_removed';
    /** Fired when all tasks are cleared. Payload: `{}`. */
    public EVENT_TASKLIST_CLEARED: string = 'tasklist_cleared';

    constructor(initialTitle: string) {
        super();
        this._title = initialTitle;
        this._tasks = [];
    }

    /** The list title. Setting this emits `title_updated`. */
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

    /** Read-only snapshot of the current task array. */
    public get tasks(): Task[] {
        return this._tasks;
    }

    /** Appends a task and emits `task_added`. */
    public addTask(task: Task): void {
        this._tasks.push(task);
        this.emit(this.EVENT_TASK_ADDED, <Tasklist.event_payload_TaskAdded>{ newTask: task, newCount: this._tasks.length });
    }

    /** Removes a task by reference and emits `task_removed`. No-op if not found. */
    public removeTask(task: Task): void {
        const index = this._tasks.indexOf(task);
        if (index !== -1) {
            this._tasks.splice(index, 1);
            this.emit(this.EVENT_TASK_REMOVED, <Tasklist.event_payload_TaskRemoved>{deletedTask:task});
        }
    }

    /** Removes all tasks and emits `tasklist_cleared`. */
    public clearTasks(): void {
        this._tasks = [];
        this.emit(this.EVENT_TASKLIST_CLEARED, {});
    }
}