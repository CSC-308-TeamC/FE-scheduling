import axios from "axios";
import { generateHeader } from "./HeaderGenerator";

//const requestString = "http://localhost:5000/appointments";
const requestString = "https://dog-grooming-api.herokuapp.com/appointments";

export async function getAll(token) {
  let header = generateHeader(token);
  try {
    const response = await axios.get(requestString, header);
    return response.data.appointmentData;
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
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getTodays(token) {
  let header = generateHeader(token);
  try {
    const response = await axios.get(
      requestString + "?date=" + new Date().toISOString,
      header
    );
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createRecord(appointment, token) {
  let header = generateHeader(token);
  try {
    const response = await axios.post(requestString, appointment, header);
    return response.data.appointmentData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateRecord(appointment, token) {
  let header = generateHeader(token);
  try {
    const response = await axios.patch(requestString, appointment, header);
    return response.data.appointmentData;
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
