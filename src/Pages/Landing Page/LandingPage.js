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
  const [VECHILES, setVechiles] = useState(false); //All vechiles
  const [planet, setPlanet] = useState({}); //data for selected planets
  const [vechile, setVechile] = useState({}); //data for selected vechiles
  // console.log(vechile);

  const getData = async () => {
    const planetsReq = await axios.get(API.planets);
    const vechilesReq = await axios.get(API.vechiles);
    const planets = {};
    for (let i of planetsReq.data) planets[i.name] = { distance: i.distance };
    setPlanets(planets); // Object of 6 planets
    const vechiles = {};
    for (let i of vechilesReq.data)
      vechiles[i.name] = {
        total_no: i.total_no,
        max_distance: i.max_distance,
        speed: i.speed,
      };
    setVechiles(vechiles); // Object of 4 vechiles
    // window.sessionStorage.clear();
  };

  useEffect(() => {
    getData();
  }, []);

  const findHandler = () => {
    if (Object.keys(vechile).length === 4 && Object.keys(planet).length === 4) {
      window.location += "result";
      window.sessionStorage.setItem("vechile", JSON.stringify(vechile));
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

  const vechileHandler = (e) => {
    const { name, value } = e.target; // name -> vechile for ... , value -> vechile name
    if (name in vechile) {
      const tot = VECHILES[vechile[name]].total_no;
      const prevVechileData = {
        ...VECHILES[vechile[name]],
        total_no: +tot + 1,
      };
      const curTot = VECHILES[value].total_no;
      const vechileData = { ...VECHILES[value], total_no: +curTot - 1 };

      setVechiles({
        ...VECHILES,
        [vechile[name]]: { ...prevVechileData },
        [value]: { ...vechileData },
      });
    } else {
      const tot = VECHILES[value].total_no;
      const vechileData = { ...VECHILES[value], total_no: +tot - 1 };

      setVechiles({ ...VECHILES, [value]: { ...vechileData } });
    }
    setVechile((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <h3 className="title">Select the planets you want to search</h3>
      {PLANETS && VECHILES ? (
        <DashBoard
          destinations={4}
          planets={PLANETS}
          vechiles={VECHILES}
          planetHandle={planetHandler}
          vechileHandle={vechileHandler}
          reset={getData}
        />
      ) : (
        <h4>Loading...</h4>
      )}
      <a className="bution" onClick={findHandler}>
        Find Falcone
      </a>
    </>
  );
}
