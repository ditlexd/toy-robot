import { Grid, Robot } from "../../@types/simulator";
import { left, move, place, right } from "./grid";

export function parseAndExecuteInput(input: string, grid: Grid): Grid {
  const [cmd, ...rest] = input.split(" ");

  switch (cmd) {
    case "PLACE":
      return executePlace(rest.join(), grid);
    case "MOVE":
      return move(grid);
    case "LEFT":
      return left(grid);
    case "RIGHT":
      return right(grid);
    default:
      return grid;
  }
}

function executePlace(args: string, grid: Grid) {
  const arr = args.split(",").filter((x) => x !== "");
  const [x, y, direction] = arr;

  if (
    direction !== "NORTH" &&
    direction !== "EAST" &&
    direction !== "WEST" &&
    direction !== "SOUTH"
  ) {
    return grid;
  }

  const robot: Robot = {
    direction,
    position: { x: parseInt(x), y: parseInt(y) },
  };
  return place(robot, grid, parseInt(x), parseInt(y), direction);
}
