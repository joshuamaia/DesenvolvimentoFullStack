import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Topo from "./Topo";

function App() {
  return (
    <BrowserRouter className="container">
      <Topo />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
