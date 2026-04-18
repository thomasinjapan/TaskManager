# Backend

## Stack

ASP.NET Core 8 minimal API (`net8.0`). Currently serves only static files — no custom routes are defined yet.

## Entry Point (`TaskManager/Program.cs`)

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();  // resolves / → index.html
app.UseStaticFiles();   // serves TaskManager/wwwroot/

app.Run();
```

`UseDefaultFiles()` must be called before `UseStaticFiles()` so that requests to `/` are rewritten to `/index.html` before the static file middleware handles them.

## Static File Root

Files placed in `TaskManager/wwwroot/` are served at the web root:

| File | URL |
|------|-----|
| `wwwroot/index.html` | `/` or `/index.html` |
| `wwwroot/styles.css` | `/styles.css` |
| `wwwroot/dist/bootstrapper.js` | `/dist/bootstrapper.js` |

## Adding API Routes

New routes are added in `Program.cs` using minimal API syntax:

```csharp
app.MapGet("/api/tasks", () => Results.Ok(new[] { "task1", "task2" }));
app.MapPost("/api/tasks", (Task task) => Results.Created($"/api/tasks/{task.Id}", task));
```

## Configuration

| File | Purpose |
|------|---------|
| `appsettings.json` | Production settings (logging, allowed hosts) |
| `appsettings.Development.json` | Development overrides (loaded when `ASPNETCORE_ENVIRONMENT=Development`) |
| `Properties/launchSettings.json` | Debug launch profiles (ports, environment variables) |

Default ports (from `launchSettings.json`): HTTPS `7294`, HTTP `5171`.
