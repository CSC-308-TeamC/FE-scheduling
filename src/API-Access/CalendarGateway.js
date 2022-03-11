import axios from 'axios';

const connectionString = 'http://localhost:5000/calendar';

export async function getAll() {
  try {
    const response = await axios.get(connectionString);
    return response.data.calendarData;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function createEntry(calendar){
    try {
      const response = await axios.post(connectionString, calendar);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
  }