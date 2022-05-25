import axios from "axios";
//const requestString = "http://localhost:5000/users";
const requestString = "https://dog-grooming-api.herokuapp.com/users";
export async function getAll() {
  try {
    const response = await axios.get(requestString);
    return response.data.userData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getById(id) {
  try {
    const response = await axios.get(requestString + "/" + id);
    return response.data.userData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function signUp(user) {
  try {
    const response = await axios.post(requestString + "/signUp", user);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function signIn(user) {
  try {
    const response = await axios.post(requestString + "/signIn", user);
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateRecord(user) {
  try {
    const response = await axios.patch(requestString, user);
    return response.data.userData;
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
