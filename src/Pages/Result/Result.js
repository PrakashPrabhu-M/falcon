// React
import React, { useState, useEffect } from "react";

// API
import axios from "axios";
import { API } from "../../App";

export default function Result() {
  const [result, setResult] = useState(false);
  const planets = Object.values(
    Object.values(JSON.parse(window.sessionStorage.getItem("planet")))
  );
  const vechiles = Object.values(
    Object.values(JSON.parse(window.sessionStorage.getItem("vechile")))
  );
  const time=window.sessionStorage.getItem('time');

  // console.log(
  //   "planets",
  //   Object.values(JSON.parse(window.sessionStorage.getItem("planet"))),
  //   "vechiles",
  //   Object.values(JSON.parse(window.sessionStorage.getItem("vechile")))
  // );

  useEffect(
    () => async () => {
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
      //     vehicle_names: vechiles,
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
          vehicle_names: vechiles,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setResult(res.data);
    },
    []
  );

  const status = (res) => {
    if (res.status === "success") {
      return (
        <div>
          <p>Congrats! You exposed the Falcone...!</p>
          <ul>
            <li>Time taken: {time} hr</li>
            <li>Planet found: {result.planet_name}</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <p>Congrats! Queen Falcone has escaped!</p>
        </div>
      );
    }
  };
  return result? status(result):<h4>Searching...</h4>;
}
