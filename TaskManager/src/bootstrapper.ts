/**  src/bootstrapper.ts  **/

import { App } from './app.js';

// Wait for DOM to be fully loaded
function initializeApp(): void {
    const appContainer = document.getElementById('bootstrapper') as HTMLElement;
    if (!appContainer) {
        throw new Error('App container not found');
    }
    console.log('App container found:', appContainer);

    // Initialize counter and counter UI
    const bootstrapper = new App(appContainer);
}

document.addEventListener('DOMContentLoaded', initializeApp);