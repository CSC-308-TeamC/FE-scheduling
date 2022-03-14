import React, { useState, useEffect } from 'react';
import * as AppointmentGateway from '../../API-Access/AppointmentGateway';
import {getAll as getAllClients} from '../../API-Access/ClientGateway'
import {getAll as getAllDogs} from '../../API-Access/DogGateway'
import AppointmentForm from './Forms/AppointmentForm';
import AppointmentTable from './Tables/AppointmentTable';


function AppointmentPage() {
    const [appointments, setAppointments] = useState([]);
    const [clientNames, setClientNames] = useState([]);
    const [dogNames, setDogNames] = useState([]);

    useEffect(() => {
        let clientNames = [];
        getAllClients().then(allClients => {
          if (allClients) {
            clientNames = allClients.map(client => {
              return { label: client.fullName, id: client._id, category: "clientName" };
            })
            setClientNames(clientNames);
          }
        });
  
        let dogNames = []
        getAllDogs().then(allDogs => {
          if(allDogs){
            dogNames = allDogs.map(dog => {
              return { label: dog.name, id: dog._id , category: "dogName"};
            });
            setDogNames(dogNames);
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
        <>
            <AppointmentForm handleSubmit={createAppointment} clientNames={clientNames} dogNames={dogNames}/>
            <AppointmentTable appointmentData={appointments} clientNames={clientNames} dogNames={dogNames}
            updateAppointment={updateAppointment} removeAppointment={removeAppointment}  />
        </>
    )
}

export default AppointmentPage;