import axios from 'axios';

export async function getAll() {
  try {
    const response = await axios.get('http://localhost:5001/appointments');
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createEntry(appointment){
  try {
    const response = await axios.post('http://localhost:5001/appointments', appointment);
    return response;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function deleteById(id) {
  try {
    const response = await axios.delete('http://localhost:5001/appointments/' + id);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

