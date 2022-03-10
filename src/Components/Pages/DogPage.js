import React, {useState, useEffect} from 'react';
import {getAll as getAllClients} from '../../API-Access/ClientGateway'
import * as DogGateway from '../../API-Access/DogGateway'
import DogForm from '../../Components/Pages/Forms/DogForm';
import DogTable from '../../Components/Pages/Tables/DogTable';

function DogPage() {
    const [clientNames, setClientNames] = useState([]);
    const [dogs, setDogs] = useState([]);
    

    useEffect(() => {
        getAllClients().then(allClients => {
            if(allClients){
                let clientNames = allClients.map(client => {
                    return { label: client.fullName, id: client._id, category: "clientName" };
                })
                setClientNames(clientNames);
            }

        });

        DogGateway.getAll().then(result => {
            if (result)
                setDogs(result);
        });
    }, []);

    function createDog(dog) {
        DogGateway.createRecord(dog).then(result => {
            if (result && result.status === 201)
                setDogs([...dogs, result.data]);
        });
    }

    function updateDog(dog, id) {
        dog._id = id;
        DogGateway.updateRecord(dog).then(result => {
            if(result && result.status === 200){
                setDogs([...dogs, result.data])
            }
        })
    }

    function removeDog(index) {
        if (index < dogs.length && index > -1) {
            DogGateway.deleteById(dogs[index]._id).then(result => {
                if (result && result.status === 204) {
                    const updated = dogs.filter((dog, i) => {
                        return i !== index
                    });
                    setDogs(updated);
                }
            });
        }
    }

    return(
        <>
            <DogForm handleSubmit={createDog} clientNames={clientNames}/>
            <DogTable dogData={dogs} clientNames={clientNames} updateDog={updateDog} removeDog={removeDog} />
        </>
    )
}

export default DogPage;