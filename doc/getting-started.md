# Getting Started with TaskManager

This guide helps you understand and work with the TaskManager codebase.

## What is TaskManager?

TaskManager is a training project for building vanilla web applications. It combines:
- **Backend**: ASP.NET Core 8 minimal API (serves static files, ready for REST routes)
- **Frontend**: Vanilla TypeScript with Web Components (no framework)

No third-party UI libraries — just the platform, learning it directly.

## Project Structure

```
TaskManager/
├── TaskManager/                 # .NET project root
│   ├── src/                    # TypeScript source files
│   │   ├── app2.ts             # Root component <app-root>
│   │   ├── bootstrapper.ts     # Entry point, registers App2
│   │   ├── counter.ts          # Counter domain model
│   │   ├── counter2-ui.ts      # Counter UI component (active)
│   │   ├── minimal-ui.ts       # Example minimal component
│   │   ├── minimal-ui2.ts      # Example minimal component
│   │   ├── task.ts             # Task domain model
│   │   ├── tasklist.ts         # Tasklist domain model
│   │   ├── baseclasses/        # Legacy base classes (being phased out)
│   │   └── [legacy files]      # Older UI components (unused)
│   ├── wwwroot/                # Static files served to browser
│   │   ├── index.html          # Entry point
│   │   ├── styles.css          # Global styles
│   │   └── dist/               # Compiled TypeScript (generated)
│   ├── Program.cs              # .NET startup
│   ├── package.json            # npm configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── TaskManager.csproj      # .NET project file
│
└── doc/                        # Documentation
    ├── README.md               # Doc navigation hub
    ├── architecture.md         # System design and startup flow
    ├── component-patterns.md   # Component lifecycle and best practices
    ├── frontend.md             # Active and legacy components
    ├── models.md               # Domain model APIs and events
    ├── backend.md              # .NET setup and static file serving
    ├── build.md                # Build system (esbuild)
    └── code-style.md           # Commenting and region conventions
```

## Quick Start (Development)

### Prerequisites
- .NET 8 SDK
- Node.js 18+ with npm
- Visual Studio, VS Code, or any text editor

### Running Locally

**Terminal 1 — Watch TypeScript changes:**

```bash
cd TaskManager
npm run watch-wwwroot
```

This recompiles `src/**/*.ts` to `wwwroot/dist/` whenever you save a file.

**Terminal 2 — Run the .NET host:**

```bash
dotnet run --project TaskManager
```

This starts the server on `http://localhost:5171` (HTTP) or `https://localhost:7294` (HTTPS).

**Browser:**

Open http://localhost:5171 to see the app. Refresh after making TypeScript changes (watch mode compiles them automatically).

## Understanding the Codebase

### 1. Read the Architecture

Start with [architecture.md](architecture.md) to understand:
- How the app starts (entry point → bootstrapper → App2 → child components)
- The component hierarchy (class diagram)
- Key design decisions (no shadow DOM, no framework, ESM modules)

### 2. Learn the Patterns

Read [component-patterns.md](component-patterns.md) to understand:
- How to build a custom element (the `connectedCallback` lifecycle)
- How to wire components to domain models
- Common patterns and anti-patterns

### 3. Study Domain Models

Check [models.md](models.md) to see:
- How `Counter`, `Task`, and `Tasklist` models work
- What events they emit and what data is in each event
- How to listen for model changes from a component

### 4. Review Active Components

Look at [frontend.md](frontend.md) to understand:
- Which components are currently used (`CounterUI2`, `MinimalUI`, `MinimalUI2`)
- How they're implemented
- Which are legacy and marked for removal

## Code Examples

### Building a New Component

```typescript
// my-component.ts
export class MyComponent extends HTMLElement {
    // #region Fields
    private _myElement: HTMLElement | null = null;
    _design: string = `<div id="my-element">Hello</div>`;
    // #endregion

    // #region Lifecycle
    connectedCallback(): void {
        this.innerHTML = this._design;
        this._myElement = this.getUIElementById('my-element');
        this.setupEventListeners();
    }
    // #endregion

    // #region DOM
    public getUIElementById<T extends HTMLElement>(id: string): T | null {
        return this.querySelector(`#${id}`) as T | null;
    }
    // #endregion

    // #region Event Handlers
    private setupEventListeners(): void {
        // Wire up DOM listeners
    }
    // #endregion
}
```

Register it in `app2.ts`:

```typescript
!customElements.get('my-component') 
    ? customElements.define('my-component', MyComponent) 
    : null;
