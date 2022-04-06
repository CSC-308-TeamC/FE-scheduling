//React & Boostrap 
import { useRef, useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
//API calls
import { getById as getAppointmentById, updateRecord as updateAppointment, getTodays as getTodaysAppointments } from '../../API-Access/AppointmentGateway';
//Enumerations
import Statuses from '../../Enums/Statuses';
import Types from '../../Enums/Types';
//Custom or Module Components
import ArrivingAlert from './ArrivingAlert';
import Clock from 'react-live-clock';
import CheckInTable from './CheckInTable';
import CardTable from './CardTable';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import UpcomingTimer from './UpcomingTimer';

function DashboardPanel() { 
  const [todaysAppointments, setTodaysAppointments] = useState([]);

  const [nextAppointment, setNextAppointment] = useState([]);
  const timeOfNextAppointment= useRef();

  const typeChartData = useRef({data: {}, options:{}});

  const getNextAppointment = useCallback(() => {
    let nextApp = [];
    todaysAppointments.forEach(appointment => {
      if(appointment.status !== Statuses.checkedIn && appointment.status !== Statuses.checkedOut) {
        if (!nextApp[0]) {
          nextApp[0] = appointment;
          let now = new Date();
          let [hour, minute] = appointment.dateTime.split(':');
          let date = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 4, parseInt(hour) + 10, parseInt(minute), 0);
          //timeOfNextAppointment.current = date;
        }
        else if (compareDate(appointment, nextApp[0]))
          nextApp[0] = appointment;
      }
    });
    setNextAppointment(nextApp);
  }, [todaysAppointments]);

  function compareDate(appointment1, appointment2) {
    let now = new Date();
    let [hour, minute] = appointment1.dateTime.split(':');
    let date1 = new Date(now.getFullYear(), now.getMonth(), now.getDay(), parseInt(hour), parseInt(minute), 0);
    [hour, minute] = appointment2.dateTime.split(':');
    let date2 = new Date(now.getFullYear(), now.getMonth(), now.getDay(), parseInt(hour), parseInt(minute), 0);
    if (date1 < date2) {
      timeOfNextAppointment.current = date1;
      return true;
    }
    return false;
  }



  useEffect(() => {  
    let testDate = new Date();
    testDate.setSeconds(testDate.getSeconds() + 600);
    timeOfNextAppointment.current = testDate;
    console.log(timeOfNextAppointment.current);

    let typeCounts = Array.from({ length: Object.keys(Types).length }, () => 0);
    todaysAppointments.forEach(appointment => {
      Object.values(Types).some((type, index) => {
        if (appointment.type === type) {
          typeCounts[index]++;
        }
        return appointment.type === type;
      })
    });

    let labels = Object.values(Types);
    typeChartData.current = {
      data: {
        labels: labels,
        datasets: [{
          label: 'Appointment Types',
          data: typeCounts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.35)',
            'rgba(255, 99, 132, 0.35)',
            'rgba(255, 206, 86, 0.35)',
            'rgba(153, 102, 255, 0.35)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 2,
        }]
      },
      options: {},
    };

    getNextAppointment();
  }, [todaysAppointments, getNextAppointment]);


  useEffect(() => {
    getTodaysAppointments().then(result => {
      if(result){
        setTodaysAppointments(result);
      }
    });
  }, []);

  async function checkInAppointment(appointmentId){
    let result = await getAppointmentById(appointmentId, false);
    result.status = Statuses.checkedIn;
    await updateAppointment(result);

    getTodaysAppointments().then(result => {
      setTodaysAppointments(result);
    });
  }

  async function checkOutAppointment(appointmentId){
    let result = await getAppointmentById(appointmentId, false);
    result.status = Statuses.checkedOut;
    await updateAppointment(result);

    getTodaysAppointments().then(result => {
      setTodaysAppointments(result);
    });
  }



function TypeChart(){
    if(Object.keys(typeChartData.current.data).length !== 0)
      return (<Doughnut data={typeChartData.current.data} height={300} width={300} options={{maintainAspectRatio: false}}/>)

    return (<>No Appointments to Display</>)
  }



  return (
    <Container fluid>
      <Stack gap={3}>
        
        <Row xs={2}>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>
                  Upcoming
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
              </Card.Body>
              <Card.Title>
                Next Appointment
              </Card.Title>
              <Card.Body>
                <CardTable appointmentData={nextAppointment}/>
              </Card.Body>
              <Card.Footer className="text-muted">
                <UpcomingTimer expiryTimestamp={timeOfNextAppointment}/>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>
                  Appointment Types
                </Card.Title>
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
                <Card.Title>
                  Todays Appointments
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <CheckInTable appointmentData={todaysAppointments} checkInAppointment={checkInAppointment} checkOutAppointment={checkOutAppointment}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row xs={2} >
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>
                  Checked In
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <CardTable appointmentData={todaysAppointments} statusKey={Statuses.checkedIn} appointmentFunction={checkOutAppointment}/>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>
                  Checked Out
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <CardTable appointmentData={todaysAppointments} statusKey={Statuses.checkedOut} appointmentFunction={checkInAppointment}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Stack>
    </Container>
  );
}

export default DashboardPanel;