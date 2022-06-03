import React from "react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import homePageBackground from "../../../imgs/home-page-background.jpg";
import dogGroomer from "../../../imgs/dog-groomer.png";
import doggy from "../../../imgs/doggy.png";
import "../../Styling/HomePage.css";

export default function HomePage() {
  return (
    <Container fluid style={{ marginBottom: "10px" }}>
      <Stack gap={3}>
        <Row>
          <Col>
            <Card>
              <Card.Img
                src={homePageBackground}
                alt="..."
                style={{ width: "100%", flexDirection: "col" }}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Card>
            <text className="text-center">
              Here at Golden Days Pet Groomers, we pride ourselves in accepting
              all breeds
              <br />
              and types of animals. Whether it's a haircut, a bath, or a nail
              trim, we
              <br />
              guarantee results that will leave both your and your special friend
              <br />
              with smiles as radiant as the golden day sun.
            </text>
          </Card>
        </Row>
        <Row>
          <Col xs={6}>
            <Card
              className="text-center"
              border="warning"
              style={{ flexDirection: "row" }}
            >
              <Card.Img src={dogGroomer} alt="..." style={{ width: "50%" }} />
              <Card.Body>
                <Card.Text>
                  Click here to learn more about the team behind Golden Days Pet
                  Groomers
                </Card.Text>
                <Button variant="primary" className="buttons" type="submit">
                  Learn more
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6}>
            <Card
              className="text-center"
              border="warning"
              style={{ flexDirection: "row" }}
            >
              <Card.Img src={doggy} alt="..." style={{ width: "50%" }} />
              <Card.Body>
                <Card.Text>
                  Click here to find out how you can contact us now
                </Card.Text>
                <Button variant="primary" type="submit">
                  Contact us
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}
