import { Tree, log } from "./binarySearchTree.js";

const array = [1, 2, 3, 4, 5, 6, 7];

const tree = new Tree(array);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

tree.insert(10);

tree.insert(12);
tree.insert(11);
tree.insert(14);
tree.insert(13);
tree.insert(15);
tree.insert(17);
tree.insert(16);

prettyPrint(tree.root);

console.log(tree.isBalanced());
