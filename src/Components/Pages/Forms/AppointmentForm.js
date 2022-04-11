import React, {useRef, useState, useEffect} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { getById as getAppointmentById} from '../../../API-Access/AppointmentGateway';
import Datetime from 'react-datetime';
import Types from '../../../Enums/Types';
import Statuses from '../../../Enums/Statuses';
import Select from 'react-select';
import "react-datetime/css/react-datetime.css";

function AppointmentForm(props) {   
    const [appointment, setAppointment] = useState(
       {  
          type: '',
          status: '',
          dateTime: new Date().setHours(6,0,0,0),
          clientId: '',
          dogId: '',
          repeating: false,
          notes:'',
       }
    );

    const appointmentStatuses = useRef([]);
    const appointmentTypes = useRef([]);

    useEffect(() => {
      appointmentStatuses.current = Array.from({ length: Object.keys(Statuses).length }, () => ({ label: '', category: 'status' }));
      appointmentTypes.current = Array.from({ length: Object.keys(Types).length }, () => ({ label: '', category: 'type' }));

      Object.values(Statuses).forEach((status, index) => {
        appointmentStatuses.current[index].label = status;
      });

      Object.values(Types).forEach((type, index) => {
        appointmentTypes.current[index].label = type;
      });

    }, []);
    
    const submitLabel = useRef("Submit");
    const selectStates = useRef({});

    useEffect(()=> {
      if(props.updateObjectId){
        submitLabel.current = "Update";
        getAppointmentById(props.updateObjectId, false).then((result) => {
          console.log(result)
          console.log(props.clientNames)
          selectStates.current = {type: {label: result.type, category: 'type'},
                           status: {label: result.status, category: 'status'}, 
                           client: props.clientNames.find(client => client.id === result.clientId),
                           dog: props.dogNames.find(dog => dog.id === result.dogId)};

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
    },[props.updateObjectId, props.clientNames, props.dogNames])


  function handleSelectChange(selection) {
    if(selection.category === "type"){
      selectStates.current = {...selectStates.current, type: selection};
      setAppointment({ ...appointment, type: selection.label});
    }else if(selection.category === "status"){
      selectStates.current = {...selectStates.current, status: selection};
      setAppointment({ ...appointment, status: selection.label});
    }else if(selection.category === "clientName"){
      selectStates.current = {...selectStates.current, client: selection};
      setAppointment({ ...appointment, clientId: selection.id});
    }else{
      selectStates.current = {...selectStates.current, dog: selection};
      setAppointment({ ...appointment, dogId: selection.id});
    }
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
      if(props.updateObjectId)
        props.handleSubmit(appointment, props.updateObjectId);
      else
        props.handleSubmit(appointment);
      

      setAppointment({  
        type: '',
        status: '',
        dateTime: new Date().setHours(6,0,0,0),
        clientId: '',
        dogId: '',
        repeating: false,
        notes:'',
     });
    }

  return (
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="appointmentFormType">
            <Form.Label>Appointment Type</Form.Label>
            <Select options={appointmentTypes.current} placeholder={"Select Type..."}
              isSearchable={false}
              value={selectStates.current.type}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection) } />
          </Form.Group>
          <Form.Group as={Col} controlId="appointFormStatus">
            <Form.Label>Appointment Status</Form.Label>
            <Select options={appointmentStatuses.current} placeholder={"Select Status..."}
              value={selectStates.current.status}
              isSearchable={false}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="appointmentFormCLient">
            <Form.Label>Client Name</Form.Label>
            <Select options={props.clientNames} placeholder={"Select Client..."}
              value={selectStates.current.client}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection)} />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="appointmentFormCLient">
            <Form.Label>Dog Name</Form.Label>
            <Select options={props.dogNames} placeholder={"Select Dog..."}
              value={selectStates.current.dog}
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
          <Button variant="primary" type="submit" value="Submit" onClick={submitForm}>{submitLabel.current}</Button>
        </Form.Group>
        
      </Form>
  );

}

export default AppointmentForm;