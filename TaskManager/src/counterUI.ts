import { Counter } from './counter.js';

export class CounterUI {
    private counter: Counter;
    private container: HTMLElement;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId)!;
        this.counter = new Counter();
        this.render();
    }

    private render() {
        this.container.innerHTML = `
      <h1>Counter: <span id="value">${this.counter.getValue()}</span></h1>
      <button id="inc">+</button>
      <button id="dec">-</button>
    `;

        document.getElementById('inc')!.addEventListener('click', () => this.update(this.counter.increment()));
        document.getElementById('dec')!.addEventListener('click', () => this.update(this.counter.decrement()));
    }

    private update(value: number) {
        const valueElement = document.getElementById('value');
        if (valueElement) {
            valueElement.textContent = value.toString();
        }
    }
}
