import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import Statuses from "../../Enums/Statuses";

function CardTable(props) {
  let filteredData = filterAppointmentsByStatus(
    props.appointmentData,
    props.statusKey
  );

  if (filteredData.length === 0) {
    if (props.statusKey === Statuses.checkedIn)
      return <>No Appointments Checked In.</>;
    else if (props.statusKey === Statuses.checkedOut)
      return <>No Appointments Checked Out.</>;
    else return <>No Upcoming Appointment.</>;
  } else
    return (
      <Container fluid>
        <Table borderless striped hover>
          <TableHeader
            appointmentData={filteredData}
            statusKey={props.statusKey}
          />
          <TableBody
            appointmentData={filteredData}
            statusKey={props.statusKey}
            updateAppointmentStatus={props.appointmentFunction}
          />
        </Table>
      </Container>
    );
}

function filterAppointmentsByStatus(appointmentData, statusKey) {
  let filteredData = appointmentData;
  if (statusKey)
    filteredData = appointmentData.filter((appointment) => {
      return appointment.status === statusKey;
    });
  return filteredData;
}

function ButtonVariant(props) {
  if (props.appointmentStatus === Statuses.checkedIn)
    return (
      <Button
        variant="outline-warning"
        onClick={() => props.updateAppointmentStatus(props.appointmentId)}
      >
        Check Out
      </Button>
    );
  else if (props.appointmentStatus === Statuses.checkedOut)
    return (
      <Button
        variant="outline-info"
        onClick={() => props.updateAppointmentStatus(props.appointmentId)}
      >
        Re-Check In
      </Button>
    );
  else return null;
}

function TableHeader(props) {
  if (props.appointmentData.length > 0) {
    return (
      <thead>
        <tr>
          <th>Type</th>
          <th>Status</th>
          <th>Time</th>
          <th>Client Name</th>
          <th>Dog Name</th>
          <th></th>
        </tr>
      </thead>
    );
  }
}

function TableBody(props) {
  let rows = [];
  if (props.appointmentData.length > 0) {
    rows = props.appointmentData.map((appointment, index) => {
      return (
        <tr key={index}>
          <td>{appointment.type}</td>
          <td>{appointment.status}</td>
          <td>{appointment.dateTime}</td>
          <td>{appointment.clientName}</td>
          <td>{appointment.dogName}</td>
          <td>
            <ButtonVariant
              appointmentStatus={appointment.status}
              updateAppointmentStatus={props.updateAppointmentStatus}
              appointmentId={appointment._id}
            />
          </td>
        </tr>
      );
    });
  }

  return <tbody>{rows}</tbody>;
}

export default CardTable;
