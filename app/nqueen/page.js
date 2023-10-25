"use client";
import React, { useEffect, useState } from "react";

var SpeedTime = 600;

const NQueen = () => {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(4);
  const [speed, setSpeed] = useState(600);

  useEffect(() => {
    gridInit();
  }, [gridSize]);

  const gridInit = () => {
    grid.forEach((row, i) => {
      row.forEach((v, j) => {
        if ((i + j) % 2 === 0)
          document.getElementById(`cell-${i}-${j}`).classList =
            "queen-cell gray-cell";
        else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
      });
    });
    let grid1 = new Array(gridSize);
    for (let i = 0; i < gridSize; i++)
      grid1[i] = new Array(gridSize).fill(false);
    setGrid(grid1);
  };

  var isSafe = async (r, c) => {
    var flag = 1;
    // row-wise
    for (let j = 0; j < c; j++) {
      if (grid[r][j]) {
        flag = 0;
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell blue-cell";
    }
    for (let j = c + 1; j < gridSize; j++) {
      if (grid[r][j]) {
        flag = 0;
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell blue-cell";
    }
    // col-wise
    for (let i = 0; i < r; i++) {
      if (grid[i][c]) {
        flag = 0;
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell blue-cell";
    }
    for (let i = r + 1; i < gridSize; i++) {
      if (grid[i][c]) {
        flag = 0;
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell blue-cell";
    }
    // right diagonal
    for (let i = r + 1, j = c + 1; i < gridSize && j < gridSize; i++, j++) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }
    // left diagonal
    for (let i = r + 1, j = c - 1; i < gridSize && j >= 0; i++, j--) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img red-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }
    for (let i = r - 1, j = c + 1; i >= 0 && j < gridSize; i--, j++) {
      if (grid[i][j]) {
        flag = 0;
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img blue-cell";
      } else
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell blue-cell";
    }

    await waitForAnimatoin(SpeedTime);
    // ------------------------- undo ---------------------------
    // row-wise
    for (let j = 0; j < c; j++) {
      if (grid[r][j])
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((r + j) % 2 === 0)
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${r}-${j}`).classList = "queen-cell";
    }
    for (let j = c + 1; j < gridSize; j++) {
      if (grid[r][j])
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((r + j) % 2 === 0)
        document.getElementById(`cell-${r}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${r}-${j}`).classList = "queen-cell";
    }
    // col-wise
    for (let i = 0; i < r; i++) {
      if (grid[i][c])
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + c) % 2 === 0)
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${c}`).classList = "queen-cell";
    }
    for (let i = r + 1; i < gridSize; i++) {
      if (grid[i][c])
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + c) % 2 === 0)
        document.getElementById(`cell-${i}-${c}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${c}`).classList = "queen-cell";
    }
    // right diagonal
    for (let i = r + 1, j = c + 1; i < gridSize && j < gridSize; i++, j++) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    // left diagonal
    for (let i = r + 1, j = c - 1; i < gridSize && j >= 0; i++, j--) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    for (let i = r - 1, j = c + 1; i >= 0 && j < gridSize; i--, j++) {
      if (grid[i][j])
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell queen-img green-cell";
      else if ((i + j) % 2 === 0)
        document.getElementById(`cell-${i}-${j}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
    }
    return flag;
  };

  var n_queen = async (c, q) => {
    if (c >= gridSize || q >= gridSize) {
      return q >= gridSize;
    }
    for (var r = 0; r < gridSize; r++) {
      document.getElementById(`cell-${r}-${c}`).classList =
        "queen-cell queen-img yellow-cell";
      await waitForAnimatoin(SpeedTime);

      if (await isSafe(r, c)) {
        document.getElementById(`cell-${r}-${c}`).classList =
          "queen-cell queen-img green-cell";
        grid[r][c] = true;
        if (await n_queen(c + 1, q + 1)) return true;

        // backtrack
        grid[r][c] = false;
        if ((r + c) % 2 === 0)
          document.getElementById(`cell-${r}-${c}`).classList =
            "queen-cell gray-cell";
        else document.getElementById(`cell-${r}-${c}`).classList = "queen-cell";
      } else if ((r + c) % 2 === 0)
        document.getElementById(`cell-${r}-${c}`).classList =
          "queen-cell gray-cell";
      else document.getElementById(`cell-${r}-${c}`).classList = "queen-cell";
    }
    return false;
  };

  const startHandle = async () => {
    var btns = document.getElementsByClassName("dis");
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
    await n_queen(0, 0);
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };

  const timeHandle = (e) => {
    let value = parseInt(e.target.value);
    SpeedTime = 1300 - value;
    setSpeed(value);
  };

  return (
    <>
      <div className="h-[80vh]">
        <div className="mx-auto my-8 flex max-w-2xl justify-between">
          <button onClick={startHandle} className="start-btn dis">
            Start Visualize
          </button>
          <div className="flex flex-col items-center justify-around">
            <div>
              <label htmlFor="gridSizeRange" className="label mr-1">
                Size:
              </label>
              <input
                className="slider dis ml-2"
                type="range"
                onChange={(e) => {
                  setGridSize(parseInt(e.target.value));
                }}
                value={gridSize}
                min="3"
                max="8"
                step="1"
                id="gridSizeRange"
              ></input>
            </div>
            <div>
              <label htmlFor="speedRange" className="label mr-1">
                Speed:
              </label>
              <input
                className="slider ml-2"
                type="range"
                onChange={timeHandle}
                value={speed}
                min="100"
                max="1200"
                id="speedRange"
              ></input>
            </div>
          </div>
          <button
            onClick={() => {
              gridInit();
            }}
            className="button-primary dis"
          >
            Clear Board
          </button>
        </div>
        {grid.map((row, i) => {
          return (
            <div key={i} className="flex items-center justify-center">
              {row.map((v, j) => {
                if ((i + j) % 2 === 0)
                  return (
                    <div
                      id={`cell-${i}-${j}`}
                      key={j}
                      className="queen-cell gray-cell"
                    ></div>
                  );
                return (
                  <div
                    id={`cell-${i}-${j}`}
                    key={j}
                    className="h-[70px] w-[70px] outline outline-1 outline-[#607d8b]"
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

async function waitForAnimatoin(times) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, times);
  });
}

export default NQueen;
