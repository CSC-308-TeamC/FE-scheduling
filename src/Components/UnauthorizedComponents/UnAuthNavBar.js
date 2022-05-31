import React from "react";
import logoNegSmall from "../../imgs/logo-negative.png";
import { Navbar, Nav } from "react-bootstrap";

function UnAuthNavBar(props) {
  return (
    <>
      <div style={{ paddingBottom: 10 }}>
        <Navbar variant="appTheme" style={{ paddingLeft: "3rem" }}>
          <img
            id="loginLogo"
            src={logoNegSmall}
            alt="logo"
            width="80vw"
            height="60vw"
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
