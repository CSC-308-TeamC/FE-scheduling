import React, { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getAll as getAllClients } from "../../../API-Access/ClientGateway";
import Select from "react-select";
import Breeds from "../../../Enums/Breeds";
import { getById as getDogById } from "../../../API-Access/DogGateway";
import { useCookies } from "react-cookie";

function DogForm(props) {
  const [cookies, setCookies] = useCookies();
  const [dog, setDog] = useState({
    name: "",
    breed: "",
    clientId: "",
  });

  const breeds = useRef([]);
  const submitLabel = useRef("Submit");
  const selectStates = useRef({});
  const [clientSelectList, setClientSelectList] = useState([]);

  useEffect(() => {
    let clientSelectData = [];
    getAllClients(cookies.auth_token).then((allClients) => {
      if (allClients) {
        clientSelectData = allClients.map((client) => {
          return {
            label: client.fullName,
            id: client._id,
            category: "clientName",
          };
        });
        setClientSelectList(clientSelectData);

        if (props.updateObjectId) {
          submitLabel.current = "Update";
          getDogById(props.updateObjectId, false, cookies.auth_token).then(
            (result) => {
              selectStates.current = {
                breed: { label: result.breed, category: "breed" },
                client: {
                  label: clientSelectData.find(
                    (client) => client.id === result.clientId
                  ).label,
                  id: result.clientId,
                  category: "clientName",
                },
              };
              setDog({
                name: result.name,
                breed: result.breed,
                clientId: result.clientId,
              });
            }
          );
        }
      }
    });

    let breedsInitialize = Array.from(
      { length: Object.keys(Breeds).length },
      () => ({ label: "", category: "breed" })
    );

    Object.values(Breeds).forEach((breed, index) => {
      breedsInitialize[index].label = breed;
    });

    breeds.current = breedsInitialize;
  }, [props.updateObjectId]);

  function handleNameChange(event) {
    const { value } = event.target;
    setDog({ ...dog, name: value });
  }

  function handleSelectChange(selection) {
    if (selection.category === "breed") {
      selectStates.current = { ...selectStates.current, selection };
      setDog({ ...dog, breed: selection.label });
    } else {
      selectStates.current = { ...selectStates.current, selection };
      setDog({ ...dog, clientId: selection.id });
    }
  }

  function submitForm() {
    if (props.updateObjectId) props.handleSubmit(dog, props.updateObjectId);
    else props.handleSubmit(dog);

    setDog({
      name: "",
      breed: "",
      clientId: "",
    });
  }

  return (
    <Row>
      <Form>
        <Form.Group className="mb-3" controlId="dogFormName">
          <Form.Label>Dog Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={dog.name}
            onChange={(event) => handleNameChange(event)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormBreed">
          <Form.Label>Breed</Form.Label>
          <Select
            options={breeds.current}
            placeholder={"Select Breed..."}
            isSearchable={true}
            value={selectStates.current.breed}
            getOptionValue={(selection) => selection.label}
            onChange={(selection) => handleSelectChange(selection)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormClient">
          <Form.Label>Associated Client</Form.Label>
          <Select
            options={clientSelectList}
            placeholder={"Select Client..."}
            value={selectStates.current.client}
            getOptionValue={(selection) => selection.label}
            onChange={(selection) => handleSelectChange(selection)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormSubmission">
          <Button
            variant="primary"
            type="submit"
            value="Submit"
            onClick={submitForm}
          >
            {submitLabel.current}
          </Button>
        </Form.Group>

        <Form.Group
          xs={{ span: 2, offset: 11 }}
          as={Col}
          controlId="Submit Button"
        >
          <Button
            variant="primary"
            type="submit"
            value="Submit"
            onClick={submitForm}
          >
            {submitLabel.current}
          </Button>
        </Form.Group>
      </Form>
    </Row>
  );
}

export default DogForm;
