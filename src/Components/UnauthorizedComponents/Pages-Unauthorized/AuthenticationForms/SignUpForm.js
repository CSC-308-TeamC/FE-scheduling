import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../API-Access/UserGateway";

function SignUpForm(props) {
  const navigator = useNavigate();
  const [cookies, setCookies] = useCookies(["auth_token"]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    administrator: false,
    clientId: "",
  });

  const [formErrors, setErrors] = useState({});

  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleFieldChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });

    if (!!formErrors[field])
      setErrors({
        ...formErrors,
        [field]: null,
      });
  };

  function handleConfirmPasswordChange(event) {
    const { value, name } = event.target;
    setConfirmedPassword(value);
    if (!!formErrors[name])
      setErrors({
        ...formErrors,
        [name]: null,
      });
  }

  function handleAdministratorChange() {
    setUser({ ...user, administrator: !user.administrator });
  }

  async function submitForm(event) {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      event.preventDefault();
      event.stopPropagation();
      setErrors(formErrors);
    } else {
      const signUpResponse = await signUp(user);
      if (signUpResponse.status === 201) {
        setCookies("auth_token", signUpResponse.data.tokenData, {
          maxAge: 150,
          path: "/",
        });
        props.setLoginStatus(signUpResponse.data.emailData);
        navigator("/dashboard");
      } else if (signUpResponse.status === 409) {
        const newErrors = {};
        newErrors.authenticationError = "Email already taken";
        setErrors(newErrors);
      }
    }
  }

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    if (!user.email || user.email === "")
      newErrors.email = "Please enter an email";
    else if (!emailRegex.test(user.email))
      newErrors.email = "Please enter a valid email";

    if (user.password.localeCompare(confirmedPassword) !== 0)
      newErrors.confirmedPassword = "Passwords do not match";

    const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    if (!passwordRegex.test(user.password))
      newErrors.password =
        "Password must be minimum 8 characters and contain at least one letter and number";
    else if (user.password.length === 0)
      newErrors.password = "Password is required";

    return newErrors;
  };

  return (
    <div style={{ paddingTop: 30 }}>
      <Row>
        <i> {!!formErrors.authenticationError} </i>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="userFormEmail">
            <FloatingLabel label="Email Address">
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                name="email"
                value={user.email}
                onChange={(event) =>
                  handleFieldChange(event.target.name, event.target.value)
                }
                isInvalid={!!formErrors.email}
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invald">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userFormPassword">
            <FloatingLabel label="Password">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={(event) =>
                  handleFieldChange(event.target.name, event.target.value)
                }
                isInvalid={!!formErrors.password}
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invald">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userFormConfirmPassword">
            <FloatingLabel label="Confirm Password">
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                name="confirmedPassword"
                value={confirmedPassword.current}
                onChange={(event) => handleConfirmPasswordChange(event)}
                isInvalid={!!formErrors.confirmedPassword}
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invald">
              {formErrors.confirmedPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="userFormAdministrator">
            <Form.Check
              required
              type="checkbox"
              name="administrator"
              label="Administrator"
              onChange={handleAdministratorChange}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            xs={{ span: 1, offset: 11 }}
            controlId="submitButton"
          >
            <Button variant="primary" id="SignInButton" type="submit" onClick={submitForm}>
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
}

export default SignUpForm;
