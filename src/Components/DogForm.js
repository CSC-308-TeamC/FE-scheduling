import React, {useState} from 'react';

function DogForm(props) {   
    const [appointment, setAppointment] = useState(
       {  
          name: '',
          breed: '',
          age: '',
          //time: '',
          clientId: '',  
       }
    );

    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "name")
         setAppointment({...appointment, type: value});
      else if(name === "breed")
        setAppointment({...appointment, status: value});
      else if(name === "age"){
        setAppointment({...appointment, date: value});
      
    //   }else if(name === "time"){
    //     setAppointment({...appointment, time: value});
       }else{
        setAppointment({...appointment, clientId: value});
      }
    }
  
    function submitForm() {
      props.handleSubmit(appointment);
      setAppointment({  
        name: '',
        breed: '',
        age: '',
        //time: '',
        clientId: '',  
     });
    }

    
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={appointment.name}
          onChange={handleChange} />
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          name="breed"
          id="breed"
          value={appointment.breed}
          onChange={handleChange} />
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          id="age"
          value={appointment.age}
          onChange={handleChange} />
        {/* <label htmlFor="time">Time</label>
        <input
          type="text"
          name="time"
          id="time"
          value={appointment.time}
          onChange={handleChange} /> */}
        <label htmlFor="clientId">Client ID</label>
        <input
          type="text"
          name="clientId"
          id="clientId"
          value={appointment.clientId}
          onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    </div>
); 
}

export default DogForm;