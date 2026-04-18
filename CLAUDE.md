# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A training project for building vanilla web apps. Hybrid ASP.NET Core 8 (C#) backend + Vanilla TypeScript frontend using Web Components (no framework).

## Commands

All commands run from `TaskManager/` (the project subdirectory).

| Goal | Command |
|------|---------|
| Full build | `npm run build` |
| Watch mode (development) | `npm run watch-wwwroot` |
| .NET build (also triggers npm build) | `dotnet build` from repo root |

The `.csproj` has a `PreBuild` hook that runs `npm run build` automatically, so `dotnet build` covers both TypeScript and C#.

No test commands are configured yet.

## Architecture

**Backend** (`Program.cs`): Minimal ASP.NET Core 8 setup — only serves static files from `wwwroot/`. No custom API routes yet.

**Frontend** (`src/`): Vanilla TypeScript compiled by esbuild to ESM modules in `wwwroot/dist/`. Entry point is `bootstrapper.ts`, which registers `App2` as `<app-root>` and mounts it.

### Component Model

All UI components are custom elements extending `HTMLElement` directly — no shadow DOM, no framework. The pattern is:

1. **Models** (`counter.ts`, `task.ts`, `tasklist.ts`) extend `EventEmitter` and emit typed `CustomEvent<T>` on state changes.
2. **UI components** (`*-ui.ts` or `*-ui2.ts`) extend `HTMLElement`, use `connectedCallback()` for initialization, manipulate `innerHTML` directly, and listen to model events to re-render.

### Active vs Legacy Files

- `app2.ts` is the active app root — `app.ts` is legacy (to be removed)
- `counter2-ui.ts` is the active counter component — `counter-ui.ts` is legacy (to be removed)
- `baseclasses/baseui.ts` is being phased out — new components extend `HTMLElement` directly

### Build Outputs

- `wwwroot/dist/` — ESM modules loaded individually by the browser (primary)
- `localroot/bundle.js` — single bundled file (alternative entry point)
