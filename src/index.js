import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <CookiesProvider>
    {" "}
    <div style={{ height: "100vh", backgroundColor: "rgb(236,230,255)" }}>
      <Dashboard />{" "}
    </div>
  </CookiesProvider>,
  document.getElementById("root")
);
