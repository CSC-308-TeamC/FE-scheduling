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
          <th>Type</th>
          <th>Status</th>
          <th>Date</th>
          <th>Client Name</th>
          <th>Dog Name</th>
          <th>Repeating</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
    );
}

function TableBody(props){
  const rows = props.appointmentData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.type}</td>
        <td>{row.status}</td>
        <td>{row.dateTime}</td>
        <td>{row.clientName}</td>
        <td>{row.dogName}</td>
        <td>{row.repeating ? 'Yes' : 'No'}</td>
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
