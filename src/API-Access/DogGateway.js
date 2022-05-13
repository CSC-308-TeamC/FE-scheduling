import axios from "axios";
import { generateHeader } from "./HeaderGenerator";
const requestString = "http://localhost:5000/dogs";

export async function getAll(token, format = true) {
  let header = generateHeader(token);
  try {
    const response = await axios.get(
      requestString + "?format=" + format,
      header
    );
    return response.data.dogData;
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
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(dog, token) {
  let header = generateHeader(token);
  try {
    const response = await axios.post(requestString, dog, header);
    return response.data.dogData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateRecord(dog, token) {
  let header = generateHeader(token);
  try {
    const response = await axios.patch(requestString, dog, header);
    return response.data.dogData;
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
