import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { getById as getAppointmentById } from "../../../API-Access/AppointmentGateway";
import { getAll as getAllClients } from "../../../API-Access/ClientGateway";
import { getAll as getAllDogs } from "../../../API-Access/DogGateway";
import Datetime from "react-datetime";
import Types from "../../../Enums/Types";
import Statuses from "../../../Enums/Statuses";
import Select from "react-select";
import "react-datetime/css/react-datetime.css";
import { useCookies } from "react-cookie";

function AppointmentForm(props) {
  const [cookies, setCookies] = useCookies();
  const [appointment, setAppointment] = useState({
    type: "",
    status: "",
    dateTime: new Date().setHours(6, 0, 0, 0),
    clientId: "",
    dogId: "",
    repeating: false,
    notes: "",
  });

  const appointmentStatuses = useRef([]);
  const appointmentTypes = useRef([]);
  const [clientSelectList, setClientSelectList] = useState([]);
  const [dogSelectList, setDogSelectList] = useState([]);
  const clientSelectSet = useRef([]);
  const dogSelectSet = useRef([]);
  const submitLabel = useRef("Submit");
  const selectStates = useRef({});

  useEffect(async () => {
    let clientSelectData = [];
    await getAllClients(cookies.auth_token).then((allClients) => {
      if (allClients) {
        clientSelectData = allClients.map((client) => {
          return {
            label: client.fullName,
            id: client._id,
            category: "clientName",
          };
        });
        clientSelectSet.current = clientSelectData;

        setClientSelectList(clientSelectData);
      }
    });

    let dogSelectData = [];
    await getAllDogs(cookies.auth_token).then((allDogs) => {
      if (allDogs) {
        dogSelectData = allDogs.map((dog) => {
          return {
            label: dog.name,
            id: dog._id,
            category: "dogName",
          };
        });
        dogSelectSet.current = dogSelectData;
        setDogSelectList(dogSelectData);
      }
    });

    generateTypeStatusDropdowns();

    if (props.updateObjectId) {
      submitLabel.current = "Update";
      getAppointmentById(props.updateObjectId, cookies.auth_token, false).then(
        (result) => {
          selectStates.current = {
            type: { label: result.type, category: "type" },
            status: { label: result.status, category: "status" },
            client: clientSelectSet.current.find(
              (client) => client.id === result.clientId
            ),
            dog: dogSelectSet.current.find((dog) => dog.id === result.dogId),
          };

          setAppointment({
            type: result.type,
            status: result.status,
            clientId: result.clientId,
            dogId: result.dogId,
            dateTime: new Date(result.dateTime),
            notes: result.notes,
            repeating: result.repeating,
          });
        }
      );
    }
  }, [props.updateObjectId]);

  function generateTypeStatusDropdowns() {
    appointmentStatuses.current = Array.from(
      { length: Object.keys(Statuses).length },
      () => ({ label: "", category: "status" })
    );
    appointmentTypes.current = Array.from(
      { length: Object.keys(Types).length },
      () => ({ label: "", category: "type" })
    );

    Object.values(Statuses).forEach((status, index) => {
      appointmentStatuses.current[index].label = status;
    });

    Object.values(Types).forEach((type, index) => {
      appointmentTypes.current[index].label = type;
    });
  }

  function handleSelectChange(selection) {
    if (selection.category === "type") {
      //Type Select Dropdown Change
      selectStates.current = { ...selectStates.current, type: selection };
      setAppointment({ ...appointment, type: selection.label });
    } else if (selection.category === "status") {
      //Status Select Dropdown Change
      selectStates.current = { ...selectStates.current, status: selection };
      setAppointment({ ...appointment, status: selection.label });
    } else if (selection.category === "clientName") {
      //Client Select Dropdown Change
      selectStates.current = { ...selectStates.current, client: selection };
      setAppointment({ ...appointment, clientId: selection.id });
      //setDogSelectList(dogSelectSet.current.filter((dog) => dog.clientName === selection.label));
    } else if (selection.category === "dogName") {
      //Dog Select Dropdown Change
      // let associatedClient = clientSelectSet.current.find(
      //   (client) => (client.label = selection.clientName)
      // );
      selectStates.current = {
        ...selectStates.current,
        dog: selection,
      };
      setAppointment({ ...appointment, dogId: selection.id });
    }
  }

  function handleDateChange(date) {
    setAppointment({ ...appointment, dateTime: date });
  }

  function handleNotesChange(event) {
    const { value } = event.target;
    setAppointment({ ...appointment, notes: value });
  }

  function handleRepeatingChange() {
    setAppointment({ ...appointment, repeating: !appointment.repeating });
  }

  function submitForm() {
    // const formErrors = validateForm();
    // if (Object.keys(formErrors).length > 0) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   setErrors(formErrors);
    // } else {
    console.log(appointment);
    if (props.updateObjectId)
      props.handleSubmit(appointment, props.updateObjectId);
    else props.handleSubmit(appointment);

    setAppointment({
      type: "",
      status: "",
      dateTime: new Date().setHours(6, 0, 0, 0),
      clientId: "",
      dogId: "",
      repeating: false,
      notes: "",
    });
    //}
  }

  // const validateForm = () => {
  //   const newErrors = {};

  //   const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  //   if(!user.email || user.email === '') newErrors.email = "Please enter an email"
  //   else if(!emailRegex.test(user.email)) newErrors.email = "Please enter a valid email"

  //   if(user.password.localeCompare(confirmedPassword) !== 0) newErrors.confirmedPassword = "Passwords do not match"

  //   const passwordRegex = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
  //   if(!passwordRegex.test(user.password)) newErrors.password = "Password must be minimum 8 characters and contain at least one letter and number"
  //   else if(user.password.length === 0) newErrors.password = "Password is required"

  //   return newErrors;
  // }

  return (
    <>
      <Row>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="appointmentFormType">
              <Form.Label>Appointment Type</Form.Label>
              <Select
                options={appointmentTypes.current}
                placeholder={"Select Type..."}
                isSearchable={false}
                value={selectStates.current.type}
                getOptionValue={(selection) => selection.label}
                onChange={(selection) => handleSelectChange(selection)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="appointFormStatus">
              <Form.Label>Appointment Status</Form.Label>
              <Select
                options={appointmentStatuses.current}
                placeholder={"Select Status..."}
                value={selectStates.current.status}
                isSearchable={false}
                getOptionValue={(selection) => selection.label}
                onChange={(selection) => handleSelectChange(selection)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="appointmentFormCLient"
            >
              <Form.Label>Client Name</Form.Label>
              <Select
                options={clientSelectList}
                placeholder={"Select Client..."}
                value={selectStates.current.client}
                getOptionValue={(selection) => selection.label}
                onChange={(selection) => handleSelectChange(selection)}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="appointmentFormCLient"
            >
              <Form.Label>Dog Name</Form.Label>
              <Select
                options={dogSelectList}
                placeholder={"Select Dog..."}
                value={selectStates.current.dog}
                getOptionValue={(selection) => selection.label}
                onChange={(selection) => handleSelectChange(selection)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="appointmentFormDate">
            <Form.Label>Date</Form.Label>
            <Datetime
              closeOnSelect="true"
              value={appointment.dateTime}
              onChange={handleDateChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="appointmentFormNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Notes..."
              value={appointment.notes}
              onChange={(event) => handleNotesChange(event)}
            />
            <Form.Check
              type="switch"
              id="reapeating"
              label="Repeating"
              checked={appointment.repeating}
              onChange={handleRepeatingChange}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            xs={{ span: 2, offset: 11 }}
            controlId="submitButton"
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
    </>
  );
}

export default AppointmentForm;
