import React from "react";

const SimpleSelect = (props) => {
  const handleChange = (event) => {
    props.onAlgoChanged(parseInt(event.target.value));
  };

  return (
    <select
      id="sortingAlgorithmSelect"
      onChange={handleChange}
      disabled={props.disable}
      className="bg-primary"
    >
      <option value={0}>Bubble Sort</option>
      <option value={1}>Selection Sort</option>
      <option value={2}>Insertion Sort</option>
      <option value={3}>Merge Sort</option>
      <option value={4}>Heap Sort</option>
      <option value={5}>Quick Sort</option>
    </select>
  );
};

export default SimpleSelect;
