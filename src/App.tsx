import React, { useState } from "react";
import { Robot } from "../@types/simulator";
import { place } from "./lib/grid";

const robot: Robot = {
  direction: null,
  position: null,
};

const initialGrid = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

function App() {
  const [grid, setGrid] = useState<Array<Array<Robot | null>>>(initialGrid);

  return (
    <div className="bg-gray-400 h-screen flex flex-col w-screen justify-center items-center">
      {grid.reverse().map((row, y) => {
        return (
          <div className="flex" key={"row-" + y}>
            {row.map((box, x) => {
              const color = box ? "bg-green-900" : "bg-gray-900";
              return (
                <div
                  key={x}
                  onClick={() => {
                    const n = place(robot, grid, x, y, "NORTH");
                    setGrid(n.reverse());
                  }}
                  className={`${color} h-14 w-14 border-black border-2`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
