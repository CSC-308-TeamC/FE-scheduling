import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import * as AppointmentGateway from "../../../API-Access/AppointmentGateway";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarPage() {
  const [cookies, setCookies] = useCookies();
  const [appointments, setAppointments] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(async () => {
    let allAppointments = await AppointmentGateway.getAll(
      cookies.auth_token,
      false
    );
    if (allAppointments)
      setAppointments(formatAppointmentObjects(allAppointments));
  }, []);

  function formatAppointmentObjects(appointments) {
    let calendarFormatObjects = appointments.map((appointment) => ({
      id: appointment._id,
      title: appointment._id,
      allDay: true,
      start: new Date(appointment.dateTime),
      end: new Date(appointment.dateTime) + 1,
    }));
    return calendarFormatObjects;
  }

  function viewAppointmentDetails(event) {}

  return (
    <div style={{ height: "850px" }}>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => console.log(event)}
      />
    </div>
  );
}

export default CalendarPage;
