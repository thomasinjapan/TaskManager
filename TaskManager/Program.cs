var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.UseDefaultFiles(); // sucht nach index.html, default.html etc.
app.UseStaticFiles();  // liefert Dateien aus wwwroot
//app.MapGet("/", () => "Hello World!");

app.Run();
