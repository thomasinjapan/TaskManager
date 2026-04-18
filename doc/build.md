# Build System

## Tools

| Tool | Role |
|------|------|
| esbuild | TypeScript → JavaScript transpiler and bundler |
| npm | Package manager and script runner |
| MSBuild (.csproj) | .NET build, triggers npm automatically |

## npm Scripts

Run from `TaskManager/` (where `package.json` lives).

| Script | Command | Output |
|--------|---------|--------|
| `build` | `build-wwwroot` + `build-localroot` | Both outputs |
| `build-wwwroot` | esbuild all `src/**/*.ts` as ESM | `wwwroot/dist/` |
| `build-localroot` | esbuild `src/bootstrapper.ts` as bundle | `localroot/bundle.js` |
| `watch-wwwroot` | Same as `build-wwwroot` with `--watch` | `wwwroot/dist/` |
| `watch-localroot` | Same as `build-localroot` with `--watch` | `localroot/bundle.js` |
| `clean-wwwroot-dist` | rimraf `wwwroot/dist/` | — |
| `clean-localroot` | rimraf `localroot/bundle.js` | — |

## Build Outputs

### `wwwroot/dist/` — ESM modules

Each TypeScript file is compiled to a separate `.js` file preserving module boundaries. Sourcemaps are included. This is the output served to the browser in production.

### `localroot/bundle.js` — single bundle

All code starting from `bootstrapper.ts` bundled into one file. Useful for testing or environments that don't support ES modules natively.

## .NET / MSBuild Integration

The `.csproj` contains a `PreBuild` target that runs `npm run build` automatically before every .NET compilation:

```xml
<Target Name="PreBuild" BeforeTargets="PreBuildEvent">
  <Exec Command="npm run build" />
</Target>
```

This means `dotnet build` (and Visual Studio F5) always produces an up-to-date frontend.

## Typical Development Workflow

```bash
# Terminal 1 — watch TypeScript changes
cd TaskManager
npm run watch-wwwroot

# Terminal 2 — run the .NET host
dotnet run --project TaskManager
```

With watch mode active, saving a `.ts` file immediately recompiles it to `wwwroot/dist/`. Refresh the browser to pick up changes.

## TypeScript Configuration (`tsconfig.json`)

| Setting | Value | Effect |
|---------|-------|--------|
| `target` | `ES6` | Output ES6 syntax |
| `module` | `ESNext` | Keep ES module imports |
| `outDir` | `./wwwroot/dist` | Compiled output location |
| `strict` | `true` | All strict checks enabled |
