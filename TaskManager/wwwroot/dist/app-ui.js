import { Counter } from "./counter.js";
import { CounterUI } from "./counter-ui.js";
function initializeApp() {
  const appContainer = document.getElementById("app-ui");
  if (!appContainer) {
    throw new Error("App container not found");
  }
  console.log("App container found:", appContainer);
  const counter = new Counter();
  const counterUI = new CounterUI(appContainer, counter);
}
document.addEventListener("DOMContentLoaded", initializeApp);
//# sourceMappingURL=app-ui.js.map
