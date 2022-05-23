import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthNavBar from "./Components/AuthorizedComponents/AuthNavbar";
import AppointmentPage from "./Components/AuthorizedComponents/Pages-Authorized/AppointmentPage";
import ClientPage from "./Components/AuthorizedComponents/Pages-Authorized/ClientPage";
import DogPage from "./Components/AuthorizedComponents/Pages-Authorized/DogPage";
import DashboardPanel from "./Components/AuthorizedComponents/DashboardComponents/DashboardPanel";
import AuthenticationPage from "./Components/UnauthorizedComponents/Pages-Unauthorized/AuthenticationPage";

function Dashboard() {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [accessControlInfo, setAccessControlInfo] = useState({
    authButtonLabel: "Sign In",
    signedInUser: "",
    authenticatedView: true,
  });

  useEffect(() => {
    console.log("Use effect ran Dashboard");
    if (!cookies.auth_token) {
      setAccessControlInfo({
        authButtonLabel: "Sign In",
        signedInUser: "",
        authenticatedView: true,
      });
    } else {
      setLoginStatus();
    }
  }, []);

  function setLoginStatus(userEmail) {
    setAccessControlInfo({
      authButtonLabel: "Signed In: " + userEmail,
      signedInUser: userEmail,
      authenticatedView: false,
    });
  }

  function logOut() {
    removeCookies("auth_token");
  }

  function NavBarConditional() {
    if (true) {
      return (
        <AuthNavBar accessControlInfo={accessControlInfo} logOut={logOut} />
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Router>
        <NavBarConditional />
        <Routes>
          <Route path="/dashboard" element={<DashboardPanel />} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/dogs" element={<DogPage />} />
          <Route
            path="/"
            element={<AuthenticationPage setLoginStatus={setLoginStatus} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default Dashboard;
