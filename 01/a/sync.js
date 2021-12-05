const fs = require("fs");
const path = require("path");

const fileLines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

const result = fileLines.reduce(
  (acc, curr, index, arr) =>
    index === 0 ? acc : acc + (Number(arr[index - 1]) < Number(curr)),
  0
);

console.log(result);
