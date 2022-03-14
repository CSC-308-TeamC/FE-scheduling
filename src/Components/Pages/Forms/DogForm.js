import React, {useEffect, useState} from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import Select from 'react-select';
import Breeds from '../../../Enums/Breeds'
import { getById as getDogById } from '../../../API-Access/DogGateway'
//import 'react-bootstrap-typeahead/css/Typeahead.css';

function DogForm(props) {   
    const [dog, setDog] = useState(
       {  
          name: '',
          breed: '',
          clientId: '',  
       }
    ); 

  const [breeds, setBreeds] = useState([]);
  const [submitLabel, setSubmitLabel] = useState("Submit");
  const [selectStates, setSelectStates] = useState({});
  

    useEffect(()=> {
      let breedsInitialize = Array.from({ length: Object.keys(Breeds).length }, () => ({ label: '', category: 'breed' }));
      let index = 0;
      Object.values(Breeds).forEach(breed => {
        breedsInitialize[index].label = breed;
        index++;
      });
      setBreeds(breedsInitialize);

      if(props.updateObjectId){
        setSubmitLabel("Update");
        getDogById(props.updateObjectId).then( result => {
          setSelectStates({breed: {label: result.breed, category: 'breed'},  
                           client: props.clientNames.find(client => client.id === result.clientId)});
          setDog({ 
            name: result.name,
            breed: result.breed,
            clientId: result.clientId
          });
        });
      }
    },[props.updateObjectId, props.clientNames])

    function handleNameChange(event){
      const { value } = event.target;
      setDog({...dog, name: value})
    }

    function handleSelectChange(selection){
      if(selection.category === "breed"){
        setDog({...dog, breed: selection.label});
        setSelectStates({selection});
      }else{
        setDog({...dog, clientId: selection.id});
        setSelectStates({selection});
      }
    }

 
    function submitForm() {
      if (props.updateObjectId)
        props.handleSubmit(dog, props.updateObjectId)
      else
        props.handleSubmit(dog);

      setDog({  
        name: '',
        breed: '',
        clientId: '',  
     });
    }


  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="dogFormName">
          <Form.Label>Dog Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="name" value={dog.name} 
                        onChange={(event) => handleNameChange(event)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormBreed">
          <Form.Label>Breed</Form.Label>
          <Select options={breeds} placeholder={"Select Breed..."}
              isSearchable={true}
              value={selectStates.breed}
              getOptionValue={(selection) => selection.label}
              onChange={(selection) => handleSelectChange(selection)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormClient">
          <Form.Label>Associated Client</Form.Label>
          <Select options={props.clientNames} placeholder={"Select Client..."}
            value={selectStates.client}
            getOptionValue={(selection) => selection.label}
            onChange={(selection) => handleSelectChange(selection)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="dogFormSubmission">
          <Button variant="primary" type="submit" value="Submit" onClick={submitForm}>{submitLabel}</Button>
        </Form.Group>
      </Form>
    </Container>
); 
}

export default DogForm;