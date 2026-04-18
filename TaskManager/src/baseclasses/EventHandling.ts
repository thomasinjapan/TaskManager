/** src/baseclasses/EventHandling.ts */

/**
 * Base class for all domain models.
 * Wraps the native EventTarget with a typed emit helper so subclasses
 * can dispatch CustomEvent<T> without boilerplate.
 */
export class EventEmitter extends EventTarget {
    /**
     * Dispatches a typed CustomEvent on this object.
     * @param type - Event name (e.g. 'changed', 'task_added')
     * @param detail - Strongly-typed payload attached to the event
     */
    protected emit<T>(type: string, detail: T): void {
        this.dispatchEvent(new CustomEvent<T>(type, {detail}));
    }
}