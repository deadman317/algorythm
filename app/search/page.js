"use client";

import React, { useEffect, useState } from "react";
import "@/styles/searching.css";
import "@/styles/PathfindingVS.css";

var BARS = 50;
const barWidth = 15;
var SPEED = 500;

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
  var [speed, setSpeed] = useState(SPEED);
  const [sortID, setSortID] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    var arr = [];
    let lowerLimit = 30;
    let upperLimit = 400;
    for (let i = 0; i < BARS; i++) {
      let x =
        Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
      arr.push(x);
    }
    setBar(arr);
  };
  var ORGINAL_COLOR = "#3498DB";
  var COMP_COLOR = "#FF5959";
  var FOUND_COLOR = "#00FF00";

  //searching algorithm

  const linearSearch = async () => {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
    var searchValue = document.getElementById("searchValue").value;
    var found = false;
    for (let i = 0; i < newBars.length; i++) {
      document.getElementById("bar-" + i).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      if (newBars[i] == searchValue) {
        document.getElementById("bar-" + i).style.background = FOUND_COLOR;
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

  const startSearchingHandle = async () => {
    reset();
    var btns = document.getElementsByClassName("button-4");
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }
    document.getElementsByTagName("input")[0].disabled = true;
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;

    switch (sortID) {
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
    bar.sort((a, b) => a > b);
  };

  const rangeValueHandle = (event) => {
    SPEED = parseInt(event.target.max) - parseInt(event.target.value);
    setSpeed(event.target.valueAsNumber);
  };
  const sizeHandle = (e) => {
    BARS = parseInt(e.target.value);
    generateNewArray();
  };
  const generateNewArray = () => {
    var arr = [];
    let lowerLimit = 30;
    let upperLimit = 400;
    for (let i = 0; i < BARS; i++) {
      let x =
        Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
      arr.push(x);
    }
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById("bar-" + i);
      dom.style.backgroundColor = "#3498DB";
    }
    setBar(arr);
  };
  const reset = () => {
    for (let i = 0; i < bar.length; i++) {
      var dom = document.getElementById("bar-" + i);
      dom.style.backgroundColor = "#3498DB";
    }
  };
  return (
    <>
      <div className="searching-continer">
        <div className="Btn-Wrap">
          <div style={{ display: "flex" }}>
            <input
              className="searching-input"
              type="text"
              id="searchValue"
              placeholder="Enter value to"
            ></input>
            <button
              className="button-4 start-btn"
              onClick={startSearchingHandle}
            >
              Start Searching
            </button>
            <button className="button-4" onClick={generateNewArray}>
              Generate New
            </button>
            <select
              className="my-drop-down"
              value={sortID}
              onChange={(e) => {
                setSortID(parseInt(e.target.value));
                generateNewArray();
              }}
              id="num1"
              name="num1"
            >
              <option value="0">Linear Search</option>
              <option value="1">Binary Search</option>
            </select>
          </div>
          <div className="st-speed-range">
            <div className="st-speed-range-lavel">
              <label className="searching-label" htmlFor="range1">
                Speed:{" "}
              </label>
            </div>
            <div>
              <input
                type="range"
                onChange={rangeValueHandle}
                name="range1"
                id="range1"
                min="1"
                value={speed}
                max="1000"
                step="1"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="num">Choose Size: </label>
            <select
              className="my-drop-down"
              value={bar.length}
              onChange={sizeHandle}
              id="num"
              name="num"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="wrapperBar">
          {bar.map((item, id) => {
            return (
              <div
                className="bar"
                id={"bar-" + id}
                key={id}
                style={{ width: barWidth, height: item }}
              >
                <span className="bar-details"> {item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
