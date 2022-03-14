import React, {useState, useEffect} from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { getById as getAppointmentById} from '../../../API-Access/AppointmentGateway';
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
          clientId: '',
          dogId: '',
          repeating: false,
          notes:''  
       }
    );

  const [submitLabel, setSubmitLabel] = useState("Submit");

    useEffect(()=> {
      if(props.updateObjectId){
        setSubmitLabel("Update")
        getAppointmentById(props.updateObjectId).then((result) => {
          setAppointment({
            type: result.type,
            status: result.status,
            clientId: result.clientId,
            dogId: result.dogId,
            dateTime: new Date(result.dateTime), 
            notes: result.notes,
            repeating: result.repeating  
          });
        });
      }
    },[props.updateObjectId])


  function handleSelectChange(selection) {
    if (selection.category === "type")
      setAppointment({ ...appointment, type: selection.label });
    else if (selection.category === "status")
      setAppointment({ ...appointment, status: selection.label });
    else if (selection.category === "clientName")
      setAppointment({ ...appointment, clientId: selection.id });
    else
      setAppointment({ ...appointment, dogId: selection.id });
  }

    function handleDateChange(date){
        setAppointment({...appointment, dateTime: date});
    }

    function handleNotesChange(event){
      const { value } = event.target;
      setAppointment({...appointment, notes: value})
    }

    function handleRepeatingChange(){
      setAppointment({...appointment, repeating: !appointment.repeating})
    }

    function submitForm(){
      if (props.updateObjectId)
        props.handleSubmit(appointment, props.updateObjectId)
      else
        props.handleSubmit(appointment);

      setAppointment({  
        type: '',
        status: '',
        dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDay(), 6, 0, 0, 0),
        clientId: '',
        dogId: '',
        repeating: false,
        notes:'' 
     });
    }

  var appointmentTypes = [{label: 'Groom', category: 'type'},  
                            {label: 'Bath', category: 'type' }, 
                            {label: 'Nails', category: 'type'}];
  var appointmentStatuses = [{label: 'Scheduled', category: 'status' },
                               {label: 'Postponed', category: 'status' }, 
                               {label: 'Completed', category: 'status' }];

  return (
    <Container>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="appointmentFormType">
            <Form.Label>Appointment Type</Form.Label>
            <Select options={appointmentTypes} placeholder={"Select Type..."}
              isSearchable={false}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection) } />
          </Form.Group>
          <Form.Group as={Col} controlId="appointFormStatus">
            <Form.Label>Appointment Status</Form.Label>
            <Select options={appointmentStatuses} placeholder={"Select Status..."}
              isSearchable={false}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="appointmentFormCLient">
            <Form.Label>Client Name</Form.Label>
            <Select options={props.clientNames} placeholder={"Select Client..."}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="appointmentFormCLient">
            <Form.Label>Dog Name</Form.Label>
            <Select options={props.dogNames} placeholder={"Select Dog..."}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection)} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="appointmentFormDate">
          <Form.Label>Date</Form.Label>
          <Datetime closeOnSelect="true" value={appointment.dateTime} onChange={handleDateChange} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="appointmentFormNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Notes..." value={appointment.notes} onChange={(event) => handleNotesChange(event)} />
          <Form.Check type="switch" id="reapeating" label="Repeating" checked={appointment.repeating} onChange={handleRepeatingChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="appointmentFormSubmission">
          <Button variant="primary" type="submit" value="Submit" onClick={submitForm}>{submitLabel}</Button>
        </Form.Group>
        
      </Form>
      
    </Container>
  );

}

export default AppointmentForm;