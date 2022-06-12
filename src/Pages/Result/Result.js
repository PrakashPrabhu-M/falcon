// React
import React, { useState, useEffect } from "react";

// API
import axios from "axios";
import { API } from "../../App";

// Router
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./Result.css";

export default function Result() {
  const [result, setResult] = useState(false);
  const planets = Object.values(
    Object.values(JSON.parse(window.sessionStorage.getItem("planet")))
  );
  const vehicles = Object.values(
    Object.values(JSON.parse(window.sessionStorage.getItem("vehicle")))
  );
  const time = window.sessionStorage.getItem("time");
  const navigate = useNavigate();

  // console.log(
  //   "planets",
  //   Object.values(JSON.parse(window.sessionStorage.getItem("planet"))),
  //   "vehicles",
  //   Object.values(JSON.parse(window.sessionStorage.getItem("vehicle")))
  // );
  const getData = async () => {
    const { data } = await axios.post(
      API.token,
      {},
      { headers: { Accept: "application/json" } }
    );

    // console.log(
    //   API.find,
    //   {
    //     token: data.token,
    //     planet_names: planets,
    //     vehicle_names: vehicles,
    //   },
    //   {
    //     headers: {
    //       'Accept': "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log(data.token);
    const res = await axios.post(
      API.find,
      {
        token: data.token,
        planet_names: planets,
        vehicle_names: vehicles,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setResult(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const status = (res) => {
    if (res.status === "success") {
      return (
        <div className="content">
          <p className="message">Congrats! You exposed the Falcone...!</p>
          <ul className="extra-container">
            <li className="extra">Time taken: {time} hrs</li>
            <li className="extra">Planet found: {result.planet_name}</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="content">
          <p className="message">Congrats! Queen Falcone has escaped!</p>
        </div>
      );
    }
  };
  return (
    <>
      {result ? status(result) : <h4 className="search">Searching...</h4>}
      <h3 className="button" onClick={() => navigate(-1)}>
        Search Again
      </h3>
    </>
  );
}
