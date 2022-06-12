import React from "react";

export default function Selection(props) {
  // console.log(Object.keys(props.planets));

  if (props.planets) {
    return (
      <select
        key={`${props.destination}_Planet`}
        onChange={props.handler}
        name={props.destination}
        defaultValue="none"
      >
        <option hidden value="none">Select a planet</option>
        {Object.keys(props.planets).map((planet) => (
          <option key={planet} value={planet}>
            {planet}
          </option>
        ))}
        ;
      </select>
    );
  } else {
    return Object.keys(props.vehicles).map((vehicle) => {
      return (
        <div key={`${props.destination}_${vehicle}`}>
          <input
            type="radio"
            id={`${props.destination}_${vehicle}`}
            name={`Vechile for ${props.destination}`}
            value={vehicle}
            onChange={props.handler}
            disabled={
              props.vehicles[vehicle].total_no < 1 ||
              props.vehicles[vehicle].max_distance < props.selectedPlanet
            }
            title={
              props.vehicles[vehicle].total_no < 1
                ? "Out numbered"
                : props.vehicles[vehicle].max_distance < props.selectedPlanet
                ? "Out of coverage"
                : vehicle
            }
          />
          <label
            htmlFor={`${props.destination}_${vehicle}`}
            title={
              props.vehicles[vehicle].total_no < 1
                ? "Out numbered"
                : props.vehicles[vehicle].max_distance < props.selectedPlanet
                ? "Out of coverage"
                : vehicle
            }
          >
            {vehicle} ({props.vehicles[vehicle].total_no})
          </label>
          <br />
        </div>
      );
    });
  }

  // return (
  //   props.planets &&
  //   Object.keys(props.planets).map((planet) => {
  //     return (
  //       <select key={`${props.destination}_${planet}`}>
  //         <option value={planet}>{planet}</option>
  //       </select>
  //     );
  //   })(props.vehicles) &&
  //   Object.keys(props.vehicles).map((vehicle) => {
  //     return (
  //       <div key={`${props.destination}_${vehicle}`}>
  //         <input
  //           type="radio"
  //           id={`${props.destination}_${vehicle}`}
  //           name={`Vechile for ${props.destination}`}
  //           value={vehicle}
  //         />
  //         <label htmlFor={`${props.destination}_${vehicle}`}>{vehicle}</label>
  //         <br />
  //       </div>
  //     );
  //   })
  // );
}
