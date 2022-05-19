import React, { useEffect, useState } from "react";
import AppointmentForm from "./Forms/AppointmentForm";
import ClientForm from "./Forms/ClientForm";
import DogForm from "./Forms/DogForm";
import { Button, Modal } from "react-bootstrap";

function UpdateModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInject
            updateObjectId={props.updateObjectId}
            updateFunction={props.updateFunction}
            formToInject={props.formToInject}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

function FormInject(props) {
  if (props.formToInject === 1)
    return (
      <AppointmentForm
        updateObjectId={props.updateObjectId}
        handleSubmit={props.updateFunction}
      />
    );
  else if (props.formToInject === 2)
    return (
      <ClientForm
        updateObjectId={props.updateObjectId}
        handleSubmit={props.updateFunction}
      />
    );
  else if (props.formToInject === 3)
    return (
      <DogForm
        updateObjectId={props.updateObjectId}
        handleSubmit={props.updateFunction}
      />
    );
}

export default UpdateModal;
