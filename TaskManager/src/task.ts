/**  src/Task.ts  **/
import { EventEmitter } from './EventHandling.js';

export class Task extends EventEmitter {
    private _title: string;
    private _description: string;

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
        this.emit('title_updated', []);
        this.emit('updated', []);
    }

    get description(): string{
        return this._description ;
    }

    set description(value: string) {
        this._description = value;
        this.emit('description_updated', []);
        this.emit('updated', []);
    }

}