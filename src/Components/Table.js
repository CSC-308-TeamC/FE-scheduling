import React from 'react';

function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody appointmentData={props.appointmentData} />
      </table>
    );
 }

function TableHeader() {
    return (
      <thead>
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
