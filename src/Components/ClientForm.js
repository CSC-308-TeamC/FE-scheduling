import React, {useState} from 'react';

function ClientForm(props) {
   const [client, setClient] = useState(
         {
            _id: '',
            firstName: '',
            lastName: '',
            dogs: '',
            phoneNumber: ''
         }
   );

   function handleChange(event) {
      const {name, value} = event.target;
      if(name === "_id"){
         setClient({...client, _id:value});
      }else if (name === "firstName") {
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
            _id: '',
            firstName: '',
            lastName: '',
            dogs: '',
            phoneNumber: '',
         }
      );
   };

   return (
      <form class="form">
         <label htmlFor = "_id">Id</label>
            <input 
               id = "txtBox"
               type = "text"
               name = "_id"
               id = "_id"
               value = {client._id}
               onChange = {handleChange} />
         <label htmlFor = "firstName">First Name</label>
            <input 
               type = "text"
               name = "firstName"
               id = "firstName"
               value = {client.firstName}
               onChange = {handleChange} />
         <label htmlFor = "lastName">Last Name</label>
            <input 
               type = "text"
               name = "lastName"
               id = "lastName"
               value = {client.lastName}
               onChange = {handleChange}/>
         <label htmlFor = "dogs">Dogs</label>
            <input 
               type = "text"
               name = "dogs"
               id = "dogs"
               value = {client.dogs}
               onChange = {handleChange}/>
         <label htmlFor = "firstName">Phone Number</label>
            <input 
               type = "text"
               name = "phoneNumber"
               id = "phoneNumber"
               value = {client.phoneNumber}
               onChange = {handleChange}/>
         <input type = "button" value = "Submit" onClick = {submitForm} />
      </form>
   )

};

export default ClientForm;