# Architecture

## Overview

TaskManager is a hybrid application combining an ASP.NET Core 8 backend with a Vanilla TypeScript frontend built on the Web Components standard. No frontend framework is used — components are native custom elements.

```
Browser
  └── index.html
        └── bootstrapper.js (ESM entry point)
              └── <app-root>  (App2 custom element)
                    ├── <minimal-ui>
                    ├── <minimal-ui2>
                    └── <counter2-ui>

Server (ASP.NET Core 8)
  └── Program.cs
        ├── UseDefaultFiles()  → serves index.html
        └── UseStaticFiles()   → serves wwwroot/
```

## Layers

### Backend
ASP.NET Core 8 minimal API. Currently acts as a static file host only. Future API routes will be added in `Program.cs`.

### Frontend
Pure TypeScript compiled to ESM modules by esbuild. Two logical layers:

- **Models** — domain logic classes (`Counter`, `Task`, `Tasklist`). Extend `EventEmitter` and emit typed `CustomEvent<T>` when state changes.
- **UI Components** — custom elements (`*-ui.ts`) that extend `HTMLElement` directly, render via `innerHTML`, and react to model events.

## Application Startup

1. ASP.NET Core serves `wwwroot/index.html`
2. `index.html` loads `dist/bootstrapper.js` as an ES module
3. `bootstrapper.ts` registers `App2` as the `<app-root>` custom element and appends it to `#bootstrapper`
4. `App2.connectedCallback()` renders child custom elements via `innerHTML`
5. After the next animation frame, `initializeObjects()` verifies child elements are present

> **Note:** Model creation and model–UI wiring in `initializeObjects()` are currently commented out. The method logs found/not-found messages to the console as a readiness check. Wiring will be added as each UI component matures.

```mermaid
sequenceDiagram
    participant Browser
    participant ASP.NET Core
    participant bootstrapper.ts
    participant App2
    participant ChildElements

    Browser->>ASP.NET Core: GET /
    ASP.NET Core-->>Browser: index.html
    Browser->>ASP.NET Core: GET /dist/bootstrapper.js
    ASP.NET Core-->>Browser: bootstrapper.js (ESM)
    Browser->>bootstrapper.ts: DOMContentLoaded
    bootstrapper.ts->>bootstrapper.ts: customElements.define("app-root", App2)
    bootstrapper.ts->>App2: createElement("app-root")
    bootstrapper.ts->>Browser: appendChild(app_root) → triggers connectedCallback
    App2->>App2: connectedCallback()
    App2->>Browser: innerHTML = template (renders child elements)
    Browser->>ChildElements: connectedCallback() for each child
    App2->>App2: requestAnimationFrame(initializeObjects)
    App2->>App2: initializeObjects() — verify child elements present (wiring pending)
```

## Component & Model Overview

```mermaid
classDiagram
    class EventTarget {
        <<native>>
        +addEventListener()
        +dispatchEvent()
    }

    class EventEmitter {
        #emit(type, detail) void
    }

    class Counter {
        -_count number
        +EVENT_CHANGED string
        +count number
        +increment() number
        +decrement() number
        +reset() number
    }

    class Task {
        -_title string
        -_description string
        +EVENT_TITLE_UPDATED string
        +EVENT_DESCRIPTION_UPDATED string
        +EVENT_UPDATED string
        +title string
        +description string
    }

    class Tasklist {
        -_title string
        -_tasks Task[]
        +EVENT_TITLE_UPDATED string
        +EVENT_TASK_ADDED string
        +EVENT_TASK_REMOVED string
        +EVENT_TASKLIST_CLEARED string
        +title string
        +tasks Task[]
        +addTask(task) void
        +removeTask(task) void
        +clearTasks() void
    }

    class HTMLElement {
        <<native>>
        +connectedCallback()
        +innerHTML
    }

    class App2 {
        -_design string
        +connectedCallback() void
        -initializeObjects() void
        -getUIElementById(id) HTMLElement
    }

    class MinimalUI {
        +connectedCallback() void
        +getUIElementById(id) T
        +updateUI() void
    }

    class MinimalUI2 {
        +connectedCallback() void
        +getUIElementById(id) T
        +updateUI() void
    }

    class CounterUI2 {
        -_counter Counter
        -_lblCount HTMLElement
        +counter Counter
        +connectedCallback() void
        +getUIElementById(id) T
        +updateUI() void
    }

    EventTarget <|-- EventEmitter
    EventEmitter <|-- Counter
    EventEmitter <|-- Task
    EventEmitter <|-- Tasklist
    HTMLElement  <|-- App2
    HTMLElement  <|-- MinimalUI
    HTMLElement  <|-- MinimalUI2
    HTMLElement  <|-- CounterUI2
    CounterUI2  --> Counter : owns / listens
    Tasklist    --> Task : contains
    App2        --> MinimalUI : renders
    App2        --> MinimalUI2 : renders
    App2        --> CounterUI2 : renders
```

## Key Design Decisions

- **No shadow DOM** — components use the regular DOM for simplicity
- **No framework** — the goal is to learn the platform directly
- **Event-driven model updates** — models never reference UI; UI listens to model events
- **ESM modules** — all imports use `.js` extensions (required for native ESM)
- **Guard-checked registration** — child custom elements are registered with `!customElements.get(name)` guards in `app2.ts` to prevent double-registration errors
- **Direct HTMLElement subclassing** — active components extend `HTMLElement` directly rather than a `BaseUI` base class, keeping the implementation simple and dependency-free. See [Code Migration](#code-migration) below.

## Code Migration

### HTMLElement-Based Components (Active)

New components (`CounterUI2`, `MinimalUI`, `MinimalUI2`) extend `HTMLElement` directly and follow this pattern:

1. Render template in `connectedCallback()`
2. Query child elements and cache references
3. Wire up DOM event listeners and model event handlers
4. Sync DOM to model state via `updateUI()`

Each component defines its own `getUIElementById<T>(id: string): T | null` helper for type-safe element queries.

### Legacy BaseUI Pattern (Deprecated)

Older components (`CounterUI`, `TaskUI`, `TasklistUI`) in `src/` extend a `BaseUI` base class and are no longer part of the active application. These will be removed once their replacements are complete.

| File | Status | Replacement |
|------|--------|-------------|
| `src/app.ts` | Unused | `src/app2.ts` |
| `src/counter-ui.ts` | Unused — BaseUI subclass | `src/counter2-ui.ts` |
| `src/task-ui.ts` | Unused — BaseUI subclass | Future custom element |
| `src/tasklist-ui.ts` | Unused — BaseUI subclass | Future custom element |
| `src/baseclasses/baseui.ts` | Unused by active components | Direct HTMLElement extension |
