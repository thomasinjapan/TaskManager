# Component Patterns

This document describes the standard patterns and conventions for building UI components in TaskManager.

## Custom Element Lifecycle

All active UI components extend `HTMLElement` directly and follow the same initialization sequence.

### The connectedCallback Lifecycle

```typescript
export class MyComponent extends HTMLElement {
    private _design: string = `...`;  // template HTML
    private _cssClass: string = 'my-class';
    
    connectedCallback(): void {
        // Step 1: Render template
        this.innerHTML = this._design;
        
        // Step 2: Apply CSS class
        this._cssClass ? this.classList.add(this._cssClass) : null;
        
        // Step 3: Cache element references
        this._myElement = this.getUIElementById('my-element');
        
        // Step 4: Sync UI to initial model state
        this.updateUI();
        
        // Step 5: Wire up DOM event listeners
        this.setupEventListeners();
        
        // Step 6: Wire up model event handlers
        this.setupModelEventHandlers();
    }
}
```

**Why this order matters:**

1. Template must render first (`connectedCallback` guarantees the element is in the DOM)
2. CSS class must be applied before child interactions (affects styling and layout)
3. Element references must be cached before event handlers use them
4. Initial `updateUI()` ensures the view matches the model before any events fire
5. Event listeners must be attached last to avoid race conditions

### Root Component (App2) — Special Case

The root `<app-root>` (App2) defers object initialization to the next animation frame:

```typescript
connectedCallback(): void {
    this.innerHTML = this._design;  // Render child custom elements
    
    // Defer wiring until child connectedCallbacks have run
    requestAnimationFrame(() => {
        this.initializeObjects();
    });
}

initializeObjects(): void {
    // Now safe to query and initialize child components
    const counter2Container: CounterUI2 | null = 
        this.getUIElementById('counter2-ui') as CounterUI2;
    // ... wire up models ...
}
```

**Why:** Child custom elements need time to run their own `connectedCallback` first.

## Querying Child Elements

Each component defines a typed helper for safe DOM queries:

```typescript
public getUIElementById<T extends HTMLElement>(id: string): T | null {
    return this.querySelector(`#${id}`) as T | null;
}
```

Usage:

```typescript
const button = this.getUIElementById<HTMLButtonElement>('my-button');
const customElement = this.getUIElementById<MyComponent>('my-component');
```

## Component Structure

### Fields

```typescript
// #region Fields
private _counter: Counter = new Counter();
private _lblCount: HTMLElement | null = null;

_cssClass: string = 'counter-container';
_design: string = `<div>...</div>`;
// #endregion
```

- Private fields use a leading underscore (`_fieldName`)
- Template strings (`_design`) and CSS classes go in Fields
- Model references are cached here (e.g., `_counter`)

### Constructor

Simple subclasses may accept optional dependencies:

```typescript
constructor(counter?: Counter) {
    super();
    this._counter = counter ?? new Counter();
}
```

### Properties

Getter/setter pairs for public access to private state:

```typescript
// #region Properties
get counter(): Counter {
    return this._counter;
}

set counter(value: Counter) {
    this._counter = value;
    // Re-wire event handlers if needed
    this.setupModelEventHandlers();
}
// #endregion
```

### Lifecycle

Only `connectedCallback()` is typically used. It must follow the standard sequence (see above).

### DOM

Helper methods for querying and manipulating the component's subtree:

```typescript
// #region DOM
private getChildComponent(id: string): ChildComponent | null {
    return this.getUIElementById<ChildComponent>(id);
}
// #endregion
```

### Event Handlers

Two categories:

1. **DOM event handlers** — user interactions (clicks, input, etc.)
2. **Model event handlers** — model state changes

```typescript
// #region Event Handlers
private setupEventListeners(): void {
    this._btnIncrement?.addEventListener('click', 
        this.onUIIncrement.bind(this));
}

