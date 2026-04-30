import { Tree, log } from "./binarySearchTree.js";

const randomArray = (amount) => {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array[i] = Math.floor(Math.random() * 100);
  }
  return array;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree(randomArray(15));

prettyPrint(tree.root);

console.log(tree.isBalanced());

console.log(tree.levelOrderForEach(log));
console.log(tree.inOrderForEach(log));
console.log(tree.preOrderForEach(log));
console.log(tree.postOrderForEach(log));

tree.insert(103);
tree.insert(122);
tree.insert(145);
tree.insert(1023);
tree.insert(130);
tree.insert(111);
tree.insert(154);

prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);

console.log(tree.levelOrderForEach(log));
console.log(tree.inOrderForEach(log));
console.log(tree.preOrderForEach(log));
console.log(tree.postOrderForEach(log));
