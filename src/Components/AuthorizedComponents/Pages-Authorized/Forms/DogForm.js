import React, { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getAll as getAllClients } from "../../../../API-Access/ClientGateway";
import { getById as getClientById } from "../../../../API-Access/ClientGateway";
import Select from "react-select";
import Breeds from "../../../../Enums/Breeds";
import { getById as getDogById } from "../../../../API-Access/DogGateway";
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
  const [selectStates, setSelectStates] = useState({});
  const [clientSelectList, setClientSelectList] = useState([]);

  useEffect(() => {
    let clientSelectData = [];

    async function getData() {
      let allClients = await getAllClients(cookies.auth_token);
      if (allClients) {
        clientSelectData = allClients.map((client) => {
          return {
            label: client.fullName,
            id: client._id,
            category: "clientName",
          };
        });
        setClientSelectList(clientSelectData);
      }
    }
    getData();

    generateBreedsDropdown();

    if (props.updateObjectId) {
      submitLabel.current = "Update";
      async function getUpdateObject() {
        let dog = await getDogById(
          props.updateObjectId,
          cookies.auth_token,
          false
        );

        let client = await getClientById(dog.clientId, cookies.auth_token);
        setSelectStates({
          breed: { label: dog.breed, category: "breed" },
          client: {
            label: client.fullName,
            id: client._id,
            category: "clientName",
          },
        });
        setDog({
          name: dog.name,
          breed: dog.breed,
          clientId: dog.clientId,
        });
      }
      getUpdateObject();
    }
  }, [props.updateObjectId]);

  function generateBreedsDropdown() {
    let breedsInitialize = Array.from(
      { length: Object.keys(Breeds).length },
      () => ({ label: "", category: "breed" })
    );

    Object.values(Breeds).forEach((breed, index) => {
      breedsInitialize[index].label = breed;
    });

    breeds.current = breedsInitialize;
  }

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
            value={selectStates.breed}
            getOptionValue={(selection) => selection.label}
            onChange={(selection) => handleSelectChange(selection)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormClient">
          <Form.Label>Associated Client</Form.Label>
          <Select
            options={clientSelectList}
            placeholder={"Select Client..."}
            value={selectStates.client}
            getOptionValue={(selection) => selection.label}
            onChange={(selection) => handleSelectChange(selection)}
          />
        </Form.Group>

        <Form.Group controlId="Submit Button" className="mb-3">
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

export default DogForm;
