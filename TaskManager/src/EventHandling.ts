/** src/eventemitter.ts **/
export class EventEmitter extends EventTarget {
    protected emit<T>(type: string, detail: T): void {
        this.dispatchEvent(new CustomEvent<T>(type, {detail}));
    }
}