import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import UpdateModal from '../UpdateModal';


function ClientTable(props) { 
    return (
      <Container fluid>
            <Table bordered striped hover>
              <TableHeader />
              <TableBody clientData={props.clientData} updateClient={props.updateClient} removeClient={props.removeClient} />
            </Table>
      </Container>
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
          <th></th>
        </tr>
      </thead>
    );
}

function TableBody(props) {
  const rows = props.clientData.map((client, index) => {
    return (
      <tr key={index}>
        <td>{client.fullName}</td>
        <td>{client.dogs}</td>
        <td>{client.phoneNumber}</td>
        <td>
          <UpdateModal updateObjectId={client._id} updateFunction={props.updateClient} formToInject={2} />
        </td>
        <td>
          <Button variant='danger' onClick={() => props.removeClient(index)}>Delete</Button>
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

export default ClientTable;