import React, { useState } from "react";
import { Robot } from "../@types/simulator";
import { parseAndExecuteInput } from "./lib/parse-and-execute-input";
import { getRobot } from "./lib/grid";

const initialGrid = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

async function getCommands() {
  return fetch("../commands.txt").then((r) => r.text());
}

function App() {
  const [grid, setGrid] = useState<Array<Array<Robot | null>>>(initialGrid);
  const [input, setInput] = useState("");
  const [robotInfo, setRobotInfo] = useState("");

  async function executeCommands() {
    const commands = await getCommands();
    const commandList = commands.split("\n");

    let newGrid = grid.slice();

    for (const cmd of commandList) {
      if (cmd.match("REPORT")) {
        const robot = getRobot(newGrid);
        if (!robot || !robot.position || !robot.direction) {
          continue;
        }

        setRobotInfo(
          `${robot.position.x}, ${robot.position.y}, ${robot.direction} `
        );
        continue;
      }
      newGrid = parseAndExecuteInput(cmd, newGrid);
    }
    setGrid(newGrid);
  }

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (input.match("REPORT")) {
      const robot = getRobot(grid);
      if (!robot || !robot.position || !robot.direction) {
        return;
      }

      setRobotInfo(
        `${robot.position.x}, ${robot.position.y}, ${robot.direction} `
      );
      return;
    }
    const newGrid = parseAndExecuteInput(input, grid);
    setGrid(newGrid);
    setRobotInfo("");
    setInput("");
  }

  const reversedGrid = grid.slice(0).reverse();

  return (
    <div className="bg-gray-400 h-screen flex flex-col w-screen justify-center items-center">
      <form onSubmit={onSubmit}>
        <label>
          Command:
          <input
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            type="text"
            name="name"
            value={input}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="border-gray-700 border-2 mx-2"
        />
        <button
          className="border-gray-700 border-2 mx-2"
          onClick={executeCommands}
        >
          Execute commands
        </button>
      </form>
      {reversedGrid.map((row, y) => {
        return (
          <div className="flex" key={"row-" + y}>
            {row.map((box, x) => {
              const color = box ? "bg-green-900" : "bg-gray-900";
              return (
                <div
                  key={x}
                  className={`${color} h-14 w-14 border-black border-2`}
                />
              );
            })}
          </div>
        );
      })}
      <p>{robotInfo}</p>
    </div>
  );
}

export default App;
