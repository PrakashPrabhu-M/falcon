// React
import React, { useState, useEffect } from "react";

// Router
import { Outlet, Link } from "react-router-dom";

// Local
import DashBoard from "./Components/DashBoard/DashBoard";

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
  const [reset,setReset]=useState(false);
  // console.log(vehicle);

  const getData = async () => {
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
    // window.sessionStorage.clear();
  };

  useEffect(() => {
    getData();
  }, []);

  const findHandler = () => {
    if (Object.keys(vehicle).length === 4 && Object.keys(planet).length === 4) {
      window.location += "result";
      window.sessionStorage.setItem("vehicle", JSON.stringify(vehicle));
      window.sessionStorage.setItem("planet", JSON.stringify(planet));
    } else {
      window.alert("Kindly fill all the data");
    }
    // debugger;
  };

  const planetHandler = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const cpy = Object.assign({}, planet);
    cpy[name] = value;
    // console.log(planet);
    setPlanet(cpy);
  };

  const vehicleHandler = (e) => {
    const { name, value } = e.target; // name -> vehicle for ... , value -> vehicle name
    // console.log(reset);
    if (name in vehicle && !reset) {
      const tot = VEHICLES[vehicle[name]].total_no;
      const prevVechileData = {
        ...VEHICLES[vehicle[name]],
        total_no: +tot + 1,
      };
      const curTot = VEHICLES[value].total_no;
      const vehicleData = { ...VEHICLES[value], total_no: +curTot - 1 };

      setVechiles({
        ...VEHICLES,
        [vehicle[name]]: { ...prevVechileData },
        [value]: { ...vehicleData },
      });
    } else {
      const tot = VEHICLES[value].total_no;
      const vehicleData = { ...VEHICLES[value], total_no: +tot - 1 };

      setVechiles({ ...VEHICLES, [value]: { ...vehicleData } });
    }
    setVechile((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (reset) setReset(false);
  };

  return (
    <>
      <h3 className="title">Select the planets you want to search</h3>
      {PLANETS && VEHICLES ? (
        <DashBoard
          destinations={4}
          planets={PLANETS}
          vehicles={VEHICLES}
          planetHandle={planetHandler}
          vehicleHandle={vehicleHandler}
          reset={() => {
            getData();
            setReset(true);
          }}
        />
      ) : (
        <h4>Loading...</h4>
      )}
      <a className="button" onClick={findHandler}>
        Find Falcone
      </a>
    </>
  );
}
