import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppointmentTable from './Components/AppointmentTable'
import AppointmentForm from './Components/AppointmentForm'
import ClientTable from './Components/ClientTable'
import ClientForm from './Components/ClientForm'
import DogTable from './Components/DogTable'
import DogForm from './Components/DogForm'

import axios from 'axios';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchAppointments().then(result => {
      if(result)
        setAppointments(result);
    });

    fetchDogs().then(result => {
      if(result)
        setDogs(result);
    });

  }, []);

  async function fetchAppointments(){
    try{
      const response = await axios.get('http://localhost:5000/dashboard');
      return response.data.appointmentData;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async function fetchDogs(){
    try{
      const response = await axios.get('http://localhost:5000/dogs');
      return response.data.dogData;
    }catch(error){
      console.log(error);
      return false;
    }
  }

    return (
      <div>
          <DashboardHeader appointmentData={appointments} dogData={dogs}/>
      </div>
      

  ); 
}

function DashboardHeader(props){
  return (
    <Router>
      <Navbar bg='dark' variant='dark'  >
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/clients">Clients</Nav.Link>
            {/*<Nav.Link href="/calendar">Calendar</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar >

      <Routes>
        <Route path='/' element ={<AppointmentTable appointmentData={props.appointmentData} />}/>
        <Route path='/appointments' element={<AppointmentForm />} />
        <Route path='/' element ={<ClientTable clientData={props.clientData} />}/>
        <Route path='/clients' element={<ClientForm />} />
        <Route path='/' element ={<DogTable dogData={props.dogData} />}/>
        <Route path='/dogs' element={ <><DogForm /> <DogTable dogData={props.dogData}/></>} />
      </Routes>

    </Router>
  );
}

export default Dashboard;
