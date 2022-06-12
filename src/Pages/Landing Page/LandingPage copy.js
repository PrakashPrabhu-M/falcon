// React
import React, { useState, useEffect } from "react";

// Router
import { Outlet, Link } from "react-router-dom";

// Local
import Radio from "./Components/Radiobox";

// API
import axios from "axios";
import { API } from "../../App";

// CSS
import "./LandingPage.css";

export default function LandingPage() {
  const [PLANETS, setPlanets] = useState(false); //All Planets
  const [VEHICLES, setVechiles] = useState(false); //All vehicles
  const [planet, setPlanet] = useState({}); //data for selected planets
  const [vehicle, setVechile] = useState({}); //data for selected vehicles
  let selectedVechile = null;
  console.log(VEHICLES);

  useEffect(
    () => async () => {
      const planetsReq = await axios.get(API.planets);
      const vehiclesReq = await axios.get(API.vehicles);
      const planets = {};
      for (let i of planetsReq.data) planets[i.name] = { distance: i.distance };
      setPlanets(planets); // Object of 6 planets
      const vehicles = {};
      for (let i of vehiclesReq.data)
        vehicles[i.name] = {
          total_no: i.total_no,
          max_distance: i.max_distance,
          speed: i.speed,
        };
      setVechiles(vehicles); // Object of 4 vehicles
      window.sessionStorage.clear();
    },
    []
  );

  const findHandler = () => {
    window.sessionStorage.setItem("vehicle", JSON.stringify(vehicle));
    window.sessionStorage.setItem("planet", JSON.stringify(planet));
  };

  const planetHandler = (e) => {
    const { name, value } = e.target;
    const cpy = Object.assign({}, planet);
    cpy[name] = value;
    setPlanet({ ...cpy });
  };

  const vehicleHandler = (e) => {
    const { name, value } = e.target;
    const cpy = Object.assign({}, vehicle);
    cpy[name] = value;
    if (!selectedVechile) selectedVechile = value;
    // console.log(name, value)
    // console.log(VEHICLES);
    let copy=Object.assign({},VEHICLES[value]);
    console.log('copy',copy);
    copy={...copy,total_no:copy.total_no-1}
    setVechiles({ ...copy, [value]: {...cpy[name], ...VEHICLES[value].total_no - 1} });
    // setVechile({ ...cpy });
  };

  return (
    <>
      <div>
        <h3 style={{ textAlign: "center" }}>
          Select the Planets you want to search!
        </h3>
        {PLANETS && VEHICLES ? (
          <div className="dashboard">
            {["0", "1", "2", "3"].map((item, idx) => (
              <form key={idx}>
                <label className="destination" htmlFor={item}>
                  Destination {+item + 1}
                </label>
                <select
                  name={item}
                  id={item}
                  defaultValue="DEFAULT"
                  onChange={planetHandler}
                >
                  <option value="DEFAULT" disabled hidden>
                    Select an Option
                  </option>
                  {Object.keys(PLANETS).map((item) => (
                    <option value={item} key={`${item}_${idx}`}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="vehicles">
                  {Object.keys(VEHICLES).map((item) => (
                    <Radio
                      key={item}
                      type="radio"
                      value={item}
                      quantity={VEHICLES[item].total_no}
                      iden={idx}
                      onChange={vehicleHandler}
                    />
                  ))}
                </div>
              </form>
            ))}
            <Outlet />
          </div>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
      {PLANETS && VEHICLES && (
        <Link to="result" className="button" onClick={findHandler}>
          Find falcone!
        </Link>
      )}
    </>
  );
}
