import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import Clock from 'react-live-clock';
import CheckInTable from './CheckInTable';
import CardTable from './CardTable';


function DashboardPanel(props) { 
  const [typeChartData, setTypeChartData] = useState({data: {}, options:{}});
  const [todaysQueue, setTodaysQueue] = useState([]);
  const [checkedInAppointments, setCheckedInAppointments] = useState([]);
  const [checkedOutAppointments, setCheckedOutAppointments] = useState([]);
  const [nextAppointment, setNextAppointment] = useState([]);

  const [buttonsDisabled, setButtonDisabled] = useState([]);

  useEffect(() => {
    let typeCounts = [0,0,0]
    if(props.appointmentData){
      props.appointmentData.forEach(appointment => {
        if(appointment.type === 'Bath')
          typeCounts[0]++;
        else if(appointment.type === 'Groom')
          typeCounts[1]++;
        else if(appointment.type === 'Nails')
          typeCounts[2]++;
      });

      //Update these if statements to not be reliant on State properties
      if(todaysQueue.length === 0)
        setTodaysQueue(props.appointmentData)

      if(buttonsDisabled.length === 0){
        let falseyArray = Array(props.appointmentData.length).fill(false);
        setButtonDisabled(falseyArray);
      }

      //Needs to be Changed to grab proper upcoming appointment based on time and checkin
      setNextAppointment([props.appointmentData[0]]);

      setTypeChartData({
        data: { 
          labels: ['Bath', 'Groom', 'Nails'],
          datasets: [{
            label: 'Appointment Types',
            data: typeCounts,
            backgroundColor: [
              'rgba(54, 162, 235, 0.35)',
              'rgba(255, 99, 132, 0.35)',
              'rgba(255, 206, 86, 0.35)'
            ],
            borderColor: [              
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 2,
          }]
        },
        options: {},
      });
    }    


  }, [props.appointmentData]);

  function removeFromTodaysQueue(appointmentId) {
    setTodaysQueue(todaysQueue.filter(function (appointment) {
      return appointment._id !== appointmentId;
    }));
  }

  function checkInAppointment(appointmentId){
    //removeFromTodaysQueue(appointmentId);
    setCheckedInAppointments([...checkedInAppointments, props.appointmentData.find(appointment => appointment._id === appointmentId)])
  }

  function checkOutAppointment(appointmentId){
    if(checkedInAppointments.length !== 0)
      setCheckedInAppointments(checkedInAppointments.filter(function (appointment) {
        return appointment._id !== appointmentId;
      }));
    
    setCheckedOutAppointments([...checkedOutAppointments, props.appointmentData.find(appointment => appointment._id === appointmentId)])
  }

  function reCheckInAppointment(appointmentId){
    setCheckedOutAppointments(checkedOutAppointments.filter(function (appointment) {
      return appointment._id !== appointmentId;
    }));
    setCheckedInAppointments([...checkedInAppointments, props.appointmentData.find(appointment => appointment._id === appointmentId)])
  }


function TypeChart(){

    if(Object.keys(typeChartData.data).length !== 0)
      return (<Doughnut data={typeChartData.data} 
        height={300} width={300} options={{maintainAspectRatio: false}}/>)

    return (<p>No Appointments to Display</p>)
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
                <CardTable appointmentData={nextAppointment} inProgress={null} />
              </Card.Body>
              <Card.Footer className="text-muted">Arriving in 30 minutes</Card.Footer>
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
                <CheckInTable appointmentData={todaysQueue} checkInAppointment={checkInAppointment} checkOutAppointment={checkOutAppointment}/>
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
                <CardTable appointmentData={checkedInAppointments} inProgress={true} appointmentFunction={checkOutAppointment}/>
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
                <CardTable appointmentData={checkedOutAppointments} inProgress={false} appointmentFunction={reCheckInAppointment}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Stack>
    </Container>
  );
}

export default DashboardPanel;