import axios from 'axios';

export async function getAll() {
  try {
    const response = await axios.get('http://localhost:5000/dogs');
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createEntry(dog){
  try {
    const response = await axios.post('http://localhost:5000/dogs', dog);
    return response;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

export async function deleteById(id) {
  try {
    const response = await axios.delete('http://localhost:5000/dogs/' + id);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}