```

Add to the template:

```typescript
_design: string = `
    <my-component id="my-component"></my-component>
`;
```

### Wiring a Component to a Model

From `counter2-ui.ts`:

```typescript
export class CounterUI2 extends HTMLElement {
    private _counter: Counter = new Counter();

    connectedCallback(): void {
        this.innerHTML = this._design;
        this._btnIncrement = this.getUIElementById('cmdIncrement');
        
        // Sync UI to model state
        this.updateUI();
        
        // Wire up event handlers
        this._btnIncrement?.addEventListener('click', 
            this.onUIIncrement.bind(this));
        
        // Listen for model changes
        this._counter.addEventListener(this._counter.EVENT_CHANGED,
            this.onCounterChange.bind(this));
    }

    private onUIIncrement(): void {
        this._counter.increment();  // Mutates model
        this.updateUI();             // Refreshes view
    }

    private onCounterChange(e: Event): void {
        const args = (e as CustomEvent).detail;
        console.log('Model changed:', args);
    }

    updateUI(): void {
        this._lblCount.textContent = this._counter.count.toString();
    }
}
```

## Code Style

All code follows conventions documented in [code-style.md](code-style.md):

- **File header:** `/** src/path/to/file.ts */`
- **Comments:** Only explain *why*, not *what* — let code be self-documenting
- **JSDoc:** Use for public classes, methods, and properties
- **Regions:** Organize with `// #region Name` / `// #endregion`

Example:

```typescript
/** src/counter.ts */

/**
 * Integer counter with increment, decrement, and reset.
 * Emits 'changed' event on every mutation.
 */
export class Counter extends EventEmitter {
    // #region Fields
    private _count: number;
    // #endregion

    // #region Events
    /** Fired by increment(), decrement(), and reset(). */
    public EVENT_CHANGED: string = 'changed';
    // #endregion

    // ... etc
}
```

## Build System

The build is automated via `esbuild` and npm scripts. See [build.md](build.md) for details.

| Script | Compiles to |
|--------|------------|
| `npm run build` | Both `wwwroot/dist/` (ESM) and `localroot/bundle.js` (bundle) |
| `npm run watch-wwwroot` | `wwwroot/dist/` with file watch |
| `npm run watch-localroot` | `localroot/bundle.js` with file watch |

The .NET project automatically runs `npm run build` before every compile via a MSBuild `PreBuild` target.

## Next Steps

### To Build a New Component
1. Create `src/my-component.ts` extending `HTMLElement`
2. Follow the `connectedCallback` lifecycle pattern (see [component-patterns.md](component-patterns.md))
3. Register it in `app2.ts` with a guard check
4. Add it to the App2 template
5. Document it in [frontend.md](frontend.md)

### To Add a Domain Model
1. Create `src/my-model.ts` extending `EventEmitter`
2. Define event constants and payload types as namespaced types
3. Emit events using the `emit<T>(type, detail)` helper
4. Document in [models.md](models.md) with event flow diagrams

### To Add API Routes
1. Edit `TaskManager/Program.cs`
2. Add `app.MapGet()` or `app.MapPost()` routes
3. See [backend.md](backend.md) for details

## Troubleshooting

**"Component not found" error in console:**
- Check that you registered the component in `app2.ts` before rendering it
- Verify the custom element name matches in both `define()` and the template

**TypeScript compilation errors:**
- Run `npm run clean-wwwroot-dist` to clear old output, then `npm run build`
- Check `tsconfig.json` for any overrides

**Changes not showing in the browser:**
- Run `npm run watch-wwwroot` in a separate terminal
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

## Resources

- [TaskManager Architecture](architecture.md)
- [Component Patterns & Best Practices](component-patterns.md)
- [Domain Models & Events](models.md)
- [Code Style Guide](code-style.md)
- [Build System](build.md)
- [Active Frontend Components](frontend.md)

## Questions?

Refer to the documentation in `/doc/` for detailed information on any aspect of the codebase. Each document is linked from [doc/README.md](README.md).
