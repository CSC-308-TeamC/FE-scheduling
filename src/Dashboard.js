import React, {useState, useEffect} from 'react';
//import {Provider} from 'react-redux';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AppointmentGateway from './API-Access/AppointmentGateway';
import AppointmentTable from './Components/AppointmentTable';
import AppointmentForm from './Components/AppointmentForm';
import * as ClientGateway from './API-Access/ClientGateway';
import ClientTable from './Components/ClientTable';
import ClientForm from './Components/ClientForm';
import * as DogGateway from './API-Access/DogGateway'
import DogTable from './Components/DogTable';
import DogForm from './Components/DogForm';
import logoNegSmall from './imgs/logo-negative.png';
import DashboardPanel from './Components/DashboardPanel';
//import * as CalendarGateway from './API-Access/CalendarGateway';
import App from './Calendar/App';
import store from './Calendar/store';
import {Provider} from 'react-redux';
function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [clients, setClients] = useState([]);
  //const [app, setCalendar] = useState([]);

  
  useEffect(() => {
    AppointmentGateway.getAll().then(result => {
      if(result)
        setAppointments(result);
    });

    ClientGateway.getAll().then(result => {
      if(result)
        setClients(result);
    });

    // CalendarGateway.getAll().then(result => {
    //   if(result)
    //     setCalendar(result);
    // });

    DogGateway.getAll().then(result => {
      if(result)
        setDogs(result);
    });
  }, []);

  function updateAppointments(appointment) { 
    AppointmentGateway.createEntry(appointment).then(result => {
    if(result && result.status === 201)
      setAppointments([...appointments, result.data]);
    });
  }

  function updateClients(client) { 
    ClientGateway.createEntry(client).then(result => {
    if (result && result.status === 201)
      setClients([...clients, result.data]);
    });
  }

  function updateDogs(dog) { 
    DogGateway.createEntry(dog).then(result => {
    if (result && result.status === 201)
      setDogs([...dogs, result.data]);
    });
  }
  // function updateCalendar(app) { 
  //   CalendarGateway.createEntry(app).then(result => {
  //   if(result && result.status === 201)
  //     setCalendar([...app, result.data]);
  //   });
  // }

  function removeAppointment(index) {
    if(index < appointments.length && index > -1){
      AppointmentGateway.deleteById(appointments[index]._id).then(result => {
        if(result && result.status === 204){
          const updated = appointments.filter((appointment, i) => {
            return i !== index
          });
          setAppointments(updated);
        }
      });
    }
  }

  function removeClient(index) {
    if(index < clients.length && index > -1){
      ClientGateway.deleteById(clients[index]._id).then(result => {
        if(result && result.status === 204){
          const updated = clients.filter((client, i) => {
            return i !== index
          });
          setClients(updated);
        }
      });
    }
  }

  function removeDog(index) {
    if(index < dogs.length && index > -1){
      DogGateway.deleteById(dogs[index]._id).then(result => {
        if(result && result.status === 204){
          const updated = dogs.filter((dog, i) => {
            return i !== index
          });
          setDogs(updated);
        }
      });
    }
  }

  return (
    <div>
      <DashboardHeader 
        appointmentData={appointments} clientData={clients} dogData={dogs}
        removeAppointment = {removeAppointment} removeClient = {removeClient} removeDog = {removeDog}
        updateAppointments = {updateAppointments} updateClients = {updateClients} updateDogs = {updateDogs} />
    </div>
  ); 
}

function DashboardHeader(props){
  return (
    <Router>
      <Navbar bg='dark' variant='dark' expand='lg' id="nav">
        <Container>
        <img id="loginLogo" src={logoNegSmall} alt="logo" />
          <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
            <Nav className="me-auto" >
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            <Nav.Link href="/clients">Clients</Nav.Link>
            <Nav.Link href="/dogs">Dogs</Nav.Link>    
            <Nav.Link href="/calendar">Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar >

      <Routes>
        <Route path='/' element ={<><DashboardPanel/><AppointmentTable appointmentData={props.appointmentData}/></>}/> 
        <Route path='/dashboard' element ={<><DashboardPanel/><AppointmentTable appointmentData={props.appointmentData}/></>}/>
        <Route path='/appointments' element={<><AppointmentForm handleSubmit = {props.updateAppointments} clientData={props.clientData} dogData={props.dogData}/> <AppointmentTable appointmentData={props.appointmentData} removeAppointment={props.removeAppointment} /></>}/>
        <Route path='/clients' element={<><ClientForm handleSubmit={props.updateClients}/> <ClientTable clientData={props.clientData} removeClient={props.removeClient}/></>}/>
        <Route path='/dogs' element={<><DogForm handleSubmit={props.updateDogs} clientData={props.clientData}/> <DogTable dogData={props.dogData} removeDog={props.removeDog}/></>}/>
        <Route path='/calendar' element={<><Provider store={store}><App /></Provider></>}/>
        
      </Routes>
    </Router>
  );
}

export default Dashboard;
