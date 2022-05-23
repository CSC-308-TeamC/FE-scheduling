import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

function ArrivingAlert(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  if (show) {
    return (
      <Alert
        dismissible={true}
        variant="success"
        onClose={() => setShow(false)}
      >
        <Alert.Heading>Your next appoinment is arriving.</Alert.Heading>
      </Alert>
    );
  } else {
    return null;
  }
}

export default ArrivingAlert;
