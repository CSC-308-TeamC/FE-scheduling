import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import * as AppointmentGateway from "../../../API-Access/AppointmentGateway";
import { Modal } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarPage() {
  const [cookies, setCookies] = useCookies();
  const [events, setEvents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    async function getAppointmentsData() {
      let allUnFormattedAppointments = await AppointmentGateway.getAll(
        cookies.auth_token,
        false
      );

      let allFormattedAppointments = await AppointmentGateway.getAll(
        cookies.auth_token
      );

      if (allUnFormattedAppointments && allFormattedAppointments) {
        setEvents(
          formatAppointmentObjects(
            allFormattedAppointments,
            allUnFormattedAppointments
          )
        );
      }
    }

    getAppointmentsData();
  }, []);

  function formatAppointmentObjects(
    formattedAppointments,
    unformattedAppointments
  ) {
    let calendarFormatObjects = unformattedAppointments.map(
      (appointment, index) => ({
        id: appointment._id,
        title: formattedAppointments[index].clientName,
        allDay: true,
        start: new Date(appointment.dateTime),
        end: new Date(appointment.dateTime) + 1,
      })
    );

    return calendarFormatObjects;
  }

  async function setModalAttributes(event) {
    setModalShow(true);
    setModalDetails(
      await AppointmentGateway.getById(event.id, cookies.auth_token)
    );
  }

  return (
    <div style={{ height: "850px" }}>
      <AppointmentDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalDetails={modalDetails}
      />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => setModalAttributes(event)}
      />
    </div>
  );
}

function AppointmentDetailsModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={true}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Client:</b> {props.modalDetails.clientName}
        <br />
        <b>Dog:</b> {props.modalDetails.dogName}
        <br />
        <b>Status:</b> {props.modalDetails.status}
        <br />
        <b>Type:</b> {props.modalDetails.type}
        <br />
        <b>Date:</b> {props.modalDetails.dateTime}
      </Modal.Body>
    </Modal>
  );
}

export default CalendarPage;
