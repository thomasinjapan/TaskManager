/**  src/Task.ts  **/
import { EventEmitter } from './EventHandling.js';

export class Task extends EventEmitter {
    private _title: string;
    private _description: string | null;

    constructor(initialTitle: string, initialDescription: string | null) {
        super();
        this._title = initialTitle;
        this._description = initialDescription;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
        this.emit('title_updated', []);
        this.emit('updated', []);
    }

    get description(): string | null{
        return this._description ;
    }

    set description(value: string) {
        this._description = value;
        this.emit('description_updated', []);
        this.emit('updated', []);
    }

}