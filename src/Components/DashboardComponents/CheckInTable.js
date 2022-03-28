import React from 'react';
import { Container, Table, Button} from 'react-bootstrap';

function CheckInTable(props) { 
  return (
    <Container fluid>
      <Table>
        <TableHeader appointmentData={props.appointmentData} />
        <TableBody appointmentData={props.appointmentData} buttonsDisabled={props.buttonsDisabled} checkInAppointment={props.checkInAppointment} checkOutAppointment={props.checkOutAppointment} />
      </Table>
    </Container>
  );
}

function TableHeader(props) {
  if (props.appointmentData.length !== 0) {
    return (
      <thead>
        <tr>
          <th>Type</th>
          <th>Status</th>
          <th>Time</th>
          <th>Client Name</th>
          <th>Dog Name</th>
          <th>Repeating</th>
          <th>Notes</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
    );
  }else 
    return (<>No Upcoming Appointments.</>)
}

function TableBody(props){

  const rows = props.appointmentData.map((appointment, index) => {
    return (
      <tr key={index}>
        <td>{appointment.type}</td>
        <td>{appointment.status}</td>
        <td>{appointment.dateTime}</td>
        <td>{appointment.clientName}</td>
        <td>{appointment.dogName}</td>
        <td>{appointment.repeating ? 'Yes' : 'No'}</td>
        <td>{appointment.notes}</td>
        <td>
          <Button variant="outline-info" disabled={props.buttonsDisabled[index]} onClick={() => props.checkInAppointment(appointment._id, index)}>Check In</Button>      
        </td>
        <td>
          <Button variant="outline-warning" disabled={props.buttonsDisabled[index]}  onClick={() => props.checkOutAppointment(appointment._id, index)}>Check Out</Button>
        </td>
      </tr>
    );
  });
  
  return (
      <tbody>
        {rows}
      </tbody>
    );
}



export default CheckInTable;
