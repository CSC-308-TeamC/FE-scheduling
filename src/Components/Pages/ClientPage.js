import React, {useState, useEffect} from 'react';
import * as ClientGateway from '../../API-Access/ClientGateway'
import ClientForm from './Forms/ClientForm';
import ClientTable from './Tables/ClientTable';

function ClientPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    ClientGateway.getAll().then(result => {
      if (result)
        setClients(result);
    });
  }, []);

  function createClient(client) {
    ClientGateway.createRecord(client).then(result => {
      if (result && result.status === 201)
        setClients([...clients, result.data]);
    });
  }

  function updateClient(client, id){
    client._id = id;
    ClientGateway.updateRecord(client).then(result => {
      if(result && result.status === 200){
          setClients([...clients, result.data])
      }
  })
  }

  function removeClient(index) {
    if (index < clients.length && index > -1) {
      ClientGateway.deleteById(clients[index]._id).then(result => {
        if (result && result.status === 204) {
          const updated = clients.filter((client, i) => {
            return i !== index
          });
          setClients(updated);
        }
      });
    }
  }

  return (
    <>
      <ClientForm handleSubmit={createClient} />
      <ClientTable clientData={clients} updateClient={updateClient} removeClient={removeClient} />
    </>
  )
}

export default ClientPage;