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

  async function submitForm(event) {
    setErrors({});
    const signInResponse = await signIn(user);
    if (signInResponse.status === 200) {
      setCookies("auth_token", signInResponse.data.tokenData, {
        maxAge: 600,
        path: "/",
      });
      props.setLoginStatus(signInResponse.data.emailData);
      navigator("/dashboard");
    } else {
      const newErrors = {};
      event.preventDefault();
      event.stopPropagation();
      newErrors.authenticationError = "Not authorized";
      setErrors(newErrors);
    }
  }

  return (
    <div style={{ paddingTop: 30 }}>
      <Row>
        <i style={{ color: "red" }}> {formErrors.authenticationError} </i>
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

          <Form.Group
            as={Col}
            xs={{ span: 1, offset: 11 }}
            controlId="submitButton"
          >
            <Button variant="primary" value="Submit" onClick={submitForm}>
              Sign In
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
}

export default SignInForm;
