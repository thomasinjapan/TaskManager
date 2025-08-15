import { App } from "./app.js";
function initializeApp() {
  const appContainer = document.getElementById("bootstrapper");
  if (!appContainer) {
    throw new Error("App container not found");
  }
  console.log("App container found:", appContainer);
  const bootstrapper = new App(appContainer);
}
document.addEventListener("DOMContentLoaded", initializeApp);
//# sourceMappingURL=bootstrapper.js.map
