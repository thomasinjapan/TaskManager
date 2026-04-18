# Frontend

## Custom Elements

All active UI components are native Web Components (custom elements) that extend `HTMLElement` directly. No shadow DOM is used.

### Lifecycle

Every active component follows the same pattern:

```typescript
export class MyComponent extends HTMLElement {
    _design: string = `<div>...</div>`;

    connectedCallback(): void {
        this.innerHTML = this._design;              // render template
        this.classList.add('my-css-class');         // optional CSS class
        this.updateUI();                            // initial render
        this.setupEventListeners();                 // wire up DOM events
        this.setupObjectsEventHandlers();           // wire up model events
    }

    updateUI(): void { /* sync DOM to model state */ }
}
```

`connectedCallback()` is the entry point — it fires when the element is inserted into the DOM.

### Querying Child Elements

Each component defines its own typed helper to query its subtree:

```typescript
public getUIElementById<T extends HTMLElement>(id: string): T | null {
    return this.querySelector(`#${id}`) as T | null;
}
```

This method is defined individually on each component class. The legacy `BaseUI` class also carries this method, but active components do not inherit it.

### Registering Elements

Custom elements are registered in `src/app2.ts` before the template is rendered. Guard checks prevent double-registration if the module is imported more than once:

```typescript
!customElements.get('minimal-ui')   ? customElements.define('minimal-ui',   MinimalUI)  : null;
!customElements.get('minimal-ui2')  ? customElements.define('minimal-ui2',  MinimalUI2) : null;
!customElements.get('counter2-ui')  ? customElements.define('counter2-ui',  CounterUI2) : null;
```

`bootstrapper.ts` registers `App2` as `<app-root>` unconditionally (it is the top-level entry point and is only imported once).

## Active Components

### `App2` — `<app-root>` (`src/app2.ts`)

Root component. Renders the application shell and houses all child components. After the next animation frame (`requestAnimationFrame`) it calls `initializeObjects()` to give child custom elements time to run their own `connectedCallback` first.

> **Note:** `initializeObjects()` currently only verifies that child elements are present (logs to console). All model-creation and model–UI wiring code is commented out and pending implementation.

**Template (active):**

```html
<minimal-ui  id="minimal-ui"></minimal-ui>
<minimal-ui2 id="minimal-ui2"></minimal-ui2>
<counter2-ui id="counter2-ui"></counter2-ui>
```

### `MinimalUI` — `<minimal-ui>` (`src/minimal-ui.ts`)

Minimal example component. Renders a static `<h1>Minimal Header</h1>`. Used as a learning template for the custom element lifecycle. Both `setupEventListeners()` and `setupObjectsEventHandlers()` are stubs (marked with `/** nothing here yet */`) and emit debug logging to the console on initialization.

> **Note:** This file imports `BaseUI` and `Counter` but neither is used. These are residual imports from earlier iterations and can be cleaned up during the full migration away from the legacy BaseUI pattern.

### `MinimalUI2` — `<minimal-ui2>` (`src/minimal-ui2.ts`)

Second minimal example component. Identical structure to `MinimalUI`; renders `<h1>Minimal Header 2</h1>`. Also emits console logging during initialization and has the same unused imports as `MinimalUI`.

### `CounterUI2` — `<counter2-ui>` (`src/counter2-ui.ts`)

Interactive counter component. Creates its own `Counter` model by default, or accepts an external one via the `counter` setter. Wires three buttons (increment / decrement / reset) to model methods.

`updateUI()` is called directly from each button handler to refresh the displayed count. A separate `onCounterChange` listener is also attached to `Counter.EVENT_CHANGED` — it logs the old value, new value, and delta to the console but does not call `updateUI()` itself.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `counter` | `Counter` | Get or set the backing `Counter` model |

**DOM elements:**

| Element id | Type | Role |
|------------|------|------|
| `lblCount` | `div` | Displays current count |
| `cmdIncrement` | `button` | Calls `counter.increment()` |
| `cmdDecrement` | `button` | Calls `counter.decrement()` |
| `cmdReset` | `button` | Calls `counter.reset()` |

**CSS class:** `counter-container` (applied to the host element)

## Legacy Components (to be removed)

These files exist in `src/` but are not part of the active application. They use the old `BaseUI`-based pattern and are superseded by the direct-`HTMLElement` approach.

| File | Status | Replacement |
|------|--------|-------------|
| `src/app.ts` | Unused | `src/app2.ts` |
| `src/counter-ui.ts` | Unused — `BaseUI` subclass | `src/counter2-ui.ts` |
| `src/task-ui.ts` | Unused — `BaseUI` subclass | Future custom element |
| `src/tasklist-ui.ts` | Unused — `BaseUI` subclass | Future custom element |
| `src/baseclasses/baseui.ts` | Unused by active components | Direct `HTMLElement` extension |
