import axios from 'axios';

const connectionString = 'http://localhost:5000/clients';

export async function getAll() {
  try {
    const response = await axios.get(connectionString);
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
   }
}

export async function getById(id) {
  try {
    const response = await axios.get(connectionString + "/" + id);
    console.log(response);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export async function createEntry(client){
  try {
    const response = await axios.post(connectionString, client);
    return response;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function deleteById(id) {
  try {
    const response = await axios.delete(connectionString + "/" + id);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}