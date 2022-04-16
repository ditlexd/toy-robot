import { Direction, Grid, Robot } from "../../@types/simulator";

function getCleanGrid(): Grid {
  return [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
}

export function place(
  robot: Robot,
  grid: Grid,
  x: number,
  y: number,
  direction: Direction
): Grid {
  if (x >= grid[0].length || y >= grid.length) {
    return grid;
  }

  robot.direction = direction;
  const newGrid = getCleanGrid();
  newGrid[y][x] = robot;

  return newGrid;
}
