import React from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import UpdateModal from "../UpdateModal";

function AppointmentTable(props) {
  if (props.appointmentData.length === 0) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <Table bordered striped hover>
        <TableHeader />
        <TableBody
          appointmentData={props.appointmentData}
          updateAppointment={props.updateAppointment}
          removeAppointment={props.removeAppointment}
        />
      </Table>
    );
  }
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Type</th>
        <th>Status</th>
        <th>Date</th>
        <th>Client Name</th>
        <th>Dog Name</th>
        <th>Repeating</th>
        <th>Notes</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.appointmentData.map((appointment, index) => {
    return (
      <tr key={index}>
        <td>{appointment.type}</td>
        <td>{appointment.status}</td>
        <td>{appointment.dateTime}</td>
        <td>{appointment.clientName}</td>
        <td>{appointment.dogName}</td>
        <td>{appointment.repeating ? "Yes" : "No"}</td>
        <td>{appointment.notes}</td>
        <td>
          <UpdateModal
            updateObjectId={appointment._id}
            updateFunction={props.updateAppointment}
            formToInject={1}
          />
        </td>
        <td>
          <Button
            variant="danger"
            onClick={() => props.removeAppointment(index)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

export default AppointmentTable;
