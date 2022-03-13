import React from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap-table';

function formTable(props) {
   return (
      <table
         class = "table table-striped"
         data-toggle="table">
         <caption>List Of Clients</caption>
         <TableHeader />
         <TableBody clientData={props.clientData} removeClient={props.removeClient} />
      </table>
   )
}

function TableHeader() {
   return (
      <thead class="table-dark">
         <tr>
            <th data-field="fullName" data-sortable="true">Name</th>
            <th data-field="dogs"  data-sortable="true">Dogs</th>
            <th data-field="phoneNumber"  data-sortable="true">Phone Number</th>
            <th></th>
         </tr>
      </thead>
   )
}

function TableBody(props) {

   const rows = props.clientData.map((row, index) => {
      return (
        <tr key={index}>
            <td>{row.fullName}</td>
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

/*function Table(props) { 
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
          <th>Name</th>
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
        <td>{row.fullName}</td>
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
}*/

export default formTable;