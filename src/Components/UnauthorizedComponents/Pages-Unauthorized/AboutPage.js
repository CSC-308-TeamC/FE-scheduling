import React from "react";
import { Container, Row, Col, CardGroup, Card, Stack } from "react-bootstrap";
import Arun from "../../../imgs/Arun.png";
import Phil from "../../../imgs/Phil.png";
import Cole from "../../../imgs/Cole.png";
import "../../Styling/ContactPage.css";

export default function HomePage() {
  return (
    <Container fluid style={{ marginBottom: "10px" }}>
      <Stack gap={3}>
        <Row>
          <Card>
            <Card.Title>We are a team of expert Developers</Card.Title>
            <Card.Text>We make cool stuff</Card.Text>
          </Card>
        </Row>
        <Row>
          <CardGroup>
            <Card>
              <Card.Img src={Cole} alt="..." style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Cole Brazell</Card.Title>
                <Card.Text>Web Developer</Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img src={Phil} alt="..." style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Philippe Wylezek-Serrano</Card.Title>
                <Card.Text>Web Developer</Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img src={Arun} alt="..." style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Arun Ganesh</Card.Title>
                <Card.Text>Web Developer</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Stack>
    </Container>
  );
}
