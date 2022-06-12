// React
import React from "react";
import { useState } from "react";

// Local
import Selection from "../Selection";
import TimeDisplay from "../TimeDisplay";

// CSS
import "./DashBoard.css";

const DashBoard = (props) => {
  const destinations = [];
  const [dest, setDest] = useState([]);
  const [vech, setVech] = useState([]);
  const [time, setTime] = useState([]);

  // console.log(time);

  const planetSelection = (event, i) => {
    let cpy = [...dest];
    cpy[i] = event.target.value;
    setDest(cpy);
  };

  const vehicleSelection = (event, i) => {
    let cpy = [...vech];
    cpy[i] = event.target.value;
    setVech(cpy);

    const planetDistance = props.planets[dest[i]].distance;
    const speed = props.vehicles[cpy[i]].speed;

    let time_cpy = [...time];
    time_cpy[i] = planetDistance / speed;
    setTime(time_cpy);
  };

  for (let i = 0; i < props.destinations; i++) {
    const temp = [];
    const title = <h3 key={`destination_${i + 1}`}>Destination - {i + 1}</h3>;
    const timeTaken = <p className="time" key={`time_${i + 1}`}>Time taken: {time[i]}</p>;
    const planet = (
      <Selection
        key={`planet_${i + 1}`}
        destination={i + 1}
        planets={props.planets}
        handler={(planet) => {
          props.planetHandle(planet);
          planetSelection(planet, i);
        }}
      />
    );

    let vehicle;
    if (dest[i]) {
      vehicle = (
        <Selection
          key={`vehicle_${i + 1}`}
          destination={i + 1}
          vehicles={props.vehicles}
          handler={(event) => {
            props.vehicleHandle(event);
            vehicleSelection(event, i);
          }}
          selectedPlanet={props.planets[dest[i]].distance}
        />
      );
    }

    temp.push(title);
    temp.push(timeTaken);
    temp.push(planet);
    vehicle && temp.push(vehicle);
    let final = <div key={`destination_${i + 1}`}>{temp}</div>;
    destinations.push(final);
  }

  const reset = () => {
    setVech([]);
    setDest([]);
    setTime([]);
    props.reset();
  };

  return (
    <>
      <form className="dashboard">
        {" "}
        {destinations}{" "}
          <input className="reset-button" type="reset" onClick={reset} />
      </form>
      <TimeDisplay time={time} />
    </>
  );
};

export default DashBoard;
