import { Queue } from "./queue.js";

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

  insert(value) {
    if (!Number.isInteger(value)) throw new Error("Must be a number");
    let current = this.root;
    if (current.data === value) {
      return false;
    }
    function findFree() {
      if (value < current.data) {
        if (current.left === null) {
          const node = new Node(value);
          current.left = node;
        }
        current = current.left;
      }
      if (value > current.data) {
        if (current.right === null) {
          const node = new Node(value);
          current.right = node;
        }
        current = current.right;
      }
      if (current.data === value) {
        return `${current.data} was added to the list!`;
      } else {
        return findFree();
      }
    }
    return findFree();
  }

  deleteItem(value) {
    function getSuccessor(node) {
      node = node.right;
      while (node !== null && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    function remove(node, value) {
      if (node === null) return null;
      console.log(node.data);
      if (value < node.data) {
        node.left = remove(node.left, value);
      } else if (value > node.data) {
        node.right = remove(node.right, value);
      } else {
        console.log("Found it");
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const successor = getSuccessor(node);
        node.data = successor.data;
        node.right = remove(node.right, node.data);
      }
      return node;
    }
    this.root = remove(this.root, value);
  }

  levelOrderForEach(call) {
    if (!call) throw new Error("Must include a callback");
    const queue = new Queue();
    call(this.root.data);
    function levelOrder(node) {
      if (node.left !== null) {
        queue.enqueue(node.left);
      }
      if (node.right !== null) {
        queue.enqueue(node.right);
      }
      while (!queue.isEmpty()) {
        let item = queue.dequeue();
        call(item.data);
        levelOrder(item);
      }
      return "Done";
    }
    return levelOrder(this.root);
  }

  inOrderForEach(call) {
    if (!call) throw new Error("Must include a callback");
    let queue = new Queue();
    function inOrder(node, res) {
      if (node.left !== null) inOrder(node.left, res);
      res.enqueue(node);
      if (node.left !== null) inOrder(node.right, res);
      return res;
    }
    queue = inOrder(this.root, queue);
    while (!queue.isEmpty()) {
      const item = queue.dequeue();
      call(item.data);
    }
  }

  preOrderForEach(call) {
    if (!call) throw new Error("Must include a callback");
    let queue = new Queue();
    function inOrder(node, res) {
      res.enqueue(node);
      if (node.left !== null) inOrder(node.left, res);
      if (node.right !== null) inOrder(node.right, res);
      return res;
    }
    queue = inOrder(this.root, queue);
    while (!queue.isEmpty()) {
      const item = queue.dequeue();
      call(item.data);
    }
  }

  postOrderForEach(call) {
    if (!call) throw new Error("Must include a callback");
    let queue = new Queue();
    function inOrder(node, res) {
      if (node.left !== null) inOrder(node.left, res);
      if (node.right !== null) inOrder(node.right, res);
      res.enqueue(node);
      return res;
    }
    queue = inOrder(this.root, queue);
    while (!queue.isEmpty()) {
      const item = queue.dequeue();
      call(item.data);
    }
  }

  getHeight(value) {
    function traverse(node, value) {
      if (value < node.data) {
        if (node.left) {
          return traverse(node.left, value);
        }
      } else if (value > node.data) {
        if (node.right) {
          return traverse(node.right, value);
        }
      }
      if (value === node.data) {
        function getMax(node) {
          if (node === null) return -1;
          const left = getMax(node.left);
          const right = getMax(node.right);
          return 1 + Math.max(left, right);
        }
        return getMax(node);
      }
    }
    return traverse(this.root, value);
  }

  getDepth(value) {
    let levels = 0;
    function traverse(node, value, levels) {
      if (value < node.data) {
        if (node.left) {
          return traverse(node.left, value, levels + 1);
        }
      } else if (value > node.data) {
        if (node.right) {
          return traverse(node.right, value, levels + 1);
        }
      }
      if (value === node.data) {
        return levels;
      }
    }
    return traverse(this.root, value, levels);
  }

  isBalanced() {
    const current = this.root;
    function getMax(node, current) {
      if (node === null) return -1;
      const left = getMax(node.left, current);
      const right = getMax(node.right, current);
      if (node === current) {
        return Math.abs(left - right) <= 1;
      }
      return 1 + Math.max(left, right);
    }
    return getMax(this.root, current);
  }
}

export const log = (item) => {
  console.log(item);
};
