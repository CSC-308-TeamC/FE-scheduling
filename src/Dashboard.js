import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthNavBar from "./Components/AuthorizedComponents/AuthNavbar";
import UnAuthNavBar from "./Components/UnauthorizedComponents/UnAuthNavBar";
import AppointmentPage from "./Components/AuthorizedComponents/Pages-Authorized/AppointmentPage";
import ClientPage from "./Components/AuthorizedComponents/Pages-Authorized/ClientPage";
import DogPage from "./Components/AuthorizedComponents/Pages-Authorized/DogPage";
import CalendarPage from "./Components/AuthorizedComponents/Pages-Authorized/CalendarPage";
import HomePage from "./Components/UnauthorizedComponents/Pages-Unauthorized/HomePage";
import AboutPage from "./Components/UnauthorizedComponents/Pages-Unauthorized/AboutPage";
import ContactPage from "./Components/UnauthorizedComponents/Pages-Unauthorized/ContactPage";
import DashboardPanel from "./Components/AuthorizedComponents/DashboardComponents/DashboardPanel";
import AuthenticationPage from "./Components/UnauthorizedComponents/Pages-Unauthorized/AuthenticationPage";
import "./Components/Styling/FormButton.css";
import "./Components/Styling/NavbarTheme.css";

function Dashboard() {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [accessControlInfo, setAccessControlInfo] = useState({
    authButtonLabel: "Sign In",
    signedInUser: "",
  });

  useEffect(() => {
    if (!cookies.auth_token) {
      setAccessControlInfo({
        authButtonLabel: "Sign In",
        signedInUser: "",
      });
    } else {
      setLoginStatus();
    }
  }, []);

  function setLoginStatus(userEmail) {
    setAccessControlInfo({
      authButtonLabel: "Signed In: " + userEmail,
      signedInUser: userEmail,
    });
  }

  function logOut() {
    removeCookies("auth_token");
  }

  return (
    <NavBarConditional
      setLoginStatus={setLoginStatus}
      accessControlInfo={accessControlInfo}
      logOut={logOut}
    />
  );
}

function NavBarConditional(props) {
  const [cookies, setCookie, removeCookies] = useCookies();
  if (cookies.auth_token) {
    return (
      <Router>
        <AuthNavBar
          accessControlInfo={props.accessControlInfo}
          logOut={props.logOut}
        />
        <div id="Margined">
          <Routes>
            <Route path="/dashboard" element={<DashboardPanel />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/dogs" element={<DogPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route
              path="/"
              element={
                <AuthenticationPage setLoginStatus={props.setLoginStatus} />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <UnAuthNavBar />
        <div id="Margined">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/"
              element={
                <AuthenticationPage setLoginStatus={props.setLoginStatus} />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default Dashboard;
