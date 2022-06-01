import React from "react";
import logoNegSmall from "../../imgs/logo-negative.png";
import { Navbar, Nav } from "react-bootstrap";
import "../Styling/NavbarTheme.css";

function AuthNavBar(props) {
  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <Navbar variant="appTheme">
          <a href="/dashboard">
            <img
              id="loginLogo"
              src={logoNegSmall}
              alt="logo"
              width="80"
              height="60"
            />
          </a>
          <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/appointments">Appointments</Nav.Link>
              <Nav.Link href="/clients">Clients</Nav.Link>
              <Nav.Link href="/dogs">Dogs</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">
                {" "}
                {props.accessControlInfo.authButtonLabel}{" "}
              </Nav.Link>
              <Nav.Link href="/" onClick={props.logOut}>
                {" "}
                Log-Out{" "}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default AuthNavBar;
