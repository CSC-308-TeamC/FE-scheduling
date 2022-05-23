import React from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import UpdateModal from "../UpdateModal";

function ClientTable(props) {
  if (props.clientData.length === 0) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <Table bordered striped hover>
        <TableHeader />
        <TableBody
          clientData={props.clientData}
          updateClient={props.updateClient}
          removeClient={props.removeClient}
        />
      </Table>
    );
  }
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
          <UpdateModal
            updateObjectId={client._id}
            updateFunction={props.updateClient}
            formToInject={2}
          />
        </td>
        <td>
          <Button
            variant="danger"
            className="FormButton"
            onClick={() => props.removeClient(index)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

export default ClientTable;
