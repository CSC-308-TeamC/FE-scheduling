import React from 'react';
import ChartistGraph from "react-chartist";
// import { Container, Row, Col } from 'react-bootstrap';
import Clock from 'react-live-clock';
import panelPic from '../imgs/panelPic.jpg';
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import '../chartist.css';
import '../index.css';
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"></link>


function DashboardPanel(props) { 
  return (
    // <div class="flex-container">
    <Container>
      <Row>
        <Col xs={8}>
          <div id="date">
            <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
          </div>
        </Col>
        <Col xs={4}>
          <div id="pieChart">
            <Card.Title as="h4" id="CardTitle">Today's Appointments</Card.Title>
            <Card.Body>
                <div>
                  <ChartistGraph
                    data={{
                      labels: ["3", "1", "2"],
                      series: [3, 1, 2],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend" id="CardTitle">
                  <span class="dot" id="yellowDot"></span>
                  Groom
                  <span class="dot" id="pinkDot"></span>
                  Bath
                  <span class="dot" id="redDot"></span>
                  Nails
                </div>
              </Card.Body>
            </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div id="date">
          <img src={panelPic} id="dashboardPic" alt="img" width="95%" height="90%"/>
          </div>
        </Col>
        <Col xs={4}>
          <div id="nextAppt">
            <Card.Title as="h2" id="CardTitle">Next Appointment</Card.Title>
            <div id="nextApptInfo">
              Time: 1:15 pm
              <br />
              Dog Breed: Wetterhoun
              <br />
              Appointment Type: Nails
              <br />
              Checked in: Yes
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPanel;