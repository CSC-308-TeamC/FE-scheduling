import axios from "axios";

const requestString = "http://localhost:5000/dogs";

export async function getAll() {
  try {
    const response = await axios.get(requestString);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id) {
  try {
    const response = await axios.get(requestString + "/" + id);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(dog) {
  try {
    const response = await axios.post(requestString, dog);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateRecord(dog) {
  try {
    const response = await axios.patch(requestString, dog);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteById(id) {
  try {
    const response = await axios.delete(requestString + "/" + id);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}
