export class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.isEmpty() ? "Queue is empty" : this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}
