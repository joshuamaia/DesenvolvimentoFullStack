import React from "react";
import { Link } from "react-router-dom";

export default function Topo() {
  return (
    <>
      <nav style={{ minHeight: "60px" }} className="blue darken-4">
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="left">
            <li>
              <Link to="/">Salário</Link>
            </li>
            <li>
              <Link to="/juros">Juros</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
