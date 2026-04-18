/** src/bootstrapper.ts */

import { App2 } from './app2.js';

customElements.define('app-root', App2);

/** Creates and mounts the root `<app-root>` element into the #bootstrapper host. */
function initializeApp(): void {
    const appContainer = document.getElementById('bootstrapper') as HTMLElement;
    if (!appContainer) {
        throw new Error('App container not found');
    }
    console.log('App container found:', appContainer);

    const app_root: App2 = document.createElement('app-root') as App2;
    appContainer.appendChild(app_root);
}

document.addEventListener('DOMContentLoaded', initializeApp);