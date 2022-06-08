// React
import React from "react";

// Router
import { Outlet} from "react-router-dom";

// CSS
import './Header.css';

export default function Header() {
  return (
    <>
      <div className="head">
        <h1>Finding Falcone!</h1>
      </div>
      <Outlet />
    </>
  );
}
