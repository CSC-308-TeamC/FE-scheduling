import axios from 'axios';

const connectionString = 'http://localhost:5000/appointments';

export async function getAll() {
  try {
    const response = await axios.get(connectionString);
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id){
  try{
    const response = await axios.get(connectionString + "/" + id);
    
    return response.data.appointmentData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export async function getTodays(){
  try {
    const response = await axios.get('http://localhost:5000/dashboard');
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(appointment){
  try {
    const response = await axios.post(connectionString, appointment);
    return response.data.appointmentData;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function updateRecord(appointment){
  try{
    const response = await axios.patch(connectionString + "/" + appointment._id, appointment);
    return response.data.appointmentData;
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

