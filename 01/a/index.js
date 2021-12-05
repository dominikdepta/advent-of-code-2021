const fs = require("fs");
const path = require("path");
const readline = require("readline");

async function main() {
  const fileLines = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
  });

  let prevValue = null;
  let currValue = null;
  let result = 0;

  try {
    for await (const line of fileLines) {
      if (!prevValue) {
        prevValue = line;
      } else {
        prevValue = currValue;
        currValue = line;
      }

      result = result + (prevValue < currValue);
    }
  } catch (e) {
    console.error(e);
  }

  console.log(result);
}

main();
