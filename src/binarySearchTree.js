class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let tmp = [...new Set(array)];
    const sorted = tmp.sort((a, b) => a - b);

    const newNode = (arr) => {
      if (arr.length === 0) return null;

      let split = Math.floor(arr.length / 2);
      let node = new Node(arr[split]);

      node.left = newNode(arr.slice(0, split));
      node.right = newNode(arr.slice(split + 1));

      return node;
    };
    return newNode(sorted);
  }
  includes(value) {
    if (!Number.isInteger(value)) throw new Error("Must be a number");
    let current = this.root;
    if (current.data === value) {
      return true;
    }
    function search() {
      if (value < current.data) {
        if (current.left === null) return false;
        current = current.left;
      }
      if (value > current.data) {
        if (current.right === null) return false;
        current = current.right;
      }
      if (current.data === value) {
        return true;
      } else {
        return search();
      }
    }
    return search();
  }
}
