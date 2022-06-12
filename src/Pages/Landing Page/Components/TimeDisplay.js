// React
import React, { useState } from "react";

const TimeDisplay = ({ time }) => {
  // speed = distance travelled / time taken
  // time = distance / speed
  console.log(time);
  const add = (arr) => {
    let tot = 0;
    for (let i of arr) if (i) tot += i;
    return tot;
  };
  // const totalTime = time.length > 0 ? time.reduce((a, b) => a + b) : 0;
  const totalTime = time.length > 0 ? add(time) : 0;
  window.sessionStorage.setItem("time", totalTime);
  return (
    <div>
      <h4>Total time taken: {totalTime} hr</h4>
    </div>
  );
};

export default TimeDisplay;
