const fs = require("fs");
const path = require("path");

const digits = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((l) => l.split("").map((d) => Number(d)));

const getDigitColumns = (digits = []) =>
  digits[0].map((_, i) => digits.map((row) => row[i]));

const getColumnsAverage = (digitColumns = []) =>
  digitColumns.map((col) => col.reduce((acc, d) => acc + d, 0) / col.length);

const columnsAverageToBit =
  (leastCommon = false) =>
  (average) => {
    if (average < 0.5) {
      return leastCommon ? 1 : 0;
    }

    if (average > 0.5) {
      return leastCommon ? 0 : 1;
    }

    return leastCommon ? 0 : 1;
  };

const createDigitsRecursiveFilter = (filterFn) =>
  function applyFilter(digits, bitPosition = 0) {
    if (digits.length <= 1 || bitPosition === digits[0].length) {
      return digits;
    }

    return applyFilter(filterFn(digits, bitPosition), bitPosition + 1);
  };

const getMostCommonBit = columnsAverageToBit(false);
const getLeastCommonBit = columnsAverageToBit(true);

const filterByMostCommonBit = createDigitsRecursiveFilter(
  (digits, bitPosition) => {
    const digitColumns = getDigitColumns(digits);
    const columnsAverage = getColumnsAverage(digitColumns);
    const mostCommonBit = getMostCommonBit(columnsAverage[bitPosition]);

    return digits.filter((digit) => digit[bitPosition] === mostCommonBit);
  }
);

const filterByLeastCommonBit = createDigitsRecursiveFilter(
  (digits, bitPosition) => {
    const digitColumns = getDigitColumns(digits);
    const columnsAverage = getColumnsAverage(digitColumns);
    const mostCommonBit = getLeastCommonBit(columnsAverage[bitPosition]);

    return digits.filter((digit) => digit[bitPosition] === mostCommonBit);
  }
);

const oxygenGeneratorRating = parseInt(
  filterByMostCommonBit(digits, 0)[0].join(""),
  2
);
const co2ScrubberRating = parseInt(
  filterByLeastCommonBit(digits, 0)[0].join(""),
  2
);

const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

console.log(lifeSupportRating);
