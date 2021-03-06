import { Grid, Robot } from "../../../@types/simulator";
import { getRobot, left, move, place, right } from "../../lib/grid";

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

describe("MOVE", () => {
  test("Should move one step NORTH", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 2, 2, "NORTH");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 2, y: 3 });
  });

  test("Should move one step SOUTH", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 2, 2, "SOUTH");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 2, y: 1 });
  });

  test("Should move one step WEST", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 2, 2, "WEST");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 1, y: 2 });
  });

  test("Should move one step EAST", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 2, 2, "EAST");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 3, y: 2 });
  });

  test("Should not move SOUTH out of bounds", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "SOUTH");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 0, y: 0 });
  });

  test("Should not move WEST out of bounds", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "WEST");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 0, y: 0 });
  });

  test("Should not move NORTH out of bounds", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 4, "NORTH");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 0, y: 4 });
  });

  test("Should not move EAST out of bounds", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 4, 0, "EAST");
    const moved = move(placed);

    const movedRobot = getRobot(moved);

    expect(movedRobot?.position).toStrictEqual({ x: 4, y: 0 });
  });
});

describe("LEFT", () => {
  test("Should turn WEST from NORTH", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "NORTH");
    const turned = left(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("WEST");
  });

  test("Should turn SOUTH from WEST", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "WEST");
    const turned = left(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("SOUTH");
  });

  test("Should turn EAST from SOUTH", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "SOUTH");
    const turned = left(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("EAST");
  });

  test("Should turn NORTH from EAST", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "EAST");
    const turned = left(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("NORTH");
  });
});

describe("RIGHT", () => {
  test("Should turn EAST from NORTH", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "NORTH");
    const turned = right(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("EAST");
  });

  test("Should turn SOUTH from EAST", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "EAST");
    const turned = right(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("SOUTH");
  });

  test("Should turn WEST from SOUTH", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "SOUTH");
    const turned = right(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("WEST");
  });

  test("Should turn NORTH from WEST", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const placed = place(robot, initialGrid, 0, 0, "WEST");
    const turned = right(placed);

    const turnedRobot = getRobot(turned);
    expect(turnedRobot!.direction).toMatch("NORTH");
  });
});
