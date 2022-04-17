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

describe("Play game", () => {
  test("Should move correctly around board", () => {
    const initialGrid = getCleanGrid();
    const robot = { ...initialRobot };

    const newGrid = place(robot, initialGrid, 2, 2, "NORTH");
    const one = move(newGrid);
    const two = move(one);
    const turnedLeft = left(two);

    const movedRobot = getRobot(turnedLeft);
    expect(movedRobot).not.toBeNull();
    expect(movedRobot!.direction).toBe("WEST");
    expect(movedRobot!.position).toStrictEqual({ x: 2, y: 4 });
  });
});
