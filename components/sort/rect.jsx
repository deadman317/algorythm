import React, { Component } from "react";

class Rect extends Component {
  render() {
    return (
      <div
        className="m-1 w-5 rounded-2xl"
        style={{
          height: this.props.rect.width,
          border: this.checkBorder(),
          background: this.checkColor(),
        }}
      ></div>
    );
  }
  checkColor = () => {
    if (this.props.rect.isSorted) {
      return "green";
    } else if (this.props.rect.isSorting) {
      return "orange";
    } else if (this.props.rect.isLeft) {
      return "red";
    } else if (this.props.rect.isRight) {
      return "purple";
    } else {
      return "#ADD8E6";
    }
  };
  checkBorder = () => {
    if (this.props.rect.isRange) {
      return "0px solid black";
    } else {
      return "0px";
    }
  };
}

export default Rect;
