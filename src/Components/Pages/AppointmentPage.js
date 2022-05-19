import { useState, useEffect } from "react";
import * as AppointmentGateway from "../../API-Access/AppointmentGateway";
import AppointmentForm from "./Forms/AppointmentForm";
import AppointmentTable from "./Tables/AppointmentTable";
import { Col, Row, Stack } from "react-bootstrap";
import { useCookies } from "react-cookie";

function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    AppointmentGateway.getAll(cookies.auth_token).then((allAppointments) => {
      if (allAppointments) setAppointments(allAppointments);
    });
  }, [cookies.auth_token]);

  function createAppointment(appointment) {
    AppointmentGateway.createRecord(appointment, cookies.auth_token).then(
      (result) => {
        if (result && result.status === 201)
          setAppointments([...appointments, result.data]);
      }
    );
  }

  function updateAppointment(appointment, id) {
    appointment._id = id;
    AppointmentGateway.updateRecord(appointment, cookies.auth_token).then(
      (result) => {
        if (result && result.status === 200)
          setAppointments([...appointments, result.data]);
      }
    );
  }

  function removeAppointment(index) {
    if (index < appointments.length && index > -1) {
      AppointmentGateway.deleteById(
        appointments[index]._id,
        cookies.auth_token
      ).then((result) => {
        if (result && result.status === 204) {
          const updated = appointments.filter((appointment, i) => {
            return i !== index;
          });
          setAppointments(updated);
        }
      });
    }
  }

  return (
    <Stack gap={2}>
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <AppointmentForm handleSubmit={createAppointment} />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10, offset: 1 }}>
          <AppointmentTable
            appointmentData={appointments}
            updateAppointment={updateAppointment}
            removeAppointment={removeAppointment}
          />
        </Col>
      </Row>
    </Stack>
  );
}

export default AppointmentPage;
