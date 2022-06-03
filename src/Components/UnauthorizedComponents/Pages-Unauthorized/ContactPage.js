import React from "react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import lads from "../../../imgs/lads.png";
import "../../Styling/HomePage.css";
import logo from "../../../imgs/Circle-logo-motto.png";

export default function ContactPage() {
  return (
    <Container fluid id="container">
      <Stack gap={3}>
        <Row>
          <Col>
            <Card.Img src={lads} alt="..." style={{ marginTop: "2vw" }} />
          </Col>
          <Col>
            <b id="ContactTitle">Contact Us</b>
            <Card id="ContactInfo">
              <Card.Img
                src={logo}
                alt="..."
                style={{ width: "100%", marginTop: "5vw", marginBottom: "5vw" }}
              />
              <Card.Title>Email</Card.Title>
              <Card.Text style={{ color: "black" }}>
                goldendays@petgroomers.com
              </Card.Text>
              <Card.Title>Phone Number</Card.Title>
              <Card.Text style={{ color: "black" }}>(805) 364-4437</Card.Text>
            </Card>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}
