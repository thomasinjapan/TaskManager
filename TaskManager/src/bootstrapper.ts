/**  src/bootstrapper.ts  **/

import { App2 } from './app2.js';

customElements.define('app-root', App2);


// Wait for DOM to be fully loaded
function initializeApp(): void {
    const appContainer = document.getElementById('bootstrapper') as HTMLElement;
    if (!appContainer) {
        throw new Error('App container not found');
    }
    console.log('App container found:', appContainer);

    // Initialize counter and counter UI
    const app_root: App2 = document.createElement('app-root') as App2;
    appContainer.appendChild(app_root);

    //    const bootstrapper = new App(appContainer);
}

document.addEventListener('DOMContentLoaded', initializeApp);