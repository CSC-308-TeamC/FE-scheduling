import axios from "axios";

const requestString = "http://localhost:5000/clients";

export async function getAll() {
  try {
    const response = await axios.get(requestString);
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id) {
  try {
    const response = await axios.get(requestString + "/" + id);
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(client) {
  try {
    const response = await axios.post(requestString, client);
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateRecord(client) {
  try {
    console.log(client._id);
    const response = await axios.patch(requestString, client);
    return response.data.clientData;
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
