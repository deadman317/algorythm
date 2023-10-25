"use client";

import React, { useEffect, useState } from "react";

var BARS = 50;
var SPEED = 500;
var ORGINAL_COLOR = "#3498DB";
var COMP_COLOR = "#FF5959";
var SORTED_COLOR = "#6C3483";
var PIVOT_COLOR = "orange";
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

const Sort = () => {
  const [bar, setBar] = useState([]);
  const [speed, setSpeed] = useState(SPEED);
  const [sortID, setSortID] = useState(0);

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

  const swap = (i, j, newBars) => {
    document.getElementById("bar-" + i).style.height = newBars[j] + "px";
    document.getElementById("bar-" + j).style.height = newBars[i] + "px";

    var tmp = newBars[i];
    newBars[i] = newBars[j];
    newBars[j] = tmp;
  };

  /*---------------------Sorting Algorithm---------------------*/

  /*---------------------Bubble Sort---------------------*/

  async function bubbleSort() {
    var newBars = []; //copy the array
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 0; i < newBars.length; i++) {
      for (var j = 0; j < newBars.length - 1 - i; j++) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background = COMP_COLOR;
        // we control animation speed with async/await and Promise.
        await waitForAnimate(SPEED); // global var
        document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background =
          ORGINAL_COLOR;

        if (newBars[j] > newBars[j + 1]) {
          swap(j, j + 1, newBars);
        }
      }
      var sorted = newBars.length - 1 - i;
      document.getElementById("bar-" + sorted).style.background = SORTED_COLOR;
    }
  }

  /*---------------------Selection Sort---------------------*/

  async function selectionSort() {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 0; i < newBars.length; i++) {
      var leastIdx = i;
      document.getElementById("bar-" + leastIdx).style.background = "black";

      for (var j = i + 1; j < newBars.length; j++) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        await waitForAnimate(SPEED); // global var
        document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;

        if (newBars[j] < newBars[leastIdx]) {
          document.getElementById("bar-" + leastIdx).style.background =
            ORGINAL_COLOR;
          leastIdx = j;
          document.getElementById("bar-" + leastIdx).style.background = "black";
        }
      }
      swap(i, leastIdx, newBars);
      document.getElementById("bar-" + leastIdx).style.background =
        ORGINAL_COLOR;
      document.getElementById("bar-" + i).style.background = SORTED_COLOR;
    }
  }

  /*---------------------Insertion Sort---------------------*/

  const insertionSort = async () => {
    var newBars = [];
    for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);

    for (var i = 1; i < newBars.length; i++) {
      var tmp = newBars[i],
        j = i - 1;

      while (j >= 0 && newBars[j] > tmp) {
        document.getElementById("bar-" + j).style.background = COMP_COLOR;
        document.getElementById("bar-" + (j + 1)).style.background =
          PIVOT_COLOR;

        await waitForAnimate(SPEED);
        newBars[j + 1] = newBars[j];
        document.getElementById("bar-" + (j + 1)).style.height =
          newBars[j] + "px";
        document.getElementById("bar-" + (j + 1)).style.background =
          SORTED_COLOR;
        j--;
      }
      newBars[j + 1] = tmp;
      document.getElementById("bar-" + (j + 1)).style.height = tmp + "px";
      document.getElementById("bar-" + (j + 1)).style.background = SORTED_COLOR;
    }
  };

  /*---------------------Quick Sort---------------------*/

  const partition = async (low, high, array) => {
    let pivot = high,
      i = low;
    document.getElementById("bar-" + pivot).style.background = PIVOT_COLOR;

    for (let j = low; j < high; j++) {
      document.getElementById("bar-" + j).style.background = COMP_COLOR;
      document.getElementById("bar-" + i).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + j).style.background = ORGINAL_COLOR;
      document.getElementById("bar-" + i).style.background = ORGINAL_COLOR;

      if (array[j] <= array[pivot]) {
        swap(i, j, array);
        i++;
      }
    }
    swap(i, pivot, array);
    document.getElementById("bar-" + pivot).style.background = ORGINAL_COLOR;
    return i;
  };

  const quickSort = async (low, high, array) => {
    if (low >= high) return;
    let pi = await partition(low, high, array);
    await quickSort(low, pi - 1, array);
    await quickSort(pi + 1, high, array);
  };

  /*---------------------Merge Sort---------------------*/

  const mergeSort = async (low, high, array) => {
    if (low >= high) return;
    var mid = Math.floor((low + high) / 2);
    await mergeSort(low, mid, array);
    await mergeSort(mid + 1, high, array);

    var newArr1 = [],
      newArr2 = [];
    for (let i = low; i <= mid; i++) {
      newArr1.push({ x: array[i], idx: i });
    }
    for (let i = mid + 1; i <= high; i++) {
      newArr2.push({ x: array[i], idx: i });
    }
    let i = 0,
      j = 0,
      k = low;
    while (i < newArr1.length && j < newArr2.length) {
      document.getElementById("bar-" + newArr1[i].idx).style.background =
        COMP_COLOR;
      document.getElementById("bar-" + newArr2[j].idx).style.background =
        COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + newArr1[i].idx).style.background =
        SORTED_COLOR;
      document.getElementById("bar-" + newArr2[j].idx).style.background =
        SORTED_COLOR;
      if (newArr1[i].x < newArr2[j].x) {
        array[k] = newArr1[i].x;
        document.getElementById("bar-" + k).style.height = array[k] + "px";
        i++;
      } else {
        array[k] = newArr2[j].x;
        document.getElementById("bar-" + k).style.height = array[k] + "px";
        j++;
      }
      k++;
    }
    while (i < newArr1.length) {
      array[k] = newArr1[i].x;
      document.getElementById("bar-" + k).style.height = array[k] + "px";
      document.getElementById("bar-" + k).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + k).style.background = SORTED_COLOR;
      i++;
      k++;
    }
    while (j < newArr2.length) {
      array[k] = newArr2[j].x;
      document.getElementById("bar-" + k).style.height = array[k] + "px";
      document.getElementById("bar-" + k).style.background = COMP_COLOR;
      await waitForAnimate(SPEED);
      document.getElementById("bar-" + k).style.background = SORTED_COLOR;
      j++;
      k++;
    }
  };

  /*---------------------End Sorting Algorithm---------------------*/

  /*---------------------Event Handlers---------------------*/

  const startSortingHandle = async () => {
    var btns = document.getElementsByClassName("dis");
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }

    var newBars = [];
    switch (sortID) {
      case 1:
        await selectionSort();
        break;
      case 2:
        await insertionSort();
        break;
      case 3:
        for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
        await quickSort(0, newBars.length - 1, newBars);
        break;
      case 4:
        newBars = [];
        for (let i = 0; i < bar.length; i++) newBars.push(bar[i]);
        await mergeSort(0, newBars.length - 1, newBars);
        break;
      default:
        await bubbleSort();
        break;
    }
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
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
    init();
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
            <select
              className="select dis"
              value={sortID}
              onChange={(e) => {
                setSortID(parseInt(e.target.value));
                generateNewArray();
              }}
              id="sort"
              name="sort"
            >
              <option value="0">Bubble Sort</option>
              <option value="1">Selection Sort</option>
              <option value="2">Insertion Sort</option>
              <option value="3">Quick Sort</option>
              <option value="4">Merge Sort</option>
            </select>
            <button className="start-btn dis" onClick={startSortingHandle}>
              Start Sorting
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
              className="select dis"
              value={bar.length}
              onChange={sizeHandle}
              id="size"
              name="size"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
            <button className="generate-btn dis" onClick={generateNewArray}>
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
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sort;
