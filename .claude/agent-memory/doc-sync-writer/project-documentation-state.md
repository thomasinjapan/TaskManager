---
name: TaskManager Documentation State
description: Current state of TaskManager documentation, synchronization status, and key architectural decisions documented
type: project
---

## Documentation Structure

TaskManager uses a hierarchical documentation structure in `/doc/`:
- **README.md** — Navigation hub linking to all docs
- **architecture.md** — System overview, startup sequence, component hierarchy, migration path from BaseUI to direct HTMLElement subclassing
- **component-patterns.md** — [NEW] Custom element lifecycle patterns, best practices, anti-patterns, model-UI interaction patterns
- **frontend.md** — Active components (MinimalUI, MinimalUI2, CounterUI2) and legacy components (marked for removal)
- **models.md** — EventEmitter base class and three domain models (Counter, Task, Tasklist) with event payloads and Mermaid sequence diagrams
- **backend.md** — ASP.NET Core 8 minimal API static file hosting setup
- **build.md** — esbuild/npm script setup, ESM vs bundle outputs, TypeScript configuration
- **code-style.md** — File headers, JSDoc conventions, region organization by component type

## Documentation Synchronization Status

**Synchronized (April 18, 2026):**
- All models (Counter, Task, Tasklist) — accurately documented with payloads and event flows
- Custom element lifecycle and current component patterns — newly documented in component-patterns.md
- Active components (CounterUI2, MinimalUI, MinimalUI2) — updated to reflect current state
- Legacy components status — clearly marked as deprecated with replacement mappings
- Architecture diagram (Mermaid class diagram) — reflects current class hierarchy
- Code regions — documented in code-style.md, recently added to all source files in latest commit
- Build system — still current (esbuild-based, two outputs: wwwroot/dist/ for ESM, localroot/bundle.js for bundled)

## Key Architectural Decisions Documented

1. **Direct HTMLElement Subclassing** — Active components extend HTMLElement directly rather than using a BaseUI base class. Architecture.md includes migration section explaining both patterns.

2. **Event-Driven Models** — All domain models (Counter, Task, Tasklist) extend EventEmitter and emit typed CustomEvents. Models never reference UI; UI listens to model events.

3. **Web Components without Shadow DOM** — Components use regular DOM for simplicity.

4. **ESM Modules with .js Extensions** — All imports must include .js extension (required for native ESM).

5. **Guard-Checked Custom Element Registration** — Child elements registered with `!customElements.get(name)` guards in app2.ts to prevent double-registration.

6. **connectedCallback-Based Initialization** — Never initialize in constructor; all DOM access happens in connectedCallback.

## Outstanding Documentation Work

From todo.md (as of April 18):
- [ ] TasklistUI component — logic, documentation, and integration (blocking)
- [ ] TaskUI component — refactor from BaseUI pattern to direct HTMLElement extension
- Check if connectedCallback setup pattern is truly required for all components
- Evaluate if a shared BaseUI extending HTMLElement makes sense (currently no—direct subclassing preferred)

## Code Patterns Documented

- **connectedCallback Lifecycle** — render → cache elements → initialize UI → wire event handlers
- **Root Component Deferral** — App2 uses requestAnimationFrame() to allow child connectedCallbacks to run first
- **Model-UI Interaction** — Both pull pattern (direct updateUI() calls) and push pattern (model event listeners) used; CounterUI2 demonstrates both
- **Element Querying** — Each component defines typed getUIElementById<T>() helper

## Mermaid Diagrams Present

- **architecture.md** — 1 class diagram (component hierarchy), 1 sequence diagram (app startup)
- **models.md** — 3 sequence diagrams (Counter interaction, Task property changes, Tasklist operations)

All diagrams validated for correct GFM-compatible Mermaid syntax.

## Cross-Reference Status

All links between documentation files verified:
- README.md → all 7 doc files (working)
- architecture.md → component-patterns.md anchor #code-migration (working)
- No broken or orphaned references

## Notes for Future Documentation Work

When TasklistUI is implemented:
1. Add to frontend.md active components section with table showing DOM elements and properties
2. Add sequence diagram to models.md if new event patterns emerge
3. Update architecture.md class diagram to include TasklistUI and Task model relationships
4. Consider adding a full integration example in component-patterns.md showing TasklistUI + Tasklist interaction

Consistency: All active components now follow regions pattern (Fields → Constructor → Properties → Lifecycle → DOM → Event Handlers → UI). Document this as standard when onboarding new features.
