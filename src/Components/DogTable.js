import React from 'react';
import {Table} from 'react-bootstrap';
import 'bootstrap-table';

function formTable(props) {
   return (
      <table
         class = "table table-striped"
         data-toggle="table">
         <caption>List Of Dogs</caption>
         <TableHeader />
         <TableBody dogData={props.dogData} removeDog={props.removeDog} />
      </table>
   )
}

function TableHeader() {
   return (
      <thead class="table-dark">
         <tr>
            <th data-field="name" data-sortable="true">Owner</th>
            <th data-field="breed"  data-sortable="true">Breed</th>
            <th data-field="dogName"  data-sortable="true">Dog</th>
            <th></th>
         </tr>
      </thead>
   )
}

function TableBody(props) {
   const rows = props.dogData.map((row, index) => {
      return (
        <tr key={index}>
            <td>{row.name}</td>
            <td>{row.breed}</td>
            <td>{row.dogName}</td>
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

/*function Table(props) { 
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
          <th>Dog</th>
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
        <td>{row.dogName}</td>
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
}*/

export default formTable;
