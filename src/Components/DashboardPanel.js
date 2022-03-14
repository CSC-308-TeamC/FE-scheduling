import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Clock from 'react-live-clock';

function DashboardPanel(props) { 
  return (
    // <div class="flex-container">
    <Container>
      <Row>
        <Col>
          <div id="date">
            <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPanel;