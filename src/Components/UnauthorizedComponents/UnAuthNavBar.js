import React from "react";
import logoNegSmall from "../../imgs/logo-negative.png";
import { Navbar, Nav } from "react-bootstrap";
import "../Styling/NavbarTheme.css";

function UnAuthNavBar(props) {
  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <Navbar variant="appTheme">
          <img
            id="loginLogo"
            src={logoNegSmall}
            alt="logo"
            width="5%"
            height="5%"
          />
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default UnAuthNavBar;
