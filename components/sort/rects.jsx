import React, { Component } from "react";
import Rect from "./rect";

class Rects extends Component {
  render() {
    return (
      <>
        {this.props.rects.map((rect, rectidx) => {
          return <Rect key={rectidx} rect={rect} />;
        })}
      </>
    );
  }
}

export default Rects;
