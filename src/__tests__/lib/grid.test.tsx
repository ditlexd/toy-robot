import { Grid, Robot } from "../../../@types/simulator";
import { getRobot, place } from "../../lib/grid";

function getCleanGrid(): Grid {
  return [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
}

const initialRobot: Robot = { direction: null, position: null };

describe("PLACE on grid", () => {
  test("Should place robot on correct grid position", () => {
    const initialGrid = getCleanGrid();

    const newGrid = place(initialRobot, initialGrid, 2, 2, "NORTH");

    expect(newGrid[2][2]).not.toBeNull();
  });

  test("Should move robot to new position", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const newGrid = place(robot, initialGrid, 2, 2, "NORTH");
    expect(newGrid[2][2]).not.toBeNull();

    const nextGrid = place(robot, initialGrid, 0, 0, "NORTH");
    expect(nextGrid[2][2]).toBeNull();
    expect(nextGrid[0][0]).not.toBeNull();
  });

  test("Should give robot correct direciton", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const north = place(robot, initialGrid, 2, 2, "NORTH");
    expect(north[2][2]?.direction).toMatch("NORTH");

    const east = place(robot, north, 2, 2, "EAST");
    expect(east[2][2]?.direction).toMatch("EAST");

    const south = place(robot, east, 2, 2, "SOUTH");
    expect(south[2][2]?.direction).toMatch("SOUTH");

    const west = place(robot, south, 2, 2, "WEST");
    expect(west[2][2]?.direction).toMatch("WEST");
  });

  test("Should not do anything when trying to place out of bounds", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const newGrid = place(robot, initialGrid, 2, 2, "NORTH");

    expect(newGrid[2][2]).not.toBeNull();

    const outOfBounds = place(robot, newGrid, 5, 2, "NORTH");
    expect(outOfBounds[2][2]).not.toBeNull();
  });

  test("Should update robots position when placed", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const newGrid = place(robot, initialGrid, 2, 2, "NORTH");

    expect(newGrid[2][2]).not.toBeNull();
  });
});

describe("Get Robot", () => {
  test("should return robot from grid", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const newGrid = place(robot, initialGrid, 2, 2, "NORTH");

    const foundRobot = getRobot(newGrid);
    expect(foundRobot).not.toBeNull();
    expect(foundRobot!.position).toStrictEqual({ x: 2, y: 2 });
    expect(foundRobot!.direction).toBe("NORTH");
  });

  test("Should return null if robot is not placed", () => {
    const foundRobot = getRobot(getCleanGrid());
    expect(foundRobot).toBeNull();
  });
});
