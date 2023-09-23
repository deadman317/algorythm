import React, { useState } from "react";

export default function DiscreteSlider(props) {
  const [sliderValue, setSliderValue] = useState(props.default); // Initial value

  const handleChange = (event) => {
    const num = parseInt(event.target.value);
    props.onCountChange(num);
    setSliderValue(event.target.value);
  };
  return (
    <div>
      <input
        type="range"
        step={props.step}
        min={props.min}
        max={props.max}
        value={sliderValue}
        onChange={handleChange}
        disabled={props.disable}
      />
      <div>{props.title}</div>
    </div>
  );
}
