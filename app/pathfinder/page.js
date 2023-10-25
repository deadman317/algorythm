"use client";
import React, { useEffect, useState } from "react";
import {
  Astar,
  Dijkstra,
  BFS,
  DFS,
  BasicMaze,
  RandomizedDfs,
  RecursiveDivision,
} from "@/algorithms";
import { Grids } from "@/components";

var rows = 17;
var cols = 31;

var START_NODE_ROW = 4;
var START_NODE_COL = 4;
var END_NODE_ROW = rows - 5;
var END_NODE_COL = cols - 5;
var InitSR = START_NODE_ROW;
var InitSC = START_NODE_COL;
var InitER = END_NODE_ROW;
var InitEC = END_NODE_COL;

var animateTime = 35; // 8,35,80

const PathFinder = () => {
  const [Grid, setGrid] = useState([]); // array destructuring
  const [isMousePress, setIsMousePress] = useState(false);
  const [mazeID, setMazeID] = useState(0);
  const [pathID, setPathID] = useState(0);
  const [animateType, setAnimateTimeType] = useState(2);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    gridInitialize();
  }, []);

  const gridInitialize = () => {
    var grid = new Array(rows);
    for (let i = 0; i < rows; i++) grid[i] = new Array(cols);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    setGrid(grid);
  };
  // animate the algorithm
  async function animateVisitedNodes(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      const node = visitedNodes[i];
      await waitForAnimatoin(animateTime);
      document
        .getElementById(`row${node.x}_col${node.y}`)
        .classList.add("node-visited");
    }
  }
  async function animateShortestPath(pathNode) {
    pathNode.reverse();
    for (let i = 0; i < pathNode.length; i++) {
      const node = pathNode[i];
      await waitForAnimatoin(animateTime);
      document
        .getElementById(`row${node.x}_col${node.y}`)
        .classList.add("shortestPath");
    }
  }

  const pathFinding = async () => {
    var btns = document.getElementsByClassName("dis");
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }

    var startNode = Grid[START_NODE_ROW][START_NODE_COL];
    var endNode = Grid[END_NODE_ROW][END_NODE_COL];

    switch (pathID) {
      case 1:
        var obj = BFS(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      case 2:
        obj = DFS(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      case 3:
        obj = Dijkstra(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      default:
        obj = Astar(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.close_list);
        await animateShortestPath(obj.path);
        break;
    }
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };

  const mazeGenerator = async (ar) => {
    for (var i = 0; i < ar.length; i++) {
      if (
        (ar[i].r === START_NODE_ROW && ar[i].c === START_NODE_COL) ||
        (ar[i].r === END_NODE_ROW && ar[i].c === END_NODE_COL)
      )
        continue;
      await waitForAnimatoin(animateTime);
      createWall(ar[i].r, ar[i].c);
    }
  };
  const makeAllCellAsAWall = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          !(
            (i === START_NODE_ROW && j === START_NODE_COL) ||
            (i === END_NODE_ROW && j === END_NODE_COL)
          )
        ) {
          createWall(i, j);
        }
      }
    }
  };
  const mazeHandle = async () => {
    var arr = [];
    switch (mazeID) {
      case 1:
        arr = BasicMaze(rows, cols);
        mazeGenerator(arr);
        break;
      case 2:
        makeAllCellAsAWall();
        arr = RandomizedDfs(rows, cols);
        mazeGenerator(arr);
        break;
      case 3: // recursive division
        arr = RecursiveDivision(rows, cols);
        mazeGenerator(arr);
        break;
      default:
    }
  };
  const clearPathHandle = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        var element = document.getElementById(`row${i}_col${j}`);

        // Remove multiple class names
        element.classList.remove("node-visited");
        element.classList.remove("shortestPath");
      }
    }
  };

  const createWall = (row, col) => {
    var newGrid = [...Grid]; // array copy
    var node = newGrid[row][col];
    node.isWeight = false;
    node.isWall = !node.isWall;
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const putWeight = (row, col) => {
    var newGrid = [...Grid]; // array copy
    var node = newGrid[row][col];
    if (node.isWall) return;
    if (node.isWeight) {
      node.weight = 1;
      node.isWeight = false;
    } else {
      node.weight = 8;
      node.isWeight = true;
    }
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const onMouseDown = (row, col) => {
    if (isValid(row, col)) {
      setIsMousePress(true);
      if (isChecked) putWeight(row, col);
      else createWall(row, col);
    }
  };
  const onMouseEnter = (row, col) => {
    if (isMousePress === true && isValid(row, col)) {
      if (isChecked) putWeight(row, col);
      else createWall(row, col);
    }
  };
  const onMouseUp = () => {
    setIsMousePress(() => false);
  };
  const animationTimeHandle = (type) => {
    if (type === 1) animateTime = 8;
    else if (type === 2) animateTime = 35;
    else animateTime = 80;
    setAnimateTimeType(type);
  };

  const setStartEndNode = (id, r, c) => {
    if (id === 1) {
      let newGrid = [...Grid]; // array copy
      let preStartNode = newGrid[START_NODE_ROW][START_NODE_COL];
      let curStartNode = newGrid[r][c];
      preStartNode.isStart = !preStartNode.isStart;
      curStartNode.isStart = !curStartNode.isStart;
      setGrid(newGrid);

      START_NODE_ROW = r;
      START_NODE_COL = c;
    } else {
      let newGrid = [...Grid]; // array copy
      let preEndNode = newGrid[END_NODE_ROW][END_NODE_COL];
      let curEndNode = newGrid[r][c];
      preEndNode.isEnd = !preEndNode.isEnd;
      curEndNode.isEnd = !curEndNode.isEnd;
      setGrid(newGrid);

      END_NODE_ROW = r;
      END_NODE_COL = c;
    }
  };

  return (
    <>
      <div className="mx-auto my-3 max-w-4xl">
        <div className="flex justify-between">
          <div className="left">
            <div className="left-top flex">
              <button className="start-btn dis" onClick={pathFinding}>
                Find the possible path
              </button>
              <select
                className="select dis"
                value={pathID}
                onChange={(e) => {
                  setPathID(parseInt(e.target.value));
                }}
                id="path"
                name="path"
              >
                <option value="0">A-Star Search</option>
                <option value="1">Breadth-First Search</option>
                <option value="2">Depth-First Search</option>
                <option value="3">Dijkstra</option>
              </select>
            </div>
            <div className="left-bottom">
              <button
                className={`button-primary ${animateType === 1 && "curr-btn"}`}
                onClick={() => animationTimeHandle(1)}
              >
                Fast
              </button>
              <button
                className={`button-primary ${animateType === 2 && "curr-btn"}`}
                onClick={() => animationTimeHandle(2)}
              >
                Average
              </button>
              <button
                className={`button-primary ${animateType === 3 && "curr-btn"}`}
                onClick={() => animationTimeHandle(3)}
              >
                Slow
              </button>
            </div>
          </div>
          <div className="right">
            <div className="right-top flex">
              <select
                className="select dis"
                value={mazeID}
                onChange={(e) => {
                  setMazeID(parseInt(e.target.value));
                }}
                id="maze"
                name="maze"
              >
                <option disabled value="0">
                  Select Maze
                </option>
                <option value="1">Random basic maze</option>
                <option value="2">Randomized_dfs</option>
                <option value="3">Recursive division</option>
                {/* <option value="4">Kruskal's algorithm</option>
                <option value="5">Prim's algorithm</option> */}
              </select>
              <button className="generate-btn dis" onClick={mazeHandle}>
                Create Maze
              </button>
              <button
                className={`button-primary dis ${
                  isChecked === true && "curr-btn"
                }`}
                onClick={handleToggle}
              >
                Weight
              </button>
            </div>
            <div className="right-bottom">
              <button className="button-primary dis" onClick={clearPathHandle}>
                Clear path
              </button>
              <button
                className="button-primary dis"
                onClick={() => {
                  START_NODE_ROW = InitSR;
                  START_NODE_ROW = InitSC;
                  END_NODE_ROW = InitER;
                  END_NODE_COL = InitEC;
                  clearPathHandle();
                  gridInitialize();
                }}
              >
                Reset board
              </button>
              <button className="button-primary dis" onClick={gridInitialize}>
                Clear walls & weights
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            onMouseLeave={() => {
              setIsMousePress(false);
            }}
          >
            <Grids
              pr={{
                Grid,
                onMouseDown,
                onMouseEnter,
                onMouseUp,
                setStartEndNode,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

class Spot {
  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.isWall = false;
    this.isWeight = false;
    this.weight = 1;
    this.isStart = i === START_NODE_ROW && j === START_NODE_COL;
    this.isEnd = i === END_NODE_ROW && j === END_NODE_COL;
  }
}

async function waitForAnimatoin(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, time);
  });
}
const isValid = (r, c) => {
  if (
    (r === START_NODE_ROW && c === START_NODE_COL) ||
    (r === END_NODE_ROW && c === END_NODE_COL)
  )
    return 0;
  else return 1;
};

export default PathFinder;
