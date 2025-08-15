/**  src/Task.ts  **/
import { EventEmitter } from './EventHandling.js';

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
        this._description = initialDescription;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        this.emit(this.EVENT_TITLE_UPDATED, []);
        this.emit(this.EVENT_UPDATED, []);
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
        this.emit(this.EVENT_DESCRIPTION_UPDATED, []);
        this.emit(this.EVENT_UPDATED, []);
    }
}