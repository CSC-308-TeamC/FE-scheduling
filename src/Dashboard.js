import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useCookies } from "react-cookie";
import AppointmentPage from "./Components/AuthorizedComponents/Pages-Authorized/AppointmentPage";
import ClientPage from "./Components/AuthorizedComponents/Pages-Authorized/ClientPage";
import DogPage from "./Components/AuthorizedComponents/Pages-Authorized/DogPage";
import logoNegSmall from "./imgs/logo-negative.png";
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

  //236,230,255 : Very light background Purple
  //#9A6CB4
  //#713e8e Top pick

  return (
    <div style={{ height: "100vh", backgroundColor: "rgb(236,230,255)" }}>
      <style type="text/css">
        {`
          .navbar-themed {
            background-color: rgb(159, 128, 255);
          }

          .navbar-themed .navbar-brand {
            color: white
          }

          .navbar-themed .navbar-nav .nav-link{
            color: white
          }
        `}
      </style>
      <Router>
        <div style={{ paddingBottom: 10 }}>
          <Navbar variant="themed">
            <img
              id="loginLogo"
              src={logoNegSmall}
              alt="logo"
              width="5%"
              height="5%"
            />
            <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  hidden={accessControlInfo.authenticatedView}
                  href="/appointments"
                >
                  Appointments
                </Nav.Link>
                <Nav.Link
                  hidden={accessControlInfo.authenticatedView}
                  href="/clients"
                >
                  Clients
                </Nav.Link>
                <Nav.Link
                  hidden={accessControlInfo.authenticatedView}
                  href="/dogs"
                >
                  Dogs
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/">
                  {" "}
                  {accessControlInfo.authButtonLabel}{" "}
                </Nav.Link>
                <Nav.Link
                  href="/"
                  hidden={accessControlInfo.authenticatedView}
                  onClick={logOut}
                >
                  {" "}
                  Log-Out{" "}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
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
    </div>
  );
}

export default Dashboard;
