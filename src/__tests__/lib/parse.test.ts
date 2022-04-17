import { Grid, Robot } from "../../../@types/simulator";
import { getRobot, left, move, place, right } from "../../lib/grid";
import { parseInput } from "../../lib/parse-input";
import exp from "constants";

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

describe("Place robot on correct spot using PLACE command", () => {
  test("Place on correct position", () => {
    const grid = getCleanGrid();
    const placed = parseInput("PLACE 2,2,NORTH", grid);
    const robot = getRobot(placed);

    expect(robot).not.toBeNull();
    expect(robot!.direction).toMatch("NORTH");
    expect(robot!.position).toStrictEqual({ x: 2, y: 2 });
  });
});
