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
  robot.position = { x, y };
  const newGrid = getCleanGrid();
  newGrid[y][x] = robot;

  return newGrid;
}

export function getRobot(grid: Grid): Robot | null {
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    for (var j = 0; j < row.length; j++) {
      if (grid[i][j] !== null) {
        return grid[i][j];
      }
    }
  }
  return null;
}
