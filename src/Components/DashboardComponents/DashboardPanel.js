//React & Boostrap
import { useRef, useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
//API calls
import {
  getById as getAppointmentById,
  updateRecord as updateAppointment,
  getTodays as getTodaysAppointments,
} from "../../API-Access/AppointmentGateway";
//Enumerations
import Statuses from "../../Enums/Statuses";
import Types from "../../Enums/Types";
//Custom or Module Components
import ArrivingAlert from "./ArrivingAlert";
import Clock from "react-live-clock";
import CheckInTable from "./CheckInTable";
import CardTable from "./CardTable";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import UpcomingTimer from "./UpcomingTimer";

function DashboardPanel() {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [nextAppointment, setNextAppointment] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  const timeOfNextAppointment = useRef(new Date());
  const typeChartData = useRef({ data: {}, options: {} });

  const compareStringDate = useCallback((appointment1, appointment2) => {
    let date1 = buildDateFromString(appointment1.dateTime);
    let date2 = buildDateFromString(appointment2.dateTime);
    if (date1 < date2) {
      timeOfNextAppointment.current = date1;
      return true;
    }
    return false;
  }, []);

  const getNextAppointment = useCallback(() => {
    let nextApp;
    todaysAppointments.forEach((appointment) => {
      if (
        appointment.status !== Statuses.checkedIn &&
        appointment.status !== Statuses.checkedOut
      ) {
        if (!nextApp) {
          nextApp = appointment;
          timeOfNextAppointment.current = buildDateFromString(
            appointment.dateTime
          );
        } else if (compareStringDate(appointment, nextApp))
          nextApp = appointment;
      }
    });
    if (nextApp) setNextAppointment([nextApp]);
  }, [todaysAppointments, compareStringDate]);

  useEffect(() => {
    getTodaysAppointments().then((result) => {
      if (result) {
        setTodaysAppointments(result);
      }
    });
  }, []);

  useEffect(() => {
    let typeCounts = Array.from({ length: Object.keys(Types).length }, () => 0);
    todaysAppointments.forEach((appointment) => {
      Object.values(Types).some((type, index) => {
        if (appointment.type === type) {
          typeCounts[index]++;
        }
        return appointment.type === type;
      });
    });

    let labels = Object.values(Types);
    typeChartData.current = {
      data: {
        labels: labels,
        datasets: [
          {
            label: "Appointment Types",
            data: typeCounts,
            backgroundColor: [
              "rgba(54, 162, 235, 0.35)",
              "rgba(255, 99, 132, 0.35)",
              "rgba(255, 206, 86, 0.35)",
              "rgba(153, 102, 255, 0.35)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {},
    };

    getNextAppointment();
  }, [todaysAppointments, getNextAppointment]);

  async function checkInAppointment(appointmentId) {
    let result = await getAppointmentById(appointmentId, false);
    result.status = Statuses.checkedIn;
    await updateAppointment(result);

    getTodaysAppointments().then((result) => {
      setTodaysAppointments(result);
    });
  }

  async function checkOutAppointment(appointmentId) {
    let result = await getAppointmentById(appointmentId, false);
    result.status = Statuses.checkedOut;
    await updateAppointment(result);

    getTodaysAppointments().then((result) => {
      setTodaysAppointments(result);
    });
  }

  function buildDateFromString(timeString) {
    let date = new Date();
    let [hour, minute] = timeString.split(":"); //Formatted as e.g. "06:00 AM"
    hour = parseInt(hour);
    minute = parseInt(minute);
    if (timeString.includes("PM")) hour += 12;
    date.setHours(hour, minute, 0);

    return date;
  }

  function setAlertVisible() {
    // console.log("setting alert to showin")
    // if(!showAlert)
    //   setShowAlert(true);
  }

  function TypeChart() {
    if (Object.keys(typeChartData.current.data).length !== 0)
      return (
        <Doughnut
          data={typeChartData.current.data}
          height={325}
          width={325}
          options={{ maintainAspectRatio: false }}
        />
      );

    return <>No Appointments to Display</>;
  }

  return (
    <Container fluid>
      <Stack gap={3}>
        <Row xs={2}>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Upcoming</Card.Title>
              </Card.Header>
              <Card.Body>
                <Clock
                  format={"dddd, MMMM Do YYYY, h:mm a"}
                  ticking={true}
                  timezone={"US/Pacific"}
                />
              </Card.Body>
              <Card.Title>Next Appointment</Card.Title>
              <Card.Body>
                <CardTable appointmentData={nextAppointment} />
              </Card.Body>
              <Card.Footer className="text-muted">
                <UpcomingTimer
                  targetDate={timeOfNextAppointment.current}
                  expirationCallback={setAlertVisible}
                />
              </Card.Footer>
            </Card>
            <ArrivingAlert show={showAlert} />
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Appointment Types</Card.Title>
              </Card.Header>
              <Card.Body>
                <TypeChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row xs={1}>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Todays Appointments</Card.Title>
              </Card.Header>
              <Card.Body>
                <CheckInTable
                  appointmentData={todaysAppointments}
                  checkInAppointment={checkInAppointment}
                  checkOutAppointment={checkOutAppointment}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row xs={2}>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Checked In</Card.Title>
              </Card.Header>
              <Card.Body>
                <CardTable
                  appointmentData={todaysAppointments}
                  statusKey={Statuses.checkedIn}
                  appointmentFunction={checkOutAppointment}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Checked Out</Card.Title>
              </Card.Header>
              <Card.Body>
                <CardTable
                  appointmentData={todaysAppointments}
                  statusKey={Statuses.checkedOut}
                  appointmentFunction={checkInAppointment}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}

export default DashboardPanel;
