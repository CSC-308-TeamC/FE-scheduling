import axios from 'axios';

export async function getAll() {
  try {
    const response = await axios.get('http://localhost:5001/clients');
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createEntry(client){
  try {
    const response = await axios.post('http://localhost:5001/clients', client);
    return response;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function deleteById(id) {
  try {
    console.log(id);
    const response = await axios.delete('http://localhost:5001/clients/' + id);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}