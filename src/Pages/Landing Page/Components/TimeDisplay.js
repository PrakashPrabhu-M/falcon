// React
import React, { useState } from "react";

const TimeDisplay = ({ time }) => {
  // speed = distance travelled / time taken
  // time = distance / speed
  const totalTime = time.length>0?time.reduce((a, b) => a + b):0;
  window.sessionStorage.setItem('time',totalTime);
  return (
    <div>
      <h4>Total time taken: {totalTime} hr</h4>
    </div>
  );
};

export default TimeDisplay;
