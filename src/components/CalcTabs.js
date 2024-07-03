import React from "react";
import { Link } from "react-router-dom";

function CalcTabs() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/fluids">Fluids</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CalcTabs;
