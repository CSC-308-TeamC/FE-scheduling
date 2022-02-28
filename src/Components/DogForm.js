import React, {useState, useEffect} from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
//import 'react-bootstrap-typeahead/css/Typeahead.css';

function DogForm(props) {   
    const [dog, setDog] = useState(
       {  
          name: '',
          breed: '',
          clientName: '',  
       }
    );

    const [clientNames, setClientNames] = useState([]);

    useEffect(()=> {
      let clientNames = [];
      clientNames = props.clientData.map(client => {
        return {label: client.fullName, id: client._id};
      });
      setClientNames(clientNames);
    },[props.clientData])

    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "name")
        setDog({...dog, name: value});
      else if(name === "breed"){
        setDog({...dog, breed: value});
      }
    }
  
    function submitForm() {
      props.handleSubmit(dog);
      setDog({  
        name: '',
        breed: '',
        clientName: '',  
     });
    }




  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="dogFormName">
          <Form.Label>Dog Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="name" value={dog.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dogFormBreed">
          <Form.Label>Breed</Form.Label>
          <Form.Control type="text" placeholder="Breed" name="breed" value={dog.breed} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dogFormClient">
          <Form.Label>Associated Client</Form.Label>
          {/* <Typeahead
            id="clientId"
            labelKey="clientId"
            onChange= {handleSelect}
            options={clientNames}
            placeholder="Select Client..."
            selected={dog.clientName} /> */}
          <Select options={clientNames} placeholder={"Select Client..."}
            getOptionValue={(selection) => selection.label}
            onChange={(value) => setDog({ ...dog, clientId: value.id}) }/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="dogFormSubmission">
          <Button variant="primary" type="submit" value="Submit" onClick={submitForm}>Submit</Button>
        </Form.Group>
      </Form>
    </Container>
); 
}

export default DogForm;