import React from "react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import Arun from "../../../imgs/Arun.png";
import Phil from "../../../imgs/Phil.png";
import Cole from "../../../imgs/Cole.png";
import "../../Styling/HomePage.css";

export default function HomePage() {
  return (
    <Container fluid style={{ marginBottom: "10px" }}>
      <Stack gap={3}>
        <Row>
          <Card.Title id="Title">
            We are a team of expert developers / groomers
          </Card.Title>
          <Card.Text id="Texxt">
            We do cool shit
          </Card.Text>
        </Row>
        <Row>
          <Col>
            <Card.Img src={Cole} alt="..." />
              <Card.Body>
                <Card className="AboutBox">
                  <Card.Title>Cole Brazell</Card.Title>
                  <Card.Text className="WebDev">Web Developer / Dog Groomer</Card.Text>
                </Card>
              </Card.Body>
          </Col>

          <Col>
            <Card.Img src={Phil} alt="..." />
              <Card.Body>
                <Card>
                  <Card.Title>Philippe Wylezek-Serrano</Card.Title>
                  <Card.Text className="WebDev">Web Developer / Dog Groomer</Card.Text>
                </Card>
              </Card.Body>
          </Col>

          <Col>
            <Card.Img src={Arun} alt="..." />
              <Card.Body>
                <Card>
                  <Card.Title>Arun Ganesh</Card.Title>
                  <Card.Text className="WebDev">Web Developer / Dog Groomer</Card.Text>
                </Card>
              </Card.Body>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}
