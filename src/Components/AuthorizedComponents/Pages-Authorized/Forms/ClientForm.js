import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { getById as getClientById } from "../../../../API-Access/ClientGateway";

function ClientForm(props) {
  const [cookies, setCookies] = useCookies();
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
    dogs: "",
    phoneNumber: "",
  });

  const submitLabel = useRef("Submit");

  useEffect(() => {
    if (props.updateObjectId) {
      submitLabel.current = "Update";
      getClientById(props.updateObjectId, cookies.auth_token, false).then(
        (result) => {
          setClient({
            firstName: result.firstName,
            lastName: result.lastName,
            dogs: result.dogs,
            phoneNumber: result.phoneNumber,
          });
        }
      );
    }
  }, [props.updateObjectId]);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "firstName") setClient({ ...client, firstName: value });
    else if (name === "lastName") setClient({ ...client, lastName: value });
    else if (name === "phoneNumber")
      setClient({ ...client, phoneNumber: value });
    else setClient({ ...client, dogs: value });
  }

  function submitForm() {
    if (props.updateObjectId) {
      props.handleSubmit(client, props.updateObjectId);
    } else props.handleSubmit(client);

    setClient({
      firstName: "",
      lastName: "",
      dogs: "",
      phoneNumber: "",
    });
  }

  return (
    <Row>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="clientFormFName">
            <Form.Label>Client First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={client.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="clientFormLName">
            <Form.Label>Client Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={client.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="clientFormPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="(XXX) XXX-XXXX"
            name="phoneNumber"
            value={client.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="clientFormDogs">
          <Form.Label>Add Dog</Form.Label>
          <Form.Control
            type="text"
            placeholder="Dogs"
            name="dogs"
            value={client.dogs}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="submitButton">
          <Button
            variant="primary"
            type="submit"
            value="Submit"
            className="FormButton"
            onClick={submitForm}
          >
            {submitLabel.current}
          </Button>
        </Form.Group>
      </Form>
    </Row>
  );
}

export default ClientForm;
