import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../../API-Access/UserGateway";

function SignInForm(props) {
  const navigator = useNavigate();
  const [cookies, setCookies] = useCookies(["auth_token"]);
  const [formErrors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  function submitForm() {
    signIn(user).then((response) => {
      if (response.status === 200) {
        setCookies("auth_token", response.data.tokenData, {
          maxAge: 150,
          path: "/",
        });
        setCookies("auth_user", response.data.emailData, {
          maxAge: 150,
          path: "/",
        });
        navigator("/Dashboard");
      } else {
        const newErrors = {};
        newErrors.authenticationError = "Not authorized";
        setErrors(newErrors);
      }
    });
  }

  return (
    <div style={{ paddingTop: 30 }}>
      <Row>
        <i> {!!formErrors.authenticationError} </i>
        <Form>
          <Form.Group className="mb-3" controlId="userFormEmail">
            <FloatingLabel label="Email Address">
              <Form.Control
                type="text"
                placeholder="Email Address"
                name="email"
                value={user.email}
                onChange={(event) =>
                  handleFieldChange(event.target.name, event.target.value)
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userFormPassword">
            <FloatingLabel label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={(event) =>
                  handleFieldChange(event.target.name, event.target.value)
                }
              />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Row>

      <Row>
        <Col xs={{ span: 1, offset: 11 }}>
          <Button
            variant="primary"
            type="submit"
            value="Submit"
            onClick={submitForm}
          >
            Sign In
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SignInForm;
