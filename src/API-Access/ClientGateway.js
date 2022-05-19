import axios from "axios";
import { generateHeader } from "./HeaderGenerator";
const requestString = "http://localhost:5000/clients";

export async function getAll(token, format = true) {
  let header = generateHeader(token);
  try {
    const response = await axios.get(
      requestString + "?format=" + format,
      header
    );
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id, token, format = true) {
  let header = generateHeader(token);
  try {
    const response = await axios.get(
      requestString + "/" + id + "?format=" + format,
      header
    );
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(client, token) {
  let header = generateHeader(token);
  try {
    const response = await axios.post(requestString, client, header);
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateRecord(client, token) {
  let header = generateHeader(token);
  try {
    console.log(client._id);
    const response = await axios.patch(requestString, client, header);
    return response.data.clientData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteById(id, token) {
  let header = generateHeader(token);
  try {
    const response = await axios.delete(requestString + "/" + id, header);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}
