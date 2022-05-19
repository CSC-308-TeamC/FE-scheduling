import React from "react";
import { Card, Col, Row, Tabs, Tab } from "react-bootstrap";
import SignInForm from "./Forms/AuthenticationForms/SignInForm";
import SignUpForm from "./Forms/AuthenticationForms/SignUpForm";
import { useCookies } from "react-cookie";

function AuthenticationPage(props) {
  const [cookies, setCookies, removeCookies] = useCookies();
  // if(cookies.auth_token){
  //   return (
  //     <>
  //        //<User Profile/>
  //     </>
  //   )
  // }else{
  return (
    <Row style={{ paddingTop: 50 }}>
      <Col xs={{ span: 8, offset: 2 }}>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="SignIn">
              <Tab eventKey="SignIn" title="Sign In">
                <SignInForm
                  setToken={props.setToken}
                  setLoginStatus={props.setLoginStatus}
                />
              </Tab>
              <Tab eventKey="SignUp" title="Sign Up">
                <SignUpForm
                  setToken={props.setToken}
                  setLoginStatus={props.setLoginStatus}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AuthenticationPage;
