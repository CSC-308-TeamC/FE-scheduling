import React from 'react';

function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody dogData={props.dogData} removeDog={props.removeDog}/>
      </table>
    );
 }

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Client</th>
          <th></th>
        </tr>
      </thead>
    );
}

function TableBody(props) {
  const rows = props.dogData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.breed}</td>
        <td>{row.clientName}</td>
        <td>
          <button onClick={() => props.removeDog(index)}>Delete</button>
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
