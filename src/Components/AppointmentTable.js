import React from 'react';

function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody appointmentData={props.appointmentData} removeAppointment={props.removeAppointment} />
      </table>
    );
 }

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Status</th>
          <th>Date</th>
          <th>Time</th>
          <th>Client Id</th>
          <th>Dog Id</th>
          <th>Repeating</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
    );
}

function TableBody(props) {
  const rows = props.appointmentData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row._id}</td>
        <td>{row.type}</td>
        <td>{row.status}</td>
        <td>{row.date}</td>
        <td>{row.time}</td>
        <td>{row.clientId}</td>
        <td>{row.dogId}</td>
        <td>{row.repeating}</td>
        <td>{row.notes}</td>
        <td>
          <button onClick={() => props.removeAppointment(index)}>Delete</button>
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

export default Table;
