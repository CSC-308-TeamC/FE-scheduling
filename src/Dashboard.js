import React, {useState, useEffect} from 'react';
import Table from './Components/Table'
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
    <div className='container'>
      <Table appointmentData = {appointments} />
    </div>
  ); 
}

export default Dashboard;