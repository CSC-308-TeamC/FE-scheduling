import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useCookies } from "react-cookie";
import AppointmentPage from "./Components/Pages/AppointmentPage";
import ClientPage from "./Components/Pages/ClientPage";
import DogPage from "./Components/Pages/DogPage";
import logoNegSmall from "./imgs/logo-negative.png";
import DashboardPanel from "./Components/DashboardComponents/DashboardPanel";
import AuthenticationPage from "./Components/Pages/AuthenticationPage";

function Dashboard() {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [unauthorized, setUnauthorization] = useState(true);
  const [authButtonLabel, setAuthButtonLabel] = useState();

  useEffect(() => {
    if (cookies.auth_token) setUnauthorization(false);

    if (!cookies.auth_user) setAuthButtonLabel("Sign In");
    else setAuthButtonLabel("Signed In: " + cookies.auth_user);
  }, []);

  function logOut() {
    removeCookies("auth_token");
    removeCookies("auth_user");
  }

  return (
    <Router>
      <div style={{ paddingBottom: 10 }}>
        <Navbar bg="dark" variant="dark">
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
              <Nav.Link hidden={unauthorized} href="/appointments">
                Appointments
              </Nav.Link>
              <Nav.Link hidden={unauthorized} href="/clients">
                Clients
              </Nav.Link>
              <Nav.Link hidden={unauthorized} href="/dogs">
                Dogs
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">{authButtonLabel} </Nav.Link>
              <Nav.Link href="/" hidden={unauthorized} onClick={logOut}>
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
        <Route path="/" element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
}

export default Dashboard;
