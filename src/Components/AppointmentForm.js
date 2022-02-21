import React, {useState} from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Form from 'react-bootstrap/Form'


function AppointmentForm(props) {   
    var now = new Date();
    const [appointment, setAppointment] = useState(
       {  
          type: '',
          status: '',
          dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDay(), 6, 0, 0, 0),
          time: '',
          clientId: '',
          dogId: '',
          repeating: false,
          notes:''  
       }
    );

    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "type")
         setAppointment({...appointment, type: value});
      else if(name === "status"){
        setAppointment({...appointment, status: value});
      }else if(name === "time"){
        setAppointment({...appointment, time: value});
      }else if(name === "clientId"){
        setAppointment({...appointment, clientId: value});
      }else if(name === "dogId"){
        setAppointment({...appointment, dogId: value});
      }else{
        setAppointment({...appointment, notes: value});
      }
    }

    function handleDateChange(date){
        setAppointment({...appointment, dateTime: date});
    }

    function handleRepeatingChange(){
      setAppointment({...appointment, repeating: !appointment.repeating})
    }
  
    function submitForm() {
      props.handleSubmit(appointment);
      setAppointment({  
        type: '',
        status: '',
        dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDay(), 6, 0, 0, 0),
        time: '',
        clientId: '',
        dogId: '',
        repeating: false,
        notes:'' 
     });
    }

    
  return (
    <div>
      <Form>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          id="type"
          value={appointment.type}
          onChange={handleChange} />
        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          id="status"
          value={appointment.status}
          onChange={handleChange} />
        <label htmlFor="date">Date</label>
        <Datetime closeOnSelect="true" value={appointment.dateTime} onChange={handleDateChange}/>
        <label htmlFor="clientId">Client ID</label>
        <input
          type="text"
          name="clientId"
          id="clientId"
          value={appointment.clientId}
          onChange={handleChange} />
        <label htmlFor="clientId">Dog ID</label>
        <input
          type="text"
          name="dogId"
          id="dogId"
          value={appointment.dogId}
          onChange={handleChange} />
        {/* <input
          type="text"
          name="repeating"
          id="repeating"
          value={appointment.repeating}
          onChange={handleChange} /> */}
        <label htmlFor="clientId">Notes</label>
        <input
          type="text"
          name="notes"
          id="notes"
          value={appointment.notes}
          onChange={handleChange} />
        <Form.Check type ="switch" id="reapeating" label="Repeating" checked={appointment.repeating} onChange={handleRepeatingChange}/>
        <input type="button" value="Submit" onClick={submitForm} />
      
      </Form>
    </div>
); 
}

export default AppointmentForm;