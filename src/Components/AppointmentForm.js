import React, {useState} from 'react';

function AppointmentForm(props) {   
    const [appointment, setAppointment] = useState(
       {  
          _id: '',
          type: '',
          status: '',
          date: '',
          time: '',
          clientId: '',
          dogId: '',
          repeating: '',
          notes:''  
       }
    );

    function handleChange(event) {
      const { name, value } = event.target;
      if(name === "_id"){
        setAppointment({...appointment, _id: value});
      }else if (name === "type")
         setAppointment({...appointment, type: value});
      else if(name === "status")
        setAppointment({...appointment, status: value});
      else if(name === "date"){
        setAppointment({...appointment, date: value});
      }else if(name === "time"){
        setAppointment({...appointment, time: value});
      }else if(name === "clientId"){
        setAppointment({...appointment, clientId: value});
      }else if(name === "dogId"){
        setAppointment({...appointment, dogId: value});
      }else if(name === "repeating"){
        setAppointment({...appointment, repeating: value});
      }else{
        setAppointment({...appointment, notes: value});
      }
    }
  
    function submitForm() {
      props.handleSubmit(appointment);
      setAppointment({  
        _id: '',
        type: '',
        status: '',
        date: '',
        time: '',
        clientId: '',
        dogId: '',
        repeating: '',
        notes:'' 
     });
    }

    
  return (
    <div>
      <form>
      <label htmlFor="_id">Id</label>
        <input
          type="text"
          name="_id"
          id="_id"
          value={appointment._id}
          onChange={handleChange} />
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
        <input
          type="text"
          name="date"
          id="date"
          value={appointment.date}
          onChange={handleChange} />
        <label htmlFor="time">Time</label>
        <input
          type="text"
          name="time"
          id="time"
          value={appointment.time}
          onChange={handleChange} />
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
        <label htmlFor="clientId">Repeating</label>
        <input
          type="text"
          name="repeating"
          id="repeating"
          value={appointment.repeating}
          onChange={handleChange} />
        <label htmlFor="clientId">Notes</label>
        <input
          type="text"
          name="notes"
          id="notes"
          value={appointment.notes}
          onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />

      </form>
    </div>
); 
}

export default AppointmentForm;