import React from "react";
import { Container, Row, Col, Card, Stack, Button } from "react-bootstrap";
import homePageBackground from "../../../imgs/home-page-background.jpg";
import circleLogo from "../../../imgs/Circle-logo-motto.png";
import dogGroomer from "../../../imgs/dog-groomer.png";
import doggy from "../../../imgs/doggy.png";
import "../../Styling/HomePage.css";

export default function AboutPage() {
  return (
    <Container fluid id="container">
      <Stack gap={3}>
        <Row id="row">
          <div id="imageDiv">
            <img id="backgroundPic" src={homePageBackground} />
            <img id="circleLogo" src={circleLogo} />
          </div>
        </Row>
        <Row>
          <div id="text">
            Here at Golden Days Pet Groomers, we pride ourselves in accepting
            all breeds
            <br />
            and types of animals. Whether it's a haircut, a bath, or a nail
            trim, we
            <br />
            guarantee results that will leave both your and your special friend
            <br />
            with smiles as radiant as the golden day sun.
          </div>
        </Row>
        <Row>
          <Col xs={3}>
            <img className="dogGroomer" src={dogGroomer} />
          </Col>

          <Col xs={3}>
            <div className="squarePanelTitle">About us</div>
            <div className="squarePanelText">
              Click here to learn more about the team behind Golden Days Pet
              Groomers
            </div>

            <Button variant="primary" className="buttons" type="submit">
              Learn more
            </Button>
          </Col>

          <Col xs={3}>
            <img className="dogGroomer" src={doggy} />
          </Col>

          <Col xs={3}>
            <div className="squarePanelTitle">Contact us</div>
            <div className="squarePanelText">
              Click here to find out how you can contact us now
            </div>

            <Button variant="primary" className="buttons" type="submit">
              Contact us
            </Button>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}
