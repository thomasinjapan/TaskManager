/** src/task.ts */

import { EventEmitter } from './baseclasses/EventHandling.js';

export namespace Task {
    /** Payload carried by the `description_updated` event. */
    export type event_payload_descriptionupdated = {
        description_old: string;
        description_new: string;
    };

    /** Payload carried by the `title_updated` event. */
    export type event_payload_titleupdated = {
        title_old: string;
        title_new: string;
    };
}

/**
 * Domain model for a single task.
 * Both `title` and `description` emit events when changed.
 */
export class Task extends EventEmitter {
    private _title: string;
    private _description: string;

    /** Fired when the title changes. Payload: {@link Task.event_payload_titleupdated}. */
    public EVENT_TITLE_UPDATED: string = 'title_updated';
    /** Fired when the description changes. Payload: {@link Task.event_payload_descriptionupdated}. */
    public EVENT_DESCRIPTION_UPDATED: string = 'description_updated';
    /** Fired on any property change, after the specific event. Payload: `{}`. */
    public EVENT_UPDATED: string = 'updated';

    constructor(initialTitle: string, initialDescription: string) {
        super();
        this._title = initialTitle;
        this._description = initialDescription
    }

    /** The task title. */
    get title(): string {
        return this._title;
    }

    /**
     * Sets the task title and emits `title_updated` and `updated`.
     * @param value - New title string.
     */
    set title(value: string) {
        //prepare payload for event
        var oldtitle: string = this._title;
        var newtitle: string = value;
        var payload: Task.event_payload_titleupdated = { title_new: newtitle, title_old: oldtitle };

        //do logic
        this._title = value;

        //emit events
        this.emit(this.EVENT_TITLE_UPDATED, payload);
        this.emit(this.EVENT_UPDATED, {});
    }

    /** The task description. */
    get description(): string {
        return this._description;
    }

    /**
     * Sets the task description and emits `description_updated` and `updated`.
     * @param value - New description string.
     */
    set description(value: string) {
        //prepare payload for event
        var olddescription: string = this._description;
        var newdescription: string = value;
        var payload: Task.event_payload_descriptionupdated = { description_new: newdescription, description_old: olddescription };

        // do logic
        this._description = value;

        //raise events
        this.emit(this.EVENT_DESCRIPTION_UPDATED, payload);
        this.emit(this.EVENT_UPDATED, {});
    }
}