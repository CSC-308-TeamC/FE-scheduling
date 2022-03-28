import React from 'react';
import { Container, Table, Button} from 'react-bootstrap';

function CardTable(props) { 
  return (
    <Container fluid>
      <Table>
        <TableHeader appointmentData={props.appointmentData} inProgress={props.inProgress}/>
        <TableBody appointmentData={props.appointmentData} inProgress={props.inProgress} appointmentFunction={props.appointmentFunction}/>
      </Table>
    </Container>
  );
}

function ButtonVariant(props){
    if(props.inProgress === null)
        return (null)
    else if(props.inProgress)
        return (<Button variant="outline-warning" onClick={() => props.appointmentFunction(props.appointmentId)}>Check Out</Button>)
    else
        return (<Button variant="outline-info" onClick={() => props.appointmentFunction(props.appointmentId)}>Re-Check In</Button>)   

}

function TableHeader(props) {
    if(props.appointmentData[0]){
        return (
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Client Name</th>
                    <th>Dog Name</th>
                </tr>
            </thead>
        );
    }
    else if(props.inProgress === null)
        return (<>No Upcoming Appointment.</>)
    else if(props.inProgress)
        return(<>No Appointments Checked In.</>)
    else
        return(<>No Appointments Checked Out.</>)
}

function TableBody(props){
    let rows = [];
    if(props.appointmentData[0]){
        rows = props.appointmentData.map((appointment, index) => {
            return (
                <tr key={index}>
                    <td>{appointment.type}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.dateTime}</td>
                    <td>{appointment.clientName}</td>
                    <td>{appointment.dogName}</td>
                    <td>
                        <ButtonVariant inProgress={props.inProgress} appointmentFunction={props.appointmentFunction} appointmentId={appointment._id} />
                    </td>
                </tr>
            );
        });
    }
  
  return (
      <tbody>
        {rows}
      </tbody>
    );
}

export default CardTable;
