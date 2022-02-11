import React, {useState} from 'react';

function DogForm(props) {   
    const [dog, setDog] = useState(
       {  
          name: '',
          breed: '',
          clientId: '',  
       }
    );

    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "name")
        setDog({...dog, name: value});
      else if(name === "breed"){
        setDog({...dog, breed: value});
      }else{
        setDog({...dog, clientId: value});
      }
    }
  
    function submitForm() {
      props.handleSubmit(dog);
      setDog({  
        name: '',
        breed: '',
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
          value={dog.name}
          onChange={handleChange} />
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          name="breed"
          id="breed"
          value={dog.breed}
          onChange={handleChange} />
        <label htmlFor="clientId">Client ID</label>
        <input
          type="text"
          name="clientId"
          id="clientId"
          value={dog.clientId}
          onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    </div>
); 
}

export default DogForm;