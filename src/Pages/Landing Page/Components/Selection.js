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
    return Object.keys(props.vechiles).map((vechile) => {
      return (
        <div key={`${props.destination}_${vechile}`}>
          <input
            type="radio"
            id={`${props.destination}_${vechile}`}
            name={`Vechile for ${props.destination}`}
            value={vechile}
            onChange={props.handler}
            disabled={
              props.vechiles[vechile].total_no < 1 ||
              props.vechiles[vechile].max_distance < props.selectedPlanet
            }
            title={
              props.vechiles[vechile].total_no < 1
                ? "Out numbered"
                : props.vechiles[vechile].max_distance < props.selectedPlanet
                ? "Out of coverage"
                : vechile
            }
          />
          <label
            htmlFor={`${props.destination}_${vechile}`}
            title={
              props.vechiles[vechile].total_no < 1
                ? "Out numbered"
                : props.vechiles[vechile].max_distance < props.selectedPlanet
                ? "Out of coverage"
                : vechile
            }
          >
            {vechile} ({props.vechiles[vechile].total_no})
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
  //   })(props.vechiles) &&
  //   Object.keys(props.vechiles).map((vechile) => {
  //     return (
  //       <div key={`${props.destination}_${vechile}`}>
  //         <input
  //           type="radio"
  //           id={`${props.destination}_${vechile}`}
  //           name={`Vechile for ${props.destination}`}
  //           value={vechile}
  //         />
  //         <label htmlFor={`${props.destination}_${vechile}`}>{vechile}</label>
  //         <br />
  //       </div>
  //     );
  //   })
  // );
}
