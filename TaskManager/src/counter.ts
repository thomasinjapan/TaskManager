export class Counter {
    private value: number = 0;

    increment(): number {
        return ++this.value;
    }

    decrement(): number {
        return --this.value;
    }

    getValue(): number {
        return this.value;
    }
}
