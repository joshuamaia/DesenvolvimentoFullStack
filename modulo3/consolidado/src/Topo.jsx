import React from "react";

export default function Topo() {
  return (
    <>
      <nav className="blue darken-4">
        <div class="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/">Salário</a>
            </li>
            <li>
              <a href="/juros">Juros</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
