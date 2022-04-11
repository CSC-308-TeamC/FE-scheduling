import axios from 'axios';

const requestString = 'http://localhost:5000/appointments';

export async function getAll() {
  try {
    const response = await axios.get(requestString);
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id, format = true){
  try{
    const response = await axios.get(requestString + "/" + id + "/" + format);
    
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
    const response = await axios.post(requestString, appointment);
    return response.data.appointmentData;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function updateRecord(appointment){
  try{
    const response = await axios.patch(requestString, appointment);
    return response.data.appointmentData;
  }catch(error){
    console.log(error);
    return false;
  }
}

export async function deleteById(id) {
  try {
    const response = await axios.delete(requestString + "/" + id);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

