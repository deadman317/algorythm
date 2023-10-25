"use client";

import React, { useEffect, useState } from "react";

var BARS = 50;
var SPEED = 500;
var ORGINAL_COLOR = "#3498DB";
var COMP_COLOR = "#FF5959";
var FOUND_COLOR = "#00FF00";
let lowerLimit = 30;
let upperLimit = 400;

async function waitForAnimate(sp) {
  sp = sp < 5 ? 5 : sp;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, sp);
  });
}
const Search = () => {
  const [bar, setBar] = useState([]);
  const [speed, setSpeed] = useState(SPEED);
  const [searchID, setSearchID] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    var arr = [];
    for (let i = 0; i < BARS; i++) {
      let x =
        Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
      arr.push(x);
    }
    setBar(arr);
  };

  /*---------------------Searching Algorithm---------------------*/

  const linearSearch = async () => {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
    var searchValue = document.getElementById("searchValue").value;
    var found = false;
    for (let i = 0; i < newBars.length; i++) {
      const target = document.getElementById("bar-" + i);
      target.style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      if (newBars[i] == searchValue) {
        target.style.background = FOUND_COLOR;
        found = true;
        break;
      }
    }
    if (!found) alert("Not Found");
  };

  const binarySearch = async () => {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    //first sort the array
    newBars.sort((a, b) => a - b);
    setBar(newBars);
    await waitForAnimate(SPEED);

    var searchValue = document.getElementById("searchValue").value;
    var found = false;
    //then search
    var low = 0,
      high = newBars.length - 1;
    while (low <= high) {
      var mid = Math.floor((low + high) / 2);
      document.getElementById("bar-" + mid).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      if (newBars[mid] == searchValue) {
        document.getElementById("bar-" + mid).style.background = FOUND_COLOR;
        found = true;
        break;
      } else if (newBars[mid] < searchValue) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    await waitForAnimate(SPEED);
    if (!found) alert("Not Found");
  };

  /*---------------------End Searching Algorithm---------------------*/

  /*---------------------Event Handlers---------------------*/

  const startSearchingHandle = async () => {
    reset();
    var btns = document.getElementsByTagName("button");
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
    document.getElementsByTagName("input")[0].disabled = true;
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;

    switch (searchID) {
      case 1:
        await binarySearch();
        break;
      default:
        await linearSearch();
        break;
    }
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
    document.getElementsByTagName("input")[0].disabled = false;
    document.getElementsByTagName("select")[0].disabled = false;
    document.getElementsByTagName("select")[1].disabled = false;
  };

  const rangeValueHandle = (event) => {
    SPEED = parseInt(event.target.max) - parseInt(event.target.value);
    setSpeed(event.target.valueAsNumber);
  };

  const sizeHandle = (event) => {
    BARS = parseInt(event.target.value);
    generateNewArray();
  };

  const generateNewArray = () => {
    init();
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById("bar-" + i);
      dom.style.backgroundColor = ORGINAL_COLOR;
    }
  };

  const reset = () => {
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById("bar-" + i);
      dom.style.backgroundColor = ORGINAL_COLOR;
    }
  };

  /*---------------------End Event Handlers---------------------*/

  /*---------------------JSX---------------------*/
  return (
    <>
      <div className="mx-auto my-7 max-w-6xl p-3">
        <div className="mb-16 flex justify-between">
          <div className="flex">
            <input
              className="input"
              type="text"
              id="searchValue"
              autoComplete="off"
              placeholder="Enter value"
            ></input>
            <select
              className="select"
              value={searchID}
              onChange={(e) => {
                setSearchID(parseInt(e.target.value));
                generateNewArray();
              }}
              id="num1"
              name="num1"
            >
              <option value="0">Linear Search</option>
              <option value="1">Binary Search</option>
            </select>
            <button className="start-btn" onClick={startSearchingHandle}>
              Start Searching
            </button>
          </div>
          <div className="flex items-center">
            <label htmlFor="range" className="label mr-1">
              Speed:
            </label>
            <input
              className="slider"
              type="range"
              onChange={rangeValueHandle}
              name="range"
              id="range"
              min="1"
              value={speed}
              max="1000"
              step="1"
            ></input>
          </div>
          <div className="flex">
            <select
              className="select ml-2"
              value={bar.length}
              onChange={sizeHandle}
              id="num"
              name="num"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <button className="generate-btn" onClick={generateNewArray}>
              Generate New
            </button>
          </div>
        </div>
        <div className="flex h-96 w-full items-end justify-center">
          {bar.map((item, id) => {
            return (
              <div
                className="mx-[1px] flex w-4 items-end justify-center rounded-lg"
                id={"bar-" + id}
                key={id}
                style={{ height: item, backgroundColor: ORGINAL_COLOR }}
              >
                <span className="mb-2 -rotate-90 select-none text-xs text-black">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
