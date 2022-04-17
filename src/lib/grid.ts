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
  if (x >= grid[0].length || y >= grid.length || x < 0 || y < 0) {
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

export function move(grid: Grid): Grid {
  const robot = getRobot(grid);
  if (robot === null) {
    return grid;
  }

  switch (robot.direction) {
    case "NORTH":
      return moveNorth(grid, robot);
    case "SOUTH":
      return moveSouth(grid, robot);
    case "WEST":
      return moveWest(grid, robot);
    case "EAST":
      return moveEast(grid, robot);
  }

  return grid;
}

function moveEast(grid: Grid, robot: Robot) {
  if (!robot.position || !robot.direction) {
    return grid;
  }

  const { x, y } = robot?.position;
  return place(robot, grid, x + 1, y, robot.direction);
}

function moveWest(grid: Grid, robot: Robot) {
  if (!robot.position || !robot.direction) {
    return grid;
  }

  const { x, y } = robot?.position;
  return place(robot, grid, x - 1, y, robot.direction);
}

function moveSouth(grid: Grid, robot: Robot) {
  if (!robot.position || !robot.direction) {
    return grid;
  }

  const { x, y } = robot?.position;
  return place(robot, grid, x, y - 1, robot.direction);
}

function moveNorth(grid: Grid, robot: Robot): Grid {
  if (!robot.position || !robot.direction) {
    return grid;
  }

  const { x, y } = robot?.position;
  return place(robot, grid, x, y + 1, robot.direction);
}

export function left(grid: Grid) {
  const robot = getRobot(grid);
  if (!robot || !robot.position || !robot.direction) {
    return grid;
  }

  switch (robot.direction) {
    case "NORTH":
      robot.direction = "WEST";
      break;
    case "WEST":
      robot.direction = "SOUTH";
      break;
    case "SOUTH":
      robot.direction = "EAST";
      break;
    case "EAST":
      robot.direction = "NORTH";
      break;
  }
  return place(
    robot,
    grid,
    robot.position.x,
    robot.position.y,
    robot.direction
  );
}

export function right(grid: Grid) {
  const one = left(grid);
  const two = left(one);
  return left(two);
}
