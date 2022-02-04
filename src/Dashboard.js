import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Components/Table'
import AppointmentForm from './Components/AppointmentForm'
import axios from 'axios';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then(result => {
      if(result)
        setAppointments(result);
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

    return (
      <div>
        <div>
          <DashboardHeader/>
          {/* <AppointmentForm/> */}
        </div>
      </div>
  ); 
}

function DashboardHeader(){
  return (
    <Router>
      <Navbar bg='dark' variant='dark' class="navbar navbar-expand navbar-dark bg-dark" >
        <Container>
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            {/* <Nav.Link href="/clients">Clients</Nav.Link>
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/calendar">Calendar</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar >

      <Routes>
        {/* <Route path='/' element={<Dashboard/>}/> */}
        <Route path='/appointments' element={<AppointmentForm />} />
      </Routes>

    </Router>
  );
}

export default Dashboard;