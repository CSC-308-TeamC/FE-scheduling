import React, {useState, useEffect} from 'react';
import { Form, Container, Button } from 'react-bootstrap'
import Datetime from 'react-datetime';
import Select from 'react-select';
import "react-datetime/css/react-datetime.css";


function AppointmentForm(props) {   
    var now = new Date();
    const [appointment, setAppointment] = useState(
       {  
          type: '',
          status: '',
          dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDay(), 6, 0, 0, 0),
          time: '',
          clientId: '',
          dogId: [],
          repeating: false,
          notes:''  
       }
    );
    const [clientNames, setClientNames] = useState([]);
    const [dogNames, setDogNames] = useState([]);

    useEffect(()=> {
      let clientNames = [];
      clientNames = props.clientData.map(client => {
        return {label: client.fullName, id: client._id};
      });
      setClientNames(clientNames);

      let dogNames = [];
      dogNames = props.dogData.map(dog => {
        return {label: dog.name, id: dog._id};
      });
      setDogNames(dogNames);
    },[props.clientData, props.dogData])

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

    var appointmentTypes = [{type: 'Groom', label: 'Groom' },{type: 'Bath', label: 'Bath' }, {type: 'Nails', label: 'Nails' }];
    var appointmentStatuses = [{status: 'Scheduled', label: 'Scheduled' },{status: 'Postponed', label: 'Postponed' }, {status: 'Completed', label: 'Completed' }];
  return (
      <Container>
        <Form>
        <Form.Group className="mb-3" controlId="appointmentFormSpecifics">
          <Form.Label>Appointment Type</Form.Label>
          <Select options={appointmentTypes} placeholder={"Select Type..."}
            getOptionValue={(selection) => selection.type}
            onChange={(value) => setAppointment({ ...appointment, type: value.type })} />
          <Form.Label>Appointment Status</Form.Label>
          <Select options={appointmentStatuses} placeholder={"Select Status..."}
            getOptionValue={(selection) => selection.status}
            onChange={(value) => setAppointment({ ...appointment, status: value.status })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="appointmentFormIds">
            <Form.Label>Client Id</Form.Label>
            <Select options={clientNames} placeholder={"Select Client..."}
            getOptionValue={(selection) => selection.label}
            onChange={(value) => setAppointment({ ...appointment, clientId: value.id}) }/>
            {/* <Form.Control type="text" placeholder="Client Id..." name="clientId" value={appointment.clientId} onChange={handleChange} /> */}
            <Form.Label>Dog Id</Form.Label>
            <Select options={dogNames} placeholder={"Select Dog..."}
            getOptionValue={(selection) => selection.label}
            onChange={(value) => setAppointment({ ...appointment, dogId: value.id}) }/>
            {/* <Form.Control type="text" placeholder="Dog Id..." name="dogId" value={appointment.dogId} onChange={handleChange} /> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="appointmentFormDetails">
            <Form.Label>Date</Form.Label>
            <Datetime closeOnSelect="true" value={appointment.dateTime} onChange={handleDateChange} />
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Notes..." name="notes" value={appointment.notes} onChange={handleChange} />
            <Form.Check type="switch" id="reapeating" label="Repeating" checked={appointment.repeating} onChange={handleRepeatingChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="appointmentFormSubmission">
            <Button variant="primary" type="submit" value="Submit" onClick={submitForm}>Submit</Button>
          </Form.Group>
        </Form>
      </Container>    
); }

export default AppointmentForm;