import React from 'react';

function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody clientData={props.clientData} />
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
  const rows = props.clientData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row._id}</td>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.dogs}</td>
        <td>{row.phoneNumber}</td>
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
