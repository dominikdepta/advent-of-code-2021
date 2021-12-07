const fs = require("fs");
const path = require("path");

const commands = fs
  .readFileSync(path.join(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((l) => l.split(" "));

const submarineInitialState = {
  position: {
    x: 0,
  },
  depth: 0,
};

const actions = {
  forward: (state, value) => ({
    ...state,
    position: {
      x: state.position.x + Number(value),
    },
  }),
  up: (state, value) => ({
    ...state,
    depth: state.depth - Number(value),
  }),
  down: (state, value) => ({
    ...state,
    depth: state.depth + Number(value),
  }),
};

const submarineState = commands.reduce(
  (state, [actionName, ...args]) =>
    typeof actions[actionName] === "function"
      ? actions[actionName](state, ...args)
      : state,
  submarineInitialState
);

console.log(submarineState);
console.log(submarineState.position.x * submarineState.depth);
