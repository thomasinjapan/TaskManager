/**  src/Task.ts  **/
import { EventEmitter } from './baseclasses/EventHandling.js';

export namespace Task {
    export type event_payload_descriptionupdated = {
        description_old: string;
        description_new: string;
    };

    export type event_payload_titleupdated = {
        title_old: string;
        title_new: string;
    };
}

export class Task extends EventEmitter {
    private _title: string;
    private _description: string;

   /** list of all valid events **/
    public EVENT_TITLE_UPDATED: string = 'title_updated';
    public EVENT_DESCRIPTION_UPDATED: string = 'description_updated';
    public EVENT_UPDATED: string = 'updated';

    constructor(initialTitle: string, initialDescription: string) {
        super();
        this._title = initialTitle;
        this._description = initialDescription
    }

    /**
     * gets title of the task
     * @returns Task 
     */
    get title(): string {
        return this._title;
    }

    /**
     * sets title of of the task
     * @param {number} value new title
     * @returns nothing
     * @emits title that was changed
     * @emits info that event was updated
     
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

    get description(): string {
        return this._description;
    }

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