const fs = require("fs");
const path = require("path");

const sumReducer = (acc, curr) => Number(curr) + acc;

const fileLines = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n");

const result = fileLines.reduce(
  (acc, curr, index, arr) =>
    acc +
    (arr.slice(index, index + 3).reduce(sumReducer, 0) <
      arr.slice(index + 1, index + 4).reduce(sumReducer, 0)),
  0
);

console.log(result);
