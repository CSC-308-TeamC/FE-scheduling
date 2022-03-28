import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap'
import * as AppointmentGateway from './API-Access/AppointmentGateway';
import AppointmentPage from './Components/Pages/AppointmentPage';
import ClientPage from './Components/Pages/ClientPage';
import DogPage from './Components/Pages/DogPage';
import logoNegSmall from './imgs/logo-negative.png';
import DashboardPanel from './Components/DashboardComponents/DashboardPanel';

function Dashboard() {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  
  useEffect(() => {
    AppointmentGateway.getTodays().then(result => {
      if(result)
        setTodaysAppointments(result);
    });
  }, []);



  return (
      <DashboardHeader todaysAppointments={todaysAppointments}/>
  ); 
}

function DashboardHeader(props){
  return (
    <Router>
      <div style={{paddingBottom: 10}}>
        <Navbar bg='dark' variant='dark' >
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
        </Navbar >
      </div>
      <Routes>
        <Route path='/' element ={<DashboardPanel appointmentData={props.todaysAppointments} />}/> 
        <Route path='/appointments' element={<AppointmentPage/>}/>
        <Route path='/clients' element={<ClientPage/>}/>
        <Route path='/dogs' element={<DogPage/>}/>
      </Routes>
    </Router>
  );
}

export default Dashboard;
