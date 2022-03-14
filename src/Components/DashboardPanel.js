import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Clock from 'react-live-clock';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Card from 'react-bootstrap/Card';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
// import { Avatar, Box, Grid, Typography } from '@mui/material';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import PeopleIcon from '@mui/icons-material/PeopleOutlined';

// export default function DashboardPanel(props) { 
//   <>
//   <Card border="primary" style={{ width: '18rem' }}>
//     <Card.Header>Header</Card.Header>
//     <Card.Body>
//       <Card.Title>Primary Card Title</Card.Title>
//       <Card.Text>
//         Some quick example text to build on the card title and make up the bulk
//         of the card's content.
//       </Card.Text>
//     </Card.Body>
//   </Card>
//   <br />
//   </>
//   return (
//     // <div class="flex-container">
//     <Container>
//       <Row>
//         <Col>
//           <div id="date">
//             <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
//           </div>
//           <div>
            
//           </div>
//         </Col>
//       </Row>
      
//     </Container>
    
//   );
  

// }

  
export default function App() {
  return (
  
           //<div class="flex-container">
          // <Container>
          //   <Row>
          //     <Col>
          //       <div id="date">
          //         <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
          //       </div>
          //       <div>
                  
          //       </div>
          //     </Col>
          //   </Row>
            
          // </Container>

    <div style={{}}>
      <h4>Dog Grooming Admin Dashboard</h4>
      
      <Card
        style={{
          width: 5000,
          backgroundColor: "yellowgreen",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
          >
            Greetings of the day
          </Typography>
          <Typography variant="h5" component="h2">
            Dog Grooming Dashboard
          </Typography>
          <CardActions>
        {/* //  <Button size="big">Stay Safe.....</Button> */}
          <Card size = "big"> </Card>
          <div id="date">
                  <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
                </div>
        </CardActions>
          {/* <div id="date">
                  <Clock format={'dddd, MMMM Do YYYY, h:mm a'} ticking={true} timezone={'US/Pacific'} />
                </div> */}
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Keep Motivated
          </Typography>
          <Typography variant="body2" component="p">
            Stay Happy
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Stay Safe.....</Button>
        </CardActions>
      </Card>
    </div>
  );
}



// export const TotalCustomers = (props) => (
//   <Card {...props}>
//     <CardContent>
//       <Grid
//         container
//         spacing={3}
//         sx={{ justifyContent: 'space-between' }}
//       >
//         <Grid item>
//           <Typography
//             color="textSecondary"
//             gutterBottom
//             variant="overline"
//           >
//             TOTAL CUSTOMERS
//           </Typography>
//           <Typography
//             color="textPrimary"
//             variant="h4"
//           >
//             1,6k
//           </Typography>
//         </Grid>
//         <Grid item>
//           <Avatar
//             sx={{
//               backgroundColor: 'success.main',
//               height: 56,
//               width: 56
//             }}
//           >
//             <PeopleIcon />
//           </Avatar>
//         </Grid>
//       </Grid>
//       <Box
//         sx={{
//           alignItems: 'center',
//           display: 'flex',
//           pt: 2
//         }}
//       >
//         <ArrowUpwardIcon color="success" />
//         <Typography
//           variant="body2"
//           sx={{
//             mr: 1
//           }}
//         >
//           16%
//         </Typography>
//         <Typography
//           color="textSecondary"
//           variant="caption"
//         >
//           Since last month
//         </Typography>
//       </Box>
//     </CardContent>
//   </Card>
// );
//export default DashboardPanel;