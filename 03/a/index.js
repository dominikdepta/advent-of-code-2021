const fs = require("fs");
const path = require("path");

const digits = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((l) => l.split("").map((d) => Number(d)));

const digitColumns = digits[0].map((_, i) => digits.map((row) => row[i]));

const columnsAverage = digitColumns.map((col) => {
  return col.reduce((acc, d) => acc + d, 0) / col.length
});

const gammaRateBinary = columnsAverage.map((avg) => avg > 0.5 ? 1 : 0).join('');
const epsilonRateBinary = columnsAverage.map((avg) => avg < 0.5 ? 1 : 0).join('');

const powerConsumptionDecimal = parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2);

console.log(powerConsumptionDecimal);