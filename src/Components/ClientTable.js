import React from 'react';

function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody clientData={props.clientData} removeClient={props.removeClient} />
      </table>
    );
 }

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Dogs</th>
          <th>Phone Number</th>
          <th></th>
        </tr>
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
        <td>
          <button onClick={() => props.removeClient(index)}>Delete</button>
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
