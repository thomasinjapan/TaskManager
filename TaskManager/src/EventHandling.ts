/** src/eventemitter.ts **/
export class EventEmitter extends EventTarget {
    protected emit(type: string, args: unknown[]): void {
        this.dispatchEvent(new CustomEvent(type, { detail: args }));
    }
}