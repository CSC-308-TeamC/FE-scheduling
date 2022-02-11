import React, {useState} from 'react';

function ClientForm(props) {
   const [client, setClient] = useState(
         {
            dog: '',
            phone: '',
            firstName: '',
            lastName: ''
         }
   );

   function handleChange(event) {
      const {name, value} = event.target;

      if (name === "dog") {
         setClient(
            {
               dog: value, 
               phone: client['phone'], 
               firstName: client['firstName'], 
               lastName: client['lastName']
            }
         );
      }
      else if (name === "phone") {
         setClient(
            {
               dog: client['dog'], 
               phone: value, 
               firstName: client['firstName'], 
               lastName: client['lastName']
            }
         );
      }
      else if (name === "firstName") {
         setClient(
            {
               dog: client['dog'], 
               phone: client['phone'], 
               firstName: value, 
               lastName: client['lastName']
            }
         );
      }
      else {
         setClient(
            {
               dog: client['dog'], 
               phone: client['phone'], 
               firstName: client['firstName'], 
               lastName: value
            }
         );
      }
   }

   function submitForm() {
      props.handleSubmit(client);
      setClient(
         {
            dog: '',
            phone: '',
            firstName: '',
            lastName: ''
         }
      );
   };

   return (
      <form>
         <label htmlFor = "dog">
            Dog
         </label>
            <input 
               type = "text"
               name = "dog"
               id = "dog"
               value = {client.dog}
               onChange = {handleChange}
            />
         <label htmlFor = "phone">
            Phone Number
         </label>
            <input 
               type = "text"
               name = "phone"
               id = "phone"
               value = {client.phone}
               onChange = {handleChange}
            />
         <label htmlFor = "firstName">
            First Name
         </label>
            <input 
               type = "text"
               name = "firstName"
               id = "firstName"
               value = {client.firstName}
               onChange = {handleChange}
            />
         <label htmlFor = "firstName">
            Last Name
         </label>
            <input 
               type = "text"
               name = "lastName"
               id = "lastName"
               value = {client.lastName}
               onChange = {handleChange}
            />
         
         <input
            type = "button"
            value = "Submit"
            onClick = {submitForm}
         />
      </form>
   )

};

export default ClientForm;