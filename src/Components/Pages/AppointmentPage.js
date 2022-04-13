import { useRef, useState, useEffect } from 'react';
import * as AppointmentGateway from '../../API-Access/AppointmentGateway';
import {getAll as getAllClients} from '../../API-Access/ClientGateway'
import {getAll as getAllDogs} from '../../API-Access/DogGateway'
import AppointmentForm from './Forms/AppointmentForm';
import AppointmentTable from './Tables/AppointmentTable';
import {Col, Row, Stack} from 'react-bootstrap'


function AppointmentPage() {
    const [appointments, setAppointments] = useState([]);
    const clientNames = useRef([]);
    const dogNames = useRef([]);

    useEffect(() => {
        getAllClients().then(allClients => {
          if(allClients){
            clientNames.current = allClients.map(client => {
              return { label: client.fullName, id: client._id, category: "clientName" };
            });
          }
        });
  
        getAllDogs().then(allDogs => {
          if(allDogs){
            dogNames.current = allDogs.map(dog => {
              return { label: dog.name, id: dog._id , category: "dogName"};
            });
          }
        });

        AppointmentGateway.getAll().then(allAppointments => {
            if(allAppointments)
                setAppointments(allAppointments);
        });
    }, []);

    function createAppointment(appointment) {
        AppointmentGateway.createRecord(appointment).then(result => {
            if (result && result.status === 201)
                setAppointments([...appointments, result.data]);
        });
    }

    function updateAppointment(appointment, id){
        appointment._id = id;
        AppointmentGateway.updateRecord(appointment).then(result => {
            if(result && result.status === 200)
                setAppointments([...appointments, result.data])
        });
    }

    function removeAppointment(index) {
        if (index < appointments.length && index > -1) {
            AppointmentGateway.deleteById(appointments[index]._id).then(result => {
                if (result && result.status === 204) {
                    const updated = appointments.filter((appointment, i) => {
                        return i !== index
                    });
                    setAppointments(updated);
                }
            });
        }
    }

    return (
        <Stack gap={2}>
            <Row>
                <Col xs={{ span: 10, offset: 1 }}>
                    <AppointmentForm handleSubmit={createAppointment} clientNames={clientNames.current} dogNames={dogNames.current} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 10, offset: 1 }}>
                    <AppointmentTable appointmentData={appointments} clientNames={clientNames.current} dogNames={dogNames.current}
                        updateAppointment={updateAppointment} removeAppointment={removeAppointment} />
                </Col>
            </Row>
        </Stack>
    )
}

export default AppointmentPage;