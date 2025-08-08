/**  src/app-ui.ts  **/

import { Counter } from './counter.js';
import { CounterUI } from './counter-ui.js';

// Wait for DOM to be fully loaded
function initializeApp(): void {
    const appContainer = document.getElementById('app-ui') as HTMLElement;
    if (!appContainer) {
        throw new Error('App container not found');
    }
    console.log('App container found:', appContainer);

    // Initialize counter and counter UI
    const counter = new Counter();
    const counterUI = new CounterUI(appContainer, counter);
}

document.addEventListener('DOMContentLoaded', initializeApp);