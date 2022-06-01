import React from "react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import lads from "../../../imgs/lads.png";
import "../../Styling/HomePage.css";

export default function ContactPage() {
  return (
    <Container fluid id="container">
      <Stack gap={3}>
        <Row>
          <Card.Img src={lads} alt="..." style={{ width: "50%" }} />
        </Row>
      </Stack>
    </Container>
  );
}
