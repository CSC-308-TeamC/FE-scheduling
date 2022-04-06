import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import UpdateModal from '../UpdateModal';



function DogTable(props) { 
    return (
      <Container fluid>
        <Table bordered striped hover>
          <TableHeader />
          <TableBody dogData={props.dogData} clientNames={props.clientNames}
                     updateDog={props.updateDog} removeDog={props.removeDog} />
        </Table>
      </Container>
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
          <th></th>
        </tr>
      </thead>
    );
}

function TableBody(props) {
  const rows = props.dogData.map((dog, index) => {
    return (
      <tr key={index}>
        <td>{dog.name}</td>
        <td>{dog.breed}</td>
        <td>{dog.clientName}</td>
        <td>
          <UpdateModal updateObjectId={dog._id} clientNames={props.clientNames} updateFunction={props.updateDog} formToInject={3} />
        </td>
        <td>
          <Button variant='danger' onClick={() => props.removeDog(index)}>Delete</Button>
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

export default DogTable;
