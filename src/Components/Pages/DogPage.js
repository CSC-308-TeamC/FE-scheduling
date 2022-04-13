import React, { useRef, useState, useEffect } from 'react';
import {getAll as getAllClients} from '../../API-Access/ClientGateway'
import * as DogGateway from '../../API-Access/DogGateway'
import DogForm from '../../Components/Pages/Forms/DogForm';
import DogTable from '../../Components/Pages/Tables/DogTable';
import {Col, Row, Stack} from 'react-bootstrap'

function DogPage() {
    const [dogs, setDogs] = useState([]);
    const clientNames = useRef([]);

    useEffect(() => {
        getAllClients().then(allClients => {
            if(allClients){
                clientNames.current = allClients.map(client => {
                    return { label: client.fullName, id: client._id, category: "clientName" };
                })
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
        <Stack gap={2}>
            <Row>
                <Col xs={{ span: 10, offset: 1 }}>
                    <DogForm handleSubmit={createDog} clientNames={clientNames.current} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 10, offset: 1 }}>
                    <DogTable dogData={dogs} clientNames={clientNames.current} updateDog={updateDog} removeDog={removeDog} />
                </Col>
            </Row>
        </Stack>  
    )
}

export default DogPage;