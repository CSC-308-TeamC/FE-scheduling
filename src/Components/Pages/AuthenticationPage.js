import React from "react";
import { Card, Col, Row, Tabs, Tab } from "react-bootstrap";
import SignInForm from "./Forms/AuthenticationForms/SignInForm";
import SignUpForm from "./Forms/AuthenticationForms/SignUpForm";

function AuthenticationPage(props) {
  return (
    <>
      <Row style={{ paddingTop: 50 }}>
        <Col xs={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Tabs defaultActiveKey="SignIn">
                <Tab eventKey="SignIn" title="Sign In">
                  <SignInForm setToken={props.setToken} />
                </Tab>
                <Tab eventKey="SignUp" title="Sign Up">
                  <SignUpForm setToken={props.setToken} />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AuthenticationPage;
