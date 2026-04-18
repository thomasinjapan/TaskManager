import { App2 } from "./app2.js";
customElements.define("app-root", App2);
function initializeApp() {
  const appContainer = document.getElementById("bootstrapper");
  if (!appContainer) {
    throw new Error("App container not found");
  }
  console.log("App container found:", appContainer);
  const app_root = document.createElement("app-root");
  appContainer.appendChild(app_root);
}
document.addEventListener("DOMContentLoaded", initializeApp);
//# sourceMappingURL=bootstrapper.js.map
