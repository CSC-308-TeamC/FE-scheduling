import React from "react";
import logoNegSmall from "../../imgs/logo-negative.png";
import { Navbar, Nav } from "react-bootstrap";

function AuthNavBar(props) {
  return (
    <>
      <style type="text/css">
        {`
          .navbar-appTheme {
            background-color: rgb(159, 128, 255);
          }

          .navbar-appTheme .navbar-brand {
            color: white
          }

          .navbar-appTheme .navbar-nav .nav-link{
            color: white
          }
        `}
      </style>
      <div style={{ paddingBottom: 10 }}>
        <Navbar variant="appTheme">
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
                hidden={props.accessControlInfo.authenticatedView}
                href="/appointments"
              >
                Appointments
              </Nav.Link>
              <Nav.Link
                hidden={props.accessControlInfo.authenticatedView}
                href="/clients"
              >
                Clients
              </Nav.Link>
              <Nav.Link
                hidden={props.accessControlInfo.authenticatedView}
                href="/dogs"
              >
                Dogs
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">
                {" "}
                {props.accessControlInfo.authButtonLabel}{" "}
              </Nav.Link>
              <Nav.Link
                href="/"
                hidden={props.accessControlInfo.authenticatedView}
                onClick={props.logOut}
              >
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
