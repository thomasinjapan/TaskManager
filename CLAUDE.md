# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla TypeScript front-end application served by an ASP.NET Core (.NET 8) backend. The backend is a minimal static file server — all application logic lives in TypeScript. The project goal is to practice building vanilla web apps without frameworks.

## Commands

All frontend commands run from `TaskManager/` (where `package.json` lives).

```bash
# Install JS dependencies
cd TaskManager && npm install

# Build TypeScript (both wwwroot and localroot targets)
cd TaskManager && npm run build

# Watch mode (wwwroot — ESM modules, one file per source file)
cd TaskManager && npm run watch-wwwroot

# Watch mode (localroot — single bundled file for local testing without ASP.NET)
cd TaskManager && npm run watch-localroot

# Run the ASP.NET Core backend (triggers npm run build via PreBuild hook)
dotnet run --project TaskManager/TaskManager.csproj
```

There are no test commands configured yet.

## Architecture

### Two build targets

| Target | Script | Output | Purpose |
|---|---|---|---|
| `wwwroot` | `build-wwwroot` | `wwwroot/dist/*.js` | Served by ASP.NET Core; ESM format, one JS per TS source file |
| `localroot` | `build-localroot` | `localroot/bundle.js` | Single bundle for opening `localroot/index.html` directly in browser without a server |

esbuild handles transpilation; `tsconfig.json` is used by the TypeScript compiler for type checking only (not for emit).

### Class architecture pattern

Every domain concept has a paired logic class and UI class:

- **Logic class** (e.g. `Task`, `Tasklist`, `Counter`) extends `EventEmitter` (`baseclasses/EventHandling.ts`), which itself extends the native `EventTarget`. State changes fire typed `CustomEvent`s with strongly-typed payloads defined in a same-name namespace (e.g. `Task.event_payload_titleupdated`).
- **UI class** (e.g. `TaskUI`, `TasklistUI`, `CounterUI`) extends `BaseUI` (`baseclasses/baseui.ts`). The constructor receives an `HTMLElement` container and a logic object, calls `initializeUI()` to inject `_design` HTML into the container, then wires both DOM event listeners (`setupDOMEventListeners`) and logic object event handlers (`setupObjectEventHandlers`).

### Entry point flow

`bootstrapper.ts` → `App` (`app.ts`) → instantiates logic objects and UI objects, passing HTML containers located by id inside `#bootstrapper`.

### Event conventions

- Event name constants are public instance fields on the logic class (e.g. `task.EVENT_TITLE_UPDATED`).
- Event payloads are typed via namespace types on the same class.
- UI handlers cast the incoming `Event` to `CustomEvent<any>` and then to the specific payload type.

## Key Files

| File | Role |
|---|---|
| `TaskManager/src/baseclasses/EventHandling.ts` | Base `EventEmitter` — extend for all logic classes |
| `TaskManager/src/baseclasses/baseui.ts` | Base `BaseUI` — extend for all UI classes |
| `TaskManager/src/app.ts` | Wires all objects together; edit here to add new features to the app |
| `TaskManager/src/bootstrapper.ts` | DOM entry point; bootstraps `App` on `DOMContentLoaded` |
| `TaskManager/TaskManager.csproj` | Runs `npm run build` automatically as a pre-build step |
| `TaskManager/wwwroot/index.html` | HTML served by ASP.NET Core |
| `TaskManager/localroot/index.html` | HTML for direct browser use (no server needed) |
