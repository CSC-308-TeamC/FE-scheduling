import React, {useState} from 'react';
import { Form, Container, Button } from 'react-bootstrap'


function ClientForm(props) {
   const [client, setClient] = useState(
         {
            firstName: '',
            lastName: '',
            dogs: '',
            phoneNumber: ''
         }
   );

   function handleChange(event) {
      const {name, value} = event.target;
      if (name === "firstName") {
         setClient({...client, firstName:value});
      }else if (name === "lastName") {
         setClient({...client, lastName:value});
      }else if (name === "dogs") {
         setClient({...client, dogs:value});
      }else{
         setClient({...client, phoneNumber:value});
      }
   }

   function submitForm() {
      props.handleSubmit(client);
      setClient(
         {
            firstName: '',
            lastName: '',
            dogs: '',
            phoneNumber: '',
         }
      );
   };

   return (
      <Container>
         <Form>
            <Form.Group className="mb-3" controlId="clientFormName">
               <Form.Label>Client First Name</Form.Label>
               <Form.Control type="text" placeholder="First Name"  name="firstName" value={client.firstName} onChange={handleChange} />
               <Form.Label>Client Last Name</Form.Label>
               <Form.Control type="text" placeholder="Last Name" name="lastName" value={client.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="clientFormPhoneNumber">
               <Form.Label>Phone Number</Form.Label>
               <Form.Control type="text" placeholder="(XXX) XXX-XXXX"  name="phoneNumber" value={client.phoneNumber} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="clientFormDogs">
               <Form.Label>Add Dog</Form.Label>
               <Form.Control type="text" placeholder="Dogs"  name="dogs" value={client.dogs} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="clientFormSubmission">
               <Button variant="primary" type="submit" value="Submit" onClick={submitForm}>Submit</Button>
            </Form.Group>
         </Form>
      </Container>
   )

};

export default ClientForm;