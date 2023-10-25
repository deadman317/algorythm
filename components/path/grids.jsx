import React from "react";

const Grids = ({ pr }) => {
  const { Grid, onMouseDown, onMouseEnter, onMouseUp, setStartEndNode } = pr;
  return (
    <>
      {Grid.map((R, idx_r) => {
        return (
          <div key={idx_r} className="flex">
            {R.map((Value, idx_c) => {
              const { x, y, isStart, isEnd, isWall, isWeight } = Value;
              return (
                <Node
                  key={idx_c}
                  pv={{
                    x,
                    y,
                    isStart,
                    isEnd,
                    isWall,
                    isWeight,
                    onMouseDown,
                    onMouseEnter,
                    onMouseUp,
                    setStartEndNode,
                  }}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

function Node({ pv }) {
  const {
    x,
    y,
    isStart,
    isEnd,
    isWall,
    isWeight,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    setStartEndNode,
  } = pv;
  const allowDrop = (e) => {
    e.preventDefault();
  };
  const drag = (e) => {
    e.dataTransfer.setData("myID", e.target.id);
  };
  const drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("myID");
    var dom = document.getElementById(data);
    var id = parseInt(dom.attributes.data_type.value);
    if (
      e.target.attributes.data_type.value !== "3" ||
      e.target.attributes.wall.value === "true" ||
      e.target.attributes.weight.value === "true"
    )
      return;

    // call the function
    var r = parseInt(e.target.attributes.data_x.value);
    var c = parseInt(e.target.attributes.data_y.value);
    setStartEndNode(id, r, c);
  };

  var classNode = isStart
    ? "START_NODE"
    : isEnd
    ? "END_NODE"
    : isWall
    ? "obtacle"
    : isWeight
    ? "weight"
    : "";
  var typeId = isStart ? "1" : isEnd ? "2" : "3";

  if (isStart || isEnd) {
    return (
      <div
        className={"square " + classNode}
        id={"row" + x + "_col" + y}
        data_x={x}
        data_y={y}
        data_type={typeId}
        wall="false"
        draggable="true"
        onDragStart={drag}
        onDrop={drop}
        onDragOver={allowDrop}
      ></div>
    );
  } else {
    return (
      <div
        onMouseDown={(e) => {
          e.preventDefault(); // it is necessary
          onMouseDown(x, y);
        }}
        onMouseEnter={(e) => {
          e.preventDefault();
          onMouseEnter(x, y);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          onMouseUp();
        }}
        className={"square " + classNode}
        id={"row" + x + "_col" + y}
        data_x={x}
        data_y={y}
        data_type={typeId}
        wall={isWall.toString()}
        weight={isWeight.toString()}
        onDrop={drop}
        onDragOver={allowDrop}
      ></div>
    );
  }
}

export default Grids;
