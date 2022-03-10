import axios from 'axios';

const connectionString = 'http://localhost:5000/dogs';

export async function getAll() {
  try {
    const response = await axios.get(connectionString);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id) {
  try {
    const response = await axios.get(connectionString + "/" + id);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(dog){
  try {
    const response = await axios.post(connectionString, dog);
    return response.data.dogData;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function updateRecord(dog){
  try{
    const response = await axios.patch(connectionString + "/" + dog._id, dog);
    return response.data.dogData;
  }catch(error){
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