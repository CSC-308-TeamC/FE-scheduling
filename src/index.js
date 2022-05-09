import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <CookiesProvider>
    {" "}
    <Dashboard />{" "}
  </CookiesProvider>,
  document.getElementById("root")
);
