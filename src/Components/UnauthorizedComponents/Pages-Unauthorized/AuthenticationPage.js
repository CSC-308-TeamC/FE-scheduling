import React from "react";
import { Card, Col, Row, Tabs, Tab } from "react-bootstrap";
import SignInForm from "./AuthenticationForms/SignInForm";
import SignUpForm from "./AuthenticationForms/SignUpForm";
import { useCookies } from "react-cookie";
import "../../Styling/FormButton.css";

function AuthenticationPage(props) {
  return (
    <Row style={{ paddingTop: 50 }}>
      <Col xs={{ span: 8, offset: 2 }}>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="SignIn">
              <Tab eventKey="SignIn" title="Sign In">
                <SignInForm setLoginStatus={props.setLoginStatus} />
              </Tab>
              <Tab eventKey="SignUp" title="Sign Up">
                <SignUpForm setLoginStatus={props.setLoginStatus} />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AuthenticationPage;
