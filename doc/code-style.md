# Code Style — Comments & Regions

## File Headers

Every TypeScript file starts with a single-line file header comment:

```ts
/** src/path/to/file.ts */
```

## In-Code Comments

### When to comment

Only add a comment when the **why** is non-obvious — a hidden constraint, a subtle invariant, or a workaround that would surprise a reader. Do not describe what the code does; well-named identifiers already do that.

```ts
// Defer wiring until child connectedCallbacks have run.
requestAnimationFrame(() => this.initializeObjects());
```

### When not to comment

Do not add comments that restate the code:

```ts
// BAD — restates the code
this._count += 1; // increment count

// BAD — section dividers without meaning
// Initialize objects
```

### Comment style

| Purpose | Style |
|---------|-------|
| Non-obvious inline reasoning | `// single line` |
| Public API (classes, methods, properties, events) | `/** JSDoc */` |
| Placeholder / not yet implemented | `/** nothing here yet */` |

---

## JSDoc Rules

### Classes

Every exported class gets a JSDoc summary describing its role, not its implementation:

```ts
/**
 * Domain model for a single task.
 * Both `title` and `description` emit events when changed.
 */
export class Task extends EventEmitter { ... }
```

### Methods

One-line JSDoc for simple methods using `@returns` inline:

```ts
/** Adds 1 and emits `changed`. @returns New count. */
increment(): number { ... }
```

Multi-line JSDoc for methods with parameters:

```ts
/**
 * Sets the task title and emits `title_updated` and `updated`.
 * @param value - New title string.
 */
set title(value: string) { ... }
```

### Properties and getters

One-line JSDoc describing the value and any side effects:

```ts
/** Current counter value (read-only). */
get count(): number { ... }

/** The list title. Setting this emits `title_updated`. */
get title(): string { ... }
```

### Event constants

Each event constant documents its payload type via `{@link}`:

```ts
/** Fired by increment(), decrement(), and reset(). Payload: {@link Counter.payloadChanged}. */
public EVENT_CHANGED: string = 'changed';
```

### Namespace payload types

Each payload type inside a namespace gets a one-line JSDoc:

```ts
export namespace Counter {
    /** Payload carried by the `changed` event. */
    export type payloadChanged = { ... };
}
```

Individual fields within a payload type are documented only when non-obvious:

```ts
export type payloadChanged = {
    oldCount: number;
    newCount: number;
    /** Signed difference: +1 for increment, -1 for decrement. */
    delta: number;
};
```

---

## Regions

All classes are divided into named regions using `// #region` / `// #endregion`. These are collapsible in VS Code and Visual Studio.

### Model classes (`EventEmitter` subclasses)

```
// #region Fields
// #region Events
// #region Constructor
// #region Properties
// #region Methods
```

### UI component classes (`HTMLElement` subclasses)

```
// #region Fields
// #region Constructor
// #region Properties    ← omit if no getters/setters
// #region Lifecycle
// #region DOM
// #region Event Handlers
// #region UI
```

### Region definitions

| Region | Contains |
|--------|----------|
| `Fields` | Private instance variables and template strings |
| `Events` | Public event name constants |
| `Constructor` | The constructor only |
| `Properties` | Public getters and setters |
| `Lifecycle` | Web Component lifecycle callbacks (`connectedCallback`, etc.) |
| `DOM` | Helper methods that query or manipulate the DOM subtree |
| `Event Handlers` | Setup methods and handler callbacks for DOM and model events |
| `Methods` | Public domain logic methods (models only) |
| `UI` | Methods that sync the DOM to current model state (`updateUI`, etc.) |

### Files without regions

- Files that are not classes (module-level code, e.g. `bootstrapper.ts`)
- Classes with only one or two members — regions add no value there
