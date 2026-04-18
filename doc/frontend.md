# Frontend

## Custom Elements

All UI components are native Web Components (custom elements) that extend `HTMLElement` directly. No shadow DOM is used.

### Lifecycle

Every component follows the same pattern:

```typescript
export class MyComponent extends HTMLElement {
    private _design: string = `<div>...</div>`;

    connectedCallback(): void {
        this.innerHTML = this._design;         // render template
        this.classList.add('my-css-class');    // optional CSS class
        this.setupEventListeners();            // wire up DOM events
        this.setupObjectsEventHandlers();      // wire up model events
        this.updateUI();                       // initial render
    }

    updateUI(): void { /* sync DOM to model state */ }
}
```

`connectedCallback()` is the entry point — it fires when the element is inserted into the DOM.

### Querying Child Elements

Components expose a typed helper to query their own subtree:

```typescript
public getUIElementById<T extends HTMLElement>(id: string): T | null {
    return this.querySelector(`#${id}`) as T | null;
}
```

### Registering Elements

Custom elements are registered in `app2.ts` before first use:

```typescript
customElements.define('minimal-ui', MinimalUI);
customElements.define('minimal-ui2', MinimalUI2);
customElements.define('counter2-ui', CounterUI2);
```

`bootstrapper.ts` registers `App2` as `<app-root>`.

## Components

### `App2` — `<app-root>` (`src/app2.ts`)

Root component. Renders the application shell and houses all child components. After the next animation frame (`requestAnimationFrame`) it calls `initializeObjects()` to give child custom elements time to initialize first.

### `MinimalUI` — `<minimal-ui>` (`src/minimal-ui.ts`)

Minimal example component. Renders a static header. Used as a template to learn the custom element lifecycle.

### `MinimalUI2` — `<minimal-ui2>` (`src/minimal-ui2.ts`)

Second minimal example component. Same purpose as `MinimalUI`.

### `CounterUI2` — `<counter2-ui>` (`src/counter2-ui.ts`)

Interactive counter. Creates its own `Counter` model by default, or accepts one via the `counter` setter. Wires three buttons (increment / decrement / reset) to model methods and listens to `Counter.EVENT_CHANGED` to log changes.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `counter` | `Counter` | Get or set the backing Counter model |

## Legacy Components (to be removed)

| File | Replacement |
|------|-------------|
| `src/app.ts` | `src/app2.ts` |
| `src/counter-ui.ts` | `src/counter2-ui.ts` |
| `src/baseclasses/baseui.ts` | Direct `HTMLElement` extension |