private setupModelEventHandlers(): void {
    this._counter.addEventListener(this._counter.EVENT_CHANGED,
        this.onCounterChange.bind(this));
}

private onUIIncrement(): void {
    this._counter.increment();
    this.updateUI();
}

private onCounterChange(e: Event): void {
    const args = (e as CustomEvent).detail;
    console.log('Counter changed:', args);
    // May or may not call updateUI() depending on design
}
// #endregion
```

### UI

Methods that sync the DOM to the current model state:

```typescript
// #region UI
updateUI(): void {
    if (!this._lblCount) return;
    this._lblCount.textContent = this._counter.count.toString();
}
// #endregion
```

- Called at the end of `connectedCallback()` for initial render
- Called from DOM event handlers after mutations
- May or may not be called from model event handlers (depends on architecture choice)

## Registering Custom Elements

Components are registered before the parent renders them.

### App2 Registers Its Children

In `app2.ts`, before the template is rendered:

```typescript
!customElements.get('counter2-ui') 
    ? customElements.define('counter2-ui', CounterUI2) 
    : null;
```

The guard prevents double-registration if the module is imported multiple times.

### Bootstrapper Registers App2

In `bootstrapper.ts`:

```typescript
customElements.define('app-root', App2);  // No guard needed — only imported once
```

## Model–UI Interaction Patterns

### Pull Pattern (Direct `updateUI()` Call)

After a DOM event mutates the model, immediately sync the view:

```typescript
private onUIIncrement(): void {
    this._counter.increment();  // Emits 'changed' event
    this.updateUI();             // Immediately refresh UI
}
```

**Pros:** Deterministic, no lag between state and view.

**Cons:** May re-render more than necessary if multiple events fire quickly.

### Push Pattern (Model Event Listener)

Listen to model events and react:

```typescript
private setupModelEventHandlers(): void {
    this._counter.addEventListener(this._counter.EVENT_CHANGED, 
        this.onCounterChange.bind(this));
}

private onCounterChange(e: Event): void {
    const args = (e as CustomEvent).detail;
    console.log('Counter changed:', args);
    // May or may not call updateUI()
}
```

**Pros:** Decouples UI from knowing all mutation points.

**Cons:** Requires listeners on every model that might change externally.

### Current Practice

`CounterUI2` uses **both patterns**:

1. DOM handlers call `updateUI()` directly (pull pattern)
2. Model event listener logs to console only (push pattern for debugging)

This provides immediate visual feedback while also supporting external model mutations via event listeners.

## Best Practices

1. **Always use `connectedCallback`** — never do initialization in the constructor
2. **Cache element references early** — query once in `connectedCallback`, reuse throughout
3. **Null-check before accessing cached elements** — queries can fail if selectors are wrong
4. **Bind event handlers** — use `.bind(this)` to preserve context
5. **Use type-safe queries** — leverage the `getUIElementById<T>()` helper
6. **Keep templates simple** — avoid logic in `_design` strings
7. **One component = one responsibility** — don't try to render nested structures in the parent
8. **Document event payloads** — use JSDoc `@link` references to payload types

## Anti-Patterns to Avoid

### Initialization in Constructor

```typescript
// BAD
constructor() {
    super();
    this.innerHTML = this._design;  // Not in DOM yet!
}
```

### Querying Elements Every Time

```typescript
// BAD
updateUI(): void {
    const lblCount = this.querySelector('#lblCount');  // Query every call
    lblCount.textContent = this._counter.count.toString();
}
```

### Storing Model References Without Re-Wiring

```typescript
// BAD
set model(newModel: MyModel) {
    this._model = newModel;  // Old model listeners still attached!
}
```

Should remove old listeners and attach to new ones.

### Mixing Logic and Rendering

```typescript
// BAD
updateUI(): void {
    this._lblCount.textContent = `Count: ${this._counter.count}`;  // Formatting here
}
```

Should keep templates in `_design` or move formatting to a separate method.
