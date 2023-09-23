import React, { Component } from "react";
import DiscreteSlider from "./slider";
import SimpleSelect from "./simpleSelect";

class Menu extends Component {
  render() {
    return (
      <nav className="flex items-center justify-center space-x-4">
        <button
          className="bg-primary"
          onClick={this.props.onRandomize}
          disabled={this.props.disable}
        >
          Randomize
        </button>

        <DiscreteSlider
          default={20}
          min={10}
          max={100}
          step={10}
          title="Numbers"
          onCountChange={this.props.onCountChange}
          disable={this.props.disable}
        />
        <DiscreteSlider
          default={50}
          min={10}
          max={100}
          step={10}
          title="Speed"
          onCountChange={this.props.onSpeedChange}
          disable={false}
        />
        <SimpleSelect
          onAlgoChanged={this.props.onAlgoChanged}
          disable={this.props.disable}
        />
        <button
          className="bg-primary"
          onClick={this.props.onViusalize}
          disabled={this.props.disable}
          style={this.isClickable()}
        >
          Visualize
        </button>
      </nav>
    );
  }
  isClickable = () => {
    if (this.props.disable) {
      return { cursor: "not-allowed" };
    } else {
      return {};
    }
  };
}

export default Menu;
