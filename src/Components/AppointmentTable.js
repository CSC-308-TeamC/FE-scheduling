import React from 'react';
import {Table} from 'react-bootstrap';

function formTable(props) {
   return (
      <table
         class = "table table-striped"
         data-toggle="table">
         <caption>List Of Appointments</caption>
         <TableHeader />
         <TableBody appointmentData={props.appointmentData} removeAppointment={props.removeAppointment} />
      </table>
   )
}

function TableHeader() {
   return (
      <thead class="table-dark">
         <tr>
            <th data-field="type" data-sortable="true">Type</th>
            <th data-field="status"  data-sortable="true">Status</th>
            <th data-field="dateTime"  data-sortable="true">Date</th>
            <th data-field="clientName"  data-sortable="true">Client Name</th>
            <th data-field="dogName"  data-sortable="true">Dog Name</th>
            <th data-field="repeating"  data-sortable="true">Repeating</th>
            <th data-field="notes"  data-sortable="true">Notes</th>
            <th></th>
         </tr>
      </thead>
   )
}

function TableBody(props) {
   const stat1 = "Scheduled";
   const stat2 = "Postponed";
   const stat3 = "Completed";
   const appointmentData = [
      {type: "Type1",status: stat1,dateTime: "00/00/00 00:00:00",clientName: "John Doe",dogName: "DogA",repeating: false, notes: 'Note About Appt'},
      {type: "Type2",status: stat2,dateTime: "00/00/00 00:00:00",clientName: "Doe",dogName: "DogB",repeating: true, notes: ''},
      {type: "Type3",status: stat1,dateTime: "00/00/00 10:00:00",clientName: "John Frank",dogName: "DogA",repeating: false, notes: ''},
      {type: "Type1",status: stat3,dateTime: "00/00/00 00:00:00",clientName: "Friend",dogName: "DogC",repeating: true, notes: ''},
      {type: "Type1",status: stat1,dateTime: "00/00/00 00:00:00",clientName: "John Doe",dogName: "DogA",repeating: false, notes: 'Note About Appt'}
   ]

   const rows = appointmentData.map((row, index) => {
      return (
        <tr key={index} class={row.status === 'Postponed' ? "table-warning" : row.status === 'Completed' ? "table-success" : "table-default"}>
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

 /*function Table(props) { 
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
}*/

export default formTable;
