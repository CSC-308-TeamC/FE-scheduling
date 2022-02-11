import React from 'react';

function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody dogData={props.dogData} />
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
  const rows = props.dogData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.breed}</td>
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
