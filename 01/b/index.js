const fs = require("fs");
const path = require("path");
const readline = require("readline");

const sumReducer = (acc, curr) => Number(curr) + acc;
const compareWindowsSum = (queue, windowSize) =>
  queue.slice(0, windowSize).reduce(sumReducer, 0) <
  queue.slice(1, windowSize + 1).reduce(sumReducer, 0);

async function main() {
  const fileLines = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
  });

  const windowSize = 3;
  const linesQueue = [];
  let result = 0;

  try {
    for await (const line of fileLines) {
      if (linesQueue.length === windowSize + 1) {
        result += compareWindowsSum(linesQueue, windowSize);
        linesQueue.shift();
      }

      linesQueue.push(line);
    }
  } catch (e) {
    console.error(e);
  }

  result += compareWindowsSum(linesQueue, windowSize);

  console.log(result);
}

main();
