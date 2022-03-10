import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'
import * as AppointmentGateway from './API-Access/AppointmentGateway';
import AppointmentPage from './Components/Pages/AppointmentPage';
import ClientPage from './Components/Pages/ClientPage';
import DogPage from './Components/Pages/DogPage';
import AppointmentTable from './Components/Pages/Tables/AppointmentTable';
import logoNegSmall from './imgs/logo-negative.png';
import DashboardPanel from './Components/DashboardPanel';
// import './Components/CalendarComponent/calendar.css'

function Dashboard() {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  
  useEffect(() => {
    AppointmentGateway.getTodays().then(result => {
      if(result)
        setTodaysAppointments(result);
    });
  }, []);

  return (
    <div>
      <DashboardHeader todaysAppointments={todaysAppointments}/>
    </div>
  ); 
}

function DashboardHeader(props){
  return (
    <Router>
      <Navbar bg='dark' variant='dark'>
        <Container>
        <img id="loginLogo" src={logoNegSmall} alt="logo" width="5%" height="5%" />
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="/appointments">Appointments</Nav.Link>
              <Nav.Link href="/clients">Clients</Nav.Link>
              <Nav.Link href="/dogs">Dogs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >

      <Routes>
        <Route path='/' element ={<><DashboardPanel/><AppointmentTable appointmentData={props.todaysAppointments}/></>}/> 
        <Route path='/appointments' element={<AppointmentPage/>}/>
        <Route path='/clients' element={<ClientPage/>}/>
        <Route path='/dogs' element={<DogPage/>}/>
      </Routes>
    </Router>
  );
}

export default Dashboard;
